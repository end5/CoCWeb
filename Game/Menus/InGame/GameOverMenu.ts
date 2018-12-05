import { NextScreenChoices } from 'Game/ScreenDisplay';
import { Character } from 'Game/Character/Character';
import { mainMenu } from '../MainMenu';

export function gameOverMenu(player: Character): NextScreenChoices {
    return {
        next: mainMenu
    };
}
