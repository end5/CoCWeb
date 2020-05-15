import { BaseContent } from "../../BaseContent";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { CorruptedDriderScene } from "./Swamp/CorruptedDriderScene";
import { FemaleSpiderMorphScene } from "./Swamp/FemaleSpiderMorphScene";
import { MaleSpiderMorphScene } from "./Swamp/MaleSpiderMorphScene";
import { Rogar } from "./Swamp/Rogar";

/**
 * Created by aimozg on 06.01.14.
 */

export class Swamp extends BaseContent {
    public corruptedDriderScene: CorruptedDriderScene = new CorruptedDriderScene();
    public femaleSpiderMorphScene: FemaleSpiderMorphScene = new FemaleSpiderMorphScene();
    public maleSpiderMorphScene: MaleSpiderMorphScene = new MaleSpiderMorphScene();
    public rogar: Rogar = new Rogar();
    public exploreSwamp(): void {
        // Discover 'Bog' at after 25 explores of swamp
        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00272] >= 25 &&
            this.flags[kFLAGS.BOG_EXPLORED] == 0
        ) {
            this.outx(
                "While exploring the swamps, you find yourself into a particularly dark, humid area of this already fetid biome.  You judge that you could find your way back here pretty easily in the future, if you wanted to.  With your newfound discovery fresh in your mind, you return to camp.\n\n(<b>Bog exploration location unlocked! (Page 2)</b>)",
                true
            );
            this.flags[kFLAGS.BOG_EXPLORED]++;
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00272]++;
        /*  SPECIAL SCENE OVERWRITES */
        // KIHA X HEL THREESOME!
        if (
            !kGAMECLASS.kihaFollower.followerKiha() &&
            this.player.cor < 60 &&
            this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] >= 1 &&
            this.flags[kFLAGS.HEL_FUCKBUDDY] > 0 &&
            this.player.hasCock() &&
            this.flags[kFLAGS.KIHA_AND_HEL_WHOOPIE] == 0
        ) {
            kGAMECLASS.kihaFollower.kihaXSalamander();
            return;
        }
        // Helia monogamy fucks
        if (
            this.flags[kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 &&
            this.flags[kFLAGS.HEL_RAPED_TODAY] == 0 &&
            Swamp.rand(10) == 0 &&
            this.player.gender > 0 &&
            !kGAMECLASS.helFollower.followerHel()
        ) {
            kGAMECLASS.helScene.helSexualAmbush();
            return;
        }
        if (
            this.flags[kFLAGS.TOOK_EMBER_EGG] == 0 &&
            this.flags[kFLAGS.EGG_BROKEN] == 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00272] > 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00272] % 40 == 0
        ) {
            kGAMECLASS.emberScene.findEmbersEgg();
            return;
        }
        /*  STANDARD SCENE SELECTION  */
        const choices: any[] = [];
        // Build the choice array
        // M & F spidermorphs
        choices[choices.length] = 0;
        choices[choices.length] = 1;
        // Drider
        choices[choices.length] = 2;
        // ROGAR
        if (this.flags[kFLAGS.ROGAR_DISABLED] == 0 && this.flags[kFLAGS.ROGAR_PHASE] < 3)
            choices[choices.length] = 3;
        // Kiha
        choices[choices.length] = 4;

        // Pick from the choices and pull the encounter.
        const choice: number = choices[Swamp.rand(choices.length)];
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
                // Kiha follower gets to explore her territory!
                if (kGAMECLASS.kihaFollower.followerKiha()) kGAMECLASS.kihaScene.kihaExplore();
                else kGAMECLASS.kihaScene.encounterKiha();
                break;
            default:
                this.outx("New explore code fucked up.  YOU BONED (TELL FEN)");
                this.doNext(this.playerMenu);
                break;
        }
    }
}
