import { IPregnancyEvent } from 'Engine/Body/Pregnancy/IPregnancyEvent';
import { Character } from 'Engine/Character/Character';
import { Womb } from 'Engine/Body/Pregnancy/Womb';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';
import { CView } from 'Engine/Display/ContentView';
import { describeCock, describeCocksLight } from 'Content/Descriptors/CockDescriptor';
import { Cock, CockType } from 'Engine/Body/Cock';
import { describeVagina } from 'Content/Descriptors/VaginaDescriptor';
import { BreastRow } from 'Engine/Body/BreastRow';
import { describeBreastRow } from 'Content/Descriptors/BreastDescriptor';
import { displayStretchButt } from 'Content/Modifiers/ButtModifier';
import { describeButt } from 'Content/Descriptors/ButtDescriptor';
import { randInt } from 'Engine/Utilities/SMath';

class BeeButtPregnancyEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy!.type === PregnancyType.BEE_EGGS) {
            if (womb.pregnancy!.incubation === 36) {
                CView.text("<b>\nYou feel bloated, your bowels shifting uncomfortably from time to time.</b>\n");
            }
            if (womb.pregnancy!.incubation === 20) {
                CView.text("<b>\nA honey-scented fluid drips from your rectum.</b>  At first it worries you, but as the smell fills the air around you, you realize anything with such a beautiful scent must be good.  ");
                if (player.body.cocks.length > 0) CView.text("The aroma seems to permeate your very being, slowly congregating in your ");
                if (player.body.cocks.length === 1) {
                    CView.text(describeCock(player, player.body.cocks.get(0)));
                    if (player.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length === 1) CView.text(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air, until your " + describeCock(player, player.body.cocks.get(0)) + " is twitching and dripping, the flare swollen and purple.  ");
                    if (player.body.cocks.filter(Cock.FilterType(CockType.DOG)).length === 1) CView.text(", each inhalation making it thicker, harder, and firmer.  You suck in huge lungfuls of air, desperate for more, until your " + describeCock(player, player.body.cocks.get(0)) + " is twitching and dripping, its knot swollen to the max.  ");
                    if (player.body.cocks.filter(Cock.FilterType(CockType.HUMAN)).length === 1) CView.text(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air, until your " + describeCock(player, player.body.cocks.get(0)) + " is twitching and dripping, the head swollen and purple.  ");
                    // FAILSAFE FOR NEW COCKS
                    if (player.body.cocks.filter(Cock.FilterType(CockType.HUMAN)).length === 0 && player.body.cocks.filter(Cock.FilterType(CockType.DOG)).length === 0 && player.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length === 0) CView.text(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air until your " + describeCock(player, player.body.cocks.get(0)) + " is twitching and dripping.  ");
                }
                if (player.body.cocks.length > 1) CView.text("groin.  Your " + describeCocksLight(player) + " fill and grow with every lungful of the stuff you breathe in.  You suck in great lungfuls of the tainted air, desperate for more, your cocks twitching and dripping with need.  ");
                CView.text("You smile knowing you couldn't stop from masturbating if you wanted to.\n");
                player.stats.int += -.5;
                player.stats.lust += 500;
            }
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy!.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        // Give birth (if it's time) to beeeeeeez
        if (womb.pregnancy!.incubation === 1 && womb.pregnancy!.type === PregnancyType.BEE_EGGS) {
            CView.text("\n");
            CView.text("There is a sudden gush of honey-colored fluids from your ass.  Before panic can set in, a wonderful scent overtakes you, making everything ok.  ");
            if (player.body.cocks.length > 0) CView.text("The muzzy feeling that fills your head seems to seep downwards, making your equipment hard and tight.  ");
            if (player.body.vaginas.length > 0) CView.text("Your " + describeVagina(player, player.body.vaginas.get(0)) + " becomes engorged and sensitive.  ");
            CView.text("Your hand darts down to the amber, scooping up a handful of the sticky stuff.  You wonder what your hand is doing as it brings it up to your mouth, which instinctively opens.  You shudder in revulsion as you swallow the sweet-tasting stuff, your mind briefly wondering why it would do that.  The stuff seems to radiate warmth, quickly pushing those nagging thoughts away as you scoop up more.\n\n");
            CView.text("A sudden slip from below surprises you; a white sphere escapes from your anus along with another squirt of honey.  Your drugged brain tries to understand what's happening, but it gives up, your hands idly slathering honey over your loins.  The next orb pops out moments later, forcing a startled moan from your mouth.  That felt GOOD.  You begin masturbating to the thought of laying more eggs... yes, that's what those are.  You nearly cum as egg number three squeezes out.  ");
            if (player.body.chest.reduce(BreastRow.AverageLactation, 0) >= 1 && player.body.chest.sort(BreastRow.Largest).get(0)!.rating > 2) CView.text("Seeking even greater sensation, your hands gather the honey and massage it into your " + describeBreastRow(player.body.chest.get(0)) + ", slowly working up to your nipples.  Milk immediately begins pouring out from the attention, flooding your chest with warmth.  ");
            CView.text("Each egg seems to come out closer on the heels of the one before, and each time your conscious mind loses more of its ability to do anything but masturbate and wallow in honey.\n\n");
            CView.text("Some time later, your mind begins to return, brought to wakefulness by an incredibly loud buzzing...  You sit up and see a pile of dozens of eggs resting in a puddle of sticky honey.  Most are empty, but a few have hundreds of honey-bees emptying from them, joining the massive swarms above you.  ");
            if (player.stats.cor < 35) CView.text("You are disgusted, but glad you were not stung during the ordeal.  You stagger away and find a brook to wash out your mouth with.");
            if (player.stats.cor >= 35 && player.stats.cor < 65) CView.text("You are amazed you could lay so many eggs, and while the act was strange there was something definitely arousing about it.");
            if (player.stats.cor >= 65 && player.stats.cor < 90) CView.text("You stretch languidly, noting that most of the drugged honey is gone.  Maybe you can find the Bee again and remember to bottle it next time.");
            if (player.stats.cor >= 90) CView.text("You lick your lips, savoring the honeyed residue on them as you admire your thousands of children.  If only every night could be like this...\n");
            womb.clear(); // Clear Butt Pregnancy
            player.orgasm();
            player.stats.int += 1;
            player.stats.lib += 4;
            player.stats.sens += 3;

            if (displayStretchButt(player, 20, true)) CView.text("\n");
            if (player.body.butt.rating < 17) {
                // Guaranteed increase up to level 10
                if (player.body.butt.rating < 13) {
                    player.body.butt.rating++;
                    CView.text("\nYou notice your " + describeButt(player) + " feeling larger and plumper after the ordeal.");
                }
                // Big butts only increase 50% of the time.
                else if (randInt(2) === 0) {
                    player.body.butt.rating++;
                    CView.text("\nYou notice your " + describeButt(player) + " feeling larger and plumper after the ordeal.");
                }
            }
            CView.text("\n");
        }
    }
}

export const BeeButtPregEvent = new BeeButtPregnancyEvent();
