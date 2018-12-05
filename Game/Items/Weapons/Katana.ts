import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { WeaponPerkType } from './WeaponPerk';
import { Character } from 'Game/Character/Character';
import { ItemDesc } from '../ItemDesc';

export class Katana extends Weapon {
    public constructor() {
        super(WeaponName.Katana, new ItemDesc("Katana", "a katana", "A curved bladed weapon that cuts through flesh with the greatest of ease."), "katana", "keen cut", 10, 500);
        // Take 5 off enemy armor for katana
        this.perks.set(WeaponPerkType.Penetrate, (self: Character, target: Character) => {
            return 5;
        });
    }
}
