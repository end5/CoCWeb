import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { Character } from '../../../Character';
import { Release } from './Release';
import { Run } from './Run';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class MoveAway implements CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.MoveAway;
    public name: string = "Flee";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];

    private release = new Release();
    private run = new Run();

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        if (target) {
            if (this.release.canUse(character, target)) {
                this.name = this.release.name;
            }
        }
        else {
            this.name = this.run.name;
        }
        return true;
    }

    public use(character: Character, target: Character): void {
        if (this.release.canUse(character, target)) {
            this.release.use(character, target);
        }
        else {
            this.run.use(character, target);
        }
    }
}
