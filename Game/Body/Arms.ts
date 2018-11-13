import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum ArmType {
    HUMAN, HARPY, SPIDER
}

export interface IArms {
    type: ArmType;
}

export class Arms implements IArms, ISerializable<IArms> {
    public type: ArmType = ArmType.HUMAN;

    public serialize(): IArms {
        return {
            type: this.type
        };
    }

    public deserialize(saveObject: IArms) {
        this.type = saveObject.type;
    }
}
