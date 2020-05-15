import { Weapon } from "../Weapon";

/**
 * Created by aimozg on 10.01.14.
 */

export class HugeWarhammer extends Weapon {
    public constructor() {
        super(
            "Warhamr",
            "Warhammer",
            "huge warhammer",
            "a huge warhammer",
            "smash",
            15,
            1600,
            "A huge war-hammer made almost entirely of steel that only the strongest warriors could use.  Requires 80 strength to use.  Getting hit with this might stun the victim.  (ATK: 15) (Cost: 1600)",
            "Large"
        );
    }

    public canUse(): boolean {
        if (this.game.player.str >= 80) return true;
        this.outx("You aren't strong enough to handle such a heavy weapon!  ");
        return false;
    }

    /*
            public  canUse(player:Player, printReason: boolean): boolean
            {
                if (player.str<80){
                    if (printReason){
                        clearOutput();
                        outx("You aren't strong enough to handle such a heavy weapon!  ");
                    }
                    return false;
                } else return true;
            }
    */
}
