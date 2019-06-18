define(["require", "exports", "./internals/Utils", "./CoC", "./AssClass", "./Cock", "./VaginaClass", "./BreastRowClass", "../console", "./CoC_Settings", "./StatusAffectClass", "./CockTypesEnum", "./Appearance", "./StatusAffects", "./BreastStore", "./GlobalFlags/kGAMECLASS", "../../includes/appearanceDefs", "./PerkClass", "./PerkLib"], function (require, exports, Utils_1, CoC_1, AssClass_1, Cock_1, VaginaClass_1, BreastRowClass_1, console_1, CoC_Settings_1, StatusAffectClass_1, CockTypesEnum_1, Appearance_1, StatusAffects_1, BreastStore_1, kGAMECLASS_1, appearanceDefs_1, PerkClass_1, PerkLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //CoC Creature.as
    class Creature extends Utils_1.Utils {
        //Constructor
        constructor() {
            super();
            //Variables
            //Short refers to player name and monster name. BEST VARIABLE NAME EVA!
            //"a" refers to how the article "a" should appear in text. 
            this._short = "You";
            this._a = "a ";
            //Weapon
            this._weaponName = "";
            this._weaponVerb = "";
            this._weaponAttack = 0;
            this._weaponPerk = "";
            this._weaponValue = 0;
            //Clothing/Armor
            this._armorName = "";
            this._armorDef = 0;
            this._armorPerk = "";
            this._armorValue = 0;
            //Primary stats
            this.str = 0;
            this.tou = 0;
            this.spe = 0;
            this.inte = 0;
            this.lib = 0;
            this.sens = 0;
            this.cor = 0;
            this.fatigue = 0;
            //Combat Stats
            this.HP = 0;
            this.lust = 0;
            //Level Stats
            this.XP = 0;
            this.level = 0;
            this.gems = 0;
            this.additionalXP = 0;
            //Appearance Variables
            //Gender 1M, 2F, 3H
            this.gender = appearanceDefs_1.GENDER_NONE;
            this._tallness = 0;
            /*Hairtype
            0- normal
            1- feather
            2- ghost
            3- goo!
            4- anemononeoenoeneo!*/
            this.hairType = appearanceDefs_1.HAIR_NORMAL;
            this.hairColor = "no";
            this.hairLength = 0;
            /*Skintype
            0 - skin
            1 - furry
            2 - scaley
            3 - goopey*/
            this._skinType = appearanceDefs_1.SKIN_TYPE_PLAIN;
            this._skinTone = "albino";
            this.skinDesc = "skin";
            this.skinAdj = "";
            /*		Facetype:
                    0 - human
                    1 - horse
                    2 - dogface
                    3 - cowface
                    4 - sharkface-teeth
                    5 - Human w/Naga fangz
                    6 - kittah face
                    7 - lizard face (durned argonians!)
                    8 - bunnah faceahhh bunbun
                    9 - kangaface
                    10 - spidah-face (humanish)
                    11 - foxface!
                    12 - dragon face
                    13 - Halfcoon
                    14 - fullcoon
                    15 - halfmouse
                    16 - fullmouse*/
            this.faceType = appearanceDefs_1.FACE_HUMAN;
            /*EarType
            -1 - none!
            0 - human
            1 - horse
            2 - dog
            3 - cow
            4 - elf
            5 - catzilla
            6 - Snakezilla
            7 - Bunbunz
            8 - Roo Ears
            9 - fox ears
            10 - dragon
            11 - coon
            12 - mouse*/
            this.earType = appearanceDefs_1.EARS_HUMAN;
            this.earValue = 0;
            /*Horntype
            1 - demonic
            2 - minotaur (cowlike)
            3 - Draconic/Lizard
            4 - Double draconic
            5 - Antlers*/
            this.hornType = appearanceDefs_1.HORNS_NONE;
            this.horns = 0;
            /*Wingtype
            0 - none
            1 - bee
            2 - large bee
            3 - faerie?
            4 - avian
            5 - dragoooon?
            6 - demon/bat
            7 - large demon/bat
            8 - shark wing lolololol
            9 - harpy
            10 - small dagron
            11 - trogdor wings
            12 - sandtrap wings*/
            this._wingType = appearanceDefs_1.WING_TYPE_NONE;
            this.wingDesc = "non-existant";
            /* lowerBody:
            0 - normal
            1 - hooves
            2 - paws
            3 - snakelike body
            4 - centaur!
            5 - demonic heels
            6 - demon foot-claws
            7 - bee legs
            8 - goo mound
            9 - catfeet
            10 - lizardfeet
            11 - MLP.
            12 - DAH BUNNY!
            13 - Harpah Legz
            14 - Roo feet!
            15 - Spider Legz
            16 - Drider Legs
            17 - foxpaws
            18 - dragonfeet
            19 - raccoonfeet*/
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_HUMAN;
            /*tailType:
            0 - none
            1 - horse
            2 - dog
            3 - demon
            4 - cow!
            5 - spider!
            6 - bee!
            7 - shark tail!
            8 - catTAIIIIIL
            9 - lizard tail
            10 - bunbuntail
            11 - harpybutt
            12 - rootail
            13 - foxtail
            14 - dagron tail
            15 - raccoon tail
            16 - mousetail*/
            this.tailType = appearanceDefs_1.TAIL_TYPE_NONE;
            //Tail venom is a 0-100 slider used for tail attacks. Recharges per hour.
            this.tailVenom = 0;
            //Tail recharge determines how fast venom/webs comes back per hour.
            this.tailRecharge = 5;
            /*hipRating
            0 - boyish
            2 - slender
            4 - average
            6 - noticable/ample
            10 - curvy//flaring
            15 - child-bearing/fertile
            20 - inhumanly wide*/
            this.hipRating = appearanceDefs_1.HIP_RATING_BOYISH;
            /*buttRating
            0 - buttless
            2 - tight
            4 - average
            6 - noticable
            8 - large
            10 - jiggly
            13 - expansive
            16 - huge
            20 - inconceivably large/big/huge etc*/
            this.buttRating = appearanceDefs_1.BUTT_RATING_BUTTLESS;
            //Piercings
            //TODO: Pull this out into it's own class and enum.
            this.nipplesPierced = 0;
            this.nipplesPShort = "";
            this.nipplesPLong = "";
            this.lipPierced = 0;
            this.lipPShort = "";
            this.lipPLong = "";
            this.tonguePierced = 0;
            this.tonguePShort = "";
            this.tonguePLong = "";
            this.eyebrowPierced = 0;
            this.eyebrowPShort = "";
            this.eyebrowPLong = "";
            this.earsPierced = 0;
            this.earsPShort = "";
            this.earsPLong = "";
            this.nosePierced = 0;
            this.nosePShort = "";
            this.nosePLong = "";
            //Head ornaments. Definitely need to convert away from hard coded types.
            this.antennae = appearanceDefs_1.ANTENNAE_NONE;
            //Eyetype
            this.eyeType = appearanceDefs_1.EYES_HUMAN;
            //TongueType
            this.tongueType = appearanceDefs_1.TONUGE_HUMAN;
            //ArmType
            this.armType = appearanceDefs_1.ARM_TYPE_HUMAN;
            //Gills
            this.gills = false;
            //balls
            this.balls = 0;
            this.cumMultiplier = 1;
            this.ballSize = 0;
            this._hoursSinceCum = 0;
            //Fertility is a % out of 100. 
            this.fertility = 10;
            this.clitLength = .5;
            this.nippleLength = .25;
            this.ass = new AssClass_1.AssClass();
            //cocks = new Array();
            //The world isn't ready for typed Arrays just yet.
            this.cocks = [];
            this.vaginas = [];
            //vaginas: Vector.<Vagina> = new Vector.<Vagina>();
            this.breastRows = [];
            this._perks = [];
            this.statusAffects = [];
            //keyItems = new Array();
        }
        // include "../../includes/appearanceDefs.as";
        get game() {
            return kGAMECLASS_1.kGAMECLASS;
        }
        get flags() {
            return this.game.flags;
        }
        get short() { return this._short; }
        set short(value) { this._short = value; }
        get a() { return this._a; }
        set a(value) { this._a = value; }
        get capitalA() {
            if (this._a.length == 0)
                return "";
            return this._a.charAt(0).toUpperCase() + this._a.substr(1);
        }
        get weaponName() { return this._weaponName; }
        get weaponVerb() { return this._weaponVerb; }
        get weaponAttack() { return this._weaponAttack; }
        get weaponPerk() { return this._weaponPerk; }
        get weaponValue() { return this._weaponValue; }
        set weaponName(value) { this._weaponName = value; }
        set weaponVerb(value) { this._weaponVerb = value; }
        set weaponAttack(value) { this._weaponAttack = value; }
        set weaponPerk(value) { this._weaponPerk = value; }
        set weaponValue(value) { this._weaponValue = value; }
        get armorName() { return this._armorName; }
        get armorDef() { return this._armorDef; }
        get armorPerk() { return this._armorPerk; }
        get armorValue() { return this._armorValue; }
        set armorValue(value) { this._armorValue = value; }
        set armorName(value) { this._armorName = value; }
        set armorDef(value) { this._armorDef = value; }
        set armorPerk(value) { this._armorPerk = value; }
        get tallness() { return this._tallness; }
        set tallness(value) { this._tallness = value; }
        get skinType() { return this._skinType; }
        set skinType(value) { this._skinType = value; }
        get skinTone() { return this._skinTone; }
        set skinTone(value) { this._skinTone = value; }
        get wingType() { return this._wingType; }
        set wingType(value) { this._wingType = value; }
        get hoursSinceCum() { return this._hoursSinceCum; }
        set hoursSinceCum(v) {
            /*if (v == 0)
            {
                trace("noop");
            }*/
            this._hoursSinceCum = v;
        }
        validate() {
            var error = "";
            // 2. Value boundaries etc
            // 2.1. non-negative Number fields
            error += Utils_1.Utils.validateNonNegativeNumberFields(this, "Monster.validate", [
                "balls", "ballSize", "cumMultiplier", "hoursSinceCum",
                "tallness", "hipRating", "buttRating", "lowerBody", "armType",
                "skinType", "hairLength", "hairType",
                "faceType", "earType", "tongueType", "eyeType",
                "str", "tou", "spe", "inte", "lib", "sens", "cor",
                // Allow weaponAttack to be negative as a penalty to strength-calculated damage
                // Same with armorDef, bonusHP, additionalXP
                "weaponValue", "armorValue",
                "lust", "fatigue",
                "level", "gems",
                "tailVenom", "tailRecharge", "horns",
                "HP", "XP"
            ]);
            // 2.2. non-empty String fields
            error += Utils_1.Utils.validateNonEmptyStringFields(this, "Monster.validate", [
                "short",
                "skinDesc",
                "weaponName", "weaponVerb", "armorName"
            ]);
            // 3. validate members
            for (var cock of this.cocks) {
                error += cock.validate();
            }
            for (var vagina of this.vaginas) {
                error += vagina.validate();
            }
            for (var row of this.breastRows) {
                error += row.validate();
            }
            error += this.ass.validate();
            // 4. Inconsistent fields
            // 4.1. balls
            if (this.balls > 0 && this.ballSize <= 0) {
                error += "Balls are present but ballSize = " + this.ballSize + ". ";
            }
            if (this.ballSize > 0 && this.balls <= 0) {
                error += "No balls but ballSize = " + this.ballSize + ". ";
            }
            // 4.2. hair
            if (this.hairLength <= 0) {
                if (this.hairType != appearanceDefs_1.HAIR_NORMAL)
                    error += "No hair but hairType = " + this.hairType + ". ";
            }
            // 4.3. tail
            if (this.tailType == appearanceDefs_1.TAIL_TYPE_NONE) {
                if (this.tailVenom != 0)
                    error += "No tail but tailVenom = " + this.tailVenom + ". ";
            }
            // 4.4. horns
            if (this.hornType == appearanceDefs_1.HORNS_NONE) {
                if (this.horns > 0)
                    error += "horns > 0 but hornType = HORNS_NONE. ";
            }
            else {
                if (this.horns == 0)
                    error += "Has horns but their number 'horns' = 0. ";
            }
            return error;
        }
        perk(i) {
            return this._perks[i];
        }
        get perks() {
            return this._perks;
        }
        get numPerks() {
            return this._perks.length;
        }
        //Functions			
        orgasm() {
            this.game.dynStats("lus=", 0, "res", false);
            this.hoursSinceCum = 0;
            if (this.countCockSocks("gilded") > 0) {
                var randomCock = Creature.rand(this.cocks.length);
                var bonusGems = Creature.rand(this.cocks[randomCock].cockThickness) + this.countCockSocks("gilded"); // int so AS rounds to whole numbers
                this.game.outputText("\n\nFeeling some minor discomfort in your " + this.cockDescript(randomCock) + " you slip it out of your [armor] and examine it. <b>With a little exploratory rubbing and massaging, you manage to squeeze out " + bonusGems + " gems from its cum slit.</b>\n\n");
                this.gems += bonusGems;
            }
        }
        //Create a perk
        createPerk(ptype, value1, value2, value3, value4) {
            var newKeyItem = new PerkClass_1.PerkClass(ptype);
            //used to denote that the array has already had its new spot pushed on.
            var arrayed = false;
            //used to store where the array goes
            var keySlot = 0;
            var counter = 0;
            //Start the array if its the first bit
            if (this.perks.length == 0) {
                //trace("New Perk Started Array! " + keyName);
                this.perks.push(newKeyItem);
                arrayed = true;
                keySlot = 0;
            }
            //If it belongs at the end, push it on
            if (this.perk(this.perks.length - 1).perkName < ptype.name && !arrayed) {
                //trace("New Perk Belongs at the end!! " + keyName);
                this.perks.push(newKeyItem);
                arrayed = true;
                keySlot = this.perks.length - 1;
            }
            //If it belongs in the beginning, splice it in
            if (this.perk(0).perkName > ptype.name && !arrayed) {
                //trace("New Perk Belongs at the beginning! " + keyName);
                this.perks.splice(0, 0, newKeyItem);
                arrayed = true;
                keySlot = 0;
            }
            //Find the spot it needs to go in and splice it in.
            if (!arrayed) {
                //trace("New Perk using alphabetizer! " + keyName);
                counter = this.perks.length;
                while (counter > 0 && !arrayed) {
                    counter--;
                    //If the current slot is later than new key
                    if (this.perk(counter).perkName > ptype.name) {
                        //If the earlier slot is earlier than new key && a real spot
                        if (counter - 1 >= 0) {
                            //If the earlier slot is earlier slot in!
                            if (this.perk(counter - 1).perkName <= ptype.name) {
                                arrayed = true;
                                this.perks.splice(counter, 0, newKeyItem);
                                keySlot = counter;
                            }
                        }
                        //If the item after 0 slot is later put here!
                        else {
                            //If the next slot is later we are go
                            if (this.perk(counter).perkName <= ptype.name) {
                                arrayed = true;
                                this.perks.splice(counter, 0, newKeyItem);
                                keySlot = counter;
                            }
                        }
                    }
                }
            }
            //Fallback
            if (!arrayed) {
                //trace("New Perk Belongs at the end!! " + keyName);
                this.perks.push(newKeyItem);
                keySlot = this.perks.length - 1;
            }
            this.perk(keySlot).value1 = value1;
            this.perk(keySlot).value2 = value2;
            this.perk(keySlot).value3 = value3;
            this.perk(keySlot).value4 = value4;
            //trace("NEW PERK FOR PLAYER in slot " + keySlot + ": " + perk(keySlot).perkName);
        }
        /**
         * Remove perk. Return true if there was such perk
         */
        removePerk(ptype) {
            var counter = this.perks.length;
            //Various Errors preventing action
            if (this.perks.length <= 0) {
                return false;
            }
            while (counter > 0) {
                counter--;
                if (this.perk(counter).ptype == ptype) {
                    this.perks.splice(counter, 1);
                    //trace("Attempted to remove \"" + perkName + "\" perk.");
                    return true;
                }
            }
            return false;
        }
        //has perk?
        findPerk(ptype) {
            if (this.perks.length <= 0)
                return -2;
            for (var counter = 0; counter < this.perks.length; counter++) {
                if (this.perk(counter).ptype == ptype)
                    return counter;
            }
            return -1;
        }
        //Duplicate perk
        //Deprecated?
        perkDuplicated(ptype) {
            var timesFound = 0;
            if (this.perks.length <= 0)
                return false;
            for (var counter = 0; counter < this.perks.length; counter++) {
                if (this.perk(counter).ptype == ptype)
                    timesFound++;
            }
            return (timesFound > 1);
        }
        //remove all perks
        removePerks() {
            this._perks = [];
        }
        addPerkValue(ptype, valueIdx = 1, bonus = 0) {
            var counter = this.findPerk(ptype);
            if (counter < 0) {
                console_1.trace("ERROR? Looking for perk '" + ptype + "' to change value " + valueIdx + ", and player does not have the perk.");
                return;
            }
            if (valueIdx < 1 || valueIdx > 4) {
                CoC_Settings_1.CoC_Settings.error("addPerkValue(" + ptype.id + ", " + valueIdx + ", " + bonus + ").");
                return;
            }
            if (valueIdx == 1)
                this.perk(counter).value1 += bonus;
            if (valueIdx == 2)
                this.perk(counter).value2 += bonus;
            if (valueIdx == 3)
                this.perk(counter).value3 += bonus;
            if (valueIdx == 4)
                this.perk(counter).value4 += bonus;
        }
        setPerkValue(ptype, valueIdx = 1, newNum = 0) {
            var counter = this.findPerk(ptype);
            //Various Errors preventing action
            if (counter < 0) {
                console_1.trace("ERROR? Looking for perk '" + ptype + "' to change value " + valueIdx + ", and player does not have the perk.");
                return;
            }
            if (valueIdx < 1 || valueIdx > 4) {
                CoC_Settings_1.CoC_Settings.error("setPerkValue(" + ptype.id + ", " + valueIdx + ", " + newNum + ").");
                return;
            }
            if (valueIdx == 1)
                this.perk(counter).value1 = newNum;
            if (valueIdx == 2)
                this.perk(counter).value2 = newNum;
            if (valueIdx == 3)
                this.perk(counter).value3 = newNum;
            if (valueIdx == 4)
                this.perk(counter).value4 = newNum;
        }
        perkv1(ptype) {
            var counter = this.findPerk(ptype);
            if (counter < 0) {
                // trace("ERROR? Looking for perk '" + ptype + "', but player does not have it.");
                return 0;
            }
            return this.perk(counter).value1;
        }
        perkv2(ptype) {
            var counter = this.findPerk(ptype);
            if (counter < 0) {
                // trace("ERROR? Looking for perk '" + ptype + "', but player does not have it.");
                return 0;
            }
            return this.perk(counter).value2;
        }
        perkv3(ptype) {
            var counter = this.findPerk(ptype);
            if (counter < 0) {
                console_1.trace("ERROR? Looking for perk '" + ptype + "', but player does not have it.");
                return 0;
            }
            return this.perk(counter).value3;
        }
        perkv4(ptype) {
            var counter = this.findPerk(ptype);
            if (counter < 0) {
                console_1.trace("ERROR? Looking for perk '" + ptype + "', but player does not have it.");
                return 0;
            }
            return this.perk(counter).value4;
        }
        //{region StatusEffects
        //Create a status
        createStatusAffect(stype, value1, value2, value3, value4) {
            var newStatusAffect = new StatusAffectClass_1.StatusAffectClass(stype, value1, value2, value3, value4);
            this.statusAffects.push(newStatusAffect);
            //trace("createStatusAffect -> "+statusAffects.join(","));
            //trace("NEW STATUS APPLIED TO PLAYER!: " + statusName);
        }
        //Remove a status
        removeStatusAffect(stype) {
            var counter = this.findStatusAffect(stype);
            if (counter < 0)
                return;
            this.statusAffects.splice(counter, 1);
            //trace("removeStatusAffect -> "+statusAffects.join(","));
        }
        findStatusAffect(stype) {
            for (var counter = 0; counter < this.statusAffects.length; counter++) {
                if (this.statusAffect(counter).stype == stype)
                    return counter;
            }
            return -1;
        }
        //}endregion
        changeStatusValue(stype, statusValueNum = 1, newNum = 0) {
            var counter = this.findStatusAffect(stype);
            //Various Errors preventing action
            if (counter < 0)
                return;
            if (statusValueNum < 1 || statusValueNum > 4) {
                CoC_Settings_1.CoC_Settings.error("ChangeStatusValue called with invalid status value number.");
                return;
            }
            if (statusValueNum == 1)
                this.statusAffect(counter).value1 = newNum;
            if (statusValueNum == 2)
                this.statusAffect(counter).value2 = newNum;
            if (statusValueNum == 3)
                this.statusAffect(counter).value3 = newNum;
            if (statusValueNum == 4)
                this.statusAffect(counter).value4 = newNum;
        }
        addStatusValue(stype, statusValueNum = 1, bonus = 0) {
            var counter = this.findStatusAffect(stype);
            //Various Errors preventing action
            if (counter < 0) {
                return;
            }
            if (statusValueNum < 1 || statusValueNum > 4) {
                CoC_Settings_1.CoC_Settings.error("ChangeStatusValue called with invalid status value number.");
                return;
            }
            if (statusValueNum == 1)
                this.statusAffect(counter).value1 += bonus;
            if (statusValueNum == 2)
                this.statusAffect(counter).value2 += bonus;
            if (statusValueNum == 3)
                this.statusAffect(counter).value3 += bonus;
            if (statusValueNum == 4)
                this.statusAffect(counter).value4 += bonus;
        }
        statusAffect(idx) {
            return this.statusAffects[idx];
        }
        statusAffectv1(stype) {
            var counter = this.findStatusAffect(stype);
            return (counter < 0) ? 0 : this.statusAffect(counter).value1;
        }
        statusAffectv2(stype) {
            var counter = this.findStatusAffect(stype);
            return (counter < 0) ? 0 : this.statusAffect(counter).value2;
        }
        statusAffectv3(stype) {
            var counter = this.findStatusAffect(stype);
            return (counter < 0) ? 0 : this.statusAffect(counter).value3;
        }
        statusAffectv4(stype) {
            var counter = this.findStatusAffect(stype);
            return (counter < 0) ? 0 : this.statusAffect(counter).value4;
        }
        removeStatuses() {
            var counter = this.statusAffects.length;
            while (counter > 0) {
                counter--;
                this.statusAffects.splice(counter, 1);
            }
        }
        biggestTitSize() {
            if (this.breastRows.length == 0)
                return -1;
            var counter = this.breastRows.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.breastRows[index].breastRating < this.breastRows[counter].breastRating)
                    index = counter;
            }
            return this.breastRows[index].breastRating;
        }
        cockArea(i_cockIndex) {
            if (i_cockIndex >= this.cocks.length || i_cockIndex < 0)
                return 0;
            return (this.cocks[i_cockIndex].cockThickness * this.cocks[i_cockIndex].cockLength);
        }
        biggestCockLength() {
            if (this.cocks.length == 0)
                return 0;
            return this.cocks[this.biggestCockIndex()].cockLength;
        }
        biggestCockArea() {
            if (this.cocks.length == 0)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.cockArea(index) < this.cockArea(counter))
                    index = counter;
            }
            return this.cockArea(index);
        }
        //Find the second biggest dick and it's area.
        biggestCockArea2() {
            if (this.cocks.length <= 1)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            var index2 = -1;
            //Find the biggest
            while (counter > 0) {
                counter--;
                if (this.cockArea(index) < this.cockArea(counter))
                    index = counter;
            }
            //Reset counter and find the next biggest
            counter = this.cocks.length;
            while (counter > 0) {
                counter--;
                //Is this spot claimed by the biggest?
                if (counter != index) {
                    //Not set yet?
                    if (index2 == -1)
                        index2 = counter;
                    //Is the stored value less than the current one?
                    if (this.cockArea(index2) < this.cockArea(counter)) {
                        index2 = counter;
                    }
                }
            }
            //If it couldn't find a second biggest...
            if (index == index2)
                return 0;
            return this.cockArea(index2);
        }
        longestCock() {
            if (this.cocks.length == 0)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.cocks[index].cockLength < this.cocks[counter].cockLength)
                    index = counter;
            }
            return index;
        }
        longestCockLength() {
            if (this.cocks.length == 0)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.cocks[index].cockLength < this.cocks[counter].cockLength)
                    index = counter;
            }
            return this.cocks[index].cockLength;
        }
        longestHorseCockLength() {
            if (this.cocks.length == 0)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if ((this.cocks[index].cockType != CockTypesEnum_1.CockTypesEnum.HORSE && this.cocks[counter].cockType == CockTypesEnum_1.CockTypesEnum.HORSE) || (this.cocks[index].cockLength < this.cocks[counter].cockLength && this.cocks[counter].cockType == CockTypesEnum_1.CockTypesEnum.HORSE))
                    index = counter;
            }
            return this.cocks[index].cockLength;
        }
        twoDickRadarSpecial(width) {
            //No two dicks?  FUCK OFF
            if (this.cockTotal() < 2)
                return false;
            //Set up vars
            //Get thinnest, work done already
            var thinnest = this.thinnestCockIndex();
            var thinnest2 = 0;
            //For ze loop
            var temp = 0;
            //Make sure they arent the same at initialization
            if (thinnest2 == thinnest)
                thinnest2 = 1;
            //Loop through to find 2nd thinnest
            while (temp < this.cocks.length) {
                if (this.cocks[thinnest2].cockThickness > this.cocks[temp].cockThickness && temp != thinnest)
                    thinnest2 = temp;
                temp++;
            }
            //If the two thicknesses added together are less than the arg, true, else false
            return this.cocks[thinnest].cockThickness + this.cocks[thinnest2].cockThickness < width;
        }
        totalCockThickness() {
            var thick = 0;
            var counter = this.cocks.length;
            while (counter > 0) {
                counter--;
                thick += this.cocks[counter].cockThickness;
            }
            return thick;
        }
        thickestCock() {
            if (this.cocks.length == 0)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.cocks[index].cockThickness < this.cocks[counter].cockThickness)
                    index = counter;
            }
            return index;
        }
        thickestCockThickness() {
            if (this.cocks.length == 0)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.cocks[index].cockThickness < this.cocks[counter].cockThickness)
                    index = counter;
            }
            return this.cocks[index].cockThickness;
        }
        thinnestCockIndex() {
            if (this.cocks.length == 0)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.cocks[index].cockThickness > this.cocks[counter].cockThickness)
                    index = counter;
            }
            return index;
        }
        smallestCockIndex() {
            if (this.cocks.length == 0)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.cockArea(index) > this.cockArea(counter)) {
                    index = counter;
                }
            }
            return index;
        }
        smallestCockLength() {
            if (this.cocks.length == 0)
                return 0;
            return this.cocks[this.smallestCockIndex()].cockLength;
        }
        shortestCockIndex() {
            if (this.cocks.length == 0)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.cocks[index].cockLength > this.cocks[counter].cockLength)
                    index = counter;
            }
            return index;
        }
        shortestCockLength() {
            if (this.cocks.length == 0)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.cocks[index].cockLength > this.cocks[counter].cockLength)
                    index = counter;
            }
            return this.cocks[index].cockLength;
        }
        //Find the biggest cock that fits inside a given value
        cockThatFits(i_fits = 0, type = "area") {
            if (this.cocks.length <= 0)
                return -1;
            var cockIdxPtr = this.cocks.length;
            //Current largest fitter
            var cockIndex = -1;
            while (cockIdxPtr > 0) {
                cockIdxPtr--;
                if (type == "area") {
                    if (this.cockArea(cockIdxPtr) <= i_fits) {
                        //If one already fits
                        if (cockIndex >= 0) {
                            //See if the newcomer beats the saved small guy
                            if (this.cockArea(cockIdxPtr) > this.cockArea(cockIndex))
                                cockIndex = cockIdxPtr;
                        }
                        //Store the index of fitting dick
                        else
                            cockIndex = cockIdxPtr;
                    }
                }
                else if (type == "length") {
                    if (this.cocks[cockIdxPtr].cockLength <= i_fits) {
                        //If one already fits
                        if (cockIndex >= 0) {
                            //See if the newcomer beats the saved small guy
                            if (this.cocks[cockIdxPtr].cockLength > this.cocks[cockIndex].cockLength)
                                cockIndex = cockIdxPtr;
                        }
                        //Store the index of fitting dick
                        else
                            cockIndex = cockIdxPtr;
                    }
                }
            }
            return cockIndex;
        }
        //Find the 2nd biggest cock that fits inside a given value
        cockThatFits2(fits = 0) {
            if (this.cockTotal() == 1)
                return -1;
            var counter = this.cocks.length;
            //Current largest fitter
            var index = -1;
            var index2 = -1;
            while (counter > 0) {
                counter--;
                //Does this one fit?
                if (this.cockArea(counter) <= fits) {
                    //If one already fits
                    if (index >= 0) {
                        //See if the newcomer beats the saved small guy
                        if (this.cockArea(counter) > this.cockArea(index)) {
                            //Save old wang
                            if (index != -1)
                                index2 = index;
                            index = counter;
                        }
                        //If this one fits and is smaller than the other great
                        else {
                            if ((this.cockArea(index2) < this.cockArea(counter)) && counter != index) {
                                index2 = counter;
                            }
                        }
                        if (index >= 0 && index == index2)
                            console_1.trace("FUCK ERROR COCKTHATFITS2 SHIT IS BROKED!");
                    }
                    //Store the index of fitting dick
                    else
                        index = counter;
                }
            }
            return index2;
        }
        smallestCockArea() {
            if (this.cockTotal() == 0)
                return -1;
            return this.cockArea(this.smallestCockIndex());
        }
        smallestCock() {
            return this.cockArea(this.smallestCockIndex());
        }
        biggestCockIndex() {
            if (this.cocks.length == 0)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.cockArea(index) < this.cockArea(counter))
                    index = counter;
            }
            return index;
        }
        //Find the second biggest dick's index.
        biggestCockIndex2() {
            if (this.cocks.length <= 1)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            var index2 = 0;
            //Find the biggest
            while (counter > 0) {
                counter--;
                if (this.cockArea(index) < this.cockArea(counter))
                    index = counter;
            }
            //Reset counter and find the next biggest
            counter = this.cocks.length;
            while (counter > 0) {
                counter--;
                //Make sure index2 doesn't get stuck
                //at the same value as index1 if the
                //initial location is biggest.
                if (index == index2 && counter != index)
                    index2 = counter;
                //Is the stored value less than the current one?
                if (this.cockArea(index2) < this.cockArea(counter)) {
                    //Make sure we don't set index2 to be the same
                    //as the biggest dick.
                    if (counter != index)
                        index2 = counter;
                }
            }
            //If it couldn't find a second biggest...
            if (index == index2)
                return 0;
            return index2;
        }
        smallestCockIndex2() {
            if (this.cocks.length <= 1)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            var index2 = 0;
            //Find the smallest
            while (counter > 0) {
                counter--;
                if (this.cockArea(index) > this.cockArea(counter))
                    index = counter;
            }
            //Reset counter and find the next biggest
            counter = this.cocks.length;
            while (counter > 0) {
                counter--;
                //Make sure index2 doesn't get stuck
                //at the same value as index1 if the
                //initial location is biggest.
                if (index == index2 && counter != index)
                    index2 = counter;
                //Is the stored value less than the current one?
                if (this.cockArea(index2) > this.cockArea(counter)) {
                    //Make sure we don't set index2 to be the same
                    //as the biggest dick.
                    if (counter != index)
                        index2 = counter;
                }
            }
            //If it couldn't find a second biggest...
            if (index == index2)
                return 0;
            return index2;
        }
        //Find the third biggest dick index.
        biggestCockIndex3() {
            if (this.cocks.length <= 2)
                return 0;
            var counter = this.cocks.length;
            var index = 0;
            var index2 = -1;
            var index3 = -1;
            //Find the biggest
            while (counter > 0) {
                counter--;
                if (this.cockArea(index) < this.cockArea(counter))
                    index = counter;
            }
            //Reset counter and find the next biggest
            counter = this.cocks.length;
            while (counter > 0) {
                counter--;
                //If this index isn't used already
                if (counter != index) {
                    //Has index been set to anything yet?
                    if (index2 == -1)
                        index2 = counter;
                    //Is the stored value less than the current one?
                    else if (this.cockArea(index2) < this.cockArea(counter)) {
                        index2 = counter;
                    }
                }
            }
            //If it couldn't find a second biggest...
            if (index == index2 || index2 == -1)
                index2 = 0;
            //Reset counter and find the next biggest
            counter = this.cocks.length;
            while (counter > 0) {
                counter--;
                //If this index isn't used already
                if (counter != index && counter != index2) {
                    //Has index been set to anything yet?
                    if (index3 == -1)
                        index3 = counter;
                    //Is the stored value less than the current one?
                    else if (this.cockArea(index3) < this.cockArea(counter)) {
                        index3 = counter;
                    }
                }
            }
            //If it fails for some reason.
            if (index3 == -1)
                index3 = 0;
            return index3;
        }
        cockDescript(cockIndex = 0) {
            return Appearance_1.Appearance.cockDescript(this, cockIndex);
        }
        cockAdjective(index = -1) {
            if (index < 0)
                index = this.biggestCockIndex();
            var isPierced = (this.cocks.length == 1) && (this.cocks[index].isPierced); //Only describe as pierced or sock covered if the creature has just one cock
            var hasSock = (this.cocks.length == 1) && (this.cocks[index].sock != "");
            var isGooey = (this.skinType == CoC_1.CoC.SKIN_TYPE_GOO);
            return Appearance_1.Appearance.cockAdjective(this.cocks[index].cockType, this.cocks[index].cockLength, this.cocks[index].cockThickness, this.lust, this.cumQ(), isPierced, hasSock, isGooey);
        }
        wetness() {
            if (this.vaginas.length == 0)
                return 0;
            else
                return this.vaginas[0].vaginalWetness;
        }
        vaginaType(newType = -1) {
            if (!this.hasVagina())
                return -1;
            if (newType != -1) {
                this.vaginas[0].type = newType;
            }
            return this.vaginas[0].type;
        }
        looseness(vag = true) {
            if (vag) {
                if (this.vaginas.length == 0)
                    return 0;
                else
                    return this.vaginas[0].vaginalLooseness;
            }
            else {
                return this.ass.analLooseness;
            }
        }
        vaginalCapacity() {
            //If the player has no vaginas
            if (this.vaginas.length == 0)
                return 0;
            var total;
            var bonus = 0;
            //Centaurs = +50 capacity
            if (this.lowerBody == 4)
                bonus = 50;
            //Naga = +20 capacity
            else if (this.lowerBody == 3)
                bonus = 20;
            //Wet pussy provides 20 point boost
            if (this.findPerk(PerkLib_1.PerkLib.WetPussy) >= 0)
                bonus += 20;
            if (this.findPerk(PerkLib_1.PerkLib.HistorySlut) >= 0)
                bonus += 20;
            if (this.findPerk(PerkLib_1.PerkLib.OneTrackMind) >= 0)
                bonus += 10;
            if (this.findPerk(PerkLib_1.PerkLib.Cornucopia) >= 0)
                bonus += 30;
            if (this.findPerk(PerkLib_1.PerkLib.FerasBoonWideOpen) >= 0)
                bonus += 25;
            if (this.findPerk(PerkLib_1.PerkLib.FerasBoonMilkingTwat) >= 0)
                bonus += 40;
            total = (bonus + this.statusAffectv1(StatusAffects_1.StatusAffects.BonusVCapacity) + 8 * this.vaginas[0].vaginalLooseness * this.vaginas[0].vaginalLooseness) * (1 + this.vaginas[0].vaginalWetness / 10);
            return total;
        }
        analCapacity() {
            var bonus = 0;
            //Centaurs = +30 capacity
            if (this.lowerBody == 4)
                bonus = 30;
            if (this.findPerk(PerkLib_1.PerkLib.HistorySlut) >= 0)
                bonus += 20;
            if (this.findPerk(PerkLib_1.PerkLib.Cornucopia) >= 0)
                bonus += 30;
            if (this.findPerk(PerkLib_1.PerkLib.OneTrackMind) >= 0)
                bonus += 10;
            if (this.ass.analWetness > 0)
                bonus += 15;
            return ((bonus + this.statusAffectv1(StatusAffects_1.StatusAffects.BonusACapacity) + 6 * this.ass.analLooseness * this.ass.analLooseness) * (1 + this.ass.analWetness / 10));
        }
        hasFuckableNipples() {
            var counter = this.breastRows.length;
            while (counter > 0) {
                counter--;
                if (this.breastRows[counter].fuckable)
                    return true;
            }
            return false;
        }
        hasBreasts() {
            if (this.breastRows.length > 0) {
                if (this.biggestTitSize() >= 1)
                    return true;
            }
            return false;
        }
        hasNipples() {
            var counter = this.breastRows.length;
            while (counter > 0) {
                counter--;
                if (this.breastRows[counter].nipplesPerBreast > 0)
                    return true;
            }
            return false;
        }
        lactationSpeed() {
            //Lactation * breastSize x 10 (milkPerBreast) determines scene
            return this.biggestLactation() * this.biggestTitSize() * 10;
        }
        //Hacky code till I can figure out how to move appearance code out.
        //TODO: Get rid of this 
        dogScore() {
            throw new Error("Not implemented. BAD");
        }
        //Hacky code till I can figure out how to move appearance code out.
        //TODO: Get rid of this
        foxScore() {
            throw new Error("Not implemented. BAD");
        }
        biggestLactation() {
            if (this.breastRows.length == 0)
                return 0;
            var counter = this.breastRows.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.breastRows[index].lactationMultiplier < this.breastRows[counter].lactationMultiplier)
                    index = counter;
            }
            return this.breastRows[index].lactationMultiplier;
        }
        milked() {
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.LactationReduction) >= 0)
                this.changeStatusValue(StatusAffects_1.StatusAffects.LactationReduction, 1, 0);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.LactationReduc0) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.LactationReduc0);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.LactationReduc1) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.LactationReduc1);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.LactationReduc2) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.LactationReduc2);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.LactationReduc3) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.LactationReduc3);
            if (this.findPerk(PerkLib_1.PerkLib.Feeder) >= 0) {
                //You've now been milked, reset the timer for that
                this.addStatusValue(StatusAffects_1.StatusAffects.Feeder, 1, 1);
                this.changeStatusValue(StatusAffects_1.StatusAffects.Feeder, 2, 0);
            }
        }
        boostLactation(todo) {
            if (this.breastRows.length == 0)
                return 0;
            var counter = this.breastRows.length;
            var index = 0;
            var changes = 0;
            var temp2 = 0;
            //Prevent lactation decrease if lactating.
            if (todo >= 0) {
                if (this.findStatusAffect(StatusAffects_1.StatusAffects.LactationReduction) >= 0)
                    this.changeStatusValue(StatusAffects_1.StatusAffects.LactationReduction, 1, 0);
                if (this.findStatusAffect(StatusAffects_1.StatusAffects.LactationReduc0) >= 0)
                    this.removeStatusAffect(StatusAffects_1.StatusAffects.LactationReduc0);
                if (this.findStatusAffect(StatusAffects_1.StatusAffects.LactationReduc1) >= 0)
                    this.removeStatusAffect(StatusAffects_1.StatusAffects.LactationReduc1);
                if (this.findStatusAffect(StatusAffects_1.StatusAffects.LactationReduc2) >= 0)
                    this.removeStatusAffect(StatusAffects_1.StatusAffects.LactationReduc2);
                if (this.findStatusAffect(StatusAffects_1.StatusAffects.LactationReduc3) >= 0)
                    this.removeStatusAffect(StatusAffects_1.StatusAffects.LactationReduc3);
            }
            if (todo > 0) {
                while (todo > 0) {
                    counter = this.breastRows.length;
                    todo -= .1;
                    while (counter > 0) {
                        counter--;
                        if (this.breastRows[index].lactationMultiplier > this.breastRows[counter].lactationMultiplier)
                            index = counter;
                    }
                    temp2 = .1;
                    if (this.breastRows[index].lactationMultiplier > 1.5)
                        temp2 /= 2;
                    if (this.breastRows[index].lactationMultiplier > 2.5)
                        temp2 /= 2;
                    if (this.breastRows[index].lactationMultiplier > 3)
                        temp2 /= 2;
                    changes += temp2;
                    this.breastRows[index].lactationMultiplier += temp2;
                }
            }
            else {
                while (todo < 0) {
                    counter = this.breastRows.length;
                    index = 0;
                    if (todo > -.1) {
                        while (counter > 0) {
                            counter--;
                            if (this.breastRows[index].lactationMultiplier < this.breastRows[counter].lactationMultiplier)
                                index = counter;
                        }
                        //trace(biggestLactation());
                        this.breastRows[index].lactationMultiplier += todo;
                        if (this.breastRows[index].lactationMultiplier < 0)
                            this.breastRows[index].lactationMultiplier = 0;
                        todo = 0;
                    }
                    else {
                        todo += .1;
                        while (counter > 0) {
                            counter--;
                            if (this.breastRows[index].lactationMultiplier < this.breastRows[counter].lactationMultiplier)
                                index = counter;
                        }
                        temp2 = todo;
                        changes += temp2;
                        this.breastRows[index].lactationMultiplier += temp2;
                        if (this.breastRows[index].lactationMultiplier < 0)
                            this.breastRows[index].lactationMultiplier = 0;
                    }
                }
            }
            return changes;
        }
        averageLactation() {
            if (this.breastRows.length == 0)
                return 0;
            var counter = this.breastRows.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                index += this.breastRows[counter].lactationMultiplier;
            }
            return Math.floor(index / this.breastRows.length);
        }
        //Calculate bonus virility rating!
        //anywhere from 5% to 100% of normal cum effectiveness thru herbs!
        virilityQ() {
            if (!this.hasCock())
                return 0;
            var percent = 0.01;
            if (this.cumQ() >= 250)
                percent += 0.01;
            if (this.cumQ() >= 800)
                percent += 0.01;
            if (this.cumQ() >= 1600)
                percent += 0.02;
            if (this.findPerk(PerkLib_1.PerkLib.BroBody) >= 0)
                percent += 0.05;
            if (this.findPerk(PerkLib_1.PerkLib.MaraesGiftStud) >= 0)
                percent += 0.15;
            if (this.findPerk(PerkLib_1.PerkLib.FerasBoonAlpha) >= 0)
                percent += 0.10;
            if (this.perkv1(PerkLib_1.PerkLib.ElvenBounty) > 0)
                percent += 0.05;
            if (this.findPerk(PerkLib_1.PerkLib.FertilityPlus) >= 0)
                percent += 0.03;
            if (this.findPerk(PerkLib_1.PerkLib.PiercedFertite) >= 0)
                percent += 0.03;
            if (this.findPerk(PerkLib_1.PerkLib.OneTrackMind) >= 0)
                percent += 0.03;
            if (this.findPerk(PerkLib_1.PerkLib.MagicalVirility) >= 0)
                percent += 0.05;
            //Messy Orgasms?
            if (this.findPerk(PerkLib_1.PerkLib.MessyOrgasms) >= 0)
                percent += 0.03;
            if (percent > 1)
                percent = 1;
            return percent;
        }
        //Calculate cum return
        cumQ() {
            if (!this.hasCock())
                return 0;
            var quantity = 0;
            //Base value is ballsize*ballQ*cumefficiency by a factor of 2.
            //Other things that affect it: 
            //lust - 50% = normal output.  0 = half output. 100 = +50% output.
            //trace("CUM ESTIMATE: " + int(1.25*2*cumMultiplier*2*(lust + 50)/10 * (hoursSinceCum+10)/24)/10 + "(no balls), " + int(ballSize*balls*cumMultiplier*2*(lust + 50)/10 * (hoursSinceCum+10)/24)/10 + "(withballs)");
            var lustCoefficient = (this.lust + 50) / 10;
            //Pilgrim's bounty maxxes lust coefficient
            if (this.findPerk(PerkLib_1.PerkLib.PilgrimsBounty) >= 0)
                lustCoefficient = 150 / 10;
            if (this.balls == 0)
                quantity = Math.floor(1.25 * 2 * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
            else
                quantity = Math.floor(this.ballSize * this.balls * this.cumMultiplier * 2 * lustCoefficient * (this.hoursSinceCum + 10) / 24) / 10;
            if (this.findPerk(PerkLib_1.PerkLib.BroBody) >= 0)
                quantity *= 1.3;
            if (this.findPerk(PerkLib_1.PerkLib.FertilityPlus) >= 0)
                quantity *= 1.5;
            if (this.findPerk(PerkLib_1.PerkLib.MessyOrgasms) >= 0)
                quantity *= 1.5;
            if (this.findPerk(PerkLib_1.PerkLib.OneTrackMind) >= 0)
                quantity *= 1.1;
            if (this.findPerk(PerkLib_1.PerkLib.MaraesGiftStud) >= 0)
                quantity += 350;
            if (this.findPerk(PerkLib_1.PerkLib.FerasBoonAlpha) >= 0)
                quantity += 200;
            if (this.findPerk(PerkLib_1.PerkLib.MagicalVirility) >= 0)
                quantity += 200;
            if (this.findPerk(PerkLib_1.PerkLib.FerasBoonSeeder) >= 0)
                quantity += 1000;
            //if(hasPerk("Elven Bounty") >= 0) quantity += 250;;
            quantity += this.perkv1(PerkLib_1.PerkLib.ElvenBounty);
            if (this.findPerk(PerkLib_1.PerkLib.BroBody) >= 0)
                quantity += 200;
            quantity += this.statusAffectv1(StatusAffects_1.StatusAffects.Rut);
            quantity *= (1 + (2 * this.perkv1(PerkLib_1.PerkLib.PiercedFertite)) / 100);
            //trace("Final Cum Volume: " + int(quantity) + "mLs.");
            //if (quantity < 0) trace("SOMETHING HORRIBLY WRONG WITH CUM CALCULATIONS");
            if (quantity < 2)
                quantity = 2;
            return quantity;
        }
        countCocksOfType(type) {
            if (this.cocks.length == 0)
                return 0;
            var counter = 0;
            for (var x = 0; x < this.cocks.length; x++) {
                if (this.cocks[x].cockType == type)
                    counter++;
            }
            return counter;
        }
        anemoneCocks() {
            return this.countCocksOfType(CockTypesEnum_1.CockTypesEnum.ANEMONE);
        }
        catCocks() {
            return this.countCocksOfType(CockTypesEnum_1.CockTypesEnum.CAT);
        }
        demonCocks() {
            return this.countCocksOfType(CockTypesEnum_1.CockTypesEnum.DEMON);
        }
        displacerCocks() {
            return this.countCocksOfType(CockTypesEnum_1.CockTypesEnum.DISPLACER);
        }
        // Note: DogCocks/FoxCocks are functionally identical. They actually change back and forth depending on some
        // of the PC's attributes, and this is recaluculated every hour spent at camp.
        // As such, delineating between the two is kind of silly.
        dogCocks() {
            if (this.cocks.length == 0)
                return 0;
            var counter = 0;
            for (var x = 0; x < this.cocks.length; x++) {
                if (this.cocks[x].cockType == CockTypesEnum_1.CockTypesEnum.DOG || this.cocks[x].cockType == CockTypesEnum_1.CockTypesEnum.FOX)
                    counter++;
            }
            return counter;
        }
        dragonCocks() {
            return this.countCocksOfType(CockTypesEnum_1.CockTypesEnum.DRAGON);
        }
        foxCocks() {
            return this.dogCocks();
        }
        horseCocks() {
            return this.countCocksOfType(CockTypesEnum_1.CockTypesEnum.HORSE);
        }
        kangaCocks() {
            return this.countCocksOfType(CockTypesEnum_1.CockTypesEnum.KANGAROO);
        }
        lizardCocks() {
            return this.countCocksOfType(CockTypesEnum_1.CockTypesEnum.LIZARD);
        }
        normalCocks() {
            return this.countCocksOfType(CockTypesEnum_1.CockTypesEnum.HUMAN);
        }
        tentacleCocks() {
            return this.countCocksOfType(CockTypesEnum_1.CockTypesEnum.TENTACLE);
        }
        findFirstCockType(ctype) {
            var index = 0;
            if (this.cocks[index].cockType == ctype)
                return index;
            while (index < this.cocks.length) {
                index++;
                if (this.cocks[index].cockType == ctype)
                    return index;
            }
            //trace("Creature.findFirstCockType ERROR - searched for cocktype: " + ctype + " and could not find it.");
            return 0;
        }
        /*public function findFirstCockType(type: number = 0): number
        {
        var  index: number = 0;
            if (cocks[index].cockType == type)
                return index;
            while (index < cocks.length)
            {
                index++;
                if (cocks[index].cockType == type)
                    return index;
            }
            //trace("Creature.findFirstCockType ERROR - searched for cocktype: " + type + " and could not find it.");
            return 0;
        }*/
        //Change first normal cock to horsecock!
        //Return number of affected cock, otherwise -1
        addHorseCock() {
            var counter = this.cocks.length;
            while (counter > 0) {
                counter--;
                //Human - > horse
                if (this.cocks[counter].cockType == CockTypesEnum_1.CockTypesEnum.HUMAN) {
                    this.cocks[counter].cockType = CockTypesEnum_1.CockTypesEnum.HORSE;
                    return counter;
                }
                //Dog - > horse
                if (this.cocks[counter].cockType == CockTypesEnum_1.CockTypesEnum.DOG) {
                    this.cocks[counter].cockType = CockTypesEnum_1.CockTypesEnum.HORSE;
                    return counter;
                }
                //Tentacle - > horse
                if (this.cocks[counter].cockType == CockTypesEnum_1.CockTypesEnum.TENTACLE) {
                    this.cocks[counter].cockType = CockTypesEnum_1.CockTypesEnum.HORSE;
                    return counter;
                }
                //Demon -> horse
                if (this.cocks[counter].cockType == CockTypesEnum_1.CockTypesEnum.DEMON) {
                    this.cocks[counter].cockType = CockTypesEnum_1.CockTypesEnum.HORSE;
                    return counter;
                }
                //Catch-all
                if (this.cocks[counter].cockType.Index > 4) {
                    this.cocks[counter].cockType = CockTypesEnum_1.CockTypesEnum.HORSE;
                    return counter;
                }
            }
            return -1;
        }
        //TODO Seriously wtf. 1500+ calls to cockTotal, 340+ call to totalCocks. I'm scared to touch either.
        //How many cocks?
        cockTotal() {
            return (this.cocks.length);
        }
        //Alternate
        totalCocks() {
            return (this.cocks.length);
        }
        //BOolean alternate
        hasCock() {
            return this.cocks.length >= 1;
        }
        hasSockRoom() {
            var index = this.cocks.length;
            while (index > 0) {
                index--;
                if (this.cocks[index].sock == "")
                    return true;
            }
            return false;
        }
        // Deprecated
        hasSock(arg = "") {
            var index = this.cocks.length;
            while (index > 0) {
                index--;
                if (this.cocks[index].sock != "") {
                    if (arg == "" || this.cocks[index].sock == arg)
                        return true;
                }
            }
            return false;
        }
        countCockSocks(type) {
            var count = 0;
            for (var i = 0; i < this.cocks.length; i++) {
                if (this.cocks[i].sock == type) {
                    count++;
                }
            }
            console_1.trace("countCockSocks found " + count + " " + type);
            return count;
        }
        canAutoFellate() {
            if (!this.hasCock())
                return false;
            return (this.cocks[0].cockLength >= 20);
        }
        //PC can fly?
        canFly() {
            //web also makes false!
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Web) >= 0)
                return false;
            return this._wingType == 2 || this._wingType == 7 || this._wingType == 9 || this._wingType == 11 || this._wingType == 12;
        }
        //check for vagoo
        hasVagina() {
            return this.vaginas.length > 0;
        }
        hasVirginVagina() {
            if (this.vaginas.length > 0)
                return this.vaginas[0].virgin;
            return false;
        }
        genderText(male = "man", female = "woman", futa = "herm", eunuch = "eunuch") {
            if (this.vaginas.length > 0) {
                if (this.cocks.length > 0)
                    return futa;
                return female;
            }
            else if (this.cocks.length > 0) {
                return male;
            }
            return eunuch;
        }
        manWoman(caps = false) {
            //Dicks?
            if (this.totalCocks() > 0) {
                if (this.hasVagina()) {
                    if (caps)
                        return "Futa";
                    else
                        return "futa";
                }
                else {
                    if (caps)
                        return "Man";
                    else
                        return "man";
                }
            }
            else {
                if (this.hasVagina()) {
                    if (caps)
                        return "Woman";
                    else
                        return "woman";
                }
                else {
                    if (caps)
                        return "Eunuch";
                    else
                        return "eunuch";
                }
            }
        }
        guyGirl(caps = false) {
            //Dicks?
            if (this.totalCocks() > 0) {
                if (this.hasVagina()) {
                    if (caps)
                        return "Girl";
                    else
                        return "girl";
                }
                else {
                    if (caps)
                        return "Guy";
                    else
                        return "guy";
                }
            }
            else {
                if (this.hasVagina()) {
                    if (caps)
                        return "Girl";
                    else
                        return "girl";
                }
                else {
                    if (this.biggestTitSize() >= 3) {
                        if (caps)
                            return "Girl";
                        else
                            return "girl";
                    }
                    if (caps)
                        return "Guy";
                    else
                        return "guy";
                }
            }
        }
        mfn(male, female, neuter) {
            if (this.gender == 0)
                return neuter;
            else
                return this.mf(male, female);
        }
        mf(male, female) {
            //Dicks?
            if (this.totalCocks() > 0) {
                if (this.hasVagina())
                    return female;
                else
                    return male;
            }
            else {
                if (this.hasVagina())
                    return female;
                else {
                    if (this.biggestTitSize() >= 3)
                        return female;
                    else
                        return male;
                }
            }
        }
        boyGirl(caps = false) {
            //Dicks?
            if (this.totalCocks() > 0) {
                if (this.hasVagina()) {
                    if (caps)
                        return "Girl";
                    else
                        return "girl";
                }
                else {
                    if (caps)
                        return "Boy";
                    else
                        return "boy";
                }
            }
            else {
                if (this.hasVagina()) {
                    if (caps)
                        return "Girl";
                    else
                        return "girl";
                }
                else {
                    if (this.biggestTitSize() >= 3) {
                        if (caps)
                            return "Girl";
                        else
                            return "girl";
                    }
                    if (caps)
                        return "Boy";
                    else
                        return "boy";
                }
            }
        }
        heShe(caps = false) {
            //Dicks?
            if (this.totalCocks() > 0) {
                if (this.hasVagina()) {
                    if (caps)
                        return "She";
                    else
                        return "she";
                }
                else {
                    if (caps)
                        return "He";
                    else
                        return "he";
                }
            }
            else {
                if (this.hasVagina()) {
                    if (caps)
                        return "She";
                    else
                        return "she";
                }
                else {
                    if (this.biggestTitSize() >= 3) {
                        if (caps)
                            return "She";
                        else
                            return "she";
                    }
                    if (caps)
                        return "It";
                    else
                        return "it";
                }
            }
        }
        himHer(caps = false) {
            //Dicks?
            if (this.totalCocks() > 0) {
                if (this.hasVagina()) {
                    if (caps)
                        return "Her";
                    else
                        return "her";
                }
                else {
                    if (caps)
                        return "Him";
                    else
                        return "him";
                }
            }
            else {
                if (this.hasVagina()) {
                    if (caps)
                        return "Her";
                    else
                        return "her";
                }
                else {
                    if (this.biggestTitSize() >= 3) {
                        if (caps)
                            return "Her";
                        else
                            return "her";
                    }
                    if (caps)
                        return "Him";
                    else
                        return "him";
                }
            }
        }
        maleFemale(caps = false) {
            //Dicks?
            if (this.totalCocks() > 0) {
                if (this.hasVagina()) {
                    if (caps)
                        return "Female";
                    else
                        return "female";
                }
                else {
                    if (caps)
                        return "Male";
                    else
                        return "male";
                }
            }
            else {
                if (this.hasVagina()) {
                    if (caps)
                        return "Female";
                    else
                        return "female";
                }
                else {
                    if (this.biggestTitSize() >= 3) {
                        if (caps)
                            return "Female";
                        else
                            return "female";
                    }
                    if (caps)
                        return "Male";
                    else
                        return "male";
                }
            }
        }
        hisHer(caps = false) {
            //Dicks?
            if (this.totalCocks() > 0) {
                if (this.hasVagina()) {
                    if (caps)
                        return "Her";
                    else
                        return "her";
                }
                else {
                    if (caps)
                        return "Him";
                    else
                        return "him";
                }
            }
            else {
                if (this.hasVagina()) {
                    if (caps)
                        return "Her";
                    else
                        return "her";
                }
                else {
                    if (this.biggestTitSize() >= 3) {
                        if (caps)
                            return "Her";
                        else
                            return "her";
                    }
                    if (caps)
                        return "Him";
                    else
                        return "him";
                }
            }
        }
        //sir/madam
        sirMadam(caps = false) {
            //Dicks?
            if (this.totalCocks() > 0) {
                //herm
                if (this.hasVagina()) {
                    //Boy unless has tits!
                    if (this.biggestTitSize() >= 2) {
                        if (caps)
                            return "Madam";
                        else
                            return "madam";
                    }
                    else {
                        if (caps)
                            return "Sir";
                        else
                            return "sir";
                    }
                }
                //Dude
                else {
                    if (caps)
                        return "Sir";
                    else
                        return "sir";
                }
            }
            //No dicks
            else {
                //Girl
                if (this.hasVagina()) {
                    if (caps)
                        return "Madam";
                    else
                        return "madam";
                }
                //Eunuch!
                else {
                    //Called girl if has tits!
                    if (this.biggestTitSize() >= 2) {
                        if (caps)
                            return "Madam";
                        else
                            return "madam";
                    }
                    //Called dude with no tits
                    else {
                        if (caps)
                            return "Sir";
                        else
                            return "sir";
                    }
                }
            }
        }
        //Create a cock. Default type is HUMAN
        createCock(clength = 5.5, cthickness = 1, ctype) {
            if (ctype == undefined)
                ctype = CockTypesEnum_1.CockTypesEnum.HUMAN;
            if (this.cocks.length >= 10)
                return false;
            var newCock = new Cock_1.Cock(clength, cthickness, ctype);
            //var newCock:cockClass = new cockClass();
            this.cocks.push(newCock);
            this.cocks[this.cocks.length - 1].cockThickness = cthickness;
            this.cocks[this.cocks.length - 1].cockLength = clength;
            return true;
        }
        //create vagoo
        createVagina(virgin = true, vaginalWetness = 1, vaginalLooseness = 0) {
            if (this.vaginas.length >= 2)
                return false;
            var newVagina = new VaginaClass_1.VaginaClass(vaginalWetness, vaginalLooseness, virgin);
            this.vaginas.push(newVagina);
            return true;
        }
        //create a row of breasts
        createBreastRow(size = 0, nipplesPerBreast = 1) {
            if (this.breastRows.length >= 10)
                return false;
            var newBreastRow = new BreastRowClass_1.BreastRowClass();
            newBreastRow.breastRating = size;
            newBreastRow.nipplesPerBreast = nipplesPerBreast;
            this.breastRows.push(newBreastRow);
            return true;
        }
        genderCheck() {
            if (this.hasCock() && this.hasVagina())
                this.gender = appearanceDefs_1.GENDER_HERM;
            else if (this.hasCock())
                this.gender = appearanceDefs_1.GENDER_MALE;
            else if (this.hasVagina())
                this.gender = appearanceDefs_1.GENDER_FEMALE;
            else
                this.gender = appearanceDefs_1.GENDER_NONE;
        }
        //Remove cocks
        removeCock(arraySpot, totalRemoved) {
            //Various Errors preventing action
            if (arraySpot < 0 || totalRemoved <= 0) {
                //trace("ERROR: removeCock called but arraySpot is negative or totalRemoved is 0.");
                return;
            }
            if (this.cocks.length == 0) {
                //trace("ERROR: removeCock called but cocks do not exist.");
            }
            else {
                if (arraySpot > this.cocks.length - 1) {
                    //trace("ERROR: removeCock failed - array location is beyond the bounds of the array.");
                }
                else {
                    try {
                        var cock = this.cocks[arraySpot];
                        if (cock.sock == "viridian") {
                            this.removePerk(PerkLib_1.PerkLib.LustyRegeneration);
                        }
                        else if (cock.sock == "cockring") {
                            var numRings = 0;
                            for (var i = 0; i < this.cocks.length; i++) {
                                if (this.cocks[i].sock == "cockring")
                                    numRings++;
                            }
                            if (numRings == 0)
                                this.removePerk(PerkLib_1.PerkLib.PentUp);
                            else
                                this.setPerkValue(PerkLib_1.PerkLib.PentUp, 1, 5 + (numRings * 5));
                        }
                        this.cocks.splice(arraySpot, totalRemoved);
                    }
                    catch (e) {
                        console_1.trace("Argument error in Creature[" + this._short + "]: " + e.message);
                    }
                    //trace("Attempted to remove " + totalRemoved + " cocks.");
                }
            }
            this.genderCheck();
        }
        //REmove vaginas
        removeVagina(arraySpot = 0, totalRemoved = 1) {
            //Various Errors preventing action
            if (arraySpot < -1 || totalRemoved <= 0) {
                //trace("ERROR: removeVagina called but arraySpot is negative or totalRemoved is 0.");
                return;
            }
            if (this.vaginas.length == 0) {
                //trace("ERROR: removeVagina called but cocks do not exist.");
            }
            else {
                if (arraySpot > this.vaginas.length - 1) {
                    //trace("ERROR: removeVagina failed - array location is beyond the bounds of the array.");
                }
                else {
                    this.vaginas.splice(arraySpot, totalRemoved);
                    //trace("Attempted to remove " + totalRemoved + " vaginas.");
                }
            }
            this.genderCheck();
        }
        //Remove a breast row
        removeBreastRow(arraySpot, totalRemoved) {
            //Various Errors preventing action
            if (arraySpot < -1 || totalRemoved <= 0) {
                //trace("ERROR: removeBreastRow called but arraySpot is negative or totalRemoved is 0.");
                return;
            }
            if (this.breastRows.length == 0) {
                //trace("ERROR: removeBreastRow called but cocks do not exist.");
            }
            else if (this.breastRows.length == 1 || this.breastRows.length - totalRemoved < 1) {
                //trace("ERROR: Removing the current breast row would break the Creature classes assumptions about breastRow contents.");
            }
            else {
                if (arraySpot > this.breastRows.length - 1) {
                    //trace("ERROR: removeBreastRow failed - array location is beyond the bounds of the array.");
                }
                else {
                    this.breastRows.splice(arraySpot, totalRemoved);
                    //trace("Attempted to remove " + totalRemoved + " breastRows.");
                }
            }
        }
        // This is placeholder shit whilst I work out a good way of BURNING ENUM TO THE FUCKING GROUND
        // and replacing it with something that will slot in and work with minimal changes and not be
        // A FUCKING SHITSTAIN when it comes to intelligent de/serialization.
        // public fixFuckingCockTypesEnum(): void {
        //     if (this.cocks.length > 0) {
        //         for (var i: number = 0; i < this.cocks.length; i++) {
        //             this.cocks[i].cockType = CockTypesEnum.ParseConstantByIndex(this.cocks[i].cockType.Index);
        //         }
        //     }
        // }
        buttChangeNoDisplay(cArea) {
            var stretched = false;
            //cArea > capacity = autostreeeeetch half the time.
            if (cArea >= this.analCapacity() && Creature.rand(2) == 0) {
                if (this.ass.analLooseness >= 5) { }
                else
                    this.ass.analLooseness++;
                stretched = true;
                //Reset butt stretchin recovery time
                if (this.findStatusAffect(StatusAffects_1.StatusAffects.ButtStretched) >= 0)
                    this.changeStatusValue(StatusAffects_1.StatusAffects.ButtStretched, 1, 0);
            }
            //If within top 10% of capacity, 25% stretch
            if (cArea < this.analCapacity() && cArea >= .9 * this.analCapacity() && Creature.rand(4) == 0) {
                this.ass.analLooseness++;
                stretched = true;
            }
            //if within 75th to 90th percentile, 10% stretch
            if (cArea < .9 * this.analCapacity() && cArea >= .75 * this.analCapacity() && Creature.rand(10) == 0) {
                this.ass.analLooseness++;
                stretched = true;
            }
            //Anti-virgin
            if (this.ass.analLooseness == 0) {
                this.ass.analLooseness++;
                stretched = true;
            }
            //Delay un-stretching
            if (cArea >= .5 * this.analCapacity()) {
                //Butt Stretched used to determine how long since last enlargement
                if (this.findStatusAffect(StatusAffects_1.StatusAffects.ButtStretched) < 0)
                    this.createStatusAffect(StatusAffects_1.StatusAffects.ButtStretched, 0, 0, 0, 0);
                //Reset the timer on it to 0 when restretched.
                else
                    this.changeStatusValue(StatusAffects_1.StatusAffects.ButtStretched, 1, 0);
            }
            if (stretched) {
                console_1.trace("BUTT STRETCHED TO " + (this.ass.analLooseness) + ".");
            }
            return stretched;
        }
        cuntChangeNoDisplay(cArea) {
            if (this.vaginas.length == 0)
                return false;
            var stretched = false;
            if (this.findPerk(PerkLib_1.PerkLib.FerasBoonMilkingTwat) < 0 || this.vaginas[0].vaginalLooseness <= appearanceDefs_1.VAGINA_LOOSENESS_NORMAL) {
                //cArea > capacity = autostreeeeetch.
                if (cArea >= this.vaginalCapacity()) {
                    if (this.vaginas[0].vaginalLooseness >= appearanceDefs_1.VAGINA_LOOSENESS_LEVEL_CLOWN_CAR) { }
                    else
                        this.vaginas[0].vaginalLooseness++;
                    stretched = true;
                }
                //If within top 10% of capacity, 50% stretch
                else if (cArea >= .9 * this.vaginalCapacity() && Creature.rand(2) == 0) {
                    this.vaginas[0].vaginalLooseness++;
                    stretched = true;
                }
                //if within 75th to 90th percentile, 25% stretch
                else if (cArea >= .75 * this.vaginalCapacity() && Creature.rand(4) == 0) {
                    this.vaginas[0].vaginalLooseness++;
                    stretched = true;
                }
            }
            //If virgin
            if (this.vaginas[0].virgin) {
                this.vaginas[0].virgin = false;
            }
            //Delay anti-stretching
            if (cArea >= .5 * this.vaginalCapacity()) {
                //Cunt Stretched used to determine how long since last enlargement
                if (this.findStatusAffect(StatusAffects_1.StatusAffects.CuntStretched) < 0)
                    this.createStatusAffect(StatusAffects_1.StatusAffects.CuntStretched, 0, 0, 0, 0);
                //Reset the timer on it to 0 when restretched.
                else
                    this.changeStatusValue(StatusAffects_1.StatusAffects.CuntStretched, 1, 0);
            }
            if (stretched) {
                console_1.trace("CUNT STRETCHED TO " + (this.vaginas[0].vaginalLooseness) + ".");
            }
            return stretched;
        }
        get inHeat() {
            return this.findStatusAffect(StatusAffects_1.StatusAffects.Heat) >= 0;
        }
        get inRut() {
            return this.findStatusAffect(StatusAffects_1.StatusAffects.Rut) >= 0;
        }
        bonusFertility() {
            var counter = 0;
            if (this.inHeat)
                counter += this.statusAffectv1(StatusAffects_1.StatusAffects.Heat);
            if (this.findPerk(PerkLib_1.PerkLib.FertilityPlus) >= 0)
                counter += 15;
            if (this.findPerk(PerkLib_1.PerkLib.MaraesGiftFertility) >= 0)
                counter += 50;
            if (this.findPerk(PerkLib_1.PerkLib.FerasBoonBreedingBitch) >= 0)
                counter += 30;
            if (this.findPerk(PerkLib_1.PerkLib.MagicalFertility) >= 0)
                counter += 10;
            counter += this.perkv2(PerkLib_1.PerkLib.ElvenBounty);
            counter += this.perkv1(PerkLib_1.PerkLib.PiercedFertite);
            return counter;
        }
        totalFertility() {
            return (this.bonusFertility() + this.fertility);
        }
        isBiped() {
            //Naga/Centaur
            if (this.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_NAGA || this.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_CENTAUR)
                return false;
            if (this.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_GOO || this.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_PONY)
                return false;
            return true;
        }
        isNaga() {
            if (this.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_NAGA)
                return true;
            return false;
        }
        isTaur() {
            if (this.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_CENTAUR || this.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_PONY)
                return true;
            return false;
        }
        isDrider() {
            return (this.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_DRIDER_LOWER_BODY);
        }
        isGoo() {
            if (this.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_GOO)
                return true;
            return false;
        }
        legs() {
            var select = 0;
            //lowerBody:
            //0 - normal
            if (this.lowerBody == 0)
                return "legs";
            //1 - hooves
            if (this.lowerBody == 1)
                return "legs";
            //2 - paws
            if (this.lowerBody == 2)
                return "legs";
            //3 - snakelike body
            if (this.lowerBody == 3)
                return "snake-like coils";
            //4 - centaur!
            if (this.lowerBody == 4)
                return "four legs";
            //8 - goo shit
            if (this.lowerBody == 8)
                return "mounds of goo";
            //PONY
            if (this.lowerBody == 11)
                return "cute pony-legs";
            //Bunnah!
            if (this.lowerBody == 12) {
                select = Math.floor(Math.random() * (5));
                if (select == 0)
                    return "fuzzy, bunny legs";
                else if (select == 1)
                    return "fur-covered legs";
                else if (select == 2)
                    return "furry legs";
                else
                    return "legs";
            }
            if (this.lowerBody == 13) {
                select = Math.floor(Math.random() * (5));
                if (select == 0)
                    return "bird-like legs";
                else if (select == 1)
                    return "feathered legs";
                else
                    return "legs";
            }
            if (this.lowerBody == 17) {
                select = Math.floor(Math.random() * (4));
                if (select == 0)
                    return "fox-like legs";
                else if (select == 1)
                    return "legs";
                else if (select == 2)
                    return "legs";
                else
                    return "vulpine legs";
            }
            if (this.lowerBody == 19) {
                select = Math.floor(Math.random() * (4));
                if (select == 0)
                    return "raccoon-like legs";
                else
                    return "legs";
            }
            return "legs";
        }
        skinFurScales() {
            var skinzilla = "";
            //Adjectives first!
            if (this.skinAdj != "")
                skinzilla += this.skinAdj + ", ";
            //Fur handled a little differently since it uses
            //haircolor
            if (this._skinType == 1)
                skinzilla += this.hairColor + " ";
            else
                skinzilla += this._skinTone + " ";
            skinzilla += this.skinDesc;
            return skinzilla;
        }
        leg() {
            var select = 0;
            //lowerBody:
            //0 - normal
            if (this.lowerBody == 0)
                return "leg";
            //1 - hooves
            if (this.lowerBody == 1)
                return "leg";
            //2 - paws
            if (this.lowerBody == 2)
                return "leg";
            //3 - snakelike body
            if (this.lowerBody == 3)
                return "snake-tail";
            //4 - centaur!
            if (this.lowerBody == 4)
                return "equine leg";
            //8 - goo shit
            if (this.lowerBody == 8)
                return "mound of goo";
            //PONY
            if (this.lowerBody == 11)
                return "cartoonish pony-leg";
            //BUNNAH
            if (this.lowerBody == 12) {
                select = Math.random() * (5);
                if (select == 0)
                    return "fuzzy, bunny leg";
                else if (select == 1)
                    return "fur-covered leg";
                else if (select == 2)
                    return "furry leg";
                else
                    return "leg";
            }
            if (this.lowerBody == 13) {
                select = Math.floor(Math.random() * (5));
                if (select == 0)
                    return "bird-like leg";
                else if (select == 1)
                    return "feathered leg";
                else
                    return "leg";
            }
            if (this.lowerBody == 17) {
                select = Math.floor(Math.random() * (4));
                if (select == 0)
                    return "fox-like leg";
                else if (select == 1)
                    return "leg";
                else if (select == 2)
                    return "leg";
                else
                    return "vulpine leg";
            }
            if (this.lowerBody == 19) {
                select = Math.floor(Math.random() * (4));
                if (select == 0)
                    return "raccoon-like leg";
                else
                    return "leg";
            }
            return "leg";
        }
        feet() {
            var select = 0;
            //lowerBody:
            //0 - normal
            if (this.lowerBody == 0)
                return "feet";
            //1 - hooves
            if (this.lowerBody == 1)
                return "hooves";
            //2 - paws
            if (this.lowerBody == 2)
                return "paws";
            //3 - snakelike body
            if (this.lowerBody == 3)
                return "coils";
            //4 - centaur!
            if (this.lowerBody == 4)
                return "hooves";
            //5 - demonic heels
            if (this.lowerBody == 5)
                return "demonic high-heels";
            //6 - demonic claws
            if (this.lowerBody == 6)
                return "demonic foot-claws";
            //8 - goo shit
            if (this.lowerBody == 8)
                return "slimey cillia";
            if (this.lowerBody == 11)
                return "flat pony-feet";
            //BUNNAH
            if (this.lowerBody == 12) {
                select = Creature.rand(5);
                if (select == 0)
                    return "large bunny feet";
                else if (select == 1)
                    return "rabbit feet";
                else if (select == 2)
                    return "large feet";
                else
                    return "feet";
            }
            if (this.lowerBody == 13) {
                select = Math.floor(Math.random() * (5));
                if (select == 0)
                    return "taloned feet";
                else
                    return "feet";
            }
            if (this.lowerBody == 14)
                return "foot-paws";
            if (this.lowerBody == 17) {
                select = Creature.rand(4);
                if (select == 0)
                    return "paws";
                else if (select == 1)
                    return "soft, padded paws";
                else if (select == 2)
                    return "fox-like feet";
                else
                    return "paws";
            }
            if (this.lowerBody == 19) {
                select = Math.floor(Math.random() * (3));
                if (select == 0)
                    return "raccoon-like feet";
                else if (select == 1)
                    return "long-toed paws";
                else if (select == 2)
                    return "feet";
                else
                    return "paws";
            }
            return "feet";
        }
        foot() {
            var select = 0;
            //lowerBody:
            //0 - normal
            if (this.lowerBody == 0)
                return "foot";
            //1 - hooves
            if (this.lowerBody == 1)
                return "hoof";
            //2 - paws
            if (this.lowerBody == 2)
                return "paw";
            //3 - snakelike body
            if (this.lowerBody == 3)
                return "coiled tail";
            //4 - centaur!
            if (this.lowerBody == 4)
                return "hoof";
            //8 - goo shit
            if (this.lowerBody == 8)
                return "slimey undercarriage";
            //PONY
            if (this.lowerBody == 11)
                return "flat pony-foot";
            //BUNNAH
            if (this.lowerBody == 12) {
                select = Math.random() * (5);
                if (select == 0)
                    return "large bunny foot";
                else if (select == 1)
                    return "rabbit foot";
                else if (select == 2)
                    return "large foot";
                else
                    return "foot";
            }
            if (this.lowerBody == 13) {
                select = Math.floor(Math.random() * (5));
                if (select == 0)
                    return "taloned foot";
                else
                    return "foot";
            }
            if (this.lowerBody == 17) {
                select = Math.floor(Math.random() * (4));
                if (select == 0)
                    return "paw";
                else if (select == 1)
                    return "soft, padded paw";
                else if (select == 2)
                    return "fox-like foot";
                else
                    return "paw";
            }
            if (this.lowerBody == 14)
                return "foot-paw";
            if (this.lowerBody == 19) {
                select = Math.floor(Math.random() * (3));
                if (select == 0)
                    return "raccoon-like foot";
                else if (select == 1)
                    return "long-toed paw";
                else if (select == 2)
                    return "foot";
                else
                    return "paw";
            }
            return "foot";
        }
        canOvipositSpider() {
            if (this.eggs() >= 10 && this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) >= 0 && this.isDrider() && this.tailType == 5)
                return true;
            return false;
        }
        canOvipositBee() {
            if (this.eggs() >= 10 && this.findPerk(PerkLib_1.PerkLib.BeeOvipositor) >= 0 && this.tailType == 6)
                return true;
            return false;
        }
        canOviposit() {
            if (this.canOvipositSpider() || this.canOvipositBee())
                return true;
            return false;
        }
        eggs() {
            if (this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib_1.PerkLib.BeeOvipositor) < 0)
                return -1;
            else if (this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) >= 0)
                return this.perkv1(PerkLib_1.PerkLib.SpiderOvipositor);
            else
                return this.perkv1(PerkLib_1.PerkLib.BeeOvipositor);
        }
        addEggs(arg = 0) {
            if (this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib_1.PerkLib.BeeOvipositor) < 0)
                return -1;
            else {
                if (this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) >= 0) {
                    this.addPerkValue(PerkLib_1.PerkLib.SpiderOvipositor, 1, arg);
                    if (this.eggs() > 50)
                        this.setPerkValue(PerkLib_1.PerkLib.SpiderOvipositor, 1, 50);
                    return this.perkv1(PerkLib_1.PerkLib.SpiderOvipositor);
                }
                else {
                    this.addPerkValue(PerkLib_1.PerkLib.BeeOvipositor, 1, arg);
                    if (this.eggs() > 50)
                        this.setPerkValue(PerkLib_1.PerkLib.BeeOvipositor, 1, 50);
                    return this.perkv1(PerkLib_1.PerkLib.BeeOvipositor);
                }
            }
        }
        dumpEggs() {
            if (this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib_1.PerkLib.BeeOvipositor) < 0)
                return;
            this.setEggs(0);
            //Sets fertile eggs = regular eggs (which are 0)
            this.fertilizeEggs();
        }
        setEggs(arg = 0) {
            if (this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib_1.PerkLib.BeeOvipositor) < 0)
                return -1;
            else {
                if (this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) >= 0) {
                    this.setPerkValue(PerkLib_1.PerkLib.SpiderOvipositor, 1, arg);
                    if (this.eggs() > 50)
                        this.setPerkValue(PerkLib_1.PerkLib.SpiderOvipositor, 1, 50);
                    return this.perkv1(PerkLib_1.PerkLib.SpiderOvipositor);
                }
                else {
                    this.setPerkValue(PerkLib_1.PerkLib.BeeOvipositor, 1, arg);
                    if (this.eggs() > 50)
                        this.setPerkValue(PerkLib_1.PerkLib.BeeOvipositor, 1, 50);
                    return this.perkv1(PerkLib_1.PerkLib.BeeOvipositor);
                }
            }
        }
        fertilizedEggs() {
            if (this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib_1.PerkLib.BeeOvipositor) < 0)
                return -1;
            else if (this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) >= 0)
                return this.perkv2(PerkLib_1.PerkLib.SpiderOvipositor);
            else
                return this.perkv2(PerkLib_1.PerkLib.BeeOvipositor);
        }
        fertilizeEggs() {
            if (this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) < 0 && this.findPerk(PerkLib_1.PerkLib.BeeOvipositor) < 0)
                return -1;
            else if (this.findPerk(PerkLib_1.PerkLib.SpiderOvipositor) >= 0)
                this.setPerkValue(PerkLib_1.PerkLib.SpiderOvipositor, 2, this.eggs());
            else
                this.setPerkValue(PerkLib_1.PerkLib.BeeOvipositor, 2, this.eggs());
            return this.fertilizedEggs();
        }
        breastCup(rowNum) {
            return Appearance_1.Appearance.breastCup(this.breastRows[rowNum].breastRating);
            //Should change this to make use of Appearance			return BreastStore.cupSize(breastRows[rowNum].breastRating);
            /*
            if (breastRows[rowNum].breastRating < 1)
                return "flat, manly breast";
            else if (breastRows[rowNum].breastRating < 2)
                return "A-cup";
            else if (breastRows[rowNum].breastRating < 3)
                return "B-cup";
            else if (breastRows[rowNum].breastRating < 4)
                return "C-cup";
            else if (breastRows[rowNum].breastRating < 5)
                return "D-cup";
            else if (breastRows[rowNum].breastRating < 6)
                return "DD-cup";
            else if (breastRows[rowNum].breastRating < 7)
                return "big DD-cup";
            else if (breastRows[rowNum].breastRating < 8)
                return "E-cup";
            else if (breastRows[rowNum].breastRating < 9)
                return "big E-cup";
            else if (breastRows[rowNum].breastRating < 10)
                return "EE-cup";
            else if (breastRows[rowNum].breastRating < 11)
                return "big EE-cup";
            else if (breastRows[rowNum].breastRating < 12)
                return "F-cup";
            else if (breastRows[rowNum].breastRating < 13)
                return "big F-cup";
            else if (breastRows[rowNum].breastRating < 14)
                return "FF-cup";
            else if (breastRows[rowNum].breastRating < 15)
                return "big FF-cup";
            else if (breastRows[rowNum].breastRating < 16)
                return "G-cup";
            else if (breastRows[rowNum].breastRating < 17)
                return "big G-cup";
            else if (breastRows[rowNum].breastRating < 18)
                return "GG-cup";
            else if (breastRows[rowNum].breastRating < 19)
                return "big GG-cup";
            else if (breastRows[rowNum].breastRating < 20)
                return "H-cup";
            else if (breastRows[rowNum].breastRating < 21)
                return "big H-cup";
            else if (breastRows[rowNum].breastRating < 22)
                return "HH-cup";
            else if (breastRows[rowNum].breastRating < 23)
                return "big HH-cup";
            else if (breastRows[rowNum].breastRating < 24)
                return "HHH-cup";
            else if (breastRows[rowNum].breastRating < 25)
                return "I-cup";
            else if (breastRows[rowNum].breastRating < 26)
                return "big I-cup";
            else if (breastRows[rowNum].breastRating < 27)
                return "II-cup";
            else if (breastRows[rowNum].breastRating < 28)
                return "big II-cup";
            else if (breastRows[rowNum].breastRating < 29)
                return "J-cup";
            else if (breastRows[rowNum].breastRating < 30)
                return "big J-cup";
            else if (breastRows[rowNum].breastRating < 31)
                return "JJ-cup";
            else if (breastRows[rowNum].breastRating < 32)
                return "big JJ-cup";
            else if (breastRows[rowNum].breastRating < 33)
                return "K-cup";
            else if (breastRows[rowNum].breastRating < 34)
                return "big K-cup";
            else if (breastRows[rowNum].breastRating < 35)
                return "KK-cup";
            else if (breastRows[rowNum].breastRating < 36)
                return "big KK-cup";
            else if (breastRows[rowNum].breastRating < 37)
                return "L-cup";
            else if (breastRows[rowNum].breastRating < 38)
                return "big L-cup";
            else if (breastRows[rowNum].breastRating < 39)
                return "LL-cup";
            else if (breastRows[rowNum].breastRating < 40)
                return "big LL-cup";
            else if (breastRows[rowNum].breastRating < 41)
                return "M-cup";
            else if (breastRows[rowNum].breastRating < 42)
                return "big M-cup";
            else if (breastRows[rowNum].breastRating < 43)
                return "MM-cup";
            else if (breastRows[rowNum].breastRating < 44)
                return "big MM-cup";
            else if (breastRows[rowNum].breastRating < 45)
                return "MMM-cup";
            else if (breastRows[rowNum].breastRating < 46)
                return "large MMM-cup";
            else if (breastRows[rowNum].breastRating < 47)
                return "N-cup";
            else if (breastRows[rowNum].breastRating < 48)
                return "large N-cup";
            else if (breastRows[rowNum].breastRating < 49)
                return "NN-cup";
            else if (breastRows[rowNum].breastRating < 50)
                return "large NN-cup";
            else if (breastRows[rowNum].breastRating < 51)
                return "O-cup";
            else if (breastRows[rowNum].breastRating < 52)
                return "large O-cup";
            else if (breastRows[rowNum].breastRating < 53)
                return "OO-cup";
            else if (breastRows[rowNum].breastRating < 54)
                return "large OO-cup";
            else if (breastRows[rowNum].breastRating < 55)
                return "P-cup";
            else if (breastRows[rowNum].breastRating < 56)
                return "large P-cup";
            else if (breastRows[rowNum].breastRating < 57)
                return "PP-cup";
            else if (breastRows[rowNum].breastRating < 58)
                return "large PP-cup";
            else if (breastRows[rowNum].breastRating < 59)
                return "Q-cup";
            else if (breastRows[rowNum].breastRating < 60)
                return "large Q-cup";
            else if (breastRows[rowNum].breastRating < 61)
                return "QQ-cup";
            else if (breastRows[rowNum].breastRating < 62)
                return "large QQ-cup";
            else if (breastRows[rowNum].breastRating < 63)
                return "R-cup";
            else if (breastRows[rowNum].breastRating < 64)
                return "large R-cup";
            else if (breastRows[rowNum].breastRating < 65)
                return "RR-cup";
            else if (breastRows[rowNum].breastRating < 66)
                return "large RR-cup";
            else if (breastRows[rowNum].breastRating < 67)
                return "S-cup";
            else if (breastRows[rowNum].breastRating < 68)
                return "large S-cup";
            else if (breastRows[rowNum].breastRating < 69)
                return "SS-cup";
            else if (breastRows[rowNum].breastRating < 70)
                return "large SS-cup";
            else if (breastRows[rowNum].breastRating < 71)
                return "T-cup";
            else if (breastRows[rowNum].breastRating < 72)
                return "large T-cup";
            else if (breastRows[rowNum].breastRating < 73)
                return "TT-cup";
            else if (breastRows[rowNum].breastRating < 74)
                return "large TT-cup";
            else if (breastRows[rowNum].breastRating < 75)
                return "U-cup";
            else if (breastRows[rowNum].breastRating < 76)
                return "large U-cup";
            else if (breastRows[rowNum].breastRating < 77)
                return "UU-cup";
            else if (breastRows[rowNum].breastRating < 78)
                return "large UU-cup";
            else if (breastRows[rowNum].breastRating < 79)
                return "V-cup";
            else if (breastRows[rowNum].breastRating < 80)
                return "large V-cup";
            else if (breastRows[rowNum].breastRating < 81)
                return "VV-cup";
            else if (breastRows[rowNum].breastRating < 82)
                return "large VV-cup";
            else if (breastRows[rowNum].breastRating < 83)
                return "W-cup";
            else if (breastRows[rowNum].breastRating < 84)
                return "large W-cup";
            else if (breastRows[rowNum].breastRating < 85)
                return "WW-cup";
            else if (breastRows[rowNum].breastRating < 86)
                return "large WW-cup";
            else if (breastRows[rowNum].breastRating < 87)
                return "X-cup";
            else if (breastRows[rowNum].breastRating < 88)
                return "large X-cup";
            else if (breastRows[rowNum].breastRating < 89)
                return "XX-cup";
            else if (breastRows[rowNum].breastRating < 90)
                return "large XX-cup";
            else if (breastRows[rowNum].breastRating < 91)
                return "Y-cup";
            else if (breastRows[rowNum].breastRating < 92)
                return "large Y-cup";
            else if (breastRows[rowNum].breastRating < 93)
                return "YY-cup";
            else if (breastRows[rowNum].breastRating < 94)
                return "large YY-cup";
            else if (breastRows[rowNum].breastRating < 95)
                return "Z-cup";
            else if (breastRows[rowNum].breastRating < 96)
                return "large Z-cup";
            else if (breastRows[rowNum].breastRating < 97)
                return "ZZ-cup";
            else if (breastRows[rowNum].breastRating < 98)
                return "large ZZ-cup";
            else if (breastRows[rowNum].breastRating < 99)
                return "ZZZ-cup";
            else if (breastRows[rowNum].breastRating < 100)
                return "large ZZZ-cup";
            // else if(breastRows[rowNum].breastRating < 20) return "watermelon-sized cup";
            // else if(breastRows[rowNum].breastRating < 35) return "tent-sized cup";
            // else if(breastRows[rowNum].breastRating < 60) return "truck-sized cup";
            // else if(breastRows[rowNum].breastRating < 100) return "parachute-sized cup";
            else
                return "game-breaking cup";
            return "Error-Cup (breastSize Error Number: " + breastRows[rowNum].breastRating;
            //watermelon-sized
            //tent sized
            //truck sized
            //parachute sized
            //pool-sized
            //hanger-sized
            //town-sized
            //city-sized
            //state-sized
            //continent-sized
            //planet-sized
            //WTFISTHISWHYISNTITGAMEOVER?
            */
        }
        bRows() {
            return this.breastRows.length;
        }
        totalBreasts() {
            var counter = this.breastRows.length;
            var total = 0;
            while (counter > 0) {
                counter--;
                total += this.breastRows[counter].breasts;
            }
            return total;
        }
        totalNipples() {
            var counter = this.breastRows.length;
            var total = 0;
            while (counter > 0) {
                counter--;
                total += this.breastRows[counter].nipplesPerBreast * this.breastRows[counter].breasts;
            }
            return total;
        }
        smallestTitSize() {
            if (this.breastRows.length == 0)
                return -1;
            var counter = this.breastRows.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.breastRows[index].breastRating > this.breastRows[counter].breastRating)
                    index = counter;
            }
            return this.breastRows[index].breastRating;
        }
        smallestTitRow() {
            if (this.breastRows.length == 0)
                return -1;
            var counter = this.breastRows.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.breastRows[index].breastRating > this.breastRows[counter].breastRating)
                    index = counter;
            }
            return index;
        }
        biggestTitRow() {
            var counter = this.breastRows.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.breastRows[index].breastRating < this.breastRows[counter].breastRating)
                    index = counter;
            }
            return index;
        }
        averageBreastSize() {
            var counter = this.breastRows.length;
            var average = 0;
            while (counter > 0) {
                counter--;
                average += this.breastRows[counter].breastRating;
            }
            if (this.breastRows.length == 0)
                return 0;
            return (average / this.breastRows.length);
        }
        averageCockThickness() {
            var counter = this.cocks.length;
            var average = 0;
            while (counter > 0) {
                counter--;
                average += this.cocks[counter].cockThickness;
            }
            if (this.cocks.length == 0)
                return 0;
            return (average / this.cocks.length);
        }
        averageNippleLength() {
            var counter = this.breastRows.length;
            var average = 0;
            while (counter > 0) {
                counter--;
                average += (this.breastRows[counter].breastRating / 10 + .2);
            }
            return (average / this.breastRows.length);
        }
        averageVaginalLooseness() {
            var counter = this.vaginas.length;
            var average = 0;
            //If the player has no vaginas
            if (this.vaginas.length == 0)
                return 2;
            while (counter > 0) {
                counter--;
                average += this.vaginas[counter].vaginalLooseness;
            }
            return (average / this.vaginas.length);
        }
        averageVaginalWetness() {
            //If the player has no vaginas
            if (this.vaginas.length == 0)
                return 2;
            var counter = this.vaginas.length;
            var average = 0;
            while (counter > 0) {
                counter--;
                average += this.vaginas[counter].vaginalWetness;
            }
            return (average / this.vaginas.length);
        }
        averageCockLength() {
            var counter = this.cocks.length;
            var average = 0;
            while (counter > 0) {
                counter--;
                average += this.cocks[counter].cockLength;
            }
            if (this.cocks.length == 0)
                return 0;
            return (average / this.cocks.length);
        }
        canTitFuck() {
            if (this.breastRows.length == 0)
                return false;
            var counter = this.breastRows.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.breastRows[index].breasts < this.breastRows[counter].breasts && this.breastRows[counter].breastRating > 3)
                    index = counter;
            }
            if (this.breastRows[index].breasts >= 2 && this.breastRows[index].breastRating > 3)
                return true;
            return false;
        }
        mostBreastsPerRow() {
            if (this.breastRows.length == 0)
                return 2;
            var counter = this.breastRows.length;
            var index = 0;
            while (counter > 0) {
                counter--;
                if (this.breastRows[index].breasts < this.breastRows[counter].breasts)
                    index = counter;
            }
            return this.breastRows[index].breasts;
        }
        averageNipplesPerBreast() {
            var counter = this.breastRows.length;
            var breasts = 0;
            var nipples = 0;
            while (counter > 0) {
                counter--;
                breasts += this.breastRows[counter].breasts;
                nipples += this.breastRows[counter].nipplesPerBreast * this.breastRows[counter].breasts;
            }
            if (breasts == 0)
                return 0;
            return Math.floor(nipples / breasts);
        }
        allBreastsDescript() {
            return Appearance_1.Appearance.allBreastsDescript(this);
        }
        //Simplified these cock descriptors and brought them into the creature class
        sMultiCockDesc() {
            return (this.cocks.length > 1 ? "one of your " : "your ") + this.cockMultiLDescriptionShort();
        }
        SMultiCockDesc() {
            return (this.cocks.length > 1 ? "One of your " : "Your ") + this.cockMultiLDescriptionShort();
        }
        oMultiCockDesc() {
            return (this.cocks.length > 1 ? "each of your " : "your ") + this.cockMultiLDescriptionShort();
        }
        OMultiCockDesc() {
            return (this.cocks.length > 1 ? "Each of your " : "Your ") + this.cockMultiLDescriptionShort();
        }
        cockMultiLDescriptionShort() {
            if (this.cocks.length < 1) {
                CoC_Settings_1.CoC_Settings.error("<b>ERROR: NO WANGS DETECTED for cockMultiLightDesc()</b>");
                return "<b>ERROR: NO WANGS DETECTED for cockMultiLightDesc()</b>";
            }
            if (this.cocks.length == 1) { //For a songle cock return the default description
                return Appearance_1.Appearance.cockDescript(this, 0);
            }
            switch (this.cocks[0].cockType) { //With multiple cocks only use the descriptions for specific cock types if all cocks are of a single type
                case CockTypesEnum_1.CockTypesEnum.ANEMONE:
                case CockTypesEnum_1.CockTypesEnum.CAT:
                case CockTypesEnum_1.CockTypesEnum.DEMON:
                case CockTypesEnum_1.CockTypesEnum.DISPLACER:
                case CockTypesEnum_1.CockTypesEnum.DRAGON:
                case CockTypesEnum_1.CockTypesEnum.HORSE:
                case CockTypesEnum_1.CockTypesEnum.KANGAROO:
                case CockTypesEnum_1.CockTypesEnum.LIZARD:
                case CockTypesEnum_1.CockTypesEnum.TENTACLE:
                    if (this.countCocksOfType(this.cocks[0].cockType) == this.cocks.length)
                        return Appearance_1.Appearance.cockNoun(this.cocks[0].cockType) + "s";
                    break;
                case CockTypesEnum_1.CockTypesEnum.DOG:
                case CockTypesEnum_1.CockTypesEnum.FOX:
                    if (this.dogCocks() == this.cocks.length)
                        return Appearance_1.Appearance.cockNoun(CockTypesEnum_1.CockTypesEnum.DOG) + "s";
                default:
            }
            return Appearance_1.Appearance.cockNoun(CockTypesEnum_1.CockTypesEnum.HUMAN) + "s";
        }
        hasSheath() {
            if (this.cocks.length == 0)
                return false;
            for (var x = 0; x < this.cocks.length; x++) {
                switch (this.cocks[x].cockType) {
                    case CockTypesEnum_1.CockTypesEnum.CAT:
                    case CockTypesEnum_1.CockTypesEnum.DISPLACER:
                    case CockTypesEnum_1.CockTypesEnum.DOG:
                    case CockTypesEnum_1.CockTypesEnum.FOX:
                    case CockTypesEnum_1.CockTypesEnum.HORSE:
                    case CockTypesEnum_1.CockTypesEnum.KANGAROO:
                        return true; //If there's even one cock of any of these types then return true
                    default:
                }
            }
            return false;
        }
        sheathDescription() {
            if (this.hasSheath())
                return "sheath";
            return "base";
        }
        vaginaDescript(idx = 0) {
            return Appearance_1.Appearance.vaginaDescript(this, 0);
        }
        nippleDescript(rowIdx) {
            return Appearance_1.Appearance.nippleDescription(this, rowIdx);
        }
        chestDesc() {
            if (this.biggestTitSize() < 1)
                return "chest";
            return Appearance_1.Appearance.biggestBreastSizeDescript(this);
            //			return Appearance.chestDesc(this);
        }
        allChestDesc() {
            if (this.biggestTitSize() < 1)
                return "chest";
            return this.allBreastsDescript();
        }
        clitDescript() {
            return Appearance_1.Appearance.clitDescription(this);
        }
        cockHead(cockNum = 0) {
            if (cockNum < 0 || cockNum > this.cocks.length - 1) {
                CoC_Settings_1.CoC_Settings.error("");
                return "ERROR";
            }
            switch (this.cocks[cockNum].cockType) {
                case CockTypesEnum_1.CockTypesEnum.CAT:
                    if (Creature.rand(2) == 0)
                        return "point";
                    return "narrow tip";
                case CockTypesEnum_1.CockTypesEnum.DEMON:
                    if (Creature.rand(2) == 0)
                        return "tainted crown";
                    return "nub-ringed tip";
                case CockTypesEnum_1.CockTypesEnum.DISPLACER:
                    switch (Creature.rand(5)) {
                        case 0: return "star tip";
                        case 1: return "blooming cock-head";
                        case 2: return "open crown";
                        case 3: return "alien tip";
                        default: return "bizarre head";
                    }
                case CockTypesEnum_1.CockTypesEnum.DOG:
                case CockTypesEnum_1.CockTypesEnum.FOX:
                    if (Creature.rand(2) == 0)
                        return "pointed tip";
                    return "narrow tip";
                case CockTypesEnum_1.CockTypesEnum.HORSE:
                    if (Creature.rand(2) == 0)
                        return "flare";
                    return "flat tip";
                case CockTypesEnum_1.CockTypesEnum.KANGAROO:
                    if (Creature.rand(2) == 0)
                        return "tip";
                    return "point";
                case CockTypesEnum_1.CockTypesEnum.LIZARD:
                    if (Creature.rand(2) == 0)
                        return "crown";
                    return "head";
                case CockTypesEnum_1.CockTypesEnum.TENTACLE:
                    if (Creature.rand(2) == 0)
                        return "mushroom-like tip";
                    return "wide plant-like crown";
                default:
            }
            if (Creature.rand(2) == 0)
                return "crown";
            if (Creature.rand(2) == 0)
                return "head";
            return "cock-head";
        }
        //Short cock description. Describes length or girth. Supports multiple cocks.
        cockDescriptShort(i_cockIndex = 0) {
            // catch calls where we're outside of combat, and eCockDescript could be called.
            if (this.cocks.length == 0)
                return "<B>ERROR. INVALID CREATURE SPECIFIED to cockDescriptShort</B>";
            var description = "";
            var descripted = false;
            //Discuss length one in 3 times
            if (Creature.rand(3) == 0) {
                if (this.cocks[i_cockIndex].cockLength >= 30)
                    description = "towering ";
                else if (this.cocks[i_cockIndex].cockLength >= 18)
                    description = "enormous ";
                else if (this.cocks[i_cockIndex].cockLength >= 13)
                    description = "massive ";
                else if (this.cocks[i_cockIndex].cockLength >= 10)
                    description = "huge ";
                else if (this.cocks[i_cockIndex].cockLength >= 7)
                    description = "long ";
                else if (this.cocks[i_cockIndex].cockLength >= 5)
                    description = "average ";
                else
                    description = "short ";
                descripted = true;
            }
            else if (Creature.rand(2) == 0) { //Discuss girth one in 2 times if not already talked about length.
                //narrow, thin, ample, broad, distended, voluminous
                if (this.cocks[i_cockIndex].cockThickness <= .75)
                    description = "narrow ";
                if (this.cocks[i_cockIndex].cockThickness > 1 && this.cocks[i_cockIndex].cockThickness <= 1.4)
                    description = "ample ";
                if (this.cocks[i_cockIndex].cockThickness > 1.4 && this.cocks[i_cockIndex].cockThickness <= 2)
                    description = "broad ";
                if (this.cocks[i_cockIndex].cockThickness > 2 && this.cocks[i_cockIndex].cockThickness <= 3.5)
                    description = "fat ";
                if (this.cocks[i_cockIndex].cockThickness > 3.5)
                    description = "distended ";
                descripted = true;
            }
            //Seems to work better without this comma:			if (descripted && cocks[i_cockIndex].cockType != CockTypesEnum.HUMAN) description += ", ";
            description += Appearance_1.Appearance.cockNoun(this.cocks[i_cockIndex].cockType);
            return description;
        }
        assholeOrPussy() {
            return Appearance_1.Appearance.assholeOrPussy(this);
        }
        multiCockDescriptLight() {
            return Appearance_1.Appearance.multiCockDescriptLight(this);
        }
        multiCockDescript() {
            return Appearance_1.Appearance.multiCockDescript(this);
        }
        ballsDescriptLight(forcedSize = true) {
            return Appearance_1.Appearance.ballsDescription(forcedSize, true, this);
        }
        sackDescript() {
            return Appearance_1.Appearance.sackDescript(this);
        }
        breastDescript(rowNum) {
            //ERROR PREVENTION
            if (this.breastRows.length - 1 < rowNum) {
                CoC_Settings_1.CoC_Settings.error("");
                return "<b>ERROR, breastDescript() working with invalid breastRow</b>";
            }
            if (this.breastRows.length == 0) {
                CoC_Settings_1.CoC_Settings.error("");
                return "<b>ERROR, breastDescript() called when no breasts are present.</b>";
            }
            return BreastStore_1.BreastStore.breastDescript(this.breastRows[rowNum].breastRating, this.breastRows[rowNum].lactationMultiplier);
        }
        breastSize(val) {
            return Appearance_1.Appearance.breastSize(val);
        }
    }
    exports.Creature = Creature;
});
//# sourceMappingURL=Creature.js.map