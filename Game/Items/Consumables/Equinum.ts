import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { ArmType } from 'Game/Character/Body/Arms';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { Cock, CockType } from 'Game/Character/Body/Cock';
import { EarType } from 'Game/Character/Body/Ears';
import { EyeType } from 'Game/Character/Body/Eyes';
import { FaceType } from 'Game/Character/Body/Face';
import { Gender } from 'Game/Character/Body/GenderIdentity';
import { LegType } from 'Game/Character/Body/Legs';
import { SkinType } from 'Game/Character/Body/Skin';
import { Tail, TailType } from 'Game/Character/Body/Tail';
import { Vagina, VaginaLooseness, VaginaWetness } from 'Game/Character/Body/Vagina';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { ItemDesc } from '../ItemDesc';
import { describeCock, nounCock } from 'Game/Descriptors/CockDescriptor';
import { describeBalls, describeSack } from 'Game/Descriptors/BallsDescriptor';
import { describeVagina } from 'Game/Descriptors/VaginaDescriptor';
import { describeBreastRow, breastCup } from 'Game/Descriptors/BreastDescriptor';
import { describeFeet } from 'Game/Descriptors/LegDescriptor';
import { describeButthole } from 'Game/Descriptors/ButtDescriptor';
import { CView } from 'Page/ContentView';
import { growCock, thickenCock } from 'Game/Modifiers/CockModifier';
import { displayGoIntoHeat, displayModTone } from 'Game/Modifiers/BodyModifier';
import { displayCharacterHPChange } from 'Game/Modifiers/StatModifier';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { Settings } from 'Game/Settings';
import { gameOverMenu } from 'Game/Menus/InGame/GameOverMenu';
import { Flags } from 'Game/Flags';

export const EquinumFlags = {
    WARNED: false,
    BAD_END_COUNTER: 0,
};

Flags.set("Equinum", EquinumFlags);

export class Equinum extends Consumable {
    public constructor() {
        super(ConsumableName.Equinum, new ItemDesc("Equinum", "a vial of Equinum", "This is a long flared vial with a small label that reads, \"<i>Equinum</i>\".  It is likely this potion is tied to horses in some way."));
    }

    public warning(character: Character): void | NextScreenChoices {
        if (character.body.skin.type === SkinType.FUR && character.body.face.type === FaceType.HORSE && character.body.tails.reduce(Tail.HasType(TailType.HORSE), false) && (character.body.legs.type !== LegType.HOOFED)) {
            // WARNINGS
            // Repeat warnings
            if (EquinumFlags.WARNED && randInt(3) === 0) {
                if (EquinumFlags.BAD_END_COUNTER === 0) CView.text("<b>\n\nYou feel a creeping chill down your back as your entire body shivers, as if rejecting something foreign.  Maybe you ought to cut back on the horse potions.</b>");
                if (EquinumFlags.BAD_END_COUNTER > 0) CView.text("<b>\n\nYou wonder how many more of these you can drink before you become a horse...</b>");
                EquinumFlags.BAD_END_COUNTER = 1;
            }
            // First warning
            if (!EquinumFlags.WARNED) {
                CView.text("<b>\n\nWhile you drink the tasty potion, you realize how horse-like you already are, and wonder what else the potion could possibly change...</b>");
                EquinumFlags.WARNED = true;
            }
            // Bad End
            if (randInt(4) === 0 && EquinumFlags.WARNED) {
                // Must have been warned first...
                if (EquinumFlags.BAD_END_COUNTER > 0) {
                    // If character has dicks check for horsedicks
                    if (character.body.cocks.length > 0) {
                        // If character has horsedicks
                        if (character.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length > 0) {
                            CView.text("\n\nSoon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the potion, and the overdose starts to provoke dramatic changes in your body.  You collapse suddenly, twitching in pain as all the bones and muscles in your body break and reform. Eventually, you pass out from the strain you are put through.\n\nYou wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ");
                            if (character.gender === Gender.NONE || character.gender === Gender.HERM) CView.text("horse ");
                            if (character.gender === Gender.MALE) CView.text("stallion ");
                            if (character.gender === Gender.FEMALE) CView.text("mare ");
                            CView.text(" with beautiful " + character.body.hair.color + " " + character.body.skin.desc + " covering its body gazes back up at you.  That's you, and yet the doubt in your mind remains. Strange images fill your mind, and you feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. Your equine mind rapidly dismisses that doubt as a daydream however, and you trot away, oblivious to who you once were.\n\n");
                            CView.text("<b>One year later...</b>\n\nAs you graze upon the small plants that coat the open plains of your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on its two feet, its furless pink skin appearing beneath its clothes.  With a start, you realize you can identify the strange creatures gender.  ");
                            if (character.gender === Gender.NONE || character.gender === Gender.MALE) CView.text("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.\n\n");
                            if (character.gender === Gender.FEMALE) CView.text("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.\n\n");
                            if (character.gender === Gender.HERM) CView.text("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.\n\n");
                            CView.text("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.\n\n\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here.  Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.\n\nYou answer with an interrogative whinny.\n\n\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me complete my quest. What do you say?</i>\"\n\nInstinctively, you utter a happy and approving whinny.\n\nYou failed in your quest, losing your focus and more importantly, losing yourself.  But, even so, you found a new meaning to your life, and have a new chance to succeed where you once failed.");
                            return { next: gameOverMenu };
                        }
                    }
                    // If character has no cocks
                    else {
                        CView.text("\n\nSoon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the drink, and the overdose starts to provoke dramatic changes in your body.  You collapse suddenly, twitching in pain as all the bones and all the muscles in your body break and reform. Eventually, you pass out from the strain you are put through.\n\nYou wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ");
                        if (character.gender === Gender.NONE || character.gender === Gender.HERM) CView.text("horse ");
                        if (character.gender === Gender.MALE) CView.text("stallion ");
                        if (character.gender === Gender.FEMALE) CView.text("mare ");
                        CView.text("with beautiful " + character.body.hair.color + " " + character.body.skin.desc + " covering its body looks back at you.  That's you, and yet the doubt in your mind remains. Strange mental images fill your mind.  You feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. But your equine mind rapidly dismisses that doubt as a daydream, and you trot away, oblivious to who you once were.\n\n");
                        CView.text("<b>One year after...</b>\n\nAs you graze small plants in the open plains that became your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on two feet, its furless pink skin appearing beneath its clothes.  ");
                        if (character.gender === Gender.NONE || character.gender === Gender.MALE) CView.text("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.\n\n");
                        if (character.gender === Gender.FEMALE) CView.text("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.\n\n");
                        if (character.gender === Gender.HERM) CView.text("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.\n\n");
                        CView.text("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.\n\n\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here.  Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.\n\nYou answer with an interrogative whinny.\n\n\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me to complete my quest. What do you say?</i>\"\n\nInstictively, you utter a happy and approving whinny.\n\nYou failed in your quest, losing you focus and more importantly, losing yourself.  But, even so, you found a new meaning to your life, and have a new chance to achieve what you once failed.");
                        return { next: gameOverMenu };
                    }
                }
            }
        }
    }

    public use(character: Character) {
        const cocks = character.body.cocks;
        const vaginas = character.body.vaginas;
        const chest = character.body.chest;
        // Changes done
        let changes: number = 0;
        // Change limit
        let changeLimit: number = 1;
        // Chance to raise limit
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (character.effects.has(EffectType.HistoryAlchemist)) changeLimit++;
        // Used for randIntom chances
        // Set up output
        CView.clear();
        CView.text("You down the potion, grimacing at the strong taste.");
        // CHANCE OF BAD END - 20% if face/tail/skin/cock are appropriate.
        // If hooved bad end doesn't appear till centaured
        this.warning(character);
        // Stat changes first
        // STRENGTH
        if (randInt(2) === 0) {
            // Maxxed
            if (character.stats.str >= 60) {
                CView.text("\n\nYou feel strong enough to single-handedly pull a fully-loaded wagon.");
            }
            // NOT MAXXED
            else {
                character.stats.str += 1;
                CView.text("\n\nYour muscles clench and surge, making you feel as strong as a horse.");
                changes++;
            }
        }
        // TOUGHNESS
        if (randInt(2) === 0) {
            // MAXXED ALREADY
            if (character.stats.tou >= 75) {
                CView.text("\n\nYour body is as tough and solid as a ");
                if (character.gender === Gender.MALE || character.gender === Gender.HERM)
                    CView.text("stallion's.");
                else
                    CView.text("mare's.");
            }
            // NOT MAXXED
            else {
                character.stats.tou += 1.25;
                CView.text("\n\nYour body suddenly feels tougher and more resilient.");
                changes++;
            }
        }
        // INTELLECT
        if (randInt(3) === 0) {
            if (character.stats.int <= 5) {
                CView.text("\n\nYou let out a throaty \"Neiiiigh\" as your animalistic instincts take over.");
            }
            if (character.stats.int < 10 && character.stats.int > 5) {
                character.stats.int += -1;
                CView.text("\n\nYou smile vacantly as you drink the potion, knowing you're just a big dumb animal who loves to fuck.");
                changes++;
            }
            if (character.stats.int <= 20 && character.stats.int >= 10) {
                character.stats.int += -2;
                CView.text("\n\nYou find yourself looking down at the empty bottle in your hand and realize you haven't thought ANYTHING since your first sip.");
                changes++;
            }
            if (character.stats.int <= 30 && character.stats.int > 20) {
                character.stats.int += -3;
                CView.text("\n\nYou smile broadly as your cares seem to melt away.  A small part of you worries that you're getting dumber.");
                changes++;
            }
            if (character.stats.int <= 50 && character.stats.int > 30) {
                character.stats.int += -4;
                CView.text("\n\nIt becomes harder to keep your mind focused as your intellect diminishes.");
                changes++;
            }
            if (character.stats.int > 50) {
                character.stats.int += -5;
                CView.text("\n\nYour usually intelligent mind feels much more sluggish.");
                changes++;
            }
        }
        // -Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && character.body.arms.type === ArmType.HARPY && randInt(4) === 0) {
            CView.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + character.body.skin.desc + " behind.");
            character.body.arms.type = ArmType.HUMAN;
            changes++;
        }
        // -Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && character.body.arms.type === ArmType.SPIDER && randInt(4) === 0) {
            CView.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + character.body.skin.desc + " behind.");
            character.body.arms.type = ArmType.HUMAN;
            changes++;
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
        //
        // SEXUAL CHARACTERISTICS
        //
        // MALENESS.
        if ((character.gender === Gender.MALE || character.gender === Gender.HERM) && randInt(1.5) === 0 && changes < changeLimit) {
            // If cocks that aren't horsified!
            if ((cocks.filter(Cock.FilterType(CockType.HORSE)).length + cocks.filter(Cock.FilterType(CockType.DEMON)).length) < cocks.length) {
                // Transform a cock and store it's index value to talk about it.
                // Single cock
                let selectedCock: Cock = cocks.get(0)!;
                if (cocks.length === 1) {
                    let cockTF: boolean = false;
                    if (selectedCock.type === CockType.HUMAN) {
                        CView.text("\n\nYour " + describeCock(character, selectedCock) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.");
                        selectedCock.type = CockType.HORSE;
                        growCock(character, selectedCock, randInt(4) + 4);
                        cockTF = true;
                        character.stats.lib += 5;
                        character.stats.sens += 4;
                        character.stats.lust += 35;
                    }
                    else if (selectedCock.type === CockType.DOG) {
                        CView.text("\n\nYour " + nounCock(CockType.DOG) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + nounCock(CockType.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond it's traditional size.  You notice your knot vanishing, the extra flesh pushing more horsecock out from your sheath.  Your hands are drawn to the strange new " + nounCock(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                        selectedCock.type = CockType.HORSE;
                        growCock(character, selectedCock, randInt(4) + 4);
                        cockTF = true;
                        character.stats.lib += 5;
                        character.stats.sens += 4;
                        character.stats.lust += 35;
                    }
                    else if (selectedCock.type === CockType.TENTACLE) {
                        CView.text("\n\nYour " + describeCock(character, selectedCock) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + describeCock(character, selectedCock) + " as it flattens, flaring outwards.  Your skin folds and bunches around the base, forming an animalistic sheath.  The slick inhuman texture you recently had fades, taking on a more leathery texture.  Your hands are drawn to the strange new " + nounCock(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                        selectedCock.type = CockType.HORSE;
                        growCock(character, selectedCock, randInt(4) + 4);
                        cockTF = true;
                        character.stats.lib += 5;
                        character.stats.sens += 4;
                        character.stats.lust += 35;
                    }
                    else if (selectedCock.type !== CockType.HORSE && selectedCock.type !== CockType.DEMON) {
                        CView.text("\n\nYour " + describeCock(character, selectedCock) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + describeCock(character, selectedCock) + " as it flattens, flaring outwards.  Your skin folds and bunches around the base, forming an animalistic sheath.  The slick inhuman texture you recently had fades, taking on a more leathery texture.  Your hands are drawn to the strange new " + nounCock(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                        selectedCock.type = CockType.HORSE;
                        growCock(character, selectedCock, randInt(4) + 4);
                        cockTF = true;
                        character.stats.lib += 5;
                        character.stats.sens += 4;
                        character.stats.lust += 35;
                    }
                    if (cockTF)
                        CView.text("  <b>Your penis has transformed into a horse's!</b>");
                }
                // MULTICOCK
                else {
                    character.stats.lib += 5;
                    character.stats.sens += 4;
                    character.stats.lust += 35;
                    // Find first non horse cock
                    selectedCock = cocks.find((cock) => cock.type !== CockType.HORSE && cock.type !== CockType.DEMON)!;

                    selectedCock.type = CockType.HORSE;

                    CView.text("\n\nOne of your penises begins to feel strange.  You pull down your clothes to take a look and see the skin of your " + describeCock(character, selectedCock) + " darkening to a mottled brown and black pattern.");

                    // Already have a sheath
                    if (cocks.filter(Cock.FilterType(CockType.HORSE)).length > 1 || cocks.filter(Cock.FilterType(CockType.DOG)).length > 0)
                        CView.text("  Your sheath tingles and begins growing larger as the cock's base shifts to lie inside it.");
                    else
                        CView.text("  You feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your " + describeCock(character, selectedCock) + "'s root, tightening and pulling your " + describeCock(character, selectedCock) + " inside its depths.");
                    growCock(character, selectedCock, randInt(4) + 4);
                    CView.text("  The shaft suddenly explodes with movement, growing longer and developing a thick flared head leaking steady stream of animal-cum.");
                    CView.text("  <b>You now have a horse-cock.</b>");
                }
                // Make cock thicker if not thick already!
                if (selectedCock.thickness <= 2)
                    thickenCock(selectedCock, 1);
                changes++;
            }
            // Characters cocks are all horse-type - increase size!
            else {
                let growthAmount: number = 0;
                // single cock
                let selectedCock: Cock;
                if (cocks.length === 1) {
                    selectedCock = cocks.get(0)!;
                    growthAmount = growCock(character, selectedCock, randInt(3) + 1);
                    character.stats.sens += 1;
                    character.stats.lust += 10;
                }
                // Multicock
                else {
                    // Grow smallest cock!
                    selectedCock = cocks.sort(Cock.Smallest).get(0)!;
                    growthAmount = growCock(character, selectedCock, randInt(4) + 1);
                    character.stats.sens += 1;
                    character.stats.lust += 10;
                }
                CView.text("\n\n");
                if (growthAmount > 2) CView.text("Your " + describeCock(character, selectedCock) + " tightens painfully, inches of taut horse-flesh pouring out from your sheath as it grows longer.  Thick animal-pre forms at the flared tip, drawn out from the pleasure of the change.");
                if (growthAmount > 1 && growthAmount <= 2) CView.text("Aching pressure builds within your sheath, suddenly releasing as an inch or more of extra dick flesh spills out.  A dollop of pre beads on the head of your enlarged " + describeCock(character, selectedCock) + " from the pleasure of the growth.");
                if (growthAmount <= 1) CView.text("A slight pressure builds and releases as your " + describeCock(character, selectedCock) + " pushes a bit further out of your sheath.");
                changes++;
            }
            // Chance of thickness + daydream
            if (randInt(2) === 0 && changes < changeLimit && cocks.filter(Cock.FilterType(CockType.HORSE)).length > 0) {
                const selectedCock: Cock = cocks.sort(Cock.Thinnest).get(0)!;
                thickenCock(selectedCock, 0.5);
                CView.text("\n\nYour " + nounCock(CockType.HORSE) + " thickens inside its sheath, growing larger and fatter as your veins thicken, becoming more noticeable.  It feels right");
                if (character.stats.cor + character.stats.lib < 50)
                    CView.text(" to have such a splendid tool.  You idly daydream about cunts and pussies, your " + nounCock(CockType.HORSE) + " plowing them relentlessly, stuffing them pregnant with cum");
                if (character.stats.cor + character.stats.lib >= 50 && character.stats.cor + character.stats.lib < 80)
                    CView.text(" to be this way... You breath the powerful animalistic scent and fantasize about fucking centaurs night and day until their bellies slosh with your cum");
                if (character.stats.cor + character.stats.lib >= 75 && character.stats.cor + character.stats.lib <= 125)
                    CView.text(" to be a rutting stud.  You ache to find a mare or centaur to breed with.  Longing to spend your evenings plunging a " + nounCock(CockType.HORSE) + " deep into their musky passages, dumping load after load of your thick animal-cum into them.  You'd be happy just fucking horsecunts morning, noon, and night.  Maybe somewhere there is a farm needing a breeder..");
                if (character.stats.cor + character.stats.lib > 125)
                    CView.text(" to whinny loudly like a rutting stallion.  Your " + nounCock(CockType.HORSE) + " is perfect for fucking centaurs and mares.  You imagine the feel of plowing an equine pussy deeply, bottoming out and unloading sticky jets of horse-jizz into its fertile womb.  Your hand strokes your horsecock of its own accord, musky pre dripping from the flared tip with each stroke.  Your mind wanders to the thought of you with a harem of pregnant centaurs.");
                CView.text(".");
                if (character.stats.cor < 30) CView.text("  You shudder in revulsion at the strange thoughts and vow to control yourself better.");
                if (character.stats.cor >= 30 && character.stats.cor < 60) CView.text("  You wonder why you thought such odd things, but they have a certain appeal.");
                if (character.stats.cor >= 60 && character.stats.cor < 90) CView.text("  You relish your twisted fantasies, hoping to dream of them again.");
                if (character.stats.cor >= 90) CView.text("  You flush hotly and give a twisted smile, resolving to find a fitting subject to rape and relive your fantasies.");
                character.stats.lib += 0.5;
                character.stats.lust += 10;
            }
            // Chance of ball growth if not 3" yet
            if (randInt(2) === 0 && changes < changeLimit && character.body.balls.size <= 3 && cocks.filter(Cock.FilterType(CockType.HORSE)).length > 0) {
                if (character.body.balls.count === 0) {
                    character.body.balls.count = 2;
                    character.body.balls.size = 1;
                    CView.text("\n\nA nauseating pressure forms just under the base of your maleness.  With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle!  A moment later relief overwhelms you as the second drops into your newly formed sack.");
                    character.stats.lib += 2;
                    character.stats.lust += 5;
                }
                else {
                    character.body.balls.size++;
                    if (character.body.balls.size <= 2) CView.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + describeBalls(false, true, character) + " have grown larger than a human's.");
                    if (character.body.balls.size > 2) CView.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + describeSack(character) + ".  Walking becomes difficult as you discover your " + describeBalls(false, true, character) + " have enlarged again.");
                    character.stats.lib += 1;
                    character.stats.lust += 3;
                }
                changes++;
            }
        }
        // FEMALE
        if (character.gender === Gender.FEMALE || character.gender === Gender.HERM) {
            // Single vag
            if (vaginas.length === 1) {
                if (vaginas.get(0)!.looseness <= VaginaLooseness.GAPING && changes < changeLimit && randInt(2) === 0) {
                    CView.text("\n\nYou grip your gut in pain as you feel your organs shift slightly.  When the pressure passes, you realize your " + describeVagina(character, vaginas.get(0)) + " has grown larger, in depth AND size.");
                    vaginas.get(0)!.looseness++;
                    changes++;
                }
                if (vaginas.get(0)!.wetness <= VaginaWetness.NORMAL && changes < changeLimit && randInt(2) === 0) {
                    CView.text("\n\nYour " + describeVagina(character, vaginas.get(0)) + " moistens perceptably, giving off an animalistic scent.");
                    vaginas.get(0)!.wetness++;
                    changes++;
                }
            }
            // Multicooch
            else {
                // determine least wet
                const leastWet = vaginas.sort(Vagina.WetnessLeast).get(0)!;
                if (leastWet.wetness <= VaginaWetness.NORMAL && changes < changeLimit && randInt(2) === 0) {
                    CView.text("\n\nOne of your " + describeVagina(character, leastWet) + " moistens perceptably, giving off an animalistic scent.");
                    leastWet.wetness++;
                    changes++;
                }
                // determine smallest
                const smallest = vaginas.sort(Vagina.LoosenessLeast).get(0)!;
                if (smallest.looseness <= VaginaLooseness.GAPING && changes < changeLimit && randInt(2) === 0) {
                    CView.text("\n\nYou grip your gut in pain as you feel your organs shift slightly.  When the pressure passes, you realize one of your " + describeVagina(character, smallest) + " has grown larger, in depth AND size.");
                    smallest.looseness++;
                    changes++;
                }
            }
            if (character.effects.getByName(EffectType.Heat)!.values.lib.value.flat < 30 && randInt(2) === 0 && changes < changeLimit) {
                if (character.canGoIntoHeat()) {
                    displayGoIntoHeat(character);
                    changes++;
                }
            }

            if (!Settings.hyperHappy) {
                if (randInt(2) === 0 && changes < changeLimit) {
                    // Shrink B's!
                    // Single row
                    const selectedBreastRow = chest.firstRow;
                    if (chest.length === 1) {
                        let majorShrinkage: boolean = false;
                        // Shrink if bigger than B cups
                        if (selectedBreastRow.rating > 3) {
                            selectedBreastRow.rating--;
                            // Shrink again if huuuuge
                            if (selectedBreastRow.rating > 8) {
                                majorShrinkage = true;
                                selectedBreastRow.rating--;
                            }
                            // Talk about shrinkage
                            if (!majorShrinkage)
                                CView.text("\n\nYou feel a weight lifted from you, and realize your " + describeBreastRow(selectedBreastRow) + " have shrunk to a " + breastCup(selectedBreastRow.rating) + ".");
                            else
                                CView.text("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + breastCup(selectedBreastRow.rating) + "s.");
                            changes++;
                        }

                    }
                    // multiple
                    else {
                        let shrinkAmount: number = 0;
                        if (chest.sort(BreastRow.Largest).get(0)!.rating > 3)
                            CView.text("\n");
                        for (let index = 0; index < chest.length; index++) {
                            if (chest.get(index)!.rating > 3) {
                                chest.get(index)!.rating--;
                                shrinkAmount++;
                                CView.text("\n");
                                if (index < chest.length)
                                    CView.text("...and y");
                                else
                                    CView.text("Y");
                                CView.text("our " + describeBreastRow(chest.get(index)) + " shrink, dropping to " + breastCup(chest.get(index)!.rating) + "s.");
                            }
                        }
                        if (shrinkAmount === 2) CView.text("\nYou feel so much lighter after the change.");
                        if (shrinkAmount === 3) CView.text("\nWithout the extra weight you feel particularly limber.");
                        if (shrinkAmount >= 4) CView.text("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
                        if (shrinkAmount > 0) changes++;
                    }
                }
            }
        }
        // NON - GENDER SPECIFIC CHANGES
        // Tail -> Ears -> Fur -> Face
        // Centaur if hooved
        if (changes < changeLimit && randInt(6) === 0 && character.body.legs.type === LegType.HOOFED) {
            changes++;
            CView.text("\n\nImmense pain overtakes you as you feel your backbone snap.  The agony doesn't stop, blacking you out as your spine lengthens, growing with new flesh from your backside as the bones of your legs flex and twist.  Muscle groups shift and rearrange themselves as the change completes, the pain dying away as your consciousness returns.  <b>You now have the lower body of a centaur</b>.");
            if (character.gender > 0) {
                CView.text("  After taking a moment to get used to your new body, you notice that your genitals now reside between the back legs on your centaur body.");
            }
            character.stats.spe += 3;
            character.body.legs.type = LegType.CENTAUR;
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
        // HorseFace - Req's Fur && Ears
        if (character.body.face.type !== FaceType.HORSE && character.body.skin.type === SkinType.FUR && changes < changeLimit &&
            randInt(5) === 0 && character.body.ears.type === EarType.HORSE) {
            if (character.body.face.type === FaceType.DOG) CView.text("\n\nMind-numbing pain shatters through you as you feel your facial bones rearranging.  You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your dog-like characteristics with those of a horse.  <b>You now have a horse's face.</b>");
            else CView.text("\n\nMind-numbing pain shatters through you as you feel your facial bones breaking and shifting.  You clutch at yourself in agony as you feel your skin crawl and elongate under your fingers.  Eventually the pain subsides, leaving you with a face that seamlessly blends human and equine features.  <b>You have a very equine-looking face.</b>");
            changes++;
            character.body.face.type = FaceType.HORSE;
        }
        // Fur - if has horsetail && ears and not at changelimit
        if (character.body.skin.type !== SkinType.FUR && changes < changeLimit &&
            randInt(4) === 0 && character.body.tails.reduce(Tail.HasType(TailType.HORSE), false)) {
            if (character.body.skin.type === SkinType.PLAIN) CView.text("\n\nAn itchy feeling springs up over every inch of your skin.  As you scratch yourself madly, you feel fur grow out of your skin until <b>you have a fine coat of " + character.body.hair.color + "-colored fur.</b>");
            if (character.body.skin.type === SkinType.SCALES) {
                character.body.skin.desc = "fur";
                CView.text("\n\nYour " + character.body.skin.tone + " scales begin to itch insufferably.  You reflexively scratch yourself, setting off an avalanche of discarded scales.  The itching intensifies as you madly scratch and tear at yourself, revealing a coat of " + character.body.hair.color + " " + character.body.skin.desc + ".  At last the itching stops as <b>you brush a few more loose scales from your new coat of fur.</b>");
            }
            changes++;
            character.body.skin.type = SkinType.FUR;
            character.body.skin.desc = "fur";
        }
        // Ears - requires tail
        if (character.body.ears.type !== EarType.HORSE && character.body.tails.reduce(Tail.HasType(TailType.HORSE), false) && changes < changeLimit &&
            randInt(3) === 0) {
            if (character.body.ears.type === -1) CView.text("\n\nTwo painful lumps sprout on the top of your head, forming into tear-drop shaped ears, covered with short fur.  ");
            if (character.body.ears.type === EarType.HUMAN) CView.text("\n\nYour ears tug painfully on your face as they begin shifting, moving upwards to the top of your head and transforming into a upright animalistic ears.  ");
            if (character.body.ears.type === EarType.DOG) CView.text("\n\nYour ears change shape, morphing into from their doglike shape into equine-like ears!  ");
            if (character.body.ears.type > EarType.DOG) CView.text("\n\nYour ears change shape, morphing into teardrop-shaped horse ears!  ");
            character.body.ears.type = EarType.HORSE;
            CView.text("<b>You now have horse ears.</b>");
            changes++;
        }
        // Tail - no-prereq
        if (character.body.tails.filter(Tail.FilterType(TailType.HORSE)).length < 0 && randInt(2) === 0 && changes < changeLimit) {
            // no tail
            if (character.body.tails.length === 0) {
                CView.text("\n\nThere is a sudden tickling on your ass, and you notice you have sprouted a long shiny horsetail of the same " + character.body.hair.color + " color as your hair.");
            }
            else {
                const firstTail = character.body.tails.get(0)!;
                // if other animal tail
                if (firstTail.type > TailType.HORSE && firstTail.type <= TailType.COW) {
                    CView.text("\n\nPain lances up your " + describeButthole(character.body.butt) + " as your tail shifts and morphs disgustingly.  With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.");
                }
                // if bee/spider-butt.
                if ((firstTail.type > TailType.COW && firstTail.type < TailType.SHARK)) {
                    CView.text("\n\nYour insect-like abdomen bunches up as it begins shrinking, exoskeleton flaking off like a snake sheds its skin.  It bunches up until it is as small as a tennis ball, then explodes outwards, growing into an animalistic tail shape.  Moments later, it explodes into filaments of pain, dividing into hundreds of strands and turning into a shiny horsetail.");
                }
                if (firstTail.type >= TailType.SHARK) {
                    CView.text("\n\nPain lances up your " + describeButthole(character.body.butt) + " as your tail shifts and morphs disgustingly.  With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.");
                }
            }
            CView.text("  <b>You now have a horse-tail.</b>");
            character.body.tails.clear();
            const newTail = new Tail(TailType.HORSE);
            character.body.tails.add(newTail);
            changes++;
        }
        if (randInt(4) === 0 && character.body.neck.gills && changes < changeLimit) {
            CView.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.body.neck.gills = false;
            changes++;
        }
        if (randInt(3) === 0) CView.text(displayModTone(character, 60, 1));
        // FAILSAFE CHANGE
        if (changes === 0) {
            CView.text("\n\nInhuman vitality spreads through your body, invigorating you!\n");
            displayCharacterHPChange(character, 20);
            character.stats.lust += 3;
        }
    }
}
