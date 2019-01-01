import { Item } from './Item';
import { EquipSlot } from 'Engine/Inventory/EquipSlot';
import { Character } from 'Engine/Character/Character';
import { EffectList } from 'Engine/Effects/EffectList';

export abstract class EquipableItem extends Item {
    protected slot: EquipSlot<EquipableItem> | undefined;
    public readonly effects = new EffectList();
    /**
     * Called when this item is being equipped by the character.
     * Can return a new item to be equipped.
     * Add any perks, etc. - This should only handle mechanics, not text output
     * @param slot
     */
    public abstract onEquip(character: Character): void | EquipableItem;

    /**
     * This item is being unequiped by the character. Remove any perks, etc. - This should only handle mechanics, not text output
     * @param character
     */
    public abstract onUnequip(character: Character): void;

    /**
     * Produces any text seen when equiping the item normally
     */
    public abstract equipText(): void;

    /**
     * Produces any text seen when unequiping the item normally
     */
    public abstract unequipText(): void;
}
