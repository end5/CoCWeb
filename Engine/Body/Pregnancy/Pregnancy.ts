import { ISerializable } from 'Engine/Utilities/ISerializable';
import { SortOption } from 'Engine/Utilities/List';

export enum PregnancySize {
    NOT_PREGANT,        // The PREG_* consts are returned by the size function
    NO_SIGNS_UNKNOWN,   // NPC has conceived but doesn’t know she’s pregnant, no visible signs
    NO_SIGNS_KNOWN,     // NPC is in the first trimester, knows she’s pregnant
    START_BULGE,        // NPC is in the first trimester, belly is just starting to bulge
    SWOLLEN,            // NPC is in the second trimester, belly is small but definitely swollen
    SIZEABLE,           // NPC is in the second trimester, belly is now sizable
    BLATANT,            // NPC is in the third trimester, belly is blatantly bulging
    FULL_TERM,          // NPC is in the third trimester, belly is big as it will get for a normal pregnancy
    OVERDUE,            // NPC is overdue. Usually means a centaur baby, twins or some similar condition. Effectively looks 10 months pregnant
    VERY_OVERDUE,        // NPC is very overdue. Probably triplets or more. Effectively looks 11 months pregnant
}

export interface IPregnancy {
    type: string;
    incubation: number;
}

export class Pregnancy implements ISerializable<IPregnancy> {
    public static LargestIncubationTime: SortOption<Pregnancy> = (first: Pregnancy, second: Pregnancy) => {
        return second.incubation - first.incubation;
    }

    public static SmallestIncubationTime: SortOption<Pregnancy> = (first: Pregnancy, second: Pregnancy) => {
        return first.incubation - second.incubation;
    }

    public type: string;
    public incubation: number;

    public constructor(type: string, incubation: number) {
        this.type = type;
        this.incubation = incubation;
    }

    public serialize(): IPregnancy {
        return {
            type: this.type,
            incubation: this.incubation
        };
    }

    public deserialize(saveObject: IPregnancy) {
        this.type = saveObject.type;
        this.incubation = saveObject.incubation;
    }
}
