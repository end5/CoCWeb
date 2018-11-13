import { Character } from "../../Character/Character";
import { IActionDamage } from "./CombatAction";

export interface IReaction {
    beforeConsumeComponents?(char: Character, enemy: Character): boolean;
    beforeUseAction?(char: Character, enemy: Character): boolean;
    beforeMissed?(char: Character, enemy: Character): boolean;
    beforeApplyDamage?(char: Character, enemy: Character, damage?: IActionDamage): IActionDamage & { continue?: boolean };
}
