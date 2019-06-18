define(["require", "exports", "../Weapon", "../../GlobalFlags/kFLAGS"], function (require, exports, Weapon_1, kFLAGS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class DragonShellShield extends Weapon_1.Weapon {
        constructor() {
            super("DrgnShl", "DrgnShl", "dragon-shell shield", "a dragon-shell shield", "smack", 0, 1500, "A durable shield that has been forged from the remains of the dragon egg you found in the swamp.  Absorbs any fluid attacks you can catch, rendering them useless.", "Large");
        }
        useText() {
            if (this.game.flags[kFLAGS_1.kFLAGS.TIMES_EQUIPPED_EMBER_SHIELD] == 0) {
                this.clearOutput();
                this.outputText("Turning the sturdy shield over in inspection, you satisfy yourself as to its craftsmanship and adjust the straps to fit your arm snugly.  You try a few practice swings, but find yourself overbalancing at each one due to the deceptive lightness of the material.  Eventually, though, you pick up the knack of putting enough weight behind it to speed it through the air while thrusting a leg forward to stabilize yourself, and try bashing a nearby rock with it.  You smile with glee as ");
                if (this.game.player.str < 80)
                    this.outputText("bits and pieces from the surface of the");
                else
                    this.outputText("huge shards of the shattered");
                this.outputText(" rock are sent flying in all directions.");
                this.outputText("\n\nAfter a few more practice bashes and shifts to acquaint yourself with its weight, you think you're ready to try facing an enemy with your new protection.  One last thing... taking off the shield and turning it straps-down, you spit onto the surface.  Satisfyingly, the liquid disappears into the shell as soon as it touches.");
            }
            this.game.flags[kFLAGS_1.kFLAGS.TIMES_EQUIPPED_EMBER_SHIELD]++;
        }
    }
    exports.DragonShellShield = DragonShellShield;
});
//# sourceMappingURL=DragonShellShield.js.map