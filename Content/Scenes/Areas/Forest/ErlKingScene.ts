import { Character } from 'Engine/Character/Character';
import { Flags } from 'Engine/Flags';
import { NextScreenChoices, choiceWrap, ScreenChoice } from 'Engine/Display/ScreenDisplay';
import { EffectType } from 'Content/Effects/EffectType';
import { kitsuneRaceScore, bunnyRaceScore, harpyRaceScore, gooRaceScore } from 'Content/Body/RaceScore';
import { CView } from 'Engine/Display/ContentView';
import { Time } from 'Engine/Utilities/Time';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { WingType } from 'Engine/Body/Wings';
import { randInt, randomChoice } from 'Engine/Utilities/SMath';
import { displayStretchButt } from 'Content/Modifiers/ButtModifier';
import { SkinType } from 'Engine/Body/Skin';
import { LegType } from 'Engine/Body/Legs';
import { CockType } from 'Engine/Body/Cock';
import { FaceType } from 'Engine/Body/Face';
import { gameOverMenu } from 'Content/Menus/InGame/GameOverMenu';
import { displayStretchVagina } from 'Content/Modifiers/VaginaModifier';
import { BreastRow } from 'Engine/Body/BreastRow';
import { passTime } from 'Content/Scenes/PassTime';

export const ErlKingFlags = Flags.register("Erlking", {
    ERLKING_ENCOUNTER_COUNTER: 0,
    WILD_HUNT_ENCOUNTERS: 0,
    ERLKING_DISABLED: 0,
    TIMES_ENCOUNTERED_PRINCESS_GWYNN: 0,
    GoldenAntlers: false,
});

export function encounterWildHunt(player: Character): NextScreenChoices {
    ErlKingFlags.WILD_HUNT_ENCOUNTERS++;

    if (ErlKingFlags.WILD_HUNT_ENCOUNTERS === 0) {
        return firstWildHuntEncounter(player);
    }
    else if (!ErlKingFlags.GoldenAntlers) {
        return repeatWildHuntEncounter(player);
    }
    else {
        return encounterPrincessGwynn(player);
    }
}

export function playerHuntScore(player: Character): number {
    let baseVal: number = (player.stats.int + player.stats.spe) - (player.stats.fatigue * 2);

    /*
    Conditional modifiers: +20 for Evade
            +20 for Runner
            +20 for Drider Half
            +30 Enlightened/Corrupted Ninetails
            +10 for each Akbal Blessing
            +10 Fast Perk
            +10 Incorporeality.  (Increases to +20 if player has wings)
            +10 Lunging Attacks
            -20 for Kitsune traits
            -20 for Rabbit traits
            -20 for Harpy traits
            -10 for Goo Half
            -10 for Centaur Half
    */

    if (player.effects.has(EffectType.Evade)) {
        baseVal += 20;
        // trace("+20 for Evade");
    }
    if (player.effects.has(EffectType.Runner)) {
        baseVal += 20;
        // trace("+20 for Runner");
    }
    if (player.body.legs.isDrider()) {
        baseVal += 20;
        // trace("+20 for Drider");
    }
    if (player.effects.has(EffectType.CorruptedNinetails)) {
        baseVal += 30;
        // trace("+30 For Ninetails");
    }
    if (player.effects.has(EffectType.EnlightenedNinetails)) {
        baseVal += 30;
        // trace("+30 for Ninetails");
    }

    // Akbal Blessings
    if (player.effects.has(EffectType.FireLord)) {
        baseVal += 10;
        // trace("+10 for Firelord");
    }
    if (player.effects.has(EffectType.Whispered)) {
        baseVal += 10;
        // trace("+10 for Whispered");
    }

    if (player.effects.has(EffectType.Fast)) {
        baseVal += 10;
        // trace("+10 for Fast");
    }
    if (player.effects.has(EffectType.Incorporeality)) {
        baseVal += 10;
        // trace("+10 for Incorporeal");
    }
    if (player.canFly()) {
        baseVal += 10;
        // trace("+10 for Flight");
    }

    // Heavy penalty for prey features. The penalty is applied PER FEATURE.
    if (kitsuneRaceScore(player) > 0) {
        baseVal -= (kitsuneRaceScore(player) * 20);
        // trace("-20 for each Kitsune part (-" + String(kitsuneRaceScore(player) * 20) + ")");
    }
    if (bunnyRaceScore(player) > 0) {
        baseVal -= (bunnyRaceScore(player) * 20);
        // trace("-20 for each Bunny part (-" + String(bunnyRaceScore(player) * 20) + ")");
    }
    if (harpyRaceScore(player) > 0) {
        baseVal -= (harpyRaceScore(player) * 20);
        // trace("-20 for each Harpy part (-" + String(harpyRaceScore(player) * 20) + ")");
    }
    if (gooRaceScore(player) > 0) {
        baseVal -= (gooRaceScore(player) * 10);
        // trace("-10 for each Goo part (-" + String(gooRaceScore(player) * 10) + ")");
    }

    if (player.body.legs.isTaur()) {
        baseVal -= 10;
        // trace("-10 for Taur");
    }

    if (baseVal < 0) baseVal = 0;
    // trace("Wild Hunt Points = " + baseVal);

    return baseVal;
}

export function firstWildHuntEncounter(player: Character): NextScreenChoices {
    CView.clear();

    CView.text("As you explore between the tall, ancient trees, you notice a thick fog beginning to spill out from between the trees and over the mossy ground. As the haze pours forth and flows past your [feet], you notice the forest around you growing distinctly darker and colder. \n\n");

    CView.text("A shiver of unnatural fear runs up your spine, just as a hunting horn sounds from the distance.  You gasp, your breath materializing as a puff of fine, white mist.  Just as the echoes of the horn fade, a chorus of canine howls breaks through the");
    if (Time.hour >= 0 && Time.hour <= 10) CView.text(" chill morning");
    else if (Time.hour >= 11 && Time.hour <= 13) CView.text(" unusually cold daytime");
    else if (Time.hour >= 14 && Time.hour <= 17) CView.text(" brisk afternoon");
    else if (Time.hour >= 18 && Time.hour <= 24) CView.text(" freezing night");
    CView.text(" air. Your eyes twitch and ears ring at the sound of hooves pounding through the forest.\n\n");

    CView.text("The unholy choir of horns, hounds, and hooves shake the woods around you as the fog rises, shoulder-high.  Your heart pounds - you’re not sure <b>why</b> you’re frightened, only that you <b>are</b>.  Something is out there in the darkness, and it's coming for you!  Do you flee, or stand your ground?\n\n");

    return {
        choices: [
            ["Wait", choiceWrap(firstWildHuntChase, true)],
            ["Run", choiceWrap(firstWildHuntChase, false)],
        ]
    };
}

function firstWildHuntChase(player: Character, waited: boolean = false): NextScreenChoices {
    CView.clear();

    if (waited === false) {
        CView.text("You stumble your way through the woods, but no matter which way you turn, you are greeted by bone-chilling fog.  Soon, canine snarls come from all sides.\n\n");
        CView.text("You’re surrounded.\n\n");
    }
    else {
        CView.text("The baying of hounds fills the air, and the trees echo with the distant thunder of hooves as the first of the creatures bursts through the fog.  Stooped and low, this beast-man is mostly canine, with a sharp-toothed muzzle spread wide and panting.  His red-black tongue dangles with each breath, steam rising up from his jaws.  The hound’s pelt is midnight black, covering his muscular frame.  Strong arms hang low, almost touching the ground, muscles flexing as his surprisingly human hands open and close restlessly.  His legs are distinctly dog-like, ending in wide, black-clawed paws.  Between its stocky legs; you catch a glimpse of an arm-thick sheath and a heavy sack behind.  A broad tail wags behind him, swinging slowly and menacingly");
        if (player.effects.has(EffectType.MetWhitney)) CView.text(", and for a moment all you can think of are Whitney’s canine peppers");
        CView.text(".\n\n");

        CView.text("His baleful red eyes glare at you from beneath a dark brow.  The hound takes in a deep breath, his nostrils flaring, then throws his head back to howl.  The deafening sound is answered instantly by the crashing of brush as another beast man leaps through the undergrowth.  The fog falls to shreds as he leaps out behind you, flanking you with his fellow Hound.\n\n");

        CView.text("To your horror, you see flashes of red as their slick shafts slide out, the air thick with heavy, panting breaths.");
        if (player.stats.cor >= 40) {
            if (player.body.cocks.length > 0 && player.body.vaginas.length <= 0) {
                CView.text("  You can't help but stiffen, yourself, at the sight of their eagerness.");
            }
            else if (player.body.vaginas.length > 0 && player.body.cocks.length <= 0) {
                CView.text("  As the air grows thick with their musk, your pussy grows wet, despite your best efforts.");
            }
            else if (player.body.vaginas.length > 0 && player.body.cocks.length > 0) {
                CView.text("  You feel a twitch from your cock");
                if (player.body.cocks.length > 1) CView.text("s");
                CView.text(" and an answering shiver from your pussy as you imagine those canine shafts being put to use.");
            }
            else {
                CView.text("  Your asshole twitches in response, aching to be filled.");
            }
        }
        CView.text("\n\n");
    }

    CView.text("But before the dogs move, the curtain of fog parts, and a figure on horseback rides into view.  The hounds go silent, as the tall figure pulls back his hood to look at you.\n\n");

    CView.text("He is tall, easily seven feet, and made more imposing by the massive, golden antlers arching upward from either side of his head.  He is clearly not human, and more closely resembles a black stag, sitting upright, watching you with the same piercing red eyes as the hounds.  His short, black fur rustles in a wind that is not there, his ears twitching in time to the beating of your heart.\n\n");

    CView.text("Most of his body is covered with fine clothing.  A cloak of dark green, decorated with complex patterns of gold, drapes over a hunting outfit of black leather.  One arm holds the reins of his mount, but the other, wearing a heavy leather hunting glove, grips a thick cane of shiny, black wood.  His legs taper down into slim, graceful hooves, and they touch down silently on the mossy ground as he dismounts.\n\n");

    CView.text("“<i>I am the Erlking, Master of the Wild Hunt,</i>” he says in a deep, hollow voice. “<i>and you... you are a very unusual [race].  My hounds can scent it on you.</i>” He gestures toward the stock-still hounds surrounding you. \n\n");

    CView.text("His gaze runs up and down your form, and despite yourself, you shiver at his attention.\n\n");

    if (waited) {
        // [If Stand Your Ground Selected]
        CView.text("“<i>You’re a brave one, aren’t you?  Standing your ground in the face of the Wild Hunt?  I applaud your audacity.  I’m going to enjoy hunting you....</i>”\n\n");
    }
    else {
        // [If Run Selected]
        CView.text("“<i>I’m afraid you’re going to have to learn to run faster if you hope to elude me in the future.  I do hope you won’t bore me.</i>”\n\n");
    }

    CView.text("Before you can say another word, the fog closes in, leaving nothing but the red glow from the eyes of the Erlking and his Hounds.  One by one, they vanish, the Erlking’s last, leaving you alone in the darkness, the mist, and the cold.\n\n");

    CView.text("Within a few moments, the wind picks up, blowing the fog away, leaving no trace of the mysterious Huntsman, save for a small package on the ground.  You hurriedly pick it up, unable to shake the eerie feeling that you’re being watched.\n\n");

    player.stats.fatigue += 10;

    if (waited)
        return player.inventory.items.createAdd(player, ConsumableName.CaninePepper, passTime(1));
    else return player.inventory.items.createAdd(player, ConsumableName.FoxBerry, passTime(1));
}

export function repeatWildHuntEncounter(player: Character): NextScreenChoices {
    CView.clear();

    CView.text("As you wander through the Deepwoods, a familiar chilly fog begins to gather around your [feet], and in the distance, you hear the sound of a hunting horn and the baying of Hounds.\n\n");

    CView.text("The Erlking is coming for you!\n\n");

    if (player.body.wings.type !== WingType.NONE) CView.text("You quickly glance from side to side, realizing that the trees here grow too close together for your to spread your [wings].\n\n");

    CView.text("Do you make a run for it or stand your ground?\n\n");

    return {
        choices: [
            ["Run", repeatWildHuntChase],
            ["Wait", repeatWildHuntWait],
        ]
    };
}

function repeatWildHuntWait(player: Character): NextScreenChoices {
    CView.clear();

    CView.text("The fog pours in like a wave, surrounding you and blurring the forest around you.  You hear the thunder of hooves approaching, followed by the baying of hounds.\n\n");

    CView.text("Unfazed, you cross your arms and stand firm, staring down the menacing fog. \n\n");

    CView.text("The sounds of the hunt grow louder and louder until the trees themselves appear to be shaking with the sounds of the approaching hunt.  You stand tall, refusing to play the Huntsman’s twisted game.\n\n");

    CView.text("The Hunt’s deafening approach abruptly quiets.  Like a tide going out, the fog drains away from around you, leaving the forest clear and calm. Slowly, the sounds of birdsong and insects return to the woods around you.  \n\n");

    CView.text("It seems the Erlking has no interest in chasing prey that won’t run.\n\n");

    if (player.stats.int < 80) player.stats.int++;

    return { next: passTime(1) };
}

function repeatWildHuntChase(player: Character): NextScreenChoices {
    const pScore: number = playerHuntScore(player);
    if (pScore > 150) {
        return repeatWildHuntEscaped(player);
    }
    else {
        return repeatWildHuntCaught(player, pScore);
    }
}

function repeatWildHuntEscaped(player: Character): NextScreenChoices {
    CView.clear();

    CView.text("The Erlking might be the Master of the Hunt, but you are no one’s prey.  You immediately begin running, moving like the wind through the Deepwoods, your heart beating hard in your chest.");
    if (player.body.legs.isGoo()) CView.text("You move like quicksilver over the forest floor, your slimy bottom half flowing over all obstacles, oozing you faster and faster, ever onward.");
    else if (player.body.legs.isBiped()) CView.text("  Your [legs] pound against the mossy ground, deftly moving across the forest floor.");
    else if (player.body.legs.isNaga()) CView.text("  You move like the wind across the mossy ground, your coils propelling you through the forest.");
    else if (player.body.legs.isDrider()) CView.text("  Your multitude of legs skitter over the forest floor, propelling you between the trees at great speed.");
    else if (player.body.legs.isTaur()) CView.text("  Your hooves send you rocketing through the forest, dodging between the trees and ducking below branches.");

    CView.text("  Though the fog snakes through the undergrowth, ever at your heels, it never manages to surround you, and you hear the sounds of the Hunt growing more and more distant until they disappear altogether.\n\n");

    CView.text("It looks like you’re in the clear... for now.\n\n");

    player.stats.fatigue += 10;

    if (randInt(5) === 0) {
        if (randInt(2) === 0) {
            player.stats.tou += 1;
        }
        else {
            player.stats.spe += 1;
        }
    }

    return { next: passTime(1) };
}

function repeatWildHuntCaught(player: Character, pScore: number): NextScreenChoices {
    CView.clear();

    // Player Hunt Score < 150.  The Erlking captures you.
    // If your score is above 100, the Erlking has his way with you.
    // If your score is below 100, Gangbang by his Hounds (canine anthros).
    // If the PC is a kitsune, bunny, or harpy, disregard Wild Points because the Erlking will ALWAYS opt to do the PC personally.
    // The Erlking leaves the PC a nicely-wrapped gift of foxberries or canine peppers,  The Hunt reverts to 0 points.

    CView.text("You run through the woods, heart pounding so hard you feel it might leap out of your throat.  Despite your best efforts, though, the fog still closes in.  With it comes the sound of the hounds, running alongside you, hidden in the thick haze. \n\n");

    CView.text("With the Hounds on your right, you juke left, nearly running into a tree, but stumble past it, only to hear the Hounds again on your left.  You turn right, still running, unable to shake the feeling that you’re being driven, but too panicked to figure a way out. \n\n");

    CView.text("Your lungs are burning as you run at top speed, the Hounds driving you this way and that.  Something happens as you breathe the fog - it’s getting harder and harder to think.  You just need to run, <b>run</b> from the predators after you.\n\n");

    CView.text("As you leap to clear a low bush, leaves explode around you, and the world flips upside down.  It’s a trap!  The net closes around you and hauls you up into the air, leaving you spinning, 15 feet up.  Hounds burst from the fog, barking and snarling from the ground below you.  Just out of arm’s reach is a thick rope, running from the ground up over the branch supporting you.\n\n");

    CView.text("The ropes are thicker than your wrist, and you could probably untie them, given time, but the spin of the net, combined with the mind-bending terror of the fog has left you no room to think.  The hounds are snarling, the world is spinning, you’re prey, and you’ve been caught.\n\n");

    if (bunnyRaceScore(player) >= 4 || kitsuneRaceScore(player) >= 4 || harpyRaceScore(player) >= 4 || pScore > 100) return repeatWildHuntAWinnerIsYou(player);
    else return repeatWildHuntGivenToTheHounds(player);
}

export function repeatWildHuntGivenToTheHounds(player: Character): NextScreenChoices {
    CView.text("“<i>How disappointing,</i>” drips the refined voice of the Erlking.  His horse’s hooves thud softly on the ground as he walks below you.  The cane at his side clicks against the forest floor with every other step.  You have just enough wherewithal to understand his words as your fingers grip the net.\n\n");

    CView.text("“<i>This was but a few minutes’ diversion.  I had been hoping for more of a challenge,</i>” he says, the red glow in his eyes dimming.  “<i>You’re not particularly good at this, are you?</i>” he says, sighing.  His long face looks almost wistful.\n\n");

    CView.text("“<i>Perhaps next time,</i>” he sighs.  He turns, his dark cloak flaring.  Is it your imagination or do his golden antlers seem a bit more dull?\n\n");

    CView.text("You allow yourself a brief moment of relief as he turns his attention from you.\n\n");

    CView.text("“<i>But it would be wrong to not reward my Hounds for a job well done.</i>”  His cane flashes with golden light as he slashes it against the support rope.\n\n");

    CView.text("The fog swallows the Erlking as you drop to the ground.  The impact against the mossy forest floor doesn’t injure you, but it <b>does</b> knock the wind from you.  As you struggle to regain your breath, you inhale the icy fog, and a cascade of terror... and something else... runs through you.\n\n");

    CView.text("This fear doubles as the two hounds waste no time.  They are on you in the space of a heartbeat, ripping the net from around you, their powerful hands shoving you to all fours as they snarl and bark.  Their red, shiny dog cocks slip from their heavy sheaths, throbbing with thin, purple veins.  The fog has definitely done something to you, because you can’t help but lick your lips at the sight.  \n\n");

    CView.text("Growling, the first Hound grabs you by your [ass], his muscular fingers sinking roughly into your flesh.  He roughly rips your [armor] from you, growling.  You feel a rush of warmth as a canine mouth presses against your [ass],");
    if (player.body.vaginas.length > 0) CView.text(" long tongue touching the bottom edge of your [vagina]");
    else if (player.body.balls.count > 0) CView.text(" long tongue lapping at the base of your balls");
    else if (player.body.cocks.length > 0) CView.text(" long tongue lapping at the base of your cock");
    else CView.text(" long tongue slapping warmly against your taint");
    CView.text(" before running up to your [asshole].\n\n");

    CView.text("You shiver, the fog-born fear still controlling your body.  You feel a rush of strange gratitude— the hounds don’t want to eat you, they just want to sate a different hunger.  And with the mindbending fog inside you, you want desperately to satisfy them.  Your submissive mind even hopes that if you can do a good job, they’ll spare you any further domination.  You’d be repulsed by the idea of fucking two Hounds to exhaustion if you weren’t so damn scared of them.  An errant thought at the back of your mind hopes that the effects of this fog are only temporary.\n\n");

    CView.text("You glance over your shoulder, wanting to make sure the Hound has no trouble getting into you,");
    if (player.body.legs.isTaur()) CView.text(" and realizing that you’re too tall, you fold your legs beneath you, dropping all the way to the ground,");
    CView.text(" when the other hound roughly grabs your");
    if (player.body.femininity < 30) CView.text(" strong jaw");
    else if (player.body.femininity > 70) CView.text(" delicate chin");
    else CView.text(" chin");
    CView.text(", turning it toward his massive, slimy dog cock.  You get a brief glimpse of a crystal-clear bead of pre before the tip is forced between your lips.\n\n");

    CView.text("The Hound begins fucking your face roughly, leaving salty precum on your tongue, his cock throbbing between your lips.  You feel grateful that the Hound has chosen to simply fuck you, and you want nothing more than to do the best job possible for the Hound.\n\n");

    CView.text("You groan around the Hound’s dick as you feel a pressure against your [asshole].  The beast squeezes your [ass] cheeks as he shoves his foot-long doggie cock into your rear. ");
    displayStretchButt(player, 12 * 3, true, false, false);
    CView.text(" You yelp, realizing what’s to come, and try to wriggle away, but, pinned between the two Hounds, there’s no escape.  The Hounds growl in unison and you freeze, cowed by the two powerful males who want their way with your frightened, vulnerable body.\n\n");

    CView.text("After all, comes a thought in your fog-addled head, they’ve earned the right to do whatever they want to their prey.\n\n");

    CView.text("It doesn’t take the two dog men long.  They rock back and forth, shoving their thick cocks in and out of your submissive, helpless body.  The one in front grabs your head, burying your [face] into his crotch, so deep that your tongue licks against the throbbing bulge of his knot, your nose buried in the thick fur above his shaft.");
    if (player.body.tails.length > 0) CView.text("  The Hound behind grabs you by [onetail], using it as a handhold as he thrusts over and over into your [asshole].");
    else CView.text("  The Hound behind grabs you by your [ass], thrusting into you again and again.");
    CView.text("  You tremble, completely dominated by the two powerful males as they make you their prey-bitch.\n\n");

    CView.text("They cum within moments of each other, the one in front driving his huge knot into your mouth, leaving your jaw aching.  You groan in protest as his cock shoots hot seed down your throat.  Nearly gagging on the canine dick already, there’s little you can do but swallow the Hound’s cum.  As you gurgle it down, you feel the Hound behind you painfully shove his thick knot into your ass.  You try to scream, but with a mouth full of cock and cum, there’s little you can do but take it like prey.  Your body quakes, belly swelling as you’re filled with cum at both ends leaving you warm, bloated, and strangely satisfied.\n\n");

    CView.text("You shiver, breathing in the cold, mind-altering fog, waiting obediently for the two Hounds to tire of you.  Oddly enough, with their seeds spent, they’re strangely affectionate, and you find your back, face, and ass covered in warm, languid licks from the savage men.  Eventually their knots shrink, and the two Hounds withdraw from you, letting you slump to the ground as they pad off into the woods.  \n\n");

    CView.text("As the fog recedes, your mind quickly returns.  Blinking, you wobble to your [feet], wiping cum from your lips and gathering your scattered gear from around the clearing before setting back for camp.  You find a shiny, red pepper in the clearing, but appear to have dropped some gems in your failed flight from the Hunt.\n\n");

    let gemLoss: number = 10 + randInt(15);
    if (player.inventory.gems < gemLoss) gemLoss = player.inventory.gems;
    player.inventory.gems -= gemLoss;

    CView.text("<b>You’ve lost " + gemLoss + " gems.</b>\n\n");
    player.stats.sens -= 2;
    player.stats.lib += 2;
    player.stats.cor += 1;
    player.stats.lust = 0;

    player.stats.fatigue += 10;
    player.orgasm();
    player.slimeFeed();
    return player.inventory.items.createAdd(player, ConsumableName.CaninePepper, passTime(1));
}

function repeatWildHuntAWinnerIsYou(player: Character): NextScreenChoices {
    CView.text("Spirited clapping fills the woods.  The Hounds fall silent, sitting obediently on their haunches as the Erlking walks into the clearing, dismounting and looking up at you.\n\n");

    CView.text("“<i>A spirited chase,</i>” he says, his black-gloved hands still chipping a sharp staccato through the cold air.  “<i>I have not had such fun in ages.</i>” The clearing is awash with a dim glow - it seems the Erlking’s golden antlers are lit with their own inner fire.\n\n");

    CView.text("“<i>And so, my hind, my prey, you have a choice,</i>” he says, his refined tones ringing through the air.  Through the net you can see the fog receding from the forest floor.  You take a few experimental breaths, and feel your head begin to clear.  \n\n");

    CView.text("He grasps the rope holding you up, and with strength surprising for his slim frame, lowers you down to the forest floor.  “<i>You have my thanks for a grand hunt,</i>” he says as, hand-over-hand, you are returned to the ground.	\n\n");

    CView.text("As you touch down on the moss, the net falls away from you, and the Erlking offers you a hand up.  “<i>I’d like to offer you something.</i>”\n\n");

    CView.text("You look up to see the slim, elegant form of the Erlking looking down at you.  Under his hunting gear, you can see the outline of a thick, equine cock, complete with triple prepuce rings straining against the black leathers.\n\n");

    CView.text("A reward for all this trouble would definitely be welcome, and as much as you would appreciate a gift, you’d even welcome the opportunity to unwind after the exertion of the hunt.  \n\n");

    CView.text("You pause for a moment to consider his words and realize he might be offering you more. If you’re feeling brave, you could ask for him to stop the hunt once and for all.  Or, if the hunt has finally broken your will, you might just submit to the huntsman forever.\n\n");

    CView.text("Even with so many of these thoughts crowding your mind, there’s still a tiny spark of resentment burning.  You could rush him and turn the tables on this cocky asshole.\n\n");

    // Sex	 	What’s my prize?		Stop the Madness 		Surrender Forever		How Dare You!
    player.stats.fatigue += 10;

    return {
        choices: [
            ["Sex", predatoryPrey],
            ["Prize?", whatsMyPrize],
            ["Stop", stopTheMadness],
            ["Surrender", surrenderToTheHounds],
            ["Revenge", howDareYou],
        ]
    };
}

function whatsMyPrize(player: Character): NextScreenChoices {
    CView.clear();

    CView.text("You stand up, brushing yourself off, and ignore the Erlking’s clearly-visible dick, stating that you’d like some compensation for all the trouble.\n\n");

    CView.text("“<i>Of course, of course!</i>” laughs the Erlking, reaching into one of his saddle bags, and retrieving a small bundle.  He tosses it to you.  “<i>Better luck to you on the next hunt!</i>”\n\n");

    CView.text("“<i>Next hunt?</i>” you begin, but before you can get the words out, the Erlking is already on his horse, thundering away through the trees.\n\n");

    // [You gain: Gems + Fox berries / Canine Peppers / Neon Pink Egg ]
    const gemFind: number = 10 + randInt(15);

    CView.text("<b>You found " + gemFind + " gems.</b>\n\n");

    const choice = randomChoice(ConsumableName.CaninePepper, ConsumableName.FoxBerry, ConsumableName.NeonPinkEgg);

    return player.inventory.items.createAdd(player, choice, passTime(1));
}

function stopTheMadness(player: Character): NextScreenChoices {
    ErlKingFlags.ERLKING_DISABLED = 1;
    CView.clear();

    // [This ends all the Erlking Encounters]

    CView.text("You have had enough of this maniac and his insane hunt.\n\n");

    CView.text("Supremely irritated, you tell him to stop hunting you. \n\n");

    CView.text("“<i>Stop?</i>” he asks, the red light in his eyes dimming.\n\n");

    CView.text("Narrowing your eyes, you begin to tell him exactly how fed up you are with this never-ending hunt.\n\n");

    CView.text("“<i>As you wish,</i>” says the Erlking.  The fog rolls in once more, engulfing the Erlking and his steed.  It clears a moment later, leaving you alone in the forest.\n\n");

    CView.text("You get the feeling you won’t be seeing him anymore.\n\n");

    return { next: passTime(1) };
}

function surrenderToTheHounds(player: Character): NextScreenChoices {
    // [Bad End]
    CView.clear();

    CView.text("You sit there, shivering, unable to shake off the effects of the fog, looking up in utter fear at the huntsman who has pursued you for so long.\n\n");

    CView.text("In a quavering voice, you bow your head, and ask him to take you as his prey once and for all.\n\n");

    CView.text("“<i>My poor hind,</i>” he mutters.  You feel his gloved hand on your head, running through your [hair] as your shoulders slump.  “<i>Perhaps I hounded you too fiercely,</i>” he murmurs, cupping your cheek.\n\n");

    CView.text("You shiver at his touch, completely broken.\n\n");

    CView.text("“<i>Look at me,</i>” he commands.  Completely obedient to the Hunter’s words, you look up, meeting his red-ember eyes.  “<i>I shall make amends,</i>” he says softly. \n\n");

    CView.text("The words rumble through you, and you feel a warm heat building in your stomach.  Something about your arms and legs feel... off... but you can’t take your eyes away from the Erlking’s, not even when pain lances through your body, your muscles swelling, your [armor] tearing and falling away.  The Erlking releases his hold on you and you look down immediately at your body.\n\n");

    if (player.body.skin.type === SkinType.FUR) CView.text("Your fur turns jet black.");
    else CView.text("Black fur runs down your body like a tide coming in.");
    CView.text("  Your muscles bulge and swell beneath the midnight coat.");
    if (player.body.chest.length > 0) CView.text("  Your chest first flattens out, then swells, as");
    else CView.text("  T");
    CView.text(" taut muscles fill in your entire frame.");
    if (player.body.legs.type === LegType.DOG) CView.text("  Your doggie paws tingle as muscles build there, rebuilding them as stocky, athletic hound legs.");
    else CView.text("  Your [legs] bend and crack, making you howl in pain as they rebuild themselves as onyx-clawed canine paws.");
    CView.text("\n\n");

    CView.text("Between your bestial legs, your genitals rearrange themselves.");
    if (player.body.vaginas.length > 0 && player.body.cocks.length <= 0) {
        CView.text("  Your clit swells to incredible size, throbbing a dull red, run through with purple veins.  You pant heavily, your tongue hanging out of your mouth, as the rest of your pussy closes, sealing as if it were never there, only to be replaced a moment later with the swelling of two massive testicles.");
    }
    else if (player.body.cocks.length > 0 && player.body.vaginas.length <= 0) {
        if (player.body.cocks.length > 1) {
            CView.text("  Your stomach lurches as your cocks slap together and begin melding into one swollen form.  It pulses and throbs, swelling at the base, pointing at the tip, becoming a single dog cock.");
        }
        else if (player.body.cocks.get(0)!.type !== CockType.DOG) {
            CView.text("  Your cock begins to shift and mold like clay, aching dull red, the veins darkening to purple, tip pulling out to form a throbbing, new dog cock.");
        }
        else {
            CView.text("  Your canine prick throbs painfully, leaving you panting and whining.");
        }
    }
    else if (player.body.vaginas.length > 0 && player.body.cocks.length > 0) {
        if (player.body.cocks.length > 1) {
            CView.text("  You pant heavily, your tongue hanging out of your mouth, as your pussy closes, sealing as if it were never there, only to be occluded a moment later with the curve of your swelling, massive testicles.  Your stomach lurches as your cocks slap together and begin melding into one swollen form.  It pulses and throbs, swelling at the case, pointing at the tip, becoming a single dog cock.");
        }
        else {
            CView.text("  You pant heavily, your tongue hanging out of your mouth, as your pussy closes, sealing as if it were never there, only to be occluded a moment later with the curve of your swelling, massive testicles.");

            if (player.body.cocks.get(0)!.type !== CockType.DOG) CView.text("  Your cock begins to shift and mold like clay, aching dull red, the veins darkening to purple, tip pulling out to form a throbbing, new dog cock.");
            else CView.text("  Your canine prick throbs painfully, leaving you panting and whining.");
        }
    }
    else if (player.body.vaginas.length <= 0 && player.body.cocks.length <= 0) {
        CView.text("  The smooth curve of your crotch ripples and bulges, and a cherry-red tip pushes out from your fur.  The wind around you picks up, blowing across your new, smooth doggie prick as it pushes out.  The overwhelming sensation has you shuddering, and you tilt your head back and howl.");
    }
    CView.text("\n\n");

    CView.text("The black fur covers your");
    if (player.body.balls.count === 0) CView.text(" new");
    CView.text(" balls and runs halfway up your shiny red pecker, forming a sheath.");
    if (player.body.wings.type !== 0) CView.text("  You whine, rolling on your back and with a start, realize that your wings must have fallen off while you were distracted with your cock.");
    CView.text("  You smile an open-mouthed doggie smile, feeling the warm churning of cum building in your throbbing balls.  You ache for release, wanting nothing more than to stroke yourself.  You raise your black-nailed hands to your cock, but stop short, knowing instinctively that masturbating is forbidden.\n\n");

    CView.text("Instead, you curl your stomach, trying to reach your cock with your mouth.");
    if (player.body.face.type !== FaceType.DOG) CView.text("  The world bends alarmingly as your nose pushes out, creating a black-furred muzzle where your mouth once was.");
    CView.text("  You whine, looking directly at your pointed dog cock, and the trickle of pre running from its tip, but even your");
    if (player.body.face.type !== FaceType.DOG) CView.text(" new");
    CView.text(" muzzle and broad, flat tongue can’t reach it.\n\n");

    CView.text("The Erlking... The Master, your mind corrects itself.  The Master murmurs softly to you.  “<i>Patience, Hound,</i>” he commands, pressing a strong, gloved hand against your chest, holding you down on the ground.  You go still, submissive to the Master as he kneels next to your prone form.  His other hand grasps your dick slowly, and your mind melts.\n\n");

    CView.text("You’re in absolute heaven as the Master pins you down, stroking your dick.  His gloved fingers work your shaft with elegant efficiency, running down your length, and squeezing in a delicious rhythm.  The hand on your chest stays firm, but runs through your fur, petting your broad, muscular chest.\n\n");

    CView.text("Your eyes roll back, tongue lolling as the Master squeezes the base of your cock.  Your");
    if (!player.body.cocks.get(0)!.hasKnot()) CView.text(" new");
    CView.text(" knot swells, and his firm hand on it feels sooo good.  At some point the two other Hounds have appeared, and you can feel, rather than see, their presence nearby.\n\n");

    CView.text("You whimper and groan in absolute bliss, and begin bucking without meaning to.  You want to stay still and submissive for the Master, but your body has other ideas.  You whine, wriggling and writhing against the Master’s hand.  He grunts, hand moving faster and faster, squeezing tighter around your doggie cock.\n\n");

    CView.text("With a woods-shaking howl, you climax, spraying your belly and chest with cum.  Your limbs go wobbly, and your eyes cross, barely able to see the Master’s spooge-spattered hand in front of your face.  You know what he wants and you obediently clean his glove with your tongue, slurping down your own cum from his fingers.\n\n");

    CView.text("The Master stands up, and as you wobble to your feet, the two other Hounds move forwards, their broad tongue licking your chest, stomach, and dick, cleaning the cum from your fur.\n\n");

    CView.text("<b>The Master sounds his horn, and your ears perk up.  Astride his horse, he gallops off into the fog-haunted woods, and, like the rest of the Hounds, you follow.</b>\n\n");
    return gameOverMenu(player);
}

function predatoryPrey(player: Character): NextScreenChoices {
    CView.clear();

    CView.text("You stand, unable to take your eyes from the Erlking’s slim body and erect dick.\n\n");

    CView.text("You smile seductively, asking the Erlking exactly what he’s offering.\n\n");

    CView.text("“<i>Exactly what you’re thinking,</i>” rumbles the Erlking.  You feel the voice vibrating up through your arm.  Maybe it’s the lingering effects of the fog, but you need the Huntsman inside you, his arms around you, and as he slips one arm around at the small of your back, the other behind your head, fingers entwined in your [hair], you melt into his embrace.  \n\n");

    CView.text("His warm mouth presses against your neck, his fingers undoing your [armor], letting it fall to the forest floor.  His touch sends warm shivers through you, and you moan as he walks you backward, pressing you firmly against a tree.\n\n");

    if (!player.body.legs.isTaur()) {
        if (player.body.vaginas.length > 0 && player.body.cocks.length <= 0) {
            CView.text("With your back against the tree, he guides your");
            if (player.body.legs.isBiped() || player.body.legs.isDrider() || player.body.legs.isGoo()) CView.text(" [legs] up, letting them wrap around his back.");
            else if (player.body.legs.isNaga()) CView.text(" tail up, letting your coils wrap around his back.");
            CView.text("  One hand grasps firmly under your [ass], holding you up, while the other plays softly across your chest, squeezing and caressing each of your [chest] in turn.  He tweaks your nipples, one by one, sending shockwaves of pleasure through your body.\n\n");

            CView.text("“<i>Take me, Huntsman,</i>” you moan.  His shaft is already poised, his equine dick sliding up into your [vagina], pushing deep inside you.");

            displayStretchVagina(player, 12 * 3, true, true, false);
            CView.text("\n\n");

            CView.text("You gasp, shuddering in delight as he begins to push in and out of you.  His hands shift, holding you under the arms, fucking you against the tree.  The rough bark scratches your back as he thrusts deep inside you.  You feel the triple rings of his prepuce rubbing against your inner walls.\n\n");

            CView.text("His speed builds, and his strong arms lift you up, sliding you up and down his shaft, letting your own weight fuck you against his dick, over and over.  You moan, body quaking as you cum, his shaft grinding deep against your womb.  After several minutes of steady rhythm, he grunts, pushing you down, and a moment later, he climaxes inside you, pumping you full of hot, thick cum.  You shudder as he floods you with jet after jet of his thick seed.\n\n");

            CView.text("You wrap your arms around him, clinging to him as he shifts his grip, bearing you up as you quake with aftershocks of pleasure.  One arm holds you up, close to his muscular chest, his other gloved hand strokes your [hair], as the fog rolls in.\n\n");

            CView.text("You feel drowsy as the air thickens with chill fog, though the Erlking’s body keeps you warm.  Despite your best efforts, you find yourself drifting to sleep in his arms.  \n\n");

            CView.text("You wake up an hour later, head spinning, feeling slightly tougher for all of the... exercise.\n\n");
        }
        else if (player.body.cocks.length > 0) {
            CView.text("With your back against the tree, he guides your");
            if (player.body.legs.isBiped()) CView.text(" [legs] up, letting them wrap around his back.");
            else if (player.body.legs.isNaga()) CView.text(" tail up, letting your coils wrap around his back.");
            CView.text("  One hand grasps firmly under your [ass], holding you up, while the other plays softly across your chest, tweaking each nipple before trailing down your stomach, grasping [oneCock]\n\n");

            CView.text("“<i>Take me, Huntsman,</i>” you groan.  His shaft is already at your [ass].  His equine dick pushing up into your [asshole], pushing deep inside you.");

            displayStretchButt(player, 12 * 3, true, true, false);
            CView.text("\n\n");

            CView.text("You gasp, shuddering in delight as he begins to push in and out of you.  His hands shift, one at the small of your back, steadying you, fucking you against the tree.  The other squeezes tight around your dick, jacking you off, gloved hand stroking you roughly in time to his thrusts.  The coarse bark of the tree scratches at your back as you feel the triple rings of his prepuce rubbing against the inner walls of your [asshole].  \n\n");

            CView.text("You moan, body quaking as you cum, spurting cum over his chest and your own, his shaft grinding deep inside you.  He pushes you down, and a moment later, he climaxes inside you pumping you full of hot, thick cum.  He floods your bowels with jet after jet of his thick seed, your belly swelling slightly outward from the volume of cum.\n\n");

            CView.text("You wrap your arms around him, clinging to him as he shifts his grip, holding you up as you quake with aftershocks of pleasure.  One arm holds you up, close to his now-sticky, muscular chest, his other gloved hand still slowly stroking your cock, as the fog rolls in.\n\n");

            CView.text("You feel drowsy as the air thickens with chill fog, though the Erlking’s body keeps you warm.  Despite your best efforts, you find yourself drifting to sleep in his arms. \n\n");

            CView.text("You wake up an hour later, head spinning, feeling slightly tougher for all of the... exercise.\n\n");
        }
    }
    else {
        CView.text("The Erlking smiles at you, caressing your cheek.  “<i>I pride myself in keeping a proper stable,</i>” he says, delicately moving behind you.  With his strong hands on your flanks, he guides you to face up against a tree.\n\n");

        if (player.body.vaginas.length > 0 && player.body.cocks.length <= 0) {
            CView.text("With your [chest] against the rough bark, he lifts your [tail], exposing your [pussy] to the swelling head of his equine cock.  With a soft sound, he pushes between your lips, letting you feel each prepuce ring as they squeeze into you.");

            displayStretchVagina(player, 12 * 3, true, true, false);
            CView.text("\n\n");

            CView.text("You wrap your arms around the trunk of the tree as his hands grip your flanks.  His own equine legs begin thrusting him against you, his ribbed cock sliding in and out of your [pussy], the ridges of his horselike shaft massaging you from the inside.  The force of his fucking ginds your [chest] against the tree.");
            if (player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier > 0) CView.text("  The friction begins milking you, making you ooze milk down the trunk.");
            CView.text("  The mild pain of abrasion couples with the pleasure of his forceful fucking and you feel your climax approaching.\n\n");

            CView.text("With a moan, you cum, hugging the tree with all your might, thrusting back with your hindquarters.  With gentlemanly demeanor, the Erlking continues pumping his thick cock in and out of you until your orgasm recedes.  He then cums himself, filling your insides with his hot spunk. \n\n");

            CView.text("He allows you a moment to catch your breath, the pulls out.  You hear his cock slap wetly against his thigh.  A strong hand takes yours, guiding you across the clearing to a fallen log. Dazed, you follow him, and he sits, guiding you to do the same next to him.  \n\n");

            CView.text("Reaching into his belt pouch, he pulls out a small bottle of salve.  One hand strokes your hair as the other begins to work the cream into your scratched [chest].  The cream is cool and soothing, and the Erlking is attentive.  You soon fall asleep, your head leaning against his chest.\n\n");

            CView.text("You wake up an hour later in the clearing, the Erlking gone and your chest unmarred.  You blink, sleepily, still feeling the Erlking’s arms around you and shakily climb to your feet, making your way back to \n\n");
        }
        else if (player.body.cocks.length > 0) {
            CView.text("With your [chest] against the rough bark, he crouches at your side, taking your already stiffening [oneCock] in his gloved hand.  From this angle, you feel, rather than see the cream he lathers on your [cock], working you to full hardness. One hand strokes your flank soothingly as the other wraps around your [cock], stroking you in his strong grip.\n\n");

            CView.text("You pant, fingertips gripping the bark of the tree as he jacks you off.  Your tongue lolls out as his gloved hand grips you firmly, moving faster and faster as he works his way up and down your length.  Whatever lube he used is incredible, and you feel a tingle on every down and up stroke.\n\n");

            CView.text("You can’t get enough of this feeling - being milked by the Erlking.  He even seems to be humming under his breath as he strokes your side and works you with deft fingers.  It’s like he’s calming some rutting stallion!  Your leg stamps reflexively, your [tail] swishing as your body announces your intent to cum.\n\n");

            CView.text("The Erlking responds by stroking you faster, his hand tightening, increasing the tingling pleasure from the cream.  You groan, gripping the tree trunk, rubbing your chest against it for extra stimulation, the rough bark scratching harshly against your [nipples].  \n\n");

            CView.text("The Erlking gives a final, tight squeeze, a fingertip pressed against the tip of your cock.  You moan, cumming in his hand, your cum jetting against his fingertips, spraying, hose-like, against the mossy forest floor.  \n\n");

            CView.text("You pant, exhausted, and you feel a damp cloth against your softening cock.  He wasn’t kidding about taking care of his mounts - the Erlking is cleaning you off.  He wipes your cock clean, even catching stray drops that spattered your underside.  The huntsman is thorough, and you yawn softly, dozing under his careful ministrations.  \n\n");

            CView.text("Sleepily, you’re only half aware as he guides you down to a grassy patch, where you quickly fall asleep.  You wake up an hour later in the clearing.  The Erlking is gone and but your cock gives a twitch as you remember his touch.  You shakily climb to your feet, making your way back to camp.\n\n");
        }
    }

    // [+10 Fatigue, +1 Toughness / +1 Strength, 100 hp healed]
    if (player.stats.tou < player.stats.str) {
        player.stats.tou += 1;
        player.stats.fatigue += 10;
        player.stats.HP += 100;
        player.stats.lust = 0;
    }
    else {
        player.stats.str += 1;
        player.stats.fatigue += 10;
        player.stats.HP += 100;
        player.stats.lust = 0;
    }

    player.orgasm();
    player.slimeFeed();

    return { next: passTime(1) };
}

function howDareYou(player: Character): NextScreenChoices {
    CView.clear();

    // [ends the Hunt permanently, Opens Princess Option]
    CView.text("You’ve had more than enough of the Erlking and his insane hunt.  You rise to your [feet], slapping away his outstretched hand.  He frowns, but before he can react, you’ve charged forward and knocked the black wood cane out of his hand.  It spins off into the undergrowth, out of sight.  The light in his eyes dims, as does the glow from his antlers.\n\n");

    CView.text("He stumbles backward, pained as if you’d struck him directly.  A look of confusion crosses his ridiculous deer face.  “<i>Wait - my cane - it fortifies me against the rigors of this land... </i>” he gasps, suddenly staggering.\n\n");

    CView.text("You sneer and stalk forward, another well-placed shove to his shoulders knocking him from his feet.  He drops to his knees with a groan.  At the edge of the clearing, the Hounds sit silently, awaiting the outcome of the confrontation.\n\n");

    CView.text("“<i>Please... my cane...</i>” he pleads.  On his knees, his trembling arms hold him up.  He seems to be telling the truth - without the cane, he’s as weak as a newborn.\n\n");

    CView.text("“<i>You taunt me, you hunt me, and now you ask for favors?</i>”  you snort.  “<i>No, no, you’re about to be taught a very lasting lesson,</i>” you snarl.\n\n");

    CView.text("“<i>What do yo-</i>” begins the Erlking, looking up at you.  You slap his face, cutting off the end of the question.\n\n");

    if (player.body.vaginas.length > 0 && player.body.cocks.length <= 0) {
        CView.text("You grab his horns, shoving him over backwards.  He seems to be getting weaker by the moment.  He can barely pick himself up off the ground.  You look down at the prone huntsman with disdain, striding to his head, your [feet] on either side of his head.\n\n");

        CView.text("“<i>What are yo-</i>” he tries to ask, before you crouch down, burying his deer-muzzle in your muff.  You grab the forward prongs of his antlers, steering his mouth against your dripping vagina.\n\n");

        CView.text("“<i>Lick it, Huntsman!</i>” you order, pulling on his antlers, his dark muzzle pushing hard against your pussy.  You snarl, feeling the timid push of his tongue against your pussy lips.\n\n");

        CView.text("“<i>Deeper!</i>” you command.  You feel his tongue explore deeper into your wet snatch, and you guide his wet deer nose to rub against your clit. \n\n");

        CView.text("“<i>Not a king anymore, are you?</i>” you growl, smiling.  “<i>You’re more like a Princess now.  A slutty, little Princess,</i>” you grin.  You see a tremble run down his chest and front, his cock straining against his tight leathers.  “<i>Eat my pussy, Princess,</i>” you order.\n\n");

        CView.text("Your princess moans, shuddering and submissive, shoving his flat tongue into your pussy.  It might be a trick of the light, but you swear his fur just got a little lighter.  His hips writhe, drawing attention to how slim and girlish they really are.  He’s obviously responding very well to the abuse.\n\n");

        CView.text("You sigh in satisfaction, settling down on his face, holding tight to his antlers and steering his lapping tongue.  You ride the Erlking’s face for nearly half an hour.  Eventually you climax, moaning in ecstasy, covering the huntsman’s face with your pussy juices.  You grind down hard on his face, pulling up hard on his horns.  With a cracking noise, his golden antlers come loose in your hands\n\n");

        CView.text("You stand, looking down at the disgraced forest lord.  He lies there, gasping, smeared with your pussy juices, dirt ground into his fur, his antlers broken.  From the wetness staining his leathers and hips, it looks like he came at some point, and it’s now slowly oozing out of his clothes, matting his fur.  Maybe it’s the spunk, but it looks as if his fur has an odd tint to it - slightly pink?  You shrug it off as some trick of the light as you gather yourself and prepare to leave.\n\n");

        CView.text("As you turn away, the fog rolls in low, engulfing the prone huntsman.  You know he definitely won’t be bothering you anymore.\n\n");
    }
    else if (player.body.cocks.length > 0) {
        CView.text("You undo your [armor], releasing your [cock].  Narrowing your eyes at the fallen hunter, you grab him by the antlers, shoving your cock in his face.\n\n");

        CView.text("“<i>Lick it, huntsman.  Make me good and wet,</i>” you growl.  \n\n");

        CView.text("Strangely, the Erlking needs little encouragement, and almost eagerly takes your [cock] into his long stag muzzle, his hot tongue running up and down the underside of your shaft.  Is it possible that the cane was reinforcing his mind as much as his body?  He moans in pleasure as you grip his antlers, driving yourself deep into his mouth.\n\n");

        CView.text("What the Erlking lacks in skill, he makes up for in enthusiasm, licking and sucking noisily at your cock.  When the huntsman has sufficiently lubed up your cock you shove back on his antlers, pushing his mouth from your [cock].  The force of the impact breaks his golden horns, and they come free in your hands.  The Erlking whimpers, hornless, looking up at you, reaching for your cock.\n\n");

        CView.text("“<i>On all fours, slut,</i>” you smirk, shoving the huntsman back.  You throw his horns to the side as he stumbles to the mossy ground, visibly weakened without his cane.  Somehow, you don’t think it’s only the loss of his cane making him so submissive.  He looks more like a doe now with his horns gone.\n\n");

        CView.text("The Erlking turns over on all fours, his cloak riding up over his shoulders.  Just above his taut buttocks is a tufted deer tail.  You smirk, grabbing the fluffy tail with one hand, and shoving down his leather pants around his knees.  He looks back over his shoulder at you.  The red light has gone out of his eyes, leaving them as wide, doe-brown eyes.  Heavy lashes blink hopefully at you as you spread his white-furred rump.\n\n");

        CView.text("“<i>Not a king anymore, are you?</i>” you growl, smiling.  “<i>You’re more like a Princess now.  A slutty, little Princess,</i>” you grin.  You see a tremble run down his back, and his soft, fluffy tail twitches in your hand.  “<i>Say it,</i>” you order.\n\n");

        CView.text("“<i>I... I’m a Princess,</i>” he mutters, his voice noticeably higher.  You smile, wondering what else the loss of his cane will do to your princess.\n\n");

        CView.text("“<i>Good girl,</i>” you coo, pressing your [cock] against his pucker.  The new princess moans, shuddering  as you do, shoving his ass back against you.\n\n");

        CView.text("You push into him, and he moans, tossing his head back.  He’s ridiculously tight, but hungry for it.  As you begin fucking him, his voice grows higher and higher, much more girly than his earlier, thundering boom.  Thrust after thrust, you push into his supple ass.  It might be a trick of the light as the last tendrils of mist fade away, but it seems like his fur is less dark than before.\n\n");

        CView.text("He shivers below you, tensing, as he grinds his hips back against you on every downstroke.  He bucks and moans, and you hear a splashing noise from beneath him.  From the looks of the sticky white pool growing, the slut is shooting his load HARD.\n\n");

        CView.text("The sight of his total submission turns you on so much that you shudder, cumming deep inside his ass, filling him up with your hot, sticky seed.  As you grip his ass, you pant, driving in as deep as possible, marking him as your bitch forever.\n\n");

        CView.text("He moans, slumping down, cheek to the ground, and you bend over him, grinding his face to the ground.\n\n");

        CView.text("“<i>Dirty little slut,</i>” you growl.  “<i>Did you like that?</i>”\n\n");

        CView.text("“<i>Y-yes...</i>” purrs the once-Lord.  “<i>I... I loved it...</i>” He shudders again, and you notice that the lighter fur is no illusion.  Your new doe princess is no longer midnight black, but a sandy-tan, and still slowly lightening.\n\n");

        CView.text("“<i>I don’t expect we’ll have any more problems, will we?</i>” you ask, sliding out of him.  You rise, watching as his fur takes on a curiously pink hue.\n\n");

        CView.text("“<i>No, my Lord,</i>” She croons, rising up to her knees, lapping at your dick.  Once she’s finished cleaning, she helps you with your [armor].  You nod a goodbye to her and begin walking, smirking in amusement at the trickle of cum running down her taut cheeks and down her legs as she waves farewell.\n\n");
    }

    ErlKingFlags.GoldenAntlers = true;
    player.orgasm();
    player.stats.lust = 0;

    return { next: passTime(1) };
}

function encounterPrincessGwynn(player: Character): NextScreenChoices {
    CView.clear();

    CView.text("As you wander through the Deepwoods, you hear a rustling in the bushes.  You turn to see a flash of pink between the trees.  A slim, graceful figure steps out from behind a tree, wearing a dark green cloak and a small, leather shoulder bag.  It takes you a moment to recognize the Princess, the once-Erlking.  Her deer-like face and large, doe eyes peer timidly at you.\n\n");

    CView.text("“<i>Muh-M’lord?</i>” she asks softly.  Her lithe arms push through the low branches and trees as she steps closer to you.  She’s timid and twitchy, quite different from the ominous and powerful huntsman she’d once been.  In a moment, you see why.\n\n");

    const selector: number = randInt(6);

    if (selector === 0) CView.text("The Princess’s pink fur is slathered in smears of saps and juices, and angry red stings pepper her body.  It’s very obvious that she’s fallen prey to the roaming tentacle monsters that haunt the forests.\n\n");
    else if (selector === 1) CView.text("The Princess winces as low branches drag across her ass, and you can see angry red claw marks criss-crossing her pert ass.  It seems she’s run afoul of Akbal, the feline lord of the Deepwoods.\n\n");
    else if (selector === 2) CView.text("The Princess coughs, a trickle of cum running down her lips and chin.  You see bruises on her throat and chin, and tiny claw marks across her body.  It looks like she was caught by a roving gang of imps.\n\n");
    else if (selector === 3) CView.text("The Princess’ pink fur is stained with multicolored blotches, and she sways a little bit, apparently woozy.  Goblin attacks can leave a person that way for quite some time.\n\n");
    else if (selector === 4) CView.text("The Princess’ neck and wrists bear bruises, as if someone had bound her up roughly and repeatedly.\n\n");
    else if (selector === 5) CView.text("As she turns to squeeze between two trees, you see that the Princess has numerous claw marks up and down her back.  It looks like, since her transformation, her Hounds have turned on her.\n\n");

    CView.text("Despite that, she looks very happy to see you.  She’s become more feminine since you last saw her.  Her hair is tufted up into a rose-colored pixie cut with two spritely pigtails at the nape of her neck. Her chest is still flat, but she’s lost muscle mass, making her tall, thin, and androgynous.  Her black leathers are gone, and her fur is mostly cotton-candy pink, accented by her white chest, stomach, and thighs.  Her cock swings with each careful movement, a mottled white and pink, matching her fur, with three prepuce rings.  She steps forward, her long, deer legs giving her hips an unintentional sway as she gingerly minces toward you.\n\n");

    CView.text("“<i>Master!  It’s wonderful to see you again!</i>” she coos, throwing her arms around your shoulders, kissing you with pink, pouty lips.  “<i>I’ve been having so much </i>fun<i> as a Princess!  I can’t believe how much happier I am now!  Thank you </i>so<i> much!</i>”  Her voice sounds a bit slurred, as if she’s been mentally affected by slutting around in the Deepwoods.\n\n");

    if (ErlKingFlags.TIMES_ENCOUNTERED_PRINCESS_GWYNN === 0) {
        CView.text("“<i>I’m so happy you helped me get rid of that nasty old cane,</i>” she says, waving a pink-furred arm vaguely at the forest.  “<i>It may have kept out the corruption, but it was giving me a </i>weird<i> idea of fun,</i>” she bubbles.  “<i>No more hunting for me - no, sir!</i>”\n\n");
        CView.text("She touches her white fingers to her chest and purrs demurely, “<i>You can call me Gwynn, now.  But I’ll still be your princess!</i>”\n\n");
    }

    ErlKingFlags.TIMES_ENCOUNTERED_PRINCESS_GWYNN++;

    CView.text("“<i>What can I do to repay you?</i>” Gwynn chirps cutely, kissing your cheek.  ");

    if (player.body.cocks.length > 0) CView.text("“<i>I could suck your dick, or you could fuck my princess pussy, or ");
    else CView.text("“<i>");
    if (player.body.vaginas.length > 0) CView.text("I could eat your pussy, ");
    CView.text(" or I could share some of my special potion with you,</i>” she counts the options off on her slim fingers.\n\n");

    CView.text("You run through the options in your head, even briefly considering ‘getting some of her potion’ on your own terms.\n\n");

    // Suck My Dick  /  Fuck Her Ass  /  Eat My Pussy  /  Milk Her Dick  /  Gifts

    const choices: ScreenChoice[] = [];
    if (player.body.cocks.length > 0) {
        choices[0] = ["Suck Me", gwynnSucksDicks];
        choices[1] = ["Assfuck", gwynnGetsButtfuxed];
    }
    if (player.body.vaginas.length > 0) {
        choices[2] = ["Eat Me", gwynnNomsDaCunts];
    }
    choices[3] = ["Milk Dick", gwynnGetsDickmilked];
    choices[4] = ["Gifts", gwynnGibsGifts];

    return { choices };
}

function gwynnSucksDicks(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("“<i>Yes, of course, M’Lord!</i>” Gwynn burbles, happily, dropping down to her knees.  In an instant, your [cock] is in her wet mouth.  Her time in the woods has developed her skill as she moans around your [cock], slurping wetly at it.\n\n");

    CView.text("Her slim tongue rubs against the underside of your shaft, massaging it in time to the bobbing of her head.  Her index finger and thumb form a slim O at the base of your dick, pumping it counter to her head bobs, giving you continuous stimulation as she hums.\n\n");

    CView.text("She hums as she works, sounding like the happiest little slut in the world.  She expertly works your cock, stroking and pumping your meat with her wet, hungry mouth and you feel yourself breathing heavily as her slurping grows louder and more eager.  \n\n");

    CView.text("The vibration of her chirpy voice and pressure of her lips around your cock soon push you over the edge, and with a relaxed shudder, you cum in her mouth.  She takes the first jet down her throat, then pulls her mouth from your dick with a satisfied gasp, taking the next jet across her face.\n\n");

    CView.text("“<i>Oooooo...</i>” she moans, shivering in delight, her tongue lapping at the dripping cum, her fingers delicately wiping the thick spooge from her cheeks and depositing it in her mouth.  You notice that she’s shoved two of her slim fingers up her cute, perky ass as she slurps away at your spilled seed.\n\n");

    CView.text("Satisfied, you pat her head, ruffling her short, pink hair, leaving her happy and smiling.\n\n");

    CView.text("“<i>Thank you, M’lord!</i>” she calls as you walk off.\n\n");

    // [Libido + 2]
    player.stats.lib += 2;
    player.stats.lust = 0;

    player.orgasm();

    return { next: passTime(1) };
}

function gwynnGetsButtfuxed(player: Character): NextScreenChoices {
    CView.clear();

    CView.text("“<i>At once, M’Lord!</i>” she says, clapping her hands excitedly.  She bounces up in the air, then bounds low to the ground, pulling a small bottle from her purse, and dumping a liberal amount of raspberry-scented lube on your cock.  She works it in, her slim fingers massaging your cock to full attention before she hops around.\n\n");

    CView.text("“<i>Princess Gwynn is always prepared!</i>” she chirps happily.\n\n");

    CView.text("She drops her shoulders to the ground and raises her white rump in the air, her pink, tufted tail twitching excitedly.  “<i>Your Princess is ready for you, m’Lord!</i>”\n\n");

    CView.text("You grin and grip her ass, pushing your slippery cock into her pink bud.  She’s a lot looser than she was before, and you slide easily into her.  She purrs as you sink in, inch after inch, your hands gripping her small, plush ass.  It seems like her time spent with the monsters in the woods has stretched her out immensely.  You just hope she won’t be too loose.\n\n");

    CView.text("“<i>Oh Master, yes!  Fuck my lovely cunt!</i>” she moans as you bury yourself inside her.  Her hole twitches and tightens, and you realize you needn’t have worried.  As you begin thrusting in and out of her, her hole begins squeezing tighter and tighter around your cock.  Her ass milks your dick as you plunge deep inside her and draw out.\n\n");

    CView.text("She moans and purrs, eyes rolled back and tongue hanging out as you have your way with her.  When you finally cum, her pink-and-white cock spills out her own load, strangely raspberry-scented, onto the forest floor.  Her hole doesn’t stop squeezing you, and continues to milk you until you’re completely spent.\n\n");

    CView.text("You withdraw from her and she sits up, giggling, spinning on her knees to slurp at your cock, cleaning you off.  Just as when you first turned her, she cleans you completely, then helps you dress, giggling happily as you kiss her cheek farewell.\n\n");

    // [Sensitivity -2]
    player.stats.sens -= 2;
    player.stats.lust = 0;

    player.orgasm();

    return { next: passTime(1) };
}

function gwynnNomsDaCunts(player: Character): NextScreenChoices {
    CView.clear();

    CView.text("“<i>Yes Ma’am,</i>” she says, licking her lips.  She points to a nearby stump, gesturing for you to have a seat on the soft moss.  As you do, she wastes no time in dropping her pink muzzle to your pussy.  \n\n");

    CView.text("Her tongue eagerly plunges between your folds, running up and down the length of your pussy. Each time her muzzle bobs up, her candy-pink nose rubs against your clit, and she purrs, closing her eyes and nuzzling it.  She slowly laps at your slit, gradually building speed.\n\n");

    CView.text("You sigh happily, bracing yourself with your arms and leaning back.  Princess Gwynn slurps noisily at your muff, her tongue moving faster and faster.  You gasp, pleasure building in your whole body as she withdraws her tongue from your pussy, wrapping her lips around your pleasure button.\n\n");

    CView.text("Two long, slim fingers slide into your pussy as she sucks on your love button.  Her tongue flickers and massages your clit as her finger pump in and out of your dripping snatch.  She hums, letting the vibrations from her lips travel in and buzz around your clitty.  Just as you shiver, on the edge of your orgasm, she closes her teeth lightly on your clitty, humming and buzzing them against your sensitive nub.  You cry out, gushing pussyjuices down her chin and chest.  She keeps licking, drawing another shivering orgasm on the heels of the first. \n\n");

    CView.text("You slump back on the stump, trembling.  You glance down");
    if (player.body.chest.length > 0) CView.text(" between your breasts");
    CView.text(" to see her smiling and elegantly licking her slim fingers clean. You shudder as she begins lapping at your pussy, cleaning you methodically.");

    CView.text("When you can finally move again, Princess is kneeling next to you obediently.  She closes her eyes, smiling as you pat her head, ruffling her pink hair.  When you stand, she rises to help dress you, blowing you a kiss as you leave the forest behind.\n\n");

    // [Sensitivity -2, Libido +2]
    player.stats.sens -= 2;
    player.stats.lib += 2;
    player.stats.lust = 0;

    player.orgasm();

    return { next: passTime(1) };
}

function gwynnGetsDickmilked(player: Character): NextScreenChoices {
    CView.clear();

    CView.text("“<i>My Lord, are you sure?</i>” she says, tilting her head to the side.\n\n");

    CView.text("You assure her that this is what you want and order her onto her back, lying on the soft, mossy ground.  One lithe arm is draped over her head, the other crosses over her chest, as she bites her lip, looking up at you nervously.\n\n");

    CView.text("Her dick is already rigid, a foot long and mottled pink and white, like clouds at dawn.  You kneel down next to her and grasp it slowly, your fingers finding natural handholds along her triple prepuce rings.\n\n");

    CView.text("“<i>Master, I have lube in my bag... if you’d like to use it, that is,</i>” she says shyly, reaching into her purse and offering you a small, pink bottle.  You realized that this purse used to be one of her saddlebags.  As you uncork the bottle and pour out a liberal amount of lube over her massive, flat-headed equine cock, you idly wonder if she used to carry lube as the Erlking.\n\n");

    CView.text("You begin stroking her thick cock, feeling her pulse through it as it throbs under your fingers.  You squeeze it roughly, drawing a squeal from Princess Gwynn as she bites her bottom lip.  Unsure of what to do with her hands, she runs them through her own hair, looking up at the canopy from under heavy lids.  Her long lashes flutter as she pants shallowly.\n\n");

    CView.text("Faster and faster you pump her, until her breath comes in shallow gasps and her body trembles at the edge of orgasm.  You’re immediately seized by a wicked idea, and with your free hand, you pull her tail up, raising her ass in the air.  She squeaks in pain but you’re not done yet.  You curl her whole lower body over, and aim her heavy cock at her face.\n\n");

    CView.text("“<i>Oh, nuh-nooo...</i>” she gasps, her knees now planted on either side of her head.\n\n");

    CView.text("“<i>Oh, yes,</i>” you coo wickedly, shoving the lithe doe’s cock into her own mouth.  She blathers a muffled protest before you give her tufted tail another sharp tug, drawing out her orgasm..\n\n");

    CView.text("Her cock spurts into her own mouth, immediately ballooning out her cheeks.  Her eyes roll back in her head as she gurgles around her cock.  Slightly-pink, raspberry-scented cum spills out from her pouty lips, as she coughs and nearly chokes on her own cum.  \n\n");

    CView.text("You drop her tail, letting it thump to the ground, her hooves digging tiny furrows in the dirt as her cock arcs out a trail of thick spooge down her flat chest.  She moans, pink spooge drooling out from her mouth.  You watch, both amused and surprised, as her first act upon regaining her senses is to begin scooping up her own cum and licking it off her fingers.\n\n");

    CView.text("Satisfied that she’ll be fine, you stand up, leaving the slutty doe to clean herself up.\n\n");

    // [Lust +20, Libido +2]
    player.stats.lust += 20;
    player.stats.lib += 2;

    return { next: passTime(1) };
}

function gwynnGibsGifts(player: Character): NextScreenChoices {
    CView.clear();

    CView.text("“<i>Do you have any presents for your Master?</i>” you ask casually.\n\n");

    CView.text("Princess Gwynn claps her hands, bouncing on one foot, then the other.  “<i>Yes I do, M’Lord!  Yes I do!</i>”  She stops bouncing long enough to rifle through her purse, pulling out a small, pink bottle. \n\n");

    CView.text("“<i>This is my lube!</i>” she says with a smile.  “<i>Well, I use it for lube.  But you can also drink it to help control yourself when you don’t want to go crazy with lust,</i>” she babbles.  Her chirpy voice and new, even more bubbly attitude makes you unsure about this claim.  You give her a look and she blinks at you with wide eyes.  “<i>It’s yummy,</i>” she assures you with a bob of her head. \n\n");

    CView.text("She minces up to you, placing the bottle in your hands and giving you a kiss on the cheek.  “<i>I only have one on me, but if my Lord gives me a little time, I can make more,</i>” she purrs, kissing you softly on the lips, biting lightly on your bottom lip as she presses and rubs her flat chest and cock against you.\n\n");

    CView.text("“<i>I’ll get started on it right away!</i>” she says suddenly.  She pulls away from you, nods her head seriously, then bounds off into the woods.\n\n");

    CView.text("Before you can stop her, she’s gone, and you pocket the small bottle for later.\n\n");

    return player.inventory.items.createAdd(player, ConsumableName.PrincessPucker, passTime(1));
}
