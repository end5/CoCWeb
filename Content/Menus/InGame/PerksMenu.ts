import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { NextScreenChoices, ScreenChoice } from 'Engine/Display/ScreenDisplay';
import { numToCardinalText } from 'Content/Utilities/NumToText';
import { CView } from 'Engine/Display/ContentView';
import { PlayerFlags } from 'Content/Player/PlayerFlags';
import { playerMenu } from './PlayerMenu';
import { perkUpMenu } from './PerkUpMenu';

export function perksMenu(character: Character): NextScreenChoices {
    CView.clear();
    for (const parks of character.effects) {
        CView.text("<b>" + parks.type + "</b>");
        CView.text(" - " + parks.desc.longDesc);
        CView.text("\n\n");
    }

    const choices: ScreenChoice[] = [["Next", playerMenu]];

    if (character.stats.perkPoints > 0) {
        CView.text("<b>You have " + numToCardinalText(character.stats.perkPoints) + " perk point");
        if (character.stats.perkPoints > 1) CView.text("s");
        CView.text(" to spend.</b>");
        choices.push(["Perk Up", perkUpMenu]);
    }
    if (character.effects.has(EffectType.DoubleAttack)) {
        CView.text("<b>You can adjust your double attack settings.</b>");
        choices.push(["Dbl Options", doubleAttackOptions]);
    }
    return { choices };
}

function doubleAttackOptions(): NextScreenChoices {
    CView.clear();
    const choices: ScreenChoice[] = [["All Double", doubleAttackForce], ["Dynamic", doubleAttackDynamic], ["Single", doubleAttackOff]];
    if (PlayerFlags.DOUBLE_ATTACK_STYLE === 0) {
        CView.text("You will currently always double attack in combat.  If your strength exceeds sixty, your double-attacks will be done at sixty strength in order to double-attack.");
        CView.text("\n\nYou can change it to double attack until sixty strength and then dynamicly switch to single attacks.");
        CView.text("\nYou can change it to always single attack.");
        choices[0][1] = undefined;
    }
    else if (PlayerFlags.DOUBLE_ATTACK_STYLE === 1) {
        CView.text("You will currently double attack until your strength exceeds sixty, and then single attack.");
        CView.text("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
        CView.text("\nYou can change it to always single attack.");
        choices[1][1] = undefined;
    }
    else {
        CView.text("You will always single attack your foes in combat.");
        CView.text("\n\nYou can choose to force double attacks at reduced strength (when over sixty, it makes attacks at a strength of sixty.");
        CView.text("\nYou can change it to double attack until sixty strength and then switch to single attacks.");
        choices[2][1] = undefined;
    }
    return { choices, persistantChoices: [["Back", perksMenu]] };
}

function doubleAttackForce(): NextScreenChoices {
    PlayerFlags.DOUBLE_ATTACK_STYLE = 0;
    return doubleAttackOptions();
}

function doubleAttackDynamic(): NextScreenChoices {
    PlayerFlags.DOUBLE_ATTACK_STYLE = 1;
    return doubleAttackOptions();
}

function doubleAttackOff(): NextScreenChoices {
    PlayerFlags.DOUBLE_ATTACK_STYLE = 2;
    return doubleAttackOptions();
}
