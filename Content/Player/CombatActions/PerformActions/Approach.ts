import { EffectType } from 'Content/Effects/EffectType';
import { Character } from 'Engine/Character/Character';
import { CombatAction, CanUseResult } from 'Engine/Combat/Actions/CombatAction';
import { CView } from 'Engine/Display/ContentView';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export class Approach extends CombatAction {
    public name = "Approach";
    public type = CombatActionType.Attack;

    public canUse(character: Character, target: Character): CanUseResult {
        return { canUse: character.effects.has(EffectType.KnockedBack) };
    }

    public useAction(character: Character, target: Character): void {
        CView.clear();
        CView.text("You close the distance between you and " + target.desc.a + target.desc.short + " as quickly as possible.\n\n");
        character.effects.removeByName(EffectType.KnockedBack);
    }
}
