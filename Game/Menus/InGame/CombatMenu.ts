import { Character } from "../../Character/Character";

export function combatMenu(player: Character) {
    return { next: combatMenu };
}
