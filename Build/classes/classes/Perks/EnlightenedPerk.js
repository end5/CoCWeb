define(["require", "exports", "../PerkType", "../GlobalFlags/kGAMECLASS"], function (require, exports, PerkType_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EnlightenedPerk extends PerkType_1.PerkType {
        desc(params) {
            if (kGAMECLASS_1.kGAMECLASS.player.cor >= 10)
                return "<b>DISABLED</b> - Corruption too high!";
            else
                return super.desc(params);
        }
        constructor() {
            super("Enlightened", "Enlightened", "Jojo’s tutelage has given you a master’s focus and you can feel the universe in all its glory spread out before you. You’ve finally surpassed your teacher.");
        }
    }
    exports.EnlightenedPerk = EnlightenedPerk;
});
//# sourceMappingURL=EnlightenedPerk.js.map