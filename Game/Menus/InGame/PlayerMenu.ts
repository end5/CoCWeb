import { Character } from "../../Character/Character";

export function playerMenu(player: Character) {
    return { next: playerMenu };
}
