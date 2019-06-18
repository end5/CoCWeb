define(["require", "exports", "../PerkType", "../GlobalFlags/kGAMECLASS"], function (require, exports, PerkType_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ControlledBreathPerk extends PerkType_1.PerkType {
        desc(params) {
            if (kGAMECLASS_1.kGAMECLASS.player.cor >= 30)
                return "<b>DISABLED</b> - Corruption too high!";
            else
                return super.desc(params);
        }
        constructor() {
            super("Controlled Breath", "Controlled Breath", "Jojo’s training allows you to recover more quickly. Increases rate of fatigue regeneration by 10%");
        }
    }
    exports.ControlledBreathPerk = ControlledBreathPerk;
});
//# sourceMappingURL=ControlledBreathPerk.js.map