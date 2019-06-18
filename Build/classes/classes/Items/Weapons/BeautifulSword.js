define(["require", "exports", "../Weapon"], function (require, exports, Weapon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class BeautifulSword extends Weapon_1.Weapon {
        constructor() {
            super("B.Sword", "B.Sword", "beautiful sword", "a beautiful shining sword", "slash", 7, 400, "This beautiful sword shines brilliantly in the light, showing the flawless craftsmanship of its blade.  The pommel and guard are heavily decorated in gold and brass.  Some craftsman clearly poured his heart and soul into this blade.  (ATK: +Varies) (Cost: 400)", "holySword");
        }
        get attack() { return 7 + Math.floor(10 - this.game.player.cor / 3); }
        canUse() {
            if (this.game.player.cor < 35)
                return true;
            this.outputText("You grab hold of the handle of the sword only to have it grow burning hot.  You're forced to let it go lest you burn yourself.  Something within the sword must be displeased.  ");
            return false;
        }
    }
    exports.BeautifulSword = BeautifulSword;
});
//# sourceMappingURL=BeautifulSword.js.map