import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { SpriteName } from 'Page/SpriteName';
import { randInt } from 'Engine/Utilities/SMath';
import { guyGirl } from 'Game/Descriptors/GenderDescriptor';
import { passTime } from 'Game/Menus/InGame/PlayerMenu';
import { describeVagina, describeClit } from 'Game/Descriptors/VaginaDescriptor';
import { VaginaWetness } from 'Game/Character/Body/Vagina';
import { describeButt } from 'Game/Descriptors/ButtDescriptor';
import { describeLegs, describeLeg } from 'Game/Descriptors/LegDescriptor';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { describeCocksLight, describeCock, nounCock } from 'Game/Descriptors/CockDescriptor';
import { CockType } from 'Game/Character/Body/Cock';
import { describeBalls } from 'Game/Descriptors/BallsDescriptor';
import { Flags } from 'Game/Flags';
import { TimeEvents } from 'Game/TimeEvents';
import { EffectType } from 'Game/Effects/EffectType';

export const FaerieFlags = Flags.register("Faerie", {
    Fucked: 0,
    FemFuck: 0
});

// faerie Encounter
export function encounterFaerie(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Faerie); // 17;
    CView.clear().text("A faerie slightly taller and thicker than your middle finger flits about the air. Her flat chest and girlish bob of hair make her look quite cute, but the solid black stockings and leather straps covering her chest show her slutty nature. Her wings are a light red, the color of aroused genitals.\n\n");
    if (player.body.cocks.length > 0 && (player.body.vaginas.length <= 0 || randInt(2) === 0)) {
        CView.text("She seems to notice you getting hard at the sight of her and looks down. \"<i>Ew, man parts!</i>\" the faerie exclaims, flying away like a frightened bird.");
        if (randInt(player.stats.spe / 2) + FaerieFlags.Fucked > 15) {
            if (FaerieFlags.Fucked < 5) {
                CView.text("\n\nYou make a desperate lunge for the faerie girl and grab her before she can fly away.   She wriggles and squirms in your grasp, shouting, \"<i>Let me go you meanie!</i>\"\n\n");
                CView.text("It would be cute if she wasn't dressed up like such a slut.  You bet you could get her to help pleasure you, but she might not like it.  Or you could be a nice " + guyGirl(player.gender) + " and let her go...\n\nDo you force her to pleasure you?");
            }
            else if (FaerieFlags.Fucked < 10) {
                CView.text("\n\nYou snatch her out of the air fairly easily.  She seems like she's slowed down a little.   She squirms and wriggles, begging you, \"<i>Please don't cover me in cum again... I get so drunk and feel even sluttier afterwards.  I don't want to be a slut!</i>\"\n\nShe pouts, but blushes.  Do you make her get you off again?");
            }
            else if (FaerieFlags.Fucked < 15) {
                CView.text("\n\nYou grasp the dizzy faerie out of the air with ease, smiling as you feel the flood of wetness between her thighs moistening your hand.  She wriggles and moans, \"<i>No, not again!  I want another cum-bath so bad... but I'm losing myself to it.  It's hard to keep flowers pollinated when you're jilling off half the day and waiting for a nice hard cock to wander your way...</i>\"\n\nShe wants to get you off almost as you do.  Do you make her service you again?");
            }
            else CView.text("\n\nYou lazily make a grab for her and easily snatch her out of the air.  Her body is sticky with a mix of desire and your last encounter.  You can feel her humping against your pinky while she begs, \"<i>Come on, let me crawl into your " + player.inventory.armor.displayName + " and wrap myself around your shaft.  I promise I'll only drink a little pre-cum this time, just enough to let me get off.  I'll be a good faerie slut, just let me get you off!</i>\"\n\nDo you let the faerie get you off?");
            player.stats.lust += player.stats.lib / 10 + 2;

            return { yes: faerieCaptureHJ, no: letFaerieGo };
        }
        player.stats.lust += player.stats.lib / 10 + 2;

        if (player.stats.lust >= 90) {
            CView.text("\n\nYou groan miserably with frustration. Desperate for stimulation, you sink to your knees and start jacking off, the faerie's visage still fresh in your mind. You catch a fleeting glimpse of yourself tightly gripping the faerie's legs in each of your fists, dragging her toward ");
            if (player.body.cocks.length === 1) CView.text("your dick");
            else CView.text("one of your dicks");
            CView.text(", too large for her tiny frame... the depraved image overwhelms your mind's eye and you find yourself shooting all over the ground furiously.");
            player.orgasm();
        }
        else CView.text("\n\nYou try in vain to jump and catch her, but she's too high above you and much too fast.");
        return { next: passTime(1) };
    }
    CView.text("The faerie slows the beating of her wings and hovers towards you. You dismiss your fearful notions, certain a small faerie is quite harmless to you.\n\n");
    CView.text("How do you react?");
    // Shoo Away, Nothing, RAEP
    if (player.body.vaginas.length > 0) return { choices: [["Shoo Away", faerieShooAway], ["Nothing", faerieDoNothing], ["Rape", faerieRAEP]] };
    else return { choices: [["Shoo Away", faerieShooAway], ["Nothing", faerieDoNothing]] };
}

function faerieRAEP(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Faerie); // 17;
    // Count secksins
    FaerieFlags.FemFuck++;

    CView.clear().text("You let the tiny faerie buzz closer to investigate, then with an explosion of movement, snatch her out of the air.  She squirms in your palm, struggling futilely in your grasp.  You poke between her legs with a finger, noting the flushed redness of the faerie's skin.  ");
    // Changes based on times fucked
    if (FaerieFlags.FemFuck === 1) CView.text("She juices herself and screams, \"<i>Let me goooooooo,</i>\" trying to sound outraged instead of turned on, but the tiny girl's body gives away the lie.");
    else if (FaerieFlags.FemFuck <= 5) CView.text("She juices herself and moans, \"<i>Stop teasing meeeeee,</i>\" doing her best to wriggle back against you, as if she could somehow impale herself on your digit.");
    else CView.text("She squeals, rocking her hips back against you and moaning, \"<i>Ohhhh I love it when you do that,</i>\" grinding her incredibly small love-button on your digit.");
    // Special Taurness
    if (player.body.legs.isTaur()) {
        CView.text("\n\nYou bop the tiny Faerie on the head to daze her briefly, then place her on a branch. You back yourself up against the tiny creature, lifting your tail so she can see your " + describeVagina(player, player.body.vaginas.get(0)) + ". The scent washes toward her and you hear a high pitched giggle; evidently that was more than enough to give her quite the contact high.  You feel a strange sensation in your slit as she slides her legs inside you and wraps her arms around your " + describeClit(player) + ".\n\n");

        // [If cock-like clit:
        if (player.body.clit.length >= 3) {
            CView.text("The tiny fae begins jerking your clit like a cock, squeezing her arms tightly around you and sliding in and out of your " + describeVagina(player, player.body.vaginas.get(0)) + ". Her motions are frenetic and unpredictable, but incredibly pleasurable.  She starts licking at your " + describeClit(player) + " as your femcum runs down it, which only serves to make her more excited. She gets so excited that her legs start kicking wildly as she screams \"<i>Swim! Swim! Swim! Swim!</i>\" over and over again.  ");
            // [Small amount of cum:
            if (player.body.vaginas.get(0)!.wetness <= VaginaWetness.WET) CView.text("The fae giggles more and more as the fluid seeps about her and your " + describeVagina(player, player.body.vaginas.get(0)) + " ripples. She hugs your " + describeClit(player) + " tighter and starts gently gnawing at it, such a peculiar sensation that you cum suddenly, and wetly.  Her giggles quickly become all-out laughter, and she loses her grip on your clit, sprawling to the ground into a small puddle of femcum.\n\n");
            // [Normal amount of cum:
            else if (player.body.vaginas.get(0)!.wetness <= VaginaWetness.DROOLING) CView.text("The fae giggles more and more as the fluid squirts about her and your " + describeVagina(player, player.body.vaginas.get(0)) + " ripples. She hugs your " + describeClit(player) + " tighter and starts gently gnawing at it, such a peculiar sensation that you cum suddenly, and wetly.  Her giggles quickly become all-out laughter, and she loses her grip on your clit, sprawling to the ground into a puddle of femcum.\n\n");
            // [Huge amount of cum:
            else CView.text("The fae giggles more and more as the fluid sprays about her and your " + describeVagina(player, player.body.vaginas.get(0)) + " ripples. She hugs your " + describeClit(player) + " tighter and starts gently gnawing at it, such a peculiar sensation that you cum suddenly, and wetly.  Her giggles quickly become all-out laughter, and she loses her grip on your clit, sprawling to the ground into a huge puddle of femcum, her giggling frame floating on the surface as her legs kick about erratically.\n\n");
        }
        // [All other clits:
        else {
            CView.text("The tiny fae rubs her hands around your " + describeClit(player) + " as if entranced by it. Your body responds by pumping out more femcum, which she laps up happily.  She starts laughing maniacally and banging on your clit like a drum, periodically yelling out \"<i>CONGA!</i>\" for some reason. The strange ministrations feel incredible though, and you feel your love canal squeezing down on the faerie's tiny body.  ");
            // [Small amount of cum:
            if (player.body.vaginas.get(0)!.wetness <= VaginaWetness.WET) CView.text("You cum suddenly, and wetly. The fae giggles more and more as the fluid seeps about her and your " + describeVagina(player, player.body.vaginas.get(0)) + " ripples. Her giggles quickly become all-out laughter, and she loses her grip on your innards, sprawling to the ground into a small puddle of femcum.\n\n");
            // [Normal amount of cum:
            else if (player.body.vaginas.get(0)!.wetness <= VaginaWetness.DROOLING) CView.text("You cum suddenly, and wetly. The fae giggles more and more as the fluid squirts around her and your " + describeVagina(player, player.body.vaginas.get(0)) + " ripples. Her giggles quickly become all-out laughter, and she loses her grip on your innards, sprawling to the ground into a puddle of femcum.\n\n");
            // [Huge amount of cum:
            else CView.text("You cum suddenly, and wetly. The fae tries desperately to hold on to your " + describeClit(player) + " but the amount of fluid overwhelms her and she's sent spiralling to the ground into a huge puddle of your fluid, her giggling frame floating on the surface as her legs kick about erratically.\n\n");
        }
    }
    // Non-Taurs
    else {
        CView.text("\n\nYou release the lower portion of your " + player.inventory.armor.displayName + ", revealing your aroused slit to the faerie.  ");
        if (FaerieFlags.FemFuck < 4) CView.text("Her mood immediately shifts from panic to desire, and she licks her lips hungrily, locking her eyes onto your feminine folds.");
        else CView.text("Her eyes open wide, like a junkie seeing a fix.  She licks her lips hungrily and humps the inside of your hand, ready for action.");
        CView.text("  You release the faerie, letting the pussy-entranced fae buzz down to your sensitive nether-regions.  She lands softly, her tiny feet and hands prancing over your vulva.  You gasp in delight, ");
        if (player.body.vaginas.get(0)!.wetness >= VaginaWetness.SLAVERING) CView.text("releasing a tiny squirt");
        else if (player.body.vaginas.get(0)!.wetness >= VaginaWetness.DROOLING) CView.text("dribbling juices");
        else if (player.body.vaginas.get(0)!.wetness >= VaginaWetness.WET) CView.text("growing so slippery the faerie nearly loses her footing");
        else CView.text("feeling yourself moistening with need");
        CView.text(" from the tiny touches.\n\n");

        // (small) <= .50\"
        if (player.body.clit.length <= .5) {
            CView.text("She pulls apart your lips, revealing your tiny bud and repositioning herself to plant her feet inside you.  The flawless skin of her thighs pulls another gasp of pleasure from your lips.  They squeeze tightly around your " + describeClit(player) + ", scissoring her gash across its sensitive surface.   You squirm, too engrossed in the rough grinding your button is receiving to worry about the faerie.   She clings to you, hanging on for dear life as your crotch nearly throws her free.  During the gyrations, she's slammed back into the " + describeClit(player) + ", instantly penetrated by the nub with a wet 'schlick'.\n\n");
            CView.text("Squealing and bouncing as she hangs on tightly, the faerie noisily orgasms around your clit, squirting her own fluids into your aching " + describeVagina(player, player.body.vaginas.get(0)) + ".  The fluid tingles, and you shove your fingers in, smearing the sticky-sweet faerie-cum through your passage.   Before you can get far with it, your own orgasm goes off, squeezing your fingers and rippling around them, trying to milk your hand as if it was a dick.  Your legs go weak and wobbly, forcing you down on your " + describeButt(player) + " as the waves of pleasure flow through you, soaking the faerie in girlcum.\n\n");
        }
        // (medium) <= .1.25\"
        else if (player.body.clit.length <= 1.25) {
            CView.text("She watches, entranced as your " + describeClit(player) + " hardens, poking between your lips, flushed with blood like a tiny cock.   The faerie swivels around, planting her dainty butt squarely on your snatch, sinking down a bit into the folds as she wraps her legs around the pulsating 'shaft'.   She hugs it, pressing it between her tiny breasts and licking it up and down, making you moan and squirm from unexpected stimulation of your most sensitive area.\n\n");
            CView.text("You spread your " + describeLegs(player) + ", careful not to dislodge the faerie as she releases the " + describeClit(player) + " and stands up, placing her dripping gash against the tip.   A quick plunge later and she's bottomed out, pressing her hips into the opening of your " + describeVagina(player, player.body.vaginas.get(0)) + " her feet slipping over the outer folds as she tries to maintain her balance.   You start rocking back and forth happily, bouncing the faerie up and down.  She moans, cute and barely audible, but sexy in a way that makes your sopping fuckhole even wetter.\n\n");
            CView.text("She orgasms on you, squirting copiously, drenching your " + describeClit(player) + " and " + describeVagina(player, player.body.vaginas.get(0)) + " in clear faerie-fluid.  It tingles, wicking into your button and soaking into your snatch, enhancing every sensation.  You can feel the cool forest air as it flows over your vulva, seeming to stroke you, and without any chance of holding yourself back, you plunge your fingers into your " + describeVagina(player, player.body.vaginas.get(0)) + ", immediately orgasming from the penetration, not even noticing the exhausted faerie sliding off the large clit and slipping partway into your cunt.\n\n");
        }
        // (streeeetch – large) <= 4.5\"
        else if (player.body.clit.length <= 4.5) {
            CView.text("Entranced by the growing " + describeClit(player) + ", the faerie caresses her body, watching your love-button swell up, not stopping until it looks too huge for her tiny frame.  She climbs in a circle around it, awestruck by the size and majesty of your cock-like button.    She looks up at you, aroused but worried, saying, \"<i>You're so... BIG.  Oh goddess, I want to feel it inside me!</i>\"\n\n");
            CView.text("She grabs hold of its slippery surface with both hands and jumps, lifting her lower body up before gravity yanks it back down onto the tip of your " + describeClit(player) + ".  The tip barely slips in, despite the slippery wetness of the faerie.   She screams, though in pleasure or pain you cannot be sure.  You reason that it must be pleasure, because the faerie is wiggling her hips and grabbing hold of the rest of your " + describeClit(player) + ", straining to pull herself further down the fem-cock.  Her belly starts to distort, displaying the cylindrical bulge on her tummy, expanding and contracting slightly as each of your heart-beats works through your clit.\n\n");
            CView.text("In time, she manages to fully impale herself, quivering in orgasm as she gets off from the vibrations your pounding heart sends through your " + describeClit(player) + ".  Her tongue lolls out and her eyes roll back, shut down by the extreme penetration, pain, and pleasure of the act.  You feel her cum soaking into you, sliding down into your slit and making your sensitive slit tingle.  Watching her get off is all it takes to bring you to orgasm with her, and the walls of your " + describeVagina(player, player.body.vaginas.get(0)) + " clamp down hungrily, contracting and gushing fluids over the faerie as she lies there, impaled on your crotch like a perverted ornament.\n\n");
        }
        // (too big) (else – hump dat shit)
        else {
            CView.text("Entranced by your swollen " + describeClit(player) + ", the faerie watches it slowly erect, filling with blood like a smooth over-sensitive cock.  She tentatively touches it, gasping and pulling back when it twitches in response.   With a look of awe, she turns to you and says, \"<i>There's no way I could take this beautiful monster, but I know I can make it feel good!</i>\"\n\n");
            CView.text("She jumps onto it, making it bounce in the air as it takes her relatively insubstantial weight.  Embracing it in a full-body hug, she starts grinding on it, smearing her thick faerie juices into the clit and giggling every time you twitch from the feeling.  You squirm, sinking down from the raw sensation, your " + describeLegs(player) + " giving out underneath you.   Grabbing hold of a stump, you try to steady yourself, but the faerie humping your " + describeClit(player) + " is interfering with your motor ability, and you slump into the forest loam, happily twitching as orgasm washes over you.\n\n");
            CView.text("Your " + describeClit(player) + " jumps, throwing the tiny woman off.  She slips and scrabbles across the surface of your " + describeVagina(player, player.body.vaginas.get(0)) + ", sliding into your soaking gash.  She's squeezed tightly, sloshed around in the wetness of your orgasm.   The faerie's eyes cross, as she grows dizzy and battered in the sizzling whirlpool that is your groin.\n\n");
        }
    }
    // [OH SHIT ITS OVER, POOR BITCH CRAWLS OUT ALL STONE ON GIRLCUM]
    // [FIRST TIME]
    if (FaerieFlags.FemFuck === 1) {
        CView.text("Lying in the forest loam as you recover, you watch as the faerie stumbles out of your groin, holding her head and giggling nonstop.  She tries to put on a serious face but it's instantly overpowered by another fit of laughter, \"<i>Hehe, did you know I'd get stoned off your girlcum?  Omigod I've never been this -heheheheheh- high before!  Like I can see EVERYTHING.  Puuhleeeease don't make me do this again...</i>\"\n\n");
        CView.text("She flies off, hungry and looking for a flower to munch on.");
    }
    // [REPEAT LOW]
    else if (FaerieFlags.FemFuck <= 5) {
        CView.text("The faerie slowly drags herself out of your " + describeVagina(player, player.body.vaginas.get(0)) + ", smiling broadly with her eyes dilated wide.  She slips off you, dropping to the ground and giggling, \"<i>Everything feels so soft.  Mmmm that was fun!</i>\"\n\n");
        CView.text("The little woman spins around happily, proclaiming, \"<i>The colors are like, so bright!  Oh gosh, I'm hungry!  See you and your clit later, just don't let me fall in your snatch, it fucks me up so much.  I don't think I can handle much more or I'll be crawling between your legs every chance I get!</i>\"\n\n");
        CView.text("She flits away, calling out, \"<i>Bye sweetie!</i>\"");
    }
    // [SLUTTIN IT UP]
    else {
        CView.text("The faerie stumbles out of your snatch, giggling and scooping the slippery girl-goo off her body, licking it up.  She crawls up your body to your lips, giving you a cunt-flavored kiss and babbling happily, \"<i>Mmm your cunt makes me so warm and giggly!  I'm so fucking stoned!  Gawddess, I'm hungry too – I'm gonna grab some food, and then come back for another dip in your honeypot, ok?</i>\"\n\n");
        CView.text("She flits away, a little unsteady and reeking of female sex and desire.");
    }
    player.orgasm();
    player.stats.lib += -2;
    player.stats.cor += .5;

    return { next: passTime(1) };
}

function faerieShooAway(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Faerie); // 17;
    CView.clear().text("You shake your hands, shooing away the tiny faerie.  She's clearly been touched by the magics of this land and you want nothing to do with her. With a pouting look, she turns and buzzes away.");
    return { next: passTime(1) };
}

function faerieDoNothing(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Faerie); // 17;

    if (player.body.chest.firstRow.nipples.length >= 1) {
        CView.text("She looks you over, stopping at your upper torso and letting out a cry of glee. She lands on your chest, her exposed pussy coming to rest on your nipple. With one hand she grabs hold of you above her head and uses her other hand to guide the rapidly hardening nub between her legs. She sighs in delight as her tight confines squeeze your nipple hard, the feeling somewhere between pinching fingers and suckling lips. You gasp in delight yourself, and you notice she can exercise amazing control with her groin muscles as a rippling feeling courses through your nipple.\n\n");
        CView.text("Your nipple starts to get sloppy and wet as if someone's tongue were around it, but it's really the faerie's love juices dribbling down, some running down your breast and some down her legs. She starts thrusting against you, and you notice her clit getting hard and pushing into your soft flesh. With a free hand you grab the area around your nipple and squeeze it harder, forcing more into her.\n\n");
        if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier > 1) CView.text("A squirt of milk shoots inside her, making the faerie moan. She looks up at you with lusty, slitted eyes, squeezing her legs together to draw more from you.\n\n");
        CView.text("Eventually you both find a rhythm and soon she's moaning loudly.  ");
        if (player.body.vaginas.length > 0) CView.text("With your other hand you start diddling your " + describeVagina(player, player.body.vaginas.get(0)) + ", adding your own soft moans to hers.  ");
        CView.text("A few blissful moments later, she shudders and you feel her uncontrolled spasms around your nipple.  ");
        if (player.body.vaginas.length > 0) CView.text("You join her shortly after.  ");
        CView.text("The faerie goes limp and spirals to the ground, crashing gently and still twitching in the afterglow. Stepping back carefully, you leave her.");
        if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier > 1.5) CView.text("\n\nA copious gout of your milk escapes her rosy folds.");
        player.orgasm();
        player.stats.lib += -2;

        return { next: passTime(1) };
    }
    if (player.body.clit.length >= 1.0 && player.body.clit.length <= 4.5 && player.body.vaginas.length > 0 && randInt(2) === 0) {
        CView.text("A smile crosses her face and she flutters down to your crotch. She starts by scissoring you despite the size difference, driving your clit into her despite its erect state. Compared to her, it looks massive. She swings one leg over it and starts impaling herself on it. Your taut clitoris barely fits inside her, and the tight confines on your sensitive nub are enough to make you weak in the knees. Staggering to the ground, you grab hold of her frail body in your fist and thrust her roughly on your engorged button. She wails in both pain and pleasure, being crushed and stretched open at once. Her cries of pain combined with the intense stimulation on your most sensitive part bring you to a quick orgasm.\n\n");
        if (player.body.vaginas.get(0)!.wetness >= VaginaWetness.DROOLING) CView.text("You drench the poor faerie completely in your female juices, soaking her hair and body. Overwhelmed and spent, you drop her to the ground and catch your breath. She licks up what's around her face, but is too weak to do anything else but lie in the dirt.\n\n");
        else CView.text("Shuddering, you maintain your composure and keep going, trying to ride the high for another. Eventually you look down and you can see the faerie's eyes have glazed over and rolled to the back of her head. Her cunt has started clamping down on you a lot harder, evidence of her state of near-constant orgasm. The random clenching brings you off again very quickly and you have an intense orgasm, joining your fae cohort.\n\n");
        CView.text("Time skips a beat and you eventually come down, gently relaxing your grip and disengaging the worn out faerie from your softening female parts. The faerie regains consciousness slowly and thanks you before flying off.");
        player.orgasm();
        player.stats.lib += -1;

        return { next: passTime(1) };
    }
    if (player.body.clit.length > 4.5) {
        CView.text("The faerie flies close to your ear and speaks in a volume that would be a whisper from another human, \"You've got some sexy parts girl, but you're too big for me. I hope you find someone to get you off so I can watch.\" Then she flies in front of you, cutely kisses the bridge of your nose, and flies off.");
        player.stats.lust += 5;

        return { next: passTime(1) };
    }
    CView.text("The faerie flies close to your nipple and sucks it gingerly.  You pant in pleasure as you feel it pucker tight in her mouth, tingling with her saliva.  She lets it pop free, swollen with arousal.  Her hand flicks it playfully, the sudden sensation fluttering through you as you close your eyes in pleasure.  You recover and find she has flown high into the trees, waving playfully as she escapes.\n\nYou frown and begin to dress yourself, flushing irritably as your nipples protrude further into your clothes than you remember.");

    let displayedText = false;
    for (const breastRow of player.body.chest) {
        breastRow.nipples.length += .25;
        if (breastRow.nipples.length > 3 || player.body.chest.sort(BreastRow.Largest).get(0)!.rating <= 2) {
            if (!displayedText) {
                CView.text("  Thankfully it appears to be temporary.");
                displayedText = true;
            }
            breastRow.nipples.length -= .25;
        }
    }
    player.stats.sens += 1;
    player.stats.lust += 5;

    return { next: passTime(1) };
}

// [No] *(let her go)
function letFaerieGo(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Faerie); // 17;

    CView.text("You apologize and release her, letting her fly away on gossamer wings.  She thanks you, buzzing up to your lips and planting a chaste kiss on your mouth.  She zips away into the woods without a glance back...");
    return { next: passTime(1) };
}
// [YES] *make her pleasure you
function faerieCaptureHJ(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.Faerie); // 17;
    FaerieFlags.Fucked += 2;

    if (FaerieFlags.Fucked < 15) {
        CView.text("You hold her tightly and scold her, \"<i>If you don't like hard cocks, you shouldn't be dressed up like a such a slut, flying around and teasing me like that.  You should be ashamed of yourself.  Now you've got me all worked up - so you better make it up to me and take care of my little 'problem'</i>.\"\n\n");
        CView.text("She looks up at you and gulps before nodding silently, unwilling or unable to resist your command.   ");
    }
    CView.text("You let her loose and she hovers in place, as if pondering her one last chance to escape.  She sighs and looks back up, blushing fiercely as she lands on your hip and gazes down at the bulge of your groin.  You can't help but laugh as she slips under your " + player.inventory.armor.displayName + ", crawling across your sensitive thigh towards your " + describeCocksLight(player) + ".\n\n");
    // Taurs get a special scene!
    if (player.body.legs.isTaur()) {
        CView.text("The tiny Faerie climbs on top of your " + describeCock(player, player.body.cocks.get(0)));
        if (player.body.cocks.length > 0) CView.text("largest " + nounCock(CockType.HUMAN));
        CView.text(" and crawls about on it for a while, getting used to its shape and taking in deep lungfuls of its musky odor. She wraps herself around you and begins rubbing herself up and down your hard length. As she moves around her tiny slit leaks cum in long streaks, teasing you with a cunt you can't penetrate. Pre begins to leak steadily from your tip as the faerie continues to work her way around, moaning quietly and betraying her inner desire.\n\n");
        CView.text("Your body begins to naturally jerk forward and backward, attempting to hump the mare that isn't there. You can feel the faerie sliding about until she clenches onto you tighter, which only serves to make you hump harder. Realizing her mistake too late, she attempts to loosen herself, but your wild bucking sends her flying forward.\n\n");
        CView.text("She smashes onto the end of your " + describeCocksLight(player) + " and grasps at it. Her face crushes into your urethra as her tiny legs wrap themselves around the tip. Your wildly flailing cock starts to grow larger as your orgasm approaches, but the faerie doesn't notice as she happily drinks up your pre.\n\n");
        // [No testicles:
        if (player.body.balls.count === 0) CView.text("Your tiny globules of semen go straight into her open mouth and she sucks them down gleefully before falling with a splat onto the pre soaked ground.\n\n");
        else {
            // [Small amount of cum:
            if (player.cumQ() < 50) CView.text("Your semen splashes straight into her face and she's quick to suck it up. She falls with a splat onto the pre soaked ground while your member drips periodic droplets of cum onto her head.\n\n");
            // [Normal amount of cum:
            else if (player.cumQ() < 200) CView.text("Your semen washes into her face and she loses her grip on your " + describeCocksLight(player) + ". She falls with a splat onto the pre soaked ground and you spray her with periodic spurts of fresh cum.\n\n");
            // [Huge amount of cum:
            else CView.text("Your semen collides with her face and she is propelled off of your cock onto the pre soaked ground. Your " + describeBalls(true, true, player) + " continue pumping out cum like a hose until she's almost swimming in it.\n\n");
        }
        player.orgasm();
        player.stats.lib += -.5;

        // Epilogue!
        if (FaerieFlags.Fucked < 10) CView.text("The faerie burps and giggles again before glaring up at you, accusing you with a mildly unfocused glare and asking, \"<i>Did you know we get drunk on cum?  Caushe I TRY SO HARRD not to get meshed up like this.</i>\"\n\n");
        else if (FaerieFlags.Fucked < 15) CView.text("The faerie burps and laughs drunkenly, patting the side of your " + describeLeg(player) + " and slurring, \"<i>Oh by Marae's ripe titsh!  I needed that.  Do you thhink you could catsch me again?  I love feeling your cum coating my body.</i>\"\n\n");
        else CView.text("The faerie burps and begins openly masturbating, panting and slurring happily, \"<i>Yush I-gasp-uh feel great!  MMMmmmhm, it makesh my twat so sensitive.  I'm gonna fly home and schtuff it full, then play with my clit till I fall ashleep!</i>\"\n\n");
        if (FaerieFlags.Fucked < 15) CView.text("She licks her fingers and rolls around laughing, \"<i>Hehe, who caresh!  I'm happy! WHEEEEE!</i>\"\n\n");
        CView.text("The faerie takes off, still dripping, and flying in something less than a straight line...");
    }
    // Non-taurs
    else {
        CView.text("The faerie reaches your swollen member and ");
        if (player.body.cocks.get(0)!.hasKnot()) CView.text("climbs atop your knot, wrapping her legs around the narrower shaft to hold on.  You can feel her cheeks resting atop the 'bulb' of your canine anatomy, teasing you with feminine features you're far too large to penetrate.  ");
        else if (player.body.cocks.get(0)!.type === CockType.HORSE) CView.text("climbs atop your " + describeCock(player, player.body.cocks.get(0)) + ", hanging onto your ring of prepuce and wrapping her legs as far around your horse-like maleness as she can.  ");
        else if (player.body.cocks.get(0)!.type === CockType.DEMON) CView.text("climbs atop your " + describeCock(player, player.body.cocks.get(0)) + ", hanging on to the corrupted nubs and nodules as she threads her legs between them, squeezing you tightly as she hangs on.  You can feel her wet gash sitting atop a particularly sensitive bump, teasing you with a tiny cunt you'll never be able to penetrate.  ");
        else if (player.body.cocks.get(0)!.type === CockType.TENTACLE) CView.text("climbs onto your squirming " + describeCock(player, player.body.cocks.get(0)) + ", wrapping her legs tightly around it as it wiggles and writhes with excitement.  Unbidden, it curls around and rubs its reddish-purple head against her face like an animal.  She gives it a gentle squeeze and licks it.  ");
        else CView.text("climbs on to your hardness, wrapping her legs tightly around it as she secures a perch against you.   You can feel her wet gash rubbing against your sensitive skin, teasing you with a tiny cunt you'll never be able to penetrate.  ");
        CView.text("Your internal muscles clench unconsciously, squeezing out a dollop of pre that rolls down into the faerie's hair, soaking her head and face.  You can't see her reaction, but you can feel it oozing between her body and you, lubricating her as she humps and rubs against you.  Tiny muffled moans escape your " + player.inventory.armor.displayName + ", indicating that some part of her is enjoying the task.\n\n");
        CView.text("Though she can only stimulate a few inches of you at a time, it feels really good – better than it should, and a budding warmth on the edge of release builds inside you.  Too late you realize you should have gotten at least partially undressed.  You cum before you can do anything about it, splattering your " + player.inventory.armor.displayName + " with seed and leaving a wet patch on the crotch.  You can feel it dripping back onto you and the faerie as more spunk squirts out, soaking the tiny girl in spooge as the wet spot grows.  ");
        if (player.cumQ() > 250) {
            CView.text("You cum uncontrollably, regretting your fertility as your body paints the inside of your " + player.inventory.armor.displayName + " with goopy whiteness.  ");
            if (player.cumQ() > 500) CView.text("The proof of your release forms a puddle around you as your legs give out and y");
            else CView.text("Falling backwards as your legs give out, y");
        }
        else CView.text("Y");
        CView.text("ou watch your wet groin squirm as the faerie finishes releasing your built-up tension and crawls out.  She's covered from head to toe in sloppy white jism, and is noisily slurping it up.\n\n");
        CView.text("She rolls off of you, staggers, and plops down on her cute little ass next to you");
        if (player.cumQ() > 500) CView.text(" in the cum");
        CView.text(", giggling drunkenly.  ");
        if (FaerieFlags.Fucked < 10) CView.text("The faerie burps and giggles again before glaring up at you, accusing you with a mildly unfocused glare and asking, \"<i>Did you know we get drunk on cum?  Caushe I TRY SO HARRD not to get meshed up like this.</i>\"\n\n");
        else if (FaerieFlags.Fucked < 15) CView.text("The faerie burps and laughs drunkenly, patting the side of your " + describeLeg(player) + " and slurring, \"<i>Oh by Marae's ripe titsh!  I needed that.  Do you thhink you could catsch me again?  I love feeling your cum coating my body.</i>\"\n\n");
        else CView.text("The faerie burps and begins openly masturbating, panting and slurring happily, \"<i>Yush I-gasp-uh feel great!  MMMmmmhm, it makesh my twat so sensitive.  I'm gonna fly home and schtuff it full, then play with my clit till I fall ashleep!</i>\"\n\n");
        if (FaerieFlags.Fucked < 15) CView.text("She licks her fingers and rolls around laughing, \"<i>Hehe, who caresh!  I'm happy! WHEEEEE!</i>\"\n\n");
        CView.text("The faerie takes off, still dripping, and flying in something less than a straight line...");
        player.orgasm();
        player.stats.lib += -.5;

        if (!player.effects.has(EffectType.Jizzpants))
            player.effects.create(EffectType.Jizzpants);
    }
    return { next: passTime(1) };
}

TimeEvents.set("Jizzed Pants", (player: Character): void | boolean => {
    if (player.effects.has(EffectType.Jizzpants)) {
        CView.text("\nYour " + player.inventory.armor.displayName + " squishes wetly with all the semen you unloaded into them, arousing you more and more with every movement.\n");
        player.stats.lust += 10 + player.stats.sens / 5;

        player.effects.removeByName(EffectType.Jizzpants);
        return true;
    }
});
