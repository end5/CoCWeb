import { ISerializable } from 'Engine/Utilities/ISerializable';

export interface IRangedStat {
    value: number;
    min: number;
    max: number;
}

export class RangedStat implements IRangedStat, ISerializable<IRangedStat> {
    protected curValue = 50;
    protected minValue = 0;
    protected maxValue = 100;

    public get value() { return this.curValue; }
    public set value(num: number) {
        this.curValue = num;
        if (this.curValue < this.minValue)
            this.curValue = this.minValue;
        if (this.curValue > this.maxValue)
            this.curValue = this.maxValue;
    }

    public get min() { return this.minValue; }
    public set min(num: number) {
        this.minValue += num;
    }

    public get max() { return this.maxValue; }
    public set max(num: number) {
        this.maxValue += num;
    }

    public serialize(): IRangedStat {
        return {
            value: this.curValue,
            min: this.min,
            max: this.max,
        };
    }

    public deserialize(saveObject: IRangedStat) {
        this.curValue = saveObject.value;
        this.min = saveObject.min;
        this.max = saveObject.max;
    }
}
