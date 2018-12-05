import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { ArmType } from 'Game/Character/Body/Arms';
import { EarType } from 'Game/Character/Body/Ears';
import { EyeType } from 'Game/Character/Body/Eyes';
import { FaceType } from 'Game/Character/Body/Face';
import { AntennaeType } from 'Game/Character/Body/Antennae';
import { SkinType } from 'Game/Character/Body/Skin';
import { VaginaType } from 'Game/Character/Body/Vagina';
import { WingType } from 'Game/Character/Body/Wings';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { ItemDesc } from '../ItemDesc';
import { describeVagina } from 'Game/Descriptors/VaginaDescriptor';
import { describeHair } from 'Game/Descriptors/HairDescriptor';
import { describeFeet } from 'Game/Descriptors/LegDescriptor';
import { describeBreastRow, describeNipple } from 'Game/Descriptors/BreastDescriptor';
import { CView } from 'Page/ContentView';
import { displayKillCocks, growCock, displayLengthChange } from 'Game/Modifiers/CockModifier';
import { displayModFem, displayModThickness, displayModTone } from 'Game/Modifiers/BodyModifier';
import { Settings } from 'Game/Settings';

export class GoblinAle extends Consumable {
    public constructor() {
        super(ConsumableName.GoblinAle, new ItemDesc("Gob.Ale", "a flagon of potent goblin ale", "This sealed flagon of 'Goblin Ale' sloshes noisily with alcoholic brew.  Judging by the markings on the flagon, it's a VERY strong drink, and not to be trifled with."));
    }

    public use(character: Character) {
        let changes: number = 0;
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (randInt(4) === 0) changeLimit++;
        if (randInt(5) === 0) changeLimit++;
        if (character.effects.has(EffectType.HistoryAlchemist)) changeLimit++;
        CView.clear();
        CView.text("You drink the ale, finding it to have a remarkably smooth yet potent taste.  You lick your lips and sneeze, feeling slightly tipsy.");
        character.stats.lust += 15;
        // Stronger
        if (character.stats.str > 50) {
            character.stats.str += -1;
            if (character.stats.str > 70) character.stats.str += -1;
            if (character.stats.str > 90) character.stats.str += -2;
            CView.text("\n\nYou feel a little weaker, but maybe it's just the alcohol.");
        }
        // Less tough
        if (character.stats.tou > 50) {
            CView.text("\n\nGiggling, you poke yourself, which only makes you giggle harder when you realize how much softer you feel.");
            character.stats.tou += -1;
            if (character.stats.tou > 70) character.stats.tou += -1;
            if (character.stats.tou > 90) character.stats.tou += -2;
        }
        // antianemone corollary:
        if (changes < changeLimit && character.body.hair.type === 4 && randInt(2) === 0) {
            // -insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            CView.text("\n\nAs you down the potent ale, your head begins to feel heavier - and not just from the alcohol!  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels smooth, silky, and fibrous; you watch as it dissolves into many thin, hair-like strands.  <b>Your hair is now back to normal!</b>");
            character.body.hair.type = 0;
            changes++;
        }
        // Shrink
        if (randInt(2) === 0 && character.body.tallness > 48) {
            changes++;
            CView.text("\n\nThe world spins, and not just from the strength of the drink!  Your viewpoint is closer to the ground.  How fun!");
            character.body.tallness -= (1 + randInt(5));
        }
        // Speed boost
        if (randInt(3) === 0 && character.stats.spe < 50 && changes < changeLimit) {
            character.stats.spe += 1 + randInt(2);
            CView.text("\n\nYou feel like dancing, and stumble as your legs react more quickly than you'd think.  Is the alcohol slowing you down or are you really faster?  You take a step and nearly faceplant as you go off balance.  It's definitely both.");
            changes++;
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
        // SEXYTIEMS
        // Multidick killa!
        if (character.body.cocks.length > 1 && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\n");
            displayKillCocks(character, 1);
            changes++;
        }
        // Boost vaginal capacity without gaping
        const bonusVCap = character.effects.getByName(EffectType.BonusVCapacity);
        if (changes < changeLimit && randInt(3) === 0 && character.body.vaginas.length > 0 && bonusVCap && bonusVCap.values.vaginalCapacity < 40) {
            if (!character.effects.has(EffectType.BonusVCapacity))
                character.effects.create(EffectType.BonusVCapacity);
            bonusVCap.values.vaginalCapacity = 5;
            CView.text("\n\nThere is a sudden... emptiness within your " + describeVagina(character, character.body.vaginas.get(0)) + ".  Somehow you know you could accommodate even larger... insertions.");
            changes++;
        }
        // Boost fertility
        if (changes < changeLimit && randInt(4) === 0 && character.body.fertility < 40 && character.body.vaginas.length > 0) {
            character.body.fertility += 2 + randInt(5);
            changes++;
            CView.text("\n\nYou feel strange.  Fertile... somehow.  You don't know how else to think of it, but you're ready to be a mother.");
        }
        // Shrink primary dick to no longer than 12 inches
        else if (character.body.cocks.length === 1 && randInt(2) === 0 && changes < changeLimit && !Settings.hyperHappy) {
            if (character.body.cocks.get(0)!.length > 12) {
                changes++;
                let temp3: number = 0;
                CView.text("\n\n");
                // Shrink said cock
                if (character.body.cocks.get(0)!.length < 6 && character.body.cocks.get(0)!.length >= 2.9) {
                    character.body.cocks.get(0)!.length -= .5;
                    temp3 -= .5;
                }
                temp3 += growCock(character, character.body.cocks.get(0)!, (randInt(3) + 1) * -1);
                displayLengthChange(character, temp3, 1);
            }
        }
        // GENERAL APPEARANCE STUFF BELOW
        // REMOVAL STUFF
        // Removes wings and antennaes!
        if ((character.body.wings.type === WingType.BEE_LIKE_SMALL || character.body.wings.type === WingType.BEE_LIKE_LARGE || character.body.wings.type >= WingType.HARPY) && changes < changeLimit && randInt(4) === 0) {
            if (character.body.wings.type === WingType.SHARK_FIN) CView.text("\n\nYour back tingles, feeling lighter.  Something lands behind you with a 'thump', and when you turn to look, you see your fin has fallen off.  This might be the best (and worst) booze you've ever had!  <b>You no longer have a fin!</b>");
            else CView.text("\n\nYour shoulders tingle, feeling lighter.  Something lands behind you with a 'thump', and when you turn to look you see your wings have fallen off.  This might be the best (and worst) booze you've ever had!  <b>You no longer have wings!</b>");
            character.body.wings.type = WingType.NONE;
            changes++;
        }
        // Removes wings and antennaes!
        if (character.body.antennae.type > AntennaeType.NONE && changes < changeLimit && randInt(3) === 0) {
            CView.text("\n\nYour " + describeHair(character) + " itches so you give it a scratch, only to have your antennae fall to the ground.  What a relief.  <b>You've lost your antennae!</b>");
            changes++;
            character.body.antennae.type = AntennaeType.NONE;
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
        // -Remove extra breast rows
        if (changes < changeLimit && character.body.chest.length > 1 && randInt(3) === 0) {
            changes++;
            const lastRow = character.body.chest.get(character.body.chest.length - 1);
            CView.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + describeBreastRow(lastRow) + " shrink down, disappearing completely into your ");
            if (character.body.chest.length >= 3) CView.text("abdomen");
            else CView.text("chest");
            CView.text(". The " + describeNipple(character, lastRow) + "s even fade until nothing but ");
            if (character.body.skin.type === SkinType.FUR) CView.text(character.body.hair.color + " " + character.body.skin.desc);
            else CView.text(character.body.skin.tone + " " + character.body.skin.desc);
            CView.text(" remains. <b>You've lost a row of breasts!</b>");
            character.stats.sens += -5;
            character.body.chest.remove(character.body.chest.length - 1);
        }
        // Skin/fur
        if (character.body.skin.type !== SkinType.PLAIN && changes < changeLimit && randInt(4) === 0 && character.body.face.type === FaceType.HUMAN) {
            if (character.body.skin.type === SkinType.FUR) CView.text("\n\nYour fur itches incessantly, so you start scratching it.  It starts coming off in big clumps before the whole mess begins sloughing off your body.  In seconds, your skin is nude.  <b>You've lost your fur!</b>");
            if (character.body.skin.type === SkinType.SCALES) CView.text("\n\nYour scales itch incessantly, so you scratch at them.  They start falling off wholesale, leaving you standing in a pile of scales after only a few moments.  <b>You've lost your scales!</b>");
            if (character.body.skin.type > SkinType.SCALES) CView.text("\n\nYour " + character.body.skin.desc + " itches incessantly, and as you scratch it shifts and changes, becoming normal human-like skin.  <b>Your skin is once again normal!</b>");
            character.body.skin.adj = "";
            character.body.skin.desc = "skin";
            character.body.skin.type = SkinType.PLAIN;
            changes++;
        }
        // skin.tone
        if (character.body.skin.tone !== "green" && character.body.skin.tone !== "grayish-blue" && character.body.skin.tone !== "dark green" && character.body.skin.tone !== "pale yellow" && changes < changeLimit && randInt(2) === 0) {
            if (randInt(10) !== 0) character.body.skin.tone = "dark green";
            else {
                if (randInt(2) === 0) character.body.skin.tone = "pale yellow";
                else character.body.skin.tone = "grayish-blue";
            }
            changes++;
            CView.text("\n\nWhoah, that was weird.  You just hallucinated that your ");
            if (character.body.skin.type === SkinType.FUR) CView.text("skin");
            else CView.text(character.body.skin.desc);
            CView.text(" turned " + character.body.skin.tone + ".  No way!  It's staying, it really changed color!");
        }
        // Face!
        if (character.body.face.type !== FaceType.HUMAN && changes < changeLimit && randInt(4) === 0 && character.body.ears.type === EarType.ELFIN) {
            changes++;
            character.body.face.type = FaceType.HUMAN;
            CView.text("\n\nAnother violent sneeze escapes you.  It hurt!  You feel your nose and discover your face has changed back into a more normal look.  <b>You have a human looking face again!</b>");
        }
        // Ears!
        if (character.body.ears.type !== EarType.ELFIN && changes < changeLimit && randInt(3) === 0) {
            CView.text("\n\nA weird tingling runs through your scalp as your " + describeHair(character) + " shifts slightly.  You reach up to touch and bump <b>your new pointed elfin ears</b>.  You bet they look cute!");
            changes++;
            character.body.ears.type = EarType.ELFIN;
        }
        if (randInt(4) === 0 && character.body.neck.gills && changes < changeLimit) {
            CView.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.body.neck.gills = false;
            changes++;
        }
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
        if (changes < changeLimit && randInt(4) === 0 && ((character.body.butt.wetness > 0 && !character.effects.has(EffectType.MaraesGiftButtslut)) || character.body.butt.wetness > 1)) {
            CView.text("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            character.body.butt.wetness--;
            if (character.body.butt.looseness > 1) character.body.butt.looseness--;
            changes++;
        }
        if (changes < changeLimit && randInt(3) === 0) {
            if (randInt(2) === 0) displayModFem(character, 85, 3);
            if (randInt(2) === 0) displayModThickness(character, 20, 3);
            if (randInt(2) === 0) displayModTone(character, 15, 5);
        }
    }
}
