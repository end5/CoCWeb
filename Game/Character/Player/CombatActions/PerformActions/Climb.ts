import { EffectType } from 'Game/Effects/EffectType';
import { Character } from 'Game/Character/Character';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';
import { CombatAction, CanUseResult } from 'Game/Combat/Actions/CombatAction';

export class Climb extends CombatAction {
    public name = "Climb";
    public flags = CombatActionType.Attack;

    public canUse(character: Character, target?: Character): CanUseResult {
        return { canUse: !!target && target.effects.has(EffectType.Level) };
    }

    public use(character: Character, target: Character): void {
        // if (monster.combat.effects.has(EffectType.Level)) {
        //     (monster as Sandtrap).sandTrapWait();
        // }
    }
}
