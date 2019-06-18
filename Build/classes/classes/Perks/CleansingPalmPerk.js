define(["require", "exports", "../PerkType", "../GlobalFlags/kGAMECLASS"], function (require, exports, PerkType_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CleansingPalmPerk extends PerkType_1.PerkType {
        desc(params) {
            if (kGAMECLASS_1.kGAMECLASS.player.cor >= 10)
                return "<b>DISABLED</b> - Corruption too high!";
            else
                return super.desc(params);
        }
        constructor() {
            super("Cleansing Palm", "Cleansing Palm", "A ranged fighting technique of Jojo’s order, allows you to blast your enemies with waves of pure spiritual energy, weakening them and hurting the corrupt.");
        }
    }
    exports.CleansingPalmPerk = CleansingPalmPerk;
});
//# sourceMappingURL=CleansingPalmPerk.js.map