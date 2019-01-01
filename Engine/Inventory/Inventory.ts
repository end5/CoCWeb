import { ItemStack } from './ItemStack';
import { List } from 'Engine/Utilities/List';
import { Character } from 'Engine/Character/Character';
import { Item } from 'Engine/Items/Item';
import { displayCharInventoryFull } from 'Engine/Inventory/InventoryDisplay';
import { ClickFunction, NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { ItemDict } from 'Engine/Items/ItemDict';

export class Inventory<T extends Item> extends List<ItemStack<T>> {
    public unlock(amount: number = 1) {
        while (amount > 0) {
            this.add(new ItemStack());
            amount--;
        }
    }

    public lock(amount: number = 1) {
        while (amount > 0) {
            this.remove(this.list.length - 1);
            amount--;
        }
    }

    public has(itemName: string): boolean {
        return !!this.list.find(ItemStack.FilterName(itemName));
    }

    /**
     * Adds items to the inventory. If their are items that cannot be added, it goes to the full inventory/select what to do screen.
     * Once finished, it displays nextMenu.
     * @param characterAddingItems The character adding items to the inventory.
     * @param itemsToAdd List of ItemStack to be added.
     * @param nextMenu The menu that will display after the items are added.
     */
    public addList(characterAddingItems: Character, itemsToAdd: ItemStack<T>[], nextMenu: ClickFunction): NextScreenChoices {
        return displayCharInventoryFull(characterAddingItems, this.addItems(itemsToAdd), nextMenu);
    }

    /**
     * Constructs one item and adds it to the inventory. If their are items that cannot be added, it goes to the full inventory/select what to do screen.
     * Once finished, it displays nextMenu.
     * @param characterAddingItems The character adding items to the inventory.
     * @param itemType The item type.
     * @param itemName The item name.
     * @param nextMenu The menu that will display after the items are added.
     */
    public createAdd(characterAddingItems: Character, itemName: string, nextMenu: ClickFunction): NextScreenChoices {
        return this.addList(characterAddingItems, [new ItemStack(ItemDict.getByName(itemName), 1)], nextMenu);
    }

    public addItem(characterAddingItems: Character, item: Item, nextMenu: ClickFunction): NextScreenChoices {
        return this.addList(characterAddingItems, [new ItemStack<Item>(item, 1)], nextMenu);
    }
    /**
     * Adds items to inventory and return the items that cannot be added.
     * @param itemsToAdd A list of the items to add.
     */
    public addItems(itemsToAdd: ItemStack<T>[]): ItemStack<T>[] {
        const returnList = [];
        while (itemsToAdd.length > 0) {
            const itemToAdd = itemsToAdd.shift()!;
            if (itemToAdd.item) {
                const filteredInventory = this.filter(ItemStack.FilterName(itemToAdd.item.name)).filter(ItemStack.NotMaxStack).sort(ItemStack.HighestQuantity).concat(this.filter(ItemStack.EmptySlot));
                while (filteredInventory.length > 0 && itemToAdd.quantity > 0) {
                    const item = filteredInventory.toArray().shift()!;
                    if (item.quantity + itemToAdd.quantity > item.maxQuantity) {
                        const difference = item.maxQuantity - item.quantity;
                        item.quantity = item.maxQuantity;
                        itemToAdd.quantity -= difference;
                    }
                    else {
                        item.quantity = item.maxQuantity;
                        itemToAdd.quantity = 0;
                    }
                }
                if (itemToAdd.quantity > 0) {
                    returnList.push(itemToAdd);
                }
            }
        }
        return returnList;
    }

    public consumeItem(itemName: string, amount: number = 1) {
        if (this.filter(ItemStack.FilterName(itemName)).length >= amount) {
            const lowestItemStacks = this.filter(ItemStack.FilterName(itemName)).sort(ItemStack.LowestQuantity);
            for (const itemStack of lowestItemStacks) {
                if (itemStack.quantity === 0)
                    continue;
                if (amount === 0)
                    break;
                if (amount > itemStack.quantity) {
                    amount -= itemStack.quantity;
                    itemStack.quantity = 0;
                }
                else {
                    itemStack.quantity -= amount;
                    amount = 0;
                }
            }
        }
    }
}
