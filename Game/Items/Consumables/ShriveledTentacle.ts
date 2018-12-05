import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { Tail, TailType } from 'Game/Character/Body/Tail';
import { WingType } from 'Game/Character/Body/Wings';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { numToCardinalText } from 'Game/Utilities/NumToText';
import { ItemDesc } from '../ItemDesc';
import { describeNipple } from 'Game/Descriptors/BreastDescriptor';
import { ReptilumFlags } from './Reptilum';
import { CView } from 'Page/ContentView';

export class ShriveledTentacle extends Consumable {
    public constructor() {
        super(ConsumableName.ShriveledTentacle, new ItemDesc("DryTent", "a shriveled tentacle", "A dried tentacle from one of the lake anemones.  It's probably edible, but the stingers are still a little active."));
    }

    public use(character: Character) {
        CView.clear();
        CView.text("You chew on the rubbery tentacle; its texture and taste are somewhat comparable to squid, but the half-dormant nematocysts cause your mouth to tingle sensitively.");
        let changes: number = 0;
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (character.effects.has(EffectType.HistoryAlchemist)) changeLimit++;

        // possible use effects:
        // - toughess up, sensitivity down
        if (randInt(3) === 0 && character.stats.tou < 50 && changes < changeLimit) {
            CView.text("\n\nYour skin feels clammy and a little rubbery.  You touch yourself experimentally and notice that you can barely feel the pressure from your fingertips.  Consumed with curiosity, you punch yourself lightly in the arm; the most you feel is a dull throb!");
            character.stats.tou += 1;
            character.stats.sens += -1;
            changes++;
        }
        // - speed down
        if (randInt(3) === 0 && character.stats.spe > 40 && changes < changeLimit) {
            CView.text("\n\nA pinprick sensation radiates from your stomach down to your knees, as though your legs were falling asleep.  Wobbling slightly, you stand up and take a few stumbling steps to work the blood back into them.  The sensation fades, but your grace fails to return and you stumble again.  You'll have to be a little more careful moving around for a while.");
            changes++;
            character.stats.spe += -1;
        }
        // - corruption increases by 1 up to low threshold (~20)
        if (randInt(3) === 0 && character.stats.cor < 20 && changes < changeLimit) {
            CView.text("\n\nYou shiver, a sudden feeling of cold rushing through your extremities.");
            changes++;
            character.stats.cor += 1;
        }
        // -always increases lust by a  of sensitivity
        // "The tingling of the tentacle

        // physical changes:
        // - may randomly remove bee abdomen, if present; always checks and does so when any changes to hair might happen
        if (randInt(4) === 0 && changes < changeLimit && character.body.tails.reduce(Tail.HasType(TailType.BEE_ABDOMEN), false)) {
            CView.text("\n\nAs the gentle tingling of the tentacle's remaining venom spreads through your body, it begins to collect and intensify above the crack of your butt.  Looking back, you notice your abdomen shivering and contracting; with a snap, the chitinous appendage parts smoothly from your backside and falls to the ground.  <b>You no longer have a bee abdomen!</b>\n\n");
            character.body.tails.clear();
            changes++;
        }
        // -may randomly remove bee wings:
        if (randInt(4) === 0 && (character.body.wings.type === WingType.BEE_LIKE_SMALL || character.body.wings.type === WingType.BEE_LIKE_LARGE) && changes < changeLimit) {
            CView.text("\n\nYour wings twitch and flap involuntarily.  You crane your neck to look at them as best you are able; from what you can see, they seem to be shriveling and curling up.  They're starting to look a lot like they did when they first popped out, wet and new.  <b>As you watch, they shrivel all the way, then recede back into your body.</b>");
            character.body.wings.type = WingType.NONE;
            character.body.wings.desc = "non-existent";
            changes++;
        }
        // -hair morphs to anemone tentacles, retains color, hair shrinks back to med-short('shaggy') and stops growing, lengthening treatments don't work and goblins won't cut it, but more anemone items can lengthen it one level at a time
        if (character.body.neck.gills && character.body.hair.type !== 4 && changes < changeLimit && randInt(5) === 0) {
            CView.text("\n\nYour balance slides way off, and you plop down on the ground as mass concentrates on your head.  Reaching up, you give a little shriek as you feel a disturbingly thick, squirming thing where your hair should be.  Pulling it down in front of your eyes, you notice it's still attached to your head; what's more, it's the same color as your hair used to be.  <b>You now have squirming tentacles in place of hair!</b>  As you gaze at it, a gentle heat starts to suffuse your hand.  The tentacles must be developing their characteristic stingers!  You quickly let go; you'll have to take care to keep them from rubbing on your skin at all hours.  On the other hand, they're quite short and you find you can now flex and extend them as you would any other muscle, so that shouldn't be too hard.  You settle on a daring, windswept look for now.");
            character.body.hair.type = 4;
            character.body.hair.length = 5;
            if (ReptilumFlags.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD === 0) {
                CView.text("  <b>(Your hair has stopped growing.)</b>");
                ReptilumFlags.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD = 1;
            }
            changes++;
            changes++;
            changes++;
            // (reset hair to 'shaggy', add tentacle hair status, stop hair growth)
            // appearance screen: replace 'hair' with 'tentacle-hair'
        }
        // -feathery gills sprout from chest and drape sensually over nipples (cumulative swimming power boost with fin, if swimming is implemented)
        if (randInt(5) === 0 && !character.body.neck.gills && character.body.skin.tone === "aphotic blue-black" && changes < changeLimit) {
            CView.text("\n\nYou feel a pressure in your lower esophageal region and pull your garments down to check the area.  <b>Before your eyes a pair of feathery gills start to push out of the center of your chest, just below your neckline, parting sideways and draping over your " + describeNipple(character, character.body.chest.firstRow) + "s.</b>  They feel a bit uncomfortable in the open air at first, but soon a thin film of mucus covers them and you hardly notice anything at all.  You redress carefully.");
            character.body.neck.gills = true;
            changes++;
        }
        // -[aphotic] skin tone (blue-black)
        if (randInt(5) === 0 && changes < changeLimit && character.body.skin.tone !== "aphotic blue-black") {
            CView.text("\n\nYou absently bite down on the last of the tentacle, then pull your hand away, wincing in pain.  How did you bite your finger so hard?  Looking down, the answer becomes obvious; <b>your hand, along with the rest of your skin, is now the same aphotic color as the dormant tentacle was!</b>");
            character.body.skin.tone = "aphotic blue-black";
            changes++;
        }
        // -eat more, grow more 'hair':
        if (character.body.hair.type === 4 && character.body.hair.length < 36 &&
            randInt(2) === 0 && changes < changeLimit) {
            const hairGrowth: number = 5 + randInt(3);
            character.body.hair.length += hairGrowth;
            CView.text("\n\nAs you laboriously chew the rubbery dried anemone, your head begins to feel heavier.  Using your newfound control, you snake one of your own tentacles forward; holding it out where you can see it, the first thing you notice is that it appears quite a bit longer.  <b>Your head-tentacles are now " + numToCardinalText(hairGrowth) + " inches longer!</b>");
            // (add one level of hairlength)
            changes++;
        }
    }
}
