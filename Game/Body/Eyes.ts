import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum EyeType {
    HUMAN, FOUR_SPIDER_EYES, BLACK_EYES_SAND_TRAP
}

export interface IEyes {
    type: EyeType;
}

export class Eyes implements IEyes, ISerializable<IEyes> {
    public type: EyeType = EyeType.HUMAN;

    public serialize(): IEyes {
        return {
            type: this.type
        };
    }

    public deserialize(saveObject: IEyes) {
        this.type = saveObject.type;
    }
}
