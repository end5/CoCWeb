import { Perk } from '../Perk';
import { PerkDesc } from '../PerkDesc';

export class SpellcastingAffinity extends PerkDesc {
    public description(perk?: Perk): string {
        if (perk && perk.values.other && perk.values.other.value1)
            return "Reduces spell costs by " + perk.values.other.value1 + "%.";
        return "";
    }

    public constructor() {
        super("Spellcasting Affinity", "Spellcasting Affinity", "Reduces spell costs.");
    }
}
