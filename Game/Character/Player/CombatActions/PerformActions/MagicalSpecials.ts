import { CombatAction } from 'Game/Combat/Actions/CombatAction';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';
import { SubAction } from 'Game/Combat/Actions/SubAction';
// import { Berserk } from '../MagicalAttacks/Berserk';
// import { DragonBreath } from '../MagicalAttacks/DragonBreath';
// import { Fireball } from '../MagicalAttacks/Fireball';
// import { CorruptedFoxFire } from '../MagicalAttacks/CorruptedFoxFire';
// import { KitsuneTerror } from '../MagicalAttacks/KitsuneTerror';
// import { FoxFire } from '../MagicalAttacks/FoxFire';

export class MagicalSpecials extends SubAction {
    public name = "M. Specials";
    public type = CombatActionType.MagicSpec;

    public subActions: CombatAction[] = [
        // new Berserk(),
        // new DragonBreath(),
        // new Fireball(),
        // new CorruptedFoxFire(),
        // new KitsuneTerror(),
        // new FoxFire(),
        // new KitsuneTerror(),
    ];
}
