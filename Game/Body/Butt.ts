import { ISerializable } from '../../Engine/Utilities/ISerializable';

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
    fullness: number;
}

export class Butt implements IButt, ISerializable<IButt> {
    public rating: ButtRating = ButtRating.BUTTLESS;
    public wetness: ButtWetness = ButtWetness.DRY;
    public looseness: ButtLooseness = ButtLooseness.VIRGIN;
    // Used to determine thickness of knot relative to normal thickness
    // Used during sex to determine how full it currently is.  For multi-dick sex.
    public fullness: number = 0;

    public serialize(): IButt {
        return {
            rating: this.rating,
            wetness: this.wetness,
            looseness: this.looseness,
            fullness: this.fullness
        };
    }

    public deserialize(saveObject: IButt) {
        this.rating = saveObject.rating;
        this.wetness = saveObject.wetness;
        this.looseness = saveObject.looseness;
        this.fullness = saveObject.fullness;
    }
}
