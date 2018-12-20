import { CombatAction, CanUseResult } from 'Game/Combat/Actions/CombatAction';
import { EffectType } from 'Game/Effects/EffectType';
import { Character } from 'Game/Character/Character';
import { CView } from 'Page/ContentView';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';

export class Release extends CombatAction {
    public name = "Release";
    public type = CombatActionType.MoveAway;

    public canUse(character: Character, target: Character): CanUseResult {
        return { canUse: !!target && target.effects.has(EffectType.Constricted) };
    }

    public use(character: Character, target: Character): void {
        CView.clear();
        CView.text("You release " + target.desc.a + target.desc.short + " from " + target.desc.possessivePronoun + " bonds, and " + target.desc.subjectivePronoun + " drops to the ground, catching " + target.desc.possessivePronoun + " breath before " + target.desc.subjectivePronoun + " stands back up, apparently prepared to fight some more.");
        CView.text("\n\n");
        target.effects.removeByName(EffectType.Constricted);
    }
}
