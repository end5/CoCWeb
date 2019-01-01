import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';

export class SpellcastingAffinity extends EffectDesc {
    public description(effect: Effect): string {
        return "Reduces spell costs by " + effect.values.spellCost + "%.";
    }

    public constructor() {
        super("Spellcasting Affinity", "Spellcasting Affinity", "Reduces spell costs.");
    }
}
