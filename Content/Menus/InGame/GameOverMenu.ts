import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { Character } from 'Engine/Character/Character';
import { mainMenu } from '../MainMenu';

export function gameOverMenu(player: Character): NextScreenChoices {
    return {
        next: mainMenu
    };
}
