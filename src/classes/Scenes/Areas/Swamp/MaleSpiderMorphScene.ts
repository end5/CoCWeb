import { BaseContent } from "../../../BaseContent";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";
import { LustyMaidensArmor } from "../../../Items/Armors/LustyMaidensArmor";
import { PregnancyStore } from "../../../PregnancyStore";
import { MaleSpiderMorph } from "./MaleSpiderMorph";

/**
 * Created by aimozg on 03.01.14.
 */

export class MaleSpiderMorphScene extends BaseContent {
    // Greeting
    public greetMaleSpiderMorph(): void {
        this.outx("", true);
        this.spriteSelect(74);
        this.outx(
            "A spider-morph drops out of a tree in front of you, hanging by a single thread of sparkling webbing.  His purple eyes gaze deeply into your own while he looks you up and down.  ",
            false
        );
        // DANGER MODE:
        if (MaleSpiderMorphScene.rand(2) == 0) {
            this.outx(
                "A moment later, he flips down onto his feet and advances, touching his half-hard, foreskin-shrouded cock.  Judging from the glint in his eyes, he plans to force himself upon you!",
                false
            );
            // - auto fight
            this.startCombat(new MaleSpiderMorph());
        }
        // NICE GUY MODE:
        else {
            this.outx(
                'He breaks into a smile and says, "<i>Hi there!  I haven\'t seen anyone else with a shred of sanity in FOREVER.  Would you mind just, talking with me?</i>"',
                false
            );
            // [Fight] [Talk] [Leave]
            this.simpleChoices(
                "Fight",
                this.fightSpiderBoy,
                "Talk",
                this.talkToSpiderBoy,
                "",
                undefined,
                "",
                undefined,
                "Leave",
                this.camp.returnToCampUseOneHour
            );
        }
    }

    private fightSpiderBoy(): void {
        this.startCombat(new MaleSpiderMorph());
        this.spriteSelect(74);
        this.playerMenu();
    }

    // Talk
    private talkToSpiderBoy(): void {
        this.outx("", true);
        this.spriteSelect(74);
        this.outx(
            "The male spider-morph grins even wider, displaying the partially retracted tips of his two fangs.  You smile back nervously while he rotates about and drops lightly onto his feet, gleefully approaching you in spite of his nudity.  Sensing your discomfort, he stops a few yards away and pulls some food from a pouch on his hip, offering you some dried meats and fruits.  You take one of the more harmless looking ones and sit down with him.  He starts talking first, telling of how his people were a young race of transformed off-worlders.  The demons put a quick end to that, and recruited a large amount of the more aggressive driders and arachnes from his tribe.  He quickly explains that arachne are like him, but with chitinous exoskeletons covering their whole body, except for the face.  Driders on the other hand, have the body of a human from the hips up but a giant spider body below.\n\n",
            false
        );
        this.outx(
            "You talk of your own people, and the good times you had in Ingnam growing up, but you keep coming back to the sadness of losing so many young adults to becoming champions.  Eventually you go over your own selection, training, and eventual journey.  The spider-morph listens with rapt attention the whole way through.\n\n",
            false
        );
        this.outx(
            '"<i>Wow,</i>" comments the arachnid male, "<i>that\'s quite the story.  Thank you so much for talking to me today.  Here, take this.  If you ever want to have your own venom or webbing, eat as much of it as you can.  Who knows, maybe it\'ll help you take down the demons somehow?</i>"\n\n',
            false
        );
        this.outx(
            "He stands and gives you a bundle of pink fibers with a nervous bow.  You look down at the gossamer strands in your hands, and when you glance back up, he's gone.  ",
            false
        );
        this.inventory.takeItem(this.consumables.S_GOSSR, this.camp.returnToCampUseOneHour);
    }

    // *Victory Pretext:rr
    public defeatSpiderBoy(): void {
        this.outx("", true);
        this.spriteSelect(74);
        let mount;
        let buttfuck;
        let frot;
        if (this.player.hasVagina()) mount = this.victoryCowgirlRidingOnSpiderBoi;
        if (this.player.hasCock()) {
            if (this.player.cockThatFits(this.monster.analCapacity()) != -1)
                buttfuck = this.victoryButtFuck;
            if (this.player.biggestCockArea() > this.monster.analCapacity())
                frot = this.victoryFrotTheSpoidah;
        }
        let bikiniTits;
        if (
            this.player.hasVagina() &&
            this.player.biggestTitSize() >= 4 &&
            this.player.armorName == "lusty maiden's armor"
        )
            bikiniTits = this.createCallBackFunction2(
                (this.player.armor as LustyMaidensArmor).lustyMaidenPaizuri,
                this.player,
                this.monster
            );
        this.outx("The male spider-morph collapses onto his hands and knees, ");
        if (this.monster.lust > 99)
            this.outx(
                "masturbating with furious abandon, working his ebon dick with such vigor that the spider's pre-cum-slicked dick-skin noisily slides itself back and forth over his fattened glans; it becomes apparent just how much foreskin he truly has at this point, as even with his frenzied rubbing his glans remains shrouded in the thick excess skin while his fist slaps lewdly against his groin.  Dribbles of pre-cum leak from between his fingers to spill on the ground.",
                false
            );
        else
            this.outx(
                "wobbling back and forth as he tries to stay up and fight.  There's no way he can oppose you, as beaten as he is now.",
                false
            );
        if (this.player.gender > 0 && this.player.lust >= 33) {
            this.outx("\n\nWhat do you do?", false);
            // [CHOICES]
            this.simpleChoices(
                "Mount",
                mount,
                "FuckHisButt",
                buttfuck,
                "Frot",
                frot,
                "B.Titfuck",
                bikiniTits,
                "Leave",
                this.cleanupAfterCombat
            );
        } else this.cleanupAfterCombat();
    }

    // Loss selector
    public loseToMaleSpiderMorph(): void {
        const choices: any[] = [];
        if (this.player.hasCock()) choices[choices.length] = 0;
        if (this.player.hasVagina()) choices[choices.length] = 1;
        if (this.player.gender == 0) {
            this.spriteSelect(74);
            this.outx(
                `The raven-haired spider-guy tears off your ${this.player.armorName}, and disgusted by what he finds, he kicks you in the head, knocking you out.`,
                true
            );
            this.player.HP = 1;
            this.cleanupAfterCombat();
            return;
        }
        const select: number = choices[MaleSpiderMorphScene.rand(choices.length)];
        if (select == 0) this.spiderBoyLossMaleButtfuck();
        else this.loseToSpiderBoyVagFucked();
    }

    // *Victory Buttfucko
    private victoryButtFuck(): void {
        const x: number = this.player.cockThatFits(this.monster.analCapacity());
        this.outx("", true);
        this.spriteSelect(74);
        // *Summary:  Reaming some anus.
        this.outx(
            "You approach and turn the spider-boy around, pushing the spider's bulbous abdomen aside to give yourself a better view of the his tight, heart-shaped ass.  ",
            false
        );
        if (this.monster.lust > 99)
            this.outx(
                "He's too distracted by his foreskin fondling to pay much attention to your anal-focused attentions.",
                false
            );
        else
            this.outx(
                "He's too busy trying to stay upright to fight off your anal-focused attentions.",
                false
            );
        this.outx(
            `  With a wide smile on your face, you grab a handful of his pale butt-cheek and squeeze your fingers into the soft flesh.  It spreads his dainty derriere just wide enough for you to see the puckered star of his rectum.  ${this.SMultiCockDesc()} `
        );
        if (this.player.lust < 70) this.outx("hardens to full size");
        else this.outx("bobs happily");
        this.outx(
            ` against your ${this.player.armorName}, eager to take the dark hole.\n\n`,
            false
        );

        this.outx(
            "The arachnid finally realizes what you intend to do, and he whimpers plaintively, \"<i>P-please... don't put it there.  ",
            false
        );
        if (MaleSpiderMorphScene.rand(3) == 0) this.outx("I-I've never had anything in there...");
        else this.outx("I-I don't want anything in there...");
        this.outx('</i>"\n\n', false);

        this.outx(
            "You grab his balls and caress them in one hand while you take off your equipment with the other.  The hapless victim starts to relax from the attentions, and pre-cum begins to leak from inside his foreskin ",
            false
        );
        if (this.monster.lust <= 99) this.outx("after he starts touching himself.");
        else this.outx("while he fondles and caresses the sensitive flesh.");
        this.outx(
            `  Meanwhile, you grab ${this.oMultiCockDesc()} and line it up with the spider-boy's twitching rectum, rubbing the ${this.player.cockHead(
                x
            )} over the tight little hole while you wait for it to slowly loosen.  A fresh dollop of pre-cream bubbles out of his cum-frothing foreskin in response, letting you know that in spite of his protests, your reluctant lover's body loves the anal stimulation.\n\n`,
            false
        );

        this.outx(
            `After a little more gentle pressure and a few more gentle caresses of his testicles, the defeated male finally relaxes enough for you to put the first inch inside him.  His tunnel is so hot that it feels like your ${this.cockDescript(
                x
            )} is going to melt inside his sweltering embrace, and much worse, his sphincter clamps down hard enough to trap your ${this.player.cockHead(
                x
            )} inside his toasty tail-hole.  Holding tightly to his ass and balls, you yank your clenching, anal slut down hard, forcing him to stretch while the rest of your ${this.cockDescript(
                x
            )} burrows deep inside him`
        );
        if (this.player.cockTotal() > 1) {
            this.outx(", your other penis");
            if (this.player.cockTotal() == 2) this.outx(" resting atop the small of his back");
            else this.outx("es splaying out over his butt");
        }
        this.outx(".\n\n", false);

        this.outx(
            'The spider-morph cries out, "<i>Oww... it\'s stretching me so much!  B-b-but why does it feel good?</i>"\n\n',
            false
        );
        this.outx(
            "Chuckling at his admission of enjoyment, you let go of the spider's twitching ball-sack and take advantage of your free hand to slap his pale white ass.  It leaves a red, hand-shaped mark on his perfect little hiney, a temporary reminder of your authority.  His abdomen rubs against your belly as you start to fuck him, the heavy organ swaying with the gentle sawing motions of two bodies locked in anal coitus.  You gradually increase the tempo and quickly reach a point where your hips are slapping against his butt with loud, echoing smacks.\n\n",
            false
        );
        this.outx(
            "The arachnid male squirms under you, whimpering, \"<i>W-Why is it feeling so good?  It's-ooohh-making my dick so hot.  It feels like it's gonna explode!</i>\"\n\n",
            false
        );
        this.outx(
            "You whisper back that it feels good because he's a spider-slut, and you give him another hard slap to emphasize your point.  He whimpers and dribbles white cream into the dirt, his balls churning against you"
        );
        if (this.player.balls > 0) this.outx("r own");
        this.outx(
            " during the brief instant you've got him hilted.  Inspired by his submissive, orgasm-induced dribbling, you reach down to catch some of his cream in your hand.  He isn't squirting enough to fully fill your hand, so you lean back and hilt him again, roughly milking his spooge into your palm.  You take the handful of cum and hold it to his mouth.  He licks up his wasted seed like a good little bitch, shuddering in between swallows while you continue to dominate his asshole.\n\n",
            false
        );
        this.outx(
            "Once he's had most of it, you wipe the rest off in his raven-black hair, marking him as your spooge-slurping semen-slut.  He looks back with tearful eyes, but his beet-red cheeks and pursed, white-glazed lips tell a different story.  The spider-boy keeps mewling and moaning, strangling off his own sounds of pleasure as if he could deny the steady flow of seed that drips from his droopy, foreskin-shrouded shaft.\n\n",
            false
        );

        this.outx(
            `You go wild on him, fucking his ass hard.  His limp dick swings back and forth, slapping down at his balls while it continues to spew white globs into the ground.  Watching the little slut cream out his load in response to your anal 'massage' sends a sexual thrill through your body, and when his tight little ass-ring clamps down on your ${this.cockDescript(
                x
            )}, you're pushed to ejaculation as well.  Your spunk glazes his intestines with cum, coating them in the thick white goo of your liquid love.`
        );
        if (this.player.cockTotal() == 2)
            this.outx(
                "  The leftover dick spurts out its half of your load over his ass, making it look more pearly-white than ever before.",
                false
            );
        else if (this.player.cockTotal() > 2)
            this.outx(
                "  The leftover dicks spurt out their portion of your load across his ass-cheeks, making them look more pearl-white than ever before.",
                false
            );
        if (this.player.cumQ() >= 500) {
            this.outx("  His belly is ");
            if (this.player.cumQ() >= 1500) this.outx("heavy and ");
            if (this.player.cumQ() < 1000) this.outx("slightly ");
            this.outx("distended by the time you finish.");
        }
        this.outx("\n\n", false);

        this.outx(
            "Pushing the spider-boy off you, you smile and watch the slut's gaped asshole slowly close, ",
            false
        );
        if (this.player.cumQ() < 50) this.outx("trickles");
        else if (this.player.cumQ() < 1000) this.outx("streams");
        else this.outx("rivers");
        this.outx(
            " of semen sliding out of the abused opening.  He rolls onto his side and pants, still leaking his thick goo from the limp, weak little cock between his legs.  You bend down and wipe your dick off on his face, letting him lick at it like a trained puppy.  Once cleaned, you get dressed and wander back to camp, leaving the spider to recover from the ordeal.",
            false
        );
        this.player.orgasm();
        this.cleanupAfterCombat();
    }

    // *Victory Frotting? (too biggo)
    private victoryFrotTheSpoidah(): void {
        this.outx("", true);
        this.spriteSelect(74);
        this.outx("You push the ");
        if (this.monster.lust > 99) this.outx("masturbating");
        else this.outx("injured");
        this.outx(
            ` spider-morph over onto his back and laugh at his relatively tiny dick.  It's no wonder he jumped you wanting sex - the girls probably took one look at the unimpressive member and took off running.  You take off your ${
                this.player.armorName
            } and let ${this.sMultiCockDesc()} flop free.  `
        );
        if (this.player.cockTotal() == 1) this.outx("Dropping it squarely ");
        else this.outx("Dropping the largest ");
        this.outx(
            "atop his miniature cock, you virtually bury it in a superior male's heavy penile flesh.  ",
            false
        );
        if (this.monster.lust > 99)
            this.outx(
                "He pants in surprise and pleasure, clearly enjoying the weighty shaft rubbing against his drooping dick-skin",
                false
            );
        else
            this.outx(
                "He gasps in surprise and slowly growing pleasure, clearly enjoying the weighty shaft rubbing against his drooping dick-skin",
                false
            );
        this.outx(
            `.  You sway your ${this.hipDescript()} to drag your ${this.cockDescript(
                0
            )} all over his body, and the defeated boy's pale white skin slowly colors pink with a full-body blush.\n\n`,
            false
        );

        this.outx(
            "Trapped below your sizable weight, the turgid spider-shaft slowly leaks pre-cum from its tiny cum-slit.  The added moisture proves to be just the lubrication you needed, and you begin to sway your body back and forth, letting your incredible endowment rub over the spider's balls, flat chest, and fat little pecker.  Each time you let it get a little closer to his face, but as his pre-cum lubricates more and more of your mighty member, you stop measuring your strokes so modestly.\n\n",
            false
        );

        this.outx(
            `You hump forward and smash your ${this.player.cockHead()} against the spider-boy's face, popping a bubble of pre-cum on his lips before you pull back far enough to reveal the soaked foreskin that hides his cock-tip.  He's probably filled the entirety of that little flesh-balloon with his leavings, and as you slide back up you feel more of his pre-cum bursting out, confirming your suspicions.  A pair of hard, chitinous arms encircle your ${this.cockDescript(
                0
            )} in a tight hug, squeezing into a slippery pleasure-vice for your penis.\n\n`,
            false
        );

        this.outx(
            "The enthusiastic spider-bitch looks up at you with a twinkle in his purple eyes, and the next time you push forward, he bites your cock-tip.  You scream in surprise and pain, throwing your head back and howling from the abuse of your most tender part.  Before you can finish your scream, the pain vanishes, replaced by a heat and... need - a warm command that rolls through your body to your brain and balls, ordering them to cum over and over until every drop of spooge has been spilled.  With newfound desire coursing through you, you glare down at the bitch.  He rapidly retracts his fangs and gives you a long, apologetic lick that somehow feels almost as good as fucking a tight pussy.\n\n",
            false
        );

        this.outx(
            "Driven by the unquenchable desire coursing through your cock, you unleash a series of rapid-fire thrusts through the sneaky spider's arms, smashing his cock so hard into his belly that you wonder if he can even keep it up under all that pressure.  His whole body is little more than your personal onahole, and you fuck it like a disposable object, not caring in the slightest if you damage him.  Every time you smear another bubble of pre-cum on the spider's face he gives a gentle kiss, lick, or even a cruel, cum-slurping suckle.\n\n",
            false
        );

        this.outx(
            `Without the slightest shred of decency, you keep humping the spider-boy's body like an animal.  No matter how hard you grind your ${this.cockDescript(
                0
            )} against him or how forcefully you slide your girthy penis through the ring he's made from his arms, it isn't enough for you.  You let go of him completely and wrap both your hands around your own swollen mass, completely giving in to the artificial desire.  Immediately, your hands start to pump up and down, providing a cacophony of pleasure that makes your eyes cross and your tongue hang out.\n\n`,
            false
        );

        this.outx(
            "A spasm of pleasure sparks in your loins, slowly building into a knot of warm, liquid heat, and you know it's finally time to claim the release you so desperately crave.  You push as far forward as you can, grinding the slippery tip of your cock's cum-slit into the spider-boy's face while your urethra bulges wide at the base, distended by the building cum-bubble slowly pushing through your huge prick.  Climax arrives, and as your body expels the gush of creamy goo directly into the spider-boy's face, another two deliveries of spunk push their way up, squeezing the boy-slut's tiny dick even tighter between the two of you.  He loses it and squirts, adding his own lubricants to the mess while you paint his face a whorish, glistening white.  You shake from stem to stern, body clenching while you pump out the last of your spooge onto his well-bukkake'd face.",
            false
        );
        if (this.player.cumQ() >= 750) {
            this.outx(
                "  Only after you finish do you realize how much you came - there's a ",
                false
            );
            if (this.player.cumQ() >= 2000) this.outx("huge ");
            this.outx("puddle under his head!");
        }
        this.outx("\n\n", false);

        this.outx(
            "You stretch and sigh with contentment, looking over your cum-covered conquest while he tries to clean himself off.  Absolutely perfect.",
            false
        );
        this.player.orgasm();
        this.cleanupAfterCombat();
    }

    // *Victory Cowgirl
    private victoryCowgirlRidingOnSpiderBoi(): void {
        // *Summary: Throw him on his back and mount up on that throbbing, ebon piece of uncut spidercock as he looks to you meekly, panting, needing something to tend to his foreskinned dick so badly...
        this.outx("", true);
        this.spriteSelect(74);
        this.outx(
            `You hastily remove your ${this.player.armorName} to bare yourself in preparation for the coming pleasure.  Throughout it all, the spider-boy doesn't react.  He's too busy `
        );
        if (this.monster.HP < 1) this.outx("trying to stay upright");
        else this.outx("trying to drown himself in pleasure");
        this.outx(
            ` to summon a response.  How irritating.  You push him over with your ${this.player.foot()} to roll him onto his back, giving you the access you need to get at his `
        );
        if (this.monster.HP < 1) this.outx("dripping dick");
        else this.outx("gradually stiffening dick");
        this.outx(
            ".  Gently exploring his body, you run your hands over his chest, circle his tight, stiff nipples, and slide all ten fingers down his smooth skin toward his loins.  The effect of your touches soon becomes apparent, ",
            false
        );
        if (this.monster.HP < 1) this.outx("resulting in a stiff, pre-cum-dripping spider-cock.");
        else
            this.outx(
                "resulting in the spider-cock's hood of excess, sensitive flesh overfilling with sticky, musky pre-cum.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            "The arachnid male looks up at you with wide, open eyes and a lusty expression, begging with his eyes for you to take his slippery black cock inside you.  Lucky for him, that's exactly what you have planned.  You mount the male spider's lithe body with a smooth, sensuous motion, ",
            false
        );
        if (this.player.balls > 0) this.outx("lifting your balls and ");
        this.outx(
            `placing your ${this.vaginaDescript()} atop the floppy, folded skin that obscures his cockhead.  The drippy arachnid-cock easily slides inside you while your labia push the skin back, exposing his pre-cum-drooling cum-slit to your hot, inner walls.  You can feel him swelling further from the stimulation, his twitching cock trying to stuff you as effectively as possible.`
        );
        // (virgin check)
        this.player.cuntChange(this.monster.cockArea(0), true, true, false);
        this.outx("\n\n", false);

        this.outx(
            `You pinch the arachnid male's nipple as you begin to bounce up and down upon him.  Each lewd slap of your ${this.buttDescript()} on his groin is accompanied by a rippling spasm of pleasure in your ${this.vaginaDescript()}, inadvertantly milking the thick-skinned member with the muscular spasms.  He moans and begins trying to lift his hips to meet you.  You deny him, slamming your body down harder with every downward motion to crush him back into the moist swamp-earth.\n\n`,
            false
        );

        this.outx(
            '"<i>Ungh... uh... c-c-coming!</i>" whines the spider-morph, trembling underneath you.  His cock squirts and dumps its inhuman seed into your innermost depths.  Squishing wetly, you can feel pump after pump of the thick spooge being forced past your cervix to burrow in your womb.  The male finishes his climax and sags down into the loam, panting.  Reaching down, you give him an irritated slap.  Your victim\'s dick actually starts wilting inside you while you ride him, spooge slopping past your lips with each thrust.  The nerve of some men!\n\n',
            false
        );

        this.outx(
            "An idea comes to you while you try to get off on the limp-dicked man, and you decide to act on it immediately.  Grabbing his head in both hands, you push the spider-boy's head against his shoulder and command, \"<i>Bite.</i>\"  He fights against you, but he's too weak from the recent combat, not to mention orgasm, to put up much of a fight.  All too soon he's letting his fangs slip into his shoulder and wincing slightly from the pain.  His cock immediately stiffens inside your cum-packed cunt, fueled by the aphrodisiacs he's pouring into himself.  You firmly hold the pathetic male in place and rub his cheek while softly murmuring, \"<i>Good boy,</i>\" over and over again into his ear, all while milking his venom into his body.\n\n",
            false
        );

        this.outx(
            `Without even waiting for him to finish, you go back to your cock-riding, the sensation of his trembling, drug-fueled erection tickling at all the right places.  Inside your ${this.vaginaDescript(
                0
            )}, that wonderful, foreskin-clad member bastes in its own spooge, soaking up the sloppy spunk while you use it as your personal, living dildo.  You `
        );
        if (!this.player.hasFuckableNipples()) this.outx("pinch");
        else this.outx("finger");
        this.outx(
            ` your ${this.nippleDescript(
                0
            )}s, struggling to get off while the spider-boy cums again, this time without any warning at all.\n\n`,
            false
        );

        this.outx(
            `You finally let him loose, and he immediately slumps back, totally unconscious while his rock-hard cock continues to unload into you.  Riding the wet, drugged up fuck-stick, you get closer and closer to your own climax, the spider's dick continuing to pump every ounce of his seed from his body in a toxin-fueled, continuous orgasm.  Even after his jism is pooling on his waist, his cock keeps spasming wildly in your ${this.vaginaDescript()}.  The warm blooms of his seed fade away, but he keeps coming, rocking weakly underneath you.\n\n`,
            false
        );

        this.outx(
            "At last, your orgasm arrives in a thunderous wave, crashing over you to make you shake and tremble, violently squeezing on his slippery foreskin and forcing out thick dollops of man-cream from between your lips.  Shuddering wildly, you bump and grind unthinkingly, until your strength completely vanishes and you slump down atop the unconscious spider.\n\n",
            false
        );

        this.outx(
            `It takes some time to regain your strength with all the orgasmic aftershocks rolling through your ${this.vaginaDescript()}.  Once you've mastered yourself, you climb off your conquest and get dressed, `
        );
        if (this.player.cor < 33)
            this.outx("taking the time to clean the dripping spunk from your body.");
        else if (this.player.cor < 66)
            this.outx("casually wiping away the worst of the dripping spunk.");
        else
            this.outx(
                `paying no heed to the thick flows of spunk that drip down your ${this.player.legs()}.`
            );
        this.player.slimeFeed();
        // Pregnancy Goes Here
        this.player.knockUp(PregnancyStore.PREGNANCY_SPIDER, PregnancyStore.INCUBATION_SPIDER, 151);
        this.player.orgasm();
        this.cleanupAfterCombat();
    }

    // *Loss: Get butt-fucked
    // *Summary: Male only scene for maximum prostate pounding - possible random choice between two positions, plain doggy style or the 'lucky' one, where he will curl you over yourself and fuck you so you can watch his foreskinned spiderboy cock slam your asshole -while- you drip all over your face.
    private spiderBoyLossMaleButtfuck(): void {
        this.outx("", true);
        this.spriteSelect(74);
        this.outx("You collapse");
        if (this.player.HP < 1) {
            this.outx(
                " in a semi-conscious heap, unable to stand, barely able to flop onto your back and look up ",
                false
            );
            if (this.player.cor < 33) this.outx("in fear");
            else if (this.player.cor < 66) this.outx("with worry");
            else this.outx("in anticipation");
            this.outx(" at the male spider.");
        } else
            this.outx(
                ", utterly overwhelmed by your desire for sex until the only thing that matters is letting the sexy spider have his way with you.",
                false
            );
        this.outx(
            "  He looks down at you with a cocky grin plastered across his face and a twinkle of light in his violet eyes, almost like a kid at Christmas.  His hand wraps around his girthy shaft and starts to pump at the drooping foreskin, masturbating himself to a full, erect stiffness.  The floppy flesh is so copious that even at his full six inches, you can't see the glans peek out - just a tiny dribble of pre-cum.\n\n",
            false
        );

        this.outx(
            `Finished with his foreplay, the spider-boy grabs your ${this.hipDescript()} and raises your `
        );
        if (this.player.isTaur()) this.outx("hindquarters slightly");
        else this.outx(`${this.player.legs()} up and out of the way`);
        this.outx(
            `, displaying surprising strength as he holds your ${this.assholeDescript()} at waist height.  You look up at the gloating arachnid `
        );
        if (this.player.HP < 1) this.outx('and silently mouth, "<i>Please, no.</i>"', false);
        else
            this.outx(
                "and give a little nod, too intoxicated by arousal to decline any form of sex.",
                false
            );
        this.outx(
            `  His only response is to squeeze tight on your ${this.buttDescript()} and press forward until his pre-cum-soaked foreskin is glazing your rim in preparation for the coming penetration.  `
        );
        if (this.player.lust > 99)
            this.outx(
                `${this.SMultiCockDesc()} bounces atop your belly, reacting strongly to the tingling sensation radiating from your ${this.assholeDescript()}.`
            );
        else {
            this.outx(`${this.SMultiCockDesc()} `);
            if (this.player.lust < 50) this.outx("slowly fills with blood");
            else this.outx("fills completely with blood");
            this.outx(
                `, reacting strongly to the tingles radiating up from your ${this.assholeDescript()}.`
            );
        }
        this.outx("\n\n", false);

        this.outx("The penetration is ");
        if (this.player.analCapacity() < 40)
            this.outx(
                "mercifully easy due to the mess of pre-cum and the forgiving foreskin that clings to his shaft.  It rolls further and further back as he pushes in until his glans is exposed to your clenching guts.",
                false
            );
        else
            this.outx(
                `quite easy due to how well-stretched your ${this.assholeDescript()} is.  Watching his fat little cock disappear into your roomy backside actually brings a smile to your lips.`
            );
        this.player.buttChange(this.monster.cockArea(0), true, true, false);
        this.outx(
            `  A firm, unforgiving hand grabs hold of ${this.oMultiCockDesc()} and starts pumping it with short, fast strokes.  The slippery carapace gliding along your length feels absolutely marvelous, and in no time you're utterly relaxed against his invading member, dripping rivulets of sticky pre-cream onto your belly.  A round, hard digits circles your frenulum with a soft, repetitive motion, and you nearly blow your load on the spot.\n\n`,
            false
        );

        this.outx(
            `Cruelly, the purple-eyed man stops touching you and puts his hands back on your hips and ${this.buttDescript()}.  He admires you, his conquest, for a few moments while you leak onto yourself.  Time seems to drag on for an age, until you look up at him, still impaled on his thick tool, and ply him with questioning eyes.  The spider-morph gives you a reassuring squeeze and pulls back, his foreskin stretching inside of you while the hard cylindrical shape of his member vanishes from your rectum.  Your ${this.assDescript()} clenches repeatedly, feeling cold and empty after holding on to his hot, black-skinned cock for so long.\n\n`,
            false
        );

        this.outx(
            "You aren't left empty for long.  The hard-shelled aggressor propels his heavy cock forward.  It disappears into your hungry anus with a 'schliiooorp' and returns the feeling of blessed fullness to you.  This time, you can feel his crown bumping against something inside you, and the reaction is intense and immediate.  Pleasure hits you upside the head with a hammer-blow of sexual gratification.  It's almost like there's a button inside you, right behind your cock and labelled 'push here for bliss', and the spider is poking it hard.  ",
            false
        );
        if (this.player.cockTotal() == 1) this.outx("A ribbon ");
        else this.outx("Ribbons ");
        this.outx(" of thick cum drizzle");
        if (this.player.cockTotal() == 1) this.outx("s");
        this.outx(
            ` out from ${this.sMultiCockDesc()} over your belly, weakly leaking out in a slow, steady flow.\n\n`,
            false
        );

        this.outx(
            '"<i>My my, what a little butt-slut you are,</i>" he comments.  "<i>Did you just get off from feeling my cock sliding into your hungry little asshole?</i>"\n\n',
            false
        );

        if (this.player.cor < 33)
            this.outx(
                "You blush shamefully and nod, utterly humiliated by the quick little orgasm.",
                false
            );
        else if (this.player.cor < 66)
            this.outx(
                "You blush shamefully and nod, humiliated and aroused by how quickly you just came.",
                false
            );
        else
            this.outx(
                "You blush with arousal and humiliation, shaking your head up and down and hoping he'll hit that spot again.",
                false
            );
        this.outx(
            `  Pumping his hips slowly, the spider-morph watches a few more weak trickles of seed squirt out.  He gives your ass a hearty smack and muses out loud, "<i>That's a good ${this.player.mf(
                "boy",
                "girl"
            )}.  You make a`
        );
        if (this.player.analCapacity() >= 40) this.outx("n okay");
        else this.outx(" great");
        this.outx(" cock-sleeve.  ");
        if (this.player.analCapacity() >= 40)
            this.outx(
                "I just wish you were less loose, but I guess you must let anyone with a nice fat cock plug your ass every chance you get, huh?  ",
                false
            );
        this.outx(
            "Just lie there and take it bitch, I'm not going to cum until you've painted your belly white.</i>\"\n\n",
            false
        );

        this.outx(
            `You sigh when he hits a particularly good spot and squirt a fresh strand of goop onto yourself.  There's nothing to do but lie there while your ${this.assholeDescript()} is used and hope that he keeps hitting your prostate.  It feels sooo good when he does.  The hard butt-fucking hits it more and more as time passes, the spider slowly adjusting his strokes to make you leak as much as possible.  Eventually you stop spurting, ${this.sMultiCockDesc()} continually spewing seed while you're raped by the arachnid boy's girthy penis.  Dollops of your submission roll off your belly to pool in the dirt.\n\n`,
            false
        );

        this.outx(
            "Crossing your eyes, you grab the ground with both hands and struggle to hold on.  There's... too much... too much pleasure for you to think.  Muscles randomly seize and twitch throughout your body, and though the ",
            false
        );
        if (this.player.cumQ() >= 500) this.outx("semen continues to leak out at the same pace");
        else this.outx("semen trails off as you empty");
        this.outx(
            `, you're absolutely drowning in a sea of bliss.  The waves of sexual indulgence threaten to drag you under their frothing crests.  Slowly, your self-control washes away, eroded by the all-encompasing pleasure ${this.sMultiCockDesc()} is experiencing.\n\n`,
            false
        );

        this.outx(
            'You begin to mumble, "<i>fuckmefuckmefuckmefuckme,</i>" like some kind of religious mantra.\n\n',
            false
        );

        this.outx(
            'The spider smiles and groans, "<i>Oh fuck yeah, you little bitch, I\'m gonna... gonna... hnnnggg.</i>"  Hot blooms of spunk splatter through your rectum, soaking your guts and washing over your prostate.  The explosion of perfect enjoyment locks every muscle in your body at once, forcing your sphincter to squeeze down on the still-pulsing penis.  ',
            false
        );
        if (this.player.cumQ() < 500)
            this.outx(
                `${this.SMultiCockDesc()} bounces on your belly, leaking one last drop from its tip, utterly draining every drop from your ${this.ballsDescriptLight()}.`
            );
        else
            this.outx(
                `${this.SMultiCockDesc()} explodes again, dumping every remaining drop from your ${this.ballsDescriptLight()} directly onto your ${this.chestDesc()} and belly.`
            );
        this.outx(
            "  Your eyelids flutter and droop, your tongue lolls out of your mouth, and you start drooling all over yourself.  Zombie-like, your body keeps shaking, locked in orgasm, even after the spider dumps you in the dirt and walks away.",
            false
        );
        this.player.slimeFeed();
        this.player.orgasm();
        this.cleanupAfterCombat();
    }

    // *Loss: Impregnation?
    // *Summary: Vagoozles only!
    private loseToSpiderBoyVagFucked(): void {
        this.outx("", true);
        this.spriteSelect(74);
        this.outx("As your ");
        if (this.player.HP < 1) this.outx("wounds overwhelm");
        else this.outx("lust overwhelms");
        this.outx(
            ` you, your ${this.player.legs()} grow shaky, then give out entirely.  You flop down on your back`
        );
        if (this.player.lust > 99)
            this.outx(
                ", caressing yourself with reckless abandon while praying the sexy spider-boy will come violate you with his thick-skinned prick.",
                false
            );
        else
            this.outx(
                ", clearly too injured and fatigued by the battle to make more than a few token movements.",
                false
            );
        this.outx(
            `  He pounces you, lightning fast, quick enough that you don't even react until he's on top of you.  Chitin-clad legs brush your ${this.hipDescript()}, the hard knees sinking deep into the swampy loam.  Grinning happily, the spider-boy leans over you and sucks a ${this.nippleDescript(
                0
            )} `
        );
        if (this.player.hasFuckableNipples())
            this.outx(
                "into his mouth before plunging his tongue into the tit-pussy's passage",
                false
            );
        else this.outx("into his mouth before circling his tongue around it");
        this.outx(".\n\n", false);

        this.outx(
            `You arch your back from the sensation, lifting your ${this.chestDesc()} to provide him better access.  `
        );
        if (this.player.HP < 1)
            this.outx(
                "Even though you're injured, his oral attentions make the nub get so hard and sensitive that you quickly forget your own pain.",
                false
            );
        else
            this.outx(
                "Even though you tried to fight him, his oral attentions make your nub so hard and your horny body so eager that you quickly forget.",
                false
            );
        this.outx(
            `  The monstrous man handles your body with ease, playing your ${this.nippleDescript(
                0
            )} like a finely tuned instrument, and you pant out little`
        );
        if (this.player.cor < 33) this.outx(", half-stifled");
        this.outx(
            " moans of pleasure to his ministrations.  Helpless to do anything but grow more and more aroused, you give up entirely on resisting and let yourself be putty in his hands.\n\n",
            false
        );

        this.outx(
            `The spider-morph's eyes seem to grow purple in the dim swamp light as he lifts himself away from your ${this.chestDesc()}, looking you in the eye.  "<i>I knew you wanted this,</i>" he says, rubbing his floppy foreskin against your entrance hard enough for you to feel the stiffness of the member hidden within the loose sheath.  His solid-black shaft feels wonderful against your `
        );
        if (this.player.wetness() >= 4) this.outx("soaked");
        else if (this.player.wetness() >= 2) this.outx("wet");
        else this.outx("moist");
        this.outx(
            ` mons, teasing against your vulva until your ${this.clitDescript()} emerges from its hood, `
        );
        if (this.player.clitLength >= 3) this.outx("frotting against him");
        else this.outx("grinding along the underside of his dick");
        this.outx(
            `.  You start rocking your ${this.hipDescript()} encouragingly, trying to snare his marvelous maleness, but every time you catch his tip within your lips, he changes the angle and swivels away, teasing you.\n\n`,
            false
        );

        this.outx(
            `The arachnid man kisses at your neck, slobbering a messy, unpracticed kiss against your throat.  For one so talented with his hands, he sure is a mess when it comes to kissing - maybe spider-people don't kiss each other much?  The spider-morph pops off, leaving a small hickey behind before revealing his true intent.  Fangs slide into the tender, bruised spot above your collarbone with a small burst of pain, making you gasp.  You hold absolutely still, not wanting to make it any worse.  Numbing, boiling warmth explodes inside you, making you gasp out in shock. A split-second later, the pain vanishes under a growing tide of arousal.  Your ${this.vaginaDescript()} `
        );
        if (this.player.wetness() >= 5) this.outx("pours out a river of lube");
        else if (this.player.wetness() >= 3) this.outx("drools out a steady stream of lube");
        else if (this.player.wetness() >= 2) this.outx("dribbles lube");
        else this.outx("gets soaked");
        this.outx(`, your ${this.nippleDescript(0)}s `);
        if (this.player.hasFuckableNipples()) this.outx("drip their own slippery juices");
        else if (this.player.biggestLactation() >= 1) this.outx("bead drops of milk");
        else this.outx("fully engorge");
        this.outx(", ");
        if (this.player.hasCock())
            this.outx(
                `${this.sMultiCockDesc()} becomes so full and hard it feels like it could burst, `
            );
        this.outx(`and your ${this.clitDescript()} `);
        if (this.player.clitLength >= 4)
            this.outx("bounces up and down on your belly with each beat of your heart");
        else this.outx("seems to pulsate with every beat of your heart");
        this.outx(".\n\n", false);

        this.outx(
            "You gurgle happily and wrap your arms around the man-spider's back, clutching your new mate tightly, lest he leave before he takes the time to fuck your sloppy, wanton little hole.  Meanwhile, his aphrodisiac toxins continue to slide unimpeded through his fangs into your body, taking your need higher and higher.  You claw at his back and hump against him, pressing your slobbering slit tightly against the underside of his manhood, rubbing back and forth over the slight bulge his urethra makes on the bottom of his shaft.  Tiny pulses ripple through the cock, letting you know just how much he's loving having your sloppy-wet lips rubbing on him.\n\n",
            false
        );

        this.outx(
            "The horny boy keeps his lips and fangs locked onto you, but he seems nearly as aroused as you at this point.  He raises his hips, removing the source of your pussy's pleasure and drawing a mewl of disappointment from your lips.  His cock doesn't disappoint you, and it returns a mere moment later, burying the entire shaft into your nethers with a smooth, confident stroke.  ",
            false
        );
        this.player.cuntChange(this.monster.cockArea(0), true, false, true);
        this.outx(
            `The rippling, fat cock rubs your ${this.vaginaDescript()} perfectly, the foreskin dragging along your walls as soon as you start reciprocating and humping your wonderful mate's dripping dick.\n\n`,
            false
        );

        this.outx(
            `You fuck him like an animal, a wanton beast lost in the throes of artificial heat.  The spider-boy hangs onto you for dear life, clutching tightly to your torso while your frenzied motions bounce him into the air on top of you, sliding his cock in and out of the quivering vice that is your ${this.vaginaDescript()}.  Loud, wet slaps echo through the sex-musk-filled air while you put all of your body's strength and endurance into milking the spider-boy's cock.  Your thoughts vanished some time ago, replaced with hunger for orgasm and fantasies of getting an injection of hot spider-spunk.\n\n`,
            false
        );

        this.outx(
            `At long last, the twin needles withdraw from your neck, dripping out the last of the spider's venom while he throws his head back, closes his eyes, and mewls quietly.  You throw your hips into him desperately, eager to catch every drop of his seed with your womb.  His cum squirts out, and blossoms of slippery warmth squirt through your cunt.  Your ${this.vaginaDescript()} squeezes and begins to ripple, sending spasms of pleasure up your spine until you're screaming out loud, moaning and grunting in complete, utter bliss.  Absolute happiness washes through you, the pleasure that can only come from giving into your body's demands and letting this male fill you with his spunk.\n\n`,
            false
        );

        this.outx(
            "You sigh and close your eyes, slowly slumping down while your hips keep twitching.  You've been sated, and though your body keeps hungering for more, you slip into unconsciousness.",
            false
        );
        this.player.slimeFeed();
        this.player.orgasm();
        this.player.knockUp(PregnancyStore.PREGNANCY_SPIDER, PregnancyStore.INCUBATION_SPIDER);
        this.cleanupAfterCombat();
    }

    public spiderPregVagBirth(): void {
        this.outx("\n", false);
        this.spriteSelect(74);
        if (this.player.vaginas.length == 0) {
            this.outx(
                "You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ",
                false
            );
            this.player.createVagina();
            this.player.genderCheck();
        }
        this.outx(
            `You shudder violently, your stomach growling fiercely at you. It feels as if something is moving around in your womb, and you bend over on all fours, raising your ass into the air as if it is the most natural thing in the world. A slimy green fluid starts leaking out of your ${this.vaginaDescript(
                0
            )}, making a small puddle on the ground. The sensation is extremely pleasurable as you feel it running down your thighs. Groaning, you start to push out a small, smooth green ball, and the action makes your ${this.vaginaDescript(
                0
            )} so much wetter.  You push out another, and another, each ball rubbing against your inner walls before dropping into the slimy pool of goo. After the sixth, you orgasm, `
        );
        // [if male/herm]
        if (this.player.gender != 2)
            this.outx(
                "spraying your cum all over the ground underneath you, each egg squeezing out and prolonging the intense feeling.\n\n",
                false
            );
        // [if female/genderless]
        else
            this.outx(
                "spraying your juices all over the ground and mixing in with the green slime, soaking your legs, each egg you squeeze out only prolonging the intense feeling.\n\n",
                false
            );

        this.outx(
            "After what seems like hours, you have lost count of the eggs pushed out, and you collapse from sexual exhaustion.\n\n",
            false
        );
        kGAMECLASS.timeQ += 2;
        this.outx(
            "You awaken later on, a sticky feeling between your legs to go with your wet pussy",
            false
        );
        if (this.player.hasCock()) this.outx(" and raging hard on");
        this.outx(
            ". Looking around, you notice the slimy pool appears to have dried up, but the broken eggshells show that you weren't just dreaming. Tiny dots in the dirt form a trail leading to the swamp, and you can only guess where your offspring went.\n",
            false
        );
        this.player.orgasm();
    }
}
