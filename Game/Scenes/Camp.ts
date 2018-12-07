import { Character } from 'Game/Character/Character';
import { playerMenu } from 'Game/Menus/InGame/PlayerMenu';
import { NextScreenChoices } from 'Game/ScreenDisplay';

export function camp(char: Character): NextScreenChoices {
    return { next: playerMenu };
}
