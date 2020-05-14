import { PerkLib } from "../../PerkLib";
import { Weapon } from "../Weapon";

/**
 * Created by aimozg on 10.01.14.
 */

export class Spellblade extends Weapon {

    public constructor() {
        super("S.Blade", "S.Blade", "inscribed spellblade", "a spellblade", "slash", 8, 500, "Forged not by a swordsmith but a sorceress, this arcane-infused blade amplifies your magic.  Unlike the wizard staves it is based on, this weapon also has a sharp edge, a technological innovation which has proven historically useful in battle.", "Wizard's Focus");
    }

    public playerEquip(): Weapon {
        while (this.game.player.findPerk(PerkLib.WizardsFocus) >= 0) this.game.player.removePerk(PerkLib.WizardsFocus);
        this.game.player.createPerk(PerkLib.WizardsFocus, 0.5, 0, 0, 0);
        return super.playerEquip();
    }

    public playerRemove() {
        while (this.game.player.findPerk(PerkLib.WizardsFocus) >= 0) this.game.player.removePerk(PerkLib.WizardsFocus);
        return super.playerRemove();
    }

    /*
            public  equipEffect(player:Player, output: boolean): void
            {
                player.createPerk(PerkLib.WizardsFocus,.5,0,0,0);
            }

            public  unequipEffect(player:Player, output: boolean): void
            {
                player.removePerk(PerkLib.WizardsFocus);
            }
    */
}

