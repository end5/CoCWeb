import { ItemStack, IItemStack } from './ItemStack';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { FilterOption, List, ReduceOption, SortOption } from '../../Engine/Utilities/List';
import { Character } from '../Character/Character';
import { Item } from '../Items/Item';
import { displayCharInventoryFull } from '../Menus/InGame/InventoryDisplay';
import { NextScreenChoices, ClickFunction } from '../ScreenDisplay';
import { getItemFromName } from '../Items/ItemLookup';

export interface IInventory {
    slots: IItemStack[];
}

export class Inventory<T extends Item> implements ISerializable<IInventory> {
    private itemSlots: List<ItemStack<T>> = new List();

    public unlock(amount: number = 1) {
        while (amount > 0) {
            this.itemSlots.add(new ItemStack());
            amount--;
        }
    }

    public lock(amount: number = 1) {
        while (amount > 0) {
            this.itemSlots.remove(this.itemSlots.length - 1);
            amount--;
        }
    }

    public get slotCount(): number {
        return this.itemSlots.length;
    }

    public has(itemName: string): boolean {
        return !!this.itemSlots.find(Inventory.FilterName(itemName));
    }

    public get(index: number): ItemStack<T> | undefined {
        return this.itemSlots.get(index);
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
        return this.addList(characterAddingItems, [new ItemStack(getItemFromName(itemName), 1)], nextMenu);
    }

    public add(characterAddingItems: Character, item: Item, nextMenu: ClickFunction): NextScreenChoices {
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
                const filteredInventory = this.filter(Inventory.FilterName(itemToAdd.item.name)).filter(Inventory.NotMaxStack).sort(Inventory.HighestQuantity).concat(this.filter(Inventory.EmptySlot));
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

    /**
     * Returns a sorted copy of the list using the provided sort option
     * @param option SortOption
     */
    public sort(option: SortOption<ItemStack<T>>): List<ItemStack<T>> | undefined {
        return this.itemSlots.sort(option);
    }

    /**
     * Returns a filtered copy of the list using the provided filter option
     * @param option SortOption
     */
    public filter(option: FilterOption<ItemStack<T>>): List<ItemStack<T>> {
        return this.itemSlots.filter(option);
    }

    /**
     * Reduces the list using reduce option provided
     * @param option SortOption
     */
    public reduce<U>(option: ReduceOption<ItemStack<T>, U>, initialValue: U): U {
        return this.itemSlots.reduce(option, initialValue);
    }

    public static FilterName(name: string): FilterOption<ItemStack<Item>> {
        return (itemStack: ItemStack<Item>) => {
            return itemStack.quantity > 0 && !!itemStack.item && itemStack.item.name === name;
        };
    }

    public static TotalQuantity: ReduceOption<ItemStack<Item>, number> = (previousValue: number, currentValue: ItemStack<Item>) => {
        return previousValue + currentValue.quantity;
    }

    public static TotalQuantityOf(name: string): ReduceOption<ItemStack<Item>, number> {
        return (prev: number, curr: ItemStack<Item>) => {
            if (curr.item && curr.item.name === name)
                return prev + curr.quantity;
            return prev;
        };
    }

    public static EmptySlot: FilterOption<ItemStack<Item>> = (a: ItemStack<Item>) => {
        return a.quantity === 0;
    }

    public static NotMaxStack: FilterOption<ItemStack<Item>> = (a: ItemStack<Item>) => {
        return a.quantity < a.maxQuantity;
    }

    public static HighestQuantity: SortOption<ItemStack<Item>> = (a: ItemStack<Item>, b: ItemStack<Item>) => {
        return a.quantity - b.quantity;
    }

    public static LowestQuantity: SortOption<ItemStack<Item>> = (a: ItemStack<Item>, b: ItemStack<Item>) => {
        return b.quantity - a.quantity;
    }

    public consumeItem(itemName: string, amount: number = 1) {
        if (this.filter(Inventory.FilterName(itemName)).length >= amount) {
            const lowestItemStacks = this.filter(Inventory.FilterName(itemName)).sort(Inventory.LowestQuantity);
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

    public serialize(): IInventory {
        return {
            slots: this.itemSlots.serialize()
        };
    }

    public deserialize(saveObject: IInventory) {
        this.itemSlots.deserialize(saveObject.slots, ItemStack);
    }
}
