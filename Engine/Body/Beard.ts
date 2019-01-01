import { ISerializable } from 'Engine/Utilities/ISerializable';

export interface IBeard {
    style: string;
    length: number;
}

export class Beard implements IBeard, ISerializable<IBeard> {
    public style: string = "";
    public length: number = 0;

    public hasBeard(): boolean {
        return this.length > 0;
    }

    public serialize(): IBeard {
        return {
            style: this.style,
            length: this.length
        };
    }

    public deserialize(saveObject: IBeard) {
        this.style = saveObject.style;
        this.length = saveObject.length;
    }
}
