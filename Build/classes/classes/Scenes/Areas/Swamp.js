define(["require", "exports", "../../BaseContent", "./Swamp/CorruptedDriderScene", "./Swamp/FemaleSpiderMorphScene", "./Swamp/MaleSpiderMorphScene", "./Swamp/Rogar", "../../GlobalFlags/kFLAGS", "../../GlobalFlags/kGAMECLASS"], function (require, exports, BaseContent_1, CorruptedDriderScene_1, FemaleSpiderMorphScene_1, MaleSpiderMorphScene_1, Rogar_1, kFLAGS_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 06.01.14.
     */
    class Swamp extends BaseContent_1.BaseContent {
        constructor() {
            super(...arguments);
            this.corruptedDriderScene = new CorruptedDriderScene_1.CorruptedDriderScene();
            this.femaleSpiderMorphScene = new FemaleSpiderMorphScene_1.FemaleSpiderMorphScene();
            this.maleSpiderMorphScene = new MaleSpiderMorphScene_1.MaleSpiderMorphScene();
            this.rogar = new Rogar_1.Rogar();
        }
        exploreSwamp() {
            //Discover 'Bog' at after 25 explores of swamp
            if ((this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00272] >= 25) && this.flags[kFLAGS_1.kFLAGS.BOG_EXPLORED] == 0) {
                this.outputText("While exploring the swamps, you find yourself into a particularly dark, humid area of this already fetid biome.  You judge that you could find your way back here pretty easily in the future, if you wanted to.  With your newfound discovery fresh in your mind, you return to camp.\n\n(<b>Bog exploration location unlocked! (Page 2)</b>)", true);
                this.flags[kFLAGS_1.kFLAGS.BOG_EXPLORED]++;
                this.doNext(this.camp.returnToCampUseOneHour);
                return;
            }
            this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00272]++;
            /*  SPECIAL SCENE OVERWRITES */
            //KIHA X HEL THREESOME!
            if (!kGAMECLASS_1.kGAMECLASS.kihaFollower.followerKiha() && this.player.cor < 60 && this.flags[kFLAGS_1.kFLAGS.KIHA_AFFECTION_LEVEL] >= 1 && this.flags[kFLAGS_1.kFLAGS.HEL_FUCKBUDDY] > 0 && this.player.hasCock() && this.flags[kFLAGS_1.kFLAGS.KIHA_AND_HEL_WHOOPIE] == 0) {
                kGAMECLASS_1.kGAMECLASS.kihaFollower.kihaXSalamander();
                return;
            }
            //Helia monogamy fucks
            if (this.flags[kFLAGS_1.kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && this.flags[kFLAGS_1.kFLAGS.HEL_RAPED_TODAY] == 0 && Swamp.rand(10) == 0 && this.player.gender > 0 && !kGAMECLASS_1.kGAMECLASS.helFollower.followerHel()) {
                kGAMECLASS_1.kGAMECLASS.helScene.helSexualAmbush();
                return;
            }
            if (this.flags[kFLAGS_1.kFLAGS.TOOK_EMBER_EGG] == 0 && this.flags[kFLAGS_1.kFLAGS.EGG_BROKEN] == 0 && this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00272] > 0 && (this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00272] % 40 == 0)) {
                kGAMECLASS_1.kGAMECLASS.emberScene.findEmbersEgg();
                return;
            }
            /*  STANDARD SCENE SELECTION  */
            var choices = [];
            //Build the choice array
            //M & F spidermorphs
            choices[choices.length] = 0;
            choices[choices.length] = 1;
            //Drider
            choices[choices.length] = 2;
            //ROGAR
            if (this.flags[kFLAGS_1.kFLAGS.ROGAR_DISABLED] == 0 && this.flags[kFLAGS_1.kFLAGS.ROGAR_PHASE] < 3)
                choices[choices.length] = 3;
            //Kiha
            choices[choices.length] = 4;
            //Pick from the choices and pull the encounter.
            var choice = choices[Swamp.rand(choices.length)];
            switch (choice) {
                case 0:
                    this.femaleSpiderMorphScene.fSpiderMorphGreeting();
                    break;
                case 1:
                    this.maleSpiderMorphScene.greetMaleSpiderMorph();
                    break;
                case 2:
                    this.corruptedDriderScene.driderEncounter();
                    break;
                case 3:
                    this.rogar.encounterRogarSwamp();
                    break;
                case 4:
                    //Kiha follower gets to explore her territory!
                    if (kGAMECLASS_1.kGAMECLASS.kihaFollower.followerKiha())
                        kGAMECLASS_1.kGAMECLASS.kihaScene.kihaExplore();
                    else
                        kGAMECLASS_1.kGAMECLASS.kihaScene.encounterKiha();
                    break;
                default:
                    this.outputText("New explore code fucked up.  YOU BONED (TELL FEN)");
                    this.doNext(this.playerMenu);
                    break;
            }
        }
    }
    exports.Swamp = Swamp;
});
//# sourceMappingURL=Swamp.js.map