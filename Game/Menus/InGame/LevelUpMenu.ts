import { MainScreen } from 'Page/MainScreen';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { playerMenu } from './PlayerMenu';
import { perkUpMenu } from './PerkUpMenu';

export function levelUpMenu(character: Character): NextScreenChoices {
    CView.clear();
    MainScreen.topButtons.hide();
    if (character.canLevelUp()) {
        MainScreen.levelupIcon.hide();
        character.stats.level++;
        character.stats.perkPoints++;
        CView.text("<b>You are now level " + character.stats.level + "!</b>\n\nYou may now apply +5 to one attribute.  Which will you choose?");
        character.stats.XP -= (character.stats.level - 1) * 100;
        return {
            choices: [
                ["Strength", levelUpStatStrength], ["Toughness", levelUpStatToughness], ["Speed", levelUpStatSpeed], ["Intelligence", levelUpStatIntelligence],
            ]
        };
    }
    else if (character.stats.perkPoints > 0) {
        return perkUpMenu(character);
    }
    return { next: playerMenu };
}

function levelUpStatStrength(character: Character): NextScreenChoices {
    character.stats.str += 5; // Gain +5 Str due to level
    CView.clear();
    CView.text("Your muscles feel significantly stronger from your time adventuring.");
    return { next: perkUpMenu };
}

function levelUpStatToughness(character: Character): NextScreenChoices {
    character.stats.tou += 5; // Gain +5 Toughness due to level
    CView.clear();
    CView.text("You feel tougher from all the fights you have endured.");
    return { next: perkUpMenu };
}

function levelUpStatSpeed(character: Character): NextScreenChoices {
    character.stats.spe += 5; // Gain +5 speed due to level
    CView.clear();
    CView.text("Your time in combat has driven you to move faster.");
    return { next: perkUpMenu };
}

function levelUpStatIntelligence(character: Character): NextScreenChoices {
    character.stats.int += 5; // Gain +5 Intelligence due to level
    CView.clear();
    CView.text("Your time spent fighting the creatures of this realm has sharpened your wit.");
    return { next: perkUpMenu };
}
