import { Perk } from '../Perk';
import { PerkDesc } from '../PerkDesc';

export class ElvenBounty extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk && perk.values.other && perk.values.other.value1 && perk.values.other.value2)
            return "Increases fertility by " + perk.values.other.value2 + "% and cum production by " + perk.values.other.value1 + "mLs.";
        return "";
    }

    public constructor() {
        super("Elven Bounty", "Elven Bounty",
            "After your encounter with an elf, her magic has left you with increased fertility and virility.");
    }
}
