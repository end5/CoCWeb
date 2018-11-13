import { Perk } from '../Perk';
import { PerkDesc } from '../PerkDesc';

export class WizardsEndurance extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk && perk.values.other && perk.values.other.value1)
            return "Reduces fatigue cost of spells by " + perk.values.other.value1 + "%.";
        return "";
    }

    public constructor() {
        super("Wizard's Endurance", "Wizard's Endurance",
            "Your spellcasting equipment makes it harder for spell-casting to fatigue you!");
    }
}
