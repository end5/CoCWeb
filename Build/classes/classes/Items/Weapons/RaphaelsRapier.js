define(["require", "exports", "../Weapon", "../../GlobalFlags/kFLAGS", "../../GlobalFlags/kGAMECLASS"], function (require, exports, Weapon_1, kFLAGS_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class RaphaelsRapier extends Weapon_1.Weapon {
        constructor() {
            super("RRapier", "RRapier", "vulpine rapier", "Raphael's vulpine rapier", "slash", 8, 1000, "He's bound it with his red sash around the length like a ribbon, as though he has now gifted it to you.  Perhaps it is his way of congratulating you.");
        }
        get attack() { return 8 + kGAMECLASS_1.kGAMECLASS.flags[kFLAGS_1.kFLAGS.RAPHAEL_RAPIER_TRANING] * 2; }
    }
    exports.RaphaelsRapier = RaphaelsRapier;
});
//# sourceMappingURL=RaphaelsRapier.js.map