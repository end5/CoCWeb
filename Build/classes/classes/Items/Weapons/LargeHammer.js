define(["require", "exports", "../Weapon"], function (require, exports, Weapon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class LargeHammer extends Weapon_1.Weapon {
        constructor() {
            super("L.Hammr", "L.Hammr", "large hammer", "Marble's large hammer", "smash", 16, 90, "This two-handed warhammer looks pretty devastating.  You took it from Marble after she refused your advances.", "Large");
        }
        canUse() {
            if (this.game.player.tallness >= 60)
                return true;
            this.outputText("This hammer is too large for you to wield effectively.  ");
            return false;
        }
    }
    exports.LargeHammer = LargeHammer;
});
//# sourceMappingURL=LargeHammer.js.map