import { ISerializable } from 'Engine/Utilities/ISerializable';
import { IStat, Stat } from 'Game/Character/Stats/Stat/Stat';
import { DeltaStat, IDeltaStat } from 'Game/Character/Stats/Stat/DeltaStat';
import { IRangedStatEffect } from 'Game/Character/Stats/Stat/RangedStatEffect';

export interface IRangedStat extends IDeltaStat {
    min: IStat;
    max: IStat;
}

export class RangedStat extends DeltaStat implements ISerializable<IRangedStat> {
    private minStat: Stat;
    private maxStat: Stat;

    public constructor(min: number, raw: number, max: number) {
        super(raw, 0);
        this.minStat = new Stat(min);
        this.maxStat = new Stat(max);
    }

    public get value() {
        if (super.value > this.maxStat.raw)
            return this.maxStat.raw;
        if (super.value < this.minStat.raw)
            return this.minStat.raw;
        return super.value;
    }

    public set value(num: number) {
        super.value = num;
    }

    public get min() { return this.minStat.calculated; }
    public set min(num: number) { this.minStat.raw = num; }

    public get max() { return this.maxStat.calculated; }
    public set max(num: number) { this.maxStat.raw = num; }

    public addEffect(values: IRangedStatEffect) {
        if (values) {
            if (values.max)
                this.maxStat.effects.add(values.max);
            if (values.min)
                this.minStat.effects.add(values.min);
        }
        super.addEffect(values);
    }

    public removeEffect(values: IRangedStatEffect) {
        if (values) {
            if (values.max)
                this.maxStat.effects.removeEntry(values.max);
            if (values.min)
                this.minStat.effects.removeEntry(values.min);
        }
        super.removeEffect(values);
    }

    public toString() {
        return `Min[${this.minStat.toString()}] Max[${this.maxStat.toString()}] ${super.toString()}`;
    }

    public serialize(): IRangedStat {
        return Object.assign({
            min: this.minStat.serialize(),
            max: this.maxStat.serialize(),
        }, super.serialize());
    }

    public deserialize(saveObject: IRangedStat) {
        this.minStat.deserialize(saveObject.min);
        this.maxStat.deserialize(saveObject.max);
        super.deserialize(saveObject);
    }
}
