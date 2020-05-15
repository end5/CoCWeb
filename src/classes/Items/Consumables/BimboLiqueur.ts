import { VAGINA_WETNESS_SLICK } from "../../../includes/appearanceDefs";
import { Utils } from "../../internals/Utils";
import { PerkLib } from "../../PerkLib";
import { Consumable } from "../Consumable";

/**
 * Created by aimozg on 18.01.14.
 */

export class BimboLiqueur extends Consumable {
    public constructor() {
        super(
            "BimboLq",
            "BimboLq",
            "a potent bottle of 'Bimbo Liqueur'",
            1000,
            "This small bottle of liqueur is labelled 'Bimbo Liqueur'.  There's a HUGE warning label about the effects being strong and usually permanent, so you should handle this with care."
        );
    }

    public canUse(): boolean {
        if (this.game.player.findPerk(PerkLib.FutaForm) < 0) return true;
        this.outx(
            "Ugh.  This stuff is so, like... last year.  Maybe you can find someone else to feed it to?\n\n"
        );
        return false;
    }

    public useItem(): boolean {
        if (this.game.player.findPerk(PerkLib.BroBody) >= 0) {
            this.outx(
                "You wince as the stuff hits your stomach, already feeling the insidious effects beginning to take hold.  A lengthy belch escapes your lips as your stomach gurgles, and you giggle abashedly to yourself."
            );
            if (this.game.player.tallness < 77) {
                this.outx(
                    " ...Did the ground just get farther away?  You glance down and realize, you're growing!  Like a sped-up flower sprout, you keep on getting taller until finally stopping around... six and a half feet, you assume.  Huh.  You didn't expect that to happen!"
                );
                this.game.player.tallness = 77;
            }
            if (this.game.player.biggestTitSize() < 7) {
                if (this.game.player.biggestTitSize() < 1)
                    this.outx(
                        "  Tingling, your chest begins to itch, then swell into a pair of rounded orbs.  "
                    );
                else this.outx("  You feel a tingling inside your breasts.  ");
                this.outx(
                    "They quiver ominously, and you can't help but squeeze your tits together to further appreciate the boobquake as another tremor runs through them.  Unexpectedly, the shaking pushes your hands further apart as your tits balloon against each other, growing rapidly against your now-sunken fingers.  The quakes continue until calming at around an E-cup."
                );
                this.game.player.breastRows[0].breastRating = 7;
            }
            // (If vagina = 2tight:
            if (!this.game.player.hasVagina()) {
                this.outx(
                    `  Before you can even take a breath, an extremely peculiar sensation emanates from your crotch.  You can't see through your ${
                        this.game.player.armorName
                    }, but you can certainly feel the vagina splitting ${
                        this.game.player.balls > 0 ? "from behind your testicles" : "your groin"
                    }.  Luckily, the cunt-forming doesn't yield any discomfort - on the contrary, you feel yourself falling farther into your chemically-dulled, libido-fueled rut.`
                );
                if (this.game.player.hipRating < 12 || this.game.player.buttRating < 12)
                    this.outx(
                        "  As if realizing the necessity of womanly proportions to attract the hard cocks your body now craves, your waist pinches slightly inward and your hips and butt swell.  You can't help but run a hand across your newly-feminized pelvis, admiring it."
                    );
                this.game.player.createVagina();
                this.game.player.clitLength = 0.25;
                if (this.game.player.hipRating < 12) this.game.player.hipRating = 12;
                if (this.game.player.buttRating < 12) this.game.player.buttRating = 12;
            }
            this.outx("\n\n");
            this.outx(
                "A wave of numbness rolls through your features, alerting you that another change is happening.  You reach up to your feel your jaw narrowing, becoming more... feminine?  Heavy, filling lips purse in disappointment as your face takes on a very feminine cast.  You're probably pretty hot now!\n\n"
            );
            if (this.game.player.femininity < 80) this.game.player.femininity = 80;

            this.outx(
                "Your surging, absurdly potent libido surges through your body, reminding you that you need to fuck.  Not just bitches, but guys too.  Hard cocks, wet pussies, hell, you don't care.  They can have both or a dozen of either.  You just want to get laid and bone something, hopefully at the same time!"
            );
            this.outx("\n\n<b>(Perks Lost: Bro Body");
            if (this.game.player.findPerk(PerkLib.BroBrains) >= 0) this.outx(", Bro Brains");
            this.outx(")\n");
            this.outx("(Perks Gained: Futa Form, Futa Faculties)\n");
            this.game.player.removePerk(PerkLib.BroBody);
            this.game.player.removePerk(PerkLib.BroBrains);
            this.game.player.createPerk(PerkLib.FutaFaculties, 0, 0, 0, 0);
            this.game.player.createPerk(PerkLib.FutaForm, 0, 0, 0, 0);
            if (this.game.player.inte > 35) {
                this.game.player.inte = 35;
                this.game.dynStats("int", -0.1);
            }
            if (this.game.player.lib < 50) {
                this.game.player.lib = 50;
                this.game.dynStats("lib", 0.1);
            }
        } else {
            this.outx(
                "You pop the cork from the flask and are immediately assaulted by a cloying, spiced scent that paints visions of a slutty slave-girl's slightly-spread folds.  Wow, this is some potent stuff!  Well, you knew what you were getting into when you found this bottle!  You open wide and guzzle it down, feeling the fire of alcohol burning a path to your belly.  The burning quickly fades to a pleasant warmth that makes you light-headed and giggly.\n\n"
            );
            if (this.game.player.hairColor != "platinum blonde") {
                this.outx(
                    `The first change that you notice is to your ${this.game.player.hairDescript()}.  It starts with a tingling in your scalp and intensifies `
                );
                if (this.game.player.hairLength < 36) {
                    this.outx("as you feel the weight of your hair growing heavier and longer.");
                    this.game.player.hairLength = 36;
                } else this.outx("as your hair grows thicker and heavier.");
                this.outx(
                    `  You grab a lock of the silken strands and watch open-mouthed while streaks so blonde they're almost white flow down the ${this.game.player.hairColor} hair.  It goes faster and faster until your hair has changed into perfectly bimbo-blonde, flowing locks.\n\n`
                );
                this.game.player.hairColor = "platinum blonde";
            }

            this.outx(
                "Moaning lewdly, you begin to sway your hips from side to side, putting on a show for anyone who might manage to see you.   You just feel so... sexy.  Too sexy to hide it.  Your body aches to show itself and feel the gaze of someone, anyone upon it.  Mmmm, it makes you so wet!  "
            );
            if (!this.game.player.hasVagina()) {
                this.game.player.createVagina();
                this.game.player.clitLength = 0.25;
                this.game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_SLICK;
                if (this.game.player.isTaur())
                    this.outx(
                        `Wait!? Wet? You wish you could touch yourself between the ${this.game.player.legs()}, but you can tell from the fluid running down your hind-legs just how soaked your new vagina is.`
                    );
                else
                    this.outx(
                        `Wait!?  Wet?  You touch yourself between the ${this.game.player.legs()} and groan when your fingers sink into a sloppy, wet cunt.`
                    );
            } else {
                if (this.game.player.isTaur()) {
                    this.outx(
                        "You wish you could sink your fingers into your sloppy, wet cunt, but as a centaur, you can't quite reach."
                    );
                    if (this.game.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_SLICK)
                        this.game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_SLICK;
                } else {
                    this.outx("You sink your fingers into your ");
                    if (this.game.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_SLICK) {
                        this.outx("now ");
                        this.game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS_SLICK;
                    }
                    this.outx("sloppy, wet cunt with a groan of satisfaction.");
                }
            }
            if (this.game.player.balls > 0) {
                this.outx(
                    "\n\nThere's a light pinch against your [sack] that makes you gasp in surprise, followed by an exquisite tightness that makes your [vagina] drool.  Looking down, <b>you see your balls slowly receding into your body, leaving nothing behind but your puffy mons.</b>"
                );
                this.game.player.balls = 0;
                this.game.player.ballSize = 3;
                this.game.player.cumMultiplier = 2;
            }
            if (this.game.player.hasCock()) {
                this.outx(
                    "\n\n[EachCock] seems to be responding to the liqueur in its own way.  Clenching and relaxing obscenely, your genitals begin to drizzle cum onto the ground in front of you, throwing you into paroxysms of bliss.  The flow of cum is steady but weak, and each droplet that leaves you lets [eachCock] go more flaccid.  Even once you're soft and little, it doesn't stop.  You cum your way down to nothing, a tiny droplet heralding your new, girlish groin.  <b>You no longer have "
                );
                if (this.game.player.cockTotal() == 1) this.outx("a penis");
                else this.outx("penises");
                this.outx("!</b>");
                while (this.game.player.hasCock()) {
                    this.game.player.removeCock(0, 1);
                }
            }
            this.outx("  Somehow, you feel like you could seduce anyone right now!\n\n");

            this.outx(
                "Another bubbly giggle bursts from your lips, which you then lick hungrily.  You, like, totally want some dick to suck!  Wow, that came out of left field.  You shake your head and try to clear the unexpected, like, words from your head but it's getting kind of hard.  Omigosh, you feel kind of like a dumb bimbo after, like, drinking that weird booze.  Oh, well, it doesn't matter anyhow – you can, like, still stop the demons and stuff.  You'll just have to show off your sexy bod until they're offering to serve you.\n\n"
            );

            this.outx(`You sigh and run one hand over your ${this.game.player.nippleDescript(0)}s`);
            if (this.game.player.breastRows[0].breastRating < 10) {
                this.game.player.breastRows[0].breastRating += 5 + Utils.rand(5);
                this.outx(
                    `, surprised at how large and rounded your expanding breasts have become while fresh tit-flesh continues to spill out around your needy fingers.  They feel so supple and soft, but when you let them go, they still sit fairly high and firm on your chest.  The newer, more generous, ${this.game.player.breastCup(
                        0
                    )} cleavage has you moaning with how sensitive it is, pinching a nipple with one hand `
                );
            } else {
                this.game.player.breastRows[0].breastRating += 5 + Utils.rand(5);
                this.outx(
                    `, admiring how sensitive they're getting.  The big breasts start getting bigger and bigger, soft chest-flesh practically oozing out between your fingers as the squishy mammaries sprout like weeds, expanding well beyond any hand's ability to contain them.  The supple, ${this.game.player.breastCup(
                        0
                    )} boobs still manage to sit high on your chest, almost gravity defying in their ability to generate cleavage.  You pinch a nipple with one hand `
                );
            }
            this.game.dynStats("sen", 20);
            this.outx(
                `while the other toys with the juicy entrance of your folds.  Mmmm, it, like, feels too good not to touch yourself, and after being worried about getting all dumb and stuff, you need to relax.  Thinking is hard, but sex is so easy and, like, natural!  You lean back and start grunting as you plunge four fingers inside yourself, plowing your ${this.game.player.vaginaDescript(
                    0
                )} like no tomorrow.  By now, your ${this.game.player.clitDescript()} is throbbing, and you give it an experimental `
            );
            if (this.game.player.clitLength >= 3) this.outx("jerk ");
            else this.outx("caress ");
            this.outx(
                `that makes your ${this.game.player.legs()} give out as you cum, splattering female fluids as you convulse nervelessly on the ground.\n\n`
            );

            this.outx(
                "Though the orgasm is intense, you recover a few moments later feeling refreshed, but still hot and horny.  Maybe you could find a partner to fuck?  After all, sex is, like, better with a partner or two.  Or that number after two.  You brush a lengthy, platinum blonde strand of hair out of your eyes and lick your lips - you're ready to have some fun!\n\n"
            );

            if (this.game.player.hipRating < 12 || this.game.player.buttRating < 12) {
                this.outx(
                    "As you start to walk off in search of a sexual partner, you feel your center of balance shifting."
                );
                if (this.game.player.hipRating < 12 && this.game.player.buttRating < 12) {
                    this.outx(
                        "  Your ass and hips inflate suddenly, forcing you to adopt a slow, swaying gait.  You find that rolling your hips back and forth comes naturally to you.  You make sure to squeeze your butt-muscles and make your curvy tush jiggle as you go."
                    );
                    this.game.player.buttRating = 12;
                    this.game.player.hipRating = 12;
                } else if (this.game.player.hipRating < 12) {
                    this.outx(
                        "  Your hips widen suddenly, forcing you to adopt a slow, swaying gait.  You find that rolling yours hips back and forth comes naturally to you, and your big, obscene ass seems to jiggle all on its own with every step you take."
                    );
                    this.game.player.hipRating = 12;
                } else {
                    this.outx(
                        "  Your [butt] swells dramatically, the puffy cheeks swelling with newfound weight that jiggles along with each step.  Clenching your glutes to make the posh cheeks jiggle a little more enticingly becomes second nature to you in a few seconds."
                    );
                    this.game.player.buttRating = 12;
                }
                this.outx("\n\n");
            }
            if (this.game.player.tone > 0) {
                this.outx(
                    "Like, weirdest of all, your muscles seem to be vanishing!  Before your eyes, all muscle tone vanishes, leaving your body soft and gently curvy.  You poke yourself and giggle!  Everyone's totally going to want to, like, rub up against you at every opportunity.  Your thighs are so soft you bet you could squeeze a pair of dicks to orgasm without even touching your moist cunny."
                );
                this.game.player.tone = 0;
                if (this.game.player.str >= 30) {
                    if (this.game.player.str >= 90) this.game.dynStats("str", -10);
                    if (this.game.player.str >= 70) this.game.dynStats("str", -10);
                    if (this.game.player.str >= 50) this.game.dynStats("str", -10);
                    this.game.dynStats("str", -5);
                    this.outx(
                        "  It does get a bit harder to carry yourself around with your diminished strength, but that's, like, what big strong hunks are for anyways!  You can just flirt until one of them volunteers to help out or something!  Besides, you don't need to be strong to jerk off cocks or finger slutty pussies!"
                    );
                }
                this.outx("\n\n");
            }
            if (this.game.player.findPerk(PerkLib.BimboBody) < 0) {
                this.outx("<b>(Bimbo Body - Perk Gained!)\n");
                this.game.player.createPerk(PerkLib.BimboBody, 0, 0, 0, 0);
            }
            if (this.game.player.findPerk(PerkLib.BimboBrains) < 0) {
                this.outx("(Bimbo Brains - Perk Gained!)\n"); // int to 20.  max int 50)
                this.game.player.createPerk(PerkLib.BimboBrains, 0, 0, 0, 0);
                if (this.game.player.inte > 21) this.game.player.inte = 21;
            }
            this.game.player.orgasm();
            this.game.dynStats("int", -1, "lib", 4, "sen", 25);
            // FULL ON BITCHFACE
            this.game.player.modFem(100, 100);
            // Body
            // Tease/Seduce Boost
            // *boosts min lust and lust resistance)
            // *Tit size
            // Brain
            // Max int - 50
        }
        this.game.player.genderCheck();
        return false;
    }
}
