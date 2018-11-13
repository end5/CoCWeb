import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { WeaponPerkType } from './WeaponPerk';
import { Character } from '../../Character/Character';
import { ItemDesc } from '../ItemDesc';
import { CView } from '../../../Page/ContentView';

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
