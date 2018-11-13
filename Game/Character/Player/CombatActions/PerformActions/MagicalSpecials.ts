import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { Character } from '../../../Character';
import { Berserk } from '../MagicalAttacks/Berserk';
import { DragonBreath } from '../MagicalAttacks/DragonBreath';
import { Fireball } from '../MagicalAttacks/Fireball';
import { CorruptedFoxFire } from '../MagicalAttacks/CorruptedFoxFire';
import { KitsuneTerror } from '../MagicalAttacks/KitsuneTerror';
import { FoxFire } from '../MagicalAttacks/FoxFire';
import { randomChoice } from '../../../../../Engine/Utilities/SMath';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';

export class MagicalSpecials extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "M. Specials";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [
        new Berserk(),
        new DragonBreath(),
        new Fireball(),
        new CorruptedFoxFire(),
        new KitsuneTerror(),
        new FoxFire(),
        new KitsuneTerror(),
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
