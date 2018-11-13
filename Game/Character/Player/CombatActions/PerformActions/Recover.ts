import { Character } from '../../../Character';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Recover extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Attack;
    public name: string = "Recover";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return character.combat.effects.has(CombatEffectType.IsabellaStunned) ||
            character.combat.effects.has(CombatEffectType.Stunned) ||
            character.combat.effects.has(CombatEffectType.Whispered) ||
            character.combat.effects.has(CombatEffectType.Confusion);
    }

    public use(character: Character, target: Character): void {
        if (character.combat.effects.has(CombatEffectType.IsabellaStunned) || character.combat.effects.has(CombatEffectType.Stunned)) {
            CView.text("\n<b>You're too stunned to attack!</b>  All you can do is wait and try to recover!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.combat.effects.has(CombatEffectType.Whispered)) {
            CView.text("\n<b>Your mind is too addled to focus on combat!</b>  All you can do is try and recover!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
        else if (character.combat.effects.has(CombatEffectType.Confusion)) {
            CView.text("\nYou're too confused about who you are to try to attack!");
            // MainScreen.getBottomButton(0).modify("Recover", wait);
        }
    }
}
