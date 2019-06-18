define(["require", "exports", "../PerkType"], function (require, exports, PerkType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 27.01.14.
     */
    class ElvenBountyPerk extends PerkType_1.PerkType {
        desc(params) {
            if (params)
                return "Increases fertility by " + params.value2 + "% and cum production by " + params.value1 + "mLs.";
            return '';
        }
        constructor() {
            super("Elven Bounty", "Elven Bounty", "After your encounter with an elf, her magic has left you with increased fertility and virility.");
        }
    }
    exports.ElvenBountyPerk = ElvenBountyPerk;
});
//# sourceMappingURL=ElvenBountyPerk.js.map