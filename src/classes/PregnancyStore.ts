import { trace } from "../console";
import { kGAMECLASS } from "./GlobalFlags/kGAMECLASS";

export class PregnancyStore {
    // Pregancy types. Both butt and normal. Each type represents the father of this baby.
    public static PREGNANCY_IMP = 1;
    public static PREGNANCY_MINOTAUR = 2;
    public static PREGNANCY_MOUSE = 4;
    public static PREGNANCY_OVIELIXIR_EGGS = 5; // Also caused by Phoenixes apparently
    public static PREGNANCY_HELL_HOUND = 6;
    public static PREGNANCY_CENTAUR = 7;
    public static PREGNANCY_MARBLE = 8;
    public static PREGNANCY_BUNNY = 9;
    public static PREGNANCY_ANEMONE = 10;
    public static PREGNANCY_AMILY = 11;
    public static PREGNANCY_IZMA = 12;
    public static PREGNANCY_SPIDER = 13;
    public static PREGNANCY_BASILISK = 14;
    public static PREGNANCY_DRIDER_EGGS = 15;
    public static PREGNANCY_GOO_GIRL = 16;
    public static PREGNANCY_EMBER = 17;
    public static PREGNANCY_BENOIT = 18;
    public static PREGNANCY_SATYR = 19;
    public static PREGNANCY_COTTON = 20;
    public static PREGNANCY_URTA = 21;
    public static PREGNANCY_SAND_WITCH = 22;
    public static PREGNANCY_FROG_GIRL = 23;
    public static PREGNANCY_FAERIE = 24; // Indicates you are carrying either a phouka or faerie baby. Which one is determined by the PREGNANCY_CORRUPTION flag
    public static PREGNANCY_PLAYER = 25; // The player is the father. Will be used when an NPC is able to have children from multiple different fathers.
    public static PREGNANCY_BEE_EGGS = 26;
    public static PREGNANCY_SANDTRAP_FERTILE = 27;
    public static PREGNANCY_SANDTRAP = 28;
    public static PREGNANCY_JOJO = 29; // So we can track them separately from other mouse pregnancies
    public static PREGNANCY_KELT = 30; // So we can track them separately from other centaur pregnancies
    public static PREGNANCY_TAOTH = 31;
    public static PREGNANCY_GOO_STUFFED = 32; // Used to fill the player's ass and/or vagina when Valeria has a goo girl take up residence. This prevents any other
    // form of pregnancy from taking hold. Does not respond to ovielixirs.
    public static PREGNANCY_WORM_STUFFED = 33; // Used to fill the player's vagina when the worms take up residence. This prevents any other form of
    // pregnancy from taking hold. Does not respond to ovielixirs.

    public static PREG_NOT_PREGANT = 0; // The PREG_* consts are returned by the size function
    public static PREG_NO_SIGNS_UNKNOWN = 1; // NPC has conceived but doesn’t know she’s pregnant, no visible signs
    public static PREG_NO_SIGNS_KNOWN = 2; // NPC is in the first trimester, knows she’s pregnant
    public static PREG_START_BULGE = 3; // NPC is in the first trimester, belly is just starting to bulge
    public static PREG_SWOLLEN = 4; // NPC is in the second trimester, belly is small but definitely swollen
    public static PREG_SIZEABLE = 5; // NPC is in the second trimester, belly is now sizable
    public static PREG_BLATANT = 6; // NPC is in the third trimester, belly is blatantly bulging
    public static PREG_FULL_TERM = 7; // NPC is in the third trimester, belly is big as it will get for a normal pregnancy
    public static PREG_OVERDUE = 8; // NPC is overdue. Usually means a centaur baby, twins or some similar condition. Effectively looks 10 months pregnant
    public static PREG_VERY_OVERDUE = 9; // NPC is very overdue. Probably triplets or more. Effectively looks 11 months pregnant
    // Old Value, replaced in Saves.unFuckSave()
    // public static const PREGNANCY_BUTT_BEE: number              =   2;
    // Old Value, replaced in Saves.unFuckSave()
    // public static const PREGNANCY_BUTT_DRIDER: number           =   3;
    // Old Value, replaced in Saves.unFuckSave()
    // public static const PREGNANCY_BUTT_SANDTRAP_FERTILE: number =   4;
    // Old Value, replaced in Saves.unFuckSave()
    // public static const PREGNANCY_BUTT_SANDTRAP: number         =   5; //Sandtrap did not have fertilized eggs

    public static INCUBATION_IMP = 432; // Time for standard imps. Imp lords, Ceraph, Lilium and the imp horde cause slightly faster pregnancies
    public static INCUBATION_MINOTAUR = 432;
    public static INCUBATION_MOUSE = 350;
    public static INCUBATION_OVIELIXIR_EGGS = 50;
    public static INCUBATION_HELL_HOUND = 352;
    public static INCUBATION_CENTAUR = 420;
    public static INCUBATION_MARBLE = 368;
    public static INCUBATION_BUNNY_BABY = 200;
    public static INCUBATION_BUNNY_EGGS = 808; // High time indicates neon egg pregnancy
    public static INCUBATION_ANEMONE = 256;
    public static INCUBATION_IZMA = 300;
    public static INCUBATION_SPIDER = 400;
    public static INCUBATION_BASILISK = 250;
    public static INCUBATION_DRIDER = 400;
    public static INCUBATION_GOO_GIRL = 85;
    public static INCUBATION_EMBER = 336;
    public static INCUBATION_SATYR = 160;
    public static INCUBATION_COTTON = 350;
    public static INCUBATION_URTA = 515;
    public static INCUBATION_SAND_WITCH = 360;
    public static INCUBATION_FROG_GIRL = 30;
    public static INCUBATION_FAERIE = 200;
    public static INCUBATION_BEE = 48;
    public static INCUBATION_SANDTRAP = 42;
    public static INCUBATION_HARPY = 168;
    public static INCUBATION_SHIELA = 72;
    public static INCUBATION_SALAMANDER = 336;

    private static MAX_FLAG_VALUE = 2999;
    private static PREG_TYPE_MASK = 0x0000ffff; // Should be safe with 65535 different pregnancy types
    private static PREG_NOTICE_MASK = 0x7fff0000; // Use upper half to store the latest stages of pregnancy the player has noticed

    private _pregnancyTypeFlag: number;
    private _pregnancyIncubationFlag: number;
    private _buttPregnancyTypeFlag: number;
    private _buttPregnancyIncubationFlag: number;
    private _pregnancyEventValue: number[][]; // Using a vector of vectors so that each different pregnancy type can have its own set of events
    private _buttPregnancyEventValue: number[][];

    // All the flags are passed through the constructor so that they can be different in every class that uses PregnancyStore but the pregnancy code remains the same
    public constructor(
        pregType: number,
        pregInc: number,
        buttPregType: number,
        buttPregInc: number
    ) {
        this._pregnancyTypeFlag = pregType;
        this._pregnancyIncubationFlag = pregInc;
        this._buttPregnancyTypeFlag = buttPregType;
        this._buttPregnancyIncubationFlag = buttPregInc;
        this._pregnancyEventValue = [];
        this._buttPregnancyEventValue = [];
        if (
            pregType < 0 ||
            pregType > PregnancyStore.MAX_FLAG_VALUE ||
            pregInc < 0 ||
            pregInc > PregnancyStore.MAX_FLAG_VALUE ||
            buttPregType < 0 ||
            buttPregType > PregnancyStore.MAX_FLAG_VALUE ||
            buttPregInc < 0 ||
            buttPregInc > PregnancyStore.MAX_FLAG_VALUE ||
            pregType == buttPregType ||
            pregInc == buttPregInc
        ) {
            trace(
                `Error: PregnancyStore created with invalid values for its flags. PregnancyStore(${pregType}, ${pregInc}, ${buttPregType}, ${buttPregInc})`
            );
        }
    }

    public get type(): number {
        return this._pregnancyTypeFlag == 0
            ? 0
            : kGAMECLASS.flags[this._pregnancyTypeFlag] & PregnancyStore.PREG_TYPE_MASK;
    }

    public get incubation(): number {
        return this._pregnancyIncubationFlag == 0
            ? 0
            : kGAMECLASS.flags[this._pregnancyIncubationFlag];
    }

    public get buttType(): number {
        return this._buttPregnancyTypeFlag == 0
            ? 0
            : kGAMECLASS.flags[this._buttPregnancyTypeFlag] & PregnancyStore.PREG_TYPE_MASK;
    }

    public get buttIncubation(): number {
        return this._buttPregnancyIncubationFlag == 0
            ? 0
            : kGAMECLASS.flags[this._buttPregnancyIncubationFlag];
    }

    public get isPregnant(): boolean {
        return this.type != 0;
    } // At birth the incubation can be zero so a check vs. type is safer

    public get isButtPregnant(): boolean {
        return this.buttType != 0;
    } // At birth the incubation can be zero so a check vs. type is safer

    /* Using this function adds a series of events which happen during the pregnancy. They must be added in descending order (ex. 500, 450, 350, 225, 100, 25)
       to work properly. For NPCs who have multiple pregnancy types each type has its own set of events. Events can be used to see how far along the NPC
       is in her pregnancy with the event property. They can also be checked using the eventTriggered() function. This checks to see which was the latest event
       the player noticed. The eventTriggered() function only triggers once per event per pregnancy. */
    public addPregnancyEventSet(pregType: number, ...pregStage: any): void {
        const pregVector: number[] = []; // (pregStage.length + 2);
        pregVector[0] = pregType; // First element is the pregnancy type
        for (let i = 0; i < pregStage.length; i++) pregVector[i + 1] = pregStage[i];
        pregVector[pregVector.length - 1] = -1; // Make last element -1 to ensure there is always a match
        this._pregnancyEventValue.push(pregVector);
    }

    // Same as addPregnancyEventSet, but for butts
    public addButtPregnancyEventSet(buttPregType: number, ...buttPregStage: any): void {
        const pregVector: number[] = []; // (buttPregStage.length + 1);
        pregVector[0] = buttPregType; // First element is the butt pregnancy type
        for (let i = 0; i < buttPregStage.length; i++) pregVector[i + 1] = buttPregStage[i];
        pregVector[pregVector.length - 1] = -1; // Make last element -1 to ensure there is always a match
        this._buttPregnancyEventValue.push(pregVector);
    }

    public knockUp(newPregType = 0, newPregIncubation = 0): void {
        if (!this.isPregnant) this.knockUpForce(newPregType, newPregIncubation);
    }

    public knockUpForce(newPregType = 0, newPregIncubation = 0): void {
        if (this._pregnancyTypeFlag == 0 || this._pregnancyIncubationFlag == 0) return; // Check that these variables were provided by the containing class
        if (newPregType != 0)
            newPregType =
                (kGAMECLASS.flags[this._pregnancyTypeFlag] & PregnancyStore.PREG_NOTICE_MASK) +
                newPregType;
        // If a pregnancy 'continues' an existing pregnancy then do not change the value for last noticed stage
        kGAMECLASS.flags[this._pregnancyTypeFlag] = newPregType;
        kGAMECLASS.flags[this._pregnancyIncubationFlag] = newPregType == 0 ? 0 : newPregIncubation; // Won't allow incubation time without pregnancy type
    }

    public buttKnockUp(newPregType = 0, newPregIncubation = 0): void {
        if (!this.isButtPregnant) this.buttKnockUpForce(newPregType, newPregIncubation);
    }

    public buttKnockUpForce(newPregType = 0, newPregIncubation = 0): void {
        if (this._buttPregnancyTypeFlag == 0 || this._buttPregnancyIncubationFlag == 0) return; // Check that these variables were provided by the containing class
        if (newPregType != 0)
            newPregType =
                (kGAMECLASS.flags[this._buttPregnancyTypeFlag] & PregnancyStore.PREG_NOTICE_MASK) +
                newPregType;
        // If a pregnancy 'continues' an existing pregnancy then do not change the value for last noticed stage
        kGAMECLASS.flags[this._buttPregnancyTypeFlag] = newPregType;
        kGAMECLASS.flags[this._buttPregnancyIncubationFlag] =
            newPregType == 0 ? 0 : newPregIncubation; // Won't allow incubation time without pregnancy type
    }

    // The containing class is responsible for calling pregnancyAdvance, usually once per timeChange()
    public pregnancyAdvance(): void {
        // Separate function so it can be called more often than timeChange if neccessary
        if (this.incubation != 0) {
            kGAMECLASS.flags[this._pregnancyIncubationFlag]--;
            if (kGAMECLASS.flags[this._pregnancyIncubationFlag] < 0)
                kGAMECLASS.flags[this._pregnancyIncubationFlag] = 0;
        }
        if (this.buttIncubation != 0) {
            kGAMECLASS.flags[this._buttPregnancyIncubationFlag]--;
            if (kGAMECLASS.flags[this._buttPregnancyIncubationFlag] < 0)
                kGAMECLASS.flags[this._buttPregnancyIncubationFlag] = 0;
        }
    }

    /* Many NPCs go through several events during their pregnancies. This function returns the latest event the NPC qualifies for.
       When the NPC is not pregnant this always returns 0, when pregnant it will return at least 1. The further along the NPC is the larger the value. Each NPC
       is free to have as many event as desired. They must be added using the addPregnancyEventSet function and are unique to each pregnancy type. */
    public get event(): number {
        const pregType: number = this.type;
        if (pregType == 0) return 0; // Not pregnant
        const incubationValue: number = this.incubation;

        for (const pregEventVector of this._pregnancyEventValue) {
            if (pregEventVector[0] == pregType) {
                for (let j = 1; j < pregEventVector.length; j++) {
                    // Skip element zero, the pregnancy type
                    if (incubationValue > pregEventVector[j]) return j; // Will always find a value that is < incubationValue as last value is -1
                }
            }
        }
        return 1; // If there are no pregnancy events for this type of pregnancy then return 1
    }

    // The same event system as for vaginal pregnacies, but for butts
    public get buttEvent(): number {
        const pregType: number = this.buttType;
        if (pregType == 0) return 0; // Not pregnant
        const incubationValue: number = this.buttIncubation;
        for (const pregEventVector of this._buttPregnancyEventValue) {
            if (pregEventVector[0] == pregType) {
                for (let j = 1; j < pregEventVector.length; j++) {
                    // Skip element zero, the pregnancy type
                    if (incubationValue > pregEventVector[j]) return j; // Will always find a value that is < incubationValue as last value is -1
                }
            }
        }
        return 1; // If there are no pregnancy events for this type of pregnancy then return 1
    }

    // Returns either zero - for no change - or the value of the new pregnancy event which the player has not yet noticed
    // This function updates the noticed pregnancy event, so it only triggers once per event per pregnancy.
    public eventTriggered(): number {
        const currentStage: number = this.event;
        const lastNoticed: number =
            kGAMECLASS.flags[this._pregnancyTypeFlag] & PregnancyStore.PREG_NOTICE_MASK;
        if (currentStage * 65536 == lastNoticed) return 0; // Player has already noticed this stage
        kGAMECLASS.flags[this._pregnancyTypeFlag] =
            (kGAMECLASS.flags[this._pregnancyTypeFlag] & PregnancyStore.PREG_TYPE_MASK) +
            currentStage * 65536;
        // Strip off the old noticed value by ANDing with PREG_TYPE_MASK
        return currentStage;
    }

    // Same as eventTriggered, but for butts
    public buttEventTriggered(): number {
        const currentStage: number = this.buttEvent;
        const lastNoticed: number =
            kGAMECLASS.flags[this._buttPregnancyTypeFlag] & PregnancyStore.PREG_NOTICE_MASK;
        if (currentStage * 65536 == lastNoticed) return 0; // Player has already noticed this stage
        kGAMECLASS.flags[this._buttPregnancyTypeFlag] =
            (kGAMECLASS.flags[this._buttPregnancyTypeFlag] & PregnancyStore.PREG_TYPE_MASK) +
            currentStage * 65536;
        // Strip off the old noticed value by ANDing with PREG_TYPE_MASK
        return currentStage;
    }

    public get size(): number {
        // This function exists to provide consistency across different NPC's pregnancies. This is most useful when trying to write descriptions of different belly sizes
        // in threesomes, where the author might not be familiar with how the different pregnancy events relate to belly size.
        return PregnancyStore.PREG_NOT_PREGANT;
    }
}
