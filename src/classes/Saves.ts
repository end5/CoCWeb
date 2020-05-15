import { saveAs } from 'file-saver'

import { BaseContent } from "./BaseContent";
import { kGAMECLASS } from "./GlobalFlags/kGAMECLASS";
import { trace } from "../console";
import { kFLAGS } from "./GlobalFlags/kFLAGS";
import { CoC } from "./CoC";
import { Player } from "./Player";
import { ItemType } from "./ItemType";
import { Weapon } from "./Items/Weapon";
import { WeaponLib } from "./Items/WeaponLib";
import { Armor } from "./Items/Armor";
import { ArmorLib } from "./Items/ArmorLib";
import {
    EYES_HUMAN,
    ARM_TYPE_HUMAN,
    SKIN_TYPE_PLAIN,
    SKIN_TYPE_FUR,
    SKIN_TYPE_SCALES,
    SKIN_TYPE_GOO,
    TONUGE_HUMAN,
    EARS_HUMAN,
    ANTENNAE_NONE,
    HORNS_NONE,
    BREAST_CUP_B,
} from "../includes/appearanceDefs";
import { CockTypesEnum } from "./CockTypesEnum";
import { PerkType } from "./PerkType";
import { PerkLib } from "./PerkLib";
import { StatusAffectType } from "./StatusAffectType";
import { CocSettings } from "./CoC_Settings";
import { ItemSlotClass } from "./ItemSlotClass";
import { StatusAffects } from "./StatusAffects";
import { BreastStore } from "./BreastStore";
import { PregnancyStore } from "./PregnancyStore";
import { Flags, createFlags } from "./FlagTypeOverrides";

export class Saves extends BaseContent {
    private static SAVE_FILE_CURRENT_INTEGER_FORMAT_VERSION = 816;
    // Didn't want to include something like this, but an integer is safer than depending on the text version number from the CoC class.
    // Also, this way the save file version doesn't need updating unless an important structural change happens in the save file.

    private gameStateGet: any;
    private gameStateSet: any;
    private itemStorageGet: any;
    private gearStorageGet: any;

    public constructor(gameStateDirectGet: any, gameStateDirectSet: any) {
        super();
        this.gameStateGet = gameStateDirectGet; // This is so that the save game functions (and nothing else) get direct access to the gameState variable
        this.gameStateSet = gameStateDirectSet;
    }

    public linkToInventory(itemStorageDirectGet: any, gearStorageDirectGet: any): void {
        this.itemStorageGet = itemStorageDirectGet;
        this.gearStorageGet = gearStorageDirectGet;
    }

    public saveFileNames: any[] = [
        "CoC_1",
        "CoC_2",
        "CoC_3",
        "CoC_4",
        "CoC_5",
        "CoC_6",
        "CoC_7",
        "CoC_8",
        "CoC_9",
    ];
    public versionProperties: Record<string, any> = {
        legacy: 100,
        "0.8.3f7": 124,
        "0.8.3f8": 125,
        "0.8.4.3": 119,
        latest: 119,
    };
    public savedGameDir = "data/com.fenoxo.coc";

    public loadSaveDisplay(saveFile: Record<string, any>, slotName: string): string {
        let holding = "";
        if (saveFile.exists && saveFile.flags[2066] == undefined) {
            if (saveFile.notes == undefined) {
                saveFile.notes = "No notes available.";
            }
            holding = slotName;
            holding += ":  <b>";
            holding += saveFile.short;
            holding += `</b> - <i>${saveFile.notes}</i>\r`;
            holding += `Days - ${saveFile.days}  Gender - `;
            if (saveFile.gender == 0) holding += "U";
            if (saveFile.gender == 1) holding += "M";
            if (saveFile.gender == 2) holding += "F";
            if (saveFile.gender == 3) holding += "H";
            holding += "\r";
            return holding;
        } else if (saveFile.exists && saveFile.flags[2066] != undefined) {
            return `${slotName}:  <b>UNSUPPORTED</b>\rThis is a save file that has been created in a modified version of CoC.\r`;
        } else {
            return `${slotName}:  <b>EMPTY</b>\r     \r`;
        }
    }

    public getSaveObj(key: string): Record<string, any> {
        const save = localStorage.getItem(key);
        if (save) return JSON.parse(save);
        else return {};
    }

    public loadScreen(): void {
        const slots: any[] = new Array(this.saveFileNames.length);

        this.outx("<b><u>Slot: Sex,  Game Days Played</u></b>\r", true);

        this.saveFileNames.forEach((name, i) => {
            const test: Record<string, any> = this.getSaveObj(name);

            this.outx(this.loadSaveDisplay(test, String(i + 1)), false);

            if (test.exists && test.flags[2066] == undefined) {
                // trace("Creating function with indice = ", i);
                slots[i] = () => {
                    trace("Loading save with name", name, "at index", i);
                    this.loadGame(name);
                    // if (this.loadGame(name)) {
                    //     this.doNext(this.playerMenu);
                    //     this.showStats();
                    //     this.statScreenRefresh();
                    //     this.outx("Slot " + i + " Loaded!", true);
                    // }
                };
            } else {
                slots[i] = undefined; // You have to set the parameter to 0 to disable the button
            }
        });

        this.choices(
            "Slot 1",
            slots[0],
            "Slot 2",
            slots[1],
            "Slot 3",
            slots[2],
            "Slot 4",
            slots[3],
            "Slot 5",
            slots[4],
            "Slot 6",
            slots[5],
            "Slot 7",
            slots[6],
            "Slot 8",
            slots[7],
            "Slot 9",
            slots[8],
            "Back",
            this.saveLoad
        );
    }

    public saveScreen(): void {
        const input = document.createElement("input");

        // var test; // Disabling this variable because it seems to be unused.

        this.outx("", true);
        if (this.player.slotName != "VOID")
            this.outx(`<b>Last saved or loaded from: ${this.player.slotName}</b>\r\r`, false);
        this.outx("<b><u>Slot: Sex,  Game Days Played</u></b>\r", false);

        const saveFuncs: any[] = [];

        for (let i = 0; i < this.saveFileNames.length; i += 1) {
            const test: Record<string, any> = this.getSaveObj(this.saveFileNames[i]);
            this.outx(this.loadSaveDisplay(test, String(i + 1)), false);
            trace("Creating function with indice = ", i);
            ((ii: number) => {
                saveFuncs[ii] = () => {
                    trace("Saving game with name", this.saveFileNames[ii], "at index", ii);
                    this.saveGame(this.saveFileNames[ii], input);
                };
            })(i);
        }

        if (this.player.slotName == "VOID") this.outx("\r\r", false);

        this.outx(
            "<b>Leave the notes box blank if you don't wish to change notes.\r<u>NOTES:</u></b>",
            false
        );
        this.choices(
            "Slot 1",
            saveFuncs[0],
            "Slot 2",
            saveFuncs[1],
            "Slot 3",
            saveFuncs[2],
            "Slot 4",
            saveFuncs[3],
            "Slot 5",
            saveFuncs[4],
            "Slot 6",
            saveFuncs[5],
            "Slot 7",
            saveFuncs[6],
            "Slot 8",
            saveFuncs[7],
            "Slot 9",
            saveFuncs[8],
            "Back",
            this.saveLoad
        );
        this.mainView.mainText.appendChild(input);
    }

    public saveLoad(): void {
        // this.mainView.eventTestInput.x = -10207.5;
        // this.mainView.eventTestInput.y = -1055.1;
        // Hide the name box in case of backing up from save
        // screen so it doesnt overlap everything.
        // this.mainView.nameBox.visible = false;
        this.outx("", true);
        this.outx("<b>Where are my saves located?</b>\n", false);
        this.outx(
            "<i>In Windows Vista/7 (IE/FireFox/Other): <pre>Users/{username}/Appdata/Roaming/Macromedia/Flash Player/#Shared Objects/{GIBBERISH}/</pre>\n\n",
            false
        );
        this.outx(
            "In Windows Vista/7 (Chrome): <pre>Users/{username}/AppData/Local/Google/Chrome/User Data/Default/Pepper Data/Shockwave Flash/WritableRoot/#SharedObjects/{GIBBERISH}/</pre>\n\n",
            false
        );
        this.outx(
            "Inside that folder it will saved in a folder corresponding to where it was played from.  If you saved the CoC.swf to your HDD, then it will be in a folder called localhost.  If you played from my website, it will be in fenoxo.com.  The save files will be labelled CoC_1.sol, CoC_2.sol, CoC_3.sol, etc.</i>\n\n",
            false
        );
        this.outx(
            "<b>Why do my saves disappear all the time?</b>\n<i>There are numerous things that will wipe out flash local shared files.  If your browser or player is set to delete flash cookies or data, that will do it.  CCleaner will also remove them.  CoC or its updates will never remove your savegames - if they disappear something else is wiping them out.</i>\n\n",
            false
        );
        this.outx(
            "<b>When I play from my HDD I have one set of saves, and when I play off your site I have a different set of saves.  Why?</b>\n<i>Flash stores saved data relative to where it was accessed from.  Playing from your HDD will store things in a different location than fenoxo.com or FurAffinity.</i>\n",
            false
        );
        this.outx(
            "<i>If you want to be absolutely sure you don't lose a character, copy the .sol file for that slot out and back it up! <b>For more information, google flash shared objects.</b></i>\n\n",
            false
        );
        this.outx("<b>Why does the Save File and Load File option not work?</b>\n");
        this.outx(
            "<i>Save File and Load File are limited by the security settings imposed upon CoC by Flash. These options will only work if you have downloaded the game from the website, and are running it from your HDD. Additionally, they can only correctly save files to and load files from the directory where you have the game saved.</i>"
        );
        // This is to clear the 'game over' block from stopping simpleChoices from working.  Loading games supercede's game over.
        if (this.mainView.bottomButtons[0].labelText == "Game Over") {
            this.temp = 777;
            this.mainView.bottomButtons[0].labelText = "save/load";
        }
        if (this.temp == 777) {
            this.menu();
            this.addButton(1, "Load", this.loadScreen);
            this.addButton(2, "Load File", this.loadFromFile);
            this.addButton(3, "Delete", this.deleteScreen);
            this.addButton(4, "Back", kGAMECLASS.gameOver, true);
            return;
        }
        if (this.player.str == 0) {
            this.simpleChoices(
                "",
                undefined,
                "Load",
                this.loadScreen,
                "Load File",
                this.loadFromFile,
                "Delete",
                this.deleteScreen,
                "Back",
                kGAMECLASS.mainMenu
            );
            return;
        }
        if (this.inDungeon) {
            this.simpleChoices(
                "",
                undefined,
                "Load",
                this.loadScreen,
                "Load File",
                this.loadFromFile,
                "Delete",
                this.deleteScreen,
                "Back",
                kGAMECLASS.playerMenu
            );
            return;
        }
        if (this.gameStateGet() == 3)
            this.choices(
                "Save",
                this.saveScreen,
                "Load",
                this.loadScreen,
                "Load File",
                this.loadFromFile,
                "Delete",
                this.deleteScreen,
                "Back",
                undefined,
                "Save to File",
                this.saveToFile,
                "Load File",
                this.loadFromFile,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
        else {
            if (this.player.autoSave)
                this.choices(
                    "Save",
                    this.saveScreen,
                    "Load",
                    this.loadScreen,
                    "AutoSav: ON",
                    this.autosaveToggle,
                    "Delete",
                    this.deleteScreen,
                    "",
                    undefined,
                    "Save to File",
                    this.saveToFile,
                    "Load File",
                    this.loadFromFile,
                    "",
                    undefined,
                    "",
                    undefined,
                    "Back",
                    kGAMECLASS.playerMenu
                );
            else
                this.choices(
                    "Save",
                    this.saveScreen,
                    "Load",
                    this.loadScreen,
                    "AutoSav: OFF",
                    this.autosaveToggle,
                    "Delete",
                    this.deleteScreen,
                    "",
                    undefined,
                    "Save to File",
                    this.saveToFile,
                    "Load File",
                    this.loadFromFile,
                    "",
                    undefined,
                    "",
                    undefined,
                    "Back",
                    kGAMECLASS.playerMenu
                );
        }
    }

    private saveToFile(notes: HTMLInputElement): void {
        this.saveGameObject(`CoC_${this.player.short}`, notes, true);
    }

    private loadFromFile(): void {
        this.openSave();
        this.showStats();
        this.statScreenRefresh();
    }

    private autosaveToggle(): void {
        this.player.autoSave = !this.player.autoSave;
        this.saveLoad();
    }

    public deleteScreen(): void {
        this.outx("Slot,  Race,  Sex,  Game Days Played\n", true);

        const delFuncs: any[] = [];

        this.saveFileNames.forEach((name, i) => {
            const test: Record<string, any> = this.getSaveObj(name);

            this.outx(this.loadSaveDisplay(test, String(i + 1)), false);
            delFuncs[i] = test.exists
                ? () => {
                      this.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION] = name;
                      this.confirmDelete();
                  }
                : undefined; // disable buttons for empty slots
        });

        this.outx("\n<b>ONCE DELETED, YOUR SAVE IS GONE FOREVER.</b>", false);
        this.choices(
            "Slot 1",
            delFuncs[0],
            "Slot 2",
            delFuncs[1],
            "Slot 3",
            delFuncs[2],
            "Slot 4",
            delFuncs[3],
            "Slot 5",
            delFuncs[4],
            "Slot 6",
            delFuncs[5],
            "Slot 7",
            delFuncs[6],
            "Slot 8",
            delFuncs[7],
            "Slot 9",
            delFuncs[8],
            "Back",
            this.saveLoad
        );
    }

    public confirmDelete(): void {
        this.outx(
            `You are about to delete the following save: <b>${
                this.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION]
            }</b>\n\nAre you sure you want to delete it?`,
            true
        );
        this.simpleChoices(
            "No",
            this.deleteScreen,
            "Yes",
            this.purgeTheMutant,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }

    public purgeTheMutant(): void {
        const slot = `${this.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION]}`

        const test: any = this.getSaveObj(slot);
        trace(`DELETING SLOT: ${this.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION]}`);
        const commentList: string[] = [
            "been virus bombed",
            "been purged",
            "been vaped",
            "been nuked from orbit",
            "taken an arrow to the knee",
            "fallen on its sword",
            "lost its reality matrix cohesion",
            "been cleansed",
            "suffered the following error: (404) Porn Not Found",
        ];

        trace(`${commentList.length} array slots`);
        const comment = Saves.randomChoiceTyped(commentList);
        this.outx(`${this.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION]} has ${comment}.`, true);

        localStorage.removeItem(slot)

        this.doNext(this.deleteScreen);
    }

    public saveGame(slot: string, notes?: HTMLInputElement): void {
        this.player.slotName = slot;
        this.saveGameObject(slot, notes);
    }

    public loadGame(slot: string): void {
        const saveFile: any = this.getSaveObj(slot);

        // Check the property count of the file
        const numProps: number = Object.keys(saveFile).length;

        let sfVer: any;
        if (saveFile.version == undefined) {
            sfVer = this.versionProperties.legacy;
        } else {
            sfVer = this.versionProperties[saveFile.version];
        }

        if (!(typeof sfVer == "number")) {
            sfVer = this.versionProperties.latest;
        }

        trace(`File version ${saveFile.version || "legacy"}expects propNum ${sfVer}`);

        // if (numProps < sfVer) {
        //     trace("Got " + numProps + " file properties -- failed!");
        //     this.outx("<b>Aborting load.  The current save file is missing a number of expected properties.</b>\n\n", true);

        //     var backup = this.getSaveObj(slot + "_backup");

        //     if (backup.exists) {
        //         this.outx("Would you like to load the backup version of this slot?");
        //         this.menu();
        //         this.addButton(0, "Yes", this.loadGame, (slot + "_backup"));
        //         this.addButton(1, "No", this.saveLoad);
        //     }
        //     else {
        //         this.menu();
        //         this.addButton(0, "Next", this.saveLoad);
        //     }
        // }
        // else {
        trace(`Got ${numProps} file properties -- success!`);
        // I want to be able to write some debug stuff to the GUI during the loading process
        // Therefore, we clear the display *before* calling loadGameObject
        this.outx("", true);

        this.loadGameObject(saveFile, slot);
        this.outx("Game Loaded");
        this.temp = 0;
        this.statScreenRefresh();

        if (this.player.slotName == "VOID") {
            trace(`Setting in-use save slot to: ${slot}`);
            this.player.slotName = slot;
        }

        this.doNext(this.playerMenu);
        // }
    }

    /*

    OH GOD SOMEONE FIX THIS DISASTER!!!!111one1ONE!

    */
    // FURNITURE'S JUNK
    public saveGameObject(slot: string, notes?: HTMLInputElement, exportFile?: boolean): void {
        // Autosave stuff
        if (this.player.slotName != "VOID") this.player.slotName = slot || "";

        let backupAborted = false;

        CoC.saveAllAwareClasses(this.getGame()); // Informs each saveAwareClass that it must save its values in the flags array
        // var counter: number = this.player.cocks.length;
        // Initialize the save file
        let saveFile: any;
        let backup;
        if (!slot) {
            saveFile = {};
        } else {
            saveFile = this.getSaveObj(slot);
        }

        // Set a single variable that tells us if this save exists

        saveFile.exists = true;
        saveFile.version = this.ver;
        this.flags[kFLAGS.SAVE_FILE_INTEGER_FORMAT_VERSION] =
            Saves.SAVE_FILE_CURRENT_INTEGER_FORMAT_VERSION;

        // CLEAR OLD ARRAYS

        // Save sum dataz
        trace("SAVE DATAZ");
        saveFile.short = this.player.short;
        saveFile.a = this.player.a;

        // Notes
        if (notes && notes.value != "") {
            saveFile.notes = notes.value;
            this.getGame().notes = notes.value;
        } else saveFile.notes = this.getGame().notes;

        try {
            // flags
            saveFile.flags = {};
            for (const key of Object.keys(this.flags)) {
                // Don't save unset/default flags
                if ((this.flags as Record<string | number, any>)[key] !== 0) {
                    saveFile.flags[key] = (this.flags as Record<string | number, any>)[key];
                }
            }
            let i = 0;

            // CLOTHING/ARMOR
            saveFile.armorId = this.player.armor.id;
            saveFile.weaponId = this.player.weapon.id;
            saveFile.armorName = this.player.modArmorName;
            // saveFile.weaponName = player.weaponName;// uncomment for backward compatibility
            // saveFile.weaponVerb = player.weaponVerb;// uncomment for backward compatibility
            // saveFile.armorDef = player.armorDef;// uncomment for backward compatibility
            // saveFile.armorPerk = player.armorPerk;// uncomment for backward compatibility
            // saveFile.weaponAttack = player.weaponAttack;// uncomment for backward compatibility
            // saveFile.weaponPerk = player.weaponPerk;// uncomment for backward compatibility
            // saveFile.weaponValue = player.weaponValue;// uncomment for backward compatibility
            // saveFile.armorValue = player.armorValue;// uncomment for backward compatibility

            // PIERCINGS
            saveFile.nipplesPierced = this.player.nipplesPierced;
            saveFile.nipplesPShort = this.player.nipplesPShort;
            saveFile.nipplesPLong = this.player.nipplesPLong;
            saveFile.lipPierced = this.player.lipPierced;
            saveFile.lipPShort = this.player.lipPShort;
            saveFile.lipPLong = this.player.lipPLong;
            saveFile.tonguePierced = this.player.tonguePierced;
            saveFile.tonguePShort = this.player.tonguePShort;
            saveFile.tonguePLong = this.player.tonguePLong;
            saveFile.eyebrowPierced = this.player.eyebrowPierced;
            saveFile.eyebrowPShort = this.player.eyebrowPShort;
            saveFile.eyebrowPLong = this.player.eyebrowPLong;
            saveFile.earsPierced = this.player.earsPierced;
            saveFile.earsPShort = this.player.earsPShort;
            saveFile.earsPLong = this.player.earsPLong;
            saveFile.nosePierced = this.player.nosePierced;
            saveFile.nosePShort = this.player.nosePShort;
            saveFile.nosePLong = this.player.nosePLong;

            // MAIN STATS
            saveFile.str = this.player.str;
            saveFile.tou = this.player.tou;
            saveFile.spe = this.player.spe;
            saveFile.inte = this.player.inte;
            saveFile.lib = this.player.lib;
            saveFile.sens = this.player.sens;
            saveFile.cor = this.player.cor;
            saveFile.fatigue = this.player.fatigue;
            // Combat STATS
            saveFile.HP = this.player.HP;
            saveFile.lust = this.player.lust;
            saveFile.teaseLevel = this.player.teaseLevel;
            saveFile.teaseXP = this.player.teaseXP;
            // LEVEL STATS
            saveFile.XP = this.player.XP;
            saveFile.level = this.player.level;
            saveFile.gems = this.player.gems;
            saveFile.perkPoints = this.player.perkPoints;

            // Appearance
            saveFile.gender = this.player.gender;
            saveFile.femininity = this.player.femininity;
            saveFile.thickness = this.player.thickness;
            saveFile.tone = this.player.tone;
            saveFile.tallness = this.player.tallness;
            saveFile.hairColor = this.player.hairColor;
            saveFile.hairType = this.player.hairType;
            saveFile.gills = this.player.gills;
            saveFile.armType = this.player.armType;
            saveFile.hairLength = this.player.hairLength;
            saveFile.beardLength = this.player.beardLength;
            saveFile.eyeType = this.player.eyeType;
            saveFile.beardStyle = this.player.beardStyle;
            saveFile.skinType = this.player.skinType;
            saveFile.skinTone = this.player.skinTone;
            saveFile.skinDesc = this.player.skinDesc;
            saveFile.skinAdj = this.player.skinAdj;
            saveFile.faceType = this.player.faceType;
            saveFile.tongueType = this.player.tongueType;
            saveFile.earType = this.player.earType;
            saveFile.earValue = this.player.earValue;
            saveFile.antennae = this.player.antennae;
            saveFile.horns = this.player.horns;
            saveFile.hornType = this.player.hornType;
            saveFile.wingDesc = this.player.wingDesc;
            saveFile.wingType = this.player.wingType;
            saveFile.lowerBody = this.player.lowerBody;
            saveFile.tailType = this.player.tailType;
            saveFile.tailVenum = this.player.tailVenom;
            saveFile.tailRecharge = this.player.tailRecharge;
            saveFile.hipRating = this.player.hipRating;
            saveFile.buttRating = this.player.buttRating;

            // Sexual Stuff
            saveFile.balls = this.player.balls;
            saveFile.cumMultiplier = this.player.cumMultiplier;
            saveFile.ballSize = this.player.ballSize;
            saveFile.hoursSinceCum = this.player.hoursSinceCum;
            saveFile.fertility = this.player.fertility;
            saveFile.clitLength = this.player.clitLength;

            // Preggo stuff
            saveFile.pregnancyIncubation = this.player.pregnancyIncubation;
            saveFile.pregnancyType = this.player.pregnancyType;
            saveFile.buttPregnancyIncubation = this.player.buttPregnancyIncubation;
            saveFile.buttPregnancyType = this.player.buttPregnancyType;

            /* myLocalData.data.furnitureArray = new Array();
               for (var i: number = 0; i < GameArray.length; i++) {
               myLocalData.data.girlArray.push(new Array());
               myLocalData.data.girlEffectArray.push(new Array());
             }*/

            saveFile.cocks = [];
            saveFile.vaginas = [];
            saveFile.breastRows = [];
            saveFile.perks = [];
            saveFile.statusAffects = [];
            saveFile.ass = [];
            saveFile.keyItems = [];
            saveFile.itemStorage = [];
            saveFile.gearStorage = [];
            // Set array
            for (i = 0; i < this.player.cocks.length; i++) {
                saveFile.cocks.push({});
            }
            // Populate Array
            for (i = 0; i < this.player.cocks.length; i++) {
                saveFile.cocks[i].cockThickness = this.player.cocks[i].cockThickness;
                saveFile.cocks[i].cockLength = this.player.cocks[i].cockLength;
                saveFile.cocks[i].cockType = this.player.cocks[i].cockType.Index;
                saveFile.cocks[i].knotMultiplier = this.player.cocks[i].knotMultiplier;
                saveFile.cocks[i].pierced = this.player.cocks[i].pierced;
                saveFile.cocks[i].pShortDesc = this.player.cocks[i].pShortDesc;
                saveFile.cocks[i].pLongDesc = this.player.cocks[i].pLongDesc;
                saveFile.cocks[i].sock = this.player.cocks[i].sock;
            }
            // Set Vaginal Array
            for (i = 0; i < this.player.vaginas.length; i++) {
                saveFile.vaginas.push({});
            }
            // Populate Vaginal Array
            for (i = 0; i < this.player.vaginas.length; i++) {
                saveFile.vaginas[i].type = this.player.vaginas[i].type;
                saveFile.vaginas[i].vaginalWetness = this.player.vaginas[i].vaginalWetness;
                saveFile.vaginas[i].vaginalLooseness = this.player.vaginas[i].vaginalLooseness;
                saveFile.vaginas[i].fullness = this.player.vaginas[i].fullness;
                saveFile.vaginas[i].virgin = this.player.vaginas[i].virgin;
                saveFile.vaginas[i].labiaPierced = this.player.vaginas[i].labiaPierced;
                saveFile.vaginas[i].labiaPShort = this.player.vaginas[i].labiaPShort;
                saveFile.vaginas[i].labiaPLong = this.player.vaginas[i].labiaPLong;
                saveFile.vaginas[i].clitPierced = this.player.vaginas[i].clitPierced;
                saveFile.vaginas[i].clitPShort = this.player.vaginas[i].clitPShort;
                saveFile.vaginas[i].clitPLong = this.player.vaginas[i].clitPLong;
            }
            // NIPPLES
            saveFile.nippleLength = this.player.nippleLength;
            // Set Breast Array
            for (i = 0; i < this.player.breastRows.length; i++) {
                saveFile.breastRows.push({});
                // trace("Saveone breastRow");
            }
            // Populate Breast Array
            for (i = 0; i < this.player.breastRows.length; i++) {
                // trace("Populate One BRow");
                saveFile.breastRows[i].breasts = this.player.breastRows[i].breasts;
                saveFile.breastRows[i].breastRating = this.player.breastRows[i].breastRating;
                saveFile.breastRows[i].nipplesPerBreast = this.player.breastRows[
                    i
                ].nipplesPerBreast;
                saveFile.breastRows[i].lactationMultiplier = this.player.breastRows[
                    i
                ].lactationMultiplier;
                saveFile.breastRows[i].milkFullness = this.player.breastRows[i].milkFullness;
                saveFile.breastRows[i].fuckable = this.player.breastRows[i].fuckable;
                saveFile.breastRows[i].fullness = this.player.breastRows[i].fullness;
            }
            // Set Perk Array
            // Populate Perk Array
            for (i = 0; i < this.player.perks.length; i++) {
                saveFile.perks.push({});
                // trace("Saveone Perk");
                // trace("Populate One Perk");
                saveFile.perks[i].id = this.player.perk(i).ptype.id;
                // saveFile.perks[i].perkName = player.perk(i).ptype.id; //uncomment for backward compatibility
                saveFile.perks[i].value1 = this.player.perk(i).value1;
                saveFile.perks[i].value2 = this.player.perk(i).value2;
                saveFile.perks[i].value3 = this.player.perk(i).value3;
                saveFile.perks[i].value4 = this.player.perk(i).value4;
                // saveFile.perks[i].perkDesc = player.perk(i).perkDesc; // uncomment for backward compatibility
            }

            // Set Status Array
            for (i = 0; i < this.player.statusAffects.length; i++) {
                saveFile.statusAffects.push({});
                // trace("Saveone statusAffects");
            }
            // Populate Status Array
            for (i = 0; i < this.player.statusAffects.length; i++) {
                // trace("Populate One statusAffects");
                saveFile.statusAffects[i].statusAffectName = this.player.statusAffect(i).stype.id;
                saveFile.statusAffects[i].value1 = this.player.statusAffect(i).value1;
                saveFile.statusAffects[i].value2 = this.player.statusAffect(i).value2;
                saveFile.statusAffects[i].value3 = this.player.statusAffect(i).value3;
                saveFile.statusAffects[i].value4 = this.player.statusAffect(i).value4;
            }
            // Set keyItem Array
            for (i = 0; i < this.player.keyItems.length; i++) {
                saveFile.keyItems.push({});
                // trace("Saveone keyItem");
            }
            // Populate keyItem Array
            for (i = 0; i < this.player.keyItems.length; i++) {
                // trace("Populate One keyItemzzzzzz");
                saveFile.keyItems[i].keyName = this.player.keyItems[i].keyName;
                saveFile.keyItems[i].value1 = this.player.keyItems[i].value1;
                saveFile.keyItems[i].value2 = this.player.keyItems[i].value2;
                saveFile.keyItems[i].value3 = this.player.keyItems[i].value3;
                saveFile.keyItems[i].value4 = this.player.keyItems[i].value4;
            }
            // Set storage slot array
            for (i = 0; i < this.itemStorageGet().length; i++) {
                saveFile.itemStorage.push({});
            }

            // Populate storage slot array
            for (i = 0; i < this.itemStorageGet().length; i++) {
                // saveFile.itemStorage[i].shortName = itemStorage[i].itype.id;// For backward compatibility
                saveFile.itemStorage[i].id =
                    this.itemStorageGet()[i].itype == undefined
                        ? undefined
                        : this.itemStorageGet()[i].itype.id;
                saveFile.itemStorage[i].quantity = this.itemStorageGet()[i].quantity;
                saveFile.itemStorage[i].unlocked = this.itemStorageGet()[i].unlocked;
            }
            // Set gear slot array
            for (i = 0; i < this.gearStorageGet().length; i++) {
                saveFile.gearStorage.push({});
            }

            // Populate gear slot array
            for (i = 0; i < this.gearStorageGet().length; i++) {
                // saveFile.gearStorage[i].shortName = gearStorage[i].itype.id;// uncomment for backward compatibility
                saveFile.gearStorage[i].id = this.gearStorageGet()[i].isEmpty()
                    ? undefined
                    : this.gearStorageGet()[i].itype.id;
                saveFile.gearStorage[i].quantity = this.gearStorageGet()[i].quantity;
                saveFile.gearStorage[i].unlocked = this.gearStorageGet()[i].unlocked;
            }
            saveFile.ass = {};
            saveFile.ass.analWetness = this.player.ass.analWetness;
            saveFile.ass.analLooseness = this.player.ass.analLooseness;
            saveFile.ass.fullness = this.player.ass.fullness;
            // EXPLORED
            saveFile.exploredLake = this.player.exploredLake;
            saveFile.exploredMountain = this.player.exploredMountain;
            saveFile.exploredForest = this.player.exploredForest;
            saveFile.exploredDesert = this.player.exploredDesert;
            saveFile.explored = this.player.explored;
            saveFile.foundForest = this.getGame().foundForest;
            saveFile.foundDesert = this.getGame().foundDesert;
            saveFile.foundMountain = this.getGame().foundMountain;
            saveFile.foundLake = this.getGame().foundLake;
            saveFile.gameState = this.gameStateGet();

            // Time and Items
            saveFile.hours = this.model.time.hours;
            saveFile.days = this.model.time.days;
            saveFile.autoSave = this.player.autoSave;

            // PLOTZ
            saveFile.whitney = this.getGame().whitney;
            saveFile.monk = this.getGame().monk;
            saveFile.sand = this.getGame().sand;
            saveFile.giacomo = this.getGame().giacomo;
            saveFile.beeProgress = 0; // Now saved in a flag. getGame().beeProgress;

            // ITEMZ. Item1s
            saveFile.itemSlot1 = [];
            saveFile.itemSlot1.quantity = this.player.itemSlot1.quantity;
            saveFile.itemSlot1.id = this.player.itemSlot1.itype.id;
            saveFile.itemSlot1.unlocked = true;

            saveFile.itemSlot2 = [];
            saveFile.itemSlot2.quantity = this.player.itemSlot2.quantity;
            saveFile.itemSlot2.id = this.player.itemSlot2.itype.id;
            saveFile.itemSlot2.unlocked = true;

            saveFile.itemSlot3 = [];
            saveFile.itemSlot3.quantity = this.player.itemSlot3.quantity;
            saveFile.itemSlot3.id = this.player.itemSlot3.itype.id;
            saveFile.itemSlot3.unlocked = true;

            saveFile.itemSlot4 = [];
            saveFile.itemSlot4.quantity = this.player.itemSlot4.quantity;
            saveFile.itemSlot4.id = this.player.itemSlot4.itype.id;
            saveFile.itemSlot4.unlocked = this.player.itemSlot4.unlocked;

            saveFile.itemSlot5 = [];
            saveFile.itemSlot5.quantity = this.player.itemSlot5.quantity;
            saveFile.itemSlot5.id = this.player.itemSlot5.itype.id;
            saveFile.itemSlot5.unlocked = this.player.itemSlot5.unlocked;

            // Keybinds
            saveFile.controls = this.getGame().inputManager.SaveBindsToObj();
        } catch (error) {
            trace(error.message);

            this.outx(
                "There was a processing error during saving. Please report the following message:\n\n"
            );
            this.outx(error.message);
            this.outx("\n\n");
            this.outx(error.getStackTrace());
        }

        trace("done saving");
        // Because actionscript is stupid, there is no easy way to block until file operations are done.
        // Therefore, I'm hacking around it for the chaos monkey.
        // Really, something needs to listen for the FileReference.complete event, and re-enable saving/loading then.
        // Something to do in the future
        if (exportFile) {
            // outx(serializeToString(saveFile), true);
            let text = JSON.stringify(saveFile, null, 2)
            let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
            let filename = this.generateFilename(slot);

            saveAs(blob, filename);

            this.outx("Attempted to save to file.", true);
        } else {
            // Write the file
            // saveFile.flush();
            localStorage.setItem(slot, JSON.stringify(saveFile));

            // Reload it
            saveFile = this.getSaveObj(slot);
            backup = this.getSaveObj(`${slot}_backup`);
            let numProps = 0;

            // Copy the properties over to a new file object
            for (const prop of Object.keys(saveFile)) {
                numProps++;
                backup[prop] = saveFile[prop];
            }

            // There should be 124 root properties minimum in the save file. Give some wiggleroom for things that might be omitted? (All of the broken saves I've seen are MUCH shorter than expected)
            if (numProps < this.versionProperties[this.ver]) {
                this.outx(
                    `<b>Aborting save.  Your current save file is broken, and needs to be bug-reported.</b>\n\nWithin the save folder for CoC, there should be a pair of files named "${slot}.sol" and "${slot}_backup.sol"\n\n<b>We need BOTH of those files, and a quick report of what you've done in the game between when you last saved, and this message.</b>\n\n`,
                    true
                );
                this.outx(
                    "When you've sent us the files, you can copy the _backup file over your old save to continue from your last save.\n\n"
                );
                this.outx(
                    "Alternatively, you can just hit the restore button to overwrite the broken save with the backup... but we'd really like the saves first!"
                );
                trace("Backup Save Aborted! Broken save detected!");
                backupAborted = true;
            } else {
                // Property count is correct, write the backup
                // backup.flush();
                localStorage.setItem(`${slot}_backup`, JSON.stringify(backup));
            }

            if (!backupAborted) this.outx(`Saved to slot${slot}!`, true);
        }

        if (!backupAborted) {
            this.doNext(this.playerMenu);
        } else {
            this.menu();
            this.addButton(0, "Next", this.playerMenu);
            this.addButton(9, "Restore", this.restore, slot);
        }
    }

    private generateFilename(saveName: string) {
        let domain = location.host.replace(/\./g, '-').replace(/-[^-]+$/, '');
        let save = saveName.replace(/^CoC_?/, '').replace(/_/g, '');
        let time = new Date().toISOString().replace(/T(\d+):(\d+).*/g, '--$1-$2')
        let pre = `CoC--${domain}--${save}--${time}.coc`
        let filename = pre.replace(/[\\/:*"<>|]/, '').replace(/ /g, '_')
        return filename;
    }

    public restore(slotName: string): void {
        this.clearOutput();
        // copy slot_backup.sol over slot.sol
        const backupFile = this.getSaveObj(`${slotName}_backup`);
        const overwriteFile = this.getSaveObj(slotName);

        for (const prop of Object.keys(backupFile)) {
            overwriteFile[prop] = backupFile[prop];
        }

        // overwriteFile.flush();
        localStorage.setItem(slotName, JSON.stringify(overwriteFile));

        this.outx(`Restored backup of ${slotName}`, true);
        this.menu();
        this.doNext(this.playerMenu);
    }

    public openSave(): void {
        const input = document.createElement("input");
        input.id = "load";
        input.type = "file";
        input.accept = ".coc";
        input.style.display = "none";
        input.addEventListener("change", () => {
            if (!input.files || input.files.length === 0) {
                alert("Error in file loading");
            } else {
                this.onFileLoaded(input.files[0]);
            }
        });
        input.click();
    }

    public onFileLoaded(file: File): void {
        trace("File target = ", file.name);
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.addEventListener("loadend", () => {
            let obj;
            try {
                if (!fileReader) throw new Error("FileReader disappeared");
                if (typeof fileReader.result !== "string")
                    throw new Error("File read result not a string");
                obj = JSON.parse(fileReader.result);
            } catch (e) {
                this.outx(
                    "<b>!</b> Save file not found, check that it is in the same directory as the CoC.swf file.\n\nLoad from file is not available when playing directly from a website like furaffinity or fenoxo.com.",
                    true
                );
            }
            if (obj) {
                this.onDataLoaded(obj);
            }
        });
        fileReader.addEventListener("error", this.ioErrorHandler);
    }

    public ioErrorHandler(): void {
        this.outx(
            `<b>!</b> Save file not found, check that it is in the same directory as the CoC_${this.ver}.swf file.\r\rLoad from file is not available when playing directly from a website like furaffinity or fenoxo.com.`,
            true
        );
        this.doNext(this.saveLoad);
    }

    public onDataLoaded(saveObj: any): void {
        // var fileObj = readObjectFromStringBytes(loader.data);
        try {
            // I want to be able to write some debug stuff to the GUI during the loading process
            // Therefore, we clear the display *before* calling loadGameObject
            this.outx("Loading save...", true);
            // trace("OnDataLoaded! - Reading data", this.loader, this.loader.data.readObject);
            // var tmpObj: Record<string, any> = this.loader.data.readObject();
            trace("Read in object = ", saveObj);

            this.loadGameObject(saveObj);
            this.outx("Loaded Save");
        } catch (rangeError) {
            this.outx("<b>!</b> File is either corrupted or not a valid save", true);
            this.doNext(this.saveLoad);
        }
        // catch (error: Error) {
        //         outx("<b>!</b> Unhandled Exception", true);
        //         outx("[pg]Failed to load save. The file may be corrupt!");

        //         doNext(returnToSaveMenu);
        //     }
        this.statScreenRefresh();
        // eventParser(1);
    }

    public loadGameObject(saveData: Record<string, any>, slot = "VOID"): void {
        const game: CoC = this.getGame();
        game.dungeonLoc = 0;
        // Not needed, dungeonLoc = 0 does this: game.inDungeon = false;
        game.inRoomedDungeon = false;
        game.inRoomedDungeonResume = undefined;

        // Autosave stuff
        this.player.slotName = slot;

        // var counter: number = this.player.cocks.length;
        trace("Loading save!");
        // Initialize the save file
        // var saveFile: Record<string, any> = loader.data.readObject();
        const saveFile: any = saveData;
        if (saveFile && saveFile.exists) {
            // KILL ALL COCKS;
            this.player = new Player();
            this.flags = createFlags();
            this.model.player = this.player;

            // trace("Type of saveFile = ", getClass(saveFile));

            this.inventory.clearStorage();
            this.inventory.clearGearStorage();
            this.player.short = saveFile.short;
            this.player.a = saveFile.a;
            game.notes = saveFile.notes;

            // flags

            for (const key of Object.keys(this.flags)) {
                if (saveFile.flags[key])
                    (this.flags as Record<string | number, any>)[key] = saveFile.flags[key];
            }
            let i = 0;

            // PIERCINGS

            // trace("LOADING PIERCINGS");
            this.player.nipplesPierced = saveFile.nipplesPierced;
            this.player.nipplesPShort = saveFile.nipplesPShort;
            this.player.nipplesPLong = saveFile.nipplesPLong;
            this.player.lipPierced = saveFile.lipPierced;
            this.player.lipPShort = saveFile.lipPShort;
            this.player.lipPLong = saveFile.lipPLong;
            this.player.tonguePierced = saveFile.tonguePierced;
            this.player.tonguePShort = saveFile.tonguePShort;
            this.player.tonguePLong = saveFile.tonguePLong;
            this.player.eyebrowPierced = saveFile.eyebrowPierced;
            this.player.eyebrowPShort = saveFile.eyebrowPShort;
            this.player.eyebrowPLong = saveFile.eyebrowPLong;
            this.player.earsPierced = saveFile.earsPierced;
            this.player.earsPShort = saveFile.earsPShort;
            this.player.earsPLong = saveFile.earsPLong;
            this.player.nosePierced = saveFile.nosePierced;
            this.player.nosePShort = saveFile.nosePShort;
            this.player.nosePLong = saveFile.nosePLong;

            // MAIN STATS
            this.player.str = saveFile.str;
            this.player.tou = saveFile.tou;
            this.player.spe = saveFile.spe;
            this.player.inte = saveFile.inte;
            this.player.lib = saveFile.lib;
            this.player.sens = saveFile.sens;
            this.player.cor = saveFile.cor;
            this.player.fatigue = saveFile.fatigue;

            // CLOTHING/ARMOR
            let found = false;
            if (saveFile.weaponId) {
                this.player.setWeaponHiddenField(
                    (ItemType.lookupItem(saveFile.weaponId) as Weapon) || WeaponLib.FISTS
                );
            } else {
                this.player.setWeapon(WeaponLib.FISTS);
                // player.weapon = WeaponLib.FISTS;
                const itemLib = ItemType.getItemLibrary();
                for (const itype of Object.keys(itemLib)) {
                    if (
                        itemLib[itype] instanceof Weapon &&
                        (itemLib[itype] as Weapon).name == saveFile.weaponName
                    ) {
                        this.player.setWeaponHiddenField(
                            (itemLib[itype] as Weapon) || WeaponLib.FISTS
                        );
                        found = true;
                        break;
                    }
                }
            }
            if (saveFile.armorId) {
                this.player.setArmorHiddenField(
                    (ItemType.lookupItem(saveFile.armorId) as Armor) ||
                        ArmorLib.COMFORTABLE_UNDERCLOTHES
                );
                if (this.player.armor.name != saveFile.armorName)
                    this.player.modArmorName = saveFile.armorName;
            } else {
                found = false;
                this.player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES);
                // player.armor = ArmorLib.COMFORTABLE_UNDERCLOTHES;
                const itemLib = ItemType.getItemLibrary();
                for (const itype of Object.keys(itemLib)) {
                    if (
                        itemLib[itype] instanceof Armor &&
                        (itemLib[itype] as Armor).name == saveFile.armorName
                    ) {
                        this.player.setArmorHiddenField(
                            (itemLib[itype] as Armor) || ArmorLib.COMFORTABLE_UNDERCLOTHES
                        );
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    const itemLibNew = ItemType.getItemLibrary();
                    for (const itype of Object.keys(itemLibNew)) {
                        if (itemLibNew[itype] instanceof Armor) {
                            const a: Armor = itemLibNew[itype] as Armor;
                            if (
                                a.value == saveFile.armorValue &&
                                a.def == saveFile.armorDef &&
                                a.perk == saveFile.armorPerk
                            ) {
                                this.player.setArmor(a);
                                // player.armor = a;
                                this.player.modArmorName = saveFile.armorName;
                                found = true;
                                break;
                            }
                        }
                    }
                }
            }

            // Combat STATS
            this.player.HP = saveFile.HP;
            this.player.lust = saveFile.lust;
            if (saveFile.teaseXP == undefined) this.player.teaseXP = 0;
            else this.player.teaseXP = saveFile.teaseXP;
            if (saveFile.teaseLevel == undefined) this.player.teaseLevel = 0;
            else this.player.teaseLevel = saveFile.teaseLevel;

            // LEVEL STATS
            this.player.XP = saveFile.XP;
            this.player.level = saveFile.level;
            this.player.gems = saveFile.gems;
            if (saveFile.perkPoints == undefined) this.player.perkPoints = 0;
            else this.player.perkPoints = saveFile.perkPoints;

            // Appearance
            this.player.gender = saveFile.gender;
            if (saveFile.femininity == undefined) this.player.femininity = 50;
            else this.player.femininity = saveFile.femininity;
            // EYES
            if (saveFile.eyeType == undefined) this.player.eyeType = EYES_HUMAN;
            else this.player.eyeType = saveFile.eyeType;
            // BEARS
            if (saveFile.beardLength == undefined) this.player.beardLength = 0;
            else this.player.beardLength = saveFile.beardLength;
            if (saveFile.beardStyle == undefined) this.player.beardStyle = 0;
            else this.player.beardStyle = saveFile.beardStyle;
            // BODY STYLE
            if (saveFile.tone == undefined) this.player.tone = 50;
            else this.player.tone = saveFile.tone;
            if (saveFile.thickness == undefined) this.player.thickness = 50;
            else this.player.thickness = saveFile.thickness;

            this.player.tallness = saveFile.tallness;
            this.player.hairColor = saveFile.hairColor;
            if (saveFile.hairType == undefined) this.player.hairType = 0;
            else this.player.hairType = saveFile.hairType;
            if (saveFile.gills == undefined) this.player.gills = false;
            else this.player.gills = saveFile.gills;
            if (saveFile.armType == undefined) this.player.armType = ARM_TYPE_HUMAN;
            else this.player.armType = saveFile.armType;
            this.player.hairLength = saveFile.hairLength;
            this.player.skinType = saveFile.skinType;
            if (saveFile.skinAdj == undefined) this.player.skinAdj = "";
            else this.player.skinAdj = saveFile.skinAdj;
            this.player.skinTone = saveFile.skinTone;
            this.player.skinDesc = saveFile.skinDesc;
            // Convert from old skinDesc to new skinAdj + skinDesc!
            if (this.player.skinDesc.includes("smooth")) {
                this.player.skinAdj = "smooth";
                if (this.player.skinType == SKIN_TYPE_PLAIN) this.player.skinDesc = "skin";
                if (this.player.skinType == SKIN_TYPE_FUR) this.player.skinDesc = "fur";
                if (this.player.skinType == SKIN_TYPE_SCALES) this.player.skinDesc = "scales";
                if (this.player.skinType == SKIN_TYPE_GOO) this.player.skinDesc = "goo";
            }
            if (this.player.skinDesc.includes("thick")) {
                this.player.skinAdj = "thick";
                if (this.player.skinType == SKIN_TYPE_PLAIN) this.player.skinDesc = "skin";
                if (this.player.skinType == SKIN_TYPE_FUR) this.player.skinDesc = "fur";
                if (this.player.skinType == SKIN_TYPE_SCALES) this.player.skinDesc = "scales";
                if (this.player.skinType == SKIN_TYPE_GOO) this.player.skinDesc = "goo";
            }
            if (this.player.skinDesc.includes("rubber")) {
                this.player.skinAdj = "rubber";
                if (this.player.skinType == SKIN_TYPE_PLAIN) this.player.skinDesc = "skin";
                if (this.player.skinType == SKIN_TYPE_FUR) this.player.skinDesc = "fur";
                if (this.player.skinType == SKIN_TYPE_SCALES) this.player.skinDesc = "scales";
                if (this.player.skinType == SKIN_TYPE_GOO) this.player.skinDesc = "goo";
            }
            if (this.player.skinDesc.includes("latex")) {
                this.player.skinAdj = "latex";
                if (this.player.skinType == SKIN_TYPE_PLAIN) this.player.skinDesc = "skin";
                if (this.player.skinType == SKIN_TYPE_FUR) this.player.skinDesc = "fur";
                if (this.player.skinType == SKIN_TYPE_SCALES) this.player.skinDesc = "scales";
                if (this.player.skinType == SKIN_TYPE_GOO) this.player.skinDesc = "goo";
            }
            if (this.player.skinDesc.includes("slimey")) {
                this.player.skinAdj = "slimey";
                if (this.player.skinType == SKIN_TYPE_PLAIN) this.player.skinDesc = "skin";
                if (this.player.skinType == SKIN_TYPE_FUR) this.player.skinDesc = "fur";
                if (this.player.skinType == SKIN_TYPE_SCALES) this.player.skinDesc = "scales";
                if (this.player.skinType == SKIN_TYPE_GOO) this.player.skinDesc = "goo";
            }
            this.player.faceType = saveFile.faceType;
            if (saveFile.tongueType == undefined) this.player.tongueType = TONUGE_HUMAN;
            else this.player.tongueType = saveFile.tongueType;
            if (saveFile.earType == undefined) this.player.earType = EARS_HUMAN;
            else this.player.earType = saveFile.earType;
            if (saveFile.earValue == undefined) this.player.earValue = 0;
            else this.player.earValue = saveFile.earValue;
            if (saveFile.antennae == undefined) this.player.antennae = ANTENNAE_NONE;
            else this.player.antennae = saveFile.antennae;
            this.player.horns = saveFile.horns;
            if (saveFile.hornType == undefined) this.player.hornType = HORNS_NONE;
            else this.player.hornType = saveFile.hornType;
            this.player.wingDesc = saveFile.wingDesc;
            this.player.wingType = saveFile.wingType;
            this.player.lowerBody = saveFile.lowerBody;
            this.player.tailType = saveFile.tailType;
            this.player.tailVenom = saveFile.tailVenum;
            this.player.tailRecharge = saveFile.tailRecharge;
            this.player.hipRating = saveFile.hipRating;
            this.player.buttRating = saveFile.buttRating;

            // Sexual Stuff
            this.player.balls = saveFile.balls;
            this.player.cumMultiplier = saveFile.cumMultiplier;
            this.player.ballSize = saveFile.ballSize;
            this.player.hoursSinceCum = saveFile.hoursSinceCum;
            this.player.fertility = saveFile.fertility;
            this.player.clitLength = saveFile.clitLength;

            // Preggo stuff
            this.player.knockUpForce(saveFile.pregnancyType, saveFile.pregnancyIncubation);
            this.player.buttKnockUpForce(
                saveFile.buttPregnancyType,
                saveFile.buttPregnancyIncubation
            );

            let hasViridianCockSock = false;

            // ARRAYS HERE!
            // Set Cock array
            for (i = 0; i < saveFile.cocks.length; i++) {
                this.player.createCock();
            }
            // Populate Cock Array
            for (i = 0; i < saveFile.cocks.length; i++) {
                this.player.cocks[i].cockThickness = saveFile.cocks[i].cockThickness;
                this.player.cocks[i].cockLength = saveFile.cocks[i].cockLength;
                this.player.cocks[i].cockType = CockTypesEnum[saveFile.cocks[i].cockType];
                this.player.cocks[i].knotMultiplier = saveFile.cocks[i].knotMultiplier;
                if (saveFile.cocks[i].sock == undefined) this.player.cocks[i].sock = "";
                else {
                    this.player.cocks[i].sock = saveFile.cocks[i].sock;
                    if (this.player.cocks[i].sock == "viridian") hasViridianCockSock = true;
                }
                if (saveFile.cocks[i].pierced == undefined) {
                    this.player.cocks[i].pierced = 0;
                    this.player.cocks[i].pShortDesc = "";
                    this.player.cocks[i].pLongDesc = "";
                } else {
                    this.player.cocks[i].pierced = saveFile.cocks[i].pierced;
                    this.player.cocks[i].pShortDesc = saveFile.cocks[i].pShortDesc;
                    this.player.cocks[i].pLongDesc = saveFile.cocks[i].pLongDesc;

                    if (
                        this.player.cocks[i].pShortDesc == "undefined" ||
                        this.player.cocks[i].pLongDesc == "undefined"
                    ) {
                        this.player.cocks[i].pierced = 0;
                        this.player.cocks[i].pShortDesc = "";
                        this.player.cocks[i].pLongDesc = "";
                    }
                }
                // trace("LoadOne Cock i(" + i + ")");
            }
            // Set Vaginal Array
            for (i = 0; i < saveFile.vaginas.length; i++) {
                this.player.createVagina();
            }
            // Populate Vaginal Array
            for (i = 0; i < saveFile.vaginas.length; i++) {
                this.player.vaginas[i].vaginalWetness = saveFile.vaginas[i].vaginalWetness;
                this.player.vaginas[i].vaginalLooseness = saveFile.vaginas[i].vaginalLooseness;
                this.player.vaginas[i].fullness = saveFile.vaginas[i].fullness;
                this.player.vaginas[i].virgin = saveFile.vaginas[i].virgin;
                if (saveFile.vaginas[i].type == undefined) this.player.vaginas[i].type = 0;
                else this.player.vaginas[i].type = saveFile.vaginas[i].type;
                if (saveFile.vaginas[i].labiaPierced == undefined) {
                    this.player.vaginas[i].labiaPierced = 0;
                    this.player.vaginas[i].labiaPShort = "";
                    this.player.vaginas[i].labiaPLong = "";
                    this.player.vaginas[i].clitPierced = 0;
                    this.player.vaginas[i].clitPShort = "";
                    this.player.vaginas[i].clitPLong = "";
                } else {
                    this.player.vaginas[i].labiaPierced = saveFile.vaginas[i].labiaPierced;
                    this.player.vaginas[i].labiaPShort = saveFile.vaginas[i].labiaPShort;
                    this.player.vaginas[i].labiaPLong = saveFile.vaginas[i].labiaPLong;
                    this.player.vaginas[i].clitPierced = saveFile.vaginas[i].clitPierced;
                    this.player.vaginas[i].clitPShort = saveFile.vaginas[i].clitPShort;
                    this.player.vaginas[i].clitPLong = saveFile.vaginas[i].clitPLong;
                }
                // trace("LoadOne Vagina i(" + i + ")");
            }
            // NIPPLES
            if (saveFile.nippleLength == undefined) this.player.nippleLength = 0.25;
            else this.player.nippleLength = saveFile.nippleLength;
            // Set Breast Array
            for (i = 0; i < saveFile.breastRows.length; i++) {
                this.player.createBreastRow();
                // trace("LoadOne BreastROw i(" + i + ")");
            }
            // Populate Breast Array
            for (i = 0; i < saveFile.breastRows.length; i++) {
                this.player.breastRows[i].breasts = saveFile.breastRows[i].breasts;
                this.player.breastRows[i].nipplesPerBreast =
                    saveFile.breastRows[i].nipplesPerBreast;
                // Fix nipplesless breasts bug
                if (this.player.breastRows[i].nipplesPerBreast == 0)
                    this.player.breastRows[i].nipplesPerBreast = 1;
                this.player.breastRows[i].breastRating = saveFile.breastRows[i].breastRating;
                this.player.breastRows[i].lactationMultiplier =
                    saveFile.breastRows[i].lactationMultiplier;
                if (this.player.breastRows[i].lactationMultiplier < 0)
                    this.player.breastRows[i].lactationMultiplier = 0;
                this.player.breastRows[i].milkFullness = saveFile.breastRows[i].milkFullness;
                this.player.breastRows[i].fuckable = saveFile.breastRows[i].fuckable;
                this.player.breastRows[i].fullness = saveFile.breastRows[i].fullness;
                if (this.player.breastRows[i].breastRating < 0)
                    this.player.breastRows[i].breastRating = 0;
            }

            // Force the creation of the default breast row onto the player if it's no longer present
            if (this.player.breastRows.length == 0) this.player.createBreastRow();

            let hasHistoryPerk = false;
            let hasLustyRegenPerk = false;
            // var addedSensualLover: boolean = false;

            // Populate Perk Array
            for (i = 0; i < saveFile.perks.length; i++) {
                let id: string = saveFile.perks[i].id || saveFile.perks[i].perkName;
                const value1: number = saveFile.perks[i].value1;
                const value2: number = saveFile.perks[i].value2;
                const value3: number = saveFile.perks[i].value3;
                const value4: number = saveFile.perks[i].value4;

                // Fix saves where the Whore perk might have been malformed.
                if (id == "History: Whote") id = "History: Whore";

                // Fix saves where the Lusty Regeneration perk might have been malformed.
                if (id == "Lusty Regeneration") {
                    hasLustyRegenPerk = true;
                } else if (id == "LustyRegeneration") {
                    id = "Lusty Regeneration";
                    hasLustyRegenPerk = true;
                }

                // Some shit checking to track if the incoming data has an available History perk
                if (id.includes("History:")) {
                    hasHistoryPerk = true;
                }

                const ptype: PerkType = PerkType.lookupPerk(id);

                if (ptype == undefined) {
                    trace(`ERROR: Unknown perk id=${id}`);

                    // (saveFile.perks as Array).splice(i,1);
                    // NEVER EVER EVER MODIFY DATA IN THE SAVE FILE LIKE THIS. EVER. FOR ANY REASON.
                } else {
                    trace(`Creating perk : ${ptype}`);
                    this.player.createPerk(ptype, value1, value2, value3, value4);

                    if (isNaN(this.player.perk(this.player.numPerks - 1).value1)) {
                        if (
                            this.player.perk(this.player.numPerks - 1).perkName == "Wizard's Focus"
                        ) {
                            this.player.perk(this.player.numPerks - 1).value1 = 0.3;
                        } else {
                            this.player.perk(this.player.numPerks).value1 = 0;
                        }

                        trace(
                            `NaN byaaaatch: ${this.player.perk(this.player.numPerks - 1).value1}`
                        );
                    }

                    if (this.player.perk(this.player.numPerks - 1).perkName == "Wizard's Focus") {
                        if (
                            this.player.perk(this.player.numPerks - 1).value1 == 0 ||
                            this.player.perk(this.player.numPerks - 1).value1 < 0.1
                        ) {
                            trace("Wizard's Focus boosted up to par (.5)");
                            this.player.perk(this.player.numPerks - 1).value1 = 0.5;
                        }
                    }
                }
            }

            // Fixup missing History: Whore perk IF AND ONLY IF the flag used to track the prior selection of a history perk has been set
            if (hasHistoryPerk == false && this.flags[kFLAGS.HISTORY_PERK_SELECTED] != 0) {
                this.player.createPerk(PerkLib.HistoryWhore, 0, 0, 0, 0);
            }

            // Fixup missing Lusty Regeneration perk, if the player has an equipped viridian cock sock and does NOT have the Lusty Regeneration perk
            if (hasViridianCockSock == true && hasLustyRegenPerk == false) {
                this.player.createPerk(PerkLib.LustyRegeneration, 0, 0, 0, 0);
            }

            if (this.flags[kFLAGS.TATTOO_SAVEFIX_APPLIED] == 0) {
                // Fix some tatto texts that could be broken
                if (
                    typeof this.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK] == "string" &&
                    this.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK].includes("lower back.lower back")
                ) {
                    this.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK] = `${
                        this.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK].split(".")[0]
                    }.`;
                }

                let refunds = 0;

                if (typeof this.flags[kFLAGS.JOJO_TATTOO_LOWERBACK] == "string") {
                    refunds++;
                    this.flags[kFLAGS.JOJO_TATTOO_LOWERBACK] = "";
                }

                if (typeof this.flags[kFLAGS.JOJO_TATTOO_BUTT] == "string") {
                    refunds++;
                    this.flags[kFLAGS.JOJO_TATTOO_BUTT] = "";
                }

                if (typeof this.flags[kFLAGS.JOJO_TATTOO_COLLARBONE] == "string") {
                    refunds++;
                    this.flags[kFLAGS.JOJO_TATTOO_COLLARBONE] = "";
                }

                if (typeof this.flags[kFLAGS.JOJO_TATTOO_SHOULDERS] == "string") {
                    refunds++;
                    this.flags[kFLAGS.JOJO_TATTOO_SHOULDERS] = "";
                }

                this.player.gems += 50 * refunds;
                this.flags[kFLAGS.TATTOO_SAVEFIX_APPLIED] = 1;
            }

            if (this.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] == 1) {
                this.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] = 0;
                trace("Force-reverting Marble At Farm flag to 0.");
            }

            // Set Status Array
            for (i = 0; i < saveFile.statusAffects.length; i++) {
                if (saveFile.statusAffects[i].statusAffectName == "Lactation EnNumbere") continue; // ugh...
                const stype: StatusAffectType = StatusAffectType.lookupStatusAffect(
                    saveFile.statusAffects[i].statusAffectName
                );
                if (stype == undefined) {
                    CocSettings.error(
                        `Cannot find status affect '${saveFile.statusAffects[i].statusAffectName}'`
                    );
                    continue;
                }
                this.player.createStatusAffect(
                    stype,
                    saveFile.statusAffects[i].value1,
                    saveFile.statusAffects[i].value2,
                    saveFile.statusAffects[i].value3,
                    saveFile.statusAffects[i].value4
                );
                // trace("StatusAffect " + player.statusAffect(i).stype.id + " loaded.");
            }
            // Make sure keyitems exist!
            if (saveFile.keyItems != undefined) {
                // Set keyItems Array
                for (i = 0; i < saveFile.keyItems.length; i++) {
                    this.player.createKeyItem("TEMP", 0, 0, 0, 0);
                }
                // Populate keyItems Array
                for (i = 0; i < saveFile.keyItems.length; i++) {
                    this.player.keyItems[i].keyName = saveFile.keyItems[i].keyName;
                    this.player.keyItems[i].value1 = saveFile.keyItems[i].value1;
                    this.player.keyItems[i].value2 = saveFile.keyItems[i].value2;
                    this.player.keyItems[i].value3 = saveFile.keyItems[i].value3;
                    this.player.keyItems[i].value4 = saveFile.keyItems[i].value4;
                    // trace("KeyItem " + player.keyItems[i].keyName + " loaded.");
                }
            }

            let storage: ItemSlotClass;
            // Set storage slot array
            if (saveFile.itemStorage == undefined) {
                // trace("OLD SAVES DO NOT CONTAIN ITEM STORAGE ARRAY");
            } else {
                // Populate storage slot array
                for (i = 0; i < saveFile.itemStorage.length; i++) {
                    // trace("Populating a storage slot save with data");
                    this.inventory.createStorage();
                    storage = this.itemStorageGet()[i];
                    const savedIS: any = saveFile.itemStorage[i];
                    if (savedIS.shortName) {
                        if (savedIS.shortName.indexOf("Gro+") != -1) savedIS.id = "GroPlus";
                        else if (savedIS.shortName.indexOf("Sp Honey") != -1)
                            savedIS.id = "SpHoney";
                    }
                    if (savedIS.quantity > 0)
                        storage.setItemAndQty(
                            ItemType.lookupItem(savedIS.id || savedIS.shortName),
                            savedIS.quantity
                        );
                    else storage.emptySlot();
                    storage.unlocked = savedIS.unlocked;
                }
            }
            // Set gear slot array
            if (saveFile.gearStorage == undefined || saveFile.gearStorage.length < 18) {
                // trace("OLD SAVES DO NOT CONTAIN ITEM STORAGE ARRAY - Creating new!");
                this.inventory.initializeGearStorage();
            } else {
                for (
                    i = 0;
                    i < saveFile.gearStorage.length && this.gearStorageGet().length < 20;
                    i++
                ) {
                    this.gearStorageGet().push(new ItemSlotClass());
                    // trace("Initialize a slot for one of the item storage locations to load.");
                }
                // Populate storage slot array
                for (
                    i = 0;
                    i < saveFile.gearStorage.length && i < this.gearStorageGet().length;
                    i++
                ) {
                    // trace("Populating a storage slot save with data");
                    storage = this.gearStorageGet()[i];
                    if (
                        (saveFile.gearStorage[i].shortName == undefined &&
                            saveFile.gearStorage[i].id == undefined) ||
                        saveFile.gearStorage[i].quantity == undefined ||
                        saveFile.gearStorage[i].quantity == 0
                    )
                        storage.emptySlot();
                    else
                        storage.setItemAndQty(
                            ItemType.lookupItem(
                                saveFile.gearStorage[i].id || saveFile.gearStorage[i].shortName
                            ),
                            saveFile.gearStorage[i].quantity
                        );
                    storage.unlocked = saveFile.gearStorage[i].unlocked;
                }
            }
            // player.cocks = saveFile.cocks;
            this.player.ass.analLooseness = saveFile.ass.analLooseness;
            this.player.ass.analWetness = saveFile.ass.analWetness;
            this.player.ass.fullness = saveFile.ass.fullness;

            // Shit
            this.gameStateSet(saveFile.gameState);
            this.player.exploredLake = saveFile.exploredLake;
            this.player.exploredMountain = saveFile.exploredMountain;
            this.player.exploredForest = saveFile.exploredForest;
            this.player.exploredDesert = saveFile.exploredDesert;
            this.player.explored = saveFile.explored;
            game.foundForest = saveFile.foundForest;
            game.foundDesert = saveFile.foundDesert;
            game.foundMountain = saveFile.foundMountain;
            game.foundLake = saveFile.foundLake;

            // Days
            // Time and Items
            this.model.time.hours = saveFile.hours;
            this.model.time.days = saveFile.days;
            if (saveFile.autoSave == undefined) this.player.autoSave = false;
            else this.player.autoSave = saveFile.autoSave;

            // PLOTZ
            game.whitney = saveFile.whitney;
            game.monk = saveFile.monk;
            game.sand = saveFile.sand;
            if (saveFile.giacomo == undefined) game.giacomo = 0;
            else game.giacomo = saveFile.giacomo;
            if (saveFile.beeProgress != undefined && saveFile.beeProgress == 1)
                game.forest.beeGirlScene.setTalked(); // Bee Progress update is now in a flag
            // The flag will be zero for any older save that still uses beeProgress and newer saves always store a zero in beeProgress, so we only need to update the flag on a value of one.

            // ITEMZ. Item1
            if (saveFile.itemSlot1.shortName) {
                if (saveFile.itemSlot1.shortName.indexOf("Gro+") != -1)
                    saveFile.itemSlot1.id = "GroPlus";
                else if (saveFile.itemSlot1.shortName.indexOf("Sp Honey") != -1)
                    saveFile.itemSlot1.id = "SpHoney";
            }
            if (saveFile.itemSlot2.shortName) {
                if (saveFile.itemSlot2.shortName.indexOf("Gro+") != -1)
                    saveFile.itemSlot2.id = "GroPlus";
                else if (saveFile.itemSlot2.shortName.indexOf("Sp Honey") != -1)
                    saveFile.itemSlot2.id = "SpHoney";
            }
            if (saveFile.itemSlot3.shortName) {
                if (saveFile.itemSlot3.shortName.indexOf("Gro+") != -1)
                    saveFile.itemSlot3.id = "GroPlus";
                else if (saveFile.itemSlot3.shortName.indexOf("Sp Honey") != -1)
                    saveFile.itemSlot3.id = "SpHoney";
            }
            if (saveFile.itemSlot4.shortName) {
                if (saveFile.itemSlot4.shortName.indexOf("Gro+") != -1)
                    saveFile.itemSlot4.id = "GroPlus";
                else if (saveFile.itemSlot4.shortName.indexOf("Sp Honey") != -1)
                    saveFile.itemSlot4.id = "SpHoney";
            }
            if (saveFile.itemSlot5.shortName) {
                if (saveFile.itemSlot5.shortName.indexOf("Gro+") != -1)
                    saveFile.itemSlot5.id = "GroPlus";
                else if (saveFile.itemSlot5.shortName.indexOf("Sp Honey") != -1)
                    saveFile.itemSlot5.id = "SpHoney";
            }

            this.player.itemSlot1.unlocked = true;
            this.player.itemSlot1.setItemAndQty(
                ItemType.lookupItem(saveFile.itemSlot1.id || saveFile.itemSlot1.shortName),
                saveFile.itemSlot1.quantity
            );
            this.player.itemSlot2.unlocked = true;
            this.player.itemSlot2.setItemAndQty(
                ItemType.lookupItem(saveFile.itemSlot2.id || saveFile.itemSlot2.shortName),
                saveFile.itemSlot2.quantity
            );
            this.player.itemSlot3.unlocked = true;
            this.player.itemSlot3.setItemAndQty(
                ItemType.lookupItem(saveFile.itemSlot3.id || saveFile.itemSlot3.shortName),
                saveFile.itemSlot3.quantity
            );
            this.player.itemSlot4.unlocked = saveFile.itemSlot4.unlocked;
            this.player.itemSlot4.setItemAndQty(
                ItemType.lookupItem(saveFile.itemSlot4.id || saveFile.itemSlot4.shortName),
                saveFile.itemSlot4.quantity
            );
            this.player.itemSlot5.unlocked = saveFile.itemSlot5.unlocked;
            this.player.itemSlot5.setItemAndQty(
                ItemType.lookupItem(saveFile.itemSlot5.id || saveFile.itemSlot5.shortName),
                saveFile.itemSlot5.quantity
            );

            CoC.loadAllAwareClasses(this.getGame()); // Informs each saveAwareClass that it must load its values from the flags array
            this.unFuckSave();

            // Control Bindings
            if (saveFile.controls != undefined) {
                game.inputManager.LoadBindsFromObj(saveFile.controls);
            }
            this.doNext(this.playerMenu);
        }
    }

    public unFuckSave(): void {
        // Fixing shit!

        // Fix duplicate elven bounty perks
        if (this.player.findPerk(PerkLib.ElvenBounty) >= 0) {
            // CLear duplicates
            while (this.player.perkDuplicated(PerkLib.ElvenBounty))
                this.player.removePerk(PerkLib.ElvenBounty);
            // Fix fudged preggers value
            if (this.player.perkv1(PerkLib.ElvenBounty) == 15) {
                this.player.setPerkValue(PerkLib.ElvenBounty, 1, 0);
                this.player.addPerkValue(PerkLib.ElvenBounty, 2, 15);
            }
        }

        if (this.player.findStatusAffect(StatusAffects.KnockedBack) >= 0) {
            this.player.removeStatusAffect(StatusAffects.KnockedBack);
        }

        if (this.player.findStatusAffect(StatusAffects.Tentagrappled) >= 0) {
            this.player.removeStatusAffect(StatusAffects.Tentagrappled);
        }

        if (
            this.player.findStatusAffect(StatusAffects.SlimeCraving) >= 0 &&
            this.player.statusAffectv4(StatusAffects.SlimeCraving) == 1
        ) {
            this.player.changeStatusValue(
                StatusAffects.SlimeCraving,
                3,
                this.player.statusAffectv2(StatusAffects.SlimeCraving)
            ); // Duplicate old combined strength/speed value
            this.player.changeStatusValue(StatusAffects.SlimeCraving, 4, 1); // Value four indicates this tracks strength and speed separately
        }

        // Fix issues with corrupt cockTypes caused by a error in the serialization code.

        // trace("CockInfo = ", flags[kFLAGS.RUBI_COCK_TYPE]);
        // trace("getQualifiedClassName = ", getQualifiedClassName(flags[kFLAGS.RUBI_COCK_TYPE]));
        // trace("typeof = ", typeof(flags[kFLAGS.RUBI_COCK_TYPE]));
        // trace("is CockTypesEnum = ", flags[kFLAGS.RUBI_COCK_TYPE] is CockTypesEnum);
        // trace("instanceof CockTypesEnum = ", flags[kFLAGS.RUBI_COCK_TYPE] instanceof CockTypesEnum);

        if (
            !(
                CockTypesEnum[this.flags[kFLAGS.RUBI_COCK_TYPE]] ||
                typeof this.flags[kFLAGS.RUBI_COCK_TYPE] == "number"
            )
        ) {
            // Valid contents of flags[kFLAGS.RUBI_COCK_TYPE] are either a CockTypesEnum or a number

            trace("Fixing save (goo girl)");
            this.outx("\n<b>Rubi's cockType is invalid. Defaulting him to human.</b>\n");
            this.flags[kFLAGS.RUBI_COCK_TYPE] = 0;
        }

        if (
            !(
                CockTypesEnum[this.flags[kFLAGS.GOO_DICK_TYPE]] ||
                typeof this.flags[kFLAGS.GOO_DICK_TYPE] == "number"
            )
        ) {
            // Valid contents of flags[kFLAGS.GOO_DICK_TYPE] are either a CockTypesEnum or a number

            trace("Fixing save (goo girl)");
            this.outx("\n<b>Latex Goo-Girls's cockType is invalid. Defaulting him to human.</b>\n");
            this.flags[kFLAGS.GOO_DICK_TYPE] = 0;
        }

        const flagData: any[] = String(this.flags[kFLAGS.KATHERINE_BREAST_SIZE]).split("^");
        if (flagData.length < 7 && this.flags[kFLAGS.KATHERINE_BREAST_SIZE] > 0) {
            // Older format only stored breast size or zero if not yet initialized
            this.getGame().telAdre.katherine.breasts.cupSize = this.flags[
                kFLAGS.KATHERINE_BREAST_SIZE
            ];
            this.getGame().telAdre.katherine.breasts.lactationLevel =
                BreastStore.LACTATION_DISABLED;
        }

        if (this.flags[kFLAGS.SAVE_FILE_INTEGER_FORMAT_VERSION] < 816) {
            // Older saves don't have pregnancy types for all impregnable NPCs. Have to correct this.
            // If anything is detected that proves this is a new format save then we can return immediately as all further checks are redundant.
            if (this.flags[kFLAGS.AMILY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.AMILY_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.flags[kFLAGS.AMILY_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }
            if (this.flags[kFLAGS.AMILY_OVIPOSITED_COUNTDOWN] > 0) {
                if (this.flags[kFLAGS.AMILY_BUTT_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                if (this.player.findPerk(PerkLib.SpiderOvipositor) >= 0)
                    this.flags[kFLAGS.AMILY_BUTT_PREGNANCY_TYPE] =
                        PregnancyStore.PREGNANCY_DRIDER_EGGS;
                else
                    this.flags[kFLAGS.AMILY_BUTT_PREGNANCY_TYPE] =
                        PregnancyStore.PREGNANCY_BEE_EGGS;
            }

            if (this.flags[kFLAGS.COTTON_PREGNANCY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.COTTON_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.flags[kFLAGS.COTTON_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.EMBER_INCUBATION] > 0) {
                if (this.flags[kFLAGS.EMBER_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.flags[kFLAGS.EMBER_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.FEMALE_SPIDERMORPH_PREGNANCY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.FEMALE_SPIDERMORPH_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.flags[kFLAGS.FEMALE_SPIDERMORPH_PREGNANCY_TYPE] =
                    PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.HELSPAWN_AGE] > 0) {
                kGAMECLASS.helScene.pregnancy.knockUpForce(); // Clear Pregnancy, also removed any old value from HEL_PREGNANCY_NOTICES
            } else if (this.flags[kFLAGS.HEL_PREGNANCY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.HELIA_PREGNANCY_TYPE] > 3) return; // Must be a new format save
                // HELIA_PREGNANCY_TYPE was previously HEL_PREGNANCY_NOTICES, which ran from 0 to 3. Converted to the new format by multiplying by 65536
                // Since HelSpawn's father is already tracked separately we might as well just use PREGNANCY_PLAYER for all possible pregnancies
                this.flags[kFLAGS.HELIA_PREGNANCY_TYPE] =
                    65536 * this.flags[kFLAGS.HELIA_PREGNANCY_TYPE] +
                    PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.KELLY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.KELLY_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.flags[kFLAGS.KELLY_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_PLAYER) return; // Must be a new format save
            if (this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_OVIELIXIR_EGGS)
                return; // Must be a new format save
            if (this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] == 1)
                this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            if (this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] == 2)
                this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_OVIELIXIR_EGGS;

            if (this.flags[kFLAGS.PHYLLA_DRIDER_INCUBATION] > 0) {
                if (this.flags[kFLAGS.PHYLLA_VAGINAL_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.flags[kFLAGS.PHYLLA_VAGINAL_PREGNANCY_TYPE] =
                    PregnancyStore.PREGNANCY_DRIDER_EGGS;
                this.flags[kFLAGS.PHYLLA_DRIDER_INCUBATION] *= 24; // Convert pregnancy to days
            }

            if (this.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.SHEILA_PREGNANCY_TYPE] != 0) return; // Must be a new format save
                this.flags[kFLAGS.SHEILA_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
                if (this.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] >= 4)
                    this.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] = 0;
                // Was ready to be born
                else
                    this.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] =
                        24 * (4 - this.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION]); // Convert to hours and count down rather than up
            }

            if (
                this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] != 0 &&
                this.flags[kFLAGS.SOPHIE_INCUBATION] != 0
            )
                return; // Must be a new format save
            if (
                this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] > 0 &&
                this.flags[kFLAGS.SOPHIE_INCUBATION] == 0
            ) {
                // She's in the wild and pregnant with an egg
                this.flags[kFLAGS.SOPHIE_INCUBATION] = this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE]; // SOPHIE_PREGNANCY_TYPE was previously SOPHIE_WILD_EGG_COUNTDOWN_TIMER
                this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            } else if (
                this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] == 0 &&
                this.flags[kFLAGS.SOPHIE_INCUBATION] > 0
            ) {
                this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_TYPE] != 0) return; // Must be a new format save
            if (this.flags[kFLAGS.TAMANI_DAUGHTER_PREGGO_COUNTDOWN] > 0) {
                this.flags[kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_TYPE] =
                    PregnancyStore.PREGNANCY_PLAYER;
                this.flags[kFLAGS.TAMANI_DAUGHTER_PREGGO_COUNTDOWN] *= 24; // Convert pregnancy to days
                this.flags[kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT] = this.player.statusAffectv3(
                    StatusAffects.Tamani
                );
            }

            if (this.flags[kFLAGS.TAMANI_PREGNANCY_TYPE] != 0) return; // Must be a new format save
            if (this.player.findStatusAffect(StatusAffects.TamaniFemaleEncounter) >= 0)
                this.player.removeStatusAffect(StatusAffects.TamaniFemaleEncounter); // Wasn't used in previous code
            if (this.player.findStatusAffect(StatusAffects.Tamani) >= 0) {
                if (this.player.statusAffectv1(StatusAffects.Tamani) == -500) {
                    // This used to indicate that a player had met Tamani as a male
                    this.flags[kFLAGS.TAMANI_PREGNANCY_INCUBATION] = 0;
                    this.flags[kFLAGS.TAMANI_MET] = 1; // This now indicates the same thing
                } else
                    this.flags[kFLAGS.TAMANI_PREGNANCY_INCUBATION] =
                        this.player.statusAffectv1(StatusAffects.Tamani) * 24; // Convert pregnancy to days
                this.flags[kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] = this.player.statusAffectv2(
                    StatusAffects.Tamani
                );
                this.flags[kFLAGS.TAMANI_PREGNANCY_COUNT] = this.player.statusAffectv3(
                    StatusAffects.Tamani
                );
                this.flags[kFLAGS.TAMANI_TIMES_IMPREGNATED] = this.player.statusAffectv4(
                    StatusAffects.Tamani
                );
                if (this.flags[kFLAGS.TAMANI_PREGNANCY_INCUBATION] > 0)
                    this.flags[kFLAGS.TAMANI_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
                this.player.removeStatusAffect(StatusAffects.Tamani);
            }

            if (
                this.flags[kFLAGS.EGG_WITCH_TYPE] == PregnancyStore.PREGNANCY_BEE_EGGS ||
                this.flags[kFLAGS.EGG_WITCH_TYPE] == PregnancyStore.PREGNANCY_DRIDER_EGGS
            )
                return; // Must be a new format save
            if (this.flags[kFLAGS.EGG_WITCH_TYPE] > 0) {
                if (this.flags[kFLAGS.EGG_WITCH_TYPE] == 1)
                    this.flags[kFLAGS.EGG_WITCH_TYPE] = PregnancyStore.PREGNANCY_BEE_EGGS;
                else this.flags[kFLAGS.EGG_WITCH_TYPE] = PregnancyStore.PREGNANCY_DRIDER_EGGS;
                this.flags[kFLAGS.EGG_WITCH_COUNTER] =
                    24 * (8 - this.flags[kFLAGS.EGG_WITCH_COUNTER]); // Reverse the count and change to hours rather than days
            }

            if (this.player.buttPregnancyType == PregnancyStore.PREGNANCY_BEE_EGGS) return; // Must be a new format save
            if (this.player.buttPregnancyType == PregnancyStore.PREGNANCY_DRIDER_EGGS) return; // Must be a new format save
            if (this.player.buttPregnancyType == PregnancyStore.PREGNANCY_SANDTRAP_FERTILE) return; // Must be a new format save
            if (this.player.buttPregnancyType == PregnancyStore.PREGNANCY_SANDTRAP) return; // Must be a new format save
            if (this.player.buttPregnancyType == 2)
                this.player.buttKnockUpForce(
                    PregnancyStore.PREGNANCY_BEE_EGGS,
                    this.player.buttPregnancyIncubation
                );
            if (this.player.buttPregnancyType == 3)
                this.player.buttKnockUpForce(
                    PregnancyStore.PREGNANCY_DRIDER_EGGS,
                    this.player.buttPregnancyIncubation
                );
            if (this.player.buttPregnancyType == 4)
                this.player.buttKnockUpForce(
                    PregnancyStore.PREGNANCY_SANDTRAP_FERTILE,
                    this.player.buttPregnancyIncubation
                );
            if (this.player.buttPregnancyType == 5)
                this.player.buttKnockUpForce(
                    PregnancyStore.PREGNANCY_SANDTRAP,
                    this.player.buttPregnancyIncubation
                );

            // If dick length zero then player has never met Kath, no need to set flags. If her breast size is zero then set values for flags introduced with the employment expansion
            if (this.flags[kFLAGS.KATHERINE_BREAST_SIZE] != 0) return; // Must be a new format save
            if (this.flags[kFLAGS.KATHERINE_DICK_LENGTH] != 0) {
                this.flags[kFLAGS.KATHERINE_BREAST_SIZE] = BREAST_CUP_B;
                this.flags[kFLAGS.KATHERINE_BALL_SIZE] = 1;
                this.flags[kFLAGS.KATHERINE_HAIR_COLOR] = "neon pink";
                this.flags[kFLAGS.KATHERINE_HOURS_SINCE_CUM] = 200; // Give her maxed out cum for that first time
            }

            if (this.flags[kFLAGS.URTA_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_BEE_EGGS) return; // Must be a new format save
            if (this.flags[kFLAGS.URTA_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_DRIDER_EGGS)
                return; // Must be a new format save
            if (this.flags[kFLAGS.URTA_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_PLAYER) return; // Must be a new format save
            if (this.flags[kFLAGS.URTA_PREGNANCY_TYPE] > 0) {
                // URTA_PREGNANCY_TYPE was previously URTA_EGG_INCUBATION, assume this was an egg pregnancy
                this.flags[kFLAGS.URTA_INCUBATION] = this.flags[kFLAGS.URTA_PREGNANCY_TYPE];
                if (this.player.findPerk(PerkLib.SpiderOvipositor) >= 0)
                    this.flags[kFLAGS.URTA_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_DRIDER_EGGS;
                else this.flags[kFLAGS.URTA_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_BEE_EGGS;
            } else if (this.flags[kFLAGS.URTA_INCUBATION] > 0) {
                // Assume Urta was pregnant with the player's baby
                this.flags[kFLAGS.URTA_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
                this.flags[kFLAGS.URTA_INCUBATION] = 384 - this.flags[kFLAGS.URTA_INCUBATION]; // Reverse the pregnancy counter since it now counts down rather than up
            }

            if (
                this.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] > 0 &&
                this.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] == 0
            ) {
                // EDRYN_PREGNANCY_TYPE was previously EDRYN_BIRF_COUNTDOWN - used when Edryn was pregnant with Taoth
                if (this.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] > 0)
                    this.flags[kFLAGS.URTA_FERTILE] = PregnancyStore.PREGNANCY_PLAYER; // These two variables are used to store information on the pregnancy Taoth
                this.flags[kFLAGS.URTA_PREG_EVERYBODY] = this.flags[
                    kFLAGS.EDRYN_PREGNANCY_INCUBATION
                ]; // is overriding (if any), so they can later be restored.
                this.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] = this.flags[
                    kFLAGS.EDRYN_PREGNANCY_TYPE
                ];
                this.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_TAOTH;
            } else if (
                this.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] > 0 &&
                this.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] == 0
            )
                this.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
        }
    }
}
