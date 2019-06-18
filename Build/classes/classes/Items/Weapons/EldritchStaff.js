define(["require", "exports", "../Weapon", "../WeaponLib", "../../PerkLib"], function (require, exports, Weapon_1, WeaponLib_1, PerkLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class EldritchStaff extends Weapon_1.Weapon {
        constructor() {
            super("E.Staff", "E.Staff", "eldritch staff", "an eldritch staff", "thwack", 10, WeaponLib_1.WeaponLib.DEFAULT_VALUE, "This eldritch staff once belonged to the Harpy Queen, who was killed after her defeat at your hands.  It fairly sizzles with magical power.", "Wizard's Focus");
        }
        playerEquip() {
            while (this.game.player.findPerk(PerkLib_1.PerkLib.WizardsFocus) >= 0)
                this.game.player.removePerk(PerkLib_1.PerkLib.WizardsFocus);
            this.game.player.createPerk(PerkLib_1.PerkLib.WizardsFocus, 0.6, 0, 0, 0);
            return super.playerEquip();
        }
        playerRemove() {
            while (this.game.player.findPerk(PerkLib_1.PerkLib.WizardsFocus) >= 0)
                this.game.player.removePerk(PerkLib_1.PerkLib.WizardsFocus);
            return super.playerRemove();
        }
    }
    exports.EldritchStaff = EldritchStaff;
});
//# sourceMappingURL=EldritchStaff.js.map