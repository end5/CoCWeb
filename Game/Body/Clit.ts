import { ISerializable } from '../../Engine/Utilities/ISerializable';

export interface IClit {
    length: number;
}

export class Clit implements IClit, ISerializable<IClit> {
    public length: number = 0.25;

    public serialize(): IClit {
        return {
            length: this.length
        };
    }

    public deserialize(saveObject: IClit) {
        this.length = saveObject.length;
    }
}
