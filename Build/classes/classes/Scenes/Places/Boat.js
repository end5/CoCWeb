define(["require", "exports", "../Areas/Lake/AbstractLakeContent", "./Boat/SharkGirlScene", "./Boat/Marae", "../../StatusAffects", "../../GlobalFlags/kFLAGS", "../../GlobalFlags/kGAMECLASS"], function (require, exports, AbstractLakeContent_1, SharkGirlScene_1, Marae_1, StatusAffects_1, kFLAGS_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 06.01.14.
     */
    class Boat extends AbstractLakeContent_1.AbstractLakeContent {
        constructor() {
            super(...arguments);
            this.sharkGirlScene = new SharkGirlScene_1.SharkGirlScene();
            this.marae = new Marae_1.Marae();
        }
        discoverBoat() {
            this.player.createStatusAffect(StatusAffects_1.StatusAffects.BoatDiscovery, 0, 0, 0, 0);
            this.outputText("You journey around the lake, seeking demons to fight", true);
            if (this.player.cor > 60)
                this.outputText(" or fuck", false);
            this.outputText(".  The air is fresh, and the grass is cool and soft under your feet.   Soft waves lap against the muddy sand of the lake-shore, as if radiating outward from the lake.   You pass around a few bushes carefully, being wary of hidden 'surprises', and come upon a small dock.  The dock is crafted from old growth trees lashed together with some crude rope.  Judging by the appearance of the rope, it is very old and has not been seen to in quite some time.  Tied to the dock is a small rowboat, only about seven feet long and three feet wide.   The boat appears in much better condition than the dock, and appears to be brand new.\n\n", false);
            this.outputText("<b>You have discovered the lake boat!</b>\n(You may return and use the boat to explore the lake's interior by using the 'places' menu.)", false);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        boatExplore() {
            //Helia monogamy fucks
            if (this.flags[kFLAGS_1.kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && this.flags[kFLAGS_1.kFLAGS.HEL_RAPED_TODAY] == 0 && Boat.rand(10) == 0 && this.player.gender > 0 && !kGAMECLASS_1.kGAMECLASS.helScene.followerHel()) {
                kGAMECLASS_1.kGAMECLASS.helScene.helSexualAmbush();
                return;
            }
            this.outputText("You reach the dock without any incident and board the small rowboat.  The water is calm and placid, perfect for rowing.  ", true);
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.FactoryOverload) >= 0) {
                this.outputText("The water appears somewhat muddy and has a faint pungent odor.  ", false);
                if (this.player.inte > 40)
                    this.outputText("You realize what it smells like – sex.  ", false);
            }
            //3% chance of finding lost daughters
            if (Boat.rand(100) <= 3 && this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00412] > 0 && kGAMECLASS_1.kGAMECLASS.izmaScene.izmaFollower()) {
                kGAMECLASS_1.kGAMECLASS.izmaScene.findLostIzmaKids();
                return;
            }
            this.outputText("You set out, wondering if you'll find any strange islands or creatures in the lake.\n\n", false);
            //20% chance if not done with marae of meeting her.
            if (Boat.rand(10) <= 2 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.MaraeComplete) < 0 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.MetCorruptMarae) < 0) {
                this.marae.encounterMarae();
                return;
            }
            //10% chance of corrupt Marae followups
            if ((this.debug || Boat.rand(10) == 0) && this.flags[kFLAGS_1.kFLAGS.CORRUPT_MARAE_FOLLOWUP_ENCOUNTER_STATE] == 0 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.MetCorruptMarae) >= 0 && this.player.gender > 0) {
                this.marae.level2MaraeEncounter();
                return;
            }
            //BUILD LIST OF CHOICES
            var choice = [0, 1, 2, 3];
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.DungeonShutDown) >= 0 && this.player.level > 2)
                choice[choice.length] = 4;
            choice[choice.length] = 5;
            //MAKE YOUR CHOICE
            var selector = choice[Boat.rand(choice.length)];
            //RUN CHOSEN EVENT
            switch (selector) {
                case 0:
                    this.outputText("You row for nearly an hour, until your arms practically burn with exhaustion from all the rowing.", false);
                    this.doNext(this.camp.returnToCampUseOneHour);
                    return;
                case 1:
                    this.outputText("You give up on finding anything interesting, and decide to go check up on your camp.", false);
                    this.doNext(this.camp.returnToCampUseOneHour);
                    return;
                case 2:
                    this.sharkGirlScene.sharkGirlEncounter(1);
                    return;
                case 3:
                    this.sharkGirlScene.sharkGirlEncounter(1);
                    return;
                case 4:
                    this.lake.fetishZealotScene.zealotBoat();
                    return;
                case 5:
                    kGAMECLASS_1.kGAMECLASS.anemoneScene.mortalAnemoneeeeee();
                    return;
            }
        }
    }
    exports.Boat = Boat;
});
//# sourceMappingURL=Boat.js.map