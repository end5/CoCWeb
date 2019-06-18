define(["require", "exports", "../Armor"], function (require, exports, Armor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 18.01.14.
     */
    class LeatherArmorSegments extends Armor_1.Armor {
        constructor() {
            super("UrtaLta", "UrtaLta", "leather armor segments", "leather armor segments", 5, 76, undefined, "Light", true);
        }
        removeText() {
            this.outputText("You have your old set of " + this.game.armors.LEATHRA.longName + " left over.  ");
        }
        playerRemove() {
            super.playerRemove();
            return this.game.armors.LEATHRA;
        }
    }
    exports.LeatherArmorSegments = LeatherArmorSegments;
});
//# sourceMappingURL=LeatherArmorSegments.js.map