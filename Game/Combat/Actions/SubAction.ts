import { CombatAction, CanUseResult } from 'Game/Combat/Actions/CombatAction';
import { Character } from 'Game/Character/Character';
import { randomChoice } from 'Engine/Utilities/SMath';

export abstract class SubAction extends CombatAction {
    public canUse(character: Character, target: Character): CanUseResult {
        return { canUse: !!this.subActions.find((action) => action.canUse(character, target).canUse) };
    }

    public use(character: Character, target: Character): void {
        randomChoice(this.subActions).use(character, target);
    }
}
