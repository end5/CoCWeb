import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { CView } from '../../../Page/ContentView';

export class Blind extends CombatEffect {
    public update(character: Character, enemy: Character) {
        const blindEffect = character.combat.effects.get(CombatEffectType.Blind)!;
        if (character.charType === CharacterType.Player && !enemy.combat.effects.has(CombatEffectType.Sandstorm)) {
            if (character.combat.effects.has(CombatEffectType.SheilaOil)) {
                if (blindEffect.values.duration <= 0) {
                    character.combat.effects.remove(CombatEffectType.Blind);
                    CView.text("<b>You finish wiping the demon's tainted oils away from your eyes; though the smell lingers, you can at least see.  Sheila actually seems happy to once again be under your gaze.</b>");
                }
                else {
                    blindEffect.values.duration--;
                    CView.text("<b>You scrub at the oily secretion with the back of your hand and wipe some of it away, but only smear the remainder out more thinly.  You can hear the demon giggling at your discomfort.</b>");
                }
            }
            else {
                // Remove blind if countdown to 0
                if (blindEffect.values.duration === 0) {
                    character.combat.effects.remove(CombatEffectType.Blind);
                    // Alert PC that blind is gone if no more stacks are there.
                    if (!character.combat.effects.has(CombatEffectType.Blind)) {
                        CView.text("<b>Your eyes have cleared and you are no longer blind!</b>");
                    }
                    else
                        CView.text("<b>You are blind, and many physical attacks will miss much more often.</b>");
                }
                else {
                    blindEffect.values.duration--;
                    CView.text("<b>You are blind, and many physical attacks will miss much more often.</b>");
                }
            }
        }
        else {
            blindEffect.values.duration -= 1;
            if (blindEffect.values.duration <= 0) {
                character.combat.effects.remove(CombatEffectType.Blind);
                CView.text("<b>" + character.desc.capitalA + character.desc.short + (character.desc.plural ? " are" : " is") + " no longer blind!</b>");
            }
            else
                CView.text("<b>" + character.desc.capitalA + character.desc.short + (character.desc.plural ? " are" : " is") + " currently blind!</b>");
        }
        CView.text("\n\n");
    }
}
