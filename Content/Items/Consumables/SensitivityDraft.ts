import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';

export class SensitivityDraft extends Consumable {
    public constructor() {
        super(ConsumableName.SensitivityDraft, new ItemDesc("Sens. Draft", "a bottle of sensitivity draft", "This carefully labelled potion is a 'Sensitivity Draft', and if the diagrams are any indication, it will make your body more sensitive."), 15);
    }

    public use(character: Character) {
        CView.clear();
        CView.text("You pop the cork on this small vial and drink down the clear liquid.  It makes your lips and tongue tingle strangely, letting you feel each globule of spit in your mouth and each breath of air as it slides past your lips.");

        if (character.effects.has(EffectType.Dysfunction)) {
            CView.text("\n\nThankfully, the draft invigorates your groin, replacing the numbness with waves of raw sensation.  It seems your crotch is back to normal and <b>you can masturbate again!</b>");
            character.effects.removeByName(EffectType.Dysfunction);
        }
        if (randInt(4) === 0 && !character.effects.has(EffectType.LustyTongue)) {
            CView.text("The constant tingling in your mouth grows and grows, particularly around your lips, until they feel as sensitive as ");
            if (character.body.vaginas.length > 0) CView.text("your");
            else CView.text("a woman's");
            CView.text(" lower lips.  You'll have to be careful not to lick them!");
            // (Lustytongue status)
            character.effects.create(EffectType.LustyTongue, { expireCountdown: 25 });
        }
        CView.text("\n\nAfter the wave of sensation passes, your " + character.body.skin.desc + " feels a little more receptive to touch.  ");
        if (character.stats.lust > 70 || character.stats.lib > 70) {
            CView.text("You shiver and think of how much better it'll make sex and masturbation.");
        }
        else CView.text("You worry it'll make it harder to resist the attentions of a demon.");
        character.stats.sens += 10;
        character.stats.lust += 5;
    }
}
