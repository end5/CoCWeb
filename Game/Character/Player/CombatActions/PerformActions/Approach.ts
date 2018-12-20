import { EffectType } from 'Game/Effects/EffectType';
import { Character } from 'Game/Character/Character';
import { CombatAction, CanUseResult } from 'Game/Combat/Actions/CombatAction';
import { CView } from 'Page/ContentView';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';

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
