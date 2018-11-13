import { Perk } from '../Perk';
import { PerkDesc } from '../PerkDesc';

export class PiercedFertite extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk && perk.values.other && perk.values.other.value1)
            return "Increases cum production by " + Math.round(2 * perk.values.other.value1) + "% and fertility by " + Math.round(perk.values.other.value1) + ".";
        return "";
    }

    public constructor() {
        super("Pierced: Fertite", "Pierced: Fertite",
            "You've been pierced with Fertite and any male or female organs have become more fertile.");
    }
}
