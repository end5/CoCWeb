import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';

export class WhiteSpellbook extends Consumable {
    public constructor() {
        super(ConsumableName.WhiteSpellbook, new ItemDesc("W. Book", "a small book with a pristine white cover", "This white book is totally unmarked, and the cover is devoid of any lettering or title.  A shiny brass clasp keeps the covers closed until you are ready to read it."), 40);
    }

    public use(character: Character) {
        CView.clear();
        CView.text("You open the white tome, and discover it to be an instructional book on the use of white magic.  Most of it is filled with generic information about white magic - how it is drawn for mental focus, is difficult to use when tired or aroused, and can be used to create and control energy.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.");
        if (character.stats.int < 30) {
            CView.text("\n\nYou feel greatly enlightened by your time spent reading.");
            character.stats.int += 4;
        }
        else if (character.stats.int < 60) {
            CView.text("\n\nSpending some time reading was probably good for you, and you definitely feel smarter for it.");
            character.stats.int += 2;
        }
        else if (character.stats.int < 80) {
            CView.text("\n\nAfter reading the small tome your already quick mind feels invigorated.");
            character.stats.int += 1;
        }
        else {
            CView.text("\n\nThe contents of the book did little for your already considerable intellect.");
            character.stats.int += .6;
        }
        // Smart enough for arouse and doesnt have it
        if (character.stats.int >= 25 && !character.effects.has(EffectType.KnowsCharge)) {
            CView.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Charge Weapon.</b>");
            character.effects.create(EffectType.KnowsCharge);
            return;
        }
        // Smart enough for arouse and doesnt have it
        if (character.stats.int >= 30 && !character.effects.has(EffectType.KnowsBlind)) {
            CView.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Blind.</b>");
            character.effects.create(EffectType.KnowsBlind);
            return;
        }
        // Smart enough for arouse and doesnt have it
        if (character.stats.int >= 40 && !character.effects.has(EffectType.KnowsWhitefire)) {
            CView.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Whitefire.</b>");
            character.effects.create(EffectType.KnowsWhitefire);
        }
    }
}
