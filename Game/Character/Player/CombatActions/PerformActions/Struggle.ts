import { Character } from '../../../Character';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CView } from '../../../../../Page/ContentView';

export class Struggle extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Attack;
    public name: string = "Struggle";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return false;
    }

    public use(character: Character, target: Character): void {
        CView.text("You struggle.");
    }
}
