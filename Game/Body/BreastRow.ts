import { Nipples, INipples } from './Nipples';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { FilterOption, ReduceOption, SortOption } from '../../Engine/Utilities/List';

export enum BreastCup {
    FLAT, A, B, C, D, DD, DD_BIG, E, E_BIG, EE, EE_BIG, F, F_BIG, FF, FF_BIG,
    G, G_BIG, GG, GG_BIG, H, H_BIG, HH, HH_BIG, HHH, I, I_BIG, II, II_BIG,
    J, J_BIG, JJ, JJ_BIG, K, K_BIG, KK, KK_BIG, L, L_BIG, LL, LL_BIG,
    M, M_BIG, MM, MM_BIG, MMM, MMM_LARGE, N, N_LARGE, NN, NN_LARGE,
    O, O_LARGE, OO, OO_LARGE, P, P_LARGE, PP, PP_LARGE, Q, Q_LARGE, QQ, QQ_LARGE,
    R, R_LARGE, RR, RR_LARGE, S, S_LARGE, SS, SS_LARGE, T, T_LARGE, TT, TT_LARGE,
    U, U_LARGE, UU, UU_LARGE, V, V_LARGE, VV, VV_LARGE, W, W_LARGE, WW, WW_LARGE,
    X, X_LARGE, XX, XX_LARGE, Y, Y_LARGE, YY, YY_LARGE, Z, Z_LARGE, ZZ, ZZ_LARGE, ZZZ, ZZZ_LARGE
}

export interface IBreastRow {
    rating: BreastCup;
    lactationMultiplier: number;
    milkFullness: number;
    fullness: number;
    nipples: INipples;
    count: number;
}

export class BreastRow implements IBreastRow, ISerializable<IBreastRow> {
    public static readonly Largest: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return a.rating - b.rating;
    }

    public static readonly Smallest: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return b.rating - a.rating;
    }

    public static readonly LactationMost: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return a.lactationMultiplier - b.lactationMultiplier;
    }

    public static readonly LactationLeast: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return b.lactationMultiplier - a.lactationMultiplier;
    }

    public static readonly MilkFullnessMost: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return a.milkFullness - b.milkFullness;
    }

    public static readonly MilkFullnessLeast: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return b.milkFullness - a.milkFullness;
    }

    public static readonly FullnessMost: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return a.fullness - b.fullness;
    }

    public static readonly FullnessLeast: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return b.fullness - a.fullness;
    }

    public static readonly NipplesPerBreastMost: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return a.nipples.count - b.nipples.count;
    }

    public static readonly NipplesPerBreastLeast: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return b.nipples.count - a.nipples.count;
    }

    public static readonly BreastsPerRowMost: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return a.count - b.count;
    }

    public static readonly BreastsPerRowLeast: SortOption<BreastRow> = (a: BreastRow, b: BreastRow) => {
        return b.count - a.count;
    }

    public static readonly HasNipples: FilterOption<BreastRow> = (a: BreastRow) => {
        return a.nipples.count > 0;
    }

    public static readonly FemaleBreasts: FilterOption<BreastRow> = (a: BreastRow) => {
        return a.rating >= 1;
    }

    public static readonly CanTitFuck: FilterOption<BreastRow> = (a: BreastRow) => {
        return a.rating > 3;
    }

    public static readonly FuckableNipples: FilterOption<BreastRow> = (a: BreastRow) => {
        return a.nipples.fuckable;
    }

    public static readonly NonFuckableNipples: FilterOption<BreastRow> = (a: BreastRow) => {
        return !a.nipples.fuckable;
    }

    public static readonly AverageSize: ReduceOption<BreastRow, number> = (previousValue: number, currentValue: BreastRow, _index: number, array: BreastRow[]) => {
            return previousValue + currentValue.rating / array.length;
    }

    public static readonly AverageLactation: ReduceOption<BreastRow, number> = (previousValue: number, currentValue: BreastRow, _index: number, array: BreastRow[]) => {
        return previousValue + currentValue.lactationMultiplier / array.length;
    }

    public static readonly AverageNipplesPerBreast: ReduceOption<BreastRow, number> = (previousValue: number, currentValue: BreastRow, _index: number, array: BreastRow[]) => {
        return previousValue + currentValue.nipples.count / array.length;
    }

    public static readonly AverageNippleLength: ReduceOption<BreastRow, number> = (previousValue: number, currentValue: BreastRow, _index: number, array: BreastRow[]) => {
        return previousValue + currentValue.nipples.length / array.length;
    }

    public static readonly TotalNipples: ReduceOption<BreastRow, number> = (previousValue: number, currentValue: BreastRow) => {
        return previousValue + currentValue.nipples.count;
    }

    public static readonly TotalBreasts: ReduceOption<BreastRow, number> = (previousValue: number, currentValue: BreastRow) => {
        return previousValue + currentValue.count;
    }

    public rating: BreastCup;
    public lactationMultiplier: number;
    // Fullness used for lactation....if 75 or greater warning bells start going off!
    // If it reaches 100 it reduces lactation multiplier.
    public milkFullness: number = 0;
    public fullness: number = 0;
    public nipples: Nipples = new Nipples();
    public count: number = 2;

    public constructor(rating: BreastCup = BreastCup.C, lactationMultiplier: number = 0) {
        this.rating = rating;
        this.lactationMultiplier = lactationMultiplier;
    }

    public serialize(): IBreastRow {
        return {
            rating: this.rating,
            lactationMultiplier: this.lactationMultiplier,
            milkFullness: this.milkFullness,
            fullness: this.fullness,
            nipples: this.nipples.serialize(),
            count: this.count
        };
    }

    public deserialize(saveObject: IBreastRow) {
        this.rating = saveObject.rating;
        this.lactationMultiplier = saveObject.lactationMultiplier;
        this.milkFullness = saveObject.milkFullness;
        this.fullness = saveObject.fullness;
        this.nipples.deserialize(saveObject.nipples);
        this.count = saveObject.count;
    }
}
