import { Weapon } from "../Weapon";

/**
 * Created by aimozg on 10.01.14.
 */

export class LargeClaymore extends Weapon {
    public constructor() {
        super(
            "Claymor",
            "L.Claymore",
            "large claymore",
            "a large claymore",
            "cleaving sword-slash",
            15,
            1000,
            "A massive sword that a very strong warrior might use.  Requires 40 strength to use.  (ATK: 15) (Cost: 1000)",
            "Large"
        );
    }

    public canUse(): boolean {
        if (this.game.player.str >= 40) return true;
        this.outx("You aren't strong enough to handle such a heavy weapon!  ");
        return false;
    }

    /*
            public  canUse(player:Player, printReason: boolean): boolean
            {
                if (player.str < 40){
                    if (printReason){
                        clearOutput();
                        outx("You aren't strong enough to handle such a heavy weapon!  ");
                    }
                    return false;
                } else return true;
            }
    */
}
