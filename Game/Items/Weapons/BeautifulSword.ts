import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { WeaponPerkType } from './WeaponPerk';
import { Character } from '../../Character/Character';
import { ItemDesc } from '../ItemDesc';
import { CView } from '../../../Page/ContentView';
import { CharDict } from '../../CharDict';

export class BeautifulSword extends Weapon {
    public constructor() {
        super(WeaponName.BeautifulSword, new ItemDesc("B.Sword", "a beautiful shining sword", "This beautiful sword shines brilliantly in the light, showing the flawless craftsmanship of its blade.  The pommel and guard are heavily decorated in gold and brass.  Some craftsman clearly poured his heart and soul into this blade."), "beautiful sword", "slash", 7, 400, [WeaponPerkType.HolySword]);
    }

    public get attack(): number {
        return 7 + Math.floor(10 - CharDict.player!.stats.cor / 3);
    }

    public canUse(character: Character): boolean {
        if (character.stats.cor < 35)
            return true;
        CView.text("You grab hold of the handle of the sword only to have it grow burning hot.  You're forced to let it go lest you burn yourself.  Something within the sword must be displeased.  ");
        return false;
    }
}
