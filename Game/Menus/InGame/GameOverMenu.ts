import { NextScreenChoices } from "../../ScreenDisplay";
import { Character } from "../../Character/Character";
import { mainMenu } from "../MainMenu";

export function gameOverMenu(player: Character): NextScreenChoices {
    return {
        next: mainMenu
    };
}
