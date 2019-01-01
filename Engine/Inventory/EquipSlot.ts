import { ISerializable } from 'Engine/Utilities/ISerializable';
import { FilterOption, List } from 'Engine/Utilities/List';
import { Character } from 'Engine/Character/Character';
import { EquipableItem } from 'Engine/Items/EquipableItem';
import { IItem } from 'Engine/Items/Item';
import { ItemDict } from 'Engine/Items/ItemDict';
import { Effect } from 'Engine/Effects/Effect';

export interface IEquipSlot {
    item: IItem;
}

export class EquipSlot<T extends EquipableItem> implements ISerializable<IEquipSlot> {
    public static FilterName<T extends EquipableItem>(name: string): FilterOption<EquipSlot<T>> {
        return (a: EquipSlot<T>) => {
            return !!a.item && a.item.name === name;
        };
    }

    private character: Character;
    private equippedItem?: T;
    public readonly slotEffects: List<Effect>;

    public constructor(character: Character) {
        this.character = character;
        this.slotEffects = new List<Effect>();
    }

    public get item(): T | undefined {
        return this.equippedItem;
    }

    public isEquipped(): boolean {
        return !!this.equippedItem;
    }

    public equip(item: T): T | undefined {
        if (item) {
            let unequippedItem;
            if (this.isEquipped())
                unequippedItem = this.unequip();

            const itemToEquip = item.onEquip(this.character);

            for (const effect of item.effects)
                this.character.effects.add(effect);

            for (const effect of this.slotEffects)
                this.character.effects.add(effect);

            if (itemToEquip)
                this.equippedItem = itemToEquip as T;
            else
                this.equippedItem = item;

            if (unequippedItem)
                return unequippedItem;
        }
        return;
    }

    public unequip(): T | undefined {
        if (!this.equippedItem) return;
        const unequippedItem = this.equippedItem;
        this.equippedItem.onUnequip(this.character);
        this.equippedItem = undefined;

        for (const effect of unequippedItem.effects)
            this.character.effects.removeEntry(effect);

        for (const effect of this.slotEffects)
            this.character.effects.removeEntry(effect);

        return unequippedItem;
    }

    public serialize(): IEquipSlot | void {
        if (this.equippedItem)
            return { item: this.equippedItem.serialize() };
    }

    public deserialize(saveObject: IEquipSlot) {
        if (saveObject && saveObject.item) {
            this.equip(ItemDict.getByName(saveObject.item.name) as T);
        }
    }
}
