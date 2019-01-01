import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { SubAction } from 'Content/Combat/Actions/SubAction';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';
// import { AnemoneSting } from '../PhysicalAttacks/AnemoneSting';
// import { Bite } from '../PhysicalAttacks/Bite';
// import { Constrict } from '../PhysicalAttacks/Constrict';
// import { Kick } from '../PhysicalAttacks/Kick';
// import { Gore } from '../PhysicalAttacks/Gore';

export class PhysicalSpecials extends SubAction {
    public name = "P. Special";
    public type = CombatActionType.PhysSpec;

    public subActions: CombatAction[] = [
        // new AnemoneSting(),
        // new Bite(),
        // new Constrict(),
        // new Kick(),
        // new Gore(),
    ];
}
