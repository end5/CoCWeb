import { Character } from 'Engine/Character/Character';
import { Inventory } from './Inventory';
import { ItemStack } from './ItemStack';
import { Item } from 'Engine/Items/Item';
import { ClickOption, NextScreenChoices, ScreenChoice, ClickFunction } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';

/* better inventory system
    other inv = undefined
    helditem = undefined
    page = 0

    buttons
    0	1	2	3	4
    5	6	7	8	9

    players inv
        9 = back
        8 = swap - unavailable in combat
        7 = unequip weapon

    swap menu - chests and racks open this menu
        click = pick up itemstack
        9 = back
        if (other inv)
            8 = swap
        7 = abandon

    if (inv.length > 7)
        6 = next page
    if (page == 2)
        6 = prev page
*/
type ReverseAction = () => void;

interface AddItemsRequest<T extends Item> {
    character: Character;
    itemList: ItemStack<T>[];
    menuToDisplayUponFinish: ClickOption;
    otherInventory?: Inventory<T>;
    reverseActionFunc?: ReverseAction;
}

/**
 * Displays character's item inventory.
 * @param character A character.
 * @param postItemUse The menu that will be displayed after using an item.
 * @param persistantChoices A list of perisistant choices.
 */
export function displayCharInventory(character: Character, postItemUse: ClickOption, persistantChoices: ScreenChoice[]): NextScreenChoices {
    const choices: ScreenChoice[] = [];
    const inventory = character.inventory.items;
    for (let index = 0; index < inventory.length; index++) {
        const itemSlot = inventory.get(index)!;
        if (itemSlot.item) {
            choices.push([
                itemSlot.item.desc.shortName + " x" + itemSlot.quantity,
                () => {
                    if (itemSlot.item) {
                        itemSlot.quantity--;
                        itemSlot.item.use(character);
                        itemSlot.item.useText(character);
                    }
                    return { next: postItemUse };
                }
            ]);
        }
    }
    return { choices, persistantChoices };
}

/**
 * Inspect an inventory and take items from it.
 * @param inventory The inventory to inspect.
 * @param character The character inspecting the inventory.
 * @param prevMenu The menu to return to by pressing Back.
 */
export function displayInventoryTake<T extends Item>(inventory: Inventory<T>, character: Character, prevMenu: ClickOption): NextScreenChoices {
    const choices: ScreenChoice[] = [];
    const invTakingFrom = inventory;
    const invAddingTo = character.inventory.items;
    for (let index = 0; index < invTakingFrom.length; index++) {
        const itemSlot = invTakingFrom.get(index)!;
        if (itemSlot.item) {
            choices.push([
                itemSlot.item.desc.shortName + " x" + itemSlot.quantity,
                () => {
                    const pickedUpItem = itemSlot.split(1);
                    const itemsCannotAdd = invAddingTo.addItems([pickedUpItem]);
                    if (itemsCannotAdd.length > 0) {
                        const request: AddItemsRequest<T> = {
                            character,
                            itemList: itemsCannotAdd,
                            menuToDisplayUponFinish: () => displayInventoryTake(invTakingFrom, character, prevMenu),
                            otherInventory: invTakingFrom,
                            reverseActionFunc: createReverseAction(itemSlot, pickedUpItem)
                        };
                        return invFull(request);
                    }
                    return { next: prevMenu };
                }
            ]);
        }
    }
    return { choices, persistantChoices: [["Put", () => inventoryPut(inventory, character, prevMenu)], ["Back", prevMenu]] };
}

function inventoryPut<T extends Item>(inventory: Inventory<T>, character: Character, prevMenu: ClickOption): NextScreenChoices {
    const choices: ScreenChoice[] = [];
    const invTakingFrom = character.inventory.items;
    const invAddingTo = inventory;
    for (let index = 0; index < invTakingFrom.length; index++) {
        const itemSlot = invTakingFrom.get(index)!;
        if (itemSlot.item) {
            choices.push([
                itemSlot.item.desc.shortName + " x" + itemSlot.quantity,
                () => {
                    const pickedUpItem = itemSlot.split(1);
                    const itemsCannotAdd = invAddingTo.addItems([pickedUpItem]);
                    if (itemsCannotAdd.length > 0) {
                        const request: AddItemsRequest<T> = {
                            character,
                            itemList: itemsCannotAdd,
                            menuToDisplayUponFinish: () => displayInventoryTake(invTakingFrom, character, prevMenu),
                            otherInventory: invTakingFrom,
                            reverseActionFunc: createReverseAction(itemSlot, pickedUpItem)
                        };
                        invFull(request);
                    }
                    return { next: prevMenu };
                }
            ]);
        }
    }
    return { choices, persistantChoices: [["Take", () => displayInventoryTake(inventory, character, prevMenu)], ["Back", prevMenu]] };
}

function createReverseAction<T extends Item>(itemSlot: ItemStack<T>, pickedUpItem: ItemStack<T>): ReverseAction {
    return () => {
        if (itemSlot.quantity === 0) {
            itemSlot.item = pickedUpItem.item;
            itemSlot.quantity += pickedUpItem.quantity;
        }
        else
            itemSlot.quantity += pickedUpItem.quantity;
    };
}

/**
 * The characters inventory is full and the user must decide what to do with the items.
 * @param character The character that has no room in its inventory.
 * @param itemsToAdd The items that cannot be added to the characters inventory.
 * @param nextMenu The menu to go to once the decision is made.
 */
export function displayCharInventoryFull<T extends Item>(character: Character, itemsToAdd: ItemStack<T>[], nextMenu: ClickFunction): NextScreenChoices {
    if (itemsToAdd.length > 0) {
        const request = {
            character,
            itemList: itemsToAdd,
            menuToDisplayUponFinish: nextMenu,
            nextMenu,
            otherInventory: character.inventory.items
        };
        return invFull(request);
    }
    else {
        return { next: nextMenu };
    }
}

function invFull<T extends Item>(request: AddItemsRequest<T>): NextScreenChoices {
    const choices: ScreenChoice[] = [];
    const inventory = request.character.inventory.items;
    const itemToAdd = request.itemList[0];
    for (let index = 0; index < inventory.length; index++) {
        const itemSlot = inventory.get(index)!;
        if (itemSlot.item) {
            choices.push([
                itemSlot.item.desc.shortName + " x" + itemSlot.quantity,
                discardFromInventory(request, itemSlot, itemToAdd)
            ]);
        }
    }
    if (itemToAdd && itemToAdd.item) {
        CView.text("There is no room for " + itemToAdd.item.desc.longName + " in your inventory.  You may replace the contents of a pouch with " + itemToAdd.item.desc.longName + " or abandon it.");
        const persistantChoices: ScreenChoice[] = [["Back", request.menuToDisplayUponFinish]];
        if (request.reverseActionFunc) {
            persistantChoices.push(["Put Back", putBack(request)]);
        }
        persistantChoices.push(["Use Now", useNow(request)]);
        persistantChoices.push(["Abandon", abandon(request)]);
        return { choices, persistantChoices };
    }
    else {
        return { next: request.menuToDisplayUponFinish };
    }
}

function discardFromInventory<T extends Item>(request: AddItemsRequest<T>, slotInInv: ItemStack<T>, itemToAdd: ItemStack<T>): ClickOption {
    return () => {
        if (itemToAdd.item && slotInInv.item) {
            if (slotInInv.item === itemToAdd.item)
                CView.text("You discard " + itemToAdd.item.desc.longName + " from the stack to make room for the new one.");
            else if (slotInInv.quantity === 1)
                CView.text("You throw away " + slotInInv.item.desc.longName + " and replace it with " + itemToAdd.item.desc.longName + ".");
            else
                CView.text("You throw away " + slotInInv.item.desc.longName + "(x" + slotInInv.quantity + ") and replace it with " + itemToAdd.item.desc.longName + ".");
            slotInInv.item = itemToAdd.item;
            slotInInv.quantity = itemToAdd.quantity;
            request.itemList.shift();
        }
        return { next: () => invFull(request) };
    };
}

function putBack<T extends Item>(request: AddItemsRequest<T>): ClickOption {
    return () => {
        if (request.reverseActionFunc) {
            request.reverseActionFunc();
            request.reverseActionFunc = undefined;
        }
        if (request.otherInventory)
            return displayInventoryTake(request.otherInventory, request.character, request.menuToDisplayUponFinish);
        return { next: request.menuToDisplayUponFinish };
    };
}

function useNow<T extends Item>(request: AddItemsRequest<T>): ClickOption {
    return () => {
        const itemToAdd = request.itemList[0];
        if (itemToAdd && itemToAdd.item && itemToAdd.item.canUse(request.character)) {
            itemToAdd.item.use(request.character);
            itemToAdd.item.useText(request.character);
            request.reverseActionFunc = undefined;
            return destroyItem(request);
        }
        return { next: request.menuToDisplayUponFinish };
    };
}

function abandon<T extends Item>(request: AddItemsRequest<T>): ClickOption {
    return () => {
        return destroyItem(request);
    };
}

function destroyItem<T extends Item>(request: AddItemsRequest<T>): NextScreenChoices {
    const itemToDestroy = request.itemList[0];
    itemToDestroy.quantity--;
    if (itemToDestroy.quantity <= 0)
        request.itemList.shift();
    if (request.itemList.length > 0)
        return invFull(request);
    else
        return { next: request.menuToDisplayUponFinish };
}
