import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { Character } from 'Game/Character/Character';
import { ItemDesc } from '../ItemDesc';
import { CView } from 'Page/ContentView';
import { boostLactation } from 'Game/Modifiers/BreastModifier';

export class PurpleFruit extends Consumable {
    public constructor() {
        super(ConsumableName.PurpleFruit, new ItemDesc("PrFruit", "a purple fruit", "This sweet-smelling produce looks like an eggplant, but feels almost squishy, and rubbery to the touch. Holding it to your ear, you think you can hear some fluid sloshing around inside."));
    }

    public use(character: Character) {
        CView.clear();
        CView.text("You bite into the fruit Essrayle gave you with little hesitation.  It's amazingly sweet, with a texture that's rather gummy.  The juice is a candied grape syrup that fills your cheeks and flows down your throat with far more fluid than the size of the plant should allow.  You hastily devour the entire thing, unable to stop yourself once you've started.");
        CView.text("\n\nA tingling warmth shifts to a roaring inferno in your veins, your heart-rate spiking abruptly.  The intensity of it almost makes your body feel molten!  But, as quickly as it came, the sensation fades into merely a pleasing warmth that settles in your chest.");
        if (character.body.chest.reduce(BreastRow.AverageNipplesPerBreast, 0) < 4) {
            CView.text("  At first you think nothing has changed, but a second look confirms that your breasts now sport the same quartet of cow-like nipples the bovine plant-girl bears.");
            if (character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length < 4)
                character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length = 4;
            for (const breastRow of character.body.chest)
                breastRow.nipples.count = 4;
        }
        // [Character gains quad nipples, milk production and libido way up]
        character.stats.lib += 5;
        boostLactation(character, 3 * character.body.chest.length);
    }
}
