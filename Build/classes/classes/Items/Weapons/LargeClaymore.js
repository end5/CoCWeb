define(["require", "exports", "../Weapon"], function (require, exports, Weapon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class LargeClaymore extends Weapon_1.Weapon {
        constructor() {
            super("Claymor", "L.Claymore", "large claymore", "a large claymore", "cleaving sword-slash", 15, 1000, "A massive sword that a very strong warrior might use.  Requires 40 strength to use.  (ATK: 15) (Cost: 1000)", "Large");
        }
        canUse() {
            if (this.game.player.str >= 40)
                return true;
            this.outputText("You aren't strong enough to handle such a heavy weapon!  ");
            return false;
        }
    }
    exports.LargeClaymore = LargeClaymore;
});
//# sourceMappingURL=LargeClaymore.js.map