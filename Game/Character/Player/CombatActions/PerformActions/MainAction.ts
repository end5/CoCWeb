import { CombatAction, CanUseResult } from 'Game/Combat/Actions/CombatAction';
import { Character } from 'Game/Character/Character';
import { Approach } from './Approach';
import { Recover } from './Recover';
import { Squeeze } from './Squeeze';
// import { Struggle } from './Struggle';
import { Attack } from './Attack';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';

export class MainAction extends CombatAction {
    public name = "MainAction";
    public type = CombatActionType.Attack;

    private approach = new Approach();
    private recover = new Recover();
    private squeeze = new Squeeze();
    // private struggle = new Struggle();
    private attack = new Attack();

    public canUse(character: Character, target: Character): CanUseResult {
        if (this.approach.canUse(character, target).canUse) {
            this.name = this.approach.name;
        }
        else if (this.recover.canUse(character, target).canUse) {
            this.name = this.recover.name;
        }
        else if (this.squeeze.canUse(character, target).canUse) {
            this.name = this.squeeze.name;
        }
        // else if (this.struggle.canUse(character, target).canUse) {
        //     this.name = this.struggle.name;
        // }
        else {
            this.name = this.attack.name;
        }
        return super.canUse(character, target);
    }

    public use(character: Character, target: Character): void {
        if (this.approach.canUse(character, target).canUse) {
            this.approach.use(character, target);
        }
        else if (this.recover.canUse(character, target).canUse) {
            this.recover.use(character, target);
        }
        else if (this.squeeze.canUse(character, target).canUse) {
            this.squeeze.use(character, target);
        }
        // else if (this.struggle.canUse(character, target).canUse) {
        //     this.struggle.use(character, target);
        // }
        else {
            this.attack.use(character, target);
        }
    }
}
