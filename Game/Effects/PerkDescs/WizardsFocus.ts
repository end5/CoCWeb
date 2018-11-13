import { Perk } from '../Perk';
import { PerkDesc } from '../PerkDesc';

export class WizardsFocus extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk && perk.values.other && perk.values.other.value1)
            return "Increases your spell effect modifier by " + perk.values.other.value1 * 100 + "%.";
        return "";
    }

    public constructor() {
        super("Wizard's Focus", "Wizard's Focus",
            "Your wizard's staff grants you additional focus, reducing the use of fatigue for spells.");
    }
}
