import { ISerializable } from 'Engine/Utilities/ISerializable';

export enum TongueType {
    HUMAN, SNAKE, DEMONIC, DRACONIC
}

export interface ITongue {
    type: TongueType;
}

export class Tongue implements ITongue, ISerializable<ITongue> {
    public type: TongueType = TongueType.HUMAN;

    public serialize(): ITongue {
        return {
            type: this.type
        };
    }

    public deserialize(saveObject: ITongue) {
        this.type = saveObject.type;
    }
}
