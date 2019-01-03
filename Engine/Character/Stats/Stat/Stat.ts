import { ISerializable } from 'Engine/Utilities/ISerializable';
import { List } from 'Engine/Utilities/List';
import { IStatEffect, StatEffectValue } from 'Engine/Character/Stats/Stat/StatEffect';

export interface IStat {
    raw: number;
}

export class Stat implements IStat, ISerializable<IStat> {
    public readonly effects = new List<IStatEffect>();
    public raw: number;

    public constructor(value: number) {
        this.raw = value;
    }

    public get calculated() {
        return this.effects.reduce((base, effect) =>
            base * this.getValue(effect.multi, base, 1) + this.getValue(effect.flat, base, 0), this.raw);
    }

    private getValue(effectVal: StatEffectValue | undefined, val: number, defaultVal: number): number {
        if (effectVal) {
            if (typeof effectVal === 'function')
                return effectVal(val);
            if (typeof effectVal === 'number')
                return effectVal;
            throw new Error("Type of effectVal was not a number or function");
        }
        return defaultVal;
    }

    public toString() {
        return this.raw + ': ' + this.effects.toString();
    }

    public serialize(): IStat {
        return {
            raw: this.raw,
        };
    }

    public deserialize(saveObject: IStat) {
        this.raw = saveObject.raw;
    }
}
