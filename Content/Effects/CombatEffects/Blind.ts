import { Character } from 'Engine/Character/Character';
import { CharacterType } from 'Content/Character/CharacterType';
import { CView } from 'Engine/Display/ContentView';
import { EffectType } from 'Content/Effects/EffectType';
import { Effect } from 'Engine/Effects/Effect';

export class Blind extends Effect {
    public combatTurnStart(character: Character, enemy: Character) {
        const blindEffect = character.effects.getByName(EffectType.Blind)!;
        if (character.charType === CharacterType.Player && !enemy.effects.has(EffectType.Sandstorm)) {
            if (character.effects.has(EffectType.SheilaOil)) {
                if (blindEffect.values.expireCountdown <= 0) {
                    character.effects.removeByName(EffectType.Blind);
                    CView.text("<b>You finish wiping the demon's tainted oils away from your eyes; though the smell lingers, you can at least see.  Sheila actually seems happy to once again be under your gaze.</b>");
                }
                else {
                    blindEffect.values.expireCountdown--;
                    CView.text("<b>You scrub at the oily secretion with the back of your hand and wipe some of it away, but only smear the remainder out more thinly.  You can hear the demon giggling at your discomfort.</b>");
                }
            }
            else {
                // Remove blind if countdown to 0
                if (blindEffect.values.expireCountdown === 0) {
                    character.effects.removeByName(EffectType.Blind);
                    // Alert PC that blind is gone if no more stacks are there.
                    if (!character.effects.has(EffectType.Blind)) {
                        CView.text("<b>Your eyes have cleared and you are no longer blind!</b>");
                    }
                    else
                        CView.text("<b>You are blind, and many physical attacks will miss much more often.</b>");
                }
                else {
                    blindEffect.values.expireCountdown--;
                    CView.text("<b>You are blind, and many physical attacks will miss much more often.</b>");
                }
            }
        }
        else {
            blindEffect.values.expireCountdown -= 1;
            if (blindEffect.values.expireCountdown <= 0) {
                character.effects.removeByName(EffectType.Blind);
                CView.text("<b>" + character.desc.capitalA + character.desc.short + (character.desc.plural ? " are" : " is") + " no longer blind!</b>");
            }
            else
                CView.text("<b>" + character.desc.capitalA + character.desc.short + (character.desc.plural ? " are" : " is") + " currently blind!</b>");
        }
        CView.text("\n\n");
    }
}
