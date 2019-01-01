import { Weapon } from 'Engine/Items/Weapon';
import { WeaponName } from '../WeaponName';
import { WeaponPerkType } from 'Content/Items/WeaponPerks';
import { Character } from 'Engine/Character/Character';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';

export class HugeWarhammer extends Weapon {
    public constructor() {
        super(WeaponName.HugeWarhammer, new ItemDesc("Warhammer", "a huge warhammer", "A huge war-hammer made almost entirely of steel that only the strongest warriors could use.  Requires 80 strength to use.  Getting hit with this might stun the victim."), "huge warhammer", "smash", 15, 1600, [WeaponPerkType.Large]);
    }

    public canUse(character: Character): boolean {
        if (character.stats.str >= 80)
            return true;
        CView.text("You aren't strong enough to handle such a heavy weapon!  ");
        return false;
    }
}
