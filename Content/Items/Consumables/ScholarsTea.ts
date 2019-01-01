import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { Character } from 'Engine/Character/Character';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';
import { displayModTone } from 'Content/Modifiers/BodyModifier';

export class ScholarsTea extends Consumable {
    public constructor() {
        super(ConsumableName.ScholarsTea, new ItemDesc("Scholars T.", "a cup of scholar's tea", "This powerful brew supposedly has mind-strengthening effects."), 0);
    }

    public use(character: Character) {
        CView.clear();
        CView.text("Following the merchant's instructions, you steep and drink the tea. Its sharp taste fires up your palate and in moments, you find yourself more alert and insightful. As your mind wanders, a creative, if somewhat sordid, story comes to mind. It is a shame that you do not have writing implements as you feel you could make a coin or two off what you have conceived. The strange seller was not lying about the power of the tea.");
        if (randInt(3) === 0)
            CView.text(displayModTone(character, 15, 1));
        character.stats.int = 2.5 + randInt(5);
    }
}
