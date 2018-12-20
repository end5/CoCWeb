import { CombatAction } from 'Game/Combat/Actions/CombatAction';
import { CView } from 'Page/ContentView';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';

export class Wait extends CombatAction {
    public name = "Wait";
    public type = CombatActionType.Wait;

    public use(): void {
        CView.clear();
        CView.text("You decide not to take any action this round.\n\n");
    }
}
