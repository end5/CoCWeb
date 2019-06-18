define(["require", "exports", "../../BaseContent", "./HighMountains/BasiliskScene", "./HighMountains/HarpyScene", "./HighMountains/MinervaScene", "./HighMountains/MinotaurMobScene", "./HighMountains/IzumiScene", "../../GlobalFlags/kFLAGS", "../../PerkLib", "../../../console", "./HighMountains/Harpy", "../../GlobalFlags/kGAMECLASS"], function (require, exports, BaseContent_1, BasiliskScene_1, HarpyScene_1, MinervaScene_1, MinotaurMobScene_1, IzumiScene_1, kFLAGS_1, PerkLib_1, console_1, Harpy_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 06.01.14.
     */
    class HighMountains extends BaseContent_1.BaseContent {
        constructor() {
            super(...arguments);
            this.basiliskScene = new BasiliskScene_1.BasiliskScene();
            this.harpyScene = new HarpyScene_1.HarpyScene();
            this.minervaScene = new MinervaScene_1.MinervaScene();
            this.minotaurMobScene = new MinotaurMobScene_1.MinotaurMobScene();
            this.izumiScenes = new IzumiScene_1.IzumiScene();
        }
        //Explore High Mountain
        exploreHighMountain() {
            this.flags[kFLAGS_1.kFLAGS.DISCOVERED_HIGH_MOUNTAIN]++;
            this.doNext(this.playerMenu);
            if (kGAMECLASS_1.kGAMECLASS.d3.discoverD3() == true) {
                return;
            }
            var chooser = HighMountains.rand(4);
            //Boosts mino and hellhound rates!
            if (this.player.findPerk(PerkLib_1.PerkLib.PiercedFurrite) >= 0 && HighMountains.rand(3) == 0) {
                chooser = 1;
            }
            //Helia monogamy fucks
            if (this.flags[kFLAGS_1.kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && this.flags[kFLAGS_1.kFLAGS.HEL_RAPED_TODAY] == 0 && HighMountains.rand(10) == 0 && this.player.gender > 0 && !kGAMECLASS_1.kGAMECLASS.helScene.followerHel()) {
                kGAMECLASS_1.kGAMECLASS.helScene.helSexualAmbush();
                return;
            }
            //Gats xmas adventure!
            if (HighMountains.rand(5) == 0 && this.player.gender > 0 && this.isHolidays() && this.flags[kFLAGS_1.kFLAGS.GATS_ANGEL_DISABLED] == 0 && this.flags[kFLAGS_1.kFLAGS.GATS_ANGEL_GOOD_ENDED] == 0 && (this.flags[kFLAGS_1.kFLAGS.GATS_ANGEL_QUEST_BEGAN] == 0 || this.player.hasKeyItem("North Star Key") >= 0)) {
                kGAMECLASS_1.kGAMECLASS.gatsSpectacularRouter();
                return;
            }
            //Minerva
            if (this.flags[kFLAGS_1.kFLAGS.DISCOVERED_HIGH_MOUNTAIN] % 8 == 0 && this.flags[kFLAGS_1.kFLAGS.MET_MINERVA] < 4) {
                this.minervaScene.encounterMinerva();
                return;
            }
            //25% minotaur sons!
            if (this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00326] >= 3 && HighMountains.rand(4) == 0 && this.player.hasVagina()) {
                this.spriteSelect(44);
                this.minotaurMobScene.meetMinotaurSons();
                return;
            }
            //Harpy odds!
            if (this.player.hasItem(this.consumables.OVIELIX)) {
                if (this.player.hasItem(this.consumables.OVIELIX, 2)) {
                    if (HighMountains.rand(4) == 0) {
                        this.chickenHarpy();
                        return;
                    }
                }
                else {
                    if (HighMountains.rand(10) == 0) {
                        this.chickenHarpy();
                        return;
                    }
                }
            }
            //10% chance to mino encounter rate if addicted
            if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] > 0 && HighMountains.rand(10) == 0) {
                this.spriteSelect(44);
                //Cum addictus interruptus!  LOL HARRY POTTERFAG
                //Withdrawl auto-fuck!
                if (this.flags[kFLAGS_1.kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] == 3) {
                    this.getGame().mountain.minotaurScene.minoAddictionFuck();
                    return;
                }
                this.getGame().mountain.minotaurScene.getRapedByMinotaur(true);
                this.spriteSelect(44);
                return;
            }
            console_1.trace("Chooser goin for" + chooser);
            //Generic harpy
            if (chooser == 0) {
                this.outputText("A harpy wings out of the sky and attacks!", true);
                this.startCombat(new Harpy_1.Harpy());
                this.spriteSelect(26);
                return;
            }
            //Basilisk!
            if (chooser == 1) {
                this.basiliskScene.basiliskGreeting();
                return;
            }
            //Sophie
            if (chooser == 2) {
                if (this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0 || this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00283] > 0 || kGAMECLASS_1.kGAMECLASS.sophieFollowerScene.sophieFollower()) {
                    this.outputText("A harpy wings out of the sky and attacks!", true);
                    this.startCombat(new Harpy_1.Harpy());
                    this.spriteSelect(26);
                }
                else {
                    if (this.flags[kFLAGS_1.kFLAGS.MET_SOPHIE_COUNTER] == 0)
                        kGAMECLASS_1.kGAMECLASS.sophieScene.meetSophie();
                    else
                        kGAMECLASS_1.kGAMECLASS.sophieScene.meetSophieRepeat();
                }
            }
            if (chooser == 3) {
                this.izumiScenes.encounter();
                return;
            }
        }
        //\"<i>Chicken Harpy</i>\" by Jay Gatsby and not Savin he didn't do ANYTHING
        //Initial Intro
        chickenHarpy() {
            this.clearOutput();
            this.spriteSelect(90);
            if (this.flags[kFLAGS_1.kFLAGS.TIMES_MET_CHICKEN_HARPY] == 0) {
                this.outputText("Taking a stroll along the mountains, you come across a peculiar-looking harpy wandering around with a large wooden cart in tow.  She's far shorter and bustier than any regular harpy you've seen before, reaching barely 4' in height but managing to retain some semblance of their thick feminine asses.  In addition to the fluffy white feathers decorating her body, the bird-woman sports about three more combed back upon her forehead like a quiff, vividly red in color.");
                this.outputText("\n\nHaving a long, hard think at the person you're currently making uncomfortable with your observational glare, you've come to a conclusion - she must be a chicken harpy!");
                this.outputText("\n\nAs you take a look inside of the cart you immediately spot a large hoard of eggs stacked clumsily in a pile.  The curious collection of eggs come in many colors and sizes, protected by a sheet of strong canvas to keep it all together.");
                this.outputText("\n\nThe chicken harpy - rather unnerved by the unflattering narration of her appearance you've accidentally shouted out loud - decides to break the ice by telling you about the cart currently holding your interest.");
                this.outputText("\n\n\"<i>Heya traveller, I noticed you were interested in my eggs here - they're not for sale, but perhaps we can come to some sort of agreement?</i>\"");
                this.outputText("\n\nYou put a hand to your chin and nod.  You are travelling, that's correct. The chicken harpy takes the gesture as a sign to continue.");
                this.outputText("\n\n\"<i>Well you see, these eggs don't really grow from trees - in fact, I've gotta chug down at least two or three ovi elixirs to get a good haul with my body, y'know?  Since it's tough for a lil' gal like me to find a few, I like to trade an egg over for some elixirs to those willing to part with them.</i>\"");
                this.outputText("\n\nSounds reasonable enough, you suppose.  Two or three elixirs for an egg? Doable for sure.");
                this.outputText("\n\n\"<i>So whaddya say, do y'have any elixirs you can fork over?</i>\"");
            }
            else {
                //Repeat Intro
                this.outputText("Taking a stroll along the mountains, you come across a familiar-looking shorty wandering around with a large wooden cart in tow.");
                this.outputText("\n\nHaving a long, hard think at the person you're currently making uncomfortable with your observational glare, you've come to a conclusion - she must be the chicken harpy!");
                this.outputText("\n\nYou run towards her as she waves a 'hello', stopping the cart to allow you to catch up.  Giving out her usual spiel about the eggs, she giggles and thrusts out a hand.");
                this.outputText("\n\n\"<i>Hey sunshine, do y'have any elixirs you can give me today?</i>\"");
                //[Give Two][Give Three]	[No, I Must Now Return To My People]
            }
            this.flags[kFLAGS_1.kFLAGS.TIMES_MET_CHICKEN_HARPY]++;
            //[Give Two][Give Three]		[Not Really, No]
            this.menu();
            if (this.player.hasItem(this.consumables.OVIELIX, 2))
                this.addButton(0, "Give Two", this.giveTwoOviElix);
            if (this.player.hasItem(this.consumables.OVIELIX, 3))
                this.addButton(1, "Give Three", this.giveThreeOviElix);
            this.addButton(4, "Leave", this.leaveChickenx);
        }
        //If Give Two
        giveTwoOviElix() {
            this.clearOutput();
            this.spriteSelect(90);
            this.player.consumeItem(this.consumables.OVIELIX);
            this.player.consumeItem(this.consumables.OVIELIX);
            this.outputText("You hand over two elixirs, the harpy more than happy to take them from you.  In return, she unties a corner of the sheet atop the cart, allowing you to take a look at her collection of eggs.");
            //[Black][Blue][Brown][Pink][Purple]
            this.menu();
            this.addButton(0, "Black", this.getHarpyEgg, this.consumables.BLACKEG);
            this.addButton(1, "Blue", this.getHarpyEgg, this.consumables.BLUEEGG);
            this.addButton(2, "Brown", this.getHarpyEgg, this.consumables.BROWNEG);
            this.addButton(3, "Pink", this.getHarpyEgg, this.consumables.PINKEGG);
            this.addButton(4, "Purple", this.getHarpyEgg, this.consumables.PURPLEG);
            this.addButton(5, "White", this.getHarpyEgg, this.consumables.WHITEEG);
        }
        //If Give Three
        giveThreeOviElix() {
            this.clearOutput();
            this.spriteSelect(90);
            this.player.consumeItem(this.consumables.OVIELIX, 3);
            this.outputText("You hand over three elixirs, the harpy ecstatic over the fact that you're willing to part with them.  In return, she unties a side of the sheet atop the cart, allowing you to take a look at a large collection of her eggs.");
            //[Black][Blue][Brown][Pink][Purple]
            this.menu();
            this.addButton(0, "Black", this.getHarpyEgg, this.consumables.L_BLKEG);
            this.addButton(1, "Blue", this.getHarpyEgg, this.consumables.L_BLUEG);
            this.addButton(2, "Brown", this.getHarpyEgg, this.consumables.L_BRNEG);
            this.addButton(3, "Pink", this.getHarpyEgg, this.consumables.L_PNKEG);
            this.addButton(4, "Purple", this.getHarpyEgg, this.consumables.L_PRPEG);
            this.addButton(5, "White", this.getHarpyEgg, this.consumables.L_WHTEG);
        }
        //All Text
        getHarpyEgg(itype) {
            this.clearOutput();
            this.spriteSelect(90);
            this.flags[kFLAGS_1.kFLAGS.EGGS_BOUGHT]++;
            this.outputText("You take " + itype.longName + ", and the harpy nods in regards to your decision.  Prepping her cart back up for the road, she gives you a final wave goodbye before heading back down through the mountains.\n\n");
            this.inventory.takeItem(itype, this.chickenHarpy);
        }
        //If No
        leaveChickenx() {
            this.clearOutput();
            this.spriteSelect(90);
            this.outputText("At the polite decline of her offer, the chicken harpy gives a warm smile before picking her cart back up and continuing along the path through the mountains.");
            this.outputText("\n\nYou decide to take your own path, heading back to camp while you can.");
            this.doNext(this.camp.returnToCampUseOneHour);
        }
    }
    exports.HighMountains = HighMountains;
});
//# sourceMappingURL=HighMountains.js.map