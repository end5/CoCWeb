import { trace } from "../../../../console";
import {
    TAIL_TYPE_COW,
    TAIL_TYPE_DEMONIC,
    TAIL_TYPE_KANGAROO,
    TAIL_TYPE_LIZARD,
    TAIL_TYPE_NONE,
    TAIL_TYPE_SHARK,
} from "../../../../includes/appearanceDefs";
import { BaseContent } from "../../../BaseContent";
import { CoC } from "../../../CoC";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { ItemType } from "../../../ItemType";
import { PerkLib } from "../../../PerkLib";
import { PregnancyStore } from "../../../PregnancyStore";
import { TimeAwareInterface } from "../../../TimeAwareInterface";
import { MinotaurMob } from "./MinotaurMob";

export class MinotaurMobScene extends BaseContent implements TimeAwareInterface {
    // Vars:
    // 325 Times met
    // 326 Number of sons grown
    // 327 Number of sons pending
    // 328 growup countdown

    public constructor() {
        super();
        CoC.timeAwareClassAdd(this);
    }

    // Implementation of TimeAwareInterface
    public timeChange(): boolean {
        // 326 Number of sons grown
        // 327 Number of sons pending
        // 328 growup countdown
        // If it gets glitched somehow
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00328] > 30)
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00328] = 30;
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00328] < 0)
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00328] = 0;
        // Countdown for son growing up
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00328] > 0) {
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00328]--;
            // Hit zero, move kid to grown up pile!
            if (
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00328] <= 0 &&
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00327] > 0
            ) {
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00327]--;
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326]++;
            }
        }
        // NEXT KID!
        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00327] > 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00328] == 0
        ) {
            trace("MINO KID GROWN");
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00328] = 30;
        }
        return false;
    }

    public timeChangeLarge(): boolean {
        return false;
    }
    // End of Interface Implementation

    public meetMinotaurSons(): void {
        this.outx("", true);
        this.spriteSelect(94);
        this.dynStats("lus", 10);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00325]++;
        // First Meeting
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00325] == 1) {
            // (Non-Addicted)
            if (!this.player.minotaurAddicted()) {
                this.outx(
                    `You explore the hilly, almost cliff-like high mountains, searching for the next fight, item, or discovery that will put you closer to your goal.  The hot sun beats down on your back like a baleful flame, seeming to cook you in your ${this.player.armorName} with every step you take.  You raise an arm to mop away the sweat that streams down your brow, but as you lower it, you're confronted with a most unwelcome sight.\n\n`,
                    false
                );

                this.outx(
                    "Three minotaurs have appeared from behind the rust-red rocks, arranged in a crude half-circle with you at the center.  Two of them are huge, powerfully-built bulls, stomping their hooved feet and snorting idly as they circle you.  Judging from the similar shapes and sizes of their muzzles and eyes, you'd guess they were brothers.  The last one, however, is everything his brothers aren't.  Where they have huge, hulking muscles, his are soft and barely visible.  He's comparatively tiny, only a little over five feet tall, and everything from his expression to his dainty steps reeks of shyness and femininity.  You find yourself wondering if he's even a real minotaur.\n\n",
                    false
                );

                this.outx(
                    `You ready your ${this.player.weaponName} and adopt a fighting pose, muscles already quivering from the intensity of the lust-inducing, mind-numbing musk of so many minotaurs packed so closely together.  They aren't the first aphrodisiac-exuding beast-men you've dealt with, and though you've `
                );
                if (this.player.cor < 33)
                    this.outx("enjoyed their affections more than you ought to");
                else if (this.player.cor < 66)
                    this.outx(
                        "indulged yourself in their glorious cum more than a few times",
                        false
                    );
                else
                    this.outx(
                        "never felt like turning down a fuck from one of these glorious cum-dispensing fuck-beasts",
                        false
                    );
                this.outx(
                    ", these brutes will find you no easy prey.  Trembling slightly from the adrenaline now coursing through your veins, you hold fast, but they merely stare at you, not even brandishing weapons.  Irritated, you bark out a challenge, hoping to goad them into making a foolish mistake.\n\n",
                    false
                );

                this.outx(
                    '"<i>Looks like Mom doesn\'t recognize us,</i>" says the biggest of the three, between deep, rumbling chuckles.\n\n',
                    false
                );

                this.outx(
                    'The next-largest sibling smirks and remarks, "<i>You would think she\'d at least know her children when she met them.  Maybe our dads smacked her around a little too hard?</i>"  After a moment to let his comment sink in, your jaw drops.\n\n',
                    false
                );

                this.outx("Now that you think about it, the fur patterns of ");
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] > 3) this.outx("some of ");
                this.outx(
                    "the minotaurs you've birthed match these minotaurs' coats perfectly – these bull-men must be your progeny, all grown up.  The small one haltingly asks, \"<i>S-since she looks brain dead... will you guys let me use her cunt this time?  I never get to have any pussy!</i>\"\n\n",
                    false
                );

                this.outx(
                    "You can't help but laugh with a mixture of maternal pride and rational worry.  What do your offspring have planned for you?  Judging by the three stiffening loincloths, they won't hold back much longer.  What will you do?",
                    false
                );
                // [Fight] [Submit] [Negotiate] [Run]
                this.simpleChoices(
                    "Fight",
                    this.fightOTaurs,
                    "Submit",
                    this.submitToMinotaurMob,
                    "Negotiate",
                    this.negotiate,
                    "",
                    undefined,
                    "Leave",
                    this.runFromMinotaurs
                );
            }
            // (Addicted)
            else {
                this.outx(
                    `You explore the hilly, almost cliff-like high mountains, searching for the next fight, item, or discovery that will put you closer to your goal.  The hot sun beats down on your back like a baleful flame, seeming to cook you in your ${this.player.armorName} with every step you take.  You raise an arm to mop away the sweat that streams down your brow, but as you lower it, you're confronted with a most unwelcome sight.\n\n`,
                    false
                );

                this.outx(
                    "Three minotaurs have appeared from behind the rust-red rocks, arranged in a crude half-circle with you at the center.  Two of them are huge, powerfully-built bulls, stomping their hooved feet and snorting idly as they circle you.  Judging from the similar shapes and sizes of their muzzles and eyes, you'd guess they were brothers.  The last one, however, is everything his brothers aren't.  Where they have huge, hulking muscles, his are soft and barely visible.  He's comparatively tiny, only a little over five feet tall, and everything from his expression to his dainty steps reeks of shyness and femininity.  You find yourself wondering if he's even a real minotaur.\n\n",
                    false
                );

                this.outx(
                    `You start to ready your ${this.player.weaponName} and adopt a fighting pose, wobbling dangerously close to one of the virile, drug-producing specimens before you.  They aren't the first aphrodisiac-exuding beast men you've dealt with, not by a long shot, but part of you just can't wait to see how these ones will taste. Trembling slightly from the overwhelming, addiction-induced need coursing through your veins, you try to restrain yourself and fight the good fight. They simply stare at you, not even bothering to brandish weapons.  Gods, they smell so good!  Why haven't they tried to rape you yet!?  You absentmindedly tease one of your nipples while you wait for the naturally dominant bull-men to make their move.\n\n`,
                    false
                );

                this.outx(
                    '"<i>Looks like Mom doesn\'t recognize us,</i>" says the biggest of the three in between deep, rumbling chuckles.\n\n',
                    false
                );

                this.outx(
                    "The next largest sibling smirks and remarks, \"<i>You would think she'd at least know her children when she met them.  Maybe she's craving cum too much to remember how to talk?  Is that what it is?  Is Mommy a cum-craving whore?</i>\"\n\n",
                    false
                );

                this.outx(
                    "You gape, the desire to satiate your cravings replaced momentarily by the raw shock of the realization.\n\n",
                    false
                );

                this.outx(
                    "Now that you look at think about it, however, the fur patterns of these minotaurs <b>do</b> match ",
                    false
                );
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] > 3) this.outx("some of ");
                this.outx(
                    "those of your offspring perfectly... these minotaurs must be your progeny, all grown up.  The small one asks, \"<i>S-since she's already so cum-crazy, can I use her cunt this time?  She's probably all worn out from birthing us, so I bet it's her worst hole.  You guys don't mind, right?</i>\"\n\n",
                    false
                );

                this.outx(
                    "Judging by the three stiffening loincloths and subsequent moistening of bulges, you'll have a very hard time turning down their offer.  ",
                    false
                );
                if (this.player.cor < 33)
                    this.outx(
                        "You wouldn't fuck your own offspring just for another hit of cum... would you?",
                        false
                    );
                else if (this.player.cor < 66)
                    this.outx(
                        "You're not sure how to feel about this morally, but you can't keep from licking your lips, fantasizing about the fix these wonderful kids of yours are so willing to give you.",
                        false
                    );
                else
                    this.outx(
                        "Who cares if they're your offspring?  They're all grown up and they smell so... appetizing.",
                        false
                    );
                // [Fight] [Submit] [Run]
                this.simpleChoices(
                    "Fight",
                    this.fightOTaurs,
                    "Submit",
                    this.submitToMinotaurMob,
                    "Negotiate",
                    this.negotiate,
                    "",
                    undefined,
                    "Leave",
                    this.runFromMinotaurs
                );
            }
        }
        // Repeat meetings
        else {
            // Non tribe size
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] < 20) {
                // [Non Addicted Repeat]
                if (!this.player.minotaurAddicted()) {
                    this.outx(
                        `It doesn't take long for your exploration into the mountains to bring you face-to-face with your minotaur offspring once again.  There're ${MinotaurMobScene.num2Text(
                            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326]
                        )} of them here, arranged around you in a loose semicircle.  You can smell their familiar and arousing odor in the air; while it brings a tingle to your nethers, you're determined to resist it.  `
                    );
                    if (this.player.wetness() <= 2)
                        this.outx(
                            `A trickle of wetness runs down your ${this.player.leg()} almost immediately.`
                        );
                    else if (this.player.wetness() <= 4)
                        this.outx(
                            `A steady flow of your juices soaks your ${this.player.legs()} almost immediately, just from the scent invading your nostrils.`
                        );
                    else
                        this.outx(
                            `A flood of wetness soaks your ${
                                this.player.armorName
                            } and ${this.player.legs()} with feminine drool almost immediately as your body reflects the obscene lust coursing through your veins.`
                        );
                    this.outx("\n\n", false);
                    this.outx(
                        'This could be a bit difficult.\n\nThe largest folds his arms across his broad, well-defined chest and smirks before grunting, "<i>',
                        false
                    );
                    if (
                        this.player.pregnancyIncubation > 0 &&
                        this.player.pregnancyIncubation <= 216 &&
                        this.player.pregnancyType == PregnancyStore.PREGNANCY_MINOTAUR
                    )
                        this.outx(
                            "Pregnant with another brother for us, and already you come back for more?",
                            false
                        );
                    else if (
                        this.player.pregnancyIncubation > 0 &&
                        this.player.pregnancyIncubation <= 216
                    )
                        this.outx(
                            "Huh... Looks like Mommy couldn't keep her legs closed, and she got knocked up by some vermin.  You're such a disappointment to your beloved family.  Don't worry, though, mom, we'll still fuck you.",
                            false
                        );
                    else
                        this.outx(
                            "Hey mom, come back so we could all have another whack at you?  We could use another brother.",
                            false
                        );
                    this.outx('</i>"\n\n', false);

                    this.outx(
                        "\"<i>Nah, she's just back to finish getting addicted, aren't you mother-dear?  You came back to visit your sons and guzzle our cum until you're scooping the dregs of it from your ",
                        false
                    );
                    if (
                        this.player.pregnancyIncubation == 0 ||
                        this.player.pregnancyIncubation > 216
                    )
                        this.outx("soon-to-be ");
                    this.outx('knocked up puss,</i>" taunts another minotaur.\n\n', false);

                    this.outx(
                        "The runt of the litter lurks in the back, stroking himself while whining and plaintively muttering for his turn.  It would be pathetic if you couldn't smell the pre-cum he's dripping from all the way over here.\n\n",
                        false
                    );

                    this.outx("What do you do?");
                }
                // [Addicted Repeat]
                else {
                    this.outx(
                        `It doesn't take too long for your exploration into the mountains to bring you face-to-face with your minotaur offspring once again.  There're ${MinotaurMobScene.num2Text(
                            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326]
                        )} of them here, arranged around you in a loose semicircle.  You can smell their familiar, arousing odor drifting around you, and though you want to be strong, there's nothing you want more than to bury your face beneath those loincloths and start slurping your reward for having such wonderful children.  `
                    );
                    if (this.player.wetness() <= 2)
                        this.outx(
                            `A trickle of wetness runs down your ${this.player.leg()} almost immediately.`
                        );
                    else if (this.player.wetness() <= 4)
                        this.outx(
                            `A steady flow of your juices soaks your ${this.player.legs()} almost immediately, just from the scent invading your nostrils.`
                        );
                    else
                        this.outx(
                            `A flood of wetness soaks your ${
                                this.player.armorName
                            } and ${this.player.legs()} with feminine drool almost immediately as your body reflects the obscene lust coursing through your veins.`
                        );
                    this.outx(
                        "  You absentmindedly tweak your nipple and lick your lips in anticipation.\n\n",
                        false
                    );

                    this.outx(
                        'The largest folds his arms across his broad, well-defined chest and smirks before grunting, "<i>',
                        false
                    );
                    if (
                        this.player.pregnancyIncubation > 0 &&
                        this.player.pregnancyIncubation <= 216 &&
                        this.player.pregnancyType == PregnancyStore.PREGNANCY_MINOTAUR
                    )
                        this.outx(
                            "Pregnant with another brother for us, and you're already back for another fix?  Why even leave in the first place?",
                            false
                        );
                    else if (
                        this.player.pregnancyIncubation > 0 &&
                        this.player.pregnancyIncubation <= 216
                    )
                        this.outx(
                            "Huh... you couldn't keep your legs closed, eh, mom?  Looks like you're all knocked up with vermin, too!  You're a disappointment to our family... don't worry, though, we'll still give you a fix.",
                            false
                        );
                    else
                        this.outx(
                            "Hey, mom!  You come back so we could have another go at knocking you up?  Heh.  Knowing you, you're probably just here for another cum fix.",
                            false
                        );
                    this.outx('</i>"\n\n', false);

                    this.outx(
                        '"<i>Dear brother, how could you say such slanderous things about our mother?  She\'s a beautiful and wondrous cum-dump – a veritable saint of semen-swallowing,</i>" taunts the next-largest minotaur.  "<i>The only question we should be asking is if she\'s going to put her rump in the air like a good bitch, or make us work for it.</i>"\n\n',
                        false
                    );

                    this.outx(
                        "The runt of the litter, the 'minitaur', lurks in the back of the group, stroking himself and protesting timidly about how it was 'his turn'.  He leans around his two giant brothers and whines, \"<i>Mom, can I use your pussy?  I'm sooo pent-up and my ass is still sore from big bro!</i>\"\n\n",
                        false
                    );

                    if (this.player.minotaurNeed()) {
                        this.outx(
                            "Your mind is already fogging under the intense need of your addiction, and you do the only thing a junkie like you can do in this situation – drop down on all fours and get ready to be used.",
                            false
                        );
                        // Same as 'submit'
                        this.doNext(this.submitToMinotaurMob);
                        return;
                    }
                    this.outx(
                        "Your mind is fogging from the scent in the air, but thankfully, you aren't in withdrawal right now.  You can try to resist and maybe even turn the tables on your brood, or you can run.",
                        false
                    );
                }
                // [Fight] [Submit] [Run]
                this.simpleChoices(
                    "Fight",
                    this.fightOTaurs,
                    "Submit",
                    this.submitToMinotaurMob,
                    "",
                    undefined,
                    "",
                    undefined,
                    "Run",
                    this.runFromMinotaurs
                );
            }
            // Tribe sized
            else {
                // [Repeat Tribe-Size Non-Addict]
                if (!this.player.minotaurAddicted()) {
                    this.outx(
                        "While exploring, you once again manage to stumble into your sons' territory.  You can practically see the musk, hanging so heavily in the air that it could be cut with a blade.  Somewhere in the distance, grunts and moos of pleasure ring out, echoing off the rocky cliff-sides.  Clearly one of your boys has found a willing female to expand the tribe with, and they seem to be procreating with rabid enthusiasm, from the sounds you're hearing.  You find yourself starting to envision big, strong hands, squeezing your hips and guiding you onto a fat shaft to be mounted and bred.\n\n",
                        false
                    );

                    this.outx(
                        "A bemused snort rouses you from the day-dream, and you're now face-to-face with the largest of your sons once again.  He sneers and grunts, \"<i>Hey Mom... ",
                        false
                    );
                    if (
                        this.player.pregnancyIncubation == 0 ||
                        this.player.pregnancyIncubation > 216
                    )
                        this.outx("Come back to add to the tribe?");
                    else if (this.player.pregnancyType == PregnancyStore.PREGNANCY_MINOTAUR)
                        this.outx("Come back to show off the lil' bro yer growin'?");
                    else
                        this.outx(
                            "Come back to see some real studs after letting a weakling knock you up?",
                            false
                        );
                    this.outx(
                        "</i>\"  Your cheeks color from the lewd suggestions, his words bringing up the pleasurable memories of the numerous, cunt-filling minotaur-breedings you've been subjected to.\n\n",
                        false
                    );

                    this.outx(
                        `"<i>You meathead, mom's not here for that.  She's probably here to get packed with jizz and cum until she feels like her brains are gonna ooze out her ears,</i>" taunts a second familiar voice. "<i>Mom knows how good sex with a minotaur really is, and we'll spit-roast her, won't we boys?</i>"  It's the second largest of your sons, and he isn't alone – there's a whole tribe of minotaurs here. You count at least ${MinotaurMobScene.num2Text(
                            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326]
                        )}, arranged around you in an impenetrable circle of muscle and fur. There's no way you'll escape, not without creating a gap first.\n\n`,
                        false
                    );

                    this.outx("Gods, you're getting wet.  ");
                    if (this.player.wetness() >= 5)
                        this.outx(
                            `You can feel your juices running unimpeded from under your ${this.player.armorName}; a veritable flood of need, fed by your body's primal response to the pheromones in the air.`
                        );
                    else if (this.player.wetness() >= 3)
                        this.outx(
                            `You can feel your juices dribbling out from under your ${this.player.armorName}, fed by your body's primal response to the pheromones in the air.`
                        );
                    else
                        this.outx(
                            `You can feel your ${this.player.armorName} clinging to your sopping nethers, the liquid need only growing from the pheromones in the air.`
                        );
                    this.outx(
                        "  Many of the loincloths are wet, practically dripping with the minotaurs' copious pre-cum.  You can see the curves and swells of their huge, bloated balls - it looks like some of these poor guys have saved up quite a big load for you.  A fantasy of losing yourself in a sea of minotaur spooge crosses your mind...\n\n",
                        false
                    );

                    this.outx("No! ");
                    if (this.player.cor < 33)
                        this.outx(
                            "You can't think that way! Sure, you've birthed minotaurs enough to create this huge tribe of horny monsters, but you're a champion!",
                            false
                        );
                    else if (this.player.cor < 66)
                        this.outx(
                            "You shouldn't think that way! Sure, you've had enough minotaurs inside you to spawn this tribe of muscular beast-men, but you've got a mission to focus on.",
                            false
                        );
                    else
                        this.outx(
                            "You shouldn't think that way! There's a whole bevy of other creatures out there waiting to be fucked over, and if your boys want a piece of you, they're the ones who should be kneeling down and getting ready to be fucked!",
                            false
                        );
                    this.outx("  What do you do?");
                }
                // [Repeat Tribe-Size Addict]
                else {
                    this.outx(
                        "While exploring, you once again manage to stumble into your sons' territory.  You can practically see the musk, hanging so heavily in the air that it could be cut with a blade.  Somewhere in the distance, grunts and moos of pleasure are ringing out, echoing off the rocky cliff-sides.  Clearly one of your boys has found a willing female to expand the tribe with, and they seem to be procreating with rabid enthusiasm from the sounds you're hearing.  You find yourself starting to imagine the scene, envisioning the big, strong hands squeezing your hips and guiding you onto a fat shaft to be mounted.  Shivering a little in anticipation, you wonder just how you'll get your next dose of cum.\n\n",
                        false
                    );
                    this.outx(
                        'A bemused snort rouses you from the daydream, and you come face to face with the largest of your sons once again.  He smirks and grunts, "<i>Hey Mom.  ',
                        false
                    );
                    if (
                        this.player.pregnancyIncubation == 0 ||
                        this.player.pregnancyIncubation > 216
                    )
                        this.outx(
                            "Come for a baby? Or do you just want to be spunk-stuffed?",
                            false
                        );
                    else if (this.player.pregnancyType == PregnancyStore.PREGNANCY_MINOTAUR)
                        this.outx(
                            "Come back for some more spunk? I bet your next son comes out as a spooge-slurping minitaur.  We could use another cock-sleeve around here.",
                            false
                        );
                    else
                        this.outx(
                            "Come back to see some real studs after letting a weakling knock you up?  Don't fret, we'll make you forget all about it.",
                            false
                        );
                    this.outx(
                        '</i>"  Your cheeks color from the lewd suggestions, his words bringing up the pleasurable memories of drug-fueled sexual orgies with beasts just like these.\n\n',
                        false
                    );

                    this.outx(
                        `"<i>You meathead, quit wasting mom's time.  She'd rather be fucking than listening to you prattle on,</i>" a second, familiar voice taunts.  "<i>Now come on, she's got plenty of holes needing filled.  Look at her eyes – we'll need to pack her full if we're going to satisfy her.</i>"  It's the second largest of your sons, and he isn't alone – there's a whole tribe of minotaurs here.  You count at least ${MinotaurMobScene.num2Text(
                            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326]
                        )}, arranged around you in an impenetrable circle of muscle and fur. There's no way you'll escape, not without creating a gap first.\n\n`,
                        false
                    );

                    this.outx("Gods, you're getting wet.  ");
                    if (this.player.wetness() >= 5)
                        this.outx(
                            `You can feel your juices running unimpeded from under your ${this.player.armorName}; a veritable flood of need, fed by your body's primal response to the pheromones in the air.`
                        );
                    else if (this.player.wetness() >= 3)
                        this.outx(
                            `You can feel your juices dribbling out from under your ${this.player.armorName}, fed by your body's primal response to the pheromones in the air.`
                        );
                    else
                        this.outx(
                            `You can feel your ${this.player.armorName} clinging to your sopping nethers, the liquid need only growing from the pheromones in the air.`
                        );
                    this.outx(
                        "Many of the loincloths are likewise stained, practically dripping with the minotaur's copious pre-loads.  You can see the curve and swell of their huge, bloated balls.  It looks like some of these poor guys have saved up quite a big load for you.  You fantazise about being afloat in an ocean of minotaur spooge...Yes!  ",
                        false
                    );
                    if (this.player.minotaurNeed()) {
                        this.outx(
                            "This is perfect... you need it so bad!  You drop down on all fours and wiggle your child-bearing hips, hoping they'll hurry and cum inside you.",
                            false
                        );
                        // SUBMIT!
                        this.doNext(this.submitToMinotaurMob);
                        return;
                    }
                    this.outx(
                        "This is glorious – so many horny, willing boys, all here for you to squeeze dry.  Even if you wanted to leave, you'd have to fight them to make an opening.  It'd be better to just beat them into submission and take your time savoring their wondrous spunk.",
                        false
                    );
                }
                // [Fight] [Submit]
                this.simpleChoices(
                    "Fight",
                    this.fightOTaurs,
                    "Submit",
                    this.submitToMinotaurMob,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined
                );
            }
        }
    }

    // [Negotiate] (fucking Morton's fork, just add this to the end of the non-addict intro ~ but thou must!)
    private negotiate(): void {
        this.outx("", true);
        this.spriteSelect(94);
        this.outx(
            "You calm down and warn them that you're no pushover, and you will defend yourself if necessary.  Your outburst shocks them, and they even seem a bit worried by your confidence and poise.\n\n",
            false
        );

        this.outx(
            "The second largest smirks and retorts, \"<i>Chill out, Mom... it'll be fine.  I know what your problem is.  You just haven't had enough cum yet... trust me, you'll love it!  Once we've each blown a few loads in your holes, you won't be able to get enough!  Promise!!</i>\"\n\n",
            false
        );

        this.outx(
            '"<i>Heh.  You ready to fuck and suck until you give me another bitch-boy brother to fuck when you aren\'t around?</i>" asks the burliest brother.\n\n',
            false
        );

        this.outx(
            "The meek, quiet 'minitaur' speaks last. \"<i>P-Please mom?  I've never cum in a real pussy before...</i>\"\n\n",
            false
        );

        this.outx("Looks like they're only interested in one thing.");
        // [Fight] [Submit] [Run]
        this.simpleChoices(
            "Fight",
            this.fightOTaurs,
            "Submit",
            this.submitToMinotaurMob,
            "",
            undefined,
            "",
            undefined,
            "Run",
            this.runFromMinotaurs
        );
    }

    // [Run]
    private runFromMinotaurs(): void {
        this.outx("", true);
        this.spriteSelect(94);
        this.outx("You turn tail and try to run, ");
        if (this.player.canFly()) this.outx("leaping from the small cliffs to take flight");
        else this.outx("fleeing down the mountainside");
        this.outx(".  ");
        // ESCAPE!
        if (
            (this.player.canFly() && this.player.spe > MinotaurMobScene.rand(40)) ||
            (!this.player.canFly() && this.player.spe > MinotaurMobScene.rand(60))
        ) {
            this.outx(
                `A furry arm nearly catches your ${this.player.leg()}, but you slip free and quickly escape your lusty brood.`
            );
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        // FAIL:
        else {
            this.outx(
                `A furry arm catches hold of your ${this.player.leg()} and yanks on it hard enough to slam you into the cliff face.  Disoriented and bleeding, you wobble free, dazed.  It's a fight!`
            );
            // go to combat
            this.fightOTaurs();
        }
    }
    // [Fight]
    private fightOTaurs(): void {
        this.startCombat(new MinotaurMob());
        this.spriteSelect(94);
        this.playerMenu();
    }

    // [Submit]
    private submitToMinotaurMob(): void {
        this.player.lust = 100;
        this.dynStats("lus", 1);
        this.minotaurDeFeet();
        this.spriteSelect(94);
    }

    public minotaurDeFeet(): void {
        this.outx("", true);
        if (!this.player.hasVagina()) {
            this.outx(
                'As you slump down in defeat, your horny beast-children take note of your missing femininity.  They growl in displeasure and depart, but not before kicking you unconsciousness.  "<i>Bitch.</i>"'
            );
            this.cleanupAfterCombat();
            return;
        }
        // (HP)
        if (this.player.HP < 1)
            this.outx(
                `You've been completely defeated.  Bruised and battered, your overtaxed body is barely able to move, and you slump down on the ground.  The minotaurs stomp closer, smiling in anticipation of what's to come.  Mouth agape, you stare while they discard their tiny, pre-cum soaked loincloths and reveal the massive, distinctive cocks that make their breed so famous.  One of the rags lands squarely on your face, by chance or cruel intent, and you gasp in surprise.  Like a lightning bolt shooting down your spine, arousal slams into you with thunderous force, rocking you back as you shake the sticky cloth from your face.  All thoughts of resistance are completely washed away by the tide of your aching need, and you spread your ${this.player.legs()} to make yourself an easier target.   Lent strength by the arousal coursing through your veins, you tear off your ${
                    this.player.armorName
                } and wait anxiously for whatever the beast-men have planned.\n\n`,
                false
            );
        // (Lust)
        else {
            this.outx(
                `You're too turned on to fight, too aroused to think, and trembling too much to stand upright.  Slumping in the dirt, you pull away your ${this.player.armorName} and toss it aside; it would just get in the way.  Ass in the air, you wiggle it back and forth enticingly as your need `
            );
            if (this.player.wetness() <= 2) this.outx("begins to drip from your ");
            else if (this.player.wetness() <= 4) this.outx("leaks from your ");
            else this.outx("rolls out in a wave from your ");
            this.outx(`${this.vaginaDescript(0)}.`);
            if (this.player.hasCock())
                this.outx(
                    `  ${this.SMultiCockDesc()} hardens and dangles above the ground, leaking in sympathy with your hungry quim.  Of course it will likely be ignored - rutting minotaurs have little use for someone else's dick.`
                );
            this.outx(
                "The beast-men remove their terribly-tended loincloths and discard them, though one smears his over your face before he tosses it aside, the musky aroma sending your body into overdrive.\n\n",
                false
            );
        }
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] >= 25 && this.player.minotaurNeed())
            this.minotaurGangBadEnd();
        else if (this.player.pregnancyIncubation > 0 && this.player.pregnancyIncubation <= 216) {
            if (this.player.pregnancyIncubation > 120) this.analSpearSemiPregMinotaurGangbang();
            else this.loseToMinoMobVeryPregnant();
        } else this.nonAddictMinotaurGangBang();
    }

    // [Loss – Non-Addict Gangbang]
    private nonAddictMinotaurGangBang(): void {
        this.spriteSelect(94);
        this.outx(
            "The minotaurs step closer, their hooves kicking up small clouds of dust as they approach your prone body.  You lift your head, nose twitching, and breathe their scent deeply while casting a coy look at the closest of the mob.  He smiles and squeezes his fingers around your jaw, pulling your mouth into a pouty 'o'.  His other hand holds the heavy mass of his stiff maleness - a turgid, flared shaft over two feet long with three prominent ridges along its length.  You shiver and lick your lips unconsciously, tasting the sweet smell of his pre in the air as it inches closer.\n\n",
            false
        );

        if (this.player.isTaur()) {
            this.outx(
                "A sudden, forceful push rolls your equine body onto its flank, and a larger member is pressed against your clutching ",
                false
            );
            if (this.player.tailType == TAIL_TYPE_NONE) this.outx("asshole");
            else this.outx("tailhole");
            this.outx(".  ");
        } else if (this.player.isNaga())
            this.outx(
                `A sudden, forceful yank stretches out your tail, and a larger member presses between your ${this.buttDescript()} to prod at your clutching asshole.  `
            );
        else if (this.player.isGoo()) {
            this.outx(
                "A sudden, forceful push rolls you to your side, and you feel shaggy fur rubbing through your gooey folds while a larger member is pressed against your clutching ",
                false
            );
            if (this.player.tailType == TAIL_TYPE_NONE) this.outx("asshole");
            else this.outx("tailhole");
            this.outx(".  ");
        } else {
            this.outx(
                "A sudden, powerful yank lifts one of your legs high into the air, and you feel a larger member pressing against your clutching ",
                false
            );
            if (this.player.tailType == TAIL_TYPE_NONE) this.outx("asshole");
            else this.outx("tailhole");
            this.outx(".  ");
        }
        this.outx(
            "The cruel, flared tip of the horse-like cock batters at the unyielding entrance for a moment, slowly stretching your rectal orifice wider and wider with each painful push.  Gasping in pain, you cry out in anguish before transitioning into a low moan.  The dripping member before you plunges into your open orifice, pre-cum lubricating its passage as the flare is pushed to the back of your throat.  Ordinarily your body might try to reject such an intrusion, but all you feel is a numb sort of acceptance as you relax your throat to let the pre-cum roll into your belly.",
            false
        );
        this.outx("\n\n", false);

        this.outx(
            `The pressure on your ${this.assholeDescript()} suddenly subsides, not because the minotaur is pulling back, but because part of the flare suddenly slipped through the ring of your tightly-stretched hole.  You swoon and try to relax, fighting with your sphincter's natural reaction to squeeze shut against the intruder.  A pleased rumble echoes behind you, and the minotaur penetrating your ${this.assholeDescript()} pushes hard.  His flare slips inside with an audible, gut-stretching 'pop'.  `
        );
        this.player.buttChange(60, true, true, false);
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] >= 10)
            this.outx(
                "The assembled beasts snicker at the noise, stroking themselves slowly while awaiting a chance at your hungry holes.",
                false
            );
        else
            this.outx(
                "The minitaur giggles at the noise, stroking himself and mewling while he waits permission to join.",
                false
            );
        this.outx(
            "  You can do naught but gurgle as the dual minotaur dicks each push deeper and completely, utterly spit-roasting you on their incestuous hardnesses.\n\n",
            false
        );

        this.outx(
            `Inch by inch, the double dicks penetrate further, bulging your neck and gut around the growing flares.  You can actually feel their leaky, drug-like pre-cum burbling out to fill your belly and slip into your intestines.  It gives you a nice, pain-numbing high that makes it easy to handle the plus-sized members currently lifting you from the ground. Their hands move to grab at your midriff, helping to steady your aerial form between them.  As you're leveled at waist height, the last few inches of the throbbing, drug-leaking cocks push inside your holes.  Their two sweaty ballsacks clap against your ${this.buttDescript()} and chin simultaneously.\n\n`,
            false
        );

        this.outx(
            "Your bovine masters begin to saw their throbbing members back and forth with long, orifice-scraping strokes.  It should be painful, but it only stirs the coals of your aphrodisiac-fueled fire. Your pussy ",
            false
        );
        if (this.player.wetness() >= 5)
            this.outx(
                "gushes everywhere with each thrust, puddling your lubricants on the ground",
                false
            );
        else if (this.player.wetness() >= 3)
            this.outx(
                "drools a thick stream of lubricants to puddle on the ground with each thrust.",
                false
            );
        else
            this.outx(
                "drips lubricant with every thrust, leaving tiny blotches of wetness on the ground.",
                false
            );
        this.outx(
            "  Bouncing between them like a child's ball, your body is battered, abused, and used for nothing more than a few minute's pleasure.  Every time the throat-obstructing mass pulls from your mouth you take another deep breath, staying conscious, but becoming more aroused by the omnipresent stench of the horny beasts.\n\n",
            false
        );

        this.outx("The minotaur occupying your mouth grabs hold of your ");
        if (this.player.horns > 0) this.outx("horns ");
        else this.outx("head ");
        this.outx(
            "and roughly buries his cock in your mouth, all the way to the hilt.  His pre-cum stops, and the balls on your chin begin to bounce as the beast's animalistic, three-ribbed member starts to widen inside you.  Your jaw stretches slightly, and you feel a huge wad of cum distend the urethra along the bottom of his shaft.  Working towards your belly, the mass bursts from his tip explosively, making your gut gurgle audibly as it receives its first injection of minotaur spunk.\n\n",
            false
        );

        this.outx(
            "Expanding in the moment of penultimate pleasure, the minotaur's tip flares wide, effectively sealing your esophagus shut.  The furry sack bobs on your chin, the heavy balls inside slowly shrinking as they empty their lust-inducing, thought-removing cargo into your deepest recesses",
            false
        );
        if (this.player.cor >= 66) this.outx(".  You couldn't be happier about it");
        this.outx(
            ".   The bulges of cum squeezing past your thrashing, excited tongue slowly grow smaller and smaller as the spoogey goodness is inexorably emptied from the poor, pumped-up testes on your chin.  They give a tiny shudder and stop, and the minotaur pulls back at last, slowly softening to ease his passage from your abused throat hole.\n\n",
            false
        );

        this.outx(
            `Once free, the beast wipes the mess from the tip of his fat cock on your lips. He pushes you back towards the one violating your ${this.assholeDescript()}, allowing him to support you.  You groan at the rough treatment while licking at the delicious glaze on your lips.  The potent sperm in your throat and stomach have already shut down any thoughts more complex than 'find cum' and 'fuck'.  The minitaur approaches hesitantly, placing his pre-cum-slicked hardness in your hand to stroke while he whimpers, "<i>Please big bro, can I fuck her cunt?</i>"\n\n`,
            false
        );

        this.outx(
            '"<i>Not today, runt.</i>" snorts the minotaur behind you.  He lifts you up in his sweat-slicked arms and spins you about, placing your so-far-unspoiled womanhood atop his flaring, ready-to-explode cock-tip.  He smirks and presses your face into ',
            false
        );
        if (this.player.tallness <= 70) this.outx("his chest");
        else this.outx("his shoulder");
        this.outx(
            " as he laughs, \"<i>You can have Mom's backdoor.  I went ahead and opened it for you.</i>\"  A crestfallen look spreads over the minitaur's face, but it doesn't stop him for walking up behind you to line his smaller shaft up with your gaping, sloppy asshole.\n\n",
            false
        );

        this.outx(
            "The rock-solid mass of muscle holding you aloft softens, and your body weight drags you down.  Your juicy twat and abused anus throb, impaled on your own offspring's penises.  ",
            false
        );
        this.player.cuntChange(60, true, false, true);
        this.outx(
            "They part your flesh with ease, sheathing themselves deeply in your body and rubbing against each other through the narrow divide inside you.  Your asshole tingles, actually finding more pleasure from the act than your suddenly-stretched vagina thanks to the more comfortable pole residing in its depths.  They go deeper and deeper, until the stud supporting you is pushing on your distended cervix while his sheath bunches up against your outer lips.\n\n",
            false
        );

        this.outx('"<i>Fuck, Mom, your pussy is great!  ', false);
        if (this.player.pregnancyIncubation == 0 || this.player.pregnancyIncubation > 216)
            this.outx("I hope you don't mind me making another brother.");
        else if (this.player.pregnancyType == PregnancyStore.PREGNANCY_MINOTAUR)
            this.outx("I hope you don't mind me saying hi to my little brother.");
        else
            this.outx(
                "I hope you come back after you pop out this vermin so we can give you a real baby!",
                false
            );
        this.outx(
            `I can feel it coming, are you ready, Ma?</i>" asks the beast-man.  You nod enthusiastically, rocking back and forth while the minitaur clutches your ${this.buttDescript()} and fucks your stationary form.\n\n`,
            false
        );

        this.outx(
            "A huge, bloated mass stretches past your pussy lips, forcing out a squirt of girlcum and feminine lube.  ",
            false
        );
        this.player.cuntChange(60, true, false, true);
        this.outx(
            "The head flares wide as it squirts into your womb; warmth blooms from the uterine cum-deposit, turning your muscles slack, and setting off an orgasm of your own.  Your pussy ripples and squeezes at the invader, matched in its orgasmic contractions by your cock-stuffed asshole.  The minitaur behind you whines and hilts himself as hard as his relatively lithe body will allow, slapping his balls into his brother's slowly emptying cum-sacks.",
            false
        );
        if (this.player.hasCock()) {
            this.outx(
                `  ${this.SMultiCockDesc()} explodes against the minotaur's belly, weakly spurting `
            );
            if (this.player.cumQ() < 25) this.outx("a few spots of cum into his sweat-matted fur.");
            else if (this.player.cumQ() < 50) this.outx("a steady trickle of cum into his fur.");
            else if (this.player.cumQ() < 100)
                this.outx("a steady stream of cum into his matted fur.");
            else
                this.outx(
                    "a constant flow of cum that utterly soaks the minotaur's fur and balls with your wasted, inferior seed.",
                    false
                );
        }
        this.outx("\n\n", false);

        this.outx(
            "Completely impaled, drugged out of your mind, and being packed with ever-higher levels of narcotics, you lose your mind mid-orgasm. As little more than an instinctual fuck-beast, you moan lewdly and lick the sweat from your son's hairy body, cooing in pleasure at the feel of your two studs flooding your womb and rectum with gooey love.  The heaving balls below you shake and squirm, visibly shrinking with each lurching, hole-stretching pump. Your body trembles from the orgasmic assault, the white-hot pleasure of your orgasm seeming to burn out your capacity for thought until nothing is left in its wake but satisfaction.\n\n",
            false
        );

        this.outx(
            "Distracted by the high, you barely realize the shaft has been pulled from your pulverized pussy.  You're dropped to the dirt, and the still-cumming minitaur is pulled down by his flared rod to fall heavily atop you.  He kisses and licks you while he cums, gently bathing you in affection while he sates himself with your body.  For such a bestial, corrupt creature, he's truly a gentle lover.\n\n",
            false
        );

        this.outx(
            "The minitaur stays inside you, reaching to rub your puffy, red nether-lips as he goes soft in your depths.  The hesitation gives his cum time to absorb through the lining of your intestine.  Once he pulls out, the world is spinning around you, but you try to crawl to ",
            false
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] <= 3)
            this.outx(
                " the minotaur that gave you your first dose.  Maybe he's ready to give you more? He smirks and slaps you across the face with his soft shaft.  You giggle drunkenly and start to lick his balls - they HAVE to have more for you!  ",
                false
            );
        else {
            this.outx(
                " a minotaur that hasn't had his chance to take you yet.  The beast laughs and smiles, pulling you to your knees.  ",
                false
            );
            // (1-2 more end paragraph)
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] <= 5)
                this.outx(
                    "You open your mouth wide, licking your lips until they're shiny and inviting enough for the stud to fuck.  He does not disappoint.  The fat head pushes past your puckered cock-suckers and slides into your throat, the passage eased by the leavings of the one before him.  You sigh happily and begin to suck his cock like a lollipop, though all you want is his creamy center.  The others crowd around, touching themselves and waiting for another turn.  ",
                    false
                );
            else
                this.outx(
                    "You open your mouth wide, licking your lips until they're shiny and inviting enough for the stud to fuck.  He does not disappoint.  The fat head pushes past your puckered cock-suckers and slides into your throat, the passage eased by the leavings of the one before him.  You sigh happily and begin to suck his cock like a lollipop, though all you want is his creamy center.  Two more swollen fuck-sticks find their way to your waiting holes, and you giggle in dizzy bliss when you're packed full of your sons spunk once again.  ",
                    false
                );
        }
        this.outx(
            "You black out at that point, but when you wake up soaked in cum with a bottle of it next to you, you know it was a good night.",
            false
        );
        // Force cum bottle loot!
        this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = this.consumables.MINOCUM.id;
        // Preggers chance!
        this.player.knockUp(
            PregnancyStore.PREGNANCY_MINOTAUR,
            PregnancyStore.INCUBATION_MINOTAUR,
            75
        );
        this.player.orgasm();
        this.dynStats("spe", -0.5, "int", -0.5, "lib", 0.5, "sen", -0.5, "cor", 1);
        this.player.slimeFeed();
        this.player.minoCumAddiction(20);
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else {
            this.outx("\n\n", false);
            this.inventory.takeItem(
                ItemType.lookupItem(this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID]),
                this.camp.returnToCampUseEightHours
            );
        }
    }

    // *[Loss - Very Pregnant, Lots of BJs]
    private loseToMinoMobVeryPregnant(): void {
        this.spriteSelect(94);
        this.outx(
            `The largest stud grunts, "<i>Heh.  Mom's body looks like it's about to pop.</i>"  His brother pushes him aside and rubs his furred hand across the taut ${this.player.skin()} of your belly as he says, "<i>`
        );
        if (this.player.pregnancyType != PregnancyStore.PREGNANCY_MINOTAUR)
            this.outx(
                "She doesn't know how to keep her hungry twat closed.  You can see the vermin squirming in her belly.  Disgusting.",
                false
            );
        else this.outx("I can feel our little brother.  It won't be long now.");
        this.outx(
            "  Since your womb is full you'll have to take care of us with your other holes.  ...Don't look at me like that Mom - it's not my fault you're such a slut.</i>\"\n\n",
            false
        );

        this.outx("You frown in ");
        if (this.player.cor < 33) this.outx("irritation at being addressed so insultingly");
        else if (this.player.cor < 66) this.outx("annoyance at their familiarity");
        else this.outx("irritation at losing control of the situation");
        this.outx(
            ".  Of course, the building anticipation heating your loins makes it easy to forget.  Accepting the situation, you open your mouth and look up at your aroused offspring.  You've lost, and there's nothing to do but offer up your spit-hole and present your rump to the mob of lusty beast-man.  They snicker at your slack-jawed appearance while playing with their engorged monster-cocks.\n\n",
            false
        );

        this.outx(
            "One of them smears his flare across your forehead to leave a trail of musky goo behind.  It clearly marks you as his, even if he ",
            false
        );
        if (this.player.pregnancyType != PregnancyStore.PREGNANCY_MINOTAUR) this.outx("isn't");
        else this.outx("may not be");
        this.outx(
            ` the father of the child in your womb.  You shiver at the smell, the heavenly fluid drying on your ${this.player.skinFurScales()} while that slippery tip is moved down to your lips.  Opening your jaw wider, you let the musky prick pop into your mouth.  It tastes like salty sweat, skin, and the heavenly taste of pre-cum all mixed together. The cock pushes deeper, all three rings of prepuce bumping through your lips while the head begins to burrow into your esophagus.  Thankfully the constantly-dripping pre-cum it spouts shuts down your gag reflex, and your only worry becomes wondering just how long you'll have to hold your breath.\n\n`,
            false
        );

        this.outx(
            `Fuzz-covered balls brush your chin, their slowly-churning mass resting heavily on your ${this.player.face()}.  You hesitantly lick them, lapping up the sweat from their fur.  The pungent pheromones tickle at your nose, even as you're kept from breathing by the cock obstructing your tightly-stretched throat.  All this fellatio has made your ${this.vaginaDescript()} so sopping wet that you hear it squish and slosh with every twitch and movement of your ${this.player.legs()}.  It hungers for penetration, but pregnant and swollen as your womb is, you know your sons won't touch it.`
        );
        if (this.player.hasCock())
            this.outx(
                `  The pre-cum leaking from your ${this.multiCockDescriptLight()} reminds you of your poor, ignored maleness, but you'll have to settle for servicing your sons' delectable organs.\n\n`,
                false
            );

        this.outx(
            `Pain radiates through your ${this.buttDescript()} as a strong impact rocks your body.  You'd glance back, but the penis in your mouth holds your head stationary while it begins to slide in and out of your throat.  Another cheek-reddening slap hits your ass, and this time you definitely feel the large, furred shape of a minotaur's hand as the source of your discomfort.  The cock in your mouth draws back, not far enough to empty your mouth, yet far enough for you to breathe in sweet, sweet air through your nose. It plunges back in, just in time for another butt-reddening smack to push you the last few inches back towards those sweaty balls.\n\n`,
            false
        );

        this.outx(
            `You look up and oogle the ${MinotaurMobScene.num2Text(
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] - 1
            )} dicks hovering just inches away from you.  Even the minitaur is there, his smaller dick dripping the sweet cream of his need at the sight of his slutty, utterly debased mother.  It turns you on so much, even more than the cream in your belly.  You reach out and grab two of the dicks to stroke, lubricating fingers with hot, wet pre-cum.`
        );
        if (
            this.player.isNaga() ||
            this.player.tailType == TAIL_TYPE_DEMONIC ||
            this.player.tailType == TAIL_TYPE_COW ||
            this.player.tailType == TAIL_TYPE_SHARK ||
            this.player.tailType == TAIL_TYPE_LIZARD ||
            this.player.tailType == TAIL_TYPE_KANGAROO
        )
            this.outx(
                "  Even your tail reaches up to curl around a third, stroking the thick meat.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            '"<i>It looks like Mom is really into it, huh?  Look at her, deep-throating and drooling like an addict.  What do you have to say for yourself, Mom?  Oh?  You\'d rather keep sucking cock than talk?  Well, alright then; just keep sucking, I think my bro is about to have a present for you,</i>" predicts the second-largest minotaur.\n\n',
            false
        );

        this.outx(
            "His prophetic words ring true when you feel the flare widen in your esophagus, stretching your throat to its limit.  The grapefruit-sized testes drag up your chin, pulling tight to the minotaur's body as they pulsate and narrow inside the sack.  Cum bloats the minotaur's urethra as it's pumped through the flesh-column, until at last it bursts from the cum-slit into your belly with an audible gurgle.  The beast-man pulls back, his thick tip scraping up your throat as it trails smooge into the vacated passage of your throat. At last, it gets free of your needy lips, coating them generously and splattering your face with heavy wads of seed.\n\n",
            false
        );

        this.outx(
            '"<i>Good bitch,</i>" he proclaims as the last few spurts soak you.  Once done, he turns and saunters away, calling out, "<i>Next!</i>"\n\n',
            false
        );

        this.outx(
            'The domineering second-in-line smirks down as he slaps your cheek with his turgid wang.  "<i>Come on, stop sucking up the leftover spooge and get the fresh stuff.</i>"\n\n',
            false
        );

        this.outx(
            `You finish swallowing your mouthful and sigh happily, panting like a puppy at the thought of getting a second helping.  Even your ${this.player.legs()} are wet with your leaking lubricants.  With the intoxication burning through your inhibitions, you plunge forward and engulf the next cock in your hungry mouth, tonguing the dribbling cum-slit in your effort to get more.  You cross your eyes to watch the pillar of dick-flesh as it slides into your maw, eventually disappearing entirely.  The flare, bumps, and difficulty of deep-throating such a sizable shaft barely register by this point, and you can only imagine how you must look - slurping and fellating like a whore while the leftovers from a massive facial hang in strings from your soaked face.\n\n`,
            false
        );

        this.outx(
            "\"<i>Gods and Demons Mom, you're such a slut.  Look at you, knocked up and pregnant, nipples ready to spew milk, and you're covered in one of your sons' cum while you suck off the next.  You greedy fuck-slut.  ",
            false
        );
        if (this.player.pregnancyType == PregnancyStore.PREGNANCY_MINOTAUR)
            this.outx(
                "That baby is probably mine too.  You let your son father his brother.",
                false
            );
        else
            this.outx(
                "That baby isn't even the right species.  You probably get knocked up by every male you meet, but you always come back to suck off your sons.",
                false
            );
        this.outx(
            "  How does that make you feel, whore?</i>\" asks the mouth-filling dick's owner.\n\n",
            false
        );

        this.outx(
            'You hum, "<i>good,</i>" though it comes out as more of a, "<i>mpppphhhhhh.</i>"  Your drug-addled vision is all bubbles and synaesthetic rainbows at this point.  He chuckles malevolently when another minotaur resumes slapping your ass.  The minotaur in the driver\'s seat grabs your ',
            false
        );
        if (this.player.horns > 0) this.outx("horns");
        else this.outx("hair");
        this.outx(
            " and pulls you back, your tongue dragging over the underside of his shaft.  Then, with an abrupt shift, he plunges back in.  Once he bottoms out, he once more reverses direction - never stopping, never slowing.  He face-fucks you hard and fast while your ass is repeatedly smacked.",
            false
        );
        this.outx("\n\n", false);

        this.outx(
            `The frantic face-humping comes to a final, explosive end with an eruption of stringy seed falling into your already-full belly.  This beast-man withdraws coolly.  He pulls out quickly enough that the bulk of his cum is added to your frosted face and ${this.hairDescript()}.  Much of it falls down to soak your ${this.chestDesc()} and huge, pregnant belly.  You look more like a creme-covered doughnut than a person at this point, and you nearly climax from the mental picture of your huge, pregnant form lying in a puddle of minotaur goo while the beast-men use your face as a cum-receptacle.\n\n`,
            false
        );

        this.outx(
            '"<i>You\'ve got a nice tight throat, Mom... for a whore,</i>" says the minotaur as he steps back.  You beam in happiness from the tone of praise in his voice, too high to register the insult for what it really is.  A moment later you forget even that, as the next dick is pressed between your lips.  ',
            false
        );
        // (short)
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] < 8) {
            this.outx(
                "It's the minitaur's! His cock isn't nearly as huge as his brothers', though it's still more than large enough to leave you feeling gaped.  After the intense throat-fucking you've had to put up with, the smaller shaft and its spewing pre-seed feel like a balm, soothing your sore, cum-coated throat.  You swallow it down eagerly, ignoring the fullness of your belly as you try to milk every drop from your feminine son.  Lost in your oral heaven, you relax and let the dick anchor you in place, balls slapping your chin as your esophagus ripples around the sheath-deep member.\n\n",
                false
            );
            this.outx(
                'The minitaur moans, "<i>T-Thanks... ohhh... is it okay if I umm - ooooh - cum now?</i>"\n\n',
                false
            );

            this.outx(
                "You look up at him, sticking your tongue into his sheath to lick the sweat from his dick's innermost recesses while giving the slightest nod of assent.  He moos and trembles unsteadily, shaking you around like a rag-doll as you hold his pulsing prick inside your throat.  His tight, rarely-used sack gives the slightest jump, and then his cock is squirting a steady stream of jism into your cum-filled stomach.  You marvel at how different his stream is from the huge, pulsating eruptions of his siblings.  The minitaur's orgasm is somehow more subdued, almost submissive, and it merely leaks and dribbles its river of seed in one languid discharge.\n\n",
                false
            );

            this.outx(
                'When finished, the feminine monster-boy pulls back and mouths, "<i>Thank you.</i>"  He\'s even considerate enough to wipe his dripping cock off on his loincloth instead of your face.  You fall over and giggle, "<i>You\'re welcome,</i>" in response.  The drugs coursing through your jizz-packed stomach slowly overwhelm your consciousness, and feeling positively divine, you pass out in a pool of your sons\' sludge.  You faintly hear them remark, "<i>',
                false
            );
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] > 3) {
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] == 4)
                    this.outx(
                        "Sorry bro, it looks like Mom's done.  You'll have to snag a shot at her later - she's pretty fucking pregnant, and I don't want her broken.",
                        false
                    );
                else
                    this.outx(
                        "Sorry bros, it looks like Mom's done.  You'll have to snag a shot at her later - she's pretty fucking pregnant, and I don't want her broken.",
                        false
                    );
            } else
                this.outx(
                    "Damn, that was nice.  Who would've guessed a slut as pregnant as Mom would be such a great cock-guzzler?",
                    false
                );
            this.outx('</i>"', false);
        }
        // (Long)
        else {
            this.outx(
                "It's the biggest one yet!  You look up to see which of your many sons is so well endowed.  He's not even that tall.  He's just a normal looking minotaur, but he's fucking HUNG.  His flare is the worst part of it all - it's so wide that you worry it'll dislocate your jaw.  As it enters your throat, stretching your poor neck even further, you note that he's not leaking like his brothers either, though his balls do look big enough to cause him great discomfort when he walks.\n\n",
                false
            );

            this.outx(
                "You sigh and let the oversized cock anchor you in place, keeping you from falling over by lodging itself firmly in your throat.  Your gaze flicks down while the stud grunts and works to pull your lips to his groin, sliding over the huge, bloated balls behind his dick.   An idea only an addict or a drowning man would endorse coalesces in your blitzed brain, and before reason has a chance to return, you decide to act on it.\n\n",
                false
            );

            this.outx(
                "Reaching out, you grab the sweaty spheres in your palms and begins to caress, squeeze, and knead the poor, pent-up cum-tanks. They shiver in your grip and the minotaur's dick-tip flares wider inside you, seating itself firmly in place.  You don't think you could pull it out if you wanted to.  Thankfully, you harbor no such ideas.  You continue your testicular milking, and 'hmmmm' happily when you feel the first squirts of pre-cum drip into your belly.\n\n",
                false
            );

            this.outx(
                "A moment later, the huge testes visibly quiver, and you know the moment you've anticipated has already arrived.  Between the tightness of your throat, the constant humming, and the squeezing of his balls, the poor beast couldn't hold back for more than a minute.  He bellows out a 'moo-OOOO' that echoes off the mountain, and cums HARD.  His first eruption of cum actually pushes his cock partway out of your cream-packed throat.  The second wave has similar effects, though this time it slides up far enough for some of the jism to escape through your nose.  He keeps cumming, each time sliding a bit further back, until he pulls free at last, leaving you to cough the spunk from your mouth and nostrils so you can breathe.\n\n",
                false
            );

            this.outx(
                `The well-endowed minotaur showers you with the rest of his seed, pumping on his cock with fast, relentless strokes to spooge-soak you from your head all the way to the growing puddle underneath you.  You giggle drunkenly and fall to your side, your taut belly splattering up a wave from the puddle you land in.  Laughing uproariously, you let your hands roam over your cum - and offspring - filled form, paying special attention to your ${this.chestDesc()} and drum-tight abdomen.\n\n`,
                false
            );

            this.outx(
                "As the next beast-man approaches, the narcotics pumping through your body start to overwhelm you, and your eyes flutter closed.  That doesn't seem to matter to your sons.  A fresh dick is jammed into your slippery throat.  The last thing you remember hearing is one of the boys speaking up, \"<i>Be careful with her, boys - she's pregnant and ",
                false
            );
            if (this.player.pregnancyType == PregnancyStore.PREGNANCY_MINOTAUR)
                this.outx("we wouldn't want the next member of our tribe injured.");
            else this.outx("we wouldn't want to ruin our favorite toy would we?");
            this.outx(
                "  Look at her, she's smiling with a dick in her mouth while she passes out.  Mom's the best.</i>\"",
                false
            );
        }
        this.player.orgasm();
        this.dynStats("spe", -0.5, "int", -0.5, "lib", 0.5, "sen", 0.5, "cor", 1);
        this.player.slimeFeed();
        this.player.minoCumAddiction(15);
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else this.doNext(this.camp.returnToCampUseEightHours);
    }

    // *[Loss Anal And BJ Spearing, Somewhat Preg?] (feels almost the same as the standard loss, added a demi-scene for nipcunts) (otherwise, edited)
    // SEMI PREG
    // > 120 && <= 216
    private analSpearSemiPregMinotaurGangbang(): void {
        this.spriteSelect(94);
        this.outx(
            '"<i>Hey, check this out, Mom\'s a little pregnant,</i>" quips your second-born son, letting his muscular digits play across the growing bulge on your belly.\n\n',
            false
        );

        this.outx(
            'The biggest brute slams the lesser beast away and gropes at your tits, grunting, "<i>Who cares?  She\'s still a hot piece of ass.</i>"  None-too-gentle in his rough handling',
            false
        );
        if (this.player.biggestLactation() >= 1.5)
            this.outx(", you're soon expressing drops of milk into his squeezing mitts.");
        else this.outx(", you're soon moaning and squirming from his crude caresses.");
        this.outx(
            "  Soon, the turgid length of his horse-like cock is prodding your pregnant tummy, lubing it with narcotic spooge that you find yourself wishing was in your mouth or pussy.\n\n",
            false
        );

        this.outx(
            "A nervous voice interrupts the brute's groping.  \"<i>Umm, g-g-guys... we should be careful with her.  You guys want ",
            false
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] >= 20)
            this.outx("to make the tribe even bigger");
        else this.outx("more brothers");
        this.outx(
            ", don't you?</i>\"  The relatively tiny minitaur flinches as he finishes, expecting a backhand from one of his elder siblings.  Surprisingly, no blow comes.  The biggest one exhales, the deep voice sounding more like a landslide than a breath.  He admits, \"<i>I should ream your ass for interrupting me, but you're right.  Mom's puss is off limits boys, we won't damage ",
            false
        );
        if (this.player.pregnancyType == PregnancyStore.PREGNANCY_MINOTAUR)
            this.outx("our little brother");
        else this.outx("her baby-maker");
        this.outx('.</i>"\n\n', false);

        this.outx(
            'One of the minotaurs grabs your jaw and opens it, swiftly inserting his drooling phallus into your maw.  "<i>Well we can still plug her gob and her ass.  Dibs on her lips.</i>"\n\n',
            false
        );

        this.outx(
            "That wonderful, salty-sweet, ooey-gooey taste hits your tongue, promising your taste-buds a trip into heaven and sending your tongue to a wagging, licking frenzy.  The drugged-up pre-spooge slops around your mouth, relaxing your throat to let more and more of that bestial prick violate your throat.  Three bumps of prepuce bounce through your lips as inches more slide down your gullet, and a perverse, confused part of your mind hopes that whatever you birth is enjoying the coming high as much as you.  Looking forward, you get to see the beast-man's taut, fur-covered musculature coming closer until your nose is nuzzling the thick fuzz.  Heavy, grapefruit sized-orbs press against your chin, and you realize that bloated horse-cock is completely inside you, pulsing happily while the heavy balls churn and bounce against you.\n\n",
            false
        );

        this.outx(
            `"<i>Fuck ma, how do you keep your throat so tight and still swallow dick like a pro?</i>" queries the voice of your current oral fixation, while his heavy fingers slide through your ${this.hairDescript()}.  You're too busy licking the heavenly shaft, feeling the urethra bulge with each dollop of aphrodisiac it releases into your hungry stomach.  The stud's fingers twist your hair, just barely painfully, drawing you out of your drug-seeking daze long enough to make a gurgling noise of assent.  Smirking, the minotaur hollers, "<i>Come on, somebody take her ass already.  `
        );
        if (!this.player.minotaurAddicted())
            this.outx(
                "We've got to get mom so high on us that she'll float back to her camp and come crawling back to us tomorrow.",
                false
            );
        else this.outx("We've gotta get mom her fix.");
        this.outx("  Then, we can try and hunt a succubus to make into our blowjob bitch.");
        this.outx('</i>"\n\n', false);

        this.outx(
            `"<i>Sure thing bro,</i>" answers the deep-voiced giant from behind you.  Two massive hands squeeze around your ${this.hipDescript()} raise your `
        );
        if (this.player.isTaur()) this.outx("haunches");
        else this.outx(this.assDescript(), false);
        this.outx(
            ` skyward, your back bowing from the sudden strain.  A wide, drippy tip butts up against your back-door, and though you had heard them talk about fucking your ass through your lusty daze, nothing could prepare you for the feeling of a hot, male member pushing at your pucker.  You relax your ${this.player.legs()} and feel your ${this.assholeDescript()} loosen, slowly dilating to let the beast's slippery pre-cum inside your rectum.  Yet, even in the face of your complete submission, he holds back, letting you hang there in the air, panting around a cock and aching for greater levels of penetration.`
        );
        this.player.buttChange(60, true, true, false);
        this.outx("\n\n", false);

        this.outx(
            'A voice like an avalanche laughs uproariously, "<i>Look at her squirm!  Okay Mom, hold your horses.</i>"\n\n',
            false
        );

        this.outx('"<i>More like horse-cocks,</i>" jokes the minotaur before you.\n\n', false);

        this.outx(
            'A higher-pitched voice whines, "<i>Come on guys, be nice to mom!</i>"\n\n',
            false
        );

        this.outx(
            'The snarling growl from behind you seems to shake your very frame.  "<i>Shut up, bitch.  I\'m fucking you after her.</i>"\n\n',
            false
        );

        this.outx(
            `Humming on your son's cock, you let the taunts wash over you, barely registering as you suck off your progeny.  The blissful, half-drugged heaven you've been riding in shudders and vanishes with a burst of explosive pain from your ${this.assholeDescript()}, the orifice feeling like it's been ripped in two by a massive intrusion.  You howl and moan between the double, dick-shaped skewers now impaling your pregnant form, slowly getting used to the feeling of being utterly anally filled.\n\n`,
            false
        );

        this.outx(
            `As you adapt to the situation, you find yourself starting to enjoy yourself, and you return your tongue to slathering a fat cock with spit.  You're being held aloft by two huge, strong beast-men and completely stuffed from both ends, with pre-cum pooling into your digestive tract from both ends.  You should be terrified.  You should be mad.  You should be worried about what they're going to do to you.  Instead, you're wondering just how long it will be until you can get them cum inside you and empty their large, swollen balls.  The thought of being taken in such a way drives you wild with desires, making your ${this.vaginaDescript()} `
        );
        if (this.player.wetness() >= 5) this.outx("squirt");
        else if (this.player.wetness() >= 4) this.outx("slime");
        else if (this.player.wetness() >= 3) this.outx("leak");
        else if (this.player.wetness() >= 2) this.outx("trail dribbles of");
        else this.outx("drip");
        this.outx(" girl-juice everywhere.\n\n", false);

        // (nipcunts)
        if (this.player.hasFuckableNipples()) {
            this.outx(
                `Probing hands grasp your ${this.nippleDescript(
                    0
                )}s, exploring their surface.  Thin, feminine fingers slip inside your nippleholes, and a whispered exclaimation reaches your ears from somewhere below your brutally fucked form.\n\n`,
                false
            );
            this.outx(
                '"<i>Oh, wow...</i>" says the voice of the minitaur.  "<i>I w-wonder if I could use this...</i>"\n\n',
                false
            );
            this.outx(
                `Sparing a glance downward, you see your smallest minotaur son looking furtively around for his brothers, a sheepishly guilty grin on his face as he touches his throbbing member with the hand not shoved halfway into your nipple.  He kneels down and points his cock upward, trying to guide it into your nipplecunt despite the violent heaving of your body as the two monstrous bull-men above rock you back and forth.  In one brief lull, he seizes his chance and jams his little flare into your ${this.nippleDescript(
                    0
                )}, almost immediately falling back onto his hands as the double-team gathers speed again and his cockhead is swirled and tweaked in your pendulating chest.\n\n`,
                false
            );

            this.outx(
                '"<i>O-ohh,</i>" he moans, louder than before.  "<i>Amazing, mom... you\'re... just a-mazing.</i>"\n\n',
                false
            );

            this.outx(
                "Unfortunately, you're not the only one who can hear his rapt praise now.  The beast railing your mouth looks down and meets the eyes of the minitaur just as his head lolls back in pleasure.  Your eyes roll when you feel his cock jam further into your nipple as he starts in panic, but his big brother just ",
                false
            );
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] < 7)
                this.outx(
                    "shakes his head.  \"<i>You're only saving up trouble for later, little cunt.  Your hole after Mom's, remember.</i>\"  The minitaur wistfully withdraws his cock and crawls a few paces off, where he sits in a sulk.",
                    false
                );
            else
                this.outx(
                    "nods his head toward one of the idle members of the tribe, who pulls the runt out of your nipplehole with a 'pop' and carries him off, the line of horny minotaurs parting and then forming up again after he passes.  From behind them you can hear squeals of agony and then ecstasy as your smallest son joins you in your state of overfucked, drugged euphoria.",
                    false
                );
            this.outx("\n\n", false);
        }
        // (Lactation, no nipcunts)
        else if (this.player.biggestLactation() >= 1) {
            this.outx(
                `Wet lips clasp around a ${this.nippleDescript(
                    0
                )} and gently suck at it, drawing a small trickle of milk from your leaky tit.  `
            );
            if (this.player.totalBreasts() == 2) this.outx("Your ");
            else this.outx("An");
            this.outx(
                "other lonely breast is grabbed by a softer, more feminine hand, and it's then that you realize you're being suckled by the runt of the litter, your minitaur son.  He caresses your milk-filled globes while he drinks from them, draining each as his big brothers start sawing their hips back and forth.  They use you like one of the strange two-person saws the lumberjacks back home had for cutting trees, and you love it.  The hungry, miniature minotaur drains one tit and moves onto the other, suckling intensely yet tenderly, cautious of hurting you even though his bigger kin seem intent on destroying their chosen orifices.\n\n",
                false
            );
        }
        // (No Lactate, no nipcunts)
        else {
            this.outx(
                `Wet lips clasp around a ${this.nippleDescript(
                    0
                )} and gently suck at it, making it hard and puffy inside the warm, questing mouth.  `
            );
            if (this.player.totalBreasts() == 2) this.outx("Your ");
            else this.outx("An");
            this.outx(
                `other lonely breast is grabbed by a softer, more feminine hand, and it's then that you realize your nipples are being pleasured by the runt of your litter, the minitaur.  He caresses your ${this.chestDesc()} lovingly, running his fingers over your ${this.player.skinFurScales()}.  Meanwhile, his big brothers start to saw their hips back and forth, rocking back and forth like a pair of lumberjacks back home, trying to cut down a tree with the two person-blades. The smallest son sucks and licks tenderly, not wanting to hurt you, even though his bigger kin seem intent on destroying two of your body's orifices.\n\n`,
                false
            );
        }
        this.outx("You're bounced to and fro, utterly and completely fucked");
        if (this.player.biggestTitSize() >= 3 && this.player.biggestLactation() >= 1)
            this.outx(
                ", your pregnant, milky tits swaying underneath you while they're suckled",
                false
            );
        else
            this.outx(
                ", your hard, aching nipples sucked and licked as they sway beneath you",
                false
            );
        this.outx(
            `.  More and more potent pre-cum is dribbling inside of you, and you start to feel like you're going numb.  From your head to your ${this.player.feet()}, you're awash in sensations of all kinds, yet denied the womanly fuck you so desire.  Your ${this.vaginaDescript()} is clenching and juicing, the folds aching to be touched, licked and penetrated, yet you know there's no such release coming.  Confused, you try to wrap your dimming intellect around the situation, and you realize that even though you're being used like a sex-toy, you're getting special treatment due to your pregnancy.  You feel like some domestic breeding animal, restrained and unable to properly fuck, forced to gain enjoyment from every available source.  "<i>Here it comes; swallow it all, you pregnant sow!</i>" exclaims the bull in your mouth.  His cock thickens, seeming to double in size to your confused, oxygen-starved consciousness.  The flare stretches your esophagus painfully wide, and the whole trembling column pulses, dumping a thick glob of beast-jizz directly into your belly.  That tiny burst is nothing compared to the torrent that follows, filling your stomach with the drug-laced, aphrodisiac seed.  You get so horny from the spunky load that your pussy seems to drip and squirt and equal amount of lady-spunk from its sloppy folds`
        );
        if (this.player.wetness() <= 3) this.outx(", even though you're not usually that wet");
        this.outx(
            ".  It feels so good that you start to shake and spasm, cumming and clenching from the spunky injection.\n\n",
            false
        );

        this.outx(
            `With your ${this.assholeDescript()} locking it down, the other, even bigger dick gives in and releases.  It's owner bellows and grunts like a beast, slamming his fur-girded hips against your ${this.buttDescript()} with body-shaking force.  Your burble and gurgle in delight, not minding the semen back-filling your throat and boiling through your nose.  Gushing, your ${this.vaginaDescript()} orgasms even without being touched.  Two fuzzy nut-sacks slowly deflate against your body, and by the time they've finished you look even more pregnant than before.  Your mind shuts down and you giggle dopily around the thick cock in your throat, dreaming your brain's too filled up with cum to work at anything besides being fucked.\n\n`,
            false
        );

        this.outx("Both poles slide out of you");
        if (!this.player.hasFuckableNipples() && this.player.biggestLactation() >= 1)
            this.outx(`, and the minitaur's lips disentangle from your ${this.nippleDescript(0)}`);
        this.outx(".  Hands gently lower you to the ground");
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] >= 5)
            this.outx(
                ", but you're positioned with your ass in the air.  A voice calls out, \"<i>Okay, Mom's pretty out of it.  One at a time and don't damage her, okay?</i>\"\n\nGiggling dreamily, you're fucked repeatedly, spunk squirting from your anus with every thrust.  You pass out like that, feeling quite satisfied.",
                false
            );
        else
            this.outx(
                ".  They step back and admire their handiwork while you float through your narcotic-infused haze.",
                false
            );
        this.player.orgasm();
        this.dynStats("spe", -0.5, "int", -0.5, "lib", 0.5, "sen", 0.5, "cor", 1);
        this.player.slimeFeed();
        this.player.minoCumAddiction(15);
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else this.doNext(this.camp.returnToCampUseEightHours);
    }

    // *[Victory - Generic Text]
    public victoryMinotaurGang(): void {
        this.outx("", true);
        this.spriteSelect(94);
        // (HP)
        if (this.monster.HP < 1)
            this.outx(
                "The last minotaur sinks to his knees, wobbling back and forth while fighting to stay upright. He gives up and slumps down onto his back, mooing in pain.  You exult in your victory as you look across the defeated beast-men.  Though they're strong and aided by potent natural aphrodisiacs, they were no match for you.  Amusingly enough, they're still hard, even in their semi-conscious state. The horse-like mino-cocks lift their loincloths to stab at the sky, dripping moisture.\n\n",
                false
            );
        // (Lust)
        else
            this.outx(
                "The last minotaur sinks to his knees, pulling aside his loincloth with thread-rending strength to expose the pulsating, needy shaft to the air.  He begins to masturbate himself just like his brother, spilling his pre-seed over the ground into the messy, growing puddle.  The smell hangs thick in the air, but you've won and kept enough of your wits about you to walk away if you want.\n\n",
                false
            );
        // +lust regardless
        if (this.player.lust < 33) this.player.lust = 33;
        else this.dynStats("lus", 20);
        this.dynStats("lus", 1);
        this.outx(
            "Your body is burning up, buzzing with growing lust from the obscenity going on a few feet away from you.  What do you do?",
            false
        );
        //  [win options]
        let getSuck;
        if (this.player.hasCock())
            getSuck = this.createCallBackFunction(this.forceMinitaurToGiveOral, 1);
        let nipFuck;
        if (this.player.hasFuckableNipples()) nipFuck = this.victoryBJNippleFuckMinotaurGang;
        let titFuck;
        if (this.player.biggestTitSize() >= 6) titFuck = this.victoryMinotaurGangTitFuck;
        this.choices(
            "Gangbang",
            this.victoryAllThePenetrationsMinotaurGangBang,
            "Tit-Fuck",
            titFuck,
            "Nipple-Fuck",
            nipFuck,
            "Get Licked",
            this.createCallBackFunction(this.forceMinitaurToGiveOral, 0),
            "Get Sucked",
            getSuck,
            "Discipline",
            this.disciplineEldestMinotaurSon,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined,
            "Leave",
            this.cleanupAfterCombat
        );
    }
    // *[Victory Tit-Fuck] (for only the fattest of fat bitch titties)
    private victoryMinotaurGangTitFuck(): void {
        this.outx("", true);
        this.spriteSelect(94);
        this.outx(
            '"<i>Oh, boys,</i>" you coo while you advance, hips swaying in a sinuous display of sexuality.  "<i>I should have taught you some manners.</i>"  You reach down and give the closest disobedient stud a tight squeeze between two of his rings of prepuce.  He grunts in pain while you watch the head become flared by the suddenly displaced blood.  You tease, "<i>Now, I think it\'s time for some punishment.  Don\'t you think you deserve to be punished?</i>"\n\n',
            false
        );

        this.outx(
            '"<i>Y-Yes Mom,</i>" rumbles the defeated beast.  You release him, watching as he slumps back and exhales a tired moo of relief.  The poor boy is so pent up, so needy, that you don\'t mind indulging him and his brothers a little bit.  ',
            false
        );
        if (this.player.minotaurAddicted())
            this.outx(
                "Of course it helps that pleasing them will give you exactly what you want - more of that delicious, wondrous cock-cream.  ",
                false
            );
        this.outx(
            "\"<i>Fantastic.  You're good boys, I know you are.  Now come over here.  Yes, you too - all of you come to mommy.  I'm going to punish the lot of you.</i>\"\n\n",
            false
        );

        this.outx("You lower yourself down ");
        if (this.player.isBiped()) this.outx("to your knees");
        else if (this.player.isTaur()) this.outx("on your forelegs");
        else if (this.player.isGoo()) this.outx("into your gooey undercarriage");
        else if (this.player.isNaga()) this.outx("into the coils of your tail");
        else this.outx("INTO YOUR ERROR: UNCLASSIFIED LOWER BODY");
        this.outx(
            ` and open up your ${
                this.player.armorName
            } to expose your ${this.allBreastsDescript()} to the horny studs.  They approach hesitantly, at first fearing a cruel punishment.  You begin to bounce the pillowy masses up and down hypnotically, and they quickly forget their caution.  The bulls close in,  cocks streaming pre-cum down their heavy, many-ridged lengths.  You sniff at the slick shafts before licking your lips hungrily.  This is going to be fun.\n\n`,
            false
        );

        this.outx(
            `The first two 'boys' to get within arm's reach of you find themselves on the receiving ends of twin handjobs.  As they stamp their hooves in pleasure, they slowly get closer and closer, guided by your skilled, loving fingertips.  You coo in pleasure at sight of their leaky cocks, pulling them closer until they touch your ${this.nippleDescript(
                0
            )}s and smear your chest with their needy pre-spunk.\n\n`,
            false
        );

        this.outx(
            '"<i>Oh yes, you boys are so naughty.  Are you ready to be punished, my lusty, monstrous sons?</i>" you moan.  They nod solemnly, worried about what you plan to do with their dicks, but too absorbed in the spectacle of your heaving chest to flee.  You smirk and drag the twin cocks over the jiggly, mountainous mounds atop your chest towards your canyon-like cleavage.  The two pulsating cocks meet moments before disappearing into that cocooning, motherly divide, and you can feel them pulse with every hammering heartbeat against your chest.\n\n',
            false
        );

        this.outx(
            "You giggle, \"<i>I'm going to punish you until you're crying for my forgiveness... crying tears of cum all over Mommy's tits and mouth.</i>\"  As you finish, the two lucky bovines glance at each other, their worried expressions fading into knowing smirks.  Together they place their hands on your shoulders and shift their hips inward, giving their shafts a better angle to fuck your breasts with.  You watch as the two slowly-flaring tips peak from between your mammoth mounds to drizzle their musky pre-cum into your cleavage.\n\n",
            false
        );

        this.outx(
            "They patiently hold still, knowing you've defeated them and truly could punish them if you wanted to.  You reward their obedience with a slow, circling lick around the closest cock's tip.  It spurts a heavy wad of thick pre on your tongue, and instead of devouring the heavenly fluid, you spit it back onto the glistening shafts. The mixture adds to the lubricant already dripping from the underswells of your chest. Their balls move and shift within their sacks, and you can see the swollen orbs roiling around as they prepare to disgorge.  These guys get so pent up without being able to masturbate; it must be hell for them.\n\n",
            false
        );

        this.outx(
            `You press your hands into the sides of your ${this.biggestBreastSizeDescript()} to mash the flesh tightly about the two lucky penises.  The minotaurs moo in delight, immediately slicking your ${this.player.skinFurScales()} with another huge wave of pre-cum, and before they can adjust to the tightness of your chest, you begin to drag your weighty love-cushions up... and finally down.  You stroke their completely-enveloped cocks languidly, enjoying the complete control and dominance it's giving you over your herd.  Trembling mightily, they fight their bodies to be still for you.  Such good boys.\n\n`,
            false
        );

        this.outx(
            "You reward the patient studs by increasing the tempo.  Up and down go the cock-swallowing tits, squelching noisily from constantly-dripping pre-cum that's raining onto the ground.  The trapped pricks pulse and bounce against each other while the perfect prison around them caresses and strokes their whole length at once.  They puff up slightly, thickening and pressing back at your tits, and you realize they're about to blow.\n\n",
            false
        );

        this.outx(
            `Leaning forward to wrap your lips around one distended flare, you manage to give it a single lick before it erupts with cheek-puffing force.  You gulp down as much as you can, but then the next wave is stretching the cock between your tits and blasting against your dripping palate.  Cum squirts, backfills, and floods out your nose while you try to choke down the load, running back into your cleavage.  A few more mouth-flooding spurts push you completely off the cock, and you give up to swallow what you've got while it paints your ${this.hairDescript()} and ${this.player.face()} completely white.\n\n`,
            false
        );

        this.outx(
            "There isn't even time to recover.  Before the first stud finishes soaking you, the second explodes into your neck.  Runnels of goo wash down the curvature of your mammaries, soaking you down to the abdomen in a creamy, seemingly endless cataract of spooge.  From time to time you lean down and lap at the fountaining spunk, eyes crossed from your slowly dimming mental capacity.  Nevertheless, you manage to keep your hands busy bouncing your tits up and down to prolong the cum-fountains. It isn't until the soft members are pulled from your motherly embrace that you realize they finished cumming moments ago.\n\n",
            false
        );

        this.outx(
            "You lick at your lips and sway on your feet, feeling positively out-of-your-mind with artificial happiness.  ",
            false
        );
        // (FORK: Small or large)
        // (LARGE)
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] >= 10) {
            this.outx(
                `There're so many minotaurs left for you to milk that it makes your head spin.  Then again, it might just be the minotaur spooge addling your poor brain.  You dully remember your pledge to punish them all, and before your 'boys' can take the initiative, you grab the next two studs with your hands and begin jerking them off, slowly egging them closer to you.  The over-sized dicks eagerly advance in response, sliding right between mommy's mammaries where they belong.  Like their bigger bothers, these two obediently hold still once properly positioned and allow you to milk their cocks with your ${this.biggestBreastSizeDescript()}.\n\n`,
                false
            );

            this.outx("\"<i>Good boys.  Now give Mommy more cum... she's ", false);
            if (
                this.player.findPerk(PerkLib.BimboBrains) >= 0 ||
                this.player.findPerk(PerkLib.FutaFaculties) >= 0
            )
                this.outx("like, ");
            this.outx(
                'getting sooo wasted on it,</i>" you command.  Bouncing your breasts up and down, you keep the soaked flesh in constant motion around the swollen, slowly flaring shafts.  A sudden gout of wetness splashes your cheek, and as you turn to investigate, a leaking prick is pressed through your confusion-pursed lips.  Salty-sweet pre-cum tingles on your tongue, and you begin to lap at it eagerly, running your tongue over the hot, flaring tongue.  It tastes absolutely divine.  You focus on it completely, trying to block out the voice of its owner.\n\n',
                false
            );

            this.outx(
                "The runt of your litter, the minitaur, is whining, \"<i>I-I'm sorry Mom but I just couldn't hold b-back anymore.  Ung... your mouth is so hot.  I can't control it!</i>\"  He grabs your ",
                false
            );
            if (this.player.horns > 0) this.outx("horns");
            else this.outx("hair");
            this.outx(
                " and pulls you down, ramming the fat flare of his dick into your throat a split second before he cums.  The salty deluge fills your throat to the brim before it rolls down into your stomach, adding the already full load inside you.  You hum in happiness as you're stuffed with spunk.  The added throat vibration keeps your femmy son spurting nice and long for you.\n\n",
                false
            );

            this.outx(
                "The narcotic sludge in your brain thickens up even more, slowing your thoughts until they're a soupy, semen-filled mess.  You giggle and lick your lips clean once the minitaur pulls his slumping shaft free, mere seconds before a fresh wave of goo soaks them.  The studs in between your tits - you had forgotten about them!  They're grunting and letting out low moos in pleasure in time with the geysering jizz they spout.  It runs over your already-soaked shape like a mudslide flowing down a mountain, glazing you from head to toe in fragrant minotaur mess.  One of your satisfied sons places a bottle under your dripping tits, commenting, \"<i>Why don't you save some of this for later Mom, ",
                false
            );
            if (this.player.minotaurAddicted())
                this.outx("I'd hate to see you go mad with need around a lesser beast.");
            else this.outx("This will be so much better once you learn to need it.");
            this.outx('</i>"\n\n', false);

            this.outx(
                "You nod dumbly and fall onto your side, giggling nonsensically at the bottle full of cum. How silly!  There's still so many dicks to drain, but you've forgotten how to stand up!  Big strong hands help you up and put another dick in your tits.  Yum!  The cock fucks them hard and fast until you get to have another mouthful of creamy semen.  You black out after that, though you're sure your tits and throat got stuffed and fucked at least once by each of the beast-men.  Even the minitaur got a second turn with your tits.\n\n",
                false
            );

            this.outx(
                `You awaken in camp, still a little woozy and naked as the day you were born.  Your ${
                    this.player.armorName
                } lies a few feet away.  Judging by how dizzy you are, it hasn't been long since your mountain tryst.  You wash the dried cum from your ${this.player.skinFurScales()} and gear before you get dressed.  Wow... that was nice.`
            );
        }
        // (SMALL)
        else {
            this.outx("There's only ");
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] == 3) this.outx("one minotaur");
            else
                this.outx(
                    `${MinotaurMobScene.num2Text(
                        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] - 2
                    )} minotaurs`
                );
            this.outx(
                " left for you to milk.  You remember you were punishing them, and with your drug-dulled mind, you're determined to finish it.  The fact that the act you're about to engage in is the farthest thing possible from punishment does not disturb your serene concentration in the slightest.  ",
                false
            );
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] == 3)
                this.outx(
                    "You grab the minitaur's cock and drag the shy beast-man over your cum-slicked tits, wasting no time in burying the shaft in mommy's mammaries, where it belongs.",
                    false
                );
            else {
                this.outx("You grab the minitaur and ");
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] == 4)
                    this.outx("the remaining brother");
                else this.outx("one of the remaining brothers");
                this.outx(
                    ", pulling them hard towards your cum-slicked tits.  You waste no time burying their twin members in the cum-slicked crevasse that is their mommy's mammaries, right where they belong.",
                    false
                );
            }
            this.outx("  \"<i>Good boys.  Now give Mommy more cum... she's ", false);
            if (
                this.player.findPerk(PerkLib.BimboBrains) >= 0 ||
                this.player.findPerk(PerkLib.FutaFaculties) >= 0
            )
                this.outx("like, ");
            this.outx('getting sooo wasted on it,</i>" you command.\n\n', false);

            this.outx(
                'The minitaur wobbles unsteadily, completely unused to having such a wet and gentle hold squeezing down on his shaft.  He whines, "<i>Mom I-I-I\'m g-gonna... ungh... blow!</i>"  The obedient fem-o-taur squirts with reckless abandon, his smaller shaft not even clearing your cleavage, but he still manages to make even more of a mess than before.  ',
                false
            );
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] > 3)
                this.outx(
                    "His glaze spurts up along the opening created by his larger brother's shaft, and soon he too is cumming, obediently orgasming for you.  ",
                    false
                );
            this.outx(
                'One of the previously sated brothers produces a bottle and places it in front of you, letting it fill with cum before he corks it off.  He grunts, "<i>',
                false
            );
            if (!this.player.minotaurAddicted())
                this.outx(
                    "Maybe we can get Mom completely hooked.  Then we won't have to fight her?",
                    false
                );
            else
                this.outx(
                    "That'll be a nice snack for her later.  We wouldn't want her to lose control around lesser species.",
                    false
                );
            this.outx('</i>"\n\n', false);

            this.outx(
                "You gather up a few more mouthfuls to swallow before stumbling to your feet.  There's a soup of semen swimming around your brain making it difficult to think, let alone walk!  Absentmindedly, you pick up the cum-filled jar.  You wouldn't want to forget that.  ",
                false
            );
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] < 5)
                this.outx(
                    "The minotaurs let you get dressed while they sigh happily, clearly pleased with the outcome.",
                    false
                );
            else {
                this.outx(
                    "Before you get far, a strong arm grabs you.  Oh yeah... another son that needs punished.  You sink to your knees and tend to him",
                    false
                );
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] > 5) {
                    this.outx(" and his brother");
                    if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] >= 6) this.outx("s");
                }
                this.outx(".  The act passes in a blur, but you");
                if (!this.player.isGoo()) this.outx(" look like a white goo-girl");
                else this.outx("r gelatinous body is filled with long slashes of white");
                this.outx(
                    " by the time you manage to leave.  You nearly forget your equipment, but grab it at the last second.",
                    false
                );
            }
        }
        // Force cum bottle loot!
        this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = this.consumables.MINOCUM.id;
        this.player.orgasm();
        this.dynStats("spe", -0.5, "int", -0.5, "lib", 0.5, "sen", 0.5, "cor", 0.5);
        this.player.slimeFeed();
        this.player.minoCumAddiction(15);
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else {
            this.outx("\n\n", false);
            this.inventory.takeItem(
                ItemType.lookupItem(this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID]),
                this.camp.returnToCampUseOneHour
            );
        }
    }

    // *[Victory - Double/Triple penetration]
    private victoryAllThePenetrationsMinotaurGangBang(): void {
        this.outx("", true);
        this.spriteSelect(94);
        this.outx(
            `Deciding you wanted the same thing as your sons, you strip out of your ${this.player.armorName} and instruct the horny, defeated minotaurs to shed what's left of their loincloths.  They obey`
        );
        if (this.monster.lust > 99)
            this.outx(
                " nearly instantly, too aroused to turn down the idea of their mother doing ANYTHING with their hard shafts.",
                false
            );
        else
            this.outx(
                " somewhat sluggishly as they work to get nude for you, despite their wounds.  As they finish, they start to move a bit faster, recovering from the battle quicker than you would have thought.",
                false
            );
        this.outx(
            "  You saunter over to the closest cock and admire the twitching hardness of it, caressing the somewhat equine shaft with gentle touches as you position yourself squarely above it.\n\n",
            false
        );

        this.outx(
            "It prods at your vulva as you sink down, smearing your outer lips with fragrant minotaur 'honey'.  The flared tip barely gains any traction at the gateway to your love canal.  You reach down and pull yourself wide, opening up as much as possible for your offspring's wonderful cock.  ",
            false
        );
        if (this.player.vaginalCapacity() >= 60)
            this.outx(
                `It slips into your ${this.vaginaDescript(
                    0
                )} with ease, nestling into your accommodating opening as if it were a second home.`
            );
        else if (this.player.vaginalCapacity() >= 40)
            this.outx(
                `It slips into your ${this.vaginaDescript(
                    0
                )} ever so slowly, gradually widening your quim until it's able to handle its size.`
            );
        else
            this.outx(
                `It stretches your ${this.vaginaDescript(
                    0
                )} with painful force as it penetrates you, forcibly widening your quim until it's able to nestle its sheath against your vulva.`
            );
        this.outx(
            "  It pulsates wetly inside you with each beat of the minotaur's hammering heart.",
            false
        );
        // (CUNT CHECK, REGISTER 4! And hymens are out of stock again!)
        this.player.cuntChange(60, true, true, false);
        this.outx("\n\n", false);

        this.outx(
            'You arch your back and wiggle your exposed rump in the air as you ask, "<i>Now which of my sons wants to show Mommy how much they love her?</i>"\n\n',
            false
        );

        this.outx(
            `Within seconds a crowd has formed behind you.  Numerous hands squeeze and caress your ${this.buttDescript()}, a few even daring to press at the tight ring of your ${this.assholeDescript()}.  They jostle around a bit as they fight over the honor of penetrating your back door, but a winner is selected before you bore of the spectacle.  He grabs your ${this.buttDescript()} in both hands to aid in his efforts to align his cock with your pucker, squeezing softly.\n\n`,
            false
        );

        this.outx("The beast-man finally hits your anus with his tip and pushes forward.  ");
        if (this.player.analCapacity() < 40)
            this.outx(
                `Your ${this.assholeDescript()} is so tight that he's forced to push and release over and over.  The painful penetration drags on and on as he widens your hole to accept his monstrous cock.`
            );
        else if (this.player.analCapacity() < 60)
            this.outx(
                `Your ${this.assholeDescript()} slowly widens to accept the cock that's being deposited into its depths.  You find yourself somewhat grateful that you've been stretched enough to prevent this from being painful.`
            );
        else
            this.outx(
                `Your ${this.assholeDescript()} devours the cock easily.  The only thing even close to a tight fit is the feeling of your pucker being stretched at his very base.`
            );
        this.outx(
            "  Balls gently come to rest against your taint.  You relish the feeling of being so exquisitely stuffed, those thick, ribbed shafts rubbing against each other through your holes, but something's missing.",
            false
        );
        this.player.buttChange(60, true, true, false);
        this.outx("\n\n", false);

        this.outx(
            `While beginning to rock your hips, you ask, "<i>Would any of you boys like to help Momma with her other hole?</i>"  A dribbling dick appears before your face as if by magic.  You lick your lips as the smell of his pre-cum slowly overpowers your conscious thought and look up at the marvelous cock's owner as you open wide.  He plunges forward, sliding along your tongue as if it's a red carpet laid out for his use.  The dick buries itself into your throat, the leaking pre obliterating your gag reflex along the way. You put your hand on his belly to indicate he should remain still, and he reluctantly agrees, for now.  Deliberately, you rock your ${this.hipDescript()} up and down, fucking your sons' twin penises while the action works your throat up and down the dick in your mouth.`
        );
        if (this.player.hasFuckableNipples() && this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] >= 4)
            this.outx("  There's still more you could be doing.");
        this.outx("\n\n", false);

        // (Nipplefuck PG:)
        if (this.player.hasFuckableNipples() && this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] > 4) {
            if (this.player.biggestLactation() >= 1) this.outx("Milky lube");
            else this.outx("Lubricant");
            this.outx(
                ` drips from your ${this.nippleDescript(
                    0
                )}s in sympathy with your packed pussy.  A wicked idea coalesces inside your lusty psyche as you ask, "<i>Did you boys know about my OTHER pussies?  Why don't you try my breasts?</i>"  `
            );
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] == 4)
                this.outx("One stud assembles next to ");
            else if (
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] >= 5 &&
                this.player.totalBreasts() == 2
            )
                this.outx("Two studs assemble around ");
            else {
                let dicks: number = this.player.totalBreasts();
                if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] - 3 < dicks)
                    dicks = this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] - 3;
                this.outx(`${MinotaurMobScene.num2Text(dicks)} studs assemble around `);
            }
            this.outx("you, watching your tits sway with the motion of your body.  ");
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] == 4)
                this.outx("He excitedly fingers");
            else this.outx("They excitedly finger");
            this.outx(
                " your tits, slipping a few digits in to explore the depths of your chest-pussies.  ",
                false
            );
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] == 4)
                this.outx(
                    "He licks his fingers clean, and a moment later, a cock is spearing one of your nipples, disappearing deep into the tingling passages concealed within your chest.\n\n",
                    false
                );
            else
                this.outx(
                    "They lick their fingers clean, and a moment later, cocks are spearing your nipples, disappearing deep into the tingling passages concealed within your chest.\n\n",
                    false
                );
        }
        // Dicks)
        if (this.player.hasCock())
            this.outx(
                `${this.SMultiCockDesc()} hangs limply on one of your boys' bellies, dribbling weakly at your need, but there's not any way for it to get involved in the crowd of orgiastic bodies.\n\n`,
                false
            );

        this.outx(
            "That's more like it - now that you're completely impaled in every way, the real fun can start!  You increase the speed of your body's movements, reveling in the absolute dominance and control you hold over your drug-dispensing offspring.  They leak and dribble as you fuck them hard and fast, occasionally reaching out to slap or spank one of them when they start to move.  You ride them like a set of living dildos, squelching noisily from every hole as you leak lube, spit, and pre-cum in equal measure. It's so hot and nasty",
            false
        );
        if (this.player.cor < 33)
            this.outx(
                " that you cringe a little when you realize you're having an incestuous orgy, but the rising tide of minotaur-drug in your bloodstream washes the errant thought away.",
                false
            );
        else
            this.outx(
                " that you can barely hang on to your sanity, but it feels like all the minotaur-drug leaking into your bloodstream might wash away even that.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            "You hum in pleasure around the mass of meat in your mouth as the complete penetration of your body pushes you past your endurance and into the realm of bliss.  The hum rises in pitch and volume, turning into a squealing moan of pleasure.  Your body shakes, your pussy clenches, ",
            false
        );
        if (this.player.hasFuckableNipples() && this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] > 4)
            this.outx("your nipples squirt, ");
        this.outx(
            "and your ass squeezes down on the minotaur penis inside it all at once.  Overwhelmed by their slutty mother's thrashing form and constricting holes, ",
            false
        );
        this.outx(
            "your sons grab you and take control, fucking you wildly.  You bounce around like a child's toy, utterly at the mercy of your muscular offspring.\n\n",
            false
        );

        this.outx(
            `The one in your ass gets off first, basting your colon in his juices.  Narcotic spooge slops from your ${this.assholeDescript()} as he overfills the poor rectal opening, but you get more than enough inside you to make you woozy and light-headed - as if your orgasm hadn't already.  Spunk erupts in your ${this.vaginaDescript()} with equal fervor, packing itself into your womb with `
        );
        this.outx(
            "incredible force.  You can feel the four balls behind you shrinking as their cargo empties into your pussy and ass, stuffing your hind-end.\n\n",
            false
        );

        this.outx(
            `Flaring wide inside your throat, the minotaur cock in your mouth begins to cum as well, egged on by your shaking, orgasmic motions and the sight of your ${this.buttDescript()} being so thoroughly stuffed.  Heavy globs of cum blast directly into your stomach, one after another, until you're completely packed. `
        );
        if (this.player.hasFuckableNipples() && this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] > 4) {
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] > 4)
                this.outx(
                    `Meanwhile, your ${this.nippleDescript(
                        0
                    )}s get a similar feeling from the studs arranged around them`
                );
            else
                this.outx(
                    `Meanwhile, your ${this.nippleDescript(
                        0
                    )} gets a similar feeling from the stud pumping away at it`
                );
            this.outx(
                ", bloating your breasts up a whole bra-size from the cum injection.  ",
                false
            );
        }
        this.outx(
            "All of them pull out at once, leaving you to rub your distended belly and moan.  The ",
            false
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] < 20) this.outx("gang");
        else this.outx("tribe");
        this.outx(" smirks at you as you struggle to right yourself.\n\n", false);

        this.outx(
            "You wobble a little, but you manage to make it up.  The defeated minotaurs titter at their handiwork, now dripping from every hole on your body.  You put an end to that by cracking your knuckles and glaring at them with an expression of absolute brutality.  The beast-men turn tail and flee, not daring to risk their mother's wrath.  Once they've gone, you collapse into the cummy mud-puddle you've made underneath yourself and giggle madly!  What silly fools you have for sons!\n\n",
            false
        );

        this.outx(
            "After getting dressed, you idly scoop a handful of cum from your sodden box and devour it - the perfect snack for the long walk home.",
            false
        );

        // Preggers chance!
        this.player.knockUp(
            PregnancyStore.PREGNANCY_MINOTAUR,
            PregnancyStore.INCUBATION_MINOTAUR,
            75
        );
        this.player.orgasm();
        this.dynStats("spe", -0.5, "int", -0.5, "lib", 0.5, "sen", -0.5, "cor", 1);
        this.player.slimeFeed();
        this.player.minoCumAddiction(20);
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else this.doNext(this.camp.returnToCampUseOneHour);
    }

    // *[Victory - Make minitaur oral (M/F/H)]
    private forceMinitaurToGiveOral(choice = 0): void {
        this.outx("", true);
        this.spriteSelect(94);
        this.outx(
            `You hastily remove the lower portions of your ${
                this.player.armorName
            } to expose your ${this.vaginaDescript()}`
        );
        if (this.player.hasCock()) this.outx(` and ${this.multiCockDescriptLight()}`);
        this.outx(" to the air.  The defeated ");
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] < 20) this.outx("mob");
        else this.outx("tribe");
        this.outx(
            ` of minotaurs perk up at the sight, but you laugh at their hopeful expressions.  "<i>I hope you don't expect to be getting any of this.  Get the fuck out of here, and don't let me catch you trying to ambush me again!</i>"  Wearied, they drag themselves to their feet, giving your womanhood long, leering looks as they go.  You pin the minitaur's tail under your ${this.player.foot()}, though.  He's got a surprisingly cute mouth, and you intend to put it to use.\n\n`,
            false
        );

        this.outx(
            "The tiny, feminine beast-man looks up at you hopefully.  You crush his hopes by telling him to crawl to you.  If he wanted your pussy, he could have done better by asking.  Running around with that band of brutes didn't score him any points in your book, and you make a point of telling him so.  He whines, \"<i>I-I don't have a choice Mom!  They bully me and make me suck them off all the time.  And if we can't find someone to fuck, I end up having to t-take it in my butt.  It hurt at first... but now I get antsy when they don't let me suck them off every few hours.</i>\"\n\n",
            false
        );

        this.outx(
            "The pathetic minitaur is hopelessly addicted to his brothers' cum.  You shrug, tired of his bitching and wanting the satisfaction you so desperately crave.  \"<i>Whining about your problems won't make them go away.  Now put that mouth to use and ",
            false
        );
        // (FORK BETWEEN CUNT/DICK VARIATIONS)
        // (CUNTPUSSIEFUCKER)
        if (choice == 0) {
            this.outx(
                "start licking Momma's pussy.</i>\"  As if to emphasize your point, you ",
                false
            );
            if (this.player.isTaur()) {
                this.outx("turn ");
                if (this.player.tailType > TAIL_TYPE_NONE) this.outx("and lift your tail ");
                this.outx("to expose the glistening pinkness of your womanhood.");
            }
            // ELSE
            else {
                if (this.player.balls > 0) this.outx("lift your balls and ");
                this.outx(
                    `spread your ${this.vaginaDescript()} wide with your fingers, exposing the glistening pinkness of your womanhood.`
                );
            }
            this.outx(`  Your ${this.clitDescript()} slowly peeks out from its hood`);
            if (this.player.clitLength >= 8) this.outx(", until the huge size of it is revealed.");
            else if (this.player.clitLength >= 3)
                this.outx(
                    ", until the cock-like length of your feminine organ is revealed.",
                    false
                );
            else if (this.player.clitLength >= 1)
                this.outx(", until the large, womanly organ is revealed.");
            else this.outx(", revealing its cute button self.");
            this.outx("\n\n", false);

            this.outx("The girly 'monster' crawls forward, ");
            if (this.player.isTaur())
                this.outx(
                    "disappearing under your hind-legs as he attends to his newly commanded duty.",
                    false
                );
            else
                this.outx(
                    "looking up at you longingly as he leans in towards your entrance.",
                    false
                );
            this.outx(
                "  He opens his mouth and hesitantly extends his tongue towards your womanhood.  It's clear he doesn't have much experience providing oral to the fairer sex.  Since you don't have much intention of staying in the mountains long, you grab him by his short little horns and pull him against your gash.\n\n",
                false
            );

            this.outx(
                `Extending outward defensively, the minitaur's tongue slides into your vaginal opening with ease.  It's very, very long and extraordinarily wet.  His hot breath washes over your ${this.clitDescript()}, fogging the surrounding air as you press his bovine nose against your folds.  The difference in temperature between the coolness of his moist nose and the heat of his breath and tongue drives you wild.  The feminine beast-man adapts to his task with enthusiasm, hungrily lapping and sucking at your ${this.vaginaDescript()}`
            );
            if (this.player.clitLength < 3)
                this.outx(
                    ", even sucking your clit into his mouth and running his tongue along its length.",
                    false
                );
            else this.outx(", even stroking your clit in his hand in time with his licks.");

            this.outx(
                `You begin to undulate your ${this.hipDescript()} into the minitaur's bestial muzzle, grinding and groaning in joy at the forced cunnilingus.  `
            );
            if (this.player.clitLength >= 6)
                this.outx(
                    "He jacks your huge clit like a cock, and the incredible stimulation is too much for you to take.",
                    false
                );
            else
                this.outx(
                    "He sucks and licks your pussy and clit simultaneously, displaying hidden talent with his bovine tongue.  It's just too much for you to take!",
                    false
                );
            this.outx(
                "  You cum - hard, into the cow-boy's muzzle.  He laps at your juices enthusiastically - a natural born cunt-licker.",
                false
            );
            if (this.player.wetness() >= 5)
                this.outx(
                    "  The wave of squirting fluids drips from his shaggy chin and runs down his chest.",
                    false
                );
            else if (this.player.wetness() >= 4)
                this.outx(
                    "  The stream of dribbling fluids drips from his shaggy chin to run down his chest.",
                    false
                );
            else if (this.player.wetness() >= 3)
                this.outx(
                    "  The dribbling fluid runs down his shaggy chin and drips towards the ground.",
                    false
                );
            else if (this.player.wetness() >= 2)
                this.outx(
                    "  Some of the fluids escape his mouth to run down his shaggy chin.",
                    false
                );
            else
                this.outx(
                    "  All of your moistness is collected on his tongue and sucked into his mouth.",
                    false
                );
            this.outx(
                "  Your quivering cunt tries to milk the poor boy's tongue like a cock, actually pulling him harder against your fem-cum-slicked nether-lips while you climax.",
                false
            );
            if (this.player.hasCock())
                this.outx(
                    `  Salty cum dribbles down his back from your spurting ${this.multiCockDescriptLight()}, the male part of you orgasming along in a perverse symphony with your girl-parts.\n\n`,
                    false
                );
        }
        // (PENISCOCKSUCKERFUCK)
        else {
            this.outx(
                "start sucking Mommy's hard cock.</i>\"  To emphasize your point, you ",
                false
            );
            if (this.player.isTaur())
                this.outx(`flex your ${this.multiCockDescriptLight()} to slap against your belly.`);
            else this.outx(`stroke your ${this.multiCockDescriptLight()} with one hand.`);
            this.outx(`  ${this.SMultiCockDesc()} `);
            if (this.player.lust < 50) this.outx("grows hard");
            else this.outx("gets even harder");
            this.outx(
                " before his eyes, and the minotaur licks his lips reflexively, clearly enjoying the thought of fellating you.\n\n",
                false
            );

            this.outx("The girly 'monster' crawls forward, ");
            if (this.player.isTaur())
                this.outx(
                    "disappearing under your hind-legs as he attends to his newly commanded duty.",
                    false
                );
            else
                this.outx(
                    `looking up at you longingly as he leans in towards ${this.oMultiCockDesc()}.`
                );
            this.outx(
                `  His big brown eyes meet yours as he opens his muzzle and lets the full length of his tongue flop free.  It's roughly a foot and a half long fully extended, and ${this.sMultiCockDesc()} twitches as you imagine what it must feel like.  Thankfully, he does not keep you waiting long.\n\n`,
                false
            );

            this.outx("The serpent-like tongue snakes ");
            if (this.player.balls > 0)
                this.outx(`around your ${this.sackDescript()} before curling `);
            this.outx(`around the base of your ${this.multiCockDescriptLight()}.  It circles up `);
            if (this.player.cockTotal() > 1) this.outx("a");
            else this.outx("the");
            this.outx(
                ` shaft before stopping at the frenulum.  The wet heat of his tongue seems to seep into your dick-flesh until you feels as if you could melt, but the minitaur is just getting started.  He opens wide and takes your ${this.player.cockHead()} into his mouth; it rubs sensually over the remainder of flat tongue still inside, and he sucks expertly at it until you're drooling pre-cum on his tongue.  He shivers at that, but it doesn't make him `
            );
            if (!this.player.isTaur()) this.outx("break eye-contact or ");
            this.outx("slow down in the slightest.\n\n", false);

            if (this.player.hasVagina())
                this.outx(
                    `Humming happily, the minitaur slips a digit inside your ${this.vaginaDescript()}, and while you didn't ask for it, the added stimulation only heightens your need.  `
                );
            this.outx(
                "His circling, wiggling tongue slides up and down your length as he sucks on the tip, giving you a wondrous tongue-fuck",
                false
            );
            if (this.player.cockTotal() > 1) {
                this.outx(" while he strokes ");
                if (this.player.cockTotal() > 2) this.outx("one of your ignored penises");
                else this.outx("on your ignored penis");
            }
            this.outx(".");
            if (this.player.hasVagina())
                this.outx(
                    "  You begin to cum into your son's mouth, your pussy hugging his finger tightly inside its depths.",
                    false
                );
            this.outx("\n\n", false);

            this.outx("Your jism ");
            if (this.player.cumQ() < 100)
                this.outx(
                    "squirts into his mouth repeatedly, puddling on his tongue before he noisily swallows it.",
                    false
                );
            else if (this.player.cumQ() <= 250)
                this.outx(
                    "squirts into his mouth over and over, puddling on his tongue and forcing his cheeks to bulge slightly before he swallows.",
                    false
                );
            else if (this.player.cumQ() <= 1000)
                this.outx(
                    "spurts into his mouth, filling it with the first burst alone.  He swallows it just in time for the next, and he gulps noisily to keep up with your orgasm.",
                    false
                );
            else {
                this.outx(
                    "blasts into his mouth and dribbles from the corners of his lips as his throat noisily attempts to gulp down the huge semen-flow.",
                    false
                );
                if (this.player.cumQ() >= 2000)
                    this.outx("  Spunk runs from his nostrils as he utterly fails.");
            }
            this.outx(
                "  He pulls back before you finish and lets the last few waves of semen of take him in the face.",
                false
            );

            if (this.player.hasVagina()) {
                if (this.player.wetness() >= 5)
                    this.outx("  Your cunny squirts onto his chest throughout the ordeal.");
                else if (this.player.wetness() >= 3)
                    this.outx(
                        `  Your cunny drips everywhere, making a mess of your ${this.player.legs()}.`
                    );
            }
            this.outx(
                "  The minitaur actually looks kind of cute with spooge puddled on his nose.\n\n",
                false
            );
        }

        this.outx(
            'Finished with him, you push him back to let him fall on the ground, his face wet with your cum.  The poor minitaur is harder than ever, and though his cock looks tempting, you\'re already satisfied.  You get dressed and blow a kiss to the poor boy.  "<i>Be good for Momma, okay?</i>"  He nods dumbly as you saunter away.',
            false
        );
        this.player.orgasm();
        this.dynStats("sen", -1);
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else this.doNext(this.camp.returnToCampUseOneHour);
    }

    // *[Victory- BJ + Nipplefucking] (boring, samey, not actually punishment again, could have been shoving very long nipples into urethras) (edited)
    private victoryBJNippleFuckMinotaurGang(): void {
        this.outx("", true);
        this.spriteSelect(94);
        this.outx(
            `You pull down the top portion of your ${
                this.player.armorName
            } and shake your ${this.chestDesc()} back and forth.  "<i>Would two of you strapping young lads like to play with your Mom's nipples?</i>" you tease.  The minotaurs stir from their defeated poses with lust burning in their eyes as they rise and advance.  Giggling, you circle your areolae with your fingertip and moan lewdly, teasing the poor beasts until you tire of the stimulation and work a fingertip into `
        );
        if (this.player.totalNipples() == 2) this.outx("each");
        else this.outx("two");
        this.outx(" of the leaky nipple-cunts.\n\n", false);

        this.outx(
            'The second largest of your strapping sons dares to ask, "<i>If you\'re going to let us fuck your nipples, why did you have to fight us first?</i>"\n\n',
            false
        );

        this.outx(
            "\"<i>Because, dear boy, I needed to show you rebellious fools who's in charge around here.  Now that you've been put in your place, it's time you gave Mom a little sugar,</i>\" you explain as you wiggle seductively.\n\n",
            false
        );

        this.outx(
            'The biggest of the minotaurs shoulders his younger brother aside as he snarls, "<i>Fine.  I\'ll play, mom.</i>"  He tears off the remnants of his soaked loincloth with a jerk, tossing it aside while he clops forward, his huge cock bobbing in front of him.  Your eyes lock onto the monstrous member and you salivate hungrily from the scent it exudes, sniffing in lungfuls of its musk.  Not to be outdone, the other brother circles his sibling to place himself before your other tit, cutting off ',
            false
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] == 3)
            this.outx("the minitaur, much to the smaller monster's chagrin.");
        else this.outx("the rest of his kin, much to their chagrin.");
        this.outx(
            "  The pair look at you with ravenous eyes as you continue to toy with the nipple openings, slowly stretching them as they get wetter and wetter.\n\n",
            false
        );

        this.outx("You smile and ");
        if (this.player.tallness >= 72) this.outx("drop down");
        else this.outx("shift position");
        this.outx(
            ` to get your ${this.nippleDescript(
                0
            )}s at a better angle, popping your fingers free of their slimy depths.  "<i>Well, go on then,</i>" you say with an expectant tone.  "<i>Fuck them.</i>"  The minotaurs do not disappoint.  Each of them takes one of your ${this.biggestBreastSizeDescript()} in their hands and presses their fat, flat tips against the slightly-gaped openings.  With ever-increasing pressure, they push their flares harder against the unyielding nipple-pussies, until at last they stretch the poor tit-cunts wide and dilate the inside of your mammaries.\n\n`,
            false
        );

        this.outx(
            "The sensation of those hot minotaur pricks stuffing your nipples as wide as a well-fucked pussy is heavenly.  You rock in place from the sloppy, pre-spurting penetration, watching ",
            false
        );
        if (this.player.biggestTitSize() <= 2) this.outx("a few inches");
        else if (this.player.biggestTitSize() <= 4) this.outx("inches");
        else if (this.player.biggestTitSize() <= 8) this.outx("most of a foot");
        else if (this.player.biggestTitSize() <= 14) this.outx("over a foot");
        else if (this.player.biggestTitSize() <= 30) this.outx("nearly two feet");
        else this.outx("the whole length");
        this.outx(
            " of the nearly-equine cocks disappear inside you with rapt fascination.  The thick, hot members pulsate inside the bottom of your tits and nearly knock you to the ground from the pleasure.  You grab your boys' balls in that moment, squeezing them softly to egg them on.  In response, the minotaurs both pull their cocks back, dragging their flares back out of your jugs before they penetrate you all over again.\n\n",
            false
        );

        this.outx(
            "You moan like a slut and caress your sons' gargantuan testes, loving every moment of it.  To your surprise, the two happily rutting minotaurs are parted by a third shaggy form.  The minitaur emerges from between them",
            false
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] >= 7)
            this.outx(", chased by jeers from the remainder of your brood");
        this.outx(
            `.  He shyly scratches at his head as he daintily lifts his loincloth, stiffing up until his erection is bobbing before your ${this.player.face()}.  "<i>Mom, could you... lick it please?  It hurts.</i>"  You smirk and open wide, giving him a perfect view of your slowly-undulating tongue and glistening lips.\n\n`,
            false
        );

        this.outx(
            "Your girlish minitaur son dives right in to your inviting maw.  His cock slides through your lips, over your tongue, and into the recesses of your throat with ease, leaving a trail of tingling pre-cum coating everything in its wake.  Even though the sudden appearance of your smallest child has forced your bigger offspring to shift, all it's done is pulled your shaking, violated breasts out to the sides in a lewd display of breast penetration.  The three pound away at you violently, humping to their own rhythms and making it impossible to focus on anything but the violent penetration.",
            false
        );
        if (this.player.hasCock()) {
            this.outx(`  ${this.SMultiCockDesc()}`);
            if (this.player.hasVagina()) this.outx(` and ${this.vaginaDescript()} drool`);
            else this.outx(" drools");
            this.outx(
                " lamely inside your clothing, nearly forgotten in the sensory overload coming from your upper body.",
                false
            );
        }
        this.outx("\n\n", false);

        this.outx(
            "Four balls writhe and contract in your grip, and then suddenly your chest is being double-stuffed with heavy double-loads of beast-cum.  The musky spunk quickly fills the tightly-stretched passages and leaks out to roll down the underside of your tits in sloppy dribbles.  Hot, flooding cum swamps you, and a tit-shaking boobgasm rolls through white-hot nerve endings to make you squeal with absolute, perfect pleasure",
            false
        );
        if (this.player.biggestLactation() >= 3)
            this.outx(" while you hose sprays of milk around the twin rods");
        else if (this.player.biggestLactation() >= 1.5)
            this.outx(" while you dribble milk around the twin rods");
        this.outx(".\n\n", false);

        this.outx(
            `The two cumming studs pull out of the tight holes as your convulsing fingertips milk their balls, squeezing the heavy sacks uncontrollably.  Ropes of potent, drug-laced spooge spatter across your ${this.chestDesc()}, shoulders, and face, just in time for the cock plugging your mouth to explode in orgasm with the force of a bursting dam.  You're utterly soaked in seed, both inside and out - an incestuous whore through and through.  The two largest minotaurs finally exhaust their reserves and step back, high-fiving as they go.  Your smaller, girlish boy takes longer to finish, but by the time he does you feel positively stuffed.  It will be quite some time before you're hungry for a`
        );
        if (!this.player.minotaurAddicted()) this.outx(" 'meal'");
        else this.outx("nother fix");
        this.outx(".\n\n", false);

        this.outx(
            "You stand up straight and stretch, cum pouring from your nipples.  The assembled minotaurs ",
            false
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] < 5)
            this.outx("relax and fan themselves while giving you lusty looks");
        else
            this.outx(
                "stare gloomily at the lucky three before turning to regard your form again with unrepentant lust",
                false
            );
        this.outx(
            `.  You re-dress sensually, giving them as much of a show as you dare, not even bothering to wipe the cum-coating from your ${this.player.skinFurScales()} before you finish slipping into your ${
                this.player.armorName
            } and depart.`
        );
        this.player.orgasm();
        this.dynStats("spe", -0.5, "int", -0.5, "sen", -1, "cor", 1);
        this.player.minoCumAddiction(10);
        this.player.slimeFeed();
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Bad End Scene:
    // *Summary: Req's a ton of sons and the PC be addickted to minotaur spooge, also to have seen the random scene with a minotaur fucking a cowgirl in the mountains at least _ times. :3
    private minotaurGangBadEnd(): void {
        this.outx("", true);
        this.spriteSelect(94);
        this.outx(
            `Slumping down to your knees, you look up at the crowd surrounding you.  There're dozens of horny, bestial figures, all of their bovine faces twisted into leering smiles at your state.   You can smell the thick musk in the air, hanging so heavily that it seems to fog your view.  Sniffing in great lungfuls of it, you slump back and let your ${this.player.legs()} spread out of their own accord, utterly revealing the folds of your ${this.vaginaDescript()} to the horny beast-men.  They cluster around you, their loincloths disappearing in a hurry in their rush to fuck their incestuous mother.  Images of all the other times you've been in a similar situation run through your head, the thoughts blurring together into a vision of one long, drug-fueled fuck.\n\n`,
            false
        );

        this.outx(
            `Giggling, you realize a scene much like that is about to happen to you all over again.  A dribble of fem-slime leaks out from your ${this.vaginaDescript()} into the dry mountain dirt, showing your boys just how excited you are to be on the receiving end of their dripping horse-cocks.  "<i>Come to Momma,</i>" you coo, already slipping into a haze of musky cum-lust.\n\n`,
            false
        );

        this.outx(
            "The answer is a chorus of booming laughs loud enough to make your ears ring.   Sweat-slicked muscles wrap around your slack, delirious form and heft you onto a strong shoulder.  A gentle voice as deep as the rumble of a rockslide says, \"<i>Come on, there's no sense in you staying away from us anymore.</i>\"  They're taking you away to who knows where, probably a village hidden deep in the mountains.  Idly, you wonder if there's even more of the sexy... strong... handsome bulls there to violate you.  Maybe they've got even bigger cocks than their brothers!  You sink so deeply into your fantasies at that point that the only outward hint of your consciousness is the occasional whimper and accompanying squirt of slime down the brute's back.\n\n",
            false
        );

        this.outx(
            "Suddenly, you're dropped from your perch into a pile of cushiony pillows, your body flopping like a ragdoll as it pomfs into pillowy softness.  Looking around, you realize you're inside a crude hut that's absolutely filled with pillows, and you aren't the only one there!  Other people are sprawling out in the mound of mattresses, all of them naked and most of them pregnant.  Offhand, you spy a goblin so gravid you doubt she can move, a wolf-morph with cum-matted fur, a centauress with massive, milky breasts, and a cow-girl who's as busy playing with her swollen clit as she is stroking the taut skin of her baby-filled belly.  There're a few others bodies half-buried in pillows and blankets, but they seem to be sleeping too deep in the fluff for you to get any details.\n\n",
            false
        );

        this.outx(
            "This place seems quite pleasant, though the other girls seem to be looking at you with barely-concealed jealousy bordering on rage.  A svelte figure steps through the shade.  You recognize him as the smallest of your brood, the minitaur.   He's completely naked, and though his pheremones are weaker than his larger kin, his mere presence is enough to make your pussy sloppy-wet.  The other girls crawl towards him, pawing at his legs and promising him the velvet tightness of their pussies.  His dick goes rock hard and immediately sets to dripping all over them, his need painfully visible by the trembling of his balls and the blood pulsing through his swollen cock.\n\n",
            false
        );

        this.outx(
            "The runt forces his way through the girls, ignoring their pouts of disappointment as he comes to you.  \"<i>Hey... the others are still celebrating adding you to the harem.  I thought maybe I could make sure you're adjusting, and... umm, if you're okay with it, I'm REALLY pent up.  They don't usually let me into the harem,</i>\" admits the minitaur, looking back at the door with a bit of worry in his eyes.\n\n",
            false
        );

        this.outx(
            "You giggle.  Lazing around all day and getting to suck the cum from dozens of minotaurs all the time?  This is heaven.  Sure, you were supposed to be out there fighting the demons, but you kept letting the big, hairy beasts force themselves on you over and over, until you weren't even sure why you were resisting.  Now?  There's a dick with a drizzle of pre-cum leaking from the tip, just asking for you to slurp the cum out of it.  You'll stay anywhere if it means you get to suck it down and feel it exploding in your soaked nethers.\n\n",
            false
        );

        this.outx(
            `Nodding, you give the poor boy a lick, gripping his swollen shaft in your hand as you reach down to undo your ${
                this.player.armorName
            }.  You jump when the only thing your fingers bump into is your own ${this.player.skinFurScales()}.  It seems that during the journey here all your gear was removed from your body.  You're as naked as any of the other sluts in here!  At least your nudity will make it even easier for you to get the poor guy off.  Clothing yourself seems a wasted effort at this point.\n\n`,
            false
        );

        this.outx(
            "Cupping the heavy, shuddering ball-sack in your hand, you stroke the small minotaur's trembling shaft, setting off shivers of pleasure each time your fingers rub over the sensitive skin of his dick's three medial ridges.  Teasingly, you circle your tongue around his flare a few times, catching the fresh drops of pre that roll from his urethral opening to funnel back into your mouth.  He gasps, clearly loving your touches and wanting to blow, but unable from a few licks and a handjob alone.  Sensing his need, you ram the flat, wide-spread tip of his dick through your lips and suck hard, fully engorging his flare while your spit soaks into his bestial skin.\n\n",
            false
        );

        this.outx(
            "You give the tiny beast-man's heavy balls a loving squeeze and jerk back, letting the swollen dick pop out of your oral prison and hang there, wet with saliva.  Shaking with a need of your own, you rise and bend ",
            false
        );
        if (!this.player.isNaga()) this.outx("over");
        else this.outx("back, snake-like");
        this.outx(
            ` to present your ${this.vaginaDescript()}'s needy opening to the smallest of your sons.  It's all the invitation he needs.  The rigid tool between his thighs shoots forward, lodging the animalistic head in your well-lubricated opening and giving your sloppy lips a burst of exquisite pleasure.  Sliding forward, the magnificent minotaur tool buries itself in your sopping cunt as if it was meant to be there, its passage made easy by spit, potent mino-spunk, and your own liquid need.\n\n`,
            false
        );

        this.outx(
            "The minitaur looks down at you with a thankful expression on his monstrous muzzle.  The image is only broken by the lusty way he lets his tongue hang from his mouth as he mounts you, a few drops of saliva falling as he forgets himself in the passion of taking you.  A tiny rivulet of his constant, dripping pre-seed escapes from around his girth as he pushes in, finally butting his tip at your cervix, the slack skin of his sheath seeming to caress your labia and clitoris.  You squeal in happiness, feeling warmth spread outward from your pussy as more of his essence dribbles inside of you.\n\n",
            false
        );

        this.outx(
            `Already experiencing a pleasant buzz and tingle, you grab his hips and throw yourself against him, bouncing the both of you in the pillowy room, grunts and moans of passion teasing the other girls as you're fucked with wild abandon by one they crave.  Your ${this.vaginaDescript()} is like a furnace of lust, the fires of need inside only growing hotter with every stroke of wonderful minotaur-cock.  Panting, the smallest of your beast-men does his best to fuck you, and though his member is nowhere near as large as his brother's swollen shafts, the thick, pent-up drugs he's dripping into your uterus are keeping you so close the edge.\n\n`,
            false
        );

        this.outx(
            `You feel like you're floating, cushioned in a bed of clouds with every nerve firing off nothing but pleasure and happiness.  There's a wet, slap-slap-slap nagging at you, but you close your eyes and forget it, letting your fingers play across your ${this.chestDesc()} to `
        );
        if (this.player.hasFuckableNipples())
            this.outx(
                "slide inside your nipple-cunts and finger your chest pussies in a small approximation of what's happening below.",
                false
            );
        else if (this.player.biggestLactation() >= 1)
            this.outx(
                "tug and pull at your drippy nipples, releasing thick flows of creamy milk.",
                false
            );
        else this.outx("tug at your achy nipples.");
        this.outx(
            `  Moaning like a whore, you gasp and pant under your bovine lover, lost to the world and nearly screaming in delight each time your ${this.vaginaDescript(
                0
            )} contracts around its invader.  Your eyes roll back and you howl, finally obtaining the climax you've desired.  The knowledge that it's your son's rough fucking that's getting you off only makes the orgasm stronger.  Realizing you'll never leave this place, you accept your fate and let your body tell you what to do, and for now, what it wants to do is keep cumming.\n\n`,
            false
        );

        this.outx(
            "The rhythmic contractions around his rod set off the minitaur.  His heavy balls bounce against your body as they churn and jiggle, pumping an obscene amount of cum through the thick cock lodged in your twat.  You can feel his flare straining at your cervix, the urethra pumping a torrent of spooge ",
            false
        );
        if (this.player.pregnancyIncubation == 0) this.outx("inside your empty womb");
        else this.outx("against the plugged entrance of your pregnant womb");
        this.outx(
            `, releasing so much that a squirt of it escapes to run down your ${this.player.leg()}.  That was just the first spurt!  The second burst of semen fills every nook and cranny of your ${this.vaginaDescript()}, your entrance turning to a frothy mess of white goo and slippery lady-spunk.  The pent-up pecker keeps flexing in orgasm, firing jet after jet of narcotic cream into your semen-spurting box, the pillows under you quickly soaking up the excess, addictive jizz.\n\n`,
            false
        );

        this.outx(
            `Your son sighs and slumps down, his cock slowly slipping from your abused vulva, escaping with a wet 'pop'.  A river of white rolls out of your body to further stain the room's furnishings.  You shudder from the sensation as a it triggers a series of tiny, miniature climaxes.  While you're lost to the pleasure, the minitaur departs with noticeably less bulge in his loincloth.  At the same time, the other girls crowd around you, scooping up what they can save of your boy's liquid love and shoveling it into their greedy, whorish maws.  The cow-girl industriously sets to work, using her massive tongue on your ${this.vaginaDescript()} to scoop out every drop she can get.  You cum on her face, splattering her with spooge and your feminine moisture.  She smiles and kisses your still-sensitive clit, throwing you into a black-out inducing orgasm.`
        );
        this.player.orgasm();
        this.dynStats("int", -10, "lib", 10, "sen", 10);
        this.doNext(this.minotaurGangBadEnd2);
    }

    // [Next]
    private minotaurGangBadEnd2(): void {
        this.outx("", true);
        this.spriteSelect(94);
        this.outx("<b>Some time later...\n</b>", false);

        this.outx(
            "You blink your eyes, trying to adjust to the daylight.  The hut full of pillows has been your home for the past few months, and you never once considered leaving it.  Most of your time has been spent on your back, on a lap, or on all fours.  Of course when you're pregnant you don't get quite as much sex, but they'll still jam a dick down your throat and pump your gut full of cum whenever you ask.  You blush and remember just how often you ask.  The other girls are still a little jealous of just how much love your sons shower you in.  They'll come around soon enough - the cow-girl is already your best friend.  Even though you don't know each other's names, both of you spend about as much time 69'ing as getting plowed by the tribe.\n\n",
            false
        );

        this.outx(
            "Today, they're leading all of you out into the center of town.  You can see a dozen stocks, one for each of you, with one left over.  Shrugging, you let yourself be lead up to them.  They haven't fucked any of you since you woke this morning, so you're sure whatever this ordeal is about, it's going to result in each of you getting to take a few loads in one of your holes.  If you're lucky, you'll get stuffed in all of them.\n\n",
            false
        );

        this.outx(
            `Once you're stopped, you place your head and arms through the holes.  They've been lined with padded leather, much to your delight.  You give your ${this.buttDescript()} a seductive wiggle, but all it earns you is a rough smack.  Moaning in mixture of disappointment and delight, you turn your head to watch the other girls take their place.  At the end of the line, the minitaur is blushing shamefully and allowing himself to be slotted into place.  The poor boy.  You try to tend to him whenever you can sneak a chance, but the others are always so rough on him.  With all the new members in the tribe, the current harem simply hasn't been big enough to satisfy them all.  It seems that for now, he's stuck being one of the girls.\n\n`,
            false
        );

        this.outx(
            'A hush settles over the crowd as they stand their, ogling the plump, juicy rumps of their loyal harem.  Those on the other side are tenting their loinclothes, eyeing the parted, drooling lips of their bitches.  A familiar, deep voice booms, "<i>Fuck.</i>"  Your eldest never was much for talking.\n\n',
            false
        );

        this.outx(
            "As usual, the biggest, most potent members of the tribe are crowding around you, jockeying for the first go at one of your holes.  You try to say, \"<i>Be gentle boys, I'll take care of all of you.</i>\"  A cock silences you after the second syllable and turns your articulate speech into a slutty hum of satisfaction.  You lap the sweat from the underside of the shaft and relax your throat to let it enter deeper.  The cock twitches from your mouth's tightness, and you suck down hard, happy to pull a dollop of cream into your throat.  Musky fur tickles at your nose, and you realize you're already deepthroating his entire cock.  You can feel it stretching your throat, dilating your oral passage wider than it was ever meant to be.  It fills you in the most fantastic way, but at the same time, another of your orifices aches for something... anything... to push inside it.\n\n",
            false
        );

        this.outx(
            `There's bickering behind you for a moment, accompanied by the sounds of fists striking flesh.  Thankfully, it dies down after a moment, the sounds of violence fading and swiftly being drowned out by the wet slurps of pussies devouring thick rods.  Your ${this.vaginaDescript()} joins the chorus of liquid slurps with a messy squelch of its own.  Rivulets of pussy-juice slick down your ${this.player.legs()} and turn the dirt to mud below you.  With every pregnancy, your honey-pot has only gotten wetter.  `
        );
        if (this.player.wetness() >= 5)
            this.outx(
                "Sure, you were a squirter before, but now, you'll squirt a half-dozen times even before you orgasm.",
                false
            );
        else
            this.outx(
                "Sure, you could get plenty wet before, but now, you'll be squirting and drizzling before you even orgasm.",
                false
            );
        this.outx(
            "  The quim-soaked cock pulls out long enough to leave you wanting, then slides back home, setting a nice, fast pace for your fuck.\n\n",
            false
        );

        this.outx(
            "You purr around the thick, throat-stretching tool, enjoying your violent penetration.  The twin pillars of lust tremble in both ends of your body, and encouraged by how easily they seem to be getting off, you start tilting your head left and right, rotating your pre-cum-soaked esophagus around the beast-cock.  It stretches wide and explodes, too pent up to last long in such a tight orifice.  Mercifully, the flare is so far down your throat that you don't even have to swallow.  It just burbles the copious load straight into your belly.  You're a little disappointed you're not getting to taste it on your tongue, but there's always the next stud in line.\n\n",
            false
        );

        this.outx(
            'Chemicals wick into your bloodstream, starting a chain reaction that makes your sopping, stuffed cunt squirt around its owner\'s cock and your head grow dizzy.  The swollen shaft in your mouth softens and withdraws, giving you the chance to scream, "<i>Fuck, yes, fuck me boys!  Fuck Momma hard!</i>"\n\n',
            false
        );

        this.outx(
            `You're cut back off by an even bigger member just as the cunt-ravaging horse-cock stuffing your box explodes.  There's an immediate and familiar rush of euphoria, arousal, and fuzzy-headedness sweeping through you, making you giggle into the lip-stretching dick now gaping your mouth.  Your womb floods, your ${this.vaginaDescript()} squirts, and your ${this.player.legs()} flop about lamely, as your body tries to cope with the onslaught of narcotic, orgasmic pleasure.  Pregnancy seems certain from that single stud's deposit.\n\n`,
            false
        );

        this.outx(
            "He's pulled back and replaced, and you wonder which of your boys is getting sloppy seconds.  Who cares, as long as you get to feel him cum in you until you go dizzy!",
            false
        );
        this.player.orgasm();
        this.dynStats("lib", 100, "sen", 100);
        this.getGame().gameOver();
    }

    // [Discipline Eldest]
    private disciplineEldestMinotaurSon(): void {
        this.outx("", true);
        this.spriteSelect(94);
        this.outx(
            "Your wayward sons thought that they could get the drop on you.  Their macho machismo blinded them to the fact that they were nowhere in your league.  You sigh as you realize they will probably try to coax you into fucking them next time.  What is a mother to do?  As you loom over their battered bodies, they look up to you with eyes full of longing and engorged, twitching dicks.  You return their gaze by cracking your knuckles, causing your brutish progeny to cringe in fear.  Scrambling to their hooves, they all begin to make a hasty retreat.  The largest of your minotaur sons trips over his own hooves in a desperate attempt to flee from his mother.  When he tries to get back up, you put your weight on him, holding him down.  He turns his head back, trembling at the sight of you standing on his tail.\n\n",
            false
        );

        this.outx(
            '"<i>Are you the oldest?</i>" you ask him with crossed arms and a stern gaze.\n\n',
            false
        );

        this.outx(
            '"<i>Yeah,</i>" he snorted, trying to put up a facade of bravery.  He turns over, now lying on his back as if lounging on the ground.\n\n',
            false
        );

        this.outx(
            '"<i>Explain yourself,</i>" you demand.  "As the oldest, you\'re supposed to set an example for your younger brothers."\n\n',
            false
        );

        this.outx(
            '"<i>A mother is supposed to set an example, and the only example you\'ve set is being a dirty whore,</i>" he laughs.  "<i>Is it so wrong to want to give Mom her cum fix?</i>"\n\n',
            false
        );

        this.outx(
            "Dissatisfied with your son's response, you promptly smack the taste out of his mouth, reminding him who has the real power.  The force of the smack causes him to simper like the minitaur he no doubt abuses routinely.  Sometimes a mother has to give her son some tough love.\n\n",
            false
        );

        this.outx(
            `After the slap, you quickly remove the lower portion of your ${
                this.player.armorName
            }, your son's wandering eyes meets your ${this.vaginaDescript(
                0
            )}.  He's clearly pleased with what he sees; his equine-like cock twitches with approval and anticipation.  You certainly are not mother of the year; your womanhood glistens with sexual excitement.  Leaning down, you grab his chin with your right and force him to look you in the eyes.\n\n`,
            false
        );

        this.outx(
            "\"<i>Your dick isn't getting any of mommy's pussy,</i>\" you coo to him, causing him to sink into despair.\n\n",
            false
        );

        this.outx(
            '"<i>I-I just wanted to show you how much I love you,</i>" he said with a hint of honesty in his voice.\n\n',
            false
        );

        this.outx(
            `"<i>And wreck my pussy while you're at it?</i>" you point out, remembering one of the comments said during battle.  Before he has the chance to come up with some half-baked excuse, you grab the bull by the horns and thrust his head forward, silencing him with your ${this.vaginaDescript(
                0
            )}.  "<i>If you want to show mommy how much you love her, then fuck my cunt with your tongue,</i>" you demand.\n\n`,
            false
        );

        this.outx(
            `The burly beast is clearly unaccustomed to pleasuring another.  His eyes glance back up to you in confusion, unsure of what he's supposed to do.  For a few moments, his snout is just pressed against your skin.  When you give him a disapproving gaze, he begins to lick you with fervor.  Your son has absolutely no finesse at all.  His broad tongue sloppily slurps all over your ${this.vaginaDescript(
                0
            )}.  In between his vehement slurps, his cold snout unintentionally caresses you.  The cold sensation of his snout is quickly overwhelmed by the warmth of his breath and tongue.  Your body trembles from the unexpected pleasure your amateurish son provides.\n\n`,
            false
        );

        this.outx(
            `Everything else is a foggy haze to your son.  You can see he has given himself up to pleasure you and nothing more.  His eyes are glazed over with lust, losing himself with each lick.  When you glance between your thighs, you can see his balls have swelled up to the size of beach balls!  His aching member throbs as pre-cum oozes from his exposed urethra. If you wanted, you could plunge your cunt down and relieve him, but that would defeat the purpose of the punishment.  Despite the cluelessness of his foreplay, his tongue against your shining lips feels fucking good!  With a smile, you caress your son, encouraging him to continue.  A sudden increase in his slurping is all that it takes for you to reach your peak.  Your ${this.vaginaDescript(
                0
            )} spasms, drenching his mouth in your girl cum.  With increased zeal, he laps up as much of your sweet juices as he can.  Your running girl-cum eventually drips down to his aching member.  A cruel, cruel torture, your son whimpers as he's denied release.\n\n`,
            false
        );

        this.outx(
            "Finished with your son, you push him on his back.  You have had enough of him, for now... If he dares to ambush you again, then you will be more than happy to discipline him again.  After getting dressed, you proceed to walk away.  Your last image of your son is the image of him futilely masturbating, but his cock is too thick and too numb for him to truly get off.  Profoundly amused, you leave the mountains and return to camp.",
            false
        );
        this.player.orgasm();
        this.doNext(this.cleanupAfterCombat);
    }
}
