import { ISerializable } from 'Engine/Utilities/ISerializable';

export enum AntennaeType {
    NONE, BEE
}

export interface IAntennae {
    type: AntennaeType;
}

export class Antennae implements IAntennae, ISerializable<IAntennae> {
    public type: AntennaeType = AntennaeType.NONE;

    public serialize(): IAntennae {
        return {
            type: this.type,
        };
    }

    public deserialize(saveObject: IAntennae) {
        this.type = saveObject.type;
    }
}
