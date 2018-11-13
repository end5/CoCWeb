import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum FaceType {
    HUMAN, HORSE, DOG, COW_MINOTAUR, SHARK_TEETH, SNAKE_FANGS,
    CAT, LIZARD, BUNNY, KANGAROO, SPIDER_FANGS, FOX, DRAGON, RACCOON_MASK,
    RACCOON, BUCKTEETH, MOUSE, FERRET_MASK, FERRET
}

export interface IFace {
    type: FaceType;
}

export class Face implements IFace, ISerializable<IFace>  {
    public type: FaceType = FaceType.HUMAN;

    public hasMuzzle(): boolean {
        switch (this.type) {
            case FaceType.HORSE:
            case FaceType.DOG:
            case FaceType.CAT:
            case FaceType.LIZARD:
            case FaceType.KANGAROO:
            case FaceType.FOX:
            case FaceType.DRAGON:
                return true;
            default:
                return false;
        }
    }

    public serialize(): IFace {
        return {
            type: this.type,
        };
    }

    public deserialize(saveObject: IFace) {
        this.type = saveObject.type;
    }
}
