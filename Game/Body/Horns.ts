import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum HornType {
    NONE, DEMON, COW_MINOTAUR, DRACONIC_X2, DRACONIC_X4_12_INCH_LONG, ANTLERS
}

export interface IHorns {
    type: HornType;
    count: number;
}

export class Horns implements IHorns, ISerializable<IHorns> {
    public type: HornType = HornType.NONE;
    public count: number = 0;

    public serialize(): IHorns {
        return {
            type: this.type,
            count: this.count
        };
    }

    public deserialize(saveObject: IHorns) {
        this.type = saveObject.type;
        this.count = saveObject.count;
    }
}
