import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { Character } from 'Engine/Character/Character';
import { playerMenu } from './PlayerMenu';
import { PlayerFlags } from 'Content/Player/PlayerFlags';
import { TamaniFlags } from 'Content/Scenes/Areas/Forest/TamaniScene';
import { EffectType } from 'Content/Effects/EffectType';
import { Cock } from 'Engine/Body/Cock';
import { MinotaurCumFlags } from 'Content/Items/Consumables/MinotaurCum';

export function statsMenu(player: Character): NextScreenChoices {
    // return stats(player);
    return displayStats(player);
}

// function menuChoices(player: Character, screen: (player: Character) => NextScreenChoices): NextScreenChoices {
//     const choices: ScreenChoice[] = [
//         ["Stats", stats],
//         ["Effects", effects],
//         ["Combat Stats", combatStats],
//     ].filter((choice) => choice[1] !== screen) as ScreenChoice[];

//     choices[choices.length - 1] = ["Back", playerMenu];
//     return { choices };
// }

// function combatStats(player: Character): NextScreenChoices {
//     CView.clear();
//     CView.text('<b><u>Combat Stats: </u></b>');
//     CView.text('Attack: ' + player.combat.attack());
//     CView.text('Defense: ' + player.combat.defense());
//     return menuChoices(player, combatStats);
// }

// function effects(player: Character): NextScreenChoices {
//     CView.clear();
//     CView.text('<b><u>Effects: </u></b>\n');
//     for (const effect of player.effects) {
//         CView.text('<b>' + effect.type + ' - ' + effect.desc.longDesc + '</b>: ');
//         CView.text(displayEffectValues(effect.values) + '\n');
//     }
//     return menuChoices(player, effects);
// }

// function displayEffectValues(values: EffectValues) {
//     return JSON.stringify(values)
//         .replace(/"multi":1,/g, "")
//         .replace(/"flat":0/g, "")
//         .replace(/"\w+":{},?/g, "")
//         .replace(/"\w+":{},?/g, "")
//         .replace(/"\w+":{},?/g, "")
//         .replace(/"\w+":0,?/g, "")
//         .replace(/:/g, ": ")
//         .replace(/,/g, "\n")
//         .replace(/{/g, "\n\t")
//         .replace(/}/g, "")
//         .replace(/"/g, "");
// }

// function stats(player: Character): NextScreenChoices {
//     CView.clear();
//     CView.text('<b><u>Stats: </u></b>');

//     CView.text("\nStrength: " + displayRangedStat(player.stats.base.str));
//     CView.text("\nToughness: " + displayRangedStat(player.stats.base.tou));
//     CView.text("\nSpeed: " + displayRangedStat(player.stats.base.spe));
//     CView.text("\nIntelligence: " + displayRangedStat(player.stats.base.int));
//     CView.text("\nLibido: " + displayRangedStat(player.stats.base.lib));
//     CView.text("\nSense: " + displayRangedStat(player.stats.base.sens));
//     CView.text("\nCorruption: " + displayRangedStat(player.stats.base.cor));
//     CView.text("\nFatigue: " + displayRangedStat(player.stats.base.fatigue));
//     CView.text("\nHP: " + displayRangedStat(player.stats.base.HP));
//     CView.text("\nLust: " + displayRangedStat(player.stats.base.lust));
//     CView.text("\nLust Vulnerability: " + player.stats.base.lustVuln);
//     CView.text("\nXP: " + displayStat(player.stats.base.XP));
//     CView.text("\nLevel: " + displayStat(player.stats.base.level));
//     CView.text("\nPerk Points: " + player.stats.base.perkPoints);
//     CView.text("\nTease XP: " + displayStat(player.stats.base.XP));
//     CView.text("\nTease Level: " + displayStat(player.stats.base.level));

//     return menuChoices(player, stats);
// }

// function displayStat(stat: Stat) {
//     return stat.raw + displayStatEffects(stat);
// }

// function displayStatEffects(stat: Stat) {
//     let out = '';

//     const multiEffects = stat.effects.filter((effect) => !!effect.multi && effect.multi !== 1).map((effect) => effect.multi);
//     if (multiEffects.length > 0) {
//         out += " * (" + multiEffects.toArray().join(" * ") + ")";
//     }

//     const flatEffects = stat.effects.filter((effect) => !!effect.flat && effect.flat !== 0).map((effect) => effect.flat);
//     if (flatEffects.length > 0) {
//         out += " + (" + flatEffects.toArray().join(" + ") + ")";
//     }

//     return out;
// }

// function surround(str: string) {
//     return str.indexOf(" ") !== -1 ? "(" + str + ")" : str;
// }

// function displayRangedStat(stat: RangedStat) {
//     return stat.value + "\n\t" +
//         surround(displayStat(stat.)) +
//         " < " +
//         surround(
//             surround(displayStat(stat.base)) +
//             " + " +
//             surround(displayStat(stat.delta)) +
//             displayStatEffects(stat.total)
//         ) +
//         " < " +
//         surround(displayStat(stat.max));
// }

function displayStats(player: Character): NextScreenChoices {
    CView.clear();

    // Begin Combat Stats
    let combatStats: string = "";

    combatStats += "<b>Lust Resistance:</b> " + (100 - Math.round(player.stats.lustPercent())) + "% (Higher is better.)\n";

    combatStats += "<b>Spell Effect Multiplier:</b> " + (100 * player.combat.spellMod()) + "%\n";

    // $> Figure out what to do with spellCost
    // combatStats += "<b>Spell Cost:</b> " + player.combat.spellCost(100) + "%\n";

    combatStats += "<b>Tease Skill (Out of 5):</b>  " + player.stats.teaseLevel + "\n";

    if (combatStats !== "")
        CView.text("<b><u>Combat Stats</u></b>\n" + combatStats);
    // End Combat Stats

    // Begin Children Stats
    let childStats: string = "";

    if (PlayerFlags.TIMES_GIVEN_BIRTH > 0)
        childStats += "<b>Times Given Birth:</b> " + PlayerFlags.TIMES_GIVEN_BIRTH + "\n";

    if (TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS > 0)
        childStats += "<b>Children With Tamani:</b> " + TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS + " (after all forms of natural selection)\n";

    if (childStats !== "")
        CView.text("\n<b><u>Children</u></b>\n" + childStats);
    // End Children Stats

    // Begin Body Stats
    let bodyStats: string = "";

    bodyStats += "<b>Anal Capacity:</b> " + Math.round(player.analCapacity()) + "\n";
    bodyStats += "<b>Anal Looseness:</b> " + Math.round(player.body.butt.looseness) + "\n";

    bodyStats += "<b>Fertility (Base) Rating:</b> " + Math.round(player.body.fertility) + "\n";
    bodyStats += "<b>Fertility (With Bonuses) Rating:</b> " + Math.round(player.totalFertility()) + "\n";

    if (player.cumQ() > 0)
        bodyStats += "<b>Cum Production:</b> " + Math.round(player.cumQ()) + "mL\n";
    if (player.lactationQ() > 0)
        bodyStats += "<b>Milk Production:</b> " + Math.round(player.lactationQ()) + "mL\n";

    bodyStats += "<b>Pregnancy Speed Multiplier:</b> ";
    let preg: number = 1;
    if (player.effects.has(EffectType.Diapause))
        bodyStats += "? (Variable due to Diapause)\n";
    else {
        if (player.effects.has(EffectType.MaraesGiftFertility)) preg++;
        if (player.effects.has(EffectType.BroodMother)) preg++;
        if (player.effects.has(EffectType.FerasBoonBreedingBitch)) preg++;
        if (player.effects.has(EffectType.MagicalFertility)) preg++;
        if (player.effects.has(EffectType.FerasBoonWideOpen) || player.effects.has(EffectType.FerasBoonMilkingTwat)) preg++;
        bodyStats += preg + "\n";
    }

    if (player.body.cocks.length > 0) {
        bodyStats += "<b>Total Cocks:</b> " + player.body.cocks.length + "\n";

        bodyStats += "<b>Total Cock Length:</b> " + Math.round(player.body.cocks.reduce(Cock.TotalLength, 0)) + " inches\n";
        bodyStats += "<b>Total Cock Girth:</b> " + Math.round(player.body.cocks.reduce(Cock.TotalThickness, 0)) + " inches\n";
    }

    if (player.body.vaginas.length > 0)
        bodyStats += "<b>Vaginal Capacity:</b> " + Math.round(player.vaginalCapacity()) + "\n" + "<b>Vaginal Looseness:</b> " + Math.round(player.body.vaginas.get(0)!.looseness) + "\n";

    if (player.effects.has(EffectType.SpiderOvipositor) || player.effects.has(EffectType.BeeOvipositor))
        bodyStats += "<b>Ovipositor Total Egg Count: " + player.body.ovipositor.eggs + "\nOvipositor Fertilized Egg Count: " + player.body.ovipositor.fertilizedEggs + "</b>\n";

    if (bodyStats !== "")
        CView.text("\n<b><u>Body Stats</u></b>\n" + bodyStats);
    // End Body Stats

    // Begin Misc Stats
    let miscStats: string = "";

    if (PlayerFlags.SPELLS_CAST > 0)
        miscStats += "<b>Spells Cast:</b> " + PlayerFlags.SPELLS_CAST + "\n";

    if (miscStats !== "")
        CView.text("\n<b><u>Miscellaneous Stats</u></b>\n" + miscStats);
    // End Misc Stats

    // Begin Addition Stats
    let addictStats: string = "";

    // Mino Cum Addiction
    if (MinotaurCumFlags.MINOTAUR_CUM_ADDICTION_STATE > 0 || MinotaurCumFlags.MINOTAUR_CUM_ADDICTION_TRACKER > 0 || player.effects.has(EffectType.MinotaurCumAddict)) {
        if (!player.effects.has(EffectType.MinotaurCumAddict))
            addictStats += "<b>Minotaur Cum:</b> " + Math.round(MinotaurCumFlags.MINOTAUR_CUM_ADDICTION_TRACKER * 10) / 10 + "%\n";
        else
            addictStats += "<b>Minotaur Cum:</b> 100+%\n";
    }

    if (addictStats !== "")
        CView.text("\n<b><u>Addictions</u></b>\n" + addictStats);
    // End Addition Stats

    // Begin Ongoing Stat Effects
    let statEffects: string = "";

    if (player.effects.has(EffectType.Heat))
        statEffects += "Heat - " + Math.round(player.effects.getByName(EffectType.Heat)!.values.expireCountdown) + " hours remaining\n";

    if (player.effects.has(EffectType.Rut))
        statEffects += "Rut - " + Math.round(player.effects.getByName(EffectType.Rut)!.values.expireCountdown) + " hours remaining\n";

    if (player.effects.getByName(EffectType.LustStick)!.values.expireCountdown > 0)
        statEffects += "Luststick - " + Math.round(player.effects.getByName(EffectType.LustStick)!.values.expireCountdown) + " hours remaining\n";

    if (player.effects.getByName(EffectType.BlackCatBeer)!.values.expireCountdown > 0)
        statEffects += "Black Cat Beer - " + player.effects.getByName(EffectType.BlackCatBeer)!.values.expireCountdown + " hours remaining (Lust resistance 20% lower, physical resistance 25% higher.)\n";

    if (statEffects !== "")
        CView.text("\n<b><u>Ongoing Status Effects</u></b>\n" + statEffects);
    // End Ongoing Stat Effects

    return { next: playerMenu };
}
