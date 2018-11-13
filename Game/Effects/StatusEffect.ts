import { Effect } from './Effect';
import { StatusEffectType } from './StatusEffectType';
import { StatusEffectDescLib } from './StatusEffectDescLib';
import { IEffectValues } from './EffectValues';

export class StatusEffect extends Effect<StatusEffectType> {
    public constructor(type: StatusEffectType, values?: IEffectValues) {
        super(type, StatusEffectDescLib.get(type)!, values);
    }
}
