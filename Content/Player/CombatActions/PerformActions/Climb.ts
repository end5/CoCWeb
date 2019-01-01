import { EffectType } from 'Content/Effects/EffectType';
import { Character } from 'Engine/Character/Character';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';
import { CombatAction, CanUseResult } from 'Engine/Combat/Actions/CombatAction';

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
