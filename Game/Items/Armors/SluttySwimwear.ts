import { ArmorName } from './ArmorName';
import { ArmorWithPerk } from './ArmorWithPerk';
import { BreastRow } from '../../Body/BreastRow';
import { Cock } from '../../Body/Cock';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { ItemDesc } from '../ItemDesc';
import { describeBalls } from '../../Descriptors/BallsDescriptor';
import { describeCock, describeCocksLight } from '../../Descriptors/CockDescriptor';
import { CView } from '../../../Page/ContentView';
import { Perk } from '../../Effects/Perk';

export class SluttySwimwear extends ArmorWithPerk {
    public constructor() {
        super(ArmorName.SluttySwimwear, new ItemDesc("S.Swmwr", "a skimpy black bikini", "An impossibly skimpy black bikini. You feel dirty just looking at it... and a little aroused, actually."), "slutty swimwear", 0, 6, "Light", new Perk(PerkType.SluttySeduction, { teaseChance: 6 }), "", true);
    }

    public useText(character: Character): void {
        character.stats.lust += 5;
        if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating < 1)
            CView.text("You feel rather stupid putting the top part on like this, but you're willing to bear with it. It could certainly be good for distracting.  ");
        else {
            CView.text("The bikini top clings tightly to your bustline, sending a shiver of pleasure through your body. It serves to turn you on quite nicely.  ");
            character.stats.lust += 5;
        }
        if (character.body.cocks.length <= 0) {
            CView.text("The thong moves over your smooth groin, clinging onto your buttocks nicely.  ");
            if (character.body.balls.count > 0) {
                if (character.body.balls.size > 5)
                    CView.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + describeBalls(true, true, character) + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
                else
                    CView.text("However, your testicles do serve as an area of discomfort, stretching the material and bulging out the sides slightly.  ");
            }
        }
        else {
            if (character.body.cocks.length === 1) {
                CView.text("You grunt in discomfort, your " + describeCock(character, character.body.cocks.get(0)) + " flopping free from the thong's confines. The tight material rubbing against your dick does manage to turn you on slightly.  ");
            }
            else {
                CView.text("You grunt in discomfort, your " + describeCocksLight(character) + " flopping free from the thong's confines. The tight material rubbing against your dicks does manage to turn you on slightly.  ");
            }
            character.stats.lust += 5;
            if (character.body.cocks.sort(Cock.Largest).get(0)!.area >= 20)
                CView.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + describeCock(character, character.body.cocks.sort(Cock.Largest).get(0)) + " has popped out of the top, completely exposed.  Maybe if you shrunk your male parts down a little...");
            // If dick is 7+ inches OR balls are apple-sized]
            else if (character.body.balls.size > 5)
                CView.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + describeBalls(true, true, character) + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
        }
        CView.text("\n\n");
    }
}
