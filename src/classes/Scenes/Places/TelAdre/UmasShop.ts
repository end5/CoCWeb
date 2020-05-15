import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";
import { PerkLib } from "../../../PerkLib";
import { PerkType } from "../../../PerkType";
import { StatusAffects } from "../../../StatusAffects";
import { TelAdreAbstractContent } from "./TelAdreAbstractContent";

/**
 * Whee!
 * (No @ tag for coder)
 *
 * @author Gedan
 * @author QuietBrowser, ???
 *
 * I dunno yet how heavy-handed I can get away with being when it comes to making changes to scene content on the fly, whilst I'm coding it up.
 * For the most part, I've tried to stick to just minor changes where possible rather than making any serious modifications, with the intention of seeing exactly what Fen changes (if anything),
 * using that as kind of my benchmark. In hindsight, anything I code up in future I'd like to /properly/ edit myself via gdocs with the original author(s),
 * so I can fix the stuff up to the point where I'm happy AND the author(s) have had their input too, but I'm putting that down to how... rough some parts of the Uma doc are.
 *
 * I COULD have made use of Fake-Names new methods of including scene content, but this content file is a proof of concept for new class-based sceneadditions.
 * As such, I've left it as "similar" as possible to older content throughout the game for clarity purposes. Anything I add past this point will probably use
 * Fake-Name's Scene Parsing stuff as much as possible.
 *
 * I'm also VERY tempted to say the bonuses from massages and acpuncture sessions should be dropped, and they should be turned into like a HP recovery/fatigue recovery deal.
 * Massage recovers 50% of missing health in an hour, Acpuncture recovers 30% of current fatigue in an hour?
 */
export class UmasShop extends TelAdreAbstractContent {
    private _loppeTalks: any[];

    public constructor() {
        super();
        /**
         * Builds an array of the sub-scenes for Loppe conversations. No point continually building the shit every time, right?
         */
        this._loppeTalks = [];
        this._loppeTalks.push(this.talkLoppeAttitudes);
        this._loppeTalks.push(this.talkLoppeCarrotIncident);
        this._loppeTalks.push(this.talkLoppePuberty);
        this._loppeTalks.push(this.talkLoppesFirstGirl);
        this._loppeTalks.push(this.talkLoppesFirstBoyfriend);
    }

    /**
     * First time scene entering le shoppe
     * Edit Status: 100%
     */
    public firstVisitPart1(): void {
        this.clearOutput();

        this.outx("You make your way to Uma's shop.  It's close to Loppe's house");

        // Added some shit for variance if the players not (presumably) sexed up Loppe too much in the past.
        if (this.flags[kFLAGS.LOPPE_TIMES_SEXED] <= 3) {
            this.outx(" but you've never noticed the quaint storefront before.  ");
        } else if (this.flags[kFLAGS.LOPPE_TIMES_SEXED] <= 8) {
            this.outx(" and the homely building has caught your eye once or twice in the past.  ");
        } else {
            this.outx(" and from there you've seen the humble exterior many times.  ");
        }

        this.outx(
            '"Kemono\'s Oriental Clinic" is written on a wooden board above the entryway.  "<i>Sugar, you coming?</i>" Loppe asks, breaking you out of your reverie.  "<i>Come on in!</i>"\n\n'
        );
        this.outx(
            "You follow the laquine inside; the interior is similar to Loppe's house, including the strange internal hallway, but the waiting room outside is light and airy.  Windows are adorned with multiple elaborate windchimes, which tinkle and clatter softly as a cooling breeze drifts through the house. A huge shelf dominates one wall, covered in - you find yourself double-checking - what look like tiny, miniature versions of trees.  A nondescript statue-fountain stands in one corner, water welling from its tip and flowing gently down its sides to create a calming sound.  In another corner, there is a small garden of colorful, polished stones and soft white sand.  Multiple lushly-cushioned chairs complete the room, obviously a waiting room - a dense bead curtain cordons off a doorway leading deeper inside the building, and Loppe's mother must clearly lie beyond.\n\n"
        );
        this.outx(
            '"<i>Mom, are you busy?!</i>" Loppe yells.  "<i>Just a second, dear!</i>" replies a melodic, feminine voice.\n\n'
        );
        this.outx(
            "Out of the bead curtains emerges a dog woman; her fur looks ruffled in places and she has a silly smile plastered over her face, her hair seems to be in disarray.  She briefly glances at you and Loppe, and only greets you two with a brief wave and a giggle before going away.  You wonder what could've happened beyond those curtains.\n\n"
        );
        this.outx('Loppe giggles and gives you an "I told you so" look.\n\n');
        this.outx(
            "Before you can think to respond to her, the beads part and a new figure emerges.  She's one of the many anthropomorphs who inhabit this city, a bipedal humanoid horse with unmistakable human features.  She's huge, easily seven feet tall, certainly far bigger than the half-horse who brought you here, with full, round breasts and wide womanly hips clearly delineated by the strange dress that she wears, a rich blue with a pattern of white snowflakes on it.  She looks "
        );

        // Assuming Uma is ~7' tall == 84". 6" leeway for the variants or more? PAGING FENOXO!
        if (this.player.tallness < 78) {
            this.outx("down at you ");
        } else if (this.player.tallness < 90) {
            this.outx("straight at you ");
        } else {
            this.outx("up at you ");
        }

        this.outx(
            "with a soft expression; her features are maternal and friendly, but there's a playful twinkle in her eye that makes her look younger than she really is.  For all that, she's clearly a mature woman but still strong and attractive.  Black hair, starting to go gray at the tips, is worn in a long, elegant braid, the end knotted around an elaborate butterfly hairpin.  While her fur is a beautiful shade of chestnut brown, her large eyes are a deep brown, almost black.  She casually flicks an equine ear in a manner that reminds you very much of Loppe, and you have a strong feeling that this is Uma, Loppe's mother.\n\n"
        );

        this.menu();
        this.addButton(0, "Next", this.firstVisitPart2);
    }

    /**
     * Page 2 of introduction scene
     * Edit Status: 95%
     */
    public firstVisitPart2(): void {
        this.clearOutput();

        this.outx(
            'Loppe bounces up towards the tall equine and they embrace in a friendly hug.  "<i>Hi, mom!</i>"  Uma laughs softly . "<i>Hello my little horsey hopper.  Who is this?</i>" she asks, looking at you.\n\n'
        );

        // Doc has ellipses around friend, seemed akward
        this.outx(
            "You politely offer Loppe's mother your name, telling her that you're a... friend of Loppe's.\n\n"
        );
        this.outx(
            'Loppe looks at you with disdain, then adds, "<i>Yes, [he]\'s a friend alright.</i>"  Loppe clears her throat.  "<i>Mom, I would like to introduce you to [name], my [boyfriend].</i>"\n\n'
        );

        // Tempted to add in some variance shit here for corrupt/times-sexed stuff, like low corrupt/low sex count;
        // Loppe's revelation about your apparant relationship comes as something of a shock to you, but you try - and fail - to hide the suprise from your face." etc

        this.outx(
            "Uma looks between the two of you with interest.  \"<i>[Boyfriend] huh?  So it's you whom I have to thank for the broken springs in Loppe's bed?</i>\" Uma says with a smile, offering you a hand.\n\n"
        );
        this.outx(
            "You give her a winning smile back and accept it, wondering if you should prepare yourself for a macho-type squeezing match.  Even as you shake her hand, you apologize, telling her it wasn't your intention to make Loppe's bed need replacement springs.\n\n"
        );
        this.outx(
            'Loppe and Uma look at each other and then they both burst out laughing.  "<i>Oh, sugar... you\'re so silly,</i>" Loppe says.  "<i>[name], I learned a long time ago that Loppe\'s beds must be both battle and waterproof.  So, her bed is custom made; you could have an army of minotaurs stomp through and it wouldn\'t even bend.</i>" Uma says with a grin.\n\n'
        );
        this.outx(
            "You give them your best confused expression, realising that Uma and her daughter must have similar tastes in humor; she was evidently joking with you.\n\n"
        );
        this.outx(
            'Uma is the first to break the awkwardness.  "<i>Well then, care to give me the details?  How did you two meet?  When did you start fooling around?  Has my daughter worked so hard you had to seek a healer yet?</i>"\n\n'
        );
        this.outx("Loppe holds your hand and the two of you begin detailing how you met....\n\n");

        this.menu();
        this.addButton(0, "Next", this.firstVisitPart3);
    }

    /**
     * Page 3 of introduction scene
     * Edit Status: 95%
     */
    public firstVisitPart3(): void {
        this.clearOutput();

        this.outx(
            '"<i>I see... that is so like my daughter to do something like that.</i>"  Uma glares mischievously at Loppe.  "<i>Aww mom... cut me some slack!</i>"  Loppe protests, playfully.  You can\'t resist laughing softly at the two; it reminds you of people back in Ingnam... albeit they\'re joking about subject matter you\'d normally not touch back in your world.</i>\n\n'
        );
        this.outx(
            'Your conversation is interrupted when a cat man enters the clinic.  "<i>Umm... hello?</i>" he says, shyly as he enters.  Uma turns to you.  "<i>You\'ll have to excuse me, but I must get back to work.</i>"  Understanding that Uma is currently working, you politely step back and watch as Uma walks to attend to her client.\n\n'
        );
        this.outx(
            '"<i>We should go, sugar,</i>" Loppe whispers in your ear.  You nod to her, tell Uma that it was nice meeting her, and indicate Loppe should lead you out.  You follow the Laquine out of the building, and tell her that her mother is a nice woman.\n\n'
        );
        this.outx(
            '"<i>Yeah, she is nice, she\'s just a little... quirky sometimes,</i>" Loppe agrees.  "<i>And I think she likes you too, sugar; nice work.</i>"  She grins, patting you on the shoulder.\n\n'
        );
        this.outx(
            "You tell her that you're glad, but you have other things to do, so you'll catch her some other time. \"<i>Alright sugar, see you around,</i>\" Loppe announces as she turns and walks away, back in the direction of her home, leaving you to start heading back to what passes for yours in this world.\n\n"
        );

        this.outx("<b>Uma's Clinic is now available from the Tel'Adre shops menu!</b>");

        // Flag the shop visit
        // There's still a flag left over from Loppe's initial content that I dont' think is actually used.
        this.flags[kFLAGS.LOPPE_PC_MET_UMA] = 1;

        // Player returns to Camp
        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    /**
     * Repeat visits.
     * Edit Status: 90%
     *
     * @param returnedTo Indicates the "entrance" mode. false = came here from an external menu, true = backed out from one of Uma's options
     */
    public enterClinic(returnedTo = false): void {
        this.clearOutput();

        // Hide the stuff that dun make no sense if you're dropping back from a menu inside the clinic
        if (!returnedTo) {
            this.outx(
                "You decide to pay Uma a visit at the clinic, so you follow the way through the streets to the apparently humble clinic.  Once there, you open the door and enter.\n\n"
            );
            this.outx(
                "The interior of Uma's clinic is as calm and quiet as usual.  There don't seem to be any customers present at this moment, and you announce your presence by knocking gently on a counter.  The tall horse-woman walks softly out through the beaded curtain, giving you a friendly smile.\n\n"
            );
            this.outx(
                "\"<i>Why, if it isn't my little girl's special someone.  What brings you here, hmm?  Wanted to try my services?  A friendly little chat?  Or...</i>\" She saunters confidently over to you and gives you a knowing grin.  \"<i>I bet my loose-lipped little Loppe has hinted that I'm not currently seeing anybody, hmm?  Is that why you're here - you wanted to see how the mother measures up to the daughter?</i>\"\n\n"
            );

            // ima change this to the minvalue required for sex scenes to be available methinks, or atleast lower it to around that bracket
            if (this.player.femininity >= UmasShop.UMA_CONSIDER_PC_FEM) {
                this.outx(
                    "You notice her appraising your form as you stand before her, Uma's approval of your appearance clear."
                );
            }
        } else {
            if (this.player.femininity >= UmasShop.UMA_CONSIDER_PC_FEM) {
                this.outx(
                    '"<i>So then, [name], what can I do you for?</i>"  She flashes you a knowing grin, the innuendo clearly intended.'
                );
            } else {
                this.outx(
                    '"<i>So then, [name], what can I do for you?</i>"  She flashes you a friendly smile, her professionalism ever present.'
                );
            }
        }

        this.buildCoreMenu();
    }

    /**
     * Build the primary interface menu to interact with Uma.
     *
     * @param noSex Indicates if the Sex button should be hidden from display.
     */
    private buildCoreMenu(noSex = false): void {
        if (noSex) {
            this.outx(
                "You sigh softly, but accept Uma's sexuality is the way it is and apologize for the problem.\n\n"
            );
            this.outx(
                "\"<i>Don't worry about that, it's nothing personal.  I just don't swing that way.  Although, if you were to make yourself a bit more feminine, I might consider it.  Maybe you could find yourself a nice little beauty salon somewhere?  I heard there are some treatments that can make you absolutely gorgeous.</i>\"\n\n"
            );
        }

        this.menu();
        this.addButton(0, "Massage", this.massageMenu);
        this.addButton(1, "Acupunct.", this.acupunctureMenu);
        this.addButton(2, "Talk", this.talkMenu);

        if (!noSex) {
            this.addButton(3, "Sex", this.sexMenu);
        }

        // addButton(4, "Train Loppe", trainLoppe); // Unfinished in the doc
        this.addButton(9, "Leave", this.telAdre.telAdreMenu);
    }

    /**
     * MASSAGEU
     */

    /**
     * Primary massage intro & selection menu
     * Edit Status: 95%
     */
    public massageMenu(): void {
        this.clearOutput();

        this.outx(
            "You ask if she'd like to have a little business.  You could really use one of her famous massage sessions.\n\n"
        );
        this.outx(
            '"<i>Of course, dear.  I have a selection of a few types of special massages I can give you, but you\'re only able to keep the effects of one of them, we can\'t risk disturbing your flow of chi, right?</i>" she says smiling happily, "<i>Here\'s the list.</i>"  She hands you a small catalogue with her available massages.\n\n'
        );
        this.outx(
            "You study the catalogue, noting the description of each one as you do so...\n\n"
        );
        this.outx(
            '"Your libido getting you down?  Find that it\'s just too easy for you to get turned on?  This special massage will help make you too relaxed to get horny for a few hours," reads the first one.\n\n'
        );
        this.outx(
            'The second one, on the other hand, states, "Want to get into the mood for some special fun, but finding it a challenge?  This special massage will get you primed and ready for some sweet, sweet loving."\n\n'
        );
        this.outx(
            '"Feel good and look better with this special modelling massage; the boys, girls and herms will be drooling over you while it lasts," reads the third; you\'re not surprised that most of treatments seem to have some sexual benefit.\n\n'
        );
        this.outx(
            '"Muscles sore and aching?  Weary down to your bones?  A nice relaxing massage can alleviate your pain and fatigue, and help you unwind more effectively," is how the fourth option describes itself.\n\n'
        );
        this.outx(
            'Finally, the last message in the catalogue reads, "Need a little more power?  Going to have a fight on your hands soon?  With the special arts of do-in, we can boost your muscles and let you deliver a real knock-out punch - it doesn\'t last forever, so be careful!"\n\n'
        );
        this.outx("You contemplate your choices carefully.");

        this.menu();
        this.addButton(0, "Relief", this.massageRelief);
        this.addButton(1, "Lust", this.massageLust);
        this.addButton(2, "Modelling", this.massageModelling);
        this.addButton(3, "Relaxation", this.massageRelaxation);
        this.addButton(4, "Power", this.massagePower);
        this.addButton(9, "No Thanks", this.massageNope);
    }

    /**
     * Player changed mind about MASSAGEU TIEMU
     * Edit Status: 100%
     */
    public massageNope(): void {
        this.clearOutput();

        this.outx(
            "You apologize and tell Uma that you've changed your mind, you don't want a massage right now.\n\n"
        );
        this.outx('"<i>Very well, dear.</i>"  Uma takes the catalogue back.');

        this.menu();
        this.addButton(0, "Next", this.enterClinic, true);
    }

    /**
     * Player selected "Relief" massage
     * Adds a 10% reduction to lust gain while active.
     * Edit Status: 100%
     */
    public static MASSAGE_RELIEF = 0;
    public static MASSAGE_RELIEF_BONUS = 0.9; // Multiplicative bonus to Lust gains
    private static MASSAGE_RELIEF_BONUS_TEXT =
        "<b>(10% Reduction to all Lust gains whilst active!)</b>";
    public massageRelief(): void {
        this.clearOutput();

        this.outx("You tell Uma that you're interested in the lust-relieving massage.\n\n");
        this.outx(
            '"<i>Are sure about that honey?  Wouldn\'t that make it hard to keep up with my little Loppe?</i>"\n\n'
        );
        this.outx(
            "You admit that it may, but you feel you could use it.  Besides, you do spend most of your time out in the wilderness; the people, to use the term loosely, out there aren't quite as understanding about sex as Uma's daughter is.\n\n"
        );
        this.outx(
            '"<i>I see... come along then,</i>" Uma replies, motioning for you to follow.  You nod and promptly do as she asks.'
        );

        this.massageMain(UmasShop.MASSAGE_RELIEF);
    }

    /**
     * Player selected "Lust" massage
     * Adds a 10% increase to lust gain while active.
     * Edit Status: 95%
     */
    public static MASSAGE_LUST = 1;
    public static MASSAGE_LUST_BONUS = 1.1; // Multiplicative bonus to Lust gains
    private static MASSAGE_LUST_BONUS_TEXT =
        "<b>(10% Increase to all Lust gains whilst active!)</b>";
    public massageLust(): void {
        this.clearOutput();

        this.outx("You tell Uma that you're interested in the arousal-inducing massage.\n\n");
        this.outx(
            '"<i>Oh... feel like getting some help handling my little Loppe, perhaps?</i>"\n\n'
        );
        this.outx(
            "You give her a playful smile and a wink, telling her that's not really any of her business; it's not good form for a [boyfriend] to kiss and tell.  Can she help you?\n\n"
        );
        this.outx(
            'Uma gasps in mock hurt.  "<i>Are you doubting my skills, dear?  Of course I can help you!  Follow me.</i>" Uma replies, motioning for you to follow her, and you trail along behind the mare masseur.\n\n'
        );

        this.massageMain(UmasShop.MASSAGE_LUST);
    }

    /**
     * Player selected "Modelling" massage
     * Adds a +10 bonus to femininity?
     * Edit Status: 90%
     */
    public static MASSAGE_MODELLING = 2;
    public static MASSAGE_MODELLING_BONUS = 10; // Flat bonus applied to femininity stat
    private static MASSAGE_MODELLING_BONUS_TEXT = "<b>(+10 Bonus Femininity whilst active!)</b>";
    public massageModelling(): void {
        this.clearOutput();

        this.outx(
            "You tell Uma that you're interested in the attractiveness-boosting massage.\n\n"
        );

        // Not too sure where "androgynous < female" falls on the official scale~ PAGING FENOXO!
        if (this.player.femininity <= 60) {
            this.outx(
                '"<i>I can see why you want this one, you could use a few touches to make you cuter, dear.</i>"\n\n'
            );
        } else {
            this.outx(
                "\"<i>Personally I think you're pretty enough as you are, but a few extra touches can't hurt, right dear?</i>\"\n\n"
            );
        }

        this.outx(
            "You thank her for the professional opinion, and indicate she should lead the way.\n\n"
        );

        this.massageMain(UmasShop.MASSAGE_MODELLING);
    }

    /**
     * Player selected "Relaxation" massage
     * Add a 10% reduction in damage taken?
     * Edit Status: 95%
     */
    public static MASSAGE_RELAXATION = 3;
    public static MASSAGE_RELAXATION_BONUS = 0.9; // Multiplicative bonus to damage taken -- these seem a little op with current values
    private static MASSAGE_RELAXATION_BONUS_TEXT =
        "<b>(10% Reduction to all Damage taken whilst active!)</b>";
    public massageRelaxation(): void {
        this.clearOutput();

        this.outx("You tell Uma that you're interested in the relaxing massage.\n\n");
        this.outx(
            "\"<i>I wonder if Loppe is the reason you're asking for this kind of massage... either way, sure, let's do this.</i>\""
        );
        this.outx(
            "You tell her that you won't deny or admit to Loppe being a cause.  However, it's also pretty rough out in the wilderness, so you could really use the relief.\n\n"
        );
        this.outx(
            '"<i>Very well... don\'t want you too burned out to deal my little Loppe afterwards.  Follow me.</i>"  Uma motions for you to follow her, and you trail after her, looking forward to your treatment.\n\n'
        );

        this.massageMain(UmasShop.MASSAGE_RELAXATION);
    }

    /**
     * Player selected "Power" massage
     * Add a 10% increase to damage inflicted?
     * Edit Status: 95%
     */
    public static MASSAGE_POWER = 4;
    public static MASSAGE_POWER_BONUS = 1.1; // Multiplicative bonus to damage done -- these seem a little op with current values
    private static MASSAGE_POWER_BONUS_TEXT =
        "<b>(10% Increase to all Damage inflicted whilst active!)</b>";
    public massagePower(): void {
        this.clearOutput();

        this.outx("You tell Uma that you're interested in the strength-boosting massage.\n\n");
        this.outx(
            '"<i>Feel like getting involved in a fight, do you?  Okay, let Uma give you a little help!</i>"  She grins happily.\n\n'
        );
        this.outx(
            "You thank her; her massage could mean the difference between life and death for you.\n\n"
        );
        this.outx(
            "\"<i>Now, now, dear.  There's no need to be so dramatic... but I'm worried about what you intend to do?  I have heard of, and even seen, some of the dangers that are out there, beyond the walls of this city.  Shouldn't you just come live with us, instead?  I'd hate to have anything happen to you, and Loppe would be crushed...</i>\"\n\n"
        );
        this.outx(
            "You tell her that you appreciate your sentiment, and you have no intention of hurting Loppe, but you have a mission and you are sworn to complete it; the demons must fall, and you won't stop until they have been defeated."
        );
        this.outx(
            '"<i>I understand.  In that case, follow me,</i>" Uma replies, motioning for you to follow her.  You let her lead the way and follow close behind.\n\n'
        );

        this.massageMain(UmasShop.MASSAGE_POWER);
    }

    /**
     * "Joiner" scene for all of the subtypes of massage selection
     *
     * @param selectedMassage
// int key of the massage type, for later application of benefits.
     * Edit Status: 95%
     */
    public massageMain(selectedMassage: number): void {
        this.clearOutput();

        this.outx(
            "The room is light, but not overwhelmingly bright, with cool breezes gently wafting through, tingling deliciously on your exposed [skin] and setting the chimes hanging from the rafters gently a-tinkle.  A number of large potted plants occupy the corners of the room, and there's even a tiny fountain with stones in it, the tumble of water over rocks creating a strangely soothing melody.  A small brazier produces a sweet, calming smell from incense burning in it.  The pride of the room is a sizable table, made from bamboo; it's covered in a white cloth, and has an upraised headboard with a hole in it that looks like it's big enough to fit your head through.\n\n"
        );
        this.outx(
            "\"<i>Before we get started, I'll have to ask you to hand over a few gems for my services, dear.  Even if you are my little Loppe's [boyfriend], this is still a business.</i>\"\n\n"
        );
        this.outx(
            "You tell her that's alright, fishing in your belongings for the gems that the mare masseur needs for this particular service... which you remember she hasn't told you yet?\n\n"
        );
        this.outx(
            "Uma slaps her forehead.  \"<i>Sorry about that, dear.  Usually I charge 100 gems for this kind of service, but since you're my little horsey-hopper's [boyfriend], I'll give you a discount... how about 75 gems instead?</i>\"\n\n"
        );

        // Not enough cashmonies to pay for massage
        if (this.player.gems < 75) {
            this.outx("You tell her that you don't have that many gems on you right now.\n\n");
            this.outx(
                "Uma sighs and shakes her head.  \"<i>Sorry dear, but if you can't pay I can't treat you.</i>\"\n\n"
            );
            this.outx(
                "You sigh in turn, and tell her that you accept that; she is a business-woman, after all.  You'll have to come back another day, when you do have the money to pay for it.\n\n"
            );
            this.outx(
                "Wishing her well, you calmly let yourself out of the shop and head back to camp."
            );

            this.menu();
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }

        this.outx(
            "You tell her that sounds fair, withdrawing the gems and handing them to her.\n\n"
        );
        this.player.gems -= 75;

        this.outx(
            '"<i>Thanks, dear,</i>" Uma  beams, pocketing the gems and walking towards the table.  "<i>Okay, get yourself stripped naked and lay down on the table, face up for me dear.</i>"\n\n'
        );
        this.outx("You promptly set about removing your [armorname], ");

        // If player is Exhibitionist
        if (this.flags[kFLAGS.PC_FETISH] >= 1) {
            this.outx(" flushing with arousal at the idea of being naked before the mare, ");
        }

        this.outx(
            "and move over to lay yourself on the table.  You get yourself comfortable and tell Uma that you're ready.\n\n"
        );

        this.menu();
        this.addButton(0, "Next", this.massageCommence, selectedMassage);
    }

    /**
     * Extensions to Massage Joiner.
     *
     * @param selectedMassage
// Massage bonus ID to apply
     * Edit Status: 95%
     */
    public massageCommence(selectedMassage: number): void {
        this.clearOutput();

        this.outx(
            '"<i>Very well, dear.</i>"  She cracks her knuckles ominously, "<i>This might hurt a bit, but bear with it,</i>" she adds, rolling up the sleeves of her kimono.\n\n'
        );
        this.outx("You swallow audibly and brace yourself for what's to come.\n\n");
        this.outx("Uma presses her elbow against your chest ");

        if (this.player.biggestTitSize() >= 1) {
            this.outx("between your [chest] ");
        }

        this.outx(
            "and pushes hard.  You can't help but scream at the initial bout of pain.  \"<i>Relax dear.  It will only hurt for a little while.</i>\"  You squirm at the pain but slowly it begins to dissipate... you're pretty sure Uma is pressing against your chest even harder than before, yet the pain is quickly ebbing away...\n\n"
        );
        this.outx(
            'Uma chuckles.  "<i>See dear?  I told you it would get better, but I\'m afraid it will hurt a bit more later... I have other spots to take care of,</i>" she warns, removing her elbow and moving away, only to return shortly with a small metal stick prominently featuring a rounded tip.  "<i>Get ready, dear.</i>"  You brace yourself for the next part of the treatment.\n\n'
        );
        this.outx(
            "The treatment on your front is painful, but at the same time it gets easier and easier to relax as it goes on... and it hurts less and less, until by the time Uma is finished it just doesn't hurt anymore...\n\n"
        );
        this.outx(
            '"<i>Very good, dear.  Now flip yourself over, it\'s time to take care of your back,</i>" she informs you'
        );

        if (this.player.femininity >= UmasShop.UMA_CONSIDER_PC_FEM) {
            this.outx(", her hand gently caressing your [hips] absent-mindedly");
        } else if (this.player.femininity >= UmasShop.UMA_CONSIDER_PC_AND) {
            this.outx(", her hand lightly touching your [hips] absend-mindedly");
        }

        this.outx(".\n\n");

        // Refactor to say something about nipples against the table?
        this.outx(
            "You move to do as she asks; it's a little awkward adjusting to having your face in the - thankfully cushioned - hole.  You wriggle about to settle yourself comfortably on the table, [nipples] squashing into the surface, but you manage to make yourself relaxed and tell Uma that you're ready once more.\n\n"
        );
        this.outx(
            `You yelp as Uma presses the metal rod ${
                this.player.tailType > 0 ? "to the base of your tail" : "to your lower back"
            }.  "<i>I'm going to have to trace a few spots on your back dear, to ensure your flow of chi is not obstructed.  It might hurt again, but be brave, ok?</i>"  You nod as best as you can and prepare yourself.\n\n`
        );
        this.outx(
            "By the time Uma is finished you feel sore all over, the pain on your back seemingly bringing back the pain on your front.\n\n"
        );
        this.outx(
            '"<i>It will be a little while before the flow of chi inside your body stabilizes, dear.  But by the time you\'re out of this clinic, you should feel much better,</i>" Uma explains.\n\n'
        );
        this.outx(
            "You thank the mare and get dressed, bidding her farewell before you exit the clinic. Once outside, true to her words, you start to feel better... in fact you feel amazing!  It's no wonder her treatment is expensive, you feel just... amazing!\n\n"
        );

        // Apply bonus & back to camp!
        this.applyMassageBonus(selectedMassage);
        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    public static MAX_MASSAGE_BONUS_DURATION = 24; // Duration of the bonus
    /**
     * Apply massage bonus. Bonuses are replaced when a new effect is placed on the player.
     * StatusAffects.UmasMassage for all bonuses
     *
     * @param selectedMassage
     */
    public applyMassageBonus(selectedMassage: number): void {
        if (selectedMassage < 0 || selectedMassage > 4) {
            this.outx("<b>Invalid massage bonus ID! Welp!</b>");
        } else {
            const statIndex: number = this.player.findStatusAffect(StatusAffects.UmasMassage);
            let bonusValue = 0;

            // Remove the old massage bonus if present
            if (statIndex >= 0) {
                this.player.removeStatusAffect(StatusAffects.UmasMassage);
            }

            if (selectedMassage == UmasShop.MASSAGE_RELIEF) {
                this.outx(
                    `<b>You feel so relaxed and mellow... you don't think you'll be able to get in the mood for sex while you feel this blissed out.</b> ${UmasShop.MASSAGE_RELIEF_BONUS_TEXT}`
                );
                bonusValue = UmasShop.MASSAGE_RELIEF_BONUS;
            } else if (selectedMassage == UmasShop.MASSAGE_LUST) {
                this.outx(
                    `<b>You feel so... wired! Your skin tingles with the slightest breeze, your heart races in your chest, and you lick your lips with eager nervousness.  You wanna fuck something so badly!</b> ${UmasShop.MASSAGE_LUST_BONUS_TEXT}`
                );
                bonusValue = UmasShop.MASSAGE_LUST_BONUS;
            } else if (selectedMassage == UmasShop.MASSAGE_MODELLING) {
                this.outx(
                    `<b>You feel sexier; you don't know if the massage has actually affected your looks, but you definitely have the confidence to strut your stuff!</b> ${UmasShop.MASSAGE_MODELLING_BONUS_TEXT}`
                );
                bonusValue = UmasShop.MASSAGE_MODELLING_BONUS;
            } else if (selectedMassage == UmasShop.MASSAGE_RELAXATION) {
                this.outx(
                    `<b>Your aches and pains have vanished, and you feel so relaxed and rested.  That really did the trick in curing what ails you.</b> ${UmasShop.MASSAGE_RELAXATION_BONUS_TEXT}`
                );
                bonusValue = UmasShop.MASSAGE_RELAXATION_BONUS;
            } else if (selectedMassage == UmasShop.MASSAGE_POWER) {
                this.outx(
                    `<b>Your muscles tingle and burn with energy; you feel like you could knock out a minotaur in one punch!</b> ${UmasShop.MASSAGE_POWER_BONUS_TEXT}`
                );
                bonusValue = UmasShop.MASSAGE_POWER_BONUS;
            }

            if (bonusValue != 0) {
                this.player.createStatusAffect(
                    StatusAffects.UmasMassage,
                    selectedMassage,
                    bonusValue,
                    UmasShop.MAX_MASSAGE_BONUS_DURATION,
                    0
                );
                this.flags[kFLAGS.UMA_TIMES_MASSAGED]++;
            }
        }
    }

    /**
     * Handle reducing the remaining time that the bonus is active for.
     * When expired, remove and include a message to the effect.
     */
    public updateBonusDuration(hours: number): void {
        const statIndex: number = this.player.findStatusAffect(StatusAffects.UmasMassage);

        if (statIndex >= 0) {
            this.player.statusAffect(statIndex).value3 -= hours;

            if (this.player.statusAffect(statIndex).value3 <= 0) {
                this.bonusExpired();
            }
        }
    }

    /**
     * Spam a message about the bonus being removed.
     */
    public bonusExpired(): void {
        this.outx(
            "\n<b>You groan softly as a feeling of increased tension washes over you, no longer as loose as you were before.  It looks like the effects of Uma's massage have worn off.</b>\n"
        );

        this.player.removeStatusAffect(StatusAffects.UmasMassage);
    }

    /**
     * ACUPUNCTURO
     */

    /**
     * Available Acupucture Types
     * All of the associated bonuses for the Acupuncture perks are listed here, and reference throughout the codebase. If Fenoxo wants to tweak the values,
     * you can do so easily here without having to go fishing through other files to find where they are referenced.
     */
    public static NEEDLEWORK_UNDO = -1;
    public static NEEDLEWORK_SPEED = 0;
    public static NEEDLEWORK_LUST = 1;
    public static NEEDLEWORK_DEFENSE = 2;
    public static NEEDLEWORK_MAGIC = 3;
    public static NEEDLEWORK_ATTACK = 4;

    public NEEDLEWORK_SPEED_PERK: PerkType = PerkLib.ChiReflowSpeed;
    public static NEEDLEWORK_SPEED_PERK_DESC =
        "Uma's Acupuncture Needlework has gifted you with the 'Chi Reflow - Speed' perk. As a result your strength is capped but speed reductions are halved.";
    public static NEEDLEWORK_SPEED_STRENGTH_CAP = 60;
    public static NEEDLEWORK_SPEED_SPEED_MULTI = 0.5;

    public NEEDLEWORK_LUST_PERK: PerkType = PerkLib.ChiReflowLust;
    public static NEEDLEWORK_LUST_PERK_DESC =
        "Uma's Acupuncture Needlework has gifted you with the 'Chi Reflow - Lust' perk. As a result your Lust resistance and Tease attack are enhanced, but Libido and Sensitivity gains are increased.";
    public static NEEDLEWORK_LUST_LUST_RESIST = 10;
    public static NEEDLEWORK_LUST_TEASE_MULTI = 10;
    public static NEEDLEWORK_LUST_TEASE_DAMAGE_MULTI = 1.1;
    public static NEEDLEWORK_LUST_LIBSENSE_MULTI = 1.1;

    public NEEDLEWORK_DEFENSE_PERK: PerkType = PerkLib.ChiReflowDefense;
    public static NEEDLEWORK_DEFENSE_PERK_DESC =
        "Uma's Acupuncture Needlework has gifted you with the 'Chi Reflow - Defense' perk. As a result your body has gained passive damage resistance and extra health, but speed is capped.";
    public static NEEDLEWORK_DEFENSE_DEFENSE_MULTI = 1.1;
    public static NEEDLEWORK_DEFENSE_EXTRA_HP = 50;
    public static NEEDLEWORK_DEFENSE_SPEED_CAP = 60;

    public NEEDLEWORK_MAGIC_PERK: PerkType = PerkLib.ChiReflowMagic;
    public static NEEDLEWORK_MAGIC_PERK_DESC =
        "Uma's Acupuncture Needlework has gifted you with the 'Chi Reflow - Magic' perk. As a result your spells are now more powerful, but regular attacks are weaker.";
    public static NEEDLEWORK_MAGIC_SPELL_MULTI = 0.25; // Additive bonus to the other magic damage bonuses
    public static NEEDLEWORK_MAGIC_REGULAR_MULTI = 0.75; // Multiplier tagged onto the end of damage calculations for the player.

    public NEEDLEWORK_ATTACK_PERK: PerkType = PerkLib.ChiReflowAttack;
    public static NEEDLEWORK_ATTACK_PERK_DESC =
        "Uma's Acupuncture Needlework has gifted you with the 'Chi Reflow - Attack' perk. As a result your regular attacks are more powerful, but your damage reduction is decreased.";
    public static NEEDLEWORK_ATTACK_REGULAR_MULTI = 1.1;
    public static NEEDLEWORK_ATTACK_DEFENSE_MULTI = 0.9;

    /**
     * Return a short string representation of the selected bonus index
     *
     * @param needleworkType
// Static index value of the selected bonus scene
     * @return
//
//
// String representation of the selected bonus scene
     */
    public needleworkString(needleworkType: number): string {
        if (needleworkType == UmasShop.NEEDLEWORK_SPEED) {
            return "\"Speed\"";
        } else if (needleworkType == UmasShop.NEEDLEWORK_LUST) {
            return "\"Lust\"";
        } else if (needleworkType == UmasShop.NEEDLEWORK_DEFENSE) {
            return "\"Defense\"";
        } else if (needleworkType == UmasShop.NEEDLEWORK_MAGIC) {
            return "\"Magic\"";
        } else if (needleworkType == UmasShop.NEEDLEWORK_ATTACK) {
            return "\"Attack\"";
        }

        return "<b>Somethin' dun fucked up.  Please insert bugreport!</b> ";
    }

    /**
     * To save having to bullshit around with the perk list description stuff, the functions been modified to call this function to get
     * descriptions about accpuncture PerkLib. Let's us contain all of the related content together in a neater manner.
     *
     * @param perkName PerkName currently being searched for
     * @return
//
// Description of what the perk does.
     */
    public listPerkDescription(perkName: string): string {
        switch (perkName) {
            case PerkLib.ChiReflowAttack.name:
                return PerkLib.ChiReflowAttack.desc();
                break;
            case PerkLib.ChiReflowDefense.name:
                return PerkLib.ChiReflowDefense.desc();
                break;
            case PerkLib.ChiReflowLust.name:
                return PerkLib.ChiReflowLust.desc();
                break;
            case PerkLib.ChiReflowMagic.name:
                return PerkLib.ChiReflowMagic.desc();
                break;
            case PerkLib.ChiReflowSpeed.name:
                return PerkLib.ChiReflowSpeed.desc();
                break;
            default:
                return "";
                break;
        }
    }

    /**
     * Calculate the current undo cost of the players needlework
     *
     * @return calculated cost
     */
    public needleworkUndoCost(): number {
        let baseCost = 125;

        if (this.flags[kFLAGS.UMA_TIMES_ACUPUNCTURE_UNDO] != 0) {
            // 25 per undo?
            baseCost += 25 * this.flags[kFLAGS.UMA_TIMES_ACUPUNCTURE_UNDO];
        }

        return baseCost;
    }

    /**
     * Figure out if the player currently has ANY needlework perk so we can modify scenes accordingly
     *
     * @return true if player has a needlework perk
     */
    public hasNeedleworkPerk(): boolean {
        const pType = this.getNeedleworkPerk();
        if (pType != undefined) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Figure out exactly WHICH needlework perk the player has
     *
     * @return Perk name that the player currently has
     */
    public getNeedleworkPerk(): PerkType | undefined {
        for (const perk of [
            PerkLib.ChiReflowAttack,
            PerkLib.ChiReflowDefense,
            PerkLib.ChiReflowLust,
            PerkLib.ChiReflowMagic,
            PerkLib.ChiReflowSpeed,
        ]) {
            if (this.player.findPerk(perk) >= 0) {
                return perk;
            }
        }
        return undefined;
    }

    /**
     * Apply a Needlework perk to the player.
     * I don't want to stuff the stat values themselves into the Perk itself, because then we have to figure out if a player was saved with different bonuses applied to the perk than what we currently have defined.
     * ie. it makes future balancing of the perks more of a chore. Rather, other code can just reference the static vars we have here using UmasShop.NEEDLEWORK_MAGIC_blah. It's still bad, but its an shader of bad lighter so fuck it!
     *
     * @param selectedSession
// Static bonus index to apply to the player
     */
    public applyNeedlework(selectedSession: number): void {
        if (selectedSession == UmasShop.NEEDLEWORK_UNDO) {
            this.player.removePerk(this.getNeedleworkPerk()!);
            this.flags[kFLAGS.UMA_TIMES_ACUPUNCTURE_UNDO]++;
        } else if (selectedSession == UmasShop.NEEDLEWORK_SPEED) {
            this.player.createPerk(PerkLib.ChiReflowSpeed, 0, 0, 0, 0);
            this.outx(`<b>${UmasShop.NEEDLEWORK_SPEED_PERK_DESC}</b>`);
        } else if (selectedSession == UmasShop.NEEDLEWORK_LUST) {
            this.player.createPerk(PerkLib.ChiReflowLust, 0, 0, 0, 0);
            this.outx(`<b>${UmasShop.NEEDLEWORK_LUST_PERK_DESC}</b>`);
        } else if (selectedSession == UmasShop.NEEDLEWORK_DEFENSE) {
            this.player.createPerk(PerkLib.ChiReflowDefense, 0, 0, 0, 0);
            this.outx(`<b>${UmasShop.NEEDLEWORK_DEFENSE_PERK_DESC}</b>`);
        } else if (selectedSession == UmasShop.NEEDLEWORK_MAGIC) {
            this.player.createPerk(PerkLib.ChiReflowMagic, 0, 0, 0, 0);
            this.outx(`<b>${UmasShop.NEEDLEWORK_MAGIC_PERK_DESC}</b>`);
        } else if (selectedSession == UmasShop.NEEDLEWORK_ATTACK) {
            this.player.createPerk(PerkLib.ChiReflowAttack, 0, 0, 0, 0);
            this.outx(`<b>${UmasShop.NEEDLEWORK_ATTACK_PERK_DESC}</b>`);
        }
    }

    /**
     * Present player with acupuncture details.
     * Edit Status: 85%
     *
//
// Some of the session descriptions might be a little... off. I've touched up one or two.
     */
    public acupunctureMenu(): void {
        this.clearOutput();

        this.outx(
            "You tell her that you want to try one of those acupuncture sessions of hers.\n\n"
        );

        let sessionCost = 125;

        if (this.hasNeedleworkPerk()) {
            sessionCost = this.needleworkUndoCost();
            this.outx(
                '"<i>Well, since I have already modified your chi in the past, we would first have to undo those changes... I cannot predict how further modifications to the natural flow through your body could interact.  Reversing past changes becomes increasingly more complex, so I have to warn you that it can become a costly process.</i>"\n\n'
            );
            this.outx(
                "You tell her that you understand what she's saying, and consider the decision carefully.  You ask her how difficult she estimates the process would be, given the past sessions you have endured.\n\n"
            );
            this.outx(
                `The mare takes a moment to inspect you carefully, seeming to look through rather than at you.  "<i>This could be quite a challenge, even for my skills... but, seeing as you're my little hoppers special someone, just for you I will have to ask for ${String(
                    sessionCost
                )} gems.  That's half the price of what I'd usually charge for work this difficult.</i>"\n\n`
            );

            this.menu();
            this.addButton(0, "Undo", this.needleworkSession, UmasShop.NEEDLEWORK_UNDO);
        } else {
            this.outx(
                '"<i>Are you sure, dear?  While the effects of a Do-in massage will fade eventually, acupuncture is fairly... permanent.  Though I can only give you the effects of one type of needlework at a time...</i>"\n\n'
            );
            this.outx(
                "You tell her that you understand what she's saying, and thank her for warning you. You ask her what kinds of effects you can expect from her needlework and how much it's going to cost you.\n\n"
            );
            this.outx(
                "\"<i>Well, fine.  So long as you're sure.  Normally, I would just show you a catalog, but I suppose you'd prefer needlework that can be used for combat, yes?</i>\"\n\n"
            );
            this.outx("You tell her that would probably be most useful to you, yes.\n\n");
            this.outx(
                '"<i>Keep in mind that while they have beneficial effects, due to the disruption they cause within the chi flow inside your body... they also come with some drawbacks.  That said, there are a few types of needlework that you might find useful...</i>"  She takes a deep breath, clearly running through a mental checklist, and then begins to speak.\n\n'
            );
            this.outx(
                "\"<i>First of all, if you focus on speed over strength,  I can increase your innate swiftness, making you less vulnerable to attacks or transformations that reduce your speed.  The drawback of this is that the maximum possible strength you can possess is lowered - though, as this prevents your muscles from growing so large they interfere with your speed, I think you'll agree that it's an easy sacrifice to make.\"</i>  The mare masseur notes.\n\n"
            );
            this.outx(
                '"<i>I understand that lust plays an important part in fighting, so I could make you more resistant to the advances of the creatures outside the city, as well as augment your ability to, well, entice them.  However this comes with a cost, you will constantly need to have sex, or your chi flow will begin to burn up, increasing your sensitivity as well as your libido.</i>"\n\n'
            );
            this.outx(
                '"<i>If you are uncertain of your toughness, your ability to resist the damage inflicted upon you by the creatures that prowl the wilderness, I can bolster that.  However, modifying the chi flow in such a manner causes your limbs to lose some of their power; you will be slower, and find it harder to escape from enemies that even your newfound resilience cannot protect you against.</i>"\n\n'
            );
            this.outx(
                '"<i>One of my special needleworks favored by mages will redirect chi from your muscles to your mind; your blows will be weaker, but your spells will be far more potent.</i>"\n\n'
            );
            this.outx(
                '"<i>Finally, I can use my needles to rearrange your chi flow and optimise your offense; your blows will be far more powerful, but your natural defense will be impaired, making you more vulnerable to strikes by the enemy.</i>"\n\n'
            );
            this.outx(
                `The mare tries to remember any other types of needlework that might be useful to you, but ultimately, she can't think of anything else.  "<i>That's all you might use, I think...</i>"  She then pauses.  "<i>As for a price, given you're my little Loppe's special someone, shall we say ${String(
                    sessionCost
                )} gems?  That's half-price of what I'd usually charge.</i>"\n\n`
            );

            this.menu();
            this.addButton(0, "Speed", this.needleworkSession, UmasShop.NEEDLEWORK_SPEED);
            this.addButton(1, "Lust", this.needleworkSession, UmasShop.NEEDLEWORK_LUST);
            this.addButton(2, "Defense", this.needleworkSession, UmasShop.NEEDLEWORK_DEFENSE);
            this.addButton(3, "Magic", this.needleworkSession, UmasShop.NEEDLEWORK_MAGIC);
            this.addButton(4, "Attack", this.needleworkSession, UmasShop.NEEDLEWORK_ATTACK);
        }

        // Add a leave button for both
        this.addButton(9, "No Thanks", this.needleworkTurnDown);

        // Cashmonies time
        if (this.player.gems < sessionCost) {
            this.outx(
                "You click your tongue and apologize to Uma, but you don't have enough gems to pay for your treatment...\n\n"
            );
            this.outx(
                'Uma sighs, "It\'s okay, dear.  Just come back when you do, my doors are always open."'
            );

            this.menu();
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }

        this.outx("You nod in understanding... now you stop and consider your options, ");

        if (this.hasNeedleworkPerk()) {
            this.outx("considering Uma's information.\n\n");
        } else {
            this.outx("wondering what you should choose...\n\n");
        }
    }

    /**
     * Player changes mind about going through with Accupuncture session.
     * Edit Status: 100%
     */
    public needleworkTurnDown(): void {
        this.clearOutput();

        this.outx(
            "You shake your head and tell Uma that you'd actually rather not get one of her acupuncture treatments at this point in time.\n\n"
        );
        this.outx(
            "\"<i>Very well, dear.  It's important that you think this through, they're not easy to undo.</i>\""
        );

        this.menu();

        this.addButton(0, "Next", this.enterClinic, true);
    }

    /**
     * Opening of the Accupuncture session itself. Minor variantion/cost changes
     * Edit Status: 100%
     *
     * @param selectedSession
// Static var indicating the desired outcome based on player selection. See NEEDLEWORK_ vars.
     */
    public needleworkSession(selectedSession: number): void {
        this.clearOutput();

        // Pay up
        // These could REALLY do with being a little longer. And also not being as akward.
        if (selectedSession == UmasShop.NEEDLEWORK_UNDO) {
            this.outx(
                "You tell Uma that you'd like her to remove the effects of your last acupuncture session from your body.  Then hand over the gems.\n\n"
            );
            this.outx(
                '"<i>Alright, dear,</i>" Uma replies, pocketing the gems.  "<i>It might take some time, but I think I can help you with that... follow me.</i>"\n\n'
            );

            this.player.gems -= this.needleworkUndoCost();
        } else {
            this.outx(
                `You tell Uma that you would like her to give you the ${this.needleworkString(
                    selectedSession
                )} acupuncture session, please. Then hand over the gems.\n\n`
            );
            this.outx(
                '"<i>Alright dear,</i>" Uma replies, pocketing the gems.  "<i>Let\'s go then.</i>"  She motions for you to follow her.'
            );

            this.player.gems -= 125;
        }

        this.menu();
        this.addButton(0, "Next", this.doNeedleworkSession, selectedSession);
    }

    /**
     * Actual scene for the acupuncture stuff to happen.
     * Edit Status: 90%
     *
     * @param selectedSession
// Static var indicating the desired outcome based on player selection. See NEEDLEWORK_ vars.
     */
    public doNeedleworkSession(selectedSession: number): void {
        this.clearOutput();

        this.outx(
            "The room is light, but not overwhelmingly bright, with cool breezes gently wafting through, tingling deliciously on your exposed [skin] and setting the chimes hanging from the rafters gently a-tinkle. A number of large potted plants occupy the corners of the room, and there's even a tiny fountain with stones in it, the tumble of water over rocks creating a strangely soothing melody.  A small brazier produces a sweet, calming smell from incense burning in it.  The pride of the room is a sizable table, made from bamboo; it's covered in a white cloth, and has an upraised headboard with a hole in it that looks like it's big enough to fit your head through.\n\n"
        );
        this.outx(
            '"<i>I want you to strip and lay face down on my table, while I go fetch my needles and some numbing cream.  Unless you\'d like me to stick needles in your body without anything to dull the pain?"</i>  Uma asks jokingly.\n\n'
        );
        this.outx(
            "You quickly shake your head, and indicate she should go, promising to be properly undressed and ready by the time she gets back.  As the mare heads off to fetch her things, you do as you were instructed; you quickly slip out of your [armorname] and position yourself on the table.  Sticking your head in the table's hole is a little awkward, and makes you feel rather vulnerable... which is natural, given what Uma mentioned about needles"
        );

        if (this.flags[kFLAGS.PC_FETISH] >= 1) {
            this.outx(
                ", although there's a certain thrill running through your body, the thought of being naked in front of Uma.  Your [nipples] respond in kind, squashed into the table beneath your [chest]"
            );
        }

        this.outx(".\n\n");

        this.outx(
            "It only takes a moment before Uma returns with a cart containing a small container and a vial of what you presume to be the numbing cream.  Out of the cart's drawer, Uma pulls a pair of gloves which slips over her hands nicely, then opens the small container.  From your current position it's hard to tell what it contains, but from the clicking sounds you hear, you assume it to be where she keeps her needles.\n\n"
        );
        this.outx('"<i>Are you comfortable, dear?  May I start?</i>" she asks.\n\n');
        this.outx(
            "You tell her that you're as ready as you'll ever be, so she may as well start.  \"<i>Ok, now try to relax.</i>\"  Her voice firm but still friendly as her hands set to work, gently touching your exposed back and lightly massaging it with her fingers.  The combination of nerves and her touch sends static through your skin.\n\n"
        );
        this.outx(
            '"<i>I\'ll be applying the cream now,</i>" she notifies you, slowly pouring the cold cream on your back and rubbing it all over, ensuring every single spot is covered before she puts the vial away.  You shiver and repress a verbal protest at the chill in her cream.  "<i>It will take a few minutes before you start to feel the effects, I want you to tell me when you no longer feel my fingers on your back.</i>"  She then begins a slow circular massage on your back.\n\n'
        );
        this.outx(
            "You promise you will, and wait patiently.  Slowly the sensation of her fingers fades away, until at last you aren't sure if she's even touching you any more, and you report this to the mare currently planning on sticking you full of needles.\n\n"
        );
        this.outx(
            "\"<i>Very good.  I'll start the treatment now, you might feel a slight pricking sensation, though it shouldn't hurt... if at any point it starts hurting, tell me and I'll do something to ease your pain, alright?</i>\"\n\n"
        );
        this.outx(
            'You tell her that you understand.  True to her words, you feel the slight pricking sensation of needles gently poking into your back. Some of them are removed shortly after, while others stay in place for a while longer.  Eventually, you feel all needles gradually being removed from your back and Uma happily declares,  "<i>All done!</i>"\n\n'
        );
        this.outx(
            "You ask if you can get up now, or do you need to stay where you are so that it has time to settle?\n\n"
        );
        this.outx(
            '"<i>No, you can get up and get dressed dear.  The needles are out and your chi should be stable enough now... though you won\'t feel much of a change until some time has passed. </i>"  She takes off her gloves and scratches her chin before continuing, "<i>I should think you will start to feel the changes soon; maybe by the time you get back to your home, if not shortly after.</i>"\n\n'
        );
        this.outx(
            "You thank her for her work, get yourself up and proceed to dress.  You politely excuse yourself and start the long journey back to your camp.\n\n"
        );

        this.applyNeedlework(selectedSession);

        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    /**
     * LIPFLAP COMMENCE.
     * Most of these will need breaking into multiple pages methinks.
     * Edit Status: 100%
     */
    public talkMenu(): void {
        this.clearOutput();

        this.outx(
            "You tell Uma that you'd like to chat; you're interested in getting to know her better, and who knows, maybe she can help you get to know her daughter better?\n\n"
        );
        this.outx('"<i>Sure, what would you like to talk about?</i>"  Uma replies with a smile.');

        this.menu();

        this.addButton(0, "Job", this.talkJob);
        this.addButton(1, "Sexuality", this.talkSexuality);
        this.addButton(2, "Loppe", this.talkLoppe);
        this.addButton(3, "Loppe's Dad", this.talkLoppesDad);
        this.addButton(9, "Back", this.enterClinic, true);
    }

    /**
     * Talk Job
     * Edit Status: 95%
     */
    public talkJob(): void {
        this.clearOutput();

        this.outx(
            "You tell her that you're curious about the work she does and what it can do.\n\n"
        );
        this.outx(
            '"<i>My work?</i>" Uma repeats in a thoughtful tone.  "<i>Well, I\'m something of a healer - my specific skills lie in acupuncture and do-in, a form of deep muscle massage.  As for what they can do... In short, my skills allow me to modify a person\'s flows of chi - I presume you\'ve heard of that?</i>"\n\n'
        );
        this.outx(
            'You shake your head, which prompts her to sigh.  "<i>Chi is the energy that permeates one\'s body, to put it simply.  Every living thing has a certain flow of chi, and this is what determines your talents, abilities and, some would argue, even fate.  Some talented individuals can actually gather chi from other beings, to some effect, and some, like yours truly, can manipulate the flow of the chi inside someone; although there is a limit to how much I can manipulate it,</i>" Uma explains.\n\n'
        );
        this.outx(
            "So, Uma manipulates the energy inside of people for a living?  But why would anyone want her to do that?  You ask this to the mare, hoping for clarification.\n\n"
        );
        this.outx(
            '"<i>Manipulating the chi inside someone can have various beneficial effects, such as improving strength, altering sexual drive, getting rid of pains, alleviating mood swings... basically anything you can imagine has a relationship, no matter how detached, to chi.</i>"\n\n'
        );
        this.outx(
            "You nod your head in understanding; that makes sense.  So, what's the difference between the massages - do-in, she called them? - and acupuncture?  Don't they both do the same thing?\n\n"
        );
        this.outx(
            'Uma smiles and shakes her head.  "<i>No, dear.  Do-in adjusts the flow of chi, such as increasing output in certain areas, or reducing them.  Picture this; your chi flows like a river, by enlarging or shrinking the stream, the river\'s strength will either increase or diminish, correct?  This is what Do-in does, it never cuts the flow of the river, just... adjusts it.</i>"\n\n'
        );
        this.outx(
            "You tell her that's correct, and you understand the analogy. So, how does acupuncture differ in its effects?\n\n"
        );
        this.outx(
            '"<i>During acupuncture I pierce key spots in your body with needles; these are much more complicated than Do-in, despite do-in not being simple to begin with.  Basically, using the previous analogy, acupuncture obstructs the flow of the river, so that it can flow elsewhere, or flow differently.  The effects of Do-in are just temporary, which means that given enough time, the river will return to normal, but acupuncture... that is permanent, dear.  Once a new pathway has been made for the flow of chi inside your body, it\'s there to stay... though with some work it might just be possible to remove the effects...</i>"  Uma rubs her chin in thought.\n\n'
        );
        this.outx("You nod your head thoughtfully, digesting what you have been told.\n\n");
        this.outx(
            '"<i>Another key point, is that acupuncture is much more disruptive to the flow of chi than do-in.  Usually, in order to make something better, or different, something else has to change... and not always for the better.  I could make you faster, able to move better, but that would seal some of the chi going into your muscles, which means you would never be as strong as you were meant to be...  though sometimes, depending on what you\'re trying to achieve, that could actually benefit you.</i>"  Uma smiles.\n\n'
        );
        this.outx(
            "You tell her that you appreciate her taking the time to explain her job to you; maybe at some point in the future you'll have a need for her special skills, but, right now, you think you've taken enough of her time.\n\n"
        );
        this.outx(
            '"<i>It\'s always pleasure speaking to the [man] that wooed my little Loppe, dear.  Come visit soon, will you?</i>"\n\n'
        );
        this.outx("You promise you'll try, and then head back to camp.");

        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    /**
     * Talk Sexuality
     * Edit Status: 90%
     */
    public talkSexuality(): void {
        this.clearOutput();

        this.outx(
            "You tell her that, if it's not too personal, you'd like to ask her some questions about her sexuality?\n\n"
        );
        this.outx(
            '"<i>Oh, I\'m okay with talking about that.  You\'re not the first person to ask me about that...</i>"  She looks distant for a short while, but then looks at you and smiles.  "<i>So, what do you want to know, exactly?</i>"\n\n'
        );
        this.outx(
            "You think for a while, and finally ask why she considers herself a lesbian?  Won't she have sex with herms too?  Wouldn't that make her bisexual?  In fact... what made her think of herself as a lesbian in the first place?\n\n"
        );
        this.outx(
            "Uma stops to think for a while then replies,  \"<i>Well... I guess it was my studies.  Being an acupuncturist means I have to know a lot about bodies in general, and while I do know all the ins-and-outs of male anatomy, I've always found girls more... beautiful.</i>\"  She thinks for a while longer, then shrugs.  \"<i>I suppose that's all I can say about that... I really don't know why I find girls more attractive, I just do.  And, well, I'm not entirely against having sex with males either, so long as they're pretty and girly to begin with, so maybe you're right.  Maybe I am more bi than lesbian.</i>\"\n\n"
        );
        this.outx(
            "So, it's not so much that she's unattracted to dicks as that she needs a fairly feminine face, and preferably physique as well, to get turned on by someone? You ask, interested.  Uma nods.  \"<i>That is correct, I like my partners pretty...</i>\"  She laughs lightly.\n\n"
        );
        this.outx(
            "You ask if that makes it at all challenging to find partners, when she's feeling in the mood?\n\n"
        );
        this.outx(
            "Uma giggles before replying, \"<i>Not at all.  I find that women in general tend to care more for 'natural medicine' than men... usually when men have chronic back pain, most of them would rather drink some kind of alchemic concoction to make it better, and to be honest it does work well. But the truth is that ingesting too many alchemical ingredients might lead to even more problems later; not to mention the chemical dependency.  Since my pins are a one-time thing, and there's no dependency, I get many visits from the more health conscious populace.  And let's just face it, [name].  Women are just that much more concerned about natural medicine than men... especially when it involves a 7 foot horse-woman poking needles in their bodies.</i>\"  Uma giggles once more.\n\n"
        );
        this.outx(
            "You ask casually if that implies the few men who do visit tend to be especially likely to be her type?\n\n"
        );
        this.outx(
            'Uma thinks for a while.  "<i>To be honest it\'s a fifty-fifty chance... usually the men that do show up happen to have been sent here by their wives and girlfriends.  Finding girly men is just very rare... though I do get the occasional client.</i>"\n\n'
        );
        this.outx(
            "That makes you think, and you ask how much effort Uma has to put into keeping her little tete-a-tetes discrete? After all, you don't think too many boyfriends, husbands or fathers would be happy to hear about her seducing their girlfriends, wives or daughters.\n\n"
        );
        this.outx(
            'Uma smiles at you mischievously.  "<i>On the contrary, my naive little friend.  This is an oriental clinic, and there are many types of therapy, for various problems, including sex life.  Some of the women I seduce are actually straight, and let\'s just say sometimes they need to be reminded of what a good penis can do for them.  And the only way to do that, well... is by making them want one in the first place.  A caress here, a press there, a little lick later... and they are practically on fire, orgasming time and again, begging me to fuck them.  The only problem is that I don\'t have the equipment.</i>"  Uma winks at you.  "<i>Once they leave my clinic, they\'re satisfied and much hornier than usual.  So the first thing they do is go home to share their pleasure with their husbands.</i>"\n\n'
        );
        this.outx(
            "You can't resist the wry grin as you comment that it must do wonders for the reputation of her business.\n\n"
        );
        this.outx(
            "Uma nods.  \"<i>It does, but as you can see, the clinic is pretty empty most of the time.  It just so happens that we're really expensive, especially considering our... extra services.  But don't worry, [name].  Since you're my little Loppe's [boyfriend], I'll be happy to give you a pretty good discount on our services.</i>\"\n\n"
        );
        this.outx(
            'You laugh at that, thanking her for her generosity and her time, and then tell her it\'s time for you to go.  Uma smiles at you and says, "<i>Come visit me again soon.</i>"\n\n'
        );
        this.outx(
            "You promise that you will, and then head out of the quaint little clinic and back to camp.\n\n"
        );

        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    /**
     * Talk about Loppe. Randomly selects a specific scene after selection.
     * Edit Status: 100%
     */
    public talkLoppe(): void {
        this.clearOutput();

        this.outx(
            "You tell her that you wouldn't mind hearing some stories about Loppe; what was she like as a little Loppe?  Maybe her mom's got some embarrassing secrets to share about her, you grin?\n\n"
        );
        this.outx("Uma taps her chin, thinking of something to tell you about...\n\n");

        // random call to one of the loppeTalks functors
        this._loppeTalks[UmasShop.rand(this._loppeTalks.length)]();
    }

    // private _sceneNum: number = 0;

    /**
     * Centralise the end-of-talk loppe stuffs
     */
    public talkLoppeJoiner(): void {
        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
        // addButton(1, "Debugz", talkMenu);
    }

    /**
     * Random talk scene about Loppe's Attitudes.
     * Edit Status: 90%
     */
    public talkLoppeAttitudes(): void {
        this.outx(
            '"<i>What do you think of Loppe?  How she acts?  Looks?  Behaves?</i>"  Uma asks with a smile.\n\n'
        );
        this.outx(
            "You're not quite sure what Uma's getting at and tell her as much, but finally declare that you'd probably call her girly.  A little on the tomboyish side, but, given she's a herm that only seems reasonable; it's hard to say what gender traits would be best for a person who is functionally both male and female.\n\n"
        );
        this.outx(
            "\"<i>That's true, but what you probably don't know is Loppe was a lot more troublesome when she was just a little hopper.  She was a lot more boyish, and if anyone called her a girl she'd happily start an all out brawl at a moments notice.</i>\"\n\n"
        );
        this.outx(
            "You think it over and note that makes sense; when she was that age, well, she'd hardly have been able to really tell the difference between the genders, and it's not like she would have had any problems convincing the boys she was one of them, right?\n\n"
        );
        this.outx(
            '"<i>Yes, especially since she was flat-chested back then... but she was quite a handful. The eldar would call for me regularly to discuss my little hoppers behaviour. I guess she was kind of a bully, so I had to discipline her many times.</i>"\n\n'
        );
        this.outx(
            "You note that's more of a surprise to you than Loppe being a tomboy; she's always so sweet and kindly when you're around her.  You can't deny that she's a little on the horny side, but still, she's a nice person.\n\n"
        );
        this.outx(
            "\"<i>That's because she underwent a very radical change when she finally hit puberty.  Most children get a little rebellious, but not my Loppe, oh no.  If anything she became obedient, almost to a fault. In fact... for a while I thought she was actually sick or worried about something.  But she assured me she was just tired of sitting through my scoldings, and didn't see a reason to challenge me anymore.  It was kind of cute too, she started asking me all kinds of questions, especially why she had both genders.</i>\"\n\n"
        );
        this.outx(
            "You note that it must have been a troubling time in her life; you remember going through puberty, and you can't imagine how hard it must have been to go through the hassles of things like the first period <i>and</i> uncontrollable erections simultaneously.  Though being the mother to a herm in puberty can't have been a picnic either...\n\n"
        );
        this.outx(
            "\"<i>It wasn't, but I enjoyed it either way.  Loppe and I grew a lot closer then.  I guess she just finally got tired of trying to be a boy and decided to embrace her femininity.  She had me teach her how to act as a girl, and for the most part she does fine, but I wouldn't be surprised if she slips up every once in awhile.</i>\"\n\n"
        );
        this.outx("Slips up?\n\n");
        this.outx(
            '"<i>Sometimes she\'ll let loose the foulest belches in public, or... </i>readjust<i> herself in public</i>" replies Uma, her hand cupping an imaginary bulge at her crotch.  "<i>She does things that a lady wouldn\'t let herself get caught dead doing when she forgets about her desire to appear lady-like.</i>"\n\n'
        ); // Changed this line pretty significantly, might wanna compare it etc
        this.outx(
            "Well, you can't say you've ever caught her doing anything like that... except for her tendency to wrestle you into bed, or having to nurse a very noticable erection in public, you joke.  You really can't see Loppe as the type to burp at all, though you admit she's a bit more a glutton than you would have expected such a dainty-looking lady like her to be.\n\n"
        );
        this.outx(
            "\"<i>Oh, but she of course you wouldn't catch her doing any of that, she's extra careful around you... believe me, I've seen her when she gets home after a date with you.  She's at least twice as tired as she usually is, no doubt due to keeping her boyish tendencies in check.</i>\"\n\n"
        );
        this.outx(
            "You wonder if maybe you should tell her that she doesn't have to try so hard to impress you; you want to be able to say you like her for who she is, the real her, not some act she forces herself to go through.  You don't realize you've been musing aloud until Uma responds.\n\n"
        );
        this.outx(
            "\"<i>Dear, that wouldn't help at all.  She wouldn't be with you if she thought you would leave her if she was rude, but she owes it to herself to act like a proper lady around you.  So the best you can do is pretend to buy into her act.</i>\"\n\n"
        );
        this.outx(
            "You sigh quietly and tell Uma you understand, but ask if maybe she could drop a hint to her daughter about trying too hard, hmm?\n\n"
        );
        this.outx(
            "\"<i>I can do that, but I don't think it's going to help.  When she was young I told her she didn't have push herself so hard, but she insists on doing so anyway.  She can be quite stubborn, you know?</i>\"\n\n"
        );
        this.outx(
            "You confess that you've had that impression from her, yes.  You thank Uma for giving you an insight into her daughter's history, but tell her it's time you were on your way.\n\n"
        );
        this.outx(
            '"<i>You\'re welcome, see you around.</i>"  Uma waves you goodbye as you excuse yourself and return to camp.'
        );

        // Join the exit back up from all the loppeTalks
        this.talkLoppeJoiner();
    }

    /**
     * Loppe Talk - The Carrot Incident
     * Edit Status: 90%
     */
    public talkLoppeCarrotIncident(): void {
        this.outx(
            '"<i>Tell me, [name].  Did you know rabbits love carrots?</i>"  Uma asks with a smirk.\n\n'
        );
        this.outx(
            "You tell her that's what people say, back in the village you come from.  But, then again, you smirk, they also say that horses love carrots too, and you verbally recount an incident in which a mare broke out of her pen and ate so many carrots from one of the village fields she was heartily sick.  You ask jokingly if Uma shares any favorite dishes with her daughter?\n\n"
        );
        this.outx(
            '"<i>Of course I do.  I happen to have a soft spot for carrot cake myself... but that\'s not why I asked.  As you know, my daughter is part equine and part leporid, so as you can imagine she loves carrots, right?</i>"\n\n'
        );
        this.outx(
            "You nod, proclaiming that it's a little cliché.  So, why is Uma talking about vegetables?\n\n"
        );
        this.outx(
            'Uma grins mischievously at you.  "<i>Did you know my little Loppe loves carrots so, so much... that she tried to have sex with one?</i>"\n\n'
        );
        this.outx(
            "...Okay, that's a story that you feel you need to hear, and you tell this to the dirty old mare who calls herself Loppe's mother.\n\n"
        );
        this.outx(
            "Uma smiles knowingly. \"<i>I thought that might pique your interest.  Well... Loppe was in a experimentative mood, and I'm pretty good at hiding my toys, so she couldn't find anything to sate her curiosity.  That is until she found a piece of carrot, and let's just say it had a pretty familiar shape... you know what I'm getting at?</i>\"\n\n"
        );
        this.outx("You can't resist the wry grin; did she really...?\n\n");
        this.outx(
            'Uma nods.  "<i>And I caught her going at it too.  Silly little Loppe, she thought she could hide the facts from her mother...</i>"  Uma shakes her head in mock disapproval.  "<i>She slipped the carrot out of herself as fast as she could manage and pretended she was just having a snack in the tub.  Judging by the look on her face when she took a bite, I could easily see she wasn\'t used to taste of carrot with her own... sauce...</i>"  Uma chuckles to herself.\n\n'
        );
        this.outx(
            "You ask in disbelief if Uma actually made her daughter eat her own carrot dildo?\n\n"
        );
        this.outx(
            'Uma shakes her head.  "<i>No no, of course not.  But back then Loppe wasn\'t so open about her sexuality either, and she had to make me buy into her argument.  Of course... I let her get away with it, but I laughed once I was sure she was out of earshot.</i>"  Uma smiles, recalling the event.\n\n'
        );
        this.outx(
            "You chuckle and suggest that Loppe probably never used carrots in that fashion again?\n\n"
        );
        this.outx(
            'Uma smirks.  "<i>Well, on certain lonely nights I did see a few carrots going missing from our stash...</i>"\n\n'
        );
        this.outx(
            "You can't resist a laugh, and tell Uma that you're grateful for her sharing such an intimate story about her daughter with you.  Isn't she a little worried you might tease Loppe about it, though?\n\n"
        );
        this.outx(
            "Uma grins mischievously.  \"<i>Dear... I'm counting on it.  Maybe she'll learn to leave my carrots alone so I can actually have a midnight snack for once.  Make sure you tell me how she reacted afterwards, okay?</i>\"\n\n"
        );
        this.outx(
            "You tell her that you make no promises and then excuse yourself; the chat was lovely, but you have to be moving on now.\n\n"
        );
        this.outx('"<i>Okay, see you around [name].</i>" Uma waves you goodbye.');

        // Join the exit back up
        this.talkLoppeJoiner();
    }

    /**
     * Loppe Talk - Loppe Puberty
     * Edit Status: 80%
     */
    public talkLoppePuberty(): void {
        this.outx(
            '"<i>By now, you must know about Loppe\'s stamina, right?  And that her cum production is also... quite elevated too, no?</i>"  Uma asks, smiling.\n\n'
        );
        this.outx(
            "You can't resist a wry grin as you comment that you might be familiar with what Uma is talking about, yes.\n\n"
        );
        this.outx(
            '"<i>But, did you know it caused her no end of problems when she was younger?</i>"\n\n'
        );
        this.outx(
            'You blink in surprise; you could have sworn Loppe told you that her "stamina" was the result of that demon\'s curse, and you pass this on to Uma.\n\n'
        );
        this.outx(
            '"<i>Make no mistake, dear.  It was one of the effects of the curse... but little Loppe\'s always been a bundle of insatiable energy.</i>"  Uma smiles.\n\n'
        );
        this.outx(
            'Be that as it may, surely her massive "discharges" owe more to magic than nature, you protest?\n\n'
        );
        this.outx(
            '"<i>I\'m afraid not... or at least not entirely.  When she was younger Loppe often would suffer... accidents, due to her cum production.</i>"\n\n'
        );
        this.outx(
            "Accidents, you ask?  Then the mental image hits you, and you muse aloud on a sort of combination of accidental erections and the ejaculate-equivalent of poor bladder control.\n\n"
        );
        this.outx(
            '"<i>Yes, she would spontaneously cum all over her lower garments.  Mind you, it wasn\'t an orgasm per se... more like a slowish unstoppable leak.  Other kids used to call her Furutama due to her problems.  But I took care of that.</i>"  Uma chuckles to herself.\n\n'
        );
        this.outx(
            "You note that it must have something of a trial for both Loppe and her mother.  Morbidly curious, you ask how Uma took care of Loppe's little leaking problem.\n\n"
        );
        this.outx('"<i>Morning drainings, dear.</i>"\n\n');
        this.outx("Drainings? You repeat in a puzzled tone of voice.\n\n");
        this.outx(
            "\"<i>Yes.  Before Loppe went out for the day, I would help her relieve the tension in her undeveloped balls.  Nowadays she can handle her heightened production just fine, but back then her balls weren't that big, so she couldn't stand her own body's metabolism.</i>\"\n\n"
        );
        this.outx("You can't resist chuckling and declaring Loppe must have enjoyed that.\n\n");
        this.outx(
            "\"<i>Not so much, as a matter of fact.  I mean, how would you feel if your mother had to give you a handjob every morning so you wouldn't soil your pants.  Sure, my little trotting hopper did try to do it herself, but she lacked the technique to fully drain herself... which still resulted in messy underwear. And as if doing it every morning wasn't enough, she had to do it at night too... or she'd wake up in a messy bed too.</i>\"\n\n"
        );
        this.outx(
            "You cluck your tongue; how did the two of them manage to put up with Loppe's puberty?\n\n"
        );
        this.outx(
            '"<i>With lots of patience, love and a helping hand.</i>"  Uma giggles, making a small pumping motion with her hand, as if stroking an invisible cock.\n\n'
        );
        this.outx(
            "You chuckle at Uma's sense of humor; she's so proud to be a dirty old mare now, isn't she?\n\n"
        );

        if (this.player.femininity >= UmasShop.UMA_CONSIDER_PC_FEM) {
            this.outx(
                "\"<i>Old? Why you... take off your clothes and hop on my table, I'll show you old!</i>\"  Uma replies with indignation.  \"<i>I promise you that by the time I'm done with you, you won't be able to stand on your own two feet, "
            );
            if (this.player.feet() != "feet") {
                this.outx("or whatever the term is for you, ");
            }
            this.outx("then we'll see who is old!</i>\"\n\n");
        } else {
            this.outx(
                '"<i>Old? Why you... if you were girly enough to be my type I would show you who\'s old!</i>"  Uma replies indignantly.  "<i>I promise you wouldn\'t be able to stand on your own two feet, '
            );
            if (this.player.feet() != "feet") {
                this.outx("or whatever the term is for you, ");
            }
            this.outx("then we'll see who is old!</i>\"\n\n");
        }

        this.outx("So, she's not denying she's a pervert and proud of it?\n\n");
        this.outx(
            "\"<i>Pervert?  Yes, though I fail to see what is so wrong with liking sex.  You only get to live once, dear... might as well as make the best with what you have, no?  But old... never call me old!  If anything I'm still in my prime!  Or you don't think I'm good-looking enough, by any chance?  Be careful with what you say though, dear.  I don't mean to threaten you, but I do know all pressure points in the body... any body...</i>\"  Uma glares at you, waiting for you to utter the right answer.\n\n"
        );
        this.outx(
            "You tell her that, yes, she's definitely a real silver fox - or silver mare, or whatever the term is for an attractive older woman.  Why, you can only hope Loppe takes after her mother when it comes to keeping her looks as she ages.\n\n"
        );
        this.outx('"<i>Good answer.</i>"  Uma snorts.\n\n');
        this.outx(
            "So, Uma really thinks dealing with Loppe's puberty wasn't so bad, you ask?  If Loppe's father had stayed, would she have been willing to go through it again with her next daughter?  And would she have been so cheerful if her rabbit lover had given her a bellyful of twins or triplets instead of just one lonely little Loppe kit?\n\n"
        );
        this.outx(
            "Uma looks distant for a moment, but quickly focuses back on you.  \"<i>Dear, when you've been through what I have, you learn not to dwell on what could have been... and instead focus on what is and its blessings.  I'm very fond of Loppe and I wouldn't mind if she had brothers or sisters.  Usa-chan might have disappeared, but her parting gift wasn't so bad, I think.  She left me with a bundle of hope I named Loppe, and I'm thankful for having my little laquine in my life.</i>\"\n\n"
        );
        this.outx(
            "You apologize for sticking your foot in your mouth, and tell Uma you've clearly kept her talking long enough.\n\n"
        );
        this.outx(
            '"<i>Oh, it\'s always a pleasure to talk to my little Loppe\'s [boyfriend].</i>"  Uma smiles at you happily.  "<i>Though call me old again and I\'ll make your life a living hell.</i>"  She adds, still smiling happily.\n\n'
        );
        this.outx(
            'You get your things and get ready to leave - before you can bring yourself to go, however, you can\'t resist asking; Uma said the other kids in the village where Loppe grew called her "<i>Furutama</i>". What does that mean?\n\n'
        );
        this.outx('"<i>It means full balls, dear.</i>"  Uma states matter of factly.\n\n');
        this.outx(
            "You blink in shock, then stifle a laugh.  Yeah, that sounds like Loppe, alright.  You shake your head with a smile, thank Uma for talking to you, and then head off again.\n\n"
        );
        this.talkLoppeJoiner();
    }

    /**
     * Loppe Talk - Loppe's Last Girlfriend
     * whoaboy. SublimeText, my hero~ <3
     * Edit Status: SHOOT ME.
     *
//
// Calling it 75%. I've been through all of it and some of the tensing seems off in places, but I've cleaned up a bunch of shit. I don't even know if this should stay;
     *
//
// It's good, but it's doesn't exactly fit with the style of anything else in CoC outside of Urta's Quest in a way, so...
     */
    public talkLoppesFirstGirl(): void {
        this.outx(
            '"<i>Oh, I know what would be a great story...</i>"  Uma smirks at you.  "<i>How would you like to hear about my little laquine\'s first time with a girl?</i>"\n\n'
        );
        this.outx(
            "You give it a moments thought, and tell the mare that would be nice; you're curious about just what Loppe's dating life was like before you met her.  Oh, she talks a bold game, but you're not entirely certain she's being honest with you...\n\n"
        );
        this.outx(
            '"<i>Very well, please make yourself comfortable, it\'s a bit of a long story.</i>" Uma suggests, motioning at a nearby chair and taking a seat herself.\n\n'
        );
        this.outx(
            "You follow her instructions, wondering just what kind of doozy the mare has to share with you this time.\n\n"
        );
        this.outx(
            '"<i>Back in our old village, there was a prostitute that went by name of Puffy Lips... but we just called her Puff.  Loppe had just blossomed into a beautiful young lady, so it\'s no surprise she drew plenty of stares when she walked around the streets-</i>"'
        );
        this.outx(
            "Wait, her mother actually named her Puffy Lips?  Seriously?  You interject.\n\n"
        );
        this.outx(
            'Uma chuckles.  "<i>Of course not, dear.  This was just her street name... though her last name was Kuchibiru, which means lips...</i>"\n\n'
        );
        this.outx(
            "You shake your head, not sure you want to ask why she'd use such a street name.  You tell the mare to continue; she was saying that Loppe had been blossoming into a pretty young herm who caught the eyes of many in the village?\n\n"
        );
        this.outx(
            '"<i>Yes.  One day, I had my little Loppe take a request to the local carpenter, which happens to be close to where Puff used to... hunt.</i>"\n\n'
        );

        this.menu();

        this.addButton(0, "Next", this.talkLoppesFirstGirlPart2);
    }

    public talkLoppesFirstGirlPart2(): void {
        this.clearOutput();

        this.outx("<b>Years ago in a village to the east...</b>\n\n");
        this.outx(
            "Bored.  She was utterly, totally bored. There are good days, and there are slow days... but today wasn't just a slow day, it was completely dead.  Not even her regulars came to see her.\n\n"
        );
        this.outx(
            "Puff had been standing in her usual corner next to the carpenter.  The old man, being a fan of her services, didn't mind having her hang around.  However, apparently he was way too busy to indulge.  So Puff had been left all alone and bored bored... so bored.  It does not do well for a nymphomaniac like her to stand in a corner for so long without a big cock shoved between her legs, or hell, even a fine pussy to lick.  One of the perks of being bisexual, anything goes!  She laughed to herself, yes, anything goes indeed.  But today nothing seemed to be going... or is it coming?  The slutty wolfess chuckled to herself at her own joke.  Maybe she should go home and whip out \"ol' thrusty\".  That's what she liked to call her carved-wood dildo...\n\n"
        );
        this.outx(
            "Loppe hummed to herself as she made her way through a familiar, but seldom visited, part of town where the local carpenter made his trade.  Mom had warned her to be wary of strangers, since this side of the town was full of people with questionable interests... or so said mom.  Thus far she hadn't seen a single weird individual.  Most people she passed by seemed to be busy with their own tasks; fishermen carrying buckets of fish to sell on the main street; mailmen busy with deliveries and the occasional street performer buying make-up for their street shows.  Along the way, Loppe stopped by a bakery to eye what tasty delicacies they had to offer.\n\n"
        );
        this.outx('"<i>Can I help you, dear?</i>"  The cat behind the counter asked.\n\n');
        this.outx(
            '"<i>Oh, umm, no thanks miss, just browsing, that\'s all.</i>"  Loppe smiled.\n\n'
        );
        this.outx(
            "The elderly cat smiled and replied, \"<i>Aren't you a cute little thing?  If you see anything you'd like, don't hesitate to call.</i>\"\n\n"
        );
        this.outx(
            "Loppe nodded and continued to browse... until her eyes set upon a wonderful sight; a slice of carrot cake, fresh from the oven.  Being part rabbit and part horse, two species known to love carrots, Loppe's mouth instantly watered. She eagerly looked into her small purse, but she only had a few gems, not nearly enough to buy the cake.  Loppe sighed, well... best not dwell... maybe when she made it home her mother would be willing to reward her with some gems for her service?\n\n"
        );
        this.outx("With that in mind, Loppe made her way towards the carpenter...\n\n");
        this.outx(
            "Puff was on the prowl, trained eyes of a master quickly scanning the crowd for any potential customer. Heck, she'd settle for just a tryst.  She was getting so desperate for a quick shag she might seriously contemplate working for free.  But everyone seemed to be so busy, no one even turned their heads to look at her. The only one not busy was that young bunny browsing the cake shop...\n\n"
        );
        this.outx(
            "Puff sighed.  Yep, ol' thrusty was going to see some action today.  She was about to turn and head home when a sudden gust of wind hit her right in the face with a stray piece of paper.  Struggling to remove the offending litter with a growl, she saw... it was as if Marae herself had answered her pleas.  Fourteen inches of equine deliciousness, with a pair of heavy, cum churning balls swinging under it, it was enough to make her lick her lips with a wolfish smile, and who was it attached to?  Slowly looking up - what the? - That was the young bunny girl she saw browsing the bakery earlier! The young bunny quickly used her hands to push her short robes down and hide her package, looking left and right to see if anyone had spotted her, then sighing with relief. That must have been embarrassing... But luckily someone did spot her!\n\n"
        );
        this.outx(
            "Somehow, then and there, Puff just knew she had to have that young bunny over for lunch. Taking a quick look at her pocket mirror to see if she was presentable enough she cleared her throat and struck the sexiest pose she could muster whilst leaning against the wall to the carpentry.\n\n"
        );
        this.outx(
            'When Loppe approached the carpentry, written request in hand, a melodic, feminine voice called,  "<i>Hey, bunny-girl!</i>"\n\n'
        );

        this.menu();

        this.addButton(0, "Next", this.talkLoppesFirstGirlPart3);
    }

    public talkLoppesFirstGirlPart3(): void {
        this.clearOutput();

        this.outx(
            'Loppe blinks in surprise, wondering who was talking to her.  "<i>Yes?  Who?</i>" She began, looking around and then realising who was calling to her...  "<i>Oh, Ms. Puff, hello.</i>"  She replied, quietly.  She still wasn\'t really sure why her mother and everyone else seemed to call her "Puffy Lips", or "Puff" for short - though she had to admit, the she-wolf\'s lips certainly looked kissable.\n\n'
        );
        this.outx(
            "She licked her own lips nervously; the busty wolfess had been a prominent star in more than a few wet dreams.  She felt a distinctive twitch from her nethers and cursed in the privacy of her head, quickly falling into the breathing exercises her mom had helped her develop to help her control little <i>incidents</i> like this.  In a meditative fashion she inhaled and exhaled, hoping to quell her erection before it grew to full prominence.\n\n"
        );
        this.outx(
            '"<i>Hey, are you okay?</i>"  Puff asked, as the girl seemed to be having some trouble with her breathing.\n\n'
        );
        this.outx(
            "\"<i>I-I'm fine.</i>\"  Loppe squeaked, unable to look the wolfess in the eye and, indeed, trying to avoid looking at her at all, lest she be drawn to the she-wolf's gorgeous, big, beautiful, soft, wondrous breasts...\n\n"
        );
        this.outx(
            '"<i>Aww... don\'t be like that.  You can tell Puff all about your problems, dear.  Unless your problems have something to do with this?</i>"  She opened her own robes, displaying the pair of orbs sitting upon her chest, nipples erect and pointing accusingly at Loppe.\n\n'
        );
        this.outx(
            '"<i>I-I-I...</i>"  Loppe stammered, the laquine trailing off as her eyes glued to the massive orbs that transfixed her, like a mouse caught under the eyes of an owl.  One of her more recent dreams came to mind, and unthinkingly her fingers flexed, itching to squeeze and caress those beautiful boobs.\n\n'
        );
        this.outx(
            '"<i>You know... I was looking at you browsing the bakery earlier and I couldn\'t help but notice what a pretty friend you have...</i>"  The wolfess teased with a smile.\n\n'
        );
        this.outx(
            'Loppe blinks her eyes in confusion.  "<i>Friend?</i>"  She repeated softly.\n\n'
        );
        this.outx(
            'The slutty wolfess grins seductively before reaching towards the Laquine\'s groin and gently feeling her up.  "<i>This friend, I mean.</i>" Loppe squeaks in shock, hardly daring to breathe thanks to the wolfess\' surprising actions.  "<i>You should let him out once in a while.  It can\'t be good for you to keep him cooped up for so long, dear.</i>"  Licking her lips and sucking on her index finger absent-mindedly, Puff adds.  "<i>If you want... I\'d be happy to show you why I\'m called Puffy Lips.</i>"\n\n'
        );
        this.outx(
            "Forcefully, Loppe leaped away, blushing like mad.  \"<i>I'm sorry, Ms Puff, but I've got to deliver an erection - I mean, a request from my mom and then get back home, right away!</i>\"\n\n"
        );
        this.outx(
            "Puff clicks her tongue.  \"<i>Oh, surely you can spare a few minutes with little me?  I promise I don't bite... much.  Plus your friend down there looks like he really needs it.  How about it?  Just pay me a few coins and I'll give you the time of the day.</i>\"  She winks.\n\n"
        );
        this.outx(
            '"<i>P-pay you? I don\'t even have the money to pay for a piece of carrot cake!</i>"  Loppe stammered, taking several steps back, powerful lapine legs already flexing in anticipation of making a dash for the carpentry before things got really embarrassing.\n\n'
        );
        this.outx(
            "Shit!  If she didn't do something quickly, Puff was going to lose that nice horse-cock of a girl and have to resort to ol' thrusty!  \"<i>W-Wait!</i>\"  She yelled before the laquine could bolt away.\n\n"
        );
        this.outx(
            '"<i>W-what?</i>"  Loppe asks, still ready to flee, but too curious - and, despite herself, turned on - to resist.  "<i>Tell you what, it turns out today is really slow... so let\'s make a deal. You come with me and let me take a closer look at your friend, and I\'ll let you do whatever you want with these.</i>"  She gently lifts her boobs.  "<i>For F-R-E-E.</i>"  She smiles.\n\n'
        );
        this.outx(
            "Loppe just stood there, poleaxed... She had the nagging worry that, if she did this, her mother would be so mad with her.  But, at the same time, this was Puffy Lips, the she-wolf who haunted her most erotic dreams.  What to do...\n\n"
        );
        this.outx(
            "Realizing that Loppe still wasn't convinced she hurriedly added, \"<i>Okay... let's sweeten the deal... come with me and I'll even buy you a slice of carrot cake. What do you say?</i>\"  Puff looked at her expectantly,  tail wagging worriedly behind her.\n\n"
        );

        this.outx(
            'A free live reenactment of her wet dreams with a sexy she-wolf, plus free carrot cake!?  Loppe made the only answer she could.  "<i>Okay.  But I absolutely have to do this job for my mom first - she\'ll be so mad if I don\'t get it done.</i>"  She declared.  Grinning wolfishly Puff replied,  "<i>Fine, go ahead, I\'m not going anywhere... but do hurry, hmm?  And what should I call you, cutie?</i>"\n\n'
        );

        this.outx(
            '"<i>...Loppe. My name\'s Loppe Kemono.</i>"  The laquine answered.  "<i>Good... I\'ll remember that.  So hurry along with your task, Loppe, and when you\'re done go to my place, over there.</i>"  She points towards a small house a little ways away.  Slowly approaching the laquine, she whispers in her ears.  "<i>I\'ll be waiting...</i>"  With that the wolfess sashays away to her home.\n\n'
        );
        this.outx(
            "Swallowing nervously, heart pounding like a drum, Loppe does her best to not watch Puff go - she's already hard enough, after all.  Long minutes pass as she tries to quell her raging erection, and then finally she remembers what she's supposed to be doing and heads to the carpentry store.\n\n"
        );
        this.outx(
            "Back in her house, Puff goes to the bathroom to freshen up and prepare for the young laquine.  But first, she should add the laquine's name to her list.  Being a hooker and proud of her trade, she kept a list with the names of all customers she'd serviced in the past.  It was sorta like a trophy list... but she marked the people who had been able to pleasure her the most, for future contact.  Well, she hoped this girl knows how to use her pony, she really needed more favorites on her list. Humming to herself she quickly retrieved the notebook from the cupboard nearby, and carefully added Loppe's name to it, then she closed it and stripped naked; those clothes would only get in the way...\n\n"
        );

        this.menu();

        this.addButton(0, "Next", this.talkLoppesFirstGirlPart4);
    }

    public talkLoppesFirstGirlPart4(): void {
        this.clearOutput();

        this.outx("<b>Moments later in Puffy Lips' house...</b>\n\n");
        this.outx(
            "Loppe, swallowing nervously, mustered her courage and managed to knock loudly on the she-wolf's door.  She could hardly believe she was about to do what she was going to do... \n\n"
        );
        this.outx('"<i>It\'s open.</i>" Loppe hears through the door. Well, here goes...\n\n');
        this.outx(
            "Loppe swallows hard, at once loving and hating the foot-long cock already beginning to form itself into a tell-tale bulge in her dress, eyes fixed on the scantily clad form of her soon-to-be lover.  She greedily drinks in the sight of the wolfess' plump, kissable, cock-sucking lips framing her gorgeous face, her beautiful orange eyes hooded in sultry anticipation.  Down her gaze sweeps, over the mighty swell of Puff's bosom, the great mammary orbs covered in her beautiful coffee-cream fur, past her breeder's hips and oh-so-fuckable ass to the swollen, greedy, fem-slime-seeping netherlips from which the whore takes her street name.  Loppe's nose twitches, eagerly drinking in the heady, intoxicating scent of Puff's arousal until she feels drunk on smell alone.\n\n"
        );
        this.outx(
            '"<i>See something you like?</i>"  Puff asks, grinning seductively.  "<i>I can tell you want me, that longing gaze of yours... bet you caught a whiff of my scent, no?  Bet that bulge hidden under your clothes is bothering you too, no?  Want to touch me?  Want some S-E-X?  Maybe see why I\'m called Puffy Lips?</i>"  Puff teases the young laquine, trying to entice some courage into the nervous Loppe.\n\n'
        );
        this.outx(
            "Mindlessly, Loppe shrugs off her dress, letting it fall abandoned to the floor.  Cock thrusting before her like a spear, the rabbit-horse herm strides towards the wolfess with an incongruously predatory air.  Her only thought in mind was to bury her shaft into Puff's waiting hole.\n\n"
        );
        this.outx(
            '"<i>Oh, is that for me?  Lovely!  I love it!  I want to take it for a test drive right now!</i>"  The wolfess giggles, falling back onto her bed and spreading her legs wide to allow the laquine\'s throbbing member easy access to her own plump, well-used vagina.\n\n'
        );
        this.outx(
            "With a mighty spring of her powerful rabbit legs, Loppe pounces bodily upon the wolfess, kissing her so fiercely she might as well be biting her in spirit.  With the clumsiness of an eager virgin, she grinds her cock into Puff's muff, too impatient and unsure of herself to properly slot herself into place.\n\n"
        );
        this.outx(
            'Puff, being an experienced lover, takes hold of Loppe\'s rock-hard horse-prick and gives it a squeeze, drawing an excited gasp from the eager laquine.  "<i>This looks painful... better do something about it!</i>" Puff teases, aligning the shaft with her own throbbing pussy.\n\n'
        );
        this.outx(
            '"<i>P-please!</i>" Loppe begs, grinding and thrusting herself into the she-wolf\'s hand.  All sanity is gone; all that remains is the need to fuck and breed, to strip herself of her masculine virginity at last.  Puff simply releases the laquine\'s member and grins at her.  "<i>No one is stopping you dear, all you gotta do is hit the right spot!</i>"\n\n'
        );
        this.outx(
            'With a groan, Loppe immediately thrusts herself home, sinking herself to the hilt in one brutal thrust.  "<i>Ow!  Not so rough!</i>"  Puff protests.\n\n'
        );
        this.outx(
            '"<i>Sorry...</i>"  Loppe moans, shuddering at the strange, new, absolutely wonderful experience of being surrounded by the she-wolf\'s warm, wet cunt.\n\n'
        );
        this.outx("\"<i>It's okay... I'm fine... feeling good?</i>\"\n\n");
        this.outx('"<i>Yesss.</i>" Loppe hisses.\n\n');
        this.outx(
            '"<i>Good.</i>"  Reaching behind Loppe to gently brush at her equine tail and grab her hips, Puff continues to instruct Loppe on the finer points the female anatomy.  "<i>Now thrust your hips like this... right there,</i>"  She says, gently pulling the young laquine towards her.\n\n'
        );
        this.outx(
            'The laquine gives herself over to the ministrations of her more experienced lover, anxious to learn how to make this feel even better than it already is, tongue lolling out in bliss.  "<i>This... this is incredible, Puff!</i>" She gasps.\n\n'
        );
        this.outx(
            'The wolfess giggles.  "<i>Careful Loppe, don\'t want to shoot too soon, do you?</i>"\n\n'
        );
        this.outx(
            "As if speaking the words of prophecy, Loppe cries out, arching her back and rolling her eyes as a familiar-yet-different sensation boils its way up from the depths of her heaving, churning, quaking balls.  A great flood of cum erupts out of her depths, gushing into the wolf's waiting pussy as the laquine squeals her ecstasy.  Moments later, her load is shot and Loppe slumps over, heaving for breath.  However, her cock remains stiff and erect, and she keeps herself locked into her lover's pussy, deliberately thrusting inside and doing her best to use her flare like a wolf-herm would use her knot.\n\n"
        );
        this.outx(
            '"<i>Still hard?  Well, I guess that can be expected since you\'re young, no problem.  Puff knows how to deal with your kind.</i>"  She gives Loppe a grin that can only be described as... wolfish.\n\n'
        );
        this.outx(
            'Loppe grins back at her, just as wolfishly, eyes burning with lust.  "<i>You mean it?  I can go again?</i>" \n\n'
        );
        this.outx(
            "\"<i>Of course you can girl.  You're not satisfied yet, are you?  I sure ain't... we can keep going until you're completely sated.  Now start fucking me!</i>\"  Puff begins bucking against Loppe, eager to get her started once more.\n\n"
        );

        this.outx(
            'Loppe squeals, and then she starts to thrust back and forth herself, eagerly pistoning herself into Puff\'s pussy once more.  "<i>So, we get to do this until I\'m too tired to cum anymore, right?</i>" She giggles with anticipation.  "<i>Goody!  This is a lot more fun than using my hand... maybe I\'ll be done in an hour this time, instead of an hour and a half!</i>"\n\n'
        );
        this.outx(
            'At this Puff\'s ears suddenly perk up as she looks at Loppe, startled.  "<i>Oh!  Wait - Ah - Did I hear you right? - Oh, yes - An hour and a half?</i>"\n\n'
        );
        this.outx(
            '"<i>Yeah, that\'s about normal for me to use up all the cum in my balls.  My horse half gives me balls with lots of room in them, rabbit half lets them fill up faster.</i>" Loppe grunts, continuing to thrust into the she-wolf even as she talks. \n\n'
        );
        this.outx(
            'Puff starts having second thoughts about this arrangement.  "<i>Err, maybe we shouldn\'t go at it that long - Ahh - it might not be healthy.</i>"\n\n'
        );
        this.outx(
            '"<i>What? But you promised!</i>" Loppe pleads, eyes widened to make herself more appealing.  "<i>Plus, weren\'t you \'going to fuck me until you ran my balls dry\'?</i>"  She quotes the wolfess jokingly.  "<i>I thought you took pride in being a - Yesss - a whore, and never left a customer unsatisfied.</i>"  Loppe continues to tease.\n\n'
        );
        this.outx(
            '"<i>That sounded like a challenge... okay!  You\'re on bunny-girl!</i>"  Puff replies with a grin.\n\n'
        );

        this.menu();

        this.addButton(0, "Next", this.talkLoppesFirstGirlPart5);
    }

    public talkLoppesFirstGirlPart5(): void {
        this.clearOutput();

        this.outx("<b>Many orgasms later...</b>\n\n");
        this.outx(
            "\"<i>I - oh, oh Marae's bounty, I'm cum...</i>\" Loppe trails off in a moan as cum explodes from her one last time.  \"<i>I - Marae - I'm fuh-finally done...</i>\" She groans, sliding bonelessly forward onto her partner, a landing that is well-cushioned by both her lover's swollen, heaving breasts and the pregnant-looking fluid-filled bulge of her gut.\n\n"
        );
        this.outx(
            "Puff's fur is completely caked with spilled laquine cum; her eyes have since rolled to the back of her head; her well-used pussy is now gaping open and oozing cum out of her bloated belly.  In her current state, all Puff can manage is one last dry heave as her tongue lolls out of her mouth and she closes her eyes, passing out.\n\n"
        );
        this.outx(
            '"<i>You... That was incredible, Puff.  Thanks.</i>"  The laquine give a peck on the comatose she-wolf\'s cheek.  "<i>Sorry, but I really have to get back now.</i>"  She says, redressing herself and making her way home.\n\n'
        );
        this.outx(
            "As she began heading merrily home, the laquine whistled with glee; she just got laid!  And by the utterly gorgeous Puffy Lips, no less!  Nothing could ruin her day now... at least, not until she took a look at the sun...\n\n"
        );
        this.outx(
            '"<i>Oh crap!  Mom\'s gonna kill me for staying out this late!</i>"  The half-breed wailed, clasping her head in anguish.  She promptly began sprinting home at full speed, desperate to get there as quickly as possible and assuage the full fury of a mother whose daughter is out past her bedtime.\n\n'
        );

        this.menu();

        this.addButton(0, "Next", this.talkLoppesFirstGirlPart6);
    }

    public talkLoppesFirstGirlPart6(): void {
        this.clearOutput();

        this.outx("<b>Uma's detailed description of events over...</b>\n\n");
        this.outx(
            "...That, you finally manage to say, was quite a story.  So, was Uma really that mad Loppe was out late?\n\n"
        );
        this.outx(
            '"<i>Not that much, no.  I grounded her of course, but when I learned what she had done... then I was really mad.  I taught my little girl better than to hang out with Puffy Lips and her kind.  Though I suppose some good came of it, since she stopped having wet dreams about that vulgar wolf bitch.</i>"\n\n'
        );
        this.outx(
            "Having done it with her for real meant the dreams were no longer as interesting? You suggest.\n\n"
        );
        this.outx(
            "\"<i>I don't really know... perhaps that is what happened, or maybe finding out what happened to Puff is what put her off.  I can't tell.</i>\"\n\n"
        );
        this.outx(
            "What happened to Puff? You repeat, warily.  So, something happened between them?\n\n"
        );
        this.outx(
            "\"<i>No, nothing happened between them.  Puff wasn't the type of person to take a girlfriend or have anything to do with anyone... she's always been a free spirit in that regard.  I mean, she wasn't the only prostitute around, she was just the most notorious one.  Being a nymphomaniac had a hand in that, I suppose. But back to the question at hand.  Several days after Loppe's little tryst with Puffy Lips I heard an interesting bit of gossip from a client.  I heard Puff had joined the local convent.</i>\"  Uma grins.\n\n"
        );
        this.outx(
            "You can only blink at that and flatly ask why; as startling as it probably was the first time around, you would have thought someone like Puff would, after she had recovered, jump at the chance to keep Loppe as her permanent personal fuck-toy.\n\n"
        );
        this.outx(
            'Uma chuckled to herself.  "<i>Apparently Puff was cured of her nymphomania, so she no longer cared that much about sex.  She became a real upstanding citizen too, doing charity, caring for the orphaned children, basically she became an exemplary nun.  I guess having sex with my little Loppe was too much for her... serves her right for trying to seduce my little hopper!</i>"\n\n'
        );
        this.outx(
            "You can only shake your head and tell her that you find that hard to believe.  After all, you and Loppe are still going out, and you've had sex more than once, haven't you?  But, regardless, you can't help but feel sorry for Loppe; that must have been a real kick to the ego.\n\n"
        );
        this.outx(
            '"<i>To be honest, I don\'t think she minded it too much... from what I hear Puff still had a tryst or two, even while in the convent... then again this could all be just rumors... I never did have the chance to talk her after the event.  Apparently she left on a mission a few months after joining...</i>"  Taking a deep breath, Uma smiles at you.  "<i>Tell me something, [name].  Does Loppe tire you out?  In sex I mean?</i>"\n\n'
        );
        this.outx(
            "You admit that Loppe is a handful and a half.  Still, not enough to make you go celibate, certainly.  You ask why Uma is asking.\n\n"
        );
        this.outx(
            "Uma smiles.  \"<i>And that, my dear, is why you're special.  You're the first person who can actually handle Loppe.  Usually she wears out her partners so much that they need a few days to recover, but she tells me that all you need is a little rest and you're already good to go.</i>\"\n\n"
        );
        this.outx(
            "You admit it can't be that hard, surely?  You're not even from this world, you should be worse at it than the natives like Loppe herself are.\n\n"
        );
        this.outx(
            "Uma shakes her head lightly.  \"<i>I don't know what it is, dear.  But you're able to keep up with my little Loppe, while no other person that we've met so far can.  I suppose that's also part of the reason she chose to make you her official [boyfriend].  Much to the chagrin of her admirers.</i>\"  Uma chuckles.\n\n"
        );
        this.outx(
            "You can't resist a wry joke about Loppe having admirers when she's known to be so untameable in bed.\n\n"
        );
        this.outx(
            "\"<i>You'd be surprised with how much people actually enjoy Loppe's stamina.  Though anything more than a one night stand with her would probably put them in a coma for a few days.</i>\"  Uma chuckles.\n\n"
        );
        this.outx(
            "You thank Uma for telling you about her daughter's life and then apologize, as it's time for you to head back to camp.\n\n"
        );
        this.outx(
            '"<i>Not a problem, dear.  I hope you will continue to maintain a healthy relationship with my daughter.</i>" Uma chuckles.\n\n'
        );
        this.outx(
            "You promise her that you'll try, gather yourself together, and then politely head back to camp.\n\n"
        );

        this.talkLoppeJoiner();
    }

    /**
     * Talk Loppe - Loppe's First Boyfriend
     * Edit Status: 75% Some akwardness, and its fukken long. I did what I could without stomping all over everything.
     */
    public talkLoppesFirstBoyfriend(): void {
        this.outx(
            '"<i>How about I tell you about Loppe\'s first boyfriend?</i>"  Uma suggests.\n\n'
        );
        this.outx(
            "You tell Uma that it sounds like an interesting story, and you kindly ask her to proceed.\n\n"
        );
        this.outx(
            '"<i>Okay.  This happened a while after my little Loppe blossomed into pretty young lady.  She used to go to an art school, where she learned how to dance, and one of her colleagues was a black cat boy by the name of Hyou.  He was very handsome.  He had green eyes that resembled polished gems, his black fur was always well kept and on top of all that he was nice, someone pleasant to be around.  He was Loppe\'s senior and was the first person to greet her when she started attending the school.</i>"\n\n'
        );
        this.outx(
            "You can't resist joking that, if you didn't know about Uma's tastes in lovers, hearing her talking about him in such glowing praises would make you half expect the reason they broke up to be because Loppe found him fucking her mother one day.\n\n"
        );
        this.outx(
            "\"<i>Don't be silly, dear.  If you knew him as well as I do, you'd know there is absolutely no way there could ever be anything between us.</i>\"\n\n"
        );
        this.outx(
            "You ask her exactly what she means, feeling she's talking about more than sexual incompatibilities here.\n\n"
        );
        this.outx(
            '"<i>If you really want to know, you\'ll just have to listen to my story.</i>"  Uma smiles.\n\n'
        );
        this.outx("You laugh softly and promise to shut up and listen.\n\n");
        this.outx(
            "\"<i>Very well.  He was always surrounded by girls, it's tough to find someone as good looking and as nice as he was, and initially Loppe wasn't very close to him at all... that came later, when my little Loppe was having troubles keeping up with the class.  Turns out Loppe had absolutely no talent when it comes to dancing, but since she was so determined to become a good dancer, Hyou offered to tutor her.</i>\"\n\n"
        );
        this.outx(
            "You note with admiration that Loppe must have worked hard; she dances so wonderfully now, you'd hardly believe it was entirely hard work instead of at least a little natural talent for it.\n\n"
        );
        this.outx(
            "\"<i>Back then, there weren't many people who knew about Loppe's extra appendage, so they all just assumed she was a girl.  Hyou was the same, but...</i>\"\n\n"
        );
        this.outx(
            "You ask how that could have happened, given the mentions Uma and Loppe have both made of her gender posing... difficulties during puberty.  Did Uma and Loppe end up moving to a new village where they didn't know about Loppe's dual-gendered nature?\n\n"
        );
        this.outx(
            '"<i>If you know the right people, changing your gender is not so difficult, dear.  People just assumed she paid a visit to the local shaman. She is not ashamed of her gender, but it\'s not something you should freely advertise everywhere you go either.</i>"\n\n'
        );
        this.outx(
            "Ah, you reply.  So that's it, you note to yourself; her accidents happened before she grew her boobs and female curves, resulting in them believing she was a boy who changed himself into a girl, rather than having been boy and girl at the same time all along.\n\n"
        );
        this.outx(
            '"<i>Well, one day while dancing Loppe\'s shorts ripped up and exposed her, right in front of Hyou, too.  Needless to say, she was very embarrassed to be in such a predicament.  But Hyou, well... he gallantly helped Loppe to her feet and loaned her a towel so she could head home.</i>"  Uma laughs, reminiscing the event.\n\n'
        );
        this.outx("You smile and note that's one odd way to get into a girl's good books.\n\n");

        this.outx(
            "\"<i>Anyway, Loppe had always admired him and his feline grace while dancing, and after the incident, she was thrilled to know that Hyou hadn't spoken a single word about Loppe's gender to her classmates. Or anyone else for that matter. In fact, they just became closer.  Hyou continued to tutor Loppe, and slowly she got better and better, until one day Hyou surprised her with a request. Do you know what he asked?</i>\"  Uma asks, clapping her hands together lightly.\n\n"
        );
        this.outx("He asked her if they could make love?  You suggest.\n\n");
        this.outx('"<i>No, silly.  He asked her out.</i>"\n\n');
        this.outx(
            "Well, that's a surprise, you say; you didn't think people still took it that slow in Mareth.\n\n"
        );
        this.outx(
            '"<i>Not everyone is crazy about getting into each other\'s pants all the time dear</i>" Uma scolds you.  "<i>If we did that all the time we wouldn\'t have to do anything but sleep with each other all the time, you know?</i>"\n\n'
        ); // I dont even know.
        this.outx(
            "You apologize; there's so many monsters out in the wilderness who do think precisely that way that it's hard to remember there are still normal people, sometimes.\n\n"
        );
        this.outx(
            '"<i>It wasn\'t always like this, back then we were just simple people trying to live simple lives.</i>"\n\n'
        );
        this.outx("You admit that, and tell her to continue.\n\n");
        this.outx(
            '"<i>So they started dating.  And as is normal for a young couple, one day, after they had come back from a nice dinner, he suggested that he wanted to see Loppe naked.</i>"\n\n'
        );

        this.menu();

        this.addButton(0, "Next", this.talkLoppesFirstBoyfriendPart2);
    }

    public talkLoppesFirstBoyfriendPart2(): void {
        this.clearOutput();

        this.outx("<b>Some years ago...</b>\n\n");
        this.outx(
            "\"<i>There's no need to be ashamed Loppe... I'm your boyfriend, and all I want to do is see my beautiful laquine girlfriend in all her glory.  You aren't going to deny me that, are you?</i>\"  He asks hopefully.\n\n"
        );
        this.outx(
            "Loppe swallows, hands flush over her crotch in an effort to conceal her swelling erection. 'Why am I such a sucker for sweet talk? She mentally laments.  \"<i>I...I don't want to deny you, Hyou, but... are you sure?  I mean, I haven't forgotten that you didn't say anything about it to the others, but there's a difference actually seeing it up close</i>\" She pleads.\n\n"
        );
        this.outx(
            "Hyou smiles and closes the distance between them, gently hugging Loppe and pulling her into a tender kiss.  Once they break he whispers in her ear, \"<i>I know what you're hiding in there... and I really want to see it again... won't you show it to me again?  Please? Purrrrrty please?</i>\"\n\n"
        );
        this.outx(
            'Blushing through her fur, Loppe nods her head. "<i>O-okay.  Just remember, you asked for it.</i>" She warns him weakly.  Taking a few steps back, literal ponytail swishing gently on her rump, she slips out of her shorts, letting them slide down her legs and onto the floor, and then lifts her shirt for added measure.  "<i>There.  Can you see it now?</i>"  She asks, trying to be bold, but unable to look the cat in the eye or keep herself from blushing.\n\n'
        );
        this.outx(
            '"<i>Not quite... but let me help you.</i>"  He boldly reaches forward and gives Loppe\'s equine-prick a few strokes, coaxing it into a full blown hard-on.\n\n'
        );
        this.outx(
            "The rabbit-horse moans softly as it swells to all fourteen inches of mottled pink horse-dick, jutting erect and proud, defiant of its mistress.\n\n"
        );
        this.outx(
            '"<i>Now, that\'s better</i>" Hyou says, circling Loppe to examine her from every angle.  "<i>Hmm... yes.  Truly beautiful</i>"  He comments, purring softly.\n\n'
        );
        this.outx(
            'The bunny-pony blushes and wriggles.  "<i>Y-you know, it\'s really weird you telling me that?</i>" She protests in a half-hearted fashion.  "<i>But... If I gotta show you mine, then you gotta show me yours!</i>" She says, trying to sound more confident than she really is.\n\n'
        );
        this.outx(
            'Hyou chuckles.  "<i>I thought you were never going to ask!</i>"  He slowly strips himself, dancing and prancing as he removes each piece of his garments until, with a flourish, he finally peels off his underwear and carelessly disposes of it, tossing it away.  "<i>And this is my birthday suit.</i>"  He grins.\n\n'
        );
        this.outx(
            "Loppe's eyes lock onto his nakedness like a starving wolf onto a bloody steak, greedily drinking in the sight of him, particularly focusing with eagerness on his jutting, spiky-looking cat-dick.\n\n"
        );
        this.outx(
            "Hyou looks between his erect kitty-prick and Loppe's own horse-cock, noting the obvious difference in size.  \"<i>Well well... not only are you taller than I am, you're also bigger in that department too.  I guess it's to be expected, I am competing with a horse-bunny after all.</i>\"  He winks at Loppe.\n\n"
        );
        this.outx(
            'The aforementioned "<i>horse-bunny</i>" blinks in confusion, then realizes that the shaft she\'s been staring at is anywhere from one-third to one-half the length of her own, and she claps her hands over her mouth aghast.  "<i>Hyou, I\'m sorry, I...</i>"  She begins, half-expecting a rejection.\n\n'
        );
        this.outx(
            '"<i>Sorry for what?</i>"  Hyou interjects.  "<i>I knew what I was getting into when we started dating.  Relax Loppe.  When I said you were beautiful, I meant all of you, even this hefty pony you carry between your legs.</i>"  He grins happily.\n\n'
        );
        this.outx(
            'Loppe smiles softly.  "<i>You are such a flatterer, you know that?  But, enough with the foreplay - when do we get to the real action?</i>" She mock-whines.\n\n'
        );
        this.outx(
            '"<i>Action?</i>"  Hyou asks in mock confusion.  "<i>Whatever do you mean bun?</i>"\n\n'
        );
        this.outx(
            'Loppe pouts for a moment, feigning displeasure.  "<i>Are you taking me to bed, or am I going to have to push you into it?</i>"  She laughs, giving a playful growl to underscore that her confidence is up and she\'s ready to fuck.\n\n'
        );
        this.outx(
            '"<i>Only if you can catch me.</i>"  Hyou raspberries Loppe, getting ready to avoid his girlfriend\'s lusty advances...\n\n'
        );
        this.outx(
            "With the best growl she can manage, the horse-dicked rabbit hops through the air to snatch her feline boyfriend, but he jumps away with a laugh.  Gracefully he dances around and around the bedroom, the increasingly frustrated rabbit trying to cut him off.  Finally, with one perfectly timed leap, she slams into him and knocks him over onto the bed with a mutual 'whoof!' of startled shock.  Belly to belly they catch their breath, and then Loppe rises back up, completing the pinning maneuver.  \"<i>Haha, caught you!</i>\"  Loppe taunts, then blinks in surprise; what's that funny-nice feeling?  Rearing back, she looks down at their two bellies, seeing their mutual erections rubbing their sensitive flesh against each other, a sight which makes her blush.  \"<i>S-sorry, Hyou, I didn't mean to...</i>\"  \n\n"
        );
        this.outx(
            "\"<i>Don't worry about that, I don't mind.  So, you managed to catch me... what do you intend to do with me now?  Hmm?</i>\"  Hyou asks, ears twitching cutely.\n\n"
        );

        this.menu();

        this.addButton(0, "Next", this.talkLoppesFirstBoyfriendPart3);
    }

    public talkLoppesFirstBoyfriendPart3(): void {
        this.clearOutput();

        this.outx(
            "She trails off, looking at the smug smirk of the cat beneath her.  \"<i>Alright, the time for fooling is over; let's try something from one of my mom's books.</i>\"  With the awkwardness of someone who's never actually done this before, Loppe pivots in her \"seat\" in Hyou's lap, rotating around until she's facing away from him.  \"<i>Okay, let me see... just gotta find your dick... damn it's hard to do this when your own dick is in the way.</i>\" She mutters to herself, wriggling around in an effort to try and line up her waiting pussy with Hyou's shaft.\n\n"
        );
        this.outx(
            "Hyou moans as Loppe gyrates her hips.  \"<i>That feels good, even if I'm not in yet.</i>\"  He begins gyrating his hips as well, rubbing himself against Loppe, which only serves to make Loppe's task more difficult.\n\n"
        );
        this.outx(
            'Loppe moans.  "<i>Y-you know, if you want to help, you could try and slot this into the right hole, instead of rubbing it against my pussy - yee!  I think you just rubbed that one through my balls and up along my cock!  Where are you aiming?</i>" She shakes her head strongly, coincidentally flicking her partner in the face with her ears. "<i>Okay, that\'s it, stay still - let me handle this.</i>" Loppe commands. \n\n'
        );
        this.outx(
            "Hyou laughs.  \"<i>Okay, okay.  I'm sorry, couldn't resist it!  You look so cute when you're frustrated!  Alright then, I'll hold still...</i>\"  He says, gently guiding the tip of his feline-cock towards Loppe's drooling pussy.  \"<i>There, I'm even helping this time.</i>\"\n\n"
        );
        this.outx(
            "\"<i>If I could reach you from this position, I'd kiss you.</i>\" Loppe proclaims happily.  Her tail swishes across the cat's belly with anticipation, while the rest of her holds still, ready to be penetrated.\n\n"
        );
        this.outx('"<i>Just sit down and I\'ll slip right in!</i>" \n\n');
        this.outx(
            "Loppe needs no further instructions and promptly flops down; luckily for her, the active lifestyle of a rabbit-horse hybrid resulted in the accidental loss of her hymen years ago.  That doesn't keep her from squealing in pleasured shock as she envelops her lover's cock in one swift motion.  She sits there, feeling the strange yet wonderful sensation inside her belly from her partner's cock, doing her best to squeeze and grip the intruding appendage with her pussy, like feeling it with her hands.\n\n"
        ); // PAGING FENOXO -- I don't even know what to do with this. It's still akward, but better than it was.
        this.outx(
            "Hyou purr-moans, hands moving to hold Loppe's hips steady.  \"<i>You know, as good as your pussy feels, unless you start moving nothing's going to happen, right?</i>\"\n\n"
        );
        this.outx(
            'Wordlessly the laquine nods and begins to rise up and down, moaning and hissing as she truly loses her feminine virginity, riding her feline lover clumsily, but enthusiastically.  "<i>This, oh... this feels so good, Hyou!</i>"\n\n'
        );
        this.outx('The feline moans.  "<i>Yeah!  So good.</i>"\n\n');
        this.outx(
            "Addled as she is by pleasure, Loppe can still hear the reaction.  \"<i>Hey, what's wrong?  Aren't you enjoying this?  I know I am!</i>\"\n\n"
        );
        this.outx(
            '"<i>No!  I mean yes!  Of course I\'m enjoying it... wow this feels great!</i>"  He says, trying to save face.\n\n'
        );
        this.outx(
            "\"<i>Well, you don't sound too happy, what's wrong?  You just not like this position?</i>\"  Loppe asks, trying to be understanding.\n\n"
        );
        this.outx(
            "\"<i>I'm sorry Loppe... I don't know what's gotten into me... it does feel nice, but I'm just not feeling... y'know.  Maybe it is the position... try turning around?</i>\"  He suggests.\n\n"
        );
        this.outx(
            'With a moan as the action stretches her in just the right way, the laquine awkwardly spins around, leaving her pre-dribbling dick and balls slapping against her feline lover and her breasts positioned right in front of his eyes.  "<i>I\'ll try not to give you a facial when we really get going, okay?</i>"  She promises.\n\n'
        );
        this.outx(
            "Hyou's shaft throbs, dribbling pre within the laquine's depths.  \"<i>Oh yesss</i>\" Hyou purrs.  \"<i>Now that's a sight I can appreciate, and personally?  I don't mind if you do give me a facial... but I appreciate the consideration, now get moving girl!</i>\"  Hyou says, excitedly.\n\n"
        );
        this.outx(
            'Excited, Loppe resumes her bouncing, unthinkingly rubbing her cock against her lover\'s belly and shivering at the extra friction on its engorged, sensitive surface.  "<i>Ah, Hyou, you feel so good inside of me!</i>"  She whimpers.\n\n'
        );
        this.outx(
            'Hyou moans and groans, eyes glued to Loppe\'s bouncing shaft.  "<i>Yeah!  It feels great!  Slap my belly with that big pony of yours!</i>"\n\n'
        );
        this.outx(
            '"<i>K-kuh!-kinky b-buh-boy!</i>" Loppe groans, reaching out and grabbing his head and pulling him into an embrace, coincidentally planting his face right amongst her breasts even as she continues to grind her cock into his belly.\n\n'
        );
        this.outx(
            '"<i>Oh babe!  You\'re so sexy! I knew I picked a winner when I first saw you. Ah! Almost there!</i>"  He yowls, bucking against Loppe.  "<i>Damn that horse-cock of yours!  Bouncing around!  Slapping my belly!  Teasing me!  Ah!  So hot!</i>" \n\n'
        );
        this.outx(
            "A distant part of Loppe's mind catches these words and files them away with suspicion.  The rest of it is too busy melting at the sensations of losing her female virginity.  She continues to eagerly buck and thrust and impale herself, anxious in pushing on to her first <i>real</i> climax as a woman.\n\n"
        );
        this.outx(
            "Hyou yowls one last time and bucks against Loppe, his claws digging into her hips as his eyes cross, looking straight at a dollop of pre that seems to have formed on the flared tip of Loppe's member.  Finally, he relaxes and lets his orgasm overtake him, spewing rope after rope of cum inside Loppe's eager pussy.\n\n"
        );
        this.outx(
            "The laquine moans in pleasure at the sudden sensation of being filled... then blinks in surprise as she feels the cat-prick inside her needy pussy going soft.  \"<i>What's wrong?  What happened?</i>\" She asks, baffled; she tries to ride the limp dick a little more, but it's futile.\n\n"
        );

        this.menu();

        this.addButton(0, "Next", this.talkLoppesFirstBoyfriendPart4);
    }

    public talkLoppesFirstBoyfriendPart4(): void {
        this.clearOutput();

        this.outx(
            'Panting, but unable to hide the rumbling purr rising from his chest, Hyou sighs.  "<i>S-Sorry Lops.  That was AMAZING... I-I couldn\'t help myself.</i>"\n\n'
        );
        this.outx(
            "\"<i>That's all well and good, I'm feeling pretty amazing myself, but I'm not done yet!  Come on, get hard again so we can keep going - you can't be feeling all limp already, not after just one cum!</i>\"  The frustrated laquine declares.  She continues to rise and fall, \"<i>Come on, surely you can go for at least half an hour!</i>\"\n\n"
        );
        this.outx('"<i>H-Half an hour!</i>"  Hyou groans, flopping on Loppe\'s bed limply.\n\n');
        this.outx(
            "\"<i>That's normal, isn't it?  I mean, I can go for three times that long before I'm sated</i>\" Loppe asks, nervously.\n\n"
        );
        this.outx(
            'Hyou rises his head.  "<i>Normal?  I came once and am already spent... you are kidding right?</i>"  He asks, laughing nervously at the frustrated laquine.\n\n'
        );
        this.outx(
            '"<i>So what am I going to do?  I haven\'t even cum once yet!</i>" She whines.\n\n'
        );
        this.outx(
            "Sighing, Hyou looks at Loppe's cock, then back at Loppe... he smiles.  \"<i>Tell you what.  Since you let me fill you, and I just can't get another erection for a while... how about I let you fill me instead?  Would you like that?</i>\"\n\n"
        );
        this.outx(
            "\"<i>B-But I wanted to be fucked like a girl! Besides, you're a boy, I can't fuck you with a cock.</i>\"  The laquine whimpers.\n\n"
        );
        this.outx(
            "Figuring it's pointless to argue with Loppe in her current state, he takes Loppe's cock in his hands and bends over to give it a lick; a task that proves easy, given his feline flexibility.\n\n"
        );
        this.outx(
            "Loppe moans and shudders, wriggling with pleasure as a spurt of pre oozes from her flared tip to splatter onto her feline lover's face.\n\n"
        );
        this.outx(
            "Hyou smiles and slurps the top of Loppe's equine member into his mouth, sucking on it like a lollipop.\n\n"
        );
        this.outx(
            "Mouth opening and closing wordlessly like a fish, the laquine's eyes roll in her head as she is overwhelmed by the delicate touches to her sensetive shaft.\n\n"
        );
        this.outx(
            "Finally, with one last slurp he lets go of Loppe's cock and, smiling, asks,  \"<i>You sure you don't want to take me instead?</i>\"\n\n"
        );
        this.outx(
            "\"<i>I - okay... but, how do I do that?</i>\"  The bewildered bunny asks. \"<i>You don't have a pussy, unless you've been hiding something from me, and I don't want to just have you suck and lick on me; that's no fun for you, then.</i>\" She notes.\n\n"
        );
        this.outx(
            '"<i>Silly girl,</i>" he remarks.  "<i>Mind getting off me for an instant?</i>" he asks, innocently.\n\n'
        );
        this.outx(
            "Confused, the laquine pulls herself off of her lover, allowing his cum-slick cock to wetly slurp its way out of her.  She scoots over to the side of the bed, wondering what he has in mind.\n\n"
        );
        this.outx(
            'Hyou rolls around on his belly, lifting his tail and presenting his ass to Loppe, then casually reaches back and spreads his cheeks apart, giving Loppe a first-hand view of his, yet unused, little rosebud.  "<i>See?  I got a hole too!</i>"  He grins.\n\n'
        );
        this.outx(
            'Ordinarily, Loppe would have protested against the idea of fucking anyone, boy or girl or herm, up the ass.  However, ordinarily, Loppe would not have been as horny as she was, and she promptly leaps up behind him, rubbing her long cock between the spread cheeks of his ass.  However, she holds back from actually penetrating.  "<i>Hyou? P...Please?</i>"  Loppe meekly suggests, looking at him with big doe eyes.  "<i>Promise me you\'ll take turns at filling my pussy, too?</i>"\n\n'
        );
        this.outx(
            'Moaning and purring demurely, Hyou replies,  "<i>S-Sure.  Now jam that wonderful pony of yours in!</i>"  He says, overwhelmed with lust.\n\n'
        );
        this.outx(
            "Licking her lips in anticipation of finally being sated, the young laquine begins slowly pushing her cock against the tightness of her lover's virginal ass...\n\n"
        );
        this.outx(
            'Hyou yowls in a mixture of pain and pleasure.  "<i>Mrrrow!  That feels great!  Ha... Loppe, babe!  Your cock feels amazing!</i>"  He bucks back taking in even more of Loppe inside.\n\n'
        );
        this.outx(
            "\"<i>Excited, are we?  Well, just don't hurt yourself - I'm not exactly teeny-tiny here!</i>\" Loppe giggles, too caught up in the sensations of the cat-morph's hot, tight little anus wrapping itself slowly around her shaft to be suspicious of his reactions.\n\n"
        );
        this.outx('"<i>Don\'t care!  Ah, Marae!  S-Shit, getting hard again!</i>"\n\n');
        this.outx(
            "\"<i>Well, make sure you get that ready to fuck me with after I get off for the first time!</i>\" The laquine boasts, even as she relentlessly pushes herself forward until she finally manages to hilt herself in her partner.  Waiting a few moments to let him accommodate her properly, she starts to thrust in and out; with her half-done state, she's confident she'll cum inside of him before he cums again.\n\n"
        );
        this.outx("<b>One very long, messy, multi-orgasmic bout of sex later...</b>\n\n");
        this.outx(
            'Hyou purrs, licking at his cum-caked arms, happily.  His belly is distended with the massive amount of laquine-cum sloshing about inside.  "<i>Wow.  I have to say Loppe, you\'re one of a kind.  Best sex ever!</i>"  He sighs, continuing to lick at his arms.  "<i>Sorry for only getting your female half once.  I swear I don\'t know what\'s wrong with me... but it just felt so good when you started fucking me with that wonderful, big, horse-cock of yours, that I just lost it... sorry.</i>"\n\n'
        );
        this.outx(
            '"<i>It\'s okay, Hyou...</i>" Loppe sighs.  She cradles her stomach, which looks no different than it did when she started, and looks enviously at the engorged midriff of her boyfriend, very visible proof of her masculine potency.  "<i>Still, we\'ll try and concentrate more on that part next time, okay?</i>" She asks.\n\n'
        );

        this.menu();

        this.addButton(0, "Next", this.talkLoppesFirstBoyfriendPart5);
    }

    public talkLoppesFirstBoyfriendPart5(): void {
        this.clearOutput();

        this.outx("<b>Uma's detailed description of events over...</b>\n\n");

        this.outx(
            "You can't resist dryly pointing out that maybe it wasn't so much the girl part of Loppe that Hyou was interested in when he started dating the young dickgirl.  You would not be too surprised if Uma told you that the \"next time\" never came - or, at least, the version of it that Loppe wanted never came.\n\n"
        );
        this.outx(
            '"<i>Yes, dear.  I\'m afraid that\'s true... Hyou is as manly as a harpy, I\'m afraid.</i>"  She chuckles.  "<i>Now you see why there would never have been anything between the two of us, huh?</i>"\n\n'
        );
        this.outx(
            "A gay man and a gay woman; the very opposite of compatibilities.  So, you ask, raising an eyebrow for emphasis; in denial, or just didn't realize it until that first night?\n\n"
        );
        this.outx(
            '"<i>He never really fancied any girls before my Loppe, though he was friends with plenty of them, and I know for a fact he used to get plenty of love letters too.  So I would bet on him not knowing it.  Plus it was kinda unexpected, you know?  He was the son of village\'s most renowned hunter, a well-known womanizer</i>"  Uma chuckles.  "<i>I suppose he really didn\'t take after his father.</i>"\n\n'
        );
        this.outx("Same attitude, different sex on the receiving end, you suggest?\n\n");
        this.outx(
            '"<i>After that night, yes.  He came out to Loppe too.  She took it nicely, I think.  They continued to date for a while, though Loppe often had to coax him into using her pussy too, if I remember what my little ears heard right.</i>"  She flicks her ears for emphasis.  "<i>Those coaxings would involve the ravishing of Hyou\'s ass via horse-cock.</i>"\n\n'
        );
        this.outx(
            'You comment you\'re surprised Loppe took it so well; for most girls, hearing they "<i>turned a boy gay by having sex with him</i>" would be a major wound to their self-esteem.\n\n'
        );
        this.outx(
            "\"<i>Loppe didn't turn him gay though, come on.  Everything about that boy pointed towards this outcome, he was a petite cat boy who liked dancing and didn't hang out with guys.  Preferring instead to hang out with girls, and I mean that as friends, not lovers.  Not many were surprised when he came out, save for a few of the more naive girls.  Plenty of tears were shed... Loppe was fine though, she had a cute boyfriend.  Unfortunately it was not meant to be,</i>\"\n\n"
        );
        this.outx(
            "He found a guy he liked better and broke up with her as a result?  You suggest casually.\n\n"
        );
        this.outx(
            "Uma shakes her head.  \"<i>No.  Actually they broke up because he couldn't keep up with Loppe's stamina... it was either break up with her or give up dancing. And walking.</i>\"\n\n"
        );
        this.outx(
            "You heave a sigh; a somewhat sad outcome, you must concede, but inevitable, you suppose. A truly bisexual herm and a homosexual male probably weren't really that comfortable with each other in a relationship anyway.  You note Loppe was probably happy, deep down, to call an end to it.\n\n"
        );
        this.outx(
            '"<i>To be quite honest, there wasn\'t any bitterness in their breaking up.  And they formed a pretty cute couple too, and for a while they were satisfied with each other.  But Loppe unfortunately was wearing the poor boy down, he was the one falling behind in dancing class after that.</i>"  Uma sighs.  "<i>In fact... it was Loppe who suggested they break up.  They carried on as good friends though, and Hyou said he would support Loppe all the way if she found someone she liked and that was able to keep up with her.</i>"\n\n'
        );
        this.outx(
            "You tell her that turn of events doesn't surprise you; Loppe's got a good heart under her breasts.  And quite a fire in her loins, too, but, hey, nobody's perfect.\n\n"
        );
        this.outx(
            'Uma laughs.  "<i>That she does, dear, that she does.  But in case you\'re curious.  Hyou eventually found another guy, a wandering foreigner, and decided to leave the village with him.  And that was the last time we saw him.  Hope he is ok, wherever he is.</i>"  Uma looks into the distance.\n\n'
        );
        this.outx("You tell her that you hope so, too, but it's time for you to leave.\n\n");
        this.outx(
            "\"<i>Very well, dear.  Hope you don't disappoint.  If you ever have to pick between walking and my daughter, I hope you'll pick my daughter.</i>\"  She jokes, chuckling to herself.\n\n"
        );
        this.outx(
            "You chuckle and tell her that if Loppe hasn't chased you off despite the fact she's twice as bad as she ever was, if not worse, then you're not likely to make that choice against her favor soon.  That said, you take your things and head back to camp.\n\n"
        );

        this.talkLoppeJoiner();
    }
    /**
     * Talk Loppe - Loppe's Dad
     * Edit Status: FUCK ALL
     */
    public talkLoppesDad(): void {
        this.clearOutput();

        this.outx(
            "Quietly, and assuring her that you don't want to offend her, you ask if Uma will tell you about the bunny-herm who fathered Loppe?\n\n"
        );
        this.outx(
            'The mare\'s stare grows distant, as if staring deep into her past, and she sighs.  "<i>Ah, Usagi... I loved her so much, you know, [name]?</i>"\n\n'
        );
        this.outx("She was special to Uma then, was she, you ask?\n\n");
        this.outx(
            'Uma nods.  "<i>She was the love of my life.  Unfortunately, it wasn\'t meant to be.  She left even before I found out I was pregnant with my little Loppe. Still... I enjoyed my time with her, and if we met again, I would love to spend more time with her.</i>"  Uma smiles, though you detect a hint of sadness in her equine features.\n\n'
        );
        this.outx(
            "You ask who 'Usagi' was, as a person?  You know she was a herm bunny-morph and that she fathered Loppe, but how did she and Uma meet, and take their relationship that far?\n\n"
        );
        this.outx(
            "Uma smiles and looks to the distance.  \"<i>Usa-chan was a wandering warrior, always honorable and true, her skill with a sword was nothing short of amazing.  I don't think there's a single person alive able to match her.  She lived by the sword, back then, always challenging other warriors to hone her skill and travelling from village to village to find better, stronger, opponents.</i>\"  Uma sighs.\n\n"
        );
        this.outx(
            "\"<i>When I met her, she was just passing through our village, and had been suffering from chronic pain in her neck, so she came to me to request my services and, well, it was love at first sight.  After our session, she asked me out of a date and I accepted.  There wasn't a single night we didn't go out and make love under the stars.  But unfortunately Usa-chan left after a week.  She left me a note apologizing for her departure and said that she couldn't stay, lest she mellow and lose her edge as a warrior.  And that was the last I saw of her.</i>\"  Uma sighs again.\n\n"
        );
        this.outx(
            "So, you're guessing Uma found out Usagi had left her a little going-away present some time after the rabbit warrior had left, you suggest?\n\n"
        );
        this.outx(
            "\"<i>Yes.  My morning sickness didn't start until a fortnight after Usagi had moved on.  Jolted the sadness right out of me too.  I hadn't even opened my clinic in those two weeks, and my friends were very worried. Loppe was just what I needed to pick up the pieces of my broken heart.</i>\"  She smiles, a motherly smile that makes her look absolutely stunning.\n\n"
        );
        this.outx(
            "You ask if Uma ever tried to send a message after Usagi, let her know about her fatherhood?\n\n"
        );
        this.outx(
            "\"<i>I did ask the travellers that passed through about news regarding Usa-chan, but it was rare to ever find any who had heard of her.  Nevertheless I asked everyone that, should they meet Usa-chan, to tell her to return so we could live together as a family... but eventually we had to evacuate the village, so I'm not sure she even got my message, and I couldn't keep waiting for her.</i>\"\n\n"
        );
        this.outx(
            "You quietly thank Uma for sharing such intimate details of her life, and politely excuse yourself to leave.\n\n"
        );
        this.outx(
            '"<i>I still love her, you know.</i>"  The mare declares in a conversational tone.  "<i>I miss her so badly and I want her to come back to me; I dabble in dalliances, to fill the void, but I know they\'ll never really replace her.</i>"\n\n'
        );

        this.outx(
            "You turn and look back at her, which Uma evidently takes as justification to continue, even though she seems to be talking more for her own benefit than yours.  \"<i>Now, I'm not saying I'm not still mad at her for leaving in the first place, and I'll definitely have to punish her when I get my hands on her,</i>\" her grin, at this point, makes you suspect that Usagi might not entirely mind her punishment, \"<i>but I swear, if she was to walk through that door and ask, I'd take her back like that.</i>\" She snaps her fingers for emphasis.\n\n"
        );
        this.outx(
            "You can't resist noting that it sounds like Uma would end up giving Loppe a little sister if Usagi did come back. \n\n"
        );
        this.outx(
            'Uma nods thoughtfully at your words.  "<i>A sister or two?  Definitely.  Hey, why not go out on a limb and say five or six little sisters?  I loved being a mom, being pregnant was actually kind of hot, and I\'m still young enough to do some serious breeding.</i>"  She pats her belly with a defiant expression.  But then she slumps and sighs longingly.  "<i>But I want my Usagi back first...</i>" She mourns.\n\n'
        );
        this.outx(
            "You tell her to keep hoping; as strong a warrior as Uma described her to be, you're sure that the bunny-herm is still out there, somewhere.  You politely withdraw to give Uma a chance to compose herself, heading back to camp.\n\n"
        );

        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    /**
     * SEXY TIMES
     */
    private static UMA_CONSIDER_PC_FEM = 70; // Femininity value that Uma considers "girly"
    private static UMA_CONSIDER_PC_AND = 50; // Femininity value that Uma considers "androgynous"

    /**
     * Main sex menu
     * Edit Status: FUCK ALL
     */
    public sexMenu(): void {
        this.clearOutput();

        if (this.player.gender == 0) {
            this.outx(
                "You are about to ask if Uma would be willing to have sex with you, but then stop and think. Given you have no genitalia, and she's a lesbian woman, you can't really think of anything the two of you could do together that would be good for both of you.  You decide to ask her something else instead.\n\n"
            );

            this.buildCoreMenu(true);
            return;
        }

        this.outx(
            "You tell Uma that, if it's alright with her, you'd like to have sex with her.  Uma looks you over appraisingly.\n\n"
        );

        // Check femininity
        if (this.player.femininity >= UmasShop.UMA_CONSIDER_PC_FEM) {
            this.outx(
                '"<i>Aren\'t you cute!  Such curves, such full lips!  Oh girl, you have just what it takes to get an old mare going, don\'t you?</i>" Uma grins at you.  "<i>Now, I know better than to just assume, so I have to ask... what are you packing inside that [armorname] of yours?</i>"\n\n'
            );

            if (this.player.gender == 1) {
                // Femboys
                this.outx(
                    "You admit that, despite the girliness of your appearance, you're actually male.\n\n"
                );
                this.outx(
                    "Uma smirks mischievously at you.  \"<i>Oh, so we've got a pretty femboy here, huh?  Do you like feeling pretty?  Because if you do, I'll make you feel truly beautiful.  All you have to do is get in my office,</i>\" she points beyond the curtains.\n\n"
                );
            } else if (this.player.gender == 2) {
                // Chicks
                this.outx(
                    "You smirk and tell her that you're just what lesbians love; a girl who knows the loveliness of other women.\n\n"
                );
                this.outx(
                    "Uma grins at you. \"<i>Oh, goodie.  Then you must know what a skilled tongue or a soft caress can do, don't you honey?  All we have to do is get in my office, and I'll show you a good time,</i>\" she points beyond the curtains.\n\n"
                );
            } else if (this.player.gender == 3) {
                // Dickchicks
                this.outx(
                    "You shrug carelessly and tell her that you are a girl, for all that you're packing a cock of your own. From what Loppe's said, though, you don't think that's a deal-breaker for Uma, is it?\n\n"
                );
                this.outx(
                    "Uma smiles at you.  \"<i>Of course not.  Just because you have a pecker, doesn't mean you aren't a girl now, does it?  Get in my office and we'll have some fun!</i>\"  She points beyond the curtains.\n\n"
                );
            }
        } else if (this.player.femininity >= UmasShop.UMA_CONSIDER_PC_AND) {
            this.outx(
                "\"<i>I don't know [name].  I'm pretty sure my little Loppe already told you, but I'm a lesbian, so it all depends on what you're packing inside that [armorname] of yours, dear.</i>\"\n\n"
            );

            if (this.player.gender == 1) {
                // No sexytimes for manns
                this.outx(
                    "You confess that you're actually a male, even if you can pass for a girl with a little work.\n\n"
                );
                this.outx(
                    "Uma looks at you in disappointment.  \"<i>Well then, I'm sorry... but I'm not interested.  While I don't exactly mind the occasional boy I happen to like mine a little prettier than you are,</i>\"  Uma shrugs.\n\n"
                );

                this.buildCoreMenu(true);
                return;
            } else if (this.player.gender == 2) {
                // Chicks
                this.outx(
                    "You're kind of boyish, you admit, but you're all girl, you declare.\n\n"
                );
                this.outx(
                    'Uma claps her hands and smiles at you.  "<i>Good, let me show you why men have nothing on us girls.  Step into my office dear,</i>" she points beyond the curtains.\n\n'
                );
            } else if (this.player.gender == 3) {
                // Dickchicks
                this.outx(
                    "Yeah, you know people get confused by which you are. You're actually both, with pussy and dick.\n\n"
                );
                this.outx(
                    'Uma looks at you in thought.  "<i>To be honest, I don\'t mind herms but I usually like mine a bit more on the girly side, you know?  I think we can make an exception for you though!  Go to my office,</i>" she points beyond the curtains.\n\n'
                );
            }
        } // Wakkawakka no manns
        else {
            this.outx(
                '"<i>Sorry [name],  but you\'re just too manly for my tastes,</i>" Uma apologizes.\n\n'
            );
            this.buildCoreMenu(true);
            return;
        }

        // If we made it this far, we've passed all of Uma's preference checks
        this.outx(
            "You step through into Uma's office, noting a surprisingly comfortable looking flat table-bed, just waiting for you and Uma to have a little fun.\n\n"
        );
        this.outx(
            "\"<i>Now here's a few 'special services' I can provide you with.  So, which will it be?</i>\"\n\n"
        );

        this.buildSexMenu();
    }

    private buildSexMenu(): void {
        this.menu();

        this.addButton(0, "EroMassage", this.sexEroticMassage);
        this.addButton(1, "Eat Her Out", this.sexEatHerOut);

        if (this.player.gender >= 2 && this.player.lowerBody != 4) {
            // Vaginas & not centaurs
            this.addButton(2, "Fingerbang", this.sexGetFingered);
        }

        if (this.player.hasCock()) {
            // Has a dick
            this.addButton(3, "Handjob", this.sexHandjob);
            this.addButton(4, "Get Blown", this.sexGetABJFromDisMilfyLesboSlut);
        }
        this.addButton(9, "Back", this.buildCoreMenu);
    }

    /**
     * Erotic Massage
     * Edit Status: FUCK ALL
     */
    private sexEroticMassage(): void {
        this.clearOutput();

        this.outx("You tell Uma you'd enjoy one of her erotic massages, please.\n\n");
        this.outx(
            'The milf mare smiles at you.  "<i>Very well, dear.  Follow me,</i>" she turns to leave her office and head down the corridor, towards the far back of the clinic, equine tail swishing lazily side to side.  You follow closely in her wake, looking forward to her "special treatment."\n\n'
        );
        this.outx(
            "The room she leads you to is quite simple; wooden walls and floor, a couple of drains set in the floor that are probably for the more fluid generous clientele, "
        );

        if (kGAMECLASS.urta.urtaLove())
            this.outx(
                "something that makes you wonder if Urta would like to come and take a spin here, "
            );

        this.outx(
            "and a sizable table, made from bamboo. It's covered in a white cloth, and has an upraised headboard with a hole in it that looks like it's big enough to fit your head through.  This is the only piece of furniture in the room, apart from a small cupboard in the corner.  Though spartan in its layout, the room is quite comfortably warm.\n\n"
        );
        this.outx(
            'Clearing her throat to get your attention the mare chuckles.  "<i>If you\'re done examining your surroundings, you\'d better get those [armorname] off, unless you want them to get dirty dear,</i>" Uma says, pointing at your garments.  "<i>You can put them inside the cupboard,</i>" she motions over to the cupboard and begins undoing her kimono, with practiced moves and elegant grace, careful not to wrinkle the fabric and ensuring it\'s all neatly folded.\n\n'
        );
        this.outx("You nod your head in understanding and promptly strip down, ");

        if (this.flags[kFLAGS.PC_FETISH] >= 1)
            this.outx(
                "unable to resist either the tingle of lust that runs through you at being naked in front of Uma, nor the urge to flaunt your feminine physique for her own gratification, "
            );

        this.outx(
            "and gather your [armorname] up in your arms as you do so. Walking over to the cupboard, you find a couple of folded towels and ample space to store your clothes, which is exactly what you do.\n\n"
        );
        this.outx(
            'When you turn, you notice Uma behind you, standing stark naked and holding her folded kimono in hand.  "<i>Move over, dear.</i>"  You politely step aside, and reach out to take Uma\'s clothes from her so that you can put them in the cupboard for her.  "<i>Thank you, dear,</i>" she replies, handing over her clothes.  You place them inside and ask what she would like you to do next?\n\n'
        );
        this.outx(
            '"<i>Just get on my table, belly up, and we can get started,</i>" she pats her table, waiting patiently.  You nod your head in understanding, approach and position yourself on the table as she instructed, bare [skin] prickling with anticipation at what\'s to come.  The mare cracks her knuckles and positions her hands over your body.  "<i>Now, just sit back and enjoy dear.  Let my nimble hands care for this beautiful body of yours.</i>"  \n\n'
        );
        this.outx(
            "You smile at her and let her know you're ready to start whenever she is.  The mare starts out by caressing your whole body, over your belly, your [chest], your arms and your [legs].  Then she begins pressing a few spots, searching for knots in your muscles and quickly treating those with her expert fingers.  \"<i>Seems like you're enjoying it so far,</i>\" the mare chuckles.\n\n"
        );
        this.outx("Even as Uma says this, you realize just how incredibly ");

        if (this.player.gender == 1) this.outx("hard ");
        else if (this.player.gender == 2) this.outx("wet ");
        else if (this.player.gender == 3) this.outx("hard and wet ");

        this.outx(
            'you are.  Sparks dance across your skin and you shiver, asking just how Uma can get you so turned on with just a few touches?  "<i>That\'s a trade secret, dear.  Now let\'s get rid of all your tension,</i>" the mare\'s hands slide around your body, caressing, touching and pinching, and somehow you feel yourself getting ever closer to the edge of climax.  You moan and whimper in pleasure, reduced to blissed-out putty in the mare\'s skillful hands, and unthinkingly blurt out she\'s a beautiful minx.  "<i>Why... thank you dear,</i>"  she smiles happily, even as she moves her hand to one last spot on your body, right above your crotch.  "<i>Now cum.</i>"  She presses the spot and you gasp.\n\n'
        );
        this.outx(
            "You groan deep in your throat and obey Uma's commands explicitly, shuddering as the waves of climax rip through your body and culminate in your loins, "
        );

        if (this.player.hasCock()) {
            this.outx("cum ");
            if (this.player.cumQ() < 50) this.outx("dribbling ");
            else if (this.player.cumQ() < 250) this.outx("pouring ");
            else if (this.player.cumQ() < 500) this.outx("spurting ");
            else this.outx("fountaining ");
            this.outx("from [eachcock] ");
        }
        if (this.player.gender == 3) this.outx("and ");
        if (this.player.hasVagina()) {
            this.outx("femcum ");
            if (this.player.wetness() <= 2) this.outx("dripping ");
            else if (this.player.wetness() <= 4) this.outx("streaming ");
            else this.outx("gushing ");
            this.outx("from your [vagina]. ");
        }

        this.outx(
            "You writhe in pleasure, twisting yourself on the table as an explosive orgasm rocks you to the core.  You nearly pass out from the ordeal and when you're finally done you slump on the table nervelessly panting and satisfied.  Taking a deep breath, you turn to look a Uma, pretty sure you must've covered her body with your explosive discharge, but to your surprise she only has a bit of "
        );

        if (this.player.hasCock()) this.outx("cum ");
        if (this.player.gender == 3) this.outx("and ");
        if (this.player.hasVagina()) this.outx("juices ");

        this.outx("covering her hand and arm.  She smiles knowingly.\n\n");
        this.outx(
            '"<i>How was it dear?  Let me guess, you feel like you just exploded and had the longest orgasm, quite possibly dirtying the whole room, right?</i>"\n\n'
        );
        this.outx(
            'You nod mutely, too overwhelmed by what just happened to you to speak.  "<i>Well, sorry to disappoint, dear.  But this is all that came out of you,</i>" she lifts her hand, displaying it to you, barely messy.  "<i>A little trick I learned when I had to keep my little Loppe from quite literally, blowing up in public,</i>"  she winks.  "<i>Don\'t worry though, the feeling of getting a huge orgasm is real enough, but the reality is quite different.</i>"\n\n'
        );
        this.outx(
            "Remembering what sex with Loppe is like, you decide Uma was a genius for coming up with such a trick, and tell her as much.  \"<i>You're quite good at flattery aren't you dear?  Well, I hope you enjoyed yourself, but now I must be going, so you just rest up until you're feeling well enough to leave.  Bye, dear,</i>\" the mare sashays to the cupboard, fetching a towel that she uses to clean her hand and arm before collecting her robes and casually walking out the door, still naked and without a hint of worry as her tail waves behind her, displaying the firm, round cheeks of her toned butt.\n\n"
        );
        this.outx(
            "You nod absently at her departure and settle down to regain your strength.  Once you feel recovered from your earth-shaking orgasm, you pick yourself up, redress, and quietly make your way back to camp; Uma's already busy with another client as you go.\n\n"
        );

        // DONT CARE HAD SEX
        // Scene says we've only cum a little so err I guess store the players hoursSinceCum, do statmod, then reset it to a smaller value?
        const hoursSinceCum: number = this.player.hoursSinceCum;
        this.dynStats("lust=", 0);
        this.player.hoursSinceCum = Math.ceil(hoursSinceCum * 0.75);

        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    public sexGetFingered(): void {
        this.clearOutput();

        this.outx(
            "You give a knowing wink to the mare masseur and say you'd like to see her magic fingers put to work. You particularly want to see if she can pick the locks and open your secret treasure box.\n\n"
        );
        this.outx(
            '"<i>Very well, dear.  Come with me,</i>" she turns to leave her office and head down the corridor, towards the far back of the clinic, equine tail swishing lazily side to side.  You follow closely in her wake, looking forward to her "special treatment".\n\n'
        );
        this.outx(
            "The room she leads you to is quite simple; wooden walls and floor, a couple of drains set in the floor that are probably for the more... fluid generous clientele, "
        );

        if (kGAMECLASS.urta.urtaLove())
            this.outx(
                "something that makes you wonder if Urta would like to come and take a spin here, "
            );

        this.outx(
            "and a sizable table, made from bamboo. It's covered in a white cloth, and has an upraised headboard with a hole in it that looks like it's big enough to fit your head through.  This is the only piece of furniture in the room, apart from a small cupboard in the corner.  Though spartan in its layout, the room is quite comfortably warm.\n\n"
        );
        this.outx(
            "Clearing her throat to get your attention the mare chuckles.  \"<i>Now, dear.  I can't quite get my hands where they need to be if you're still wearing your [armorname].  So why don't you strip down and put them in the cupboard over in the corner,</i>\"  she instructs, beginning to strip herself.  You nod your head in understanding and promptly strip down, "
        );

        if (this.flags[kFLAGS.PC_FETISH] >= 1)
            this.outx(
                "unable to resist either the tingle of lust that runs through you at being naked in front of Uma, nor the urge to flaunt your feminine physique for her own gratification, "
            );

        this.outx(
            "and gather your [armorname] up in your arms as you do so. Walking over to the cupboard, you find a couple of folded towels and ample space to store your clothes, which is exactly what you do.\n\n"
        );
        this.outx(
            'Uma stands just behind you, her own clothes neatly folded.  "<i>Excuse me.</i>"  You politely step aside, and reach out to take Uma\'s clothes from her so that you can put them in the cupboard for her.  "<i>Thanks, dear.  Now come here,</i>" the mare says, sitting up on the table and tapping her thighs.  "<i>Come sit on my lap.</i>"\n\n'
        );
        this.outx(
            "You look at her with a slightly puzzled expression, but then smile, nod your head and approach.  You gently sit yourself down in the milf mare's lap.  "
        );

        if (this.player.tallness < 60)
            this.outx("feeling very much like a child sat on the lap of her mother.  ");
        if (this.player.tallness > 84)
            this.outx("carefully settling down for fear of squashing her.  ");

        this.outx("Once settled and comfortable, you ask what to do next.\n\n");

        this.outx(
            '"<i>Just relax,</i>" the mare prompts as she runs her hands over your body.  She gently teases your [nipples] with soft fingers, kneading your [chest] with smooth touches; her delicate grasp gradually increasing in force until she\'s pawing at your sensitive tit-flesh with authority.\n\n'
        );
        this.outx(
            "With your attention focused on your chest, you don't notice one of the mares hands ceasing its sensual massage of a breast, "
        );

        if (this.player.thickness < 10 && this.player.tone > 90)
            this.outx("her fingertips trailing against your chiseled, muscular abdomen, ");
        else if (this.player.thickness < 30 && this.player.tone > 70)
            this.outx("her fingertips gliding across your toned midriff, ");
        else if (this.player.thickness > 90 && this.player.tone < 10)
            this.outx(
                "her fingertips stealing a grope of your chubby belly as they travel lower, "
            );
        else if (this.player.thickness > 70 && this.player.tone < 30)
            this.outx("her fingertips sinking into paunch of your belly, ");

        if (this.player.hasCock()) this.outx("past [eachCock], and ");

        if (this.player.hasVagina()) {
            this.outx("down towards the honeypot ");
            if (this.player.isNaga()) this.outx("on your [legs].  ");
            else this.outx("nestled between your [legs].  ");

            this.outx(
                "Slowly she spreads your folds open, massaging your labia and gathering moisture from your [vagina].\n\n"
            );
        } else this.outx(".\n\n");

        this.outx(
            "You moan, already shivering in anticipation, waiting to see what a skilled lesbian can do with your most precious feminine treasure.  \"<i>Just a heads up, dear.  I'm pretty confident no one can hear what takes place here, and I'm not above getting myself a little dirty, so feel free to let loose and enjoy it as much and as loudly as you want, okay?</i>\"\n\n"
        );
        this.outx(
            "The mare's hands gently circle your netherlips, sometimes brushing against your [clit], but only enough to send small jolts of electric pleasure running up your spine.  Slowly one questing finger begins prodding your entrance, before driving itself in.\n\n"
        );

        if (this.player.hasVirginVagina()) {
            this.outx(
                "\"<i>Oh, so tight!  Tell me something, dear.  Are you, perhaps, a virgin?  No, wait!  Don't tell me.  I'll just find out myself,</i>\"  wiggling her finger to slowly inch her way inside, Uma explores your nethers as deep as she can, deep enough to reach your hymen.  \"<i>Oh!  So you are!  How rare!  I don't even remember how long it's been since I last had the pleasure of helping a virgin, ah, Nothing quite like it,</i>\"  the milf mare chuckles, reminiscing over old times.  \"<i>Oh, dear, just thinking about it makes me wet.  A pussy that's never known the pleasure of a cock, ripe to be plumbed by my fingers.  I can't grant you the same pleasure as a skilled lover can dear,  but I assure you that by the time I'm finished with you, you will be as sated as you can be,</i>\" the mare delivers a gentle kiss to your neck.\n\n"
            );
            this.outx(
                "You murmur and wriggle in your seat, telling her that you don't doubt her in the slightest.  \"<i>Good, now let's make some room for me to work with,</i>\" she replies, gently thrusting her finger in and out of you in a circular motion, hoping to loosen you so she can add more digits.\n\n"
            );
            this.outx(
                'You cry out - that feels wonderful, you tell her.  Uma chuckles, "<i>But we haven\'t even gotten started, dear,</i>" she says melodically, slowly working another finger against your passage, wiggling it until it slips in with a wet squelch.  You buck back against her with a cry of delight; this feels so good!  "<i>Now, now, don\'t get too excited dear.  I still haven\'t even found your special place,</i>" Uma laughs.  She begins probing your depths, pressing against key spots, searching for something.\n\n'
            );
            this.outx(
                "You react with a full-body jolt as a surge of pleasure unlike anything you've felt before ripples through your body.  There!  Oh, there!  You're not sure what Uma just did, but you want more of it!  The mare gives a confident laugh, \"<i>Found it already!  Yes, I don't mean to brag but I am pretty good at finding those, wouldn't you say, dear?</i>\"  She presses on your G-Spot for emphasis.  You squeal in agreement, writhing in the mare's lap as pleasure rips through your body.\n\n"
            );
            this.outx(
                "\"<i>How cute.  If you weren't dating my daughter I might even have considered keeping you for myself.  But I'm glad you're with her, and I hope you won't deny an old mare her indulgences once in a while,</i>\" Uma adds another finger to your pussy, pumping them inside you and brushing against your spot with each insertion.\n\n"
            );
            this.outx(
                "You moan and babble, vaguely spitting out something about definitely promising to come back to her in the future.  Waves of pleasure wash through you, rippling through your clenching, squeezing netherwalls, building a strange tightness in your belly. Oh - you're going to - going to...\n\n"
            );
            this.outx("With an ecstatic cry, you orgasm, your virginal cunt spasming as it ");

            if (this.player.wetness() <= 2) this.outx("spatters ");
            else if (this.player.wetness() <= 4) this.outx("soaks ");
            else this.outx("drenches ");

            this.outx(" Uma's probing hand in your female juices");

            if (this.player.hasCock())
                this.outx(
                    ", your forgotten cock spraying cum in a pearlescent arc to splatter onto the floor"
                );
            this.outx(".\n\n");

            this.outx(
                '"<i>Oh, deary.  You\'re so cute I could just squeeze you all day!</i>"  Uma laughs happily as she pumps her fingers inside you one more time, drawing one last discharge before you finally slump on the older mare\'s lap.  The mare removes her hand from your sensitive pussy and brings it close to her mouth, promptly licking your juices off her hand, close to your ear to ensure you hear every single lewd sound she makes as she cleans your orgasm from her hand.  "<i>Hmm, virgins definitely have the best taste.  Sweet, slick and unclaimed.  Be sure to warn Loppe to go easy on you when you finally decide to work with her equine pride, though I wonder if she\'ll be able to restrain herself with such a cutie like you,</i>" Uma says as she kisses the back of your neck once more before returning to her cleaning duty.\n\n'
            );
            this.outx(
                "You take a few moments to regain control of your [legs], but get up and start helping to clean up the mess - after all, you made it.  Once it's all clean, you kiss Uma on the cheek as a thank you before saying you have to be going.  \"<i>See you soon, dear.  I'd love to have given you more of an workout, but I think my daughter will appreciate your inexperience.  So make sure you come prepared next time, so we can have some more fun.</i>\" she informs you, as her fingers begin to prod at her own snatch.\n\n"
            );
            this.outx(
                "You can't resist a smile as you promise to remember that, redress yourself, and head back to camp.\n\n"
            );
        } else if (this.player.looseness() == 0) {
            // Tight
            this.outx(
                '"<i>Hmm tight!  I wonder how long you can keep yourself like that while dating my little Loppe,</i>" the mare says teasingly.\n\n'
            );
            this.outx(
                "Loppe isn't that bad, you find yourself saying - and doesn't it feel so weird to be talking about Uma's daughter when you're letting Uma herself do you, you privately note.\n\n"
            );
            this.outx(
                '"<i>Oh, but this is where you\'re mistaken my dear.  Loppe is pretty bad and I should know.  She got that from me,</i>" the mare laughs lightly, adding another finger to massage your opening.\n\n'
            );
            this.outx(
                "You moan loudly, wriggling in your seat to allow Uma better access to your more sensitive spots.  Mmm, she's good at this...\n\n"
            );
            this.outx(
                '"<i>Thanks dear, but we are just about to get started with the real thing,</i>" she replies with a chuckle.  Uma begins massaging your inner walls while she roams your insides, trying to find something.\n\n'
            );
            this.outx(
                "You quickly realize what the mare is searching for, her expertise in matters of pleasure clear as your G-Spot is teased, crying out in delight as she sends the most delicious wave of pleasure rippling through your loins, doing your best to squeeze her fingers with your experienced but still-tight cunt.\n\n"
            );
            this.outx(
                '"<i>Aha!  Found it!</i>" the mare says with delight, "<i>Now I can finally get started on removing all of this bad tension you\'ve been accumulating, dear.</i>"  She starts pumping her fingers inside you, making sure to tease your G-Spot with careful touches at every pump.\n\n'
            );
            this.outx(
                "You gasp and moan as the mare masseur's expert fingers tease you in all the right ways, slightly bucking in place to properly enjoy your finger-fucking, that oh-so-familiar and wonderful tightness building up in your belly before, with a cry of lust, you give in and ride the resultant crescendo of orgasm.  You give yourself over to the bliss of cumming into Uma's hand, slumping down in relaxed stupor after you finish emptying yourself.\n\n"
            );
            this.outx(
                'Removing her hand from your privates, the mare lifts her wet hand to her face and begins licking it clean.  "<i>Hmm, I see that my daughter is right to call you sugar.  You really are sweet,</i>" she chuckles.  "<i>So how\'d you like your... massage?</i>"\n\n'
            );
            this.outx(
                "You smile lazily at her and assure her it was wonderful; a real treat to experience.  Maybe she should teach Loppe how to use her fingers like that.\n\n"
            );
            this.outx(
                "Uma smiles at you.  \"<i>Hmm I might in the future, but my little Loppe has tricks of her own, as I'm sure you've no doubt experienced?</i>\"\n\n"
            );
            this.outx(
                "You smile demurely and tell her that where you come from, a lady doesn't kiss and tell... then grin to let her know you're just teasing her.  Uma laughs.  \"<i>Oh, you silly girl...  Now if you'll excuse me.  I have to attend to my own problems.</i>\"  The mare motions to her drooling gash.\n\n"
            );
            this.outx(
                "You smile and tell her you'll shut the door on your way out, getting dressed and then heading back to camp.\n\n"
            );
        } else {
            this.outx(
                '"<i>Oh, moist and easy.  I wonder how much of this is Loppe\'s fault?  Maybe I should tell her to be a bit more gentle?</i>" the mare suggests, adding a couple more fingers inside you.\n\n'
            );
            this.outx(
                "Well, maybe a little you manage to squeak out; you're really more concerned with just how good Uma's fingers feel inside you - they're not a nice big fat cock, but they're a pretty good substitute.\n\n"
            );
            this.outx(
                '"<i>Still feels like I have some room to work with here, so how about another one?</i>" the mare states, even as she adds another finger to the ones already inside you.  "<i>If we continue down this road I might just be able to squeeze a hand down there, you don\'t mind do you, dear?</i>"\n\n'
            );
            this.outx(
                "Mmm, the more the merrier you unthinkingly reply.  You didn't get this stretched out by not liking to be filled, after all.\n\n"
            );
            this.outx(
                "\"<i>Good, I'll see if I can't accommodate you later, but for now there's something I'm looking for,</i>\"  She begins moving her fingers inside of you, feeling around your rippling walls, looking for that special spot within you.\n\n"
            );
            this.outx(
                "It's not easy for her, you're looser than most, but you enjoy her efforts all the same, playfully teasing and encouraging her as she strokes and fondles and fiddles.  Finally, almost by accident, her finger brushes up against that part you love so much and you moan your delight, letting her know she's hit the jackpot.\n\n"
            );
            this.outx(
                '"<i>Hmm, that took longer than usual, but I see I still have the touch.  Now to make this as good as possible for my future daughter-in-law,</i>" Uma teases you, adding her last finger to your [vagina], shoving her entire hand inside.  She massages your innards as she begins pumping her hand, touching, massaging, teasing and squelching.  Every time that wonder hand of hers drives itself inside you, you feel jolts of electricity run up along your body as each finger of hers takes a turn dancing, teasing and pinching that special spot within your treasure.\n\n'
            );
            this.outx(
                "It's a little different to being filled with cock, but it's not a bad substitute either, and you do your best to wring as much pleasure from it as you can.  It still takes a little longer to build up that delicious pressure inside of you before, with a cry of lust fulfilled, you cum, soaking your lap and Uma's alike with your climax.\n\n"
            );
            this.outx(
                '"<i>Oh dear, such a small orgasm.  I was hoping for more from a experienced woman like yourself,</i>" the mare declares, moving her hand a few more times.  "<i>How about if I do... this!</i>"  She grips your G-Spot tightly, while teasing your [clit] with her other hand.  You squeal and writhe, your oversensitized flesh burning with pleasure as she continues playing - it takes only seconds before you dredge up a second orgasm, just as full as the first, and then slump back against her, worn out.\n\n'
            );
            this.outx(
                'Uma chuckles to herself, "<i>Now, that\'s more like it.  Satisfied yet, dear?  I could always give you another...</i>" She suggests.\n\n'
            );
            this.outx(
                'No, you think you\'ve had enough for a while, you tell her.  "<i>Spoilsport...</i>" the mare comments, licking the back of your neck.  "<i>I always enjoy making experienced girls like you see new ways to achieve greater orgasms, and I hope our time together\'s been as pleasurable as it looked.</i>" she chuckles.  "<i>Now then... just rest up and get up when you can... but please don\'t take too long?  This last tryst of ours has left me... wanting.</i>"\n\n'
            );
            this.outx(
                "You chuckle at her, painstakingly hauling yourself up, and get dressed.  Thanking Uma for showing you her magic fingers, you blow her a teasing kiss and then head back to camp.\n\n"
            );
        }

        this.dynStats("lust=", 0);

        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private sexHandjob(): void {
        this.clearOutput();

        this.outx(
            "Rubbing your crotch for a moment, you ask her if she's willing to handle a more masculine element of your body for you?\n\n"
        );
        this.outx(
            '"<i>Hmm, I suppose I could, come with me,</i>" the mare leads you away, out her office and head down the corridor, towards the far back of the clinic, equine tail swishing lazily side to side.  You follow closely in her wake, looking forward to her "<i>special treatment</i>".\n\n'
        );
        this.outx(
            "The room she leads you to is quite simple; wooden walls and floor, a couple of drains set in the floor that are probably for the more... fluid generous clientele, "
        );

        if (kGAMECLASS.urta.urtaLove())
            this.outx(
                "something that makes you wonder if Urta would like to come and take a spin here, "
            );

        this.outx(
            "and a sizable table, made from bamboo; it's covered in a white cloth, and has an upraised headboard with a hole in it that looks like it's big enough to fit your head through.  This is the only piece of furniture in the room, apart from a small cupboard in the corner.  Though spartan in its layout, the room is quite comfortably warm.\n\n"
        );
        this.outx(
            'She starts stripping and motions for you to do the same.  "<i>As talented as I am with my hands, I still haven\'t figured a way to properly take care of you while dressed, dear,</i>" she giggles.  You nod your head in understanding and promptly strip down, '
        );

        if (this.flags[kFLAGS.PC_FETISH] >= 1)
            this.outx(
                "unable to resist either the tingle of lust that runs through you at being naked in front of Uma, nor the urge to flaunt your feminine physique for her own gratification, "
            );

        this.outx(
            "and gather your [armorname] up in your arms as you do so. Walking over to the cupboard, you find a couple of folded towels and ample space to store your clothes, which is exactly what you do.\n\n"
        );
        this.outx(
            '"<i>Be a dear and store mine too, please,</i>"  Uma asks, handing her folded clothes to you.  You nod your head and place them in the cupboard like she asked, then walk over to the table and sit down, ready to begin.\n\n'
        );
        this.outx(
            'Uma takes a seat beside you and smiles gently at you.  "<i>Tell me, dear, how have you been?</i>"\n\n'
        );
        this.outx(
            "You think it over and tell her that, all things considered, surprisingly well.  After all, you jest, you're still free and not some demon's toy.  \"<i>That's good, I've been meaning to have a chat with you, maybe get to know you a little better while I'm at it, but the main question is Loppe.  What's your opinion on my little Loppe?  Did I do a good job?</i>\"  Uma asks, a questing hand rubbing along your thigh to gently touch your [cock].  \"<i>And don't think I'm forgetting about our business here either, dear.</i>\"\n\n"
        );
        this.outx(
            'What does she mean by a good job, you ask, shivering at the gently stroking fingers on your steadily stiffening shaft.  "<i>You know, how she behaves out there?  Is she being nice?  Has she made any passes at inappropriate times?  Is she carrying herself like a lady ought to?</i>" the mare questions, continuing to stroke your shaft, sometimes rubbing at your [cockHead biggest] with practiced motions, always pushing the right button to send shudders of pleasure running through you.\n\n'
        );
        this.outx(
            "You moan, then shake your head and try to answer.  You can't really say if Loppe is carrying herself like a lady ought to, because you're not sure what Uma defines as a lady or how that applies to a hermaphrodite.  But she is definitely being very nice to you - no making passes unless you imply you're interested first.  \"<i>That's good - by the way, does this feel good?</i>\"  Uma asks, lavishing your [cockHead biggest] with more of her attention.\n\n"
        );
        this.outx(
            "Yes, yes it does, you moan, shivering your seat and unable to resist trying to hump the masseur's hand that is caressing you so erotically.\n\n"
        );
        this.outx(
            '"<i>Focus dear, I\'m trying to strike a conversation here,</i>" Uma chuckles.  You manage to gasp an apology, but refrain from pointing out that her masterful touch on your burgeoning shaft is rather distracting.\n\n'
        );
        this.outx(
            "\"<i>What about the sex though?  How are things?  And let's not restrict this topic to my little Loppe only.  What I'm interested in is you.  Have you been taking care of your needs properly?  Speaking of needs, how big are your needs?  Hmm?</i>\" the mature mare asks as she adds another hand to your [cock], focusing on both massaging your shaft as well as your [cockHead biggest].  You gasp and groan, but can't think of anything coherent to say through the pleasure crowding your brain.\n\n"
        );
        this.outx(
            '"<i>Come on, dear.  Talk to me.</i>" Uma presses, even as her hands redouble their efforts at pleasuring you.  Between moans you manage to protest that she\'s making it awfully hard for you to do so, a glow of pride in you for actually being coherent rather than babbling madly.\n\n'
        );
        this.outx(
            '"<i>Is that so?  In that case, let\'s try this!</i>"  She twists her hand around your shaft, stroking in a corkscrew-like motion, while her other hand continues to massage your [cockHead biggest] and strokes the underside of your strained fuck-pole.\n\n'
        );
        this.outx("That's the last straw for you and you promptly explode in her hands.\n\n");

        // Normal CumQ
        if (this.player.cumQ() <= 250) {
            this.outx(
                'Your cum spurts and spatters onto Uma\'s hands, getting them nice and sticky with your fluids.  "<i>There we go, dear.  How are you feeling now?</i>" the mare asks with a smug smile.\n\n'
            );
            this.outx(
                'You heave in a relieved breath of air and tell her that you feel wonderful; she truly has magic fingers.  The mare giggles.  "<i>Thank you, dear.</i>"\n\n'
            );
        }
        // Medium CumQ
        else if (this.player.cumQ() <= 500) {
            this.outx(
                "The great gush of seed soaks Uma's hands beyond their capacity to hold it, dripping messily onto the floor and forming a noticeable puddle underneath where you are.  \"<i>Hmm that was plenty, dear.  You shouldn't let yourself build up so much cum, you know?  That isn't healthy. So, how are you feeling now?</i>\" she asks with a smile.\n\n"
            );
            this.outx(
                'Much better you say, once you can speak again, and you thank her for being willing to attend to your little problem.  The mare giggles, "<i>It was no problem, dear.</i>"\n\n'
            );
        }
        // High CumQ
        else if (this.player.cumQ() <= 1000) {
            this.outx(
                'A torrent of spunk surges from within your [cock], and Uma narrowly avoids getting splashed by the narrowest of margins, though you paint her hands and arms white with it.  A great puddle of cum splashes into being, one jet even hitting the wall on the other side of the room and trickling sloppily down its surface.  The seductive mare chuckles.  "<i>Oh, dear.  That\'s quite a bit you had built up. You should relieve your tension more often, you know?  Now, how do you feel?</i>" she asks smiling.\n\n'
            );
            this.outx(
                "You tell her that you feel wonderful, wondering how she will react to your nearly hitting her.  \"<i>That's good.  And don't worry about splashing me, I had to endure much worse when Loppe was going through puberty,</i>\" Uma responds. You privately note to yourself that Uma's comment makes sense, given what you know of Loppe.\n\n"
            );
        }
        // VHigh CumQ
        else if (this.player.cumQ() <= 2500) {
            this.outx(
                'Uma yelps in shock as you explode into an orgasm of considerably greater output than she was expecting; cum spatters onto her belly and even her face as veritable tidal waves of cum ripple out of your distending shaft, slopping wetly across the floor in a huge puddle that stretches until it hits the first sink and starts quietly oozing down.  Uma wipes your cum off her face casually.  "<i>My, my, that\'s quite a bit.  Makes me wonder who\'s messier, you, or my little Loppe,</i>" she laughs.  "<i>Oh, who am I kidding.  Knowing Loppe as well as I do, she\'s definitely much messier than that.  So, dear, how are you feeling now?</i>" she asks with a smile.\n\n'
            );
            this.outx(
                "Greatly relieved, you reply, but you cast a curious glance at the mess you made, wondering how long it will take her to clean this place up.  \"<i>Good. Hmm, I'll have to give this place a thorough cleaning later. I don't usually bring people here capable of making such a mess.  Anyway, I'm glad you're relieved, dear.</i>\"\n\n"
            );
        }
        // BUKAKAKAKEKAKEA MODE
        else {
            this.outx(
                'Uma doesn\'t even have time to yelp before your first gout of cum hits her in the face; your impossibly huge load fountains in a torrent that drenches her from head to hoof in creamy white seed, waves of spunk cascading across the floor to leave a foot-swallowing pond of seed, the drains in the floor audibly gurgling as they start greedily drinking your leavings.  Uma wipes your cum off her face, just enough so she can open her eyes again.  "<i>Dear, that was so much, when was the last time you blew your load?  You shouldn\'t go so long without emptying yourself, otherwise you could have health problems, you know?  Or, perhaps are you just this productive when it comes to seed?  If that\'s the case, I can see why my little Loppe would take such a liking to you,</i>" she chuckles.  "<i>Anyway, how do you feel now?</i>" she asks with a smile.\n\n'
            );
            this.outx(
                'Incredible, is all you can say, and even that is a breathy sigh of a word.  You take in the cum-soaked form of Loppe\'s mother, and the state of the room, and wonder how Loppe would react to seeing you do this.  "<i>That was quite a mess you made dear,</i>" she giggles.  "<i>I\'m glad Loppe isn\'t here, she\'d probably be trying to outcum you, and we both know how capable she is,</i>" the mare laughs before continuing,  "<i>Anyway, it\'s good that it felt great for you, dear.</i>"\n\n'
            );
        }

        this.outx(
            "Once you can stand up again, you get off the table and make your way to the cupboard"
        );

        if (this.player.cumQ() >= 500)
            this.outx(", audibly sloshing through the cum covering the floor, ");

        this.outx(" to get both your own clothes and Uma's.  You pull yours on");

        if (this.player.cumQ() >= 1000)
            this.outx(
                ", careful to avoid getting them soaked in your prodigious quantity of spunk"
            );

        this.outx(
            " and offer Uma's to her, thanking her once again for helping you with your relief.  \"<i>Don't worry about any mess, dear.  I'm just going to need a moment to sort myself out"
        );

        if (this.player.cumQ() >= 500) this.outx(", as well as the room");

        this.outx(
            ".  See you later, dear.  And don't be a stranger,</i>\" the mare tells you as she waves you goodbye.\n\n"
        );

        this.dynStats("lust=", 0);

        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Needs Cock.
    private sexGetABJFromDisMilfyLesboSlut(): void {
        // Aim for something right around the biggest she can take, otherwise just take smallest.
        let x: number = this.player.cockThatFits(25);
        if (x < 0) x = this.player.smallestCockIndex();
        this.clearOutput();
        this.outx("Fidgeting in place, very much aware of the cum-filled cock");
        if (this.player.cockTotal() > 1) this.outx("s");
        this.outx(
            " in your pants, you ask whether Uma would be willing to give you a little intimate release."
        );
        this.outx(
            '\n\nUma arches an eyebrow, "<i>Sorry, [name], but when it comes to cocks, my pussy and ass are both off-limits... I suppose that, for you, though, I could give you a blowjob - just because you’re my little Loppe’s special someone, though.</i>"'
        );
        this.outx("\n\nYou ");
        if (this.player.lust >= 75) this.outx("eagerly ");
        this.outx(
            'tell her that would be plenty, and thank her for her consideration.  "<i>Okay, follow me then.</i>"  The mare leads you away, out her office and down the corridor towards the far back of the clinic. Her enticing equine tail swishes lazily side to side the entire way, an organic magnet for your roving eyes.  You follow closely in her wake, looking forward to her “special treatment” with such ardor that you give up on concealing the tenting mass under your [armor]. It makes walking a little more difficult, but the feeling of your length'
        );
        if (this.player.cockTotal() > 1) this.outx("s");
        this.outx(" grinding and growing is well-worth the obvious discomfort.");

        this.outx(
            "\n\nThe room she leads you to is quite simple: wooden walls and floor, a couple of drains set in the boards that are probably for the more... fluid generous clientele, "
        );
        if (kGAMECLASS.urta.urtaLove())
            this.outx(
                "something that makes you wonder if Urta would like to come and take a spin here, "
            );
        this.outx(
            "and a sizable bamboo table.  It's covered in a white cloth and has an upraised board with a hole in it that looks like it’s big enough to fit your head through.  It is the only piece of furniture in the room apart from a small cupboard in the corner. Though spartan in its layout, this odd chamber is quite comfortably warm."
        );

        this.outx(
            '\n\n"<i>Strip, dear,</i>" Uma says cheerfully while beginning to strip herself.  You need no further encouragement, eagerly getting naked '
        );
        if (this.flags[kFLAGS.PC_FETISH] >= 1) {
            this.outx(
                ", unable to resist either the tingle of lust that runs through you at being naked in front of Uma or the urge to flaunt your feminine physique for her own gratification.  Gathering your clothes up is a bit of an afterthought, but you make sure to bend over and proudly present your [butt]"
            );
            if (this.player.balls > 0) this.outx(" and [balls]");
            this.outx(".");
        } else this.outx(", gathering your clothes up in your arms as you do so.");
        this.outx(
            "  Walking over to the cupboard, you find a couple of folded towels and ample space to stow your clothes."
        );

        this.outx(
            '\n\n"<i>Step aside, if you please</i>" you hear Uma say from behind you as she approaches, clothes in hand.  You move over with a smile while she finds an empty spot to put her garments.  "<i>Now... why don\'t get on my table so I can take a look at the problem.</i>"'
        );

        this.outx(
            "\n\nYou eagerly settle yourself onto her table as instructed, placing your head through the hole, [eachCock] jutting into the air and awaiting Uma’s mouth with anxious twitches.  You idly wonder how she’ll go about this..."
        );

        this.outx("\n\nThe motherly mare kneels before you, examining your shaft.  ");
        // VARIANTS NEEDED
        if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] < 2)
            this.outx(
                'It’s clear that she doesn’t really enjoy the notion that much, considering the way she’s looking at you.  "<i>All right, let’s get this over with.</i>"  '
            );
        else if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] < 5)
            this.outx(
                'She actually seems to be smiling a little as she looks at you.  "<i>All right, time to see if I can handle this brutish thing.</i>"  '
            );
        else
            this.outx(
                "It's clear that she doesn't mind doing this for you at all. In fact, she's even smiling down at you as she fondles you one-handed.  \"<i>Time to see if I can make you squirm as hard as Loppe does.</i>\"  "
            );
        this.outx("She opens her mouth wide and takes ");
        if (this.player.cockTotal() == 1) this.outx("your");
        else this.outx("a single");
        this.outx(" dick into her mouth, slurping on it.");

        this.outx(
            "\n\nIt's immediately apparent how her longer, equine-style face affords many advantages when it comes to oral pleasure.  Her capacitive mouth takes inch after inch after inch, long past when you would be normally threatening a gag-reflex, sliding you along her long, flat tongue as she goes.  Her efforts are far from expert, and you can tell that her heart isn't truly in this.  She stops her ministrations, adjusting her hair and saying, \"<i>Sorry dear.  I haven't gotten much practice at these.  They're not really my thing, normally"
        );
        if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] >= 2)
            this.outx(", but I guess you're changing that, aren't you?");
        else this.outx(".");
        this.outx(
            '</i>"  Then, she playfully licks along the underside of your cock, putting that lengthy tongue to work. "<i>'
        );
        if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] < 2)
            this.outx("You don't taste bad, all things considered.");
        else if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] < 5)
            this.outx("I think I'm starting to get used to your taste, [name].");
        else
            this.outx(
                "Mmmm...  Don't tell anyone, but I think I'm starting to like helping you like this."
            );
        this.outx('</i>"');

        this.outx(
            `\n\nGrunting softly at her ministrations, you let your [hips] shiver as she passes over your ${this.player.cockHead(
                x
            )} once more.  Her tightly sealed lips glide over your spit-slicked length at an even, nerve-tickling pace`
        );
        if (this.player.cocks[x].cockLength < 9) this.outx(" until she hits your [sheath]");
        else this.outx(" until she has her mouth as full as she can handle");
        this.outx(
            `.  She holds you like that, letting you feel her hot breath wash over the [skinFurScales] of your crotch.  Her tongue wags back and forth underneath you, slipping and sliding against you. Inside her mouth, your ${this.cockDescript(
                x
            )} twitches and jumps in her maw.  Beads of pre-cum are beading and dripping out onto her busy organ.`
        );

        this.outx("\n\nUma's shaft-muffled voice mumbles, \"<i>");
        if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] < 2) this.outx("Girls taste better.");
        else if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] < 5) this.outx("Not too bad.");
        else this.outx("Hmmm, give me more, [name].");
        this.outx('</i>"');

        // Bonus handjobbies?
        if (this.player.cockTotal() > 1) {
            this.outx("\n\nYou politely suggest she put ");
            if (this.player.cockTotal() == 2) this.outx("one of ");
            this.outx("her hands to work on your spare prick");
            if (this.player.cockTotal() > 2) this.outx("s");
            this.outx(
                ".  The curvacious mare hums at the thought, inadvertently sending pleasant shockwaves through your length as she considers.  Making up her mind, "
            );
            if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] < 3)
                this.outx("perhaps thinking it will end this sooner");
            else this.outx("perhaps encouraged by the way you swell in her mouth");
            this.outx(", she wraps ");
            if (this.player.cockTotal() == 2)
                this.outx("one hand around your girthy tool and starts pumping");
            else this.outx("both hands around your girthy tools and starts pumping");
            this.outx(", stroking up and down with firm twists of her practiced hand");
            if (this.player.cockTotal() > 2) this.outx("s");
            this.outx(".  Her soft palm");
            if (this.player.cockTotal() > 2) this.outx("s are");
            else this.outx(" is");
            this.outx(" the perfect mate to your spare length");
            if (this.player.cockTotal() > 2) this.outx("s");
            this.outx(
                `, and soon you are dribbling and dripping from all of your ${this.multiCockDescriptLight()}.`
            );
        }

        this.outx(
            "\n\nWhile the steady pleasure her mouth and tongue gives you has you feeling very, very good, it isn't quite bringing you towards the orgasm you came here craving.  You suggest she begin to bob up and down on you. \"<i>Cocks need to feel like they're fucking something,</i>\" you "
        );
        if (this.player.cor <= 33) this.outx("pleasantly explain");
        else if (this.player.cor <= 66) this.outx("explain");
        else this.outx("harshly explain");
        this.outx(".  ");
        if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] < 2)
            this.outx(
                "You can feel her nod in agreement through your pole, and soon after, she's plunging rhythmically up and down."
            );
        else
            this.outx(
                "Before you can even finish, she's plunging up and down along your length, letting you know that she's learned this particular song and dance quite well under your tutelage."
            );

        this.outx(
            "\n\nYou give up a moan of pleasure as your [hips] lift off the table's coverings.  The building ecstasy within you is rolling around your abdomen like an ingot of molten metal, bubbling and ready to explode.  It's all you can do to stop yourself from thrashing against Uma's tongue in an effort to bring that release on as quickly as possible.  You steady yourself, and with a gasp of pleasure, feel [eachCock] swell, as big and hard as it can get without exploding from the pressure.  Uma slows her fucking motions and starts to suck with the languid blowjob, getting more and more pre-cum on her tongue with each slide down.  Quiet, excited noises slip out of your throat, one after another as you come to the very edge of orgasm."
        );

        // {Less than five blowjobs}
        if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] < 5) {
            this.outx(
                "\n\nUma pulls off just as your flow of juices goes white and salty, the inevitable prelude to the first discharge of an orgasm.  A slightly sour expression is painted across her face from the sudden change and she looks on in shock as your length"
            );
            if (this.player.cockTotal() > 1) this.outx("s erupt");
            else this.outx(" erupts");
            this.outx(
                ".  Even though you are no longer enclosed in that wonderfully warm, wet hole, you still shoot long, powerful lances of cum.  Uma catches the first across her face before she can move. The second splatters across the breasts that once nursed Loppe, some even falling into the valley of her cleavage."
            );
            if (this.player.cumQ() >= 500)
                this.outx(
                    "  She gets out of the way after that, leaving you to lie there, spraying your seed like a perverted sprinkler."
                );
            if (this.player.cumQ() >= 1500)
                this.outx(
                    "  The massive cumsprays that land on you slowly slough off down towards the drains.  It's hard not to bliss at the sound of your loud noisily draining away."
                );
        }
        // {More than five blowjobs!}
        else {
            this.outx(
                `\n\nUma valiantly holds herself in place on your ${this.cockDescript(
                    x
                )}, just in time for the flow of your juices to turn white and salty, an inevitable prelude to the coming discharge of your orgasm.  She noisily slurps, emptying her mouth of precum to make room, and in the process, inadvertently provides you with even more impetus to unload.  `
            );
            if (this.player.cumQ() <= 25)
                this.outx(
                    "She dutifully swallows every drop of your average-sized load, her long tongue slipping and sliding around your shaft as she ensures it is completely cleaned."
                );
            else if (this.player.cumQ() <= 100) {
                this.outx(
                    "She dutifully attempts to swallow every drop, but your load is a little bigger than average, and she's forced to let some of the frothy spit and jizz mixture wash back out over your length."
                );
                if (this.player.balls > 0)
                    this.outx("  It rolls down to your [sack], coating it in warm, wet cum-shine.");
            } else {
                this.outx(
                    "She dutifully attempts to swallow, but your load is so massive that the first shot has her cheeks bulging.  She's used to dealing with you, though.  The canny mother relaxes the seal of her lips and begins to stroke you with her tongue once more, using your massive ejaculations as lubrication.  She pumps up and down, faster and faster, letting your jizz wash back out her lips and over your crotch, making this orgasm one of the biggest and messiest you've had in a while."
                );
                if (this.player.cumQ() >= 1000) {
                    this.outx(
                        "  By the time you finish shooting, the drains are noisily gurging as they struggle to handle the "
                    );
                    if (this.player.cumQ() <= 2000) this.outx("pool");
                    else if (this.player.cumQ() <= 30000) this.outx("bathtub worth");
                    else this.outx("lake");
                    this.outx(" of semen you've produced.");
                }
                this.outx("  Your crotch is absolutely glazed with the stuff.");
            }
            // Bonus dicks
            if (this.player.cockTotal() > 1) {
                this.outx("\n\nAngled off to the side");
                if (this.player.cockTotal() > 2) this.outx("s");
                this.outx(", your other erection");
                if (this.player.cockTotal() > 2) this.outx("s release");
                else this.outx(" releases");
                this.outx(
                    " all over the floor, fitfully sagging, then thickening with each shot.  "
                );
                if (this.player.cockTotal() == 2) this.outx("Its ");
                else this.outx("Their ");
                this.outx("lewd dance continues on in imitation of your main member's pleasure.  ");
                if (this.player.cockTotal() == 2) this.outx("It's ropes");
                else this.outx("Their ropes");
                this.outx(" aren't anywhere near as thick.");
            }
        }
        // epilogue
        // Came on her face
        if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] < 2) {
            this.outx(
                '\n\nUma wipes her face off some of your seed.  "<i>I’m fine.  Sorry about that, dear... but blowing is not really my thing, you know?  The only other person I did this for was Loppe’s father, and even then I didn’t like it so much... maybe you should have gone to Loppe instead?</i>"'
            );
            this.outx("\n\nYou tell her you’ll remember that, ");
            if (this.player.cor <= 40) this.outx(" apologize, and ");
            this.outx("get up to start getting dressed before quietly heading back to camp.");
        }
        // Came on her face after second time:
        else if (this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU] < 5) {
            this.outx(
                '\n\nUma wipes her face off some of your seed.  "<i>I’m fine.  Sorry about that, dear... I\'m trying but to be honest, the idea of having a male member go off in my mouth like that startles me.  The gush of a wet pussy on your lips is just so much more understandable.  I bet Loppe wouldn\'t mind doing this for you, you know.</i>"  She suddenly smirks, "<i>Unless you\'ve got some kind of fetish for letting older mares milk you?</i>"'
            );
            this.outx(
                "\n\nYou give her a wink and a smile as you depart.  She's getting better at this."
            );
        }
        // Came in her mouth
        else {
            this.outx(
                "\n\nUma slowly licks your cockslime from her lips and swallows, opening up her mouth to show you just how good she's getting at swallowing your goo.  \"<i>I never would have thought that I'd be looking forward to bending over and taking a penis in my mouth, but... there's something special about you, [name].  I can see why Loppe fell for you so quickly.</i>\"  She licks her lips once more, this time running her tongue along her teeth to collect every little drop of your jism.  \"<i>It's just nice, feeling you twitch inside me like that, trusting my mouth to please you so.  It's so different from a massage or a handjob - more intimate I suppose.</i>\"  The smell of feminine arousal is faint in the air under the musky aroma of your spunk."
            );
            // Higher cum quantity epilogue.
            if (this.player.cumQ() > 25) {
                this.outx(
                    "\n\nShe extends a towel to you.  \"<i>Just because your cum is starting to taste okay doesn't mean I'm licking all that up.  Get clean, dear.</i>\""
                );
                this.outx(
                    '\n\nYou wipe up with a rueful smile while Uma gets dressed.  She comes back with your clothes and helps you into them, giving your package an appreciative squeeze "to make sure it emptied" before sending you on your way to camp.'
                );
            }
            // Else normal epilogue.
            else {
                this.outx(
                    '\n\nUma gets dressed while you cool off.  She comes back with your clothes and helps you into them, giving your package an appreciative squeeze "to make sure it emptied" before sending you on your way to camp.'
                );
            }
        }
        this.dynStats("lust=", 0);
        this.flags[kFLAGS.UMA_TIMES_SUCKED_YOU]++;
        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    private sexEatHerOut(): void {
        this.clearOutput();

        this.outx(
            "With a lustful smirk, you ask if Uma would like to receive a little ministering from you for a change?\n\n"
        );
        this.outx(
            "\"<i>Oh so you want to try the goods, so to say?  Well, as long as you stick to a hands-only approach, I personally don't have a problem... but wouldn't you rather have me do something for you?</i>\"\n\n"
        );
        this.outx(
            'You shake your head; you thought it was time someone showed Uma a good time for a change.  "<i>Well, if you\'re sure about that, then I have no problem with that, but care to enlighten me on what exactly you are thinking of, dear?</i>"\n\n'
        );
        this.outx(
            'You consider your options, and then pointedly lick your lips, musing aloud how Uma tastes.  "<i>Hmm, so that\'s what you were thinking about, huh?  Very well, dear.  Come with me.</i>"  \n\n'
        );
        this.outx(
            'The mare leads you away, out her office and down the corridor, towards the far back of the clinic, equine tail swishing lazily side to side.  You follow closely in her wake, looking forward to her "special treatment".\n\n'
        );
        this.outx(
            "The room she leads you to is quite simple; wooden walls and floor, a couple of drains set in the floor that are probably for the more fluid generous clientele, "
        );

        if (kGAMECLASS.urta.urtaLove())
            this.outx(
                "something that makes you wonder if Urta would like to come and take a spin here, "
            );

        this.outx(
            "and a sizable table, made from bamboo; it's covered in a white cloth, and has an upraised headboard with a hole in it that looks like it's big enough to fit your head through.  This is the only piece of furniture in the room, apart from a small cupboard in the corner.  Though spartan in its layout, the room is quite comfortably warm.\n\n"
        );
        this.outx(
            'Uma begins stripping while you watch the older mare\'s beautifully sculpted body.  You wonder how old she is?  With a body like hers, she could probably pass for Loppe\'s sister, although she does have a few signs of being more mature.  Rather than making her look less beautiful, they make her even more stunning.  "<i>Dear?  Hello, dear?</i>" Uma waves a hand in front of you,  "<i>Still there, dear?</i>"  You shake your wandering thoughts out of your head and turn to look at her.  The seductive mare giggles.  "<i>You should undress.  That is, unless you want your [armorname] to smell like horny mare.</i>"  You nod in understanding, stripping yourself down and storing your things carefully in the nearby cupboard, beside Uma\'s own clothing.\n\n'
        );
        this.outx(
            "As you're busying yourself with your things, Uma struts with quiet confidence over to the table and seats herself on it, hands at her sides and gripping the edges for extra support, legs spread and smiling knowingly, as if anticipating your approval.   \"<i>Well, dear?  I'm ready if you are,</i>\" she laughs softly, one hand lifting off the table to caress her breasts, as much to start honing her arousal as to entice you to approach.\n\n"
        );
        this.outx(
            "You approach the mare and kneel before her, inhaling her scent as you do so.  It smells sweet, enticing and arousing, a fragrance that sends your head reeling with Uma's arousal.  You find the fires of your arousal burn even hotter now.  "
        );

        if (this.player.hasCock()) this.outx("Blood engorges [eachCock],  ");
        if (this.player.hasVagina())
            this.outx(
                "moisture gathers on your netherlips, drops of your arousal sliding out of your [pussy] and down towards your [feet].  "
            );
        this.outx("You gaze up at Uma, silently asking for permission.\n\n");

        this.outx(
            'With a gentle smile and a seductive wiggle, she gently rubs her sweet cunt.  "<i>Go on, dear,</i>" she urges you on letting out a girly giggle immediately afterwards. \n\n'
        );
        this.outx(
            "You promptly bury your face between her firm thighs, licking around her labia, tasting her juices, before you slowly part her nethers with the tip of your tongue.\n\n"
        );
        this.outx(
            "She moans appreciatively, thighs gently wrapping themselves around your neck.  \"<i>Mmm my dear, you are such an eager little thing, aren't you?  No need to rush, I'm not going to run away,</i>\" she teases, leaving the obvious add-on hanging in the air.\n\n"
        );
        this.outx(
            "You respond by eagerly digging your mouth even deeper into the soft folds of Uma's sex, extending your tongue to reach even deeper inside the pretty filly.  Her taste is wonderful. Familiar and yet distinct, with a spice you attribute to being the mare's personal taste.  So intent you are on eating her out, that you're almost like a horse, eager to taste the dewy grass of the morning pasture.\n\n"
        );
        this.outx("Uma moans and groans appreciatively, one hand reaching down to rub your head ");

        if (
            this.player.earType == 2 ||
            this.player.earType == 9 ||
            this.player.earType == 5 ||
            this.player.earType == 7
        )
            this.outx("between your ");

        if (this.player.earType == 2) this.outx("canine ");
        if (this.player.earType == 9) this.outx("vulpine ");
        if (this.player.earType == 5) this.outx("feline ");
        if (this.player.earType == 7) this.outx("loporid ");

        if (
            this.player.earType == 2 ||
            this.player.earType == 9 ||
            this.player.earType == 5 ||
            this.player.earType == 7
        )
            this.outx("ears.  ");

        this.outx(
            '"<i>Mmm oh yes dear, yes, that feels good.  It\'s been awhile since someone would do that for me...</i>"  She croons in her pleasure.\n\n'
        );
        this.outx(
            "You take your mouth off her plush netherlips to pant and regain your breath, licking around your mouth to taste more of her.  You don't take long before you plunge yourself back between her legs, licking, slurping, drinking and tasting.\n\n"
        );
        this.outx(
            '"<i>Oh! Oh-oh-OH!</i>"  Uma\'s legs close tightly around your neck, humping her cunt against your [face] before she shudders violently in orgasm, the wetness of her climax splashing across your lips and running down your chin.  One last pleasure-stoked spasm and she slumps in release, her legs unclenching and then sliding off of your shoulders to clop against the floor.  Breathing heavily, she smiles at you.  "<i>Mmm my dear, my little Loppe is a lucky girl indeed to have you willing to do that for her.</i>"\n\n'
        );
        this.outx(
            "You lick your lips and wipe the aftermath from your face, smiling broadly at the mare's flattery.  Shaking herself, Uma yawns loudly, one hand in front of her face to be more demure.  \"<i>That really felt wonderful... I think... I think I'm going to take a little rest.  Would you be a dear and flip the sign to Closed on your way out, dear?</i>\" she asks, settling back on her table as if she really is about to have a nap here in her own workroom. \n\n"
        );
        this.outx(
            "You rub her thigh affectionately, promising to do so, then redress yourself and head back to camp.\n\n"
        );

        this.dynStats("lust", 30);

        this.menu();
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    /**
     * Incomplete in the doc
     */
    /* private function trainLoppe(): void
    {
You mention to Uma that her daughter has mentioned something about Uma wanting her to learn the family trade?

The mare nods at you. \"<i>Yes, that's true.  Don't get me wrong, my little girl's a wonderful dancer, but, well, dancing's such a demanding and unreliable way to make a living - at least with acupuncture and massage there's always going to be people wanting to use your skills.  Believe me, I'm run off my hooves with all the customers I get hoping to ease the tension that comes from living in these troubled times.  Plus... well, call me a pervy old woman if you must, but I'd like to see grandkids at some point in my life.</i>\"  She shrugs helplessly.  \"<i>But I can't really spare the time to train her on my own, and I couldn't in good conscience just let her loose on my paying customers.</i>\"

You think the matter over, and ask what if you volunteered to help Loppe with her training?  The MILFy horse-morph gives you a joyous smile.  \"<i>That would be wonderful!  All my little girl really needs is some practice and she can be officially credited with her license.  Please, wait here for a few minutes while I go and fetch her.</i>\"  She asks you, and you quietly agree, making yourself comfortable even as she grabs some belongings and heads out.

[We should probably try and brainstorm how this will work.]
[Should we move this to its own doc? Give the rest over to Fen to implement?]
    }*/
}
