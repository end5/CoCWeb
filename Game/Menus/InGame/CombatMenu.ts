import { Character } from 'Game/Character/Character';

export function combatMenu(player: Character) {
    return { next: combatMenu };
}
