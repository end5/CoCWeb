import { NextScreenChoices, ScreenChoice } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { Character } from 'Game/Character/Character';
import { playerMenu } from './PlayerMenu';
import { Stat } from 'Game/Character/Stats/Stat/Stat';
import { RangedStat } from 'Game/Character/Stats/Stat/RangedStat';
import { Effect } from 'Game/Effects/Effect';
import { EffectValues } from 'Game/Effects/EffectValues';
import { RangedStatEffect } from 'Game/Character/Stats/Stat/RangedStatEffect';

export function statsMenu(player: Character): NextScreenChoices {
    return stats(player);
}

function menuChoices(player: Character, screen: (player: Character) => NextScreenChoices): NextScreenChoices {
    const choices: ScreenChoice[] = [
        ["Stats", stats],
        ["Effects", effects],
        ["Combat Stats", combatStats],
    ].filter((choice) => choice[1] !== screen) as ScreenChoice[];

    choices[choices.length - 1] = ["Back", playerMenu];
    return { choices };
}

function combatStats(player: Character): NextScreenChoices {
    CView.clear();
    CView.text('<b><u>Combat Stats: </u></b>');
    CView.text('Attack: ' + player.combat.attack());
    CView.text('Defense: ' + player.combat.defense());
    return menuChoices(player, combatStats);
}

function effects(player: Character): NextScreenChoices {
    CView.clear();
    CView.text('<b><u>Effects: </u></b>\n');
    for (const effect of player.effects) {
        CView.text('<b>' + effect.type + ' - ' + effect.desc.longDesc + '</b>: ');
        CView.text(displayEffectValues(effect.values) + '\n');
    }
    return menuChoices(player, effects);
}

function displayEffectValues(values: EffectValues) {
    return JSON.stringify(values)
        .replace(/"multi":1,/g, "")
        .replace(/"flat":0/g, "")
        .replace(/"\w+":{},?/g, "")
        .replace(/"\w+":{},?/g, "")
        .replace(/"\w+":{},?/g, "")
        .replace(/"\w+":0,?/g, "")
        .replace(/:/g, ": ")
        .replace(/,/g, "\n")
        .replace(/{/g, "\n\t")
        .replace(/}/g, "")
        .replace(/"/g, "");
}

function stats(player: Character): NextScreenChoices {
    CView.clear();
    CView.text('<b><u>Stats: </u></b>');

    CView.text("\nStrength: " + displayRangedStat(player.stats.core.str));
    CView.text("\nToughness: " + displayRangedStat(player.stats.core.tou));
    CView.text("\nSpeed: " + displayRangedStat(player.stats.core.spe));
    CView.text("\nIntelligence: " + displayRangedStat(player.stats.core.int));
    CView.text("\nLibido: " + displayRangedStat(player.stats.core.lib));
    CView.text("\nSense: " + displayRangedStat(player.stats.core.sens));
    CView.text("\nCorruption: " + displayRangedStat(player.stats.core.cor));
    CView.text("\nFatigue: " + displayRangedStat(player.stats.core.fatigue));
    CView.text("\nHP: " + displayRangedStat(player.stats.core.HP));
    CView.text("\nLust: " + displayRangedStat(player.stats.core.lust));
    CView.text("\nLust Vulnerability: " + player.stats.core.lustVuln);
    CView.text("\nXP: " + displayStat(player.stats.core.XP));
    CView.text("\nLevel: " + displayStat(player.stats.core.level));
    CView.text("\nPerk Points: " + player.stats.core.perkPoints);
    CView.text("\nTease XP: " + displayStat(player.stats.core.XP));
    CView.text("\nTease Level: " + displayStat(player.stats.core.level));

    return menuChoices(player, stats);
}

function displayStat(stat: Stat) {
    return stat.raw + displayStatEffects(stat);
}

function displayStatEffects(stat: Stat) {
    let out = '';

    const multiEffects = stat.effects.filter((effect) => !!effect.multi && effect.multi !== 1).map((effect) => effect.multi);
    if (multiEffects.length > 0) {
        out += " * (" + multiEffects.toArray().join(" * ") + ")";
    }

    const flatEffects = stat.effects.filter((effect) => !!effect.flat && effect.flat !== 0).map((effect) => effect.flat);
    if (flatEffects.length > 0) {
        out += " + (" + flatEffects.toArray().join(" + ") + ")";
    }

    return out;
}

function surround(str: string) {
    return str.indexOf(" ") !== -1 ? "(" + str + ")" : str;
}

function displayRangedStat(stat: RangedStat) {
    return stat.total.calculated + "\n\t" +
        surround(displayStat(stat.min)) +
        " < " +
        surround(
            surround(displayStat(stat.base)) +
            " + " +
            surround(displayStat(stat.delta)) +
            displayStatEffects(stat.total)
        ) +
        " < " +
        surround(displayStat(stat.max));
}
