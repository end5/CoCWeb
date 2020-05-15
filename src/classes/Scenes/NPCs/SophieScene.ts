import { BaseContent } from "../../BaseContent";
import { TimeAwareInterface } from "../../TimeAwareInterface";
import { PregnancyStore } from "../../PregnancyStore";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { CoC } from "../../CoC";
import { trace } from "../../../console";
import { PerkLib } from "../../PerkLib";
import { SophieBimbo } from "./SophieBimbo";
import { SophieFollowerScene } from "./SophieFollowerScene";
import { Sophie } from "./Sophie";
import { Harpy } from "../Areas/HighMountains/Harpy";
import { StatusAffects } from "../../StatusAffects";
import { CocSettings } from "../../CoC_Settings";
import {
    VAGINA_WETNESS_SLAVERING,
    VAGINA_WETNESS_SLICK,
    VAGINA_WETNESS_WET,
    VAGINA_WETNESS_DROOLING,
} from "../../../includes/appearanceDefs";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";

export class SophieScene extends BaseContent implements TimeAwareInterface {
    public pregnancy: PregnancyStore;

    public constructor() {
        super();
        this.pregnancy = new PregnancyStore(
            kFLAGS.SOPHIE_PREGNANCY_TYPE,
            kFLAGS.SOPHIE_INCUBATION,
            0,
            0
        );
        this.pregnancy.addPregnancyEventSet(PregnancyStore.PREGNANCY_PLAYER, 150, 120, 100);
        // Event: 0 (= not pregnant),  1,   2,   3,  4 (< 100)
        CoC.timeAwareClassAdd(this);
    }

    private checkedSophie = 0; // Make sure we test this event just once in timeChangeLarge

    // Implementation of TimeAwareInterface
    public timeChange(): boolean {
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00283] > 0) return false; // Nothing can happen if she's been kicked out or disappeared off into the mountains
        let needNext = false;
        this.checkedSophie = 0;
        this.pregnancy.pregnancyAdvance();
        trace(
            `\nSophie time change: Time is ${this.model.time.hours}, incubation: ${this.pregnancy.incubation}, event: ${this.pregnancy.event}`
        );
        if (this.flags[kFLAGS.SOPHIE_ANGRY_AT_PC_COUNTER] > 0)
            this.flags[kFLAGS.SOPHIE_ANGRY_AT_PC_COUNTER]--;
        if (
            this.flags[kFLAGS.SOPHIES_DAUGHTERS_DEBIMBOED] == 1 &&
            this.sophieFollowerScene.sophieFollower() &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0
        ) {
            this.sophieFollowerScene.sophieDaughterDebimboUpdate();
            needNext = true;
        }
        if (!this.sophieAtCamp()) {
            // Could be at the farm or still in the wild
            if (
                this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0 &&
                this.pregnancy.isPregnant &&
                this.pregnancy.incubation == 0
            ) {
                // As long as she's not at the farm it's alright to lay eggs
                this.flags[kFLAGS.SOPHIE_EGGS_LAID]++; // Before she moves in she just produces harpies in the mountains
                this.pregnancy.knockUpForce(); // Clear Pregnancy
            }
        } else {
            // She might be a bimbo, debimboed or normal, but she's a follower and presently at camp
            if (this.flags[kFLAGS.SOPHIE_CAMP_EGG_COUNTDOWN] > 0) {
                // Maturation of the egg she laid
                this.flags[kFLAGS.SOPHIE_CAMP_EGG_COUNTDOWN]--;
                if (this.flags[kFLAGS.SOPHIE_CAMP_EGG_COUNTDOWN] == 0) {
                    this.sophieBimbo.sophiesEggHatches();
                    needNext = true;
                }
            }
            if (this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] > 0) {
                // Maturation of her daughter into an adult
                this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER]--;
                if (this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] < 1) {
                    this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] = 1;
                } else {
                    switch (this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER]) {
                        case 100:
                        case 200:
                        case 325:
                            this.sophiesDaughterDescript(); // At these three times we need to output a message about her daughters
                            needNext = true;
                        default:
                    }
                }
            }
            if (this.pregnancy.isPregnant) {
                if (this.pregnancy.type == PregnancyStore.PREGNANCY_PLAYER) {
                    const triggeredEvent: number = this.pregnancy.eventTriggered();
                    switch (triggeredEvent) {
                        case 1:
                        case 2:
                        case 3:
                            this.sophiesPregnancyDescript(triggeredEvent);
                            needNext = true;
                            break;
                        default:
                            if (this.pregnancy.incubation == 0) {
                                this.sophieBimbo.sophieBirthsEgg();
                                this.pregnancy.knockUpForce(); // Clear Pregnancy
                                this.flags[kFLAGS.SOPHIE_CAMP_EGG_COUNTDOWN] =
                                    150 + SophieScene.rand(30); // This long till that egg hatches
                                this.flags[kFLAGS.SOPHIE_HEAT_COUNTER] = 551; // After pregnancy she waits 23 days before going into heat again
                                needNext = true;
                            }
                    }
                }
                if (this.flags[kFLAGS.SOPHIE_HEAT_COUNTER] >= 552) {
                    // She got knocked up while in heat
                    if (this.sophieBimbo.bimboSophie()) this.sophieBimbo.sophieGotKnockedUp();
                    else this.sophieFollowerScene.sophieFertilityKnockedUpExpired();
                    this.flags[kFLAGS.SOPHIE_HEAT_COUNTER] = 551;
                    needNext = true;
                }
            } else {
                // She's in camp and not pregnant
                if (this.flags[kFLAGS.SOPHIE_HEAT_COUNTER] == 0) {
                    // Tick over into heat if appropriate
                    if (this.player.hasCock()) {
                        if (this.sophieBimbo.bimboSophie()) this.sophieBimbo.sophieGoesIntoSeason();
                        else this.sophieFollowerScene.sophieFollowerGoesIntoSeas();
                        this.flags[kFLAGS.SOPHIE_HEAT_COUNTER] = 720;
                        needNext = true;
                    }
                } else {
                    this.flags[kFLAGS.SOPHIE_HEAT_COUNTER]--;
                    if (this.flags[kFLAGS.SOPHIE_HEAT_COUNTER] == 552) {
                        // Expire heat if it counts down to 552
                        if (this.sophieBimbo.bimboSophie())
                            this.sophieBimbo.sophieSeasonExpiration();
                        else this.sophieFollowerScene.sophieFertilityExpired();
                        needNext = true;
                    }
                    if (
                        this.model.time.hours == 10 &&
                        (this.player.findPerk(PerkLib.LuststickAdapted) < 0 ||
                            SophieScene.rand(3) == 0) &&
                        this.sophieBimbo.bimboSophie() &&
                        !this.sophieBimbo.sophieIsInSeason() &&
                        this.flags[kFLAGS.SOPHIE_CAMP_EGG_COUNTDOWN] == 0
                    ) {
                        this.sophieBimbo.bimboSophieLustStickSurprise();
                        needNext = true;
                    }
                }
            }
        }
        return needNext;
    }

    public timeChangeLarge(): boolean {
        if (this.checkedSophie++ == 0 && this.model.time.hours == 6) {
            if (
                this.flags[kFLAGS.NO_PURE_SOPHIE_RECRUITMENT] == 0 &&
                this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0 &&
                this.flags[kFLAGS.SOPHIE_FOLLOWER_PROGRESS] >= 5 &&
                !this.pregnancy.isPregnant &&
                this.player.hasCock() &&
                !this.sophieAtCamp()
            ) {
                this.sophieFollowerScene.sophieFollowerIntro();
                return true;
            }
            if (this.flags[kFLAGS.SLEEP_WITH] == "Sophie" && this.player.hasCock()) {
                if (
                    this.sophieBimbo.bimboSophie() &&
                    this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0 &&
                    SophieScene.rand(2) == 0 &&
                    this.player.cockThatFits(this.sophieBimbo.sophieCapacity()) >= 0
                ) {
                    this.outx("\n<b><u>Something odd happens that morning...</u></b>");
                    if (this.pregnancy.event >= 2) this.sophieBimbo.fuckYoPregnantHarpyWaifu(true);
                    else this.sophieBimbo.sophieFenCraftedSex(true);
                    return true;
                }
                if (
                    this.sophieFollowerScene.sophieFollower() &&
                    this.player.lust >= 50 &&
                    this.player.smallestCockArea() <= 5 &&
                    this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0
                ) {
                    this.sophieFollowerScene.sophieSmallDongTeases();
                    return true;
                }
            }
        }
        return false;
    }
    // End of Interface Implementation

    // Harpy MILF.  Hellzyeah
    // -More fertile than average harpy.
    // -In 'Upper Mountain' area (High Mountain?)
    // -Blurb about other harpies flying away as PC approaches.
    // -Too lazy/encumbered by her unusual breasts to fly away?
    // -Asks PC for honey, sometimes is pissy and attacks
    /*
    Sophie vars:
    -Met Sophy?
    -Had Sex With Sophie Counter
    -Breastfeed Sophie Counter
    -Sophie Pissed Off?

    Sophie max size:
    -232

    Harpy Hard Status:
    Min lust of 50 or adds 10 to min lust.
    Lasts 4-8 hours.
    */

    // 'Luststick' status
    // v1 - time remaining
    // 50% chance to boost lust by 20-21(not reduced) every hour
    // Forces minimum lust to be at least 50.

    private get sophieBimbo(): SophieBimbo {
        return kGAMECLASS.sophieBimbo;
    }

    private get sophieFollowerScene(): SophieFollowerScene {
        return kGAMECLASS.sophieFollowerScene;
    }

    public sophieAtCamp(): boolean {
        // Whether she's a bimbo or not
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00283] > 0) return false;
        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] != 0) return false;
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0) return true;
        if (this.flags[kFLAGS.SOPHIE_RECRUITED_PURE] > 0) return true;
        return false;
    }

    public sophiesDaughterDescript(): void {
        if (this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] == 325) {
            this.outx(
                "\nYour cute little harpy is still just a little chick.  Her body is small and childlike, and her feathers are fluffy and poofy, making your little girl look like she has puffballs for arms and legs.  Already looking to be four or five years old, the baby harpy is just as energetic as a human child of that age.  She flutters around and scrambles from one thing to another. Thankfully, the rambunctious little darling runs out of explosive energy quickly, suddenly falling to the ground into a fluffy heap for a quick nap.\n"
            );
        }
        if (this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] == 200) {
            this.outx(
                "\nYour sweet little harpy is starting to grow up!  Her body is much bigger than it was before, though her baby fat has spread out over her larger form and looks more lean and lanky then the big-butted harpies you're used to seeing.  Her feathers have even started to smooth out, though she is still quite the fluffball.  You're sure that it won't be too long before the curves harpies are known for start to appear.  The energy she exuded as a little chick still drives her to 'terrorize' your camp, scampering around, fluttering from place to place and getting into all kinds of things.  Your fluffy daughter seems to be able to stay active for longer than before, though you still see her curl up for a nap every so often.\n"
            );
        }
        if (this.flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] == 100) {
            this.outx("\nLooking around for your developing daughter, you find that she and your ");
            if (this.sophieBimbo.bimboSophie()) this.outx("boisterous bimbo ");
            else this.outx("mature harpy ");
            this.outx(
                "are spending some quality mother-daughter time together.  Sophie is helping the young girl with her make up, showing her how to use that golden luststick that her people are so fond of.  You're not too sure how appropriate that is for your daughter, but then again, this is what harpies do right?  Aside from the lusty lipstick, your live-in"
            );
            if (this.sophieBimbo.bimboSophie()) this.outx(" bimbo ");
            else this.outx(", avian girlfriend ");
            this.outx(
                "moves on to her hair and nails, all the while gabbing on and on about you, and about all the daughters she plans to have."
            );
            this.outx(
                "\n\nYour daughter is growing up so fast!  Already, her body is developing, breasts budding into supple bumps on her chest.  Her hips are starting to swell into the trademark birthing hips and round grabbable ass harpies are famous for.\n"
            );
        }
    }

    public sophiesPregnancyDescript(triggeredEvent: number): void {
        if (triggeredEvent == 1) {
            if (this.sophieBimbo.bimboSophie()) {
                this.outx(
                    "\nSophie sits by herself on your comfy bedroll.  The feathery female seems to have taken a liking to your place of rest.  Your bird-brained love-slave clearly desires to be close to you, or at least your fatherly scent, as much as possible.  Lost in her lusty fantasies, she caresses the gentle bump in her belly, the telltale sign that your virile seed has worked its magic on her egg-bearing womb.  One of her hands idly slips between her legs, fingers gently playing with her wet snatch as her other rubs her tummy."
                );
                this.outx(
                    "\n\nFinally noticing your gaze on her body, Sophie looks up at you with an amorous smile, her thick, fertile thighs spreading and showing off her tight puffy pussy to you.  The blond bimbo puts her pregnant body on display for you, to show you the result of your virility and to entice you into playing with her hot, lusty form.\n"
                );
            } else {
                this.outx(
                    "\nSophie sits by herself on your comfy bedroll.  The feathery female seems to have taken a liking to your place of rest.  Your well-endowed monster-girl lover clearly desires to be as close to you, or at least your fatherly scent, as much as possible.  Lost in her lusty fantasies, she caresses the gentle bump in her belly, the telltale sign that your virile seed has worked its magic on her egg-bearing womb.  One of her hands idly slips between her legs, fingers gently playing with her wet snatch as her other rubs her tummy."
                );
                this.outx(
                    "\n\nFinally noticing your gaze on her body, Sophie looks up at you with an amorous smile, her thick, fertile thighs spreading and showing off her tight puffy pussy to you.  The matron puts her pregnant body on display for you, to show you the result of your virility and to entice you into playing with her hot, lusty form.\n"
                );
            }
            this.dynStats("lus", 3);
        }
        // Medium Bump*
        else if (triggeredEvent == 2) {
            if (this.sophieBimbo.bimboSophie()) {
                this.outx(
                    "\nAs usual, Sophie is laying on your bedroll.  Each day the fertile swell in her stomach seems to grow bigger with the egg inside.  The positively pregnant woman idly strokes her egg-bearing belly with motherly affection.  She even coos to the growing bump as she caresses her body, clearly loving the fact that she is pregnant with another egg.  It's not long before she catches sight of you; a big silly smile breaking across her puffy lips as she hurriedly gets up from your blankets and bounds over to you.  With each step, her voluptuous body jiggles and bounces, her big bountiful bosom heaving and shaking, her ripe round rump quivering like jelly as she sways her fecund hips for you."
                );
                this.outx(
                    '\n\n"<i>There you are [name]!  Like, look at me!  Your egg is getting <b>soooo</b> big inside me!  Like, just look at how big and sexy I am!</i>"  the bimbo brained woman tweets as she presses her curvaceous body against you, making sure you can feel her big soft tits and growing baby bump.  From how her body feels, you\'re sure her already bountiful bimbo-like breasts have only gotten bigger thanks to her pregnancy.  "<i>Thanks for getting me all pregnant and stuff!</i>"\n'
                );
            } else {
                this.outx(
                    "\nAs usual, Sophie is laying on your bedroll.  Each day the fertile swell in her stomach seems to grow bigger with the egg inside.  The positively pregnant woman idly strokes her egg-bearing belly with motherly affection.  She even coos to the growing bump as she caresses her body, clearly loving the fact that she is pregnant with another egg.  It's not long before she catches sight of you; a big silly smile breaking across her lips as she hurriedly gets up from your blankets and bounds over to you.  With each step, her voluptuous body jiggles and bounces, her big bountiful bosom heaving and shaking, her ripe round rump quivering like jelly as she sways her fecund hips for you."
                );
                this.outx(
                    '\n\n"<i>Hey there [name].  Look at me!  That egg has gotten so big inside me.  You have no idea how good this feels,</i>" the confident woman tweets as she presses her curvaceous body against you, making sure you can feel her big soft tits and growing baby bump.  From how her body feels, you\'re sure her already bountiful breasts have only gotten bigger thanks to her pregnancy.  "<i>Maybe in a month or so, I\'ll let you do it all over again...</i>"\n'
                );
            }
            this.dynStats("lus", 5);
        }
        // Big Belly Bump*
        else if (triggeredEvent == 3) {
            if (this.sophieBimbo.bimboSophie()) {
                this.outx(
                    "\nOnce again, your pregnant bimbo lounges on your bedroll, her face buried in your pillow and taking deep breaths of your scent.  Even with her in such a - vulnerable... position, face down and ass up, you can clearly see the big, round bulge of her egg-laden belly.  With your feathery slut so gravid, you're sure it won't be long until she lays that womb-straining egg.  As if sensing your gaze, Sophie starts to sway her round spankable ass, her legs seeming to spread a little wider as well.  Your suspicions prove correct when she looks back at you; her plump bimbo lips blowing you a kiss as she looks at you with lusty eyes."
                );
                this.outx(
                    "\n\nThe amorous harpy practically leaps out of your bed, her voluptuous body bouncing with each step as she bounds over to you.  Despite her heavily pregnant state, Sophie seems to carry herself well, the milfy harpy well adapted at being heavy with egg.  Taking advantage of your momentary distraction, the excited, happy bimbo flounces at you, tackling you and cuddling you happily.  She presses her egg-heavy belly and massive, perky tits against you and says, \"<i>Ohhh!  It's gonna be soon, momma Sophie's gonna like, lay this nice big egg for you, babe!</i>\"  Leaning in, she plants a big wet kiss on your cheek before sliding her hands down to her round bulging belly.  \"<i>It's going to be a really big egg too!  Don't worry, I'm good at laying eggs, and my pussy's going to stay niiice and tight for you, babe!</i>\"\n"
                );
            } else {
                this.outx(
                    "\nOnce again, your pregnant harpy lounges on your bedroll, her face buried in your pillow and taking deep breaths of your scent.  Even with her in such a - vulnerable... position, face down and ass up, you can clearly see the big, round bulge of her egg-laden belly.  With the feathery slut so gravid, you're sure it won't be long until she lays that womb-straining egg.  As if sensing your gaze, Sophie starts to sway her round spankable ass, her legs seeming to spread a little wider as well.  Your suspicions prove correct when she looks back at you; her pursed lips blowing you a kiss as she looks at you with lusty eyes."
                );
                this.outx(
                    "\n\nThe amorous harpy practically leaps out of your bed, her voluptuous body bouncing with each step as she bounds over to you.  Despite her heavily pregnant state, Sophie seems to carry herself well, the milfy harpy well adapted at being heavy with egg.  Taking advantage of your momentary distraction, she flounces at you, tackling you and cuddling you happily.  She presses her egg-heavy belly and massive, perky tits against you and says, \"<i>It's gonna be time soon...  Before you know it, I'll be popping out this big, swollen egg, and you'll be right there to see it!</i>\"  Leaning in, she plants a big wet kiss on your cheek before sliding her hands down to her round bulging belly.  \"<i>It's going to be a really big egg too!  Don't worry, I'm good at laying eggs, and my pussy is going to be ready for you as soon as it comes out!</i>\"\n"
                );
            }
            this.dynStats("lus", 5);
        }
    }

    // [Discovery]
    public meetSophie(): void {
        this.sophieBimbo.sophieSprite();
        // increment met tag
        this.flags[kFLAGS.MET_SOPHIE_COUNTER]++;
        this.outx("", true);
        this.outx(
            "You make the grueling trek through mountain passes with slow, weary determination.  As you get higher, you feel almost like you could reach out and touch the omnipresent clouds that surround the summit.  The fluttering of dozens of harpy wings fills the air when you get close to their nesting area.  They flutter off and circle in the distance, seemingly content to watch you for now.  You glance around and discover numerous egg-filled nests before deciding it would be wise to stay away from those. The mothers haven't gone far.  Climbing higher, you take special care not to disturb the nests, but the effort is wasted.\n\n",
            false
        );

        this.outx(
            "While hauling yourself up onto a particularly narrow ledge, you come face to face with a harpy's alien visage.  She must have heard you climbing and come to investigate.  Now she's scant inches away from you, looking ",
            false
        );
        if (this.player.tallness <= 48) this.outx("down ");
        else if (this.player.tallness >= 72) this.outx("up ");
        this.outx(
            'at you with her curious, amber eyes.  A faint sweet scent wafts from her, and she licks her yellow-glossed lips with a long, pointed tongue.  You step to the side in an attempt to get away from the sharp drop-off behind you, but the harpy grabs your shoulders with both her hands and with a remarkably reassuring tone, says, "<i>Relax cutey, I won\'t drop you.</i>"\n\n',
            false
        );

        this.outx(
            "The harpy smiles ingratiatingly when she feels your muscles start to relax, and you're given a chance to get a good, close look at her.  She has two pairs of wings: a large set that sprout from her back and a secondary set that appear to be a combination of arm and wing.  The smaller pair thickens behind the wrists, displaying long, lustrous plumage.  What you had assumed to be pink hair is actually a mass of long, downy feathers that hang to her shoulders.  The last and hardest thing to ignore is her breasts.  Compared to the tiny buds on the harpies you spooked earlier, this woman's tits are MASSIVE.  They'd be at least DD on a human of similar size!\n\n",
            false
        );

        this.outx(
            `"<i>Awww, how nice of you to notice my breasts!  The other harpies are so mean to me because of them... I think they're jealous,</i>" suggests the harpy.  She pulls a hand off your shoulder and begins to preen her 'hair' with it, arranging the feathers into a more pleasing configuration as she introduces herself, "<i>I don't get to see many cute ${this.player.mf(
                "boys",
                "girls"
            )} like yourself up here, and it's hard to fly very far with such heavy breasts weighing you down.  My name's Sophie!  What brings a delicious morsel like yourself to my little nest?</i>"\n\n`,
            false
        );

        if (this.player.cor < 33) this.outx("In the interest of politeness, ");
        else if (this.player.cor < 66) this.outx("Barely remembering your manners, ");
        else this.outx("Desiring to spread your name throughout all of this land, ");
        this.outx(
            "you wrench your gaze away from her breasts and introduce yourself.  It's hard to stay focused on introduction while she's wrapping her wing-like arms around her tits and squeezing them together, amplifying her cleavage.  The matronly harpy is looking at you expectantly, and it occurs to you that she's still waiting on an answer to her question.  Why did you come here?\n\n",
            false
        );

        // [Looking for Demons] [Sex] [Got Lost] [Foraging]
        this.simpleChoices(
            "Foraging",
            this.tellSophieYoureForagingForStuff,
            "Got Lost",
            this.sophieMeetingGotLost,
            "Look4Demons",
            this.sophieLookingForDemons,
            "Sex",
            this.sophieMeetingChoseSex,
            "",
            undefined
        );
    }

    // [Repeat Meeting]
    public meetSophieRepeat(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        // (Pissed)
        if (this.flags[kFLAGS.SOPHIE_ANGRY_AT_PC_COUNTER] > 0) {
            this.outx(
                "During your exploration of the mountains you wind up passing close to the harpy nests again.  Uh oh.  There's a constant, irritating buzz in the background that makes it hard to focus on what you're doing.  You crest a ledge and find yourself back on the edge of Sophie's nest.  Shit.  She glowers at you and raises one of her talons.  It's a fight!\n\n",
                false
            );
            this.startCombat(new Sophie());
            return;
        }
        // (Has dick)
        if (this.player.totalCocks() > 0) {
            // (Random Rape)
            if (SophieScene.rand(2) == 0 && !this.pregnancy.isPregnant) {
                this.outx(
                    "During your exploration of the mountains you wind up passing close to the harpy nests again, and Sophie flaps her way over to you.  Her breasts jiggle pleasantly and she hooks her talons through the belt you use to hold your pouches before you can stop her.  The force of her flapping wings pulls you off the mountain, suspending you hundreds of feet above the ground as she flies you back towards her nest.  ",
                    false
                );
                if (this.player.tallness > 72)
                    this.outx(
                        "The harpy struggles with your weight and is clearly out of breath by the time she gets you up to her nest.",
                        false
                    );
                else
                    this.outx(
                        "The flight is thankfully brief, and she actually gives you a good view of the mountain-side as she brings you up to her nest.",
                        false
                    );
                this.outx(
                    `  Sophie releases her talons and you drop smartly onto the far side.  She pants, "<i>It's breeding time.  ${this.player.mf(
                        "Boy",
                        "Girl"
                    )}, fertilize me; NOW.</i>"\n\n`,
                    false
                );

                // (low lust?)
                if (this.player.lust < 60 || SophieScene.rand(3) <= 1) {
                    this.outx(
                        "Her need amplifies the compulsion, making it difficult to resist.  It looks like if you turned her down now she'd probably try to force herself on you anyway.  Do you give in to her demand?",
                        false
                    );
                    // [Yes-Consentual sex] [No - fight]
                    this.simpleChoices(
                        "Yes",
                        this.consensualSexSelector,
                        "No",
                        this.fightSophie,
                        "",
                        undefined,
                        "",
                        undefined,
                        "",
                        undefined
                    );
                }
                // (high lust?)
                else {
                    this.outx(
                        "Her need amplifies the compulsion, and as turned on as you already are, there's no way you could resist.",
                        false
                    );
                    // To sex
                    this.doNext(this.consensualSexSelector);
                }
                return;
            }
            // (Have sexed)
            if (this.flags[kFLAGS.FUCKED_SOPHIE_COUNTER] > 0) {
                this.outx(
                    "During your exploration of the mountains you wind up passing close to the harpy nests again, and Sophie flaps her way over to you.  Her breasts jiggle pleasantly and she hooks her talons through the belt you use to hold your pouches before you can stop her.  The force of her flapping wings pulls you off the mountain, suspending you hundreds of feet above the ground as she flies you back towards her nest.  ",
                    false
                );
                if (this.player.tallness > 72)
                    this.outx(
                        "The harpy struggles with your weight and is clearly out of breath by the time she gets you up to her nest.",
                        false
                    );
                else
                    this.outx(
                        "The flight is thankfully brief, and she actually gives you a good view of the mountain-side as she brings you up to her nest.",
                        false
                    );
                this.outx(
                    "  Sophie releases you and flops down across from you, clearly tired.  She asks, \"<i>Did you climb all the way up here to see me?  That's sooo sweet!  ",
                    false
                );
                if (this.pregnancy.isPregnant)
                    this.outx(
                        "I still haven't laid your egg, but if you want it might be fun to take care of your naughty little urges.",
                        false
                    );
                else
                    this.outx(
                        "I already laid your last egg, so why don't you come over her and give momma some sugar?",
                        false
                    );
                this.outx(
                    '</i>"  Her thighs spread apart, inviting you back for more of her pleasure.\n\n',
                    false
                );
            }
            // (Haven't sexed)
            else {
                this.outx(
                    `During your exploration of the mountains you wind up passing close to the harpy nests again.  You hear a faint buzzing on the breeze but ignore it, focusing instead on climbing the rocky mountain.  Pulling yourself up a ledge, you find yourself face-to-face with Sophie the harpy once again.  She's pinching one of her nipples and stroking around the entrance to her sodden twat.  It's flushed bright pink with desire and Sophie explains in between pleasured gasps, "<i>I've been thinking about you since the last time I saw you, cutey.  I'm normally a horny bundle of fuck anyway, but I'd sure love for a virile ${this.player.mf(
                        "boy",
                        "breeder"
                    )} like yourself to fertilize my eggs.</i>"  She spreads her legs wide and leans back, giving you an offer that's part suggestion, part command, "<i>Come here and put it inside me.  I promise I'll be tighter than a virgin and wetter than a succubus.</i>"\n\n`,
                    false
                );
            }
            this.outx(
                "(Her words sink into you, and a desire to go with her threatens to overcome your self-control.  You take a deep breath and clear your head.  Do you go with her, turn her down, or try to take control and be the dominant one?  You'll probably have to fight her in order to dominate her...)",
                false
            );
            this.dynStats("lus", 20);
            // [Yes – consentacle sex] [No – sad harpy]
            this.simpleChoices(
                "Yes",
                this.consensualSexSelector,
                "No",
                this.shootDownSophieSex,
                "Dominate",
                this.fightSophie,
                "",
                undefined,
                "",
                undefined
            );
            return;
        }
        // (NO DICK)
        else {
            // (NO LACTATE)
            if (this.player.biggestLactation() < 1) {
                this.outx(
                    `Your climb manages to take you back into the harpy nests again.  Sophie flutters down next to you and warns, "<i>Cutey, a ${this.player.mf(
                        "neuter",
                        "girl"
                    )} like you doesn't belong up here.  The younger harpies don't really get the idea of conversation and see you as competition.</i>"\n\n`,
                    false
                );

                this.outx(
                    "Do you see the wisdom of her words and climb back down the mountain, fight Sophie, or keep climbing?",
                    false
                );
                this.simpleChoices(
                    "Fight Sophie",
                    this.FirstTimeSophieForceSex,
                    "Keep Climbing",
                    this.PCIgnoresSophieAndHarpyIsFought,
                    "",
                    undefined,
                    "",
                    undefined,
                    "Leave",
                    this.camp.returnToCampUseOneHour
                );
                return;
            }
            // (LACTATE)
            else {
                this.outx(
                    'Your climb manages to take you back into the harpy nests again.  Sophie flutters down next to you and licks her lips hungrily.  She asks, "<i>Would you mind coming up to my nest and sharing some of your milk?  I\'ve worked up quite a craving for cute girl-milk.</i>"\n\n',
                    false
                );
                this.outx("Do you agree to breastfeed the hungry harpy?");
                this.simpleChoices(
                    "Yes",
                    this.cramANippleInIt,
                    "No",
                    this.shootDownSophieSex,
                    "Fight Her",
                    this.FirstTimeSophieForceSex,
                    "",
                    undefined,
                    "",
                    undefined
                );
                // No(cramANippleInIt,shootDownSophieSex);
                // [Yes][No]
                return;
            }
        }
        this.doNext(this.camp.returnToCampUseOneHour);
        this.outx("SOMETHING SCREWY HAPPENED IN SOPHIE'S MEETING", true);
        return;
    }
    private consensualSexSelector(): void {
        this.sophieBimbo.sophieSprite();
        if (this.player.cockThatFits(232) < 0) this.consensualSophieSexNoFit();
        else this.consensualHotSophieDickings();
    }

    private fightSophie(): void {
        this.sophieBimbo.sophieSprite();
        this.startCombat(new Sophie());
        this.flags[kFLAGS.SOPHIE_ANGRY_AT_PC_COUNTER] += SophieScene.rand(24);
        this.playerMenu();
    }

    // [Yes]
    private repeatBreastFeeding(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx(
            "You agree and climb the rest of the way up to her nest, finding Sophie waiting for you there.",
            false
        );
        // – to consentual breastfeeding.
        this.doNext(this.cramANippleInIt);
    }
    // Normal Harpy Fight
    private PCIgnoresSophieAndHarpyIsFought(): void {
        this.outx("A harpy wings out of the sky and attacks!", true);
        this.startCombat(new Harpy());
        this.spriteSelect(26);
    }

    // [Looking for Demons]
    private sophieLookingForDemons(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx(
            "Sophie throws her head back and laughs. \"<i>Don't worry about any demons here.  Any time a demon is dumb enough to wander too close to our nests, we give him a 'foot-job' he won't forget.</i>\"  To illustrate, the busty harpy lifts her leg and proudly displays her razor-sharp talons.",
            false
        );
        // Check her out if you're in the mood or dirty-minded
        // Requires wang
        if (
            (this.player.cor > 60 || this.player.lust > 60 || this.player.lib > 70) &&
            this.player.hasCock()
        ) {
            this.outx(
                "  In spite of the danger of the situation, your gaze drops between her legs to her completely exposed sex.  You nod in agreement with her, buying a few extra seconds to inspect her vagina.  Tinged pink, it's much larger than a human's; perhaps due to the size of the eggs she lays?\n\n",
                false
            );
        }
        // Otherwise leave.
        else {
            this.outx(
                "  You gulp and nod, understanding quite clearly that the harpies don't care for demons in their nesting grounds.  Sophie smiles and turns about, fluffing purple-tinted tail-feathers at you in what is clearly a dismissal.",
                false
            );
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        this.outx('"<i>Mmmm, have you gotten bored of the talk, ', false);
        if (this.player.tallness <= 48) this.outx("little ");
        else if (this.player.tallness >= 72) this.outx("big ");
        this.outx(
            `${this.player.mf(
                "boy",
                "girl"
            )}?  You seem to see something you want,</i>" observes the curvaceous bird-woman. "<i>Come into my nest, ${
                this.player.short
            }; it's been sooo long since I've been properly... fertilized.</i>"  Sophie relaxes as she awaits your response.\n\n`,
            false
        );

        this.outx(
            "Her words sink into you, and a compulsion to go with her threatens to overcome your self-control.  You take a deep breath and clear your head.  Do you go with her?",
            false
        );

        // [Yes – consentacle sex] [No – sad harpy]
        this.doYesNo(this.consensualSexSelector, this.shootDownSophieSex);
    }
    // [No]
    private shootDownSophieSex(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx(
            'Sophie pouts for a moment, leaning forward to better display her cleavage. "<i>Really?  Well if you change your mind, come back and visit me.</i>"  She turns around and fluffs her tail-feathers at you in what is clearly a dismissal.  You climb down, careful to avoid any other nests as you head back to check on your camp and its portal.',
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
        if (this.player.lib > 25) this.dynStats("lib", -1);
        if (this.player.lust > 50) this.dynStats("lus", -5);
    }

    // [Sex]
    private sophieMeetingChoseSex(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        // (FEMALE\Unsexed)(Genderless –  forces Leave.)
        if (this.player.totalCocks() == 0) {
            this.outx("Sophie looks you up and down");
            if (this.player.hasVagina())
                this.outx(
                    ' and insists, "<i>Well, keep looking; if I wanted a girl I\'d be busy with one of my nieces right now.</i>"',
                    false
                );
            this.outx(
                ".  She turns around and fluffs her tail-feathers at you in what is clearly a dismissal.",
                false
            );
            if (this.player.hasVagina()) {
                this.outx("  What do you do?");
                // [Stay&Sex] [Leave]
                this.simpleChoices(
                    "Force Sex",
                    this.FirstTimeSophieForceSex,
                    "Leave",
                    this.camp.returnToCampUseOneHour,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined
                );
                return;
            }
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // (Haz dick (male futa))
        else {
            this.outx(
                "Sophie retreats to the far side of the nest and spreads her well-muscled thighs invitingly.  The harpy demands, \"<i>Well come on then, it's been so long since I've had such a virile young specimen servicing me.  Don't make me wait, cutey.</i>\"\n\n",
                false
            );

            this.outx("As if you could deny the curvy, sexy body of the motherly harpy...");
            // [To consentual sex]
            this.doNext(this.consensualSexSelector);
            return;
        }
    }
    //  [Stay&Sex] – starts combat
    private FirstTimeSophieForceSex(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx(
            "You say, \"<i>I'm not going anywhere until I'm satisfied.  Don't worry, I'll be sure to give you a few licks back.</i>\"\n\n",
            false
        );

        this.outx(
            "Sophie's large eyes widen in surprise at your statement, and her wings unfold as she counters, \"<i>Then you'll have to hope you can handle me.</i>\"  Her foot comes up warningly.\n\n",
            false
        );
        this.outx("It's going to be a fight!");
        this.startCombat(new Sophie());
    }

    // [Got Lost]
    private sophieMeetingGotLost(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx(
            "You explain that you were exploring the mountains and sheepishly admit that you got lost.  Sophie giggles, \"<i>Well then, you're fortunate I was here.  Some of the other girls, they might have taken advantage of you.  The younger harpies are so busy getting fertilized and laying eggs that they don't have much appreciation for good company and pleasant conversation like I do.</i>\"\n\n",
            false
        );

        // (Incongruity here: she disdains the young ones for wanting to fuck instead of talk and then jumps right to wanting to fuck. Not that cougars aren't dumb as hell. - Z)

        this.outx(
            'The older harpy reclines in her nest and dips a hand between her muscled thighs while she talks, "<i>',
            false
        );
        if (this.player.totalCocks() > 0) {
            this.outx('Would you stay and help a lonely matron with her needs?</i>"\n\n', false);
            // [To consensual sex or sophie sadface.
            this.doYesNo(this.consensualSexSelector, this.shootDownSophieSex);
        } else if (this.player.biggestLactation() >= 1.5) {
            this.outx(
                "My, you're quite the laden little cow aren't you?  Would you mind sharing?</i>\"\n\n",
                false
            );
            // to b. feeding or sophie sadface.
            this.doYesNo(this.cramANippleInIt, this.shootDownSophieSex);
        } else {
            this.outx(
                "Mmm, it's a shame you don't have a penis, or you could show me what I was missing.</i>\"  The sexually deprived bird-woman plies you with questions about the world for the better part of an hour, masturbating to several mid-conversation orgasms.  Once she exhausts herself, she thanks you and leans down for her nap.  Her tail-feathers fluff in what is clearly a dismissal.",
                false
            );
            // (+10 + libmod lust, +1 int up to 50 int))
            this.dynStats("lus", 10 + this.player.lib / 4);
            if (this.player.inte < 50) this.dynStats("int", 1);
            // [Go to camp if neither of the above]
            this.doNext(this.camp.returnToCampUseOneHour);
        }
    }

    // [Foraging For Supplies]
    private tellSophieYoureForagingForStuff(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx(
            "You explain to her that you were merely searching for supplies that would aid you in your quest.  Sophie's eyes narrow dangerously as she warns you, \"<i>Don't even think of our eggs as food!  Of course, I'm sure a cute little morsel like you would never do that.  What's this about a quest?</i>\"\n\n",
            false
        );

        this.outx(
            "It takes a little while to make her understand the situation, but after a lengthy explanation the harpy finally gets it.   She doesn't comprehend your reasons, but at least she knows how important your mission is to you.   Sophie sighs, clearly bored with the discussion, and spreads her sizable thighs to begin circling a finger around the large, puffy entrance to her pussy.  Your eyes widen a bit at her brazen masturbation while your body heats with arousal of its own.  Though her posture is open, the shameless harpy doesn't seem to want a partner.  You take the hint that she's through talking and climb back down.\n\n",
            false
        );

        // (+10 + libmod lust, +1 int up to 50 int))
        this.dynStats("lus", 10 + this.player.lib / 4);
        if (this.player.inte < 50) this.dynStats("int", 1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Harpy Breastfeeding]
    private cramANippleInIt(): void {
        this.sophieBimbo.sophieSprite();
        this.player.boostLactation(0.01);
        this.outx("", true);
        // Not a combat win
        if (!this.getGame().inCombat)
            this.outx(
                `Sophie steps back and drops onto her knees, balancing herself with her wings.   You pull your ${
                    this.player.armorName
                } open with deliberate slowness, exposing your ${this.allBreastsDescript()} one at a time.  Sophie licks her lips as she patiently awaits the sharing of your bounty.\n\n`,
                false
            );
        // COMBAT
        else {
            // (Lust Win)
            if (this.monster.lust > 99)
                this.outx(
                    "Sophie pants and pulls herself up to her knees.  She barely keeps her balance as she rams four of her fingers deep into her dripping pussy, fiddling at her clit with her thumb.  The harpy opens her mouth to beg for your milk with her glossy lips as you slowly undress.\n\n",
                    false
                );
            // (HP Win)
            else
                this.outx(
                    `You pull the dazed and defeated harpy up to her knees.  She sways unsteadily as you undress and expose your ${this.allBreastsDescript()} to the cool mountain air.   Sophie's eyes open wider as she struggles back to consciousness, and the hungry harpy happily opens her mouth into a wide 'O', begging for your milk.\n\n`,
                    false
                );
        }

        this.outx(
            "You make yourself comfortable in the soft, padded nest and pull Sophie down on top of you.  Her glossy amber lips pucker and probe at your chest as she tries to find a nipple.   The harpy doesn't resist at all when you place a hand on the back of her head and guide her towards your ",
            false
        );
        if (this.player.breastRows.length > 1) this.outx("top-");
        this.outx(
            `left-most ${this.nippleDescript(
                0
            )}.  Her mouth latches on and begins to suckle; her lips tickle your sensitive tit-flesh and leave a pleasant tingle.  Sophie grunts and moans around the nipple as she masturbates.\n\n`,
            false
        );

        // (Low PG)
        if (this.player.biggestLactation() < 2) {
            this.outx(
                `She suckles harder and harder until your feel your milk let down.  A pleasant trickle of your breast-milk leaks from your ${this.nippleDescript(
                    0
                )} into her mouth.  Sophie's arms close around your back, allowing her to lock herself onto you as she giddily sucks down your liquid nutrients.  The expression on her `
            );
            if (this.monster.HP < 1) this.outx("battered ");
            else this.outx("lusty ");
            this.outx(
                "visage is one of pure satisfaction, and you wonder at her strange love of milk.  The harpy empties the first nipple and moves on to the ",
                false
            );
            if (this.player.totalNipples() > 2) this.outx("next");
            else this.outx("other");
            this.outx(", closing her eyes and relaxing in your embrace.");
            if (this.player.totalNipples() > 2) {
                this.outx(
                    "  This nipple doesn't last long either, and she's forced to move on to the next, ",
                    false
                );
                if (this.player.totalNipples() < 5) this.outx("before finishing the last one.");
                else this.outx("and the next, continuing until you're quite empty.");
            }
            this.outx("\n\n", false);
        }
        // (Medium PG)
        else if (this.player.biggestLactation() < 3.5) {
            this.outx(
                `She suckles hard, but it seems unnecessary given how quickly your milk lets down.  Breast-milk gushes into her mouth and causes her eyes to widen at the speed of the flow.   Her arms lock around your back in a firm embrace, as if she were worried you'd pull back and deny her.  She struggles to swallow all the milk you're putting out, but the expression on her face is one of pure bliss.  You have to wonder just what would make a bird love milk this much.  Her eyes droop closed while she relaxes against your ${this.nippleDescript(
                    0
                )}.  The milk eventually runs dry, and she has to move on to your `
            );
            if (this.player.totalNipples() == 2) this.outx("other ");
            else this.outx("next ");
            this.outx(
                `${this.nippleDescript(
                    0
                )}.  The suckling goes on nearly as long as it did with the first, until she finishes.`
            );
            if (this.player.totalBreasts() > 2) {
                if (this.player.totalNipples() > 2)
                    this.outx(
                        `She drinks from each of the nipples that adorn your ${this.allBreastsDescript()} until her belly is full and gurgling.`
                    );
                else
                    this.outx(
                        "She drinks from each breast in turn until her belly is full and gurgling.",
                        false
                    );
            } else if (this.player.totalNipples() > 2)
                this.outx(
                    "She drinks from each nipple in turn until her belly is full and gurgling.",
                    false
                );
            this.outx("\n\n", false);
        }
        // (High PG)
        else {
            this.outx(
                `She suckles hard for a moment, and winds up sputtering at the flood of milk that you produce.  Breast-milk gushes over her face, and she can only look on with a ecstatic pleasure at what she's started.  Sophie leans forward and latches back on, her throat swallowing visibly and often as she struggles to keep up with your milk-flow.  Her arms close around your back and lock together in an effort to hold onto you, even as your milk squirts out from the corners of her mouth.  Her blissful expression makes you wonder just what would make a harpy love milk so much.  Her eyelids droop while she relaxes against the ${this.nippleDescript(
                    0
                )}.  The suckling goes on and on, until your milk slows to a reasonable trickle.  Content to have drained one milk-spout, Sophie moves on to the `
            );
            if (this.player.totalNipples()) this.outx("other ");
            else this.outx("next ");
            this.outx("one and begins the cycle anew.");
            if (this.player.totalNipples() >= 4)
                this.outx("  With all your nipples, this goes on for quite some time.");
            this.outx("\n\n", false);
        }

        this.outx("Sophie pulls back with ");
        if (this.player.biggestLactation() >= 3.5)
            this.outx("an incredibly loud burp and blushes red.");
        else if (this.player.biggestLactation() >= 2) this.outx("a satisfied burp.");
        else this.outx("a satisfied 'ahhh'.");
        this.outx('  She wipes a bit of milk from her lips and says, "<i>', false);
        if (this.getGame().inCombat) {
            // (Fought HP won:
            if (this.monster.HP < 1)
                this.outx(
                    "You know you don't have to beat me up to get me to drink your milk right? It's too delicious to turn down!</i>\"\n\n",
                    false
                );
            // (Fought Lust won:
            else {
                this.outx(
                    "Mmmm, you sure know how to get a woman's blood pumping before you give her what she wants, don't you?",
                    false
                );
                // (Dick:
                if (this.player.totalCocks() > 0)
                    this.outx("  Maybe you'll let me try your 'other' milk next time?");
                this.outx('</i>"', false);
                if (this.player.totalCocks() > 0) {
                    this.outx(
                        '  The harpy laughs and caresses your backside tenderly as she whispers, "<i>It\'s been a long time, you know...</i>"\n\n',
                        false
                    );
                    this.dynStats("lus", 25);
                } else this.outx("\n\n", false);
            }
            this.flags[kFLAGS.SOPHIE_FOLLOWER_PROGRESS] = 0;
        }
        // (Volunteered:
        else {
            this.outx(
                "Delicious!  It's been so long since I've had someone to bring me such fresh milk.",
                false
            );
            if (this.player.totalCocks() > 0) {
                this.outx(
                    "  Maybe you'll let me try your 'other' milk next time?</i>\"  The harpie laughs and caresses your backside tenderly as she whispers, \"<i>It's been a long time, you know...</i>\"\n\n",
                    false
                );
                // (+25 lust)
                this.dynStats("lus", 25);

                // Only progress the recruitment path if Sophie sees the players cock.
                this.flags[kFLAGS.SOPHIE_FOLLOWER_PROGRESS]++;
            } else this.outx('</i>"\n\n', false);
        }
        // prevent lactation reduction and slightly boost
        this.player.boostLactation(0.1);
        this.outx(
            "The busty harpy rubs her full belly as she disentangles herself from you.  She accidentally gives a cute little burp and colors crimson.  To hide her embarrassment, she turns and dismisses you with a wave of her tail-feathers.  It looks like Sophie was rather happy with how things turned out.",
            false
        );
        if (this.player.cor > 60)
            this.outx(
                "  You give her wide ass a playful slap and start climbing down before she can retaliate.",
                false
            );
        this.dynStats("lus", -50);
        // increment times bfed.
        this.flags[kFLAGS.BREASTFEAD_SOPHIE_COUNTER]++;
        if (this.getGame().inCombat) this.cleanupAfterCombat();
        else this.doNext(this.camp.returnToCampUseOneHour);
        // You've now been milked, reset the timer for that
        if (this.player.findStatusAffect(StatusAffects.Feeder) >= 0) {
            this.player.addStatusValue(StatusAffects.Feeder, 1, 1);
            this.player.changeStatusValue(StatusAffects.Feeder, 2, 0);
        }
    }

    // [Consensual Secks – Requires Dick]
    private consensualHotSophieDickings(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.flags[kFLAGS.SOPHIE_FOLLOWER_PROGRESS]++;
        const x: number = this.player.cockThatFits(232);
        if (x < 0) {
            CocSettings.error("");
            this.outx("ERROR: No cock found that fits, yet 'fits' scene was called.", true);
            this.doNext(this.playerMenu);
            this.getGame().inCombat = false;
            return;
        } else if (x > this.player.cocks.length - 1) {
            CocSettings.error("");
            this.outx(
                "ERROR: Cock above max cocks selected for Sophie sex.  Please report bug on fen's bug report forum.",
                true
            );
            this.doNext(this.playerMenu);
            this.getGame().inCombat = false;
            return;
        }

        this.outx(
            `With her spread thighs beckoning you so invitingly, there's no way you could resist.  You tear off your ${this.player.armorName} and jump into her nest with her, hardening delightfully from your close proximity to the well-endowed woman.  Sophie places a hand `
        );
        if (this.player.biggestTitSize() < 1) this.outx("on your chest");
        else this.outx(`between your ${this.allBreastsDescript()}`);
        this.outx(
            `, tracing up and down your ${this.player.skinDesc} with slow, measured strokes.  She boasts, "<i>The last time a willing mate found his way up to my nest, it only took a few moments for him to fertilize me.  He just couldn't handle all this.</i>"  She pulls you into her breasts for emphasis and squeezes them around your head.\n\n`,
            false
        );

        this.outx(
            `Sophie releases you from her bountiful bosom, but you take your time coming back out; you even stop to lick one of her pert nipples.  The harpy takes you by the hips and pulls you on top of her, squeezing your ${this.assDescript()} for good measure.   With `
        );
        if (this.player.biggestTitSize() >= 1) this.outx("her breasts rubbing against your own");
        else {
            if (this.player.tallness <= 48) this.outx("her breasts pressed into your face");
            else this.outx("her breasts pressing against your stomach");
        }
        this.outx(", ");
        if (this.player.totalCocks() > 1) this.outx("each of ");
        this.outx(
            `your ${this.multiCockDescriptLight()} begins to poke and prod against her crotch and slightly parted slit.  `
        );
        if (this.player.cockArea(x) <= 6) {
            this.outx(
                "She frowns and asks, \"<i>Is that all there is?  You're so small you may as well get rid of it and become a girl!  You'd be a cute little girl, you know that?</i>\"",
                false
            );
        } else if (this.player.cockArea(x) < 150) {
            this.outx(
                "She grins and teases, \"<i>What are you waiting for?  You aren't intimidated by how big my pussy is, are you?  Trust me, my muscles will make it plenty tight for you.  What you should be concerned about is how you're taking advantage of a needy older woman, you pig.</i>\"",
                false
            );
        } else {
            this.outx(
                "Her eyes widen in delight, but she teases you anyway, \"<i>Oh by Marae, you're quite the big boy aren't you?  Are you sure I can take that?  Forcing such a huge, delicious member on a poor old woman, you should be ashamed!</i>\"",
                false
            );
        }
        if (this.player.cockTotal() > 1 && this.player.biggestCockArea() > 232) {
            this.outx(
                `  Her hands push away the bloated flesh of your ${this.cockDescript(
                    this.player.biggestCockIndex()
                )} in an effort to better get at your ${this.cockDescript(
                    x
                )}.  She grunts, "<i>Tempting, but too much of a good thing.</i>"`
            );
        }
        this.outx("\n\n", false);

        this.outx("Her teases and taunts sting far more than they should, ");
        if (this.player.cor < 75)
            this.outx(
                "making you feel terrible and shamed.  Your entire body flushes with embarrassment",
                false
            );
        else
            this.outx(
                "making you a bit irritated at the older harpy.  Your entire body flushes with anger and arousal",
                false
            );
        this.outx(
            " until the soft skin of her hand presses against your cheek and her voice soothes, \"<i>Don't worry, sweetheart.  It's what inside of you that made me want you.  To be precise, it's what's inside your ",
            false
        );
        if (this.player.balls > 0) this.outx("balls");
        else this.outx("cock");
        this.outx(
            `.  I've been milking cute ${this.player.mf(
                "studs",
                "herms"
            )} like you since the demons took over, and you're my latest conquest.  That's okay with you, right?  You don't mind me relieving all your pressure for my needy eggs do you?  Of course you don't.</i>"  Her words carry more weight than they ought to, chasing away any reluctance or worries from your mind and replacing them with acceptance.  Sophie really knows what she's doing.  She's seduced you to the point of penetration.  Being a conquest isn't that bad; you'll get to fuck this confident older woman until you're squirting all over her eggs.\n\n`,
            false
        );

        this.outx(
            `Sophie coos, "<i>Go on ${this.player.mf("boy", "girl")}, give your ${this.cockDescript(
                x
            )} a taste.</i>"  You oblige her request by rocking your hips forward, `
        );
        if (this.player.cockArea(x) <= 6)
            this.outx(`plunging your ${this.cockDescript(x)} inside the oversized vagina.`);
        else if (this.player.cockArea(x) <= 150)
            this.outx(`burying your ${this.cockDescript(x)} deep into her massive gash.`);
        else
            this.outx(
                `slowly working your ${this.cockDescript(
                    x
                )} into her massive gash, finding it barely big enough for you.`
            );
        this.outx(
            `  Her warm, feathery thighs close around behind you, locking their talons together to hold your ${this.cockDescript(
                x
            )} in the squelching wet walls of her pussy.  The act of her 'imprisoning' you causes the slippery walls to squeeze tightly about your girth, just as she promised.  Your hips rock with an ingrown need that's thwarted by Sophie's muscular thighs.  There is no thrusting, no repeated penetration.  There is only the slow rhythm of her muscles as they squeeze and massage your ${this.cockDescript(
                x
            )}.\n\n`,
            false
        );

        this.outx(
            "It feels good, but the inability to control the act in any way is driving you mad with desire.  ",
            false
        );
        if (this.player.tallness <= 48)
            this.outx(
                "You lean into her breasts and nuzzle her nipple for a moment before suckling it into your mouth.",
                false
            );
        else if (this.player.tallness < 72)
            this.outx(
                "You lean down and pull her breast up in order to suck the nipple into your mouth.",
                false
            );
        else
            this.outx(
                "You'd love to suck her nipple but you're just too tall, so you settle for pinching both of her nipples between your thumbs and fore-fingers.",
                false
            );
        this.outx(
            "  The harpy pants with pleasure and grabs your head with her hands, stroking behind your ears with her long-nailed, dextrous fingertips.  She pulls you ",
            false
        );
        if (this.player.tallness < 72) this.outx("up");
        else this.outx("down");
        this.outx(
            " and kisses you, regaining control and giving you a sweet taste of her mouth.  Her lips leave behind a pleasant tingle that seems to reach down into your groin and give your ",
            false
        );
        if (this.player.balls == 0) this.outx("prostate");
        else this.outx("balls");
        this.outx(" a squeeze.\n\n", false);

        this.outx(
            "You pant and groan when Sophie pulls back.  A strand of glittering, gold-tinted spit hangs between you as your eyes plead with her for release.  The harpy pulls your ",
            false
        );
        if (this.player.tallness <= 48) this.outx("head back down between her breasts");
        else
            this.outx(
                "body tightly against her, crushing her breasts in between the two of you",
                false
            );
        this.outx(
            `, and increases the tempo of her vaginal contractions.  Her leg muscles clench along with the perverted rhythm, forcibly shifting your position to rub her egg-stretched cunt in different ways.  She ruffles your hair and hums out a powerful command, "<i>Cum for me ${this.player.mf(
                "boy",
                "my sweet"
            )}; fertilize my eggs.</i>"\n\n`,
            false
        );

        this.outx(
            `The compulsion to obey rocks you to your core.  With the constant vice-like squeezing, you wouldn't be able to resist if you wanted to.  Your ${this.cockDescript(
                x
            )} twitches and begins to unload into your older lover's contracting love-tunnel.  Sophie pants, "<i>Good ${this.player.mf(
                "boy",
                "girl"
            )}!  Squirt it all out for me.</i>"   Her fingers trace through your ${this.hairDescript()} as you cum, and cum, and cum.`
        );
        if (this.player.cumQ() >= 500) {
            if (this.player.cumQ() < 1000)
                this.outx(
                    "  Jism starts to spurt from the harpy's pussy by the end, as you've filled her with more cum than her body can handle.",
                    false
                );
            else
                this.outx(
                    "  Jism spurts from the harpy's pussy in short order, as the huge eruptions of spooge overfill her poor, unprepared body.",
                    false
                );
            if (this.player.cumQ() >= 4000)
                this.outx(
                    "  Her nest is filled with enough spunk that it begins to run out over the lip, sliding down the rocks in a small river.",
                    false
                );
        }
        this.outx(
            "  You sigh as you squirt out every ounce of seed for the motherly harpy, until your ",
            false
        );
        if (this.player.balls > 0) this.outx(this.ballsDescriptLight(), false);
        else this.outx(`${this.cockDescript(x)} and prostate`);
        this.outx(" are aching and sore.\n\n", false);

        this.outx(
            'Completely spent by the encounter, you lean on her soft, downy chest and try to catch your breath.  Her tight tunnel continues to squeeze and churn, milking any last bits of goo from your urethra.  Sophie groans, "<i>Mmm, such potent seed for one so young.  ',
            false
        );
        if (this.flags[kFLAGS.FUCKED_SOPHIE_COUNTER] == 0) {
            this.outx(
                "Did you know in the old days we used to keep men trapped like this for a whole day?  We'd keep stroking them like this and get a whole days worth of orgasm.  It was magnificent.  Of course we're so fertile now a single orgasm is enough to fertilize an egg.  It looks like you got off lucky, huh?",
                false
            );
        } else if (this.flags[kFLAGS.FUCKED_SOPHIE_COUNTER] <= 2)
            this.outx(
                "You really like it when I milk you don't you?  That must be why you keep coming back for more.",
                false
            );
        else if (this.flags[kFLAGS.FUCKED_SOPHIE_COUNTER] <= 10) {
            this.outx("Do you have a fetish for ");
            if (SophieScene.rand(2) == 0) this.outx("older women");
            else this.outx("harpies");
            this.outx(
                `, or are you just falling in love with me?  It's been some time since I've had an admirer like you.  We had a word for ${this.player.mf(
                    "boys",
                    "sluts"
                )} like you – perverts.  I kid, I kid.  Perverts like you have such pent up, potent cum, and I know you love to give it to me.`
            );
        } else {
            this.outx(
                "You're hooked aren't you?  Shhh, don't answer.  I know you love to nuzzle my breasts and squirt in my pussy.  Come back soon so we can make some more eggs – the other girls have gotten sooo jealous of me.",
                false
            );
        }
        this.outx('</i>"\n\n', false);

        this.outx("Her legs slowly unwind and release you, letting you fall back ");
        if (this.player.cumQ() < 1000) this.outx("into the soft surface of her nest");
        else if (this.player.cumQ() < 4000)
            this.outx("into the soft, cum-slicked surface of her nest");
        else this.outx("into the massive cum-puddle you've turned her nest into");
        this.outx(".  You struggle up to your feet and marvel at how rigid ");
        if (this.player.cockTotal() > 1) this.outx("each of ");
        this.outx(` your ${this.multiCockDescriptLight()} remains.  Sophie giggles, "<i>`);
        if (this.flags[kFLAGS.FUCKED_SOPHIE_COUNTER] == 0) {
            this.outx(
                "Sorry cutey, the lip gloss is going to keep you nice and hard.  It's meant to help your ",
                false
            );
            if (this.player.balls > 0) this.outx("balls");
            else this.outx("body");
            this.outx(
                " fill back up with cum.  If you want, we could cuddle until it passes.",
                false
            );
        } else
            this.outx(
                "I'm sorry, I just got so caught up in the moment that I got you all kissed up on my lip-gloss, didn't I cutey?  Why don't you come snuggle with me for a few hours and I can stroke you until it wears off?",
                false
            );
        this.outx('</i>"\n\n', false);
        // Apply harpy status.
        this.luststickApplication(4);
        this.player.orgasm();
        // Sophiepreg
        this.sophieFucked();
        this.outx("Do you take her up on her offer?");
        // [Yes/No]
        this.doYesNo(this.postSophieSexSnuggle, this.postSexSophieSnuggleTurnedDown);
    }

    // [Yes]
    private postSophieSexSnuggle(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx(
            "You sprawl out in Sophie's nest and allow her to wrap her wings about you protectively.  Her hands stay busy the entire time, alternatively masturbating ",
            false
        );
        if (this.player.cockTotal() > 1) this.outx("each of ");
        this.outx(
            `your ${this.multiCockDescriptLight()} or her own cum-slicked twat.  The harpy gets herself off numerous times, clearly enjoying your discomfort and the fullness of her vagina.  After a few hours of this pleasure-hell you can feel your body dredging up another load, and Sophie whispers in your ear, "<i>Relax and squirt it all out for me.</i>"\n\n`,
            false
        );

        this.outx("Her feathers tickle ");
        if (this.player.cockTotal() > 1) this.outx("all of ");
        this.outx(`your ${this.multiCockDescriptLight()}`);
        if (this.player.balls > 0) this.outx(" and balls");
        this.outx(
            " while her hands stroke and squeeze, and in no time you're coming for the confident harpy again.  Ropes of white jism ",
            false
        );
        if (this.player.cumQ() < 50) this.outx("squirt over your body");
        else if (this.player.cumQ() < 500) this.outx("splatter your body");
        else if (this.player.cumQ() < 1000) this.outx("drench your body in thick waves of cum");
        else
            this.outx(
                "erupt over your body and send a thick river flowing down the mountain",
                false
            );
        this.outx(
            " as her skilled hands finish you off.  Sinking deeper into her embrace, you sigh, and begin to go soft at last.\n\n",
            false
        );

        this.outx("You thank her and ");
        if (this.player.cor > 50)
            this.outx(
                'nearly give her a good-bye kiss, but catch yourself at the last moment.  She quips, "<i>Too bad, it was nice.</i>"\n\n',
                false
            );
        else
            this.outx(
                'give her a kiss on the cheek, knowing all-too-well the dangers of her lips.  She quips, "<i>Ohh, too bad.  I wanted to stroke you to sleep.</i>"\n\n',
                false
            );
        // Remove luststick
        this.player.removeStatusAffect(StatusAffects.Luststick);
        // (+sensitivity, +libido
        this.dynStats("lib", 1, "sen", 1);

        // 4 hours pass
        this.doNext(this.camp.returnToCampUseFourHours);
    }

    // [No]
    private postSexSophieSnuggleTurnedDown(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx(
            "You turn down her offer and assure her that you'll be fine.  Sophie giggles while you try to get dressed, and you see her amber eyes watching you as try to climb back down the mountain with a stiffy.  She seems greatly amused by your predicament.",
            false
        );
        // (+sensitivity, +libido
        this.dynStats("lib", 1, "sen", 1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Consentual Sex No Fito]
    private consensualSophieSexNoFit(): void {
        this.sophieBimbo.sophieSprite();
        const x: number = this.player.biggestCockIndex();
        this.flags[kFLAGS.SOPHIE_FOLLOWER_PROGRESS]++;
        this.outx("", true);
        this.outx(
            `With her spread thighs beckoning you so invitingly, there's no way you could resist.  You tear off your ${this.player.armorName} and jump into her nest with her, hardening delightfully from your close proximity to the well-endowed woman.  Sophie places a hand `
        );
        if (this.player.biggestTitSize() < 1) this.outx("on your chest");
        else this.outx(`between your ${this.allBreastsDescript()}`);
        this.outx(
            `, tracing up and down your ${this.player.skinDesc} with slow, measured strokes.  She boasts, "<i>The last time a willing mate found his way up to my nest, it only took a few moments for him to fertilize me.  He just couldn't handle all this.</i>"  She pulls you into her breasts for emphasis and squeezes them around your head.\n\n`,
            false
        );

        this.outx(
            `Sophie releases you from her bountiful bosom, but you take your time coming back out; you even stop to lick one of her pert nipples.  The harpy takes you by the hips and pulls you on top of her, squeezing your ${this.assDescript()} for good measure.   With `
        );
        if (this.player.tallness <= 48) this.outx("her breasts pressed into your face");
        else if (this.player.tallness < 72) {
            this.outx("her breasts rubbing against your ");
            if (this.player.biggestTitSize() >= 1) this.outx("own");
            else this.outx("chest");
        } else this.outx("her breasts pressing against your stomach");
        this.outx(
            `, your ${this.cockDescript(
                x
            )} begins to grow along the bottom of the nest.  It rubs her lower lips delightfully as it lengthens underneath her.   Her eyes go wide with shock and she exclaims, "<i>That's bigger than a minotaur's!  Just because I've laid a few hundred eggs in my time doesn't mean I can fuck a monstrous giant-cock.  You do realize that with a pecker like that you belong in some demonic zoo, rather than in a beautiful harpy's nest.</i>"\n\n`,
            false
        );

        if (this.player.cor < 50)
            this.outx(
                "Her teases and taunts sting far more than they should, making you feel terrible and shamed.  Your entire body flushes with embarrassment ",
                false
            );
        else
            this.outx(
                "Her teases and taunts sting far more than they should, making you feel irritated and humiliated.  Your entire body flushes with forced embarrassment ",
                false
            );
        this.outx(
            `until the soft skin of her hand presses against your cheek and her voice soothes, "<i>Don't worry, sweetheart.  It's what's INSIDE of that beast that makes me want you.  I've been milking cute ${this.player.mf(
                "studs",
                "herms"
            )} like you since the demons took over, and you're just my latest conquest.  That's okay with you right?  You don't mind me relieving all that pressure for my needy eggs do you?  Of course you don't.</i>"  Her words carry more weight than they ought to, chasing away any reluctance or worries from your mind and replacing them with acceptance.  Sophie really knows what she's doing.  You're unwilling or unable to resist her humiliating advances, and the worst part is: you don't mind.   Being a conquest won't be so bad; she IS going to let you pack her cunt with cum...\n\n`,
            false
        );

        this.outx(
            `Sophie's wings curl forward past her shoulders and gently push you away.   As you flop into the soft lining of the nest, your ${this.cockDescript(
                x
            )} rises to point up at the sky.  The harpy's wing-like arms encircle you with feathery softness, tickling at your base.  She starts sliding her body up and down along the length of your shaft with the large orbs of her breasts crushed against your member.  Sophie asks in a voice that sounds more like command than question, "<i>Are you going to give me a taste, ${
                this.player.short
            }?  I'd like to know what kind of cum will be seeding my womb.</i>"\n\n`,
            false
        );

        this.outx(
            `She leans down and gives you a kiss on the lips before whispering, "<i>Be a good ${this.player.mf(
                "boy",
                "girl"
            )} and squeeze out a little pre-cum for momma.</i>"  She squeezes tightly around your base and drags her feathery arms up to the ${this.player.cockHead(
                x
            )}, milking out a `
        );
        if (this.player.cumQ() < 50) this.outx("small dollop");
        else if (this.player.cumQ() < 250) this.outx("dollop");
        else if (this.player.cumQ() < 1000) this.outx("large squirt");
        else this.outx("torrential gush");
        this.outx(
            ` of pre-cum.  Sophie coos, "<i>Such a fertile ${this.player.mf(
                "boy",
                "girl"
            )},</i>" and slurps down the sticky treat with a knowing smile.  She turns about and lets her tail-feathers tickle your face, then sits down on your stomach.  As light as she is it doesn't bother you much, and the unexpectedly soft bottoms of her bird-like feet begin rubbing `
        );
        if (this.player.balls > 0)
            this.outx(
                `your ${this.ballsDescriptLight()}, careful not to snag them with her talons`
            );
        else this.outx("your thighs, careful not to snag you with her talons");
        this.outx(
            `.  The muscled flesh of her thighs contracts in a vice-like grip, acting like a cock-ring and forcing even more blood into your already over-aroused ${this.cockDescript(
                x
            )}.\n\n`,
            false
        );

        this.outx(
            `Your body twists and squirms underneath her, aching for more stimulation, more aroused than it should be.  Your grunts and moans grow to a feverish intensity until Sophie leans back to place a finger on your lips.  She commands, "<i>Shush now; I know the pollen in my lip-gloss makes it hard not to cum right away, but you need to wait until I'm ready for your seed.</i>"  You whine plaintively but it's no use.  It feels like orgasm is so close that you could reach out and touch it, but it just won't come.  Sophie giggles cruelly and circles your bloated ${this.player.cockHead(
                x
            )} with her fingertip, assuring you: "<i>You can cum soon, I promise.  Just wait; once your tip is in my pussy you'll cum out all your seed.  Your harpy queen commands it!</i>"  Her words seem... heavy, somehow; like they have some force or weight behind them.\n\n`,
            false
        );

        this.outx(
            `Sophie stands up and begins to flap her wings, kicking up dust and debris and forcing you to shield your eyes as she lifts off the ground.  Her hands lock onto your ${this.cockDescript(
                x
            )} and guide her over top of it.  Beads of wetness drip from her vagina and roll over your tender, sensitive skin as she lowers herself down, planting your ${this.player.cockHead(
                x
            )} inside her egg-widened pussy lips.  Her primary wings flap in a frenzy, struggling to hold her aloft without the aid of her arms, but you barely notice.  Your ${this.cockDescript(
                x
            )} is cumming and cumming HARD for the matronly harpy, filling her waiting womb with spunk.`
        );
        if (this.player.cumQ() >= 1000) {
            this.outx(
                "  In no time her belly distends and she slides off, stuffed with more gooey whiteness than she can handle.",
                false
            );
            if (this.player.cumQ() >= 2000)
                this.outx(
                    "  You continue to spurt, soaking yourself and the nest with waves of spooge until it is as filled as she is.",
                    false
                );
            if (this.player.cumQ() >= 4000)
                this.outx(
                    "  A wave of the stuff slides down the mountain-side from your extreme production.",
                    false
                );
        }
        this.outx("\n\n", false);

        this.outx(
            "The harpy giggles and gives you a long, wet kiss that makes your dick twitch",
            false
        );
        if (this.player.balls > 0) this.outx(" and your balls churn");
        this.outx(".  She flops on her back");
        if (this.player.cumQ() >= 2000) this.outx(" in the semen-soaked nest");
        this.outx(
            ' and runs her hands over her abdomen, clearly enjoying the idea of laying another egg.  Sophie groans, "<i>Mmm, such potent seed for one so young.  ',
            false
        );
        if (this.flags[kFLAGS.FUCKED_SOPHIE_COUNTER] == 0) {
            this.outx(
                "Did you know in the old days we used to keep men trapped like this for a whole day?  We'd keep stroking them like this and get a whole days worth of orgasm.  It was magnificent.  Of course we're so fertile now a single orgasm is enough to fertilize an egg.  It looks like you got off lucky, huh?",
                false
            );
        } else if (this.flags[kFLAGS.FUCKED_SOPHIE_COUNTER] <= 2)
            this.outx(
                "You really like it when I milk you don't you?  That must be why you keep coming back for more.",
                false
            );
        else if (this.flags[kFLAGS.FUCKED_SOPHIE_COUNTER] <= 10) {
            this.outx("Do you have a fetish for ");
            if (SophieScene.rand(2) == 0) this.outx("older women");
            else this.outx("harpies");
            this.outx(
                `, or are you just falling in love with me?  It's been some time since I've had an admirer like you.  We had a word for ${this.player.mf(
                    "boys",
                    "sluts"
                )} like you – perverts.  I kid, I kid.  Perverts like you have such pent up, potent cum, and I know you love to give it to me.`
            );
        } else {
            this.outx(
                "You're hooked aren't you?  Shhh, don't answer.  I know you love to nuzzle my breasts and squirt in my pussy.  Come back soon so we can make some more eggs – the other girls have gotten sooo jealous of me.",
                false
            );
        }
        this.outx('</i>"\n\n', false);

        this.outx("You struggle up to your feet and marvel at how rigid ");
        if (this.player.cockTotal() > 1) this.outx("each of ");
        this.outx(`your ${this.multiCockDescriptLight()} remains.  Sophie giggles, "<i>`);
        if (this.flags[kFLAGS.FUCKED_SOPHIE_COUNTER] == 0) {
            this.outx(
                "Sorry cutey, the lip gloss is going to keep you nice and hard.  It's meant to help your ",
                false
            );
            if (this.player.balls > 0) this.outx("balls");
            else this.outx("body");
            this.outx(
                " fill back up with cum.  If you want, we could cuddle until it passes.",
                false
            );
        } else
            this.outx(
                "I'm sorry, I just got so caught up in the moment that I got you all kissed up on my lip-gloss, didn't I cutey?  Why don't you come snuggle with me for a few hours and I can stroke you until it wears off?",
                false
            );
        this.outx('</i>"\n\n', false);
        // Apply harpy status.
        this.luststickApplication(4);
        this.player.orgasm();
        // Sophiepreg
        this.sophieFucked();
        this.outx("Do you take her up on her offer?");
        // [Yes/No]
        this.doYesNo(this.postSophieSexSnuggle, this.postSexSophieSnuggleTurnedDown);
        // Go to same yes or no as 'fits' options.
    }
    private sophieFucked(dicked = true): void {
        // knock up if not knocked up
        if (!this.pregnancy.isPregnant && dicked) {
            this.pregnancy.knockUpForce(PregnancyStore.PREGNANCY_PLAYER, 48 + SophieScene.rand(48));
        }
        // if forced to lesbosecks
        if (!dicked) {
            this.flags[kFLAGS.TIMES_FUCKED_SOPHIE_LESBIAN]++;
            // If not pissed increment times pissed
            if (this.flags[kFLAGS.SOPHIE_ANGRY_AT_PC_COUNTER] <= 0) {
                this.flags[kFLAGS.SOPHIE_ANGRY_AT_PC_COUNTER] = 72 + SophieScene.rand(100);
                this.flags[kFLAGS.TIMES_PISSED_OFF_SOPHIE_COUNTER]++;
            }
            // Increase pissed time
            else this.flags[kFLAGS.SOPHIE_ANGRY_AT_PC_COUNTER] += SophieScene.rand(72);
        }
        // increment times fucked
        this.flags[kFLAGS.FUCKED_SOPHIE_COUNTER]++;
    }

    public luststickApplication(hours = 4): void {
        // Immune to luststick?
        if (this.player.findPerk(PerkLib.LuststickAdapted) >= 0) return;
        // Increment luststick resistance
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00285] += Math.floor(hours / 2);
        if (!this.player.hasCock()) return;
        // Max of 20.
        if (hours > 20) hours = 20;
        // Add duration if under effects
        if (this.player.findStatusAffect(StatusAffects.Luststick) >= 0) {
            // Max?
            if (this.player.statusAffectv1(StatusAffects.Luststick) >= 20) {
            }
            // Not maxed - increase duration
            else {
                // lower hours if it pushes it too high.
                if (this.player.statusAffectv1(StatusAffects.Luststick) + hours > 20) {
                    hours = 20 - this.player.statusAffectv1(StatusAffects.Luststick);
                }
                // increase!
                this.player.addStatusValue(StatusAffects.Luststick, 1, hours);
            }
        }
        // Apply a little of doctor L (thats Dr Lipstick you tard!)
        else this.player.createStatusAffect(StatusAffects.Luststick, hours, 0, 0, 0);
    }

    public sophieLostCombat(): void {
        this.sophieBimbo.sophieSprite();
        this.flags[kFLAGS.SOPHIE_FOLLOWER_PROGRESS] = 0;
        this.outx("Sophie is down!  ", true);
        if (this.monster.HP < 1)
            this.outx(
                "She's too wounded to fight, and she lies in a miserable heap in the nest.",
                false
            );
        else this.outx("She's too turned on to be a threat and is happily masturbating.");
        // RAEP OPTIONS
        let dickRape;
        let clitFuck;
        let cuntFuck;
        let bimbo;
        if (this.player.gender != 0) {
            if (this.player.lust >= 33 && this.player.totalCocks() > 0) {
                // Set dick rape to correct scene.
                // Too big
                if (this.player.cockThatFits(232) == -1) {
                    dickRape = this.maleVictorySophieRapeHUGE;
                }
                // Fits
                else dickRape = this.maleVictorySophieRape;
            }
            // Girl options!
            if (this.player.lust >= 33 && this.player.hasVagina()) {
                // All girls get cuntfuck
                cuntFuck = this.sophieVictoryPussyGrind;
                // big clit girls
                if (this.player.clitLength >= 5) clitFuck = this.fuckDatClit;
            }
            if (this.player.hasItem(this.consumables.BIMBOLQ))
                bimbo = this.sophieBimbo.bimbotizeMeCaptainSophie;
        }
        if (
            dickRape != undefined ||
            cuntFuck != undefined ||
            clitFuck != undefined ||
            bimbo != undefined
        ) {
            this.outx("  What do you do to her?");
            this.simpleChoices(
                "Use Dick",
                dickRape,
                "Scissor",
                cuntFuck,
                "Fuck wClit",
                clitFuck,
                "Bimbo Her",
                bimbo,
                "Leave",
                this.cleanupAfterCombat
            );
        } else this.cleanupAfterCombat();
    }
    public sophieWonCombat(): void {
        this.sophieBimbo.sophieSprite();
        this.flags[kFLAGS.SOPHIE_FOLLOWER_PROGRESS] = 0;
        if (this.player.hasCock()) {
            if (this.player.cockThatFits(232) < 0) this.tooBigForOwnGoodSophieLossRape();
            else if (this.player.biggestCockArea() <= 5) this.tinyDickSupremeSophieLoss();
            else this.normalLossRapuuuuSophie();
        } else {
            this.SophieLossRapeNoDonguuuu();
        }
    }
    // COMBAT STUFF HOOOO/
    // Male 'Normal' – throw on back and grab ankles, force over head and fuck
    private maleVictorySophieRape(): void {
        this.sophieBimbo.sophieSprite();
        const x: number = this.player.cockThatFits(232);
        this.outx("", true);
        this.outx("Sophie is ");
        if (this.monster.HP < 1)
            this.outx(
                "too beaten to resist, and lies on the ground in a semi-conscious heap.",
                false
            );
        else this.outx("too turned on to resist, and is vigorously fisting her large pussy.");
        this.outx("  Not satisfied with a simple victory, you undress and expose your ");
        if (this.player.lust > 90) this.outx("dripping ");
        else if (this.player.lust > 50) this.outx("hard ");
        else this.outx("hardening ");
        this.outx(
            "member.  The harpy doesn't even notice your nudity until you're grasping her legs just above the talons.  She struggles weakly, but you force her feet up over her head, pinning her to the ground.  The view of her thick thighs and large, slippery slit is the perfect enticement.\n\n",
            false
        );

        this.outx(
            `You force your ${this.cockDescript(
                x
            )} into the waiting hole, surprised at how firmly it squeezes.  Sophie grunts and struggles under you, but with your grip and the awkward angle she can't get anywhere.  The half-conscious expression on her face makes it difficult to tell if she's trying to escape or merely attempting to take on a more dominant position.  It doesn't matter; each struggle and flex of her thigh muscles only makes her slippery cunt clamp down more tightly around your member.  You rock your hips back and forth and tease, "<i>Isn't this what you wanted, Sophie?   You know you're loving this.  Just don't think you'll get me with any more of whatever is in your lip-gloss!</i>"\n\n`,
            false
        );

        this.outx(
            `The slap of flesh on flesh echoes through the cool mountain air, and even though you're raping one of them, the other harpies in the area don't seem to care.  A few of them seem to be perched on the edges of their nests, touching themselves.  It seems they aren't much interested in what happens to Sophie.  You pound her pussy with increasing levels of vigor, watching her thighs and breasts jiggle with the force of the fucking.  Her arms come up to steady her breasts, but her fingers wrap around her erect nipples and begin to pinch and pull on them.  Sophie pants, "<i>Oh gods yes!  Breed me you fucking ${this.player.mf(
                "stud",
                "sexy bitch"
            )}.  Stuff your nice young sperm inside me!</i>"\n\n`,
            false
        );

        this.outx(
            "She's definitely starting to enjoy herself.  The harpy wriggles and cums underneath you, her wings fluttering and flapping uncontrollably and kicking up dust.  The velvet tunnel clamps tightly around you with each quivering, muscular contraction of her thighs.  You just keep pounding away, splattering girl-cum with each thrust.  Sophie screeches and moans as she starts to come down, but you pick up the pace, battering her pussy with relentless, hard fucks.  Her eyes roll back from over-stimulation, and her hands fall away from her nipples, nervelessly.  The unbound flesh jiggles obscenely, giving you something to watch as you have your way with the older woman.\n\n",
            false
        );

        this.outx(
            `Warmth boils up in your loins, the telltale sign of your coming orgasm.   You plunge inside her and bend over, biting her nipples as you cum.  Jism boils out of your ${this.cockDescript(
                x
            )}, creaming her pussy as Sophie has another blissful orgasm.  You doubt she's even conscious at this point, but you don't care one way or another.  `
        );
        if (this.player.cumQ() < 50) this.outx("Spooge spurts inside her until you're satisfied.");
        else if (this.player.cumQ() < 300)
            this.outx(
                "Spooge spurts inside her until you're satisfied and her belly has a small cum-bloated bump in it.",
                false
            );
        else if (this.player.cumQ() < 1000)
            this.outx(
                "Spooge bursts inside her until her belly is pregnant with your spunk and you're satisfied.",
                false
            );
        else
            this.outx(
                "Spooge bursts inside her until her belly looks pregnant with your spunk.  The cum squirts around your cock as it runs out of room inside her, and the nest quickly floods with the rising tide of sexual bliss.  You sigh, satisfied at last.",
                false
            );
        this.outx(
            "  Sophie's well-fucked slit gapes and drools whiteness once you pull out.  It won't be long until she has an egg at this rate.",
            false
        );

        // Victory - lust decrease, sensitivity decrease
        this.player.orgasm();
        this.dynStats("sen", -1);
        // Fuck & Preg counter
        this.sophieFucked();
        this.cleanupAfterCombat();
    }

    // Male 'Doesn't Fit'
    private maleVictorySophieRapeHUGE(): void {
        this.sophieBimbo.sophieSprite();
        const x: number = this.player.biggestCockIndex();
        this.outx("", true);

        this.outx("Not satisfied with a simple victory, you undress and expose your ");
        if (this.player.lust > 90) this.outx("dripping ");
        else if (this.player.lust > 50) this.outx("hard ");
        else this.outx("hardening ");
        this.outx(
            "member.  The harpy doesn't even notice your nudity until you're grasping her legs just above the talons.  She struggles weakly, but you force her feet up over her head, pinning her to the ground.  The view of her thick thighs and large, slippery slit is the perfect enticement.\n\n",
            false
        );

        this.outx(
            `You press your ${this.cockDescript(
                x
            )} forward, intent on abusing Sophie's hole with your gargantuan fuck-stick, but it won't fit.   In desperation, you slide your dick over her lips, stimulating her slippery gash and lubricating your ${this.cockDescript(
                x
            )} with harpy-lust, but when you pull back and try to cram it inside... it still won't fit!  Sophie grunts underneath you and barks in irritation, "<i>It won't work, ${this.player.mf(
                "boy",
                "girl"
            )}!  You're too big for harpy-snatch, even one as well-traveled as mine!</i>"  You reach down and slap her ass punitively, and the jiggle that slowly travels up her large thighs gives you an idea.\n\n`,
            false
        );

        this.outx(
            `Balling your hand into a fist, you push it into her large, sloppy hole and collect a handful of her fluids.  You pull it out and slather it over her muscled thighs and the veiny, unlubricated surface of your ${this.cockDescript(
                x
            )}, then go back in for more.  In half a minute, her crotch and your cock are slicked with Sophie's prodigious pussy-fluid.  You drop your ${this.cockDescript(
                x
            )} down into place between her legs and pull her feet together, sandwiching your dick-flesh in a vice of soft thigh-meat.  It's divine, and though Sophie seems rather unhappy with the situation, her half-hearted struggles only make her legs feel that much better.\n\n`,
            false
        );

        this.outx(
            `Tears well up at the corners of her eyes as you use the harpy like a sex-toy.  It's so pathetic that you actually take pity on the poor matron.  You gather both her ankles in your right hand, freeing your left to reach under the flesh of your ${this.cockDescript(
                x
            )} and push inside her vagina.  Sophie's eyes cross at the sudden large intrusion, but her hips rock instinctively as if she could somehow milk some cum from the intruder.  You reach in far enough to feel the barrier of her womb and gently push against it before you pull back out for the next penetration.  The harpy has stopped crying and is starting to squeeze and relax her thighs around your ${this.cockDescript(
                x
            )}.  She pays back your mercy with as much pleasure as she can, and presses her breasts around your ${this.cockDescript(
                x
            )}`
        );

        if (this.player.cocks[x].cockLength < 36) this.outx(" each time it pushes into them.");
        else this.outx(" as it pushes past them to her lips.");
        if (this.player.cocks[x].cockLength >= 40) {
            this.outx(
                `  She sucks the ${this.player.cockHead(
                    x
                )} inside her mouth and whirls her tongue around it `
            );
            if (this.player.cocks[x].cockLength < 50) this.outx("before you pull back.");
            else this.outx("before she lets it back out before another push onward.");
        }
        if (this.player.cocks[x].cockLength >= 50)
            this.outx(
                "  Her tongue darts out and licks the underside when it slips by her head.",
                false
            );
        this.outx(
            "  You dully note that though there are plenty of other harpies in the area, they're too busy circling overhead and masturbating to intervene in any way.  Sophie is probably the nicest, most decent one out of all of them and you're forcing yourself on her.  You look down, feeling a bit guilty, but her mouth is hanging open and her eyes cross a little each time your fist knocks on her cervix; it seems like she doesn't mind THAT much.  Sophie moans, \"<i>Oooh, so big and virile.  I think If you keep rubbing your cock on my clit like that I'm gonna c-cu-cu-oh-uuUUUUUUUUM!</i>\"\n\n",
            false
        );

        this.outx(
            "Her body convulses underneath you in orgasm, and the rippling, clenching thigh-muscles squeeze you to climax.  Ropes of cum splatter her ",
            false
        );
        if (this.player.cocks[x].cockLength < 36) this.outx("tits");
        else if (this.player.cocks[x].cockLength < 50) this.outx("face");
        else if (this.player.cocks[x].cockLength < 100) this.outx("nest");
        else this.outx("and the mountain-side");
        this.outx(".");
        if (this.player.cumQ() >= 500) {
            this.outx(
                `  Clenched tightly, you revel in the feeling of thick jizz-globules distorting your ${this.cockDescript(
                    x
                )} as they blast out.  It splatters wetly, making a total mess of your curvy victim`
            );
            if (this.player.cocks[x].cockLength >= 50) this.outx("'s nest");
            this.outx(".");
            if (this.player.cumQ() >= 2000)
                this.outx(
                    "  You manage to completely flood her nest, soak her body, and send a torrent of semen down the mountainside by the time you finish.",
                    false
                );
        }
        this.outx("  Sophie ");
        if (this.player.cocks[x].cockLength < 50)
            this.outx(
                `covered the underside of your ${this.cockDescript(
                    x
                )} in kisses during your orgasm, but the tingling oral drugs only made it feel better.`
            );
        else
            this.outx(
                `has been running her drug-laced lip-gloss all over your ${this.player.cockHead(
                    x
                )} this entire time!  The tingling made your orgasm even better, but you know you've absorbed a lot of the stuff by now.`
            );
        this.outx("\n\n", false);

        this.outx(
            `Sophie leans back and scoops a handful of your white goo into her lubricant-soaked snatch and promptly falls asleep.  It figures she would do that.  ${this.SMultiCockDesc()} stays hard, and you're sure it's only going to get worse for quite some time.  You glance down at the mother-harpy, considering a second fuck, but decide that it'd be better with a partner who was still awake.`
        );
        // Apply harpy status.
        this.luststickApplication(8);

        // Victory - lust decrease, sensitivity decrease
        this.player.orgasm();
        this.dynStats("sen", -1);
        // Fuck & Preg counter
        this.sophieFucked();
        this.cleanupAfterCombat();
    }

    // Female Pussy Grind
    private sophieVictoryPussyGrind(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx("Sophie is ");
        if (this.monster.HP < 1)
            this.outx(
                "too beaten to resist, and lies on the ground in a semi-conscious heap.",
                false
            );
        else
            this.outx(
                "too turned on to resist, and is vigorously fisting her large pussy.  You pull her feathery arm from the horny snatch and shove it to the side.",
                false
            );
        this.outx(
            '  This harpy needs a lesson in how to enjoy the touch of another woman.   You force her thighs apart, but she pulls them closed before you can do anything.  Growling in irritation, you give her feathery ass a slap and yank them the whole way open.  Sophie gains the presence of mind to glare up at you and scold, "<i>Little girl, I do not want or need you or your pussy.</i>"\n\n',
            false
        );

        this.outx(
            '"<i>Shut up, you feathery old hag.  I won and I want to feel those fat bird-lips rubbing on my clitty,</i>" you reply.  Sophie shudders unhappily, but stops protesting when you ',
            false
        );
        if (this.player.isTaur())
            this.outx(
                "slide one of your four feet under her knee and up along next to her body.",
                false
            );
        else if (this.player.isGoo())
            this.outx(
                "engulf one of her legs with your slime-like lower body and flow closer to her.",
                false
            );
        else if (this.player.isNaga())
            this.outx(
                "slip your snake-like tail between her legs and slide it up next to her body.",
                false
            );
        else this.outx("hook your leg under hers and slide it up next to her body.");
        this.outx(
            `  You shift closer until you can feel the heat of her sex wafting against your own.  With erotic precision, you lower your ${this.vaginaDescript(
                0
            )} until Sophie's large, puffy folds contact your own.  Both of you gasp with pleasure, but it's clear from her tone that the bird-matron isn't into it.\n\n`,
            false
        );

        // (small clit)
        if (this.player.clitLength < 2)
            this.outx(
                `Your ${this.clitDescript()} puffs up inside your folds, turning into a hard little bump of pleasure.  Moaning happily, you start to drag your ${this.vaginaDescript(
                    0
                )} back and forth against Sophie's wet gash, shivering each time you bump into her own rapidly engorging clitoris.  `
            );
        // (large clit)
        else if (this.player.clitLength < 5)
            this.outx(
                `Your ${this.clitDescript()} puffs up, protruding from your folds like a miniature cock.  Moaning happily, you start to pump your ${this.vaginaDescript(
                    0
                )} back and forth across Sophie's wet gash, shivering as your ${this.clitDescript()} continually slips in and out of it.  The harpy's own nub quickly grows hard, and you feel it bumping against you pleasantly while your hips gyrate against her.  `
            );
        // (cock-clit)
        else
            this.outx(
                `Your ${this.clitDescript()} puffs up, growing to an obscene, cock-like size.  You moan happily and begin to stroke the incredibly sensitive protrusion.   The whole time your hips continue to force your ${this.vaginaDescript(
                    0
                )} against the harpy's pussy, and you feel her own clitty budding up and getting hard.   It rubs between your girl-cum-slicked bodies, making your hips shake and twitch with delightful sensations.  `
            );
        this.outx(
            "Loud squishes and fluid noises fill the air as the scissoring intensifies, and in no time Sophie's body is covered in a thin sheen of sweat and blushing hard.  ",
            false
        );
        if (this.player.biggestTitSize() >= 1) this.outx(`You pinch a ${this.nippleDescript(0)}`);
        else this.outx("You arch your back");
        this.outx(
            " and throatily question, \"<i>How could masturbation feel better than this?  Can't you feel how wet we've gotten each other?  My pussy's practically burning with need, and I can feel how hot this it making you.   Admit it, my snatch feels great.</i>\"\n\n",
            false
        );

        this.outx(
            'The unflappable older harpy actually looks a little lost and confused as she responds, "<i>It feels ok... I mean it\'s better than masturbation...</i>"   You look her dead in the eye and stop moving your lower body.  Sophie grunts in displeasure and looks back with a pleading, needy gaze.  Her thighs move clumsily against you, but she quickly gives up when she fails to make it feel as good as you did.\n\n',
            false
        );

        this.outx(
            '"<i>Alright, okay!  It felt great... please don\'t stop,</i>" begs Sophie.  She cups her large breasts and teases her nipples, trying to entice you into resuming the motions.  Her submission to your pleasure is all you needed to hear.   You return to the intense scissoring, and pick up the pace until you\'re both trembling and soaked with sweat from the effort.  One of the circling harpies calls out, "<i>Sluuuuuuuts!</i>" but you give the bird the finger coupled with a seductive look.  She wheels away in disgust and is soon forgotten.\n\n',
            false
        );

        this.outx(
            `Girl-cum starts to run down the crack of your ${this.assDescript()} and a moment later you're cumming.`
        );
        if (this.player.cockTotal() > 0) {
            this.outx(
                `  ${this.SMultiCockDesc()} explodes, splattering her with seed.  The bird-woman looks at the mess like so much wasted potential, but it just makes you grin harder.`
            );
            if (this.player.cumQ() < 400) {
            } else if (this.player.cumQ() < 1000)
                this.outx(
                    "  Jism rains everywhere until she's thoroughly glazed with spooge.",
                    false
                );
            else
                this.outx(
                    "  Jism rains everywhere until she's thoroughly glazed with spooge and the nest is brimming with your spunk-puddle.",
                    false
                );
        }
        this.outx(
            "  Sophie grunts and moans as your measured grinding turns into a seizure-like spasm.   The frenzy of friction pushes her over the edge, making her thighs convulse and her legs splay wide.  ",
            false
        );
        if (this.player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_SLAVERING)
            this.outx("Juices squirt from the joined pussies");
        else if (this.player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_SLICK)
            this.outx("Juices soak the nesting material");
        else if (this.player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_WET)
            this.outx("Juice trickles from the paired pussies");
        else this.outx("Sophie's pussy soaks your own with her juices");
        this.outx(
            ' until you fall away from each other, spent and rubbing your tender cunts.  The older bird-woman reluctantly admits, "<i>',
            false
        );
        if (this.flags[kFLAGS.TIMES_FUCKED_SOPHIE_LESBIAN] == 0)
            this.outx(
                "Cutey, you sure know your way around a pussy, but I just don't like to do this kind of thing.  Don't expect me to be some lesbo bird-slut who'll lick your slit at the drop of a hat.",
                false
            );
        else if (this.flags[kFLAGS.TIMES_FUCKED_SOPHIE_LESBIAN] < 6)
            this.outx(
                "Cutey, you get me off hard every time, but I'd still rather not mess with another girl.  I much prefer getting a younger man in my nest and letting him ravage me.",
                false
            );
        else
            this.outx(
                "I'm not sure how you keep making me cum, but I'd appreciate it if you stopped.",
                false
            );
        this.outx('</i>"\n\n', false);

        this.outx(
            "\"<i>Don't think I've given up on you yet.  One of these times you'll come around,</i>\" you declare as you get dressed.  Finished and refreshed, you slap her feathery ass and hop out of her nest to climb back down the mountain.",
            false
        );

        // Victory - lust decrease, sensitivity decrease
        this.player.orgasm();
        this.dynStats("sen", -1);
        // Fuck & Piss-off counter
        this.sophieFucked(false);
        this.cleanupAfterCombat();
    }

    // Female Clit-Fucking
    private fuckDatClit(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx("Sophie is ");
        if (this.monster.HP < 1)
            this.outx(
                "too beaten to resist, and lies on the ground in a semi-conscious heap.",
                false
            );
        else
            this.outx(
                "too turned on to resist, and is vigorously fisting her large pussy.  You pull her feathery arm from the horny snatch and shove it to the side.",
                false
            );
        this.outx(
            '  This harpy needs a lesson in how to enjoy the touch of another woman.   You force her thighs apart, but she pulls them closed before you can do anything.  Growling in irritation, you give her feathery ass a slap and yank them the whole way open.  Sophie gains the presence of mind to glare up at you and scold, "<i>Little girl, I do not want or need you or your pussy.</i>"\n\n',
            false
        );

        this.outx(
            "You laugh and make it quite clear to Sophie that you aren't planning to use your pussy.  She looks bewildered as you touch your outer folds and toy with yourself, but comprehension slowly spreads across her features as your clit grows longer, an inch at a time.  The harpy actually looks a little pleased as she remarks, \"<i>Well, maybe this isn't a total wash.  You can't fertilize my eggs, but that thing looks a lot more satisfying than my fingers.  Go ahead, my little lesbian minx; let me feel your clit.</i>\"\n\n",
            false
        );

        this.outx(
            `That's more like it!  You roll the suddenly eager harpy over and press the tip of your ${this.clitDescript()} against her moist folds.  They're far larger than a human woman's and they practically slurp your bloated girl-cock inside with ease.  She's hot, wet, and her muscles are squeezing you in a way that makes your ${this.player.legs()} weak.   You grab hold of the wings on her back and hang on for dear life.  With how sensitive your ${this.clitDescript()} is, this probably wasn't a great idea.  It's a constant struggle to keep your body from turning into a mass of convulsing jello.  Her back arches with pleasure as your instincts take over, forcing you to plunge deep inside of her slavering egg-hole.\n\n`,
            false
        );

        this.outx(
            "Sophie moans enthusiastically, \"<i>Mmm, that's it!  Show me just how good that dick-clit of yours can feel.  I think if you could cum through that we'd be able to skip all this fighting.  I didn't say you could stop and listen to me, did I?  Keep fucking!  I want ",
            false
        );
        if (SophieScene.rand(2) == 0) this.outx("to see if it gets thicker when you cum.");
        else this.outx("to feel you cumming just from being squeezed.");
        this.outx(
            '</i>"  Her inner walls start to work you harder, squeezing and massaging the clit from the base to the tip, robbing you of the rest of your strength.  You fall down on top of her, and despite your best effort to continue fucking her, the constant tightening of her tunnel makes it impossible to coordinate any muscle movements below your chest.  Her breasts are swaying underneath you, and, determined as you are to enjoy yourself, you reach around to cup the over-sized harpy-tits.  Her nipples are firm and erect in your fingers, and just by touching them you get her pussy to compress even more tightly.\n\n',
            false
        );

        this.outx(
            `The motherly harpy groans out more commands, "<i>That's it; relax and let me take over, little girl. We're going to make each other feel very good.</i>"  Though she isn't in any position to command you, you can feel your body accepting her words.  It occurs to you that she's using some kind of compulsion to help her, but you're too relaxed and sexually excited to give a damn.  You lie your head down and lightly fondle her nipples while you clit is savagely milked by Sophie's pussy as if it were a cow's teat.  Even with her command to relax, your ${this.hipDescript()} still shiver and buck with excitement, and you know orgasm is close.\n\n`,
            false
        );

        this.outx(
            "A quick uptake in the rhythm of Sophie's squeezes brings you to climax, and your relaxed body is wracked by tiny quivers of movement while your clit balloons with blood inside her.  It feels so good that your eyes roll back and you struggle to hold on.  ",
            false
        );
        if (this.player.totalCocks() > 0) {
            this.outx(
                `Whiteness erupts from ${this.sMultiCockDesc()} as the orgasm hits your groin.  `
            );
            if (this.player.cumQ() < 50)
                this.outx(
                    "It leaves a small puddle of white submission on Sophie's back.  ",
                    false
                );
            else if (this.player.cumQ() < 250)
                this.outx("It leaves a thick puddle of seed dripping from Sophie's back.  ");
            else
                this.outx(
                    "It leaves a thick puddle of seed that splatters off Sophie's back and fills the nest to the brim.  ",
                    false
                );
        }
        this.outx(
            "She's breathing hard but hardly close to getting off, and she purrs, \"<i>I'm not done with you yet, cutey.  Just keep that clitty hard inside me and let me squeeze until I cum.  You can pass out if it's too much for you.</i>\"\n\n",
            false
        );

        this.outx(
            "She's not... not done yet?  You try to pull out, but with the compulsion and the exhaustion of your orgasm, it's impossible.  Ah!  She squeezes again and your eyes cross for a moment.  Everything is still so sensitive!  You can't stand this for long.  ",
            false
        );
        if (this.player.vaginas[0].vaginalWetness >= VAGINA_WETNESS_DROOLING)
            this.outx(
                `Juice dribbles down your ${this.player.legs()} as your body enjoys the treatment.  `
            );
        this.outx(
            "Sophie's managed to take control of the situation, and your helplessness only compounds the pleasure you're forced to endure.  The harpy wiggles her hips and curves her wings over-top of you, holding you tightly as she forces another climax upon you.  Your eyes roll back into your head and you start to drool, knocked out by the harpy.\n\n",
            false
        );

        this.outx(
            `It's several hours later when you wake up at the base of the mountain.   Your ${
                this.player.armorName
            } is back on, and your gem-pouch feels a little lighter.  Maybe you'll think twice about jamming something as sensitive as your ${this.clitDescript()} into a slick vice next time?  Then again, you might have to go visit her again.  You're still tingling from the aftereffects of those orgasms.`
        );
        this.monster.lust = 98;
        this.monster.HP = 2;
        this.player.lust = 100;
        this.flags[kFLAGS.COMBAT_BONUS_XP_VALUE] = this.monster.XP;
        this.cleanupAfterCombat();
        this.player.orgasm();
        this.dynStats("sen", 1);
    }

    // LOSS SCENES
    // Tiny Wang Emasculation
    private tinyDickSupremeSophieLoss(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx("Sophie looks down at your ");
        if (this.player.HP < 1) this.outx("defeated");
        else this.outx("masturbating");
        this.outx(
            ` form and chirps, "<i>Hmmm, that was easy.  Are you sure you didn't want this?</i>"  Her talons hook into your ${this.player.armorName} and deftly tear it off, exposing your ${this.player.skinDesc} to the crisp, mountain air.   The sight actually stuns her for a brief moment.  The harpy-matron asks incredulously, "<i>Ummm, is that it?  I thought I could smell your maleness, but you might as well be a girl.  I mean, I won't even notice that inside me.  Fucking you would be less satisfying than screwing a dwarf.</i>"\n\n`,
            false
        );

        this.outx(
            `Her words sting, making your ${this.cockDescript(
                0
            )} wilt to an even smaller size, egging Sophie on to greater taunts.  She announces, "<i>I'm still going to use your cum for fertilizer since any egg will be a girl anyway.  Isn't that nice?  ${this.player.mf(
                "Maybe she'll have no tits and be teased for the rest of her life, just like her trap of a father.",
                "Maybe she'll have nice big tits like her trap of a father."
            )}  You're going to cum just as soon as the heat from my pussy hits you, I know it.  There's no way a little dick like that stands a chance at enduring real sex.</i>"\n\n`,
            false
        );

        this.outx(
            "You're so embarrassed that even with the sultry naked matron straddling you, you can't get it up.  Your entire body is blushing beet-red and the desire to prove her wrong wars with your desire to run from the constant teases, but your ",
            false
        );
        if (this.player.HP < 1) this.outx("wounds");
        else this.outx("lust");
        this.outx(
            ` keep you immobilized for the domineering harpy.  Sophie snickers and poises her talons over your ${this.cockDescript(
                0
            )} while she asks, "<i>Would you like to be a little girl?  I could do that.</i>"  Her talons snap menacingly, but before you can do anything, she opens her claw-like foot and presses the soft underside against your member.  While you'd like to resist her, your ${this.cockDescript(
                0
            )} will have no such thing, and hardens nicely from the supple underskin of her foot-claw.\n\n`,
            false
        );

        this.outx(
            "Sophie titters, \"<i>For a girl, you sure have quite the foot fetish.  Or were you just trying to make it easier for me to find the little guy?  I was serious about what I said before – your cock is going off as soon as your little prick gets a whiff of my pretty pussy.  You'll be spurting so fast I'll have to drop down on top of you just to catch some of the cum for my eggs.</i>\"\n\n",
            false
        );

        this.outx(
            "There's a humming vibration behind her voice that nags at you, but you push the concern away, focusing instead on how ashamed you are.  The worst part is that each tease and taunt is turning you on more and more, until you can feel the stickiness of your pre-cum on her foot.  Why is she doing this to you?  She used to be so nice...\n\n",
            false
        );

        this.outx(
            `As if she was reading your mind, Sophie answers, "<i>This is for your own good.  Maybe someday you'll grow up and get a decent cock for me to fuck, but until then you're just a little boy who would be better off as a girl.</i>"  You actually start to cry, but at the same time you're lifting your ${this.hipDescript()} in time with her foot, and your tiny little cock turns it into a Slip N' Slide of pre-cum.  Sophie snickers, "<i>You're ready,</i>" and pulls her foot back, trailing strings of fluid.   She steps down and looks at you with a knowing, almost-cruel smile on her face.\n\n`,
            false
        );

        this.outx(
            `The fluids from her aroused gash drip onto your belly as she bends her legs and begins to bring it closer.  She sneers, "<i>I'm amazed you haven't cum yet, little girl.  I'm getting closer now, how soon do you think you'll start spurting? Now?  No, but you'll squirt soon.</i>"  You watch transfixed as Sophie's cunt hovers over-top of you, continuing its slow descent towards your ${this.cockDescript(
                0
            )}.  Oh gods, why are you so hard?  Your cock is twitching on its own by the time her pussy is a foot away.  No no no, you panic mentally, and think of the most boring, dreadful thing you can.  `
        );
        if (this.flags[kFLAGS.AMILY_MET] > 0 && this.player.cor > 50)
            this.outx(
                "You imagine Amily's voice nattering away about how terrible the corruption is, but it doesn't help!  Y",
                false
            );
        else this.outx("It doesn't help; y");
        this.outx(
            "our eyes are fixated on the pink-lipped folds of Sophie's sex as it creeps closer.\n\n",
            false
        );

        this.outx(
            `A tickle of moist body-heat wafts over your ${this.cockDescript(
                0
            )} and it twitches again.  You cry out in anguish and ecstasy, and the tiny prick twitches for a moment before unloading a blast of sticky, white goop onto your belly.  Sophie drops the rest of the way down, her huge cunt noisily slurping up your ${this.cockDescript(
                0
            )} like a bird devouring a worm a fraction of its size.  `
        );
        if (this.player.cumQ() < 50)
            this.outx(
                'You pump the last of your jism into her folds, arching your back with the pleasure of release.  Sophie sneers, "<i>As I expected, you can barely squeeze a few spurts into me.  You\'re lucky my eggs are fertile enough for that little bit to work.</i>"',
                false
            );
        else if (this.player.cumQ() < 250)
            this.outx(
                'You pump jism into her folds, arching your back with the pleasure of release.  Sophie sneers down for a second before surprise over-takes her face.  You\'re still cumming and pumping, thoroughly coating her drippy gash with your white goop.  Sophie muses, "<i>I guess you had something worthwhile hidden inside that tiny girl-cock after all huh?  A shame you still came like a helpless bitch.</i>"',
                false
            );
        else
            this.outx(
                'You blast thick waves of cum into her folds, filling them with creamy whiteness in just seconds.  Her belly bloats from the massive insemination, but most of the spunk runs out of the entrance of her barely-plugged pussy.  Sophie looks down in shock and asks, "<i>Wow, where did a little girl like you get all that from?  Maybe you ought to grow that baby pecker up so people will be a little less surprised by all this, huh?</i>"',
                false
            );
        this.outx("\n\n", false);

        this.outx(
            "The older harpy climbs up off of you and pats her belly.  Her foot slams into your chest, pushing you into the ",
            false
        );
        if (this.player.cumQ() >= 400) this.outx("spooge-soaked ");
        this.outx(
            `surface of her nest while she instructs you, "<i>Get rid of that pathetic excuse for a dick or turn it into a man's.  If you want my advice, you'd be a cuter girl than a boy.</i>" Finished with her taunting, she leans down and gives you a long, wet kiss.   Your ${this.cockDescript(
                0
            )} immediately springs back to full hardness, or at least what passes for it at your size.  The kiss drags on and on until you're completely subsumed by her, sucking her lip into your mouth just to taste more of the sweetness.  She pulls back with a knowing smile as your cock begins to dribble pre-cum again.  The harpy explains, "<i>After tasting that much of my gloss you'll be hard for at least eight hours.</i>"\n\n`,
            false
        );

        this.outx(
            'Sophie spreads her thick thighs to expose the creamy pink folds of her pussy, and she even goes so far as to pull it open with her fingers.   The bird-woman commands, "<i>Come here and lick me.  You\'ll be too horny to function, so you may as well get me off while you play with that baby dick.</i>"\n\n',
            false
        );

        this.outx(
            "You aren't sure if you agree with the logic or if the situation is just too bleak to resist, but you plant your face in her cunt and start to lap at the harpy-snatch and its mixed fluids.\n\n",
            false
        );

        this.outx(
            `You quickly lose track of time, but judging by how sore your ${this.cockDescript(
                0
            )} is, you must have gotten off a few orgasms more.  The tangy taste of Sophie's slit lingers in your mouth, mixed with the salty cream of your own cum, and you get dressed feeling a great deal of shame.  Thankfully Sophie is sleeping on the other side of the nest, so you're able to sneak out without much difficulty.`
        );

        // END
        // (0 libido-0 sensitivity and mino-blood numb-parts acknowledgements would be funny here; like, she can't get the PC off with the heat alone because he's so frigid and/or numb and has to employ the drugs in frustration. Almost like turning the tables on the tentacle monster. -Z)
        this.player.orgasm();
        this.dynStats("sen", 5);
        this.sophieFucked();
        this.luststickApplication(8);
        this.cleanupAfterCombat();
    }

    // Normal Sized Wang Rape – Kisstacular + Hypno
    private normalLossRapuuuuSophie(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        const x: number = this.player.cockThatFits(232);

        this.outx(
            `Sophie watches your lust-wracked body with an expression of pity.  The harpy woman saunters over and muses, "<i>Well that was a waste.  You aren't exactly hard to get in the mood, you know?  Why don't you just come fuck me next time and skip all the foreplay?</i>"  The motherly bird-woman takes a moment to preen her feathery hair while she watches your hands pump away at your ${this.cockDescript(
                x
            )} `
        );
        if (this.player.hasVagina()) this.outx(`and ${this.vaginaDescript(0)} `);
        this.outx(
            "with relentless intensity.  Though her eyes are full of warmth, the smile painted across her face is anything but kind.\n\n",
            false
        );

        this.outx("The harpy leans over, brushing her swollen breasts over your ");
        if (this.player.biggestTitSize() >= 1) this.outx(this.allBreastsDescript(), false);
        else this.outx("chest");
        this.outx(
            `.  You squirm at the sudden extra pressure, but Sophie leans further to whisper in your ear, "<i>You've gotten so horny for momma Sophie.</i>"  Her hand slips inside your ${this.player.armorName} and gives you a measuring squeeze while she undresses you.\n\n`,
            false
        );

        this.outx(
            `"<i>Ooooh, you're practically dripping.  ${this.player.mf(
                "Boy",
                "Girl"
            )}, are you sure you don't want this?  Oh ho, I just felt you twitch in my hand.  You do!</i>" proclaims the harpy matron.  Her words buzz at your brain, gnawing at your reluctance; you become almost convinced that you do want this.  You must have been confused when you were resisting Sophie.  The beautiful busty harpy is just giving you what you want.  Her face curls into a beautiful smile as you nod in response.   She chirps happily, "<i>Good ${this.player.mf(
                "boy",
                "girl"
            )}.</i>"\n\n`,
            false
        );

        this.outx(
            "Her praise sends a blissful, tickling sensation through you that makes you eager to please the harpy.  This seems... wrong.  Didn't you just fight her?  Sophie senses your confusion and pulls your head into her cleavage, cooing reassurances the entire time. \"<i>No no, this is what you wanted.  Feel how hard you are?  That's just the tiniest fraction of your need for momma Sophie.  You want my release.</i>\"  The words buzz in your ears and blast away doubts about how you got here.  She's right – this is what you want.\n\n",
            false
        );

        this.outx(
            `Pleased by your submission, Sophie steps over your waist to straddle your body.  Her feathery legs actually tickle a little, but the smooth, pink-tinged skin surrounding her pussy demands your unquestioning attention.  Moisture beads on the over-sized lips that guard her entrance, tempting you to enter and feel them wrapping about you.  The older woman grabs your dick and gives it a knowing rub; she has you exactly where she wants you.  Her wide, egg-bearing hips lower, pressing the smooth flesh of her sex against your ${this.cockDescript(
                x
            )} to give you a preview of what's to come.  `
        );
        if (this.player.balls > 0)
            this.outx(
                `The moisture trickles over your ${this.ballsDescriptLight()} and they shift and churn, building up a thick load of cum for your harpy lover.  `
            );
        this.outx(
            `You grab hold of her hips and writhe against her, squirming until your ${this.cockDescript(
                x
            )} lines up just right.\n\n`,
            false
        );

        this.outx(
            `Sophie's hips grind down, smothering your ${this.cockDescript(
                x
            )} in her over-sized pussy.   It doesn't feel all that great until her legs lock around your back and the squeezing starts.  Her muscular thighs nearly immobilize you in a tight, feathery embrace.  The tension translates down to her drippy cunt, and it feels as if her massive fuck-hole is trying to strangle the cum from your ${this.cockDescript(
                x
            )}. The older harpy's breath washes over your `
        );
        if (this.player.tallness >= 72) this.outx("neck");
        else if (this.player.tallness > 48) this.outx(this.player.face(), false);
        else this.outx("head");
        this.outx(
            ` as she really starts to get into it.  Her gold-painted mouth glimmers in the light as she presses her supple lips against your own.  The sweet taste of her makes your head swim while she roughly tongue-fucks your mouth.  It's brutal, savage, and so hot that your ${this.cockDescript(
                x
            )} is already tingling dangerously.\n\n`,
            false
        );

        this.outx(
            `You fight back by licking and sucking her lips, even pressing your tongue back into her mouth to tangle with her own.  She breathily moans into your mouth before she pulls back, trailing spit.  "<i>Oh, goood ${this.player.mf(
                "boy",
                "girl"
            )}.  Such a young, virile specimen.  My lips are going to make you stay throbbing and hard for the next eight hours of breeding.  Give momma another kiss just to make sure,</i>" commands Sophie.  Without hesitation or regret, you latch onto her lips like a drowning man clutching to a life-raft.  She squeezes you the entire time, and your back arches in climax.  Spurts of seed fire from your cock deep into hot, wet depths.`
        );
        if (this.player.cumQ() < 50)
            this.outx(
                "  You clutch onto her arms as the tidal wave of pleasure rushes through you, barely hanging on.",
                false
            );
        else if (this.player.cumQ() < 250)
            this.outx(
                "  You clutch onto her arms as the tidal wave of pleasures pushes out greater and greater quantities of spooge.  It's difficult to stay conscious, but you manage to pull it off.",
                false
            );
        else {
            this.outx(
                "  You latch onto her arms as a tidal wave of pleasure forces out bigger and bigger waves of spooge.  Sophie's belly actually distends from all the cum",
                false
            );
            if (this.player.cumQ() >= 1500)
                this.outx(", and some of it even pours back out to flood the nest");
            this.outx(
                ".  It's difficult to stay conscious, but you manage to hang on with a dopey grin plastered onto your face.",
                false
            );
        }

        this.outx(
            `  Sophie's hips pull you in more tightly as you spend the last of your white goo within her depths.   She murmurs, "<i>Not bad for your first shot.</i>"  Her voice shifts and buzzes as she suggests, "<i>You're getting even harder now, little ${this.player.mf(
                "boy",
                "girl"
            )}.  Mhmmm, you'll cum again soon.</i>"  The words burrow inside you and seem to squeeze more blood into your ${this.cockDescript(
                x
            )}.  It gets so hard it's painful, and the tightness of her walls is almost too much to bear.  The bird-woman's face gives a tender, but knowing smile when you cum the second time, and the third time, and the fourth...`
        );
        this.player.orgasm();
        this.dynStats("sen", 5);
        this.sophieFucked();
        this.luststickApplication(8);
        this.cleanupAfterCombat();
    }

    // Too Big – Get knocked out and wake up with your dick covered in kisses.  Status for 16 hours (8 more after waking up)
    private tooBigForOwnGoodSophieLossRape(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        const x: number = this.player.biggestCockIndex();

        this.outx(
            `Sophie reaches forwards with a clawed foot to pull down your armor, but your ${this.cockDescript(
                x
            )} bursts free on its own.  She recoils in shock, nearly falling onto her feathery ass.   Sophie screeches, "<i>How did you even hide that monster!?  I CAN'T TAKE THAT!</i>"   She lashes and batters your head with her wings and kicks.  A particularly powerful hit lands just above your ears and things go black...\n\n`,
            false
        );

        this.outx(
            `Hours later, you wake with an agonizing headache.   You sit up and fresh stabs of pain rock your world, nearly dropping you flat on your back again.  That harpy... she left you at the bottom of the mountain, and didn't even bother to cover your crotch back up!  Your ${this.cockDescript(
                x
            )} is trembling, hard, and dripping pre-cum.  Its entire surface is covered in yellowish lip-prints, and judging from how tired you feel, Sophie found a way to make you cum numerous times.  With that many kisses covering you, you'll be hard for hours.  You get on your ${this.player.feet()} and head back to camp.`
        );
        this.player.orgasm();
        this.dynStats("sen", 5);
        this.sophieFucked();
        this.luststickApplication(16);
        this.cleanupAfterCombat();
    }
    // No Dong – You wake up at the bottom of the mountain.
    private SophieLossRapeNoDonguuuu(): void {
        this.sophieBimbo.sophieSprite();
        this.outx("", true);
        this.outx(
            "Utterly defeated, you collapse.   Sophie doesn't let up, and batters you mercilessly with her wings until you lose consciousness.\n\n",
            false
        );

        this.outx(
            "By the time you wake up, you're at the bottom of the mountain, and you feel as if you've fallen down the entire thing.  Obviously Sophie had enough care not to drop you to your death, but she didn't do you any favors on the ride either.   Yeesh.",
            false
        );
        this.dynStats("str", -1, "tou", -1);
        this.cleanupAfterCombat();
        // If not pissed increment times pissed
        if (this.flags[kFLAGS.SOPHIE_ANGRY_AT_PC_COUNTER] <= 0) {
            this.flags[kFLAGS.SOPHIE_ANGRY_AT_PC_COUNTER] = 72 + SophieScene.rand(100);
            this.flags[kFLAGS.TIMES_PISSED_OFF_SOPHIE_COUNTER]++;
        }
        // Increase pissed time
        else this.flags[kFLAGS.SOPHIE_ANGRY_AT_PC_COUNTER] += SophieScene.rand(72);
    }
}
