import { Effect } from "../Effect";
import { EffectDesc } from "../EffectDesc";

export class WizardsFocus extends EffectDesc {
    public description(effect: Effect): string {
        return "Increases your spell effect modifier by " + effect.values.spellCost.flat * 100 + "%.";
    }

    public constructor() {
        super("Wizard's Focus", "Wizard's Focus",
            "Your wizard's staff grants you additional focus, reducing the use of fatigue for spells.");
    }
}
