import { Character } from '../../../Character';
import { AnemoneSting } from '../PhysicalAttacks/AnemoneSting';
import { Bite } from '../PhysicalAttacks/Bite';
import { Constrict } from '../PhysicalAttacks/Constrict';
import { Kick } from '../PhysicalAttacks/Kick';
import { Gore } from '../PhysicalAttacks/Gore';
import { randomChoice } from '../../../../../Engine/Utilities/SMath';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';

export class PhysicalSpecials extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.PhysSpec;
    public name: string = "P. Special";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [
        new AnemoneSting(),
        new Bite(),
        new Constrict(),
        new Kick(),
        new Gore(),
    ];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return !!this.subActions.find((action) => action.canUse(character, target));
    }

    public use(character: Character, target: Character): void {
        randomChoice(...this.subActions).use(character, target);
    }
}
