import { IEffectValues, EffectValues } from "./EffectValues";
import { CombatActionFlags } from "./CombatActionFlag";

export interface ICombatEffectValues extends IEffectValues {
    abilityFlags?: CombatActionFlags;
}

export class CombatEffectValues extends EffectValues implements ICombatEffectValues {
    public abilityFlags: CombatActionFlags;

    public constructor(values?: ICombatEffectValues) {
        super(values);
        this.abilityFlags = values && values.abilityFlags ? values.abilityFlags : CombatActionFlags.All;
    }
}
