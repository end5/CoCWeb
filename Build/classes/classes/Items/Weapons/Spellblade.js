define(["require", "exports", "../Weapon", "../../PerkLib"], function (require, exports, Weapon_1, PerkLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class Spellblade extends Weapon_1.Weapon {
        constructor() {
            super("S.Blade", "S.Blade", "inscribed spellblade", "a spellblade", "slash", 8, 500, "Forged not by a swordsmith but a sorceress, this arcane-infused blade amplifies your magic.  Unlike the wizard staves it is based on, this weapon also has a sharp edge, a technological innovation which has proven historically useful in battle.", "Wizard's Focus");
        }
        playerEquip() {
            while (this.game.player.findPerk(PerkLib_1.PerkLib.WizardsFocus) >= 0)
                this.game.player.removePerk(PerkLib_1.PerkLib.WizardsFocus);
            this.game.player.createPerk(PerkLib_1.PerkLib.WizardsFocus, 0.5, 0, 0, 0);
            return super.playerEquip();
        }
        playerRemove() {
            while (this.game.player.findPerk(PerkLib_1.PerkLib.WizardsFocus) >= 0)
                this.game.player.removePerk(PerkLib_1.PerkLib.WizardsFocus);
            return super.playerRemove();
        }
    }
    exports.Spellblade = Spellblade;
});
//# sourceMappingURL=Spellblade.js.map