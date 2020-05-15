import { BaseContent } from "../../BaseContent";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { PregnancyStore } from "../../PregnancyStore";
import { StatusAffects } from "../../StatusAffects";
import { AntsScene } from "./Desert/AntsScene";
import { NagaScene } from "./Desert/NagaScene";
import { Oasis } from "./Desert/Oasis";
import { SandTrapScene } from "./Desert/SandTrapScene";
import { SandWitchScene } from "./Desert/SandWitchScene";
import { Wanderer } from "./Desert/Wanderer";

/**
 * Created by aimozg on 06.01.14.
 */

export class Desert extends BaseContent {
    public antsScene: AntsScene = new AntsScene();
    public nagaScene: NagaScene = new NagaScene();
    public oasis: Oasis = new Oasis();
    public sandTrapScene: SandTrapScene = new SandTrapScene();
    public sandWitchScene: SandWitchScene = new SandWitchScene();
    public wanderer: Wanderer = new Wanderer();
    // Explore desert
    public exploreDesert(): void {
        this.player.exploredDesert++;
        if (
            this.player.level >= 4 &&
            this.player.exploredDesert % 15 == 0 &&
            this.flags[kFLAGS.DISCOVERED_WITCH_DUNGEON] == 0
        ) {
            kGAMECLASS.enterBoobsDungeon();
            //
            //
            // kGAMECLASS.inDungeon = true;
            //
            //
            // kGAMECLASS.dungeonLoc = 23;
            //
            //
            // eventParser(1);
            return;
        }
        if (Desert.rand(40) == 0) {
            kGAMECLASS.exgartuan.fountainEncounter();
            return;
        }
        // Helia monogamy fucks
        if (
            this.flags[kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 &&
            this.flags[kFLAGS.HEL_RAPED_TODAY] == 0 &&
            Desert.rand(10) == 0 &&
            this.player.gender > 0 &&
            !kGAMECLASS.helScene.followerHel()
        ) {
            kGAMECLASS.helScene.helSexualAmbush();
            return;
        }
        if (
            (this.player.exploredDesert == 20 &&
                this.player.findStatusAffect(StatusAffects.TelAdre) < 0) ||
            (Desert.rand(20) == 0 && this.player.statusAffectv1(StatusAffects.TelAdre) == 0)
        ) {
            kGAMECLASS.telAdre.discoverTelAdre();
            return;
        }
        if (this.sandWitchScene.pregnancy.event == 2 && Desert.rand(4) == 0) {
            if (this.flags[kFLAGS.EGG_WITCH_TYPE] == PregnancyStore.PREGNANCY_DRIDER_EGGS)
                this.sandWitchScene.sammitchBirthsDriders();
            else this.sandWitchScene.witchBirfsSomeBees();
            return;
        }
        // Ant colony debug chances
        if (
            this.player.level >= 5 &&
            this.flags[kFLAGS.ANT_WAIFU] == 0 &&
            this.player.exploredDesert % 8 == 0 &&
            this.flags[kFLAGS.ANTS_PC_FAILED_PHYLLA] == 0 &&
            this.flags[kFLAGS.ANT_COLONY_KEPT_HIDDEN] == 0
        ) {
            this.antsScene.antColonyEncounter();
            return;
        }
        // int over 50?  Chance of alice encounter!
        if (
            Desert.rand(4) == 0 &&
            this.player.inte > 50 &&
            this.flags[kFLAGS.FOUND_WIZARD_STAFF] == 0
        ) {
            this.outx("", true);
            this.outx(
                "While exploring the desert, you see a plume of smoke rising in the distance.  You change direction and approach the soot-cloud carefully.  It takes a few moments, but after cresting your fourth dune, you locate the source.  You lie low, so as not to be seen, and crawl closer for a better look.\n\n",
                false
            );
            this.outx(
                "A library is burning up, sending flames dozens of feet into the air.  It doesn't look like any of the books will survive, and most of the structure has already been consumed by the hungry flames.  The source of the inferno is curled up next to it.  It's a naga!  She's tall for a naga, at least seven feet if she stands at her full height.  Her purplish-blue skin looks quite exotic, and she wears a flower in her hair.  The naga is holding a stick with a potato on the end, trying to roast the spud on the library-fire.  It doesn't seem to be going well, and the potato quickly lights up from the intense heat.\n\n",
                false
            );
            this.outx(
                "The snake-woman tosses the burnt potato away and cries, \"<i>Hora hora.</i>\"  She suddenly turns and looks directly at you.  Her gaze is piercing and intent, but she vanishes before you can react.  The only reminder she was ever there is a burning potato in the sand.   Your curiosity overcomes your caution, and you approach the fiery inferno.  There isn't even a trail in the sand, and the library is going to be an unsalvageable wreck in short order.   Perhaps the only item worth considering is the stick with the burning potato.  It's quite oddly shaped, and when you reach down to touch it you can feel a resonant tingle.  Perhaps it was some kind of wizard's staff?\n\n",
                false
            );
            this.flags[kFLAGS.FOUND_WIZARD_STAFF]++;
            this.inventory.takeItem(this.weapons.W_STAFF, this.camp.returnToCampUseOneHour);
            return;
        }
        // Possible chance of boosting camp space!
        if (this.player.hasKeyItem("Camp - Chest") < 0 && Desert.rand(100) < 10) {
            this.outx(
                "While wandering the trackless sands of the desert, you break the silent monotony with a loud 'thunk'.  You look down and realize you're standing on the lid of an old chest, somehow intact and buried in the sand.  Overcome with curiosity, you dig it out, only to discover that it's empty.  It would make a nice addition to your campsite.\n\nYou decide to bring it back to your campsite.  <b>You now have six storage item slots at camp.</b>",
                true
            );
            this.inventory.createStorage();
            this.inventory.createStorage();
            this.inventory.createStorage();
            this.inventory.createStorage();
            this.inventory.createStorage();
            this.inventory.createStorage();
            this.player.createKeyItem("Camp - Chest", 0, 0, 0, 0);
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // Chance of dick-dragging! 10% + 10% per two foot up to 30%
        this.temp = 10 + ((this.player.longestCockLength() - this.player.tallness) / 24) * 10;
        if (this.temp > 30) this.temp = 30;
        if (
            this.temp > Desert.rand(100) &&
            this.player.longestCockLength() >= this.player.tallness &&
            this.player.totalCockThickness() >= 12
        ) {
            kGAMECLASS.exploration.bigJunkDesertScene();
            return;
        }
        const choices: any[] = [];
        // -8008 is cheating for "no arg"
        const args: any[] = [];

        // Encounter Sandwitch
        if (this.flags[kFLAGS.SAND_WITCH_LEAVE_ME_ALONE] == 0) {
            choices[choices.length] = this.sandWitchScene.encounter;
            args[args.length] = -8008;
        }
        if (this.flags[kFLAGS.CUM_WITCHES_FIGHTABLE] > 0) {
            choices[choices.length] = kGAMECLASS.fightCumWitch;
            args[args.length] = -8008;
        }
        // Encounter Marcus
        choices[choices.length] = this.wanderer.wandererRouter;
        args[args.length] = -8008;
        choices[choices.length] = this.walkingDesertStatBoost;
        args[args.length] = -8008;
        if (Desert.rand(2) == 0 && this.player.level >= 2) {
            if (Desert.rand(2) == 0) {
                choices[choices.length] = this.mirageDesert;
                args[args.length] = -8008;
            } else {
                choices[choices.length] = this.oasis.oasisEncounter;
                args[args.length] = -8008;
            }
        }
        choices[choices.length] = this.nagaScene.nagaEncounter;
        args[args.length] = -8008;
        if (Desert.rand(2) == 0) {
            choices[choices.length] = this.sandTrapScene.encounterASandTarp;
            args[args.length] = -8008;
        }
        const select: number = Desert.rand(choices.length);
        if (args[select] == -8008) {
            choices[select]();
        } else choices[select](args[select]);
    }

    private mirageDesert(): void {
        this.clearOutput();
        this.outx(
            "While exploring the desert, you see a shimmering tower in the distance.  As you rush towards it, it vanishes completely.  It was a mirage!   You sigh, depressed at wasting your time.",
            true
        );
        this.dynStats("lus", -15);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private walkingDesertStatBoost(): void {
        this.clearOutput();
        this.outx("You walk through the shifting sands for an hour, finding nothing.\n\n", true);
        // Chance of boost == 50%
        if (Desert.rand(2) == 0) {
            // 50/50 strength/toughness
            if (Desert.rand(2) == 0 && this.player.str < 50) {
                this.outx(
                    "The effort of struggling with the uncertain footing has made you stronger.",
                    false
                );
                this.dynStats("str", 0.5);
            }
            // Toughness
            else if (this.player.tou < 50) {
                this.outx(
                    "The effort of struggling with the uncertain footing has made you tougher.",
                    false
                );
                this.dynStats("tou", 0.5);
            }
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }
}
