import { Character } from 'Engine/Character/Character';
import { CombatAction, CanUseResult } from 'Engine/Combat/Actions/CombatAction';
import { CView } from 'Engine/Display/ContentView';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';
import { EffectType } from 'Content/Effects/EffectType';

export class Recover extends CombatAction {
    public name = "Recover";
    public type = CombatActionType.Attack;

    public canUse(character: Character, target: Character): CanUseResult {
        return { canUse: character.effects.has(EffectType.IsabellaStunned) ||
            character.effects.has(EffectType.Stunned) ||
            character.effects.has(EffectType.Whispered) ||
            character.effects.has(EffectType.Confusion) };
    }

    public use(character: Character, target: Character): void {
        if (character.effects.has(EffectType.IsabellaStunned) || character.effects.has(EffectType.Stunned)) {
            CView.text("\n<b>You're too stunned to attack!</b>  All you can do is wait and try to recover!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.effects.has(EffectType.Whispered)) {
            CView.text("\n<b>Your mind is too addled to focus on combat!</b>  All you can do is try and recover!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.effects.has(EffectType.Confusion)) {
            CView.text("\nYou're too confused about who you are to try to attack!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
    }
}
