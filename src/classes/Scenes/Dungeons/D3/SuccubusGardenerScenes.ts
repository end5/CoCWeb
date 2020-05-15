import { BaseContent } from "../../../BaseContent";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { StatusAffects } from "../../../StatusAffects";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { SKIN_TYPE_FUR } from "../../../../includes/appearanceDefs";

/**
 * ...
 *
 * @author Gedan
 */
export class SuccubusGardenerScenes extends BaseContent {
    private GARDENER_LEFT = 1;
    // private GARDENER_FUCKED: number = 2;
    private GARDENER_KILLED = 3;

    public gardenerDefeated(): boolean {
        if (this.flags[kFLAGS.D3_GARDENER_DEFEATED] > 0) return true;
        return false;
    }

    public gardenerKilled(): boolean {
        if (this.flags[kFLAGS.D3_GARDENER_DEFEATED] == 3) return true;
        return false;
    }

    public gardenerFucked(): boolean {
        if (this.flags[kFLAGS.D3_GARDENER_DEFEATED] == 2) return true;
        return false;
    }

    public gardenerLeft(): boolean {
        if (this.flags[kFLAGS.D3_GARDENER_DEFEATED] == 1) return true;
        return false;
    }

    public fuckUpTheGardener(hpVictory: boolean): void {
        this.clearOutput();
        this.outx(
            "The succubus drops to her knees, grabbing a tentacle and thrusting it into wanton sex forcefully enough to make you wince. She doesn't seem to mind, in fact, her lips spread into a wordless 'o' of pleasure as she begins rocking back and forth atop, lost to her own lusts. She's in no state to stop you from moving on. Hell, she's probably going to be busy with the tentacles for a long, long time. You suppose you could try and put her mouth to use, but there are a LOT of tentacles awfully close. It might be best to move on or end her quickly."
        );

        this.menu();
        this.addButton(0, "End Her", this.endHer);
        this.addButton(1, "Leave", this.leaveHer);
        this.addButton(2, "Fuck Her", this.tentaFail);
    }

    private tentaFail(): void {
        this.clearOutput();
        // Start setting up to fuck the succubus -> surprise tentacle grape, idiot.
        this.outx(
            "There's no way you're going to pass up an opportunity to put a succubus's lips to use. Pillowy"
        );
        if (this.player.hasVagina()) this.outx(" cunt-kissers");
        else this.outx(" cock-suckers");
        this.outx(" like those are one in a million.");

        if (this.flags[kFLAGS.NUMBER_OF_TIMES_MET_SCYLLA] > 0)
            this.outx(
                " Perhaps Scylla's ruby mouth could give her a run for her money, but there's only one way to be sure."
            );
        else if (this.getGame().telAdre.dominika.fellatrixSucked())
            this.outx(
                " Perhaps Dominika's all-consuming mouth could give her a run for her money, but there's only one way to be sure."
            );
        this.outx(
            " You grab hold of the blubbering slut by her curled horns, admiring the way the tentacle-juice on her lips shines in the light, and pull her against your crotch, pressing her against"
        );
        if (this.player.hasCock()) this.outx(" [oneCock]");
        else if (this.player.hasVagina()) this.outx(" your [vagina]");
        else this.outx(" the sensitive skin of your groin");
        this.outx(
            ". She eagerly goes to work, moaning from the attentions of the tentacle down below, and licking with such fervor that you'd think this is what she wanted all along."
        );

        this.outx(
            "\n\nRocking your [hips] to the pace of her short, frenzied lips, you lose yourself in the moment. Here in the garden with a succubus to serve your every whim, it's easy to just stop and enjoy the little things in life. Lethice can sit on her throne for the few minutes it will take you to"
        );
        if (this.player.hasCock()) this.outx(" blow a wad down this slut's throat");
        else if (this.player.hasVagina()) this.outx(" cream yourself on this slut's face");
        else this.outx(" teach this bitch how to pleasure an asshole");
        this.outx(
            `. None-too-quiet slurps hang in the steamy air, accompanied by your own ${this.player.mf(
                "grunts",
                "coos"
            )} of enjoyment. You reach down to cup one of her breasts, ignorant of the shadows creeping nearer.`
        );

        this.outx(
            "\n\nA flash of green obscures your vision for a moment. Before you can react, it has looped around your neck as strongly as a bar of iron and is pulling back, dragging you to the ground while your muscles are still focused on limply thrusting forward. It presses you flat, and in spite of your struggles, a dozen similarly powerful tendrils emerge. They wrap your limbs up in pale green cocoons of squirming plant life. The only parts of you remaining exposed are your crotch and your face, but even the latter has narrow bands encircling it, holding you still."
        );

        this.outx(
            "\n\nThe lusty demoness, still fucking one of her pets, looks dumbly in your directly, her gaze somewhat vacant and her jaw slackened. You can see the tentacle in her sopping wet cunt pulsating, and rivulets of sappy moisture are running from her over-engorged looks. She doesn't seem to be in any state to take advantage of you, but then again, she doesn't need to. A large, orange tentacle is hovering above you."
        );
        if (!this.player.hasCock())
            this.outx(
                " Its outline is clearly phallic, but how could such a huge thing ever fit inside you, let alone anyone?"
            );
        else {
            this.outx(
                " Its tip oozes lubricants, but the gaping pussy at its tip is big enough to hold six minotaurs' monster-cocks."
            );
            if (this.player.biggestCockLength() < 36)
                this.outx(" How could you ever hope to fill it?");
            else this.outx(" How long were they preparing this for you?");
        }

        let createdVag = false;
        if (!this.player.hasCock() && !this.player.hasVagina()) {
            // Genderless
            this.outx(
                "\n\nInterestingly, the new arrival descends towards your featureless cross, dripping neon orange goo as it goes. Where the stuff lands on you, your flesh alights with tingles of raw, pure sensation, somewhere stuck between pain and pleasure and yet neither. Then, that column of pulsating, phallic meat is pressing down against you, ramming itself into you, and there is not you nor your flesh can do but yield to its touches. You gasp, opening... no, <i>blossoming</i>, revealing sensitive lips and folds."
            );

            this.outx("\n\n<b>This thing is turning you into woman!</b>");

            this.player.createVagina();
            createdVag = true;
        } else if (this.player.hasVagina() && !this.player.hasCock()) {
            // Cooches only
            this.outx(
                "\n\nThe new arrival descends towards your already well-lubricated pussy, dripping neon orange goo as it goes. Where the stuff lands on you, you alight with raw, deviously pleasurable sensation, particularly on your pussy lips. They burn with raw, unfiltered sensation, both pleasure and pain all in one. Then, that column of pulsating, phallic meat presses down against you, too fat for any normal pussy to take, and yet somehow, it's ramming itself into you. You spread to accept it... and then spread some more, blossoming."
            );
        }

        // Merge Genderless & Coochies
        if (!this.player.hasCock()) {
            // 100% gonna have a cooch by this point
            this.outx("\n\nYou can feel your");
            if (createdVag) this.outx(" new");
            this.outx(
                " entrance giving around the girthy monstrosity with each passing second. Wider and wider, your flesh opens up. It feels so big that you wonder if you're going to rip in half, but there is no discomfort, only the pleasure of accepting it's tumescent, inhuman length. You groan as your own fluids make themselves known, soaking your gaped lips in girlish cum. There's no way that you should be able to take this, let alone enjoy it, but you are. Oh gods, how you are!"
            );

            this.outx(
                "\n\nYou can feel your belly moving, stretching around the thick intruder. You wish you could look down, to see it outlined in your body, but your head is held fast. It pushes deeper, and finally, you feel as if you're reaching your limit. Somehow, that huge tentacle must know, because it stops right there and reverses direction. It yanks out far faster than it thrusted in, and you're left ultimately and completely empty. The feeling of cool air inside you is alien... uncomfortable, even. You don't like it. In dawning horror, you realize just how empty you feel, and how badly you need that tentacle inside you."
            );

            this.outx(
                "\n\nYou cum when it thrusts back in, loosening you further, moulding your twat into the perfectly shaped receptacle for its unending, monstrous needs. Gushing, your pussy gratefully clings to its massive, orange-colored master, getting more and more elastic with every second. Your eyes roll back around your third cunt-clenching climax. You miss the sky vanishing behind clouds of green, writhing stalks, but at least you'll never miss that feeling of <i>fullness</i> ever again."
            );

            this.menu();
            this.addButton(0, "Next", this.tentaFailII);
        }
        // Dicks
        else {
            this.outx(
                `\n\nThat monstrous, hungry-looking pussy wastes no time in descending towards your ${this.multiCockDescriptLight()}.`
            );
            if (this.player.biggestCockLength() <= 12)
                this.outx(
                    " The ease with which you slide inside is no surprise, given the disparity in size."
                );
            else if (this.player.biggestCockLength() <= 30)
                this.outx(
                    ` The ease with which you enter is no real surprise, given that even your bloated length${
                        this.player.cocks.length > 1 ? "s are" : " is"
                    } small by comparison.`
                );
            else if (this.player.biggestCockLength() <= 48)
                this.outx(
                    " You slide in with ease, perfectly matched to the hungry fuck-tunnel in size."
                );
            else
                this.outx(
                    " Sliding in must take quite the effort. The orange-hued twat is drooling around you, slowly working down an inch at a time. It takes all of you, even if it has to stretch beyond all reason to do so."
                );
            this.outx(" It feels good, better");
            if (this.player.biggestCockLength() <= 12)
                this.outx(
                    " than a giant that looks that loose should. You'd swear it was tight little twat from how firmly it's squeezing you!"
                );
            else if (this.player.biggestCockLength() <= 30)
                this.outx(
                    ` than you had thought at a glance. Not only is it the perfect size, but it seems to hug and touch every part of your maleness${
                        this.player.cocks.length > 1 ? "es" : ""
                    } just right.`
                );
            else if (this.player.biggestCockLength() > 48)
                this.outx(
                    " than you would expect given how tightly-stretched it looks. You'd think it'd be pressing down painfully, but it feels tailor made to take you instead."
                );

            // Dicks need to grow
            if (this.player.biggestCockLength() <= 30) {
                this.outx(
                    `\n\nGlowing orange goo leaks from the oversized slit in thick beads. You briefly wonder what purpose the odd coloration could serve when the feeling of your cock${
                        this.player.cocks.length > 1 ? "s" : ""
                    } stretching answers. It's making you grow bigger, somehow! The sensation is akin to stretching long-dormant muscles... an subtle flexing of unrealized potential that makes you aware of just how much you can do, or in this case, how big you can get. Your vision swims as your body works to keep up with the sudden change, and you close your eyes to keep from sicking up.`
                );

                this.outx(
                    `\n\nThe tentacle starts sliding up and down. At first, it's motions are slow and languid, giving you plenty of time to feel the supple slickness of its interior texture against you, but as your mass increases, so too does the speed of its up-and-down pumping motion. Even when it's pushing down, it somehow maintains a gentle suction that the velvety walls are tight against you, allowing you to subsume yourself in slippery cunt. The bigger you get, the better it feels. You aren't sure whether you're simply feeling more and more pussy at once or if you're somehow getting more sensitive, but it's enough to make your eyes roll back and your ${this.multiCockDescriptLight()} practically piss pre-cum.`
                );

                this.outx(
                    `\n\nWhimpering from more ecstasy than you know what to do with, you feel yourself surge in size again. It's impossible to tell just how big you've gotten with your view forced to look straight ahead. All you can be sure of is that it's getting bigger, and you're feeling a LOT of pussy. By comparison, the dozens of other tentacles surrounding you are barely there. It's like your cock${
                        this.player.cocks.length > 1 ? "s are" : " is"
                    } the only part of you worth feeling, and the rest of you is just floating in a void - a sensation that strengthens with every inch of length and girth that you gain.`
                );

                this.outx(
                    "\n\nCumming almost comes as a surprise to you, but there's only so much pleasure a body can receive before it helplessly and completely cumming, spraying thick wads of jism into the tentacle's hungry folds with instinctive convulsions. Every squirt leaves you a few inches longer and a good deal thicker. Only after emptying every ounce of cum from your [balls] does the feverish expansion finally halt."
                );

                this.outx(
                    `\n\nUnfortunately, the sensations don't. Even though the tentacle has stopped moving to digest its meal, you're still hyper-aware of the feeling of its slick folds against you. There's enough sensitivity in your enhanced package that unmoving pressure is giving your nervous system more feedback than your old dick's most vigorous fuck. The glowing, orange goo wasn't just making you bigger! It was stimulating nerve growth in your ${this.multiCockDescriptLight()}, making you so sensitive that you can't help but stay hard, even after cumming.`
                );

                this.outx(
                    "\n\nA few seconds later, the tentacle starts its slow, up-and-down stroking. You moan, giving a nearby vine the opening it needs to force itself into your mouth. It's tough to notice or care compared to the cacophony of signals coming from your crotch. Even your vision seems wasted and useless, the tactile resolution of your dickskin many times greater than your eyes' meager output."
                );

                this.menu();
                this.addButton(0, "Next", this.tentaFailII);
                return;
            }
            // Dicks big enough
            else {
                this.outx(
                    `\n\nGlowing orange goo leaks out around your base${
                        this.player.cocks.length > 1 ? "s" : ""
                    }. That must be what passes for the tentacle's girlcum. It feels like normal lubricant, at least. It doesn't burn or numb you, and it certainly doesn't seem to be making you grow any more. Wait... you close your eyes and focus on the feel of it. It's... it's better than normal lubricant! You're not sure why or how, but it feels subtly slicker than a normal pussy, and not in a bad 'no friction' kind of way. Every fold and silken caress still rubs your nerves just right. How can it be so slick and yet so powerfully soft and gripping?`
                );

                this.outx(
                    `\n\nThe inside of the tentacle contracts slightly, yet the accompanying pleasure is anything but slight. It feels like the whole world tightens against your ${this.multiCockDescriptLight()}, cradling them in cotton softness girded with velvet silk. You moan and cum, flooding the tube with the creamy goo of your release. Your body tries to thrust, but you're held completely immobile, forced to climax to the tentacle's tune. The ropes of pure pleasure are soon squirting to the timing of the gloriously textured fuck-tunnel, and it is only when your orgasm ends that you realize what the orange goo is doing to you; it's making you more sensitive.`
                );

                this.outx(
                    `\n\nYou don't go soft after you finish squirting. You don't even get to catch your breath. The orange channel might be holding still as it digests your load, but your dick${
                        this.player.cocks.length > 1 ? "s are" : " is"
                    } still getting more sensitive. You don't even need motion for the clutching walls to arouse you any more, and once it starts moving... you're not sure you'll be able to handle it.`
                );

                this.outx(
                    `\n\nA few seconds later, you find out that you can't handle it when the tentacle strokes you. The wave of skittering, electric pleasure overloads your mind, and breakers for your consciousness shut it down while your dick${
                        this.player.cocks.length > 1 ? "s throb" : "throbs"
                    }, loving every moment of it.`
                );

                this.outx(
                    "\n\nSometime later, you come to in between orgasms, surrounded in green, but there is so much sensory data coming from your crotch that your eyes might as well be blind by comparison. You marvel at this new life and wonder if you'll ever tire of admiring the texture of these walls. The next orgasm blasts those thoughts away, answering the question for you. Raw, unfiltered pleasure. That's what matters to you now."
                );

                this.getGame().gameOver();
            }
        }
    }

    private tentaFailII(): void {
        this.clearOutput();
        this.outx(
            "\n\nYou're held captive, overwhelmed by your own senses, and brought to nirvana ceaselessly. The demons never even try to free your fate, held captive as you are by one of the eldest tentacle beasts. You spend the rest of your life feeding it, incapable of focusing on anything but your own feelings of ecstasy."
        );

        this.getGame().gameOver();
    }

    private endHer(): void {
        this.clearOutput();
        this.outx(
            "You circle behind her an put and end to her evil while she is busy with her pet, then turn to walk away. When you look back over your shoulder, her body is gone. Nothing remains but an empty pathway."
        );

        this.flags[kFLAGS.D3_GARDENER_DEFEATED] = this.GARDENER_KILLED;

        this.menu();
        this.cleanupAfterCombat(this.getGame().d3.resumeFromFight);
    }

    private leaveHer(): void {
        this.clearOutput();
        this.outx(
            "Figuring that the succubus's pets can keep her busy indefinitely, you turn away. A shriek of pleasure draws your attention back, and you turn in time to see dozens of coiling, leafy masses encircling her every limb, bodily carrying her into a wall of twisting, leaking cocks and pussies. Her orifices are stuffed with pumping lengths that froth with spit and girlcum, and her eyes, equal parts alarmed and aroused, widen before disappearing into the forest of green."
        );

        this.flags[kFLAGS.D3_GARDENER_DEFEATED] = this.GARDENER_LEFT;

        this.menu();
        this.cleanupAfterCombat(this.getGame().d3.resumeFromFight);
    }

    public surrenderToTheGardener(hpVictory = false): void {
        // Male
        if (this.player.hasCock() && !this.player.hasVagina()) {
            this.maleLoss(hpVictory);
        }

        // Genderless
        if (!this.player.hasCock() && !this.player.hasVagina()) {
            this.femGenderlessLoss(hpVictory);
        }

        // Fems
        if (this.player.hasVagina() && !this.player.hasCock()) {
            this.femGenderlessLoss(hpVictory);
        }

        // Herms can have either!
        if (this.player.hasVagina() && this.player.hasCock()) {
            if (SuccubusGardenerScenes.rand(2) == 0) this.femGenderlessLoss(hpVictory);
            else this.maleLoss(hpVictory);
        }
    }

    private femGenderlessLoss(hpVictory: boolean): void {
        this.clearOutput();
        this.outx("You drop to the ground, defeated and degraded");

        if (hpVictory) this.outx(", not even able to push your bruised body up onto its [feet].");
        else
            this.outx(
                ", too turned on to try and stop your hands from diving into your needy crotch."
            );

        this.outx(
            '\n\n<i>"Fallen already? Has the once mighty champion finally lost herself to the corruption of this land? Who would have thought that the one to'
        );
        if (this.player.findStatusAffect(StatusAffects.FactoryOverload) >= 0) this.outx(" destroy");
        else this.outx(" shut down");
        this.outx(
            ' our factory would fall to a simple succubus and her lowly garden?"</i> She strides over to you, hips wiggling in pleasure, and kneels alongside you, running her hand over your abdomen like a girl handling a new pet for the first time. <i>"You\'re going to be so useful in my garden!"</i>'
        );

        this.outx("\n\nHer garden?");
        if (!hpVictory) {
            this.outx(" You cast a furtive glance towards the writhing vines.");
            if (this.player.hasVagina())
                this.outx(
                    " Your underthings were already swampy with need, but the sight of watching those eager vines squirm elicits fresh trickles of lube to course down your [legs]."
                );
            else
                this.outx(
                    " You were already horny, but you find yourself wishing you had a pussy, just so you could take even more of them inside you."
                );
        } else
            this.outx(
                " You cast a worried look towards the writhing vines. They seem so eager, yet they hold back for now, perhaps waiting for their mistress to finish. No... you can't go down like this!"
            );

        this.outx(
            '\n\nGently removing your [armor] a piece at a time, the succubus coos, <i>"Are you looking forward to it yet, [name]? Being wholly, totally embraced, every hole filled with pulsing, eager lengths?"</i> She strokes your cheek in a gesture that you would mistake for affection from anyone but a demon.'
        );
        if (this.player.hasVagina())
            this.outx(
                " Against your better judgment, you're starting to get wet from the promises of her words. You know you're being given to a neverending hell of sexual stimulation, but you can't stop your body's libido from responding to the idea."
            );
        this.outx(' <i>"Yeah, you want it, doncha?"</i> Slim fingers deftly press at your');
        if (!this.player.hasVagina()) {
            this.outx(
                " bare crotch, sinking into a crease that didn't exist a moment before. Her skilled touches and dark powers mold your body like a sculptor's clay, crafting a magnificent cunt on your crotch while simultaneously bringing it to a dripping wet state."
            );
            this.player.createVagina();
        } else {
            if (this.player.wetness() <= 2) this.outx(" moistening");
            else this.outx(" soaked");
            this.outx(
                " crease, and it's all you can do not to cry out and thrust back against her."
            );
        }

        this.outx("\n\nThe succubus idly toys with your [vagina], sometimes rubbing her thumb");
        if (this.player.balls > 0) this.outx(" across your [sack],");
        else if (this.player.hasCock()) this.outx(" across the underside of your [cock],");
        else this.outx(" against your [clit],");
        this.outx(' confiding aloud, <i>"To be honest, I\'m a little jealous of you."</i>');

        this.outx("\n\nHer fingers dip deeply into your slickness, and you moan in answer.");

        this.outx(
            '\n\n<i>"You\'re going to get to go to a place where there is no worry... no angst... just... pleasure."</i> The last part escapes her lips as a breathy whisper. <i>"No worry or fear either. I\'ve watched them take other slaves. It\'s like watching a master bard strum on his favorite lute. Instead of deft fingers across taut strings, it will be slippery tentacles coaxing every ounce of bliss from your nubile form."</i> She sighs. <i>"Oh to be free of my obligations. I would join you in a heartbeat."</i>'
        );

        this.outx(
            '\n\nA whimpering, <i>"Yes,"</i> squeezes past your lips as you arch back against her palm.'
        );

        this.outx(
            '\n\nSmiling sadly, the succubus pulls her fingers away. A web of your own clear lubricant hangs suspended between her fingers and your moistened box for a moment, then snaps. <i>"You\'re going to be a wonderful mother my for pets, I just know it."</i> She loops an arm under your shoulder and lifts you to your [feet]. <i>"Now, lets get you what you want, dear."</i>'
        );

        this.outx(
            "\n\nYou're led up to the very edge of the wall of vines. The writhe and twist against one another, in constant, aching motion, signalling their feverish want for you, but they hold back all the same. Their mistress has certainly trained them to act like gentlemen... for now at least."
        );

        this.outx(
            "\n\nSuddenly, the supportive arm vanishes, and you're pushed forward, falling straight into the mesh of vines...."
        );

        this.menu();
        this.addButton(0, "Next", this.femGenderlessLossII);
    }

    private femGenderlessLossII(): void {
        this.clearOutput();
        this.outx(
            "Your fall doesn't take you very far. A cushion of interceding plants stops you long before any harm could befall you, holding you nearly horizontally above the rich, loamy earth. There's a bit of a salty-sweat scent in the air. You can't quite identify it, but then again, you don't really have time to. Bands of floral flesh are circling around your arms and [legs]. They aren't constrictive. As a matter of fact, they're kind of comforting - like being surrounded in a lovers arms. Of course, these arms conform perfectly to your flesh, pressing down on you from all sides."
        );

        this.outx(
            "\n\nIt grows dark as the tentacles adjust to your presence within their midst. Those not actively engaged in sliding across your [skinFurScales] are straightening once more, blocking the light and warmth of the sun out for what is perhaps the last time. Bands of slick, wet plant roll across your shoulders and [chest], enveloping them much like your limbs a moment before. A narrow band slides over your collarband and worms around your neck into an impromptu collar, tight enough that it's impossible to ignore but loose enough to allow you to breathe."
        );

        this.outx("\n\nWetness drizzles your [vagina]");
        if (this.player.hasCock()) this.outx(` and ${this.multiCockDescriptLight()}`);
        this.outx(
            " with foreign wetness. The vines' lubricant is surprisingly warm on your skin, and the feeling of rivulets of it running down the crack of your [butt] and over your [asshole] is surprisingly pleasant."
        );
        if (this.player.isBiped())
            this.outx(
                " Your [legs] are eased open, but who are you to stop them? You're as wet as anything, and if spreading wide is the next step towards scratching your itch, so be it."
            );
        this.outx(" Your [clit] must look like a");
        if (this.player.clitLength > 6) this.outx(" glistening, cum-soaked shaft");
        else if (this.player.clitLength > 3) this.outx(" tiny, cum-soaked cock");
        else if (this.player.clitLength > 1) this.outx(" swollen, lube-lacquered gumball");
        else this.outx(" glistening, pink target");
        this.outx(
            " by now. You roll your [hips] as much as your position will allow. Your passion inflamed pussy has thus far avoided the tentacles' affections, though it's the one part that wants them more than anything."
        );

        this.outx(
            "\n\nBands of verdant iron hook around your wiggling hips to steady them. These are not like the soft cushioning bands that bind you elsewhere. Where those are only modestly firm, these are unforgiving bondage. They immobilize rather than guide. Your crotch's squirming is stilled and your need unquenched. A cry of displeasure erupts from your mouth, but it too is stilled, this time by a thick, lip-stretching tendril that locks your jaw open. You can't talk. You can't even hump. All you can do is hang there and drip while your mouth slowly fills."
        );

        this.outx(
            "\n\nThe taste on your tongue, both of the stalk plugging you and its fluid, is just as salty and sweet as the scent coming from the ground. If you weren't thinking with the achingly empty hole you call a cunt, you might have realized just how cum-soaked the soil is here, but instead, you're swallowing a mouthful of tainted tentacle juice and dripping. The more you swallow, the more your [vagina] drips, and the less capable of rational thought you become. You're a font of girlcum, a drippy, wet sponge of a girl who is going to spill her juices until her fragrant sex enticing someone to give her the filling she clearly needs."
        );

        this.outx(
            "\n\nYour [vagina] erupts in a long overdue gout of pleasure, squirting juices into the air as something thick and warm slams past its welcoming gates deep into its cum-starved channel."
        );
        this.player.cuntChange(this.player.vaginalCapacity() * 1.25, true, true, false);
        this.outx(
            " The change from complete emptiness to total fullness rocks the very foundations of you world. There's something so very right about stuffed with cock, crammed full of dick, that you can't imagine existing any other way. Throat bobbing while you swallow, you happily gurgle and relax. Muscles that were coiled tighter than steel springs go slack. There's no need to take action; your gushing hole is finally filled, and the whole of your body is cradled by your inhuman lover's seemingly infinite arms."
        );

        this.outx(
            "\n\nYour [vagina] clinges tightly to the girthy intruder. The size of the glistening, girlspunk-stained stalk seems perfectly suited to keeping your lips your comfortably stretched. Perhaps it's all the aphrodisiac-laced spooge you're guzzling, but you don't feel an ounce of pain. Your pussy is incandescent with ecstasy. Letting your eyes drift closed, you voluntarily abandon you other senses in order to focus on the rhythmic strumming of your vaginal nerves. The pleasure is so right... so perfect, that you feel compelled to play your tongue along the tentacle in your mouth and work forgotten, vaginal muscles, trying to say thank you in the only way you're capable of."
        );

        // Dicks
        if (this.player.hasCock()) {
            this.outx(
                "\n\n[EachCock], long ignored and pulsing ribbons of off-white lust, is snapped up by what feels like a custom-made sleeve. You can hear the noisy slurp of it vacuuming up your length"
            );
            if (this.player.cocks.length > 1) this.outx("s");
            this.outx(
                " over the lurid squishing sounds coming from your cunt, and the two sensations combine into a riot of overwhelming sensory data. You're fucking and being fucked to two different, incongruent tempos and unable to make sense of it in the slightest."
            );
        }

        // Back to normal.
        this.outx(
            "\n\nMore cum splatters across the exterior of your womanhood a moment before an enclosure envelops your [clit]."
        );
        if (this.player.clitLength > 6)
            this.outx(" It stretches some around the cock-sized button");
        else if (this.player.clitLength > 3)
            this.outx(" It has no trouble handling your plus-sized button");
        else this.outx(" Your tiny button seems dwarfed by the tube enveloping it");
        this.outx(
            ", but that doesn't make it feel heavenly. It gently pulsates around your buzzer, rippling and squeezing, rhythmically whipping electric lashes of sensation into your fuck-crazed body one after another."
        );

        this.outx(
            "\n\nThe fleshy spear ravaging your honeypot quivers and slows, then thrusts hard enough to rock your body"
        );
        if (this.player.biggestTitSize() > 2) this.outx(" and jiggle your tits");
        this.outx(
            ", pressing itself flat against your cervix before finally exploding, creaming your insides with a thick layer of molten-hot seed. You would groan or whimper if your throat wasn't crammed so full of plantcock. Instead, your eyes roll back under their fluttering lids, revealing a narrow band of white as you lose all control. Your body shakes like a seizure victim's, all except for the muscles down south. They're too busy clenching and squeezing the lengthy intrudor, wringing every drop of lust-imbued cum"
        );
        if (this.player.isPregnant()) this.outx(" to splatter against your occupied womb.");
        else
            this.outx(
                " to fill your womb, to make it round with life so that others can feel what you're feeling."
            );

        this.outx("\n\nYour girlhoney squirts, splattering over the ground.");
        if (this.player.wetness() < 4)
            this.outx(
                " You may not normally be capable of such soaking orgasms, but that seems of little concern to you."
            );
        this.outx(
            " You're a fountain of wetness now, fit only for cumming and taking cum in. The thought triggers a second orgasm on the back of the first while the spent tentacle exits."
        );

        this.outx(
            "\n\nAnother, larger tentacle takes its place, sealing most of the first's load inside. There's no waiting, only fucking and climbing to one orgasm after another. The space between climaxes narrows with each one until your world becomes a constant, irresistible tide of bliss."
        );

        this.getGame().gameOver();
    }

    private maleLoss(hpVictory: boolean): void {
        this.clearOutput();
        this.outx("You drop to the ground, defeated and degraded");
        if (hpVictory) this.outx(", not even able to push your bruised body up onto its [feet].");
        else
            this.outx(
                ", too turned on to try and stop your hands from rushing to your crotch. Why bother?"
            );

        this.outx(
            '\n\n<i>"Oooh, has the mighty champion finally fallen? To think, the one who wiped out our factory installation would fall prey to simple tentacle shrubs and a lowly succubus."</i> She strides over to you, her hips wiggling with pleasure. Her foot presses down on your crotch, rubbing your [cock] through your [armor], her eyes twinkling as you writhe at her touches. <i>"Hmmm... would you rather be my little pet doggie? Following me around on a leash for walkies in the garden, or do you think that this-"</i> She presses down harder on your crotch. <i>"-would be a good source of protein for my other pets?"</i> Gesturing at a nearby tendril\'s slobbering slit, she smiles. <i>"Either is good for me."</i>'
        );

        this.outx(
            "\n\nYou whine, the unwelcome lust obliterating any other considerations as she plays with you, not even bothering to use her hands or mouth. Both ideas have their own appeal. You're quite sure that any pet of hers is going to get to be allowed to breed quite frequently, but then again, being given to the tentacles to be bound and milked for the rest of your life would take your mind off your failure here. To be honest, here, under her heel, you have a hard time even remembering why you came here in the first place. You're just glad to feel her flawless skin rubbing you, dismissively or not."
        );

        this.outx(
            "\n\nThe succubus stops, looking at you questioningly. It's obvious that she's waiting on a reply. What do you choose?"
        );

        // [Pet][Feeder]
        this.menu();
        this.addButton(0, "Pet", this.maleLossPet);
        this.addButton(1, "Feeder", this.maleLossFeeder);
    }

    private maleLossPet(): void {
        this.clearOutput();
        this.outx(
            '<i>"I\'ll be your doggie,"</i> you gasp with an accompanying needy arch of your back.'
        );

        this.outx(
            '\n\nPressing down on your [cock] once more, the succubus giggles, <i>"Oh, you\'ve chosen wisely, my little pet. Oh... oh my, has pet got a bone?"</i> She bends over, stripping your [armor] with effortless efficiency to expose the eagerly pulsating length.'
        );
        if (this.player.biggestCockLength() >= 18)
            this.outx(
                " <i>\"Oh, it's quite the big bone, isn't it? You're going to have an awful hard time dragging that around on all fours, [puppy]. Why, I bet the moment you see a bitch, you're going to be humping the ground, practically immobilized by it."
            );
        else if (this.player.biggestCockLength() >= 8) {
            this.outx(
                " <i>\"Oh, that's quite the nice bone you've got there, isn't it? Why, everyone is going to see how big you are down there, even while you're walking on all fours. I suppose you'd be good for breeding the bitches"
            );
            if (this.player.cocks[this.player.biggestCockIndex()].cockType != CockTypesEnum.DOG)
                this.outx(", once you have an appropriately-shaped cock");
            this.outx(".");
        } else {
            this.outx(
                " Oh, that's quite the well-formed bone you've got there, isn't it? I could probably take you to shows, and the judges would comment on how well it matches your form. You'd like that, wouldn't you? Rolling over on your back and letting some official-looking demon measure your cock."
            );
        }
        this.outx('"</i>');

        this.outx(
            "\n\nA high-pitched whine of agreement automatically slips off your tongue - anything to get her to continue her ministrations on your crotch. You hold your hands up like paws and splay your [legs] for easier access, humping the 'v' between her big and index toes, rubbing yourself off on the bottom of her foot, knowing full well that's the best the demon is likely to give you."
        );

        this.outx(
            `\n\n<i>"Goood ${this.player.mf(
                "boy",
                "girl"
            )},"</i> she coos, twisting her foot to rub her heel against your [sheath]. <i>"You're just so eager to cum that you'll do anything, won't you?"</i>`
        );

        this.outx('\n\n<i>"Yessss,"</i> you hiss, forgetting your role in the heat of the moment.');

        this.outx(
            "\n\nStars erupt in your vision as you're kicked in the head, and you're not sure which is worse - the ache of her none-to-subtle reprimand or the void of sensation on your throbbing tool. The phantom memeory of her warm, soft toes cradling your veiny fuckstick teases you worse than anything she could say, and you look up at her, a hurtful look plain on your face."
        );

        this.outx(
            '\n\nHer visage is painted with displeasure, but hints of possessive affection as well. It would be easy to confirm it for a kind of motherly displeasure were it not for the glint of prideful ownership in her eyes. <i>"Pets don\'t talk,"</i> she explains. <i>"I\'ll fix that later, but for right now, you can be my good little puppy, right?"</i>'
        );

        this.outx(
            '\n\nYou open your mouth, about to answer, when you remember what happened last time. Slowly, you shape your mouth to make a new sound. "</i>...arf?"</i>'
        );

        this.outx("\n\nThe succubus' heel rubs at your [sheath]");
        if (this.player.balls > 0) this.outx(", just above your [balls],");
        this.outx(
            " once more, cooing, <i>\"I knew you'd train well. Now, I'm going to lead you to your new home, and then you'll get to blow all that nasty, pent-up spunk all over my hand. But you have to be good until then, okay?\"</i>"
        );

        this.outx(
            `\n\nYou... you're not sure you can! You're so hot and so close! Pearls of clear pre are oozing out of your ${this.multiCockDescriptLight()} like water from a leaky faucet, and all you'd need to do is grab hold of her leg and just hump away.`
        );

        this.outx(
            '\n\nPerhaps sensing this or simply because she intends to lead you away, she pulls away. <i>"I suppose you can have a treat before you go."</i> The blue-hued demon turns to a depression in the ground and leans over, holding you down with her foot to keep you from mischief. After all, you haven\'t been properly trained. Her tremendous breasts hang down in elongated teardrops, only sagging slightly in spite of their huge size. When her fingers grab her pebbly, hardened nipples and begin to tug, a ripple passes back the creamy skin of her teats, and a torrent of amber-white sap erupts.'
        );

        this.outx(
            "\n\nThe first flows splatter on impact. You're lucky enough to have a few flecks land on your lips, and you tentative test them with your tongue. They're delicious! You lick and lap at every stray drop"
        );
        if (!this.player.hasMuzzle())
            this.outx(
                ", heedless of the fact that you seem to be able to reach a little farther with every one you consume"
            );
        this.outx(
            ", slobbering some in your vigor to get more. All the while, the depression fills higher. The sound of gushing fluid tapers down to pitter-patters of the last droplets impacting the impromptu bowl, accompanied by a moan from the demon. She's clearly enjoyed preparing your little treat."
        );

        this.outx('\n\n<i>"Eat up, doggy."</i> Her foot disappears.');

        this.outx("\n\nYou look down at your drooling rod");
        if (this.player.cocks.length > 1) this.outx("s");
        this.outx(
            ", then at the puddle of sap-laced milk, then at your rod again, then finally back at the puddle before getting up onto all"
        );
        if (this.player.isNaga()) this.outx(" threes");
        else if (this.player.isTaur()) this.outx(" your hooves");
        else this.outx(" fours");
        this.outx(".");
        if (!this.player.isTaur())
            this.outx(" You scrabble over, unusued to having to move in such a way,");
        else this.outx(" You gallop over and drop down on your forelegs");
        this.outx(
            " and plant your [face] right into the succubus' milk. It's a little thicker than milk normally is and stickier too, like honey, but it's also sweeter. The ambrosial fluid fills your mouth with scintillating, indescribable flavor that sets"
        );
        if (this.player.tailType != 0) {
            this.outx(" your tail");
            if (this.player.tailType == 13 && this.player.tailVenom > 1) this.outx("s");
        } else this.outx(" your stubby, new tail");
        this.outx(" wagging.");
        if (this.player.tailType != 2)
            this.outx(" Never mind that it gets longer and fuzzier with every gulp or that your");
        else this.outx(" Never mind that your");
        this.outx(
            " tongue is swelling up, wide, flat, and perfect for panting, licking, and lapping up a drink."
        );
        this.player.tailType = 2;

        this.outx(
            "\n\nPerhaps best, and worst, of all, you aren't going soft in spite of the lack of attention to your bone. It merely hangs under your"
        );
        if (this.player.isPregnant()) this.outx(" pregnant");
        this.outx(" belly, dripping and drooling");
        if (this.player.hasVagina())
            this.outx(", lubricated with a sheen vaginal juices from your forgotten sex organ");
        this.outx(
            ", more ready for use than ever but obedient... waiting for someone, perhaps a mistress, to allow you to use it. Most of the milk is gone now, but your tongue is perfect for prizing the last of the honeyed amber from its muddy bowl. Having such a useful muscle allows you the perfect chance to look up at her while you drink."
        );

        this.outx(
            "\n\nWhy are her hands glowing? Coronas of amber energy are flicking around her hands. There's even flashes of the stuff at the corners of your eyes. Maybe it's just too bright. Whatever the case, she's smiling, so you must be doing well. You never thought a succubus could be this nice! The pain of the kick has already faded, and you're feeling very 'in the moment.' She's most definitely in a position of power over you. Perhaps owner is the right word. The corners of your mouth quirk up at how right that sounds. Yes, she's definitely your owner... your mistress."
        );

        this.outx(
            "\n\nThe glow emanating from her fingertips flashes and fades as you lick the last bits of mistress' gooey goodness out of the dirt. You lick at your chops, savoring every stray drop before picking yourself up and panting. You're so lucky that you gave yourself to her! You give a happy bark to tell her. If only you had a way to make her understand you."
        );

        this.outx(
            '\n\n<i>"Good [boy],"</i> she coos again, and you hear the tone more than the words, hear the praise layered into them, understand that you\'ve made her happy. Your tail flails back and forth in excitement, and your obedient cock'
        );
        if (this.player.cocks.length > 1) this.outx("s thrum");
        else this.outx(" thrums");
        this.outx(
            " with ready excitement. A thin trail of pre-spooge rolls out of you, trailing on the ground behind you with each happy twitch of your bitch-"
        );
        if (this.player.biggestCockLength() >= 12) this.outx("breaker");
        else this.outx("boner");
        this.outx(
            ". You hope she doesn't mind, but you have a hunch that she won't mind you being THAT kind of messy puppy."
        );

        this.outx(
            '\n\nThe succubus turns and whistles, patting her hip. <i>"Come along now, I\'m gonna show you your new home."</i>'
        );

        this.outx(
            "\n\nYay! You plod along after her, low to the ground and sniffing at the air. Mistress has a very unique aroma, now that you take a chance to appreciate it, like earth and berries and sex all mixed up into one scent. You've never sample its ilk before. Other aromas bring themselves to your attention, some wafting from side passages and other mere traces on the ground, but you're aware of them all, intrigued by them all and wishing that you could run off to see what every single one was. Maybe after you discover your new home, she'll let you go for a run."
        );

        // Taurs
        if (this.player.isTaur() || this.player.isDrider()) {
            this.outx(
                "\n\nThe longer you follow, the more you bow over, submissively, and at some point, you even start putting your hands on the path, moving your weight onto them. Elsewhere, your middle is raising up, and your body is changing, you're sure of that. The change slows you at first, but soon enough you're plodding along just fine, the"
            );
            if (this.player.isDrider()) this.outx(" clip-clop of your hooves");
            else this.outx(" sharp clacks of your spidery claws");
            this.outx(
                " fading into the near silent pats of padded paws. Your hands are changing too: the fingers are shortening, but your nails are growing. Fur grows out over them, and your spine shifts, all so that you can follow on all fours that much easier."
            );
        } else {
            // Nontaurs
            this.outx("\n\nThe longer you follow, the easier it gets to stay on her heels.");
            if (this.player.isGoo())
                this.outx(
                    " Your gooey undercarriage easily divides into two hind legs, slapping wetly with regularity as you plod along."
                );
            else if (this.player.isNaga())
                this.outx(
                    " Your slithering tail twitches, stopping you for a second, but then it splits into two limbs, each firmer and more canine than the snake-like appendage you once had. They wobble unsteadily for a second before jumping into action."
                );
            else
                this.outx(
                    " Your [legs] shorten as you plod along, slowing you momentarily as they change. You lift your knees up so that you can stand on your [feet] once more, only they're soft, padded paws now, tipped with short nails."
                );
            this.outx(
                " Your hands follow suit. First, pads form on your palms, making it easier to support your weight. Then, your fingers shorten. It's not entirely an unpleasant sensation, as it makes moving towards your home that much easier."
            );
            this.outx(
                "\n\nBy the time you pass into a structure, you're prancing along quite spryly on your four legs. Several other demons and creatures are around now. Many point at you and speak, but the words are beyond you. The tones in their voices imply derision or jealousy of Mistress, but a smile from her stills your worries. She's pleased! Your tail, which had gone flat a moment ago, begins slapping back and forth again, dumbly smacking into the wall as you follow."
            );
        }

        // [Next]
        this.menu();
        this.addButton(0, "Next", this.maleLossPetII);
    }

    private maleLossPetII(): void {
        this.clearOutput();
        this.outx(
            "Your kennel is amazing! It's the perfect size for you to crawl into, there's holes in it so that you don't get too hot while you wait to be let out. There's even one big enough for you to slip"
        );
        if (this.player.cocks.length > 1) this.outx(" a");
        else this.outx(" your");
        this.outx(
            " cock through. That hole is on the back wall. You can't see what's over there, but your nose can smell pussies - some of them bitch-pussies, and lots of spilled cum. Your old mind would've identified it as a glory-hole, but it's harder to focus on concepts like that now. "
        );

        this.outx(
            "\n\nThere's just too much physical sensation going on for you to focus on coherent thoughts. Every part of your body feels like it's screaming its awareness at you. Your tail is a little itchy, for instance. Your legs are a little tired, but it's that good kind of 'just went for walkies' tired. Your nose can smell soooo much. And best of all, your cock feels like it's three times as sensitive. It's so much easier to just think in emotions and images instead of abstract concepts like words."
        );

        this.outx("\n\nMistress clasps a collar around your furry neck.");
        if (this.player.skinType != SKIN_TYPE_FUR) this.outx(" Was that there before?");
        this.outx(
            " It feels very right, and in your excitement, it's hard not to hump her leg. It must be obvious to her, because your dick"
        );
        if (this.player.cocks.length > 1) this.outx("s are");
        else this.outx(" is");
        this.outx(" bobbing beneath you, and she gestures for you to roll onto your back.");

        this.outx('\n\n<i>"You\'ve listened so well today, doggie. Time for your treat."</i>');

        this.outx(
            "\n\nOhhhh, she sounds so happy! You roll over, panting in excitement, your pre oozing into your fur in reckless drops, and look up at her. She ruffles your belly, making you wiggle in happiness, before reach down to [oneCock] and wrapping her hand around it. Ohhh, it's so smooth and soft. You can feel every crease in her hand as it slides around you, and the wetness of your eagerness has you irrevocably lubricated. She doesn't stroke just yet, instead rubbing her thumb back and forth beneath your [cockhead biggest] while cradling your tool."
        );

        this.outx('\n\nMistress asks, <i>"Who\'s a good puppy?"</i>');

        this.outx(
            "\n\nYou bark, and her other hand ruffles your [hair], playfully scratching behind your ears. She squeezes while stroking slowly and repeats the question."
        );

        this.outx('\n\n<i>"Who\'s a good puppy?"</i>');

        this.outx(
            "\n\nYour bark comes quicker and easier this time. At the same time, Mistress' hand moves a little faster. The pleasure is overwhelming, like the entirety of your consciousness is down between your hindlegs and being playfully caressed by her beautiful, shapely fingers, spellbound and held between them so that they can eke ever-greater flows of pleasure from your pliant nerves. In this moment, you're happier than you ever remember being, euphoric even. This must be what true love feels like. You marvel at how love feels like being owned, your cock"
        );
        if (this.player.cocks.length > 1) this.outx("s");
        this.outx(
            " trembling and spurting out ribbons of pre. Whining in the back of your throat, you look at her, hoping she can read the affection in your eyes, wanting her to see just how completely contented you are with this state of affairs."
        );

        this.outx('\n\n<i>"Who\'s a good doggie?"</i>');

        this.outx(
            `\n\nYou bark and cum at the same time, shooting ropes all over your belly. Mistress is so nice; she keeps stroking while you shoot, encouraging her pet to shoot every drop of ${this.player.mf(
                "his",
                "her"
            )} sperm out. You must have been really good! Lances of white goop splatter off your chest, still somewhat human in shape, and tag your chin.`
        );
        if (this.player.cumQ() >= 2500)
            this.outx(
                " A few thick ropes shoot past your head to cream the wall, eliciting a pleased giggle from your owner as she squeezes yet more from your length."
            );
        this.outx(
            " You yip with glee as you cream for Mistress' fingers, but eventually, your climax trails off into a dribbly white mess, some of which clings to the demoness' nails like beads of ivory dew."
        );

        this.outx(
            "\n\nThe tentacle gardener holds her hand to your mouth for you to clean. You don't hesitate for a moment, licking the salty treat off her with gusto before being led into your kennel for a nap."
        );

        // [Next]
        this.menu();
        this.addButton(0, "Next", this.maleLossPetIII);
    }

    private maleLossPetIII(): void {
        this.clearOutput();
        this.outx(
            `The champion, more canine than [man], became little more than one mutt among many that the demons had tamed, used for everything from breeding to hunting escaped slaves, and ${this.player.mf(
                "he",
                "she"
            )} loved it, delighted in it even. Eventually, ${this.player.mf(
                "his",
                "her"
            )} owner bred her numerous times, creating a bloodline of strong, loyal servants that eventually helped keep all of Mareth under the demon's heels.`
        );
        this.getGame().gameOver();
    }

    private maleLossFeeder(): void {
        this.clearOutput();
        this.outx(
            "<i>\"I'll... I'll play with the tentacles,\"</i> you gasp out, as much to yourself as the succubus, finally coming to terms with your shameful predicament. Somehow, being forced to endlessly climax seems subtly more dignified than crawling around on a leash. You tell yourself that you'll simply bide your time - wait for a chance to slip free of the vines' ceaseless squirming. You resolve not to give up even though you've lost this battle."
        );

        this.outx(
            '\n\nThe succubus\'s lips curl cruelly. <i>"Oh. You still think you\'ll get a chance to escape, don\'t you?"</i> She throws her head back and laughs. <i>"How wrong you are, Champion. How wrong you are..."</i> Turning to the botanical wall, the enchanting gardener at you, giving you quite the view of her well-formed backside.'
        );

        this.outx(
            "\n\nSomething slick and smooth wraps around your [leg], moving slowly and patiently but with great strength. You can feel the firmness of its grip tightening while a second latches on. The twinned tentacles circle up your body in alternating corkscrew patterns, gliding across your [skinFurScales] with self-lubricated ease. You try to scrabble away, but the tendrils merely lift you aloft like a child would a toy. Meanwhile, the succubus merely flicks"
        );
        if (this.player.cocks.length > 1) this.outx(" [oneCock].");
        else this.outx(" your dick.");

        this.outx(
            '\n\n<i>"It\'s funny that you seem to think you\'ll have any agency over your life at this point."</i> She laughs. <i>"This next part will go easier if you relax."</i>'
        );

        this.outx(
            "\n\nThe appearance of a green-hued vine answers your question before you can ask it. It's so close that you have to cross your eyes to focus on it, and the slightly bulbous, rounded tip is but curled towards your lips. Syrupy wetness covers the whole of its tip, dripping down its length. There's no visible opening that you can see; perhaps it secrets the sweet-smelling sap? Before you can consider the implications of such a thing, it presses into your mouth with enough force to force your jaw open. It certainly doesn't help that you were totally unprepared for its thrust."
        );

        this.outx(
            "\n\nThe taste... oh gods, the taste! It isn't what expected at all! The flavor is sweeter than a lover's kiss, more flavorful than the finest chocolate. Your mouth is awash in ambrosial bliss, and you suckle from the bulbous intruder immediately, sucking down as much of the honeyed goo as possible. Your tongue affectionately lashes the underside of the tendril, and on cue, it produces more. It feels like there is a place that opens up to release more of the delicious goo after all. With every slurping suckle, more squirts onto your palate."
        );

        this.outx(
            '\n\nThe succubus strokes her fingertips down your neck and jawline, softly explaining, <i>"The fluids you\'re enjoying so much? It goes without saying that they\'re corruptive... but would you really want to go without them now, after tasting them?"</i> She playfully strokes the tentacle, earning you a nice, thick spurt of goo. <i>"Could you really stop sucking on this?"</i>'
        );

        this.outx(
            "\n\nYou... you're not sure. You noisily gulp down the proffered, delectable goo to buy time to think. It doesn't just taste good; it feels good in your belly as well. It fills you up in ways that food never could. Trickles of that delight radiate out from your slowly-filling gut. They make your [skin] seem to fizzle with raw energy, particularly in your crotch. It's impossible to ignore the way that [eachCock] is swelling or how wonderful the currents of moist air against it feel. "
        );

        this.outx("\n\nRunning her finger down");
        if (this.player.cocks.length == 1) this.outx(" its");
        else this.outx(" one's");
        this.outx(
            ' twitching length, the succubus giggles. <i>"Can you feel it? Can you feel your body just welling up with cum? I suppose I should have mentioned that, huh?"</i> She runs her finger back the other way, and your muscles clench, squeezing out a big, fat drop of pre from your cock, dripping down to hit'
        );
        if (this.player.biggestTitSize() >= 3) this.outx(" the underside of your breasts");
        else this.outx(" your chin");
        this.outx(
            `. You whimper with need. It's impossible not to. Hell, your ${this.multiCockDescriptLight()}`
        );
        if (this.player.cocks.length == 1) this.outx(" is");
        else this.outx(" are");
        this.outx(
            " flexing, and if you had anything to brace off of, you'd be thrusting into the first orifice you could find."
        );

        this.outx(
            "\n\nYou look at up at the gorgeous woman pleadingly, bound and dripping, helpless and aroused beyond measure. More tentacles wrap your arms tightly to your sides while she considers your situation. Her hands withdraw from your length, but the tentacle in your mouth is starting to pump in and out, squirting ropes of heavenly sap down your throat. There's something so indescribably erotic about the situation - you hanging there, suspended and helpless, pumped full of corruptive, cock-engorging chemicals that make every part of you so wonderfully sensitive."
        );

        this.outx(
            `\n\nA breeze caresses your [leg] as the succubus casually removes your [armor]. It feels like oiled fingertips sliding over your flesh. Your [nipples] are like live wires, and your ${this.multiCockDescriptLight()}.... Well, you're leaking pre in thick, solid ropes now, an act that feels like halfway between a good tonguing and orgasm itself. Your lips are slick with the tentacle's fluid and tingling like sex-organs of their own. Sealing them tight, you moan, gurgle, and swallow. Attempts to beg for more have fallen away. This is enough, and if it keeps up, you're going to cum, touches or no.`
        );

        // Prostate swelling
        if (this.player.balls == 0) {
            this.outx(
                "\n\nThe familiar tightness in your core is there, but rather than climaxing immediately, the sensation intensifies. It grows like an itch you can't scratch, driving you to distraction. Your body tightens like a watchspring being cranked before eventually snapping, sending your muscles into uncontrollable convulsions, squeezing and grinding against something swelling up inside you. Clenching down against it feels unconscionably good and earns you a thicker drizzle of pre. You twist in your bindings while the flow thickens and your spasms turn into a steady fluttering. It's clear that your prostate is getting bigger, but it feels too good to worry about."
            );
        }
        // Ball filling
        else {
            this.outx(
                "\n\nThe tightness in your [balls] is there, your [sack] drawing close against your crotch, but rather than climaxing immediately, the sensation intensifies. The feeling of tautness relaxes after a moment, but in its place comes an unfamiliar weightiness, one that only serves to remind you of the payload building inside them. As a matter of fact, you swear you can feel a certain liquid churning there, like every beat of your heart is somehow pumping more and more cum into your [balls]. Your mind knows it impossible, but the incredibly fullness of your swelling sack argues otherwise."
            );
            if (this.player.ballSize > 15)
                this.outx(
                    " Thankfully, a few tentacles loop under the gigantic orbs to help support them."
                );
        }

        this.outx(
            "\n\nYou happily gurgle into the tentacle in your mouth and arch your back, blowing the first huge rope of your enhanced load"
        );
        // 9999 - Check muh
        if (this.player.biggestTitSize() >= 3) this.outx(" all over your body");
        else this.outx(" directly onto the soil below");
        this.outx(
            ". It isn't enough! You're so full, and you need to cum so much. The next spurt is more like a firehose of seed, but it isn't enough either. Yes, you're orgasming, but it isn't satisfying you. You need to cum more! Harder! Each successive blast of creamy spunk makes a bigger mess, yet there always seems to be more inside you waiting to come out. Looking more like a waterfall of sperm than a hero, you gurgle for more once more."
        );

        this.outx(
            "\n\nThe tentacle in your mouth pulls out, though not before you manage one last slurp. You're not even aware of how obscenely the sap has bloated your belly - your attention is far too firmly focused elsewhere. One thing you are aware of is the gasping, plaintive sound of your own voice, and you put it to work, gibbering for more."
        );

        this.outx("\n\nThe succubus laughs, cupping a hand under your fountaining length");
        if (this.player.cocks.length > 1) this.outx("s");
        this.outx(
            '. <i>"Oh, you\'ll have more soon enough: more pleasure... more sap... and more orgasms than you\'ll know what to do with. You\'re going to make fine fertilizer for my pets. Lethice will be pleased."</i> She laps at the alabaster treat and sighs. <i>"Pleased indeed. It is more rich than I thought."</i> She pauses as if considering something, then shakes her head. <i>"Perhaps I will use you later. For now, I think you are eager for my pets\' attentions. Why don\'t you get acquainted?"</i>'
        );
        // [Next]
        this.menu();
        this.addButton(0, "Next", this.maleLossFeederII);
    }

    private maleLossFeederII(): void {
        this.clearOutput();
        this.outx(
            "Trapped in a hellish loop of constant yet unsatisfied orgasm, you're pulled into the sea of tentacles. Your eyes have rolled back too far to see the grinning demoness or her confidently swaggering derriere, but if they could, they'd grow wide with worry once the twisting, dripping vines blocked her out. Hunger and thirst soon compete with pleasure for your attention. The swelling of your belly has already receeded, the fluid inside long side converted to ivory jets of release."
        );

        this.outx(
            "\n\nA stalk as thick as your leg rises up, its tip nearly divided by a gash big enough to swallow a man whole, and"
        );
        if (this.player.biggestCockLength() < 6) {
            this.outx(" swiftly engulfs your meager offering");
            if (this.player.cocks.length > 1) this.outx("s");
        } else if (this.player.biggestCockLength() < 12) {
            this.outx(" rapidly devours your plus-sized length");
            if (this.player.cocks.length > 1) this.outx("s");
        } else if (this.player.biggestCockLength() < 24) {
            this.outx(" devours your immense offering");
            if (this.player.cocks.length > 1) this.outx("s");
            this.outx(" with steady determination");
        } else {
            this.outx(" slowly encircles your cum-spouting length");
            if (this.player.cocks.length > 1) this.outx("s");
            this.outx(" with inhuman elasticity");
        }
        this.outx(
            ". The interior is covered with tiny, wiggling nubs that wiggle into action on contact with your trembling member"
        );
        if (this.player.cocks.length > 1) this.outx("s");
        this.outx(
            ". It's like every single nerve has its own skilled masseuse giving it a rubdown, coaxing more pleasure from every square inch of skin than you thought it capable of producing. You cry out, totally overwhelmed, only to be silenced by a familiar presense in your mouth."
        );

        this.outx(
            "\n\nThis new tentacle is already cumming, though. Using its own sappy spooge for lube, it slithers past your unresisting tonsils to provide its life-giving moisture directly. It can't quite compete with the huge, stalk-distending blobs of jism you're pouring out, at least not alone. A second tendril winds its way"
        );
        if (this.player.tailType != 0) this.outx(" past your tail to slither");
        this.outx(" between your cheeks.");
        if (this.player.ass.analLooseness == 0)
            this.outx(
                " The virginal tightness of your pucker holds the tentacle at bay at first. Still, it's no match for the combination of slippery plant fluid and constant pressure."
            );
        else if (this.player.ass.analLooseness <= 3)
            this.outx(
                " The tentacle has little problem slipping through your tight backdoor, slick as it is with fluid and backed by constant pressure."
            );
        else
            this.outx(
                " The tentacle has little difficulty squeezing into your well-loosened ass. Even without its constant, firm pressure and slippery fluid, it could enter with ease."
            );
        this.outx(
            " You gasp at the odd, room-temperature feel of an intruder squirming through your rearmost passage. It's entirely unexpected, but once its mass slithers across your prostate, squeezing even bigger blobs of cum from your rapt, attentive body, you forgive its intrusion."
        );

        this.outx(
            "\n\nTimed perfectly with the tentacle in your mouth, the one in your ass unleashes its own sappy payload. This, of course, only pushes your pleasure to new heights, all while providing you with what you need to keep churning out fresh,"
        );
        if (this.player.balls == 0) this.outx(" prostate");
        else this.outx(" ball");
        this.outx(
            "-draining spurts of plant-food. The cradling vines squirm over your touch-heightened skin, grinding the whole of your body. It's like your entire being is being fucked"
        );
        if (this.player.hasVagina())
            this.outx(
                ", and once a thick, cock-shaped plant slides inside your [vagina], you truly are"
            );
        this.outx(".");

        // Fuckable nipples
        if (this.player.hasFuckableNipples()) {
            this.outx(
                "\n\nThe vines rubbing against your [nipples] soon discover their leaking, capacitive secrets and burrow in. If your mouth wasn't completely stuffed, you'd scream your love for this wonderful creature to the heavens. Instead, you merely whimper and cum against, a tiny boobgasm riding atop an ocean of squirting need. Your chest is taken for a ride by tentacle after tentacles. Sometimes one will withdraw to allow another entrance. Sometimes two will fuck your tits at once, sliding against each other inside of you. But you are never left empty for more than a second, your nipples like toys for the insatiable abominations."
            );
        } else if (this.player.isLactating()) {
            this.outx(
                "\n\nA pair of suckers descend on your [nipples] once your milk lets down and set to tugging. Their insides are soft and squishy, kind of like little mouths, which serves to set you squirting even harder, feeding them heavy flows of lactic excitement. Unfortunately, your teats aren't effected by the tentacles' juices and eventually go dry. That doesn't stop them from trying to suckle though, and in time, your jugs become properly accustomed to their new duties."
            );
        }

        this.outx(
            "\n\nThoughts of escape float away on the tides of pleasure washing over you. Your other thoughts and worries aren't far behind either. The corruptive elements and ceaseless orgasms see to it that you don't bother trying to think or worry ever again. Luckily, the human brain is an adaptive thing, and parts that once handled things like math or reading restructure to handle the additional input from your nervous system. The longer you stay there, the better it feels."
        );

        this.outx("\n\nYou never want to leave. In fact, you never want again.");

        this.getGame().gameOver();
    }
}
