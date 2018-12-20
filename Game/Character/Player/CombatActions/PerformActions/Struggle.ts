import { Character } from 'Game/Character/Character';
import { CombatAction } from 'Game/Combat/Actions/CombatAction';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';
import { CView } from 'Page/ContentView';

export class Struggle extends CombatAction {
    public name = "Struggle";
    public type = CombatActionType.Attack;

    public use(character: Character, target: Character): void {
        CView.text("You struggle.");
    }
}
