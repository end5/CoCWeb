import { ISerializable } from 'Engine/Utilities/ISerializable';
import { SortOption } from 'Engine/Utilities/List';

export enum PregnancyType {
    NONE = "NONE",
}

export enum IncubationTime {
    NONE = 0,
}

export interface IPregnancy {
    type: PregnancyType;
    incubation: IncubationTime;
}

export class Pregnancy implements ISerializable<IPregnancy> {
    public static LargestIncubationTime: SortOption<Pregnancy> = (first: Pregnancy, second: Pregnancy) => {
        return second.incubation - first.incubation;
    }

    public static SmallestIncubationTime: SortOption<Pregnancy> = (first: Pregnancy, second: Pregnancy) => {
        return first.incubation - second.incubation;
    }

    public type: PregnancyType;
    public incubation: IncubationTime;

    public constructor(type: PregnancyType = PregnancyType.NONE, incubation: number = IncubationTime.NONE) {
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
