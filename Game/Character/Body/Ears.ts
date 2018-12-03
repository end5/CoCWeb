import { ISerializable } from 'Engine/Utilities/ISerializable';

export enum EarType {
    HUMAN, HORSE, DOG, COW, ELFIN, CAT, LIZARD, BUNNY, KANGAROO, FOX, DRAGON, RACCOON, MOUSE, FERRET
}

export interface IEars {
    type: EarType;
    value: number;
}

export class Ears implements IEars, ISerializable<IEars> {
    public type: EarType = EarType.HUMAN;
    public value: number = 0;

    public serialize(): IEars {
        return {
            type: this.type,
            value: this.value
        };
    }

    public deserialize(saveObject: IEars) {
        this.type = saveObject.type;
        this.value = saveObject.value;
    }
}
