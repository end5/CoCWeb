import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { TamaniFlags, encounterTamani } from './Forest/TamaniScene';
import { randInt } from 'Engine/Utilities/SMath';
import { TamanisDaughtersFlags, encounterTamanisDaughters } from './Forest/TamanisDaughtersScene';
import { ErlKingFlags, encounterWildHunt } from './Forest/ErlKingScene';
import { encounterFaerie } from './Forest/Faerie';
import { TentacleBeastFlags, encounter } from './Forest/TentacleBeastScene';
import { GiacomoFlags } from './BeyondCamp/Giacomo';
import { CView } from 'Page/ContentView';
import { passTime } from '../PassTime';
import { intro } from './Forest/CorruptedGlade';
import { supahAkabalEdition } from './Forest/AkbalScenes';
import { kitsuneShrine, enterTheTrickster } from './Forest/KitsuneScene';

export const DeepwoodsFlags = Flags.register("Deepwoods", {
    TIMES_EXPLORED: 0,
});

export function exploreDeepwoods(player: Character): NextScreenChoices {
    DeepwoodsFlags.TIMES_EXPLORED++;

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
    if (TamaniFlags.TAMANI_TIME_OUT === 0 && randInt(5) === 0 && player.gender > 0 && (player.body.cocks.length > 0 || !TamaniFlags.DELUXE_DILDO)) {
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
        if (GiacomoFlags.DangerousPlants && player.stats.int / 2 > randInt(50)) {
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
