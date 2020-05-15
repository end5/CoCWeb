import { Weapon } from "../Weapon";

/**
 * Created by aimozg on 10.01.14.
 */

export class BeautifulSword extends Weapon {
    public constructor() {
        super(
            "B.Sword",
            "B.Sword",
            "beautiful sword",
            "a beautiful shining sword",
            "slash",
            7,
            400,
            "This beautiful sword shines brilliantly in the light, showing the flawless craftsmanship of its blade.  The pommel and guard are heavily decorated in gold and brass.  Some craftsman clearly poured his heart and soul into this blade.  (ATK: +Varies) (Cost: 400)",
            "holySword"
        );
    }

    public get attack(): number {
        return 7 + Math.floor(10 - this.game.player.cor / 3);
    }

    public canUse(): boolean {
        if (this.game.player.cor < 35) return true;
        this.outx(
            "You grab hold of the handle of the sword only to have it grow burning hot.  You're forced to let it go lest you burn yourself.  Something within the sword must be displeased.  "
        );
        return false;
    }

    /*
            public  canUse(player:Player, output: boolean): boolean
            {
                if (player.cor >= 35) {
                    if (output) {
                        clearOutput();
                        outx("You grab hold of the handle of the sword only to have it grow burning hot.  You're forced to let it go lest you burn yourself.  Something within the sword must be displeased.  ");
                    }
                    return false;
                } else {
                    return true;
                }
            }
    */
}
