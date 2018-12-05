import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { BreastRow } from 'Game/Character/Body/BreastRow';
import { Vagina, VaginaWetness } from 'Game/Character/Body/Vagina';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { ItemDesc } from '../ItemDesc';
import { describeHair } from 'Game/Descriptors/HairDescriptor';
import { describeLegs } from 'Game/Descriptors/LegDescriptor';
import { describeNipple, breastCup } from 'Game/Descriptors/BreastDescriptor';
import { describeVagina, describeClit } from 'Game/Descriptors/VaginaDescriptor';
import { CView } from 'Page/ContentView';
import { displayModFem } from 'Game/Modifiers/BodyModifier';

export class BimboLiqueur extends Consumable {
    public constructor() {
        super(ConsumableName.BimboLiqueur, new ItemDesc("BimboLq", "a potent bottle of 'Bimbo Liqueur'", "This small bottle of liqueur is labelled 'Bimbo Liqueur'.  There's a HUGE warning label about the effects being strong and usually permanent, so you should handle this with care."), 1000);
    }

    public canUse(character: Character) {
        if (!character.effects.has(EffectType.FutaForm))
            return true;
        CView.text("Ugh.  This stuff is so, like... last year.  Maybe you can find someone else to feed it to?\n\n");
        return false;
    }

    public use(character: Character) {
        if (character.effects.has(EffectType.BroBody)) {
            CView.text("You wince as the stuff hits your stomach, already feeling the insidious effects beginning to take hold.  A lengthy belch escapes your lips as your stomach gurgles, and you giggle abashedly to yourself.");
            if (character.body.tallness < 77) {
                CView.text(" ...Did the ground just get farther away?  You glance down and realize, you're growing!  Like a sped-up flower sprout, you keep on getting taller until finally stopping around... six and a half feet, you assume.  Huh.  You didn't expect that to happen!");
                character.body.tallness = 77;
            }
            const largestBreasts = character.body.chest.sort(BreastRow.Largest).get(0)!;
            if (largestBreasts.rating < 7) {
                if (largestBreasts.rating < 1)
                    CView.text("  Tingling, your chest begins to itch, then swell into a pair of rounded orbs.  ");
                else
                    CView.text("  You feel a tingling inside your breasts.  ");
                CView.text("They quiver ominously, and you can't help but squeeze your tits together to further appreciate the boobquake as another tremor runs through them.  Unexpectedly, the shaking pushes your hands further apart as your tits balloon against each other, growing rapidly against your now-sunken fingers.  The quakes continue until calming at around an E-cup.");
                largestBreasts.rating = 7;
            }
            // If vagina = 2tight:
            if (character.body.vaginas.length <= 0) {
                CView.text("  Before you can even take a breath, an extremely peculiar sensation emanates from your crotch.  You can't see through your " + character.inventory.armor.displayName + ", but you can certainly feel the vagina splitting " + (character.body.balls.count > 0 ? "from behind your testicles" : "your groin") + ".  Luckily, the cunt-forming doesn't yield any discomfort - on the contrary, you feel yourself falling farther into your chemically-dulled, libido-fueled rut.");
                if (character.body.hips.rating < 12 || character.body.butt.rating < 12) CView.text("  As if realizing the necessity of womanly proportions to attract the hard cocks your body now craves, your waist pinches slightly inward and your hips and butt swell.  You can't help but run a hand across your newly-feminized pelvis, admiring it.");
                character.body.vaginas.add(new Vagina());
                character.body.clit.length = 0.25;
                if (character.body.hips.rating < 12)
                    character.body.hips.rating = 12;
                if (character.body.butt.rating < 12)
                    character.body.butt.rating = 12;
            }
            CView.text("\n\n");
            CView.text("A wave of numbness rolls through your features, alerting you that another change is happening.  You reach up to your feel your jaw narrowing, becoming more... feminine?  Heavy, filling lips purse in disappointment as your face takes on a very feminine cast.  You're probably pretty hot now!\n\n");
            if (character.body.femininity < 80) character.body.femininity = 80;

            CView.text("Your surging, absurdly potent libido surges through your body, reminding you that you need to fuck.  Not just bitches, but guys too.  Hard cocks, wet pussies, hell, you don't care.  They can have both or a dozen of either.  You just want to get laid and bone something, hopefully at the same time!");
            CView.text("\n\n<b>(Perks Lost: Bro Body");
            if (character.effects.has(EffectType.BroBrains))
                CView.text(", Bro Brains");
            CView.text(")\n");
            CView.text("(Perks Gained: Futa Form, Futa Faculties)\n");
            character.effects.removeByName(EffectType.BroBody);
            character.effects.removeByName(EffectType.BroBrains);
            character.effects.create(EffectType.FutaFaculties);
            character.effects.create(EffectType.FutaForm);
            if (character.stats.int > 35) {
                character.stats.int = 35;
                character.stats.int -= 0.1;
            }
            if (character.stats.lib < 50) {
                character.stats.lib = 50;
                character.stats.lib += .1;
            }
        }
        else {
            CView.text("You pop the cork from the flask and are immediately assaulted by a cloying, spiced scent that paints visions of a slutty slave-girl's slightly-spread folds.  Wow, this is some potent stuff!  Well, you knew what you were getting into when you found this bottle!  You open wide and guzzle it down, feeling the fire of alcohol burning a path to your belly.  The burning quickly fades to a pleasant warmth that makes you light-headed and giggly.\n\n");
            if (character.body.hair.color !== "platinum blonde") {
                CView.text("The first change that you notice is to your " + describeHair(character) + ".  It starts with a tingling in your scalp and intensifies ");
                if (character.body.hair.length < 36) {
                    CView.text("as you feel the weight of your hair growing heavier and longer.");
                    character.body.hair.length = 36;
                }
                else CView.text("as your hair grows thicker and heavier.");
                CView.text("  You grab a lock of the silken strands and watch open-mouthed while streaks so blonde they're almost white flow down the " + character.body.hair.color + " hair.  It goes faster and faster until your hair has changed into perfectly bimbo-blonde, flowing locks.\n\n");
                character.body.hair.color = "platinum blonde";
            }

            CView.text("Moaning lewdly, you begin to sway your hips from side to side, putting on a show for anyone who might manage to see you.   You just feel so... sexy.  Too sexy to hide it.  Your body aches to show itself and feel the gaze of someone, anyone upon it.  Mmmm, it makes you so wet!  ");
            if (character.body.vaginas.length <= 0) {
                character.body.vaginas.add(new Vagina());
                character.body.clit.length = 0.25;
                character.body.vaginas.get(0)!.wetness = VaginaWetness.SLICK;
                if (character.body.legs.isTaur()) CView.text("Wait!? Wet? You wish you could touch yourself between the " + describeLegs(character) + ", but you can tell from the fluid running down your hind-legs just how soaked your new vagina is.");
                else CView.text("Wait!?  Wet?  You touch yourself between the " + describeLegs(character) + " and groan when your fingers sink into a sloppy, wet cunt.");
            }
            else {
                if (character.body.legs.isTaur()) {
                    CView.text("You wish you could sink your fingers into your sloppy, wet cunt, but as a centaur, you can't quite reach.");
                    if (character.body.vaginas.get(0)!.wetness < VaginaWetness.SLICK)
                        character.body.vaginas.get(0)!.wetness = VaginaWetness.SLICK;
                }
                else {
                    CView.text("You sink your fingers into your ");
                    if (character.body.vaginas.get(0)!.wetness < VaginaWetness.SLICK) {
                        CView.text("now ");
                        character.body.vaginas.get(0)!.wetness = VaginaWetness.SLICK;
                    }
                    CView.text("sloppy, wet cunt with a groan of satisfaction.");
                }
            }
            if (character.body.balls.count > 0) {
                CView.text("\n\nThere's a light pinch against your [sack] that makes you gasp in surprise, followed by an exquisite tightness that makes your [vagina] drool.  Looking down, <b>you see your balls slowly receding into your body, leaving nothing behind but your puffy mons.</b>");
                character.body.balls.count = 0;
                character.body.balls.size = 3;
                character.body.cumMultiplier = 2;
            }
            if (character.body.cocks.length > 0) {
                CView.text("\n\n[EachCock] seems to be responding to the liqueur in its own way.  Clenching and relaxing obscenely, your genitals begin to drizzle cum onto the ground in front of you, throwing you into paroxysms of bliss.  The flow of cum is steady but weak, and each droplet that leaves you lets [eachCock] go more flaccid.  Even once you're soft and little, it doesn't stop.  You cum your way down to nothing, a tiny droplet heralding your new, girlish groin.  <b>You no longer have ");
                if (character.body.cocks.length === 1) CView.text("a penis");
                else CView.text("penises");
                CView.text("!</b>");
                while (character.body.cocks.length > 0) {
                    character.body.cocks.remove(0);
                }
            }
            CView.text("  Somehow, you feel like you could seduce anyone right now!\n\n");

            CView.text("Another bubbly giggle bursts from your lips, which you then lick hungrily.  You, like, totally want some dick to suck!  Wow, that came out of left field.  You shake your head and try to clear the unexpected, like, words from your head but it's getting kind of hard.  Omigosh, you feel kind of like a dumb bimbo after, like, drinking that weird booze.  Oh, well, it doesn't matter anyhow – you can, like, still stop the demons and stuff.  You'll just have to show off your sexy bod until they're offering to serve you.\n\n");
            const selBrestRow = character.body.chest.firstRow;
            CView.text("You sigh and run one hand over your " + describeNipple(character, selBrestRow) + "s");
            if (selBrestRow.rating < 10) {
                selBrestRow.rating += 5 + randInt(5);
                CView.text(", surprised at how large and rounded your expanding breasts have become while fresh tit-flesh continues to spill out around your needy fingers.  They feel so supple and soft, but when you let them go, they still sit fairly high and firm on your chest.  The newer, more generous, " + breastCup(selBrestRow.rating) + " cleavage has you moaning with how sensitive it is, pinching a nipple with one hand ");
            }
            else {
                selBrestRow.rating += 5 + randInt(5);
                CView.text(", admiring how sensitive they're getting.  The big breasts start getting bigger and bigger, soft chest-flesh practically oozing out between your fingers as the squishy mammaries sprout like weeds, expanding well beyond any hand's ability to contain them.  The supple, " + breastCup(selBrestRow.rating) + " boobs still manage to sit high on your chest, almost gravity defying in their ability to generate cleavage.  You pinch a nipple with one hand ");
            }
            character.stats.sens += 20;
            CView.text("while the other toys with the juicy entrance of your folds.  Mmmm, it, like, feels too good not to touch yourself, and after being worried about getting all dumb and stuff, you need to relax.  Thinking is hard, but sex is so easy and, like, natural!  You lean back and start grunting as you plunge four fingers inside yourself, plowing your " + describeVagina(character, character.body.vaginas.get(0)!) + " like no tomorrow.  By now, your " + describeClit(character) + " is throbbing, and you give it an experimental ");
            if (character.body.clit.length >= 3) CView.text("jerk ");
            else CView.text("caress ");
            CView.text("that makes your " + describeLegs(character) + " give out as you cum, splattering female fluids as you convulse nervelessly on the ground.\n\n");

            CView.text("Though the orgasm is intense, you recover a few moments later feeling refreshed, but still hot and horny.  Maybe you could find a partner to fuck?  After all, sex is, like, better with a partner or two.  Or that number after two.  You brush a lengthy, platinum blonde strand of hair out of your eyes and lick your lips - you're ready to have some fun!\n\n");

            if (character.body.hips.rating < 12 || character.body.butt.rating < 12) {
                CView.text("As you start to walk off in search of a sexual partner, you feel your center of balance shifting.");
                if (character.body.hips.rating < 12 && character.body.butt.rating < 12) {
                    CView.text("  Your ass and hips inflate suddenly, forcing you to adopt a slow, swaying gait.  You find that rolling your hips back and forth comes naturally to you.  You make sure to squeeze your butt-muscles and make your curvy tush jiggle as you go.");
                    character.body.butt.rating = 12;
                    character.body.hips.rating = 12;
                }
                else if (character.body.hips.rating < 12) {
                    CView.text("  Your hips widen suddenly, forcing you to adopt a slow, swaying gait.  You find that rolling yours hips back and forth comes naturally to you, and your big, obscene ass seems to jiggle all on its own with every step you take.");
                    character.body.hips.rating = 12;
                }
                else {
                    CView.text("  Your [butt] swells dramatically, the puffy cheeks swelling with newfound weight that jiggles along with each step.  Clenching your glutes to make the posh cheeks jiggle a little more enticingly becomes second nature to you in a few seconds.");
                    character.body.butt.rating = 12;
                }
                CView.text("\n\n");
            }
            if (character.body.tone > 0) {
                CView.text("Like, weirdest of all, your muscles seem to be vanishing!  Before your eyes, all muscle tone vanishes, leaving your body soft and gently curvy.  You poke yourself and giggle!  Everyone's totally going to want to, like, rub up against you at every opportunity.  Your thighs are so soft you bet you could squeeze a pair of dicks to orgasm without even touching your moist cunny.");
                character.body.tone = 0;
                if (character.stats.str >= 30) {
                    if (character.stats.str >= 90) character.stats.str -= 10;
                    if (character.stats.str >= 70) character.stats.str -= 10;
                    if (character.stats.str >= 50) character.stats.str -= 10;
                    character.stats.str -= 5;
                    CView.text("  It does get a bit harder to carry yourself around with your diminished strength, but that's, like, what big strong hunks are for anyways!  You can just flirt until one of them volunteers to help out or something!  Besides, you don't need to be strong to jerk off cocks or finger slutty pussies!");
                }
                CView.text("\n\n");
            }
            if (!character.effects.has(EffectType.BimboBody)) {
                CView.text("<b>(Bimbo Body - Perk Gained!)\n");
                character.effects.create(EffectType.BimboBody);
            }
            if (!character.effects.has(EffectType.BimboBrains)) {
                CView.text("(Bimbo Brains - Perk Gained!)\n"); // int to 20.  max int 50
                character.effects.create(EffectType.BimboBrains);
                if (character.stats.int > 21)
                    character.stats.int = 21;
            }
            character.orgasm();
            character.stats.int -= 1;
            character.stats.lib -= 4;
            character.stats.sens -= 25;
            // FULL ON BITCHFACE
            displayModFem(character, 100, 100);
            // Body
            // Tease/Seduce Boost
            // *boosts min lust and lust resistance)
            // *Tit size
            // Brain
            // Max int - 50
        }
    }
}
