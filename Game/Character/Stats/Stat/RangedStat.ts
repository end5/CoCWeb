import { ISerializable } from 'Engine/Utilities/ISerializable';
import { IStat, Stat } from 'Game/Character/Stats/Stat/Stat';
import { DeltaStat, IDeltaStat } from 'Game/Character/Stats/Stat/DeltaStat';
import { IRangedStatEffect } from 'Game/Character/Stats/Stat/RangedStatEffect';

export interface IRangedStat extends IDeltaStat {
    min: IStat;
    max: IStat;
}

export class RangedStat extends DeltaStat implements ISerializable<IRangedStat> {
    public readonly min: Stat;
    public readonly max: Stat;

    public constructor(min: number, raw: number, max: number) {
        super(raw, 0);
        this.min = new Stat(min);
        this.max = new Stat(max);
    }

    public get value() {
        if (super.value > this.max.raw)
            return this.max.raw;
        if (super.value < this.min.raw)
            return this.min.raw;
        return super.value;
    }

    public set value(num: number) {
        super.value = num;
    }

    public addEffect(values: IRangedStatEffect) {
        if (values) {
            if (values.max)
                this.max.effects.add(values.max);
            if (values.min)
                this.min.effects.add(values.min);
        }
        super.addEffect(values);
    }

    public removeEffect(values: IRangedStatEffect) {
        if (values) {
            if (values.max)
                this.max.effects.removeEntry(values.max);
            if (values.min)
                this.min.effects.removeEntry(values.min);
        }
        super.removeEffect(values);
    }

    public toString() {
        return `Min[${this.min.toString()}] Max[${this.max.toString()}] ${super.toString()}`;
    }

    public serialize(): IRangedStat {
        return Object.assign({
            min: this.min.serialize(),
            max: this.max.serialize(),
        }, super.serialize());
    }

    public deserialize(saveObject: IRangedStat) {
        this.min.deserialize(saveObject.min);
        this.max.deserialize(saveObject.max);
        super.deserialize(saveObject);
    }
}
