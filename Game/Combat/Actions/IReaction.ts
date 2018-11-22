import { Character } from "../../Character/Character";
import { IActionDamage } from "./CombatAction";

export interface IReaction {
    /**
     * Activated before the enemy's consumeComponents.
     * Return true to continue the enemy's action.
     * @param char The character this reaction belongs to
     * @param enemy The enemy. (Almost always Player)
     */
    beforeConsumeComponents?(char: Character, enemy: Character): boolean;
    /**
     * Activated before the enemy's useAction.
     * Return true to continue the enemy's action.
     * @param char The character this reaction belongs to
     * @param enemy The enemy. (Almost always Player)
     */
    beforeUseAction?(char: Character, enemy: Character): boolean;
    /**
     * Activated before the enemy's missed.
     * Return true to continue the enemy's action.
     * @param char The character this reaction belongs to
     * @param enemy The enemy. (Almost always Player)
     */
    beforeMissed?(char: Character, enemy: Character): boolean;
    /**
     * Activated before the enemy's applyDamage.
     * Return true to continue the enemy's action.
     * @param char The character this reaction belongs to
     * @param enemy The enemy. (Almost always Player)
     */
    beforeApplyDamage?(char: Character, enemy: Character, damage?: IActionDamage): IActionDamage & { continue?: boolean };
}
