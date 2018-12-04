import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class PiercedCrimstone extends EffectDesc {
    public description(effect: Effect): string {
        return "Increases minimum lust by " + Math.round(effect.values.lust.min.flat) + ".";
    }

    public constructor() {
        super("Pierced: Crimstone", "Pierced: Crimstone",
            "You've been pierced with Crimstone and your lust seems to stay a bit higher than before.");
    }
}
