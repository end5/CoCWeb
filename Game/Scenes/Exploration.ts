import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices, ScreenChoice } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { playerMenu } from 'Game/Menus/InGame/PlayerMenu';
import { randInt } from 'Engine/Utilities/SMath';
import { passTime } from './PassTime';
import { LegType } from 'Game/Character/Body/Legs';
import { SpriteName } from 'Page/SpriteName';
import { CombatManager } from 'Game/Combat/CombatManager';
import { Imp } from './Areas/BeyondCamp/Imp';
import { mf } from 'Game/Descriptors/GenderDescriptor';
import { Goblin } from './Areas/BeyondCamp/Goblin';
import { ForestFlags, exploreForest } from './Areas/Forest';
import { DesertFlags, exploreDesert } from './Areas/Desert';
import { LakeFlags, exploreLake } from './Areas/Lake';
import { PlainsFlags, explorePlains } from './Areas/Plains';
import { MountainsFlags as MountainFlags, exploreMountain } from './Areas/Mountains';
import { HighMountainFlags, exploreHighMountain } from './Areas/HighMountain';
import { BogFlags, exploreBog } from './Areas/Bog';
import { SwampFlags, exploreSwamp } from './Areas/Swamp';
import { impLordEncounter } from './Areas/BeyondCamp/ImpLordScene';
import { DeepwoodsFlags, exploreDeepwoods } from './Areas/Deepwoods';

export const ExplorationFlags = Flags.register("Exploration", {
    BEYOND_CAMP: 0
});
/**
 * Created by aimozg on 05.01.14.
 */

// const MET_OTTERGIRL: number = 777;
// const HAS_SEEN_MINO_AND_COWGIRL: number = 892;
// const EXPLORATION_PAGE: number = 1015;
// const BOG_EXPLORED: number = 1016;
export function doExplore(player: Character): NextScreenChoices {
    CView.clear();
    if (ExplorationFlags.BEYOND_CAMP === 0) {
        CView.text("You tentatively step away from your campsite, alert and scanning the ground and sky for danger.  You walk for the better part of an hour, marking the rocks you pass for a return trip to your camp.  It worries you that the portal has an opening on this side, and it was totally unguarded...\n\n...Wait a second, why is your campsite in front of you? The portal's glow is clearly visible from inside the tall rock formation.   Looking carefully you see your footprints leaving the opposite side of your camp, then disappearing.  You look back the way you came and see your markings vanish before your eyes.  The implications boggle your mind as you do your best to mull over them.  Distance, direction, and geography seem to have little meaning here, yet your campsite remains exactly as you left it.  A few things click into place as you realize you found your way back just as you were mentally picturing the portal!  Perhaps memory influences travel here, just like time, distance, and speed would in the real world!\n\nThis won't help at all with finding new places, but at least you can get back to camp quickly.  You are determined to stay focused the next time you explore and learn how to traverse this gods-forsaken realm.");
        ExplorationFlags.BEYOND_CAMP++;
        return { next: passTime(1) };
    }
    else if (ExplorationFlags.BEYOND_CAMP === 1) {
        CView.text("You walk for quite some time, roaming the hard-packed and pink-tinged earth of the demon-realm.  Rust-red rocks speckle the wasteland, as barren and lifeless as anywhere else you've been.  A cool breeze suddenly brushes against your face, as if gracing you with its presence.  You turn towards it and are confronted by the lush foliage of a very old looking forest.  You smile as the plants look fairly familiar and non-threatening.  Unbidden, you remember your decision to test the properties of this place, and think of your campsite as you walk forward.  Reality seems to shift and blur, making you dizzy, but after a few minutes you're back, and sure you'll be able to return to the forest with similar speed.\n\n<b>You have discovered the Forest!</b>");
        ExplorationFlags.BEYOND_CAMP++;
        ForestFlags.TIMES_EXPLORED++;
        return { next: passTime(1) };
    }
    else if (ExplorationFlags.BEYOND_CAMP > 1)
        CView.text("You can continue to search for new locations, or explore your previously discovered locations.");

    const choices: ScreenChoice[] = [];
    choices.push(["Explore", tryDiscover]);
    if (DesertFlags.TIMES_EXPLORED > 0) choices.push(["Desert", exploreDesert]);
    if (ForestFlags.TIMES_EXPLORED > 0) choices.push(["Forest", exploreForest]);
    if (LakeFlags.TIMES_EXPLORED > 0) choices.push(["Lake", exploreLake]);
    if (PlainsFlags.TIMES_EXPLORED > 0) choices.push(["Plains", explorePlains]);
    if (SwampFlags.TIMES_EXPLORED > 0) choices.push(["Swamp", exploreSwamp]);
    if (DeepwoodsFlags.TIMES_EXPLORED) choices.push(["Deepwoods", exploreDeepwoods]);
    if (MountainFlags.TIMES_EXPLORED > 0) choices.push(["Mountain", exploreMountain]);
    if (HighMountainFlags.TIMES_EXPLORED > 0) choices.push(["High Mountain", exploreHighMountain]);
    if (BogFlags.TIMES_EXPLORED > 0) choices.push(["Bog", exploreBog]);

    return { choices, persistantChoices: [["Back", playerMenu]] };
}

// Try to find a new location - called from doExplore once the first location is found
export function tryDiscover(player: Character): NextScreenChoices {
    if (LakeFlags.TIMES_EXPLORED === 0) {
        CView.text("Your wanderings take you far and wide across the barren wasteland that surrounds the portal, until the smell of humidity and fresh water alerts you to the nearby lake.  With a few quick strides you find a lake so massive the distant shore cannot be seen.  Grass and a few sparse trees grow all around it.\n\n<b>You have discovered the Lake!</b>");
        LakeFlags.TIMES_EXPLORED = 1;
        ExplorationFlags.BEYOND_CAMP++;
        return { next: passTime(1) };
    }
    if (LakeFlags.TIMES_EXPLORED >= 1 && randInt(3) === 0 && DesertFlags.TIMES_EXPLORED === 0) {
        CView.text("You stumble as the ground shifts a bit underneath you.  Groaning in frustration, you straighten up and discover the rough feeling of sand ");
        if (player.body.legs.type === LegType.HUMAN) CView.text("inside your footwear, between your toes");
        if (player.body.legs.type === LegType.HOOFED) CView.text("in your hooves");
        if (player.body.legs.type === LegType.DOG) CView.text("in your paws");
        if (player.body.legs.type === LegType.NAGA) CView.text("in your scales");
        CView.text(".\n\n<b>You've discovered the Desert!</b>");
        DesertFlags.TIMES_EXPLORED = 1;
        ExplorationFlags.BEYOND_CAMP++;
        return { next: passTime(1) };
    }
    if (DesertFlags.TIMES_EXPLORED >= 1 && randInt(3) === 0 && MountainFlags.TIMES_EXPLORED === 0) {
        CView.text("Thunder booms overhead, shaking you out of your thoughts.  High above, dark clouds encircle a distant mountain peak.  You get an ominous feeling in your gut as you gaze up at it.\n\n<b>You have discovered the mountain!</b>");
        ExplorationFlags.BEYOND_CAMP++;
        MountainFlags.TIMES_EXPLORED = 1;
        return { next: passTime(1) };
    }
    if (MountainFlags.TIMES_EXPLORED >= 1 && randInt(3) === 0 && PlainsFlags.TIMES_EXPLORED === 0) {
        PlainsFlags.TIMES_EXPLORED = 1;
        ExplorationFlags.BEYOND_CAMP++;
        CView.text("You find yourself standing in knee-high grass, surrounded by flat plains on all sides.  Though the mountain, forest, and lake are all visible from here, they seem quite distant.\n\n<b>You've discovered the plains!</b>");
        return { next: passTime(1) };
    }
    // EXPLOOOOOOORE
    if (SwampFlags.TIMES_EXPLORED === 0 && PlainsFlags.TIMES_EXPLORED > 0 && randInt(3) === 0) {
        SwampFlags.TIMES_EXPLORED = 1;
        ExplorationFlags.BEYOND_CAMP++;

        CView.text("All things considered, you decide you wouldn't mind a change of scenery.  Gathering up your belongings, you begin a journey into the wasteland.  The journey begins in high spirits, and you whistle a little traveling tune to pass the time.  After an hour of wandering, however, your wanderlust begins to whittle away.  Another half-hour ticks by.  Fed up with the fruitless exploration, you're nearly about to head back to camp when a faint light flits across your vision.  Startled, you whirl about to take in three luminous will-o'-the-wisps, swirling around each other whimsically.  As you watch, the three ghostly lights begin to move off, and though the thought of a trap crosses your mind, you decide to follow.\n\n");
        CView.text("Before long, you start to detect traces of change in the environment.  The most immediate difference is the increasingly sweltering heat.  A few minutes pass, then the will-o'-the-wisps plunge into the boundaries of a dark, murky, stagnant swamp; after a steadying breath you follow them into the bog.  Once within, however, the gaseous balls float off in different directions, causing you to lose track of them.  You sigh resignedly and retrace your steps, satisfied with your discovery.  Further exploration can wait.  For now, your camp is waiting.\n\n");
        CView.text("<b>You've discovered the swamp!</b>");
        return { next: passTime(2) };
    }

    ExplorationFlags.BEYOND_CAMP++;
    // Used for chosing 'repeat' encounters.
    if (randInt(2) === 0) {
        const impGob: number = 5;
        // Imptacular Encounter
        if (randInt(10) < impGob) {
            if (player.stats.level >= 8 && randInt(2) === 0) {
                return impLordEncounter(player);
            }
            else {
                CView.text("An imp wings out of the sky and attacks!");
                CView.sprite(SpriteName.Imp); // 29;
                return CombatManager.beginBattle(player, new Imp());
            }
        }
        // Encounter Gobbalin!
        else {
            if (player.gender > 0) {
                CView.text("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fucked, " + mf(player, "stud", "slut"));
                CView.text(".</i>\"");
                CView.sprite(SpriteName.Goblin); // 24;
                return CombatManager.beginBattle(player, new Goblin());
            }
            else {
                CView.text("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fuc-oh shit, you don't even have anything to play with!  This is for wasting my time!");
                CView.text("</i>\"");
                CView.sprite(SpriteName.Goblin); // 24;
                return CombatManager.beginBattle(player, new Goblin());
            }
        }
    }
    else {
        CView.text("You wander around, fruitlessly searching for new places.");
        return { next: passTime(1) };
    }
}
