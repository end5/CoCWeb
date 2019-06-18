define(["require", "exports", "../../BaseContent", "./Forest/AkbalScene", "./Forest/BeeGirlScene", "./Forest/CorruptedGlade", "./Forest/Essrayle", "./Forest/Faerie", "./Forest/KitsuneScene", "./Forest/TamanisDaughtersScene", "./Forest/TamaniScene", "./Forest/TentacleBeastScene", "./Forest/ErlKingScene", "../../StatusAffects", "../../PerkLib", "../../GlobalFlags/kFLAGS", "../../../console", "../Monsters/Imp", "../Monsters/Goblin", "../NPCs/Jojo", "../../Appearance", "../../../../includes/appearanceDefs", "../../GlobalFlags/kGAMECLASS"], function (require, exports, BaseContent_1, AkbalScene_1, BeeGirlScene_1, CorruptedGlade_1, Essrayle_1, Faerie_1, KitsuneScene_1, TamanisDaughtersScene_1, TamaniScene_1, TentacleBeastScene_1, ErlKingScene_1, StatusAffects_1, PerkLib_1, kFLAGS_1, console_1, Imp_1, Goblin_1, Jojo_1, Appearance_1, appearanceDefs_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 06.01.14.
     */
    class Forest extends BaseContent_1.BaseContent {
        constructor() {
            super(...arguments);
            this.akbalScene = new AkbalScene_1.AkbalScene();
            this.beeGirlScene = new BeeGirlScene_1.BeeGirlScene();
            this.corruptedGlade = new CorruptedGlade_1.CorruptedGlade();
            this.essrayle = new Essrayle_1.Essrayle();
            this.faerie = new Faerie_1.Faerie();
            this.kitsuneScene = new KitsuneScene_1.KitsuneScene();
            this.tamaniDaughtersScene = new TamanisDaughtersScene_1.TamainsDaughtersScene();
            this.tamaniScene = new TamaniScene_1.TamaniScene();
            this.tentacleBeastScene = new TentacleBeastScene_1.TentacleBeastScene();
            this.erlkingScene = new ErlKingScene_1.ErlKingScene();
        }
        exploreDeepwoods() {
            this.player.addStatusValue(StatusAffects_1.StatusAffects.ExploredDeepwoods, 1, 1);
            var chooser = Forest.rand(5);
            // var temp2: number = 0;
            //Every tenth exploration finds a pumpkin if eligible!
            if (this.player.statusAffectv1(StatusAffects_1.StatusAffects.ExploredDeepwoods) % 10 == 0 && this.isHalloween()) {
                //If Fera isn't free yet...
                if (this.player.findPerk(PerkLib_1.PerkLib.FerasBoonBreedingBitch) < 0 && this.player.findPerk(PerkLib_1.PerkLib.FerasBoonAlpha) < 0) {
                    if (this.date.fullYear > this.flags[kFLAGS_1.kFLAGS.PUMPKIN_FUCK_YEAR_DONE]) {
                        kGAMECLASS_1.kGAMECLASS.pumpkinFuckEncounter();
                        return;
                    }
                }
                //Fera is free!
                else {
                    if (this.flags[kFLAGS_1.kFLAGS.FERAS_TRAP_SPRUNG_YEAR] == 0) {
                        if (this.date.fullYear > this.flags[kFLAGS_1.kFLAGS.FERAS_GLADE_EXPLORED_YEAR]) {
                            kGAMECLASS_1.kGAMECLASS.feraSceneTwoIntroduction();
                            return;
                        }
                    }
                }
            }
            //Hel jumps you for sex.
            if (this.flags[kFLAGS_1.kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && this.flags[kFLAGS_1.kFLAGS.HEL_RAPED_TODAY] == 0 && Forest.rand(10) == 0 && this.player.gender > 0 && !kGAMECLASS_1.kGAMECLASS.helScene.followerHel()) {
                kGAMECLASS_1.kGAMECLASS.helScene.helSexualAmbush();
                return;
            }
            //Every 5th exploration encounters d2 if hasnt been met yet and factory done
            if (this.flags[kFLAGS_1.kFLAGS.DISCOVERED_DUNGEON_2_ZETAZ] == 0 && this.player.statusAffectv1(StatusAffects_1.StatusAffects.ExploredDeepwoods) % 5 == 0 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.DungeonShutDown) >= 0) {
                this.outputText("While you explore the deepwoods, you do your best to forge into new, unexplored locations.  While you're pushing away vegetation and slapping at plant-life, you spot a half-overgrown orifice buried in the side of a ravine.  There's a large number of imp-tracks around the cavern's darkened entryway.  Perhaps this is where the imp, Zetaz, makes his lair?  In any event, it's past time you checked back on the portal.  You make a mental note of the cave's location so that you can return when you're ready.", true);
                this.outputText("\n\n<b>You've discovered the location of Zetaz's lair!</b>", false);
                this.simpleChoices("Enter", kGAMECLASS_1.kGAMECLASS.enterZetazsLair, "", undefined, "", undefined, "", undefined, "Leave", this.camp.returnToCampUseOneHour);
                this.flags[kFLAGS_1.kFLAGS.DISCOVERED_DUNGEON_2_ZETAZ]++;
                return;
            }
            //Tamani 20% encounter rate
            if (this.flags[kFLAGS_1.kFLAGS.TAMANI_TIME_OUT] == 0 && Forest.rand(5) == 0 && this.player.gender > 0 && (this.player.totalCocks() > 0 || this.player.hasKeyItem("Deluxe Dildo") < 0)) {
                if (this.player.totalCocks() > 0 && this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTER_PREGGO_COUNTDOWN] == 0 && this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] >= 24) {
                    this.tamaniDaughtersScene.encounterTamanisDaughters();
                }
                else
                    this.tamaniScene.encounterTamani();
                return;
            }
            if (this.flags[kFLAGS_1.kFLAGS.ERLKING_DISABLED] == 0 && this.flags[kFLAGS_1.kFLAGS.ERLKING_ENCOUNTER_COUNTER] == 4) {
                this.flags[kFLAGS_1.kFLAGS.ERLKING_ENCOUNTER_COUNTER] = 0;
                this.erlkingScene.encounterWildHunt();
                return;
            }
            else {
                this.flags[kFLAGS_1.kFLAGS.ERLKING_ENCOUNTER_COUNTER]++;
            }
            //Faerie
            if (chooser == 0) {
                this.faerie.encounterFaerie();
                return;
            }
            //Tentacle monster
            if (chooser == 1) {
                //Reset hilarious shit
                if (this.player.gender > 0)
                    this.flags[kFLAGS_1.kFLAGS.UNKNOWN_FLAG_NUMBER_00247] = 0;
                //Tentacle avoidance chance due to dangerous plants
                if (this.player.hasKeyItem("Dangerous Plants") >= 0 && this.player.inte / 2 > Forest.rand(50)) {
                    console_1.trace("TENTACLE'S AVOIDED DUE TO BOOK!");
                    this.outputText("Using the knowledge contained in your 'Dangerous Plants' book, you determine a tentacle beast's lair is nearby, do you continue?  If not you could return to camp.\n\n", true);
                    this.simpleChoices("Continue", this.tentacleBeastScene.encounter, "", undefined, "", undefined, "", undefined, "Leave", this.camp.returnToCampUseOneHour);
                    return;
                }
                else {
                    this.tentacleBeastScene.encounter();
                    return;
                }
            }
            //Corrupted Glade
            if (chooser == 2) {
                if (Forest.rand(4) == 0) {
                    this.trappedSatyr();
                    return;
                }
                this.corruptedGlade.intro();
            }
            if (chooser == 3) {
                this.akbalScene.supahAkabalEdition();
            }
            else if (chooser == 4) {
                if (Forest.rand(3) == 0)
                    this.kitsuneScene.kitsuneShrine();
                else
                    this.kitsuneScene.enterTheTrickster();
            }
        }
        //Explore forest
        exploreForest() {
            this.player.exploredForest++;
            console_1.trace("FOREST EVENT CALLED");
            var chooser = Forest.rand(4);
            // var temp2: number = 0;
            //Cut bee encounter rate 50%
            if (chooser == 3 && Forest.rand(2))
                chooser = Forest.rand(3);
            //Quick changes:
            //If monk is fully corrupted, encounter him less (unless haz ferriiite).
            if (chooser == 1 && kGAMECLASS_1.kGAMECLASS.monk >= 2) {
                this.temp = Forest.rand(4);
                if (this.temp == 0)
                    chooser = 0;
                if (this.temp == 1)
                    chooser = 2;
                if (this.temp == 2)
                    chooser = 3;
            }
            //Helia monogamy fucks
            if (this.flags[kFLAGS_1.kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && this.flags[kFLAGS_1.kFLAGS.HEL_RAPED_TODAY] == 0 && Forest.rand(10) == 0 && this.player.gender > 0 && !kGAMECLASS_1.kGAMECLASS.helScene.followerHel()) {
                kGAMECLASS_1.kGAMECLASS.helScene.helSexualAmbush();
                return;
            }
            //Raise Jojo chances for furrite
            if (this.player.findPerk(PerkLib_1.PerkLib.PiercedFurrite) >= 0 && Forest.rand(5) == 0 && (this.player.cor > 25 || kGAMECLASS_1.kGAMECLASS.monk > 0)) {
                chooser = 1;
            }
            //If Jojo lives in camp, never encounter him
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.PureCampJojo) >= 0 || this.flags[kFLAGS_1.kFLAGS.JOJO_DEAD_OR_GONE] == 1) {
                chooser = Forest.rand(3);
                if (chooser >= 1)
                    chooser++;
            }
            //Chance to discover deepwoods
            if ((this.player.exploredForest >= 20) && this.player.findStatusAffect(StatusAffects_1.StatusAffects.ExploredDeepwoods) < 0) {
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.ExploredDeepwoods, 0, 0, 0, 0);
                this.outputText("After exploring the forest so many times, you decide to really push it, and plunge deeper and deeper into the woods.  The further you go the darker it gets, but you courageously press on.  The plant-life changes too, and you spot more and more lichens and fungi, many of which are luminescent.  Finally, a wall of tree-trunks as wide as houses blocks your progress.  There is a knot-hole like opening in the center, and a small sign marking it as the entrance to the 'Deepwoods'.  You don't press on for now, but you could easily find your way back to explore the Deepwoods.\n\n<b>Deepwoods exploration unlocked!</b>", true);
                this.doNext(this.camp.returnToCampUseOneHour);
                return;
            }
            //Essy every 20 explores or so
            if ((Forest.rand(100) <= 1) && this.player.gender > 0 && (this.flags[kFLAGS_1.kFLAGS.ESSY_MET_IN_DUNGEON] == 0 || this.flags[kFLAGS_1.kFLAGS.TOLD_MOTHER_TO_RELEASE_ESSY] == 1)) {
                this.essrayle.essrayleMeetingI();
                return;
            }
            //Chance of dick-dragging! 10% + 10% per two foot up to 30%
            this.temp = 10 + (this.player.longestCockLength() - this.player.tallness) / 24 * 10;
            if (this.temp > 30)
                this.temp = 30;
            if (this.temp > Forest.rand(100) && this.player.longestCockLength() >= this.player.tallness && this.player.totalCockThickness() >= 12) {
                this.bigJunkForestScene();
                return;
            }
            //Marble randomness
            if (this.player.exploredForest % 50 == 0 && this.player.exploredForest > 0 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.MarbleRapeAttempted) < 0 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.NoMoreMarble) < 0 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.Marble) >= 0 && this.flags[kFLAGS_1.kFLAGS.MARBLE_WARNING] == 0) {
                //can be triggered one time after Marble has been met, but before the addiction quest starts.
                this.clearOutput();
                this.outputText("While you're moving through the trees, you suddenly hear yelling ahead, followed by a crash and a scream as an imp comes flying at high speed through the foliage and impacts a nearby tree.  The small demon slowly slides down the tree before landing at the base, still.  A moment later, a familiar-looking cow-girl steps through the bushes brandishing a huge two-handed hammer with an angry look on her face.");
                this.outputText("\n\nShe goes up to the imp, and kicks it once.  Satisfied that the creature isn't moving, she turns around to face you and gives you a smile.  \"<i>Sorry about that, but I prefer to take care of these buggers quickly.  If they get the chance to call on their friends, they can actually become a nuisance.</i>\"  She disappears back into the foliage briefly before reappearing holding two large pile of logs under her arms, with a fire axe and her hammer strapped to her back.  \"<i>I'm gathering firewood for the farm, as you can see; what brings you to the forest, sweetie?</i>\"  You inform her that you're just exploring.");
                this.outputText("\n\nShe gives a wistful sigh. \"<i>I haven't really explored much since getting to the farm.  Between the jobs Whitney gives me, keeping in practice with my hammer, milking to make sure I don't get too full, cooking, and beauty sleep, I don't get a lot of free time to do much else.</i>\"  She sighs again.  \"<i>Well, I need to get this back, so I'll see you later!</i>\"");
                //end event
                this.doNext(this.camp.returnToCampUseOneHour);
                return;
            }
            if (chooser == 0) {
                //Determines likelyhood of imp/goblins
                //Below - goblin, Equal and up - imp
                var impGob = 5;
                console_1.trace("IMP/Gobb");
                //Dicks + lots of cum boosts goblin probability
                //Vags + Fertility boosts imp probability
                if (this.player.totalCocks() > 0)
                    impGob--;
                if (this.player.hasVagina())
                    impGob++;
                if (this.player.totalFertility() >= 30)
                    impGob++;
                if (this.player.cumQ() >= 200)
                    impGob--;
                if (this.player.findPerk(PerkLib_1.PerkLib.PiercedLethite) >= 0) {
                    if (impGob <= 3)
                        impGob += 2;
                    else if (impGob < 7)
                        impGob = 7;
                }
                //Imptacular Encounter
                if (Forest.rand(10) < impGob) {
                    if (this.player.level >= 8 && Forest.rand(2) == 0) {
                        kGAMECLASS_1.kGAMECLASS.impScene.impLordEncounter();
                    }
                    else {
                        this.outputText("An imp leaps out of the bushes and attacks!", true);
                        this.startCombat(new Imp_1.Imp());
                    }
                    this.spriteSelect(29);
                    return;
                }
                //Encounter Gobbalin!
                else {
                    //Tamani 25% of all goblin encounters encounter rate
                    if (Forest.rand(4) <= 0 && this.flags[kFLAGS_1.kFLAGS.TAMANI_TIME_OUT] == 0 && this.player.gender > 0 && (this.player.totalCocks() > 0 || this.player.hasKeyItem("Deluxe Dildo") < 0)) {
                        if (this.player.totalCocks() > 0 && this.flags[kFLAGS_1.kFLAGS.TAMANI_DAUGHTER_PREGGO_COUNTDOWN] == 0 && this.flags[kFLAGS_1.kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] >= 24) {
                            this.tamaniDaughtersScene.encounterTamanisDaughters();
                        }
                        else
                            this.tamaniScene.encounterTamani();
                        return;
                    }
                    //50% of the time, goblin assassin!
                    if (this.player.level >= 10 && Forest.rand(2) == 0) {
                        kGAMECLASS_1.kGAMECLASS.goblinAssassinScene.goblinAssassinEncounter();
                        return;
                    }
                    if (this.player.gender > 0) {
                        this.outputText("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fucked, " + this.player.mf("stud", "slut"), true);
                        this.outputText(".</i>\"", false);
                        this.startCombat(new Goblin_1.Goblin());
                        this.spriteSelect(24);
                        return;
                    }
                    else {
                        this.outputText("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fuc-oh shit, you don't even have anything to play with!  This is for wasting my time!", true);
                        this.outputText("</i>\"", false);
                        this.startCombat(new Goblin_1.Goblin());
                        this.spriteSelect(24);
                        return;
                    }
                }
            }
            if (chooser == 1) {
                this.doNext(this.camp.returnToCampUseOneHour);
                this.outputText("", true);
                if (kGAMECLASS_1.kGAMECLASS.monk == 0) {
                    if (this.player.cor < 25) {
                        if (this.player.level >= 4) {
                            kGAMECLASS_1.kGAMECLASS.monk = 1;
                            kGAMECLASS_1.kGAMECLASS.jojoScene.lowCorruptionJojoEncounter();
                            return;
                        }
                        else {
                            this.outputText("You enjoy a peaceful walk in the woods.  It gives you time to think over the recent, disturbing events.", true);
                            this.dynStats("tou", .5, "int", 1);
                            this.doNext(this.camp.returnToCampUseOneHour);
                            return;
                        }
                    }
                    kGAMECLASS_1.kGAMECLASS.monk = 1;
                    kGAMECLASS_1.kGAMECLASS.jojoScene.jojoSprite();
                    this.outputText("While marvelling at the strange trees and vegetation of the forest, the bushes ruffle ominously.  A bush seems to explode into a flurry of swirling leaves and movement.  Before you can react you feel your " + this.player.feet() + " being swept out from under you, and land hard on your back.\n\n", false);
                    this.outputText("The angry visage of a lithe white mouse gazes down on your prone form with a look of confusion.", false);
                    this.outputText("\n\n\"<i>I'm sorry, I sensed a great deal of corruption, and thought a demon or monster had come to my woods,</i>\" says the mouse, \"<i>Oh, where are my manners!</i>\"\n\nHe helps you to your feet and introduces himself as Jojo.  Now that you have a good look at him, it is obvious this mouse is some kind of monk, dressed in robes, holy symbols, and draped with prayer beads.\n\nHe smiles knowingly, \"<i>Yes I am a monk, and yes this is a strange place for one such as I... this world was not always this way.  Long ago this world was home to many villages, including my own.  But then the demons came.  I'm not sure if they were summoned, created, or simply a perversion of magic or breeding, but they came swarming out of the mountains to destroy everything in their path.</i>\"", false);
                    this.outputText("\n\nJojo sighs sadly, \"<i>Enough of my woes.  You are very corrupted.  If you cannot be sufficiently purified you WILL become one of them in time.  Will you let me help you?", false);
                    if (this.player.gender > 0) {
                        console_1.trace("Gender != 0");
                        this.simpleChoices("Accept", this.getGame().jojoScene.meditateInForest, "Rape Him", this.getGame().jojoScene.jojoRape, "BWUH?", undefined, "Decline", this.camp.returnToCampUseOneHour, "", undefined);
                    }
                    else {
                        console_1.trace("Gender == 0");
                        this.simpleChoices("Accept", this.getGame().jojoScene.meditateInForest, "Rape Him", undefined, "BWUH?", undefined, "Decline", this.camp.returnToCampUseOneHour, "", undefined);
                    }
                    return;
                }
                if (kGAMECLASS_1.kGAMECLASS.monk == 1) {
                    if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Infested) >= 0) {
                        kGAMECLASS_1.kGAMECLASS.jojoScene.jojoSprite();
                        this.outputText("As you approach the serene monk, you see his nose twitch, disturbing his meditation.\n\n", true);
                        this.outputText("\"<i>It seems that the agents of corruption have taken residence within the temple that is your body.</i>\", Jojo says flatly. \"<i>This is a most unfortunate development. There is no reason to despair as there are always ways to fight the corruption. However, great effort will be needed to combat this form of corruption and may leave lasting impressions upon you. If you are ready, we can purge your being of the rogue creatures of lust.</i>\"\n\n", false);
                        if (this.player.gender > 0)
                            this.simpleChoices("Purge", this.getGame().jojoScene.wormRemoval, "Meditate", this.getGame().jojoScene.meditateInForest, "Rape", this.getGame().jojoScene.jojoRape, "", undefined, "Leave", this.camp.returnToCampUseOneHour);
                        else
                            this.simpleChoices("Purge", this.getGame().jojoScene.wormRemoval, "Meditate", this.getGame().jojoScene.meditateInForest, "Rape", undefined, "", undefined, "Leave", this.camp.returnToCampUseOneHour);
                        return;
                    }
                    kGAMECLASS_1.kGAMECLASS.jojoScene.jojoSprite();
                    this.outputText("Jojo the monk appears before you, robes and soft white fur fluttering in the breeze.  He asks, \"<i>Are you ready for a meditation session?</i>\"", false);
                    if (this.player.gender > 0)
                        this.simpleChoices("Yes", this.getGame().jojoScene.meditateInForest, "No", this.camp.returnToCampUseOneHour, "BWUH", undefined, "Rape Him", this.getGame().jojoScene.jojoRape, "", undefined);
                    else
                        this.simpleChoices("Yes", this.getGame().jojoScene.meditateInForest, "No", this.camp.returnToCampUseOneHour, "BWUH", undefined, "Rape Him", undefined, "", undefined);
                }
                if (kGAMECLASS_1.kGAMECLASS.monk >= 2) {
                    kGAMECLASS_1.kGAMECLASS.jojoScene.jojoSprite();
                    this.outputText("You are enjoying a peaceful walk through the woods when Jojo drops out of the trees ahead, ", true);
                    if (kGAMECLASS_1.kGAMECLASS.monk == 2)
                        this.outputText("his mousey visage twisted into a ferocious snarl.  \"YOU!\" he screams, launching himself towards you, claws extended.", false);
                    if (kGAMECLASS_1.kGAMECLASS.monk == 3)
                        this.outputText("unsteady on his feet, but looking for a fight!", false);
                    if (kGAMECLASS_1.kGAMECLASS.monk == 4)
                        this.outputText("visibly tenting his robes, but intent on fighting you.", false);
                    if (kGAMECLASS_1.kGAMECLASS.monk == 5)
                        this.outputText("panting and nude, his fur rustling in the breeze, a twitching behemoth of a cock pulsing between his legs.", false);
                    this.startCombat(new Jojo_1.Jojo());
                }
            }
            //Tentacles 25% of the time...
            if (chooser == 2) {
                console_1.trace("TRACE TENTACRUELS");
                this.outputText("", true);
                this.temp = Forest.rand(5);
                //Oh noes, tentacles!
                if (this.temp == 0) {
                    //Tentacle avoidance chance due to dangerous plants
                    if (this.player.hasKeyItem("Dangerous Plants") >= 0 && this.player.inte / 2 > Forest.rand(50)) {
                        console_1.trace("TENTACLE'S AVOIDED DUE TO BOOK!");
                        this.outputText("Using the knowledge contained in your 'Dangerous Plants' book, you determine a tentacle beast's lair is nearby, do you continue?  If not you could return to camp.\n\n", false);
                        this.simpleChoices("Continue", this.tentacleBeastScene.encounter, "", undefined, "", undefined, "", undefined, "Leave", this.camp.returnToCampUseOneHour);
                        return;
                    }
                    else {
                        this.tentacleBeastScene.encounter();
                        return;
                    }
                }
                if (this.temp == 1) {
                    if (this.player.cor < 80) {
                        this.outputText("You enjoy a peaceful walk in the woods, it gives you time to think.", false);
                        this.dynStats("tou", .5, "int", 1);
                    }
                    else {
                        this.outputText("As you wander in the forest, you keep ", false);
                        if (this.player.gender == 1)
                            this.outputText("stroking your half-erect " + this.multiCockDescriptLight() + " as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes.", false);
                        if (this.player.gender == 2)
                            this.outputText("idly toying with your " + this.vaginaDescript(0) + " as you daydream about getting fucked by all kinds of monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.", false);
                        if (this.player.gender == 3)
                            this.outputText("stroking alternatively your " + this.multiCockDescriptLight() + " and your " + this.vaginaDescript(0) + " as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes, before, or while, getting fucked by various monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.", false);
                        if (this.player.gender == 0)
                            this.outputText("daydreaming about sex-demons with huge sexual attributes, and how you could please them.", false);
                        this.outputText("", false);
                        this.dynStats("tou", .5, "lib", .25, "lus", this.player.lib / 5);
                    }
                    this.doNext(this.camp.returnToCampUseOneHour);
                    return;
                }
                //CORRUPTED GLADE
                if (this.temp == 2 || this.temp >= 4) {
                    if (Forest.rand(4) == 0) {
                        this.trappedSatyr();
                        return;
                    }
                    this.corruptedGlade.intro();
                }
                //Trip on a root!
                if (this.temp == 3) {
                    this.outputText("You trip on an exposed root, scraping yourself somewhat, but otherwise the hour is uneventful.", false);
                    this.player.takeDamage(10);
                    this.doNext(this.camp.returnToCampUseOneHour);
                    console_1.trace("FIX MEEEEE");
                    return;
                }
            }
            //Bee-girl encounter
            if (chooser == 3) {
                if (Forest.rand(10) == 0) {
                    this.outputText("You find a large piece of insectile carapace obscured in the ferns to your left.  It's mostly black with a thin border of bright yellow along the outer edge.  There's still a fair portion of yellow fuzz clinging to the chitinous shard.  It feels strong and flexible - maybe someone can make something of it.  ", true);
                    this.inventory.takeItem(this.useables.B_CHITN, this.camp.returnToCampUseOneHour);
                    return;
                }
                this.beeGirlScene.beeEncounter();
            }
        }
        //[FOREST]
        //[RANDOM SCENE IF CHARACTER HAS AT LEAST ONE COCK LARGER THAN THEIR HEIGHT, AND THE TOTAL COMBINED WIDTH OF ALL THEIR COCKS IS TWELVE INCHES OR GREATER]
        bigJunkForestScene(lake = false) {
            this.outputText("", true);
            var x = this.player.longestCock();
            //PARAGRAPH 1
            this.outputText("Walking along the ", false);
            if (lake)
                this.outputText("grassy and muddy shores of the lake", false);
            else
                this.outputText("various paths of the forest", false);
            this.outputText(", you find yourself increasingly impeded by the bulk of your " + this.cockDescript(x) + " dragging along the ", false);
            if (lake)
                this.outputText("wet ground behind you.", false);
            else
                this.outputText("earth behind you.", false);
            if (this.player.cocks.length == 1) {
                if (lake)
                    this.outputText("  As it drags through the lakeside mud, the sensation forces you to imagine the velvety folds of a monstrous pussy sliding along the head of your " + Appearance_1.Appearance.cockNoun(this.player.cocks[x].cockType) + ", gently attempting to suck it off.", false);
                else
                    this.outputText("  As it drags across the grass, twigs, and exposed tree roots, the sensation forces you to imagine the fingers of a giant hand sliding along the head of your " + Appearance_1.Appearance.cockNoun(this.player.cocks[x].cockType) + ", gently jerking it off.", false);
            }
            else if (this.player.cocks.length >= 2) {
                if (lake)
                    this.outputText("  With all of your " + this.multiCockDescriptLight() + " dragging through the mud, they begin feeling as if the lips of " + Forest.num2Text(this.player.cockTotal()) + " different cunts were slobbering over each one.", false);
                else
                    this.outputText("  With all of your " + this.multiCockDescriptLight() + " dragging across the grass, twigs, and exposed tree roots, they begin feeling as if the rough fingers of " + Forest.num2Text(this.player.cockTotal()) + " different monstrous hands were sliding over each shaft, gently jerking them off.", false);
            }
            this.outputText("\n\n", false);
            //PARAGRAPH 2
            //FOR NON-CENTAURS]
            if (!this.player.isTaur()) {
                this.outputText("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + this.multiCockDescriptLight() + ", which forces your torso to the ground.  Normally your erection would merely raise itself skyward, but your genitals have grown too large and heavy for your " + this.hipDescript() + " to hold them aloft.  Instead, you feel your body forcibly pivoting at the hips until your torso is compelled to rest face down atop your " + this.multiCockDescriptLight() + ".", false);
                //IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
                if (this.player.biggestTitSize() >= 35) {
                    if (lake)
                        this.outputText("  Your " + this.chestDesc() + " hang lewdly off your torso to rest in the lakeside mud, covering much of the ground to either side of you.  Their immense weight anchors your body, further preventing your torso from lifting itself up.  Mud cakes against their undersides and coats your " + this.nippleDescript(0) + "s.", false);
                    else
                        this.outputText("  Your " + this.chestDesc() + " hang lewdly off your torso to rest on the twings and dirt, covering up much of the ground to either side of you.  Their immense weight anchors your body, further preventing your torso from lifting itself up.  The rough texture of the bark on various tree roots teases your " + this.nippleDescript(0) + "s mercilessly.", false);
                }
                //IF CHARACTER HAS A BALLS ADD SENTENCE
                if (this.player.balls > 0) {
                    this.outputText("  Your " + this.player.skinTone + " " + this.sackDescript() + " rests beneath your raised " + this.buttDescript() + ".  Your " + this.ballsDescriptLight() + " pulse with the need to release their sperm through your " + this.multiCockDescriptLight() + " and ", false);
                    if (lake)
                        this.outputText("into the waters of the nearby lake.", false);
                    else
                        this.outputText("onto the fertile soil of the forest.", false);
                }
                //IF CHARACTER HAS A VAGINA ADD SENTENCE
                if (this.player.vaginas.length >= 1) {
                    this.outputText("  Your " + this.vaginaDescript() + " and " + this.clitDescript() + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + this.buttDescript() + " above.", false);
                    //IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
                    if (this.player.vaginas[0].vaginalWetness >= appearanceDefs_1.VAGINA_WETNESS_DROOLING) {
                        this.outputText("  Juices stream from your womanhood and begin pooling on the dirt and twigs beneath you.  ", false);
                        if (lake)
                            this.outputText("The drooling fem-spunk only makes the ground more muddy.", false);
                        else
                            this.outputText("The sticky fem-spunk immediately soaks down into the rich soil.", false);
                    }
                }
            }
            //FOR CENTAURS
            else if (this.player.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_CENTAUR) {
                this.outputText("  The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + this.multiCockDescriptLight() + ", which forces the barrel of your horse-like torso to the ground.  Normally your erection would merely hover above the ground in between your centaurian legs, but your genitals have grown too large and heavy for your " + this.hipDescript() + " to hold them aloft.  Instead, you feel your body being forcibly pulled down at your hind legs until your equine body is resting on top of your " + this.multiCockDescriptLight() + ".", false);
                //IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
                if (this.player.biggestTitSize() >= 35) {
                    if (lake)
                        this.outputText("  Your " + this.chestDesc() + " pull your human torso forward until it also is forced to face the ground, obscured as it is in boob-flesh.  Your tits rest on the wet earth to either side of you.  Their immense weight anchors you, further preventing any part of your equine body from lifting itself up.  Mud cakes their undersides and coats your " + this.nippleDescript(0) + "s.", false);
                    else
                        this.outputText("  Your " + this.chestDesc() + " pull your human torso forward until it also is forced to face the ground, obscured as it is in boob-flesh.  Your tits rest on the dirt and twigs to either side of you.  Their immense weight anchors you, further preventing any part of your equine body from lifting itself up.  The rough texture of the bark on various tree roots teases your " + this.nippleDescript(0) + "s mercilessly.", false);
                }
                //IF CHARACTER HAS A BALLS ADD SENTENCE
                if (this.player.balls > 0) {
                    this.outputText("  Your " + this.player.skinTone + this.sackDescript() + " rests beneath your raised " + this.buttDescript() + ".  Your " + this.ballsDescriptLight() + " pulse with the need to release their sperm through your " + this.multiCockDescriptLight() + " and ", false);
                    if (lake)
                        this.outputText("into the waters of the nearby lake.", false);
                    else
                        this.outputText("onto the fertile soil of the forest floor.", false);
                }
                //IF CHARACTER HAS A VAGINA ADD SENTENCE
                if (this.player.vaginas.length >= 1) {
                    this.outputText("  Your " + this.vaginaDescript() + " and " + this.clitDescript() + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + this.buttDescript() + " above.", false);
                    //IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
                    if (this.player.vaginas[0].vaginalWetness >= appearanceDefs_1.VAGINA_WETNESS_DROOLING) {
                        if (lake)
                            this.outputText("  A leaf falls from a tree and lands on the wet lips of your cunt, its light touch teasing your sensitive skin.  Like a mare or cow in heat, your juices stream from your womanhood and pool in the mud beneath you.  The sloppy fem-spunk only makes the ground more muddy.", false);
                        else
                            this.outputText("  A leaf falls from a tree and lands on the wet lips of your cunt, its light touch teasing your sensitive skin.  Like a mare or cow in heat, your juices stream from your womanhood and pool in the dirt and twigs beneath you.", false);
                    }
                }
            }
            this.outputText("\n\n", false);
            //PARAGRAPH 3
            this.outputText("You realize you are effectively trapped here by your own body.", false);
            //CORRUPTION BASED CHARACTER'S VIEW OF SITUATION
            if (this.player.cor < 33)
                this.outputText("  Panic slips into your heart as you realize that if any dangerous predator were to find you in this state, you'd be completely defenseless.  You must find a way to regain your mobility immediately!", false);
            else if (this.player.cor < 66)
                this.outputText("  You realize that if any dangerous predator were to find you in this state, you'd be completely defenseless!  You must find a way to regain your mobility... yet there is a certain appeal to imagining how pleasurable it would be for a sexual predator to take advantage of your obscene body.", false);
            else
                this.outputText("  Your endowments have rendered you completely helpless should any predators find you.  Somewhere in your heart, you find this prospect almost exhilarating.  The idea of being a helpless fucktoy for a wandering beast is unusually inviting to you.  Were it not for the thought that you might starve to death, you'd be incredibly tempted to remain right where you are.", false);
            if (lake) {
                //SCENE END = IF CHARACTER HAS FULL WINGS ADD SENTENCE
                if (this.player.canFly())
                    this.outputText("  You extend your wings and flap as hard as you can until at last, you manage to lighten the bulk of your body.  It helps just enough to let you drag your genitals out of the mud and back to camp.  The ordeal takes nearly an hour for you to return and deal with.", false);
                //Taurs
                else if (this.player.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_CENTAUR)
                    this.outputText("  You struggle and work your equine legs against the wet ground.  Your " + this.player.feet() + " have consistent trouble finding footing as the mud fails to provide enough leverage to lift your bulk.  You breath in deeply and lean side to side, trying to find some easier vertical leverage beneath your feet.  Eventually, with a crude crawl, your centaur legs manages to push the bulk of your body onto more solid ground.  With great difficulty, you spend the next hour shuffling your genitals back to camp.", false);
                //SCENE END = FOR ALL OTHER CHARACTERS
                else
                    this.outputText("  You struggle and push with your " + this.player.legs() + " as hard as you can, but it's no use.  You do the only thing you can and begin stroking your " + this.multiCockDescriptLight() + " with as much vigor as you can muster.  Eventually, your body tenses and a light load of jizz erupts from your body, but the orgasm is truly mild compared to what you need.  You're far too weary from struggling to give yourself the masturbation you truly need, but you continue to try.  Nearly an hour later, " + this.sMultiCockDesc() + " has softened enough to allow you to stand again, and you make your way back to camp, still dragging your genitals through the mud.", false);
            }
            else {
                //SCENE END = IF CHARACTER HAS FULL WINGS ADD SENTENCE
                if (this.player.canFly())
                    this.outputText("  You extend your wings and flap as hard as you can, until at last, you manage to lighten the bulk of your body.  It helps just enough to let you drag your genitals out of the forest and back to camp.  The ordeal takes nearly an hour for you to return and deal with.", false);
                //SCENE END IF CHARACTER HAS CENTAUR BODY
                else if (this.player.lowerBody == appearanceDefs_1.LOWER_BODY_TYPE_CENTAUR)
                    this.outputText("  You struggle and work your equine legs against the soft dirt.  Your " + this.player.feet() + " have consistent trouble finding footing as the ground fails to provide enough leverage to lift your bulk.  You breath in deeply and lean side to side, until eventually, your feet brace against the various roots of the trees around you.  With a crude crawl, your centaur legs manage to shuffle your body and genitals out of the forest and back to camp.", false);
                //SCENE END = FOR ALL OTHER CHARACTERS
                else
                    this.outputText("  You struggle and push with your " + this.player.legs() + " as hard as you can, but it's no use.  You do the only thing you can and begin stroking your " + this.multiCockDescriptLight() + " with as much vigor as you can muster.  Eventually, your body tenses and a light load of jizz erupts from your loins, but the orgasm is truly mild compared to what you need.  You're far too weary from struggling to give yourself the masturbation you truly need, but you continue to try.  Nearly an hour later, " + this.sMultiCockDesc() + " has softened enough to allow you to stand again, and you make your way back to camp, still dragging your genitals across the forest floor.", false);
            }
            this.dynStats("lus", 25 + Forest.rand(this.player.cor / 5), "resisted", false);
            this.fatigue(5);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        //Catch a Satyr using the corrupt glade and either leave or have your way with him.
        //Suggested to Fen as the MaleXMale submission.
        //Will be standalone
        trappedSatyr() {
            this.outputText("", true);
            this.spriteSelect(99);
            this.outputText("As you wander through the woods, you find yourself straying into yet another corrupt glade.  However, this time the perverse grove isn't unoccupied; loud bleatings and brayings of pleasure split the air, and as you push past a bush covered in dripping, glans-shaped berries, you spot the source.\n\n", false);
            this.outputText("A humanoid figure with a set of goat-like horns and legs - a satyr - is currently buried balls-deep in one of the vagina-flowers that scatter the grove, whooping in delight as he hungrily pounds into its ravenously sucking depths.  He stops on occasion to turn and take a slobbering suckle from a nearby breast-like growth; evidently, he doesn't care that he's stuck there until the flower's done with him.\n\n", false);
            //(Player lacks a penis:
            if (!this.player.hasCock()) {
                this.outputText("You can't really see any way to take advantage of this scenario, so you simply turn back and leave the way you came.", false);
                this.doNext(this.camp.returnToCampUseOneHour);
            }
            //Player returns to camp)
            //(Player has penis:
            else {
                this.outputText("You can see his goat tail flitting happily above his tight, squeezable asscheeks, the loincloth discarded beside him failing to obscure his black cherry, ripe for the picking.  Do you take advantage of his distraction and ravage his ass while he's helpless?\n\n", false);
                //[Yes] [No]
                this.simpleChoices("Ravage", this.rapeSatyr, "", undefined, "", undefined, "", undefined, "Leave", this.ignoreSatyr);
            }
        }
        //[=No=]
        ignoreSatyr() {
            this.outputText("", true);
            this.spriteSelect(99);
            this.outputText("You shake your head, ", false);
            if (this.player.cor < 50)
                this.outputText("disgusted by the strange thoughts this place seems to put into your mind", false);
            else
                this.outputText("not feeling inclined to rape some satyr butt right now", false);
            this.outputText(", and silently leave him to his pleasures.", false);
            this.dynStats("lus", 5 + this.player.lib / 20);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        //Player returns to camp
        rapeSatyr() {
            this.outputText("", true);
            this.spriteSelect(99);
            var x = this.player.biggestCockIndex();
            //(Low Corruption)
            if (this.player.cor < 33)
                this.outputText("For a moment you hesitate... taking someone from behind without their consent seems wrong... but then again you doubt a satyr would pass on the opportunity if you were in his position.", false);
            //(Medium Corruption)
            else if (this.player.cor < 66)
                this.outputText("You smirk; normally you would have given this some thought, but the idea of free booty is all you need to make a decision.", false);
            //High Corruption
            else
                this.outputText("You grin; this is not even a choice!  Passing on free anal is just not something a decent person does, is it?", false);
            this.outputText("  You silently strip your " + this.player.armorName + " and ", false);
            if (this.player.isNaga())
                this.outputText("slither", false);
            else
                this.outputText("sneak", false);
            this.outputText(" towards the distracted satyr; stopping a few feet away, you stroke your " + this.cockDescript(x) + ", urging it to full erection and coaxing a few beads of pre, which you smear along your " + this.player.cockHead(x) + ".  With no warning, you lunge forward, grabbing and pulling his hips towards your " + this.cockDescript(x) + " and shoving as much of yourself inside his tight ass as you can.\n\n", false);
            this.outputText("The satyr lets out a startled yelp, struggling against you, but between his awkward position and the mutant flower ravenously sucking on his sizable cock, he's helpless.\n\n", false);
            this.outputText("You slap his butt with a open palm, leaving a clear mark on his taut behind.  He bleats, bucking wildly, but this serves only to slam his butt into your crotch until the flower hungrily sucks him back, sliding him off your prick.  You smile as a wicked idea hits you; you hit his ass again and again, making him buck into your throbbing " + Appearance_1.Appearance.cockNoun(this.player.cocks[x].cockType) + ", while the flower keeps pulling him back inside; effectively making the satyr fuck himself.\n\n", false);
            this.outputText("Eventually, his bleating and screaming start to annoy you, so you silence him by grabbing at his horns and shoving his head to the side, into one of the breast-like growths nearby.  The satyr unthinkingly latches onto the floral nipple and starts to suckle, quieting him as you hoped.  You're not sure why, but he starts to voluntarily buck back and forth between you and the flower; maybe he's getting into the spirit of things, or maybe the vegetal teat he's pulling on has introduced an aphrodisiac chemical after so many violent attempts to pull out of the kindred flower.\n\n", false);
            this.outputText("You resolve not to think about it right now and just enjoy pounding the satyr's ass.  With his bucking you're able to thrust even farther into his tight puckered cherry, ", false);
            if (this.player.cockArea(x) >= 100)
                this.outputText("stretching it all out of normal proportion and ruining it for whomever might happen to use it next.", false);
            else
                this.outputText("stretching it to fit your " + this.cockDescript(x) + " like a condom.", false);
            this.outputText("  Your groin throbs, ", false);
            if (this.player.balls > 0)
                this.outputText("your balls churn, ", false);
            this.outputText("and you grunt as you feel the first shots of cum flowing along " + this.sMultiCockDesc() + ", only to pour out into", false);
            if (this.player.cockTotal() > 1)
                this.outputText(" and onto", false);
            this.outputText(" the satyr's abused ass; you continue pounding him even as you climax, causing rivulets of cum to run down his cheeks and legs.\n\n", false);
            this.outputText("Still slurping obscenely on the fake breast, the satyr groans and murmurs; you're not sure how much of a role the sap he's swallowing or the cunt-flower on his cock is playing, but it looks like he's actually enjoying himself now.", false);
            //(Low Cum Amount)
            if (this.player.cumQ() < 250)
                this.outputText("  As much as you'd love to fill his belly so full of spunk he'd look pregnant, you just can't muster any more, and pull out with a sigh.\n\n", false);
            //(Medium Cum Amount)
            else if (this.player.cumQ() < 1000)
                this.outputText("  You cum and cum, filling every crevice of his anal passage with warm jism, the slutty goatman doesn't seem to mind this in the least.  When you're finally spent, you pull out with a sigh, and watch as your cum backflows out of his ass to fall on the grass below.\n\n", false);
            //(Large Cum Amount)
            else
                this.outputText("  You cum and cum, filling every crevice of his anal passage with warm jism, and the slutty goatman doesn't seem to mind this in the least - yet.  You push him to his limits; cum backflows out of his ass and around your spewing prick, but still you dump more and more of your heavy load inside your now-willing cock-sleeve, inflating his belly like a balloon.  When you're finally spent, you pull out with a sigh and look at your handiwork; cum pours out of his ass like an open tap and his belly is absolutely bulging, making him look pregnant.\n\n", false);
            this.outputText("The satyr is too absorbed in his own fucking of the plant-pussy, and his nursing of the tree boob to bewail your absence", false);
            if (this.player.cumQ() >= 1000)
                this.outputText(", although his eyes have widened perceptibly along with the stretching of his stomach", false);
            this.outputText(".\n\n", false);
            this.outputText("You can't help but smile inwardly at the helpless goatman's eagerness, and decide to stick around and watch him a little longer.  It's not everyday you see a creature like him at your mercy.  Every once in awhile you egg him on with a fresh slapping of his butt. The satyr grumbles and huffs, but continues to thrust and rut mindlessly into the vegetative pussy feeding on his cock. You don't think it'll be long before he cums...\n\n", false);
            this.outputText("As you watch the lewd display, you feel your arousal building and your " + this.cockDescript(x) + " growing back into full mast. Figuring you already have a willing slut readily available, you consider using him to relieve yourself once more... What do you do?", false);
            this.player.orgasm();
            //[Again][Leave]
            this.simpleChoices("Again", this.secondSatyrFuck, "", undefined, "", undefined, "", undefined, "Leave", this.dontRepeatFuckSatyr);
        }
        //[=Leave=]
        dontRepeatFuckSatyr() {
            this.outputText("", true);
            this.spriteSelect(99);
            this.outputText("You've had your fun, and you don't really want to fool around in the forest all day, so you grab your " + this.player.armorName + " and leave the rutting satyr behind.\n\n", false);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        //[=Again=]
        secondSatyrFuck() {
            var x = this.player.cockThatFits(this.monster.analCapacity());
            if (x < 0)
                x = this.player.smallestCockIndex();
            this.outputText("", true);
            this.outputText("There's no harm in using the helpless goat once more... This time though, you decide you'll use his mouth.  With a yank on his horns, you forcefully dislodge him from the breast-plant and force him to his knees, turning his head towards you; he doesn't put up much resistance and when you present your erect shaft to him, he licks his lips in excitement and latches onto your " + this.cockDescript(x) + ".\n\n", false);
            this.outputText("His mouth is exquisite; it feels slippery and warm and his lips are soft while his tongue wriggles about your shaft, trying to embrace and massage it.  He gloms onto your manhood with eager hunger, desperate to ravish you with his mouth.  Quivers of pleasure ripple and shudder through his body as he slobbers and gulps - and no wonder!  From the remnants of sap still in his mouth, you can feel currents of arousal tingling down your cock; if he's been drinking it straight, his mouth must be as sensitive as a cunt from the effects of this stuff.\n\n", false);
            this.outputText("Having had your first orgasm mere minutes ago, you don't last long.  Within a few moments of his beginning you flood his mouth with a second load of cum, pulling out to paint his face with the last couple jets.\n\n", false);
            this.outputText("With a great, garbled cry, the satyr cums on his own, gurgling through the sap-tinted cum drooling from his mouth as he spews into the waiting opening of his rapacious plant lover.  It swells and bloats as it gorges itself on his thick, stinking seed, stretching its stem until it is almost spherical, finally releasing him to collapse on his knees, free at last of the plant's grip.  He moans and bleats softly, leaking cummy sap from his chin onto his hairy chest, too overwhelmed by the combined fucking of yourself and the flower and too poisoned by whatever aphrodisiac he's been slurping on to move.\n\n", false);
            this.outputText("You give your sensitive member a few trembling, almost-painful strokes... maybe you overdid it a bit.  Shrugging, you gather your " + this.player.armorName + " and leave the passed-out satyr behind as you go back to your camp.", false);
            this.player.orgasm();
            this.dynStats("lib", 1, "sen", -5);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
    }
    exports.Forest = Forest;
});
//# sourceMappingURL=Forest.js.map