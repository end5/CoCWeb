import { PerkClass } from "../PerkClass";
import { PerkType } from "../PerkType";

/**
 * Created by aimozg on 27.01.14.
 */

export class SpellcastingAffinityPerk extends PerkType {
    public desc(params?: PerkClass): string {
        if (params) return `Reduces spell costs by ${params.value1}%.`;
        return "";
    }

    public constructor() {
        super("Spellcasting Affinity", "Spellcasting Affinity", "Reduces spell costs.");
    }
}
