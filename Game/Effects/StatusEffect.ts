import { Effect, IEffect } from './Effect';
import { StatusEffectType } from './StatusEffectType';
import { StatusEffectDescLib } from './StatusEffectDescLib';
import { IEffectValues, EffectValues } from './EffectValues';

export class StatusEffect extends Effect<StatusEffectType> {
    public values: EffectValues;
    public constructor(type: StatusEffectType, values?: IEffectValues) {
        super(type, StatusEffectDescLib.get(type)!, values);
        this.values = new EffectValues(values);
    }

    public deserialize(saveObject: IEffect) {
        this.values = new EffectValues(saveObject.values);
        super.deserialize(saveObject);
    }
}
