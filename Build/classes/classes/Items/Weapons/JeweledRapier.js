define(["require", "exports", "../Weapon", "../../GlobalFlags/kGAMECLASS", "../../GlobalFlags/kFLAGS"], function (require, exports, Weapon_1, kGAMECLASS_1, kFLAGS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class JeweledRapier extends Weapon_1.Weapon {
        constructor() {
            super("JRapier", "JRapier", "jeweled rapier", "a jeweled rapier", "slash", 13, 1400, "This jeweled rapier is ancient but untarnished.  The hilt is wonderfully made, and fits your hand like a tailored glove.  The blade is shiny and perfectly designed for stabbing.");
        }
        get attack() { return (13 + kGAMECLASS_1.kGAMECLASS.flags[kFLAGS_1.kFLAGS.RAPHAEL_RAPIER_TRANING] * 2); }
    }
    exports.JeweledRapier = JeweledRapier;
});
//# sourceMappingURL=JeweledRapier.js.map