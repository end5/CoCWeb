import { CombatAction, CanUseResult } from 'Game/Combat/Actions/CombatAction';
import { Character } from 'Game/Character/Character';
import { Release } from './Release';
import { Run } from './Run';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';

export class MoveAway extends CombatAction {
    public name = "Flee";
    public type = CombatActionType.MoveAway;

    private release = new Release();
    private run = new Run();

    public canUse(character: Character, target: Character): CanUseResult {
        if (target) {
            if (this.release.canUse(character, target).canUse) {
                this.name = this.release.name;
            }
        }
        else {
            this.name = this.run.name;
        }
        return super.canUse(character, target);
    }

    public use(character: Character, target: Character): void {
        if (this.release.canUse(character, target).canUse) {
            this.release.use(character, target);
        }
        else {
            this.run.use(character, target);
        }
    }
}
