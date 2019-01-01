import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from '../WeaponName';
import { WeaponPerkType } from 'Content/Items/WeaponPerks';
import { Character } from 'Engine/Character/Character';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';

export class LargeClaymore extends Weapon {
    public constructor() {
        super(WeaponName.LargeClaymore, new ItemDesc("L.Claymore", "a large claymore", "A massive sword that a very strong warrior might use.  Requires 40 strength to use."), "large claymore", "cleaving sword-slash", 15, 1000, [WeaponPerkType.Large]);
    }

    public canUse(character: Character): boolean {
        if (character.stats.str >= 40)
            return true;
        CView.text("You aren't strong enough to handle such a heavy weapon!  ");
        return false;
    }
}
