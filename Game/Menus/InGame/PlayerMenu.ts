import { MainScreen } from 'Page/MainScreen';
import { Character } from 'Game/Character/Character';
import { CombatManager } from 'Game/Combat/CombatManager';
import { clickFuncWrapper, NextScreenChoices } from 'Game/ScreenDisplay';
import { mainMenu } from '../MainMenu';
import { levelUpMenu } from './LevelUpMenu';
import { perkUpMenu } from './PerkUpMenu';
import { ItemsOnFloor } from 'Game/Scenes/ItemsOnFloor';
import { camp } from 'Game/Scenes/Camp';

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

    for (const item of ItemsOnFloor)
        character.inventory.items.addItem(character, item, playerMenu);

    return camp(character);
}
