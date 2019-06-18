define(["require", "exports", "./GlobalFlags/kGAMECLASS", "../console"], function (require, exports, kGAMECLASS_1, console_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PregnancyStore {
        //All the flags are passed through the constructor so that they can be different in every class that uses PregnancyStore but the pregnancy code remains the same
        constructor(pregType, pregInc, buttPregType, buttPregInc) {
            this._pregnancyTypeFlag = pregType;
            this._pregnancyIncubationFlag = pregInc;
            this._buttPregnancyTypeFlag = buttPregType;
            this._buttPregnancyIncubationFlag = buttPregInc;
            this._pregnancyEventValue = [];
            this._buttPregnancyEventValue = [];
            if (pregType < 0 || pregType > PregnancyStore.MAX_FLAG_VALUE || pregInc < 0 || pregInc > PregnancyStore.MAX_FLAG_VALUE || buttPregType < 0 || buttPregType > PregnancyStore.MAX_FLAG_VALUE || buttPregInc < 0 || buttPregInc > PregnancyStore.MAX_FLAG_VALUE || pregType == buttPregType || pregInc == buttPregInc) {
                console_1.trace("Error: PregnancyStore created with invalid values for its flags. PregnancyStore(" + pregType + ", " + pregInc + ", " + buttPregType + ", " + buttPregInc + ")");
            }
        }
        get type() { return (this._pregnancyTypeFlag == 0 ? 0 : kGAMECLASS_1.kGAMECLASS.flags[this._pregnancyTypeFlag] & PregnancyStore.PREG_TYPE_MASK); }
        get incubation() { return (this._pregnancyIncubationFlag == 0 ? 0 : kGAMECLASS_1.kGAMECLASS.flags[this._pregnancyIncubationFlag]); }
        get buttType() { return (this._buttPregnancyTypeFlag == 0 ? 0 : kGAMECLASS_1.kGAMECLASS.flags[this._buttPregnancyTypeFlag] & PregnancyStore.PREG_TYPE_MASK); }
        get buttIncubation() { return (this._buttPregnancyIncubationFlag == 0 ? 0 : kGAMECLASS_1.kGAMECLASS.flags[this._buttPregnancyIncubationFlag]); }
        get isPregnant() { return this.type != 0; } //At birth the incubation can be zero so a check vs. type is safer
        get isButtPregnant() { return this.buttType != 0; } //At birth the incubation can be zero so a check vs. type is safer
        /* Using this function adds a series of events which happen during the pregnancy. They must be added in descending order (ex. 500, 450, 350, 225, 100, 25)
           to work properly. For NPCs who have multiple pregnancy types each type has its own set of events. Events can be used to see how far along the NPC
           is in her pregnancy with the event property. They can also be checked using the eventTriggered() function. This checks to see which was the latest event
           the player noticed. The eventTriggered() function only triggers once per event per pregnancy. */
        addPregnancyEventSet(pregType, ...pregStage) {
            var pregVector = []; // (pregStage.length + 2);
            pregVector[0] = pregType; //First element is the pregnancy type
            for (var i = 0; i < pregStage.length; i++)
                pregVector[i + 1] = pregStage[i];
            pregVector[pregVector.length - 1] = -1; //Make last element -1 to ensure there is always a match
            this._pregnancyEventValue.push(pregVector);
        }
        //Same as addPregnancyEventSet, but for butts
        addButtPregnancyEventSet(buttPregType, ...buttPregStage) {
            var pregVector = []; // (buttPregStage.length + 1);
            pregVector[0] = buttPregType; //First element is the butt pregnancy type
            for (var i = 0; i < buttPregStage.length; i++)
                pregVector[i + 1] = buttPregStage[i];
            pregVector[pregVector.length - 1] = -1; //Make last element -1 to ensure there is always a match
            this._buttPregnancyEventValue.push(pregVector);
        }
        knockUp(newPregType = 0, newPregIncubation = 0) {
            if (!this.isPregnant)
                this.knockUpForce(newPregType, newPregIncubation);
        }
        knockUpForce(newPregType = 0, newPregIncubation = 0) {
            if (this._pregnancyTypeFlag == 0 || this._pregnancyIncubationFlag == 0)
                return; //Check that these variables were provided by the containing class
            if (newPregType != 0)
                newPregType = (kGAMECLASS_1.kGAMECLASS.flags[this._pregnancyTypeFlag] & PregnancyStore.PREG_NOTICE_MASK) + newPregType;
            //If a pregnancy 'continues' an existing pregnancy then do not change the value for last noticed stage
            kGAMECLASS_1.kGAMECLASS.flags[this._pregnancyTypeFlag] = newPregType;
            kGAMECLASS_1.kGAMECLASS.flags[this._pregnancyIncubationFlag] = (newPregType == 0 ? 0 : newPregIncubation); //Won't allow incubation time without pregnancy type
        }
        buttKnockUp(newPregType = 0, newPregIncubation = 0) {
            if (!this.isButtPregnant)
                this.buttKnockUpForce(newPregType, newPregIncubation);
        }
        buttKnockUpForce(newPregType = 0, newPregIncubation = 0) {
            if (this._buttPregnancyTypeFlag == 0 || this._buttPregnancyIncubationFlag == 0)
                return; //Check that these variables were provided by the containing class
            if (newPregType != 0)
                newPregType = (kGAMECLASS_1.kGAMECLASS.flags[this._buttPregnancyTypeFlag] & PregnancyStore.PREG_NOTICE_MASK) + newPregType;
            //If a pregnancy 'continues' an existing pregnancy then do not change the value for last noticed stage
            kGAMECLASS_1.kGAMECLASS.flags[this._buttPregnancyTypeFlag] = newPregType;
            kGAMECLASS_1.kGAMECLASS.flags[this._buttPregnancyIncubationFlag] = (newPregType == 0 ? 0 : newPregIncubation); //Won't allow incubation time without pregnancy type
        }
        //The containing class is responsible for calling pregnancyAdvance, usually once per timeChange()
        pregnancyAdvance() {
            if (this.incubation != 0) {
                kGAMECLASS_1.kGAMECLASS.flags[this._pregnancyIncubationFlag]--;
                if (kGAMECLASS_1.kGAMECLASS.flags[this._pregnancyIncubationFlag] < 0)
                    kGAMECLASS_1.kGAMECLASS.flags[this._pregnancyIncubationFlag] = 0;
            }
            if (this.buttIncubation != 0) {
                kGAMECLASS_1.kGAMECLASS.flags[this._buttPregnancyIncubationFlag]--;
                if (kGAMECLASS_1.kGAMECLASS.flags[this._buttPregnancyIncubationFlag] < 0)
                    kGAMECLASS_1.kGAMECLASS.flags[this._buttPregnancyIncubationFlag] = 0;
            }
        }
        /* Many NPCs go through several events during their pregnancies. This function returns the latest event the NPC qualifies for.
           When the NPC is not pregnant this always returns 0, when pregnant it will return at least 1. The further along the NPC is the larger the value. Each NPC
           is free to have as many event as desired. They must be added using the addPregnancyEventSet function and are unique to each pregnancy type. */
        get event() {
            var pregType = this.type;
            if (pregType == 0)
                return 0; //Not pregnant
            var incubationValue = this.incubation;
            var pregEventVector;
            for (var i = 0; i < this._pregnancyEventValue.length; i++) {
                pregEventVector = this._pregnancyEventValue[i];
                if (pregEventVector[0] == pregType) {
                    for (var j = 1; j < pregEventVector.length; j++) { //Skip element zero, the pregnancy type
                        if (incubationValue > pregEventVector[j])
                            return j; //Will always find a value that is < incubationValue as last value is -1
                    }
                }
            }
            return 1; //If there are no pregnancy events for this type of pregnancy then return 1
        }
        //The same event system as for vaginal pregnacies, but for butts
        get buttEvent() {
            var pregType = this.buttType;
            if (pregType == 0)
                return 0; //Not pregnant
            var incubationValue = this.buttIncubation;
            var pregEventVector;
            for (var i = 0; i < this._buttPregnancyEventValue.length; i++) {
                pregEventVector = this._buttPregnancyEventValue[i];
                if (pregEventVector[0] == pregType) {
                    for (var j = 1; j < pregEventVector.length; j++) { //Skip element zero, the pregnancy type
                        if (incubationValue > pregEventVector[j])
                            return j; //Will always find a value that is < incubationValue as last value is -1
                    }
                }
            }
            return 1; //If there are no pregnancy events for this type of pregnancy then return 1
        }
        //Returns either zero - for no change - or the value of the new pregnancy event which the player has not yet noticed
        //This function updates the noticed pregnancy event, so it only triggers once per event per pregnancy.
        eventTriggered() {
            var currentStage = this.event;
            var lastNoticed = kGAMECLASS_1.kGAMECLASS.flags[this._pregnancyTypeFlag] & PregnancyStore.PREG_NOTICE_MASK;
            if (currentStage * 65536 == lastNoticed)
                return 0; //Player has already noticed this stage
            kGAMECLASS_1.kGAMECLASS.flags[this._pregnancyTypeFlag] = (kGAMECLASS_1.kGAMECLASS.flags[this._pregnancyTypeFlag] & PregnancyStore.PREG_TYPE_MASK) + (currentStage * 65536);
            //Strip off the old noticed value by ANDing with PREG_TYPE_MASK
            return currentStage;
        }
        //Same as eventTriggered, but for butts
        buttEventTriggered() {
            var currentStage = this.buttEvent;
            var lastNoticed = kGAMECLASS_1.kGAMECLASS.flags[this._buttPregnancyTypeFlag] & PregnancyStore.PREG_NOTICE_MASK;
            if (currentStage * 65536 == lastNoticed)
                return 0; //Player has already noticed this stage
            kGAMECLASS_1.kGAMECLASS.flags[this._buttPregnancyTypeFlag] = (kGAMECLASS_1.kGAMECLASS.flags[this._buttPregnancyTypeFlag] & PregnancyStore.PREG_TYPE_MASK) + (currentStage * 65536);
            //Strip off the old noticed value by ANDing with PREG_TYPE_MASK
            return currentStage;
        }
        get size() {
            //This function exists to provide consistency across different NPC's pregnancies. This is most useful when trying to write descriptions of different belly sizes
            //in threesomes, where the author might not be familiar with how the different pregnancy events relate to belly size.
            return PregnancyStore.PREG_NOT_PREGANT;
        }
    }
    //Pregancy types. Both butt and normal. Each type represents the father of this baby.
    PregnancyStore.PREGNANCY_IMP = 1;
    PregnancyStore.PREGNANCY_MINOTAUR = 2;
    PregnancyStore.PREGNANCY_MOUSE = 4;
    PregnancyStore.PREGNANCY_OVIELIXIR_EGGS = 5; //Also caused by Phoenixes apparently
    PregnancyStore.PREGNANCY_HELL_HOUND = 6;
    PregnancyStore.PREGNANCY_CENTAUR = 7;
    PregnancyStore.PREGNANCY_MARBLE = 8;
    PregnancyStore.PREGNANCY_BUNNY = 9;
    PregnancyStore.PREGNANCY_ANEMONE = 10;
    PregnancyStore.PREGNANCY_AMILY = 11;
    PregnancyStore.PREGNANCY_IZMA = 12;
    PregnancyStore.PREGNANCY_SPIDER = 13;
    PregnancyStore.PREGNANCY_BASILISK = 14;
    PregnancyStore.PREGNANCY_DRIDER_EGGS = 15;
    PregnancyStore.PREGNANCY_GOO_GIRL = 16;
    PregnancyStore.PREGNANCY_EMBER = 17;
    PregnancyStore.PREGNANCY_BENOIT = 18;
    PregnancyStore.PREGNANCY_SATYR = 19;
    PregnancyStore.PREGNANCY_COTTON = 20;
    PregnancyStore.PREGNANCY_URTA = 21;
    PregnancyStore.PREGNANCY_SAND_WITCH = 22;
    PregnancyStore.PREGNANCY_FROG_GIRL = 23;
    PregnancyStore.PREGNANCY_FAERIE = 24; //Indicates you are carrying either a phouka or faerie baby. Which one is determined by the PREGNANCY_CORRUPTION flag
    PregnancyStore.PREGNANCY_PLAYER = 25; //The player is the father. Will be used when an NPC is able to have children from multiple different fathers.
    PregnancyStore.PREGNANCY_BEE_EGGS = 26;
    PregnancyStore.PREGNANCY_SANDTRAP_FERTILE = 27;
    PregnancyStore.PREGNANCY_SANDTRAP = 28;
    PregnancyStore.PREGNANCY_JOJO = 29; //So we can track them separately from other mouse pregnancies
    PregnancyStore.PREGNANCY_KELT = 30; //So we can track them separately from other centaur pregnancies
    PregnancyStore.PREGNANCY_TAOTH = 31;
    PregnancyStore.PREGNANCY_GOO_STUFFED = 32; //Used to fill the player's ass and/or vagina when Valeria has a goo girl take up residence. This prevents any other
    //form of pregnancy from taking hold. Does not respond to ovielixirs.
    PregnancyStore.PREGNANCY_WORM_STUFFED = 33; //Used to fill the player's vagina when the worms take up residence. This prevents any other form of
    //pregnancy from taking hold. Does not respond to ovielixirs.
    PregnancyStore.PREG_NOT_PREGANT = 0; //The PREG_* consts are returned by the size function
    PregnancyStore.PREG_NO_SIGNS_UNKNOWN = 1; //NPC has conceived but doesn’t know she’s pregnant, no visible signs
    PregnancyStore.PREG_NO_SIGNS_KNOWN = 2; //NPC is in the first trimester, knows she’s pregnant
    PregnancyStore.PREG_START_BULGE = 3; //NPC is in the first trimester, belly is just starting to bulge
    PregnancyStore.PREG_SWOLLEN = 4; //NPC is in the second trimester, belly is small but definitely swollen
    PregnancyStore.PREG_SIZEABLE = 5; //NPC is in the second trimester, belly is now sizable
    PregnancyStore.PREG_BLATANT = 6; //NPC is in the third trimester, belly is blatantly bulging
    PregnancyStore.PREG_FULL_TERM = 7; //NPC is in the third trimester, belly is big as it will get for a normal pregnancy
    PregnancyStore.PREG_OVERDUE = 8; //NPC is overdue. Usually means a centaur baby, twins or some similar condition. Effectively looks 10 months pregnant
    PregnancyStore.PREG_VERY_OVERDUE = 9; //NPC is very overdue. Probably triplets or more. Effectively looks 11 months pregnant
    //Old Value, replaced in Saves.unFuckSave()		public static const PREGNANCY_BUTT_BEE: number              =   2;
    //Old Value, replaced in Saves.unFuckSave()		public static const PREGNANCY_BUTT_DRIDER: number           =   3;
    //Old Value, replaced in Saves.unFuckSave()		public static const PREGNANCY_BUTT_SANDTRAP_FERTILE: number =   4;
    //Old Value, replaced in Saves.unFuckSave()		public static const PREGNANCY_BUTT_SANDTRAP: number         =   5; //Sandtrap did not have fertilized eggs
    PregnancyStore.INCUBATION_IMP = 432; //Time for standard imps. Imp lords, Ceraph, Lilium and the imp horde cause slightly faster pregnancies
    PregnancyStore.INCUBATION_MINOTAUR = 432;
    PregnancyStore.INCUBATION_MOUSE = 350;
    PregnancyStore.INCUBATION_OVIELIXIR_EGGS = 50;
    PregnancyStore.INCUBATION_HELL_HOUND = 352;
    PregnancyStore.INCUBATION_CENTAUR = 420;
    PregnancyStore.INCUBATION_MARBLE = 368;
    PregnancyStore.INCUBATION_BUNNY_BABY = 200;
    PregnancyStore.INCUBATION_BUNNY_EGGS = 808; //High time indicates neon egg pregnancy
    PregnancyStore.INCUBATION_ANEMONE = 256;
    PregnancyStore.INCUBATION_IZMA = 300;
    PregnancyStore.INCUBATION_SPIDER = 400;
    PregnancyStore.INCUBATION_BASILISK = 250;
    PregnancyStore.INCUBATION_DRIDER = 400;
    PregnancyStore.INCUBATION_GOO_GIRL = 85;
    PregnancyStore.INCUBATION_EMBER = 336;
    PregnancyStore.INCUBATION_SATYR = 160;
    PregnancyStore.INCUBATION_COTTON = 350;
    PregnancyStore.INCUBATION_URTA = 515;
    PregnancyStore.INCUBATION_SAND_WITCH = 360;
    PregnancyStore.INCUBATION_FROG_GIRL = 30;
    PregnancyStore.INCUBATION_FAERIE = 200;
    PregnancyStore.INCUBATION_BEE = 48;
    PregnancyStore.INCUBATION_SANDTRAP = 42;
    PregnancyStore.INCUBATION_HARPY = 168;
    PregnancyStore.INCUBATION_SHIELA = 72;
    PregnancyStore.INCUBATION_SALAMANDER = 336;
    PregnancyStore.MAX_FLAG_VALUE = 2999;
    PregnancyStore.PREG_TYPE_MASK = 0x0000FFFF; //Should be safe with 65535 different pregnancy types
    PregnancyStore.PREG_NOTICE_MASK = 0x7FFF0000; //Use upper half to store the latest stages of pregnancy the player has noticed
    exports.PregnancyStore = PregnancyStore;
});
//# sourceMappingURL=PregnancyStore.js.map