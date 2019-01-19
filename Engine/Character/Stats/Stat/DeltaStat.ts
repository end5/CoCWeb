import { ISerializable } from 'Engine/Utilities/ISerializable';
import { Stat, IStat } from 'Engine/Character/Stats/Stat/Stat';
import { DeltaStatEffect } from 'Engine/Character/Stats/Stat/DeltaStatEffect';

export interface IDeltaStat {
    base: IStat;
    delta: IStat;
    total: IStat;
}

export class DeltaStat implements ISerializable<IDeltaStat> {
    private base: Stat;
    private deltaStat: Stat;
    private totalStat: Stat;
    protected calculatedValue: number = 0;

    public constructor(base: number, delta: number) {
        this.base = new Stat(base);
        this.deltaStat = new Stat(delta);
        this.totalStat = new Stat(this.base.raw + this.deltaStat.raw);
        this.calculatedValue = this.totalStat.calculated;
    }

    protected recalculate() {
        this.totalStat.raw = this.base.calculated + this.deltaStat.calculated;
        this.calculatedValue = this.totalStat.calculated;
    }

    public get raw() { return this.base.calculated; }
    public set raw(num: number) {
        this.base.raw = num;
        this.recalculate();
    }

    public get delta() { return this.deltaStat.calculated; }
    public set delta(num: number) {
        this.deltaStat.raw = num;
        this.recalculate();
    }

    public get total() { return this.totalStat.calculated; }
    public set total(num: number) {
        this.totalStat.raw = num;
        this.recalculate();
    }

    public get value() { return this.calculatedValue; }
    public set value(num: number) {
        this.deltaStat.raw = num - this.base.raw;
        this.recalculate();
    }

    public addEffect(values: DeltaStatEffect) {
        this.base.effects.add(values.base);
        this.deltaStat.effects.add(values.delta);
        this.totalStat.effects.add(values.total);
        this.recalculate();
    }

    public removeEffect(values: DeltaStatEffect) {
        this.base.effects.removeEntry(values.base);
        this.deltaStat.effects.removeEntry(values.delta);
        this.totalStat.effects.removeEntry(values.total);
        this.recalculate();
    }

    public toString() {
        return 'Base[' + this.base.toString() + '] ' +
            'Delta[' + this.deltaStat.toString() + '] ' +
            'Total[' + this.totalStat.toString() + '] ' +
            'Value: ' + this.value.toString();
    }

    public serialize(): IDeltaStat {
        return {
            base: this.base.serialize(),
            delta: this.deltaStat.serialize(),
            total: this.totalStat.serialize(),
        };
    }

    public deserialize(saveObject: IDeltaStat) {
        this.base.deserialize(saveObject.base);
        this.deltaStat.deserialize(saveObject.delta);
        this.totalStat.deserialize(saveObject.total);
    }
}
