define(["require", "exports", "./Character", "./ItemSlotClass", "./Items/ArmorLib", "./CoC_Settings", "../../includes/appearanceDefs", "./StatusAffects", "./Items/WeaponLib", "./GlobalFlags/kFLAGS", "./Scenes/Places/TelAdre/UmasShop", "./Appearance", "../console", "./ItemType", "./GlobalFlags/kGAMECLASS", "./PerkLib"], function (require, exports, Character_1, ItemSlotClass_1, ArmorLib_1, CoC_Settings_1, appearanceDefs_1, StatusAffects_1, WeaponLib_1, kFLAGS_1, UmasShop_1, Appearance_1, console_1, ItemType_1, kGAMECLASS_1, PerkLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ...
     * @author Yoffy
     */
    class Player extends Character_1.Character {
        constructor() {
            super();
            //Autosave
            this.slotName = "VOID";
            this.autoSave = false;
            //Lust vulnerability
            //TODO: Kept for backwards compatibility reasons but should be phased out.
            this.lustVuln = 1;
            //Teasing attributes
            this.teaseLevel = 0;
            this.teaseXP = 0;
            //Perks used to store 'queued' perk buys
            this.perkPoints = 0;
            //Number of times explored for new areas
            this.explored = 0;
            this.exploredForest = 0;
            this.exploredDesert = 0;
            this.exploredMountain = 0;
            this.exploredLake = 0;
            this._armor = ArmorLib_1.ArmorLib.COMFORTABLE_UNDERCLOTHES;
            this._modArmorName = "";
            this._weapon = WeaponLib_1.WeaponLib.FISTS;
            //Item things
            this.itemSlot1 = new ItemSlotClass_1.ItemSlotClass();
            this.itemSlot2 = new ItemSlotClass_1.ItemSlotClass();
            this.itemSlot3 = new ItemSlotClass_1.ItemSlotClass();
            this.itemSlot4 = new ItemSlotClass_1.ItemSlotClass();
            this.itemSlot5 = new ItemSlotClass_1.ItemSlotClass();
            this.itemSlots = [this.itemSlot1, this.itemSlot2, this.itemSlot3, this.itemSlot4, this.itemSlot5];
        }
        outputText(text, clear = false) {
            this.game.outputText(text, clear);
        }
        //Player pregnancy variables and functions
        pregnancyUpdate() {
            return this.game.updatePregnancy(); //Returns true if we need to make sure pregnancy texts aren't hidden
        }
        set armorValue(value) {
            CoC_Settings_1.CoC_Settings.error("ERROR: attempt to directly set player.armorValue.");
        }
        set armorName(value) {
            CoC_Settings_1.CoC_Settings.error("ERROR: attempt to directly set player.armorName.");
        }
        set armorDef(value) {
            CoC_Settings_1.CoC_Settings.error("ERROR: attempt to directly set player.armorDef.");
        }
        set armorPerk(value) {
            CoC_Settings_1.CoC_Settings.error("ERROR: attempt to directly set player.armorPerk.");
        }
        set weaponName(value) {
            CoC_Settings_1.CoC_Settings.error("ERROR: attempt to directly set player.weaponName.");
        }
        set weaponVerb(value) {
            CoC_Settings_1.CoC_Settings.error("ERROR: attempt to directly set player.weaponVerb.");
        }
        set weaponAttack(value) {
            CoC_Settings_1.CoC_Settings.error("ERROR: attempt to directly set player.weaponAttack.");
        }
        set weaponPerk(value) {
            CoC_Settings_1.CoC_Settings.error("ERROR: attempt to directly set player.weaponPerk.");
        }
        set weaponValue(value) {
            CoC_Settings_1.CoC_Settings.error("ERROR: attempt to directly set player.weaponValue.");
        }
        get modArmorName() {
            if (this._modArmorName == undefined)
                this._modArmorName = "";
            return this._modArmorName;
        }
        set modArmorName(value) {
            if (value == undefined)
                value = "";
            this._modArmorName = value;
        }
        get armorName() {
            if (this._modArmorName.length > 0)
                return this.modArmorName;
            return this._armor.name;
        }
        get armorDef() {
            var armorDef = this._armor.def;
            //Blacksmith history!
            if (armorDef > 0 && this.findPerk(PerkLib_1.PerkLib.HistorySmith) >= 0) {
                armorDef = Math.round(armorDef * 1.1);
                armorDef += 1;
            }
            //Skin armor perk
            if (this.findPerk(PerkLib_1.PerkLib.ThickSkin) >= 0) {
                armorDef += 2;
                if (this.skinType > appearanceDefs_1.SKIN_TYPE_PLAIN)
                    armorDef += 1;
            }
            //If no skin armor perk scales rock
            else {
                if (this.skinType == appearanceDefs_1.SKIN_TYPE_FUR)
                    armorDef += 1;
                if (this.skinType == appearanceDefs_1.SKIN_TYPE_SCALES)
                    armorDef += 3;
            }
            //'Thick' dermis descriptor adds 1!
            if (this.skinAdj == "smooth")
                armorDef += 1;
            //Agility boosts armor ratings!
            if (this.findPerk(PerkLib_1.PerkLib.Agility) >= 0) {
                if (this.armorPerk == "Light")
                    armorDef += Math.round(this.spe / 8);
                else if (this.armorPerk == "Medium")
                    armorDef += Math.round(this.spe / 13);
            }
            //Berzerking removes armor
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Berzerking) >= 0) {
                armorDef = 0;
            }
            if (kGAMECLASS_1.kGAMECLASS.monster.findStatusAffect(StatusAffects_1.StatusAffects.TailWhip) >= 0) {
                armorDef -= kGAMECLASS_1.kGAMECLASS.monster.statusAffectv1(StatusAffects_1.StatusAffects.TailWhip);
                if (armorDef < 0)
                    armorDef = 0;
            }
            return armorDef;
        }
        get armorBaseDef() {
            return this._armor.def;
        }
        get armorPerk() {
            return this._armor.perk;
        }
        get armorValue() {
            return this._armor.value;
        }
        get weaponName() {
            return this._weapon.name;
        }
        get weaponVerb() {
            return this._weapon.verb;
        }
        get weaponAttack() {
            var attack = this._weapon.attack;
            if (this.findPerk(PerkLib_1.PerkLib.WeaponMastery) >= 0 && this.weaponPerk == "Large" && this.str > 60)
                attack *= 2;
            if (this.findPerk(PerkLib_1.PerkLib.LightningStrikes) >= 0 && this.spe >= 60 && this.weaponPerk != "Large") {
                attack += Math.round((this.spe - 50) / 3);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Berzerking) >= 0)
                attack += 30;
            attack += this.statusAffectv1(StatusAffects_1.StatusAffects.ChargeWeapon);
            return attack;
        }
        get weaponBaseAttack() {
            return this._weapon.attack;
        }
        get weaponPerk() {
            return this._weapon.perk || "";
        }
        get weaponValue() {
            return this._weapon.value;
        }
        get armor() {
            return this._armor;
        }
        setArmor(newArmor) {
            //Returns the old armor, allowing the caller to discard it, store it or try to place it in the player's inventory
            //Can return undefined, in which case caller should discard.
            var oldArmor = this._armor.playerRemove(); //The armor is responsible for removing any bonuses, perks, etc.
            if (newArmor == undefined) {
                CoC_Settings_1.CoC_Settings.error(this.short + ".armor is set to undefined");
                newArmor = ArmorLib_1.ArmorLib.COMFORTABLE_UNDERCLOTHES;
            }
            this._armor = newArmor.playerEquip(); //The armor can also choose to equip something else - useful for Ceraph's trap armor
            return oldArmor;
        }
        /*
        public  set armor(value:Armor): void
        {
            if (value == undefined){
                CoC_Settings.error(short+".armor is set to undefined");
                value = ArmorLib.COMFORTABLE_UNDERCLOTHES;
            }
            value.equip(this, false, false);
        }
        */
        // in case you don't want to call the value.equip
        setArmorHiddenField(value) {
            this._armor = value;
        }
        get weapon() {
            return this._weapon;
        }
        setWeapon(newWeapon) {
            //Returns the old weapon, allowing the caller to discard it, store it or try to place it in the player's inventory
            //Can return undefined, in which case caller should discard.
            var oldWeapon = this._weapon.playerRemove(); //The weapon is responsible for removing any bonuses, perks, etc.
            if (newWeapon == undefined) {
                CoC_Settings_1.CoC_Settings.error(this.short + ".weapon is set to undefined");
                newWeapon = WeaponLib_1.WeaponLib.FISTS;
            }
            this._weapon = newWeapon.playerEquip(); //The weapon can also choose to equip something else
            return oldWeapon;
        }
        /*
        public  set weapon(value:Weapon): void
        {
            if (value == undefined){
                CoC_Settings.error(short+".weapon is set to undefined");
                value = WeaponLib.FISTS;
            }
            value.equip(this, false, false);
        }
        */
        // in case you don't want to call the value.equip
        setWeaponHiddenField(value) {
            this._weapon = value;
        }
        reduceDamage(damage) {
            damage = Math.floor(damage - Player.rand(this.tou) - this.armorDef);
            //EZ MOAD half damage
            if (this.flags[kFLAGS_1.kFLAGS.EASY_MODE_ENABLE_FLAG] == 1)
                damage /= 2;
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Shielding) >= 0) {
                damage -= 30;
                if (damage < 1)
                    damage = 1;
            }
            //Black cat beer = 25% reduction!
            if (this.statusAffectv1(StatusAffects_1.StatusAffects.BlackCatBeer) > 0)
                damage = Math.round(damage * .75);
            //Take damage you masochist!
            if (this.findPerk(PerkLib_1.PerkLib.Masochist) >= 0 && this.lib >= 60) {
                damage = Math.round(damage * .7);
                this.game.dynStats("lus", 2);
                //Dont let it round too far down!
                if (damage < 1)
                    damage = 1;
            }
            if (this.findPerk(PerkLib_1.PerkLib.ImmovableObject) >= 0 && this.tou >= 75) {
                damage = Math.round(damage * .8);
                if (damage < 1)
                    damage = 1;
            }
            // Uma's Massage bonuses
            var statIndex = this.findStatusAffect(StatusAffects_1.StatusAffects.UmasMassage);
            if (statIndex >= 0) {
                if (this.statusAffect(statIndex).value1 == UmasShop_1.UmasShop.MASSAGE_RELAXATION) {
                    damage = Math.round(damage * this.statusAffect(statIndex).value2);
                }
            }
            // Uma's Accupuncture Bonuses
            var modArmorDef = 0;
            if (this.findPerk(PerkLib_1.PerkLib.ChiReflowDefense) >= 0)
                modArmorDef = ((this.armorDef * UmasShop_1.UmasShop.NEEDLEWORK_DEFENSE_DEFENSE_MULTI) - this.armorDef);
            if (this.findPerk(PerkLib_1.PerkLib.ChiReflowAttack) >= 0)
                modArmorDef = ((this.armorDef * UmasShop_1.UmasShop.NEEDLEWORK_ATTACK_DEFENSE_MULTI) - this.armorDef);
            damage -= modArmorDef;
            if (damage < 0)
                damage = 0;
            return damage;
        }
        takeDamage(damage) {
            //Round
            damage = Math.round(damage);
            // we return "1 damage received" if it is in (0..1) but deduce no HP
            var returnDamage = (damage > 0 && damage < 1) ? 1 : damage;
            if (damage > 0) {
                this.HP -= damage;
                this.game.mainView.statsView.showStatDown('hp');
                if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_REALLY_ADDICTED_STATE] > 0) {
                    this.game.dynStats("lus", Math.floor(damage / 2));
                }
                //Prevent negatives
                if (this.HP <= 0) {
                    this.HP = 0;
                    //This call did nothing. There is no event 5010: if (game.inCombat) game.doNext(5010);
                }
            }
            return returnDamage;
        }
        /**
         * @return 0: did not avoid; 1-3: avoid with varying difference between
         * speeds (1: narrowly avoid, 3: deftly avoid)
         */
        speedDodge(monster) {
            var diff = this.spe - monster.spe;
            var rnd = Math.floor(Math.random() * ((diff / 4) + 80));
            if (rnd <= 80)
                return 0;
            else if (diff < 8)
                return 1;
            else if (diff < 20)
                return 2;
            else
                return 3;
        }
        //Body Type
        bodyType() {
            var desc = "";
            //OLD STUFF
            //SUPAH THIN
            if (this.thickness < 10) {
                //SUPAH BUFF
                if (this.tone > 90)
                    desc += "a lithe body covered in highly visible muscles";
                else if (this.tone > 75)
                    desc += "an incredibly thin, well-muscled frame";
                else if (this.tone > 50)
                    desc += "a very thin body that has a good bit of muscle definition";
                else if (this.tone > 25)
                    desc += "a lithe body and only a little bit of muscle definition";
                else
                    desc += "a waif-thin body, and soft, forgiving flesh";
            }
            //Pretty thin
            else if (this.thickness < 25) {
                if (this.tone > 90)
                    desc += "a thin body and incredible muscle definition";
                else if (this.tone > 75)
                    desc += "a narrow frame that shows off your muscles";
                else if (this.tone > 50)
                    desc += "a somewhat lithe body and a fair amount of definition";
                else if (this.tone > 25)
                    desc += "a narrow, soft body that still manages to show off a few muscles";
                else
                    desc += "a thin, soft body";
            }
            //Somewhat thin
            else if (this.thickness < 40) {
                if (this.tone > 90)
                    desc += "a fit, somewhat thin body and rippling muscles all over";
                else if (this.tone > 75)
                    desc += "a thinner-than-average frame and great muscle definition";
                else if (this.tone > 50)
                    desc += "a somewhat narrow body and a decent amount of visible muscle";
                else if (this.tone > 25)
                    desc += "a moderately thin body, soft curves, and only a little bit of muscle";
                else
                    desc += "a fairly thin form and soft, cuddle-able flesh";
            }
            //average
            else if (this.thickness < 60) {
                if (this.tone > 90)
                    desc += "average thickness and a bevy of perfectly defined muscles";
                else if (this.tone > 75)
                    desc += "an average-sized frame and great musculature";
                else if (this.tone > 50)
                    desc += "a normal waistline and decently visible muscles";
                else if (this.tone > 25)
                    desc += "an average body and soft, unremarkable flesh";
                else
                    desc += "an average frame and soft, untoned flesh with a tendency for jiggle";
            }
            else if (this.thickness < 75) {
                if (this.tone > 90)
                    desc += "a somewhat thick body that's covered in slabs of muscle";
                else if (this.tone > 75)
                    desc += "a body that's a little bit wide and has some highly-visible muscles";
                else if (this.tone > 50)
                    desc += "a solid build that displays a decent amount of muscle";
                else if (this.tone > 25)
                    desc += "a slightly wide frame that displays your curves and has hints of muscle underneath";
                else
                    desc += "a soft, plush body with plenty of jiggle";
            }
            else if (this.thickness < 90) {
                if (this.tone > 90)
                    desc += "a thickset frame that gives you the appearance of a wall of muscle";
                else if (this.tone > 75)
                    desc += "a burly form and plenty of muscle definition";
                else if (this.tone > 50)
                    desc += "a solid, thick frame and a decent amount of muscles";
                else if (this.tone > 25)
                    desc += "a wide-set body, some soft, forgiving flesh, and a hint of muscle underneath it";
                else {
                    desc += "a wide, cushiony body";
                    if (this.gender >= 2 || this.biggestTitSize() > 3 || this.hipRating > 7 || this.buttRating > 7)
                        desc += " and plenty of jiggle on your curves";
                }
            }
            //Chunky monkey
            else {
                if (this.tone > 90)
                    desc += "an extremely thickset frame and so much muscle others would find you harder to move than a huge boulder";
                else if (this.tone > 75)
                    desc += "a very wide body and enough muscle to make you look like a tank";
                else if (this.tone > 50)
                    desc += "an extremely substantial frame packing a decent amount of muscle";
                else if (this.tone > 25) {
                    desc += "a very wide body";
                    if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10)
                        desc += ", lots of curvy jiggles,";
                    desc += " and hints of muscle underneath";
                }
                else {
                    desc += "a thick";
                    if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10)
                        desc += ", voluptuous";
                    desc += " body and plush, ";
                    if (this.gender >= 2 || this.biggestTitSize() > 4 || this.hipRating > 10 || this.buttRating > 10)
                        desc += " jiggly curves";
                    else
                        desc += " soft flesh";
                }
            }
            return desc;
        }
        race() {
            //Determine race type:
            var race = "human";
            if (this.lowerBody == 4)
                race = "centaur";
            if (this.lowerBody == 11)
                race = "pony-kin";
            if (this.catScore() >= 4)
                race = "cat-" + this.mf("boy", "girl");
            if (this.lizardScore() >= 4) {
                if (this.gender == 0)
                    race = "lizan";
                else if (this.gender == 1)
                    race = "male lizan";
                else if (this.gender == 2)
                    race = "female lizan";
                else
                    race = "hermaphrodite lizan";
            }
            if (this.dragonScore() >= 4) {
                race = "dragon-morph";
                if (this.faceType == 0)
                    race = "dragon-" + this.mf("man", "girl");
            }
            if (this.raccoonScore() >= 4) {
                race = "raccoon-morph";
                if (this.balls > 0 && this.ballSize > 5)
                    race = "tanuki-morph";
            }
            if (this.dogScore() >= 4) {
                race = "dog-morph";
                if (this.faceType == 0)
                    race = "dog-" + this.mf("man", "girl");
            }
            if (this.foxScore() >= 4) {
                if (this.skinType == 1)
                    race = "fox-morph";
                else
                    race = "fox-" + this.mf("morph", "girl");
            }
            if (this.ferretScore() >= 4) {
                if (this.skinType == 1)
                    race = "ferret-morph";
                else
                    race = "ferret-" + this.mf("morph", "girl");
            }
            if (this.kitsuneScore() >= 4) {
                race = "kitsune";
            }
            if (this.horseScore() >= 3) {
                if (this.lowerBody == 4)
                    race = "centaur-morph";
                else
                    race = "equine-morph";
            }
            if (this.mutantScore() >= 5 && race == "human")
                race = "corrupted mutant";
            if (this.minoScore() >= 4)
                race = "minotaur-morph";
            if (this.cowScore() > 5) {
                race = "cow-";
                race += this.mf("morph", "girl");
            }
            if (this.beeScore() >= 5)
                race = "bee-morph";
            if (this.goblinScore() >= 5)
                race = "goblin";
            if (this.humanScore() >= 5 && race == "corrupted mutant")
                race = "somewhat human mutant";
            if (this.demonScore() > 4)
                race = "demon-morph";
            if (this.sharkScore() >= 3)
                race = "shark-morph";
            if (this.bunnyScore() >= 4)
                race = "bunny-" + this.mf("boy", "girl");
            if (this.harpyScore() >= 4) {
                if (this.gender >= 2)
                    race = "harpy";
                else
                    race = "avian";
            }
            if (this.spiderScore() >= 4) {
                race = "spider-morph";
                if (this.mf("no", "yes") == "yes")
                    race = "spider-girl";
                if (this.lowerBody == 16)
                    race = "drider";
            }
            if (this.kangaScore() >= 4)
                race = "kangaroo-morph";
            if (this.mouseScore() >= 3) {
                if (this.faceType != 16)
                    race = "mouse-" + this.mf("boy", "girl");
                else
                    race = "mouse-morph";
            }
            if (this.lowerBody == 3)
                race = "naga";
            if (this.lowerBody == 4)
                race = "centaur";
            if (this.gooScore() >= 3) {
                race = "goo-";
                race += this.mf("boi", "girl");
            }
            return race;
        }
        //determine demon rating
        demonScore() {
            var demonCounter = 0;
            if (this.hornType == 1 && this.horns > 0)
                demonCounter++;
            if (this.hornType == 1 && this.horns > 4)
                demonCounter++;
            if (this.tailType == 3)
                demonCounter++;
            if (this.wingType == 6 || this.wingType == 7)
                demonCounter++;
            if (this.skinType == 0 && this.cor > 50)
                demonCounter++;
            if (this.faceType == 0 && this.cor > 50)
                demonCounter++;
            if (this.lowerBody == 5 || this.lowerBody == 6)
                demonCounter++;
            if (this.demonCocks() > 0)
                demonCounter++;
            return demonCounter;
        }
        //Determine Human Rating
        humanScore() {
            var humanCounter = 0;
            if (this.faceType == 0)
                humanCounter++;
            if (this.skinType == 0)
                humanCounter++;
            if (this.horns == 0)
                humanCounter++;
            if (this.tailType == 0)
                humanCounter++;
            if (this.wingType == 0)
                humanCounter++;
            if (this.lowerBody == 0)
                humanCounter++;
            if (this.normalCocks() == 1 && this.totalCocks() == 1)
                humanCounter++;
            if (this.breastRows.length == 1 && this.skinType == 0)
                humanCounter++;
            return humanCounter;
        }
        //Determine minotaur rating
        minoScore() {
            var minoCounter = 0;
            if (this.faceType == 3)
                minoCounter++;
            if (this.earType == 3)
                minoCounter++;
            if (this.tailType == 4)
                minoCounter++;
            if (this.hornType == 2)
                minoCounter++;
            if (this.lowerBody == 1 && minoCounter > 0)
                minoCounter++;
            if (this.tallness > 80 && minoCounter > 0)
                minoCounter++;
            if (this.cocks.length > 0 && minoCounter > 0) {
                if (this.horseCocks() > 0)
                    minoCounter++;
            }
            if (this.vaginas.length > 0)
                minoCounter--;
            return minoCounter;
        }
        get minotaurScore() {
            return this.minoScore();
        }
        //Determine cow rating
        cowScore() {
            var minoCounter = 0;
            if (this.faceType == 0)
                minoCounter++;
            if (this.faceType == 3)
                minoCounter--;
            if (this.earType == 3)
                minoCounter++;
            if (this.tailType == 4)
                minoCounter++;
            if (this.hornType == 2)
                minoCounter++;
            if (this.lowerBody == 1 && minoCounter > 0)
                minoCounter++;
            if (this.tallness >= 73 && minoCounter > 0)
                minoCounter++;
            if (this.vaginas.length > 0)
                minoCounter++;
            if (this.biggestTitSize() > 4 && minoCounter > 0)
                minoCounter++;
            if (this.biggestLactation() > 2 && minoCounter > 0)
                minoCounter++;
            return minoCounter;
        }
        sandTrapScore() {
            var counter = 0;
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.BlackNipples) >= 0)
                counter++;
            if (this.hasVagina() && this.vaginaType() == 5)
                counter++;
            if (this.eyeType == 2)
                counter++;
            if (this.wingType == 12)
                counter++;
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Uniball) >= 0)
                counter++;
            return counter;
        }
        //Determine Bee Rating
        beeScore() {
            var beeCounter = 0;
            if (this.hairColor == "shiny black")
                beeCounter++;
            if (this.hairColor == "black and yellow")
                beeCounter += 2;
            if (this.antennae > 0) {
                beeCounter++;
                if (this.faceType == 0)
                    beeCounter++;
            }
            if (this.lowerBody == 7) {
                beeCounter++;
                if (this.vaginas.length == 1)
                    beeCounter++;
            }
            if (this.tailType == 6)
                beeCounter++;
            if (this.wingType == 1)
                beeCounter++;
            if (this.wingType == 2)
                beeCounter++;
            return beeCounter;
        }
        //Determine Ferret Rating!
        ferretScore() {
            var counter = 0;
            if (this.faceType == appearanceDefs_1.FACE_FERRET_MASK)
                counter++;
            if (this.faceType == appearanceDefs_1.FACE_FERRET)
                counter += 2;
            if (this.earType == appearanceDefs_1.EARS_FERRET)
                counter++;
            if (this.tailType == appearanceDefs_1.TAIL_TYPE_FERRET)
                counter++;
            if (this.lowerBody == appearanceDefs_1.LOWER_BODY_FERRET)
                counter++;
            if (this.skinType == appearanceDefs_1.SKIN_TYPE_FUR && counter > 0)
                counter++;
            return counter;
        }
        //Determine Dog Rating
        dogScore() {
            var dogCounter = 0;
            if (this.faceType == 2)
                dogCounter++;
            if (this.earType == 2)
                dogCounter++;
            if (this.tailType == 2)
                dogCounter++;
            if (this.lowerBody == 2)
                dogCounter++;
            if (this.dogCocks() > 0)
                dogCounter++;
            if (this.breastRows.length > 1)
                dogCounter++;
            if (this.breastRows.length == 3)
                dogCounter++;
            if (this.breastRows.length > 3)
                dogCounter--;
            //Fur only counts if some canine features are present
            if (this.skinType == 1 && dogCounter > 0)
                dogCounter++;
            return dogCounter;
        }
        mouseScore() {
            var coonCounter = 0;
            if (this.earType == 12)
                coonCounter++;
            if (this.tailType == 16)
                coonCounter++;
            if (this.faceType == 15)
                coonCounter++;
            if (this.faceType == 16)
                coonCounter += 2;
            //Fur only counts if some canine features are present
            if (this.skinType == 1 && coonCounter > 0)
                coonCounter++;
            if (this.tallness < 55 && coonCounter > 0)
                coonCounter++;
            if (this.tallness < 45 && coonCounter > 0)
                coonCounter++;
            return coonCounter;
        }
        raccoonScore() {
            var coonCounter = 0;
            if (this.faceType == 13)
                coonCounter++;
            if (this.faceType == 14)
                coonCounter += 2;
            if (this.earType == 11)
                coonCounter++;
            if (this.tailType == 15)
                coonCounter++;
            if (this.lowerBody == 19)
                coonCounter++;
            if (coonCounter > 0 && this.balls > 0)
                coonCounter++;
            //Fur only counts if some canine features are present
            if (this.skinType == 1 && coonCounter > 0)
                coonCounter++;
            return coonCounter;
        }
        //Determine Fox Rating
        foxScore() {
            var foxCounter = 0;
            if (this.faceType == 11)
                foxCounter++;
            if (this.earType == 9)
                foxCounter++;
            if (this.tailType == 13)
                foxCounter++;
            if (this.lowerBody == 17)
                foxCounter++;
            if (this.dogCocks() > 0 && foxCounter > 0)
                foxCounter++;
            if (this.breastRows.length > 1 && foxCounter > 0)
                foxCounter++;
            if (this.breastRows.length == 3 && foxCounter > 0)
                foxCounter++;
            if (this.breastRows.length == 4 && foxCounter > 0)
                foxCounter++;
            //Fur only counts if some canine features are present
            if (this.skinType == 1 && foxCounter > 0)
                foxCounter++;
            return foxCounter;
        }
        //Determine cat Rating
        catScore() {
            var catCounter = 0;
            if (this.faceType == 6)
                catCounter++;
            if (this.earType == 5)
                catCounter++;
            if (this.tailType == 8)
                catCounter++;
            if (this.lowerBody == 9)
                catCounter++;
            if (this.catCocks() > 0)
                catCounter++;
            if (this.breastRows.length > 1 && catCounter > 0)
                catCounter++;
            if (this.breastRows.length == 3 && catCounter > 0)
                catCounter++;
            if (this.breastRows.length > 3)
                catCounter -= 2;
            //Fur only counts if some canine features are present
            if (this.skinType == 1 && catCounter > 0)
                catCounter++;
            return catCounter;
        }
        //Determine lizard rating
        lizardScore() {
            var lizardCounter = 0;
            if (this.faceType == 7)
                lizardCounter++;
            if (this.earType == 6)
                lizardCounter++;
            if (this.tailType == 9)
                lizardCounter++;
            if (this.lowerBody == 10)
                lizardCounter++;
            if (this.lizardCocks() > 0)
                lizardCounter++;
            if (this.horns > 0 && (this.hornType == 3 || this.hornType == 4))
                lizardCounter++;
            if (this.skinType == 2)
                lizardCounter++;
            return lizardCounter;
        }
        spiderScore() {
            var score = 0;
            if (this.eyeType == 1)
                score += 2;
            if (this.faceType == 10)
                score++;
            if (this.armType == 2)
                score++;
            if (this.lowerBody == 15 || this.lowerBody == 16)
                score += 2;
            else if (score > 0)
                score--;
            if (this.tailType == 5)
                score += 2;
            if (this.skinType > 0 && score > 0)
                score--;
            return score;
        }
        //Determine Horse Rating
        horseScore() {
            var horseCounter = 0;
            if (this.faceType == 1)
                horseCounter++;
            if (this.earType == 1)
                horseCounter++;
            if (this.tailType == 1)
                horseCounter++;
            if (this.horseCocks() > 0)
                horseCounter++;
            if (this.lowerBody == 1 || this.lowerBody == 4)
                horseCounter++;
            //Fur only counts if some equine features are present
            if (this.skinType == 1 && horseCounter > 0)
                horseCounter++;
            return horseCounter;
        }
        //Determine kitsune Rating
        kitsuneScore() {
            var kitsuneCounter = 0;
            //If the character has fox ears, +1
            if (this.earType == 9)
                kitsuneCounter++;
            //If the character has a fox tail, +1
            if (this.tailType == 13)
                kitsuneCounter++;
            //If the character has two or more fox tails, +2
            if (this.tailType == 13 && this.tailVenom >= 2)
                kitsuneCounter += 2;
            //If the character has tattooed skin, +1
            //9999
            //If the character has a 'vag of holding', +1
            if (this.vaginalCapacity() >= 8000)
                kitsuneCounter++;
            //If the character's kitsune score is greater than 0 and:
            //If the character has a normal face, +1
            if (kitsuneCounter > 0 && this.faceType == 0)
                kitsuneCounter++;
            //If the character's kitsune score is greater than 1 and:
            //If the character has "blonde","black","red","white", or "silver" hair, +1
            if (kitsuneCounter > 0 && (this.hairColor == "golden blonde" || this.hairColor == "black" || this.hairColor == "red" || this.hairColor == "white" || this.hairColor == "silver blonde"))
                kitsuneCounter++;
            //If the character's femininity is 40 or higher, +1
            if (kitsuneCounter > 0 && this.femininity >= 40)
                kitsuneCounter++;
            //If the character has fur, scales, or gooey skin, -1
            if (this.skinType > 1)
                kitsuneCounter -= 2;
            if (this.skinType == 1)
                kitsuneCounter--;
            //If the character has abnormal legs, -1
            if (this.lowerBody != 0)
                kitsuneCounter--;
            //If the character has a nonhuman face, -1
            if (this.faceType != 0)
                kitsuneCounter--;
            //If the character has ears other than fox ears, -1
            if (this.earType != 9)
                kitsuneCounter--;
            //If the character has tail(s) other than fox tails, -1
            if (this.tailType != 13)
                kitsuneCounter--;
            return kitsuneCounter;
        }
        //Determine Horse Rating
        dragonScore() {
            var dragonCounter = 0;
            if (this.faceType == 12)
                dragonCounter++;
            if (this.earType == 10)
                dragonCounter++;
            if (this.tailType == 14)
                dragonCounter++;
            if (this.tongueType == 3)
                dragonCounter++;
            if (this.dragonCocks() > 0)
                dragonCounter++;
            if (this.wingType == 10)
                dragonCounter++;
            if (this.wingType == 11)
                dragonCounter += 2;
            if (this.lowerBody == 18)
                dragonCounter++;
            if (this.skinType == 2 && dragonCounter > 0)
                dragonCounter++;
            if (this.hornType == appearanceDefs_1.HORNS_DRACONIC_X4_12_INCH_LONG || this.hornType == appearanceDefs_1.HORNS_DRACONIC_X2)
                dragonCounter++;
            return dragonCounter;
        }
        //Goblinscore
        goblinScore() {
            var horseCounter = 0;
            if (this.earType == 4)
                horseCounter++;
            if (this.skinTone == "pale yellow" || this.skinTone == "grayish-blue" || this.skinTone == "green" || this.skinTone == "dark green")
                horseCounter++;
            if (horseCounter > 0) {
                if (this.faceType == 0)
                    horseCounter++;
                if (this.tallness < 48)
                    horseCounter++;
                if (this.hasVagina())
                    horseCounter++;
                if (this.lowerBody == 0)
                    horseCounter++;
            }
            return horseCounter;
        }
        //Gooscore
        gooScore() {
            var gooCounter = 0;
            if (this.hairType == 3)
                gooCounter++;
            if (this.skinAdj == "slimy")
                gooCounter++;
            if (this.lowerBody == 8)
                gooCounter++;
            if (this.vaginalCapacity() > 9000)
                gooCounter++;
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.SlimeCraving) >= 0)
                gooCounter++;
            return gooCounter;
        }
        //Nagascore
        nagaScore() {
            var nagaCounter = 0;
            if (this.faceType == 5)
                nagaCounter++;
            if (this.tongueType == 1)
                nagaCounter++;
            if (nagaCounter > 0 && this.antennae == 0)
                nagaCounter++;
            if (nagaCounter > 0 && this.wingType == 0)
                nagaCounter++;
            return nagaCounter;
        }
        //Bunnyscore
        bunnyScore() {
            var bunnyCounter = 0;
            if (this.faceType == 8)
                bunnyCounter++;
            if (this.tailType == 10)
                bunnyCounter++;
            if (this.earType == 7)
                bunnyCounter++;
            if (this.lowerBody == 12)
                bunnyCounter++;
            //More than 2 balls reduces bunny score
            if (this.balls > 2 && bunnyCounter > 0)
                bunnyCounter--;
            //Human skin on bunmorph adds
            if (this.skinType == 0 && bunnyCounter > 1)
                bunnyCounter++;
            //No wings and antennae a plus
            if (bunnyCounter > 0 && this.antennae == 0)
                bunnyCounter++;
            if (bunnyCounter > 0 && this.wingType == 0)
                bunnyCounter++;
            return bunnyCounter;
        }
        //Harpyscore
        harpyScore() {
            var harpy = 0;
            if (this.armType == 1)
                harpy++;
            if (this.hairType == 1)
                harpy++;
            if (this.wingType == 9)
                harpy++;
            if (this.tailType == 11)
                harpy++;
            if (this.lowerBody == 13)
                harpy++;
            if (harpy >= 2 && this.faceType == 0)
                harpy++;
            if (harpy >= 2 && (this.earType == 0 || this.earType == 4))
                harpy++;
            return harpy;
        }
        //Kangascore
        kangaScore() {
            var kanga = 0;
            if (this.kangaCocks() > 0)
                kanga++;
            if (this.earType == 8)
                kanga++;
            if (this.tailType == 12)
                kanga++;
            if (this.lowerBody == 14)
                kanga++;
            if (this.faceType == 9)
                kanga++;
            if (kanga >= 2 && this.skinType == 1)
                kanga++;
            return kanga;
        }
        //sharkscore
        sharkScore() {
            var sharkCounter = 0;
            if (this.faceType == 4)
                sharkCounter++;
            if (this.wingType == 8)
                sharkCounter++;
            if (this.tailType == 7)
                sharkCounter++;
            return sharkCounter;
        }
        //Determine Mutant Rating
        mutantScore() {
            var mutantCounter = 0;
            if (this.faceType > 0)
                mutantCounter++;
            if (this.skinType > 0)
                mutantCounter++;
            if (this.tailType > 0)
                mutantCounter++;
            if (this.cockTotal() > 1)
                mutantCounter++;
            if (this.hasCock() && this.hasVagina())
                mutantCounter++;
            if (this.hasFuckableNipples())
                mutantCounter++;
            if (this.breastRows.length > 1)
                mutantCounter++;
            if (this.faceType == 1) {
                if (this.skinType == 1)
                    mutantCounter--;
                if (this.tailType == 1)
                    mutantCounter--;
            }
            if (this.faceType == 2) {
                if (this.skinType == 1)
                    mutantCounter--;
                if (this.tailType == 2)
                    mutantCounter--;
            }
            return mutantCounter--;
        }
        lactationQ() {
            if (this.biggestLactation() < 1)
                return 0;
            //(Milk production TOTAL= breastSize x 10 * lactationMultiplier * breast total * milking-endurance (1- default, maxes at 2.  Builds over time as milking as done)
            //(Small – 0.01 mLs – Size 1 + 1 Multi)
            //(Large – 0.8 - Size 10 + 4 Multi)
            //(HUGE – 2.4 - Size 12 + 5 Multi + 4 tits)
            var total;
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.LactationEndurance) < 0)
                this.createStatusAffect(StatusAffects_1.StatusAffects.LactationEndurance, 1, 0, 0, 0);
            total = this.biggestTitSize() * 10 * this.averageLactation() * this.statusAffectv1(StatusAffects_1.StatusAffects.LactationEndurance) * this.totalBreasts();
            if (this.statusAffectv1(StatusAffects_1.StatusAffects.LactationReduction) >= 48)
                total = total * 1.5;
            return total;
        }
        isLactating() {
            if (this.lactationQ() > 0)
                return true;
            return false;
        }
        cuntChange(cArea, display, spacingsF = false, spacingsB = true) {
            if (this.vaginas.length == 0)
                return false;
            var wasVirgin = this.vaginas[0].virgin;
            var stretched = this.cuntChangeNoDisplay(cArea);
            var devirgined = wasVirgin && !this.vaginas[0].virgin;
            if (devirgined) {
                if (spacingsF)
                    this.outputText("  ");
                this.outputText("<b>Your hymen is torn, robbing you of your virginity.</b>", false);
                if (spacingsB)
                    this.outputText("  ");
            }
            //STRETCH SUCCESSFUL - begin flavor text if outputting it!
            if (display && stretched) {
                //Virgins get different formatting
                if (devirgined) {
                    //If no spaces after virgin loss
                    if (!spacingsB)
                        this.outputText("  ");
                }
                //Non virgins as usual
                else if (spacingsF)
                    this.outputText("  ");
                if (this.vaginas[0].vaginalLooseness == appearanceDefs_1.VAGINA_LOOSENESS_LEVEL_CLOWN_CAR)
                    this.outputText("<b>Your " + Appearance_1.Appearance.vaginaDescript(this, 0) + " is stretched painfully wide, large enough to accomodate most beasts and demons.</b>");
                if (this.vaginas[0].vaginalLooseness == appearanceDefs_1.VAGINA_LOOSENESS_GAPING_WIDE)
                    this.outputText("<b>Your " + Appearance_1.Appearance.vaginaDescript(this, 0) + " is stretched so wide that it gapes continually.</b>");
                if (this.vaginas[0].vaginalLooseness == appearanceDefs_1.VAGINA_LOOSENESS_GAPING)
                    this.outputText("<b>Your " + Appearance_1.Appearance.vaginaDescript(this, 0) + " painfully stretches, the lips now wide enough to gape slightly.</b>");
                if (this.vaginas[0].vaginalLooseness == appearanceDefs_1.VAGINA_LOOSENESS_LOOSE)
                    this.outputText("<b>Your " + Appearance_1.Appearance.vaginaDescript(this, 0) + " is now very loose.</b>", false);
                if (this.vaginas[0].vaginalLooseness == appearanceDefs_1.VAGINA_LOOSENESS_NORMAL)
                    this.outputText("<b>Your " + Appearance_1.Appearance.vaginaDescript(this, 0) + " is now a little loose.</b>", false);
                if (this.vaginas[0].vaginalLooseness == appearanceDefs_1.VAGINA_LOOSENESS_TIGHT)
                    this.outputText("<b>Your " + Appearance_1.Appearance.vaginaDescript(this, 0) + " is stretched out to a more normal size.</b>");
                if (spacingsB)
                    this.outputText("  ");
            }
            return stretched;
        }
        buttChange(cArea, display, spacingsF = true, spacingsB = true) {
            var stretched = this.buttChangeNoDisplay(cArea);
            //STRETCH SUCCESSFUL - begin flavor text if outputting it!
            if (stretched && display) {
                if (spacingsF)
                    this.outputText("  ");
                this.buttChangeDisplay();
                if (spacingsB)
                    this.outputText("  ");
            }
            return stretched;
        }
        buttChangeDisplay() {
            if (this.ass.analLooseness == 5)
                this.outputText("<b>Your " + Appearance_1.Appearance.assholeDescript(this) + " is stretched even wider, capable of taking even the largest of demons and beasts.</b>");
            if (this.ass.analLooseness == 4)
                this.outputText("<b>Your " + Appearance_1.Appearance.assholeDescript(this) + " becomes so stretched that it gapes continually.</b>", false);
            if (this.ass.analLooseness == 3)
                this.outputText("<b>Your " + Appearance_1.Appearance.assholeDescript(this) + " is now very loose.</b>");
            if (this.ass.analLooseness == 2)
                this.outputText("<b>Your " + Appearance_1.Appearance.assholeDescript(this) + " is now a little loose.</b>");
            if (this.ass.analLooseness == 1)
                this.outputText("<b>You have lost your anal virginity.</b>", false);
        }
        slimeFeed() {
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.SlimeCraving) >= 0) {
                //Reset craving value
                this.changeStatusValue(StatusAffects_1.StatusAffects.SlimeCraving, 1, 0);
                //Flag to display feed update and restore stats in event parser
                if (this.findStatusAffect(StatusAffects_1.StatusAffects.SlimeCravingFeed) < 0) {
                    this.createStatusAffect(StatusAffects_1.StatusAffects.SlimeCravingFeed, 0, 0, 0, 0);
                }
            }
            if (this.findPerk(PerkLib_1.PerkLib.Diapause) >= 0) {
                this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00228] += 3 + Player.rand(3);
                this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00229] = 1;
            }
        }
        minoCumAddiction(raw = 10) {
            //Increment minotaur cum intake count
            this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00340]++;
            //Fix if variables go out of range.
            if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] < 0)
                this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] = 0;
            if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] < 0)
                this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] = 0;
            if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] > 120)
                this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] = 120;
            //Turn off withdrawal
            //if(flags[kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] > 1) flags[kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] = 1;
            //Reset counter
            this.flags[kFLAGS_1.kFLAGS.TIME_SINCE_LAST_CONSUMED_MINOTAUR_CUM] = 0;
            //If highly addicted, rises slower
            if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] >= 60)
                raw /= 2;
            if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] >= 80)
                raw /= 2;
            if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] >= 90)
                raw /= 2;
            //If in withdrawl, readdiction is potent!
            if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] == 3)
                raw += 10;
            if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] == 2)
                raw += 5;
            raw = Math.round(raw * 100) / 100;
            //PUT SOME CAPS ON DAT' SHIT
            if (raw > 50)
                raw = 50;
            if (raw < -50)
                raw = -50;
            this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] += raw;
            //Recheck to make sure shit didn't break
            if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] > 120)
                this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] = 120;
            if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] < 0)
                this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_TRACKER] = 0;
        }
        hasSpells() {
            return this.spellCount() > 0;
        }
        spellCount() {
            const spells = [StatusAffects_1.StatusAffects.KnowsArouse, StatusAffects_1.StatusAffects.KnowsHeal, StatusAffects_1.StatusAffects.KnowsMight, StatusAffects_1.StatusAffects.KnowsCharge, StatusAffects_1.StatusAffects.KnowsBlind, StatusAffects_1.StatusAffects.KnowsWhitefire];
            return this.statusAffects.filter((effect) => spells.find((spell) => spell === effect.stype)).length;
        }
        hairDescript() {
            return Appearance_1.Appearance.hairDescription(this);
        }
        shrinkTits(ignore_hyper_happy = false) {
            if (this.flags[kFLAGS_1.kFLAGS.HYPER_HAPPY] && !ignore_hyper_happy) {
                return;
            }
            if (this.breastRows.length == 1) {
                if (this.breastRows[0].breastRating > 0) {
                    //Shrink if bigger than N/A cups
                    var temp;
                    temp = 1;
                    this.breastRows[0].breastRating--;
                    //Shrink again 50% chance
                    if (this.breastRows[0].breastRating >= 1 && Player.rand(2) == 0 && this.findPerk(PerkLib_1.PerkLib.BigTits) < 0) {
                        temp++;
                        this.breastRows[0].breastRating--;
                    }
                    if (this.breastRows[0].breastRating < 0)
                        this.breastRows[0].breastRating = 0;
                    //Talk about shrinkage
                    if (temp == 1)
                        this.outputText("\n\nYou feel a weight lifted from you, and realize your breasts have shrunk!  With a quick measure, you determine they're now " + this.breastCup(0) + "s.", false);
                    if (temp == 2)
                        this.outputText("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are much smaller!  With a quick measure, you determine they're now " + this.breastCup(0) + "s.", false);
                }
            }
            else if (this.breastRows.length > 1) {
                //multiple
                this.outputText("\n", false);
                //temp2 = amount changed
                //temp3 = counter
                var temp2 = 0;
                var temp3 = this.breastRows.length;
                while (temp3 > 0) {
                    temp3--;
                    if (this.breastRows[temp3].breastRating > 0) {
                        this.breastRows[temp3].breastRating--;
                        if (this.breastRows[temp3].breastRating < 0)
                            this.breastRows[temp3].breastRating = 0;
                        temp2++;
                        this.outputText("\n", false);
                        if (temp3 < this.breastRows.length - 1)
                            this.outputText("...and y", false);
                        else
                            this.outputText("Y", false);
                        this.outputText("our " + this.breastDescript(temp3) + " shrink, dropping to " + this.breastCup(temp3) + "s.", false);
                    }
                    if (this.breastRows[temp3].breastRating < 0)
                        this.breastRows[temp3].breastRating = 0;
                }
                if (temp2 == 2)
                    this.outputText("\nYou feel so much lighter after the change.", false);
                if (temp2 == 3)
                    this.outputText("\nWithout the extra weight you feel particularly limber.", false);
                if (temp2 >= 4)
                    this.outputText("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.", false);
            }
        }
        growTits(amount, rowsGrown, display, growthType) {
            if (this.breastRows.length == 0)
                return;
            //GrowthType 1 = smallest grows
            //GrowthType 2 = Top Row working downward
            //GrowthType 3 = Only top row
            var temp2 = 0;
            // var temp3: number = 0;
            //Chance for "big tits" perked characters to grow larger!
            if (this.findPerk(PerkLib_1.PerkLib.BigTits) >= 0 && Player.rand(3) == 0 && amount < 1)
                amount = 1;
            // Needs to be a number, since uint will round down to 0 prevent growth beyond a certain point
            var temp = this.breastRows.length;
            if (growthType == 1) {
                //Select smallest breast, grow it, move on
                while (rowsGrown > 0) {
                    //Temp = counter
                    temp = this.breastRows.length;
                    //Temp2 = smallest tits index
                    temp2 = 0;
                    //Find smallest row
                    while (temp > 0) {
                        temp--;
                        if (this.breastRows[temp].breastRating < this.breastRows[temp2].breastRating)
                            temp2 = temp;
                    }
                    //Temp 3 tracks total amount grown
                    // temp3 += amount;
                    console_1.trace("Breastrow chosen for growth: " + String(temp2) + ".");
                    //Reuse temp to store growth amount for diminishing returns.
                    temp = amount;
                    if (!this.flags[kFLAGS_1.kFLAGS.HYPER_HAPPY]) {
                        //Diminishing returns!
                        if (this.breastRows[temp2].breastRating > 3) {
                            if (this.findPerk(PerkLib_1.PerkLib.BigTits) < 0)
                                temp /= 1.5;
                            else
                                temp /= 1.3;
                        }
                        // WHy are there three options here. They all have the same result.
                        if (this.breastRows[temp2].breastRating > 7) {
                            if (this.findPerk(PerkLib_1.PerkLib.BigTits) < 0)
                                temp /= 2;
                            else
                                temp /= 1.5;
                        }
                        if (this.breastRows[temp2].breastRating > 9) {
                            if (this.findPerk(PerkLib_1.PerkLib.BigTits) < 0)
                                temp /= 2;
                            else
                                temp /= 1.5;
                        }
                        if (this.breastRows[temp2].breastRating > 12) {
                            if (this.findPerk(PerkLib_1.PerkLib.BigTits) < 0)
                                temp /= 2;
                            else
                                temp /= 1.5;
                        }
                    }
                    //Grow!
                    console_1.trace("Growing breasts by ", temp);
                    this.breastRows[temp2].breastRating += temp;
                    rowsGrown--;
                }
            }
            if (!this.flags[kFLAGS_1.kFLAGS.HYPER_HAPPY]) {
                //Diminishing returns!
                if (this.breastRows[0].breastRating > 3) {
                    if (this.findPerk(PerkLib_1.PerkLib.BigTits) < 0)
                        amount /= 1.5;
                    else
                        amount /= 1.3;
                }
                if (this.breastRows[0].breastRating > 7) {
                    if (this.findPerk(PerkLib_1.PerkLib.BigTits) < 0)
                        amount /= 2;
                    else
                        amount /= 1.5;
                }
                if (this.breastRows[0].breastRating > 12) {
                    if (this.findPerk(PerkLib_1.PerkLib.BigTits) < 0)
                        amount /= 2;
                    else
                        amount /= 1.5;
                }
            }
            /*if(breastRows[0].breastRating > 12) {
                if(hasPerk("Big Tits") < 0) amount/=2;
                else amount /= 1.5;
            }*/
            if (growthType == 2) {
                temp = 0;
                //Start at top and keep growing down, back to top if hit bottom before done.
                while (rowsGrown > 0) {
                    if (temp + 1 > this.breastRows.length)
                        temp = 0;
                    this.breastRows[temp].breastRating += amount;
                    console_1.trace("Breasts increased by " + amount + " on row " + temp);
                    temp++;
                    // temp3 += amount;
                    rowsGrown--;
                }
            }
            if (growthType == 3) {
                while (rowsGrown > 0) {
                    rowsGrown--;
                    this.breastRows[0].breastRating += amount;
                    // temp3 += amount;
                }
            }
            //Breast Growth Finished...talk about changes.
            console_1.trace("Growth ammout = ", amount);
            if (display) {
                if (growthType < 3) {
                    if (amount <= 2) {
                        if (this.breastRows.length > 1)
                            this.outputText("Your rows of " + this.breastDescript(0) + " jiggle with added weight, growing a bit larger.", false);
                        if (this.breastRows.length == 1)
                            this.outputText("Your " + this.breastDescript(0) + " jiggle with added weight as they expand, growing a bit larger.", false);
                    }
                    else if (amount <= 4) {
                        if (this.breastRows.length > 1)
                            this.outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your rows of " + this.breastDescript(0) + " expand significantly.", false);
                        if (this.breastRows.length == 1)
                            this.outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + this.breastDescript(0) + " expand significantly.", false);
                    }
                    else {
                        if (this.breastRows.length > 1)
                            this.outputText("You drop to your knees from a massive change in your body's center of gravity.  Your " + this.breastDescript(0) + " tingle strongly, growing disturbingly large.", false);
                        if (this.breastRows.length == 1)
                            this.outputText("You drop to your knees from a massive change in your center of gravity.  The tingling in your " + this.breastDescript(0) + " intensifies as they continue to grow at an obscene rate.", false);
                    }
                    if (this.biggestTitSize() >= 8.5 && this.nippleLength < 2) {
                        this.outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
                        this.nippleLength = 2;
                    }
                    if (this.biggestTitSize() >= 7 && this.nippleLength < 1) {
                        this.outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
                        this.nippleLength = 1;
                    }
                    if (this.biggestTitSize() >= 5 && this.nippleLength < .75) {
                        this.outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
                        this.nippleLength = .75;
                    }
                    if (this.biggestTitSize() >= 3 && this.nippleLength < .5) {
                        this.outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
                        this.nippleLength = .5;
                    }
                }
                else {
                    if (amount <= 2) {
                        if (this.breastRows.length > 1)
                            this.outputText("Your top row of " + this.breastDescript(0) + " jiggles with added weight as it expands, growing a bit larger.", false);
                        if (this.breastRows.length == 1)
                            this.outputText("Your row of " + this.breastDescript(0) + " jiggles with added weight as it expands, growing a bit larger.", false);
                    }
                    if (amount > 2 && amount <= 4) {
                        if (this.breastRows.length > 1)
                            this.outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your top row of " + this.breastDescript(0) + " expand significantly.", false);
                        if (this.breastRows.length == 1)
                            this.outputText("You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + this.breastDescript(0) + " expand significantly.", false);
                    }
                    if (amount > 4) {
                        if (this.breastRows.length > 1)
                            this.outputText("You drop to your knees from a massive change in your body's center of gravity.  Your top row of " + this.breastDescript(0) + " tingle strongly, growing disturbingly large.", false);
                        if (this.breastRows.length == 1)
                            this.outputText("You drop to your knees from a massive change in your center of gravity.  The tinglng in your " + this.breastDescript(0) + " intensifies as they continue to grow at an obscene rate.", false);
                    }
                    if (this.biggestTitSize() >= 8.5 && this.nippleLength < 2) {
                        this.outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
                        this.nippleLength = 2;
                    }
                    if (this.biggestTitSize() >= 7 && this.nippleLength < 1) {
                        this.outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
                        this.nippleLength = 1;
                    }
                    if (this.biggestTitSize() >= 5 && this.nippleLength < .75) {
                        this.outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
                        this.nippleLength = .75;
                    }
                    if (this.biggestTitSize() >= 3 && this.nippleLength < .5) {
                        this.outputText("  A tender ache starts at your " + this.nippleDescript(0) + "s as they grow to match your burgeoning breast-flesh.", false);
                        this.nippleLength = .5;
                    }
                }
            }
        }
        //Determine minimum lust
        minLust() {
            var min = 0;
            //Bimbo body boosts minimum lust by 40
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.BimboChampagne) >= 0 || this.findPerk(PerkLib_1.PerkLib.BimboBody) >= 0 || this.findPerk(PerkLib_1.PerkLib.BroBody) >= 0 || this.findPerk(PerkLib_1.PerkLib.FutaForm) >= 0) {
                if (min > 40)
                    min += 10;
                else if (min >= 20)
                    min += 20;
                else
                    min += 40;
            }
            //Omnibus' Gift
            if (this.findPerk(PerkLib_1.PerkLib.OmnibusGift) >= 0) {
                if (min > 40)
                    min += 10;
                else if (min >= 20)
                    min += 20;
                else
                    min += 35;
            }
            //Nymph perk raises to 30
            if (this.findPerk(PerkLib_1.PerkLib.Nymphomania) >= 0) {
                if (min >= 40)
                    min += 10;
                else if (min >= 20)
                    min += 15;
                else
                    min += 30;
            }
            //Oh noes anemone!
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.AnemoneArousal) >= 0) {
                if (min >= 40)
                    min += 10;
                else if (min >= 20)
                    min += 20;
                else
                    min += 30;
            }
            //Hot blooded perk raises min lust!
            if (this.findPerk(PerkLib_1.PerkLib.HotBlooded) >= 0) {
                if (min > 0)
                    min += this.perk(this.findPerk(PerkLib_1.PerkLib.HotBlooded)).value1 / 2;
                else
                    min += this.perk(this.findPerk(PerkLib_1.PerkLib.HotBlooded)).value1;
            }
            if (this.findPerk(PerkLib_1.PerkLib.LuststickAdapted) > 0) {
                if (min < 50)
                    min += 10;
                else
                    min += 5;
            }
            //Add points for Crimstone
            min += this.perkv1(PerkLib_1.PerkLib.PiercedCrimstone);
            min += this.perkv1(PerkLib_1.PerkLib.PentUp);
            //Harpy Lipstick status forces minimum lust to be at least 50.
            if (min < 50 && this.findStatusAffect(StatusAffects_1.StatusAffects.Luststick) >= 0)
                min = 50;
            //SHOULDRA BOOSTS
            //+20
            if (this.flags[kFLAGS_1.kFLAGS.SHOULDRA_SLEEP_TIMER] <= -168) {
                min += 20;
                if (this.flags[kFLAGS_1.kFLAGS.SHOULDRA_SLEEP_TIMER] <= -216)
                    min += 30;
            }
            //SPOIDAH BOOSTS
            if (this.eggs() >= 20) {
                min += 10;
                if (this.eggs() >= 40)
                    min += 10;
            }
            if (min < 30 && this.armorName == "lusty maiden's armor")
                min = 30;
            return min;
        }
        minotaurAddicted() {
            return this.findPerk(PerkLib_1.PerkLib.MinotaurCumAddict) >= 0 || this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] >= 1;
        }
        minotaurNeed() {
            return this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] > 1;
        }
        clearStatuses(visibility) {
            while (this.findStatusAffect(StatusAffects_1.StatusAffects.Web) >= 0) {
                this.spe += this.statusAffectv1(StatusAffects_1.StatusAffects.Web);
                kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatUp('spe');
                // speUp.visible = true;
                // speDown.visible = false;
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Web);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Shielding) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Shielding);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.HolliConstrict) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.HolliConstrict);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.LustStones) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.LustStones);
            if (kGAMECLASS_1.kGAMECLASS.monster.findStatusAffect(StatusAffects_1.StatusAffects.Sandstorm) >= 0)
                kGAMECLASS_1.kGAMECLASS.monster.removeStatusAffect(StatusAffects_1.StatusAffects.Sandstorm);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Sealed) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Sealed);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Berzerking) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Berzerking);
            }
            if (kGAMECLASS_1.kGAMECLASS.monster.findStatusAffect(StatusAffects_1.StatusAffects.TailWhip) >= 0) {
                kGAMECLASS_1.kGAMECLASS.monster.removeStatusAffect(StatusAffects_1.StatusAffects.TailWhip);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.UBERWEB) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.UBERWEB);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.DriderKiss) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.DriderKiss);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.WebSilence) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.WebSilence);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.GooArmorSilence) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.GooArmorSilence);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Bound) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Bound);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.GooArmorBind) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.GooArmorBind);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Whispered) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Whispered);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.AkbalSpeed) >= 0) {
                kGAMECLASS_1.kGAMECLASS.dynStats("spe", this.statusAffectv1(StatusAffects_1.StatusAffects.AkbalSpeed) * -1);
                this.removeStatusAffect(StatusAffects_1.StatusAffects.AkbalSpeed);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.AmilyVenom) >= 0) {
                kGAMECLASS_1.kGAMECLASS.dynStats("str", this.statusAffectv1(StatusAffects_1.StatusAffects.AmilyVenom), "spe", this.statusAffectv2(StatusAffects_1.StatusAffects.AmilyVenom));
                this.removeStatusAffect(StatusAffects_1.StatusAffects.AmilyVenom);
            }
            while (this.findStatusAffect(StatusAffects_1.StatusAffects.Blind) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Blind);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.SheilaOil) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.SheilaOil);
            }
            if (kGAMECLASS_1.kGAMECLASS.monster.findStatusAffect(StatusAffects_1.StatusAffects.TwuWuv) >= 0) {
                this.inte += kGAMECLASS_1.kGAMECLASS.monster.statusAffectv1(StatusAffects_1.StatusAffects.TwuWuv);
                kGAMECLASS_1.kGAMECLASS.statScreenRefresh();
                kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatUp('inte');
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.NagaVenom) >= 0) {
                this.spe += this.statusAffectv1(StatusAffects_1.StatusAffects.NagaVenom);
                kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatUp('spe');
                //stats(0,0,statusAffectv1(StatusAffects.NagaVenom),0,0,0,0,0);
                this.removeStatusAffect(StatusAffects_1.StatusAffects.NagaVenom);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.TentacleBind) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.TentacleBind);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.NagaBind) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.NagaBind);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.StoneLust) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.StoneLust);
            }
            this.removeStatusAffect(StatusAffects_1.StatusAffects.FirstAttack);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.TemporaryHeat) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.TemporaryHeat);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.NoFlee) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.NoFlee);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Poison) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Poison);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.IsabellaStunned) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.IsabellaStunned);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Stunned) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Stunned);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Confusion) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Confusion);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.ThroatPunch) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.ThroatPunch);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.KissOfDeath) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.KissOfDeath);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.AcidSlap) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.AcidSlap);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.GooBind) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.GooBind);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.HarpyBind) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.HarpyBind);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.CalledShot) >= 0) {
                this.spe += this.statusAffectv1(StatusAffects_1.StatusAffects.CalledShot);
                kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatUp('spe');
                // speDown.visible = false;
                // speUp.visible = true;
                this.removeStatusAffect(StatusAffects_1.StatusAffects.CalledShot);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.DemonSeed) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.DemonSeed);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.ParalyzeVenom) >= 0) {
                this.str += this.statusAffect(this.findStatusAffect(StatusAffects_1.StatusAffects.ParalyzeVenom)).value1;
                this.spe += this.statusAffect(this.findStatusAffect(StatusAffects_1.StatusAffects.ParalyzeVenom)).value2;
                this.removeStatusAffect(StatusAffects_1.StatusAffects.ParalyzeVenom);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.lustvenom) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.lustvenom);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.InfestAttempted) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.InfestAttempted);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Might) >= 0) {
                kGAMECLASS_1.kGAMECLASS.dynStats("str", -this.statusAffectv1(StatusAffects_1.StatusAffects.Might), "tou", -this.statusAffectv2(StatusAffects_1.StatusAffects.Might));
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Might);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.ChargeWeapon) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.ChargeWeapon);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Disarmed) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Disarmed);
                if (this.weapon == WeaponLib_1.WeaponLib.FISTS) {
                    //					weapon = ItemType.lookupItem(flags[kFLAGS.PLAYER_DISARMED_WEAPON_ID]) as Weapon;
                    //					(ItemType.lookupItem(flags[kFLAGS.PLAYER_DISARMED_WEAPON_ID]) as Weapon).doEffect(this, false);
                    this.setWeapon(ItemType_1.ItemType.lookupItem(this.flags[kFLAGS_1.kFLAGS.PLAYER_DISARMED_WEAPON_ID]));
                }
                else {
                    this.flags[kFLAGS_1.kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = this.flags[kFLAGS_1.kFLAGS.PLAYER_DISARMED_WEAPON_ID];
                }
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.AnemoneVenom) >= 0) {
                this.str += this.statusAffectv1(StatusAffects_1.StatusAffects.AnemoneVenom);
                this.spe += this.statusAffectv2(StatusAffects_1.StatusAffects.AnemoneVenom);
                //Make sure nothing got out of bounds
                kGAMECLASS_1.kGAMECLASS.dynStats("cor", 0);
                kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatUp('spe');
                kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatUp('str');
                // speUp.visible = true;
                // strUp.visible = true;
                this.removeStatusAffect(StatusAffects_1.StatusAffects.AnemoneVenom);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.GnollSpear) >= 0) {
                this.spe += this.statusAffectv1(StatusAffects_1.StatusAffects.GnollSpear);
                //Make sure nothing got out of bounds
                kGAMECLASS_1.kGAMECLASS.dynStats("cor", 0);
                kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatUp('spe');
                // speUp.visible = true;
                // speDown.visible = false;
                this.removeStatusAffect(StatusAffects_1.StatusAffects.GnollSpear);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.BasiliskCompulsion) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.BasiliskCompulsion);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.BasiliskSlow) >= 0) {
                this.spe += this.statusAffectv1(StatusAffects_1.StatusAffects.BasiliskSlow);
                kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatUp('spe');
                // speUp.visible = true;
                // speDown.visible = false;
                this.removeStatusAffect(StatusAffects_1.StatusAffects.BasiliskSlow);
            }
            while (this.findStatusAffect(StatusAffects_1.StatusAffects.IzmaBleed) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.IzmaBleed);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.GardenerSapSpeed) >= 0) {
                this.spe += this.statusAffectv1(StatusAffects_1.StatusAffects.GardenerSapSpeed);
                kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatUp('spe');
                this.removeStatusAffect(StatusAffects_1.StatusAffects.GardenerSapSpeed);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.KnockedBack) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.KnockedBack);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.RemovedArmor) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.KnockedBack);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.JCLustLevel) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.JCLustLevel);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.MirroredAttack) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.MirroredAttack);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Tentagrappled) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Tentagrappled);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.TentagrappleCooldown) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.TentagrappleCooldown);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.ShowerDotEffect) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.ShowerDotEffect);
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.GardenerSapSpeed) >= 0) {
                this.spe += this.statusAffectv1(StatusAffects_1.StatusAffects.GardenerSapSpeed);
                kGAMECLASS_1.kGAMECLASS.mainView.statsView.showStatUp('spe');
                this.removeStatusAffect(StatusAffects_1.StatusAffects.GardenerSapSpeed);
            }
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.VineHealUsed) >= 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.VineHealUsed);
        }
        consumeItem(itype, amount = 1) {
            if (!this.hasItem(itype, amount)) {
                CoC_Settings_1.CoC_Settings.error("ERROR: consumeItem attempting to find " + amount + " item" + (amount > 1 ? "s" : "") + " to remove when the player has " + this.itemCount(itype) + ".");
                return false;
            }
            //From here we can be sure the player has enough of the item in inventory
            var slot;
            while (amount > 0) {
                slot = this.getLowestSlot(itype); //Always draw from the least filled slots first
                if (slot.quantity > amount) {
                    slot.quantity -= amount;
                    amount = 0;
                }
                else { //If the slot holds the amount needed then amount will be zero after this
                    amount -= slot.quantity;
                    slot.emptySlot();
                }
            }
            return true;
            /*
                    var  consumed: boolean = false;
                    var  slot:ItemSlotClass;
                        while (amount > 0)
                        {
                            if(!hasItem(itype,1))
                            {
                                CoC_Settings.error("ERROR: consumeItem in items.as attempting to find an item to remove when the has none.");
                                break;
                            }
                            trace("FINDING A NEW SLOT! (ITEMS LEFT: " + amount + ")");
                            slot = getLowestSlot(itype);
                            while (slot != undefined && amount > 0 && slot.quantity > 0)
                            {
                                amount--;
                                slot.quantity--;
                                if(slot.quantity == 0) slot.emptySlot();
                                trace("EATIN' AN ITEM");
                            }
                            //If on slot 5 and it doesn't have any more to take, break out!
                            if(slot == undefined) amount = -1
            
                        }
                        if(amount == 0) consumed = true;
                        return consumed;
            */
        }
        getLowestSlot(itype) {
            var minslot;
            for (var slot of this.itemSlots) {
                if (slot.itype == itype) {
                    if (minslot == undefined || slot.quantity < minslot.quantity) {
                        minslot = slot;
                    }
                }
            }
            return minslot;
        }
        hasItem(itype, minQuantity = 1) {
            return this.itemCount(itype) >= minQuantity;
        }
        itemCount(itype) {
            var count = 0;
            for (var itemSlot of this.itemSlots) {
                if (itemSlot.itype == itype)
                    count += itemSlot.quantity;
            }
            return count;
        }
        // 0..5 or -1 if no
        roomInExistingStack(itype) {
            for (var i = 0; i < this.itemSlots.length; i++) {
                if (this.itemSlot(i).itype == itype && this.itemSlot(i).quantity != 0 && this.itemSlot(i).quantity < 5)
                    return i;
            }
            return -1;
        }
        itemSlot(idx) {
            return this.itemSlots[idx];
        }
        // 0..5 or -1 if no
        emptySlot() {
            for (var i = 0; i < this.itemSlots.length; i++) {
                if (this.itemSlot(i).isEmpty() && this.itemSlot(i).unlocked)
                    return i;
            }
            return -1;
        }
        destroyItems(itype, numOfItemToRemove) {
            for (var slotNum = 0; slotNum < this.itemSlots.length; slotNum += 1) {
                if (this.itemSlot(slotNum).itype == itype) {
                    while (this.itemSlot(slotNum).quantity > 0 && numOfItemToRemove > 0) {
                        this.itemSlot(slotNum).removeOneItem();
                        numOfItemToRemove--;
                    }
                }
            }
            return numOfItemToRemove <= 0;
        }
        lengthChange(temp2, ncocks) {
            if (temp2 < 0 && this.flags[kFLAGS_1.kFLAGS.HYPER_HAPPY]) // Early return for hyper-happy cheat if the call was *supposed* to shrink a cock.
             {
                return;
            }
            //DIsplay the degree of length change.
            if (temp2 <= 1 && temp2 > 0) {
                if (this.cocks.length == 1)
                    this.outputText("Your " + this.cockDescript(0) + " has grown slightly longer.", false);
                if (this.cocks.length > 1) {
                    if (ncocks == 1)
                        this.outputText("One of your " + this.multiCockDescriptLight() + " grows slightly longer.", false);
                    if (ncocks > 1 && ncocks < this.cocks.length)
                        this.outputText("Some of your " + this.multiCockDescriptLight() + " grow slightly longer.", false);
                    if (ncocks == this.cocks.length)
                        this.outputText("Your " + this.multiCockDescriptLight() + " seem to fill up... growing a little bit larger.", false);
                }
            }
            if (temp2 > 1 && temp2 < 3) {
                if (this.cocks.length == 1)
                    this.outputText("A very pleasurable feeling spreads from your groin as your " + this.cockDescript(0) + " grows permanently longer - at least an inch - and leaks pre-cum from the pleasure of the change.", false);
                if (this.cocks.length > 1) {
                    if (ncocks == this.cocks.length)
                        this.outputText("A very pleasurable feeling spreads from your groin as your " + this.multiCockDescriptLight() + " grow permanently longer - at least an inch - and leak plenty of pre-cum from the pleasure of the change.", false);
                    if (ncocks == 1)
                        this.outputText("A very pleasurable feeling spreads from your groin as one of your " + this.multiCockDescriptLight() + " grows permanently longer, by at least an inch, and leaks plenty of pre-cum from the pleasure of the change.", false);
                    if (ncocks > 1 && ncocks < this.cocks.length)
                        this.outputText("A very pleasurable feeling spreads from your groin as " + Player.num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " grow permanently longer, by at least an inch, and leak plenty of pre-cum from the pleasure of the change.", false);
                }
            }
            if (temp2 >= 3) {
                if (this.cocks.length == 1)
                    this.outputText("Your " + this.cockDescript(0) + " feels incredibly tight as a few more inches of length seem to pour out from your crotch.", false);
                if (this.cocks.length > 1) {
                    if (ncocks == 1)
                        this.outputText("Your " + this.multiCockDescriptLight() + " feel incredibly tight as one of their number begins to grow inch after inch of length.", false);
                    if (ncocks > 1 && ncocks < this.cocks.length)
                        this.outputText("Your " + this.multiCockDescriptLight() + " feel incredibly number as " + Player.num2Text(ncocks) + " of them begin to grow inch after inch of added length.", false);
                    if (ncocks == this.cocks.length)
                        this.outputText("Your " + this.multiCockDescriptLight() + " feel incredibly tight as inch after inch of length pour out from your groin.", false);
                }
            }
            //Display LengthChange
            if (temp2 > 0) {
                if (this.cocks[0].cockLength >= 8 && this.cocks[0].cockLength - temp2 < 8) {
                    if (this.cocks.length == 1)
                        this.outputText("  <b>Most men would be overly proud to have a tool as long as yours.</b>", false);
                    if (this.cocks.length > 1)
                        this.outputText("  <b>Most men would be overly proud to have one cock as long as yours, let alone " + this.multiCockDescript() + ".</b>", false);
                }
                if (this.cocks[0].cockLength >= 12 && this.cocks[0].cockLength - temp2 < 12) {
                    if (this.cocks.length == 1)
                        this.outputText("  <b>Your " + this.cockDescript(0) + " is so long it nearly swings to your knee at its full length.</b>", false);
                    if (this.cocks.length > 1)
                        this.outputText("  <b>Your " + this.multiCockDescriptLight() + " are so long they nearly reach your knees when at full length.</b>", false);
                }
                if (this.cocks[0].cockLength >= 16 && this.cocks[0].cockLength - temp2 < 16) {
                    if (this.cocks.length == 1)
                        this.outputText("  <b>Your " + this.cockDescript(0) + " would look more at home on a large horse than you.</b>", false);
                    if (this.cocks.length > 1)
                        this.outputText("  <b>Your " + this.multiCockDescriptLight() + " would look more at home on a large horse than on your body.</b>", false);
                    if (this.biggestTitSize() >= appearanceDefs_1.BREAST_CUP_C) {
                        if (this.cocks.length == 1)
                            this.outputText("  You could easily stuff your " + this.cockDescript(0) + " between your breasts and give yourself the titty-fuck of a lifetime.", false);
                        if (this.cocks.length > 1)
                            this.outputText("  They reach so far up your chest it would be easy to stuff a few cocks between your breasts and give yourself the titty-fuck of a lifetime.", false);
                    }
                    else {
                        if (this.cocks.length == 1)
                            this.outputText("  Your " + this.cockDescript(0) + " is so long it easily reaches your chest.  The possibility of autofellatio is now a foregone conclusion.", false);
                        if (this.cocks.length > 1)
                            this.outputText("  Your " + this.multiCockDescriptLight() + " are so long they easily reach your chest.  Autofellatio would be about as hard as looking down.", false);
                    }
                }
                if (this.cocks[0].cockLength >= 20 && this.cocks[0].cockLength - temp2 < 20) {
                    if (this.cocks.length == 1)
                        this.outputText("  <b>As if the pulsing heat of your " + this.cockDescript(0) + " wasn't enough, the tip of your " + this.cockDescript(0) + " keeps poking its way into your view every time you get hard.</b>", false);
                    if (this.cocks.length > 1)
                        this.outputText("  <b>As if the pulsing heat of your " + this.multiCockDescriptLight() + " wasn't bad enough, every time you get hard, the tips of your " + this.multiCockDescriptLight() + " wave before you, obscuring the lower portions of your vision.</b>", false);
                    if (this.cor > 40 && this.cor <= 60) {
                        if (this.cocks.length > 1)
                            this.outputText("  You wonder if there is a demon or beast out there that could take the full length of one of your " + this.multiCockDescriptLight() + "?", false);
                        if (this.cocks.length == 1)
                            this.outputText("  You wonder if there is a demon or beast out there that could handle your full length.", false);
                    }
                    if (this.cor > 60 && this.cor <= 80) {
                        if (this.cocks.length > 1)
                            this.outputText("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + this.multiCockDescriptLight() + " to their hilts, milking you dry.\n\nYou smile at the pleasant thought.", false);
                        if (this.cocks.length == 1)
                            this.outputText("  You daydream about being attacked by a massive tentacle beast, its tentacles engulfing your " + this.cockDescript(0) + " to the hilt, milking it of all your cum.\n\nYou smile at the pleasant thought.", false);
                    }
                    if (this.cor > 80) {
                        if (this.cocks.length > 1)
                            this.outputText("  You find yourself fantasizing about impaling nubile young champions on your " + this.multiCockDescriptLight() + " in a year's time.", false);
                    }
                }
            }
            //Display the degree of length loss.
            if (temp2 < 0 && temp2 >= -1) {
                if (this.cocks.length == 1)
                    this.outputText("Your " + this.multiCockDescriptLight() + " has shrunk to a slightly shorter length.", false);
                if (this.cocks.length > 1) {
                    if (ncocks == this.cocks.length)
                        this.outputText("Your " + this.multiCockDescriptLight() + " have shrunk to a slightly shorter length.", false);
                    if (ncocks > 1 && ncocks < this.cocks.length)
                        this.outputText("You feel " + Player.num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " have shrunk to a slightly shorter length.", false);
                    if (ncocks == 1)
                        this.outputText("You feel " + Player.num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " has shrunk to a slightly shorter length.", false);
                }
            }
            if (temp2 < -1 && temp2 > -3) {
                if (this.cocks.length == 1)
                    this.outputText("Your " + this.multiCockDescriptLight() + " shrinks smaller, flesh vanishing into your groin.", false);
                if (this.cocks.length > 1) {
                    if (ncocks == this.cocks.length)
                        this.outputText("Your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.", false);
                    if (ncocks == 1)
                        this.outputText("You feel " + Player.num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.", false);
                    if (ncocks > 1 && ncocks < this.cocks.length)
                        this.outputText("You feel " + Player.num2Text(ncocks) + " of your " + this.multiCockDescriptLight() + " shrink smaller, the flesh vanishing into your groin.", false);
                }
            }
            if (temp2 <= -3) {
                if (this.cocks.length == 1)
                    this.outputText("A large portion of your " + this.multiCockDescriptLight() + "'s length shrinks and vanishes.", false);
                if (this.cocks.length > 1) {
                    if (ncocks == this.cocks.length)
                        this.outputText("A large portion of your " + this.multiCockDescriptLight() + " receeds towards your groin, receding rapidly in length.", false);
                    if (ncocks == 1)
                        this.outputText("A single member of your " + this.multiCockDescriptLight() + " vanishes into your groin, receding rapidly in length.", false);
                    if (ncocks > 1 && this.cocks.length > ncocks)
                        this.outputText("Your " + this.multiCockDescriptLight() + " tingles as " + Player.num2Text(ncocks) + " of your members vanish into your groin, receding rapidly in length.", false);
                }
            }
        }
        killCocks(deadCock) {
            //Count removal for text bits
            var removed = 0;
            var temp;
            //Holds cock index
            var storedCock = 0;
            //Less than 0 = PURGE ALL
            if (deadCock < 0) {
                deadCock = this.cocks.length;
            }
            //Double loop - outermost counts down cocks to remove, innermost counts down
            while (deadCock > 0) {
                //Find shortest cock and prune it
                temp = this.cocks.length;
                while (temp > 0) {
                    temp--;
                    //If anything is out of bounds set to 0.
                    if (storedCock > this.cocks.length - 1)
                        storedCock = 0;
                    //If temp index is shorter than stored index, store temp to stored index.
                    if (this.cocks[temp].cockLength <= this.cocks[storedCock].cockLength)
                        storedCock = temp;
                }
                //Smallest cock should be selected, now remove it!
                this.removeCock(storedCock, 1);
                removed++;
                deadCock--;
                if (this.cocks.length == 0)
                    deadCock = 0;
            }
            //Texts
            if (removed == 1) {
                if (this.cocks.length == 0) {
                    this.outputText("<b>Your manhood shrinks into your body, disappearing completely.</b>", false);
                    if (this.findStatusAffect(StatusAffects_1.StatusAffects.Infested) >= 0)
                        this.outputText("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.", false);
                }
                if (this.cocks.length == 1) {
                    this.outputText("<b>Your smallest penis disappears, shrinking into your body and leaving you with just one " + this.cockDescript(0) + ".</b>", false);
                }
                if (this.cocks.length > 1) {
                    this.outputText("<b>Your smallest penis disappears forever, leaving you with just your " + this.multiCockDescriptLight() + ".</b>", false);
                }
            }
            if (removed > 1) {
                if (this.cocks.length == 0) {
                    this.outputText("<b>All your male endowments shrink smaller and smaller, disappearing one at a time.</b>", false);
                    if (this.findStatusAffect(StatusAffects_1.StatusAffects.Infested) >= 0)
                        this.outputText("  Like rats fleeing a sinking ship, a stream of worms squirts free from your withering member, slithering away.", false);
                }
                if (this.cocks.length == 1) {
                    this.outputText("<b>You feel " + Player.num2Text(removed) + " cocks disappear into your groin, leaving you with just your " + this.cockDescript(0) + ".", false);
                }
                if (this.cocks.length > 1) {
                    this.outputText("<b>You feel " + Player.num2Text(removed) + " cocks disappear into your groin, leaving you with " + this.multiCockDescriptLight() + ".", false);
                }
            }
            //remove infestation if cockless
            if (this.cocks.length == 0)
                this.removeStatusAffect(StatusAffects_1.StatusAffects.Infested);
            if (this.cocks.length == 0 && this.balls > 0) {
                this.outputText("  <b>Your " + this.sackDescript() + " and " + this.ballsDescriptLight() + " shrink and disappear, vanishing into your groin.</b>", false);
                this.balls = 0;
                this.ballSize = 1;
            }
        }
        modCumMultiplier(delta) {
            console_1.trace("modCumMultiplier called with: " + delta);
            if (delta == 0) {
                console_1.trace("Whoops! modCumMuliplier called with 0... aborting...");
                return delta;
            }
            else if (delta > 0) {
                console_1.trace("and increasing");
                if (this.findPerk(PerkLib_1.PerkLib.MessyOrgasms) >= 0) {
                    console_1.trace("and MessyOrgasms found");
                    delta *= 1.5;
                }
            }
            else if (delta < 0) {
                console_1.trace("and decreasing");
                if (this.findPerk(PerkLib_1.PerkLib.MessyOrgasms) >= 0) {
                    console_1.trace("and MessyOrgasms found");
                    delta *= 0.5;
                }
            }
            console_1.trace("and modifying by " + delta);
            this.cumMultiplier += delta;
            return delta;
        }
        increaseCock(cockNum, lengthDelta) {
            var bigCock = false;
            if (this.findPerk(PerkLib_1.PerkLib.BigCock) >= 0)
                bigCock = true;
            return this.cocks[cockNum].growCock(lengthDelta, bigCock);
        }
        increaseEachCock(lengthDelta) {
            var totalGrowth = 0;
            for (var i = 0; i < this.cocks.length; i++) {
                console_1.trace("increaseEachCock at: " + i);
                totalGrowth += this.increaseCock(i, lengthDelta);
            }
            return totalGrowth;
        }
        // Attempts to put the player in heat (or deeper in heat).
        // Returns true if successful, false if not.
        // The player cannot go into heat if she is already pregnant or is a he.
        // 
        // First parameter: boolean indicating if function should output standard text.
        // Second parameter: numberensity, an integer multiplier that can increase the 
        // duration and intensity. Defaults to 1.
        goIntoHeat(output, intensity = 1) {
            if (!this.hasVagina() || this.pregnancyIncubation != 0) {
                // No vagina or already pregnant, can't go into heat.
                return false;
            }
            //Already in heat, intensify further.
            if (this.inHeat) {
                if (output) {
                    this.outputText("\n\nYour mind clouds as your " + this.vaginaDescript(0) + " moistens.  Despite already being in heat, the desire to copulate constantly grows even larger.", false);
                }
                var temp = this.findStatusAffect(StatusAffects_1.StatusAffects.Heat);
                this.statusAffect(temp).value1 += 5 * intensity;
                this.statusAffect(temp).value2 += 5 * intensity;
                this.statusAffect(temp).value3 += 48 * intensity;
                this.game.dynStats("lib", 5 * intensity, "resisted", false, "noBimbo", true);
            }
            //Go into heat.  Heats v1 is bonus fertility, v2 is bonus libido, v3 is hours till it's gone
            else {
                if (output) {
                    this.outputText("\n\nYour mind clouds as your " + this.vaginaDescript(0) + " moistens.  Your hands begin stroking your body from top to bottom, your sensitive skin burning with desire.  Fantasies about bending over and presenting your needy pussy to a male overwhelm you as <b>you realize you have gone into heat!</b>", false);
                }
                this.createStatusAffect(StatusAffects_1.StatusAffects.Heat, 10 * intensity, 15 * intensity, 48 * intensity, 0);
                this.game.dynStats("lib", 15 * intensity, "resisted", false, "noBimbo", true);
            }
            return true;
        }
        // Attempts to put the player in rut (or deeper in heat).
        // Returns true if successful, false if not.
        // The player cannot go into heat if he is a she.
        // 
        // First parameter: boolean indicating if function should output standard text.
        // Second parameter: numberensity, an integer multiplier that can increase the 
        // duration and intensity. Defaults to 1.
        goIntoRut(output, intensity = 1) {
            if (!this.hasCock()) {
                // No cocks, can't go into rut.
                return false;
            }
            //Has rut, intensify it!
            if (this.inRut) {
                if (output) {
                    this.outputText("\n\nYour " + this.cockDescript(0) + " throbs and dribbles as your desire to mate intensifies.  You know that <b>you've sunken deeper into rut</b>, but all that really matters is unloading into a cum-hungry cunt.", false);
                }
                this.addStatusValue(StatusAffects_1.StatusAffects.Rut, 1, 100 * intensity);
                this.addStatusValue(StatusAffects_1.StatusAffects.Rut, 2, 5 * intensity);
                this.addStatusValue(StatusAffects_1.StatusAffects.Rut, 3, 48 * intensity);
                this.game.dynStats("lib", 5 * intensity, "resisted", false, "noBimbo", true);
            }
            else {
                if (output) {
                    this.outputText("\n\nYou stand up a bit straighter and look around, sniffing the air and searching for a mate.  Wait, what!?  It's hard to shake the thought from your head - you really could use a nice fertile hole to impregnate.  You slap your forehead and realize <b>you've gone into rut</b>!", false);
                }
                //v1 - bonus cum production
                //v2 - bonus libido
                //v3 - time remaining!
                this.createStatusAffect(StatusAffects_1.StatusAffects.Rut, 150 * intensity, 5 * intensity, 100 * intensity, 0);
                this.game.dynStats("lib", 5 * intensity, "resisted", false, "noBimbo", true);
            }
            return true;
        }
    }
    exports.Player = Player;
});
//# sourceMappingURL=Player.js.map