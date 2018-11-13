import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum HairType {
    NORMAL, FEATHER, GHOST, GOO, ANEMONE
}

export interface IHair {
    type: HairType;
    color: string;
    length: number;
}

export class Hair implements IHair, ISerializable<IHair> {
    public type: HairType = HairType.NORMAL;
    public color: string = "black";
    public length: number = 0;

    public serialize(): IHair {
        return {
            type: this.type,
            color: this.color,
            length: this.length
        };
    }

    public deserialize(saveObject: IHair) {
        this.type = saveObject.type;
        this.color = saveObject.color;
        this.length = saveObject.length;
    }
}
