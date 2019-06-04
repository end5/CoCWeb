import { BaseContent } from "./BaseContent";
import { kGAMECLASS } from "./CoC";
import { trace } from "console";
import { kFLAGS } from "./GlobalFlags/kFLAGS";
import { CoC } from "./CoC";
import { Player } from "./Player";
import { ItemType } from "./ItemType";
import { Weapon } from "./Items/Weapon";
import { WeaponLib } from "./Items/WeaponLib";
import { Armor } from "./Items/Armor";
import { ArmorLib } from "./Items/ArmorLib";
import { EYES_HUMAN, ARM_TYPE_HUMAN, SKIN_TYPE_PLAIN, SKIN_TYPE_FUR, SKIN_TYPE_SCALES, SKIN_TYPE_GOO, TONUGE_HUMAN, EARS_HUMAN, ANTENNAE_NONE, HORNS_NONE, BREAST_CUP_B } from "../../includes/appearanceDefs";
import { CockTypesEnum } from "./CockTypesEnum";
import { PerkType } from "./PerkType";
import { PerkLib } from "./PerkLib";
import { StatusAffectType } from "./StatusAffectType";
import { CoC_Settings } from "./CoC_Settings";
import { ItemSlotClass } from "./ItemSlotClass";
import { StatusAffects } from "./StatusAffects";
import { BreastStore } from "./BreastStore";
import { PregnancyStore } from "./PregnancyStore";
import { Flags } from "./FlagTypeOverrides";

export class Saves extends BaseContent {

    private static SAVE_FILE_CURRENT_INTEGER_FORMAT_VERSION: number = 816;
    //Didn't want to include something like this, but an integer is safer than depending on the text version number from the CoC class.
    //Also, this way the save file version doesn't need updating unless an important structural change happens in the save file.

    private gameStateGet: any;
    private gameStateSet: any;
    private itemStorageGet: any;
    private gearStorageGet: any;

    public constructor(gameStateDirectGet: any, gameStateDirectSet: any) {
        super();
        this.gameStateGet = gameStateDirectGet; //This is so that the save game functions (and nothing else) get direct access to the gameState variable
        this.gameStateSet = gameStateDirectSet;
    }

    public linkToInventory(itemStorageDirectGet: any, gearStorageDirectGet: any): void {
        this.itemStorageGet = itemStorageDirectGet;
        this.gearStorageGet = gearStorageDirectGet;
    }

    public saveFileNames: any[] = ["CoC_1", "CoC_2", "CoC_3", "CoC_4", "CoC_5", "CoC_6", "CoC_7", "CoC_8", "CoC_9"];
    public versionProperties: Record<string, any> = { "legacy": 100, "0.8.3f7": 124, "0.8.3f8": 125, "0.8.4.3": 119, "latest": 119 };
    public savedGameDir: string = "data/com.fenoxo.coc";

    public loadSaveDisplay(saveFile: Record<string, any>, slotName: string): string {
        var holding: string = "";
        if (saveFile.data.exists && saveFile.data.flags[2066] == undefined) {
            if (saveFile.data.notes == undefined) {
                saveFile.data.notes = "No notes available.";
            }
            holding = slotName;
            holding += ":  <b>";
            holding += saveFile.data.short;
            holding += "</b> - <i>" + saveFile.data.notes + "</i>\r";
            holding += "Days - " + saveFile.data.days + "  Gender - ";
            if (saveFile.data.gender == 0)
                holding += "U";
            if (saveFile.data.gender == 1)
                holding += "M";
            if (saveFile.data.gender == 2)
                holding += "F";
            if (saveFile.data.gender == 3)
                holding += "H";
            holding += "\r";
            return holding;
        }
        else if (saveFile.data.exists && saveFile.data.flags[2066] != undefined) {
            return slotName + ":  <b>UNSUPPORTED</b>\rThis is a save file that has been created in a modified version of CoC.\r";
        }
        else {
            return slotName + ":  <b>EMPTY</b>\r     \r";
        }
    }

    private getSaveObj(key: string): Record<string, any> {
        const save = localStorage.getItem(key);
        if (save)
            return JSON.parse(save);
        else
            return {};
    }

    public loadScreen(): void {
        var slots: any[] = new Array(this.saveFileNames.length);

        this.outputText("<b><u>Slot: Sex,  Game Days Played</u></b>\r", true);

        for (var i: number = 0; i < this.saveFileNames.length; i += 1) {
            var test: Record<string, any> = this.getSaveObj(this.saveFileNames[i]);
            this.outputText(this.loadSaveDisplay(test, String(i + 1)), false);
            if (test.data.exists && test.data.flags[2066] == undefined) {
                //trace("Creating function with indice = ", i);
                ((i: number) => {
                    slots[i] = () => {
                        trace("Loading save with name", this.saveFileNames[i], "at index", i);
                        this.loadGame(this.saveFileNames[i]);
                        // if (this.loadGame(this.saveFileNames[i])) {
                        //     this.doNext(this.playerMenu);
                        //     this.showStats();
                        //     this.statScreenRefresh();
                        //     this.outputText("Slot " + i + " Loaded!", true);
                        // }
                    }
                })(i);
            }
            else {
                slots[i] = undefined;		// You have to set the parameter to 0 to disable the button
            }
        }

        this.choices("Slot 1", slots[0],
            "Slot 2", slots[1],
            "Slot 3", slots[2],
            "Slot 4", slots[3],
            "Slot 5", slots[4],
            "Slot 6", slots[5],
            "Slot 7", slots[6],
            "Slot 8", slots[7],
            "Slot 9", slots[8],
            "Back", this.saveLoad);
    }

    public saveScreen(): void {
        const input = document.createElement('input');
        this.mainView.mainText.appendChild(input);

        // var test; // Disabling this variable because it seems to be unused.

        this.outputText("", true);
        if (this.player.slotName != "VOID")
            this.outputText("<b>Last saved or loaded from: " + this.player.slotName + "</b>\r\r", false);
        this.outputText("<b><u>Slot: Sex,  Game Days Played</u></b>\r", false);

        var saveFuncs: any[] = [];

        for (var i: number = 0; i < this.saveFileNames.length; i += 1) {
            var test: Record<string, any> = this.getSaveObj(this.saveFileNames[i]);
            this.outputText(this.loadSaveDisplay(test, String(i + 1)), false);
            trace("Creating function with indice = ", i);
            ((i: number) => {
                saveFuncs[i] = () => {
                    trace("Saving game with name", this.saveFileNames[i], "at index", i);
                    this.saveGame(this.saveFileNames[i], input);
                }
            })(i);

        }


        if (this.player.slotName == "VOID")
            this.outputText("\r\r", false);

        this.outputText("<b>Leave the notes box blank if you don't wish to change notes.\r<u>NOTES:</u></b>", false);
        this.choices("Slot 1", saveFuncs[0],
            "Slot 2", saveFuncs[1],
            "Slot 3", saveFuncs[2],
            "Slot 4", saveFuncs[3],
            "Slot 5", saveFuncs[4],
            "Slot 6", saveFuncs[5],
            "Slot 7", saveFuncs[6],
            "Slot 8", saveFuncs[7],
            "Slot 9", saveFuncs[8],
            "Back", this.saveLoad);
    }

    public saveLoad(): void {
        // this.mainView.eventTestInput.x = -10207.5;
        // this.mainView.eventTestInput.y = -1055.1;
        //Hide the name box in case of backing up from save
        //screen so it doesnt overlap everything.
        // this.mainView.nameBox.visible = false;
        this.outputText("", true);
        this.outputText("<b>Where are my saves located?</b>\n", false);
        this.outputText("<i>In Windows Vista/7 (IE/FireFox/Other): <pre>Users/{username}/Appdata/Roaming/Macromedia/Flash Player/#Shared Objects/{GIBBERISH}/</pre>\n\n", false);
        this.outputText("In Windows Vista/7 (Chrome): <pre>Users/{username}/AppData/Local/Google/Chrome/User Data/Default/Pepper Data/Shockwave Flash/WritableRoot/#SharedObjects/{GIBBERISH}/</pre>\n\n", false);
        this.outputText("Inside that folder it will saved in a folder corresponding to where it was played from.  If you saved the CoC.swf to your HDD, then it will be in a folder called localhost.  If you played from my website, it will be in fenoxo.com.  The save files will be labelled CoC_1.sol, CoC_2.sol, CoC_3.sol, etc.</i>\n\n", false);
        this.outputText("<b>Why do my saves disappear all the time?</b>\n<i>There are numerous things that will wipe out flash local shared files.  If your browser or player is set to delete flash cookies or data, that will do it.  CCleaner will also remove them.  CoC or its updates will never remove your savegames - if they disappear something else is wiping them out.</i>\n\n", false);
        this.outputText("<b>When I play from my HDD I have one set of saves, and when I play off your site I have a different set of saves.  Why?</b>\n<i>Flash stores saved data relative to where it was accessed from.  Playing from your HDD will store things in a different location than fenoxo.com or FurAffinity.</i>\n", false);
        this.outputText("<i>If you want to be absolutely sure you don't lose a character, copy the .sol file for that slot out and back it up! <b>For more information, google flash shared objects.</b></i>\n\n", false);
        this.outputText("<b>Why does the Save File and Load File option not work?</b>\n");
        this.outputText("<i>Save File and Load File are limited by the security settings imposed upon CoC by Flash. These options will only work if you have downloaded the game from the website, and are running it from your HDD. Additionally, they can only correctly save files to and load files from the directory where you have the game saved.</i>");
        //This is to clear the 'game over' block from stopping simpleChoices from working.  Loading games supercede's game over.
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
            this.simpleChoices("", undefined, "Load", this.loadScreen, "Load File", this.loadFromFile, "Delete", this.deleteScreen, "Back", kGAMECLASS.mainMenu);
            return;
        }
        if (this.inDungeon) {
            this.simpleChoices("", undefined, "Load", this.loadScreen, "Load File", this.loadFromFile, "Delete", this.deleteScreen, "Back", kGAMECLASS.playerMenu);
            return;
        }
        if (this.gameStateGet() == 3)
            this.choices("Save", this.saveScreen,
                "Load", this.loadScreen,
                "Load File", this.loadFromFile,
                "Delete", this.deleteScreen,
                "Back", undefined,
                "Save to File", this.saveToFile,
                "Load File", this.loadFromFile,
                "", undefined,
                "", undefined,
                "", undefined);
        else {
            if (this.player.autoSave)
                this.choices("Save", this.saveScreen,
                    "Load", this.loadScreen,
                    "AutoSav: ON", this.autosaveToggle,
                    "Delete", this.deleteScreen,
                    "", undefined,
                    "Save to File", this.saveToFile,
                    "Load File", this.loadFromFile,
                    "", undefined,
                    "", undefined,
                    "Back", kGAMECLASS.playerMenu);
            else
                this.choices("Save", this.saveScreen,
                    "Load", this.loadScreen,
                    "AutoSav: OFF", this.autosaveToggle,
                    "Delete", this.deleteScreen,
                    "", undefined,
                    "Save to File", this.saveToFile,
                    "Load File", this.loadFromFile,
                    "", undefined,
                    "", undefined,
                    "Back", kGAMECLASS.playerMenu);
        }
    }

    private saveToFile(notes: HTMLInputElement): void {
        this.saveGameObject(undefined, notes);
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
        this.outputText("Slot,  Race,  Sex,  Game Days Played\n", true);


        var delFuncs: any[] = [];


        for (var i: number = 0; i < this.saveFileNames.length; i += 1) {
            var test: Record<string, any> = this.getSaveObj(this.saveFileNames[i]);
            this.outputText(this.loadSaveDisplay(test, String(i + 1)), false);
            if (test.data.exists) {
                //slots[i] = loadFuncs[i];

                trace("Creating function with indice = ", i);
                ((i: number) => {
                    delFuncs[i] = () => {
                        this.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION] = this.saveFileNames[i];
                        this.confirmDelete();
                    }
                })(i);
            }
            else
                delFuncs[i] = undefined;	//disable buttons for empty slots
        }

        this.outputText("\n<b>ONCE DELETED, YOUR SAVE IS GONE FOREVER.</b>", false);
        this.choices("Slot 1", delFuncs[0],
            "Slot 2", delFuncs[1],
            "Slot 3", delFuncs[2],
            "Slot 4", delFuncs[3],
            "Slot 5", delFuncs[4],
            "Slot 6", delFuncs[5],
            "Slot 7", delFuncs[6],
            "Slot 8", delFuncs[7],
            "Slot 9", delFuncs[8],
            "Back", this.saveLoad);
    }

    public confirmDelete(): void {
        this.outputText("You are about to delete the following save: <b>" + this.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION] + "</b>\n\nAre you sure you want to delete it?", true);
        this.simpleChoices("No", this.deleteScreen, "Yes", this.purgeTheMutant, "", undefined, "", undefined, "", undefined);
    }

    public purgeTheMutant(): void {
        var test: any = this.getSaveObj(this.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION] + '');
        trace("DELETING SLOT: " + this.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION]);
        var blah: any[] = ["been virus bombed", "been purged", "been vaped", "been nuked from orbit", "taken an arrow to the knee", "fallen on its sword", "lost its reality matrix cohesion", "been cleansed", "suffered the following error: (404) Porn Not Found"];

        trace(blah.length + " array slots");
        var select: number = Saves.rand(blah.length);
        this.outputText(this.flags[kFLAGS.TEMP_STORAGE_SAVE_DELETION] + " has " + blah[select] + ".", true);
        test.clear();
        this.doNext(this.deleteScreen);
    }

    public saveGame(slot: string, notes?: HTMLInputElement): void {
        this.player.slotName = slot;
        this.saveGameObject(slot, notes);
    }

    public loadGame(slot: string): void {
        var saveFile: any = this.getSaveObj(slot);

        // Check the property count of the file
        var numProps: number = Object.keys(saveFile.data).length;

        var sfVer: any;
        if (saveFile.data.version == undefined) {
            sfVer = this.versionProperties["legacy"];
        }
        else {
            sfVer = this.versionProperties[saveFile.data.version];
        }

        if (!(typeof sfVer == 'number')) {
            sfVer = this.versionProperties["latest"];
        } else {
            sfVer = sfVer as Number;
        }

        trace("File version " + (saveFile.data.version || "legacy") + "expects propNum " + sfVer);

        if (numProps < sfVer) {
            trace("Got " + numProps + " file properties -- failed!");
            this.outputText("<b>Aborting load.  The current save file is missing a number of expected properties.</b>\n\n", true);

            var backup = this.getSaveObj(slot + "_backup");

            if (backup.data.exists) {
                this.outputText("Would you like to load the backup version of this slot?");
                this.menu();
                this.addButton(0, "Yes", this.loadGame, (slot + "_backup"));
                this.addButton(1, "No", this.saveLoad);
            }
            else {
                this.menu();
                this.addButton(0, "Next", this.saveLoad);
            }
        }
        else {
            trace("Got " + numProps + " file properties -- success!");
            // I want to be able to write some debug stuff to the GUI during the loading process
            // Therefore, we clear the display *before* calling loadGameObject
            this.outputText("", true);

            this.loadGameObject(saveFile, slot);
            this.outputText("Game Loaded");
            this.temp = 0;
            this.statScreenRefresh();

            if (this.player.slotName == "VOID") {
                trace("Setting in-use save slot to: " + slot);
                this.player.slotName = slot;
            }

            this.doNext(this.playerMenu);
        }
    }


    /*
    
    OH GOD SOMEONE FIX THIS DISASTER!!!!111one1ONE!
    
    */
    //FURNITURE'S JUNK
    public saveGameObject(slot?: string, notes?: HTMLInputElement): void {
        //Autosave stuff
        if (this.player.slotName != "VOID")
            this.player.slotName = slot || '';

        var backupAborted: boolean = false;

        CoC.saveAllAwareClasses(this.getGame()); //Informs each saveAwareClass that it must save its values in the flags array
        // var counter: number = this.player.cocks.length;
        //Initialize the save file
        var saveFile: any;
        var backup;
        if (!slot) {
            saveFile = {};

            saveFile.data = {};
        }
        else {
            saveFile = this.getSaveObj(slot);
        }

        //Set a single variable that tells us if this save exists

        saveFile.data.exists = true;
        saveFile.data.version = this.ver;
        this.flags[kFLAGS.SAVE_FILE_INTEGER_FORMAT_VERSION] = Saves.SAVE_FILE_CURRENT_INTEGER_FORMAT_VERSION;

        //CLEAR OLD ARRAYS

        //Save sum dataz
        trace("SAVE DATAZ");
        saveFile.data.short = this.player.short;
        saveFile.data.a = this.player.a;

        //Notes
        if (notes && notes.value != "") {
            saveFile.data.notes = notes.value;
            this.getGame().notes = notes.value;
        }
        else
            saveFile.data.notes = this.getGame().notes;

        try {
            //flags
            saveFile.data.flags = [];
            for (var i of Object.keys(this.flags).map((key) => parseInt(key)).filter((key) => !isNaN(key))) {
                // Don't save unset/default flags
                if (this.flags[i] !== '') {
                    saveFile.data.flags[i] = this.flags[i];
                }
            }

            //CLOTHING/ARMOR
            saveFile.data.armorId = this.player.armor.id;
            saveFile.data.weaponId = this.player.weapon.id;
            saveFile.data.armorName = this.player.modArmorName;
            //saveFile.data.weaponName = player.weaponName;// uncomment for backward compatibility
            //saveFile.data.weaponVerb = player.weaponVerb;// uncomment for backward compatibility
            //saveFile.data.armorDef = player.armorDef;// uncomment for backward compatibility
            //saveFile.data.armorPerk = player.armorPerk;// uncomment for backward compatibility
            //saveFile.data.weaponAttack = player.weaponAttack;// uncomment for backward compatibility
            //saveFile.data.weaponPerk = player.weaponPerk;// uncomment for backward compatibility
            //saveFile.data.weaponValue = player.weaponValue;// uncomment for backward compatibility
            //saveFile.data.armorValue = player.armorValue;// uncomment for backward compatibility

            //PIERCINGS
            saveFile.data.nipplesPierced = this.player.nipplesPierced;
            saveFile.data.nipplesPShort = this.player.nipplesPShort;
            saveFile.data.nipplesPLong = this.player.nipplesPLong;
            saveFile.data.lipPierced = this.player.lipPierced;
            saveFile.data.lipPShort = this.player.lipPShort;
            saveFile.data.lipPLong = this.player.lipPLong;
            saveFile.data.tonguePierced = this.player.tonguePierced;
            saveFile.data.tonguePShort = this.player.tonguePShort;
            saveFile.data.tonguePLong = this.player.tonguePLong;
            saveFile.data.eyebrowPierced = this.player.eyebrowPierced;
            saveFile.data.eyebrowPShort = this.player.eyebrowPShort;
            saveFile.data.eyebrowPLong = this.player.eyebrowPLong;
            saveFile.data.earsPierced = this.player.earsPierced;
            saveFile.data.earsPShort = this.player.earsPShort;
            saveFile.data.earsPLong = this.player.earsPLong;
            saveFile.data.nosePierced = this.player.nosePierced;
            saveFile.data.nosePShort = this.player.nosePShort;
            saveFile.data.nosePLong = this.player.nosePLong;

            //MAIN STATS
            saveFile.data.str = this.player.str;
            saveFile.data.tou = this.player.tou;
            saveFile.data.spe = this.player.spe;
            saveFile.data.inte = this.player.inte;
            saveFile.data.lib = this.player.lib;
            saveFile.data.sens = this.player.sens;
            saveFile.data.cor = this.player.cor;
            saveFile.data.fatigue = this.player.fatigue;
            //Combat STATS
            saveFile.data.HP = this.player.HP;
            saveFile.data.lust = this.player.lust;
            saveFile.data.teaseLevel = this.player.teaseLevel;
            saveFile.data.teaseXP = this.player.teaseXP;
            //LEVEL STATS
            saveFile.data.XP = this.player.XP;
            saveFile.data.level = this.player.level;
            saveFile.data.gems = this.player.gems;
            saveFile.data.perkPoints = this.player.perkPoints;

            //Appearance
            saveFile.data.gender = this.player.gender;
            saveFile.data.femininity = this.player.femininity;
            saveFile.data.thickness = this.player.thickness;
            saveFile.data.tone = this.player.tone;
            saveFile.data.tallness = this.player.tallness;
            saveFile.data.hairColor = this.player.hairColor;
            saveFile.data.hairType = this.player.hairType;
            saveFile.data.gills = this.player.gills;
            saveFile.data.armType = this.player.armType;
            saveFile.data.hairLength = this.player.hairLength;
            saveFile.data.beardLength = this.player.beardLength;
            saveFile.data.eyeType = this.player.eyeType;
            saveFile.data.beardStyle = this.player.beardStyle;
            saveFile.data.skinType = this.player.skinType;
            saveFile.data.skinTone = this.player.skinTone;
            saveFile.data.skinDesc = this.player.skinDesc;
            saveFile.data.skinAdj = this.player.skinAdj;
            saveFile.data.faceType = this.player.faceType;
            saveFile.data.tongueType = this.player.tongueType;
            saveFile.data.earType = this.player.earType;
            saveFile.data.earValue = this.player.earValue;
            saveFile.data.antennae = this.player.antennae;
            saveFile.data.horns = this.player.horns;
            saveFile.data.hornType = this.player.hornType;
            saveFile.data.wingDesc = this.player.wingDesc;
            saveFile.data.wingType = this.player.wingType;
            saveFile.data.lowerBody = this.player.lowerBody;
            saveFile.data.tailType = this.player.tailType;
            saveFile.data.tailVenum = this.player.tailVenom;
            saveFile.data.tailRecharge = this.player.tailRecharge;
            saveFile.data.hipRating = this.player.hipRating;
            saveFile.data.buttRating = this.player.buttRating;

            //Sexual Stuff
            saveFile.data.balls = this.player.balls;
            saveFile.data.cumMultiplier = this.player.cumMultiplier;
            saveFile.data.ballSize = this.player.ballSize;
            saveFile.data.hoursSinceCum = this.player.hoursSinceCum;
            saveFile.data.fertility = this.player.fertility;
            saveFile.data.clitLength = this.player.clitLength;

            //Preggo stuff
            saveFile.data.pregnancyIncubation = this.player.pregnancyIncubation;
            saveFile.data.pregnancyType = this.player.pregnancyType;
            saveFile.data.buttPregnancyIncubation = this.player.buttPregnancyIncubation;
            saveFile.data.buttPregnancyType = this.player.buttPregnancyType;

            /*myLocalData.data.furnitureArray = new Array();
               for (var i: number = 0; i < GameArray.length; i++) {
               myLocalData.data.girlArray.push(new Array());
               myLocalData.data.girlEffectArray.push(new Array());
             }*/

            saveFile.data.cocks = [];
            saveFile.data.vaginas = [];
            saveFile.data.breastRows = [];
            saveFile.data.perks = [];
            saveFile.data.statusAffects = [];
            saveFile.data.ass = [];
            saveFile.data.keyItems = [];
            saveFile.data.itemStorage = [];
            saveFile.data.gearStorage = [];
            //Set array
            for (i = 0; i < this.player.cocks.length; i++) {
                saveFile.data.cocks.push([]);
            }
            //Populate Array
            for (i = 0; i < this.player.cocks.length; i++) {
                saveFile.data.cocks[i].cockThickness = this.player.cocks[i].cockThickness;
                saveFile.data.cocks[i].cockLength = this.player.cocks[i].cockLength;
                saveFile.data.cocks[i].cockType = this.player.cocks[i].cockType.Index;
                saveFile.data.cocks[i].knotMultiplier = this.player.cocks[i].knotMultiplier;
                saveFile.data.cocks[i].pierced = this.player.cocks[i].pierced;
                saveFile.data.cocks[i].pShortDesc = this.player.cocks[i].pShortDesc;
                saveFile.data.cocks[i].pLongDesc = this.player.cocks[i].pLongDesc;
                saveFile.data.cocks[i].sock = this.player.cocks[i].sock;
            }
            //Set Vaginal Array
            for (i = 0; i < this.player.vaginas.length; i++) {
                saveFile.data.vaginas.push([]);
            }
            //Populate Vaginal Array
            for (i = 0; i < this.player.vaginas.length; i++) {
                saveFile.data.vaginas[i].type = this.player.vaginas[i].type;
                saveFile.data.vaginas[i].vaginalWetness = this.player.vaginas[i].vaginalWetness;
                saveFile.data.vaginas[i].vaginalLooseness = this.player.vaginas[i].vaginalLooseness;
                saveFile.data.vaginas[i].fullness = this.player.vaginas[i].fullness;
                saveFile.data.vaginas[i].virgin = this.player.vaginas[i].virgin;
                saveFile.data.vaginas[i].labiaPierced = this.player.vaginas[i].labiaPierced;
                saveFile.data.vaginas[i].labiaPShort = this.player.vaginas[i].labiaPShort;
                saveFile.data.vaginas[i].labiaPLong = this.player.vaginas[i].labiaPLong;
                saveFile.data.vaginas[i].clitPierced = this.player.vaginas[i].clitPierced;
                saveFile.data.vaginas[i].clitPShort = this.player.vaginas[i].clitPShort;
                saveFile.data.vaginas[i].clitPLong = this.player.vaginas[i].clitPLong;
            }
            //NIPPLES
            saveFile.data.nippleLength = this.player.nippleLength;
            //Set Breast Array
            for (i = 0; i < this.player.breastRows.length; i++) {
                saveFile.data.breastRows.push([]);
                //trace("Saveone breastRow");
            }
            //Populate Breast Array
            for (i = 0; i < this.player.breastRows.length; i++) {
                //trace("Populate One BRow");
                saveFile.data.breastRows[i].breasts = this.player.breastRows[i].breasts;
                saveFile.data.breastRows[i].breastRating = this.player.breastRows[i].breastRating;
                saveFile.data.breastRows[i].nipplesPerBreast = this.player.breastRows[i].nipplesPerBreast;
                saveFile.data.breastRows[i].lactationMultiplier = this.player.breastRows[i].lactationMultiplier;
                saveFile.data.breastRows[i].milkFullness = this.player.breastRows[i].milkFullness;
                saveFile.data.breastRows[i].fuckable = this.player.breastRows[i].fuckable;
                saveFile.data.breastRows[i].fullness = this.player.breastRows[i].fullness;
            }
            //Set Perk Array
            //Populate Perk Array
            for (i = 0; i < this.player.perks.length; i++) {
                saveFile.data.perks.push([]);
                //trace("Saveone Perk");
                //trace("Populate One Perk");
                saveFile.data.perks[i].id = this.player.perk(i).ptype.id;
                //saveFile.data.perks[i].perkName = player.perk(i).ptype.id; //uncomment for backward compatibility
                saveFile.data.perks[i].value1 = this.player.perk(i).value1;
                saveFile.data.perks[i].value2 = this.player.perk(i).value2;
                saveFile.data.perks[i].value3 = this.player.perk(i).value3;
                saveFile.data.perks[i].value4 = this.player.perk(i).value4;
                //saveFile.data.perks[i].perkDesc = player.perk(i).perkDesc; // uncomment for backward compatibility
            }

            //Set Status Array
            for (i = 0; i < this.player.statusAffects.length; i++) {
                saveFile.data.statusAffects.push([]);
                //trace("Saveone statusAffects");
            }
            //Populate Status Array
            for (i = 0; i < this.player.statusAffects.length; i++) {
                //trace("Populate One statusAffects");
                saveFile.data.statusAffects[i].statusAffectName = this.player.statusAffect(i).stype.id;
                saveFile.data.statusAffects[i].value1 = this.player.statusAffect(i).value1;
                saveFile.data.statusAffects[i].value2 = this.player.statusAffect(i).value2;
                saveFile.data.statusAffects[i].value3 = this.player.statusAffect(i).value3;
                saveFile.data.statusAffects[i].value4 = this.player.statusAffect(i).value4;
            }
            //Set keyItem Array
            for (i = 0; i < this.player.keyItems.length; i++) {
                saveFile.data.keyItems.push([]);
                //trace("Saveone keyItem");
            }
            //Populate keyItem Array
            for (i = 0; i < this.player.keyItems.length; i++) {
                //trace("Populate One keyItemzzzzzz");
                saveFile.data.keyItems[i].keyName = this.player.keyItems[i].keyName;
                saveFile.data.keyItems[i].value1 = this.player.keyItems[i].value1;
                saveFile.data.keyItems[i].value2 = this.player.keyItems[i].value2;
                saveFile.data.keyItems[i].value3 = this.player.keyItems[i].value3;
                saveFile.data.keyItems[i].value4 = this.player.keyItems[i].value4;
            }
            //Set storage slot array
            for (i = 0; i < this.itemStorageGet().length; i++) {
                saveFile.data.itemStorage.push([]);
            }

            //Populate storage slot array
            for (i = 0; i < this.itemStorageGet().length; i++) {
                //saveFile.data.itemStorage[i].shortName = itemStorage[i].itype.id;// For backward compatibility
                saveFile.data.itemStorage[i].id = (this.itemStorageGet()[i].itype == undefined) ? undefined : this.itemStorageGet()[i].itype.id;
                saveFile.data.itemStorage[i].quantity = this.itemStorageGet()[i].quantity;
                saveFile.data.itemStorage[i].unlocked = this.itemStorageGet()[i].unlocked;
            }
            //Set gear slot array
            for (i = 0; i < this.gearStorageGet().length; i++) {
                saveFile.data.gearStorage.push([]);
            }

            //Populate gear slot array
            for (i = 0; i < this.gearStorageGet().length; i++) {
                //saveFile.data.gearStorage[i].shortName = gearStorage[i].itype.id;// uncomment for backward compatibility
                saveFile.data.gearStorage[i].id = (this.gearStorageGet()[i].isEmpty()) ? undefined : this.gearStorageGet()[i].itype.id;
                saveFile.data.gearStorage[i].quantity = this.gearStorageGet()[i].quantity;
                saveFile.data.gearStorage[i].unlocked = this.gearStorageGet()[i].unlocked;
            }
            saveFile.data.ass.push([]);
            saveFile.data.ass.analWetness = this.player.ass.analWetness;
            saveFile.data.ass.analLooseness = this.player.ass.analLooseness;
            saveFile.data.ass.fullness = this.player.ass.fullness;
            //EXPLORED
            saveFile.data.exploredLake = this.player.exploredLake;
            saveFile.data.exploredMountain = this.player.exploredMountain;
            saveFile.data.exploredForest = this.player.exploredForest;
            saveFile.data.exploredDesert = this.player.exploredDesert;
            saveFile.data.explored = this.player.explored;
            saveFile.data.foundForest = this.getGame().foundForest;
            saveFile.data.foundDesert = this.getGame().foundDesert;
            saveFile.data.foundMountain = this.getGame().foundMountain;
            saveFile.data.foundLake = this.getGame().foundLake;
            saveFile.data.gameState = this.gameStateGet();

            //Time and Items
            saveFile.data.hours = this.model.time.hours;
            saveFile.data.days = this.model.time.days;
            saveFile.data.autoSave = this.player.autoSave;

            //PLOTZ
            saveFile.data.whitney = this.getGame().whitney;
            saveFile.data.monk = this.getGame().monk;
            saveFile.data.sand = this.getGame().sand;
            saveFile.data.giacomo = this.getGame().giacomo;
            saveFile.data.beeProgress = 0; //Now saved in a flag. getGame().beeProgress;

            //ITEMZ. Item1s
            saveFile.data.itemSlot1 = [];
            saveFile.data.itemSlot1.quantity = this.player.itemSlot1.quantity;
            saveFile.data.itemSlot1.id = this.player.itemSlot1.itype.id;
            saveFile.data.itemSlot1.unlocked = true;

            saveFile.data.itemSlot2 = [];
            saveFile.data.itemSlot2.quantity = this.player.itemSlot2.quantity;
            saveFile.data.itemSlot2.id = this.player.itemSlot2.itype.id;
            saveFile.data.itemSlot2.unlocked = true;

            saveFile.data.itemSlot3 = [];
            saveFile.data.itemSlot3.quantity = this.player.itemSlot3.quantity;
            saveFile.data.itemSlot3.id = this.player.itemSlot3.itype.id;
            saveFile.data.itemSlot3.unlocked = true;

            saveFile.data.itemSlot4 = [];
            saveFile.data.itemSlot4.quantity = this.player.itemSlot4.quantity;
            saveFile.data.itemSlot4.id = this.player.itemSlot4.itype.id;
            saveFile.data.itemSlot4.unlocked = this.player.itemSlot4.unlocked;

            saveFile.data.itemSlot5 = [];
            saveFile.data.itemSlot5.quantity = this.player.itemSlot5.quantity;
            saveFile.data.itemSlot5.id = this.player.itemSlot5.itype.id;
            saveFile.data.itemSlot5.unlocked = this.player.itemSlot5.unlocked;

            // Keybinds
            saveFile.data.controls = this.getGame().inputManager.SaveBindsToObj();
        }
        catch (error) {
            trace(error.message);

            this.outputText("There was a processing error during saving. Please report the following message:\n\n");
            this.outputText(error.message);
            this.outputText("\n\n");
            this.outputText(error.getStackTrace());
        }


        trace("done saving");
        // Because actionscript is stupid, there is no easy way to block until file operations are done.
        // Therefore, I'm hacking around it for the chaos monkey.
        // Really, something needs to listen for the FileReference.complete event, and re-enable saving/loading then.
        // Something to do in the future
        if (!slot) {
            //outputText(serializeToString(saveFile.data), true);
            saveAs(JSON.stringify(saveFile), 'cocsave');
            this.outputText("Attempted to save to file.", true);
        }
        else {
            // Write the file
            saveFile.flush();

            // Reload it
            saveFile = this.getSaveObj(slot);
            backup = this.getSaveObj(slot + "_backup");
            var numProps: number = 0;

            // Copy the properties over to a new file object
            for (var prop of saveFile.data) {
                numProps++;
                backup.data[prop] = saveFile.data[prop];
            }

            // There should be 124 root properties minimum in the save file. Give some wiggleroom for things that might be omitted? (All of the broken saves I've seen are MUCH shorter than expected)
            if (numProps < this.versionProperties[this.ver]) {
                this.outputText("<b>Aborting save.  Your current save file is broken, and needs to be bug-reported.</b>\n\nWithin the save folder for CoC, there should be a pair of files named \"" + slot + ".sol\" and \"" + slot + "_backup.sol\"\n\n<b>We need BOTH of those files, and a quick report of what you've done in the game between when you last saved, and this message.</b>\n\n", true);
                this.outputText("When you've sent us the files, you can copy the _backup file over your old save to continue from your last save.\n\n");
                this.outputText("Alternatively, you can just hit the restore button to overwrite the broken save with the backup... but we'd really like the saves first!");
                trace("Backup Save Aborted! Broken save detected!");
                backupAborted = true;
            }
            else {
                // Property count is correct, write the backup
                backup.flush();
            }

            if (!backupAborted)
                this.outputText("Saved to slot" + slot + "!", true);
        }

        if (!backupAborted) {
            this.doNext(this.playerMenu);
        }
        else {
            this.menu();
            this.addButton(0, "Next", this.playerMenu);
            this.addButton(9, "Restore", this.restore, slot);
        }

    }

    public restore(slotName: string): void {
        this.clearOutput();
        // copy slot_backup.sol over slot.sol
        var backupFile = this.getSaveObj(slotName + "_backup");
        var overwriteFile = this.getSaveObj(slotName);

        for (var prop of backupFile.data) {
            overwriteFile.data[prop] = backupFile.data[prop];
        }

        overwriteFile.flush();

        this.outputText("Restored backup of " + slotName, true);
        this.menu();
        this.doNext(this.playerMenu);
    }

    public openSave(): void {
        const input = document.createElement('input');
        input.id = 'load';
        input.type = 'file';
        input.accept = '.coc';
        input.style.display = 'none';
        input.addEventListener("change", () => {
            if (!input.files || input.files.length === 0) {
                alert("Error in file loading");
            }
            else {
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
                if (!fileReader) throw new Error('FileReader disappeared');
                if (typeof fileReader.result !== 'string') throw new Error('File read result not a string');
                obj = JSON.parse(fileReader.result);
            }
            catch (e) {
                this.outputText("<b>!</b> Save file not found, check that it is in the same directory as the CoC.swf file.\n\nLoad from file is not available when playing directly from a website like furaffinity or fenoxo.com.", true);
            }
            if (obj) {
                this.onDataLoaded(obj);
            }
        });
        fileReader.addEventListener("error", this.ioErrorHandler);
    }

    public ioErrorHandler(): void {
        this.outputText("<b>!</b> Save file not found, check that it is in the same directory as the CoC_" + this.ver + ".swf file.\r\rLoad from file is not available when playing directly from a website like furaffinity or fenoxo.com.", true);
        this.doNext(this.saveLoad);
    }

    public onDataLoaded(saveObj: any): void {
        //var fileObj = readObjectFromStringBytes(loader.data);
        try {
            // I want to be able to write some debug stuff to the GUI during the loading process
            // Therefore, we clear the display *before* calling loadGameObject
            this.outputText("Loading save...", true);
            // trace("OnDataLoaded! - Reading data", this.loader, this.loader.data.readObject);
            // var tmpObj: Record<string, any> = this.loader.data.readObject();
            trace("Read in object = ", saveObj);

            this.loadGameObject(saveObj);
            this.outputText("Loaded Save");
        }
        catch (rangeError) {
            this.outputText("<b>!</b> File is either corrupted or not a valid save", true);
            this.doNext(this.saveLoad);
        }
        // catch (error: Error) {
        //         outputText("<b>!</b> Unhandled Exception", true);
        //         outputText("[pg]Failed to load save. The file may be corrupt!");

        //         doNext(returnToSaveMenu);
        //     }
        this.statScreenRefresh();
        //eventParser(1);
    }

    public loadGameObject(saveData: Record<string, any>, slot: string = "VOID"): void {
        var game: CoC = this.getGame();
        game.dungeonLoc = 0;
        //Not needed, dungeonLoc = 0 does this:	game.inDungeon = false;
        game.inRoomedDungeon = false;
        game.inRoomedDungeonResume = undefined;

        //Autosave stuff
        this.player.slotName = slot;

        // var counter: number = this.player.cocks.length;
        trace("Loading save!")
        //Initialize the save file
        //var saveFile: Record<string, any> = loader.data.readObject();
        var saveFile: any = saveData;
        if (saveFile.data.exists) {

            //KILL ALL COCKS;
            this.player = new Player();
            this.flags = {} as Flags;
            this.model.player = this.player;

            //trace("Type of saveFile.data = ", getClass(saveFile.data));

            this.inventory.clearStorage();
            this.inventory.clearGearStorage();
            this.player.short = saveFile.data.short;
            this.player.a = saveFile.data.a;
            game.notes = saveFile.data.notes;

            //flags

            for (var i of Object.keys(this.flags).map((key) => parseInt(key)).filter((key) => !isNaN(key))) {
                if (saveFile.data.flags[i] != undefined)
                    this.flags[i] = saveFile.data.flags[i];
            }

            //PIERCINGS

            //trace("LOADING PIERCINGS");
            this.player.nipplesPierced = saveFile.data.nipplesPierced;
            this.player.nipplesPShort = saveFile.data.nipplesPShort;
            this.player.nipplesPLong = saveFile.data.nipplesPLong;
            this.player.lipPierced = saveFile.data.lipPierced;
            this.player.lipPShort = saveFile.data.lipPShort;
            this.player.lipPLong = saveFile.data.lipPLong;
            this.player.tonguePierced = saveFile.data.tonguePierced;
            this.player.tonguePShort = saveFile.data.tonguePShort;
            this.player.tonguePLong = saveFile.data.tonguePLong;
            this.player.eyebrowPierced = saveFile.data.eyebrowPierced;
            this.player.eyebrowPShort = saveFile.data.eyebrowPShort;
            this.player.eyebrowPLong = saveFile.data.eyebrowPLong;
            this.player.earsPierced = saveFile.data.earsPierced;
            this.player.earsPShort = saveFile.data.earsPShort;
            this.player.earsPLong = saveFile.data.earsPLong;
            this.player.nosePierced = saveFile.data.nosePierced;
            this.player.nosePShort = saveFile.data.nosePShort;
            this.player.nosePLong = saveFile.data.nosePLong;

            //MAIN STATS
            this.player.str = saveFile.data.str;
            this.player.tou = saveFile.data.tou;
            this.player.spe = saveFile.data.spe;
            this.player.inte = saveFile.data.inte;
            this.player.lib = saveFile.data.lib;
            this.player.sens = saveFile.data.sens;
            this.player.cor = saveFile.data.cor;
            this.player.fatigue = saveFile.data.fatigue;

            //CLOTHING/ARMOR
            var found: boolean = false;
            if (saveFile.data.weaponId) {
                this.player.setWeaponHiddenField((ItemType.lookupItem(saveFile.data.weaponId) as Weapon) || WeaponLib.FISTS);
            } else {
                this.player.setWeapon(WeaponLib.FISTS);
                //player.weapon = WeaponLib.FISTS;
                const itemLib = ItemType.getItemLibrary();
                for (var itype of Object.keys(itemLib)) {
                    if (itemLib[itype] instanceof Weapon && (itemLib[itype] as Weapon).name == saveFile.data.weaponName) {
                        this.player.setWeaponHiddenField(itemLib[itype] as Weapon || WeaponLib.FISTS);
                        found = true;
                        break;
                    }
                }
            }
            if (saveFile.data.armorId) {
                this.player.setArmorHiddenField((ItemType.lookupItem(saveFile.data.armorId) as Armor) || ArmorLib.COMFORTABLE_UNDERCLOTHES);
                if (this.player.armor.name != saveFile.data.armorName) this.player.modArmorName = saveFile.data.armorName;
            } else {
                found = false;
                this.player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES);
                //player.armor = ArmorLib.COMFORTABLE_UNDERCLOTHES;
                const itemLib = ItemType.getItemLibrary();
                for (itype of Object.keys(itemLib)) {
                    if (itemLib[itype] instanceof Armor && (itemLib[itype] as Armor).name == saveFile.data.armorName) {
                        this.player.setArmorHiddenField(itemLib[itype] as Armor || ArmorLib.COMFORTABLE_UNDERCLOTHES);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    const itemLib = ItemType.getItemLibrary();
                    for (itype of Object.keys(itemLib)) {
                        if (itemLib[itype] instanceof Armor) {
                            var a: Armor = itemLib[itype] as Armor;
                            if (a.value == saveFile.data.armorValue &&
                                a.def == saveFile.data.armorDef &&
                                a.perk == saveFile.data.armorPerk) {
                                this.player.setArmor(a);
                                //player.armor = a;
                                this.player.modArmorName = saveFile.data.armorName;
                                found = true;
                                break;
                            }
                        }
                    }
                }
            }

            //Combat STATS
            this.player.HP = saveFile.data.HP;
            this.player.lust = saveFile.data.lust;
            if (saveFile.data.teaseXP == undefined)
                this.player.teaseXP = 0;
            else
                this.player.teaseXP = saveFile.data.teaseXP;
            if (saveFile.data.teaseLevel == undefined)
                this.player.teaseLevel = 0;
            else
                this.player.teaseLevel = saveFile.data.teaseLevel;

            //LEVEL STATS
            this.player.XP = saveFile.data.XP;
            this.player.level = saveFile.data.level;
            this.player.gems = saveFile.data.gems;
            if (saveFile.data.perkPoints == undefined)
                this.player.perkPoints = 0;
            else
                this.player.perkPoints = saveFile.data.perkPoints;

            //Appearance
            this.player.gender = saveFile.data.gender;
            if (saveFile.data.femininity == undefined)
                this.player.femininity = 50;
            else
                this.player.femininity = saveFile.data.femininity;
            //EYES
            if (saveFile.data.eyeType == undefined)
                this.player.eyeType = EYES_HUMAN;
            else
                this.player.eyeType = saveFile.data.eyeType;
            //BEARS
            if (saveFile.data.beardLength == undefined)
                this.player.beardLength = 0;
            else
                this.player.beardLength = saveFile.data.beardLength;
            if (saveFile.data.beardStyle == undefined)
                this.player.beardStyle = 0;
            else
                this.player.beardStyle = saveFile.data.beardStyle;
            //BODY STYLE
            if (saveFile.data.tone == undefined)
                this.player.tone = 50;
            else
                this.player.tone = saveFile.data.tone;
            if (saveFile.data.thickness == undefined)
                this.player.thickness = 50;
            else
                this.player.thickness = saveFile.data.thickness;

            this.player.tallness = saveFile.data.tallness;
            this.player.hairColor = saveFile.data.hairColor;
            if (saveFile.data.hairType == undefined)
                this.player.hairType = 0;
            else
                this.player.hairType = saveFile.data.hairType;
            if (saveFile.data.gills == undefined)
                this.player.gills = false;
            else
                this.player.gills = saveFile.data.gills;
            if (saveFile.data.armType == undefined)
                this.player.armType = ARM_TYPE_HUMAN;
            else
                this.player.armType = saveFile.data.armType;
            this.player.hairLength = saveFile.data.hairLength;
            this.player.skinType = saveFile.data.skinType;
            if (saveFile.data.skinAdj == undefined)
                this.player.skinAdj = "";
            else
                this.player.skinAdj = saveFile.data.skinAdj;
            this.player.skinTone = saveFile.data.skinTone;
            this.player.skinDesc = saveFile.data.skinDesc;
            //Convert from old skinDesc to new skinAdj + skinDesc!
            if (this.player.skinDesc.indexOf("smooth") != -1) {
                this.player.skinAdj = "smooth";
                if (this.player.skinType == SKIN_TYPE_PLAIN)
                    this.player.skinDesc = "skin";
                if (this.player.skinType == SKIN_TYPE_FUR)
                    this.player.skinDesc = "fur";
                if (this.player.skinType == SKIN_TYPE_SCALES)
                    this.player.skinDesc = "scales";
                if (this.player.skinType == SKIN_TYPE_GOO)
                    this.player.skinDesc = "goo";
            }
            if (this.player.skinDesc.indexOf("thick") != -1) {
                this.player.skinAdj = "thick";
                if (this.player.skinType == SKIN_TYPE_PLAIN)
                    this.player.skinDesc = "skin";
                if (this.player.skinType == SKIN_TYPE_FUR)
                    this.player.skinDesc = "fur";
                if (this.player.skinType == SKIN_TYPE_SCALES)
                    this.player.skinDesc = "scales";
                if (this.player.skinType == SKIN_TYPE_GOO)
                    this.player.skinDesc = "goo";
            }
            if (this.player.skinDesc.indexOf("rubber") != -1) {
                this.player.skinAdj = "rubber";
                if (this.player.skinType == SKIN_TYPE_PLAIN)
                    this.player.skinDesc = "skin";
                if (this.player.skinType == SKIN_TYPE_FUR)
                    this.player.skinDesc = "fur";
                if (this.player.skinType == SKIN_TYPE_SCALES)
                    this.player.skinDesc = "scales";
                if (this.player.skinType == SKIN_TYPE_GOO)
                    this.player.skinDesc = "goo";
            }
            if (this.player.skinDesc.indexOf("latex") != -1) {
                this.player.skinAdj = "latex";
                if (this.player.skinType == SKIN_TYPE_PLAIN)
                    this.player.skinDesc = "skin";
                if (this.player.skinType == SKIN_TYPE_FUR)
                    this.player.skinDesc = "fur";
                if (this.player.skinType == SKIN_TYPE_SCALES)
                    this.player.skinDesc = "scales";
                if (this.player.skinType == SKIN_TYPE_GOO)
                    this.player.skinDesc = "goo";
            }
            if (this.player.skinDesc.indexOf("slimey") != -1) {
                this.player.skinAdj = "slimey";
                if (this.player.skinType == SKIN_TYPE_PLAIN)
                    this.player.skinDesc = "skin";
                if (this.player.skinType == SKIN_TYPE_FUR)
                    this.player.skinDesc = "fur";
                if (this.player.skinType == SKIN_TYPE_SCALES)
                    this.player.skinDesc = "scales";
                if (this.player.skinType == SKIN_TYPE_GOO)
                    this.player.skinDesc = "goo";
            }
            this.player.faceType = saveFile.data.faceType;
            if (saveFile.data.tongueType == undefined)
                this.player.tongueType = TONUGE_HUMAN;
            else
                this.player.tongueType = saveFile.data.tongueType;
            if (saveFile.data.earType == undefined)
                this.player.earType = EARS_HUMAN;
            else
                this.player.earType = saveFile.data.earType;
            if (saveFile.data.earValue == undefined)
                this.player.earValue = 0;
            else
                this.player.earValue = saveFile.data.earValue;
            if (saveFile.data.antennae == undefined)
                this.player.antennae = ANTENNAE_NONE;
            else
                this.player.antennae = saveFile.data.antennae;
            this.player.horns = saveFile.data.horns;
            if (saveFile.data.hornType == undefined)
                this.player.hornType = HORNS_NONE;
            else
                this.player.hornType = saveFile.data.hornType;
            this.player.wingDesc = saveFile.data.wingDesc;
            this.player.wingType = saveFile.data.wingType;
            this.player.lowerBody = saveFile.data.lowerBody;
            this.player.tailType = saveFile.data.tailType;
            this.player.tailVenom = saveFile.data.tailVenum;
            this.player.tailRecharge = saveFile.data.tailRecharge;
            this.player.hipRating = saveFile.data.hipRating;
            this.player.buttRating = saveFile.data.buttRating;

            //Sexual Stuff
            this.player.balls = saveFile.data.balls;
            this.player.cumMultiplier = saveFile.data.cumMultiplier;
            this.player.ballSize = saveFile.data.ballSize;
            this.player.hoursSinceCum = saveFile.data.hoursSinceCum;
            this.player.fertility = saveFile.data.fertility;
            this.player.clitLength = saveFile.data.clitLength;

            //Preggo stuff
            this.player.knockUpForce(saveFile.data.pregnancyType, saveFile.data.pregnancyIncubation);
            this.player.buttKnockUpForce(saveFile.data.buttPregnancyType, saveFile.data.buttPregnancyIncubation);

            var hasViridianCockSock: boolean = false;

            //ARRAYS HERE!
            //Set Cock array
            for (i = 0; i < saveFile.data.cocks.length; i++) {
                this.player.createCock();
            }
            //Populate Cock Array
            for (i = 0; i < saveFile.data.cocks.length; i++) {
                this.player.cocks[i].cockThickness = saveFile.data.cocks[i].cockThickness;
                this.player.cocks[i].cockLength = saveFile.data.cocks[i].cockLength;
                this.player.cocks[i].cockType = CockTypesEnum[saveFile.data.cocks[i].cockType];
                this.player.cocks[i].knotMultiplier = saveFile.data.cocks[i].knotMultiplier;
                if (saveFile.data.cocks[i].sock == undefined)
                    this.player.cocks[i].sock = "";
                else {
                    this.player.cocks[i].sock = saveFile.data.cocks[i].sock;
                    if (this.player.cocks[i].sock == "viridian") hasViridianCockSock = true;
                }
                if (saveFile.data.cocks[i].pierced == undefined) {
                    this.player.cocks[i].pierced = 0;
                    this.player.cocks[i].pShortDesc = "";
                    this.player.cocks[i].pLongDesc = "";
                }
                else {
                    this.player.cocks[i].pierced = saveFile.data.cocks[i].pierced;
                    this.player.cocks[i].pShortDesc = saveFile.data.cocks[i].pShortDesc;
                    this.player.cocks[i].pLongDesc = saveFile.data.cocks[i].pLongDesc;

                    if (this.player.cocks[i].pShortDesc == "undefined" || this.player.cocks[i].pLongDesc == "undefined") {
                        this.player.cocks[i].pierced = 0;
                        this.player.cocks[i].pShortDesc = "";
                        this.player.cocks[i].pLongDesc = "";
                    }
                }
                //trace("LoadOne Cock i(" + i + ")");
            }
            //Set Vaginal Array
            for (i = 0; i < saveFile.data.vaginas.length; i++) {
                this.player.createVagina();
            }
            //Populate Vaginal Array
            for (i = 0; i < saveFile.data.vaginas.length; i++) {
                this.player.vaginas[i].vaginalWetness = saveFile.data.vaginas[i].vaginalWetness;
                this.player.vaginas[i].vaginalLooseness = saveFile.data.vaginas[i].vaginalLooseness;
                this.player.vaginas[i].fullness = saveFile.data.vaginas[i].fullness;
                this.player.vaginas[i].virgin = saveFile.data.vaginas[i].virgin;
                if (saveFile.data.vaginas[i].type == undefined) this.player.vaginas[i].type = 0;
                else this.player.vaginas[i].type = saveFile.data.vaginas[i].type;
                if (saveFile.data.vaginas[i].labiaPierced == undefined) {
                    this.player.vaginas[i].labiaPierced = 0;
                    this.player.vaginas[i].labiaPShort = "";
                    this.player.vaginas[i].labiaPLong = "";
                    this.player.vaginas[i].clitPierced = 0;
                    this.player.vaginas[i].clitPShort = "";
                    this.player.vaginas[i].clitPLong = "";
                }
                else {
                    this.player.vaginas[i].labiaPierced = saveFile.data.vaginas[i].labiaPierced;
                    this.player.vaginas[i].labiaPShort = saveFile.data.vaginas[i].labiaPShort;
                    this.player.vaginas[i].labiaPLong = saveFile.data.vaginas[i].labiaPLong;
                    this.player.vaginas[i].clitPierced = saveFile.data.vaginas[i].clitPierced;
                    this.player.vaginas[i].clitPShort = saveFile.data.vaginas[i].clitPShort;
                    this.player.vaginas[i].clitPLong = saveFile.data.vaginas[i].clitPLong;
                }
                //trace("LoadOne Vagina i(" + i + ")");
            }
            //NIPPLES
            if (saveFile.data.nippleLength == undefined)
                this.player.nippleLength = .25;
            else
                this.player.nippleLength = saveFile.data.nippleLength;
            //Set Breast Array
            for (i = 0; i < saveFile.data.breastRows.length; i++) {
                this.player.createBreastRow();
                //trace("LoadOne BreastROw i(" + i + ")");
            }
            //Populate Breast Array
            for (i = 0; i < saveFile.data.breastRows.length; i++) {
                this.player.breastRows[i].breasts = saveFile.data.breastRows[i].breasts;
                this.player.breastRows[i].nipplesPerBreast = saveFile.data.breastRows[i].nipplesPerBreast;
                //Fix nipplesless breasts bug
                if (this.player.breastRows[i].nipplesPerBreast == 0)
                    this.player.breastRows[i].nipplesPerBreast = 1;
                this.player.breastRows[i].breastRating = saveFile.data.breastRows[i].breastRating;
                this.player.breastRows[i].lactationMultiplier = saveFile.data.breastRows[i].lactationMultiplier;
                if (this.player.breastRows[i].lactationMultiplier < 0)
                    this.player.breastRows[i].lactationMultiplier = 0;
                this.player.breastRows[i].milkFullness = saveFile.data.breastRows[i].milkFullness;
                this.player.breastRows[i].fuckable = saveFile.data.breastRows[i].fuckable;
                this.player.breastRows[i].fullness = saveFile.data.breastRows[i].fullness;
                if (this.player.breastRows[i].breastRating < 0)
                    this.player.breastRows[i].breastRating = 0;
            }

            // Force the creation of the default breast row onto the player if it's no longer present
            if (this.player.breastRows.length == 0) this.player.createBreastRow();

            var hasHistoryPerk: boolean = false;
            var hasLustyRegenPerk: boolean = false;
            // var addedSensualLover: boolean = false;

            //Populate Perk Array
            for (i = 0; i < saveFile.data.perks.length; i++) {
                var id: string = saveFile.data.perks[i].id || saveFile.data.perks[i].perkName;
                var value1: number = saveFile.data.perks[i].value1;
                var value2: number = saveFile.data.perks[i].value2;
                var value3: number = saveFile.data.perks[i].value3;
                var value4: number = saveFile.data.perks[i].value4;

                // Fix saves where the Whore perk might have been malformed.
                if (id == "History: Whote") id = "History: Whore";

                // Fix saves where the Lusty Regeneration perk might have been malformed.
                if (id == "Lusty Regeneration") {
                    hasLustyRegenPerk = true;
                }
                else if (id == "LustyRegeneration") {
                    id = "Lusty Regeneration";
                    hasLustyRegenPerk = true;
                }

                // Some shit checking to track if the incoming data has an available History perk
                if (id.indexOf("History:") != -1) {
                    hasHistoryPerk = true;
                }

                var ptype: PerkType = PerkType.lookupPerk(id);

                if (ptype == undefined) {
                    trace("ERROR: Unknown perk id=" + id);

                    //(saveFile.data.perks as Array).splice(i,1);
                    // NEVER EVER EVER MODIFY DATA IN THE SAVE FILE LIKE THIS. EVER. FOR ANY REASON.
                }
                else {
                    trace("Creating perk : " + ptype);
                    this.player.createPerk(ptype, value1, value2, value3, value4);

                    if (isNaN(this.player.perk(this.player.numPerks - 1).value1)) {
                        if (this.player.perk(this.player.numPerks - 1).perkName == "Wizard's Focus") {
                            this.player.perk(this.player.numPerks - 1).value1 = .3;
                        }
                        else {
                            this.player.perk(this.player.numPerks).value1 = 0;
                        }

                        trace("NaN byaaaatch: " + this.player.perk(this.player.numPerks - 1).value1);
                    }

                    if (this.player.perk(this.player.numPerks - 1).perkName == "Wizard's Focus") {
                        if (this.player.perk(this.player.numPerks - 1).value1 == 0 || this.player.perk(this.player.numPerks - 1).value1 < 0.1) {
                            trace("Wizard's Focus boosted up to par (.5)");
                            this.player.perk(this.player.numPerks - 1).value1 = .5;
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
                if (typeof this.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK] == 'string' && (this.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK] as String).indexOf("lower back.lower back") != -1) {
                    this.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK] = (this.flags[kFLAGS.VAPULA_TATTOO_LOWERBACK] as String).split(".")[0] + ".";
                }


                var refunds: number = 0;

                if (typeof this.flags[kFLAGS.JOJO_TATTOO_LOWERBACK] == 'string') {
                    refunds++;
                    this.flags[kFLAGS.JOJO_TATTOO_LOWERBACK] = '';
                }

                if (typeof this.flags[kFLAGS.JOJO_TATTOO_BUTT] == 'string') {
                    refunds++;
                    this.flags[kFLAGS.JOJO_TATTOO_BUTT] = '';
                }

                if (typeof this.flags[kFLAGS.JOJO_TATTOO_COLLARBONE] == 'string') {
                    refunds++;
                    this.flags[kFLAGS.JOJO_TATTOO_COLLARBONE] = '';
                }

                if (typeof this.flags[kFLAGS.JOJO_TATTOO_SHOULDERS] == 'string') {
                    refunds++;
                    this.flags[kFLAGS.JOJO_TATTOO_SHOULDERS] = '';
                }

                this.player.gems += 50 * refunds;
                this.flags[kFLAGS.TATTOO_SAVEFIX_APPLIED] = 1;
            }

            if (this.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] == 1) {
                this.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] = 0;
                trace("Force-reverting Marble At Farm flag to 0.");
            }

            //Set Status Array
            for (i = 0; i < saveFile.data.statusAffects.length; i++) {
                if (saveFile.data.statusAffects[i].statusAffectName == "Lactation EnNumbere") continue; // ugh...
                var stype: StatusAffectType = StatusAffectType.lookupStatusAffect(saveFile.data.statusAffects[i].statusAffectName);
                if (stype == undefined) {
                    CoC_Settings.error("Cannot find status affect '" + saveFile.data.statusAffects[i].statusAffectName + "'");
                    continue;
                }
                this.player.createStatusAffect(stype,
                    saveFile.data.statusAffects[i].value1,
                    saveFile.data.statusAffects[i].value2,
                    saveFile.data.statusAffects[i].value3,
                    saveFile.data.statusAffects[i].value4);
                //trace("StatusAffect " + player.statusAffect(i).stype.id + " loaded.");
            }
            //Make sure keyitems exist!
            if (saveFile.data.keyItems != undefined) {
                //Set keyItems Array
                for (i = 0; i < saveFile.data.keyItems.length; i++) {
                    this.player.createKeyItem("TEMP", 0, 0, 0, 0);
                }
                //Populate keyItems Array
                for (i = 0; i < saveFile.data.keyItems.length; i++) {
                    this.player.keyItems[i].keyName = saveFile.data.keyItems[i].keyName;
                    this.player.keyItems[i].value1 = saveFile.data.keyItems[i].value1;
                    this.player.keyItems[i].value2 = saveFile.data.keyItems[i].value2;
                    this.player.keyItems[i].value3 = saveFile.data.keyItems[i].value3;
                    this.player.keyItems[i].value4 = saveFile.data.keyItems[i].value4;
                    //trace("KeyItem " + player.keyItems[i].keyName + " loaded.");
                }
            }
            //Set storage slot array
            if (saveFile.data.itemStorage == undefined) {
                //trace("OLD SAVES DO NOT CONTAIN ITEM STORAGE ARRAY");
            }
            else {
                //Populate storage slot array
                for (i = 0; i < saveFile.data.itemStorage.length; i++) {
                    //trace("Populating a storage slot save with data");
                    this.inventory.createStorage();
                    var storage: ItemSlotClass = this.itemStorageGet()[i];
                    var savedIS: any = saveFile.data.itemStorage[i];
                    if (savedIS.shortName) {
                        if (savedIS.shortName.indexOf("Gro+") != -1)
                            savedIS.id = "GroPlus";
                        else if (savedIS.shortName.indexOf("Sp Honey") != -1)
                            savedIS.id = "SpHoney";
                    }
                    if (savedIS.quantity > 0)
                        storage.setItemAndQty(ItemType.lookupItem(savedIS.id || savedIS.shortName), savedIS.quantity);
                    else
                        storage.emptySlot();
                    storage.unlocked = savedIS.unlocked;
                }
            }
            //Set gear slot array
            if (saveFile.data.gearStorage == undefined || saveFile.data.gearStorage.length < 18) {
                //trace("OLD SAVES DO NOT CONTAIN ITEM STORAGE ARRAY - Creating new!");
                this.inventory.initializeGearStorage();
            }
            else {
                for (i = 0; i < saveFile.data.gearStorage.length && this.gearStorageGet().length < 20; i++) {
                    this.gearStorageGet().push(new ItemSlotClass());
                    //trace("Initialize a slot for one of the item storage locations to load.");
                }
                //Populate storage slot array
                for (i = 0; i < saveFile.data.gearStorage.length && i < this.gearStorageGet().length; i++) {
                    //trace("Populating a storage slot save with data");
                    storage = this.gearStorageGet()[i];
                    if ((saveFile.data.gearStorage[i].shortName == undefined && saveFile.data.gearStorage[i].id == undefined)
                        || saveFile.data.gearStorage[i].quantity == undefined
                        || saveFile.data.gearStorage[i].quantity == 0)
                        storage.emptySlot();
                    else
                        storage.setItemAndQty(ItemType.lookupItem(saveFile.data.gearStorage[i].id || saveFile.data.gearStorage[i].shortName), saveFile.data.gearStorage[i].quantity);
                    storage.unlocked = saveFile.data.gearStorage[i].unlocked;
                }
            }
            //player.cocks = saveFile.data.cocks;
            this.player.ass.analLooseness = saveFile.data.ass.analLooseness;
            this.player.ass.analWetness = saveFile.data.ass.analWetness;
            this.player.ass.fullness = saveFile.data.ass.fullness;

            //Shit
            this.gameStateSet(saveFile.data.gameState);
            this.player.exploredLake = saveFile.data.exploredLake;
            this.player.exploredMountain = saveFile.data.exploredMountain;
            this.player.exploredForest = saveFile.data.exploredForest;
            this.player.exploredDesert = saveFile.data.exploredDesert;
            this.player.explored = saveFile.data.explored;
            game.foundForest = saveFile.data.foundForest;
            game.foundDesert = saveFile.data.foundDesert;
            game.foundMountain = saveFile.data.foundMountain;
            game.foundLake = saveFile.data.foundLake;

            //Days
            //Time and Items
            this.model.time.hours = saveFile.data.hours;
            this.model.time.days = saveFile.data.days;
            if (saveFile.data.autoSave == undefined)
                this.player.autoSave = false;
            else
                this.player.autoSave = saveFile.data.autoSave;

            //PLOTZ
            game.whitney = saveFile.data.whitney;
            game.monk = saveFile.data.monk;
            game.sand = saveFile.data.sand;
            if (saveFile.data.giacomo == undefined)
                game.giacomo = 0;
            else
                game.giacomo = saveFile.data.giacomo;
            if (saveFile.data.beeProgress != undefined && saveFile.data.beeProgress == 1) game.forest.beeGirlScene.setTalked(); //Bee Progress update is now in a flag
            //The flag will be zero for any older save that still uses beeProgress and newer saves always store a zero in beeProgress, so we only need to update the flag on a value of one.

            //ITEMZ. Item1
            if (saveFile.data.itemSlot1.shortName) {
                if (saveFile.data.itemSlot1.shortName.indexOf("Gro+") != -1)
                    saveFile.data.itemSlot1.id = "GroPlus";
                else if (saveFile.data.itemSlot1.shortName.indexOf("Sp Honey") != -1)
                    saveFile.data.itemSlot1.id = "SpHoney";
            }
            if (saveFile.data.itemSlot2.shortName) {
                if (saveFile.data.itemSlot2.shortName.indexOf("Gro+") != -1)
                    saveFile.data.itemSlot2.id = "GroPlus";
                else if (saveFile.data.itemSlot2.shortName.indexOf("Sp Honey") != -1)
                    saveFile.data.itemSlot2.id = "SpHoney";
            }
            if (saveFile.data.itemSlot3.shortName) {
                if (saveFile.data.itemSlot3.shortName.indexOf("Gro+") != -1)
                    saveFile.data.itemSlot3.id = "GroPlus";
                else if (saveFile.data.itemSlot3.shortName.indexOf("Sp Honey") != -1)
                    saveFile.data.itemSlot3.id = "SpHoney";
            }
            if (saveFile.data.itemSlot4.shortName) {
                if (saveFile.data.itemSlot4.shortName.indexOf("Gro+") != -1)
                    saveFile.data.itemSlot4.id = "GroPlus";
                else if (saveFile.data.itemSlot4.shortName.indexOf("Sp Honey") != -1)
                    saveFile.data.itemSlot4.id = "SpHoney";
            }
            if (saveFile.data.itemSlot5.shortName) {
                if (saveFile.data.itemSlot5.shortName.indexOf("Gro+") != -1)
                    saveFile.data.itemSlot5.id = "GroPlus";
                else if (saveFile.data.itemSlot5.shortName.indexOf("Sp Honey") != -1)
                    saveFile.data.itemSlot5.id = "SpHoney";
            }


            this.player.itemSlot1.unlocked = true;
            this.player.itemSlot1.setItemAndQty(ItemType.lookupItem(
                saveFile.data.itemSlot1.id || saveFile.data.itemSlot1.shortName),
                saveFile.data.itemSlot1.quantity);
            this.player.itemSlot2.unlocked = true;
            this.player.itemSlot2.setItemAndQty(ItemType.lookupItem(
                saveFile.data.itemSlot2.id || saveFile.data.itemSlot2.shortName),
                saveFile.data.itemSlot2.quantity);
            this.player.itemSlot3.unlocked = true;
            this.player.itemSlot3.setItemAndQty(ItemType.lookupItem(
                saveFile.data.itemSlot3.id || saveFile.data.itemSlot3.shortName),
                saveFile.data.itemSlot3.quantity);
            this.player.itemSlot4.unlocked = saveFile.data.itemSlot4.unlocked;
            this.player.itemSlot4.setItemAndQty(ItemType.lookupItem(
                saveFile.data.itemSlot4.id || saveFile.data.itemSlot4.shortName),
                saveFile.data.itemSlot4.quantity);
            this.player.itemSlot5.unlocked = saveFile.data.itemSlot5.unlocked;
            this.player.itemSlot5.setItemAndQty(ItemType.lookupItem(
                saveFile.data.itemSlot5.id || saveFile.data.itemSlot5.shortName),
                saveFile.data.itemSlot5.quantity);

            CoC.loadAllAwareClasses(this.getGame()); //Informs each saveAwareClass that it must load its values from the flags array
            this.unFuckSave();

            // Control Bindings
            if (saveFile.data.controls != undefined) {
                game.inputManager.LoadBindsFromObj(saveFile.data.controls);
            }
            this.doNext(this.playerMenu);
        }
    }

    public unFuckSave(): void {
        //Fixing shit!

        // Fix duplicate elven bounty perks
        if (this.player.findPerk(PerkLib.ElvenBounty) >= 0) {
            //CLear duplicates
            while (this.player.perkDuplicated(PerkLib.ElvenBounty)) this.player.removePerk(PerkLib.ElvenBounty);
            //Fix fudged preggers value
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

        if (this.player.findStatusAffect(StatusAffects.SlimeCraving) >= 0 && this.player.statusAffectv4(StatusAffects.SlimeCraving) == 1) {
            this.player.changeStatusValue(StatusAffects.SlimeCraving, 3, this.player.statusAffectv2(StatusAffects.SlimeCraving)); //Duplicate old combined strength/speed value
            this.player.changeStatusValue(StatusAffects.SlimeCraving, 4, 1); //Value four indicates this tracks strength and speed separately
        }

        // Fix issues with corrupt cockTypes caused by a error in the serialization code.

        //trace("CockInfo = ", flags[kFLAGS.RUBI_COCK_TYPE]);
        //trace("getQualifiedClassName = ", getQualifiedClassName(flags[kFLAGS.RUBI_COCK_TYPE]));
        //trace("typeof = ", typeof(flags[kFLAGS.RUBI_COCK_TYPE]));
        //trace("is CockTypesEnum = ", flags[kFLAGS.RUBI_COCK_TYPE] is CockTypesEnum);
        //trace("instanceof CockTypesEnum = ", flags[kFLAGS.RUBI_COCK_TYPE] instanceof CockTypesEnum);



        if (!(CockTypesEnum[this.flags[kFLAGS.RUBI_COCK_TYPE]] || typeof this.flags[kFLAGS.RUBI_COCK_TYPE] == 'number')) { // Valid contents of flags[kFLAGS.RUBI_COCK_TYPE] are either a CockTypesEnum or a number

            trace("Fixing save (goo girl)");
            this.outputText("\n<b>Rubi's cockType is invalid. Defaulting him to human.</b>\n");
            this.flags[kFLAGS.RUBI_COCK_TYPE] = 0;
        }


        if (!(CockTypesEnum[this.flags[kFLAGS.GOO_DICK_TYPE]] || typeof this.flags[kFLAGS.GOO_DICK_TYPE] == 'number')) { // Valid contents of flags[kFLAGS.GOO_DICK_TYPE] are either a CockTypesEnum or a number

            trace("Fixing save (goo girl)");
            this.outputText("\n<b>Latex Goo-Girls's cockType is invalid. Defaulting him to human.</b>\n");
            this.flags[kFLAGS.GOO_DICK_TYPE] = 0;
        }

        var flagData: any[] = String(this.flags[kFLAGS.KATHERINE_BREAST_SIZE]).split("^");
        if (flagData.length < 7 && this.flags[kFLAGS.KATHERINE_BREAST_SIZE] > 0) { //Older format only stored breast size or zero if not yet initialized
            this.getGame().telAdre.katherine.breasts.cupSize = this.flags[kFLAGS.KATHERINE_BREAST_SIZE];
            this.getGame().telAdre.katherine.breasts.lactationLevel = BreastStore.LACTATION_DISABLED;
        }

        if (this.flags[kFLAGS.SAVE_FILE_INTEGER_FORMAT_VERSION] < 816) {
            //Older saves don't have pregnancy types for all impregnable NPCs. Have to correct this.
            //If anything is detected that proves this is a new format save then we can return immediately as all further checks are redundant.
            if (this.flags[kFLAGS.AMILY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.AMILY_PREGNANCY_TYPE] != 0) return; //Must be a new format save
                this.flags[kFLAGS.AMILY_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }
            if (this.flags[kFLAGS.AMILY_OVIPOSITED_COUNTDOWN] > 0) {
                if (this.flags[kFLAGS.AMILY_BUTT_PREGNANCY_TYPE] != 0) return; //Must be a new format save
                if (this.player.findPerk(PerkLib.SpiderOvipositor) >= 0)
                    this.flags[kFLAGS.AMILY_BUTT_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_DRIDER_EGGS;
                else
                    this.flags[kFLAGS.AMILY_BUTT_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_BEE_EGGS;
            }

            if (this.flags[kFLAGS.COTTON_PREGNANCY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.COTTON_PREGNANCY_TYPE] != 0) return; //Must be a new format save
                this.flags[kFLAGS.COTTON_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.EMBER_INCUBATION] > 0) {
                if (this.flags[kFLAGS.EMBER_PREGNANCY_TYPE] != 0) return; //Must be a new format save
                this.flags[kFLAGS.EMBER_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.FEMALE_SPIDERMORPH_PREGNANCY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.FEMALE_SPIDERMORPH_PREGNANCY_TYPE] != 0) return; //Must be a new format save
                this.flags[kFLAGS.FEMALE_SPIDERMORPH_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.HELSPAWN_AGE] > 0) {
                kGAMECLASS.helScene.pregnancy.knockUpForce(); //Clear Pregnancy, also removed any old value from HEL_PREGNANCY_NOTICES
            }
            else if (this.flags[kFLAGS.HEL_PREGNANCY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.HELIA_PREGNANCY_TYPE] > 3) return; //Must be a new format save
                //HELIA_PREGNANCY_TYPE was previously HEL_PREGNANCY_NOTICES, which ran from 0 to 3. Converted to the new format by multiplying by 65536
                //Since HelSpawn's father is already tracked separately we might as well just use PREGNANCY_PLAYER for all possible pregnancies
                this.flags[kFLAGS.HELIA_PREGNANCY_TYPE] = (65536 * this.flags[kFLAGS.HELIA_PREGNANCY_TYPE]) + PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.KELLY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.KELLY_PREGNANCY_TYPE] != 0) return; //Must be a new format save
                this.flags[kFLAGS.KELLY_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_PLAYER) return; //Must be a new format save
            if (this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_OVIELIXIR_EGGS) return; //Must be a new format save
            if (this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] == 1) this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            if (this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] == 2) this.flags[kFLAGS.MARBLE_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_OVIELIXIR_EGGS;

            if (this.flags[kFLAGS.PHYLLA_DRIDER_INCUBATION] > 0) {
                if (this.flags[kFLAGS.PHYLLA_VAGINAL_PREGNANCY_TYPE] != 0) return; //Must be a new format save
                this.flags[kFLAGS.PHYLLA_VAGINAL_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_DRIDER_EGGS;
                this.flags[kFLAGS.PHYLLA_DRIDER_INCUBATION] *= 24; //Convert pregnancy to days
            }

            if (this.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] > 0) {
                if (this.flags[kFLAGS.SHEILA_PREGNANCY_TYPE] != 0) return; //Must be a new format save
                this.flags[kFLAGS.SHEILA_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
                if (this.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] >= 4)
                    this.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] = 0; //Was ready to be born
                else
                    this.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION] = 24 * (4 - this.flags[kFLAGS.SHEILA_PREGNANCY_INCUBATION]); //Convert to hours and count down rather than up
            }

            if (this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] != 0 && this.flags[kFLAGS.SOPHIE_INCUBATION] != 0) return; //Must be a new format save
            if (this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] > 0 && this.flags[kFLAGS.SOPHIE_INCUBATION] == 0) { //She's in the wild and pregnant with an egg
                this.flags[kFLAGS.SOPHIE_INCUBATION] = this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE]; //SOPHIE_PREGNANCY_TYPE was previously SOPHIE_WILD_EGG_COUNTDOWN_TIMER 
                this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }
            else if (this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] == 0 && this.flags[kFLAGS.SOPHIE_INCUBATION] > 0) {
                this.flags[kFLAGS.SOPHIE_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
            }

            if (this.flags[kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_TYPE] != 0) return; //Must be a new format save
            if (this.flags[kFLAGS.TAMANI_DAUGHTER_PREGGO_COUNTDOWN] > 0) {
                this.flags[kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
                this.flags[kFLAGS.TAMANI_DAUGHTER_PREGGO_COUNTDOWN] *= 24; //Convert pregnancy to days
                this.flags[kFLAGS.TAMANI_DAUGHTERS_PREGNANCY_COUNT] = this.player.statusAffectv3(StatusAffects.Tamani);
            }

            if (this.flags[kFLAGS.TAMANI_PREGNANCY_TYPE] != 0) return; //Must be a new format save
            if (this.player.findStatusAffect(StatusAffects.TamaniFemaleEncounter) >= 0) this.player.removeStatusAffect(StatusAffects.TamaniFemaleEncounter); //Wasn't used in previous code
            if (this.player.findStatusAffect(StatusAffects.Tamani) >= 0) {
                if (this.player.statusAffectv1(StatusAffects.Tamani) == -500) { //This used to indicate that a player had met Tamani as a male
                    this.flags[kFLAGS.TAMANI_PREGNANCY_INCUBATION] = 0;
                    this.flags[kFLAGS.TAMANI_MET] = 1; //This now indicates the same thing
                }
                else this.flags[kFLAGS.TAMANI_PREGNANCY_INCUBATION] = this.player.statusAffectv1(StatusAffects.Tamani) * 24; //Convert pregnancy to days
                this.flags[kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] = this.player.statusAffectv2(StatusAffects.Tamani);
                this.flags[kFLAGS.TAMANI_PREGNANCY_COUNT] = this.player.statusAffectv3(StatusAffects.Tamani);
                this.flags[kFLAGS.TAMANI_TIMES_IMPREGNATED] = this.player.statusAffectv4(StatusAffects.Tamani);
                if (this.flags[kFLAGS.TAMANI_PREGNANCY_INCUBATION] > 0) this.flags[kFLAGS.TAMANI_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
                this.player.removeStatusAffect(StatusAffects.Tamani);
            }

            if (this.flags[kFLAGS.EGG_WITCH_TYPE] == PregnancyStore.PREGNANCY_BEE_EGGS || this.flags[kFLAGS.EGG_WITCH_TYPE] == PregnancyStore.PREGNANCY_DRIDER_EGGS) return; //Must be a new format save
            if (this.flags[kFLAGS.EGG_WITCH_TYPE] > 0) {
                if (this.flags[kFLAGS.EGG_WITCH_TYPE] == 1)
                    this.flags[kFLAGS.EGG_WITCH_TYPE] = PregnancyStore.PREGNANCY_BEE_EGGS;
                else
                    this.flags[kFLAGS.EGG_WITCH_TYPE] = PregnancyStore.PREGNANCY_DRIDER_EGGS;
                this.flags[kFLAGS.EGG_WITCH_COUNTER] = 24 * (8 - this.flags[kFLAGS.EGG_WITCH_COUNTER]); //Reverse the count and change to hours rather than days
            }

            if (this.player.buttPregnancyType == PregnancyStore.PREGNANCY_BEE_EGGS) return; //Must be a new format save
            if (this.player.buttPregnancyType == PregnancyStore.PREGNANCY_DRIDER_EGGS) return; //Must be a new format save
            if (this.player.buttPregnancyType == PregnancyStore.PREGNANCY_SANDTRAP_FERTILE) return; //Must be a new format save
            if (this.player.buttPregnancyType == PregnancyStore.PREGNANCY_SANDTRAP) return; //Must be a new format save
            if (this.player.buttPregnancyType == 2) this.player.buttKnockUpForce(PregnancyStore.PREGNANCY_BEE_EGGS, this.player.buttPregnancyIncubation);
            if (this.player.buttPregnancyType == 3) this.player.buttKnockUpForce(PregnancyStore.PREGNANCY_DRIDER_EGGS, this.player.buttPregnancyIncubation);
            if (this.player.buttPregnancyType == 4) this.player.buttKnockUpForce(PregnancyStore.PREGNANCY_SANDTRAP_FERTILE, this.player.buttPregnancyIncubation);
            if (this.player.buttPregnancyType == 5) this.player.buttKnockUpForce(PregnancyStore.PREGNANCY_SANDTRAP, this.player.buttPregnancyIncubation);

            //If dick length zero then player has never met Kath, no need to set flags. If her breast size is zero then set values for flags introduced with the employment expansion
            if (this.flags[kFLAGS.KATHERINE_BREAST_SIZE] != 0) return; //Must be a new format save
            if (this.flags[kFLAGS.KATHERINE_DICK_LENGTH] != 0) {
                this.flags[kFLAGS.KATHERINE_BREAST_SIZE] = BREAST_CUP_B;
                this.flags[kFLAGS.KATHERINE_BALL_SIZE] = 1;
                this.flags[kFLAGS.KATHERINE_HAIR_COLOR] = "neon pink";
                this.flags[kFLAGS.KATHERINE_HOURS_SINCE_CUM] = 200; //Give her maxed out cum for that first time
            }

            if (this.flags[kFLAGS.URTA_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_BEE_EGGS) return; //Must be a new format save
            if (this.flags[kFLAGS.URTA_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_DRIDER_EGGS) return; //Must be a new format save
            if (this.flags[kFLAGS.URTA_PREGNANCY_TYPE] == PregnancyStore.PREGNANCY_PLAYER) return; //Must be a new format save
            if (this.flags[kFLAGS.URTA_PREGNANCY_TYPE] > 0) { //URTA_PREGNANCY_TYPE was previously URTA_EGG_INCUBATION, assume this was an egg pregnancy
                this.flags[kFLAGS.URTA_INCUBATION] = this.flags[kFLAGS.URTA_PREGNANCY_TYPE];
                if (this.player.findPerk(PerkLib.SpiderOvipositor) >= 0)
                    this.flags[kFLAGS.URTA_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_DRIDER_EGGS;
                else
                    this.flags[kFLAGS.URTA_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_BEE_EGGS;
            }
            else if (this.flags[kFLAGS.URTA_INCUBATION] > 0) { //Assume Urta was pregnant with the player's baby
                this.flags[kFLAGS.URTA_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
                this.flags[kFLAGS.URTA_INCUBATION] = 384 - this.flags[kFLAGS.URTA_INCUBATION]; //Reverse the pregnancy counter since it now counts down rather than up
            }

            if (this.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] > 0 && this.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] == 0) {
                //EDRYN_PREGNANCY_TYPE was previously EDRYN_BIRF_COUNTDOWN - used when Edryn was pregnant with Taoth
                if (this.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] > 0)
                    this.flags[kFLAGS.URTA_FERTILE] = PregnancyStore.PREGNANCY_PLAYER;          //These two variables are used to store information on the pregnancy Taoth
                this.flags[kFLAGS.URTA_PREG_EVERYBODY] = this.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION]; //is overriding (if any), so they can later be restored.
                this.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] = this.flags[kFLAGS.EDRYN_PREGNANCY_TYPE];
                this.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_TAOTH;
            }
            else if (this.flags[kFLAGS.EDRYN_PREGNANCY_INCUBATION] > 0 && this.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] == 0) this.flags[kFLAGS.EDRYN_PREGNANCY_TYPE] = PregnancyStore.PREGNANCY_PLAYER;
        }
    }
}
