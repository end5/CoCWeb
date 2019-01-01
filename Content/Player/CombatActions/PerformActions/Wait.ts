import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { CView } from 'Engine/Display/ContentView';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export class Wait extends CombatAction {
    public name = "Wait";
    public type = CombatActionType.Wait;

    public use(): void {
        CView.clear();
        CView.text("You decide not to take any action this round.\n\n");
    }
}
