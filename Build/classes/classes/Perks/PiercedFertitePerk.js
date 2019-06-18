define(["require", "exports", "../PerkType"], function (require, exports, PerkType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 27.01.14.
     */
    class PiercedFertitePerk extends PerkType_1.PerkType {
        desc(params) {
            if (params)
                return "Increases cum production by " + Math.round(2 * params.value1) + "% and fertility by " + Math.round(params.value1) + ".";
            return '';
        }
        constructor() {
            super("Pierced: Fertite", "Pierced: Fertite", "You've been pierced with Fertite and any male or female organs have become more fertile.");
        }
    }
    exports.PiercedFertitePerk = PiercedFertitePerk;
});
//# sourceMappingURL=PiercedFertitePerk.js.map