import { NextScreenChoices, ScreenChoice } from '../../ScreenDisplay';
import { CView } from '../../../Page/ContentView';
import { Character } from '../../Character/Character';
import { playerMenu } from './PlayerMenu';
import { RangedStatWithEffects } from '../../Body/Stat/RangedStatWithEffects';
import { StatWithEffects } from '../../Body/Stat/StatWithEffects';

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
    CView.text('Attack: ' + player.combat.stats.attack(player));
    CView.text('Defense: ' + player.combat.stats.defense());
    return menuChoices(player, combatStats);
}

function effects(player: Character): NextScreenChoices {
    CView.clear();
    CView.text('<b><u>Effects: </u></b>');
    for (const effect of player.effects) {
        CView.text('<b>' + effect.desc.longDesc + '</b>: ');
        CView.text(effect.values.toString() + '\n');
    }
    return menuChoices(player, effects);
}

function stats(player: Character): NextScreenChoices {
    CView.clear();
    CView.text('<b><u>Stats: </u></b>\n');
    const playerStats: { [x: string]: StatWithEffects | RangedStatWithEffects | number } = {
        'Strength': player.stats.base.str,
        'Toughness': player.stats.base.tou,
        'Speed': player.stats.base.spe,
        'Intelligence': player.stats.base.int,
        'Libido': player.stats.base.lib,
        'Sense': player.stats.base.sens,
        'Corruption': player.stats.base.cor,
        'Fatigue': player.stats.base.fatigue,
        'HP': player.stats.base.HP,
        'Lust': player.stats.base.lust,
        'Lust Vulnerability': player.stats.base.lustVuln,
        'XP': player.stats.base.XP,
        'Level': player.stats.base.level,
        'Perk Points': player.stats.base.perkPoints,
        'Tease XP': player.stats.base.teaseXP,
        'Tease Level': player.stats.base.teaseLevel,
    };

    let stat: StatWithEffects | RangedStatWithEffects | number;
    for (const statKey of Object.keys(playerStats)) {
        stat = playerStats[statKey];
        if (typeof stat === 'number') {
            CView.text(statKey + ': ' + stat + '\n');
        }
        else {
            CView.text(statKey + ': ' + stat.value + '\n');
            for (const mod of player.stats.base.str.effects.entries()) {
                if (mod[1].toString() !== '')
                    CView.text('  ' + mod[0] + ': ' + mod[1].toString() + '\n');
            }
        }
    }
    return menuChoices(player, stats);
}
