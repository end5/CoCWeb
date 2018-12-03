import { ISerializable } from 'Engine/Utilities/ISerializable';

export enum ButtWetness {
    DRY, NORMAL, MOIST, SLIMY, DROOLING, SLIME_DROOLING
}

export enum ButtLooseness {
    VIRGIN, TIGHT, NORMAL, LOOSE, STRETCHED, GAPING
}

export enum ButtRating {
    BUTTLESS = 0,
    TIGHT = 2,
    AVERAGE = 4,
    NOTICEABLE = 6,
    LARGE = 8,
    JIGGLY = 10,
    EXPANSIVE = 13,
    HUGE = 16,
    INCONCEIVABLY_BIG = 20
}

export interface IButt {
    rating: ButtRating;
    wetness: ButtWetness;
    looseness: ButtLooseness;
}

export class Butt implements IButt, ISerializable<IButt> {
    public rating: ButtRating = ButtRating.BUTTLESS;
    public wetness: ButtWetness = ButtWetness.DRY;
    public looseness: ButtLooseness = ButtLooseness.VIRGIN;

    public serialize(): IButt {
        return {
            rating: this.rating,
            wetness: this.wetness,
            looseness: this.looseness,
        };
    }

    public deserialize(saveObject: IButt) {
        this.rating = saveObject.rating;
        this.wetness = saveObject.wetness;
        this.looseness = saveObject.looseness;
    }
}
