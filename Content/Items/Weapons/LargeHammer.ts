import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from '../WeaponName';
import { WeaponPerkType } from 'Content/Items/WeaponPerks';
import { Character } from 'Engine/Character/Character';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';

export class LargeHammer extends Weapon {
    public constructor() {
        super(WeaponName.LargeHammer, new ItemDesc("L.Hammr", "Marble's large hammer", "This two-handed warhammer looks pretty devastating.  You took it from Marble after she refused your advances."), "large hammer", "smash", 16, 90, [WeaponPerkType.Large]);
    }

    public canUse(character: Character): boolean {
        if (character.body.tallness >= 60)
            return true;
        CView.text("This hammer is too large for you to wield effectively.  ");
        return false;
    }
}
