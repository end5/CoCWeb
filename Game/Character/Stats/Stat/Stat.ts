import { ISerializable } from 'Engine/Utilities/ISerializable';

export interface IStat {
    value: number;
}

export class Stat implements IStat, ISerializable<IStat> {
    protected curValue = 0;

    public get value() { return this.curValue; }
    public set value(num: number) {
        this.curValue = num;
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
