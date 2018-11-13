import { Perk } from '../Perk';
import { PerkDesc } from '../PerkDesc';

export class SluttySeduction extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk && perk.values.other && perk.values.other.value1)
            return "Increases odds of successfully teasing and lust damage of successful teases by " + perk.values.other.value1 + " points.";
        return "";
    }

    public constructor() {
        super("Slutty Seduction", "Slutty Seduction",
            "Your armor allows you access to 'Seduce', an improved form of 'Tease'.");
    }
}
