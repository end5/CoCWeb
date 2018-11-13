import { ISerializable } from '../../Engine/Utilities/ISerializable';

export interface IBalls {
    count: number;
    size: number;
}

export class Balls implements IBalls, ISerializable<IBalls> {
    public count: number = 0;
    public size: number = 0;

    public serialize(): IBalls {
        return {
            count: this.count,
            size: this.size
        };
    }

    public deserialize(saveObject: IBalls) {
        this.count = saveObject.count;
        this.size = saveObject.size;
    }
}
