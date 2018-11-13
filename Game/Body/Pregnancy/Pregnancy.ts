import { ISerializable } from '../../../Engine/Utilities/ISerializable';
import { SortOption } from '../../../Engine/Utilities/List';

export enum PregnancyType {
    IMP = "Imp",
    MINOTAUR = "Minotaur",
    MOUSE = "Mouse",
    OVIELIXIR_EGGS = "Ovielixir Eggs", // Also caused by Phoenixes apparently
    HELL_HOUND = "Hell Hound",
    CENTAUR = "Centaur",
    MARBLE = "Marble",
    BUNNY = "Bunny",
    ANEMONE = "Anemone",
    AMILY = "Amily",
    IZMA = "Izma",
    SPIDER = "Spider",
    BASILISK = "Basilisk",
    DRIDER_EGGS = "Drider Eggs",
    GOO_GIRL = "Goo Girl",
    EMBER = "Ember",
    BENOIT = "Benoit",
    SATYR = "Satyr",
    COTTON = "Cotton",
    URTA = "Urta",
    SAND_WITCH = "Sand Witch",
    FROG_GIRL = "Frog Girl",
    FAERIE = "Faerie", // Indicates you are carrying either a phouka or faerie baby. Which one is determined by the PREGNANCY_CORRUPTION flag
    PLAYER = "Player", // The player is the father. Will be used when an NPC is able to have children from multiple different fathers.
    BEE_EGGS = "Bee Eggs",
    SANDTRAP_FERTILE = "Sandtrap Fertile",
    SANDTRAP = "Sandtrap",
    JOJO = "Jojo", // So we can track them separately from other mouse pregnancies
    KELT = "Kelt", // So we can track them separately from other centaur pregnancies
    TAOTH = "Taoth",
    GOO_STUFFED = "Goo Stuffed", // Used to fill the player's ass and/or vagina when Valeria has a goo girl take up residence. This prevents any other
    // form of pregnancy from taking hold. Does not respond to ovielixirs.
    WORM_STUFFED = "Worm Stuffed", // Used to fill the player's vagina when the worms take up residence. This prevents any other form of
    // pregnancy from taking hold. Does not respond to ovielixirs.
}

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

export enum IncubationTime {
    IMP = 432, // Time for standard imps. Imp lords, Ceraph, Lilium and the imp horde cause slightly faster pregnancies
    MINOTAUR = 432,
    MOUSE = 350,
    OVIELIXIR_EGGS = 50,
    HELL_HOUND = 352,
    CENTAUR = 420,
    MARBLE = 368,
    BUNNY_BABY = 200,
    BUNNY_EGGS = 808, // High time indicates neon egg pregnancy
    ANEMONE = 256,
    IZMA = 300,
    SPIDER = 400,
    BASILISK = 250,
    DRIDER = 400,
    GOO_GIRL = 85,
    EMBER = 336,
    SATYR = 160,
    COTTON = 350,
    URTA = 515,
    SAND_WITCH = 360,
    FROG_GIRL = 30,
    FAERIE = 200,
    BEE = 48,
    SANDTRAP = 42,
    HARPY = 168,
    SHIELA = 72,
    SALAMANDER = 336,
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

    public constructor(type: PregnancyType = PregnancyType.IMP, incubation: number = IncubationTime.IMP) {
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
