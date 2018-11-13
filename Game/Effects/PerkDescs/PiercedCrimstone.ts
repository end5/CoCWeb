import { Perk } from '../Perk';
import { PerkDesc } from '../PerkDesc';

export class PiercedCrimstone extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk && perk.values.other && perk.values.other.value1)
            return "Increases minimum lust by " + Math.round(perk.values.other.value1) + ".";
        return "";
    }

    public constructor() {
        super("Pierced: Crimstone", "Pierced: Crimstone",
            "You've been pierced with Crimstone and your lust seems to stay a bit higher than before.");
    }
}
