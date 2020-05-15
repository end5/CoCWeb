import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { Weapon } from "../Weapon";

/**
 * Created by aimozg on 10.01.14.
 */

export class DragonShellShield extends Weapon {
    public constructor() {
        super(
            "DrgnShl",
            "DrgnShl",
            "dragon-shell shield",
            "a dragon-shell shield",
            "smack",
            0,
            1500,
            "A durable shield that has been forged from the remains of the dragon egg you found in the swamp.  Absorbs any fluid attacks you can catch, rendering them useless.",
            "Large"
        );
    }

    public useText(): void {
        // Produces any text seen when equipping the armor normally
        if (this.game.flags[kFLAGS.TIMES_EQUIPPED_EMBER_SHIELD] == 0) {
            this.clearOutput();
            this.outx(
                "Turning the sturdy shield over in inspection, you satisfy yourself as to its craftsmanship and adjust the straps to fit your arm snugly.  You try a few practice swings, but find yourself overbalancing at each one due to the deceptive lightness of the material.  Eventually, though, you pick up the knack of putting enough weight behind it to speed it through the air while thrusting a leg forward to stabilize yourself, and try bashing a nearby rock with it.  You smile with glee as "
            );
            if (this.game.player.str < 80) this.outx("bits and pieces from the surface of the");
            else this.outx("huge shards of the shattered");
            this.outx(" rock are sent flying in all directions.");
            this.outx(
                "\n\nAfter a few more practice bashes and shifts to acquaint yourself with its weight, you think you're ready to try facing an enemy with your new protection.  One last thing... taking off the shield and turning it straps-down, you spit onto the surface.  Satisfyingly, the liquid disappears into the shell as soon as it touches."
            );
        }
        this.game.flags[kFLAGS.TIMES_EQUIPPED_EMBER_SHIELD]++;
    }

    /*
            public  equipEffect(player:Player, output: boolean): void
            {
                if(kGAMECLASS.flags[kFLAGS.TIMES_EQUIPPED_EMBER_SHIELD] == 0) {
                    if (output){
                        clearOutput();
                        outx("Turning the sturdy shield over in inspection, you satisfy yourself as to its craftsmanship and adjust the straps to fit your arm snugly.  You try a few practice swings, but find yourself overbalancing at each one due to the deceptive lightness of the material.  Eventually, though, you pick up the knack of putting enough weight behind it to speed it through the air while thrusting a leg forward to stabilize yourself, and try bashing a nearby rock with it.  You smile with glee as ");
                        if(player.str < 80) outx("bits and pieces from the surface of the");
                        else outx("huge shards of the shattered");
                        outx(" rock are sent flying in all directions.");
                        outx("\n\nAfter a few more practice bashes and shifts to acquaint yourself with its weight, you think you're ready to try facing an enemy with your new protection.  One last thing... taking off the shield and turning it straps-down, you spit onto the surface.  Satisfyingly, the liquid disappears into the shell as soon as it touches.");
                    }
                }
                kGAMECLASS.flags[kFLAGS.TIMES_EQUIPPED_EMBER_SHIELD]++;
            }
    */
}
