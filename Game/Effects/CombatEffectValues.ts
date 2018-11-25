import { IEffectValues, EffectValues } from "./EffectValues";
import { CombatActionType } from "../Combat/Actions/CombatActionType";

export interface ICombatEffectValues extends IEffectValues {
    blockedTypes?: CombatActionType;
}

export class CombatEffectValues extends EffectValues implements ICombatEffectValues {
    public blockedTypes: CombatActionType;

    public constructor(values?: ICombatEffectValues) {
        super(values);
        this.blockedTypes = values && values.blockedTypes ? values.blockedTypes : CombatActionType.None;
    }
}
