define(["require", "exports", "../PerkType"], function (require, exports, PerkType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 27.01.14.
     */
    class PiercedCrimstonePerk extends PerkType_1.PerkType {
        desc(params) {
            if (params)
                return "Increases minimum lust by " + Math.round(params.value1) + ".";
            return '';
        }
        constructor() {
            super("Pierced: Crimstone", "Pierced: Crimstone", "You've been pierced with Crimstone and your lust seems to stay a bit higher than before.");
        }
    }
    exports.PiercedCrimstonePerk = PiercedCrimstonePerk;
});
//# sourceMappingURL=PiercedCrimstonePerk.js.map