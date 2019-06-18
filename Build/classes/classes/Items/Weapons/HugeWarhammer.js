define(["require", "exports", "../Weapon"], function (require, exports, Weapon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class HugeWarhammer extends Weapon_1.Weapon {
        constructor() {
            super("Warhamr", "Warhammer", "huge warhammer", "a huge warhammer", "smash", 15, 1600, "A huge war-hammer made almost entirely of steel that only the strongest warriors could use.  Requires 80 strength to use.  Getting hit with this might stun the victim.  (ATK: 15) (Cost: 1600)", "Large");
        }
        canUse() {
            if (this.game.player.str >= 80)
                return true;
            this.outputText("You aren't strong enough to handle such a heavy weapon!  ");
            return false;
        }
    }
    exports.HugeWarhammer = HugeWarhammer;
});
//# sourceMappingURL=HugeWarhammer.js.map