define(["require", "exports", "../PerkType"], function (require, exports, PerkType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 27.01.14.
     */
    class SpellcastingAffinityPerk extends PerkType_1.PerkType {
        desc(params) {
            if (params)
                return "Reduces spell costs by " + params.value1 + "%.";
            return '';
        }
        constructor() {
            super("Spellcasting Affinity", "Spellcasting Affinity", "Reduces spell costs.");
        }
    }
    exports.SpellcastingAffinityPerk = SpellcastingAffinityPerk;
});
//# sourceMappingURL=SpellcastingAffinityPerk.js.map