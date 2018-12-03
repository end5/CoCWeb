import { ISerializable } from 'Engine/Utilities/ISerializable';
import { Item, IItem } from 'Game/Items/Item';
import { getItemFromName } from 'Game/Items/ItemLookup';

export interface IItemStack {
    item: IItem;
    amount: number;
    maxAmount: number;
}

export class ItemStack<T extends Item> implements ISerializable<IItemStack> {
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
