import { trace } from "../console";
import {
    ANAL_LOOSENESS_VIRGIN,
    ANAL_WETNESS_DRY,
    ARM_TYPE_HARPY,
    ARM_TYPE_HUMAN,
    BREAST_CUP_A,
    BREAST_CUP_B,
    BREAST_CUP_C,
    BREAST_CUP_D,
    BREAST_CUP_FLAT,
    BUTT_RATING_AVERAGE,
    BUTT_RATING_LARGE,
    BUTT_RATING_NOTICEABLE,
    BUTT_RATING_TIGHT,
    EARS_BUNNY,
    EARS_CAT,
    EARS_DOG,
    EARS_ELFIN,
    EARS_FOX,
    EARS_HORSE,
    EARS_HUMAN,
    FACE_CAT,
    FACE_DOG,
    FACE_FOX,
    FACE_HORSE,
    FACE_HUMAN,
    FACE_SHARK_TEETH,
    FACE_SPIDER_FANGS,
    GENDER_FEMALE,
    GENDER_MALE,
    HIP_RATING_AMPLE,
    HIP_RATING_AVERAGE,
    HIP_RATING_CURVY,
    HIP_RATING_SLENDER,
    HORNS_DEMON,
    HORNS_DRACONIC_X2,
    HORNS_DRACONIC_X4_12_INCH_LONG,
    HORNS_NONE,
    LOWER_BODY_TYPE_CAT,
    LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS,
    LOWER_BODY_TYPE_DOG,
    LOWER_BODY_TYPE_DRAGON,
    LOWER_BODY_TYPE_HOOFED,
    LOWER_BODY_TYPE_HUMAN,
    SKIN_TYPE_FUR,
    SKIN_TYPE_PLAIN,
    TAIL_TYPE_CAT,
    TAIL_TYPE_DEMONIC,
    TAIL_TYPE_DOG,
    TAIL_TYPE_DRACONIC,
    TAIL_TYPE_FOX,
    TAIL_TYPE_NONE,
    TAIL_TYPE_RABBIT,
    TONUGE_DEMONIC,
    TONUGE_DRACONIC,
    TONUGE_HUMAN,
    TONUGE_SNAKE,
    VAGINA_LOOSENESS_LEVEL_CLOWN_CAR,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_LOOSENESS_TIGHT,
    VAGINA_WETNESS_DROOLING,
    VAGINA_WETNESS_SLAVERING,
    VAGINA_WETNESS_SLICK,
    VAGINA_WETNESS_WET,
    WING_TYPE_BAT_LIKE_LARGE,
    WING_TYPE_DRACONIC_LARGE,
    WING_TYPE_FEATHERED_LARGE,
    WING_TYPE_HARPY,
    WING_TYPE_NONE,
} from "../includes/appearanceDefs";
import { MainView } from "../view/MainView";
import { BaseContent } from "./BaseContent";
import { CockTypesEnum } from "./CockTypesEnum";
import { createFlags } from "./FlagTypeOverrides";
import { kFLAGS } from "./GlobalFlags/kFLAGS";
import { kGAMECLASS } from "./GlobalFlags/kGAMECLASS";
import { GooArmor } from "./Items/Armors/GooArmor";
import { WeaponLib } from "./Items/WeaponLib";
import { PerkLib } from "./PerkLib";
import { PerkType } from "./PerkType";
import { Player } from "./Player";
import { StatusAffects } from "./StatusAffects";

// import flash.events.MouseEvent;

export class CharCreation extends BaseContent {
    private customPlayerProfile: any;

    public newGamePlus(): void {
        this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] = this.player.XP;
        if (this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] == 0)
            this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] = 1;
        while (this.player.level > 1) {
            this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] += this.player.level * 100;
            this.player.level--;
        }
        this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_ITEMS] = this.player.gems;
        this.newGameGo();
    }

    public newGameGo(): void {
        this.funcs = [];
        this.args = [];
        // this.mainView.eventTestInput.x = -10207.5;
        // this.mainView.eventTestInput.y = -1055.1;
        this.hideStats();
        this.hideUpDown();
        const input = document.createElement("input");
        this.mainView.hideMenuButton(MainView.MENU_NEW_MAIN);
        this.mainView.hideMenuButton(MainView.MENU_DATA);
        this.mainView.hideMenuButton(MainView.MENU_LEVEL);
        this.mainView.hideMenuButton(MainView.MENU_PERKS);
        // Hide perk boxes
        // this.mainView.aCb.visible = false;
        // If first PC, track status of EZ mode and other such nonsense.
        const silly = !!this.flags[kFLAGS.SILLY_MODE_ENABLE_FLAG];
        const easy = !!this.flags[kFLAGS.EASY_MODE_ENABLE_FLAG];
        const sprite = !!this.flags[kFLAGS.SHOW_SPRITES_FLAG];
        this.mainView.newGameButton.labelText = "Newgame"; // b1Text.text = "Newgame";
        // flags[kFLAGS.CUSTOM_PC_ENABLED] = 0;

        this.clearOutput();
        this.outx(
            "You grew up in the small village of Ingnam, a remote village with rich traditions, buried deep in the wilds.  Every year for as long as you can remember, your village has chosen a champion to send to the cursed Demon Realm.  Legend has it that in years Ingnam has failed to produce a champion, chaos has reigned over the countryside.  Children disappear, crops wilt, and disease spreads like wildfire.  This year, <b>you</b> have been selected to be the champion.\n\nWhat is your name?"
        );

        this.menu();
        this.addButton(0, "OK", () => this.chooseName(input));
        this.mainView.mainText.appendChild(input);

        // Reset autosave
        this.player.slotName = "VOID";
        this.player.autoSave = false;
        // RESET DUNGEOn
        // No need, dungeonLoc = 0 does this:
        //  kGAMECLASS.inDungeon = false;
        kGAMECLASS.dungeonLoc = 0;
        kGAMECLASS.inRoomedDungeon = false;
        kGAMECLASS.inRoomedDungeonResume = undefined;
        // Hold onto old data for NG+
        const oldPlayer: Player = this.player;
        // Reset all standard stats
        this.player = new Player();
        this.model.player = this.player;
        this.player.str = 15;
        this.player.tou = 15;
        this.player.spe = 15;
        this.player.inte = 15;
        this.player.sens = 15;
        this.player.lib = 15;
        this.player.cor = 0;
        this.player.lust = 15;

        kGAMECLASS.notes = "No Notes Available.";
        this.player.XP = this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP];
        this.player.level = 1;
        this.player.HP = this.player.maxHP();
        this.player.gems = this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_ITEMS];
        this.player.skinType = SKIN_TYPE_PLAIN;
        this.player.faceType = FACE_HUMAN;
        this.player.tailType = TAIL_TYPE_NONE;
        this.player.tongueType = TONUGE_HUMAN;
        this.player.beardLength = 0;
        this.player.beardStyle = 0;
        this.player.skinDesc = "skin";
        this.player.cumMultiplier = 1;
        this.player.hoursSinceCum = 0;
        this.player.ass.analLooseness = ANAL_LOOSENESS_VIRGIN;
        this.player.ass.analWetness = ANAL_WETNESS_DRY;
        this.player.ass.fullness = 0;
        this.player.fatigue = 0;
        this.player.horns = 0;
        this.player.tailVenom = 0;
        this.player.tailRecharge = 0;
        this.player.wingType = WING_TYPE_NONE;
        this.player.wingDesc = "non-existant";
        // Exploration
        this.player.explored = 0;
        this.player.exploredForest = 0;
        this.player.exploredDesert = 0;
        this.player.exploredMountain = 0;
        this.player.exploredLake = 0;
        // Inventory clear
        this.player.itemSlot1.unlocked = true;
        this.player.itemSlot1.emptySlot();
        this.player.itemSlot2.unlocked = true;
        this.player.itemSlot2.emptySlot();
        this.player.itemSlot3.unlocked = true;
        this.player.itemSlot3.emptySlot();
        this.player.itemSlot4.unlocked = false;
        this.player.itemSlot4.emptySlot();
        this.player.itemSlot5.unlocked = false;
        this.player.itemSlot5.emptySlot();
        // PIERCINGS
        this.player.nipplesPierced = 0;
        this.player.nipplesPShort = "";
        this.player.nipplesPLong = "";
        this.player.lipPierced = 0;
        this.player.lipPShort = "";
        this.player.lipPLong = "";
        this.player.tonguePierced = 0;
        this.player.tonguePShort = "";
        this.player.tonguePLong = "";
        this.player.eyebrowPierced = 0;
        this.player.eyebrowPShort = "";
        this.player.eyebrowPLong = "";
        this.player.earsPierced = 0;
        this.player.earsPShort = "";
        this.player.earsPLong = "";
        this.player.nosePierced = 0;
        this.player.nosePShort = "";
        this.player.nosePLong = "";
        // PLOTZ
        kGAMECLASS.monk = 0;
        kGAMECLASS.whitney = 0;
        kGAMECLASS.sand = 0;
        // Replaced by flag kGAMECLASS.beeProgress = 0;
        kGAMECLASS.giacomo = 0;
        // Lets get this bitch started
        kGAMECLASS.inCombat = false;
        // NG+ Clothes reset
        if (this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_ITEMS] != 0) {
            // Clear Raphael's training variable so it does not effect
            // Weapon strength post-newgame.
            this.flags[kFLAGS.RAPHAEL_RAPIER_TRANING] = 0;

            if (!(oldPlayer.armor instanceof GooArmor)) {
                this.player.setArmor(oldPlayer.armor);
            } else {
                this.player.setArmor(this.armors.C_CLOTH);
            }

            this.player.setWeapon(oldPlayer.weapon);
        }
        // Clothes clear
        else {
            this.player.setArmor(this.armors.C_CLOTH);
            this.player.setWeapon(WeaponLib.FISTS);
        }
        // Clear plot storage array!
        this.flags = createFlags();

        // Remember silly/sprite/etc
        if (sprite) this.flags[kFLAGS.SHOW_SPRITES_FLAG] = true;
        if (easy) this.flags[kFLAGS.EASY_MODE_ENABLE_FLAG] = 1;
        if (silly) this.flags[kFLAGS.SILLY_MODE_ENABLE_FLAG] = true;
        // Set that jojo debug doesn't need to run
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00102] = 1;
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_02999] = 3;
        // Time reset
        this.model.time.days = 0;
        this.model.time.hours = 0;
        // Clear cocks
        while (this.player.cocks.length > 0) {
            this.player.removeCock(0, 1);
            trace("1 cock purged.");
        }
        // Clear vaginas
        while (this.player.vaginas.length > 0) {
            this.player.removeVagina(0, 1);
            trace("1 vagina purged.");
        }
        // Clear breasts
        this.player.breastRows = [];

        // Clear Statuses
        while (this.player.statusAffects.length > 0) {
            this.player.removeStatuses();
        }
        // Clear old camp slots
        this.inventory.clearStorage();
        this.inventory.clearGearStorage();
        // Initialize gearStorage
        this.inventory.initializeGearStorage();
    }

    private chooseName(input: HTMLInputElement): void {
        // if (kGAMECLASS.testingBlockExiting) {
        // We're running under the testing script.
        // Stuff a name in the box and go go go
        // input.value = "Derpy";
        // return;
        // }
        if (input.value == "") {
            // If part of newgame+, don't fully wipe.
            if (this.player.XP > 0 && this.player.explored == 0) {
                this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] = this.player.XP;
                if (this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] == 0)
                    this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] = 1;
                while (this.player.level > 1) {
                    this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] += this.player.level * 100;
                    this.player.level--;
                }
                this.flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_ITEMS] = this.player.gems;
            }
            this.newGameGo();
            this.outx("\n\n\n<b>You must select a name.</b>");
            // this.mainView.mainText.appendChild(input);
            return;
        }
        this.clearOutput();
        this.player.short = input.value;
        this.customPlayerProfile = this.customName(input.value);
        this.menu();
        if (this.customPlayerProfile != undefined) {
            this.outx(
                "This name, like you, is special.  Do you live up to your name or continue on, assuming it to be coincidence?"
            );
            this.addButton(0, "SpecialName", () => this.useCustomProfile(input.value));
            this.addButton(1, "Continue On", this.noCustomProfile);
        } else {
            // Proceed with normal character creation
            this.outx("\n\n\n\nAre you a man or a woman?");
            this.addButton(0, "Man", this.isAMan);
            this.addButton(1, "Woman", this.isAWoman);
        }
    }

    private useCustomProfile(name: string): void {
        this.clearOutput();
        if (this.specialName(name) != undefined) {
            this.clearOutput();
            this.outx(
                "Your name defines everything about you, and as such, it is time to wake...\n\n"
            );
            this.flags[kFLAGS.HISTORY_PERK_SELECTED] = 1;
            this.completeCharacterCreation(); // Skip character creation, customPlayerProfile will be called in completeCharacterCreation
        } else {
            // After character creation the fact that customPlayerProfile is not undefined will activate a custom player setup
            this.outx(
                "There is something different about you, but first, what is your basic gender?  An individual such as you may later overcome this, of course..."
            );
            this.outx("\n\n\n\nAre you a man or a woman?");
            this.menu();
            this.addButton(0, "Man", this.isAMan);
            this.addButton(1, "Woman", this.isAWoman);
        }
    }

    private noCustomProfile(): void {
        this.clearOutput();
        this.customPlayerProfile = undefined;
        this.outx(
            "Your name carries little significance beyond it being your name.  What is your gender?"
        );
        this.menu();
        this.addButton(0, "Man", this.isAMan);
        this.addButton(1, "Woman", this.isAWoman);
    }

    // Determines if has character creation bonuses
    private customName(arg: string) {
        switch (arg) {
            case "Aria":
                return this.customAria;
            case "Betram":
                return this.customBetram;
            case "Charaun":
                return this.customCharaun;
            case "Cody":
                return this.customCody;
            case "Galatea":
                return this.customGalatea;
            case "Gundam":
                return this.customGundam;
            case "Hikari":
                return this.customHikari;
            case "Katti":
                return this.customKatti;
            case "Lucina":
                return this.customLucina;
            case "Navorn":
                return this.customNavorn;
            case "Rope":
                return this.customRope;
            case "Sora":
                return this.customSora;
            default:
        }
        return this.specialName(arg); // Must check against the special name list as well
    }

    // Does PC skip creation?
    private specialName(arg: string) {
        switch (arg) {
            case "Annetta":
                return this.customAnnetta;
            case "Ceveo":
                return this.customCeveo;
            case "Charlie":
                return this.customCharlie;
            case "Isaac":
                return this.customIsaac;
            case "Leah":
                return this.customLeah;
            case "Lukaz":
                return this.customLukaz;
            case "Mara":
                return this.customMara;
            case "Mihari":
                return this.customMihari;
            case "Mirvanna":
                return this.customMirvanna;
            case "Nami":
                return this.customNami;
            case "Nixi":
                return this.customNixi;
            case "Prismere":
                return this.customPrismere;
            case "Rann Rayla":
                return this.customRannRayla;
            case "Sera":
                return this.customSera;
            case "Siveen":
                return this.customSiveen;
            case "TestChar":
                return this.customTestChar;
            case "Tyriana":
                return this.customTyriana;
            case "Vahdunbrii":
                return this.customVahdunbrii;
            default:
        }
        return undefined;
    }

    private isAMan(): void {
        this.player.str += 3;
        this.player.tou += 2;

        this.player.balls = 2;
        this.player.ballSize = 1;
        this.player.clitLength = 0;
        this.player.fertility = 5;
        this.player.hairLength = 1;
        this.player.tallness = 71;
        this.player.tone = 60;

        this.player.createBreastRow();
        this.player.createCock();
        this.player.cocks[0].cockLength = 5.5;
        this.player.cocks[0].cockThickness = 1;
        this.player.cocks[0].cockType = CockTypesEnum.HUMAN;
        this.player.cocks[0].knotMultiplier = 1;
        this.player.gender = GENDER_MALE;
        this.clearOutput();
        this.outx(
            "You are a man.  Your upbringing has provided you an advantage in strength and toughness.\n\nWhat type of build do you have?"
        );
        this.simpleChoices(
            "Lean",
            this.buildLeanMale,
            "Average",
            this.buildAverageMale,
            "Thick",
            this.buildThickMale,
            "Girly",
            this.buildGirlyMale,
            "",
            undefined
        );
    }

    private isAWoman(): void {
        this.player.spe += 3;
        this.player.inte += 2;

        this.player.balls = 0;
        this.player.ballSize = 0;
        this.player.clitLength = 0.5;
        this.player.fertility = 10;
        this.player.hairLength = 10;
        this.player.tallness = 67;
        this.player.tone = 30;

        this.player.createBreastRow();
        this.player.createVagina();
        this.player.gender = GENDER_FEMALE;
        this.clearOutput();
        this.outx(
            "You are a woman.  Your upbringing has provided you an advantage in speed and intellect.\n\nWhat type of build do you have?"
        );
        this.simpleChoices(
            "Slender",
            this.buildSlenderFemale,
            "Average",
            this.buildAverageFemale,
            "Curvy",
            this.buildCurvyFemale,
            "Tomboyish",
            this.buildTomboyishFemale,
            "",
            undefined
        );
    }

    private buildLeanMale(): void {
        this.player.str -= 1;
        this.player.spe += 1;

        this.player.femininity = 34;
        this.player.thickness = 30;
        this.player.tone += 5;

        this.player.breastRows[0].breastRating = BREAST_CUP_FLAT;
        this.player.buttRating = BUTT_RATING_TIGHT;
        this.player.hipRating = HIP_RATING_SLENDER;
        this.chooseComplexion();
    }

    private buildSlenderFemale(): void {
        this.player.str -= 1;
        this.player.spe += 1;

        this.player.femininity = 66;
        this.player.thickness = 30;
        this.player.tone += 5;

        this.player.breastRows[0].breastRating = BREAST_CUP_B;
        this.player.buttRating = BUTT_RATING_TIGHT;
        this.player.hipRating = HIP_RATING_AMPLE;
        this.chooseComplexion();
    }

    private buildAverageMale(): void {
        this.player.femininity = 30;
        this.player.thickness = 50;

        this.player.breastRows[0].breastRating = BREAST_CUP_FLAT;
        this.player.buttRating = BUTT_RATING_AVERAGE;
        this.player.hipRating = HIP_RATING_AVERAGE;
        this.chooseComplexion();
    }

    private buildAverageFemale(): void {
        this.player.femininity = 70;
        this.player.thickness = 50;

        this.player.breastRows[0].breastRating = BREAST_CUP_C;
        this.player.buttRating = BUTT_RATING_NOTICEABLE;
        this.player.hipRating = HIP_RATING_AMPLE;
        this.chooseComplexion();
    }

    private buildThickMale(): void {
        this.player.spe -= 4;
        this.player.str += 2;
        this.player.tou += 2;

        this.player.femininity = 29;
        this.player.thickness = 70;
        this.player.tone -= 5;

        this.player.breastRows[0].breastRating = BREAST_CUP_FLAT;
        this.player.buttRating = BUTT_RATING_NOTICEABLE;
        this.player.hipRating = HIP_RATING_AVERAGE;
        this.chooseComplexion();
    }

    private buildCurvyFemale(): void {
        this.player.spe -= 2;
        this.player.str += 1;
        this.player.tou += 1;

        this.player.femininity = 71;
        this.player.thickness = 70;

        this.player.breastRows[0].breastRating = BREAST_CUP_D;
        this.player.buttRating = BUTT_RATING_LARGE;
        this.player.hipRating = HIP_RATING_CURVY;
        this.chooseComplexion();
    }

    private buildGirlyMale(): void {
        this.player.str -= 2;
        this.player.spe += 2;

        this.player.femininity = 50;
        this.player.thickness = 50;
        this.player.tone = 26;

        this.player.breastRows[0].breastRating = BREAST_CUP_A;
        this.player.buttRating = BUTT_RATING_NOTICEABLE;
        this.player.hipRating = HIP_RATING_SLENDER;
        this.chooseComplexion();
    }

    private buildTomboyishFemale(): void {
        this.player.str += 1;
        this.player.spe -= 1;

        this.player.femininity = 56;
        this.player.thickness = 50;
        this.player.tone = 50;

        this.player.breastRows[0].breastRating = BREAST_CUP_A;
        this.player.buttRating = BUTT_RATING_TIGHT;
        this.player.hipRating = HIP_RATING_SLENDER;
        this.chooseComplexion();
    }

    private chooseComplexion(): void {
        this.clearOutput();
        this.outx("What is your complexion?");
        this.menu();
        this.addButton(0, "Light", this.setComplexion, "light");
        this.addButton(1, "Olive", this.setComplexion, "olive");
        this.addButton(2, "Dark", this.setComplexion, "dark");
        this.addButton(3, "Ebony", this.setComplexion, "ebony");
    }

    private setComplexion(choice: string): void {
        // And choose hair
        this.player.skinTone = choice;
        this.clearOutput();
        this.outx(`You selected a ${choice} complexion.\n\nWhat color is your hair?`);
        this.menu();
        this.addButton(0, "Blonde", this.setHair, "blonde");
        this.addButton(1, "Brown", this.setHair, "brown");
        this.addButton(2, "Black", this.setHair, "black");
        this.addButton(3, "Red", this.setHair, "red");
        this.addButton(4, "Gray", this.setHair, "gray");
        this.addButton(5, "White", this.setHair, "white");
        this.addButton(6, "Auburn", this.setHair, "auburn");
    }

    private setHair(choice: string): void {
        this.player.hairColor = choice;
        this.clearOutput();
        this.outx(`You have ${this.hairDescript()}.`);
        this.chooseEndowment(false);
    }

    private chooseEndowment(clear: boolean): void {
        if (clear) this.clearOutput();
        this.outx("Every person is born with a gift.  What's yours?");
        this.menu();
        this.addButton(0, "Strength", this.confirmEndowmentStrength);
        this.addButton(1, "Toughness", this.confirmEndowmentThoughness);
        this.addButton(2, "Speed", this.confirmEndowmentSpeed);
        this.addButton(3, "Smarts", this.confirmEndowmentSmarts);
        this.addButton(4, "Libido", this.confirmEndowmentLibido);
        this.addButton(5, "Touch", this.confirmEndowmentTouch);
        if (this.player.hasCock()) {
            this.addButton(6, "Big Cock", this.confirmEndowmentBigCock);
            this.addButton(7, "Lots of Jizz", this.confirmEndowmentMessyOrgasms);
        } else {
            this.addButton(6, "Big Breasts", this.confirmEndowmentBigBreasts);
            this.addButton(7, "Big Clit", this.confirmEndowmentBigClit);
            this.addButton(8, "Fertile", this.confirmEndowmentFertile);
            this.addButton(9, "Wet Vagina", this.confirmEndowmentWetVagina);
        }
    }

    private confirmEndowmentStrength(): void {
        this.clearOutput();
        this.outx(
            "Are you stronger than normal? (+5 Strength)\n\nStrength increases your combat damage, and your ability to hold on to an enemy or pull yourself away."
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentStrength);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private confirmEndowmentThoughness(): void {
        this.clearOutput();
        this.outx(
            "Are you unusually tough? (+5 Toughness)\n\nToughness gives you more HP and increases the chances an attack against you will fail to wound you."
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentToughness);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private confirmEndowmentSpeed(): void {
        this.clearOutput();
        this.outx(
            "Are you very quick?  (+5 Speed)\n\nSpeed makes it easier to escape combat and grapples.  It also boosts your chances of evading an enemy attack and successfully catching up to enemies who try to run."
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentSpeed);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private confirmEndowmentSmarts(): void {
        this.clearOutput();
        this.outx(
            "Are you a quick learner?  (+5 Intellect)\n\nIntellect can help you avoid dangerous monsters or work with machinery.  It will also boost the power of any spells you may learn in your travels."
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentSmarts);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private confirmEndowmentLibido(): void {
        this.clearOutput();
        this.outx(
            "Do you have an unusually high sex-drive?  (+5 Libido)\n\nLibido affects how quickly your lust builds over time.  You may find a high libido to be more trouble than it's worth..."
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentLibido);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private confirmEndowmentTouch(): void {
        this.clearOutput();
        this.outx(
            "Is your skin unusually sensitive?  (+5 Sensitivity)\n\nSensitivity affects how easily touches and certain magics will raise your lust.  Very low sensitivity will make it difficult to orgasm."
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentTouch);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private confirmEndowmentBigCock(): void {
        this.clearOutput();
        this.outx(
            'Do you have a big cock?  (+2" Cock Length)\n\nA bigger cock will make it easier to get off any sexual partners, but only if they can take your size.'
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentBigCock);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private confirmEndowmentMessyOrgasms(): void {
        this.clearOutput();
        this.outx(
            "Are your orgasms particularly messy?  (+50% Cum Multiplier)\n\nA higher cum multiplier will cause your orgasms to be messier."
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentMessyOrgasms);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private confirmEndowmentBigBreasts(): void {
        this.clearOutput();
        this.outx(
            "Are your breasts bigger than average? (DD cups)\n\nLarger breasts will allow you to lactate greater amounts, tit-fuck larger cocks, and generally be a sexy bitch."
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentBigBreasts);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private confirmEndowmentBigClit(): void {
        this.clearOutput();
        this.outx(
            'Do you have a big clit?  (1" Long)\n\nA large enough clit may eventually become as large as a cock.  It also makes you gain lust much faster during oral or manual stimulation.'
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentBigClit);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private confirmEndowmentFertile(): void {
        this.clearOutput();
        this.outx(
            "Is your family particularly fertile?  (+15% Fertility)\n\nA high fertility will cause you to become pregnant much more easily.  Pregnancy may result in: Strange children, larger bust, larger hips, a bigger ass, and other weirdness."
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentFertile);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private confirmEndowmentWetVagina(): void {
        this.clearOutput();
        this.outx(
            "Does your pussy get particularly wet?  (+1 Vaginal Wetness)\n\nVaginal wetness will make it easier to take larger cocks, in turn helping you bring the well-endowed to orgasm quicker."
        );
        this.menu();
        this.addButton(0, "Yes", this.setEndowmentWetVagina);
        this.addButton(1, "No", this.chooseEndowment, true);
    }

    private setEndowmentStrength(): void {
        this.player.str += 5;
        this.player.tone += 7;
        this.player.thickness += 3;
        // Add bonus +25% strength gain
        this.player.createPerk(PerkLib.Strong, 0.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentToughness(): void {
        this.player.tou += 5;
        this.player.tone += 5;
        this.player.thickness += 5;
        this.player.createPerk(PerkLib.Tough, 0.25, 0, 0, 0);
        this.player.HP = kGAMECLASS.maxHP();
        this.chooseHistory();
    }

    private setEndowmentSpeed(): void {
        this.player.spe += 5;
        this.player.tone += 10;
        this.player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentSmarts(): void {
        this.player.inte += 5;
        this.player.thickness -= 5;
        this.player.createPerk(PerkLib.Smart, 0.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentLibido(): void {
        this.player.lib += 5;
        this.player.createPerk(PerkLib.Lusty, 0.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentTouch(): void {
        this.player.sens += 5;
        this.player.createPerk(PerkLib.Sensitive, 0.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentBigCock(): void {
        this.player.femininity -= 5;
        this.player.cocks[0].cockLength = 8;
        this.player.cocks[0].cockThickness = 1.5;
        trace("Creation - cock modded to 8inches");
        this.player.createPerk(PerkLib.BigCock, 1.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentMessyOrgasms(): void {
        this.player.femininity -= 2;
        this.player.cumMultiplier = 1.5;
        this.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentBigBreasts(): void {
        this.player.femininity += 5;
        this.player.breastRows[0].breastRating += 2;
        this.player.createPerk(PerkLib.BigTits, 1.5, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentBigClit(): void {
        this.player.femininity -= 5;
        this.player.clitLength = 1;
        this.player.createPerk(PerkLib.BigClit, 1.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentFertile(): void {
        this.player.femininity += 5;
        this.player.fertility += 25;
        this.player.hipRating += 2;
        this.player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentWetVagina(): void {
        this.player.femininity += 7;
        this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_WET;
        this.player.createPerk(PerkLib.WetPussy, 2, 0, 0, 0);
        this.chooseHistory();
    }

    public chooseHistory(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.HISTORY_PERK_SELECTED] != 0) {
            // This flag can only be non-zero if chooseHistory is called from camp.as
            this.outx(
                "<b>New history perks are available during creation.  Since this character was created before they were available, you may choose one now!</b>\n\n"
            );
        }
        this.outx(
            "Before you became a champion, you had other plans for your life.  What were you doing before?"
        );
        this.menu();
        this.addButton(0, "Alchemy", this.confirmHistory, PerkLib.HistoryAlchemist);
        this.addButton(1, "Fighting", this.confirmHistory, PerkLib.HistoryFighter);
        this.addButton(2, "Healing", this.confirmHistory, PerkLib.HistoryHealer);
        this.addButton(3, "Religion", this.confirmHistory, PerkLib.HistoryReligious);
        this.addButton(4, "Schooling", this.confirmHistory, PerkLib.HistoryScholar);
        this.addButton(5, "Slacking", this.confirmHistory, PerkLib.HistorySlacker);
        this.addButton(6, "Slutting", this.confirmHistory, PerkLib.HistorySlut);
        this.addButton(7, "Smithing", this.confirmHistory, PerkLib.HistorySmith);
        this.addButton(8, "Whoring", this.confirmHistory, PerkLib.HistoryWhore);
    }

    private confirmHistory(choice: PerkType): void {
        this.clearOutput();
        switch (choice) {
            case PerkLib.HistoryAlchemist:
                this.outx(
                    "You spent some time as an alchemist's assistant, and alchemical items always seem to be more reactive in your hands.  Is this your history?"
                );
                break;
            case PerkLib.HistoryFighter:
                this.outx(
                    "You spent much of your time fighting other children, and you had plans to find work as a guard when you grew up.  You do 10% more damage with physical attacks.  Is this your history?"
                );
                break;
            case PerkLib.HistoryHealer:
                this.outx(
                    "You often spent your free time with the village healer, learning how to tend to wounds.  Healing items and effects are 20% more effective.  Is this your history?"
                );
                break;
            case PerkLib.HistoryReligious:
                this.outx(
                    "You spent a lot of time at the village temple, and learned how to meditate.  The 'masturbation' option is replaced with 'meditate' when corruption is at or below 66.  Is this your history?"
                );
                break;
            case PerkLib.HistoryScholar:
                this.outx(
                    "You spent much of your time in school, and even begged the richest man in town, Mr. Savin, to let you read some of his books.  You are much better at focusing, and spellcasting uses 20% less fatigue.  Is this your history?"
                );
                break;
            case PerkLib.HistorySlacker:
                this.outx(
                    "You spent a lot of time slacking, avoiding work, and otherwise making a nuisance of yourself.  Your efforts at slacking have made you quite adept at resting, and your fatigue comes back 20% faster.  Is this your history?"
                );
                break;
            case PerkLib.HistorySlut:
                this.outx(
                    "You managed to spend most of your time having sex.  Quite simply, when it came to sex, you were the village bicycle - everyone got a ride.  Because of this, your body is a bit more resistant to penetrative stretching, and has a higher upper limit on what exactly can be inserted.  Is this your history?"
                );
                break;
            case PerkLib.HistorySmith:
                this.outx(
                    "You managed to get an apprenticeship with the local blacksmith.  Because of your time spent at the blacksmith's side, you've learned how to fit armor for maximum protection.  Is this your history?"
                );
                break;
            default:
                this.outx(
                    "You managed to find work as a whore.  Because of your time spent trading seduction for profit, you're more effective at teasing (+15% tease damage).  Is this your history?"
                );
        }
        this.menu();
        this.addButton(0, "Yes", this.setHistory, choice);
        this.addButton(1, "No", this.chooseHistory);
    }

    private setHistory(choice: PerkType): void {
        this.player.createPerk(choice, 0, 0, 0, 0);
        if (choice == PerkLib.HistorySlut || choice == PerkLib.HistoryWhore) {
            if (this.player.hasVagina()) {
                this.player.vaginas[0].virgin = false;
                this.player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_LOOSE;
            }
            this.player.ass.analLooseness = 1;
        }
        if (this.flags[kFLAGS.HISTORY_PERK_SELECTED] == 0) {
            this.flags[kFLAGS.HISTORY_PERK_SELECTED] = 1;
            this.completeCharacterCreation();
        } else {
            // Special escape clause for very old saves that do not have a history perk. This is used to allow them the chance to select a perk at camp on load.
            this.flags[kFLAGS.HISTORY_PERK_SELECTED] = 1;
            this.playerMenu();
        }
    }

    private completeCharacterCreation(): void {
        if (this.customPlayerProfile != undefined) {
            this.customPlayerProfile();
            this.doNext(this.arrival);
            return;
        }
        this.arrival();
    }

    private arrival(): void {
        this.statScreenRefresh();
        this.model.time.hours = 11;
        this.clearOutput();
        this.outx(
            "You are prepared for what is to come.  Most of the last year has been spent honing your body and mind to prepare for the challenges ahead.  You are the Champion of Ingnam.  The one who will journey to the demon realm and guarantee the safety of your friends and family, even though you'll never see them again.  You wipe away a tear as you enter the courtyard and see Elder Nomur waiting for you.  You are ready.\n\n"
        );
        this.outx(
            "The walk to the tainted cave is long and silent.  Elder Nomur does not speak.  There is nothing left to say.  The two of you journey in companionable silence.  Slowly the black rock of Mount Ilgast looms closer and closer, and the temperature of the air drops.   You shiver and glance at the Elder, noticing he doesn't betray any sign of the cold.  Despite his age of nearly 80, he maintains the vigor of a man half his age.  You're glad for his strength, as assisting him across this distance would be draining, and you must save your energy for the trials ahead.\n\n"
        );
        this.outx(
            "The entrance of the cave gapes open, sharp stalactites hanging over the entrance, giving it the appearance of a monstrous mouth.  Elder Nomur stops and nods to you, gesturing for you to proceed alone.\n\n"
        );
        this.outx("The cave is unusually warm and damp, ");
        if (this.player.gender == GENDER_FEMALE)
            this.outx(
                "and your body seems to feel the same way, flushing as you feel a warmth and dampness between your thighs. "
            );
        else
            this.outx(
                "and your body reacts with a sense of growing warmth focusing in your groin, your manhood hardening for no apparent reason. "
            );
        this.outx(
            "You were warned of this and press forward, ignoring your body's growing needs.  A glowing purple-pink portal swirls and flares with demonic light along the back wall.  Cringing, you press forward, keenly aware that your body seems to be anticipating coming in contact with the tainted magical construct.  Closing your eyes, you gather your resolve and leap forwards.  Vertigo overwhelms you and you black out..."
        );
        this.showStats();
        this.dynStats("lus", 15);
        this.doNext(this.arrivalPartTwo);
    }

    private arrivalPartTwo(): void {
        this.clearOutput();
        this.hideUpDown();
        this.dynStats("lus", 40, "cor", 2);
        this.model.time.hours = 18;
        this.outx(
            "You wake with a splitting headache and a body full of burning desire.  A shadow darkens your view momentarily and your training kicks in.  You roll to the side across the bare ground and leap to your feet.  A surprised looking imp stands a few feet away, holding an empty vial.  He's completely naked, an improbably sized pulsing red cock hanging between his spindly legs.  You flush with desire as a wave of lust washes over you, your mind reeling as you fight "
        );
        if (this.player.gender == GENDER_FEMALE)
            this.outx("the urge to chase down his rod and impale yourself on it.\n\n");
        else
            this.outx(
                "the urge to ram your cock down his throat.  The strangeness of the thought surprises you.\n\n"
            );
        this.outx(
            "The imp says, \"<i>I'm amazed you aren't already chasing down my cock, human.  The last Champion was an eager whore for me by the time she woke up.  This lust draft made sure of it.</i>\""
        );
        this.doNext(this.arrivalPartThree);
    }

    private arrivalPartThree(): void {
        this.clearOutput();
        this.hideUpDown();
        this.dynStats("lus", -30);
        this.outx(
            "The imp shakes the empty vial to emphasize his point.  You reel in shock at this revelation - you've just entered the demon realm and you've already been drugged!  You tremble with the aching need in your groin, but resist, righteous anger lending you strength.\n\nIn desperation you leap towards the imp, watching with glee as his cocky smile changes to an expression of sheer terror.  The smaller creature is no match for your brute strength as you pummel him mercilessly.  You pick up the diminutive demon and punt him into the air, frowning grimly as he spreads his wings and begins speeding into the distance.\n\n"
        );
        this.outx(
            'The imp says, "<i>FOOL!  You could have had pleasure unending... but should we ever cross paths again you will regret humiliating me!  Remember the name Zetaz, as you\'ll soon face the wrath of my master!</i>"\n\n'
        );
        this.outx(
            "Your pleasure at defeating the demon ebbs as you consider how you've already been defiled.  You swear to yourself you will find the demon responsible for doing this to you and the other Champions, and destroy him AND his pet imp."
        );
        this.doNext(this.arrivalPartFour);
    }

    private arrivalPartFour(): void {
        this.clearOutput();
        this.hideUpDown();
        this.outx(
            "You look around, surveying the hellish landscape as you plot your next move.  The portal is a few yards away, nestled between a formation of rocks.  It does not seem to exude the arousing influence it had on the other side.  The ground and sky are both tinted different shades of red, though the earth beneath your feet feels as normal as any other lifeless patch of dirt.   You settle on the idea of making a camp here and fortifying this side of the portal.  No demons will ravage your beloved hometown on your watch.\n\nIt does not take long to set up your tent and a few simple traps.  You'll need to explore and gather more supplies to fortify it any further.  Perhaps you will even manage to track down the demons who have been abducting the other champions!"
        );
        this.doNext(this.playerMenu);
    }

    private customAnnetta(): void {
        this.outx(
            "You're a rather well-endowed hermaphrodite that sports a thick, dog-knotted cock, an unused pussy, and a nice, stretchy butt-hole.  You've also got horns and demonic high-heels on your feet.  It makes you wonder why you would ever get chosen to be champion!"
        );
        // Specific Character "Gender: Herm
        // Penis: 13 inch long 3 inch wide penis, dog shaped, 6.5 inch knot
        // Balls: Four 5 inch wide
        // Vagina: Tight, virgin, 0.5 inch clitoris
        this.player.createVagina();
        this.player.createCock();
        this.player.createBreastRow();
        this.player.clitLength = 0.5;
        this.player.tallness = 67;
        this.player.femininity = 90;
        this.player.balls = 2;
        this.player.ballSize = 5;
        this.player.cocks[0].cockLength = 13;
        this.player.cocks[0].cockThickness = 3;
        this.player.cocks[0].knotMultiplier = 2.2;
        // Butt: Loose" "Skin: Purple
        this.player.ass.analLooseness = 3;
        this.player.skinTone = "purple";
        // Hair: Back length orange
        this.player.hairLength = 30;
        this.player.hairColor = "orange";
        // Face: Elf ears, 4x demonic horns
        this.player.earType = EARS_ELFIN;
        this.player.horns = 4;
        this.player.hornType = HORNS_DEMON;
        // Body: Plump, no muscle tone, wide thighs, badonkulous ass, demon tail, demonic high heels
        this.player.thickness = 75;
        this.player.tone = 0;
        this.player.hipRating = 17;
        this.player.buttRating = 17;
        this.player.tailType = TAIL_TYPE_DEMONIC;
        this.player.lowerBody = LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS;
        // Breasts: J-cups with 5 inch fuckable nipples, leaking milk
        this.player.breastRows[0].breastRating = 28;
        this.player.nippleLength = 5;
        this.player.breastRows[0].lactationMultiplier += 20;

        // Equipment: Starts with spiked fist
        this.player.setWeapon(this.weapons.S_GAUNT);
        // Perks: Fighter and Lotsa Jizz" Annetta
        this.player.createPerk(PerkLib.HistoryFighter, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
        this.player.cumMultiplier = 20;
        this.player.gender = 3;
    }

    private customAria(): void {
        this.outx(
            "It's really no surprise that you were sent through the portal to deal with the demons - you look enough like one as-is.  Your numerous fetish-inducing piercings, magical fox-tails, and bimbo-licious personality were all the motivation the elders needed to keep you from corrupting the village youth."
        );
        // 2/26/2013 8:18:21 rdolave@gmail.com Character Creation "female DD breasts feminity 100 butt size 5 hip size 5 body thickness 10 clit I would like her nipples pierced with Ceraphs piercing
        // (on a side note how much do you think it would cost to add bell nipple,labia and clit piercings as well as an option for belly button piercings would like to see belly button piecings with a few different options as well.  Also would love to have handcuff ear piercings.)" Would like the bimbo brain and bimbo body perks as well as the nine tail PerkLib.  demonic high heels, pink skin, obscenely long pink hair  would like her to be a kitsune with the nine tails.  pink fur.  starting equipment would like to be the succubus whip and nurse's outfit.  Also would like the xmas perk and all three Vday perks Aria
        if (!this.player.hasVagina()) this.player.createVagina();
        if (this.player.femininity < 80) this.player.femininity = 80;
        this.player.createPerk(PerkLib.BimboBody, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.BimboBrains, 0, 0, 0, 0);
        this.player.tailType = TAIL_TYPE_FOX;
        this.player.tailVenom = 9;
        this.player.createPerk(PerkLib.EnlightenedNinetails, 0, 0, 0, 0);
        this.player.breastRows[0].breastRating = 5;
        this.player.femininity = 100;
        this.player.lowerBody = LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS;
        this.player.skinTone = "pink";
        this.player.skinType = SKIN_TYPE_FUR;
        this.player.skinDesc = "fur";
        this.player.hairColor = "pink";
        this.player.hairLength = 50;
        this.player.hipRating = 5;
        this.player.buttRating = 5;
        this.player.thickness = 10;
        this.flags[kFLAGS.PC_FETISH] = 2;
        this.player.earsPierced = 1;
        this.player.earsPShort = "green gem-stone handcuffs";
        this.player.earsPLong = "Green gem-stone handcuffs";
        this.player.nipplesPierced = 1;
        this.player.nipplesPShort = "seamless black nipple-studs";
        this.player.nipplesPLong = "Seamless black nipple-studs";
        this.flags[kFLAGS.PC_FETISH] = 2;
        this.player.vaginas[0].clitPierced = 1;
        this.player.vaginas[0].clitPShort = "emerald clit-stud";
        this.player.vaginas[0].clitPLong = "Emerald clit-stud";
        this.player.vaginas[0].labiaPierced = 2;
        this.player.vaginas[0].labiaPShort = "ruby labia-rings";
        this.player.vaginas[0].labiaPLong = "Ruby labia-rings";
        this.player.createPerk(PerkLib.ElvenBounty, 0, 15, 0, 0);
        this.player.createPerk(PerkLib.PureAndLoving, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.SensualLover, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.OneTrackMind, 0, 0, 0, 0);
        this.player.setWeapon(this.weapons.SUCWHIP);
        this.player.setArmor(this.armors.NURSECL);
    }

    private customBetram(): void {
        // Character Creation
        // herm, canine cock - 8", virgin, tight, wet
        // fox ears, tails, A cup breasts with normal nipples Betram
        this.player.earType = EARS_FOX;
        this.player.tailType = TAIL_TYPE_FOX;
        this.player.tailVenom = 1;
        if (this.player.biggestTitSize() > 1) this.player.breastRows[0].breastRating = 1;
        if (!this.player.hasCock()) {
            this.player.createCock();
            this.player.cocks[0].cockType = CockTypesEnum.DOG;
            this.player.cocks[0].cockLength = 8;
            this.player.cocks[0].cockThickness = 1;
            this.player.cocks[0].knotMultiplier = 1.4;
        }
        if (!this.player.hasVagina()) {
            this.player.createVagina();
            this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_WET;
            this.player.clitLength = 0.25;
        }
        this.player.gender = 3;
        this.outx(
            "You're quite the foxy herm, and as different as you were compared to the rest of Ingnam, it's no suprise you were sent through first."
        );
    }

    private customCeveo(): void {
        // Male. 2 cock. 5.5 average thickness and 12 in with excessive thickness both pierced with silver rings. Balls, large, about the size of a billiard ball, four of them. All humanish, more details on the character.
        this.player.createCock();
        this.player.createCock();
        this.player.balls = 4;
        this.player.ballSize = 3;
        this.player.cocks[0].cockThickness = 5.5;
        this.player.cocks[1].cockThickness = 5.5;
        this.player.cocks[0].cockLength = 12;
        this.player.cocks[1].cockLength = 12;
        this.player.cocks[0].pierced = 2;
        this.player.cocks[1].pierced = 2;
        this.player.cocks[0].pShortDesc = "silver cock-ring";
        this.player.cocks[1].pShortDesc = "silver cock-ring";
        this.player.cocks[0].pLongDesc = "Silver cock-ring";
        this.player.cocks[1].pLongDesc = "Silver cock-ring";
        // "Androgynous face, large brown eyes, long black hair down to about ass level, full lips, pirced with one silver ring ass itself is round and thick, chest is flat, only two nipples, about nickle sized pierced with silver studs, skin of a pale ghostly transparent complexion, rest of the body is not notably muscular or chubby in any definite way, feet seem to taper off into full transparency. Full body housed in the lewd Inquisitor Armor, wielding a Wizard Staff. Starting at level 5 with tank, regeneration, healing, smarts, channeling, mage and incorperability perks, a full knowledge of
        this.player.gender = 1;
        this.player.tallness = 72;
        this.player.femininity = 50;
        this.player.hairLength = 35;
        this.player.hairColor = "black";
        this.player.lipPierced = 2;
        this.player.lipPShort = "silver lip-ring";
        this.player.lipPLong = "Silver lip-ring";
        this.player.buttRating = 8;
        this.player.hipRating = 8;
        this.player.createBreastRow();
        this.player.nipplesPierced = 1;
        this.player.nipplesPShort = "silver studs";
        this.player.nipplesPLong = "Silver studs";

        this.player.skinTone = "ghostly pale";
        this.player.createPerk(PerkLib.Incorporeality, 0, 0, 0, 0);
        this.player.setArmor(this.armors.I_CORST);
        this.player.level = 5;
        this.player.setWeapon(this.weapons.W_STAFF);

        this.player.createPerk(PerkLib.Regeneration, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Smart, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Channeling, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Mage, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.HistoryHealer, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Tank, 0, 0, 0, 0);
        this.player.createStatusAffect(StatusAffects.KnowsArouse, 0, 0, 0, 0);
        this.player.createStatusAffect(StatusAffects.KnowsHeal, 0, 0, 0, 0);
        this.player.createStatusAffect(StatusAffects.KnowsMight, 0, 0, 0, 0);
        this.player.createStatusAffect(StatusAffects.KnowsCharge, 0, 0, 0, 0);
        this.player.createStatusAffect(StatusAffects.KnowsBlind, 0, 0, 0, 0);
        this.player.createStatusAffect(StatusAffects.KnowsWhitefire, 0, 0, 0, 0);
        // magic, 50 Int, 50 tough, Speed 15, Str 10, 30 corruption, 30 libido, 10 sensitivity.
        this.player.inte = 50;
        this.player.tou = 50;
        this.player.spe = 15;
        this.player.str = 10;
        this.player.cor = 30;
        this.player.lib = 30;
        this.player.sens = 10;
        this.outx(
            "As a wandering mage you had found your way into no small amount of trouble in the search for knowledge.  A strange tome here, a ritual there, most people found your pale form unsettling. They would be further troubled if they could see your feet!  Lets not even begin on the blood magic.  Yes, your interest in examining every aspect of magic has run you down a strange path, so when you wandered into Ingram and began to hear of the exile of the Champion, and the superstitions that surrounded it you were intrigued, as every little rumor and ritual often had a grain of truth.  You snuck into the cave prior to the ritual, where the old man supposedly led every Champion, and there you found a strange portal that emanated a certain degree of spacial transparency -  more than the portal's own.  Within it must have been a whole new world!  Throwing caution to the wind, your curiosities engulfing you, you dove in with nary a thought for the consequences."
        );
    }

    private customCharaun(): void {
        this.outx(
            "As a gifted fox with a juicy, thick knot, a wet cunt, and magical powers, you have no problems with being chosen as champion."
        );
        // Herm, Fox Cock: (27"l x 1.4"w, knot multiplier 3.6), No Balls, Cum Multiplier: 7,500, Vaginal Wetness: 5, Clit length: 0.5, Virgin, Fertility: 15 9-tailed "enlightened" kitsune( a pure-blooded kitsune with the "Enlightened Nine-tails" perk and magic specials)
        if (!this.player.hasCock()) this.player.createCock();
        if (!this.player.hasVagina()) this.player.createVagina();
        this.player.gender = 3;
        this.player.cocks[0].cockLength = 27;
        this.player.cocks[0].cockThickness = 1.4;
        this.player.cocks[0].knotMultiplier = 3.6;
        this.player.cocks[0].cockType = CockTypesEnum.DOG;
        this.player.balls = 0;
        this.player.ballSize = 2;
        this.player.cumMultiplier = 7500;
        this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_SLAVERING;
        this.player.clitLength = 0.5;
        this.player.fertility = 15;
        this.player.tailType = TAIL_TYPE_FOX;
        this.player.tailVenom = 9;
        this.player.createPerk(PerkLib.EnlightenedNinetails, 0, 0, 0, 0);
        // if possible with fur, Hair color: "midnight black", Skin/Fur color: "ashen grayish-blue",  Height: 65", Tone: 100, Thickness: 0, Hip rating: 6, Butt rating: 3,Feminimity: 50,  ( 4 rows of breasts (Descending from the top ones: D,C,B,A), nipple length: 0.1", Fuckable, 1 nipple per breast, Tongue type: demon
        this.player.hairColor = "midnight black";
        this.player.skinType = SKIN_TYPE_FUR;
        this.player.skinDesc = "fur";
        this.player.skinTone = "ashen grayish-blue";
        this.player.tallness = 65;
        this.player.tone = 100;
        this.player.thickness = 0;
        this.player.hipRating = 6;
        this.player.buttRating = 3;
        this.player.femininity = 50;
        this.player.createBreastRow();
        this.player.createBreastRow();
        this.player.createBreastRow();
        this.player.breastRows[0].breastRating = 4;
        this.player.breastRows[0].fuckable = true;
        this.player.breastRows[1].breastRating = 3;
        this.player.breastRows[1].fuckable = true;
        this.player.breastRows[2].breastRating = 2;
        this.player.breastRows[2].fuckable = true;
        this.player.breastRows[3].breastRating = 1;
        this.player.breastRows[3].fuckable = true;
        this.player.tongueType = TONUGE_DEMONIC;
        this.player.nippleLength = 0.1;
        // Starting with an Inscribed Spellblade and Bondage Straps. Charaun
        this.player.setArmor(this.armors.BONSTRP);
        this.player.setWeapon(this.weapons.S_BLADE);
    }

    private customCharlie(): void {
        this.outx(
            "You're strong, smart, fast, and tough.  It also helps that you've got four dongs well beyond what others have lurking in their trousers.  With your wings, bow, weapon, and tough armor, you're a natural for protecting the town."
        );
        this.player.gender = 1;
        this.player.tou += 2;
        this.player.str += 3;
        this.player.fertility = 5;
        this.player.hairLength = 26;
        this.player.hairColor = "blond";
        this.player.skinTone = "light";
        this.player.nippleLength = 0.2;
        this.player.createBreastRow();
        this.player.breastRows[0].breastRating = 0;
        this.player.balls = 2;
        this.player.ballSize = 3;
        this.player.tallness = 113;
        this.player.tone = 50;
        this.player.thickness = 50;
        this.player.femininity = 50;
        this.player.hipRating = 5;
        this.player.buttRating = 5;
        this.player.teaseLevel = 1;
        // Large feathered wings (Any chance in heck I could get 'angel' as the race descriptor? Just asking. I'm fine if the answer is 'no')
        this.player.wingType = WING_TYPE_FEATHERED_LARGE;
        this.player.wingDesc = "large, feathered";

        // While we're on the subject, would glowing eyes be possible? I'll take normal eyes if not.
        // Beautiful Sword
        this.player.setWeapon(this.weapons.B_SWORD);
        this.player.setArmor(this.armors.SSARMOR);
        // Beautiful Armor (Or just Spider Silk Armor)
        // Pure Pearl
        // Tallness 84 (8 feet 0 inches)
        this.player.tallness = 84;
        // Femininity 10
        this.player.femininity = 10;
        // Thickness 50
        this.player.thickness = 50;
        // Tone 90
        this.player.tone = 90;
        // Int 50 (if possible)
        this.player.inte = 50;
        // Str/Tou/Spd 25 (if possible)
        this.player.str = 25;
        this.player.tou = 25;
        this.player.spe = 25;
        // Bow
        this.player.createKeyItem("Bow", 0, 0, 0, 0);
        // Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
        this.player.createStatusAffect(StatusAffects.Kelt, 100, 0, 0, 0);
        // Is it possible to get extra starting perks added? If so, I'd like History: Religious added to whatever is selected on creation. If not, please ignore this line.
        // Freckled skinAdj
        this.player.skinAdj = "freckled";
        // 10 Perk Points (if possible, feel free to make it less if you feel it necessary)
        this.player.perkPoints = 10;
        // Male
        this.player.gender = 1;
        // Would it be possible to code a cock type that morphs into different cock types? (i.e. it loads a different cock type description each sex scene) If so, I'd like him to have a pair of them, one 24 inches long and 3 inches wide and the second 12-inches long and 2 inches wide. If not, I'll take a dragon and horse cock at 24/3 each as well as a dog and cat cock at 12/2 each.
        this.player.createCock();
        this.player.createCock();
        this.player.createCock();
        this.player.createCock();
        this.player.cocks[0].cockLength = 24;
        this.player.cocks[0].cockThickness = 3;
        this.player.cocks[0].cockType = CockTypesEnum.HORSE;
        this.player.cocks[1].cockLength = 24;
        this.player.cocks[1].cockThickness = 3;
        this.player.cocks[1].cockType = CockTypesEnum.DRAGON;
        this.player.cocks[2].cockLength = 12;
        this.player.cocks[2].cockThickness = 2;
        this.player.cocks[2].cockType = CockTypesEnum.DOG;
        this.player.cocks[3].cockLength = 12;
        this.player.cocks[3].cockThickness = 2;
        this.player.cocks[3].cockType = CockTypesEnum.CAT;

        // A pair of 8-inch balls
        this.player.balls = 2;
        this.player.ballSize = 8;
        // A virility boost would be nice too if possible.
        this.player.cumMultiplier = 50;
    }

    private customCody(): void {
        this.outx(
            "Your orange and black tiger stripes make you cut a more imposing visage than normal, and with your great strength, armor, and claymore, you're a natural pick for champion."
        );
        // well to start off the name would be Cody
        // -Cat with (black and orange tiger fur if possible) if not just Orange fur
        this.player.hairColor = "black and orange";
        this.player.skinType = SKIN_TYPE_FUR;
        this.player.skinDesc = "fur";
        // -Chainmail armor
        this.player.setArmor(this.armors.FULLCHN);
        // -Large Claymore (i understand 40 Strength is need so if he could start with that would be great if not hit the gyms)"
        this.player.str = 41;
        this.player.setWeapon(this.weapons.CLAYMOR);
    }

    private customGalatea(): void {
        // "(Dangit Fenoxo!  Stop adding sexy must-have things to the game!  If it's not too late to update it I've added in that sexy new armor.  Thanks!)
        // Other:
        if (!this.player.hasVagina()) {
            this.player.createVagina();
            if (this.player.clitLength == 0) this.player.clitLength = 0.25;
        }
        kGAMECLASS.genderCheck();
        // Hair length: Very long
        this.player.hairLength = 22;
        // Breast size: HH
        this.player.breastRows[0].breastRating = 21;
        // Femininity/Beauty: Very high
        this.player.femininity = 90;
        // Height: 5'4
        this.player.tallness = 64;

        // Perks: Feeder, Strong Back, Strong Back 2
        this.player.createStatusAffect(StatusAffects.Feeder, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Feeder, 0, 0, 0, 0);

        this.player.createPerk(PerkLib.StrongBack, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.StrongBack2, 0, 0, 0, 0);

        // Equipment:
        // Weapon: Warhammer
        this.player.setWeapon(this.weapons.WARHAMR);
        // Armor: Lusty shit
        this.player.setArmor(this.armors.LMARMOR);
        // player.createPerk(PerkLib.SluttySeduction, 10 + flags[kFLAGS.BIKINI_ARMOR_BONUS], 0, 0, 0);

        // Stats: (if possible)
        // Strength: 90
        this.player.str = 90;
        // Fertility: 100
        this.player.fertility = 100;
        this.player.cor = 25;
        // Inventory: Lactaid, GroPlus, BimboLq
        this.player.itemSlot1.setItemAndQty(this.consumables.LACTAID, 5);
        this.player.itemSlot2.setItemAndQty(this.consumables.GROPLUS, 5);
        this.player.itemSlot3.setItemAndQty(this.consumables.BIMBOLQ, 1);
        this.player.itemSlot4.unlocked = true;
        this.player.itemSlot4.setItemAndQty(this.armors.BIMBOSK, 1);
        this.player.itemSlot5.unlocked = true;
        this.outx(
            "You've got large breasts prone to lactation.  You aren't sure WHY you got chosen as a champion, but with your considerable strength, you're sure you'll do a good job protecting Ingnam."
        );
    }

    private customGundam(): void {
        this.outx(
            "You're fabulously rich, thanks to a rather well-placed bet on who would be the champion.  Hopefully you can buy yourself out of any trouble you might get in."
        );
        this.player.gems = 1500 + CharCreation.rand(1000);
        // for my custom character profile i want the name to be gundam all i want is to start out with around 1000-2500 gems like as a gift from the elder or something to help me out.
    }

    private customHikari(): void {
        // Character Creation If possible I would like a herm with a cat cock that is 10 inches by 4 inches. Anything else is up to you. I would like a herm catmorph with two large d breasts and shoulder length hair. Also if possible I would like to start with some gel armor. Everything else is fair game. Hikari
        this.outx(
            "As a herm with a super-thick cat-cock, D-cup breasts, and out-of-this-world armor, you're a natural pick for champion."
        );
        if (!this.player.hasCock()) this.player.createCock();
        this.player.cocks[0].cockType = CockTypesEnum.CAT;
        this.player.cocks[0].cockLength = 10;
        this.player.cocks[0].cockThickness = 4;
        if (!this.player.hasVagina()) this.player.createVagina();
        this.player.breastRows[0].breastRating = 4;
        this.player.hairLength = 10;
        this.player.setArmor(this.armors.GELARMR);
        this.player.gender = 3;
    }

    private customIsaac(): void {
        this.outx(
            "Born of a disgraced priestess, Isaac was raised alone until she was taken by illness.  He worked a number of odd jobs until he was eventually chosen as champion."
        );
        // - gift: fast
        this.player.spe += 5;
        this.player.tone += 10;
        this.player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
        // - history: religion
        this.player.createPerk(PerkLib.HistoryReligious, 0, 0, 0, 0);
        // (and if possible)
        // - history: fighter
        this.player.createPerk(PerkLib.HistoryFighter, 0, 0, 0, 0);
        // - history: smith
        this.player.createPerk(PerkLib.HistorySmith, 0, 0, 0, 0);
        // in my ar, Issac was born to a disgraced priestess (she was raped by marauders) and raised by her alone until she died from an illness and was pretty much left to fend for and earn a living for himself (hence the fighter and smith background's too) until, years later he was chosen as 'champion'~
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // sex - male
        this.player.gender = 1;
        this.player.balls = 2;
        // - a pair of apple sized balls each measuring three inches across
        this.player.ballSize = 3;
        // anatomy - twin dicks
        // the first, a vulpine dick (12 in. long, 2.8 in. thick with a knot roughly 4.5 in. at full size) with a Fertite jacob's ladder piercing
        // and the second, a barbed feline dick (10 in. long and 2.5 in thick) with an Emerald jacob's ladder
        // heh, ribbed for their pleasure ;d lol
        this.player.createCock();
        this.player.createCock();
        this.player.cocks[0].cockLength = 12;
        this.player.cocks[0].cockThickness = 2.8;
        this.player.cocks[0].cockType = CockTypesEnum.DOG;
        this.player.cocks[0].knotMultiplier = 1.8;
        this.player.cocks[1].cockLength = 10;
        this.player.cocks[1].cockThickness = 2.5;
        this.player.cocks[1].cockType = CockTypesEnum.TENTACLE;
        this.player.cocks[0].pierced = 3;
        this.player.cocks[0].pShortDesc = "fertite cock-jacob's ladder";
        this.player.cocks[0].pLongDesc = "Fertite cock-jacob's ladder";
        this.player.createPerk(PerkLib.PiercedFertite, 5, 0, 0, 0);
        // - and one tight asshole
        this.player.ass.analLooseness = 0;
        // - kitsune
        // - moderately long white hair (9 inches)
        this.player.hairLength = 9;
        this.player.hairColor = "silver-white";
        // - human face
        // - fox ears
        this.player.earType = EARS_FOX;
        // - olive complexion
        this.player.skinTone = "olive";
        // - demon tongue (oral fetish ;d)
        this.player.tongueType = TONUGE_DEMONIC;
        // - 5 foot 9 inch tall
        this.player.tallness = 69;
        // - average build
        this.player.thickness = 50;
        // - body thickness of  around 50
        this.player.tone = 70;
        // - 'tone of about 70
        // - two flat breasts each supporting one 0.2-inch nipple
        this.player.nippleLength = 0.2;
        this.player.createBreastRow();
        // - three fox tails
        this.player.tailType = TAIL_TYPE_FOX;
        this.player.tailVenom = 3;
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // equipment;
        // - katana (don't suppose you could rename the katana 'Zon'ith' could you? ~.^)
        // Items: Katana, Leather Armor
        this.player.setWeapon(this.weapons.KATANA);
        // - robes
        this.player.setArmor(this.armors.M_ROBES);
    }

    private customKatti(): void {
        this.outx(
            "You have big breasts with big, fuckable nipples on them, and no matter what, your vagina always seems to be there to keep you company."
        );
        // Gender: Female
        if (!this.player.hasVagina()) {
            this.player.createVagina();
            kGAMECLASS.genderCheck();
        }
        // "Ears: Bunny
        this.player.earType = EARS_BUNNY;
        // Tail: Bunny
        this.player.tailType = TAIL_TYPE_RABBIT;
        // Face: Human
        // Breasts: H-cup with 4.5 inch fuckable nipples"
        this.player.breastRows[0].breastRating = 19;
        this.player.nippleLength = 4.5;
        this.player.breastRows[0].fuckable = true;
    }

    private customLeah(): void {
        this.player.setArmor(this.armors.LEATHRA);
        //
        // if(player.findPerk(PerkLib.WizardsEndurance) < 0) player.createPerk(PerkLib.WizardsEndurance,30,0,0,0);
        this.player.setWeapon(this.weapons.W_STAFF);
        this.player.itemSlot1.setItemAndQty(this.consumables.B__BOOK, 1);
        this.player.itemSlot2.setItemAndQty(this.consumables.W__BOOK, 2);

        this.player.createBreastRow();
        this.player.createVagina();
        this.player.breastRows[0].breastRating = 4;
        this.player.clitLength = 0.5;
        this.player.fertility = 10;
        this.player.gender = 2;
        this.player.hipRating = 8;
        this.player.buttRating = 8;
        this.player.str = 15;
        this.player.tou = 15;
        this.player.spe = 18;
        this.player.inte = 17;
        this.player.sens = 15;
        this.player.lib = 15;
        this.player.cor = 0;
        kGAMECLASS.notes = "No Notes Available.";
        this.player.HP = kGAMECLASS.maxHP();
        this.player.hairLength = 13;
        this.player.skinType = SKIN_TYPE_PLAIN;
        this.player.faceType = FACE_HUMAN;
        this.player.tailType = TAIL_TYPE_NONE;
        this.player.tongueType = TONUGE_HUMAN;
        this.player.femininity = 85;
        this.player.beardLength = 0;
        this.player.beardStyle = 0;
        this.player.tone = 30;
        this.player.thickness = 50;
        this.player.skinDesc = "skin";
        this.player.skinTone = "olive";
        this.player.hairColor = "black";
        this.player.balls = 0;
        this.player.cumMultiplier = 1;
        this.player.ballSize = 0;
        this.player.hoursSinceCum = 0;
        this.player.clitLength = 0;
        this.player.ass.analLooseness = 0;
        this.player.ass.analWetness = 0;
        this.player.ass.fullness = 0;
        this.player.fertility = 5;
        this.player.fatigue = 0;
        this.player.horns = 0;
        this.player.tallness = 67;
        this.player.tailVenom = 0;
        this.player.tailRecharge = 0;
        this.player.wingType = WING_TYPE_NONE;
        this.player.wingDesc = "non-existant";
        this.player.tone = 30;
        this.player.thickness = 65;
    }

    private customLucina(): void {
        // 428347355782040 Character Creation Female,wetness=wet, Looseness=normal,not a virgin, Fertility high i guess i dont really care can be up to you. for her face normal human, ears i want Elvin, no tails, just normal skin, body thickness i want to be slender, body tone kinda athletic but not too much, hair i want really long i think like a 30 on the codex number i think and her hair color light blonde, i want her to have normal D size breast with you can choose how you want them really though i dont think i really care, nipple size i dont care, her skin color a fair light light color but not too pale, for her starting equipment i want im not sure what i want her to wear but basically i want a Elvin archer with a bow. so maybe you can do something about the clothing. i just want a Elvin character in the game since theres goblins plus another archer besides kelt a female one add to that. Lucina
        this.outx(
            "You're a blond, fair-skinned lass with a well-made bow and the skills to use it.  You have D-cup breasts and a very moist cunt that's seen a little action.  You're fit and trim, but not too thin, nor too well-muscled.  All in all, you're a good fit for championing your village's cause."
        );
        if (!this.player.hasVagina()) this.player.createVagina();
        this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_SLICK;
        this.player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_LOOSE;
        this.player.vaginas[0].virgin = false;
        if (this.player.femininity < 80) this.player.femininity = 80;
        this.player.fertility = 40;
        this.player.earType = EARS_ELFIN;
        this.player.thickness = 25;
        this.player.tone = 60;
        this.player.hairLength = 30;
        this.player.hairColor = "light blonde";
        this.player.breastRows[0].breastRating = 4;
        this.player.skinTone = "light";
        // Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
        this.player.createStatusAffect(StatusAffects.Kelt, 100, 0, 0, 0);
        this.player.createKeyItem("Bow", 0, 0, 0, 0);
    }

    private customLukaz(): void {
        // Specific Character
        // Male. 11.5 inch dog dick, 4 balls, 2 inches in diameter.
        this.player.createCock();
        this.player.cocks[0].cockLength = 11.5;
        this.player.cocks[0].cockThickness = 2;
        this.player.cocks[0].cockType = CockTypesEnum.DOG;
        this.player.cocks[0].knotMultiplier = 1.5;
        this.player.createBreastRow();
        this.player.breastRows[0].breastRating = 0;
        this.player.gender = 1;
        this.player.tallness = 71;
        this.player.hipRating = 4;
        this.player.buttRating = 4;
        this.player.femininity = 30;
        this.player.createCock();
        this.player.balls = 4;
        this.player.cumMultiplier = 4;
        this.player.ballSize = 2;
        this.player.str = 18;
        this.player.tou = 17;
        this.player.spe = 15;
        this.player.inte = 15;
        this.player.sens = 15;
        this.player.lib = 15;
        this.player.cor = 0;
        kGAMECLASS.notes = "No Notes Available.";
        this.player.HP = kGAMECLASS.maxHP();
        this.player.hairLength = 1;
        this.player.skinType = SKIN_TYPE_PLAIN;
        this.player.skinTone = "light";
        this.player.hairColor = "brown";
        this.player.faceType = FACE_HUMAN;
        this.player.tailType = TAIL_TYPE_NONE;
        this.player.tongueType = TONUGE_HUMAN;
        this.player.femininity = 50;
        this.player.beardLength = 0;
        this.player.beardStyle = 0;
        this.player.thickness = 50;
        this.player.skinDesc = "skin";
        this.player.hoursSinceCum = 0;
        this.player.clitLength = 0;
        this.player.ass.analLooseness = 0;
        this.player.ass.analWetness = 0;
        this.player.ass.fullness = 0;
        this.player.fertility = 5;
        this.player.fatigue = 0;
        this.player.horns = 0;
        this.player.tailVenom = 0;
        this.player.tailRecharge = 0;
        this.player.wingType = WING_TYPE_NONE;
        this.player.wingDesc = "non-existant";
        // "dog face, dog ears, draconic tail, blue fur.
        this.player.faceType = FACE_DOG;
        this.player.earType = EARS_DOG;
        this.player.tailType = TAIL_TYPE_DRACONIC;
        this.player.skinType = SKIN_TYPE_FUR;
        this.player.hairColor = "blue";
        this.player.skinDesc = "fur";
        this.player.tone = 88;
        this.player.tongueType = TONUGE_DRACONIC;
        // gel plate armor, warhammer, 88 body tone, 1 breast row, flat manly breasts, 0.2 inch nipples, 1 on each breast, draconic tongue, short hair-blue, light skin." Lukaz
        this.player.createPerk(PerkLib.HistoryFighter, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
    }

    private customMara(): void {
        // #226096893686530
        // For the custom PC Profile can you make a Bimbo Bunny girl (no bunny feet) (named Mara) dont really care about clothes i can get what i want pretty quickly and I change from time to time.
        this.outx(
            "You're a bunny-girl with bimbo-tier curves, jiggly and soft, a curvy, wet girl with a bit of a flirty past."
        );
        this.player.gender = 2;
        this.player.spe += 3;
        this.player.inte += 2;
        this.player.clitLength = 0.5;
        this.player.tone = 30;
        this.player.fertility = 10;
        this.player.hairLength = 15;
        this.player.createBreastRow();
        this.player.createVagina();
        this.player.tallness = 67;
        this.player.breastRows[0].breastRating = 7;
        this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_SLICK;
        this.player.vaginas[0].virgin = false;
        this.player.tone = 20;
        this.player.hipRating = 12;
        this.player.buttRating = 12;
        this.player.femininity = 100;
        this.player.thickness = 33;
        this.player.createPerk(PerkLib.HistorySlut, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.BimboBody, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.BimboBrains, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.BigTits, 1.5, 0, 0, 0);
        this.player.earType = EARS_BUNNY;
        this.player.tailType = TAIL_TYPE_RABBIT;
        this.player.skinTone = "tan";
        this.player.hairColor = "platinum blonde";
        this.player.teaseLevel = 3;
    }

    private customMihari(): void {
        // [Values will be listed as if taken from Minerva]
        // I'm kinda going under the assumption you are letting us go hog wild if not, take what's allowed and do what you wish out of what's below
        this.outx(
            "The portal is not something you fear, not with your imposing armor and inscribed spellblade.  You're much faster and stronger than every champion that came before you, but will it be enough?"
        );
        // Core Stats:
        this.player.str = 40;
        this.player.tou = 20;
        this.player.spe = 100;
        this.player.inte = 80;
        this.player.lib = 25;
        this.player.sens = 15;

        // Body Values:
        // breastRows
        this.player.createBreastRow();
        // -breastRating: 5
        // -breasts: 2
        // -nipplesPerBreast: 1
        this.player.breastRows[0].breastRating = 5;
        this.player.buttRating = 2;
        this.player.createVagina();
        this.player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_TIGHT;
        this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_SLAVERING;
        this.player.vaginas[0].virgin = true;
        this.player.clitLength = 0.2;
        this.player.earType = EARS_CAT;
        this.player.faceType = FACE_CAT;
        this.player.femininity = 100;
        this.player.fertility = 85;
        this.player.gender = 2;
        this.player.hairColor = "blonde";
        this.player.hairLength = 24;
        this.player.hipRating = 6;
        this.player.lowerBody = LOWER_BODY_TYPE_CAT;
        this.player.nippleLength = 0.5;
        // perks:
        this.player.createPerk(PerkLib.Agility, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Evade, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Runner, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
        this.player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
        this.player.createPerk(PerkLib.Flexibility, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.HistoryScholar, 0, 0, 0, 0);

        this.player.skinDesc = "fur";
        this.player.skinTone = "ashen";
        this.player.skinType = SKIN_TYPE_FUR;
        this.player.tailType = TAIL_TYPE_CAT;
        this.player.tallness = 55;
        this.player.teaseLevel = 4;
        this.player.thickness = 10;
        this.player.tone = 75;
        this.player.tongueType = TONUGE_HUMAN;

        // Posted everything above sorry if it wasn't supposed to go there.
        // starting equipment: black leather armor surrounded by voluminous robes
        // starting weapon: Spellblade if not gamebreaking otherwise spear is fine.
        this.player.setArmor(this.armors.LTHRROB);
        this.player.setWeapon(this.weapons.S_BLADE);
    }

    private customMirvanna(): void {
        // Any equine or dragonny attributes accompanying it a big plus! As I'm a dragon-unicorn furry (Qilin~). Bonus points if you add a horn type for unicorn horn.
        this.outx(
            "You're an equine dragon-herm with a rather well-proportioned body.  Ingnam is certainly going to miss having you whoring yourself out around town.  You don't think they'll miss cleaning up all the messy sex, though."
        );
        this.player.gender = 3;
        this.player.spe += 3;
        this.player.inte += 2;
        this.player.str += 3;
        this.player.clitLength = 0.5;
        this.player.fertility = 20;
        this.player.hairLength = 15;
        this.player.createBreastRow();
        this.player.createVagina();
        this.player.createCock();
        this.player.tallness = 73;
        this.player.breastRows[0].breastRating = 5;
        this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_SLICK;
        this.player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_LOOSE;
        this.player.vaginas[0].virgin = false;
        this.player.tone = 20;
        this.player.hipRating = 8;
        this.player.buttRating = 8;
        this.player.femininity = 75;
        this.player.thickness = 33;
        this.player.hairColor = "platinum blonde";
        this.player.teaseLevel = 1;
        // Mirvanna;
        // Gender = Herm
        // Ears = Horse
        this.player.earType = EARS_HORSE;
        // Horns = Dragon
        this.player.hornType = HORNS_DRACONIC_X4_12_INCH_LONG;
        this.player.horns = 12;
        // Face = Horse
        this.player.faceType = FACE_HORSE;
        // Skin type = Black Fur
        this.player.skinTone = "brown";
        this.player.skinType = SKIN_TYPE_FUR;
        this.player.hairColor = "black";
        this.player.skinDesc = "fur";
        // Legs/Feet = Digigrade hooved
        this.player.lowerBody = LOWER_BODY_TYPE_HOOFED;
        // Wing type = Dragon
        this.player.wingType = WING_TYPE_DRACONIC_LARGE;
        this.player.wingDesc = "large, draconic";
        // Tail type = Dragon
        this.player.tailType = TAIL_TYPE_DRACONIC;
        // Cock type = Equine
        this.player.cocks[0].cockType = CockTypesEnum.HORSE;
        this.player.cocks[0].cockLength = 14;
        this.player.cocks[0].cockThickness = 2.5;
        // Vulva Type = Equine

        // Beautiful Sword & Wizard Robe
        this.player.setWeapon(this.weapons.B_SWORD);
        this.player.setArmor(this.armors.W_ROBES);
        // Herm, lots of jizz.
        this.player.femininity -= 2;
        this.player.cumMultiplier = 5.5;
        this.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
        this.player.createPerk(PerkLib.HistoryWhore, 0, 0, 0, 0);
    }

    private customNami(): void {
        // Female with the sand-trap black pussy
        // Non-Virgin
        // Fertility- Normal Starting Value
        // Wetness- Above Average
        // Looseness- Normal Starting Value
        // Clit-size- Normal Value"
        this.player.createVagina();
        this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_SLICK;
        this.player.clitLength = 0.25;
        this.player.vaginas[0].type = 5;
        this.player.vaginas[0].virgin = false;
        this.player.ass.analLooseness = 1;
        // Face- Canine
        this.player.faceType = FACE_DOG;
        // Ears- Canine
        this.player.earType = EARS_DOG;
        // Tail- Canine
        this.player.tailType = TAIL_TYPE_DOG;
        // Lower body- Canine
        this.player.lowerBody = LOWER_BODY_TYPE_DOG;
        // White Fur (if possible)
        this.player.skinType = SKIN_TYPE_FUR;
        this.player.hairColor = "white";
        this.player.skinDesc = "fur";
        // Body Thickness/breastsize/- As if I had selected the ""Average"" body type from the start.
        this.player.createBreastRow();
        this.player.breastRows[0].breastRating = 3;
        // Muscle Tone- A bit above average enough to trigger a mention of it in the desc.
        this.player.tone = 55;
        // Nipples-  As above on size but the black sand trap nipples.
        this.player.createStatusAffect(StatusAffects.BlackNipples, 0, 0, 0, 0);
        // Hair Length- Long
        this.player.hairLength = 16;
        // Hair Color- Black
        // Skin Color- Light
        this.player.skinTone = "light";
        // Starting Equipment: Wizard's Robe, Wizards Staff, and one White and one Black book in inventory.
        // equipArmor("inquisitor's corset",false);
        this.player.setArmor(this.armors.W_ROBES);

        this.player.setWeapon(this.weapons.W_STAFF);
        // Gift Perk- Smarts
        this.player.createPerk(PerkLib.Smart, 0, 0, 0, 0);
        // History- Schooling
        this.player.createPerk(PerkLib.HistoryScholar, 0, 0, 0, 0);
        this.player.itemSlot1.setItemAndQty(this.consumables.W__BOOK, 1);
        this.player.itemSlot2.setItemAndQty(this.consumables.B__BOOK, 1);

        this.player.gender = 2;
        this.player.tallness = 64;
        this.player.femininity = 75;
        this.player.buttRating = 7;
        this.player.hipRating = 7;
        this.player.inte = 40;
        this.player.str = 20;
        this.player.spe = 25;
        this.player.tou = 15;

        this.clearOutput();
        this.outx(
            "Your exotic appearance caused you some trouble growing up, but you buried your nose in books until it came time to go through the portal."
        );
    }

    private customNavorn(): void {
        this.outx(
            "There's been something special about you since day one, whether it's your numerous sexual endowments or your supernatural abilities.  You're a natural pick for champion."
        );
        // Character Creation "Herm same number and types of cocks from email sent earlier.
        // Special abilities: Fire breath, fox fire?
        this.player.createPerk(PerkLib.Dragonfire, 0, 0, 0, 0);
        // equipment: Large claymore, and platemail
        // -Chainmail armor
        this.player.setArmor(this.armors.FULLPLT);
        // -Large Claymore (i understand 40 Strength is need so if he could start with that would be great if not hit the gyms)"
        this.player.setWeapon(this.weapons.CLAYMOR);

        this.player.str = 41;
        // femininity: 95
        this.player.femininity = 95;
        // (0 lust cum production: 10000)
        this.player.cumMultiplier += 500;
        // (base fertility 20 if possible?)
        this.player.fertility = 20;
        // Appearence: 7ft 9in tall covered in thick shining silver fur, has a vulpine head and ears, eight breast all the same size at DD, dragon like wings, tail, and legs. With a large mare like pussy, 6 dicks, two equine, two dragon, two vulpine, all 15in long and 3 in wide, and four nuts 5 in across
        this.player.tallness = 93;
        this.player.skinTone = "black";
        this.player.skinType = SKIN_TYPE_FUR;
        this.player.skinDesc = "fur";
        this.player.hairColor = "silver";
        this.player.faceType = FACE_FOX;
        this.player.earType = EARS_FOX;
        this.player.createBreastRow();
        this.player.createBreastRow();
        this.player.createBreastRow();
        this.player.breastRows[0].breastRating = 5;
        this.player.breastRows[0].nipplesPerBreast = 4;
        this.player.breastRows[0].fuckable = true;
        this.player.breastRows[1].breastRating = 5;
        this.player.breastRows[1].nipplesPerBreast = 4;
        this.player.breastRows[1].fuckable = true;
        this.player.breastRows[2].breastRating = 5;
        this.player.breastRows[2].nipplesPerBreast = 4;
        this.player.breastRows[2].fuckable = true;
        this.player.breastRows[3].breastRating = 5;
        this.player.breastRows[3].nipplesPerBreast = 4;
        this.player.breastRows[3].fuckable = true;
        if (!this.player.hasCock()) this.player.createCock();
        this.player.createCock();
        this.player.createCock();
        this.player.createCock();
        this.player.createCock();
        this.player.createCock();
        this.player.cocks[0].cockType = CockTypesEnum.HORSE;
        this.player.cocks[0].cockLength = 15;
        this.player.cocks[0].cockThickness = 3;
        this.player.cocks[1].cockType = CockTypesEnum.HORSE;
        this.player.cocks[1].cockLength = 15;
        this.player.cocks[1].cockThickness = 3;
        this.player.cocks[2].cockType = CockTypesEnum.DOG;
        this.player.cocks[2].cockLength = 15;
        this.player.cocks[2].cockThickness = 3;
        this.player.cocks[2].knotMultiplier = 2;
        this.player.cocks[3].cockType = CockTypesEnum.DOG;
        this.player.cocks[3].cockLength = 15;
        this.player.cocks[3].cockThickness = 3;
        this.player.cocks[3].knotMultiplier = 2;
        this.player.cocks[4].cockType = CockTypesEnum.DRAGON;
        this.player.cocks[4].cockLength = 15;
        this.player.cocks[4].cockThickness = 3;
        this.player.cocks[5].cockType = CockTypesEnum.DRAGON;
        this.player.cocks[5].cockLength = 15;
        this.player.cocks[5].cockThickness = 3;
        this.player.balls = 4;
        this.player.ballSize = 5;
        // hair length: 15 in
        this.player.hairLength = 15;
        // hip size: 15/20
        this.player.hipRating = 15;
        // butt size: 15/20
        this.player.buttRating = 15;
        // body thickness: 50/100
        this.player.thickness = 50;
        // Muscle: 75/100"
        this.player.tone = 75;
        // for wetness a squirter, looseness a 2 and capacity at 140.
        if (!this.player.hasVagina()) this.player.createVagina();
        this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_SLAVERING;
        this.player.createStatusAffect(StatusAffects.BonusVCapacity, 132, 0, 0, 0);
        // Virgin, high fertility like in the email I sent before.  dragon wings, nine fox tails,  dragon legs, eight DD breasts with four fuckable nipples each, dragon tongue, waist length hair, large dragon wings.
        this.player.wingType = WING_TYPE_DRACONIC_LARGE;
        this.player.wingDesc = "large, draconic";
        this.player.tailType = TAIL_TYPE_FOX;
        this.player.tailVenom = 9;
        this.player.lowerBody = LOWER_BODY_TYPE_DRAGON;
        this.player.tongueType = TONUGE_DRACONIC;
        this.player.hairLength = 45;
        this.player.createPerk(PerkLib.EnlightenedNinetails, 0, 0, 0, 0);
        this.player.gender = 3;
    }

    private customNixi(): void {
        // -Perks
        // fertility AND messy orgasm (hope that's not pushing it)
        this.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
        this.player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
        // fighting history
        this.player.createPerk(PerkLib.HistoryFighter, 0, 0, 0, 0);
        // 3 starting perk points
        this.player.perkPoints = 3;
        // some starting gems (just go ahead and surprise me on the amount)
        this.player.gems = CharCreation.rand(800);
        // Specific Character
        // -Female... with a dog cock
        // 11"" long, 2"" wide, 2.4"" knot
        // no balls
        // virgin pussy, 0.2"" clit
        // wetness 2
        // fertility 30
        // virgin bum
        // anal wetness 1
        this.player.ass.analWetness = 2;
        this.player.gender = 3;
        this.player.createCock();
        this.player.cocks[0].cockLength = 11;
        this.player.cocks[0].cockThickness = 2;
        this.player.cocks[0].knotMultiplier = 1.2;
        this.player.cocks[0].cockType = CockTypesEnum.DOG;
        this.player.balls = 0;
        this.player.createBreastRow();
        this.player.createVagina();
        this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_WET;
        // 1 pair DD's, 0.5"" nipples"
        this.player.breastRows[0].breastRating = 5;
        this.player.nippleLength = 0.5;
        this.player.clitLength = 0.5;
        this.player.fertility = 30;
        this.player.hipRating = 6;
        this.player.buttRating = 6;
        this.player.str = 15;
        this.player.tou = 15;
        this.player.spe = 18;
        this.player.inte = 17;
        this.player.sens = 15;
        this.player.lib = 15;
        this.player.cor = 0;
        kGAMECLASS.notes = "No Notes Available.";
        this.player.HP = kGAMECLASS.maxHP();

        this.player.skinType = SKIN_TYPE_PLAIN;
        this.player.faceType = FACE_HUMAN;
        this.player.tailType = TAIL_TYPE_NONE;
        this.player.tongueType = TONUGE_HUMAN;
        this.player.femininity = 85;
        this.player.beardLength = 0;
        this.player.beardStyle = 0;
        // 75 muscle tone
        this.player.tone = 75;
        // 25 thickness
        this.player.thickness = 25;
        this.player.skinDesc = "fur";
        this.player.skinType = SKIN_TYPE_FUR;
        this.player.skinTone = "light";
        this.player.hairColor = "silver";
        this.player.hairLength = 10;
        // shoulder length silver hair

        this.player.balls = 0;
        this.player.cumMultiplier = 1;
        this.player.ballSize = 0;
        this.player.hoursSinceCum = 0;
        this.player.clitLength = 0;
        this.player.ass.analLooseness = 0;
        this.player.ass.analWetness = 0;
        this.player.ass.fullness = 0;
        this.player.fertility = 5;
        this.player.fatigue = 0;
        this.player.horns = 0;
        this.player.tallness = 82;
        this.player.tailVenom = 0;
        this.player.tailRecharge = 0;
        this.player.wingType = WING_TYPE_NONE;
        this.player.wingDesc = "non-existant";
        // 6' 10"" german-shepherd morph, face ears hands feet tail, the whole nine yards
        this.player.faceType = FACE_DOG;
        this.player.lowerBody = LOWER_BODY_TYPE_DOG;
        this.player.tailType = TAIL_TYPE_DOG;
        this.player.earType = EARS_DOG;
        /// /" "I'm picturing a tall, feminine German-Shepherd morph, solid white and gorgeous. She has both sets of genitals, with no balls, and a large set of breasts. She wields a large claymore and is dressed in a full chain vest and pants.
        // large claymore (and the strength to use it)
        this.player.setWeapon(this.weapons.CLAYMOR);
        this.player.str = 40;
        // full chain
        this.player.setArmor(this.armors.FULLCHN);
        this.outx(
            "As a German-Shepherd morph, the rest of the village never really knew what to do with you... until they sent you through the portal to face whatever's on the other side..."
        );
    }

    private customPrismere(): void {
        // Specific Character Female, virgin, high fertility, tight with standard wetness and clit.
        this.player.createVagina();
        this.player.clitLength = 0.25;
        this.player.fertility = 4;
        this.player.spe += 20;
        this.outx(
            "You're more of a scout than a fighter, but you still feel confident you can handle your responsibilities as champion.  After all, what's to worry about when you can outrun everything you encounter?  You have olive skin, deep red hair, and a demonic tail and wings to blend in with the locals."
        );
        // Perk is speed, she was a scout, and it'd be neat (if possible) to give her something akin to the Runner perk. She might not start out very strong or tough, but at least she's fast.
        this.player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
        this.player.createPerk(PerkLib.Runner, 0, 0, 0, 0);
        // In the human world, Prismere began as a scout, helping patrol areas with portals to make sure demonspawn and corruption didn't reach the human homeland. She's gotten herself into a few tight spots because of it, but she's hard to keep pinned down. She has a fiance back in her village whom she fully intends to get back to, so her libido isn't especially high.
        // As of the time the PC takes her on, she has some signs of demonic taint, so Corruption might start at 5 to 10 points." "Breasts at E, height at 5'0, a curvy build with a more narrow waist and substantial hips and butt. Skin is olive, like a mocha, hair is long and wildly wavy, a deep red, and eyes are a stormy blue. Muscles are barely visible; what muscle she has is the lean build of a runner, not a fighter. Nipples aren't especially long, but more soft.
        this.player.cor = 5;
        this.player.createBreastRow();
        this.player.breastRows[0].breastRating = 7;
        this.player.tallness = 60;
        this.player.hipRating = 8;
        this.player.buttRating = 8;
        this.player.thickness = 25;
        this.player.tone = 40;
        this.player.skinTone = "olive";
        this.player.hairLength = 30;
        this.player.hairColor = "deep red";
        this.player.femininity = 90;
        // She has a demonic tail and small demonic wings thanks to some encounters early on with succubus milk (that stuff is delicious!) but is otherwise still human.
        this.player.wingType = WING_TYPE_BAT_LIKE_LARGE;
        this.player.wingDesc = "large, bat-like";
        this.player.tailType = TAIL_TYPE_DEMONIC;
        // I feel really weird talking about all this, so if there's anything you need to change or can't do, or if I totally misinterpreted this, just shoot me an email! jordie.wierenga@gmail.com . Thanks in advance... I'm a big fan. " Prismere
    }

    private customRannRayla(): void {
        // Specific Character Virgin female. Max femininity. Thin with a little muscle. Size C breasts. Long red hair. Light colored skin. 5'5" tall.  Rann Rayla
        this.outx(
            "You're a young, fiery redhead who's utterly feminine.  You've got C-cup breasts and long red hair.  Being a champion can't be that bad, right?"
        );
        this.player.createVagina();
        this.player.clitLength = 0.25;
        this.player.createBreastRow();
        this.player.breastRows[0].breastRating = 3;
        this.player.nippleLength = 0.5;
        this.player.hairLength = 22;
        this.player.hairColor = "red";
        this.player.skinTone = "light";
        this.player.skinDesc = "skin";
        this.player.skinType = SKIN_TYPE_PLAIN;
        this.player.femininity = 100;
        this.player.thickness = 25;
        this.player.tone = 65;
        this.player.tallness = 65;
    }

    private customRope(): void {
        // 529315025394020 Character Creation Neuter (no genitals) "50-50 masculine-feminine ratio. Shark teeth." Rope
        this.outx(
            "Despite outward appearances, you're actually something of a neuter, with shark-like teeth, an androgynous face, and a complete lack of genitalia."
        );
        if (this.player.hasCock()) this.player.removeCock(0, 1);
        if (this.player.hasVagina()) this.player.removeVagina();
        this.player.gender = 0;
        this.player.femininity = 50;
        this.player.faceType = FACE_SHARK_TEETH;
    }

    private customSera(): void {
        this.outx(
            "You're something of a shemale - three rows of C-cup breasts matched with three, plump, juicy cocks.  Some decent sized balls, bat wings, and cat-like ears round out the package."
        );
        this.player.gender = 1;
        this.player.tou += 2;
        this.player.str += 3;
        this.player.fertility = 5;
        this.player.hairLength = 26;
        this.player.hairColor = "white";
        this.player.skinTone = "light";
        this.player.nippleLength = 0.2;
        this.player.createBreastRow();
        this.player.createBreastRow();
        this.player.createBreastRow();
        this.player.breastRows[0].breastRating = 3;
        this.player.breastRows[1].breastRating = 3;
        this.player.breastRows[2].breastRating = 3;
        this.player.createCock();
        this.player.createCock();
        this.player.createCock();
        this.player.cocks[0].cockLength = 8;
        this.player.cocks[0].cockThickness = 1.6;
        this.player.cocks[1].cockLength = 8;
        this.player.cocks[1].cockThickness = 1.6;
        this.player.cocks[2].cockLength = 8;
        this.player.cocks[2].cockThickness = 1.6;
        this.player.balls = 2;
        this.player.ballSize = 3;
        this.player.tallness = 113;
        this.player.tone = 50;
        this.player.thickness = 50;
        this.player.femininity = 50;
        this.player.hipRating = 5;
        this.player.buttRating = 5;
        this.player.teaseLevel = 1;
        // Build: average
        // Complexion: light
        // 9 foot 5 inches tall
        // Hair: very long white
        // Gift: Lotz of Jizz
        // History: Schooling
        this.player.cumMultiplier = 5.5;

        this.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
        this.player.createPerk(PerkLib.HistoryScholar, 0, 0, 0, 0);
        // Apperance: Cat Ears, Large Bat Like Wings, 3 Rows of breasts (C cub, 0,2 nipples)
        this.player.earType = EARS_CAT;
        this.player.wingType = WING_TYPE_BAT_LIKE_LARGE;
        this.player.wingDesc = "large, bat-like";
        // Items: Katana, Leather Armor
        this.player.setWeapon(this.weapons.KATANA);
        this.player.setArmor(this.armors.URTALTA);
        // Key Item: Deluxe Dildo
        this.player.createKeyItem("Deluxe Dildo", 0, 0, 0, 0);
    }

    private customSiveen(): void {
        // Female
        // Virgin
        this.player.gender = 2;
        this.player.createVagina();
        this.player.clitLength = 0.25;
        // has a self-repairing hymen in her cunt" "Angel
        // (means feathered wings on her back)
        this.player.wingType = WING_TYPE_HARPY;
        // Halo (Flaming)
        // D-cups
        this.player.createBreastRow();
        this.player.breastRows[0].breastRating = 4;
        // human skin
        // heart-shaped ass
        this.player.buttRating = 9;
        this.player.hipRating = 6;
        // Ass-length white and black hair
        this.player.hairLength = 30;
        this.player.hairColor = "white and black";
        // heterochromia (one blue eye one red eye)
        // 7"" nips
        this.player.nippleLength = 7;
        // waif thin body
        this.player.thickness = 0;
        // Fallen Angel gear (complete with flaming sword and light arrows)
        // dark skin tone
        this.player.skinTone = "dark";
        this.player.setWeapon(this.weapons.S_BLADE);

        // Elfin ears
        this.player.earType = EARS_ELFIN;
        // tight asshole
        // human tongue
        // human face
        // no tail, fur, or scales"
        this.flags[kFLAGS.HISTORY_PERK_SELECTED] = 0;
        this.player.str = 25;
        this.player.tou = 25;
        this.player.inte = 25;
        this.player.spe = 25;
        this.outx(
            "You are a literal angel from beyond, and you take the place of a vilage's champion for your own reasons..."
        );
    }

    private customSora(): void {
        // Character Creation Female,virgin A kitsune with a snake-like tongue Sora
        if (this.player.hasVagina()) this.player.vaginas[0].virgin = true;
        this.player.tongueType = TONUGE_SNAKE;
        this.player.earType = EARS_FOX;
        this.player.tailType = TAIL_TYPE_FOX;
        this.player.tailVenom = 2;
        this.player.inte = 30;
        if (this.player.findStatusAffect(StatusAffects.BonusVCapacity) < 0)
            this.player.createStatusAffect(StatusAffects.BonusVCapacity, 0, 0, 0, 0);
        else this.player.addStatusValue(StatusAffects.BonusVCapacity, 1, 5 + CharCreation.rand(10));
        this.outx(
            "As a Kitsune, you always got weird looks, but none could doubt your affinity for magic..."
        );
    }

    private customTestChar(): void {
        this.player.XP = 500000;
        this.player.level = 20;
        this.player.createBreastRow();
        this.player.createVagina();
        this.player.breastRows[0].breastRating = 5;
        this.player.breastRows[0].lactationMultiplier = 2;

        this.player.clitLength = 0.5;
        this.player.fertility = 50;
        this.player.gender = 2;
        this.player.hipRating = 6;
        this.player.buttRating = 6;
        this.player.str = 100;
        this.player.tou = 100;
        this.player.spe = 100;
        this.player.inte = 100;
        this.player.sens = 100;
        this.player.lib = 30;
        this.player.cor = 71;
        kGAMECLASS.notes = "Cheater!";
        this.player.HP = kGAMECLASS.maxHP();
        this.player.hairLength = 10;
        this.player.skinType = SKIN_TYPE_PLAIN;
        this.player.faceType = FACE_HUMAN;
        this.player.tailType = TAIL_TYPE_FOX;
        this.player.tailVenom = 4;
        this.player.tongueType = TONUGE_HUMAN;
        this.player.femininity = 90;
        this.player.beardLength = 0;
        this.player.beardStyle = 0;
        this.player.tone = 0;
        this.player.thickness = 100;
        this.player.skinDesc = "skin";
        this.player.skinTone = "pale";
        this.player.hairColor = "black";
        this.player.balls = 2;
        this.player.cumMultiplier = 1;
        this.player.ballSize = 3;
        this.player.hoursSinceCum = 0;
        this.player.ass.analLooseness = 0;
        this.player.ass.analWetness = 0;
        this.player.ass.fullness = 0;
        this.player.fertility = 50;
        this.player.fatigue = 0;
        this.player.horns = 0;
        this.player.hornType = HORNS_NONE;
        this.player.tallness = 109;
        this.player.tailVenom = 0;
        this.player.tailRecharge = 0;
        this.player.wingType = WING_TYPE_DRACONIC_LARGE;
        this.player.wingDesc = "non-existant";
        this.player.earType = EARS_HUMAN;
        this.player.lowerBody = LOWER_BODY_TYPE_HUMAN;
        this.player.armType = ARM_TYPE_HUMAN;
        this.player.hairLength = 69.2;
        this.player.hairType = 4;
        // Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
        this.player.createStatusAffect(StatusAffects.Kelt, 100, 0, 0, 0);
        this.player.createKeyItem("Bow", 0, 0, 0, 0);

        this.player.createKeyItem("Zetaz's Map", 0, 0, 0, 0);

        this.inventory.createStorage();
        this.inventory.createStorage();
        this.inventory.createStorage();
        this.inventory.createStorage();
        this.inventory.createStorage();
        this.inventory.createStorage();
        this.player.createKeyItem("Camp - Chest", 0, 0, 0, 0);
        this.player.createKeyItem("Equipment Rack - Weapons", 0, 0, 0, 0);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00254] = 1;
        this.player.createKeyItem("Equipment Rack - Armor", 0, 0, 0, 0);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00255] = 1;
        this.flags[kFLAGS.D3_DISCOVERED] = 1;

        this.player.createStatusAffect(StatusAffects.KnowsWhitefire, 0, 0, 0, 0);

        this.player.createPerk(PerkLib.HistoryFighter, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Acclimation, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Berzerker, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.BrutalBlows, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.DoubleAttack, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.ImmovableObject, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.LightningStrikes, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.LungingAttacks, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Precision, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Regeneration, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Regeneration2, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Resistance, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Resolute, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.SpeedyRecovery, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Tactician, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Tank, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Tank2, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.ThunderousStrikes, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.WeaponMastery, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.WellAdjusted, 0, 0, 0, 0);

        this.player.createPerk(PerkLib.SensualLover, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.SensualLover, 0, 0, 0, 0);

        this.flags[kFLAGS.VALARIA_AT_CAMP] = 1;

        this.player.gems += 30000;
        this.outx(
            "You're something of a powerhouse, and you wager that between your odd mutations, power strong enough to threaten the village order, and talents, you're the natural choice to send through the portal."
        );

        this.player.itemSlot4.unlocked = true;
        this.player.itemSlot5.unlocked = true;
        this.player.itemSlot1.setItemAndQty(this.consumables.P_LBOVA, 5);
        this.player.itemSlot2.setItemAndQty(this.consumables.L_PNKEG, 1);
        this.player.itemSlot3.setItemAndQty(this.consumables.OVIELIX, 1);
        this.player.itemSlot4.setItemAndQty(this.consumables.REPTLUM, 1);

        this.player.createStatusAffect(StatusAffects.TelAdre, 1, 0, 0, 0);
        // player.createStatusAffect(StatusAffects.MetWhitney, 2, 0, 0, 0);

        // Izma
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] = 1;

        // Vapula
        this.flags[kFLAGS.VAPULA_FOLLOWER] = 1;

        // Amily
        this.flags[kFLAGS.AMILY_FOLLOWER] = 2;

        // Jojo
        kGAMECLASS.monk = 5;

        // Bimbo Sophie
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] = 1;

        // Isabella
        this.flags[kFLAGS.ISABELLA_FOLLOWER_ACCEPTED] = 1;

        // Latexy
        this.flags[kFLAGS.GOO_SLAVE_RECRUITED] = 1;
        this.flags[kFLAGS.GOO_NAME] = "Latexy";
        this.flags[kFLAGS.GOO_FLUID_AMOUNT] = 100;
        this.flags[kFLAGS.GOO_HAPPINESS] = 100;
        this.flags[kFLAGS.GOO_OBEDIENCE] = 100;

        // Ceraph
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00286] = 1;

        // Holli
        this.flags[kFLAGS.FUCK_FLOWER_LEVEL] = 4;

        // Milky
        this.flags[kFLAGS.MILK_NAME] = "Milky";
        this.flags[kFLAGS.MILK_SIZE] = 2;

        // Rubi Testing
        // flags[kFLAGS.RUBI_SUITCLOTHES] = 1;
        // flags[kFLAGS.RUBI_FETISH_CLOTHES] = 1;
        // flags[kFLAGS.RUBI_GREEN_ADVENTURER] = 1;
        // flags[kFLAGS.RUBI_TUBE_TOP] = 1;
        // flags[kFLAGS.RUBI_BODYSUIT] = 1;
        // flags[kFLAGS.RUBI_LONGDRESS] = 1;
        // flags[kFLAGS.RUBI_TIGHT_PANTS] = 1;
        // flags[kFLAGS.RUBI_NURSE_CLOTHES] = 1;
        // flags[kFLAGS.RUBI_SWIMWEAR] = 1;
        // flags[kFLAGS.RUBI_BIMBO_MINIDRESS] = 1;
        // flags[kFLAGS.RUBI_BONDAGE_STRAPS] = 1;
        // flags[kFLAGS.RUBI_INQUISITORS_CORSET] = 1;
        this.flags[kFLAGS.RUBI_AFFECTION] = 75;
        this.flags[kFLAGS.RUBI_INTRODUCED] = 1;

        // Bazaar
        this.flags[kFLAGS.BAZAAR_ENTERED] = 1;
    }

    private customTyriana(): void {
        this.outx(
            "Your many, posh tits, incredible fertility, and well-used cunt made you more popular than the village bicycle.  With your cat-like ears, paws, and tail, you certainly had a feline appeal.  It's time to see how you fare in the next chapter of your life."
        );
        // "Gender: Female
        this.player.gender = 2;
        // Vagina: Ridiculously loose, 3 inch clitoris, dripping constantly, fertile like a bunny on steroids and non-virgin
        this.player.createVagina();
        this.player.clitLength = 3;
        this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_DROOLING;
        this.player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_LEVEL_CLOWN_CAR;
        this.player.vaginas[0].virgin = false;
        this.player.fertility = 50;
        // Butt: Just as loose
        this.player.ass.analLooseness = 5;
        // "Skin: Tanned
        this.player.skinTone = "tan";
        // Hair: Ridiculously long red
        this.player.hairLength = 80;
        this.player.hairColor = "red";
        // Face: Gorgeous Feminine, long demonic tongue, cat ears
        this.player.femininity = 100;
        this.player.tongueType = TONUGE_DEMONIC;
        this.player.earType = EARS_CAT;
        // Body: Very muscular, average weight, plump ass, above average thighs, cat tail and cat paws
        this.player.tone = 80;
        this.player.thickness = 50;
        this.player.buttRating = 12;
        this.player.hipRating = 10;
        this.player.tailType = TAIL_TYPE_CAT;
        this.player.lowerBody = LOWER_BODY_TYPE_CAT;
        // Breasts: 2 E-cups on top, 2 DD-cups mid, 2 D-cups bottom, 3.5 inch nipples
        this.player.createBreastRow();
        this.player.createBreastRow();
        this.player.createBreastRow();
        this.player.tallness = 67;
        this.player.breastRows[0].breastRating = 7;
        this.player.breastRows[1].breastRating = 5;
        this.player.breastRows[2].breastRating = 4;
        this.player.nippleLength = 3.5;
        // Perks: Slut and Fertile"

        this.player.spe += 3;
        this.player.inte += 2;

        this.player.createPerk(PerkLib.HistorySlut, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
        this.player.teaseLevel = 3;
    }

    private customVahdunbrii(): void {
        this.player.createBreastRow();
        this.player.createVagina();
        this.player.breastRows[0].breastRating = 3;
        this.player.clitLength = 0.5;
        this.player.fertility = 10;
        this.player.gender = 2;
        this.player.hipRating = 6;
        this.player.buttRating = 6;
        this.player.str = 15;
        this.player.tou = 15;
        this.player.spe = 18;
        this.player.inte = 17;
        this.player.sens = 15;
        this.player.lib = 15;
        this.player.cor = 0;
        kGAMECLASS.notes = "No Notes Available.";
        this.player.HP = kGAMECLASS.maxHP();
        this.player.hairLength = 10;
        this.player.skinType = SKIN_TYPE_PLAIN;
        this.player.faceType = FACE_HUMAN;
        this.player.tailType = TAIL_TYPE_NONE;
        this.player.tongueType = TONUGE_HUMAN;
        this.player.femininity = 70;
        this.player.beardLength = 0;
        this.player.beardStyle = 0;
        this.player.tone = 30;
        this.player.thickness = 50;
        this.player.skinDesc = "skin";
        this.player.skinTone = "light";
        this.player.hairColor = "brown";
        this.player.balls = 0;
        this.player.cumMultiplier = 1;
        this.player.ballSize = 0;
        this.player.hoursSinceCum = 0;
        this.player.clitLength = 0;
        this.player.ass.analLooseness = 0;
        this.player.ass.analWetness = 0;
        this.player.ass.fullness = 0;
        this.player.fertility = 5;
        this.player.fatigue = 0;
        this.player.horns = 0;
        this.player.tallness = 67;
        this.player.tailVenom = 0;
        this.player.tailRecharge = 0;
        this.player.wingType = WING_TYPE_NONE;
        this.player.wingDesc = "non-existant";
        this.player.earType = EARS_CAT;
        this.player.lowerBody = LOWER_BODY_TYPE_CAT;
        this.player.tailType = TAIL_TYPE_CAT;
        this.player.createPerk(PerkLib.Incorporeality, 0, 0, 0, 0);
        this.player.wingType = WING_TYPE_FEATHERED_LARGE;
        this.player.armType = ARM_TYPE_HARPY;
        this.player.hornType = HORNS_DRACONIC_X2;
        this.player.horns = 4;
        this.player.faceType = FACE_SPIDER_FANGS;
        this.player.hairLength = 69.2;
        this.player.hairColor = "dark blue";
        this.player.hairType = 2;
        this.player.skinAdj = "smooth";
        this.player.skinTone = "sanguine";
        this.player.tallness = 68;
        this.player.hipRating = 7;
        this.player.buttRating = 6;
        this.player.thickness = 4;
        this.player.tone = 98;
        this.player.breastRows[0].breastRating = 3;
        this.player.clitLength = 0.2;
        this.player.femininity = 85;
        // Beautiful Sword
        this.player.setWeapon(this.weapons.B_SWORD);
        this.player.setArmor(this.armors.SSARMOR);
        // Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
        this.player.createStatusAffect(StatusAffects.Kelt, 100, 0, 0, 0);
        this.player.createKeyItem("Bow", 0, 0, 0, 0);
        this.inventory.createStorage();
        this.inventory.createStorage();
        this.inventory.createStorage();
        this.inventory.createStorage();
        this.inventory.createStorage();
        this.inventory.createStorage();
        this.player.createKeyItem("Camp - Chest", 0, 0, 0, 0);
        this.player.createKeyItem("Equipment Rack - Weapons", 0, 0, 0, 0);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00254] = 1;
        this.player.createKeyItem("Equipment Rack - Armor", 0, 0, 0, 0);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00255] = 1;
        // (Flexibility), (Incorporeality), History: Religious, Dragonfire, Brood Mother, Magical Fertility, Wet Pussy, Tough, Strong, Fast, Smart, History: Scholar, History: Slacker, Strong Back, Strong Back 2: Stronger Harder
        this.player.createPerk(PerkLib.Flexibility, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.HistoryReligious, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Dragonfire, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.BroodMother, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
        this.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_WET;
        this.player.createPerk(PerkLib.WetPussy, 2, 0, 0, 0);
        this.player.createPerk(PerkLib.Tough, 0.25, 0, 0, 0);
        this.player.createPerk(PerkLib.Strong, 0.25, 0, 0, 0);
        this.player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
        this.player.createPerk(PerkLib.Smart, 0.25, 0, 0, 0);
        this.player.createPerk(PerkLib.HistoryScholar, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.StrongBack, 0, 0, 0, 0);
        this.player.itemSlot4.unlocked = true;
        this.player.itemSlot5.unlocked = true;
        this.player.createPerk(PerkLib.StrongBack2, 0, 0, 0, 0);
        this.player.createPerk(PerkLib.HistorySlacker, 0, 0, 0, 0);
        this.player.str += 4;
        this.player.tou += 4;
        this.player.inte += 2;
        this.player.spe += 2;
        this.player.gems += 300;
        this.outx(
            "You're something of a powerhouse, and you wager that between your odd mutations, power strong enough to threaten the village order, and talents, you're the natural choice to send through the portal."
        );
    }

    /* Replaced by private functions
    public  doCreation(eventNo: number): void {
    var  e:MouseEvent;
    var  historyPerk:PerkType;
        // MAN
        if(eventNo == 10000) {
            player.str+=3;
            player.tou+=2;
            player.balls = 2;
            player.ballSize = 1;
            player.createCock();
            player.tallness = 71;
            player.tone = 60;
            player.cocks[0].cockLength = 5.5;
            player.cocks[0].cockThickness = 1;
            player.cocks[0].cockType = CockTypesEnum.HUMAN;
            player.cocks[0].knotMultiplier = 1;
            player.createBreastRow();
            player.breastRows[0].breastRating = 0;
            outx("\n\n\n\n\nYou are a man.  Your upbringing has provided you an advantage in strength and toughness.\n\nWhat type of build do you have?", true);
            simpleChoices("Lean", 10003, "Average", 10002, "Thick", 10005, "Girly", 10004, "", 0);
            player.gender = 1;
            player.hairLength=1;
        }
        // WOMAN
        if(eventNo == 10001) {
            player.spe+=3;
            player.inte+=2;
            player.clitLength = .5;
            player.tone = 30;
            player.fertility = 10;
            player.hairLength=10;
            player.createBreastRow();
            player.createVagina();
            player.tallness = 67;
            player.breastRows[0].breastRating = 3;
            outx("\n\n\n\n\nYou are a woman.  Your upbringing has provided you an advantage in speed and intellect.\n\nWhat type of build do you have?", true);
            simpleChoices("Slender", 10003, "Average", 10002, "Curvy", 10005, "Tomboyish", 10006, "", 0);
            player.gender = 2;
        }
        // Average b-type
        if(eventNo == 10002) {
            if(player.gender == 1) {
                player.hipRating = 4;
                player.buttRating = 4;
                player.femininity = 30;
            }
            if(player.gender == 2) {
                player.hipRating = 6;
                player.buttRating = 6;
                player.femininity = 70;
            }
            eventParser(10007);
        }
        // lean b-type
        if(eventNo == 10003) {
            if(player.gender == 1) {
                player.hipRating = 2;
                player.buttRating = 2;
                player.femininity = 34;
                player.thickness = 30;
            }
            if(player.gender == 2) {
                player.hipRating = 6;
                player.buttRating = 2;
                player.femininity = 66;
                player.thickness = 30;
                player.tone += 5;
            }
            player.str -= 1;
            player.spe += 1;
            eventParser(10007);
        }
        // girly b-type
        if(eventNo == 10004) {
            player.hipRating = 2;
            player.buttRating = 6;
            player.breastRows[0].breastRating = 1;
            player.femininity = 50;
            eventParser(10007);
            player.str -= 2;
            player.spe += 2;
            player.tone = 26;
        }
        // thick b-type
        if(eventNo == 10005) {
            if(player.gender == 1) {
                player.hipRating = 4;
                player.buttRating = 6;
                player.spe -= 4;
                player.str += 2;
                player.tou += 2;
                player.femininity = 29;
                player.thickness = 70;
                player.tone -= 5;
            }
            if(player.gender == 2) {
                player.spe -= 2;
                player.str += 1;
                player.tou += 1;
                player.femininity = 71;
                player.hipRating = 8;
                player.buttRating = 8;
                player.thickness = 70;
                player.breastRows[0].breastRating++;
            }
            eventParser(10007);
        }
        // tomboy b-type
        if(eventNo == 10006) {
            player.femininity = 56;
            player.hipRating = 2;
            player.buttRating = 0;
            player.breastRows[0].breastRating = 2;
            player.tone = 50;
            eventParser(10007);
        }

        // Choose complexion
        if(eventNo == 10007) {
            outx("\n\n\n\n\nWhat is your complexion?", true);
            simpleChoices("Light", 10008, "Olive", 10009, "Dark", 10010, "Ebony", 10011, "", 0);
        }
        if(eventNo == 10008) {
            player.skinTone = "light";
            eventParser(10012);
        }
        if(eventNo == 10009) {
            player.skinTone = "olive";
            eventParser(10012);
        }
        if(eventNo == 10010) {
            player.skinTone = "dark";
            eventParser(10012);
        }
        if(eventNo == 10011) {
            player.skinTone = "ebony";
            eventParser(10012);
        }
        if(eventNo == 10012) {
            outx("\n\n\nYou selected a " + player.skinTone + " complexion.\n\nWhat color is your hair?", true);
            choices("Blonde", 10013, "Brown", 10014, "Black", 10015, "Red", 10016, "Gray", 10017, "White", 10018, "Auburn", 10019, "", 0, "", 0, "", 0);
        }
        // Set blonde hair
        if(eventNo == 10013) {
            player.hairColor = "blonde";
            eventParser(10020);
        }
        // set brown hair
        if(eventNo == 10014) {
            player.hairColor = "brown";
            eventParser(10020);
        }
        // set black hair
        if(eventNo == 10015) {
            player.hairColor = "black";
            eventParser(10020);
        }
        // set red hair
        if(eventNo == 10016) {
            player.hairColor = "red";
            eventParser(10020);
        }
        // set gray hair
        if(eventNo == 10017) {
            player.hairColor = "gray";
            eventParser(10020);
        }
        // set white hair
        if(eventNo == 10018) {
            player.hairColor = "white";
            eventParser(10020);
        }
        // set auburn hair
        if(eventNo == 10019) {
            player.hairColor = "auburn";
            eventParser(10020);
        }
        // Gender endowment choices
        if(eventNo == 10020) {
            outx("You have " + hairDescript() + ".", true);
            outx("\n\nEvery person is born with a gift.  What's yours?", true);
            if(player.gender == 1) choices("Strength", 10021, "Toughness", 10022, "Speed", 10023, "Smarts", 10024, "Libido", 10025, "Touch", 10026, "Big Cock", 10027, "Lots of Jizz", 10028, "", 0, "", 0);
            if(player.gender == 2) choices("Strength", 10021, "Toughness", 10022, "Speed", 10023, "Smarts", 10024, "Libido", 10025, "Touch", 10026, "Big Breasts", 10029, "Big Clit", 10030, "Fertile", 10031, "Wet Vagina", 10032);
        }
        // Strong
        if(eventNo == 10021) {
            outx("Are you stronger than normal? (+5 Strength)\n\nStrength increases your combat damage, and your ability to hold on to an enemy or pull yourself away.\n", true);
            doYesNo(10033, 10020);
            temp = 1;
        }
        // Tough
        if(eventNo == 10022) {
            outx("Are you unusually tough? (+5 Toughness)\n\nToughness gives you more HP and increases the chances an attack against you will fail to wound you.\n", true);
            doYesNo(10033, 10020);
            temp = 2;
        }
        // Fast
        if(eventNo == 10023) {
            outx("Are you very quick?  (+5 Speed)\n\nSpeed makes it easier to escape combat and grapples.  It also boosts your chances of evading an enemy attack and successfully catching up to enemies who try to run.\n", true);
            doYesNo(10033, 10020);
            temp = 3;
        }
        // Smart
        if(eventNo == 10024) {
            outx("Are you a quick learner?  (+5 Intellect)\n\nIntellect can help you avoid dangerous monsters or work with machinery.  It will also boost the power of any spells you may learn in your travels.\n", true);
            doYesNo(10033, 10020);
            temp = 4;
        }
        // Libido
        if(eventNo == 10025) {
            outx("Do you have an unusually high sex-drive?  (+5 Libido)\n\nLibido affects how quickly your lust builds over time.  You may find a high libido to be more trouble than it's worth...\n", true);
            temp = 5;
            doYesNo(10033, 10020);
        }
        // Light Touch
        if(eventNo == 10026) {
            outx("Is your skin unusually sensitive?  (+5 Sensitivity)\n\nSensitivity affects how easily touches and certain magics will raise your lust.  Very low sensitivity will make it difficult to orgasm.\n", true);
            temp = 6;
            doYesNo(10033, 10020);
        }
        // Big Cock
        if(eventNo == 10027) {
            outx("Do you have a big cock?  (+2\" Cock Length)\n\nA bigger cock will make it easier to get off any sexual partners, but only if they can take your size.\n", true);
            temp = 7;
            doYesNo(10033, 10020);
        }
        // Messy Orgasms
        if(eventNo == 10028) {
            outx("Are your orgasms particularly messy?  (+50% Cum Multiplier)\n\nA higher cum multiplier will cause your orgasms to be messier.\n", true);
            doYesNo(10033, 10020);
            temp = 8;
        }
        // Big Tits
        if(eventNo == 10029) {
            outx("Are your breasts bigger than average? (DD cups)\n\nLarger breasts will allow you to lactate greater amounts, tit-fuck larger cocks, and generally be a sexy bitch.\n", true);
            doYesNo(10033, 10020);
            temp = 9;
        }
        // Big clit
        if(eventNo == 10030) {
            outx("Do you have a big clit?  (1\" Long)\n\nA large enough clit may eventually become as large as a cock.  It also makes you gain lust much faster during oral or manual stimulation.\n", true);
            doYesNo(10033, 10020);
            temp = 10;
        }
        // Fertility
        if(eventNo == 10031) {
            outx("Is your family particularly fertile?  (+15% Fertility)\n\nA high fertility will cause you to become pregnant much more easily.  Pregnancy may result in: Strange children, larger bust, larger hips, a bigger ass, and other weirdness.\n", true);
            temp = 11;
            doYesNo(10033, 10020);
        }
        // Wet pussy
        if(eventNo == 10032) {
            outx("Does your pussy get particularly wet?  (+1 Vaginal Wetness)\n\nVaginal wetness will make it easier to take larger cocks, in turn helping you bring the well-endowed to orgasm quicker.\n", true);
            doYesNo(10033, 10020);
            temp = 12;
        }
        if(eventNo == 10033)
        {


            if(temp == 1) {
                player.str += 5;
                player.tone += 7;
                player.thickness += 3;
                // Add bonus +25% strength gain
                player.createPerk(PerkLib.Strong, 0.25, 0, 0, 0);
            }
            if(temp == 2) {
                player.tou += 5;
                player.tone += 5;
                player.thickness += 5;
                player.createPerk(PerkLib.Tough, 0.25, 0, 0, 0);
                player.HP = kGAMECLASS.maxHP();
            }
            if(temp == 3) {
                player.spe += 5;
                player.tone += 10;
                player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
            }
            if(temp == 4) {
                player.inte += 5;
                player.thickness -= 5;
                player.createPerk(PerkLib.Smart, 0.25, 0, 0, 0);
            }
            if(temp == 5) {
                player.lib += 5;
                player.createPerk(PerkLib.Lusty, 0.25, 0, 0, 0);
            }
            if(temp == 6) {
                player.sens += 5;
                player.createPerk(PerkLib.Sensitive, 0.25, 0, 0, 0);
            }
            if(temp == 7) {
                player.femininity -= 5;
                player.cocks[0].cockLength = 8;
                player.cocks[0].cockThickness = 1.5;
                trace("Creation - cock modded to 8inches");
                player.createPerk(PerkLib.BigCock, 1.25, 0, 0, 0);
            }
            if(temp == 8) {
                player.femininity -= 2;
                player.cumMultiplier = 1.5;
                player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
            }
            if(temp == 9) {
                player.femininity += 5;
                player.breastRows[0].breastRating += 2;
                player.createPerk(PerkLib.BigTits, 1.5, 0, 0, 0);
            }
            if(temp == 10) {
                player.femininity -= 5;
                player.clitLength = 1;
                player.createPerk(PerkLib.BigClit, 1.25, 0, 0, 0);
            }
            if(temp == 11) {
                player.femininity += 5;
                player.fertility += 25;
                player.hipRating+=2;
                player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
            }
            if(temp == 12) {
                player.femininity += 7;
                player.vaginas[0].vaginalWetness = VAGINA_WETNESS_WET;
                player.createPerk(PerkLib.WetPussy,2,0,0,0);
            }
            eventParser(10036);
        }
        // Choose name
        if(eventNo == 10034)
        {
            if (kGAMECLASS.testingBlockExiting)
            {
                // We're running under the testing script.
                // Stuff a name in the box and go go go
                mainView.nameBox.text = "Derpy"
            }
            else if(mainView.nameBox.text == "")
            {

                // If part of newgame+, don't fully wipe.
                if(player.XP > 0 && player.explored == 0) {
                    flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] = player.XP;
                    if(flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] == 0) flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] = 1;
                    while(player.level > 1) {
                        flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] += player.level * 100;
                        player.level--;
                    }
                    flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_ITEMS] = player.gems;
                }

                newGameGo(e);
                outx("\n\n\n<b>You must select a name.</b>", false);
                return;
            }
            else if(customName(mainView.nameBox.text)) {
                clearOutput();
                outx("This name, like you, is special.  Do you live up to your name or continue on, assuming it to be coincidence?");
                mainView.nameBox.visible = false;
                menu();
                addButton(0,"SpecialName",useCustomProfile);
                addButton(1,"Continue On",noCustomProfile);
                return;
            }
            player.short = mainView.nameBox.text;
            mainView.nameBox.visible = false;
            outx("\n\n\n\nAre you a man or a woman?", true);
            simpleChoices("Man", 10000, "Woman", 10001, "", 0, "", 0, "", 0);
        }
        // New Game+
        if(eventNo == 10035) {
            flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] = player.XP;
            if(flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] == 0) flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] = 1;
            while(player.level > 1) {
                flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_XP] += player.level * 100;
                player.level--;
            }
            flags[kFLAGS.NEW_GAME_PLUS_BONUS_STORED_ITEMS] = player.gems;
            newGameGo(e);
            return;
        }
        // ======================
        //  HISTORIEZ
        // ======================
        if(eventNo == 10036) {
            outx("Before you became a champion, you had other plans for your life.  What were you doing before?", true);
            choices("Alchemy",10037,"Fighting",10038,"Healing",10039,"Religion",10040,"Schooling",10041,"Slacking",10042,"Slutting",10046,"Smithing",10043,"Whoring",10047,"",0);
            return;
        }
        // Alchemy
        if(eventNo == 10037) {
            outx("You spent some time as an alchemist's assistant, and alchemical items always seem to be more reactive in your hands.  Is this your history?", true);
            temp = 10037;
            doYesNo(10044,10036);
            return;
        }
        // Fightan'
        if(eventNo == 10038) {
            outx("You spent much of your time fighting other children, and you had plans to find work as a guard when you grew up.  You do 10% more damage with physical attacks.  Is this your history?", true);
            temp = 10038;
            doYesNo(10044,10036);
            return;
        }
        // Healin'
        if(eventNo == 10039) {
            outx("You often spent your free time with the village healer, learning how to tend to wounds.  Healing items and effects are 20% more effective.  Is this your history?", true);
            temp = 10039;
            doYesNo(10044,10036);
            return;
        }
        // Religions
        if(eventNo == 10040) {
            outx("You spent a lot of time at the village temple, and learned how to meditate.  The 'masturbation' option is replaced with 'meditate' when corruption is at or below 66.  Is this your history?", true);
            temp = 10040;
            doYesNo(10044,10036);
            return;
        }
        // Scholar
        if(eventNo == 10041) {
            outx("You spent much of your time in school, and even begged the richest man in town, Mr. Savin, to let you read some of his books.  You are much better at focusing, and spellcasting uses 20% less fatigue.  Is this your history?", true);
            temp = 10041;
            doYesNo(10044,10036);
            return;
        }
        // Slacker
        if(eventNo == 10042) {
            outx("You spent a lot of time slacking, avoiding work, and otherwise making a nuisance of yourself.  Your efforts at slacking have made you quite adept at resting, and your fatigue comes back 20% faster.  Is this your history?", true);
            temp = 10042;
            doYesNo(10044,10036);
            return;
        }
        // Smith
        if(eventNo == 10043) {
            outx("You managed to get an apprenticeship with the local blacksmith.  Because of your time spent at the blacksmith's side, you've learned how to fit armor for maximum protection.  Is this your history?", true);
            temp = 10043;
            doYesNo(10044,10036);
            return;
        }
        if(eventNo == 10044) {
            // Alchemist
            if(temp == 10037) historyPerk = PerkLib.HistoryAlchemist;
            else if(temp == 10038) historyPerk = PerkLib.HistoryFighter;
            else if(temp == 10039) historyPerk = PerkLib.HistoryHealer;
            else if(temp == 10040) historyPerk = PerkLib.HistoryReligious;
            else if(temp == 10041) historyPerk = PerkLib.HistoryScholar;
            else if(temp == 10042) historyPerk = PerkLib.HistorySlacker;
            else if(temp == 10046) {
                historyPerk = PerkLib.HistorySlut;
                if(player.hasVagina()) {
                    player.vaginas[0].virgin = false;
                    player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_LOOSE;
                }
                player.ass.analLooseness = 1;
            }
            else if(temp == 10047) {
                historyPerk = PerkLib.HistoryWhore;
                if(player.hasVagina()) {
                    player.vaginas[0].virgin = false;
                    player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS_LOOSE;
                }
                player.ass.analLooseness = 1;
            }
            else historyPerk = PerkLib.HistorySmith;
            player.createPerk(historyPerk,0,0,0,0);
            if(flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00418] == 0) {
                eventParser(10045);
                flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00418] = 1;
            }
            else {
                flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00418] = 1;
                eventParser(1);
            }
            return;
        }
        if(eventNo == 10045) {
            if(flags[kFLAGS.CUSTOM_PC_ENABLED] == 1) {
                clearOutput();
                flags[kFLAGS.CUSTOM_PC_ENABLED] = 0;
                kGAMECLASS.customPCSetup();
                doNext(10045);
                return;
            }
            statScreenRefresh();
            model.time.hours = 11;
            outx("You are prepared for what is to come.  Most of the last year has been spent honing your body and mind to prepare for the challenges ahead.  You are the Champion of Ingnam.  The one who will journey to the demon realm and guarantee the safety of your friends and family, even though you'll never see them again.  You wipe away a tear as you enter the courtyard and see Elder Nomur waiting for you.  You are ready.\n\n", true);
            outx("The walk to the tainted cave is long and silent.  Elder Nomur does not speak.  There is nothing left to say.  The two of you journey in companionable silence.  Slowly the black rock of Mount Ilgast looms closer and closer, and the temperature of the air drops.   You shiver and glance at the Elder, noticing he doesn't betray any sign of the cold.  Despite his age of nearly 80, he maintains the vigor of a man half his age.  You're glad for his strength, as assisting him across this distance would be draining, and you must save your energy for the trials ahead.\n\n", false);
            outx("The entrance of the cave gapes open, sharp stalactites hanging over the entrance, giving it the appearance of a monstrous mouth.  Elder Nomur stops and nods to you, gesturing for you to proceed alone.\n\n", false);
            outx("The cave is unusually warm and damp, ");
            if(player.gender == 2) outx("and your body seems to feel the same way, flushing as you feel a warmth and dampness between your thighs. ");
            else outx("and your body reacts with a sense of growing warmth focusing in your groin, your manhood hardening for no apparent reason. ");
            outx("You were warned of this and press forward, ignoring your body's growing needs.  A glowing purple-pink portal swirls and flares with demonic light along the back wall.  Cringing, you press forward, keenly aware that your body seems to be anticipating coming in contact with the tainted magical construct.  Closing your eyes, you gather your resolve and leap forwards.  Vertigo overwhelms you and you black out...");
            showStats();
            dynStats("lus", +15);
            doNext(startNewGame);
            return;
        }
        // Slut
        if(eventNo == 10046) {
            outx("You managed to spend most of your time having sex.  Quite simply, when it came to sex, you were the village bicycle - everyone got a ride.  Because of this, your body is a bit more resistant to penetrative stretching, and has a higher upper limit on what exactly can be inserted.  Is this your history?", true);
            temp = 10046;
            doYesNo(10044,10036);
            return;
        }
        // Whore
        if(eventNo == 10047) {
            outx("You managed to find work as a whore.  Because of your time spent trading seduction for profit, you're more effective at teasing (+15% tease damage).  Is this your history?", true);
            temp = 10047;
            doYesNo(10044,10036);
            return;
        }
        if(eventNo == 10048) {

            return;
        }
        if(eventNo == 10049) {

            return;
        }
        if(eventNo == 10050) {

            return;
        }

    }
    */
}
