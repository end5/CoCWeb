import { ISerializable } from 'Engine/Utilities/ISerializable';
import { FilterOption, ReduceOption, SortOption } from 'Engine/Utilities/List';

export enum TailType {
    HORSE, DOG, DEMONIC, COW, SPIDER_ABDOMEN, BEE_ABDOMEN, SHARK, CAT, LIZARD, BUNNY, HARPY, KANGAROO, FOX, DRACONIC, RACCOON, MOUSE, FERRET
}

export interface ITail {
    type: TailType;
    venom: number;
    recharge: number;
}

export class Tail implements ITail, ISerializable<ITail> {
    public static VenomMost: SortOption<Tail> = (a: Tail, b: Tail) => {
        return a.venom - b.venom;
    }

    public static VenomLeast: SortOption<Tail> = (a: Tail, b: Tail) => {
        return b.venom - a.venom;
    }

    public static RechargeMost: SortOption<Tail> = (a: Tail, b: Tail) => {
        return a.recharge - b.recharge;
    }

    public static RechargeLeast: SortOption<Tail> = (a: Tail, b: Tail) => {
        return b.recharge - a.recharge;
    }

    public static FilterType(type: TailType): FilterOption<Tail> {
        return (tail: Tail) => {
            return tail.type === type;
        };
    }

    public static HasType(type: TailType): ReduceOption<Tail, boolean> {
        return (previousValue: boolean, currentValue: Tail) => {
            return previousValue || currentValue.type === type;
        };
    }

    public type: TailType;
    /** Tail venom is a 0-100 slider used for tail attacks. Recharges per hour. */
    public venom: number;
    /** Tail recharge determines how fast venom/webs comes back per hour. */
    public recharge: number;

    public constructor(type: TailType = TailType.HORSE, vemon: number = 0, recharge: number = 0) {
        this.type = type;
        this.venom = vemon;
        this.recharge = recharge;
    }

    public static readonly HasOvipositor: FilterOption<Tail> = (a: Tail) => {
        return a.type === TailType.BEE_ABDOMEN || a.type === TailType.SPIDER_ABDOMEN;
    }

    public serialize(): ITail {
        return {
            type: this.type,
            venom: this.venom,
            recharge: this.recharge
        };
    }

    public deserialize(saveObject: ITail) {
        this.type = saveObject.type;
        this.venom = saveObject.venom;
        this.recharge = saveObject.recharge;
    }
}
