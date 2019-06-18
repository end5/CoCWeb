define(["require", "exports", "../Armor"], function (require, exports, Armor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class ComfortableUnderclothes extends Armor_1.Armor {
        constructor() {
            super("c.under", "c.under", "comfortable underclothes", "comfortable underclothes", 0, 0, "comfortable underclothes", "");
        }
        playerRemove() {
            return; //Player never picks up their underclothes
        }
    }
    exports.ComfortableUnderclothes = ComfortableUnderclothes;
});
//# sourceMappingURL=ComfortableUnderclothes.js.map