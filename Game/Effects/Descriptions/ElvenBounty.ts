import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class ElvenBounty extends EffectDesc {
    public description(effect: Effect): string {
        return "Increases fertility by " + effect.values.fertility.total.multi + "% and cum production by " + effect.values.cumQuantity.total.flat + "mLs.";
    }

    public constructor() {
        super("Elven Bounty", "Elven Bounty",
            "After your encounter with an elf, her magic has left you with increased fertility and virility.");
    }
}
