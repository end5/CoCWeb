import { MainScreen } from '../../../Page/MainScreen';
import { Character } from '../../Character/Character';
import { CombatManager } from '../../Combat/CombatManager';
import { clickFuncWrapper, NextScreenChoices, ClickFunction } from '../../ScreenDisplay';
import { townSquare } from '../../Scenes/TownSquare';
import { mainMenu } from '../MainMenu';
import { Time } from '../../Utilities/Time';
import { TimeManager } from '../../TimeManager';
import { levelUpMenu } from './LevelUpMenu';
import { perkUpMenu } from './PerkUpMenu';

export function playerMenu(character: Character): NextScreenChoices {
    // Safe guard against combat breaking
    if (CombatManager.inCombat && CombatManager.encounter && CombatManager.encounter.performTurnEnd) {
        return CombatManager.encounter.performTurnEnd();
    }

    MainScreen.topButtons.mainMenu.modify("Main Menu", clickFuncWrapper(mainMenu));
    MainScreen.topButtons.show();

    if (character.canLevelUp())
        MainScreen.topButtons.levelUp.modify("Level Up", clickFuncWrapper(levelUpMenu));
    else
        MainScreen.topButtons.levelUp.modify("Perk Up", clickFuncWrapper(perkUpMenu));

    return townSquare();
}

export function passTime(num: number): ClickFunction {
    return function passHour(char: Character) {
        Time.hour += num;
        TimeManager.update(num);
        return playerMenu(char);
    };
}
