import { NPCAwareContent } from "./NPCs/NPCAwareContent";
import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";
import { ItemType } from "../ItemType";
import { StatusAffects } from "../StatusAffects";
import { kFLAGS } from "../GlobalFlags/kFLAGS";
import { PerkLib } from "../PerkLib";
import { trace } from "../../console";
import { PregnancyStore } from "../PregnancyStore";
import { MainView } from "../../view/MainView";

export class Camp extends NPCAwareContent {
    protected get timeQ() {
        return kGAMECLASS.timeQ;
    }

    protected set timeQ(value: number) {
        kGAMECLASS.timeQ = value;
    }

    private get campQ(): boolean {
        return kGAMECLASS.campQ;
    }
    private set campQ(value: boolean) {
        kGAMECLASS.campQ = value;
    }

    protected hasItemInStorage(itype: ItemType): boolean {
        return kGAMECLASS.inventory.hasItemInStorage(itype);
    }
    /*
            protected  hasItemsInStorage(): boolean
            {
                return kGAMECLASS.inventory.hasItemsInStorage();
            }
            protected  hasItemsInRacks(armor: boolean = false): boolean
            {
                return kGAMECLASS.inventory.hasItemsInRacks(armor);
            }
    */

    public constructor(campInitialize: any) {
        super();
        campInitialize(this.doCamp); // Pass the doCamp function up to CoC. This way doCamp is private but the CoC class itself can call it.
    }

    /* Replaced with calls to playerMenu
            public  campMenu(): void {
                kGAMECLASS.eventParser(1);
            }
    */

    public returnToCamp(timeUsed: number): void {
        this.clearOutput();
        if (timeUsed == 1) this.outx("An hour passes...\n");
        else this.outx(`${Camp.Num2Text(timeUsed)} hours pass...\n`);
        if (!this.getGame().inCombat) this.spriteSelect(-1);
        this.hideMenus();
        this.timeQ = timeUsed;
        this.goNext(timeUsed, false);
    }

    public returnToCampUseOneHour(): void {
        this.returnToCamp(1);
    } // Replacement for event number 13;

    public returnToCampUseTwoHours(): void {
        this.returnToCamp(2);
    } // Replacement for event number 14;

    public returnToCampUseFourHours(): void {
        this.returnToCamp(4);
    } // Replacement for event number 15;

    public returnToCampUseEightHours(): void {
        this.returnToCamp(8);
    } // Replacement for event number 16;

    //  SLEEP_WITH: number = 701;

    private doCamp(): void {
        // Only called by playerMenu
        // trace("Current fertility: " + player.totalFertility());
        this.mainView.showMenuButton(MainView.MENU_NEW_MAIN);
        if (this.player.findStatusAffect(StatusAffects.PostAkbalSubmission) >= 0) {
            this.player.removeStatusAffect(StatusAffects.PostAkbalSubmission);
            kGAMECLASS.forest.akbalScene.akbalSubmissionFollowup();
            return;
        }
        if (this.player.findStatusAffect(StatusAffects.PostAnemoneBeatdown) >= 0) {
            this.HPChange(Math.round(this.player.maxHP() / 2), false);
            this.player.removeStatusAffect(StatusAffects.PostAnemoneBeatdown);
        }
        // make sure gameState is cleared if coming from combat or giacomo
        this.getGame().inCombat = false;
        /* Can't happen - playerMenu will call dungeon appropriate menu instead of doCamp while inDungeon is true
            if (kGAMECLASS.inDungeon) {
                mainView.showMenuButton( MainView.MENU_DATA );
                mainView.showMenuButton( MainView.MENU_APPEARANCE );
                kGAMECLASS.playerMenu();
                return;
            }
        */
        // Clear out Izma's saved loot status
        this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = "";
        // History perk backup
        if (this.flags[kFLAGS.HISTORY_PERK_SELECTED] == 0) {
            this.flags[kFLAGS.HISTORY_PERK_SELECTED] = 2;
            this.hideMenus();
            this.getGame().charCreation.chooseHistory();
            //
            // fixHistory();
            return;
        }
        if (!this.marbleScene.marbleFollower()) {
            if (this.flags[kFLAGS.MARBLE_LEFT_OVER_CORRUPTION] == 1 && this.player.cor <= 40) {
                this.hideMenus();
                this.marblePurification.pureMarbleDecidesToBeLessOfABitch();
                return;
            }
        }
        if (this.marbleScene.marbleFollower()) {
            // Cor < 50
            // No corrupt: Jojo, Amily, or Vapula
            // Purifying Murble
            if (
                this.player.cor < 50 &&
                !this.campCorruptJojo() &&
                !this.amilyScene.amilyCorrupt() &&
                !this.vapulaSlave() &&
                this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] == 0 &&
                this.flags[kFLAGS.MARBLE_COUNTUP_TO_PURIFYING] >= 200 &&
                this.player.findPerk(PerkLib.MarblesMilk) < 0
            ) {
                this.hideMenus();
                this.marblePurification.BLUHBLUH();
                return;
            }
            if (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] >= 5) {
                if (
                    this.flags[kFLAGS.MARBLE_WARNED_ABOUT_CORRUPTION] == 0 &&
                    this.player.cor >= 50
                ) {
                    this.hideMenus();
                    this.marblePurification.marbleWarnsPCAboutCorruption();
                    return;
                }
                if (
                    this.flags[kFLAGS.MARBLE_WARNED_ABOUT_CORRUPTION] == 1 &&
                    this.flags[kFLAGS.MARBLE_LEFT_OVER_CORRUPTION] == 0 &&
                    this.player.cor >= 60
                ) {
                    this.hideMenus();
                    this.marblePurification.marbleLeavesThePCOverCorruption();
                    return;
                }
            }
            if (
                this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_1] == 1 &&
                (this.time.hours == 6 || this.time.hours == 7)
            ) {
                this.hideMenus();
                this.marblePurification.rathazulsMurbelReport();
                return;
            }
            if (this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_2] == 1) {
                this.hideMenus();
                this.marblePurification.claraShowsUpInCampBECAUSESHESACUNT();
                return;
            }
        }
        if (this.arianFollower() && this.flags[kFLAGS.ARIAN_MORNING] == 1) {
            this.hideMenus();
            this.arianScene.wakeUpAfterArianSleep();
            return;
        }
        if (this.arianFollower() && this.flags[kFLAGS.ARIAN_EGG_EVENT] >= 30) {
            this.hideMenus();
            this.arianScene.arianEggingEvent();
            return;
        }
        if (
            this.arianFollower() &&
            this.flags[kFLAGS.ARIAN_EGG_COUNTER] >= 24 &&
            this.flags[kFLAGS.ARIAN_VAGINA] > 0
        ) {
            this.hideMenus();
            this.arianScene.arianLaysEggs();
            return;
        }
        if (this.flags[kFLAGS.JACK_FROST_PROGRESS] > 0) {
            this.hideMenus();
            kGAMECLASS.processJackFrostEvent();
            return;
        }
        if (
            this.player.hasKeyItem("Super Reducto") < 0 &&
            this.milkSlave() &&
            this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0 &&
            this.player.statusAffectv2(StatusAffects.MetRathazul) >= 4
        ) {
            this.hideMenus();
            this.milkWaifu.ratducto();
            return;
        }
        if (kGAMECLASS.nieveHoliday() && this.model.time.hours == 6) {
            if (
                this.player.hasKeyItem("Nieve's Tear") >= 0 &&
                this.flags[kFLAGS.NIEVE_STAGE] != 5
            ) {
                kGAMECLASS.returnOfNieve();
                this.hideMenus();
                return;
            } else if (this.flags[kFLAGS.NIEVE_STAGE] == 0) {
                this.hideMenus();
                kGAMECLASS.snowLadyActive();
                return;
            } else if (this.flags[kFLAGS.NIEVE_STAGE] == 4) {
                this.hideMenus();
                kGAMECLASS.nieveComesToLife();
                return;
            }
        }
        if (kGAMECLASS.helScene.followerHel()) {
            if (
                this.helFollower.isHeliaBirthday() &&
                this.flags[kFLAGS.HEL_FOLLOWER_LEVEL] >= 2 &&
                this.flags[kFLAGS.HELIA_BIRTHDAY_OFFERED] == 0
            ) {
                this.hideMenus();
                this.helFollower.heliasBirthday();
                return;
            }
            if (kGAMECLASS.helScene.pregnancy.isPregnant) {
                switch (kGAMECLASS.helScene.pregnancy.eventTriggered()) {
                    case 2:
                        this.hideMenus();
                        this.helSpawnScene.bulgyCampNotice();
                        return;
                    case 3:
                        this.hideMenus();
                        this.helSpawnScene.heliaSwollenNotice();
                        return;
                    case 4:
                        this.hideMenus();
                        this.helSpawnScene.heliaGravidity();
                        return;
                    default:
                        if (
                            kGAMECLASS.helScene.pregnancy.incubation == 0 &&
                            (this.model.time.hours == 6 || this.model.time.hours == 7)
                        ) {
                            this.hideMenus();
                            this.helSpawnScene.heliaBirthtime();
                            return;
                        }
                }
            }
        }
        if (
            this.flags[kFLAGS.HELSPAWN_AGE] == 1 &&
            this.flags[kFLAGS.HELSPAWN_GROWUP_COUNTER] == 7
        ) {
            this.hideMenus();
            this.helSpawnScene.helSpawnGraduation();
            return;
        }
        if (
            this.model.time.hours >= 10 &&
            this.model.time.hours <= 18 &&
            (this.model.time.days % 20 == 0 || this.model.time.hours == 12) &&
            this.flags[kFLAGS.HELSPAWN_DADDY] == 2 &&
            this.helSpawnScene.helspawnFollower()
        ) {
            this.hideMenus();
            this.helSpawnScene.maiVisitsHerKids();
            return;
        }
        if (
            this.model.time.hours == 6 &&
            this.flags[kFLAGS.HELSPAWN_DADDY] == 1 &&
            this.model.time.days % 30 == 0 &&
            this.flags[kFLAGS.SPIDER_BRO_GIFT] == 0 &&
            this.helSpawnScene.helspawnFollower()
        ) {
            this.hideMenus();
            this.helSpawnScene.spiderBrosGift();
            return;
        }
        if (
            this.model.time.hours >= 10 &&
            this.model.time.hours <= 18 &&
            (this.model.time.days % 15 == 0 || this.model.time.hours == 12) &&
            this.helSpawnScene.helspawnFollower() &&
            this.flags[kFLAGS.HAKON_AND_KIRI_VISIT] == 0
        ) {
            this.hideMenus();
            this.helSpawnScene.hakonAndKiriComeVisit();
            return;
        }
        if (
            this.flags[kFLAGS.HELSPAWN_AGE] == 2 &&
            this.flags[kFLAGS.HELSPAWN_DISCOVER_BOOZE] == 0 &&
            (Camp.rand(10) == 0 || this.flags[kFLAGS.HELSPAWN_GROWUP_COUNTER] == 6)
        ) {
            this.hideMenus();
            this.helSpawnScene.helspawnDiscoversBooze();
            return;
        }
        if (
            this.flags[kFLAGS.HELSPAWN_AGE] == 2 &&
            this.flags[kFLAGS.HELSPAWN_WEAPON] == "" &&
            this.flags[kFLAGS.HELSPAWN_GROWUP_COUNTER] == 3 &&
            this.model.time.hours >= 10 &&
            this.model.time.hours <= 18
        ) {
            this.hideMenus();
            this.helSpawnScene.helSpawnChoosesAFightingStyle();
            return;
        }
        if (
            this.flags[kFLAGS.HELSPAWN_AGE] == 2 &&
            (this.model.time.hours == 6 || this.model.time.hours == 7) &&
            this.flags[kFLAGS.HELSPAWN_GROWUP_COUNTER] == 7 &&
            this.flags[kFLAGS.HELSPAWN_FUCK_INTERRUPTUS] == 1
        ) {
            this.helSpawnScene.helspawnAllGrownUp();
            return;
        }
        if (
            (this.sophieFollower() || this.bimboSophie()) &&
            this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] == 1
        ) {
            this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] = 0;
            this.sophieBimbo.sophieKidMaturation();
            this.hideMenus();
            return;
        }
        // Bimbo Sophie Move In Request!
        if (
            this.bimboSophie() &&
            this.flags[kFLAGS.SOPHIE_BROACHED_SLEEP_WITH] == 0 &&
            this.sophieScene.pregnancy.event >= 2
        ) {
            this.hideMenus();
            this.sophieBimbo.sophieMoveInAttempt();
            return;
        }
        if (
            !kGAMECLASS.nieveHoliday() &&
            this.model.time.hours == 6 &&
            this.flags[kFLAGS.NIEVE_STAGE] > 0
        ) {
            kGAMECLASS.nieveIsOver();
            return;
        }
        // Amily followup!
        if (this.flags[kFLAGS.PC_PENDING_PREGGERS] == 1) {
            kGAMECLASS.amilyScene.postBirthingEndChoices();
            this.flags[kFLAGS.PC_PENDING_PREGGERS] = 2;
            return;
        }
        if (this.timeQ > 0) {
            if (!this.campQ) {
                this.outx("More time passes...\n", true);
                this.goNext(this.timeQ, false);
                return;
            } else {
                if (this.model.time.hours < 6 || this.model.time.hours > 20) {
                    this.doSleep();
                } else {
                    this.rest();
                }
                return;
            }
        }
        if (
            this.flags[kFLAGS.FUCK_FLOWER_KILLED] == 0 &&
            this.flags[kFLAGS.CORRUPT_MARAE_FOLLOWUP_ENCOUNTER_STATE] > 0
        ) {
            if (
                this.flags[kFLAGS.FUCK_FLOWER_LEVEL] == 0 &&
                this.flags[kFLAGS.FUCK_FLOWER_GROWTH_COUNTER] >= 8
            ) {
                this.holliScene.getASprout();
                this.hideMenus();
                return;
            }
            if (
                this.flags[kFLAGS.FUCK_FLOWER_LEVEL] == 1 &&
                this.flags[kFLAGS.FUCK_FLOWER_GROWTH_COUNTER] >= 7
            ) {
                this.holliScene.fuckPlantGrowsToLevel2();
                this.hideMenus();
                return;
            }
            if (
                this.flags[kFLAGS.FUCK_FLOWER_LEVEL] == 2 &&
                this.flags[kFLAGS.FUCK_FLOWER_GROWTH_COUNTER] >= 25
            ) {
                this.holliScene.flowerGrowsToP3();
                this.hideMenus();
                return;
            }
            // Level 4 growth
            if (
                this.flags[kFLAGS.FUCK_FLOWER_LEVEL] == 3 &&
                this.flags[kFLAGS.FUCK_FLOWER_GROWTH_COUNTER] >= 40
            ) {
                this.holliScene.treePhaseFourGo();
                this.hideMenus();
                return;
            }
        }
        // Jojo treeflips!
        if (
            this.flags[kFLAGS.FUCK_FLOWER_LEVEL] >= 4 &&
            this.flags[kFLAGS.FUCK_FLOWER_KILLED] == 0 &&
            this.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0
        ) {
            this.holliScene.JojoTransformAndRollOut();
            this.hideMenus();
            return;
        }
        // Amily flips out
        if (
            this.amilyScene.amilyFollower() &&
            !this.amilyScene.amilyCorrupt() &&
            this.flags[kFLAGS.FUCK_FLOWER_LEVEL] >= 4 &&
            this.flags[kFLAGS.FUCK_FLOWER_KILLED] == 0
        ) {
            this.holliScene.amilyHatesTreeFucking();
            this.hideMenus();
            return;
        }
        if (
            this.flags[kFLAGS.FUCK_FLOWER_KILLED] == 1 &&
            this.flags[kFLAGS.AMILY_TREE_FLIPOUT] == 1 &&
            !this.amilyScene.amilyFollower() &&
            this.flags[kFLAGS.AMILY_VISITING_URTA] == 0
        ) {
            this.holliScene.amilyComesBack();
            this.flags[kFLAGS.AMILY_TREE_FLIPOUT] = 2;
            this.hideMenus();
            return;
        }
        // Anemone birth followup!
        if (this.player.findStatusAffect(StatusAffects.CampAnemoneTrigger) >= 0) {
            this.player.removeStatusAffect(StatusAffects.CampAnemoneTrigger);
            this.anemoneScene.anemoneKidBirthPtII();
            this.hideMenus();
            return;
        }
        // Exgartuan clearing
        if (
            this.player.statusAffectv1(StatusAffects.Exgartuan) == 1 &&
            (this.player.cockArea(0) < 100 || this.player.cocks.length == 0)
        ) {
            this.exgartuanCampUpdate();
            return;
        } else if (
            this.player.statusAffectv1(StatusAffects.Exgartuan) == 2 &&
            this.player.biggestTitSize() < 12
        ) {
            this.exgartuanCampUpdate();
            return;
        }
        // Izzys tits asplode
        if (
            this.isabellaFollower() &&
            this.flags[kFLAGS.ISABELLA_MILKED_YET] >= 10 &&
            this.player.hasKeyItem("Breast Milker - Installed At Whitney's Farm") >= 0
        ) {
            this.isabellaFollowerScene.milktasticLacticLactation();
            this.hideMenus();
            return;
        }
        // Marble meets follower izzy when moving in
        if (
            this.flags[kFLAGS.ISABELLA_MURBLE_BLEH] == 1 &&
            this.isabellaFollower() &&
            this.player.findStatusAffect(StatusAffects.CampMarble) >= 0
        ) {
            this.isabellaFollowerScene.angryMurble();
            this.hideMenus();
            return;
        }
        // Cotton preg freakout
        if (
            this.player.pregnancyIncubation <= 280 &&
            this.player.pregnancyType == PregnancyStore.PREGNANCY_COTTON &&
            this.flags[kFLAGS.COTTON_KNOCKED_UP_PC_AND_TALK_HAPPENED] == 0 &&
            (this.model.time.hours == 6 || this.model.time.hours == 7)
        ) {
            kGAMECLASS.telAdre.cotton.goTellCottonShesAMomDad();
            this.hideMenus();
            return;
        }
        // Bimbo Sophie finds ovi elixer in chest!
        if (
            this.bimboSophie() &&
            this.hasItemInStorage(this.consumables.OVIELIX) &&
            Camp.rand(5) == 0 &&
            this.flags[kFLAGS.TIMES_SOPHIE_HAS_DRUNK_OVI_ELIXIR] == 0 &&
            this.player.gender > 0
        ) {
            this.sophieBimbo.sophieEggApocalypse();
            this.hideMenus();
            return;
        }
        // Amily + Urta freakout!
        if (
            !kGAMECLASS.urtaQuest.urtaBusy() &&
            this.flags[kFLAGS.AMILY_VISITING_URTA] == 0 &&
            Camp.rand(10) == 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] >= 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00147] == 0 &&
            this.flags[kFLAGS.AMILY_NEED_TO_FREAK_ABOUT_URTA] == 1 &&
            this.amilyScene.amilyFollower() &&
            this.flags[kFLAGS.AMILY_FOLLOWER] == 1 &&
            !this.amilyScene.pregnancy.isPregnant
        ) {
            this.finter.amilyUrtaReaction();
            this.hideMenus();
            return;
        }
        // Find jojo's note!
        if (
            this.flags[kFLAGS.JOJO_FIXED_STATUS] == 1 &&
            this.flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] == 0
        ) {
            this.finter.findJojosNote();
            this.hideMenus();
            return;
        }
        // Rathazul freaks out about jojo
        if (
            this.flags[kFLAGS.RATHAZUL_CORRUPT_JOJO_FREAKOUT] == 0 &&
            Camp.rand(5) == 0 &&
            this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0 &&
            this.campCorruptJojo()
        ) {
            this.finter.rathazulFreaksOverJojo();
            this.hideMenus();
            return;
        }
        // Izma/Marble freakout - marble moves in
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00237] == 1) {
            this.izmaScene.newMarbleMeetsIzma();
            this.hideMenus();
            return;
        }
        // Izma/Amily freakout - Amily moves in
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00236] == 1) {
            this.izmaScene.newAmilyMeetsIzma();
            this.hideMenus();
            return;
        }
        // Amily/Marble Freakout
        if (
            this.flags[kFLAGS.AMILY_NOT_FREAKED_OUT] == 0 &&
            this.player.findStatusAffect(StatusAffects.CampMarble) >= 0 &&
            this.flags[kFLAGS.AMILY_FOLLOWER] == 1 &&
            this.amilyScene.amilyFollower() &&
            this.marbleScene.marbleAtCamp()
        ) {
            this.finter.marbleVsAmilyFreakout();
            this.hideMenus();
            return;
        }
        // Amily and/or Jojo freakout about Vapula!!
        if (
            this.vapulaSlave() &&
            (this.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0 ||
                (this.amilyScene.amilyFollower() && !this.amilyScene.amilyCorrupt()))
        ) {
            // Jojo but not Amily
            if (
                this.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0 &&
                !(this.amilyScene.amilyFollower() && !this.amilyScene.amilyCorrupt())
            )
                this.vapula.mouseWaifuFreakout(false, true);
            // Amily but not Jojo
            else if (this.amilyScene.amilyFollower() && !this.amilyScene.amilyCorrupt())
                this.vapula.mouseWaifuFreakout(true, false);
            // Both
            else this.vapula.mouseWaifuFreakout(true, true);
            this.hideMenus();
            return;
        }
        // Go through Helia's first time move in interactions if  you haven't yet.
        if (
            this.flags[kFLAGS.HEL_FOLLOWER_LEVEL] == 2 &&
            kGAMECLASS.helScene.followerHel() &&
            this.flags[kFLAGS.HEL_INTROS_LEVEL] == 0
        ) {
            this.helFollower.helFollowersIntro();
            this.hideMenus();
            return;
        }
        // If you've gone through Hel's first time actions and Issy moves in without being okay with threesomes.
        if (
            this.flags[kFLAGS.HEL_INTROS_LEVEL] > 9000 &&
            kGAMECLASS.helScene.followerHel() &&
            this.isabellaFollower() &&
            this.flags[kFLAGS.HEL_ISABELLA_THREESOME_ENABLED] == 0
        ) {
            this.helFollower.angryHelAndIzzyCampHelHereFirst();
            this.hideMenus();
            return;
        }
        // Reset.
        this.flags[kFLAGS.CAME_WORMS_AFTER_COMBAT] = 0;
        this.campQ = false;
        // Build explore menus
        let placesEvent = this.placesKnown() ? this.places : undefined;
        let followers;
        let lovers;
        let slaves;
        let storage;
        if (this.inventory.showStash()) storage = this.inventory.stash;
        // Clear stuff
        if (this.player.findStatusAffect(StatusAffects.SlimeCravingOutput) >= 0)
            this.player.removeStatusAffect(StatusAffects.SlimeCravingOutput);
        // Reset luststick display status (see event parser)
        this.flags[kFLAGS.PC_CURRENTLY_LUSTSTICK_AFFECTED] = 0;
        // Display Proper Buttons
        this.mainView.showMenuButton(MainView.MENU_APPEARANCE);
        this.mainView.showMenuButton(MainView.MENU_PERKS);
        this.mainView.showMenuButton(MainView.MENU_STATS);
        this.mainView.showMenuButton(MainView.MENU_DATA);
        this.showStats();
        // Change settings of new game buttons to go to main menu
        this.mainView.setMenuButton(MainView.MENU_NEW_MAIN, "Main Menu", kGAMECLASS.mainMenu);

        // clear up/down arrows
        this.hideUpDown();
        // Level junk
        if (this.player.XP >= this.player.level * 100 || this.player.perkPoints > 0) {
            if (this.player.XP < this.player.level * 100)
                this.mainView.setMenuButton(MainView.MENU_LEVEL, "Perk Up");
            else this.mainView.setMenuButton(MainView.MENU_LEVEL, "Level Up");
            this.mainView.showMenuButton(MainView.MENU_LEVEL);
            this.mainView.statsView.showLevelUp();
        } else {
            this.mainView.hideMenuButton(MainView.MENU_LEVEL);
            this.mainView.statsView.hideLevelUp();
        }
        // Build main menu
        let exploreEvent: (() => void) | undefined = this.getGame().exploration.doExplore;
        const masturbate =
            this.player.lust > 30 ? this.getGame().masturbation.masturbateMenu : undefined;
        this.clearOutput();

        this.outx(this.images.showImage("camping"), false);
        // Isabella upgrades camp level!

        if (this.isabellaFollower()) {
            this.outx(
                "Your campsite got a lot more comfortable once Isabella moved in.  Carpets cover up much of the barren ground, simple awnings tied to the rocks provide shade, and hand-made wooden furniture provides comfortable places to sit and sleep.",
                false
            );
            if (this.model.time.days >= 20)
                this.outx(
                    "  You've even managed to carve some artwork into the rocks around the camp's perimeter.",
                    false
                );
        }
        // Live in-ness
        else {
            if (this.model.time.days < 10)
                this.outx(
                    "Your campsite is fairly simple at the moment.  Your tent and bedroll are set in front of the rocks that lead to the portal.  You have a small fire pit as well.",
                    false
                );
            else if (this.model.time.days < 20)
                this.outx(
                    "Your campsite is starting to get a very 'lived-in' look.  The fire-pit is well defined with some rocks you've arranged around it, and your bedroll and tent have been set up in the area most sheltered by rocks.",
                    false
                );
            else
                this.outx(
                    "Your new home is as comfy as a camp site can be.  The fire-pit and tent are both set up perfectly, and in good repair, and you've even managed to carve some artwork into the rocks around the camp's perimeter.",
                    false
                );
        }
        if (this.flags[kFLAGS.CLARA_IMPRISONED] > 0) {
            this.marblePurification.claraCampAddition();
        }
        // Nursery
        if (
            this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION] == 100 &&
            this.player.findStatusAffect(StatusAffects.CampMarble) >= 0
        ) {
            this.outx(
                "  Marble has built a fairly secure nursery amongst the rocks to house your ",
                false
            );
            if (this.flags[kFLAGS.MARBLE_KIDS] == 0) this.outx("future children");
            else {
                this.outx(`${Camp.num2Text(this.flags[kFLAGS.MARBLE_KIDS])} child`);
                if (this.flags[kFLAGS.MARBLE_KIDS] > 1) this.outx("ren");
            }
            this.outx(".");
        }
        // HARPY ROOKERY
        if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] > 0) {
            // Rookery Descriptions (Short)
            // Small (1 mature daughter)
            if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 1) {
                this.outx(
                    "  There's a smallish harpy nest that your daughter has built up with rocks piled high near the fringes of your camp.  It's kind of pathetic, but she seems proud of her accomplishment."
                );
            }
            // Medium (2-3 mature daughters)
            else if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] <= 3) {
                this.outx(
                    "  There's a growing pile of stones built up at the fringes of your camp.  It's big enough to be considered a small hill by this point, dotted with a couple small harpy nests just barely big enough for two."
                );
            }
            // Big (4 mature daughters)
            else if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] <= 4) {
                this.outx(
                    "  The harpy rookery at the edge of camp has gotten pretty big.  It's taller than most of the standing stones that surround the portal, and there's more nests than harpies at this point.  Every now and then you see the four of them managing a boulder they dragged in from somewhere to add to it."
                );
            }
            // Large (5-10 mature daughters)
            else if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] <= 10) {
                this.outx(
                    "  The rookery has gotten quite large.  It stands nearly two stories tall at this point, dotted with nests and hollowed out places in the center.  It's surrounded by the many feathers the assembled harpies leave behind."
                );
            }
            // Giant (11-20 mature daughters)
            else if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] <= 20) {
                this.outx(
                    "  A towering harpy rookery has risen up at the fringes of your camp, filled with all of your harpy brood.  It's at least three stories tall at this point, and it has actually begun to resemble a secure structure.  These harpies are always rebuilding and adding onto it."
                );
            }
            // Massive (31-50 mature daughters)
            else if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] <= 50) {
                this.outx(
                    "  A massive harpy rookery towers over the edges of your camp.  It's almost entirely built out of stones that are fit seamlessly into each other, with many ledges and overhangs for nests.  There's a constant hum of activity over there day or night."
                );
            }
            // Immense (51+ Mature daughters)
            else {
                this.outx(
                    "  An immense harpy rookery dominates the edge of your camp, towering over the rest of it.  Innumerable harpies flit around it, always working on it, assisted from below by the few sisters unlucky enough to be flightless."
                );
            }
        }
        // Traps
        if (this.player.findStatusAffect(StatusAffects.DefenseCanopy) >= 0) {
            this.outx(
                "  A thorny tree has sprouted near the center of the camp, growing a protective canopy of spiky vines around the portal and your camp.",
                false
            );
        } else
            this.outx(
                "  You have a number of traps surrounding your makeshift home, but they are fairly simple and may not do much to deter a demon.",
                false
            );
        this.outx(
            "  The portal shimmers in the background as it always does, looking menacing and reminding you of why you came.\n\n",
            false
        );

        // Ember's anti-minotaur crusade!
        if (this.flags[kFLAGS.EMBER_CURRENTLY_FREAKING_ABOUT_MINOCUM] == 1) {
            // Modified Camp Description
            this.outx(
                `Since Ember began ${this.emberMF(
                    "his",
                    "her"
                )} 'crusade' against the minotaur population, skulls have begun to pile up on either side of the entrance to ${this.emberScene.emberMF(
                    "his",
                    "her"
                )} den.  There're quite a lot of them.\n\n`
            );
        }
        // Dat tree!
        if (
            this.flags[kFLAGS.FUCK_FLOWER_LEVEL] >= 4 &&
            this.flags[kFLAGS.FUCK_FLOWER_KILLED] == 0
        ) {
            this.outx(
                "On the outer edges, half-hidden behind a rock, is a large, very healthy tree.  It grew fairly fast, but seems to be fully developed now.  Holli, Marae's corrupt spawn, lives within.\n\n"
            );
        }
        if (this.flags[kFLAGS.CLARA_IMPRISONED] > 0) {
            // claraCampAddition();
        }
        // BIMBO SOPHAH
        if (this.bimboSophie() && this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0)
            this.sophieBimbo.sophieCampLines();
        if (this.player.findStatusAffect(StatusAffects.CampMarble) >= 0) {
            this.temp = Camp.rand(5);
            this.outx(
                "A second bedroll rests next to yours; a large two-handed hammer sometimes rests against it, depending on whether or not its owner needs it at the time.  ",
                false
            );
            // Marble is out!
            if (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] == 4)
                this.outx("Marble isn’t here right now; she’s still off to see her family.");
            // requires at least 1 kid, time is just before sunset, this scene always happens at this time if the PC has at least one kid.
            else if (
                this.flags[kFLAGS.MARBLE_KIDS] >= 1 &&
                (this.model.time.hours == 19 || this.model.time.hours == 20)
            ) {
                this.outx("Marble herself is currently in the nursery, putting your ");
                if (this.flags[kFLAGS.MARBLE_KIDS] == 1) this.outx("child");
                else this.outx("children");
                this.outx(" to bed.");
            }
            // at 6-7 in the morning, scene always displays at this time
            else if (this.model.time.hours == 6 || this.model.time.hours == 7)
                this.outx(
                    "Marble is off in an open area to the side of your camp right now.  She is practicing with her large hammer, going through her daily training."
                );
            // after nightfall, scene always displays at this time unless PC is wormed
            else if (
                this.model.time.hours >= 21 &&
                this.player.findStatusAffect(StatusAffects.Infested) < 0
            ) {
                this.outx(
                    "Marble is hanging around her bedroll waiting for you to come to bed.  However, sometimes she lies down for a bit, and sometimes she paces next to it."
                );
                if (this.flags[kFLAGS.MARBLE_LUST] > 30)
                    this.outx("  She seems to be feeling antsy.");
            } else if (
                this.flags[kFLAGS.MARBLE_KIDS] > 0 &&
                this.model.time.hours < 19 &&
                this.model.time.hours > 7
            ) {
                // requires at least 6 kids, and no other parental characters in camp
                if (Camp.rand(2) == 0 && this.flags[kFLAGS.MARBLE_KIDS] > 5)
                    this.outx(
                        `Marble is currently tending to your kids, but she looks a bit stressed out right now.  It looks like ${Camp.num2Text(
                            this.flags[kFLAGS.MARBLE_KIDS]
                        )} might just be too many for her to handle on her own...`
                    );
                // requires at least 4 kids
                else if (Camp.rand(3) == 0 && this.flags[kFLAGS.MARBLE_KIDS] > 3)
                    this.outx(
                        "Marble herself is in the camp right now, telling a story about her travels around the world to her kids as they gather around her.  The children are completely enthralled by her words.  You can't help but smile."
                    );
                // Requires 2 boys
                else if (Camp.rand(3) == 0 && this.flags[kFLAGS.MARBLE_BOYS] > 1) {
                    this.outx(
                        "Marble herself is currently refereeing a wrestling match between two of your sons.  It seems like it's a contest to see which one of them gets to go for a ride between her breasts in a game of <i>Bull Blasters</i>, while the loser has to sit on her shoulders."
                    );
                }
                // requires at least 2 kids
                else if (
                    Camp.rand(3) == 0 &&
                    this.flags[kFLAGS.MARBLE_KIDS] - this.flags[kFLAGS.MARBLE_BOYS] > 1
                )
                    this.outx(
                        "Marble herself is involved in a play fight with two of your kids brandishing small sticks.  It seems that the <i>mommy monster</i> is terrorising the camp and needs to be stopped by the <i>Mighty Moo and her sidekick Bovine Lass</i>."
                    );
                else if (Camp.rand(3) == 0 && this.flags[kFLAGS.MARBLE_KIDS] > 1)
                    this.outx(
                        "Marble herself is out right now; she's taken her kids to go visit Whitney.  You're sure though that she'll be back within the hour, so you could just wait if you needed her."
                    );
                else {
                    // requires at least 1 kid
                    if (Camp.rand(2) == 0) {
                        this.outx("Marble herself is nursing ");
                        if (this.flags[kFLAGS.MARBLE_KIDS] > 1)
                            this.outx("one of your cow-girl children");
                        else this.outx("your cow-girl child");
                        this.outx(" with a content look on her face.");
                    } else {
                        this.outx("Marble herself is watching your kid");
                        if (this.flags[kFLAGS.MARBLE_KIDS] > 0) this.outx("s");
                        this.outx(" playing around the camp right now.");
                    }
                }
            }
            // (Choose one of these at random to display each hour)
            else if (this.temp == 0)
                this.outx(
                    "Marble herself has gone off to Whitney's farm to get milked right now.  You're sure she'd be back in moments if you needed her.",
                    false
                );
            else if (this.temp == 1)
                this.outx(
                    "Marble herself has gone off to Whitney's farm to do some chores right now.  You're sure she'd be back in moments if you needed her.",
                    false
                );
            else if (this.temp == 2)
                this.outx(
                    "Marble herself isn't at the camp right now; she is probably off getting supplies, though she'll be back soon enough.  You're sure she'd be back in moments if you needed her.",
                    false
                );
            else if (this.temp == 3) {
                this.outx("Marble herself is resting on her bedroll right now.");
            } else if (this.temp == 4) {
                this.outx("Marble herself is wandering around the camp right now.");
            }
            this.outx("\n\n", false);
        }
        // RATHAZUL
        // if rathazul has joined the camp
        if (this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0) {
            if (this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] <= 1) {
                this.outx(
                    "Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work with his chemicals, working on who knows what.",
                    false
                );
                if (this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] == 1)
                    this.outx(
                        "  Some kind of spider-silk-based equipment is hanging from a nearby rack.  <b>He's finished with the task you gave him!</b>",
                        false
                    );
                this.outx("\n\n", false);
            } else
                this.outx(
                    "Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work on the silken equipment you've commissioned him to craft.\n\n",
                    false
                );
        }
        // MOUSEBITCH
        if (this.amilyScene.amilyFollower() && this.flags[kFLAGS.AMILY_FOLLOWER] == 1) {
            if (this.flags[kFLAGS.FUCK_FLOWER_LEVEL] >= 4)
                this.outx(
                    "Amily has relocated her grass bedding to the opposite side of the camp from the strange tree; every now and then, she gives it a suspicious glance, as if deciding whether to move even further."
                );
            else
                this.outx(
                    "A surprisingly tidy nest of soft grasses and sweet-smelling herbs has been built close to your bedroll. A much-patched blanket draped neatly over the top is further proof that Amily sleeps here. She changes the bedding every few days, to ensure it stays as nice as possible.\n\n",
                    false
                );
        }
        // Corrupt mousebitch!
        else if (
            this.amilyScene.amilyFollower() &&
            this.flags[kFLAGS.AMILY_FOLLOWER] == 2 &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0
        ) {
            this.outx(
                "Sometimes you hear a faint moan from not too far away. No doubt the result of your slutty toy mouse playing with herself.\n\n",
                false
            );
        }
        // Amily out freaking Urta?
        else if (
            this.flags[kFLAGS.AMILY_VISITING_URTA] == 1 ||
            this.flags[kFLAGS.AMILY_VISITING_URTA] == 2
        ) {
            this.outx(
                "Amily's bed of grass and herbs lies empty, the mouse-woman still absent from her sojourn to meet your other lover.\n\n",
                false
            );
        }
        // JOJO
        // If Jojo is corrupted, add him to the masturbate menu.
        if (this.campCorruptJojo() && this.flags[kFLAGS.FOLLOWER_AT_FARM_JOJO] == 0)
            this.outx(
                "From time to time you can hear movement from around your camp, and you routinely find thick puddles of mouse semen.  You are sure Jojo is here if you ever need to sate yourself.\n\n",
                false
            );
        // Pure Jojo
        if (this.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0)
            this.outx(
                "There is a small bedroll for Jojo near your own, though the mouse is probably hanging around the camp's perimeter.\n\n",
                false
            );
        // Izma
        if (this.izmaFollower() && this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0) {
            this.outx(
                "Neatly laid near the base of your own is a worn bedroll belonging to Izma, your tigershark lover.  It's a snug fit for her toned body, though it has some noticeable cuts and tears in the fabric.  Close to her bed is her old trunk, almost as if she wants to have it at arms length if anyone tries to rob her in her sleep.  ",
                false
            );
            this.temp = Camp.rand(3);
            // Text 1} I
            if (this.temp == 0)
                this.outx(
                    "Izma's lazily sitting on the trunk beside her bedroll, reading one of the many books from inside it.  She smiles happily when your eyes linger on her, and you know full well she's only half-interested in it.",
                    false
                );
            // Text 2
            else if (this.temp == 1)
                this.outx(
                    "You notice Izma isn't around right now.  She's probably gone off to the nearby stream to get some water.  Never mind, she comes around from behind a rock, still dripping wet.",
                    false
                );
            // Text 3
            else
                this.outx(
                    "Izma is lying on her back near her bedroll.  You wonder at first just why she isn't using her bed, but as you look closer you notice all the water pooled beneath her and the few droplets running down her arm, evidence that she's just returned from the stream.",
                    false
                );
            this.outx("\n\n", false);
        }
        // ►[Added Campsite Description]
        if (kGAMECLASS.desert.antsScene.phyllaWaifu()) {
            this.outx("You see Phylla's anthill in the distance.  Every now and then you see");
            // If PC has children w/ Phylla:
            if (this.flags[kFLAGS.ANT_KIDS] > 0)
                this.outx(
                    " one of your many children exit the anthill to unload some dirt before continuing back down into the colony.  It makes you feel good knowing your offspring are so productive."
                );
            else
                this.outx(
                    " Phylla appear out of the anthill to unload some dirt.  She looks over to your campsite and gives you an excited wave before heading back into the colony.  It makes you feel good to know she's so close."
                );
            this.outx("\n\n");
        }
        // Clear bee-status
        if (this.player.findStatusAffect(StatusAffects.ParalyzeVenom) >= 0) {
            this.dynStats(
                "str",
                this.player.statusAffectv1(StatusAffects.ParalyzeVenom),
                "spe",
                this.player.statusAffectv2(StatusAffects.ParalyzeVenom)
            );
            this.player.removeStatusAffect(StatusAffects.ParalyzeVenom);
            this.outx(
                "<b>You feel quicker and stronger as the paralyzation venom in your veins wears off.</b>\n\n",
                false
            );
        }
        // The uber horny
        if (this.player.lust >= 100) {
            if (this.player.findStatusAffect(StatusAffects.Dysfunction) >= 0) {
                this.outx(
                    "<b>You are debilitatingly aroused, but your sexual organs are so numbed the only way to get off would be to find something tight to fuck or get fucked...</b>\n\n",
                    false
                );
            } else if (
                this.flags[kFLAGS.UNABLE_TO_MASTURBATE_BECAUSE_CENTAUR] > 0 &&
                this.player.isTaur()
            ) {
                this.outx(
                    "<b>You are delibitatingly aroused, but your sex organs are so difficult to reach that masturbation isn't at the forefront of your mind.</b>\n\n",
                    false
                );
            } else {
                this.outx(
                    "<b>You are debilitatingly aroused, and can think of doing nothing other than masturbating.</b>\n\n",
                    false
                );
                exploreEvent = undefined;
                placesEvent = undefined;
                // This once disabled the ability to rest, sleep or wait, but ir hasn't done that for many many builds
            }
        }
        let baitText = "Masturbate";
        if (
            ((this.player.findPerk(PerkLib.HistoryReligious) >= 0 && this.player.cor <= 66) ||
                (this.player.findPerk(PerkLib.Enlightened) >= 0 && this.player.cor < 10)) &&
            !(
                this.player.findStatusAffect(StatusAffects.Exgartuan) >= 0 &&
                this.player.statusAffectv2(StatusAffects.Exgartuan) == 0
            )
        )
            baitText = "Meditate";
        // Initialize companions/followers
        if (this.model.time.hours > 4 && this.model.time.hours < 23) {
            if (this.followersCount() > 0) followers = this.campFollowers;
            if (this.slavesCount() > 0) slaves = this.campSlavesMenu;
            if (this.loversCount() > 0) lovers = this.campLoversMenu;
        }
        let restEvent = this.doWait;
        let restName = "Wait";
        // Set up rest stuff
        // Night
        if (this.model.time.hours < 6 || this.model.time.hours > 20) {
            this.outx(
                "It is dark out, made worse by the lack of stars in the sky.  A blood-red moon hangs in the sky, seeming to watch you, but providing little light.  It's far too dark to leave camp.\n",
                false
            );
            restName = "Sleep";
            restEvent = this.doSleep;
            exploreEvent = undefined;
            placesEvent = undefined;
        }
        // Day Time!
        else {
            this.outx(
                "It's light outside, a good time to explore and forage for supplies with which to fortify your camp.\n",
                false
            );
            if (this.player.fatigue > 40 || this.player.HP / this.player.maxHP() <= 0.9) {
                restName = "Rest";
                restEvent = this.rest;
            }
        }
        // Menu

        this.choices(
            "Explore",
            exploreEvent,
            "Places",
            placesEvent,
            "Inventory",
            this.inventory.inventoryMenu,
            "Stash",
            storage,
            "Followers",
            followers,
            "Lovers",
            lovers,
            "Slaves",
            slaves,
            "",
            undefined,
            baitText,
            masturbate,
            restName,
            restEvent
        );
        // Lovers
        // Followers
        // Slaves
    }

    public hasCompanions(): boolean {
        return this.companionsCount() > 0;
    }

    public companionsCount(): number {
        return this.followersCount() + this.slavesCount() + this.loversCount();
    }

    public followersCount(): number {
        let counter = 0;
        if (this.emberScene.followerEmber()) counter++;
        if (this.flags[kFLAGS.VALARIA_AT_CAMP] == 1) counter++;
        if (this.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0) counter++;
        if (this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0) counter++;
        if (this.followerShouldra()) counter++;
        if (this.sophieFollower() && this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0) counter++;
        if (this.helspawnFollower()) counter++;
        return counter;
    }

    public slavesCount(): number {
        let counter = 0;
        if (this.latexGooFollower() && this.flags[kFLAGS.FOLLOWER_AT_FARM_LATEXY] == 0) counter++;
        if (this.vapulaSlave() && this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 0) counter++;
        if (this.campCorruptJojo() && this.flags[kFLAGS.FOLLOWER_AT_FARM_JOJO] == 0) counter++;
        if (
            this.amilyScene.amilyFollower() &&
            this.amilyScene.amilyCorrupt() &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0
        )
            counter++;
        // Bimbo sophie
        if (this.bimboSophie() && this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0) counter++;
        if (this.ceraphIsFollower()) counter++;
        if (this.milkSlave() && this.flags[kFLAGS.FOLLOWER_AT_FARM_BATH_GIRL] == 0) counter++;
        return counter;
    }

    public loversCount(): number {
        let counter = 0;
        if (this.arianScene.arianFollower()) counter++;
        if (this.followerHel()) counter++;
        // Izma!
        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1 &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0
        )
            counter++;
        if (this.isabellaFollower() && this.flags[kFLAGS.FOLLOWER_AT_FARM_ISABELLA] == 0) counter++;
        if (
            this.player.findStatusAffect(StatusAffects.CampMarble) >= 0 &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] == 0
        )
            counter++;
        if (this.amilyScene.amilyFollower() && !this.amilyScene.amilyCorrupt()) counter++;
        if (this.followerKiha()) counter++;
        if (this.flags[kFLAGS.NIEVE_STAGE] == 5) counter++;
        if (this.flags[kFLAGS.ANT_WAIFU] > 0) counter++;
        return counter;
    }

    public campLoversMenu(): void {
        let isabellaButt;
        let marbleEvent;
        let izmaEvent;
        let kihaButt;
        let amilyEvent;
        let hel;
        let nieve;
        this.clearOutput();
        if (this.flags[kFLAGS.NIEVE_STAGE] == 5) {
            kGAMECLASS.nieveCampDescs();
            this.outx("\n\n");
            nieve = this.getGame().approachNieve;
        }
        if (kGAMECLASS.helScene.followerHel()) {
            if (this.flags[kFLAGS.HEL_FOLLOWER_LEVEL] == 2) {
                // Hel @ Camp: Follower Menu
                // (6-7)
                if (this.model.time.hours <= 7)
                    this.outx(
                        "Hel is currently sitting at the edge of camp, surrounded by her scraps of armor, sword, and a few half-empty bottles of vodka.  By the way she's grunting and growling, it looks like she's getting ready to flip her shit and go running off into the plains in her berserker state.\n\n"
                    );
                // (8a-5p)
                else if (this.model.time.hours <= 17)
                    this.outx(
                        "Hel's out of camp at the moment, adventuring on the plains.  You're sure she'd be on hand in moments if you needed her, though.\n\n"
                    );
                // 5-7)
                else if (this.model.time.hours <= 19)
                    this.outx(
                        "Hel's out visiting her family in Tel'Adre right now, though you're sure she's only moments away if you need her.\n\n"
                    );
                // (7+)
                else
                    this.outx(
                        "Hel is fussing around her hammock, checking her gear and sharpening her collection of blades.  Each time you glance her way, though, the salamander puts a little extra sway in her hips and her tail wags happily.\n\n"
                    );
            } else if (this.flags[kFLAGS.HEL_FOLLOWER_LEVEL] == 1) {
                if (this.flags[kFLAGS.HEL_HARPY_QUEEN_DEFEATED] == 1) {
                    this.outx(
                        "Hel has returned to camp, though for now she looks a bit bored.  Perhaps she is waiting on something.\n\n"
                    );
                } else {
                    this.outx(
                        "<b>You see the salamander Helia pacing around camp, anxiously awaiting your departure to the harpy roost. Seeing you looking her way, she perks up, obviously ready to get underway.</b>\n\n"
                    );
                }
            }
            hel = this.helFollower.heliaFollowerMenu;
        }
        // Kiha!
        if (this.followerKiha()) {
            // (6-7)
            if (this.model.time.hours < 7)
                this.outx(
                    "Kiha is sitting near the fire, her axe laying across her knees as she polishes it.[pg]"
                );
            else if (this.model.time.hours < 19)
                this.outx(
                    "Kiha's out right now, likely patrolling for demons to exterminate.  You're sure a loud call could get her attention.\n\n"
                );
            else
                this.outx(
                    "Kiha is utterly decimating a set of practice dummies she's set up out on the edge of camp.  All of them have crudely drawn horns. Most of them are on fire.\n\n"
                );
            kihaButt = this.kihaScene.encounterKiha;
        }
        // Isabella
        if (this.isabellaFollower() && this.flags[kFLAGS.FOLLOWER_AT_FARM_ISABELLA] == 0) {
            isabellaButt = this.isabellaFollowerScene.callForFollowerIsabella;
            if (this.model.time.hours >= 21 || this.model.time.hours <= 5)
                this.outx("Isabella is sound asleep in her bunk and quietly snoring.");
            else if (this.model.time.hours == 6)
                this.outx(
                    "Isabella is busy eating some kind of grain-based snack for breakfast.  The curly-haired cow-girl gives you a smile when she sees you look her way.",
                    false
                );
            else if (this.model.time.hours == 7)
                this.outx(
                    "Isabella, the red-headed cow-girl, is busy with a needle and thread, fixing up some of her clothes.",
                    false
                );
            else if (this.model.time.hours == 8)
                this.outx(
                    "Isabella is busy cleaning up the camp, but when she notices you looking her way, she stretches up and arches her back, pressing eight bullet-hard nipples into the sheer silk top she prefers to wear.",
                    false
                );
            else if (this.model.time.hours == 9)
                this.outx(
                    "Isabella is out near the fringes of your campsite.  She has her massive shield in one hand and appears to be keeping a sharp eye out for intruders or demons.  When she sees you looking her way, she gives you a wave.",
                    false
                );
            else if (this.model.time.hours == 10)
                this.outx(
                    "The cow-girl warrioress, Isabella, is sitting down on a chair and counting out gems from a strange pouch.  She must have defeated someone or something recently.",
                    false
                );
            else if (this.model.time.hours == 11)
                this.outx(
                    "Isabella is sipping from a bottle labelled 'Lactaid' in a shaded corner.  When she sees you looking she blushes, though dark spots appear on her top and in her skirt's middle.",
                    false
                );
            else if (this.model.time.hours == 12)
                this.outx(
                    "Isabella is cooking a slab of meat over the fire.  From the smell that's wafting this way, you think it's beef.  Idly, you wonder if she realizes just how much like her chosen food animal she has become.",
                    false
                );
            else if (this.model.time.hours == 13) {
                this.outx("Isabella ");
                const izzyCreeps: any[] = [];
                // Build array of choices for izzy to talk to
                if (this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0)
                    izzyCreeps[izzyCreeps.length] = 0;
                if (this.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0)
                    izzyCreeps[izzyCreeps.length] = 1;
                if (
                    this.amilyScene.amilyFollower() &&
                    this.flags[kFLAGS.AMILY_FOLLOWER] == 1 &&
                    this.flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] == 0
                )
                    izzyCreeps[izzyCreeps.length] = 2;
                if (
                    this.amilyScene.amilyFollower() &&
                    this.flags[kFLAGS.AMILY_FOLLOWER] == 2 &&
                    this.flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] == 0 &&
                    this.flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0
                )
                    izzyCreeps[izzyCreeps.length] = 3;
                if (
                    this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1 &&
                    this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0
                )
                    izzyCreeps[izzyCreeps.length] = 4;
                // Base choice - book
                izzyCreeps[izzyCreeps.length] = 5;
                // Select!
                const choice: number = Camp.rand(izzyCreeps.length);

                if (izzyCreeps[choice] == 0)
                    this.outx(
                        "is sitting down with Rathazul, chatting amiably about the weather.",
                        false
                    );
                else if (izzyCreeps[choice] == 1)
                    this.outx(
                        "is sitting down with Jojo, smiling knowingly as the mouse struggles to keep his eyes on her face.",
                        false
                    );
                else if (izzyCreeps[choice] == 2)
                    this.outx(
                        "is talking with Amily, sharing stories of the fights she's been in and the enemies she's faced down.  Amily seems interested but unimpressed.",
                        false
                    );
                else if (izzyCreeps[choice] == 3)
                    this.outx(
                        "is sitting down chatting with Amily, but the corrupt mousette is just staring at Isabella's boobs and masturbating.  The cow-girl is pretending not to notice.",
                        false
                    );
                else if (izzyCreeps[choice] == 4)
                    this.outx(
                        "is sitting down with Izma and recounting some stories, somewhat nervously.  Izma keeps flashing her teeth in a predatory smile.",
                        false
                    );
                else this.outx("is sitting down and thumbing through a book.");
            } else if (this.model.time.hours == 14)
                this.outx(
                    "Isabella is working a grindstone and sharpening her tools.  She even hones the bottom edge of her shield into a razor-sharp cutting edge.  The cow-girl is sweating heavily, but it only makes the diaphanous silk of her top cling more alluringly to her weighty chest.",
                    false
                );
            else if (this.model.time.hours == 15)
                this.outx(
                    "The warrior-woman, Isabella is busy constructing dummies of wood and straw, then destroying them with vicious blows from her shield.  Most of the time she finishes by decapitating them with the sharp, bottom edge of her weapon.  She flashes a smile your way when she sees you.",
                    false
                );
            else if (this.model.time.hours == 16)
                this.outx(
                    "Isabella is sitting down with a knife, the blade flashing in the sun as wood shavings fall to the ground.  Her hands move with mechanical, practiced rhythm as she carves a few hunks of shapeless old wood into tools or art.",
                    false
                );
            else if (this.model.time.hours == 17)
                this.outx(
                    "Isabella is sitting against one of the large rocks near the outskirts of your camp, staring across the wasteland while idly munching on what you assume to be a leg of lamb.  She seems lost in thought, though that doesn't stop her from throwing a wink and a goofy food-filled grin toward you.",
                    false
                );
            else if (this.model.time.hours == 18)
                this.outx(
                    "The dark-skinned cow-girl, Isabella, is sprawled out on a carpet and stretching.  She seems surprisingly flexible for someone with hooves and oddly-jointed lower legs.",
                    false
                );
            else if (this.model.time.hours == 19) {
                // [(Izzy Milked Yet flag = -1)
                if (this.flags[kFLAGS.ISABELLA_MILKED_YET] == -1)
                    this.outx(
                        "Isabella has just returned from a late visit to Whitney's farm, bearing a few filled bottles and a small pouch of gems.",
                        false
                    );
                else
                    this.outx(
                        "Isabella was hidden behind a rock when you started looking for her, but as soon as you spot her in the darkness, she jumps, a guilty look flashing across her features.  She turns around and adjusts her top before looking back your way, her dusky skin even darker from a blush.  The cow-girl gives you a smile and walks back to her part of camp.  A patch of white decorates the ground where she was standing - is that milk?  Whatever it is, it's gone almost as fast as you see it, devoured by the parched, wasteland earth.",
                        false
                    );
            } else if (this.model.time.hours == 20)
                this.outx(
                    "Your favorite chocolate-colored cowgirl, Isabella, is moving about, gathering all of her scattered belongings and replacing them in her personal chest.  She yawns more than once, indicating her readiness to hit the hay, but her occasional glance your way lets you know she wouldn't mind some company before bed.",
                    false
                );
            else this.outx("Isabella looks incredibly bored right now.");
            this.outx("\n\n", false);
        }
        // Izma
        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1 &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0
        ) {
            this.outx(
                "Neatly laid near the base of your own is a worn bedroll belonging to Izma, your tigershark lover. It's a snug fit for her toned body, though it has some noticeable cuts and tears in the fabric. Close to her bed is her old trunk, almost as if she wants to have it at arms length if anyone tries to rob her in her sleep.\n\n",
                false
            );
            izmaEvent = this.izmaScene.izmaFollowerMenu;
        }
        // MARBLE
        if (
            this.player.findStatusAffect(StatusAffects.CampMarble) >= 0 &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] == 0
        ) {
            this.temp = Camp.rand(5);
            this.outx(
                "A second bedroll rests next to yours; a large two handed hammer sometimes rests against it, depending on whether or not its owner needs it at the time.  ",
                false
            );
            // Normal Murbles
            if (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] != 4) {
                // (Choose one of these at random to display each hour)
                if (this.temp == 0)
                    this.outx(
                        "Marble herself has gone off to Whitney's farm to get milked right now.",
                        false
                    );
                if (this.temp == 1)
                    this.outx(
                        "Marble herself has gone off to Whitney's farm to do some chores right now.",
                        false
                    );
                if (this.temp == 2)
                    this.outx(
                        "Marble herself isn't at the camp right now; she is probably off getting supplies, though she'll be back soon enough.",
                        false
                    );
                if (this.temp == 3) {
                    this.outx("Marble herself is resting on her bedroll right now.");
                }
                if (this.temp == 4) {
                    this.outx("Marble herself is wandering around the camp right now.");
                }
                if (this.temp < 3)
                    this.outx("  You're sure she'd be back in moments if you needed her.");
                marbleEvent = this.marbleScene.interactWithMarbleAtCamp;
            }
            // Out getting family
            else this.outx("Marble is out in the wilderness right now, searching for a relative.");
            this.outx("\n\n", false);
        }
        // AMILY
        if (
            this.amilyScene.amilyFollower() &&
            this.flags[kFLAGS.AMILY_FOLLOWER] == 1 &&
            this.flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] == 0
        ) {
            this.outx("Amily is currently strolling around your camp, ");
            this.temp = Camp.rand(6);
            if (this.temp == 0) {
                this.outx("dripping water and stark naked from a bath in the stream");
                if (this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0)
                    this.outx(".  Rathazul glances over and immediately gets a nosebleed");
            } else if (this.temp == 1)
                this.outx(
                    "slouching in the shade of some particularly prominent rocks, whittling twigs to create darts for her blowpipe",
                    false
                );
            else if (this.temp == 2)
                this.outx(
                    "dipping freshly-made darts into a jar of something that looks poisonous",
                    false
                );
            else if (this.temp == 3) this.outx("eating some of your supplies");
            else if (this.temp == 4) this.outx("and she flops down on her nest to have a rest");
            else
                this.outx(
                    "peeling the last strips of flesh off of an imp's skull and putting it on a particularly flat, sun-lit rock to bleach as a trophy",
                    false
                );
            this.outx(".\n\n", false);
            amilyEvent = this.amilyScene.amilyFollowerEncounter;
        }
        // Amily out freaking Urta?
        else if (
            this.flags[kFLAGS.AMILY_VISITING_URTA] == 1 ||
            this.flags[kFLAGS.AMILY_VISITING_URTA] == 2
        ) {
            this.outx(
                "Amily's bed of grass and herbs lies empty, the mouse-woman still absent from her sojourn to meet your other lover.\n\n",
                false
            );
        }
        if (this.arianScene.arianFollower())
            this.outx("Arian's tent is here, if you'd like to go inside.\n\n");
        // choices("Amily",amilyEvent,"Helia",hel,"Isabella",isabellaButt,"Izma",izmaEvent,"Kiha",kihaButt,"Marble",marbleEvent,"Nieve",nieve,"",0,"",0,"Back",1);
        this.menu();
        if (amilyEvent != undefined) this.addButton(0, "Amily", amilyEvent);
        if (this.arianScene.arianFollower())
            this.addButton(1, "Arian", this.arianScene.visitAriansHouse);
        if (hel != undefined) this.addButton(2, "Helia", hel);
        if (isabellaButt != undefined) this.addButton(3, "Isabella", isabellaButt);
        if (izmaEvent != undefined) this.addButton(4, "Izma", izmaEvent);
        this.addButton(5, "Kiha", kihaButt);
        if (marbleEvent != undefined) this.addButton(6, "Marble", marbleEvent);
        if (nieve != undefined) this.addButton(7, "Nieve", nieve);
        if (this.flags[kFLAGS.ANT_WAIFU] > 0)
            this.addButton(
                8,
                "Phylla",
                this.getGame().desert.antsScene.introductionToPhyllaFollower
            );
        this.addButton(9, "Back", this.playerMenu);
    }

    public campSlavesMenu(): void {
        this.clearOutput();
        let vapula2;
        let amilyEvent;
        let ceraph;
        let sophieEvent;
        let jojoEvent;
        let goo;
        if (this.vapulaSlave() && this.flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 0) {
            this.vapula.vapulaSlaveFlavorText();
            this.outx("\n\n");
            vapula2 = this.vapula.callSlaveVapula;
        }
        // Bimbo Sophie
        if (this.bimboSophie() && this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0) {
            this.sophieBimbo.sophieCampLines();
            sophieEvent = this.sophieBimbo.approachBimboSophieInCamp;
        }
        if (this.latexGooFollower() && this.flags[kFLAGS.FOLLOWER_AT_FARM_LATEXY] == 0) {
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } lurks in a secluded section of rocks, only venturing out when called for or when she needs to gather water from the stream.\n\n`
            );
            goo = this.latexGirl.approachLatexy;
        }
        if (this.ceraphIsFollower()) ceraph = this.ceraphFollowerScene.ceraphFollowerEncounter;
        // JOJO
        // If Jojo is corrupted, add him to the masturbate menu.
        if (this.campCorruptJojo() && this.flags[kFLAGS.FOLLOWER_AT_FARM_JOJO] == 0) {
            this.outx(
                "From time to time you can hear movement from around your camp, and you routinely find thick puddles of mouse semen.  You are sure Jojo is here if you ever need to sate yourself.\n\n",
                false
            );
            jojoEvent = this.jojoScene.corruptCampJojo;
        }
        // Modified Camp/Follower List Description:
        if (
            this.amilyScene.amilyFollower() &&
            this.flags[kFLAGS.AMILY_FOLLOWER] == 2 &&
            this.flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] == 0 &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0
        ) {
            this.outx(
                "Sometimes you hear a faint moan from not too far away. No doubt the result of your slutty toy mouse playing with herself.\n\n",
                false
            );
            amilyEvent = this.amilyScene.amilyFollowerEncounter;
        }
        if (this.milkSlave() && this.flags[kFLAGS.FOLLOWER_AT_FARM_BATH_GIRL] == 0) {
            this.outx(
                "Your well-endowed, dark-skinned milk-girl is here.  She flicks hopeful eyes towards you whenever she thinks she has your attention.\n\n"
            );
        }
        // choices("Amily",amilyEvent,"Ceraph",ceraph,"Jojo",jojoEvent,"Sophie",sophieEvent,"Vapula",vapula,"",0,"",0,"",0,flags[kFLAGS.GOO_NAME],goo,"Back",1);
        this.menu();
        if (amilyEvent != undefined) this.addButton(0, "Amily", amilyEvent);
        if (ceraph != undefined) this.addButton(1, "Ceraph", ceraph);
        if (jojoEvent != undefined) this.addButton(2, "Jojo", jojoEvent);
        if (sophieEvent != undefined) this.addButton(3, "Sophie", sophieEvent);
        if (vapula2 != undefined) this.addButton(4, "Vapula", vapula2);
        if (this.milkSlave() && this.flags[kFLAGS.FOLLOWER_AT_FARM_BATH_GIRL] == 0)
            this.addButton(7, this.flags[kFLAGS.MILK_NAME], this.milkWaifu.milkyMenu);
        if (goo != undefined) this.addButton(8, this.flags[kFLAGS.GOO_NAME], goo);
        this.addButton(9, "Back", this.playerMenu);
    }

    public campFollowers(): void {
        let rathazulEvent;
        let jojoEvent;
        let valeria2;
        let shouldra;
        let ember;
        this.clearOutput();
        this.getGame().inCombat = false;
        // ADD MENU FLAGS/INDIVIDUAL FOLLOWER TEXTS
        this.menu();
        if (this.emberScene.followerEmber()) {
            this.emberScene.emberCampDesc();
            ember = this.emberScene.emberCampMenu;
        }
        if (this.followerShouldra()) {
            shouldra = this.shouldraFollower.shouldraFollowerScreen;
        }
        // Pure Jojo
        if (this.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0) {
            this.outx(
                "There is a small bedroll for Jojo near your own, though the mouse is probably hanging around the camp's perimeter.\n\n",
                false
            );
            jojoEvent = this.jojoScene.jojoCamp;
        }
        // RATHAZUL
        // if rathazul has joined the camp
        if (this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0) {
            rathazulEvent = kGAMECLASS.rathazul.returnToRathazulMenu;
            if (this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] <= 1) {
                this.outx(
                    "Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work with his chemicals, working on who knows what.",
                    false
                );
                if (this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] == 1)
                    this.outx(
                        "  Some kind of spider-silk-based equipment is hanging from a nearby rack.  He's finished with the task you gave him!",
                        false
                    );
                this.outx("\n\n", false);
            } else
                this.outx(
                    "Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work on the silken equipment you've commissioned him to craft.\n\n",
                    false
                );
        }
        if (this.sophieFollower() && this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0) {
            if (Camp.rand(5) == 0)
                this.outx(
                    "Sophie is sitting by herself, applying yet another layer of glittering lip gloss to her full lips.\n\n"
                );
            else if (Camp.rand(4) == 0)
                this.outx(
                    "Sophie is sitting in her nest, idly brushing out her feathers.  Occasionally, she looks up from her work to give you a sultry wink and a come-hither gaze.\n\n"
                );
            else if (Camp.rand(3) == 0)
                this.outx(
                    "Sophie is fussing around in her nest, straightening bits of straw and grass, trying to make it more comfortable.  After a few minutes, she flops down in the middle and reclines, apparently satisfied for the moment.\n\n"
                );
            else if (Camp.rand(2) == 0 || this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 0) {
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0)
                    this.outx(
                        "Your platinum-blonde harpy, Sophie, is currently reading a book - a marked change from her bimbo-era behavior.  Occasionally, though, she glances up from the page and gives you a lusty look.  Some things never change....\n\n"
                    );
                else
                    this.outx(
                        "Your pink harpy, Sophie, is currently reading a book.  She seems utterly absorbed in it, though you question how she obtained it.  Occasionally, though, she'll glance up from the pages to shoot you a lusty look.\n\n"
                    );
            } else {
                this.outx("Sophie is sitting in her nest, ");
                if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] < 5) {
                    this.outx("across from your daughter");
                    if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] > 1) this.outx("s");
                } else this.outx("surrounded by your daughters");
                this.outx(", apparently trying to teach ");
                if (this.flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 1) this.outx("her");
                else this.outx("them");
                this.outx(
                    " about hunting and gathering techniques.  Considering their unusual upbringing, it can't be as easy for them...\n\n"
                );
            }
            this.addButton(5, "Sophie", this.sophieFollowerScene.followerSophieMainScreen);
        }
        if (this.flags[kFLAGS.VALARIA_AT_CAMP] == 1) valeria2 = this.valeria.valeriaFollower;
        this.addButton(0, "Ember", ember);
        if (this.helspawnFollower())
            this.addButton(
                1,
                this.flags[kFLAGS.HELSPAWN_NAME],
                this.helSpawnScene.helspawnsMainMenu
            );
        this.addButton(2, "Jojo", jojoEvent);
        this.addButton(3, "Rathazul", rathazulEvent);
        this.addButton(4, "Shouldra", shouldra);
        // ABOVE: addButton(4,"Sophie",followerSophieMainScreen);
        this.addButton(6, "Valeria", valeria2);
        this.addButton(9, "Back", this.playerMenu);
    }

    private rest(): void {
        this.campQ = true;
        if (this.timeQ == 0) {
            this.outx("You lie down to rest for four hours.\n", true);
            this.timeQ = 4;
            // Marble withdrawl
            if (this.player.findStatusAffect(StatusAffects.MarbleWithdrawl) >= 0) {
                this.outx(
                    "\nYour rest is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.\n",
                    false
                );
                this.HPChange(this.timeQ * 5, true);
                this.dynStats("tou", -0.1, "int", -0.1);
                // fatigue
                this.fatigue(-2 * this.timeQ);
                if (this.player.findPerk(PerkLib.SpeedyRecovery) >= 0)
                    this.fatigue(-1 * this.timeQ);
            }
            // REGULAR HP/FATIGUE RECOVERY
            else {
                this.HPChange(this.timeQ * 10, true);
                // fatigue
                this.fatigue(-4 * this.timeQ);
                if (this.player.findPerk(PerkLib.SpeedyRecovery) >= 0)
                    this.fatigue(-2 * this.timeQ);
            }
        } else {
            if (this.timeQ != 1)
                this.outx(
                    `You continue to rest for ${Camp.num2Text(this.timeQ)} more hours.\n`,
                    true
                );
            else this.outx("You continue to rest for another hour.\n", true);
        }
        this.goNext(this.timeQ, true);
    }

    private doWait(): void {
        this.campQ = true;
        this.outx("", true);
        if (this.timeQ == 0) {
            this.outx("You wait four hours...\n", false);
            this.timeQ = 4;
            // Marble withdrawl
            if (this.player.findStatusAffect(StatusAffects.MarbleWithdrawl) >= 0) {
                this.outx(
                    "\nYour time spent waiting is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.\n",
                    false
                );
                // fatigue
                this.fatigue(-1 * this.timeQ);
                if (this.player.findPerk(PerkLib.SpeedyRecovery) >= 0)
                    this.fatigue(-0.5 * this.timeQ);
            }
            // REGULAR HP/FATIGUE RECOVERY
            else {
                // fatigue
                this.fatigue(-2 * this.timeQ);
                if (this.player.findPerk(PerkLib.SpeedyRecovery) >= 0)
                    this.fatigue(-1 * this.timeQ);
            }
        } else {
            if (this.timeQ != 1)
                this.outx(
                    `You continue to wait for ${Camp.num2Text(this.timeQ)} more hours.\n`,
                    false
                );
            else this.outx("You continue to wait for another hour.\n", false);
        }
        this.goNext(this.timeQ, true);
    }

    public doSleep(clrScreen = true): void {
        if (
            kGAMECLASS.urta.pregnancy.incubation == 0 &&
            kGAMECLASS.urta.pregnancy.type == PregnancyStore.PREGNANCY_PLAYER &&
            this.model.time.hours >= 20 &&
            this.model.time.hours < 2
        ) {
            this.urtaPregs.preggoUrtaGivingBirth();
            return;
        }
        this.campQ = true;
        if (this.timeQ == 0) {
            if (this.model.time.hours == 21) this.timeQ = 9;
            if (this.model.time.hours == 22) this.timeQ = 8;
            if (this.model.time.hours >= 23) this.timeQ = 7;
            if (this.model.time.hours == 0) this.timeQ = 6;
            if (this.model.time.hours == 1) this.timeQ = 5;
            if (this.model.time.hours == 2) this.timeQ = 4;
            if (this.model.time.hours == 3) this.timeQ = 3;
            if (this.model.time.hours == 4) this.timeQ = 2;
            if (this.model.time.hours == 5) this.timeQ = 1;
            // Autosave stuff
            if (
                this.player.slotName != "VOID" &&
                this.player.autoSave &&
                this.mainView.bottomButtons[0].labelText != "Game Over"
            ) {
                trace(`Autosaving to slot: ${this.player.slotName}`);

                this.getGame().saves.saveGame(this.player.slotName);
            }
            // Clear screen
            if (clrScreen) this.outx("", true);
            /** ****************************************************************/
            /*       ONE TIME SPECIAL EVENTS                                  */
            /** ****************************************************************/
            // HEL SLEEPIES!
            if (
                this.helFollower.helAffection() >= 70 &&
                this.flags[kFLAGS.HEL_REDUCED_ENCOUNTER_RATE] == 0 &&
                this.flags[kFLAGS.HEL_FOLLOWER_LEVEL] == 0
            ) {
                this.getGame().heliaDiscovery();
                this.sleepRecovery(false);
                return;
            }
            // Shouldra xgartuan fight
            if (
                this.player.hasCock() &&
                this.followerShouldra() &&
                this.player.statusAffectv1(StatusAffects.Exgartuan) == 1
            ) {
                if (this.flags[kFLAGS.SHOULDRA_EXGARTUDRAMA] == 0) {
                    this.shouldraFollower.shouldraAndExgartumonFightGottaCatchEmAll();
                    this.sleepRecovery(false);
                    return;
                } else if (this.flags[kFLAGS.SHOULDRA_EXGARTUDRAMA] == 3) {
                    this.shouldraFollower.exgartuMonAndShouldraShowdown();
                    this.sleepRecovery(false);
                    return;
                }
            }
            if (
                this.player.hasCock() &&
                this.followerShouldra() &&
                this.flags[kFLAGS.SHOULDRA_EXGARTUDRAMA] == -0.5
            ) {
                this.shouldraFollower.keepShouldraPartIIExgartumonsUndeatH();
                this.sleepRecovery(false);
                return;
            }
            /** ****************************************************************/
            /*       SLEEP WITH SYSTEM GOOOO                                  */
            /** ****************************************************************/
            // Marble Sleepies
            if (
                this.marbleScene.marbleAtCamp() &&
                this.player.findStatusAffect(StatusAffects.CampMarble) >= 0 &&
                this.flags[kFLAGS.SLEEP_WITH] == "Marble" &&
                this.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] == 0
            ) {
                if (this.marbleScene.marbleNightSleepFlavor()) {
                    this.sleepRecovery(false);
                    return;
                }
            } else if (
                this.flags[kFLAGS.SLEEP_WITH] == "Arian" &&
                this.arianScene.arianFollower()
            ) {
                this.arianScene.sleepWithArian();
                return;
            } else if (
                this.flags[kFLAGS.SLEEP_WITH] == "Sophie" &&
                (this.bimboSophie() || this.sophieFollower()) &&
                this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0
            ) {
                // Night Time Snuggle Alerts!*
                // (1)
                if (Camp.rand(4) == 0) {
                    this.outx(
                        `You curl up next to Sophie, planning to sleep for ${Camp.num2Text(
                            this.timeQ
                        )} hour`
                    );
                    if (this.timeQ > 1) this.outx("s");
                    this.outx(
                        ".  She wraps her feathery arms around you and nestles her chin into your shoulder.  Her heavy breasts cushion flat against your back as she gives you a rather chaste peck on the cheek and drifts off towards dreamland..."
                    );
                }
                // (2)
                else if (Camp.rand(3) == 0) {
                    this.outx(
                        `While you're getting ready for bed, you see that Sophie has already beaten you there.  She's sprawled out on her back with her arms outstretched, making little beckoning motions towards the valley of her cleavage.  You snuggle in against her, her pillowy breasts supporting your head and her familiar heartbeat drumming you to sleep for ${Camp.num2Text(
                            this.timeQ
                        )} hour`
                    );
                    if (this.timeQ > 1) this.outx("s");
                    this.outx(".");
                }
                // (3)
                else if (Camp.rand(2) == 0) {
                    this.outx(`As you lay down to sleep for ${Camp.num2Text(this.timeQ)} hour`);
                    if (this.timeQ > 1) this.outx("s");
                    this.outx(
                        ', you find the harpy-girl, Sophie, snuggling herself under her blankets with you.  She slips in between your arms and guides your hands to her enormous breasts, her backside already snug against your loins.  She whispers, "<i>Something to think about for next morning...  Sweet dreams.</i>" as she settles in for the night.'
                    );
                }
                // (4)
                else {
                    this.outx(
                        `Sophie climbs under the sheets with you when you go to sleep, planning on resting for ${Camp.num2Text(
                            this.timeQ
                        )} hour`
                    );
                    if (this.timeQ > 1) this.outx("s");
                    this.outx(
                        ".  She sleeps next to you, just barely touching you.  You rub her shoulder affectionately before the two of you nod off."
                    );
                }
                this.outx("\n");
            } else {
                if (this.flags[kFLAGS.SLEEP_WITH] == "Helia" && kGAMECLASS.helScene.followerHel()) {
                    this.outx(
                        `You curl up next to Helia, planning to sleep for ${Camp.num2Text(
                            this.timeQ
                        )} `
                    );
                }
                // Normal sleep message
                else this.outx(`You curl up, planning to sleep for ${Camp.num2Text(this.timeQ)} `);
                if (this.timeQ == 1) this.outx("hour.\n", false);
                else this.outx("hours.\n", false);
            }
            this.sleepRecovery(true);
        } else {
            if (this.timeQ != 1)
                this.outx(
                    `You lie down to resume sleeping for the remaining ${Camp.num2Text(
                        this.timeQ
                    )} hours.\n`,
                    true
                );
            else this.outx("You lie down to resume sleeping for the remaining hour.\n", true);
        }
        this.goNext(this.timeQ, true);
    }
    // For shit that breaks normal sleep processing.
    public sleepWrapper(): void {
        if (this.model.time.hours == 16) this.timeQ = 14;
        if (this.model.time.hours == 17) this.timeQ = 13;
        if (this.model.time.hours == 18) this.timeQ = 12;
        if (this.model.time.hours == 19) this.timeQ = 11;
        if (this.model.time.hours == 20) this.timeQ = 10;
        if (this.model.time.hours == 21) this.timeQ = 9;
        if (this.model.time.hours == 22) this.timeQ = 8;
        if (this.model.time.hours >= 23) this.timeQ = 7;
        if (this.model.time.hours == 0) this.timeQ = 6;
        if (this.model.time.hours == 1) this.timeQ = 5;
        if (this.model.time.hours == 2) this.timeQ = 4;
        if (this.model.time.hours == 3) this.timeQ = 3;
        if (this.model.time.hours == 4) this.timeQ = 2;
        if (this.model.time.hours == 5) this.timeQ = 1;
        this.clearOutput();
        if (this.timeQ != 1)
            this.outx(
                `You lie down to resume sleeping for the remaining ${Camp.num2Text(
                    this.timeQ
                )} hours.\n`,
                true
            );
        else this.outx("You lie down to resume sleeping for the remaining hour.\n", true);
        this.sleepRecovery(true);
        this.goNext(this.timeQ, true);
    }

    public sleepRecovery(display = false): void {
        // Marble withdrawl
        if (this.player.findStatusAffect(StatusAffects.MarbleWithdrawl) >= 0) {
            if (display)
                this.outx(
                    "\nYour sleep is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.\n",
                    false
                );
            this.HPChange(this.timeQ * 10, true);
            this.dynStats("tou", -0.1, "int", -0.1);
            // fatigue
            this.fatigue(-Math.floor(this.player.fatigue / 2));
            if (this.player.findPerk(PerkLib.SpeedyRecovery) >= 0)
                this.fatigue(-Math.floor(this.player.fatigue / 4));
        }
        // Mino withdrawal
        else if (this.flags[kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] == 3) {
            if (display)
                this.outx(
                    "\nYou spend much of the night tossing and turning, aching for a taste of minotaur cum.\n",
                    false
                );
            this.HPChange(this.timeQ * 15, true);
            this.fatigue(-Math.floor(this.player.fatigue / 2));
            if (this.player.findPerk(PerkLib.SpeedyRecovery) >= 0)
                this.fatigue(-Math.floor(this.player.fatigue / 4));
        }
        // REGULAR HP/FATIGUE RECOVERY
        else {
            this.HPChange(this.timeQ * 20, display);
            // fatigue
            this.fatigue(-this.player.fatigue);
        }
    }

    private dungeonFound(): boolean {
        // Returns true as soon as any known dungeon is found
        if (this.flags[kFLAGS.DISCOVERED_DUNGEON_2_ZETAZ] > 0) return true;
        if (this.player.findStatusAffect(StatusAffects.FoundFactory) >= 0) return true;
        if (this.flags[kFLAGS.DISCOVERED_WITCH_DUNGEON] > 0) return true;
        if (this.flags[kFLAGS.D3_DISCOVERED] > 0) return true;
        return false;
    }

    private farmFound(): boolean {
        // Returns true as soon as any known dungeon is found
        if (
            this.player.findStatusAffect(StatusAffects.MetWhitney) >= 0 &&
            this.player.statusAffectv1(StatusAffects.MetWhitney) > 1
        ) {
            if (this.flags[kFLAGS.FARM_DISABLED] == 0) return true;
            if (
                this.player.cor >= 70 &&
                this.player.level >= 12 &&
                this.getGame().farm.farmCorruption.corruptFollowers() >= 2 &&
                this.flags[kFLAGS.FARM_CORRUPTION_DISABLED] == 0
            )
                return true;
        }
        if (this.flags[kFLAGS.FARM_CORRUPTION_STARTED]) return true;
        return false;
    }

    private placesKnown(): boolean {
        // Returns true as soon as any known place is found
        if (this.flags[kFLAGS.BAZAAR_ENTERED] > 0) return true;
        if (this.player.findStatusAffect(StatusAffects.BoatDiscovery) >= 0) return true;
        if (this.flags[kFLAGS.FOUND_CATHEDRAL] == 1) return true;
        if (this.dungeonFound()) return true;
        if (this.farmFound()) return true;
        if (this.flags[kFLAGS.OWCA_UNLOCKED] == 1) return true;
        if (this.player.findStatusAffect(StatusAffects.HairdresserMeeting) >= 0) return true;
        if (this.player.statusAffectv1(StatusAffects.TelAdre) >= 1) return true;
        if (this.flags[kFLAGS.AMILY_VILLAGE_ACCESSIBLE] > 0) return true;
        if (this.flags[kFLAGS.MET_MINERVA] >= 4) return true;
        return false;
    }

    // Places menu
    private places(): void {
        // Displays a menu for all known places
        if (this.flags[kFLAGS.PLACES_PAGE] != 0) {
            this.placesPage2();
            return;
        }
        this.menu();
        if (this.flags[kFLAGS.BAZAAR_ENTERED] > 0)
            this.addButton(0, "Bazaar", this.getGame().bazaar.enterTheBazaar);
        if (this.player.findStatusAffect(StatusAffects.BoatDiscovery) >= 0)
            this.addButton(1, "Boat", this.getGame().boat.boatExplore);
        if (this.flags[kFLAGS.FOUND_CATHEDRAL] == 1) {
            if (this.flags[kFLAGS.GAR_NAME] == "")
                this.addButton(
                    2,
                    "Cathedral",
                    this.getGame().gargoyle.gargoylesTheShowNowOnWBNetwork
                );
            else this.addButton(2, "Cathedral", this.getGame().gargoyle.returnToCathedral);
        }
        if (this.dungeonFound()) this.addButton(3, "Dungeons", this.dungeons);
        this.addButton(4, "Next", this.placesPage2);
        if (this.farmFound()) this.addButton(5, "Farm", this.getGame().farm.farmExploreEncounter);
        if (this.flags[kFLAGS.OWCA_UNLOCKED] == 1)
            this.addButton(6, "Owca", this.getGame().owca.gangbangVillageStuff);
        if (this.player.findStatusAffect(StatusAffects.HairdresserMeeting) >= 0)
            this.addButton(7, "Salon", this.getGame().mountain.salon.salonGreeting);
        if (this.player.statusAffectv1(StatusAffects.TelAdre) >= 1)
            this.addButton(8, "Tel'Adre", this.getGame().telAdre.telAdreMenu);
        this.addButton(9, "Back", this.playerMenu);
    }

    private placesPage2(): void {
        this.menu();
        this.flags[kFLAGS.PLACES_PAGE] = 1;
        // turn on ruins
        if (this.flags[kFLAGS.AMILY_VILLAGE_ACCESSIBLE] > 0)
            this.addButton(0, "TownRuins", this.amilyScene.exploreVillageRuin);
        if (this.flags[kFLAGS.MET_MINERVA] >= 4)
            this.addButton(
                1,
                "Oasis Tower",
                this.getGame().highMountains.minervaScene.encounterMinerva
            );
        this.addButton(4, "Previous", this.placesToPage1);
        this.addButton(9, "Back", this.playerMenu);
    }

    private placesToPage1(): void {
        this.flags[kFLAGS.PLACES_PAGE] = 0;
        this.places();
    }

    private dungeons(): void {
        this.menu();
        // Turn on dungeons
        if (this.flags[kFLAGS.DISCOVERED_DUNGEON_2_ZETAZ] > 0)
            this.addButton(0, "Deep Cave", kGAMECLASS.enterZetazsLair);
        if (this.player.findStatusAffect(StatusAffects.FoundFactory) >= 0)
            this.addButton(1, "Factory", kGAMECLASS.enterFactory);
        if (this.flags[kFLAGS.DISCOVERED_WITCH_DUNGEON] > 0)
            this.addButton(2, "Desert Cave", kGAMECLASS.enterBoobsDungeon);
        if (this.flags[kFLAGS.D3_DISCOVERED] > 0)
            this.addButton(3, "Stronghold", kGAMECLASS.d3.enterD3);
        this.addButton(9, "Back", this.places);
    }

    private exgartuanCampUpdate(): void {
        // Update Exgartuan stuff
        if (this.player.findStatusAffect(StatusAffects.Exgartuan) >= 0) {
            trace(
                `EXGARTUAN V1: ${this.player.statusAffectv1(
                    StatusAffects.Exgartuan
                )} V2: ${this.player.statusAffectv2(StatusAffects.Exgartuan)}`
            );
            // if too small dick, remove him
            if (
                this.player.statusAffectv1(StatusAffects.Exgartuan) == 1 &&
                (this.player.cockArea(0) < 100 || this.player.cocks.length == 0)
            ) {
                this.outx("", true);
                this.outx(
                    "<b>You suddenly feel the urge to urinate, and stop over by some bushes.  It takes wayyyy longer than normal, and once you've finished, you realize you're alone with yourself for the first time in a long time.",
                    false
                );
                if (this.player.hasCock())
                    this.outx("  Perhaps you got too small for Exgartuan to handle?</b>\n", false);
                else
                    this.outx(
                        "  It looks like the demon didn't want to stick around without your manhood.</b>\n",
                        false
                    );
                this.player.removeStatusAffect(StatusAffects.Exgartuan);
            }
            // Tit removal
            else if (
                this.player.statusAffectv1(StatusAffects.Exgartuan) == 2 &&
                this.player.biggestTitSize() < 12
            ) {
                this.outx("", true);
                this.outx(
                    `<b>Black milk dribbles from your ${this.nippleDescript(
                        0
                    )}.  It immediately dissipates into the air, leaving you feeling alone.  It looks like you became too small for Exgartuan!\n</b>`,
                    false
                );
                this.player.removeStatusAffect(StatusAffects.Exgartuan);
            }
        }
        this.doNext(this.playerMenu);
    }

    /*
    private  fixHistory(): void {
        outx("<b>New history perks are available during creation.  Since this character was created before they were available, you may choose one now!</b>", true);
        flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00418] = 2;
        menu();
        doNext(10036);
    }
    */
}
