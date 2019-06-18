define(["require", "exports", "../Consumable", "../../PerkLib"], function (require, exports, Consumable_1, PerkLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class DeBimbo extends Consumable_1.Consumable {
        constructor() {
            super("Debimbo", "Debimbo", "a bottle marked as 'Debimbo'", 250);
        }
        get description() {
            if (this.game.player.findPerk(PerkLib_1.PerkLib.BimboBrains) >= 0 || this.game.player.findPerk(PerkLib_1.PerkLib.FutaFaculties) >= 0)
                return "This should totally like, fix your brain and stuff.  You don't really think anything is wrong with your head - it feels all pink and giggly all the time.";
            else
                return "This draft is concocted from five scholar's teas and who knows what else.  Supposedly it will correct the stupifying effects of Bimbo Liqueur.";
        }
        canUse() {
            if (this.game.player.findPerk(PerkLib_1.PerkLib.BimboBrains) >= 0 || this.game.player.findPerk(PerkLib_1.PerkLib.FutaFaculties) >= 0)
                return true;
            this.outputText("You can't use this right now, and it's too expensive to waste!\n\n");
            return false;
        }
        useItem() {
            if (this.game.player.findPerk(PerkLib_1.PerkLib.BimboBrains) >= 0) {
                this.outputText("\n\n(<b>Perk Removed:  Bimbo Brains - Your intelligence and speech patterns are no longer limited to that of a bimbo.</b>)");
                this.game.player.removePerk(PerkLib_1.PerkLib.BimboBrains);
            }
            else if (this.game.player.findPerk(PerkLib_1.PerkLib.FutaFaculties) >= 0) {
                this.outputText("\n\n(<b>Perk Removed:  Futa Faculties - Your intelligence and speech patterns are no longer limited to that of a futanari bimbo.</b>)");
                this.game.player.removePerk(PerkLib_1.PerkLib.FutaFaculties);
            }
            return (false);
        }
        useText() {
            this.outputText("Well, time to see what this smelly, old rat was on about!  You pinch your nose and swallow the foul-tasting mixture with a grimace.  Oh, that's just <i>nasty!</i>  You drop the vial, which shatters on the ground, clutching at your head as a wave of nausea rolls over you.  Stumbling back against a rock for support, you close your eyes.  A constant, pounding ache throbs just behind your temples, and for once, you find yourself speechless.  A pained groan slips through your lips as thoughts and memories come rushing back.  One after another, threads of cognizant thought plow through the simple matrices of your bimbo mind, shredding and replacing them.");
            this.outputText("\n\nYou... you were an air-headed ditz!  A vacuous, idiot-girl with nothing between her ears but hunger for dick and pleasure!  You shudder as your faculties return, the pain diminishing with each passing moment.");
        }
    }
    exports.DeBimbo = DeBimbo;
});
//# sourceMappingURL=DeBimbo.js.map