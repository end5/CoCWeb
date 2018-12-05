import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { Character } from 'Game/Character/Character';
import { ItemDesc } from '../ItemDesc';
import { CView } from 'Page/ContentView';

export class PurityPeach extends Consumable {
    public constructor() {
        super(ConsumableName.PurityPeach, new ItemDesc("PurPeac", "a pure peach", "This is a peach from Minerva's spring, yellowy-orange with red stripes all over it."), 10);
    }

    public use(character: Character) {
        CView.clear();
        CView.text("You bite into the sweet, juicy peach, feeling a sensation of energy sweeping through your limbs and your mind.  You feel revitalized, refreshed, and somehow cleansed.");
        character.stats.fatigue -= 15;
        character.stats.HP += Math.round(character.stats.maxHP() * 0.25);
    }
}
