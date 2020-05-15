import { PerkLib } from "../../PerkLib";
import { Consumable } from "../Consumable";

/**
 * Created by aimozg on 10.01.14.
 */

export class DeBimbo extends Consumable {
    public constructor() {
        super("Debimbo", "Debimbo", "a bottle marked as 'Debimbo'", 250);
    }

    public get description(): string {
        if (
            this.game.player.findPerk(PerkLib.BimboBrains) >= 0 ||
            this.game.player.findPerk(PerkLib.FutaFaculties) >= 0
        )
            return "This should totally like, fix your brain and stuff.  You don't really think anything is wrong with your head - it feels all pink and giggly all the time.";
        else
            return "This draft is concocted from five scholar's teas and who knows what else.  Supposedly it will correct the stupifying effects of Bimbo Liqueur.";
    }

    public canUse(): boolean {
        if (
            this.game.player.findPerk(PerkLib.BimboBrains) >= 0 ||
            this.game.player.findPerk(PerkLib.FutaFaculties) >= 0
        )
            return true;
        this.outx("You can't use this right now, and it's too expensive to waste!\n\n");
        return false;
    }

    public useItem(): boolean {
        if (this.game.player.findPerk(PerkLib.BimboBrains) >= 0) {
            this.outx(
                "\n\n(<b>Perk Removed:  Bimbo Brains - Your intelligence and speech patterns are no longer limited to that of a bimbo.</b>)"
            );
            this.game.player.removePerk(PerkLib.BimboBrains);
        } else if (this.game.player.findPerk(PerkLib.FutaFaculties) >= 0) {
            this.outx(
                "\n\n(<b>Perk Removed:  Futa Faculties - Your intelligence and speech patterns are no longer limited to that of a futanari bimbo.</b>)"
            );
            this.game.player.removePerk(PerkLib.FutaFaculties);
        }
        return false;
    }

    public useText(): void {
        this.outx(
            "Well, time to see what this smelly, old rat was on about!  You pinch your nose and swallow the foul-tasting mixture with a grimace.  Oh, that's just <i>nasty!</i>  You drop the vial, which shatters on the ground, clutching at your head as a wave of nausea rolls over you.  Stumbling back against a rock for support, you close your eyes.  A constant, pounding ache throbs just behind your temples, and for once, you find yourself speechless.  A pained groan slips through your lips as thoughts and memories come rushing back.  One after another, threads of cognizant thought plow through the simple matrices of your bimbo mind, shredding and replacing them."
        );
        this.outx(
            "\n\nYou... you were an air-headed ditz!  A vacuous, idiot-girl with nothing between her ears but hunger for dick and pleasure!  You shudder as your faculties return, the pain diminishing with each passing moment."
        );
    }
}
