import { trace } from "../../../console";
import {
    LOWER_BODY_TYPE_CENTAUR,
    LOWER_BODY_TYPE_GOO,
    LOWER_BODY_TYPE_NAGA,
    SKIN_TYPE_GOO,
    TAIL_TYPE_DOG,
    TAIL_TYPE_HORSE,
    TAIL_TYPE_NONE,
    TONUGE_DEMONIC,
    TONUGE_DRACONIC,
    TONUGE_HUMAN,
    TONUGE_SNAKE,
    VAGINA_WETNESS_DROOLING,
    VAGINA_WETNESS_SLAVERING,
    VAGINA_WETNESS_SLICK,
    VAGINA_WETNESS_WET,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { CoC } from "../../CoC";
import { CockTypesEnum } from "../../CockTypesEnum";
import { CocSettings } from "../../CoC_Settings";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { PerkLib } from "../../PerkLib";
import { PregnancyStore } from "../../PregnancyStore";
import { StatusAffects } from "../../StatusAffects";
import { TimeAwareInterface } from "../../TimeAwareInterface";
import { Katherine } from "../Places/TelAdre/Katherine";
import { Scylla } from "../Places/TelAdre/Scylla";
import { NPCAwareContent } from "./NPCAwareContent";

export class Urta extends NPCAwareContent implements TimeAwareInterface {
    // Urta variables
    // flags[kFLAGS.TIMES_FUCKED_URTA] = times fucked
    // flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = urtas horsecock comfort level
    // -1 = PC pissed her off
    // 0 = first timern
    // 1-10 = slightly comfortable
    // 11+ = flaunt it
    // flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = hours turned off
    // 0 = ready to rock!

    // Urtas horsey bits =
    // LxW = 20x3
    // Luv Lock - flags[kFLAGS.URTA_PC_LOVE_COUNTER]:
    // 0 = normal, 1 = love, -1 = never love, flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] -1 = hate
    /* Luv rating! - flags[kFLAGS.URTA_PC_AFFECTION_COUNTER]
    -Increased by 1-2 per sex.  Increased by 1 for visiting off duty
    -Drops hugely if you go to her house and leave.
    -Small drop if you come to her table and leave.
    -Drops by 1 per day.
    */

    // const URTA_FAMILY_TALK_ATTEMPTS: number = 442;
    // const URTA_OPEN_ABOUT_EDRYN: number = 443;
    // const PC_DISLIKES_URTA_AND_EDRYN_TOGETHER: number = 444;
    // const DISCUSSED_URTA_ALCOHOLISM: number = 445;
    // const URTA_EGGS: number = 582;
    // const URTA_FERTILE_EGGS: number = 583;
    // const URTA_EGG_FORCE_EVENT: number = 584;
    // const URTA_TIMES_EGG_PREGGED: number = 585;
    // const URTA_EGG_INCUBATION: number = 586;
    // const URTA_FLATBELLY_NOTICE: number = 587;
    // const URTA_SCYLLA_BIG_DICK_TIMES_DONE: number = 633;
    // const URTA_FERTILE: number = 723;
    // const URTA_PREG_EVERYBODY: number = 724;
    // const URTA_CUM_NO_CUM_DAYS: number = 782;
    // const URTA_X_RAPHAEL_HAPPENED: number = 783;
    // const MET_OLIVIA: number = 822;
    // const URTA_PETPLAY_DONE: number = 857;

    public pregnancy: PregnancyStore;
    public drainedByKath = false;

    public constructor() {
        super();
        this.pregnancy = new PregnancyStore(
            kFLAGS.URTA_PREGNANCY_TYPE,
            kFLAGS.URTA_INCUBATION,
            0,
            0
        );
        this.pregnancy.addPregnancyEventSet(
            PregnancyStore.PREGNANCY_PLAYER,
            330,
            334,
            288,
            240,
            192,
            144,
            96,
            48
        );
        // Event: 0 (= not pregnant),  1,   2,   3,   4,   5,   6,  7,  8,  9 (< 48)
        CoC.timeAwareClassAdd(this);
    }

    // Implementation of TimeAwareInterface
    public timeChange(): boolean {
        let needNext = false;
        this.drainedByKath = false; // This var will only be set true after Kath licks Urta out - it stops you from going back immediately for more Urta sex
        this.pregnancy.pregnancyAdvance();
        trace(
            `\nUrta time change: Time is ${this.model.time.hours}, incubation: ${this.pregnancy.incubation}, event: ${this.pregnancy.event}`
        );
        if (this.flags[kFLAGS.NEED_URTA_LETTER] == 1 && this.model.time.hours == 6)
            this.urtaPregs.getUrtaLetter(); // Urta Letters
        if (
            this.pregnancy.incubation == 0 &&
            (this.pregnancy.type == PregnancyStore.PREGNANCY_BEE_EGGS ||
                PregnancyStore.PREGNANCY_DRIDER_EGGS)
        ) {
            this.pregnancy.knockUpForce(); // Silently clear Urta's egg pregnancy
            this.flags[kFLAGS.URTA_EGGS] = 0;
            this.flags[kFLAGS.URTA_FERTILE_EGGS] = 0;
        }
        if (this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] > 0)
            this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME]--; // Count down timer for urta's lust
        if (this.flags[kFLAGS.URTA_EGG_FORCE_EVENT] > 0) this.flags[kFLAGS.URTA_EGG_FORCE_EVENT]--; // Countdown to urta freakout
        // Urta egg freak out
        if (
            this.flags[kFLAGS.URTA_EGG_FORCE_EVENT] > 0 &&
            this.model.time.hours > 6 &&
            this.model.time.hours < 18 &&
            this.flags[kFLAGS.URTA_EGG_FORCE_EVENT] < 12
        ) {
            this.outx(
                "\n<b>You feel like you ought to see how Urta is dealing with your little 'donation', and head in to Tel'Adra for a quick checkup on her...</b>\n"
            );
            this.urtaChewsOutPC(false);
            needNext = true;
        }
        if (this.flags[kFLAGS.URTA_ANGRY_AT_PC_COUNTDOWN] > 1) {
            this.flags[kFLAGS.URTA_ANGRY_AT_PC_COUNTDOWN]--;
            if (this.flags[kFLAGS.URTA_ANGRY_AT_PC_COUNTDOWN] < 1)
                this.flags[kFLAGS.URTA_ANGRY_AT_PC_COUNTDOWN] = 1;
        }
        if (this.model.time.hours > 23) {
            if (this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] == 0)
                this.flags[kFLAGS.URTA_CUM_NO_CUM_DAYS]++;
            else this.flags[kFLAGS.URTA_CUM_NO_CUM_DAYS] = 0;
            if (this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] > 0) {
                this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] -= 0.5;
                if (this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] < 0)
                    this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] = 0;
            }
        }
        return needNext;
    }

    public timeChangeLarge(): boolean {
        return false;
    }
    // End of Interface Implementation

    public urtaSprite(): void {
        if (this.urtaDrunk()) this.spriteSelect(84);
        else this.spriteSelect(1);
    }

    public urtaCapacity(): number {
        let bonus: number = this.flags[kFLAGS.TIMES_RUT_FUCKED_URTAS_CUNT] * 5;
        if (bonus > 40) bonus = 40;
        if (this.flags[kFLAGS.URTA_TENTACLE_GAPED] > 0) return 500;
        return 60 + bonus;
    }

    public urtaLove(love = 0): boolean {
        if (this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == -1) return false;
        if (love == 0) {
            return this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == 1;
        }
        if (love > 0) {
            this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] += love;
        }
        if (love < 0) {
            this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] -= love;
        }
        if (this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == 1) {
            // Queue up Amily madness
            // Only happens if freakout hasn't happened yet.
            if (
                love > 0 &&
                this.flags[kFLAGS.AMILY_VISITING_URTA] == 0 &&
                this.amilyScene.amilyFollower() &&
                this.flags[kFLAGS.AMILY_FOLLOWER] == 1
            )
                this.flags[kFLAGS.AMILY_NEED_TO_FREAK_ABOUT_URTA] = 1;
            return true;
        } else return false;
    }

    public urtaAvailableForSex(): boolean {
        return (
            this.urtaFuckbuddy() &&
            this.telAdre.scylla.action != Scylla.SCYLLA_ACTION_FUCKING_URTA &&
            this.flags[kFLAGS.URTA_ANGRY_AT_PC_COUNTDOWN] == 0
        );
    }

    public urtaFuckbuddy(): boolean {
        // Returns true if Urta is either the player's fuckbuddy or lover
        if (
            kGAMECLASS.urtaQuest.urtaBusy() ||
            this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] == -1
        )
            return false;
        if (this.urtaJustFriends()) return false;
        return this.flags[kFLAGS.TIMES_FUCKED_URTA] > 0;
    }

    public urtaJustFriends(): boolean {
        return (
            this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] == 0 &&
            this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == -1
        );
    }

    public urtaAtBar(): boolean {
        // Is Urta physically at the Wet Bitch?
        return (
            !kGAMECLASS.urtaQuest.urtaBusy() &&
            this.flags[kFLAGS.AMILY_VISITING_URTA] != 1 &&
            this.model.time.hours < 15 &&
            this.flags[kFLAGS.KATHERINE_UNLOCKED] != 3
        );
    }

    public urtaDrunk(): boolean {
        // Preg = no drinking!
        if (this.pregnancy.isPregnant) return false;
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] == -1) return false;
        if (this.model.time.hours > 12 && this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] < 1)
            return true;
        if (this.model.time.hours > 8 && this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] >= 1)
            return true;
        else return false;
    }

    private urtaOpenAboutEdryn(): boolean {
        // Did it come out from the scylla threesome?
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00145] > 0) return true;
        // Did it come out from marble?
        if (this.flags[kFLAGS.URTA_KNOWS_PC_HAS_MARBLE_FOLLOWER] > 0) return true;
        // Did it come out from discussions?
        if (this.flags[kFLAGS.URTA_OPEN_ABOUT_EDRYN] > 0) return true;
        return false;
    }

    public knockUpUrtaChance(): void {
        // Moved here from UrtaPregs since it needs to be accessed from outside Urta
        // GTFO IF PREGGO
        if (this.pregnancy.isPregnant) return;
        // GTFO IF NOT FERTILE
        if (this.flags[kFLAGS.URTA_FERTILE] != 1) return;
        // 10% + up to 40% @ 1000mLs of cum, with bonus virility!
        let chance = 10;
        this.temp = this.player.cumQ() / 25;
        if (this.temp > 40) this.temp = 40;
        chance += this.temp;
        // Bonus virility time!
        this.temp = this.player.virilityQ() * 100;
        if (this.temp > 50) this.temp = 50;
        chance += this.temp;
        // FINAL ROLL!
        if (chance > Urta.rand(100)) {
            this.pregnancy.knockUpForce(PregnancyStore.PREGNANCY_PLAYER, 384);
            this.flags[kFLAGS.URTA_PREGNANT_DELIVERY_SCENE] = 0;
        }
    }

    public urtaBarDescript(): boolean {
        this.outx("\n\n", false);
        // Urta PISSED
        if (this.flags[kFLAGS.URTA_ANGRY_AT_PC_COUNTDOWN] > 1) {
            this.outx(
                "Urta is sitting at a table, swishing a bottle around and looking forlorn.  She glances up and sees you, then immediately turns away.",
                false
            );
            return false;
        }
        //  [PISSED URTA TALK]
        //  Urta looks up at you and growls, \"<i>Do I look like I want to talk to you right now? Fuck off.</i>\"
        // [Post Pissed Talk]
        if (this.flags[kFLAGS.URTA_ANGRY_AT_PC_COUNTDOWN] == 1) {
            this.outx(
                "Urta is sitting at a table, swishing a bottle around and looking forlorn.  She looks up at you and sighs, \"<i>Look, I still don't think we'll ever be the same, but to be frank, we're great in the sack and I've been lonely.  For now, I'll put the past behind me.</i>\"",
                false
            );
            this.flags[kFLAGS.URTA_ANGRY_AT_PC_COUNTDOWN] = 0;
            return true;
        }
        // Raphael betrayed reward
        if (
            this.flags[kFLAGS.RAPHEAL_COUNTDOWN_TIMER] == -1 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00148] == 0
        ) {
            this.outx(
                "Urta has an ecstatic grin plastered across her muzzle, and it only gets wider when she sees you.  Perhaps you should see what all the fuss is about?",
                false
            );
            return true;
        }
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00350] == 1) {
            this.outx(
                "Urta is sitting at her usual table, holding her head in her hands.  She doesn't even seem to notice you.",
                false
            );
            return true;
        }
        // [URTA ASHAMED]
        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] == -1) {
            this.outx(
                "You see Urta on a bench in the corner with her legs crossed nervously.  Her tail is curling tightly around her leg, hiding the massive surprise between her legs.  In her hand is a mostly empty bottle of whiskey.  She's wobbling back and forth in her seat, and keeping her head down, refusing to meet your gaze any time you spare a glance her way.  It looks like she wants nothing to do with you.",
                false
            );
            return true;
        }
        // Post Scylla Appearance
        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00145] == 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00143] > 0
        ) {
            this.outx(
                "Urta's at her normal table, nursing a glass of water with nary a bottle of alcohol around.  She's fidgety and constantly glancing your way, but she never meets your eyes or acknowledges that she saw you.  Something is eating away at her.",
                false
            );
            return true;
        }
        // PREGNANT URTA
        if (this.pregnancy.isPregnant) {
            if (this.pregnancy.type == PregnancyStore.PREGNANCY_PLAYER) {
                this.urtaPregs.urtaPregAppearance();
            } else {
                // Egg-Stuffed Urta:
                // This replaces the normal "display" for Urta in the Wet Bitch screen
                /// This scene lasts for the duration of Urta's egg pregnancy, whatever that is
                // Egg Level 1:
                if (this.flags[kFLAGS.URTA_EGGS] < 20)
                    this.outx(
                        "Urta is sitting quietly at her usual seat, sipping a mug of some non-alcoholic beer.  Though her clothes are still in place, you can just make out the bulging midriff stretching them taut, a consequence of all the eggs in her womb."
                    );
                else if (this.flags[kFLAGS.URTA_EGGS] < 40)
                    this.outx(
                        "Urta is sitting rather uncomfortably at her usual seat.  Her swollen stomach is so large it keeps her from wearing her usual outfit, instead forcing her into a mini-shirt and a skirt bottom, allowing her midriff to be bare.  She occasionally runs a hand over the expanse, as if she can't believe it's actually there."
                    );
                // Egg Level 3:
                else
                    this.outx(
                        "Urta's bloated belly forces her to sit side-saddle at her usual table, the lumpy, egg-stuffed mass ballooning out in front of her.  Forced into a midriff-baring ensemble, she frequently touches it, occasionally seeming to trace an egg through the taut skin."
                    );
            }
            return true;
        }
        // Eggs Laid:
        // This replaces the normal "display" for Urta in the Wet Bitch Screen
        // This scene only appears once, after Urta's "pregnancy" is over
        if (
            this.flags[kFLAGS.URTA_TIMES_EGG_PREGGED] > 0 &&
            !this.pregnancy.isPregnant &&
            this.flags[kFLAGS.URTA_FLATBELLY_NOTICE] == 0
        ) {
            this.outx(
                "Urta is seated at her usual spot in her usual dress, eagerly chugging down mug after mug of booze; her belly is washboard-flat again, and she's clearly making up for lost time after having given up alcohol for her 'pregnancy'."
            );
            this.flags[kFLAGS.URTA_FLATBELLY_NOTICE] = 1;
            return true;
        }
        // [Love Urta Bar Appearance]
        if (this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == 1) {
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] == -1 || !this.urtaDrunk())
                this.outx(
                    "Urta is sitting at her usual table, sipping a glass of wine and wearing a form-fitting evening gown of shimmering black.  She looks up at you, happiness filling her eyes when she notices you entering the bar.",
                    false
                );
            // (DRUNK)
            else
                this.outx(
                    "Urta is sitting at her usual table wearing a shimmering black dress.  She's pretty clearly sloshed judging by her bleary gaze as she looks up at you.  The front of her dress visibly tents, and she waves you over with a lecherous grin.",
                    false
                );
            return true;
        }
        if (
            this.flags[kFLAGS.TIMES_FUCKED_URTA] == 0 &&
            this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] > -1
        ) {
            this.outx(
                "You see Urta on a bench in the corner with her feet propped up on a stool.  Her tail is coiled tightly around her left leg, just like every other time you've seen her.  The pretty gray fox gives you a slight nod before turning her attention back to the large square bottle of whiskey in front of her.",
                false
            );
            return true;
        }
        // [URTA FUCKBUDDIED]
        if (this.flags[kFLAGS.TIMES_FUCKED_URTA] > 0) {
            this.outx(
                "You see Urta on a bench in the corner with her feet propped up on a stool.  She has a small mug on a table, quite different from the swill she chugged when you first met.  Her clothing is... far more risqué.  The top she's chosen for the moment is sheer to the extreme, making her proud black nipples visible to anyone who glances her way, and the short skirt she's wearing is nearly revealing her cunny.  ",
                false
            );
            if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] < 11)
                this.outx(
                    "Thankfully she still has her other addition trapped under her tail, for now.",
                    false
                );
            else
                this.outx(
                    "Her half-hard horse-cock is plainly visible to anyone who spares her a glance, barely contained by a pair of tightly woven fishnet stockings.  She's looking at you and wiggling a finger your way...",
                    false
                );
            return true;
        }
        CocSettings.error("");
        trace("URTA Error: Bar descript encountered unexpected scenario.");
        return false;
    }

    public urtaBarApproach(): void {
        this.urtaSprite();
        // Images are handled by ImageManager now. This was the old way of doing things.
        // showImage(0);
        let temp;
        let spank;
        if (
            (this.player.hasCock() && this.player.cockThatFits(this.urtaCapacity()) >= 0) ||
            this.player.hasKeyItem("Deluxe Dildo") >= 0
        )
            spank = this
                .spankTheShitOutOfUrtaAndMakeHerCreamHerselfFromProstateStimulationAloneLikeTheHornyDrunkenSlutSheReallyIs;
        this.clearOutput();
        // Raphael Reward
        if (
            this.flags[kFLAGS.RAPHEAL_COUNTDOWN_TIMER] == -1 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00148] == 0
        ) {
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00148] = 1;
            this.player.gems += 1000;
            this.statScreenRefresh();
            this.outx(this.images.showImage("urta-bar"), false);
            this.outx(
                "Urta claps as you walk up to her with an exuberant smile spread across her vulpine face.  She proudly announces, \"<i>You really turned in the Russet Rogue?!  I almost can't believe it.  Do you know how many women that rascal has fleeced out of their possessions?  The last count I made was over three dozen, and he even had the audacity to try it with me.  I'm ashamed to admit it nearly worked, but once he saw ALL of me, well he couldn't keep up the facade.  I nearly caught him that night.</i>\"\n\n",
                false
            );

            this.outx(
                "You smirk at her tale.  Knowing Raphael, seeing a horny Urta would've made him white as a ghost.  She goes on to list some of his crimes, \"<i>He's guilty of petty theft, disturbing the peace, robbery, lewd public behavior, lying under oath, defacing a public structure, destroying a public structure... I'd probably have to get the paperwork to remember the rest.  In truth his shenanigans aren't usually a big deal individually, but they've added up and garnered him a fairly sizable bounty.  He'll serve his punishment, and I hope he learns his lesson for a change.</i>\"\n\n",
                false
            );

            this.outx(
                "Urta fishes out a rather sizable pouch and tosses it onto the table, the numerous gems inside tinkling loudly as it plops down in front of you.  You untie the silken cord that holds the leather bag closed and see hundreds of sparkling gems, perhaps even a thousand.  Wow!  Raphael must have pissed off the wrong people!\n\n",
                false
            );

            this.outx(
                "The gray fox knocks back a swig from her bottle and sighs as if you've just removed one of the many weights hanging from her shoulders.  She looks back at you with a twinkle in her eyes, and you realize you've definitely improved her opinion of you.  Sadly there isn't time for more chit-chat, and you head back to camp, your gem-pouch heavy with new weight.",
                false
            );
            // (+love score!)
            this.urtaLove(3);
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // Post Amily Sad Shit
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00350] == 1) {
            this.amilyXUrtaUrtaFallout();
            return;
        }
        if (this.urtaJustFriends()) {
            // You are friends with Urta, can talk about stuff not related to romance
            this.friendsTalkExpack();
            return;
        }
        // [URTA ASHAMED APPROACH]
        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] == -1) {
            this.outx(
                'You approach Urta, but she slams her bottle down on the table hard enough to make it rattle.  She slurs, "<i>Jusht... stay away from me.  I don\'t want any company right now.</i>"\n\n',
                false
            );
            this.outx("There's nothing to do but leave....");
            this.doNext(this.telAdre.barTelAdre);
            return;
        }
        // Post Scylla discussion
        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00145] == 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00143] > 0
        ) {
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00145] = 1;
            this.outx(
                "The apprehensive fox-morph's gaze lurches up at the sound of your approach, eyes going wide with nervousness.  Clearly she remembers her inebriated encounter with Scylla and is a little worried about the implications.  You sidle up to the table and look her in the eye questioningly – she must have something to say.\n\n",
                false
            );

            this.outx('"<i>I... I want to apologize for the other night.  ', false);
            // (variant I: Love)
            if (this.urtaLove())
                this.outx(
                    `I got drunk, I got horny, and Scylla kept offering.  I've turned her away so many times, but she looked so... hungry, like, sexually ravenous, and I lost control.  I love you ${this.player.short}.  I've never had a relationship like this and it's hard being apart from you – so very hard.  I-I'd understand if you didn't want to see me anymore, but if you think about it, we could have a LOT of fun together.  If you want I'd do everything possible to avoid this happening again, even cutting back on my drinking.  Please, I love you.`
                );
            // (variant II: Comfortable Fuckbuddies)
            else if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] >= 11)
                this.outx(
                    "I got really drunk, and well, Scylla is very, very sexy.  In this day and age having multiple partners doesn't raise that many eyebrows, but I know where you're from and I'd understand if you didn't like what happened.  It doesn't excuse my actions though, I definitely should've brought this up before now, and I-I'd understand if its made you doubt my judgement enough to never want to see me again.  Before you say anything, being with you... it changed my life.  You've given me back confidence and comforted me in ways no one has before.  If I have to cut back on my drinking and have someone drag me out of the room every time Scylla is around to stay with you, I will.  Please, don't leave me.",
                    false
                );
            // (variant III: Still Nervous)
            else
                this.outx(
                    "I was so drunk and horny, and Scylla... she's very persuasive.  Y-you've been the only one to like me for me, even with this... this thing between my legs.  Having someone else want it when you're drunk and horny... I couldn't say no.  S-sometimes I just... NEED to cum.  And she said you'd let her help you before so I thought you'd be okay with it.  But now that I've had a chance to think on it... are you okay with it?  Please, don't just walk away from me... from us.  I'll curb my drinking if I have to.  I'll even pay someone to keep an eye on me while I drink if I have to.  Just.. what do you want me to do?",
                    false
                );
            this.outx('</i>"\n\n', false);

            this.outx("She snaps her mouth shut and looks at you ");
            if (this.urtaLove()) this.outx("with a worried expression");
            else if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] >= 12)
                this.outx("anxiously");
            else this.outx("nervously");
            this.outx(
                " while she awaits your reply.  It seems you could tell her to stay away from Scylla, enjoy Scylla, or just tell her you don't want to see her again.  What do you do?",
                false
            );
            // [No Scylla] [Scylla Okay] [Leave Her]
            this.simpleChoices(
                "No Scylla",
                this.tellUrtaNoMoreScylla,
                "Scylla Okay",
                this.tellUrtaMoreScyllaIsFine,
                "Leave Her",
                this.leaveUrtaAfterScyllaConfrontation,
                "",
                undefined,
                "",
                undefined
            );
            return;
        }
        // TO ZE FLIPOUT!
        if (this.flags[kFLAGS.URTA_EGG_FORCE_EVENT] > 0) {
            this.urtaChewsOutPC();
            return;
        }
        if (this.telAdre.katherineEmployment.canTalkToUrta()) {
            // Katherine training discussion
            this.telAdre.katherineEmployment.talkToUrta();
            return;
        }
        // PREGNANT URTA
        if (this.pregnancy.type == PregnancyStore.PREGNANCY_PLAYER) {
            this.urtaPregs.urtaPreggoApproached();
            return;
        }
        // HERE WE GOEZ!
        if (
            this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] >= 5 &&
            ((this.player.inRut && this.player.hasCock()) ||
                (this.player.inHeat && this.player.hasVagina()))
        ) {
            if (this.urtaDrunk()) this.urtaHeatRut.approachDrunkenUrta();
            else this.urtaHeatRut.approachSoberUrtaHeatRutProc();
            return;
        }
        // [URTA FRIEND FUCKBUDDY BUT UNHORNY]
        if (this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] > 0 && !this.urtaDrunk()) {
            this.outx(this.images.showImage("urta-bar"), false);
            // Cockblock marble convo
            if (
                this.marbleScene.marbleAtCamp() &&
                this.flags[kFLAGS.URTA_KNOWS_PC_HAS_MARBLE_FOLLOWER] == 0
            ) {
                this.flags[kFLAGS.URTA_KNOWS_PC_HAS_MARBLE_FOLLOWER] = 1;
                this.marbleCockuBlockuUrta();
                return;
            }
            // Twu wuv talk
            if (
                this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] >= 30 &&
                this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == 0
            ) {
                this.UrtaTwuWuvOffer();
                return;
            }
            // outx("You approach Urta, who gives you a friendly smile and begins talking with you.  Thanks to her unusual endowments, it's easy to tell she's not quite in the mood.  The conversation is still pleasant though, and the two of you knock back a few ales while Urta recounts some of the wilder scenarios she's encountered as the captain of Tel'Adre's guard.");

            this.QBsTalkExpack();
            // doNext(barTelAdre);
            return;
        }
        // [Horny Urta Talk – Lovey]
        if (this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == 1) {
            // Sworn off drinking, up till noon, or up to 8 if 'drink more'
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] == -1 || !this.urtaDrunk()) {
                this.outx(this.images.showImage("urta-bar-drunk"), false);
                this.outx(
                    'You walk up to Urta and you see her pivot herself to the side.  Her dress visibly tents at the sight of you, and you smirk as you realize she shifted in position to avoid slamming her hardening cock into the bottom of the table.  You cuddle close and wrap an arm around your lover, giving her a quick kiss on the lips and fondling her through her dress.  The tent immediately darkens as a rush of pre soaks into the material, and Urta half-pants, half-asks, "<i>Oooh, lover, what do you have in mind today?</i>"\n\n',
                    false
                );
                this.outx(
                    "You could go back to her place, suck her off under the table, or eat her out under the table.",
                    false
                );
                if (this.player.canOviposit()) {
                    if (this.flags[kFLAGS.URTA_TIMES_EGG_PREGGED] == 0)
                        this.outx(
                            "\n\nYou contemplate asking Urta to help you take a load off your abdomen, but decide against it; Urta's probably too shy and pent up to let you fill her with your eggs. Maybe when she's gotten herself drunk and is more pliable, though..."
                        );
                    else
                        this.outx(
                            "\n\nYou don't think it's likely Urta would agree to host your eggs in her present state; wait until she's turned down her inhibitions before asking."
                        );
                }
                // [URTAZ PLACE] [Suck Off] [Eat Out]
                // simpleChoices("Her Place",goBackToUrtasForLuvinz,"Suck Off",blowUrtaUnderTheTableLuv,"Eat Out",eatUrtaOutNomNomPussy,"",0,"",0);
                this.menu();
                this.addButton(0, "Her Place", this.goBackToUrtasForLuvinz);
                if (this.flags[kFLAGS.URTA_CUM_NO_CUM_DAYS] >= 5)
                    this.addButton(1, "Suck Off", this.slurpFawkesCocksForFunAndInflation);
                else this.addButton(1, "Suck Off", this.blowUrtaUnderTheTableLuv);
                this.addButton(2, "Eat Out", this.eatUrtaOutNomNomPussy);
                return;
            }
            // [Horny Urta Talk – Drunk]
            else {
                this.outx(this.images.showImage("urta-bar-drunk"), false);
                this.outx(
                    'You walk up to Urta and chuckle as the sloshed fox-girl latches onto you.  She squeals happily and crushes you into a tight hug.  Her hard cock rubs against you under the silken covering of her dress, slowly soaking it through with pre-cum.  She purrs drunkenly under your ear, "<i>Mmmm, I was hoping you\'d show up, lover.  Would you mind if I blew a load over your face while everyone watched?  Or maybe you could just crawl up into my lap and let me pump you full of cum?</i>"\n\n',
                    false
                );
                this.outx(
                    "You could let her make a show of you sucking her off, try to ride her discreetly, or walk out and leave her disappointed.",
                    false
                );
                temp = undefined;
                if (this.player.canOviposit()) {
                    if (this.flags[kFLAGS.URTA_TIMES_EGG_PREGGED] == 0)
                        this.outx(
                            "\n\nHmm... sounds like she wants to fuck almost as badly as you want to get these eggs out of you.  Besides, didn't Urta say to you once that she's basically barren and sterile?  You'd be doing her a favor by letting her carry your eggs, wouldn't you?  Let's see if she's drunk enough to let you fill her full..."
                        );
                    temp = this.giveTheFoxSomeEggs;
                }
                // As per normal drunk-fawks
                // simpleChoices("Jerkoff",getAPublicFacialFromUrta,"Anal Ride",takeUrtaInTheButtPublically,"Lay Eggs",temp,"Spank Her",spank,"Leave",barTelAdre);
                this.menu();
                this.addButton(0, "Jerkoff", this.getAPublicFacialFromUrta);
                this.addButton(1, "Anal Ride", this.takeUrtaInTheButtPublically);
                this.addButton(2, "Lay Eggs", temp);
                this.addButton(3, "Spank Her", spank);
                if (
                    this.flags[kFLAGS.RAPHEAL_COUNTDOWN_TIMER] == -2 &&
                    this.RaphaelLikes() &&
                    this.flags[kFLAGS.URTA_X_RAPHAEL_HAPPENED] == 0
                ) {
                    this.outx(
                        "\n\nYou know Urta and Raphael get along about as well as cats and dogs, but it might be fun to have them double-team you in the dark."
                    );
                    this.addButton(8, "3SomeSurprise", this.urtaAndRaphaelSurprise);
                }
                this.addButton(9, "Leave", this.telAdre.barTelAdre);
                return;
            }
        }
        // [Approach sloshed Urta 1st time]:
        if (
            this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] == 0 &&
            this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] > -1
        ) {
            this.outx(this.images.showImage("urta-bar-drunk"), false);
            this.outx(
                "Urta smiles broadly and noisily slurps a few dribbles of whiskey from her shiny black lips, watching you approach.  She gives you a smoking-hot 'come-hither' look and slurs, \"<i>I didn't think I'd get a chance to bump into you here, cutie.  Wanna dance?</i>\"\n\n",
                false
            );
            this.outx(
                'Before you can answer, something thumps the table hard enough to shake it.  You look at Urta quizzically, and she shrugs through a blush so bright it\'s visible through her fur.  The lithe fox squirms in her seat, panting and gasping, "<i>Ummm, maybe later, I just realized I have to- OH MY GOD WHAT IS THAT?</i>"\n\n',
                false
            );
            this.outx(
                "You spend a moment looking over your shoulder, but can't for the life of you figure out what she was freaking out about.  She must be really drunk!  You turn back to scold her, but Urta has vanished!  She must have left in a hurry – she left her bottle of \"<i>John Doe</i>\" behind, and still half-full.  The bar's back-door swings closed, maybe she went that way.  What do you do?",
                false
            );

            // (LEAVE HER TABLE) (DRINK HER BOOZE) (BACKDOOR)
            this.simpleChoices(
                "Backdoor",
                this.urtaFollowedOutBack,
                "Drink Booze",
                this.drinkUrtasBooze,
                "",
                undefined,
                "",
                undefined,
                "Leave",
                this.telAdre.barTelAdre
            );
            return;
        }
        // [URTA FRIEND APPROACH]

        // [URTA DRUNK AND NOT TAKING NO FOR AN ANSWER] You approach Urta, but as you get closer you can smell the alcohol cloying the air around her.  Sizing you up with bleary eyes, Urta reaches out and grabs you, pulling you down onto her lap.  You can feel her heartbeat through her 'addition' as it hardens and your butt-cheek.
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] != -1 && this.urtaDrunk()) {
            this.outx(this.images.showImage("urta-bar-drunk"), false);
            this.outx(
                "The drunken fox roughly gropes you and whispers in your ear, \"<i>I NEED a good fuck right now, and it feels like someone wants a piece of Urta.  I can guess just which piece you're wanting too.  The only question is do I ",
                false
            );
            // CUT FOR NOW outx("throw you over the table and fuck you,");
            this.outx("let the beast loose and bounce you on my lap while we drink, ");
            this.outx(
                "jerk off onto your face in front of everyone, or have to remember your ass for later when you bolt for the door.  What'll it be, hun?</i>\"",
                false
            );
            temp = undefined;
            if (this.player.canOviposit()) {
                if (this.flags[kFLAGS.URTA_TIMES_EGG_PREGGED] == 0)
                    this.outx(
                        "\n\nHmm... sounds like she wants to fuck almost as badly as you want to get these eggs out of you.  Besides, didn't Urta say to you once that she's basically barren and sterile?  You'd be doing her a favor by letting her carry your eggs, wouldn't you?  Let's see if she's drunk enough to let you fill her full..."
                    );
                temp = this.giveTheFoxSomeEggs;
            }
            // simpleChoices("Jerkoff",getAPublicFacialFromUrta,"Anal Ride",takeUrtaInTheButtPublically,"Lay Eggs",temp,"Spank Her",spank,"Leave",barTelAdre);
            this.menu();
            this.addButton(0, "Jerkoff", this.getAPublicFacialFromUrta);
            this.addButton(1, "Anal Ride", this.takeUrtaInTheButtPublically);
            this.addButton(2, "Lay Eggs", temp);
            this.addButton(3, "Spank Her", spank);
            if (
                this.flags[kFLAGS.RAPHEAL_COUNTDOWN_TIMER] == -2 &&
                this.RaphaelLikes() &&
                this.flags[kFLAGS.URTA_X_RAPHAEL_HAPPENED] == 0
            ) {
                this.outx(
                    "\n\nYou know Urta and Raphael get along about as well as cats and dogs, but it might be fun to have them double-team you in the dark."
                );
                this.addButton(8, "3SomeSurprise", this.urtaAndRaphaelSurprise);
            }
            this.addButton(9, "Leave", this.telAdre.barTelAdre);
            return;
        }
        // [URTA COMFORTABLE WITH HOR-COCK]
        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] >= 11 && Urta.rand(2) == 0) {
            this.outx(this.images.showImage("urta-bar"), false);
            this.outx(
                'You approach Urta, who gives you a naughty wink and asks, "<i>Would you like to play with my little pony?</i>"  One of her hands is trailing along her leg, caressing her member as it hardens under her tight fishnet stockings.\n\n(You can suck her off under the table or go back to her place to fuck.)',
                false
            );
        } else {
            this.outx(this.images.showImage("urta-bar"), false);
            this.outx("You approach Urta, who gives you a lascivious grin ");
            if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] < 11)
                this.outx(
                    "moments before you hear her horse-cock thump into the bottom of the table.  ",
                    false
                );
            else
                this.outx(
                    "and pets her already-growing horse-cock through her fishnet stockings.  ",
                    false
                );
            if (Urta.rand(2) == 0) {
                this.outx(
                    'Urta asks, "<i>I\'m really horny, do you think you could help me get off?  I guess we could go fuck at my place, or you could always just help me out under the table.</i>"  A blush colors her face through the gray fur as she suggests the latter option.',
                    false
                );
            } else
                this.outx(
                    "She asks, \"<i>Would you like to go back to my place and help me play with my 'little' friend again?  Or maybe you could climb under the table and give me some relief?</i>\"",
                    false
                );
        }
        if (this.player.canOviposit()) {
            if (this.flags[kFLAGS.URTA_TIMES_EGG_PREGGED] == 0)
                this.outx(
                    "\n\nYou contemplate asking Urta to help you take a load off your abdomen, but decide against it; Urta's probably too shy and pent up to let you fill her with your eggs. Maybe when she's gotten herself drunk and is more pliable, though..."
                );
            else
                this.outx(
                    "\n\nYou don't think it's likely Urta would agree to host your eggs in her present state; wait until she's turned down her inhibitions before asking."
                );
        }
        // [Under Table BJ] [Public Jerkoff onto your face] [Public Buttfucking (Receiver)] [Tender lovemaking @ Urtas] [Minotaur Cum-Addict Special?] [TABLE FUCK]
        // simpleChoices("Hidden BJ",blowUrtaUnderTable,"Urta's Place",goBackToUrtasForLuvinz,"",0,"",0,"Leave",barTelAdre);
        this.menu();
        if (this.flags[kFLAGS.URTA_CUM_NO_CUM_DAYS] >= 5)
            this.addButton(0, "Hidden BJ", this.slurpFawkesCocksForFunAndInflation);
        else this.addButton(0, "Hidden BJ", this.blowUrtaUnderTable);
        this.addButton(1, "Urta's Place", this.goBackToUrtasForLuvinz);
        this.addButton(4, "Leave", this.telAdre.barTelAdre);
    }

    private drinkUrtasBooze(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You grab the bottle and take an experimental swig.  WOW, this stuff is STRONG.  It goes down smooth, but leaves a blacksmith's forge burning in your belly.  Kicking back, you take a few more sips, relaxing and enjoying watching the crowds of strangers mingle, flirt, and drink.  You set the bottle down and nearly miss the table, coming dangerously close to falling over.  You eye the bottle and realize it's nearly empty.  Damn that shit was good, but you've got to piss like a racehorse now.  Standing up in a hurry, you wobble around, looking for a bathroom and failing.  A waitress recognizes your expression, and with a knowing smile points towards the back door.\n\n",
            false
        );
        this.outx("You rush out to the alley...");
        this.dynStats("int", -2, "lus", 30);
        // to part 2!
        this.doNext(this.drinkUrtasBoozePtTwo);
    }
    // [NEXT]
    private drinkUrtasBoozePtTwo(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx("With a happy sigh you ");
        if (this.player.hasVagina() && this.player.totalCocks() == 0) this.outx("squat down and ");
        this.outx(
            `open up your ${this.player.armorName}, releasing the pressure onto a patch of grass.  It takes forever to stop, but when it does you feel like a million bucks.  You turn and start to close up your kit when you realize you aren't alone.  Urta is watching you, her lips parted hungrily.  She's still peeing, but what's truly shocking is the mammoth package she's got hanging between her legs.  It's a massive horse-shaft, patterned black and pink, slung down from between a pair of apple-sized balls.  Before your eyes the equine beast begins hardening, forcing the distracted fox to empty the last of her urine against a building's wall.  She blushes furiously, but the drunken fox doesn't seem to care about her shame...\n\n`,
            false
        );
        this.outx(
            'She shakes her massive horse-meat more than a few times, shuddering lightly with pleasure as her tip flares a bit in response.  Urta stumbles over moaning, "<i>This ish all your fault!  You damned... sexy... mmm... letsh fuck!</i>"\n\n',
            false
        );
        this.outx(
            "The stumbling hermaphrodite is openly rubbing herself as she closes in on you.  What do you do?",
            false
        );
        // [RUN!] [LET HER]
        this.simpleChoices(
            "Run!",
            this.drinkUrtasBoozeRun,
            "Let Her",
            this.drinkUrtasBoozeLetHer,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }

    private drinkUrtasBoozeRun(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You turn about and run, nearly smacking into the door frame in your haste to get away.  You hear a half-strangled sob behind you as the door swings closed.",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = -1;
    }
    private drinkUrtasBoozeLetHer(): void {
        this.urtaSprite();
        this.player.slimeFeed();
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        this.flags[kFLAGS.TIMES_FUCKED_URTA]++;
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 5;
        this.hideUpDown();
        this.player.orgasm();
        this.dynStats("sen", -2);
        // [LET HER]
        this.outx("", true);
        this.outx(this.images.showImage("urta-behindbar-fuck"), false);
        this.outx(
            "You nod at Urta, feeling a bit relaxed from all the whiskey and more than a little intrigued by the beast between the slender fox's legs.  She's on you before you know it, her softly furred hand squeezing one of your ",
            false
        );
        if (this.player.balls > 0) this.outx(this.ballsDescriptLight(), false);
        else if (this.player.biggestTitSize() > 1)
            this.outx(this.biggestBreastSizeDescript(), false);
        else this.outx(`${this.nippleDescript(0)}s`);
        this.outx(
            `, as her tongue spears between your lips.  She practically mouth-rapes you as her trembling member grinds between your ${this.player.legs()}, smearing them with a generous helping of foxy horse-pre.  The horny drunk slurs into your ear, "<i>Gawdsh above, are you this much of a schlut for everyone with one of these?</i>"\n\n`,
            false
        );

        this.outx(
            "With surprising strength, the inebriated fox pushes you against an old bench, flat onto your ",
            false
        );
        if (this.player.biggestTitSize() > 1) this.outx("tits");
        else this.outx("belly");
        this.outx(
            `.  She pulls at your ${
                this.player.armorName
            } until your crotch is completely exposed and vulnerable, revealing your ${this.player.assholeOrPussy()}`
        );
        if (this.player.cockTotal() > 0) this.outx(` and ${this.multiCockDescript()}`);
        this.outx(
            `.  Urta snuggles close, brushing her nose along your thighs before plunging her tongue deep into your ${this.player.assholeOrPussy()} in one powerful, drunken lick.  She slurps and licks, humming away until you're `
        );
        if (this.player.hasVagina()) this.outx("wet");
        else if (this.player.totalCocks() > 0) this.outx("suitably lubricated and leaking pre");
        else this.outx("suitably lubricated");
        this.outx(".\n\n", false);

        this.outx(
            "With a quick shift in position, she forces herself inside, her arms supporting her jiggling chest as she leans over you, dragging her nipples up your back.  Her fat shaft forces your body to spread wide.  The fat head and ring of prepuce strokes your inner walls, squeezing grunts of pleasure from you as the drunken fox forcefully begins fucking you, rutting like a beast.  You can feel her nipples harden, digging into your back and eliciting moans from their owner as they're repeatedly smashed against you.  Urta starts licking your neck where it joins your shoulder, gently nipping at your tender flesh as her tip begins to flare wider inside you.",
            false
        );
        this.player.cuntChange(60, true, true, false);
        this.outx("\n\n", false);

        this.outx(
            `"<i>Mmmm I shhoulda ushed a condom, you're gonna be a messssss!</i>" she cries as she climbs atop her sexual peak, mounting it just like she's mounting your ${this.player.assholeOrPussy()}.  You're spread wide, the equine member rammed tightly `
        );
        if (this.player.hasVagina())
            this.outx("against your cervix as the tip presses firmly against it");
        else this.outx("into your rectum");
        this.outx(", unloading a thick batch of cream directly into your ");
        if (this.player.hasVagina()) this.outx("waiting womb");
        else this.outx("abused asshole");
        this.outx(".");
        if (this.player.pregnancyIncubation > 0 && this.player.pregnancyIncubation < 250)
            this.outx(
                "  Whatever's growing inside you is probably bathing in the stuff now.",
                false
            );
        else if (this.player.hasVagina())
            this.outx(
                "  You briefly wonder if she's capable of knocking you up, and what the baby would look like.",
                false
            );
        else
            this.outx(
                "  Your backside fills with warmth as her spunk seeps deep inside you.",
                false
            );
        this.outx(
            "  Another blast fills you to capacity, and you're mortified by the sensation of your body being shifted by your growing belly.\n\n",
            false
        );

        this.outx(
            "Urta sucks on the edge of your ear, still pumping away as she pours a bit more spooge into your now equine-sized cavity.  Your alcohol-dulled mind reels as your body caves in to the sticky fluid assault, cumming hard and wriggling around her shaft, moaning repeatedly as you clamp down tightly.  ",
            false
        );
        if (this.player.totalCocks() > 0) {
            if (this.player.totalCocks() > 1) this.outx("Each of y");
            else this.outx("Y");
            this.outx(
                `our ${this.multiCockDescriptLight()} squirts hard, unloading a batch of sticky jism under your `
            );
            if (this.player.pregnancyIncubation > 0 && this.player.pregnancyIncubation < 100)
                this.outx("pregnancy swollen ");
            this.outx(
                "belly, making you squish with each brutal thrust of your oversized lover's rod.",
                false
            );
        } else {
            if (this.player.hasVagina())
                this.outx(
                    "Your pussy dribbles and clenches, leaking Urta's whiteness as she claims it for her own.",
                    false
                );
            else
                this.outx(
                    `Your ${this.assholeDescript()} clamps down tightly, spasming in pleasure around the invader.`
                );
        }
        if (this.player.totalCocks() > 0)
            this.outx(
                "  As you cum, more and more whiteness dribbles out until a puddle forms underneath you, showing Urta just how much you enjoyed the rough, drunken fuck.\n\n",
                false
            );
        else this.outx("\n\n", false);

        this.outx(
            `She pulls out, dripping everywhere.  The fox leans down and proceeds to give your still quivering hole a tongue-bath, thoroughly cleaning her fluids from the entrance and teasing you until you clamp down, locking the rest inside.  With a gentle slap on your ${this.buttDescript()} Urta says, "<i>Thankss for the quick fuck.  Maybe shometime you can `
        );
        if (this.player.cockTotal() > 0) this.outx("stick it in me");
        else this.outx("come back for an even bigger load");
        this.outx('.</i>"\n\n', false);
        this.outx(
            'The fox helps you to your feet and the two of you get dressed, stumbling a bit over each other and giggling happily.  Urta gives you a quick peck on the lips and whispers, "<i>Thanksh... for everything,</i>" before the two of you make your way back into the bar and go your separate ways.\n\n',
            false
        );
        if (this.player.hasVagina()) this.player.cuntChange(60, true);
        else this.player.buttChange(60, true);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [BACKDOOR]
    private urtaFollowedOutBack(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(this.images.showImage("urta-behindbar-masti"), false);
        this.outx(
            "The backdoor opens out into a narrow alley.  Surprisingly, the alleyway is covered in dirt and grass.  Awnings from the buildings above cover the alley in shadow, making it difficult to see anything out here.  You can hear quiet gasps and a wet, repetitive sound.  Quietly approaching the source of the noise, you eventually spot the dark-colored fox.  Her tail is no longer wrapped around her leg.  Instead, it's splayed out behind her and her skirt is pressed up over her legs.  Urta's totally exposed, and it's plain to see that between the fox-girl's legs there's more than a little horse.  Both her hands are wrapped tightly around the quivering column of horse-flesh, stroking the pre-cum dribbling fuck-stick relentlessly as her apple-sized balls bounce under her, occasionally revealing a feminine gash drooling with clear nectar.\n\n",
            false
        );
        this.outx(
            'Urta moans and cries, "<i>Ooh, just go down! Please cum and go down!  Why won\'t you go awayyyyyy...</i>" eventually breaking off into blubbering sobbing, interrupted by the occasional involuntary gasp of pleasure.\n\n',
            false
        );
        // [Sneak away] [Watch] [Masturbate With Her] [Fuck Her]
        this.outx(
            "(You could fuck her, masturbate with her, watch, or leave her like that.)",
            false
        );
        this.dynStats("lus", 5 + this.player.lib / 20);
        this.simpleChoices(
            "Fuck Her",
            this.urtaFuckHer,
            "MutualMasturb",
            this.dualUrtaMasturbation,
            "Watch",
            this.watchUrtaJerkIt,
            "",
            undefined,
            "Leave",
            this.urtaSneakAwayFromMasturbate
        );
    }

    // [Sneak Away]
    private urtaSneakAwayFromMasturbate(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You sneak away from the depressing sight, and decide to head back to camp.",
            false
        );
        this.dynStats("lus", -10);
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Watch]
    private watchUrtaJerkIt(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(this.images.showImage("urta-behindbar-masti-solo"), false);
        this.outx(
            "With both hands pumping away busily, the distraught fox quickly brings her massive member up between her breasts, sandwiching the equine shaft tightly into her ample chest.  In fact, it's so big that you can clearly see she's not just able to tit-fuck herself, she's even long enough to be able to lick the end of her stiffening monster!  Crying, she takes the tip into her mouth and begins slurping and sucking, noisily trying to get her male half off.  Her efforts seem to be working, if the churning action in her balls as they tighten up to her crotch is any indicator.  Her cries and moans are muffled into frantic gasps as ribbons of white cream leak out around her muzzle, sliding down the shaft and staining her lighter gray chest-fur with drippy goop.\n\n",
            false
        );

        this.outx(
            "She pulls back, red-eyed and gasping, her seed splattering everywhere as the beast between her legs contracts and pulses rhythmically, erupting again and again to shower a few more sticky blasts over her chest and head.  Fairly dripping with spunk, Urta sighs in humiliation and leans back against the wall, too wiped out by the powerful orgasm to do anything but smile when the beast finally starts to deflate towards her swollen sheath.  She begins licking herself clean, sniffling as she attempts to remove the thick layer of goop from her body.  The fox murmurs and pats the strange dick gently, as if it was a rebellious pet rather than a part of her, \"<i>Maybe someday we'll be able to find someone besides Edryn that'll accept you... Maybe the rest of that bottle will do a better job of keeping you down.</i>\"\n\n",
            false
        );

        this.outx(
            "Urta stands up and pushes her skirt back down, though her massive equine shaft still hangs well past the bottom of it, defying all of her attempts to conceal it.  With a sigh resignation and a practiced twirl of her tail, it's bound tightly against her thigh, concealed by her plentiful tail-fur.  She walks your way, wiping the tears from the corner of her eyes and pulling a new top over her large chest.  You're forced to duck behind a trash-can when she staggers past.  After she's gone, you spot her old top – it's drenched in her cum and totally unsalvageable, and there seems to be more than a few similar garments piled in the trash-can.  This must not have been the first time she's had to duck out like that.  Poor girl.\n\n",
            false
        );
        this.outx("You guess you'd better head back into the bar...");
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = -1;
        this.cheatTime(1);
        this.doNext(this.telAdre.barTelAdre);
    }

    // [MASTURBATE WITH HER]
    private dualUrtaMasturbation(): void {
        this.urtaSprite();
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 5;

        this.outx("", true);
        this.outx(this.images.showImage("urta-behindbar-masti-dual"), false);
        this.outx(`You come out of the shadows, shedding your ${this.player.armorName}.  `);
        if (this.player.cor < 60)
            this.outx("You blush furiously at exposing yourself in such a way");
        else this.outx("Smiling seductively, you revel in exposing yourself so suddenly");
        this.outx(
            '.  Urta looks up at you in shock, blinking tears from her eyes and stammering, "<i>B-b-b-ut I have th-thish hideoush thing... Aren\'t you scared of it?</i>"\n\n',
            false
        );

        this.outx(
            "Gently wiping a tear from her muzzle, you comfort the distraught fox and sit down across from her, giving her a perfect view of your ",
            false
        );
        if (this.player.totalCocks() > 0) {
            this.outx(this.multiCockDescriptLight(), false);
            if (this.player.hasVagina()) this.outx(" and ");
            if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
        } else if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
        else this.outx(`bare groin and ${this.assholeDescript()}`);
        this.outx(".  ");
        if (this.player.totalCocks() > 0) {
            this.outx(
                "The situation gives you all the spark you need to rise to your full size, ",
                false
            );
            if (this.player.cockArea(0) < 40) this.outx("even if Urta's member dwarfs you.");
            else if (this.player.cockArea(0) < 70) this.outx("showing Urta you're just as big.");
            else this.outx("proving to Urta just who has the bigger burden.");
            this.outx("  ");
        }
        if (this.player.hasVagina()) {
            if (this.player.vaginas[0].vaginalWetness > VAGINA_WETNESS_SLICK)
                this.outx(
                    "A trickle of wetness escapes your nether-lips, starting to puddle underneath you.",
                    false
                );
            else
                this.outx(
                    `Quickly engorging, your lower lips begin to part around your ${this.clitDescript()}.`
                );
            this.outx("  ");
        }
        this.outx("The heat coursing through you quickly shows itself on your ");
        if (this.player.biggestTitSize() >= 1) this.outx(this.allBreastsDescript(), false);
        else this.outx("chest");
        this.outx(` as your ${this.nippleDescript(0)}s become full and sensitive.\n\n`, false);

        this.outx(
            "Urta relaxes, leaning against a wall as she returns to pleasuring her mismatched member.  Her eyes lock onto your groin as you join her, and she lets out a sigh that's equal parts relieved and inebriated.  Together, the two of you pleasure your bodies, each watching the other's squirming form and blissful expression.  ",
            false
        );
        if (this.player.totalCocks() == 1)
            this.outx(
                `Your hands caress your ${this.cockDescript(
                    0
                )} feverishly, tweaking every ounce of pleasure from the bloated rod.  `
            );
        if (this.player.totalCocks() > 1)
            this.outx(
                `Your hands caress your ${this.multiCockDescript()} in turn, dancing back and forth from rod to rod as you attempt to play with every available pleasure outlet.  `
            );
        if (this.player.hasVagina())
            this.outx(
                "Delving deeply between your legs, you press forward into the source of your feminine pleasures, touching and rubbing, caressing your swollen button as you get closer and closer to orgasm.\n\n",
                false
            );
        if (this.player.gender == 0)
            this.outx(
                `Delving down between your legs, rubbing along your taint before you slowly penetrate your ${this.assholeDescript()}, pleasuring yourself in the only way possible.\n\n`,
                false
            );

        this.outx(
            "The cute fox-girl reaches her peak, crying out in a loud moan that echoes around the alley.  Her equine shaft trembles, the medial ring becoming more pronounced while the flat head flares wide mid-orgasm.  A blast of cum launches into the air, fans out overhead, and splatters down over you.  Urta looks horrified, and yanks herself back, succeeding only in depositing the next blast of spoogey goodness into her own face.  The situation would be comical if the foxy horse-goo wasn't such a great lubricant for your hands, and with that thought in your mind, you cum too.\n\n",
            false
        );

        if (this.player.totalCocks() > 0) {
            if (this.player.cumQ() < 250) {
                this.outx(
                    "Jism spurts out onto the alley floor, forming a nice little puddle as ",
                    false
                );
                if (this.player.totalCocks() > 1) this.outx("each of ");
                this.outx(`your ${this.multiCockDescriptLight()} empties itself.  `);
            } else if (this.player.cumQ() < 500)
                this.outx(
                    "Jism pours out onto the alley floor as your body releases the copious amount of cum it can produce.  It puddles before you, running off the stone into the grass.  ",
                    false
                );
            else if (this.player.cumQ() < 1000) {
                this.outx("Jism erupts from ");
                if (this.player.totalCocks() > 1) this.outx("each of ");
                this.outx(
                    `your ${this.multiCockDescriptLight()}, blasting into the air before splattering onto the ground between you and Urta.  It forms a massive puddle, spreading as you pump gob after gob of cum into it until the sticky spooge is soaking your ${this.player.legs()} and Urta too.`
                );
            } else {
                this.outx("Jism fountains from ");
                if (this.player.totalCocks() > 1) this.outx("each of ");
                this.outx(
                    `your ${this.multiCockDescriptLight()}, flooding the small alleyway with an unholy amount of cum.  In no time you've painted Urta and yourself from head to toe, and the alleyway sloshes with the stuff as your production overwhelms the ground's ability to absorb liquid.  `
                );
            }
        }
        if (this.player.hasVagina()) {
            this.outx("Your sex squishes wetly around a finger, clenching down tightly");
            if (this.player.vaginas[0].vaginalWetness == VAGINA_WETNESS_SLAVERING)
                this.outx(" and gushing everywhere");
            this.outx(".  ");
        } else
            this.outx(
                "Your sphincter clenches down tightly around your invading digit as you get off, and the rapt attention of your audience certainly helps.  ",
                false
            );
        this.outx(
            "Sighing happily, you give your nipple a tweak as Urta finally finishes cumming, ",
            false
        );
        if (this.player.cumQ() >= 1000)
            this.outx("adding to the massive pool on the ground after ");
        this.outx("drenching herself thoroughly.\n\n", false);

        this.outx(
            "Urta lets out a VERY relieved-sounding sigh and murmurs, \"<i>Oh godsh, thank you.  You don't know how hard it ish to hide thish beasht from EVERYONE.  You're a good friend for helping me with thish... let'sh do thish again sometime, ok?</i>\"\n\n",
            false
        );
        this.outx(
            "She staggers up to her feet and rapidly discards her sodden clothes.  With a resigned sigh, Urta pulls a loose stone out of the side of a building and removes a sheer skirt and diaphanous top from the cubby.  They slip on easily, though the new clothes look a bit more 'slutty' than her previous pair, easily displaying her hard black nipples.  Urta replaces the stone, wobbling a bit unsteadily before she ",
            false
        );
        if (this.player.cumQ() >= 1000) this.outx("tip-toes through the spunk");
        else this.outx("gets her balance and heads for the bar's backdoor");
        this.outx(
            ".  Her tail curls up around the softening horse-cock, hiding it from view as she blows you a sloppy kiss and disappears inside.\n\n",
            false
        );

        this.outx(
            "You waste no time cleaning up and stagger back inside after her, sated and happy with your new friend and her 'benefits'.",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
        this.player.orgasm();
    }

    // [FUCK HER]
    public urtaFuckHer(afterBefriending = false): void {
        this.urtaSprite();
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        this.flags[kFLAGS.TIMES_FUCKED_URTA]++;
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 5;
        const cocks: number = this.player.cockTotal();
        if (!afterBefriending) this.clearOutput();
        // (FUCK HER FEMALE/GENDERLESS)
        if (this.player.totalCocks() == 0) {
            this.outx(this.images.showImage("urta-behindbar-female-fuckurta"), false);
            this.player.slimeFeed();
            this.outx(`You come out of the shadows, shedding your ${this.player.armorName}.  `);
            if (this.player.cor < 50)
                this.outx("You blush furiously at exposing yourself in such a way");
            else this.outx("Smiling seductively; you revel in exposing yourself so suddenly");
            this.outx(
                '.  Urta looks up at you in shock, blinking tears from her eyes and stammering, "<i>B-b-b-ut I have th-thish hideoush thing... Aren\'t you scared of it?</i>"\n\n',
                false
            );

            this.outx(
                'Gently wiping a tear from her muzzle, you answer, "<i>Not at all, but I think you\'d have more luck with a nice warm hole to slide that monster into.</i>"\n\n',
                false
            );

            this.outx(
                `Urta nods, numbed by the unexpected and forward nature of your offer.  She looks up hopefully and pries her hands away from the twitching behemoth in her loins, waiting to see how you intend to deal with it.  You approach her and turn, straddling your ${this.player.legs()} over her, watching her expression as you lower yourself down, `
            );
            if (this.player.tailType == TAIL_TYPE_HORSE || this.player.tailType == TAIL_TYPE_DOG)
                this.outx("swishing your tail across her taut nipples");
            else this.outx("making her wait");
            this.outx(
                `.  Eventually the blunted tip of Urta's horse-cock presses against your ${this.player.assholeOrPussy()}.  Agonizingly, you force yourself to relax and lower yourself down on the mottled pink and black shaft.\n\n`,
                false
            );

            this.outx(
                "The horse-cock spreads you wide, filling you past the point of fullness as you sink further and further along its length.  Urta groans happily, her hips twitching involuntarily and forcing more of the monster-sized cock inside you.",
                false
            );
            if (this.player.hasVagina()) {
                if (this.player.vaginalCapacity() >= 60) {
                    this.outx(
                        "  You sigh and sink down, taking it until the folds of her sheath are rubbing your entrance.",
                        false
                    );
                } else {
                    this.outx(
                        "  You nearly cry out as you sink down, taking it until the folds of her sheath are rubbing your entrance, even though it hurts to accommodate it.",
                        false
                    );
                }
                this.player.cuntChange(60, true, true, false);
            } else {
                if (this.player.analCapacity() >= 60) {
                    this.outx(
                        "  You sigh and sink down, taking it until the folds of her sheath are rubbing your entrance.",
                        false
                    );
                } else {
                    this.outx(
                        "  You nearly cry out as you sink down, taking it until the folds of her sheath are rubbing your entrance, even though it hurts to accommodate it.",
                        false
                    );
                }
                this.player.buttChange(60, true, true, false);
            }
            this.outx(
                '  Urta babbles, "<i>Oh godsh yesh thank you so much-ohmigod it\'s SO HOT inside you.</i>"\n\n',
                false
            );

            this.outx(
                `You smirk over your shoulder and start bouncing up and down on her, slapping her balls with your ${this.buttDescript()} each time you bottom out on the thick shaft.  You can feel her ring of prepuce rubbing your inner walls, pressing on nerves normally ignored.  Urta grunts underneath you and you feel her flare growing wider inside you, stretching you further and further with every bounce atop the equine-endowed slut.  Suddenly warmth is flooding into your `
            );
            if (this.player.hasVagina()) this.outx("womb");
            else this.outx("rectum");
            this.outx(
                ", and Urta's tongue is lolling out from her muzzle, drooling down the side of her face as she loses herself in orgasm.\n\n",
                false
            );

            this.outx(
                `The substantial flare forms a perfect plug inside you and your belly distends slightly as you're packed full of foxy-horse-cum.  Your own lusts keep your hips moving, grinding and squeezing the shaft inside you as it packs you full of Urta's seed.  Your orgasm explodes through your hips and your ${this.player.legs()} give out underneath you, dropping you down onto the fox-girl as the pair of you cum together.  Whiteness begins squirting out around her shaft as her prick begins softening inside you.  You sigh happily, content but too nerveless to stand for the moment.  Peeking over your shoulder and seeing Urta's satisfied expression, you guess she feels about the same.\n\n`,
                false
            );

            this.outx(
                `Once the horse-dick inside you has sufficiently softened, you stand up, gasping as a rush of spooge escapes from your ${this.player.assholeOrPussy()} now that the 'plug' is removed.  Urta gives you a cocky grin as she's soaked with her fluids, moments before she starts staggering back to her feet.  She wipes up with her clothes and tosses them into the garbage, then wobbles up to a loose brick in the wall and pulls it free, revealing a hidden compartment filled with sets of replacement clothes.  She removes a tight skirt and sheer top, both a bit more revealing than what she wore in the bar earlier, and hurriedly dresses herself.\n\n`,
                false
            );

            this.outx(
                'Urta blows you a kiss as you put your own gear back together and flounces back to the bar, calling out, "<i>We should do thish again shoon!</i>"\n\n',
                false
            );

            this.outx('"<i>Yes indeed,</i>" you muse - the sooner the better.', false);
        } else {
            let x: number = this.player.cockThatFits(this.urtaCapacity());
            const y: number = this.player.cockThatFits2(this.urtaCapacity());
            if (x < 0) x = 0;
            this.outx(this.images.showImage("urta-behindbar-male-fuckurta"), false);
            this.outx(`You come out of the shadows, shedding your ${this.player.armorName}.  `);
            if (this.player.cor < 60)
                this.outx("You blush furiously at exposing yourself in such a way");
            else this.outx("Smiling seductively; you revel in exposing yourself so suddenly");
            this.outx(
                '.  Urta looks up at you in shock, blinking tears from her eyes and stammering, "<i>B-b-b-ut I have th-thish hideoush thing... Aren\'t you scared of it?</i>"\n\n',
                false
            );

            this.outx(
                'Gently wiping a tear from her muzzle, you answer, "<i>Not at all, but I think you\'d have more luck with something stuffed in your feminine half.</i>"\n\n',
                false
            );

            this.outx(
                "Urta gives you a shocked look, but nods and turns around, bending over an old bench and exposing her well-toned ass and glistening, black-lipped sex.  The invitation is all you need.  You wrap your arms around her, squeezing the downy-soft fur on her breasts and leveraging ",
                false
            );
            if (this.player.cockTotal() > 0) {
                if (this.player.cockTotal() > 2)
                    this.outx(
                        `a pair of your ${this.multiCockDescriptLight()} against her pussy and asshole.  `
                    );
                else if (this.player.cockTotal() == 2)
                    this.outx(
                        `your ${this.multiCockDescriptLight()} against her pussy and asshole.  `
                    );
                else if (this.player.cockTotal() == 1)
                    this.outx(`your ${this.multiCockDescriptLight()} against her pussy.  `);
            }
            // DOES IT FITZ
            if (this.player.cockArea(x) < this.urtaCapacity()) {
                this.outx(
                    "The wet entrance yields before you, accepting you like a velvet glove.  It grips you tightly, though the grip is meaningless with the flood of lubricant slipping over your shaft.  ",
                    false
                );
                if (this.player.cockTotal() >= 2)
                    this.outx(
                        "Her backdoor was rougher going – the tightly muscled entrance held you back for a moment until Urta relaxed completely, but now the tighter hole is nearly as easy to penetrate as her pussy.  ",
                        false
                    );
                this.outx(
                    "The fox is openly moaning and stroking her disproportional cock, dripping pre-cum everywhere as you do your level best to violate her ",
                    false
                );
                if (this.player.cockTotal() == 1) this.outx("hole");
                else this.outx("holes");
                this.outx(".\n\n", false);

                this.outx(
                    'She begins grinding against you, begging, "<i>Oh godsh yeeeessss don\'t shtop fucking me!  Give me more please!  PLEASE!</i>"\n\n',
                    false
                );

                this.outx(
                    "Nodding, you release one of her bouncing breasts in order to smack her back-side.  It barely jiggles, but the surprised moan that slips from the fox-herm's lips is all the encouragement you need.  You release the other breast and grab her hips and ass with both hands, slamming her back against you, only pausing to deliver another smack to one of her cheeks.  Urta wiggles happily, squealing after every slap, trying her best to steady her body while you brutally ",
                    false
                );
                if (cocks == 1) this.outx("fuck");
                else this.outx("double-penetrate");
                this.outx(" her.\n\n", false);

                this.outx(
                    '"<i>Yesh oh yessssssSSSAHHHCUMMING,</i>" cries Urta as her body goes nerveless underneath you, held up entirely by your hands',
                    false
                );

                if (cocks > 1 && y >= 0)
                    this.outx(`, ${this.cockDescript(x)}, and ${this.cockDescript(y)}.`);
                else this.outx(` and ${this.cockDescript(x)}.`);
                this.outx(
                    `  Both her hands are locked tightly around her behemoth as it unloads onto the alley floor and walls.  The juicy tunnel clamps down on top of you, squeezing your ${this.cockDescript(
                        x
                    )} as if Urta's life depended on it.  It's as if every ounce of her being was focusing on clamping down on the invader, massaging, squeezing, and milking it, while the rest of her body goes entirely limp.`
                );
                if (cocks > 1 && y >= 0)
                    this.outx(
                        `  Your ${this.cockDescript(
                            y
                        )} feels like it's about to explode inside her asshole when her sphincter clamps down tightly, acting like the world's tightest cock-ring.`
                    );
                this.outx("\n\n", false);

                this.outx("You fuck her savagely, abusing her spasming hole");
                if (cocks > 1 && y >= 0) this.outx("s");
                this.outx(
                    " with every thrust until your own climax bursts over you like a wave.  Urta's drooling cunt ",
                    false
                );
                if (cocks > 1 && y >= 0) this.outx("and tightly clenched ass seem");
                else this.outx("seems");
                this.outx(" to be trying to milk your body of every ounce of cum.  ");

                if (this.player.cumQ() < 250) {
                    this.outx(
                        "After a few passionate thrusts, you're spent, and you pull free, admiring the glaze of white that remains on her cunt-lips",
                        false
                    );
                    if (cocks > 1 && y >= 0) this.outx(" and slowly-closing pucker");
                    this.outx(".");
                } else if (this.player.cumQ() < 500) {
                    this.outx(
                        "After a few passionate thrusts, you can feel your cum packing Urta's womb ",
                        false
                    );
                    if (cocks > 1 && y >= 0) this.outx("and gut ");
                    this.outx(
                        "full of spooge, but all great things come to an end eventually.  You pull free, admiring the glaze of white that remains on her cunt-lips",
                        false
                    );
                    if (cocks > 1 && y >= 0) this.outx(" and slowly-closing pucker");
                    this.outx(".");
                } else {
                    this.outx("After a few passionate thrusts, Urta's womb ");
                    if (cocks > 1 && y >= 0) this.outx("and belly are ");
                    else this.outx("is ");
                    this.outx(
                        "so full of spooge that she looks positively pregnant, and you're expelled from her body by the sheer force of your orgasm.  You pause to admire your handiwork, watching whiteness drip from ",
                        false
                    );
                    if (cocks > 1 && y >= 0) this.outx("both her holes.");
                    else this.outx("her abused hole.");
                }

                this.outx(
                    "\n\nUrta moans, \"<i>Mmmm... letsh do this again shometime.  Please, you've no idea how hard thish thing is for me,</i>\" as she rubs the mixed fluids against her sensitive nether-lips and staggers around.  She tears off her sodden skirt, tossing it into the rubbish.  With a resigned sigh, Urta pulls a loose stone from the side of a building and removes a sheer skirt and top from the cubby.  They slip on easily, though the new clothes look a bit more 'slutty' than her previous pair, easily displaying her hard, black nipples.  Urta replaces the rock, wobbling a bit unsteadily before she ",
                    false
                );
                if (this.player.cumQ() > 1000) this.outx("tip-toes through the spunk");
                else this.outx("gets her balance and heads for the bar's backdoor");
                this.outx(
                    ".  Her tail curls up around the softening horse-cock, hiding it from view as she blows you a sloppy kiss and disappears inside.\n\n",
                    false
                );

                this.outx(
                    "You waste no time cleaning up and you stagger back inside after her, sated and happy with your new friend and her 'benefits'.",
                    false
                );
                this.knockUpUrtaChance();
            }
            // (TOO BIG)
            else {
                if (cocks == 1) {
                    this.outx(
                        "Urta's hole is just way too small to handle what you're packing, so you're forced to back off, much to her lament.  She moans, \"<i>Noooo! Fuck me!</i>\"\n\n",
                        false
                    );
                    this.outx(
                        `You pull her down into the grass and throw her on her back.  She looks confused and a little afraid, but that melts away when you spread your ${this.player.legs()} across her and begin grinding your ${this.multiCockDescriptLight()} against her sensitive dick.  Happy, the drunken fox begins pistoning against you, gathering her copious pre and smearing it over your ${this.multiCockDescript()}.  The two of you grind together, groin to groin, coating each other in a slippery mess.\n\n`,
                        false
                    );
                    this.outx(
                        `Urta pants out, "<i>Ah ahhh ahhhh,</i>" and cums, her flare ballooning out until it's twice as wide as her shaft, a wave of white jism escaping from her horse-cock.  You gather some in your hand and slather it over your own ${this.multiCockDescript()}, and after a few moments of fevered masturbation, you start cumming with her.  Urta happily squirms against you, painting herself with jism and soaking her clothes with the stuff.  `
                    );

                    if (this.player.cumQ() < 250)
                        this.outx(
                            "You join in, though your own contribution seems meager by comparison.",
                            false
                        );
                    else if (this.player.cumQ() < 500)
                        this.outx(
                            "You join in, and manage to match her spurt for spurt, until she's lying in a thick puddle of the stuff.",
                            false
                        );
                    else
                        this.outx(
                            "You join in, and make her orgasm look like a trickle compared to the flood of spunk you unleash onto her.  By the time the pair of you finish, she's soaked from head to toe, and lying in a nicely sized puddle of the stuff.",
                            false
                        );

                    this.outx(
                        '\n\nThe drunken fox groans and continues spurting weakly, "<i>Oh godsh, letsh do this again sooon.  You don\'t know how much I needed thish!</i>"\n\n',
                        false
                    );
                    this.outx(
                        "After a few moments she picks herself up and wipes herself up as much as she can with her sodden clothes.  Urta quickly gives up and removes a loose brick from the wall, revealing a hidden compartment with clothes and a few towels.  It seems she's quite prepared to make a mess in this alley.  She towels the worst of it off and gets dressed in a sheer tank-top and tight skirt before staggering back towards the bar.  Urta pauses and looks over her shoulder to blow you a sloppy kiss before she goes inside.\n\n",
                        false
                    );

                    this.outx(
                        "You waste no time cleaning up and mosey back inside after her, sated and happy with your new friend and her 'benefits'.",
                        false
                    );
                }
                if (cocks > 1) {
                    this.outx(
                        "Urta's holes are just way too small to handle what you're packing, so you're forced to back off, much to her lament.  She moans, \"<i>Noooo! Fuck me!</i>\"\n\n",
                        false
                    );

                    this.outx(
                        `You pull her down into the grass and throw her on her back.  She looks confused and a little afraid, but that melts away when you spread your ${this.player.legs()} across her and begin grinding each of your ${this.multiCockDescriptLight()} against her sensitive dick.  Happy, the drunken fox begins pistoning against you, gathering her copious pre and smearing it over your ${this.multiCockDescriptLight()}.  The two of you grind together, groin to groin, coating each other in a slippery mess.\n\n`,
                        false
                    );

                    this.outx(
                        `Urta pants out, "<i>Ah ahhh ahhhh,</i>" and cums, her flare ballooning out until it's twice as wide as her shaft, a wave of white jism escaping from her horse-cock.  You gather some in your hand and slather it over your own ${this.multiCockDescriptLight()}, and after a few moments of fevered masturbation, you start cumming with her.  Urta happily squirms against you, painting herself with jism and soaking her clothes with the stuff.  `
                    );
                    if (this.player.cumQ() < 250)
                        this.outx(
                            "You join in, though your own contribution seems meager by comparison.",
                            false
                        );
                    else if (this.player.cumQ() < 500)
                        this.outx(
                            "You join in, and manage to match her spurt for spurt, until she's lying in a thick puddle of the stuff.",
                            false
                        );
                    else
                        this.outx(
                            "You join in, and make her orgasm look like a trickle compared to the flood of spunk you unleash onto her.  By the time the pair of you finish, she's soaked from head to toe, and lying in a nicely sized puddle of the stuff.",
                            false
                        );

                    this.outx(
                        'The drunken fox groans and continues spurting weakly, "<i>Oh godsh, letsh do this again sooon.  You don\'t know how much I needed thish!</i>"\n\n',
                        false
                    );
                    this.outx(
                        "After a few moments she picks herself up and wipes herself up as much as she can with her sodden clothes.  Urta quickly gives up and removes a loose brick from the wall, revealing a hidden compartment with clothes and a few towels.  It seems she's quite prepared to make a mess in this alley.  She towels the worst of it off and gets dressed in a sheer tank-top and tight skirt before staggering back towards the bar.  Urta pauses and looks over her shoulder to blow you a sloppy kiss before she goes inside.\n\n",
                        false
                    );

                    this.outx(
                        "You waste no time cleaning up and mosey back inside after her, sated and happy with your new friend and her 'benefits'.",
                        false
                    );
                }
            }
        }
        this.doNext(
            afterBefriending ? this.camp.returnToCampUseFourHours : this.camp.returnToCampUseOneHour
        );
        this.player.orgasm();
    }

    // [Under Table BJ]
    public blowUrtaUnderTable(): void {
        this.urtaSprite();
        this.player.slimeFeed();
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        this.urtaLove(1);
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 2 + Urta.rand(4);
        this.outx("", true);
        this.outx(this.images.showImage("urta-bar-bj"), false);
        this.outx(
            'Urta\'s eyes widen in shock when you suggest taking her under the table.  She stammers, "<i>Uh, okay...</i>" and fills a glass with straight whiskey, fueling up on liquid courage while you crawl down.  You slip down under the table, pushing her legs apart',
            false
        );
        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] >= 11)
            this.outx(
                " and pulling down her fishnet to release the monster trapped inside it.  It snaps up immediately, bobbing before your face as it fills with Urta's booze-fueled lust.",
                false
            );
        else
            this.outx(
                " and pushing up her tight leather skirt, smiling at the sight of her trembling balls and juicy pussy.  Her tail unfurls around the equine member and it snaps up immediately, hanging before your face.",
                false
            );
        this.outx(
            "  It actually wiggles in time with the beating of her heart, bouncing up as it gets harder and harder, until it smacks your nose.\n\n",
            false
        );

        this.outx(
            "You hear the sound of her shot-glass slamming into the table with authority as she finishes her drink.  A bead of pre-cum bubbles out from Urta's urethra, signaling her readiness.  The horse-like penis gives off a salty scent, unique and not unpleasant.  Before you have a chance to change your mind, you lunge forward, opening your jaw as far as it will go and just barely taking her first few inches into your mouth.  The fox gasps out loud at the pleasure before she remembers to relax.  You can hear her pouring another drink, and in an effort to embarrass her, you begin sucking and licking around the edges of her flare, swallowing the surge of sweet-tasting pre-cum as it begins to fill your mouth.\n\n",
            false
        );

        this.outx(
            "Urta writhes in her seat, noisily spilling alcohol over the table.  You smile around the intruder in your mouth, gripping it with both hands and stroking it with tender caresses.  The gray fox slams down the bottle; though you can't tell if it's in irritation or due to difficulty controlling her muscles, and begins chugging down what she managed to get into her glass.  It seems Urta intends to drink until she doesn't care about any embarrassment you can force upon her.\n\n",
            false
        );

        this.outx(
            "Deciding you've got to get her off before she can drink herself into a stupor, you ",
            false
        );
        if (this.player.cor < 70)
            this.outx(
                "do your best to suppress your gag reflex and shove forwards, ramming her cock as deeply into your throat as you can.",
                false
            );
        else
            this.outx(
                "shove forwards, ramming her massive cock so far down your throat you can feel it dribbling pre-cum into your belly.",
                false
            );

        this.outx(
            "  Urta grunts, doing her best to muffle the noise as it escapes her lips, but you can feel her twitch and thicken inside you, beginning to drip with proof of her complete and total submission to your mouth.\n\n",
            false
        );

        this.outx(
            "You can hear chuckles from the bar's other occupants as they realize what's going on, and you blush, wishing there was a tablecloth to hide your activities from prying eyes.  The distraction does little to divert you from your chosen task, and you close your eyes, tasting your lover's throbbing shaft as it fills your mouth.  With both hands stroking, you bob up and down, completely centering your world around the pulsating horse-prick as it fills your mouth.\n\n",
            false
        );

        this.outx(
            "Without warning, Urta's legs wrap around your back, squeezing with her soft fur as she vices them closed.  You're forced to take her even more deeply, until the folds of her sheath are bumping your nose and chin and filling your nostrils with her heady musk.  You can't even breathe with such a massive intruder blocking your throat, but you do your best to get her off, knowing it's the quickest way to end it.  You suck hard and squeeze her balls, gurgling noisily around the sweaty shaft as you feel Urta give in.\n\n",
            false
        );

        this.outx(
            "A wave-like motion passes through your throat obstruction, stretching you wider than ever before.  It passes, leaving behind a feeling of warm fullness.  You feel another working its way into your mouth, and realize Urta is cumming, filling your belly with direct injections of horsey fox-seed. You desperately need to breathe, but you're trapped on your lover's maleness, and with nothing else to do, you give her twitching balls a squeeze, feeling her body twitch in response as she dumps a particularly heavy batch of spunk into you.  Happy that you could at least control how hard she came, you begin blacking out, barely noticing as Urta's orgasmic contractions die off.\n\n",
            false
        );

        this.outx(
            "Thumping down on your back, you're blissfully aware of the sweet air filling your lungs.  In a moment of reflection, you realize you can taste the salty flavor of Urta's seed on your lips and mouth, and the retracting horse-cock is ",
            false
        );
        if (this.player.biggestTitSize() >= 2)
            this.outx(`dragging between your ${this.allBreastsDescript()}`);
        else this.outx("dragging across your chest");
        this.outx(
            ` as it begins to soften.  You wipe as much of her leavings from your ${this.player.face()} as you can, licking the slippery glaze from your lips.  Before you get up, you make sure to give Urta's member a firm squeeze, punishment for forcing you to take her so deep.\n\n`,
            false
        );

        this.outx(
            "Once you've climbed out from under the table, you're VERY aware of the eyes of some of the nearby bar patrons on your back.  It seems your undercover act managed to draw more than a little attention.  Urta's cheeks burn bright-red under her gray fur, even though her eyes are a bit glassy and unfocused from the amount of alcohol she's ingested.  Sure that she'll remember the embarrassment, you give her a deep kiss, making her taste her residue on your lips.",
            false
        );
        this.dynStats("sen", 1, "lus", Urta.rand(10) + 5 + this.player.lib / 10);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Public Buttfucking]
    public takeUrtaInTheButtPublically(): void {
        this.urtaSprite();
        this.outx("", true);
        let tooBig = false;
        if (this.player.cor < 30 && this.flags[kFLAGS.PC_FETISH] == 0) {
            this.outx("No way!  You're not going to do that in front of EVERYONE.");
            this.doNext(this.telAdre.barTelAdre);
            return;
        }
        this.player.slimeFeed();
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        this.flags[kFLAGS.TIMES_FUCKED_URTA]++;
        this.urtaLove(2);
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 5;
        this.outx(this.images.showImage("urta-public-fuck"), false);
        if (this.player.cor < 60 && this.flags[kFLAGS.PC_FETISH] == 0)
            this.outx(
                `You can't believe you're doing it, but you undo the lower half of your ${this.player.armorName}.  `
            );
        else
            this.outx(
                `You happily remove the lower half of your ${this.player.armorName}, more than a little excited at the prospect of putting on a show for the crowd.  `
            );
        this.outx("Urta casually flips up her skirt and ");
        if (this.flags[kFLAGS.TIMES_FUCKED_URTA] < 11)
            this.outx("unwinds her tail from around the beast");
        else this.outx("fishes the beast out of her fishnets");
        this.outx(
            ".  Watching in horror, your eyes never leave the equine pillar as it grows to its full size.  Amazingly, none of the bar's patrons seem to notice the trembling horse-cock, even though it's beginning to leak with pre-cum.\n\n",
            false
        );

        this.outx(
            `You carefully shift your position, climbing in front of Urta.  With care, you grab the sensitive member just below the flare and begin rubbing it over your ${this.buttDescript()} and ready ass-hole, lubing yourself up and trying to relax.  The impatient fox grabs you by your ${this.hipDescript()} and pulls you down, forcing herself against your pucker.  `
        );
        // [GO TOO SMALL OR FITS, NO NEW PG]
        // [FITS]
        if (this.player.analCapacity() >= 60) {
            this.outx(
                "It's a tight fit, even with a backdoor as gaping as yours.  You're thankful for your looseness as you slide down into her lap, and Urta signals her appreciation of your capacity with a throaty sigh, \"<i>Mmmm, you're good at this.</i>\"\n\n",
                false
            );
        }
        // [DOESN'T FIT]
        else {
            tooBig = true;
            this.outx(
                `It's far too big for you, but that doesn't stop Urta from pushing it inside you.  You can feel yourself stretched around the invader, and it hurts enough that you almost scream out in pain, but inexorably, you're drawn down until your ${this.buttDescript()} is resting on Urta's thighs.  Her thick prick keeps you stretched uncomfortably wide, and you can feel every twitch it makes.`
            );
            // (STRETCH TEXT HERE)
            if (!this.player.buttChange(60, true)) this.outx("  ");
            this.outx(
                'Surprisingly, the over-endowed fox notices your discomfort and hands you a narrow bottle from the table, "<i>Drink up, it\'ll help with the pain until you get used to me.</i>"\n\n',
                false
            );

            this.outx(
                `You look at the bottle suspiciously, reading the faded yellow label, "<i>Barkardi 151</i>".  Wincing from the pain, you suppose it couldn't hurt and you tip back the bottle, taking a hearty swig.  It burns like hellfire, and you nearly retch up the massive swallow before you get it down.  Amazingly, the pain in your throat and the bonfire in your belly nearly drowns out what's going on in your ${this.assholeDescript()}.  You actually start to relax, and Urta nibbles on your ear in between sips of ale.  She holds her mug up to your lips and invites you to share her drink and you do, grateful for any additional pain-killers.\n\n`,
                false
            );
        }
        // [BOTH]
        if (this.player.totalCocks() > 0) {
            this.outx(
                "You start to grow hard from the pressure inside you, and there's nothing you can do to stop ",
                false
            );
            if (this.player.totalCocks() > 1) this.outx("each of ");
            this.outx(
                `your ${this.multiCockDescriptLight()} from swelling to full erectness.  A bead of pre forms at `
            );
            if (this.player.totalCocks() > 1) this.outx("each ");
            else this.outx("the ");
            this.outx("tip, and begins leaking down the shaft");
            if (this.player.totalCocks() > 1) this.outx("s");
            this.outx(
                ` of your ${this.multiCockDescriptLight()}, squeezed out from your prostate.  `
            );
        }
        if (this.player.hasVagina()) {
            this.outx(
                `Heat spreads through your loins as your ${this.vaginaDescript(
                    0
                )} engorges with blood, allowing your ${this.clitDescript()} to `
            );
            if (this.player.clitLength < 2) this.outx("peep out");
            else this.outx("grow to its full size");
            this.outx(".  ");
            if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_SLICK)
                this.outx(
                    "Moisture beads on your lips, signaling just how turned on this total violation is making you.",
                    false
                );
            else if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_SLAVERING)
                this.outx(
                    "Moisture begins dripping onto Urta's thighs, signaling just how turned on this total violation is making you.",
                    false
                );
            else
                this.outx(
                    "Moisture puddles on the seat under Urta as your juices flood her thighs, revealing just how turned on this violation is making you.",
                    false
                );
            this.outx("  ");
        }
        // (NIPPLES:
        this.outx(`Your ${this.nippleDescript(0)}s tent up under your ${this.player.armorName}`);
        if (this.player.hasFuckableNipples() && this.player.biggestLactation() >= 1)
            this.outx(", leaking milky lubricants and aching to be penetrated.");
        else if (this.player.hasFuckableNipples()) this.outx(", aching to be penetrated.");
        else if (this.player.biggestLactation() >= 1.5 && this.player.biggestLactation() < 2.5)
            this.outx(
                ", leaking thin streams of milk that rapidly become visible to everyone around you.",
                false
            );
        else if (this.player.biggestLactation() >= 2.5)
            this.outx(
                `, spurting thick streams of milk that soak your ${this.player.armorName} and are visible to everyone in the bar.`
            );
        else this.outx(".");
        this.outx("\n\n", false);

        this.outx(
            `Soft-furred hands grip your ${this.hipDescript()} firmly and begin to lift you up, making you gasp as her flare is dragged through your hind-end, eliciting what Urta must think are cute gasps.  You hear a 'murrrr' of contentment in your ear and Urta releases you, twitching inside you as your weight slowly carries you back down into her lap.  Once your ${this.buttDescript()} smacks into her thighs she grabs you again, dragging you back up her massive pole until you're looking down on the tables around you.  She stops and withdraws her support, guiding you back down her shaft and moaning when you take her ring of prepuce half-way down.\n\n`,
            false
        );

        this.outx("The eyes of everyone in the place are locked onto you, and ");

        if (tooBig)
            this.outx(
                "you find yourself giggling drunkenly, barely feeling any pain and arching your back like a slut for the crowd.",
                false
            );
        else if (this.player.cor < 50 && this.flags[kFLAGS.PC_FETISH] == 0)
            this.outx(
                "you find yourself whimpering, regretting the decision to climb on top of her, but aroused in spite of it.",
                false
            );
        else
            this.outx(
                `you find yourself sliding your hands under your ${
                    this.player.armorName
                } and pinching your ${this.nippleDescript(0)}s, putting on a show for the crowd.`
            );

        this.outx(
            `  Urta starts breathing hard into your ear, and you start flexing your ${this.player.legs()} to help her lift you up.  Grateful for the effort, the fox-girl increases the pace by helping to pull you back down each time.  By now it's starting to feel pretty good, and her pre-cum is making your ${this.assholeDescript()} so wet and slippery that you can slide quite quickly along the column of horse-meat.\n\n`,
            false
        );

        this.outx(
            "Wet squelches echo through the bar as you're slammed into Urta's lap harder and harder.",
            false
        );
        if (this.player.biggestTitSize() >= 1) {
            this.outx(`  Your ${this.allBreastsDescript()} are jiggling and bouncing wildly, `);
            if (this.player.hasFuckableNipples()) this.outx("dripping lubricants");
            else if (this.player.biggestLactation() > 1) this.outx("spurting milk");
            else this.outx(`rubbing your tight nipples against your ${this.player.armorName}`);
            this.outx(".");
        }
        if (this.player.cockTotal() > 0) {
            if (this.player.cockTotal() > 1) {
                this.outx(
                    `  Steady drizzles of cum begin dripping from each of your ${this.multiCockDescriptLight()} as she pounds away, rubbing hard against your prostate.`
                );
            } else {
                this.outx(
                    `  Steady drizzles of cum begin dripping from your ${this.multiCockDescriptLight()} as she pounds away, rubbing hard against your prostate.`
                );
            }
        }
        this.outx(
            "  You can't hold back, and start moaning quietly, trying your best to be silent and failing horribly.  For her part, your foxy lover seems equally incapable of suppressing her orgasm, and you feel her thick organ flexing inside you as it prepares to cum.\n\n",
            false
        );

        this.outx(
            `Her paws pull you down hard, crushing your ${this.buttDescript()} against her as her sheath presses into your ${this.assholeDescript()}.  The invading flesh ripples from the base towards the tip, culminating in a flood of warmth that makes your belly gurgle, and at that moment you cum.  Your sphincter clamps down tightly around Urta's marvelous member, unintentionally providing the fox with an even better orgasm.  The next pulse of cum feels even larger, and you look down in shock when you realize you can see the outline of her shaft on the ${
                this.player.skinDesc
            } of your belly.  As she cums you can see it getting less distinct as your body becomes more and more rounded.  A few blasts later you look positively pudgy, but you can feel her softening inside you.\n\n`,
            false
        );

        this.outx(
            'Urta sighs and takes a sip of her drink, giving you a quick peck on the side of your neck.  You start to rise, but the drunken hermaphrodite grabs you and holds you down, "<i>Let\'s just stay like this a little longer...</i>"\n\n',
            false
        );

        this.outx(
            "You shrug and relax, cuddling with her while her massive load is plugged inside you.  She keeps you there for the better part of an hour, kissing you, nipping at your neck, and sharing her drinks with you.  When you finally do get a chance to leave, you're stumbling slightly from the alcohol and your asshole gapes and drips whiteness behind you.  You don't notice the trail of cum until you get back to your camp, and it brings a blush to your cheeks.",
            false
        );
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [PUBLIC FACIAL]
    public getAPublicFacialFromUrta(): void {
        this.urtaSprite();
        this.player.slimeFeed();
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        this.urtaLove(2);
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 3 + Urta.rand(3);
        this.outx("", true);
        this.outx(this.images.showImage("urta-public-facial"), false);
        this.outx(
            "Given the choices, it seems like just accepting the facial would be the best option.  Urta nods, grinning lasciviously as she pulls the table to the side, and gestures for you to get on the floor.  You kneel before her as she pulls back her ",
            false
        );
        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] < 11) this.outx("skirt ");
        else this.outx("stockings ");
        this.outx(
            "and allows her horse-dick to flop free in front of you.  It pulses, growing bigger with each beat of the fox's heart as she watches you submit yourself to her arousal.  You feel the eyes of everyone around you as they watch the spectacle ",
            false
        );
        if (this.player.cor < 33) this.outx("and it makes you blush crimson");
        else if (this.player.cor < 66) this.outx("and it makes you uncomfortable but horny");
        else this.outx("and it makes you randy as hell");
        this.outx(".\n\n", false);

        this.outx(
            "Two dexterous fur-covered hands wrap around her mottled shaft and begin pumping it.  Almost immediately the flattened-tip begins flaring wide and produces a dollop of fragrant equine pre-cum.  Urta's balls quiver happily as she plays with herself, and as you look up at her and open wide, ",
            false
        );
        if (this.player.cor < 75) this.outx("doing your best to play your part in the scene.");
        else this.outx("hoping to encourage her to absolutely soak you with cum.");
        this.outx(
            '\n\nUrta looks down with a surprisingly shy expression and asks, "<i>Could you... lick the tip please?  For me?</i>"\n\n',
            false
        );

        if (this.player.cor < 50)
            this.outx(
                "Hesitantly, you extend your tongue and lick the underside of her flat-tip.  ",
                false
            );
        else
            this.outx(
                "Eagerly, you lick around the outside edge of her flared tip, sticking your tongue out as far as you can to lick the underside once you finish.  ",
                false
            );
        this.outx(
            'Your efforts are rewarded when Urta groans and spurts a dollop of pre-cum onto your tongue, and you can see her urethra twitching and pulsating as more of the clear fluid begins to leak out.  It drips down onto your tongue as the fox picks up her pace, feverishly masturbating her bloated shaft.  She says, "<i>Swallow that pre and get ready slut, you\'ll need an empty mouth to hold all this.</i>"\n\n',
            false
        );

        this.outx(
            "You swallow, tasting the sweet pre-cum as it slides down your throat.  Risking a glance to the side, you realize there's a crowd gathering around you, and more than a few dog-dicks and horse-cocks are being stroked.  ",
            false
        );
        if (this.player.cor > 50)
            this.outx(
                "You hope the show will be arousing enough to get them off on you as well, and with renewed determination you turn back to Urta and give her balls a squeeze.",
                false
            );
        else
            this.outx(
                "You shudder in shame, and hope that the crowd will disperse. It's humiliating enough waiting to have Urta soak you with cum.",
                false
            );
        this.outx(
            "  She trembles and her tip flares wide, and you know she's starting to cum.\n\n",
            false
        );

        this.outx(
            `Her urethra dilates before your eyes and time seems to slow down as the first blob of horse-semen is launched towards you.  Blinking at the last second, you feel it splatter over your ${this.player.face()}.  You open your mouth wider, keeping your eyes closed but knowing you're expected to swallow some of it.  Urta's aim improves with the next blast, and it does land in your mouth.  You nearly gag from the sudden salty intrusion, and due to the volume of the seed a fair portion of it leaks out the sides of your mouth as you keep it open, expecting more.  You feel more cum land in your hair, then on your cheek, and finally on your neck and `
        );
        if (this.player.biggestTitSize() < 1) this.outx("chest.  ");
        else this.outx("cleavage.  ");
        this.outx(
            "Urta paints you with the stuff, until you're practically oozing cum.  It does eventually stop, and you wipe the jism from your eyes",
            false
        );
        if (this.player.cor > 60) this.outx(", being sure to lick your fingers clean afterwards");
        this.outx(".\n\n", false);

        if (this.player.cor > 50) {
            this.outx("You could probably get the crowd to cover the rest of you.  Do you?");
            this.doYesNo(this.optionalUrtaBukkake, this.declineUrtaBukkake);
            return;
        } else {
            this.outx(
                "You blush and try to clean yourself up.  An embarrassed barmaid forces her way through the crowd to give you a towel, and starts shooing away the assembled masturbators.  You thank her and towel off Urta's thick seed, being more than a little aroused by the scene you caused.  The fox-girl is leaning back looking VERY satisfied as she ",
                false
            );
            if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] >= 11)
                this.outx("stuffs herself back into her fishnet");
            else this.outx("curls her tail back around her member, concealing it from view");
            this.outx(".");
            this.dynStats("lus", 5 + Urta.rand(5) + this.player.lib / 10);
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private optionalUrtaBukkake(): void {
        this.urtaSprite();
        this.player.slimeFeed();
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] -= 2;
        this.urtaLove(-1);
        this.outx("", true);
        this.outx(this.images.showImage("urta-bukkake"), false);
        this.outx(
            `You pause to tear off your ${this.player.armorName} and expose the rest of your body, and you reach out into the crowd, grabbing the nearest cock and caressing it as you beg, "<i>Come on and cum, she missed most of me!</i>"\n\n`,
            false
        );
        this.outx(
            "Urta leans back with a smile, toying with her softening member as a ring of horny studs and herms encircles you, jerking themselves off furiously.  You take turns touching and caressing them, murmuring enticing words as they start cumming on you, one or two at a time.  As those that finish step away, they're replaced by newcomers, turned on by the cum-hungry slut in front of them.  You do your best to greet them with a wink, a stroke, and a slurp, and then you present your ",
            false
        );
        if (this.player.biggestTitSize() >= 1) this.outx(this.allBreastsDescript(), false);
        else this.outx(`${this.nippleDescript(0)}s`);
        this.outx(" to a horny wolf just in time to take his hot load on your chest.\n\n", false);
        this.dynStats("lus", 15 + Urta.rand(5) + this.player.lib / 10);
        this.outx(
            `An hour later you're totally drenched in cum.  It's dripping off you from your hair down to your ${this.player.feet()}, and you love it.  You lick up the mixed spooge until you start to feel full, and a blushing barmaid comes forward to hand you a towel.  You give her a salty kiss on the lips, sending her running away before you towel off and dress yourself.`
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    private declineUrtaBukkake(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You blush and try to clean yourself up.  An embarrassed barmaid forces her way through the crowd to give you a towel, and starts shooing away the assembled masturbators.  You thank her and towel off Urta's potent seed, being more than a little aroused by the scene you caused.  The fox-girl is leaning back looking VERY satisfied as she ",
            false
        );
        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] >= 11)
            this.outx("stuffs herself back into her fishnet");
        else this.outx("curls her tail back around her member, concealing it from view");
        this.outx(".");
        this.dynStats("lus", 5 + Urta.rand(5) + this.player.lib / 10);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [TAKE HER HOME FOR TENDER LUVINZ]
    public goBackToUrtasForLuvinz(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(this.images.showImage("urta-home-image"), false);
        if (this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == 1) {
            this.outx(
                "Urta gives you a warm smile and grabs you by the hand, pulling you out the Wet Bitch's backdoor and into Tel'Adre's back-alleys.  Her dress does little to conceal the bulging mass underneath or the growing wet spot that forms at the tip of her impressive tent.  The long, body-hugging garment makes it difficult for Urta to walk in her current state, and you don't make it any easier for her, constantly teasing the fox as you navigate the back-alleys of Tel'Adre.\n\n",
                false
            );

            this.outx(
                "Every chance you get, you brush a hand or a hip against her sensitive nether-bulge or lust-tightened nipples.  For someone with such a bad-ass reputation, Urta's quite easy to tease, and she makes adorable gasps and shuddering shakes every time you brush against her flare or surprise her with a tender caress.  She lets out cute whimpers as she shuffles onward, but she doesn't protest as her 'male' half drenches her dress with more and more slimy pre-cum.\n\n",
                false
            );
            this.outx(
                "The door to her apartment looms before you and you push her inside.  You do your best to stifle an involuntary snicker as you close the door and see a trail of Urta's moist arousal on the street right up to the door.  The apartment is impeccably clean, though you see a few large sex-toys half-hidden about the place.  For someone as ashamed of her desires as Urta was, she sure is terrible at hiding her kinks."
            );
            if (this.flags[kFLAGS.URTA_PETPLAY_DONE] == 0 && this.urtaLove())
                this.outx(
                    "  <b>A new, shiny leather collar lies half-concealed under a cushion, as though its owner haphazardly tried to bury it in a rush.</b>"
                );
            this.outx(
                "  The busty fox has already retreated from the front-room, the half-soaked dress on the floor the only indication she was there with you a moment ago.\n\n",
                false
            );
            this.outx(
                "You follow a trail of pre-cum on the floor and the scent of copious female arousal deeper into the apartment, around a corner, and into Urta's relatively small bedroom.  Your vulpine lover is reclined on her bed, wearing nothing but lacy stockings and a latex cock-sheath.  ",
                false
            );
            if (this.player.totalCocks() > 0)
                this.outx(
                    "In her hand is another sheath, ready to gird your own equipment in a fashion similar to her own.  ",
                    false
                );
            this.doNext(this.urtaHomeLuvLuvinsMenu);
            return;
        }
        this.outx(
            "Urta smiles broadly and gives you a grateful peck on the cheek.  She makes like she's going to rise, then stirs uncomfortably, her eyes flashing down towards her crotch.  The fox settles back down and asks, \"<i>Would you mind paying off my tab while I slip out of here?  You've gotten me a bit too exposed to stand around trying to pay,</i>\" as she fishes out a coin-purse.  Tossing a few gems and odd coins your way, your over-endowed lover gives you a longer kiss before pushing you away from the table.\n\n",
            false
        );

        this.outx(
            "Walking a little strangely, you make your way to a waitress and pay off Urta's tab, feeling a bit flushed from the kiss and the action you're expecting later on.  Once done with the onerous task, you turn and realize Urta has vanished, though the backdoor to the bar is swinging once again.  You head out after her, stumbling directly into her exposed member as you step out into the alley.  Urta blushes fiercely and shivers, stammering, \"<i>It hurt too much to keep it penned up.  I'm sorry.</i>\"\n\n",
            false
        );

        this.outx("You assure her that you aren't offended");
        if (this.player.lib > 50 || this.player.cor > 50)
            this.outx(
                " and are actually turned on by the thought of walking through the city with such a 'big' lover hanging off your arm",
                false
            );
        this.outx(
            ".  Urta smiles weakly and hooks her arm through yours, leading you towards her apartment, making sure to stick to the more abandoned back-roads.  Her caution doesn't stop the pair of you from giving a few free shows, and if anything, each brief encounter with a passerby seems to be making her bigger and harder, revealing a half-buried exhibitionist streak.\n\n",
            false
        );
        this.goBackToUrtasForLuvinzII();
    }

    public goBackToUrtasForLuvinzII(): void {
        this.outx(
            "The journey is blessedly brief, and within minutes you arrive at Urta's house.  She fiddles with the lock anxiously for a moment before finally getting a -CLICK- and unlocking it.  You sweep inside behind your host and look around, mildly shocked at the spartan surroundings.  Urta's apartment is tiny, cramped, and nearly devoid of possessions beyond weapons, armor, and sex-toys.",
            false
        );
        if (this.flags[kFLAGS.PC_SEEN_URTA_SEX_TOYS] == 0) {
            this.outx("  The last group is the most numerous of those three.");
            if (kGAMECLASS.giacomo > 0)
                this.outx(
                    "  You recognize some of the toys as Giacomo's wares, though there are a fair number that seem to be custom made, and others that are clearly living creatures.",
                    false
                );
            this.outx(
                "  Looking over the things she had to use before she met you, it dawns on you just how lonely the poor fox has been.",
                false
            );
        } else
            this.outx(
                "  While the last group used to be the most numerous, it looks like Urta has cleaned house and only has a few of the toys left.  It seems that since meeting you she hasn't had to turn to her massive device collection like she used to.  It dawns on you just what a difference you've made in Urta's life, and it brings a loving smile to your face.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            '"<i>Sexy, are you going to come get some?</i>" Urta calls out from the bedroom in the back.  You slap your forehead, angry for getting so distracted while a hot piece of ass is on the line.  Heading deeper into the apartment after her, you turn the corner to her bedroom and are floored by the sight.  Urta is totally nude save for a pair of black fishnet stockings and some kind of shining latex cock-sheath.  She\'s on all fours on top of a fur-lined bed, and wiggling her hind-end at you with her tail lifted in the air.  The scent of need pours off from her sex, and you find yourself as ',
            false
        );
        if (this.player.hasVagina() && this.player.totalCocks() > 0)
            this.outx("hard and wet as you've ever been");
        else if (this.player.totalCocks() > 0) this.outx("hard as you've ever been");
        else if (this.player.hasVagina()) this.outx("wet as you've ever been");
        else this.outx("ready as you've ever been to take such a monster");
        this.outx(".\n\n", false);

        this.outx(
            'Urta is clearly looking to take a more passive role, and she begins stroking herself as she asks, "<i>How do you want to fuck, lover?</i>"',
            false
        );
        // [M: VAGINAL] [F: RIDE] [GENDERLESS/M: RIDE ANAL]
        let vaginal;
        let femaleRides;
        if (this.player.totalCocks() > 0) vaginal = this.dudeFuckingUrtasCooch;
        if (this.player.hasVagina()) femaleRides = this.rideUrtaTenderFemale;
        // simpleChoices("Fuck Vagina",vaginal,"Ride (Vaginal)",femaleRides,"Ride (Anal)",tenderTakeItUpTheAssFromUrta,"No Condoms",condomlessUrtaInHouseSmex,"",0);
        this.menu();
        this.addButton(0, "Fuck Vagina", vaginal);
        this.addButton(1, "Ride(Vaginal)", femaleRides);
        this.addButton(2, "Ride(Anal)", this.tenderTakeItUpTheAssFromUrta);
        this.addButton(3, "No Condoms", this.condomlessUrtaInHouseSmex);
        if (this.player.isGoo() && this.player.skinType == SKIN_TYPE_GOO)
            this.addButton(4, "Goo (Weird)", this.urtaGooTesticleVoreRuinedOrgasms);
    }

    private rideUrtaTenderFemale(): void {
        this.urtaSprite();
        this.flags[kFLAGS.PC_SEEN_URTA_SEX_TOYS]++;
        this.urtaLove(1.5);
        this.flags[kFLAGS.TIMES_FUCKED_URTA]++;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 3 + Urta.rand(2);
        this.outx("", true);
        this.outx(this.images.showImage("urta-home-female-ride"), false);
        this.outx(
            "You climb into bed and playfully roll Urta over.  Her tits and horse-cock flop and jiggle from the change in position, and you watch mesmerized for a moment until Urta giggles girlishly, drawing you out of your reverie.\n\n",
            false
        );

        this.outx('"<i>Do you like them that much?</i>" she asks.\n\n', false);

        this.outx("You nod ");
        if (this.player.cor < 50 || this.player.lib < 50) this.outx("sheepishly ");
        else this.outx("eagerly ");
        this.outx(
            "and grab ahold of her latex-wrapped member, giving it gentle strokes along the underside.  Urta moans loudly and twitches her hips, already eager for more, and the ",
            false
        );
        if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_WET)
            this.outx("growing moistness in your loins");
        else if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_DROOLING)
            this.outx("sopping wetness in your loins");
        else this.outx("flood of moisture leaking from your crotch");
        this.outx(" signals your readiness to take her.");
        if (this.player.totalCocks() > 0) {
            if (this.player.totalCocks() == 1)
                this.outx(
                    `  Your ${this.multiCockDescriptLight()} is raging hard and trembling, but ignored for now.`
                );
            else
                this.outx(
                    `  Each of your ${this.multiCockDescriptLight()} is raging hard and trembling, but ignored for now.`
                );
        }
        this.outx(
            `  Climbing atop the bed with her, you swivel your ${this.hipDescript()} about, positioning her at your entrance and straddling your ${this.player.legs()} around her.\n\n`,
            false
        );

        this.outx(
            "You can see a bubble already forming at the tip of her hardness, signaling the unbridled lust your form has brought to your lover and you lower yourself with a sigh, feeling it spread your lips apart with delicious slowness as her flared tip begins penetrating you.  The horse-cock is so big and thick that it ",
            false
        );
        if (this.player.vaginalCapacity() < 60) {
            this.outx("hurts quite a bit as it pushes further and further inside.  ");
            this.player.cuntChange(60, true);
        } else {
            this.outx(
                "stretches you nice and wide, rubbing you tightly even though you're quite stretched already.  ",
                false
            );
            this.player.cuntChange(60, true);
        }
        this.outx("You gasp and sigh happily, sinking downwards slowly.\n\n", false);

        this.outx("The ring of prepuce passes past your entrance ");
        if (this.player.vaginalCapacity() < 60)
            this.outx(
                "and you bottom out there, unable to take in any more of her equine shaft.",
                false
            );
        else
            this.outx(
                "and you keep going, sliding down along the marvelous member until your cunt-lips are rubbing her sheath against your [clit].",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            `Urta growls and grabs you by the back of the neck, pulling your ${this.player.face()} down for a sloppy kiss.  Her smooth canine-like tongue forces its way into your mouth and curls around yours as the two of you swap spit.  Your hips, spurred on by the passion, begin to rise and fall to the tempo of the kiss, and in seconds you're both gasping and moaning against each other's lips, lost in the throes of passion.  Deep inside you, you can feel the condom filling with Urta's incredibly copious pre-cum, but every time your hips drop down the pressure squeezes some of it down along her length until it escapes around the condom's edge, dripping into her sheath.\n\n`,
            false
        );

        // (Big Tits:
        if (this.player.biggestTitSize() >= 5) {
            this.outx(
                `Your ${this.breastDescript(0)} mash into the fox's own, your ${this.nippleDescript(
                    0
                )}s `
            );
            if (!this.player.hasFuckableNipples())
                this.outx("rubbing over her black-skinned buds.");
            else this.outx("parting as her prominent black nipples slip inside your own.");
            this.outx(
                "  You squeal at the sudden pleasure, arching your back and furthering the sensation from your over-burdened chest.",
                false
            );
            if (this.player.totalCocks() > 0) {
                if (this.player.cocks[0].cockLength > 15) {
                    if (this.player.totalCocks() == 1)
                        this.outx(
                            `  Your ${this.multiCockDescriptLight()} pushes up between the jiggling breasts, slicking them with your pre-cum as it begins to get tit-fucked by both of your trembling forms.`
                        );
                    else
                        this.outx(
                            `  Each of your ${this.multiCockDescriptLight()} pushes up between the jiggling breasts, slicking them with your pre-cum as they begin to get tit-fucked by both of your trembling forms.`
                        );
                }
            }
            this.outx("\n\n", false);
        }

        this.outx(
            `You both cry out in orgiastic pleasure as your shaking ${this.hipDescript()} force your tightly-stretched cunt over Urta's rubber-wrapped horse-prick again and again.  Your internal muscles spasm, clamping down tightly in sudden orgasm.  Urta's voice trembles in a low moan of satisfaction while her lower body twitches upwards with hard pumping motions.  Her dick trembles inside you, and you feel the latex around her girthy prick inflating with her seed and pressing against your cervix.\n\n`,
            false
        );
        if (this.player.totalCocks() > 0) {
            if (this.player.cockTotal() == 1) {
                this.outx(
                    `Your own ${this.multiCockDescriptLight()} cums as well, blasting seed over both your `
                );
                if (this.player.cocks[0].cockLength > 15 && this.player.biggestTitSize() >= 5)
                    this.outx("jiggling tits");
                else this.outx("bellies");
                this.outx(", glazing them in slippery goo.");
            } else {
                this.outx(
                    `Each of your own ${this.multiCockDescriptLight()} cums as well, blasting seed over both your `
                );
                if (this.player.cocks[0].cockLength > 15 && this.player.biggestTitSize() >= 5)
                    this.outx("jiggling tits");
                else this.outx("bellies");
                this.outx(", glazing them in slippery goo.");
            }
            this.outx("\n\n", false);
        }

        this.outx(
            "Lying down on top of her, the two of you cuddle while joined at the hips, snuggling happily",
            false
        );
        if (this.player.totalCocks() > 0) {
            this.outx(` and ignoring the hot, wet mess your ${this.multiCockDescriptLight()} `);
            if (this.player.totalCocks() == 1) this.outx("has");
            else this.outx("have");
            this.outx(" left between your nude bodies");
        }
        this.outx(
            `.  The fox-girl gives you a long, happy kiss and holds you tightly in her arms before she lets you go and begins to pull out.  The loud -SCHLLLIIIICK- of her fat member being dragged through your nethers makes you blush, and the feeling of it robs you of any strength below the waist.  The latex stretches, the cum-bubble still trapped inside you and stretching the condom obscenely for a moment, until it jerks out with a sudden 'pop'.  The relief is palpable, but your ${this.vaginaDescript(
                0
            )} hangs open, with lips parted loosely after today's incredible violation.\n\n`,
            false
        );

        this.outx(
            "Urta sighs and languidly pulls off her condom, nearly getting cum everywhere before she ties it off.  It looks like it'll pop at any moment – there's probably over a liter of cum stored in it.  She hefts it and mocks like she's going to throw it at you, but stops and giggles before setting it down beside the bed.  Your foxy lover says, ",
            false
        );
        if (
            this.flags[kFLAGS.TIMES_FUCKED_URTA] <= 10 ||
            this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] < 11
        )
            this.outx(
                "\"<i>Lovemaking is so much of a hassle to clean up if I don't use one of these!  At least I don't have to use them for the same reason as most of Tel'Adre.  It turns out I'm sterile or damn close to it, so all that fun-juice is just for show.</i>\"",
                false
            );
        else
            this.outx(
                `</i>"<i>You're so good to me ${this.player.short}.  I wish my little pony here was fertile enough for me to put a bun in your oven, if you wanted of course.</i>"`
            );
        this.outx(
            "\n\nShe blushes as if realizing what she's said and turns to start cleaning up.  You give the nervous fox a hug and squeeze her breasts mischievously before breaking it.  She smiles over her shoulder at you and says, \"<i>Thanks again.  You better get going though, I know you've got things that need doing.  Come by the Wet Bitch again soon and see me, OK?</i>\"\n\n",
            false
        );
        this.outx(
            "You nod before you leave, feeling satisfied and a warm glow from something other than lust.",
            false
        );
        // if(flags[kFLAGS.URTA_FERTILE] == 1) player.knockUp(21,515,80);
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [FUCK HER VAGINA]
    private dudeFuckingUrtasCooch(): void {
        this.urtaSprite();
        let x: number = this.player.cockThatFits(this.urtaCapacity());
        if (x < 0) x = 0;
        const y: number = this.player.cockThatFits2(this.urtaCapacity());
        if (this.player.cockArea(x) > this.urtaCapacity()) {
            this.fuckUrtasVagButTooBig();
            return;
        }
        this.outx("", true);
        this.outx(this.images.showImage("urta-home-male-fuck"), false);
        const cocks: number = this.player.totalCocks();
        this.flags[kFLAGS.PC_SEEN_URTA_SEX_TOYS]++;
        this.flags[kFLAGS.TIMES_FUCKED_URTA]++;
        this.urtaLove(1.5);
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]--;
        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] < 1)
            this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = 1;
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 2;

        this.outx(
            `You let her know that you want her just the way she is and climb into bed behind her.  She watches you apprehensively over her shoulder as you pull out your ${this.multiCockDescriptLight()} and start lining yourself up to fuck her doggie-style.  `
        );
        if (cocks > 1 && y >= 0)
            this.outx(
                `Your secondary ${this.cockDescript(
                    y
                )} wobbles directly behind her back-door and Urta's eyes widen a bit when she realizes you're going to double-penetrate her.  `
            );
        if (cocks > 2)
            this.outx(
                `The remainder of your ${this.multiCockDescriptLight()} fan out, ready to rub themselves against her butt-cheeks once you push inside.  `
            );
        this.outx(
            "You can see your lover's condom starting to bloat at the tip as her horse-cock begins to flare within its confinement.  She trembles with anticipation before taking a deep breath and saying, \"<i>I'm ready... take me!</i>\"\n\n",
            false
        );

        this.outx(
            `Obligingly, you ease your hips forward, reeling at the heat of her cunt-lips as they welcome your ${this.cockDescript(
                0
            )}'s ${this.player.cockHead()} with slippery moisture.  `
        );
        if (cocks > 1 && y >= 0)
            this.outx(
                `Your second ${Appearance.cockNoun(
                    this.player.cocks[y].cockType
                )} soon bumps against her pucker and strains against it, pushing ever-so-slowly into her tight hole as she gradually relaxes before you.  `
            );
        this.outx("As you carefully breach the opening");
        if (cocks > 1 && y >= 0) this.outx("s");
        this.outx(
            ", the going gets easier and easier for you.  You gently rock your [hips] forwards, sliding deep inside her until she's taken you to the hilt.  Once you're fully embedded within her, Urta wriggles happily beneath you, and you reach around to caress her drooping member, relishing in her pleasured yelps and moans.\n\n",
            false
        );

        this.outx(
            "You rock back and forth, picking up the tempo gradually.  At first the gray fox is only gasping happily, but as you go faster and faster, her gasps turn into quiet moans, then transform into ecstatic squeals.  ",
            false
        );
        if (this.player.balls > 0)
            this.outx(
                "Your balls loudly smack into her squelching-wet cunt and the soaked backside of HER balls",
                false
            );
        else
            this.outx(
                "Your crotch slaps loudly against her squelching-wet cunt and backside",
                false
            );
        this.outx(
            " as you fuck her hard and fast.  Urta's cock twitches in your hand, and the pre-filled bubble hanging from her cock-tip is getting close to apple-sized.  Both of you are rutting like animals and riding on the edge of an orgasm.  Then, Urta throws her head up, arches her back, and starts howling like a well ridden bitch in heat.  Now that she's moving with you, her magnificent horse-cock fully engorges inside your grasping hand, and you slide it between your grasping fingers, masturbating her even while fucking her.\n\n",
            false
        );

        this.outx(
            `Urta cums first.  Her cries of pleasure are muffled as she shoves her face into a pillow, screaming in ecstasy.  The warmth around your ${this.cockDescript(
                x
            )} seems to grow that much hotter as it squeezes you, wringing you tightly from root to tip.  `
        );
        if (cocks > 1 && y >= 0)
            this.outx(
                `The intensity and pressure in her back-door is even worse, and your ${this.cockDescript(
                    y
                )} is nearly in pain from her asshole's tight, pulsating grip.  `
            );
        this.outx(
            "Her equine member trembles in your grasp as it releases its sticky payload into the thick, latex condom.  You pump away at her shaft, feeling the spunk inside distort the tube-like appendage until your orgasm shocks you into releasing it.\n\n",
            false
        );

        this.outx(
            "You spurt into Urta's sloppy box, creaming it until her juices begin to run in an off-white color.  ",
            false
        );
        if (cocks > 1 && y >= 0)
            this.outx(
                `The ${this.cockDescript(
                    y
                )} you've crammed in her ass does not disappoint either, matching its brother squirt for squirt as it spends your seed with reckless abandon.  `
            );
        if (cocks > 2)
            this.outx(
                `Her butt and tail are covered with the stuff as each of your remaining ${this.multiCockDescriptLight()} splatters her with spooge, covering her fur in white sludge.  `
            );
        this.outx(
            "The fox's internal muscles happily continue to squeeze and milk you, prolonging your orgasm beyond its normal duration.",
            false
        );
        if (this.player.cumQ() >= 750)
            this.outx(
                "  Her body is quickly bloated thanks to your body's incredible fertility, but she seems able to take it just fine.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            `The two of you collapse together in a shuddering pile of post-orgasmic bliss.  The shift in position frees your ${this.multiCockDescriptLight()} from Urta with a noisy -SHHHLLUUUCK-, but you're too wiped out to care.  The fox-girl sighs happily and rolls over, planting a kiss on your nose before she works at removing her over-filled condom.  It nearly bursts when she ties it off, but she manages to gently set it down to the floor without incident. She looks at you happily and gives you a big hug, crushing her hard nipples against `
        );
        if (this.player.biggestTitSize() >= 1) this.outx(`your own ${this.breastDescript(0)}`);
        else this.outx("your chest");
        this.outx(
            ' as she says, "<i>Thank you so much, lover.  I forget how good it can be in my... vagina.  Maybe we could do this again?</i>"\n\n',
            false
        );

        this.outx(
            "You give her a happy nod, and the two of you cuddle a bit longer before you leave to return to camp.",
            false
        );
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.knockUpUrtaChance();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [FUCK HER VAGINA – TOO BIG]
    private fuckUrtasVagButTooBig(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You let her know that you want her just the way she is and climb into bed behind her.  She watches you apprehensively over her shoulder and objects, \"<i>I'm sorry lover, but that's WAYYYY too big to fit in any hole I've got.  Maybe I should go ahead and take you?  Or would you rather help me off under the table back at the bar?</i>\"",
            false
        );
        // [GET BUTT FUCKED] [GET CUNT-FUCKED] [BAR BJ] [Fuck it I'm leaving!]
        let vaginal;
        if (this.player.hasVagina()) vaginal = this.rideUrtaTenderFemale;
        this.simpleChoices(
            "Ride Vaginal",
            vaginal,
            "Ride Anal",
            this.tenderTakeItUpTheAssFromUrta,
            "Bar BJ",
            this.blowUrtaUnderTable,
            "No Condom",
            this.condomlessUrtaInHouseSmex,
            "Leave",
            this.fuckItAndLeave
        );
    }

    private fuckItAndLeave(): void {
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]--;
        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] < 1)
            this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = 1;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]--;
        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] < 1)
            this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = 1;
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 36;
        this.urtaLove(-5);
        this.outx("", true);
        this.outx(
            "You let Urta know that you've changed your mind and will be leaving.  You go before she can object and the sound of quiet sobbing chases you out into the streets.",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [RIDE HER COWBOY/NEUTER]
    private tenderTakeItUpTheAssFromUrta(): void {
        this.urtaSprite();
        this.outx("", true);
        this.flags[kFLAGS.PC_SEEN_URTA_SEX_TOYS]++;
        this.urtaLove(1);
        this.flags[kFLAGS.TIMES_FUCKED_URTA]++;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 2 + Urta.rand(3);
        const cocks: number = this.player.totalCocks();
        this.outx(this.images.showImage("urta-home-anal"), false);
        this.outx(
            `You give Urta's backside a playful slap and ask her to roll over.  She does so with a hesitant look on her face, wondering what you're about.  When you spread her legs and work your way forward to straddle her, a beaming smile breaks across her face and she says, "<i>You really want me inside you, don't you ${this.player.short}?</i>"\n\n`,
            false
        );

        this.outx(
            `Her cheeks color when you give her a nod and begin lowering your ${this.buttDescript()} towards her pillar of horse-flesh. She gasps quietly when the tip begins to push against your ${this.assholeDescript()}.  `
        );
        if (this.player.analCapacity() >= 60)
            this.outx(
                "You sigh and begin sliding down it, your previously-stretched backdoor easily accepting the gigantic intruder as it fills you.",
                false
            );
        else {
            this.outx(
                "You grunt and begin sliding down it, feeling painfully stretched by the gigantic intruder but pressing on anyway, knowing full-well you'll be a bit looser by the time you take her whole length.",
                false
            );
            if (this.player.ass.analLooseness < 5) {
                if (this.player.ass.analLooseness == 0)
                    this.outx("<b>  Urta has taken your anal virginity.</b>");
                else this.outx("<b>  Your ass is stretched.</b>");
                this.player.ass.analLooseness++;
            }
        }
        // Butt Stretched used to determine how long since last enlargement
        if (this.player.findStatusAffect(StatusAffects.ButtStretched) < 0)
            this.player.createStatusAffect(StatusAffects.ButtStretched, 0, 0, 0, 0);
        // Reset the timer on it to 0 when restretched.
        else this.player.changeStatusValue(StatusAffects.ButtStretched, 1, 0);
        if (this.player.totalCocks() > 0) {
            this.outx("  The bumps and veins keep rubbing against your prostate, and ");
            if (cocks > 1) this.outx("each of ");
            this.outx(
                `your ${this.multiCockDescriptLight()} hardens near instantly from the forced stimulation.`
            );
        }
        this.outx(
            "  Slowly but surely, it slips further and further inside you, until you've bottomed out and have miraculously taken her entire shaft.\n\n",
            false
        );

        // (IF DICKS)
        if (cocks > 0) {
            this.outx("For a few moments you sit on her deeply penetrating thickness, and ");
            if (cocks > 1) this.outx("each of ");
            this.outx(
                `your ${this.multiCockDescriptLight()} droops onto her belly, half-hard from the pressure on your prostate, but going a little soft from the lack of attention.`
            );
            if (this.player.cocks[0].cockLength >= 15) {
                this.outx("  Urta winks and guides ");
                if (cocks > 1) this.outx("one of ");
                this.outx(`your ${this.multiCockDescriptLight()} between her tits`);
                if (this.player.cocks[0].cockLength >= 20 && this.player.cocks[0].cockLength <= 28)
                    this.outx(", even taking time to lick and suck on the head");
                this.outx(".");
                this.outx(
                    `  She begins giving you a slow tit-fuck, trying to encourage you to pick up the pace and start riding her.  It does the trick as your ${this.hipDescript()} start rocking on their own in reaction to her efforts.  She licks harder, and you reward her by lifting yourself up and sliding back down.  Her massive girth squeezes a squirt of pre-cum from your prostate with every few strokes, splattering it on her muzzle.`
                );
            }
            this.outx("\n\n", false);
        } else {
            this.outx(
                `For a few moments you sit like that, trying to adjust to the pressure in your backside.  After a few moments you can feel your muscles relaxing, allowing Urta to rest more comfortably inside you.  Flexing your ${this.player.legs()}, you pull yourself up off of her until the flared tip is just barely inside you, then you plunge back down.  Urta's mouth hangs open and her tongue lolls out, and you can feel the warmth of her leaking fluid inside of you, letting you know just how good your ${this.assholeDescript()} feels to her.\n\n`,
                false
            );
        }
        this.outx(
            `You bounce on top of your fox-lover's equine rod, spearing your ${this.assholeDescript()} on it over and over.  `
        );
        if (cocks == 0)
            this.outx(
                "Strange pleasure spreads from your sensitive opening, and you know that somehow you're going to cum from this.  ",
                false
            );
        else
            this.outx(
                "Powerful pleasure spreads through you as it bumps and rubs your prostate. You know you'll cum from this, and soon.  ",
                false
            );
        this.outx(
            "Urta cries out and grabs you by the hips, yanking you down against her sheath.  Warmth blossoms inside you as her seed begins pumping into your bowels.  You can feel yourself filling up with her seed and you cum, clamping down around her intruder as it injects more and more foxy-horse-spunk into you.\n\n",
            false
        );

        // (DICKS)
        if (cocks > 0) {
            if (this.player.cocks[0].cockLength < 15)
                this.outx(
                    "Your orgasm erupts out onto her belly, splattering her fur with your sticky cum.  ",
                    false
                );
            else if (this.player.cocks[0].cockLength < 20)
                this.outx(
                    "Your orgasm erupts all over her tits, slicking them with your sticky white cum.  ",
                    false
                );
            else
                this.outx(
                    "Your orgasm erupts into her muzzle, filling her mouth with your sticky, white cum.  ",
                    false
                );
            this.outx(
                "  Urta groans underneath you and begins caressing and squeezing you, milking you of every drop.",
                false
            );
            if (this.player.cumQ() >= 500)
                this.outx(
                    "  Urta gulps down as much as she can but it begins leaking around her muzzle, and she eventually lets it pop free, giving up on swallowing it entirely.",
                    false
                );
            if (this.player.cumQ() >= 1000 && this.player.cumQ() < 1500)
                this.outx(
                    "  Your output easily soaks her, and she gathers it up and slops it over her nipples, pinching and pulling on them.",
                    false
                );
            if (this.player.cumQ() >= 1500)
                this.outx(
                    "  Your output soaks her and the bed with seed, leaving the two of you in a warm gooey puddle in the very center of the bed.",
                    false
                );
            this.outx("\n\n", false);
        }
        this.outx(
            "Urta pulls you down onto her breasts and gives you a long hug and a happy lick.\n\n",
            false
        );

        this.outx(
            '"<i>Thank you soooo much lover, I needed that,</i>" she says, "<i>Now you better go get back to your business, I\'ve got to get cleaned up!',
            false
        );
        if (this.player.cumQ() > 750)
            this.outx(`  You really are a messy, ${this.player.mf("boy", "girl")} aren't you?`);
        this.outx('</i>"\n\n', false);
        this.outx(
            "She untangles herself from you, the filled end of her condom loudly popping free from your backside as she disengages herself from you.  The two of you do your best to clean up and get dressed, and you give her a quick but passionate kiss before ducking out the door to check up on your camp.",
            false
        );
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [MARBLE COCKU-BLOCKKU]
    // (Happens when Urta is 'sated' and PC visits her.)
    private marbleCockuBlockuUrta(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            'Urta gives you a serious look when you come up to her, "<i>I just got a report in from some of our scouts last night.  It looks like they found your camp.  There was a cow-girl there',
            false
        );
        // if nursery
        if (this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION] == 100) this.outx(" and a nursery");
        this.outx(".");
        // (Not wuv'ed yet)
        if (this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == 0) {
            this.outx(
                "  I know we aren't a couple or anything, but, is she something to you?  Are you lovers?</i>\"\n\n",
                false
            );
            this.outx(
                "Urta's cheeks color sheepishly and she says, \"<i>You don't have to answer, but whatever the truth is, you can tell me.</i>\"\n\n",
                false
            );
        }
        // (WUVED)
        else {
            this.outx(
                '  I know our paths keep us apart most of the time... and multiple lovers are pretty far from uncommon, but I need to know – do you two have something going on?</i>"\n\n',
                false
            );
            this.outx(
                "Urta's looking at you nervously, clearly dreading your answer.  How do you respond?\n\n",
                false
            );
        }
        this.outx("Do you answer honestly, refuse to answer, or lie?");
        // [Honestly] [Refuse] [Lie]
        this.simpleChoices(
            "Honestly",
            this.TellUrtaDAHTRUUUUF,
            "Refuse",
            this.trufftrufftrufftruff,
            "Lie",
            this.lietoUrtaAboutMarble,
            "",
            undefined,
            "",
            undefined
        );
    }

    // [Honestly]
    private TellUrtaDAHTRUUUUF(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You explain to Urta about how you became addicted to Marble's milk at the farm, and how despite the harshness of the untamed lands around the both of you, you formed a loving relationship.  Hearing the truth and honesty backing your words, Urta's eyes water, but the saddened fox-girl refuses to look away.  Once you've finished, she dabs away a tear and takes a swig of what you hope is ale.  She wipes the foam from her muzzle with the tear-stained rag and speaks with a husky, grief-laced voice, \"<i>I... appreciate your honesty.  Some part of me was afraid you would try to lie.  Yes, I'm a little disappointed I'm not the only one to warm your bed, but telling me the truth was the right thing to do, and ",
            false
        );
        if (this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == 1) this.outx("I love you for it");
        else this.outx("I respect you for it");
        this.outx(".");
        if (!this.urtaOpenAboutEdryn()) {
            this.outx(
                "  I suppose while we're clearing out skeletons, I should mention I've had relations with Edryn a few times since we've ",
                false
            );
            if (this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == 1) this.outx("been together");
            else this.outx("gotten intimate");
            this.outx(
                ".  I'm ashamed to admit I can't really control myself that well either.</i>\"\n\n",
                false
            );
            this.outx(
                "Do you comfort her, tell her to toughen up and remind her she's great in the sack, or walk out in a huff?",
                false
            );
            // (Comfort Her – Let her know you still (love/like) her and forgive her.)
            // (Toughen Up – Let her know she's great in the sack but you not relationship material.)
            // (Walk Out – Fuck her, she cheated on me!)
            // [Comfort] [Toughen Up] [Walk Out]
            this.simpleChoices(
                "Comfort",
                this.comfortUrtaAfterTellinTruuf,
                "Toughen Up",
                this.toughenUpUrtaAfterTellingTruuf,
                "Walk Out",
                this.walkoutOnUrtaAfterTellingTruff,
                "",
                undefined,
                "",
                undefined
            );
        } else {
            this.outx('</i>"');
            this.outx(
                "\n\n\"<i>I can't be mad about it of course, but I guess I don't have to feel so bad when I'm with Edryn do I?  Maybe sometime the three or four of us could get together for some fun?</i>\" Urta playfully suggests, already sounding more like herself.  She chats happily with you for a while, pleased you still care so much for her, but eventually, you have to go and bid your farewells."
            );
            this.doNext(this.camp.returnToCampUseOneHour);
        }
    }

    // [Comfort]
    private comfortUrtaAfterTellinTruuf(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You let Urta know that you understand.  After all, in a world like this monogamy is next to impossible.  There's no shame in what she did with Edryn or your relationship with Marble.  The two of you share a heartfelt hug and resolve to continue your relationship.",
            false
        );
        // (If PC has Edryn (<3) & fits her req's)
        if (
            ((this.player.lowerBody == LOWER_BODY_TYPE_CENTAUR && this.player.totalCocks() > 0) ||
                this.player.horseCocks() > 0 ||
                (this.player.totalCocks() > 0 && this.player.cor > 50)) &&
            this.player.statusAffectv1(StatusAffects.Edryn) >= 4
        )
            this.outx(
                "  Urta even suggests that the two of you take turns at Edryn sometime.",
                false
            );
        // Slight love loss
        this.urtaLove(-4);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Toughen Up]
    private toughenUpUrtaAfterTellingTruuf(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You look at Urta and explain that she shouldn't take it too hard.  Both of you got into this scenario without expecting anything more from it.  You explain that though she is a good friend and GREAT in the sack, you don't see your relationship going to that level.  Urta seems ",
            false
        );
        if (this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == 1) this.outx("heartbroken");
        else this.outx("saddened");
        this.outx(" by the news");
        if (this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == 1) {
            this.outx(", and she has a defeated look in her eyes.");
            // (Luv set to 0 and blocked if in luv,
            this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] = 0;
            this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] = -1;
        } else {
            this.outx(", but you spy a determined look in her eyes.");
            // if not in luv, luv reset to 0).
            this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] = 0;
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Walk Out]
    private walkoutOnUrtaAfterTellingTruff(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You push away from the table and turn your back on Urta, enraged at her for cheating on you with Edryn, even though you cheated on her as well.  You ignore the hypocrisy in your actions and walk out, shattering Urta's heart in the process.  As you close the door of 'The Wet Bitch' behind you, you see Urta, sobbing into a hanky while Edryn goes over to comfort her.  It figures.",
            false
        );
        // (Luv set to 0, Urta Hatezes you)
        this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] = 0;
        this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] = -1;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Refuse]
    private trufftrufftrufftruff(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You refuse to answer the question, telling Urta that what happens outside the walls has no impact on what the two of you have here.  She disagrees as her fairly meek attitude slips away, replaced with a sterner expression, \"<i>No.  It matters to me.  I want to know about your life and if you won't even answer... then you aren't as kind as I thought you were.</i>\"\n\n",
            false
        );
        this.outx("\n\nIt looks like you've have to tell her the truth or lie...", false);
        // [Truth] [Lie]
        this.simpleChoices(
            "Truth",
            this.TellUrtaDAHTRUUUUF,
            "Lie",
            this.lietoUrtaAboutMarble,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }

    // [Lie]
    private lietoUrtaAboutMarble(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You let Urta know that the poor cow-girl needed a place to stay from the monsters that roam the wilds, and that your camp is the safest place.  In great detail you talk about sheltering her, but never taking advantage of her, and trying your best to do what's right.  Through the whole conversation Urta dabs at tears, and you assume them to be tears of relief.  The story suitably complete and air-tight, you finish and look at Urta.\n\n",
            false
        );
        this.outx(
            `"<i>I misjudged you, ${this.player.short}.  I didn't think you'd lie to me, and you did.  The scouts talked to her`
        );
        if (this.flags[kFLAGS.MARBLE_KIDS] == 1) this.outx(" and saw the kid");
        if (this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION] > 1) this.outx(" and saw the kids");
        this.outx(
            "!  I know you two are an item, and I can't believe you didn't own up to it!</i>\" she cries, \"<i>You better believe I'm fucking pissed at you.  I could've accepted sharing you, but lying to me like this...I won't ever trust you again.  Just...just go – I might be able to overlook this but it hurts too much right now.</i>\"\n\n",
            false
        );
        this.outx(
            "There's nothing to do but go.  You're not sure if Urta will ever let you see her again.",
            false
        );
        // (Urta pissed for 48 hours, then make-up scene.  Love forever blocked)
        this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] = -1;
        this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] = 0;
        this.flags[kFLAGS.URTA_ANGRY_AT_PC_COUNTDOWN] = 48;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [TWU WUV TALK]
    private UrtaTwuWuvOffer(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            `Urta looks nervously at you, fidgeting and shifting her sizable addition under the table.  She starts talking meekly, but her voice rises in confidence and intensity as she goes, "<i>I've been thinking ${this.player.short}, we've known each other for a while now.  When we're together, I don't have to worry about someone seeing something they shouldn't, or being made fun of, because it doesn't bother you and you don't care.  And what do I have to care about if you don't care about it?</i>"\n\n`,
            false
        );
        this.outx(
            'She leans over and puts her hands on your shoulders, looking you in the eye as she continues, "<i>I\'ve never felt this comfortable around ANYONE before, and well, I think I love you.  Please, do you feel the same way about me?</i>"\n\n',
            false
        );
        this.outx(
            "Given how much time you've spent with her, and the amazing sex, her declaration doesn't really surprise you.  Do you love her back?",
            false
        );
        // [Yes] [No]
        this.doYesNo(this.TwuWuvIsBeautifulUrta, this.noUDontLoveUrta);
    }
    // [No]
    private noUDontLoveUrta(): void {
        this.urtaSprite();
        this.outx("", true);
        // (LUV BLOCKED)
        this.flags[kFLAGS.URTA_PC_AFFECTION_COUNTER] = 0;
        this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] = -1;
        this.outx(
            "You gently remove her hands from your shoulders and let Urta know that you enjoy being around her, but that you aren't in love with her.  Her eyes choke up with tears, but she nods as you explain, wiping her eyes with a napkin.  Urta cries softly and murmurs, \"<i>...I didn't want to hear that, but I understand.  Do you want to keep on as we have been though?</i>\"\n\n",
            false
        );
        // [Yes] [No]
        this.doYesNo(this.stayFuckbuddiesAfterShootingDown, this.turnDownFuckbuddiesANDLove);
    }
    // [yes]
    private stayFuckbuddiesAfterShootingDown(): void {
        this.urtaSprite();
        this.outx(
            'Urta gives you a warm smile and a kiss on the cheek, "<i>Good.  Come see me soon, ok?</i>"\n\n',
            false
        );
        // (READY TO GO NEXT TIEM)
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 0;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [no]
    private turnDownFuckbuddiesANDLove(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "Urta bursts into tears and pushes back from the table.  She runs out of the bar, sobbing wildly.  It looks like you've totally burned that bridge.  You may as well head back to camp...",
            false
        );
        // (BURN BRIDGES MOFO)
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Yes]
    private TwuWuvIsBeautifulUrta(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            `You nod and break into a wild smile.  You lean forward and the two of you embrace in a warm hug as you admit to loving the shy fox-herm.  She pulls back and kisses you passionately on the lips, and the pair of you spend an hour cuddling contentedly in a dark corner, happy to have taken things to the next level.  It passes in a flash, but you know you need to get back to check on camp, and you leave her with another quick kiss on the lips.  You ${this.player.mf(
                "chuckle",
                "giggle"
            )} when you hear her cock harden and thunk against the table again behind you.  Oh Urta...`
        );
        // set wuv fwags
        this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] = 1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [EAT THE BITCH OUT]
    public eatUrtaOutNomNomPussy(): void {
        this.urtaSprite();
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 3;
        this.urtaLove(1);
        this.outx("", true);
        this.outx(this.images.showImage("urta-bar-vag"), false);
        this.outx(
            "Urta smiles and suggests the pair of you move to a more secluded booth before trying that.  The buxom fox doesn't give you time to react, dragging you away from your current table to a dark corner-booth.  She releases the death-like grip she has upon your wrist and throws herself into the booth's padded cushions.  Her body slowly slumps back as she slouches more and more, sliding her body until her ass is about to slip out of the seat.  Lifting a fold of the table's heavy cloth, she asks, \"<i>Care to join me, lover?</i>\"\n\n",
            false
        );

        this.outx("Suppressing a chuckle of your own, you slip under the table, ");
        if (this.flags[kFLAGS.PC_FETISH] >= 1) this.outx("secretly hoping you were noticed");
        else this.outx("hoping no one saw you disappear");
        this.outx(
            ".  Something wet and warm smears across your forehead, and with a start, you realize you've bumped directly into Urta's over-sized member.  With a disdainful snort you shove the beast aside and lean forward, groping blindly until you find the fox's thighs.  She gasps as your fingers run through her silky fur, sliding inexorably towards her moist groin.  Her legs spread of their own accord once your probing fingers discover her equally over-sized testes.  This time you lift the offending body-parts from your way, exposing your goal.\n\n",
            false
        );

        this.outx(
            "By now your eyes have adjusted to the lack of light under the table, and you're given a clear look at Urta's female parts.  The area surrounding her nether-lips is gilded in short, downy fur.  Moisture from lust soaks the entire region, leaving many of the soft hairs hanging with beads of sweat or lubricant, reminding you of dew on the grass at dawn.  The outer lips of her sex are solid black, and shining dully with moisture, even in the low light.  Experimentally you touch them, spreading them apart for a better look at your lover's interior.  Her sex's inner walls are as pitch-black as the exterior but somehow wetter.  Every exploratory touch makes her twitch, and you watch fascinated as the entrance to her depths contracts and relaxes every time you brush against it.\n\n",
            false
        );

        this.outx(
            "Urta scooches her hips forwards eagerly, and you're forced to allow her thick dick and bloated balls to rest atop your head, lest they obstruct your tongue's glistening target.  Starting slowly, you begin to lick over the moist outer surfaces of her womanhood, happily tasting the tangy scent of her arousal.  She gasps, clamping her legs around you passionately.  Muffled by the tablecloth, you can hear a faint 'oooooh' of pleasure escape Urta's lips.  Taking that as encouragement, you begin dipping your tongue into the honeypot, noisily slurping at her hole.\n\n",
            false
        );

        this.outx(
            'The click of heels on wood approaches, but you ignore them and step up your efforts, hoping to embarrass Urta in front of the newcomer.  A faint voice asks, "<i>Are you O.K. Ma\'am?</i>"\n\n',
            false
        );

        this.outx(
            'Urta\'s thighs clamp down harder, holding you in place as she replies, "<i>Just ah-ah little thirsty...could you bring me ahhhnother drink?</i>"\n\n',
            false
        );

        this.outx(
            "\"<i>Um sure thing miss, just give me a moment,</i>\" blurts the other voice as it hastily retreats into the bar's background noise.  A burst of light nearly blinds you and then a hand is wrapped around your head, yanking you forwards.  Her musky box crushes against your face, filling the air under the table with lewd squishing noises as she grinds her hips into you.  You don't even slow down, and every chance you get you swirl your tongue around the hard bud of her clit, pausing to suckle it before her forceful face-fucking mashes your lips into another part of her sex.\n\n",
            false
        );

        this.outx(
            `Sucking, licking, slurping, you judge the successfulness of your oral efforts by just how much fluid you can get to soak into your ${this.player.face()}.  The bar's noises are completely indecipherable, muffled as they are by the furred thighs clamped around your head and blocking your ears.  The fragrant musk of her box fills every breath you take as you eat her out in a frenzy, tonguing her with wild desire and need as your world narrows to the gash between her legs.\n\n`,
            false
        );

        this.outx(
            `Eventually, the vice-like pressure around your head releases, and you stagger back, blinking in confusion and allowing her balls to drop back into their normal place.  Her cock quivers on your ${this.hairDescript()}, depositing a thick stream of warmth down the back of your head.  Her thighs are twitching and her balls pulsating as she cums, unloading a thick batch of herm-cream down your back.  You jerk to the side and stroke her as she unloads, reaching around to the top of the table and grabbing an empty glass.  Guiding the flared tip into the receptacle, you allow the unknowing hermaphrodite to fill the glass with her seed.\n\n`,
            false
        );

        this.outx(
            `Finished at last, Urta's member rapidly deflates, the scent of her cum on your ${this.hairDescript()} and her juice on your ${this.player.face()} lingers.  You slide up into the booth next to your blissed out lover.`
        );
        // [Give Glass] [Drink Glass] [Set Aside]
        this.simpleChoices(
            "Give Glass",
            this.giveUrtaCumGlass,
            "Drink Glass",
            this.drinkUrtasCumGlass,
            "Set Aside",
            this.setAsideUrtaCumGlass,
            "",
            undefined,
            "",
            undefined
        );
    }

    // [GIVE GLASS]
    private giveUrtaCumGlass(): void {
        this.urtaSprite();
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 1;
        this.urtaLove(-0.5);
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        this.outx("", true);
        this.outx(
            "You give her a kiss to distract her and push the glass into her hand.\n\n",
            false
        );
        this.outx(
            '"<i>I think the waitress dropped this off while you were distracted,</i>" you say.\n\n',
            false
        );

        this.outx(
            'Urta snuggles you and tips it back, taking a huge swig.  She quickly pulls it back and gives you a confused look.  Dawning comprehension slowly spreads over her face before morphing into a sultry expression.  Never taking her eyes off you, the fox tips back the glass and gulps down the remaining fluid.  She grabs you by the neck and forcefully kisses you, forcing you to taste her pussy and jizz at the same time.  Breaking away, she teases, "<i>Good to the last drop.  Thanks again lover.</i>"\n\n',
            false
        );

        this.outx(
            "You smile knowingly and leave, intent on cleaning up a little back at camp.",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Drink Glass]
    private drinkUrtasCumGlass(): void {
        this.urtaSprite();
        this.player.slimeFeed();
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 2;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        // (+Bonus luv)
        this.urtaLove(1);
        this.outx("", true);
        this.outx(
            `You give her a good look at the full glass and tip it back, gulping down her thick goop, letting it run out of the corners of your mouth.  Urta looks on, dumbfounded while you guzzle her remaining seed from the cup.  You set it down and burp, leaning over to give her a wet kiss, letting her taste both her sexes on your tongue.  She breaks the kiss and says, "<i>Oh by Marae, I love you ${this.player.short}.  Thank you so much.</i>"\n\n`,
            false
        );
        this.outx(
            "You smile knowingly and leave, intent on cleaning up a little back at camp.",
            false
        );
        this.dynStats("sen", 1, "lus", 20);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Set Aside]
    private setAsideUrtaCumGlass(): void {
        this.urtaSprite();
        // (+Lots of Bonus Luv)
        this.urtaLove(2);

        this.outx("", true);
        this.outx(
            "You set aside the glass and cuddle with Urta, snuggling with your lover as the pair of you share a moment of peace.  The satisfied smile on Urta's face is all the thanks you need.  She breathlessly thanks you and kisses you over and over.  Eventually you do part from her, giving her a knowing wink as you head out the door and back to camp, intent on cleaning the girl-cum from your face and the spunk from your hair.\n\n",
            false
        );

        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Under Table BJ]
    public blowUrtaUnderTheTableLuv(): void {
        this.urtaSprite();
        this.player.slimeFeed();
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 2 + Urta.rand(3);
        this.urtaLove(1);
        this.outx("", true);
        this.outx(this.images.showImage("urta-bar-bj"), false);
        this.outx(
            "Urta smiles happily when you suggest climbing under the table.  She giggles, \"<i>I hope you'll be able to keep up with me</i>\", and fills a glass with straight whiskey while you crawl under the table, sipping happily.  You slip down under the table, pulling up her dress and releasing the mammoth trapped underneath it.  It snaps up immediately, bobbing before your face as it fills with Urta's booze-fueled lust.  It actually wiggles in time with the beating of her heart, bouncing up as it gets harder and harder, until it smacks your nose.\n\n",
            false
        );

        this.outx(
            "You hear the sound of her shot-glass slamming into the table with authority as she finishes her drink.  A bead of pre-cum bubbles out from Urta's urethra, signaling her readiness.  The horse-like penis gives off a salty scent, unique and not unpleasant.  Before you have a chance to change your mind, you lunge forward, opening your jaw as far as it will go and just barely taking her first few inches into your mouth.  The fox gasps out loud at the pleasure before she remembers to relax.  You can hear her pouring another drink, and in an effort to embarrass her, you begin sucking and licking around the edges of her flare, swallowing the surge of sweet-tasting pre-cum as it begins to fill your mouth.\n\n",
            false
        );

        this.outx(
            "Urta writhes in her seat, noisily spilling a little of her drink over the table.  You smile around the intruder in your mouth, gripping it with both hands and stroking it with tender caresses.  The gray fox slams down the bottle; though you can't tell for sure, you guess it's irritation with the difficulty she's having controlling her muscles.  She begins trying to sip at what she's managed to get into her glass.  It seems Urta intends to savor her drink and her blowjob at the same time, and you're not making it easy for her.\n\n",
            false
        );

        this.outx("Deciding you've got to get her off and make her spill her drink, you ");
        if (this.player.cor < 50)
            this.outx(
                "do your best to suppress your gag reflex and shove forwards, ramming her cock as deeply into your throat as you can.",
                false
            );
        else
            this.outx(
                "shove forwards, ramming her massive cock so far down your throat that you can feel it dribbling pre-cum into your belly.",
                false
            );
        this.outx(
            "  Urta grunts, doing her best to muffle the noise as it escapes her lips, but you can feel her twitch and thicken inside you, beginning to drip with proof of her complete and total submission to your mouth.\n\n",
            false
        );

        this.outx(
            "You can hear chuckles from the bar's other occupants as they realize what's going on, and you blush, ",
            false
        );
        if (this.player.cor < 50 && this.flags[kFLAGS.PC_FETISH] <= 0)
            this.outx(
                "wishing there was a tablecloth to hide your activities from prying eyes",
                false
            );
        else this.outx("wishing you had even more eyes watching your show");
        this.outx(
            ".  The distraction does little to divert you from your chosen task, and you close your eyes, tasting your lover's throbbing shaft as it fills your mouth.  With both hands stroking, you bob up and down, completely centering your world around the pulsating horse-prick as it fills your mouth.\n\n",
            false
        );

        this.outx(
            "Without warning, Urta's legs wrap around your back, squeezing with her soft fur as she vices them closed.  You're forced to take her even more deeply, until the folds of her sheath are bumping your nose and chin and filling your nostrils with her heady musk.  You can't even breathe with such a massive intruder blocking your throat, but you do your best to get her off, knowing it's the quickest way to end it.  You suck hard and squeeze her balls, gurgling noisily around the sweaty-shaft as you feel Urta give in.\n\n",
            false
        );

        this.outx(
            "A wave-like motion passes through your throat-obstruction, stretching you wider than ever before.  It passes, leaving behind a feeling of warm fullness.  You feel another working its way into your mouth, and realize Urta is cumming, filling your belly with direct injections of horsey fox-seed. You desperately need to breathe, but you're trapped on your lover's maleness, and with nothing else to do, you give her twitching balls a squeeze, feeling her body twitch in response as she dumps a particularly heavy batch of spunk into you.  Happy that you could at least control how hard she came, you begin blacking out, barely noticing as Urta's orgasmic contractions die off.\n\n",
            false
        );

        this.outx(
            "Thumping down on your back, you're blissfully aware of the sweet air filling your lungs.  In a moment of reflection, you realize you can taste the salty flavor of Urta's seed on your lips and mouth, and the retracting horse-cock is ",
            false
        );
        if (this.player.biggestTitSize() >= 1)
            this.outx(`dragging between your ${this.allBreastsDescript()}`);
        else this.outx("dragging across your chest");
        this.outx(
            ` as it begins to soften.  You wipe as much of her leavings from your ${this.player.face()} as you can, licking the slippery glaze from your lips.  Before you get up, you make sure to give Urta's member a firm squeeze, scolding it for its forceful treatment of your mouth.\n\n`,
            false
        );
        this.outx(
            "Once you've climbed out from under the table, you're VERY aware of the eyes of some of the nearby bar patron's on your back.  It seems your undercover act managed to draw more than a little attention.  Urta's cheeks burn bright-red under her gray fur, though she has a loving smile on her face.  The pair of you share a tender kiss to hoots and catcalls from the audience.  Urta smiles and gushes, \"<i>You give the BEST blowjobs... I mean, WOW, but maybe next time we should go back to my place and do something a little more... fulfilling for both of us.</i>\"",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        this.dynStats("lus", 15);
    }

    // [RIDE VAGINAL]
    private rideUrtasCoochLoveyDovey(): void {
        this.urtaSprite();
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 2 + Urta.rand(2);
        this.urtaLove(1);
        this.outx("", true);
        // (TOO SMALL)
        if (this.player.vaginalCapacity() < 40) {
            this.outx(
                "Urta smiles at first, but as you strip down and get ready her expression turns to one of care and worry.  She apologizes, \"<i>I'm sorry sweetheart, but I don't think you could take me like that without some serious pain.  Maybe after you've loosened up that cute little snatch with some sex-toys I could give it a go... by Marae I want this, but you aren't ready for my... my thing.</i>\"\n\n",
                false
            );
            this.doNext(this.urtaHomeLuvLuvinsMenu);
            return;
        }
        // (SHIT FITS)
        this.outx(this.images.showImage("urta-home-female-fuck"), false);
        this.outx(
            "Urta bursts into a wide smile at your suggestion and scooches over, making room for you on the bed.  ",
            false
        );
        if (this.player.cockTotal() > 0) {
            this.outx("She tosses you ");
            if (this.player.cockTotal() == 1) this.outx("a latex sheath");
            else this.outx("some latex sheaths");
            this.outx(
                ` to cover your ${this.multiCockDescriptLight()} with, explaining that she doesn't want to have to mop up afterward, and you grudgingly agree.  `
            );
        }
        this.outx(
            'You climb in next to her, snuggling under the blankets and stroking her shaft, feeling yourself grow more and more ready as you tease your vulpine lover.  Urta doesn\'t move beyond rolling her eyes back and squirming her hips into your hand, trying to enhance the sensation.  She whines, "<i>I thought you were going to fuck meee-</i>"\n\n',
            false
        );

        this.outx(
            `Her cries are muted as you launch yourself over her, brutalizing her eager lips with a ferocious kiss.  You roughly tongue-fuck her as you adjust yourself, balancing yourself with one hand while your other guides her trembling shaft closer and closer to the entrance of your ${this.vaginaDescript(
                0
            )}.  You sigh happily and rub the pre-filled bulb against your opening, `
        );
        if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_WET) this.outx("growing moist");
        else if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_DROOLING)
            this.outx("growing wetter and wetter as you lubricate the tip of her condom");
        else this.outx("soaking her condom-covered cock with your copious cunt-secretions");
        this.outx(
            ".  Urta's body goes limp under your sexual assault, totally caving in to the feelings you're stoking inside her.  The only thing she manages to keep up is the twisting of her hips as she tries to enhance the sensations radiating through her massive, flared prick.\n\n",
            false
        );

        this.outx(
            'You end the kiss by pulling back, sucking her lower lip into your mouth, and then releasing it with a pop.  Nearly crying with need, your horse-endowed lover begs, "<i>Ah, please don\'t stop!</i>"\n\n',
            false
        );

        this.outx(
            "Never one to disappoint, you press onwards and downwards, sliding deeper into the bed as you work the wide, flared tip against yourself.  It slowly stretches you wide and bows under your weight, though Urta doesn't voice a word of complaint or displeasure.  You swivel slightly to the side and it works its way inside you, one half of the tip sliding inside at a time.  The fox's mouth opens into an 'O' of pleasure, letting her tongue escape as she begins panting from the pleasure.\n\n",
            false
        );

        this.outx(
            "Sinking down slowly and relishing the feeling of your passage being spread, you allow a low moan to escape your mouth.  Urta's hands lock onto her breasts and begin alternatively squeezing her soft mounds and fondling the black skin of her nipples.  The sensation of slow penetration is exquisite, growing within you while ever thicker horse-cock spears your womb.  You can feel the beat of Urta's heart racing through the shaft, swelling it slightly in time with each heartbeat.\n\n",
            false
        );

        this.outx(
            `You bottom-out, but immediately begin rocking your hips, working your lover's twitching rod deep inside your ${this.vaginaDescript(
                0
            )}.  `
        );
        // (LOOSENESS MESSAGES GO HERE AS APPROPRIATE)
        this.player.cuntChange(60, true);
        this.outx(
            `Urta's hands grab you firmly by the ${this.assDescript()}, reminding you just how strong the lithe fox is.  She begins working with you to lift your body up and slam it back down against her, alternating the feelings of emptiness and fullness within you.  Each time the little balloon that's formed on her flare gets larger, squishing each time she bottoms out.  As the pair of you rut faster and faster, the limited space inside you squeezes the excess pre-cum from the sheath, causing it to drip over her balls into the sheets.\n\n`,
            false
        );

        this.outx(
            `Bending over, you plant another kiss full on her lips, and your vulpine lover just can't restrain herself anymore.  She moans into your mouth, her body shivering, her balls tightening up until you feel them press against your ass.  Her hands grip you hard and pull you down with incredible force, locking you against her as you feel her member swelling inside you, submitting to your ${this.vaginaDescript(
                0
            )}'s swelteringly hot embrace.  A burst of tightness fills you, growing as Urta squirms, unloading her massive horse-pole's seed into the latex balloon she's stuffed inside you.\n\n`,
            false
        );

        this.outx("The filling seed balloon stretches tight inside of you, ");
        if (this.player.vaginalCapacity() < 80)
            this.outx(
                "until there is no more room for cum and it's squirting out around the base of her cock, soaking Urta and the bed with fragrant horse-cum.",
                false
            );
        else this.outx("filling your body with a large bubble of hot horse-cum.");
        this.outx(
            "  Watching your lover submit to your body's pleasure, the sight pushes you over the deep edge with her, and your body begins milking the thick shaft inside you, clenching around it as you spasm happily.  ",
            false
        );
        if (this.player.cockTotal() > 0) {
            if (this.player.cockTotal() == 1) this.outx("Y");
            else this.outx("Each of y");
            this.outx(
                `our ${this.multiCockDescriptLight()} spurts, unloading waves of cream into the `
            );
            if (this.player.cockTotal() == 1) {
                this.outx("condom Urta asked you to wear around it.");
                if (this.player.cumQ() >= 250) {
                    if (this.player.cumQ() < 500)
                        this.outx(
                            "  The balloon inflates slightly, drooping down as your maleness empties its reserves.  ",
                            false
                        );
                    else if (this.player.cumQ() < 1000)
                        this.outx(
                            "  The balloon swells larger and larger as you pump it full, eventually wobbling around on Urta's belly as you finish filling it.",
                            false
                        );
                    else {
                        this.outx(
                            "  The balloon swells larger and larger as you pump it full, wobbling obscenely on Urta's belly and slowly drooping down onto the sheets as the sheath reaches its maximum capacity.",
                            false
                        );
                        if (this.player.cumQ() > 1500)
                            this.outx(
                                "  Your potent seed pops the condom, splattering Urta with your seed as it explosively fails.",
                                false
                            );
                    }
                }
            } else {
                this.outx("condoms Urta asked you to wear around them.");
                if (this.player.cumQ() >= 250) {
                    if (this.player.cumQ() < 500)
                        this.outx(
                            "  The balloons inflate slightly, drooping down as your malenesses empty their reserves.  ",
                            false
                        );
                    else if (this.player.cumQ() < 1000)
                        this.outx(
                            "  The balloons swell larger and larger as you pump them full, eventually wobbling around on Urta's belly as you finish filling them.",
                            false
                        );
                    else {
                        this.outx(
                            "  The balloons swell larger and larger as you pump them full, wobbling obscenely on Urta's belly and slowly drooping down onto the sheets as the sheaths reach their maximum capacity.",
                            false
                        );
                        if (this.player.cumQ() > 1500)
                            this.outx(
                                "  Your potent seed pops the condoms, splattering Urta with your seed as they explosively fail.",
                                false
                            );
                    }
                }
            }
        }
        this.outx("\n\n", false);

        this.outx(
            "Urta's eyes roll back in her head as her body goes nerveless, devoting all its energy to cumming as much as possible inside you.  You grab onto her breasts and do your best to hang on for dear life, riding out your orgasm and trying not to drool onto the insensate fox.  She pumps away, weakly finishing her earth-shattering orgasm, her eyes half-rolled up and heavily lidded.  You slump down on top of her and slowly recover, trembling as muscle spasms work their way through your body.\n\n",
            false
        );

        this.outx(
            "Once you've recovered, you pull back with a long, wet sluuuuurrrrpPOP, and Urta's massive cum balloon slips out from between your nether-lips, pulling the rest of her shaft down onto her and bursting like a thrown water-balloon.  The splash of cum over her body rouses Urta from her orgasm-induced stupor, and the sexy fox moans with equal parts contentment and annoyance as she comes back to reality.\n\n",
            false
        );

        this.outx(
            '"<i>Oooh, I\'m going to need to do laundry AGAIN!</i>" gripes Urta, lifting herself up to her elbows.  She continues, "<i>But I\'ll be damned if cumming inside you isn\'t worth washing all the sheets in the world.</i>"\n\n',
            false
        );

        this.outx(
            "Smiling, the two of you embrace, though you're careful not to get any of the cum on you.  Urta waves you out so she can get to cleaning, and by the time you leave you've got a spring in your step and a satisfied grin on your face.",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
        // if(flags[kFLAGS.URTA_FERTILE] == 1) player.knockUp(21,515,80);
        this.player.orgasm();
        if (this.player.sens > 30) this.dynStats("sen", -1);
    }

    // [RIDE ANAL]
    private rideUrtaInButtAtHomeLove(): void {
        this.urtaSprite();
        this.urtaLove(1);
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 2 + Urta.rand(2);
        this.outx("", true);
        this.outx(this.images.showImage("urta-home-anal-urta"), false);
        this.outx(
            "Urta raises an eyebrow at the suggestion and blushes, though her horse-like member thickens and stiffens noticeably.  You give it a gentle slap and tease, \"<i>Don't act like this isn't what you wanted!</i>\"\n\n",
            false
        );

        this.outx(
            'She squirms and smiles nervously, "<i>It feels too good, even though it\'s dirty!  Besides, your sweet ass is irresistible!</i>"\n\n',
            false
        );

        if (this.player.totalCocks() > 0) {
            this.outx("Even though you're going to be riding her, she insists you wear ");
            if (this.player.totalCocks() == 1) this.outx("a condom");
            else this.outx("some condoms");
            this.outx(
                " to help control the mess.  You grudgingly accept, girding your hardening shaft",
                false
            );
            if (this.player.totalCocks() > 1) this.outx("s");
            this.outx(" in tight latex.\n\n", false);
        }

        this.outx(
            `You climb on to the bed, but fur-covered hands grab hold of your ${this.hipDescript()} and yank you down until something round and wide is knocking on your backdoor.  You can feel the latex sheath bubbling up, starting to give Urta's dick a more rounded tip and she begins pressing it into your backdoor.  The unexpected attempts at insertion surprised you and have kept you too tightly-clenched for the fox to batter her way inside.  She begs, "<i>Please let me in!  I can't wait anymore!</i>"\n\n`,
            false
        );

        this.outx(
            "While giving her a knowing smile, you make a conscious attempt to relax your body's surprised rear-entrance.  Almost immediately you feel her slip inside, and then you're sliding down, sinking slowly towards your partner an inch at a time.  The expression on Urta's face is priceless – flitting between ecstasy and confusion as she struggles to deal with being engulfed by your ",
            false
        );
        if (this.player.analCapacity() < 60) this.outx("tight");
        else this.outx("welcoming");
        this.outx(
            ", warm hole.  A groan escapes your mouth as you sink down, feeling fuller and fuller until her real sheath is resting just between your ass-cheeks.",
            false
        );
        this.player.buttChange(60, true, true, false);
        if (this.player.totalCocks() > 0) {
            this.outx("  You can feel tiny dribbles force their way out of ");
            if (this.player.totalCocks() > 1) this.outx("each of ");
            this.outx("your urethra");
            if (this.player.totalCocks() > 1) this.outx("s");
            this.outx(" as your prostate is compressed.");
        }
        this.outx("\n\n", false);

        this.outx(
            `Urta recovers enough to meet your gaze and licks her lips hungrily.  Her hands release your ${this.hipDescript()} and rump, sliding up your sides and in towards your ${this.allBreastsDescript()}.  You shiver as she circles your ${this.nippleDescript(
                0
            )}, teasing the flesh around them while managing to avoid providing them with any stimulation.  She looks up at you expectantly with a patient look, as if waiting on something from you.\n\n`,
            false
        );

        this.outx(
            `You shift your hips and are rewarded by a caress over your left ${this.nippleDescript(
                0
            )}, but it stops almost immediately.  Catching on, you flex your ${this.player.legs()} and lift yourself up until her flare is the only thing connecting you before sliding back down the pulsating shaft, squeezing your muscles around it.  Urta's hands reward you by pinching and tugging on your ${this.nippleDescript(
                0
            )}s, `
        );
        if (this.player.hasFuckableNipples())
            this.outx("even slipping a finger inside their slippery depths, ");
        this.outx(
            "spreading pleasure through the sensitive pleasure-buds.  Eager for more, you begin bouncing atop your vulpine lover, riding her as deeply as possible in return for a treasure-trove of sensation and lust.\n\n",
            false
        );

        this.outx(
            "Locked together by desire, love, and one swollen cock, you rut with her for what seems like forever.  You lose count of how many times your lover moans and screams in pleasure, and your own gasps of surprised enjoyment are too numerous to tabulate.  Urta's fur slowly becomes matted with sweat, and the salty scent of lovemaking fills the air.",
            false
        );
        if (this.player.totalCocks() > 0) {
            if (this.player.totalCocks() > 1) this.outx("  Each of y");
            else this.outx("  Y");
            this.outx(
                `our ${this.multiCockDescriptLight()} has filled its sheath with a golfball sized globule of pre-cum, and you can feel your body clenching and squeezing, your `
            );
            if (this.player.balls > 0) this.outx("balls");
            else this.outx("prostate");
            this.outx(" aching to unload.");
        }
        if (this.player.hasVagina()) {
            this.outx(`  Neglected and unused, your ${this.vaginaDescript(0)} `);
            if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_DROOLING)
                this.outx("dampens");
            else this.outx("floods");
            this.outx(
                " the fox underneath you with moisture, puffy and aching for the slightest touch.",
                false
            );
        }
        this.outx("\n\n", false);

        this.outx(
            `The lovemaking increases in tempo, slowly working its way to a feverish crescendo.  You're bouncing atop the fox wildly, and your lover cums hard.  As full as you felt with her inside you, it's nothing compared to being stuffed with her cock AND cum.  Each cum-filled contraction swells her member from base to flare, allowing you to feel it stretch your insides while it travels up your ${this.assholeDescript()}.  It dumps the load into the bubble of cum inside you, filling you with a creamy jizz balloon.\n\n`,
            false
        );

        // (GENDERLESS ORGAZM)
        if (this.player.gender == 0) {
            this.outx(
                `You cry out with pleasure, feeling the closest thing you can to an orgasm.  Your muscles clench around the invading rod, milking it while the rest of your body trembles.  The strength drains from your ${this.player.legs()} and arms and you twitch there, completely impaled on your lover's thick cock, happily and completely penetrated.\n\n`,
                false
            );
        }
        // (EVERYBODY ELSE)
        else {
            this.outx(
                `You cry out with pleasure, feeling your body cum from the invading warmth in your ${this.assholeDescript()}.  Shivering as the strength drains from your arms and ${this.player.legs()}, you let the intruding and still cumming cock support your body.`
            );
            if (this.player.hasVagina()) {
                this.outx(
                    `  Your ${this.vaginaDescript(
                        0
                    )} clenches desperately, peaking without a single touch, but hungry for something to milk.`
                );
                if (
                    this.player.vaginas[0].vaginalWetness > VAGINA_WETNESS_WET &&
                    this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_SLAVERING
                )
                    this.outx(
                        "  Fluids soak Urta's crotch with lust with feminine drool, though the fox barely seems to notice.",
                        false
                    );
                else if (this.player.vaginas[0].vaginalWetness == VAGINA_WETNESS_SLAVERING)
                    this.outx(
                        "  An explosion of feminine fluids spatters Urta's crotch and bed, completely soaking her groin in your need, but the distracted fox barely notices.",
                        false
                    );
            }
            if (this.player.totalCocks() > 0) {
                this.outx(
                    "  The warmth spreads deep inside you, firing off a series of contractions just inside your groin.  You can feel yourself about to cum, and look down just in time to see yourself squirting against your condom, deforming it from the pressure of the orgasm and slowly inflating it further.",
                    false
                );
                if (this.player.cumQ() >= 750 && this.player.cumQ() < 1250)
                    this.outx(
                        "  By the time you're done the balloon is the size of a basketball and looking dangerously close to bursting.",
                        false
                    );
                else if (this.player.cumQ() >= 1250) {
                    this.outx(
                        "  By the time you're done, the balloon is the size of a watermelon and wobbling dangerously, looking like it could fail at any time!",
                        false
                    );
                    if (this.player.cumQ() >= 1700)
                        this.outx(
                            `  You fill it fuller and fuller, until it's bigger than you thought possible.  All at once the material gives out, soaking Urta from the tits down in cum, while your ${this.cockDescript(
                                0
                            )} continues to pump even more onto her.  So much for not making a mess!`
                        );
                }
            }
            this.outx("\n\n", false);
        }
        // (+10 fatigue!)
        this.fatigue(10);
        this.outx(
            "Exhausted, you drag yourself up, slowly feeling Urta and her sloshing deposit sliding out of you.  Her cock and its spooge and latex shrouded tip flops out with a loud 'schhhlurp', plopping down onto her.  The fox is completely insensate, and at a glance even her balls have shrunk from unloading so much thick cream.  You lean down and give Urta a quick kiss on her lips and a gentle squeeze on her nipple before you rise.\n\n",
            false
        );

        this.outx(
            'She comes out of her stupor and murmurs, "<i>Mmmm, that was nice,</i>" as she stretches.  With practiced motions she slides off her condom, ties it off, and tosses it into a waste-can half filled with the things.  ',
            false
        );
        if (this.player.cumQ() >= 1700)
            this.outx(
                'Urta sighs at the mess and laughs, "<i>I guess we got a mess anyways, huh?</i>"',
                false
            );
        else
            this.outx(
                'Urta sighs contentedly and laughs, "<i>I guess I don\'t have much of a mess to clean for once!</i>"',
                false
            );

        this.outx(
            '\n\nThe fox staggers up on weak legs, her now flaccid but still huge member swinging between her knees as she redresses.  You do the same, and the two of you part with another tender kiss and a whispered, "<i>I love you.</i>"\n',
            false
        );
        this.player.orgasm();
        this.dynStats("sen", 1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [69]
    private oralFiestyUberExplosionUrta(): void {
        this.urtaSprite();
        this.urtaLove(1.5);
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 2 + Urta.rand(2);
        this.outx("", true);
        let x: number = this.player.cockThatFits(100);
        if (x < 0) x = 0;
        // (TOO BIG)
        if (this.player.cockArea(x) >= 100) {
            this.outx(
                `Urta takes one look at your ${this.cockDescript(
                    x
                )} and says, "<i>I'm sorry babe, but there's no way I could take that monster in my mouth.  How about we do something else?</i>"\n\n`,
                false
            );
            this.doNext(this.urtaHomeLuvLuvinsMenu);
            return;
        }
        this.outx(this.images.showImage("urta-home-69", "vert"), false);
        if (this.player.gender == 2 || (this.player.gender == 3 && Urta.rand(2) == 0)) {
            this.outx(
                'You smile and let Urta know you want to sixty-nine her.  She raises an eyebrow and teases, "<i>I hope you don\'t mind having a full belly and a sore throat!</i>" as you disrobe and climb atop her.  You turn about, straddling your legs across her face and exposing the hungry lips of your sex.  Smirking over your shoulder, you snatch her discarded dress from the floor and tie the shimmering fabric into an impromptu cock-ring.  The gray fox shudders with excitement and you watch, enraptured, as her mottled horse-cock grows larger and larger, even flaring wide at the tip.\n\n',
                false
            );

            this.outx(
                `The musky scent of Urta's forearm-sized horse-prick wafts into your nostrils as it wobbles just below your ${this.player.face()}, visibly twitching and throbbing from all the extra blood.  She whines plaintively, nuzzling her moist nose against your `
            );
            if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_DROOLING)
                this.outx("equally wet");
            else this.outx("sopping wet");
            this.outx(
                " cunt.  Shivering from the air on your bare skin and the unexpected touches on your nethers, you open wide, extend your tongue, and give Urta's flare a long, slow lick.  You pause at her urethra, slip ever-so-slightly inside, and then pull out as you slather the flare in spit.\n\n",
                false
            );

            this.outx(
                `Urta eagerly gets to work, stabbing her tongue through your folds and into your ${this.vaginaDescript(
                    0
                )}.  Her efforts bring her muzzle flush against you as she pauses to slurp your pussy-juices over your ${this.clitDescript()}.  Her lips feel like liquid heat as they wrap around the incredibly sensitive bud, suckling it gently in between excursions into your passage.  Urta's slender fingers grab hold of your ${this.buttDescript()} to support her as she tongue-fucks your ${this.vaginaDescript(
                    0
                )} with abandon.\n\n`,
                false
            );

            this.outx(
                "You do your best to stifle your moans with the fox's bloated horse-sausage, opening as wide as possible to encompass the flared head while avoiding your teeth.  It fills your mouth completely, and you marvel at just how much of her shaft is left to take.  A dollop of sweet cream rolls onto your tongue as you lick and slurp along her length.  Her skin tastes clean save for a hint of salt from the day's sweat.  You gurgle and ",
                false
            );
            if (this.player.cor > 50) {
                this.outx(
                    "push forwards, feeling her shaft arch as it slides into your throat.  The medial ring slips past your lips and you can feel your throat bulging as you mouth-fuck the swollen horse-cock deep into your gut.  Warmth drips into your belly as the hermaphroditic fox's member closes on its sexual peak.\n\n",
                    false
                );
            } else
                this.outx(
                    "grab hold of her cock and begin jerking her off into your mouth.  An immediate and copious gush of pre drips onto your tongue, showing you just how much the hermaphroditic fox loves the feeling.\n\n",
                    false
                );

            this.outx(
                `Not far from cumming yourself, you grind your ${this.hipDescript()} on Urta's face, smearing her fur with your fragrant pussy-juices.  Her own moans of pleasure turn into noisy wet blubbering that vibrates through your ${this.vaginaDescript(
                    0
                )}, getting you off on the spot.  You squeal around the cock in your `
            );
            if (this.player.cor <= 50) this.outx("mouth");
            else this.outx("throat");
            this.outx(`, clamping your ${this.player.legs()} onto Urta's head as you orgasm.  `);
            if (this.player.vaginas[0].vaginalWetness > VAGINA_WETNESS_DROOLING)
                this.outx(
                    "Fluids rush from your folds, splattering her face with sex fluid.  The fox opens wide, gulping it down like someone in a desert who has just found an oasis.",
                    false
                );
            else
                this.outx(
                    `Wetness slowly coats her muzzle as your canal squeezes and wriggles with involuntary pleasure-spasms.  Urta never lets up, sucking and licking your ${this.clitDescript()} in a rhythm that matches your own orgasmic contractions.`
                );
            if (this.player.totalCocks() > 0) {
                this.outx("  ");
                if (this.player.cockTotal() > 1) this.outx("Each of y");
                else this.outx("Y");
                this.outx(`our ${this.multiCockDescriptLight()} drools lamely, `);
                if (this.player.cumQ() < 50) this.outx("sputtering spunk onto Urta's neck.");
                else if (this.player.cumQ() < 250)
                    this.outx("soaking Urta's neck and chest with your spooge.");
                else if (this.player.cumQ() < 700)
                    this.outx(
                        "showering Urta's neck and body with spooge until her breasts are painted white and the bed has a small puddle soaking into it.",
                        false
                    );
                else if (this.player.cumQ() < 1500)
                    this.outx(
                        "soaking Urta with a torrent of seed that drenches her from the neck down and totally soaks the bed.",
                        false
                    );
                else {
                    this.outx(
                        "soaking Urta with a torrent of seed that drenches her body and floods the bed, drips onto the floor, and slowly spreads into a puddle.",
                        false
                    );
                    if (this.player.cumQ() > 10000)
                        this.outx(
                            "  The puddle thickens as you cum until it's nearly a foot deep.",
                            false
                        );
                }
            }
            this.outx("\n\n", false);

            this.outx(
                "Too drunk with pleasure to register the telltale thickening of Urta's cock, you keep licking and sucking while you cum, drinking a steady stream of pre-cum.  Suddenly, your improvised cock-ring snaps and the straps fail from the massive pressure.  A torrent of jism ",
                false
            );
            if (this.player.cor > 50)
                this.outx(
                    "pours down your throat, bulging it into an obscene imprint of the horse-cock that's lodged inside.  Your eyes cross from pleasure and you slump down a bit, shoving your nose into Urta's sheath and allowing her to dump her sperm directly into your belly.  Gurgling noisily, your belly slowly expands outwards by about two inches, making you feel bloated and full.",
                    false
                );
            else
                this.outx(
                    `erupts into your mouth, instantly filling it with thick fox-cream.  You convulsively swallow in an attempt to keep up with it, but are quickly overwhelmed by the backed up semen-flood.  It drips from your mouth and forces open your throat, flowing directly into your belly.  Some even begins dripping out from your nose as you sway with a mixture of discomfort and pleasure atop your partner.  A few trembling squirts later you feel and look a little bloated, and your ${this.player.face()} is thoroughly covered in foxy-horse-jizz.`
                );
            this.outx("\n\n", false);

            this.outx(
                'Both of you sputter for breath as you roll off of Urta.  She gasps and looks over at you with a smile, licking her sperm from your face and nuzzling her pussy-soaked muzzle against your cheek.  She pants, "<i>I suppose I should be mad at you for ruining the dress, but you got me off so hard that I think I gave you a few meals worth of my... um... cum.</i>"\n\n',
                false
            );

            this.outx(
                `The fox giggles and returns to cuddling and licking you.  You rest with a happy smile plastered on your ${this.player.face()} from the experience.  After all the snuggling, you both rise and get dressed.  Urta finds a new dress in the closet and with a long goodbye kiss, you go your separate ways.\n\n`,
                false
            );
            this.doNext(this.camp.returnToCampUseOneHour);
            this.player.orgasm();
            this.dynStats("sen", -1);
            return;
        }
        // (DUDEZILLAZ)
        this.outx(
            `Urta sits up and practically screams, "<i>Really,</i>" and squeals excitedly.  She claps and lies back as you climb into the bed, stopping only to yank off her cock-sheath and toss it into a nearby waste-bin.  You swing your ${this.player.legs()} over her and get into position, aligning `
        );
        if (this.player.balls > 0) {
            this.outx(`your ${this.ballsDescriptLight()} and `);
        }
        if (this.player.totalCocks() > 1) this.outx("one of your ");
        else this.outx("your ");
        this.outx(
            `${this.multiCockDescriptLight()} with Urta's muzzle.  Her rather sizable 'addition' wobbles underneath you, blocking your vision as it wobbles back and forth under you.\n\n`,
            false
        );

        this.outx(
            "Your foxy lover opens wide and slips her smooth, wide tongue all over your ",
            false
        );
        if (this.player.balls > 0)
            this.outx(
                `${this.ballsDescript()}.  Slithering over and around them, she bathes your sack in her spit before moving up to your ${this.cockDescript(
                    x
                )}.`
            );
        else this.outx(`${this.cockDescript(x)}.`);
        this.outx(
            "  Her tongue curves and slurps at your shaft, swelteringly warm, wet, and tantalizingly slippery.  She tastes you from ",
            false
        );
        if (this.player.hasSheath()) this.outx("sheath");
        else this.outx("base");
        this.outx(
            ` to ${this.player.cockHead(
                x
            )}, stopping to suckle the sensitive end briefly before breaking away for another long lick along the underside.  Her hands stroke along the sensitive ${
                this.player.skinDesc
            } of your inner thighs, making your hips shiver and nearly pulling your ${this.cockDescript(
                x
            )} away from your lover's hungry mouth.\n\n`,
            false
        );

        this.outx(
            "Whilst the fox is busy with your genitals, you begin to perform your duty, reciprocating the pleasure in turn.  You stretch your mouth wide, opening as far as you can to accommodate the mammoth beast before you.  It's difficult, but you manage to stretch wide enough to take her flare in your mouth.  It tastes vaguely salty like sweat, and in Urta's excited state it's easy to feel her flare widen and retract with each beat of her heart.  A dollop of pre-cum deposits itself on your tongue as the horny fox's nymphomaniac body reacts to you.  It tastes sweet, and you swallow as you work her deeper into your oral cavity.\n\n",
            false
        );

        this.outx(
            `Muffled, excited moans reach your ears as you work on your lover's pole.  The fox is clearly enjoying herself, and her sounds of pleasure cut off as she rams your ${this.cockDescript(
                x
            )} deep into her throat.  She gurgles noisily while her tongue slides as far down your shaft as possible, licking at your `
        );
        if (this.player.balls > 0) this.outx(this.ballsDescriptLight(), false);
        else if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
        else this.outx("taint");
        this.outx(
            ` while her spittle froths around her lips.  She manages to start humming deep within her throat, vibrating your ${this.cockDescript(
                x
            )}.  The obstruction in your mouth stifles your moan, but Urta hears the startled gurgle and slides away, then plunges back down, humming the entire time in between gasps for air.\n\n`,
            false
        );

        this.outx(
            "Not to be outdone, you pull back for a quick gasp of air before ramming her back inside your mouth.  You push forwards, taking her to the back of your throat",
            false
        );
        if (this.player.cor < 60)
            this.outx(
                " until your gag reflex forces you back.  Not being able to deep-throat her, you shift your weight onto your right arm and grab her just below her medial ring with your left.  You start vigorously jacking her off, running your tongue around her flare and over her sensitive tip, even darting it into her urethra to get at her sweet-tasting pre-cum.",
                false
            );
        else
            this.outx(
                ".  You easily suppress your gag reflex and push forwards, feeling her cock arch slightly in the back of your mouth as it curves into your throat.  You extend your tongue as far past your lips as you can, licking down the shaft as you cram her further and further into your gullet.  Though you can't taste it, you can feel her urethra sending slow pulses of pre-cum inside of you, depositing it directly into your belly as you stuff your nose into her balls and tongue the skin around her sheath.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            "If someone walked in on the both of you now they'd see a breathless fox and you, each with the other's cock rammed into their face.  They'd see each of you blushing bright and trembling, on the verge of orgasm and barely holding on as the other does their best to bring about an orgasm.  Wet slurps and panicked gasps fill the air while bodies twist and squirm together on the fur-covered bed.\n\n",
            false
        );

        this.outx(
            "You cum first, a victim of Urta's talented tongue and humming technique.  You'd cry out with pleasure were you not so thoroughly stuffed, and the fox slams her face into your groin after the first blast, pushing you into her throat and noisily beginning to gulp down your spooge.  ",
            false
        );
        if (this.player.cumQ() >= 500) {
            this.outx(
                "She gurgles as she struggles to keep up with the flow, actually letting a bubbly white froth start to leak down the sides of her mouth.  ",
                false
            );
            if (this.player.cumQ() >= 1000)
                this.outx(
                    "It begins dripping from her nostrils as your explosive load overwhelms her ability to swallow spunk.  ",
                    false
                );
        }
        if (this.player.cumQ() >= 750 && this.player.cumQ() < 1500)
            this.outx(
                "Her belly rounds out a little from all the cum as your orgasm begins to wind down.  ",
                false
            );
        if (this.player.cumQ() >= 1500)
            this.outx(
                "Her belly rounds out a little before she pulls back and you spurt all over her, soaking her face and head with more spooge than she could ever handle.  ",
                false
            );
        this.outx(
            "Sated, you sigh, though Urta pushes back onto you and intently licks every ounce of jism from your body.\n\n",
            false
        );

        this.outx(
            "With only a few moments to recover from your own orgasm, you feel the fox stiffening, her apple-sized balls pulling up tightly against her body as she starts to orgasm.  A cock-bulging load of thick fox-cream forces your mouth wider before exploding ",
            false
        );
        if (this.player.cor < 60)
            this.outx(
                "in your mouth, forcing you to compulsively swallow if you don't want to drown in it.",
                false
            );
        else this.outx("down your throat, directly injecting it into your belly.");
        this.outx(
            "  More and more of the salty cream is forced into you, leaving you feeling full and bloated, with a salty aftertaste in your mouth.  The fox-girl's horse-cock does eventually stop cumming, though rather than stopping all at once it slows to a trickle over the course of a minute or two, and you slurp it down until it softens in your mouth.\n\n",
            false
        );

        this.outx(
            "You climb off of her, panting and breathless as you flop into the bed next to her.  She snuggles up to you, cuddling you and kissing you on the lips and giving you a taste of your own lust.  Sinking into the soft bed, you relax with her for quite some time.  Eventually you've both recovered, and Urta playfully shoves you out of bed and onto the floor.  She springs out after you, her maleness still semi-erect as she gets dressed in her work uniform.\n\n",
            false
        );

        this.outx(
            "Urta blows you another kiss and says, \"<i>Gotta go!  Be good, and don't do anyone I wouldn't, OK?  Love you!</i>\"",
            false
        );
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    public urtaHomeLuvLuvinsMenu(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            'She caresses a nipple and visibly shivers as she says, "<i>You teased me the whole way here, and I\'m COMPLETELY ready for you, any way you could want.</i>"\n\n',
            false
        );
        this.outx(
            'She blushes and continues, "<i>So, what\'ll it be, lover?  A little injection of fox-cream or something else?</i>"',
            false
        );
        // [Ride Vaginal] [Ride Anal] [69]
        /* if(player.gender == 3) simpleChoices("Ride Vag",rideUrtasCoochLoveyDovey,"Ride Anal",rideUrtaInButtAtHomeLove,"69",oralFiestyUberExplosionUrta,"Vag Fuck",urtasCoochiNeedsFuckedLove,"No Condoms",condomlessUrtaInHouseSmex);
        if(player.gender == 2) simpleChoices("Ride Vag",rideUrtasCoochLoveyDovey,"Ride Anal",rideUrtaInButtAtHomeLove,"69",0,"No Condoms",condomlessUrtaInHouseSmex,"",0);
        if(player.gender == 1) simpleChoices("Ride Vag",0,"Ride Anal",rideUrtaInButtAtHomeLove,"69",oralFiestyUberExplosionUrta,"Vag Fuck",urtasCoochiNeedsFuckedLove,"No Condoms",condomlessUrtaInHouseSmex);
        if(player.gender == 0) simpleChoices("Ride Vag",0,"Ride Anal",rideUrtaInButtAtHomeLove,"69",0,"",0,"",0);*/
        this.outx("\n\nHow do you want to fuck with the vixen?");
        this.menu();
        if (this.player.hasVagina()) {
            this.outx("  She could ride your vagina.");
            this.addButton(0, "Ride Vag", this.rideUrtasCoochLoveyDovey);
        }
        this.outx("  She could fuck your ass.");
        this.addButton(1, "Ride Ass", this.rideUrtaInButtAtHomeLove);
        if (this.player.hasCock()) {
            this.outx(
                "  Urta could 69 with you, let you fuck her pussy, or you could even fuck her cunt full of jizz and then lick her to a second cum."
            );
            this.addButton(2, "69", this.oralFiestyUberExplosionUrta);
            this.addButton(3, "Vag Fuck", this.urtasCoochiNeedsFuckedLove);
            this.addButton(5, "FuckAndLick", this.lickOutUrtaAtHome);
        }
        if (this.player.gender > 0) {
            this.outx(
                "  There's always the option to ask her to go condomless for a bit of extra fun."
            );
            this.addButton(4, "No Condoms", this.condomlessUrtaInHouseSmex);
        }
        if (this.player.isGoo() && this.player.skinType == SKIN_TYPE_GOO)
            this.addButton(6, "Goo (Weird)", this.urtaGooTesticleVoreRuinedOrgasms);
        if (this.flags[kFLAGS.URTA_PETPLAY_DONE] >= 0 && this.player.gender > 0)
            this.addButton(
                7,
                "Collar",
                this.urtaPetPlayDeletedForeverBecauseThirdProovedMeWrongAboutDice
            );
    }

    private urtasCoochiNeedsFuckedLove(): void {
        this.urtaSprite();
        this.urtaLove(1.5);
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 2 + Urta.rand(2);
        let x: number = this.player.cockThatFits(this.urtaCapacity());
        if (x < 0) x = 0;
        this.outx("", true);
        this.outx(this.images.showImage("urta-fills-her-condom"), false);
        this.outx(
            'Urta gives you a knowing look as she spreads her legs and lifts her bulging sack to expose the glistening black lips of her sex.  She asks with a sultry expression, "<i>Is that what you need, lover, a slick, wet cock-sleeve to sheath yourself in?</i>"\n\n',
            false
        );

        this.outx(
            `You nod eagerly and advance, dropping your ${this.player.armorName} by the wayside as you jump into bed.  She reaches around her male endowments, stroking along her lips to her puffy black clit.  Urta shivers in pleasure, spreading her legs as far as she possibly can, watching you with a hungry look as she licks her lips.  A few long strands of cunny-juice leak from her waiting hole onto the bed, practically begging you to slide inside and feel her nether-lips' velvet embrace.  You sidle up to your lover, pressing your `
        );
        if (this.player.cockTotal() > 1) this.outx("main ");
        this.outx(
            `${this.multiCockDescriptLight()} at the moist opening, shivering at the warmth and desire as it wets your tip`
        );
        if (this.player.cockTotal() > 1) this.outx("s");
        this.outx(".\n\n", false);

        if (this.player.cockArea(x) > this.urtaCapacity()) {
            this.outx(
                `Urta whines a little as you press forward and scooches backwards, "<i>I'm sorry ${this.player.mf(
                    "stud",
                    "baby"
                )}, you're just too big for my poor little pussy to take.  Maybe we could do something else?</i>"\n\n`,
                false
            );
            this.doNext(this.urtaHomeLuvLuvinsMenu);
            return;
        }
        this.outx(this.images.showImage("urta-home-male-fuck"), false);
        this.outx(
            `You push forwards, slowly sliding into the moist tunnel, feeling its warmth covering every inch of your ${this.cockDescript(
                x
            )}. It caresses and squeezes you, surrounding you in perfect pleasure.  Urta stretches out languidly, her engorged horse-cock flopping down between her sizable breasts as it reaches a twitching, trembling hardness.  You bottom out, feeling the `
        );
        if (this.player.hasSheath())
            this.outx("sensitive skin of your sheath rubbing her exterior pussy-lips");
        else this.outx("wetness of her pussy rubbing against your groin");
        this.outx(
            ". Urta moans, \"<i>By Marae, you make my cunt feel good, lover.  I'm getting so wet... fuuuck, I'm going to need to change my furs and sheets again.</i>\"\n\n",
            false
        );

        this.outx(
            `Unthinking, your ${this.hipDescript()} begin to rock back and forth, sawing in and out of the fox's exotic pussy.  She wriggles and moans happily, losing her grip on her weighty balls and letting them slide over the top-side of your pussy-slicked ${Appearance.cockNoun(
                CockTypesEnum.HUMAN
            )} with each movement.  You ignore it, increasing the tempo and watching as your lover's jiggling breasts shift and bounce around her flared penis, eliciting uncontrolled gasps of pleasure and causing pre to form a bubble at the tip of her latex cock-sheath.  Every thrust is met by a visible bulging of Urta's urethra and an increase in the size of the balloon hanging from her dick's flare.\n\n`,
            false
        );

        this.outx(
            "Wet sounding 'schliiiicks' and noisy slaps fill the air as the sex takes on a violent, furious pace.  You slam yourself into the fox's hole, marveling at how nicely it accommodates and squeezes you.  The walls clench down on you from time to time, usually accompanied by a lewd moan as Urta's muscles involuntarily contract with pleasure.  She grabs her tits with both hands and squeezes them around her shaft, tit-fucking herself in perfect rhythm with your brutal thrusts.  Urta's condom starts filling faster – it's nearly the size of an apple now – and she's openly moaning and panting, on the verge of orgasm.\n\n",
            false
        );

        this.outx(
            `Your ${this.cockDescript(
                0
            )} is on the verge as well, ready to blow after fucking the dirty fox-girl so hard.  She cums first, shrieking in pleasure and throwing back her head, her hands clamping her jiggling breasts tightly around the rippling flesh of her massive horse-member as it begins unloading.  The surface of Urta's condom distorts as she fires a massive jet of her stuff into it, nearly doubling the size of the balloon.  Her hips wriggle and her pussy contracts around you, rippling along your length as the lusty fox's girl-cum squirts over your `
        );
        if (this.player.hasSheath()) this.outx("sheath");
        else if (this.player.balls > 0) this.outx("balls");
        else this.outx("crotch");
        this.outx(
            ".  You grab her ass and slam in a final time, reaching your own peak.\n\n",
            false
        );

        // [DAWG]
        if (this.player.hasKnot(x)) {
            this.outx(
                "Your knot flares wide, locking itself inside her convulsing cunt as your seed begins pumping into her womb.  Urta cries, \"<i>oooooooOOOOHHhhh YESSSS... You've plugged my cunt with your doggie dick!  It's squirting and pumping into my wooooomb...</i>\"\n\n",
                false
            );

            this.outx(
                `You rock back and forth, unable to pull out yet stimulating the sensitive bulb of your knot.  Your ${this.cockDescript(
                    x
                )} dumps its gooey cargo directly into your lover's stopped-up sex with barely audible squishing noises.  `
            );
            if (this.player.cumQ() < 250) {
            } else if (this.player.cumQ() < 700)
                this.outx(
                    "Her belly puffs up slightly by the time you finish, thanks to your body's copious cum production.  ",
                    false
                );
            else if (this.player.cumQ() < 1000)
                this.outx(
                    `Her belly swells larger and larger as you continue to pump your seemingly endless seed into her.  Urta groans, looking a few months pregnant by the time your overproductive ${Appearance.cockNoun(
                        CockTypesEnum.HUMAN
                    )} stops spewing inside her.  `
                );
            else {
                this.outx(
                    "Her belly swells larger and larger, bloating as you blast thick torrents of seed inside her, filling her completely thanks to the obstruction of your knot.  ",
                    false
                );
                if (this.player.cumQ() < 3000)
                    this.outx(
                        "By the time you finish, she looks VERY pregnant and is moaning with a mixture of pleasure and discomfort.  ",
                        false
                    );
                else {
                    this.outx(
                        "Your seemingly never-ending orgasm pumps her up until she looks on the verge of giving birth, and you just keep going.  The pressure builds and Urta moans in discomfort and pleasure.  Eventually the pressure is too much, and your cum begins spraying out around your knot, soaking the pair of you as you both continue to cum hard.  ",
                        false
                    );
                    if (this.player.cumQ() > 5000)
                        this.outx(
                            `Not content with such an easy release, your ${this.cockDescript(
                                x
                            )} unloads the last of its cream until the bed and floor are both covered under inches of your canine cum.  `
                        );
                }
            }
            this.outx(
                `You finally feel your ${Appearance.cockNoun(
                    CockTypesEnum.HUMAN
                )}'s knot shrinking and pull free with a loud and messy pop.  `
            );
            if (this.player.cumQ() >= 2000)
                this.outx("Spunk rushes out in a torrent, splattering everywhere.  ");
            this.outx(
                "Urta's glazed pussy-lips clench reflexively at their sudden emptiness and you hear a very satisfied sigh from the far end of the bed.\n\n",
                false
            );
        }
        // [HORSE]
        else if (this.player.cocks[x].cockType == CockTypesEnum.HORSE) {
            this.outx("You feel your flare filling with blood as it ");
            if (this.player.cocks[x].cockLength >= 10) this.outx("prods against Urta's cervix.");
            else this.outx("seats itself deep inside Urta's passage.");
            this.outx(
                '  Your crotch muscles clench in an unconscious rhythm as orgasm wracks your body.  You begin spurting hard inside her, splattering it into her cervix, even allowing it to flow into her womb.  Urta cries, "<i>ooooOOOHHHH YESSS... is this what you feel when I cum inside you?  YesYESYES- Ohhh I can feel the flare stroking and flexing inside me...</i>"\n\n',
                false
            );

            this.outx(
                "You rock back forth, unable to resist dragging the sensitive, flared tip and textured ring of your cock all along her pussy-walls, squirting seed with reckless abandon into her hot, cum-slicked cunt.  Wet squishing noises fill the apartment as the two of you rock the bed in twinned orgasms.  ",
                false
            );
            if (this.player.cumQ() < 250) {
            } else if (this.player.cumQ() < 700)
                this.outx(
                    "Her belly slowly rises as more and more cum slides into her womb, filling it.  Runners of the stuff leak down her thighs as it escapes around your bestial cock.  ",
                    false
                );
            else if (this.player.cumQ() < 1000)
                this.outx(
                    `Her belly swells larger and larger as you continue to pump your seemingly endless seed into her.  Urta groans, looking a few months pregnant by the time your over-productive ${Appearance.cockNoun(
                        CockTypesEnum.HUMAN
                    )} has finished spewing your seed inside her.  `
                );
            else {
                this.outx(
                    "Her belly swells larger and larger, bloating out as you blast thick torrents of seed inside her, stuffing her completely.  Every squirt of the stuff is met with a leaking back-blast that soaks her thighs and bed in your jism.  ",
                    false
                );
                if (this.player.cumQ() < 3000)
                    this.outx(
                        "By the time you've finished, she looks heavily pregnant and cum soaks the bed.  ",
                        false
                    );
                else
                    this.outx(
                        "Your seemingly endless orgasm pumps more and more into her until she looks ready to give birth, and  you just keep going.  She moans in pleasure and discomfort as each blast of your horse-cum forces thick runners to squirt from between her thighs.  ",
                        false
                    );
                if (this.player.cumQ() > 5000)
                    this.outx(
                        `Not content with such an easy release, your ${this.cockDescript(
                            x
                        )} unloads the last of its cream until the bed and floor are covered in several inches of thick equine cum.  `
                    );
            }
            this.outx(
                "You finally feel your flare returning to normal and pull out with a prolonged 'sluuuuurp'.  ",
                false
            );
            if (this.player.cumQ() >= 2000)
                this.outx("Spunk rushes out in a torrent, splattering everywhere.  ");
            this.outx(
                "Urta's glazed pussy-lips clench reflexively at their sudden emptiness and you hear a very satisfied sigh from the far end of the bed.\n\n",
                false
            );
        }
        // [Everybody Else]
        else {
            this.outx(
                `Your ${this.cockDescript(
                    0
                )} clenches, filling her convulsing cunt as your seed begins pumping into her womb.  Urta cries, "<i>oooooooOOOOHHhhh YESSSS... It's so warm and wet.  Yes, lover!  Keep goo-oh-OH-innnngg!!</i>"\n\n`,
                false
            );

            this.outx(
                `You rock back and forth, sliding your shaft through her spasming muscles, reveling and panting in orgiastic bliss.  Your ${this.cockDescript(
                    0
                )} dumps its gooey cargo deep into your lover's canal with barely audible squishing noises.  `
            );
            if (this.player.cumQ() < 250) {
            } else if (this.player.cumQ() < 700)
                this.outx(
                    "Her belly puffs up slightly by the time you finish, thanks to your body's copious cum production.  ",
                    false
                );
            else if (this.player.cumQ() < 1000)
                this.outx(
                    `Her belly swells larger and larger as you continue to pump your seemingly endless seed into her.  Urta groans, looking a few months pregnant by the time your overproductive ${Appearance.cockNoun(
                        CockTypesEnum.HUMAN
                    )} stops spewing inside her.  `
                );
            else {
                this.outx(
                    `Her belly swells larger and larger, bloating as you blast thick torrents of seed inside her, filling her completely while leftover jism squirts out around your ${this.cockDescript(
                        0
                    )}.  `
                );
                if (this.player.cumQ() < 3000)
                    this.outx(
                        "By the time you finish, she looks VERY pregnant and is moaning with a mixture of pleasure and discomfort.  ",
                        false
                    );
                else
                    this.outx(
                        "Your seemingly never-ending orgasm pumps her up until she looks on the verge of giving birth, and you just keep going.  Jism sprays out from her dripping cunt as you release a torrent of semen, splattering you, her, and the bed.  ",
                        false
                    );
                if (this.player.cumQ() > 5000)
                    this.outx(
                        `Not content with such an easy release, your ${this.cockDescript(
                            0
                        )} unloads the last of its cream until the bed and floor are both covered under inches of your gooey cum.  `
                    );
            }
            this.outx(
                `You finally feel your ${Appearance.cockNoun(
                    CockTypesEnum.HUMAN
                )} deflating, and you pull free with a messy slurp.  `
            );
            if (this.player.cumQ() >= 2000)
                this.outx("Spunk rushes out in a torrent, splattering everywhere.  ");
            this.outx(
                "Urta's glazed pussy-lips clench reflexively at their sudden emptiness and you hear a very satisfied sigh from the far end of the bed.\n\n",
                false
            );
        }
        // [RESUME]
        this.outx(
            `Urta calms down at last, though her member is still throbbing weakly as she peels her condom off.  The bloated cum-bubble at the tip is the size of a basketball, and she struggles to get it tied off and disposed of.  The fox tosses it into a waste-basket already full of the things and gives you a toothy smile, "<i>I think somebody's ${Appearance.cockNoun(
                CockTypesEnum.HUMAN
            )} loves my pussy almost as much as I love you!</i>"\n\n`,
            false
        );

        this.outx(
            'She pulls you into her arms and gives you a long, wet kiss before breaking away to clean up.  Urta blows you a kiss and says, "<i>Thanks again, love!</i>"\n\n',
            false
        );

        this.outx(
            "You and Urta go your separate ways after that, both stinking of sex and with a sense of deep satisfaction.",
            false
        );
        this.knockUpUrtaChance();
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Back Room]
    public scyllaAndUrtaSittingInATree(): void {
        this.urtaSprite();
        this.outx("", true);
        // Increment 'times caught with Scylla'
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00143]++;

        if (!this.urtaDrunk()) {
            this.urtaAndScyllaBoningLikeBitchesSober();
            return;
        }

        this.menu();

        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00147] == 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00145] > 0
        ) {
            this.outx(
                "You meander towards the back-rooms and a canine waitress springs forward with a key clutched in her paw.  She blushes furiously and explains that she was tipped generously to hand it to you if you arrived.  You accept the proffered tool and smile.  It must be cheaper to pay someone to wait with a key than to fix the door each time the three of you meet up!  You snicker to yourself as you plunge the key into the lock's waiting receptacle, turn it, and push your way inside.  The scene in front of you is as arousing as it is familiar.\n\n",
                false
            );

            this.outx(
                "Urta is sitting down on a crate with her legs splayed and her torso leaning drunkenly in your direction.  Her tongue is hanging out and her eyes are lidded from alcohol as she notices you and gives another high-pitched whine, not of pain, but pleasure.  The source of her 'distress' is a black-robed figure with curly black locks of hair that hang around her head like a halo and thick, glossy red lips.  Those same lips are currently wrapped firmly around Urta's twitching, lust-swollen horse-cock just above her sheath.  You can clearly see the slight bulge of Urta's medial ring highlighted through the corrupted nun's neck as she bobs up and down, so absorbed in feeding her addiction that she failed to notice your entrance.\n\n",
                false
            );

            this.outx(
                `The fox is giving you a lewd look as she cradles Scylla's head in her hands and pushes down.  She slurs, "<i>Oooooh YEAH!  Mmmmm, you made it ${this.player.short}!  It seems like each time Scylla does... does... oooh... this I cum bigger and harder.  MMmmmm so good... wanna watch?</i>"\n\n`,
                false
            );

            this.outx(
                "Throughout the conversation she's weakly twitching her pelvis, rocking her hips against Scylla's face while her balls start to swell and churn in the nun's hands.  You close the door behind you carefully and drop the key on a crate.  It's time for some fun.\n\n",
                false
            );

            // Butans
            if (
                this.player.cockThatFits(this.urtaCapacity()) != -1 &&
                this.player.lowerBody != LOWER_BODY_TYPE_CENTAUR
            ) {
                this.addButton(0, "Lap", this.makeUrtaSitOnYourLapWithScylla);
                this.outx(
                    "(You could make Urta sit on YOUR lap for a change, or you could jerk off and watch."
                );
            } else {
                this.outx("(You could jerk off and watch.");
            }

            this.addButton(1, "Jerk", this.watchTwoHotBitchesAndJerkIt);
            this.addButton(2, "LippleBond", this.lippleBondUrtaScylla);

            this.outx("  Bonding with the use of Scylla's lipples is also an option.)");
        } else {
            this.outx(
                "You meander by the Wet Bitch's back rooms, trying not to look like a creeper as you listen for ",
                false
            );
            if (!this.urtaLove()) this.outx("Urta");
            else this.outx("your love");
            this.outx(
                "'s voice.  The first few doors are silent and the next one sounds to have a spirited game of strip-poker going on inside it.  Judging by the grunts and occasional mewling moan of pleasure, some poor girl has already lost.  One of the barmaids gives you a warning glance and you keep moving, sure to avoid the lewd game of chance as you hunt for the stray, well-endowed fox.\n\n",
                false
            );

            this.outx(
                "At first, the following entryway is silent, though you can see light underneath.  You're just about to move on from the portal when you hear Urta's voice give out a strained grunt.  Did some ",
                false
            );
            if (this.player.cor < 40) this.outx("corrupted ruffians");
            else this.outx("demon agents");
            this.outx(
                " somehow get the drop on her?  She whines, high-pitched and plaintive, almost as if she was wounded, and you cannot wait a moment later.  You lunge to the door, twist the handle, and find it locked.  Without a second thought, you throw your weight into the flimsy wood paneling and crash through to the last thing you expected to see!\n\n",
                false
            );

            this.outx(
                "Urta's sitting down on a crate with her legs akimbo and her torso leaning drunkenly in your direction.  Her tongue is hanging out and her eyes are lidded from alcohol as she notices you and gives another high-pitched whine, not of pain, but pleasure.  The source of her 'distress' is a black-robed figure with curly black locks of hair that hang around her head like a halo and thick, glossy red lips.  Those same lips are currently wrapped firmly around Urta's twitching, lust-swollen horse-cock just above her sheath.  You can clearly see the slight bulge of Urta's medial ring highlighted through the corrupted nun's neck as she bobs up and down, so absorbed in feeding her addiction that she failed to notice you bursting through the door.\n\n",
                false
            );

            this.outx("The fox is ");
            if (this.urtaLove()) this.outx("weakly protesting");
            else if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] >= 11)
                this.outx("giving you a lewd look");
            else this.outx("blushing hard");
            this.outx(
                " as she cradles Scylla's head in her hands and pushes down.  She slurs, \"<i>",
                false
            );
            if (this.urtaLove())
                this.outx(
                    "I'm... ahhhh... s-sorry love, but we both know she's been suuuu - oh yeah, keep licking - sucking you off before, and the hungry slut just couldn't take her eyes off my cock.  Why didn't you tell me ho - OH YES!  RIGHT THERE! - h-how good she was?",
                    false
                );
            else if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] >= 11)
                this.outx(
                    "Ohhh, you showed up a little late... mmmhmm yes, now lick... Oh, why didn't you tell me ho - OH YES!  RIGHT THERE! - h-how good of a cock-sucker this lewd-bodied bitch was?",
                    false
                );
            else
                this.outx(
                    `H-hi ${this.player.short}... I didn't think I'd get to see you to- Oh yeah, like that!  Mmmm... OH!  I guess since we've been intimate before you can watch...`
                );
            this.outx('</i>"\n\n', false);

            this.outx(
                "Throughout the conversation she's weakly twitching her pelvis, rocking her hips against Scylla's face while her balls start to swell and churn in the nun's hands.  Thankfully the doorway is at such an angle that the bulk of the bar can't see inside, and it helps that no one seems inclined to bother the three of you for now.  What do you do?\n\n",
                false
            );

            // Butans
            if (
                this.player.cockThatFits(this.urtaCapacity()) != -1 &&
                this.player.lowerBody != LOWER_BODY_TYPE_CENTAUR
            ) {
                this.addButton(0, "Lap", this.makeUrtaSitOnYourLapWithScylla);
                this.outx(
                    "(You could make Urta sit on YOUR lap for a change, or you could jerk off and watch."
                );
            } else {
                this.outx("(You could jerk off and watch.");
            }

            this.addButton(1, "Jerk", this.watchTwoHotBitchesAndJerkIt);
            this.addButton(2, "LippleBond", this.lippleBondUrtaScylla);

            this.outx(
                "  You could throw them the finger and leave.  Scylla also has two pairs of lips unoccupied - playing with them could lead to something interesting.  You could tell Urta you never want to see her again.)"
            );

            this.addButton(3, "Heartbreak", this.heartBreakHotelInTelAdre);
            this.addButton(4, "Leave", this.flipUrtaTheBird);
        }
    }

    // Sober repeat Urta x Scylla
    private urtaAndScyllaBoningLikeBitchesSober(): void {
        this.clearOutput();
        this.outx(
            "You meander towards the back rooms and a canine waitress springs forward with a key clutched in her paw.  She blushes furiously and explains that she was tipped generously to hand it to you if you arrived.  You accept the proffered tool and smile.  It must be cheaper to pay someone to wait with a key than to fix the door each time the three of you meet up!  Snickering to yourself as you plunge the key into the lock's waiting receptacle, you turn it and push your way inside.  The scene in front of you is as arousing as it is familiar."
        );
        this.outx(
            "\n\nUrta is leaning back against a wall for support, her breasts heaving as she gulps in deep lungfuls of air, ebony nipples hard and puckered with lust.  Her eyes have the bright glimmer of sobriety this time, though it's hard to pick out under her heavy lids and eyelashes.  An onyx-robed figure blocks your view of your foxy lover's well-endowed groin, though the two ram-like horns that curl around the crotch-height head clearly mark the second party as the tainted nun, Scylla.  She's bobbing up and down with practiced ease, even though her plump, ruby lips are smushed up against the vixen's loins.  Her throat must be absolutely stuffed with horse-dick, and indeed, as you walk closer, you can see the thick medial ring bulging the nun's neck obscenely."
        );
        this.outx(
            '\n\nUrta shudders as she notices you, her black lips curling back into a happy grin at your appearance.  "<i>Oh, [name], you made it!</i>"'
        );
        this.outx(
            '\n\nScylla\'s blue eyes crane up to you, and she gleefully gurgles, "<i>Mrmmmphh hrmmppphh!</i>"  '
        );
        if (this.silly())
            this.outx("For some reason, it makes you think of mythical balloonicorns.  ");
        this.outx(
            "Drool bubbles out the corner of her inhumanly-plump, practically-inflated lips as she tries to vocalize her happiness at seeing you here; long strands of it sway with her unceasing motions.  The creamy, alabaster skin on the nun's cheeks colors the bright red of embarrassment as you admire her dedication to dick-sucking.  Hollowing, that same skin forms into deep divots as the nun starts to suck, eyes crossing to admire the trembling column of horse-cock before her when she pulls back.  Urta's strong fingers involuntarily seek out the nun's horns, and she pulls the suckling blow-job slut's crimson cock-hole back into place, flush against her fur once more."
        );
        this.outx(
            '\n\nThe gray-furred fox moans, "<i>Oh yeahhh, you like that, don\'t you, hungry girl?</i>"  She giggles nervously after the declaration and looks your way, embarrassed at her own forwardness.  You grin at your vulpine '
        );
        if (!this.urtaLove()) this.outx("fuck-buddy");
        else this.outx("lover");
        this.outx(
            "'s lusty slip-up and skittish responses, pinching her booty for good measure while you decide just how to get involved in the potential <i>ménage à trois</i>.\n\nWhat do you do?"
        );
        this.dynStats("lus", 10 + this.player.lib / 5, "resisted", false);
        // Get worshipped requires gigantic dong
        let worship;
        let fuck;
        if (this.player.cockThatFits(this.urtaCapacity()) >= 0) {
            fuck = this.fuckUrtaWhileScyllaSucksSober;
            this.outx("  You could <b>fuck the fox</b> while she gets her oral pleasure.");
        }
        if (this.player.biggestCockArea() > this.urtaCapacity()) {
            worship = this.dockWithUrtaUnderScyllasSoberSupervision;
            this.outx(
                "  You could whip out your gigantic cock and let the blowjob queen <b>worship</b> a REAL dick."
            );
        }
        this.outx("  Whatever you do, with Scylla involved, it's sure to get out of hand.");
        // [Fuck Nun Nipple] [Fuck Urta] [Get Worshipped]
        this.simpleChoices(
            "Fuck Fox",
            fuck,
            "Worshipped",
            worship,
            "",
            undefined,
            "",
            undefined,
            "Back",
            this.telAdre.barTelAdre
        );
    }
    // Fuck Urta while scylla sucks sober
    private fuckUrtaWhileScyllaSucksSober(): void {
        this.clearOutput();
        const x: number = this.player.cockThatFits(this.urtaCapacity());
        this.outx(
            `You peel out of your straining equipment to free your ${this.multiCockDescriptLight()}`
        );
        if (this.player.balls > 0) this.outx(" and [balls]");
        this.outx(
            ", hauling out your sweaty, engorged meat.  Scylla, absorbed as she is with cum-thirst, doesn't seem to notice, though her nose twitches as the scent of your musky aroma mingles with the sex-stained air.  You gently squeeze behind the fox, folding her bushy, soft tail to the side and giving you something firm to support yourself when you let her flop back into you.  Her smooth fur feels wonderful on your [chest] and she squirms and gyrates against Scylla's sucking mouth.  Fairly dripping with moisture, the fox's black-lipped sex grinds on you, resting atop [oneCock], and your length is soon soaked with her heady, animalistic fem-spunk."
        );
        this.outx(
            `\n\nUrta pants, "<i>Go on... nnn... j-just put it in already!</i>"  You readily oblige the over-endowed beast-woman by guiding your length into the clutching vice of her nethers, shivering at the onslaught of electric bliss that rockets up your ${this.cockDescript(
                x
            )}.  You hilt inside her`
        );
        if (this.player.cockArea(x) >= 40)
            this.outx(", clearly bulging her stomach with your sizeable cock");
        this.outx(
            ", sliding up into the slick, welcoming passage as if you always belonged.  Rivulets of liquid desire trickle from the stretched lips to run down "
        );
        if (this.player.balls > 0) this.outx("the front of your [sack]");
        else this.outx("your [legs]");
        this.outx(
            ".  The gray-furred femme reaches back in an awkward hug, trying to hold you against her, speared together in the most intimate of embraces."
        );
        this.outx(
            "\n\nScylla, on her knees and forgotten, stops her happy gurgles as the fox's prodigious flow of potent pre-cum thickens perceptibly.  The salty tang on the nun's tongue awakens something lost within her, buried and hidden deep inside.  Her beautiful blue eyes darken, the sclera going black around her azure irises, entrapping them in a sea of all-consuming onyx.  The very tips of the corrupted nun's horns glow midnight purple, and almost imperceptibly, they grow longer, curling around to prod Urta's delicate, unsuspecting balls.  Two sharp divots form in the furry sack as the glow fades.  Urta's pleasure-drunk moans jump an octave at the same time, leaving you to wonder at what's going on."
        );
        this.outx(
            '\n\n"<i>Ow!  Wha-what are you DOING!?</i>" the confused vixen stutters, trapped between '
        );
        if (this.silly()) this.outx("a cock and a sharp place.");
        else this.outx("your lusty bodies.");
        this.outx(
            `  The velvet glove clasping your ${this.cockDescript(
                x
            )} tightens without warning, accompanied by a full-body quake.  Urta's eyes roll back as some invisible force works through her, culminating in a muscular clench that you feel will pop your ${this.cockDescript(
                x
            )} clean off your body.  You grunt, grabbing hold of the fox's tits for stability and wince from the almost painful tightness of her snatch.  The moment seems to drag on forever, but then, the vixen slumps back into your arms, allowing you to support her sagging weight.`
        );
        this.outx(
            `\n\nBeyond your sight, the fox-girl's soft-furred sack begins to round out, growing larger in spite of the sharp tip prodding hard at her balls. The delicate, plush nuts swell bigger, big enough to pull the skin around them tight, big enough to pull Urta harder onto your ${this.cockDescript(
                x
            )}, big enough to be painfully poked, on the verge of being pierced.  Urta's vocalizations take on a keening, banshee-like quality, but before any harm can be done, a rosy glow envelops the fox-herm's poor, brutalized sack.  Stranger still, the nun's ram-like protrusions shorten in response, actually withdrawing back into her skull, pushed back by your lover's impressive, seemingly magical testes.`
        );
        this.outx(
            "\n\nScylla gasps when the fat nuts drape down onto her corruption-swollen tits.  Barely audible, wet sucking sounds can be heard, and you quickly realize that Scylla's lipples are kissing the swelling sack with obscene fervor, mouthily making love to her mistress's over-sized balls.  A long, rapturous gasp escapes Scylla's upper lips, and the nun looks up at the fox with confusion.  Wasn't she stretching her puffy cock-suckers into a delicious 'o' hard enough to make her jaw ache mere moments before?  Looking down, the habit-garbed blowjob-queen watches in horror as the equine thickness diminishes for every growth of the sloshing cum-jugs below.  The receding sheath escapes from its crimson prison, followed by a few inches of shortening shaft."
        );
        this.outx(
            "\n\nFor your part, you're oblivious to most of this.  All you notice is a flash of reddish light and an upsurge in your furry partner's tightness.  Indeed, her pussy seems to be going crazy, squeezing in waves that go from your "
        );
        if (this.player.hasSheath()) this.outx("sheath");
        else this.outx("base");
        this.outx(
            ` to your ${this.player.cockHead(
                x
            )}.  She's moaning so hard and fast that there's barely time for her to gasp in fresh lungfuls of air, and she begins to saw her hips back and forth with reckless abandon, splattering your groin with slick wetness and face-fucking the hungry nun wildly, lost to her passion.`
        );
        this.outx(
            "\n\nScylla seems confused by the magical mishap and attacks the diminishing horse-cock with ardor, slurping and suckling, her cheeks hollowing from the intense suction.  At the same time, Urta's balls swing down past her calves, and even though her muscles lock tight, she can no longer support the overmastering weight of her engorged cum-factories.  She lowers them the last few inches to the ground, relaxing atop her stretched sack while the growth continues unhindered.  Scylla grunts in irritation as the tiny horse-cock, barely nine inches long, pulls out of her throat, and she sticks out a strangely serpentine tongue in response.  It wraps the sheath like the world's slipperiest cock-ring, then slithers back up the animal endowment's length into her own mouth, twisting and slipping around to further the fox's pleasure."
        );
        this.outx(
            `\n\nMoaning, Urta whimpers, "<i>S-so full... I - ungh - I... I can't hold it!  C-cuuuummmiiiiinnng!</i>"  Her hips jerk forward hard and fast enough that it nearly pulls the gushing pussy off your ${this.cockDescript(
                x
            )}, but Scylla isn't so lucky.  Her nose is squished almost flat into the fox's sweaty middle-fur, chin deep in ballsack.  She doesn't seem to mind; in fact, when drizzles of frothing fluid appear at the crinkled corners of the nun's ruby lips, her eyes roll back, exposing the whites.  Meanwhile, Urta's less-than-colt-sized dong swells, but not as a return to its former glory.  No, if anything, her musky dick is still shrinking.  The sheer size of the cum-globs pumping through her urethra are visibly stretching her horse-cock, giving the illusion of increased size.`
        );
        this.outx(
            "\n\nThe high pressure streams of alabaster goo splatter their way into the hungry nun's throat, and she drinks it down without complaint, seeming to orgasm just from the act of swallowing the salty jizz.  The pale woman's tongue disentangles itself from the horny herm's tiny, slick tool and wiggles back into her mouth, drawn back as she struggles to cope with it all.  Seeing the rapturous looks and feeling the silken-furred sack on your [legs], you give in to the massaging vixen-cunt, seizing and shaking from head to [foot] as you"
        );
        if (this.player.balls > 0) this.outx("r [balls]");
        this.outx(
            ' give the warm snatch a dose of virile medicine.  Urta, perhaps stirred from her own orgasm by the jets of hot fluid flooding her nethers, reaches back to squeeze your butt and whimpers, "<i>Give it to me.</i>"'
        );
        this.outx(
            "\n\nYour body responds with a healthy squirt of fresh goo, pumping a wad of cum so fat from [eachCock] that you have to wonder if you have any left."
        );
        if (this.player.cockTotal() > 1)
            this.outx(
                "  The unbound portion of your package bobs in the air before coming to rest in Urta's ass-crack.  A second later, the vulpine butt is coated with sticky white icing."
            );
        if (this.player.lactationQ() > 50)
            this.outx(
                "  Your sensitive nipples let down, releasing their own heady flows to compliment your climactic pleasure, spraying into the gray fur relentlessly."
            );
        this.outx(
            `  Throughout it all, your ${this.cockDescript(
                x
            )} continues to do its level best to fill the fox.  Fireworks of uncontrollable pleasure go off one after the other, alternatively numbing and locking your muscles as you release all of your pent-up lusts, desires, and needs into the welcoming cunt.`
        );
        if (this.player.cumQ() >= 500) {
            this.outx("  Urta's belly bloats from the thick deposit");
            if (this.player.cumQ() >= 2000)
                this.outx(
                    ", rounding more and more, a taut cum-tank that jiggles with your thick seed."
                );
            else if (this.player.cumQ() >= 1200)
                this.outx(
                    ", rounding out into a swollen cum-bank that jiggles under the weight of your seed."
                );
            else if (this.player.cumQ() >= 750)
                this.outx(", rounding out into a gravid bump that jiggles with liquid weight.");
            else this.outx(", rounding out into a nicely-sized bump.");
            this.outx("  You run your hands across it as you give a last few pumps.");
        }
        this.outx(
            "\n\nWhen your orgasm finally concludes, you slump back, limp but pinned in place by the liquid weight of the fox's sloshing ballsack and shaking femgasm.  Scylla is attached to her front like a sucking parasite, somehow keeping up with the unholy flow.  From around your lover's "
        );
        if (this.player.tallness >= 78) this.outx("head");
        else if (this.player.tallness >= 48) this.outx("narrow middle");
        else this.outx("curvy hips");
        this.outx(
            " you watch the nun's throat bulge almost double wide with each swallow of seed.  Tremendous volleys of semen are pumping down her esophagus rapidfire, and yet the suckling woman barely shows any sign of being full.  A clear puddle has sprung up underfoot, centered below the cock-sucker's crotch, and you marvel at the evidence of Scylla's pleasure.  She must be cumming non-stop!"
        );
        this.outx(
            "\n\nEventually, the prick-vixen's shrinking member plateaus, perhaps four or five inches long inside the robed woman's gullet, and the barrel-sized testes begin to shrink, dwindling with every tremor of spunk that they expel.  Throughout the sordid encounter, Scylla's hungry tit-mouths never stop their slobbering.  Indeed, as she drinks, the lips become progressively bigger and more visible through the austere fabric.  Urta babbles with unrepressed happiness, barely conscious at this point but clearly pleased at the minutes-long orgasm she's working through."
        );
        this.outx(
            "\n\nThe vixen's shrinking balls pull away from you as they empty, and as soon as you're free, you slip out from behind the jizz-junkie and her prey, gently resting the furry fox and her outrageously virile orbs on the wall.  Scylla's swallowing slows as her belly begins to round, and you have to wonder if perhaps she's hit some kind of limit.  Does the cum-hungry blowjob queen even have one?  The trickles of cum that slip free of her sucking mouth-hole thicken into small rivers, and her robes quickly turn into a ivory-glossed mess.  You admire the view as you recover, and before your eyes, the swollen nutsack returns to normal, just in time for an end to the multi-minute jizz session.  Scylla's breasts have grown beyond normal measure, so big they might still touch the ground if the statuesque nun were to attempt to rise.  Her lip-nips are actually still sucking on the fox's testes, hiding most of it from view, but once it becomes clear that no more fluid is forthcoming, all three of her mouths disengage with slimy pops."
        );
        this.outx(
            '\n\nUrta slides down the wall into the puddle of fem-spunk, barely conscious and gasping for breath.  As you stretch out to limber up, she blinks a few times, confused.  "<i>Wh-wha?  How!?  I... oh gods, I feel so empty.</i>"  Her green eyes glance your way, and she gives you a searching look, asking, "<i>How did I get so small?  This is great!  It\'ll be so easy to hide this!</i>"  The tiny pony-dick answers this statement by lengthening, gradually hanging lower and lower.  Its girth increases as well, a barely visible change, but a change nonetheless.  Urta groans out in disappointment, "<i>Damnit!  I should\'ve known it wasn\'t permanent.</i>"'
        );
        this.outx(
            '\n\nBurping, Scylla demurely covers her mouth as her own transformations fade into normalcy.  Of course, in her case normalcy is being utterly stacked with lipples that clearly show through her cum-soaked robes.  She looks down at herself and tumbles over backwards, tits jiggling.  "<i>I\'m sorry, Urta, [name]!  I got so very hungry.</i>"  The panicked blue eyes ease as she continues, "<i>But I\'m full now.  So full... thank you, noble Captain.</i>"'
        );
        this.outx(
            '\n\nThe nun jumps up and hugs the exhausted fox tight.  Then, blushing, she quickly changes into a fresh habit and flounces out the door, taking the old, soaked one with her, perhaps for a snack.  Urta grumbles, "<i>Go on, it\'s mostly my mess, so I suppose I ought to pay for the clean up.</i>"  She props herself against a box as her equine member spontaneously gains a few inches, dripping fresh drops of pre.  Her balls seem to be back to normal too.'
        );
        if (this.urtaLove())
            this.outx(
                "  You give your lover a wet kiss and a fondle before you go, snickering when it makes her even longer."
            );
        else
            this.outx(
                "  You give her a quick hug and depart, smiling when you realize the brief touch made her even longer."
            );
        this.knockUpUrtaChance();
        // -2 sens, -100 lust
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Dock With Urta Under Scyllas Sober Supervision
    private dockWithUrtaUnderScyllasSoberSupervision(): void {
        this.clearOutput();
        const x: number = this.player.biggestCockIndex();
        this.outx(
            "Unable to contain yourself, you sigh heavily and release your [armor].  Your immense package grows bigger with each beat of your heart, the blood-swollen veins pulsing hotly as they pump your cock to its full, obscene proportions.  It slowly undulates in the air as it fills to capacity with your lusty lifeblood, and the unmistakable aroma of your masculine "
        );
        if (this.player.hasVagina()) this.outx("half's ");
        this.outx("musk fills the air.");
        if (this.player.balls > 0)
            this.outx(
                "  Your [sack] swings free, bouncing off the back of [oneCock] when it thickens precipitously."
            );
        this.outx(
            "  Sighing with relief, you gently stroke your length as you eye the two beauties meaningfully."
        );
        this.outx(
            `\n\nUrta whimpers at the view, and she whispers, "<i>[name], you aren't going to put that in me are you?  You'd rip me in half, ${this.player.mf(
                "hunk",
                "babe"
            )}!</i>"`
        );
        this.outx(
            `\n\nScylla looks wide-eyed at you and actually backs off her spit-soaked equine toy to stammer, "<i>S-s-soooo big...</i>"  She looks almost hypnotized by your throbbing meat, and she reaches out in a daze, letting her fingers trace one of the pulsating veins.  The now neglected vixen reaches down and grabs you in a two-handed grip.  Her gentle fingers and fluffy, silk fur tickle you deliciously as she raises your tip and crudely smacks it into Scylla's cheek.  The fox's aim is off, and all she manages is to drag your tip into the cock-hypnotized nun's hair.  Your dick travels on and flops heavily onto her shoulder, nearly knocking her over.  The hit is enough to rouse her from her stupor, and with strength that borders on demonic, she pushes Urta away and claims your ${this.cockDescript(
                x
            )} for herself.`
        );
        this.outx("\n\nFurry breasts press into your back, and a thick horse-cock ");
        if (!this.player.isBiped() && !this.player.isDrider()) this.outx("slips along");
        else this.outx("slides through");
        this.outx(
            ' your [legs].  From behind, Urta wraps her arms around your [chest] and snuggles her black lips into the nape of your neck.  A soft, whispered voice mutters, "<i>You stole my blowjob.</i>"  Long canines take a nip at your ear, and it muses, "<i>But I know that nun has more than one way to swallow my rebellious little colt...</i>"'
        );
        this.outx(
            "\n\nWith grace that borders on feline, the fox leaps out around you, pouncing on the distracted nun.  Her hands roughly grope one of the orally addicted woman's gigantic, succubi-shaming tits, and with a triumphant snarl, Urta tears through the fabric protecting it like paper.  A mountain of creamy breast-flesh rolls into the prick-vixen's paws, marked in the center by a pair of glossy, ruby-lacquered lips.  You can't imagine that Scylla takes the time to apply make-up to her breasts, but you can't really explain the oiled crimson look she sports either.  The tit-mouth opens and closes repeatedly, switching beneath a gaping 'O' and a puckered smile that seems to beg for dick."
        );
        this.outx(
            `\n\nDuring all this, Scylla's hands are stroking along your ${this.cockDescript(
                x
            )} with delight that borders on rapture`
        );
        if (this.silly())
            this.outx(".  She even mentions something about how you can be her big daddy");
        this.outx(
            ".  No matter how many touches and caresses they place upon your tender rod, it barely seems to sate you.  Indeed, for every push of hand against cock, there seems to be more sensitive skin left neglected.  A malicious gleam glitters in the holy woman's crystal-blue eyes, and her slender fingers grab you harder, accelerating your growth.  Cock spools out of your groin like line from a reel, though in your case, you're getting longer AND thicker."
        );
        if (this.player.balls > 0)
            this.outx(
                "  Your [sack] stretches tight, totally  filled by the burgeoning testes concealed within."
            );
        this.outx(
            `\n\nThe nun whispers, "<i>Bigger,</i>" with a voice as smooth as satin.  She shimmies back a bit when it becomes too heavy to support, and you moan at the sensation of your overly abundant tool dragging across the floorboards.  They feel less like rough wood grain and more like a ribbed surface of a masturbatory aid.  You'd be alarmed over it, but it feels too good to fret over.  Besides, if there's anything to be concerned about, it's your immense size.  The tainted nun's horns, once playful little things, are now over a foot long and bowed with a sinister curve.  Behind them, a second set has sprouted that reaches down to her neck.  There may be more, hidden in the forest of lush curls, but you really can't tell, and your vision keeps being drawn back to your ${this.cockDescript(
                x
            )}.`
        );
        if (this.player.balls > 0)
            this.outx("  You shift to let your bloated ball-sack breathe a little better as well.");
        this.outx("\n\nUrta has the sense to stop and step back in alarm.  ");
        if (this.flags[kFLAGS.URTA_SCYLLA_BIG_DICK_TIMES_DONE] > 0)
            this.outx(
                "Just like last time, she adopts a panicked expression and lunges for the door, but she moves slowly and a gooey drop of pre-cum hangs from her flare as she moves."
            );
        else
            this.outx(
                "With a panicked expression on her face, she lunges for the door, her hard cock flopping awkwardly."
            );
        this.outx(
            "  Scylla's eyes glow black as she reaches for the guardswoman, but she's too far away to even catch the fleeing fox's tail.  An inexplicable black radiance glows from the holy woman-turned-succubus's eyes, and miraculously, Urta is lifted clear of the floor, her legs flailing uselessly.  She flies back to the corner of the room and lands in a confused pile, less than a foot from your carriage-sized erection."
        );
        this.outx(
            `\n\nMeanwhile, your erection continues to grow unimpeded, and it now reaches across the smallish room, easily as tall as your waist and utterly immobilizing.  The magically restrained fox struggles, but semi-transparent tendrils of inky energy keep her seated.  They twist around her ears and turn her face, forcing her to look at your tumescent, oozing penis.  Directly in the center of your giant ${this.player.cockHead(
                x
            )} lies your plus-sized cum-slit, as big as a centaur's cunt and stretched wide by a dollop of your fragrant cock cream.  Urta is forced to watch it slowly roll out to puddle on the floor.  Her own erection, infantile by your new standards, rises fitfully, the flare filling to a full erection as Urta's body betrays her, overpowering her fear.`
        );
        this.outx(
            "\n\nThe curvy nun saunters over to where the action is, wiggling her ass for good measure.  As horny as you are, you really don't need the encouragement, but you squirt a fresh wave of pre onto the floor regardless. Urta whimpers as she watches, her eyes locked on the lubricated hole before her.  She shakes with pent-up need but remains held back by phantasmal tentacles that tug at her nipples and caress her skin, driving her into a frenzy.  Scylla kisses the fox-girl full on the lips, her exposed tit swallowing the massive horse-cock as if by magic.  The wet oral embraces fill the air with the sounds of sordid sucking, and when the nun pulls back, the captain of the guard is humping the air like an animal with nothing but lust in her emerald eyes."
        );
        this.outx(
            `\n\nScylla gestures at your ${this.cockDescript(
                x
            )} and commands, "<i>Go on, fuck it.  You know you want to.</i>"  The black restraints poof into phantasmal smoke.  At the same time, your lusty hermaphrodite `
        );
        if (!this.urtaLove()) this.outx("friend");
        else this.outx("lover");
        this.outx(
            ` lunges forward, scattering the smokey haze in the split second it takes her to slam face-first into your dick.  A flat-tipped spear plunges through the goop plugging your urethra and into your cock, scattering streamings of stringy sexual juice in a fan around it.  To you, the penetration isn't painful in the slightest.  Your ${this.cockDescript(
                x
            )} is so big that the fox's own thick prick is a nice fit, and it feels like the slippery shaft is stroking you from the inside out, massaging nerve endings you didn't even know you had.`
        );
        this.outx(
            `\n\nUrta grabs around the edges of your ${this.player.cockHead(
                x
            )} and pulls herself down, her fuzzy balls slapping wetly against the underside of your boner before pulling away again.  She starts kissing the top of your ${this.cockDescript(
                x
            )} with wild, unrestrained enjoyment.  Moving with the subtlety of a jackhammer, she pistons your inner hole wildly, grunting and moaning as she throws herself completely into debauchery.  The reluctant captain is fucking your immense member with abandon and shows no signs of stopping.  Scylla watches with detached amusement and idly climbs atop the column of jiggling dickmeat.  Her heavy udders press down on either side of your cock, but all she does is prop her face up on her hand and watch Urta fuck you hard enough to splatter pre-cum on everything in a five foot radius.  Thankfully, the movements cause your cock to flex and shift enough that the nun's inertia-bound breasts feel as if they're bouncing along the sides of your boner, unintentionally giving you a tit-fuck while your cock-pussy is inelegantly plowed.`
        );
        this.outx(
            `\n\nUrta's apple-sized nuts pull tight against her body as she works your urethra, and somehow, she remembers that she ought to warn you.  "<i>Can't stop!  G-g-gonna cuuuUUUUUM!!!</i>" she screams, slamming her dick down with enough force to distort your ${this.player.cockHead(
                x
            )}.  A moment later, you feel her swollen sack drag against your underside, and a warm explosion blooms inside your member.  The rushing white river runs through your length and into your body, giving you the oddest sensation of pleasant fullness and complete violation.`
        );
        if (this.player.balls > 0)
            this.outx(
                "  Your [balls] quiver a little when the rushing seed reaches them, and you swear you hear them slosh with the horse-spunk pouring into their own reservoirs."
            );
        else
            this.outx(
                "  Your innards gurgle slightly as the rushing seed travels through them, and you swear you can feel your prostate stretching to accommodate being suddenly stuffed with horse-spunk."
            );
        this.outx(
            "\n\nSmall trickles of white gush from your tip, but Urta's flare is so engorged that it effectively seals most of your cock-tunnel, making it the perfect tool for her cum injection.  Her emerald eyes cross as she unloads, and Scylla coos, \"<i>Yes...</i>\"  The fox trembles for well over thirty seconds, shaking and pumping your dick full of her animal spooge, dominating it with her tiny dick's gushing goo.  Once she seems about finished, Scylla pinches one of Urta's hard black nipples, which sets the fox back to cumming like a firehose for another few moments.  After all of that, Urta glances back up at you with apologetic eyes, her lids heavy and tired.  Then, she slumps back to the floor, her cock dragging out along with a splash of white."
        );
        this.outx(
            "\n\nScylla immediately bounces off your leaky cock and onto the exhausted herm.  Her ruby lips glide down the equine cock with ease, even though it distorts her neck into a plainly visible cock-tube.  When she pulls back off, Urta's pink and black member glistens with spit, but not a single glob of cum remains upon it.  The fox whimpers at the sensation so soon after her orgasm, but once freed, she sags back with a sigh."
        );
        this.outx(
            `\n\nAt this point, Scylla's horns no longer resemble horns but rather a crown of twisted, thorny ivory.  The sclera of her eyes has gone solid black, and the only blue that remains is contained within a pair of lizard-like slits.  The demonic woman rounds on you, though she drops to her knees before your ${this.cockDescript(
                x
            )}'s immense girth immediately.  Her lips crush against your white-dripping cum-slut and begin to suck, but those plump cock-suckers are up to so much more.  You're aware of an increase in sensation on your ${this.player.cockHead(
                x
            )}, and eventually determine that it must be caused by the nun's thickening pillows.  Her plump puckers push out, enveloping more and more of your cock with oily smoothness and warm spit while a foot long tongue lovingly rubs your underside.`
        );
        this.outx(
            `\n\nYour ${this.cockDescript(
                x
            )}'s interior is emptied of its equine payload with a few quick sucks, but your pre soon replaces it, mixed with traces of the foreign load that swirls in your [balls].  Groaning from your size-based bondage and the erotic assault you've had to weather, you begin to rub yourself, eager to push yourself over the edge and feed the beast across the room every ounce of a double shot of cum.  The demon-blessed holy woman can barely be seen over the top of your erection, yet she remains busy.  Her hands lift into the air, glowing with the same phantasmal blackness she displayed before, and dozens of insubstantial tentacles burst from the floor.`
        );
        this.outx(
            `\n\nThey loop around your cock in an inky net of tight restraint.  Part of each tentacle disappears into your skin, but they remain tangible enough to feel hot and wet, like fingers of bubbling goo that stretch tight into a web of erotic delight.  They pulsate around you, thickening as your arousal rises lockstep with Scylla's hunger.  Driven on by your enhanced needs, you desperately rock your [hips], but your frantic motions are useless, doing little to aid you.  Your ${this.cockDescript(
                x
            )} is so large that it's beyond your command or control. Instead, you focus on the feeling of Scylla's obscene mouth as it plumbs your cum-slit for its treasure, and before you know it, the black lattice-work of shadow-tentacles has merged into an ebony cavity that feels softer than a woman's cunt and as slippery as honey.  The whole thing moves back and forth slightly, stroking you off with Scylla's tongue, and an involuntary clench deep inside you signals that you can take no more - orgasm is at hand.`
        );
        this.outx(
            "\n\nLike a firework, something fires off deep inside you, but the explosion of pleasure that rattles in your skull is nothing to sneeze at.  Your bliss seems to have a kinetic force that hits you hard enough to cross your eyes.  Unthinkingly, you open your mouth and scream"
        );
        if (this.player.balls > 0)
            this.outx(" while your enormous balls gurgle and begin to empty");
        this.outx(
            ".  The titanic, room-filling cock lifts up off the ground by a few inches, supported by the thick bulge of cum that rushes from "
        );
        if (this.player.hasSheath()) this.outx("sheath");
        else this.outx("base");
        this.outx(
            ` to tip in an instant. It passes through the tight crimson seal, distending the nuns neck for a moment before it settles in her belly.  She looks almost pregnant on a mix of horse and champion-spunk for a moment, but then her belly narrows and her tits swell - just in time to take the next gush of your demonically-blessed orgasm.  Scylla appears to be in heaven, and as she swallows, the darkness leaves her eyes.  What remains is wide-eyed irresistible pleasure, and the vibrations of orgasmic screams vibrate through your swollen ${this.player.cockHead(
                x
            )} as you dump wave after wave of spooge through the clinging orifice.  A shiny puddle of feminine fluid widens beneath the nun's orgasm-wracked frame, and just once, you wish you could stick your head under her robes and watch it happen.`
        );

        this.outx(
            "\n\nBefore long, the mixed jizz inflates Scylla's tits to a tremendous size, big enough to completely wrap around your titanic cock.  They each leak their own white mixture, though it smells more of milk than your cum.  Regardless, you pump out more semen with abandon, gunking up the poor nun's throat with seed and causing twin streamers of jizz to spurt from her nose.  Through it all, she continually swallows, hungrily devouring every drop of Urta-tainted spunk that can feed her.  Her throat bobs with gleeful delight, and you lose track of how long you spend orgasming, eventually blacking out when your poor, frazzled nerves can handle no more."
        );
        this.flags[kFLAGS.URTA_SCYLLA_BIG_DICK_TIMES_DONE]++;
        // {-100 lust,+1 corruption, }
        this.player.orgasm();
        this.dynStats("cor", 1);
        if (this.player.cumQ() < 5000) this.player.cumMultiplier += 2;
        if (this.player.balls > 0) this.player.ballSize += 1;
        this.doNext(this.dockWithUrtaUnderScyllasSoberSupervision2);
    }
    // Dock With Urta Under Scyllas Sober Supervision2
    private dockWithUrtaUnderScyllasSoberSupervision2(): void {
        this.clearOutput();
        this.outx(
            "You wake up with something sweet in your mouth, and as you swallow, you crack your eyelids.  White.  A gently shrinking expanse of creamy flesh fills your view, and you realize a pair of crimson lips are kissed against your own, feeding milk to your dry mouth.  You swallow gratefully and glance around, quickly discovering your gray furred companion similarly engaged.  The two of you swallow your fill and detach, feeling a little confused and miraculously, still horny."
        );
        this.outx(
            "\n\nScylla smiles and burps while her breasts continue to dwindle, pausing when they're just large enough to be improbably big for the woman's large frame.  She gushes, \"<i>Thank you guys so much!  I don't know what I'd do if I had to have some... stranger to help me deal with this!</i>\"  She pulls a fresh habit up to cover herself and prances out, humming a forgotten hymn."
        );
        this.outx(
            '\n\nUrta waits until the other woman has left before stretching, her limp length wrapped tight against her leg by her tail.  "<i>I worry about her, [name].  The darkness inside her is growing, and I don\'t know how long her faith will stay her descent into depravity.</i>"  She hugs you then, throwing herself against your body, clinging so tightly it hurts.  "<i>I don\'t know how long any of us can last.  It seems like the whole world has fallen already, but she\'s in more danger than the rest of us.</i>"'
        );
        this.outx(
            "\n\nYou nod solemnly, weighing the gravity of her words.  After a moment in silence, she releases you and gets dressed.  The fox has more than a little spring in her step, and when she "
        );
        if (!this.urtaLove()) this.outx("waves ");
        else this.outx("kisses you ");
        this.outx('goodbye, she says, "<i>Thank you.</i>"');
        this.outx(
            "\n\nYour dick has returned to its old size, but a few fresh drops of cum dribble from it.  Did the encounter leave you a little more 'productive'?"
        );
        if (this.player.balls > 0) this.outx("  Your balls definitely got a little bigger...");
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Never See]
    private heartBreakHotelInTelAdre(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx("You reach ");
        if (this.player.tallness >= 52) this.outx("down");
        else this.outx("up");
        this.outx(
            " and slap Urta across the face and tell her you never want to see her again.  As soon as the slap hits her face, her balls start to grow in Scylla's long, skilled fingers.  She's starting to cum from the pain and pleasure, even as her eyes begin to water with tears.  You tell her that she should've discussed it with you before slutting it up with the nun, and that your life with her is over forever.  She bawls and moans in equal measure, though her hips never stop twitching toward Scylla's vacuum-tight mouth.  The nun's belly starts to expand in time with the quivering of the fox-herm's ever-growing balls.  You walk out before you have to see or hear any more from either of them.",
            false
        );
        // (Urta heart broken + hate.)
        this.urtaLove(-100);
        this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] = -1;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Bird and Leave]
    private flipUrtaTheBird(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You curl your hand into a fist and extend your middle finger at the alcoholic and cum-slut.  You've got better things to do than waste your time watching those two indulge their addictions.\n\n",
            false
        );
        // (lose urta love points.)
        this.urtaLove(-1);
        // (lose urta dick comfort points.)
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] -= 2;
        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] < 0)
            this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = 0;
        // (gain lust and lose corruption + libido)
        this.dynStats("lib", -2, "lus", 35, "cor", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Jerk Off And Watch]
    private watchTwoHotBitchesAndJerkIt(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(this.images.showImage("urta-scylla-masti"), false);
        this.outx(
            `You open your ${
                this.player.armorName
            } and sit down on a crate no more than a few feet away from the orally fixated couple, fishing out ${this.sMultiCockDesc()}`
        );
        if (this.player.hasVagina()) this.outx(` and exposing your ${this.vaginaDescript(0)}`);
        this.outx(
            ".  The nun's trademark demonic stubs commence sprouting, parting her hair until they rise up at least six inches from her forehead.  Meanwhile the poor, sexually frustrated vixen's balls are swelling up like balloons in Scylla's hands, growing so large that the fox's sack sags around the larger woman's hands.  The curly-haired oral slut tries to fellate and support Urta's growing size at the same time, and definitely appears to be struggling with it.\n\n",
            false
        );

        this.outx(`You stroke ${this.sMultiCockDesc()}`);
        if (this.player.hasVagina()) this.outx(` and touch your ${this.vaginaDescript(0)}`);
        this.outx(
            ", watching the puffed-up, fire engine-red cock-suckers bob on the trembling horse-shaft.  They slide up and down, up and down, then you see the hint of a tongue sliding around the cock and darting through the sheath.  Urta moans appreciatively at the act, and she turns her head to watch you as you masturbate to the exceptional scene before you.  Her eyes meet yours while her hands curl around Scylla's horns and pull the nun deeper into the sheath.  The fox loses her focus, her tongue rolls out, and her balls tremble and rise tight against her body.  She's cumming!\n\n",
            false
        );

        this.outx(
            "Scylla's neck is pulled tight as heavy bulges of cum work their way up the vixen's mismatched meat-pole, through the puffy, cock-sucking lips, and down the nun's throat into her hungry gullet.  Though only a few seconds pass, you watch Scylla's remarkably elastic midsection begin to bloat with what looks like a 7-month pregnancy.  She keeps her eyes closed the entire time, just silently suctioning down each plus-sized cream deposit as it's spurted out.  The only sounds in the room are Urta's half-whined moans of pleasure and the rapid slaps of your self-stimulation.\n\n",
            false
        );

        this.outx(
            "The gray-furred hermaphrodite's balls are shrinking with each blast, contracting and pausing as her body launches each volley, but they've only lost about half their enhanced size and Scylla's getting rounder than she has any right to be.  The nun seems ready for this though, and hums in concentration.  Her belly stops growing immediately, but each of her already prodigious milkers begins to enlarge, sloshing noisily like a barrel being filled.  You nearly push yourself past the edge at the sight of the growing melons, but hold back – you don't want to blow until you see just how far this goes.\n\n",
            false
        );

        this.outx(
            "Urta's hands let go of the corrupted woman's horns and she slumps back against the wall, but the nun just wraps her arms around the blissed-out vixen and suckles harder.  You keep watching and stroking, entranced by the sight of the spooge bubbles vanishing into Scylla's neck and plumping up her tits.  Urta's eyes are rolled back and she's drooling a runnel of spittle down her tit, around one of her black nipples, and down her belly, but she keeps cumming, even though her balls are nearly back to normal.  The poor fox is utterly unable to cope with the sensations running through her drunken form, but she's clearly enjoying it.\n\n",
            false
        );

        this.outx(
            "Just as Scylla's tits start to drag against the floorboards, she pulls back, letting Urta blow a few long ropes of thick horse-cum over her face and hair.  The nun sighs happily and begins to gather it in her fingers, licking it up while the exhausted fox's cock slowly deflates, dripping a trail along the floor.  Urta recovers surprisingly quickly, blinking her eyes and pulling her tongue back into her mouth with a sigh of utter, sated contentment.  You held back for so long, but watching the nun pick pearly strands of animal cum from her hair and swallow it down like a whore is just too much.\n\n",
            false
        );

        this.outx(`You pump hard on ${this.sMultiCockDesc()}`);
        if (this.player.totalCocks() > 1) this.outx(" in turn");
        this.outx(
            ", shooting hot ropes of semen that drape over the satisfied girls.  After so much edging, and such a hot scene, your orgasm is far more intense than any normal masturbation session.  Your whole body trembles while it spurts and squirts, making sure both of the addicts get at least a little bit of your white goo on their bodies.  ",
            false
        );
        if (this.player.cumQ() >= 250)
            this.outx(
                "A particularly coherent blast of seed splatters over Urta's tits, glazing her gray fur and black nipples with a thick layer of dripping spunk.  ",
                false
            );
        if (this.player.cumQ() >= 450)
            this.outx(
                "Another huge gout takes Scylla straight in the face, completely soaking her with yet more salty mess that drools onto the curve of her pendulous, black-clad tits.  ",
                false
            );
        if (this.player.cumQ() >= 700)
            this.outx(
                "A few more big blasts of the stuff fire off, spotting the pair with fat, sticky blotches.  ",
                false
            );
        if (this.player.cumQ() >= 1000) {
            this.outx(
                "Your body is so productive that it utterly drenches both participants in the stuff.  Runnels of it drip over their curves while fat droplets pool into a",
                false
            );
            if (this.player.cumQ() >= 2000) this.outx("n inches-deep");
            this.outx(" puddle on the ground.  ");
        }
        this.outx("Finally spent, you slump back and smile.\n\n", false);

        this.outx(
            "Scylla looks shocked, as if she's seeing you for the first time, but her nose twitches and she starts to shovel your seed into her mouth with greedy abandon.  Even so, her body rapidly 'digests' the fluid intake, and the nun starts to slim up before your eyes.  Urta wobbles up onto shaky legs and stumbles into you, giving you a wet kiss that tastes faintly of your salty leavings and then passionately hugs you.  She breaks the embrace and slurs, ",
            false
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00143] == 1)
            this.outx('"<i>We need to do thish again!</i>"', false);
        else
            this.outx(
                `"<i>You're the besht ${this.player.mf("man", "woman")} a girl could ashk for.</i>"`
            );
        this.outx(
            "  Before you can answer, she gives your ass a slap and finds a water barrel to wash up in.  Scylla finishes her 'meal' and looks up at you, her alabaster skin turning completely crimson before she too runs off to clean up.\n\n",
            false
        );
        this.outx(
            `You smile happily and pick up your ${this.player.armorName}.  It's past time you checked up on your camp.`
        );
        if (this.urtaLove())
            this.outx(
                "  You give your lover's back a wistful grin and muse over how good her taste in women is as you leave.",
                false
            );
        this.player.orgasm();
        // +luv
        this.urtaLove(2);
        // +comfort
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY]++;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Lap Sittings!] - no taurs! (need size check also, to avoid implied analpocalypse -Z)
    private makeUrtaSitOnYourLapWithScylla(): void {
        this.urtaSprite();

        const x: number = this.player.cockThatFits(this.urtaCapacity());
        const y: number = this.player.cockThatFits2(this.urtaCapacity());

        this.outx("", true);

        this.outx(this.images.showImage("urta-scylla-lapfuck"), false);
        this.outx(
            "You smirk at the drunken fox and inform her in no uncertain words that you'll do more than watch.  She blinks at you, her inebriated mind unable to process new thoughts as you stalk forwards and sit behind her on the crate",
            false
        );
        if (this.player.lowerBody == LOWER_BODY_TYPE_NAGA)
            this.outx(", snaking your tail around her legs");
        else if (this.player.lowerBody == LOWER_BODY_TYPE_GOO)
            this.outx(", enveloping her legs with your goo");
        else this.outx(`, straddling your ${this.player.legs()} around her hips`);
        this.outx(
            `.  You grab her narrow waist and pull her up, dragging Scylla's cock-locked head up with her and aligning your ${this.cockDescript(
                x
            )} with her backdoor before you start to lower her back down.  `
        );
        if (y > -1)
            this.outx(
                `Your ${this.cockDescript(
                    y
                )} even manages to get in line with her drooling, black-lipped pussy.  `
            );
        if ((this.player.cockTotal() > 1 && y == -1) || this.player.cockTotal() > 2)
            this.outx(
                "You allow your remaining, unused dickflesh to flop against her back, leaking pre-cum into her fur.  ",
                false
            );
        this.outx(
            "You aren't sure if it's the alcohol in her or her own anal talents, but she slides down without a complaint, pulling Scylla's vacuum-like mouth down with her",
            false
        );
        if (y != -1) this.outx(" and squeezing you tightly with her sopping cunt");
        this.outx(".\n\n", false);

        this.outx('She grunts, "<i>', false);
        if (x != -1 && y != -1)
            this.outx(
                `Oooh, and in both holes?  You naughty ${this.player.mf("boy", "girl")}, you!`
            );
        else if (this.urtaLove()) this.outx("Oooh yeah, fill me love!");
        else if (Urta.rand(2) == 0) this.outx("Oooh, you know how to treat a lady!");
        else this.outx("MMmm, that's nice!");
        this.outx(
            "</i>\"  She's actually trying to watch you over her shoulder now, completely ignoring the cock-addled nun as the latter bobs on her horse-meat.  You make the most of it and ",
            false
        );
        if (this.urtaLove() || this.player.cor <= 40) this.outx("kiss her full on the mouth");
        else this.outx("bite her neck");
        this.outx(
            " while you grab her soft, furred asscheeks and lift her up, feeling the exquisite texture of her pucker ",
            false
        );
        if (y != -1) this.outx("and twat ");
        this.outx(
            "massaging your manhood the whole way.  Before you go too high, you drop her, and let her weight impale her back on top of you.  Her rapidly expanding balls slap into your own and smear them with her pussy juice.\n\n",
            false
        );

        this.outx(
            "Urta's tail curls snugly around your waist, and the drunken fox takes over, lifting herself up even as Scylla's magic swells her balls past the size of grapefruits.  She openly moans when she reaches the apex, and smoothly lowers herself back down, squeezing and stroking you with her internal muscles while trying to endure the nun's incessant suckling.  The measured ",
            false
        );
        if (y != -1) this.outx("double penetration");
        else this.outx("anal fuck");
        this.outx(
            " drives you wild, but being on the bottom as you are, there isn't much you can do aside from grabbing fistfuls of vixen-ass and slapping it for encouragement.  Urta gets the message and begins to bounce vigorously, mewling and moaning as her balls get large enough to reach the floor.  You lend a hand and play with her sheath, feeling the flesh underneath quake and tremble as the fox's orgasm hits.\n\n",
            false
        );

        this.outx(
            `Scylla's neck is pulled tight as Urta's urethra is stretched wide by huge bulges of cum.  You can actually feel them sliding past the fingers you've dug into her sheath.  No sooner than one squeezes past is another on its way.  You wonder how Scylla can handle such incredible volumes and the only answer you can think of is magic.  Whatever the case, her swallowing gets noisier and Urta starts bouncing even faster atop your ${this.cockDescript(
                x
            )}`
        );
        if (y != -1) this.outx(` and ${this.cockDescript(y)}`);
        this.outx(
            ".  You pinch one of her shiny black nipples between your fingers as encouragement, and she actually howls with delight.  The herm vixen's cum-pumping cock starts spasming in your grip, the order of her previous cum blasts dissolving to turn her cock into a frenzied, constantly squirting spooge-hose.  Every spurt of jism that Scylla swallows is one less in the fox's magically-enhanced ballsack, and the unnatural, mighty orbs begin to shrink back towards their normal size with alarming rapidity.\n\n",
            false
        );

        this.outx(
            `Scylla's growing belly and tits smush around your ${this.player.legs()}, swelling further and further as she tries to devour all the creamy horse-spunk the fox is hosing into her.  Yet the touch of long, gentle fingers caressing your ${this.sackDescript()} and the gradual inflation of your ${this.ballsDescriptLight()} lets you know that the slutty nun's discovered another source of seed.  You groan as warmth and stimulation make your orbs churn and slosh, growing not just in size but also in raw, animal NEED.  Driven to near madness by the drunken fox's delicious backside and the building, backed-up cum in your sack, you grab hold of Urta with both hands and start jackhammering her asshole`
        );
        if (y != -1) this.outx(" and pussy");
        this.outx(", pounding the lithe fox as if your life depended on your orgasm.\n\n", false);

        this.outx(
            "Scylla's fingers don't stop their assault, and as Urta's softening cock flops free of the nun's ruby lips, smearing them with jizz, the nun takes each of your distended nuts between her palms, one at a time, and rubs it until you can feel the cold floor pressing against their over-sized bulk.  Urta's flagging cock reacts to the repeated strikes you're giving her prostate by returning to full hardness, though you wonder if Scylla's magic had a part in it as well.  Regardless, the nun lifts her habit to expose one lipped, milk-leaking nipple and slides the fox's girth inside.  Urta's eyes roll back and she begins to babble incoherently, the massive orgasm, followed by anal penetration and nipple-fucking, just too much for her poor battered psyche.\n\n",
            false
        );

        this.outx(
            "You cum, hard enough to make you cross your eyes and slam Urta's hips into you with painful force, even through the padding of her supple buttcheeks.  The first ass-filling wave of jism completely packs her backdoor, surrounding you in a sea of your own sticky moisture.",
            false
        );
        if (y > -1)
            this.outx(
                `  Meanwhile, your other ${Appearance.cockNoun(
                    this.player.cocks[y].cockType
                )} utterly fills her womb, stuffing it so completely that the fox's belly rounds out.`
            );
        if ((this.player.cockTotal() > 1 && y == -1) || this.player.cockTotal() > 2)
            this.outx(
                "  A wave of the stuff splatters her back, glazing her from the shoulder-blades to the crack of her ass and nearly catching you in the chin. Maybe there is such a thing as too many cocks?",
                false
            );
        this.outx(
            `  Scylla's hands rub the fox's belly tenderly as she humps away at the lewd nun, using whatever magic she has to ensure you won't damage the drunken vixen as you continue to push larger and larger amounts of semen into her.  After three more blasts, she runs out of room inside her, and it starts squirting back out with each fresh stroke, soaking your waist, ${this.player.legs()}, and rapidly shrinking balls.  You lose track of time, knowing only the pleasure of orgasm and the feeling of your own spooge pumping into your lover until the unholy cumsplosion finally ends.\n\n`,
            false
        );

        this.outx(
            "You regain your wits to the sight of a very pregnant-looking Urta and Scylla leaning on each other and trying to make their way to a water barrel to clean up.  The vixen is so full she looks like a mother in her ninth month of pregnancy with triplets, but as she starts to clean up Scylla gently presses on the fox's belly and devours the cum she squeezes out.  Urta shakes, but doesn't emit a sound beyond a few strangled half-moans of pleasure.  If the fresh horse-cum soaking the nun's habit is any indicator, Urta must have gotten off again during your orgasm.  Wild!\n\n",
            false
        );

        this.outx(
            `You grab a rag and wipe up before donning your ${this.player.armorName}.  Urta saunters over, looking like she's sobered up quite a bit.  She's got `
        );

        if (this.urtaLove())
            this.outx(
                "a contended smile on her face, and gives you a long, slow kiss that practically radiates her love for you.",
                false
            );
        else if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] < 11)
            this.outx(
                "a nervous smile on her face, but gives you a quick peck all the same.",
                false
            );
        else
            this.outx(
                "a satisfied smile on her face, and crushes her lips against yours in a passionate kiss.",
                false
            );
        this.outx(
            "  She says, \"<i>I think I'll need to help Scylla to her room... somehow whatever she did to me must have pulled all the alcohol out of me and into my cum.  Don't worry, I'll ",
            false
        );
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00143] <= 1) this.outx("pay for the door and ");
        this.outx("make sure she's ok.</i>\"\n\n", false);

        this.outx(
            "Did her cock just twitch?  No, you scold yourself; it couldn't have, not after two orgasms like that.  Urta hooks her arm around the giggling nun's midsection and pulls the stumbling sister towards the doorway.  Scylla looks back at you and half-giggles, half-slurs, \"<i>Tee-hee, thish ish so much fun!  I love you guysh!</i>\"\n\n",
            false
        );

        this.outx(
            "You make your way out with your head low, but you do see Scylla and Urta walking up the stairs towards a truly private room.  They each look a little unsteady and neither of Scylla's hands can be seen, but you're sure they'll be ok.",
            false
        );
        this.player.orgasm();
        this.dynStats("lib", 1, "sen", 1, "cor", 0.5);
        // +luv
        this.urtaLove(3);
        // +comfort
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] += 3;
        this.player.cumMultiplier += 2;
        this.player.ballSize += 1;
        if (y >= 0) this.knockUpUrtaChance();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [No Scylla]
    private tellUrtaNoMoreScylla(): void {
        this.urtaSprite();
        this.outx("", true);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00147] = 1;
        this.outx(
            "You let Urta know that you're willing to overlook this, but that Scylla is a slippery slope that's best avoided.  She nods, a sober expression on her vulpine face.  Once you finish, she replies, \"<i>I understand, but you need to know – when 'it' gets too much for me to handle... if you aren't around to help I'm going to see Edryn.  S-she helps... if it wasn't for her I probably would've given up and done something stupid a long time ago.  What we have is more important, but unless we can get together every couple days I'll NEED to visit her.  ",
            false
        );
        if (this.urtaLove()) this.outx("Just please, don't doubt my love for you.  ");
        this.outx("Do I need to stop drinking too?");
        // [Drink More] [Drink Less] [No Change] [Leave Her]
        this.simpleChoices(
            "Drink More",
            this.tellUrtaToBeADrunkenHussy,
            "Drink Less",
            this.tellUrtaToStopBeingALush,
            "No Change",
            this.tellUrtaToStayTheSame,
            "Leave Her",
            this.leaveUrtaAfterScyllaConfrontation,
            "",
            undefined
        );
    }
    // [Scylla Okay]
    private tellUrtaMoreScyllaIsFine(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You give Urta a raunchy, lewd smile and let her know that you're okay with her 'helping' Scylla, and vice-versa, so long as they don't mind you popping in.  She smiles and gives you a wink, but her expression darkens after a moment of thought.  Urta interrupts to mention, \"<i>There's something else.  If I can't find you or Scylla and I NEED to cum, I'll have to visit Edryn.  She's probably the only thing that's kept me sane, and if you aren't around to help with my needs I'll visit her.  ",
            false
        );
        if (this.urtaLove()) this.outx("Just remember that YOU'RE the one I love, not her.  ");
        else
            this.outx(
                "Me and her, we've been partners in the guard for a long time, but the sex is just mechanical, to sate us.  You don't have to worry about her stealing me away.  ",
                false
            );
        this.outx(
            "But what about my drinking or how I get when I'm drunk?  It doesn't bother you, does it?",
            false
        );
        // [Drink More] [Drink Less] [No Change] [Leave Her]
        this.simpleChoices(
            "Drink More",
            this.tellUrtaToBeADrunkenHussy,
            "Drink Less",
            this.tellUrtaToStopBeingALush,
            "No Change",
            this.tellUrtaToStayTheSame,
            "Leave Her",
            this.leaveUrtaAfterScyllaConfrontation,
            "",
            undefined
        );
    }
    // [Leave Her]
    private leaveUrtaAfterScyllaConfrontation(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You sigh, letting her know that her behavior isn't something you'd want from someone you're in a relationship with.  You need someone you can trust.  Someone you can count on.  Someone who isn't so ruled by their body's lusts.  Tears well up in the fox's eyes as you go on, barely held back by her desire not to cause a scene.  When you finish she can't even look you in the eyes.  She stares down at her drink and whispers, \"<i>Goodbye...",
            false
        );
        if (this.urtaLove()) this.outx(" my love.");
        this.outx('</i>"\n\n', false);

        this.outx(
            "The bar seems eerily quiet as you step away from her, but it had to be done.",
            false
        );
        this.urtaLove(-100);
        this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] = -1;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Drink More]
    private tellUrtaToBeADrunkenHussy(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx("You ");
        if (this.player.cor < 33) this.outx("blush a little bit");
        else if (this.player.cor < 66) this.outx("smile nervously");
        else this.outx("grin widely");
        this.outx(
            ` and explain that when she gets drunk, lets her guard down, and gets a little more aggressive... you like it.  A lot.  Her ears perk up at your words, though her expression is a little uncertain while you explain it.  By the time you finish, something warm brushes by your ${this.player.leg()} and gently 'thunks' the table.  Clearly she's as into the idea as you.\n\n`,
            false
        );

        this.outx(
            "Urta smiles, lewdly at first, though it carries a bit of a predatory glint as she waves down a waitress and orders a full bottle of Barkardi 151.  You give her a rueful smile, a stroke under the table, and a kiss just bursting with tongue before you conclude the conversation.  Urta's going to be a lot of fun from now on...",
            false
        );
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] = 1;
        this.dynStats("lus", 5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Drink Less]
    private tellUrtaToStopBeingALush(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx(
            "You sigh and explain that her alcoholism isn't helping anyone – not her and certainly not her relationships with others.  She nods with a knowing, sober look on her face as you recount how much harder her drinking has made your relationship.  She promises you that she won't ever get that drunk again, though she warns that it will be hard to swear off alcohol entirely.  A look of resolve enters her eyes, and she leans over the table to kiss you on the lips.  The two of you wrap up the conversation knowing that you've probably seen the last of drunken Urta.\n\n",
            false
        );
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Don't Change]
    private tellUrtaToStayTheSame(): void {
        this.urtaSprite();
        this.outx("", true);
        this.outx("You smile and ask her why you would ever want her to change?  You ");
        if (this.urtaLove()) this.outx("love");
        else this.outx("like");
        this.outx(
            " everything about her.  She blushes hard when you tell her that, clearly enjoying the flattery and thrilled to hear that you're okay with how she chooses to blow off steam when she's not on the job.  The two of you joke around for a little longer, but before long, it's time you were on your way.  Urta's STILL blushing as she gives you a good-bye kiss – you must have earned some points with her today!",
            false
        );
        // (+love score)
        this.urtaLove(5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private amilyXUrtaUrtaFallout(): void {
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00350] = 2;
        this.urtaSprite();
        this.outx("", true);
        this.outx("You ");
        if (!this.player.isTaur()) this.outx("pull up a chair");
        else this.outx("sit down");
        this.outx(
            ' at the table and stir Urta from whatever introspective thoughts she was lost in.  "<i>I fucked her,</i>" your well-endowed lover states out loud, looking up at you with bloodshot eyes.  "<i>Your mousey girlfriend came up here all fire and brimstone about you cheating on her, and somehow I wound up fucking her senseless,</i>" continues the disturbed vixen.  She pauses to take a dreg of some vile drink and mumbles, "<i>At first, we were pissed off at each other and at you.  So we sat down and bitched.  I was having a beer, and I guess Amily wanted to be sociable, so she got one too.  We bitched.  We bitched a lot.  But as the beers piled up, I realized I liked her... I liked her a lot.  I get why you\'d want to help her with her people.  Yet... as the night wore on, we both got pretty plastered.  I started getting myself stronger drinks so she wouldn\'t be the only one getting hammered, and well... I\'m... I\'m sorry.</i>"\n\n',
            false
        );

        this.outx(
            'Urta sobs, "<i>I\'m a monster.</i>"  Her emerald eyes fix on yours for a moment before returning to her drink, awaiting your reply.\n\n',
            false
        );

        this.outx(
            "(You can tell her that it's okay, and you're actually kind of glad that your girls are getting along in such a fun way.  Or, you could crush the bitch's heart for daring to fuck YOUR woman.)",
            false
        );
        // [It's Okay] [Heartbreak]
        this.simpleChoices(
            "It's Okay",
            this.itsOkayUrtaAmilyIsHot,
            "Heartbreak",
            this.crushUrtasHeart,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }

    // [It's Okay]
    private itsOkayUrtaAmilyIsHot(): void {
        this.outx("", true);
        this.urtaSprite();
        this.outx(
            "You reach out, grab Urta's shoulders, and look at her until she raises her face to look back at you.  Before she can look away, you tell her that it's fine - you had hoped your lovers would come to love each other as you do.  Urta wipes away a tear and gives you a nervous smile when you suggest that perhaps the three of you could get together sometime.\n\n",
            false
        );
        this.outx(
            "Once you've finished, Urta leans forwards and plants a salty, tear-stained kiss on your lips.  The two of you spend some more time bonding, before you realize you should probably check up on your camp and go.",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Heart asplosion]
    private crushUrtasHeart(): void {
        this.outx("", true);
        this.urtaSprite();
        this.outx(
            "You reach across the table and slap her arrogant muzzle so hard that you see her tears land on a nearby customer's sleeve.  Urta recoils, clutching a hand to her reddening cheek as she watches you with a shocked, sad expression.  You tear into her verbally, calling her a lush, a slut, and a traitorous bitch.  Each damning declaration causes the fox to flinch, as if struck by a switch, and you keep at it, determined to drive home how irrevocably she has fucked up.  You accuse her of trying to steal away your mouse-wife and proclaim her to be worse than the demons infesting the wastes around your camp.\n\n",
            false
        );

        this.outx(
            "Urta's lower lip quivers while tears stream down her face in an unimpeded river of sadness.  She drops her glass, the shattering explosion of sound coinciding with the ultimate breaking of her heart.  The fox stands up on wobbling knees and runs from the room sobbing.  You don't think she'll be a problem anymore.",
            false
        );
        this.urtaLove(-100);
        this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] = -1;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    public chastityBeltFun(cameFromSexMenu = true): void {
        // The intro to this scene is for when you pick the scene from Urta usual sex menu. Previous scene has a different intro.
        // Becomes available as a Sex Scene for Urta when she’s alone.
        this.clearOutput();
        if (cameFromSexMenu) {
            this.outx(
                "Eyeing your foxy lover, you tell her to lose the condom, you have something else planned.\n\n"
            );
            this.outx(
                "“<i>Lose it?  What do you have in mind?</i>” Urta asks.  She looks past you towards her cupboard.  “<i>Oh, no, not that belt!  ...Do you really enjoy seeing me make such a mess of myself when I finally get it off?</i>” she protests.\n\n"
            );
            this.outx(
                "You nod your head in affirmation, telling her it’s always quite a sight seeing her melting into a pile of pent-up jism, ready to blow.  And the results are also fun to watch, it’s not everyday you get to see a literal geyser of fox-cum erupting out of a horse-cock.  You also add that you’re always happy to help her clean up afterwards.\n\n"
            );
            this.outx(
                "“<i>And you ought to be, you cause the mess,</i>” Urta states, blushing fiercely and not able to look you in the eye. “<i>...Do you really find it that hot to watch me whimper and squirm and beg for you?</i>” she asks, so quietly it’s almost a whisper.\n\n"
            );
            this.outx(
                "You walk towards her bed and stroke her cheek, telling her she makes the cutest ‘puppy eyes’ you’ve ever seen.  Urta trembles, and, almost despite herself, her tail starts to wag, allowing the hesitantly erect pillar that is her huge horse-prick to bob back and forth in front of you.\n\n"
            );
            this.outx(
                "Smiling, you turn to pick up the belt and hand it over to her, uttering a single command, “<i>Put it on.</i>”  Urta discards her condom and hesitantly takes the offered belt, opening it; slowly she guides her erect shaft into the slot, stopping when her flared tip touches the padded entrance of the tube.  She looks at you, looking for some sort of guidance or confirmation that is really what you want.  You just shoot her a look of impatience.  With a sigh and a groan, she begins pushing her shaft into the rather tight tube.  Grinning mischievously you help her by going around her and pulling the belt all the way, eliciting a whimper from the herm-fox.\n\n"
            );
            this.outx(
                "“<i>N-no fair...</i>” she whimpers to you.  “<i>This is already so hard to put up with...</i>”  You tell her you were merely trying to help her, since she seemed to be having such a hard time putting it on... if she wants you can finish up for her.  She swallows audibly and nods her head, reaching back with one trembling hand to offer you the keys.  You try to take the keys from her, but she refuses to let go.  You cough, indicating that you can’t continue unless she lets go of the keys.\n\n"
            );
            this.outx(
                "“<i>Wha? Oh, sorry.</i>”  She blushes, hand trembling wildly before she visibly forces herself to drop the keys into your hand.  “<i>...Please don’t make me wait too long before using them, alright?</i>” she meekly asks.\n\n"
            );
            this.outx(
                "You reply that you don’t intend to... then quickly snap the the belt shut, snugly against her soft furry buttcheeks and twist the key in the lock, sealing Urta in her metaphorical jail.  Getting up you dangle the keys in front of her eyes and smile triumphantly, teasing her by telling her this is a wonderful pair of panties she’s wearing."
            );
        } else {
            // Follow up from previous scene, Urta needs to undress!
            this.outx(
                "Swallowing hard, Urta gives you a pleading look as if hoping against hope that you’ll change your mind.  You suddenly tell her to stop!  Urta stares at you, expression changing to one of joy, a wide grin so thankful it’s almost silly spreading across her face at the prospect of avoiding this.\n\n"
            );
            this.outx(
                "Seeing this, you laugh, telling her not to get her hopes up... you still want her to go on with it.  You just think the two of you should move into her bedroom.\n\n"
            );
            this.outx(
                "Urta throws you a look that combines an obvious tone of “you bastard” with a strong undertone that she’ll get you back for this, somehow.  Still, it doesn’t stop her from heading into the bedroom.  Once there, she looks at you, still hoping for one more chance at a last-minute reprieve.  Seeing that it’s not forthcoming, she sighs and resigns herself to her fate.\n\n"
            );
            this.outx(
                "Urta slowly and seductively peels off her dress until she’s standing naked before you.  When you make no effort to tell her to forget the belt, she sighs and turns around to step inside it; flashing you an excellent view of her ass and pussy as she pulls it up to her waist.  A little fidgeting and she manages to get her sizable yet still sheathed cock safely ensconced inside of it, clamping it shut and locking it, before flicking the keys to you, which you catch.\n\n"
            );
            this.outx(
                "Dangling the keys before her eyes teasingly, you watch as she lowers her guard for a moment, before you lunge forward and deliver her a passionate kiss, straight to her lips.  Urta eagerly returns the kiss, moaning throatily into your mouth as she embraces you.\n\n"
            );
            this.outx(
                "Stepping away with an evil grin, you tell her that she looks wonderful in her new ‘panties’."
            );
        }
        this.outx(
            "  Urta puts on a weak grin and tries to strike a pose, tail brushing low against the ground, one hand resting on an outstretched hip, ass flagrantly displayed at you despite its encumbering coverage.  “<i>Oh, do you think so?  It doesn’t make my bum look too big?</i>” she asks, blushing with embarrassment, which rather takes away from the air she’s trying to exude.\n\n"
        );
        this.outx(
            "You walk around her, looking her over; then deliver an echoing slap on her butt, groping it roughly as you tell her that her bum looks just perfect - Urta lets out a very vulpine yelp at the sudden spanking you just gave her.  Your other hand goes to her bushy tail, lifting and stroking it lovingly, as you enjoy its silky, fluffy feel.  Yes... she looks just perfect like this... you finish your sentence with a second slap on her other asscheek.\n\n"
        );
        this.outx(
            "Urta moans - is that a creak you hear from her chastity belt? - and then shivers.  “<i>You are such a flatterer,</i>” she says, looking abashed but unable to resist wagging her tail in delight at the compliments.\n\n"
        );
        this.outx(
            "You comment that you’re feeling thirsty and that she should fetch you something to drink, while you get comfortable.  Urta looks for a moment like saying something, but then goes to get you something to drink - she walks away in quite a funny manner, somewhat hunched over and awkwardly shuffling.  Her cock must be really straining against the padded interior of her belt; it’s throwing off her balance.\n\n"
        );
        this.outx(
            "While she’s away you proceed to strip off your clothes, fold them neatly and place then in a safe corner of the room.  While waiting for Urta to return, you strike a few poses on a nearby mirror, trying to find the best one for when your foxy lover returns.  Once satisfied, you lay on her bed and wait for her return.\n\n"
        );
        this.outx(
            "Urta returns, wobbling a little less; her erection must have started to subside or else she somehow got herself a little under control while she was gone.  She offers you a thick, cheap-looking clay mug.  “<i>I only have water; is that okay?</i>” she asks nervously.  She then catches sight of you and her eyes bulge out; she almost drops the mug, but manages to catch it before she spills more than half of its contents.\n\n"
        );
        this.outx(
            "You laugh inwardly... who knew teasing was so much fun?  You tell her water is fine and that she should bring it to you.  Urta just stares at you for a few moments, jolting back to reality when you repeat yourself.  Swallowing hard, she awkwardly advances towards you; you almost think you can see her meaty prick straining against the reinforced metal and leather of her chastity belt.  She really is hard-pressed to withstand temptation, even with that thing on.  Finally reaching you, she gingerly stretches out her hands to offer you the mug.\n\n"
        );
        this.outx(
            `You take the mug and tip on your mouth, purposely letting some spill, forming rivulets of water across your ${this.player.skin(
                true,
                false
            )}, ${
                this.player.hasBreasts()
                    ? "past your breasts and down"
                    : "down your chest and over "
            } your belly.  With a look of mock disappointment, you tell Urta you seem to have spilled some water, maybe she should take care of it?  Urta nods her head and immediately starts to head for a closet to fetch you a towel.  But you quickly stop her, by telling her that you want her to lick you clean.\n\n`
        );
        this.outx(
            "“<i>L-lick you!  What do I look like, an animal!?</i>” Urta snaps, indignantly, tail bristling in outrage.  You calmly remind her of her current predicament... and that you, alone, hold the keys to her freedom.  The fox-morph glares at you, growling deeply enough to remind you you’re basically teasing a fox the size of a human being.  You just smile back at her, confident she won’t hurt you.  She stares into your eyes levelly, but, seeing you won’t back down, finally gives in.  “<i>Oh, very well,</i>” she sighs, then tries her level best to sashay towards you.  “<i>You going to get on the bed? Or are you going to make me get down on my hands and knees?</i>” she huffs.  You merely ask her what does she think you’re going to do?\n\n"
        );
        this.outx(
            "Urta heaves a long suffering sigh and kneels down before you.  Gently taking hold of your [leg], she leans her head in and sticks out her long, broad tongue, running it gently up one running trail of water.  Despite her initial protests, Urta is very thorough, making sure she gets every little bit of moisture from your [skin], replacing the water with her saliva.  You enjoy both the treatment and the power you have over your fox-herm girlfriend immensely.  You congratulate her on her dedication by gently patting her head and stroking your hand along her hair and triangular ears.  At one point you realize that her tail is wagging... quite happily actually... making you question her earlier protests.\n\n"
        );
        this.outx(
            "When she finally hikes her way all the way up to your chin, you take a hold of her head and pull her into another deep kiss, invading her mouth with your [tongue], tangling and dancing with her own canine tongue, moaning into the kiss to excite Urta as best as you can.  Urta is eager to kiss you back, snaking her arms around the back of your neck in order to pull your face against hers.  Through the sounds of your kiss, you become aware of a faint but constant dripping sound.  Breaking the kiss, the two of you look at the floor; Urta’s cock might be physically restrained, but nothing’s stopping it from bubbling precum, which has pooled inside of her cock-tube and is now seeping through the padding and the leather to drip noisily onto the floor.  Urta blushes fiercely.  “<i>Well, I did say this wasn’t good for me - I’m too excited for it,</i>” she says, defending herself.\n\n"
        );
        this.outx(
            "Thinking quickly, you put your mug under her to catch the droplets of pre and suggest the two of you move into the bathroom?  Should be easier to clean up than her bedroom... The vixen nods dumbly at you, then actually takes the mug from your hands, holding it under her steady flow of pre and begins leading you towards what passes for the bathroom in this cheap little apartment of hers.\n\n"
        );
        this.outx(
            "Once there, you realize that the cup is close to overflowing and a wicked idea hits you.  Smiling smugly at Urta, you suggest that she should empty the cup... by drinking its contents!\n\n"
        );
        this.outx(
            "If you were expecting a protest, though, Urta surprises you.  She gives you the most sultry grin she can manage, lifts the glass to her lips, and starts to chug it down, audibly gulping swallow after swallow of hot jizz until the sizable mug is empty.  She looks you right in the eyes as she licks a small trickle of cum from either corner of her mouth, burping softly and gently before placing her fingers to her lips with an exaggerated giggle.  “<i>Satisfied?</i>” she asks with the vulpine equivalent of a purr.  After this little display... you reply that no, you aren’t.  In fact you’re feeling pretty hot now... Urta could-\n\n"
        );
        this.outx(
            "Urta interrupts you with a heave of exasperation.  “<i>If you want anything more from me, dear, you’re going to have to let me out of this thing before I explode,</i>” Urta tells you with a sense of urgency.  She taps one finger on the protrusion that holds her cock, which is now oozing a constant streamer of jizz to splat wetly onto the floor, for emphasis.  “<i>Lemme out of this thing before I wrestle you to the floor and take the keys - and if I gotta do that, I swear to Marae I will ram this cock of mine right up your ass and flood you with every last drop you’ve teased out of me!</i>” she vows.\n\n"
        );
        this.outx(
            "Okay... judging by her look you can tell that she intends to do just that if you refuse... so you tell her that’s fine.  You’ve had your fun and Urta certainly earned her freedom; considering the amount of cum leaking from her cock-prison... perhaps she should get in the shower?\n\n"
        );
        this.outx(
            "She nods eagerly and shuffles into the shower, pulling aside the cheap curtain and motioning you to follow her.  You quickly do and holding the extrusion containing her cock, you tell her to brace herself.\n\n"
        );
        this.outx(
            "With a quick twist of the key, you pull the belt off her as fast as you can, causing her erection to spring up and slap her on the belly as it finally erupts into a veritable geyser of cum, painting the walls, the ceiling and you and Urta both, in thick, hot, fox-cum.  Urta sighs hugely, visibly slumping with relief even as her cock continues to bulge and then geyser gush after gush of cum.  “<i>Ohhh... that feels so, so good, [Name],</i>” she tells you.  She just hangs her head and lets the waves of orgasm ripple through her, visibly bloated balls shrinking before your very eyes as they empty themselves of the pent-up frustration you’ve helped Urta accumulate.\n\n"
        );
        this.outx(
            "Wiping your face clean of the spunk, you tell Urta that this is indeed an impressive amount of cum... but perhaps a bath is in order now?  Urta nods, then puts a finger to her lips and thinks it over.  “<i>I oughta make you lick this off of me... but I’d rather a hot shower anyway,</i>” she declares.\n\n"
        );
        this.outx(
            "With a smile you turn the faucet and let the initially cold water rinse most of the cum off of your bodies.  You help Urta wash by gently massaging her fur, even rubbing yourself against your hot fox lover; then slowly grasping her still sensitive shaft and giving it a few good pumps.  Urta moans and thrusts her cock into your pistoning hand, managing to dredge up a few last sizable spurts of goo that splat wetly into the floor and are swiftly washed away down the drain.  She says nothing, simply looking deeply into your eyes while you help her clean herself down.\n\n"
        );
        this.outx(
            "Once done you ask her where you can get some towels?  “<i>In a cupboard, just there,</i>” Urta tells you, pointing to a small cupboard built into the wall of the bathroom.  Nodding, you quickly go fetch the towels, handing one to her as you begin drying yourself.  Once fully dried up, you look at Urta and realize that she’s still dripping wet.  You begin to form a question, when suddenly you realize the evil stare she’s giving you... before you can scream your protest, you watch as she braces herself on the wall and begins shaking herself, flinging wet droplets of water all over your, formerly, dry self.  Looking at you with as much innocence as she can muster, which is not much by the way, Urta says, “<i>What?  This is how I get dry!</i>”  You glare back at her as she does her best to stifle a laugh.\n\n"
        );
        this.outx(
            "You quickly dry yourself... again.  And then help Urta.  Urta struggles and protests at your efforts to dry her off, but accepts it.  Finally, she laughs and whips the towel off.  “<i>I don’t know if I hate you or love you for what you just put me through... but, all in all, I do love you, so... no hard feelings, okay?</i>”  She asks, giving you her most winning smile even as she approaches a tiny sink and takes up a comb, which she starts running through the tangles of her fur.\n\n"
        );
        this.outx(
            "Looking Urta over, her fur is in serious need of a good combing... especially her tail... you smile at her and ask if she has a spare comb?  Urta blinks, surprised, but takes up a second comb from the sink’s side and hands it over to you.  You gently take her tail in hand and begin combing through it, doing your best to deal with tangled fur without hurting Urta.  Urta lets out a quiet yelp of surprise, then growl-purrs in pleasure at your ministrations; she has to fight to keep from messing things up by wagging her tail.  She leans against you and combs her fur, allowing you sole responsibility for handling her tail.\n\n"
        );
        this.outx(
            "Finally done, you ask Urta to give you a little twirl.  Urta does as you ask, giving a quiet giggle as she does so.  “<i>How do I look?</i>” she asks.  As lovely as ever, you reply with a thumbs up.  Sadly... you need to get going soon... so you give your vulpine lover one last kiss, redress and start on your way back to camp."
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // This is intended to be a \"<i>tree</i>\" style conversation scene that replaces the default dialogue scene for Urta//
    // The option to go through these dialogue trees is played whenever the PC approaches Urta and she is not horny//
    // These scenes all use 1 hour and return the PC to the main Tel'adre menu screen when finished//
    // Approaching Urta:
    // (Regular Urta)
    private QBsTalkExpack(): void {
        this.clearOutput();
        this.urtaSprite();
        // (Lover Urta)
        if (this.urtaLove())
            this.outx(
                'When you approach Urta, she smiles to see you.  However, there is no rapid swivelling in her seat to avoid banging her horse-cock against the table; evidently she\'s not in the mood for some sex right now.  You sit down beside her, and she happily loops her arm around you, planting a tender kiss on your lips, before almost apologetically stating, "<i>Hey there, lover.  Want to talk for a change?</i>" with a twinkle of good-natured mirth in her eyes.'
            );
        else
            this.outx(
                'When you approach Urta, you are almost surprised at the lack of an audible \'thump\'.  Seeing your confusion, the herm fox quips, "<i>What\'s with the look?</i>" while raising an eyebrow.  When you indicate that you had expected to hear her demonstrating her excitement to see you, she blushes and looks embarrassed.  "<i>Well... you do a pretty good job of letting my little pony blow off some steam, ya know, [name]?</i>"'
            );
        // [Urta] [Edryn] [The Watch] [Back]
        this.urtaDialogueMenu();
    }

    private friendsTalkExpack(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            `You approack Urta's table and she motions for you to take a seat.  She finishes writing something on one of the pieces of paperwork scattered over the table, takes a sip of her drink and leans back in her chair.  “<i>Nice to see you again ${this.player.short}.  What can I do for you?</i>”`
        );
        this.urtaDialogueMenu();
    }

    public urtaDialogueMenu(): void {
        // choices("Urta",urtaDiscussesSelf,"Edryn",urtaDiscussesEdryn,"The Watch",urtaDiscussesTheWatch,"Alcoholism",urtaDiscussesAlcholism,"",0);
        this.menu();
        this.addButton(0, "Urta", this.urtaDiscussesSelf);
        this.addButton(1, "Edryn", this.urtaDiscussesEdryn);
        this.addButton(2, "The Watch", this.urtaDiscussesTheWatch);
        if (!this.urtaJustFriends()) this.addButton(3, "Alcoholism", this.urtaDiscussesAlcholism);
        if (this.flags[kFLAGS.KATHERINE_UNLOCKED] >= 4)
            this.addButton(5, "Katherine", this.urtaDiscussessKatherine);
        if (
            this.urtaPregs.urtaKids() > 0 &&
            this.player.hasKeyItem("Spare Key to Urta's House") < 0
        )
            this.addButton(4, "Visit Kids", this.urtaPregs.visitKidsFirstTime);
        else if (this.flags[kFLAGS.FIRST_TIME_AT_URTA_HOUSE] > 0)
            this.addButton(4, "Her House", this.urtaPregs.talkToUrtaAboutHerHouse);
        this.addButton(9, "Leave", this.camp.returnToCampUseOneHour);
    }

    // [=Urta=]
    private urtaDiscussesSelf(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx("You tell Urta you'd like to talk about her a little.");
        if (!this.urtaLove())
            this.outx(
                `“<i>You wanna talk about me?</i>” she asks${
                    this.urtaJustFriends() ? "" : ", blushing softly"
                }.  “<i>Well, there isn't THAT much to tell, but what do you want to know?</i>”   She seems surprisingly pleased to have the chance to talk.`
            );
        else
            this.outx(
                "“<i>Well, I don't think there's that much to tell,</i>” she says with a smile.  She idly blows a bang out of her face and exhales, “<i>Well, lover, I'm an open book for you, what do you want to know?</i>”"
            );
        // [Family] [Sex/Romance] [Employment] [Prejudice]
        if (this.urtaJustFriends())
            this.simpleChoices(
                "Flirt",
                this.flirtWithUrta,
                "Employment",
                this.urtaDiscussesEmployment,
                "Prejudice",
                this.urtaDiscussesPrejudice,
                "",
                undefined,
                "Back",
                this.urtaDialogueMenu
            );
        else if (this.flags[kFLAGS.URTA_QUEST_STATUS] == 0.5)
            this.simpleChoices(
                "Infertility",
                kGAMECLASS.urtaQuest.infertilityQuestions,
                "Romance&Sex",
                this.urtaDiscussesSexAndRomance,
                "Employment",
                this.urtaDiscussesEmployment,
                "Prejudice",
                this.urtaDiscussesPrejudice,
                "Back",
                this.urtaDialogueMenu
            );
        else if (this.flags[kFLAGS.URTA_QUEST_STATUS] == 1)
            this.simpleChoices(
                "Fertility",
                this.urtaFertilityDiscussion,
                "Romance&Sex",
                this.urtaDiscussesSexAndRomance,
                "Employment",
                this.urtaDiscussesEmployment,
                "Prejudice",
                this.urtaDiscussesPrejudice,
                "Back",
                this.urtaDialogueMenu
            );
        else
            this.simpleChoices(
                "Family",
                this.urtaDiscussesFamily,
                "Romance&Sex",
                this.urtaDiscussesSexAndRomance,
                "Employment",
                this.urtaDiscussesEmployment,
                "Prejudice",
                this.urtaDiscussesPrejudice,
                "Back",
                this.urtaDialogueMenu
            );
    }

    public flirtWithUrta(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == -1) {
            // In friends mode
            this.outx(
                "You ask Urta if, living in Tel'Adre, it's easier to resist the powerful feelings that come from living in this world.\n\n"
            );
            this.outx(
                "“<i>I've lived here my whole life, so I don't have anything else to compare with.  What do you mean by 'feelings'?</i>”\n\n"
            );
            this.outx(
                `You tell her that in your world you never felt a deep urge to strip off all your clothes and ${
                    this.player.cor < 75 ? "make sweet love to" : "slake your lust on"
                } the nearest person.\n\n`
            );
        } else {
            this.outx(
                "You tell her that you don’t have any problem with herms, in fact you find some of them quite attractive.\n\n"
            );
            this.outx(
                "Urta gulps down a bit more of her booze and you decide to have a little fun.  "
            );
        }
        this.outx(
            `You quietly slide your ${
                this.player.isNaga() ? "tail" : "foot"
            } across under the table and rub it against the inside of her leg.  Urta practically jumps out of her seat, then tries to pretend nothing happened.\n\n`
        );
        this.outx(
            `You’re pretty sure most of the bar noticed, but you don’t care.  You keep rubbing and feel a thump as something large smacks against the underside of the table.  Urta drains the last of her drink and whispers, “<i>${
                this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == -1
                    ? "What about Kath?  I... I wouldn't..."
                    : "Please - it’s so hard..."
            }</i>”\n\n`
        );
        this.outx(
            `You never find out exactly what she was going to say.  When you start to rub your ${
                this.player.isNaga() ? "tail" : "foot"
            } in little circles against the root of her huge cock Urta loses her train of thought and just leans back in her chair, trying to keep from spraying her pent up cum across the floor.\n\n`
        );
        this.outx(
            `You ease up so she has a chance of understanding what you’re saying.  “<i>${
                this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] == -1
                    ? "I'll explain everything to Kath.  You want this as much as I do, right?"
                    : "Yes, some chicks, with their big dicks, just do it for me."
            }</i>”  You slide ${
                this.player.isNaga() ? "the tip of your tail" : "your toes"
            } a little lower and start moving it in little circles against her balls.\n\n`
        );
        this.outx(
            "Before Urta pops you get up from the table and tell her to meet you out back, right where things went off the rails that first time.  Urta nods eagerly and the edge of the table rises slightly.\n\n"
        );
        this.outx(
            "You wait outside, hiding in a shadowy corner.  You got Urta so excited that it’s a good fifteen minutes before she throws open the back door of the bar.  She looks hungry, yet unsure.  You’re guessing she’s had such terrible experiences with people in the past that despite your obvious interest she still can’t believe you want her.\n\n"
        );
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = 0; // urtaFuckHer will raise it to 1
        this.flags[kFLAGS.URTA_PC_LOVE_COUNTER] = 0; // Reset both flags to put Urta back to her 'never met you before' state, ready for her first fuck
        this.urtaFuckHer(true); // Call urtaFuckHer() to put you on track for much Urta loving
    }

    private urtaFertilityDiscussion(): void {
        this.clearOutput();
        this.outx(
            'Urta traces a finger around the corner of her drink, "<i>So, what do you think, [name]?'
        );
        if (this.flags[kFLAGS.URTA_FERTILE] == 1) this.outx("  Should I stay fertile?");
        else
            this.outx(
                "  How about I cut loose and go fertile?  Can you imagine me with a nice, round pregnant belly and a cock virile enough to get you pregnant just from looking at it?"
            );
        if (this.flags[kFLAGS.URTA_PREG_EVERYBODY] == 1)
            this.outx(
                "  Or did you come to ask me not to be fertile and virile around anyone else?"
            );
        else {
            this.outx(
                "  Would you mind me being able to put a bun in Edryn's oven?  Imagine all the lil foxtaurs running around!"
            );
            if (this.flags[kFLAGS.EDRYN_NUMBER_OF_KIDS] > 0)
                this.outx("  After all, you already had a turn!  Fair's fair!");
        }
        this.outx('</i>"  She winks at you before blowing you a playful raspberry.\n');
        this.menu();
        if (this.flags[kFLAGS.URTA_FERTILE] == 1) {
            this.outx("\n<b>Urta is currently fertile.</b>");
            this.addButton(0, "No Fertile", this.urtaFertilityToggle);
        } else {
            this.outx(
                "\n<b>Urta can not currently get pregnant (or inseminate anyone, let alone you).</b>"
            );
            this.addButton(0, "Go Fertile", this.urtaFertilityToggle);
        }
        if (this.flags[kFLAGS.URTA_PREG_EVERYBODY] == 1) {
            this.outx(
                "\n<b>Urta thinks you're okay with her 'sharing the love (and kids)' with any other sexual partners she might have.</b>"
            );
            this.addButton(1, "No Preg", this.urtaPregOthersToggle);
        } else {
            this.outx(
                "\n<b>Urta will not knock up or be knocked up by anyone else unless you tell her otherwise.</b>"
            );
            this.addButton(2, "Share Preg", this.urtaPregOthersToggle);
        }
        this.outx(
            "\n\n<b>(Note: There is no content for Urta to impregnate or be impregnated by other NPCs, yet.)</b>"
        );
        this.addButton(4, "Back", this.urtaDialogueMenu);
    }

    private urtaFertilityToggle(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.URTA_FERTILE] == 1) {
            this.outx(
                '"<i>Well, I guess that\'s okay.  But you better make it worth my while later, okay?</i>" Urta says with a half-hidden sigh.'
            );
            this.flags[kFLAGS.URTA_FERTILE] = 0;
        } else {
            this.outx(
                'Urta throws her hands up and cheers, "<i>Yesss!</i>"  Realizing that everyone is looking over at the two of you now, she gives a sheepish smirk and glances back at you.  "<i>I can\'t wait!</i>"'
            );
            this.flags[kFLAGS.URTA_FERTILE] = 1;
        }
        this.menu();
        this.addButton(0, "Back", this.urtaFertilityDiscussion);
    }

    private urtaPregOthersToggle(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.URTA_PREG_EVERYBODY] == 1) {
            this.outx("\"<i>Awww, are you sure?  Wouldn't you like ");
            if (this.player.hasCock())
                this.outx(
                    "to help me make Edryn's belly bloat with our seed, and then play 'Guess Who Is The Father'?"
                );
            else if (this.player.hasVagina())
                this.outx(
                    "to have me get the both of you pregnant at the same time, so we can all enjoy it together?"
                );
            else this.outx("see me put this thing to work in the way that it's meant to?");
            this.outx('</i>" Urta says, giving you a playful pinch.');
            this.flags[kFLAGS.URTA_PREG_EVERYBODY] = 0;
        } else {
            this.outx(
                'Urta smiles salaciously, like a cat that got the cream.  Then, without warning, she kisses you square on the lips, passionately frenching you.  After nearly a full minute of frenzied kissing, she says, "<i>This is gonna be fun!</i>"'
            );
            this.flags[kFLAGS.URTA_PREG_EVERYBODY] = 1;
        }
        this.menu();
        this.addButton(0, "Back", this.urtaFertilityDiscussion);
    }

    // [=Edryn=]
    private urtaDiscussesEdryn(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx("You think for a moment, then tell her that you have questions about Edryn.");
        if (!this.urtaLove())
            this.outx(
                `\n\nUrta glances at you, eyes growing a little dark.  "<i>Sure, I guess I can tell you some things, but you really should just ask her,</i>" she says${
                    this.urtaJustFriends()
                        ? "."
                        : ", sounding... well, you think she sounds a little jealous."
                }`
            );
        else
            this.outx(
                '\n\n"<i>I don\'t need to worry about her stealing you away from me, do I, lover?</i>" the gray fox teases.  She smirks knowingly and continues, "<i>I\'m joking, though she is a hottie, isn\'t she?  What do you want to know?</i>"'
            );
        // [History Together] [Working Together] [Romance?]
        const discussRomance = this.urtaJustFriends() ? undefined : this.urtaDiscussesEdrynRomance;
        this.simpleChoices(
            "History",
            this.urtaDiscussesEdrynHistory,
            "Working",
            this.urtaDiscussesWorkingWithEdryn,
            "Romance",
            discussRomance,
            "",
            undefined,
            "Back",
            this.urtaDialogueMenu
        );
    }

    // [=The Watch=]
    private urtaDiscussesTheWatch(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx("You tell Urta that you have a few questions about the Tel'Adre city watch.");
        if (!this.urtaLove())
            this.outx(
                '\n\nUrta perks up at that, her spine stiffening with obvious pride as she takes a hearty swig of her drink.  "<i>What do you want to know?</i>" she asks happily.'
            );
        else
            this.outx(
                '\n\nUrta stiffens proudly, unintentionally thrusting her chest forward before realizing the show she\'s making of her own cleavage.  She colors and asks, "<i>What do ya wanna know?</i>"'
            );
        // [Membership] [Role in the city] [Crime & Punishment] [Reach of the Watch] [Interesting Cases]
        this.choices(
            "Membership",
            this.urtaDiscussesWatchMembership,
            "Role",
            this.urtaDiscussesWatchRole,
            "Crime",
            this.urtaDiscussesCrimeAndPunishment,
            "Reach",
            this.urtaDiscussesTheWatchsReach,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined,
            "Back",
            this.urtaDialogueMenu
        );
    }

    // [=Alcoholism=]
    // To get this scene, the player must have spoken to Urta at 13 or 14 hours at least once; agreeing to the sex is not necessary//
    // This dialogue can only be had once//
    private urtaDiscussesAlcholism(): void {
        this.clearOutput();
        this.urtaSprite();
        if (
            this.flags[kFLAGS.DISCUSSED_URTA_ALCOHOLISM] == 0 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00145] == 0
        ) {
            this.outx(
                'You quietly inform Urta that you and she need to talk about her drinking habit.  She swallows nervously and insists, "<i>I - I only drink to try and keep my cock under control.</i>"'
            );
            this.outx(
                "\n\nYou point out that her actions clearly belie that statement - she would never ask you to jerk her off in public or let her fuck your ass in the middle of the bar when sober.  Urta flinches at your words, "
            );
            if (this.player.cor < 33)
                this.outx("and you feel a little bad for putting her through this");
            else if (this.player.cor < 66)
                this.outx("and you would feel bad if this talk weren't necessary");
            else this.outx("but you don't let up for a moment");
            this.outx(
                ".  You insist that you aren't upset with her, that you're not blaming her for anything, but you need to talk to her about this matter."
            );
            this.outx(
                "[pg]Urta refuses to meet your eye for several long minutes.  Nervously, she begins tapping one clawed finger on the table.  \"<i>I... okay.  The truth is that I did start drinking originally in the hopes it would make my erections subside and make me harder to arouse.  As you've seen, it doesn't work like that - truth be told, I'm kind of a horny drunk.</i>\""
            );
            this.outx("[pg]You ask why, then, she does it - why does she keep drinking?");
            this.outx(
                '[pg]"<i>Because it\'s an excuse for me to cut loose, alright?</i>" she barks indignantly.  Now she meets your eyes, staring into them with defiance.  "<i>I work day in and day out to keep this city from falling apart, and the whole time, I have to deal with this... this thing between my legs, undermining everything I say.  '
            );
            if (this.urtaLove()) this.outx("Lover");
            else this.outx("Cutey");
            this.outx(
                ", you don't know what I've been through.  In here, when I'm off the clock, I can just have a bottle, hang out with my friends, and kind of... just... bask in everyone else's happiness.  It's not much, but it's better than sitting at home, bored and lonely.</i>\""
            );
            this.outx(
                '[pg]She finally ceases her rambling dialogue and sighs loudly, shaking her head.  "<i>Maybe it was a bad idea, but it was my idea, you know?</i>"  Then, she looks up at you, gently.  "<i>Besides, I got to meet you, didn\'t I?  Even with all the bad, I gained you for a '
            );
            if (!this.urtaLove()) this.outx('friend.</i>"');
            else
                this.outx(
                    "lover.  I don't think I've ever had anyone accept me like you have - even Edryn kind of holds back from me.  You... you're different.  Maybe it's because you're an off-worlder, I don't know, but meeting you has been the best thing to happen to me since I joined the guard.  Honestly... I feel like I could probably stop - I don't really need it anymore, though I do seem to wind up having a lot of fun when I do.</i>\""
                );
            this.outx(
                "[pg]Urta falls silent, waiting for you to speak.  Will you tell her to start drinking less?  Will you tell her that you are fine with her drinking habits, now that she's explained her startling change in behavior and her reasons for doing so?  Will you break up with her if she's that much of an alcoholic? Or do you want her to drink even more - perhaps you find her so much more fun to be with when she's blink stinking drunk?"
            );
            // [Drink More] [Drink Less] [No Change] [Break Up]
            this.simpleChoices(
                "Drink More",
                this.urtaDiscussAlcoholDrinkMore,
                "Drink Less",
                this.urtaDiscussAlcoholDrinkLess,
                "Be Yourself",
                this.urtaDiscussAlcoholNoChange,
                "Break Up",
                this.breakUpWithTheBitchOverAlcoholism,
                "",
                undefined
            );
        } else {
            this.outx(
                'You tell Urta that you want to discuss her newfound drinking habits.  The grey-furred fox-morph meets your gaze calmly.  "<i>Really?  What more do you have in mind?</i>" she asks.'
            );
            if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] == 1)
                this.outx(
                    "  \"<i>I can't drink any more than I already do - I'm kind of pushing the laws to drink as much as I do already.</i>\"  She burps loudly, then starts on another bottle."
                );
            else if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] == 0)
                this.outx(
                    "  \"<i>You said you didn't mind me drinking as much as I do... are you going to ask me to cut down?</i>\" she asks, calmly and clearly assuming that's what you intend."
                );
            else
                this.outx(
                    "  \"<i>I said it before, I'll say it again, I'm not going to stop drinking entirely - there's nothing wrong with a few cold ones to take the edge off.  I don't drink myself stupid any more; that should be enough for you,</i>\" she replies, defensively."
                );
            this.simpleChoices(
                "Drink A Lot",
                this.urtaDiscussAlcoholDrinkMore,
                "Drink A Little",
                this.urtaDiscussAlcoholDrinkLess,
                "Be Yourself",
                this.urtaDiscussAlcoholNoChange,
                "Break Up",
                undefined,
                "",
                undefined
            );
        }
    }

    // [=Drink More=]
    private urtaDiscussAlcoholDrinkMore(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "You blush a little bit and ask why she thinks you want her to drink LESS.  She stares at you quizzically and your blush deepens as you explain that when she gets drunk, lets her guard down, and gets so aggressive, you... well, you like it.  A lot.  Her ears perk up at your words, though her expression is a little uncertain while you explain it.  By the time you finish, something warm brushes by your leg and gently 'thunks' the table.  Clearly, she's as into the idea of encouraging her unrestrained, carefree self as you are."
        );
        if (this.pregnancy.type == PregnancyStore.PREGNANCY_PLAYER) {
            this.outx(
                "\n\nUrta smiles, gently at first, though it carries a bit of a predatory glint by the time she waves down a waitress and orders a full bottle of non-alcholic beer.  You give her a rueful smile, a stroke under the table, and a kiss just bursting with tongue before you conclude the conversation.  Urta's chuckles, \"<i>After the baby I'll be sure to have a little liquid motivation on hand.</i>\""
            );
        } else {
            this.outx(
                "\n\nUrta smiles, gently at first, though it carries a bit of a predatory glint by the time she waves down a waitress and orders a full bottle of Barkardi 151.  You give her a rueful smile, a stroke under the table, and a kiss just bursting with tongue before you conclude the conversation.  Urta's already half-way through the bottle of alcohol by the time you reach the door - you have a feeling the fox-herm's going to be a lot of fun from now on..."
            );
        }
        // {clear Urta sex cooldown}
        // {Boozehound Urta tag flagged}
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] = 1;
        this.flags[kFLAGS.DISCUSSED_URTA_ALCOHOLISM] = 1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [=Drink Less=]
    private urtaDiscussAlcoholDrinkLess(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "You sigh and explain that her alcoholism isn't helping anyone – not her and certainly not her relationships with others.  You're not going to hold what she does when she's that drunk against her, but you really don't think it's healthy for her to get like that.  You promise her you'll try and be more supportive as well.  She nods, her expression knowing and somber, and she promises you that she'll cut back - enough that you won't see her get drunk like she used to anymore. She does warn you again that she doesn't intend to stop entirely - a few cold brews from time to time won't hurt anyone"
        );
        if (this.pregnancy.type == PregnancyStore.PREGNANCY_PLAYER) {
            this.outx(", once she's not pregnant anymore, of course");
        }
        this.outx(
            ".  Her eyes glitter with steely resolve, and she leans over the table to kiss you on the lips.  The two of you wrap up the conversation, with you hoping that you've seen the last of drunken Urta."
        );
        // {Sober Urta tag flagged}
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] = -1;
        this.flags[kFLAGS.DISCUSSED_URTA_ALCOHOLISM] = 1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // =No Change=]
    private urtaDiscussAlcoholNoChange(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "You smile and ask her; why you would ever want her to change?  You like everything about her, including whatever she thinks she should drink.  You merely wanted to know why she changes so much when drunk - indeed, you think it's actually kind of thrilling to see her like that; you just prefer to know which is the real her.  She blushes hard when you tell her that, clearly enjoying the flattery and thrilled to hear that you're okay with how she chooses to blow off steam when she's not on the job.  The two of you joke around for a little longer, but before long, it's time you were on your way.  Urta's STILL blushing as she gives you a goodbye kiss – you must have earned some points with her today!"
        );
        // {bonus wuv points}
        if (this.flags[kFLAGS.DISCUSSED_URTA_ALCOHOLISM] == 0) this.urtaLove(1);
        this.flags[kFLAGS.DISCUSSED_URTA_ALCOHOLISM] = 1;
        // {No new tags flagged}
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] = 0;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [=Break Up=]
    private breakUpWithTheBitchOverAlcoholism(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "You sigh, letting her know that her behavior isn't something you'd want from someone you're in a relationship with.  You need someone you can trust.  Someone you can count on.  Someone who isn't so ruled by their body's lusts.  Tears well up in the fox's eyes as you go on, barely held back by her desire not to cause a scene.  When you finish, she can't even meet your gaze.  She stares down at her drink, a tear rolling softly down her muzzle and dripping forlornly onto the table, and whispers, \"<i>Goodbye...</i>\""
        );

        this.outx(
            "\n\nThe bar seems eerily quiet as you step away from her, but it had to be done."
        );
        // {Urta is Heartbroken}
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Talk About Urta dialogue scenes:
    // [=Family=]
    private urtaDiscussesFamily(): void {
        this.clearOutput();
        this.urtaSprite();
        if (!this.urtaLove()) {
            this.outx(
                "You tell Urta that you'd like to learn about her family.  What are her parents like?  Does she have any siblings?  Is she the only hermaphrodite in the family?"
            );
            // (Regular
            if (!this.urtaLove()) {
                if (this.flags[kFLAGS.URTA_FAMILY_TALK_ATTEMPTS] == 0)
                    this.outx(
                        '\n\nUrta winces, eyes starting to grow damp with unshed tears.  However, then she stares at you fiercely.  "<i>I don\'t want to talk about them,</i>" she growls.'
                    );
                else
                    this.outx(
                        "\n\nShe gives you a cold stare, making it quite clear she's still not inclined to discuss them.  Whatever the story is, it must be pretty painful."
                    );
            }
            // (Lover, First Time:
            else {
                if (this.flags[kFLAGS.URTA_FAMILY_TALK_ATTEMPTS] == 0)
                    this.outx(
                        '\n\nUrta sighs softly, closing her eyes sadly.  She stares fixedly into her glass.  "<i>Please... not that. I\'ll talk about anything else, but not that,</i>" she tells you.'
                    );
                // (Lover, Subsequent:
                else
                    this.outx(
                        "\n\nUrta shakes her head slowly.  \"<i>No.  It's... a painful topic - one I'd rather forget than relive.</i>\""
                    );
            }
            this.outx("\n\nYou apologize and change the topic.");
            // [The other Urta dialogue option buttons appear at the bottom of the screen]
            this.urtaDialogueMenu();
        } else {
            kGAMECLASS.urtaQuest.talkWithUrtaAboutFamFam();
        }
    }

    // [=Sex/Romance=]
    private urtaDiscussesSexAndRomance(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx("You ask Urta if she'll tell you her romantic & sexual history.");
        if (!this.urtaLove())
            this.outx(
                '\n\n"<i>What?</i>" Urta asks, stalling for time.  She casts her eyes back and forth nervously before teasing you with feigned confidence, "<i>I guess you want to make sure that you\'re just not another notch on my bedpost, huh?</i>".'
            );
        else
            this.outx(
                "\n\n\"<i>Lover, you fuck me 'til I'm satisfied, and then, you want me to recount my sexual exploits?  I thought I had a one track mind!</i>\" Urta jokes with you."
            );
        this.outx(
            "\n\nYou smile it off and then insist that you want to know the details, all the same."
        );
        this.outx(
            "\n\nUrta goes to drink her glass, realizes it's empty, then sighs and fills it up, gently swishing the contents from side to side.  \"<i>Honestly... there's not really that much to say.  I just don't have a lot of experience in that department.  Not until I met you.</i>\""
        );
        this.outx(
            "\n\nYou tell her that you can't believe that; how can someone as popular as her not have a list of conquests?"
        );
        // (Regular:
        if (!this.urtaLove())
            this.outx("\n\nUrta looks at you in pleased shock, blushing fiercely.");
        else
            this.outx(
                '\n\nUrta gives a startled laugh. "<i>You really are too sweet, you know?</i>"'
            );
        this.outx(
            "  She takes a small sip from her glass, then speaks.  \"<i>In spite of that, the truth is... I've always been an outcast in the romance department...  I mean, I've had my share of crushes, but they've always wound up biting me in the ass.  Being a herm growing up wasn't easy.</i>\"  She sighs wistfully.  \"<i>I still remember my first crush.  He was a fox-morph, like me, only he had gorgeous red fur.  I'd been able to hide my... 'extra' parts from the other kids up until then, but, well, I didn't exactly have much in the way of tits yet, you know?  So, I got the shock of my life when he asked me out on a date - ME! It wasn't anything fancy, he just took me out for lunch and a little walk around, but it was still so wonderful nice.  It was lovely, at first...</i>\""
        );
        this.outx(
            "\n\nShe takes a big swig from her glass this time, holding it aloft as she swallows a bit of liquid courage.  You ask, politely, when it was that she shared her secret."
        );
        this.outx(
            '\n\n"<i>I didn\'t - IT did.</i>"  She scowls and mutters, "<i>The date was over, and when he pushed me against a wall for a kiss... I was so surprised, and he was so pretty!  Not to mention, it was my first kiss, so, well... I lost control of myself, you know, like I do.  I popped the biggest boner of my young life, jabbed him right in the belly with my dick.  He jumped back from me like I was a demon, demanding to know what it was.  I tried to explain things, but he wouldn\'t hear it...</i>"  Her expression sinks, sorrowfully.  "<i>He started insulting me, my mother, and... and... I was crying so hard I barely heard him. It wrecked me.  I must have thrown up four or five times in that alley before I could stop crying and get out of there.  I... I never wanted to go through that again.</i>"'
        );
        this.outx(
            '\n\nUrta manages to give you a sad smile.  "<i>I guess, in the end, I\'m better off - I think I can appreciate having someone like you that much more thanks to assholes like him.</i>"'
        );
        this.outx(
            "\n\nShe fortifies herself with another drink.  \"<i>Things only got worse after that - he wasted no time in letting the other guys know about my 'maleness'.  I didn't exactly have a lot of friends before that, but after they found out I was a hermaphrodite, no guy would dare come near me.  Even the other girls stayed away.  I was one of the first herms, so there wasn't anyone else like me, and no one really knew how to handle people like me.  The few boys who did get interested got chased off by the other guys taunting them about being gay, or perverts, or whatever.  There was one guy who didn't seem to care...</i>\"  She scowls fiercely and grumbles, \"<i>It turned out he was gay, and when he found out I had a pussy and burgeoning breasts, he left me for some butch, bulldog-looking dude.  Fucking sissy bitch.</i>\"  She angrily slams down the remnants of her drink, then pours herself a new one."
        );
        this.outx(
            "\n\nYou ask if she ever thought of trying it with girls after that, seeing as how the boys didn't seem to want her."
        );
        this.outx(
            "\n\n\"<i>Well, I guess,</i>\" Urta mumbles. She idly traces the rim of her glass with one fingertip. \"<i>I suppose you could call me a bisexual, now at least, but that's mostly because I've learned to take what I can get when it comes to pleasure.  I've always liked guys, and them being a forbidden fruit for so long certainly hasn't helped.  Having both sets of parts though... it makes it hard.  Some folks just find it hard to like both parts equally in general, guys generally don't want to suck me off, and girls usually aren't keen on servicing my pussy, not with my balls on their forehead...</i>\"  She looks embarrassed.  \"<i>Sorry, it's easy to get sidetracked about this stuff, you know?  Anyway, girls!  I've had a few dalliances, but by then I had this... this monster-cock.  It interested a few, but nobody ever actually wanted to take it INSIDE them once they saw just how big it really was in person.  Can't say I blame them that much, I gotta admit I got a real pussy-stretcher here...  I got a few handjobs, maybe a blowjob or two, but that was it.  Most of my girlfriends didn't stick around.</i>\""
        );
        // IF ADMITTED TO EDRYN BONING:
        if (this.urtaOpenAboutEdryn())
            this.outx(
                "\n\nThe pensive fox-girl trails off and then looks at you, contemplatively, before beginning to speak again.  \"<i>I have to admit... Edryn... she took my cock's virginity.  She's really been my only friend that's equipped to handle it, and from time to time... we take care of each other.  Even then, we're more friends with benefits than anything else.  We get along great, but we just don't click romantically.  The sex is good, but we roll apart and get back to work.</i>\""
            );
        this.outx(
            "\n\nShe looks at you, then, her eyes fixed on yours.  \"<i>When I saw you walk into the city, alone and vulnerable, I thought you might be a kindred spirit, and well, I thought you were kind of cute too.  I had to hurry away to the Wet Bitch because I couldn't stop thinking about having sex with you, throwing you against the wall and fucking you.  I didn't want to scare you away like all the others by showing you my cock.  Yet, you followed me, and you didn't care that I was a herm, and, well, you were there for the rest.</i>\""
        );
        this.outx(
            "\n\nIt's quite clear that she's finished telling you everything she has to say on the subject.  You could just leave it at that and go, or you could take advantage of what she's been talking about and see if you can get her all hot and bothered under the collar."
        );
        if (this.player.inte < 20) this.dynStats("int", 0.5);
        if (this.player.inte < 40) this.dynStats("int", 0.5);
        if (this.player.inte < 60) this.dynStats("int", 0.5);
        this.urtaLove(0.5);
        // [Leave] [Tease]
        this.simpleChoices(
            "Tease Her",
            this.urtaDiscussionTeaseAfterRomance,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined,
            "Leave",
            this.urtaDiscussionLeaveAfterRomance
        );
    }

    // [==Leave==]
    private urtaDiscussionLeaveAfterRomance(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            'You thank her for sharing such personal information with you.\n\n"<i>No problem, [name].  It\'s good to be able to talk about it for a change,</i>" the herm fox-morph replies.  As you get up to leave, she picks up her glass, drains it, and starts to pour herself another one.'
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [==Tease==]
    private urtaDiscussionTeaseAfterRomance(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "You thank her for telling you about her past like this but follow it up by asking her what she likes in the bedroom, doing your best to hide a mischievous grin."
        );
        this.outx(
            '\n\nUrta rocks back in her chair and blinks in confusion as she tries to answer, "<i>Uh...?  Well... I... ummm, it\'s hard to say, to be honest.  I get around a lot less than most people in this city.</i>"'
        );
        this.outx(
            "\n\nYou smirk back at her.  Surely, you tell her, that doesn't mean she doesn't have the occasional fantasy about what she'd like to do with a willing partner.  At this, Urta blushes, and you press on mercilessly.  She said that she always liked males, but what does she like best about them?  Does she like the idea of some handsome man sinking his cock into her needy pussy, filling her tightly with his own symbol of masculinity and fucking her?  Does she want to be fucked soft and slow, made to feel like a woman in every way?  Or does she want to be pounded hard and raw; brutal, wild sex to make her scream her pleasure until the roof rattles from the sound of her ecstasy?  Or is it the idea of penetrating men that she likes - the image of taking some pretty little boy and having him meekly suck on her long, hot, throbbing horse-cock, or pushing over a man and making him moan and whine and claw at the sheets while she relentlessly pushes herself ever deeper into his back passage, sinking herself in to the hilt in his bowels?"
        );
        this.outx(
            "\n\nUrta gives out a surprisingly small and wordless squeak, her eyes glazing over and making it very clear that your words are striking home.  You press on by asking her if she's really so reluctant to share her \"embarrassment of inches\" with girls who like a challenge, or does she just not like the idea of having her huge, powerful maleness tightly wrapped inside the warm, wet depths of a straining pussy working hard to accommodate her magnificent length and throbbing thickness?  Of hearing a woman screaming her name in lustful joy as the fox floods her with boiling spunk?  Doesn't she like feeling tits pillow and squish under her hands, or her face?  Or sliding her cock into them and feeling their softness all around them?"
        );
        this.outx(
            '\n\nThe table suddenly jolts visibly as Urta\'s erection slams into it, the engorged flesh audibly crashing against the wood.  She gives you a flat look.  "<i>Now look what you\'ve gone and done,</i>" she says, trying to sound stern, but coming off as a little amused.  "<i>I hope you\'re going to take responsibility for this...</i>"'
        );
        this.urtaLove(1);
        // Appropriate sex scene options are given; Hidden Blowjob and Urta's Place for regular Urta and Urta's Place, Suck Off and Eat Out for lover mode Urta
        if (!this.urtaLove())
            this.simpleChoices(
                "Hidden BJ",
                this.blowUrtaUnderTable,
                "Urta's Place",
                this.goBackToUrtasForLuvinz,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
        else {
            if (this.pregnancy.type == PregnancyStore.PREGNANCY_PLAYER)
                this.simpleChoices(
                    "Her Place",
                    this.goBackToUrtasForLuvinz,
                    "",
                    undefined,
                    "Eat Out",
                    this.eatUrtaOutNomNomPussy,
                    "",
                    undefined,
                    "",
                    undefined
                );
            else
                this.simpleChoices(
                    "Her Place",
                    this.goBackToUrtasForLuvinz,
                    "Suck Off",
                    this.blowUrtaUnderTheTableLuv,
                    "Eat Out",
                    this.eatUrtaOutNomNomPussy,
                    "",
                    undefined,
                    "",
                    undefined
                );
        }
        this.dynStats("lus", 25);
    }
    // [=Employment=]
    private urtaDiscussesEmployment(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx("You ask how and when it was that Urta came to be part of the Tel'Adre watch.");
        this.outx(
            "\n\nUrta blinks at you in surprise.  \"<i>Well, that's a strange question to ask... damn, it must have been around four or five years ago, now.  I was... well, let's be honest, I was basically a homeless street punk at the time, and the Watch was desperate for warm bodies to fill uniforms.  I marched up to the recruiter and told him I wanted in.  It helped that I had a bit of a reputation for taking on bullies and winning.  He snapped me up,</i>\" she says, shrugging and taking a casual slug from her glass."
        );
        this.outx(
            "\n\nYou nod in understanding, and ask how things went for her once she was recruited."
        );
        this.outx(
            "\n\n\"<i>Honestly?  I finally felt I had a place to belong.  Being in the Watch gave me a sense of purpose.  A few weeks into the training, I met Edryn, and we became fast friends.  Sure, there were some who objected to someone 'demon-touched' being in the Watch.</i>\"  One of her hands slips under the table and audibly pats her penis to give you an idea of why they would have called her such a thing.  \"<i>I stood up for myself, for once, and challenged anybody that dared call me that.  I was bullied a LOT growing up, so this time, I didn't take shit from anyone.  The higher-ups took notes as I fought, and as the war dragged on and , I stopped being such an odd case.  Once being a herm wasn't a huge stigma, I had an easy time climbing the ranks, and well, I became Captain of the Guard before I knew it.</i>\""
        );
        this.outx(
            "\n\nAs she triumphantly drains her glass in honor of her achievement, you are reminded of something that has been bothering you.  Delicately, you ask her; if she's a Guard Captain... then how come she always seems to be in here drinking?"
        );
        this.outx(
            "\n\nShe just grins at you in response.  \"<i>Well, most of my duties involve filling out paperwork, and because I'm the one in charge, well... so long as the paperwork gets filled out, it doesn't matter where I fill it out from, understand?  Besides, I'm not in here ALL day.  I spend a lot of time out in the streets, keeping my ear to the ground.  You're just lucky enough to catch me whenever I drop in to wet my whistle.</i>\""
        );
        this.outx(
            '\n\nAlmost as if to punctuate her words, a centaur suddenly comes racing into the Wet Bitch.  "<i>Captain Urta!</i>" he cries out.'
        );
        this.outx(
            "\n\nUrta shrugs.  \"<i>See what I mean?  Duty calls, it's been nice chatting with you,</i>\" she says, standing up and racing off, easily leaping up onto the startled centaur's back, who rears up and spins around before galloping off.  Seeing that Urta obviously has her hands full, you leave the bar."
        );
        if (this.player.inte < 20) this.dynStats("int", 0.5);
        if (this.player.inte < 40) this.dynStats("int", 0.5);
        if (this.player.inte < 60) this.dynStats("int", 0.5);
        this.urtaLove(0.5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [=Prejudice=]
    private urtaDiscussesPrejudice(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "Hesitantly, you ask Urta if she has ever faced prejudice for her hermaphroditic nature."
        );
        this.outx('\n\n"<i>...Why would you ask that?</i>" Urta finally responds, warily.');
        this.outx(
            "\n\nYou note that you had never seen - had never even heard - of someone being both female and male at the same time before you came to Mareth, and Urta's own attempts to hide it suggest that she's not exactly comfortable with it.  That itself implies that others may be even less so."
        );
        this.outx(
            "\n\nUrta looks at you, seeming to peer into your soul, then heaves a heavy sigh.  She snatches up her glass and drains it in one shot, silently pouring herself a refill and staring melancholically into it. Finally, she begins to speak, \"<i>Yeah... when I was younger, at least.  I... I don't know if I was the very first hermaphrodite to be born in Tel'Adre, but I was one of the first.  The demon war was just starting, then, and the only herms that anybody had seen or heard of by that point were in the demon ranks.  Things were... unpleasant.</i>\""
        );
        this.outx(
            "\n\nShe drinks until her glass is empty, refills it, and then drains it again.  By the time it's once again empty, you've mustered the nerve to ask if things have improved since then."
        );
        this.outx(
            "\n\n\"<i>Of course it's better now, though old wounds linger.  Sure, you still get the odd bigot, but you don't have people calling herms 'demon-touched' anymore,</i>\" she agrees."
        );
        this.outx("\n\nYou ask what changed that.");
        this.outx(
            "\n\n\"<i>Ironically enough, the demons.  All the pollutants and toxins they dump into the ground, the water, the air; it's messed with a lot of races, so even technically pure men and women started giving birth to the odd hermaphrodite.  Combine that with all the people who accidentally got turned into herms - or changed themselves on purpose - and then didn't run away to join the demon army because they weren't complete idiots, and, well...</i>\"  She shrugs."
        );
        this.outx(
            "\n\nYou nod in understanding, thank her for being willing to talk about something so personal, and then leave her, still nursing her empty glass."
        );
        if (this.player.inte < 20) this.dynStats("int", 0.5);
        if (this.player.inte < 40) this.dynStats("int", 0.5);
        if (this.player.inte < 60) this.dynStats("int", 0.5);
        this.urtaLove(0.5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Talk About Edryn dialogue scenes:
    private urtaDiscussesEdrynHistory(): void {
        this.clearOutput();
        this.urtaSprite();
        // [=History Together=]
        this.outx("You ask Urta what her past with Edryn is.");
        this.outx(
            "\n\nUrta simply shrugs at you. \"<i>To be honest?  We never knew each other until we started working on the Watch together.  I can't recall why it was she joined - maybe something about her father hoping it'd teach her to curb her lust? - but she signed up a few weeks after I did.  We got sent on patrol with each other a few times, started talking and, well, we hit it off.  Edryn's my best friend, and she's been a rock of support since she entered my life.</i>\""
        );
        this.outx(
            "\n\nSeeing that there isn't much more she knows than that, you thank Urta for answering your question and excuse yourself."
        );
        if (this.player.inte < 20) this.dynStats("int", 0.5);
        if (this.player.inte < 40) this.dynStats("int", 0.5);
        if (this.player.inte < 60) this.dynStats("int", 0.5);
        this.urtaLove(0.5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [=Working Together=]
    private urtaDiscussesWorkingWithEdryn(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "You tell Urta that you're curious about her working relationship with Edryn.  Do they work together often?"
        );
        this.outx(
            '\n\n"<i>All the time,</i>" Urta responds.  "<i>Standard operating procedure in the guard is to work in teams of two or three, and a centaur always has to have a morph or other biped working with them.</i>"'
        );
        this.outx("\n\nCurious about the arrangement, you ask why that is.");
        this.outx(
            '\n\n"<i>Centaurs are big and strong, but they\'re not really maneuverable - oh, they can run like anything when they want, but they suck at making tight turns or getting around in narrow spaces.  Plus, that four-on-the-floor configuration of theirs means they have a hard time defending their entire body,</i>" Urta explains.  "<i>We\'re not just a good team, we\'re good friends, so we prefer to work with each other; we\'ve got good chemistry on the job, and our skills complement each other well, so the Covenant doesn\'t mind us being assigned together.</i>"  She smirks at you.  "<i>The others in the Watch refer to Edryn as my right-hand mare.</i>"'
        );
        this.outx("\n\nYou thank Urta for her time and let her get back to her drinking.");
        if (this.player.inte < 20) this.dynStats("int", 0.5);
        if (this.player.inte < 40) this.dynStats("int", 0.5);
        if (this.player.inte < 60) this.dynStats("int", 0.5);
        this.urtaLove(0.5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [=Romance? =]
    private urtaDiscussesEdrynRomance(): void {
        this.clearOutput();
        this.urtaSprite();
        // Regular
        // This scene only plays if the player has not had to talk to Urta about Marble, and has not had to talk to Urta about Scylla
        if (!this.urtaLove()) {
            if (!this.urtaOpenAboutEdryn()) {
                this.flags[kFLAGS.URTA_OPEN_ABOUT_EDRYN] = 1;
                this.outx(
                    "You tell Urta that you've noticed she and Edryn seem to hang out together a lot.  Furthermore, as a centauress, you figure Edryn's probably capable of handling what Urta has hanging between her legs.  You're curious; are they a couple?"
                );
                this.outx(
                    '\n\nUrta splutters the drink of whiskey she was taking all over the table, wiping half-heartedly at the stains as she regains control of herself.  "<i>W-Why on earth would you ask something like that?</i>" she asks, wary.'
                );
                this.outx(
                    "\n\nYou shrug your shoulders, saying it was just an honest question, and the two of you are honest with each other, after all."
                );
                this.outx(
                    "\n\nIt's so quick you almost miss it, but Urta winces when you say that.  She bows her head, refusing to look you in the eye, but then visibly comes to a decision.  \"<i>Since you ask... we're not a couple in the sense that we're romantically involved.  But we do... have sex.</i>\""
                );
                this.outx(
                    "\n\nShe pauses there and waits for your reaction, sipping nervously at her glass.  For whatever reason, your head doesn't explode and you indicate she should continue; you want the whole story before you trust your reaction."
                );
                this.outx("\n\n\"<i>Edryn... was the first woman I'd ever had sex with.  ");
                // (If player has vagina and has sexed Urta:
                if (this.player.hasVagina())
                    this.outx(
                        "Until you, she was the only woman who didn't freak out and insist it was handjobs or nothing when she saw how big I was.  "
                    );
                this.outx(
                    "Apparently, I'm bigger than even the average centaur stallion, and Edryn likes that in a fuck.  I was young, naive... hurting.  I was a virgin in almost every sense of the word, back then; I'd jerked off a few times, used a few toys, but never anything with an actual person.  Combine that with Edryn's pheromones, that can make anyone rock-hard in seconds... I was putty in her cunt, if you know what I mean.</i>\""
                );
                this.outx(
                    "\n\nShe sighs, softly, \"<i>Edryn doesn't want us to be anything more than friends with benefits.  I don't think she's got anything against me being a herm, but she's alluded to wanting a stud to settle down with, some day, if this war ever ends.  In all honesty, I understand.  We make great friends, but I don't think we really click right as lovers.  She was the only one I'd ever had, though, and I was racking my brain to try to make it work... until you walked through the doors to this bar and into my life.  I really do think we could have something special together, but... I... when I really get going, I NEED to do something, and I'd rather it be with Edryn than some stranger, or alone in an alley.  It doesn't help that Edryn loves to tease me with her scent until I can't stand it.  Only when we're off duty, of course - one of the reasons I'm sitting so far away from her when we're in here at the same time.  I want to be with you, but I don't think I'll ever be able to stop seeing Edryn entirely - not unless we live together.</i>\""
                );
                this.outx(
                    '\n\nShe shakes her head.  "<i>But I owed you this truth, at the least.  So... what\'ll be?  Can we be honest, polygamous lovers?   Or is that too weird for you?</i>"  She stares at you and takes a fortifying drink of whiskey, shuddering nervously as she awaits your response.'
                );
                this.outx(
                    "\n\nYou ponder what you should do for a moment.  Will you accept Urta's little indiscretions?  Or will you refuse to have anything to do with her if she can't be faithful to you alone?"
                );
                // [Accept] [Reject]
                this.simpleChoices(
                    "Accept",
                    this.urtaDiscussesEdrynNonLoveAccept,
                    "Reject",
                    this.urtaDiscussesEdrynNonLoveREJECT,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined
                );
            }
            // Subsequent Regular Variant:
            else {
                this.outx(
                    "You give Urta a thoughtful look, and then ask how things are with Edryn these days."
                );
                this.outx(
                    '"<i>Good,</i>" the fox-morph replies freely.  "<i>She\'ll never compare to you, but she is a truly wonderful fuck... I swear, there is nothing quite like feeling a mare-cunt juice itself around you...</i>"  She smirks at you, obviously enjoying the chance to make you squirm, but '
                );
                if (this.player.cor < 66) this.outx("her manner is playful");
                else this.outx("her expression sobers when you make no response");
                this.outx(".");
                // (If player can now sleep with Edryn for free:
                if (this.player.statusAffectv1(StatusAffects.Edryn) >= 5) {
                    this.outx(
                        '  "<i>Of course, you know that firsthand, don\'t you?</i>" she grins.  "<i>Did hearing that I was having sex with her make you curious about what it was like?'
                    );
                    // (If player has fathered at least 1 child on Edryn:
                    if (this.flags[kFLAGS.EDRYN_NUMBER_OF_KIDS] > 0)
                        this.outx(
                            "  Still, I can't believe you actually knocked her up - I had to pick my jaw up off the floor when she told me that the foal kicking inside her ballooning gut was yours.  I mean, those herbs are supposed to be foolproof...</i>\" She shakes her head, half in disbelief of your sheer virility, half in awe of it."
                        );
                    else this.outx('</i>"');
                    if (this.flags[kFLAGS.URTA_FERTILE] == 0)
                        this.outx(
                            "  \"<i>Still, I hope you don't have any idle thoughts in your head about knocking me up; there's a difference between overwhelming contraceptives and sowing seed where the field's barren,</i>\" she states, patting her flat belly for emphasis.  Despite how flippant she tries to sound when she says this, you can tell that it's something of a sore subject for her."
                        );
                }
                this.outx(
                    "\n\nYou shake your head with a half-grin and apologize for trying to tease her about it."
                );
                this.outx(
                    '\n\n"<i>It\'s all right... uh, [name]?</i>" Urta asks, as you stand up, causing you to turn back to face her.  As you wait for an answer, she shakes her head. "<i>No, nothing, never mind, forget I said anything.</i>"'
                );
                this.outx(
                    "\n\nWondering what that was about, you bid her goodbye and leave the tavern."
                );
                this.doNext(this.camp.returnToCampUseOneHour);
                this.urtaLove(0.5);
            }
        }
        // Lover
        else {
            // First time!
            // This scene only plays if the player has not had the Regular version of this dialogue, has not had to talk to Urta about Marble, and has not had to talk to Urta about Scylla
            if (!this.urtaOpenAboutEdryn()) {
                this.flags[kFLAGS.URTA_OPEN_ABOUT_EDRYN] = 1;
                this.outx(
                    "\n\nYou tell Urta that you've noticed she and Edryn seem to hang out together a lot.  Furthermore, as a centauress, you figure Edryn's probably capable of handling what Urta has hanging between her legs.  You're curious; are they a couple?"
                );
                this.outx(
                    '\n\nUrta looks a little sheepish.  "<i>Ah... that\'s, not exactly a straight question.  I guess... yes and no?</i>" she replies.'
                );
                this.outx("\n\nYou ask her to explain.");
                this.outx(
                    "\n\n\"<i>Okay... well, Edryn and I do have sex now and then, but we aren't together.  Edryn... Edryn's pussy gives off pheromones that can drive anybody even a LITTLE equine mad with desire, and I'm no exception.  We're good friends, and before I met you I was so pent up; combine that with my being a satisfactory size, and we'd wind up fucking from time to time.  It was always casual - she's said she's not interested in being anything more than friends with benefits, and, honestly, I'm fine with that - now.  I try to avoid fooling around with her now that I have you, but... well, sometimes you're not here and she gives me a bit more of a whiff than I can handle.  Even when she doesn't, sometimes I... I just can't control myself.  [name], I... I have the libido of a slut in heat and a rutting bull, added together,</i>\" Urta explains, looking down in shame."
                );
                this.outx(
                    "\n\n\"<i>I didn't want to keep it secret from you, but I was scared you'd hate me for not telling you this to start with,</i>\" Urta suddenly blurts out, looking up at you with wet eyes.  \"<i>I... I won't blame you if you do anyway, but I love you, [name], more than anyone else in the world,</i>\" she states desperately.  \"<i>It's just a matter of physical relief for me - you're the one I love, the only one I love, and she's happy for me to be with you.  I just... I just can't stop having sex entirely, because I'd never be able to stay sane - you aren't here often enough for me to release my pent-up urges, and you'll never be there while you're still out there fighting the demons.  I want YOU and only you, but with our lives like they are now, I can't.  Please tell me you understand,</i>\" she begs."
                );
                this.outx(
                    "\n\nIt's quite clear that she means what she's saying.  Can you accept this arrangement, maybe even be happy about it, or will you break up with her over this breach of trust?"
                );
                // [Happy] [Tolerate] [Breakup]
                this.simpleChoices(
                    "Happy",
                    this.urtaDiscussesEdrynLoveHappy,
                    "Tolerate",
                    this.urtaDiscussesEdrynLoveTolerate,
                    "Break Up",
                    this.urtaDiscussesEdrynLoveBreakup,
                    "",
                    undefined,
                    "",
                    undefined
                );
            } else {
                this.outx(
                    "With a smirk, you ask Urta how things have been between her and Edryn lately."
                );
                this.outx(
                    '\n\nUrta blushes brightly with embarrassment. "<i>It\'s not my fault!</i>" she protests, misinterpreting your question.  "<i>I\'ve told her that I want to break things off sexually between us now that I have you, and she says she approves of you, but she just loves to tease me until I lose it and mount her!  I\'m trying to be faithful to you, really!</i>"'
                );
                this.outx(
                    "\n\nYou burst out laughing.  Urta simply slumps into her seat and stares fixedly at her drink, clearly sulking. You sling an arm around her shoulders and kiss her until she kisses you back, then apologize for teasing her like that."
                );
                this.outx(
                    '"<i>Hmph!  So you should be!</i>" Urta says, sticking her nose up in the air in an indignant huff... but she can\'t keep a straight face for more than a few moments.  "<i>I still can\'t believe you took it so well when I told you - I really am a lucky girl to have someone like you, aren\'t I?</i>" she says.'
                );
                // (If Edryn is doing the player for free:
                if (this.player.statusAffectv1(StatusAffects.Edryn) >= 5)
                    this.outx(
                        "  \"<i>Though I have to admit I was still a little jealous when Edryn told me you were having sex with her too.  Still, I guess that's just another thing we have in common, yeah?  A mutual taste in sexy ladies.</i>\"  She laughs, and mockingly shapes her hands through the air as if caressing Edryn's sizable boobs."
                    );
                // (If Edryn has had at least one baby:
                if (this.flags[kFLAGS.EDRYN_NUMBER_OF_KIDS] > 0) {
                    if (this.flags[kFLAGS.URTA_QUEST_STATUS] == 1) {
                        if (this.urtaPregs.urtaKids() == 0)
                            this.outx(
                                "  \"<i>...I still can't believe that you actually get her pregnant, though.  It's just not fair that Edryn's got little hooves running around, and after everything I went through, I don't have kits of my own... yet.</i>\" She gives you a slightly predatory smile along with the last word."
                            );
                        else
                            this.outx(
                                "  \"<i>...I still can't believe that you actually got her pregnant, though.  I guess I'll have to keep you busy in the sack if we're going to keep up, huh?</i>\" She gives you a slightly predatory smile along with the last word."
                            );
                    } else
                        this.outx(
                            "  \"<i>...I still can't believe that you actually got her pregnant, though. It's just not fair that Edryn's got little hooves running around, and you and I can't have any.</i>\"  Urta sighs."
                        );
                }
                // [If fertility quest is done: "At least... not while those damn demons are still out there, keeping us both busy.  I know it's selfish of me, but... try and put an end to them? For me?  I want to start a family with you."  Urta looks deeply into your eyes.])
                this.outx(
                    "\n\nYou nod and tell her it was good to see her again, and it's nice that the two of you have this out in the open.  As you politely get up and get ready to leave, it almost looks like Urta wants to say something to you, but then she shakes her head and lets you go.  You wonder what she may have had on her mind."
                );
                this.doNext(this.camp.returnToCampUseOneHour);
                this.urtaLove(0.5);
            }
        }
        if (this.player.inte < 20) this.dynStats("int", 0.5);
        if (this.player.inte < 40) this.dynStats("int", 0.5);
        if (this.player.inte < 60) this.dynStats("int", 0.5);
    }

    // [=Accept=]
    private urtaDiscussesEdrynNonLoveAccept(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "You think about it long and hard, and you finally decide that you can't hold Urta's dalliances with Edryn against her.  From the sound of it, Urta honestly has more reason to be interested in the centauress than in you - she's known Edryn longer, she lost her virginity to her, they're partners and friends.  Yet, despite this, she insists she feels more of a connection to you, and she was honest about what she's been doing and why.  Plus it's not as if you can't understand how she feels about the temptation.  Most creatures you've met in this weird world have either been very sexually tempting, or outright tried to make you have sex with them."
        );
        this.outx(
            '\n\nYou give the fox-morph a gentle smile and tell her that you understand what she\'s told you and you accept it.  Urta\'s eyes widen in shock and gratitude.  "<i>Thank you, [name]!</i>" she cries, smiling happily.  "<i>Please, believe me, I don\'t feel this way about anyone else,</i>" she says - so happy that she unwinds her tail and starts wagging it behind her.'
        );
        this.outx(
            "\n\nThe two of you share a drink and then you politely excuse yourself; Urta seems so much happier now she has the weight of that secret off her shoulders."
        );
        this.urtaLove(1.5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [=Reject=]
    private urtaDiscussesEdrynNonLoveREJECT(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "No matter how you look at it, you can't help but feel betrayed - Urta's been sleeping around behind your back.  If she didn't want this relationship to be monogamous, she should have told you before, and you tell her as much."
        );
        this.outx(
            '\n\nThe fox-morph looks hurt, but then develops a stony expression.  "<i>I.. I understand.  I won\'t bother you any more.</i>"'
        );
        this.outx(
            "\n\nYou declare that suits you fine and get up from your seat, heading away.  Urta doesn't call you back, disappointing you a bit; she stoically watches as you leave, never once making a sound."
        );
        // {Urta is now Heartbroken}
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [=Happy=]
    private urtaDiscussesEdrynLoveHappy(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "When you think about it, you decide to look on the positive side of things.  You trust Urta when she says she loves you - if she needs to \"vent\" when you aren't around to help, well, it's okay.  You smile at her and assure her that you're not upset; indeed, you're happy that she would be honest with you about this, and happy to know that she has a good friend like Edryn.  She beams a thankful smile back and kisses you passionately before you excuse yourself and leave."
        );
        this.urtaLove(5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [=Tolerate=]
    private urtaDiscussesEdrynLoveTolerate(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "Thinking about it long and hard, you sigh as you realize you couldn't blame her, even if you wanted to try.  It's hard enough for you to avoid being tempted by all of the sexy creatures this world has to offer - Urta must be in the same boat.  Still, you add, you would prefer that Urta not go rubbing the fact that she sometimes has to have sex with Edryn in your face."
        );
        this.outx(
            '\n\nUrta considers for a while before speaking again.  "<i>I... yeah.  Thanks, [name].  For understanding.</i>"'
        );
        this.outx(
            "\n\nSeeing as there's nothing else for either of you to say to each other now, you politely get up and leave."
        );
        // {Choosing this option should probably disable both the Romance? discussion topic and the ability to have threesomes with Urta & Edryn - if you can't accept that she needs to fuck mare-cunt when you're not around, then you're probably not the sort of guy who's going to take kindly to the idea of doing her from behind even as she pounds Edryn.}
        this.flags[kFLAGS.PC_DISLIKES_URTA_AND_EDRYN_TOGETHER] = 1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [=Breakup=]
    private urtaDiscussesEdrynLoveBreakup(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "No matter how you look at it, you can't help but feel betrayed - Urta's been sleeping around behind your back.  If she didn't want this relationship to be monogamous, she should have told you before, and you tell her so."
        );
        this.outx(
            "\n\nThe fox-morph looks hurt, but then develops a stony expression.  \"<i>Fine.  If that's the way you feel about it, then it's over,</i>\" she tells you."
        );
        this.outx(
            "\n\nYou declare that suits you fine and get up from your seat, heading away.  Urta doesn't call you back, disappointing you a bit; she stoically watches as you leave, never once making a sound."
        );
        // {Urta is now Heartbroken}
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [=Membership=]
    private urtaDiscussesWatchMembership(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx("You tell Urta that you're curious about the Watch's membership.");
        this.outx(
            '\n\n"<i>Membership, huh?  Like... how many members, joining requirements, things like that?</i>" Urta asks, prompting a confirmatory nod from you.'
        );
        this.outx(
            "\n\n\"<i>All right... well, getting in is pretty simple.  All you have to do is prove you're willing to follow orders, and that you can kick ass, and you're in.  If you're not tough enough, you wash out on your own, but the Watch doesn't discriminate - not now.  We'll take any able-bodied person we can get, and we don't care what gender you are, were born as, or self-identify as.  We don't care what you look like. We're not even that concerned with possible criminal records - within reason.  I mean, we don't take any drug-dealer or murderer trying to use us as a cover, and breaking the law when you're in the Watch winds up being way worse than if you weren't a member.  However, we can't afford to be picky, you know?</i>\""
        );
        this.outx(
            "\n\n\"<i>As for numbers... that's a bit trickier to answer.  Suffice to say, we're big.  We're still the old city guards, but now we're also the town's army and militia - we're the last line of defense if the demons ever manage to find us and breach the walls.  So we get a lot more recruits now then we used to, back in the day.  Of course, with how the city's population has shrunk...</i>\" Urta shrugs her shoulders meaningfully, and you nod your head in understanding."
        );
        this.outx(
            '\n\n"<i>All in all, we don\'t lack for recruits.  Everyone in this city knows that we\'re the ones who put our necks on the line to keep the city from dissolving into one endless demon-ruled orgy.  Being a Watchman or Watchwoman has attained a certain glamor, these days,</i>" Urta finishes.  Then she smiles at you.  "<i>Why the questions?  Thinking of joining?</i>"'
        );
        this.outx("\n\nYou answer in the negative.");
        this.outx(
            '\n\n"<i>Ah well.  Still, if you ever decide you\'d like to serve under me... or serve <b>under</b> me...</i>" she adds, giving you a lecherous leer, "<i>...you know where to find me.</i>"'
        );
        this.outx(
            "\n\nYou smirk back at her, and tell her that's what you figured.  Then, sincerely curious, you ask her; would it be possible for you actually join?  And how would your... relationship... be regarded by the Watch, especially if you did join?"
        );
        this.outx(
            "\n\nUrta smiles at you.  \"<i>Joining's easy, but you'd have to give up that adventuring business - you can't serve the city when you never spend any time in the city.  As for us...</i>\" she taps her clawed fingers idly on the table, clearly trying to remember precedent.  \"<i>So long as you don't let it interfere with work - like, blowing off a case to fuck in an alley - nobody will bat an eye.  'Course, it means you'll need to work a little harder than the others, or else they'll say I'm going softer on you because we're in each others' pants.  And if they aren't leery about that, they'll be teasing you about us.  So...</i>\" she trails off, shrugging her shoulders, unable to articulate any more because of the nebulousness of the subject."
        );
        this.outx(
            "\n\nYou thank her for the explanation, and note you don't think you'll be able to seriously consider signing up at the present time.  Out of things to talk about, you thank her for her time, and leave her to nurse her drink."
        );
        this.doNext(this.camp.returnToCampUseOneHour);
        if (this.player.inte < 20) this.dynStats("int", 0.5);
        if (this.player.inte < 40) this.dynStats("int", 0.5);
        if (this.player.inte < 60) this.dynStats("int", 0.5);
        this.urtaLove(0.5);
    }

    // [=Role In The City=]
    private urtaDiscussesWatchRole(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "You tell her that you're curious about what it is that the Watch actually does, on a day to day basis."
        );
        this.outx(
            '\n\nUrta looks thoughtful for a moment, and takes a drink.  "<i>Well,</i>" she finally says. "<i>I guess you could say we\'re like a mixture of the police and the army.  We still handle all of the old crimes, but we\'re also responsible for protecting this city from corruption in particular.  We stand watch at the gates and screen entrants for possible corruption - we have to fight off or otherwise turn away those who are too corrupt or who look like they\'d pose the risk of contaminating our city, and even if they do get through, we keep tabs on the particularly corrupt.  We also have to keep our eyes and ears open for corrupt individuals sneaking in or people being corrupted - by accident or on purpose - then we\'ve got to flush them out of hiding and either rehabilitate them or exile them,</i>" she explains.  "<i>I guess, all in all, our most important role is making sure nothing and nobody gets at the magi.</i>"'
        );
        // (uncorrupt PC:
        if (this.player.cor < 66)
            this.outx(
                "\n\nYou agree that it sounds like the Watch does very important work, and Urta should feel proud of being part of their ranks.  The fox-morph puffs out her chest with pride, and on that high note you leave her to her drinking."
            );
        // (PC is too corrupt:
        else
            this.outx(
                "\n\nYou simply nod your head in understanding; maybe having Urta wrapped around your finger was a smarter move than you thought.  Last thing you need is a bunch of misguided killjoys taking you down.  You change the subject and make small talk for a while longer, and then see yourself out."
            );
        this.doNext(this.camp.returnToCampUseOneHour);
        if (this.player.inte < 20) this.dynStats("int", 0.5);
        if (this.player.inte < 40) this.dynStats("int", 0.5);
        if (this.player.inte < 60) this.dynStats("int", 0.5);
        this.urtaLove(0.5);
    }

    // [=Reach=]
    private urtaDiscussesTheWatchsReach(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx("You ask Urta just how far the Watch's authority spans from the city.");
        this.outx(
            '\n\n"<i>Not sure what you mean... are you asking if we chase people outside the walls?</i>" Urta asks.  When you nod, she shrugs.  "<i>It depends on your crime and if we think it\'s worth the effort. Generally, once somebody has escaped the city, we just update the wards and leave it be; it\'s as good as a death sentence to be beyond these walls for most people.</i>"'
        );
        this.outx(
            "\n\nYou can certainly understand that viewpoint, and ask if the Watch ever sends patrols out into the wilderness."
        );
        this.outx(
            '\n\n"<i>Sometimes.  Very rarely.  And always volunteers,</i>" Urta states immediately.  "<i>What I said about it being a death sentence?  That applies to us, too.  We\'ve lost a lot of people over the years, and even with our attractiveness to recruits, we can\'t afford to just keep sending people out to disappear. Our watchmen are only sent out to scout out possible threats to the city, and they\'re under orders to avoid being seen or to fight anything.</i>"'
        );
        this.outx(
            "\n\nYou digest that for a few moments, then cautiously ask if Urta's ever been outside of the city in person."
        );
        this.outx(
            '\n\n"<i>...A few times,</i>" she admits at last.  "<i>I prefer to avoid it if I can.  I went on my first patrol only a few weeks after I had joined the Watch - thought it would be a great way to prove myself.  We... we were ambushed.  Demons attacked us, started throwing black magic around.  I don\'t know why, but it just sort of... washed off of me.  I was the only one who managed to get away - I looked back, and the others were fucking demons or being fucked by the demons.  I had to leave them behind and flee with my tail between my legs.</i>"'
        );
        this.outx(
            "\n\nShe morosely finishes off her drink and starts pouring herself another.  You wait for her to take the first sip before warily asking if she was, perhaps, blamed for the attack because of her sex.  She looks at you and then shakes her head.  \"<i>No.  I got an extensive debriefing... understandable, but they didn't accuse me of anything.  In the end, I got the notoriety I was after... but not in a way I wanted it.</i>\"  She sighs softly and drinks again.  \"<i>When I became captain, the first thing I did was order all teams to focus on stealth, and to run rather than fight whenever possible.  We normally only patrol into the desert, as far as the badlands - most critters don't want anything to do with either place, so we don't run into the big nasties I hear are in lusher places.  When we need outside supplies, we send out specific procurement teams who've been to our sources before and can get back there quickly and quietly.</i>\""
        );
        this.outx(
            "\n\nYou thank Urta for the explanation and politely excuse yourself, leaving Urta to drink off her depression."
        );
        this.doNext(this.camp.returnToCampUseOneHour);
        if (this.player.inte < 20) this.dynStats("int", 0.5);
        if (this.player.inte < 40) this.dynStats("int", 0.5);
        if (this.player.inte < 60) this.dynStats("int", 0.5);
        this.urtaLove(0.5);
    }
    // [=Crime & Punishment=]
    private urtaDiscussesCrimeAndPunishment(): void {
        this.clearOutput();
        this.urtaSprite();
        this.outx(
            "You explain to Urta that you're curious about the law in Tel'Adre - what is a crime here, and what are the punishments that the Watch is likely to deal to a criminal?"
        );
        this.outx(
            "\n\nUrta looks at you with, perhaps, a trace of suspicion, but then relaxes and takes a thoughtful sip of her whiskey.  \"<i>Well... we've had to change a few laws, but, mostly we're still the same city we always were, legally.  We won't put up with burglary, pickpocketing, mugging, rigging gambling games, swindling, short-changing, stuff like that.  You know what I mean?</i>\""
        );
        this.outx(
            "\n\nCurious, you press her on what she means by some of the laws changing.  Are some things not against the law anymore?  Have they had to come up with new laws?"
        );
        this.outx(
            '\n\n"<i>A bit of both, to be honest,</i>" Urta explains.  "<i>I think the laws on rape are the biggest ones - we\'re really supposed to crack down on that now.</i>"  She reads the look on your face and doesn\'t wait for your question before launching into an explanation.  "<i>Rape is an act that\'s gotten heavily associated with corruption - liking sex is fine, indulging in your kinks is fine, but going out and just attacking someone for the sake of getting yourself off?  That\'s how a demon thinks.  Using magic or alchemy to make the victim want it only makes things worse - even if you don\'t actually do anything, if a person reports you used black magic or something to make them hornier, we can charge you as a rapist and punish you accordingly.</i>"'
        );
        this.outx(
            "\n\nYou nod your head in understanding, then ask what's legal now that wasn't before."
        );
        this.outx(
            "\n\n\"<i>...Mostly some of the public decency laws, I'd guess.</i>\"  Urta says after some thought.  \"<i>Like, it's not against the law to walk around naked now - you might get some funny looks or people calling after you, but the Watch won't get on your case unless you start rubbing one out into a fountain or something.  Or prostitution - it's legal to exchange sex for money in Tel'Adre, now.  It's actually something of a booming business.</i>\""
        );
        this.outx(
            "\n\n\"<i>As for new crimes... well, it basically all falls under a single category: 'Aiding and abetting the demonic hordes'.  Anything that weakens Tel'Adre against the demons or strengthens the demons.  Spreading corruption, mind control, selling people into demonic slavery, betraying the city to the demons - you get the idea.</i>\"  Urta shrugs."
        );
        this.outx(
            "\n\nShe takes another slug of whiskey and then idly comments, \"<i>I think the black and gray marketing is the worst.</i>\"  At your confused expression, she elaborates.  \"<i>The demons make a lot of stuff that is designed to tempt people with pleasure - incubi drafts and succubi milk are very popular with people who want to make their 'fun bits' grow, or who'd like to 'see how the other side lives'.  For example... I have this one watchman who bought a lot of succubus milk and drank it, so he ended up turning completely into a girl.</i>\""
        );
        this.outx("\n\nYou smirk and note that must have given his girlfriend quite a shock.");
        this.outx(
            "\n\n\"<i>Not as much as he got when he found out that incubus drafts can't turn a girl completely into a guy.  Or when his girlfriend promptly got herself a cock with incubus drafts and started using it on him - he's given birth three times since then.</i>\"  Urta grins back.  \"<i>But, in their raw state, most of those items poison the soul - they fill you with corruption, make you start acting and thinking like a demon.  The black market is the underground market for that sort of stuff - I think the Watch spends more time on uprooting it and stomping it out than we do on anything else.  Eventually, we figured out it's possible to actually alchemically purify some of that stuff, and so we set up the gray market - you get and keep your license by proving that you've taken the effort to purify the items that can be purified, and that you don't stock the stuff that's simply too dangerous.  No license?  You're just a black marketeer, and we have to stop you.</i>\""
        );
        this.outx(
            "\n\nThat reminds you, and you promptly ask Urta just what sorts of punishments Tel'Adre has for lawbreakers."
        );
        this.outx(
            '\n\n"<i>Well... corruption and demon-related crimes are the big ones, these days.  Sometimes, in exceptional circumstances, we\'ll try and rehabilitate the criminals, but usually we just exile them.</i>" Urta replies.'
        );
        this.outx(
            "\n\nFurrowing your brow, you ask if that isn't dangerous to Tel'Adre's safety; couldn't an exile lead demons back to the city?"
        );
        this.outx(
            '\n\n"<i>Not a chance,</i>" Urta answers confidently.  "<i>The Watch and the Council both work together closely on that; when somebody is exiled from the city, the Council updates the warding - that person can never find their way back to Tel\'Adre.  Certainly not at the head of a demonic army; that much corruption would set even the weakest wards ringing and the whole Council would turn up the power and make the city vanish.</i>"'
        );
        this.outx(
            '\n\nShe looks puzzled for a few moments, lost in thought.  "<i>I\'m sure we do still have the death penalty, but in all my years of service I can\'t remember it ever being carried out.  I think that would require the most extreme treachery to be committed against the city.</i>"  She shrugs and then carries on.  "<i>For lesser crimes, we have more mild punishments - fines, time in prison mixed with public service, even things like whippings or the stocks if need be.</i>"'
        );
        this.outx("\n\nYou thank her for the informative discussion and politely excuse yourself.");
        if (this.player.inte < 20) this.dynStats("int", 0.5);
        if (this.player.inte < 40) this.dynStats("int", 0.5);
        if (this.player.inte < 60) this.dynStats("int", 0.5);
        this.urtaLove(0.5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Spank the Shit out of Urta and Make Her Cream Herself From Prostate Stimulation Alone Like the Horny Drunken Slut She Really Is
    // (Needs: Drunk Urta, Tamani's Deluxe Dildo OR a dick that fits her butt)
    public spankTheShitOutOfUrtaAndMakeHerCreamHerselfFromProstateStimulationAloneLikeTheHornyDrunkenSlutSheReallyIs(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-bar-male-spank"), false);
        this.outx(
            "You consider Urta's offers and, tempting as they are, decide they just aren't for you right now."
        );
        this.outx(
            '\n\n"<i>Whaaa?</i>" she snarls drunkenly.  "<i>Ey, c\'mon, lover,</i>" she says, stumbling over and glomming onto you like a hammered harlot, "<i>Gimme summin\' here.  Or I might just take it personal,</i>" she adds, and you suddenly feel a hard pressure against your thigh.  All right, no.  It used to be "<i>save your ass for later</i>" and now this? Time to teach Urta some manners.'
        );
        this.outx(
            "\n\nYou grab the horny fox-girl and give her a rough shove towards the table.  She stumbles and nearly falls, only to catch herself on the table's edge.  With ease, you tear the back off her dress, exposing her silver fur, her tight little ass, and letting the beast below free.  Unrestrained, a loud 'THUNK' reaches you as Urta's erection whacks the underside of the table, spilling her half-finished glass all over."
        );
        this.outx(
            '\n\n"<i>Whaddya think yer doiiiiEEE!</i>" she yelps as you give her bare buttocks a harsh swat.'
        );
        this.outx(
            "\n\n\"<i>Shut up,</i>\" you command, giving her other cheek a taste of your lesson.  Your palm's force is blunted somewhat by the thick, soft fur that covers the fox-girl's body, but you're still rewarded with a sharp gasp from your vulpine "
        );
        if (!this.urtaLove()) this.outx("friend ");
        else this.outx("lover ");
        this.outx(
            "with each swat.  \"<i>You're a rude bitch when you're drunk, Urta,</i>\" you add, giving her another swat on the ass.  She tries to stand, but you roughly push her back against the table.  You give her a fourth spank for her insolence, and can only grin when you hear her cock slam up against the table again."
        );
        this.outx(
            "\n\n\"<i>Oh, you like that, do you?</i>\" you ask, laughing, as you give the drunken fox-slut another stroke on the ass.  A little harder this time, so she winces - and the table jiggles from beneath.  By now, you're aware of quite a few onlookers, and more than a few are stroking themselves at the sight of Urta's half-naked form.  Her pronounced ass and pair of heavy, free-hanging breasts easily draw most of the attention, revealed as they are by the ruined tatters of her dress."
        );
        this.outx(
            '\n\n"<i>I said,</i>" you swat her again, this time grabbing her sexy hips to steady your target, "<i>Do.  You.  LIKE IT?</i>" and add another slap, making her tail stand up straight... and then brush against you.'
        );
        this.outx('\n\n"<i>Ye... YEAH!</i>" Urta yells, wiggling her ass, beet-red as it is.');
        this.outx(
            '\n\nOh come on, that was too easy.  You give the little slut a three-hit combo as punishment, but that just bounces the table up off the floor with the power of her erection.  "<i>C-Come on, lover,</i>" she moans, presenting herself as sexily as she can in her state, "<i>just fuck my... my pusshy already... pleassshe?</i>"'
        );
        this.outx("\n\nWell, at least she's learned SOME manners, but you aren't nearly done yet.");
        // {If PC HAS A DICK THAT CAN FIT UP URTA'S BUTTHOLE!}
        if (this.player.cockThatFits(this.urtaCapacity()) >= 0) {
            const y: number = this.player.cockThatFits(this.urtaCapacity()) + 1;
            this.outx(
                `\n\nYou stride a little closer behind the drunken fox and free your own beast, dropping your [cock ${y}] between her cheeks.  She lets out a happy sigh, spreading her legs and gripping the table, seemingly without shame as half the bar starts rubbing itself to the show.  Her pussy's slick and oh-so-inviting, but you've got other plans!`
            );
            this.outx(
                "\n\nYou line up and press your dick against Urta's tight little pucker.  She yelps, but you give her a hard spank as punishment.  \"<i>Desperate drunken sluts don't get to complain,</i>\" you say, giving her another reminder when she tries to open her mouth.  Silently, she digs her nails into the wood as you push in, slowly but forcefully, stretching out her vice-tight hole.  You hilt yourself, enjoying how tight, warm, and resisting her butt is.  Oh, she doesn't seem to want you back here - Urta makes a little whimper as you roll your dick across her prostate, feeling the little nub press against your shaft through her anal walls."
            );
            this.outx(
                "\n\nYou come to a rest and, rearing back, give Urta the hardest spank you've ever given."
            );
            this.outx(
                "\n\nShe cries out, and clamps down so hard on your dick that you feel like you're going to faint.  Urta's ass contracts all around you, her smooth, hot walls trying to clench but only serving to pleasure you.  You grin and notice that Urta's tongue has fallen out of her mouth, overwhelmed by pleasure.  Is she...  Oh, she's getting off on it, too!  You give her another spank, as she contracts and squirms... and her dick starts leaking."
            );
            this.outx(
                "\n\nThe little slut likes it on her prostate?  How cute!  Your roll your hips once, giving her a tantalizing bit of stimulation... and then another spank.  She squeezes hard on you again, hugging your dick to her prostate and pressing a geyser of pre-cum out of her huge horsecock.  You feel a bit leaking out of you as well, but that doesn't matter... you're just in there to show her who's boss, after all; to give her something to think about as you abuse her butt."
            );
            this.outx(
                '\n\nOn that note, you come down five times in rapid succession, swat after swat until her ass is vermilion.  "<i>What a naughty, slutty girl you are,</i>" you coo into her ear, slapping her again.  She cries out, squeezing you ever so tightly now, always in fear of the next strike of your open palm.  You ease up, giving her two gentle little swats, letting yourself bask in her tight contractions until you cum, releasing inside her until '
            );
            if (this.player.cumQ() < 250) this.outx("you've spent your load");
            else if (this.player.cumQ() < 1000) this.outx("filled her utterly");
            else this.outx("streams of cum leak out of her ass, pooling at your [feet]");
            this.outx(".  Urta whines, desperate to cum, but you don't let her.  Not yet.");
            this.outx(
                "\n\nShe seems to get off from just the sensation of having your dick in her ass when you spank her.  You go to town on her ass, slapping her cheeks raw, as fast and as hard as you please, varying your pace so she can never relax.  \"<i>A-aaaah!  Yesh, yesh!</i>\" Urta cries drunkenly, her cock leaking so much that you're afraid she'll slip on her own pre as she scuffs her feet on the floorboards. You grab her tits with your free hand, savaging her little black nipples, reveling in the sensation running through your spent, deflating cock, still rubbing across her lewd ball of a prostate."
            );
            this.outx(
                '\n\n"<i>Spank me harder!</i>" she cries, eyes half-crossed from pleasure.  "<i>Harder, [name]!</i>"'
            );
            this.outx(
                "\n\nSo you oblige, until your hand stings and you can feel the orgasm bubbling up inside the fox-girl. She throws her head back and cries out a moment after your last, brutal swat, a jet of fox-cream spattering against the wall and table, soaking the Wet Bitch's furniture until it looks like it rained spunk around her.  You continue to pound her butt until she cries in agony, pleasure, and perhaps a little shame, as some of the bar's other patrons finally blow their loads too, creaming the floor until you don't think it'll be safe to walk out."
            );
            this.outx(
                "\n\nWhen your vulpine lover finally calms from her orgasm, you pull out of her stretched asshole with a wet pop, your cum leaking out of her to join the mess on the floor."
            );
            this.outx(
                '\n\n"<i>Ow,</i>" Urta declares, before falling face-first onto the edge of the table - which promptly tips and dumps her into the nasty mix of spilled booze and cum.'
            );
            this.outx(
                "\n\nYou give Urta one last palm on the ass before leaving, careful to edge around the huge mess on the floor."
            );
            this.player.orgasm();
            this.dynStats("sen", -1);
        }
        // {PC Don't Got the Dick but Do Got a Tamani Dildo Which is Almost as Good!}
        else {
            this.outx(
                "\n\nYou swing yourself into Urta's seat, dragging the half-naked fox-girl onto your lap, propping her up with her belly flat across your [legs].  You yank off what remains of her dress, exposing her bare ass to the crowd of patrons.  With gusto, you give her a succession of swats on her defenseless rear, making the drunken fox squeal and squirm in your firm grasp, until you have to restrain her throbbing prick with your [legs].  You give her a little squeeze, making sure she knows just who's in charge here."
            );
            this.outx(
                "\n\nSubmissively, Urta hangs her head and wiggles her butt, inviting you to spank her again.  Instead, you grab a big handful of ass-flesh and squeeze softly, distracting her with a little gentleness as you rummage through your pack... until your hand alights on something special.  You pull out the deluxe dildo, its pink plastic shimmering in the candlelight of the tavern, and pop the flexible head into your mouth, getting it nice and wet as your other hand alternates between gentle pats and rougher squeezes.  When you're satisfied, you give Urta a sudden, harsh swat, eliciting a yelp from her thin lips, then line the head of the dildo up with her tight little pucker - so innocent, so unsuspecting - and gently push inwards."
            );
            this.outx(
                '\n\n"<i>Wh-whaaaa!?</i>" she shrieks, squirming violently - though you can feel her dick start to squirt pre at the merest inches in her ass.  Gripping the table, you give her superior posterior another brutal smack, and though Urta yelps and clenches, your pink toy slides right into her in the wake of your spank.  Urta squeals as the dildo sinks further into her butthole, until just the flared back remains, pressed tightly between her reddened cheeks.  You grin as you feel her hard prick tensing more and more with every inch, until a large puddle of pre is forming under your [feet].'
            );
            this.outx(
                "\n\nNow that you've got something nice and hard wedged up her ass, you rear back and give Urta another series of quick, light spanks, working her ass over a dozen times.  She pants, groaning as her ass clenches hard around the toy inside her, trying desperately to force it out.  You just push it right back in, sinking an inch into her again before giving her one good, hard spank on her swollen asscheeks.  Urta cries out, clenching down so hard she almost pushes the dildo right out - but you catch it, and slide it back in, slowly and surely, making sure to work it into her colon nice and tight."
            );
            this.outx(
                "\n\nYou resume, alternating between spanking and pushing the toy back in, working up a regular rhythm until you're almost fucking her ass between strokes.  Urta moans lustily, wiggling her hips like a harlot and begging you for more - \"<i>Harder!  Faster!</i>\"  You oblige her, hammering her swollen butt with your palm and your toy until her cheeks are beet-red with the signs of your anal abuse; her ass is no longer trying to push the dildo back out, her slutty body utterly resigned to taking the fucking like a good bitch.  With each swat, you can feel reverberations through Urta's prick as your toy stimulates her prostate, running across her little inner bud until she's leaking pre-cum everywhere, just on the verge of orgasm."
            );
            this.outx(
                "\n\nWhen Urta cums, she cums HARD.  A scream is all the warning you get before a huge gush of fox-spunk splatters your [legs], soaking your [armor] with her spooge.  You recoil, nearly losing your grip on the fox as she creams herself, powerfully enough to squeeze the sodden dildo out of her ass. You give her crimson rump a devastating smack, forcing the last of her spunk out in a jet that coats the walls and table."
            );
            this.outx(
                "\n\nYou prop Urta up on your lap, giving her a good view of what she's done: the room full of people, half of whom have jerked themselves off onto the floor watching you abuse her ass, soaking the floor with spunk from a dozen different species.  You ask Urta, now shaky and panting from the ordeal, what she thinks about that."
            );
            this.outx(
                '\n\n"<i>Ow,</i>" Urta declares, before falling face-first onto the edge of the table - which promptly tips and dumps her into the nasty mix of spilled booze and cum.'
            );
            this.outx(
                "\n\nYou give Urta one last slap on the ass before leaving, being careful to edge around the huge mess on the floor."
            );
            this.dynStats("lus", 40);
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private urtaDiscussessKatherine(): void {
        this.clearOutput();
        const affection: number = this.flags[kFLAGS.KATHERINE_URTA_AFFECTION];
        if (affection == 0) {
            // They’re just co-workers
            this.outx("You ask Urta how her new recruit is doing.\n\n");
            this.outx(
                "“<i>Oh Katherine?</i>” she asks.  “<i>Really well.  I mean she still needs to brush up on the laws of the land and a few other things, but she’s doing fine.  Plus it’s nice to have a cat in the watch.  I had thought about saving her for undercover work, but I figure it’s better for everyone to see a cat who’s a good upright citizen.  There really aren’t that many and maybe some of the ones in gangs will rethink things when they see her on patrol.</i>”"
            );
        } else if (affection == 1) {
            // They’ve never had sex together but each is aware you’re sleeping with the other if you're not in friends mode with Urta
            this.outx(
                `“<i>Heh, you really have a thing for ${
                    this.telAdre.katherine.hasCock() ? "herms" : "girls in need"
                }, don’t ya?</i>” she says with a smile.  “<i>Not that I’m complaining.  Anyway, in terms of her work she still needs to brush up on the laws of the land and a few other things, but she’s doing fine.  Plus it’s nice to have a cat in the watch.  I had thought about saving her for undercover work, but I figure it’s better for everyone to see a cat who’s a good upright citizen.  There really aren’t that many and maybe some of the ones in gangs will rethink things when they see her on patrol.</i>”`
            );
        } else if (affection < 11) {
            // They’ve had drunken sex with you (can't get to this point in friend mode)
            this.outx(
                `“<i>Yeah Kath.  Well I can see why you like her.  Hot girl${
                    this.telAdre.katherine.hasCock() ? " with a decent sized cock" : ""
                }, gets a bit horny when she’s drunk.  What’s not to like?</i>”\n\n`
            );
            this.outx(
                "She takes a swig of her drink and gives you a hug.  “<i>So, I just want to say I’m not unhappy having sex with you.  I mean that’s always great.  But, um, I gotta admit it’s really fun when you get the three of us together.  If you decide to do that again ... I’m in.</i>”"
            );
        } else if (affection < 32) {
            // Willing to have sober sex
            this.outx(
                "“<i>Mmmm yeah Kath,</i>” she says dreamily, then shakes her head and laughs.  “<i>Guess that about sums things up, huh?  Yeah I like Kath, I like her quite a bit.  She’s a good watch officer and she’s a good lover in a threesome.</i>”  Urta looks a little nervous, but presses on.  “<i>So... what do you think of the two of us, when you’re not around, you know?</i>”\n\n"
            );
            this.outx(
                "You could tell Urta not to have sex with Katherine except when you’re around, tell her it’s alright for them to have sex whenever they want or encourage them to fuck each other’s brains out."
            );
            this.simpleChoices(
                "Don't Fuck",
                this.urtaKathSexDont,
                "Whenever",
                this.urtaKathSexWhenever,
                "Encourage",
                this.urtaKathSexEncourage,
                "",
                undefined,
                "",
                undefined
            );
            return;
        } else {
            // Lovers
            this.outx(
                `“<i>${this.player.short}, I can honestly say I never expected to have this much sex.  I love you, I love Katherine.  It’s a bit weird, but I’m not complaining and neither is she and I hope neither are you.  I’m not the same girl you found sitting alone in the bar.  I’m so happy now.</i>”`
            );
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private urtaKathSexDont(): void {
        this.outx(
            "You give Urta a smile tell her that while you’re happy for her you’d really prefer if she waited for you to be around before banging Katherine.  You feel a little left out.\n\n"
        );
        this.outx(
            `Urta gives you a weak smile and says, “<i>Alright ${this.player.short}, I understand.  I’ll keep it in my pants.  Course I hope you’re up for a lot of three ways.  Girl’s got to get her fix.</i>”`
        );
        this.flags[kFLAGS.KATHERINE_URTA_DATE] = Katherine.KDATE_LITTLE;
        this.doNext(this.urtaDialogueMenu);
    }

    private urtaKathSexWhenever(): void {
        this.outx(
            "You put your arm around Urta and tell her that you don’t mind if your favorite girls need to blow off a little steam together.  As long as they don’t wear each other out that is.\n\n"
        );
        this.outx(
            "Urta lets out a relieved laugh and says, “<i>That’s good.  That’s good.  I’ll make sure not to wear our kitten out.</i>”"
        );
        this.flags[kFLAGS.KATHERINE_URTA_DATE] = Katherine.KDATE_WHENEVER;
        this.doNext(this.urtaDialogueMenu);
    }

    private urtaKathSexEncourage(): void {
        this.outx(
            "You ask Urta what she would say if you told her you flat out expect them to have sex when you’re not around.\n\n"
        );
        this.outx(
            `“<i>Are you sure ${this.player.short}?  I mean I love the idea, I’m sure Kath will love it too, but you know what my appetite’s like.</i>”\n\n`
        );
        this.outx(
            "You give her a kiss and tell her you know very well.  Since you’re not in town all the time you expect Urta to see to Kath’s needs and Kath to hers.\n\n"
        );
        this.outx(
            `“<i>Carte blanche?  Ok ${this.player.short}, but I’m warning you - your sex kitten is going to be very well fucked whenever you see her.</i>”`
        );
        this.flags[kFLAGS.KATHERINE_URTA_DATE] = Katherine.KDATE_LOTS;
        this.doNext(this.urtaDialogueMenu);
    }

    // Suggestion: One could either deposit the eggs inside urta (if drunk enough to agree:P) or Urta could help you fertilize them for someone else (Horsecock stretching yer Ovipositer)
    // Urta's not fertile yet though
    // Display Eggs option

    // Eggs Option
    public giveTheFoxSomeEggs(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.URTA_TIMES_EGG_PREGGED] > 0) {
            this.repeatUrtaEgging();
            return;
        }
        this.outx(
            "You give the drunken fox a winning smile and sashay towards her; the herm's eyes lock onto your body as you approach.  Gently you run your hand down her cheek, lean in close to her face and ask if she'd like to help both of you sort something out.  At her baffled but willing look, you whisper that you could make her a mommy if she likes."
        );

        this.outx(
            '\n\nUrta\'s eyes start to grow wet with tears, her lower lip wobbling sadly as one hand automatically snakes to her flat, toned belly.  "<i>M-mommy?</i>" she mumbles to you.'
        );

        this.outx(
            "\n\nYou hasten to cut that off, telling her that you can show her what it's like to be pregnant - and to have a lot of fun doing so.  This makes the herm vixen stop sniffling and start snuggling against you, impatient to begin.  However, "
        );
        if (this.flags[kFLAGS.PC_FETISH] > 0) this.outx("as much fun as it might be, ");
        this.outx(
            "you don't think it's a good idea to throw her over a table and fill her full of eggs here in front of everyone.  So, you whisper into her ear that if she wants you, she'll need to come out back with you.  Promptly rising from your seat, you head out through the back door that leads to the alley where you and Urta had your first encounter, swinging your hips alluringly.  Urta hastens to follow, tongue lolling in lusty anticipation, cock blatantly bulging against her undergarments; you're almost surprised she doesn't leave a slug-like trail of mixed drool and pre-cum in her wake."
        );

        this.outx(
            "\n\nYou slip out through the door and playfully hide yourself behind the adjacent wall.  When the drunken vixen stumbles through, looking for you, you pounce, grabbing her from behind and gently shoving her towards a handy crate near the wall.  Urta is so far gone with lust and beer that she allows you to bend her over without fighting back.  Indeed, she giggles and wags her tail, brushing the fluffy appendage tantalizingly across your crotch.  You waste little time in tugging off first your [armor], and then enough of her clothes to leave her bottom half exposed, rubbing your hand teasingly against her heavy, swaying balls and dripping wet cunt."
        );

        this.outx(
            "\n\nBut it's a far different need that is driving you now, and you can't be bothered to engage in much foreplay.  You straddle the sloshed fox, "
        );
        if (this.player.isTaur()) this.outx("positioning your centaur, ");
        else if (this.player.isDrider()) this.outx("drider body over the bulk of her back, ");
        this.outx("and release your ovipositor from its usual hiding slit, already dripping with ");
        if (this.player.findPerk(PerkLib.SpiderOvipositor) >= 0) this.outx("green slime");
        else this.outx("honey");
        this.outx(
            ' in anticipation of laying.  The appendage droops down, curling around to slide its wet length against Urta\'s balls and the base of her cock.  "<i>[name], wha...?</i>" she slurs at you, but you just gently shush her and tell her to relax.  With a little effort, you bring it slithering back up to pry at the dampness of her netherlips...'
        );

        this.outx(
            "\n\nUrta moans like the slutty drunk she is as your tubular appendage worms its way inside of her.  You shiver in pleasure at her hot, wet depths as they embrace your strange phallic appendage, but keep sliding it forward, pushing deeper and deeper inside of her in pursuit of your ultimate goals.  Urta's cock jumps and waggles with each thrust of your ovipositor inside of her, pre-cum gushing forward and drooling wet and slick down her length, splatting moistly onto the ground."
        );
        if (this.player.gender > 0) {
            this.outx("  Your own ");
            if (this.player.hasCock()) this.outx("[cock]");
            if (this.player.gender == 3) this.outx(" and ");
            if (this.player.hasVagina()) this.outx("[vagina]");
            if (this.player.gender == 3) this.outx(" are ");
            else this.outx(" is ");
            this.outx(
                "starting to grow wet with arousal, matting her back with your sexual fluids, but you ignore them, too caught up in your need of release to bother with conventional pleasures."
            );
        } else
            this.outx(
                "  The entirety of your sexual world begins and ends with your ovipositor, with the sensation of the mock-cock burrowing inexorably towards Urta's womb overwhelming you with pleasure.  Having no other sexual organs to distract you allows you to fully embrace it; you thrust harder and harder, desperate to ensure you have reached the womb before you start to lay."
            );

        this.outx(
            "\n\nFinally, blissfully, you reach the cervix; with one last mighty thrust, eliciting a shriek of arousal-tinged pain and an explosive gout of cum from your vulpine brood-host, you penetrate her all the way into the womb.  You both hover there, gasping as you recover from your mutual exertions, when the wonderful tingling of your eggs moving emanates from your insectile fuckspear.  You moan and groan as contractions push the first of your eggs down, pumping a steady stream of "
        );
        if (this.player.findPerk(PerkLib.BeeOvipositor) >= 0) this.outx("honey");
        else this.outx("spider-goo");
        this.outx(" to keep Urta moist and slick and pliable.");

        this.outx(
            "\n\nThe drunken herm barks and whimpers with pleasure as your egg stretches your ovipositor - and by extension the walls of her pussy - on its passage, rubbing her in a way equivalent to the most wonderfully filling of cocks.  Her inner walls clamp down on your protruding organ, rippling and suckling as if anxious to pull your first egg inside of her - already, the stimulation makes the second of your eggs start pulsing down, a third close behind on its metaphorical heels.  Urta lets out a howl as the first egg pushes and finally explosively propels itself into her waiting womb, the stimulation pushing her to orgasm; frothy vixen-spooge fountains all over the ground, noisily splatting and drizzling under her.  When the second and third eggs push their way in, it's too much for both of you; Urta cums for a second time, while you cum for the first time, "
        );
        let wetness = 0;
        if (this.player.hasVagina()) wetness += this.player.wetness() * 100;
        if (this.player.hasCock()) wetness += this.player.cumQ();
        if (wetness < 300) this.outx("splattering");
        else if (wetness < 500) this.outx("matting");
        else if (wetness < 1000) this.outx("soaking");
        else this.outx("flooding");
        this.outx(" the fox with your gushing ");
        if (this.player.gender == 1) this.outx("cum");
        else if (this.player.gender == 2) this.outx("femcum");
        else this.outx("mixed sexual fluids");
        this.outx(".");

        this.outx(
            "\n\nEgg after egg rolls down your ovipositor, each eliciting a gurgling splurt of cum from Urta's immense dick as it gushes into her, ensuring  the ground under her is soaked with sexual fluids"
        );
        if (this.player.gender > 0) this.outx(" just as her back is from your own release");
        this.outx(".");

        // [Egg Level 1:
        if (this.player.eggs() < 20)
            this.outx(
                "  Urta's stomach starts to swell as your clutch of eggs fills her once-empty womb, stretching into a noticeable bulge, though not one that she couldn't hide if she wanted."
            );
        // [Egg Level 2:
        else if (this.player.eggs() < 40)
            this.outx(
                "  As the eggs keep on coming, Urta's womb swells and bulges, crammed full of goo and eggs, growing larger and larger until Urta could easily pass for an expectant mother, ready to give birth any day now."
            );
        // [Egg Level 3:
        else
            this.outx(
                "  You stuff Urta with eggs until you're wondering how many either of you can hold. Her belly just keeps getting rounder and rounder even as your eggs keep coming; soon, not only does she look like a woman pregnant with multiples, her skin is visibly stretched over the eggs, giving it a distinctively lumpy look rather than the round, smooth bulge she might have if your load was smaller."
            );

        this.outx(
            "\n\nFinally, your eggs are all spent - you're not sure either of you could have lasted much longer.  You barely have the strength to wobble off of Urta and then topple onto your backside in the sodden earth, Urta's multiple orgasms having flooded the dusty alley and turned it into a boggy quagmire of jizz-mud.  Urta, meanwhile, barely has the strength to keep herself from falling face-first into her leavings, though she still sinks slowly to her knees and then flops into the boggy surface. After you have regained your wind, you smirk and ask if Urta enjoyed herself."
        );

        this.outx(
            "\n\n... You get no answer save a drunken snore.  It looks like it was all too much for the already drunk herm; she's passed out!"
        );

        // [Corruption <50:
        if (this.player.cor < 50) {
            this.outx("\n\nWell, you can't leave her here like this, ");
            if (this.player.fertilizedEggs() == 0) this.outx("even if your eggs weren't fertile, ");
            this.outx(
                "and so you painstakingly heave the drunken, egg-swollen fox upright.  Supporting her on your shoulder, you awkwardly carry-drag her back to her house, stopping for the occasional orientations in the city's still-unfamiliar streets.  Once there, you gratefully lay her down on her bed, give her bloated belly a pat, and head back to camp, feeling much lighter now."
            );
        } else
            this.outx(
                "\n\nWith a shrug, figuring Urta's probably slept more than one drunken debauch off in this very alley, you turn and start walking back to camp, whistling in pleasure.  A weight is off your abdomen, a certain itch has been scratched very pleasantly, and all is right with the world."
            );
        this.flags[kFLAGS.URTA_EGGS] = this.player.eggs();
        this.flags[kFLAGS.URTA_FERTILE_EGGS] = this.player.fertilizedEggs();
        this.flags[kFLAGS.URTA_TIMES_EGG_PREGGED]++;
        if (this.player.findPerk(PerkLib.BeeOvipositor) >= 0)
            this.pregnancy.knockUpForce(PregnancyStore.PREGNANCY_BEE_EGGS, 72);
        else this.pregnancy.knockUpForce(PregnancyStore.PREGNANCY_DRIDER_EGGS, 72);
        this.flags[kFLAGS.URTA_FLATBELLY_NOTICE] = 0;
        // First time, tag for triggering freakout!
        if (this.flags[kFLAGS.URTA_EGG_FORCE_EVENT] == 0)
            this.flags[kFLAGS.URTA_EGG_FORCE_EVENT] = 48;
        this.player.dumpEggs();
        this.player.orgasm();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Urta Chews You Out:
    // Play this scene automatically after PC impreggnates Urta for the first time
    public urtaChewsOutPC(newScreen = true): void {
        if (newScreen) this.clearOutput();
        else this.outx("\n");
        this.outx(
            'Urta looks up at you and snorts fiercely; you almost expect steam to come flaring out of her nostrils, and her livid eyes are doing their best to burn holes straight through you.  "<i>There you are, [name]!  You have some nerve!</i>"'
        );

        this.outx("\n\nYou casually pull up a seat and ask why that is.");

        this.outx(
            "\n\n\"<i>Why's that?  Are you blind?!  Look at me!  I look like a stuffed fowl ready for the oven, and you're the one who did the stuffing!</i>\" the fox hisses at you; looking almost as confused as she is angry."
        );

        this.outx(
            "\n\nWith the same nonchalance, you point out that Urta agreed to let you fill her with eggs in the first place; you asked, you didn't make her go along with it."
        );

        this.outx(
            '\n\n"<i>I was drunk!  I do stupid shit when I\'m drunk!</i>" Urta hisses at you, fingers idly tapping at the dome of her gurgling belly.  She catches herself and stops with a nervous frown.'
        );

        this.outx("\n\nSo, she didn't enjoy it?  That she isn't actually enjoying herself now");
        if (this.player.cor > 50)
            this.outx(
                ", especially given this may be the closest she'll ever get to experiencing pregnancy"
            );
        this.outx("?");

        this.outx(
            '\n\nAt that, Urta does a full-body flinch, a faint hint of red blooming under the fur on her cheeks.  "<i>Well... no, I guess I\'m not saying that...</i>" she admits.  She pats her belly with one hand, a faint smile perking her lips.  But then she looks upset again.  "<i>But... what am I supposed to do when the eggs come out?  I CAN\'T look after any babies - this city needs every able body it can watching for demons, not replacing pacifiers!</i>"'
        );

        // [Unfertilised Eggs:
        if (this.flags[kFLAGS.URTA_FERTILE_EGGS] == 0) {
            this.outx(
                "\n\nYou tell her that she doesn't need to worry about that; they're all blanks.  Nothing but shell and goo, no babies.  At this, Urta looks disgruntled.  \"<i>Terrific.  So you stuff me full of eggs and there're not even any babies in them?  Well, I guess I can sell them or throw them out or something when I lay them,</i>\" she proclaims."
            );
            if (this.player.lib > 49 && this.player.hasVagina()) {
                this.outx(
                    "  Raising an eyebrow, you lean closer and inform her that you could make babies for her - she just needs to find you a big cock dripping with, and this is the important part, <i>fertile</i> seed."
                );

                this.outx(
                    '\n\nUrta shifts in her seat.  "<i>Er, well.  I, ah... I\'ll keep... an eye out for one.</i>"'
                );
            }
        }
        // [Giant Bee:
        else if (this.player.findPerk(PerkLib.BeeOvipositor) >= 0)
            this.outx(
                "\n\nWell, you're pretty sure the eggs will just hatch into bee swarms; doesn't Tel'Adre have farms of some kind that could use them, you ask?  Urta looks thoughtful for a few moments, then nods.  \"<i>Yeah, and the farmers often complain that the crops don't produce so well because the drought means there's almost no insects to pollinate them any more.  They'd be happy to take in some swarms, even if they will grow up and move away after three years,</i>\" she mumbles, more to herself than to you."
            );
        // [Drider:
        else
            this.outx(
                "\n\nMaybe she could give them up to a tailor's guild or something?  After all, they'll be driders like you are now, so they could produce lots of silk for the city.  The fox-morph looks puzzled at the idea, then rubs her chin contemplatively.  \"<i>I guess that might work...</i>\" she mumbles."
            );

        this.outx(
            '\n\nIt seems like Urta has cooled down, and you ask if things are okay now.  Your vulpine lover and current surrogate looks at you with blank eyes for a few moments, again stroking the drum-taut fur of her midriff, then huffs in exasperation, resting her chin in the palm of one hand as she leans against the table.  "<i>All right... it was kind of fun...  Just don\'t do this to me very often!  I have a job besides being a ready breeding womb for you!</i>"'
        );

        this.urtaLove(-10);
        this.outx(
            "\n\nYou kiss the embarrassed fox on the nose and tell her to take care before heading out.  She grabs you by the neck and kisses you back hard, whispering, \"<i>Don't try to make me do this sober, sneaky "
        );
        if (this.player.findPerk(PerkLib.SpiderOvipositor) >= 0) this.outx("spider");
        else this.outx("little bee");
        this.outx('...</i>"\n');
        // (Technically finished, now, but waiting Fen's okay before adding repeatable version)
        this.flags[kFLAGS.URTA_EGG_FORCE_EVENT] = -1;
        if (newScreen) this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Repeatable Eggs Option:
    private repeatUrtaEgging(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-egg-repeat"), false);
        this.outx(
            "With a smile, you ask if Urta would be willing to let you lay a few eggs in her womb again?"
        );

        this.outx(
            "\n\nThe drunken vixen giggles and taps you playfully on the nose.  \"<i>Naughty, naughty [name]... but, if you got eggs for me, I'll hatch 'em for yah, I guesh.  Jusht make sure you put them in the right hole, okay?  I don't want no eggs up da butt.</i>\"  She giggles again and gets up, heedless of the way her erection is "
        );
        if (!this.urtaLove())
            this.outx("blatantly hanging out of her stockings and drooling pre-cum everywhere");
        else this.outx("vulgarly bulging her dress and rendering it sopping wet from her arousal");
        this.outx(
            ", before sashaying in a drunkenly exaggerated fashion out towards the alleyway where you and she first began your relationship- and where you first 'impreggnated' her."
        );

        this.outx(
            "\n\nYou follow close behind, striving to avoid slipping in the fox-goo trail she leaves in her wake.  By the time you catch up, she's already stripped down and is leaning over a crate for support, idly stroking her huge mare-prick with a free hand even as her tail wags in anticipation.  \"<i>Well, whatcha waiting for, lover?  Come 'n' geddit!</i>\""
        );

        this.outx(
            "\n\nYou waste little time in tugging off your [armor] and then approaching the eager fox, who uses her tail to tease you by brushing it tantalizingly across your crotch.  You return the favor, rubbing your hand teasingly against her heavy, swaying balls and dripping wet cunt."
        );

        this.outx(
            "\n\nBut it's a far different need that is driving you now, and you can't be bothered to engage in much foreplay.  You straddle the sloshed fox, "
        );
        if (this.player.isTaur() || this.player.isDrider()) {
            if (this.player.isTaur()) this.outx("positioning your centaur");
            else this.outx("drider body over the bulk of her back");
            this.outx(", ");
        }
        this.outx("and release your ovipositor from its usual hiding slit, already dripping with ");
        if (this.player.canOvipositBee()) this.outx("honey");
        else this.outx("green slime");
        this.outx(
            " in anticipation of laying.  The appendage droops down, curling around to slide its wet length against Urta's balls and the base of her cock.  In her present state, there's no need to tell her to relax; indeed, she whimpers eagerly in anticipation of what's to come.  With a little effort, you bring it slithering back up to pry at the dampness of her netherlips..."
        );

        this.outx(
            "\n\nUrta moans like the slutty drunk she is as your tubular appendage worms its way inside of her.  You shiver in pleasure at her hot, wet depths as they embrace your strange phallic appendage, but keep sliding it forward, pushing deeper and deeper inside of her in pursuit of your ultimate goals.  Urta's cock jumps and waggles with each thrust of your ovipositor inside of her, pre-cum gushing forward and drooling wet and slick down her length, splatting moistly onto the ground."
        );
        // ((sexed)
        if (this.player.gender > 0) {
            this.outx("\n\nYour own ");
            if (this.player.hasCock()) this.outx("[cock]");
            if (this.player.gender == 3) this.outx(" and ");
            if (this.player.hasVagina()) this.outx("[vagina]");
            this.outx(
                " are starting to grow wet with arousal, matting her back with your sexual fluids, but you ignore them, too caught up in your need of release to bother with conventional pleasures."
            );
        } else
            this.outx(
                "\n\nThe entirety of your sexual world begins and ends with your ovipositor, with the sensation of the mock-cock burrowing inexorably towards Urta's womb overwhelming you with pleasure.  Having no other sexual organs to distract you allows you to fully embrace it; you thrust harder and harder, desperate to ensure you have reached the womb before you start to lay."
            );

        this.outx(
            "\n\nFinally, blissfully, you reach the cervix; with one last mighty thrust, eliciting a shriek of arousal-tinged pain and an explosive gout of cum from your vulpine brood-host, you penetrate her all the way into the womb.  You both hover there, gasping as you recover from your mutual exertions, when the wonderful tingling of your eggs moving emanates from your insectile fuckspear.  You moan and groan as contractions push the first of your eggs down, pumping a steady stream of "
        );
        if (this.player.canOvipositBee()) this.outx("honey");
        else this.outx("spider-goo");
        this.outx(" to keep Urta moist and slick and pliable.");

        this.outx(
            "\n\nThe drunken herm barks and whimpers with pleasure as your egg stretches your ovipositor - and by extension the walls of her pussy - on its passage, rubbing her in a way equivalent to the most wonderfully filling of cocks.  Her inner walls clamp down on your protruding organ, rippling and suckling as if anxious to pull your first egg inside of her - already, the stimulation makes the second of your eggs start pulsing down, a third close behind on its metaphorical heels.  Urta lets out a howl as the first egg pushes and finally explosively propels itself into her waiting womb, the stimulation pushing her to orgasm; frothy vixen-spooge fountains all over the ground, noisily splatting and drizzling under her.  When the second and third eggs push their way in, it's too much for both of you; Urta cums for a second time, while you cum for the first time, "
        );
        let wetness = 0;
        if (this.player.hasVagina()) wetness += this.player.wetness() * 100;
        if (this.player.hasCock()) wetness += this.player.cumQ();
        if (wetness < 300) this.outx("splattering");
        else if (wetness < 500) this.outx("matting");
        else if (wetness < 1000) this.outx("soaking");
        else this.outx("flooding");
        this.outx(" the fox with your gushing ");
        if (this.player.gender == 1) this.outx("cum");
        else if (this.player.gender == 2) this.outx("femcum");
        else this.outx("mixed sexual fluids");
        this.outx(".");

        this.outx(
            "\n\nEgg after egg rolls down your ovipositor, each eliciting a gurgling splurt of cum from Urta's immense dick as it gushes into her, ensuring  the ground under her is soaked with sexual fluids"
        );
        if (wetness > 0) this.outx(" just as her back is from your own release");
        this.outx(".");

        // [Egg Level 1:
        if (this.player.eggs() < 20)
            this.outx(
                "  Urta's stomach starts to swell as your clutch of eggs fills her once-empty womb, stretching into a noticeable bulge, though not one that she couldn't hide if she wanted."
            );
        // [Egg Level 2:
        else if (this.player.eggs() < 40)
            this.outx(
                "  As the eggs keep on coming, Urta's womb swells and bulges, crammed full of goo and eggs, growing larger and larger until Urta could easily pass for an expectant mother, ready to give birth any day now."
            );
        // [Egg Level 3:
        else
            this.outx(
                "  You stuff Urta with eggs until you're wondering how many either of you can hold. Her belly just keeps getting rounder and rounder even as your eggs keep coming; soon, not only does she look like a woman pregnant with multiples, her skin is visibly stretched over the eggs, giving it a distinctively lumpy look rather than the round, smooth bulge she might have if your load was smaller."
            );

        this.outx(
            "\n\nFinally, your eggs are all spent - you're not sure either of you could have lasted much longer.  You barely have the strength to wobble off of Urta and then topple onto your backside in the sodden earth, Urta's multiple orgasms having flooded the dusty alley and turned it into a boggy quagmire of jizz-mud.  Urta, meanwhile, barely has the strength to keep herself from falling face-first into her leavings, though she still sinks slowly to her knees and then flops into the boggy surface. After you have regained your wind, you smirk and ask if Urta enjoyed herself."
        );

        // (Regular:
        if (!this.urtaLove())
            this.outx(
                "\n\nUrta laughs drunkenly.  \"<i>Like, that's the weirdest fuck I've ever had... but, damn if it's not fun.  Maybe come and do that again, eh?</i>\" she suggests."
            );
        else
            this.outx(
                '\n\nShe gives you a dopey grin and nods, but then looks sad.  "<i>I do like the sex, but... I kinda wish these were our babies for real, y\'know?</i>" She mumbles.'
            );

        this.outx(
            "\n\nAwkwardly hauling her distended form to its feet, she gives you a sloppy kiss, grabs her clothes and starts waddling back home, clearly intending to sleep it off.  You watch her go, then pick yourself up and head back to camp."
        );
        this.flags[kFLAGS.URTA_EGGS] = this.player.eggs();
        this.flags[kFLAGS.URTA_FERTILE_EGGS] = this.player.fertilizedEggs();
        this.flags[kFLAGS.URTA_TIMES_EGG_PREGGED]++;
        if (this.player.findPerk(PerkLib.BeeOvipositor) >= 0)
            this.pregnancy.knockUpForce(PregnancyStore.PREGNANCY_BEE_EGGS, 72);
        else this.pregnancy.knockUpForce(PregnancyStore.PREGNANCY_DRIDER_EGGS, 72);
        this.flags[kFLAGS.URTA_FLATBELLY_NOTICE] = 0;
        this.player.dumpEggs();
        this.player.orgasm();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // *Urta starts on bed wearing condom and lacy stockings.  Holding condom for PC.
    // *Nude and leaking.
    // *New option: condomless
    // *Give hint that virgins should do the cumflation scene?
    // [Condomless]
    private condomlessUrtaInHouseSmex(): void {
        this.clearOutput();
        this.outx(
            "You grab hold of the pre-filled bubble atop the fox's tip and yank, earning a moan as the latex sheath slides free, stretching it to an oblong mass before freeing her flare with an audible pop.  At the same time, you draw the second, unused condom from her unresisting grip and say, \"<i>Why don't we make a little mess?</i>\""
        );
        // non lover:
        if (!this.urtaLove())
            this.outx(
                '\n\nUrta grumbles something about, "<i>...can clean up the mess then,</i>" and sulks, but a quick touch to the slippery equine flesh between her legs quiets her complaints.  She looks up at you quizzically, baffled as to just how much of a mess you plan to make.'
            );
        // lover:
        else
            this.outx(
                "\n\nUrta rolls her eyes and declares, \"<i>Fine, but you'll help me clean up the mess, love.</i>\"  She's practically panting as she says so, cock jutting in the air as ribbons of pre dangle from that rigid tower.  Watching through lusty, half-hidden eyes, the vixen seems curious as to just how messy you want to get."
            );
        // [Peg Her Ass] [Fill Me Up]
        this.menu();
        if (this.player.hasCock()) {
            if (this.player.cockThatFits(this.urtaCapacity()) >= 0)
                this.addButton(0, "Peg Her Ass", this.pegUrtasAssMessy);
            else
                this.outx(
                    "\n\n<b>You're too big to peg her ass and make her bust a nut all over herself.</b>"
                );
        }
        if (this.player.hasVagina()) this.addButton(1, "Fill Me Up", this.fillMeUpPleaseUrta);
        if (this.player.gender > 0 && this.player.isNaga())
            this.addButton(2, "TailFun", this.nagaOnUrtaMess);
        this.addButton(4, "Back", this.goBackToUrtasForLuvinz);
    }
    // [Peg Her Ass]
    private pegUrtasAssMessy(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-home-pegurta"), false);
        let x: number = this.player.cockThatFits(this.urtaCapacity());
        if (x < 0) x = this.player.smallestCockIndex();
        this.outx(
            "Fondling the fox's apple-sized balls, you give her a hard but affectionate squeeze, rolling the heavy orbs around in your palm as you lift them high.  With her stuffed sack out of the way, Urta's oozing black-lipped gash is on full display, with engorged labia soaked in lubricants that had nowhere to go thanks to her smotheringly large scrotum.  Just below, you can see her anal star tightening and relaxing with each of the vixen's heavy breaths.  To you, it looks almost hungry, panting like an animal."
        );
        this.outx(
            "\n\nRemoving your [armor] one-handed, you reveal your body and your intentions, flopping "
        );
        if (this.player.cockTotal() > 1) this.outx("a ");
        else this.outx("your ");
        this.outx(
            `${this.cockDescript(
                x
            )} down onto the sheets, a scant few inches from Urta's puckered asshole.  The fox `
        );
        if (this.urtaDrunk())
            this.outx(
                'giggles drunkenly, "<i>You\'re sho dirty!</i>" while spreading those fishnet-clad legs further.'
            );
        else if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] < 11)
            this.outx(
                'softly begs, "<i>Be gentle, please,</i>" while spreading those fishnet-clad legs a little further apart.'
            );
        else
            this.outx(
                'eagerly coos, "<i>Feeling a little dirty, eh, lover?  Go on baby, you can fuck my ass anytime.</i>"  She spreads her fishnet-clad legs so wide they almost form an unbroken, horizontal line from padded toe to padded toe, tying her soft, poofy tail around a leg to keep it out of the way.'
            );
        this.outx(
            `  Scooting forward, you edge your ${this.player.cockHead(
                x
            )} up to her anus.  Her body heat washes over you as you enjoy the feel of her pucker's folded flesh pressing down on your most sensitive point, lubricated by the copious female fluid that drains from the sodden gash above.`
        );
        this.outx(
            `\n\nYou begin to gently rock your [hips] forward, giving little, gentle pushes against the resistant muscle.  At first, you make no progress, simply forcing her anal ring to dilate, little by little.  Then, after a particularly vigorous stroke, your ${this.player.cockHead(
                x
            )} slides through the clinging ring and into the tight embrace of her slick anus.  You stop to allow her to adjust, admiring her `
        );
        if (this.urtaDrunk()) this.outx("drunken ");
        this.outx(
            "whimpers of pleasure.  However, you don't wait long, slowly pushing forward and exploring your vixen's every inner crevice with your eager rod."
        );
        this.outx("\n\n\"<i>It's ");
        if (this.urtaDrunk()) this.outx("sho");
        else this.outx("so");
        this.outx(
            ' different than with a condom over a toy,</i>" the vulpine lass wonders aloud in delight.  She licks her lips and '
        );
        if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] > 15) this.outx("casually");
        else if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] > 11) this.outx("confidently");
        else if (this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] > 4)
            this.outx("a little nervously");
        else this.outx("with a shaky hand");
        this.outx(
            " strokes a padded fingertip down the bulging length of her urethra, shivering when it bumps across the sensitive medial ring.  A few inches in, you feel a rounded bulge bump into you, and as soon as you press against it, Urta's cock lifts up and thickens, flooded with blood.  The fox trembles for a second as you glide by the obstruction, and without any warning at all, her shaft belches a thick spurt of clear pre-cum with enough force to glaze the underside of her tits."
        );
        this.outx(
            `\n\nSmiling at the lascivious display, you gather a handful of the balmy animal cream and circle it around one of her perky nipples, admiring how the black nub perks up into a puckered, sensitive tower.  Then, while still pushing into her, you repeat the action on the other side, with identical result.  Your ${this.cockDescript(
                x
            )} milks another heavy flow from the fox's prostate, this one tinged with just a little bit of off-white.  It puddles on her belly, already forgotten.  You're pushing forward without much worry for her comfort now, and blessedly, the fox doesn't seem to mind.  Indeed, with every lurch forward, her twat's drippings come faster and faster, matched by even larger discharges from the turgid member above.  `
        );
        if (this.player.cockArea(x) > this.urtaCapacity())
            this.outx(
                `The aching pressure around your ${this.cockDescript(
                    x
                )} doubles, and you realize she simply can't take any more.  Her anus is stretched wide, dilated to the extreme to accommodate this much of you.  There's little to do but plow her with what you can until she's fountaining white.`
            );
        else if (this.player.hasKnot(x))
            this.outx(
                "The pleasure seems to double when your knot butts up against her furry rump, but her asshole isn't ready for that just yet.  This bitch needs a little more loving before you knot her."
            );
        else {
            this.outx(
                `The aching pleasure around your ${this.cockDescript(
                    x
                )} redoubles as you hilt her, smashing your `
            );
            if (!this.player.hasSheath()) this.outx("groin ");
            else this.outx("sheath ");
            this.outx("against her taut asshole with a heavy lurch.");
        }
        this.outx(
            `\n\nGroping the vixen's tits and thumbing her nipples, you have your way with her chest, torturously teasing her while your ${this.cockDescript(
                x
            )} rests immobile in her ass.  Her pussy-slicked sack rests against you, lewdly bouncing and pulsating with need, fairly ready to explode; her cock is equally aroused.  The rigid length is so hard that it hovers over her smooth abdominals without touching them, bobbing up and down while it exudes a steady drizzle of lust.  The pre-spunk is so thick on Urta's belly that her fur is matted and glossy from her hips to the underside of her tits, and ribbons of the stuff run down her sides to lubricate the sheets below.  Her hands push yours into her chest harder, smashing her tits almost flat against her.  At the same time, her hips squirm and writhe, grinding in lewd little circles against you, swirling your dick up against every part of her sensitive tail-hole.`
        );
        this.outx(
            "\n\nSimpering, the once-mighty guard-captain begs, \"<i>Don't... d-don't stop.  Please, I'm so close!</i>\"  You give her sack a slight swat, making her gasp, but hold still.  Smiling, you keep her like that - plugged full of cock, dripping, eager, and submissively begging.  Urta pinches one of her slick nipples as hard as she can, moaning like a whore in a heat as she desperately tries to encourage you.  She even grabs your hand and pulls your thumb into her mouth, placidly suckling your thickest digit while her eyes beg you to fuck her ass.  With her onyx lips in a seductive 'o' and her cheeks hollowed, fellating your hand, you know you can't resist."
        );
        this.outx(
            "\n\nYou lunge back, suddenly leaving Urta's asshole utterly empty.  The herm snaps back surprised, her dick drooping down slightly.  An angry glower takes over her visage, and just before she says anything, you leap forward.  Her pucker swallows "
        );
        if (this.player.cockArea(x) > this.urtaCapacity()) this.outx("most of you ");
        else this.outx("your entire length ");
        this.outx(
            "before she can react, clinging to every inch of cock-flesh as it's forced deeper into her interior.  A wave of ecstasy washes through the fox, slackening her muscles in a ripple that travels from her waist to her lips in a second.  Her annoyance morphs into slack-jawed pleasure, and her protests deteriorate into babbling vocalizations of enjoyment.  Before she can recover, you pull back and thrust again, battering her sphincter repeatedly as you begin to truly pound the fox's ass."
        );
        this.outx('\n\nUrta moans, "<i>Fuck me!  Fuck my ass, [name]!  Gods');
        if (this.urtaDrunk()) this.outx("h");
        this.outx(", why does it feel s");
        if (this.urtaDrunk()) this.outx("h");
        this.outx(
            `o goooo-ooooooh yes!</i>"  Her ass clutches and relaxes to your tempo, hugging your ${this.cockDescript(
                x
            )} tight`
        );
        if (this.player.balls > 0)
            this.outx(" while your [balls] slap against her fuzzy buttcheeks.");
        else this.outx(" while you slap your groin against her fuzzy buttcheeks.");
        this.outx(
            "\n\nMounting that tight tunnel over and over, you go back to thumbing at the vixen's nipples, ignoring the more obvious, turgid member below.  You even take the time to bat Urta's own hands away from her dick, wanting her to cum without the aid of her tremendous horse-cock.  Sawing in and out, you fuck the fox's ass with relentless energy, driven by your surging lust to pound that hole hard."
        );
        if (this.player.hasKnot(x) && this.player.cockArea(x) < this.urtaCapacity())
            this.outx(
                "  You barely notice when your knot pops through the ebony ring, locking you inside her.  All you know is that while your strokes have gotten shorter, the pleasure has gotten even greater."
            );
        this.outx(
            `\n\nYou pinch the nipple you've been playing with and slam your ${this.cockDescript(
                x
            )} home with rump-shaking force.  It slides the fox backward in her puddle of pre, slicking the underside of her legs with her sexual moisture as she's dragged through it.  Barely suppressing a moan of your own, you shimmy forward again and voraciously tackle her asshole, pegging Urta with short, brutal strokes.  Eager to see her blow, you shift your angle and press up, slamming your ${this.player.cockHead(
                x
            )} into her prostate so hard you swear you must be flattening it.  Urta screams, her balls contracting powerfully.  Her dick, already iron-hard, seems to swell thicker, looking like a flat-tipped, over-inflated sausage.  Bulging obscenely, the underside of her cock swells with lusty intent, the distention moving up with muscular contractions until the vulpine girl's cum-slit is wide and filled with white.`
        );
        this.outx(
            "\n\nThe onyx asshole wringes you with every ounce of force its owner can apply, convulsing into a tight cock-ring that"
        );
        if (this.player.hasKnot(x) && this.player.cockArea(x) < this.urtaCapacity())
            this.outx(" only makes your knot bigger and harder.");
        else {
            this.outx(
                " works you so hard an irrational part of your mind worries your manhood will be pinched off."
            );
            if (this.player.cockTotal() > 1) this.outx("  Good thing you have more.");
        }
        this.outx(
            "  Then, the fox stops being a fox and turns into a fountain, spewing a wave of white up over her head and into the wall.  It hits with a wet 'splat', flinging alabaster globs in every direction that burst like little bombs.  Spunk rains down over Urta, staining her bed and her in equal measure.  A lock of gunked-up hair flops across her face, temporarily blinding your orgasm-inundated lover.  Just when the dripping jizz slows and you think the worst is over, Urta goes off again, though this fountain of white has a little less force than the preceeding cumsplosion.  A wave of semen as thick as your wrist spurts out to take the fox in the face, plastering the rest of her lustrous hair to her forehead and glazing her visage with ivory lust.  Ringlets of her "
        );
        if (this.flags[kFLAGS.URTA_QUEST_STATUS] < 0) this.outx("not-so-fertile ");
        this.outx(
            "fluid dangle precariously from her jawline as she tries to breathe, coughing and making bubbles from her white mask."
        );
        this.outx(
            "\n\nTight in your grip, Urta's nipple seems harder than ever.  You give it a gentle twist, milking another moan from the spasming body below as it lets loose a third torrent of seed.  The fox juice splatters between her tits, washing her upper body with slick bliss.  Rivers of it roll off her into the sheets; the mattress soaks it up like a sponge but still squishes and puddles with every shift and movement you make.  Unable to restrain herself any longer, the sperm-soaked fox grabs her dick with both hands, pumping from flaring tip down into her sheath.  Her asshole wrings you tighter through the next three blasts she unleashes.  She soaks herself, the headboard, and the wall until all three are covered in a uniform cum veneer.  Still, the productive fox isn't spent, and her drooping member continues to ejaculate more spunk.  Tendrils of hot jizz reach down to the floor, collecting there as the bed floods.  Her mouth opens to catch some of it, greedily gulping down a tiny portion of her own equine icing."
        );
        this.outx(
            `\n\nUnable to bear the tightness wringing at your ${this.cockDescript(
                x
            )} you pull back`
        );
        if (this.player.hasKnot(x) && this.player.cockArea(x) < this.urtaCapacity())
            this.outx(" with a lewd pop, freeing your knot");
        this.outx(
            ", exiting Urta's torturously squeezing anus.  With the pressure on her prostate relieved, the voluminously virile vixen finally relaxes, her cock belching only a few more 'small' loads over her reclining form.  She sags back into the drenched cushions, with every motion leaving a glittering web of spooge in its wake.  Exhaling in exhaustion, your cream-coated fox blinks cum from her eyelashes as she stirs to smile at you. [EachCock], already rock hard from the fucking it was so recently dispensing, grows painfully erect."
        );
        this.outx(
            "\n\nYour eyes lock onto the slick valley between Urta's well-formed breasts and seeing the source of your release, you climb into the morass with her.  Before you can even mount her, you lose your grip on the spunk-slicked bedding and fall onto soaked fur.  Giggling, the vixen lamely pulls you into her, into the mess.  She's too weak to put up much of a fight, and you quickly fight your way up onto her chest, planting [oneCock] right into her tits.  The salty fox-horse cream makes the perfect lubricant for tit-fucking.  Urta laughs happily, drunk on pleasure"
        );
        if (this.urtaDrunk()) this.outx(" and of course, alcohol");
        this.outx(
            `, kissing your ${this.player.cockHead(
                x
            )} every time it peeks past her tits, relishing the taste of her own lust all over it.`
        );
        this.outx(
            "\n\nSoon, the sultry spunk-vixen has a breast in each hand, and she alternates bouncing them up and down.  To one side, your dick feels like it's sliding into a sopping twat.  On the other, it's thrusting in.  Above, you're treated to the sight of her chest heaving and bouncing, lewdly jiggling around your cock as she services you.  You groan in bliss as you climax, unable to endure the sight and sensation, let alone the musky, sexual smell that pervades Urta's bedroom.  She opens wide to catch your climax in her mouth"
        );
        if (this.player.cumQ() < 250) this.outx(", swallowing with a smile and a wink.");
        else {
            this.outx(", but she's forced to close it when her cheeks are puffed beyond reason.");
            if (this.player.cumQ() > 750)
                this.outx("  You go on to wash her face with your own white sauce.");
            if (this.player.cumQ() >= 1200)
                this.outx(
                    "  Your orgasm goes on and on, coating just about everything that Urta came on with yet another layer."
                );
            if (this.player.cumQ() > 3000) {
                this.outx("  She gasps in surprise when you flood the ");
                if (this.player.cumQ() > 10000) this.outx("first few feet of the ");
                this.outx("room, looking up at you in admiration through cum-coated eyelashes.");
            }
        }
        this.outx(
            "\n\nAs you finish emptying your [balls], you sag down into the fox's arms.  She plants a salty kiss on your lips "
        );
        if (this.urtaLove())
            this.outx(
                "and nuzzles against your cheek, just holding you for a few moments, lover to lover."
            );
        else this.outx("and sheepishly pulls back.");
        this.outx(
            `  Climbing out of the alabaster-painted bed is no easy task, but the two of you manage, laughing and leaning on each other's arms.  Urta leads you to a cabinet in another room, and bends over to open it.  You barely notice her pulling out mops, buckets, and cleansers.  Instead, your vision is riveted to her asshole, still gaped lewdly in the shape of your ${this.cockDescript(
                x
            )}.  When she comes up with an armload of cleaning supplies, you're `
        );
        if (this.player.cor < 50) this.outx("blushing");
        else this.outx("smiling devilishly");
        this.outx(".");
        this.outx(
            '\n\nUrta smirks, glancing from your hardening groin up to your eyes, and says, "<i>Come on, you horn-dog, let\'s go clean up your mess.  You can help me fill a few condoms later.</i>"'
        );
        this.player.orgasm();
        this.dynStats("lib", 0.2, "sen", -3);
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] += 2;
        this.urtaLove(2);
        this.flags[kFLAGS.TIMES_FUCKED_URTA]++;
        this.player.slimeFeed();
        // [Next]
        this.menu();
        this.addButton(0, "Next", this.UrtaGetsPeggedCleanUp);
    }
    private UrtaGetsPeggedCleanUp(): void {
        this.clearOutput();
        if (this.player.cor >= 50)
            this.outx(
                "You start to duck out, but the disapproving glare the fox gives you makes it clear that you won't be getting any more messy fun unless you stick around to clean it up this time.  Damnit.  "
            );
        this.outx(
            "With Urta's help, you slowly clean up the mess you two made, nearly clogging the plumbing a few times in the process.  New sheets, pillows, and furs are brought in, and you help her fix her bed.  The floor is mopped, the walls are scrubbed, and the shutters are opened to let in some fresh air.  Thankfully, just about everything is watertight and sealed, likely something she had done to ease situations such as this.  All told, between clean-up and sex, you spend a few hours with her."
        );
        this.outx(
            "\n\nTenting her apron (the only thing she's bothered to put on), Urta gives you a "
        );
        if (!this.urtaLove()) this.outx("wave");
        else this.outx("tender hug");
        this.outx(" and sends you on your way.");
        this.doNext(this.camp.returnToCampUseFourHours);
    }

    // [Get Filled Up At The Cum Pump Or Something This Was Supposed To Be A Joke]
    private fillMeUpPleaseUrta(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-home-female-fucked"), false);
        this.outx(
            'Lazily discarding the latex, you caress Urta\'s stocking-clad leg and coyly climb into bed.  She starts to reciprocate your affections, but you push her arm away, instructing, "<i>Let me... let me have this.</i>"'
        );
        this.outx(
            "\n\nGingerly holding the beast between her thighs, you take a moment to admire the texture, the forgiving sponginess of the stiffening flesh and its smooth surface, broken only by a collection of pulsating veins and a thick ring that splits the middle.  You squeeze the musky fur of her snatch and pull it down, revealing another inch or two of moist dick for you to tease; Urta shivers at your touches on her sensitive flesh.  Looking up to meet her gaze, you bend down with glacial slowness, eventually laying the flat of your "
        );
        if (this.player.tongueType > TONUGE_HUMAN) this.outx("prodigious ");
        this.outx(
            "tongue upon her turgid mass.  Lewdly, you kiss the underside, worshipping it with your lips as you trail moist affection up the horse-cock's gradual arch.  You nibble on her medial ring when you find it, lashing it with your tongue as you stop to harass her nerves.  Then, without warning, you resume your upward travels, watching the fox whimper and shake as your tongue tantalizes her equine member."
        );
        this.outx(
            "\n\nUrta's hips silently work, trembling slightly each time they start to lift up.  Of course, you force them down into stillness and return to lubricating the horse-like length before you.  Her tip flares a little as you near it, pulsing with pleasure at every idle oral affection you plant.  You stretch your jaw to fully encompass her tip, taking it into your mouth and looking up at the herm.  Her eyes are closed, her mouth open and panting.  Hanging to the side, Urta's tongue pulsates in time with her unrestrained panting.  You circle her urethra with your tongue and smile around the throbbing dick when a salty drop of pre-cum lands on your tongue."
        );
        this.outx(
            "\n\nYou release Urta from your oral embrace, laying her rod back down on her soft fur with great care.  Whining, she tries to grab your head and pull you back in place, but you twist to the side and slap her searching hands away, sliding up her body to hold them above her head.  You pin them to the headboard, leering over your prize with ardor, your [vagina] heavy with lust and equally wet."
        );
        if (this.player.wetness() > 3)
            this.outx(
                "  You're so utterly soaked thanks to this place that a steady stream of vaginal lubricant drizzles over the meaty tool below."
            );
        if (this.player.hasCock())
            this.outx(
                "  Hard and erect, [eachCock] stands tall and proud, but ignored.  You have other plans."
            );
        this.outx("  She's ready.  You're ready.  It's time.");
        this.outx(
            "\n\nReleasing the guardswoman's hands, you shift to grip her throbbing erection and lift it up, raising it until it stands vertically, the spongy-yet-hard tissue wobbling slightly under its own weight.  Giggling absurdly, you begin to lower yourself onto it, pressing your vulva up against the spit-slathered shaft.  Urta whimpers but holds her place, her hands still up against the headboard where you left them.  The exquisite texture of that hot flare pressing up against your labia sets your body ablaze with pleasure, and you grind your hips over it with unthinking adulation, worshipping the herm's heady cock with your cunt.  A burst of pre-cum distends the vulpine woman's cum-slit long enough to soak you further"
        );
        if (this.player.wetness() > 3)
            this.outx(
                ", though it's a drop in the bucket next to your copious moisture.  Hell, even now, rivers of your girl-goo are sliding down that spasming length, wreathing it in lady-spunk"
            );
        else this.outx(", deliciously staining your slit");
        this.outx(".");
        // {Virgin PCs}
        if (this.player.vaginas[0].virgin) {
            this.outx(
                '\n\nSmiling a little nervously after coming so far, you say, "<i>You know I\'m a virgin, right?</i>"'
            );
            this.outx("\n\nThe vixen sits bolt upright, her face just inches from your ");
            if (this.player.tallness > 80) this.outx("[clit]");
            else if (this.player.tallness > 60) this.outx("belly");
            else this.outx("[chest]");
            this.outx(
                ' as she cranes her neck to meet you, eye to eye.  "<i>Really?</i>"  You nod, biting your lower lip as you continue your frenzied undulations upon her rod, working yourself up to taking her.'
            );
            this.outx(
                "\n\nUrta wraps her arms around you, hugging you tight, though she doesn't take you away from her member.  Moisture beads at the corners of her eyes as she "
            );
            if (this.urtaDrunk()) this.outx("drunkenly ");
            this.outx('asks, "<i>Are you s');
            if (this.urtaDrunk()) this.outx("h");
            this.outx("ure?  You don't have to...</i>\"");
            this.outx(
                '\n\nYou ruffle her hair and nod, slowly beginning to lower yourself.  Her tip, flared as it is, is simply too wide for your channel at first, and stubbornly refuses to slide into your lips.  Urta pries your womanhood wide and gently shifts her member, easing half her cocktip into you at a time.  Eventually, she goes in, and the vixen gasps, "<i>So t-tight!</i>" with her eyes crossing from pleasure.'
            );
            this.outx(
                "\n\nTo you, the situation is almost painful, but you soldier on, determined to give the affectionate herm your maidenhead.  You squat lower, tearing something as you take the first few inches into your nethers.  It hurts, and there's a little blood, but as more and more of that shaft is sheathed in your sensitive slit, it begins to feel better and better, exquisitely pleasurable."
            );
            if (this.player.hasCock())
                this.outx(
                    "  Drool begins to leak from [eachCock], slicking the underside with pre-cum as the pleasure affects your maleness."
                );
            this.outx(
                "  Before long, you've taken Urta halfway, with her ring jutting up against your entrance."
            );
            // {cuntChange 30}
            this.player.cuntChange(30, true, true, false);
            this.outx(
                "\n\nUndaunted and spurred on by how good it feels, you ease yourself into your lover's hands, lowering your body an inch at a time, gradually widening your [vagina] to handle her spear and magic helmet, stretching your nethers into a reverse mould of that affectionate prick-vixen's tool.  You doubt anything will ever fit you as perfectly or rightly again, or scrape every inch of your birth canal so flawlessly.  It hurts a little, stretching like this, but it's worth it to watch the fox's face slowly lose its reserve, splitting into a dopey, pleasured grin as you sink the whole way to her balls."
            );
            // {cuntChange 60}
            this.player.cuntChange(60, true, true, false);
            this.outx(
                '\n\nYou rest in her lap and kiss her, bringing her out of her stupor.  Urta bashfully murmurs, "<i>Thank you,</i>" before kissing back, hugging you tightly for a few moments.  Bound up in each other, you share the tender expression of affection a little longer.'
            );
            // {+15 Urta love}
            this.urtaLove(15);
        }
        // {NOT VIRGIN TEXT}
        else {
            this.outx(
                "\n\nWithout pausing, you squat down, lowering your [vagina] to ensnare the stallion below, lassoing it with ease in your clingy, stretching lips.  Urta moans as you take her flare, lifting her hips slightly to meet you, driven beyond reason with lust.  You place a hand on her rising belly for support and ride her like a bucking bronco, sliding lower with every thrust, gradually spreading yourself around the welcoming heat of her throbbing member.  You can feel the ring around the middle of her mottled horsecock caressing your silky tunnel even as the flare presses harder on it, further in.  It's an exquisite sensation that you focus on as you work to fully enclose your rebellious lover, snaring her prick in your silky, lubricated twat."
            );
            this.outx(
                "\n\nUrta's eyes roll back and she lifts her hips powerfully one last time, and in the motion she takes you fully, embedding all twenty inches of her length inside you.  Her sheath grinds into your outer lips as she continues to push, but there is no further penetration to be had.  You're completely, utterly speared, penetrated fully by the vixen's horse half.  As if realizing this, Urta lowers herself down, twitching slightly as she adjusts to the slippery warmth of your [vagina]."
            );
            // {cuntChange 60}
            this.player.cuntChange(60, true, true, false);
        }
        this.outx(
            '\n\nUrta grabs you by the hips, ready to go to town on you, but you stop her with a simple motion.  Shaking your head, you coo, "<i>Let me.</i>"'
        );
        this.outx(
            "\n\nThe fox reluctantly nods, doing her best to hold still as you set to work.  You slowly raise yourself up, your wet lips clinging to every inch of the well-lubricated shaft as it exits your sodden pussy.  Once only the flare remains inside, you lower yourself back down, sliding slowly back into place just a little faster, assisted by gravity as you are.  It feels so good, so heavenly, that you just can't keep up the languid pace.  After a few simple strokes, you find your [hips] beginning to move faster, pumping Urta in and out, slapping back down with lewd, wet smacks that can doubtless be heard from the street below."
        );
        if (this.flags[kFLAGS.PC_FETISH] > 0)
            this.outx(
                "  An exhibitionist thrill runs through you at that, making you even wetter."
            );
        this.outx(
            "\n\nLeaning forward, you place your hands on Urta's bosom.  The fur on her chest is silky smooth, and seems to cradle your fingers as they knead her heavy orbs, unashamedly groping the well-endowed hermaphrodite as you plow yourself on her.  Her nipples dig furrows into your hands, hard as bullets, forcing you to change tack after a few seconds of enjoying those sweet tits.  You caress and tweak at the nubs, squeezing them between fingers and tugging slightly, never stopping the movement of your [hips]."
        );
        if (this.player.hasCock())
            this.outx("  You don't even notice [eachCock] dripping on Urta's belly.");
        // HERMS:
        if (this.player.hasCock()) {
            this.outx(
                "\n\nUrta does, however, and takes [oneCock] in hand to pump it, smearing you with your own pre-cum for lubricant.  You moan out loud at the surprise handjob, swiveling your hips around in an attempt to fuck her hand and cock at the same time.  It's a cacophony of bliss, an explosion of sensation, and you barely hang on for dear life as it flows through you.  Your body bounces atop Urta's like a jackhammer, wildly thrashing and undulating as pleasure overwhelms you."
            );
            this.outx(
                "\n\nThe first sign of your orgasm is a spurt of cream that fills the fox's hand"
            );
            if (this.player.cockTotal() > 1)
                this.outx(
                    `, followed in short order by the untouched portion of your ${this.multiCockDescriptLight()}`
                );
            this.outx(
                ".  The next is your [vagina] going wild, convulsing from your entrance towards your womb with muscular contractions that milk Urta's cock relentlessly, causing it to grow bigger and harder inside you.  Urta whimpers slightly as you jizz over her belly"
            );
            if (this.player.cumQ() > 400) {
                this.outx(", soaking her");
                if (this.player.cumQ() > 1000) {
                    if (this.player.cumQ() < 2000) this.outx(" and her bed");
                    else this.outx(", her bed, and damn near everything else");
                }
                this.outx(" with your ejaculate");
            }
            this.outx(
                ".  There's a bloom of warmth from below as the vixen's orgasm rushes towards you, and all you can do is cum your brains out in anticipation of being filled."
            );
        }
        // NON-HERMS:
        else {
            this.outx(
                "\n\nMashing your glistening delta into the herm-fox's balls again and again, you begin to whimper with need, too hot and wet to care what you sound like.  Your body goes on autopilot, slamming harder and harder into Urta, riding her eagerly, desperately, mashing your [clit] into her stomach fur without care for anything other than your own pleasure."
            );
            this.outx(
                "\n\nThe first sign of your orgasm is a cunt-clenching explosion of satisfaction that worms through your womanhood, sending your muscles into fluttering convulsions.  As you scream in exquisite enjoyment, you feel those contractions settling into a rhythm that squeezes the vixen's horse-prick from stern to stem, milking the thick cock, egging it on towards the heady rush of climax.  You can feel it thickening, becoming more rigid inside of you, and as Urta nears orgasm of her own, all you can do is cum your brains out in anticipation of being filled."
            );
        }
        this.outx(
            "\n\nThere's an odd, shivering motion beneath you, in the herm's taut nutsack.  A moment later, your spasming cunt is forced to open wider, stretched by a bulge of cum that visibly distends not just the cock it travels through"
        );
        if (
            this.player.thickness < 50 &&
            (this.player.pregnancyIncubation == 0 || this.player.pregnancyIncubation > 200)
        )
            this.outx(" but the outline on your abdomen as well");
        else this.outx(" but your [vagina] as well");
        this.outx(
            ".  It sets you aflutter all over again, just before it bursts against your cervix.  Urta's hands dig into your sides as she suddenly pulls you against her, somehow squeezing another inch of cock into you from somewhere, battering her tip directly against your inner opening.  The next slit-stretching pulse of jism erupts directly into your womb, filling you with salty horse seed in an explosion of warm indulgence."
        );
        this.outx(
            "\n\nYou bubble happily, a sense of motherly pride welling up in your breast as you continue to cum, your [vagina] helplessly milking the equine invader with rapacious hunger.  Again, it cums, injecting another plus-sized load directly into your precious baby-maker.  It fills you with enough force to round your belly a little, giving you a nice, sperm-bloated paunch.  Urta's hands dig into your [butt], holding you still and immobile, as if she were restraining you in order to fully breed.  The onrushing spunk expands your womb further, stretching your belly tight.  Rivulets of spooge squeeze out the sides of your clenching cunt as your jizz-packed body fails to hold it all in."
        );
        this.outx(
            "\n\nStill, that doesn't seem to concern the vixen as she continues to cream your twat further, stuffing you so full that your belly button pops out"
        );
        if (this.player.biggestTitSize() >= 4)
            this.outx(" and your [chest] rest heavily upon your cum-stuffed form");
        this.outx(".");
        if (this.player.pregnancyIncubation > 0 && this.player.pregnancyIncubation < 150)
            this.outx(
                "  You may have been pregnant before, but you're beyond pregnant now... with cum AND child."
            );
        // {Goo:
        if (this.player.isGoo() && this.player.vaginalCapacity() > 9000)
            this.outx(
                "  Successive eruptions make you bigger, but your flexible cunt soon grows so bloated that the onrushing injections mostly squirt back out, painting Urta, the bed, and your [legs] white with cum."
            );
        else
            this.outx(
                "  Successive eruptions do little to bloat you further - your body is stretched to capacity, so the onrushing injections only squirt back out through your entrance, painting Urta, the bed, and your [legs] white with cum."
            );
        this.outx(
            "\n\nYour pussy, spent after cumming so long, gives up and goes slack, vacantly allowing fluid to flow in and out.  You're equally exhausted by the ordeal and your heavy womb.  Swaying to the side, you lose your balance and slide off, coming to rest next to the still-spurting fox.  She's pumping her tool hard, spraying semen into the air to rain down over both of you.  The fox revels in it, wildly moaning and thrashing, smearing it into her skin and yours."
        );
        this.outx(
            "\n\nEven after she finishes painting the walls and ceiling white, Urta flops her drooling member onto your ass and allows it to thoroughly cream your crack.  She rubs it all over your butt, squeezing and kneading your backside as she comes down.  After a while, you roll over and return the favor, massaging the fox with her own orgasmic goo.  You're both white messes, but thoroughly, delectably sated."
        );
        this.outx(
            "\n\nYou snuggle with the vixen a while, simply enjoying the comfort while your [vagina] drains.  It doesn't completely empty, but your belly-button does pop back in.  You'll probably look "
        );
        if (this.player.pregnancyIncubation > 0 && this.player.pregnancyIncubation < 150)
            this.outx("even more ");
        this.outx(
            "pregnant for a while, at least until you can pass all that filling!  She plants a salty kiss on your lips "
        );
        if (this.urtaLove())
            this.outx(
                "and nuzzles against your cheek, just holding you for a few moments, lover to lover."
            );
        else this.outx("and sheepishly pulls back.");
        this.outx(
            "\n\nClimbing out of the alabaster-painted bed is no easy task, but the two of you manage, laughing and leaning on each other's arms.  Urta leads you to a cabinet in another room, and bends over to open it.  You barely notice her pulling out mops, buckets, and cleansers.  Instead, your vision is riveted to her cock, still soaked with your juices and oozing a trickle of sperm.  When she comes up with an armload of cleaning supplies, you're "
        );
        if (this.player.cor < 33) this.outx("blushing");
        else if (this.player.cor < 66) this.outx("grinning");
        else this.outx("openly leering");
        this.outx(".");
        this.outx(
            '\n\nUrta smirks, glancing from your slickening groin up to your eyes, and says, "<i>Come on, you horn-dog, let\'s go clean up your mess.  You can help me fill a few condoms later.</i>"'
        );
        // [Next]
        this.menu();
        this.addButton(0, "Next", this.cleanUpAfterUrtaCreamInjectsYou);
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] += 2;
        this.urtaLove(2);
        this.flags[kFLAGS.TIMES_FUCKED_URTA]++;
        this.player.slimeFeed();
        if (this.flags[kFLAGS.URTA_FERTILE] == 1)
            this.player.knockUp(PregnancyStore.PREGNANCY_URTA, PregnancyStore.INCUBATION_URTA, 25);
        this.player.orgasm();
        this.dynStats("lib", 0.2, "sen", -3);
    }

    private cleanUpAfterUrtaCreamInjectsYou(): void {
        this.clearOutput();
        if (this.player.cor >= 50)
            this.outx(
                "You start to duck out, but the disapproving glare the fox gives you makes it clear that you won't be getting any more messy fun unless you stick around to clean it up this time.  Damnit.  "
            );
        this.outx(
            "With Urta's help, you slowly clean up the mess you two made, nearly clogging the plumbing a few times in the process.  New sheets, pillows, and furs are brought in, and you help her fix her bed.  The floor is mopped, the walls are scrubbed, and the shutters are opened to let in some fresh air.  Thankfully, just about everything is watertight and sealed, likely something she had done to ease situations such as this.  All told, between clean-up and sex, you spend about four hours with her."
        );
        this.outx(
            "\n\nTenting her apron (the only thing she's bothered to put on), Urta gives you a "
        );
        if (!this.urtaLove()) this.outx("wave");
        else this.outx("tender hug");
        this.outx(" and sends you on your way.");
        this.doNext(this.camp.returnToCampUseFourHours);
    }

    private lippleBondUrtaScylla(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-syclla-3some", "vert"), false);
        this.outx(
            "With a grin, you approach the busty - bustier duo and lower yourself level with the woman doing most of the work.  Urta watches you with evident anticipation, probably thinking about whether you intend to join in on the oral assault on her - maybe give some attention to her overfilled balls, swelling bigger and bigger under Scylla's tender caresses, or the wet slit of a prize behind them, but you have a different thing in mind for them."
        );

        this.outx(
            "\n\nYou do reach out between Urta's legs just to avoid making her feel left out... or maybe it just goes with the spirit of the teasing you want to give her.  Her balls have already grown beyond their normal size and Scylla is intensely kneading them, so you have to reach around them to actually touch her pussy.  Sure enough, it's soaking wet and feeling the touches on both of her sexual organs causes Urta to moan loudly.  As you rub on her pussy lips gently, only giving the occassional flip to her clit, you direct your other hand elsewhere - to the nun's habit.  Slowly, you run your hand over one of her heaving, magnificent breasts, causing her eyes to dart to you rather than her 'meal'.  Scylla blushes as you press a single finger on the habit covering her mountainous cleavage, almost feeling the breath of her tit-lips on your arms as her breasts swell with air.  You increase the pressure and, surely enough, with her next breath in, the habit simply gives way, and your finger is suddenly inside the ripped folds.  Both you and Urta watch in amazement as you pull the increasingly-ripped dark cloth away, exposing Scylla's cream-filled, squishy jug of a left tit.  Your fingers purposely brush against her lipple, the ruby mouth trying to suck in a thumb as you feel the heat and wetness of it.  You pull the busty nun towards yourself, lowering your [face] towards the leftmost of her lips, and pressing your own against hers.  Scylla squirms in your embrace, moaning into Urta's cock, whom in turns shivers herself from both the sensation and the sight, and you can feel her female sex squelch as it gushes some fluid over your fingers."
        );

        if (this.urtaLove())
            this.outx(
                "\n\n\"<i>Hey, love, that's unfair... why's she the one getting the kisses? Trying to make me jealous?</i>\"\n\nYou smile, wondering if Urta even noticed where the lip that you're kissing is located."
            );
        else
            this.outx(
                "\n\n\"<i>I... guess she has more of these to kiss with, but... umm...</i>\"  Seeing you entranced with Scylla's tits and lipples, not to mention being interrupted by the nun's slurps, half-moans, and her own sensations, Urta stops mid-sentence."
            );

        this.outx(
            "\n\nYou slip the tip of your tongue inside Scylla's magnificent mound, tasting her rich cream and essentially making out with her breasts, feeling [eachCock] harden completely from all the visual and mental stimulation accumulated from the act."
        );

        this.outx(
            "\n\nFinally, you break the kiss, separating from the nun, hearing something of a sigh and a few sounds of her left breast still sucking at the air.  Without any further ceremony to it, you reveal Scylla's other tit to the air, raise to full height and shed your [armor], exposing your groin to the air of the back rooms."
        );

        this.outx(
            "\n\nYou gently pull at Scylla's small horns to get her away from Urta's cock, while helping your vulpine lover up to her feet.  The nun looks at you, puzzled, and then notices the head of your [cock biggest] almost prodding at her lipple.  She probably gets the idea by now, but you voice the opinion that since there's enough cock to go around, you should allow Scylla's 'extra' lips to get their own meal as well."
        );

        // [pg]
        this.outx(
            "\n\nUrta quivers with excitement as the nun leads the flared tip of her cock towards her other breast, with a heavy blush, but anticipation of the pleasure and feeding evident on her face.  You feel the tip of [oneCock] pressed against Scylla's breast-lip and it's agonizingly slowly drawn and sucked inside, with Urta holding your hand anxiously as the same is done to her own cock."
        );

        this.outx(
            "\n\nYou feel Scylla's heartbeat pulsing through your member as it's drawn inside the hot and milky-moist tit, the pressure and said pulsing sensation making you let out your own sound of pleasure."
        );

        // [if (cocks > 1)
        if (this.player.cockTotal() > 1)
            this.outx(
                "  Without much warning, you suddenly feel Urta's hand move away from your own palm, the sensation of your [cock smallest] being wrapped by her fingers also assaulting you as she squeezes and tugs at your second cock affectionately."
            );
        // [if (cocks > 2)
        if (this.player.cockTotal() > 2)
            this.outx(
                "  The barrage of sensations is intensified when Scylla also gets a bit greedy, grabbing another tool and starting to jerk it off as well."
            );

        this.outx(
            "\n\nAs you're being sucked inside Scylla's breast, Urta moans loudly at the intense sensation of finding herself inside the overstuffed, warm, wet folds of Scylla's breast as her cock is being lapped at.  Both of you reflexively buck your hips, pushing through any resistance the tits may offer at a later point and lodge the two lucky cocks deep inside the nun's chest.  This causes her to throw her own head back and moan in ecstasy at the mind-blowingly filling intrustion into her chest.  [EachCock] is stimulated with"
        );
        // [if (cocks > 1)
        if (this.player.cockTotal() > 1) this.outx(" either");
        this.outx(
            " the holy woman's ravenous lipples and inner, erotic tit-flesh in a mutually ecstatic, sensations-filled manner"
        );
        if (this.player.cockTotal() > 1)
            this.outx(" or more delicately and less hungrily with a feminine hand");
        this.outx(".");

        this.outx(
            "\n\nYou feel Scylla's breast tighten against your dick, trying to force it to give up your seed it as the flesh of and around her nipples reddens and swells from the strain, effort and arousal.  Scylla's entire soft body trembles and quakes as the inner muscles of her breasts lap against your shaft, covering it with her rich milk as it slightly spills around your [cock biggest], with the nun moaning ecstatically in what is apparently an intense orgasm.  Urta's back bends over, not used to such a new stimulation, and one of her hands reaches towards your [chest] for support."
        );

        this.outx(
            "\n\nYou turn towards the orgasm-nearing fox woman, and she raises her head in understanding, seeking out your lips for an intense, passionate kiss.  Scylla's own hands move over her breasts, kneading the soft flesh stabbed repeatedly with hard cocks as the two of you begin to move your hips in unison, actively penetrating the two lustfully suckling breast-mouths as the nun runs her fingers over the swollen lipples, intensifying her own sensations, the rich cream mixing with the precum of your [cock biggest] and Urta's equine member, occasionally dripping out of the breast-lips and giving Scylla's underboobs an oily sheen."
        );

        this.outx(
            "\n\nThe increasing pressure of tit-flesh over your [cock biggest] starts to feel increasingly unbearable.  The three of you release a whimper of overwhelming pleasure in unison, you and the nymphomaniac herm vixen from the sensations of being drowned in Scylla's milk and tit-flesh and the nun from the stimulation of both her sensitive ruby lips and the tight, hungry inner folds of her immense breasts.  You're torn between wanting to grab the nun and fuck her mounds hard as the semen starts to boil inside you, wanting out, and allowing the duo of addicts to allow themselves their own pace, one that keeps you in an incredibly pleasuring, feverish arousal and almost causes you to squirm from the intensity of the multitude of sensations.  The next time you pull out for a bit, you can feel Scylla's lips slide down your cock just as her fingers travel over it, seeking the sensation of your body as she struggles against the increasingly overwhelming assault on her sensitive lipples and inside of her heaving magnificent orbs."
        );

        this.outx(
            "\n\nUrta starts to pant and almost howls as she recognizes Scylla's touch on her cock, traveling towards her swollen, cum-packed balls, probably to attempt to increase the nun's incoming meal."
        );

        this.outx(
            "\n\n\"<i>T...thish ish... just too awesome... My-my-my dick!  Marae'sh titsh, my dick's in paradise!  I'm gonna cum!  Gonna cum!  Gonna cum!</i>\""
        );

        // if (sensitivity < 29)
        if (this.player.sens < 29)
            this.outx(
                "  You can only tell so from her expression and from Scylla moaning and gasping sharply, but it appears Urta's cock is really just about ready to shoot off cum."
            );
        // if (sensitivity > 29)
        else
            this.outx(
                "  Scylla's titflesh slightly shifts from what is apparently the expansion of Urta's cock flare and the twitching of her massive shaft.  You're sensitive enough to notice."
            );
        // [if (sensitivity > 44)
        if (this.player.sens >= 44)
            this.outx(
                "  In fact, you can clearly feel the pressure inside Scylla's chest increasing as Urta's huge cock expands and twitches inside her next to your own, each such twitch sending a shiver of pleasure through both you and the nun."
            );

        this.outx(
            "\n\nSympathetic, you slide your hand down into the crevice of Urta's buttocks and lower, into her sopping wet cunt, fingering the vixen as her orgasm approaches."
        );

        // [pg]
        this.outx(
            "\n\nScylla turns a feverish gaze towards you as well, licking her lips in ravenous anticipation of her meal.  You notice her hand has already reached the [sheath] of your member."
        );
        this.outx(
            '\n\n"<i>You, too, [name].  I want to feel you spurt your delicious... cream in my breast.  Cum together with her... let the pleasure of being with us both wash over you...  My breasts so thirst for my guardian angel\'s essence.</i>"'
        );

        // [Regular Urta]
        if (!this.urtaLove())
            this.outx(
                "\n\n\"<i>This feelsh so good, [name]!  I'm gunna cu-u-uhmmm in her titsh!  I'm gonna flood these freakishly huge titsh of yours, Sh-cc-cylla!</i>\""
            );
        // [Lover Urta]
        else
            this.outx(
                "\n\nUrta looks to you as she thrashes in pleasure.  \"<i>Fuck yes!  Love, cum with me.  Let's flood that horny nun's breasts with our mixed jizz!  I want to feel your sperm washing over my cock together with her milk after you spurt your thick load into this amazing boob!  I want to hear your pleasure-filled voice... Shoot it out for us!</i>\""
            );

        this.outx("\n\nTheir encouragements ");
        if (this.player.cockTotal() > 1)
            this.outx("as well as the hands of both of them working your cocks ");
        this.outx(
            "are enough to push you close to the edge yourself as you start pumping your fingers in and out of Urta's feminine gash, causing her to buck sharply and moan loudly, incoherent words signaling her apparent orgasm flooding the air.  Scylla hums in a pleasure filled voice as she kneads the fox-woman's swelling, already massive balls and the [sheath] of your cock, alternating between looking at you and your vulpine lover.  Finally, you fall completely under the spell of Scylla's hard-working hand and ravenous breasts, losing control over yourself as you feel your [balls] swell, precum leaking in ridiculous amounts from your tip as you feel the incoming load being increased forcefully to an extreme amount by the nun's ever-demanding hunger for your sticky, gooey jizz. The magical sluttiness of the nun is only enhanced by the presence of the warm body to your left, already quivering with her own overdue orgasm preparing to gush out of her, as the wet sounds of Scylla's tit-lips sucking you both off as your precum mixes with her milk now leaking all over your shafts as well as the schlicks of Urta's black snatch slurping audibly on your fingers as you pump them in and out of her fill the air."
        );

        // [pg]
        this.outx(
            "\n\nScylla seems to lose her hazy, satisfied composure as the stimulation of her breasts and the perspective of being fed cum from two sources at once makes her quiver with want."
        );

        this.outx(
            "\n\n\"<i>Cum for me.  I want to feel both the fox-cream out of Urta's delicious shaft and the essence of my precious [name]'s gorgeous [cock biggest] shooting off into me!</i>\""
        );

        // [if (sensitivity < 59)]
        if (this.player.sens < 59)
            this.outx(
                "\n\nThe sound of Urta's passionate voice crying out in climax is all you need to give in to Scylla's ministrations, the nun's hungry breast-flesh rapidly consuming the first spurt of your load as you release your own ecstatic cry."
            );
        // [if (sensitivity >59)]
        else
            this.outx(
                "\n\nIt's simply too much for you and you cum just before your vulpine lover, the hungry, raunchy looks of both beauties causing you to pump your load into Scylla's hungry tit.  With a smile, Urta also gives in to the pleasure delivered to both her cock and her pussy, creaming herself and the inside of Scylla's chest."
            );

        this.outx(
            "\n\nYou feel Urta's sloppy wet box squeezing your fingers as the two of you pump load after load into the nun's tit-flesh, the holy woman's unnaturally erotic, sperm-addicted body sent into quakes and spasms of satisfaction as she starts whimpering and yelling incoherently, occasionally calling your or Urta's name out as drool runs down her chin.  Thick milk mixed with cum flows down her swelling, growing tits, the ground under her kneeling form probably completely showered in the girl-cum of her still untouched womanhood.  The inner folds and muscle rings of Scylla's encompassing feminine mounds quiver, pulse and squeeze around your shaft, milking your extended, fluid-enriched orgasm as she takes her fill."
        );

        // [if (cocks > 1)]
        if (this.player.cockTotal() > 1)
            this.outx(
                "\n\nUrta's hand quickens its movement over your [cock smallest], trying to extend the orgasm flowing through it as well, if not being exactly as pleasurable as Scylla's vacuum-like, jizz slurping tits."
            );
        // [if (cocks > 2)
        if (this.player.cockTotal() > 2)
            this.outx(
                "\n\nYour own hand also travels down to your multiple members, trying to deliver as much stimulation to your [eachCock] as possible."
            );

        // [if (cocks >1)
        if (this.player.cockTotal() > 1)
            this.outx(
                "\n\nYour load spills over your two lovers as well; Scylla's ability to increase the intensity and fluid-production of orgasms causes you to give them quite the gooey shower."
            );

        this.outx(
            "\n\nYour mind almost drifts away from the pleasure washing over your as Urta and yourself are diligently, almost obsessively robbed of all seminal fluids your bodies seem capable of producing, Scylla's body swelling from the generous offering, her tits increasing to an amazing size, probably enough to use as either a pillow for a true giant or a bed for a small enough person.  Her tummy also bulges out slowly as her breasts drink your essence, her eyes rolled to the back of her head from the immense, sexual strain absorbing the jizz from the two of you puts on her body and mind."
        );

        // [if (cumExtreme = true)]
        if (this.player.cumQ() >= 1000)
            this.outx(
                "\n\nYou suddenly realize that so far, you've only shot out a bit more than you usually would, and given Scylla's incredible ability to increase cum production in her \"<i>meals</i>\", she's bound to be stretched to the extreme by your full load.  Surge after surge, wave after wave floods from you into Scylla's own body, Urta giving the two of you a scared look as her own orgasm starts to subside.  Scylla's stomach expands into something you'd see on a naturally pudgy woman pregnant with quadruplets and after a generous meal; her butt grows in size to a voluminous, wet, jiggling, almost liquid-squishy piece of all-encompassing ass you'd only see on the most eroticized, well-knocked-up broodmothers of Mareth.  Her tits continue to grow, darkened ruby lips stretching almost as if they wanted to swallow you whole rather than just try and dry your semen-factories out.  Just as the vision starts to shift from sexily aberrant to scary, cum gushes out of Scylla's mouth and lipples, a wet spot on the back of what remains of her habit suggesting all her orifices may be leaking it, and her expansion stops.  Thankfully, it seems Scylla managed to nearly rationally measure how much she can increase your load before either of you three, or the room itself, breaks completely. The sensation was worth the freak-show, you believe."
            );

        this.outx(
            "\n\nWith a strained whimper, Urta pulls out of Scylla's well-fucked, stretched tit, cum leaking out of the breast before its lipples close down before your eyes, trying to keep it inside.  You also struggle to pull out of Scylla, but the sucking ruby-tipped mound simply doesn't want to let you go, gently lapping on your cock and drawing every single drop of fluid out of you, not to mention it seems Scylla is holding on to you."
        );

        // [If Cock type = Canine]
        if (this.player.hasKnot(this.player.biggestCockIndex()))
            this.outx(
                "  You're not making the problem any easier, in fact, your knot is halfway stuck inside her breast, surged and filled to full size right after your orgasm."
            );

        this.outx(
            "\n\nUrta saunters over to you, the sway of her hips somewhat ungraceful from the intensity of the previous sensation."
        );

        // [Regular Urta]
        if (!this.urtaLove())
            this.outx(
                '\n\n"<i>That was so fucking hot, [name]!  We need to try this again!  Beats any regular titfuck OR blowjob I can imagine, for sure.</i>"'
            );
        // [Lover Urta]
        else
            this.outx(
                '\n\n"<i>[name], lover, that was... amazing.  Our loads... rushing into her!  The shuction!  You next to me, fingering my pussy, the s-shenshation of her tits suckling me...  Cumming around me...  Me fillin\' them with my fox cream as you did the shame on the other side...</i>"  Urta pauses for a moment, drooling, the alcohol and weariness from the pleasure both overcoming her.  "<i>T-the pulsing of everything around me as she consumed our loads... I thought my mind was gonna break!  But...  I hope we can do this again.  Thanksh!  I luv you, [name].</i>"'
            );

        this.outx(
            "\n\nIt apparently took all her focus to say it even that clearly in her alcohol and pleasure-drunk state, as moments later she suddenly falls into your arms, pushing you down onto the ground, your cock finally flopping free of Scylla's lipple"
        );
        if (this.player.hasKnot(this.player.biggestCockIndex()))
            this.outx(", your knot sufficiently deflated now");
        this.outx(", now sucking desperately at the air, looking for the tasty dick.");

        this.outx(
            "\n\nWorried, you look at Scylla, who simply lies on the ground, completely filled and content as her body metabolizes the semen a bit too slowly for her to get up anytime soon."
        );

        this.outx(
            "\n\n\"<i>... No worries, [name].  I'll be fine soon, and she should be too... you can get going, if you need to.  I... don't think I'll be needing another meal anytime soon...  In fact, this is the first time I think I might've gorged myself to the point of sinning and... illness...</i>\""
        );

        this.outx(
            "\n\nYou help the two women lie down safely and comfortably, waiting a bit to make sure Scylla will at least be able to move soon and help Urta get someplace to rest, before leaving the two of them to enjoy their afterglow."
        );
        this.player.orgasm();
        this.dynStats("sen", -2, "cor", 0.25);
        if (this.player.cumQ() < 500) this.player.cumMultiplier += 2;
        if (this.player.cumQ() < 1500) this.player.cumMultiplier += 2;
        if (this.player.cumQ() < 5000) this.player.cumMultiplier += 2;
        if (this.player.cumQ() < 20000) this.player.cumMultiplier += 2;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // 2. Tailjob/Coiling. This could be under \"<i>messy</i>\" scenes for Condomless Urta.
    // Requirements :
    // - Naga Body
    // - Lover Urta
    // - Any gender except for Genderless
    // The scene:

    private nagaOnUrtaMess(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-naga-fuck"), false);
        this.outx(
            "You tell Urta that today, you intend to pleasure her a bit more thoroughly, intimately and in a slightly kinky way, and then maybe have her return the favor, condoms off, regardless of how messy it gets.  She raises an eyebrow, and then you ask her if she'd ever thought about getting off on both ends with the use of your coils.  Her eyes dart open a bit and she seems flustered."
        );
        this.outx(
            "\n\n\"<i>Ummm, well... You know every part of you is hot as far as I'm concerned, [name], but... I'm worried.  Your tail is certainly a bit strong, and wrapping it around my body, and... and around my cock and pushing it inside me...</i>\""
        );

        this.outx(
            "\n\nYou calm her down and ask her to trust you, telling you that when you were human, you'd probably be a bit reluctant to do something like this with someone you didn't trust, either."
        );

        this.outx(
            "\n\n\"<i>Yes, you're right, love... I do trust you, so if you really want to do this, then... let's do it!</i>\"  She seems to ponder something.  \"<i>If we end up making a mess, though, you're helping me clean it...</i>\" she's quick to add, a bit to your dismay."
        );

        this.outx(
            "\n\nShe seems a bit more confident and eager now as you drop your [armor] on the ground, stretching your coils as you instruct her to lie down."
        );

        this.outx(
            "\n\nCrawling onto the bed with Urta already on it, you move your [face] close to her head and lean in for a reassuring kiss."
        );

        this.outx('\n\n"<i>[name]... go ahead. I\'ll try to relax.</i>"');

        this.outx(
            "\n\nSlowly, the serpentine tail wraps around her waist as you allow yourself the pleasure of fondling her breasts while re-initiating that kiss, feeling her lips on yours.  The sensation of her more-than-decent mounds in your hands is rather pleasant, and she seems quite excited with your touch, too, her nipples rapidly stiffening while her equine shaft loses even the hints of floppiness, becoming harder as your tail creeps closer to it."
        );

        this.outx(
            "\n\nMuch to Urta's surprise, though, your coils do not wrap around her cock immediately; no, they move around it and lower, binding her legs before making a return upwards, the tip of a serpentine tail meeting the flat tip of an equine shaft..."
        );

        this.outx(
            "\n\nUrta gasps, feeling your touch, as slowly you slide your tail down her shaft, starting to wrap it up when you close it at the base.  Your fox lover moans as you start to move the tail up and down her shaft, alternating between the speed and strength of your squeezes and tugs.  Soon, Urta tries to thrust her hips gently as well, and you use the opportunity to grab both her hips and her breasts, squeezing them as you stroke her impressive member with your tail.  A few deeper grabs at her bum prompt her to gasp when you get to feel her wetness, proving that being in your coils is indeed exciting your hermaphrodite lover on all ends, as already suggested by her hard shaft and nipples."
        );

        this.outx(
            '\n\nYou gently run your hands over her body as you increase the pace of your strokes, before pulling her in for another kiss.  Urta moans into your mouth and you feel her drip more and more pre all over the two of you.  The vixen is the one to break the kiss, oddly, with a complaint.  "<i>L... lover... neither my pussy nor you are getting any of it like that.  Come on, lemme return the favor...</i>" she says, prompting you to slightly unbind her and raise before again starting to wrap your tail around her member.'
        );

        this.outx(
            "\n\nUrta immediately bows down over to you, eager to return the pleasure she is receiving, and she runs her fingers along your genital slit, provoking you to open it and set your own sex free."
        );

        // [if (cocks = 0)
        if (this.player.cockTotal() == 0)
            this.outx(
                '  Urta runs her fingers over and gently pushes into your now revealed female slit. "<i>My lover\'s sweet, sweet pussy. The best in the whole world.</i>"'
            );
        // if (cocks = 1)
        else if (this.player.cockTotal() == 1)
            this.outx(
                '  "<i>And here is my favorite cock in the whole world... Probably including mine,</i>" she giggles and winks at you.'
            );
        // if (cocks = 2)
        else if (this.player.cockTotal() == 2)
            this.outx(
                "  \"<i>Two delicious cocks, rather than just one...  You're trying to tell me you're the man here, aren't you, lover?</i>\" she giggles and winks at you."
            );
        else if (this.player.cockTotal() == 3)
            this.outx(
                '  "<i>You want to have a spare one just in case or something?</i>" she giggles and winks at you.'
            );
        // [if (cocks >= 4)]
        else
            this.outx(
                '  "<i>Interesting.  It looks like a bouquet.  A beautiful bouquet of cocks just for me,</i>" she giggles and winks at you.'
            );

        this.outx(
            "  Without further ado, Urta leans towards your sex to return the favor, her mouth pleasuring you just as you wrap more and more of your slightly looser coils around her member, having released her legs to allow her to move... and to allow your tail's tip to reach her needy vulpine pussy more easily from that position."
        );

        this.outx(
            "\n\nThat, you do, your tail moving over her cum-filled, heavy balls, teasing them as the rest of your organ strokes your lover's impressive member, Urta's body slightly bent, partially laying on her back and partially on her side as she returns the attention given to her genitals back to you.  Without further ado, you press the tip of your tail against her clit, which causes her to yelp and lower her head, submitting to more of what you are providing..."
        );

        this.outx(
            "\n\nFinally, sensing she's wet and aroused enough, the tip of your tail goes into her pussy, right below her balls, while your coils begin clenching, unclenching and rolling over her member, pleasuring in a more teasing manner than before.  Urta quickly regains her focus and attempts an assault of her own."
        );

        // [if (cocks = 0)]
        if (this.player.cockTotal() == 0)
            this.outx(
                "\n\nYou can feel her tongue sliding all around and pushing its way inside your [vagina], pleasure slowly spreading in your body as well as your hermaphrodite vixen girlfriend goes on to lick and slurp on your womanhood, pleasuring you further and further."
            );
        // [if (cocks > 0)]
        else if (this.player.cockTotal() > 0)
            this.outx(
                "\n\nUrta grabs your [cock biggest] and immediately locks her lips around it, her tongue hitting your tip and flicking all over it, searching to bring you more pleasure before shes slides her lips across your shaft, prompting you to moan gently in response."
            );
        // [if (cocks =2)
        if (this.player.cockTotal() == 2)
            this.outx(
                "  After a while of sucking on your [cock biggest], Urta lets your shaft leave her mouth with a wet slurp and moves over to pleasure your other cock instead.  Immediately, she starts sucking and then deepthroating your [cock smallest], your precum starting to flow more freely into her mouth from that particular erection as well.  She starts to alternate between the two, giving them much needed attention."
            );
        // [if (cocks >=3)
        if (this.player.cockTotal() >= 3)
            this.outx(
                "  While sucking and slobbering on your [cock biggest], your vulpine lover reaches out to start stroking two of your other shafts as well, making her best attempt to pleasure each and every one of your members."
            );

        this.outx(
            "\n\nYour ministrations on Urta become a bit more forceful and frantic, but she seems to be enjoying herself quite a lot, doing her best to intensify the oral and manual assault on your own genitals as you pleasure both of her sexes, the very tip of your tail sliding in and out of her black cunt while your coils work around her equine shaft, now twitching in your serpentine grasp."
        );

        // if (cocks = 0)
        if (this.player.cockTotal() == 0)
            this.outx(
                "\n\nUrta's licking of your [vagina] and manual teasing of your [clit] is proving to be doing a pretty good job at getting you off."
            );
        // [if (cocks > 0)
        if (this.player.cockTotal() > 0)
            this.outx(
                "\n\nUrta's manual and oral stimulation of your maleness is bringing the desired effect as you drip more and more precum into her loving, thirsty maw.  You can definitely get off on this...."
            );
        // outx("  However, it requires no justification that your herm lover is further on her way to an orgasm then you are.");

        this.outx(
            "\n\nIntensifying the coiling around of her member, squeezing her cock and rolling your tail all over her shaft as you tail-fuck her pussy, you prepare Urta for an intense orgasm she seems unable or unwilling to fight off anymore.  You putting one hand on her head to push her further into your crotch and another on her breast for an affectionate squeeze just seems to make her lose control further, and in a few moments, she explodes.  Her vixen box is wrapped tightly around the tip of your tail, convulsing and releasing liquid in a sloppy cascade.  Her balls are pulsing and churning in-between the two affections of your tail, and you can feel her cock distend and twitch in the embrace of your tail, as Urta comes with a loud groan that sends pleasure into you as well.  Her cum shoots out and flows in powerful waves, painting your tail, the bed, and whichever part of her room you direct the flow to white.  Enjoying the show and your feeling of power proves to be enough of an aphrodisiac to prompt your own orgasm..."
        );

        // if (hasVagina = true)
        if (this.player.hasVagina()) {
            this.outx(
                "\n\nYour own pussy is convulsing and twitching as well, Urta's attention proving enough for it to orgasm, drenching some of your tail..."
            );
            // [if (isSquirter = true)]
            if (this.player.wetness() >= 4)
                this.outx(
                    "  After a few convulsions, your femcum starts to shoot out of your pussy quite violently, adding to the mess your lover is making."
                );
        }
        // if (cocks > 0)
        if (this.player.cockTotal() > 0) {
            this.outx(
                "\n\nUrta's constant sucking of your [cock biggest] proves to be enough to push you over the edge, and you deliver your own offering right into her mouth... She drinks and gulps it, hungrily, eager to please you as well."
            );
            // [if (cumHigh = true)]
            if (this.player.cumQ() >= 1000 && this.player.cumQ() < 2500)
                this.outx(
                    "  Her eagerness does end up giving her a swollen tummy, but she's loving and hungry for you until the end, swallowing as much as she can, as quickly as she can."
                );
            // (if [cumExtreme = True]
            else if (this.player.cumQ() >= 2500)
                this.outx(
                    "  Of course, your excessive load proves too much for the poor vixen to handle, and soon she is not only inflated, but painted in your cum as well, the mess the two of you are making definitely nothing to be scoffed at."
                );
        }

        this.outx(
            "\n\nYou continue to stroke her cock and tailpump her pussy during her orgasm, forcing Urta to thrash in your embrace a bit before she finally comes down from her high, licking her lips to taste more of your own fluids.  \"<i>You were amazing, lover... I didn't think it'd feel so good!  But now... we have a mess to clean up... </i>\""
        );

        this.outx(
            '\n\nAfter a much more tender, if still affectionate couple activity, Urta lets you leave, but not before kissing you and sending you home with a blush.  "<i>I guess I should let you do more unusual stuff to me more often...</i>"  She trails off as you march back to your camp...'
        );

        this.player.orgasm();
        this.dynStats("sen", -2, "cor", 0.25);
        if (this.player.hasCock()) {
            if (this.player.cumQ() < 500) this.player.cumMultiplier += 2;
            if (this.player.cumQ() < 1500) this.player.cumMultiplier += 2;
            if (this.player.cumQ() < 5000) this.player.cumMultiplier += 2;
            if (this.player.cumQ() < 20000) this.player.cumMultiplier += 2;
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Lets Lick Some Cum... I mean, uh, fuck pussies?
    private lickOutUrtaAtHome(): void {
        this.clearOutput();
        const x: number = this.player.cockThatFits(this.urtaCapacity());
        if (x < 0) {
            this.outx(
                `Urta takes one look at your ${this.multiCockDescriptLight()} before paling.  "<i>You're a little too big for me...  Is there something else we could try?</i>"`
            );
            this.addButton(0, "Next", this.urtaHomeLuvLuvinsMenu);
            return;
        }
        this.outx(this.images.showImage("urta-home-selfbj"), false);
        this.outx("When you suggest what you have in mind, Urta ");
        if (this.urtaDrunk()) this.outx('slurs, "<i>You want to whaaat?');
        else this.outx('asks, "<i>You want to do what?!');
        this.outx(
            '</i>"  She seems taken aback by the request at first, but as the idea slowly worms its way into her, you see her length begin to pulse a little longer and thicker, lifting away from her slightly with enhanced rigidity.  The hungry look in your eyes must be obvious to the herm, because she slowly, sensually lifts her hefty ballsack to show you just how moist her cunt is.  Rivulets of wet lubricants drip from her puffy, black lips onto her bed as she spreads herself open for you and asks, "<i>You\'re going to stuff this full of cum?</i>"'
        );
        this.outx("\n\nYou lick your chops and nod.");
        this.outx("\n\n\"<i>Then I'd better make s");
        if (this.urtaDrunk()) this.outx("h");
        this.outx("ure I don't make too much of a mes");
        if (!this.urtaDrunk()) this.outx("s");
        else this.outx("h");
        this.outx(
            ", huh?</i>\" she says, reaching over to retrieve one of her condoms.  The immense latex sheath is extra, extra large but still dwarfed by the size of the dick-girl's lusty flare, already leaking its own special lubricants.  She wrestles with the prophylactic until she gets it rolled around her fat tip, wincing when part of it snaps against her sensitive dick-skin.  The reservoir at the tip wobbles as her pre pumps into it, accelerating in pace as the constricting cock-bondage is completed.  Shining dully in the dim, interior lighting, the massive horse-cock is let go, and it flops back onto Urta's furry belly, the tip landing squarely in her sizable bosom."
        );

        this.outx(
            '\n\nThe vixen purrs, "<i>Take me already!</i>" and hefts her large, apple-sized nuts up out of the way to display herself once more.  "<i>Gimme that cum you promised me!</i>"'
        );

        this.outx(
            "\n\nYour [armor] practically removes itself.  Urta lets her fingers play across her nether-lips as she watches, gathering the moisture and rubbing it over her smooth sack.  She groans aloud with barely contained enjoyment while her emerald eyes shine with affection.  You climb into bed after her, eyes flicking meaningfully towards your crotch where your ardor is on full display."
        );

        this.outx(
            '\n\nThe prick-vixen examines you before she demurs, "<i>All that, just for little ol\' me?</i>"  Her fingertips hook just inside her labia, and she spreads them wide for you, supporting her slick sack with her thumbs so that you can see deeply into her twitching channel.  "<i>I\'m ready...</i>"'
        );

        this.outx(
            `\n\nYou climb overtop of Urta and allow your ${this.cockDescript(
                x
            )} to press on into her pussy.  `
        );
        if (this.player.cockArea(x) >= this.urtaCapacity() / 2)
            this.outx(
                "It fits you like a lubricated, stretchy little glove, ensuring every movement will caress her folds."
            );
        else
            this.outx(
                "It's nice and roomy, allowing you full control over how you want to press on her inner folds."
            );
        this.outx(
            `  You push the rest of the way into her cunt and admire the velvety texture of her walls as they close in around you, inner muscles flexing and massaging your ${this.cockDescript(
                x
            )} as she adjusts to your intrusion.`
        );
        if (this.player.cockArea(x) >= 200)
            this.outx(
                `   Stretching ludicrously, her cunt dilates with surprising ease.  The elastic lips of her pussy cling oh-so-tightly to your girth as they're spread beyond reason.  Her hips even spread with only a modest bit of pressure and resistance as her passage is distorted, the shape of your ${this.cockDescript(
                    x
                )} visible through her stretched belly as it pushes towards her tits.  You can even make out some of the larger veins.`
            );

        this.outx(
            `\n\nThe hermaphrodite lifts one of her ebony nipples up to her midnight-hued lips and suckles it eagerly, writhing in the delight.  You meet her hungry eyes as you gently begin to slide back and forth, reveling in the liquid-hot heat of the vulpine woman's snatch with a lusty moan, pumping your ${this.cockDescript(
                x
            )} in and out over and over.  Her secretions are running unchecked onto the bedsheets now, and neither of you care.  You grab hold of Urta's neck to pull her away from her nipple so that you can kiss her on the lips, and you flick your tongue into her mouth.  She demurely accepts the passionate tonguing before allowing her own to slide into yours, slithering to the tempo your [hips] set.`
        );

        this.outx(
            "\n\nThe bed creaks ominously under your aroused bodies, unable to handle the forceful fucking atop it without groaning in protest.  You're slapping into Urta's sex with such force that her ass is bouncing up off the bed when you pull back, and her tits are wobbling around so hard that she has a hand wrapped under them to keep them from hurting her.  Breaking the kiss, you pant for breath.  Keeping up such a reckless pace is slowly wearing you out, but at the same time, listening to the feminine grunts and moans of pleasure that come from Urta is immensely rewarding.  You grab hold of her condom-wrapped cock and begin to jack it off, gathering up moisture from her drooling box for lubricant."
        );

        this.outx(
            "\n\n\"<i>Ohhh, [name]... I can't... can't hold it in!  Fuck yes, I can't hold it much longer!</i>\" the gray vulpine arches her back, her supporting hand grappling with her nipple like a drowning man would hold on to driftwood, fingertips squeezed so tight her arm shakes slightly.  No longer bouncing around, her balls cinch tight up under her fleshy, black sheath, the skin so taut and shiny with her lubricant that you can see them contracting slightly, trying to expel their load.  Urta's eyes cross, and she babbles, \"<i>Gonna... gonna cum so hard, [name]! Can't... sto-oooohhh gods, here it coooomeessss!</i>\""
        );

        this.outx(
            `\n\nThe slutty fox's pussy clenches down on your ${this.cockDescript(
                x
            )} the next time you're bottomed out inside her, spreading rippling waves of hot pleasure from one part of your erection to the next.  Her horse-like boner's flat head balloons almost cartoonishly to turn her condom into a tent.  It expands so much that you can hear the thin material stretching, but it holds, for now.  Her urethra expands big enough to push your thumb off of her shaft, huge fat globs pumping through it.  You shift position to hold her just below her bulging flare and slide your thumb back and forth across it.  Urta's eyes roll back, and she screams, "<i>Ohgodsohgodsohgods, yesyesYES!</i>"`
        );

        this.outx(
            "\n\nSuddenly expanding, the condom's apple-sized pre-balloon doubles in size, with clouds of white cream slowly turning the bubble opaque.  You admire the way her huge loads distend her urethra as they journey through it towards release.  Urta's balls continue to pulse and contract, each time shooting a thick wad of spermy goo into the bulging containment of her condom.  It's grown to be the size of a grapefruit, and shows no sign of stopping its obscene growth.  Urta's screams of pleasure have already devolved into gutteral grunts, matched to the timing of her spurts.  As you thumb the sensitive ridge of her flare, her pussy's contractions become more and more violent.  It's almost like her muscles are clamping down harder to wring the last reserves of spunk from her draining ballsack and prostate."
        );

        this.outx(
            "\n\nThe cum-balloon is so heavy that it's resting between Urta's tits, bigger than either, and the shuddering, post-orgasmic fox abruptly slumps down, weak beneath you.  You lean down to kiss her on the lips, and meet her lidded gaze to say, \"<i>"
        );
        if (this.player.cor < 66) this.outx("You're wonderful");
        else this.outx("You're the most amazing fuck");
        this.outx('</i>"');

        this.outx(
            '\n\nUrta gives you a dazzling smile, and you resume your hard fucking, teasing, "<i>Are you ready for a creampie, my little vixen?</i>"  She smiles wider and nods.  At the same time, she begins to work her muscles again, her exhausted pussy trying its damnedest to milk your dick.  The furry hussy\'s cock slowly sags inside its latex cocoon.  Shrinking faster than the rest, the flare receeds until it is barely any wider than the rest of her length, and some of the cum begins to leak out around her semi-turgid shaft, pooling in her sheath and on the sagging skin between her spent orbs.'
        );

        this.outx(
            "\n\nYou squeeze her breast and hump her faster and faster, until you're plowing her sodden pussy as fast as you were before, causing the poor vixen to shake, her filled jizz-balloon sloshing wildly.  Her hot, silken tunnel squeezes you rhythmically as you fuck her, and in no time, you find yourself cresting the same fantastic hill your pet fox so recently climbed.  You squeeze Urta's breast affectionately as you hilt inside her one last time and release, spastically jerking your [hips] as you pump your warm spooge straight into her puffy, soaked snatch."
        );
        if (this.player.cumQ() >= 500)
            this.outx(
                "  Spermy juices run out of her pussy in alabaster streams thick enough to obscure the black-lips they're travelling over."
            );
        if (this.player.cumQ() >= 1500)
            this.outx(
                "  The fox gives a surprised grin when her belly rounds slightly, though she seems concerned at how it makes her cum-filled prize wobble."
            );
        if (this.player.cumQ() >= 3000)
            this.outx(
                "  Your virile pecker just won't stop, and by the time you finish ejaculating, Urta is pregnant with sperm, her belly round with its belly-button protruding."
            );

        this.outx("\n\nSharing an intimate moment with your ");
        if (this.urtaDrunk()) this.outx("drunken ");
        this.outx(
            'lover, you kiss her again.  She returns it demurely, but midway through, you feel something slick and hard brushing up against you.  Urta whispers, "<i>Sorry,</i>" when you pull away to examine the sudden change.  Her pole is hardening again, surging up to rub the full prophylactic against your [chest].  You glance back at her, and all Urta has to say for herself is, "<i>Sorry, lover... feeling you cum inside me is wonderful, and well, I had time to recover.</i>"  She slowly pulls the rubber off her cock, careful not to jostle it too hard.  A second later, it\'s tied off and set aside.  With you still '
        );
        if (this.player.hasKnot(x)) this.outx("knotted");
        else this.outx("resting");
        this.outx(
            " inside her juicy cunt, she asks if she needs another one, batting her eyelashes playfully."
        );

        this.outx("\n\nShaking your head from side to side, you pull back");
        if (this.player.hasKnot(x))
            this.outx(
                " in an attempt to withdraw.  Her entrance dilates slowly as your full, dog-like knot is pressed against her from inside, the pulsating, reddish flesh glistening with the mixed sexual lubricants.  You tug and tug, rocking your [hips] slowly to loosen her up, and eventually, you manage to pop out, drawing a moan of mixed anguish and pleasure from Urta's maw."
            );
        else this.outx(" and withdraw.");
        if (this.player.cumQ() >= 1500)
            this.outx(
                "   Cum runs out of her packed womb in a wave, spreading all over the sheets down to her knees.  She shakes slightly as the cum runs out of her, rubbing her full middle protectively."
            );
        else
            this.outx(
                "  Cum drools out of her still-gaping slit in steady trickles, puddling on the sheets below.  She groans happily.  Clearly the fox is proud to have such a productive lover."
            );
        this.outx(
            "  You take hold of the puffy, dick-stretched pussy lips and spread them around two fingers, collecting some of the warm sex-juice on your fingertips, then, you pull the dripping, creamy treat out and smear it over Urta's mouth.  She giggles as you apply the lip gloss to her and slowly runs her tongue across the shining coat of sex.  You respond by repeating the motion, this time laying it on thicker."
        );

        this.outx(
            `\n\n"<i>This is all the lipstick you'll need today, babe,</i>" you explain as you admire the way her cum-stained lips shine.  She's marked with your ejaculate and sure to have cock on her breath for hours.  Turning back to the glittering box below, you raise her balls and lean down under them, letting them fall into place on your ${this.hairDescript()} once you're in position.  You blow on the dripping cunny, and Urta moans lustily in response.  Then, you promise, "<i>You're going to be satisfied after this.  Your dick and cunt are gonna cum so hard you won't be getting it up for days.</i>"`
        );

        this.outx(
            "\n\nUrta's thighs scissor around you affectionately.  She starts a snarky response, but you dive right in, silencing her objections by virtue of sloppy strokes with your talented tongue.  Her own feminine taste mixes with your salty flavor on your taste buds as you service her pussy, bringing a hand up to rub across the sides of her puffy entrance, feeling the moist heat that radiates from her sodden snatch.  The scent of sex hangs heavily in the air as you service her, accompanied by panting, female moans from higher up.  After you find her clit and begin to lick it, her own juices begin to run more freely, and you feel her balls getting heavier above."
        );

        this.outx(
            "\n\nShifting position, you tip your head back and lick across the underside of her ballsack, smearing first one and then the other with your cunt-tainted saliva.  You suckle their huge, rounded surfaces, nearly dislocating your jaw as you attempt to handle their heavy bulk.  Reaching up, you wrap your fist around her boner and begin to caress up and down its length.  The slimy jizz that leaked out through her condom makes the handjob wet and slippery, allowing you to pump her hard and fast.  The herm's hips begin to lift with your caresses, and whenever her balls shift away, you tongue her clit rapaciously."
        );

        this.outx(
            '\n\n"<i>Oh gods, I can feel it... you ARE gonna make me cum hard!</i>" Urta pants breathily before pulling your face against her slick gash.  You take the opportunity to slide your tongue all around the insides of her velvet tunnel, smearing the sex-juices deep into every crevice, the hot passage fluttering around your skilled, oral pressure.  Jacking her off, you increase the speed of your strokes and start to slide your thumb back and forth across her urethral bulge.  Urta whimpers softly and pulls you harder against her mound.  Her black cunt-lips smush up around your lips and smear your face with juice, leaving you to inhale the overwhelming aroma of a greatly aroused female.'
        );

        this.outx(
            "\n\nYou take her sack in your free hand and squeeze softly on the whimpering fox's balls.  She squeals, and you feel the heavy weight shift in your hand.  Gushes of sweet moisture spray onto your tongue, and pinned as you are in her wet pussy, you're forced to gulp it down, barely keeping up with the outpouring of juicy girl-gunk.  A familiar pressure fills her cock's bulge, and her flare expands just in time for the onrushing cum to leap out of it."
        );

        this.outx(
            "\n\nThe lusty fox bends double, sweeping the blunt, spurting tip into her lips, swallowing down her load rather than letting it spray everywhere.  You squeeze her bulge again while tracing your other hand down into her sensitive sheath, smearing slippery cum around every crevice of her folded skin.  The result is an even bigger ejaculation, one that floods Urta's cheeks past capacity.  A river of it begins to roll out from her mouth, and it pools into her stretched sheath before rolling down across her balls.  Spasming with bliss, her thighs convulse apart far enough for you to escape the heated tunnel, just in time to get a mouthful of her jizz-drenched sack, tasting her cum while the odor of her pussy is fresh in your mind."
        );

        this.outx(
            "\n\nYou put both hands on her cock as you pump spurt after spurt into the fox's mouth.  Amazingly, she swallows down most of it, but not without leaking a few thick strands of jizz into the mess below.  Every stroke squeezes out a nice, fat wad into Urta's stuffed muzzle, forcing her to taste herself as her eyes roll with wild, orgasmic delight.  Her whole body is shaking, and her nipples look as hard as diamonds from down below.  You milk her long and hard, eventually darting back to polish her onyx snatch with your spit, depositing long, lewd licks all over her spasming womanhood.  She keeps gushing all over the bedsheets for what seems like ages, and you don't let up until every single drop of cum has been squeezed down the vixen's throat or dripped from between her legs.  Somehow, her vagina's drippings are still tinted white with your jizz, and you find yourself smiling when you realize how deeply you must have shot most of your load."
        );

        this.outx(
            '\n\nThe fat flare pops out of Urta\'s mouth abruptly, connected by a string of spunk for a split-second before it snaps back onto her tongue.  "<i>You were right, [name],</i>" she pants out in exhaustion before flopping back.  "<i>I don\'t think I have a drop left...</i>"'
        );

        this.outx(
            '\n\nYou rub her spent balls affectionately as you wipe your mouth, and tell her, "<i>I told you so,</i>" before climbing up next to her and snuggling with her while she comes down from her orgasmic high.  Urta smiles, her lips painted with a mixture of your cum and hers, and you realize she\'s really going to leave it on all day.  You tenderly hug her and fondle one of her breasts as you languish in the afterglow with her, only splitting up when you realize that you both have things to attend to.'
        );
        // Urta no lust ALL day.
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] += 12;
        // Boost dick confidence
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] += 3;
        // Boost love
        this.urtaLove(3);
        // Drain lust, slimefeed, reduce libido
        this.player.orgasm();
        this.player.slimeFeed();
        this.knockUpUrtaChance();
        if (this.player.lib > 50) this.dynStats("lib", -1);
        if (this.player.lib > 90) this.dynStats("lib", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    public slurpFawkesCocksForFunAndInflation(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-home-bj"), false);
        this.outx(
            "\"<i>Thanks, Lover! I need this. I've been so busy, I haven't had any relief in days!</i>\" Urta informs you as she lightly strokes herself to full erectness. It's a short trip, and in a few pumps, she's ready to go. You glance around the bar, making sure all possible prying eyes are occupied. Feeling satisfied with your findings, you slyly shuffle your way under the table."
        );

        this.outx(
            "\n\nYou sigh as you look at Urta's massive prick, half for the impending satisfaction, half for the challenge. You can smell a salty aura emanating from her organ, making your eyes heavy with need. A voice in the back of your mind reminds you of the taste of semen. The invisible texture rolls over your tongue, the saltiness tingles against your taste buds, the heat spreads to the walls of your mouth..."
        );

        this.outx(
            "\n\nUrta throatily moans as you are hauled back to reality. As you open your eyes, you realize that you've taken the first several inches of her shaft and have been gulping down her pre. The rickety clink of a glass being placed on the table overhead reminds you that Urta is expecting some ecstasy too, so you begin bobbing down upon what's already found its way into your mouth. More of her pre-seed bubbles its way down your waiting throat as you slide deeper and deeper on to her, her head bumping the back of your throat with each thrust."
        );

        this.outx(
            "\n\nYou hear an audible gasp from Urta as she tries to disguise it by taking a loud gulp of her drink. Silly herm. You know better than that. You decide to not prolong her agony any further and with a deep breath, you push her down your throat. You can feel her knees on either side of you lock into place for a moment as she catches a gasp between her teeth and lower lip. As you continue to bob, you keep one hand locked around her base, pumping what you can't suck down. With your free hand, you reach past her testicles and give her clit a taunting flick, forcing her to lock up once again."
        );

        this.outx(
            "\n\nA shadow covers you, making your heart leap before realizing that it's a barmaid.  \"<i>Hey Urta, slammin' 'em back awful quick, aren't'cha?</i>\" the barmaid says, poking some fun at the guard, \"<i>Maybe I should bring 'em out in pairs, huh?</i>\""
        );

        this.outx(
            "\n\n\"<i>THANKS g-girl.  Maybe you shOULD!</i>\" Urta reels back, obviously too distracted to have a concise retort.  You mentally chuckle, taking her a bit deeper and moving further down her body, dipping three fingers deep into her soaking pussy.  A small, rippling quake starts at her loins and jostles its way slowly up her form, rebounding off the top of her scalp before trailing its way back through pleasure-charted territory.  When it reaches her tip, now lodged deep in your throat, all the seed that had previously occupied her urethra spills into your stomach.  Suddenly, you feel Urta's hand on the back of your head, forcing you to her base.  From your new vantage point you look up - directly into the waitresses eyes.  She gives you an alluring smile, winking and bringing a finger to her lips as if to say \"<i>Don't worry: I won't tell anyone,</i>\" before humming lightly to herself as she walks away.  You push against Urta's hand just enough to return your visage to your hiding spot in the shadow of the table."
        );

        this.outx(
            "\n\nYou begin to wonder why no one else has noticed you as you begin to move on Urta again.  Looking up at her frozen face makes you wonder if you have her so engrossed in pleasure that she can't do anything but sit there petrified."
        );

        this.outx(
            '\n\nAnother pulse dominates her body. Her mouth slowly moves open, further and further, enough to make anyone who looks her way think she\'s drunk or daft.  The hand on the back of your head forces you down once again and you can feel her urethra dilate.  "<i>Here it comes,</i>" you caution yourself seconds before the first jet pries your jaw open slightly more as her seed travels through her tube.  It erupts into your throat, propelling itself into your stomach, another jet right on its heels.'
        );

        this.outx(
            "\n\nAs the tenth pump pierces your form, you begin to feel very full, but Urta shows no signs of stopping as she continues to squirt her saved-up storage into you.  You keep drinking her down, sucking lightly, wanting more. You feel a strange tickling at your waist.  You look down, as best you can, and realize your abdomen has slightly distended!   The eleventh pump extends it more, the twelfth even more..."
        );

        this.outx(
            "\n\nYou begin to lose count, begging the gods not to let your belly burst as it crosses its fifth new inch of bloated liquid.  Urta slides out of your throat, forcing you to swallow the cloying jism it leaves behind.  Of course, as full as you are, you can't keep up, making some of it begin to run out the corners of your mouth and down your swelling form.  Eventually, she subsides, dribbling her last over your tongue.  Unable to swallow any more, it streams out, pooling between your [legs]."
        );

        this.outx(
            "\n\nYou survey your new condition, finding your stretched belly modeled more towards a nine-month pregnancy"
        );

        if (this.player.pregnancyIncubation < 100 && this.player.pregnancyIncubation > 0)
            this.outx(" than it already was");
        this.outx(
            ".  You slide your way back into your seat with some difficulty, fighting the wriggling, bouncing mass that is your stomach over the now shrinking room between the seat and table.  By now, some of the patrons have realized what has happened, pointing, whispering, rubbing their stomachs, and pulling their hands away from each other to symbolize your new... asset."
        );

        this.outx(
            "\n\nYou lift your equipment up off of your belly, making your breaths come a little fuller, but simultaneously showing off your cum-laden orb.  You glance at Urta, who blushes.  \"<i>Oh, honey!  I'm so sorry!  I just hadn't... I mean I never expected...</i>\""
        );

        this.outx(
            '\n\nYou reassure her that it\'s okay, you were pretty much asking for it, you laugh.  Her face lightens up as she gives you a soft, careful hug.  "<i>Thanks, lover,</i>" she whispers in your ear, "<i>You\'re the best a girl could ask for.</i>"'
        );

        this.outx(
            `\n\nThe waitress approaches as Urta releases you, glancing around the bar at the commotion, "<i>Quite a scene ya caused, ${this.player.mf(
                "cutey",
                "girly"
            )},</i>" she looks at your stomach, "<i>Would you like anything to, uh... wash that down with?</i>"`
        );

        this.outx(
            "\n\nThe concept of taking in more fluids is a bit too much for you, making you cringe and nearly lose your... 'lunch'.  You shake your head and thank her, but refuse the drink."
        );
        this.outx(
            "\n\nYou say goodbye to Urta as you head back towards camp, your stomach sloshing with each step."
        );
        this.dynStats("lus", 10 + this.player.lib / 10);
        this.player.slimeFeed();
        this.flags[kFLAGS.URTA_CUM_NO_CUM_DAYS] = 0;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] += 3;
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 5;
        this.urtaLove(2);
        if (Urta.rand(2) == 0) this.outx(this.player.modThickness(100, 2));
        if (Urta.rand(2) == 0) this.outx(this.player.modTone(0, 2));
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Surprise Threesome Selected
    // PC tells Urta to meet in a back room in 30 minutes, then pays runner to send a note to Raphael.
    // PC leads Raph to the same back room, then comes in kissing him....
    public urtaAndRaphaelSurprise(): void {
        this.clearOutput();
        this.outx(
            "Letting your lips split into a mischievious grin, you lean across the table and whisper into Urta's fluffy ear.  \"<i>Why don't you meet me in one of the back rooms with the lights off in about thirty minutes?  I'll see if I can get a friend, we can make a party of it.</i>\""
        );

        this.outx(
            "\n\n\"<i>That shounds aweshome,</i>\" Urta purrs drunkenly as she stumbles into you, groping you unashamedly.  \"<i>I'm gonna be sho ready for you...</i>\"  She presses her semi-hard shaft against you in an unspoken promise of sensuous pleasure.  You're sure that if she wasn't drunk it would already be throbbing against you, and the way Urta's grinding, it might get that way in a hurry.  The inebriated vixen kisses you with alcohol-stained lips before turning away and sashaying towards one of the private rooms in the back.  She lifts her tail and wiggles her butt in your direction as she drunkenly wobbles her way towards a door."
        );
        this.outx(
            "\n\nNow... for the other half of this plan.  You just need a certain rouge rogue to make his way over here so that you can drag him into an 'accidental' tryst with the captain of the guard.  Just thinking about it makes your [vagina] moisten"
        );
        if (this.player.hasCock()) this.outx(" and [eachCock] experience a twinge of excitement");
        this.outx(
            ".  Grabbing a napkin and a pen from an accommodating waitress, you jot out a hasty missive:"
        );

        this.outx("\n\n<i>Dearest Rogue,");
        this.outx(
            "\nI find myself locked in the fondest of remembrances for the things you've taught me, both in the realm of fencing and love, and a certain light-headedness has set in.  I've been all alone, with nothing but my meal and this fine vintage of wine to keep me company.  Even Urta, who's usually here this time of day, isn't here to regale me with her lesser tales - something about important business to tend to, I hear.  Would you come call on me at the Wet Bitch?  I have need of your skills, if you catch my meaning."
        );
        this.outx("\n\n\t\tAwaiting the thief who stole my heart,");
        this.outx("\n\t\t\t-[name]</i>");
        this.outx("\n\nThat should do it.  The ");
        if (this.player.cor > 66) this.outx("pompous, ");
        this.outx(
            "ginger fox can't resist an offer like that.  Stepping past a group of drunken canines, you make your way out into the city in search of a runner.  You're in luck!  One of the orphans that works for him is panhandling nearby.  You step closer, nearly doing a double take when you see the size of his take.  The little guy has made more money begging than most honest craftsman can make in a hard day's work.  Sighing, you pass him the note with instructions that he deliver it directly to Raphael.  At first, he feigns ignorance, but after he recognizes you, he nods solemnly.  Apparently being the consort of a master of thieves has its PerkLib."
        );

        this.outx(
            "\n\nTurning back, you saunter confidently into the bar and get yourself that bottle of wine.  Deception is thirsty work after all.  The next fifteen minutes pass in a blur of grape-stained enjoyment and simple people watching.  There's a scout who's just returned from the outside a table over, cuddling with his crush.  They're all over each other, sharing the happiness of two long-separated lovers.  On the other side of you, two centaurs are trying to play poker, but one of them is apparently cheating, at least according to the younger stallion.  You take another swallow of the subtle brew and recline, just taking it all in before the real work starts."
        );

        this.menu();
        this.addButton(0, "Next", this.raphaelAndUrtaPartTwo);
    }

    private raphaelAndUrtaPartTwo(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-raphael-3some", "vert"), false);
        this.outx(
            'Narrow, familiar paws suddenly encircle your waist, and a puff of hot breath exhales past your ear.  "<i>Greetings, my supple swan.</i>"'
        );

        this.outx(
            "\n\nSmiling, you turn your head so that you can see the familiar fox's lips, \"<i>Raphael, you rapscallion!  Couldn't you have just pulled up a seat?</i>\""
        );

        this.outx(
            '\n\n"<i>Ah, but that would not fit my style, my dove,</i>" he confidently rebuts.  The hands squeeze your [hips] affectionately as he slides around your side, hefting the bottle you\'ve mostly emptied.  "<i>Mon deiu! I\'ve come just in time, it seems!</i>"  He lifts the bottle and swallows the last few bits on his lonesome.  Wiping the excess from his fur, he says, "<i>I must protect my lady\'s virtue.  It wouldn\'t do to have her drunk, horny, and alone in a strange place full of uncouth barbarians.</i>"  His eyes flick back and forth, and he whispers, "<i>Like these.  Surely there is somewhere more private we could go?</i>"'
        );

        this.outx(
            "\n\nYou coyly ask him if he's propositioning a respectable lady like you, and a little of bit of a slur comes to your lips.  Urta's still vastly more hammered than you, but there is a bit of an airy buzz vibrating through your consciousness when you try to focus.  You rise, stretching languidly and pressing your [butt] against Raphael's groin to further excite him.  The small bulge of his narrow erection digs into your [armor] as you grind against him, as lithe and confident as the rest of the surly thief."
        );

        this.outx(
            "\n\nTaking his soft, furred hand in your own, you lead him towards the back room you saw your other foxy "
        );
        if (!this.urtaLove()) this.outx("friend");
        else this.outx("lover");
        this.outx(
            " use.  He stays doggedly on your heels, so close that you can feel his rigidity as it bumps and grinds against your [butt], and you make a point of arching your back so that he's forced to contact it again and again.  You smile as his face loses some of its stoic focus to the alluring motions your rear is making.  Raphael's steps are getting a little uneven by the time you get to the backroom door, and as you spin around and pull him into an embrace, you inform him, \"<i>I got us a friend to play with...</i>\""
        );

        this.outx(
            "\n\n\"<i>Wha-?</i>\" Raphael tries to ask before you silence him with a kiss, crushing his mouth into your own and placing his upraised hand on your [hips].  You flip the latch and drag him into the darkened room with you, barely remembering to kick the door closed before two sets of foreign hands start to strip you.  Raphael's own garments are no match for your frisky fingertips, and you disrobe the surprised thief with ease thanks to the hypnotic kiss you've got him trapped in.  If you're going to be honest with yourself, the slow, sloppy kiss is having a similar effect, and once the bottom of your [armor] is off, the scent of your womanly desire clings damply in the air."
        );
        this.outx(
            `\n\nStronger, more muscular arms wrap around you and Raphael, firmly compressing your bodies together.  His dagger-like erection narrowly misses your [vagina], instead wetly grinding across your lips and [clit], pressing on your belly where it can leak a trickle of liquid need onto your ${this.player.skinFurScales()}.  A slightly slurred voice demurely coos, "<i>Your friend has a nice butt!</i>" as a slimy, slippery horsecock is pressed against your back`
        );
        if (this.player.tallness >= 60)
            this.outx(
                ", grinding through your [butt]'s ass-cleavage without an ounce of hesitation"
            );
        this.outx(".");

        this.outx(
            `\n\nRaphael grunts as he's manhandled, but for once, he's rendered speechless.  Instead of trying to fight it, he tries to adapt to the situation.  His slender fingers traipse through your ${this.hairDescript()} and interlock on the other side of your head, one digit caressing the curve of your ear as he draws you back into a passionate kiss.  His tongue forcefully spears past your own with a dancer's grace and a swordsman's strength, and soon, you're on the defensive in an oral battle for the ages.  Raphael releases his left hand so that it can trawl down your shoulder towards your breast, and he begins to massage it in order to distract you, something that works all too well.`
        );

        this.outx(
            "\n\nYou whimper into Raphael's lips while your lust and alcohol inebriated brain struggles to come up with a counterattack.  It comes to you when you feel a trickle of foxy moisture flow into your belly-button, and your return strike is as swift as your cunt is wet.  Rocking your [hips], you undulate against the crimson thief's pecker, smearing it with your juices.  Then, you lift yourself up with your [legs] and abruptly drop onto the foxy phallus, impaling yourself on its bulbous length.  Raphael's skillful kiss collapses under the weight of the sensations you've forced him to experience.  The poor guy wasn't expecting you to take him then and there, and you take the opportunity to violently kiss him, enjoying his pliant mouth while he slowly gathers his wits and begins to kiss you back, this time not so competitively."
        );
        // CUNT STRETCH RAPHAEL GOOOAOOAOAOAOAOAOAOAOAO
        this.player.cuntChange(12, true, true, false);

        this.outx(
            "\n\nUrta, perhaps feeling a bit ignored, suddenly forces a finger into Raphael's tight pucker as she crouches, using her free hand to line her blunt horse-cock up with your [asshole].  You "
        );
        if (this.player.tailType > TAIL_TYPE_NONE) this.outx("lift your tails and ");
        this.outx(
            "try to relax with her thick slab of penis so close to your backdoor, hoping she'll be gentle.  A drunken twinge of arousal knifes through your [vagina] as you imagine her forcefully raping your hind-end, and Raphael can certainly feel the convulsive fluttering of your love tunnel as you sink into your imaginings.  The gray vixen nips at your ear as she presses against your [asshole]"
        );
        if (this.player.analCapacity() < 30)
            this.outx(
                ", slowly stretching your tight sphincter with constant pressure.  You're not really loose enough back there for this to be entirely comfortable, but the incredible fullness her length provides has a way of muting the pain of stretching."
            );
        else if (this.player.analCapacity() < 60)
            this.outx(
                ", slowly sliding into your sphincter.  You groan into your other lover's mouth as your anus is claimed by the thick horse-pole, and you do your best to relax around the butthole-stretching shaft."
            );
        else
            this.outx(
                ", easily slipping inside your well-practiced anus.  You groan into your other lover's mouth as the thick cock claims your ready asshole, and you're glad your butthole was so well prepared to handle having a hot meat pole injected into it."
            );
        this.player.buttChange(60, true, true, false);
        this.outx(
            '\n\nRaphael breaks this kiss, his hips thrusting needfully against your mons with jerky, uncoordinated strokes, pumping to the timing Urta\'s wiggling finger forces his prostate to obey.  "<i>S-señorita... w-who is your friend?  Oooh, mon dieu!</i>" he cries.'
        );
        this.outx(
            "\n\nYou give him a reassuring peck on the lips as a few more inches of mammoth dick nestle into your [butt], filling you full enough that you can feel your lovers' members sliding across each other through your dick-filled insides, Raphael's small, vulpine dong is smothered with the expansive, pre drooling horse-cock, and the smaller male seems almost afraid of the size of your companion.  You squeeze your inner muscles to caress the smaller fox-dick and answer, \"<i>Just a friend with a fun little package.  I hope you don't mind...</i>\""
        );

        this.outx(
            "\n\nUrta's finger pushes a little harder on the rogue's tender rosebud, making him lurch against you harder.  His poor knot is already starting to swell inside you, and he's clearly trying his best to hold on.  This situation you've forced him into just isn't something he was ready for, for once, and it shows.  A thick ring of prepuce slides into your distended asshole fast enough to make your own confident expression twist into a dopey, whining grin, one that only widens as you take Urta all the way to her big, swollen balls, her sheath folded up around your [asshole]."
        );

        this.outx(
            "\n\nThe situation spirals completely out of control at that point.  Raphael is lewdly moaning as he pistons in and out of you, his swelling knot popping and stretching your labia as it drags through them again and again, each time a little larger, a little harder, and a little more forcefully.  At the same time, Urta begins to crudely pound your [asshole].  She ravages your backside with long, hard pumps of her hips, drunkenly mating your ass.  The thick, fat flare inside you scrapes along your walls as it slides through you, pressing down on every sensitive bundle of nerves as it goes, and by virtue of its own size, it forces Raphael's smaller erection to press up inside your [vagina], rubbing a sensitive, hot little spot inside you that has your [legs] shaking as your strength slowly ebbs out of your ecstasy-wracked frame."
        );

        this.outx(
            "\n\nYou throw your head back to rest on Urta's shoulder as a shuddering explosion of bliss goes off in your womb, shivering through your tight channel to contract about the knotty fox-cock inside you.  Your undulating walls have the male meeting your orgasm with one of his own, and the bulb at the base rapidly inflates, immobilizing itself inside your clenching, cock-milking canal.  Warm semen flows out of him in long, thick spurts, exactly like you desire.  Hands, Urta's or his, you don't know or care which, pinch your nipples as climax wracks you.  The swollen flare expands as Urta bottoms out in your [butt], and you feel her jizz pumping up through your well-stretched guts, filling you with so much liquid heat that you wonder if you're going to melt.  You let go and close your eyes, cradling your slowly-inflating belly as you're creamed from both sides, filled with thick spunk until your middle feels ready to pop, the whole time moaning and crying, panting out demands for more."
        );

        this.outx(
            "\n\nThe two clueless sperm-pumps exhaust themselves in either side of you, spending their passion in thick gobs that you're all too happy to take.  Only after each dick is utterly drained and your pussy and asshole wear masks of dripping white goo, do you let them slide free of your imprisoning holes.  You pant for breath as you lean against a box, rubbing one hand over your middle."
        );

        this.outx(
            '\n\n"<i>Mademoiselle, I must confess, I did not enjoy that nearly so much as when we are alone, under the moonlight,</i>" Raphael mutters disconsolately, as he stumbles in the dark, trying to get dressed.'
        );

        this.outx(
            '\n\nUrta slurs, "<i>Well, it was fun.  Who cares if [name] wants to be double-stuffed with fox?</i>"  She squeezes your [butt] as she\'s trying to get dressed, her limp cock dangling between her legs in the poorly lit room.  "<i>Or is that horse?</i>"'
        );

        this.outx(
            "\n\nYou get dressed too, though your [armor] is sorely stressed by the size of your middle at this point, and the way it jiggles and wobbles makes you wonder how long you'll have to handle it before it passes.  Urta lights a lantern, before turning around, and the horrified expression on her face is mirrored by the one on Raphael's."
        );

        this.outx('\n\n"<i>Him!?</i>"\n"<i>Her?!</i>"');
        this.outx(
            "\n\nThe door opens and closes with a slam as Raphael goes into full flight, and Urta stumbles after him before tripping into your arms.  You hold the snarling girl in your arms while she drunkenly tries to go after him, eventually rounding on you."
        );
        this.outx('\n\n"<i>You made me have a threesome with... with him!</i>" Urta growls.');
        this.outx(
            '\n\nYou kiss her on the nose and press your cum-stuffed middle against her, pointing out that not only did she completely emasculate him in size alone, but she also got to make him dance on her fingertip like a puppet, all while cumming longer and harder than he could ever hope to.  The foxy fox curls her ebony lips in a rueful smile at that, running her hands over your middle in admiration of her work.  "<i>I guess I did, huh?  Hopefully taught him a lesson!</i>"'
        );
        this.outx("\n\n(<b>Raphael probably won't fall for that again, but hey, it was fun!</b>)");
        // Slimefeed
        this.player.slimeFeed();
        // -3 sensitivity, reset lust.
        this.player.orgasm();
        this.dynStats("sen", -3);
        this.flags[kFLAGS.URTA_X_RAPHAEL_HAPPENED]++;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // So I Heard You Don't Allow Vore in Your Game!
    // Available from Urta at home menu "Goo Fuck"
    // PC must have goo legs, goo skin, goo hair, etc.
    // If Edryn is pregnant, Olivia the guardswoman takes her place
    private urtaGooTesticleVoreRuinedOrgasms(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-goo-fuck"), false);
        this.outx(
            "You tell your vixen lover that you've got something a bit... special in mind this time.  You surge up onto the bed and gently flip Urta onto her back.  Her horsecock bobs enticingly in front of you, already as hard as "
        );
        if (!this.silly()) this.outx("a steel rod");
        else this.outx("Marethian algebra");
        this.outx(".");

        this.outx('\n\n"<i>What do you have in mind?</i>" she asks curiously.');

        this.outx(
            "\n\nYou tell her she'll find out in due time, but for now she should relax and let you work.  You wrap your gooey hands around her beastly cock, rubbing up and down the length of it.  You run your fingers all over its little bumps and ridges, while tracing the mottled patches of pink.  Your hermaphrodite lover shivers and squirms under you, her eyes meeting yours with a demanding look."
        );

        this.outx(
            '\n\nNot one to disappoint, you grip her sizeable horsecock firmly and furrow your brow.  You let your mind drift down, concentrating on the sensations coming from your hands.  Your fingers and thumbs begin to reshape, merging into one another, until they are nothing more than an amorphous blob wrapped around Urta\'s cock.  She looks a little surprised at this, but says nothing, so you continue.  You focus your energy, creating dozens, then hundreds of little cilia on the inside of your "hands".  The sudden surge of sensations you get from them makes you wobble uncertainly for a moment, and it feels as if the inside of your hands has become the inside of a very sensitive vagina. The cilia wiggle and caress the impressive chunk of horsemeat in front of you, up and down you stroke, getting little gasps of pleasure from both your vixen lover and yourself.'
        );

        this.outx(
            `\n\nYour herm lover's hips buck softly against your gooey onahole, making you tremble just a little bit more with the sensation of being fucked.  This isn't the surprise, of course.  That is about to come.  You move your hands up further on Urta's turgid mass, until your goo flows over her flare, fully encompassing the tip of her cock.  You set to work, licking, stroking and pleasuring her with the tiny cilia.  The sensation of flavor suddenly spreads through you as you realize you can <i>taste</i> her cock, through your hands.  Just another benefit of being a goo-${this.player.mf(
                "boy",
                "girl"
            )}, you figure.  You eagerly consume the pre-cum drooling from her, giggling when you see the clearish liquid floating around inside your hands.`
        );

        this.outx(
            "\n\nUrta's groans grow louder now, more insistent, as though she's already getting ready to blow her load.  Well that just won't do.  If she can't hold it this long, she's going to need a little... assistance.  You concentrate again, urging the cilia around the horsecock's tip to converge on its center, on the winking hole leaking pre-cum.  They surge forth, plugging Urta's urethra so quickly she actually jumps, startled by this sudden action."
        );

        this.outx(
            '\n\n"<i>What, what are you doing, [name]?</i>" Urta asks, her eyes widening as your goo inside her transforms into a plug.  "<i>Ahh,</i>" she gasps, "<i>don\'t stop!</i>"'
        );

        this.outx(
            "\n\nYou chuckle to yourself.  If she likes that, you wonder, how far can you go?  You enlarge and deepen the plug, while having your goo-hands pulse around Urta's cock, as though she were fucking an ona-hole.  The fox writhes under you, biting her lip and whispering inscrutable words.  You allow more of your goo entry, pouring in several inches of it, delighting in the tight feeling you get.  You squeeze her shaft and rub, amazed that you can feel the pressure even from the inside.  You detach your hands from one another, letting one remain as a cilia-laden tube stroking up and down the length of Urta's horsey-member.  The other returns to normal, with your index finger lodged right in Urta's pee-hole."
        );

        this.outx(
            "\n\nAnother finger slips inside, widening the hole even further.  You slowly finger the herm this way, pulling back slowly before pushing in with your gooey digits.  Each movement elicits a whimper of pleasure from her.  As you add a third finger, Urta bites down on a knuckle, her eyes rolling back in her head.  Her equine shaft throbs and wobbles, balls tightening.  You know what's coming.  Or more accurately, WHO's coming.  You reshape your fingers into a plug just in time as Urta cries out, thrusting her hips forward.  You feel a splash of warm liquid against your fingers, and it still amazes you that you can <b>taste</b> her cum from where it is."
        );

        this.outx(
            "\n\nUrta's orgasmic cry is cut short and a look of frustration appears on her face.  As turned on as she is right now, she's not going to get any satisfaction with you lodged inside of her.  The hot cum bubbles and presses against your fingers, so you widen the plug, which only serves to turn Urta on even more.  Eventually the ruined orgasm begins to recede, and with it comes a wave of suction.  You relax your goo fingers, allowing them to be sucked further down into the sixteen inch column of cock.  A fourth finger disappears with this sudden pull, followed by your thumb."
        );

        this.outx(
            "\n\nThere's a look of trepidation that crosses your face, travels the intervening distance and plasters itself all over Urta's.  Your entire hand is inside her cock.  You wiggle your fingers around, which wipes away the look your vixen is giving you, replacing it with some cross between pleasure and torment.  Again, she mutters under her breath, \"<i>D-don't... stop...</i>\"  You don't plan on it."
        );

        this.outx(
            "\n\nYou pump your hand in and out, visibly distorting Urta's shaft.  It bulges obscenely, though it seems to be relatively painless.  With every push you go just a little bit deeper, just a little bit further.  You've almost reached the base of her dick when you get up to your elbow.  You have to reposition yourself, urging Urta to sit up and rest against the headboard of her bed.  This grants you a better angle; you can push forward, past your elbow."
        );

        this.outx(
            "\n\nThe mismatched woman squirms beneath your ministrations once more, cum splashing against your fist.  It feels bubblingly hot, this close to the source.  The surge presses against you, and it takes some effort to hold it back, but Urta eventually grunts with the frustration of another ruined orgasm.  The surge of warm baby-batter subsides, and once more it comes with a sudden vacuum, pulling you further in.  Before you can even brace yourself, you're sucked down to your shoulder."
        );

        this.outx(
            "\n\nThis sudden motion causes Urta to cry out in orgasmic ecstasy a third time.  Yet another ruined orgasm laps at your fingers before sucking you deeper.  Your fluidic body gives little resistance, and instead of simply stopping at your shoulder like the laws of physics would dictate, your body begins to reshape, getting pulled deeper into the cock.  You feel a little like a piece of jelly getting sucked through a straw, which suddenly seems incredibly accurate.  Your vision goes dark as a fourth ruined orgasm takes your head.  You're pulled deeper and deeper, your body getting hotter and wetter as you go."
        );

        this.outx(
            "\n\nA fifth.  A sixth.  Urta shudders and rolls as her body is wracked with rapid-fire orgasms, and each time she is denied the blissful release.  With a seventh ruined orgasm, the last licks of air disappear from your legs as your entire gooey body is enveloped."
        );

        this.outx(
            "\n\nIn the darkness, you can't tell what is what, so you simply relax, allowing your body to flow whatever way Urta wills it.  You feel your body settle down in two tight, spherical pouches, your waist bridging the space.  You're in Urta's testicles!  You can only imagine how she looks right now.  Her balls must be gigantic, and likely uncomfortably full.  Semen splashes around you, soaking into your gooey skin, letting you taste its salty-sweet flavor."
        );

        this.outx(
            "\n\nYou feel Urta's body shift around a few times, her legs bumping into your new \"home\" as she struggles to get comfortable.  Then, surprisingly, you can hear muffled snoring.  After being subjected to ruined orgasm after ruined orgasm, Urta just fell asleep!  Figuring there's not much you can do about it from in here, you relax your body as well.  As you calm down, you feel your body beginning to lose its shape.  If you think about it, you can regain your form, so rather than worry about it, you let yourself soften, mixing with Urta's spunk as you too drift off into a peaceful sleep."
        );

        this.dynStats("lus=", 100, "resisted", false);
        // Next
        this.menu();
        this.addButton(0, "Next", this.urtasRuinedOrgasmsFromGooPartII);
    }

    private urtasRuinedOrgasmsFromGooPartII(): void {
        this.clearOutput();
        // This is just getting weird as fuck now. There will be no images for this... how could there be?
        this.outx(
            "You awaken the next morning to a panicked shout.  You bolt upright...  Or at least you try to.  Something is holding you tight, binding you in place.  You try to open your eyes, but nothing but blackness surrounds you.  Struggling, you try and wrench yourself free of your bindings."
        );

        this.outx(
            "\n\n\"<i>What the hell...  [name]?!</i>\" comes the voice of Urta.  It's strange, as if it were somehow distant and at the same time right next to you.  You feel a soft patting sensation on your bindings, and then it hits you.  You're still inside Urta's balls!"
        );

        this.outx(
            '\n\n"<i>Well, this is certainly different,</i>" Urta says, patting her engorged ball sack again.  The contact makes you shiver with a sudden burst of pleasure, as if your entire body had become an erogenous zone.  "<i>Oooh. Ooooh, damn this feels good.</i>"  She places a hand on her massively inflated balls, which you feel right above your crotch.  Urta traces little circles over the area with her fingers, bringing powerful sensations to your hyper-sensitive liquid body.'
        );

        this.outx(
            "\n\nYour body feels warm and tingly, encased as it is in Urta's tender sack.  A deep <i>bump-bump... bump-bump</i> resonates within your body, confusing you for a moment until you realize it's Urta's heartbeat picking up.  The rhythmic beating relaxes you deeper, causing your body to sink further, filling every nook and cranny.  You're so relaxed by this, you barely notice the soft schlicking noise coming from somewhere above you."
        );

        this.outx(
            "\n\n<i>Schlick...  Schlick...</i> it goes.  With each wet noise you feel a bit more pressure surrounding you.  With each <i>schlick</i>, Urta's balls wrap more tightly around you.  But the heartbeat is so relaxing, so hypnotic that you can't seem to care.  The tighter it gets, the more your body aches for it, the more it <i>needs</i> it.  The pressure builds and builds around you, your temporary home growing tighter and tighter.  You realize, with some alarm, that it's not merely Urta's balls tightening, but also a bevy of fluids pouring in from somewhere that's constricting you."
        );

        this.outx(
            "\n\nYou feel your body absorbing this new liquid, tasting it, and recognizing it as your fox lover's cum.  The spooge continues to rush in, filling you up with her salty-sweet goodness.  The walls around you quaver, clutching you so tightly your sensitive body seems to alight with pleasure.  You hear a cry above you, stifled, you imagine, with a lip.  After a minute, the tightness seems to fade, and with it comes a sigh, half relief and half frustration.  A hand descends on your fleshy prison, rubbing through to your body, making your gooey body burn with passion again."
        );

        this.outx(
            "\n\n\"<i>I can't quite get off with you in there, [name].  But I'll be damned if you're going to stay in there all day,</i>\" comes the voice of your foxy friend.  You wonder what she's planning, but then the shlicking noise returns.  It seems she intends to masturbate until you finally \"come\" out."
        );

        this.outx("\n\n<b>Several hours later...</b>");

        this.outx(
            "\n\nUrta's sack tightens around you once more.  Orgasmic bolts of electricity fire throughout your amorphous form.  Your body swirls and quivers, trying to take on a form fit for release, but no matter how you twist, there simply isn't enough space for you to take on your normal form.  You simply can't get your release.  Again you feel a sucking sensation, attempting to pull you up and out of your fleshy prison, but as with the last dozen or so times, it simply doesn't have enough power to do so."
        );

        this.outx(
            '\n\nUrta gives a frustrated growl somewhere above you.  "<i>Marae damn it!</i>" she exclaims, putting her hands on either side of you.  "<i>Get out of there!</i>"  You try to give her a reassuring grunt, that you\'re trying to do your best, but without a face, let alone a mouth, it\'s impossible.  The horsecock-endowed girl sighs, and then the schlicking noise returns.'
        );

        this.outx(
            "\n\nYour mind reels, how many times have you gone through this?  Twelve?  Fifteen?  Hours upon hours lost within these two balls.  Anything either of you try to do simply doesn't work.  Urta's tried masturbating with either hand, then both.  She's tried it in the shower, and though the warm water felt good running over your cage, it was no more useful.  She's tried every possible position, every possible method..."
        );

        this.outx("\n\nThere's a knock at the door and you hear a ");
        const edrynAvailable = !kGAMECLASS.telAdre.edryn.pregnancy.isPregnant;
        if (edrynAvailable) this.outx("set of hoofsteps");
        else this.outx("pair of footsteps");
        this.outx(
            " enter whatever room you're in. \"<i>Hey, Urta, you haven't shown up for your shift today so...  Great googily moogily!  What happened to you?!</i>\" a voice you "
        );
        if (edrynAvailable) this.outx("recognize as Edryn's");
        else {
            if (this.flags[kFLAGS.MET_OLIVIA] == 0) this.outx("recognize as Olivia's");
            else this.outx("don't recognize");
        }
        this.outx(" shouts.");

        this.outx(
            "\n\nWait a second...  That's something you haven't tried yet.  You've tried every masturbation technique known to man, but not actual sex!  While Urta's explaining her predicament to her fellow guardsman, you start churning, sloshing this way and that trying to get her as excited as possible.  She gives you a soft slap mid-sentence, then gasps and says, \"<i>Ohhh, I get what you're trying to tell me now.  "
        );
        if (edrynAvailable) this.outx("Edryn");
        else this.outx("Olivia");
        this.outx(", I'm going to need your help with this particular problem.</i>\"");

        this.outx("\n\nThere's a moment of silence, and then, \"<i>");
        if (edrynAvailable) this.outx("All right, but I'm still charging you for this one");
        else this.outx("Uhm, yes Captain, whatever you need");
        this.outx(
            ".</i>\"  You hear armor falling to the ground while Urta rises from wherever she was sitting; you've been all over the house so many times it's hard to keep track of where you are."
        );

        this.outx("\n\nUrta wastes no time sinking her huge horsecock right into ");
        if (edrynAvailable) this.outx("Edryn");
        else this.outx("Olivia");
        this.outx(
            "'s cunt, if that wet squelching noise is any indication.  She thrusts all the way in inside in one go, making "
        );
        if (edrynAvailable) this.outx("Edryn moan in pleasure");
        else this.outx("Olivia shout with surprise");
        this.outx(
            ".  Clearly, Urta's not messing around anymore.  She pulls out and thrusts back in, and with that thrust you sway, slapping into "
        );
        if (edrynAvailable) this.outx("Edryn");
        else this.outx("Olivia");
        this.outx(
            "'s underside.  The contact is electric.  The rough slap would have sent shivers down your spine, if you'd had one.  It makes your body quake and convulse with gusto."
        );

        this.outx(
            "\n\nAnother thrust, and there's the slap.  It lights your body with orgasmic fire, like you've never felt before!  It's so much more powerful than, say, your "
        );
        if (this.player.hasCock()) this.outx("cock");
        if (this.player.gender == 3) this.outx(" or ");
        if (this.player.hasVagina()) this.outx("pussy");
        if (this.player.gender == 0) this.outx("asshole");
        this.outx(
            ".  Your entire, gooey body feels like one giant clitoris, so sensitive, so vulnerable to pleasure.  With every slap, your body begins to crave release even more.  The pleasure builds with every thrust and accompanying slap.  It grows to the brink of orgasm, and surges forward, with no end in sight."
        );

        this.outx(
            "\n\nIt's almost uncomfortable, your whole body wants to cum, <i>needs</i> to cum, but you can't.  Not stuck like this, you can't.  You feel as if you've been denied orgasm for weeks, or months.  You're just so worked up, you can't even think straight at this point.  You can't imagine Urta is much better right now either.  She's pumping in and out erratically, trying get that relief that you so desperately desire as well."
        );

        this.outx(
            "\n\nUrta's walls constrict you again, only adding to the blissful feelings infusing your body.  They grow tighter and tighter, pulsing around you, tightening in anticipation.  Your foxy friend gives a grunt somewhere in-between desperation and frustration, and with it you feel the familiar suction.  It pulls at you, and you push towards it, wanting the relief just as much as Urta does.  With one final thrust, the suction picks up and you have no choice but to go along with it this time."
        );

        this.outx(
            "\n\nYou're pulled, whether you want to or not, back up through Urta's cock, no doubt making it bulge obscenely along the way.  It pulses and spasms while your mind reels from the sensations.  You can't tell how long it takes, Urta's cock remains stationary, jerking wildly, cumming you out.  Your perceptions shift ever-so-slightly as what is likely your head seems to be the last to go.  It's uncomfortable and strange, but at least you'll be free of those balls."
        );

        this.outx(
            "\n\nThe last of your ooze-body spurts out with a moist popping sound, and with it comes relief.  Not orgasmic relief, unfortunately, as your body still seems to be in the throes of ecstasy, but relief of being free once again... Except, oh crap.  You forgot that Urta was balls-deep inside "
        );
        if (edrynAvailable) this.outx("Edryn");
        else this.outx("Olivia");
        this.outx(
            ".  Your eyes search around, seeing nothing but darkness once more.  You extend your gooey self, trying to tell where you are.  Wherever it is, it's tight... and there seems to be some sort of plug holding you in."
        );

        this.outx("\n\n<b>You're inside ");
        if (edrynAvailable) this.outx("Edryn");
        else this.outx("Olivia");
        this.outx("'s womb!</b>");

        this.outx(
            '\n\nYou hear a muffled sigh of relief from Urta, followed by the sound of a couch creaking. "<i>Oh thank Marae</i>" she says thankfully.  "<i>Oh damn. Are you going to be able to get out of there?</i>"  You feel a pair of hands surrounding you, though this time the surge of pleasure you get is much smaller.  Perhaps the thicker walls are to blame.'
        );

        if (edrynAvailable) this.outx("Edryn");
        else this.outx("Olivia");
        this.outx(
            ' voices her displeasure, "<i>What the... I look like I\'m pregnant!  With septuplets!</i>"'
        );

        this.outx(
            '\n\nUrta lets out a nervous chuckle.  "<i>Sorry about that.  But this should be easier to deal with.  '
        );
        if (edrynAvailable) this.outx("All you need to do is push, right?");
        else this.outx("Let's just sit you back, and then all you need to do is push.");
        this.outx('</i>"  Your new host grunts in discomfort');
        if (edrynAvailable)
            this.outx(
                ", but obliges, sitting back on something, perhaps a bed.  You feel yourself sloshing around oddly as she lies on her back"
            );
        this.outx('.  "<i>Now push,</i>" Urta says, encouragingly.');

        this.outx(
            "\n\nYou feel a sudden tightness around you, tighter than even Urta's balls got.  It clenches you, reigniting the pleasurable spark within your body.  The tightness wavers, and with it you hear panting from above, and then it returns just as quickly as it went. Breathe, breathe, push, it goes.  You push yourself towards the exit as well, trying to hurry this along as much as you can.  It takes several minutes, but soon her cervix dialates and you're able to squeeze yourself out, towards a soft pinkish light."
        );

        this.outx("\n\nYou ooze out with every push from ");
        if (edrynAvailable) this.outx("Edryn");
        else this.outx("Olivia");
        this.outx(
            ".  The first thing out, thankfully is your head.  Bright light greets your eyes, almost stinging them.  You look around, seeing "
        );
        if (edrynAvailable) this.outx("Edryn clutching Urta's hand");
        else this.outx("Olivia lying back on the bed, clutching Urta's hand");
        this.outx(
            ", panting heavily.  You surge outwards, first your shoulders, followed by one arm, and then the next.  The rest of your body comes out like a flood with one last push from your former host, sending you splattering onto the ground beneath you.  An exasperated, but relieved, sigh comes from "
        );
        if (edrynAvailable) this.outx("Edryn");
        else this.outx("Olivia");
        this.outx(", one that you share.");

        this.outx(
            "\n\nYou take a minute to collect yourself, letting your ooze-like body reform.  Slowly it comes back, naturally returning to its original state.  You twist your neck, spine and joints, relief washing over you."
        );

        this.outx('\n\n"<i>Look, ');
        if (edrynAvailable) this.outx("Edryn");
        else this.outx("Olivia");
        this.outx(", it's a ");
        if (this.player.gender == 0) this.outx("...THING");
        else this.outx(this.player.mf("boy", "girl"));
        this.outx(
            '!</i>" Urta says with a laugh, clapping her companion on the shoulder.  You chuckle with her, though '
        );
        if (edrynAvailable) this.outx("Edryn");
        else this.outx("Olivia");
        this.outx(" doesn't seem to find it as funny.");

        // First time seeing Olivia?)
        if (this.flags[kFLAGS.MET_OLIVIA] == 0 && !edrynAvailable) {
            this.outx(
                "You turn your attentions to your new \"mother,\" sitting panting on the bed.  You've never seen her before, but the armor that sits nearby is similar to Urta's.  You figure she must be Urta's temporary partner while Edryn is on maternity leave.  Olivia's a canine morph, though only slightly.  Her legs end in wolf-like paws, a long fluffy tail sticks out from under her, and a pair of ears perch on top of her head.  As you look at her, she blushes bright scarlet and moves to retrieve her gear, obviously embarrassed to be seen in such a compromising position."
            );
            this.flags[kFLAGS.MET_OLIVIA]++;
        }
        // (Goo skin not white?)
        if (this.player.skinTone != "milky white") {
            this.outx(
                "\n\nThen you catch sight of your body...  You hold up a hand in surprise.  Your skin has changed color!  Your time inside Urta's balls has taken its toll, it seems.  <b>You now have milky white skin!</b>"
            );
            this.player.skinTone = "milky white";
            this.player.cumMultiplier += 10;
        }
        this.outx("\n\nUrta and ");
        if (edrynAvailable) this.outx("Edryn");
        else this.outx("a newly dressed Olivia");
        this.outx(
            " collapse onto the couch, exhausted.  \"<i>Gimme ten minutes, then we'll go on patrol,</i>\"  Urta says waving a hand tiredly.  You grin and take your leave, slipping out the front door and heading back to camp.  The sun blazes high in the sky, around noon, so you've lost about a day stuck inside one person or another."
        );
        this.player.orgasm();
        this.dynStats("sen", 2);
        this.model.time.days++;
        this.model.time.hours = 11;

        this.statScreenRefresh();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Urta's Place
    // Added just before the line "For someone as ashamed of her desires as Urta was, she sure is terrible at hiding her kinks."
    // Urta must be at Lover status and completely comfortable with her cock. PC can't be a naga, centaur or drider.  This is the two-legs only club! PC must also have some kind of genitals.

    // if(flags[kFLAGS.URTA_PETPLAY_DONE] == 0 && urtaLove()) outx("  <b>A new, shiny leather collar lies half-concealed under a cushion, as though its owner haphazardly tried to bury it in a rush.</b>");

    // Adds "Collar" to the sex menu.

    // Collar
    // Choosable from the main sex menu.
    // Two different intros to this scene, one first-time and one repeat.

    private urtaPetPlayDeletedForeverBecauseThirdProovedMeWrongAboutDice(): void {
        this.clearOutput();
        // First Time
        if (this.flags[kFLAGS.URTA_PETPLAY_DONE] > 0) {
            this.wearZeCollar();
            return;
        }
        this.outx(
            "You hold up the leather collar you found in the previous room, asking when she picked it up."
        );

        this.outx(
            "\n\nUrta's eyes widen, briefly reminding you of dinner plates, and she immediately rolls off the bed, snatching the collar from your hands.  If she could blush, you're certain her face would be bright scarlet right now.  Her tail swishes swiftly between her legs and her ears point straight up, as alert as you've ever seen them.  \"<i>That?  Oh, it's nothing.  Delivered here by mistake.  I, ah, was going to return it tomorrow,</i>\" she says unconvincingly, before setting it aside.  Urta sits on the side of the bed and spreads her legs, giving you a good look at her ample horseshaft, and tries to change the subject with a casual wave of her hand, \"<i>Shall we get back to what you came for, then?</i>\""
        );

        this.outx(
            '\n\nYou retrieve the collar again and look it over.  It\'s well crafted, clearly a custom piece.  Someone went through a lot of trouble to get this made.  Her wide eyes remain fixed on you, watching as you turn it over and inspect it.  She bites her lip nervously, as if the collar might spring out of your hands and bite without warning.  Urta shifts on the bed uncomfortably while you look it over until she finally stands up, proclaiming, "<i>OK, OK, I got it made!</i>"  She shifts in place, hands clasped together in worry.  "<i>I was a little drunk at the time, and I thought... well, I thought it might...</i>" her voice trails off at the end, and you can\'t catch what she said.'
        );

        this.outx(
            "\n\n\"<i>I thought it might look good on you!  You know, for some role playing,</i>\" she says when you press.  Your eyebrow automatically quirks upwards.  She wanted you to wear this?  It's certainly a nice collar, exquisitely made.  You don't think a collar like this would come cheap.  Seeing your face, Urta rises from the bed and takes the leather collar from your hands a second time, throwing it in a nearby trash can.  \"<i>Look, I was drunk when I got it...  don't worry about it, okay [name]?  I love you just the way you are, and don't you dare think otherwise!  Now, are we going to get to it?</i>\" she asks, sitting on the edge of the bed once more."
        );

        this.outx(
            "\n\nWell?  Shall you ignore the collar and let it get thrown out with the trash?  Or you could show her you're interested in a little petplay..."
        );

        // [Ignore (Takes you back to the sex menu, removes Collar from menus)] [Wear]
        this.menu();
        this.addButton(1, "Ignore", this.ignoreUrtasCollar);
        this.addButton(0, "Wear", this.wearZeCollar);
    }

    private ignoreUrtasCollar(): void {
        this.flags[kFLAGS.URTA_PETPLAY_DONE] = -1;
        this.clearOutput();
        if (this.urtaLove()) this.urtaHomeLuvLuvinsMenu();
        else this.goBackToUrtasForLuvinzII();
    }

    private wearZeCollar(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.URTA_PETPLAY_DONE] == 0) {
            this.outx(
                `You reach down into the trashcan, unclasp the collar and slip it on.  You tighten it until it fits snugly against your ${this.player.skinFurScales()}, but isn't otherwise uncomfortable.  With a satisfying <b>click</b>, the clasp snaps shut, so you know there's no going back.  Urta's mouth drops as she watches you do this, completely at a loss for words.  Her cock, on the other hand, hardens, knowing just what to do.`
            );

            this.outx(
                `\n\nYou sink to your knees and then onto your hands in front of her, brazenly displaying your submission to the vixen goddess before you.  She leans back slightly, stunned by this action.  It takes her a minute to recover and pick her jaw up off the floor.  You dutifully wait, silently, until Urta issues a command.  She seems to sense this and clears her throat, clearly embarrassed and nervous.  "<i>Oh, um, good ${this.player.mf(
                    "boy",
                    "girl"
                )},</i>" she murmurs, patting your head.  You rub your face into her palm, which brings a smile to Urta's face.`
            );

            this.outx(
                "\n\n\"<i>Well, since the girl at the store said this was a dog collar... you're going to be an obedient little puppy, aren't you pet?</i>\" Urta asks.  You bark an affirmative response.  \"<i>And that makes me your Owner, doesn't it?</i>\"  You bark again.  Urta's smile widens, and the dick between her legs twitches happily.  Your foxy lover stands up and gives you a once-over, her stocking-clad legs walking circles around you.  You remain stock still until you feel one soft, furry paw press up against your covered groin."
            );

            this.outx(
                '\n\n"<i>You\'re a good little doggy, right?</i>" Urta leans down and whispers in your ear from behind.  You nod and bark happily again.  "<i>You don\'t look like a good doggy to me,</i>" she murmurs, leaning back up and pressing that paw into your groin once more, slightly more insistent.  You find yourself growing '
            );
            if (this.player.hasCock()) this.outx("harder");
            if (this.player.gender == 3) this.outx(" and ");
            if (this.player.hasVagina()) this.outx("wetter");
            this.outx(
                " at the touch, but you can't help but wonder about her words.  What else is there to being a good dog?"
            );

            this.outx(
                '\n\n"<i>Your clothes, pet,</i>" your Owner says, catching your puzzled look.  "<i>Good doggies don\'t wear anything but their collars.</i>"  Oh, of course!  You start to stand and take off your [armor], but Urta places a hand on your shoulder.  "<i>Stay on all fours, pet,</i>" she warns, and you suddenly realize she\'s holding a rolled up copy of the Tel\'Adre Times in her other hand.  You gulp, slightly scared but even more turned on at how she\'s taking charge.'
            );

            this.outx(
                "\n\nYou struggle out of your [armor].  It takes a good minute of work, but then you sit on your hands and knees, bare naked except for the collar, in front of Urta.  You feel so vulnerable like this, like you're baring your soul to someone, but somehow it's okay because it's Urta, someone who started as a friend, bared her own soul to you, and became your lover."
            );
        }
        // (Jump down to Scene Proper)
        // Second Time
        else if (this.flags[kFLAGS.URTA_PETPLAY_DONE] == 1) {
            this.outx(
                'You spy the collar sitting on a nearby dresser and pick it up.  It\'s still a marvelous piece of leather... although it looks different.  A shiny metal, heart-shaped tag dangles from it.  Urta catches you checking out the collar and sits down at the edge of her bed.  "<i>Go on then, [name].  Read it,</i>" she urges you with a soft whisper.'
            );
            this.outx(
                "\n\nThe little, shiny golden tag says '<i>Property of Urta</i>' in soft, flowing script.  Urta fidgets nervously as you run a finger over the engraved words, as though confirming they're real.  \"<i>It's not too much, is it?</i>\" she asks, pulling at the hem of her stockings fitfully.  \"<i>I just thought, since we were playing like this... we could make it official.  Just while we're 'playing' like this, of course.</i>\""
            );

            this.outx(
                "\n\nYou answer her question by snapping the collar on, stripping down to your birthday suit and kneeling in front of your Owner"
            );
            if (this.player.tailType > TAIL_TYPE_NONE) this.outx(", tail wagging");
            this.outx(".  Urta beams at you and pats your head lovingly.");
        }
        // (Jump down to Scene Proper)
        // Repeats
        else {
            this.outx(
                "You spy the collar sitting on a nearby dresser and pick it up.  You run your fingers over the engraved words on the collar's tag that reads '<i>Property of Urta</i>'.  Slipping it on, you also strip down until you're as nude as the day you were born, and kneel in front of your Owner"
            );
            if (this.player.tailType > TAIL_TYPE_NONE) this.outx(", tail wagging");
            this.outx(".");
        }
        // Scenes Join Up Here
        // (If PC has no tail)
        if (this.player.tailType == TAIL_TYPE_NONE) {
            this.outx(
                '\n\n"<i>Good, good. One last touch, though,</i>" she says before turning to a dresser and retrieving some kind of fluffy tail attached to... a butt-plug!  "<i>Since you don\'t have one yourself, we\'ll have to improvise.  Turn around and be a good little puppy now, all right?</i>"  You whimper at the thought of that thing going into your ass, but you dare not disappoint your new Owner.  Flipping yourself around, you lower your upper body all the way to the floor, raising your butt high into the air.'
            );
            if (this.player.tailType == TAIL_TYPE_NONE && this.player.ass.analWetness > 0)
                this.outx(
                    "  Despite your embarrassment, or perhaps because of it, you find your asshole getting wet with desire, practically salivating in anticipation of that thick plug."
                );

            // (Cont. if PC has no tail)
            this.outx(
                "\n\nYour Owner slowly pushes the plug inside while you shiver, the cool plug feeling like ice against your flushed skin.  Your sphincter stretches a little uncomfortably as the invader goes deeper.  You actually groan audibly as you get to the widest part, there's just something about feeling so <b>full</b> inside that makes you feel so goddamn good. With one last little push, the plug slips into place, your asshole clutching it tightly.  Urta stands back and admires your new, temporary tail.  You trot around on all fours for a moment, getting used to the swishing of the tail against the back of your thighs.  It, like the collar, is a constant reminder of the situation you find yourself in."
            );
        }
        this.outx(
            '\n\nYou take a quick walk around the bedroom and then look up at Urta, wagging your tail expectantly at her.  She leans down and pats you on the head, saying, "<i>Such a good little pet!</i>"  You grin happily and sit on your haunches, staring up at your Owner.'
        );

        this.outx(
            '\n\n"<i>Hmm, what does my pet want to do with me today?</i>" she asks with a mischievous look.'
        );
        this.flags[kFLAGS.URTA_PETPLAY_DONE]++;
        // [Doggystyle] ["Reward"] [Walkies! (Not available first time)]
        this.menu();
        this.addButton(0, "Doggystyle", this.doggyStyle);
        this.addButton(1, '"Reward"', this.getAPetReward);
        this.addButton(2, "Walkies", this.urtaTakesPCOnWalkies);
    }

    // Doggystyle
    private doggyStyle(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-home-petplay-doggy"), false);
        this.outx(
            `"<i>Hmm,</i>" Urta wonders aloud, bringing a finger up to her mouth in mock-thoughtfulness.  "<i>What should I do with my little pet now that ${this.player.mf(
                "he",
                "she"
            )}'s all collared up?</i>"  Your Owner walks around you slowly, assessing your body.`
        );

        this.outx(
            `\n\n"<i><b>Sit</b>,</i>" she says, a commanding voice coming easily.  Before you can even think about it, you immediately find your butt touching the smooth, cool floor.  Urta smirks and pats you on the head.  "<i>Good pet.  <b>Down.</b></i>"  Again, you follow her instruction immediately, lowering your front to the ground while simultaneously lifting your ass into the air.  She circles around and kneels alongside of you.  "<i><b>Stay</b>,</i>" she commands.  You don't dare move as she leans in, running a furry hand along the ${this.player.skinFurScales()} of your back, which you can't help but arch, and over your [butt].  Your `
        );
        if (this.player.tailType > TAIL_TYPE_NONE) this.outx("tail");
        else this.outx("tailplug");
        this.outx(
            " wags of its own accord, happily swishing back and forth.  Urta's hand dips between your buttocks, over your "
        );
        if (this.player.tailType > TAIL_TYPE_NONE) this.outx("asshole");
        else this.outx("plugged asshole");
        this.outx(", and between your thighs, ");
        if (this.player.hasCock()) this.outx("grasping your [cock biggest]");
        else this.outx("her fingers slipping ever-so-slightly into the folds of your pussy");
        this.outx(".");

        this.outx(
            "\n\nYou moan appreciatively as she runs her fingers along it, her fingers encircling your "
        );
        if (this.player.hasCock()) this.outx("[cockHead biggest]");
        else this.outx("[clit]");
        this.outx(
            " while her other hand keeps your upper body firmly down.  With every stroke your body burns just a bit hotter, your breath coming a bit shorter.  "
        );
        if (this.player.hasCock())
            this.outx("Her thumb rubs against the sensitive underside of your cock");
        else
            this.outx(
                "One finger slips into you, all the way down to the knuckle, and swivels around to caress your g-spot with expert accuracy"
            );
        this.outx(
            ", making you bite your lip in ecstasy.  You want to cry out right now, but you know you can't break character right now.  Not this early in.  The strokes come faster, and you can feel the orgasmic flames coming on; your limbs tingle and your legs are already wobbling."
        );

        this.outx(
            "\n\nYour Owner, seemingly sensing this, backs off, retracting her hands completely.  You teeter on the edge of orgasm, but with nothing touching you, and without permission to touch yourself, the orgasm subsides, ruined, and your body slowly regains its strength.  Cocking your head, you look back at Urta, who was watching your reaction with gusto."
        );

        this.outx(
            `\n\n"<i>Oh, we can't have you coming too soon,</i>" she explains, slapping your ass lightly.  You flinch a little at the spanking, the erotic combination of pain and pleasure feeling oh-so good on your ${this.player.skinFurScales()}.  "<i>A good pet will only cum after their owner, after all.</i>"  You whine pitifully, hoping it won't take all that long at least.`
        );

        this.outx(
            '\n\n"<i><b>Roll over</b>,</i>" she commands again.  You\'re on your back even before you process the words, holding your arms and legs in the air as though you were a real dog.  Your Owner giggles at seeing this, placing a hand on your belly and rubbing softly.  Her other hand, however, finds its way a bit further up, coming down on one of your nipples.  Fingers lightly swirl around it, and you find your [nipples] hardening, while your '
        );
        if (this.player.hasCock()) this.outx("[cock biggest] does the same");
        else this.outx("[vagina] grows slicker");
        this.outx(".  She really is going to tease you as long as she can, you think to yourself.");

        this.outx("\n\nThe first hand drifts from your belly back towards your ");
        if (this.player.hasCock()) this.outx("cock");
        else this.outx("pussy");
        this.outx(", taking over where it left off just moments ago.  ");
        if (this.player.hasCock())
            this.outx(
                "She wraps her fingers around your shaft, slowly pumping up and down, taking a moment to tease your [cockHead biggest] every few strokes."
            );
        else
            this.outx(
                "She buries two fingers deep inside your cunt, followed by a third, each one twisting around to rub at your g-spot softly."
            );
        this.outx("  The hand on your chest switches to ");
        if (this.player.totalNipples() == 2) this.outx("the ");
        else this.outx("an ");
        this.outx("other nipple, tweaking and teasing that one while she simultaneously ");
        if (this.player.hasCock()) this.outx("jerks you off");
        else this.outx("rubs you from the inside out");
        this.outx(
            ".  Again comes the flame of orgasmic bliss, lapping at your tingling extremities.  Your body feels suddenly electric, so overcharged with sweet, sweet pleasure that you find it hard to think.  Low moans escape your throat, entirely unbidden, while "
        );
        if (this.player.hasCock()) this.outx("pre-cum dribbles from your dick like a leaky faucet");
        else
            this.outx(
                "your folds grow even more damp, constantly drizzling fluids that run down your ass crack, pooling on the floor like a lewd lake"
            );
        if (this.player.hasCock())
            this.outx(
                ", and to top it all off, you find your [leg] inexplicably kicking in mid-air"
            );
        this.outx(".");

        this.outx(
            "\n\nYou find yourself on the precipice of orgasm once more... and once again there's a sudden void as Urta's hands leave your body.  What started off as a moan of ecstasy soon turns into a frustrated whine as your second orgasm dissipates into the ether.  You look into Urta's eyes and realize she's enjoying this control over you, this new power over whether you can cum or not.  In a strange way, you are too, the knowledge that when you finally do cum, it's at Urta's wish sends a twitter of excitement up your spine.  She has such control right now, and you wouldn't have it any other way."
        );

        this.outx(
            '\n\n"<i><b>Roll over</b>,</i>" comes another command.  You do so, returning to your four-legged stance.  Urta, meanwhile, kneels behind you, grasping her thick horsecock which is already practically doused in precum.  You hadn\'t noticed just how aroused she was getting through all of this.  This whole situation must really turn her on.  Your Owner rubs the tip of her shaft against one asscheek, then the other'
        );
        if (this.player.tailType == TAIL_TYPE_NONE)
            this.outx(
                ", while she grasps the plug in your ass firmly and pulls. It comes out easily with a wet <b>pop</b>, making your ass feel suddenly empty.  You guess it won't be empty for long, however"
            );
        this.outx(
            ".  Finally she rubs it against your [asshole], teasing you with every brush of skin against skin."
        );

        this.outx(
            '\n\n"<i><b>Beg</b>,</i>" she instructs softly.  "<i>Beg me to fuck you, pet.  It\'s all right, you can talk.</i>"'
        );

        this.outx(
            '\n\nYou whine for a moment, unsure of what to say, but when that delicious shaft of horsecock makes the slightest contact with your ass again, words come from mouth without need to think.  "<i>Fuck me,</i>" you plead back your voice meek and submissive.  "<i>Fuck me like your little puppy bitch.</i>"'
        );

        this.outx(
            "\n\nThat seems to be all the encouragement she needs, and, grasping your hips roughly, she sinks several inches of her torrid tool directly into your aching, needy ass.  The two of you let out loud, slutty moans in unison.  You find your upper body sinking to the floor, "
        );
        if (this.player.biggestTitSize() <= 5) this.outx("resting on your folded arms");
        else this.outx("resting on your enormous boobs");
        this.outx(
            ", while your ass remains high in the air, all the better to be fucked by your hermaphroditic Owner.  Urta pulls out a few inches just to push in even deeper, and the feeling is exquisite as, with each thrust, you get the sensation of being filled just a little bit more.  By the time her large balls slap into your "
        );
        if (this.player.balls > 0) this.outx("own");
        else if (this.player.hasCock()) this.outx("painfully erect member");
        else this.outx("slit");
        this.outx(
            ", you are overwhelmed by the full, content feeling.  Your eyes roll back in their sockets, and it's hard to focus on anything but the twenty inch dick buried in your sensitive "
        );
        if (!this.silly()) this.outx("ass");
        else this.outx("boypussy");
        this.outx(".");
        this.player.buttChange(60, true, true, false);

        this.outx(
            "\n\nSoon, Urta develops a good rhythm, thrusting in and out, her balls slapping your "
        );
        if (this.player.hasCock()) this.outx("dick");
        else this.outx("cunt");
        this.outx(
            " in such a way that it tingles powerfully, fueling your impending orgasm even more.  Locked in this cadence, she pounds your ass for what seems like hours.  The air grows damp and sweat drips from the two of you, only adding to your desire.  It's not long after until your nostrils are assaulted by the salty scent of sex.  Your "
        );
        if (this.player.hasCock())
            this.outx(
                "[cock] slaps against your belly roughly with every passing second, smearing thick globules of precum which drip down your belly, tickling your flesh like little balls of distilled pleasure"
            );
        if (this.player.gender == 0) this.outx(", while your");
        if (this.player.hasVagina())
            this.outx(
                " unused pussy aches to be filled or touched, its lips puffy and red, sensitive to every hard slap of your foxy lover's balls"
            );
        this.outx(".");

        this.outx(
            "\n\nYour rough, doggystyle lovemaking increases its pace, until it reaches its crescendo.  Urta slams one last time into you, her flare suddenly spreading wide, opening up the deepest reaches of your bowels.  If you'd felt wonderfully full before, it's nothing compared to the sensations now running through your body.  With every pulse of her cock, it seems to stretch you wider, as jet after jet of warm, gooey seed fills your belly."
        );

        this.outx(
            "\n\nYou let loose a canine howl of pleasure as your ass clamps down on the impossibly wide tool.  You stand on the edge of orgasm, and the feeling of being so filled to the brim with cock and cum sends you right over.  Your body alights with electric passion, tingling in ways you rarely ever feel.  The lightning strikes at your "
        );
        if (this.player.hasCock()) {
            this.outx(
                "groin, sending a wave of tremors down your cock, which suddenly erupts, covering your belly and [chest] in warm gooey goodness."
            );
            if (this.player.cumQ() >= 500)
                this.outx(
                    "  It continues to jerk on its own, unloading its massive load until you're laying in a puddle of your own semen."
                );
            if (this.player.hasVagina()) this.outx("  It then travels along to your ");
        }
        if (this.player.hasVagina())
            this.outx(
                "[vagina], which, despite being devoid of cock, clamps down anyway, gushing with femcum, drenching your Owner's balls and legs in sticky, clear fluids."
            );

        this.outx(
            "\n\nYour body shivers constantly as the lightning arcs to every limb, every digit, and every pore of your body.  Everything you can feel feels like it's having an orgasm all at once.  Even your lips and tongue tingle, suddenly wanting a huge, thick cock to suck on."
        );

        this.outx(
            "\n\nExhausted, you slouch forwards, suddenly aware of the large, almost pregnant belly you're sporting as it makes contact with the slick, wet floor below.  You tentatively reach down with one weak hand, cradling your sloshing cum belly as you flop over onto your side, completely spent.  Urta curls up behind you, her cock still firmly inside, plugging all that warm seed inside.  You nuzzle back into her and drift off into a relaxing, orgasm-induced nap."
        );

        this.outx("\n\n...");
        this.player.orgasm();
        this.dynStats("sen", 2);
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] += 4;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] += 2;
        this.menu();
        this.addButton(0, "Next", this.partTwoOfDoggieStyle);
    }

    private partTwoOfDoggieStyle(): void {
        this.clearOutput();
        this.model.time.hours += 2;
        this.statScreenRefresh();
        this.outx(
            "<b><u>Several hours later</u></b>\nYou awake in Urta's arms, tucked under the sheets of her bed.  You're free of your collar, which you can see now lays on a dresser nearby, but you're a little happy to see you still have a small, almost pregnant bulge in your belly where you know a large reservoir of cum now resides.  Urta gives you a shy smooch, saying, \"<i>Mm, I had so much fun, [name].  I... I don't know what got into me there, but I kinda liked it.  And I just adore you for going along with it.</i>\""
        );

        this.outx(
            '\n\nYou chuckle, confirming you enjoyed it too, and that you\'re prepared to be her little doggy any time, if it gets you a reward like that.  Your vixen "Owner" gives you a giant grin and cuddles up closer, murmuring how happy she is to have found someone as great as you.'
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // "Reward"
    private getAPetReward(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-home-petplay-reward"), false);
        this.outx(
            '"<i>Well, you\'ve been a good little pet so far,</i>" Urta says, patting you on the head. "<i>I think a little... reward is in order.</i>"  You quirk an eyebrow, wondering about that pause, but wag your '
        );
        if (this.player.tailType > TAIL_TYPE_NONE) this.outx("tail");
        else this.outx("tailplug");
        this.outx(" enthusiastically.");

        this.outx(
            `\n\nUrta holds up a hand at you and says in a quite commanding voice, "<i>Sit.</i>"  You immediately drop your butt to the floor, getting a little thrill from obeying.  "<i>Good ${this.player.mf(
                "boy",
                "girl"
            )}.  Now stay.</i>"  Once she's satisfied you're staying put, your Owner walks out of the room, her ass swaying tantalizingly as she disappears around the corner.  You wait, naked and with your legs and butt resting on the floor, for several minutes.  You find yourself actually getting a little `
        );
        if (this.player.hasCock()) this.outx("hard");
        if (this.player.gender == 3) this.outx(" and ");
        if (this.player.hasVagina()) this.outx("wet");
        this.outx(
            ", oddly enough, thinking of what your 'reward' could be.  Urta returns several minutes later, with one hand holding some kind of metal dish... a food bowl for a dog!"
        );
        if (this.silly())
            this.outx(
                "  In her other hand is what looks to be a jar of peanut butter.  What use could that have?"
            );

        this.outx(
            "\n\nUrta sits on the edge of her bed, her huge horsecock wobbling in a state of half-hardness, and sets the bowl down between her feet.  Thankfully, it's empty.  You couldn't imagine being forced to eat dog food"
        );
        if (this.silly())
            this.outx(", though you wonder if perhaps that's what the peanut butter is for");
        this.outx(
            ".  Your Owner stretches a foot out towards you, running her stocking-clad paw along your side.  The little tufts of fur protruding from the fishnet tickle your skin in a sensual fashion, and you can't stop your spine from stiffening at the contact."
        );

        this.outx(
            '\n\nYou start to move towards Urta, but she waggles a finger at you.  "<i>Ah-ah, I told you to sit and stay, didn\'t I?</i>"  You gulp and nod, remaining stock-still.  Smiling at this, Urta continues to run her foot across your skin, pulling her padded foot up and over one shoulder and dipping down '
        );
        if (this.player.biggestTitSize() < 1) this.outx("onto your chest");
        else this.outx("between your breasts");
        this.outx(
            ".  She takes a moment to encircle one of your nipples, which stiffens to attention along with "
        );
        if (this.player.totalNipples() == 2) this.outx("its twin");
        else this.outx("the others");
        this.outx(", before sending the paw down further where it makes contact with your ");
        if (this.player.hasCock()) this.outx(this.multiCockDescriptLight());
        else this.outx("[vagina]");
        this.outx(
            ".  There's nothing you can do to stifle the moan of pleasure that escapes your lips as your Owner's paw travels the length of your "
        );
        if (this.player.hasCock()) this.outx("rapidly hardening shaft.");
        else this.outx("moistening slit.");

        this.outx("\n\nUrta keeps this up for a minute, lovingly stroking your ");
        if (this.player.hasCock()) this.outx("dick");
        else if (this.player.hasVagina()) this.outx("cunt lips");
        this.outx(
            ' with a paw, until you bite your lip and whine at her.  She gives you a little smirk and the foot retreats.  "<i>All right then, pet, come and get your bone,</i>" Urta gestures down at the half-erect cock sprouting from between her thighs'
        );
        // silly:
        if (this.silly())
            this.outx(
                ", while she opens the jar of peanut butter and smears a dollop across the flat head.  Is... is that supposed to be enticement?  She really is treating you like a real dog"
            );
        this.outx(
            '.  You crawl towards her nervously, and start to reach up to grasp her cock, but again she mutters, "<i>Ah-ah, good doggies don\'t use their hands.</i>"'
        );

        this.outx(
            "\n\nNodding, you extend your tongue, running it along the length of her hardening shaft"
        );
        if (this.silly()) this.outx(", licking all of the peanut butter off the tip");
        this.outx(
            '.  Urta shivers and lets out a "<i>Mm,</i>" while her pillar of horsecock reaches its full size, clocking in at what has to be a good twenty inches.  '
        );
        if (this.silly())
            this.outx(
                "  Your owner uses her fingers to smear another large dollop of peanut butter along her own shaft, giving you an almost sadistic smirk."
            );
        this.outx(
            "  You smooch and lick your way down her shaft, lapping at every little vein while Urta leans back and enjoys your ministrations.  Little gasps of pleasure escape from her lips, while moans leave yours as you smooch and suckle your way down to the base of that towering horsecock."
        );

        this.outx(
            "\n\nYour foxy Owner's prick glistens by the time you finally take it into your mouth"
        );
        if (this.silly()) this.outx(", the peanut butter now long forgotten");
        this.outx(", stretching your jaw wide.  ");
        if (this.player.hasCock())
            this.outx(
                "Your own cock remains almost painfully rock hard, bobbing awkwardly beneath you, dripping precum onto the floor and bowl."
            );
        if (this.player.hasVagina()) {
            if (this.player.gender == 3) this.outx("  Not to mention");
            else if (this.player.hasVagina()) this.outx("  Meanwhile");
            this.outx(
                ", your pussy is as wet as it's ever been, constantly leaking juices that run down your legs, pooling on the floor."
            );
        }
        this.outx(
            "  You swirl your tongue around Urta's flare, paying homage to the horsecocked goddess.  Lapping at the slit for a moment, you slip your "
        );
        if (this.player.tongueType == TONUGE_SNAKE) this.outx("serpentine ");
        else if (this.player.tongueType == TONUGE_DEMONIC) this.outx("demonic ");
        else if (this.player.tongueType == TONUGE_DRACONIC) this.outx("draconic ");
        this.outx(
            `tongue along the vixen's thick cumvein, which pulses lightly.  Urta groans and runs a hand through your ${this.hairDescript()}, gripping it solidly.  You can't help as you're forced further onto the warm rod.`
        );

        this.outx(
            "\n\nUrta's flare presses against the back of your throat for a moment before slipping down into your throat, bringing a groan up from your core.  The vibrations seem to please your lover, who shudders, and forces her massive cock further down your throat.  It's slightly uncomfortable, but it brings you such a thrill to know the kind of bliss you're giving your Owner.  You bob your head up and down, letting the cock penetrate your throat deeper with every thrust.  Urta's legs stiffen, and her breaths get quicker while the cock buried in your gullet twitches wildly. Clearly not wanting to cum in your mouth, she pulls out, leaving your maw with a wet <b>pop</b>, and aims her cock downwards... right towards the doggy bowl."
        );

        this.outx(
            "\n\nJet after jet of white, hot cum spurts forth from the mismatched vixen's flaring cock, splattering into the bowl messily.  Urta bites her lip, stifling a long groan.  The bowl fills, splashing over the edge and coating your front, and Urta's legs in a fine layer of spooge.  Finally, when little more than drops of semen dribble out, plopping lazily into the bowl below, Urta sits back with a sigh of orgasmic release."
        );

        this.outx(
            '\n\n"<i>Mmm, by Marae that felt good...</i>"  Urta stretches out for a moment and then quirks an eyebrow at you over her deflating member.  "<i>Well, what are you waiting for?  There\'s your reward,</i>" she nudges the dog bowl with a fishnet-clad, semen-splattered paw.  "<i>Eat it all up, pet... you want to be a good puppy, don\'t you?</i>"'
        );

        this.outx(
            "\n\nYou gulp loudly.  You do want to be a good pet, so you lower your head down to the bowl and extend your "
        );
        if (this.player.tongueType == TONUGE_SNAKE) this.outx("serpentine ");
        else if (this.player.tongueType == TONUGE_DEMONIC) this.outx("demonic ");
        else if (this.player.tongueType == TONUGE_DRACONIC) this.outx("draconic ");
        this.outx(
            "tongue, lapping at the top layer and swallowing it down.  It's still warm, and quite salty with a bit of a sweet tang to it.  You quickly dive back into your 'reward', using your tongue as a spoon to consume every last drop in the bowl.  While you're busy doing that, Urta slides off the bed and takes up a position behind your body, ass high into the air, showing off all her goods.  The fox raises a paw, smearing some of her cum along your "
        );
        if (this.player.hasCock()) this.outx("shaft ");
        if (this.player.gender == 3) this.outx(" and ");
        if (this.player.hasVagina()) this.outx("slit ");
        this.outx("tantalizingly.");

        this.outx("\n\nWith every dollop of cum you consume, she gives your ");
        if (this.player.hasCock()) this.outx("[cockHead biggest]");
        else this.outx("[clit]");
        this.outx(
            " a little twirl with a soft, padded toe.  You can't help but moan into the bowl as you go, your legs shivering and stomach twisting with desire.  You continue to lap at the bowl eagerly downing mouthful after mouthful and being rewarded with more pleasure.  Even when you've licked the bowl clean, you find yourself lowering your head further and slurping away the remnants that splattered onto the floor.  Urta seems to find this satisfactory, as she picks up the pace, "
        );
        if (this.player.hasCock()) this.outx("jerking off your cock between two toes");
        else this.outx("rubbing your little love button like mad with one soft toe");
        this.outx(", until you just can't handle any more.");

        this.outx(
            "\n\nYou cry out and bite the side of the bed as a powerful orgasm washes over you.  It feels like a tidal wave of intense pleasure, centered in your groin and rippling outwards with the force of a hurricane.  Your arms and legs all wobble with instability while your muscles tense and relax, spasming uncontrollably.  "
        );
        if (this.player.hasCock())
            this.outx(
                "The cock between your legs, meanwhile, stiffens, briefly becoming harder than you've ever felt before, before blasting the floor with jet after jet of silky white cum."
            );
        else
            this.outx(
                "Meanwhile, your vagina clamps on nothing, achingly, painfully empty.  Juices spray out onto Urta's foot and down your thighs, soaking the floor beneath you in yet more slippery femcum."
            );
        this.outx(
            "  Your Owner doesn't just let it end there, however, she continues her paw-assault on your crotch, stroking and rubbing until you become little more than a gibbering mess of orgasm-infused flesh laying in a puddle of your own sexy goo."
        );
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] += 2;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] += 2;
        this.outx("...");
        this.player.orgasm();
        this.menu();
        this.addButton(0, "Next", this.feedTheBeastPartII);
    }

    private feedTheBeastPartII(): void {
        this.clearOutput();
        this.model.time.hours += 2;
        this.statScreenRefresh();
        this.outx(
            "<b><u>Several hours later...</u></b>\nYou awake in Urta's arms, tucked under the sheets of her bed.  You're free of your collar, which you can see now lays on a dresser nearby.  Urta gives you a shy smooch, saying, \"<i>Mm, I had so much fun, [name].  I... I don't know what got into me there, but I kinda liked it.  And I just adore you for going along with it.</i>\""
        );

        this.outx(
            '\n\nYou chuckle, confirming you enjoyed it too, and that you\'re prepared to be her little doggy any time, if it gets you a reward like that.  Your vixen "<i>Owner</i>" gives you a giant grin and cuddles up closer, murmuring how happy she is to have found someone as great as you.'
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Walkies!
    private urtaTakesPCOnWalkies(): void {
        this.clearOutput();
        this.outx(this.images.showImage("urta-home-petplay-walkies"), false);
        this.outx(
            '"<i>Ah, I know just what we should do!</i>" She claps her hands together and rummages through her dresser.  Urta throws on a simple little yellow sundress and makes her way to the door.  "<i>Come on, pet</i>" she says with a mischevious smirk, patting her leg and holding up a leather leash. "<i>It\'s time to go for a walk!</i>"'
        );

        this.outx(
            "\n\nYou blanch at the thought.  Walking around Tel'Adre... like this?!  Letting everyone see you on your hands and knees, following Urta around like a lost puppy?  It's just so... degrading!  But yet, as nude as you are, you can't hide your body's reaction to this idea. Your skin grows warm, while "
        );
        if (this.player.hasCock()) this.outx("[eachCock] grows hard beneath you");
        if (this.player.gender == 3) this.outx(" and ");
        if (this.player.hasVagina()) this.outx("your [vagina] moistens, ready to be on display");
        this.outx(".");

        this.outx(
            '\n\nUrta gives your ass a playful little smack with a rolled-up newspaper, "<i>Well now, someone likes this idea.</i>"  Your Owner leans down and clips the leash onto your collar, whispering, "<i>Excited for everyone to see what a good, well-behaved little <b>puppy</b> you are?</i>"  You gulp.  Part of you wants to say no, to end this before it even starts, but the rest of you wants it, needs it even.  You at least know that with Urta there, nothing bad will happen.  You trust her to stop this game before anything goes too far.'
        );

        this.outx("\n\nYou swallow hard and nod your head, giving your ");
        if (this.player.tailType > 0) this.outx("tail");
        else this.outx("tailplug");
        this.outx(
            " a nervous little shake.  Urta smiles and opens the door wide, making you squint in the bright daylight.  You feel a tugging at your neck, and realize Urta's already set off.  You scamper off after her on all fours, not wanting to disappoint your Owner.  The two of you travel through some back alleys, thankfully free of strangers, until you come out into the main thoroughfare of the city."
        );

        this.outx(
            "\n\nAll eyes turn to you as Urta leads you, sometimes tugging lightly on the leash to remind you to walk, into the crowd.  Your face glows red with embarrassment.  Here you are, the Champion of Ingnam, butt naked, being lead around on a leash, completely at the whims of your Owner.  You feel the stares of strangers burning into your flesh... but they're not looks of judgment or horror like you thought they would.  No, instead they're looks of lustful hunger.  Men and women both stare at "
        );
        if (this.player.biggestTitSize() >= 5)
            this.outx("the breasts hanging from your chest and ");
        this.outx("your openly displayed rear end.  ");
        if (this.player.hasCock())
            this.outx("Pre-cum drizzles from the end of your painfully erect cock");
        else this.outx("Sweet juices flow from your cunt, drizzling down onto the ground");
        this.outx(", creating a trail of horniness alongside Urta's.");

        this.outx(
            "\n\nYour Owner stops to chat with the occasional citizen every few minutes.  Although they initially seem shocked to see you, they quickly adapt, and you find yourself being ignored more than anything.  You're not sure how to react to that, whether you should be thankful they're not paying any more attention to you, or be angry that they're simply accepting you as a pet, a submissive <i>plaything</i> of Urta's.  Regardless, your horniness does not diminish.  If anything, you find yourself getting "
        );
        if (this.player.hasCock()) this.outx("harder");
        if (this.player.gender == 3) this.outx(" and ");
        if (this.player.hasVagina()) this.outx("wetter");
        this.outx(
            ".  You feel like you really are a pet, out for a walk with your Owner.  It's an odd, and slightly freeing revelation, and once you come to grips with it, your entire experience changes. You find yourself trotting ahead of Urta, happily displaying yourself to all who wish to see."
        );

        this.outx(
            "\n\nSome Tel'Adre citizens approach Urta, commenting on how well trained you are, and although you sense some sarcasm in some of their voices, you can't help but feel a little proud of yourself.  What more could a pet ask for, after all?"
        );

        // Marking this spot off in case I want to add random NPC encounters later.
        this.outx(
            "\n\nFinally, however, the time comes to return to Urta's place, and you follow along the same back alleys so familiar to you by now.  You're unbearably horny at this point, and you can see Urta is having some real trouble keeping her dress from tenting up as well.  Thankfully, you both make it back and Urta leads you inside, shutting the door behind her with a relieved gasp."
        );

        this.outx(
            '\n\n"<i>Oh, by Marae, I can\'t believe I actually did that,</i>" she gasps, leaning down to unhook your leash and collar.  Urta pulls you up to your feet and gives you a hug, whispering, "<i>That was such a rush, [name].  Thank you </i>so<i> much for going along with it.  I fucking love you.</i>"'
        );

        this.outx(
            `\n\nYou ${this.player.mf(
                "laugh",
                "giggle"
            )} and confirm you had a great time as well.  Urta gives you a sheepish look, before asking if you'd ever want to do that again.  You lean in for a kiss, and let that answer the question.`
        );
        this.dynStats("lus", 15);
        this.flags[kFLAGS.URTA_TIME_SINCE_LAST_CAME] = 0;
        this.flags[kFLAGS.URTA_COMFORTABLE_WITH_OWN_BODY] += 5;
        if (this.flags[kFLAGS.PC_FETISH] > 0) {
            this.outx(
                "  <b>You're so fucking turned on after exhibiting yourself in such a way that you're dripping EVERYWHERE.  Such a good doggie.</b>"
            );
            this.dynStats("lus=", 100, "resisted", false);
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }
}
