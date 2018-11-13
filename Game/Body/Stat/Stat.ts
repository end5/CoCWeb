import { ISerializable } from "../../../Engine/Utilities/ISerializable";
import { Dictionary } from "../../../Engine/Utilities/Dictionary";

export interface IStatObserver {
    onValue(value: number): void;
}

export interface IStat {
    value: number;
}

export class Stat implements IStat, ISerializable<IStat> {
    public observers = new Dictionary<string, IStatObserver>();
    protected curValue = 0;

    public get value() { return this.curValue; }
    public set value(num: number) {
        this.curValue = num;
        for (const observers of this.observers)
            observers.onValue(this.curValue);
    }

    public serialize(): IStat {
        return {
            value: this.value
        };
    }

    public deserialize(saveObject: IStat) {
        this.curValue = saveObject.value;
    }
}
