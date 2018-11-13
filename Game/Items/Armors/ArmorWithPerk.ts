import { Armor, ArmorClass } from './Armor';
import { ArmorName } from './ArmorName';
import { Character } from '../../Character/Character';
import { Perk } from '../../Effects/Perk';
import { ItemDesc } from '../ItemDesc';

export class ArmorWithPerk extends Armor {
    public readonly perk: Perk;
    public readonly perkDesc: string;

    public constructor(name: ArmorName, desc: ItemDesc, displayName: string, defense: number, value: number, armorClass: ArmorClass, perk: Perk, perkDesc: string = "", supportsBulge: boolean = false) {
        super(name, desc, displayName, defense, value, armorClass, supportsBulge);
        this.perk = perk;
        this.perkDesc = perkDesc;
    }

    public onEquip(character: Character): void {
        while (character.perks.has(this.perk.type))
            character.perks.remove(this.perk.type);
        character.perks.add(this.perk.type, this.perk.values);
    }

    public onUnequip(character: Character): void {
        while (character.perks.has(this.perk.type))
            character.perks.remove(this.perk.type);
        super.onUnequip(character);
    }
}
