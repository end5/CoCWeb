import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { Character } from 'Engine/Character/Character';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';

export class IsabellaMilk extends Consumable {
    public constructor() {
        super(ConsumableName.IsabellaMilk, new ItemDesc("IzyMilk", "a bottle of Isabella's milk", "This is a bottle of Isabella's milk.  Isabella seems fairly certain it will invigorate you."));
    }

    public use(character: Character) {
        CView.clear();
        CView.text("You swallow down the bottle of Isabella's milk.");
        if (character.stats.fatigue > 0) CView.text("  You feel much less tired! (-33 fatigue)");
        character.stats.fatigue -= 33;
    }
}
