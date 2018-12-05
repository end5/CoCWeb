import { Character } from 'Game/Character/Character';
import { Flags } from 'Game/Flags';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { randInt } from 'Engine/Utilities/SMath';
import { EffectType } from 'Game/Effects/EffectType';
import { CView } from 'Page/ContentView';
import { passTime } from 'Game/Menus/InGame/PlayerMenu';
import { Cock } from 'Game/Character/Body/Cock';
import { CombatManager } from 'Game/Combat/CombatManager';
import { mf } from 'Game/Descriptors/GenderDescriptor';
import { describeFeet, describeLegs } from 'Game/Descriptors/LegDescriptor';
import { describeCocksLight, describeCock, nounCock, describeOneOfYourCocks } from 'Game/Descriptors/CockDescriptor';
import { describeVagina, describeClit } from 'Game/Descriptors/VaginaDescriptor';
import { MaterialName } from 'Game/Items/Materials/MaterialName';
import { numToCardinalText } from 'Game/Utilities/NumToText';
import { describeHips } from 'Game/Descriptors/HipDescriptor';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { describeChest, describeNipple } from 'Game/Descriptors/BreastDescriptor';
import { describeSack, describeBalls } from 'Game/Descriptors/BallsDescriptor';
import { describeButt } from 'Game/Descriptors/ButtDescriptor';
import { VaginaWetness } from 'Game/Character/Body/Vagina';
import { LegType } from 'Game/Character/Body/Legs';
import { encounterTamanisDaughters, TamanisDaughtersFlags } from './Forest/TamanisDaughtersScene';
import { encounterTamani, TamaniFlags } from './Forest/TamaniScene';
import { encounterWildHunt, ErlKingFlags } from './Forest/ErlKingScene';
import { encounterFaerie } from './Forest/Faerie';
import { encounter, TentacleBeastFlags } from './Forest/TentacleBeastScene';
import { intro } from './Forest/CorruptedGlade';
import { supahAkabalEdition } from './Forest/AkbalScenes';
import { kitsuneShrine, enterTheTrickster } from './Forest/KitsuneScene';
import { beeEncounter } from './Forest/BeeGirlScene';
import { essrayleMeetingI, EssrayleFlags } from './Forest/Essrayle';
import { impLordEncounter } from './BeyondCamp/ImpLordScene';
import { Imp } from './BeyondCamp/Imp';
import { Goblin } from './BeyondCamp/Goblin';

export const ForestFlags = {
    TIMES_EXPLORED: 0,
    DEEPWOODS_EXPLORED: 0,
};
Flags.set("Forest", ForestFlags);
/**
 * Created by aimozg on 06.01.14.
 */

export function exploreDeepwoods(player: Character): NextScreenChoices {
    ForestFlags.DEEPWOODS_EXPLORED++;

    // $> Commented out for testing
    // // Every tenth exploration finds a pumpkin if eligible!
    // if (ForestFlags.DEEPWOODS_EXPLORED % 10 === 0 && isHalloween()) {
    //     // If Fera isn't free yet...
    //     if (!player.perks.has(PerkType.FerasBoonBreedingBitch) && !player.perks.has(PerkType.FerasBoonAlpha)) {
    //         if (date.fullYear > ForestFlags.PUMPKIN_FUCK_YEAR_DONE) {
    //             return pumpkinFuckEncounter();
    //         }
    //     }
    //     // Fera is free!
    //     else {
    //         if (ForestFlags.FERAS_TRAP_SPRUNG_YEAR === 0) {
    //             if (date.fullYear > ForestFlags.FERAS_GLADE_EXPLORED_YEAR) {
    //                 return feraSceneTwoIntroduction();
    //             }
    //         }
    //     }
    // }
    // // Hel jumps you for sex.
    // if (ForestFlags.PC_PROMISED_HEL_MONOGAMY_FUCKS === 1 && ForestFlags.HEL_RAPED_TODAY === 0 && randInt(10) === 0 && player.gender > 0 && !followerHel()) {
    //     return helSexualAmbush();
    // }
    // // Every 5th exploration encounters d2 if hasnt been met yet and factory done
    // if (ForestFlags.DISCOVERED_DUNGEON_2_ZETAZ === 0 && ForestFlags.DEEPWOODS_EXPLORED % 5 === 0 && player.effects.has(StatusEffectType.DungeonShutDown)) {
    //     CView.clear().text("While you explore the deepwoods, you do your best to forge into new, unexplored locations.  While you're pushing away vegetation and slapping at plant-life, you spot a half-overgrown orifice buried in the side of a ravine.  There's a large number of imp-tracks around the cavern's darkened entryway.  Perhaps this is where the imp, Zetaz, makes his lair?  In any event, it's past time you checked back on the portal.  You make a mental note of the cave's location so that you can return when you're ready.");
    //     CView.text("\n\n<b>You've discovered the location of Zetaz's lair!</b>");
    //     ForestFlags.DISCOVERED_DUNGEON_2_ZETAZ++;
    //     return { choices: [["Enter", enterZetazsLair], ["", undefined], ["", undefined], ["", undefined], ["Leave", passTime(1)]] };
    // }
    // Tamani 20% encounter rate
    if (TamaniFlags.TAMANI_TIME_OUT === 0 && randInt(5) === 0 && player.gender > 0 && (player.body.cocks.length > 0 || !player.inventory.keyItems.has("Deluxe Dildo"))) {
        if (player.body.cocks.length > 0 && TamanisDaughtersFlags.TAMANI_DAUGHTER_PREGGO_COUNTDOWN === 0 && TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS >= 24) {
            return encounterTamanisDaughters(player);
        }
        else
            return encounterTamani(player);
    }

    if (ErlKingFlags.ERLKING_DISABLED === 0 && ErlKingFlags.ERLKING_ENCOUNTER_COUNTER === 4) {
        ErlKingFlags.ERLKING_ENCOUNTER_COUNTER = 0;
        return encounterWildHunt(player);
    }
    else {
        ErlKingFlags.ERLKING_ENCOUNTER_COUNTER++;
    }

    const chooser: number = randInt(5);
    // Faerie
    if (chooser === 0) {
        return encounterFaerie(player);
    }
    // Tentacle monster
    if (chooser === 1) {
        // Reset hilarious shit
        if (player.gender > 0) TentacleBeastFlags.UNKNOWN_FLAG_NUMBER_00247 = 0;
        // Tentacle avoidance chance due to dangerous plants
        if (player.inventory.keyItems.has("Dangerous Plants") && player.stats.int / 2 > randInt(50)) {
            CView.clear().text("Using the knowledge contained in your 'Dangerous Plants' book, you determine a tentacle beast's lair is nearby, do you continue?  If not you could return to camp.\n\n");
            return { choices: [["Continue", encounter], ["", undefined], ["", undefined], ["", undefined], ["Leave", passTime(1)]] };
        }
        else {
            return encounter(player);
        }
    }
    // Corrupted Glade
    if (chooser === 2) {
        // $> Implement later
        // if (randInt(4) === 0) {
        //     return trappedSatyr(player);
        // }
        return intro(player);
    }
    if (chooser === 3) {
        return supahAkabalEdition(player);
    }
    else {
        if (randInt(3) === 0) return kitsuneShrine(player);
        else return enterTheTrickster(player);
    }
}

// Explore forest
export function exploreForest(player: Character): NextScreenChoices {
    ForestFlags.TIMES_EXPLORED++;

    let chooser: number = randInt(4);
    let dickDragChance = 0;
    // Cut bee encounter rate 50%
    if (chooser === 3 && randInt(2)) chooser = randInt(3);
    // $> Commented out for testing
    // Quick changes:
    // If monk is fully corrupted, encounter him less (unless haz ferriiite).
    // if (chooser === 1 && monk >= 2) {
    //     dickDragChance = randInt(4);
    //     if (dickDragChance === 0) chooser = 0;
    //     if (dickDragChance === 1) chooser = 2;
    //     if (dickDragChance === 2) chooser = 3;
    // }
    // $> Commented out for testing
    // Helia monogamy fucks
    // if (ForestFlags.PC_PROMISED_HEL_MONOGAMY_FUCKS === 1 && ForestFlags.HEL_RAPED_TODAY === 0 && randInt(10) === 0 && player.gender > 0 && !followerHel()) {
    //     return helSexualAmbush();
    // }
    // $> Commented out for testing
    // Raise Jojo chances for furrite
    // if (player.perks.has(PerkType.PiercedFurrite) && randInt(5) === 0 && (player.stats.cor > 25 || monk > 0)) {
    //     chooser = 1;
    // }
    // $> Commented out for testing
    // If Jojo lives in camp, never encounter him
    // if (player.effects.has(StatusEffectType.PureCampJojo) || ForestFlags.JOJO_DEAD_OR_GONE === 1) {
    //     chooser = randInt(3);
    //     if (chooser >= 1) chooser++;
    // }
    // Chance to discover deepwoods
    if ((ForestFlags.TIMES_EXPLORED >= 20) && ForestFlags.DEEPWOODS_EXPLORED === 0) {
        ForestFlags.DEEPWOODS_EXPLORED++;
        CView.clear().text("After exploring the forest so many times, you decide to really push it, and plunge deeper and deeper into the woods.  The further you go the darker it gets, but you courageously press on.  The plant-life changes too, and you spot more and more lichens and fungi, many of which are luminescent.  Finally, a wall of tree-trunks as wide as houses blocks your progress.  There is a knot-hole like opening in the center, and a small sign marking it as the entrance to the 'Deepwoods'.  You don't press on for now, but you could easily find your way back to explore the Deepwoods.\n\n<b>Deepwoods exploration unlocked!</b>");
        return { next: passTime(1) };
    }
    // Essy every 20 explores or so
    if ((randInt(100) <= 1) && player.gender > 0 && (EssrayleFlags.ESSY_MET_IN_DUNGEON === 0 || EssrayleFlags.TOLD_MOTHER_TO_RELEASE_ESSY === 1)) {
        return essrayleMeetingI(player);
    }
    // Chance of dick-dragging! 10% + 10% per two foot up to 30%
    dickDragChance = 10 + (player.body.cocks.sort(Cock.Longest).get(0)!.length - player.body.tallness) / 24 * 10;
    if (dickDragChance > 30) dickDragChance = 30;
    if (dickDragChance > randInt(100) && player.body.cocks.sort(Cock.Longest).get(0)!.length >= player.body.tallness && player.body.cocks.reduce(Cock.TotalThickness, 0) >= 12) {
        return bigJunkForestScene(player);
    }
    // $> Commented out for testing
    // Marble randomness
    // if (
    //     ForestFlags.TIMES_EXPLORED % 50 === 0 &&
    //     ForestFlags.TIMES_EXPLORED > 0 &&
    //     !player.effects.has(StatusEffectType.MarbleRapeAttempted) &&
    //     !player.effects.has(StatusEffectType.NoMoreMarble) &&
    //     player.effects.has(StatusEffectType.Marble) &&
    //     MarbleFlags.MARBLE_WARNING === 0
    // ) {
    //     // can be triggered one time after Marble has been met, but before the addiction quest starts.
    //     CView.clear();
    //     CView.text("While you're moving through the trees, you suddenly hear yelling ahead, followed by a crash and a scream as an imp comes flying at high speed through the foliage and impacts a nearby tree.  The small demon slowly slides down the tree before landing at the base, still.  A moment later, a familiar-looking cow-girl steps through the bushes brandishing a huge two-handed hammer with an angry look on her face.");
    //     CView.text("\n\nShe goes up to the imp, and kicks it once.  Satisfied that the creature isn't moving, she turns around to face you and gives you a smile.  \"<i>Sorry about that, but I prefer to take care of these buggers quickly.  If they get the chance to call on their friends, they can actually become a nuisance.</i>\"  She disappears back into the foliage briefly before reappearing holding two large pile of logs under her arms, with a fire axe and her hammer strapped to her back.  \"<i>I'm gathering firewood for the farm, as you can see; what brings you to the forest, sweetie?</i>\"  You inform her that you're just exploring.");
    //     CView.text("\n\nShe gives a wistful sigh. \"<i>I haven't really explored much since getting to the farm.  Between the jobs Whitney gives me, keeping in practice with my hammer, milking to make sure I don't get too full, cooking, and beauty sleep, I don't get a lot of free time to do much else.</i>\"  She sighs again.  \"<i>Well, I need to get this back, so I'll see you later!</i>\"");
    //     // end event
    //     return { next: passTime(1) };
    // }
    if (chooser === 0) {
        // Determines likelyhood of imp/goblins
        // Below - goblin, Equal and up - imp
        let impGob: number = 5;

        // Dicks + lots of cum boosts goblin probability
        // Vags + Fertility boosts imp probability
        if (player.body.cocks.length > 0) impGob--;
        if (player.body.vaginas.length > 0) impGob++;
        if (player.totalFertility() >= 30) impGob++;
        if (player.cumQ() >= 200) impGob--;
        if (player.effects.has(EffectType.PiercedLethite)) {
            if (impGob <= 3) impGob += 2;
            else if (impGob < 7) impGob = 7;
        }
        // Imptacular Encounter
        if (randInt(10) < impGob) {
            if (player.stats.level >= 8 && randInt(2) === 0) {
                return impLordEncounter(player);
            }
            else {
                CView.clear().text("An imp leaps out of the bushes and attacks!");
                return CombatManager.beginBattle(player, new Imp());
            }
        }
        // Encounter Gobbalin!
        else {
            // Tamani 25% of all goblin encounters encounter rate
            if (randInt(4) <= 0 && TamaniFlags.TAMANI_TIME_OUT === 0 && player.gender > 0 && (player.body.cocks.length > 0 || !player.inventory.keyItems.has("Deluxe Dildo"))) {
                if (player.body.cocks.length > 0 && TamanisDaughtersFlags.TAMANI_DAUGHTER_PREGGO_COUNTDOWN === 0 && TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS >= 24) {
                    return encounterTamanisDaughters(player);
                }
                else
                    return encounterTamani(player);
            }
            // $> Implement Later
            // 50% of the time, goblin assassin!
            // if (player.stats.level >= 10 && randInt(2) === 0) {
            //     return goblinAssassinEncounter(player);
            // }
            if (player.gender > 0) {
                CView.clear().text("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fucked, " + mf(player, "stud", "slut"));
                CView.text(".</i>\"");
                return CombatManager.beginBattle(player, new Goblin());
            }
            else {
                CView.clear().text("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fuc-oh shit, you don't even have anything to play with!  This is for wasting my time!");
                CView.text("</i>\"");
                return CombatManager.beginBattle(player, new Goblin());
            }
        }
    }
    if (chooser === 1) {
        // $> Commented out for testing
        // if (monk === 0) {
        //     if (player.stats.cor < 25) {
        //         if (player.stats.level >= 4) {
        //             monk = 1;
        //             return lowCorruptionJojoEncounter();
        //         }
        //         else {
        //             CView.clear().text("You enjoy a peaceful walk in the woods.  It gives you time to think over the recent, disturbing events.");
        //             player.stats.tou += .5;
        //             player.stats.int += 1;

        //             return { next: passTime(1) };
        //         }
        //     }

        //     monk = 1;
        //     jojoSprite();
        //     CView.text("While marvelling at the strange trees and vegetation of the forest, the bushes ruffle ominously.  A bush seems to explode into a flurry of swirling leaves and movement.  Before you can react you feel your " + describeFeet(player) + " being swept out from under you, and land hard on your back.\n\n");
        //     CView.text("The angry visage of a lithe white mouse gazes down on your prone form with a look of confusion.");
        //     CView.text("\n\n\"<i>I'm sorry, I sensed a great deal of corruption, and thought a demon or monster had come to my woods,</i>\" says the mouse, \"<i>Oh, where are my manners!</i>\"\n\nHe helps you to your feet and introduces himself as Jojo.  Now that you have a good look at him, it is obvious this mouse is some kind of monk, dressed in robes, holy symbols, and draped with prayer beads.\n\nHe smiles knowingly, \"<i>Yes I am a monk, and yes this is a strange place for one such as I... this world was not always this way.  Long ago this world was home to many villages, including my own.  But then the demons came.  I'm not sure if they were summoned, created, or simply a perversion of magic or breeding, but they came swarming out of the mountains to destroy everything in their path.</i>\"");
        //     CView.text("\n\nJojo sighs sadly, \"<i>Enough of my woes.  You are very corrupted.  If you cannot be sufficiently purified you WILL become one of them in time.  Will you let me help you?");
        //     if (player.gender > 0) {
        //         trace("Gender != 0");
        //         return { choices: [["Accept", meditateInForest], ["Rape Him", jojoRape], ["BWUH?", undefined], ["Decline", passTime(1)]] };
        //     }
        //     else {
        //         trace("Gender == 0");
        //         return { choices: [["Accept", meditateInForest], ["Rape Him", undefined], ["BWUH?", undefined], ["Decline", passTime(1)]] };
        //     }
        // }
        // if (monk === 1) {
        //     if (player.effects.has(StatusEffectType.Infested)) {
        //         jojoSprite();
        //         CView.clear().text("As you approach the serene monk, you see his nose twitch, disturbing his meditation.\n\n");
        //         CView.text("\"<i>It seems that the agents of corruption have taken residence within the temple that is your body.</i>\", Jojo says flatly. \"<i>This is a most unfortunate development. There is no reason to despair as there are always ways to fight the corruption. However, great effort will be needed to combat this form of corruption and may leave lasting impressions upon you. If you are ready, we can purge your being of the rogue creatures of lust.</i>\"\n\n");
        //         if (player.gender > 0) return { choices: [["Purge", wormRemoval], ["Meditate", meditateInForest], ["Rape", jojoRape], ["", undefined], ["Leave", passTime(1)]] };
        //         else return { choices: [["Purge", wormRemoval], ["Meditate", meditateInForest], ["Rape", undefined], ["", undefined], ["Leave", passTime(1)]] };
        //     }
        //     jojoSprite();
        //     CView.text("Jojo the monk appears before you, robes and soft white fur fluttering in the breeze.  He asks, \"<i>Are you ready for a meditation session?</i>\"");
        //     if (player.gender > 0) return { choices: [["Yes", meditateInForest], ["No", passTime(1)], ["BWUH", undefined], ["Rape Him", jojoRape]] };
        //     else return { choices: [["Yes", meditateInForest], ["No", passTime(1)], ["BWUH", undefined], ["Rape Him", undefined]] };
        // }
        // if (monk >= 2) {
        //     jojoSprite();
        //     CView.clear().text("You are enjoying a peaceful walk through the woods when Jojo drops out of the trees ahead, ");
        //     if (monk === 2) CView.text("his mousey visage twisted into a ferocious snarl.  \"YOU!\" he screams, launching himself towards you, claws extended.");
        //     if (monk === 3) CView.text("unsteady on his feet, but looking for a fight!");
        //     if (monk === 4) CView.text("visibly tenting his robes, but intent on fighting you.");
        //     if (monk === 5) CView.text("panting and nude, his fur rustling in the breeze, a twitching behemoth of a cock pulsing between his legs.");
        //     return CombatManager.beginBattle(player, new Jojo());
        // }
        return { next: passTime(1) };
    }
    // Tentacles 25% of the time...
    if (chooser === 2) {
        dickDragChance = randInt(5);
        // Oh noes, tentacles!
        if (dickDragChance === 0) {
            // Tentacle avoidance chance due to dangerous plants
            if (player.inventory.keyItems.has("Dangerous Plants") && player.stats.int / 2 > randInt(50)) {
                CView.text("Using the knowledge contained in your 'Dangerous Plants' book, you determine a tentacle beast's lair is nearby, do you continue?  If not you could return to camp.\n\n");
                return { choices: [["Continue", encounter], ["", undefined], ["", undefined], ["", undefined], ["Leave", passTime(1)]] };
            }
            else {
                return encounter(player);
            }
        }
        if (dickDragChance === 1) {
            if (player.stats.cor < 80) {
                CView.text("You enjoy a peaceful walk in the woods, it gives you time to think.");
                player.stats.tou += .5;
                player.stats.int += 1;
            }
            else {
                CView.text("As you wander in the forest, you keep ");
                if (player.gender === 1) CView.text("stroking your half-erect " + describeCocksLight(player) + " as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes.");
                if (player.gender === 2) CView.text("idly toying with your " + describeVagina(player, player.body.vaginas.get(0)) + " as you daydream about getting fucked by all kinds of monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.");
                if (player.gender === 3) CView.text("stroking alternatively your " + describeCocksLight(player) + " and your " + describeVagina(player, player.body.vaginas.get(0)) + " as you daydream about fucking all kinds of women, from weeping tight virgins to lustful succubi with gaping, drooling fuck-holes, before, or while, getting fucked by various monstrous cocks, from minotaurs' thick, smelly dongs to demons' towering, bumpy pleasure-rods.");
                if (player.gender === 0) CView.text("daydreaming about sex-demons with huge sexual attributes, and how you could please them.");

                player.stats.tou += .5;
                player.stats.lib += .25;
                player.stats.lust += player.stats.lib / 5;

            }
            return { next: passTime(1) };
        }
        // CORRUPTED GLADE
        if (dickDragChance === 2 || dickDragChance >= 4) {
            // $> Implement later
            // if (randInt(4) === 0) {
            //     return trappedSatyr(player);
            // }
            return intro(player);
        }
        // Trip on a root!
        if (dickDragChance === 3) {
            CView.text("You trip on an exposed root, scraping yourself somewhat, but otherwise the hour is uneventful.");
            player.stats.HP -= 10;
            return { next: passTime(1) };
        }
    }
    // Bee-girl encounter
    if (chooser === 3) {
        if (randInt(10) === 0) {
            CView.clear().text("You find a large piece of insectile carapace obscured in the ferns to your left.  It's mostly black with a thin border of bright yellow along the outer edge.  There's still a fair portion of yellow fuzz clinging to the chitinous shard.  It feels strong and flexible - maybe someone can make something of it.  ");
            return player.inventory.items.createAdd(player, MaterialName.BlackChitin, passTime(1));
        }
        return beeEncounter(player);
    }
    throw new Error("Error: Couldn't find scene to display");
}
// [FOREST]
// [RANDOM SCENE IF CHARACTER HAS AT LEAST ONE COCK LARGER THAN THEIR HEIGHT, AND THE TOTAL COMBINED WIDTH OF ALL THEIR COCKS IS TWELVE INCHES OR GREATER]
function bigJunkForestScene(player: Character, lake: boolean = false): NextScreenChoices {

    const firstCock = player.body.cocks.sort(Cock.Longest).get(0)!;

    // PARAGRAPH 1
    CView.text("Walking along the ");
    if (lake) CView.text("grassy and muddy shores of the lake");
    else CView.text("various paths of the forest");
    CView.text(", you find yourself increasingly impeded by the bulk of your " + describeCock(player, firstCock) + " dragging along the ");
    if (lake) CView.text("wet ground behind you.");
    else CView.text("earth behind you.");
    if (player.body.cocks.length === 1) {
        if (lake) CView.text("  As it drags through the lakeside mud, the sensation forces you to imagine the velvety folds of a monstrous pussy sliding along the head of your " + nounCock(firstCock.type) + ", gently attempting to suck it off.");
        else CView.text("  As it drags across the grass, twigs, and exposed tree roots, the sensation forces you to imagine the fingers of a giant hand sliding along the head of your " + nounCock(firstCock.type) + ", gently jerking it off.");
    }
    else if (player.body.cocks.length >= 2) {
        if (lake) CView.text("  With all of your " + describeCocksLight(player) + " dragging through the mud, they begin feeling as if the lips of " + numToCardinalText(player.body.cocks.length) + " different cunts were slobbering over each one.");
        else CView.text("  With all of your " + describeCocksLight(player) + " dragging across the grass, twigs, and exposed tree roots, they begin feeling as if the rough fingers of " + numToCardinalText(player.body.cocks.length) + " different monstrous hands were sliding over each shaft, gently jerking them off.");
    }
    CView.text("\n\n");

    // PARAGRAPH 2
    // FOR NON-CENTAURS]
    if (!player.body.legs.isTaur()) {
        CView.text("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + describeCocksLight(player) + ", which forces your torso to the ground.  Normally your erection would merely raise itself skyward, but your genitals have grown too large and heavy for your " + describeHips(player) + " to hold them aloft.  Instead, you feel your body forcibly pivoting at the hips until your torso is compelled to rest face down atop your " + describeCocksLight(player) + ".");
        // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 35) {
            if (lake) CView.text("  Your " + describeChest(player) + " hang lewdly off your torso to rest in the lakeside mud, covering much of the ground to either side of you.  Their immense weight anchors your body, further preventing your torso from lifting itself up.  Mud cakes against their undersides and coats your " + describeNipple(player, player.body.chest.get(0)) + "s.");
            else CView.text("  Your " + describeChest(player) + " hang lewdly off your torso to rest on the twings and dirt, covering up much of the ground to either side of you.  Their immense weight anchors your body, further preventing your torso from lifting itself up.  The rough texture of the bark on various tree roots teases your " + describeNipple(player, player.body.chest.get(0)) + "s mercilessly.");
        }
        // IF CHARACTER HAS A BALLS ADD SENTENCE
        if (player.body.balls.count > 0) {
            CView.text("  Your " + player.body.skin.tone + " " + describeSack(player) + " rests beneath your raised " + describeButt(player) + ".  Your " + describeBalls(true, true, player) + " pulse with the need to release their sperm through your " + describeCocksLight(player) + " and ");
            if (lake) CView.text("into the waters of the nearby lake.");
            else CView.text("onto the fertile soil of the forest.");
        }
        // IF CHARACTER HAS A VAGINA ADD SENTENCE
        if (player.body.vaginas.length >= 1) {
            CView.text("  Your " + describeVagina(player, player.body.vaginas.get(0)) + " and " + describeClit(player) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + describeButt(player) + " above.");
            // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
            if (player.body.vaginas.get(0)!.wetness >= VaginaWetness.DROOLING) {
                CView.text("  Juices stream from your womanhood and begin pooling on the dirt and twigs beneath you.  ");
                if (lake) CView.text("The drooling fem-spunk only makes the ground more muddy.");
                else CView.text("The sticky fem-spunk immediately soaks down into the rich soil.");
            }
        }
    }
    // FOR CENTAURS
    else if (player.body.legs.type === LegType.CENTAUR) {
        CView.text("  The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + describeCocksLight(player) + ", which forces the barrel of your horse-like torso to the ground.  Normally your erection would merely hover above the ground in between your centaurian legs, but your genitals have grown too large and heavy for your " + describeHips(player) + " to hold them aloft.  Instead, you feel your body being forcibly pulled down at your hind legs until your equine body is resting on top of your " + describeCocksLight(player) + ".");
        // IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 35) {
            if (lake) CView.text("  Your " + describeChest(player) + " pull your human torso forward until it also is forced to face the ground, obscured as it is in boob-flesh.  Your tits rest on the wet earth to either side of you.  Their immense weight anchors you, further preventing any part of your equine body from lifting itself up.  Mud cakes their undersides and coats your " + describeNipple(player, player.body.chest.get(0)) + "s.");
            else CView.text("  Your " + describeChest(player) + " pull your human torso forward until it also is forced to face the ground, obscured as it is in boob-flesh.  Your tits rest on the dirt and twigs to either side of you.  Their immense weight anchors you, further preventing any part of your equine body from lifting itself up.  The rough texture of the bark on various tree roots teases your " + describeNipple(player, player.body.chest.get(0)) + "s mercilessly.");
        }
        // IF CHARACTER HAS A BALLS ADD SENTENCE
        if (player.body.balls.count > 0) {
            CView.text("  Your " + player.body.skin.tone + describeSack(player) + " rests beneath your raised " + describeButt(player) + ".  Your " + describeBalls(true, true, player) + " pulse with the need to release their sperm through your " + describeCocksLight(player) + " and ");
            if (lake) CView.text("into the waters of the nearby lake.");
            else CView.text("onto the fertile soil of the forest floor.");
        }
        // IF CHARACTER HAS A VAGINA ADD SENTENCE
        if (player.body.vaginas.length >= 1) {
            CView.text("  Your " + describeVagina(player, player.body.vaginas.get(0)) + " and " + describeClit(player) + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + describeButt(player) + " above.");
            // IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
            if (player.body.vaginas.get(0)!.wetness >= VaginaWetness.DROOLING) {
                if (lake) CView.text("  A leaf falls from a tree and lands on the wet lips of your cunt, its light touch teasing your sensitive skin.  Like a mare or cow in heat, your juices stream from your womanhood and pool in the mud beneath you.  The sloppy fem-spunk only makes the ground more muddy.");
                else CView.text("  A leaf falls from a tree and lands on the wet lips of your cunt, its light touch teasing your sensitive skin.  Like a mare or cow in heat, your juices stream from your womanhood and pool in the dirt and twigs beneath you.");
            }
        }
    }
    CView.text("\n\n");
    // PARAGRAPH 3
    CView.text("You realize you are effectively trapped here by your own body.");
    // CORRUPTION BASED CHARACTER'S VIEW OF SITUATION
    if (player.stats.cor < 33) CView.text("  Panic slips into your heart as you realize that if any dangerous predator were to find you in this state, you'd be completely defenseless.  You must find a way to regain your mobility immediately!");
    else if (player.stats.cor < 66) CView.text("  You realize that if any dangerous predator were to find you in this state, you'd be completely defenseless!  You must find a way to regain your mobility... yet there is a certain appeal to imagining how pleasurable it would be for a sexual predator to take advantage of your obscene body.");
    else CView.text("  Your endowments have rendered you completely helpless should any predators find you.  Somewhere in your heart, you find this prospect almost exhilarating.  The idea of being a helpless fucktoy for a wandering beast is unusually inviting to you.  Were it not for the thought that you might starve to death, you'd be incredibly tempted to remain right where you are.");

    if (lake) {
        // SCENE END = IF CHARACTER HAS FULL WINGS ADD SENTENCE
        if (player.canFly()) CView.text("  You extend your wings and flap as hard as you can until at last, you manage to lighten the bulk of your body.  It helps just enough to let you drag your genitals out of the mud and back to camp.  The ordeal takes nearly an hour for you to return and deal with.");
        // Taurs
        else if (player.body.legs.type === LegType.CENTAUR) CView.text("  You struggle and work your equine legs against the wet ground.  Your " + describeFeet(player) + " have consistent trouble finding footing as the mud fails to provide enough leverage to lift your bulk.  You breath in deeply and lean side to side, trying to find some easier vertical leverage beneath your feet.  Eventually, with a crude crawl, your centaur legs manages to push the bulk of your body onto more solid ground.  With great difficulty, you spend the next hour shuffling your genitals back to camp.");
        // SCENE END = FOR ALL OTHER CHARACTERS
        else CView.text("  You struggle and push with your " + describeLegs(player) + " as hard as you can, but it's no use.  You do the only thing you can and begin stroking your " + describeCocksLight(player) + " with as much vigor as you can muster.  Eventually, your body tenses and a light load of jizz erupts from your body, but the orgasm is truly mild compared to what you need.  You're far too weary from struggling to give yourself the masturbation you truly need, but you continue to try.  Nearly an hour later, " + describeOneOfYourCocks(player) + " has softened enough to allow you to stand again, and you make your way back to camp, still dragging your genitals through the mud.");
    }
    else {
        // SCENE END = IF CHARACTER HAS FULL WINGS ADD SENTENCE
        if (player.canFly()) CView.text("  You extend your wings and flap as hard as you can, until at last, you manage to lighten the bulk of your body.  It helps just enough to let you drag your genitals out of the forest and back to camp.  The ordeal takes nearly an hour for you to return and deal with.");
        // SCENE END IF CHARACTER HAS CENTAUR BODY
        else if (player.body.legs.type === LegType.CENTAUR) CView.text("  You struggle and work your equine legs against the soft dirt.  Your " + describeFeet(player) + " have consistent trouble finding footing as the ground fails to provide enough leverage to lift your bulk.  You breath in deeply and lean side to side, until eventually, your feet brace against the various roots of the trees around you.  With a crude crawl, your centaur legs manage to shuffle your body and genitals out of the forest and back to camp.");
        // SCENE END = FOR ALL OTHER CHARACTERS
        else CView.text("  You struggle and push with your " + describeLegs(player) + " as hard as you can, but it's no use.  You do the only thing you can and begin stroking your " + describeCocksLight(player) + " with as much vigor as you can muster.  Eventually, your body tenses and a light load of jizz erupts from your loins, but the orgasm is truly mild compared to what you need.  You're far too weary from struggling to give yourself the masturbation you truly need, but you continue to try.  Nearly an hour later, " + describeOneOfYourCocks(player) + " has softened enough to allow you to stand again, and you make your way back to camp, still dragging your genitals across the forest floor.");
    }
    player.stats.lustNoResist += 25 + randInt(player.stats.cor / 5);

    player.stats.fatigue += 5;
    return { next: passTime(1) };
}
// $> Implement later
// Catch a Satyr using the corrupt glade and either leave or have your way with him.
// Suggested to Fen as the MaleXMale submission.
// Will be standalone
// function trappedSatyr(player: Character): NextScreenChoices {

//     CView.sprite(SpriteName.Forest); // 99;
//     CView.text("As you wander through the woods, you find yourself straying into yet another corrupt glade.  However, this time the perverse grove isn't unoccupied; loud bleatings and brayings of pleasure split the air, and as you push past a bush covered in dripping, glans-shaped berries, you spot the source.\n\n");

//     CView.text("A humanoid figure with a set of goat-like horns and legs - a satyr - is currently buried balls-deep in one of the vagina-flowers that scatter the grove, whooping in delight as he hungrily pounds into its ravenously sucking depths.  He stops on occasion to turn and take a slobbering suckle from a nearby breast-like growth; evidently, he doesn't care that he's stuck there until the flower's done with him.\n\n");

//     // (Player lacks a penis:
//     if (player.body.cocks.length <= 0) {
//         CView.text("You can't really see any way to take advantage of this scenario, so you simply turn back and leave the way you came.");
//         return { next: passTime(1) };
//     }
//     // Player returns to camp)
//     // (Player has penis:
//     else {
//         CView.text("You can see his goat tail flitting happily above his tight, squeezable asscheeks, the loincloth discarded beside him failing to obscure his black cherry, ripe for the picking.  Do you take advantage of his distraction and ravage his ass while he's helpless?\n\n");
//         // [Yes] [No]
//         return { choices: [["Ravage", rapeSatyr], ["", undefined], ["", undefined], ["", undefined], ["Leave", ignoreSatyr]] };
//     }
// }

// // [=No=]
// function ignoreSatyr(player: Character): NextScreenChoices {

//     CView.sprite(SpriteName.Forest); // 99;
//     CView.text("You shake your head, ");
//     if (player.stats.cor < 50) CView.text("disgusted by the strange thoughts this place seems to put into your mind");
//     else CView.text("not feeling inclined to rape some satyr butt right now");
//     CView.text(", and silently leave him to his pleasures.");
//     player.stats.lust += 5 + player.stats.lib / 20;

//     return { next: passTime(1) };
// }
// // Player returns to camp
// function rapeSatyr(player: Character): NextScreenChoices {

//     CView.sprite(SpriteName.Forest); // 99;
//     const largestCock = player.body.cocks.sort(Cock.Largest).get(0)!;

//     // (Low Corruption)
//     if (player.stats.cor < 33) CView.text("For a moment you hesitate... taking someone from behind without their consent seems wrong... but then again you doubt a satyr would pass on the opportunity if you were in his position.");
//     // (Medium Corruption)
//     else if (player.stats.cor < 66) CView.text("You smirk; normally you would have given this some thought, but the idea of free booty is all you need to make a decision.");
//     // High Corruption
//     else CView.text("You grin; this is not even a choice!  Passing on free anal is just not something a decent person does, is it?");

//     CView.text("  You silently strip your " + player.inventory.armor.displayName + " and ");
//     if (player.body.legs.isNaga()) CView.text("slither");
//     else CView.text("sneak");

//     CView.text(" towards the distracted satyr; stopping a few feet away, you stroke your " + describeCock(player, largestCock) + ", urging it to full erection and coaxing a few beads of pre, which you smear along your " + describeCockHead(largestCock) + ".  With no warning, you lunge forward, grabbing and pulling his hips towards your " + describeCock(player, largestCock) + " and shoving as much of yourself inside his tight ass as you can.\n\n");

//     CView.text("The satyr lets out a startled yelp, struggling against you, but between his awkward position and the mutant flower ravenously sucking on his sizable cock, he's helpless.\n\n");

//     CView.text("You slap his butt with a open palm, leaving a clear mark on his taut behind.  He bleats, bucking wildly, but this serves only to slam his butt into your crotch until the flower hungrily sucks him back, sliding him off your prick.  You smile as a wicked idea hits you; you hit his ass again and again, making him buck into your throbbing " + nounCock(largestCock.type) + ", while the flower keeps pulling him back inside; effectively making the satyr fuck himself.\n\n");

//     CView.text("Eventually, his bleating and screaming start to annoy you, so you silence him by grabbing at his horns and shoving his head to the side, into one of the breast-like growths nearby.  The satyr unthinkingly latches onto the floral nipple and starts to suckle, quieting him as you hoped.  You're not sure why, but he starts to voluntarily buck back and forth between you and the flower; maybe he's getting into the spirit of things, or maybe the vegetal teat he's pulling on has introduced an aphrodisiac chemical after so many violent attempts to pull out of the kindred flower.\n\n");

//     CView.text("You resolve not to think about it right now and just enjoy pounding the satyr's ass.  With his bucking you're able to thrust even farther into his tight puckered cherry, ");
//     if (largestCock.area >= 100) CView.text("stretching it all out of normal proportion and ruining it for whomever might happen to use it next.");
//     else CView.text("stretching it to fit your " + describeCock(player, largestCock) + " like a condom.");
//     CView.text("  Your groin throbs, ");
//     if (player.body.balls.count > 0) CView.text("your balls churn, ");
//     CView.text("and you grunt as you feel the first shots of cum flowing along " + describeOneOfYourCocks(player) + ", only to pour out into");
//     if (player.body.cocks.length > 1) CView.text(" and onto");
//     CView.text(" the satyr's abused ass; you continue pounding him even as you climax, causing rivulets of cum to run down his cheeks and legs.\n\n");

//     CView.text("Still slurping obscenely on the fake breast, the satyr groans and murmurs; you're not sure how much of a role the sap he's swallowing or the cunt-flower on his cock is playing, but it looks like he's actually enjoying himself now.");

//     // (Low Cum Amount)
//     if (player.cumQ() < 250) CView.text("  As much as you'd love to fill his belly so full of spunk he'd look pregnant, you just can't muster any more, and pull out with a sigh.\n\n");
//     // (Medium Cum Amount)
//     else if (player.cumQ() < 1000) CView.text("  You cum and cum, filling every crevice of his anal passage with warm jism, the slutty goatman doesn't seem to mind this in the least.  When you're finally spent, you pull out with a sigh, and watch as your cum backflows out of his ass to fall on the grass below.\n\n");
//     // (Large Cum Amount)
//     else CView.text("  You cum and cum, filling every crevice of his anal passage with warm jism, and the slutty goatman doesn't seem to mind this in the least - yet.  You push him to his limits; cum backflows out of his ass and around your spewing prick, but still you dump more and more of your heavy load inside your now-willing cock-sleeve, inflating his belly like a balloon.  When you're finally spent, you pull out with a sigh and look at your handiwork; cum pours out of his ass like an open tap and his belly is absolutely bulging, making him look pregnant.\n\n");

//     CView.text("The satyr is too absorbed in his own fucking of the plant-pussy, and his nursing of the tree boob to bewail your absence");
//     if (player.cumQ() >= 1000) CView.text(", although his eyes have widened perceptibly along with the stretching of his stomach");
//     CView.text(".\n\n");

//     CView.text("You can't help but smile inwardly at the helpless goatman's eagerness, and decide to stick around and watch him a little longer.  It's not everyday you see a creature like him at your mercy.  Every once in awhile you egg him on with a fresh slapping of his butt. The satyr grumbles and huffs, but continues to thrust and rut mindlessly into the vegetative pussy feeding on his cock. You don't think it'll be long before he cums...\n\n");

//     CView.text("As you watch the lewd display, you feel your arousal building and your " + describeCock(player, largestCock) + " growing back into full mast. Figuring you already have a willing slut readily available, you consider using him to relieve yourself once more... What do you do?");
//     player.orgasm();
//     // [Again][Leave]
//     return { choices: [["Again", secondSatyrFuck], ["", undefined], ["", undefined], ["", undefined], ["Leave", dontRepeatFuckSatyr]] };
// }

// // [=Leave=]
// function dontRepeatFuckSatyr(player: Character): NextScreenChoices {

//     CView.sprite(SpriteName.Forest); // 99;
//     CView.text("You've had your fun, and you don't really want to fool around in the forest all day, so you grab your " + player.inventory.armor.displayName + " and leave the rutting satyr behind.\n\n");
//     return { next: passTime(1) };
// }
// // [=Again=]
// function secondSatyrFuck(player: Character): NextScreenChoices {
//     let cockThatFits = player.body.cocks.find(Cock.CockThatFits(new Satyr().analCapacity()));
//     if (!cockThatFits) cockThatFits = player.body.cocks.sort(Cock.Smallest).get(0);

//     CView.text("There's no harm in using the helpless goat once more... This time though, you decide you'll use his mouth.  With a yank on his horns, you forcefully dislodge him from the breast-plant and force him to his knees, turning his head towards you; he doesn't put up much resistance and when you present your erect shaft to him, he licks his lips in excitement and latches onto your " + describeCock(player, cockThatFits) + ".\n\n");

//     CView.text("His mouth is exquisite; it feels slippery and warm and his lips are soft while his tongue wriggles about your shaft, trying to embrace and massage it.  He gloms onto your manhood with eager hunger, desperate to ravish you with his mouth.  Quivers of pleasure ripple and shudder through his body as he slobbers and gulps - and no wonder!  From the remnants of sap still in his mouth, you can feel currents of arousal tingling down your cock; if he's been drinking it straight, his mouth must be as sensitive as a cunt from the effects of this stuff.\n\n");

//     CView.text("Having had your first orgasm mere minutes ago, you don't last long.  Within a few moments of his beginning you flood his mouth with a second load of cum, pulling out to paint his face with the last couple jets.\n\n");

//     CView.text("With a great, garbled cry, the satyr cums on his own, gurgling through the sap-tinted cum drooling from his mouth as he spews into the waiting opening of his rapacious plant lover.  It swells and bloats as it gorges itself on his thick, stinking seed, stretching its stem until it is almost spherical, finally releasing him to collapse on his knees, free at last of the plant's grip.  He moans and bleats softly, leaking cummy sap from his chin onto his hairy chest, too overwhelmed by the combined fucking of yourself and the flower and too poisoned by whatever aphrodisiac he's been slurping on to move.\n\n");

//     CView.text("You give your sensitive member a few trembling, almost-painful strokes... maybe you overdid it a bit.  Shrugging, you gather your " + player.inventory.armor.displayName + " and leave the passed-out satyr behind as you go back to your camp.");
//     player.orgasm();
//     player.stats.lib += 1;
//     player.stats.sens += -5;

//     return { next: passTime(1) };
// }
