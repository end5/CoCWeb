import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class PiercedFertite extends EffectDesc {
    public description(effect: Effect): string {
        return "Increases cum production by " + Math.round(2 * effect.values.cumQuantity.total.multi) + "% and fertility by " + Math.round(effect.values.fertility.total.flat) + ".";
    }

    public constructor() {
        super("Pierced: Fertite", "Pierced: Fertite",
            "You've been pierced with Fertite and any male or female organs have become more fertile.");
    }
}
