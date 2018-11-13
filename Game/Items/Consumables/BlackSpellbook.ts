import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { Character } from '../../Character/Character';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { ItemDesc } from '../ItemDesc';
import { CView } from '../../../Page/ContentView';

export class BlackSpellbook extends Consumable {
    public constructor() {
        super(ConsumableName.BlackSpellbook, new ItemDesc("B. Book", "a small book with a midnight-black cover", "This solid black book is totally unmarked, saved for a blood red clasp that holds the covers closed until you are ready to read it.  The pages are edged with gold, like some of the fancy books in the monastary back home."), 40);
    }

    public use(character: Character) {
        CView.clear();
        CView.text("You open the small black book, and discover it to be an instructional book on the use of black magic.  Most of it is filled with generic information about black magic - how it is drawn from emotions (typically lust), and how it has the power to affect bodies and emotions.  It also warns against using it on oneself, as it is difficult to draw on your emotions while meddling with your own body.  In no time at all you've read the whole thing, but it disappears into thin air before you can put it away.");
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
            character.stats.int += 0.6;
        }
        // Smart enough for arouse and doesnt have it
        if (character.stats.int >= 25 && !character.effects.has(StatusEffectType.KnowsArouse)) {
            CView.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Arouse.</b>");
            character.effects.add(StatusEffectType.KnowsArouse);
            return;
        }
        // Smart enough for arouse and doesnt have it
        if (character.stats.int >= 30 && !character.effects.has(StatusEffectType.KnowsHeal)) {
            CView.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Heal.</b>");
            character.effects.add(StatusEffectType.KnowsHeal);
            return;
        }
        // Smart enough for arouse and doesnt have it
        if (character.stats.int >= 40 && !character.effects.has(StatusEffectType.KnowsMight)) {
            CView.text("\n\nYou blink in surprise, assaulted by the knowledge of a <b>new spell: Might.</b>");
            character.effects.add(StatusEffectType.KnowsMight);
        }
    }
}
