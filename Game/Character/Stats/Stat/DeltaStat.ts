import { ISerializable } from 'Engine/Utilities/ISerializable';
import { Stat, IStat } from 'Game/Character/Stats/Stat/Stat';
import { IDeltaStatEffect } from 'Game/Character/Stats/Stat/DeltaStatEffect';

export interface IDeltaStat {
    base: IStat;
    delta: IStat;
    total: IStat;
}

export class DeltaStat implements ISerializable<IDeltaStat> {
    public readonly base: Stat;
    public readonly delta: Stat;
    public readonly total: Stat;

    public constructor(base: number, delta: number) {
        this.base = new Stat(base);
        this.delta = new Stat(delta);
        this.total = new Stat(this.base.raw + this.delta.raw);
    }

    public get value() {
        this.total.raw = this.base.calculated + this.delta.calculated;
        return this.total.calculated;
    }
    public set value(num: number) {
        this.delta.raw = num - this.base.raw;
    }

    public addEffect(values: IDeltaStatEffect) {
        if (values) {
            if (values.base)
                this.base.effects.add(values.base);
            if (values.delta)
                this.delta.effects.add(values.delta);
            if (values.total)
                this.total.effects.add(values.total);
        }
    }

    public removeEffect(values: IDeltaStatEffect) {
        if (values) {
            if (values.base)
                this.base.effects.removeEntry(values.base);
            if (values.delta)
                this.delta.effects.removeEntry(values.delta);
            if (values.total)
                this.total.effects.removeEntry(values.total);
        }
    }

    public toString() {
        return 'Base[' + this.base.toString() + '] ' +
            'Delta[' + this.delta.toString() + '] ' +
            'Total[' + this.total.toString() + '] ' +
            'Value: ' + this.value.toString();
    }

    public serialize(): IDeltaStat {
        return {
            base: this.base.serialize(),
            delta: this.delta.serialize(),
            total: this.total.serialize(),
        };
    }

    public deserialize(saveObject: IDeltaStat) {
        this.base.deserialize(saveObject.base);
        this.delta.deserialize(saveObject.delta);
        this.total.deserialize(saveObject.total);
    }
}
