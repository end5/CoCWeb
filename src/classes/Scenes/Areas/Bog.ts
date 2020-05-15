import { BaseContent } from "../../BaseContent";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { ChameleonGirlScene } from "./Bog/ChameleonGirlScene";
import { FrogGirlScene } from "./Bog/FrogGirlScene";
import { PhoukaScene } from "./Bog/PhoukaScene";

/**
 * Created by aimozg on 06.01.14.
 */

export class Bog extends BaseContent {
    public frogGirlScene: FrogGirlScene = new FrogGirlScene();
    public chameleonGirlScene: ChameleonGirlScene = new ChameleonGirlScene();
    public phoukaScene: PhoukaScene = new PhoukaScene();
    public exploreBog(): void {
        this.flags[kFLAGS.BOG_EXPLORED]++;
        // Helia monogamy fucks
        if (
            this.flags[kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 &&
            this.flags[kFLAGS.HEL_RAPED_TODAY] == 0 &&
            Bog.rand(10) == 0 &&
            this.player.gender > 0 &&
            !kGAMECLASS.helFollower.followerHel()
        ) {
            kGAMECLASS.helScene.helSexualAmbush();
            return;
        }
        if (
            this.isHalloween() &&
            this.date.fullYear > this.flags[kFLAGS.TREACLE_MINE_YEAR_DONE] &&
            this.flags[kFLAGS.BOG_EXPLORED] % 4 == 0 &&
            this.flags[kFLAGS.PHOUKA_LORE] > 0
        ) {
            this.phoukaScene.phoukaHalloween(); // Must have met them enough times to know what they're called, have some idea of their normal behaviour
            return;
        }
        if (this.player.buttPregnancyIncubation == 0 && Bog.rand(3) == 0)
            this.frogGirlScene.findTheFrogGirl();
        else if (Bog.rand(3) == 0) this.phoukaScene.phoukaEncounter();
        else if (Bog.rand(2) == 0) this.chameleonGirlScene.encounterChameleon();
        else {
            this.clearOutput();
            this.outx(
                "You wander around through the humid muck, but you don't run into anything interesting."
            );
            this.doNext(this.camp.returnToCampUseOneHour);
        }
    }
}
