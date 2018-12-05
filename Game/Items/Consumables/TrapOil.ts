import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { Cock } from 'Game/Character/Body/Cock';
import { EyeType } from 'Game/Character/Body/Eyes';
import { VaginaType } from 'Game/Character/Body/Vagina';
import { WingType } from 'Game/Character/Body/Wings';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { numToCardinalText } from 'Game/Utilities/NumToText';
import { ItemDesc } from '../ItemDesc';
import { describeCocksLight } from 'Game/Descriptors/CockDescriptor';
import { Gender } from 'Game/Character/Body/GenderIdentity';
import { describeFeet } from 'Game/Descriptors/LegDescriptor';
import { CView } from 'Page/ContentView';
import { displayModThickness } from 'Game/Modifiers/BodyModifier';
import { growCock } from 'Game/Modifiers/CockModifier';

export class TrapOil extends Consumable {
    public constructor() {
        super(ConsumableName.TrapOil, new ItemDesc("TrapOil", "a vial of trap oil", "A round, opaque glass vial filled with a clear, viscous fluid.  It has a symbol inscribed on it, a circle with a cross and arrow pointing out of it in opposite directions.  It looks and smells entirely innocuous."));
    }

    public use(character: Character) {
        CView.clear();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (character.effects.has(EffectType.HistoryAlchemist)) changeLimit++;
        CView.text("You pour some of the oil onto your hands and ");
        if (character.stats.cor < 30) CView.text("hesitantly ");
        else if (character.stats.cor > 70) CView.text("eagerly ");
        CView.text("rub it into your arms and chest.  The substance is warm, coating and ever so slightly numbing; it quickly sinks into your skin, leaving you feeling smooth and sleek.");

        // Speed Increase:
        if (character.stats.spe < 100 && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\nYou feel fleet and lighter on your toes; you sense you could dodge, dart or skip away from anything.");
            character.stats.spe += 1;
            changes++;
        }
        // Strength Loss:
        else if (character.stats.str > 40 && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\nA sense of helplessness settles upon you as your limbs lose mass, leaving you feeling weaker and punier.");
            character.stats.str += -1;
            changes++;
        }
        // Sensitivity Increase:
        if (character.stats.sens < 70 && character.body.cocks.length > 0 && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\nA light breeze brushes over you and your skin tingles.  You have become more sensitive to physical sensation.");
            character.stats.sens += 5;
            changes++;
        }
        // Libido Increase:
        if (character.stats.lib < 70 && character.body.vaginas.length > 0 && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\nYou feel your blood quicken and rise, and a desire to... hunt builds within you.");
            character.stats.lib += 2;
            if (character.stats.lib < 30) character.stats.lib += 2;
            changes++;
        }
        // Body Mass Loss:
        if (character.body.thickness > 40 && randInt(3) === 0 && changes < changeLimit) {
            CView.text("\n\nYou feel an odd tightening sensation in your midriff, as if you were becoming narrower and lither.  You frown downwards, and then turn your arms around, examining them closely.  Is it just you or have you lost weight?");
            displayModThickness(character, 40, 3);
            changes++;
        }

        // Thigh Loss: (towards �girly�)
        if (character.body.hips.rating >= 10 && randInt(4) === 0 && changes < changeLimit) {
            CView.text("\n\nYou touch your thighs speculatively.  It's not just your imagination; you've lost a bit of weight around your waist.");
            character.body.hips.rating--;
            if (character.body.hips.rating > 15) character.body.hips.rating -= 2 + randInt(3);
            changes++;
        }
        // Thigh Gain: (towards �girly�)
        if (character.body.hips.rating < 6 && randInt(4) === 0 && changes < changeLimit) {
            CView.text("\n\nYou touch your thighs speculatively.  You think you may have gained a little weight around your waist.");
            character.body.hips.rating++;
            changes++;
        }
        if (character.body.chest.length > 0) {
            // Breast Loss: (towards A cup)
            if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating > 1 && randInt(4) === 0 && changes < changeLimit) {
                CView.text("\n\nYou gasp as you feel a compressing sensation in your chest and around your [fullChest].  The feeling quickly fades however, leaving you feeling like you have lost a considerable amount of weight from your upper body.");
                for (const breastRow of character.body.chest) {
                    if (breastRow.rating > 70) breastRow.rating -= randInt(3) + 15;
                    else if (breastRow.rating > 50) breastRow.rating -= randInt(3) + 10;
                    else if (breastRow.rating > 30) breastRow.rating -= randInt(3) + 7;
                    else if (breastRow.rating > 15) breastRow.rating -= randInt(3) + 4;
                    else breastRow.rating -= 2 + randInt(2);
                    if (breastRow.rating < 1) breastRow.rating = 1;
                }
                changes++;
            }
            // Breast Gain: (towards A cup)
            if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating < 1 || character.body.chest.firstRow.rating < 1 && randInt(4) === 0 && changes < changeLimit) {
                CView.text("\n\nYou feel a vague swelling sensation in your [fullChest], and you frown downwards.  You seem to have gained a little weight on your chest.  Not enough to stand out, but- you cup yourself carefully- certainly giving you the faintest suggestion of boobs.");
                for (const breastRow of character.body.chest)
                    if (breastRow.rating < 1)
                        breastRow.rating = 1;
                changes++;
            }
        }
        // Penis Reduction towards 3.5 Inches:
        if (character.body.cocks.length > 0 && character.body.cocks.sort(Cock.Longest).get(0)!.length >= 3.5 && character.body.cocks.length > 0 && randInt(2) === 0 && changes < changeLimit) {
            CView.text("\n\nYou flinch and gasp as your " + describeCocksLight(character) + " suddenly become");
            if (character.body.cocks.length === 1) CView.text("s");
            CView.text(" incredibly sensitive and retract into your body.  Anxiously you pull down your underclothes to examine your nether regions.  To your relief ");
            if (character.body.cocks.length === 1) CView.text("it is");
            else CView.text("they are");
            CView.text(" still present, and as you touch ");
            if (character.body.cocks.length === 1) CView.text("it");
            else CView.text("them");
            CView.text(", the sensitivity fades, however - a blush comes to your cheeks - ");
            if (character.body.cocks.length === 1) CView.text("it seems");
            else CView.text("they seem");
            CView.text(" to have become smaller.");
            for (const cock of character.body.cocks) {
                if (cock.length >= 3.5) {
                    // Shrink said cock
                    if (cock.length < 6 && cock.length >= 2.9) {
                        cock.length -= .5;
                        if (cock.thickness * 6 > cock.length) cock.thickness -= .2;
                        if (cock.thickness * 8 > cock.length) cock.thickness -= .2;
                        if (cock.thickness < .5) cock.thickness = .5;
                    }
                    cock.length -= 0.5;
                    growCock(character, cock, Math.round(cock.length * 0.33) * -1);
                }
            }
            changes++;
        }
        // Testicle Reduction:
        if (character.body.balls.count > 0 && character.body.cocks.length > 0 && (character.body.balls.size > 1 || !character.effects.has(EffectType.Uniball)) && randInt(4) === 0 && changes < changeLimit) {
            CView.text("\n\nYou feel a delicate tightening sensation around your [balls].  The sensation upon this most sensitive part of your anatomy isn't painful, but the feeling of your balls getting smaller is intense enough that you stifle anything more than a sharp intake of breath only with difficulty.");
            character.body.balls.size--;
            if (character.body.balls.size > 8) character.body.balls.size--;
            if (character.body.balls.size > 10) character.body.balls.size--;
            if (character.body.balls.size > 12) character.body.balls.size--;
            if (character.body.balls.size > 15) character.body.balls.size--;
            if (character.body.balls.size > 20) character.body.balls.size--;
            // Testicle Reduction final:
            if (character.body.balls.size < 1 && !character.effects.has(EffectType.Uniball)) {
                CView.text("  You whimper as once again, your balls tighten and shrink.  Your eyes widen when you feel the gentle weight of your testicles pushing against the top of your [hips], and a few hesitant swings of your rear confirm what you can feel - you've tightened your balls up so much they no longer hang beneath your " + describeCocksLight(character) + ", but press perkily upwards.  Heat ringing your ears, you explore your new sack with a careful hand.  You are deeply grateful you apparently haven't reversed puberty, but you discover that though you still have " + numToCardinalText(character.body.balls.count) + ", your balls now look and feel like one: one cute, tight little sissy parcel, its warm, insistent pressure upwards upon the joining of your thighs a never-ending reminder of it.");
                // [Note: Balls description should no longer say �swings heavily beneath�.  For simplicity's sake sex scenes should continue to assume two balls]
                character.body.balls.size = 1;
                character.effects.create(EffectType.Uniball);
            }
            else if (character.body.balls.size < 1) character.body.balls.size = 1;
            changes++;
        }
        // Anal Wetness Increase:
        if (character.body.butt.wetness < 5 && randInt(4) === 0 && changes < changeLimit) {
            if (character.body.butt.wetness < 4) CView.text("\n\nYour eyes widen in shock as you feel oily moisture bead out of your [asshole].  Your asshole has become wetter and more pliable.");
            // Anal Wetness Increase Final (always loose):
            else CView.text("\n\nYou moan as clear, odorless oil dribbles out of your [asshole], this time in enough quantity to stain your [armor].  Your back passage feels incredibly sensitive, wet and accommodating.  Your ass is ready to be plowed by anything, and always will be.");
            character.body.butt.wetness++;
            // displayStretchButt(30,false,false,false);
            if (character.body.butt.looseness < 3) character.body.butt.looseness++;
            changes++;
            character.stats.sens += 2;
        }
        // Fertility Decrease:
        if (character.body.vaginas.length > 0 && randInt(4) === 0 && changes < changeLimit) {
            CView.text("\n\nThe vague numbness in your skin sinks slowly downwards, and you put a hand on your lower stomach as the sensation centers itself there.  ");
            character.stats.sens += -2;
            // High fertility:
            if (character.body.fertility >= 30) CView.text("It feels like your overcharged reproductive organs have simmered down a bit.");
            // Average fertility:
            else if (character.body.fertility >= 5) CView.text("You feel like you have dried up a bit inside; you are left feeling oddly tranquil.");
            // [Low/No fertility:
            else {
                CView.text("Although the numbness makes you feel serene, the trap oil has no effect upon your ");
                if (character.body.fertility > 0) CView.text("mostly ");
                CView.text("sterile system.");
                // [Low/No fertility + Trap/Corruption  >70:
                if (character.stats.cor > 70) CView.text("  For some reason the fact that you cannot  as nature intended makes you feel helpless and submissive.  Perhaps the only way to be a useful creature now is to find a dominant, fertile being willing to plow you full of eggs? You shake the alien, yet oddly alluring thought away.");
            }
            character.body.fertility -= 1 + randInt(3);
            if (character.body.fertility < 4) character.body.fertility = 4;
            changes++;
        }
        // Male Effects
        if (character.gender === Gender.MALE) {
            // Femininity Increase Final (max femininity allowed increased by +10):
            if (randInt(4) === 0 && changes < changeLimit) {
                if (character.body.femininity < 70 && character.body.femininity >= 60) {
                    CView.text("\n\nYou laugh as you feel your features once again soften, before stopping abruptly.  Your laugh sounded more like a girly giggle than anything else.  Feeling slightly more sober, you touch the soft flesh of your face prospectively.  The trap oil has changed you profoundly, making your innate maleness... difficult to discern, to say the least.  You suspect you could make yourself look even more like a girl now if you wanted to.");
                    if (!character.effects.has(EffectType.Androgyny)) {
                        character.effects.create(EffectType.Androgyny);
                        CView.text("\n\n(<b>Perk Gained: Androgyny</b>)");
                    }
                    character.body.femininity += 10;
                    if (character.body.femininity > 70) character.body.femininity = 70;
                    changes++;
                }
                // Femininity Increase:
                else {
                    CView.text("\n\nYour face softens as your features become more feminine.");
                    character.body.femininity += 10;
                    changes++;
                }
            }
            // Muscle tone reduction:
            if (character.body.tone > 20 && randInt(4) === 0 && changes < changeLimit) {
                CView.text("\n\nYou sink a finger into your arm inquiringly.  You seem to have lost some of your muscle definition, leaving you looking softer.");
                character.body.tone -= 10;
                changes++;
            }
        }
        // Female Effects
        else if (character.gender === Gender.FEMALE) {
            // Masculinity Increase:
            if (character.body.femininity > 30 && randInt(4) === 0 && changes < changeLimit) {
                character.body.femininity -= 10;
                if (character.body.femininity < 30) {
                    character.body.femininity = 30;
                    // Masculinity Increase Final (max masculinity allowed increased by +10):
                    CView.text("\n\nYou laugh as you feel your features once again soften, before stopping abruptly.  Your laugh sounded more like a boyish crow than anything else.  Feeling slightly more sober, you touch the defined lines of your face prospectively.  The trap oil has changed you profoundly, making your innate femaleness... difficult to discern, to say the least.  You suspect you could make yourself look even more like a boy now if you wanted to.");
                    if (!character.effects.has(EffectType.Androgyny)) {
                        character.effects.create(EffectType.Androgyny);
                        CView.text("\n\n(<b>Perk Gained: Androgyny</b>)");
                    }
                }
                else {
                    CView.text("\n\nYour face becomes more set and defined as your features turn more masculine.");
                }
                changes++;
            }
            // Muscle tone gain:
            if (character.body.tone < 80 && randInt(4) === 0 && changes < changeLimit) {
                CView.text("\n\nYou flex your arm in interest.  Although you have become thinner, your muscles seem to have become more defined.");
                character.body.tone += 10;
                changes++;
            }
        }
        // Nipples Turn Black:
        if (!character.effects.has(EffectType.BlackNipples) && randInt(6) === 0 && changes < changeLimit) {
            CView.text("\n\nA tickling sensation plucks at your nipples and you cringe, trying not to giggle.  Looking down you are in time to see the last spot of flesh tone disappear from your [nipples].  They have turned an onyx black!");
            character.effects.create(EffectType.BlackNipples);
            changes++;
        }
        // Remove odd eyes
        if (character.body.eyes.type === EyeType.FOUR_SPIDER_EYES && randInt(2) === 0 && changes < changeLimit) {
            CView.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + describeFeet(character) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
            if (character.body.eyes.type === EyeType.FOUR_SPIDER_EYES) CView.text("  Your multiple, arachnid eyes are gone!</b>");
            CView.text("  <b>You have normal, humanoid eyes again.</b>");
            character.body.eyes.type = EyeType.HUMAN;
            changes++;
        }
        // PC Trap Effects
        if (character.body.eyes.type !== EyeType.BLACK_EYES_SAND_TRAP && randInt(4) === 0 && changes < changeLimit) {
            character.body.eyes.type = EyeType.BLACK_EYES_SAND_TRAP;
            // Eyes Turn Black:
            CView.text("\n\nYou blink, and then blink again.  It feels like something is irritating your eyes.  Panic sets in as black suddenly blooms in the corner of your left eye and then your right, as if drops of ink were falling into them.  You calm yourself down with the thought that rubbing at your eyes will certainly make whatever is happening to them worse; through force of will you hold your hands behind your back and wait for the strange affliction to run its course.  The strange inky substance pools over your entire vision before slowly fading, thankfully taking the irritation with it.  As soon as it goes you stride quickly over to the stream and stare at your reflection.  <b>Your pupils, your irises, your entire eye has turned a liquid black</b>, leaving you looking vaguely like the many half insect creatures which inhabit these lands.  You find you are merely grateful the change apparently hasn't affected your vision.");
            changes++;
        }
        // Vagina Turns Black:
        if (character.body.vaginas.length > 0 && character.body.vaginas.get(0)!.type !== VaginaType.BLACK_SAND_TRAP && randInt(4) === 0 && changes < changeLimit) {
            CView.text("\n\nYour [vagina] feels... odd.  You undo your clothes and gingerly inspect your nether regions.  The tender pink color of your sex has disappeared, replaced with smooth, marble blackness starting at your lips and working inwards.");
            // (Wet:
            if (character.body.vaginas.get(0)!.wetness >= 3) CView.text("  Your natural lubrication makes it gleam invitingly.");
            // (Corruption <50:
            if (character.stats.cor < 50) CView.text("  After a few cautious touches you decide it doesn't feel any different- it does certainly look odd, though.");
            else CView.text("  After a few cautious touches you decide it doesn't feel any different - the sheer bizarreness of it is a big turn on though, and you feel it beginning to shine with anticipation at the thought of using it.");
            CView.text("  <b>Your vagina is now ebony in color.</b>");
            character.stats.sens += 2;
            character.stats.lust += 10;
            character.body.vaginas.get(0)!.type = VaginaType.BLACK_SAND_TRAP;
            changes++;
        }
        // Dragonfly Wings:
        if (character.body.wings.type !== WingType.GIANT_DRAGONFLY && randInt(4) === 0 && changes < changeLimit) {
            CView.text("\n\nYou scream and fall to your knees as incredible pain snags at your shoulders, as if needle like hooks were being sunk into your flesh just below your shoulder blades.  After about five seconds of white hot, keening agony it is with almost sexual relief that something splits out of your upper back.  You clench the dirt as you slide what feel like giant leaves of paper into the open air.  Eventually the sensation passes and you groggily get to your feet.  You can barely believe what you can see by craning your neck behind you - <b>you've grown a set of four giant dragonfly wings</b>, thinner, longer and more pointed than the ones you've seen upon the forest bee girls, but no less diaphanous and beautiful.  You cautiously flex the new muscle groups in your shoulder blades and gasp as your new wings whirr and lift you several inches off the ground.  What fun this is going to be!");
            // Wings Fall Out: You feel a sharp pinching sensation in your shoulders and you cringe slightly.  Your former dragonfly wings make soft, papery sounds as they fall into the dirt behind you.
            changes++;
            character.body.wings.type = WingType.GIANT_DRAGONFLY;
        }
        if (changes === 0) {
            CView.text("\n\nWell... that didn't amount to much.");
            character.body.wings.desc = "giant dragonfly";
        }
    }
}
