import { ISerializable } from 'Engine/Utilities/ISerializable';
import {
    FilterOption,
    FindOption,
    ReduceOption,
    SortOption
} from 'Engine/Utilities/List';

export enum CockType {
    HUMAN, HORSE, DOG, DEMON, TENTACLE, CAT, LIZARD, ANEMONE, KANGAROO, DRAGON, DISPLACER, FOX, BEE, UNDEFINED
}

export interface ICock {
    length: number;
    thickness: number;
    type: CockType;
    knotMultiplier: number;
}

export class Cock implements ICock, ISerializable<ICock> {
    public static readonly Smallest: SortOption<Cock> = (a: Cock, b: Cock) => {
        return a.area - b.area;
    }

    public static readonly Largest: SortOption<Cock> = (a: Cock, b: Cock) => {
        return b.area - a.area;
    }

    public static readonly Shortest: SortOption<Cock> = (a: Cock, b: Cock) => {
        return a.length - b.length;
    }

    public static readonly Longest: SortOption<Cock> = (a: Cock, b: Cock) => {
        return b.length - a.length;
    }

    public static readonly Thinnest: SortOption<Cock> = (a: Cock, b: Cock) => {
        return a.thickness - b.thickness;
    }

    public static readonly Thickest: SortOption<Cock> = (a: Cock, b: Cock) => {
        return b.thickness - a.thickness;
    }

    public static readonly KnotLargest: SortOption<Cock> = (a: Cock, b: Cock) => {
        return a.knotMultiplier - b.knotMultiplier;
    }

    public static readonly KnotSmallest: SortOption<Cock> = (a: Cock, b: Cock) => {
        return b.knotMultiplier - a.knotMultiplier;
    }

    public static readonly HasSheath: FilterOption<Cock> = (a: Cock) => {
        return a.hasSheath();
    }

    public static readonly HasKnot: FilterOption<Cock> = (a: Cock) => {
        return a.hasKnot();
    }

    public static readonly CanAutoFellate: FilterOption<Cock> = (a: Cock) => {
        return a.canAutoFellate();
    }

    public static readonly TotalThickness: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock) => {
        return previousValue + currentValue.thickness;
    }

    public static readonly TotalLength: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock) => {
        return previousValue + currentValue.thickness;
    }

    public static readonly AverageThickness: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock, index: number, array: Cock[]) => {
        if (index >= array.length - 1)
            return previousValue / index;
        return previousValue + currentValue.thickness;
    }

    public static readonly AverageLength: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock, index: number, array: Cock[]) => {
        if (index >= array.length - 1)
            return previousValue / index;
        return previousValue + currentValue.length;
    }

    public static readonly AverageArea: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock, index: number, array: Cock[]) => {
        if (index >= array.length - 1)
            return previousValue / index;
        return previousValue + currentValue.area;
    }

    public static readonly MajorityType: ReduceOption<Cock, CockType> = (previousValue: CockType, currentValue: Cock, _index: number, array: Cock[]) => {
        return array.filter((cock) => cock.type === previousValue).length >= array.filter((cock) => cock.type === currentValue.type).length ? previousValue : currentValue.type;
    }

    /**
     * Returns a list of cocks that fit with a least a min. If the min cannot be met, then return a sorted array instead.
     * @param area Area to match
     * @param min The minimum amount of cocks required
     * @param sortOption An optional sort option. If one is not provided, then the array is returned.
     */
    public static CocksThatFitOrSort(area: number, min: number, sortOption?: SortOption<Cock>): ReduceOption<Cock, Cock[]> {
        return (previousValue: Cock[], currentValue: Cock, index: number, array: Cock[]) => {
            if (Cock.CockThatFits(area)(currentValue, index, array))
                previousValue.push(currentValue);

            if (index < array.length - 1 || previousValue.length >= min)
                return previousValue;
            else if (sortOption)
                return array.slice().sort(sortOption);
            else return array.slice();
        };
    }

    // Note: DogCocks/FoxCocks are functionally identical. They actually change back and forth depending on some
    // of the PC's attributes, and this is recaluculated every hour spent at camp.
    // As such, delineating between the two is kind of silly.
    public static FilterType(type: CockType): FilterOption<Cock> {
        return (a: Cock) => {
            return a.type === type && (a.type === CockType.DOG || a.type === CockType.FOX);
        };
    }

    public static CocksThatFit(area: number): FilterOption<Cock> {
        return (a: Cock) => {
            return a.area <= area;
        };
    }

    public static CockThatFits(area: number): FindOption<Cock> {
        return (a: Cock) => {
            return a.area <= area;
        };
    }

    /**
     * Filter selected cock.area >= supplied area.
     * @param area Area
     */
    public static LargerThan(area: number): FilterOption<Cock> {
        return (a: Cock) => {
            return a.area >= area;
        };
    }

    /**
     * Filter selected cock.length >= supplied length.
     * @param length Length
     */
    public static LongerThan(length: number): FilterOption<Cock> {
        return (a: Cock) => {
            return a.length >= length;
        };
    }

    /**
     * Filter selected cock.thickness >= supplied thickness.
     * @param length Length
     */
    public static ThickerThan(length: number): FilterOption<Cock> {
        return (a: Cock) => {
            return a.length >= length;
        };
    }

    public length: number;
    public thickness: number;
    public type: CockType;
    public knotMultiplier: number;

    public constructor(length: number = 5.5, thickness: number = 1, type: CockType = CockType.HUMAN, knotMultiplier: number = 1) {
        this.type = type;
        this.length = length;
        this.thickness = thickness;
        this.knotMultiplier = knotMultiplier;
    }

    public get area(): number {
        return this.thickness * this.length;
    }

    public hasSheath(): boolean {
        switch (this.type) {
            case CockType.CAT:
            case CockType.DISPLACER:
            case CockType.DOG:
            case CockType.FOX:
            case CockType.HORSE:
            case CockType.KANGAROO:
                return true;
            default:
                return false;
        }
    }

    public hasKnot(): boolean {
        switch (this.type) {
            case CockType.DISPLACER:
            case CockType.DOG:
            case CockType.FOX:
                return true;
            default:
                return false;
        }
    }

    public canAutoFellate(): boolean {
        return this.length >= 20;
    }

    public serialize(): ICock {
        return {
            length: this.length,
            thickness: this.thickness,
            type: this.type,
            knotMultiplier: this.knotMultiplier
        };
    }

    public deserialize(saveObject: ICock) {
        this.length = saveObject.length;
        this.thickness = saveObject.thickness;
        this.type = saveObject.type;
        this.knotMultiplier = saveObject.knotMultiplier;
    }
}
