import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { SkinType } from 'Engine/Body/Skin';
import { Character } from 'Engine/Character/Character';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';
import { growCock, displayLengthChange } from 'Content/Modifiers/CockModifier';
import { displayCharacterHPChange } from 'Content/Modifiers/StatModifier';

export class ImpFood extends Consumable {
    public constructor() {
        super(ConsumableName.ImpFood, new ItemDesc("ImpFood", "a parcel of imp food", "This is a small parcel of reddish-brown bread stuffed with some kind of meat.  It smells delicious."));
    }

    public use(character: Character) {
        CView.clear();
        if (character.body.cocks.length > 0) {
            CView.text("The food tastes strange and corrupt - you can't really think of a better word for it, but it's unclean.");
            if (character.body.cocks.get(0)!.length < 12) {
                const growthAmount = growCock(character, character.body.cocks.get(0)!, randInt(2) + 2);
                CView.text("\n\n");
                displayLengthChange(character, growthAmount, 1);
            }
            CView.text("\n\nInhuman vitality spreads through your body, invigorating you!\n");
            displayCharacterHPChange(character, 30 + character.stats.tou / 3);
            character.stats.lust += 3;
            character.stats.cor += 1;
            // Shrinkage!
            if (randInt(2) === 0 && character.body.tallness > 42) {
                CView.text("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!\n");
                character.body.tallness -= 1 + randInt(3);
            }
            // Red skin!
            if (randInt(30) === 0 && character.body.skin.tone !== "red") {
                if (character.body.skin.type === SkinType.FUR) CView.text("\n\nUnderneath your fur, your skin ");
                else CView.text("\n\nYour " + character.body.skin.desc + " ");
                if (randInt(2) === 0) character.body.skin.tone = "red";
                else character.body.skin.tone = "orange";
                CView.text("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + character.body.skin.tone + ".");
            }
            return;
        }
        else {
            CView.text("The food tastes... corrupt, for lack of a better word.\n");
            displayCharacterHPChange(character, 20 + character.stats.tou / 3);
            character.stats.lust += 3;
            character.stats.cor += 1;
        }
        // Red skin!
        if (randInt(30) === 0 && character.body.skin.tone !== "red") {
            if (character.body.skin.type === SkinType.FUR) CView.text("\n\nUnderneath your fur, your skin ");
            else CView.text("\n\nYour " + character.body.skin.desc + " ");
            if (randInt(2) === 0) character.body.skin.tone = "red";
            else character.body.skin.tone = "orange";
            CView.text("begins to lose its color, fading until you're as white as an albino.  Then, starting at the crown of your head, a reddish hue rolls down your body in a wave, turning you completely " + character.body.skin.tone + ".");
        }

        // Shrinkage!
        if (randInt(2) === 0 && character.body.tallness > 42) {
            CView.text("\n\nYour skin crawls, making you close your eyes and shiver.  When you open them again the world seems... different.  After a bit of investigation, you realize you've become shorter!");
            character.body.tallness -= 1 + randInt(3);
        }
    }
}
