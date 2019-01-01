import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { BreastRow } from 'Engine/Body/BreastRow';
import { Cock } from 'Engine/Body/Cock';
import { EarType } from 'Engine/Body/Ears';
import { FaceType } from 'Engine/Body/Face';
import { HornType } from 'Engine/Body/Horns';
import { LegType } from 'Engine/Body/Legs';
import { SkinType } from 'Engine/Body/Skin';
import { Tail, TailType } from 'Engine/Body/Tail';
import { Vagina, VaginaLooseness, VaginaWetness } from 'Engine/Body/Vagina';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { numToCardinalText } from 'Content/Utilities/NumToText';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { describeCock } from 'Content/Descriptors/CockDescriptor';
import { describeBallsShort } from 'Content/Descriptors/BallsDescriptor';
import { describeVagina } from 'Content/Descriptors/VaginaDescriptor';
import { describeBreastRow, describeNipple } from 'Content/Descriptors/BreastDescriptor';
import { describeButt } from 'Content/Descriptors/ButtDescriptor';
import { describeFeet } from 'Content/Descriptors/LegDescriptor';
import { CView } from 'Engine/Display/ContentView';
import { growCock, displayLengthChange, displayKillCocks } from 'Content/Modifiers/CockModifier';
import { growTopBreastRow, boostLactation } from 'Content/Modifiers/BreastModifier';
import { displayModFem, displayModThickness, displayModTone } from 'Content/Modifiers/BodyModifier';
import { Settings } from 'Content/Settings';

export class LaBova extends Consumable {
    /*Purified LaBova:
     This will be one of the items that the character will have to give Marble to purify her, but there is a limit on how much she can be purified in this way.
     Effects on the character:
     Mostly the same, but without animal transforms, corruption, and lower limits on body changes
     Hips and ass cap at half the value for LaBova
     Nipple growth caps at 1 inch
     Breasts cap at E or DD cup
     Raises lactation to a relatively low level, reduces high levels: \"Your breasts suddenly feel less full, it seems you aren't lactating at quite the level you where.\"  OR  \"The insides of your breasts suddenly feel bloated.  There is a spray of milk from them, and they settle closer to a more natural level of lactation.\"
     Does not apply the addictive quality
     If the character has the addictive quality, this item can remove that effect

     Enhanced LaBova:
     Something that the character can either make or find later; put it in whenever you want, or make your own item.  This is just a possible suggestion.  If it is given to Marble, she only gains the quad nipples.
     Effects on the character
     Mostly the same, but some of the effects can be more pronounced.  Ie, more str gain from one dose, or more breast growth.
     If the character's nipples are larger than 1 inch in length, this item is guaranteed to give them quad nipples.  This applies to all their breasts; seems like it ould be a good compromise on whether or not cowgirls should have 4 breasts.
     Very small chance to increase fertility (normally this increase would only happen when the character forces a creature to drink their milk).
     */
    private enhanced: boolean;
    private tainted: boolean;
    public constructor(enhanced: boolean, tainted: boolean) {
        if (enhanced)
            super(ConsumableName.LaBovaEnhanced, new ItemDesc("ProBova", "a bottle containing a misty fluid labeled \"ProBova\"", "This cloudy potion has been enhanced by the alchemist Lumi to imbue its drinker with cow-like attributes."));
        else if (tainted)
            super(ConsumableName.LaBova, new ItemDesc("La Bova", "a bottle containing a misty fluid labeled \"LaBova\"", "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off."));
        else
            super(ConsumableName.LaBovaPure, new ItemDesc("P.LBova", "a bottle containing a white fluid labeled \"Pure LaBova\"", "A bottle containing a misty fluid with a grainy texture); it has a long neck and a ball-like base.  The label has a stylized picture of a well-endowed cow-girl nursing two guys while they jerk themselves off. It has been purified by Rathazul."));
        this.enhanced = enhanced;
        this.tainted = tainted;
    }

    public use(character: Character) {
        // Changes done
        let changes: number = 0;
        // Change limit
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (character.effects.has(EffectType.HistoryAlchemist)) changeLimit++;
        if (this.enhanced) changeLimit += 2;
        // LaBova:
        // ItemDesc: "A bottle containing a misty fluid with a grainy texture, it has a long neck and a ball-like base.  The label has a stylized picture of a well endowed cowgirl nursing two guys while they jerk themselves off.  "
        // ItemUseText:
        CView.clear();
        CView.text("You drink the ");
        if (this.enhanced) CView.text("Pro Bova");
        else CView.text("La Bova");
        CView.text(".  The drink has an odd texture, but is very sweet.  It has a slight aftertaste of milk.");
        // Possible Item Effects:
        // STATS
        // Increase character str:
        if (changes < changeLimit && randInt(3) === 0) {
            let strengthGain = 60 - character.stats.str;
            if (strengthGain <= 0) strengthGain = 0;
            else {
                if (randInt(2) === 0) CView.text("\n\nThere is a slight pain as you feel your muscles shift somewhat.  Their appearance does not change much, but you feel much stronger.");
                else CView.text("\n\nYou feel your muscles tighten and clench as they become slightly more pronounced.");
                character.stats.str += strengthGain / 10;
                changes++;
            }
        }
        // Increase character.stats.tou:
        if (changes < changeLimit && randInt(3) === 0) {
            let toughGain = 60 - character.stats.tou;
            if (toughGain <= 0) toughGain = 0;
            else {
                if (randInt(2) === 0) CView.text("\n\nYou feel your insides toughening up; it feels like you could stand up to almost any blow.");
                else CView.text("\n\nYour bones and joints feel sore for a moment, and before long you realize they've gotten more durable.");
                character.stats.tou += toughGain / 10;
                changes++;

            }
        }
        // Decrease character spd if it is over 30:
        if (changes < changeLimit && randInt(3) === 0) {
            if (character.stats.spe > 30) {
                CView.text("\n\nThe body mass you've gained is making your movements more sluggish.");
                changes++;
                character.stats.spe += -((character.stats.spe - 30) / 10);
            }
        }
        // Increase Corr, up to a max of 50.
        if (this.tainted) {
            let corruptionGain = 50 - character.stats.cor;
            if (corruptionGain < 0) corruptionGain = 0;
            character.stats.cor += corruptionGain / 10;
        }
        // Sex bits - Duderiffic
        if (character.body.cocks.length > 0 && randInt(2) === 0 && !Settings.hyperHappy) {
            // If the character has at least one dick, decrease the size of each slightly,
            CView.text("\n\n");
            const biggestCock = character.body.cocks.sort(Cock.Largest).get(0)!;
            let cockGrowth: number = 0;
            // Shrink said cock
            if (biggestCock.length < 6 && biggestCock.length >= 2.9) {
                biggestCock.length -= .5;
                cockGrowth -= .5;
            }
            cockGrowth += growCock(character, biggestCock, (randInt(3) + 1) * -1);
            displayLengthChange(character, cockGrowth, 1);
            if (biggestCock.length < 2) {
                CView.text("  ");
                if (character.body.cocks.length === 1 && character.body.vaginas.length <= 0) {
                    CView.text("Your " + describeCock(character, biggestCock) + " suddenly starts tingling.  It's a familiar feeling, similar to an orgasm.  However, this one seems to start from the top down, instead of gushing up from your loins.  You spend a few seconds frozen to the odd sensation, when it suddenly feels as though your own body starts sucking on the base of your shaft.  Almost instantly, your cock sinks into your crotch with a wet slurp.  The tip gets stuck on the front of your body on the way down, but your glans soon loses all volume to turn into a shiny new clit.");
                    if (character.body.balls.count > 0)
                        CView.text("  At the same time, your " + describeBallsShort(character) + " fall victim to the same sensation; eagerly swallowed whole by your crotch.");
                    CView.text("  Curious, you touch around down there, to find you don't have any exterior organs left.  All of it got swallowed into the gash you now have running between two fleshy folds, like sensitive lips.  It suddenly occurs to you; <b>you now have a vagina!</b>");
                    character.body.balls.count = 0;
                    character.body.balls.size = 1;
                    character.body.vaginas.add(new Vagina());
                    character.body.cocks.remove(character.body.cocks.indexOf(biggestCock));
                }
                else {
                    displayKillCocks(character, 1);
                }
            }
            // if the last of the character's dicks are eliminated this way, they gain a virgin vagina;
            if (character.body.cocks.length === 0 && character.body.vaginas.length <= 0) {
                const newVagina = new Vagina();
                newVagina.looseness = VaginaLooseness.TIGHT;
                newVagina.wetness = VaginaWetness.NORMAL;
                newVagina.virgin = true;
                character.body.vaginas.add(newVagina);
                CView.text("\n\nAn itching starts in your crotch and spreads vertically.  You reach down and discover an opening.  You have grown a <b>new " + describeVagina(character, character.body.vaginas.get(0)) + "</b>!");

                changes++;
                character.stats.lust += 10;
            }
        }
        // Sex bits - girly
        let boobsGrew: boolean = false;
        // Increase character's breast size, if they are HH or bigger
        // do not increase size, but do the other actions:
        if (
            ((this.tainted && character.body.chest.sort(BreastRow.Largest).get(0)!.rating <= 11) ||
                (!this.tainted && character.body.chest.sort(BreastRow.Largest).get(0)!.rating <= 5)) &&
            changes < changeLimit &&
            (randInt(3) === 0 || this.enhanced)
        ) {
            if (randInt(2) === 0) CView.text("\n\nYour " + describeBreastRow(character.body.chest.firstRow) + " tingle for a moment before becoming larger.");
            else CView.text("\n\nYou feel a little weight added to your chest as your " + describeBreastRow(character.body.chest.firstRow) + " seem to inflate and settle in a larger size.");
            growTopBreastRow(character, 1 + randInt(3), 1);
            changes++;
            character.stats.sens += .5;
            boobsGrew = true;
        }
        // -Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && character.body.hair.type === 1 && randInt(4) === 0) {
            // (long):
            if (character.body.hair.length >= 6) CView.text("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal strand of hair.  <b>Your hair is no longer feathery!</b>");
            // (short)
            else CView.text("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into strands of regular hair.  <b>Your hair is no longer feathery!</b>");
            changes++;
            character.body.hair.type = 0;
        }
        // If breasts are D or bigger and are not lactating, they also start lactating:
        if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 4 && character.body.chest.firstRow.lactationMultiplier < 1 && changes < changeLimit && (randInt(3) === 0 || boobsGrew || this.enhanced)) {
            CView.text("\n\nYou gasp as your " + describeBreastRow(character.body.chest.firstRow) + " feel like they are filling up with something.  Within moments, a drop of milk leaks from your " + describeBreastRow(character.body.chest.firstRow) + "; <b> you are now lactating</b>.");
            character.body.chest.firstRow.lactationMultiplier = 1.25;
            changes++;
            character.stats.sens += .5;
        }
        // Quad nipples and other 'special enhanced things.
        if (this.enhanced) {
            // QUAD DAMAGE!
            if (character.body.chest.firstRow.nipples.count === 1) {
                changes++;
                character.body.chest.firstRow.nipples.count = 4;
                CView.text("\n\nYour " + describeNipple(character, character.body.chest.firstRow) + "s tingle and itch.  You pull back your " + character.inventory.armor.displayName + " and watch in shock as they split into four distinct nipples!  <b>You now have four nipples on each side of your chest!</b>");
                if (character.body.chest.length >= 2 && character.body.chest.get(1)!.nipples.count === 1) {
                    CView.text("A moment later your second row of " + describeBreastRow(character.body.chest.get(1)) + " does the same.  <b>You have sixteen nipples now!</b>");
                    character.body.chest.get(1)!.nipples.count = 4;
                }
                if (character.body.chest.length >= 3 && character.body.chest.get(2)!.nipples.count === 1) {
                    CView.text("Finally, your ");
                    if (character.body.chest.length === 3) CView.text("third row of " + describeBreastRow(character.body.chest.get(2)) + " mutates along with its sisters, sprouting into a wonderland of nipples.");
                    else if (character.body.chest.length >= 4) {
                        CView.text("everything from the third row down mutates, sprouting into a wonderland of nipples.");
                        character.body.chest.get(3)!.nipples.count = 4;
                        if (character.body.chest.length >= 5) character.body.chest.get(4)!.nipples.count = 4;
                        if (character.body.chest.length >= 6) character.body.chest.get(5)!.nipples.count = 4;
                        if (character.body.chest.length >= 7) character.body.chest.get(6)!.nipples.count = 4;
                        if (character.body.chest.length >= 8) character.body.chest.get(7)!.nipples.count = 4;
                        if (character.body.chest.length >= 9) character.body.chest.get(8)!.nipples.count = 4;
                    }
                    character.body.chest.get(2)!.nipples.count = 4;
                    CView.text("  <b>You have a total of " + numToCardinalText(character.body.chest.reduce(BreastRow.TotalNipples, 0)) + " nipples.</b>");
                }
            }
            // QUAD DAMAGE IF WEIRD SHIT BROKE BEFORE
            else if (character.body.chest.length > 1 && character.body.chest.get(1)!.nipples.count === 1) {
                if (character.body.chest.get(1)!.nipples.count === 1) {
                    CView.text("\n\nYour second row of " + describeBreastRow(character.body.chest.get(1)) + " tingle and itch.  You pull back your " + character.inventory.armor.displayName + " and watch in shock as your " + describeNipple(character, character.body.chest.get(1)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your second row of breasts</b>.");
                    character.body.chest.get(1)!.nipples.count = 4;
                }
            }
            else if (character.body.chest.length > 2 && character.body.chest.get(2)!.nipples.count === 1) {
                if (character.body.chest.get(2)!.nipples.count === 1) {
                    CView.text("\n\nYour third row of " + describeBreastRow(character.body.chest.get(2)) + " tingle and itch.  You pull back your " + character.inventory.armor.displayName + " and watch in shock as your " + describeNipple(character, character.body.chest.get(2)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your third row of breasts</b>.");
                    character.body.chest.get(2)!.nipples.count = 4;
                }
            }
            else if (character.body.chest.length > 3 && character.body.chest.get(3)!.nipples.count === 1) {
                if (character.body.chest.get(3)!.nipples.count === 1) {
                    CView.text("\n\nYour fourth row of " + describeBreastRow(character.body.chest.get(3)) + " tingle and itch.  You pull back your " + character.inventory.armor.displayName + " and watch in shock as your " + describeNipple(character, character.body.chest.get(3)) + " split into four distinct nipples!  <b>You now have four nipples on each breast in your fourth row of breasts</b>.");
                    character.body.chest.get(3)!.nipples.count = 4;
                }
            }
            else if (character.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier > 1) {
                if (randInt(2) === 0) CView.text("\n\nA wave of pleasure passes through your chest as your " + describeBreastRow(character.body.chest.firstRow) + " start leaking milk from a massive jump in production.");
                else CView.text("\n\nSomething shifts inside your " + describeBreastRow(character.body.chest.firstRow) + " and they feel MUCH fuller and riper.  You know that you've started producing much more milk.");
                boostLactation(character, 2.5);
                if ((character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length < 1.5 && this.tainted) || (!this.tainted && character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length < 1)) {
                    CView.text("  Your " + describeNipple(character, character.body.chest.firstRow) + "s swell up, growing larger to accommodate your increased milk flow.");
                    character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length += .25;
                    character.stats.sens += .5;
                }
                changes++;
            }
        }
        // If breasts are already lactating and the character is not lactating beyond a reasonable level, they start lactating more:
        else {
            if (this.tainted && character.body.chest.firstRow.lactationMultiplier > 1 && character.body.chest.firstRow.lactationMultiplier < 5 && changes < changeLimit && (randInt(3) === 0 || this.enhanced)) {
                if (randInt(2) === 0) CView.text("\n\nA wave of pleasure passes through your chest as your " + describeBreastRow(character.body.chest.firstRow) + " start producing more milk.");
                else CView.text("\n\nSomething shifts inside your " + describeBreastRow(character.body.chest.firstRow) + " and they feel fuller and riper.  You know that you've started producing more milk.");
                boostLactation(character, 0.75);
                if ((character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length < 1.5 && this.tainted) || (!this.tainted && character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length < 1)) {
                    CView.text("  Your " + describeNipple(character, character.body.chest.firstRow) + "s swell up, growing larger to accommodate your increased milk flow.");
                    character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length += .25;
                    character.stats.sens += .5;
                }
                changes++;
            }
            if (!this.tainted) {
                if (character.body.chest.firstRow.lactationMultiplier > 1 && character.body.chest.firstRow.lactationMultiplier < 3.2 && changes < changeLimit && randInt(3) === 0) {
                    if (randInt(2) === 0) CView.text("\n\nA wave of pleasure passes through your chest as your " + describeBreastRow(character.body.chest.firstRow) + " start producing more milk.");
                    else CView.text("\n\nSomething shifts inside your " + describeBreastRow(character.body.chest.firstRow) + " and they feel fuller and riper.  You know that you've started producing more milk.");
                    boostLactation(character, 0.75);
                    if ((character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length < 1.5 && this.tainted) || (!this.tainted && character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length < 1)) {
                        CView.text("  Your " + describeNipple(character, character.body.chest.firstRow) + "s swell up, growing larger to accommodate your increased milk flow.");
                        character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length += .25;
                        character.stats.sens += .5;
                    }
                    changes++;
                }
                if ((character.body.chest.firstRow.lactationMultiplier > 2 && character.effects.has(EffectType.Feeder)) || character.body.chest.firstRow.lactationMultiplier > 5) {
                    if (randInt(2) === 0) CView.text("\n\nYour breasts suddenly feel less full, it seems you aren't lactating at quite the level you were.");
                    else CView.text("\n\nThe insides of your breasts suddenly feel bloated.  There is a spray of milk from them, and they settle closer to a more natural level of lactation.");
                    changes++;
                    character.stats.sens += .5;
                    boostLactation(character, -1);
                }
            }
        }
        // If breasts are lactating at a fair level
        // and the character has not received this status,
        // apply an effect where the character really wants
        // to give their milk to other creatures
        // (capable of getting them addicted):
        if (!character.effects.has(EffectType.Feeder) && character.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 3 && randInt(2) === 0 && character.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 5 && character.stats.cor >= 35) {
            CView.text("\n\nYou start to feel a strange desire to give your milk to other creatures.  For some reason, you know it will be very satisfying.\n\n<b>(You have gained the 'Feeder' perk!)</b>");
            character.effects.create(EffectType.Feeder);
            changes++;
        }
        // UNFINISHED
        // If character has addictive quality and drinks pure version, removes addictive quality.
        // if the character has a vagina and it is tight, it loosens.
        if (character.body.vaginas.length > 0) {
            if (character.body.vaginas.get(0)!.looseness < VaginaLooseness.LOOSE && changes < changeLimit && randInt(2) === 0) {
                CView.text("\n\nYou feel a relaxing sensation in your groin.  On further inspection you discover your " + describeVagina(character, character.body.vaginas.get(0)!) + " has somehow relaxed, permanently loosening.");
                character.body.vaginas.get(0)!.looseness++;
                // Cunt Stretched used to determine how long since last enlargement
                if (!character.effects.has(EffectType.CuntStretched))
                    character.effects.create(EffectType.CuntStretched);
                // Reset the timer on it to 0 when restretched.
                else
                    character.effects.getByName(EffectType.CuntStretched)!.values.expireCountdown = 0;
                character.body.vaginas.get(0)!.looseness++;
                changes++;
                character.stats.lust += 10;
            }
        }
        // General Appearance (Tail -> Ears -> Paws(fur stripper) -> Face -> Horns
        // Give the character a bovine tail, same as the minotaur
        if (this.tainted && !character.body.tails.reduce(Tail.HasType(TailType.COW), false) && changes < changeLimit && randInt(3) === 0) {
            if (character.body.tails.length === 0) CView.text("\n\nYou feel the flesh above your " + describeButt(character) + " knotting and growing.  It twists and writhes around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
            else {
                if (character.body.tails.length > 0) {
                    CView.text("\n\nYour tail bunches uncomfortably, twisting and writhing around itself before flopping straight down, now shaped into a distinctly bovine form.  You have a <b>cow tail</b>.");
                }
                // insect
                if (character.body.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false) || character.body.tails.reduce(Tail.HasType(TailType.BEE_ABDOMEN), false)) {
                    CView.text("\n\nYour insect-like abdomen tingles pleasantly as it begins shrinking and softening, chitin morphing and reshaping until it looks exactly like a <b>cow tail</b>.");
                }
            }
            character.body.tails.clear();
            const newTail = new Tail();
            newTail.type = TailType.COW;
            character.body.tails.add(newTail);
            changes++;
        }
        // Give the character bovine ears, same as the minotaur
        if (this.tainted && character.body.ears.type !== EarType.COW && changes < changeLimit && randInt(4) === 0 && character.body.tails.reduce(Tail.HasType(TailType.COW), false)) {
            CView.text("\n\nYou feel your ears tug on your scalp as they twist shape, becoming oblong and cow-like.  <b>You now have cow ears.</b>");
            character.body.ears.type = EarType.COW;
            changes++;
        }
        // If the character is under 7 feet in height, increase their height, similar to the minotaur
        if (((this.enhanced && character.body.tallness < 96) || character.body.tallness < 84) && changes < changeLimit && randInt(2) === 0) {
            let heightGain = randInt(5) + 3;
            // Slow rate of growth near ceiling
            if (character.body.tallness > 74) heightGain = Math.floor(heightGain / 2);
            // Never 0
            if (heightGain === 0) heightGain = 1;
            // Flavor texts.  Flavored like 1950's cigarettes. Yum.
            if (heightGain < 5) CView.text("\n\nYou shift uncomfortably as you realize you feel off balance.  Gazing down, you realize you have grown SLIGHTLY taller.");
            if (heightGain >= 5 && heightGain < 7) CView.text("\n\nYou feel dizzy and slightly off, but quickly realize it's due to a sudden increase in height.");
            if (heightGain === 7) CView.text("\n\nStaggering forwards, you clutch at your head dizzily.  You spend a moment getting your balance, and stand up, feeling noticeably taller.");
            character.body.tallness += heightGain;
            changes++;
        }
        // Give the character hoofs, if the character already has hoofs STRIP FUR
        if (this.tainted && character.body.legs.type !== LegType.HOOFED && character.body.ears.type === EarType.COW) {
            if (changes < changeLimit && randInt(3) === 0) {
                changes++;
                if (character.body.legs.type === LegType.HUMAN) CView.text("\n\nYou stagger as your feet change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (character.body.legs.type === LegType.DOG) CView.text("\n\nYou stagger as your paws change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                if (character.body.legs.type === LegType.NAGA) CView.text("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly in your new feet as they curl inward and transform into hooves!");
                // Catch-all
                if (character.body.legs.type > LegType.NAGA) CView.text("\n\nYou stagger as your " + describeFeet(character) + " change, curling up into painful angry lumps of flesh.  They get tighter and tighter, harder and harder, until at last they solidify into hooves!");
                CView.text("  A coat of beastial fur springs up below your waist, itching as it fills in.<b>  You now have hooves in place of your feet!</b>");
                character.body.legs.type = LegType.HOOFED;
                character.stats.cor += 0;
                changes++;
            }
        }
        // If the character's face is non-human, they gain a human face
        if (!this.enhanced && character.body.legs.type === LegType.HOOFED && character.body.face.type !== FaceType.HUMAN && changes < changeLimit && randInt(4) === 0) {
            // Remove face before fur!
            CView.text("\n\nYour visage twists painfully, returning to a normal human shape.  <b>Your face is human again!</b>");
            character.body.face.type = FaceType.HUMAN;
            changes++;
        }
        // enhanced get shitty fur
        if (this.enhanced && (character.body.skin.desc !== "fur" || character.body.hair.color !== "black and white spotted")) {
            if (character.body.skin.desc !== "fur") CView.text("\n\nYour " + character.body.skin.desc + " itches intensely.  You scratch and scratch, but it doesn't bring any relief.  Fur erupts between your fingers, and you watch open-mouthed as it fills in over your whole body.  The fur is patterned in black and white, like that of a cow.  The color of it even spreads to your hair!  <b>You have cow fur!</b>");
            else CView.text("\n\nA ripple spreads through your fur as some patches darken and others lighten.  After a few moments you're left with a black and white spotted pattern that goes the whole way up to the hair on your head!  <b>You've got cow fur!</b>");
            character.body.skin.desc = "fur";
            character.body.skin.adj = "";
            character.body.skin.type = SkinType.FUR;
            character.body.hair.color = "black and white spotted";

        }
        // if enhanced to probova give a shitty cow face
        else if (this.enhanced && character.body.face.type !== FaceType.COW_MINOTAUR) {
            CView.text("\n\nYour visage twists painfully, warping and crackling as your bones are molded into a new shape.  Once it finishes, you reach up to touch it, and you discover that <b>your face is like that of a cow!</b>");
            character.body.face.type = FaceType.COW_MINOTAUR;
            changes++;
        }
        // Give the character bovine horns, or increase their size, same as the minotaur
        // New horns.amount or expanding mino horns
        if (this.tainted && changes < changeLimit && randInt(3) === 0 && character.body.face.type === FaceType.HUMAN) {
            // Get bigger or change horns
            if (character.body.horns.type === HornType.COW_MINOTAUR || character.body.horns.type === HornType.NONE) {
                // Get bigger if character has horns
                if (character.body.horns.type === HornType.COW_MINOTAUR) {
                    if (character.body.horns.count < 5) {
                        // Fems horns.amount don't get bigger.
                        CView.text("\n\nYour small horns.amount get a bit bigger, stopping as medium sized nubs.");
                        character.body.horns.count += 1 + randInt(2);
                        changes++;
                    }
                }
                // If no horns.amount yet..
                if (character.body.horns.type === HornType.NONE || character.body.horns.count === 0) {
                    CView.text("\n\nWith painful pressure, the skin on your forehead splits around two tiny nub-like horns, similar to those you would see on the cattle back in your homeland.");
                    character.body.horns.type = HornType.COW_MINOTAUR;
                    character.body.horns.count = 1;
                    changes++;
                }
                /* Never reached
                //TF other horns
                if (character.torso.neck.head.horns.type != HornType.NONE && character.torso.neck.head.horns.type != HornType.COW_MINOTAUR && character.torso.neck.head.horns.amount > 0) {
                    CView.text("\n\nYour horns.amount twist, filling your skull with agonizing pain for a moment as they transform into cow-horns.");
                    character.torso.neck.head.horns.type = HornType.COW_MINOTAUR;
                }*/
            }
            // Not mino horns, change to cow-horns
            if (character.body.horns.type === HornType.DEMON || character.body.horns.type > HornType.COW_MINOTAUR) {
                CView.text("\n\nYour horns.amount vibrate and shift as if made of clay, reforming into two small bovine nubs.");
                character.body.horns.type = HornType.COW_MINOTAUR;
                character.body.horns.count = 2;
                changes++;
            }
        }
        // Increase the size of the character's hips, if they are not already childbearing or larger
        if (randInt(2) === 0 && character.body.hips.rating < 15 && changes < changeLimit) {
            if (!this.tainted && character.body.hips.rating < 8 || this.tainted) {
                CView.text("\n\nYou stumble as you feel the bones in your hips grinding, expanding your hips noticeably.");
                character.body.hips.rating += 1 + randInt(4);
                changes++;
            }
        }
        if (randInt(4) === 0 && character.body.neck.gills && changes < changeLimit) {
            CView.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.body.neck.gills = false;
            changes++;
        }
        // Increase the size of the character's ass (less likely then hips), if it is not already somewhat big
        if (randInt(2) === 0 && character.body.butt.rating < 13 && changes < changeLimit) {
            if (!this.tainted && character.body.butt.rating < 8 || this.tainted) {
                CView.text("\n\nA sensation of being unbalanced makes it difficult to walk.  You pause, paying careful attention to your new center of gravity before understanding dawns on you - your ass has grown!");
                character.body.butt.rating += 1 + randInt(2);
                changes++;
            }
        }
        // Nipples Turn Back:
        if (character.effects.has(EffectType.BlackNipples) && changes < changeLimit && randInt(3) === 0) {
            CView.text("\n\nSomething invisible brushes against your " + describeNipple(character, character.body.chest.firstRow) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            character.effects.removeByName(EffectType.BlackNipples);
        }
        // Debugcunt
        if (changes < changeLimit && randInt(3) === 0 && character.body.vaginas.get(0)!.type === 5 && character.body.vaginas.length > 0) {
            CView.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            character.body.vaginas.get(0)!.type = 0;
            changes++;
        }
        if (randInt(3) === 0) CView.text(displayModFem(character, 79, 3));
        if (randInt(3) === 0) CView.text(displayModThickness(character, 70, 4));
        if (randInt(5) === 0) CView.text(displayModTone(character, 10, 5));
    }
}
