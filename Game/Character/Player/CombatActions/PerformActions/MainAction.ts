import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { Character } from '../../../Character';
import { Approach } from './Approach';
import { Recover } from './Recover';
import { Squeeze } from './Squeeze';
import { Struggle } from './Struggle';
import { Attack } from './Attack';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class MainAction extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Attack;
    public name: string = "MainAction";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];

    private approach = new Approach();
    private recover = new Recover();
    private squeeze = new Squeeze();
    private struggle = new Struggle();
    private attack = new Attack();

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        if (this.approach.canUse(character, target)) {
            this.name = this.approach.name;
        }
        else if (this.recover.canUse(character, target)) {
            this.name = this.recover.name;
        }
        else if (this.squeeze.canUse(character, target)) {
            this.name = this.squeeze.name;
        }
        else if (this.struggle.canUse(character, target)) {
            this.name = this.struggle.name;
        }
        else {
            this.name = this.attack.name;
        }
        return true;
    }

    public use(character: Character, target: Character): void {
        if (this.approach.canUse(character, target)) {
            this.approach.use(character, target);
        }
        else if (this.recover.canUse(character, target)) {
            this.recover.use(character, target);
        }
        else if (this.squeeze.canUse(character, target)) {
            this.squeeze.use(character, target);
        }
        else if (this.struggle.canUse(character, target)) {
            this.struggle.use(character, target);
        }
        else {
            this.attack.use(character, target);
        }
    }
}
