define(["require", "exports", "../../BaseContent", "./Bog/FrogGirlScene", "./Bog/ChameleonGirlScene", "./Bog/PhoukaScene", "../../GlobalFlags/kFLAGS", "../../GlobalFlags/kGAMECLASS"], function (require, exports, BaseContent_1, FrogGirlScene_1, ChameleonGirlScene_1, PhoukaScene_1, kFLAGS_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 06.01.14.
     */
    class Bog extends BaseContent_1.BaseContent {
        constructor() {
            super(...arguments);
            this.frogGirlScene = new FrogGirlScene_1.FrogGirlScene();
            this.chameleonGirlScene = new ChameleonGirlScene_1.ChameleonGirlScene();
            this.phoukaScene = new PhoukaScene_1.PhoukaScene();
        }
        exploreBog() {
            this.flags[kFLAGS_1.kFLAGS.BOG_EXPLORED]++;
            //Helia monogamy fucks
            if (this.flags[kFLAGS_1.kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && this.flags[kFLAGS_1.kFLAGS.HEL_RAPED_TODAY] == 0 && Bog.rand(10) == 0 && this.player.gender > 0 && !kGAMECLASS_1.kGAMECLASS.helFollower.followerHel()) {
                kGAMECLASS_1.kGAMECLASS.helScene.helSexualAmbush();
                return;
            }
            if ((this.isHalloween() && (this.date.fullYear > this.flags[kFLAGS_1.kFLAGS.TREACLE_MINE_YEAR_DONE]) && this.flags[kFLAGS_1.kFLAGS.BOG_EXPLORED] % 4 == 0) && (this.flags[kFLAGS_1.kFLAGS.PHOUKA_LORE] > 0)) {
                this.phoukaScene.phoukaHalloween(); //Must have met them enough times to know what they're called, have some idea of their normal behaviour
                return;
            }
            if (this.player.buttPregnancyIncubation == 0 && Bog.rand(3) == 0)
                this.frogGirlScene.findTheFrogGirl();
            else if (Bog.rand(3) == 0)
                this.phoukaScene.phoukaEncounter();
            else if (Bog.rand(2) == 0)
                this.chameleonGirlScene.encounterChameleon();
            else {
                this.clearOutput();
                this.outputText("You wander around through the humid muck, but you don't run into anything interesting.");
                this.doNext(this.camp.returnToCampUseOneHour);
            }
        }
    }
    exports.Bog = Bog;
});
//# sourceMappingURL=Bog.js.map