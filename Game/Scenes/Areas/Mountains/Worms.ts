import { NextScreenChoices } from 'Game/ScreenDisplay';
import { playerMenu } from 'Game/Menus/InGame/PlayerMenu';
import { Character } from 'Game/Character/Character';

export function infestOrgasm(player: Character): NextScreenChoices {
    return { next: playerMenu };
}
