import { ISerializable } from '../../Engine/Utilities/ISerializable';

export interface INipples {
    count: number;
    length: number;
    fuckable: boolean;
}

export class Nipples implements INipples, ISerializable<INipples> {
    public count: number = 1;
    public length: number = 0.25;
    public fuckable: boolean = false;

    public serialize(): INipples {
        return {
            count: this.count,
            fuckable: this.fuckable,
            length: this.length,
        };
    }

    public deserialize(saveObject: INipples) {
        this.count = saveObject.count;
        this.length = saveObject.length;
        this.fuckable = saveObject.fuckable;
    }
}
