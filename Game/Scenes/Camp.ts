import { Character } from 'Game/Character/Character';
import { playerMenu } from 'Game/Menus/InGame/PlayerMenu';
import { passTime } from "Game/Scenes/PassTime";
import { NextScreenChoices, ClickFunction, ScreenChoice, choiceWrap } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { numToCardinalText } from 'Game/Utilities/NumToText';
import { EffectType } from 'Game/Effects/EffectType';
import { Time } from 'Game/Utilities/Time';
import { ExgartuanFlags } from './NPCs/Exgartuan';
import { displayCharacterHPChange } from 'Game/Modifiers/StatModifier';
import { MinotaurCumFlags } from 'Game/Items/Consumables/MinotaurCum';
import { doExplore } from './Exploration';
import { masturbateMenu } from './Masturbate';
import { inventoryMenu } from 'Game/Menus/InGame/PlayerInventoryMenu';

//  SLEEP_WITH: number = 701;

export function camp(player: Character): NextScreenChoices {
    // Build explore menus
    let placesEvent: ClickFunction | undefined;
    let followers: ClickFunction | undefined;
    let lovers: ClickFunction | undefined;
    let slaves: ClickFunction | undefined;
    const storage: ClickFunction | undefined = undefined;

    // Build main menu
    let exploreEvent: ClickFunction | undefined = doExplore;
    const masturbate: ClickFunction | undefined = (player.stats.lust > 30 ? masturbateMenu : undefined);
    CView.clear();

    CView.image("camping");

    if (Time.day < 10) CView.text("Your campsite is fairly simple at the moment.  Your tent and bedroll are set in front of the rocks that lead to the portal.  You have a small fire pit as well.");
    else if (Time.day < 20) CView.text("Your campsite is starting to get a very 'lived-in' look.  The fire-pit is well defined with some rocks you've arranged around it, and your bedroll and tent have been set up in the area most sheltered by rocks.");
    else CView.text("Your new home is as comfy as a camp site can be.  The fire-pit and tent are both set up perfectly, and in good repair, and you've even managed to carve some artwork into the rocks around the camp's perimeter.");
    // Traps
    if (player.effects.has(EffectType.DefenseCanopy)) {
        CView.text("  A thorny tree has sprouted near the center of the camp, growing a protective canopy of spiky vines around the portal and your camp.");
    }
    else CView.text("  You have a number of traps surrounding your makeshift home, but they are fairly simple and may not do much to deter a demon.");
    CView.text("  The portal shimmers in the background as it always does, looking menacing and reminding you of why you came.\n\n");

    // The uber horny
    if (player.stats.lust >= 100) {
        CView.text("<b>You are debilitatingly aroused, and can think of doing nothing other than masturbating.</b>\n\n");
        exploreEvent = undefined;
        placesEvent = undefined;
    }
    let baitText: string = "Masturbate";
    if (((player.effects.has(EffectType.HistoryReligious) && player.stats.cor <= 66) ||
        (player.effects.has(EffectType.Enlightened) && player.stats.cor < 10)) &&
        !(ExgartuanFlags.LOCATION === 0 && ExgartuanFlags.SLEEP_COUNTER === 0)
    ) baitText = "Meditate";
    // Initialize companions/followers
    if (Time.hour > 4 && Time.hour < 23) {
        if (followersCount() > 0)
            followers = campFollowers;
        if (slavesCount() > 0)
            slaves = campSlavesMenu;
        if (loversCount() > 0)
            lovers = campLoversMenu;
    }
    let restEvent: ClickFunction | undefined = choiceWrap(doWait);
    let restName: string = "Wait";

    // Night
    if (Time.hour < 6 || Time.hour > 20) {
        CView.text("It is dark out, made worse by the lack of stars in the sky.  A blood-red moon hangs in the sky, seeming to watch you, but providing little light.  It's far too dark to leave camp.\n");
        restName = "Sleep";
        restEvent = choiceWrap(doSleep);
        exploreEvent = undefined;
        placesEvent = undefined;
    }
    // Day Time!
    else {
        CView.text("It's light outside, a good time to explore and forage for supplies with which to fortify your camp.\n");
        if (player.stats.fatigue > 40 || player.stats.HP / player.stats.maxHP() <= .9) {
            restName = "Rest";
            restEvent = choiceWrap(rest);
        }
    }

    return {
        choices: [
            ["Explore", exploreEvent],
            ["Places", placesEvent],
            ["Inventory", inventoryMenu],
            ["Stash", storage],
            ["Followers", followers],
            ["Lovers", lovers],
            ["Slaves", slaves],
            ["", undefined],
            [baitText, masturbate],
            [restName, restEvent]
        ]
    };
}

export function hasCompanions(): boolean {
    return companionsCount() > 0;
}

export function companionsCount(): number {
    return followersCount() + slavesCount() + loversCount();
}

export function followersCount(): number {
    const counter: number = 0;
    return counter;
}

export function slavesCount(): number {
    const counter: number = 0;
    return counter;
}

export function loversCount(): number {
    const counter: number = 0;
    return counter;
}

export function campLoversMenu(player: Character): NextScreenChoices {
    CView.clear();
    const choices: ScreenChoice[] = [];
    choices[9] = ["Back", playerMenu];

    return { choices };
}

export function campSlavesMenu(player: Character): NextScreenChoices {
    CView.clear();
    const choices: ScreenChoice[] = [];
    choices[9] = ["Back", playerMenu];

    return { choices };
}

export function campFollowers(player: Character): NextScreenChoices {
    CView.clear();
    const choices: ScreenChoice[] = [];
    choices[9] = ["Back", playerMenu];

    return { choices };
}

function rest(player: Character, hours: number = 0): NextScreenChoices {
    if (hours === 0) {
        CView.clear().text("You lie down to rest for four hours.\n");
        hours = 4;
        // REGULAR HP/FATIGUE RECOVERY
        displayCharacterHPChange(player, hours * 10);
        // fatigue
        player.stats.fatigue += -4 * hours;
        if (player.effects.has(EffectType.SpeedyRecovery)) player.stats.fatigue += -2 * hours;
    }
    else {
        if (hours !== 1) CView.clear().text("You continue to rest for " + numToCardinalText(hours) + " more hours.\n");
        else CView.clear().text("You continue to rest for another hour.\n");
    }
    return { next: passTime(hours) };
}

function doWait(player: Character, hours: number = 0): NextScreenChoices {
    if (hours === 0) {
        CView.text("You wait four hours...\n");
        hours = 4;
        // REGULAR HP/FATIGUE RECOVERY
        // fatigue
        player.stats.fatigue += -2 * hours;
        if (player.effects.has(EffectType.SpeedyRecovery)) player.stats.fatigue += -1 * hours;
    }
    else {
        if (hours !== 1) CView.text("You continue to wait for " + numToCardinalText(hours) + " more hours.\n");
        else CView.text("You continue to wait for another hour.\n");
    }
    return { next: passTime(hours) };
}

export function doSleep(player: Character, hours: number = 0): NextScreenChoices {
    if (hours === 0) {
        if (Time.hour === 21) hours = 9;
        if (Time.hour === 22) hours = 8;
        if (Time.hour >= 23) hours = 7;
        if (Time.hour === 0) hours = 6;
        if (Time.hour === 1) hours = 5;
        if (Time.hour === 2) hours = 4;
        if (Time.hour === 3) hours = 3;
        if (Time.hour === 4) hours = 2;
        if (Time.hour === 5) hours = 1;

        sleepRecovery(player, hours, true);
    }
    else {
        if (hours !== 1) CView.clear().text("You lie down to resume sleeping for the remaining " + numToCardinalText(hours) + " hours.\n");
        else CView.clear().text("You lie down to resume sleeping for the remaining hour.\n");
    }
    return { next: passTime(hours) };
}

// For shit that breaks normal sleep processing.
export function sleepWrapper(player: Character, hours: number): NextScreenChoices {
    if (Time.hour === 16) hours = 14;
    if (Time.hour === 17) hours = 13;
    if (Time.hour === 18) hours = 12;
    if (Time.hour === 19) hours = 11;
    if (Time.hour === 20) hours = 10;
    if (Time.hour === 21) hours = 9;
    if (Time.hour === 22) hours = 8;
    if (Time.hour >= 23) hours = 7;
    if (Time.hour === 0) hours = 6;
    if (Time.hour === 1) hours = 5;
    if (Time.hour === 2) hours = 4;
    if (Time.hour === 3) hours = 3;
    if (Time.hour === 4) hours = 2;
    if (Time.hour === 5) hours = 1;
    CView.clear();
    if (hours !== 1) CView.clear().text("You lie down to resume sleeping for the remaining " + numToCardinalText(hours) + " hours.\n");
    else CView.clear().text("You lie down to resume sleeping for the remaining hour.\n");
    sleepRecovery(player, hours, true);
    return { next: passTime(hours) };
}

export function sleepRecovery(player: Character, hours: number, display: boolean = false) {
    // Mino withdrawal
    if (MinotaurCumFlags.MINOTAUR_CUM_ADDICTION_STATE === 3) {
        if (display) CView.text("\nYou spend much of the night tossing and turning, aching for a taste of minotaur cum.\n");
        displayCharacterHPChange(player, hours * 15);
        player.stats.fatigue += -Math.floor(player.stats.fatigue / 2);
        if (player.effects.has(EffectType.SpeedyRecovery)) player.stats.fatigue += -Math.floor(player.stats.fatigue / 4);
    }
    // REGULAR HP/FATIGUE RECOVERY
    else {
        displayCharacterHPChange(player, hours * 20);
        // fatigue
        player.stats.fatigue += -player.stats.fatigue;
    }
}
