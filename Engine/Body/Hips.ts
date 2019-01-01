import { ISerializable } from 'Engine/Utilities/ISerializable';

export enum HipRating {
    BOYISH, SLENDER, AVERAGE, AMPLE, CURVY, FERTILE, INHUMANLY_WIDE
}

export interface IHips {
    rating: HipRating;
}

export class Hips implements IHips, ISerializable<IHips> {
    public rating: HipRating = HipRating.BOYISH;

    public serialize(): IHips {
        return {
            rating: this.rating,
        };
    }

    public deserialize(saveObject: IHips) {
        this.rating = saveObject.rating;
    }
}
