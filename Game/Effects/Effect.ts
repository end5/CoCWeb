import { EffectDesc } from './EffectDescription';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { EffectValues, IEffectValues } from './EffectValues';

export interface IEffect {
    type: string;
    values?: IEffectValues;
}

export abstract class Effect<Type extends string, Desc extends EffectDesc = EffectDesc, Values extends EffectValues = EffectValues> implements ISerializable<IEffect> {
    // desc does not need to be serialized
    private effectType: Type;
    public readonly desc: Desc;
    public abstract values: Values;
    protected reducedValues?: IEffectValues;
    public constructor(type: Type, desc: Desc, values?: IEffectValues) {
        this.effectType = type;
        this.desc = desc;
        this.reducedValues = values;
    }

    public get type(): Type {
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
        this.effectType = saveObject.type as Type;
        this.reducedValues = saveObject.values;
    }
}
