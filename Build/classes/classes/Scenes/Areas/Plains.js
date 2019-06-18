define(["require", "exports", "../../BaseContent", "./Plains/BunnyGirl", "./Plains/GnollScene", "./Plains/GnollSpearThrowerScene", "./Plains/SatyrScene", "../../GlobalFlags/kFLAGS", "../../GlobalFlags/kGAMECLASS"], function (require, exports, BaseContent_1, BunnyGirl_1, GnollScene_1, GnollSpearThrowerScene_1, SatyrScene_1, kFLAGS_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 06.01.14.
     */
    class Plains extends BaseContent_1.BaseContent {
        constructor() {
            super(...arguments);
            this.bunnyGirl = new BunnyGirl_1.BunnyGirl();
            this.gnollScene = new GnollScene_1.GnollScene();
            this.gnollSpearThrowerScene = new GnollSpearThrowerScene_1.GnollSpearThrowerScene();
            this.satyrScene = new SatyrScene_1.SatyrScene();
        }
        explorePlains() {
            this.outputText("", true);
            this.flags[kFLAGS_1.kFLAGS.TIMES_EXPLORED_PLAINS]++;
            //Dem Kangasluts!  Force Sheila relationship phase!
            if (this.flags[kFLAGS_1.kFLAGS.SHEILA_DEMON] == 0 && this.flags[kFLAGS_1.kFLAGS.SHEILA_XP] == 3 && this.model.time.hours == 20 && this.flags[kFLAGS_1.kFLAGS.SHEILA_CLOCK] >= 0) {
                kGAMECLASS_1.kGAMECLASS.sheilaScene.sheilaXPThreeSexyTime();
                return;
            }
            //Add some holiday cheer
            if (this.isHolidays() && this.date.fullYear > this.flags[kFLAGS_1.kFLAGS.CANDY_CANE_YEAR_MET] && Plains.rand(5) == 0) {
                kGAMECLASS_1.kGAMECLASS.candyCaneTrapDiscovery();
                return;
            }
            if (this.isHolidays() && this.date.fullYear > this.flags[kFLAGS_1.kFLAGS.POLAR_PETE_YEAR_MET] && Plains.rand(4) == 0 && this.silly()) {
                kGAMECLASS_1.kGAMECLASS.polarPete();
                this.flags[kFLAGS_1.kFLAGS.POLAR_PETE_YEAR_MET] = this.date.fullYear;
                return;
            }
            //Helia monogamy fucks
            if (this.flags[kFLAGS_1.kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && this.flags[kFLAGS_1.kFLAGS.HEL_RAPED_TODAY] == 0 && Plains.rand(10) == 0 && this.player.gender > 0 && !kGAMECLASS_1.kGAMECLASS.helScene.followerHel()) {
                kGAMECLASS_1.kGAMECLASS.helScene.helSexualAmbush();
                return;
            }
            //Find Niamh
            if (this.flags[kFLAGS_1.kFLAGS.NIAMH_MOVED_OUT_COUNTER] == 1) {
                kGAMECLASS_1.kGAMECLASS.telAdre.niamh.niamhPostTelAdreMoveOut();
                return;
            }
            //Find Owca
            if (this.player.level >= 8 && this.flags[kFLAGS_1.kFLAGS.TIMES_EXPLORED_PLAINS] % 25 == 0 && this.flags[kFLAGS_1.kFLAGS.OWCA_UNLOCKED] == 0) {
                kGAMECLASS_1.kGAMECLASS.owca.gangbangVillageStuff();
                return;
            }
            //Bazaar!
            if (this.flags[kFLAGS_1.kFLAGS.TIMES_EXPLORED_PLAINS] % 10 == 0 && this.flags[kFLAGS_1.kFLAGS.BAZAAR_ENTERED] == 0) {
                kGAMECLASS_1.kGAMECLASS.bazaar.findBazaar();
                return;
            }
            //Chance of threesomes!
            if (this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00256] != 0 && this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00257] != 0 && this.flags[kFLAGS_1.kFLAGS.HEL_FUCKBUDDY] == 1 && this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00260] == 0 && !kGAMECLASS_1.kGAMECLASS.isabellaFollowerScene.isabellaFollower() && this.flags[kFLAGS_1.kFLAGS.TIMES_EXPLORED_PLAINS] % 21 == 0 && !(this.player.tallness > 78 && this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00258] == 0)) {
                //Hell/Izzy threesome intro
                if (this.flags[kFLAGS_1.kFLAGS.HEL_ISABELLA_THREESOME_ENABLED] == 0) {
                    kGAMECLASS_1.kGAMECLASS.helScene.salamanderXIsabellaPlainsIntro();
                    return;
                }
                //Propah threesomes here!
                else if (this.flags[kFLAGS_1.kFLAGS.HEL_ISABELLA_THREESOME_ENABLED] == 1) {
                    kGAMECLASS_1.kGAMECLASS.helScene.isabellaXHelThreeSomePlainsStart();
                    return;
                }
            }
            var choices = [this.plainsLoot, this.plainsLoot,
                this.gnollSpearThrowerScene.gnoll2Encounter,
                this.gnollScene.gnollEncounter,
                this.bunnyGirl.bunnbunbunMeet, this.bunnyGirl.bunnbunbunMeet];
            if (this.flags[kFLAGS_1.kFLAGS.ISABELLA_PLAINS_DISABLED] == 0) {
                choices[choices.length] = kGAMECLASS_1.kGAMECLASS.isabellaScene.isabellaGreeting;
                choices[choices.length] = kGAMECLASS_1.kGAMECLASS.isabellaScene.isabellaGreeting;
            }
            if (!kGAMECLASS_1.kGAMECLASS.helScene.followerHel()) {
                choices[choices.length] = kGAMECLASS_1.kGAMECLASS.helScene.encounterAJerkInThePlains;
                choices[choices.length] = kGAMECLASS_1.kGAMECLASS.helScene.encounterAJerkInThePlains;
            }
            choices[choices.length] = this.satyrScene.satyrEncounter;
            choices[choices.length] = this.satyrScene.satyrEncounter;
            if (this.flags[kFLAGS_1.kFLAGS.SHEILA_DISABLED] == 0 && this.flags[kFLAGS_1.kFLAGS.SHEILA_CLOCK] >= 0) { //Aparently Sheila was supposed to be disabled after certain events - now fixed
                choices[choices.length] = kGAMECLASS_1.kGAMECLASS.sheilaScene.sheilaEncounterRouter;
                choices[choices.length] = kGAMECLASS_1.kGAMECLASS.sheilaScene.sheilaEncounterRouter;
            }
            //Pick one
            choices[Plains.rand(choices.length)]();
        }
        plainsLoot() {
            if (Plains.rand(2) == 0) { //OVI
                this.outputText("While exploring the plains you nearly trip over a discarded, hexagonal bottle.  ");
                this.inventory.takeItem(this.consumables.OVIELIX, this.camp.returnToCampUseOneHour);
            }
            else { //FIND KANGAAA
                this.outputText("While exploring the plains you come across a strange-looking plant.  As you peer at it, you realize it has some fruit you can get at.  ");
                this.inventory.takeItem(this.consumables.KANGAFT, this.camp.returnToCampUseOneHour);
            }
        }
    }
    exports.Plains = Plains;
});
//# sourceMappingURL=Plains.js.map