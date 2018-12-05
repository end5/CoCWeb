import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { Character } from 'Game/Character/Character';
import { ItemDesc } from '../ItemDesc';
import { describeLegs } from 'Game/Descriptors/LegDescriptor';
import { CView } from 'Page/ContentView';
import { boostLactation } from 'Game/Modifiers/BreastModifier';
import { passTime } from 'Game/Menus/InGame/PlayerMenu';
import { CombatManager } from 'Game/Combat/CombatManager';
import { SpriteName } from 'Page/SpriteName';

export class TatteredScroll extends Consumable {
    public constructor() {
        super(ConsumableName.TatteredScroll, new ItemDesc("TScroll", "a tattered scroll", "This tattered scroll is written in strange symbols, yet you have the feeling that if you tried to, you could decipher it."));
    }

    public use(character: Character) {
        CView.clear();
        CView.text("Your wobbly " + describeLegs(character) + " give out underneath you as your body's willpower seems to evaporate, your mouth reading the words on the scroll with a backwards sounding sing-song voice.\n\n");
        if (character.body.hair.color === "sandy blonde") {
            CView.text("Your mouth forms a smile of its own volition, reading, \"<i>Tresed eht retaw llahs klim ruoy.</i>\"\n\n");
            if (character.body.chest.length === 0) {
                CView.text("You grow a perfectly rounded pair of C-cup breasts!  ");
                const newBreastRow: BreastRow = new BreastRow();
                newBreastRow.rating = 3;
                if (newBreastRow.nipples.count < 1)
                    newBreastRow.nipples.count = 1;
                character.body.chest.add(newBreastRow);
                character.stats.sens += 2;
                character.stats.lust += 1;
            }
            else {
                if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating === 0) {
                    CView.text("You grow a perfectly rounded pair of C-cup breasts!  ");
                    const selectedBreastBow: BreastRow = character.body.chest.sort(BreastRow.Largest).get(0)!;
                    selectedBreastBow.rating = 3;
                    if (selectedBreastBow.nipples.count < 1)
                        selectedBreastBow.nipples.count = 1;
                    character.stats.sens += 2;
                    character.stats.lust += 1;
                }
                const largestBreasts: BreastRow = character.body.chest.sort(BreastRow.Largest).get(0)!;
                if (largestBreasts.rating > 0 && largestBreasts.rating < 3) {
                    CView.text("Your breasts suddenly balloon outwards, stopping as they reach a perfectly rounded C-cup.  ");
                    largestBreasts.rating = 3;
                    character.stats.sens += 1;
                    character.stats.lust += 1;
                }
                if (character.body.chest.reduce(BreastRow.AverageNipplesPerBreast, 0) < 1) {
                    CView.text("A dark spot appears on each breast, rapidly forming into a sensitive nipple.  ");
                    for (const breastRow of character.body.chest) {
                        // If that breast didnt have nipples reset length
                        if (breastRow.nipples.count < 1)
                            breastRow.nipples.length = .2;
                        breastRow.nipples.count = 1;

                    }
                    character.stats.sens += 2;
                    character.stats.lust += 1;
                }
                const largestLactationMultiplier = character.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier;
                if (largestLactationMultiplier > 0) {
                    CView.text("A strong pressure builds in your chest, painful in its intensity.  You yank down your top as ");
                    if (largestLactationMultiplier < 2)
                        CView.text("powerful jets of milk spray from your nipples, spraying thick streams over the ground.  You moan at the sensation and squeeze your tits, hosing down the tainted earth with an offering of your milk.  You blush as the milk ends, quite embarassed with your increased milk production.  ");
                    if (largestLactationMultiplier >= 2 && largestLactationMultiplier <= 2.6)
                        CView.text("eruptions of milk squirt from your nipples, hosing thick streams everywhere.  The feeling of the constant gush of fluids is very erotic, and you feel yourself getting more and more turned on.  You start squeezing your breasts as the flow diminishes, anxious to continue the pleasure, but eventually all good things come to an end.  ");
                    if (largestLactationMultiplier > 2.6 && largestLactationMultiplier < 3)
                        CView.text("thick hoses of milk erupt from your aching nipples, forming puddles on the ground.  You smile at how well you're feeding the earth, your milk coating the ground faster than it can be absorbed.  The constant lactation is pleasurable... in a highly erotic way, and you find yourself moaning and pulling on your nipples, your hands completely out of control.  In time you realize the milk has stopped, and even had time to soak into the dirt.  You wonder at your strange thoughts and pull your hands from your sensitive nipples.  ");

                    if (largestLactationMultiplier >= 3)
                        CView.text("you drop to your knees and grab your nipples.  With a very sexual moan you begin milking yourself, hosing out huge quantities of milk.  You pant and grunt, offering as much of your milk as you can.  It cascades down a hill in a small stream, and you can't help but blush with pride... and lust.  The erotic pleasures build as you do your best to feed the ground all of your milk.  You ride the edge of orgasm for an eternity, milk everywhere.  When you come to, you realize you're kneeling there, tugging your dry nipples.  Embarrassed, you stop, but your arousal remains.  ");
                    if (largestLactationMultiplier < 3) {
                        boostLactation(character, .7);
                        CView.text("Your breasts feel fuller... riper... like your next milking could be even bigger.  ");
                    }
                    character.stats.lib += 1;
                    character.stats.sens += 4;
                    character.stats.lust += 15;
                }
                if (largestLactationMultiplier === 0) {
                    CView.text("A pleasurable release suddenly erupts from your nipples!  Twin streams of milk are spraying from your breasts, soaking into the ground immediately.  It stops all too soon, though a voice in your head assures you that you can lactate quite often now.  ");
                    boostLactation(character, 1);
                    character.stats.lib += 0.5;
                    character.stats.sens += 1;
                    character.stats.lust += 10;
                }
            }
            CView.text("\n\nYour mouth curls into a sick smile and, with a voice that isn't your own, speaks, \"<i>I ALWAYS get what I want, dear...</i>\"");
        }
        else {
            CView.text("Your mouth forms a smile of its own volition, reading, \"<i>nuf erutuf rof riah ydnas, nus tresed eht sa ydnas.</i>\"\n\nYou feel a tingling in your scalp, and realize your hair has become a sandy blonde!");
            character.body.hair.color = "sandy blonde";
            CView.text("\n\nYour mouth curls with a sick smile, speaking with a voice that isn't your own, \"<i>I ALWAYS get what I want, dear...</i>\"");
        }
        if (!CombatManager.inCombat) {
            // RAEP
            CView.sprite(SpriteName.SandWitch);
            CView.text("\n\nYou hear the soft impact of clothes hitting the ground behind you, and turn to see that the sand witch has found you! You cannot resist a peek at your uninvited guest, beholding a curvy dark-skinned beauty, her form dominated by a quartet of lactating breasts.  Somewhere in your lust-fogged mind you register the top two as something close to double-Ds, and her lower pair to be about Cs.  She smiles and leans over you, pushing you to the ground violently.\n\nShe turns around and drops, planting her slick honey-pot firmly against your mouth.  Her scent is strong, overpowering in its intensity.  Your tongue darts out for a taste and finds a treasure trove of sticky sweetness.  Instinctively you tongue-fuck her, greedily devouring her cunny-juice, shoving your tongue in as far as possible while suckling her clit.  Dimly you feel the milk spattering over you, splashing off you and into the cracked earth.  Everywhere the milk touches feels silky smooth and sensitive, and your hands begin stroking your body, rubbing it in as the witch sprays more and more of it.  You lose track of time, orgasming many times, slick and sticky with sexual fluids.");
            character.orgasm();
            character.stats.lib += 1;
            character.stats.sens += 5;
            character.slimeFeed();
        }
        return { next: passTime(1) };
    }
}
