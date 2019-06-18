define(["require", "exports", "../../Monster", "../../CockTypesEnum"], function (require, exports, Monster_1, CockTypesEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImpGang extends Monster_1.Monster {
        get capitalA() {
            return "gang of imps";
        }
        constructor() {
            super();
            this.removeStatuses();
            this.removePerks();
            this.removeCock(0, this.cocks.length);
            this.removeVagina(0, this.vaginas.length);
            this.removeBreastRow(0, this.breastRows.length);
            this.createCock(12, 1.5);
            this.createCock(25, 2.5);
            this.createCock(25, 2.5);
            this.cocks[2].cockType = CockTypesEnum_1.CockTypesEnum.DOG;
            this.cocks[2].knotMultiplier = 2;
            this.balls = 2;
            this.ballSize = 3;
            this.a = "a mob of imps";
            this.short = "imp gang";
            this.skinTone = "imp mob";
        }
    }
    exports.ImpGang = ImpGang;
});
//# sourceMappingURL=ImpGang.js.map