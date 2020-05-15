import { BaseContent } from "../../BaseContent";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { BunnyGirl } from "./Plains/BunnyGirl";
import { GnollScene } from "./Plains/GnollScene";
import { GnollSpearThrowerScene } from "./Plains/GnollSpearThrowerScene";
import { SatyrScene } from "./Plains/SatyrScene";

/**
 * Created by aimozg on 06.01.14.
 */

export class Plains extends BaseContent {
    public bunnyGirl: BunnyGirl = new BunnyGirl();
    public gnollScene: GnollScene = new GnollScene();
    public gnollSpearThrowerScene: GnollSpearThrowerScene = new GnollSpearThrowerScene();
    public satyrScene: SatyrScene = new SatyrScene();

    public explorePlains(): void {
        this.outx("", true);
        this.flags[kFLAGS.TIMES_EXPLORED_PLAINS]++;
        // Dem Kangasluts!  Force Sheila relationship phase!
        if (
            this.flags[kFLAGS.SHEILA_DEMON] == 0 &&
            this.flags[kFLAGS.SHEILA_XP] == 3 &&
            this.model.time.hours == 20 &&
            this.flags[kFLAGS.SHEILA_CLOCK] >= 0
        ) {
            kGAMECLASS.sheilaScene.sheilaXPThreeSexyTime();
            return;
        }
        // Add some holiday cheer
        if (
            this.isHolidays() &&
            this.date.fullYear > this.flags[kFLAGS.CANDY_CANE_YEAR_MET] &&
            Plains.rand(5) == 0
        ) {
            kGAMECLASS.candyCaneTrapDiscovery();
            return;
        }
        if (
            this.isHolidays() &&
            this.date.fullYear > this.flags[kFLAGS.POLAR_PETE_YEAR_MET] &&
            Plains.rand(4) == 0 &&
            this.silly()
        ) {
            kGAMECLASS.polarPete();
            this.flags[kFLAGS.POLAR_PETE_YEAR_MET] = this.date.fullYear;
            return;
        }
        // Helia monogamy fucks
        if (
            this.flags[kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 &&
            this.flags[kFLAGS.HEL_RAPED_TODAY] == 0 &&
            Plains.rand(10) == 0 &&
            this.player.gender > 0 &&
            !kGAMECLASS.helScene.followerHel()
        ) {
            kGAMECLASS.helScene.helSexualAmbush();
            return;
        }
        // Find Niamh
        if (this.flags[kFLAGS.NIAMH_MOVED_OUT_COUNTER] == 1) {
            kGAMECLASS.telAdre.niamh.niamhPostTelAdreMoveOut();
            return;
        }
        // Find Owca
        if (
            this.player.level >= 8 &&
            this.flags[kFLAGS.TIMES_EXPLORED_PLAINS] % 25 == 0 &&
            this.flags[kFLAGS.OWCA_UNLOCKED] == 0
        ) {
            kGAMECLASS.owca.gangbangVillageStuff();
            return;
        }
        // Bazaar!
        if (
            this.flags[kFLAGS.TIMES_EXPLORED_PLAINS] % 10 == 0 &&
            this.flags[kFLAGS.BAZAAR_ENTERED] == 0
        ) {
            kGAMECLASS.bazaar.findBazaar();
            return;
        }
        // Chance of threesomes!
        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00256] != 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00257] != 0 &&
            this.flags[kFLAGS.HEL_FUCKBUDDY] == 1 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00260] == 0 &&
            !kGAMECLASS.isabellaFollowerScene.isabellaFollower() &&
            this.flags[kFLAGS.TIMES_EXPLORED_PLAINS] % 21 == 0 &&
            !(this.player.tallness > 78 && this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00258] == 0)
        ) {
            // Hell/Izzy threesome intro
            if (this.flags[kFLAGS.HEL_ISABELLA_THREESOME_ENABLED] == 0) {
                kGAMECLASS.helScene.salamanderXIsabellaPlainsIntro();
                return;
            }
            // Propah threesomes here!
            else if (this.flags[kFLAGS.HEL_ISABELLA_THREESOME_ENABLED] == 1) {
                kGAMECLASS.helScene.isabellaXHelThreeSomePlainsStart();
                return;
            }
        }

        const choices: any[] = [
            this.plainsLoot,
            this.plainsLoot,
            this.gnollSpearThrowerScene.gnoll2Encounter,
            this.gnollScene.gnollEncounter,
            this.bunnyGirl.bunnbunbunMeet,
            this.bunnyGirl.bunnbunbunMeet,
        ];

        if (this.flags[kFLAGS.ISABELLA_PLAINS_DISABLED] == 0) {
            choices[choices.length] = kGAMECLASS.isabellaScene.isabellaGreeting;
            choices[choices.length] = kGAMECLASS.isabellaScene.isabellaGreeting;
        }
        if (!kGAMECLASS.helScene.followerHel()) {
            choices[choices.length] = kGAMECLASS.helScene.encounterAJerkInThePlains;
            choices[choices.length] = kGAMECLASS.helScene.encounterAJerkInThePlains;
        }
        choices[choices.length] = this.satyrScene.satyrEncounter;
        choices[choices.length] = this.satyrScene.satyrEncounter;
        if (this.flags[kFLAGS.SHEILA_DISABLED] == 0 && this.flags[kFLAGS.SHEILA_CLOCK] >= 0) {
            // Aparently Sheila was supposed to be disabled after certain events - now fixed
            choices[choices.length] = kGAMECLASS.sheilaScene.sheilaEncounterRouter;
            choices[choices.length] = kGAMECLASS.sheilaScene.sheilaEncounterRouter;
        }
        // Pick one
        choices[Plains.rand(choices.length)]();
    }

    private plainsLoot(): void {
        if (Plains.rand(2) == 0) {
            // OVI
            this.outx(
                "While exploring the plains you nearly trip over a discarded, hexagonal bottle.  "
            );
            this.inventory.takeItem(this.consumables.OVIELIX, this.camp.returnToCampUseOneHour);
        } else {
            // FIND KANGAAA
            this.outx(
                "While exploring the plains you come across a strange-looking plant.  As you peer at it, you realize it has some fruit you can get at.  "
            );
            this.inventory.takeItem(this.consumables.KANGAFT, this.camp.returnToCampUseOneHour);
        }
    }
}
