import { Character } from 'Engine/Character/Character';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';
import { CView } from 'Engine/Display/ContentView';

export class Struggle extends CombatAction {
    public name = "Struggle";
    public type = CombatActionType.Attack;

    public use(character: Character, target: Character): void {
        CView.text("You struggle.");
    }
}
