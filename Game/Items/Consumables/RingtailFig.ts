import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from '../../../Engine/Utilities/SMath';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import { Tail, TailType } from '../../Body/Tail';
import { Character } from '../../Character/Character';
import { ItemDesc } from '../ItemDesc';
import { skinFurScales } from '../../Descriptors/SkinDescriptor';
import { describeHair } from '../../Descriptors/HairDescriptor';
import { CView } from '../../../Page/ContentView';
import { displayModThickness } from '../../Modifiers/BodyModifier';

export class RingtailFig extends Consumable {
    public constructor() {
        super(ConsumableName.RingtailFig, new ItemDesc("RingFig", "a ringtail fig", "A dried fig with two lobes and thin dark rings just below its stem.  The skin is wrinkly and it looks vaguely like a bulging scrotum."));
    }

    public use(character: Character) {
        CView.clear();
        // eat it:
        CView.text("You split the fruit and scoop out the pulp, eating it greedily.  It's sweet and slightly gritty with seeds, and you quickly finish both halves.");

        let changes: number = 0;
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;

        // stat gains:
        // gain speed to ceiling of 80
        if (character.stats.spe < 80 && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\nYou twitch and turn your head this way and that, feeling a bit more alert.  This will definitely help when defending your personal space from violators.");
            changes++;
            if (character.stats.spe < 40) character.stats.spe += 1;
            character.stats.spe += 1;
        }
        // gain sensitivity
        if (character.stats.sens < 80 && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\nThe wrinkled rind suddenly feels alarmingly distinct in your hands, and you drop the remnants of the fruit.  Wonderingly, you touch yourself with a finger - you can feel even the lightest pressure on your " + skinFurScales(character) + " much more clearly now!");
            if (character.stats.sens < 60) character.stats.sens += 2;
            character.stats.sens += 2;
            changes++;
        }
        // lose toughness to floor of 50
        if (randInt(4) && character.stats.tou > 50 && changes < changeLimit) {
            CView.text("\n\nYou find yourself wishing you could just sit around and eat all day, and spend a while lazing about and doing nothing before you can rouse yourself to get moving.");
            if (character.stats.tou > 75) character.stats.tou += -1;
            character.stats.tou += -1;
            changes++;
        }

        // Sex stuff
        if (character.body.cocks.length > 0) {
            // gain ball size
            if (character.body.balls.count > 0 && character.body.balls.size < 15 && randInt(4) === 0 && changes < changeLimit) {
                CView.text("\n\nYour [balls] inflate, stretching the skin of your sack.  Exposing them, you can see that they've grown several inches!  How magical!");
                changes++;
                character.body.balls.size += 2 + randInt(3);
                character.stats.lib += 1;
            }
            // gain balls up to 2 (only if full-coon face and fur; no dick required)
            if (character.body.balls.count === 0 && character.body.skin.type === SkinType.FUR && randInt(3) === 0 && changes < changeLimit) {
                CView.text("\n\nAs you eat, you contemplate your masked appearance; it strikes you that you're dangerously close to the classic caricature of a thief.  Really, all it would take is a big, nondescript sack and a hurried gait and everyone would immediately think the worst of you.  In a brief fit of pique, you wish you had such a bag to store your things in, eager to challenge a few assumptions.  A few minutes into that line of thought, a twisting ache in your lower gut bends you double, and you expose yourself hurriedly to examine the region.  As you watch, a balloon of flesh forms on your crotch, and two lumps migrate from below your navel down into it.  <b>Looks like you have a sack, after all.</b>");
                character.body.balls.count = 2;
                character.body.balls.size = 1;
                changes++;
            }
        }
        // gain thickness or lose tone or whatever - standard message
        if (randInt(4) === 0 && character.body.thickness < 80 && changes < changeLimit) {
            CView.text(displayModThickness(character, 80, 2));
            changes++;
        }
        // bodypart changes:
        if (character.body.tails.reduce(Tail.HasType(TailType.RACCOON), false) && randInt(4) === 0 && changes < changeLimit) {
            // grow da tail
            // from no tail:
            if (character.body.tails.length >= 1) {
                CView.text("\n\nPain shivers through your spine and forces you onto the ground; your body locks up despite your attempt to rise again.  You can feel a tug on your spine from your backside, as if someone is trying to pull it out!  Several nodules form along your back, growing into new vertebrae and pushing the old ones downward and into your [armor].  An uncomfortable pressure grows there, as whatever development is taking place fights to free itself from the constriction.  Finally the shifting stops, and you're able to move again; the first thing you do is loosen your bottoms, allowing a matted tail to slide out.  <b>It twitches involuntarily, fluffing out into a ringed raccoon tail!</b>");
            }
            // from other tail:
            else {
                CView.text("\n\nYour tail goes rigid with pain, and soon your body follows.  It feels as though your spine is trying to push the growth off of your body... barely, you manage to turn your head to see almost exactly that!  A new ringed, fluffy tail is growing in behind its predecessor, dark bands after light.  Soon it reaches full length and a tear comes to your eye as your old tail parts from its end and drops to the ground like overripe fruit, dissolving.  <b>You now have a raccoon tail!</b>");
            }
            character.body.tails.clear();
            character.body.tails.add(new Tail(TailType.RACCOON));
            changes++;
        }
        // gain fur
        if ((character.body.legs.type === LegType.RACCOON && character.body.ears.type === EarType.RACCOON) && character.body.skin.type !== SkinType.FUR && changes < changeLimit && randInt(4) === 0) {
            CView.text("\n\nYou shiver, feeling a bit cold.  Just as you begin to wish for something to cover up with, it seems your request is granted; thick, bushy fur begins to grow all over your body!  You tug at the tufts in alarm, but they're firmly rooted and... actually pretty soft.  Huh.  <b>You now have a warm coat of " + character.body.hair.color + " raccoon fur!</b>");
            character.body.skin.type = SkinType.FUR;
            character.body.skin.adj = "";
            character.body.skin.desc = "fur";
            changes++;
        }
        // gain coon ears
        if (character.body.tails.reduce(Tail.HasType(TailType.RACCOON), false) && character.body.ears.type !== EarType.RACCOON && randInt(4) === 0 && changes < changeLimit) {
            // from dog, kangaroo, bunny, other long ears
            if (character.body.ears.type === EarType.DOG || character.body.ears.type === EarType.BUNNY || character.body.ears.type === EarType.KANGAROO) CView.text("\n\nYour ears compress, constricting your ear canal momentarily.  You shake your head to get sound back, and reach up to touch the auricles, to find a pair of stubby egg-shaped ears in their place.  <b>You now have raccoon ears!</b>");
            // from cat, horse, cow ears
            else if (character.body.ears.type === EarType.HORSE || character.body.ears.type === EarType.COW || character.body.ears.type === EarType.CAT) CView.text("\n\nYour ears tingle.  Huh.  Do they feel a bit rounder at the tip now?  <b>Looks like you have raccoon ears.</b>");
            // from human, goblin, lizard or other short ears
            else CView.text("\n\nYour ears prick and stretch uncomfortably, poking up through your " + describeHair(character) + ".  Covering them with your hands, you feel them shaping into little eggdrop ornaments resting atop your head.  <b>You have raccoon ears!</b>");
            character.body.ears.type = EarType.RACCOON;
            changes++;
        }
        // gain feet-coon
        if (character.body.ears.type === EarType.RACCOON && character.body.legs.type !== LegType.RACCOON && changes < changeLimit && randInt(4) === 0) {
            // from naga non-feet (gain fatigue and lose lust)
            if (character.body.legs.isNaga()) {
                CView.text("\n\nYour body straightens and telescopes suddenly and without the length of your snake half to anchor you, you're left with your face in the dirt.  A shuffling and scraping of falling scales sounds and a terrible cramp takes you as your back half continues migrating, subducting under your [butt] and making you feel extremely bloated.  As your once prominent tail dwindles to roughly the length of your torso, a sickly ripping noise fills your head and it bursts apart, revealing two new legs!  The tattered snake-skin continues melding into your groin as you examine the fuzzy legs and long-toed, sensitive feet.  <b>Looks like you now have raccoon hind-paws...</b> and an upset stomach.");
                character.stats.lust += -30;
                character.stats.fatigue += 5;
            }
            // from amoeba non-feet
            else if (character.body.legs.isGoo()) CView.text("\n\nYour gooey undercarriage begins to boil violently, and before you can do anything, it evaporates!  Left sitting on just the small pad of sticky half-dried slime that comprises your [butt], a sudden bulge under you is enough to push you onto your back.  Wondering idly and unable to see what's happening, you close your eyes and try to focus on what sensations you can feel from your lower body.  You feel... a swell of expansion, followed by weak muscles trying to contract for the first time, pulling flimsy, folded limbs apart and laying them flat.  As your attention wanders downward, you feel toes wiggling - far longer toes than you remember.  For several minutes you lie still and test muscles gingerly as your body solidifes, but when you can finally move again and look at your legs properly, what you see surprises you very little.  <b>You have fuzzy legs and a pair of long-toed raccoon paws!</b>");
            // from hooves or hard feet, including centaurs and bees
            else if (character.body.legs.type === LegType.HOOFED || character.body.legs.type === LegType.CENTAUR || character.body.legs.type === LegType.BEE || character.body.legs.type === LegType.PONY || character.body.legs.type === LegType.CHITINOUS_SPIDER_LEGS) {
                CView.text("\n\nYour [feet] feel very... wide, all of a sudden.  You clop around experimentally, finding them far less responsive and more cumbersome than usual.  On one step, one of your feet ");
                if (character.body.legs.type === LegType.HOOFED || character.body.legs.type === LegType.CENTAUR || character.body.legs.type === LegType.PONY) CView.text("pops right out of its hoof just in time");
                else CView.text("comes loose inside its long boot, and you pull it free with irritation only");
                CView.text(" for you to set it back down on a sharp rock!  Biting off a curse, you examine the new bare foot.  It looks much like a human's, except for the nearly-twice-as-long toes.  You find you can even use them to pick things up; the sharp rock is dropped into your hand and tossed far away.  The shed [foot] is quickly joined on the ground by its complement, revealing more long toes.  ");
                if (character.body.legs.isTaur()) CView.text("For a few minutes you amuse yourself with your four prehensile feet... you even make up a game that involves juggling a stone under your body by tossing it between two feet while balancing on the others.  It's only a short while, however, before your lower stomach grumbles and a searing pain makes you miss your catch.  Anticipating what will happen, you lie down carefully and close your eyes, biting down on a soft wad of cloth.  The pain quickly returns and drives you into unconsciousness, and when you awaken, your back legs are gone.  ");
                CView.text("<b>You now have two fuzzy, long-toed raccoon legs.</b>");
            }
            // from human, demon, paw feet
            else {
                CView.text("\n\nYour toes wiggle of their own accord, drawing your attention.  Looking down, you can see them changing from their current shape, stretching into oblongs.  When they finish, your foot appears humanoid, but with long, prehesile toes!  ");
                if ((character.body.legs.type === LegType.HUMAN || character.body.legs.type === LegType.DEMONIC_HIGH_HEELS || character.body.legs.type === LegType.DEMONIC_CLAWS) && character.body.skin.type !== SkinType.FUR) CView.text("The sensation of walking around on what feels like a second pair of hands is so weird that you miss noticing the itchy fur growing in over your legs...  ");
                CView.text("<b>You now have raccoon paws!</b>");
            }
            character.body.legs.type = LegType.RACCOON;
            changes++;
        }
        // gain half-coon face (prevented if already full-coon)
        if (character.body.face.type !== FaceType.RACCOON_MASK && character.body.face.type !== FaceType.RACCOON && randInt(4) === 0 && changes < changeLimit) {
            // from human/naga/shark/bun face
            if (character.body.face.type === FaceType.HUMAN || character.body.face.type === FaceType.SHARK_TEETH || character.body.face.type === FaceType.SNAKE_FANGS || character.body.face.type === FaceType.BUNNY) {
                CView.text("\n\nA sudden wave of exhaustion passes over you, and your face goes partially numb around your eyes.  ");
                // (nagasharkbunnies)
                if (character.body.face.type === FaceType.SHARK_TEETH || character.body.face.type === FaceType.SNAKE_FANGS || character.body.face.type === FaceType.BUNNY) {
                    CView.text("Your prominent teeth chatter noisily at first, then with diminishing violence, until you can no longer feel them jutting past the rest!  ");
                }
                CView.text("Shaking your head a bit, you wait for your energy to return, then examine your appearance.  ");
                // (if character skin.tone = ebony/black/ebony with tats and no fur/scales or if black/midnight fur or if black scales
                if (((character.body.skin.tone === "ebony" || character.body.skin.tone === "black") && (character.body.skin.type === SkinType.PLAIN || character.body.skin.type === SkinType.GOO)) || ((character.body.hair.color === "black" || character.body.hair.color === "midnight") && (character.body.skin.type === SkinType.FUR || character.body.skin.type === SkinType.SCALES))) {
                    CView.text("Nothing seems different at first.  Strange... you look closer and discover a darker, mask-line outline on your already inky visage.  <b>You now have a barely-visible raccoon mask.</b>");
                }
                else CView.text("A dark, almost black mask shades the " + skinFurScales(character) + " around your eyes and over the topmost portion of your nose, lending you a criminal air!  <b>You now have a raccoon mask!</b>");
            }
            // from snout (will not overwrite full-coon snout but will overwrite others)
            else {
                CView.text("\n\nA sudden migraine sweeps over you and you clutch your head in agony as your nose collapses back to human dimensions.  A worrying numb spot grows around your eyes, and you entertain several horrible premonitions until it passes as suddenly as it came.  Checking your reflection in your water barrel, you find ");
                // [(if black/midnight fur or if black scales)
                if (((character.body.hair.color === "black" || character.body.hair.color === "midnight") && (character.body.skin.type === SkinType.FUR || character.body.skin.type === SkinType.SCALES))) CView.text("your face apparently returned to normal shape, albeit still covered in " + skinFurScales(character) + ".  You look closer and discover a darker, mask-line outline on your already inky visage.  <b>You now have a barely-visible raccoon mask on your otherwise normal human face.</b>");
                else if ((character.body.skin.tone === "ebony" || character.body.skin.tone === "black") && (character.body.skin.type === SkinType.PLAIN || character.body.skin.type === SkinType.GOO)) CView.text("your face apparently returned to normal shape.  You look closer and discover a darker, mask-line outline on your already inky visage.  <b>You now have a barely-visible raccoon mask on your normal human face.</b>");
                else CView.text("your face returned to human dimensions, but shaded by a black mask around the eyes and over the nose!  <b>You now have a humanoid face with a raccoon mask!</b>");
            }
            character.body.face.type = FaceType.RACCOON_MASK;
            changes++;
        }
        // gain full-coon face (requires half-coon and fur)
        // from humanoid - should be the only one possible
        else if (character.body.face.type === FaceType.RACCOON_MASK && character.body.legs.type === LegType.RACCOON && character.body.skin.type === SkinType.FUR && randInt(4) === 0 && changes < changeLimit) {
            CView.text("\n\nYour face pinches with tension, and you rub the bridge of your nose to release it.  The action starts a miniature slide in your bone structure, and your nose extends out in front of you!  You shut your eyes, waiting for the sinus pressure to subside, and when you open them, a triangular, pointed snout dotted with whiskers and capped by a black nose greets you!  <b>You now have a raccoon's face!</b>");
            // from muzzleoid - should not be possible, but included if things change
            // Your face goes numb, and you can see your snout shifting into a medium-long, tapered shape.  Closing your eyes, you rub at your forehead to try and get sensation back into it; it takes several minutes before full feeling returns.  <b>When it does, you look again at yourself and see a raccoon's pointy face, appointed with numerous whiskers and a black nose!</b>
            changes++;
            character.body.face.type = FaceType.RACCOON;
        }
        // fatigue damage (only if face change was not triggered)
        else if (randInt(2) === 0 && changes < changeLimit && (character.body.face.type !== FaceType.RACCOON_MASK && character.body.face.type !== FaceType.RACCOON)) {
            CView.text("\n\nYou suddenly feel tired and your eyelids are quite heavy.  Checking your reflection, you can see small dark rings have begun to form under your eyes.");
            character.stats.fatigue += 10;
            changes++;
        }
        if (changes === 0) {
            CView.text("\n\nYawning, you figure you could really use a nap.");
            character.stats.fatigue += 5;
        }
    }
}
