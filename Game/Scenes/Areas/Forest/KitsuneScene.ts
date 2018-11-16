import { NextScreenChoices } from "../../../ScreenDisplay";
import { Character } from "../../../Character/Character";

export function kitsuneStatue(char: Character): NextScreenChoices {
    return { next: kitsuneStatue };
}
