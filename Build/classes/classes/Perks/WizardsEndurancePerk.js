define(["require", "exports", "../PerkType"], function (require, exports, PerkType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 27.01.14.
     */
    class WizardsEndurancePerk extends PerkType_1.PerkType {
        desc(params) {
            if (params)
                return "Reduces fatigue cost of spells by " + params.value1 + "%.";
            return '';
        }
        constructor() {
            super("Wizard's Endurance", "Wizard's Endurance", "Your spellcasting equipment makes it harder for spell-casting to fatigue you!");
        }
    }
    exports.WizardsEndurancePerk = WizardsEndurancePerk;
});
//# sourceMappingURL=WizardsEndurancePerk.js.map