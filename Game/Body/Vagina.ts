import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { FilterOption, ReduceOption, SortOption } from '../../Engine/Utilities/List';

export enum VaginaType {
    HUMAN, BLACK_SAND_TRAP
}

export enum VaginaWetness {
    DRY, NORMAL, WET, SLICK, DROOLING, SLAVERING
}

export enum VaginaLooseness {
    TIGHT, NORMAL, LOOSE, GAPING, GAPING_WIDE, LEVEL_CLOWN_CAR
}

export interface IVagina {
    type: VaginaType;
    virgin: boolean;
    wetness: VaginaWetness;
    looseness: VaginaLooseness;
    fullness: number;
}

export class Vagina implements IVagina, ISerializable<IVagina> {
    public static readonly LoosenessMost: SortOption<Vagina> = (a: Vagina, b: Vagina) => {
        return a.looseness - b.looseness;
    }

    public static readonly LoosenessLeast: SortOption<Vagina> = (a: Vagina, b: Vagina) => {
        return b.looseness - a.looseness;
    }

    public static readonly WetnessMost: SortOption<Vagina> = (a: Vagina, b: Vagina) => {
        return a.wetness - b.wetness;
    }

    public static readonly WetnessLeast: SortOption<Vagina> = (a: Vagina, b: Vagina) => {
        return b.wetness - a.wetness;
    }

    public static readonly Virgin: FilterOption<Vagina> = (a: Vagina) => {
        return a.virgin;
    }

    public static readonly NotVirgin: FilterOption<Vagina> = (a: Vagina) => {
        return !a.virgin;
    }

    public static readonly AverageLooseness: ReduceOption<Vagina, number> = (previousValue: number, currentValue: Vagina, index: number, array: Vagina[]) => {
        if (index >= array.length - 1)
            return (previousValue + currentValue.looseness) / index;
        return previousValue + currentValue.looseness;
    }

    public static readonly AverageWetness: ReduceOption<Vagina, number> = (previousValue: number, currentValue: Vagina, index: number, array: Vagina[]) => {
        if (index >= array.length - 1)
            return (previousValue + currentValue.wetness) / index;
        return previousValue + currentValue.wetness;
    }

    public type: VaginaType;
    public virgin: boolean;

    public wetness: VaginaWetness;
    public looseness: VaginaLooseness;

    // Used during sex to determine how full it currently is.  For multi-dick sex.
    public fullness: number = 0;

    public constructor(
        wetness: VaginaWetness = VaginaWetness.NORMAL,
        looseness: VaginaLooseness = VaginaLooseness.TIGHT,
        virgin: boolean = true,
        type: VaginaType = VaginaType.HUMAN
    ) {
        this.type = type;
        this.wetness = wetness;
        this.looseness = looseness;
        this.virgin = virgin;
    }

    public wetnessFactor(): number {
        if (this.wetness === VaginaWetness.DRY) return 1.25;
        if (this.wetness === VaginaWetness.NORMAL) return 1;
        if (this.wetness === VaginaWetness.WET) return 0.8;
        if (this.wetness === VaginaWetness.SLICK) return 0.7;
        if (this.wetness === VaginaWetness.DROOLING) return 0.6;
        if (this.wetness === VaginaWetness.SLAVERING) return 0.5;
        return .5;
    }

    public capacity(): number {
        if (this.looseness === VaginaLooseness.TIGHT) return 8;
        if (this.looseness === VaginaLooseness.NORMAL) return 16;
        if (this.looseness === VaginaLooseness.LOOSE) return 24;
        if (this.looseness === VaginaLooseness.GAPING) return 36;
        if (this.looseness === VaginaLooseness.GAPING_WIDE) return 56;
        if (this.looseness === VaginaLooseness.LEVEL_CLOWN_CAR) return 100;
        return 10000;
    }

    public serialize(): IVagina {
        return {
            type: this.type,
            virgin: this.virgin,
            wetness: this.wetness,
            looseness: this.looseness,
            fullness: this.fullness
        };
    }

    public deserialize(saveObject: IVagina) {
        this.type = saveObject.type;
        this.virgin = saveObject.virgin;
        this.wetness = saveObject.wetness;
        this.looseness = saveObject.looseness;
        this.fullness = saveObject.fullness;
    }
}
