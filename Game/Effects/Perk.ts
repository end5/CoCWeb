import { Effect, IEffect } from './Effect';
import { PerkType } from './PerkType';
import { PerkDescLib } from './PerkDescLib';
import { IEffectValues, EffectValues } from './EffectValues';
import { PerkDesc } from './PerkDesc';

export class Perk extends Effect<PerkType, PerkDesc> {
    public values: EffectValues;
    public constructor(type: PerkType, values?: IEffectValues) {
        super(type, PerkDescLib.get(type)!, values);
        this.values = new EffectValues(values);
    }

    public deserialize(saveObject: IEffect) {
        this.values = new EffectValues(saveObject.values);
        super.deserialize(saveObject);
    }
}
