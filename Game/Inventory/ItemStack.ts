import { ISerializable } from 'Engine/Utilities/ISerializable';
import { Item, IItem } from 'Game/Items/Item';
import { getItemFromName } from 'Game/Items/ItemLookup';
import { FilterOption, ReduceOption, SortOption } from 'Engine/Utilities/List';

export interface IItemStack {
    item: IItem;
    amount: number;
    maxAmount: number;
}

export class ItemStack<T extends Item> implements ISerializable<IItemStack> {
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

    public item?: Item;
    private amount: number;
    private maxAmount: number;

    public constructor(item?: T, quantity: number = 0, maxQuantity: number = 5) {
        this.item = item;
        this.amount = quantity;
        this.maxAmount = maxQuantity;
    }

    public get quantity(): number {
        return this.amount;
    }

    public set quantity(value: number) {
        if (this.item && value >= 0) {
            this.amount = value <= this.maxAmount ? value : this.maxAmount;
            if (value === 0) {
                this.item = undefined;
            }
        }
    }

    public get maxQuantity(): number {
        return this.maxAmount;
    }

    public set(itemStack: ItemStack<T>) {
        this.item = itemStack.item;
        this.amount = itemStack.amount;
        this.maxAmount = itemStack.maxAmount;
    }

    public split(amount: number): ItemStack<T> {
        if (amount > 0) {
            const quantity: number = this.quantity - amount > 0 ? this.quantity - amount : 0;
            const returnItemStack: ItemStack<T> = new ItemStack<Item>(this.item, quantity);
            this.quantity -= quantity;

            return returnItemStack;
        }
        return new ItemStack();
    }

    public serialize(): IItemStack | void {
        if (this.item)
            return {
                item: this.item.serialize(),
                amount: this.amount,
                maxAmount: this.maxAmount
            };
    }

    public deserialize(saveObject: IItemStack) {
        if (saveObject) {
            if (saveObject.item)
                this.item = getItemFromName(saveObject.item.name);
            this.amount = saveObject.amount;
            this.maxAmount = saveObject.maxAmount;
        }
    }
}
