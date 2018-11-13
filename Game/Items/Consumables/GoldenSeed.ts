import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from '../../../Engine/Utilities/SMath';
import { ArmType } from '../../Body/Arms';
import { BreastRow } from '../../Body/BreastRow';
import { EarType } from '../../Body/Ears';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { Gender } from '../../Body/GenderIdentity';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import { Tail, TailType } from '../../Body/Tail';
import { Vagina, VaginaType } from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { ItemDesc } from '../ItemDesc';
import { describeFaceShort } from '../../Descriptors/FaceDescriptor';
import { describeVagina } from '../../Descriptors/VaginaDescriptor';
import { describeOneOfYourCocks, describeCocksLight } from '../../Descriptors/CockDescriptor';
import { describeHair } from '../../Descriptors/HairDescriptor';
import { describeNipple, describeBreastRow, breastCup } from '../../Descriptors/BreastDescriptor';
import { describeBallsShort, describeSack } from '../../Descriptors/BallsDescriptor';
import { describeHips } from '../../Descriptors/HipDescriptor';
import { describeButt } from '../../Descriptors/ButtDescriptor';
import { describeFeet, describeLegs } from '../../Descriptors/LegDescriptor';
import { CView } from '../../../Page/ContentView';
import { shrinkTits } from '../../Modifiers/BreastModifier';
import { displayModFem, displayModThickness } from '../../Modifiers/BodyModifier';
import { Settings } from '../../Settings';

export class GoldenSeed extends Consumable {
    private enhanced: boolean;

    // 'type' refers to the variety of seed.
    // 0 == standard.
    // 1 == enhanced - increase change limit and no pre-reqs for TF
    public constructor(enhanced: boolean) {
        if (!enhanced)
            super(ConsumableName.GoldenSeed, new ItemDesc("GoldenSeed", "a golden seed", "This seed looks and smells absolutely delicious.  Though it has an unusual color, the harpies prize these nuts as delicious treats.  Eating one might induce some physical transformations."));
        else
            super(ConsumableName.GoldenSeedEnhanced, new ItemDesc("MagSeed", "a magically-enhanced golden seed", "This seed glows with power.  It's been enhanced by Lumi to unlock its full potential, allowing it to transform you more easily."));
        this.enhanced = enhanced;
    }

    public use(character: Character) {
        let changes: number = 0;
        let changeLimit: number = 1;
        if (this.enhanced) changeLimit += 2;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(2) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // Generic eating text:
        CView.clear();
        CView.text("You pop the nut into your mouth, chewing the delicious treat and swallowing it quickly.  No wonder harpies love these things so much!");
        // ****************
        // Stats:
        // ****************
        // -Speed increase to 100.
        if (character.stats.spe < 100 && randInt(3) === 0) {
            changes++;
            if (character.stats.spe >= 75) CView.text("\n\nA familiar chill runs down your spine. Your muscles feel like well oiled machinery, ready to snap into action with lightning speed.");
            else CView.text("\n\nA chill runs through your spine, leaving you feeling like your reflexes are quicker and your body faster.");
            // Speed gains diminish as it rises.
            if (character.stats.spe < 40) character.stats.spe += .5;
            if (character.stats.spe < 75) character.stats.spe += .5;
            character.stats.spe += .5;
        }
        // -Toughness decrease to 50
        if (character.stats.tou > 50 && randInt(3) === 0 && changes < changeLimit) {
            changes++;
            if (randInt(2) === 0) CView.text("\n\nA nice, slow warmth rolls from your gut out to your limbs, flowing through them before dissipating entirely. As it leaves, you note that your body feels softer and less resilient.");
            else CView.text("\n\nYou feel somewhat lighter, but consequently more fragile.  Perhaps your bones have changed to be more harpy-like in structure?");
            character.stats.tou += -1;
        }
        // antianemone corollary:
        if (changes < changeLimit && character.body.hair.type === 4 && randInt(2) === 0) {
            // -insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            CView.text("\n\nAs you down the seed, your head begins to feel heavier.  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels soft and fluffy, almost feathery; you watch as it dissolves into many thin, feathery strands.  <b>Your hair is now like that of a harpy!</b>");
            character.body.hair.type = 1;
            changes++;
        }
        // -Strength increase to 70
        if (character.stats.str < 70 && randInt(3) === 0 && changes < changeLimit) {
            changes++;
            // (low str)
            if (character.stats.str < 40) CView.text("\n\nShivering, you feel a feverish sensation that reminds you of the last time you got sick. Thankfully, it passes swiftly, leaving slightly enhanced strength in its wake.");
            // (hi str � 50+)
            else CView.text("\n\nHeat builds in your muscles, their already-potent mass shifting slightly as they gain even more strength.");
            // Faster until 40 str.
            if (character.stats.str < 40) character.stats.str += .5;
            character.stats.str += .5;
        }
        // -Libido increase to 90
        if ((character.stats.lib < 90 || randInt(3) === 0) && randInt(3) === 0 && changes < changeLimit) {
            changes++;
            if (character.stats.lib < 90) character.stats.lib += 1;
            // (sub 40 lib)
            if (character.stats.lib < 40) {
                CView.text("\n\nA passing flush colors your " + describeFaceShort(character) + " for a second as you daydream about sex. You blink it away, realizing the item seems to have affected your libido.");
                if (character.body.vaginas.length > 0) CView.text(" The moistness of your " +  describeVagina(character, character.body.vaginas.get(0)) + " seems to agree.");
                else if (character.body.cocks.length > 0) CView.text(" The hardness of " + describeOneOfYourCocks(character) + " seems to agree.");
                character.stats.lust += 5;
            }
            // (sub 75 lib)
            else if (character.stats.lib < 75) CView.text("\n\nHeat, blessed heat, works through you from head to groin, leaving you to shudder and fantasize about the sex you could be having right now.\n\n");
            // (hi lib)
            else if (character.stats.lib < 90) CView.text("\n\nSexual need courses through you, flushing your skin with a reddish hue while you pant and daydream of the wondrous sex you should be having right now.\n\n");
            // (90+)
            else CView.text("\n\nYou groan, something about the seed rubbing your libido in just the right way to make you horny. Panting heavily, you sigh and fantasize about the sex you could be having.\n\n");
            // (fork to fantasy)
            if (character.stats.lib >= 40) {
                character.stats.lust += character.stats.lib / 5 + 10;
                // (herm � either or!)
                // Cocks!
                if (character.body.cocks.length > 0 && (character.gender !== 3 || randInt(2) === 0)) {
                    // (male 1)
                    if (randInt(2) === 0) {
                        CView.text("In your fantasy you're winging through the sky, " + describeOneOfYourCocks(character) + " already hard and drizzling with male moisture while you circle an attractive harpy's nest. Her plumage is as blue as the sky, her eyes the shining teal of the sea, and legs splayed in a way that shows you how ready she is to be bred. You fold your wings and dive, wind whipping through your " + describeHair(character) + " as she grows larger and larger. With a hard, body-slapping impact you land on top of her, plunging your hard, ready maleness into her hungry box. ");
                        if (character.body.cocks.length > 1) {
                            CView.text("The extra penis");
                            if (character.body.cocks.length > 2) CView.text("es rub ");
                            else CView.text("rubs ");
                            CView.text("the skin over her taut, empty belly, drooling your need atop her.  ");
                            CView.text("You jolt from the vision unexpectedly, finding your " + describeOneOfYourCocks(character) + " is as hard as it was in the dream. The inside of your " + character.inventory.armor.displayName + " is quite messy from all the pre-cum you've drooled. Perhaps you can find a harpy nearby to lie with.");
                        }
                    }
                    // (male 2)
                    else {
                        CView.text("In your fantasy you're lying back in the nest your harem built for you, stroking your dick and watching the sexy bird-girl spread her thighs to deposit another egg onto the pile. The lewd moans do nothing to sate your need, and you beckon for another submissive harpy to approach. She does, her thick thighs swaying to show her understanding of your needs. The bird-woman crawls into your lap, sinking down atop your shaft to snuggle it with her molten heat. She begins kissing you, smearing your mouth with her drugged lipstick until you release the first of many loads. You sigh, riding the bliss, secure in the knowledge that this 'wife' won't let up until she's gravid with another egg. Then it'll be her sister-wife's turn. The tightness of " + describeOneOfYourCocks(character) + " inside your " + character.inventory.armor.displayName + " rouses you from the dream, reminding you that you're just standing there, leaking your need into your gear.");
                    }
                }
                // Cunts!
                else if (character.body.vaginas.length > 0) {
                    // (female 1)
                    if (randInt(2) === 0) {
                        CView.text("In your fantasy you're a happy harpy mother, your womb stretched by the sizable egg it contains. The surging hormones in your body arouse you again, and you turn to the father of your children, planting a wet kiss on his slobbering, lipstick-gilt cock. The poor adventurer writhes, hips pumping futilely in the air. He's been much more agreeable since you started keeping his cock coated with your kisses. You mount the needy boy, fantasizing about that first time when you found him near the portal, in the ruins of your old camp. The feeling of your stiff nipples ");
                        if (character.body.chest.find(BreastRow.FuckableNipples)) CView.text("and pussy leaking over ");
                        else if (character.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1.5) CView.text("dripping milk inside ");
                        else CView.text("rubbing inside ");
                        CView.text("your " + character.inventory.armor.displayName + " shocks you from the dream, leaving you with nothing but the moistness of your loins for company. Maybe next year you'll find the mate of your dreams?");
                    }
                    // (female 2)
                    else {
                        CView.text("In your fantasy you're sprawled on your back, thick thighs splayed wide while you're taken by a virile male. The poor stud was wandering the desert all alone, following some map, but soon you had his bright red rod sliding between your butt-cheeks, the pointed tip releasing runnels of submission to lubricate your loins. You let him mount your pussy before you grabbed him with your powerful thighs and took off. He panicked at first, but the extra blood flow just made him bigger. He soon forgot his fear and focused on the primal needs of all males � mating with a gorgeous harpy. You look back at him and wink, feeling his knot build inside you. Your aching, tender " + describeNipple(character, character.body.chest.firstRow) + "s pull you out of the fantasy as they rub inside your " + character.inventory.armor.displayName + ". Maybe once your quest is over you'll be able to find a shy, fertile male to mold into the perfect cum-pump.");
                    }
                }
            }
        }
        // ****************
        //   Sexual:
        // ****************
        // -Grow a cunt (guaranteed if no gender)
        if (character.gender === Gender.NONE || (character.body.vaginas.length <= 0 && changes < changeLimit && randInt(3) === 0)) {
            changes++;
            // (balls)
            if (character.body.balls.count > 0) CView.text("\n\nAn itch starts behind your " + describeBallsShort(character) + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + describeSack(character) + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>");
            // (dick)
            else if (character.body.cocks.length > 0) CView.text("\n\nAn itch starts on your groin, just below your " + describeCocksLight(character) + ". You pull your manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>");
            // (neither)
            else CView.text("\n\nAn itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + character.inventory.armor.displayName + " to discover your brand new vagina, complete with pussy lips and a tiny clit.</b>");
            character.body.clit.length = 0.25;
            const newVagina = new Vagina();
            character.body.vaginas.add(newVagina);
            character.stats.sens += 10;
        }
        // -Remove extra breast rows
        if (changes < changeLimit && character.body.chest.length > 1 && randInt(3) === 0 && !Settings.hyperHappy) {
            changes++;
            const bottomBreastRow = character.body.chest.get(character.body.chest.length - 1);
            CView.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + describeBreastRow(bottomBreastRow) + " shrink down, disappearing completely into your ");
            if (character.body.chest.length >= 3) CView.text("abdomen");
            else CView.text("chest");
            CView.text(". The " + describeNipple(character, bottomBreastRow) + "s even fade until nothing but ");
            if (character.body.skin.type === SkinType.FUR) CView.text(character.body.hair.color + " " + character.body.skin.desc);
            else CView.text(character.body.skin.tone + " " + character.body.skin.desc);
            CView.text(" remains. <b>You've lost a row of breasts!</b>");
            character.stats.sens += -5;
            character.body.chest.remove(character.body.chest.length - 1);
        }
        // -Shrink tits if above DDs.
        // Cannot happen at same time as row removal
        else if (changes < changeLimit && character.body.chest.length === 1 && randInt(3) === 0 && character.body.chest.firstRow.rating >= 7 && !Settings.hyperHappy) {
            changes++;
            // (Use standard breast shrinking mechanism if breasts are under 'h')
            if (character.body.chest.firstRow.rating < 19) {
                shrinkTits(character);
            }
            // (H+)
            else {
                character.body.chest.firstRow.rating -= (4 + randInt(4));
                CView.text("\n\nYour chest pinches tight, wobbling dangerously for a second before the huge swell of your bust begins to shrink into itself. The weighty mounds jiggle slightly as they shed cup sizes like old, discarded coats, not stopping until they're " + breastCup(character.body.chest.firstRow.rating) + "s.");
            }
        }
        // -Grow tits to a B-cup if below.
        if (changes < changeLimit && character.body.chest.firstRow.rating < 2 && randInt(3) === 0) {
            changes++;
            CView.text("\n\nYour chest starts to tingle, the " + character.body.skin.desc + " warming under your " + character.inventory.armor.displayName + ". Reaching inside to feel the tender flesh, you're quite surprised when it puffs into your fingers, growing larger and larger until it settles into a pair of B-cup breasts.");
            if (character.body.chest.firstRow.rating < 1) CView.text("  <b>You have breasts now!</b>");
            character.body.chest.firstRow.rating = 2;
        }
        // ****************
        // General Appearance:
        // ****************
        // -Femininity to 85
        if (character.body.femininity < 85 && changes < changeLimit && randInt(3) === 0) {
            changes++;
            CView.text(displayModFem(character, 85, 3 + randInt(5)));
        }
        // -Skin color change � tan, olive, dark, light
        if ((character.body.skin.tone !== "tan" && character.body.skin.tone !== "olive" && character.body.skin.tone !== "dark" && character.body.skin.tone !== "light") && changes < changeLimit && randInt(5) === 0) {
            changes++;
            CView.text("\n\nIt takes a while for you to notice, but <b>");
            if (character.body.skin.type === SkinType.FUR) CView.text("the skin under your " + character.body.hair.color + " " + character.body.skin.desc);
            else CView.text("your " + character.body.skin.desc);
            CView.text(" has changed to become ");
            const randomNumber = randInt(4);
            if (randomNumber === 0) character.body.skin.tone = "tan";
            else if (randomNumber === 1) character.body.skin.tone = "olive";
            else if (randomNumber === 2) character.body.skin.tone = "dark";
            else if (randomNumber === 3) character.body.skin.tone = "light";
            CView.text(character.body.skin.tone + " colored.</b>");
        }
        // -Grow hips out if narrow.
        if (character.body.hips.rating < 10 && changes < changeLimit && randInt(3) === 0) {
            CView.text("\n\nYour gait shifts slightly to accommodate your widening " + describeHips(character) + ". The change is subtle, but they're definitely broader.");
            character.body.hips.rating++;
            changes++;
        }
        // -Narrow hips if crazy wide
        if (character.body.hips.rating >= 15 && changes < changeLimit && randInt(3) === 0) {
            CView.text("\n\nYour gait shifts inward, your " + describeHips(character) + " narrowing significantly. They remain quite thick, but they're not as absurdly wide as before.");
            character.body.hips.rating--;
            changes++;
        }
        // -Big booty
        if (character.body.butt.rating < 8 && changes < changeLimit && randInt(3) === 0) {
            character.body.butt.rating++;
            changes++;
            CView.text("\n\nA slight jiggle works through your rear, but instead of stopping it starts again. You can actually feel your " + character.inventory.armor.displayName + " being filled out by the growing cheeks. When it stops, you find yourself the proud owner of a " + describeButt(character) + ".");
        }
        // -Narrow booty if crazy huge.
        if (character.body.butt.rating >= 14 && changes < changeLimit && randInt(4) === 0) {
            changes++;
            character.body.butt.rating--;
            CView.text("\n\nA feeling of tightness starts in your " + describeButt(character) + ", increasing gradually. The sensation grows and grows, but as it does your center of balance shifts. You reach back to feel yourself, and sure enough your massive booty is shrinking into a more manageable size.");
        }
        // -Body thickness to 25ish
        if (character.body.thickness > 25 && changes < changeLimit && randInt(3) === 0) {
            CView.text(displayModThickness(character, 25, 3 + randInt(4)));
            changes++;
        }
        // Remove odd eyes
        if (changes < changeLimit && randInt(5) === 0 && character.body.eyes.type > EyeType.HUMAN) {
            if (character.body.eyes.type === EyeType.BLACK_EYES_SAND_TRAP) {
                CView.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                CView.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + describeFeet(character) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
                if (character.body.eyes.type === EyeType.FOUR_SPIDER_EYES) CView.text("  Your multiple, arachnid eyes are gone!</b>");
                CView.text("  <b>You have normal, humanoid eyes again.</b>");
            }
            character.body.eyes.type = EyeType.HUMAN;
            changes++;
        }
        // ****************
        // Harpy Appearance:
        // ****************
        // -Harpy legs
        if (character.body.legs.type !== LegType.HARPY && changes < changeLimit && (this.enhanced || character.body.tails.reduce(Tail.HasType(TailType.HARPY), false)) && randInt(4) === 0) {
            // (biped/taur)
            if (!character.body.legs.isGoo()) CView.text("\n\nYour " + describeLegs(character) + " creak ominously a split-second before they go weak and drop you on the ground. They go completely limp, twisting and reshaping before your eyes in ways that make you wince. Your lower body eventually stops, but the form it's settled on is quite thick in the thighs. Even your " + describeFeet(character) + " have changed.  ");
            // goo
            else CView.text("\n\nYour gooey undercarriage loses some of its viscosity, dumping you into the puddle that was once your legs. As you watch, the fluid pulls together into a pair of distinctly leg-like shapes, solidifying into a distinctly un-gooey form. You've even regained a pair of feet!  ");
            character.body.legs.type = LegType.HARPY;
            changes++;
            // (cont)
            CView.text("While humanoid in shape, they have two large, taloned toes on the front and a single claw protruding from the heel. The entire ensemble is coated in " + character.body.hair.color + " feathers from ankle to hip, reminding you of the bird-women of the mountains. <b>You now have harpy legs!</b>");
        }
        // -Feathery Tail
        if (!character.body.tails.reduce(Tail.HasType(TailType.HARPY), false) && changes < changeLimit && (this.enhanced || character.body.wings.type === WingType.FEATHERED_LARGE) && randInt(4) === 0) {
            // (tail)
            if (character.body.tails.length > 0) CView.text("\n\nYour tail shortens, folding into the crack of your " + describeButt(character) + " before it disappears. A moment later, a fan of feathers erupts in its place, fluffing up and down instinctively every time the breeze shifts. <b>You have a feathery harpy tail!</b>");
            // (no tail)
            else CView.text("\n\nA tingling tickles the base of your spine, making you squirm in place. A moment later, it fades, but a fan of feathers erupts from your " + character.body.skin.desc + " in its place. The new tail fluffs up and down instinctively with every shift of the breeze. <b>You have a feathery harpy tail!</b>");
            character.body.tails.clear();
            const newTail = new Tail();
            newTail.type = TailType.HARPY;
            character.body.tails.add(newTail);
            changes++;
        }
        // -Propah Wings
        if (character.body.wings.type === WingType.NONE && changes < changeLimit && (this.enhanced || character.body.arms.type === ArmType.HARPY) && randInt(4) === 0) {
            CView.text("\n\nPain lances through your back, the muscles knotting oddly and pressing up to bulge your " + character.body.skin.desc + ". It hurts, oh gods does it hurt, but you can't get a good angle to feel at the source of your agony. A loud crack splits the air, and then your body is forcing a pair of narrow limbs through a gap in your " + character.inventory.armor.displayName + ". Blood pumps through the new appendages, easing the pain as they fill out and grow. Tentatively, you find yourself flexing muscles you didn't know you had, and <b>you're able to curve the new growths far enough around to behold your brand new, " + character.body.hair.color + " wings.</b>");
            character.body.wings.type = WingType.FEATHERED_LARGE;
            character.body.wings.desc = "large, feathered";
            changes++;
        }
        // -Remove old wings
        if (character.body.wings.type !== WingType.FEATHERED_LARGE && character.body.wings.type > WingType.NONE && changes < changeLimit && randInt(4) === 0) {
            if (character.body.wings.type !== WingType.SHARK_FIN) CView.text("\n\nSensation fades from your " + character.body.wings.desc + " wings slowly but surely, leaving them dried out husks that break off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.");
            else CView.text("\n\nSensation fades from your large fin slowly but surely, leaving it a dried out husk that breaks off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.");
            character.body.wings.type = WingType.NONE;
            character.body.wings.desc = "non-existant";
            changes++;
        }
        // -Feathery Arms
        if (character.body.arms.type !== ArmType.HARPY && changes < changeLimit && (this.enhanced || character.body.hair.type === 1) && randInt(4) === 0) {
            CView.text("\n\nYou smile impishly as you lick the last bits of the nut from your teeth, but when you go to wipe your mouth, instead of the usual texture of your " + character.body.skin.desc + " on your lips, you feel feathers! You look on in horror while more of the avian plumage sprouts from your " + character.body.skin.desc + ", covering your forearms until <b>your arms look vaguely like wings</b>. Your hands remain unchanged thankfully. It'd be impossible to be a champion without hands! The feathery limbs might help you maneuver if you were to fly, but there's no way they'd support you alone.");
            changes++;
            character.body.arms.type = ArmType.HARPY;
        }
        // -Feathery Hair
        if (character.body.hair.type !== 1 && changes < changeLimit && (this.enhanced || character.body.face.type === FaceType.HUMAN) && randInt(4) === 0) {
            CView.text("\n\nA tingling starts in your scalp, getting worse and worse until you're itching like mad, the feathery strands of your hair tickling your fingertips while you scratch like a dog itching a flea. When you pull back your hand, you're treated to the sight of downy fluff trailing from your fingernails. A realization dawns on you - you have feathers for hair, just like a harpy!");
            character.body.hair.type = 1;
            changes++;
        }
        // -Human face
        if (character.body.face.type !== FaceType.HUMAN && changes < changeLimit && (this.enhanced || (character.body.ears.type === EarType.HUMAN || character.body.ears.type === EarType.ELFIN)) && randInt(4) === 0) {
            CView.text("\n\nSudden agony sweeps over your " + describeFaceShort(character) + ", your visage turning hideous as bones twist and your jawline shifts. The pain slowly vanishes, leaving you weeping into your fingers. When you pull your hands away you realize you've been left with a completely normal, human face.");
            character.body.face.type = FaceType.HUMAN;
            changes++;
        }
        // -Gain human ears (keep elf ears)
        if ((character.body.ears.type !== EarType.HUMAN && character.body.ears.type !== EarType.ELFIN) && changes < changeLimit && randInt(4) === 0) {
            CView.text("\n\nOuch, your head aches! It feels like your ears are being yanked out of your head, and when you reach up to hold your aching noggin, you find they've vanished! Swooning and wobbling with little sense of balance, you nearly fall a half-dozen times before <b>a pair of normal, human ears sprout from the sides of your head.</b> You had almost forgotten what human ears felt like!");
            character.body.ears.type = EarType.HUMAN;
            changes++;
        }
        if (randInt(4) === 0 && character.body.neck.gills && changes < changeLimit) {
            CView.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.body.neck.gills = false;
            changes++;
        }
        // SPECIAL:
        // Harpy Womb � All eggs are automatically upgraded to large, requires legs + tail to be harpy.
        if (!character.perks.has(PerkType.HarpyWomb) && character.body.legs.type === LegType.HARPY && character.body.tails.reduce(Tail.HasType(TailType.HARPY), false) && randInt(4) === 0 && changes < changeLimit) {
            character.perks.add(PerkType.HarpyWomb);
            CView.text("\n\nThere's a rumbling in your womb, signifying that some strange change has taken place in your most feminine area. No doubt something in it has changed to be more like a harpy. (<b>You've gained the Harpy Womb perk! All the eggs you lay will always be large so long as you have harpy legs and a harpy tail.</b>)");
            changes++;
        }
        if (changes < changeLimit && randInt(4) === 0 && ((character.body.butt.wetness > 0 && !character.perks.has(PerkType.MaraesGiftButtslut)) || character.body.butt.wetness > 1)) {
            CView.text("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            character.body.butt.wetness--;
            if (character.body.butt.looseness > 1) character.body.butt.looseness--;
            changes++;
        }
        // Nipples Turn Back:
        if (character.effects.has(StatusEffectType.BlackNipples) && changes < changeLimit && randInt(3) === 0) {
            CView.text("\n\nSomething invisible brushes against your " + describeNipple(character, character.body.chest.firstRow) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            character.effects.remove(StatusEffectType.BlackNipples);
        }
        // Debugcunt
        if (changes < changeLimit && randInt(3) === 0 && character.body.vaginas.length > 0 && character.body.vaginas.get(0)!.type !== VaginaType.HUMAN) {
            CView.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            character.body.vaginas.get(0)!.type = VaginaType.HUMAN;
            changes++;
        }
        if (changes === 0) CView.text("\n\nAside from being a tasty treat, it doesn't seem to do anything to you this time.");
    }
}
