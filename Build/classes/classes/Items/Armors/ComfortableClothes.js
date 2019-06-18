define(["require", "exports", "../Armor"], function (require, exports, Armor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 18.01.14.
     */
    class ComfortableClothes extends Armor_1.Armor {
        constructor() {
            super("C.Cloth", "C.Cloth", "comfortable clothes", "a set of comfortable clothes", 0, 0, "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements.  (DEF: +0) (Cost: 0)", "Light", true);
        }
        get supportsBulge() { return this.game.player.modArmorName != "crotch-hugging clothes"; }
    }
    exports.ComfortableClothes = ComfortableClothes;
});
//# sourceMappingURL=ComfortableClothes.js.map