define(["require", "exports", "../Weapon", "../../PerkLib"], function (require, exports, Weapon_1, PerkLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class WizardsStaff extends Weapon_1.Weapon {
        constructor() {
            super("W.Staff", "W. Staff", "wizard's staff", "a wizard's staff", "smack", 3, 350, "This staff is made of very old wood and seems to tingle to the touch.  The top has an odd zig-zag shape to it, and the wood is worn smooth from lots of use.  It probably belonged to a wizard at some point and would aid magic use. (ATK: 3)", "Wizard's Focus");
        }
        playerEquip() {
            while (this.game.player.findPerk(PerkLib_1.PerkLib.WizardsFocus) >= 0)
                this.game.player.removePerk(PerkLib_1.PerkLib.WizardsFocus);
            this.game.player.createPerk(PerkLib_1.PerkLib.WizardsFocus, 0.4, 0, 0, 0);
            return super.playerEquip();
        }
        playerRemove() {
            while (this.game.player.findPerk(PerkLib_1.PerkLib.WizardsFocus) >= 0)
                this.game.player.removePerk(PerkLib_1.PerkLib.WizardsFocus);
            return super.playerRemove();
        }
    }
    exports.WizardsStaff = WizardsStaff;
});
//# sourceMappingURL=WizardsStaff.js.map