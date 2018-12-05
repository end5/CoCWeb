import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { EarType } from 'Game/Character/Body/Ears';
import { SkinType } from 'Game/Character/Body/Skin';
import { Tail, TailType } from 'Game/Character/Body/Tail';
import { VaginaType } from 'Game/Character/Body/Vagina';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { numToCardinalText } from 'Game/Utilities/NumToText';
import { ItemDesc } from '../ItemDesc';
import { skinFurScales, describeSkin } from 'Game/Descriptors/SkinDescriptor';
import { describeHair } from 'Game/Descriptors/HairDescriptor';
import { describeVagina } from 'Game/Descriptors/VaginaDescriptor';
import { describeNipple } from 'Game/Descriptors/BreastDescriptor';
import { CView } from 'Page/ContentView';
import { displayModFem } from 'Game/Modifiers/BodyModifier';
import { Settings } from 'Game/Settings';

export class FoxJewel extends Consumable {
    private mystic: boolean;

    public constructor(mystic: boolean) {
        if (mystic)
            super(ConsumableName.FoxJewelEnhanced, new ItemDesc("MystJwl", "a mystic jewel", "The flames within this jewel glow brighter than before, and have taken on a sinister purple hue.  It has been enhanced to increase its potency, allowing it to transform you more easily, but may have odd side-effects..."), 20);
        else
            super(ConsumableName.FoxJewel, new ItemDesc("Fox Jewel", "a fox jewel", "A shining teardrop-shaped jewel.  An eerie blue flame dances beneath the surface."));
        this.mystic = mystic;
    }

    public use(character: Character) {
        CView.clear();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (this.mystic) changeLimit += 2;
        if (character.effects.has(EffectType.HistoryAlchemist)) changeLimit++;
        if (this.mystic) CView.text("You examine the jewel for a bit, rolling it around in your hand as you ponder its mysteries.  You hold it up to the light with fascinated curiosity, watching the eerie purple flame dancing within.  Without warning, the gem splits down the center, dissolving into nothing in your hand.  As the pale lavender flames swirl around you, the air is filled with a sickly sweet scent that drips with the bitter aroma of licorice, filling you with a dire warmth.");
        else CView.text("You examine the jewel for a bit, rolling it around in your hand as you ponder its mysteries.  You hold it up to the light with fascinated curiosity, watching the eerie blue flame dancing within.  Without warning, the gem splits down the center, dissolving into nothing in your hand.  As the pale azure flames swirl around you, the air is filled with a sweet scent that drips with the aroma of wintergreen, sending chills down your spine.");

        // **********************
        // BASIC STATS
        // **********************
        // [increase Intelligence, Libido and Sensitivity]
        if (character.stats.int < 100 && changes < changeLimit && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(4) === 0))) {
            CView.text("\n\nYou close your eyes, smirking to yourself mischievously as you suddenly think of several new tricks to try on your opponents; you feel quite a bit more cunning.  The mental image of them helpless before your cleverness makes you shudder a bit, and you lick your lips and stroke yourself as you feel your skin tingling from an involuntary arousal.");
            // Raise INT, Lib, Sens. and +10 LUST
            character.stats.int += 2;
            character.stats.lib += 1;
            character.stats.sens += 2;
            character.stats.lust += 10;
            changes++;
        }
        // [decrease Strength toward 15]
        if (character.stats.str > 15 && changes < changeLimit && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(3) === 0))) {
            CView.text("\n\nYou can feel your muscles softening as they slowly relax, becoming a tad weaker than before.  Who needs physical strength when you can outwit your foes with trickery and mischief?  You tilt your head a bit, wondering where that thought came from.");
            character.stats.str += -1;
            if (character.stats.str > 70) character.stats.str += -1;
            if (character.stats.str > 50) character.stats.str += -1;
            if (character.stats.str > 30) character.stats.str += -1;
            changes++;
        }
        // [decrease Toughness toward 20]
        if (character.stats.tou > 20 && changes < changeLimit && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(3) === 0))) {
            // from 66 or less toughness
            if (character.stats.tou <= 66) CView.text("\n\nYou feel your " + skinFurScales(character) + " becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your " + skinFurScales(character) + " won't offer you much protection.");
            // from 66 or greater toughness
            else CView.text("\n\nYou feel your " + skinFurScales(character) + " becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your hide isn't quite as tough as it used to be.");
            character.stats.tou += -1;
            if (character.stats.tou > 66) character.stats.tou += -1;
            changes++;
        }
        if (this.mystic && changes < changeLimit && randInt(2) === 0 && character.stats.cor < 100) {
            if (character.stats.cor < 33) CView.text("\n\nA sense of dirtiness comes over you, like the magic of this gem is doing some perverse impropriety to you.");
            else if (character.stats.cor < 66) CView.text("\n\nA tingling wave of sensation rolls through you, but you have no idea what exactly just changed.  It must not have been that important.");
            else CView.text("\n\nThoughts of mischief roll across your consciousness, unbounded by your conscience or any concern for others.  You should really have some fun - who cares who it hurts, right?");
            character.stats.cor += 1;
        }

        // **********************
        // MEDIUM/SEXUAL CHANGES
        // **********************
        // [adjust Femininity toward 50]
        // from low to high
        // Your facial features soften as your body becomes more androgynous.
        // from high to low
        // Your facial features harden as your body becomes more androgynous.
        if (((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(4) === 0)) && changes < changeLimit && character.body.femininity !== 50) {
            CView.text(displayModFem(character, 50, 2));
            changes++;
        }
        // [decrease muscle tone toward 40]
        if (character.body.tone >= 40 && changes < changeLimit && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(4) === 0))) {
            CView.text("\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles seem less visible, and various parts of you are pleasantly softer.");
            character.body.tone -= 2 + randInt(3);
            changes++;
        }

        // [Adjust hips toward 10 � wide/curvy/flared]
        // from narrow to wide
        if (character.body.hips.rating < 10 && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(3) === 0)) && changes < changeLimit) {
            character.body.hips.rating++;
            if (character.body.hips.rating < 7) character.body.hips.rating++;
            if (character.body.hips.rating < 4) character.body.hips.rating++;
            CView.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your hips have widened nicely!");
            changes++;
        }
        // from wide to narrower
        if (character.body.hips.rating > 10 && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(3) === 0)) && changes < changeLimit) {
            character.body.hips.rating--;
            if (character.body.hips.rating > 14) character.body.hips.rating--;
            if (character.body.hips.rating > 19) character.body.hips.rating--;
            if (character.body.hips.rating > 24) character.body.hips.rating--;
            CView.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your hips have narrowed.");
            changes++;
        }

        // [Adjust hair length toward range of 16-26 � very long to ass-length]
        if ((character.body.hair.length < 16 || character.body.hair.length > 26) && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(3) === 0)) && changes < changeLimit) {
            // from short to long
            if (character.body.hair.length < 16) {
                character.body.hair.length += 3 + randInt(3);
                CView.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has lengthened, becoming " + describeHair(character) + ".");
            }
            // from long to short
            else {
                character.body.hair.length -= 3 + randInt(3);
                CView.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has shed a bit of its length, becoming " + describeHair(character) + ".");
            }
            changes++;
        }
        // [Increase Vaginal Capacity] - requires vagina, of course
        const bonusVCap = character.effects.getByName(EffectType.BonusVCapacity);
        if (character.body.vaginas.length > 0 && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(3) === 0)) && bonusVCap && bonusVCap.values.vaginalCapacity < 200 && changes < changeLimit) {
            CView.text("\n\nA gurgling sound issues from your abdomen, and you double over as a trembling ripple passes through your womb.  The flesh of your stomach roils as your internal organs begin to shift, and when the sensation finally passes, you are instinctively aware that your " + describeVagina(character, character.body.vaginas.get(0)) + " is a bit deeper than it was before.");
            if (!character.effects.has(EffectType.BonusVCapacity)) {
                character.effects.create(EffectType.BonusVCapacity);
            }
            bonusVCap.values.vaginalCapacity = 5 + randInt(10);
            changes++;
        }
        // [Vag of Holding] - rare effect, only if PC has high vaginal looseness
        else if (character.body.vaginas.length > 0 && ((this.mystic) || (!this.mystic && randInt(5) === 0)) && bonusVCap && bonusVCap.values.vaginalCapacity >= 200 && bonusVCap.values.vaginalCapacity < 8000 && changes < changeLimit) {
            CView.text("\n\nYou clutch your stomach with both hands, dropping to the ground in pain as your internal organs begin to twist and shift violently inside you.  As you clench your eyes shut in agony, you are overcome with a sudden calm.  The pain in your abdomen subsides, and you feel at one with the unfathomable infinity of the universe, warmth radiating through you from the vast swirling cosmos contained within your womb.");
            if (Settings.silly()) CView.text("  <b>Your vagina has become a universe unto itself, capable of accepting colossal insertions beyond the scope of human comprehension!</b>");
            else CView.text("  <b>Your vagina is now capable of accepting even the most ludicrously sized insertions with no ill effects.</b>");
            bonusVCap.values.vaginalCapacity = 8000;
            changes++;
        }

        // **********************
        // BIG APPEARANCE CHANGES
        // **********************
        // [Grow Fox Tail]
        if (!character.body.tails.reduce(Tail.HasType(TailType.FOX), false) && changes < changeLimit && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(4) === 0))) {
            // if PC has no tail
            if (character.body.tails.length >= 1) {
                CView.text("\n\nA pressure builds on your backside.  You feel under your " + character.inventory.armor.displayName + " and discover a strange nodule growing there that seems to be getting larger by the second.  With a sudden flourish of movement, it bursts out into a long and bushy tail that sways hypnotically, as if it has a mind of its own.  <b>You now have a fox-tail.</b>");
            }
            // if PC has another type of tail
            else {
                CView.text("\n\nPain lances through your lower back as your tail shifts and twitches violently.  With one final aberrant twitch, it fluffs out into a long, bushy fox tail that whips around in an almost hypnotic fashion.  <b>You now have a fox-tail.</b>");
            }
            const newTail = new Tail();
            newTail.type = TailType.FOX;
            character.body.tails.add(newTail);
            changes++;
        }
        const foxTailCount = character.body.tails.filter(Tail.FilterType(TailType.FOX)).length;
        if (!this.mystic && character.body.ears.type === EarType.FOX && foxTailCount === 8 && randInt(3) === 0) {
            CView.text("\n\nYou have the feeling that if you could grow a ninth tail you would be much more powerful, but you would need to find a way to enhance one of these gems or meditate with one to have a chance at unlocking your full potential.");
        }
        // [Grow Addtl. Fox Tail]
        // (rare effect, up to max of 8 tails, requires PC level and int*10 = number of tail to be added)
        else if (foxTailCount < 8 &&
            foxTailCount + 1 <= character.stats.level &&
            foxTailCount + 1 <= character.stats.int / 10 &&
            changes < changeLimit &&
            ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(3) === 0))
        ) {
            // if PC has 1 fox tail
            if (foxTailCount === 1) {
                CView.text("\n\nA tingling pressure builds on your backside, and your bushy tail begins to glow with an eerie, ghostly light.  With a crackle of electrical energy, your tail splits into two!  <b>You now have a pair of fox-tails.</b>");
                // increment tail by 1
            }
            // else if PC has 2 or more fox tails
            else {
                CView.text("\n\nA tingling pressure builds on your backside, and your bushy tails begin to glow with an eerie, ghostly light.  With a crackle of electrical energy, one of your tails splits in two, giving you " + numToCardinalText(foxTailCount + 1) + "!  <b>You now have a cluster of " + numToCardinalText(foxTailCount + 1) + " fox-tails.</b>");
                // increment tail by 1
            }
            const newTail = new Tail();
            newTail.type = TailType.FOX;
            character.body.tails.add(newTail);
            changes++;
        }
        // [Grow 9th tail and gain Corrupted Nine-tails perk]
        else if (this.mystic && randInt(4) === 0 &&
            changes < changeLimit &&
            foxTailCount === 8 &&
            character.stats.level >= 9 &&
            character.body.ears.type === EarType.FOX &&
            character.stats.int >= 90 &&
            !character.effects.has(EffectType.CorruptedNinetails) &&
            !character.effects.has(EffectType.EnlightenedNinetails)
        ) {
            CView.text("Your bushy tails begin to glow with an eerie, ghostly light, and with a crackle of electrical energy, split into nine tails.  <b>You are now a nine-tails!  But something is wrong...  The cosmic power radiating from your body feels...  tainted somehow.  The corruption pouring off your body feels...  good.</b>");
            CView.text("\n\nYou have the inexplicable urge to set fire to the world, just to watch it burn.  With your newfound power, it's a goal that is well within reach.");
            CView.text("\n\n(Perk Gained: Corrupted Nine-tails - Grants two magical special attacks.)");
            character.effects.create(EffectType.CorruptedNinetails);
            character.stats.lib += 2;
            character.stats.lust += 10;
            character.stats.cor += 10;
            changes++;
        }

        // [Grow Fox Ears]
        if (character.body.tails.reduce(Tail.HasType(TailType.FOX), false) && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(4) === 0)) && character.body.ears.type !== EarType.FOX && changes < changeLimit) {
            // if PC has non-animal ears
            if (character.body.ears.type === EarType.HUMAN) CView.text("\n\nThe sides of your face painfully stretch as your ears morph and begin to migrate up past your hairline, toward the top of your head.  They elongate, becoming large vulpine triangles covered in bushy fur.  You now have fox ears.");
            // if PC has animal ears
            else CView.text("\n\nYour ears change shape, shifting from their current shape to become vulpine in nature.  You now have fox ears.");
            character.body.ears.type = EarType.FOX;
            changes++;
        }
        // [Change Hair Color: Golden-blonde, SIlver Blonde, White, Black, Red]
        if (((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(4) === 0)) && changes < changeLimit && character.body.hair.color !== "golden blonde" && character.body.hair.color !== "silver blonde" && character.body.hair.color !== "white" && character.body.hair.color !== "black" && character.body.hair.color !== "red") {
            const hairTemp: number = randInt(10);
            if (hairTemp === 0) character.body.hair.color = "golden blonde";
            else if (hairTemp === 1) character.body.hair.color = "silver blonde";
            else if (hairTemp <= 3) character.body.hair.color = "white";
            else if (hairTemp <= 6) character.body.hair.color = "black";
            else character.body.hair.color = "red";
            CView.text("\n\nYour scalp begins to tingle, and you gently grasp a strand, pulling it forward to check it.  Your hair has become the same " + character.body.hair.color + " as a kitsune's!");
            changes++;
        }
        // [Change Skin Type: remove fur or scales, change skin to Tan, Olive, or Light]
        if (character.body.skin.type === SkinType.FUR || character.body.skin.type === SkinType.SCALES && ((this.mystic) || (!this.mystic && randInt(2) === 0))) {
            CView.text("\n\nYou begin to tingle all over your " + describeSkin(character) + ", starting as a cool, pleasant sensation but gradually worsening until you are furiously itching all over.");
            if (character.body.skin.type === SkinType.FUR) CView.text("  You stare in horror as you pull your fingers away holding a handful of " + character.body.hair.color + " fur!  Your fur sloughs off your body in thick clumps, falling away to reveal patches of bare, " + character.body.skin.tone + " skin.");
            else if (character.body.skin.type === SkinType.SCALES) CView.text("  You stare in horror as you pull your fingers away holding a handful of dried up scales!  Your scales continue to flake and peel off your skin in thick patches, revealing the tender " + character.body.skin.tone + " skin underneath.");
            CView.text("  Your skin slowly turns raw and red under your severe scratching, the tingling sensations raising goosebumps across your whole body.  Over time, the itching fades, and your flushed skin resolves into a natural-looking ");
            character.body.skin.type = SkinType.PLAIN;
            character.body.skin.adj = "";
            character.body.skin.desc = "skin";
            if (!this.mystic && character.body.skin.tone !== "tan" && character.body.skin.tone !== "olive" && character.body.skin.tone !== "light") {
                const skinTemp: number = randInt(3);
                if (skinTemp === 0) character.body.skin.tone = "tan";
                else if (skinTemp === 1) character.body.skin.tone = "olive";
                else character.body.skin.tone = "light";
            }
            else if (this.mystic && character.body.skin.tone !== "dark" && character.body.skin.tone !== "ebony" && character.body.skin.tone !== "ashen" && character.body.skin.tone !== "sable" && character.body.skin.tone !== "milky white") {
                const skinT: number = randInt(5);
                if (skinT === 0) character.body.skin.tone = "dark";
                else if (skinT === 1) character.body.skin.tone = "ebony";
                else if (skinT === 2) character.body.skin.tone = "ashen";
                else if (skinT === 3) character.body.skin.tone = "sable";
                else character.body.skin.tone = "milky white";
            }
            CView.text(character.body.skin.tone + " complexion.");
            CView.text("  <b>You now have " + describeSkin(character) + "!</b>");
            changes++;
        }
        // Change skin tone if not changed you!
        else if (this.mystic && character.body.skin.tone !== "dark" && character.body.skin.tone !== "ebony" && character.body.skin.tone !== "ashen" && character.body.skin.tone !== "sable" && character.body.skin.tone !== "milky white" && changes < changeLimit && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(3) === 0))) {
            CView.text("\n\nYou feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  Holding an arm up to your face, you discover that <b>you now have ");
            const mtoneTemp: number = randInt(5);
            if (mtoneTemp === 0) character.body.skin.tone = "dark";
            else if (mtoneTemp === 1) character.body.skin.tone = "ebony";
            else if (mtoneTemp === 2) character.body.skin.tone = "ashen";
            else if (mtoneTemp === 3) character.body.skin.tone = "sable";
            else character.body.skin.tone = "milky white";
            CView.text(describeSkin(character) + "!</b>");
            changes++;
        }
        // Change skin tone if not changed you!
        else if (!this.mystic && character.body.skin.tone !== "tan" && character.body.skin.tone !== "olive" && character.body.skin.tone !== "light" && changes < changeLimit && ((this.mystic && randInt(2) === 0) || (!this.mystic && randInt(3) === 0))) {
            CView.text("\n\nYou feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  Holding an arm up to your face, you discover that <b>you now have ");
            const toneTemp: number = randInt(3);
            if (toneTemp === 0) character.body.skin.tone = "tan";
            else if (toneTemp === 1) character.body.skin.tone = "olive";
            else character.body.skin.tone = "light";
            CView.text(describeSkin(character) + "!</b>");
            changes++;
        }
        // [Change Skin Color: add "Tattoos"]
        // From Tan, Olive, or Light skin tones
        /*else if ((this.mystic && false && (character.body.skin.tone == "dark" || character.body.skin.tone == "ebony" || character.body.skin.tone == "ashen" || character.body.skin.tone == "sable" || character.body.skin.tone == "milky white")) || (!this.mystic && false && (character.body.skin.tone == "tan" || character.body.skin.tone == "olive" || character.body.skin.tone || "light")) && changes < changeLimit) {
            CView.text("You feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  You are caught by surprise when you are suddenly assaulted by a blinding flash issuing from areas of your skin, and when the spots finally clear from your vision, an assortment of glowing tribal tattoos adorns your " + skin(character) + ".  The glow gradually fades, but the distinctive ");
            if (this.mystic) CView.text("angular");
            else CView.text("curved");
            CView.text(" markings remain, as if etched into your skin.");
            changes++;
            //9999 - pending tats system
        }*/
        // Nipples Turn Back:
        if (character.effects.has(EffectType.BlackNipples) && changes < changeLimit && randInt(3) === 0) {
            CView.text("\n\nSomething invisible brushes against your " + describeNipple(character, character.body.chest.firstRow) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            character.effects.removeByName(EffectType.BlackNipples);
        }
        // Debugcunt
        if (changes < changeLimit && randInt(3) === 0 && character.body.vaginas.length > 0 && character.body.vaginas.get(0)!.type !== VaginaType.HUMAN) {
            CView.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            character.body.vaginas.get(0)!.type = VaginaType.HUMAN;
            changes++;
        }
        if (changes === 0) {
            CView.text("\n\nOdd.  You don't feel any different.");
        }
    }
}
