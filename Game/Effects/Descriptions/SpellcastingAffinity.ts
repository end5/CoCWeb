import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class SpellcastingAffinity extends EffectDesc {
    public description(effect: Effect): string {
        return "Reduces spell costs by " + effect.values.spellCost + "%.";
    }

    public constructor() {
        super("Spellcasting Affinity", "Spellcasting Affinity", "Reduces spell costs.");
    }
}
