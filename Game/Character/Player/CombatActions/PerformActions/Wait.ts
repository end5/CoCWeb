import { Character } from '../../../Character';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class Wait extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Wait;
    public name: string = "Wait";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return true;
    }

    public use(character: Character, target: Character): void {
        CView.clear();
        CView.text("You decide not to take any action this round.\n\n");
    }
}
