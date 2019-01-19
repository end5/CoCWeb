import { Character } from 'Engine/Character/Character';
import { Flags } from 'Engine/Flags';
import { Time } from 'Engine/Utilities/Time';
import { NextScreenChoices, choiceWrap } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { SpriteName } from 'Content/Display/SpriteName';
import { randInt } from 'Engine/Utilities/SMath';
import { numToCardinalText } from 'Content/Utilities/NumToText';
import { mf } from 'Content/Descriptors/GenderDescriptor';
import { passTime } from 'Content/Scenes/PassTime';
import { CombatManager } from 'Engine/Combat/CombatManager';
import { TamanisDaughters } from './TamanisDaughters';
import { describeCocksLight, describeCock, describeCockHead, nounCock, describeOneOfYourCocks } from 'Content/Descriptors/CockDescriptor';
import { Cock, CockType } from 'Engine/Body/Cock';
import { describeLegs, describeFeet } from 'Content/Descriptors/LegDescriptor';
import { describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { describeBreastRow, describeAllBreasts, describeNipple } from 'Content/Descriptors/BreastDescriptor';
import { describeFaceShort } from 'Content/Descriptors/FaceDescriptor';
import { describeButthole, describeButt } from 'Content/Descriptors/ButtDescriptor';
import { describeVagina } from 'Content/Descriptors/VaginaDescriptor';
import { assholeOrPussy } from 'Content/Descriptors/BodyDescriptor';
import { BreastRow } from 'Engine/Body/BreastRow';
import { describeHips } from 'Content/Descriptors/HipDescriptor';
import { describeHair } from 'Content/Descriptors/HairDescriptor';
import { LegType } from 'Engine/Body/Legs';
import { EffectType } from 'Content/Effects/EffectType';
import { gameOverMenu } from 'Content/Menus/InGame/GameOverMenu';
import { SkinType } from 'Engine/Body/Skin';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';
import { TimeEvents } from 'Engine/TimeEvents';
import { FlagWomb } from 'Content/Body/Pregnancy/FlagWomb';
import { TamaniFlags, tamaniKnockUp } from './TamaniScene';
import { CeraphFlags } from 'Content/Scenes/NPCs/Ceraph';
import { ExgartuanFlags } from 'Content/Scenes/NPCs/Exgartuan';
import { infestOrgasm } from '../Mountains/Worms';
import { Encounter } from 'Content/Combat/Encounter';

export const TamanisDaughtersFlags = Flags.register("Tamani's Daughters", {
    TIMES_ENCOUNTED_TAMANIS_DAUGHTERS: 0,
    TAMANI_DAUGHTER_PREGGO_COUNTDOWN: 0,
    TAMANI_DAUGHTERS_PREGNANCY_COUNT: 0,
    TIMES_FUCKED_TAMANIS_DAUGHTERS: 0,
    TIMES_USED_CHAIR: 0,
    WOMB: new FlagWomb(),
    TAMANI_PRESENT: false  // Used to communicate between this class and TamanisDaughters.as
});

// New Status:
// +Tamani's Husband – (Still need too big loss scene and centaur version)
// --Every point in it adds to lust gain per turn vs Tamani or Tamani/wdaughters
// --Slight alteration to some scenes
// --Leads up to perk with Tamani autosexing (maybe bad end)

// Fuck Them:
// 	*Fits
// 	 *Alternate Tamani scenes directly in the event.
// 	*Doesnt Fit
// 	 *Alternate Tamani scenes directly in the event.

// Let Them:
// 	*Fits
// 	 *Tamani Is Here
// 	 *No Tamani
// 	*Doesnt Fit
// 	 *No Tamani
// 	 *Tamani is here

// Win:
// *Rape -> "Fuck Them" scenes.

// Lose:
// 	*Daughters drag PC back to caves and milking machine action ensues.
// 	*Tamani is there and hypno's the PC, then orgy ensues.

// Variables to track:
// 	Number of Daughters – Capped at 19 if PC has not yet encountered them yet.
// "Tamani" v2
// 	Times Encountered – 0 → infinity
// TamainsDaughtersFlags.TIMES_ENCOUNTED_TAMANIS_DAUGHTERS
// 	Tamani Hypno Level – increases by 1 for each hypno event.  1-4 slight lust raises, 5-9 medium lust raises, 10-19 super high lust raises, 20+ high chance of autorape with special scene.
// TamaniFlags.TAMANI_TIMES_HYPNOTISED
// 	Daughter Preg Counter – they will not return until this countdown timer is 0.  Same length as Tamani's incubation – approx 1 week.
// TamainsDaughtersFlags.TAMANI_DAUGHTER_PREGGO_COUNTDOWN
// Tamani's Daughters – Tracked every birthing.  High cum production characters will produce more //Tamani babies and thus grow the mob (and achieve bad-end) faster.
// Tamani's Daughters first arrive after #12 is born.
// Tamani's Daughters encounter is expanded after #20
// Tamani's Daughters gets much harder @ #40
// Tamani's Daughters gets nigh-impossible @ #60

TamanisDaughtersFlags.WOMB.eventSets.set(PregnancyType.PLAYER, [96, 48]);

TimeEvents.set("Tamani's Daughters", () => {
    TamanisDaughtersFlags.WOMB.update(); // Preg should be 7*24, ends at 0 to -48 --> 9*24, ends at 0
    if (TamanisDaughtersFlags.WOMB.pregnancy && TamanisDaughtersFlags.WOMB.pregnancy.incubation === 0) {
        TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS += TamanisDaughtersFlags.TAMANI_DAUGHTERS_PREGNANCY_COUNT;
        TamanisDaughtersFlags.TAMANI_DAUGHTERS_PREGNANCY_COUNT = 0;
        TamanisDaughtersFlags.WOMB.clear(); // Clear Pregnancy
    }
    // Put a cap on daughters if they havent been met yet.
    if (TamanisDaughtersFlags.TIMES_ENCOUNTED_TAMANIS_DAUGHTERS === 0 && TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS > 30) {
        TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS = 30;
    }
    // Lower daughter population by 1 every fourth day once population gets high
    if (TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS > 40 && Time.hour > 23 && Time.day % 4 === 0) {
        TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS--;
    }
});

// Prime daughter tit-size
// 12-20 – C
// 21- 40 DD
// 41 –60 E
// 30+ - F mother fucker!
function tdCup(): string {
    if (TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS < 20) return "C";
    else if (TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS < 30) return "D";
    else if (TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS < 40) return "DD";
    else if (TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS < 50) return "E";
    else if (TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS < 60) return "EE";
    return "F";
}

// ENCOUNTER:
export function encounterTamanisDaughters(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;
    TamanisDaughtersFlags.TIMES_ENCOUNTED_TAMANIS_DAUGHTERS++;

    if (TamanisDaughtersFlags.TIMES_ENCOUNTED_TAMANIS_DAUGHTERS > 0 && randInt(10) === 0) {
        TamanisDaughtersFlags.TAMANI_PRESENT = true;
        CView.text("While roaming along, you find your path ahead blocked by " + numToCardinalText(Math.floor(TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS / 4)) + " goblins.  At the forefront of the mob is Tamani");
        if (TamaniFlags.TAMANI_TIMES_HYPNOTISED >= 10) CView.text(", your wife");
        CView.text(".  You realize now that the other goblins must be your daughters.  Another crowd of small women emerges from the bushes, closing in a ring around you, preventing any chance of escape.  The largest of the younger goblin-women steps forwards, her " + tdCup() + " breasts jiggling, barely contained by the bondage ropes she has tied around herself.  She stops once she's next to her mother and Tamani explains, \"<i>I just can't keep their aching cunts at home anymore!  They're fertile adults now and they're wanting to get some experience with real dicks.  I figured you wouldn't mind helping them out a little.</i>\"\n\nWhat do you do? (Fight them off, Fuck them willingly, Let them fuck you)");
        // [Fuck Them] [Let Them] [Fight]
        return { choices: [["Fight", fightTamanisDaughters], ["Fuck Them", choiceWrap(fuckYoDaughtersHomie)], ["Let Them", choiceWrap(legTamanisDaughtersRAEPYou)]] };
    }
    TamanisDaughtersFlags.TAMANI_PRESENT = false;
    CView.text("While roaming along, you find your path ahead blocked by ");
    CView.text(numToCardinalText(Math.floor(TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS / 4)) + " goblins.  You ");
    if (player.inventory.weapon.displayName === "fists") CView.text("ready your fists ");
    else CView.text("draw your weapon ");
    CView.text("and glance around evaluating your options.   Another crowd of small women emerges from the bushes, closing in a ring around you, preventing any chance of escape.  The largest of the goblin-women steps forwards, her " + tdCup() + "-breasts jiggling, barely contained by the bondage ropes she has tied around herself.\n\n");
    // first time
    if (TamanisDaughtersFlags.TIMES_FUCKED_TAMANIS_DAUGHTERS === 0) {
        CView.text("She calls out, \"<i>We're tired of getting leftovers, so we're coming to the source.  Are you going to give us what we want?</i>\"\n\n");
        // [Fuck them] [Fight] [Play Dumb]
        return { choices: [["Fight", fightTamanisDaughters], ["Fuck Them", choiceWrap(fuckYoDaughtersHomie)], ["Play Dumb", playDumbToTamanisDaughters], ["Let Them", choiceWrap(legTamanisDaughtersRAEPYou)]] };
    }
    else {
        CView.text("She calls out, \"<i>We came back for more cream!  Come on, let's fuck again!</i>\"\n\nIt doesn't look like 'no' is a word they understand.  What do you do?</i>");
        return { choices: [["Fight", fightTamanisDaughters], ["Fuck Them", choiceWrap(fuckYoDaughtersHomie)], ["Let Them", choiceWrap(legTamanisDaughtersRAEPYou)]] };
    }
}

// [Play Dumb]
function playDumbToTamanisDaughters(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;

    CView.text("You shrug and ask, \"<i>What exactly is it you want again?  I'm not sure you have the right " + mf(player, "guy", "person") + ".</i>\"\n\n");

    // approx 33% chance at 0 int, going up the smarter you are.
    if (player.stats.int / 2 + 25 > randInt(75)) {
        CView.text("The leader looks you up and down for a moment.  Her face slowly contorts to puzzlement, then rage, \"<i>Tammi you ditz!  I thought you said this was his trail?  Come on girls, we've got a dad to hunt.</i>\"\n\n");
        if (TamanisDaughtersFlags.TIMES_ENCOUNTED_TAMANIS_DAUGHTERS > 1) CView.text("They really must not be paying much attention to what you look like.");
        return { next: passTime(1) };
    }

    CView.text("The leader stamps her foot in a fit of rage.  It would be more imposing if she wasn't three feet tall... Her eyes lock onto your crotch and she says, \"<i>Last chance.   We're getting our ");
    if (TamanisDaughtersFlags.TIMES_ENCOUNTED_TAMANIS_DAUGHTERS === 1) CView.text("first ");
    CView.text("litters one way or another!</i>\"\n\n");

    // [Fuck them] [Fight] [Let them have their way with you]
    return { choices: [["Fuck Them", choiceWrap(fuckYoDaughtersHomie)], ["Fight", fightTamanisDaughters], ["", undefined], ["Let Them", choiceWrap(legTamanisDaughtersRAEPYou)]] };
}

// [Fight Them]
function fightTamanisDaughters(player: Character): NextScreenChoices {
    CView.text("You whirl around threateningly, intent on putting Tamani's wayward brood back in their place.\n\n");
    CView.sprite(SpriteName.Tamani_Daughters); // 57;
    const tamanisDaughters = new TamanisDaughters();
    if (TamanisDaughtersFlags.TAMANI_PRESENT) {
        // (+5 mob strength)
        tamanisDaughters.stats.str += 5;
        // (+5 mob toughness)
        tamanisDaughters.stats.tou += 5;
        tamanisDaughters.stats.HP += 10;
        // (-20 mob lust)
        tamanisDaughters.stats.lust -= 20;
        // append combat desc
        // $> Don't know how to handle this yet.
        tamanisDaughters.desc.long += " <b>Tamani lurks in the back of the crowd, curvier than her brood and watching with a mixture of amusement and irritation.  She runs a hand through her pink and black hair, waiting for an opportunity to get involved...</b>";
    }
    return CombatManager.beginBattle(new Encounter(player, tamanisDaughters));
}

// (COMBAT TEXT:  You're fighting Tamani's brood.  All total, there are (x) of them spread in a loose circle around you.  Most of them have their hair dyed wild colors, and dress in little more than fetish clothing – for easy access you assume.  Some are dolled up with make-up, others have oiled their luscious forms, and a few are stopping to kiss and lick each other, putting on a show for their latest victim.  (Tamani is here as well, fighting her way to the forefront and absently massaging one of her \" + tamaniChest + \" as eyehumps your body.\")
// (Combat is 1 attack per 10 girls + 1x Tamani attack)

// [Fuck them]
function fuckYoDaughtersHomie(player: Character, inCombat?: boolean): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;
    TamanisDaughtersFlags.TIMES_FUCKED_TAMANIS_DAUGHTERS++;
    const cocks: number = player.body.cocks.length;
    const daughters: number = Math.floor(TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS / 2);

    CView.text("You shrug out of your " + player.inventory.armor.displayName + " and grab hold of ");
    if (cocks === 1) CView.text("your ");
    else CView.text("one of your ");
    CView.text(describeCocksLight(player) + ", swinging it around as it hardens, teasing the crowd of lusty bitches.\n\n");

    CView.text("\"<i>Come and get it,</i>\" you shout, strutting forwards.  The ");
    if (daughters < 12) CView.text("girls");
    else CView.text("crowd");
    CView.text(" surges forwards, mobbing you from all sides.  ");

    // Find a dick that fits
    const cockThatFits = player.body.cocks.find(Cock.CockThatFits(50));
    // (Fits)
    if (cockThatFits) {
        CView.text("You pick a random body from the crowd, impaling her on your " + describeCock(player, cockThatFits) + ".  The others crowd around, jealous of your chosen cock-sleeve.   She looks up at you, blissful as she hugs against you and grinds her tight body down, raping her virginal hole on the firmness of your " + describeCock(player, cockThatFits) + ".   The others massage your " + describeLegs(player) + ", licking and nibbling your skin as they compete to tempt you into taking them next.");
        if (TamanisDaughtersFlags.TAMANI_PRESENT) {
            CView.text("  Tamani pushes aside the smaller sluts and ");
            if (player.body.balls.count > 0) CView.text("cups your " + describeBalls(true, true, player) + ".");
            else CView.text("licks your taint.");
        }
        CView.text("\n\n");

        CView.text("In no time, the vise-like grip of her cunt and thrill of taking her virginal passage push you beyond your threshold.  You groan and pump thick loads of jism deep into the tiny twat");
        if (player.cumQ() >= 500) CView.text(", bloating her belly until she gurgles and squishes on top of you");
        CView.text(".  She falls off with her eyes crossed as her sisters scramble to take her place.");
        if (TamanisDaughtersFlags.TAMANI_PRESENT) {
            CView.text("  Tamani shoves the rest of them away and mounts you, ");
            if (player.body.tallness >= 60) CView.text("scrabbling up enough to ");
            CView.text("kiss you roughly on the lips, tasting of cherries and sweat.  Your body goes limp, dropping down onto your back as your green mistress has her way with you.\n\n");
        }
        else {
            CView.text("  Another mounts you, launching herself at you with such force that she knocks you off your " + describeFeet(player) + " and onto your back.  A hand clamps over your mouth and jams something inside while another massages your throat, forcing you to swallow it.  Numbness flows through most of your body, robbing you of strength and feeling in all but one place...\n\n");
        }

        CView.text("You're swarmed as you lie in the mud, covered head to toe in nubile young goblin flesh.  Some part of you KNOWS you're being raped, but you're so effectively drugged there really isn't anything to do but try to enjoy it.   The tight goblin-cunt wrapped around your dickflesh refuses to let it go soft, massaging it with clenching ripples of muscle.  ");
        if (TamanisDaughtersFlags.TAMANI_PRESENT) {
            CView.text("Tamani's massive jugs rest against your " + describeBreastRow(player.body.chest.get(0)) + ", bouncing and wobbling.  She crosses her arms over them and sucks on a finger, watching your expression with a mix of amusement and arousal.  She asks, \"<i>So what do you think of your daughters, sweet stuff?  They're just aching for a taste of their daddy's spunk, and it's hard to keep so many rambunctious sluts under control.</i>\"\n\n");
        }
        else CView.text("Tamani's daughter looks up at you, giggling happily while her hips vigorously abuse you.   She asks, \"<i>Do you think my cunt is tighter than mom's is?  Bet you never thought you'd be fucking one of your daughters pregnant, did you?</i>\"\n\n");

        CView.text("Such perverse thoughts, and coming from your own daughters.  ");
        if (player.stats.cor < 33) CView.text("You were supposed to save the village from corruption, not breed tiny sluts to overrun it... y");
        else if (player.stats.cor < 66) CView.text("You came here to make things better for everyone... well, at least you're helping these girls. Y");
        else CView.text("You came here to make things better, but you know you'll keep knocking up Tamani every chance you get.  It's too much fun to resist adding to the sea of green girls. Y");
        CView.text("ou moan as a drooling green cunt is pressed into your " + describeFaceShort(player) + ", smothering away any protests you might have offered.  Your tongue laps away, servicing another one of your many goblin offspring as best it can.  It plunges deep to harvest her nectar, making her soak you with juice, performing oral as if it were possessed.  Your eyes cross and you feel your release building, cresting in a wave as it prepares to dump into your ");
        if (!TamanisDaughtersFlags.TAMANI_PRESENT) CView.text("daughter");
        else CView.text("favorite goblin MILF");
        CView.text(".\n\n");

        CView.text("The pressure of orgasm spikes as the first blast takes ");
        if (!TamanisDaughtersFlags.TAMANI_PRESENT) CView.text("your goblin daughter");
        else CView.text("Tamani");
        CView.text(" in her waiting womb, painting her walls white.  Each successive glob mixes into the slurry of sexual fluids brewing in her slit, until it starts to dribble out.  The goblin on your face cums noisily, filling your mouth with female moisture.   With no other choice, you swallow it down while your tongue keeps trying to pleasure her.  A sudden void of sensation and cold air overtakes your " + describeCock(player, cockThatFits) + " as you hear the goblins squabbling.  In no time flat a fresh cunt is squeezing over your still-orgasming member, clamping down to form a tight seal as you pump it full of even more fertile seed.\n\n");

        // (Go to End if < 10 daughters), else keep goin
        if (daughters > 10) {
            CView.text("As your orgasm trails off, your green cock-sleeve is removed.  You sigh happily, glad the ordeal is over.  Your " + describeCock(player, player.body.cocks.get(0)) + " manages to continue to throb, and you wonder just how long you'll have to wait for the goblin drugs to wear off.  The answer comes sooner than you think, in the form of a large vial of sweet-tasting liquid.  Your nose is pinched shut by a teal hand and your throat is massaged until you swallow the entire thing.  The result is immediate.  Slight shakes work their way through your body as it reacts to the corrupted drugs.  ");
            if (player.body.balls.count > 0) CView.text("Your balls visibly puff up and slosh as one of your daughters plays with them, filling with more seed than ever before.");
            else CView.text("Your gut clenches painfully as something inside puffs up.  Pressure builds at the base of your cock and you realize somehow you're more full of cum than ever before.");
            CView.text("\n\n");

            if (TamanisDaughtersFlags.TAMANI_PRESENT) {
                CView.text("Tamani pushes the slut on your face off and plants herself there, smearing your " + describeFaceShort(player) + " with a mixture of cum and vaginal wetness.  ");
                if (TamaniFlags.TAMANI_WOMB.isPregnant()) {
                    CView.text("She rubs her pregnancy swollen belly");
                }
                else CView.text("She fondles her nipples");
                CView.text(" and moans as she grinds against you, \"<i>Ahh, you're going to have so many more daughters!  You realize if you keep cumming into them like this, I'll never be able to restrain them all.  So if you don't want to be gang-raped by your daughters like this you should probably stop orgasming, ok?  Just don't cream any more dripping virginal cunts.</i>\"\n\n");
            }
            // Else:
            else {
                CView.text("The first daughter to take your seed climbs onto your face and plants herself there, smearing your " + describeFaceShort(player) + " with a mixture of cum and vaginal wetness.  She pinches her budding chest and grinds on top of you, asking, \"<i>You realize I'm going to be pregnant don't you?  I can already feel your little swimmers tickling all my eggs.  Can you imagine what I'll look like in a few days?  With bigger tits leaking milk and my belly stuffed with offspring?  Just let your dick do the thinking and keep cumming until we're all stuffed, ok?  Don't hold back now, we're just aching for more!</i>\"\n\n");
            }

            CView.text("The perverse thoughts get to you, worming their way inside you until they reach your " + describeCock(player, cockThatFits) + ".  It clenches and explodes, packing the slut's womb with cream.  She's lifted off by her sisters, and your next blast fires into the air, splattering over the assembled goblins with a wet plop.  Many gather it up, licking and slurping it, or shoveling it directly into their waiting cunts.  Another pussy is placed on you, and the sensation of new flesh taking you makes the contraction feel even longer.  She staggers off a few moments later, looking pregnant already.  The cycle repeats until");
            if (daughters < 20) CView.text(" the majority ");
            else CView.text(" half ");
            CView.text("of the girls have spooge-slicked cunts and big grins.\n\n");

            CView.text("As your ");
            if (player.body.balls.count > 0) CView.text(describeBalls(true, true, player) + " empty");
            else CView.text("prostate empties");
            CView.text(", one of the girls wanders over and asks, \"<i>How does it feel knowing your daughter is pregnant with even more children? Does it turn you on, <b>Daddy</b>?</i>\"\n\n");

            // (Go to end unless daughters > 20)
            if (daughters > 20) {
                CView.text("You lie there, feeling like an empty husk.  The crowd starts to disperse");
                if (TamanisDaughtersFlags.TAMANI_PRESENT) CView.text(" while Tamani walks away");
                CView.text(", but a few of the little sluts don't look satisfied yet.  They crowd around.  One straddles your chest and begins dancing in an erotic display.  Somehow, your " + describeCock(player, cockThatFits) + " still manages to twitch weakly in response.  Another goblin opens a satchel and pulls out some fruit and a canteen.  She delicately begins feeding you, clearing wanting you to regain your strength.  It seems they aren't finished with you yet.  You down what feels like gallons of water, and then find yourself presented with another flask of pink goo.  Shrugging, you gulp it down willingly, enjoying the sensation of your " + describeCock(player, player.body.cocks.get(0)) + " re-inflating to its maximum, turgid size.\n\n");

                CView.text("Sighing happily, you lie there as the remainder of your daughters take you, fucking you one after another.  The whole time you don't stop eating, converting all of the girl's rations into gallons of baby batter.  Your daughters don't seem to mind, and take turns posing sexily and feeding you while they take turns riding your pole until they're bloating and pregnant.  By the time the last one rises up on shaky legs, you're exhausted and your eyes are drifting closed.  ");
                if (daughters < 50) CView.text("Girlish giggles sooth you to sleep as the crowd slowly disperses.");
                else CView.text("Girlish giggles sooth you to sleep as your body caves in to its fatigue.  The last thing you hear is the biggest daughter suggesting, \"<i>We should keep daddy around all the time...</i>\"");
            }
        }
        // (Normal end)
        if (daughters <= 20) {
            CView.text("Exhausted and shaken by the ordeal, you lie there as the girls regroup, gathering any dripping seed into bottles or their puffy cunts.  Several of them blow you kisses");
            if (TamanisDaughtersFlags.TAMANI_PRESENT) CView.text(" and Tamani passionately frenches you.");
            else CView.text(".");
            CView.text("  One of them licks your sore member and says, \"<i>Thanks for all the cream!</i>\"\n\n");
        }
    }
    // [DOESNT FIT]
    else {
        CView.text("You pick a random girl from the crowd, and the others crowd around, jealous of your chosen cock-sleeve.   Her cries of excitement rapidly turn to pain when you try to push in though.  She's just too small, even for a goblin.  You set her down, disappointed, but then she lies down in the grass and spreads her legs wide.  She says, \"<i>Since you're too big for us, how about we take turns lining up on the ground while some of us suck out your sticky goop?</i>\"\n\n");

        CView.text("The idea sounds great to you.  Two of the horny sluts are already climbing forwards while their sisters lay out, pulling their vulva apart and toying with their tiny green clits.  They must be twins, because aside from their wildly different hair, their features are identical.  The paired cock-sluts both kiss your swollen " + describeCockHead(player.body.cocks.get(0)) + ", then drag their lips and tongues over your length.  At first they're working in sync, but as their efforts intensify they slowly get out of rhythm, until they're each slobbering over a different part of your " + describeCock(player, player.body.cocks.get(0)) + ".\n\n");

        if (TamanisDaughtersFlags.TAMANI_PRESENT) {
            CView.text("Tamani steps up and reaches into a pouch.  As she withdraws her hand, you get your first glimpse of her cargo.  It appears to be a massive double-ended dildo, pink and floppy.  One end is shaped like a canine, with a huge knot, while the other ends in the flared tip of a horse-cock.  Tamani grunts as she spears herself with the pointed canine side, even forcing the massive dildo's knot inside.  She releases the dildo and the horse-half bobbles imposingly in front of her, dripping pink fluids.  She grins up at you saying, \"<i>If my daughters are going to claim all your cream, I'm going to make sure you don't hold back.  You saw the knot on this thing, didn't you?  Well, it's filled with aphrodisiacs, so when I cum and clamp down on it, you'll be forced to squirt every ounce of seed into my girls.</i>\"\n\n");

            CView.text("She disappears behind you and you cringe, knowing this will probably be at least slightly uncomfortable.  ");
            if (player.body.tallness > 48) CView.text("You can hear her climbing up on something behind you, in order to get to the right height.  ");
            CView.text("Your expression of disdain is ruined when one of the sluts stretches wide and slurps your " + describeCockHead(player.body.cocks.get(0)) + " into her mouth.  Her tongue feels like heaven as it slides over your tip, and her sister works the shaft, jerking the spit-lubed monster off with fast strokes.   Your enjoyment is interrupted by a sudden intrusion at your backdoor.  The rubbery flared horse-toy presses against your " + describeButthole(player.body.butt) + ", dribbling a little bit of its strange lubricants into your backdoor as Tamani pushes it forward.   Tiny hands grab your " + describeButt(player) + " as it's pushed forward, and you have no choice but to relax and allow it inside.\n\n");

            CView.text("Half the head slips inside you, then the other, and in no time Tamani is slowly forcing it inside you.  It hurts just a little, enough to make your hips swivel forwards in a futile attempt at escape.  The goblin on your cock nearly chokes from the sudden change, though her sister gives you a wicked grin and strokes harder.  A flash of warmth squirts inside you in time with a moan from Tamani, and suddenly your body is exploding with pleasure.\n\n");

            CView.text("Cum bubbles from the first goblin's nose as she falls off you, getting a massive facial in the process.  Her twin sister happily jacks you off, aiming your tool down at the row of cunts below you.  The sticky spooge splatters into their holes, painting their toned midriffs and ample thighs with sticky whiteness as you're used like some kind of fertility sprinkler. Tamani shoves her artificial dong further into your backdoor and somehow you manage to squeeze out a few more splattering drops of whiteness for her daughters.\n\n");

            CView.text("Spent, your " + describeCock(player, player.body.cocks.get(0)) + " wilts, drooping downward as it drips the last of its seed.  Tamani seems oblivious to that fact though, and continues to violate you from behind.  You're about to reach around to dislodge the tiny anal rapist when another squirt of aphrodisiacs releases inside you, catching some of your prostate with the goop.  A torrent of blood rushes to your " + describeCock(player, player.body.cocks.get(0)) + " and you're suddenly achingly hard again.");
            if (player.body.balls.count > 0) CView.text("  Your " + describeBalls(true, true, player) + " ache from the strain, but struggle to churn up more sperm.  ");
            CView.text("A drop of pre-cum beads on the tip and you find yourself relaxing, letting Tamani slide her drug-slicked horse-cock the rest of the way into you.\n\n");
        }
        CView.text("A third goblin suddenly attacks your taint, licking between your " + describeButthole(player.body.butt) + " and ");
        if (player.body.balls.count > 0) CView.text(describeBalls(true, true, player));
        else if (player.body.vaginas.length > 0) CView.text(describeVagina(player, player.body.vaginas.get(0)));
        else CView.text("shaft");
        CView.text(" as she presses her hard nipples up against your " + describeLegs(player) + ". ");
        // (No Tamani:
        if (!TamanisDaughtersFlags.TAMANI_PRESENT) CView.text("She presses something against your backdoor and before you have a chance to react, something hot and wet is filling your " + describeButthole(player.body.butt) + ".  You look down as she pulls out a tube of pink residue, and sways with burning desire.\n\n");
        else CView.text("The feeling of the ridges and flare of Tamani's fake cock as it slides inside you makes you sway on your feet, drunk with the lust its fluids have induced.   You sway back and forth with burning desire as both of the twins caress and stroke your meat, coaxing as much pleasure from it as possible.\n\n");

        CView.text("You explode, coming harder than ever from the pressure and drugs buried against your prostate.  One of the twins, tired of waiting, pulls your " + describeCock(player, player.body.cocks.get(0)) + " over and shoves your tip against her slickened folds.  You manage to pump a thick blob of cum deep inside her before her sister snatches it away, grinding her own hungry twat against you until her entire groin is stained white.  They glare at each other, but after seemingly being sated, they return to fondling your " + describeCock(player, player.body.cocks.get(0)) + " together, using it like a hose to drench their smiling sisters with the remaining cum.\n\n");

        if (TamanisDaughtersFlags.TAMANI_PRESENT) {
            CView.text("Tamani pushes hard and screams behind you, \"<i>OH FUCK YES KNOCK THEIR LITTLE CUNTS UP!  Oooooohh...</i>\"\n\n");

            CView.text("Her voice trails off into indecipherable gibberish as her orgasm takes her.  You can feel the horse-dick shaped dildo in your ass squirting its tainted fluids into you as Tamani's cunt clenches down on its other side.  Abruptly, the entire thing slides out, and you hear Tamani collapse in the grass.  You turn around as your cock responds to the drugs again, and note that she's totally out of it, mashing her tits with both hands and trembling with short involuntary muscle spasms.\n\n");
        }
        if (!TamanisDaughtersFlags.TAMANI_PRESENT) CView.text("You're handed another bottle as t");
        else CView.text("T");
        CView.text("he girls shift position, rearranging themselves so that those who got the most love-juice are now positioned alongside you.  ");
        if (!TamanisDaughtersFlags.TAMANI_PRESENT) CView.text("You shrug and drink it, ");
        else CView.text("You begin ");
        CView.text(" feeling hornier and hornier, as ready now as you were when you got here.  Twitching, your " + describeCock(player, player.body.cocks.get(0)) + " announces its readiness to repaint these living cum-sponges.  A trio of goblin tongues slip over your shaft, and lip-gloss smeared lips worship every ounce of your life-giving rod.  One of the girls, an older one with prominent breasts, breaks off and begins to scale her way up your body.  She doesn't stop until she's sitting on your shoulders with her hot messy cunt pressed against your face.\n\n");

        CView.text("One of the girls on your " + describeCock(player, player.body.cocks.get(0)) + " gets an idea and mashes her tits against it you while she licks and strokes you.  The combined goblin assault once again achieves its goal, and you are brought to a body shaking orgasm AGAIN.   The swarm of goblins giggles happily as they gather your falling spunk into their waiting cunts.  What doesn't fit inside is slurped up, and soon you're covering a writhing orgy of curvy green women with a thick coat of spunk.\n\n");

        CView.text("You finish and collapse backwards, totally drained and losing consciousness.  ");
        if (daughters < 20) { }
        // (20+ daughters:
        else if (daughters < 30) {
            CView.text("A glass vial is slipped into your mouth as you lose consciousness, and you reflexively swallow.  You swear you could hear something about, \"<i>not done yet,</i>\" but you pass out.  Your dreams are far from restful, but full of pleasure.");
            player.stats.tou += -.5;
            player.stats.int += -.5;

        }
        // (30+ Daughters:
        else {
            CView.text("Vial after vial is pressed against your mouth as liquids are poured down your throat.  Your body reflexively swallows and the massive jump in arousal prevents you from totally passing out.  You can't remember much before you truly lose consciousness, but one thing that sticks in your mind is some of your daughters asking, \"<i>Why don't we just bring Daddy back to camp and then we can fuck him whenever we want?</i>\"\n\nYou passed out before you could hear the answer.");
            player.stats.tou += -.75;
            player.stats.int += -1;
            player.stats.lib += .5;

        }
    }
    player.orgasm();
    player.stats.lib += 1;
    player.stats.cor += 1;

    // Knock the bitches up, boost libido, corruption
    if (TamanisDaughtersFlags.TAMANI_PRESENT) tamaniKnockUp(player); // If she wasn't pregnant she will be now
    knockUpDaughters(player);
    player.body.cumMultiplier += .3;
    if (inCombat) return { next: passTime(1) };
    else return { next: passTime(4) };
}

// [Let them]
function legTamanisDaughtersRAEPYou(player: Character, inCombat?: boolean): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;
    TamanisDaughtersFlags.TIMES_FUCKED_TAMANIS_DAUGHTERS++;
    const cocks: number = player.body.cocks.length;
    const daughters: number = Math.floor(TamaniFlags.TAMANI_NUMBER_OF_DAUGHTERS / 2);
    // Find a dick that fits
    const cockThatFits = player.body.cocks.find(Cock.CockThatFits(50));

    CView.text("Knowing full well that a ");
    if (daughters > 20) CView.text("large ");
    CView.text("crowd of goblins isn't going to let you leave while you still have a drop of sperm in your body, you disrobe and walk into their midst, lying down in a soft mossy patch and giving yourself up to the horde completely.  In an instant you're smothered in a sea of supple green flesh, and caressed from head to toe.  The largest of the group is happily stroking ");
    if (cocks > 1) CView.text("one of ");
    CView.text(" your " + describeCocksLight(player) + ", teasing you as it near-instantly rises, \"<i>Mommy never told me you were such an easy " + mf(player, "man-", "") + "slut.</i>\"\n\n");

    CView.text("A slippery gash mounts your " + describeFaceShort(player) + ", blocking your view of anything but a cute navel as pungent pussy slobbers over your lips.  With a resigned sigh, you open your mouth and bury your tongue into one of your many daughters' snatches.  It's tangy and sweet, and juicier than fresh fruit.   The girlish moans you hear let you know how successful your tongue is, and you work harder than ever to kiss and lick her slippery lips, pausing only to suck the tiny bud of her clit into your mouth.\n\n");

    CView.text("Through it all the other girls stay busy, Tamani's eldest daughter gets most of your attention while she continues  to stroke you off.  She squeezes and caresses it until your member is trembling in her hand, ready to explode.\n\n");
    // (FORK BETWEEN TOO BIG AND FITS)
    // [FITS]
    if (cockThatFits) {
        CView.text("Effortlessly, she straddles you and guides the entire length of your rod into her honeypot.  Amazingly the tiny girl is able to spread her cunt around you, forming a tight, but not uncomfortable, fit.  ");
        if (cocks === 2) CView.text("Another set of hands latches on to your free dick and forces herself down on top it, sitting back to back with the other lucky slut as she takes it to the hilt.  Somehow you know that if you could see beyond the tight body smothering your face, watching your daughters fuck together would push you over the edge.");
        else if (cocks > 2) CView.text("More and more hands latch onto the rest of your " + describeCocksLight(player) + ", guiding each of them into a tight cunt-hole.   If you could see around the tight body of the slut on your face, you're sure the scene on your crotch would push you over the edge.");
        else CView.text("You stiffen as a tongue suddenly presses against your " + assholeOrPussy(player) + " sliding inside and intensifying the feelings radiating down your fuck-pole until you're unable to hold on.");
        CView.text("\n\n");

        CView.text("A sudden flow of fluids soaks your " + describeFaceShort(player) + " and dribbles from your chin.  The face-riding goblin bucks like a bronco, nearly breaking your nose before the strength drains from her body and she slides off into the dirt, panting weakly.   Confronted with the sight of ");
        if (cocks > 2) CView.text("so many girls impaled on your flesh");
        else if (cocks === 2) CView.text("your daughters' whorish expressions of pleasure");
        else CView.text("the sultry gaze of Tamani's oldest daughter as she rides your " + describeCock(player, cockThatFits));
        CView.text(", you can do nothing but cum.  ");
        if (cocks > 1) CView.text("Twitching powerfully, your body unloads into the tight, fertile cum-receptacles, giving them exactly what they want.");
        else CView.text("Twitching powerfully, your body unloads into the tight, fertile cum-receptacle, giving her exactly what she wants.");
        if (player.cumQ() >= 1000) {
            CView.text("  The near-supernatural amount of spooge you produce easily bloats ");
            if (cocks === 1) CView.text("her belly until she looks a little pregnant");
            else CView.text("each of their uteruses until they look a little pregnant");
            CView.text(".");
        }
        if (cocks === 1) CView.text("  She rises up off of your wilting member, blowing you a kiss and saying, \"<i>I think you got me pregnant Daddy!</i>\"\n\n");
        else CView.text("  They rise up off your wilting members.  The eldest daughter blows you a kiss and says, \"<i>I think you got us pregnant Daddy!</i>\"\n\n");

        // TAMANI IS THERE:
        if (TamanisDaughtersFlags.TAMANI_PRESENT) {
            CView.text("Tamani shoves the cum-filled girls out of her way and looks down at you with an expression of disdain, \"<i>I swear honey, the way you act, I think your dick is already a slave to goblin-twat.</i>\"\n\n");

            CView.text("She gives ");
            if (cocks > 1) CView.text("one of ");
            CView.text("your deflating " + describeCocksLight(player) + " a playful slap, smirking when it stiffens in response, \"<i>Honestly, you're so shameful, getting hard again from such an innocent touch.  I didn't know you wanted to make our little family that much bigger.</i>\"\n\n");

            CView.text("Pantomiming a sigh, Tamani drags her finger from your ");
            if (!player.body.cocks.find(Cock.HasSheath)) CView.text("base");
            else CView.text("sheath");
            CView.text(" to the tip, giggling with mirth as her words and touches bring you to full readiness.\n\n");

            CView.text("\"<i>Well, I wouldn't be a very nice wife if I didn't let you empty your stress into my hungry cunny from time to time would I?  Here, drink this, it'll make sure we have lots of daughters,</i>\" says the goblin, shoving a flask into your hand.  You nod, made agreeable by constant touches and strokes the goblin lavishes upon your groin.  The drink goes down smoothly, disappearing into you with a few quick sips from the colored glass bottle.  It settles into your belly, radiating pleasant warmth that seeps down to your crotch while it fills your mind with fuzz.\n\n");

            CView.text("Tamani massages your ");
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating < 1) CView.text("chest");
            else CView.text(describeAllBreasts(player));
            CView.text(" as she mounts you, ");
            CView.text("squeezing her dripping wet cunt around your " + describeCock(player, cockThatFits) + ".  She explains, caressing your cheek as you start to drool, \"<i>You see, " + player.desc.name + ", this potion is a special one.  You can probably feel it now, emptying your mind and shutting down your thought processes.  That's what it's supposed to do.  You won't remember anything when I'm done either, aside from how great my pussy feels on your " + describeCock(player, cockThatFits) + "</i>.\"\n\n");

            CView.text("You drool, accepting the truth.  She's so right, there's no way you'd ever forget the feeling of hot wetness as it rubs around your shaft.  Tamani keeps talking, confidently riding you as your mind soaks up her instructions, \"<i>My hot little cunt needs filling, and your cock knows it.  It wants it.</i>\"  She leans back, allowing you a glimpse of pinkness and sticky female juices while she teases her button, \"<i>Just the sight of my pussy gets you hard and ready.  The thought of feeling that hot hole mounting you just diverts all your blood and willpower into your ready fuckstick.  You CAN'T resist my pussy.</i>\"\n\n");

            CView.text("The words she's saying stop mattering.  All that matters is how much a slave your cock is to that tight little hole, and how great it feels to give yourself over it.  Your spunk-hungry wife never shuts up, and you just lie there, listening placidly, contentedly twitching against her as orgasm approaches.  A happy smile spreads over your face as you feel your ");
            if (player.body.balls.count > 0) CView.text("balls");
            else CView.text("groin");
            CView.text(" churning with lust and desire, ready to give life to another batch of daughters for your mistress.  ");
            if (TamaniFlags.TAMANI_TIMES_HYPNOTISED < 10) CView.text("'Wait... wife... mistress?' your mind wonders, rejecting the foreign thoughts.  You look up at Tamani, confused for a moment");
            else CView.text("Yes, that sounds so right – Tamani is your wife, and it's your husbandly duty to keep her pregnant.  You dwell on that for a moment");
            CView.text(", until an orgasm wracks your body and derails your train of thought, drowning it in a sea of pleasure.\n\n");

            CView.text("She wriggles and moans as your internal muscles clench, pumping thick spurts into the goblin's womb.  A new-found sense of satisfaction and pleasure spreads through you.  It feels so good to knock Tamani up that your orgasm drags on forever, until you feel empty and exhausted.   Looking back, you realize just how much more pleasurable her box is in comparison to the other holes you've tasting in your travels, even her daughter's.  As Tamani rises up off of you, dripping with cum, the memories of everything but the sex slowly slip away, leaving behind happiness and anticipation of your next chance to fill her.\n\n");

            CView.text("Your mistress steps away, swaying her more-than ample hips from side to side as she saunters past the throng of still-hungry goblins.  You shake your head, feeling a little out of sorts, but before you get a chance to puzzle it out, ");
            if (daughters < 20) CView.text("the small pack of goblins is upon you, forcing liquids down your throat and making you fill cunt after cunt with sticky seed.");
            else if (daughters < 30) CView.text("the pack of goblin daughters is upon you, forcing potent aphrodisiacs down your throat as you're raped for hours, forced to pack cunt after cunt full of jism.");
            else CView.text("the massive group of goblins is on top of you, drugging and raping you over and over until you've had dozens of orgasms and licked off nearly as many cream-bloated sluts.");
            CView.text("  As you lie there, drugged and drained, your daughters form up in a line and kiss you, one after another, each whispering pleasantries like, \"<i>Thanks dad,</i>\" or \"<i>Yummy cum daddy,</i>\" before flouncing off, sloshing into the woods.");
            // increase hypno value
            TamaniFlags.TAMANI_TIMES_HYPNOTISED++;
            // preggo up tamani
            tamaniKnockUp(player);
        }
        // NO TAMANI:
        else {
            // (SMALL PACK)
            if (daughters < 20) {
                CView.text("The smaller girls take turns, mounting your cum-soaked rod one after another, using their hungry cunts like cum-sponges until your " + describeCock(player, cockThatFits) + " is polished with feminine fluids and cleaned of any residual jism.  After so many repeated mountings, you're hard and ready to cum again, and the horny sluts know it.   You're crammed back into each one of them, one after another in a barrage of quick fucks.  Each girl is only given a few seconds on your rod before she's pulled off by her peers and replaced by another ecstatic goblin.  While waiting for their next turn, the spare girls tease you, tweaking your " + describeNipple(player, player.body.chest.get(0)) + "s while licking your ears and whispering, \"<i>Don't cum for her, it'll be much better in my hot little box,</i>\" or, \"<i>You won't cum for that skank, will you?  Save your baby-batter for me!</i>\"\n\n");

                CView.text("Amazingly, you orgasm again.  An orgiastic squeal erupts from your " + describeCock(player, cockThatFits) + "'s current owner, breaking off into pants and gasps ");
                if (player.cumQ() < 100) CView.text("as you twitch underneath her, emptying the last of your cum inside her.");
                else if (player.cumQ() < 500) CView.text("as you twitch underneath her, pumping her full of cum, thoroughly seeding her womb with spunk.");
                else CView.text("as you twitch underneath her in powerful spasms, blasting huge gouts of cum into her waiting body until her belly is bloated with seed and it begins to squirt out around you in time with each eruption of spunk.");
                CView.text("  Disappointed moans rise up from the others as they realize they've lost the cum-lottery.   The winner, patting her belly happily, stands up, filling the air with a loud 'slurrrrrp' as her twat noisily releases your " + describeCock(player, cockThatFits) + ".");
                if (player.cumQ() >= 500) CView.text("  A few enterprising goblins gather around, gathering up the loose spunk and shoveling it into their holes.");
                CView.text("\n\n");

                CView.text("Tired from the sexual acrobatics, your daughters gather up their possessions and begin dispersing, but a few stick around to lick your " + describeCock(player, cockThatFits) + " clean and give you deep french-kisses.  Exhausted as well, you begin to doze off, but not before a girlish voice whispers in your ear, \"<i>Thanks daddy!  I'll bring your daughters back once they've grown up so you can have their cherries too.</i>\"\n\n");
            }
            // (MEDIUM PACK (or bigger))
            else {
                CView.text("The smaller girls take turns, mounting your cum-soaked rod one after another, using their hungry cunts like cum-sponges until your " + describeCock(player, cockThatFits) + " is polished with feminine fluids and cleaned of any residual jism.  After so many repeated mountings, you're hard and ready to cum again, and the horny sluts know it.   You're crammed back into each one of them, one after another in a barrage of quick fucks.  Each girl is only given a few seconds on your rod before she's pulled off by her peers and replaced by another ecstatic goblin.  While waiting for their next turn, the spare girls tease you, tweaking your " + describeNipple(player, player.body.chest.get(0)) + "s while licking your ears and whispering, \"<i>Don't cum for her, it'll be much better in my hot little box,</i>\" or, \"<i>You won't cum for that skank, will you?  Save your babby-batter for me!</i>\"\n\n");

                CView.text("Amazingly, you orgasm again.  An orgiastic squeal erupts from your " + describeCock(player, player.body.cocks.get(0)) + "'s current owner, breaking off into pants and gasps ");
                if (player.cumQ() < 100) CView.text("as you twitch underneath her, emptying the last of your cum inside her.");
                else if (player.cumQ() < 500) CView.text("as you twitch underneath her, pumping her full of cum, thoroughly seeding her womb with spunk.");
                else CView.text("as you twitch underneath her in powerful spasms, blasting huge gouts of cum into her waiting body until her belly is bloated with seed and it begins to squirt out around you in time with each eruption of spunk.");
                CView.text("  Disappointed moans rise up from the others as they realize they've lost the cum-lottery.   The winner, patting her belly happily, stands up, filling the air with a loud 'slurrrrrp' as her twat noisily releases your " + describeCock(player, cockThatFits) + ".");
                if (player.cumQ() >= 500) CView.text("A few enterprising goblins gather around, gathering up the loose spunk and shoveling it into their holes.");
                CView.text("\n\n");

                CView.text("You're exhausted from the sexual battering you've had to endure, but the giggling swarm won't let you rest.  Tiny hands pry open your jaws and force a bubbling concoction past your lips.  Another one massages your throat and you're forced to swallow the stuff.   The drug's effects are strong and immediate.  Your ");
                if (player.body.balls.count > 0) CView.text("balls begin swelling, trembling as they visibly inflate, preparing a massive load of seed.");
                else CView.text("groin shifts uncomfortably, trembling as it begins preparing a massive load of seed.");
                CView.text("  Your " + describeCocksLight(player) + " spasms, twitching as unearned pleasures fill the flesh and bring you to climax.\n\n");

                CView.text("You grunt, squirting a long rope of the stuff that splatters onto your belly.  A palpable sense of relief comes with it, though the mystery drug they've fed you immediately turns that relief back into uncomfortable fullness.  Your hips twitch and try to launch the next load, but it's intercepted by a pierced goblin-twat that slides down on top of you.  The goblin pinches her nipples and coos happily as you send squirt after squirt into her, until she's cumming loudly and her over-full twat is squirting out each time you try to pack more in.\n\n");

                CView.text("The filled goblin is pulled off by her sisters, and through your haze of artificially-induced pleasure she looks completely insensate.  Her mouth is drooling, her eyes are rolled back, and her entire body is twitching in the arms of her sisters as they lay her in the grass to recover.   Despite being exposed to the air, you're still cumming hard, and a few more ropes of cum spatter your neck and chest with goo before the next daughter climbs aboard.\n\n");

                CView.text("This goblin is riding you reverse cowgirl, grinding up and down, peeking over her shoulder to give you seductive smiles as she's fully fertilized.  Her thighs quiver and her vaginal muscles squirm around you, contracting and squeezing until it gets hard to push any more jizz inside her.  With a self-satisfied smile, she rises up off of you and helps the next of her sisters into place.\n\n");

                if (daughters < 40) {
                    CView.text("Locked in a ceaseless orgasm, you're raped by one goblin after another.  A parade of tight pink pussies and their green-skinned owners passes by you, and once each of them is dripping with white seed, they take the time for a second pass.  By the time it's over, you're raw and sore, and your ");
                    if (player.body.balls.count > 0) CView.text(describeBalls(true, true, player) + " hurt");
                    else CView.text("crotch hurts");
                    CView.text(" from having to generate such a ridiculous quantity of spooge.  The crowd of milling goblins seems much less frantic now that they've gotten what they want.  You're kissed and licked and massaged by the thankful mass, and you lose yourself to unconsciousness, still dribbling semen.");
                }
                // (LARGE PACK – as above minus last PG)
                else {
                    CView.text("Locked in a ceaseless orgasm, you're raped by one goblin after another.  A parade of tight pink pussies and their green-skinned owners passes by you, and once each of them is dripping with white seed, they take the time for a second pass.  You're raw, sore, and losing consciousness, but the huge mass of young goblins is far from done with you.  They force another potion into your throat as you lose consciousness.   Your dreams are filled with demented orgies where your dick is kept in one tight hole after another, a cruel reflection of reality.  When you awake they're gone and you're incredibly sore, but somehow still horny.  Getting dosed with so many goblin drugs in such a short time-span might not have been a good idea.");
                    // libido/cumq/corruption booster?
                    player.stats.lib += 1;
                    player.stats.cor += .5;

                    player.body.cumMultiplier += .3;
                }
            }
        }
    }
    // [NO FIT]
    else {
        // 	[No Tamani]
        if (!TamanisDaughtersFlags.TAMANI_PRESENT) {
            CView.text("Effortlessly, Tamani's daughter launches herself onto you, straddling your body as she tries to work your " + describeCock(player, player.body.cocks.get(0)) + " into her tight gash.  No matter how hard she tries, she just can't get it in.  She looks up at you in confusion and asks, \"<i>How in Marae's cunt can my Mom take this beast?</i>\"\n\n");

            CView.text("Frowning in consternation, she presses it down onto your belly and sits on top, spreading her cunt as wide as she can around the bulge your urethra makes on the underside of your " + describeCock(player, player.body.cocks.get(0)) + ".  Though you can't see her, the feeling of her starting to slide along your length is wonderfully pleasurable.  After a few moments you can feel her getting into it, leaning over and pressing her taut body and heavy breasts against you as well.  Incredibly turned on by the mental picture you're forced to form, you attack the cunt riding your " + describeFaceShort(player) + ", licking it with feverish intensity.\n\n");

            CView.text("A sudden flow of fluids soaks your " + describeFaceShort(player) + " and dribbles from your chin.  The face-riding goblin bucks like a bronco, nearly breaking your nose before the strength drains from her body and she slides off into the dirt, panting weakly.  Now freed from your juicy prison, you can see the oldest daughter as she's squeezing on your " + describeCock(player, player.body.cocks.get(0)) + ", sliding her gash and ");
            if (daughters < 20) CView.text("pert ");
            else if (daughters > 40) CView.text("heavy ");
            CView.text("breasts over every part of it.");
            if (cocks === 2) CView.text("  Another one of the petite sluts climbs aboard your " + describeCock(player, player.body.cocks.get(1)) + ", squealing happily to her sister as she joins her in riding you.");
            if (cocks > 2) {
                CView.text("  A third, wearing slutty pink make-up with platinum blonde hair, lays out across your ");
                if (cocks > 3) CView.text("remaining " + describeCocksLight(player));
                else CView.text(describeCock(player, player.body.cocks.get(2)));
                CView.text(".");
            }
            CView.text("\n\n");

            CView.text("She pivots around, placing her drooling, wet gash against your " + describeCockHead(player.body.cocks.get(0)) + " and begins vigorously jerking you off.   Her ass bounces hypnotically on your ");
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating < 1) CView.text("chest");
            else CView.text(describeAllBreasts(player));
            CView.text(", sending a fresh surge of arousal through your " + describeCocksLight(player) + ".   Another one of the girls leans down between your " + describeLegs(player) + " licking your ");
            if (player.body.balls.count > 0) CView.text("balls");
            else if (player.body.vaginas.length > 0) CView.text("pussy");
            else CView.text("taint");
            CView.text(", massaging your ");
            if (player.body.cocks.find(Cock.HasSheath)) CView.text("sheath");
            else CView.text("crotch");
            CView.text(", and the sensitive " + player.body.skin.desc + " around your crotch.   The busty girl on your " + describeCock(player, player.body.cocks.get(0)) + " teases, \"<i>Go ahead and let it out " + mf(player, "stud", "sexy") + ".  I'm tired of getting your cream second-hand, so squirt it right into my hot little cunt.</i>\"\n\n");

            if (cocks === 2) CView.text("Her sister agrees, \"<i>Yeah, I want to feel the hot cum squirting into my cunt.  Fill me full of so many babies that you make Mom jealous!</i>\"\n\n");
            else if (cocks > 2) CView.text("Her sisters agree, \"<i>Yeah, we want to feel the hot cum squirting into our cunts!  Fill us up with so many babies that Mom gets jealous!</i>\"\n\n");

            CView.text("Your body caves into their demands.  The girl between your " + describeLegs(player) + " licks hard as your muscles tense with orgasm.  ");
            // Single cock jizz scene
            if (cocks === 1) {
                CView.text("The daughter giggles and squeals as bulges of cum squeeze up your urethra, visibly shifting her tight body before squirting inside with wet, fluid noises.  Sloshing squishing noises fill the air as you submit to your jizz-devouring pack of daughters, feeding their insatiable need for sperm.  Pleasure rocks you as ");
                // Cum stuff
                if (player.cumQ() < 100) CView.text("your orgasm ends, pulsing weakly inside the sloppy goblin flesh.");
                else if (player.cumQ() < 500) CView.text("your orgasm drags on, pumping the slut up until she looks slightly pregnant.");
                else {
                    CView.text("your orgasm drags on, splattering cum everywhere as you plump up the girl until she looks pregnant.");
                    if (player.cumQ() > 1000) CView.text("  Seed gushes out her opening, actually pushing the goblin away as your orgasm splatters cum into the grass.");
                    if (player.cumQ() > 5000) CView.text("  The other goblins frolic around in the stuff, greedily shoveling it into their dripping pussies with both hands as you form a small lake of seed.");
                }
            }
            // Multi jizz scene
            else {
                CView.text("The daughters giggle and squeal as bulges of cum squeeze up your urethras, visibly shifting their tight bodies before squirting inside with wet, fluid noises.  Sloshing squishing noises fill the air as you submit to your jizz-devouring pack of daughters, feeding their insatiable need for sperm.  Pleasure rocks you as ");
                // Orgazmo
                if (player.cumQ() < 100) CView.text("your orgasm ends, pulsing weakly inside the sloppy goblin flesh.");
                else if (player.cumQ() < 500) CView.text("your orgasm drags on, pumping the sluts up till they look slightly pregnant.");
                else {
                    CView.text("your orgasm drags on, splattering cum everywhere as you plump up the girls until they look pregnant.");
                    if (player.cumQ() > 1000) CView.text("  Seed gushes out their openings, actually pushing the goblins away as your orgasm splatters cum into the grass.");
                    if (player.cumQ() > 5000) CView.text("  The other goblins frolic around in the stuff, greedily shoveling it into their dripping pussies with both hands as you form a small lake of seed.");
                }
            }
            CView.text("\n\n");

            CView.text("Spent, you lie in the dirt, twitching weakly with an exhausted grin on your face.  A goblin with a long pierced tongue kneels next to your face and gives you a long kiss, twisting her tongue around your own.  Her spit tastes almost sweet to you, and the passionate tongue-fuck has you getting hard again even as you're running out of breath.  She breaks it off, and as you gasp for air, she forces a pill into your mouth.  Knowing they'll make you swallow it one way or another, you sigh and ingest the foreign drug.  Your tongue-twisting partner licks her shiny, cock-sucking lips and says, \"<i>Mom always did say you were an eager fuck.  I even stole that pill from her – it should make you cum enough to stuff every single one of us!  I can't wait to catch the first blast in my tight little snatch!</i>\"\n\n");

            if (cocks === 1) CView.text("Y");
            else CView.text("Each of y");
            CView.text("our " + describeCocksLight(player) + " is now rock solid and beading pre-cum at the tip.  ");
            // (single)
            if (cocks === 1) CView.text("The purple-lipped cock-slut grabs your " + describeCock(player, player.body.cocks.get(0)) + " and makes a show of smearing the slippery fluid over your shaft, lubricating it as she jacks you off.  Her warm lips form a tight seal on your " + describeCockHead(player.body.cocks.get(0)) + " as the young goblin begins lapping at your pre-cum as she sucks it from your urethra.   It feels heavenly, and your " + describeHips(player) + " pump weakly into the air in an instinctive bid to enhance the sensation.");
            // (multiple)
            else {
                CView.text("The purple-lipped cock-slut grabs hold of one of your " + describeCocksLight(player) + " and makes a show of smearing the slippering fluid over the shaft, lubricating it as she begins to jack you off.  Her sisters, taking the cue, step over the other sated sluts and grab hold of your " + describeCock(player, player.body.cocks.get(1)) + ", fondling it lovingly.  ");
                if (cocks > 2) CView.text("They spread out until every one of your " + describeCocksLight(player) + " has at least one goblin hanging off it, stroking and touching you.  ");
                CView.text("It feels heavenly, and your " + describeHips(player) + " pump weakly into the air in an instinctive bid to enhance the sensation.");
            }
            CView.text("\n\n");

            CView.text("The goblin who served between the legs crawls back into position, and you realize she must be the youngest, and therefore the lowest on the goblin totem-pole.  Her eager tongue is just as skilled as it was minutes ago, and between her attentions and the tongues on your " + describeCocksLight(player) + ", you're leaking streamers of liquid lust.  Hands run over your ");
            if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating < 1) CView.text("chest");
            else CView.text(describeAllBreasts(player));
            CView.text(", circling your nipples and massaging your chest while a girlish voice whispers in your ear, \"<i>Cum for us now daddy, we've gotten so wet having to wait on you...</i>\"\n\n");

            CView.text("Ripples of convulsive pleasure wrack your midsection as you feel the muscular contractions of your orgasm threatening to tear you apart.   Your ");
            // (single)
            if (cocks === 1) CView.text(describeCock(player, player.body.cocks.get(0)) + " blasts a wave of seed directly into your cock-obsessed daughter's mouth, flooding it until she falls off of it with jism dripping from her nostrils.  You squirt a massive spurt high into the air overhead, and more than a few goblins are running around with their tongues out, trying to catch it in their mouths.   Each wave of seed is larger than the last, erupting from your " + describeCock(player, player.body.cocks.get(0)) + " like a geyser.   Soon everyone is spattered in a layer of the stuff, and your gut-clenching orgasm tapers down to a more reasonable, but constant, slow flow of semen.  Each of your daughters comes up and takes turns angling your shaft into her waiting cunt, allowing the thick fluid to fill her to capacity before waddling off.  Then the next girl does the same, and the next, and the next...");
            // (Multi)
            else CView.text(describeCocksLight(player) + " blast waves of seed directly into your cock-obsessed daughters' mouths, flooding them until they fall off with jism dripping from their nostrils.   You spurt massive loads high into the air overhead, and more than a few goblins are running around with their tongues out, trying to catch the seed in their mouths.  Each wave is larger than the last, erupting from your " + describeCocksLight(player) + " like a geyser.  Soon everyone is covered in a thick coating of the stuff, and your gut-clenching orgasm tapers down to a more reasonable, but constant, slow flow of semen.  Each of your daughters comes up and guides a shaft into her waiting cunt, filling herself to capacity with the thick fluid before waddling off.   Then the next set of girls does the same, and the next, and the next....");
            CView.text("You're done in by the effort, and quickly lose consciousness.");
        }
        // [Tamani is There]
        else {
            CView.text("A scuffle in the crowd breaks out to your right, and though you can hear it, the jiggling ass and delicious pussy of the goblin slut on your face makes it impossible to see what's going on.  You do what any horny " + mf(player, "male", "herm") + " would do in your position – groan into the slippery box and ignore it, focusing on the feel of skilled hands fondling ");
            if (cocks > 1) CView.text("each of ");
            CView.text("your " + describeCocksLight(player) + ".\n\n");

            CView.text("High pitched voices rise in pleading tones, followed by the impact of flesh on flesh.  A sultry, familiar voice clears her throat and asks, \"<i>Oh, so this is where you've been.  Tamani would've expected her husband to be in his proper place – lodged deep between her legs, rather than rewarding his ditzy daughters' misbehavior.</i>\"\n\n");

            CView.text("You sigh into the fragrant pussy, the warm air-flow turning the slippery box a dripping fountain of orgasm.   The walls clamp around your tongue, squeezing it from base to tip in a milking motion you've become intimately acquainted with.   A high pitched shriek of pleasure rises, then cuts off.  You blink away a sudden burst of light as the orgasming girl is ripped from your questing tongue, revealing the crowd of sultry bodies and Tamani's knowing smirk.\n\n");

            CView.text("\"<i>Mother always said you had to keep your men on a tight leash, and boy was she ever right – you've been cheating on Tamani!  With your own daughters!</i>\" exclaims your ");
            if (TamaniFlags.TAMANI_TIMES_HYPNOTISED >= 10) CView.text("wife");
            else CView.text("\"wife\"");
            CView.text(" in mock indignation.   She taps her chin for a moment, ignoring her daughters as they continue to lick and stroke ");
            if (cocks) CView.text("each of ");
            CView.text("your " + describeCocksLight(player) + ".  Your eyes roll back in blissful pleasure as Tamani declares, \"<i>Tamani will take care of you, husband.  You're going to cum into these girls' hungry twats until they have to waddle home, and then you're going to remember why Tamani's cunt owns your " + nounCock(CockType.HUMAN) + ", forever.</i>\"\n\n");

            CView.text("Tamani pulls out a ring gag, shoves it into your protesting mouth, and pulls the straps securely around the back of your neck.  She tousles your " + describeHair(player) + " as you squirm, but the crowd of goblins easily keeps you subdued, assisting their mother now that they know her plans.   You ");
            if (player.stats.cor > 66) CView.text("sigh, actually anticipating what's about to come");
            else if (player.stats.cor > 33) CView.text("don't resist, knowing there's no way to stop what's about to happen");
            else CView.text("shudder, struggling to pull free");
            CView.text(" as Tamani pulls out a half dozen vials and a handful of pills.  She drops the drug-filled capsules into your mouth, pouring in the potions, one at a time, to wash down her concoctions.\n\n");

            CView.text("\"<i>Ok girls, line up; Daddy's gonna start squirting for you, so grab hold of that monster he's got and hold the tip against your horny little cunts until you're full.  And don't be greedy, once you've got a puss full of seed waddle on home, ");
            if (daughters < 20) CView.text("there's other girls waiting");
            else if (daughters < 35) CView.text("we've got a lot of girls to fill up");
            else CView.text("there's a TON of you here so you'll need to move quick if you each want a turn");
            CView.text(",</i>\" commands the goblin mother.\n\n");

            CView.text("Her words are downright prophetic.  Churning, bubbling warmth floods your crotch with need as you look on, moaning.  Your back arches and your eyes cross in an involuntary reaction to your drug-induced orgasm.  Grunting, you twitch as the goblins line up, the eldest daughter grabbing home of your flexing " + describeCock(player, player.body.cocks.get(0)) + " as it begins to erupt.  Strangely, it isn't the pulsing, squirting orgasms you're used to.  Instead, a steady stream of cum washes out over the girl's abdomen as she lines up, eventually grinding her wet pussy against your straining urethra.  She giggles with lewd pleasure, grinding against your swollen " + describeCockHead(player.body.cocks.get(0)) + " as her womb is pumped full of semen.  Her belly quickly rounds out, and she's forced to step away, leaving you to soak your belly while the next of your daughters gets in position.\n\n");

            const mostLactatingMulti = player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier;
            const largestBreastRating = player.body.chest.sort(BreastRow.Largest).get(0)!.rating;
            // (MULTI)
            if (cocks > 2) {
                CView.text("Meanwhile your other " + nounCock(CockType.HUMAN) + "s are wasting their spunk over your belly, so some of the waiting girls grab them and pull them aside, ramming their tips deep inside their seemingly bottomless fuck-holes.  They giggle and run their manicured nails over your ");
                if (largestBreastRating < 1) CView.text("chest");
                else CView.text(describeAllBreasts(player));
                CView.text(", circling your sensitive nipples");
                if (mostLactatingMulti >= 1) {
                    CView.text(" as they start to ");
                    if (mostLactatingMulti < 2) CView.text("leak");
                    else if (mostLactatingMulti < 3) CView.text("drip");
                    else if (mostLactatingMulti < 5) CView.text("spew");
                    else CView.text("fountain");
                    CView.text(" milk");
                }
                CView.text(".  The perverse scene seems to feed you even more pleasure, and you feel your orgasm increase in intensity, thickening the flow of cum.\n\n");
            }
            // (SINGLE EXTRA)
            else if (cocks === 2) {
                CView.text("Meanwhile your other " + nounCock(CockType.HUMAN) + " is wasting its spunk over your belly, so one of the waiting girls grabs it and pulls it to the side, ramming its tip deep inside her seemingly bottomless fuck-hole.  She giggle and runs their manicured nails over your ");
                if (largestBreastRating < 1) CView.text("chest");
                else CView.text(describeAllBreasts(player));
                CView.text(", circling your sensitive nipples");
                if (mostLactatingMulti >= 1) {
                    CView.text(" as they start to ");
                    if (mostLactatingMulti < 2) CView.text("leak");
                    else if (mostLactatingMulti < 3) CView.text("drip");
                    else if (mostLactatingMulti < 5) CView.text("spew");
                    else CView.text("fountain");
                    CView.text(" milk");
                }
                CView.text(".  The perverse scene seems to feed you even more pleasure, and you feel your orgasm increase in intensity, thickening the flow of cum.\n\n");
            }

            CView.text("The next slut grabs your " + describeCockHead(player.body.cocks.get(0)) + " with both hands as she straddles you, pinching it tightly enough to make you wince.  The flow of white goo is pinched off, backing up painfully as she gets in position.  Just when you're about to cry, she's in position, and releases her too-tight grip.   Your body rewards the slut for her pain with a blast of seed so powerful it nearly blows her off your midsection, splattering out around her lips.  She holds on through an orgasm as you fill her depths with even more of your creamy load.  Surprisingly, she manages to take even more than her older sister, staying on until she looks a few months pregnant.  She staggers off, sloshing wetly while seed drips between her thighs.\n\n");

            CView.text("While you continue to fertilize the slutty goblin girls, Tamani is nice enough to remove your gag.  Sadly, you're too drunk with pleasure and Tamani's chemicals to do anything but pant and drool, but it was a nice gesture.  ");
            // (SMALL CROWD:
            if (daughters < 20) CView.text("The crowd of girls takes their time since there's only around a dozen or so left to fill.  They ride you long and hard, getting their wombs packed full and making a mess while they do it.  Even after all of them has been filled, Tamani's potent chemicals keep you locked in orgasm, dripping unholy amounts of semen everywhere.  A few of the more daring of your offspring take turns sliding the tip into their tight assholes, allowing you to fill them completely as the drugs finally begin to wear off.\n\n");
            // (ALT MORE GIRLZ)
            else if (daughters < 35) CView.text("The crowd of girls seems to take forever to get filled.  Every time one of them gets too into it, her mother pulls her back and guides the next willing hole into place.  In spite of the orderly procession, cum manages to get everywhere, soaking your torso and more than a few goblin thighs with a glaze of whiteness.  The whole time, you're kept in constant orgasm, though by the time you're filling the last girl with cum, the flow is slowing while the chemicals wear off.\n\n");
            // (ALT TOO MANY GIRLZ)
            else CView.text("The massive crowd is forced to carefully ration your semen, bountiful though it is.   Tamani doesn't even let the girls get completely filled, instead forcing each of them to only get a few cunt-filling moments of your orgasm.  Those who've already had a turn hang around, scooping up the sperm-filled fluid that's leaking out and shoveling it into their baby-craving bodies.  The whole time you're kept locked in incredible climax.  If you had any capacity for reason you'd probably feel more like a tool than " + mf(player, "man", "woman") + ", but the synapses of your brain are too busy firing off about how good it feels to think.  By the time the last girl gets her turn, your orgasm has trailed off to a weak flow, so she stays on until the drugs finally wear off.\n\n");

            CView.text("The soon-to-be-pregnant goblins stagger off, a bit bow-legged and generously glazed with semen.  You come down from your high, panting weakly and trembling.  Tamani wraps her arms around your head, cradling you deep into her incredible bust.  The soft skin completely envelops you in breast-flesh as her sweet, fruity scent fills your lungs with every breath.  ");
            if (TamaniFlags.TAMANI_TIMES_HYPNOTISED > 10) CView.text("She's the best wife ever.  You nuzzle deep into her cleavage, sighing happily.");
            else if (TamaniFlags.TAMANI_TIMES_HYPNOTISED > 5) CView.text("She really is a great wife... wait, wife? You shrug away the thought and enjoy slowly motorboating her breasts.");
            else CView.text("She really isn't that bad to you, is she?  You sigh and nuzzle against her jiggly love-pillows.");
            CView.text("  Eventually she pulls you back and kisses you on the lips.\n\n");

            CView.text("Tamani offers you a canteen, and you readily accept it, thirsty after such a physics-shattering orgasm.  The water is cold and satisfying.  You gulp it down in record time, chugging and guzzling until the container empties.  Satisfied, you lie back down.  The pleasure is short-lived, short-circuited by the realization that the water you just drank had a tangy after-taste.  You try to glare at ");
            if (TamaniFlags.TAMANI_TIMES_HYPNOTISED > 10) CView.text("your wife");
            else CView.text("Tamani");
            CView.text(" in anger, but your head feels all numb, and looking over at her makes the world spin dizzily.\n\n");

            CView.text("Pink haze crowds away your thoughts as your glare melts away into dopey confusion.  Tamani giggles and says, \"<i>");
            // (Done before)
            if (TamaniFlags.TAMANI_TIMES_HYPNOTISED > 0) CView.text("Don't you remember the last time we did this?  Of course not.</i>\"  Your hot goblin wife gestures at your suddenly swollen and erect " + describeCock(player, player.body.cocks.get(0)) + ", and continues, \"<i>Your dick remembers my special potion though.  Now, let's get back to teaching that wonderful cum-spout of yours how to behave around its wife and mistress.</i>\"\n\n");
            // (Not Done Before)
            else CView.text("I mixed a special potion in that drink.   It shuts down all those pesky thoughts so you'll listen to your wonderful wife and let her tell you how to think and feel.</i>\"  She strokes your partially softened " + nounCock(CockType.HUMAN) + ", giggling as it hardens for her, \"<i>You won't remember what Tamani tells you once it wears off, but your dick won't ever forget.</i>\"\n\n");

            CView.text("Tamani slides her jiggling body overtop of you, placing her sopping wet pussy directly over-top of your " + describeCock(player, player.body.cocks.get(0)) + ".  The warm wet fluids of her desire slowly drip down onto you until your entire surface is coated in her clear feminine-drool and the entire area smells like her cunt.  She shivers and looks into your eyes, smiling at your mindless expression as she lectures, \"<i>Feel how hard your dick is?  That's because it smells my hungry, wet pussy.  It knows that it wants to cum for my pussy.  Your cock wants nothing more than to touch my cunt, worship it and bathe it with cum.</i>\"\n\n");

            CView.text("She lets her pink-lipped entrance touch you at last, gliding it up and down your length.  You drool on yourself as she reaches your tip, leans back, and displays her glistening entrance to you as she talks, \"<i>This is what you want, what you need.   Just looking at it makes you hot and ready to fuck.  One glance and all your worries melt into arousal and desire to please your goblin wife.</i>\"\n\n");

            CView.text("She's completely right.  You're past truly comprehending words, all you know is how hot your wife is making your cock and had bad it wants to cum in her.   Tamani smirks knowingly and begins sliding herself along the sensitive shaft again, slowly bringing you closer to an inevitable orgasm with her glorious vagina.  She leans over and whispers, \"<i>You'll be a good obedient husband and fuck your wife, won't you?  That's a husband's duty – to worship his wife's beautiful pussy, bathe it in semen, and be obedient in her presence.</i>\"\n\n");

            CView.text("The words she's saying stop mattering.  All that matters is how much a slave your cock is to that wonderful, wet gash, and how great it feels to give yourself over to it.  Your spunk-hungry wife never shuts up, and you just lie there, listening placidly, contentedly twitching against her as orgasm approaches.  A happy smile spreads over your face as you feel your ");
            if (player.body.balls.count > 0) CView.text("balls");
            else CView.text("groin");
            CView.text(" churning with lust and desire, ready to give life to another batch of daughters for your mistress.  ");
            if (TamaniFlags.TAMANI_TIMES_HYPNOTISED < 10) CView.text("'Wait... wife... mistress?' your mind wonders, rejecting the foreign thoughts.  You look up at Tamani, confused for a moment");
            else CView.text("Yes, that sounds so right – Tamani is your wife, and it's your husbandly duty to keep her pregnant.  You dwell on that for a moment");
            CView.text(", until an orgasm wracks your body and derails your train of thought, drowning it in a sea of pleasure.  She moans and slides down, pressing her entrance against your urethra as your internal muscles clench, pumping thick spurts into the goblin's womb.  A new-found sense of satisfaction and pleasure spreads through you.  It feels so good to knock Tamani up that your orgasm drags on forever, until you feel empty and exhausted.   Looking back, you realize just how much more pleasurable her box is in comparison to the other holes you've tasting in your travels, even her daughter's.  As Tamani rises up off of you, dripping with cum, the memories of everything but the sex slowly slip away, leaving behind happiness and anticipation of your next chance to fill her.\n\n");

            CView.text("Your mistress steps away, swaying her more-than ample hips from side to side as she saunters off.  You shake your head, feeling a little out of sorts, but before you get a chance to puzzle it out, the exhaustion of the encounter overwhelms you, blacking you out.");
            // knock up tamani chance
            tamaniKnockUp(player);
            // increase hypno value
            TamaniFlags.TAMANI_TIMES_HYPNOTISED++;
        }
    }
    // knock bitches up, slight libido gain, slight strength/toughness loss.
    player.orgasm();
    player.stats.str += -.5;
    player.stats.int += -.5;
    player.stats.lib += 1;
    player.stats.cor += 1;

    if (TamanisDaughtersFlags.TAMANI_PRESENT) tamaniKnockUp(player); // If she wasn't pregnant she will be now
    knockUpDaughters(player);
    if (inCombat) return { next: passTime(1) };
    else return { next: passTime(4) };
}

// [Lose Combat, Get Your Dick DRAINED]
function tamaniDaughtersCombatLossDrain(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;
    TamanisDaughtersFlags.TIMES_FUCKED_TAMANIS_DAUGHTERS++;

    // Vars
    const cocks: number = player.body.cocks.length;

    CView.text("Your efforts to resist were in vain – there's simply too many of your slutty daughters to fight off.  The crowd flows over your ");
    if (player.stats.HP < 1) CView.text("defeated");
    else CView.text("lust weakened");
    CView.text(" form, pulling you off your feet and carrying the whole of your body off.  ");
    if (player.stats.lust > 99) {
        CView.text("It doesn't bother you too much... they keep ");
        if (player.body.balls.count > 0) CView.text("fondling your balls and ");
        CView.text("stroking your shaft to keep you nice and excited, squirming helplessly with desire.");
    }
    else CView.text("Your abused body slips in and out of consciousness, but the crowd applies salves as they travel to slowly invigorate your form.  Their hands keep touching and stroking you, and despite your mighty efforts to resist, you find yourself aroused and willing in short order.");
    CView.text("\n\n");

    CView.text("Perhaps an hour later, you're pulled into a cave.   Daylight fades away, replaced by the flickering light cast by a few torches and candles.  Your daughters are giggling and gossiping as they parade you through their subterranean lair, taking you ever-deeper.   An indeterminate amount of time later, you hear a door opening and are pulled through an entryway into what passes for a room.  You pant and moan as one of the tallest of Tamani's brood does her best to fellate ");
    if (cocks > 1) CView.text("one of ");
    CView.text("your " + describeCocksLight(player) + ", keeping your more than turned on enough to go along with whatever they have planned.\n\n");

    // (regular lower body)
    if (player.body.legs.type !== LegType.CENTAUR) {
        CView.text("The hands holding you slowly lower you into a comfortable feeling chair, securing your " + describeLegs(player) + " into tightly bound stirrups.  A moment later, your hands are strapped into equally firm cuffs.  By this point, your lust-dulled mind has begun to worry, and you start to struggle, but binding leather straps are passed over your chest, midsection, and upper thighs, then tightened against the chair to completely restrain you.  Perhaps the only ");
        if (cocks > 1) CView.text(" things not restrained are your " + describeCocksLight(player) + ", standing at attention despite, or perhaps because of, your predicament.\n\n");
        else CView.text(" thing not restrained is your " + describeCocksLight(player) + ", standing at attention despite, or perhaps because of, your predicament.\n\n");
    }
    // (Shit taurs go!)
    else {
        CView.text("The hands holding you slowly lower you down onto your back, guiding you into a combination chair and harness designed to accommodate a centuar's size and shape.  Before you know it, straps secure your " + describeLegs(player) + " into tightly bound restraints.  A moment later your, hands are strapped into equally firm cuffs.  By this point, your lust-dulled mind has begun to worry, and you start to struggle, but binding leather straps are passed over your chest, midsection, and hindquarters, then tightened against the chair to completely restrain you.  Perhaps the only ");
        if (cocks > 1) CView.text(" things not restrained are your " + describeCocksLight(player) + ", standing at attention despite, or perhaps because of, your predicament.\n\n");
        else CView.text(" thing not restrained is your " + describeCocksLight(player) + ", standing at attention despite, or perhaps because of, your predicament.\n\n");
    }

    CView.text("A goblin with lustrous blue hair pulls a lever on the side of the chair, shifting your position to further expose you.  She assures, ");
    if (TamanisDaughtersFlags.TIMES_USED_CHAIR === 0) CView.text("\"<i>Stop worrying.  I invented this while I was waiting on mom to bring me back more of your cum, just in case we ever got our hands on you.  I promise, after you've had a taste of my chair you'll never want to leave.</i>\"\n\n");
    else CView.text("\"<i>Stop worrying!  We both know you love my little love-seat.  Just lie back and you'll be cumming too hard to care before long.</i>\"\n\n");

    CView.text("You hear a commotion to the side and crane your head to watch.  There's a crowd of the girls clustered around a machine.   It's about the size of a large dresser or cabinet, only instead of holding clothes it's covered in knobs, levers, and various mechanical dials.  A goblin with light blue, almost silvery hair looks back at you and blows you a kiss while she pulls a lever.  A mechanical whirring noise fills the room, emanating from the ceiling.  You tilt your head back and look up, and see a massive metal bulb descending from the ceiling.\n\n");

    CView.text("The goblin-made device is clearly sexual in nature.  Dozens of openings cover the bottom surface, and inside each one is a some kind of pink-lined hole, dripping with lubricants.  Most intriguing of all, you realize that the different holes all have different shapes, patterns, and sizes.  Some are huge, resembling something that would be at home between a monster's legs, and others are tiny, practically elf-like in appearance.   The bulb pauses just over your crotch, and a few snickering, green skanks guide " + describeOneOfYourCocks(player) + " into a perfectly sized hole.\n\n");

    CView.text("You shiver as your manhood");
    if (cocks > 1) CView.text("s are");
    else CView.text(" is");
    CView.text(" totally encapsulated within ");
    if (cocks === 1) CView.text("a ");
    CView.text("wet orifice");
    if (cocks > 1) CView.text("s");
    CView.text(".  They're so cold that you shiver involuntary against your restraints.  The blue-haired girl growls, \"<i>Hey bitch!  Crank the fuckin' machine up before you make Dad's dick");
    if (cocks > 1) CView.text("s");
    CView.text(" wilt!</i>\"\n\n");

    CView.text("The machinery's humming gets louder as an unseen goblin does as she is told.  Noisy, wet suckling fills the room as the dozens of artificial mouths activate.  The wet, slimy substance encapsulating you immediately heats until it feels as warm as a maiden's love, and a gentle suction pulls on ");
    if (cocks > 1) CView.text("each of ");
    CView.text("your " + describeCocksLight(player) + " until it feels much harder and thicker than normal.  You stifle an involuntary groan, but fail to conceal your lust-filled pants from your audience.   A daring girl leaps onto your ");
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating < 1) CView.text("chest");
    else CView.text(describeAllBreasts(player));
    CView.text(" and shoves a lactating nipple into your mouth, commanding, \"<i>Drink up, the more fluid you have the more baby batter you can cook up for us!</i>\"\n\n");

    CView.text("Unable to fight back in any way, you shrug and begin suckling the purplish nipple, tasting the creamy goblin milk as it easily fills your mouth.  You gulp it down, slowly relaxing between the mechanized cock-sucking and gentle breast-feeding.  Your daughter was right, it's almost like paradise. Unfortunately, the pleasure is interrupted by something probing at your backside.  Unable to look with your mouth full of delicious tit, you can only gurgle and dribble in protest as a lubricated tube is inserted into your " + describeButthole(player.body.butt) + ".\n\n");

    CView.text("The familiar voice of the machine's inventor whispers, \"<i>");
    if (TamanisDaughtersFlags.TIMES_USED_CHAIR === 0) CView.text("Time for your medicine!  We need you to cum enough for each of us, and maybe have a little left over to play with, so suck up the medicine, okay?  Just relax and let it fill you so that you give us all that yummy cummy!</i>\"\n\n");
    else CView.text("Relax Dad, we're just giving you your cummy medicine.  I know you're a sexy, virile " + mf(player, "stud", "slut") + "and all, but take your medicine and you'll have more than enough cum for us!</i>\"\n\n");

    CView.text("You blush, ");
    // EXHIBITIONISTZ
    if (CeraphFlags.PC_FETISH > 0) CView.text("unimaginably turned on by being used and abused by such machinery in front of an audience of your own horny children.");
    else if (player.stats.cor > 60) CView.text("turned on by being milked in such an obscene way.");
    else CView.text("horrified at the situation but unable to resist arousal as you're constantly sucked and pleasured.");
    CView.text("\n\n");

    CView.text("A trickle of warm fluid flows into you, and immediately your skin tingles, burning with heat and need.  ");
    if (player.body.balls.count > 0) CView.text("Your balls tighten inside your sack and swell up like sponges, slowly increasing in size in time with your desire.");
    else CView.text("Your body feels tight and needy, your gut clenching as your body adjusts to the drugs it's absorbing so readily through your " + describeButthole(player.body.butt) + ".");
    CView.text("  The suckling pleasure around ");
    if (cocks > 1) CView.text("each of ");
    CView.text("your " + describeCocksLight(player) + " seems to slowly increase as more of the drugs are absorbed by your body, until escaping the straps for your freedom is longer a concern.   Now all that matters is getting free so that you can fuck ");
    if (cocks === 1) CView.text("that");
    else CView.text("those");
    CView.text(" mechanical hole");
    if (cocks > 1) CView.text("s");
    CView.text(" until you feel that wonderful, delicious release that you crave.\n\n");

    CView.text("The goblins, upon seeing your change in demeanor, begin smiling to one another and congratulating each other on their hard work.  The girl at the console twists a few more levers and the warmth inside you seems to double as more drugs are forced into your captive frame.  You start " + mf(player, "laughing", "giggling") + ", the narcotics and pleasure overwhelming your thought processes, leaving you feeling like you're floating in heaven.  To anyone watching, you're panting and moaning in between the laughter, slobbering all over the milky goblin-tit in your mouth as your body begins squirting pre-cum into the cock-milker.\n\n");

    CView.text("A few seconds away from your orgasm, the goblin running the machinery makes a few adjustments, and you feel the flow into your rectum growing stronger until you start to feel full and bloated.  Your body caves in to the pleasure, every inch of your skin tingling as you're forced to climax.  ");
    if (player.body.balls.count > 0) CView.text("Straining and shaking, your " + describeBalls(true, true, player) + " clench against you, feeling tight as your body struggles to pump out the spooge they're producing.");
    else CView.text("Straining and shaking , your body struggles through the orgasm as it tries to deal with all the cum your prostate and glands are putting out.");
    CView.text("  The drugs and milking machines squish, suck, and whir noisily as you cum, flooding the tubes above the mechanical cunt-bulb with white.\n\n");

    CView.text("The lactating green girl stops breast-feeding you and climbs off you, fed up that you're too busy moaning to properly suckle.  A few of the giggling goblins slap your face, laughing out loud when you fail to even register the blows.  The never-ending flow of orgasmic goop flooding out from ");
    if (cocks > 1) CView.text("each of ");
    CView.text("your " + describeCocksLight(player) + " has your brain flooded with pleasure, blocking any other thoughts or feelings from arising from the swirling morass of fuck.\n\n");

    CView.text("Another voice joins you in ecstatic moaning, echoing from the other side of the room.  The source is a curvy goblin with a hose rammed up her glistening snatch, buried to the hilt.  Her sisters are teasing her, opening and closing a valve on the machine, filling their sister up with short bursts of your copious cum.  She's moaning and fucking herself in desperation with the dildo-shaped tube-tip, but her brood-mates seem intent on staggering the flow of semen to prevent her from reaching orgasm.  It doesn't take more than a dozen seconds to fill her, and she's pulled off, crying and pouting about how she wasn't done.  The next girl steps in line, rams the juice-coated dispenser inside herself, and gets ready to become a mother...\n\n");

    CView.text("Trapped in a constant orgasm by cruel machinery and a steady flow of specially tailored drugs, you start to smile uncontrollably.  True, you're utterly incapable of thinking by this point, but your body and mind are too pleased with the situation not to grin.  The situation in the corner of the scene repeats over and over as your daughters enjoy your 'milk'.  After they've had their fill they fall on each other, filling the room with orgiastic moans as any sense of order is blown away by a tide of female lust.\n\n");

    // Needz variable to track how many times PC has been 'chaired'
    TamanisDaughtersFlags.TIMES_USED_CHAIR++;
    // moar daughters, increment 'times milked' by the daughters.
    knockUpDaughters(player);
    // boost cum production slightly.
    player.body.cumMultiplier += .3;
    // increase libido, slight corruption, minus stregth and speed.
    player.orgasm();
    player.stats.str += -.5;
    player.stats.int += -.5;
    player.stats.lib += 1;
    player.stats.cor += 1;

    //// Chance of tamani saving you
    if (TamanisDaughtersFlags.TIMES_USED_CHAIR < 4) {
        CView.text("You lose consciousness a few hours into the ordeal, still cumming with no sign of stopping, your body sustained by the fluids pouring into your backside.  The dreams are a constant barrage of sexual situations, flitting between various incongruous orgasmic acts.  Were you capable of comprehending your situation, you probably wouldn't even want to wake up.  Alas, the pleasure does end, and you settle into a deeper slumber.  A gentle rocking and the exhaustion of your crotch keep you snoring soundly for hours.\n\n");

        CView.text("When you do wake, you find yourself alone in a forest clearing, with a note taped to your face:\n\n");
        if (TamanisDaughtersFlags.TIMES_USED_CHAIR === 0) {
            CView.text("<i>   " + mf(player, "Husband", "Baby") + ",\n");
            CView.text("      Do you have any idea how hard it is for Tamani to drag you out here all by herself?  If you weren't my favorite breeder, I would've let my daughters keep you.  Next time stand up to the little twats or Tamani might look the other way while you're being milked!\n\n");
            CView.text("   Hugs & cums,\n");
            CView.text("      -Tamani</i>");
        }
        else {
            CView.text("<i>   Seriously, it isn't funny.  " + mf(player, "Man", "Toughen") + "-up and beat the little cunts silly instead of letting them force themselves on you.   Do you have any idea how hard it is to drag you out here?  If you weren't so much fun in the sack Tamani would be tempted to let her daughters keep you in their milker.   Maybe the girls would give Tamani a good cut of your production to join the operation?\n\n");
            CView.text("   Fucks & Love,\n");
            CView.text("      -Tamani</i>");
        }
        return { next: passTime(1) };
    }
    // (ALT – BAD END GATEWAY)
    else {
        CView.text("You lose consciousness a few hours into the ordeal, still cumming with no sign of stopping, your body sustained by the fluids pouring into your backside.  The dreams you have are a constant barrage of sexual situations, flitting between various incongruous orgasmic acts.  Were you capable of comprehending your situation, you probably wouldn't even want to wake up.  Thankfully, your unwished desires become reality.");
        // [NEXT]
        return { next: tamaniDaughtersBadEndChoice };
    }
}

function tamaniDaughtersBadEndChoice(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;
    CView.text("The next morning your unfocused eyes blink open, and you find yourself in the same situation as before.  Thankfully your orgasm has been allowed to end, though you still feel dopey and unfocused from whatever is flowing into you.  You manage to twist your head around to get a better look at the situation and discover a pair of IV's lodged in your arms.  Twisting your body, you realize you can still feel the drug-enema tube lodged in your " + describeButthole(player.body.butt) + ".  Oddly, it's hard to feel worried or concerned about the situation.\n\n");

    CView.text("A goblin leans over your face and hugs her jiggling breasts against you as she gushes, \"<i>Thank you so much daddy!   You probably can't see with all the straps holding you down, but you got me and my sisters totally pregnant.  There's even enough of your spunk left over to knock us up a few more times!  We decided that even though we don't need you to cum right now, we'd let you keep coming forever.  Do you want that?</i>\"\n\n");

    if (ExgartuanFlags.LOCATION === 1) CView.text("Exgartuan barks, \"<i>Hell yes I do!</i>\" but the goblin only smirks down for a moment before looking back at you.\n\n");

    CView.text("(Options: Yes, No, I'd rather fill your cunts individually & personally)");
    return { choices: [["Yes", tamaniDaughtersYesBadEndMePlease], ["No", tamaniDaughtersDeclineBadEnd], ["Individual", tamanisDaughtersFillIndividuallyBADEND]] };
}

// [Yes]
function tamaniDaughtersYesBadEndMePlease(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;

    CView.text("\"<i>Wonderful!</i>\" cries the excited pregnant slut.   She gives you a quick peck on the cheek as she prances back over to the machine.  You brace yourself in anticipation, eager to lose yourself to an eternal orgasm.  A switch clicks, and a dial whirs as it's turned up to the maximum.  The fluids pumping into your backside and directly into your veins suddenly jump in pressure, stinging painfully for a moment before the pleasure returns.  Your eyes slowly roll back, your jaw goes slack, and your " + describeCocksLight(player) + " spew");
    if (player.body.cocks.length === 1) CView.text("s");
    CView.text(" cum into the tubes.\n\n");
    if (ExgartuanFlags.LOCATION === 1) CView.text("Exgartuan moans, \"<i>Ohhhhhh yeeeeaaaaahhhh...</i>\" before slipping into silence.\n\n");

    CView.text("You spend the rest of your life trapped in orgasm, constantly feeding the growth of what becomes the biggest goblin tribe in all the land of Mareth.  Even when every single one of them is pregnant, they let you enjoy your reward.  Over time your capacity for memory, morals, or anything other feeling besides pleasure dwindles.  Trapped in a heaven of your own choosing, you gave up everything that you were for never-ending bliss.");
    return gameOverMenu(player);
}

// [NO]
function tamaniDaughtersDeclineBadEnd(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;

    CView.text("\"<i>Seriously!?</i>\" exclaims the pregnant slut, \"<i>What kind of person wouldn't want to cum all the time?  Fuck, just the idea of it is making me drip!</i>\"\n\n");

    CView.text("She sighs, \"<i>Whatever, Dad.  Next time we need you I'm sure you'll remember how much fun this was and come running home.</i>\"\n\n");

    CView.text("The restraints pop off you at once, and you pull the tubes and IV's from your skin.  You grunt with discomfort and remove the final tube from your " + describeButthole(player.body.butt) + ".  Climbing off the table, your " + describeLegs(player) + " wobble unsteadily as you try to get your balance.   The goblin says, \"<i>Go on home dad before I strap you back down and teach you to enjoy my gifts!</i>\"\n\n");

    CView.text("You sheepishly leave the cave and head home, glad to be out of there before your growing tribe of daughters decides to milk you forever.\n\n");
    return { next: passTime(1) };
}
// [Rather Fill Individually]
function tamanisDaughtersFillIndividuallyBADEND(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;

    CView.text("\"<i>Really?</i>\" asks the pregnant goblin before she exclaims, \"<i>You do love us!  Oh Dad, once mom comes home will you fuck all of us?  I want to feel you make love to my drippy, pregnant pussy while she watches!</i>\"\n\n");

    CView.text("You agree to do just that, ");
    if (player.body.cocks.length > 1) CView.text("each of ");
    CView.text("your " + describeCocksLight(player) + " rising to full hardness in anticipation.  Your daughter pats ");
    if (player.body.cocks.length > 1) CView.text("one of them");
    else CView.text("it");
    CView.text(" as if it were a person and smiles as she pops the restraints from your chair.  She helps you as you stagger up to your " + describeFeet(player) + ", though the feeling of her hand stroking ");
    if (player.body.cocks.length > 1) CView.text("a");
    else CView.text("your");
    CView.text(" " + describeCock(player, player.body.cocks.get(0)) + " doesn't make it easy.  The pair of you journey deeper into the caves to a massive antechamber filled with pregnant goblins.  Some are eating, others are sewing at tables, tinkering with machinery, or fiddling with alchemical equipment.  All of them turn to look at you as you enter.\n\n");

    CView.text("The well endowed goblin next to you announces, \"<i>Dad has decided that he will willingly stay here and fuck each of us as often as we want.  Let's get him some succubi's delight, I want mom to watch him fill me when she gets home!</i>\"\n\n");

    CView.text("A cheer reverberates off the ceiling as your daughters crowd around you, pressing their buxom chests and rounded backsides against you.  You're led to a secluded corner and fed food and strange drinks, while being kept incredibly horny for hours as you await Tamani's return.  True to her word, your daughter is on top of you in a flash once the clan's matriarch enters the room, and you're helpless to do anything but submit to her velvet pussy.  You cum loudly and messily, creaming her walls and flooding the area around you with spunk while Tamani is forced to watch with a jealous look on her face.\n\n");

    CView.text("The rest of your life continues on in a similar fashion – you're kept happily fed, full, and pleasured by your hundreds of pregnant wives as your harem grows.  There's no shortage of sex, and no shortage of desire thanks to your wives' alchemical talents.  Within the span of a month you've utterly forgotten about your quest – it's hard to focus on anything but cuddling with your wives and daughters while you await your next fuck.");
    return gameOverMenu(player);
}

// [Lose to Daughters With Tamani There]
function loseToDaughtersWithTamaniThere(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;

    TamanisDaughtersFlags.TIMES_FUCKED_TAMANIS_DAUGHTERS++;
    // Find a dick that fits
    const cockThatFits = player.body.cocks.find(Cock.CockThatFits(50));

    CView.text("Your attempts to resist prove to be in vain, as your daughters and their extra-curvy mother have completely defeated you.  ");
    if (player.stats.HP < 1) CView.text("Lying in the dirt, too hurt to fight back, you can only tremble in anticipation of what pleasures they're going to force upon you this time.");
    else {
        CView.text("Lying back in the dirt, you're too hard to fight back.  You stroke ");
        if (player.body.cocks.length > 1) CView.text("one of ");
        CView.text("your trembling " + describeCocksLight(player) + ", feeling it leak pre-cum in anticipation of getting to knock up some of these beautiful curvy women.");
    }
    CView.text("  Tamani pushes her way to the front of the pack, her daughters looking disappointed but yielding to their mother's authority for the time being.  She walks over to you, stepping over your fallen form and uncorking a a potion.  You grunt as she drops her jiggling ass down on your ");
    if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating < 1) CView.text("chest");
    else CView.text(describeAllBreasts(player));
    CView.text(" and says, \"<i>Now husband, you've let your daughters beat you fair and square, so now it's time to take your medicine and give them their reward for becoming so strong.</i>\"\n\n");

    CView.text("The potion's bottle becomes a plug for your mouth as Tamani forces your mouth open.  She tips it back and massages your throat with one hand, forcing you to gulp down the fluid.  ");
    if (TamaniFlags.TAMANI_TIMES_HYPNOTISED < 2) CView.text("It tastes syrupy-sweet");
    else CView.text("It has a familiar taste that you can't quite place");
    CView.text(" and nearly makes you gag, but Tamani makes sure you drink down every drop.  An immediate numbness spreads through your body, starting at your fingertips.  It slowly crawls up your arms and then starts at your " + describeFeet(player) + " as well.  In no time it's hard to move, and it becomes hard to think.  Your mind feels almost like its full of cotton-candy, with fuzzy pink stuff constantly getting in the way of your thoughts.\n\n");

    CView.text("Tamani rubs your temples soothingly as your " + describeFaceShort(player) + " creases with worry and reassures you, \"<i>Don't worry, this will wear off soon.  This drug just shuts down your mind so it'll be nice and open to suggestion.  You can feel how hard it is to think, can't you?  Every time you muster up a thought it gets caught up in the little pink clouds and whisked away.  Don't bother, just relax and listen to Tamani's voice.</i>\"\n\n");

    CView.text("She reaches into your " + player.inventory.armor.displayName + " to rub ");
    if (player.body.cocks.length > 1) CView.text("one of ");
    CView.text("your " + describeCocksLight(player) + ", casually stroking the hard member as she pivots around to explain, \"<i>You get so hard for Mistress Tamani, don't you?  ");
    if (TamaniFlags.TAMANI_TIMES_HYPNOTISED > 10) CView.text("Your body must remember how much it loves being my pussy-hungry husband.");
    else CView.text("That's because your body knows how hot and moist Tamani's pussy is and how much you want to service it.");
    CView.text("</i>\"\n\n");

    CView.text("Of course she's right – you can feel her wetness on your chest and you want to bury your face in it while she strokes you.  Tamani watches your eyes and turns to give you a better view, presenting her snatch while she leans back to stroke you.  She titters, \"<i>Yes, get a good look at your wife's cunt.  It looks so delicious, so warm, so inviting.  You want nothing more than to bury your cock or face into it, don't you?  That's because it's your wife's cunt, and you're a good husband.</i>\"\n\n");

    CView.text("Her hand starts stroking you faster and her juices start to drip down the sides of your torso");
    if (player.body.skin.type === SkinType.FUR) CView.text(", matting your " + player.body.hair.color + " fur");
    CView.text(" as she continues ");
    if (TamaniFlags.TAMANI_TIMES_HYPNOTISED < 10) CView.text("filling your mind with truths");
    else CView.text("reinforcing your image of yourself as an obedient husband");
    CView.text(", \"<i>It feels so good to service your wife's aching pussy and fill it full of cum.  Your cock knows it and wants it so much that any time you see your wife, Tamani, you'll get so hard and hot for her that you'll forget about anything but worshipping her cunt, won't you?</i>\"\n\n");

    CView.text("You start nodding while she talks, your eyes never leaving the glistening fuck-hole a few inches away.  Your wife is so smart, and though you stop hearing the words, you know everything she's telling you is the truth.  The smooth skin of her hands strokes you perfectly, only getting better as they become slick with pre-cum.  Tamani's voice rises, taking on a tone of command, and then you're squirting obediently for her – a good husband.\n\n");

    if (player.cumQ() < 50) CView.text("Cum splatters and drips down Tamani's hand, forming a tiny puddle on your chest.");
    // (ALT)
    else if (player.cumQ() < 250) CView.text("Cum splatters over Tamani's hand and forearm, even hitting her ass and hips as you form a thick puddle over your torso that drips to the ground.");
    // (ALT2)
    else if (player.cumQ() < 600) CView.text("Cum splatters out in thick waves, soaking Tamani's hand, forearm, and hips with thick puddles of the stuff.  It pools on your belly for a moment, then rolls off you, forming a small pool on the ground as you keep squirting.");
    // (ALT3)
    else {
        CView.text("A massive wave of cum erupts from you, soaking Tamani from the shoulders to the knees in thick goop.  The next wave comes out with less force, pooling your belly before rolling off to puddle on the ground.   The puddle grows into a thick pool of the stuff as your orgasm drags on.");
        if (player.cumQ() >= 2000) CView.text("  Eventually it stops, but by then the pool is huge and nearly five inches deep.");
    }
    CView.text("  Pride wells up in you when you realize what a good husband you've been.  Tamani pats you on the head, and whispers, \"<i>Good job lover</i>\" as the cobwebs slowly clear away.   You remember your wife pouring a lust draft down your throat and giving you the 69 of a lifetime, but now it's time to be a good husband and father and help your daughters out too.   The girls clamber forwards, giggling to each other excitedly as they remove what little garments they have.\n\n");

    CView.text("You welcome them into your arms as Tamani steps away with a strange glint in her eye, rubbing the seed on her hand into her snatch.  Potions are pressed to your lips, and you happily accept your daughters' gifts, guzzling them happily and taking the time to compliment them on their alchemical skills while ");
    if (player.body.cocks.length > 1) CView.text("each of ");
    CView.text("your " + describeCocksLight(player) + " grows back to full erectness and trembles with desire, ready to seed a womb.  The girls ");
    if (player.body.cocks.length === 1) CView.text("grab your " + describeCocksLight(player) + " and stroke it with long slow strokes, just like their mother.  Unlike her, they don't seem content to wait, and in seconds a slippery gash is stretching to accommodate your cock-head.\n\n");
    else CView.text("each grab one of your " + describeCocksLight(player) + " and stroke it with long slow strokes, just like their mother.  Unlike her, they don't seem content to wait, and in seconds a slippery gash is stretching to accommodate each cock-tip.\n\n");

    // (TOO BIG)
    if (!cockThatFits) {
        CView.text("Sadly, you're just too big to properly impregnate your daughter, and a stab of worry that you might be a bad father lances through you.  ");
        if (player.body.cocks.length === 1) {
            CView.text("Thankfully your daughter doesn't seem to mind.  She switches to resume stroking you, though the wet tightness of goblin cunt stretches around as much of your tip as it can.  Between the drugs, the sexy girl on top of you, and your desire to be a good patriarch, they have no problem getting you off into their waiting, fertile wombs.  You cry out and twitch, seeding your daughter's womb with spunk, treating her just like her mother now that she's all grown up.");
            if (player.cumQ() > 700) CView.text("It gets everywhere as her womb fails to contain your massive load, even after you've bloated her belly with the stuff.");
            if (player.cumQ() > 2000) CView.text("After a few more seconds the puddle from before gets even deeper, and your daughters kindly prop up your head to keep you from drowning in the jism pool.");
        }
        else {
            CView.text("Thankfully your daughters don't seem to mind.  They switch to resume stroking you, though the wet tightness of goblin cunts stretches around as much of your tips it can.  Between the drugs, the sexy girls on top of you, and your desire to be a good patriarch, they have no problem getting you off into their waiting, fertile wombs.  You cry out and twitch, seeding your daughters' womb with spunk, treating them just like their mother now that they're all grown up.");
            if (player.cumQ() > 700) CView.text("It gets everywhere as their wombs fail to contain your massive load, even after you've bloated their bellies with the stuff.");
            if (player.cumQ() > 2000) CView.text("After a few more seconds the puddle from before gets even deeper, and your daughters kindly prop up your head to keep you from drowning in the jism pool.");
        }
        CView.text("\n\n");

        CView.text("Drained from two amazing orgasms, you start to nod off, but you're happy knowing they'll keep you hard and cumming until every empty pussy is full of thick baby-making cream.");
    }
    // (FITS)
    else {
        CView.text("Thankfully, the hungry goblin twat is able to devour your " + describeCock(player, player.body.cocks.get(0)) + " with ease.  Those pliable, fluid-slicked cunt-walls clench ever-so-tightly around you");
        if (player.body.cocks.sort(Cock.Largest).get(0)!.area < 30) CView.text(" in spite of the large sizes they usually handle.");
        else CView.text("r large size.");
        if (player.body.cocks.length > 1) {
            CView.text("  You grunt happily as your daughters begin to slide up and down your lengths, moaning lewdly with every wet squelch that escapes their drooling pussies.  Thanks to the drugs, the writhing form of your sexy daughters, and the desire to be a good patriarch for your family, you get off in no time.  You cry out and twitch, seeding your daughters' womb with spunk, treating them just like their mother now that they're all grown up.");
            if (player.cumQ() > 700) CView.text("  It gets everywhere as their wombs fail to contain your massive load, even after you've bloated their bellies with the stuff.");
            if (player.cumQ() > 2000) CView.text("  After a few more seconds the puddle from before gets even deeper, and your daughters kindly prop up your head to keep you from drowning in the jism pool.");
        }
        else {
            CView.text(" You grunt happily as your daughter begins to slide up and down your length, moaning lewdly with every wet squelch that escapes her drooling pussy.  Thanks to the drugs, the writhing form of your sexy daughter, and the desire to be a good patriarch for your family, you get off in no time.  You cry out and twitch, seeding your daughter's womb with spunk, treating her just like her mother now that she's all grown up.");
            if (player.cumQ() > 700) CView.text("  It gets everywhere as her womb fails to contain your massive load, even after you've bloated her belly with the stuff.");
            if (player.cumQ() > 2000) CView.text("  After a few more seconds the puddle from before gets even deeper, and your daughters kindly prop up your head to keep you from drowning in the jism pool.");
        }
        CView.text("\n\n");

        CView.text("Drained from two amazing orgasms, you start to nod off, but you're happy knowing they'll keep you hard and cumming until every empty pussy is full of thick baby-making cream.");
    }
    // Chance of tamani pregnancy, chance of daughter preggers
    knockUpDaughters(player);
    tamaniKnockUp(player);
    TamaniFlags.TAMANI_TIMES_HYPNOTISED++;
    // daughter countdown reset.
    player.orgasm();
    player.stats.str += -.5;
    player.stats.int += -.5;
    player.stats.lib += 1;
    player.stats.sens += 1;
    player.stats.cor += 1;

    return { next: passTime(1) };
}

function knockUpDaughters(player: Character) {
    if (TamanisDaughtersFlags.WOMB.isPregnant()) return;
    TamanisDaughtersFlags.WOMB.knockUp(PregnancyType.PLAYER, 216); // Nine day long pregnancy, just like mom
    // Determine how many kids...
    TamanisDaughtersFlags.TAMANI_DAUGHTERS_PREGNANCY_COUNT = 2;
    const cum: number = player.cumQ();
    // Breeder perk is awesome
    if (player.effects.has(EffectType.MaraesGiftStud)) TamanisDaughtersFlags.TAMANI_DAUGHTERS_PREGNANCY_COUNT += 3;
    if (cum >= 50 && randInt(2) === 0) TamanisDaughtersFlags.TAMANI_DAUGHTERS_PREGNANCY_COUNT++;
    if (cum >= 100 && randInt(2) === 0) TamanisDaughtersFlags.TAMANI_DAUGHTERS_PREGNANCY_COUNT++;
    if (cum >= 200 && randInt(2) === 0) TamanisDaughtersFlags.TAMANI_DAUGHTERS_PREGNANCY_COUNT++;
    if (cum >= 300 && randInt(2) === 0) TamanisDaughtersFlags.TAMANI_DAUGHTERS_PREGNANCY_COUNT++;
    if (cum >= 400 && randInt(2) === 0) TamanisDaughtersFlags.TAMANI_DAUGHTERS_PREGNANCY_COUNT++;
    if (cum >= 500 && randInt(2) === 0) TamanisDaughtersFlags.TAMANI_DAUGHTERS_PREGNANCY_COUNT++;
    if (cum >= 600 && randInt(2) === 0) TamanisDaughtersFlags.TAMANI_DAUGHTERS_PREGNANCY_COUNT++;
}

export function combatWinAgainstDaughters(player: Character, tamanisDaughters: Character): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;
    if (tamanisDaughters.stats.HP < 1) {
        CView.clear().text("You smile in satisfaction as " + tamanisDaughters.desc.a + tamanisDaughters.desc.name + " collapses, unable to continue fighting.");
        if (player.stats.lust >= 33 && player.body.cocks.length > 0) {
            CView.clear().text("In spite of their injuries, they do try to present their bodies in as lewd a way as possible.  You could still fuck them, but things might get out of hand...\n\nDo you fuck them?");
            return { yes: choiceWrap(fuckYoDaughtersHomie, true), no: passTime(1) };
        }
        else return { next: passTime(1) };
    }
    else {
        CView.clear().text("You smile in satisfaction as your daughters collapse in upon themselves, devolving into a frenzied orgy.  It looks like they're too distracted to continue fighting.  They're putting on quite a show...\n\n");
        player.stats.lust += 5;

        if (player.stats.lust >= 33 && player.body.cocks.length > 0) {
            CView.text("You could still fuck them, but things might get out of hand...\n\nDo you fuck them?");
            return { yes: choiceWrap(fuckYoDaughtersHomie, true), no: passTime(1) };
        }
        else return { next: passTime(1) };
    }
}

export function loseToDaughters(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Tamani_Daughters); // 57;
    if (player.stats.lust > 99) {
        // worms r gross mmmmkay?
        if (player.effects.has(EffectType.Infested)) {
            const result = infestOrgasm(player);
            CView.text("\n\nThe goblins sigh and say, \"<i>Dad, that's just gross.  Don't get me wrong, we're still gonna have you knock us up, but I hate the feeling of those worms inside me.</i>\"");
            player.orgasm();
            return result;
        }
        CView.text("\n\nYou give up, you're just too turned on by the sea of sexually charged deviants to resist them anymore.  You're ready to fuck them all.");
        if (player.body.cocks.length === 0) {
            CView.text("The sexy sluts pout, \"<i>Why did you have to go and get rid of your dick!?</i>\" before something hits you in the head, HARD, knocking you out.");
            return { next: passTime(1) };
        }
        if (TamanisDaughtersFlags.TAMANI_PRESENT) {
            if (randInt(2) === 0) return { next: loseToDaughtersWithTamaniThere };
            else return { next: choiceWrap(legTamanisDaughtersRAEPYou, true) };
        }
        else {
            if (randInt(2) === 0) return { next: tamaniDaughtersCombatLossDrain };
            else return { next: choiceWrap(legTamanisDaughtersRAEPYou, true) };
        }
    }
    // hp loss
    else {
        CView.text("\n\nOverwhelmed by your wounds, you can't even try to stop the goblin horde...");
        if (player.body.cocks.length === 0) {
            CView.text("The sexy sluts pout, \"<i>Why did you have to go and get rid of your dick!?</i>\" before something hits you in the head, HARD, knocking you out.");
            return { next: passTime(1) };
        }
        if (TamanisDaughtersFlags.TAMANI_PRESENT) {
            return { next: loseToDaughtersWithTamaniThere };
        }
        else {
            if (randInt(2) === 0) return { next: tamaniDaughtersCombatLossDrain };
            else return { next: choiceWrap(legTamanisDaughtersRAEPYou, true) };
        }
    }
}
