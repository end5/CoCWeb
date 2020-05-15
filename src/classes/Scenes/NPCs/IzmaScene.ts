import { trace } from "../../../console";
import { VAGINA_WETNESS_DROOLING, VAGINA_WETNESS_SLICK } from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { CoC } from "../../CoC";
import { CockTypesEnum } from "../../CockTypesEnum";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { PerkLib } from "../../PerkLib";
import { PregnancyStore } from "../../PregnancyStore";
import { StatusAffects } from "../../StatusAffects";
import { TimeAwareInterface } from "../../TimeAwareInterface";
import { Izma } from "./Izma";
import { NPCAwareContent } from "./NPCAwareContent";

export class IzmaScene extends NPCAwareContent implements TimeAwareInterface {
    // const IZMA_NO_COCK: number = 439;
    // const ASKED_IZMA_ABOUT_WANG_REMOVAL: number = 440;
    // const IZMA_X_LATEXY_DISABLED: number = 784;
    // const TIMES_IZMA_DOMMED_LATEXY: number = 785;

    // Izma the Tigershark.
    // Credits: Jokester, Quiet Browser, LukaDoc and Bob.
    // (for Fen: flags required = Izmacounter and Izmafight  –Z)
    // Required prequisites for encounter: Encounter a normal shark
    // girl at least once. (add code to shark girl encounter that
    // creates Izmacounter and sets value to 1 if it doesn't exist)

    public pregnancy: PregnancyStore;

    public constructor() {
        super();
        this.pregnancy = new PregnancyStore(
            kFLAGS.IZMA_PREGNANCY_TYPE,
            kFLAGS.IZMA_INCUBATION,
            0,
            0
        );
        this.pregnancy.addPregnancyEventSet(
            PregnancyStore.PREGNANCY_PLAYER,
            250,
            200,
            150,
            100,
            50
        );
        // Event: 0 (= not pregnant),  1,   2,   3,   4,  5,  6 (< 50)
        CoC.timeAwareClassAdd(this);
    }

    private checkedIzmaLatexy = 0; // Make sure we test each of these events just once in timeChangeLarge
    private checkedIzmaSophie = 0;

    // Implementation of TimeAwareInterface
    public timeChange(): boolean {
        this.checkedIzmaLatexy = 0;
        this.checkedIzmaSophie = 0;
        this.pregnancy.pregnancyAdvance();
        trace(
            `\nIzma time change: Time is ${this.model.time.hours}, incubation: ${this.pregnancy.incubation}, event: ${this.pregnancy.event}`
        );
        if (this.flags[kFLAGS.IZMA_TIME_TILL_NEW_BOOK_AVAILABLE] > 0)
            this.flags[kFLAGS.IZMA_TIME_TILL_NEW_BOOK_AVAILABLE]--; // BOOKURYUUUU COUNTAH For IZMA
        if (
            this.izmaFollower() &&
            this.flags[kFLAGS.IZMA_NO_COCK] == 0 &&
            this.flags[kFLAGS.TIMES_IZMA_DOMMED_LATEXY] > 0 &&
            this.latexGirl.latexGooFollower() &&
            this.flags[kFLAGS.IZMA_X_LATEXY_DISABLED] == 0
        ) {
            this.flags[kFLAGS.GOO_FLUID_AMOUNT] = 100;
        }
        if (this.model.time.hours > 23 && this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00246] > 0)
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00246] = 0;
        return false;
    }

    public timeChangeLarge(): boolean {
        if (
            this.checkedIzmaSophie++ == 0 &&
            this.sophieBimbo.bimboSophie() &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0 &&
            this.izmaFollower() &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0 &&
            this.flags[kFLAGS.IZMA_NO_COCK] == 0 &&
            ((this.flags[kFLAGS.TIMES_SOPHIE_AND_IZMA_FUCKED] == 0 && IzmaScene.rand(10) == 0) ||
                this.flags[kFLAGS.TOLD_SOPHIE_TO_IZMA] == 1)
        ) {
            this.flags[kFLAGS.TOLD_SOPHIE_TO_IZMA] = 0;
            this.sophieBimbo.sophieAndIzmaPlay();
            return true;
        }
        if (
            this.checkedIzmaLatexy++ == 0 &&
            this.izmaFollower() &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0 &&
            this.flags[kFLAGS.IZMA_NO_COCK] == 0 &&
            this.latexGirl.latexGooFollower() &&
            this.flags[kFLAGS.FOLLOWER_AT_FARM_LATEXY] == 0 &&
            this.flags[kFLAGS.TIMES_IZMA_DOMMED_LATEXY] == 0 &&
            (this.debug || IzmaScene.rand(10) == 0)
        ) {
            this.izmaDomsLatexy();
            return true;
        }
        return false;
    }
    // End of Interface Implementation

    public izmaFollower(): boolean {
        return this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1;
    }

    public izmaSprite(): void {
        this.spriteSelect(32);
    }

    public meetIzmaAtLake(): void {
        this.spriteSelect(32);
        this.outx("", true);
        // (PC scared Izma off with worms) (Izmacounter = 0)
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00233] == 1) {
            // (Check PC for worm infestation, if yes then suppress Izma encounter; if no then output:)
            this.outx(
                'Izma sees you coming from a long way off and picks up her locker, moving toward the waterline.  "<i>Hey...</i>" she says, cautiously, as you get close.  "<i>You don\'t smell like worms anymore... did you get rid of them?</i>"  You nod, somewhat apologetically.  She looks relieved.  "<i>That\'s good.  Truth be told, I missed your company a bit.  So, want to chat, or maybe look at my books?  Or... did you want to do the other thing?  I\'m almost always in the mood for that, too,</i>" Izma says, with a wink.',
                false
            );
            // (set Izmacounter to 5)
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230] = 5;
            // Clear 'worms' toggle
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00233] = 0;
            // [Trade] [Talk] [Sex] [Fight] [Leave]
            this.simpleChoices(
                "Borrow",
                this.tradeWithFuckingSharkBitches,
                "Fight",
                this.fightSharkCunt,
                "Talk",
                this.talkToASharkCoochie,
                "Sex",
                this.chooseYourIzmaWeapon,
                "Leave",
                this.leaveSumSharkPussyOnTheBeach
            );
        }
        // (Izmacounter= 1)
        else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230] == 1) {
            this.outx(
                "The sight of a figure on the horizon brings your lake stroll to a sudden stop. Something or someone is there, sitting on a rock.  You cautiously move towards the figure, silently creeping up behind the stranger.  As you draw closer, you see she bears a resemblance to the shark girls of the lake, but with a few noteworthy differences.  She must be around 6' tall; her skin is a strange mixture of orange and grey, with several stripes along the orange parts.  She has semi-lustrous white hair flowing past her shoulders, with a few droplets of water still suspended in it.  She's wearing a black bikini top, and has a well-crafted grass skirt reaching down to her knees.  She hasn't noticed your presence yet as she's busily reading a book; a small chest sits on the rocks beside her.  Now that you get a good look at her, you also notice she has a cute little pair of spectacles on the bridge of her nose.\n\n",
                false
            );

            this.outx('You hesitate a few moments before saying, "<i>Er... hello?</i>"\n\n', false);

            this.outx(
                'The stranger drops her book with a start and nearly pounces on you, taking a big bite out of the air with her sharp teeth; thankfully, you managed to avoid her by jumping back.  "<i>Who are you?</i>" she demands.  "<i>What are you doing here?</i>"  You hastily offer her a few apologies, declaring your innocence of any ill intentions.  After a few moments she calms down, though this doesn\'t remove the look of irritation from her face.  She sits back on the rock, picks her book up and adjusts her glasses, then asks, "<i>So, who are you?  And what\'s your business around here?</i>"\n\n',
                false
            );

            this.outx(
                'You tell her you were exploring and the sight of her made you curious; it\'s quite unusual to see one of her kind out here on the beach, just relaxing and reading a book.  "<i>I suppose I am a bit different...</i>" she accedes, "<i>Anyway, I\'m just catching up on my reading; sex and swimming, the famous pastimes of my people, are all well and good, but I like to keep my wits sharp too.</i>"\n\n',
                false
            );

            this.outx(
                "Now you're even more curious; she doesn't seem as imposing and does look a bit more intellectual now that she's calmer – well, from the neck up, anyway.  She's still dressed as if expecting a luau to break out any minute.  You introduce yourself and then look at her pointedly.\n\n",
                false
            );

            this.outx('"<i>I\'m Izma, a tigershark,</i>" she replies.\n\n', false);

            this.outx('"<i>Tigershark?</i>" you ask.\n\n', false);

            this.outx(
                "\"<i>It's a mutation among shark-people.  We're stronger, tougher, faster... and we have some other... err, 'qualities' our sisters lack,</i>\" she explains, with a glance to subtly discourage you from probing the matter further.  Instead, you follow up by asking her where she got her books.  \"<i>These?  Scavenged from around the place.  It's so hard to find recorded knowledge around here, and even some of this stuff isn't in great condition... you know?</i>\"  You agree; that meager pile of books in the chest is still the biggest library you've seen ",
                false
            );
            if (this.player.statusAffectv1(StatusAffects.TelAdre) >= 1)
                this.outx("outside the safety of Tel'Adre");
            else this.outx("since you arrived");
            this.outx(
                '.  Perhaps imagining you a kindred spirit, she presses the topic.  "<i>I could let you borrow some... for a small usage fee. And you\'d stay in sight, of course.</i>"  You contrive to look hurt.  "<i>Nothing personal, but I\'d like to expand my collection, not reduce it,</i>" she adds.  Still... an appealing offer.  You could do with as much knowledge as you can get.\n\n',
                false
            );

            this.outx(
                "You nod in agreement, earning a smile from Izma.  You chat for another short while before you part ways, heading back to your camp.",
                false
            );
            // (Izmacounter +1)
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230]++;
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        // [Next 2 encounters with Izma] (Izmacounter = 2 or 3)
        else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230] < 4) {
            this.outx(
                "Your exploration of the lakeshore has brought you back to Izma's campsite.  The tigershark is happy to see you, but you can't help but feel she's a little distracted with something; she's constantly playing around with her skirt and grinding her fangs.\n\n",
                false
            );

            this.outx('"<i>So, what can I interest you in?</i>" she asks.\n\n', false);
            // [Trade] [Talk] [Leave] - has special text
            this.simpleChoices(
                "Borrow",
                this.tradeWithFuckingSharkBitches,
                "Talk",
                this.talkToASharkCoochie,
                "",
                undefined,
                "",
                undefined,
                "Leave",
                this.leaveSumSharkPussyOnTheBeach
            );
        }
        // -----------------------------------------
        // [After 3 encounters] (Izmacounter = 4)
        else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230] == 4) {
            this.outx(
                "Your exploration of the lakeshore has brought you to Izma's tiny camp once again.  You greet each other normally, but you can't help but notice Izma seems even more distracted than normal.  \"<i>Hey, uh... we're friends, right?</i>\" Izma asks eventually, winning a nod from you.  The tigershark has given you some good company, which you find a rarity in this world.  \"<i>Good, good.  I, uh, have this 'problem' and I need a friend to help me out with it.</i>\"  At first you surmise she's referring to some sort of errand too far from the lake to do on her own, but once she pulls her grass skirt open you understand full well what her 'problem' is.\n\n",
                false
            );

            this.outx(
                "A fifteen-inch-long, semi-erect shaft flops free from Izma's skirt, with a quartet of baseball-sized gonads swinging beneath it.  It seems roughly like a human's in appearance, though the red skin does make for a noticeable difference.  How Izma was hiding that is beyond you.  You can only guess at its girth once it's fully erect...\n\n",
                false
            );

            this.outx(
                "\"<i>Don't get the wrong idea here, I'm not gonna jump you or anything, I'm just offering.  I mean I could easily catch myself another shark girl or a cultist if I wanted to.  Just... offering, is all,</i>\" Izma says, looking skyward and avoiding eye contact.\n\n",
                false
            );

            this.outx(
                "You roll the idea around in your head for a few seconds before asking just what's in it for you.  Izma smiles, happy to see you're at least pondering the offer.  \"<i>I can pay you,</i>\" she says proudly, earning a raised eyebrow from you.  Izma rummages around her oak chest, pulling out something that looks like a shark tooth.  One thing that catches your eye is the strange purple glow it's giving off.\n\n",
                false
            );

            this.outx(
                '"<i>It can make you a tigershark like me, with enough doses...</i>" Izma explains, rolling the tooth between her knuckles.  "<i>I mean, if you think you\'d like that.  It can give you skin like mine, a fin, a shark tail, fangs... and one of these, too.</i>" Izma cups her breasts and pivots her pelvis forward with its hefty package, as if trying to entice you.  Her suggestive pose does turn you on slightly.\n\n',
                false
            );
            this.dynStats("lus", 5);

            this.outx(
                '"<i>There are two ways we can do this.  The sex, I mean,</i>" Izma says, standing upright.  This causes you to raise your eyebrows, wondering what that\'s supposed to mean.  "<i>We can do a bit of oral... or if you want to put it in, we can do what shark people do: fight for dominance. Choice is yours, really,</i>" Izma says, moving closer to you. "<i>So... what can I tempt you with today?</i>"',
                false
            );
            // [Trade] [Talk] [Sex] [Fight] [Leave]
            this.simpleChoices(
                "Borrow",
                this.tradeWithFuckingSharkBitches,
                "Fight",
                this.fightSharkCunt,
                "Talk",
                this.talkToASharkCoochie,
                "Sex",
                this.chooseYourIzmaWeapon,
                "Leave",
                this.leaveSumSharkPussyOnTheBeach
            );
        }
        // (after 4+ encounters) (Izmacounter >= 5)
        else {
            // Already turned down follower
            // [[Encountering Izma after telling her to stay]
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == -1) {
                this.outx(
                    "As you stroll along the lake, you find yourself coming across a familiar looking sea-chest.  It looks like you've stumbled into the path of your tigershark lover, Izma, and sure enough, she promptly emerges dripping from the waters of the lake.  She smiles in delighted surprise at seeing you.\n\n",
                    false
                );

                this.outx(
                    `"<i>${this.player.short}! It's so good to see you!</i>" she greets, both of you exchanging a quick hug. She sits on a rock beside her trunk, grinning from ear to ear. "<i>So, what do you want to do today?  Have you thought about bringing your beta with you?</i>"\n\n`,
                    false
                );
                // [Shop] [Sex] [Talk] [Camp] [Leave]
                this.simpleChoices(
                    "Borrow",
                    this.tradeWithFuckingSharkBitches,
                    "Camp",
                    this.acceptIzmaAsYourBitch,
                    "Talk",
                    this.talkToASharkCoochie,
                    "Sex",
                    this.izmaLakeTurnedDownCampSex,
                    "Leave",
                    this.leaveSumSharkPussyOnTheBeach
                );
                // [Shop]
                // Uses existing shop options.
                // [Talk]
                // Uses talk options of camp.
                // [Camp]
                // Basically just thesame dialogue for if you accept Izma when she submits to you.
            }
            // Follower choice
            // [After 5 consecutive wins against Izma] (encountered with Izmafight >= 5)
            else if (
                this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] >= 6 &&
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 0
            ) {
                this.outx(
                    "You walk the lakeshore, hoping to encounter the slutty shark Izma again, and you set your sights on her makeshift camp soon enough.  From what you can see, the girl is looking out from the lakeshore as if in deep thought.  As you draw closer, you see that her hands are constantly fidgeting on her lap, a telltale sign of her nerves.  Now, just what could be on her mind that has her so riled up?\n\n",
                    false
                );

                this.outx(
                    "You step on a brittle shell as you advance and it crunches loudly beneath your feet, drawing Izma's attention.  She looks at you and her mood seems to instantly brighten, though her hands are still fidgeting nervously.  Smirking, you hold up a hand as a greeting and ask what's up.\n\n",
                    false
                );

                this.outx(
                    '"<i>Well, um...</i>" she begins awkwardly.  "<i>We\'ve fought a lot recently, and you\'ve proven yourself superior to me so often.  I used to be a little embarrassed, but now...</i>" She trails off and looks over the lake again.  "<i>Now I know that you ARE superior to me, a superior specimen... an alpha.</i>"  As she finishes, she looks to you and clasps her hands.\n\n',
                    false
                );

                this.outx(
                    '"<i>And... if -if you want a mate... um, I could come with you... if that\'s okay with you?</i>"  She stares at the sand and blushes.  "<i>O-otherwise, I\'ll just  stay here... and not bother you.</i>"  It seems you\'ve been presented with a choice; you could either accept Izma as a mate, or turn her down and let her remain at the lake. What do you do?\n\n',
                    false
                );
                // [Accept][Stay]
                this.simpleChoices(
                    "Accept",
                    this.acceptIzmaAsYourBitch,
                    "Stay",
                    this.IzmaStayAtTheLakeBitch,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined
                );
            }
            // Normal
            else {
                this.outx(
                    `Izma sees you coming from a long way off and waves you over.  "<i>Hey, ${this.player.short}!  Come by to chat, or did you want to borrow a book?  Or... did you want to help me with my 'problem'?  I'm afraid it's becoming rather chronic lately,</i>" she says, grinning, as she uncrosses her legs and a bulge lifts the front of her skirt.\n\n`,
                    false
                );
                // [Trade] [Talk] [Sex] [Fight] [Leave]
                this.simpleChoices(
                    "Borrow",
                    this.tradeWithFuckingSharkBitches,
                    "Fight",
                    this.fightSharkCunt,
                    "Talk",
                    this.talkToASharkCoochie,
                    "Sex",
                    this.chooseYourIzmaWeapon,
                    "Leave",
                    this.leaveSumSharkPussyOnTheBeach
                );
            }
        }
    }

    // [Trade]
    private tradeWithFuckingSharkBitches(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "Izma opens up her wooden trunk, and lays out some old books for you to look at.  An interesting and varied selection, if a small one; they've evidently been used before with their turned up corners and worn-looking pages.  Still good, of course.\n\n",
            false
        );
        // [C.Manual] [E.Guide] [Porn][Back]
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] <= 0)
            this.simpleChoices(
                "C.Manual",
                this.readSharkCuntManual,
                "E.Guide",
                this.sharkEdgingGuideLOL,
                "Porn",
                this.sharkgirlPronz,
                "",
                undefined,
                "Back",
                this.meetIzmaAtLake
            );
        else
            this.simpleChoices(
                "C.Manual",
                this.readSharkCuntManual,
                "E.Guide",
                this.sharkEdgingGuideLOL,
                "Porn",
                this.sharkgirlPronz,
                "",
                undefined,
                "Back",
                this.izmaFollowerMenu
            );
    }

    // [C.Manual]
    private readSharkCuntManual(): void {
        this.spriteSelect(32);
        // Use only 10w30 jism.
        this.outx("", true);
        this.outx(
            'You point to a pile of books which has a note on top declaring them to be combat manuals, feeling any combat tips you can get will be invaluable in this land.  "<i>Those?</i>" the shark asks.  "<i>They\'re okay, I guess.  Mostly for beginners, but there are a few worthwhile tricks in each one.  20 gems to borrow one.</i>"',
            false
        );
        if (this.player.gems < 20) {
            this.outx("\n\n<b>You haven't got that much.</b>", false);
            this.doNext(this.tradeWithFuckingSharkBitches);
        }
        // [Yes/No]
        else this.doYesNo(this.readSharkCuntManual2, this.tradeWithFuckingSharkBitches);
    }

    private readSharkCuntManual2(): void {
        this.spriteSelect(32);
        this.outx("", true);

        this.outx(
            "Handing Izma the gems she asked for, you pick up one of the many issues of 'Combat Manual'. Izma takes a moment to count and store the gems you've given her, while you move over to a nearby rock to have a quick read of the volume.\n\n",
            false
        );
        this.player.gems -= 20;
        this.statScreenRefresh();

        // (One of the following random effects happens)
        const choice: number = IzmaScene.rand(3);
        if (choice == 0) {
            this.outx("You learn a few new guarding stances that seem rather promising.");
            // (+2 Toughness)
            this.dynStats("tou", 2);
        } else if (choice == 1) {
            this.outx(
                "After a quick skim you reach the end of the book. You don't learn any new fighting moves, but the refresher on the overall mechanics and flow of combat and strategy helped.",
                false
            );
            // (+2 Intelligence)
            this.dynStats("int", 2);
        } else {
            this.outx(
                "Your read-through of the manual has given you insight into how to put more of your weight behind your strikes without leaving yourself open.  Very useful.",
                false
            );
            // (+2 Strength)
            this.dynStats("str", 2);
        }
        this.outx(
            "\n\nFinished learning what you can from the old rag, you hand it back to Izma who happily adds it back into her collection.  You say your goodbyes and then ",
            false
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] != 1) this.outx("head back to your camp.");
        else this.outx("leave the shark-girl to her books.");
        // (Izmacounter +1)
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230]++;
        this.doNext(this.camp.returnToCampUseOneHour);
        return;
    }

    // [E.Guide]
    private sharkEdgingGuideLOL(): void {
        this.spriteSelect(32);
        // durhur
        this.outx("", true);
        this.outx(
            "You pick up a book titled 'Etiquette Guide' from its pile; the subtitle reads 'A handbook to society for the modern Lady or Gentleman'.  A little cheesy, but you suppose learning how to keep your mind on chastity and decorum might come in handy someday.  \"<i>Not a bad read.  Though, it's more or less useless for a shark girl like me,</i>\" Izma says of it, before holding her hand out to you.  \"<i>Hard to find more, so... 25 gems if you wanna borrow it.</i>\"",
            false
        );
        if (this.player.gems < 25) {
            this.outx("\n\n<b>You haven't got that much.</b>", false);
            this.doNext(this.tradeWithFuckingSharkBitches);
        }
        // [Yes/No]
        else this.doYesNo(this.readSharkEdgingGuideLOL, this.tradeWithFuckingSharkBitches);
    }

    private readSharkEdgingGuideLOL(): void {
        this.spriteSelect(32);
        this.player.gems -= 25;
        this.statScreenRefresh();
        this.outx("", true);
        this.outx(
            "You hand Izma the gems she asked for and then pick up a copy.  Izma takes a moment to count the gems, while you sit down near her.\n\n",
            false
        );

        this.outx(
            "You peruse the strange book in an attempt to refine your manners, though you're almost offended by the stereotypes depicted within.  Still, the book has some good ideas on how to maintain chastity and decorum in the face of lewd advances.\n\n",
            false
        );
        // (-2 Libido, -2 Corruption)
        this.dynStats("lib", -2, "cor", -2);

        this.outx(
            "After reading through the frilly book you give it back to Izma who delicately places it back in the trunk.  You say your goodbyes and then ",
            false
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] != 1) this.outx("head back to your camp.");
        else this.outx("leave the shark-girl to her books.");
        // (Izmacounter +1)
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230]++;
        this.doNext(this.camp.returnToCampUseOneHour);
        return;
    }
    // [Porn]
    private sharkgirlPronz(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            'Izma seems exceedingly embarassed as you turn this book up from under a pile of the others.  It seems to be a series of erotic images made in this land itself, detailing various creatures of all different genders caught up in sexual situations.  You raise a questioning eyebrow to her.  "<i>Ah, that... it\'s good material, I-I suppose,</i>" she stammers, trying to cover her embarrassment at having mislaid it among the others.  "<i>Uh... 20 gems if you want to look?</i>"',
            false
        );
        if (this.player.gems < 20) {
            this.outx("\n\n<b>You haven't got that much.</b>", false);
            this.doNext(this.tradeWithFuckingSharkBitches);
        }
        // [Yes/No]
        else
            this.doYesNo(
                this.readSharkgirlPornzYouFuckingPervertAsshole,
                this.tradeWithFuckingSharkBitches
            );
    }

    private readSharkgirlPornzYouFuckingPervertAsshole(): void {
        this.spriteSelect(32);
        this.player.gems -= 20;
        this.statScreenRefresh();
        this.outx("", true);
        this.outx(
            "Izma colors brightly as you flamboyantly produce the requested gems and present them to her, but dutifully hands over the bound illustrations.  While she fumbles with the gems you move down a few feet to examine the pornographic material.\n\n",
            false
        );

        this.outx(
            "You wet your lips as you flick through the pages of the book and admire the rather... detailed illustrations inside.  A bee-girl getting gangbanged by imps, a minotaur getting sucked off by a pair of goblins... the artist certainly has a dirty mind.  As you flip the pages you notice the air around you heating up a bit; you attribute this to weather until you finish and close the book... only to discover that Izma had been standing behind you for some time, 'reading' over your shoulder.",
            false
        );
        // (+2! Libido and lust gain)
        this.dynStats("lib", 2, "lus", 20 + this.player.lib / 10);
        // (0-30 Corruption)
        if (this.player.cor < 33) {
            this.outx(
                '  You give a bit of a start.  "<i>S-sorry,</i>" she says.  At a loss for words, you hand her the porn and make a hasty retreat',
                false
            );
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] != 1) this.outx(" back to your camp");
            this.outx(".");
        }
        // (31-69 Corruption)
        else if (this.player.cor < 66) {
            this.outx(
                "  You smile at her and pass her the book, with a heavy-lidded glance and a quip about how it wasn't a bad read but the real deal is much better.  She blushes a bit and claps her knees together.  Thanking Izma for the read, ",
                false
            );
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] != 1)
                this.outx("you head back to camp.");
            else this.outx("you turn back to the center of your camp.");
        }
        // (70+ corruption)
        else
            this.outx(
                '  You nonchalantly glance at Izma, and mention that it doesn\'t really compare to your own fantasies and experiences.  With that, you hold the closed book out and tuck it neatly into the cleavage of her breasts!  Keeping your hand on it, you quirk an eyebrow at her; she shivers, colors deeply, and turns around, snatching the book from you.  "<i>You... perv,</i>" she teases back.  "<i>Why don\'t you write a book yourself then?</i>" As you go to leave, you notice her grass skirt has shifted to the front and lies taut against the contours of her butt.  Too tempting!  You plant an open-palmed smack on it and take off running as she shouts after you.',
                false
            );
        // (Izmacounter +1)
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230]++;
        this.doNext(this.camp.returnToCampUseOneHour);
        return;
    }

    // [Talk]
    private talkToASharkCoochie(): void {
        this.spriteSelect(32);
        this.outx("", true);
        // (first chat)
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00232] == 0) {
            this.outx(
                "You sit down on the rocks beside Izma, and the two of you exchange bits of gossip and information. Izma then tells you a strange tale of a mysterious island she's seen on the horizon of the lake, along with a strange smoke-belching shape she's seen on the nearby mountain in the past.  ",
                false
            );
            // (If player hasn't done the Demon Factory quest)
            if (this.player.findStatusAffect(StatusAffects.DungeonShutDown) < 0)
                this.outx(
                    "You scratch your chin in thought, feeling that this matter warrants further investigation.",
                    false
                );
            // (If the player has done the Demon Factory)
            else
                this.outx(
                    "You smile, and detail just what that factory is and what you went on to do in this factory.",
                    false
                );
        }
        // (repeat: factory not cleared)
        else if (this.player.findStatusAffect(StatusAffects.DungeonShutDown) < 0) {
            this.outx(
                "You sit with Izma and chat a bit more; naturally enough your conversation turns toward the billowy pink smoke from the mountain.  According to her, the smoke's been increasing suspiciously in volume the past few days.  She bemoans her inability to explore it further because of her aquatic nature; you commiserate as best you're able before taking your leave.",
                false
            );
        }
        // (repeat: factory cleared)
        else {
            this.outx(
                "With the factory on the mountain shut down and no longer belching conspicuous pink smog, the conversation turns to more esoteric subject matter.  The two of you discuss some of the ramifications of the demon outbreak and speculate on what the future might hold.  She argues her points cogently and without backing down or getting sidetracked, and you're given a bit of a mental workout as you formulate and present your own arguments.",
                false
            );
            this.dynStats("int", 1);
        }
        this.outx(
            "\n\nEventually the two of you decide to part ways, and you head back to camp.",
            false
        );
        // (Izmacounter +1)
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230]++;
        this.doNext(this.camp.returnToCampUseOneHour);
        return;
    }
    // [Leave]
    private leaveSumSharkPussyOnTheBeach(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "Having no business with Izma for the time being, you head off back to your camp.",
            false
        );

        this.doNext(this.camp.returnToCampUseOneHour);
        return;
    }

    // [Fight]
    private fightSharkCunt(): void {
        this.outx("", true);
        // (Izmacounter +1)
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230]++;
        this.outx(
            "Izma smiles widely and retrieves a pair of hooked metal gauntlets from her chest, donning them and clenching her fist a few times.  ",
            false
        );
        // (If Izmafight = 0)
        if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] == 0)
            this.outx(
                '"<i>All right, show me just what a Champion can do!</i>" she says, entering a fighting stance.',
                false
            );
        // (If Izmafight = 1-2)
        else if (
            this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] > 0 &&
            this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= 2
        )
            this.outx(
                "Izma's eyes narrow at you, and she assumes a fighting stance.  \"<i>You won't get so lucky this time.</i>\"",
                false
            );
        // (If Izmafight = 3+)
        else if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] > 2)
            this.outx(
                'Izma seems uncertain with herself as she prepares for battle. "<i>Go a little easier on me this time... please?</i>"',
                false
            );
        // (If Izmafight = -1 or -2 )
        else if (
            this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] < 0 &&
            this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] >= -2
        )
            this.outx(
                '"<i>Hm, really?  Well, maybe you\'ll get lucky this time,</i>" she mocks, gesturing at you to strike first.',
                false
            );
        // (If Izmafight = -3 to -4)
        else
            this.outx(
                'Izma laughs slightly and shakes her head.  "<i>If you insist.  At least TRY this time, will ya?</i>"',
                false
            );
        this.startCombat(new Izma());
        this.spriteSelect(32);
    }

    // [Victory dialogue]
    public defeatIzma(): void {
        this.outx("", true);
        // (Izmafight = 0)
        if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= 0) {
            this.outx("Izma falls back into the sand, her ");
            if (this.monster.HP < 1) this.outx("injuries");
            else this.outx("lust");
            this.outx(
                ' preventing her from fighting on.  She growls at you in annoyance, "<i>Fine.  You win... this time.</i>"\n\n',
                false
            );
        } else if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] > 0) {
            // (Izmafight = 1 or 2)
            if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] < 3) {
                this.outx("Having incapacitated Izma through ");
                if (this.monster.HP < 1) this.outx("physical");
                else this.outx("sexual");
                this.outx(
                    " prowess, you stand over the defeated tigershark.  \"<i>Okay, okay!  You win!  Geez... let's get on with it, I feel like I'm gonna go crazy.</i>\"  She begins removing her clothing.\n\n",
                    false
                );
            }
            // (Izmafight = 3+)
            else
                this.outx(
                    'Izma falls into the sand in an exaggerated fashion.  "<i>Oh no!  I seem to have lost!  Please don\'t ravish me again!</i>" she proclaims loudly as she undresses, her bad acting almost making you laugh your ass off.\n\n',
                    false
                );
        }
        this.outx("Which part of your body will you claim her with?");
        let penis;
        if (this.player.hasCock()) penis = this.victoryPenisIzma;
        let vag;
        if (this.player.hasVagina()) vag = this.useVagooOnIzmaWin;
        // [use penis][use vag][use ass][Leave]
        this.simpleChoices(
            "Use Penis",
            penis,
            "Use Vagina",
            vag,
            "Use Ass",
            this.takeItInZeButtVictoryLikeFromIzma,
            "",
            undefined,
            "Leave",
            this.leaveIzmaVictoryTease
        );
    }

    // [Loss dialogue]
    public IzmaWins(): void {
        this.outx("", true);
        // (if Worms)
        if (this.player.findStatusAffect(StatusAffects.Infested) >= 0) {
            kGAMECLASS.infestOrgasm();
            this.outx(
                `\n\nIzma looks on in horror as you push out the load of wormy cargo onto the sand at her feet, only snapping out of her daze as several of the parasites begin climbing her ankle with an eye toward her cock.  She shrieks and jumps back, then drags her foot in the sand, dislodging or pulverizing the squirming vermin.  "<i>${this.player.short}, that's nasty!  Get away!  Get away and don't talk to me again!  Ugh!</i>"  She takes off, grabbing her chest of books and kicking sand up in her flight down the beach.`,
                false
            );
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00233] = 1;
            this.player.orgasm();
            this.doNext(this.cleanupAfterCombat);
            return;
        }
        // (without worms)
        else {
            // (Izmafight =0)
            if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] >= 0)
                this.outx(
                    'Izma chuckles slightly as she prowls around your defeated form.  "<i>Well, as far as things around here stand, you made for a decent fight.  Still no match for me, though.</i>"',
                    false
                );
            // (Izmafight = -1 or -2)
            else if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] >= -2)
                this.outx(
                    "\"<i>Ya know, just because we're friends doesn't mean you need to hold back... you were holding back, right?</i>\" Izma asks, placing her hands on her hips.",
                    false
                );
            // (Izmafight = -3 or -4)
            else
                this.outx(
                    "Izma sighs and shakes her head at you, letting a foot rest on your stomach  \"<i>You're doing this on purpose, aren't you?  Hm, fine.  If you love my cock so much, I think you'd make for a decent mate...</i>\"",
                    false
                );
            // TO THE SECKS!
            this.doNext(this.loseToIzma);
        }
    }

    // M/F/U Loss starter:
    private loseToIzma(): void {
        this.outx("", true);
        // Final izma submission!
        if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= -5) {
            this.finalIzmaSubmission();
            return;
        }
        if (this.player.gender <= 2) {
            // ((If player is reduced to 0 HP:)
            if (this.player.HP < 1) {
                this.outx(
                    "One of Izma's metal-clad fists cracks hard against your stomach, sending you crashing onto the sandy earth - you aren't seriously hurt, but you're too weak to continue fighting, and Izma knows it.\n\n",
                    false
                );
                this.outx(
                    "She grins at you, a rather fierce expression given she's still got her shark-teeth out, but her tone is gentle enough.  \"<i>Hah! Looks like I win this round, kid!  Now, I believe there's something you owe me, and I intend to have it...</i>\"\n\n",
                    false
                );
            }
            // (If player is raised to 100 Lust:)
            else {
                this.outx(
                    "Your legs buckle, and your mind fogs with arousal; you are too turned on to continue fighting and collapse bonelessly into a shivering heap.\n\n",
                    false
                );
                this.outx(
                    'Izma shakes her head, grinning wryly.  "<i>Looks like somebody needs to get more discipline before they try a sex-off.</i>"\n\n',
                    false
                );
            }
            this.outx(
                '"<i>All right; time to hold up your end,</i>" she notes.  The double entendre is lost on your fuddled mind.  Her tone is conversational, but her grin is wicked, and she is slipping out of her grass skirt as hastily as she can, given the care she needs to take it off without damaging it.  After all, skirts that can so easily conceal the iron-hard foot-and-a-quarter-long erection she is sporting require considerable skill to make, especially if they must also conceal two pairs of baseball-sized nuts, so swollen and heavy with cum that you think you can hear them slosh softly from where you have fallen.  "<i>We agreed to do it shark style; you lost, so that means I\'m in charge.  Get undressed and show me that cute little ',
                false
            );
            if (this.player.hasVagina()) this.outx("cunt");
            else this.outx("pucker");
            this.outx(' of yours!</i>"  ', false);
            // [(If Izmafight is -1 or -2)
            if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] >= -2)
                this.outx(
                    `With some reluctance, but driven by your promise, you remove pieces of your ${this.player.armorName} until you stand naked before the hungrily ogling tigershark.`
                );
            // (If Izmafight is -3 or less)
            else
                this.outx(
                    "You are already undressed before Izma has finished speaking.  The tigershark is clearly surprised, and, to be honest, a part of you is surprised too... but it's drowned out by the need to give yourself over to Izma's lusts.",
                    false
                );
            this.outx("\n\n", false);

            this.outx("Your 'cute little ");
            if (this.player.hasVagina()) this.outx("cunt");
            else this.outx("pucker");
            this.outx("' clenches tight in ");
            if (this.player.HP < 1) this.outx("fear");
            else this.outx("anticipation");
            this.outx(
                " at the thought of something that huge forcing its way into it... but you did make a promise and you are ",
                false
            );
            if (this.player.HP < 1) this.outx("too weak to resist");
            else this.outx("feeling very horny");
            this.outx(
                `, so you comply.  You remove the last bits of your ${
                    this.player.armorName
                }, and position yourself on the ground, your ${this.buttDescript()} facing towards Izma.  You can hear her stalking across the sand toward you, but it still sends tingles up your spine when her hands - now free of her metal gauntlets - fall onto your ${this.assDescript()}.\n\n`,
                false
            );

            this.outx(
                '"<i>Ooh, looking good from this angle.  I\'m going to enjoy taking you like this... after all, if you want to be on top, then you gotta fight for it.</i>"\n\n',
                false
            );

            this.outx(
                "You feel a sudden, hot liquid sensation in between your buttocks, and you squeak in shock - it's almost like somebody has tipped hot lava onto your backside.  When you look over your shoulder, though, your limited span of vision confirms what the sensation of something large with a rounded, narrow tip pressing against your pucker suggests; there's nothing there but Izma's huge, pre-cum dripping cock.\n\n",
                false
            );
        }
        // Male/Unsexed loss:
        if (this.player.gender <= 1) {
            // [(If player has tight butthole:)
            if (this.player.analCapacity() < 26) {
                this.outx(
                    `You can't help but yell in pain at the sudden sensation of something so huge forcing its way into your ${this.assholeDescript()}.`
                );

                this.outx(
                    '\n\n"<i>Holy-!  Think I better take it easy on this...</i>" you hear Izma proclaim.  "<i>For my own safety moreso than anything else!</i>"  Her efforts become more gentle.  She still forces her way into you, inch by painstaking inch, but she does so at a slower, steady pace, allowing your pucker time to adjust to the fierce stretching she is subjecting it to and using her hot pre-cum like lubricant.',
                    false
                );
                // (If Izmafight <= -4)
                if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= -4)
                    this.outx(
                        "  You find yourself pushing back to speed up the process, desperate for Izma to fill you again.",
                        false
                    );
                this.player.buttChange(this.monster.cockArea(0), true, true, false);
            }
            // (If player has middling anus:)
            else if (this.player.analCapacity() < 60) {
                this.outx(
                    "You can feel every inch of her cock as it sinks steadily into your anus, swelling into your guts as inexorably as the flood tide.\n\n",
                    false
                );

                this.outx(
                    '"<i>Ahhhh... now that\'s a nice little hole!  Did you lose on purpose?</i>" she asks, and you can hear the grin in her voice.',
                    false
                );
                // (If the player has lost 4+ times)
                if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= -4)
                    this.outx("  You find yourself wondering that as well...");
                this.player.buttChange(this.monster.cockArea(0), true, true, false);
            }
            // (If player has a loosey goosey:)
            else {
                this.outx(
                    `Izma's cock may be fairly impressive, but you've taken bigger in your time, and it shows; Izma's first experimental thrust sees her sink up to the hilt into your bowels, and you moan with the pleasure of being filled again even as her four balls slap against your ${this.buttDescript()}.\n\n`,
                    false
                );

                this.outx(
                    '"<i>The heck!?  What kind of monsters have you been running into?</i>" she wonders aloud.',
                    false
                );
            }

            this.outx(
                `\n\nFully buried, she tightly grips your ${this.assDescript()}  and then pulls out partway, before thrusting herself back in fiercely.  "<i>Thought you were clever, eh?  Wanted to try doing it like shark people do, did you?  Well, among the sharks, there're only two sorts - the strong and the weak.  And this is what the weak get.</i>"  She growls fiercely.\n\n`,
                false
            );

            this.outx(
                `Harder and faster she thrusts, building up a rhythm that grows in pace, her balls slapping audibly against your ${this.buttDescript()} as she bucks back and forth.  You can feel her huge male organ in your depths, rubbing against your prostrate, stretching your inner walls, her boiling erection against your burning heat.  You moan in pleasure; you can't help but enjoy this`
            );
            if (this.player.hasCock())
                this.outx(
                    ", and your own male organ is hard and throbbing from the stimulation",
                    false
                );
            this.outx(".\n\n", false);

            this.outx(
                "\"<i>Oh, somebody likes it, eh?  Well, don't worry, you wanted to test your luck, so I'm not going to hold back!  You're getting the whole experience, sweetheart!</i>\" Izma growls.  Her hands suddenly shift from squeezing your buttocks to holding onto your back, and you howl in a mixture of pain and pleasure as Izma suddenly bites you - hard enough that you can feel it, but not hard enough to draw blood, especially given her shark teeth are retracted.  Her other teeth fix themselves in your side as she ruts with you, and you can't help but thrust yourself back against her.",
                false
            );
            // (If Izmafight = -4)
            if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= -4)
                this.outx(
                    "  If this is how the sharks do it, you could really get used to it...",
                    false
                );
            this.outx("\n\n", false);

            this.outx(
                "\"<i>That's it, weakling, moan for me; make this sweeter!  I'd be moaning if you had won, so the least you can do is give me the same courtesy - fair's fair!</i>\" she mumbles.  \"<i>Oh, yes, yes, yes!  Good little fuck, good!  I... I'm... here... it... comes!</i>\"  She roars, releasing her grip on your shoulder to bellow her exultation to the sky, the climax that has been churning and thrashing her mighty balls finally erupting from within her.\n\n",
                false
            );

            this.outx("You groan as well, ");
            // [(male)
            if (this.player.hasCock()) {
                this.outx(`${this.sMultiCockDesc()} disgorging `);
                if (this.player.cumQ() < 25) this.outx("a trickle");
                else if (this.player.cumQ() <= 150) this.outx("several squirts");
                else this.outx("a steady stream");
                this.outx(
                    " of semen onto the sandy earth below you, but it pales in comparison to the tide flooding into your guts.  Hot and slick, it surges and flows into you, pumping and pumping into your depths.",
                    false
                );
            }
            // (unsex)
            else this.outx("your own muscles spasming from the immense pleasure.");
            this.outx(
                "  Your belly grows as the great wave of tigershark cum reaches your stomach and fills it to the brim, and then it begins to stretch further.  Your limbs fail you and you fall face-first onto the sand in your pleasure, too consumed by sensation to even notice your stomach puffing out firm and hard against the earth.\n\n",
                false
            );

            this.outx(
                "Finally, Izma stops, panting hard for breath as her cock softens and is pulled free from your stretched anus, a steady trickle of hot cum pouring out in its wake.  As she recovers, so too do you, rolling over so that you can see her, your midriff swollen into a small but undeniable gut from all the cum she has poured into you.  She looks at you, undeniably pleased by what she sees.\n\n",
                false
            );

            this.outx(
                "\"<i>That's how shark people have sex,</i>\" she tells you.  \"<i>Of course, it's different if you're the one who won... but you'll need to come back again and beat me if you want to see what that's like.</i>\"  She gathers her clothing and drops the tooth into your lap, then leans down and gives you a small peck on the lips before diving back into the water, most likely to clean herself off.\n\n",
                false
            );

            this.outx(
                "You remain where you are, waiting for the strength to flow into your limbs and for some of the abundance of sexual fluids to vacate your stuffed entrails before you dress yourself and leave.  You had no idea that Izma could take charge in such a fierce manner... but, at the same time, you find yourself actually liking it.  A part of you wonders if you could see her that way again...",
                false
            );
            // (Izmafight - 1)
            this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON]--;
        }
        // Female Loss:
        else if (this.player.gender == 2) {
            // [(If player has tight cunt:)
            if (this.player.vaginalCapacity() < 26) {
                this.outx(
                    `You can't help but yell in pain at the sudden sensation of something so huge forcing its way into your ${this.vaginaDescript(
                        0
                    )}.\n\n`,
                    false
                );

                this.outx('"<i>Whoah-!  ', false);
                if (this.player.vaginas[0].virgin) this.outx("First time, huh?");
                else this.outx("That's tight!");
                this.outx(
                    "  Don't worry kiddo; I'll go easy on you... at least for the first few thrusts.</i>\"  Surprisingly she's telling the truth, and her efforts become more gentle.  She still forces her way into you, inch by painstaking inch, but she does so at a slower, steady pace, allowing your pussy time to adjust to the fierce stretching she is subjecting it to, using her hot pre-cum like lubricant.",
                    false
                );
                // (If Izmafight <= -4)
                if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= -4)
                    this.outx(
                        "  You find yourself pushing back to speed up the process, desperate for Izma to fill you again.",
                        false
                    );
                this.player.cuntChange(this.monster.cockArea(0), true, true, false);
            }
            // (If player has ordinary, everyday cunt:)
            else if (this.player.vaginalCapacity() < 60) {
                this.outx(
                    `You can feel every inch of her cock as it sinks steadily into your ${this.vaginaDescript(
                        0
                    )}, filling your moist folds as inexorably as the rising tide.\n\n`,
                    false
                );

                this.outx(
                    '"<i>Ahhhh~  Now that\'s a nice little hole!  Did you lose on purpose?</i>" she asks, and you can hear the grin in her voice.',
                    false
                );
                // (If the player has lost 4+ times)
                if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= -4)
                    this.outx("  You find yourself wondering that as well...");
                this.player.cuntChange(this.monster.cockArea(0), true, true, false);
            }
            // (If player is loose:)
            else {
                this.outx(
                    "Izma's cock may be fairly impressive, but you've taken bigger in your time, and it shows; Izma's first experimental thrust sees her sink up to the hilt into your crotch, and you moan with the pleasure of being filled again even as her four balls slap against your taint.\n\n",
                    false
                );

                this.outx(
                    '"<i>The heck!?  What kind of monsters have you been running into?</i>" she wonders aloud.',
                    false
                );
            }
            this.outx(
                `\n\nFully buried, she tightly grips your ${this.buttDescript()} and then starts to pull out, before thrusting herself back in fiercely.  "<i>Thought you were clever, eh?  Wanted to try doing it like shark people do, did you?  Well, among the sharks, there're only two sorts - the strong and the weak.  And this is what the weak get.</i>"  She growls fiercely.\n\n`,
                false
            );

            this.outx(
                "Harder and faster she thrusts, building up a rhythm that grows in pace, her balls slapping audibly against your butt as she bucks back and forth.  You can feel her huge male organ in your depths, rubbing against your womb's walls and stretching you out, her boiling erection pressed against your burning insides.  You moan; you can't help but enjoy this, your cunt drooling from the intense pleasure.\n\n",
                false
            );

            this.outx(
                `"<i>Oh, somebody likes it, eh?  Well, don't worry, you wanted to test your luck, so I'm not going to hold back!  You're getting the whole experience, sweetheart!</i>" Izma growls.  Her hands suddenly shift from your buttocks to holding onto your ${this.chestDesc()}, and you howl in a mixture of pain and pleasure as Izma suddenly gives your ${this.nippleDescript(
                    0
                )}s a good hard tug.  "<i>Stiff nipples?  You so wanted this...</i>" Izma teases, licking at your neck and causing you to moan in pleasure.`
            );
            // (If the player has lost 4+ times)
            if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= -4)
                this.outx(
                    "  If this is how the sharks do it, you could really get used to it...",
                    false
                );
            this.outx("\n\n", false);

            this.outx(
                "\"<i>That's it, weakling, moan for me; make this sweeter!  I'd be moaning if you had won, so the least you can do is give me the same courtesy - fair's fair!</i>\" she mutters.  \"<i>Oh, yes, yes, yes! Good little fuck, good!  I... I'm... here... it... comes!</i>\"  She roars, releasing her grip on your tormented breasts to bellow her exultation to the sky, the climax that has been churning and thrashing her mighty balls finally erupting from within her.\n\n",
                false
            );

            this.outx(
                "You groan as well, your own orgasm coating the sands beneath you with girly fluids as Izma's cum boils into your womb.  Hot and slick, it surges and flows into you, pumping and pumping into your depths. Your belly grows as the great wave of tigershark cum reaches your stomach and fills it to the brim, and then it begins to stretch further.  Your limbs fail you and you fall face-first onto the sand in your pleasure, too consumed by sensation to even notice your stomach puffing out firm and hard against the earth.\n\n",
                false
            );

            this.outx(
                "Finally, Izma stops, panting hard for breath as her cock softens and is pulled free from your ravaged cunt, a steady trickle of hot cum pouring out in its wake.  As she recovers, so too do you, rolling over so that you can see her, your midriff swollen into a small but undeniable gut from all the cum she has poured into you.  She looks at you, undeniably pleased by what she sees.\n\n",
                false
            );

            this.outx(
                "\"<i>That's how shark people have sex,</i>\" she tells you.  \"<i>Of course, it's different if you're the one who won... but you'll need to come back again and beat me if you want to see what that's like.</i>\"  She leans down and gives you a small peck on the lips, then drops the tigershark tooth beside you."
            );
            if (this.player.pregnancyIncubation == 0 || this.player.pregnancyIncubation > 180)
                this.outx(
                    "  From her oak chest she fetches an odd leaf, which she pushes past your lips.  \"<i>Birth control herbs.  No way I'm giving kids to someone who's not my mate,</i>\" Izma says, making sure you swallow the plant before diving into the water, most likely to clean herself off.\n\n",
                    false
                );

            this.outx(
                `You remain where you are, waiting for the strength to flow into your limbs and for some of the abundance of sexual fluids to vacate your ${this.vaginaDescript(
                    0
                )} before you dress yourself and leave.  You had no idea that Izma could take charge in such a fierce manner... but, at the same time, you find yourself actually liking it.  A part of you wonders if you could see her that way again...`
            );
            // (Izmafight minus 1)
            this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON]--;
        }
        // Loss Scene- Herm
        else {
            // [(If player is reduced to 0 HP:)
            if (this.player.HP < 1) {
                this.outx(
                    "One of Izma's metal-clad fists cracks hard against your stomach, sending you crashing onto the sandy earth - you aren't seriously hurt, but you're too weak to continue fighting, and Izma knows it.\n\n",
                    false
                );

                this.outx(
                    "She grins at you, a rather fierce expression given she's still got her shark-teeth out, but her tone is gentle enough.  \"<i>Hah! Looks like I win this round, kid!  Now, I believe there's something you owe me, and I intend to have it...</i>\"\n\n",
                    false
                );
            }
            // (If player is raised to 100 Lust:)
            else {
                this.outx(
                    "Your legs buckle, and your mind fogs with arousal; you are too turned on to continue fighting and collapse bonelessly into an aroused heap.\n\n",
                    false
                );

                this.outx(
                    'Izma shakes her head, grinning wryly.  "<i>Looks like somebody needs to get more discipline before they try a sex-off.</i>"\n\n',
                    false
                );
            }
            this.outx(
                `As you collapse in defeat, you're aware of the pretty tigershark stalking around you and removing her clothing.  She grabs hard on your ${this.player.armorName} and undresses you with minimal effort, revealing your `
            );
            if (this.player.lust < 40) this.outx("limp cock and barely-engorged cunt");
            else if (this.player.lust < 70) this.outx("turgid erection and moist cunt");
            else this.outx("throbbing erection and slavering cunt.");
            this.outx("\n\n", false);

            this.outx(
                "\"<i>Dirty little minx, ain't ya?  You wanted this, didn't you...</i>\" Izma teases, shoving two fingers into your moist nether-lips, to test the waters.  The peneration of your needy cunt does serve to make you whimper softly, almost begging to just be filled.  ",
                false
            );
            // (Tight/Virgin vagina)
            if (this.player.vaginalCapacity() < 26) {
                this.outx(
                    '"<i>My oh my, quite a tight little slit you got back here. Not for long...</i>" Izma says, her fingers roaming around within your cunt.',
                    false
                );
            }
            // (If player has ordinary, everyday cunt:)
            else if (this.player.vaginalCapacity() < 60) {
                this.outx(
                    'Izma giggles slightly from just how easy it is to move around your moist folds.  "<i>Well, this\'ll make things slightly easier for you I suppose.</i>"',
                    false
                );
            } else {
                this.outx(
                    "Izma's eyes widen as her entire hand seems to slip into your cavernous vagina. \"<i>Holy shit... what's been up here?</i>\" she mumbles, laughing nervously in amazement.",
                    false
                );
            }
            this.outx("\n\n", false);

            this.outx(
                "Pulling her fingers free, Izma quickly flips your nude body over, leaving you on your back and staring up at her.  Izma's hands are resting on her hips and she seems to be puffing her large chest out proudly. Her foot-long cock is fully erect, hot beads of pre-cum occasionally dripping onto the sands.  She takes the time to examine your own cock, grinning with her fangs bared.  \"<i>Let's see what you've got, weakling.</i>\"  ",
                false
            );
            const x: number = this.player.biggestCockIndex();
            // (1-10 inch penis)
            if (this.player.cocks[x].cockLength <= 10)
                this.outx(
                    'Izma manages to supress a snort of laughter at the sight of your cock.  "<i>Um... wow?  It\'s simply... heh, huge...</i>"',
                    false
                );
            // (10-19 inches)
            else if (this.player.cocks[x].cockLength <= 19)
                this.outx(
                    '"<i>Not bad, I\'m actually impressed,</i>" Izma says, nodding slightly in approval.',
                    false
                );
            // (20+ inches)
            else
                this.outx(
                    `Izma gives a low whistle at the sight of your ${this.cockDescript(
                        x
                    )}.  "<i>Now THAT'S a cock.  Looks like you've got a third leg down there!</i>"`
                );

            this.outx(
                `\n\nSeemingly done appraising you, Izma roughly grabs your ${this.player.feet()} and pulls your rear upwards, forcing your weight onto your spine and making you cry out from the uncomfortable position.  She doesn't waste time on foreplay, simply deciding to bury her cock into you slowly, inch by painstaking inch until she's pushing against the entrance to your womb.`,
                false
            );
            this.player.cuntChange(this.monster.cockArea(0), true, true, false);
            this.outx("\n\n", false);

            this.outx(
                `She starts thrusting in and out of you, gradually increasing the speed and force, her hot pre-cum and your feminine juices acting like a lubricant to make things easier.  "<i>Ahh~  You're a lovely cock-sleeve... you like being treated like this, don't ya, weakling?</i>" Izma taunts, slamming in and out of your ${this.vaginaDescript(
                    0
                )}.`
            );
            // (If Izmafight <= -4)
            if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= -4)
                this.outx(
                    "  You're not even really ashamed to admit that such is the case anymore.",
                    false
                );
            this.outx("\n\n", false);

            this.outx(
                'Every thrust pushes you deeper into the sands, and eventually you find yourself pumping your hips upward against Izma\'s own, eager to pleasure her and yourself.  Izma seems to notice this and laughs loudly.  "<i>Oh?  You really like being dominated?  Ha, I thought as much.</i>"  She continues to taunt you as she pounds into you, her balls smacking against you every time.  Your mind is too clouded with lust to hear even half of what she says.  Right now all you care about is getting off.\n\n',
                false
            );

            this.outx(
                `Within minutes, Izma gives one final, powerful thrust and roars loudly, cum pumping into your womb and spraying out onto the sands.  ${this.SMultiCockDesc()} twitches and pulses, ready to blow.  Izma quickly takes hold and points `
            );
            if (this.player.cockTotal() == 1) this.outx("it");
            else this.outx("them");
            this.outx(
                ` toward your face, stroking you to your own climax.  Jets of your own cum splatter across your face and body as you writhe, protesting. "<i>Tch, you really thought I'd let you cum on ME?  Maybe if you actually managed to beat me I'd give you the honor,</i>" Izma says, pulling free with a loud *SCHLICK* sound.  She releases your ${this.player.feet()}, allowing your ${this.buttDescript()} to hit the sand with a plop, and gets to work redressing while you lie still.`
            );
            if (this.player.pregnancyIncubation == 0 || this.player.pregnancyIncubation > 150) {
                this.outx(
                    "  Moving over to her oak chest, she returns with a strange leaf in her hands, which she pushes past your lips.\n\n",
                    false
                );

                this.outx(
                    "\"<i>Anti-pregnancy herb.  Can't have someone bearing my litter if they're not my mate, can I?</i>\"  Izma explains, moving over to the shoreline.  "
                );
            } else this.outx("\n\n");
            this.outx(
                "She gives you a wink and tosses the promised tooth at your feet before diving into the water, presumably to clean herself off.  Several minutes later, you wash up as well and stagger back to camp, sore from the ordeal.  Izma sure can be rough when she wants.  A part of you wonders if you could see her that way again...",
                false
            );
            // (Izmafight minus 1
            this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON]--;
        }
        this.player.orgasm();
        this.dynStats("sen", 2);
        // [Post-loss submissiveness blurb, checks Izmafight AFTER any changes from the sex]
        // zmafight -1:
        if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] >= -1)
            this.outx(
                "  You realize what you're thinking and shudder, forcing the submission-tinged desires down. Where did they come from, anyway?",
                false
            );
        // Izmafight -2:
        else if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] >= -2)
            this.outx(
                "  Though you manage to force them away, the dreams of submitting to Izma are starting to haunt you, their power and seductive allure growing. But, still, you can control them.",
                false
            );
        // Izmafight -3:
        else if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] >= -3)
            this.outx(
                "  You hum idly to yourself and enjoy the mental visions for a while, then, with some reluctance, you push them aside. Still, you're sure you can bring them out again when you want to enjoy them.",
                false
            );
        // Izmafight -4:
        else if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] >= -4)
            this.outx(
                "  You have only the vaguest thought that maybe you shouldn't be thinking about Izma in that way, but it's so tempting to just immerse yourself in the sexiness of having a hot herm shark-girl dominate you so thoroughly. After all, it's not as if there's any harm in doing so, is there?",
                false
            );
        // Izmafight -5:
        else
            this.outx(
                "  You embrace the dreams fully, desperate to cling to them as long as you can. It's getting so hard to care about your former mission anymore; why fight the demons when you can just give it up and surrender yourself to Izma? Yes... such a strong, powerful, worthy alpha she is; Izma is all you need. Let her take control of your life, why don't you?",
                false
            );
        this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = this.consumables.TSTOOTH.id;
        this.player.slimeFeed();
        this.cleanupAfterCombat();
    }

    // [Final loss sex scene]
    // (trigger if PC loses with Izmafight <= -5)
    private finalIzmaSubmission(): void {
        this.outx("", true);
        this.outx(
            "You collapse onto your hands and knees, defeated by Izma once again.  You feel you may not have fought as hard as you could have though, out of a deep-rooted desire for Izma to dominate you again.\n\n",
            false
        );

        this.outx(
            `Izma sniggers as she advances on you, happy to oblige your desire, casually undoing your ${this.player.armorName} after scattering her own clothing to the rocks.  "<i>Aw, was that all? Honestly...</i>" she mocks, walking behind you, "<i>you're quite the little bitch, aren't ya?  You just love submitting to Izma, don'tcha?</i>"  You whimper slightly and nod your head in response.  As Izma leans into your back, her rock-hard nipples and cock press into your `
        );
        if (!this.player.isTaur()) this.outx("spine");
        else this.outx("flank");
        this.outx(".\n\n", false);

        this.outx(
            `Some of Izma's hot pre-cum dribbles out onto your back and runs down to your ${this.assDescript()}.  It causes your eyes to roll back in your head; you can only imagine the taste of her salty pre running down your throat.  Izma snickers, aware of her hold over you, before tightening her grip.`
        );
        if (this.player.hasCock() || this.player.hasVagina()) {
            this.outx("  The tight embrace makes ");
            if (this.player.hasCock()) {
                this.outx(`${this.sMultiCockDesc()} stiffen`);
                if (this.player.hasVagina()) this.outx(" and ");
            }
            if (this.player.hasVagina())
                this.outx(`your ${this.vaginaDescript(0)} moisten considerably`);
        }
        this.outx(".\n\n", false);

        this.outx(
            '"<i>Beg,</i>" she orders, licking your neck and collarbone, giving off a few growls and purrs as she goes.  "<i>Wh-what?</i>" you manage to reply, lost in your anticipation.  "<i>You heard me,</i>" she replies sternly, grinding her throbbing cock, now erect and well over sixteen inches, against your back.  It seems like giving free rein to her dominating instincts is making her harder than you\'ve ever felt.  You moan loudly from the sensation.  "<i>Please fuck me!  Please, Izma, mistress, I need your cock!</i>" you cry, not caring if anything is nearby to hear you.  Izma chuckles in response before pulling you in and roughly kissing you, her long tongue curling around your own.  She continues to tongue-fuck you until you nearly run out of breath, and you feel like Izma could make you orgasm from this alone.\n\n',
            false
        );

        this.outx(
            `She keeps you held in place as she positions the tip of her cock against your ${this.assholeDescript()}.  With no warning, she forces her meat-pole into you, making you squeal in delight from the familiar heat of her cock.  `
        );
        this.player.buttChange(this.monster.cockArea(0), true, false, true);
        this.outx(
            `She keeps forcing her way in your backdoor, inch after inch, and you only feel weaker against Izma the further in she goes.  Eventually she manages to bury her entire dick into your pucker, sighing in delight as her meaty quads press against your ${this.buttDescript()}.\n\n`,
            false
        );

        this.outx(
            "She pulls back out, and for a moment you feel a bit of trepidation at the absence of her cock, before crying out as she again goes balls-deep into your backside.  She continues to thrust and grind into you, giving a few animalistic snarls of pleasure.  You manage to glance back, only to notice how completely the bookworm has turned into some sort of proud wild woman.  It suits her; she's proven that she's so much stronger than you, after all.  So strong, so in control, so powerful... it feels right to be like this, underneath Izma as she asserts her position over you.\n\n",
            false
        );

        this.outx(
            `As if sensing your complete submission, Izma's hands trail down toward your ${this.breastDescript(
                0
            )}, mauling and groping at them, tweaking your ${this.nippleDescript(
                0
            )}s in an almost-painful fashion.  It only manages to turn you on further though, groaning and squirming from intense pleasure.  Izma makes you orgasm first, your muscles twitching and spasming as you briefly lose control over yourself`
        );
        if (this.player.hasVagina() || this.player.hasCock()) {
            this.outx("; ");
            if (this.player.hasCock()) {
                this.outx(`${this.sMultiCockDesc()} begins spurting jizz all over the sandy shore`);
                if (this.player.hasVagina()) this.outx(" and ");
            }
            if (this.player.hasVagina())
                this.outx(`your ${this.vaginaDescript(0)} starts squirting fluids liberally`);
        }
        this.outx(".\n\n", false);

        this.outx(
            "However, you're filled with desire to be laden with her seed again, perfect specimen that she is, and you start pushing your backside vigorously against Izma's cock again.  \"<i>Ah, there's a good bitch!  Make me cum, and you'll earn my favor!</i>\" Izma hisses, brutally stretching your anus from her thrusting.  It doesn't take much longer for Izma to climax, and she gives an animalistic roar as she ejaculates inside you, blasting your innards with her thick load of semen.  She looses her grip on you and lets you fall onto the sand as she starts catching her breath, sweat dripping off her body.  Her cock eventually slides free, and you can feel her hot and potent cum flowing out.\n\n",
            false
        );

        this.outx(
            'The two of you stay unmoving for a few moments.  She gets to her feet first, throwing a tigershark tooth at you.  "<i>Here\'s your reward, slut... though, a bitch you should be happy enough with my seed alone.</i>"  You get to your knees and follow her as she walks away to redress.  "<i>You can go now, you know,</i>" Izma says bluntly, making you gasp slightly in response.  You explain that you don\'t want to leave the beautiful tigershark, feeling so safe with such a mighty specimen watching over you.  You beg and plead with her to let you stay, saying that you\'ll do anything to remain by her side.  Izma blinks a few times in surprise before smiling softly and cupping the side of your face.  "<i>Anything, hm? Well... I suppose I could be your alpha, if you like.</i>"  You nod vigorously at the idea; no matter what that means, if it\'ll keep Izma with you, you\'re for it.  "<i>You do make for a pretty good fuck after all,</i>" she continues.',
            false
        );
        // [(if PC isn't shark/tigershark)
        if (this.player.race() != "shark-morph")
            this.outx(
                '  "<i>But we\'ll have to make some changes to your body, of course...</i>"',
                false
            );
        this.outx("\n\n", false);
        this.player.slimeFeed();
        this.player.orgasm();
        this.doNext(this.IzmaBadEnd);
    }
    // [Bad end]
    private IzmaBadEnd(): void {
        this.outx("", true);
        this.outx("<b>One year later...</b>\n\n", false);

        this.outx(
            'You sigh happily as you nestle close to Izma on the sands, never wanting to leave your alpha\'s side.  Izma strokes your hand, but seems more interested in the bag of gems in her own.  "<i>Huh, we made quite a haul today clearing out that minotaur cave.  Oh, so many books I can buy,</i>" she remarks, grinning at the prospect.  "<i>Maybe I should get some property?  I mean, I\'m getting tired of living on a small lakeside camp... perhaps Whitney has a building to spare?  She does still owe us, ever since we cleared those slimes out of her pepper patch,</i>" she adds, standing upright and walking down the beach.\n\n',
            false
        );

        this.outx(
            "You arise eagerly and follow after her like a love-struck puppy.  Your muscles do feel quite sore from today's adventuring, but the fact that Izma uses you to help her in combat, instead of just keeping you as a sex toy",
            false
        );
        if (this.player.gender >= 2) this.outx(" and a fertile womb");
        this.outx(
            ", is wonderful.  It gives you a real sense of purpose, serving your alpha in such a way.\n\n",
            false
        );

        this.outx(
            '"<i>Ah well, those are concerns for a later date.  Come on, sweetheart,</i>" Izma says, turning and opening her skirt to reveal the familiar sight of her throbbing erection.  You grin and bend yourself over a nearby rock, lifting your own striped shark tail up.  She grunts and buries her fat cock into your asshole, making you gasp loudly; you start to moan and push back against her from the pleasure.\n\n',
            false
        );

        this.outx(
            'Izma seems to pause for a moment, distracted by something; you whine slightly in protest.  "<i>Shut up for a second,</i>" she orders.  You turn your head and narrow your eyes in a bid to see what Izma is looking at, and eventually pick out a figure drawing closer along the sands.  A human girl, from what you can see.  The sight manages to bring back a few memories of a more confused time, before you met your alpha. Izma grins at the sight and licks her lips.  "<i>Well, wouldja look at that.  Hm... I suppose I could do with a harem...</i>"',
            false
        );
        // GAME OVERYUUUUU
        this.getGame().gameOver();
    }

    // [Victory rape-use penus]
    private victoryPenisIzma(): void {
        this.outx("", true);
        let cockIndex: number = this.player.cockThatFits(this.monster.vaginalCapacity());
        if (cockIndex < 0) cockIndex = 0;
        this.outx(
            `You watch the defeated tigershark closely and a grin forms on your face.  You touch a hand to her forehead and push her onto her back with minimal effort, slipping her clothing off.  She hardly lacks the strength to stop you, but she knows full well what the terms of the battle were, so she's not going to go back on her word.  You remove your ${
                this.player.armorName
            } and spread Izma's legs wide, ${this.sMultiCockDesc()} almost painfully erect as you lift her quartet of balls up to look at her glistening womanhood.\n\n`,
            false
        );

        this.outx(
            `Not wanting to waste any time on foreplay, you push your ${this.cockDescript(
                cockIndex
            )} into Izma's slit as far as you can manage, making Izma gasp sharply and writhe against you.  You snicker and start thrusting into her, the odd little tendrils inside her cunt teasing and massaging your cock.  The walls themselves are so tight and smooth that her pussy conforms to you like a glove.  It almost feels like Izma's snatch was made just for you.`
        );
        // [(If Izmafight = 3+)
        if (this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] >= 3)
            this.outx(
                "  Hell, maybe it was made for you, given just how eager Izma seems to be whenever she sees you.  It's like she loses to you on purpose.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            "You start to pick up speed as you mash your hips against Izma's own, earning moans from the pretty tigershark which only seem to get louder with every subsequent thrust.  Izma quickly starts to return the gesture, moving her hips up to meet your own thrusts every time.  It's while she's doing this that you notice her throbbingly erect cock wobbling around.\n\n",
            false
        );

        this.outx(
            `Deciding that it'd be rude not to, and because you want to see just how loud you can make Izma moan, you grab hold of her raging erection and start jerking her off while you pound into her.  The move seems to surprise Izma, and she starts moaning and screaming in pleasure.  The double stimulation you're pulling off pushes Izma past her limit very quickly, and she starts shooting thick jets of spunk into the air, which begin to rain down on her face and breasts.  Her vaginal walls clamp down on your ${Appearance.cockNoun(
                this.player.cocks[cockIndex].cockType
            )} almost painfully as the orgasm wracks her female genitalia too.\n\n`,
            false
        );

        this.outx(
            "Izma starts panting and gasping for breath after the intense release, but immediately starts groaning when she realizes you are not done.  You giggle and release her softening erection, placing both hands on her thighs as you start to redouble your efforts at fucking her.  You push Izma deeper and deeper into the sands with each thrust, and despite her exhaustion Izma gives a few soft pleasured moans.\n\n",
            false
        );

        // [(Male)
        if (this.player.gender == 1) {
            this.outx(
                `After a lengthy fuck, you grunt loudly as your ${this.cockDescript(
                    cockIndex
                )} swells, blasting streamers of jizz into Izma's womb`
            );
            // [(multi)
            if (this.player.cockTotal() > 1) this.outx(" and onto her groin");
            this.outx(", causing Izma to cry out loudly.");
            // [(big skeet)
            if (this.player.cumQ() >= 500) {
                this.outx("  Her belly swells as you empty your impressive load into her");
                if (this.player.cumQ() >= 1500)
                    this.outx(
                        ".  Eventually it can swell no more and each new squirt forces cum out from her stuffed pussy, trickling past her asshole",
                        false
                    );
                this.outx(".");
            }
            this.outx(
                `  You sigh happily and push back from her, weakly getting back on your ${this.player.feet()} and redressing. Izma scrambles to her chest and takes out some sort of leaf, then eats it.\n\n`,
                false
            );
        }
        // (Herm)
        else {
            this.outx(
                `After a lengthy fuck, you grunt loudly as your ${this.cockDescript(
                    cockIndex
                )} swells, blasting streamers of jizz into Izma's womb`
            );
            if (this.player.cockTotal() > 1) this.outx(" and onto her groin");
            this.outx(", causing Izma to cry out loudly.");
            // [(big skeet)
            if (this.player.cumQ() >= 500) {
                this.outx("  Her belly swells as you empty your impressive load into her");
                if (this.player.cumQ() >= 1500)
                    this.outx(
                        ", eventually it can swell no more and each new squirt forces cum out from her stuffed pussy, trickling past her asshole",
                        false
                    );
                this.outx(".");
            }
            this.outx(
                `  You sigh happily and push back from her, weakly getting to your ${this.player.feet()}.  You're not done yet though, not fully.\n\n`,
                false
            );

            this.outx(
                `Izma gasps again as you plant your ${this.vaginaDescript(
                    0
                )} onto her face, grinding against the angular features and moaning loudly as her obliging tongue darts past your lips.  You could really get used to this feeling.  You ride her face for another few minutes before an orgasm rocks your female parts, splattering girlcum onto Izma's face.  You sigh happily and weakly get to your feet, redressing.  You see Izma fishing something from her storage chest - a plant of some sort - and munching it down.\n\n`,
                false
            );
        }
        this.player.orgasm();
        // [(if Izmafight <=4)
        if (
            this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= 4 ||
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00235] > 0
        ) {
            this.outx(
                "You say your goodbyes to the pretty tigershark and leave once she hands you your tooth-shaped reward.",
                false
            );
            this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = this.consumables.TSTOOTH.id;
            this.cleanupAfterCombat();
        }
        // (if Izmafight >=5 then go to [Victor's Choice]] (Izmafight +1)
        else this.victorzChoice();
        this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON]++;
    }

    // [Victory scene- use vagino]
    private useVagooOnIzmaWin(): void {
        this.outx("", true);
        this.outx(
            `You watch the defeated tigershark closely and a grin forms on your face.  You touch a hand to her forehead and push her onto her back with minimal effort, slipping her clothing off.  She lacks the strength to stop you, but she knows full well what the terms of the battle were, so she's not going to go back on her word.  You strip off your ${this.player.armorName} and spread Izma's legs wide, licking your lips at the sight of her throbbing erection and meaty quads.  You give Izma's massive cock a few test strokes, earning some pleasured groans from the tiger shark.\n\n`,
            false
        );

        this.outx(
            "Deciding you've had enough foreplay, you mount her and slide down her cock.",
            false
        );
        this.player.cuntChange(this.monster.cockArea(0), true, true, false);
        this.outx("  You start grinding and gyrating atop her, ");
        // [(taur)
        if (this.player.isTaur())
            this.outx(
                "your weight pinning her to the sand and preventing her from taking control.",
                false
            );
        // (non-taur and height > 4')
        else if (this.player.tallness > 48)
            this.outx(
                `and pin her hands above her head to stop her from trying to change the position. Her heaving breasts rub against your ${this.allBreastsDescript()} as you ride her in this posture.  She needs to know who's in charge here, after all.`
            );
        // (non-taur and height <= 4')
        else
            this.outx(
                `but small as you are, you can't stop her as she reaches up and grabs onto your ${this.buttDescript()}, then begins bouncing you like a goblin cocksleeve.`
            );
        this.outx("\n\n", false);

        this.outx(
            "Izma seems to do her best, moving and jerking her cock up as much as she can, earning gasps of pleasure from you.",
            false
        );
        // [(no-taur)
        if (!this.player.isTaur())
            this.outx(
                "  To reward your eager partner for her efforts you reach back with one free hand to massage and grope at her testes.  Izma bites her lip and starts growling loudly, pushing her hips up as far as possible, eager to cum for you.  You decide to return the favor, mashing your pussy down with increasing speed.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            'After a few more minutes of vigorous fucking, Izma grunts and roars in an animalistic fashion as she orgasms, jets of hot musky spunk pumping into your depths.  You cry out in pleasure, your inner walls clamping down on her cock and milking every available drop of jizz she has.  After a while you manage to recover and stumble onto your feet.  "<i>Hey, wait a sec,</i>" Izma says weakly as you start to leave.  She goes to her storage chest and retrieves a crumpled leaf, then holds it out to you with a smile.  "<i>Here, take this.  It\'s an anti-pregnancy herb.</i>" Do you take it?',
            false
        );
        this.player.slimeFeed();
        this.player.orgasm();
        // [yes/no]
        this.doYesNo(this.eatIzmasLeafAfterRapinHer, this.dontEatIzamsLeafAfterRape);
    }

    // [Yes]
    private eatIzmasLeafAfterRapinHer(): void {
        this.outx("", true);
        this.outx("You accept the leaf gingerly and eat it.  Izma smiles.");
        // Set loot
        this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = this.consumables.TSTOOTH.id;
        // [(if Izmafight <=4)
        if (
            this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= 4 ||
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00235] > 0
        ) {
            this.outx(
                "  You say your goodbyes to the pretty tigershark and leave once she hands you your tooth-shaped reward.",
                false
            );
            this.cleanupAfterCombat();
        }
        // (if Izmafight >=5 then go to [Victor's Choice]]
        else this.victorzChoice();
        // (Izmafight +1)
        this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON]++;
    }

    // [No]
    private dontEatIzamsLeafAfterRape(): void {
        this.outx("", true);
        this.outx(
            'You rankle at the offered herb and give her a haughty glare.  "<i>You\'re going to tell ME what to do? Me, your proven superior?</i>"\n\n',
            false
        );

        this.outx(
            "Izma cringes.  \"<i>Sorry!  I just don't want to go fathering children with someone who's not my mate!  Please, please take it!</i>\"\n\n",
            false
        );

        this.outx(
            'You slap the leaf out of her hand.  "<i>Try getting stronger before you impose your decisions on others!</i>" you bark.  "<i>Whether I decide to have your kids or not is none of your business; you should be grateful at the chance to father them with someone tougher than you!</i>"  She shivers and nods meekly, and you turn about and pick your way back to camp.\n\n',
            false
        );
        this.player.knockUp(PregnancyStore.PREGNANCY_IZMA, PregnancyStore.INCUBATION_IZMA);
        this.cleanupAfterCombat();
        // (Izmafight +1)
        this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON]++;
    }

    // [Victory scene- it feels good in my butt]
    private takeItInZeButtVictoryLikeFromIzma(): void {
        this.outx("", true);
        this.player.slimeFeed();
        this.outx("You smirk as Izma slumps down, unable to fight against you anymore.\n\n", false);

        this.outx(
            "You push her onto her back and see her inhuman dong flop free from her skirt.  Seems the combat turned the little shark on.  Well, 'little' is hardly the right word to describe any aspect of her, especially when she has a 15-inch rock-hard erection waving over her.  It actually brings a dopey grin to your face.  Well, you earned a reward, so you might as well take it.\n\n",
            false
        );

        this.outx(
            "You lean down and start licking and suckling the tip of her monster dick, slurping up her hot pre and lubricating the tip of her raging boner.  She moans and jerks at your touch, writhing around and loving the sensation of submissiveness.  The feeling of having her under your power manages to bring a smile to your own face.\n\n",
            false
        );

        this.outx(
            `Gradually you start to suck more and more of her cock, inch after inch moving down your throat.  You gag lightly as you finally reach the base of her cock, before pulling it out.  She whines weakly and looks at you pitifully, wondering why you're teasing her.  You remove your ${
                this.player.armorName
            } before turning to show her your ${this.buttDescript()}, and a small smile spreads over her angular face as she realizes what you have planned.  You plant your hands on your backside and pull your cheeks wide, before starting to slide onto her well-lubed pecker.\n\n`,
            false
        );

        this.outx(
            "She grunts and huffs as you slide down, and you too feel a strain from her iron-hard dick despite the various fluids lubricating it.  But gradually pain turns to pleasure and you're both moaning loudly and calling each other's names as you ride her.",
            false
        );
        this.player.buttChange(this.monster.cockArea(0), true, true, false);
        this.outx("\n\n", false);

        this.outx(
            `The shark grits her teeth and gives a roar as she cums, blowing a massive, hot load straight up your ${this.assholeDescript()}, bloating you slightly as she empties her quads inside you.  Your muscles twitch and contract, and you can swear you see stars as she ejaculates.  It takes you a while to catch your breath as you slide off her slowly softening meat pole and crawl onto the sand.\n\n`,
            false
        );
        this.player.orgasm();
        // [(if Izmafight <=4)
        if (
            this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON] <= 4 ||
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00235] > 0
        ) {
            this.outx(
                "You say your goodbyes to the pretty tigershark and leave once she hands you your tooth-shaped reward.",
                false
            );
            this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = this.consumables.TSTOOTH.id;
            this.cleanupAfterCombat();
        }
        // (if Izmafight >=5 then go to [Victor's Choice]]
        else this.victorzChoice();
        // (Izmafight +1)
        this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON]++;
    }

    // [Victory scene – Leave her]
    private leaveIzmaVictoryTease(): void {
        this.outx("", true);
        this.outx(
            'Izma collapses to the sand and leans back.  "<i>Ahhh... you won.  Come get your prize,</i>" she says, beginning to undress.  You stand there, considering for a moment, as she idly strokes herself.\n\n',
            false
        );

        this.outx(
            '"<i>I\'m ready, you know... we can start... any time?</i>" she puts forth cautiously as you remain still.\n\n',
            false
        );

        this.outx(
            '"<i>Nope,</i>" you announce.  "<i>I\'ve decided we\'re not going to do that.</i>"  She ogles at you, her hand paused on her shaft in mid-rub.  "<i>Take your hand off your dick,</i>" you command.  She drops it to the sand; after you stare at her for half a minute, she slowly starts to raise the other hand toward it.  "<i>The other one too,</i>" you intone, narrowing your eyes.  Sheepishly she takes it away, points to her mouth, and looks at you questioningly.  "<i>No, don\'t put it in your mouth either.</i>"\n\n',
            false
        );

        this.outx(
            '"<i>We\'re going to play the orgasm denial game,</i>" you declare.  "<i>You\'re not to masturbate, drink Lust Drafts, or have sex until you can beat me in a fight or I say you can.</i>"\n\n',
            false
        );

        this.outx(
            '"<i>What?!</i>" she yelps.  "<i>But....</i>"  You cut her off with a hand held palm-out.\n\n',
            false
        );

        this.outx(
            '"<i>Oh, I\'m sorry,</i>" you retort.  "<i>Which one of us won the fight?  That\'s what I thought,</i>" you add as she manages to nod contritely.  Seems like her hierarchical instincts are accepting this form of submission readily enough.  "<i>Well, that\'s that, then!  Be a good girl and I\'ll be back... before too long!</i>"  She nods and hands you your prize.  You wave gaily as you depart the tigershark\'s presence, her enormous erection still sticking up in plain view and throbbing as if protesting the lack of attention.',
            false
        );
        // (Izmafight +1)

        this.flags[kFLAGS.IZMA_TIMES_FOUGHT_AND_WON]++;
        this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = this.consumables.TSTOOTH.id;
        this.cleanupAfterCombat();
    }

    // [Victor's choice] (tacks onto end of victory sex if Izmafight >= 5)
    private victorzChoice(): void {
        this.outx(
            'Izma looks at you, panting from the sex.  "<i>S-so... that was good... want your reward now?</i>" she asks, holding the tigershark tooth out to you.  You stare at it, thinking.  Do you want another one of those, or do you want something else?',
            false
        );
        // [Tooth][Gloves]
        this.simpleChoices(
            "Tooth",
            this.chooseIzmaTooth,
            "Gloves",
            this.chooseIzmaGloves,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }
    // [Tooth]
    private chooseIzmaTooth(): void {
        this.outx("", true);
        this.outx("You accept the tooth from her with a polite word of thanks.");
        // (gain 1 t-shark toof)
        this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = this.consumables.TSTOOTH.id;
        this.cleanupAfterCombat();
    }

    // Gloves]
    private chooseIzmaGloves(): void {
        this.outx("", true);
        this.outx(
            'You look her dead in the eye and say, in a flat monotone, "<i>I want your gloves.</i>"\n\n',
            false
        );

        this.outx(
            '"<i>W-what?</i>" she asks, dazed.  You point at the hooked gauntlets, currently laying discarded on the beach after the sex.  "<i>But that\'s my weapon!  I need it to-</i>"\n\n',
            false
        );

        this.outx(
            "You cut her off with an airy wave of your hand.  \"<i>S'cuse me, but who's the boss here?  Pick up those gloves and give them to me graciously, little girl.</i>\"  She should be taking it as a compliment that someone above her would deign to use her weapon, a thought which you manage to convey to her by means of your no-nonsense stare.\n\n",
            false
        );

        this.outx("Meekly, she picks up the gloves and hands them to you.");
        // (gain 1 Hooked gauntlets)
        this.flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = this.weapons.H_GAUNT.id;
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00235]++;
        this.cleanupAfterCombat();
    }

    private chooseYourIzmaWeapon(): void {
        if (this.player.gender == 0) this.nonFightIzmaSmexASS();
        else if (this.player.gender == 1) this.nonFightIzmaSmexPAINUS();
        else if (this.player.gender == 2) this.nonFightIzmaSmexCUNTPUSSYSNATCHQUIM();
        else {
            this.outx("Which of your genitals will you focus on?", true);
            this.simpleChoices(
                "Male",
                this.nonFightIzmaSmexPAINUS,
                "Female",
                this.nonFightIzmaSmexCUNTPUSSYSNATCHQUIM,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
        }
    }
    // [no-fight Sex: use penus]
    private nonFightIzmaSmexPAINUS(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "Hearing that her offer is being accepted, Izma smiles brightly and sheds what little clothing she has on.  The top half of her black bikini goes first; her DD-cup breasts jiggle about from the motions, and she sighs happily now that she's free of the restricting garments.  She then gets to work undoing the well-crafted grass skirt, and props it on her oak chest as gently as possible so as not to damage it.  Her monstrous cock swings heavily between her knees, slowly hardening at the prospect of sweet release.  She's a rather magnificent specimen all things considered, and you find yourself ogling every curve on her well-toned body.\n\n",
            false
        );

        this.outx(
            "You respond in kind, shedding your garments as her lips purse and her eyes roam up and down your form.  ",
            false
        );
        // Single Normal dicks
        if (this.player.cockTotal() == 1 && this.player.cocks[0].cockType.Index < 9) {
            // [Human dick in slot 0]
            if (this.player.cocks[0].cockType == CockTypesEnum.HUMAN)
                this.outx(
                    'Izma seems surprised to see your genitalia is similar to hers.  "<i>Huh. Thought that every land-dweller usually bumbled into a dick transformation around here.</i>"',
                    false
                );
            // [Horse cock in slot 0]
            else if (this.player.cocks[0].cockType == CockTypesEnum.HORSE)
                this.outx(
                    `Seeing your ${this.cockDescript(
                        0
                    )} causes Izma to lick her lips slowly. "<i>Well... Equinum is pretty popular, isn't it?</i>"`
                );
            // [Dog cock]
            else if (this.player.hasKnot(0))
                this.outx(
                    `Izma stares intently at your ${this.cockDescript(
                        0
                    )}, as if trying to make up her mind about it. "<i>Well, it is a rather cute look. Just be careful with the knot, will ya?</i>"`
                );
            // [Tentacle]
            else if (this.player.cocks[0].cockType == CockTypesEnum.TENTACLE)
                this.outx(
                    `A puzzled look plays across Izma's face as she stares at your ${this.cockDescript(
                        0
                    )}.  "<i>Wow... I've read a lot about the corrupt plants.  Didn't think people could wind up like that.</i>"`
                );
            // [Demon Dick]
            else if (this.player.cocks[0].cockType == CockTypesEnum.DEMON)
                this.outx(
                    'Izma looks shocked as she lays eyes on your perverted pecker, having never seen anything quite like it before. "<i>Um... that looks... awkward. Like having a truncheon between your legs.</i>"',
                    false
                );
            // [cat dork]
            else if (this.player.cocks[0].cockType == CockTypesEnum.CAT)
                this.outx(
                    'She glances at your barbed pecker and winces.  "<i>You ate the fruit around here, didn\'t you?  One of my friends did that, too.</i>"',
                    false
                );
            // [lizardick]
            else if (this.player.cocks[0].cockType == CockTypesEnum.LIZARD)
                this.outx(
                    'Her eyes goggle as you reveal a bulbous purple pecker.  "<i>Oh wow.  Do you have a green one too?</i>"',
                    false
                );
            // [Captain Nemo]
            else if (this.player.cocks[0].cockType == CockTypesEnum.ANEMONE)
                this.outx(
                    `She grimaces as you unveil a ${this.cockDescript(
                        0
                    )}.  "<i>God, not one of those.  You wind up hornier after cumming than you were before you started touching it.</i>"`
                );
            // [Kangaroo Jack]
            else if (this.player.cocks[0].cockType == CockTypesEnum.KANGAROO)
                this.outx(
                    `She looks on blankly as you reveal your sheath, then gives a start as your ${this.cockDescript(
                        0
                    )} slides out of it after a few strokes.  "<i>Woah... it's so... thin and pointy.</i>"`
                );
        }
        // Multi or weird new shit.
        else
            this.outx(
                `Her eyes bug out as you reveal ${this.sMultiCockDesc()}.  "<i>Woah, jeez, look at that one... oh man, and that one's... daaamn.</i>"`
            );
        this.outx("\n\n", false);

        // [If the player is masculine but has B-cups or larger]
        if (this.player.mf("m", "f") == "m" && this.player.biggestTitSize() >= 2) {
            this.outx(
                'The fact that you have breasts seems to confuse Izma quite a bit as well, causing her to tilt her head.  "<i>You\'re a guy... with boobs.  Did you honestly think they were necessary, or did you just want something to play with?</i>"',
                false
            );
            // [If player is lactating]
            if (this.player.biggestLactation() >= 2)
                this.outx(
                    '  Catching sight of some milk oozing from your nipples makes Izma step back slightly.  "<i>You\'re lactating too?!  Man, there are way too many things that are weird about this...</i>"  Still, you doubt Izma is as turned off as she acts, what with the raging erection between her legs.',
                    false
                );
            this.outx("\n\n", false);
        }

        this.outx(
            "Once you're done appraising each other, you ask Izma just how she wants to do this.  Izma scratches the back of her neck in thought, before bringing up an idea.  \"<i>What if you lie on your back, and I blow you while you blow me?</i>\"  You're a little uncomfortable with the prospect, causing Izma to fold her arms.  \"<i>Fair's fair. I'm not gonna cum with you just staring at it, and we certainly can't assfuck each other at the same time.</i>\"\n\n",
            false
        );

        // [(If tentacle in slot 0)
        if (this.player.cocks[0].cockType == CockTypesEnum.TENTACLE)
            this.outx(
                '"<i>Well, actually...</i>" you begin, flexing your cock-tentacle.  She cuts you off with a glare.  ',
                false
            );
        // (other slot 0)
        else this.outx("You go to protest further, but stop when she gives you a glare.  ");
        this.outx(
            `You're already too horny to back out now, though.  Sighing in annoyance, you flop back onto the sands and motion at Izma to join you.  Izma nods and smiles, making her way over to you and swinging her hips from side to side as if to tease you further, before positioning her head at your groin and rubbing her own groin against your head.  "<i>Alright, let's do this,</i>" Izma says bluntly, wasting no time gorging herself on your ${Appearance.cockNoun(
                this.player.cocks[0].cockType
            )}, wrapping her tongue around it and fellating like a pro.  You gasp slightly at the expert treatment, and decide your previous protests were pointless if you're gonna get this kind of pleasure from the deal.\n\n`,
            false
        );

        this.outx(
            "You wrap your lips around Izma's own massive erection, sucking and gagging on her more-than-footlong cock as she jerks and twists her hips around.  Her muffled moans seem to assure you that you're doing a great job, and Izma responds by increasing the speed of her head-bobbing.  Your vision is a little obscured by Izma's quartet of balls repeatedly bumping against your forehead and the bridge of your nose, but if anything this serves to arouse you further.\n\n",
            false
        );

        this.outx(
            `In an effort to further pleasure your tigershark partner, you occasionally reach up to fondle her swollen sack and finger her tight, damp cunt.  Izma gasps sharply and shudders from the pleasure you're giving her.  As if to reward you for your efforts, Izma picks up more speed with her sucking, drenching every inch of your ${this.cockDescript(
                0
            )} with her saliva, and as you're so eager for her magic tongue you start thrusting your hips up to reach as far into her mouth as you can.\n\n`,
            false
        );

        this.outx(
            "Eventually, the two of you manage to bring each other to a powerful simultaneous orgasm, Izma's hot cum shoots down your eager throat, and you yourself fire loads into Izma's cheeks",
            false
        );
        if (this.player.cockTotal() > 1) this.outx(" and hair");
        this.outx(".  ");
        // [(big/mega skeet)
        if (this.player.cumQ() >= 500)
            this.outx(
                `You continue to shoot off stroke after stroke long after her mouth has filled up and she's pulled away.  "<i>For the love of Marae, ${this.player.short}, I can't swallow all that!</i>"  `
            );
        this.outx(
            "The two of you roll away from each other, and while you catch your breath you're surprised at the strong taste of Izma's cum.  You don't think you'd mind getting another load of that wonderful spunk in your stomach...\n\n",
            false
        );

        this.outx(
            '"<i>Thanks for that...</i>" Izma whispers, stumbling onto her feet and retrieving her clothing.  "<i>Feel free to come back for some more... or maybe we could do something a little more intense, if you want.</i>" A bashful smile spreads across her face.  It\'s a little hard to tell with her skin color, but you can almost see a blush.  You smile at Izma and nod, before gathering your own gear and setting off for camp, your tongue constantly darting around your mouth in search of any remainders of Izma\'s seed.\n\n',
            false
        );
        // (lust -100, gain 1 t-shark toof, Izmacounter+1)
        this.player.slimeFeed();
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230]++;
        this.player.orgasm();
        this.inventory.takeItem(this.consumables.TSTOOTH, this.camp.returnToCampUseOneHour);
    }

    // [no-fight sex: get your ass in the car]
    private nonFightIzmaSmexASS(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            'Once you strip down and reveal your nude form to Izma, she purses her lips in thought.  "<i>Well, this is a problem....</i>"  You raise an eyebrow as she stalks around you.  "<i>How, uh... how are we gonna do this?  I mean... I\'m NOT putting my mouth there, you can get those thoughts out of your head!</i>" she says indignantly; you frown slightly, feeling dejected because of your odd condition.\n\n',
            false
        );

        this.outx(
            "Izma sighs and places a hand on your shoulder.  \"<i>I'm sorry... I came off as harsh there.  Look, it's... this isn't gonna work out unless one of us is on top.  Just... I dunno... go gulp some incubus drafts or succubi milk and come back.  Or challenge me.</i>\"  You nod and redress, deciding to take your leave.\n\n",
            false
        );

        // (If Int is 50+)
        if (this.player.inte >= 50) {
            this.outx(
                'You stop a moment as a realization occurs to you.  "<i>Wouldn\'t you be getting just as much pleasure if I was on top?</i>" you ask.\n\n',
                false
            );

            this.outx(
                "Izma rolls her eyes.  \"<i>I've dominated with my holes before.  You ride 'em hard enough, they don't feel as much pleasure.  Now, fuck off.</i>\"\n\n",
                false
            );
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [no-fight sex: use vagino]
    private nonFightIzmaSmexCUNTPUSSYSNATCHQUIM(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "Izma grins in response, and her hands move behind her back, undoing the strings on her black bikini top.  She flings the garment to the rocks, exposing her large, juicy breasts.  As if deciding to tease you, she turns around and grabs the hem of her skirt, pulling it down slowly and letting you get a good view of her firm ass.  She slowly faces you again, her massive 15-inch cock and balls swinging around with her.  You don't even realize that you've been unconsciously touching yourself throughout the whole thing, earning an uncharacteristic giggle from Izma.\n\n",
            false
        );

        this.outx(
            '"<i>Your turn now.  Fair\'s fair,</i>" she says, watching you with seductively-lidded eyes.\n\n',
            false
        );

        this.outx(
            `You nod and remove your ${
                this.player.armorName
            }, not doing it with quite as much showmanship as Izma herself.  You expose your ${this.allBreastsDescript()} to the air; your ${this.nippleDescript(
                0
            )}s grow stiff from the breeze.  The bottom half of your clothing comes off, exposing your ${this.vaginaDescript(
                0
            )}`
        );
        if (this.player.hasCock()) this.outx(` and ${this.multiCockDescriptLight()}`);
        this.outx(
            ' to the happy tigershark.  "<i>Not bad, if you don\'t mind me saying so,</i>" Izma remarks, moving toward you and placing a hand on your shoulder.  "<i>Okay, so here\'s how we\'re gonna do this...</i>" she begins, her hot erection poking you eagerly in the crotch.  "<i>We won\'t be mating in the conventional sense, just working to get each other off, with our mouths,</i>" she explains, showing you that her fangs are retracted just to reassure you.\n\n',
            false
        );

        this.outx(
            "You nod in agreement and watch Izma move onto the sands, before positioning your crotch over her face and putting your mouth just over her stiff cock.  Izma wastes no time, moving her face up and burying it into your cunt, her tongue probing your depths.  The sudden intrusion makes you gasp loudly, but 'fair's fair' as Izma says, and you respond by taking the head of her cock into your mouth.\n\n",
            false
        );

        this.outx(
            `You get to work licking and sucking the tip, strands of saliva linking your mouth to the hot organ every time you come up for air.  Izma doubles her licking speed and clamps her hands on your ${this.buttDescript()}, earning a gasp from you.  It seems Izma wants to up the ante a little.\n\n`,
            false
        );

        this.outx(
            "You decide to oblige her and start deepthroating her cock, all 15 inches sliding down your throat and stretching it out, earning some muffled moans from Izma.  You also start to rub and massage her meaty quad of balls, almost begging for her cum.  If the flavor of her salty pre from earlier was any indication, you're in for quite a taste when Izma finally blows her load.  Izma decides to match your efforts, rubbing and pinching at your clit with skilled hands.  Izma's no stranger to female lovers it would seem, but that's not surprising given what the normal shark girls are like.\n\n",
            false
        );

        this.outx(
            "Izma gives a muffled groan of pleasure, her cum blasting down your throat and filling your cheeks as you pull your mouth up.  It's not too long after that when you cry out in orgasm, your girlcum spattering onto the tigershark's face",
            false
        );
        if (this.player.hasCock())
            this.outx(` and ${this.sMultiCockDesc()} shooting a weak load across her chest`);
        this.outx(
            ".  You roll off her and try to catch your breath, swallowing residual cum.  The taste is incredible, you have to admit... it's hard to define just what it is that makes it so good.  Something in the water Izma swims in?\n\n",
            false
        );
        this.player.slimeFeed();
        this.outx(
            "You don't get long to contemplate it, sitting up alongside Izma.  \"<i>Phew... now, you are something else.  We're going to do this again some time,</i>\" Izma says, licking her lips and handing you the promised payment.  You smile, more than excited to take her up on the offer.  You stand up then and get dressed, departing for camp feeling very satisfied.\n\n",
            false
        );
        // (lust minus 100, gain 1 t-shark tooth, Izmacounter +1)
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230]++;
        this.player.orgasm();
        this.inventory.takeItem(this.consumables.TSTOOTH, this.camp.returnToCampUseOneHour);
    }

    // Decline Izma moving in
    private IzmaStayAtTheLakeBitch(): void {
        this.spriteSelect(32);
        // [Izma stays at the lake]
        this.outx("", true);
        this.outx(
            "You smile warmly and tightly grip both her hands.  You tell her that she's certainly a worthy opponent and mate, but right now just isn't the right time for her to move in with you.  She frowns and looks disappointed, but she seems to be holding back a lot of her emotions.  \"<i>Okay, I'll stay here for now then... but I'll always be willing to join you.  Whenever you need me,</i>\" she replies.\n\n",
            false
        );

        this.outx("You give her a small kiss on the lips and then leave for camp.");
        // Set 'NO CAMP Izma' flag
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Accept
    private acceptIzmaAsYourBitch(): void {
        this.spriteSelect(32);
        this.outx("", true);
        // [If Pure Amily is in the camp first]
        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00236] == 0 &&
            this.flags[kFLAGS.AMILY_FOLLOWER] == 1
        ) {
            this.outx(
                "You smile warmly and place your hands on her shoulders, before pulling her in and kissing her deeply.  Practically melting at your touch and moaning into your mouth, she wraps her arms and tail around your waist.\n\n",
                false
            );

            this.outx(
                "By the time you pull away from the kiss, both of you are gasping for breath.  Strands of saliva still link the two of you.  You brush her silver hair behind her ears and tell her you'd be more than happy to have her in your camp.  She makes a gleeful noise and hugs you tight, before rushing for her meager supplies and packing them up.\n\n",
                false
            );

            this.outx(
                "You can't help but laugh at how eager she is to live with you as you guide her to your camp, and she never seems to shut up talking about how fun it'll be and how much the two of you will be able to fuck.  However, she stops talking entirely and tilts her head to the side as she spots Amily scurrying around your camp.\n\n",
                false
            );

            this.outx(
                `The mouse-morph is currently eating something from your supplies when you arrive, and guiltily spins around and hides it behind her back when she realizes you've returned.  "<i>Ah, ${this.player.short}, I'm glad to see you back!</i>" she squeaks hurriedly; she's sincere, but obviously also a little embarrassed. Then she realizes you're not alone.  "<i>Ah... you do know you have a shark-girl of some sort following you, don't you?</i>"  She looks wary; ready to fight or flee if the situation warrants.\n\n`,
                false
            );

            this.outx(
                `Izma tilts her head to the side and adjusts her spectacles to get a better look at Amily.  "<i>Well, I'm a tigershark actually,</i>" she says flatly.  "<i>I'm also ${this.player.short}'s beta.  Who're you?  Oh!  You're one of those mouse people, right?</i>"\n\n`,
                false
            );

            this.outx(
                `Amily just looks at her quizzically.  "<i>Yes, I am a mouse.</i>"  Her voice is ringing with a tone that just screams 'isn't it obvious?'.  "<i>I'm sorry, I've seen some striped shark-girls before, but I didn't know your kind had a specific term... wait, what was that about being ${this.player.short}'s beta?  What's a beta?</i>"\n\n`,
                false
            );

            this.outx(
                "Izma gives a frown and scuffs the ground with her bare feet.  You give a nervous chuckle and try your best to explain the events of how you met Izma, your various sparring matches and how she eventually submitted fully to you after several victories, declaring you as her alpha.\n\n",
                false
            );

            this.outx(
                'After that you turn to Izma and explain your past with Amily, the tales of her ruined village, how you grew to love her, and how you fathered many children with her to kickstart the population of untainted mouse-morphs.  Izma takes a breath and looks enthralled by your story.  "<i>That\'s incredible; amazingly noble, both of you.</i>"\n\n',
                false
            );

            this.outx(
                '"<i>I - you really think so?</i>" Amily asks, looking stunned and pleased all at once, blushing with embarrassment at the compliment.  Then she shakes her head.  "<i>Ah, well... I suppose this isn\'t unexpected. At least she seems to actually have a brain in her head, not like some goblin or cum-drinking fairy... still, you could have at least asked me before you went fooling around with another woman, you know?</i>" she complains.\n\n',
                false
            );

            this.outx(
                "Then she looks thoughtful.  \"<i>Hey, come to think of it, if you're a shark-girl - sorry, tigershark, then how are you going to survive out here?  Don't you need to spend about two-thirds of the day underwater to live?</i>\" Amily asks, puzzled.\n\n",
                false
            );

            this.outx(
                '"<i>Ah, well... the lake isn\'t too far from here. And I think I saw a stream as we trekked over,</i>" she explains.  "<i>So long as I get some water on my body routinely, I\'ll be golden.  Plus it\'ll be nice to get access to some cleaner water.</i>"  She grumbles and adjusts the chest in her arms again.  "<i>Sorry, this thing is getting on my nerves, I gotta put it down.</i>"  She walks past to place her trunk down, but flashes a sincere grin as she does. "<i>It\'s been a pleasure to meet you, Amily; I do hope we get to know each other better,</i>" she says.\n\n',
                false
            );

            this.outx(
                "Amily watches as the tigershark goes to explore the camp, then, quick as lightning, zips over to you and hisses into your ear.  \"<i>Don't think I'm not pissed that you didn't talk about this with me beforehand!  I'm just not stupid enough to challenge something that dangerous - I've seen shark-girls take down and EAT minotaurs coming to the lake for a drink!</i>\"  She pinches you sharply, to express her displeasure.\n\n",
                false
            );

            this.outx(
                "You apologize, but tell her that you won't just throw Izma out now.  She's here to stay, and the mouse-morph had better make her peace with that - fighting wouldn't work out well for anyone.\n\n",
                false
            );

            this.outx(
                "\"<i>I'll be polite to her, don't worry about that...  but are you absolutely sure we can trust her?  I'd be very hesitant to accept anything or anyone coming out of that lake,</i>\" Amily asks you, watching Izma as she curiously starts poking around at your mutual belongings.\n\n",
                false
            );

            this.outx(
                "You quietly point out that you met Amily in a ruined village by the lake, and ask her what she used to bathe in.  She glares at you, but you stand your ground and say that you trust Izma, pointing out that she's different from most of the creatures that have been tainted by the demons.  She could have attacked you and tried to rape you on sight - instead, she's been nothing but polite, conversational and self-controlled.  Even when the matter of sex came up, she talked with you about it first and made it clear that it was your choice and there would be no repercussions to refusing.  How many other beings in this world wouldn't have just raped first and asked questions never?\n\n",
                false
            );

            this.outx(
                '"<i>You have a point there...</i>" Amily mumbles, staring at Izma with obvious curiosity.  "<i>Hmm... well, I should keep an eye on her, but I guess she\'s earned the right to the benefit of the doubt.  It might be nice to have somebody else to talk to here in the camp...</i>"  She trails off, mumbling, as Izma finally finishes setting up her spot and comes back to you.\n\n',
                false
            );

            this.outx(
                'What makes you curious is how she decided to keep her bed at a distance from your own.  You give her a wave and tell her it\'s okay to sleep near you.  She looks at you quizzically in response.  "<i>Well...</i>" she stammers, "<i>I thought my Alpha would want me to sleep some distance away,</i>" she says.  With a hasty reassurance, you insist that she place her bed closer. Eager to serve, she drags the bedroll adjacent to your own and smiles at you bashfully.',
                false
            );
            // Flag that amily bitchfit has happened.
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00236] = -1;
        } else if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00237] == 0 &&
            this.player.findStatusAffect(StatusAffects.CampMarble) >= 0
        ) {
            // [Marble is at camp when Izma arrives]
            this.outx(
                "You smile warmly and place your hands on her shoulders, before pulling her in and kissing her deeply.  Practically melting at your touch and moaning into your mouth, she wraps her arms and tail around your waist.\n\n",
                false
            );

            this.outx(
                "By the time you pull away from the kiss, both of you are gasping for breath.  Strands of saliva still link the two of you.  You brush her silver hair behind her ears and tell her you'd be more than happy to have her in your camp.  She makes a gleeful noise and hugs you tight, before rushing for her meager supplies and packing them up.\n\n",
                false
            );

            this.outx(
                "You can't help but chuckle at how eager she is to live with you as you guide her to your camp, and she never seems to shut up talking about how fun it'll be and how much the two of you will be able to fuck.  However she stops talking entirely and tilts her head to the side once she sees Marble patrolling around your camp.\n\n",
                false
            );

            this.outx(
                `She beams as she sees you and trots over.  "<i>Sweetie, so glad that you're...</i>" The cow-girl trails off as she notices Izma behind you, and her expression seems to darken.  "<i>Who's this, sweetie?</i>" she asks.  Izma smiles warmly and extends her hand.  "<i>I'm Izma, ${this.player.short}'s beta,</i>" she says happily.  Seems she has no problems with you having another lover, though you're not sure Marble will share those feelings.  "<i>Beta?</i>" the cow-girl asks, evidently curious, a look of disdain still on her face.\n\n`,
                false
            );

            this.outx(
                "You give a sigh and explain how you met Izma, what she is, your previous conversations, and your eventual sparring matches.  After several defeats at your hands, Izma declared you as her alpha, stating that she'd do anything for you.  Figuring that it would be good to have another skilled fighter and a scholar at the camp, you allowed her to move in.\n\n",
                false
            );

            this.outx(
                'Marble nods and seems to force a smile.  "<i>Just give us a moment,</i>" she tells Izma, before taking you by the hand and pulling you to another part of camp rather forcefully. Oh great, it\'s going to be one of those talks.\n\n',
                false
            );

            this.outx(
                "\"<i>Sweetie, what the hell?!</i>\" she hisses once the two of you are out of earshot from Izma. \"<i>You could have at the very least consulted me on all this, instead of bringing some stranger into the camp! And she's one of those... corrupt monsters from the lake to boot!</i>\" she says.  She looks far angrier than you've seen her in the past, that's for sure.  You give a sigh and try to explain yourself, telling her that despite her appearance Izma is far nicer than any other creature that's come from that lake. She's been kind, considerate, and most importantly she always gave you a choice when it came to sex. That's far more than you could expect from some 'corrupt monster.'\n\n",
                false
            );

            this.outx(
                "Marble grits her teeth and shake her head. \"<i>I don't like it, sweetie.  I don't like it and I certainly don't support it.  Just keep her under control and away from me, and then we'll see,</i>\" the cow-girl says, before clopping off in a huff.\n\n",
                false
            );

            this.outx(
                "Izma looks to you curiously once you return to her.  \"<i>So what's your story with her?</i>\" she asks.  You give a sigh and tell Izma how you met Marble at Whitney's farm and how a relationship formed between you over time.  Then you go on about how, sadly, you became addicted to her milk without even realizing its corrupt nature.  ",
                false
            );
            // (If the player is fatally addicted)
            if (this.player.findPerk(PerkLib.MarblesMilk) >= 0)
                this.outx(
                    "You couldn't break your addiction, and now you'll die without a steady supply of her milk.",
                    false
                );
            // (If the player broke their addiction)
            else
                this.outx(
                    "Thankfully, though you were able to break her milk's hold, and you realized you love Marble despite all that transpired between you, letting her move in with you.",
                    false
                );
            this.outx("\n\n", false);

            this.outx(
                'Izma grits her teeth and sucks air through them as you finish your story.  "<i>That... damn cow...</i>" she growls, making you gulp at her barely contained rage.  "<i>She took you, my perfect alpha, and ',
                false
            );
            // (Fatally addicted)
            if (this.player.findPerk(PerkLib.MarblesMilk) >= 0)
                this.outx("turned you into some weak drug-addict");
            // (Broke addiction)
            else this.outx("drugged you into some twisted relationship");
            this.outx(
                ".</i>\"  You give her a nervous chuckle and assure her that this isn't the case, but Izma doesn't want to listen.  \"<i>I'll keep quiet for now, but if that bovine steps out of line...</i>\" she trails off and her fangs pop free, before she goes to set up her bedroll and trunk near your own bed.  Seems she wants to keep close to your bed to protect you.  Or at least, that's your interpretation.  You give a sigh and shake your head. It's doubtful these two will ever warm up to each other.",
                false
            );
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00237] = -1;
        }
        // [Accept Izma, no other wimmenz at camp]
        else {
            this.outx(
                "You smile warmly and place your hands on her shoulders, before pulling her in and kissing her deeply.  Practically melting at your touch and moaning into your mouth, she wraps her arms and tail around your waist.\n\n",
                false
            );

            this.outx(
                "By the time you pull away from the kiss, both of you are gasping for breath.  Strands of saliva still link the two of you.  You brush her silver hair behind her ears and tell her you'd be more than happy to have her in your camp.  She makes a gleeful noise and hugs you tight, before rushing for her meager supplies and packing them up.\n\n",
                false
            );

            this.outx(
                "You can't help but chuckle at how eager she is to live with you as you guide her to your camp, and she never seems to shut up talking about how fun it'll be and how much the two of you will be able to fuck.  The tigershark wastes no time setting up her trunk at the farthest edge of the camp from you and then sets her bedroll up.\n\n",
                false
            );

            this.outx(
                'What makes you curious is how she decides to keep her bed at a distance from your own.  You give her a wave and tell her it\'s okay to sleep near you.  She looks at you quizzically in response.  "<i>Well...</i>" she stammers, "<i>I thought my Alpha would want me to sleep some distance away,</i>" she says.  With a hasty reassurance, you insist that she place her bed closer. Eager to serve, she drags the bedroll adjacent to your own and smiles at you bashfully.\n\n',
                false
            );
        }
        // Set 'camp Izma' flag
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] = 1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Amily arrives: Izma is at camp first]
    public newAmilyMeetsIzma(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            `You and Amily seem to talk non-stop on the way back, both excited at the prospect of living together.  Then she realizes you're not alone, once she sees Izma seated on her trunk, and looks puzzled. "<i>${this.player.short}... there's a shark-girl in your camp!</i>" she hisses, looking ready to fight or flee if the situation warrants.\n\n`,
            false
        );

        this.outx(
            `Upon seeing you, Izma gives a toothy grin and approaches, not remotely bothered by Amily's presence.  Though she does tilt her head to the side and adjusts her spectacles to get a better look at Amily.  "<i>Welcome home, dear,</i>" she greets. Turning to Amily, she introduces herself.  "<i>I'm Izma, ${this.player.short}'s beta.  Who're you?  Oh!  You're one of those mouse people, right?</i>" she asks.\n\n`,
            false
        );

        this.outx(
            `Amily just looks at her quizzically.  "<i>Yes, I am a mouse.</i>"  Her voice is ringing with a tone that just screams 'isn't it obvious?'.  "<i>What was that about being ${this.player.short}'s beta?  What's a beta?</i>"  You give a nervous chuckle and try your best to explain the past between you and Izma; what she is, your various sparring matches, and how she eventually submitted fully to you after several victories, declaring you as her alpha.\n\n`,
            false
        );

        this.outx(
            'After that you turn to Izma and explain your past with Amily, the tales of her ruined village, how you grew to love her, and how you fathered many children with her to kickstart the population of untainted mouse-morphs.  Izma takes a breath and looks enthralled by your story.  "<i>That\'s incredible; amazingly noble, both of you.</i>"\n\n',
            false
        );

        this.outx(
            '"<i>I - you really think so?</i>" Amily asks, looking stunned and pleased all at once, blushing with embarrassment at the compliment.  Then she shakes her head.  "<i>Ah, well... I suppose this isn\'t unexpected. At least she seems to actually have a brain in her head, not like some goblin or cum-drinking fairy... still, you could have at least told me you already had another woman, you know?</i>" she complains.  Then she looks thoughtful.  "<i>Hey, come to think of it, if you\'re a shark-girl - sorry, tigershark - then how are you going to survive out here?  Don\'t you need to spend about two-thirds of the day underwater to live?</i>"\n\n',
            false
        );

        this.outx(
            "\"<i>Ah, well, the lake isn't too far from here,</i>\" Izma counters.  \"<i>And there is a stream up here.  So long as I get some water on my body routinely, I'm golden.  Plus it's nice to get access to some cleaner water!  Well, I've got some reading to catch up on, so I'll leave you be,</i>\" the pretty tigershark says.\n\n",
            false
        );

        this.outx(
            "Amily watches as the tigershark returns to her bedroll, then, quick as lightning, zips over to you and hisses into your ear. \"<i>Don't think I'm not pissed that you didn't think to talk about this with me beforehand! I'm just not stupid enough to challenge off something that dangerous - I've seen shark-girls take down and EAT minotaurs coming to the lake for a drink!</i>\"  She pinches you sharply, to express her displeasure.\n\n",
            false
        );

        this.outx(
            "You apologize, but tell her that you won't just throw Izma out now.  She's here to stay, and the mouse-morph had better make her peace with that - fighting wouldn't work out well for anyone.\n\n",
            false
        );

        this.outx(
            "\"<i>I'll be polite to her, don't worry about that... but are you absolutely sure we can trust her?  I'd be very hesitant to accept anything or anyone coming out of that lake,</i>\" Amily asks you, watching Izma as she curiously starts poking around at your mutual belongings.\n\n",
            false
        );

        this.outx(
            "You quietly point out that you met Amily in a ruined village by the lake, and ask her what she used to bathe in.  She glares at you, but you stand your ground and say that you trust Izma, pointing out that she's different from most of the creatures that have been tainted by the demons.  She could have attacked you and tried to rape you on sight - instead, she's been nothing but polite, conversational and self-controlled.  Even when the matter of sex came up, she talked with you about it first and made it clear that it was your choice and there would be no repercussions to refusing.  How many other beings in this world wouldn't have just raped first and asked questions never?\n\n",
            false
        );

        this.outx(
            '"<i>You have a point there...</i>" Amily mumbles, staring at Izma with obvious curiosity.  "<i>Hmm... well, I should keep an eye on her, but I guess she\'s earned the right to the benefit of the doubt.  It might be nice to have somebody else to talk to here in the camp...</i>"  She trails off, mumbling, as she goes off to unpack.\n\n',
            false
        );
        // wrap up all conditionals
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00236] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Marble: Izma is at camp first]
    public newMarbleMeetsIzma(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            'You and Marble are deep in conversation all the way to your camp, mainly inconsequential things to pass the time.  Marble enjoys the talk all the same, but she comes to a halt once she sees Izma sitting around your camp.  "<i>Ah... who\'s that, sweetie?</i>" she asks.\n\n',
            false
        );

        this.outx(
            `Izma smiles warmly and extends her hand out.  "<i>Hey dear, hello stranger.  I'm Izma, ${this.player.short}'s beta.  Pleased to meet you,</i>" she says happily.  Seems she has no problems with you having another lover, though you're not sure Marble will share those feelings.  "<i>Beta?</i>" the cow-girl asks, curious despite the look of disdain still on her face.\n\n`,
            false
        );

        this.outx(
            "You give a sigh and explain how you met Izma, your previous conversations and your eventual sparring matches.  After several defeats at your hands, Izma declared you as her alpha, stating that she'd do anything for you.  Figuring that it would be good to have another skilled fighter and a scholar at the camp, you allowed her to move in.\n\n",
            false
        );

        this.outx(
            'Marble nods and seems to force a smile.  "<i>Just give us a moment,</i>" she tells Izma, before taking you by the hand and pulling you to another part of camp rather forcefully.\n\n',
            false
        );

        this.outx(
            "\"<i>Sweetie, what the hell?!</i>\" she hisses once the two of you are out of earshot from Izma.  \"<i>You could have at the very least warned me about all this, instead of bringing me home to some stranger into the camp! And she's one of those... corrupt monsters from the lake to boot!</i>\" she says.  She looks far angrier than you've seen her in the past, that's for sure.  You give a sigh and try to explain yourself, telling her that despite her appearance Izma is far nicer than any other creature that's come from that lake.  She's been kind, considerate, and most importantly she always gave you a choice when it came to sex.  That's far more than you could expect from some 'corrupt monster.'\n\n",
            false
        );

        this.outx(
            "Marble grits her teeth and shakes her head.  \"<i>I don't like it, sweetie.  I don't like it and I certainly don't support it.  Just keep her under control and away from me, and then we'll see,</i>\" the cow-girl says, before clopping off in a huff.\n\n",
            false
        );

        this.outx(
            "Izma looks to you curiously once you return to her.  \"<i>So what's your story with her?</i>\" she asks.  You give a sigh and tell Izma how you met Marble at Whitney's farm and how a relationship formed between you over time.  Then you go on about how, sadly, you became addicted to her milk without even realizing its corrupt nature.  ",
            false
        );
        // (If the player is fatally addicted)
        if (this.player.findPerk(PerkLib.MarblesMilk) >= 0)
            this.outx(
                "You couldn't break your addiction, and now you'll die without a steady supply of her milk.",
                false
            );
        // If the player broke their addiction)
        else
            this.outx(
                "Thankfully though you were able to break her milk's hold, and you realized you love Marble despite all that transpired between you, letting her move in with you.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            'Izma grits her teeth and sucks air through them as you finish your story.  "<i>That... damn cow...</i>" she growls, making you gulp at her barely contained rage.  "<i>She took you, my perfect alpha, and ',
            false
        );
        // (Fatally addicted)
        if (this.player.findPerk(PerkLib.MarblesMilk) >= 0)
            this.outx("turned you into some weak drug-addict");
        // (Broke addiction)
        else this.outx("drugged you into some twisted relationship");
        this.outx(
            ".</i>\"  You give her a nervous chuckle and assure her that this isn't the case, but Izma doesn't want to listen.  \"<i>I'll keep quiet for now, but if that bovine steps out of line...</i>\" she trails off and her fangs pop free, before she goes to set up her bedroll and trunk near your own bed.  Seems she wants to keep close to your bed to protect you.  Or at least, that's your interpretation.  You give a sigh and shake your head.  It's doubtful these two will ever warm up to each other.",
            false
        );
        // wrap up all conditionals
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00237] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    /* [Izma's Reward Items]

    Hooked Gauntlets: These tatty metal gloves are fitted with bone spikes and hooks shaped like shark teeth. They can tear flesh and deliver concussive force with equal ease.
    Pawn Value: 50
    Attack Value: 8
    Stun as per Spiked Gauntlets
    Bleed effect; target has a 50% chance to be bleeding, causing them to lose 2-7% of their health each round for the next 3 turns. Landing another Bleed strike on an already bleeding target increases the bleeding duration by 1 turn.
    */

    // [=Sex=]
    private izmaLakeTurnedDownCampSex(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "You give Izma a smirk and tell her that, if she's in the mood, you could use a little 'relief'.\n\n",
            false
        );

        this.outx(
            'The tigershark grins right back at you, carefully undoing her skirt and letting her impressive, rapidly-growing erection free.  "<i>Sounds great to me, lover.  So, what are you in the mood for?  A little equal time?  Exerting your place as alpha?</i>"  She gives you a very wicked grin.  "<i>Or... do you want to let your beta have her wicked way with you, hmm?</i>"  She growls lustfully at the thought.',
            false
        );
        // [Equals] [Dominate] [Submit]
        this.simpleChoices(
            "Equals",
            this.izmaLakeSexAsEquals,
            "Dominate",
            this.izmaLakeDominate,
            "Submit",
            this.submitToLakeIzma,
            "",
            undefined,
            "Back",
            this.meetIzmaAtLake
        );
    }

    // [Equals]
    private izmaLakeSexAsEquals(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "You tell Izma that you would like to have sex as equals; you and she.  She smiles and asks you what part you'd like to use.\n\n",
            false
        );
        // ((If player is Genderless)
        if (this.player.gender == 0) {
            this.outx(
                `Izma looks you over, and then shakes her head sadly. "<i>I'm sorry, ${this.player.short}, but... you still don't really have anything for me to play with.  If you want us to do it as equals, you'll need to grow a cock or a pussy.  How about you have one of us take charge, instead?</i>"\n\n`,
                false
            );
            // [dom/sub])
            this.doNext(this.meetIzmaAtLake);
        }
        // otherwise route to current no-fight sex choices
        else this.chooseYourIzmaWeapon();
    }
    // [=Dominate=]
    private izmaLakeDominate(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            'Izma blushes fiercely and a lewd smile comes over her face at the suggestion.  "<i>O-okay,</i>" she says, stripping off her bikini top and gently removing her grass skirt, allowing her breasts and monster cock to pop free.  She sits down and smiles at you.  "<i>After you...</i>"\n\n',
            false
        );
        let x: number = this.player.cockThatFits(65);
        if (x < 0) x = 0;
        // [Male/Herm]
        if (this.player.hasCock() && (this.player.gender == 1 || IzmaScene.rand(2) == 0)) {
            this.outx(
                `You remove your ${
                    this.player.armorName
                } and spread Izma's legs wide, ${this.sMultiCockDesc()} almost painfully erect as you lift her quartet of balls up to look at her glistening womanhood.\n\n`,
                false
            );

            this.outx(
                `Not wanting to waste any time on foreplay, you push your ${this.cockDescript(
                    x
                )} into Izma's slit as far as you can manage, making Izma gasp sharply and writhe against you.  You snicker and start thrusting into her, the odd little tendrils inside her cunt teasing and massaging your cock.  The walls themselves are so tight and smooth that her pussy conforms to you like a glove.  It almost feels like Izma's snatch was made just for you.\n\n`,
                false
            );

            this.outx(
                "You start to pick up speed as you mash your hips against Izma's own, earning moans from the pretty tigershark which only seem to get louder with every subsequent thrust.  Izma quickly starts to return the gesture, moving her hips up to meet your own thrusts every time.  It's while she's doing this that you notice her throbbingly erect cock wobbling around.\n\n",
                false
            );
            // NEW RADAR STUFF, GAO
            this.outx("Do you tend to her prick?");
            this.doYesNo(this.izmaLakeDominateContinueVanilla, this.noWankingForIzmaRadarSaysSo);
            return;
        }
        // [Female]
        else if (this.player.hasVagina()) {
            this.outx(
                `You strip off your ${this.player.armorName} and spread Izma's legs wide, licking your lips at the sight of her throbbing erection and meaty quads.  You give Izma's massive cock a few test strokes, earning some pleasured groans from the tiger shark.\n\n`,
                false
            );

            this.outx(
                "Deciding you've had enough foreplay, you mount her and slide down her cock.",
                false
            );
            this.player.cuntChange(30, true, true, false);
            this.outx("  You start grinding and gyrating atop her, ");
            // [(taur)
            if (this.player.isTaur())
                this.outx(
                    "your weight pinning her to the sand and preventing her from taking control.",
                    false
                );
            /// (non-taur and height > 4')
            else if (this.player.tallness > 48)
                this.outx(
                    `and pin her hands above her head to stop her from trying to change the position. Her heaving breasts rub against your ${this.chestDesc()} as you ride her in this posture.  She needs to know who's in charge here, after all.`
                );
            // (non-taur and height <= 4')
            else
                this.outx(
                    `but small as you are, you can't stop her as she reaches up and grabs onto your ${this.buttDescript()}, then begins bouncing you like a goblin cocksleeve.`
                );
            this.outx("\n\n", false);

            this.outx(
                "Izma seems to do her best, moving and jerking her cock up as much as she can, earning gasps of pleasure from you.",
                false
            );
            // [(no-taur)
            if (!this.player.isTaur())
                this.outx(
                    "  To reward your eager partner for her efforts you reach back with one free hand to massage and grope at her testes.  Izma bites her lip and starts growling loudly, pushing her hips up as far as possible, eager to cum for you.  You decide to return the favor, mashing your pussy down with increasing speed.",
                    false
                );
            this.outx("\n\n", false);

            this.outx(
                'After a few more minutes of vigorous fucking, Izma grunts and roars in an animalistic fashion as she orgasms, jets of hot musky spunk pumping into your depths.  You cry out in pleasure, your inner walls clamping down on her cock and milking every available drop of jizz she has.  After a while you manage to recover and stumble onto your feet.  "<i>Hey, wait a sec,</i>" Izma says weakly as you start to leave. When you look back at her, she\'s standing near her chest.\n\n',
                false
            );

            this.outx(
                '"<i>What about a goodbye kiss?</i>" she asks, trying to sound plaintive, but really sounding eager.  Happily, you allow her to embrace you, but in the midst of your passionate kiss, she suddenly pokes something from her mouth into yours, using her tongue to shove it down your throat and make you swallow.  You break away from her, coughing, and ask what that was.\n\n',
                false
            );

            this.outx(
                '"<i>Birth control,</i>" she explains. You give her a half-hearted slap across the face and tell her not to be so audacious, but you can see by her smiling expression that she\'s pleased to have stolen a march on you.',
                false
            );
            this.player.slimeFeed();
        }
        // [Genderless]
        else {
            this.outx(
                "You push her onto her back and see her inhuman dong flop free from her skirt.  Seems the idea of domination turned the little shark on.  Well, 'little' is hardly the right word to describe any aspect of her, especially when she has a 15-inch rock-hard erection waving over her.  It actually brings a dopey grin to your face.  Well, you earned a reward, so you might as well take it.\n\n",
                false
            );

            this.outx(
                "You lean down and start licking and suckling the tip of her monster dick, slurping up her hot pre and lubricating the tip of her raging boner.  She moans and jerks at your touch, writhing around and loving the sensation of submissiveness.  The feeling of having her under your power manages to bring a smile to your own face.\n\n",
                false
            );

            this.outx(
                `Gradually you start to suck more and more of her cock, inch after inch moving down your throat.  You gag lightly as you finally reach the base of her cock, before pulling it out.  She whines weakly and looks at you pitifully, wondering why you're teasing her.  You remove your ${
                    this.player.armorName
                } before turning to show her your ${this.buttDescript()}, and a small smile spreads over her angular face as she realizes what you have planned.  You plant your hands on your backside and pull your cheeks wide, before starting to slide onto her well-lubed pecker.\n\n`,
                false
            );

            this.outx(
                "She grunts and huffs as you slide down, and you too feel a strain from her iron-hard dick despite the various fluids lubricating it.  But gradually pain turns to pleasure and you're both moaning loudly and calling each others' names as you ride her.",
                false
            );
            this.player.buttChange(30, true, true, false);
            this.outx("\n\n", false);

            this.outx(
                `The shark grits her teeth and gives a roar as she cums, blowing a massive, hot load straight up your ${this.assholeDescript()}, bloating you slightly as she empties her quads inside you.  Your muscles twitch and contract, and you can swear you see stars as she ejaculates.  It takes you a while to catch your breath as you slide off her slowly softening meat pole and crawl onto the sand.`
            );

            this.outx(
                "The two of you get dress after awhile, have some small talk, and then you make your way back to camp.",
                false
            );
            this.player.slimeFeed();
        }
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private izmaLakeDominateContinueVanilla(vanilla = true): void {
        this.spriteSelect(32);
        let cockIndex: number = this.player.cockThatFits(65);
        if (cockIndex < 0) cockIndex = 0;

        if (vanilla) {
            this.outx("", true);
            this.outx(
                `Deciding that it'd be rude not to, and because you want to see just how loud you can make Izma moan, you grab hold of her raging erection and start jerking her off while you pound into her.  The move seems to surprise Izma, and she starts moaning and screaming in pleasure.  The double stimulation you're pulling off pushes Izma past her limit very quickly, and she starts shooting thick jets of spunk into the air, which begin to rain down on her face and breasts.  Her vaginal walls clamp down on your ${Appearance.cockNoun(
                    this.player.cocks[cockIndex].cockType
                )} almost painfully as the orgasm wracks her female genitalia too.\n\n`,
                false
            );
        }

        this.outx(
            "Izma starts panting and gasping for breath after the intense release, but immediately starts groaning when she realizes you are not done.  You giggle and release her softening erection, placing both hands on her thighs as you start to redouble your efforts at fucking her.  You push Izma deeper and deeper into the sands with each thrust, and despite her exhaustion Izma gives a few soft pleasured moans.\n\n",
            false
        );

        // [(Male)
        if (this.player.gender == 1) {
            this.outx(
                `After a lengthy fuck, you grunt loudly as your ${this.cockDescript(
                    cockIndex
                )} swells, blasting streamers of jizz into Izma's womb`
            );
            // [(multi)
            if (this.player.cockTotal() > 1) this.outx(" and onto her groin");
            this.outx(", causing Izma to cry out loudly.");
            // [(big skeet)
            if (this.player.cumQ() >= 500)
                this.outx("  Her belly swells as you empty your impressive load into her.");
            // [(mega),
            if (this.player.cumQ() >= 1500)
                this.outx(
                    "  Eventually it can swell no more and each new squirt forces cum out from her stuffed pussy, trickling past her asshole.",
                    false
                );
            this.outx(
                `  You sigh happily and push back from her, weakly getting to your ${this.player.feet()} and redressing. Izma scrambles to her chest and takes out some sort of leaf, then eats it.`
            );
        }
        // (Herm)
        else {
            this.outx(
                `After a lengthy fuck, you grunt loudly as your ${this.cockDescript(
                    cockIndex
                )} swells, blasting streamers of jizz into Izma's womb`
            );
            // [(multi)
            if (this.player.cockTotal() > 1) this.outx(" and onto her groin");
            this.outx(", causing Izma to cry out loudly.");
            // [(big skeet)
            if (this.player.cumQ() >= 500)
                this.outx("  Her belly swells as you empty your impressive load into her.");
            // [(mega),
            if (this.player.cumQ() >= 1500)
                this.outx(
                    "  Eventually it can swell no more and each new squirt forces cum out from her stuffed pussy, trickling past her asshole.",
                    false
                );
            this.outx(
                `  You sigh happily and push back from her, weakly getting to your ${this.player.feet()}.  You're not done yet though, not fully.\n\n`,
                false
            );

            this.outx(
                `Izma gasps again as you plant your ${this.vaginaDescript(
                    0
                )} onto her face, grinding against the angular features and moaning loudly as her obliging tongue darts past your lips.  You could really get used to this feeling.  You ride her face for another few minutes before an orgasm rocks your female parts, splattering girlcum onto Izma's face.  You sigh happily and weakly get to your feet, redressing.  You see Izma fishing something from her storage chest - a plant of some sort - and munching it down.`
            );
        }
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [No]
    private noWankingForIzmaRadarSaysSo(): void {
        this.clearOutput();
        this.spriteSelect(32);
        // var cockIndex: number = player.cockThatFits(65);
        // if(x < 0) cockIndex = 0;
        this.outx(
            'Opting not to jerk her member off, you continue your gyrations against the tigershark\'s twat, brutally slamming the head of your cock against the feelers in her pussy and battering them around like tree branches in a wind storm.  Izma, sensing that you will not be giving her member the attention it "deserves", reaches down with one hand and takes hold of her cock, jerking it impetuously as she struggles to pleasure herself in between thrusts of your cock.  Raising an eyebrow, you contemplate whether she should be allowed to just start masturbating without permission...'
        );
        // [Remove her hands]    [Let her masturbate]
        this.simpleChoices(
            "Stop Her",
            this.noWankingForIzma,
            "LetHerWank",
            this.letIzmaWankLikeABitch,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }
    // [Let her masturbate]
    private letIzmaWankLikeABitch(): void {
        this.clearOutput();
        this.spriteSelect(32);
        // var cockIndex: number = player.cockThatFits(65);
        // if(cockIndex < 0) cockIndex = 0;
        this.outx(
            "Grinning at her sudden need for penile release, you dart in for an intimate kiss and further inflame her passion, soliciting a series of sated moans as she reciprocates while increasing the speed of her stroking.\n\n"
        );
        // (leads to Izma cumming)
        this.izmaCumsAfterRadarStuffHere(false);
    }
    // [Remove her hands]
    private noWankingForIzma(): void {
        this.clearOutput();
        this.spriteSelect(32);
        // var cockIndex: number = player.cockThatFits(65);
        // if(cockIndex < 0) cockIndex = 0;
        this.outx(
            "Grunting in disapproval, you slap her hand away from her cock, drawing a surprised gasp in between moans of pleasure from your partner; she stares up at you pleadingly to let her finish herself off.  Calmly, you tell Izma that she didn't ask for permission and has lost that \"privilege\", as you take hold of her hands and grasp them firmly on the ground, trapping her in a lover's embrace.  Izma groans pathetically out of frustration and a need for forgiveness, but you know that she needs to be \"punished\" for masturbating without asking.  With renewed vigor as the feeling of utter dominance and control floods your body, you savagely fuck Izma's moist cunt, slapping against her so ferociously that you might as well be spanking her with your [if (balls > 0) [balls]|thighs]; the force of your efforts resonates in her moans as they rise and taper off in volume with every thrust against her.  Confidently, you whisper in Izma's ear that if she's lucky, she'll release her sticky load without even being touched, the thought of which causes her cock to bob like a raven hopping on the ground after prey.  \"<i>Good girl!  Do that for your Alpha</i>\".\n\n"
        );
        this.izmaCumsAfterRadarStuffHere(true);
    }
    private izmaCumsAfterRadarStuffHere(denied: boolean): void {
        let cockIndex: number = this.player.cockThatFits(65);
        if (cockIndex < 0) cockIndex = 0;
        if (!denied)
            this.outx(
                `The double stimulation pushes Izma past her limit very quickly, and she starts shooting thick jets of spunk into the air, which begin to rain down on her face and breasts.  Her vaginal walls clamp down on your ${Appearance.cockNoun(
                    this.player.cocks[cockIndex].cockType
                )} almost painfully as the orgasm wracks her female genitalia too.\n\n`,
                false
            );
        // [Remove her hands]
        else
            this.outx(
                "Without another word, or another moment of tormenting impediment, Izma howls with unbridled fury, releasing her hot, sticky load into the air and onto her forehead.  Convulsing with utter euphoria as she finally blows her wad, the walls of her vagina clamp down hard in concert with her feelers, trying ever so valiantly to push you over the edge.  Unfortunately, (for Izma anyway), the unconscious efforts of her body fail to bring you to release. Remarking to Izma that she came so soon, you coo down to her that you are pleased with her ability to speedily heed your commands.\n\n"
            );
        this.izmaLakeDominateContinueVanilla(false);
    }

    // [=Submit=] (more copypasta – bring the vino! -Z)
    private submitToLakeIzma(): void {
        this.spriteSelect(32);
        this.outx("", true);
        // (starter -all sexes)
        this.outx(
            `You give Izma a smile and begin to slowly, sensuously remove your ${this.player.armorName}, littering the sand around you.  As the tigershark watches, you strike a few poses, and then sink onto your hands and knees with your rear facing towards her.  You twist around to look at her over your shoulder, `
        );
        if (this.player.hasLongTail()) this.outx("your tail waving enticingly, ");
        this.outx(
            `before you give your ${this.assDescript()} a seductive wiggle.  You tell her that you think it's her turn to play.\n\n`,
            false
        );

        this.outx(
            `Izma's breath visibly catches in her throat, her cock painfully erect and pulsing with lust.  She doesn't even bother to remove her bikini, instead stalking towards you, her intention obvious with every movement.  Within seconds she is behind you, her hands firmly gripping your ${this.buttDescript()}.  You feel a sudden hot liquid sensation in between your buttocks, and you squeak in shock - it's almost like somebody has tipped hot lava onto your ass. Izma's cum is so hot you're surprised you don't see steam wafting back over you.\n\n`,
            false
        );

        // (male/Unsexed)
        if (this.player.gender <= 1) {
            /// [(If player has tight butthole:)
            if (this.player.analCapacity() < 26) {
                this.outx(
                    `You can't help but yell in pain at the sudden sensation of something so huge forcing its way into your ${this.assholeDescript()}.`
                );
                this.player.buttChange(30, true, true, false);
                this.outx("\n\n", false);

                this.outx(
                    '"<i>Holy-!  Think I better take it easy on this...</i>" you hear Izma proclaim.  "<i>For my own safety moreso than anything else!</i>"  Her efforts become more gentle.  She still forces her way into you, inch by painstaking inch, but she does so at a slower, steady pace, allowing your pucker time to adjust to the fierce stretching she is subjecting it to and using her hot pre-cum like lubricant.\n\n',
                    false
                );
            }
            // (If player has middling anus:)
            else if (this.player.analCapacity() < 26) {
                this.outx(
                    "You can feel every inch of her cock as it sinks steadily into your anus, swelling into your guts as inexorably as the flood tide.\n\n",
                    false
                );

                this.outx(
                    '"<i>Ahhhh... now that\'s a nice little hole!  Did you lose on purpose?</i>" she asks, and you can hear the grin in her voice.\n\n',
                    false
                );
            }
            // (If player has a loosey goosey:)
            else {
                this.outx(
                    `Izma's cock may be fairly impressive, but you've taken bigger in your time, and it shows; Izma's first experimental thrust sees her sink up to the hilt into your bowels, and you moan with the pleasure of being filled again even as her four balls slap against your ${this.buttDescript()}.\n\n`,
                    false
                );

                this.outx(
                    '"<i>The heck!?  What kind of monsters have you been running into?</i>" she wonders aloud.\n\n',
                    false
                );
            }

            this.outx(
                `Fully buried, she tightly grips your ${this.assDescript()}  and then pulls out partway, before thrusting herself back in fiercely.  "<i>Thought you were clever, eh?  Wanted to try doing it like shark people do, did you?  Well, among the sharks, there're only two sorts - the strong and the weak.  And this is what the weak get.</i>"  She growls fiercely.\n\n`,
                false
            );

            this.outx(
                `Harder and faster she thrusts, building up a rhythm that grows in pace, her balls slapping audibly against your ${this.buttDescript()} as she bucks back and forth.  You can feel her huge male organ in your depths, rubbing against your prostrate, stretching your inner walls, her boiling erection against your burning heat.  You moan in pleasure; you can't help but enjoy this`
            );
            if (this.player.hasCock())
                this.outx(
                    ", and your own male organ is hard and throbbing from the stimulation",
                    false
                );
            this.outx(".\n\n", false);

            this.outx(
                "\"<i>Oh, somebody likes it, eh?  Well, don't worry, you wanted to test your luck, so I'm not going to hold back!  You're getting the whole experience, sweetheart!</i>\" Izma growls.  Her hands suddenly shift from squeezing your buttocks to holding onto your back, and you howl in a mixture of pain and pleasure as Izma suddenly bites you - hard enough that you can feel it, but not hard enough to draw blood, especially given her shark teeth are retracted.  Her other teeth fix themselves in your side as she ruts with you, and you can't help but thrust yourself back against her.  If this is how the sharks do it, you could really get used to it...\n\n",
                false
            );

            this.outx(
                "\"<i>That's it, weakling, moan for me; make this sweeter!  I'd be moaning if you had won, so the least you can do is give me the same courtesy - fair's fair!</i>\" she mumbles.  \"<i>Oh, yes, yes, yes!  Good little fuck, good!  I... I'm... here... it... comes!</i>\"  She roars, releasing her grip on your shoulder to bellow her exultation to the sky, the climax that has been churning and thrashing her mighty balls finally erupting from within her.\n\n",
                false
            );

            this.outx("You groan as well, ");
            // [(male)
            if (this.player.hasCock()) {
                this.outx(`${this.sMultiCockDesc()} disgorging `);
                if (this.player.cumQ() < 25) this.outx("a trickle");
                else if (this.player.cumQ() < 150) this.outx("several squirts");
                else this.outx("a steady stream");
                this.outx(
                    " of semen onto the sandy earth below you, but it pales in comparison to the tide flooding into your guts.  Hot and slick, it surges and flows into you, pumping and pumping into your depths.",
                    false
                );
            }
            // unsex)
            else this.outx("your own muscles spasming from the immense pleasure.");
            this.outx(
                "  Your belly grows as the great wave of tigershark cum reaches your stomach and fills it to the brim, and then it begins to stretch further.  Your limbs fail you and you fall face-first onto the sand in your pleasure, too consumed by sensation to even notice your stomach puffing out firm and hard against the earth.\n\n",
                false
            );

            this.outx(
                `Finally, Izma stops, panting hard for breath; as her cock softens and pulls free from your stretched anus, a steady trickle of hot cum pours out in its wake.  As she recovers, so too do you, rolling over so that you can see her, your midriff swollen into a small but undeniable gut from all the cum she has poured into it.  She looks at you, undeniably pleased by what she sees. Leaning down, she gives you a small peck on the lips, then flops down beside you.  She reaches over and pulls you over, letting you rest your head against her pillow-like DD-cup breasts. When you are recovered, she helps you up.  "<i>You're too good to your inferior, ${this.player.short}... but that's what I love about you so much.</i>"  She smirks, giving you a decidedly unchaste kiss and a smack on the ass before you dress yourself and head back to camp.\n\n`,
                false
            );
        }
        // (female)
        else if (this.player.gender == 2) {
            // [(If player has tight cunt:)
            if (this.player.vaginalCapacity() < 26) {
                this.outx(
                    `You can't help but yell in pain at the sudden sensation of something so huge forcing its way into your ${this.vaginaDescript(
                        0
                    )}.\n\n`,
                    false
                );

                this.outx('"<i>Whoah-!  ', false);
                if (this.player.vaginas[0].virgin) this.outx("First time, huh?");
                else this.outx("That's tight!");
                this.outx(
                    "  Don't worry kiddo; I'll go easy on you... at least for the first few thrusts.</i>\"  Surprisingly she's telling the truth, and her efforts become more gentle.  She still forces her way into you, inch by painstaking inch, but she does so at a slower, steady pace, allowing your pussy time to adjust to the fierce stretching she is subjecting it to, using her hot pre-cum like lubricant.  You find yourself pushing back to speed up the process, desperate for Izma to fill you again.",
                    false
                );
            }
            // (If player has ordinary, everyday cunt:)
            else if (this.player.vaginalCapacity() < 60) {
                this.outx(
                    `You can feel every inch of her cock as it sinks steadily into your ${this.vaginaDescript(
                        0
                    )}, filling your moist folds as inexorably as the rising tide.\n\n`,
                    false
                );

                this.outx(
                    '"<i>Ahhhh~  Now that\'s a nice little hole!  Did you lose on purpose?</i>" she asks, and you can hear the grin in her voice.  You find yourself wondering that as well...',
                    false
                );
            }

            // (If player is loose:)
            else {
                this.outx(
                    "Izma's cock may be fairly impressive, but you've taken bigger in your time, and it shows; Izma's first experimental thrust sees her sink up to the hilt into your crotch, and you moan with the pleasure of being filled again even as her four balls slap against your taint.\n\n",
                    false
                );

                this.outx(
                    '"<i>The heck!?  What kind of monsters have you been running into?</i>" she wonders aloud.',
                    false
                );
            }
            this.player.cuntChange(30, true, true, false);
            this.outx("\n\n", false);

            this.outx(
                `Fully buried, she tightly grips your ${this.buttDescript()} and then starts to pull out, before thrusting herself back in fiercely.  "<i>Thought you were clever, eh?  Wanted to try doing it like shark people do, did you?  Well, among the sharks, there're only two sorts - the strong and the weak.  And this is what the weak get.</i>"  She growls fiercely.\n\n`,
                false
            );

            this.outx(
                "Harder and faster she thrusts, building up a rhythm that grows in pace, her balls slapping audibly against your butt as she bucks back and forth.  You can feel her huge male organ in your depths, rubbing against your womb's walls and stretching you out, her boiling erection pressed against your burning insides.  You moan; you can't help but enjoy this, your cunt drooling from the intense pleasure.\n\n",
                false
            );

            this.outx(
                `"<i>Oh, somebody likes it, eh?  Well, don't worry, you wanted to test your luck, so I'm not going to hold back!  You're getting the whole experience, sweetheart!</i>" Izma growls.  Her hands suddenly shift from your buttocks to holding onto your ${this.chestDesc()}, and you howl in a mixture of pain and pleasure as Izma suddenly gives your ${this.nippleDescript(
                    0
                )}s a good hard tug.  "<i>Stiff nipples?  You so wanted this...</i>" Izma teases, licking at your neck and causing you to moan in pleasure.\n\n`,
                false
            );

            this.outx(
                "\"<i>That's it, weakling, moan for me; make this sweeter!  I'd be moaning if you had won, so the least you can do is give me the same courtesy - fair's fair!</i>\" she mutters.  \"<i>Oh, yes, yes, yes! Good little fuck, good!  I... I'm... here... it... comes!</i>\"  She roars, releasing her grip on your tormented breasts to bellow her exultation to the sky, the climax that has been churning and thrashing her mighty balls finally erupting from within her.\n\n",
                false
            );

            this.outx(
                "You groan as well, your own orgasm coating the sands beneath you with girly fluids as Izma's cum boils into your womb.  Hot and slick, it surges and flows into you, pumping and pumping into your depths. Your belly grows as the great wave of tigershark cum reaches your stomach and fills it to the brim, and then it begins to stretch further.  Your limbs fail you and you fall face-first onto the sand in your pleasure, too consumed by sensation to even notice your stomach puffing out firm and hard against the earth.\n\n",
                false
            );

            this.outx(
                `Finally, Izma stops, panting hard for breath; as her cock softens and pulls free from your stretched anus, a steady trickle of hot cum pours out in its wake.  As she recovers, so too do you, rolling over so that you can see her, your midriff swollen into a small but undeniable gut from all the cum she has poured into it.  She looks at you, undeniably pleased by what she sees. Leaning down, she gives you a small peck on the lips, then flops down beside you.  She reaches over and pulls you over, letting you rest your head against her pillow-like DD-cup breasts. When you are recovered, she helps you up.  "<i>You're too good to your inferior, ${this.player.short}... but that's what I love about you so much.</i>"  She smirks, giving you a decidedly unchaste kiss and a smack on the ass before opening her locker.\n\n`,
                false
            );

            if (this.player.pregnancyIncubation == 0)
                this.outx(
                    "Hauling out a plant, she gingerly removes a leaf and offers it to you.  \"<i>Could you take this please?  It's an anti-pregnancy herb.  I'd be happy to have babies with you someday... but I want to earn your acknowledgment as a mate first.</i>\"  Smiling a bit at how old-fashioned she seems, you take the leaf out of her hands and eat it.",
                    false
                );
        }
        // (herm)
        else {
            this.outx(
                "\"<i>Dirty little minx, ain't ya?  You wanted this, didn't you...</i>\" Izma teases, shoving two fingers into your moist nether-lips, to test the waters.  The peneration of your needy cunt does serve to make you whimper softly, almost begging to just be filled.  ",
                false
            );
            // (Tight/Virgin vagina)
            if (this.player.vaginalCapacity() < 26) {
                this.outx(
                    '"<i>My oh my, quite a tight little slit you got back here. Not for long...</i>" Izma says, her fingers roaming around within your cunt.',
                    false
                );
            }
            // (Loose vagina)
            else if (this.player.vaginalCapacity() < 60) {
                this.outx(
                    'Izma giggles slightly from just how easy it is to move around your moist folds.  "<i>Well, this\'ll make things slightly easier for you I suppose</i>"',
                    false
                );
            }
            // (Gaping vagina)
            else {
                this.outx(
                    "Izma's eyes widen as her entire hand seems to slip into your cavernous vagina. \"<i>Holy shit... what's been up here?</i>\" she mumbles, laughing nervously in amazement.",
                    false
                );
            }
            this.outx(
                "  Pulling her fingers free, Izma quickly flips your nude body over, leaving you on your back and staring up at her.  Izma's hands are resting on her hips and she seems to be puffing her large chest out proudly. Her foot-long cock is fully erect, hot beads of pre-cum occasionally dripping onto the sands.  She takes the time to examine your own cock, grinning with her fangs bared.  \"<i>Let's see what you've got, weakling.</i>\"\n\n",
                false
            );
            const x: number = this.player.biggestCockIndex();
            // (1-10 inch penis)
            if (this.player.cocks[x].cockLength <= 10)
                this.outx(
                    'Izma manages to supress a snort of laughter at the sight of your cock.  "<i>Um... wow?  It\'s simply... heh, huge...</i>"',
                    false
                );
            // (10-19 inches)
            else if (this.player.cocks[x].cockLength <= 19)
                this.outx(
                    '"<i>Not bad, I\'m actually impressed,</i>" Izma says, nodding slightly in approval.',
                    false
                );
            // (20+ inches)
            else
                this.outx(
                    `Izma gives a low whistle at the sight of your ${this.cockDescript(
                        0
                    )}.  "<i>Now THAT'S a cock.  Looks like you've got a third leg down there!</i>`
                );
            this.outx("\n\n", false);

            this.outx(
                `Seemingly done appraising you, Izma roughly grabs your ${this.player.feet()} and pulls your rear upwards, forcing your weight onto your spine and making you cry out from the uncomfortable position.  She doesn't waste time on foreplay, simply deciding to bury her cock into you slowly, inch by painstaking inch until she's pushing against the entrance to your womb.`
            );
            this.player.cuntChange(30, true, true, false);
            this.outx("\n\n", false);

            this.outx(
                `She starts thrusting in and out of you, gradually increasing the speed and force, her hot pre-cum and your feminine juices acting like a lubricant to make things easier.  "<i>Ahh~  You're a lovely cock-sleeve... you like being treated like this, don't ya, weakling?</i>" Izma taunts, slamming in and out of your ${this.vaginaDescript(
                    0
                )}.  You're not even really ashamed to admit that such is the case anymore.\n\n`,
                false
            );

            this.outx(
                'Every thrust pushes you deeper into the sands, and eventually you find yourself pumping your hips upward against Izma\'s own, eager to pleasure her and yourself.  Izma seems to notice this and laughs loudly.  "<i>Oh?  You really like being dominated?  Ha, I thought as much.</i>"  She continues to taunt you as she pounds into you, her balls smacking against you every time.  Your mind is too clouded with lust to hear even half of what she says.  Right now all you care about is getting off.\n\n',
                false
            );

            this.outx(
                `Within minutes, Izma gives one final, powerful thrust and roars loudly, cum pumping into your womb and spraying out onto the sands.  ${this.SMultiCockDesc()} twitches and pulses, ready to blow.  Izma quickly takes hold and points `
            );
            if (this.player.cockTotal() == 1) this.outx("it");
            else this.outx("them");
            this.outx(
                " toward your face, stroking you to your own climax.  Jets of your own cum splatter across your face and body as you writhe, protesting. \"<i>Tch, you really thought I'd let you cum on ME?  Maybe if you actually managed to beat me I'd give you the honor,</i>\" Izma says, pulling free with a loud *SCHLICK* sound.  She ",
                false
            );
            if (this.player.pregnancyIncubation == 0) {
                this.outx(
                    `releases your ${this.player.feet()}, allowing your ${this.buttDescript()} to hit the sand with a plop, and gets to work redressing while you lie still.  She returns with an anti-pregnancy herb in her hands, and then flips a leaf into her mouth. Before you can wonder why she did that, she bends down and kisses you fiercely, her tongue pushing it past your lips and down your throat.`
                );

                this.outx(
                    '"<i>I\'d be happy to make some babies with you... but <b>after</b> you accept me as a mate."</i>  She smirks, giving you a second, decidedly unchaste kiss before she helps you up.  You dress yourself and head back to camp feeling very sated.',
                    false
                );
            } else
                this.outx(
                    "gives you a decidedly unchaste kiss before she helps you up.  You dress yourself and head back to camp feeling very sated.",
                    false
                );
        }
        this.player.orgasm();
        this.dynStats("sen", 2);
        this.player.slimeFeed();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // 9999 CAMP FOLLOWER
    // tion camp
    // [Follower options]
    public izmaFollowerMenu(): void {
        this.spriteSelect(32);
        this.outx("", true);

        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0) {
            // Izma pops 'em out!
            if (this.pregnancy.isPregnant && this.pregnancy.incubation == 0) {
                this.IzmaPoopsBabies();
                this.pregnancy.knockUpForce(); // Clear Pregnancy
                return;
            }
            this.outx(
                'You call for Izma and she approaches, asking, "<i>What can I do for my Alpha?</i>"\n\n',
                false
            );
            // Izma Pregnancy Stages:
            switch (this.pregnancy.event) {
                case 2:
                    this.outx(
                        "You can't help noticing that Izma seems very nauseous this morning; she's literally green around the gills.  When you investigate, though, she waves you off, insisting that she's fine; she just has a bit of a stomach bug.",
                        false
                    );
                    break;
                case 3:
                    this.outx(
                        `Izma comes up to you, looking concerned.  "<i>${this.player.short}, do you think I've gained weight?</i>" she asks.  Looking at her, particularly at the stomach she's holding her hands over, you have to confess that it is starting to bulge out in a noticeable paunch.  At her crestfallen look, you suggest that maybe she's pregnant.  At that, she looks delighted.  "<i>You really think so?</i>" she asks, hopefully.  You assure her that you're certain of it; after all, she's very good at watching her weight.  Pleased, she kisses you and then heads off for a swim.`
                    );
                    break;
                case 4:
                    this.outx(
                        "There is no doubt about it now; Izma's pregnant.  She's grown gravid more rapidly than any of the expecting mothers you remember seeing back in your village, but she seems to be having all of the same aches and pains.  She's grown lethargic and irritable, and complains about not being able to fit into her old clothes.  Still, despite that, she seems happy; she's always rubbing her belly with unmistakable pride.  You also think you've noticed her casting you \"<i>come hither</i>\" looks more frequently than before.",
                        false
                    );
                    break;
                case 5:
                    this.outx(
                        "Izma's started to go around completely naked now.  She insists that she's grown too big to fit into her clothes, but you're kind of skeptical about that; she's as big as the women in your village got when they were near the end, but they managed to fit into their clothes, and theirs were a lot more restrictive than a bikini and grass skirt combo.  Still, you're not objecting to the view it provides, and she definitely seems to enjoy that; you never knew a shark tail could be wiggled in an enticing manner over shapely buttocks until you came to this world...",
                        false
                    );
                    break;
                case 6:
                    this.outx(
                        "Izma's certain the baby will come soon.  You're inclined to believe her; she's huge now.  She still wears no clothing, but there's definitely a practical reason for it"
                    );
                    if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
                        this.outx(
                            "- you don't think her skirt would be able to cope with how often she gets erect now, her huge cock rubbing along"
                        );
                    else this.outx(", her juices staining");
                    this.outx(
                        " the underside of her swollen belly...  Izma spends much of her time in the water, now; she says it's to soothe her skin.  Given you've seen her explosively cum all over herself from "
                    );
                    if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
                        this.outx(
                            "the friction of her cock against her bulge, you think it has more to do with avoiding being splattered in sexual juices all day long.",
                            false
                        );
                    else
                        this.outx(
                            "the friction of her thighs as she moves, you think it has more to do with avoiding being splattered in sexual juices all day long.",
                            false
                        );
                    break;
                default:
            }
        } else {
            this.outx("Izma smiles and puts away her book at your approach.");

            this.outx("\n\n“<i>What can I do for you, Alpha?</i>”");
        }

        // [Sex (If lust is 30+)] [Talk] [Appearance]
        let sex;
        if (this.player.lust >= 33) sex = this.izmaSexMenu;
        let kids;
        if (
            this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] +
                this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] >
            0
        )
            kids = this.izmaKidsPlaytime;
        let deDickT = "";
        let deDickB;
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) {
            deDickT = "Remove Dick";
            deDickB = this.removeIzmasPenis;
        } else {
            deDickT = "Go Herm";
            deDickB = this.izmaDickToggle;
        }
        this.choices(
            "Appearance",
            this.izmaPearance,
            "Books",
            this.IzmaCampBooks,
            "Children",
            kids,
            "Sex",
            sex,
            "Talk",
            this.talkWivIzma,
            "Tooth",
            this.gatASharkTooth,
            "",
            undefined,
            "",
            undefined,
            deDickT,
            deDickB,
            "Back",
            this.camp.campLoversMenu
        );

        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 1) this.addButton(1, "", undefined);
        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 1) this.addButton(2, "", undefined);

        if (
            this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0 &&
            this.flags[kFLAGS.FARM_CORRUPTION_STARTED] == 1 &&
            !this.pregnancy.isPregnant
        )
            this.addButton(6, "Farm Work", this.sendToFarm);
        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] != 0)
            this.addButton(6, "Go Camp", this.backToCamp);

        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 1)
            this.addButton(9, "Back", kGAMECLASS.farm.farmCorruption.rootScene);
    }

    private sendToFarm(): void {
        this.clearOutput();
        this.izmaSprite();

        this.outx(
            "You tell your beta that she is to head towards the lake, find a farm, present herself to the lady who works there and do as she says. Izma’s brow furrows as she takes this in."
        );

        this.outx(
            "\n\n“<i>If you say so, alpha. It’ll be nice to be near the lake again, but... have I done something wrong?</i>”"
        );

        this.outx(
            "\n\n“<i>Not at all,</i>” you reply. “<i>I just need someone I can trust down there helping out. I’ll visit often though, don’t worry.</i>” This seems to content the tiger shark. She packs up her chest, waves at you, and then begins to haul it in the direction of the lake."
        );

        this.outx(
            "\n\nIzma might be strong, you think, but she is completely unused to manual labor and taking orders from anyone but yourself; you doubt she will help Whitney much. On the other hand, there’s no doubt you’ve just given the farm a powerful protector."
        );

        this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] = 1;

        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private backToCamp(): void {
        this.clearOutput();
        this.izmaSprite();

        this.outx("You tell her to head back to camp; she will be more use to her alpha there.");

        this.outx(
            "\n\n“<i>Whatever you say.</i>” She grins and wrinkles her nose. “<i>It was nice to be by the lake again, but I’m glad to get out of here: farm work isn't exactly stimulating.</i>” You leave Izma to pack up her things and go."
        );

        this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] = 0;

        this.doNext(kGAMECLASS.farm.farmCorruption.rootScene);
    }

    // Get a tiger shark tooth
    private gatASharkTooth(): void {
        this.spriteSelect(32);
        this.clearOutput();
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00246] > 1) {
            this.outx(
                "Izma smiles apologetically and says, \"<i>I'm sorry, but I won't be able to get my hands on one of those until tomorrow.</i>\""
            );
            this.doNext(this.izmaFollowerMenu);
        } else {
            this.outx(
                'Izma smiles as she pulls a tooth from her chest.  She hands it to you with a pleased expression.  "<i>Anything for you, my Alpha.</i>"  '
            );
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00246]++;
            this.inventory.takeItem(this.consumables.TSTOOTH, this.playerMenu);
        }
    }
    // [Appearance]
    private izmaPearance(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "Izma is a 6-foot 2-inch tall tigershark, with a very toned athletic build; her muscles are covered by coarse red sharkskin, marked with black stripes across her body.  She is currently wearing a bikini top with a grass skirt"
        );

        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00235] == 0)
            this.outx(" and wielding iron gauntlets as a weapon.");
        else this.outx(".");

        this.outx(
            "  She has an angular face whose features are slightly reminiscient of a shark.  Her mouth contains a second row of retractable knife-like teeth in front of the normal blunt ones.  Her face is feminine despite its angularity.  She has long silver - white hair that grows past her shoulders. Her hips are girly without being too wide and her butt is firm.  She has a long shark - tail that grows down to her ankles, marked with the same tiger stripes as the rest of her body.  She has two normal human legs ending in normal human feet.\n\n",
            false
        );

        this.outx(
            "She has a pair of DD-cup breasts, with a single 0.5 inch nipple on each breast.\n\n",
            false
        );

        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) {
            this.outx(
                "Just above her pussy, Izma has a traitorously long humanoid cock that sticks out of her skirt more often than not.  It's around 15 inches long and 1.5 inches thick.  It has a dark red color like the rest of Izma's skin, though it is devoid of tiger-stripes. A quad of baseball-sized testes swings heavily beneath her cock.\n\n",
                false
            );

            this.outx(
                "She has a loose fuck-hole placed between her legs, with a 0.2 inch clitoris.  Occasionally, beads of lubricant appear on her cunt, her lips slightly parted.\n\n",
                false
            );
        } else
            this.outx(
                "In her crotch, Izma has a puffy, impressively wet pussy that frequently dribbles lubricants - enough that if she doesn't take care, it will stain her grass skirt.  The lips are dark red and will frequently part as she becomes aroused, revealing her swollen love-button.  Though she doesn't look loose, her flesh looks soft and pliant enough to spread quite wide.\n\n"
            );

        this.outx(
            "She has a tight asshole placed between her toned butt-cheeks, right where it belongs.",
            false
        );
        this.doNext(this.izmaFollowerMenu);
    }
    private izmaSexMenu(): void {
        this.spriteSelect(32);
        // [Get Anal] [Her Vag] [69] [Izma Mounts PC]
        let mount;
        let vagoo;
        let domVag;
        // Mounts PC - req Cock
        // Vagoo - req Cock
        if (this.player.hasCock()) {
            if (this.player.cockThatFits(65) >= 0) domVag = this.fuckIzmasPussyDominate;
            mount = this.followerIzmaMountsPC;
            vagoo = this.followerIzmaTakesItInVagoo;
        }
        let getVagooFucked;
        if (this.player.hasVagina() && this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            getVagooFucked = this.inCampRideIzmasDickDongTheWitchIsDead;
        // 69 - non-0 gender
        let sixty;
        if (this.player.gender > 0) sixty = this.followerIzmaTakesIt69;
        // var kids: string = "";
        // if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00249] == 1) kids = "NoKidsPlease";
        // else kids = "Have Kids?";
        let analCatch;
        let assDom;
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) {
            analCatch = this.followerIzmaTakesItInPooper;
            assDom = this.radarIzmaAnalDominant;
        }
        // choices("Anal \'Catch\'",analCatch,"DominateVagina",domVag,"DomWithAss",assDom,"Get Mounted",mount,"Izma's Vagina",vagoo,"RideIzmaCock",getVagooFucked,"Sixtynine",sixty,kids,childToggle,"",0,"Back",izmaFollowerMenu);
        this.menu();
        this.addButton(0, "Anal 'Catch'", analCatch);
        this.addButton(1, "DominateVagina", domVag);
        this.addButton(2, "DomWithAss", assDom);
        this.addButton(3, "Get Mounted", mount);
        this.addButton(4, "Izma's Vagina", vagoo);
        this.addButton(5, "RideIzmaCock", getVagooFucked);
        this.addButton(6, "Sixtynine", sixty);
        this.addButton(7, "Kids", this.childToggle);
        if (
            this.flags[kFLAGS.TIMES_IZMA_DOMMED_LATEXY] > 0 &&
            this.flags[kFLAGS.IZMA_NO_COCK] == 0 &&
            this.latexGirl.latexGooFollower()
        )
            this.addButton(8, this.flags[kFLAGS.GOO_NAME], this.izmaLatexySubmenu);
        this.addButton(9, "Back", this.izmaFollowerMenu);
    }
    // [Izma mounts the PC]
    private followerIzmaMountsPC(lastHalf = false): void {
        this.spriteSelect(32);
        this.outx("", true);
        let x: number = this.player.cockThatFits(65);
        if (x < 0) x = 0;
        if (!lastHalf) {
            if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) this.player.slimeFeed();
            this.outx(
                `With a smirk, you make a show of removing your ${
                    this.player.armorName
                } and settling yourself down on your back, ${this.sMultiCockDesc()} pointing into the air excitedly.  You give Izma a coy look and tell her that you're thinking of letting her have control this time... if she thinks she can dominate with her pussy`
            );
            if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) this.outx(" instead of her cock");
            this.outx(
                '.  Izma watches you eagerly and licks her lips.  "<i>I think that can be arranged,</i>" she purrs, straddling you and then slowly sliding down onto your erect member.  The tiny tendrils inside her cunt tickle and massage your cock all the while.\n\n',
                false
            );

            this.outx(
                `You groan, lie yourself back down, and give yourself over to your aquatic girlfriend's ministrations; you don't know why she has naughty little tentacles inside her pussy, but you're certainly not going to complain about them.  You can feel them caress and stroke your ${this.cockDescript(
                    x
                )}, eagerly pulling it deeper and deeper into her warm, wet, inviting depths.\n\n`,
                false
            );

            this.outx(
                "Once you're fully inside her pussy she looks at you and smirks, a low, animalistic growl escaping her lips.  As her hips start to gain speed she leans down and bites your collar bone, thankfully with her human teeth.  You yelp in shock and cast a startled glance at her.  She hums in your ear as her hips start to twist and gyrate even faster.\n\n",
                false
            );

            this.outx(
                "It does feel pretty good, and so you settle back down, one hand cautiously lifting up to caress the mark of your lover's bite.  \"<i>Hehe, don't worry; you're not bleeding or anything.  Just marking you as mine,</i>\" she whispers, before giving a loud moan.  "
            );
            if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
                this.outx(
                    `  Your stomach starts to feel wet, and as you look down you realize her pre is starting to soak into your ${this.player.skinFurScales()}.\n\n`,
                    false
                );
            else
                this.outx(
                    `  Your stomach starts to feel wet, and as you look down you realize her feminine lubricant is starting to soak into your ${this.player.skinFurScales()}.\n\n`,
                    false
                );

            this.outx(
                "You wonder if you should be more actively moving your hips to her thrusts, but then, this is supposed to be about letting her be in charge."
            );
            if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) {
                this.outx(
                    "  Still, the sight and sensation of her pre-cum-dribbling cock slapping against your belly gives you an idea.  "
                );
                this.outx(
                    "You could reach up, grab her meaty member and jerk it off... or you can just enjoy the sex as is.  What will you do?"
                );
                this.simpleChoices(
                    "Jerk It",
                    this.createCallBackFunction(this.followerIzmaMountsPC, true),
                    "Nope",
                    this.RadarIzmaLeaveHerWangUnWingWanged,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined
                );
                return;
                // outx("You remove your hand from her mark and instead place it squarely on her cock, wrapping your fingers around its two-inch-thick girth.\n\n", false);
            } else
                this.outx(
                    "  Still, the sight of her curvaceous cleavage bouncing gives you an idea.  You reach up to cup your strong lover's hard bosom, enjoying the sight of her slightly-upturned nipples pointing up at the sky.  You flick them gently as she rides you, sometimes squeezing and tugging encouragingly.\n\n"
                );
        }
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) {
            if (lastHalf) this.clearOutput();
            this.outx(
                "You remove your hand from her mark and instead place it squarely on her cock, wrapping your fingers around its two-inch-thick girth.\n\n",
                false
            );
            this.outx(
                "Izma moans loudly as you rub her rock hard shaft. \"<i>There's a good bitch,</i>\" she mumbles, in the best possible way. You bite back the retort that immediately springs to your mind; it's all part of the fun.  Still, it wouldn't hurt to remind Izma that she's not going to get everything her own way.  Your hand starts to slide up and down her shaft, reaching up to the top to gather her pre, then spreading it down her length - if you stretch a little, you can even rub some of the fluid into her jiggling testes.  You apply all of the knowledge and skill you've gained from ministering to your own cock to make this as tormentingly delicious for your hermaphrodite lover as possible.  You teasingly caress and rub, sometimes fast and sometimes slow, sometimes hard and sometimes soft.\n\n",
                false
            );
        } else
            this.outx(
                "Izma moans loudly as you rub her rock hard nipples. \"<i>There's a good bitch,</i>\" she mumbles.  You bite back the retort that immediately springs to your mind; it's all part of the fun.  Still, it wouldn't hurt to remind Izma that she's not going to get everything her own way... your hands start to pinch and tug, mixing a bit of pain in with the shark's pleasure, timing the hard pulls to coincide with every rise and fall of her pussy on your cock.  Working those tender nubs hard, you apply all of your knowledge and skill to keeping your partner on the edge of orgasm.  Sometimes, you even cup her breasts and gently caress them, but only for a moment at a time.\n\n",
                false
            );

        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(
                `Izma bites her lip in response, clearly wanting to enjoy her time on top just a little bit longer.  But the grunts and moans of ecstasy make it clear that the tigershark can't hold back much longer.  Her vaginal walls clamp down hard against your cock.  She squeals loudly and thick ropes of her jizz fly through the air, going to the point where a few even arc over your head. Most of it, though, hits your face and ${this.allBreastsDescript()}, plastering the top half of your body in cum as she empties her quads.\n\n`,
                false
            );
        else
            this.outx(
                "Izma bites her lip in response, clearly wanting to enjoy her time on top just a little bit longer.  But the grunts and moans of ecstasy make it clear that the tigershark can't hold back much longer.  Her vaginal walls clamp down hard against your cock.  She squeals loudly and thin streams of her girl-cum run from your belly, the wriggling cilia in her twat going at your dick like crazy.  Her juices run so fast and so freely that it soaks most of your belly, [hips], [butt], and [legs].\n\n",
                false
            );

        this.outx("Even if you hadn't found Izma's impromptu cum bath a bit kinky, your ");
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) this.outx("own ");
        this.outx(
            "cock has been just as teased and tormented - and as her inner walls grip down, her tentacles squeezing as hard as they can, it's too much. You let out a cry of your own as you flood her interior with your spooge",
            false
        );
        // [(if vagina)
        if (this.player.hasVagina()) {
            this.outx(", your cunt ");
            if (this.player.vaginas[0].vaginalWetness <= VAGINA_WETNESS_SLICK)
                this.outx("dripping");
            else if (this.player.vaginas[0].vaginalWetness <= VAGINA_WETNESS_DROOLING)
                this.outx("gushing");
            else this.outx("cascading");
            this.outx(" feminine fluids onto the sticky ground beneath you both");
        }
        this.outx("; you were just as eager to release as she was.\n\n", false);
        this.izmaPreg();
        // (Standard cum protozoan)
        if (this.player.cumQ() < 500)
            this.outx(
                "You can feel Izma's womb fill with your cum, and she shudders from the sheer pleasure.",
                false
            );
        // (High cum production)
        else
            this.outx(
                "Izma squeals loudly as you cum inside her, almost having a second orgasm as her belly is bloated and distended by your inhuman amount of cum.",
                false
            );
        this.outx(
            '  Once you\'ve finished, Izma rolls off you and continues breathing heavily.  "<i>That was amazing... my Alpha.</i>"\n\n',
            false
        );

        this.outx(
            "You're too busy gasping for breath to reply, at first.  But then, with a smile, you pick yourself up and give her a quick kiss on the cheek.  To your surprise, the ever-horny shark-girl actually blushes with delight at the gesture.  The two of you leisurely dress yourselves and then go your separate ways; you back to your camp, Izma back to the stream to soak and recover.",
            false
        );
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private izmaPreg(): void {
        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 1) return;
        // PREGGO CHANCES
        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00249] == 1 &&
            !this.pregnancy.isPregnant &&
            IzmaScene.rand(100) < 10 + Math.round(this.player.cumQ() / 100)
        ) {
            this.pregnancy.knockUpForce(
                PregnancyStore.PREGNANCY_PLAYER,
                PregnancyStore.INCUBATION_IZMA
            );
        }
    }

    private RadarIzmaLeaveHerWangUnWingWanged(): void {
        this.spriteSelect(32);
        this.clearOutput();
        this.outx(
            'As much as you think Izma would enjoy a handjob, you are not too keen on stimulating her member right now.  Izma notices your momentary stare at her rather large cock and grins mischievously at you.  "<i>Come on, bitch! Pleasure your "Alpha"; you know you want to!</i>" she chimes.  You stare back at her, and kindly inform her that her Alpha isn\'t keen on doing that; your reasons are your own, but you simply don\'t want to do that.  Her confident smirk almost immediately evaporates.  "<i>Oh... sorry. I was caught up in the moment. If it\'s okay with you, I\'ll just jerk my cock while I dominate my Alpha,</i>" she purrs.  Smiling back at her, you nod and give her a slap on the ass, giving her the message to giddy up.  With complete abandon, your tigershark lover giggles and bounces against your lap, manhandling your cock with those pussy feelers.  Moaning in appreciation, you dart your hands up to her rump and grasp it in your hands.  Driven by pleasure and sexual instinct, Izma fiercely strokes her member, moaning blissfully as her closed eyelids twitch from the dual pleasures of ravaging her cunt with your cock and jerking her prick in her hand.  She tries hard to contain the force of her sexual euphoria, but her expression ultimately betrays her escalating passion as she grits her teeth and physically opens her mouth to let out a hardy moan; dead silence is the only thing that escapes from her wide open mouth for a few briefs moments, before she releases a prolonged, erratic series of wails.'
        );
        this.outx(
            "\n\nIzma bites her lip in response, clearly wanting to enjoy her time on top just a little bit longer.  But the grunts and moans of ecstasy make it clear that the tigershark can't hold back much longer.  Her vaginal walls clamp down hard against your cock.  She squeals loudly as thick ropes of jizz launch from her cock, her hands cupping her cockhead to keep the cum from streaming onto your face or body."
        );
        this.outx(
            "\n\nYour own cock has been just as teased and tormented - and as her inner walls grip down, her tentacles squeezing as hard as they can, it's too much. You let out a cry of your own as you flood her interior with your spooge",
            false
        );
        // [(if vagina)
        if (this.player.hasVagina()) {
            this.outx(", your cunt ");
            if (this.player.vaginas[0].vaginalWetness <= VAGINA_WETNESS_SLICK)
                this.outx("dripping");
            else if (this.player.vaginas[0].vaginalWetness <= VAGINA_WETNESS_DROOLING)
                this.outx("gushing");
            else this.outx("cascading");
            this.outx(" feminine fluids onto the sticky ground beneath you both");
        }
        this.outx("; you were just as eager to release as she was.\n\n", false);
        // PREGGO CHANCES
        this.izmaPreg();
        // (Standard cum protozoan)
        if (this.player.cumQ() < 500)
            this.outx(
                "You can feel Izma's womb fill with your cum, and she shudders from the sheer pleasure.",
                false
            );
        // (High cum production)
        else
            this.outx(
                "Izma squeals loudly as you cum inside her, almost having a second orgasm as her belly is bloated and distended by your inhuman amount of cum.",
                false
            );
        this.outx(
            '  Once you\'ve finished, Izma rolls off you and continues breathing heavily.  "<i>That was amazing... my Alpha.</i>"\n\n',
            false
        );

        this.outx(
            "You're too busy gasping for breath to reply, at first.  But then, with a smile, you pick yourself up and give her a quick kiss on the cheek.  To your surprise, the ever-horny shark-girl actually blushes with delight at the gesture.  The two of you leisurely dress yourselves and then go your separate ways; you back to your camp, Izma back to the stream to soak and recover.",
            false
        );
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Get Anal]
    private followerIzmaTakesItInPooper(): void {
        this.spriteSelect(32);
        this.player.slimeFeed();
        this.outx("", true);
        this.outx(
            'When you tell Izma you want her to screw you this time, she exclaims, "<i>Ooh! It\'s my turn to be alpha!</i>"  Her look of deviant joy fades into a blush of fondness for a moment, and she holds you and whispers into your ear, "<i>It\'s really nice that you let me take charge, too.  Thanks for thinking of it.</i>"\n\n',
            false
        );

        this.outx(
            "You're about to reply when she grabs your wrists and, holding them behind your back, ",
            false
        );
        // [[if [player height>6' or player is centaur]
        if (this.player.tallness > 72 || this.player.isTaur()) {
            this.outx("pulls you down to kiss you fiercely");
        }
        // [else if player<4.5']
        else if (this.player.tallness < 54)
            this.outx("pulls you up off the ground in a bear hug to kiss you fiercely");
        // [else]
        else this.outx("pulls you in to her body and kisses you fiercely");
        this.outx(". She lets her shark teeth graze your lips, and you taste blood.\n\n", false);

        this.outx(
            "You start to kiss her back, but she's still in charge, and seems intent on screwing your mouth with her tongue. You feel her stiffening tool ",
            false
        );
        // [[if player has legs]
        if (this.player.isBiped() || this.player.isTaur()) this.outx("between your legs");
        // [else]
        else this.outx("against your lower body");
        this.outx(
            ", and give up on fighting. Each time her tongue thrusts into your mouth, you try to suck it a little, or flick it with your own tongue.\n\n",
            false
        );

        this.outx(
            "Izma gives a happy moan as she feels you relax into her large breasts, and a satisfied chuckle when you start fellating her tongue.  Pulling back from your panting mouth, she pushes you down to the ground and presents you with her cock.\n\n",
            false
        );

        this.outx('"<i>Get it nice and slippery, then, if you\'re so eager.</i>"\n\n', false);

        this.outx(
            `You start kissing along her fifteen-inch length, but Izma's in more of a hurry than that, because she grabs your ${this.hairDescript()} and pulls you back to the tip.  With her smooth glans resting at your lips, you look up at her. She grins, showing all her teeth, and starts pushing your head down.\n\n`,
            false
        );

        this.outx(
            "As her cock slides past your lips and down your throat, it takes a lot of effort not to gag, but you feel proud and happy when she's the first one to look away, tilting her head back and grunting in pleasure as she bottoms out in your mouth, her balls tapping against your chin.\n\n",
            false
        );

        this.outx(
            "It's only a few seconds, but when she finally pulls out of your throat you splutter and cough.  \"<i>Too much to swallow?</i>\" she asks, half-mockingly, half-lovingly, then pulls your head back and fucks your throat in earnest, giving you at least a dozen thrusts without a chance to breathe.  When she's done she lets you fall onto your back, gasping, and Izma lowers herself onto you.\n\n",
            false
        );

        // [(if player has penis)
        if (this.player.hasCock()) {
            this.outx(
                "You expect to feel her penetrate you when she thrusts forward, but instead she runs her cock along the surface of your asshole",
                false
            );
            // [(if player has balls)
            if (this.player.balls > 0) this.outx(` and ${this.sackDescript()}`);
            this.outx(
                ` until her dark-red cock is lined up with your ${this.multiCockDescriptLight()}.\n\n`,
                false
            );

            this.outx(
                `She takes your ${this.cockDescript(
                    0
                )} and presses it against her own, holding both of them together in one hand and rubbing slightly.  Her other hand reaches down below, to rub her double set of balls`
            );
            // [(if player has balls)
            if (this.player.balls > 0) this.outx(` against your own ${this.ballsDescriptLight()}`);
            // (if no balls and vag)
            else if (this.player.hasVagina())
                this.outx(` against your already-dripping ${this.vaginaDescript(0)}`);
            // (else)
            else this.outx(" against your perineum");
            this.outx(", humiliating you more than she stimulates you.\n\n", false);

            // [if dick0 is <14\"]
            if (this.player.cocks[0].cockLength < 14)
                this.outx(
                    '"<i>Hmm...</i>" she sighs, as she looks at her glans sticking out past the tip of your dick.  "<i>It\'s nice to know who\'s in charge.</i>"',
                    false
                );
            // [dick0 >14 but <16]
            else if (this.player.cocks[0].cockLength < 16)
                this.outx(
                    '"<i>It\'s nice that we keep things fair around here,</i>" murmurs Izma, smiling at your similarly-sized cocks.',
                    false
                );
            // [If dick0 >16]
            else
                this.outx(
                    `"<i>Oh fuck,</i>" she says, her eyes filling with lust as she sees your cock extending well past her own.  She tilts forward and rubs the base of her cock hard against the base of your ${Appearance.cockNoun(
                        this.player.cocks[0].cockType
                    )}, jerking the both of you off together.  You moan helplessly when she stops, and she sighs, "<i>It feels so good to be alpha over a powerful cock like yours.</i>"`
                );
            this.outx("\n\n", false);
        }

        this.outx(
            "She slowly moves her hips away and lifts your ass up off the ground, letting her head trail along your body until it drops into place at your anus.  ",
            false
        );
        // [[if player is anal virgin]
        if (this.player.ass.analLooseness == 0) {
            this.outx(
                "You gasp in pain as she starts pushing her giant cock against your tightly-puckered ass, whimper as your sphincter gives way and, with a pop, her cock head is resting inside of you.  Izma looks at you with a confused face, and then seems to realize what just happened.\n\n",
                false
            );
            this.outx(
                "\"<i>You... let me be the first to take you? You're sweeter than I thought!</i>\"  She strokes your body with surprising gentleness as she eases herself the rest of the way into you.  Each inch is easier than the last, and by the fifteenth inch you're squirming and ready for more.",
                false
            );
        }
        // [else if player has tight anus]
        else if (this.player.analCapacity() <= 26) {
            this.outx(
                'You moan as Izma\'s cockhead pushes past your tight sphincter.  "<i>That\'s it, you beta slut,</i>" she says as she slides the rest of her cock into you.  "<i>Moan for your alpha.</i>"',
                false
            );
        }
        // [else if player has loose anus]
        else {
            this.outx(
                "Izma starts to push and, meeting no resistance from your well-trained ass, slams her hips against yours with a groan of satisfaction.\n\n",
                false
            );
        }
        this.player.buttChange(30, true, true, false);
        this.outx("\n\n", false);

        this.outx(
            "With her hips securely pressed against yours, she leans over you to grab your wrists and hold them to the ground, her elbows hooked"
        );
        if (this.player.isBiped()) this.outx(" behind your knees to immobilize you");
        else this.outx(" around your [legs] to immobilize you");
        this.outx(
            " with your ass in the air.  Her cock feels warm inside of you, and you could swear she's making it throb deliberately, just to feel you twitch in response.\n\n",
            false
        );

        this.outx(
            "She starts to screw you deliberately, pulling out just short of all the way before thrusting back in with practiced expertise.  You're lost in the pleasure of being used so roughly, and can't remotely keep track of how long she screws you.",
            false
        );
        // [if player has penis:
        if (this.player.hasCock())
            this.outx(
                "  You try to reach for your cock and get off, but her hands keep your wrists securely pinned to the ground.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            "Her thrusts become shorter, faster, and wilder, and you see her panting and focusing.  Reaching forward with your mouth, you take one of her dangling nipples in your mouth and start suckling and nibbling.  Her half-closed eyes flash open and she slams into you with a shocked expression.\n\n",
            false
        );

        this.outx(
            "She yells as you bite down on her nipple, and you're rewarded with hot spurts of cum that fill your belly as Izma's quad balls empty into you.  ",
            false
        );
        // [if player has no penis)
        if (!this.player.hasCock())
            this.outx(
                "The feeling of her cock throbbing finally puts you over the edge and you orgasm, your tight pucker helping milk the last of her cum into you.\n\n",
                false
            );
        // (if player has penis)
        else {
            this.outx(
                `She collapses onto you, spent, and you close your eyes and relish the feeling of her hot cock pulsing in your ass and her warm belly lying against your ${this.cockDescript(
                    0
                )}.  When she sits back up, she gives you a stern look as she lets go of your wrists, making it clear that they should stay right where they are.  You look at her pleadingly as she trails her fingers along your ${Appearance.cockNoun(
                    this.player.cocks[0].cockType
                )}.\n\n`,
                false
            );
            // [(if penis 0 length <14 inches)
            if (this.player.cocks[0].cockLength < 14) {
                this.outx(`Izma grabs your ${this.cockDescript(0)}`);
                if (this.player.cockTotal() > 1)
                    this.outx(
                        ` first, then your other ${this.cockDescript(
                            1
                        )}, synchronizing her movements`
                    );
                this.outx(
                    `, and starts jerking you off.  It feels incredible, and when she says, "<i>You've been a good beta for me, but now I want to see you come,</i>" you can't help but obey; you orgasm messily onto your own ${this.chestDesc()}`
                );
                // (huge cum)
                if (this.player.cumQ() >= 1500)
                    this.outx(
                        " over and over again until you're a sticky mess lying in a pool of your own semen.",
                        false
                    );
                // [(big cum)
                else if (this.player.cumQ() >= 500)
                    this.outx(" until cum pours off of your body and pools on the ground.");
                else this.outx(".");
                this.outx("\n\n", false);
            }
            // (else if penis 0 length <16 inches)
            else if (this.player.cocks[0].cockLength < 16) {
                this.outx(
                    `When Izma guides ${this.sMultiCockDesc()} between her breasts, you're not sure what you're feeling at first; smooth in one direction, rough in the other direction.  Pushing her breasts tight around your ${this.multiCockDescriptLight()}, she starts to move up and down.  The contrast quickly brings you over the edge and you cum all over her face and breasts, `
                );
                // [(normal cum)
                if (this.player.cumQ() < 300)
                    this.outx("leaving her looking spattered but pleased");
                else if (this.player.cumQ() < 500)
                    this.outx("leaving her looking wet but impressed");
                else
                    this.outx(
                        "showering her in so much cum that she leans down to lick it off of her breasts",
                        false
                    );
                this.outx(".\n\n", false);
            }
            // [(else if penis 0 length >15 inches)
            else {
                this.outx(
                    `Your sigh of relief soon becomes a moan of pleasure when you feel Izma take the head of your ${Appearance.cockNoun(
                        this.player.cocks[0].cockType
                    )} into her mouth.  Despite the hidden presence of her ring of sharp teeth, you feel nothing but bliss as she sucks, her own cock still buried deep inside of you.  She nestles the shaft of your ${this.cockDescript(
                        0
                    )} between her breasts and starts moving her upper body up and down against your cock.  You're startled to feel that her breasts are smooth in one direction and rough in the other, and the alternating sensations soon overwhelm you.  You manage a shuddering yell to warn Izma before you start pumping cum into her mouth`
                );
                if (this.player.cockTotal() > 1) this.outx(" and onto your combined bodies");
                this.outx(".\n\n", false);

                // <1 L]
                if (this.player.cumQ() < 1000)
                    this.outx(
                        "She swallows dutifully and, when your cock has stopped throbbing between her breasts, takes her mouth off of you, licks her lips, and smiles, showing so many teeth that your cock shrinks a little bit faster than normal.\n\n",
                        false
                    );
                // [<5 L]
                else if (this.player.cumQ() < 3000)
                    this.outx(
                        "She swallows dutifully at first, and when you keep pumping her with cum, gives up on swallowing. Instead, she grabs you by the hips and, by leaning down and pulling you up, gets your cock down her throat so you can deliver your seed directly.  It looks difficult but feels amazing, and when you're done and she pulls her head back, she looks very proud of herself.\n\n",
                        false
                    );
                // [>5 L]
                else
                    this.outx(
                        "When your first enormous load hits her mouth, she splutters, and some leaks out, but Izma refuses to be defeated.  Instead, she grabs you by the hips and, by leaning down and pulling you up, gets your cock down her throat so you can deliver your seed directly.  It looks difficult but feels amazing, and you gladly keep filling her until a look of mild alarm appears on her face.  Her belly is swelling and she needs air.  Finally she pulls back with a gasp and, with a look of admiration, leans back and has you empty the rest onto her breasts, occasionally putting her mouth back on the tip to sample a load.  When you're done, she flops backward into the pool of cum you've created.\n\n",
                        false
                    );
            }
        }
        // (10; resume here for dickless)
        if (!this.player.hasCock())
            this.outx(
                'After a few minutes, she pulls her shrinking cock out of you and gives you a deep kiss. "<i>Thanks for that,</i>" she says, "<i>...my Alpha.</i>"  She jogs off to the river to clean off.  After a minute you follow her, with her cum dripping out of your well-used anus.',
                false
            );
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Vag fuck]
    private followerIzmaTakesItInVagoo(): void {
        this.spriteSelect(32);
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) this.player.slimeFeed();
        this.outx("", true);
        this.outx(
            `Admiring the view of the tigershark's ornamented crotch, you lower the bottoms of your ${
                this.player.armorName
            } and reveal the base of your ${this.multiCockDescriptLight()}, something that instantly draws Izma's eyes.  You ask how she'd like her alpha to tend to her oft-neglected pussy.  Izma smiles eagerly and spreads her legs`
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(", gently lifting her meaty quads up so");
        else this.outx(", gently parting her muscled thighs so");
        this.outx(
            ' you can better see her damp nether-lips.  "<i>Okay lover... if anyone knows how to make me feel good down there, it\'s you.</i>"\n\n',
            false
        );

        this.outx(
            "You give her a lecherous grin back and stalk towards her, watching as she slowly seats herself on her bedroll and lies back for you; one hand playing with her breasts, "
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(
                "the other holding her maleness out of the way, teasing her cock with her thumb and flexing her fingers to roll her four balls around in the palm of her hand."
            );
        else
            this.outx(
                "the other slowly spreading the folds of her vulva, teasing her clit with her thumb and flexing her interior muscles to make the pink opening wink at you."
            );
        this.outx(
            `  You shed your own ${this.player.armorName} and strike a pose for her. Izma watches you closely for a few moments, before growling, "<i>Oh stop toying around and fuck me already!</i>" She gives a gasp and covers her mouth. "<i>O-oh, sorry... I was out of line talking to my Alpha like that!</i>"\n\n`,
            false
        );

        this.outx(
            "Sauntering over, you settle yourself on your elbows and knees before her.  Reaching out with one hand, you start to stroke her pussy, feeling its intense heat and letting her juices squelch and ooze between your fingers.  Casually, nonchalantly, you tell Izma that she was out of line for talking to you like that, and suggest that maybe you shouldn't put anything into her, if that's the mood she's in.\n\n",
            false
        );

        this.outx(
            `Izma moans and writhes slightly as you rub her cunt.  "<i>N-noooo,</i>" she whines, looking at you with puppy-dog eyes.  "<i>Please, I need you...</i>"  You enjoy her struggles for a little while, then give her your wickedest grin.  Well, if that's the way she feels about it...  You surge forward, rising up between her legs until your pelvises are positioned properly.  You position your ${this.cockDescript(
                0
            )} against her labia and then slide it home, enveloping it in her hot, wet depths.  She moans loudly and goes limp, gasping and panting from the pleasure.  The strange tendrils in her cunt waste no time massaging and teasing your cock`
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(", while Izma herself reaches around to jerk herself off.\n\n", false);
        else this.outx(", while Izma herself reaches up to massage her heavy breasts.\n\n");

        this.outx(
            "You wonder for a second if maybe it would be more dominant to stop her from pleasuring herself"
        );
        // RADAR XPACK FORK
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) {
            this.outx(".");
            this.simpleChoices(
                "Let Her",
                this.radarIzmaXPackLetHer,
                "Deny Her",
                this.radarIzmaXpackDenyHer,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
            return;
        }
        this.outx(
            ", but decide it's probably better to let her have some 'hands on involvement'.  Instead, you reach up to caress and fondle her breasts, gently tugging and rubbing her stiff nipples and giving them the occasional soft pinch.  The pretty tigershark responds well to your movements, moaning and gasping from pleasure.  She bites her lip, thankfully with her human teeth"
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(", and gains speed as she jerks her meat pole");
        this.outx(".\n\n", false);

        this.outx("Seeing that she is speeding up, you accelerate your ");
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) this.outx("own ");
        this.outx(
            "thrusts, trying to match her pace.  The tendrils inside her vagina writhe and flex, an experience unlike anything you've had before - you don't think any creature other than a succubus could give you this sort of pleasure!\n\n",
            false
        );

        this.outx(
            `Izma continues to moan and groan loudly, and starts to mash her own hips against yours, trying to work in as many inches of your ${Appearance.cockNoun(
                this.player.cocks[0].cockType
            )} as she can.  `
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(
                "As she jerks off, you can see long streams of pre dribble down her red cock, and know full well she's close to her limit.  Unable to resist, even as you feel that familiar pressure signaling the approach of your own climax, you bend towards Izma's cock and plant a long, wet kiss right on the glans, below the urethra.\n\n",
                false
            );
        else
            this.outx(
                "As she fucks you, you can see long streams of girlish-goo dribbling from her pussy, and you know full well she's close to her limit.  Unable to resist, even as you feel that familiar pressure signaling the approach of your own climax, you bend upward to plant a kiss on one of Izma's hard nipples, immediately switching to a brief, gentle suckle.\n\n"
            );

        this.outx(
            "This sends a shudder through Izma's whole body.  She cries loudly as she orgasms"
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(
                ", a hot jet of spunk going straight into your mouth, and several subsequent shots hitting you in the lips and face.  "
            );
        else
            this.outx(
                ", a small explosion of fem-cum splattering your belly, and several subsequent squirts dripping down your thighs.  "
            );
        this.outx(
            `Her vagina clamps down on your ${this.cockDescript(
                0
            )}, making you grunt as the feelers in her pussy milk you for all you've got. You groan deep in your throat, the scent of Izma's hot `
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 1) this.outx("girl-");
        this.outx(
            "cum filling your nostrils and the feeling of her milking, hungry feelers is too much.  You cum, blasting everything you have deep into Izma's cunt.  ",
            false
        );
        // [(Normal cum production)
        if (this.player.cumQ() < 750)
            this.outx(
                "You pump straight into her womb, enough to make a trickle of your baby batter dribble from her freshly used cunt when you pull out.",
                false
            );
        // (High cum production)
        else
            this.outx(
                "Your load is so vast that it bloats and distends her belly, almost giving her a second orgasm from the sensations.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            'The two of you roll apart, panting and gasping for breath.  "<i>Mmm, that was amazing,</i>" Izma says, giving you a long drawn-out kiss and '
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(
                'licking some of her seed off of your face.  "<i>Come fill me whenever you need to.</i>"  You grin at Izma and order her to eat up every drop.\n\n',
                false
            );
        else
            this.outx(
                'licking you face affectionately.  "<i>Come fill me whenever you need to.</i>"  You grin back at Izma knowingly.\n\n',
                false
            );

        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(
                "She giggles and runs her tongue over the mess she's made; her tongue lingers on your lips for a few moments before she gives you another long kiss and lets you go.",
                false
            );
        else
            this.outx(
                "She giggles and runs her tongue over your lips, her tongue lingering for a few moments before she gives you another long kiss and lets you go.",
                false
            );
        // PREGGO CHANCES
        this.izmaPreg();
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Deny her]
    private radarIzmaXpackDenyHer(): void {
        this.clearOutput();
        this.spriteSelect(32);
        this.outx(
            "Resolving that she needs to understand that your desires will be sated before her own, you quickly seize her by the wrists and forcefully push them past her head, pinning them hard against the ground.  Izma whines pathetically as her efforts to stimulate her cock are utterly denied by her Alpha; her cock twitches hungrily against your stomach as you lay against her prone body. With pleading eyes and without uttering a single word, she begs you to let her tend to her member; her non-verbal cries for sexual mercy are quashed as you plant a forceful kiss on her lips, still pinning her arms against the ground as you thrust in her moist cunt. With a mix of pleasure and frustration, she releases a series of moans into your mouth and resigns herself to you as you passionately dominate her."
        );
        // (leads to Where's it going?)
        this.wheresItGoing(true);
    }

    // RADARS SELF FACIAL
    // [Let her]
    private radarIzmaXPackLetHer(): void {
        this.clearOutput();
        this.spriteSelect(32);
        this.outx(
            "You reach up to caress and fondle her breasts, gently tugging and rubbing her stiff nipples and giving them the occasional soft pinch.  The pretty tigershark responds well to your movements, moaning and gasping from pleasure.  She bites her lip, thankfully with her human teeth, and gains speed as she jerks her meat pole.\n\n",
            false
        );

        this.outx(
            "Seeing that she is speeding up, you accelerate your own thrusts, trying to match her pace.  The tendrils inside her vagina writhe and flex, an experience unlike anything you've had before - you don't think any creature other than a succubus could give you this sort of pleasure!",
            false
        );
        // (leads to Where's it going?)
        this.wheresItGoing();
    }
    private wheresItGoing(denied = false): void {
        this.spriteSelect(32);
        this.outx(
            `\n\nIzma continues to moan and groan loudly, and starts to mash her own hips against yours, trying to work in as many inches of your ${Appearance.cockNoun(
                this.player.cocks[0].cockType
            )} as she can.  As she `
        );
        if (!denied) this.outx("jerks off ");
        else this.outx("moans fiercely ");
        this.outx(
            "you can see long streams of pre dribble down her red cock, and know full well she's close to her limit.  Her cock stands at attention, ready to release its sticky load in your direction."
        );
        this.outx(
            "\n\nIt seems Izma cannot hold out much longer... where will you direct her orgasm?"
        );
        // [Your face]   [Your chest]   [Her face]
        this.simpleChoices(
            "Your Face",
            this.facialWhereItGoesRadarIzmaXpack,
            "Your Chest",
            this.RadarIzmaCumInYourChest,
            "Her Face",
            this.IzmaSelfFacialWheeRadar,
            "",
            undefined,
            "",
            undefined
        );
    }
    // [facial] Scene follows vanilla scripting from Jokester
    private facialWhereItGoesRadarIzmaXpack(): void {
        this.spriteSelect(32);
        this.clearOutput();
        this.outx(
            "This sends a shudder through Izma's whole body.  She cries loudly as she orgasms"
        );
        this.outx(
            ", a hot jet of spunk going straight into your mouth, and several subsequent shots hitting you in the lips and face.  "
        );
        this.outx(
            `Her vagina clamps down on your ${this.cockDescript(
                0
            )}, making you grunt as the feelers in her pussy milk you for all you've got. You groan deep in your throat, the scent of Izma's hot `
        );
        this.outx(
            "cum filling your nostrils and the feeling of her milking, hungry feelers is too much.  You cum, blasting everything you have deep into Izma's cunt.  ",
            false
        );
        // [(Normal cum production)
        if (this.player.cumQ() < 750)
            this.outx(
                "You pump straight into her womb, enough to make a trickle of your baby batter dribble from her freshly used cunt when you pull out.",
                false
            );
        // (High cum production)
        else
            this.outx(
                "Your load is so vast that it bloats and distends her belly, almost giving her a second orgasm from the sensations.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            'The two of you roll apart, panting and gasping for breath.  "<i>Mmm, that was amazing,</i>" Izma says, giving you a long drawn-out kiss and '
        );
        this.outx(
            'licking some of her seed off of your face.  "<i>Come fill me whenever you need to.</i>"  You grin at Izma and order her to eat up every drop.\n\n',
            false
        );

        this.outx(
            "She giggles and runs her tongue over the mess she's made; her tongue lingers on your lips for a few moments before she gives you another long kiss and lets you go.",
            false
        );
        // PREGGO CHANCES
        this.izmaPreg();
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Your chest]
    private RadarIzmaCumInYourChest(): void {
        this.spriteSelect(32);
        this.clearOutput();
        this.outx(
            "Taking a firm hold of her, you angle her lengthy member towards your chest and close your eyes in anticipation for her orgasmic release.  She doesn't disappoint as the smell of sweet, salty sperm rushes into your nostrils, signaling your body to receive her hot cum. Before you can truly relish inhaling your lover's scent, her load slaps forcefully "
        );
        if (this.player.biggestTitSize() >= 1)
            this.outx(`in between your ${this.chestDesc()} and coats `);
        this.outx("against your chest");
        if (this.player.biggestTitSize() < 1) this.outx(", coating it");
        this.outx(
            " liberally.  The aroma of your lover's spunk is too much, and with a great howl of undiminished, fulfilled satisfaction, you thrust one final time and plow deep into her, intent on burying your cock  firmly into her womb, unconsciously giving your seed the fighting chance it needs to fertilize your submissive partner.  With tremendous force, your spunk erupts forth and rushes deep inside of her pussy, "
        );
        // [(Normal cum production)
        if (this.player.cumQ() < 750)
            this.outx(
                "liberally lubricating her fuckhole with steamy cum and causing your beta to cry out in blissful pleasure.",
                false
            );
        // (High cum production)
        else
            this.outx(
                "flooding her love canal with so much sperm that a slew of wet, sloppy noises ring out from her pussy.  Izma's expression betrays a sense of utter disbelief as you stuff her full of your spooge; which begins to flow out of her at a steady rate as each contraction of your dick's muscles fires more and more into her."
            );

        this.outx(
            "\n\nThe feeling of your orgasm finally registering with her, Izma wraps her legs around you and claws her hands along your back, desperately trying to hold you in her arms as you mash your pelvis against her.  Her tail responds along in concert with her orgasmic throes, thrashing wildly under both of you.  Being crammed with your hot load appears to be too much for the poor tigershark, and her eyes roll back in utter content as you "
        );
        // normal cum production:
        if (this.player.cumQ() < 750)
            this.outx(
                "slump against her body, panting from the exhaustive efforts to inseminate her pussy."
            );
        // (if High cum production:
        else
            this.outx(
                "use your cock to manipulate the tide of your jizz in her womb, slamming the copious wet volume against her cervix and forcing it deep into her.  The stream of cum from your swollen dick eventually subsides, allowing the perpetual insertion and seepage of cum to end.  With a satisfied sigh, you pull out of Izma, dragging with it a large strand of sperm and ushering forth the slow drool of lust from her pussy."
            );

        this.outx(
            '\n\nThe two of you roll apart, panting and gasping for breath.  She giggles and runs her tongue over the mess she\'s made; lingering it on [oneCock].  "<i>Mmm, that was amazing,</i>" Izma says, "<i>Come fill me whenever you need to.</i>"  You grin at Izma and order her to eat up every drop.',
            false
        );

        this.outx(
            "\n\nWhen she concludes with cleaning her Alpha, she takes a few moments to show you her appreciation for mating with her, kissing your chest and working her way up to your neck."
        );
        // PREGGO CHANCES
        this.izmaPreg();
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private IzmaSelfFacialWheeRadar(): void {
        this.spriteSelect(32);
        this.clearOutput();
        this.outx(
            "Opting to direct her impending orgasm away from you entirely, you slap Izma's hands away, grabbing her dick and angling it towards her face.  With one last savage thrust, you bore your dick deep into her love canal and unleash a vicious flood of semen into her womb, which causes the tigershark to scream out in her own orgasm.  Fierce ropes of her cum soar out into the open air and speedily land on her blissed out face; some of it lands in her mouth between passionate groans and cries of euphoria."
        );
        this.outx("\n\nYour own seed ");
        // [(Normal cum production)
        if (this.player.cumQ() < 750)
            this.outx(
                "liberally lubricates her fuckhole with steamy cum and causes your luscious beta to cry out in blissful pleasure.",
                false
            );
        // (High cum production)
        else
            this.outx(
                "floods her love canal with so much sperm that a slew of wet, sloppy noises ring out from her pussy.  Izma's expression betrays a sense of utter disbelief as you stuff her full of your spunk, some of which begins to flow out of her at a steady rate, each contraction of your dick's muscles firing more and more into her."
            );
        this.outx(
            '\n\nThe two of you roll apart, panting and gasping for breath.  She giggles and runs her tongue over the mess she\'s made; her tongue lingers on [oneCock].  "<i>Mmm, that was amazing,</i>" Izma says, "<i>Come fill me whenever you need to.</i>"  You grin at Izma and order her to eat up every drop.\n\n',
            false
        );
        this.outx(
            "When she concludes with cleaning her Alpha, she takes a few moments to show you her appreciation for mating with her, kissing your chest and working her way up to your neck."
        );
        // PREGGO CHANCES
        this.izmaPreg();
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [69]
    private followerIzmaTakesIt69(): void {
        this.spriteSelect(32);
        this.player.slimeFeed();
        this.outx("", true);
        this.outx(
            'Izma smiles and nods, swinging her hips from side to side as she makes her way over to you, as if to tease you further. She positions her head at your groin, rubbing her own crotch against your head.  "<i>Alright, let\'s do this,</i>" Izma says happily, and wastes no time ',
            false
        );
        // [(Male/herm)
        if (this.player.hasCock()) {
            this.outx(
                `gorging herself on your ${this.cockDescript(
                    0
                )}, her tongue wrapping around it and caressing it like jewelry`
            );
            // [(if herm)
            if (this.player.hasVagina())
                this.outx(` while pushing two fingers into your ${this.vaginaDescript(0)}`);
        }
        // (Female)
        else if (this.player.hasVagina()) {
            this.outx(
                `licking and eating you out, paying special attention to your ${this.clitDescript()}`
            );
        }
        this.outx(".\n\n", false);

        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(
                "You wrap your lips around Izma's own massive erection, sucking and gagging on her almost-two-foot cock as she jerks and twists her hips around.  Her muffled moans seem to assure you that you're doing a great job, and Izma responds by increasing the speed of her head-bobbing.  Your vision is a little obscured by Izma's quartet of balls repeatedly bumping against your forehead and the bridge of your nose, but if anything this serves to arouse you further.\n\n",
                false
            );
        else
            this.outx(
                "You wrap your lips around Izma's puffy, inhuman lower lips, sucking and swallowing her fragrant fem-juices as she jerks and twists her hips around.  Her muffled moans seem to assure you that you're doing a great job, and Izma responds by increasing the speed of her head-bobbing.  Your vision is a little obscured by Izma's sinuous tail, but if anything this serves to arouse you further.\n\n",
                false
            );

        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(
                "In an effort to further pleasure your tigershark partner, you occasionally reach up to fondle her swollen sack and finger her tight, damp cunt.  Izma gasps sharply and shudders from the pleasure you're giving her.  As if to reward you for your efforts, Izma picks up speed with her sucking, drenching every inch of your ",
                false
            );
        else
            this.outx(
                "In an effort to further pleasure your tigershark partner, you occasionally reach up to caress her orange rump and slide a finger into her tight, damp cunt.  Izma gasps sharply and shudders from the pleasure you're giving her.  As if to reward you for your efforts, Izma picks up speed with her sucking, drenching every inch of your ",
                false
            );
        if (this.player.hasCock()) this.outx(this.cockDescript(0), false);
        else this.outx(this.vaginaDescript(), false);
        this.outx(
            " with her saliva, and as you're so eager for her magic tongue you start thrusting your hips up ",
            false
        );
        if (this.player.hasCock()) this.outx("to reach ");
        else this.outx(`to push your ${this.clitDescript()}`);
        this.outx(" as far into her mouth as you can.\n\n", false);

        if (this.player.hasCock())
            this.outx(
                "Eventually, the two of you manage to bring each other to a powerful simultaneous orgasm, Izma's hot cum shoots down your eager throat, and you ",
                false
            );
        else
            this.outx(
                "Eventually, the two of you manage to bring each other to a powerful simultaneous orgasm, Izma's slippery cum drenching your face, and you "
            );
        if (this.player.hasCock()) {
            this.outx(" fire loads into Izma's cheeks");
            // [(multi)
            if (this.player.totalCocks() > 1) this.outx(" and hair");
            this.outx(".");
            // [(big/mega skeet)
            if (this.player.cumQ() >= 750)
                this.outx(
                    `  You continue to shoot off stroke after stroke long after her mouth has filled up and she's pulled away.  "<i>For the love of Marae, ${this.player.short}, I can't swallow all that!</i>"`
                );
        } else if (this.player.hasVagina()) this.outx("drool a sticky mess over Izma's cheeks.");
        this.outx(
            "  The two of you roll away from each other, and while you catch your breath you're surprised at the strong taste of Izma's cum.  You don't think you'd mind getting another load of that wonderful "
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 1) this.outx("lady-");
        this.outx("spunk in your stomach...\n\n", false);

        this.outx(
            '"<i>Thanks for that...</i>" Izma whispers, stumbling onto her feet and retrieving her clothing.  "<i>Feel free to come back for some more... or maybe we could do something a little more intense next time.</i>"  It\'s a little hard to tell with her skin color, but you can almost see a blush on her face.  You smile at Izma and nod, before heading off to wash up.\n\n',
            false
        );
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Talk]
    private talkWivIzma(): void {
        this.spriteSelect(32);
        this.outx("", true);
        // (option 1)
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00239] == 0) {
            this.outx(
                'You take a seat beside Izma on the rocks, and smile warmly at her.  She returns the smile, though she seems a little flustered and confused by the affection.  "<i>What\'s on your mind?</i>" she asks, focusing on you.  You shrug and ask her to tell a bit about herself.\n\n',
                false
            );

            this.outx(
                '"<i>I... well, it\'s hard to say.  The lake waters have had some effect on my mind.  It\'s why I work so hard to keep my brain cells active through reading.  But I digress... I was born before the demon invasion.  I was a kid living at a lakeside fishing village,</i>" she explains.  She rubs her temple in thought.  "<i>And then... oh, yes, when I was around 7 the village elders started experimenting with magic, allowing the people to become amphibious predators, physically resembling the shark people of today.</i>"\n\n',
                false
            );

            this.outx(
                "\"<i>I must've been in my teens when the full on demon invasion happened. We retreated into the waters to avoid detection and, for a time, things were fine... then something happened when I was 18. A strange purple muck appeared in the waters near where our people had migrated to.  The people closest to it changed the most drastically, leading to the creation of the tigersharks. The fluids gradually spread, polluting my peoples' minds and bodies, turning almost all of them into lust-crazed beasts.</i>\"\n\n",
                false
            );

            this.outx(
                'She heaves a sigh, and you place a hand on her shoulder, bringing a small blush to her face.  "<i>Thanks, but I don\'t mind. Really.</i>"  She gives you a quick kiss. "<i>Thanks for listening.</i>"\n\n',
                false
            );
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00239]++;
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // [Talk option 2]
        else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00239] == 1) {
            this.outx(
                'You take a seat beside Izma on the rocks, and smile warmly at her.  She returns the smile, though she seems a little flustered and confused by the affection.  "<i>What\'s on your mind?</i>" she asks, focusing on you.  You shrug and ask her to talk a bit.\n\n',
                false
            );

            this.outx(
                "You pause for a moment, wondering what topic to discuss, before a question hits you. You ask Izma just what sort of things she typically encounters in the lake; you can only sail over the top of it in your boat, but she spends most of her time swimming under the water.  She must surely know about all kinds of strange creatures that you haven't met so far.\n\n",
                false
            );

            this.outx(
                "Izma purses her lips in thought, recalling memories of her past in the lake.  \"<i>Ah, well, let's see... the most common creatures we see in the lake are anemones.  I dunno much about them... I mean, the things don't talk.  From what I can tell, they're an entire race of herms,</i>\" she explains.  You press her for any other information she might have.\n\n",
                false
            );

            this.outx(
                "She scratches her head in thought.  \"<i>Well, they're kind of... plant-like creatures... I think?  They never seem to go on land.  Unlike my kin, they don't appear hostile, simply amorous.  They've got nasty toxins and poisons they produce naturally that stimulate the genitals while making you feel sluggish and unresponsive.  Ah, sorry I can't be more help - the things are relatively new, and never talk or use diplomacy with us.  Then again, with my kin around, who can blame them?</i>\"\n\n",
                false
            );

            this.outx(
                "You nod your head in understanding, then ask if there are any other strange creatures she's seen in the lake. She thinks hard.  \"<i>Ah... well, there are strange goo creatures in the lake.  No idea where they came from, but I believe they share their origin with the lake's pollution.  From my own encounters, they seem to just be mindless creatures, obsessed with sex and sexual fluids.  They go in and out of water as they please, usually ambushing people.</i>\"\n\n",
                false
            );

            this.outx(
                "Curious, you ask if Izma has any personal encounters with either race.\n\n",
                false
            );

            this.outx(
                'She seems to blush slightly. "<i>Ah... I was with an anemone once.  I just sorta swam across her, the first one I saw, without knowing what she was.  I was kind of horny already, and when she started caressing me... well, let\'s just say I emptied my quad... I ended up beating her down.  Her tentacles wrapped around me, and then instincts took over and, uh, I tried to fight back and dominate her...</i>"\n\n',
                false
            );

            this.outx(
                "You try to picture it in your head... the image is surprisingly arousing. Shaking it away, you ask if there's actually anything normal still in the lake.  She frowns.  \"<i>There are some normal fish, their meat has kind of a weird tang to it, but they're edible.  Sorry, it's a big lake and even I haven't explored everywhere. Who knows what else could be hiding out around there?</i>\"\n\n",
                false
            );

            this.outx(
                "You thank Izma for being willing to talk to you, then you politely excuse yourself and leave her to her thoughts.",
                false
            );
            // (Slight lust gain)
            this.dynStats("lus", 5);
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00239]++;
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // [Talk option 3]
        else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00239] == 2) {
            this.outx(
                "When Izma smiles at you, you notice - and not for the first time - the very impressive, very intimidating array of shark teeth she has in her gums.  You wonder just what it is that Izma usually eats; while you try to tell yourself that Izma would never hurt you, you still can't help some rather dark suspicions that come to mind.  Izma seems to notice your odd behavior and tilts her head to the side as she listens to you.  \"<i>Hm? What's up?</i>\"\n\n",
                false
            );

            this.outx(
                "You start in shock, but then scold yourself mentally; this is a ridiculous way to act.  If it bothers you so much, you think to yourself, then you should just ask her.  Realizing she's still waiting for an answer, you apologize, but tell her that you were curious about what she actually eats.  She shrugs \"<i>Well, in the past I'd just munch down whatever was in the lake.  Small things, ya know,</i>\" she replies.  You can't help but note that reference to 'in the past'. So what precisely does she eat now?\n\n",
                false
            );

            this.outx(
                '"<i>Um... well, whatever food you have in camp, of course.  Or anything that swims upstream,</i>" she replies.  A part of you feels frustrated at Izma\'s evasive answers. Changing tack, you ask if she eats only fish or other kinds of meat as well?\n\n',
                false
            );

            this.outx(
                '"<i>I\'m not really picky.</i>"  She shrugs languorously.  "<i>It\'s just instinct - you catch food, you eat it before something comes along and takes it off you... are you feeling okay?  Why are you asking such weird questions?</i>"  You take a deep breath and let it out slowly; then ask: has she ever eaten a person?\n\n',
                false
            );

            this.outx(
                "\"<i>Depends what you mean by people,</i>\" she replies.  Then her eyes widen as she realizes what she's just said.  \"<i>N-not like that of course!  I'd never eat you or any of your friends or anything!  I wouldn't dream of it!  I only ever ate things like imps and minotaurs!  And they were dead first, I swear!</i>\" You laugh nervously, and thank Izma for not getting mad. The thought of her attacking you on purpose hadn't crossed your mind, but you had been wondering about those teeth and the control she has over them.  That she's actually eaten some of the local races is a surprise, though; you never would have thought she had that kind of attitude.\n\n",
                false
            );

            this.outx(
                '"<i>Ah... I guess we don\'t have a good reputation,</i>" she says, misinterpreting your expression and smiling with tight lips. You give her a quick kiss... on the cheek.  Morbid curiosity forces out the question hanging in the air; just what do they taste like?\n\n',
                false
            );

            this.outx(
                '"<i>Well... minotaurs taste like beef, unsurprisingly, but imps taste like a mile of burnt ass.</i>"  With a laugh, you ask if she\'s ever eaten a goblin - or if she prefers to fuck those and then throw them back?  She blushes.  "<i>They are pretty cute... it\'s hard to eat anything cute.  I could eat them out, though...</i>"  You smile at that and, after teasing her about letting you watch next time, you leave her be.\n\n',
                false
            );
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00239]++;
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // [Talk topic 4.]
        else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00239] == 3) {
            this.outx(
                "You ask Izma if she wouldn't mind answering a personal question.  The pretty tigershark gives you a warm smile in response.  \"<i>What's with the shyness?  I don't think we have anything to hide from each other at this point,</i>\" she teases.  You tell her you're curious about her family; does she remember them at all?  Are they still around - does she have any brothers or sisters? Or maybe she's got a few children she hasn't told you about?\n\n",
                false
            );

            this.outx(
                "\"<i>Well, let's see,</i>\" the tigershark begins, \"<i>my parents are still around, but we don't keep in contact much, since they really gave into their instincts.  And my dad's a tigershark like me now, so it's a little weird to be around... 'him'.</i>\"  At the idea of children she gives a chuckle.  \"<i>Oh no.  I've had many partners, of course, but I always make sure to give 'em birth control.  Having kids is something I want to save for... someone special.</i>\"  She looks at you, smiling warmly.  You return her smile at that last statement, but then the preceding sentence sinks in and you blink in surprise; does that mean that her dad has given birth?  She blushes and stammers, \"<i>N-no... of course not.  At least I... I don't think so.</i>\"\n\n",
                false
            );

            this.outx(
                "You thank her for telling you such personal things.  As you get ready to walk away, though, you stop and turn back to her. She mentioned wanting kids with 'someone special'.  Out of curiosity, you ask what sort of family she wants for herself.\n\n",
                false
            );

            this.outx(
                "\"<i>Guess it depends what giving birth is like,</i>\" she replies, winking.  \"<i>Though I certainly don't plan on being some goblin breeder.</i>\" Whereupon she sticks her tongue out at you.  You laugh, asking if she's saying she's not opposed to being the one to get pregnant.  She cocks her head as if the idea hadn't occurred to her to find anything strange about it.  You clarify that you were asking if Izma objects to having to carry children herself, since "
            );
            if (this.flags[kFLAGS.IZMA_NO_COCK] == 1) this.outx("she used to have a ");
            else this.outx("she's got a ");
            this.outx("perfectly functional set of male genitalia.\n\n", false);

            if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
                this.outx(
                    "\"<i>Oh, nah.  Pfft, as if that's a challenge,</i>\" she says.  It's interesting to see how Izma, as a hermaphrodite, thinks of herself when it comes to the most basic of gender roles.  She scratches her chin in thought.  \"<i>Well, sexually, I'm more accustomed to my penis, since it's a bit easier to dominate with and the lake life seems to fixate on it.  But for you, I'll use whichever you want.</i>\"\n\n",
                    false
                );
            else
                this.outx(
                    '"<i>Oh, nah.  Pfft, as if that\'s a challenge,</i>" she says.  It\'s interesting to see how Izma, as a hermaphrodite, thinks of herself when it comes to the most basic of gender roles.  She scratches her chin in thought.  "<i>Well, sexually, I was always more accustomed to my penis, since it was a bit easier to dominate with and the lake life seemed to fixate on it.  For you though, I\'ll do as you command, my Alpha.</i>"\n\n'
                );
            this.outx(
                "You could just leave it at this, or you could try flirting with Izma - you might get more than you bargained for if you did that, though.  Which will you do?",
                false
            );

            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00239]++;
            // [Leave] [Flirt]
            this.simpleChoices(
                "Flirt",
                this.chooseToFlirtWithIzma,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined,
                "Leave",
                this.chooseNotToFlirtWithIzma
            );
            return;
        }
        // [Talk option 5]
        else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00239] == 4) {
            this.outx(
                "You can't help but notice that Izma has another book nearby.  In fact, she's the most avid reader you can recall meeting - you're not sure if anyone back in your village liked to read like she does, never mind anyone else in this sex-mad world.  It's such a stark contrast to the shark-girls you met before Izma... you wonder why she acts so different.  It can't be the fact she's a herm; she's proven she's just as amorous as they are when she's turned on, and if anything it makes her easier to turn on.  So why is it that she can control herself enough to be civil when her female kinsfolk can't?\n\n",
                false
            );

            this.outx(
                "When you realize Izma is staring at you, waiting patiently, you can't resist asking her why she is so... well, so sedate compared to the other shark-girls.\n\n",
                false
            );

            this.outx(
                "She scratches her chin in thought, \"<i>I... well, honestly I don't know.  I remember that shortly after my change, I was fucking shark girls to take care of my lust... but I was always frustrated 'cause I knew I'd be horny again in a short span of time,</i>\" she explains.  \"<i>But then, as I walked along, I found my trunk.  I'd set it up before, outside my old village, as a place to store my books, a place where I could read in peace... and I just started to carry it around with me when I moved so I could read.</i>\"\n\n",
                false
            );

            this.outx(
                "\"<i>The books just sort of... distracted me from my lust, helped me calm down.  I mean, now I read almost all the time so I can act at least semi-normal around people.  Still, the lust is always present, like a buzzing in my mind and groin,</i>\" she explains.  You tell her that she's certainly much more fortunate; you've seen the other shark-girls, and they don't seem to care about anything besides sex and violence.\n\n",
                false
            );

            this.outx(
                'She blushes bright red and hugs herself close to you.  "<i>You\'re so nice to me, my Alpha...</i>"  You wrap her back, enjoying her tender embrace.'
            );
            if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
                this.outx(
                    "..  and patiently ignoring the fact you can feel her cock starting to stiffen against your thigh."
                );
            this.outx(
                "  You release her, trying to avoid turning her on too much.  Thanking her for the talk, you leave as she buries herself back into her books.",
                false
            );
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00239]++;
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // [Talk Option 6]
        else {
            this.outx(
                "You tell Izma you're curious; you've seen shark-girls before, but you've never seen one quite like her before. Are there a lot other shark herms like her?\n\n",
                false
            );

            this.outx(
                'Izma tilts her head to the side, "<i>Oh, no... all shark herms are called tigersharks,</i>" she says.  "<i>A nickname on account of the stripes... though, from the way some of the locals giggle, I think there\'s an innuendo in the name somewhere.  We\'re a little sub-species among the sharks, a whole group of herms.  The ones who were closest to the chemical bloom when the pollution started underwent a change, just like I did.</i>"  Inquisitively, you ask if the change was in response to them originally being boys and men?  Or was it just a matter of sheer concentrated chemicals and so there were women who grew cocks as well as men who became half-women?\n\n',
                false
            );

            this.outx(
                '"<i>Um...</i>" Izma says, rubbing her temples as she tries to remember exactly what happened.  "<i>When I was there... yeah, there were some men and some women who underwent the change.  We were all shocked but... well, the endowments were certainly pleasing.</i>"\n\n',
                false
            );

            this.outx(
                "So, both genders became herms.  The obvious question fills the space between you.  Was Izma originally a boy?  Or a girl?\n\n",
                false
            );

            this.outx(
                'She gives you a giggle and leans over.  "<i>Why?  Would it bother you either way?</i>"  You swat her on the nose lightly by way of response.  Still, you can\'t resist commenting how odd it is that only those men who were struck directly by the concentrated poisons kept something of their masculinity, with all the others turning completely into girls.  One would have thought it made more sense for the concentrated stuff to fully gender-bend them and the diluted stuff to only partially feminize them, leaving them as herms.\n\n',
                false
            );

            this.outx(
                '"<i>I\'m not all that sure on the nature of the chemicals, but I think they\'re designed expressly to make people into herms,</i>" she replies.  "<i>The more dilute chemicals just affected peoples\' minds and genitalia.</i>"\n\n',
                false
            );

            this.outx(
                "Puzzled, you ask her; then why do herms seem to be so rare?  You haven't seen any hermaphroditic sharks other than Izma herself; all of the other shark people you've met have been girls.  Doesn't that mean that most of the men were turned into shark-girls?\n\n",
                false
            );

            this.outx(
                "Izma bites her lip.  \"<i>The males are mostly... chained up,</i>\" she explains.  \"<i>Nobody's sure why, but, when the taint hit, all the males became not only a lot bigger and stronger, but VERY aggressive, and consumed by a state of constant rut.  They're ultra-fertile, but they're certainly rough when they get going... they make the female sharks you've met look like goblins with tummy-aches.</i>\"\n\n",
                false
            );

            this.outx(
                "You shake your head in disbelief; she sighs and her voice cracks a little as she continues.  \"<i>But... the worst thing is that all of the sharks are so far gone that none of them seem to really know who they're chaining up or who's chaining them... who those people USED to be.</i>\"  She gives a sigh and removes her glasses, wiping at her eyes with the back of her hand.\n\n",
                false
            );

            this.outx(
                "A grim thought takes shape and you ask if Izma and her people are forced to chain up their male children alongside the former men of their village.  \"<i>Shark-men don't seem to occur naturally,</i>\" she replies, \"<i>there hasn't been a boy shark born to a shark-girl or a tigershark ever since we were all transformed.  There are special shark tablets that can make people into shark-men but... well, it's a fate I wouldn't wish on anyone.</i>\"\n\n",
                false
            );

            this.outx(
                "Hesitantly, you ask if tigersharks like Izma can breed - and if they can, is their condition inheritable? Or can they only sire or bear more shark-girls?  She nods.  \"<i>Yeah, we can breed - both in the sense of bearing and siring offspring, and in the sense you're talking about.  We're not ultra-fertile like the shark-men, but we can - and do - get the job done, and we do both father and give birth to more tigersharks.  Honestly, there're more second and third generation tigersharks than there are first generation.  They're born less frequently than the normal girls are, but not exceptionally so - maybe about 4 in 10, not something like 1 in 10 or 1 in 100.</i>\"\n\n",
                false
            );

            this.outx(
                "You thank Izma for talking to you, insisting that you didn't mean to hurt her by probing such painful memories.  She smiles warmly at you and hugs you tight.  \"<i>It's okay. It... it feels nice to be able to share that information with someone,</i>\" she says, giving you a small kiss as she slips her glasses back on.",
                false
            );
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00239] = 0;
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
    }
    // [Leave]
    private chooseNotToFlirtWithIzma(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "You thank Izma for the interesting conversation, even if it did end up meandering a bit, and then walk away, leaving her to her private thoughts.\n\n",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Flirt]
    private chooseToFlirtWithIzma(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "You smile at Izma and tell her you appreciate the offer and that you think she'll be beautiful whether she becomes a mommy or a daddy.  In fact, the mental image of her heavily pregnant, "
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx("her huge cock barely able to poke past her baby-filled belly, ");
        this.outx(
            'her DD-cups full of milk, watching as she waddles around the camp, is a very attractive one.  She smirks at you .  "<i> You\'re such a perv.</i>"'
        );

        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(
                "  But she glances between her legs and sees her massive cock poking out of her skirt."
            );
        else this.outx("  But she glances down to behold her rock-hard nipples jutting out.");

        this.outx('  "<i>Though, you do paint a rather vivid image with words...</i>"\n\n', false);

        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) {
            this.outx(
                'Smiling back, you ask about her mental image of you being pregnant with her babies.  "<i>Um...</i>"  She trails off.',
                false
            );
            // [(If player is male/genderless)
            if (this.player.gender <= 1) {
                this.outx(
                    "  \"<i>That's kinda weird, man... I'm not sure the god in charge of this world would allow something like that.  It seems too silly.</i>\"",
                    false
                );
                this.doNext(this.camp.returnToCampUseOneHour);
                return;
            }
            /// (Female/herm)
            else
                this.outx(
                    '  "<i>Oh... you\'d be so big and curvy, so sexy,</i>" she purrs.  You advance towards her.  Leaning in, you mention you\'re willing to try and make a baby, right here and now.  "<i>I... oh, wow.  We could certainly try,</i>" she replies, grabbing your neck and pulling you in for a kiss.',
                    false
                );
        }
        this.izmaSexMenu();
    }

    // (The four 'Mount' and 'Ride' sex scenes mentioned as appearing once Izma goes off her meds have not been included, and therefore this content cannot be implemented as written. As it stands, I suggest excluding those menus entirely, rerouting players back to the normal sex menu, and adding pregnancy checks to the existing sex scenes where applicable (follower vag sex and Izma mounts, and pre-follower victory vag sex with no herb). Unless they were omitted by accident, or you ask someone to write them, make a placeholder, or copypasta new scenes together from her old scenes -- again. -Z)

    private childToggle(): void {
        this.spriteSelect(32);
        // This scene is only available for one time; once it has been played through, the "Children" button is replaced by the No Kids/Make Kids button, as appropriate/ (This scene could be cut to save a flag, if necessary. Though, you have thousands, don't you? -Z)
        this.outx("", true);
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00248] == 0) {
            this.outx(
                "You ask Izma if she's ever thought about the two of you having children together.\n\n",
                false
            );

            this.outx(
                "Izma looks a little sheepish, but then her expression settles into a determined one.  \"<i>Yes, I have.  I'd like us to start a family, but if you don't think you're ready yet, I'll keep taking my herbs.</i>\"\n\n",
                false
            );

            this.outx("Do you tell her to stop taking her contraceptives?");
            // Yes - call this function again
            this.doYesNo(
                this.childToggle,
                this.firstTimeDeclineIzmasKdiddlezlijfhdjkfhslkfbsjkhfbs
            );
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00248]++;
            return;
        }
        // Turn it off
        else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00249] == 1) {
            // Sex Menu Button: No Kids
            this.outx(
                "You tell Izma that you've been thinking, and that the two of you should put making children together on hold, at least for a while.  Izma looks a little upset, but she nods her head.  \"<i>By your command, alpha,</i>\"  she tells you.  She ambles slowly away from you, her hips and ass swaying side to side in a very enticing manner; you think maybe she's trying to tempt you into changing your mind.  When you don't speak up, though, she reaches into and rummages through her chest for one of her contraceptive herbs, turning towards you and making sure you can see her taking it.\n\n",
                false
            );
            /// Return to Sex Menu options/
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00249] = 0;
        }
        // [=Yes=] (TURN ON KID-MODE
        else {
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00249] = 1;
            // Make kids and has said yes before.
            if (
                this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] +
                    this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] >
                0
            ) {
                this.outx(
                    "You tell Izma that you're ready to start trying for children again.  She grins with delight and suddenly pounces at you, giving you a kiss that leaves you breathless.  Then, while you're recovering from that, she races off and drinks down a slug of that potion - you figure it must be some kind of 'antidote' to the contraceptives already in her system.  From the gleam in her eye as she stalks back towards you, it looks like she intends to start making babies right now...\n\n",
                    false
                );
            } else {
                this.outx(
                    "You give Izma a knowing look and tell her that you're ready to start having children - if she is.\n\n",
                    false
                );

                this.outx(
                    'She stares at you, dumbfounded for a moment, then her eyes light up and she gives you the widest grin, displaying her shark teeth for an extra layer of formidability.  She practically skips over to her chest, flinging it open and all but diving inside, her happily-waving tail giving you an excellent look at her shapely rear.  She emerges with a triumphant cry, a small potion vial in her fingers.  She pops the cork and gulps it down, then crushes the bottle in her hand and spins to face you, a wickedly happy expression on her face as she saunters towards you.  "<i>Well then... let\'s get started, shall we?</i>" she croons.\n\n',
                    false
                );
            }
        }
        this.doNext(this.izmaFollowerMenu);
    }

    // [=No=]
    private firstTimeDeclineIzmasKdiddlezlijfhdjkfhslkfbsjkhfbs(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "You tell Izma, with a shake of your head, that you aren't ready to be a parent yet.  The tigershark looks a little disappointed, but she gives a soft sigh and nods in understanding.  \"<i>You're the boss.  So, what did you want to do?</i>\" she asks.\n\n",
            false
        );
        // Default Izma interaction options are displayed/
        // BACK TO MAIN MENUUUUZ
        this.doNext(this.izmaFollowerMenu);
    }

    // Whenever Izma or the PC gets pregnant, there is a 60% chance that the baby will be a Shark Girl and a 40% chance that it will be a tigershark. Race is calculated when Izma or the PC goes into labor.

    // Izma Gives Birth:  (Luckily you can tuck this one in; since
    // it's magical Izma doing the suffering, I don't give a shit
    // about veracity. She can take care of everything with her
    // OCDNS powers. -Z)
    private IzmaPoopsBabies(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "You hear the sounds of splashing and cursing coming from the part of the stream where Izma, by neccessity, keeps her private mini-camp, and immediately you set off running. When you come tearing to a halt there, you find Izma, wading in the stream well up to her waist, and cursing as she holds her gravid belly, her tail angrily flailing through the water behind her. She still manages to smile when she sees it's you who's come to see her. No words are neccessary; you plunge into the water and head to her side.\n\n",
            false
        );

        this.outx(
            '"<i>Here we go, huh?</i>"  She tries to laugh.  That\'s Izma for you; always trying to be brave.\n\n',
            false
        );

        this.outx(
            "You take a stand behind and slightly beside her. Looking to comfort her however it's possible, you start to massage her taut midriff; you can feel the muscles contracting as they work to expel the baby into the world outside, the child inside wriggling and thrashing like a fish on a hook... all right, bad simile.\n\n",
            false
        );

        this.outx(
            '"<i>Fondle me,</i>" Izma suddenly says.  As you look at her in surprise, she nods vaguely in the direction of her crotch. "<i>Please, start '
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) this.outx("jerking me off or ");
        this.outx(
            'playing with my cunt; we learned it helps with the pain of birth a long time ago.</i>"\n\n',
            false
        );

        this.outx("Nodding your head, you reach around with one hand.  ");
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(
                "Divvying your time between her raging erection, quartet of sizable balls and dilating cunt while she strains under you is an awkward experience, but you persevere; when Izma stops hissing and gasping in pain and starts instead moaning lightly, it seems more worthwhile.\n\n",
                false
            );
        else
            this.outx(
                "Divvying your time between her dilating cunt and engorged clit while she strains under you is an awkward experience, but you persevere.  When Izma stops hissing and gasping in pain and starts instead moaning lightly, it seems more worthwhile.\n\n",
                false
            );

        this.outx(
            "You're not sure how long you are there, working with her, before she lets out a particularly loud gasp and the water is clouded with blood and amniotic fluid.  As the current disperses it, you can see the webbed hands and exploratory head of your daughter protruding from her mother.  It's a shocking sight to see; grisly village midwife stories run through your head.  You manage to smile at Izma with what you think is reassurance, hoping quietly that it won't be long now.\n\n",
            false
        );

        this.outx(
            "Izma then screws her face up, pointing it skywards as she screams from the back of her throat, the sound clawing its way past grit teeth and her stoicism.  At last, the baby's lower torso is pushed free of her and, once loose, instincts kick in.  It swims for the surface, popping up above the water and taking its first breath of real air.\n\n",
            false
        );

        this.outx(
            "Quickly you take hold of its hand, then help Izma take it up into her arms once she's regained her strength.  You are now the proud parents of a baby ",
            false
        );
        if (IzmaScene.rand(100) <= 59) {
            this.outx("shark-girl");
            this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS]++;
        } else {
            this.outx("tigershark");
            this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS]++;
        }
        this.outx(
            ", which nuzzles affectionately against its mother before latching onto her nipple and starting to drink.  As it drinks, it grows; by the time it empties Izma's first breast, it's easily the size of a five year old.  When it's finished its meal and belches loudly in satisfaction, it's the size of a pre-teen.  Izma takes its rapid development in stride, mother and daughter happily embracing each other.\n\n",
            false
        );

        this.outx(
            "You help Izma climb back onto shore with your new baby, then lay them both down to rest.  Once they're settled down comfortably, cuddling up against each other, you turn and head back to camp, looking to dry yourself off and catch a quick nap.",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // PC gives birth (alone): used if PC gets pregnant from vaginal and refusing herbs before recruiting Izma or possibly later if a way to force her out is written
    public pcPopsOutASharkTot(): void {
        this.outx("\n", false);
        // If Izma is NOT a follower
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] != 1) {
            if (this.player.vaginas.length == 0) {
                this.outx(
                    "You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ",
                    false
                );
                this.player.createVagina();
                this.player.genderCheck();
            }
            this.outx(
                "You crumple suddenly; strong pains and pressures pulverize the nerves in your gut.  As your eyes shoot wide open, you look down to see your belly absurdly full and distended.  You can feel movement underneath the skin, and watch as its bulges and shifts reflect another living being moving independently inside you.  Instinctively, you spread your legs as you feel the creature press outward, parting your cervix and allowing a gush of water to spill forth - far more water than you thought you were holding.\n\n",
                false
            );

            this.outx(
                "You cry out as the first wrenching labor pain begins in earnest, unthinkingly hoping for somebody to come and help you.  Much to your despair, no one does, leaving you alone to deliver the baby.  You double your focus, set on pushing in time with its own frantic attempts to escape.  Squeezing over and over, you try to force out the child before the pain robs you of consciousness; luckily it seems to oblige, sliding out of you legs-first after a few more pushes.  The shark-skin rasps your inflamed pussy, drawing gasps of shock from you as she squeezes past your lips in fits and starts.",
                false
            );
            this.player.cuntChange(100, true, true, false);
            this.outx("\n\n", false);

            this.outx(
                `Finally, she's out; you quiver weakly as she crawls over to you and it takes all your effort to lift your ${
                    this.player.armorName
                } and expose your ${this.nippleDescript(
                    0
                )}s to her.  As she sucks greedily at them, the haze begins to clear from your vision.  For the first time, you can actually make out distinct features on your new daughter; she's a `
            );
            if (IzmaScene.rand(100) <= 59) {
                this.outx("shark-girl");
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00412]++;
            } else this.outx("tigershark");
            this.outx(
                ", quickly growing and filling out as she takes in milk.  She finishes up, looking rather like a pre-teen already, and glances around nervously.  The amniotic fluid is evaporating rapidly, and she's scratching idly at her gills as more and more of her skin is exposed directly to the dry air.\n\n",
                false
            );

            this.outx(
                "As she turns scared eyes on you, a spark of understanding lances through the fog of pain.  You look around, getting your bearings within the camp, and then, using a limp arm, point in the direction of the stream.  Her face lights with understanding and gratitude, and she leans forward and places her head over your heart, to listen to it one last time.  You let the arm down, draping it over her, intent on making this one moment of love and affection last as long as possible before she's dumped into the inferno of shark-girl society.  The two of you remain like that for almost five minutes before she gives a small cough.  Lifting your arm gingerly, she kisses you on the cheek and takes off for the vital waterway.\n\n",
                false
            );

            this.outx("After making a quiet wish for your child, you slip into a doze.\n", false);
            // (Take some fucking melancholy. TAKE IT. -Z)
        } else {
            this.spriteSelect(32);
            // Player Gives Birth (Izma in camp): (For the reason given above, this scene currently has a very high chance of being useless, so I wouldn't waste time on it yet. Also, it's a bit of a turd. Orgasm despite the pain of childbirth exists but the clumsy handling here wouldn't convince you even if you'd already seen it live. Oh, the pain is so intense I can't walk... but wait, she's touching my junk over and over in a vague manner so it becomes pretty great. Thank you, Shark Herm Jesus! I advise cutting the 'sexual' content and keeping a normal childbirth unless you want it rewritten from the foundations. But you've got time to decide. -Z)
            this.outx(
                "You wake up suddenly to strong pains and pressures in your gut.  As your eyes shoot wide open, you look down to see your belly absurdly full and distended.  ",
                false
            );
            if (this.player.vaginas.length == 0) {
                this.outx(
                    "You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ",
                    false
                );
                this.player.createVagina();
                this.player.genderCheck();
            }
            this.outx(
                "You can feel movement underneath the skin, and watch as it bulges and shifts as another living being moves independently inside you.  Instinctively, you spread your legs as you feel the creature press outward, parting your cervix and allowing a gush of water to spill forth - far more water than you thought you were holding.\n\n",
                false
            );

            this.outx(
                `You cry out as the first wrenching labor pain begins in earnest, unthinkingly hoping for somebody to come and help you.  To your relief, Izma comes running over to you from out of the gloom.  "<i>${this.player.short}!  You've gone into labor?</i>" she asks; something of a stupid question, but she's evidently as off-guard as you are.\n\n`,
                false
            );

            this.outx(
                '"<i>Do you think you can walk?  Make it to the stream?</i>" she asks.\n\n',
                false
            );

            this.outx(
                "You throw her a dirty look, and make it quite emphatically clear that with how strong these contractions are, you don't think you could stand, never mind walk that way.\n\n",
                false
            );

            this.outx(
                '"<i>Right, sorry.</i>" She has the courtesy to look chagrined, at least.\n\n',
                false
            );

            this.outx(
                `She unhesitatingly steps up and kneels before you, one hand reaching out to stroke your swollen orb of a belly, the other trailing around the edges of your ${this.vaginaDescript(
                    0
                )} in a manner at once sensual and professional. "<i>Don't worry, ${
                    this.player.short
                }; I'm going to help you get through this.</i>" The tigershark promises you.\n\n`,
                false
            );

            this.outx(
                "You point out it's the least she can do, seeing as how she's the one who put this thing in you in the first place, then turn your attention back fully to the task of bringing your offspring into the world.\n\n",
                false
            );

            this.outx(
                `Time slips away; you're too overwhelmed by the pain of your womb contracting and the pleasure as Izma ministers to your ${this.vaginaDescript()}`
            );
            if (this.player.hasCock()) this.outx(` and ${this.multiCockDescriptLight()}`);
            this.outx(
                ", which makes the birth pangs become less painful and more orgasmic. You lose yourself in the haze to the point you're barely aware when the birth finally comes to an end; you feel a great pressure welling up inside you, an overwhelming urge to push, and then, the next thing you know, relief washes over you as your stomach deflates.",
                false
            );
            this.player.cuntChange(100, true, true, false);
            this.outx("\n\n");

            this.outx(
                `"<i>We've got her, ${this.player.short}! Whoa- hold still, you slippery little girl! Stop wriggling so much, you're out now, it's me, your daddy!</i>" Izma cries out. As you regain your strength and your vision clears, you are presented with the sight of Izma trying desperately to wrangle a squirming baby shark-morph; from her `
            );
            let type = 0;
            if (IzmaScene.rand(100) <= 59) {
                this.outx("grey");
                type = 0;
                this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS]++;
            } else {
                this.outx("black-striped orange");
                type = 1;
                this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS]++;
            }
            this.outx(" skin, it's obvious she's a baby ");
            if (type == 0) this.outx("shark-girl");
            else this.outx("tigershark");
            this.outx(
                '. Finally, she calms down in her "<i>daddy\'s</i>" arms, looking around with surprising aclarity for a newborn. She sees you and holds her arms out, making strange babbling noises; she has no teeth at all, from what you can see. Izma walks over to you, smiling proudly, and lets you hold your new baby girl, who nuzzles against you and then immediately turns her attention towards your milky breasts.\n\n',
                false
            );

            this.outx(
                `She latches onto the ${this.nippleDescript(
                    0
                )} and starts to suckle for all she's worth, waves of pleasure both sexual and maternal filling you, overwhelming you with bliss. Oblivious to everything else, you hold her against your breast, allowing her to sate her incredible appetite. She drinks your breast dry, and then immediately latches onto the next one.`
            );
            if (this.player.breastRows.length > 1)
                this.outx(
                    "  She then starts on your third breast, and while she slows down at the fourth breast, she still finishes it off.",
                    false
                );
            // (If player has six breasts:
            if (this.player.breastRows.length > 2)
                this.outx(
                    "  She seems to almost be struggling to finish off your third pair, but she manages to suck all six of your breasts dry.",
                    false
                );
            this.outx(
                "  Once she is done, she lets go with a wet popping sound, then starts to gasp for breath before letting out a surprisingly loud, deep belch for such a little thing.\n\n",
                false
            );

            this.outx(
                "...Okay, maybe not so little. Before, she was the size of a human baby. Now, you're holding a fairly grown young ",
                false
            );
            if (type == 0) this.outx("shark-girl");
            else this.outx("tigershark");
            this.outx(
                '; physically, you\'d have to say she was anywhere from ten to thirteen years old. She grins at you, displaying both rows of teeth, and then kisses you on the lips. "<i>Mama.</i>" She states, clearly and contendly, then visibly relaxes, nuzzling into your arms and closing her eyes, clearly intent on drifting off to sleep.\n\n',
                false
            );

            this.outx(
                "You look up at the tigershark who fathered her for support, but she just smiles and flops down beside you as well. With a soft sigh, you simply lay back and enjoy your strange new family being there with you. When you wake in the morning, Izma will have taken your daughter to stay at the stream with her; it's important for young shark-folk to be moist, constantly.\n",
                false
            );
            this.player.orgasm();
            this.dynStats("lib", 1, "sen", 1);
        }
        this.player.boostLactation(0.01);
    }

    // Children Interaction Sequences: (increment childcounters only for births after Izma joins)
    // Children
    private izmaKidsPlaytime(): void {
        this.spriteSelect(32);
        this.outx("", true);
        const choices: any[] = [];
        // Build an array of the possible scenes
        if (this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] > 0) {
            // NEITHER GOOD
            // choices[choices.length] = 1;
            // choices[choices.length] = 2;
        }
        if (
            this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] +
                this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] >=
            2
        )
            choices[choices.length] = 3;
        // if(flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00251] > 1) choices[choices.length] = 6;
        choices[choices.length] = 4;
        choices[choices.length] = 5;
        // Select correct scene!
        const choice: number = choices[IzmaScene.rand(choices.length)];
        if (
            this.model.time.hours < 10 &&
            this.flags[kFLAGS.ANEMONE_KID] > 0 &&
            IzmaScene.rand(2) == 0
        ) {
            this.anemoneScene.kidAWatchesSharks();
            return;
        }

        this.outx(
            "Izma shows you to an isolated bend in the stream; this is where your children have chosen to settle themselves.  Though they have the physiques and minds of pre-teens already, it will still be several years before they are fully grown and ready to leave you and Izma.  ",
            false
        );
        if (
            this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] +
                this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] ==
            1
        )
            this.outx("There is ");
        else this.outx("There are ");
        if (this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] > 0) {
            if (this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] == 1) this.outx("one shark-girl");
            else
                this.outx(
                    `${IzmaScene.num2Text(this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS])} shark-girls`
                );
            if (this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] > 0) this.outx(" and ");
        }
        if (this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] > 0) {
            if (this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] == 1) this.outx("one tigershark");
            else
                this.outx(
                    `${IzmaScene.num2Text(
                        this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS]
                    )} tigersharks`
                );
        }
        this.outx(" living here; the fruits of your love with Izma.\n\n", false);
        // The above is the default scene, that plays whenever the player selects the "Children" option when interacting with Izma./
        this.doNext(this.camp.returnToCampUseOneHour);

        // #1 (Requires 1 Tigershark:
        // NOPE
        if (choice == 1) {
            if (this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] == 1)
                this.outx(
                    "Your lone tigershark daughter is off by herself, experimentally stroking and fondling her already-impressive cock.  It doesn't look like it'll be long before she cums; her face is already screwed up in an expression of curious pleasure, gasping softly at the sensations.",
                    false
                );
            // (Requires 2-3 Tigersharks:
            else if (
                this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] < 4 &&
                this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] > 0
            )
                this.outx(
                    "Your tigershark daughters are seated together, each experimentally stroking and fondling her sizable erection.  It looks like they're competing to see who will cum first.",
                    false
                );
            // (Requires 4+ Tigersharks:
            else if (this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] > 0)
                this.outx(
                    "Your tigershark daughters are seated together, each experimentally jerking off either her own cock or one of her sisters.  Some look to be competing to see who can jerk themselves off first, others are evidently seeing who's better at handjobs.",
                    false
                );
            if (this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] > 0)
                this.outx(
                    "  Izma blushes and explains that your children have strong libidos, so it's natural for them to experiment like this.  She assures you that they won't do any real sexual penetration with a family member.\n\n",
                    false
                );
        }
        // #2: (Requires at least 1 Tigershark)
        // NOPE
        else if (choice == 2) {
            this.outx(
                "You see your daughter has caught a goblin who managed to find her way to this nook.  It doesn't look like either of them mind, though; she's roughly but eagerly stuffing herself into the squealing green-skinned slut's pussy, much to the goblin's pleasure.  She sees you and gives you a lewd wink.  \"<i>You've got a fine-ass daughter here; don't worry, I'll give you plenty of grandkids,</i>\" she jeers, then gives a lusty moan as your daughter finally reaches her limit and cums inside her, bloating the goblin's belly with spunk.",
                false
            );
            // Other children:
            if (
                this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] +
                    this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] >
                2
            )
                this.outx(
                    '  Your other kids are gathered around, watching with amusement and a little envy as one of your tigershark offspring plows an excited goblin.  "<i>Oh, yeah, baby, now you folks know how to live!</i>" she cheers.',
                    false
                );
            if (this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] > 2)
                this.outx(
                    "  \"<i>Don't worry; you'll get a chance to use a beautiful big cock on me, too - just wait your turn!</i>\" she laughs looking around the circle.  Your other daughters look like they can't wait.",
                    false
                );
            this.outx(
                '\n\nYou look at Izma, who gives you a shrug, obviously indifferent.  "<i>Kids gotta be allowed to make their own mistakes sometimes.  I read that somewhere.</i>"\n\n',
                false
            );
        }
        // #3: (Requires at least 2 children)
        // YUS
        if (choice == 3) {
            this.outx(
                "Your daughters are all asleep, huddled together in a wet pile near the lake. They snore softly, occasionally stretching limbs or waving tails, only to fall still and snuggle up close to their siblings together. Izma looks at them with pride. \"<i>They know that they're family, and that's saying something, in this world the demons have given us.</i>\"  She indicates you should let them sleep, and you nod, quietly heading back to camp and leaving your children to rest.\n\n",
                false
            );
        }
        // #4:
        // YUS
        if (choice == 4) {
            this.outx(
                "As you look around, a sudden violent splashing erupts from the lake.  You ready yourself to fight, but it turns out to be ",
                false
            );
            if (
                this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] +
                    this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] ==
                1
            )
                this.outx("your daughter");
            else this.outx("one of your daughters");
            this.outx(
                ", who is evidently struggling with something. She finally manages to hurl herself onto the shore and, with a flurry of curses that have you looking at your sheepish tigershark lover, she hauls something up onto the bank with her. It turns out to be a huge catfish, nearly as long as she is tall, and she looks at you, baring her shark teeth in the fiercest, proudest grin.",
                false
            );
            if (
                this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] +
                    this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] ==
                1
            )
                this.outx(
                    "  She immediately goes to sink her fangs into the still-flopping creature's skull, but Izma coughs pointedly.  Looking chastened, your daughter sits on a nearby rock and waits for the catch to die and be still, then carefully pulls off the sharp fins before dining.",
                    false
                );
            else {
                if (
                    this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] +
                        this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] ==
                    2
                )
                    this.outx(
                        "  Your other child runs up to her, which makes the triumphant fisher snarl a warning to stay back. It's obeyed, with some resistance, until the fish expires and stops thrashing. Only after the proprietor inspects it, pulls off the fins, and takes the choicest morsels for herself, does she share in the eating of the remaining still-raw fish; the girls snapping and shoving at each other to do so in a way that looks more violent than it actually is.",
                        false
                    );
                else
                    this.outx(
                        "  Your other children run to surround her, which makes the triumphant fisher snarl a warning to stay back. It's obeyed, with some resistance, until the fish expires and stops thrashing. Only after the proprietor inspects it, pulls off the fins, and takes the choicest morsels for herself does she share in eating of the remaining still-raw fish; the girls snapping and shoving at each other to do so in a way that looks more violent than it actually is.",
                        false
                    );
            }
        }
        // #5:
        // YUS
        if (choice == 5) {
            this.outx("Your ");
            if (
                this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] +
                    this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] ==
                1
            )
                this.outx(
                    "child perks up to see Izma and comes running over to her, throwing herself into her arms",
                    false
                );
            else
                this.outx(
                    "children perk up to see Izma and come running over to her, throwing themselves into her arms",
                    false
                );
            this.outx(
                ".  She laughs in delight and sits down on the bank, reaching for a book she has in a bag at her side.  Your offspring ",
                false
            );
            if (
                this.flags[kFLAGS.IZMA_CHILDREN_TIGERSHARKS] +
                    this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS] ==
                1
            )
                this.outx(
                    "cries out in joy at the prospect of storytime and eagerly seats herself in front of her, listening as she starts to read.",
                    false
                );
            else
                this.outx(
                    "cry out in joy at the prospect of storytime and eagerly seat themselves in front of her, listening as she starts to read.",
                    false
                );
            this.outx(
                "  You remain there for a while, listening, but eventually you think of your duties as champion and you have to take your leave of them.",
                false
            );
        }
        // #6: (Requires 2+ shark-girls)
        // NOPE
        if (choice == 6) {
            this.outx(
                "You see that two of your shark-girls are hugging each other in a way that, at first glance, seems familial.  As you get closer, though, you can see it's somewhat less than sisterly; each is groping the other's breasts, experimentally playing with her sibling's boobs to see what makes her gasp and moan in pleasure.  Their faces are pressed together in a very unchaste kiss.  Izma blushes and hastily explains that your children have strong libidos, so it's natural for them to experiment like this.  She assures you that they won't do anything really sexual with each other - and, even if they did, it's not like anything can come of a little harmless girl-on-girl, right?",
                false
            );
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private inCampRideIzmasDickDongTheWitchIsDead(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx("You direct a flushed look at Izma and rub your ");
        if (this.player.wetness() > 3) this.outx("dripping ");
        this.outx(
            "fuckhole meaningfully, telling her to lie down and let you give her fifteen inches and four balls a run.\n\n",
            false
        );

        this.outx(
            `Izma gives a happy squeal in response, before blushing and clearing her throat.  "<i>Ah ha... of course, my Alpha,</i>" she replies curtly.  She lies down on the ground and her giant dong stands straight to attention, waiting for your ${this.vaginaDescript()}.\n\n`,
            false
        );

        this.outx(
            `Slowly and sensuously you remove your ${
                this.player.armorName
            }, exulting in the way Izma hungrily drinks in every inch of exposed ${this.player.skinFurScales()}.  Her eyes devour your ${this.allBreastsDescript()}, then slide eagerly down to your crotch to feast upon`
        );
        if (this.player.hasCock()) {
            this.outx(` ${this.sMultiCockDesc()}`);
            if (this.player.balls > 0) this.outx(` and ${this.ballsDescript()}`);
            this.outx(" before going to the main attraction:");
        }
        this.outx(
            ` your pussy.  You sashay over to the prone tigershark, your ${this.hipDescript()} swaying in a fashion that has her hypnotised.  By the time you reach her, her cock is visibly bubbling pre from the slit and drooling it down onto her four swollen balls, which sit in a steadily-growing puddle of feminine juices. Smiling hungrily, you gently stroke her long, crimson-hued cock, playfully asking what such a little girl is doing with such a big, hard thing.\n\n`,
            false
        );

        this.outx(
            'Izma pants and giggles in response, licking her lips at the little show you\'re putting on for her.  "<i>Big?  Me?  Haha...</i>"  She gasps and moans as you rub at her head.  "<i>There are much bigger fish in those lake waters...</i>" she pants, winking at you.  You don\'t know if she\'s joking or not.\n\n',
            false
        );

        this.outx(
            "You purse your lips thoughtfully, and feign entertaining the idea that maybe you should throw this small fry back... then you shake your head and grin.  No, you declare, this is plenty big enough for you.\n\n",
            false
        );

        this.outx(
            '"<i>Oh, thank you... I feel like I\'ll go crazy if I have to wait much longer,</i>" Izma purrs, placing her hands behind her head and thrusting her chest out at you to entice you.\n\n',
            false
        );

        this.outx(
            "You smile and bend over, hungrily kissing and suckling at her impressive breasts, squeezing them firmly to squeals of delight from the tigershark.",
            false
        );
        if (this.player.hasCock()) {
            this.outx(
                `  Your ${Appearance.cockNoun(
                    this.player.cocks[0].cockType
                )} rubs against her shaft, sending delicious sparks surging through you.`
            );
        }
        this.outx(
            `  Tiring of the foreplay, you slither up her body and position yourself over her, slipping down onto her shark-sausage just enough that the head is poking teasingly into your ${this.vaginaDescript(
                0
            )}, but not enough to really penetrate you.`
        );
        if (this.player.wetness() >= 5)
            this.outx(
                "  Not that this stops your nether-lips from drooling your lubricant all over Izma's crotch.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            "Izma seems to tense beneath you, her breath caught in her throat from anticipation.  She bites her lip as she awaits for you to slide onto her cock, but she doesn't dare move without your permission.\n\n",
            false
        );

        this.outx("Finally deciding that ");
        if (this.player.cor < 66) this.outx("you've teased her enough");
        else this.outx("you've delayed your pleasure long enough");
        this.outx(", you sink down onto her, stifling a yelp as she fills your depths.");

        // (Tight/Virgin vagina)
        if (this.player.vaginalCapacity() < 20 || this.player.vaginas[0].virgin)
            this.outx(
                "  Holy shit, that hurts like a motherfucker! It's as if you're trying to stuff a baguette into your vag!",
                false
            );
        // (Loose)
        else if (this.player.vaginalCapacity() < 50)
            this.outx(
                "  You groan and shudder slightly as you slide down the generous 15 inches of dick, the slight pain being drowned out by the sensation of being filled as full as you could possibly hold.",
                false
            );
        // (Gaping)
        else
            this.outx(
                "  You shudder and lick your lips. Izma may be big but you've had bigger, and you fit her cock like a glove.",
                false
            );
        this.player.cuntChange(30, true, true, false);
        this.outx(
            "  Once you have made it to the very base of Izma's cock you pause for a moment to help yourself adjust, then, clenching your vaginal muscles, you start to rock back and forth; your body is sliding up and then slamming down, picking up speed and force as you continue to thrust.  Your hands reach out to maul Izma's tits",
            false
        );
        if (this.player.hasCock()) {
            this.outx(", your erect cock");
            if (this.player.cockTotal() > 1) this.outx("s");
            this.outx(" bouncing against her belly with audible slaps");
        }
        this.outx(".\n\n", false);

        this.outx(
            "Izma moans and shivers beneath you, giving a few growls as well as you continue to molest her tits. She grins and starts to rotate her hips in a clockwise fashion to try and please you further.  Your mouth hangs open with delight, and you breathily order her to pick up the pace, riding with renewed vigor to exert your dominance over the tigershark under you.\n\n",
            false
        );

        this.outx(
            "Izma's cock twitches and she places her hands on your hips.  \"<i>Ah... I'm gonna...</i>\"  She grunts and bites her lip, trying to hang onto the moment.\n\n",
            false
        );

        this.outx(
            "You laugh in delight, complimenting Izma on what a good beta she is; the alpha gets to cum first, after all.  ",
            false
        );
        if (this.player.cor < 33)
            this.outx(
                "Feeling merciful, you tell her that you're almost there... just a little more.  ",
                false
            );
        this.outx(
            "Finally, the orgasm that's been hanging just out of reach, tantalizing you, flows free and you cry out in pleasure as femcum ",
            false
        );
        if (this.player.wetness() < 4) this.outx("spatters");
        else if (this.player.wetness() < 5) this.outx("gushes");
        else this.outx("fountains");
        this.outx(" onto the tigershark under you");
        if (this.player.hasCock()) {
            this.outx(`; ${this.sMultiCockDesc()} spraying all over her belly, breasts and face`);
        }
        this.outx(
            `.  Izma, feeling the twitching of your ${this.vaginaDescript(
                0
            )}, finally gives a loud roar as she climaxes inside you, filling your womb up with sharky spunk to the point where it makes your stomach bloat out from the sheer volume of her deposit.\n\n`,
            false
        );

        this.outx(
            "You sit there on top of Izma for a few minutes, basking in the afterglow, feeling her still semi-hard phallus inside you, patting your cum-inflated belly with one hand.  You compliment Izma on her load... then, giving a wicked grin, you playfully wonder aloud why she's still so hard inside you.  Is she really still horny?  Well, you're a good alpha, so you'll keep going until you've milked her dry...\n\n",
            false
        );

        this.outx(
            'Izma moans weakly from beneath you, trying hard to keep her eyes open.  "<i>If, ah... if that\'s what you want.</i>"\n\n',
            false
        );

        this.outx(
            "You simply give her your wickedest grin, already starting to get into the rhythm of rising and falling...\n\n",
            false
        );
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.outx("<b>Some time later...</b>\n", false);
        this.outx(
            "Finally, you are tired and sexually sated enough that you tell Izma you're fulfilled. The tigershark merely groans and you have to help her get into the stream to restore her strength. Still, seven orgasms in only an hour is pretty impressive, and you give her a pat on her shapely derierre before you leave, calling over her shoulder that you'll be back again sometime.\n\n",
            false
        );

        this.outx(
            "Izma waves at you and smirks as you go to leave, and you have to wonder if Izma was only acting helpless in order to get off...",
            false
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00249] > 0) {
            this.player.knockUp(PregnancyStore.PREGNANCY_IZMA, PregnancyStore.INCUBATION_IZMA);
        }
        this.player.slimeFeed();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Using Izma's books in camp]
    /// [Books] appears as a tab when interacting with Izma.
    private IzmaCampBooks(): void {
        this.spriteSelect(32);
        this.outx("", true);
        if (this.flags[kFLAGS.IZMA_TIME_TILL_NEW_BOOK_AVAILABLE] > 0) {
            this.tooSoonExecutus();
            return;
        }
        // outx("Izma starts to lazily fish through her trunk for her reading material while she waits on you.  She looks up and says, \"<i>Oh, I was just organizing my library.</i>\"  You ask her if she'd like some company.  \"<i>Oh, that would be lovely... would you like to read something?</i>\"\n\n", false);

        this.outx(
            'You tell Izma you feel like doing some reading and she starts to lazily fish through her trunk for her reading material.  She looks up and says, "<i>I\'ll need to organize this later... So, what would you like to read with me?</i>"\n\n',
            false
        );
        // [C.Manual] [E.Guide] [Porn]
        this.simpleChoices(
            "C.Manual",
            this.campCuntManual,
            "E.Guide",
            this.entropyGuideByStephenHawking,
            "Porn",
            this.stephenHawkingPorn,
            "",
            undefined,
            "Back",
            this.izmaFollowerMenu
        );
    }

    // [C.Manual]
    private campCuntManual(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "You ask Izma if she'd like to read one of the many issues of the 'Combat Manual' with you.  She gives a snigger and grabs a random issue. \"<i>Of course.  But I honestly never thought someone as good as you would need any more tips in combat,</i>\" she teases, getting comfy on a rock.  You sit beside her to read, and retort that, if anything, you're using the chance to give her combat tips.  Izma shoots you a half-hearted dirty look in response, but you think she knows you're teasing her.\n\n",
            false
        );
        this.flags[kFLAGS.IZMA_TIME_TILL_NEW_BOOK_AVAILABLE] = 11;
        // (Usual random stat increase from the combat Manual)
        // (One of the following random effects happens)
        const choice: number = IzmaScene.rand(3);
        if (choice == 0) {
            this.outx("You learn a few new guarding stances that seem rather promising.");
            // (+2 Toughness)
            this.dynStats("tou", 2);
        } else if (choice == 1) {
            this.outx(
                "After a quick skim you reach the end of the book. You don't learn any new fighting moves, but the refresher on the overall mechanics and flow of combat and strategy helped.",
                false
            );
            // (+2 Intelligence)
            this.dynStats("int", 2);
        } else {
            this.outx(
                "Your read-through of the manual has given you insight into how to put more of your weight behind your strikes without leaving yourself open.  Very useful.",
                false
            );
            // (+2 Strength)
            this.dynStats("str", 2);
        }
        this.outx(
            `\n\nAfter about an hour you yawn and stretch, telling Izma that you're going off to do other business.  She nods lazily at your words but doesn't look up from her old book. "<i>Sure thing ${this.player.short}, I'm just gonna read this for a little while longer,</i>" Izma says.  You nod at her, before moving off.`,
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [E.Guide]
    private entropyGuideByStephenHawking(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "You point to Izma's many copies of the 'Etiquette Guide' series and ask her if she'd like to read one of those. Izma shrugs in response and picks up one issue.  \"<i>Yeah, I suppose.  You certainly need to learn how to be mannerly,</i>\" she teases, opening up on the table of contents.  You lightly consider whether that makes her a hypocrite before giving it up and starting to read with her.  That way lies madness.\n\n",
            false
        );
        this.flags[kFLAGS.IZMA_TIME_TILL_NEW_BOOK_AVAILABLE] = 11;
        // (Usual random stat increase from the E.Guide)
        this.outx(
            "You peruse the strange book in an attempt to refine your manners, though you're almost offended by the stereotypes depicted within.  Still, the book has some good ideas on how to maintain chastity and decorum in the face of lewd advances.\n\n",
            false
        );
        // (-2 Libido, -2 Corruption)
        this.dynStats("lib", -2, "cor", -2);

        this.outx(
            `As time passes you realize that you do have other things to do.  You thank Izma for her company and get up to leave.  "<i>All right, thanks for sitting with me ${this.player.short}.  You go on ahead, I'm just going to read some more of this,</i>" she replies, not even looking up from the pages of her book.\n\n`,
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Porn]
    private stephenHawkingPorn(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            'A wicked smirk crosses your face and you point to the small bundle of porn that Izma has in her trunk. Izma looks nervous and pulls out one stack of the illustrations. "<i>Ah-hah... really?</i>" she asks, her face a rictus of embarrassment.  You nod in response and sit down on a rock, gesturing for Izma to join you.  She has some color on her face, though whether it be more or less than usual you can\'t decide, not knowing enough about her biology yet, and she sits down and starts to examine the porn with you, bumping your legs with hers as she adjusts her posture '
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx("continuously to keep the beast in her skirt pinned down.\n\n", false);
        else this.outx("nervously in an effort to keep from moistening it.\n\n", false);
        this.flags[kFLAGS.IZMA_TIME_TILL_NEW_BOOK_AVAILABLE] = 11;
        this.outx(
            "By the time you're done reading, Izma certainly seems turned on.  She tries to hide it and sit primly - "
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0)
            this.outx(
                "but that's not exactly possible for someone who just had over a foot of dick slip from between her thighs and stick into the air.  You laugh openly and give Izma's silver hair a soft tug, before getting up and telling her you have business elsewhere.  Izma simply nods in taciturn response but keeps her gaze fixed on the lewd images before her.  Another laugh escapes your lips as soon as you think you're out of earshot.",
                false
            );
        else
            this.outx(
                "but that's not exactly possible for someone who keeps squirming, creating lewd squishes from below the waist.  You laugh openly and give Izma's silver hair a soft tug, before getting up and telling her you have business elsewhere.  Izma simply nods in taciturn response but keeps her gaze fixed on the lewd images before her.  Another laugh escapes your lips as soon as you think you're out of earshot.",
                false
            );
        this.dynStats("lib", 1, "lus", 5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // (Trying to use another book inside the span of 6 hours)
    private tooSoonExecutus(): void {
        this.spriteSelect(32);
        this.outx("", true);
        this.outx(
            "You tell Izma that you want to read a book with her again, and she gives you a petulant look.  \"<i>Really?   I mean, I love books, but even I get tired of them.  I was about to go do something else after cleaning up a bit.  We-ell... I don't feel like reading any more right now, but... if you were to pay me our usual arrangement I could let you borrow one for a while.  You know I trust you, but books do wear out even with the best of care, and there are a few new ones I'd like to get.</i>\"  Do you pay Izma to lend you a book?",
            false
        );

        // (re-direct to pre-follower book scenes)
        this.simpleChoices(
            "C.Manual",
            this.readSharkCuntManual,
            "E.Guide",
            this.sharkEdgingGuideLOL,
            "Porn",
            this.sharkgirlPronz,
            "",
            undefined,
            "Back",
            this.izmaFollowerMenu
        );
    }

    // (Req: Vagina. Player has dominated Izma pre-camp, refused birth control.
    // Izma now in camp.)
    public findLostIzmaKids(): void {
        this.outx("", true);
        this.outx(
            "While rowing the boat across the lake you spy a shark fin heading your way.  Worried it might damage the small boat, you hastily row back to shore, jumping out of the boat.  The shark shows no signs of slowing, and the fin disappears just before coming ashore.  A grey blur bursts from the water and lands on the ground a few feet away from you.\n\n",
            false
        );
        this.outx(
            "It's a young woman – a peculiarly corrupted woman, with shiny grey skin, silver hair, and a fin positioned between her shoulder blades.  She is much smaller and thinner than the average shark-girl.  She's wearing some rather revealing black swimwear.  The girl looks up at you and grins widely, showing rows of knife-like teeth.  \"<i>Wanna play? Heads up though, I...</i>\" Her grin wavers, and silence hangs in the air for a few moments.\n\n",
            false
        );
        this.outx('"<i>...Mom?</i>"', false);
        // (Next)
        this.doNext(this.findLostIzmaKidsII);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00412]--;
    }
    private findLostIzmaKidsII(): void {
        this.outx("", true);
        this.outx(
            'You embrace your daughter, both of you half-laughing half-crying into each other\'s shoulders.  After a few moments of this, you pull away a little and blurt out a few urgent questions about her well-being and mental health.  She in turn inquires about you and her "father."\n\n',
            false
        );
        this.outx(
            "This sparks off a happy chain of thoughts in your mind, and you inform your wayward daughter that Izma is now living with you (and there's room for another).  She squeaks happily at the news, and tells you that she'll meet you at camp.  She pecks you on the cheek, then runs into the shallows and disappears.  You walk away, beaming at the thought of seeing a new face in camp.",
            false
        );
        // (+1 Izma children.)
        this.flags[kFLAGS.IZMA_CHILDREN_SHARKGIRLS]++;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Ask Izma About Removing Her Dick
    private removeIzmasPenis(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.ASKED_IZMA_ABOUT_WANG_REMOVAL] == 0) {
            this.outx(
                'You ask Izma if she wouldn\'t mind getting rid of her dick for you, her Alpha.  She recoils at the mention, a haughty look on her angular visage.  "<i>Tch, why would I want to get rid of my pride and joy?  My dick feels so good... I would never want to lose it,</i>" Izma answers with a hint of rebellion.'
            );
            this.outx(
                "\n\nShe isn't happy with the idea, but if you want, you could assert yourself as an Alpha to overcome it."
            );
            this.flags[kFLAGS.ASKED_IZMA_ABOUT_WANG_REMOVAL] = 1;
            this.menu();
            this.addButton(0, "Okay", this.izmaFollowerMenu);
            this.addButton(1, "Force Her", this.forceIzmaPenis);
            return;
        } else {
            this.outx(
                "You bring up the idea of removing her dick again, and Izma just sighs \"<i>Why?  Why can't you just... be happy with me like I am?  I don't want to be just another shark-girl!</i>\""
            );
            this.outx(
                "\n\nGrabbing her quickly, you pull her into your arms and quietly assert, \"<i>You're my beta, and you'll be whatever I want you to be.  Trust me, I'll make it every bit as good as before, if not better.</i>\""
            );
            this.outx(
                "\n\nIzma gives a little snort and says, \"<i>Whatever... just... either do it, or don't.  I don't want to keep talking about it.  Do you have five succubi milks or not?</i>\""
            );
        }
        // COUNT MILK TOTAL
        let succMilk = 0;
        let pMilk = 0;
        let count = 5;
        while (count > 0) {
            if (this.player.hasItem(this.consumables.SUCMILK, count)) {
                succMilk = count;
                break;
            }
            count--;
        }
        count = 5;
        while (count > 0) {
            if (this.player.hasItem(this.consumables.P_S_MLK, count)) {
                pMilk = count;
                break;
            }
            count--;
        }
        if (succMilk + pMilk < 5) {
            this.outx(
                "\n\nNow, if you can find enough succubi milk, you can get rid of that troublesome member."
            );
            this.doNext(this.izmaFollowerMenu);
        } else {
            this.outx(
                "\n\nYou have enough succubi milk already. <b>Do you want to get rid of Izma's penis?</b>"
            );
            this.simpleChoices(
                "Remove Dick",
                this.izmaDickToggle,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined,
                "Back",
                this.izmaFollowerMenu
            );
        }
    }

    private forceIzmaPenis(): void {
        this.clearOutput();
        this.outx(
            'Izma takes a half step back when you glide forward, penetrating her personal space with the effortless authority of one who has repeatedly demonstrated it.  You look your Beta in the eye and remind her EXACTLY how the shark people do it.  The strong rule.  The strong give the orders.  The weak MUST obey the strong, and Izma... she is weak.  She casts her eyes down, away from your imperious gaze, and she stammers, "<i>Yes... yes, my Alpha,</i>" in a suitably chastised manner.'
        );
        this.outx(
            "\n\nWith your power unquestioned, you again bring up the question of removing her dick, and what the best way to go about it would be.  Izma pouts, but willingly answers, \"<i>Well, ever since we mutated, most transformation items will make us very ill.  Somehow, that change seems to fight almost any other.  I'd guess it has something to do with the demonic taint.  If ANYTHING would work on a tigershark like me, it would be the demonic items.  You might have to use a lot of them, though. Marethians aren't as susceptible to change as off-worlders like you.</i>\""
        );
        this.outx(
            '\n\nYou consider before asking if five bottles of Succubi milk would be enough to remove her dick.  Izma adjusts her spectacles and sighs, "<i>Well... probably, but I don\'t want to!  Life is so much more fun with a dick!</i>"'
        );
        this.outx(
            "\n\nYou make a quick, horizontal gesture with your hand flat, cutting off her whining.  You're in charge.  She isn't."
        );
        // COUNT MILK TOTAL
        let succMilk = 0;
        let pMilk = 0;
        let count = 5;
        while (count > 0) {
            if (this.player.hasItem(this.consumables.SUCMILK, count)) {
                succMilk = count;
                break;
            }
            count--;
        }
        count = 5;
        while (count > 0) {
            if (this.player.hasItem(this.consumables.P_S_MLK, count)) {
                pMilk = count;
                break;
            }
            count--;
        }
        if (succMilk + pMilk < 5) {
            this.outx(
                "\n\nNow, if you can find enough succubi milk, you can get rid of that troublesome member."
            );
            this.doNext(this.izmaFollowerMenu);
        } else {
            this.outx(
                "\n\nYou have enough succubi milk already. <b>Do you want to get rid of Izma's penis?</b>"
            );
            this.simpleChoices(
                "Remove Dick",
                this.izmaDickToggle,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined,
                "Back",
                this.izmaFollowerMenu
            );
        }
    }

    // Administer Izma's Treatment:
    private izmaDickToggle(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) {
            this.outx(
                'With a flourish, you produce five bottles of creamy demonic milk, the glass tinkling merrily in the breeze.  Izma frowns, but steps out of her skirt, grumping, "<i>If I have to lose it, I\'d at least want to be able to say goodbye.</i>"  As the grass-skirt squishes into a pile on the ground, you hand the first bottle to Izma.  She makes a face, but pops the cork nonetheless. Her throat bobs as she chucks down the liquid, the bottle quickly emptying.'
            );
            this.outx(
                '\n\n"<i>Ahhh,</i>" Izma says with a satisfied tone before catching herself.  Did she enjoy the taste? The tigershark-girl shivers and starts to ask, "<i>Is it hot out...?  Oh... it\'s just me, isn\'t it?</i>"'
            );
            this.outx(
                "\n\nYou nod and quietly note a trickle of moisture running down the girl's reddish-orange thigh, speeding toward the ground.  The next bottle doesn't garner the protest the first did; if anything, Izma seems eager to take it from you.  In an instant, the cork is off and the bottle is docked with her lips.  Izma drinks deep and fast, finishing the milk far more quickly than the previous dose.  She tosses the bottle over her shoulder and moans sensuously, her hands cupping her breasts as inches of length vanish down below.  Tiny dribbles of white leak from the diminishing member, matched by runners of clear fluid from beneath her ball-swollen sack."
            );
            this.outx(
                "\n\nWhen she calms down, you realize Izma is sweating heavily.  You hold out the remaining bottles, and she snatches one from your grip.  The shark-girl growls, \"<i>You never said it tasted this good!</i>\" and chugs.  She finishes it in seconds, immediately snatching the next dose from you.  Her cock is shrinking, her nipples are tightening, and she's cumming weak ropes of spunk into the dirt, but it doesn't slow her consumption at all.  If anything, Izma seems even more driven to the drinks.  The fourth bottle disappears in seconds, and Izma is visibly shaking all over, as if locked in orgasm."
            );
            this.outx(
                "\n\nThe empty glass shatters on the ground from your Beta's nerveless fingertips as she collapses and begins to gently writhe.  Her penis is barely four inches long by now, a tiny, pathetic thing, only fit to dribble white all over her contracting nutsack in a display of ultimate submission.  Clear girl-goo spatters across her thighs as Izma mauls her tits in a frenzy, her jiggling breast-flesh seeming a little larger than before the change.  She's panting, \"<i>hnnggg... more... more... finish it... please.</i>\""
            );
            this.outx(
                "\n\nGently, you cradle Izma's head in your hand and pour the last batch of transformative liquid down her mouth.  She swallows, visibly trembling, and as soon as she finishes, she cries, \"<i>FUUUUCK YEEEEEESSS!</i>\"   Her penis withdraws up into her along with her balls and scrotum.  For the first time, you're given a perfect, clear view of her puffy cunt and hard clit.  An explosive burst of fem-cum splatters you from [foot] to face as she cums powerfully.  You sigh and wipe your face off."
            );
            this.outx(
                "\n\nJuices keep exploding out in waves, a massive puddle of girl-goo widening beneath the curvy female now that her transformation has completed. She babbles incoherently through it, the huge masses of her tits bouncing through each body-wracking orgasmic wave.  Her nipples seem a little bigger, and as you watch, her clit plumps up, perhaps doubling in size, though still well below an inch long.  She doesn't come down for a few minutes, and when she does, she blacks out."
            );
            this.outx(
                "\n\nYou carry her to the stream to keep her moist, tending to her for a half-hour before she wakens.  When her eyes open, Izma says, \"<i>Tch, that wasn't too bad.  Maybe I can get used to it, if that's what it's like for 'pure' women.</i>\"  Izma's tail wags back and forth mischievously, splashing up a storm as she suggests, \"<i>Just let me know if I'm ever allowed my penis again, okay?</i>\"  You sigh and agree.  <b>Izma is a female!</b>"
            );
            this.flags[kFLAGS.IZMA_NO_COCK] = 1;
            let count = 0;
            while (this.player.hasItem(this.consumables.P_S_MLK) && count < 5) {
                this.player.consumeItem(this.consumables.P_S_MLK);
                count++;
            }
            while (this.player.hasItem(this.consumables.SUCMILK) && count < 5) {
                this.player.consumeItem(this.consumables.SUCMILK);
                count++;
                this.dynStats("cor", 3);
            }
        } else {
            // Re-Herm Izma:
            this.outx(
                'You flash Izma a smile and tell her she can regrow her penis.  She cheers so violently that her glasses nearly go flying, "<i>Hell yes!</i>"  The black-striped girl digs into her trunk and pulls out a strange tablet, popping it into her mouth before you can change your mind.  She chews vigorously, finishing it in seconds.  Izma cups her drooling snatch and moans, her palms slowly pushed away from her body by a red, masculine member.  It grows larger by the second, soon surpassing six inches, then eight, then ten, and not stopping until it\'s as big as it used to be.  A second later, a spherical protrusion falls down, filling out a new-grown flap of skin.  Plop!  Another joins it.  Finally, two more orbs fall from her body into her new ballsack.  <b>Izma is a herm again!</b>'
            );
            this.flags[kFLAGS.IZMA_NO_COCK] = 0;
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Fuck her pussy-Dominant]
    private fuckIzmasPussyDominate(): void {
        this.clearOutput();
        this.spriteSelect(32);
        let x: number = this.player.cockThatFits(65);
        if (x < 0) x = 0;
        const y: number = x + 1;
        this.outx("Fixating on Izma's ");
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) this.outx("cock ");
        else this.outx("cunt ");
        this.outx(
            "like a moth to an open flame, you saunter over towards her, sporting a ridiculous grin as thoughts of impaling yourself in her tight pussy takes hold of your mind, driving you into a frenzied lust.  With her skirt now thrown indifferently to the ground, her bare sex"
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) this.outx("es");
        this.outx(" now stand");
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 1) this.outx("s");
        this.outx(" exposed to the cool air, drooling ");
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) this.outx("their sexual lubricants");
        else this.outx("its sexual lubricant");
        this.outx(
            ' in eager presentiment.  "<i>So, [name], how does my Alpha want to fuck me today?</i>"  Izma coos, attempting to bewitch you with the enticement of dominance over her; something that right now, is pitching a huge tent in your pants.  "<i>You read my mind, lover,</i>" you reply back, narrowing in on her moist clit as [eachCock] bobs with the need to fuck that love button of hers.  The tree trunk behind Izma catches your eye; the thought of slumping Izma over it and making her beg to be bred triggers a rush of giddiness throughout your body as you decide this is how you\'ll dominate Izma.'
        );

        this.outx(
            "\n\nRaising your voice in an authoritative manner, you command Izma to give you her undivided focus; something the shark-morph acknowledges almost immediately as she snaps to attention.  Gesturing at the stump, you order Izma to walk over to it and await further instructions from her Alpha.  The busty "
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 1) this.outx("shark-girl");
        else this.outx("hermaphrodite");
        this.outx(
            ' turns and shoots a flirty smile at you, her demeanor suggesting that she may know what you want as she obeys your orders, stopping at the stump and waiting for you to show her what you have in mind.  Izma cocks her head ever-so-slightly, turning it so you can see her lips move as she speaks.  "<i>So... is this where you tell me to lie down on the stump?</i>"  Izma asks, "<i>Where you take me with y-</i>" Izma doesn\'t get to finish her sentence as you '
        );

        // (If Izma is not pregnant:
        if (this.pregnancy.event <= 1)
            this.outx(
                `shove her forcefully down onto the withered stump.  She lands stomach first and lets out a loud "<i>unf</i>" as the stub of wood cushions her impact.  It only takes her a brief moment to recover her senses, but that's more than enough time to grab her tail and move it out of the way, giving you the angle to penetrate her pussy with your [cock ${y}].`
            );
        // (If Izma is has one in the oven:
        else
            this.outx(
                `forcefully lower her down to the stump, careful to not injure your unborn child in the process.  With slutty abandon, the tigershark lifts her tail, giving you a good angle to penetrate her slathering wet pussy with your [cock ${y}].`
            );

        this.outx(
            "\n\nThe tigershark gazes over her shoulder at you, waiting with bated breath for you to dominate her vagina with your spear.  "
        );
        // Leg check
        // (If Naga or Spider morph legs are present:
        if (this.player.isNaga() || this.player.isTaur() || this.player.isGoo())
            this.outx(
                "With her tail now against your shoulder blade and jutting up in the air, your path to her fuckhole is now clear.  "
            );
        // (If human or Harpy legs are present:
        else
            this.outx(
                "Lifting your right leg over her rump, you give yourself the superior position needed to ravage her cunt.  "
            );
        // (if Single cocked (multicocked x2, suitable size(s) to fuck Izma, if possible)):
        this.outx(
            `With a hearty roar, you plunge ruthlessly into Izma's love canal, giving the feelers inside of her pussy little time to brace for impact as you savagely brush them aside.  The brutal straining of her pussy causes Izma to yell out in pained shock at the sudden intrusion in her pussy.  "<i>A little too rough for you?  I thought that's how shark-girls liked it,</i>" you say to Izma, taunting her as she wriggles weakly under you.  Grabbing at her shoulders, you brace yourself against her body, readying your pelvis to mash against her rump.  Drawing out of her slowly, you allow her the opportunity to adapt to your ${this.cockDescript(
                x
            )}; something the feelers in her cunt appreciate as she moans approvingly.`
        );
        this.outx(
            '\n\nYou start out slowly, giving her just enough time to adjust to you before you pick up the pace, increasing in tempo as you slap your [if (hasBalls = true) [balls]|thighs] off of her ass cheeks.  The sounds of your passion create a crescendo of erotic harmony that rings out across the camp; your lover providing the "vocals" to your musical symphony of lust as she moans, gasps and pants in utter bliss.  Before long, you are pulverizing her rump with your thighs, driving your cock well into her humid cunt and causing Izma\'s body to jig back and forth along the stump.'
        );

        // (If PC has Tentacle dick long that 48 inches:
        if (
            this.player.tentacleCocks() > 1 ||
            (this.player.tentacleCocks() == 1 &&
                this.player.cocks[x].cockType != CockTypesEnum.TENTACLE)
        )
            this.outx(
                '\n\nCutting her vocal debut as an orgasmic opera singer short, you thrust your tentacle prick along Izma\'s body, abruptly and effectively muffling her as you deftly ram your dick down her craw.  The curtain may have come down on her short lived "singing" career, but she now has a more important purpose; siphoning your cum out of your [if (hasBalls = true) [balls]|obscenely long and flexible cock].'
            );

        // (If PC has goo body:
        if (this.player.isGoo() && this.flags[kFLAGS.IZMA_NO_COCK] == 0) {
            this.outx(
                "\n\nSpicing up the act, you decide to slide a bit of your goopy body into Izma's asshole, and with a little concentration and focus, being to shape the solidity of your slime until you form a makeshift dildo, customly shaped for her tight little asshole. She moans as her ass is filled with the increasingly hardened mass of your body.  Looking down at your shark morph, you notice her cock is unattended; something that looks rather sad as it depressingly juts against the trunk of the stump you are breeding Izma on."
            );
            this.outx("Will you tend to her dick?");
            // [Goo job]    [Leave it, leads to [Spanking scene])
            this.simpleChoices(
                "Goo Job",
                this.gooJob,
                "Leave It",
                this.radarIzmaSpanking,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
        }
        this.outx("\n\n");
        this.radarIzmaGasm();
    }

    // [Goo Job]
    private gooJob(): void {
        this.clearOutput();
        this.outx(
            "Concentrating on moving your mass forward, you manage to envelop Izma's entire back side.  Slowly but surely, you are able to harden your goo around Izma's rock hard cock, and begin to pump her penile member with gusto. Now that she's been jerked off, and the fact that she's "
        );
        this.radarIzmaSpanking(false);
        this.player.createStatusAffect(StatusAffects.Goojob, 0, 0, 0, 0);
    }
    // [Spanking and orgasm]
    private radarIzmaSpanking(newSentence = true): void {
        if (newSentence) {
            this.clearOutput();
            this.outx("Now ");
        }
        this.outx("being subjected to double penetration and powerful bucks, ");
        this.radarIzmaGasm();
    }
    private radarIzmaGasm(): void {
        this.outx(
            "Izma loses herself in the moment, clawing and grasping at the trunk as she releases a passionate series of wails.  Grunting your approval, you give her luscious ass a hard slap, the thunderous thwack of palm against rump drowning out her cries of content euphoria.  Soon you feel your orgasm coming, but you don't want to cum until you hear Izma beg for your seed."
        );
        this.outx(
            '\n\n"<i>Come on, bitch, beg for me to cum!</i>" you yell out.  Izma struggles valiantly to find the words to express her need to be filled with your cream, but all she can do is utter a mix of moans and incoherent gibberish.  Bringing your gyrations to a dead stop, you growl and grunt your disapproval to Izma as she turns and stares at you in utter horror and disbelief that you would stop so close to orgasming.  "<i>I said beg!</i>" you repeat demandingly to your hard-of-hearing beta.  "<i>I-I want you!  Cum in me, please!</i>" the terrified shark-morph quickly stammers out.  Not exactly what you had in mind unfortunately.  "<i>You\'re getting warm,</i>" you coo, picking up your gyrations at a reduced speed in an attempt to guide her to what you really want to hear from her.  "<i>Fuck me!  Stuff me with your s-seed!  R-ravage my pussy!</i>" Izma replies, raising her voice louder than before.  So close, you think to yourself as you speed up your thrusting.  "<i>COME ON!  LET EVERYONE KNOW YOU WANT ME TO BREED YOU!  AS LOUD AS YOU CAN!</i>" you scream.  Izma shudders under you as you bellow out your command, gritting her teeth as she takes in a very deep, erratic breath.'
        );
        this.outx(
            '\n\n"<i>CUM IN ME! BREED ME, KNOCK ME UP, I WANT IT ALL!</i>" she howls out at long last.  "<i>Good girl!  Keep it up!</i>" you enthusiastically yell out, giving her all the encouragement she\'ll ever need as you ferociously fuck her cunt.  "<i>TAKE ME, mmpffh-DOMINATE MEE-IIAAHH!  CUM IN M-AHHH-MY PUSSY!</i>" she manages to scream out in-between almost non-stop moaning.  With ferocity you never thought possible, the feelers in her tight pussy whip along your dick furiously, driving you over the point of no return as you feel your release surging through your loins.  With a savage shout, you scream the arrival of your orgasm to anyone in the immediate area, '
        );
        // (Cum production normal:
        if (this.player.cumQ() <= 750)
            this.outx(
                "shooting your hot load into Izma's fuckhole, enveloping the walls of her pussy with your seed."
            );
        // (Cum production High:
        else
            this.outx(
                "unleashing a cascade of steamy jizz into Izma's well fucked hole.  Your volume is so large that it causes a back draft of semen to rush out of her within mere seconds."
            );
        // (If PC gave Izma a "goo job":
        if (this.player.findStatusAffect(StatusAffects.Goojob) >= 0) {
            this.player.removeStatusAffect(StatusAffects.Goojob);
            this.outx(
                "  The sensation of being injected with her lover's seed is all the encouragement Izma's cock needs to finally erupt, shooting thick streams of steamy cum into your central mass; something your gooey form appreciates as it unconsciously works her load into your see through gut."
            );
        }
        this.outx("\n\nYour exhausted partner swoons as she cradles her ");
        if (this.player.cumQ() > 750) this.outx("bloated ");
        this.outx("belly, clamping her legs shut in ");
        if (this.player.cumQ() <= 750) this.outx("a ");
        else this.outx("an ultimately ");
        this.outx(
            "vain attempt to contain all of your baby batter inside of her.  With a final sigh, you pull loose from her and dart past her shoulder for a sensual kiss on the lips.  Izma weakly kisses back, stopping after a few moments to whisper to you, \"<i>Gods... that was... something else.  I didn't think I could... cum that hard.</i>\"  With a small giggle, you tell Izma that your Beta will always cum hard if she fulfills her Alpha's desires, and that she should clean herself up.  Moaning in appreciation, she mutters something about maybe pleasuring her"
        );
        if (this.flags[kFLAGS.IZMA_NO_COCK] == 0) this.outx(" cock");
        else this.outx("self");
        this.outx(
            " down at the river... but judging by how tired she looks, you doubt that will happen anytime soon."
        );
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.izmaPreg();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Anal (dominant)]
    private radarIzmaAnalDominant(): void {
        this.clearOutput();
        this.outx(
            "With a wicked smile stretched across your face, you order Izma to accompany you to a nearby tree trunk on the edge of camp, away from the prying eyes of any strangers.  Without a single moment's hesitation, Izma complies with her Alpha's command, swaying her wide hips sensually as she walks; her engorged, drooling cock rocks back and forth between her skirt like a snake through grass.  At least she's got the right idea; you will be playing with her prick, but probably not in the way she expects."
        );
        this.outx(
            '\n\nFinally arriving at the trunk of the large tree, you order Izma to remove her skimpy little skirt and let her member hang proudly for her Alpha to see.  Your tigershark beta grins devilishly as she yanks herself free of her insignificant dressing, her sizable cock flopping upwards as she does as if to physically shake free of some invisible shackles that were restraining it.  Unable to contain yourself, you grin like an idiot and stroke your chin, admiring her body\'s eagerness to pleasure her lover.  "<i>I know you like what you see [name], just give the word and your beta will fuck you any way you want,</i>" she teases, placing emphasis on "any way" as she raises her eyebrows.  '
        );
        if (this.player.hasVagina()) this.outx("Your [clit] flushes with");
        else if (this.player.hasCock()) this.outx("[EachCock] bobs in");
        else this.outx("You flush with");
        this.outx(
            ` aroused intrigue at her words, flooding you with the need to take that thick, perverse dick inside of you.  With little more than a quick twist, you place your arms out against the stump and stick your ${this.buttDescript()} out towards your lover, moving your hips with just enough force to gently sway your hips like an unsuspecting mouse to Izma's "python".  Faster than you can raise a hand to beckon her over, Izma darts in and closes the distance in a flash, taking your [butt] against her pre-cum soaked member as she hangs it close to you, barely containing her lust as she whispers in your ear, "<i>So... where do you want me, Alpha?  Do I get to be in charge today?</i>" she asks.`
        );

        this.outx(
            `\n\nLooking back over your shoulder, you tell her that she... won't be dominant; in fact, she won't even lay a hand on you.  Izma's passionate, eager expression turns to one of confusion at your words; something you rectify by taking hold of her lengthy dick and caressing it with your ${this.assholeDescript()}, allowing the head of her cock to be roughed around from tip to belly in the contours of your ${this.assholeDescript()} and ${this.buttDescript()}.  The callous treatment of her dick surges through Izma, sending a visible shiver through her as her member electrifies her body with sexual pleasure.  You remark to Izma how cute she looks from this angle, in a manner that denotes your playful yet condescending control over her; all the tigershark can do is blush fiercely as she whimpers, in what seems to be both a need for better intimacy and sensual overload.  With an almost mean spirited disregard for her need to warm up first, you begin to force her freakishly large member inside of your ${this.assholeDescript()}, `
        );
        // (if Virgin to Tight:
        if (this.player.analCapacity() < 35)
            this.outx(
                "painfully rending the tight shape of your anus on it, causing both of you to moan in pain as you envelop more and more of her dick inside of you.  Izma slams into you forcefully as she unleashes a huge gasp, face utterly flooded with ecstasy as she stares into the sky behind closed eyes."
            );
        // (If loose to gaping:
        else
            this.outx(
                `slipping past the fleshy "gates" of your anus, requiring little stretching or working of your ${this.assholeDescript()}.  You're worried that this might not work the way you want it to, given how easy it was to take Izma; a series of wild, erratic thrashings against your ass as the penile intruder tunnels deeper seems to dispel that notion.`
            );
        this.player.buttChange(42, true, true, false);

        this.outx(
            "\n\nWith a cool, yet skittish breath of air, you tell Izma that you will be working her cock with your ass "
        );
        if (this.player.isGoo()) this.outx("and goo");
        this.outx(
            '; she will not touch you, she will not pull away, and she will remain standing like a good girl.  Pausing briefly to work the muscles in your anus along her shaft and "torment" her, you conclude your instructions by telling her that she\'ll be rewarded if she holds out long enough.  Before Izma can even utter a syllable, you grind your hot innards along the tigershark\'s rock hard cock; something that seems to drive the poor woman over the edge.  With an almost malevolent smirk, you comment to Izma that perhaps she doesn\'t want her reward if she\'s going to cum so early, and that she would be better off being stuck with her hand for a couple days.  "<i>NOOoooghhhhoo,</i>" the tormented beta replies shakily, "<i>NOOooooghhaahhooo.</i>"  Giggling in contentment at her submission, you tell her to hold on and keep her seed bottled up until you tell her to, lowering a hand down to your '
        );
        if (this.player.hasVagina()) this.outx(this.clitDescript());
        else if (this.player.hasCock()) this.outx(this.cockDescript(0));
        else this.outx("violated anus");
        this.outx(" to masturbate as you do so.");

        this.outx(
            '\n\nDespite Izma\'s near orgasmic scare, she soldiers on through your brutal and "agonizing" stimulation of her giant red dick'
        );
        if (this.player.isGoo())
            this.outx(
                "; taking her firm ass into your slippery body's grip, you begin to force Izma to gyrate against you, driving the shark-morph mad with pleasure"
            );
        this.outx(".  Your pumping of your ");
        if (this.player.hasVagina()) this.outx(this.clitDescript());
        else if (this.player.hasCock()) this.outx(this.cockDescript(0));
        else this.outx("anus");
        this.outx(
            ` increases in ferocity as you slam your ${this.buttDescript()} against her lap, her quadrate of testicles slapping against your `
        );

        // (if PC is fingering their pussy:
        if (this.player.hasVagina())
            this.outx(`feverish hands as you fingerfuck your ${this.vaginaDescript()}.`);
        // (If PC has balls:
        else if (this.player.balls > 0)
            this.outx("swinging [balls] with each gyration of your hips.");
        // (If PC is genderless:
        else this.outx('thighs, thoroughly "tenderizing" them with every thunderous impact.');

        this.outx(
            "\n\nIzma's breathing becomes very erratic, and her knees begin to buckle underneath her.  You stare on in amusement as she tries to prop herself up with her hands, placing them on her thighs to support her weight... but it's an inevitably doomed move.  \"<i>I... I... I CAN'T... AHHGH!... GON... MMHMPH... GONNA CUM!</i>\"  She shrieks, unable to hold on any longer as you approach release as well.  With no holding back, you yell out for Izma to take you against her body, to fill her Alpha with seed... the latter you barely manage to blurt out before a euphoric, savage howl of intensely fulfilled pleasure rings out from above you.  Obeying her Alpha's command to the letter, she holds you tightly against her as she bottoms out inside of you, spasming and moaning violently as she thoroughly creams your sphincter with her creamy, sticky semen."
        );

        if (this.player.gender > 0) {
            this.outx(
                "\n\nWith just enough time for her to finish flooding you with jizz, you pull yourself off of her and hurriedly order her to the ground, "
            );
            // (If PC has vagina:
            if (this.player.hasVagina())
                this.outx(
                    `intent on burying your ${this.clitDescript()} in her face and having her finish you off.  Izma tries her best to pleasure you, but she's still too wracked with bliss to be any help... still, you manage to find stimulation by grinding yourself against her spaced-out face, eventually orgasming and drenching her face in your lady fluids as she weakly strokes the remaining cum out of her cock.`
                );
            // (If PC has cock(s):
            else if (this.player.hasCock())
                this.outx(
                    `stroking furiously along your ${this.cockDescript(
                        0
                    )} to bring an explosive end to this passionate act.  Izma is still off in another world of orgasmic fulfillment to note the impending facial coming her way.  It takes her a few moments to register it, but she coos lovingly as the scent of semen hits her nostrils, finally realizing that you have blown your steamy load all over her face.`
                );
            // (genitalia end:
            this.outx(
                `  Falling back on your ${this.buttDescript()}, you breathe a sigh of relief, both thanking and lamenting the fact that your orgasms have reached fruition.  Despite still being able to get up and walk around, Izma is another story.`
            );

            this.outx(
                "\n\nYou could carry her back to her bedding and tuck her in... or you could just let her sleep it off."
            );

            // [Tuck in]   [Leave her]
            this.simpleChoices(
                "Tuck In",
                this.radarIzmaAnalDomResultTuckIn,
                "Stay",
                this.radarIzmaLeaveHerInTheDirtAfterAnalDom,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
        } else {
            // (If PC is genderless, ending:
            this.outx(
                "\n\nContent, you slide to the ground to the right of the trunk you propped yourself up against, going prone as your tigershark lover lands softly on top of you.  Neither of you have the energy to get up, but you won't let some random passerby see this and think you are the bitch in this relationship.  With her still inside of you, you roll both yourself and Izma onto your sides, allowing her to stay inside of you as you drift off to sleep. Her arms trace over you and embrace you appreciatively as you surrender yourself to slumber."
            );

            this.outx(
                "\n\nA half hour passes before you wake up; Izma peacefully snoozing away as she holds you in a lover's embrace.  Faintly, you pull yourself from her grasp and place your [armor] back on.  As you finish placing the last piece of your gear back on, Izma wakes and rises to her feet, planting a tender kiss on her Alpha's neck as she sees you off.  Before you go though, Izma quietly asks, \"<i>So... where's my gift?</i>\", smirking as you turn around to respond to her.  With a firm slap on your ass, you tell her that going all the way with her Alpha was the gift.  Sheepishly grinning, she sees you off as you head out to tend to other matters."
            );
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        this.player.orgasm();
        this.dynStats("sen", 2);
    }
    // [Tuck in]
    private radarIzmaAnalDomResultTuckIn(): void {
        this.clearOutput();
        // (not enough strength:
        if (this.player.str < 70) {
            this.outx(
                'Despite your good intentions, you can\'t lift Izma off the ground for long before needing to set her back down.  Imza quietly remarks that you should just let her rest; causing you to tell her not to talk back.  Alternating between dragging her through the grass and "carrying" her over some rocks, '
            );
            if (this.player.fatigue < 70) {
                this.outx(
                    "you eventually get her back to her bedroll.  She smiles sheepishly as you lay her on the bedding to sleep off your passionate throes.  She's comfortable, but the effort is exhausting."
                );
                this.dynStats("cor", -2);
                this.fatigue(30);
            } else
                this.outx(
                    "you try and get her to her bedroll, but you are simply too exhausted.  Izma tells you not to worry about her and go get some rest; that she'll be okay in the grass.  You groggily agree as you set her down, telling her she better be ready for more sex if you want it; something she approves of as she hums and drifts off to sleep."
                );
        } else {
            this.outx(
                'With a great show of force, you take Izma under the legs and back, lifting her off the ground and starting toward her bedroll. In little time flat, you reach her bedding and lie her down gently. As you turn, you remark to Izma that she better rest up; you\'ll likely have another "itch" that will need scratching.  Her raspy words ring out behind you as you begin to walk away; "<i>Promise?</i>"  Turning your head slightly to catch her in your left eye, you grin mischievously at the shark-morph and continue on your way.'
            );
            this.dynStats("cor", -2);
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Leave her]
    private radarIzmaLeaveHerInTheDirtAfterAnalDom(): void {
        this.clearOutput();
        this.outx(
            "Laughing, you tell Izma that she needs to work on her stamina, and that she'll have to recuperate out here in the grass.  She weakly acknowledges your choice, telling you that it's the right thing to do with worn out betas.  You stop and forcefully tell her that she did well; just that she needs to work on her endurance.  With a shaky nod, she smiles and drifts off to sleep.  To ensure she remains safe, you keep watch nearby as she naps peacefully.  Thankfully, she wakes after a half hour and saunters seductively past you, thanking her Alpha for fucking her and watching over her as she heads off to the lake to clean up."
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Fuck Izma's ass (Dominant)]
    private radarFucksIzmasAss(): void {
        this.clearOutput();
        let x: number = this.player.cockThatFits(65);
        if (x < 0) x = 0;
        const y: number = this.player.cockThatFits2(65);

        this.outx(
            `Your eyes are unavoidably drawn to her well toned ass; the potential feel of her tight asshole against your ${this.cockDescript(
                x
            )} is one you cannot pass up now.  Placing an authoritative hand on your beta's shoulder, you physically command her to get down on the ground... something the tigershark does all too willingly, flopping down to the ground on her stomach and waving her tail in your face; almost as if to taunt you and jokingly convey that "<i>you can't have this.</i>"  Her intent on what she wants you to do clear, you forcefully reach out and grab that smugly shaking tail of hers and pull hard, dragging her prone body along the ground to the base of your feet as you yank her crescent shaped appendage to your face.  Izma groans briefly from the friction burn and then giggles at the rough treatment.  Oh... she needs a good fucking in that asshole of hers, you think to yourself, and grin as you lower your body down to her rump.  Flush with desire, Izma glances over her shoulder and stares intently, eagerly awaiting the moment that your ${this.cockDescript(
                x
            )} lights her body up like the night sky.`
        );

        // (If non tentacle dicked)
        if (this.player.cocks[x].cockType != CockTypesEnum.TENTACLE) {
            this.outx(
                `\n\nNot one to keep a lover waiting, you take your ${this.cockDescript(
                    x
                )} and edge it along the smooth crevice of her ass checks, taking the time to enjoy the hypersensitive feeling of your soft cock head against her rough skin before pressing your prick against her little asshole.  With a surprised look over her shoulder, your ample Beta sports a fiendish grin at where you intent to sex her.  "<i>Ohhhh... back door?  You pervert...</i>" she teases.  You shoot an annoyed look back, physically reminding her that she isn't deciding how she's getting fucked here.  Giggling softly, Izma responds in a sultry manner, "<i>I'm not complaining.</i>"  Well, we'll just see about that, you muse to yourself as you painfully breeze past her boiling hot anus with your ${this.cockDescript(
                    x
                )}, provoking a ear screeching howl.  Condescendingly, you inquire to your wailing lover if there is a certain... "problem" she's having; her pained flash of teeth and grunting seems to provide an clear answer for you.  Slapping her rump mockingly, you comment on how perhaps Izma spoke too soon.  The concussive force of her buttocks against your [hips] seems to disprove your take on this situation.  With an earnest laugh, you toy with Izma and comment on how the "little girl" still has some fight in her, eager and hungry for a good anal fuck.`
            );

            this.outx(
                `\n\nOn that note, the domination of Izma's tight, humid ass begins; starting off shallow, you thrust violently against your submissive lover, ceasing your ${this.cockDescript(
                    x
                )}'s unbearably hot descent into her sphincter to briefly pull out, only to savagely force your way back into her and surpass your previous self-imposed threshold.  Recoiling with every gyration, the hermaphroditic shark tries to brace herself for a bottoming out that never materializes, only stopping her reactionary movements forward when she deciphers your pattern.  Throwing her for a loop, you decide to push past the threshold you've been gradually increasing, slowly retreating out of her tight fitting anus`
            );
            if (y >= 0) this.outx(" as you gently place your other dick against her labia");
            this.outx(".");

            this.outx(
                "\n\nIn obvious confusion, you visibly see Izma's head turn slightly to the right, as if to ponder this development.  Grinning like a mad fool, you dart your free hand out to the back of her head, taking hold of her long silver hair as you pull it back and buck your pelvis in a concerted effort, brutally bottoming out in "
            );
            if (y == -1) this.outx("her anus");
            else this.outx("both of her holes");
            this.outx(
                ".  The sound of Izma's pained cry of agony rises as her head does, guided by your arm as you drag her so far back that she ends up howling up into the sky.  Like a tongue reaching down into a candy wrapper to lick up delicious chocolate, you twist and grind the end of your "
            );
            if (y >= 0)
                this.outx(
                    "cocks against the unyielding ends of her anus and pussy, unleashing a weak whimper of bliss from under you."
                );
            else
                this.outx(
                    "cock against the unyielding end of her anus, unleashing a weak whimper of bliss from under you."
                );

            // [Cumming]
            this.outx(
                "\n\nWith her tail and hair in your tight grip, you start to slam into her with unnatural speed and clout, sending the poor tigershark into a fevered flurry of moans and verbal appreciation as she tries to encourage you to fuck her harder and deeper; something you are all too willing to do as you promptly turn her into a babbling fool with your fleshy spears"
            );
            if (y >= 0) this.outx("s");
            this.outx(
                ".  All too quickly though, your loins ache with the pained vice-grip of orgasm.  As much as you would like to continue dominating Izma, you cannot hold out.  The only choice you have now is where to direct your impending release."
            );
            // [Internal, Global option for non-TD and TD scenes]    [External, Non-TD scenes]
            this.simpleChoices(
                "Internal",
                undefined,
                "External",
                undefined,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
        }
        // !Tentacle dick scenes!
        else {
            // Scenes will vary based on length (at least 4 feet of dick per tentacle), and how many dicks you have. Please note that both conditions must be met for a scene; for example, to get the uber awesome constricted and fucked everywhere tentacle dick scene, you must have 3 + 4 (pussy, asshole, balls, breasts) + 3 for blowjob
            // Intro:
            this.outx(
                `\n\nWith precision and care, you work your ${this.cockDescript(
                    x
                )} into Izma's tight little asshole, causing her face to grimace in both pain and euphoria as you breach her depths without even needing to thrust; your mutated cock doing all the work at the whim of your thoughts.  The busty tigershark grasps at the ground under her as you retain your grip of her tail, shuddering at the sensation of lifting her slutty little tail over her as you pump her anus with your cock.  Izma vibrates with pleasure and reaches down to her clit and `
            );
            // (PC has one TD:
            if (this.player.tentacleCocks() == 1)
                this.outx(
                    "begins to slowly caress her pussy in tandem with your thrusts, bringing an expression of intense bliss to her face as her eyes clamp shut and her mouth opens wide to let out a deep moan."
                );
            // (PC has 2 TD's and 30 INT:
            if (this.player.tentacleCocks() >= 2)
                this.outx(
                    "tries to finger her pussy; the thought of her neglecting one of your rock hard cocks earns your ire, and with some degree of focus and concentration, you jut your tentacle cock out and suddenly slap her soft hand away from her clit; a gasp full of frustration rings out from your partner as you do so... deciding that she needs something substantial to moan about. Before she can react, your direct your thoughts to the tentacle cock that blocks her clit, and in a dizzying array of twists and bends, pulls back a few inches from her pussy before diving into her with lightning speed.  The way she thrusts her head upwards in the air is a pretty clear indicator of her discomfort at the act; whether it being painful or pleasurable isn't clear, but the howl she lets loose seems to point to the former.  The hermaphrodite shark morph claws fiercely at the ground as she grits her teeth, spasming like an crippled junebug caught in the burning rays of the sun.  You tauntingly ask the submissive tigershark if that hurt; something your lover can only answer with passionate groans as you resume your dual fucking of her back side.  You arrogantly respond by telling her THAT was the correct answer."
                );
            // (Subsequent scenes require TD's to have 4 feet of length)
            // (PC has three TD's, and 40 INT:
            if (this.player.tentacleCocks() >= 3)
                this.outx(
                    "\n\nAmused at how lost in sexual pleasure Izma is, you mockingly ask her if she can handle another one of your dicks.  By now, Izma seemingly knows to hold her tongue and rely on inferring your meaning, the realization dawning on her as she visibly braces herself for another tentacle dicked assault on her now sweat drenched body.  You don't disappoint her, as you snake your lengthy appendage past her thigh and up her stomach, coming to a sudden rest between her breasts before beginning to brutally tit fuck her."
                );
            if (this.player.tentacleCocks() >= 4) {
                this.outx(
                    "\n\nLaughing heartily, you inform the seemingly overwhelmed tigershark that you still have "
                );
                if (this.player.tentacleCocks() == 4) this.outx("a cock that needs");
                else this.outx("cocks that need");
                this.outx(
                    " a little loving from her; something that visibly registers on her face as her expression goes wide in shock, her eyes seemingly asking you where THIS one is going next."
                );
                // [Dick]    [Blowjob]
                this.simpleChoices(
                    "Dick",
                    undefined,
                    "Blowjob",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined
                );
                return;
            }
            // Go to buttsex
            // analFuckRadarEnding();
        }
    }
    // More than four TD's: [Both,(requires 70 INT)]   [Just Dick]   [Just Blowjob]
    private radarIzmaJustDick(choice = 0): void {
        this.clearOutput();
        let x: number = this.player.cockThatFits(65);
        if (x < 0) x = 0;
        // var y: number = this.player.cockThatFits2(65);
        // Just dick
        if (choice == 0) {
            this.outx(
                "To answer the question her peepers pose to you, you slide another pre-cum drenched tentacle cock down her tail and onto her pelvis, coiling around her engorged member tightly until your huge, perverted dick runs out of length... which suits you just fine as you grind your cock against the head of her own, ferociously crossing swords with her as she wails in overwhelmed joy at the bizarre but perverted felicity of your efforts."
            );
            this.player.createStatusAffect(StatusAffects.JerkingIzma, 0, 0, 0, 0);
        }
        // [(Just) Blowjob]:
        else if (choice == 1) {
            this.outx(
                "To answer the question her peepers pose to you, you project another one of your tentacle cocks down her tail and up her moist back, briskly gliding past her cheeks and against her lips as it slams into her kisser like a battering ram against a wooden castle door.  Recoiling at the sudden forceful impact, Izma arcs her head back and hastily drops her jaw, sticking her tongue out readily to cradle your member.  With another vigorous thrust, you dart into her mouth and slide along her wet, humid tongue; Izma's lips crash down on your shaft in a desperate effort to keep your wonderful cock in her mouth, apathetic to any discomfort on her part as you batter her mouth with your vine like prick."
            );
            this.player.createStatusAffect(StatusAffects.IzmaBlowing, 0, 0, 0, 0);
        }
        // [Both]
        else {
            this.outx(
                "You ponder for a moment where you can put one of your dicks, and then slam your palm into your forehead; ONE?  What's wrong with me?  I've got more than one that needs release, you think to yourself. Grinning, you slide another pre-cum drenched tentacle cock down her tail and onto her pelvis, coiling around her engorged member tightly until your huge, perverted dick runs out of length... which suits you just fine as you grind your cock against the head of her own, ferociously crossing swords with her as she wails in overwhelmed joy at the bizarre but perverted felicity of your efforts."
            );
            this.player.createStatusAffect(StatusAffects.IzmaBlowing, 0, 0, 0, 0);
            this.player.createStatusAffect(StatusAffects.JerkingIzma, 0, 0, 0, 0);
            this.outx(
                "\n\nReadying another one of your obscenely long cocks, you project another one of your tentacle cocks down her tail and up her moist back, briskly gliding past her cheeks and against her lips as it slams into her kisser like a battering ram against a wooden castle door.  Recoiling at the sudden forceful impact, Izma arcs her head back and hastily drops her jaw, sticking her tongue out readily to cradle your member.  With another vigorous thrust, you dart into her mouth and slide along her wet, humid tongue; Izma's lips crash down on your shaft in a desperate effort to keep your wonderful cock in her mouth, apathetic to any discomfort on her part as you batter her mouth with your vine like prick."
            );
        }
        // (Continues to [anal fuck sexing], if PC has only 4-5 dicks or does not met INT requirements for subsequent scenes)
        // analFuckRadarEnding();
    }
    /*
    // [Anal fuck sexing]
    private  analFuckRadarEnding(): void {
    var  x: number = player.cockThatFits(65);
        if(x < 0) x = 0;
    var  y: number = player.cockThatFits2(65);
        outx("\n\nContent with the level of penetration (and fucking) you are inflicting on her body, you lower yourself to one knee, coming down hard on Izma's bright red derriere and pinning her pelvis to the warm ground beneath you two.  Crying out in exquisite pleasure, Izma's eyes begin to roll back into her head, eyelids fluttering like a butterfly in the wind as her body is overtaken with euphoric delight.  You bear down on her tight anus, tunneling through her hot depths and stretching her out more to your liking.");
        // (If PC penetrated her pussy:
        if(player.tentacleCocks() > 2) outx("\n\nEach gyration and pivot of the dick lodged in her slick cunt manipulates and twitches the muscles in Izma's body against her will, essentially turning her into a sort of cock sleeve puppet as your dick flows back and forth along her smooth vaginal walls, like a flash flood along a smooth rock; her feelers struggle to keep up with your erratic appendage as you playfully dodge across her vagina, like a seagull zig-zagging from its brethren with the spoils of sustenance in its craw.  Her pussy will have to wait for it's just desserts.");
        // (If PC put a TD in Izma's mouth:
        if(player.hasStatusAffect(StatusAffects.IzmaBlowing) >= 0) outx("\n\nThe idea of weirding Izma out cracks like lightning across your mind, and you decide this is too good to pass up; to her apparent bewilderment, the ropey appendage in her mouth begins to swivel around, like debris in a wind tunnel as it hits every contour of her mouth, pulling out briefly and smearing your saliva covered dick across her face before plunging back in to further abuse her tongue.");

        // Izma's Orgasm
        outx("Without warning, Izma ");
        if(player.hasStatusAffect(StatusAffects.IzmaBlowing) < 0) outx("screams");
        else outx("releases a maleficiently muffled moan");
        outx(" and shakes with what you assume to be a distinctly powerful orgasm, given that the cock you worked her pussy with is damn near sizzling with her lady cum.");

        // (If the PC "crossed swords" with Izma:
        if(player.hasStatusAffect(StatusAffects.JerkingIzma) >= 0) outx("\n\nThe rumbling in her rod comes shortly after, signaling the releases of her jizzum as you stroke her lovingly with the head of your cock while pumping her with your coiled shaft.  Her cum flies straight into the ground and spasms in your tight grip as you hold her member close to comfort it during her release.");

    The vocal and passionate display of her release drives you over the edge, and you know that you can't hold on much longer.
        [proceeds to Tentacle Cumming, if PC only has one-two TD's; If PC has more than two  TD's, the scene transitions to the TD group cumming]

    [Tentacle Cumming]

    Where do you want to cum?  Inside Izma, or on her body?

    [TD Internal, leads to global internal scene]    [TD External, Leads to TD group cumming scene)

    (If PC only has one to two TD's: With a roar of utter pleasure, you flood Izma's womb with your seed, causing the busty tigershark to swoon as the hot sticky liquid rushes up into her.) (Proceed to Tentacle conclusion).

    Otherwise... [TD group cumming]

    Pulling all of the dicks out of her (except for the one's in her pussy/ and ass), you flip her over and arc your newly freed cocks over her head... something she groggily doesn't expect as her fight or flight instinct is triggered; after all, she's pretty dazed, and your cocks ARE hovering menacingly over her, in what seems to be a gesture of aggression.  After a moment, her eyes adjust and she relaxes, only to yelp in surprise as you plow your cocks into her stomach and breasts, violently forcing them along her body as the pressure in your loins finally hits that special level.  Rising just above her body, you squeeze down hard on Izma's shark like tail and cry out in bliss (.  /  ;) (Flooding her tight cunt /and anus) with your thick cum.) The cock's above her

    (cum volume normal: twitch and visibly convulse... but nothing comes out. In orgasmic throes, you are in no position to try and force anything out of you.  Disappointingly, only a few driblets of semen leak out... that was certainly anti-climatic.

    Cum volume medium: bulge with significant amounts of cum, and before long erupt onto Izma, coating her body and face in thin strands of semen.

    (Cum volume High, unlocks special ending scene: balloon up as your cum works its way to freedom along the contractions of your muscles.) (Leads to Spray n' Play scene or Cum bath scene)

    [Spray n' Play scene] (If PC hasn't orgasmed in three days: You try as hard as you can to contain the impending cum blast, but when it hits, your " + multicockDescriptLight() + " flail under the force of all that sperm.  Semen sporadically flies in every direction as you lose complete control of your dicks, occasionally getting hit with your own cum... and even receiving a unintentional self inflicted cock slap across the forehead; (thankfully, the misguided cock misses your horns).  You reel in pain from the sudden impact and fall backwards onto your ass.  With the orgasm now behind you, the opportunity presents itself to survey the "damage".

    Random followers might get hit with cum, low chance of it occurring though

    Rathazul: "Staring daggers at you, the old rodent slowly wipes your wayward jizz from his face, turning to view his now ruined experiment and sighing.  Without a single word, he heads off to the lake to rinse himself clean.

    Jojo: "Lost in meditation, Jojo doesn't seem to realize that he now has cum stuck in his fur until a few moments have passed.  Looking downward at himself as he wakes, he seems to ask himself if what clings to him is what he thinks it is.  In disgust, he wades off to the lake to wash it out of his coat, shaking his head at you as he trudges along.

    Marble: A loud yell of anger rises across the camp as Marble suddenly shoots up into a panicked brushing of her body.  "DAMNIT SWEETIE!  DAMNIT!"  She howls as she hurries off to the river to get your semen off of her; no doubt disgusted at the fact that Izma's fluids are mixed in with yours and are all over her.

    Amily (pure): Staring back at you is a goo slathered mouse that can only be Amily.  Gazing at you behind her (furry muzzle/face) she grits her teeth, looking like she wants to tear your head off.  All you can do is try and smile in a way that can diffuse the situation.  She doesn't buy it, but luckily she decides not to make a scene.

    Amily (corrupted): Almost like a child during a treasure hunt, Amily is busy running around and finding up all of the cum she can, greedily lapping it up as she goes.  Either she is unaware of the fact your cum has the taste and scent of Izma about it, or she doesn't care.  Either way, the (mouse-morph/-girl) seems content with "cleaning" up after you.

    Jojo (corrupted): Without having to even utter "SLUT!", Jojo is pouncing on the globs of cum that have rained down on the camp site, hungrily lapping his master's sperm up.  "Good slut..." you whisper, giggling to yourself.


    [Cum bath scene]

    With eyes wide open in utter disbelief at the euphoric, agonizing pain in your " + multicockDescriptLight + ", you clench your fists and scream your orgasm to the high heavens.  Erupting like water gushing through a collapsed beaver dam back home, your " + multicockDescriptLight + " gush forth a searing hot torrent of spooge onto Izma's prone body, literally drowning out the bright red coloration of her skin as you squirt... no, BLAST Izma with your white seed.  It's hard to tell under all that cum, but Izma appears to be struggling to get out from underneath it; With adrenaline surging to your muscles, you assume that she must be in some form of distress or panic from the flash flood of semen over her body and face.  You begin to lurch forward to grab Izma and pull her out, when you see that she isn't drowning in your seed; rather, she's lathering her breasts, stomach, and face with your steamy load.  As your release tapers off, you see (under your thick globs of cum) that Izma is completely out of it, overcome with disbelief at how much cum her Alpha could... envelop her in.  Pulling your shrinking " + multicockDescriptLight + "'s back into your lap, you sink to one knee and carefully wipe your semen from her nose and mouth; you aren't sure if shark-morphs can breathe under such conditions, and you have no desire to find out.  With a great gasp, Izma sucks in a large amount of air into her semen covered body, resigning herself to lying against the ground for the time being as she enjoys the adhesive warmth around her.  Panting weakly, Izma turns to you, still out of it to a certain degree as she speaks softly. "Th-that... that..." she quietly mutters before slumping into the ground, shaking in pleasurable enjoyment; Obviously, she meant to say something along the lines of "that was something else."

    With your passionate lovemaking over, the time to clean up and get back to other things has arrived. You proceed to walk over to your discarded (armor), telling Izma to get up and clean herself off as you do so.  A slick, wet thud against the ground is what greets your command, causing you to turn around in the tigershark's direction.  Splayed out on the ground lies Izma, apparently having slipped on the frictionless jizz under her. Placing your hands on your hips, you stare condescendingly at your Beta while she struggles to get back up, only to slide forward and tumble backward onto her tail and backside.  "I can't get up!"  she whines.  "There's too much!  I keep falling!"  The humiliated Beta struggles one last time to rise to her feet, and falls once more; this time landing on her angular face.  With a grunt, she apparently gives up and reaches out to you for assistance.

    [Help her]   [Leave her]    [Ultimatum]

    [Help her]

    Sighing, you reach down to the shark morph and help her to her feet, allowing her to rub the soles of her feet against your (armor) so that she can at least walk while you help her to the lake.  She slips a few times along the way,

    (almost sliding out of your grip as she does/ damn near knocking you over as she tumbles to the ground. She promptly gets back with some assistance, and continues alongside you to the lake.  While you might argue being small has it's advantages, it certainly isn't helping out here.)

    Finally, after some effort, you reach the lake and gently guide Izma's body into the river.  With your kind deed done, you inform your Beta that she better clean up fast; you'll likely take her body again sooner rather than later.

    [Leave her]

    Chuckling to yourself, you pull your leg away and stare down at the shark morph; her expression turns from one of helplessness and need to cold realization that you aren't going to help her.  Calmly, you scold Izma for giving up so easily; that no Beta of yours would give up without a fight, and that you are wondering if she is still worthy of being your Beta.  Realizing her weakness, she resolves to crawl towards the river.  Praising your submissive lover, you tell her that you'll be waiting at camp for her return; that by the time she gets back, you'll be ready to dominate her once again.  The thought of being made into your bitch once more appears to resonate through Izma, driving her to quicken her pace along the ground.

    [Ultimatum]

    With deft grace, you (kick/slap) Izma's hand away with just enough force that she'll understand that such weakness will not be tolerated.  With a panicked realization of some kind of wrongdoing, Izma looks at you with a worried look in her eyes.  Walking in front of her and turning your backside to her, you admonish Izma for not even trying; that nothing in this life is accomplished without some kind of struggle. Lowering yourself down into a crouched position, you tell Izma... That she has.  Five.  Minutes.  To get that luscious ass.  Over to the damn river.  Or there will be no sex for a week.  Eyes wide in complete horror, Izma begins to frantically claw at the ground, desperately dragging herself along the ground to beat your imposed time limit.  Grinning smugly, you turn around and walk backwards, occasionally questioning her fortitude and resolve while reminding her of how much time she has left.  The journey isn't easy for her as she drapes along the grassy ground, leaving a thin but noticeable trail of cum in her wake.

    With three minutes to go, you take hold of your (" + multicockDescriptLight() + " (and) " + clitDescript() + "  /   " + buttDescript() + "), cradling it (them/it) in your hands as you whistle at Izma.  Raising your voice, you tell Izma that THIS is what she is fighting for; the privilege for her Alpha to bestow upon her the "blessing(s)" she enjoys, and that no Beta of yours will fail to make the deadline. Growling with newfound drive, Izma feverishly claws along the ground, greatly picking up her pace as you praise her progress.

    With one minute to go, Izma reaches the river bank; running into the water, you taunt Izma by slapping your " + multicockDescriptLight() + " against the water, commenting that she could taste you if she was in the water right now.  That seems to the final bit of encouragement she needs; with a great shove against the slope of the river bank, Izma begins her descent down into the water.  The sand doesn't even seem to slow her down as she becomes a humanoid missile, speeding down the bank and into the water with a loud, resounding splash.  Satisfied, you wade over to the tigershark that floats on her back, sporting a look of pure triumph as she slowly drifts down the stream.  As you grab her and drag her closer to shore, she mutters loudly, "The things I do for a good dicking..." Noting that her face is clear of cum, you dart in and kiss her fiercely, cradling the side and the back of her head as you reward your Beta for her efforts.  After a few moments, you break that kiss and tell the hermaphroditic shark-morph that she better clean up fast; that you will be taking her again soon, and that she better not keep her Alpha waiting.  Climbing out of the water, you leave your wildly thrashing Beta to quickly clean up in preparation for the next time you decide to fuck her.
    */

    // [Internal, Global option for non-TD and TD scenes]
    private internalIzmaAnalCumShot(): void {
        this.clearOutput();
        this.outx(
            "With a series of labored breaths, you excitedly tell your lover that you are going to cum inside her, and that she'd better love every second of it.  The rushing warmth that resonates through your cock fills you with a relaxed euphoria as you groan and bottom out once more, releasing your seed deep into her eager depths."
        );
        // (If PC fucked her vaginally:
        if (this.player.cockThatFits2(65) >= 0)
            this.outx(
                `  The feelers in her pussy glide along the glans of your ${this.cockDescript(
                    this.player.cockThatFits2(65)
                )}, driving your dick's unconscious efforts to inseminate her into overdrive as you feel each subsequent stream of semen increase in velocity.`
            );
    }
    // [External, Non-TD scenes]
    private backJizzShot(): void {
        this.clearOutput();
        this.outx(
            "Pulling out of Izma, you begin to stroke [eachCock] furiously, bobbing your shaky hands up and down "
        );
        if (this.player.cockTotal() == 1) this.outx("your shaft ");
        else if (this.player.cockTotal() == 2) this.outx("two shafts ");
        else this.outx("three shafts");
        this.outx(
            ` as you struggle to cum.  Rolling over onto her thoroughly abused ass, the feminine tigershark twists her head back to get her hair out of her face, and opens up wide to receive your load.  Arcing like lightning in the sky, your orgasm flows forcefully out of your ${this.multiCockDescriptLight()}, `
        );
        // (Cum volume normal:
        if (this.player.cumQ() < 500)
            this.outx(
                "firing thin streams of semen from [eachCock], lathering Izma's luscious red body and making it glisten in the sun."
            );
        // (Cum volume high:
        else if (this.player.cumQ() <= 1000)
            this.outx(
                "streaming forth like fierce rain down a tree, repeatedly striking Izma across the face and breasts as your orgasm continues unabated for several moments."
            );
        // (Cum volume very high:
        else {
            this.outx(
                "creating a earthquake like seizure in [eachCock] as you painfully ejaculate a torrent of sperm all over Izma, drowning that bright red body out with a thick layer of clear white goop.  Your abundant release is so large that you, quite literally, cover Izma head to toe with sticky, sloppy cum."
            );
            // (leads to Izma cleanup end scene)
        }
    }

    // Izma dominating Latexy
    // Resets Latexy's feed counter.
    // Has option to enable Izma to feed latexy.
    // Adds latexy button in Izma's sex menu with options to turn feedings on/off and/or watch one.
    public izmaDomsLatexy(): void {
        if (this.flags[kFLAGS.TIMES_IZMA_DOMMED_LATEXY] == 0) {
            // {First time}
            this.outx(
                `\nFamiliar, lusty pants can be heard coming from the edge of the camp, and you begrudgingly head over to investigate.  The heavy breathing is accompanied by a few groans of pleasure, each higher pitched than the last, and as you round a rock, you're treated to the sight of Izma nude, holding a rope that's currently lashed around ${
                    this.flags[kFLAGS.GOO_NAME]
                }.  The goo-girl has one hand stuffed into her slick quim, busily fisting herself for the shark-girl's pleasure.`
            );
            // [Stop] [Watch]
            this.menu();
            this.addButton(0, "Stop", this.stopIzmaLatexy);
            this.addButton(1, "Watch", this.izmaDomsLatexyPartI);
        }
        // {Repeat}
        else {
            this.clearOutput();
            this.outx(
                `When you tell Izma to feed ${
                    this.flags[kFLAGS.GOO_NAME]
                }, the shark-girl reacts with absolute glee, her fifteen inch cock immediately stabbing out from the fronds of her skirt, filling to absolute hardness.  Kissing you hurriedly, she breaks off at a trot towards ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s part of camp.  Her tail is swaying happily as she goes, and you note that she's already untying her skirt to get ready to greet the strange, black-skinned woman that shares your camp.  You follow along, admiring your lover's striped, muscular bottom as it sways back and forth.  Izma's thighs have already grown damp with excitement, and in no time, she's rounded a rock and gotten to ${
                    this.flags[kFLAGS.GOO_NAME]
                }.`
            );
            this.outx(
                "\n\nPicking up your pace, you hurry after, anxious to watch the show, and as you round the rock, you can see that Izma has already lassoed a rope around the goo-girl's neck and brought her to heel."
            );
            this.outx(
                `\n\n"<i>Go on, you need to make me want to use you!</i>" Izma says while slowly caressing her penis.  She's openly leering down at the reflective, ebon-skinned slut, and the poor, collared woman reluctantly parts her glossy folds, slowly feeding her fist into her capacitive nethers, one knuckle at a time.  Once her wrist disappears, it's only a short moment before she pulls it back out, gasping from unexpected pleasure.  Strings of inky lubricant dangle precariously between her digits and stretched snatch, just about to break until ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s hand is plunged back into the inky honeypot.`
            );
            this.izmaDomsLatexyPartI();
        }
    }

    private izmaDomsLatexyPartI(): void {
        if (this.flags[kFLAGS.TIMES_IZMA_DOMMED_LATEXY] == 0) this.clearOutput();
        else this.outx("\n\n");
        this.outx(
            'Izma growls while she pumps away at her erection, saying, "<i>Yeah, you like that, don\'t ya ink-slut?</i>"'
        );

        this.outx(`\n\n${this.flags[kFLAGS.GOO_NAME]} bites her lower lip and `);
        if (this.latexGirl.gooObedience() > 50) this.outx("eagerly");
        else this.outx("sheepishly");
        this.outx(
            " nods, gushing a few fresh dribbles of moisture around her wrist at the admission."
        );
        this.outx(
            '\n\n"<i>Oh really?</i>" Izma teases, "<i>I should\'ve known.</i>"  Crinkling her nose, the tigershark-girl continues, "<i>You can practically smell how much of a beta you are.  I bet when you used to be a goo-girl you probably fantasized about being stuck in a bottle for herms and dudes to fuck, didn\'tcha?</i>"  Izma flicks your goo-slut\'s bulging, black '
        );
        if (this.flags[kFLAGS.GOO_DICK_LENGTH] > 0) this.outx("cock");
        else this.outx("clit");
        this.outx(" with a toe, drawing a pleasured gasp from the submissive.");
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } shudders as she pushes her hand in and out of herself.  Her whole forearm is dripping with onyx moisture, and the noisy squelches are easy to hear from where you're watching.  "<i>Yes... I'm a slutty, submissive girl...  Can I have your cum, mistress Izma?  Please?  I'm putting on such a good show!</i>"`
        );
        if (this.latexGirl.gooObedience() < 50)
            this.outx(
                "  A look of annoyance flashes across her face as soon as she says it, like she didn't really want to say that so openly."
            );
        else if (this.latexGirl.gooObedience() <= 80)
            this.outx(
                "  A conflicted look flashes across her face as soon as the words slip out, but there's no taking them back."
            );
        else
            this.outx(
                "  A hungry look flashes in her eyes as soon as the words leave her mouth, and she licks her lips hungrily."
            );
        this.outx(
            `  A particularly powerful thrust inside herself has ${
                this.flags[kFLAGS.GOO_NAME]
            } whining, her eyelids fluttering closed as she cries, "<i>Oh, [name]!</i>"`
        );

        this.outx(
            `\n\nYou smile in satisfaction as your beta and your submissive, former slime tend to their needs together, proud that in the face of fifteen inches of stripe-cock, ${
                this.flags[kFLAGS.GOO_NAME]
            } still fantasizes about you.`
        );
        this.outx(
            `\n\n"<i>Good enough, slut,</i>" Izma croons in between heavy pants.  She slaps her swollen shark-cock across the black-skinned woman's hungry face.  Gasping in surprise, ${
                this.flags[kFLAGS.GOO_NAME]
            }'s' shocked expression tells you all you need to know, right up until the red boner plunges into her unresisting lips.  Liquid, ${
                this.flags[kFLAGS.GOO_EYES]
            } eyes look up in surprise before fluttering contently closed.  Izma's hand caresses a lock of slippery, latex hair and forces herself deeper into the wet, former goo's throat.  Droplets of inky moisture roll out around the edges of the shaft, painting her four-balled nutsack black before they cool and harden around it.`
        );

        this.outx(
            `\n\nHands reaching out towards the slippery, sheathed quartette, ${
                this.flags[kFLAGS.GOO_NAME]
            } hums around the throat-stretching bulge as she does her best to milk it, gently squeezing each cum factory in turn.  Izma hooks a leg over ${
                this.flags[kFLAGS.GOO_NAME]
            }'s shoulder and begins to roughly fuck the onyx beauty.  She hammers her cock home with crude thrusts that pound all fifteen inches straight into the goo-girl's core, the only sounds half-strangled hums of pleasure and the heated squelches Izma's groin makes when it bottoms out on her partner's greedy lips.`
        );

        this.outx(
            '\n\n"<i>Oooh, fuck, quit sucking so hard,</i>" Izma tries to command, but it winds up sounding more like begging.  '
        );
        // OBEDIENCE FAIL
        if (
            this.latexGirl.gooObedience() / 5 + this.latexGirl.gooFluid() / 5 + IzmaScene.rand(20) <
            10
        ) {
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } grows and sucks harder, cheeks hollowed with suckling hunger.  You can see them stretch and go even more concave with rhythmic pulsations, vacuum-tight around the orange shaft.  Izma moans and tries to pull out, but she barely manages to extract an inch before her whole length is noisily pulled back in.  The shark-girl tries to pry the slutty, hungry little goo off of herself again and again, but each time, all she winds up doing is getting sensuously devoured again and again.  ${
                    this.flags[kFLAGS.GOO_NAME]
                } gives her four balls another appreciative squeeze, and Izma's eyes suddenly roll back, helpless again the hungry sluts impressive oral talents.`
            );

            this.outx(
                `\n\n"<i>C-c-cumming!  Ohhhh by the gods, yes!  Ungh!</i>" Izma cries as her hips begin to weakly thrust against their onyx prison, smushing ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s lips into her toned middle.  The smooth, latex sheath around her sack trembles, wrinkling as Izma's balls pull tight against her, and then, ${
                    this.flags[kFLAGS.GOO_NAME]
                } is gurgling noisily, massaging all four of those cum factories as they pour their cargo straight into her throat, feeding her the warm, soupy cum she craves.  They stay locked like that for upwards of a minute, Izma occassionally trying to talk but usually just babbling contently while she's milked for every drop.`
            );

            this.outx(
                `\n\nAbruptly, the striped hermaphrodite slumps back against a rock, her drained dong sliding out of the constricting tightness of ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s throat with a wet pop.  The crimson dick is encased in a hardening shell of latex, and you must admit, it's a good look on her.  Izma sighs, "<i>You disobedient slut...</i>" and staggers back up onto her feet.  Gesturing down at her glossy, black dick, she comments, "<i>I guess it is a nice look on me.</i>"`
            );
            this.outx(
                `\n\n${
                    this.flags[kFLAGS.GOO_NAME]
                } grins happily and lays back, sunning herself as she starts to digest her 'meal'.`
            );
        }
        // OBEDIENCE SUCCESS
        else {
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } obediently relaxes, allowing the herm to take more effective control of the situation.  "<i>Atta girl,</i>" Izma comments as she extracts herself from the hungry, sucking mouth-hole, her dick shining with a fresh, wet, latex sheath.  "<i>Ass up, slut.  You're getting fed via suppository today!</i>"`
            );
            this.outx(
                `\n\n${
                    this.flags[kFLAGS.GOO_NAME]
                } assumes the position in a second and begins to wag her bottom back and forth.  The way the light reflects on those onyx orbs, you can understand why Izma immediately pistons herself straight into the latex rosebud - it's an entrancing, cock hypnotizing sight to be sure.  She grunts as soon as she bottoms out, and then straining, she yanks herself back out of the vacuum-tight, anal seal, gasping for breath.  "<i>You can suck there too?!</i>" Izma growls in wonder, but not before pushing herself back inside.  "<i>Suck it while I fuck you.  I'm gonna blow a huge load in your ass before long, cock-slave.</i>"`
            );
            this.outx(
                `\n\nAgain and again, Izma slaps her hips against ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s tight backdoor.  Every time she pulls out, she's coated in even more liquid latex, some of it splattered on her hips and molded on her cock.  Even the inky wetness that girds her balls thickens into a more substantial coating.  Soon, she's grunting each time she bottoms out, and from the way her tongue is hanging out of her pleasure-opened mouth, the sensations her member is experiencing must be beyond imagining.  Izma suddenly gurgles and hilts herself, gasping, "<i>Ungh, here... here it comes!  TAKE IT!  TAKE IT, SLUT!</i>"`
            );

            this.outx(
                `\n\nThe sheath around her balls wrinkles slightly as it contracts, pumping what can only be a deluge of salty shark-seed straight into the goo-gal's roomy backside.  Both girls moan in ecstatic bliss.  You belatedly realize that the whole time she's been ass up, ${
                    this.flags[kFLAGS.GOO_NAME]
                } has had her arm elbow-deep inside her snatch, getting herself off and potentially handing out a handjob inside of herself.  Obsidian drool runs unchecked down her elbow and onto the ground as the black woman cums.  Meanwhile, Izma keeps herself tight on her succulent asscheeks, eyes half-rolled back in their sockets as she gives herself completely over to the blissful ecstasy that's polishing her pole.`
            );

            this.outx(
                `\n\nAbruptly, the striped hermaphrodite slumps back against a rock, her drained dong sliding out of the constricting tightness of ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s ass with a wet pop.  The striped dick is encased in a hardening shell of latex, and you must admit, it's a good look on her.  Izma sighs, "<i>Good girl...</i>" and staggers back up onto her feet.  Gesturing down at her glossy, black dick, she comments, "<i>I guess it is a nice look on me.</i>"`
            );
            this.outx(
                `\n\n${
                    this.flags[kFLAGS.GOO_NAME]
                } grins happily and lays back, sunning herself as she starts to digest her 'meal'.`
            );
        }
        this.flags[kFLAGS.TIMES_IZMA_DOMMED_LATEXY]++;
        this.flags[kFLAGS.GOO_FLUID_AMOUNT] = 100;
        this.dynStats("lus", 20 + this.player.lib / 10);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private stopIzmaLatexy(): void {
        this.clearOutput();
        this.outx(
            `You step into the middle of it before it can progress any farther.  ${
                this.flags[kFLAGS.GOO_NAME]
            } is yours, and Izma is not to play at being a mistress to YOUR pet.`
        );
        this.outx(
            '\n\nVisibly chastized, the tigershark-girl backs off with a meek, "<i>Yes, Alpha.</i>"  Just like that, she\'s running off, probably to jack that raging mega-boner she built up from playing with the goo.'
        );
        this.flags[kFLAGS.IZMA_X_LATEXY_DISABLED] = 1;
        this.flags[kFLAGS.TIMES_IZMA_DOMMED_LATEXY]++;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Click Latexy Submenu In Izma's Menu
    private izmaLatexySubmenu(): void {
        this.clearOutput();
        this.outx(
            '"<i>Oh, I wouldn\'t worry about her, [name],</i>" Izma says while her tail flicks back and forth.'
        );
        this.menu();
        if (this.flags[kFLAGS.IZMA_X_LATEXY_DISABLED] == 1)
            this.addButton(0, "KeepHerFed", this.izmaLatexyToggle);
        else {
            this.addButton(0, "No Feeding", this.izmaLatexyToggle);
            // [Watch]
            this.addButton(1, "Watch Them", this.izmaDomsLatexy);
        }
        this.addButton(4, "Back", this.izmaSexMenu);
    }
    // [No Feeding]
    private izmaLatexyToggle(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.IZMA_X_LATEXY_DISABLED] == 0) {
            this.outx(
                `You tell Izma you don't want her feeding ${this.flags[kFLAGS.GOO_NAME]} any more.`
            );
            this.outx(
                '\n\n"<i>Awww, that\'s too bad.  She\'s pretty fun, for a sack of slippery latex, that is,</i>" Izma cheers.  "<i>Well, you\'re the Alpha.  I suppose I can keep my hands to myself.</i>"'
            );
            this.flags[kFLAGS.IZMA_X_LATEXY_DISABLED] = 1;
        } else {
            this.outx(
                `You tell Izma that you've changed your mind, and she can keep ${
                    this.flags[kFLAGS.GOO_NAME]
                } fluid topped off.  The shark-girl hugs you with a predatory grin splitting her face.  "<i>I can't wait.</i>"`
            );
            this.flags[kFLAGS.IZMA_X_LATEXY_DISABLED] = 0;
        }
        this.menu();
        this.addButton(4, "Back", this.izmaLatexySubmenu);
    }
}
