define(["require", "exports", "../PerkType"], function (require, exports, PerkType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 27.01.14.
     */
    class PentUpPerk extends PerkType_1.PerkType {
        desc(params) {
            if (params)
                return "Increases minimum lust by " + Math.round(params.value1) + " and makes you more vulnerable to seduction.";
            return '';
        }
        constructor() {
            super("Pent Up", "Pent Up", "Increases minimum lust and makes you more vulnerable to seduction");
        }
    }
    exports.PentUpPerk = PentUpPerk;
});
//# sourceMappingURL=PentUpPerk.js.map