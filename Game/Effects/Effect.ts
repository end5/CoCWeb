import { EffectDesc } from './EffectDesc';
import { ISerializable } from 'Engine/Utilities/ISerializable';
import { EffectValues, IEffectValues } from './EffectValues';
import { EffectDescLib } from './EffectDescLib';

export interface IEffect {
    type: string;
    values?: IEffectValues;
}

export class Effect implements ISerializable<IEffect> {
    private effectType: string;
    public readonly desc: EffectDesc;
    public readonly values: EffectValues;
    protected reducedValues?: IEffectValues;
    public constructor(type: string, values?: IEffectValues) {
        this.effectType = type;
        this.desc = EffectDescLib.get(name);
        this.reducedValues = values;
        this.values = new EffectValues(values);
    }

    public get type(): string {
        return this.effectType;
    }

    public serialize(): IEffect {
        if (this.reducedValues)
            return {
                type: this.effectType,
            };
        else
            return {
                type: this.effectType,
                values: this.reducedValues
            };
    }

    public deserialize(saveObject: IEffect) {
        this.effectType = saveObject.type;
        this.reducedValues = saveObject.values;
    }
}
