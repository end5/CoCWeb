import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class WizardsEndurance extends EffectDesc {
    public description(effect: Effect): string {
        return "Reduces fatigue cost of spells by " + effect.values.spellCost + "%.";
    }

    public constructor() {
        super("Wizard's Endurance", "Wizard's Endurance",
            "Your spellcasting equipment makes it harder for spell-casting to fatigue you!");
    }
}
