import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { PregnancyType } from 'Game/Character/Body/Pregnancy/Pregnancy';
import { Character } from 'Game/Character/Character';
import { ItemDesc } from '../ItemDesc';
import { CView } from 'Page/ContentView';
import { Womb } from 'Game/Character/Body/Pregnancy/Womb';
import { randEggType } from './Eggs';
import { EggPregnancy } from 'Game/Character/Body/Pregnancy/EggPregnancy';
import { OvielixirPregEvent } from 'Game/Scenes/Pregnancy/Ovielixir';

export class OvipositionElixir extends Consumable {
    public constructor() {
        super(ConsumableName.OvipositionElixir, new ItemDesc("Ovi Elixir", "a hexagonal crystal bottle tagged with an image of an egg", "This hexagonal crystal bottle is filled with a strange green fluid.  A tag with a picture of an egg is tied to the neck of the bottle, indicating it is somehow connected to egg-laying."), 30);
    }

    public canUse(character: Character): boolean {
        if (character.body.vaginas.length > 0) return true;
        CView.text("You pop the cork and prepare to drink the stuff, but the smell nearly makes you gag.  You cork it hastily.\n\n");
        return false;
    }

    // Oviposition Elixer!
    /* Notes on StatusAffects.Eggs
     v1 = egg type.
     v2 = size - 0 for normal, 1 for large
     v3 = quantity
     EGG TYPES-
     0 - brown - ass expansion
     1 - purple - hip expansion
     2 - blue - vaginal removal and/or growth of existing maleness
     3 - pink - dick removal and/or fertility increase.
     4 - white - breast growth.  If lactating increases lactation.
     5 - rubbery black
     */
    public use(character: Character) {
        character.slimeFeed();
        CView.text("You pop the cork and gulp down the thick greenish fluid.  The taste is unusual and unlike anything you've tasted before.");
        if (character.body.wombs.find(Womb.PregnantWithType(PregnancyType.GOO_STUFFED))) {
            CView.text("\n\nFor a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with Valeria's goo filling your womb the ovielixir is unable to work its magic on you.");
            return;
        }
        if (character.body.wombs.find(Womb.PregnantWithType(PregnancyType.WORM_STUFFED))) {
            CView.text("\n\nFor a moment you feel even more bloated than you already are.  That feeling is soon replaced by a dull throbbing pain.  It seems that with the worms filling your womb the ovielixir is unable to work its magic on you.");
            return;
        }
        if (character.body.wombs.find(Womb.NotPregnant)) { // If the character is not pregnant, get preggers with eggs!
            CView.text("\n\nThe elixir has an immediate effect on your belly, causing it to swell out slightly as if pregnant.  You guess you'll be laying eggs sometime soon!");
            character.body.wombs.find(Womb.NotPregnant)!.knockUp(new EggPregnancy(randEggType(), false, randInt(3) + 5), OvielixirPregEvent, 1, true);
            return;
        }
        let changeOccurred: boolean = false;
        const wombPregWithEggs = character.body.wombs.find(Womb.PregnantWithType(PregnancyType.OVIELIXIR_EGGS));
        if (wombPregWithEggs) { // If character already has eggs, chance of size increase!
            const eggPreg = wombPregWithEggs.pregnancy as EggPregnancy;
            if (eggPreg) {
                // If eggs are small, chance of increase!
                if (!wombPregWithEggs.pregnancy!) {
                    // 1 in 2 chance!
                    if (randInt(3) === 0) {
                        eggPreg.large = true;
                        CView.text("\n\nYour pregnant belly suddenly feels heavier and more bloated than before.  You wonder what the elixir just did.");
                        changeOccurred = true;
                    }
                }
                // Chance of quantity increase!
                if (randInt(2) === 0) {
                    CView.text("\n\nA rumble radiates from your uterus as it shifts uncomfortably and your belly gets a bit larger.");
                    eggPreg.amount = randInt(4 + 1);
                    changeOccurred = true;
                }
            }
        }
        // If no changes, speed up all pregnancies.
        const pregnantWomb = character.body.wombs.find((womb) => womb.isPregnant() && womb.pregnancy!.type !== PregnancyType.BUNNY);
        if (!changeOccurred && pregnantWomb && pregnantWomb.pregnancy && pregnantWomb.pregnancy.incubation > 20) {
            CView.text("\n\nYou gasp as your pregnancy suddenly leaps forwards, your belly bulging outward a few inches as it gets closer to time for birthing.");
            let newIncubation: number = pregnantWomb.pregnancy.incubation - Math.floor(pregnantWomb.pregnancy.incubation * 0.3 + 10);
            if (newIncubation < 2) newIncubation = 2;
            pregnantWomb.pregnancy.incubation = newIncubation;
            // console.trace("Pregger Count New total:" + pregnancy.incubation);
        }
    }
}
