import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';

export class SluttySeduction extends EffectDesc {
    public description(effect: Effect): string {
        return "Increases odds of successfully teasing and lust damage of successful teases by " + effect.values.teaseChance + " points.";
    }

    public constructor() {
        super("Slutty Seduction", "Slutty Seduction",
            "Your armor allows you access to 'Seduce', an improved form of 'Tease'.");
    }
}
