define(["require", "exports", "../PerkType"], function (require, exports, PerkType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 27.01.14.
     */
    class SluttySeductionPerk extends PerkType_1.PerkType {
        desc(params) {
            if (params)
                return "Increases odds of successfully teasing and lust damage of successful teases by " + params.value1 + " points.";
            return '';
        }
        constructor() {
            super("Slutty Seduction", "Slutty Seduction", "Your armor allows you access to 'Seduce', an improved form of 'Tease'.");
        }
    }
    exports.SluttySeductionPerk = SluttySeductionPerk;
});
//# sourceMappingURL=SluttySeductionPerk.js.map