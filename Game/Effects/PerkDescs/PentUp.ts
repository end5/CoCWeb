import { Perk } from '../Perk';
import { PerkDesc } from '../PerkDesc';

export class PentUp extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk && perk.values.other && perk.values.other.value1)
            return "Increases minimum lust by " + Math.round(perk.values.other.value1) + " and makes you more vulnerable to seduction.";
        return "";
    }

    public constructor() {
        super("Pent Up", "Pent Up", "Increases minimum lust and makes you more vulnerable to seduction");
    }
}
