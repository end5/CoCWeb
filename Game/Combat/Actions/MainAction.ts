import { CombatAction } from './CombatAction';
import { BasicAttack } from './BasicAttack';
import { Character } from 'Game/Character/Character';
import { randomChoice } from 'Engine/Utilities/SMath';

export class MainAction extends CombatAction {
    public name: string = "Action";
    public subActions: CombatAction[] = [new BasicAttack()];
    public use(char: Character, enemy: Character): void {
        randomChoice((this.subActions.filter((subAction) => subAction.isPossible(char) && subAction.canUse(char, enemy).canUse))).use(char, enemy);
    }
}
