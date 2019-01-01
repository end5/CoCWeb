import { Character } from 'Engine/Character/Character';
import { EquipableItem } from './EquipableItem';
import { ItemType } from './ItemType';
import { ItemDesc } from './ItemDesc';

export class CockSock extends EquipableItem {
    public constructor(name: string) {
        super(name, ItemType.Misc, new ItemDesc(name + 'cock sock'));
    }

    public equipText(): void { }

    public unequipText(): void { }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character) { }

    public useText(character: Character) { }

    public onEquip(character: Character) { }

    public onUnequip(character: Character) { }
}
