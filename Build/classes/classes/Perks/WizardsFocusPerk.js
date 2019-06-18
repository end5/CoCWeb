define(["require", "exports", "../PerkType"], function (require, exports, PerkType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 27.01.14.
     */
    class WizardsFocusPerk extends PerkType_1.PerkType {
        desc(params) {
            if (params)
                return "Increases your spell effect modifier by " + params.value1 * 100 + "%.";
            return '';
        }
        constructor() {
            super("Wizard's Focus", "Wizard's Focus", "Your wizard's staff grants you additional focus, reducing the use of fatigue for spells.");
        }
    }
    exports.WizardsFocusPerk = WizardsFocusPerk;
});
//# sourceMappingURL=WizardsFocusPerk.js.map