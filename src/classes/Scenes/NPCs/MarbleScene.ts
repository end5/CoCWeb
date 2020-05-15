import { trace } from "../../../console";
import {
    EARS_HUMAN,
    LOWER_BODY_TYPE_CENTAUR,
    TONUGE_DEMONIC,
    TONUGE_HUMAN,
    TONUGE_SNAKE,
    VAGINA_WETNESS_SLICK,
    VAGINA_WETNESS_WET,
} from "../../../includes/appearanceDefs";
import { CoC } from "../../CoC";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { ItemType } from "../../ItemType";
import { PerkLib } from "../../PerkLib";
import { PregnancyStore } from "../../PregnancyStore";
import { StatusAffects } from "../../StatusAffects";
import { TimeAwareInterface } from "../../TimeAwareInterface";
import { Marble } from "./Marble";
import { NPCAwareContent } from "./NPCAwareContent";

export class MarbleScene extends NPCAwareContent implements TimeAwareInterface {
    // Farm cow-girl Marble:
    // Marble is a resident of Whitney's farm, who resides in the barn.  She is a cow anthropomorph who is mostly human in appearance, but has numerous cow-like features such as a tail, horns, ears, and hoofs.  The player can strike up a relationship with her based on tenderness and being friendly to each other.  Her favorite activity is to give her milk to the player if she likes them enough, or if they help her with her chores.  The only problem is that her milk is addictive; of course, when the player meets her she doesn't know this.  While the player doesn't get high from drinking it, Marble's milk makes the player character feel good as strengthening them for awhile as well after they drink it (in the form of Marble's Milk status effect), this is to encourage the player to consume it.  Once the player has become addicted, they can try to find a way to combat their addiction, or choose to live with her because of it.  Getting out of the addiction is really hard on the player since their character's stats fall whenever they fight it.  I deliberately wrote her to appear as harmless and nice as possible, just a friendly face that likes the player.  However, she can change considerably once she finds out her milk is addictive, either becoming really depressed and hating herself for what she unconsciously did to the player; or she may start to take advantage of her new found power and become slowly corrupted by it.  She is also very strong and can wield a mean hammer.  If she likes the player enough, she can join them at their camp once they either become completely dependent or get out of their addiction.

    // When she is released, I would like it if there is no indication that her milk is addictive in the release, that's for the player to find out.

    // Marble's Variables:
    // I propose that these variables appear while in debug mode at the start of every event where the player meets Marble
    // in an abbreviated form (ex, aff:25, add:10, isA:0)
    // trace("Marble Stats: Aff-"+player.statusAffectv1(StatusAffects.Marble)+" Add-" + player.statusAffectv2(StatusAffects.Marble) + " isA-" + player.statusAffectv3(StatusAffects.Marble) + ".");
    // affection (0-100) - how much Marble likes the player, raised by visiting, helping her, and generally being nice.  Determines what she is willing to do for the player, and how things turn out after the addiction event (30+, she will nurse the player; 60+, she will have sex with the player; 100, she wants to live with the player).
    // addiction (0-100)- how addicted the player is to her milk, raised by drinking it and not trying to escape the addiction.  Affects what events can happen.  When it reaches 40, the player becomes addicted the next time they drink directly from Marble's breast.  The player remains addicted until it drops below 25.  If it hits 100 the player becomes fully dependent on Marble and can no longer survive without her milk.  The level of addiction the player has slowly decreases over time (1 point or less each day).
    // isAddict (0-2), it keeps track of whether or not the player is addicted, and whether or not Marble likes that (0-not addicted, 1-Addicted and likes it, 2-Addicted and is ashamed).
    // result, this will need to keep track of what outcome happened, including whether or not the player became fully addicted, and whether Marble is gone, still at the farm, or at the camp

    /*
    Codex: Lacta Bovine (found in the game)
    Description: A race of all female bovine-morphs more commonly known as cow girls.  They appear as tall and well-endowed women with numerous bovine characteristics.  Generally they have bovine horns, ears, tail, and legs.  They are relatives of the Minotaurs and are similarly resilient and very strong. However, they are unusually sensitive compared to their cousins.
    Skin and Fur: The skin tone of these creatures is very close to being human; their fur more closely follows the common Minotaur fur colors of brown, black or white with brown spots.
    Behaviour: The behaviour of Lacta Bovine varies greatly between each individual.  The only major unifying behaviours are their desire to give milk to almost any living creature and a high libido, common to all corrupted creatures.
    Special abilities: A lightly corrupted creature with most of the corruption centered in their breast milk.  It is addictive to those that drink it repeatedly, eventually making them dependent on the one from whom it was drunk. The milk also strengthens the drinker and helps them to relocate the one who nursed them, though that Lacta Bovine is granted limited powers of control over them.  Finally, the breasts of Lacta Bovine are incredibly resilient and able to heal from almost any damage, even being cut off. Thus, they can produce milk for their entire life without fail.
    */
    // const MARBLE_LUST: number = 3;
    // const MARBLE_KIDS: number = 8;
    // const MURBLE_FARM_TALK_LEVELS: number = 458;
    // const BROKE_UP_WITH_MARBLE: number = 459;
    // const MARBLE_PLAYED_WITH_KIDS_TODAY: number = 460;
    // const MARBLE_CAMPTALK_LEVEL: number = 461;
    // const MARBLE_TELADRE_STORY: number = 462;
    // const MARBLE_WARNING: number = 463;
    // const MARBLE_BOVA_LEVEL: number = 465;
    // const MARBLE_MILKED_BEFORE: number = 1165;

    public pregnancy: PregnancyStore;

    public constructor() {
        super();
        this.pregnancy = new PregnancyStore(
            kFLAGS.MARBLE_PREGNANCY_TYPE,
            kFLAGS.MARBLE_PREGNANCY_INCUBATION,
            0,
            0
        );
        this.pregnancy.addPregnancyEventSet(
            PregnancyStore.PREGNANCY_PLAYER,
            648,
            528,
            432,
            288,
            144
        );
        // Event: 0 (= not pregnant),  1,   2,   3,   4,   5,  6 (< 144)
        CoC.timeAwareClassAdd(this);
    }

    private checkedMarbleMilk = 0; // Make sure we test each of these events just once in timeChangeLarge

    // Implementation of TimeAwareInterface
    public timeChange(): boolean {
        let needNext = false;
        this.checkedMarbleMilk = 0;
        this.pregnancy.pregnancyAdvance();
        trace(
            `\nMarble time change: Time is ${this.model.time.hours}, incubation: ${this.pregnancy.incubation}, event: ${this.pregnancy.event}`
        );
        if (this.player.findStatusAffect(StatusAffects.CampMarble) >= 0) {
            // Marble stuff pt I
            if (this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_1] > 0) {
                this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_1]--;
                // Stick it at 1 so I can trigger it off the camp screen.
                if (this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_1] <= 1)
                    this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_1] = 1;
            }
            // Counting down to purity!
            if (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] == 0) {
                if (this.flags[kFLAGS.MARBLE_COUNTUP_TO_PURIFYING] < 200)
                    this.flags[kFLAGS.MARBLE_COUNTUP_TO_PURIFYING]++;
            }
            // Counter 2!
            if (this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_2] > 0) {
                this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_2]--;
                // Stick it at 1 so I can trigger it off the camp screen.
                if (this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_2] <= 1)
                    this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_2] = 1;
            }
            // Post purification nursitude
            if (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] >= 5) {
                this.flags[kFLAGS.MARBLE_TIME_SINCE_NURSED_IN_HOURS]++;
                if (this.flags[kFLAGS.MARBLE_TIME_SINCE_NURSED_IN_HOURS] > 1000)
                    this.flags[kFLAGS.MARBLE_TIME_SINCE_NURSED_IN_HOURS] = 1000;
            }
            // Reset Marble corruption warning
            if (this.flags[kFLAGS.MARBLE_WARNED_ABOUT_CORRUPTION] == 1 && this.player.cor < 50)
                this.flags[kFLAGS.MARBLE_WARNED_ABOUT_CORRUPTION] = 0;
            // Lactation whoopie!
            if (this.flags[kFLAGS.MARBLE_TIME_SINCE_NURSED_IN_HOURS] < 100)
                this.flags[kFLAGS.MARBLE_TIME_SINCE_NURSED_IN_HOURS]++;
            // Increment Marble's Lust
            if (this.flags[kFLAGS.MARBLE_LUST] < -100) this.flags[kFLAGS.MARBLE_LUST] = -100;
            if (MarbleScene.rand(2) == 0) this.flags[kFLAGS.MARBLE_LUST] += 1;
            if (this.player.statusAffectv4(StatusAffects.Marble) > 50)
                this.flags[kFLAGS.MARBLE_LUST] += 0.3;
            if (this.player.statusAffectv4(StatusAffects.Marble) > 70)
                this.flags[kFLAGS.MARBLE_LUST] += 0.3;
            // If bitch-bin is in construction
            if (
                this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION] > 0 &&
                this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION] < 100 &&
                this.marbleScene.marbleAtCamp()
            ) {
                this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION]++;
                if (this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION] >= 100) {
                    this.spriteSelect(41);
                    this.outx(
                        "\n<b>Marble lets you know that she's finished building a rather secure nursery for your coming offspring.</b>\n",
                        false
                    );
                    needNext = true;
                    this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION] = 100;
                }
            }
            // Marble find items check
            else if (
                this.player.findStatusAffect(StatusAffects.MarbleHasItem) < 0 &&
                this.marbleScene.marbleAtCamp()
            ) {
                // Off cooldown
                if (this.player.findStatusAffect(StatusAffects.MarbleItemCooldown) < 0) {
                    if (MarbleScene.rand(10) == 0) {
                        this.spriteSelect(41);
                        this.outx(
                            "\n<b>You find a note from Marble back at camp, letting you know that she has an item for you!</b>\n",
                            false
                        );
                        this.player.createStatusAffect(
                            StatusAffects.MarbleItemCooldown,
                            24 + MarbleScene.rand(24),
                            0,
                            0,
                            0
                        );
                        this.player.createStatusAffect(
                            StatusAffects.MarbleHasItem,
                            MarbleScene.rand(10),
                            0,
                            0,
                            0
                        );
                        needNext = true;
                    }
                }
            }
        }
        // Decrement marble cooldown
        if (this.player.findStatusAffect(StatusAffects.MarbleItemCooldown) >= 0) {
            this.player.addStatusValue(StatusAffects.MarbleItemCooldown, 1, -1);
            if (this.player.statusAffectv1(StatusAffects.MarbleItemCooldown) < 1)
                this.player.removeStatusAffect(StatusAffects.MarbleItemCooldown);
        }
        if (this.player.findStatusAffect(StatusAffects.Infested) < 0)
            this.flags[kFLAGS.MARBLE_GROSSED_OUT_BECAUSE_WORM_INFESTATION] = 0;
        if (
            this.player.findStatusAffect(StatusAffects.MarblesMilk) >= 0 &&
            this.player.findPerk(PerkLib.MarblesMilk) < 0
        ) {
            // Decrement time remaining by 1
            this.player.addStatusValue(StatusAffects.MarblesMilk, 1, -1);
            // Remove the status and stat boosts when time runs out on the milk
            if (this.player.statusAffectv1(StatusAffects.MarblesMilk) <= 0) {
                needNext = true;
                this.dynStats(
                    "str",
                    -1 * this.player.statusAffectv2(StatusAffects.MarblesMilk),
                    "tou",
                    -1 * this.player.statusAffectv3(StatusAffects.MarblesMilk)
                );
                this.player.removeStatusAffect(StatusAffects.MarblesMilk);
                // Text for when Marble's Milk effect wears off:
                // [addiction is 10 or less]
                if (this.player.statusAffectv2(StatusAffects.Marble) <= 10)
                    this.outx(
                        "\nYou feel the euphoria from drinking Marble's milk fade from you. Only now that it's gone do you notice that it was actually making you tougher.\n",
                        false
                    );
                // [addiction is 11-30]
                else if (this.player.statusAffectv2(StatusAffects.Marble) <= 30)
                    this.outx(
                        "\nYou feel a slight sense of loss as the euphoria from Marble's milk fades.  You kinda want to drink more, but the desire is not overpowering.\n",
                        false
                    );
                // [addiction is 31-50, player is not addicted]
                else if (this.player.statusAffectv2(StatusAffects.Marble) <= 50)
                    this.outx(
                        "\nYou shiver slightly as the euphoria from Marble's milk fades.  You really feel like suckling her breasts again.\n",
                        false
                    );
                // IF ADDICTED
                if (this.player.statusAffectv3(StatusAffects.Marble) > 0) {
                    // If player is under bottled milk effects
                    if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
                        this.outx(
                            "\nYour hands develop a tiny tremble as the effects of Marble's fresh milk wear off.  Thanks to the bottled milk you drank, you don't go into withdrawal just yet.\n",
                            false
                        );
                    } else {
                        // [addiction is <90, player is addicted]
                        if (this.player.statusAffectv2(StatusAffects.Marble) <= 90)
                            this.outx(
                                "\nYour hands start to tremble as you lose the only true relief you get to your cravings.  You desperately want to go see Marble again, especially if it means a chance to drink her wonderful milk.\n",
                                false
                            );
                        // [addiction is >=90, player is addicted]
                        else
                            this.outx(
                                "\nThe euphoria from Marble's milk has faded, and you need more milk.  It's almost impossible not to run straight back to her and beg her to let you drink from her breasts again.\n",
                                false
                            );
                        // If the player is addicted to her milk, they gain the withdrawal effect when it wears off, reducing player's inte and tou by 5
                        this.player.createStatusAffect(StatusAffects.MarbleWithdrawl, 0, 0, 0, 0);
                        this.dynStats("tou", -5, "int", -5);
                    }
                }
            }
        }
        // Go into withdrawl if your addicted and don't have a reason not to be withdrawn.
        if (
            this.player.statusAffectv3(StatusAffects.Marble) > 0 &&
            this.player.findPerk(PerkLib.MarbleResistant) < 0 &&
            this.player.findPerk(PerkLib.MarblesMilk) < 0 &&
            this.player.statusAffectv2(StatusAffects.Marble) > 25
        ) {
            // If player does not have marble's milk or bottled milk, go into withdrawl
            if (
                this.player.findStatusAffect(StatusAffects.MarblesMilk) < 0 &&
                this.player.findStatusAffect(StatusAffects.BottledMilk) < 0
            ) {
                // If player is not yet in withdrawl
                if (this.player.findStatusAffect(StatusAffects.MarbleWithdrawl) < 0) {
                    this.outx(
                        "\nYou are overwhelmed with a desire for more of Marble's Milk.\n",
                        false
                    );
                    needNext = true;
                    this.player.createStatusAffect(StatusAffects.MarbleWithdrawl, 0, 0, 0, 0);
                    this.dynStats("tou", -5, "int", -5);
                }
            }
        }
        // Prevent addiction from passing 60 if not yet revealed that your addicted
        if (this.player.statusAffectv3(StatusAffects.Marble) <= 0) {
            if (this.player.statusAffectv2(StatusAffects.Marble) > 60)
                this.player.changeStatusValue(StatusAffects.Marble, 2, 60);
        }
        // Withdrawl removal if you get unaddicted.
        if (this.player.findStatusAffect(StatusAffects.MarbleWithdrawl) >= 0) {
            if (this.player.statusAffectv2(StatusAffects.Marble) <= 25) {
                this.player.removeStatusAffect(StatusAffects.MarbleWithdrawl);
                this.dynStats("tou", 5, "int", 5);
                this.outx("\nYou no longer feel the symptoms of withdrawal.\n", false);
                needNext = true;
            }
            // Remove withdrawl if you have bottled milk affect
            else if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
                this.outx("\nYou no longer feel the symptoms of withdrawal.\n", false);
                needNext = true;
                this.player.removeStatusAffect(StatusAffects.MarbleWithdrawl);
                this.dynStats("tou", 5, "int", 5);
            }
        }
        // Bottled Milk Countdown
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, -1);
            if (this.player.statusAffectv1(StatusAffects.BottledMilk) <= 0)
                this.player.removeStatusAffect(StatusAffects.BottledMilk);
        }
        if (this.model.time.hours > 23) {
            this.flags[kFLAGS.MARBLE_PLAYED_WITH_KIDS_TODAY] = 0;
            if (
                this.player.findStatusAffect(StatusAffects.Marble) >= 0 &&
                this.player.statusAffectv2(StatusAffects.Marble) > 0
            )
                this.marbleStatusChange(0, -1);
        }
        return needNext;
    }

    public timeChangeLarge(): boolean {
        if (this.pregnancy.isPregnant && this.pregnancy.incubation == 0 && this.marbleAtCamp()) {
            this.marblePoopsBaybees();
            this.pregnancy.knockUpForce(); // Clear Marble's Pregnancy
            return true;
        }
        // End addiction (occurs after the player wakes up when their addiction is under 25 && is not permanently addicted)
        if (
            this.player.statusAffectv3(StatusAffects.Marble) > 0 &&
            this.player.statusAffectv2(StatusAffects.Marble) < 25 &&
            this.player.findPerk(PerkLib.MarblesMilk) < 0 &&
            this.player.findPerk(PerkLib.MarbleResistant) < 0 &&
            this.model.time.hours == 6
        ) {
            this.spriteSelect(41);
            this.outx(
                "\nYou wake up feeling strangely at ease, having slept better than you have in a long while.  After a minute, you realize that you don't feel a need to drink Marble's milk anymore!  You are free of your addiction.  You hurry off to the farm to give her the news.\n\n",
                false
            );
            this.outx(
                'You find Marble in her room.  When you come in she looks up at you and starts.  "<i>What happened?</i>" she asks, "<i>Something about you is completely different from before...</i>"  You explain to her that you\'ve gotten over your addiction and no longer crave her milk.\n',
                false
            );
            // (reduce corr by 5)
            this.dynStats("cor", -5);
            // (From this point forward, the addiction scores and affection scores are no longer modified.  Additionally, the player can no longer be given the status effect of 'Marble's Milk' or go into withdrawal)
            this.player.createPerk(PerkLib.MarbleResistant, 0, 0, 0, 0);
            // After player ends Addiction:
            // Marble liked you addicted
            if (this.player.statusAffectv3(StatusAffects.Marble) == 1) {
                // Affection 0-29, version 1
                if (this.player.statusAffectv1(StatusAffects.Marble) < 30) {
                    this.outx(
                        '\nMarble looks horrified at your words and exclaims, "<i>You told me you would always want my milk!  How could you do this to me?</i>"  You try to explain yourself to her, but she will have none of it.  "<i>That\'s it, I\'m leaving, don\'t come looking for me.</i>"  She storms out the door.  Having no further reason to stay here, you leave too.\n',
                        false
                    );
                    // (Marble leaves the farm, she is no longer encountered)
                    this.player.createStatusAffect(StatusAffects.NoMoreMarble, 0, 0, 0, 0);
                }
                // Affection 30-89, version 1
                if (
                    this.player.statusAffectv1(StatusAffects.Marble) >= 30 &&
                    this.player.statusAffectv1(StatusAffects.Marble) < 90
                ) {
                    this.outx(
                        '\nMarble looks horrified at your words and exclaims "<i>You told me you would always want my milk!  How could you do this to me?</i>"  You try to explain yourself to her, telling her how important your task is and how everyone is counting on you.  As you speak, her expression slowly softens and eventually she calms down.  "<i>Alright,</i>" she says, "<i>I guess I shouldn\'t have worried about my milk so much.  It\'s probably best if people don\'t drink it anyway.</i>"  You agree with her and she smiles at you.  "<i>I guess things are back to normal now.</i>"  You both laugh at this.\n',
                        false
                    );
                    // (Marble can be met at the farm)
                }
                // Affection 90+, version 1
                if (this.player.statusAffectv1(StatusAffects.Marble) >= 90) {
                    this.outx(
                        '\nMarble looks horrified at your words and exclaims "<i>You told me you would always want my milk!  How could you do this to me?</i>"  You try to explain yourself to her, telling her how important your task is and how everyone is counting on you.  As you speak, her expression slowly softens and eventually she calms down.  "<i>Alright,</i>" she says "<i>I guess I shouldn\'t have worried about my milk so much.  It\'s probably best if people don\'t drink it anyway.</i>"  You agree with her and she smiles, suddenly looking down.  "<i>Without someone like you, I don\'t think things would have turned out this way.  I..</i>" she hesitates, "<i>I\'ll stay with you at camp from now on!</i>"\n',
                        false
                    );
                    // (Marble now appears at the camp)
                    this.player.createStatusAffect(StatusAffects.CampMarble, 0, 0, 0, 0);
                    this.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] = 0;
                    if (
                        kGAMECLASS.isabellaFollowerScene.isabellaFollower() &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_ISABELLA] == 0
                    )
                        this.flags[kFLAGS.ISABELLA_MURBLE_BLEH] = 1;
                    // if amily is there, tag it for freakout
                    if (
                        this.flags[kFLAGS.AMILY_FOLLOWER] > 0 &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0
                    ) {
                        this.flags[kFLAGS.MARBLE_OR_AMILY_FIRST_FOR_FREAKOUT] = 2;
                    } else this.flags[kFLAGS.MARBLE_OR_AMILY_FIRST_FOR_FREAKOUT] = 1;
                    // if Izma is there, tag for freakout!
                    if (
                        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1 &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0
                    ) {
                        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00237] = 1;
                    }
                    this.player.createStatusAffect(StatusAffects.NoMoreMarble, 0, 0, 0, 0);
                }
            }
            // Ashamed Marble
            else {
                // Affection 0-29, version 2
                if (this.player.statusAffectv1(StatusAffects.Marble) < 30) {
                    this.outx(
                        '\nMarble seems impassive at the news of hearing that you are no longer addicted.  Her eyes have gone cold, her old passion gone.  "<i>Good,</i>" she states simply and points at a paper on the table in her room.  "<i>That\'s for you. Goodbye.</i>" With that, she turns and walks out the room.  Since you are unsure how to react, you decide to take a look at the paper.\n\n',
                        false
                    );
                    // [This section should be indented and/or italicized] - put the codex entry here
                    this.outx(
                        "The piece of paper looks like a page torn from a book.  It looks like an entry from an encyclopedia of sorts, it reads in formal script:\n",
                        false
                    );
                    this.outx("<b><u>Codex: Lacta Bovine</u></b>\n", false);
                    this.outx(
                        "Description: <i>A race of all female bovine-morphs, more commonly called cow-girls.  They appear as tall well endowed women, with numerous bovine characteristics.  Generally they have bovine horns, ears, tail, and legs.  Like all minotaurs, they are very strong and resilient, however, they are unusually sensitive compared to their relatives.</i>\n",
                        false
                    );
                    this.outx(
                        "Skin and Fur: <i>The skin tone for these creatures is very close to being human, their fur more closely follows the common minotaur fur colors: brown, black or white with brown spots.</i>\n",
                        false
                    );
                    this.outx(
                        "Behavior: <i>The behavior of Lacta Minotaurs varies greatly between each individual.  The only major unifying piece of behavior is their desire to give milk to almost any living creature, and their high libido, common to all corrupted creatures.</i>\n",
                        false
                    );
                    this.outx(
                        "Special abilities: <i>A lightly corrupted creature, most of the corruption is centered on their breast milk.  It is addictive to those that drink it repeatedly, eventually making them dependent on the one from whom it was drank from.  The milk also strengthens the drinker, makes them better able to find the one who nursed them, and grants limited powers of control over them to the Lacta Minotaur that nursed them.  Finally, the breasts of Lacta Minotaurs are incredibly resilient, healing from almost any damage, even being cut off; they are able to produce milk for their entire life without fail.</i>\n",
                        false
                    );
                    this.outx(
                        "\nUnderneath the entry is a single line, written in a crude and unsteady hand:     <i>No one will ever drink my milk again.  I'm sorry, sweetie.</i>\n",
                        false
                    );
                    this.player.createStatusAffect(StatusAffects.NoMoreMarble, 0, 0, 0, 0);
                }
                // Affection 30-69, version 2
                if (
                    this.player.statusAffectv1(StatusAffects.Marble) >= 30 &&
                    this.player.statusAffectv1(StatusAffects.Marble) < 70
                ) {
                    this.outx(
                        '\nMarble looks relieved, like a great weight has been lifted from her shoulders.  "<i>I\'m glad you won\'t need me anymore then,</i>" she says, her face falling, "<i>Now, no one will mind if I disappear.</i>"  You look at her in surprise and ask her why she says that.  She explains that the only way to be sure that no one else ever drinks her milk is for her to disappear, forever.  You tell her not to think like that and that the people on the farm still appreciate her help with the chores and duties, insisting that they would all be sorry to see her go. Besides, now that you both know that her milk is addictive, the two of you have a big advantage compared to what happened the first time.  "<i>Plus, we got through it, didn\'t we?</i>" you say with a smile.  At this, her face lights up, "<i>You\'re right! Thanks for being such a good friend, sweetie.</i>"  She smiles at you in return.  "<i>I guess things are back to normal now.</i>"  You both laugh at this.\n',
                        false
                    );
                    // (Marble can be encountered at the farm)
                }
                // Affection 70+, version 2
                if (this.player.statusAffectv1(StatusAffects.Marble) >= 70) {
                    this.outx(
                        "\nMarble looks relieved, like a great weight has been lifted from her shoulders.  \"<i>I'm glad you won't need me anymore then,</i>\" she says, her face falling, \"<i>Now, no one will mind if I disappear.</i>\"  You look at her in surprise and quickly grab her arms.  You tell her with no uncertainty that if she disappeared, you would forever miss her.  You don't care about her milk, it doesn't matter; it is her as a person that matters to you.  You wouldn't have done all those things or spent all that time together if you didn't care about her.  She bursts into tears and hugs you tightly to her breasts.\n\n",
                        false
                    );
                    this.marbleAddictionSex(false);
                    this.outx("\n", false);
                    this.player.createStatusAffect(StatusAffects.CampMarble, 0, 0, 0, 0);
                    this.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] = 0;
                    if (
                        kGAMECLASS.isabellaFollowerScene.isabellaFollower() &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_ISABELLA] == 0
                    )
                        this.flags[kFLAGS.ISABELLA_MURBLE_BLEH] = 1;
                    // if amily is there, tag it for freakout
                    if (
                        this.flags[kFLAGS.AMILY_FOLLOWER] > 0 &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0
                    ) {
                        this.flags[kFLAGS.MARBLE_OR_AMILY_FIRST_FOR_FREAKOUT] = 2;
                    } else this.flags[kFLAGS.MARBLE_OR_AMILY_FIRST_FOR_FREAKOUT] = 1;
                    // if Izma is there, tag for freakout!
                    if (
                        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1 &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0
                    ) {
                        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00237] = 1;
                    }
                    this.player.createStatusAffect(StatusAffects.NoMoreMarble, 0, 0, 0, 0);
                }
            }
            this.outx(
                "\n<b>You have gained the perk Marble Resistance</b> (You know how to avoid the addictive qualities of her milk!)\n",
                false
            );
            this.doNext(this.playerMenu);
            return true;
        }
        // Become permanently addicted (occurs when the player goes to sleep with addiction 100, before it is reduced by the standard 1):
        if (
            this.player.statusAffectv3(StatusAffects.Marble) > 0 &&
            this.player.statusAffectv2(StatusAffects.Marble) >= 100 &&
            this.player.findPerk(PerkLib.MarblesMilk) < 0 &&
            this.player.findPerk(PerkLib.MarbleResistant) < 0 &&
            this.model.time.hours == 6
        ) {
            this.spriteSelect(41);
            this.outx(
                "\nYou wake up feeling like something has changed.  With slightly chilling clarity, you realize that you have finally become completely and utterly dependent on Marble's milk; you must drink her milk every day, or you will die.  There is nothing that can be done to change that at this point.  You hurry over to the farm; you have to drink Marble's milk, NOW.\n\n",
                false
            );
            this.outx(
                'You find Marble in her room.  When you come in she looks up at you and smiles deeply.  "<i>What happened?</i>" she asks, "<i>Something about you feels so wonderful and right.</i>"  You explain to her that you\'ve finally become entirely dependent on her milk.\n',
                false
            );
            // (From this point forward, the addiction scores and affection scores are no longer modified.  Additionally, the player can no longer be given the status effect of 'Marble's Milk' or go into withdrawal, they are instead permanently given the stat increases of 5 str, and 10 tou as part of a perk called 'Marble's Milk' and automatically drink Marble's milk every morning if a bad end is not triggered)
            this.player.createPerk(PerkLib.MarblesMilk, 0, 0, 0, 0);
            // Clear withdrawl
            if (this.player.findStatusAffect(StatusAffects.MarbleWithdrawl) >= 0) {
                this.player.removeStatusAffect(StatusAffects.MarbleWithdrawl);
                this.dynStats("tou", 5, "int", 5);
            }
            // Clear marble's milk status
            if (this.player.findStatusAffect(StatusAffects.MarblesMilk) >= 0) {
                this.player.removeStatusAffect(StatusAffects.MarblesMilk);
            }
            // Boost stats if not under its affects
            else {
                this.dynStats("str", 5, "tou", 10);
            }
            // Post-addiction flavors
            // Marble liked you addicted
            if (this.player.statusAffectv3(StatusAffects.Marble) == 1) {
                // Affection 0-49, type 1:
                if (this.player.statusAffectv1(StatusAffects.Marble) < 49) {
                    // outx("\nA huge grin passes over Marble's face, \"<i>I'm glad to hear it sweetie,</i>\" she tells you, \"<i>I was hoping you might help me out with my chores. Then I'll see about getting you some milk.</i>\"  The idea of working for her milk seems oddly right, and you put a huge effort into helping Marble with her chores.  Afterwards, Marble gladly agrees to give you her milk. While you are nursing from her, she starts to talk: \"<i>Sweetie, I've been thinking.  I think you should stay here with me from now on, since you need my milk to survive.</i>\"  She starts to stroke your head.  \"<i>You always do such a good job with the chores too; do you really want to do anything else?</i>\"  You try to pull back from her and tell her about your quest, but she keeps your mouth from straying from her breast.  \"<i>No, of course you don't.</i>\"  She says with finality, and you feel your need to do anything else fade....\n\n", false);
                    // outx("\nMarble continues talking for a while, but it doesn't really matter to you anymore, all that matters to you now is earning her milk, and doing anything to please her.  Your mind is still able to wander freely, but it is so fixated on your need that you will remain at Marble's side for the rest of your life.  Your village will just have to rely on the next champion.", false);
                    this.outx(
                        "Marble grabs you and pulls your head into her chest.  \"<i>Mmm, if you need me so much, then I want you to move in with me on the farm,</i>\" she says happily above you.  \"<i>That way, I can take care of you and you can help me, and we'll both be happy.</i>\"  You panic a bit; while you'd certainly be happy to have the source of her delicious milk at your fingertips, leaving the portal unguarded means the demons will be free to set up shop there again!  Marble responds to your squirming by tightening her arms and says, \"<i>Ah, ah, remember, sweetie; you need my milk and I control whether or not you can drink it.  I'm happy to share it, but if I'm being so generous, I think the least you could do is make it easier for me.  I don't think living here and helping me with the farmwork is too much to ask, do you?</i>\"  Her face contorts into an open-mouthed smile and her eyes glitter.  You sigh into her chest, she's right, there isn't much you can do about it now..."
                    );
                    this.doNext(this.marbleBadEndFollowup);
                    return true;
                }
                // Affection 50-79, type 1:
                if (
                    this.player.statusAffectv1(StatusAffects.Marble) >= 50 &&
                    this.player.statusAffectv1(StatusAffects.Marble) < 79
                ) {
                    this.outx(
                        '\nA huge grin passes over Marble\'s face, "<i>I\'m glad to hear it sweetie,</i>" she tells you, "<i>Are you thirsty already?</i>" You give an eager nod and she slips her top off, pushing your mouth to one of her teats.  After you\'ve drunk your fill, Marble sighs and gives you a smile.  "<i>I was thinking that maybe you should live with me from now on, but I think I like seeing you visit like this too much.  It always makes me so happy to see you come by, so why don\'t we just leave things the way they are?</i>"  You agree with her and she says "<i>I\'ll see you tomorrow when you\'re thirsty again.</i>"  You nod again and return to your camp.\n',
                        false
                    );
                    // (Marble can be encountered at the farm)
                    // (every morning, the player goes to Marble for milk, it costs them the first hour of the day)
                }
                // High affection
                if (this.player.statusAffectv1(StatusAffects.Marble) >= 80) {
                    this.outx(
                        '\nA huge grin passes over Marble\'s face, "<i>I\'m glad to hear it sweetie,</i>" she tells you, "<i>Are you thirsty already?</i>" You give an eager nod and she slips her top off, pushing your mouth to one of her teats.  After you\'ve drunk your fill, you notice Marble staring closely at you. "<i>Sweetie, do you like me for more than just my milk?</i>"  You are taken aback by the question, why wouldn\'t you?  "<i>I want to know if you like me because I\'m me, and not because you like my milk.  Can you show me in a special way?</i>" she asks you, suggestively.  You agree without having to think about it at all.\n\n',
                        false
                    );
                    // (player chose yes) do after addiction sex event
                    this.marbleAddictionSex(false);
                    this.outx("\n", false);
                    // (Marble now appears at the camp)
                    this.player.createStatusAffect(StatusAffects.CampMarble, 0, 0, 0, 0);
                    this.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] = 0;
                    if (
                        kGAMECLASS.isabellaFollowerScene.isabellaFollower() &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_ISABELLA] == 0
                    )
                        this.flags[kFLAGS.ISABELLA_MURBLE_BLEH] = 1;
                    this.player.createStatusAffect(StatusAffects.NoMoreMarble, 0, 0, 0, 0);
                    // (every morning, the player goes to Marble for milk, since she is at the camp, it does not cost them the first hour of the day)
                    // if amily is there, tag it for freakout
                    if (
                        this.flags[kFLAGS.AMILY_FOLLOWER] > 0 &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0
                    ) {
                        this.flags[kFLAGS.MARBLE_OR_AMILY_FIRST_FOR_FREAKOUT] = 2;
                    } else this.flags[kFLAGS.MARBLE_OR_AMILY_FIRST_FOR_FREAKOUT] = 1;
                    // if Izma is there, tag for freakout!
                    if (
                        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1 &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0
                    ) {
                        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00237] = 1;
                    }
                }
            }
            // Marble didn't like you addicted
            else {
                // Replacement scene for when the player becomes addicted, Marble is ashamed, and her affection is low (<20)
                if (this.player.statusAffectv1(StatusAffects.Marble) < 30) {
                    // outx("At your words, Marble's face falls completely.  She looks up at you for a moment before saying \"<i>I'm so sorry; it's my fault for not being able to refuse you.</i>\"  You hesitate, not sure how to reply to her.  She sighs and invites you to her chest.\n\n", false);
                    // outx("As you're drinking from Marble's breasts, you hear her say \"<i>Don't you ever leave my side again, sweety.  I'll make it up to you for what happened.</i>\"  As she says this an odd feeling passes through you.  For a brief instant you panic as you realize that any thought not to do as Marble asks is vanishing from your mind.  Then it passes, and without any doubt, you will be staying with Marble for the rest of your life.  There will be no more adventuring for this year's champion.  \n\n", false);
                    this.outx(
                        'Marble grabs you and pulls your head into her chest.  "<i>I\'m so sorry sweetie, I never meant for this to happen,</i>" she sobs above you.  "<i>I\'ll make this right, I\'ll make sure nothing else ever hurts you, even if I have to make you stay here with me.</i>"  An alarm rings in your head; how are you supposed to complete your mission like this?  Marble feels you squirm, and speaks again.  "<i>I\'m sorry, [name], but if you need my milk, this is really the best way... for both of us.</i>"'
                    );
                    this.doNext(this.marbleBadEndFollowup);
                    return true;
                }
                // Affection < 80, type 2:
                else if (this.player.statusAffectv1(StatusAffects.Marble) < 80) {
                    this.outx(
                        "Marble's face falls at your words.  \"<i>I'm so sorry; it's my fault for not being able to refuse you.</i>\"  You shake your head and tell her it wasn't something either of you could stop.  Despite what you said before, what happened happened.  You two will just have to find a way to go on, regardless.  She nods and holds out her arms. You gladly move forward and accept her milk.  Once you've finished drinking, Marble looks at you and says, \"<i>I guess I'll see you tomorrow when you're thirsty again.</i>\"  You nod and return to your camp.\n",
                        false
                    );
                    // (Marble can be encountered at the farm)
                    // (every morning, the player goes to Marble for milk, it costs them the first hour of the day)
                }
                // Affection 80+, type 2:
                else {
                    this.outx(
                        "Marble's face falls at your words.  \"<i>I'm so sorry; it's my fault for not being able to refuse you.</i>\"  You shake your head and tell her it wasn't something either of you could stop.  Despite what you said before, what happened happened.  You care too much for her to let her feel bad about it, and you tell her you forgive her for the part she played in getting you addicted to her milk.  She bursts into tears and hugs you tightly to her breasts, before letting you drink your morning milk.  Afterwards she looks at you intently. \"<i>Can we do something special?</i>\" she asks you, suggestively.  You agree without having to give it any thought.\n\n",
                        false
                    );
                    // (player chose yes) do after addiction sex event
                    this.marbleAddictionSex(false);
                    this.outx("\n", false);
                    // (Marble now appears at the camp)
                    this.player.createStatusAffect(StatusAffects.CampMarble, 0, 0, 0, 0);
                    this.flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] = 0;
                    if (
                        kGAMECLASS.isabellaFollowerScene.isabellaFollower() &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_ISABELLA] == 0
                    )
                        this.flags[kFLAGS.ISABELLA_MURBLE_BLEH] = 1;
                    this.player.createStatusAffect(StatusAffects.NoMoreMarble, 0, 0, 0, 0);
                    // (every morning, the player goes to Marble for milk, since she is at the camp, it does not cost them the first hour of the day)
                    // if amily is there, tag it for freakout
                    if (
                        this.flags[kFLAGS.AMILY_FOLLOWER] > 0 &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0
                    ) {
                        this.flags[kFLAGS.MARBLE_OR_AMILY_FIRST_FOR_FREAKOUT] = 2;
                    } else this.flags[kFLAGS.MARBLE_OR_AMILY_FIRST_FOR_FREAKOUT] = 1;
                    // if Izma is there, tag for freakout!
                    if (
                        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1 &&
                        this.flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0
                    ) {
                        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00237] = 1;
                    }
                }
            }
            this.outx(
                "\n(You gain the <b>Marble's Milk</b> perk.  It boosts your strength and toughness, but requires that you drink Marble's Milk every day.)\n",
                false
            );
            this.doNext(this.playerMenu);
            return true;
        }
        if (
            this.checkedMarbleMilk++ == 0 &&
            this.model.time.hours == 6 &&
            this.player.findPerk(PerkLib.MarblesMilk) >= 0
        ) {
            // Marble is at camp
            if (this.player.findStatusAffect(StatusAffects.CampMarble) >= 0) {
                this.postAddictionCampMornings(false);
            }
            // Marble isn't at camp
            else {
                // Marble is still available at farm
                if (this.player.findStatusAffect(StatusAffects.NoMoreMarble) < 0) {
                    this.postAddictionFarmMornings();
                    kGAMECLASS.timeQ++; // We can get rid of this: threshhold--;
                }
            }
            this.doNext(this.playerMenu);
            return true;
        }
        return false;
    }
    // End of Interface Implementation

    public marbleFollower(): boolean {
        return this.player.findStatusAffect(StatusAffects.CampMarble) >= 0;
    }

    public marbleAtCamp(): boolean {
        if (this.marbleFollower()) {
            if (this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_2] > 0) return false;
            else return true;
        }
        return false;
    }

    // function marbleBreastSize() returns either DD, G, HH, or J depending on her current size.  If purification is not finished, returns HH if Marble's corruption is > 30, otherwise returns G.
    public marbleBreastSize(): string {
        if (this.flags[kFLAGS.MARBLE_PURIFIED] > 0) {
            if (this.flags[kFLAGS.MARBLE_BREAST_SIZE] == 0) return "DD cup";
            else if (this.flags[kFLAGS.MARBLE_BREAST_SIZE] == 1) return "G cup";
            else if (this.flags[kFLAGS.MARBLE_BREAST_SIZE] == 2) return "HH cup";
            else return "J cup";
        } else {
            if (this.player.statusAffectv4(StatusAffects.Marble) > 30) return "HH cup";
            else return "G cup";
        }
    }

    // Initial encounter (1 hour duration) - comes up in the barn volunteering to help milk:
    public encounterMarbleInitially(): void {
        this.spriteSelect(41);
        this.player.createStatusAffect(StatusAffects.Marble, 0, 0, 0, 40);
        this.outx(
            "While exploring at Whitney's farm, you run across the furry southern belle almost immediately.  She looks like she has a job for you.\n\n",
            true
        );
        this.outx(
            "Whitney tells you that one of her barn's residents, a cow-girl named Marble, is sore from overusing the milk machines.  She asks you to go and give the cow-girl a gentler touch from a living being.\n\n",
            false
        );
        // (description of barn may need to be edited, I don't know what it's supposed to look like)
        this.outx(
            "You walk in to Whitney's barn and head over to a series of small rooms for the cow-girls.  You find Marble's room and knock on the door. A friendly earthy female voice calls out in response and invites you in.  Inside is a rather pleasant little room.  There are several shelves on the walls and a small sitting table in the corner with seating for two.  A large portion of the room is dominated by a large bed, the owner filling most of it.  Lastly, you notice a mini-dresser next to the bed.  The room's owner looks over at you and starts, \"<i>Oh, I've never met you before.</i>\"\n\nAs she gets up, you are given a chance to get a good look at her.  She is over six feet tall, with long brown hair tipped with two cow horns and a pair of cow ears in place of normal human ones.  Rounding out her relatively unchanged face are a pair of deep, brown eyes.  She is wearing only a short plain skirt, so you get a full frontal view of her two HH-cup assets. They look rather sore right now, with big red circles around her puffy nipples.  Her hands and arms appear mostly human save for thick-looking nails.  A soft 'clop' brings your eyes down to see that she is covered in thick, dark blond fur going from at least mid-way down her thighs to where a human's feet normally would be, in place of which are hooves.  A cow tail with a bow tied on it swings between her legs.\n\n",
            false
        );
        // (if player height is under 5 feet)
        if (this.player.tallness < 60) {
            this.outx(
                "She looks down at you with a smile and says \"<i>Aww, you're so cute!  Did you come for my milk?  I'm always happy to give it, but since I'm kinda sore right now, you'll have to be gentle. Okay little one?</i>\"  She moves towards you and tries to pick you up.",
                false
            );
            // - player chooses resist or don't resist
            this.simpleChoices(
                "Let Her",
                this.marblePicksYouUpInitially,
                "Don't",
                this.resistMarbleInitially,
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
            '"<i>My name\'s Marble, what\'s yours?</i>" she asks you.  You introduce yourself and exchange a few pleasantries before she asks how she can help you.  You tell her that you actually came to help her, explaining that Whitney said she could use a gentle touch.  "<i>Oh that would be nice</i>", she says "<i>Spending the night connected to the milking machine was a mistake, and now I need something gentle.</i>"  How will you help her?',
            false
        );
        this.outx(
            "\n\n(Of course, you could always turn around and resolve to avoid her from this point on, if you wanted.)"
        );
        // - player chooses caress, suckle, or rape
        this.simpleChoices(
            "Caress",
            this.caressMarble,
            "Suckle",
            this.suckleMarble,
            "Rape",
            this.rapeDAHMARBLEZ,
            "",
            undefined,
            "Leave",
            this.turnOffMarbleForever
        );
    }

    private turnOffMarbleForever(): void {
        this.clearOutput();
        this.spriteSelect(41);
        // player.createStatusAffect(StatusAffects.No_More_Marble,0,0,0,0);
        this.flags[kFLAGS.MARBLE_WARNING] = 1;
        this.outx(
            'Considering the way the cow-girl lovingly cradles her hefty breasts as if they were the only things in the world, you decide you\'d rather not get involved with her right now.  You inform her politely that Whitney must have been mistaken - there\'s nothing you can think to do that would help.  "<i>Oh,</i>" she says, surprised... and also nonplussed when she sees your reaction to her swollen jugs.  "<i>Odd, but okay.  I guess I\'ll just lie back down then while you show yourself out.</i>"'
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Initial non-friends state (Z)
    public marbleWarningStateMeeting(): void {
        this.clearOutput();
        this.spriteSelect(41);
        this.outx(
            "While walking through one of the farm's fields, you notice the cow-girl Marble coming out of the barn ahead of you.  When she sees you, she pulls a bit of an irritated face before donning a fake smile and saying, \"<i>Yes?  Can I help you?  Or were you just leaving again?</i>\"  Well... that wasn't terribly nice.  The two of you didn't exactly get off to a good start before, but maybe you'd like to correct that?  On the other hand, she'll probably ask you to suckle her breasts if you do apologize; maybe it would be best to just avoid her for now - or perhaps entirely?  Then again also, you could pick a fight over her behavior towards you."
        );
        // PC chooses: apologize, pick a fight, leave, leave forevs
        this.simpleChoices(
            "Apologize",
            this.apologizetoWalkingTitsIMEANMARBLE,
            "Pick Fight",
            this.pickAFight,
            "Leave4Ever",
            this.pickAFight,
            "",
            undefined,
            "Leave",
            this.leaveNonFriendsMarble
        );
    }
    // Leave (Z)
    private leaveNonFriendsMarble(): void {
        this.clearOutput();
        this.spriteSelect(41);
        this.outx(
            "Smiling politely and just as insincerely as Marble, you beg her pardon and excuse yourself."
        );
        // end event, initial non-friends event can repeat in future explorations
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Leave forever (Z)
    private leaveNonFriendsMarble4EVERRRR(): void {
        this.clearOutput();
        this.spriteSelect(41);
        this.player.createStatusAffect(StatusAffects.NoMoreMarble, 0, 0, 0, 0);
        this.flags[kFLAGS.MARBLE_WARNING] = 2;
        this.outx(
            "Answering the cow-girl with a blank look, you shake your head and walk away, resolving to avoid Marble from now on."
        );
        // Marble is removed from the game
        // end event
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private apologizetoWalkingTitsIMEANMARBLE(): void {
        this.clearOutput();
        this.spriteSelect(41);
        this.outx(
            'Wanting to make up for before, you apologize for your behavior and ask Marble if there is a way you could make it up to her.  She\'s pleasantly surprised by your answer, and after a few moments of contemplation says, "<i>Well, all right then.  My breasts are still a bit sore - after all, I have to milk them every day - so do you think you could give them that personal touch?</i>"  You figured she would ask this of you... quite the one-track mind.'
        );
        this.outx(
            "\n\nMarble looks around before ducking inside the field of tall stalks of grain next to her.  After a moment, you follow her into the crops that are waving in the breeze.  Her trail through the many plants isn't that hard to follow, but from the sounds of the giggles up ahead, this has turned into a game."
        );
        // Basic scene
        this.outx(
            "You give chase after the bovine woman, wandering around the many plants in search of the runaway.  Her constant giggling makes sure you know you're going in the right direction, but sometimes she likes to double back or make false trails so the game is more interesting.  "
        );
        // [(intelligence check; <15, 15-40, 41+)
        if (this.player.inte < 15)
            this.outx(
                'Eventually you find Marble stopped, looking towards you with her hands in the air saying, "<i>You caught me!  Come here.</i>"  She beckons you towards her chest, and you don\'t make her wait.'
            );
        else if (this.player.inte < 40)
            this.outx(
                "Eventually you find Marble stopped and waiting for you.  She puts her hands in the air and says, \"<i>You caught me!</i>\"  It's fairly clear she's given herself up, but when she folds her hands in front of her chest and presses her breasts together, then tells you to come over, you aren't complaining."
            );
        else
            this.outx(
                `It isn't too hard to figure out that Marble isn't really trying, and you easily catch her off guard on one of her double backs.  She doesn't even notice you until you peek out from between the stalks next to her, reaching out and getting a handful of her backside.  "<i>Clever ${this.player.mf(
                    "boy",
                    "girl"
                )}...</i>" she says.`
            );
        this.outx(
            "\n\nMarble pulls you to the ground, and you fall onto the lovely lady's lap.  Before you can say anything, Marble shushes you with a finger to your lips.  She pulls up her top, stopping for a moment and winking at you when she reveals underboob, then lets her nipples slip out."
        );
        this.outx(
            '\n\n"<i>Care to have some of my bountiful breasts, you sweet thing?</i>" she says, smiling eagerly and presenting you with one of her half-inch long reddish nipples.  You notice that each nipple has a sore-looking swollen ring around it, probably the source of Marble\'s discomfort.'
        );
        this.outx(
            "\n\nYou knew she was going to get around to this, so you figure you might as well get it over with.  It's not like they're not really nice breasts, after all...  You lower your [face] to her nipple, and gently wrap your lips around it.  Marble sighs contentedly as you do so, and starts to groan slightly in pleasure as the first of the milk leaks from her teats.  You certainly can't argue with the taste, sweet and creamy, and start to down the delicious fluid with relish.  Marble doesn't seem to mind at all; in fact, the sounds of her pleasure only increase."
        );
        this.outx(
            "\n\nAfter several minutes, Marble puts her hand on your forehead, and gently asks you to take care of her other breast.  You don't disappoint her, and deeply draw milk from the other nipple with just as much vigor as before."
        );
        this.outx(
            "\n\nAfter another few minutes, you finally have drawn your fill, and pull back from Marble, as she looks down at you with a kindly and pleased face.  \"<i>Thank you so much for that, sweetie.  I can't possibly refuse your apology after that.  You're welcome to come and visit me here on the farm any time.</i>\"  The cow-girl gives you a peck on the check and redresses her bountiful bosoms - a small part of you is sad to see them go.  She helps you to stand up and walks you back to the main barn, then returns to her chores."
        );
        // increase addiction score by 10
        // set affection to 5
        this.marbleStatusChange(5, 10);
        this.flags[kFLAGS.MARBLE_WARNING] = 0;
        // (apply the stat effect 'Marble's Milk' to the player)
        this.applyMarblesMilk();
        this.dynStats("lib", 0.2, "lus", 5 + this.player.lib / 10);
        this.HPChange(100, false);
        this.fatigue(-50);
        // increase PC lust (5+ lib/10), health (100), and lib (0.2), reduce fatigue by (50)
        // end event
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Pick a Fight (Z)
    private pickAFight(): void {
        this.clearOutput();
        this.spriteSelect(41);
        this.outx(
            'You make known your displeasure at her attitude toward you.  "<i>So now I\'m the one who has a problem, huh?  That\'s very funny, I distinctly remember you being the jerk.  You get my hopes up, then just leave?</i>"  Oh, you\'ve nearly had it with this self-adoring boob fetishist, and say as much.  "<i>WHAT DID YOU CALL ME?!</i>" she screams in shock and anger.  You say it again, right to her face, and then she turns around, incensed, and stomps off quickly toward the barn.  "<i>Wait right there, my hammer\'s got something to say to that.</i>"'
        );
        // [Stay][Fuck That]
        this.simpleChoices(
            "Stay",
            this.stayForFights,
            "Fuck That",
            this.getOutOfDodge,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }
    // [Stay]
    private stayForFights(): void {
        this.clearOutput();
        this.spriteSelect(41);
        this.outx(
            "You fold your arms over your chest and scowl as Marble trudges back over the fields carrying a huge hammer.  Part of you feels terribly juvenile to be solving an argument with violence - but the other part is cheering at the opportunity to put the bossy cow in her place."
        );
        // go to battle
        this.startCombat(new Marble(), true);
    }

    // [Fuck That]
    private getOutOfDodge(): void {
        this.clearOutput();
        this.spriteSelect(41);
        this.outx(
            "The hell you will... the truth is the truth no matter how many talking hammers show up.  Catharsis completed, you leave the farm and its cows behind."
        );
        // makes the battle available as the next Marble encounter, as if PC had raped her
        this.flags[kFLAGS.MARBLE_WARNING] = 3;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // New After-Battle shiz: (Z)
    public marbleFightWin(): void {
        this.spriteSelect(41);
        this.outx("", true);
        // Win by hp
        if (this.monster.HP < 1)
            this.outx(
                "Marble falls to the ground defeated; she looks up at you helplessly, wondering what you're going to do next.  ",
                false
            );
        // win by lust
        else
            this.outx(
                "Marble collapses and looks at you longingly, pulling up her skirt with a look of desperation in her eyes.  ",
                false
            );
        // after the lust+HP defeat scenes if the player wins
        this.outx(
            "You've gathered a bit of a crowd around you now, thanks to the noise of this cow clunking around with her huge hooves and hammer.  It might not be a terribly good idea to rape Marble...  you'd have to drag her up to her room just to avoid interruption and Whitney would likely find out and be upset.  What do you do?"
        );
        // Options, rape in room, milk (Spy's submission - not included yet) and, don't rape.
        let feed;
        if (this.player.findPerk(PerkLib.Feeder) >= 0 || this.player.lactationQ() > 200)
            feed = this.forceFeedMarble;
        this.simpleChoices(
            "Feed Her",
            feed,
            "RapeInRoom",
            this.rapeMarbleInHerRoom,
            "",
            undefined,
            "",
            undefined,
            "Leave",
            this.cleanupAfterCombat
        );
    }
    public marbleFightLose(): void {
        this.spriteSelect(41);
        this.outx("", true);
        // lose by hp
        if (this.player.HP < 1)
            this.outx(
                "After a few too many blows to the head, you topple over to the ground.  ",
                false
            );
        // lose by lust
        else
            this.outx(
                "Overcome by desire, you fall to your knees, and start masturbating furiously.  Disgusted with you, Marble hits you upside the head once more, knocking you over.  ",
                false
            );
        this.outx(
            'She leans in close to your head and whispers "<i>Don\'t ever come near me again, or I will crush your head with this hammer.</i>"  She stands up and walks away from you as you pass out from your head injuries.  ',
            false
        );
        this.cleanupAfterCombat();
    }

    // Rape in room (Z)
    private rapeMarbleInHerRoom(): void {
        this.clearOutput();
        this.spriteSelect(41);
        this.outx(
            "You aren't going to give up on this opportunity, but you don't want to have an audience either.  So you drag Marble and her hammer back to her room, and throw Marble onto her bed, grabbing and twisting her nipples, causing her to cry out in pain and pleasure."
        );
        // continue onto original rape
        this.spriteSelect(41);
        this.outx(
            "  You suddenly grab at her breasts and squeeze them roughly, at which point she screams and ",
            false
        );
        this.outx(
            "tries to slap you.  You easily duck under her hand and start twisting her nipples.  She squeals and begins to go limp under your painful ministrations.  You move her around and force her to kneel, pushing her face down into her bed.  Keeping one of your hands on her nipple, you pull down her skirt and expose her beautiful womanhood and asshole.\n\n",
            false
        );
        // dicked players
        if (this.player.cocks.length > 0) {
            this.outx(
                `Chuckling to yourself, you free your ${this.multiCockDescriptLight()} from your ${
                    this.player.armorName
                }.  You spend a moment to ask the helpless cow-girl if she is ready, her only response being a whimper, before `
            );
            // If player's main dick is less than 3 inches wide, ie would fit inside Marble
            if (this.player.cocks[0].cockThickness < 3) {
                // how far in does the player go?
                if (this.player.cocks[0].cockLength <= 8) {
                    this.outx(`forcing your ${this.cockDescript(0)} in as far as it will go.  `);
                } else {
                    this.outx(`forcing your ${this.cockDescript(0)} in to the hilt.  `);
                }
                // the raping proper
                this.outx(
                    "With a grunt of pleasure, you start to push in and out while simultaneously manhandling her sensitive breasts.  Her pained cries and squeals only make you hornier and the experience all the more enjoyable for you.  You laugh from the pleasure you're getting at the expense of her pain.  Slapping her ass and marvelling at how it jiggles, you quicken the pace of your thrusts inside her.  Marble gasps at the increased rate, alternating between tones of pleasure and pain.\n\n",
                    false
                );
                // is the player corrupt enough to get the fantasy?
                if (this.player.cor >= 33) this.marbleRapeCorruptFantasy();
                this.outx(
                    "You taunt her one more time before feeling your body get racked by an orgasm and you blow your load inside her.  ",
                    false
                );
                // set player's lust to 0
                this.player.orgasm();
            }
            // now if the player doesn't fit
            else {
                this.outx(
                    `attempting to push your ${this.cockDescript(
                        0
                    )} inside her.  Of course, the girth of your ${this.cockDescript(
                        0
                    )} makes this a rather difficult operation, and it becomes clear after a few moments that it just isn't going to fit.  Instead, you contend yourself by rubbing yourself between her ample ass cheeks, occasionally stroking your ${this.multiCockDescriptLight()} in pride.\n\n`,
                    false
                );
                // is the player corrupt enough to get the fantasy?
                if (this.player.cor >= 33) this.marbleRapeCorruptFantasy();
                this.outx(
                    "You taunt her one more time before feeling your body get racked by an orgasm and you blow your load onto her ass.  ",
                    false
                );
                // set player's lust to 0
                this.player.orgasm();
            }
        }
        // dickless girls
        else if (this.player.vaginas.length > 0) {
            this.outx(
                "You take a quick look around the room to see if you can find something to make this more enjoyable, and notice a double dildo laying on the end table.  You grab the tool and push it into Marble's womanhood, causing a small gasp of pleasure from her that turns into one of pain as you twist one of her nipples.\n\n",
                false
            );
            this.outx(
                `Keeping Marble in place, you get your ${this.vaginaDescript(
                    0
                )} ready to take in the other end of the dildo before doing so with gusto.  Much to Marble's discomfort, you manipulate the dildo in ways to heighten your own pleasure but give Marble a less enjoyable experience.  You ask her if she likes it, to which she responds with a whine and an attempt to move into a more comfortable position.  You tighten your grip on her, and she freezes again.\n\n`,
                false
            );
            // is the player corrupt enough to get the fantasy?
            if (this.player.cor >= 33) this.marbleRapeCorruptFantasy();
            this.outx(
                "You taunt her one more time before feeling your body get racked by a satisfying orgasm from using Marble's own toy against her.  ",
                false
            );
            // set player's lust to 0
            this.player.orgasm();
        }
        // the genderless option
        else {
            this.outx(
                "Your lack of genitals makes it difficult to actually rape Marble, but there are other things you can do.  With your free hand, you push one of your fingers into her womanhood, causing Marble to squeal as you start wriggling it around.  Of course, that's just the beginning, as soon there are two fingers in there, and then three.  As each one goes in, there is another gasp from Marble.  You pinch her nipples as your fourth goes in, pulling out a rather interesting gasp of both pain and pleasure.\n\n",
                false
            );
            // is the player corrupt enough to get the fantasy?
            if (this.player.cor >= 33) this.marbleRapeCorruptFantasy();
            this.outx(
                "With just one more thing to do, you laugh at Marble before shoving your full fist inside her.  The act results in that familiar gasp of pain and pleasure.  Playing with her is indeed quite satisfying.  ",
                false
            );
            // Reduce player lust by 20
            this.dynStats("lus", -20);
        }
        // Pass several hours
        // Just before Marble hits the player with her hammer in original rape scene
        this.outx(
            "Satisfied, you pull back from the cow-girl's quivering body, and collect her hammer from the floor, informing her that you'll be taking it as compensation for the trouble she's caused you.  After dressing, you exit the barn."
        );
        if (this.flags[kFLAGS.FARM_CORRUPTION_STARTED] == 0) {
            this.outx(
                '\n\nA very angry looking Whitney is staring at you.  "<i>It seems I misjudged you, [name].  The fuck did you do to Marble?</i>"  Seems to be a rhetorical question; the knowledge and her reaction to it are already all over her face.  "<i>Don\'t you dare ever fucking come back here.  This place is a sanctuary from your kind, and I will kill to protect it.</i>"  You snort and leave the farm, keeping Marble\'s hammer.  You didn\'t like the place anyway.'
            );
        }

        this.flags[kFLAGS.FARM_DISABLED] = 1;

        // End event
        this.cleanupAfterCombat();
    }

    // Force-feed (by Spy) (Z)
    private forceFeedMarble(): void {
        this.clearOutput();
        this.spriteSelect(41);
        // [If player has Feeder perk]
        if (this.player.findPerk(PerkLib.Feeder) >= 0)
            this.outx(
                "You bet this cow-girl loves to get milked and nursed on just like you, but how often does she get to taste the creamy sweetness of milk?  Having her suck on your own leaky tits would be doing her a favor, right?  You approach the defeated cow-girl; her eyes are still locked onto you, wondering what you're going to do next.  Well, not that you can do much with this crowd watching you...\n\n"
            );
        this.outx(
            "You never really noticed how many people live on this farm until now.  They're all probably expecting you to rape her - and not all of them are reconciled to the idea, judging by the looks you're getting.  What the hell, you might as well continue your business with these on-lookers around anyway... you're like 99% sure you won't be in trouble for feeding a cow."
        );
        this.outx(
            "\n\nYou remove the top half of your [armor], showing everyone your [chest]; a few cat calls and wolf whistles come from your spectators.  You do your best to ignore them... right now your world is just you and Marble.  You kneel down next to the cow-girl and sit her up, lifting her head up to your chest."
        );
        // [If player has B-cup or less]
        if (this.player.biggestTitSize() <= 2)
            this.outx("\n\nYou push her soft lips against your nipple");
        else
            this.outx("\n\nYou lift your nipple up to her mouth and push it against her soft lips");
        this.outx(", but she keeps them tightly closed, refusing to drink your sweet milk.");
        this.outx(
            "\n\n\"<i>Come on, sweetie; you'll never grow big and strong if you don't drink your milk,</i>\" you tease."
        );
        this.outx(
            "\n\nYour jab at her pride causes her to let out an angry noise, and this slight opening of her lips allows you to slip your milky nip into her mouth and squeeze a few squirts inside.  She doesn't swallow the milk, instead letting the warm liquid pool up as her cheeks expand with it."
        );
        this.outx('\n\n"<i>Don\'t be a child, Marble,</i>" you say.  "<i>Drink! Your! MILK!</i>"');
        this.outx(
            "\n\nAt this last word, you cruelly grab and squeeze one of her own breasts, causing her to gasp and down your milk while wetting her blouse with her own."
        );
        this.outx(
            '\n\n"<i>Oh my, look at the mess you\'re making.  Here, let me help you with that.</i>"'
        );
        this.outx(
            "\n\nYou reach down into Marble's blouse and pull free both her glistening wet HH-cups for all to see.  Another round of catcalls and wolf whistles comes from the mob."
        );
        this.outx(
            '\n\n"<i>There, now I can squeeze these big milky boobs of yours all I want and not make that much of a mess.</i>"'
        );
        this.outx(
            "\n\nYou know there's still going to be a mess whether Marble is fully dressed or butt-ass naked, but not showing your audience these big, delicious tits would be bad showmanship, right?  As for your own needs, another few streams of your milk have pooled in Marble's mouth.  You squeeze her again, forcing her milk to trickle through your fingers, soaking your hand and the length of your arm with the stuff, but she bears these assaults with her eyes closed in determination.  Apparently you're not going to get anywhere with brutal groping, so you stop squeezing her milky jug and start playing with the sensitive, swollen nipple.  Her eyes fly open as surprise writes itself across her features."
        );
        this.outx(
            '\n\n"<i>I know how it feels to be milked, Marble, so I\'m gonna stop... until you start nursing like a good girl.  After all, it only seems fair.</i>"  You playfully tug and twist her little milk bud again, prompting her to moan into your breast.'
        );
        this.outx(
            "\n\nLooks like you successfully put Marble in a tough place, giving her the cow-girl equivalent of blue balls. Her eyes look around, trying to look for anything to help her decide what to do next.  Finally she lets out a muffled sigh, closes her eyes and swallows her pride - along with your milk.  Her nursing is slow, soothing and a bit pleasurable.  This cow definitely has the technique to suck a teat.  Her lips lock around the nipple as her tongue laps over and around it, prompting streams of your warm milk to go down her throat.  Her determined face has softened into that of a peaceful sleeper, and she's completely docile as you pop one nipple out and the other in, as if she were regressing to the mental state of an infant."
        );
        this.outx(
            "\n\nShe's keeping her end of the bargain, so you might as well give her jugs a very thorough hand-milking.  You grab her soft teat and begin to squeeze and pull at it, forcing muffled moans and groans out of her as powerful jets of her milk shoot from her chest - giving you an idea.  As you expertly aim streams down the field, various members of the crowd let out a few words of admiration as they catch onto what you're doing.  Trails of milk meet and mingle as you squirt Marble's nipple onto the dry, packed soil... spelling out, in irregular, runny letters, \"<i>[name]</i>\".  You keep up the rough milking, adding doodles and embellishes, until her breast milk runs low and her tit has shrunk by at least two cup sizes.  If she were to stand up right now, she would be comically lopsided.  It's as funny an idea as you've heard yet."
        );
        this.outx(
            '\n\nShe relaxes her mouth as she feels the tugging stop, and gradually returns to awareness.  "<i>Wh- Hey!  You have to do the other breast!</i>"'
        );
        this.outx(
            '\n\n"<i>I\'m sorry,</i>" you say, cupping your still-half-full tits, "<i>but bad girls who don\'t drink all their milk should be punished.</i>"  She can only look at you, wide-eyed and trembling with rage, as you pull away - and yet, even her trembles are funny, with one tit wobbling wildly and the other hardly moving at all.'
        );
        this.outx(
            "\n\nThe crowd that had gathered around slowly dissolves, leery of this turn of events and the mad cow-girl, and soon only visibly 'excited' observers are left.  Her tits wobble again as she tries to stand up, then begin to inflate.  The drained one balloons, increasing to full size again as her bovine body refills her milk reserve, while the other jiggles and swells only a little, growing to a small HHH-cup and setting the nipple to dribbling, simply unable to fit any more fluid inside.  As she rubs her sorely stretched and manhandled breasts, you pick up Marble's hammer and leave; maybe you'll give it back to her if you ever see her again... and she can beat you in a fight.  You doubt either will ever happen.  Whitney catches your eye and gives you a disapproving, angry, and almost forceful glare as you walk away toting the cow-girl's weapon, leaving you feeling like you were just slapped.  Oh well... as long as you don't remind her, it'll probably blow over, right?"
        );
        // no more marble
        this.player.createStatusAffect(StatusAffects.NoMoreMarble, 0, 0, 0, 0);
        // gain Marbl Hammer, satisfy feeder
        // You've now been milked, reset the timer for that
        this.player.addStatusValue(StatusAffects.Feeder, 1, 1);
        this.player.changeStatusValue(StatusAffects.Feeder, 2, 0);
        this.cleanupAfterCombat();
    }

    private resistMarbleInitially(): void {
        this.spriteSelect(41);
        // (player chose resist)
        this.outx("", true);
        this.outx(
            "Surprised by your resistance, she pulls back and apologizes for being presumptuous.  ",
            false
        );
        // - continue to the next part
        this.outx(
            '"<i>My name\'s Marble, what\'s yours?</i>" she asks you.  You introduce yourself and exchange a few pleasantries before she asks how she can help you.  You tell her that you actually came to help her, explaining that Whitney said she could use a gentle touch.  "<i>Oh that would be nice</i>", she says "<i>Spending the night connected to the milking machine was a mistake, and now I need something gentle.</i>"  How will you help her?',
            false
        );
        // - player chooses caress, suckle, or rape
        this.simpleChoices(
            "Caress",
            this.caressMarble,
            "Suckle",
            this.suckleMarble,
            "Rape",
            this.rapeDAHMARBLEZ,
            "",
            undefined,
            "",
            undefined
        );
    }

    private marblePicksYouUpInitially(): void {
        this.spriteSelect(41);
        // (player chose don't resist)
        this.outx("", true);
        this.outx(
            "She gently lifts you up and carries you over to her bed. Laying you down on her lap, she lifts your head to one of her nipples and pushes your lips against it.  She smiles and holds you there firmly as you feel a warm and delicious fluid start to fill your mouth.  Once you've had a taste of her milk, you can't help yourself and eagerly start to gulp it down.  After a little while you hear Marble sigh, \"<i>Oh sweetie, that's just what I needed.  I know it's annoying to stop for a moment, but could you do the other teat too?</i>\"  She pulls her hand back and flips you around on her lap before lifting you to her other nipple.  You don't need any encouragement this time, and start drinking eagerly without hesitation.  \"<i>Drink your fill sweetie, I know we're both enjoying this.</i>\"\n\n",
            false
        );
        // new paragraph
        this.outx(
            "Once you'd had enough, you take your mouth off her teat and lean against her chest.  Marble puts her hands around you and ",
            false
        );
        if (this.player.earType > EARS_HUMAN) this.outx("gently scratches behind your ears.  ");
        else this.outx("lightly caresses your head.  ");
        this.outx(
            '"<i>Thanks for your gentle mouth, sweetie,</i>"  she says, "<i>Do you think you could tell me your name?  I\'m Marble.</i>"  You let out a soft sigh and tell her who you are and why you came to visit.  She giggles, "<i>Don\'t worry sweetie, I feel much better now thanks to you.  I\'m really glad I got to meet you in such a pleasant way.</i>"  You decide that it is probably time to leave now and say your farewells to this cow-girl.  "<i>Come back to visit me anytime; I\'ll look forward to seeing you again soon!</i>" she says beaming at you.  With that, you leave the farm, feeling a strange sense of euphoria passing over you.',
            false
        );
        // (increase affection by 30)
        // (increase addiction by 10)
        this.marbleStatusChange(30, 10);
        // (apply the stat effect 'Marble's Milk' to the player)
        this.applyMarblesMilk();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // (player chose caress)
    private caressMarble(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            'You offer to gently rub her breasts, saying it should be a lot less painful than the milking machine\'s sucking.  "<i>Oh no,</i>" she retorts, "<i>nothing is more wonderful than being sucked, but right now I guess I could use a break and get a good rub.</i>"  You move around behind her and reach up under her arms, firmly grasping her breasts.  She gasps sharply at first, but as you start to gently massage and caress them, she lets out a sigh and starts breathing deeply.  You begin to feel milk leaking out onto your hands as you rub her.  "<i>This is nice,</i>" she says, "<i>not as good as being suckled, but nice.</i>"  After a few minutes of gently massaging her breasts, she pulls your hands off of them and turns to you. "<i>Thanks,</i>" she says, "<i>I\'m still a little sore, but thank you for your touch, sweetie.  Feel free to come back later; I\'ll be happy to visit with you any time.</i>"  Just before you leave, you notice that Marble is rubbing her breasts the same way you were, a slight smile on her face.',
            false
        );
        this.dynStats("lus", 15);
        this.marbleStatusChange(5, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // (player chose suckle)
    private suckleMarble(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            'You suggest that you could gently suckle her breasts to make her feel better.  "<i>That sounds wonderful!</i>" she exclaims cheerfully, putting her hands under her ample mounds.  "<i>There is nothing I love more than giving milk to living things.</i>"  ',
            false
        );
        // [if player is under 5 feet tall]
        if (this.player.tallness < 60)
            this.outx(
                "Realizing you might have trouble reaching her breasts, you grab one of the chairs from the table.  ",
                false
            );
        this.outx(
            'You walk over to her and lean in to suck from her nipple.  Your mouth is soon filled with a delicious warm fluid, and you eagerly begin to gulp it down.  As you drink, you can hear Marble sighing softly above you. "<i>Thank you, sweetie.  Could you put your mouth on the other teat too?</i>"  She says after a few minutes. You eagerly comply, and just like before, the fluid fills your mouth. Her milk is easily the most delicious thing you\'ve ever drunk, and not only that, drinking it from her breast just feels so right.  You hear Marble sigh again, but this time it turns into a moan.  Once you\'d had enough, you slowly pull back. You feel very satisfied with your drink, and you can see that Marble is quite satisfied too.  She smiles at you and says "<i>That was wonderful. You\'re welcome to come and visit any time.</i>"  With that, the two of you part company. You feel an odd euphoria as you walk away from the barn.',
            false
        );
        // (increase affection by 15)
        // (increase addiction by 10)
        this.marbleStatusChange(15, 10);
        // (apply the stat effect 'Marble's Milk' to the player)
        this.applyMarblesMilk();
        this.dynStats("lus", 25);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // (player chose rape)
    private rapeMarble(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You decide that rather than helping her, you are going to roughly manhandle her breasts and rape her.  You suddenly grab at her breasts and squeeze them roughly, at which point she screams and slaps you.  While you are still reeling from the blow, she uses a surprising amount of strength to force you out the door.  She slams it behind you and yells, \"<i>Don't you ever come back!</i>\" through the door. You hear her start to cry as you walk away.  Aw well, you didn't like her anyway.",
            true
        );
        // -player never encounters Marble again
        this.player.createStatusAffect(StatusAffects.NoMoreMarble, 0, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Pre-addiction events(explore events take 1 hour, working ones take 3)
    // Meet Marble while exploring version 1 (can occur anytime before the player becomes addicted):
    public encounterMarbleExploring(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "While wandering around the farm, you meet the cow-girl Marble heading towards the barn.  ",
            false
        );
        // [player height < 5 feet]
        if (this.player.tallness < 60)
            this.outx(
                "Marble gives her customary greeting of hugging you to her breast before telling you that she is off to get milked at the barn.  ",
                false
            );
        // [player hight >= 5 feet]
        else
            this.outx(
                "You exchange a quick greeting before Marble tells you that she is off to get milked at the barn.  ",
                false
            );
        // [affection <30]
        if (this.player.statusAffectv1(StatusAffects.Marble) < 30) {
            this.outx(
                "\n\nIt seems that she is looking forward to it and doesn't want to put it off to talk.  She hurries off and you're left to look around some more.  <b>Maybe if you got her to like you a little more while doing some work around the farm?</b>",
                false
            );
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        // [affection >=30]
        else {
            this.outx(
                '\n\n"<i>But, since you\'re here, maybe you could suckle me yourself?</i>" she asks smiling.\n\n',
                false
            );
            // [if addiction is under 40]
            if (this.player.statusAffectv2(StatusAffects.Marble) < 40) {
                this.outx("\n\nDo you drink her milk?");
                this.doYesNo(this.drinkMarbleMilk, this.playerRefusesMarbleMilk);
                // player chooses yes/no
            }
            // [if addiction is 40 or over]
            else {
                this.outx("\n\nYou really want some of that milk and eagerly agree.\n\n", false);
                this.doNext(this.drinkMarbleMilk);
            }
        }
    }

    // (player chooses yes)
    private drinkMarbleMilk(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "Beaming, Marble leads you back to her room and sits down on the bed.  She invites you onto her lap and lets you start sucking at one of her nipples.  The moment that wonderful taste meets your tongue, you start gulping down the milk with reckless abandon. She sighs in pleasure in response.  From time to time, Marble gets you to switch nipples, all the while gently stroking your head",
            false
        );
        // [player has animal ears]
        if (this.player.earType > EARS_HUMAN)
            this.outx(" and occasionally scratching behind your ears");
        this.outx(".  ");
        this.outx(
            "Once you've had your fill, you pull back and the two of you smile at each other.  \"<i>It's really nice for you isn't it sweetie?  Nice for me too to have someone like you that can give a good suck on my itching nipples.</i>\"\n\n",
            false
        );
        // (first increase addiction by 10,
        this.marbleStatusChange(0, 10);
        // if addiction is now over 50, skip straight to addiction event without doing anything else)
        if (this.player.statusAffectv2(StatusAffects.Marble) >= 50) {
            this.marbleAddiction(false);
            // (increase affection by 5)
            this.marbleStatusChange(8, 0);
            this.applyMarblesMilk();
            return;
        }
        // (increase affection by 5)
        this.marbleStatusChange(5, 0);
        // (apply Marble's Milk status effect)
        this.applyMarblesMilk();
        this.HPChange(10, false);
        this.fatigue(-20);
        // (increase player lust by a 20 and libido, if player lust is over a threshold like 60, trigger milk sex scene)
        this.dynStats("lib", 1, "lus", 20);
        if (this.player.lust > 60) {
            this.marbleMilkSex(false);
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // [if addiction is under 50]
        if (this.player.statusAffectv2(StatusAffects.Marble) < 50)
            this.outx(
                "After drinking Marble's milk, a feeling of euphoria spreads through you as you leave the farm in high spirits.",
                false
            );
        this.applyMarblesMilk();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // (player chooses no)
    private playerRefusesMarbleMilk(): void {
        this.spriteSelect(41);
        this.outx(
            "\n\nTaken aback by your refusal, she gives an annoyed hurumph before continuing on her way to the barn. You shake your head and return to your explorations.",
            false
        );
        // - either do another explore event, or end event
        // (reduce affection by 5)
        // (reduce addiction by 5)
        this.marbleStatusChange(-5, -5);
        this.dynStats("lus", -10);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Meet Marble while exploring version 2 (can occur anytime before the player becomes addicted):
    public encounterMarbleExploring2(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx("You decide to pay Marble a visit at her room.  ");
        // [player height <5]
        if (this.player.tallness < 60)
            this.outx(
                'As you step into her room, she eagerly rushes over and hugs you to her breast. "<i>You\'re as cute as ever, sweetie!</i>"  ',
                false
            );
        this.outx(
            "She is happy to see you and treats you to a small meal while you have a pleasant chat.  "
        );
        if (this.flags[kFLAGS.MURBLE_FARM_TALK_LEVELS] < 7) {
            this.extendedMurbelFarmTalkz();
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        } else
            this.outx(
                "While you talk mostly about unimportant things, there is some discussion about the world and the dangers within."
            );
        // [addiction >30]
        if (this.player.statusAffectv2(StatusAffects.Marble) > 30) {
            this.outx(
                "\n\nThe entire time you spend talking, you find yourself oddly attracted to Marble's scent, especially when you get an odd whiff of her milk.  ",
                false
            );
            this.dynStats("lus", 10);
        }
        // [affection <60]
        if (this.player.statusAffectv1(StatusAffects.Marble) < 60) {
            this.outx(
                "\n\nAfter the pleasant interlude to your quest, you bid farewell to the pretty cow-girl and return to your camp.",
                false
            );
            // (increase affection by 3)
            this.marbleStatusChange(1, 0);
            // (increase player inte)
            if (this.player.inte < 30) this.dynStats("int", 4);
            else if (this.player.inte < 40) this.dynStats("int", 2);
            else if (this.player.inte < 60) this.dynStats("int", 1);
            this.doNext(this.camp.returnToCampUseOneHour);
        } else {
            // [affection >=60, player has not had sex with Marble]
            if (this.player.findStatusAffect(StatusAffects.FuckedMarble) < 0) {
                this.outx(
                    '\n\nAs the two of you finish chatting, Marble gives you an intense look.  "<i>You know that I really like you right, sweetie?  I\'d like it if I can do something special with you,</i>" she hesitates for a moment, "<i>Will you come to my bed?</i>"\n\nDo you accept her invitation?',
                    false
                );
                this.dynStats("lus", 10);
                this.doYesNo(this.AcceptMarblesSexualAdvances, this.turnDownMarbleSexFirstTime);
            }
            // [affection >=60, player has had sex with Marble]
            else {
                this.outx(
                    '\n\nAfter you finish talking, Marble gives you another intense look.  "<i>Sweetie, will you come into my bed again?</i>" You can feel a tingle in your groin at the thought of having sex with her again.\n\nDo you accept her invitation?',
                    false
                );
                // player chooses yes/no
                this.dynStats("lus", 10);
                this.doYesNo(this.AcceptMarblesSexualAdvances, this.turnDownMarbleSexRepeat);
            }
        }
    }

    // (player chose no, player has not had sex with Marble)
    private turnDownMarbleSexFirstTime(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "She stares at you for a few moments as your refusal sinks in.  \"<i>So you don't feel the same way about me...  I'm sorry, I won't ever ask you again,</i>\" she says sadly.  \"<i>Maybe I'll see you later.</i>\" She directs you out the door.  You realize that refusing her will permanently affect your relationship.",
            false
        );
        // (affection drops to 50, it can no longer be raised above 50)
        this.player.changeStatusValue(StatusAffects.Marble, 1, 50);
        // (increase player inte)
        this.dynStats("int", 4);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // (player chose no, player has had sex with Marble)
    private turnDownMarbleSexRepeat(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            'She looks disappointed at your refusal but quickly brightens up and says, "<i>Ok sweetie, next time then.</i>" On that note, you bid farewell to the pretty cow-girl and return to your camp.',
            false
        );
        // (affection is unchanged)
        // (increase player inte)
        this.dynStats("int", 1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // (player chose yes)
    private AcceptMarblesSexualAdvances(): void {
        this.spriteSelect(41);
        // Standard sex (See sex section)
        this.standardSex(true);
        if (this.player.findStatusAffect(StatusAffects.FuckedMarble) < 0)
            this.player.createStatusAffect(StatusAffects.FuckedMarble, 0, 0, 0, 0);
        // (increase affection by 10)
        this.marbleStatusChange(10, 0);
        // (increase player inte)
        this.dynStats("int", 1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Help out Marble, version 1 (can occur anytime before the player becomes addicted):
    public helpMarble1(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            '"<i>You know, Marble is moving some produce right now. How about you go help her out?</i>" Whitney suggests.  You agree to help the well-endowed anthropomorph and Whitney directs you to the storage shed.  You arrive to find that Marble is quite busy carrying stacks of crates into the barn.  She gives you a smile when she sees you and calls out, "<i>Hey, sweetie!  Nice to see you.</i>"  When you tell her you came to help her smile broadens.  "<i>Oh, I\'d love to have some help.  It\'ll save me some trips if you give me a hand,</i>" she says happily before putting on a serious face and continuing, "<i>but don\'t strain yourself sweetie, these are heavy. I don\'t want you to get hurt.</i>"  With that, you get to work with her.\n\n',
            false
        );
        // [player str <20]
        if (this.player.str < 20)
            this.outx(
                "Unfortunately, the crates are quite heavy and you end up having to stick with small ones to keep up with Marble's pace.  She doesn't appear to mind, just enjoying having someone to talk to while she works, even if it doesn't save her many trips.\n\n",
                false
            );
        // [player str >=20, <50]
        if (this.player.str >= 20 && this.player.str < 50)
            this.outx(
                "You try your best, but for every crate you carry, Marble caries three. She doesn't mind though, since you'll end up saving her a quarter of the trips she would have had to make.\n\n",
                false
            );
        // [player str >=50, <80]
        if (this.player.str >= 50 && this.player.str < 80)
            this.outx(
                "You put your back into the job and manage to match Marble in her efforts.  She is really impressed with your strength, and together you can cut the number of trips needed in half.\n\n",
                false
            );
        // [player str >=80]
        if (this.player.str >= 80)
            this.outx(
                "Marble may be strong, but you are stronger.  She is amazed as you manage to take even more crates at a time than she can, only held back by the number you can balance.  Thanks to your efforts, the chore only takes a third of the number of trips it normally would have taken.\n\n",
                false
            );
        this.outx(
            "After a little while, you notice that Marble is walking with an almost mesmerizing sway in her hips as she carries the crates; it is rather hard to take your eyes off her.  ",
            false
        );
        if (this.afterMarbleHelp()) return;
        this.outx(
            'When the two of you finish and you start to leave, Marble calls out to you, "<i>Wait, let me give you something!</i>" You turn and look back at her as she rushes up to you.  Smiling brilliantly, the cow-girl hands you a bottle full of warm milk, "<i>My gift to you for your help, fresh from the source.</i>" she says, patting her sizable chest.\n\n',
            false
        );
        // (increase player str)
        this.dynStats("str", 1);
        // (increase affection by one tenth the player's str)
        this.marbleStatusChange(Math.floor(this.player.str / 10), 0);
        // (increase player lust)
        this.dynStats("lus", 10);
        // (player receives a bottle of Marble's milk)
        this.inventory.takeItem(this.consumables.M__MILK, this.camp.returnToCampUseOneHour);
    }

    // Help out Marble, version 2 (can occur anytime before Marble knows about her milk):
    public helpMarble2(): void {
        this.spriteSelect(41);
        this.outx(
            "You run into Whitney at the farm, and ask if there's something you could do.\n\n",
            true
        );
        this.outx(
            '"<i>I\'ve got it; you can help Marble do some weeding.  She\'s in the field over there right now,</i>" Whitney says, pointing to a nearby pasture.  Nodding to her, you set off to help the pretty cow-girl with her chores.  It takes you a while to find her, but you eventually find Marble bent over with her rump in the air.  Once you get closer you realize that she is munching on a weed.  "<i>Oh!</i>" she exclaims, noticing you.  She hurriedly straightens up and looks around a little embarrassed.  "<i>Hi there sweetie, what are you doing here?</i>"  You explain that Whitney suggested you could help her with the weeding.  "<i>Oh!</i>" she exclaims again, "<i>I guess that would be nice, but don\'t stare at my bum too much while I\'m eating, ok?</i>"  You agree and set to work.\n\n',
            false
        );
        // [player spd <20]
        if (this.player.spe < 20)
            this.outx(
                "Even though Marble often stops to munch on a weed, she is still able to get more weeds then you do.  Despite her size, she can move surprisingly fast.  Regardless, she enjoys simply having you there while she works, and you get to enjoy the view.\n\n",
                false
            );
        // [player spd >=20, <50]
        if (this.player.spe >= 20 && this.player.spe < 50)
            this.outx(
                "You put in a good effort at cleaning out the weeds, and Marble often gives you a good look at her rear when she finds a tasty looking weed.\n\n",
                false
            );
        // [player spd >=50, <80]
        if (this.player.spe >= 50 && this.player.spe < 80)
            this.outx(
                "Moving quickly through the fields, you surprise Marble with your speed so much that she jokingly pouts that you're getting to all the tasty weeds before she has a chance to eat them.  You still end up getting a few good views of her ass.\n\n",
                false
            );
        // [player spd >=80]
        if (this.player.spe >= 80)
            this.outx(
                "Weeding the field is a breeze for you, going fast enough that you're able to bring weeds to Marble faster than she can eat them.  In the end, you do almost all the work yourself.  She does reward you with a good view for your efforts.\n\n",
                false
            );
        // (increase player spd)
        this.dynStats("spe", 1.5);
        // (increase affection by one tenth the player's spd)
        this.marbleStatusChange(Math.floor(this.player.spe / 10), 0);
        // (increase player lust)
        this.dynStats("lus", 10);
        if (this.afterMarbleHelp()) return;
        this.outx(
            'When the two of you finish and you start to leave, Marble calls out to you, "<i>Wait, let me give you something!</i>" You turn and look back at her as she rushes up to you.  Smiling brilliantly, the cow-girl hands you a bottle full of warm milk, "<i>My gift to you for your help, fresh from the source,</i>" she says, patting her sizable chest.\n\n',
            false
        );
        // (player receives a bottle of Marble's milk)
        this.inventory.takeItem(this.consumables.M__MILK, this.camp.returnToCampUseOneHour);
    }

    // After both helping Marble work events:
    private afterMarbleHelp(): boolean {
        this.spriteSelect(41);
        // This occurs after the start text, but before Marble gives the player a bottle of her milk.  I wanted to make sure there is a chance the player can get addicted whenever they go to the farm.
        // (if the player has 40+ addiction after helping Marble work, roll an int check)
        if (this.player.statusAffectv2(StatusAffects.Marble) >= 40) {
            // [the player fails the int check]
            if (this.player.inte < 40 && MarbleScene.rand(2) == 0) {
                this.outx(
                    'You find that the more time you spend being around Marble, the thirstier you grow for her milk.  Finally, as the two of you are finishing, you are unable to take it any longer and beg Marble to let you drink her milk.  After a moment, your words sink in and she blushes deeply.  "<i>Ok sweetie, since you helped me out and all, let\'s go back to my room.</i>"  You enter into her pleasant room once again.  She invites you onto her lap and lets you start sucking at one of her nipples.  The moment that wonderful taste meets your tongue, you start gulping down the milk without abandon. She sighs in pleasure in response.  From time to time, Marble gets you to switch nipples, all the while gently stroking your head and occasionally scratching behind your ears.\n\n',
                    false
                );
                this.outx(
                    "Once you've had your fill, you pull back and the two of you smile at each other.  \"<i>It's really nice for you isn't it sweetie?  Nice for me too to have someone like you that can give a good suck on my sensitive nipples.</i>\"\n\n",
                    false
                );
                // (increase addiction by 10, skip straight to addiction event without doing anything else)
                this.marbleStatusChange(0, 10);
                // Call addiction event here?
                this.marbleAddiction(false);
                return true;
            }
            // [player succeeds the int check]
            else {
                this.outx(
                    "While you're working, you are continually plagued by the thought of drinking from Marble's breasts, but you're able to keep those thoughts at bay and continue working normally.\n\n",
                    false
                );
            }
        }
        return false;
    }

    // Addiction Event (takes 2 additional hours after the trigger event):
    private marbleAddiction(newPage: boolean): void {
        this.spriteSelect(41);
        // [start a new page]
        if (newPage) this.outx("", true);
        this.outx(
            "You lean against her chest and breathe in her smell.  You feel oddly at peace with yourself and fall asleep, still buried in her bust.  You wake up a while later and notice the two of you are now lying down on her bed, Marble absentmindedly stroking your head.  She notices you stirring and giggles, \"<i>Good morning, sleepyhead. That's the first time I've ever had someone fall asleep while drinking my special milk.  Did you enjoy it?</i>\"  At the mention of her milk, you suddenly feel like you want more of it. In fact, you really want more.  You start to shake as you turn around, overwhelmed by you need for more, and beg Marble to let you drink more of her milk.  She is surprised at your need, but agrees to let you drink.  As her milk rushes into your mouth, you feel your body calm down as the feeling of euphoria once again passes over your body.  An alarming thought enters your head and your eyes go wide. You hear Marble gasp above you as she comes to the same realization that you just did.\n\n",
            false
        );
        // (bold text)
        this.outx("<b>Marble's milk is addictive, and you are now addicted to it.</b>\n\n", false);
        this.outx(
            'You pull back from her and look up into her eyes.  "<i>Sweetie, how are you feeling?  Do you like drinking my milk?  Do you want to always drink my milk?</i>" she says to you with uncertainty.  How do you reply?\n\n',
            false
        );
        this.doYesNo(this.wantMarbleAddiction, this.doNotWantMarbleAddiction);
    }

    // (player chose want)
    private wantMarbleAddiction(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You smile and tell her that her milk is the most wonderful thing you've ever had. You'll always want to drink it and do not care if it's addictive.  She gives a small smile before softly saying, \"<i>Are you sure, sweetie?</i>\"  You nod eagerly and try to continue drinking... but you can't bring yourself to do it.  You really want to drink from her, but your body doesn't seem to let you.  \"<i>What's wrong, sweetie?</i>\" she asks, confused at your hesitation, \"<i>I thought you wanted to drink my milk?</i>\"  You explain to her that you're trying, but you just can't bring yourself to.  \"<i>I'm not stopping you sweetie, go ahead.</i>\"  As if a floodgate had been opened, you rush forward and start guzzling down her breast milk once again.  After you've finished, you pull back and look up at Marble. She takes a moment to think before saying slowly, \"<i>So you can't drink without my permission?</i>\"  She smiles down at you, though you can't help but feel a little uncomfortable at this apparent power she has over you.  You decide to excuse yourself and get up.  As you go to the door, Marble calls out to you, \"<i>Sweetie, just come back whenever you get thirsty ok?  I'm looking forward to seeing how you are.</i>\"  She giggles softly as you go out the door, leaving you to wonder if you just made a big mistake.",
            false
        );
        // (increase affection by 5)
        // (set knowAddiction to 1)
        this.marbleStatusChange(5, 0, 1);
        // (increase corr by 5)
        this.dynStats("cor", 5);
        // (apply Marble's Milk effect to the player)
        this.applyMarblesMilk();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // (player chose don't want)
    private doNotWantMarbleAddiction(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You tell her that you've realized that her milk is addictive and you can't afford to depend on it.  Tears well up in her eyes and she breaks down. \"<i>I'm so sorry, I didn't know!</i>\" she says between sobs, \"<i>I guess I'm just another wretched creature of this world.  I thought I was special, but it looks like I'm corrupt too...</i>\"  She suddenly reaches out and hugs your head tightly to her chest as she rocks back and forth.  After a few minutes she holds you out and looks into your eyes. \"<i>Please forgive me!</i>\" she says before jumping off her bed and running out the door.  You spend some time looking around the farm for Marble, but you're unable to find her.  You tell Whitney what happened, and she promises that as soon as she knows where Marble went, you'll be the first to know.",
            false
        );
        // (increase affection by 5)
        // (set knowAddiction to 2)
        this.marbleStatusChange(5, 0, 2);
        // (increase corr by 5)
        this.dynStats("cor", 5);
        // (apply Marble's Milk effect to the player)
        this.applyMarblesMilk();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Once Addicted:
    // From now on, the first set of events do not happen, a new set of events to reflect the player's state are used instead.  Also, if the player is suffering from withdrawal when they go to the farm, one of these events is forced.  The player may not do regular farm events while suffering withdrawal.  Drinking from Marble's breast also increases corruption (it was a corrupting thing to do; it was just really subtle about it before now).

    // [player goes to the farm while suffering from withdrawal]
    private withdrawlFarmVisit(): void {
        this.spriteSelect(41);
        this.outx(
            "You visit Whitney's farm once again. She quickly sees the tell-tale signs of your need and lets you know where Marble is.\n\n",
            false
        );
        // - do an addiction event + new paragraph
        // Happy addiction event
        if (this.player.statusAffectv3(StatusAffects.Marble) == 1) {
            this.addictedEncounterHappy(false);
        } else this.encounterMarbleAshamedAddiction(false);
    }
    /*
    // While Addicted Events type 1 (Marble likes her addictive milk):
    */
    public addictedEncounterHappy(clearS = true): void {
        this.spriteSelect(41);
        if (clearS) this.outx("", true);
        // First visit post addiction:
        if (this.player.findStatusAffect(StatusAffects.MalonVisitedPostAddiction) < 0) {
            this.outx(
                'You find Marble coming out of the barn, holding one of her bottles of milk.  When she spots you, she hurries over and hands you the bottle.  "<i>I want to find something out. Can you drink from that bottle?</i>" she asks.  Do you drink it?',
                false
            );
            // - player chooses yes/no
            this.doYesNo(
                this.playerAgreesToDrinkMarbleMilkBottled,
                this.playerRefusesToDrinkBottledMilk
            );
            this.player.createStatusAffect(StatusAffects.MalonVisitedPostAddiction, 0, 0, 0, 0);
        }
        // Return visits
        else {
            // Addiction event version 1:
            if (MarbleScene.rand(2) == 0) {
                this.outx(
                    'You find Marble in her room, softly humming while reading a book on her bed.  You walk up to her, and without looking away from her book she says, "<i>I can smell your need, sweetie. Are you ready for your drink?</i>" She sets the book down and turns to you, her hands under her breasts as she leans forward.\n\n',
                    false
                );
                // - inte check to avoid immediately drinking, if succeeded:
                if (this.player.inte >= 40) {
                    this.outx("Will you drink her milk?");
                    // - player chooses yes/no
                    this.doYesNo(this.playerDrinksMarbleMilk, this.playerDeclinesToDrinkMarbleMilk);
                } else {
                    // DRINK MILK
                    this.playerDrinksMarbleMilk();
                }
            }
            // Addiction event version 2:
            else {
                this.outx(
                    "You find Marble in the midst of one of her chores.  She smiles at you and says that if you help her with her chores, she will give you a bottle of milk to soothe your nerves.  Do you do it for the milk, Marble, or refuse?",
                    false
                );
                // player chooses milk / Marble / refuse
                this.simpleChoices(
                    "Marble",
                    this.marbleChoreHelpChooseMarble,
                    "Milk",
                    this.marbleChoreHelpChooseMilk,
                    "",
                    undefined,
                    "",
                    undefined,
                    "Refuse",
                    this.marbleChoreRefusal
                );
            }
        }
    }
    // (player chose yes to drink bottled milk)
    private playerAgreesToDrinkMarbleMilkBottled(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            'You easily guzzle down the milk and feel your shakes calming down.  Looking disappointed, Marble says, "<i>You didn\'t have my permission to drink that did you?</i>" You don\'t think so, and after a moment you realize what she was testing.  You need her permission to drink directly from her breasts, but you can drink it from the bottles without any. Sighing softly, Marble asks you to tell her when you feel thirsty and come by.  "<i>I\'ll be waiting for you,</i>" she says, winking at you.  You then head back to camp and try to get some work done before you need to come back.',
            false
        );
        // (increase addiction by 5)
        this.marbleStatusChange(0, 5);
        // (delay withdrawal effect)
        // If the player is addicted, this item negates the withdrawal effects for a few hours (suggest 6), there will need to be a check here to make sure the withdrawal effect doesn't reactivate while the player is under the effect of 'Marble's Milk'.
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 3 + MarbleScene.rand(6));
        } else this.player.createStatusAffect(StatusAffects.BottledMilk, 8, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // (player chose no to drinking bottled milk)
    private playerRefusesToDrinkBottledMilk(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You decide not to drink the milk and force yourself to hand it back to Marble.  She looks at you for a moment before her face falls. \"<i>You didn't even try to drink it!</i>\"  In response, you say that you would prefer to suckle her breasts directly.  She lets out a slight sigh and closes her eyes, before shaking her head and telling you that you'll just have to wait until later since you refused her request.  She goes back inside the barn and you're left to go back to your camp.  For some reason, your shakes seem to have calmed slightly, but you feel kind of sore.",
            false
        );
        // (decrease affection by 5)
        // (decrease addiction by 5)
        this.marbleStatusChange(-5, -5);
        // (decrease player str and tou by 1.5)
        this.dynStats("str", -1, "tou", -1);
        // (delay withdrawal effect)
        // If the player is addicted, this item negates the withdrawal effects for a few hours (suggest 6), there will need to be a check here to make sure the withdrawal effect doesn't reactivate while the player is under the effect of 'Marble's Milk'.
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 1 + MarbleScene.rand(6));
        } else this.player.createStatusAffect(StatusAffects.BottledMilk, 3, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // (player chose yes, or failed check)
    private playerDrinksMarbleMilk(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You eagerly move forward and Marble slips you onto her lap.  She lifts your head to her breast for a moment before telling you, \"<i>Drink, sweetie.</i>\"  You eagerly start gulping down her milk; its wonderful taste fills your body with power and calms your nervous muscles.  Everything seems right with the world as you sit there drinking Marble's milk while she rocks back and forth.  She doesn't let you pull your head away until her teat runs dry, but then she shifts you over to the other one and the process starts anew. You have no trouble drinking all she has to give you and eventually rise up feeling completely satisfied.",
            false
        );
        // (increase addiction by 10)
        // (increase affection by 5)
        this.marbleStatusChange(5, 10);
        // (increase corr by 1)
        // (increase player lust by a 20 and libido,
        this.dynStats("lib", 1, "lus", 20, "cor", 1);
        // if player lust is over a threshold like 60, trigger milk sex scene)
        if (this.player.lust >= 60) {
            this.outx("\n\n", false);
            this.marbleMilkSex(false);
        }
        this.outx(
            "\n\nMarble gives you a kiss on the forehead before sending you on your way.",
            false
        );
        // (apply Marble's Milk effect)
        this.applyMarblesMilk();
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // (player chose no)
    private playerDeclinesToDrinkMarbleMilk(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You're just barely able to pull yourself back and run out of the room, ignoring Marble's protests.  There was no way you could avoid drinking her milk if you'd stayed.  As you are catching your breath at the edge of the farm, your body feels like is tearing itself apart after refusing Marble's milk.  Fortunately, your withdrawal symptoms seem to relax for now.",
            false
        );
        // (decrease addiction by 5)
        // (decrease affection by 5)
        this.marbleStatusChange(-5, -5);
        // (decrease player str and tou by 1.5)
        this.dynStats("str", -1, "tou", -1);
        // (delay withdrawal for a few hours)
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 1 + MarbleScene.rand(6));
        } else this.player.createStatusAffect(StatusAffects.BottledMilk, 3, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // (player chose milk)
    private marbleChoreHelpChooseMilk(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "With the possibility of getting some relief, you eagerly get to work and do whatever you can to help Marble.  It is tough work, but the idea of getting milk seems to give you strength you didn't realize you had.  Afterwards, Marble is so impressed with your efforts that she gives you a large bottle of her milk.  As you are leaving, you realize that you don't have to drink it right away; just having worked for it has soothed your withdrawal a little.",
            false
        );
        // (player gets a large bottle of Marble's milk)
        this.inventory.takeItem(this.consumables.M__MILK, this.camp.returnToCampUseOneHour);
        // (decrease affection by 5)
        this.marbleStatusChange(-5, 0);
        // (delay withdrawal for a few hours)
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 1 + MarbleScene.rand(6));
        } else this.player.createStatusAffect(StatusAffects.BottledMilk, 3, 0, 0, 0);
    }

    // (player chose Marble)
    private marbleChoreHelpChooseMarble(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You agree to help Marble, but not for the milk.  She seems confused for a moment and you tell her that you want to help her for the sake of helping her, not just because you'll be getting milk.  She gives you a genuine smile at this and the two of you work well together for the next few hours.  At the end, Marble thanks you for your help and hands you the bottle of milk she promised, even if you didn't work solely for it.  As you are leaving, you realize that you don't have to drink it right away; just having worked for it has soothed your withdrawal a little.",
            false
        );
        // (player gets a bottle of Marble's milk)
        this.inventory.takeItem(this.consumables.M__MILK, this.camp.returnToCampUseOneHour);
        // (increase affection by 5)
        this.marbleStatusChange(5, 0);
        // (delay withdrawal for a few hours)
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 1 + MarbleScene.rand(6));
        } else this.player.createStatusAffect(StatusAffects.BottledMilk, 3, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // (player chose to refuse)
    private marbleChoreRefusal(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You angrily tell her that you aren't going to work for her milk and turn away, leaving her visibly upset.  Your body seems to be upset at your refusal too, feeling painful all over.  Fortunately, you also feel a temporary reprieve from the symptoms of your withdrawal.",
            false
        );
        // (decrease str and tou by 1.5)
        this.dynStats("str", -1, "tou", -1);
        // (decrease affection by 5)
        // (decrease addiction by 5)
        this.marbleStatusChange(-5, -5);
        // (delay withdrawal for a few hours)
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 1 + MarbleScene.rand(6));
        } else this.player.createStatusAffect(StatusAffects.BottledMilk, 3, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Exploration event while addicted (event triggered while addicted, but not suffering withdrawal):
    public marbleEncounterAddictedNonWithdrawl(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You decide to pay Marble a visit, as it would be nice to spend some time with her while you aren't in withdrawal.  You find her in her room reading a book.  She looks up at you surprised and says, \"<i>You don't look like you need milk right now.  What's up, sweetie?</i>\"  You tell her that you just wanted to spend some time together, and not worry about milk.  She laughs at you and says, \"<i>Sweetie, you'll always be thinking about milk; but I'm fine with pretending for a while.</i>\"  The two of you enjoy a meal together in her room.\n\n",
            false
        );
        if (this.player.statusAffectv1(StatusAffects.Marble) >= 80) {
            this.outx(
                "As you eat, she looks deeply into your eyes for a moment. You think she is going to say something, but she shakes her head and avoids your questions about it for the rest of your time together.\n\n",
                false
            );
        }
        this.outx(
            "After you finish, she thanks you for treating her to your company and asks you to come back soon.  You return to your camp, knowing you will probably be seeing her again soon for something less pleasant.",
            false
        );
        // (increase affection by 10)
        this.marbleStatusChange(5, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // While Addicted Events type 2 (Marble is ashamed):
    public encounterMarbleAshamedAddiction(clearS = true): void {
        if (clearS) this.outx("", true);
        this.spriteSelect(41);
        // First visit post addiction:
        if (this.player.findStatusAffect(StatusAffects.MalonVisitedPostAddiction) < 0) {
            this.outx(
                'You find Marble walking out of the barn, a tank in her arms.  You decide to follow her as she goes behind the barn.  When you round the corner, you see her pouring the contents of the tank out onto the ground.  You ask her what she\'s doing, "<i>I\'m getting rid of this corrupted milk,</i>" she says in disgust.  As you approach her, you recognize the smell of her milk and lick your lips unconsciously.  "<i>I make so much of it each day, I\'m a monster,</i>" she says coldly, "<i>and I made you need it.</i>"  As the last of the milk splashes onto the ground, Marble looks towards you. Surprisingly, her face seems hard and cold.  Do you blame her for what happened to you, or do you comfort her?',
                false
            );
            // - player chooses blame her or comfort her
            this.simpleChoices(
                "Comfort",
                this.AshamedAddictionComfort,
                "Blame",
                this.AshamedAddictionBlame,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
            this.player.createStatusAffect(StatusAffects.MalonVisitedPostAddiction, 0, 0, 0, 0);
            return;
        }
        // REPEAT
        // Addiction event version 1:
        if (MarbleScene.rand(2) == 0) {
            this.outx(
                "You find Marble reading a book in her room.  As you enter, she tells you that she has been continuing with her research on the effects of addiction.  She stands up in front of you and starts playing with her breasts. You quickly feel your desire for her milk intensifying.  \"<i>Try to fight your need,</i>\" she tells you as she continues rubbing her chest. You oblige her and try your best, but it's a struggle you do not enjoy as your body feels like it's pulling itself apart from the strain.  Do you fight off your need?",
                false
            );
            // - player chooses fight / give in
            this.simpleChoices(
                "Resist",
                this.resistAddiction,
                "Give In",
                this.addictionGiveIn,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
        }
        // Addiction event version 2:
        else {
            this.outx(
                'You find Marble as she exits the barn, holding a bottle of her milk.  She looks at you and holds out the bottle.  "<i>Take this,</i>" she tells you, "<i>and say what a horrible thing it is.  Say you wish you\'d never tasted it before.  Say it should never exist.  Then dump that trash onto the dirt.</i>"  Her eyes start to tear up as she finishes the last part. You could do what she says to help beat your addiction, or refuse because you feel that saying such things would hurt her. Or you could just beg her not to waste the milk like that. What do you do?',
                false
            );
            // - player chooses dump it / refuse / beg
            this.simpleChoices(
                "Dump It",
                this.dumpMarblesMilk,
                "Refuse",
                this.refuseMarblesMilkAddiction,
                "Beg For It",
                this.ashamedAddictionBegForIt,
                "",
                undefined,
                "",
                undefined
            );
        }
    }
    // (player chose to blame her)
    private AshamedAddictionBlame(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You decide to take out your anger at your current state on Marble and start yelling at her.  As you wind down from your rant, you can see that her hands are shaking.  Her voice cracks slightly as she says, \"You're right... I have to take responsibility for what I did to you and make it better.  Come to me when you need my milk, and I'll help you get rid of your addiction.  Then I'll make sure no one gets addicted ever again.</i>\"  Her face still cold, Marble turns and walks away.  You feel a little relief after venting at her, but you know that you'll really want to drink her milk again before too long.  It doesn't help that you feel sore after yelling at her like that.",
            false
        );
        // (drop affection to 0)
        // (reduce addiction by 15)
        this.marbleStatusChange(-100, -15);
        // (decrease player str and tou by 1.5)
        this.dynStats("str", -1, "tou", -1);
        // (delay withdrawal effect)
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 1 + MarbleScene.rand(6));
        } else this.player.createStatusAffect(StatusAffects.BottledMilk, 3, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // (player chose to comfort her)
    private AshamedAddictionComfort(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You walk straight up to her and wrap your arms around her.  She just stands there idly for a moment before embracing you back.  ",
            false
        );
        // [player height less than 5 feet]
        if (this.player.tallness < 60)
            this.outx(
                "She pulls you into her chest and you feel relieved to see the Marble you know is still in there.  You feel warm drops of water fall on your head and look up to find Marble crying fresh tears, but this time with a big smile on her face.\n\n",
                false
            );
        // [player height greater than or equal to 5 feet]
        else
            this.outx(
                "You hear her breath start to come in short breaths and look at her face to find Marble crying fresh tears, but this time with a big smile on her face.\n\n",
                false
            );
        this.outx(
            '"<i>Thank you, sweetie.</i>" She whispers so softly that you almost don\'t hear it.  Unfortunately, being so close to her starts to remind you of what you so desperately need. The moment feels somewhat ruined as you unsuccessfully try to hold back your shaking.  She pulls back and looks you straight in the eye.  "<i>Don\'t worry sweetie, we\'ll find a way to make this better together,</i>" she says, holding you tightly in her arms.  You can tell she\'s putting on a brave face and you don\'t think she actually has any idea of what to do.  "<i>Come back when you start to feel a need for my milk again,</i>"\' she tells you as you leave, little hiccups accompanying her words, "<i>We will get through this.</i>"',
            false
        );
        // (increase affection by 10)
        this.marbleStatusChange(10, 0);
        // (delay withdrawal effect)
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private withdrawalDelay(): void {
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 1 + MarbleScene.rand(6));
        } else {
            this.player.createStatusAffect(StatusAffects.BottledMilk, 3, 0, 0, 0);
        }
        // Clear withdrawal immediately
        if (this.player.findStatusAffect(StatusAffects.MarbleWithdrawl) >= 0) {
            this.player.removeStatusAffect(StatusAffects.MarbleWithdrawl);
            this.dynStats("tou", 5, "int", 5);
        }
    }

    // Addicted ashamed event repeat 1 choices
    private resistAddiction(): void {
        this.spriteSelect(41);
        // (player fight it)
        this.outx("", true);
        this.outx(
            'You strain yourself through this difficult trial, but manage to hold as Marble finally stops caressing herself. She smiles and gives you a big hug in celebration, not realizing she\'s almost pushing you over the edge in the process, and hands you a very small glass of milk. "<i>To take the edge off and give you a little relief,</i>" she tells you.  It does calm your nerves, but still leaves you feeling wholly unsatisfied.',
            false
        );
        // (decrease addiction by 5)
        this.marbleStatusChange(0, -5);
        // (decrease player str and tou by 1.5)
        this.dynStats("str", -1, "tou", -1);
        // (delay withdrawal for a few hours)
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 1 + MarbleScene.rand(6));
        } else this.player.createStatusAffect(StatusAffects.BottledMilk, 3, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // (player gives in)
    private addictionGiveIn(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You can't bear to see her jiggling in front of you and yet be unable to drink from those delicious looking breasts.  You break down and beg Marble to let you drink her milk.  She can't stand seeing you like this and agrees with a sad look in her eyes.  You waste no time in gulping down her milk and feel it fill you with new strength.  When you finish, you look up at her with some milk still dripping from your face.  You are met with a sad smile as she wipes your face off.",
            false
        );
        // (increase addiction by 10)
        // (increase affection by 3)
        this.marbleStatusChange(10, 3);
        // (increase corr by 1)
        this.dynStats("cor", 1);
        // (apply Marble's Milk effect)
        this.applyMarblesMilk();
        // (increase player lust by a 20 and libido
        this.dynStats("lib", 1, "lus", 20);
        // if player lust is over a threshold like 60, trigger milk sex scene)
        if (this.player.lust >= 60) {
            this.outx("\n\n", false);
            this.marbleMilkSex(false);
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Ashamed Addiction Event #2 Choices
    // (player chose dump it)
    private dumpMarblesMilk(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "Holding the bottle in your hands, you repeat her words exactly. Her face falls more and more with each declaration. Finally and to your body's great distress, you upturn the bottle and poor out the contents onto the ground.  As the last drop splashes into the dirt, you feel a small relief from the symptoms of your withdrawal. When you look back up, you find that Marble has vanished.  It hurts you in both mind and body to see Marble suffer like that, but at least it will be a while before you need to do something like that again.",
            false
        );
        // (reduce affection by 5)
        // (reduce addiction by 5)
        this.marbleStatusChange(-5, -5);
        // (reduce str and tou by 1.5)
        this.dynStats("str", -1, "tou", -1);
        // (delay withdrawal for a few hours)
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 1 + MarbleScene.rand(6));
        } else this.player.createStatusAffect(StatusAffects.BottledMilk, 3, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // (player chose refuse)
    private refuseMarblesMilkAddiction(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You look at Marble and refuse to do as she says.  She looks at you in surprise and asks why. You tell her you can't bear to talk about her like that, and that if you have to make her feel bad to get over this need, it's not worth it.  After a moment to let your words sink in, she rushes over to you and ",
            false
        );
        if (this.player.tallness < 60) this.outx("hugs you to her chest, ");
        else this.outx("gives you a big hug, ");
        this.outx(
            "all the while saying how wonderful you are.  The bottle ends up getting dumped on the ground during the embrace anyway, but neither of you care to notice until afterwards. But then, it doesn't matter anyway; you'll be fine for at least a little while. Right now, you just want to enjoy Marble's warm form wrapped around you.",
            false
        );
        // (increase affection by 5)
        this.marbleStatusChange(5, 0);
        // (delay withdrawal for a few hours)
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 1 + MarbleScene.rand(6));
        } else this.player.createStatusAffect(StatusAffects.BottledMilk, 3, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // (player chose beg)
    private ashamedAddictionBegForIt(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You look at her in horror at the suggestion of wasting her delicious milk in such a way. You snatch the milk bottle and hold it tightly to your chest.  You beg her not to talk about it like that and not to throw her milk away so easily.  She seems to be even more upset by your declaration and grabs hold of your hands.  Marble looks into your eyes for a moment and tells you that there is always hope to change before she runs off.  You are left with the milk bottle, but you think that you can wait until later to drink it.  It just felt right to make that bold declaration and it seems to have made you feel better, if only for now.",
            false
        );
        // (player gets a bottle of Marble's Milk)
        this.inventory.takeItem(this.consumables.M__MILK, this.camp.returnToCampUseOneHour);
        // (delay withdrawal for a few hours)
        if (this.player.findStatusAffect(StatusAffects.BottledMilk) >= 0) {
            this.player.addStatusValue(StatusAffects.BottledMilk, 1, 1 + MarbleScene.rand(6));
        } else this.player.createStatusAffect(StatusAffects.BottledMilk, 3, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Exploration event while addicted (event triggered while addicted, but not suffering withdrawal):
    public marbleEncounterAddictedNonWithdrawlAshamed(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "You decide to pay Marble a visit, as it would be nice to spend some time with her while you aren't in withdrawal.  You find her in her room and she looks at you ",
            false
        );
        // [affection >= 30]
        if (this.player.statusAffectv1(StatusAffects.Marble) >= 30) this.outx("worriedly ");
        this.outx("for a moment before it dawns on her that you aren't shaking.\n\n", false);
        // [affection >= 30]
        if (this.player.statusAffectv1(StatusAffects.Marble) >= 30)
            this.outx('"<i>Sweetie, w', false);
        else this.outx('"<i>W', false);
        this.outx(
            "hy are you here if you don't need my milk?</i>\"  You explain that you just want to enjoy her company like you used to.  She gives a genuine smile that probably hasn't been on her face for a while, and the two of you have a meal together in her room.\n\n",
            false
        );
        // [affection is 80 or more]
        if (this.player.statusAffectv1(StatusAffects.Marble) >= 80) {
            this.outx(
                "While you're eating, Marble looks into your eyes deeply for a moment and you think she is going to say something, but she shakes her head and seems more reserved for the rest of your time together.\n\n",
                false
            );
        }
        this.outx(
            "After you finish, she thanks you for thinking of her like this, even with what you are going through.  You return to your camp, knowing you will probably be seeing her again soon for something less pleasant.",
            false
        );
        // increase affection by 10)
        this.marbleStatusChange(10, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Post addiction farm scenes:
    // These appear when Marble decides to remain at the farm.
    public postAddictionFarmMornings(): void {
        this.spriteSelect(41);
        // (if player is completely addicted, do this event at the start of every day)
        this.outx("", true);
        this.outx(
            "You hurry over to the farm to get your daily dose of Marble's milk.  It takes an hour of your day, but your body is satisfied.",
            false
        );
        // (increase player corr by 2 if corr is under 30, otherwise increase corr by 1 up to a max of 40)
        if (this.player.cor < 40) {
            if (this.player.cor < 30) this.dynStats("cor", 1);
            this.dynStats("cor", 1);
        }
        // (event takes an hour)
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // (meet Marble when exploring)
    public postAddictionFarmExplorings(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx("You decide to pay Marble a visit at her room.  ");
        // [player height <5]
        if (this.player.tallness < 60)
            this.outx(
                'As you step into her room, she eagerly rushes over and hugs you to her breast. "<i>You\'re as cute as ever, sweetie!</i>"  ',
                false
            );
        this.outx(
            "She is happy to see you and treats you to a small meal while you have a pleasant chat.  "
        );
        if (this.flags[kFLAGS.MURBLE_FARM_TALK_LEVELS] < 7) {
            this.extendedMurbelFarmTalkz();
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        } else
            this.outx(
                "While you talk mostly about unimportant things, there is some discussion about the world and the dangers within."
            );
        this.outx("\n\nThe whole time, you are ", false);
        // [player is no longer addicted]
        if (this.player.findPerk(PerkLib.MarbleResistant) >= 0) this.outx("uncomfortably ");
        this.outx("aware of the smell of Marble's milk.");
        this.dynStats("int", 1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Murble farm talks
    private extendedMurbelFarmTalkz(): void {
        // --- First Conversation ---
        switch (this.flags[kFLAGS.MURBLE_FARM_TALK_LEVELS]) {
            case 0:
                this.outx("During your talk, Marble asks where you're from.");
                // [if PC is human]
                if (this.player.race() == "human") {
                    this.outx(
                        '  "<i>The only other human I\'ve ever met is that wandering trader Giacomo,</i>" she tells you "<i>but he doesn\'t really talk about himself.  Maybe you could tell me about humans?  I was wondering where they live and what kind of people they are.</i>"'
                    );
                    // [if PC is shorter then 5 feet]
                    if (this.player.tallness < 60)
                        this.outx('  Her eyes light up. "<i>Are they all as cute as you?</i>"');
                    // [if PC is taller then 6'6" feet]
                    else if (this.player.tallness > 78)
                        this.outx('  "<i>Are most of you this tall?</i>"');
                }
                // [if PC is cow-girl/cowboi]
                else if (this.player.race() == "cow-morph" || this.player.race() == "cow-boy") {
                    this.outx(
                        '  "<i>It\'s so nice to see another of my kind,</i>" she tells you, "<i>I haven\'t seen any since I left home.  Where are you from?</i>"'
                    );
                }
                // [if PC is a dogmorph]
                else if (this.player.race() == "dog-morph")
                    this.outx(
                        '  "<i>I\'ve seen lots of dog-morphs before, are you from Barkersvile?</i>"'
                    );
                // [if PC is a centaur]
                else if (this.player.isTaur())
                    this.outx(
                        "  \"<i>I've seen a few centaurs before, but they don't seem to have regular homes.  They're nomads, wandering the plains.  Are you the same?</i>\""
                    );
                // [if PC is not human, cow-girl/cowboi, dogmorph, or centaur]
                else
                    this.outx(
                        `  "<i>It's very rare that we get a ${this.player.race()} here.  Are you from around these parts?</i>"`
                    );
                this.outx("\n\nYou sigh and think back for a moment before answering her.");
                // [if PC is not human anymore]
                if (this.player.race() != "human")
                    this.outx(
                        "\n\nYou start by explaining that you weren't born as what you appear to be; you were once a human.  Marble is surprised by this, but when you start to explain how you came to be what you are, she stops you.  \"<i>You don't need to tell me the power of some of the things in this world.  Mommy taught me how to find LaBova if I ever lose a part of my bovinity,</i>\" she says, winking at you.  \"<i>I don't know of anything that will give humanity though, so I can't really help you if you want to change back...</i>\"  You tell her that's fine and that you'll look on your own if you need to do so.  \"<i>Well then, where is your human home?</i>\" she asks."
                    );
                this.outx(
                    "\n\nYou tell her that you aren't from this world, and how you actually passed through a portal to get here, and tell her about your home and your family.  However, you avoid any mention of your mission, or about your village's tradition.  Marble pays close attention to everything you say, and seems to really enjoy the story.  At the end, she stops to think about what you told her.  \"<i>That sounds like a really nice place; I wonder if I'll be able to visit some time?  Well sweetie, you've told me about your family; want to hear about mine?</i>\"  Politely, you say you'd be happy to hear about them."
                );
                this.outx(
                    "\n\nShe smiles and tells you that she was the oldest child of a cow-girl named Hana, and a dog-morph named Roland.  She loved her mother and very much appreciated the many lessons that Hana taught her, but she was always closer to Roland.  He was always kind to her and never demanded anything from her, always helping her in what she wanted to do and accepting anything she did without complaints.  It was he that taught her how to survive and how to fight.  She goes on to say that she had two other younger siblings, both cow-girls, before she left home."
                );
                this.outx(
                    "\n\nThe rest of the meal passes without anything of interest being discussed.  Having now finished your meal together, the two of you stand up and Marble shows you out of her room.  As you're leaving, Marble tells you with a smile on her face that she enjoyed your talk together, and hopes that you'll join her for another soon."
                );
                // --- end conversation ---
                break;
            // --- Second Conversation ---
            case 1:
                this.outx(
                    'After you\'ve been talking about inconsequential things for a few minutes, Marble asks you, "<i>Sweetie, do you ever miss your home?  Do you ever wish you could be back with your parents?</i>"'
                );
                // [PC is pure]
                if (this.player.cor < 33)
                    this.outx(
                        "\n\nYou sigh and wonder how to word your response for a few moments before telling her that you think about them almost everyday; that it's thoughts of home and family that keep you going."
                    );
                else if (this.player.cor < 66)
                    this.outx(
                        "\n\nYou pause a moment before telling her that you used to think about them all the time, but you've since tried to push them from your mind so that you can focus on why you came to this world."
                    );
                else
                    this.outx(
                        "You chuckle and say that you hardly think of them with all the other fun things to think about.  Then you pause and say that it is in the moments that you do think about them that keep you from forgetting who you once were."
                    );
                this.outx(
                    "\n\n\"<i>Hmm, it's nice to hear you care so much about your family.  As for me, I think of them pretty often, especially my daddy.  Don't get me wrong; I do love momma, but she always seemed so bossy around daddy, always giving him orders... and yet he had infinite patience for everyone.  Even after trying hundreds of times to swing straight when I was a little girl he would never lose his patience.</i>\"  She hesitates.  \"<i>No, wait... there was that one time he and momma got into a fight, and afterwards he was really nervous and shaky and he got mad at me.  I cried so much when he scolded me, but the next day he was back to normal - if anything, he was even a bit nicer.</i>\"  She gets misty eyed for a moment.  \"<i>I remember the day where he showed me how to make my first hammer.  I'll never forget what he said then. 'This is a weapon; that means it's for hurting people.  Never raise your hammer against someone unless he is an enemy, and when you do raise it, never hold back and don't give him the chance to hurt you instead.  You need to remember this if you want to survive.</i>\""
                );
                this.outx(
                    "\n\nMarble starts, realizing that she'd been staring wistfully off into space, then she makes a double take and looks out the window.  \"<i>I'm sorry sweetie, but I forgot Whitney had a job for me that I need to go help her with.  Why don't we finish this some other time?</i>\"  She seems in a hurry to go, so you bid the friendly cow-girl good day and return to your camp."
                );
                break;
            // --- Third Conversation ---
            case 2:
                // siblings
                this.outx(
                    "You ask Marble if there was any trouble with that last job.  She looks at you a bit embarrassed and admits that it wasn't the first time she'd been late to a job, and it wasn't that big of an issue.  Still, she doesn't like to keep Whitney waiting.  \"<i>Anyway, where were we?</i>\" the cow-girl asks.  \"<i>Ah, yes.</i>\"  Marble nods, and resumes talking about the other members of her family.  \"<i>I'm the oldest of three siblings, sweetie.  Or at least, the three kids that were there when I left home!  I'm also the only one who had daddy's fur; my other two sisters were both black-and-white.</i>\"  She pauses for a moment. \"<i>Ophelia was the next after me; she was a pretty quiet girl most of the time, but when she started talking about all the stories she read, she could talk more than any of us could handle!</i>\"  She smiles at this.  \"<i>I didn't really understand why she liked reading so much at the time, but now I can't find a better way to spend my time when I'm in my stall and hooked up to the milkers.  It's really a nice set-up Whitney put in for me: a comfortable chair, a light, and an end table with an adjustable vacuum level dial.</i>\""
                );
                this.outx(
                    '\n\nShe frowns.  "<i>But the youngest of us... well, let\'s say that she got along really well with mommy.</i>"  You ask her what she means; Marble makes a face before answering.  "<i>Well, mommy was used to getting what she wanted and ordering others to comply; Clara was just like her.  Always bossing everyone else around and always expecting to get her way.</i>"  She pauses again and her expression softens.  "<i>Even so, she could always make us laugh, no matter what the mood was.  I think I miss her just the same as the others.</i>"  She sighs at this, then chuckles.  "<i>I don\'t think the me that left home all those years ago would be able to believe I miss Clara now, but I do.</i>"'
                );
                this.outx("\n\nYou idly chat for a few more minutes before parting for the day.");
                break;
            // --- Fourth Conversation ---
            case 3:
                // why she left
                this.outx(
                    "Marble looks over you a moment before saying, \"<i>You've mentioned this 'mission' a few times now; I guess that's why you left home?</i>\"  You nod.  \"<i>Fulfilling a duty, huh?  My story isn't quite the same as yours, and certainly not so noble!</i>\"  She laughs at this."
                );
                // [if PC is under 5 feet tall]
                if (this.player.tallness < 60)
                    this.outx(
                        "  \"<i>Sorry, sorry, it's just that you're so cute!  I can't picture you as some great hero leaving behind home and family for a mission.</i>\"  She wipes a few tears from her face."
                    );
                // [if PC is over 7 feet tall]
                else if (this.player.tallness > 84)
                    this.outx(
                        '  "<i>I\'m sure a giant like you was the perfect choice for this mission.</i>"'
                    );
                this.outx(
                    '\n\n"<i>Like I said, I didn\'t leave for such a noble reason.  I left because I felt that it was time for me to move on, and to find a mate of my own.</i>"  She stops for a moment, looking straight at you seriously.'
                );
                // [if affection is high enough that she'll have sex with the PC or is in camp]
                if (this.player.statusAffectv1(StatusAffects.Marble) >= 60)
                    this.outx(
                        '  "<i>Even though the start of the trip didn\'t turn out all that well, I think I found what I was looking for.</i>"'
                    );
                this.outx(
                    '\n\nA moment later you hear a knock at the door, and then hear Whitney\'s voice call in, "<i>Marble hun?  Could ya\'ll be a dear and help me put out the cows?</i>"  Marble looks at you for a moment, as if to ask whether you can continue this later.  You nod and she calls out, "<i>Sure thing Whitney, give me a moment.</i>"'
                );
                break;
            // --- Fifth Conversation ---
            case 4:
                // Travels and first two lovers
                this.outx(
                    'After telling Marble about your explorations of the world thus far, Marble offers to tell you a bit more about her own journey.  "<i>My family actually lives on the other side of the mountains to the south.</i>"  She pauses, then chuckles.  "<i>Or is it to the north?  You know how hard it is to describe direction over long distances, don\'t you?</i>" You nod; while you\'ve never had any problem with it back home, you can well imagine how the magic of this realm would eliminate the need for such facility.'
                );
                this.outx(
                    '\n\nShe goes on about how she was exploring the mountains and easily dispatching those of demonic taint that wanted to have their way with her.  After wandering around for a few weeks, something a bit more interesting happened.  "<i>That was when I met the first man I tried to strike up a relationship with.  He was a big strong minotaur that smelled absolutely incredible... but he was a dick.</i>"  She shakes her head.  "<i>He tasted my milk once, and I tasted his cum in turn.  Then the next day, he wanted to force that massive cock of his into my womanhood, even though it obviously wasn\'t going to fit a young girl like me.  I told him no, and he didn\'t like that, and down came my hammer.  I felt bad about it at first...</i>"  She shakes her head again.  "<i>But then when he woke up he decided he wanted to try and force me again!  After that I had his meat on a plate and I was done with him.</i>"  Her smile at this declaration is more than a little intimidating.  She tells you the only thing that she really remembers vividly from her time with the minotaur was just how wonderful her first nursing was.'
                );
                this.outx(
                    '\n\n"<i>I left the mountains behind not long after that.  At the time, I thought that I needed to find someone smaller that wasn\'t going to give me much trouble.  A few years later I chanced upon a nice-looking husky-dog boy named Ansgar.  We actually got along really well, and he loved nursing me so much.  Though, about a week into it, he just walked up to me and said that he couldn\'t nurse from me anymore.  I was furious at him, and I just blew up in his face over his refusal.  At the end of it all, his hands started shaking and he ran off.</i>"  She stops at this and says sadly, "<i>I never saw him again.</i>"'
                );
                // [if PC is in the addiction quest or Marble is in camp]
                if (
                    this.player.statusAffectv3(StatusAffects.Marble) == 2 ||
                    this.player.findPerk(PerkLib.MarbleResistant) >= 0
                )
                    this.outx(
                        "\n\n\"<i>I guess it's pretty obvious now why he said he had to stop; he realized he was addicted. I just wish he'd told me at the time so that I knew...</i>\" She sighs."
                    );
                // [If PC said they want the addiction and (the quest is still on or the PC is addicted)]
                else if (
                    this.player.statusAffectv3(StatusAffects.Marble) == 1 ||
                    this.player.findPerk(PerkLib.MarblesMilk) >= 0
                )
                    this.outx(
                        "\n\n\"<i>I guess it's pretty obvious now why he said he had to stop; he realized he was addicted.  It's too bad he didn't know how wonderful it is, isn't it?</i>\" She winks at you."
                    );

                this.outx(
                    '\n\nHer expression changes and she concludes, "<i>But that\'s enough talking about the past and old regrets for now.</i>"'
                );
                this.outx(
                    "\n\nMarble tries to change the subject by bringing up the weather, but this proves to be an exceedingly dull subject when sunny weather seems to be all you have.  It does quickly turn into Marble talking about the somewhat more interesting irrigation set-up that Whitney uses to keep her plants watered.  Eventually the two of you part ways, as you haven't got anything else really interesting that you want to talk about right now."
                );
                break;
            // --- Sixth Conversation ---
            case 5:
                // Next love, Marble's problem
                this.outx(
                    "This time it's you who spends a fair bit talking about your own love life back home - or lack thereof, as it seemed to you sometimes.  After you finish, you notice that Marble is looking off to the side.  She turns back to you and thanks you for sharing.  You ask her if she doesn't mind continuing where you left off last time.  \"<i>"
                );
                if (
                    this.player.findPerk(PerkLib.HistorySlut) >= 0 ||
                    this.player.findPerk(PerkLib.HistoryWhore) >= 0
                )
                    this.outx(
                        "Well, you certainly gave an arousing description.  I think I can share something in return."
                    );
                else if (this.player.cor < 33)
                    this.outx("Sweetie, after you told me such a nice story, of course I will.");
                else if (this.player.cor < 66)
                    this.outx(
                        "Sweetie, I can tell that you care a great deal about what happened, even if you try to hide it. Of course I'll share."
                    );
                else
                    this.outx(
                        "Well, you certainly gave an arousing description.  I think I can share something in return."
                    );
                this.outx(
                    "  After my falling out with Ansgar, I noticed that I really missed nursing him more than anything else.</i>\"  She stops for a moment, shaking her head.  \"<i>That's not quite right.  It's more that I needed to keep nursing; it just felt like everything was wrong with me if I wasn't nursing something.</i>\""
                );
                this.outx(
                    "\n\n\"<i>It was so bad that I had to start nursing anything I could find, even if I had to force it.  The most notable of these was probably this one adorable imp, barely half my height.  I thought that my milk could make something so cute into anything I wanted.  I caught him and made him nurse me all night.  He was just the most wonderful thing once he'd gotten his mind off his monster cock.</i>\" She shakes her head.  \"<i>But an imp has demon taint, so you know how this is going to end, don't you?  The next day, my 'special' friend had gone out to get his other friends and decided that I'd make a wonderful sex toy.</i>\"  She smiles.  \"<i>That was one hell of a day... though maybe not in the way they expected.  I gave them such a bad beating that I doubt that they'll ever try to gang-rape someone outside the cover of night again.  Speaking of which sweetie, you'd best not show any of those horrible creatures where you live, ok?</i>\""
                );
                // [if PC has been gang-banged by imps]
                if (this.player.findStatusAffect(StatusAffects.ImpGangBang) >= 0)
                    this.outx(
                        "\n\nYou give a small chuckle at the belated advice; it would have been useful earlier."
                    );
                else
                    this.outx(
                        "\n\nYou nod and thank Marble for the advice; but as long as you have to stay by and defend this side of the portal from being occupied, you're pretty sure it's a moot point."
                    );
                this.outx(
                    "\n\nThe two of you decide to end things at that for now; Marble seems a bit restless after discussing nursing so much and often caresses her sensitive breasts when she thinks you aren't looking.  She's probably eager to get back in the milker."
                );
                break;
            // --- Seventh Conversation ---
            default:
                // Meeting Whitney, and life on the farm
                this.outx(
                    "\"<i>So sweetie, how did you come to Whitney's farm?</i>\"  You tell her that you simply stumbled upon it a few times, before becoming familiar enough with it to come back whenever you wanted.  She nods and says, \"<i>Yeah, it was the same for me.  Happened about a year ago actually.  Was Whitney ever shocked that day to see an eleven year-old cow-girl waltz into her farm, pick her up, and force her to nurse!  She didn't like that one bit!  Eventually she got me over to the barn and convinced me to try using the milkers.</i>\"  Marble smiles.  \"<i>Since that day, I've been able to keep my needs in check.  It isn't as satisfying as actually nursing someone, but it does take the edge off considerably.  After I'd been around for about a month, Whitney let me move into the barn.  I've been here since, helping her with the chores around the farm and helping protect it from attacks.  Whitney has been especially appreciative of my help with the heavy lifting, since I was pretty much the strongest person she'd ever met."
                );
                // [if PC strength is < 90]
                if (this.player.str < 90)
                    this.outx(
                        "  In fact, I don't think there's anyone out there who is stronger than me."
                    );
                else
                    this.outx(
                        "  You're probably the only other person I've ever met who is stronger than me."
                    );
                this.outx('</i>"');
                this.outx(
                    "\n\nMarble looks up to grin at you, and finally notices the dumbstruck look on your face.  \"<i>Uh, sweetie, what is it?</i>\"  You make absolutely sure that you heard her right when she said she was 11 years old last year.  She nods, and asks you why you find that so odd.  You can only shake your head and inform her that humans take about 18 to 25 years to fully mature.  She laughs at this idea and says that she's been fully grown since she was 6; all the members of her race are that way - those she's met, anyway.  Well, there isn't much else you can say to that."
                );
                // -page break-
                this.outx(
                    "\n\n\"<i>Well, that's basically the story of my life.  I guess I've heard everything about you now"
                );
                if (this.player.findStatusAffect(StatusAffects.CampMarble) < 0)
                    this.outx(", except that mission of yours that's so important to you");
                this.outx('.</i>"');
                this.outx(
                    "\n\nYou decide to ask her if she's changed since she left home.  \"<i>Well, I guess I'm a lot more level-headed than I was before, and I'm able to control myself much better when someone refuses to drink my milk.  It still makes me really mad inside, but I keep a lid on it.</i>\"  She stops for a moment.  \"<i>I'm also fairly good at hiding my feelings."
                );
                // [if Marble is not in camp]
                if (this.player.findStatusAffect(StatusAffects.CampMarble) < 0) {
                    this.outx("  I may not show it, but I'm actually really lonely on the inside.");
                    // [if addiction quest is active, and Marble is ashamed of her milk]
                    if (this.player.statusAffectv3(StatusAffects.Marble) == 2)
                        this.outx(
                            "  I really just wanted someone who loved me and loved nursing from my breast.  I had no idea what that would do to you."
                        );
                    // [if addiction quest is active, and Marble is happy with her milk]
                    else if (this.player.statusAffectv3(StatusAffects.Marble) == 1)
                        this.outx(
                            "  But I think that I've found the one who will change that.  Right sweetie?"
                        );
                    // [if addiction quest has not yet triggered]
                    else this.outx("  Though, I'm not giving up hope yet.");
                    this.outx('</i>"');
                } else
                    this.outx(
                        '  Until I met you, I was actually really lonely on the inside.</i>"'
                    );
                this.outx(
                    "\n\nYou thank Marble for sharing so much about herself with you.  She nods and says, \"<i>It was my pleasure, sweetie.  You're the first person who's ever shown so much interest in me, and I really enjoyed telling you.  Come back and visit anytime, I'm glad to have someone to talk to like this.</i>\""
                );
                break;
        }
        this.flags[kFLAGS.MURBLE_FARM_TALK_LEVELS]++;
    }

    // (work with Marble when helping)
    public postAddictionFarmHelpings(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.outx(
            "Smiling, Whitney suggests that you go help Marble out with her chores.  You readily agree and go out to meet with her.  Afterwards, Marble offers you a bottle of her milk.  ",
            false
        );
        // [if player is no longer addicted]
        if (this.player.findPerk(PerkLib.MarbleResistant) >= 0)
            this.outx(
                "She assures you that you can't get addicted to it again if you don't drink her milk directly from her breasts.",
                false
            );
        // (randomly raise either str or spd)
        this.dynStats("str", MarbleScene.rand(2), "spe", MarbleScene.rand(2));
        // (player gets a bottle of Marble's milk)
        this.inventory.takeItem(this.consumables.M__MILK, this.camp.returnToCampUseOneHour);
    }

    // Post addiction Camp Text:
    // These appear when Marble decides to join the player at their camp.
    public postAddictionCampMornings(extra = true): void {
        this.spriteSelect(41);
        // (if player is completely addicted, do this event at the start of every day)
        this.outx(
            "\nAs you are getting up, you are greeted by the smell of fresh milk.  You smile as Marble raises your head to her breast and gives you your morning milk.\n",
            false
        );
        // (increase player corr by 2 if corr is under 30, otherwise increase corr by 1 up to a max of 40)
        if (this.player.cor < 40) {
            if (this.player.cor < 30) this.dynStats("cor", 1);
            this.dynStats("cor", 1);
        }
        if (this.player.lib < 40) this.dynStats("lib", 0.1);
        this.player.slimeFeed();
        if (!extra) return;
        // (if the player has less than 5 bottles of milk in their inventory or storage containers)
        if (!this.player.hasItem(this.consumables.M__MILK, 5)) {
            this.outx(
                "\n\nAs you are about to leave, Marble hands you a bottle of her milk.  ",
                false
            );
            // [if the player is no longer addicted]
            if (this.player.findPerk(PerkLib.MarbleResistant) >= 0)
                this.outx(
                    "She assures you that you'll be fine as long as you don't drink directly from her breasts.",
                    false
                );
            // (player gains a bottle of Marble's milk)
            this.inventory.takeItem(this.consumables.M__MILK, this.camp.returnToCampUseOneHour);
        }
    }

    // Sex scenes (all take an additional hour after the trigger event):
    // For all of these scenes, do every part that the player qualifies for.  Male if the player is only male, herm if the player is only herm.  All genderless players default to the one genderless sex scene.
    private standardSex(newpage = true): void {
        this.spriteSelect(41);
        if (newpage) {
            this.outx("", true);
        }
        if (this.player.gender == 0) {
            this.marbleGenderlessNoFuck();
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // OH GOD MISSIONARIES?
        // (Standard sex, player has genitals, position: player lies on top of Marble)
        // (This scene only needs a slight taur variation)
        if (this.player.gender > 0) {
            this.outx(
                'Marble smiles at you and leads you towards her bed.  She gets you to sit on one end while she moves to the head. As she sits down, she slowly starts to remove her clothes:  First she pulls off her top and gives you a full view of her breasts, rubbing and caressing them before running one hand down to her skirt and slipping it off.  She pulls her tail up between her breasts and gives you a coy smile as she slips the ribbon on it off. She is now completely naked.  "<i>Now it\'s your turn,</i>" she tells you with a smile.\n\n',
                false
            );
            // (player is wearing fetish gear)
            if (
                this.player.armorName == "bondage patient clothes" ||
                this.player.armorName == "crotch-revealing clothes" ||
                this.player.armorName == "cute servant's clothes" ||
                this.player.armorName == "maid's clothes" ||
                this.player.armorName == "servant's clothes"
            ) {
                this.outx(
                    `You smirk at her and demonstrate just how easy it is to get at your genitals while wearing this outfit.  But you decide to not disappoint her, making a show of removing your ${this.player.armorName} and pretending to have some modestly when you show off your `
                );
                // [player has at least one dick]
                if (this.player.totalCocks() > 0) {
                    this.outx(this.multiCockDescriptLight(), false);
                    // player has at least one dick and a vagina]
                    if (this.player.vaginas.length > 0) this.outx(" and your ");
                }
                // [player has a vagina]
                if (this.player.vaginas.length > 0) this.outx(this.vaginaDescript(0), false);
                this.outx(
                    ".  You also make sure that there is no lingering clothing on your body for her, just as she did for you.\n\n",
                    false
                );
            }
            // (player is not wearing fetish gear)
            else {
                this.outx(
                    `You smile in return and begin removing your ${
                        this.player.armorName
                    } from your body.  You start by slowly slipping off your top to reveal your ${this.allBreastsDescript()}, `
                );
                // [player's breasts are at least B cup]
                if (this.player.biggestTitSize() >= 2)
                    this.outx("running one of your hands down them before continuing.");
                // [player has small or no breasts]
                else this.outx("running one of your hands over them before continuing on.");
                this.outx("  You slip open the lower half of your clothes, revealing your ");
                if (this.player.totalCocks() > 0) {
                    this.outx(this.multiCockDescriptLight(), false);
                    // player has at least one dick and a vagina]
                    if (this.player.vaginas.length > 0) this.outx(" and your ");
                }
                // [player has a vagina]
                if (this.player.vaginas.length > 0) this.outx(this.vaginaDescript(0), false);
                this.outx(
                    ".  You then remove any other clothing, leaving your body bare.\n\n",
                    false
                );
            }
            // (player is a herm)
            if (this.player.gender == 3) {
                this.outx(
                    'Marble\'s eyes widen as you show off your equipment.  "<i>You have both?</i>" she says in awe. "<i>I\'m not sure if I can pleasure both parts of you at the same time... which would you prefer to use?</i>"\n\nWhich of your genitals do you want to have sex with?',
                    false
                );
                // – player chooses: dick(s)/vagina, base on choice, treat the rest of the encounter as if they were male or female
                this.menu();
                this.addButton(0, "Maleness", this.marbleSex2Continued, -1);
                this.addButton(1, "Female", this.marbleSex2Continued, -2);
                return;
            }
            // male
            if (this.player.gender == 1) this.marbleSex2Continued(1);
            // female
            if (this.player.gender == 2) this.marbleSex2Continued(2);
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    public marbleSex2Continued(genders: number): void {
        this.spriteSelect(41);
        if (genders < 0) {
            genders = -genders;
            this.clearOutput();
        }
        // (player is male)
        if (genders == 1) {
            this.outx(
                `Marble leans back and invites you to come.  With a coy grin, you slowly crawl towards her, each movement bringing the two of you closer until you are on top of her body. She puts her hands around you and lies back completely.  You carefully line up your ${this.cockDescript(
                    0
                )} and thrust into her warm snatch.  `
            );
            // [player is less than 8 inches in length]
            if (this.player.cocks[0].cockLength < 8)
                this.outx(
                    "You easily slide all the way into her depths before beginning your hungry thrusts.  ",
                    false
                );
            // [player is more than 8 inches in length]
            else
                this.outx(
                    "She is unable to take all of you, but you're hardly discouraged as you begin your hungry thrusts.  ",
                    false
                );
            this.outx("She gasps slightly and her arms clamp down on you, ");
            // [player is between 4 and 5 feet in height]
            if (this.player.tallness < 60 && this.player.tallness >= 48)
                this.outx("keeping your head tightly locked between her breasts.  ");
            // [player is not between 4 and 5 feet in height]
            else this.outx("keeping your body tightly locked against her.  ");
            this.outx(
                "Her tight grip does nothing to slow your thrusts, only helping to bring the both of you closer and closer to sweet release.  Finally, you push into her as far as you can",
                false
            );
            // [player has a knot and is not more than 8 inches long]
            if (this.player.cocks[0].cockLength < 8 && this.player.hasKnot(0))
                this.outx(", and with a pop, your knot slips inside of her");
            this.outx(
                `.  Deep within her, your ${this.cockDescript(
                    0
                )} explodes.  Within moments, Marble feels her orgasm too, her grip intensifying immensely.  You hear her give a sigh that sounds almost like a moo and her grip relents.  The two of you lay there panting, your ${this.cockDescript(
                    0
                )} still inside her.\n\n`,
                false
            );
        }
        // (player is female, I hope I did this right, I'm not familiar with the exact mechanics of female/female toys)
        else {
            this.outx(
                `Marble grins at you and reaches into the drawers of the mini-dresser next to her bed, pulling out a long, double-ended dildo. She slips one half into her own hole and invites you over to her.  With a coy grin, you slowly crawl towards her, each movement bringing the two of you closer until you slip your ${this.vaginaDescript(
                    0
                )} onto the other end of the dildo.  Sighing, Marble lies down underneath you and begins to rock back and forth.  You bring your own ministrations to the mix in response. Soon, the two of you are panting and moaning against each other with the dildo sliding around between you.  Suddenly, she locks her arms around you tightly and `
            );
            // [player is between 4 and 5 feet in height]
            if (this.player.tallness < 60 && this.player.tallness >= 48)
                this.outx("squeezes your head into her breasts.  ");
            // [player is not between 4 and 5 feet in height]
            else this.outx("pulls you securely against her.  ");
            this.outx(
                "Marble shudders with pleasure and redoubles her efforts at moving the dildo, quickly pushing you over the edge as well",
                false
            );
            // [player has at least one dick]
            if (this.player.totalCocks() > 0)
                this.outx(
                    `.  Your ${this.multiCockDescriptLight()} erupts while clamped between your bodies`
                );
            this.outx(
                '.  Her grip soon relents and the two of you lay there panting, the dildo still connecting you.  You can hear Marble say under her breath "<i>That was way better than on my own...</i>"\n\n',
                false
            );
            // (remove vaginal virginity?  "Your hymen is torn...")
            this.player.cuntChange(8, true);
        }
        // (first time sex)
        if (this.player.findStatusAffect(StatusAffects.FuckedMarble) < 0) {
            this.outx(
                "After a few minutes pass, Marble breaks the silence. \"<i>Sweetie, that was wonderful. You're really special to me, yah know?  Please remember that.</i>\"  You know that your relationship is special too; you won't forget Marble anytime soon.",
                false
            );
            this.player.createStatusAffect(StatusAffects.FuckedMarble, 0, 0, 0, 0);
        }
        // (repeat sex)
        else {
            this.outx(
                "Marble sighs and gives you a big smile. \"<i>Sweetie, you're just as wonderful to be with as ever.  I'm always looking forward to our times together,</i>\" she tells you.  You would be inclined to agree with her.",
                false
            );
        }
        this.player.orgasm();
        // – return to trigger
    }

    // (Milk sex, player has genitals, position: Marble sits on the player)
    // (this scene will need a taur variation)
    private marbleMilkSex(newpage = true): void {
        this.spriteSelect(41);
        if (newpage) {
            this.outx("", true);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        if (this.player.gender == 0) {
            this.marbleGenderlessNoFuck();
            return;
        }
        this.outx(
            "Drinking her milk has filled you with an intense need, and you can see that need in Marble's eyes too.  You have no choice; you are going to have sex with her.\n\n",
            false
        );
        // [player is wearing fetish gear]
        if (
            this.player.armorName == "bondage patient clothes" ||
            this.player.armorName == "crotch-revealing clothes" ||
            this.player.armorName == "cute servant's clothes" ||
            this.player.armorName == "maid's clothes" ||
            this.player.armorName == "servant's clothes"
        ) {
            this.outx("She moves first to get a good view of your equipment.  ");
        }
        // [player is not wearing fetish gear]
        else {
            this.outx(
                `She moves first and pulls open your ${this.player.armorName} to get a view of your equipment.  `
            );
        }
        // (player is male, or a herm)
        if (this.player.cockTotal() > 0) {
            // [player has only human or animal dicks]
            if (
                this.player.cockTotal() ==
                this.player.horseCocks() + this.player.dogCocks() + this.player.normalCocks()
            ) {
                this.outx(
                    `Marble seems pleased at the sight of your ${this.multiCockDescriptLight()} and she pushes you back onto her bed.  She removes her own skirt and stops for a moment at her tail.  Giggling slightly, she uses her ribbon-tied tail to brush at your ${this.multiCockDescriptLight()} before climbing on top of you and slipping her legs to your sides.\n\n`,
                    false
                );
            }
            // [player has at least one of a different kind of dick]
            else {
                this.outx("Marble gives a long hard look before pointing at your ");
                this.temp = this.player.cocks.length;
                while (this.temp > 0) {
                    this.temp--;
                    if (this.player.cocks[this.temp].cockType.Index > 2) {
                        this.outx(this.cockDescript(this.temp), false);
                        this.temp = -1;
                    }
                }
                this.outx(
                    '.  "<i>Sweetie, what the heck is that?</i>" she asks in an unsure tone. You smile at her and tell her that she should touch it.  After a moment, Marble reaches out and seems to visibly relax after feeling its texture and stiffness.  She pushes you back onto her bed before slipping free of her own garments and climbing on top of you.  She gives you a sly smile as she puts her legs on your sides.\n\n',
                    false
                );
            }
            // [after either]
            // [player has more than one dick]
            if (this.player.cockTotal() > 1)
                this.outx(
                    `"<i>So, which one is your favorite?</i>"  Marble asks you while taking measure of your ${this.multiCockDescriptLight()}.  Before you have a chance to answer, Marble grabs a hold of your central ${this.cockDescript(
                        0
                    )} and says "<i>I'll bet it's this one.</i>"  `
                );
            this.outx(
                `Without much hesitation, Marble lifts herself up, and impales her moist lips upon your ${this.cockDescript(
                    0
                )}.  The two of you gasp as you sink into her interior.  You feel each inch slowly flow inside her until `
            );
            // [dick(0) is less than 8 inches long]
            if (this.player.cocks[0].cockLength < 8)
                this.outx(`every bit of your ${this.cockDescript(0)} is deep inside.  `);
            // //[dick(0) is more than 8 inches long]
            else this.outx("Marble bottoms out at eight inches and you can go no further.  ");
            this.outx(
                "With a delighted shiver, Marble starts to push herself up and down on you, her movements growing more and more frantic over time.  You try to slow her down but she seems to be beyond the capability of listening to you now, giving only louder and more frantic moans of pleasure.  Sooner than you would have preferred, you explode inside her. At that moment, Marble gives a final moan that sounds almost exactly like a moo.  She slows down, seeming to have already reached her peak.\n\n",
                false
            );
            this.outx(
                "You can see that Marble is quite pleased and satisfied after that milking and sex combo session.  She rolls off you onto her bed and is soon asleep.  It takes you a few moments to get cleaned up, still in a slight daze after that frantic lovemaking.  As you depart, you give a final glance to Marble and see her still dozed off on her bed in a slightly lopsided position.",
                false
            );
        }
        // (player is female)
        else if (this.player.vaginas.length > 0) {
            // [player has sizable breast, C or bigger]
            if (this.player.biggestTitSize() > 2) {
                this.outx(
                    `Marble runs her fingers along your ${this.vaginaDescript(
                        0
                    )} for a moment before slipping a hand onto your ${this.biggestBreastSizeDescript()}.  She smiles at you and says "<i>I think that maybe we should play up here. You did enjoy mine, so I think I'll enjoy yours.</i>"  She helps you slips off your garments and lies you down on her bed, quickly taking her place on top of you.  She sticks her tongue out before putting her mouth to one of your ${this.nippleDescript(
                        0
                    )}s and giving it a series of gentle licks.  Taking a moment to lick her lips, Marble starts to rub, caress and lick each of your ${this.allBreastsDescript()} in turn with her hands and face, always gently and always lovingly.  Marble seems to be quite familiar with these techniques; she has probably practiced on herself many times before.\n\n`,
                    false
                );
            }
            // [player has smaller then C breasts]
            else {
                this.outx(
                    `She teases your ${this.vaginaDescript(
                        0
                    )} with her fingers for a moment before putting her hand on one of your ${this.biggestBreastSizeDescript()}.  "<i>I'm not sure what to do with teats this small, but I'll do my best. Though I feel kinda sorry for you, sweetie.</i>"  You open your mouth to make an indignant response, but Marble puts a figure on your lips to shush you. She gives you an intense stare and tells you in no uncertain terms that since you enjoyed her breasts so much, it's only fair that she gets to experience your ${this.allBreastsDescript()}.  She then sticks out her tongue at you before giving your ${this.nippleDescript(
                        0
                    )} a lick and rub down, which she extends to the `
                );
                if (this.player.totalNipples() > 2) this.outx("other");
                else this.outx("rest");
                this.outx(".\n\n", false);
            }
            // [after either]
            this.outx("After finishing up");
            // [if player has more than two breasts]
            if (this.player.totalBreasts() > 2)
                this.outx(` with each of your ${this.allBreastsDescript()}`);
            else this.outx(` with each of your ${this.breastDescript(0)}`);
            this.outx(
                `, Marble looks up at you and sticks her tongue out again.  "<i>Now it's time for the main course!</i>" she whispers before lowering her head down to one of your ${this.nippleDescript(
                    0
                )}s and closing her mouth around it. She soon begins to suckle your nipple.\n\n`,
                false
            );
            // [if player has nipplecunts]
            if (this.player.hasFuckableNipples()) {
                this.outx(
                    `As Marble's tongue rubs against your ${this.nippleDescript(
                        0
                    )} it slips inside, much to her surprise.  She pulls back for a moment and gives you a confused look.  You tell her it isn't a problem; it only makes you happier. Understanding, Marble quickly resumes her efforts.  Her talented tongue fucks your ${this.nippleDescript(
                        0
                    )} in earnest.`
                );
                // [player is lactating]
                if (this.player.biggestLactation() > 1)
                    this.outx("  The whole while, Marble continues to gulp down your milk.");
            }
            // [if player is lactating]
            else if (this.player.biggestLactation() > 1)
                this.outx(
                    "Her suckling soon brings a stream of milk to her lips that she gulps down eagerly.  You give a contented sigh, but are soon brought out of your revelry as her sucking becomes more stimulating and intense.",
                    false
                );
            // [player is neither lactating or has nipplecunts]
            if (this.player.biggestLactation() <= 1 && !this.player.hasFuckableNipples())
                this.outx(
                    `Of course, since you aren't lactating, nothing but your ${this.nippleDescript(
                        0
                    )} reaches her lips.  Marble doesn't seem to be put off by this and still gives you a thoroughly enjoyable experience.`
                );
            this.outx("\n\n", false);
            this.outx(
                `After a while, Marble pulls back from your ${this.nippleDescript(
                    0
                )} and tells you, "<i>Sweetie, I know how annoying it is to only have one of your nipples serviced, so I will be sure to finish the job.</i>"  She dives right into your `
            );
            if (this.player.totalNipples() > 2) this.outx("next");
            else this.outx("other");
            this.outx(
                ` ${this.nippleDescript(
                    0
                )} and starts the experience all over again.  By the end, her efforts have successfully rung an orgasm from you. After cleaning up a bit, Marble sends you off in high spirits.`
            );
        }
        this.player.orgasm();
    }

    // (after addiction sex, standing sex)
    // (this whole section simply doesn't work if the player has a taur body)
    public marbleAddictionSex(newpage = true): void {
        this.spriteSelect(41);
        if (newpage) {
            this.outx("", true);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        if (this.player.gender == 0) {
            this.marbleGenderlessNoFuck();
            return;
        }
        this.outx(
            "You rock against each other, your hands working to remove Marble's clothes while her hands work at yours.  As your respective clothing falls to the floor, ",
            false
        );
        // [player is under 5.5 feet in height]
        if (this.player.tallness < 66)
            this.outx(
                "Marble bends over and kisses you deeply on the lips, a kiss that you eagerly return.  She lifts you up into the air, her lips still locked on yours, and holds you tightly against her body. A full minute passes before she lowers you down so your bodies can be joined.\n\n",
                false
            );
        // [player is between 5.5 feet and 6.5 feet in height]
        else if (this.player.tallness < 78)
            this.outx(
                "Marble lowers her head and locks her lips with yours, a show of passion that you eagerly return.  The two of you stay like that for a while, time seeming to standing still.  Then Marble breaks the kiss and looks deeply into your eyes as a sly grin spreads across her face.\n\n",
                false
            );
        // [player is over 6.5 feet in height]
        else
            this.outx(
                "Marble grabs a hold of your head and pulls your mouth to hers for a passionate kiss.  You are only too eager to comply and join in.  Even without her vice grip on your head, it feels like you couldn't possibly leave her wonderful mouth. But you eventually push back and look into her eyes intensely.\n\n",
                false
            );
        // [player has at least one dick]
        if (this.player.totalCocks() > 0) {
            this.outx(
                `The feeling of need is almost palpable within the two of you, and when the time comes, neither of you hesitate. You and Marble push yourselves together, forcing your ${this.cockDescript(
                    0
                )} deep into the soft folds of Marble's sex.  The two of you shudder and bask for a moment in the wonderful feeling of being connected, before gently starting to rock against one another.  Little else matters to you right now other than the warm, loving body that your arms are wrapped tightly around`
            );
            // [player height is between 4 feet and 5 feet]
            if (this.player.tallness >= 48 && this.player.tallness <= 60)
                this.outx(", the breasts your head is clamped between,");
            this.outx(
                ` and the warm folds where your ${this.cockDescript(
                    0
                )} is embedded.  You can't help but think about how wonderful a person Marble is, and you bet that Marble feels the same way about you.  "<i>I love you sweetie.</i>" Marble says to you gently.  You assure her that you feel the same, and at the moment, nothing else matters.\n\n`,
                false
            );
        }
        // [player only has a vagina]
        else if (this.player.vaginas.length > 0) {
            this.outx(
                `The feeling of need is almost palpable within the two of you.  Marble giggles and reaches behind her to grab something.  She shows you a long double-ended dildo and explains it will connect the two of you.  She pushes one end of it into your ${this.vaginaDescript(
                    0
                )} and the other end into the folds of her own sex.  The two of you shudder and bask for a moment in the wonderful feeling of being connected, before gently starting to rock against one another.  Little else matters to you right now other than the warm, loving body that your arms are wrapped tightly around`
            );
            // [player height is between 4 feet and 5 feet]
            if (this.player.tallness >= 48 && this.player.tallness <= 60)
                this.outx(" and the breasts your head is clamped between");
            this.outx(
                '.  You can\'t help but think about how wonderful a person Marble is, and you bet that Marble feels the same way about you.  "<i>I love you sweetie.</i>" Marble says to you gently.  You assure her that you feel the same, and at the moment, nothing else matters.',
                false
            );
            // (remove vaginal virginity? "Your hymen is torn...")
            this.player.cuntChange(8, true);
            this.outx("\n\n", false);
        }
        // [after either]
        this.outx(
            "Long after the two of you finish your lovemaking, you still continue to hold on to one another.  Eventually Marble ",
            false
        );
        // [player height is under 5.5 feet]
        if (this.player.tallness < 66) this.outx("sets you down and ");
        this.outx(
            'pushes you to arms length and asks you, "<i>If it\'s all right with you, could we live together?</i>"  You hesitate, before explaining that you don\'t think that\'s such a good idea. You explain that you aren\'t from this world, why you came here, and what you\'ve found since doing so.  Marble looks at you for a moment before letting go of you and going over to her bed. Effortlessly, she lifts it up off the ground and turns to you.  "<i>I can pull my weight, so don\'t you dare think I can\'t help you do something so important, champion.</i>"  She says, setting the bed back down.  She barely is able to keep a straight face as she says "<i>champion</i>".  You smile and wonder how could you possibly turn down someone so wonderful?  "<i>Well I guess that settles it, then,</i>" she says happily, "<i>I\'ll move right in.</i>"',
            false
        );
        // (set player lust to 0)
        this.player.orgasm();
    }

    // (camp sex - masturbation aid, she stimulates the player with her breasts)
    // Do more of this later
    private marbleCampFuckFUCKFUCKFUCK(): void {
        this.spriteSelect(41);
        this.marbleCampSexNew();
    }

    // (anytime player has no genitals, except when Masturbating)
    // (this part would only need a slight variation for taurs)
    private marbleGenderlessNoFuck(): void {
        this.spriteSelect(41);
        this.outx(
            "Just before the two of you start, you remember that you have no genitals.  When you tell Marble this, she is visibly annoyed.  \"<i>Well then, I guess I can't pleasure you, but I suppose you can still pleasure me.</i>\"  You agree, since you don't want to leave Marble hanging after having already agreed to have sex.\n\n",
            false
        );
        this.outx(
            "Marble sits down at the head of her bed and removes her skirt and undergarments.  She spreads her legs wide to give you a full view of her moist lower lips.  She smiles at you and slowly waves you over to her.  You climb up onto the other end of the bed and with a coy grin, you slowly crawl towards her.  Each movement brings the two of you closer until your head is over her hungry slit. She puts both her hands on the back of your head and lowers you towards her waiting sex.  She is covered with a strong sexual animalistic smell that excites you more and more the closer you get.  Finally, your eager tongue slips out of your mouth and pushes against her moist lips before plunging inside of her.\n\n",
            false
        );
        this.outx(
            'You hear Marble give a contented sigh, but her grip on you does not lessen at all. There is no way you could pull away at this point, even if you wanted to.  Your tongue snakes all around her insides, pushing into every crevice it can find and tasting every surface.  You are quite happy doing this until Marble\'s hands push your head to the top of her sex and she tells you breathlessly; "<i>Suck.</i>" You oblige.  Marble quickly lets out a soft sigh sounding almost like a moo, before finally letting go of your head.  "<i>Thank you so much, sweetie, that was great.</i>"',
            false
        );
        // (be sure to do the after sex events for whatever sex scene triggered this one)
        // (increase player lust)
        this.dynStats("lus", 40);
    }

    public marbleStatusChange(affection: number, addiction: number, isAddicted = -1): void {
        if (this.player.findStatusAffect(StatusAffects.Marble) < 0)
            this.player.createStatusAffect(StatusAffects.Marble, 0, 0, 0, 40);
        // Values only change if not brought to conclusion
        if (
            this.player.findPerk(PerkLib.MarblesMilk) < 0 &&
            this.player.findPerk(PerkLib.MarbleResistant) < 0
        ) {
            this.player.addStatusValue(StatusAffects.Marble, 1, affection);
            this.player.addStatusValue(StatusAffects.Marble, 2, addiction);
        }
        if (isAddicted != -1) this.player.changeStatusValue(StatusAffects.Marble, 3, isAddicted);

        trace(`Marble Affection: ${this.player.statusAffectv1(StatusAffects.Marble)}`);
        trace(`Marble Addiction: ${this.player.statusAffectv2(StatusAffects.Marble)}`);
    }

    private applyMarblesMilk(): void {
        this.player.slimeFeed();
        let str = 5;
        let tou = 10;
        // Marble's milk - effect
        // Increases player toughness by 10 and strength by 5 for several hours (suggest 12).
        if (this.player.findStatusAffect(StatusAffects.MarblesMilk) < 0) {
            this.player.createStatusAffect(StatusAffects.MarblesMilk, 12, 0, 0, 0);
            if (this.player.str + 5 > 100) {
                str = 100 - this.player.str;
                if (str < 0) str = 0;
            }
            if (this.player.tou + 10 > 100) {
                tou = 100 - this.player.tou;
                if (tou < 0) tou = 0;
            }
            this.dynStats("str", str, "tou", tou);
            this.player.changeStatusValue(StatusAffects.MarblesMilk, 2, str);
            this.player.changeStatusValue(StatusAffects.MarblesMilk, 3, tou);
        } else {
            this.player.addStatusValue(StatusAffects.MarblesMilk, 1, 12);
        }
        // Prevent duration from going to high.
        if (this.player.statusAffectv1(StatusAffects.MarblesMilk) > 36)
            this.player.changeStatusValue(StatusAffects.MarblesMilk, 1, 36);
        // Remove withdrawl if applicable
        if (this.player.findStatusAffect(StatusAffects.MarbleWithdrawl) >= 0) {
            this.player.removeStatusAffect(StatusAffects.MarbleWithdrawl);
            this.dynStats("tou", 5, "int", 5);
        }
        // The message for the effect wearing off varies depends on your addiction level.
        // If the player is addicted to her milk, they gain the withdrawal effect when it wears off, reducing player's inte and tou by 5
        // Gaining the effect while they are in withdrawal removes the effect.
        // The player becomes addicted when the addiction score crosses over 50 and they drink directly from Marble's teat, they remain addicted until it drops under 25.
    }
    /*
    Milk Withdrawal - effect
    Decreases player inte and tou by 5
    While suffering withdrawal, resting is half as effective as normal, additionally, the player's inte and tou both permanently drop a point for every 8 hours the player rests.
    Effect only ends when the player gains the effect of Marble's Milk, or their addiction level drops to 25 or less.

    Text for withdrawal:
    [sleeping while suffering withdrawal] "Your rest is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.  "
    */

    /* CAMP BONUS SECTION //
    Camp actions for Marble:
    Add a variable for Marble's level of corruption v(4) once she is at camp,
    I will refer to it as player.statusAffectv4(StatusAffects.Marble), replace it with what you will use.
    Its initial value is 40, and will be changed in various events I add later.
    Note that most of these events do not take time to do.
    Marble Menu options:

    Appearance
    Info
    Gathered
    Give Item
    Milk
    Sex
    Talk
    */
    // tion camp
    public interactWithMarbleAtCamp(): void {
        this.spriteSelect(41);
        let gatherEvent;
        let milkEvent;
        let sexEvent;
        let playtime;
        let marbleGoEvent;
        let goEventString = "";
        // Text to display for when the Marble button is pressed
        this.clearOutput();
        if (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] != 2)
            this.outx("How will you interact with Marble?");
        // Reminder to visit Rathazul
        else {
            this.outx(
                '<i>"Hello, sweetie; have you had a chance to talk to that alchemist yet? I’m so close to being pure at last, but I need his help if I’m to get over this last hurdle."</i>',
                true
            );
        }
        /* List the six buttons, first four on the top row, second two on the
        bottom row, the milk and gathered buttons do not appear if Marble has
        nothing to give for them, the talk button does not appear if the player's
        corruption is >=50, or if Marble's corruption is >=60.*/
        if (this.player.itemCount(this.consumables.M__MILK) < 5) milkEvent = this.gotMilk;
        // Determine if marble has an item for the player
        if (this.player.findStatusAffect(StatusAffects.MarbleHasItem) >= 0)
            gatherEvent = this.marbleGathered;
        if (this.flags[kFLAGS.MARBLE_KIDS] > 0) playtime = this.marbleKidsPlaytime;

        if (
            this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] == 3 &&
            this.flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_1] == 0
        ) {
            marbleGoEvent = this.marblePurification
                .murbleShouldGoRunAlongAndGetHerCuntySisterSoTheyCanBeCuntsTogether;
            goEventString = "Go";
        } else if (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] >= 5) {
            marbleGoEvent = this.marblePurification.nursingFromPureMarble;
            goEventString = "Nurse";
        }
        // appearnace/info - always there
        // Sex
        if (this.player.lust >= 33) sexEvent = this.marbleSexExpanded;
        this.choices(
            "Appearance",
            this.marbleAppearance,
            "Talk",
            this.marbleTalkOverhaul,
            "Present",
            gatherEvent,
            "Give Item",
            this.canGiveItem() ? this.giveItem : undefined,
            "Get Milk",
            milkEvent,
            "Release",
            sexEvent,
            "Playtime",
            playtime,
            "Break Up",
            this.breakUpWithMarble,
            goEventString,
            marbleGoEvent,
            "Back",
            this.camp.campLoversMenu
        );
    }

    private marbleTalkOverhaul(): void {
        this.clearOutput();
        this.outx("What do you want to discuss with Marble?");
        this.menu();
        this.addButton(0, "Info", this.marbleInfo);
        if (
            (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] < 5 &&
                this.flags[kFLAGS.MARBLE_LUST] >= 20) ||
            (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] >= 5 &&
                this.flags[kFLAGS.MARBLE_TIME_SINCE_NURSED_IN_HOURS] >= 4)
        ) {
            this.outx(
                "[pg]<b>Marble is fidgeting around uncomfortably, perhaps she needs to be milked?</b>"
            );
            this.addButton(2, "Milking", this.milkMarble);
        }
        if (this.player.cor < 50 && this.player.statusAffectv4(StatusAffects.Marble) < 60)
            this.addButton(1, "Just Talk", this.talkWithMarbleAtCamp);
        this.addButton(9, "Back", this.interactWithMarbleAtCamp);
        if (this.flags[kFLAGS.SLEEP_WITH] != "Marble")
            this.addButton(4, "Sleep With", this.marbleSleepToggle);
        else this.addButton(4, "Sleep Alone", this.marbleSleepToggle);
    }

    private marbleSleepToggle(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.SLEEP_WITH] != "Marble") {
            this.outx('Marble says, "<i>That sounds lovely, Sweetie.</i>"');
            this.flags[kFLAGS.SLEEP_WITH] = "Marble";
        } else {
            this.outx(
                'Marble folds her arms across her bountiful bosom and sighs, "<i>If you say so, Sweetie.</i>"'
            );
            this.flags[kFLAGS.SLEEP_WITH] = "";
        }
        this.menu();
        this.addButton(0, "Next", this.marbleTalkOverhaul);
    }

    private sleepWith(arg = ""): void {
        this.flags[kFLAGS.SLEEP_WITH] = arg;
    }

    // Kid playtime
    private marbleKidsPlaytime(): void {
        this.clearOutput();
        const choices: any[] = [];
        choices[choices.length] = 1;
        if (this.flags[kFLAGS.MARBLE_KIDS] > 1) choices[choices.length] = 2;
        if (this.flags[kFLAGS.MARBLE_KIDS] > 1) choices[choices.length] = 3;
        if (this.flags[kFLAGS.MARBLE_KIDS] > 1) choices[choices.length] = 4;
        if (this.flags[kFLAGS.MARBLE_KIDS] > 1) choices[choices.length] = 5;
        let select: number = choices[MarbleScene.rand(choices.length)];
        if (this.flags[kFLAGS.KID_SITTER] == 2 && this.flags[kFLAGS.ANEMONE_KID] > 0) select = 6;
        // Bovine Saviour (Z)
        // requires exactly 1 kid  (just put it on the RNG; players get knocked up so much and lots of people have 10+ Marble kids already -Z)
        if (select == 1) {
            if (this.flags[kFLAGS.MARBLE_KIDS] == 1 && this.flags[kFLAGS.MARBLE_BOYS] == 1) {
                this.outx(
                    `Your son immediately clops up to you and jumps into your arms.  "<i>${this.player.mf(
                        "Daddy, daddy",
                        "Mommy, mommy"
                    )}!  Play with me!</i>"  You laugh at the boy in your arms, so young and yet full of energy.  He proceeds to rope you into a grand adventure, where you play the parts of the one who searches for a hero to save their camp, and the monster that has to be stopped, and also the monster's hostage that needs to be saved, while she is the great bovine saviour that carries out this grand quest.`
                );
                this.outx(
                    "\n\nThe game finally ends with the bovine saviour victorious over the horde of ravenous monsters  - somewhere along the line it was decided that hostages were no fun and single combat wasn't impressive enough, and you exhausted your theatrical skills to provide a bevy of satisfyingly scary faces and growls - and the people of the land (you) rejoicing.  You're left a bit tired afterwards, but you certainly don't regret having played with your child."
                );
            } else {
                this.outx(
                    `Your daughter immediately clops up to you and jumps into your arms.  "<i>${this.player.mf(
                        "Daddy, daddy",
                        "Mommy, mommy"
                    )}!  Play with me!</i>"  You laugh at the girl in your arms, so young and yet full of energy.  She proceeds to rope you into a grand adventure, where you play the parts of the one who searches for a hero to save their camp, and the monster that has to be stopped, and also the monster's hostage that needs to be saved, while she is the great bovine saviour that carries out this grand quest.`
                );
                this.outx(
                    "\n\nThe game finally ends with the bovine saviour victorious over the horde of ravenous monsters  - somewhere along the line it was decided that hostages were no fun and single combat wasn't impressive enough, and you exhausted your theatrical skills to provide a bevy of satisfyingly scary faces and growls - and the people of the land (you) rejoicing.  You're left a bit tired afterwards, but you certainly don't regret having played with your child."
                );
            }
            // increase fatigue by 10, decrease lust by 5, and decrease libido by 1, advance time by 1 hour
            this.fatigue(10);
        }
        // Tales of adventure (Z)
        // requires at least 2 kids
        if (select == 2) {
            this.outx(
                `When you approach the nursery, the faces of your kids immediately light up and as one they cry out, "<i>${this.player.mf(
                    "Dad",
                    "Mom"
                )}!  Tell us a story!</i>"  They crowd around you, excited at the prospect of hearing of your adventures.  It would seem that, once again, the kids will be the ones that decide what will be happening in your time with them.`
            );
            this.outx(
                "\n\nYou launch into another tale of your exploits (that may or may not have actually happened to you) much to the enjoyment of your little ones.  They listen with rapt attention and smiles on their faces as you talk of your successes, worried looks when you sound like you might be in danger, and great cheers when you do make it out all right."
            );
            // ([corruption check, <=40]
            if (this.player.cor < 66)
                this.outx(
                    "  You do make sure to skip over the items of a more explicit nature throughout."
                );
            this.outx(
                "  Eventually your story comes to an end, and you bid farewell to your kids."
            );
            // increase fatigue by 5 per kid, decrease lust by 5 per kid, and decrease libido by 1, advance time by 1 hour
            this.fatigue(10);
        }
        // Take us to see Auntie (Z)
        if (select == 3) {
            this.outx(
                "Marble calls you over and asks that you take the kids to visit with Whitney - she'd like to do some things around camp while they aren't around.  You nod and turn to your children and tell them it is time to go and visit Auntie Whitney.  \"<i>Yay!</i>\" they shout and all start to crowd around.  You inform Marble that you'll be back in an hour, and proceed to the farm with your children, the youngest one holding your hand shyly."
            );
            this.outx(
                "\n\nThanks to the queer nature of travel in this land, it takes you no time at all to arrive at the edge of Whitney's peaceful island in the demon-blight.  Before long, the girls start to run ahead, eagerly anticipating the visit with the southern belle.  By the time you arrive at Whitney's house, she's already let the mini-Marbles inside, and is entertaining them in her sitting room.  There is an excited cry when she presents them with her latest homemade toy."
            );
            this.outx(
                "\n\nYou join her with the kids and help keep them under control while they play with their Auntie and the toy she's made them.  As tiring as it is for the canine farmer, you can tell that she loves spending time with these kids and listening to their excited voices call her <i>Auntie</i>."
            );
            this.outx(
                "\n\nWhen the hour is nearly up, you tell your offspring that it is time to wind down and get ready to leave.  There are some protests, but they don't last long when Whitney promises a treat to each of them as they leave.  She goes off into the kitchen briefly, and when you've got the girls all ready to leave, she reappears with a tray of muffins, one for each child.  It is with smiling faces full of baked goodness that your kids return to camp."
            );
            // increase fatigue by 5 per kid, decrease lust by 5 per kid, and decrease libido by 1, advance time by 1 hour
            this.fatigue(10);
            // end event
        }
        // Marble teaching her children how to construct small things and work with wood. (Z)
        // requires at least 2 kids
        if (select == 4) {
            this.outx(
                "You notice Marble is sitting on some wood logs with your children.  Curious, you decide to check what exactly is going on."
            );
            this.outx('\n\n"<i>Mommy, it broke again!</i>"');
            this.outx(
                "\n\nApparently, Marble is attempting to teach your children how to properly create wooden structures, starting by constructing small 'houses' and little toys from several pieces of wood.  It would appear "
            );
            if (this.flags[kFLAGS.MARBLE_KIDS] == 2) this.outx("both");
            else this.outx("about half of your children");
            this.outx(" have at least some knack for it.");
            this.outx(
                "\n\nWith infinite motherly patience, Marble sits down next to your children and again shows them how to make the basic supports.  You smile before departing to continue with your other work."
            );
            // end scene
        }
        // Marble asking the PC to take their children for a walk and gather some herbs for supper since she is very tired. (not yet formatted) (Z)
        // requires at least 6 kids
        if (select == 5) {
            this.outx(
                'Marble looks up when you approach and gives you a weary smile.  "<i>Hello, sweetie.</i>"'
            );
            this.outx(
                "\n\nWith a smile of your own, you tell her that she seems a bit too tired to attend your kids for the rest of the day and ask if there's anything you can do to help."
            );
            this.outx(
                '\n\n"<i>S...Sweetie, I can take care of things. I know you\'re busy doing other important...</i>"'
            );
            this.outx(
                "\n\nYou silence her and kindly explain that the kids are your own as well as hers, and therefore you also share some of the responsibility for them; moreover, you can't bear to watch her tired all the time from their sheer numbers.  She smiles again."
            );
            this.outx(
                '\n\n"<i>Thank you.  You really are amazing.  Well, I certainly could use a rest...  And we still have to get some stuff done for dinner, so if you could take them and gather some herbs as spice, it would both give them something to do and be greatly helpful.</i>"'
            );
            this.outx(
                "\n\nWith a nod, you call your brood and announce that all of you will be gathering some important plants for Mommy Marble.  The kids swarm around you and just the walk to the edge of the forest is enough for you to notice how tiring it can be dealing with all of them."
            );
            this.outx(
                `\n\n"<i>${this.player.mf("Daddy", "Mommy")}!  Is this it?  Is this it?</i>"`
            );
            this.outx(
                "\n\nThey're certainly very energetic but have a tendency to simply grab things and ask you if they're the good ones rather than simply gathering what you instruct them to gather.  You swear one has picked out something that looks almost like a poisonous toadstool from your home, and yet another brought you a Whisker Fruit.  You gently collect them and send the kids back out, then quietly dispose of all the hazardous items.  This continues for a while, but eventually your basket is full."
            );
            // no new PG
            // [Int <30]
            if (this.player.inte < 30)
                this.outx(
                    "\n\nHaving gathered the things that looked like they were what Marble might need, you return to camp."
                );
            else if (this.player.inte < 70)
                this.outx(
                    "\n\nYou're well aware of which herbs Marble usually uses as spices and mostly keep to it, through you also gather others you think are safe, wondering if she'd be able to make something of them."
                );
            else
                this.outx(
                    '\n\nYou know Marble\'s "<i>spices</i>" by heart and are well aware of what here can also be used as these.  Gathering them all with your children, you return to camp well-stuffed with them.'
                );
            this.outx(
                `\n\nYour kids are just a little bit tired from all the work and it doesn't seem they'll pester Marble much more today.  One of them even grabs you, complaining, "<i>${this.player.mf(
                    "Daddy",
                    "Mommy"
                )}, I'm sleepy!</i>"  You pat her head and smile, telling her that you'll be home soon enough.`
            );
            this.outx(
                "\n\nApproaching the camp, Marble is already waiting for you and seems a lot more relaxed and rested.  Taking the baskets with the herbs from you, she beams you a beautiful smile, then "
            );
            // [Height below 5 feet]
            if (this.player.tallness < 60)
                this.outx(
                    "grabs you and immediately lifts you up to her chest, giving you a big hug."
                );
            // [Height above 5 feet]
            else this.outx("embraces you strongly, pressing her warm body against yours.");
            this.outx('\n\n"<i>Thank you sweetie.  I love you.</i>"\n\n');
            // increase fatigue by 15, decrease lust by 10, and decrease libido by 1
            this.fatigue(15);
            // Takes 1-2 hours?
            this.inventory.takeItem(this.consumables.W_FRUIT, this.camp.returnToCampUseOneHour);
            // end event
            return;
        }
        if (select == 6) {
            this.anemoneScene.repeatCowSitting();
        }
        if (this.flags[kFLAGS.MARBLE_PLAYED_WITH_KIDS_TODAY] > 0) this.dynStats("lus", -10);
        else this.dynStats("lib", -1, "lus", -10, "cor", -1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Break up with Marble (Z)
    private breakUpWithMarble(): void {
        this.spriteSelect(41);
        this.clearOutput();
        this.outx(
            "Are you sure you want to break up with Marble?  You won't be able to get her back if you do so."
        );
        // player chooses yes or no, no simply returns to the last menu
        this.doYesNo(this.definitelyBreakUpWithWithMarble, this.interactWithMarbleAtCamp);
    }
    // [Yes]
    private definitelyBreakUpWithWithMarble(): void {
        this.spriteSelect(41);
        this.clearOutput();
        this.outx(
            "You approach Marble and tell her that you need a bit of space and some time away from her.  She freezes at your words, and asks you to repeat yourself.  You do so and she nods, her face almost impassive.  \"<i>I guess I'll go back to the farm.  "
        );
        if (this.player.findPerk(PerkLib.MarblesMilk) >= 0)
            this.outx("I'll see you there when you need my milk, alright?");
        else this.outx("I'll see you later then.");
        this.outx('</i>"  Marble collects her things');
        if (this.flags[kFLAGS.MARBLE_KIDS] == 1) this.outx(" and her child");
        else if (this.flags[kFLAGS.MARBLE_KIDS] > 1) this.outx(" and her children");
        this.outx(", and leaves the camp behind.");
        this.doNext(this.playerMenu);
        this.flags[kFLAGS.BROKE_UP_WITH_MARBLE] = 1;
        this.player.removeStatusAffect(StatusAffects.CampMarble);
        this.player.removeStatusAffect(StatusAffects.NoMoreMarble);
    }
    // line for morning milk delivery for dumbass addicts:  \"<i>You make a quick jaunt to the farm to satisfy your addiction; Marble seems less than pleased to see you, but squeezes one teat over a bottle and hands it to you.  You drink it greedily.</i>\"

    // Marble is switched to after addiction farm state

    // Talk
    // Talk to Marble, she will give a quick talk about what the player should consider doing next, comment on how things are going in general, and she will eventually talk about the quest to purify her here once that has been implemented.  The topic of conversation changes if you are too corrupt.
    private talkWithMarbleAtCamp(): void {
        this.spriteSelect(41);
        if (this.player.findStatusAffect(StatusAffects.MarbleSpecials) < 0) {
            this.player.createStatusAffect(StatusAffects.MarbleSpecials, 0, 0, 0, 0);
        }
        this.doNext(this.playerMenu);
        // I don't understand your code enough yet to come up with the conditions for these ifs:
        // General thoughts:
        this.outx(
            "You call Marble over and the two of you sit down on some rocks to chat.  After thinking a bit, you sort through everything that has happened in this strange land, trying to come up with a new story for your bovine friend.  ",
            true
        );
        /* check if the player has encountered a major story event that they
        have not told Marble about, put it in the temp variable if there is,
        otherwise leave it blank*/
        // earliest story event the player has not told Marble about since she joined the player at camp, alternatively, just the most recent event;
        // ACTUALLY TALK ABOUT SHIT
        // The player has met the Goddess Marae
        if (
            this.player.findStatusAffect(StatusAffects.MetMarae) >= 0 &&
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] < 1
        ) {
            this.outx(
                'You tell Marble about your visit with the Goddess Marae.  Marble is very interested in the story and listens closely to your every word.  "<i>To think that there is still a pure Goddess in this world...</i>" she says in wonder afterward, "<i>But what\'s happening to her is so sad.  We should definitely help her if we can.</i>"',
                false
            );
            // Level up!
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] = 1;
        }
        // The player has discovered the factory
        else if (
            this.player.findStatusAffect(StatusAffects.FoundFactory) >= 0 &&
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] < 2
        ) {
            this.outx(
                'You tell Marble you found a demonic factory and relate everything you know about it.  "<i>Be careful in there,</i>" Marble tells you, "<i>I\'m certain that place will consume you if you\'re unprepared.</i>"',
                false
            );
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] = 2;
        }
        // The player has cleared the factory and shut it down
        else if (
            this.player.findStatusAffect(StatusAffects.DungeonShutDown) >= 0 &&
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] < 3
        ) {
            this.outx(
                "You tell Marble about what you found inside the factory.  She is horrified at what was being done to the other champions and assures you that no one should ever <i>belong</i> in a place like that. You continue and tell of the overseer and her fate. Marble reacts with surprise, ",
                false
            );
            if (this.player.findPerk(PerkLib.OmnibusGift) >= 0)
                this.outx(
                    "and hopes that you've learned your lesson about accepting <i>gifts</i> from demons.  ",
                    false
                );
            else
                this.outx(
                    "but concludes that what you did was probably for the best.  At least you didn't fall for her trick.  ",
                    false
                );
            this.outx(
                "Finally, you tell her how you shut down the factory and what happened to the captured champions.  Marble is shocked that some stayed, but says she doesn't think there is much the two of you could do to help them if they're already addicted. \"<i>You should probably just leave them be, for now.</i>\"",
                false
            );
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] = 3;
        }
        // The player has met Marae after doing a shutdown of the factory and smashing the controls
        else if (
            this.player.findStatusAffect(StatusAffects.MaraeComplete) >= 0 &&
            this.player.findStatusAffect(StatusAffects.FactoryOverload) < 0 &&
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] < 4
        ) {
            this.outx(
                "Marble is very happy to hear you helped Marae.  With the factory taken care of and Marae's corruption postponed for some time, the both of you will probably sleep a little easier tonight. ",
                false
            );
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] = 4;
        }
        // The player has met the corrupted Marae after blowing the storage tanks
        else if (
            this.player.findStatusAffect(StatusAffects.MaraeComplete) >= 0 &&
            this.player.findStatusAffect(StatusAffects.FactoryOverload) >= 0 &&
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] < 4
        ) {
            this.outx(
                "Your story about what had happened to Marae seems to have shaken up Marble a little.  Though, you notice that she seems to be getting more and more aroused as you relate your story.  ",
                false
            );
            if (this.player.findPerk(PerkLib.MaraesGiftFertility) >= 0)
                this.outx(
                    "You continue and tell her how your attempt to get Marae's Lithicite turned out.  Marble can't believe you tried that, but when she hears what happened next, her eyes go wide and she actually starts masturbating in front of you.  At the end of your tale, however, Marble looks more concerned than aroused.  She hopes you won't have too much trouble with pregnancies. That seemed to have killed the mood for her, too.",
                    false
                );
            // [[EDITOR'S NOTE: The original said "I can't believe that tried that." I was unsure about the context, if it originally meant 'you tried that' or 'it tried that', so I went with the former. If I'm wrong here, my bad.]]
            else if (this.player.findPerk(PerkLib.MaraesGiftStud) >= 0)
                this.outx(
                    "You continue and tell her how your attempt to get Marae's Lithicite turned out.  Marble can't believe you tried that, but when she hears what happened next, her eyes go wide and she actually starts masturbating in front of you.  At the end of your tale, Marble looks at you a bit nervously and asks, \"<i>So sweetie, does that mean you're going to breed with me?</i>\" <i>Hmm, </i> you think, <i>might not be a bad idea.</i>",
                    false
                );
            // increase the player's lust by 35 if they are under 50, so they can breed right away
            if (this.player.lust < 50) this.dynStats("lus", 35);
            if (
                this.player.findPerk(PerkLib.MaraesGiftFertility) < 0 &&
                this.player.findPerk(PerkLib.MaraesGiftStud) < 0
            ) {
                this.outx(
                    "You finish your tale by recounting how you ran away.  She isn't really sure how to respond to your decision, but Marble does thank you for not leaving her behind and joining Marae.",
                    false
                );
            }
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] = 4;
        }
        // (story) Talk about Zetaz's unexplored lair(Z)
        else if (
            this.flags[kFLAGS.DISCOVERED_DUNGEON_2_ZETAZ] > 0 &&
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] < 5
        ) {
            this.outx(
                "You tell Marble about the cave you found deep in the forest.  For some reason, this seems to bother Marble, but when you ask her what is wrong, she claims it's just a feeling and tells you not to worry about it.  Maybe you should make sure you're ready before you go back there?"
            );
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] = 5;
        }
        // story) Talk about Tel'Adre(Z)
        else if (
            this.player.statusAffectv1(StatusAffects.TelAdre) >= 1 &&
            this.flags[kFLAGS.MARBLE_TELADRE_STORY] == 0
        ) {
            this.outx(
                "This time you've got quite a tale to tell Marble: the last free city in the world, Tel'Adre.  She is quite enthralled by the tale of the many buildings and people who live in its confines, managing to hide away from the demons thanks to the mages in the great tower, but is somewhat saddened when you tell her about how empty much of the city was, and oddly confused about the guards you met at the entrance.  In the end, she seems to decide to check it out on her own, although she doesn't say so openly."
            );
            this.flags[kFLAGS.MARBLE_TELADRE_STORY] = 1;
        }
        // (story) Talk about defeating Zetaz(Z)
        else if (
            this.flags[kFLAGS.DEFEATED_ZETAZ] > 0 &&
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] < 6
        ) {
            this.outx(
                "You tell Marble about your run-in with an old foe in the forest cave.  She tenses up at first, but the obvious fact that you've made it out of there alright relaxes her.  Marble admits that for some reason she felt like you were in great danger, but couldn't figure out why she felt that.  \"<i>Anyway, I'm glad that you managed to take care of your old nemesis... that map sounds interesting, too.  Think it really leads to the demon lord's lair?  It is a bit overwhelming, sweetie, to think that you might actually defeat the demon lord!  Part of me wants to beg you not to go, but I know how driven you are, and I won't stop you from going to fulfill your mission.  Just promise me that you'll make absolutely sure you're ready before you follow that map, okay?</i>\""
            );
            this.flags[kFLAGS.MARBLE_CAMPTALK_LEVEL] = 6;
        }
        // If talked about nothing!
        else
            this.outx(
                "You have no new stories to share with Marble, so you chat for a bit about inconsequential things.",
                false
            );
        // New PG for next stuff
        this.outx("\n\n", false);

        // Comments on next course of action, only mentions main story events and quests the player is undergoing
        this.outx(
            "The topic of conversation turns to your mission and you ask Marble what she thinks you should be doing next.  ",
            false
        );
        // If (player has not yet met Marae)
        if (this.player.findStatusAffect(StatusAffects.MetMarae) < 0) {
            this.outx(
                "\"<i>Well sweetie, I guess you should start with getting to know the place a little better.  Why don't you look some more around the lake outside the farm?  I think that's the safest place to start.</i>\"",
                false
            );
        } else if (
            this.player.findStatusAffect(StatusAffects.MetMarae) >= 0 &&
            this.player.findStatusAffect(StatusAffects.FoundFactory) < 0
        ) {
            // check if the player is far too weak to go to the factory
            if (this.player.level < 3)
                this.outx(
                    "\"<i>I think we should help out Marae and shut down that factory she mentioned was in the mountains, but I don't think you're ready to go into the Mountains yet. They can be brutal - get a little more practice, and make sure you've got a good weapon.</i>\"",
                    false
                );
            else
                this.outx(
                    '"<i> I think we should help out Marae and shut down that factory she mentioned was in the mountains. I have no idea what will happen in there, though, so make sure you\'re as ready as you can be before you go.</i>"\n\n',
                    false
                );
        }
        // Player has found factory but not shut it down.
        else if (
            this.player.findStatusAffect(StatusAffects.FoundFactory) >= 0 &&
            this.player.findStatusAffect(StatusAffects.DungeonShutDown) < 0
        )
            this.outx(
                '"<i>You still haven\'t shut down the factory yet, have you?</i>"  You shake your head.  "<i>Well then go do it!</i>"',
                false
            );
        // (player has completed the factory but has not returned to Marae)
        else if (
            this.player.findStatusAffect(StatusAffects.DungeonShutDown) >= 0 &&
            this.player.findStatusAffect(StatusAffects.MaraeComplete) < 0 &&
            this.player.findStatusAffect(StatusAffects.MetCorruptMarae) < 0
        )
            this.outx(
                '"<i>You haven\'t gone back to Marae yet have you?</i>"  You shake your head.  "<i>Well then go see her!  I\'m sure she really wants to thank you.</i>"',
                false
            );
        // If PC has not yet discovered Zetaz's lair or Tel'Adre (Z)
        else if (
            this.flags[kFLAGS.DISCOVERED_DUNGEON_2_ZETAZ] == 0 ||
            this.player.statusAffectv1(StatusAffects.TelAdre) == 0
        )
            this.outx(
                "\"<i>Well sweetie, maybe you should explore the world more?  From what I've heard from the centaurs who stop by the farm, I'm sure you could find something interesting in the deep forest, or maybe the desert,</i>\" she suggests."
            );
        // (suggestion) If PC has found Tel'Adre, but not Zetaz's lair(Z)
        else if (
            this.flags[kFLAGS.DISCOVERED_DUNGEON_2_ZETAZ] == 0 &&
            this.player.statusAffectv1(StatusAffects.TelAdre) >= 1
        )
            this.outx(
                "\"<i>I was thinking that the deep woods probably still hide secrets from you, sweetie... a few times I've been there, I've noticed large numbers of imps carrying supplies.  Think there could be something to that?</i>\" she asks."
            );
        // (suggestion) if PC has discovered Zetaz's lair, but has not yet found Tel'Adre(Z)
        else if (
            this.flags[kFLAGS.DISCOVERED_DUNGEON_2_ZETAZ] > 0 &&
            this.player.statusAffectv1(StatusAffects.TelAdre) == 0
        )
            this.outx(
                "\"<i>Well... I've seen patrols around the camp before.  They were all wearing the same uniform, so maybe there's some kind of city or armed force out there?  Come to think of it, one time I found some sand where they were standing when they moved on - I bet they're holed up in the desert somewhere!</i>\" she says with conviction."
            );
        // (suggestion) if PC has discovered Zetaz's lair but has not cleared the cave(Z)
        else if (
            this.flags[kFLAGS.DISCOVERED_DUNGEON_2_ZETAZ] > 0 &&
            this.flags[kFLAGS.DEFEATED_ZETAZ] == 0
        )
            this.outx(
                "\"<i>Well, you haven't finished exploring that cave in the woods yet, have you?  Why don't you go there?</i>\" she offers.  She still seems to be a bit bothered by something, but doesn't voice it."
            );
        // Nothing to advise!
        else
            this.outx(
                "\"<i>Well sweetie, this is it. Your mission has been to stop the demons, Lethice is their leader. Once you're ready, you need to go to their high mountain lair and take them down. Make sure you've finished everything else you want to do before you face Lethice, you won't get a second chance.</i>\""
            );
        // OLD else outx("\"<i>Sweetie, you've finished all that there is in the main story of the game so far.  You'll have to wait for Fenoxo to add more,</i>\" she says to you winking. \"<i>In the meantime, explore! There's a lot in here that isn't a part of the main story.  You could also try changing your form and see how that changes each encounter.  Just don't get caught or lose your head, ok sweetie?<i/>\"", false);

        this.doNext(this.interactWithMarbleAtCamp);
    }

    // do a sex scene, use the current camp one for now, this event advances the time by an hour.
    private marbleSexExpanded(): void {
        this.spriteSelect(41);
        this.marbleCampFuckFUCKFUCKFUCK();
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Milk
    // If Marble has been to the farm to get milked since the player last got a bottle, and the player has less than 5 bottles in total, Marble gives the player a bottle.
    // It is important that I can check if there is an item in the player's inventory, if this can't be done, I intend to have inventory items be tied to purifying Marble.
    private gotMilk(): void {
        this.spriteSelect(41);
        this.doNext(this.camp.returnToCampUseOneHour);
        this.outx(
            "You ask Marble for a bottle of her milk, and she happily hands you one.  ",
            true
        );
        this.inventory.takeItem(this.consumables.M__MILK, this.camp.returnToCampUseOneHour);
    }

    private marbleGathered(): void {
        this.spriteSelect(41);
        this.doNext(this.playerMenu);
        // If Marble has found an item, it is collected with this button
        // What she has available is determined either in a fixed order, or at random.  Once an item has been chosen, an appropriate number days must pass before it can be collected from her.
        this.outx(
            "You ask Marble about any supplies she might have found.  She smiles and hands you her latest find.\n\n",
            true
        );
        // items that Marble can find for the player, more to be added later (there aren't many items in the game right now that Marble would bring back for the player):
        // Vitality potion (12 hours or one day)
        if (
            this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] != 1 &&
            this.player.statusAffectv1(StatusAffects.MarbleHasItem) <= 4
        )
            this.inventory.takeItem(this.consumables.VITAL_T, this.camp.returnToCampUseOneHour);
        // Tanned Leather clothes, armor, def: 5 (three days)
        else if (
            this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] != 1 &&
            this.player.statusAffectv1(StatusAffects.MarbleHasItem) <= 7
        )
            this.inventory.takeItem(this.armors.LEATHRA, this.camp.returnToCampUseOneHour);
        // LaBova, cow girl transformation item (if you'll let me put it here, I'd like to use it as part of the purification quest, the player can still get it if they are addicted)
        else this.inventory.takeItem(this.consumables.LABOVA_, this.camp.returnToCampUseOneHour);
        this.player.removeStatusAffect(StatusAffects.MarbleHasItem);
    }

    // Gives general info on how Marble works, and what she can do for the player
    private marbleInfo(): void {
        this.spriteSelect(41);
        this.outx(
            "Marble is a loyal friend and lover who has decided to help you with your quest.  She can be interacted with while she is at camp.  ",
            true
        );
        this.outx(
            "She can share some of her thoughts and give advice on your current situation, or supply you with bottles of her milk and other useful items that she has found while scavenging.  You can also get Marble to consume some of the items you find.\n\n",
            false
        );
        // explain morning drinking sessions if the player is an addict
        if (this.player.findPerk(PerkLib.MarblesMilk) >= 0) {
            this.outx(
                "She will nurse you every morning automatically to satisfy your addiction.  ",
                false
            );
            // otherwise tell the player that drinking bottles of her milk is safe
        } else {
            if (this.flags[kFLAGS.MARBLE_PURIFIED] == 0)
                this.outx(
                    "So long as you don't drink milk from Marble's breasts again, you don't have to worry about getting addicted.  ",
                    false
                );
            else
                this.outx(
                    "Now that she's been purified, you can drink as much of her milk as you like without fear.  "
                );
        }
        this.outx(
            "Once camp improvements have been implemented, you will be able to get her to work on upgrading the camp instead of searching for supplies.",
            false
        );
        this.doNext(this.interactWithMarbleAtCamp);
    }

    private canGiveItem(): boolean {
        if (this.player.hasItem(this.consumables.OVIELIX, 1)) return true;
        if (this.flags[kFLAGS.MARBLE_DICK_TYPE] == 0)
            if (this.player.hasItem(this.consumables.P_DRAFT, 1)) return true;
            else if (this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0) {
                if (this.player.hasItem(this.consumables.PINKEGG, 1)) return true;
                if (this.player.hasItem(this.consumables.L_PNKEG, 1)) return true;
            }
        if (
            this.player.hasItem(this.consumables.PROBOVA, 1) &&
            this.flags[kFLAGS.MARBLE_BOVA_LEVEL] < 2
        )
            return true;
        if (
            this.player.hasItem(this.consumables.P_LBOVA, 1) &&
            this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] == 1
        )
            return true;
        if (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] >= 5) {
            if (this.player.hasItem(this.consumables.P_S_MLK, 1)) return true;
            if (this.player.hasItem(this.consumables.REDUCTO, 1)) return true;
            if (this.player.hasItem(this.consumables.LACTAID, 1)) return true;
        } else if (this.player.findPerk(PerkLib.MarblesMilk) >= 0) return true;
        return false;
    }

    public giveItem(): void {
        this.clearOutput();
        this.outx("What item do you want to give Marble?");
        this.menu();
        if (this.player.hasItem(this.consumables.OVIELIX, 1))
            this.addButton(1, "OviElixir", this.marbleOvulatesLikeMadDawg);
        if (this.flags[kFLAGS.MARBLE_DICK_TYPE] == 0)
            if (this.player.hasItem(this.consumables.P_DRAFT, 1))
                this.addButton(2, "P.Incub Dr", this.MarbleDigsDraftsYo);
            else if (this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0) {
                if (this.player.hasItem(this.consumables.PINKEGG, 1))
                    this.addButton(3, "Pink Egg", this.MarblepinkEgg);
                if (this.player.hasItem(this.consumables.L_PNKEG, 1))
                    this.addButton(4, "L.Pink Egg", this.MarbleLPinkEgg);
            }
        if (
            this.player.hasItem(this.consumables.PROBOVA, 1) &&
            this.flags[kFLAGS.MARBLE_BOVA_LEVEL] < 2
        )
            this.addButton(5, "Pro Bova", this.giveMarbleTheProBovas4Sho);
        if (
            this.player.hasItem(this.consumables.P_LBOVA, 1) &&
            this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] == 1
        )
            this.addButton(6, "P.LaBova", this.marblePurification.giveMarblePureQuestLabova);
        if (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] >= 5) {
            if (this.player.hasItem(this.consumables.P_S_MLK, 1))
                this.addButton(
                    7,
                    "P.SuccMilk",
                    this.marblePurification.purifiedSuccubusMilkForPureMarbles
                );
            if (this.player.hasItem(this.consumables.REDUCTO, 1))
                this.addButton(8, "ReductoBust", this.marblePurification.pureMurbleUsesReducto);
            if (this.player.hasItem(this.consumables.LACTAID, 1))
                this.addButton(0, "Lactaid", this.marblePurification.lactaidForPureMurble);
        }
        // else if (player.findPerk(PerkLib.MarblesMilk) >= 0) addButton(0, "Lactaid", giveMarbleLactaid);
        this.addButton(9, "Back", this.interactWithMarbleAtCamp);
    }

    // The player gives Marble an item, right now only Lactaid will be here, and only if the player is fully addicted
    public giveMarbleLactaid(): void {
        this.spriteSelect(41);
        // Lactaid
        this.player.consumeItem(this.consumables.LACTAID);
        // Give Marble a dose of Lactaid to gain powerful but temporary boost to your stats, it takes an hour to do.
        this.outx(
            'You show Marble the bottle of Lactaid that you found and ask her if she could drink it.  She gives you a knowing smile. "<i>So you want a special treat?  Ok sweetie, give it here.</i>"  She takes the bottle from you and easily drinks the liquid.  Within moments, she gasps and ',
            true
        );
        if (this.player.tallness < 60)
            this.outx(
                'lifts you up to her chest before saying breathlessly saying "<i>Drink now!</i>"  You waste no time obliging her.\n\n',
                false
            );
        else if (this.player.tallness > 72)
            this.outx(
                'breathlessly says"<i>Drink now!</i>"  You waste no time and descend upon her breasts.\n\n',
                false
            );
        else
            this.outx(
                'breathlessly says, "<i>Drink now!</i>"  You quickly move forward to get a drink.\n\n',
                false
            );
        this.outx(
            "What meets your lips surprises you; it feels tastier, healthier, and just plain better than normal.  With an effort, you manage to empty her breasts, even though they seemed to have been filled with more milk than usual.  You feel even more powerful than normal and the whole world seems clearer.  However, Marble seems a little disappointed; it seems the Lactaid's effects on her were only temporary.\n\n",
            false
        );
        // Give the player an increase to their stats of 10 str, 5 tou, and 10 inte for about 24 hours
        this.dynStats("str", 1, "tou", 1, "int", 1);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    /*
    New Marble Masturbation text:
    This was written as a series of if statements and select cases, don't stop at any point to return until the end of the function.
    New function: marbleNips() – returns "nipples" or "quad-nipples" based on what Marble's nipples are
    */
    private marbleCampSexNew(): void {
        this.spriteSelect(41);
        if (this.player.findStatusAffect(StatusAffects.Infested) >= 0) {
            this.outx(
                `  You call Marble over and ask her if she can give you some release.  She smiles at you and gently grips your ${this.cockDescript(
                    0
                )} in one of her hands before recoiling in horror.  "<i>Uh, why don't you take care of that problem of yours in your cock first, sweetie?  Then I'll help you get release.</i>"  It looks like Marble isn't willing to help you get release while you have worms infecting your cock.`
            );
            return;
        }
        // Marble isn't willing to pleasure the PC if her lust is lower than 0
        if (this.flags[kFLAGS.MARBLE_LUST] < 0) {
            this.outx(
                "  You call Marble over to see if she can help you get some release.  She looks at you sourly before saying, \"<i>I'm not in the mood right now, but feel free to use the toy in my bag on yourself.</i>\"  Well, that's generous... er, wait, did she just tell you to go fuck yourself?"
            );
            // end event
            return;
        }
        this.flags[kFLAGS.MARBLE_LUST] = 0;
        // Non nagas && nontaurs
        if (!this.player.isNaga()) {
            // Feeding
            if (
                this.player.findPerk(PerkLib.MarblesMilk) >= 0 &&
                this.player.gender > 0 &&
                MarbleScene.rand(2) == 0
            ) {
                // Marble nursing + release scene (not yet formatted) (Z)
                // Requirements :
                // - PC is not a centaur
                // - PC has a sex
                // - PC has Marble's Milk perk
                this.clearOutput();
                this.outx(
                    "You tell Marble you're a little bit horny and you're wondering if she'd be willing to do something special for you in private.  Hearing you whisper your idea, she giggles and strokes your [face]."
                );
                this.outx(
                    '\n\n"<i>That\'s so cute, sweetie!  Of course I could do that for you.</i>"'
                );
                this.outx("  She leads you by the hand to sit in a more comfortable place.");
                this.outx(
                    "\n\nYou remove the lower part of your [armor] and prepare to lie down, resting right in her lap and placing your head right under her "
                );
                if (this.player.tallness < 66) this.outx("right breast.");
                // [height above 5' 7'']
                else this.outx("left breast.");
                // [+ if height above 8' 6'']
                if (this.player.tallness > 90)
                    this.outx(
                        "  You do need to bend over in order to access her breast as well as allow her access to your groin, but while slightly uncomfortable, your plan is worth the effort."
                    );
                this.outx(
                    `\n\nAt the same time, Marble's right hand is slowly moving down your abdomen, lingering a bit just over your [hips], as she awaits your 'answer'.  Gently, you grab Marble's breast with both hands and slowly guide the ${this.marbleNip()} to your thirsty lips.`
                );
                this.outx('\n\n"<i>Drink, sweetie,</i>" Marble says, "<i>Drink of me.</i>"');
                this.outx(
                    "\n\nTaking the teat into your mouth, you start to suck on it.  It doesn't take long for Marble's milk to start flowing, and when it does she moves her hand lower."
                );
                // ( [Male/Herm]
                if (this.player.hasCock()) {
                    this.outx(
                        `She chuckles as her hand reaches your ${this.multiCockDescriptLight()}.  "<i>You seem quite ready and eager for something, sweetie.</i>"`
                    );
                } else {
                    this.outx(`She chuckles as her hand reaches your ${this.vaginaDescript(0)}.  `);
                    // [Vaginal wetness 0-1]
                    if (this.player.wetness() < 2)
                        this.outx(
                            "\"<i>Oh, sweetie, this just won't do!  It's like you're not looking forward to this at all!</i>\""
                        );
                    // [Vaginal wetness 2-3]
                    else if (this.player.wetness() < 4)
                        this.outx(
                            '"<i>It seems you\'re quite in need of something down here, sweetie...</i>"'
                        );
                    // [Vaginal wetness 4]
                    else if (this.player.wetness() < 5)
                        this.outx(
                            '"<i>My, my, sweetie; this is so wet... are you sure we should stimulate it more?</i>"'
                        );
                    // [Vaginal Wetness 5]
                    else
                        this.outx(
                            '"<i>Oh my, sweetie; it seems like you need to be toweled off...</i>"'
                        );
                }
                this.outx(
                    "\n\nWithout further ado and with a wide smile on her face, she starts moving her hand, stimulating you. In response, you slightly increase the strength with which you suck on her breast and you're rewarded with a stronger flow of milk into your mouth."
                );

                // [Male/herm]
                if (this.player.hasCock()) {
                    this.outx(
                        `\n\nHer hand continues stroking your ${this.cockDescript(
                            0
                        )}, very gently at first, but once you intensify your suckling, she gasps slightly and gives your member an appreciative squeeze, increasing the intensity.  You buck your hips slightly but she just strokes your ${this.hairDescript()} as if to calm you down.`
                    );
                    this.outx(
                        "\n\n\"<i>It doesn't hurt, right?  I want to make you feel good, sweetie...  If you keep sucking me, I'll make you feel very, very good.</i>\""
                    );

                    this.outx(
                        `\n\nYou gently moan into her breast in response, causing her to giggle as she plays with the tip of your ${this.cockDescript(
                            0
                        )}.  She returns to the pumping motion and increases the pace just as you decide you need something to grab onto - and the most pleasant things at hand are her breasts.  Marble gasps in surprise and moans as you rub her breasts while suckling, and starts jerking you off even faster in response.`
                    );
                    // ( [Female Marble]
                    if (this.flags[kFLAGS.MARBLE_DICK_LENGTH] == 0)
                        this.outx(
                            "  Her thighs seem to be rubbing together, and the place you're lying on feels a tiny bit wet, so you assume it isn't only you who's getting more and more excited by this."
                        );
                    else
                        this.outx(
                            "  Her thighs are gently rubbing beneath you, and you feel something hard poking you in the back.  You smile around the nipple you have in your mouth."
                        );
                    // [If balls] : A
                    if (this.player.balls > 0)
                        this.outx(
                            `  As her hand reaches the base of your cock, she stops stroking it to take a moment and gently roll your ${this.ballsDescriptLight()} with her fingers.  "<i>Are these ready to shoot out for me soon, sweetie?</i>"`
                        );
                    // ([If pussy] :
                    if (this.player.hasVagina())
                        this.outx(
                            `  From the base of your cock, her hand moves even lower, gently rubbing your ${this.clitDescript()}.  "<i>This seems to also require some attention...  Maybe later, sweetie, if you do a good job nursing from me.  But right now, I want to see you shoot off,</i>" she says, as her hand moves back to your ${this.multiCockDescriptLight()}.`
                        );
                    this.outx(
                        `\n\nShe starts tugging at and stroking your ${this.cockDescript(
                            0
                        )}, eager to make you cum now.  You buck your hips again and she responds more agressively this time, pushing you back down with her breasts as her touch starts to become unbearable.  "<i>You're close, aren't you, sweetie?  It's okay, I want to see you cum.</i>"`
                    );
                    this.outx(
                        "\n\nWith that said, her stroking becomes unrelenting and you decide to simply give in to the pleasure.  The repeated feeling of her hand moving up and down your shaft, teasing the head and stimulating all along the length, has you shivering, and soon you feel a tingling at the base of your spine.  Her milk flows richly into your mouth, and the comforting taste relaxes you completely and makes it impossible not to give in to the pleasure."
                    );
                    this.outx(
                        "\n\nMoments later, Marble's rapid strokes cause you to ejaculate.  \"<i>There you go!  You've done great, sweetie!</i>\"  Your bottom shakes, causing your member to bob in her grasp as she squeezes out more and more of your cum onto her slimy hand.  You grab her breasts harder from the sudden sensations, causing her to yelp and moan."
                    );
                    if (this.player.cumQ() < 500)
                        this.outx(
                            "  You cover her hand as she keeps jerking you off, squeezing out tiny little droplets once you're done ejaculating."
                        );
                    else if (this.player.cumQ() < 1000)
                        this.outx(
                            '  Your load is as large as always, and ropes of cum fly into the air, covering her arm and your abdomen... and you swear one string even lands of her right breast along the way.  "<i>That\'s it, sweetie, shoot all you have.</i>"'
                        );
                    else
                        this.outx(
                            '  You pretty much cover yourself, Marble, and the surrounding ground with your enormous white load of cum.  She seems numbed from the sheer output you\'re capable of.  "<i>Uh... sweetie...</i>"'
                        );
                    this.outx(
                        '\n\n"<i>Well... that was fun.</i>"  Marble slowly pulls you away from her breast'
                    );
                    if (this.player.cumQ() >= 1000)
                        this.outx(", then wipes the nipple clean on the other");
                    this.outx(
                        '.  "<i>Now, sweetie, if you\'d be so kind to suck on the other one...</i>"'
                    );
                }
                // [Female]
                else {
                    this.outx(
                        `\n\nHer hand moves onto your pleasure button, starting to gently rub your [clit] as her milk flows into your mouth.  When you intensify your suckling, she gasps slightly and slides a finger into your ${this.vaginaDescript(
                            0
                        )}, pumping it in and out as her palm has its way with your [clit].  You buck your hips slightly but she just strokes your ${this.hairDescript()} as if to calm you down.`
                    );
                    this.outx(
                        "\n\n\"<i>That feels good, doesn't it, sweetie?  You should suck my breasts some more, I'd really appreciate that.</i>\""
                    );
                    this.outx(
                        `\n\nYou gently moan into her nipple in response, causing her to giggle as she plays with the tip your ${this.clitDescript()}.`
                    );
                    // ([Normal clit]
                    if (this.player.clitLength < 3)
                        this.outx(
                            "\n\nShe rubs it with care but quite intensely, bringing you a tingling, overwhelming pleasure."
                        );
                    else
                        this.outx(
                            '\n\nShe grabs your clit and strokes it a few times, then grins widely.  "<i>This is kind of perverse, sweetie.  Is this really one of your lady parts?</i>"'
                        );
                    this.outx(
                        "  She returns to pumping her fingers in and out of your pussy and, just as she increases the pace, you decide you need something to grab onto - and the most pleasant things at hand are her breasts.  Marble gasps in surprise and moans as you rub her breasts while suckling, and starts fingering you even faster in response."
                    );
                    // ( [Female Marble]
                    if (this.flags[kFLAGS.MARBLE_DICK_LENGTH] == 0)
                        this.outx(
                            "  Her thighs seem to be rubbing together, and the place you're lying on feels a tiny bit wet, so you assume it isn't only you who's getting more and more excited by this."
                        );
                    else
                        this.outx(
                            "  Her thighs are gently rubbing beneath you, and you feel something hard poking you in the back.  You smile around the nipple you have in your mouth."
                        );

                    this.outx(
                        `\n\nYou're at the edge already, and the fingering of your ${this.vaginaDescript(
                            0
                        )} as well as the rubbing motion against your [clit] soon send you over it.  Thrashing in Marble's embrace, you release your feminine juices all over her hand.`
                    );
                    if (this.player.wetness() >= 4)
                        this.outx(
                            "  Messy as it is, Marble never stops, wanting to make the orgasm as intense as possible."
                        );
                    // ([Squirter]
                    if (this.player.wetness() > 4)
                        this.outx(
                            "  Soon, you're shooting your femcum all over her arm, and she giggles at the intensity and visibility of your orgasm."
                        );
                    this.outx(
                        '\n\n"<i>That was fun,</i>" Marble states, as she slowly pulls you away from her breast.  "<i>Now, sweetie, if you\'d be so kind to suck on the other one...</i>"'
                    );
                }
                // Regardless of gender, continue to here
                this.outx(
                    "\n\nObediently, you rise and sit next to her, bringing her other breast towards your mouth while squeezing it appreciatively.  Marble smiles widely and strokes your head as you start nursing from her; warm, sweet milk flows richly into your mouth.  She seems satisfied at pleasing you like this, and warm eyes look over you as you finish nursing from her."
                );
                this.outx(
                    '\n\nA few moments later, the milk flow diminishes somewhat, and your lover speaks.  "<i>That is enough, sweetie.  Thank you.</i>"  You move away from her breast, but she pulls you in and gives you a kiss.  "<i>It was fun; we can try it again anytime.</i>"'
                );
                // end scene, minus lust, Marblefeed, slimefeed, whatever other shit, plus Marble lust
                this.player.slimeFeed();
                this.flags[kFLAGS.MARBLE_LUST] += 20;
            }
            // ORAL
            else if (MarbleScene.rand(2) == 0 && this.player.gender > 0) {
                this.clearOutput();
                // PC must be (humanoid?) male, female, or herm
                // PC's cock must be less than 10-15 inches long (how much until pushing in all the way would be trouble?)
                this.outx(
                    'You walk up to your big-breasted lover, a feverish look in your eyes.  "<i>Hmm... looks like you need to release some tension, don\'t you sweetie?</i>"  You nod in approbation, '
                );
                if (this.player.hasCock())
                    this.outx(`a tent growing in your ${this.player.armorName}`);
                else if (this.player.hasVagina())
                    this.outx(`a moistness growing under your ${this.player.armorName}`);
                this.outx(
                    " as you keep staring at her tender eyes; you instinctively know she's going to handle your junk with care."
                );
                this.outx(
                    "\n\nThe both of you help each other out of your clothes, caressing and kissing as you hurriedly remove the last hindrance to your mutual lust.  At last you're both completely naked, and "
                );
                if (this.player.hasCock()) {
                    this.outx("[eachCock] throbs");
                } else {
                    this.outx(`your ${this.clitDescript()} quivers in arousal`);
                }
                this.outx(".\n\n");
                this.outx(
                    'Marble gives you a kinky look and coos, "<i>Do you like what you see?  Because I sure do like what I see.</i>"  Her hand goes to your crotch and delivers some teasing squeezes until you can\'t do anything but moan under her gentle fondling.  She smiles at you, happy to see the effect her efforts have on you.  "<i>Relax, sweetie... I really believe you need some more love...</i>"  You trill in excitement as she starts going down on you.'
                );
                this.outx(
                    "\n\nThe contact of her hands has been replaced with a sensation of sweet warmth.  Marble effortlessly licks your groin, "
                );
                if (this.player.hasVagina() && !this.player.hasCock())
                    this.outx(
                        `probing her tongue in your ${this.vaginaDescript(
                            0
                        )}, licking you in the most appropriate places`
                    );
                else
                    this.outx(
                        "wrapping her tongue around your rod of dickflesh, squeezing and pumping beads of pre-cum up your shaft"
                    );
                this.outx(
                    ".  She's doing an amazing job, and you thrash wildly under her smothering tongue assaults."
                );
                // ([vag only/has a cock]
                this.outx("  Marble keeps ");
                if (this.player.hasVagina() && !this.player.hasCock())
                    this.outx("poking your cunt");
                else
                    this.outx(
                        "suckling the juices out of your urethra and literally absorbing the drops of pre-cum as they spurt out of the tip of your junk."
                    );
                // [if multicock]
                if (this.player.cockTotal() > 1)
                    this.outx(
                        "  She alternatively sucks and jerks every cock you have, making sure there isn't a single meat-tower that isn't being taken care of."
                    );
                if (this.player.balls > 0)
                    this.outx(
                        "  Her hands softly rub your [balls], making them churn and swell in pure arousal."
                    );

                this.outx(
                    "\n\nYou moan in ecstasy as her hands and tongue keep ploughing your crotch; impulsively, you grab her head and push her further into your groin, making her effectively "
                );
                if (this.player.gender == 2) this.outx("tongue-fuck");
                else this.outx("deepthroat");
                this.outx(
                    " you.  Your hips thrust back and forth, enjoying the fluid motion of her tongue working over your wet, saliva-slathered genitals."
                );
                // [if cock]
                if (this.player.hasCock()) {
                    this.outx(`  Her lips tightly enclose your ${this.cockDescript(0)}`);
                    if (this.player.cockTotal() > 1) this.outx(" while she strokes another");
                    this.outx(
                        `, acting as an organic cock-ring.  She looks up to you as you watch her lips undulating under the repeated pulsations of your spooge-pumping ${this.cockDescript(
                            0
                        )}.  These cocksuckers are teasing you in the most infuriating way, and you savagely shove more of your prick down her throat, stretching her jaw and making her moan in delight, although her cries of pleasure are muffled by the pecker stuffing her mouth.`
                    );
                }
                // [if vagina]
                else
                    this.outx(
                        `  Her flexible, yet firm tongue really feels like a dong and it keeps provoking you with its prolonged digging. With a mighty thrust, you shove her against your ${this.vaginaDescript()}, forcing the entirety of her oral muscle inside.`
                    );

                this.outx(
                    "\n\nThe luscious passion of her ministrations eventually proves too much for your abused genitals, and with one last ferocious thrust, you unload your juices in Marble's waiting mouth."
                );

                // [if cock]
                if (this.player.hasCock()) {
                    this.outx(
                        "\n\nYour [cock] palpitates, tip twitching on its own against Marble's throat as it liberates your milky essence.  Marble eagerly gulps, drinking with avidity that reminds you of how you "
                    );
                    if (this.player.findPerk(PerkLib.MarblesMilk) >= 0) this.outx("usually");
                    else this.outx("used to");
                    this.outx(" suckle her tits.");
                    // [if high cum production]
                    if (this.player.cumQ() >= 500)
                        this.outx(
                            `  Your ${this.cockDescript(
                                0
                            )} keeps spouting more seed inside her, efficiently distending her belly`
                        );
                    // [if cum production is massive]until she looks ready to give birth.[/]
                    if (this.player.cumQ() > 1500)
                        this.outx(" until she looks ready to give birth.");
                    this.outx(
                        "  Her lips cling to your cum-tube as if her life depended on it; she sucks viciously, milking your junk of every drop of its baby-batter."
                    );
                }
                // [if vagina]
                else
                    this.outx(
                        `\n\nYour ${this.vaginaDescript(
                            0
                        )} quivers and vibrates before releasing a vigorous discharge of fem-spunk, splattering Marble's lips and mouth; she drinks all your juices with an insatiable cum-thirst.  Her tongue explores your insides as if to make sure there's no girlcum left to absorb.`
                    );

                this.outx(
                    "\n\nMarble keeps sucking and licking your junk even after your orgasm in order to make sure not a single drop has been wasted, and in your post-climax dizziness you let her toy with your genitals until she reaches satiation; she only stops when your crotch is completely devoid of cum."
                );
                this.outx(
                    '\n\nShe eventually gets up and gives you a last tired kiss, "<i>Hope I\'ve been helpful this time, sweetie...</i>"  You clean yourselves up and quickly get dressed before parting.'
                );
                // set PC lust to 0
                // reduce sensativity
                // end scene
            } else {
                this.outx(
                    '"<i>You feeling antsy, sweetie?</i>" Marble asks as you walk up to her.  "<i>Don\'t worry; I\'m ready and able to help.</i>"  ',
                    true
                );
                // Select one option based on the sum of the player's and Marble's Corr, similar to the one in regular masterbation
                if (this.player.cor + this.player.statusAffectv4(StatusAffects.Marble) < 66) {
                    this.outx(
                        "The two of you find a secluded place in the camp and slip off your clothes.\n\n",
                        false
                    );
                } else if (
                    this.player.cor + this.player.statusAffectv4(StatusAffects.Marble) <
                    132
                ) {
                    this.outx(
                        "The two of you strip down right there in the middle of camp.\n\n",
                        false
                    );
                } else {
                    this.outx(
                        "You both look around for another member to join in. No one jumps at the offer, so the two of you strip down.\n\n",
                        false
                    );
                }
                // all the foreplay here
                this.outx(
                    "Marble smiles at you and playfully pushes her sizable breasts together a few times before ",
                    false
                );
                // Marble titfucks the players upper body, two variations, boobs and no
                if (this.player.biggestTitSize() > 3) {
                    this.outx(
                        `pressing them against your own ${this.biggestBreastSizeDescript()}.  She giggles slightly as she puts one of them between her mounds and rubs them up and down around it, teasing your ${this.nippleDescript(
                            0
                        )} with her own ${this.marbleNips()}, a trickle of milk leaking out onto your locked chests.`
                    );
                } else {
                    this.outx(
                        "pressing them against your chest.  She rubs them up and down against you as she moves around, making sure she has rubbed each part of your upper body at least three times over.  She is especially happy with moving your head around between her breasts.",
                        false
                    );
                }
                // If Player has at least one dick, Marble titfucks that
                if (this.player.cocks.length > 0) {
                    this.outx(
                        `\n\nShe moves down to your crotch and slips your ${this.cockDescript(
                            0
                        )} between her breasts.  She smiles at you and says, "<i>This is what you were hoping for, right?</i>" before squeezing them together tightly and pushing your ${this.cockDescript(
                            0
                        )} in and out.  You sigh in pleasure and smile down at Marble as she pumps you between her breasts.  But it seems Marble is unsatisfied with only that; she quickens her pace and starts moving each of her breasts up and down opposite each other.`,
                        false
                    );
                    // Multiple dick side note
                    if (this.player.cocks.length > 1) {
                        this.outx(
                            `  Yet still unsatisfied, Marble engulfs and rub the rest of your ${this.multiCockDescriptLight()} within her ample mounds.  `
                        );
                    }
                }
                // If Player has a vagina, Marble titfucks that
                if (this.player.vaginas.length > 0) {
                    this.outx(
                        `\n\nShe slides down your body to rub and caress your ${this.vaginaDescript(
                            0
                        )} with her breasts, sometimes pushing one of her ${this.marbleNips()} inside your ${this.vaginaDescript(
                            0
                        )} and pulling a small gasp from you.  `,
                        false
                    );
                    // If clit is too small to be titfucked...
                    if (this.player.clitLength < 2) {
                        this.outx(
                            `  Marble runs down each of your legs once with her breasts before unexpectedly plunging two of her fingers inside your ${this.vaginaDescript(
                                0
                            )}.`
                        );
                    } else {
                        this.outx(
                            `  Marble then pulls your ${this.clitDescript()} between her breasts and does her best to pump and stimulate it as though it were a cock.`
                        );
                    }
                }
                // If Player is genderless, Marble improvises
                if (this.player.gender == 0) {
                    this.outx(
                        `  She then says, "<i>I think I've found a way to make you cum, sweetie,</i>" with a sly expression.  She moves down from your upper body and starts rubbing and caressing your lower body too. It is extremely arousing, but it doesn't seem to be enough to push you over the edge.  Marble stands up, kisses you and rubs a single finger against the smooth skin of your groin.  You are so close to going over the edge.  Then one of her fingers pushes up against your ${this.assholeDescript()}, causing you to go rigid from the new stimulation.`
                    );
                }
                // Sweet release
                this.outx(
                    "\n\nThe sensations overwhelm you and your body is racked with a powerful orgasm, much stronger than what you might've pulled off on your own.",
                    false
                );
                // If Player has at least one dick
                if (this.player.cocks.length > 0) {
                    // Select one based on overall cum production
                    // I don't know how to determine this, but I assume it would be based on balls and the cum multiplier
                    if (this.player.cumQ() < 25)
                        this.outx(
                            "  In moments, a small amount of your cum is covering Marble's breasts.",
                            false
                        );
                    else if (this.player.cumQ() < 250)
                        this.outx(
                            "  After a few moments, a fair amount of your cum is covering Marble's breasts and face.",
                            false
                        );
                    else if (this.player.cumQ() < 500)
                        this.outx(
                            "  You keep cumming and cumming, until eventually Marble is completely drenched in your cum.",
                            false
                        );
                    else
                        this.outx(
                            "  Your seemingly endless orgasm eventually results in the two of you becoming completely drenched in your cum, as well as a large part of the ground around you.",
                            false
                        );
                }
                // if Player has a vagina
                if (this.player.vaginas.length > 0) {
                    // Select one based on vagina wetness, similarly to the cum production, you should do the logic for this part
                    if (this.player.vaginas[0].vaginalWetness < VAGINA_WETNESS_WET)
                        this.outx(
                            "  As you recover, you see that a small amount of your girly fluids has leaked onto Marble's breasts.",
                            false
                        );
                    else if (this.player.vaginas[0].vaginalWetness <= VAGINA_WETNESS_SLICK)
                        this.outx(
                            "  As you recover, you see that Marble has been covered fairly liberally with your girly fluids.",
                            false
                        );
                    else if (this.player.vaginas[0].vaginalWetness < 5)
                        this.outx(
                            "  As you recover, you see that Marble is decently drenched in your girly fluids.",
                            false
                        );
                    else
                        this.outx(
                            "  It takes you a minute to recover, but upon doing so, you blush and realize just how soaked with fluid you've become.",
                            false
                        );
                }
                // finally some philosophy on what an orgasm would feel like for someone who is genderless
                if (this.player.gender == 0)
                    this.outx(
                        "  It's not quite the same as when you had genitals, but it is undeniably an orgasm.  While it is essentially a pointless orgasm, it's also almost pure in a way.  There is not a feeling inside you but the explosion of pleasure.",
                        false
                    );

                // wrapping things up
                this.outx(
                    "\n\nFinally satisfied with her efforts, Marble stands up and the two of you find a nearby river to get yourselves cleaned off.",
                    false
                );
                // Set player stats for masterbating with Marble,
            }
        }
        // NAGAS
        else {
            this.clearOutput();
            this.outx(
                'You approach Marble and ask her if she can help you get some sexual release.  Marble smiles at you and says, "<i>Well, my slithering sweetie, I think I can.</i>"  She motions for you to lie on your back and stretch out your long body on the warm, cracked earth.  Then she moves to the base of your tail and sits herself down on the ground.'
            );
            this.outx(
                '\n\n"<i>It\'s a long journey to your special place, sweetie; I hope you enjoy the trip,</i>" she says as she runs her fingers down your tail, gently playing with the end.  "<i>Look at this cute little candy, just for me.</i>"  She lifts your tail up to her mouth, then sticks out her inhumanly long tongue and starts to run it around the tip.  The feel of it sends tingles up your spine.  "<i>Aww, did I make you shiver with pleasure, sweetie?</i>"  Marble teases, and sets your tail back down.'
            );
            this.outx(
                '\n\n"<i>Now sweetie, how about a nice tail massage?</i>" she says, putting her hands on the exposed underside of your tail and starting to rub the soft scales.  You sigh softly as she gently moves up your length, massaging your tail with shallow downward strokes.  "<i>Enjoying yourself?  Let me make this even better for you,</i>" she gently intones as she gets close to your groin.  She removes her top, and lowers her large breasts to your serpentine length.  Marble grins at you, then turns around and, pushing her breasts down on your tail, starts to slither herself back down your length, giving you an enticing view of her rump.  All the while, her fingers continue to play with the sensitive underside of your tail just ahead of her soft body.'
            );
            if (this.player.lib >= 50)
                this.outx(
                    "  Quietly, you reach down and hook your fingers into the hem of her clothing, allowing her to pull it half off with her next shift and expose her pussy"
                );
            if (this.flags[kFLAGS.MARBLE_DICK_LENGTH] > 0) this.outx(` and ${this.marbleCock()}`);
            this.outx(
                `.  "<i>Why, you shameless ${this.player.mf(
                    "pervert",
                    "hussy"
                )}!</i>" the cow-girl says in mock-offense, winking at you.`
            );

            this.outx(
                "\n\nWhen she gets back to your tail, she turns around once more, and crawls back towards your upper body, while walking her fingers up your tail again."
            );
            if (this.player.gender > 0) {
                this.outx(
                    "\n\nBy the time she reaches your genital slit, you're panting with pleasure, and exposing your ready "
                );
                if (this.player.hasCock()) {
                    this.outx(this.multiCockDescriptLight());
                    if (this.player.hasVagina()) this.outx(" and ");
                }
                if (this.player.hasVagina()) this.outx(this.vaginaDescript());
                this.outx(
                    ".  \"<i>Well, sweetie, looks like I don't have to go digging for treasure; it's already right here for me,</i>\" she whispers to you.  With one hand she "
                );
                if (this.player.hasCock()) this.outx("grabs your shaft");
                else this.outx("penetrates your pussy");
                this.outx(", while using her long tongue to lick the ");
                if (this.player.hasCock()) this.outx("tip");
                else this.outx("clit");
                this.outx(
                    ".  You cry out in pleasure, and start to wrap your long tail about Marble's shapely body.  You can't hold back for long, and soon reach orgasmic bliss, all while tightly clinging to your cow-girl lover."
                );
                if (this.player.hasCock())
                    this.outx(
                        "  [EachCock] unleashes a load of semen right into her mouth, which she swallows with pink-faced, wanton gusto."
                    );
                if (this.player.hasVagina())
                    this.outx(
                        "  Your [pussy] runs and squirts as you moan, drooling your juices into the little valley where Marble's breasts press against your scales."
                    );
            } else {
                this.outx(
                    `\n\nWhen she reaches where your genitals would be - if you had any - you're panting with pleasure.  Marble gives you a smile and whispers, "<i>Don't worry sweetie, I know just how to make you cum.</i>"  She then hugs your body tightly, reaching her arms around and squeezing and slapping your [butt], while slipping a finger into your ${this.assholeDescript()}.  You gasp at the surprise, but are soon panting even harder.  The fact that she is still rubbing her breasts on your abdomen even as she teases you helps even more, and you can't help but coil your lower body around Marble, rubbing every part of it on her.  In moments, you cry out in bliss as your unusual anal orgasm washes over you.`
                );
            }
            this.outx(
                "\n\nA few minutes later, you release Marble's body from your grip and help her to a standing position with your tail.  She reaches a hand down to you and says, \"<i>I'm glad you had fun, sweetie; let's get you cleaned off, shall we?</i>\""
            );
        }
        this.player.orgasm();
        this.dynStats("sen", -3);
    }
    private marbleNips(): string {
        if (this.player.findStatusAffect(StatusAffects.MarbleSpecials) < 0) {
            this.player.createStatusAffect(StatusAffects.MarbleSpecials, 0, 1, 0, 0);
        }
        // Set nipples to 1 if uninitialized
        if (this.player.statusAffectv2(StatusAffects.MarbleSpecials) == 0)
            this.player.changeStatusValue(StatusAffects.MarbleSpecials, 2, 1);
        if (this.player.statusAffectv2(StatusAffects.MarbleSpecials) == 1) return "nipples";
        if (this.player.statusAffectv2(StatusAffects.MarbleSpecials) == 4) return "quad-nipples";
        return "nipples(MARBLE NIP ERROR)";
    }
    private marbleCock(): string {
        let descript = "";
        // Discuss length one in 3 times.
        if (Math.floor(Math.random() * 3) == 0) {
            if (this.flags[kFLAGS.MARBLE_DICK_LENGTH] < 3) descript = "squat ";
            if (
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] >= 3 &&
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] < 5
            )
                descript = "short ";
            if (
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] >= 5 &&
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] < 7
            )
                descript = "average ";
            if (
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] >= 7 &&
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] < 9
            )
                descript = "long ";
            if (
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] >= 10 &&
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] < 13
            )
                descript = "huge ";
            if (
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] >= 13 &&
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] < 18
            )
                descript = "massive ";
            if (
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] >= 18 &&
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] < 30
            )
                descript = "enormous ";
            if (this.flags[kFLAGS.MARBLE_DICK_LENGTH] >= 30) descript = "towering ";
        }

        // Discuss girth one in 3 times.
        if (Math.floor(Math.random() * 3) == 0) {
            // narrow, thin, ample, broad, distended, voluminous
            if (this.flags[kFLAGS.MARBLE_DICK_THICKNESS] <= 0.75) descript += "narrow ";
            if (
                this.flags[kFLAGS.MARBLE_DICK_THICKNESS] > 1 &&
                this.flags[kFLAGS.MARBLE_DICK_THICKNESS] <= 1.4
            )
                descript += "ample ";
            if (
                this.flags[kFLAGS.MARBLE_DICK_THICKNESS] > 1.4 &&
                this.flags[kFLAGS.MARBLE_DICK_THICKNESS] <= 2
            )
                descript += "broad ";
            if (
                this.flags[kFLAGS.MARBLE_DICK_THICKNESS] > 2 &&
                this.flags[kFLAGS.MARBLE_DICK_THICKNESS] <= 3.5
            )
                descript += "fat ";
            if (this.flags[kFLAGS.MARBLE_DICK_THICKNESS] > 3.5) descript += "distended ";
        }
        const rando = Math.floor(Math.random() * 10);
        if (rando >= 0 && rando <= 4) descript += "cock";
        if (rando == 5 || rando == 6) descript += "prick";
        if (rando == 7) descript += "pecker";
        if (rando > 7) descript += "shaft";
        return descript;
    }

    // Marble Rape scene
    private rapeDAHMARBLEZ(): void {
        this.spriteSelect(41);
        // Note: highlighted stuff needs to have the logic created for that part.
        // This is an expansion for the scene during Marble's initial encounter, when the player chooses rape.
        let raped = false; // records whether or not the player was successful in raping Marble
        this.outx("", true);
        this.outx(
            "You decide that rather than helping her, you are going to roughly manhandle her breasts and rape her.  You suddenly grab at her breasts and squeeze them roughly, at which point she screams and ",
            false
        );
        if (this.player.findPerk(PerkLib.Evade) >= 0) {
            this.outx(
                "tries to slap you.  You easily duck under her hand and start twisting her nipples.  She squeals and begins to go limp under your painful ministrations.  You move her around and force her to kneel, pushing her face down into her bed.  Keeping one of your hands on her nipple, you pull down her skirt and expose her beautiful womanhood and asshole.\n\n",
                false
            );
            raped = true;
        } else if (this.player.str >= 80) {
            this.outx(
                "slaps you.  Unperturbed by the hit, you push her back onto the edge of the bed, much to her dismay.  You forcibly flip her over onto her stomach and her knees hit the ground.  You keep one hand on her back to stop her from getting up and use your other to pull down her skirt, exposing her beautiful womanhood and asshole.\n\n",
                false
            );
            raped = true;
        }
        if (!raped) {
            this.outx(
                "slaps you.  While you are still reeling from the blow, she uses a surprising amount of strength to force you out the door.  She slams it behind you and yells, \"<i>Don't you ever come back!</i>\" through the door. You hear her start to cry as you walk away.  She seems to be much stronger than she looks. You think to yourself that if you see her again, you won't make the mistake of underestimating her. While lost in your thoughts, you stumble and accidentally fall over.  <i>Maybe you'll teach her a lesson once you've stopped seeing stars.</i>  As you try to get up, you stumble in the other direction and fall over again.  <i>Then again, it may not be worth the trouble.</i>",
                false
            );
        }
        // If Marble was overpowered
        if (raped) {
            // dicked players
            if (this.player.cocks.length > 0) {
                this.outx(
                    `Chuckling to yourself, you free your ${this.multiCockDescriptLight()} from your ${
                        this.player.armorName
                    }.  You spend a moment to ask the helpless cow-girl if she is ready, her only response being a whimper, before `
                );
                // If player's main dick is less than 3 inches wide, ie would fit inside Marble
                if (this.player.cocks[0].cockThickness < 3) {
                    // how far in does the player go?
                    if (this.player.cocks[0].cockLength <= 8) {
                        this.outx(
                            `forcing your ${this.cockDescript(0)} in as far as it will go.  `
                        );
                    } else {
                        this.outx(`forcing your ${this.cockDescript(0)} in to the hilt.  `);
                    }
                    // the raping proper
                    this.outx(
                        "With a grunt of pleasure, you start to push in and out while simultaneously manhandling her sensitive breasts.  Her pained cries and squeals only make you hornier and the experience all the more enjoyable for you.  You laugh from the pleasure you're getting at the expense of her pain.  Slapping her ass and marvelling at how it jiggles, you quicken the pace of your thrusts inside her.  Marble gasps at the increased rate, alternating between tones of pleasure and pain.\n\n",
                        false
                    );
                    // is the player corrupt enough to get the fantasy?
                    if (this.player.cor >= 33) this.marbleRapeCorruptFantasy();
                    this.outx(
                        "You taunt her one more time before feeling your body get racked by an orgasm and you blow your load inside her.  ",
                        false
                    );
                    // set player's lust to 0
                    this.player.orgasm();
                }
                // now if the player doesn't fit
                else {
                    this.outx(
                        `attempting to push your ${this.cockDescript(
                            0
                        )} inside her.  Of course, the girth of your ${this.cockDescript(
                            0
                        )} makes this a rather difficult operation, and it becomes clear after a few moments that it just isn't going to fit.  Instead, you contend yourself by rubbing yourself between her ample ass cheeks, occasionally stroking your ${this.multiCockDescriptLight()} in pride.\n\n`,
                        false
                    );
                    // is the player corrupt enough to get the fantasy?
                    if (this.player.cor >= 33) this.marbleRapeCorruptFantasy();
                    this.outx(
                        "You taunt her one more time before feeling your body get racked by an orgasm and you blow your load onto her ass.  ",
                        false
                    );
                    // set player's lust to 0
                    this.player.orgasm();
                }
            }
            // dickless girls
            else if (this.player.vaginas.length > 0) {
                this.outx(
                    "You take a quick look around the room to see if you can find something to make this more enjoyable, and notice a double dildo laying on the end table.  You grab the tool and push it into Marble's womanhood, causing a small gasp of pleasure from her that turns into one of pain as you twist one of her nipples.\n\n",
                    false
                );
                this.outx(
                    `Keeping Marble in place, you get your ${this.vaginaDescript(
                        0
                    )} ready to take in the other end of the dildo before doing so with gusto.  Much to Marble's discomfort, you manipulate the dildo in ways to heighten your own pleasure but give Marble a less enjoyable experience.  You ask her if she likes it, to which she responds with a whine and an attempt to move into a more comfortable position.  You tighten your grip on her, and she freezes again.\n\n`,
                    false
                );
                // is the player corrupt enough to get the fantasy?
                if (this.player.cor >= 33) this.marbleRapeCorruptFantasy();
                this.outx(
                    "You taunt her one more time before feeling your body get racked by a satisfying orgasm from using Marble's own toy against her.  ",
                    false
                );
                // set player's lust to 0
                this.player.orgasm();
            }
            // the genderless option
            else {
                this.outx(
                    "Your lack of genitals makes it difficult to actually rape Marble, but there are other things you can do.  With your free hand, you push one of your fingers into her womanhood, causing Marble to squeal as you start wriggling it around.  Of course, that's just the beginning, as soon there are two fingers in there, and then three.  As each one goes in, there is another gasp from Marble.  You pinch her nipples as your fourth goes in, pulling out a rather interesting gasp of both pain and pleasure.\n\n",
                    false
                );
                // is the player corrupt enough to get the fantasy?
                if (this.player.cor >= 33) this.marbleRapeCorruptFantasy();
                this.outx(
                    "With just one more thing to do, you laugh at Marble before shoving your full fist inside her.  The act results in that familiar gasp of pain and pleasure.  Playing with her is indeed quite satisfying.  ",
                    false
                );
                // Reduce player lust by 20
                this.dynStats("lus", -20);
            }
            // wrapping things up
            this.outx(
                "You close your eyes and revel in the moment before feeling Marble roll over and grab one of your hands.  You open your eyes just in time to see a big hammer-head flying towards your face...  ",
                false
            );
            // The player is knocked out, Set player health to 0
            this.player.takeDamage(9001);
            this.player.HP = 1;
            // Pass several hours
            this.outx(
                "\n\nYou wake up a few hours later laying on the ground, your head feeling like it's been squeezed in a vice.  With some effort, you manage to get yourself to a sitting position and look around.  It looks like you're laying just outside the barn.  Whitney is standing nearby.  She has something akin to a smile on her animalistic face as she tells you: \"<i>Well hun, it seems you've managed to get Marble rather upset.  I reckon you should leave her alone from now on, as I'm sure you've found out the hard way, she is one tough customer.</i>\"  Your aching head is telling you that may be a good idea; but then again, maybe you should teach that cow-girl a lesson for the pain first.",
                false
            );
        }
        this.doNext(this.camp.returnToCampUseFourHours);
        // The follow up fight event can now be triggered, regardless of whether the rape was successful or not.
        this.player.createStatusAffect(StatusAffects.MarbleRapeAttempted, 0, 0, 0, 0);
    }

    // Corruption supplementary text
    // a little fantasy for relly corrupt players, this can come up in multiple places exactly the same, so I figured another function would be a good idea.
    private marbleRapeCorruptFantasy(): void {
        this.spriteSelect(41);
        this.outx(
            "Marble is helpless before your onslaught with your superior position, and you find it immensely enjoyable to have someone trapped under you like this.  You start to fantasize just what it would be like if everyone were like this to you, just from being in your presence.  You imagine a sea of asses and pussies all stuck up in the air for you to rape at your leisure, and none of the owners able to do a damn thing about it.\n\n",
            false
        );
        // do they really want to have this fantasy?  How far are they gone?
        if (this.player.cor >= 66) {
            this.outx(
                "You shake your head, clearing the bizarre fantasy from your mind and returning to the more immediate enjoyment.\n\n",
                false
            );
        } else {
            this.outx(
                'You smile to yourself and think, "<i>One day,</i>" before returning to the more immediate enjoyment.\n\n',
                false
            );
        }
    }

    // Follow up fight
    // player spots Marble while exploring the farm
    public marbleAfterRapeBattle(): void {
        this.spriteSelect(41);
        this.outx(
            "While exploring the farm, you notice the cow-girl that hit you earlier, Marble, coming out of the barn.  You could try confronting her if you want to, or you could just avoid her from now on.",
            true
        );
        // player decides if they want to confront her or not
        // Choose yes/no
        this.doYesNo(this.marbleAfterRapeYes, this.marbleAfterRapeNo);
    }

    // if yes, Marble confronts the player just outside the barn with her hammer in hand
    private marbleAfterRapeYes(): void {
        this.spriteSelect(41);
        // If choice was yes
        this.outx(
            'Deciding to deal with her, you move towards the barn.  However, Marble spots you on your way over and quickly disappears inside.  Just as you get to the entrance, she re-emerges with a large two handed hammer in hand.  "<i>Leave right now, or this hammer is going into your head,</i>" she tells you with an angry look in her eyes and drops into a combat stance.  Will you fight her?',
            true
        );
        // the player decides if they want to fight or not
        // Choose yes/no
        this.doYesNo(this.marbleAfterRapeStartFight, this.marbleAfterRapeNo);
    }

    // if yes, then fight with Marble
    private marbleAfterRapeStartFight(): void {
        this.spriteSelect(41);
        this.outx(
            "You drop into your own combat stance; it's time to get even with her for last time.  ",
            true
        );
        // Do battle with Marble
        this.startCombat(new Marble(), true);
    }

    // if the player leaves, that's it
    private marbleAfterRapeNo(): void {
        this.spriteSelect(41);
        this.outx(
            "You shake your head. It's just not worth the headache to deal with this cow.  You turn around and leave; you aren't going to be seeing her anymore.",
            true
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    public marbleBadEndFollowup(): void {
        this.spriteSelect(41);
        this.outx("", true);
        // Variables for this function:
        // morph – keeps track of player's form (human, dog-morph, centaur)
        let morph = "human";
        if (this.player.lowerBody == LOWER_BODY_TYPE_CENTAUR) morph = "centaur";
        if (this.player.dogScore() >= 4) morph = "dog-morph";
        if (this.player.horseScore() >= 3) {
            if (this.player.lowerBody == LOWER_BODY_TYPE_CENTAUR) morph = "centaur-morph";
            else morph = "equine-morph";
        }
        if (this.player.mutantScore() >= 5) morph = "corrupted mutant";
        if (this.player.minoScore() >= 4) morph = "minotaur-morph";
        if (this.player.cowScore() >= 5) {
            morph = "cow-";
            if (this.player.gender <= 1) morph += "boi";
            else morph += "girl";
        }
        if (this.player.beeScore() >= 4) morph = "bee-morph";
        if (this.player.goblinScore() >= 5) morph = "goblin";
        if (this.player.humanScore() >= 5 && morph == "corrupted mutant")
            morph = "somewhat human mutant";
        if (this.player.lowerBody == LOWER_BODY_TYPE_CENTAUR) morph = "centaur";
        if (this.player.lowerBody == LOWER_BODY_TYPE_CENTAUR) morph = "centaur";
        // gender – keeps track of player's gender (male, female, genderless, or hermaphrodite)
        // pronouns – holds the proper pronouns for the player's gender, he/she, his/hers, him/her (should probably be multiple
        // OH FUCK THIS!
        // approxHeight – short description for approximately how tall is the player is, (very short, short, average height, tall, very tall)
        let approxHeight = "";
        if (this.player.tallness < 54) approxHeight = "very short";
        else if (this.player.tallness < 66) approxHeight = "short";
        else if (this.player.tallness < 72) approxHeight = "average";
        else if (this.player.tallness < 84) approxHeight = "tall";
        else approxHeight = "very tall";
        // very short is probably <4.5 feet, short is between 4.5 and 5.5, average is between 5.5 and 6, tall is between 6 and 7, very tall is > 7.

        // BEGIN BAD-ENDNESS
        this.outx(
            "Over time, the two of you learn to get along and accept the way things have gone.  Before long, the two of you become close friends, then even lovers.  At the same time, you learn the ways of life on the farm and adjust to your new life successfully.  As the months pass, things remain much the same from day to day. Until nearly a year later...\n\n\n",
            false
        );
        // SHIFT ABOVE TO END OF RELEVANT BAD ENDS
        this.outx(
            "The young champion moved quickly towards the barn; he was really looking forward to seeing this 'person he might know' as that dog-girl had described.  Maybe it was another one of the champions!  He thought as he hurried over.\n\n",
            false
        );
        // does he find a human?
        if (morph == "human") {
            this.outx("His eyes light up as he spots a very attractive ");
            // does that person have a noteworthy stature?
            if (approxHeight != "average height") this.outx(`${approxHeight} `);
            this.outx(
                `${this.player.maleFemale()} human leaning against one of the barn doors in a farm hand outfit.  It looks like ${this.player.heShe()}'s taking a break from something.  With a big smile on his face, the young champion strides up to ${this.player.himHer()} and says, "<i>Hello there, it's rare to see a human in this world.</i>"  The other looks up at him for a few moments before smiling in recognition and saying "<i>So they picked you to go after me, huh?</i>"  The young champion stared at the ${this.player.manWoman()} for a few moments, unable to answer, this was better than he could have ever hoped for!  He was looking at last year's champion, ${
                    this.player.short
                }!\n\n`,
                false
            );
            this.outx(
                `"<i>I'm so glad to have found a friend like you in this world, ${this.player.short}. `
            );
        }
        // that's no human!
        else {
            this.outx(
                `However, he is rather surprised to see a ${this.player.maleFemale()} ${morph} leaning against the barn wall next to the entrance.  The young champion approaches the ${morph} with a little trepidation and calls out to them <i>"Hello there, uh, Whitney said I might know you.</i>"  The ${morph} looks up at him for a few moments before smiling in recognition and saying "<i>So they picked you next, huh?</i>"  The young champion starts at this declaration.  "<i>How do you know who I am?</i>" he demands indignantly, "<i>What do you know about my home?</i>" the other chuckles and says, "<i>I'm ${
                    this.player.short
                }, despite my form, I'm still the same person.  Being able to change is one of the joys of this messed up world.</i>"  The young champion looks uncertainly at them for a few moments before realizing that the ${morph} is telling the truth!\n\n`,
                false
            );
            this.outx(
                `"<i>You really are ${this.player.short}!  I can't believe you left your humanity behind, but I'm glad to have found a friend in this world.  `
            );
        }
        // does he comment on the player's height?
        if (approxHeight == "very short" || approxHeight == "short") {
            this.outx("Though I see you've gotten a little shorter then I saw you last.  ");
        } else if (approxHeight == "tall" || approxHeight == "very tall") {
            this.outx("You've gotten bigger since I saw you last.  ");
        }
        this.outx(
            `Could you join me at my camp?  </i>" the younger champion asks, "<i>Your experience would help me out a great deal, and I'd be glad to have another fighter on my side.</i>"  The older champion shakes ${this.player.hisHer()} head and replies, "<i>I'm sorry, but I abandoned my quest some time ago.  There is simply something here that is more important to me than that.</i>"  The younger champion looks at ${this.player.himHer()} in alarm and asks "<i>What could be more important than our mission?</i>"\n\n`,
            false
        );
        this.outx(
            'At that moment, an earthly female voice calls out from inside the barn.  "<i>Sweetie, is that someone you know?</i>"  The older champion smiles and replies to the voice, "<i>Yes Marble, it is.  You should come out and meet him.</i>"  <i>"Alright,</i>" the voice calls back.  ',
            false
        );
        // could the player get Marble pregnant?
        if (this.player.gender == 1 || this.player.gender == 3) {
            this.outx(
                "A tall female cow-girl then steps out of the barn entrance.  The young champion notes just how pretty she is, if a bit imposing, but he also quickly notices that she is quite clearly pregnant.  \n\n",
                false
            );
            this.outx(
                '<i>"Marble,</i>" the older champion says to her, "<i>this is a friend, he\'s actually from my village.  This is Marble, she is the reason I left my mission.  I care about her too much, and she is carrying my child.</i>"  ',
                false
            );
            // mysterious baby?
            if (
                this.player.gender == 3 &&
                this.player.biggestTitSize() >= 2 &&
                this.player.biggestCockArea() < 15
            ) {
                this.outx(
                    `"<i>Wait, your child?!  How?</i>" the younger champion stammers. The older one grins at him and says, "<i>So I'm the first you've met?  Well then...</i>" before dropping her pants and revealing her ${this.multiCockDescriptLight()} and her ${this.vaginaDescript(
                        0
                    )} to him.  The younger champion's jaw drops and he simply stares at her for a time, during which she giggles at him and says, "<i>They're fully functional too.  Would you like to see them in action?</i>"  The younger champion finds he is only able to stammer out an incoherent answer to this.  "<i>I think I'll take that as a 'yes'. Don't worry, it'll be fun.</i>" the older champion says, leading the young one along with Marble back inside the barn.  "<i>Afterwards, maybe I can give you some advice on dealing with this world.</i>"  `
                );
            }
            // if this isn't a herm, then met the family
            else {
                this.outx(
                    '"<i>Really?  Well I guess I should congratulate you on your new family,</i>" the young champion says with a little uncertainty.  "<i>Oh, it\'s not really a new family,<i>" the other responds as a pair of little girls that look very much like little Marbles come running out of the barn, one chasing the other.  "<i>Oh wow, you\'ve found a nice family to join,</i>" the younger champion says, watching the girls run off towards the farm house.  "<i>Were those twins?</i>"  "<i>No,</i>" the older champion responds, "<i>Mili is several weeks older then Aura, but they\'re both my children.</i>"  The younger champion stares at him incredulously before stammering "<i>But how?  They\'re at least a few years old!</i>"  The older champion puts his arm around the younger one\'s shoulder and leads him and Marble inside the barn telling him.  "<i>You have a lot to learn about this world if you\'re going to last.</i>"  ',
                    false
                );
            }
            // girls and those without naughty bits go here
        } else {
            this.outx(
                "A tall female cow-girl then steps out of the barn entrance.  The young champion notes just how pretty she is, if a bit imposing.\n\n",
                false
            );
            this.outx(
                `<i>"Marble,</i.>" the older champion says to her, "<i>this is the new champion, he's actually from my village.  This is Marble, she is the reason I left my mission.  I care about her too much.</i>"  The younger champion looks at the other in confusion.  "<i>What do you mean by that?<i>" he asks ${this.player.himHer()}.  Marble giggles, and invites the older champion to suckle her nipples, which they eagerly begin doing.  "<i>I- what?  Huh?!</i>" the younger champion stammers at the sight, unable to believe his eyes.  "<i>Like my sweetie here said, we have a special relationship,</i>" she tells him smiling, easily recognizing the tell-tale signs of arousal at what he was seeing.  "<i>Does your relationship extend to, um, other things?</i>" he asks a little nervously.  The older champion turns away from Marble's breast and walks over to the younger one, putting ${this.player.hisHer()} arm around the young champion's shoulders.  With a little milk still dripping from ${this.player.hisHer()} mouth, the older champion leads the younger one inside the barn with Marble, saying "<i>Yes, would you care to join us?</i>"  `
            );
        }
        // If Marble is a pusher, she starts to tempt this champion
        if (this.player.statusAffectv3(StatusAffects.Marble) == 1) {
            this.outx(
                'After a moment, "<i>By the way,</i>" Marble\'s voice can be heard from inside saying, "<i>do you like milk?"</i>',
                false
            );
            // dun dun dun!  That was dumb; I apologize for the lame joke.
        }
        // wrap things up
        this.outx("\n\n", false);
        this.outx(
            "You've abandoned your quest due to your inability to refuse Marble, thanks to the effect her milk has on you.  However, you may have a chance to help the next one complete his quest, or maybe you won't.  As it stands now, this is where your story ends.",
            false
        );
        this.getGame().gameOver();
    }

    // BIRTHING OVERWRITES SECKS
    // if(flags[kFLAGS.MARBLE_PREGNACY_INCUBATION] == 1)
    public marblePoopsBaybees(): void {
        // Normal shitz
        if (this.pregnancy.type == PregnancyStore.PREGNANCY_PLAYER) {
            // Gives birth at 28 days
            this.outx(
                '\nMarble rushes up to you with a concerned look on her face.  "<i>Sweetie, it\'s time!  Our child is going to come into the world!</i>"  She squats down and gets you to kneel next to her, putting your hand against her now gaping womanhood.  You can feel that something is starting to come out of the hole, and you start encouraging Marble as she continues to breathe heavily and occasionally grunt from the effort of pushing the child out.\n\n',
                false
            );

            this.outx(
                "As the head comes out of her hole, you can see that it has small nub like horns and cute little bovine ears.  You call to Marble that you can see the head and that it's already starting to look like her.  You hear Marble give a happy laugh between her breaths as she continues to push the child out.  You notice that the smell around Marble is a little different right now, though you can't judge exactly what the difference is.\n\n",
                false
            );
            if (this.flags[kFLAGS.MARBLE_PURIFIED] > 0 && MarbleScene.rand(2) == 0) {
                this.outx(
                    "After only a few short minutes, the child is pushed out by Marble completely and she gives a satisfied sigh.  You look at the child as it starts balling and see that it is infact a young bovine boy that the two of you have brought into the world.  You can already tell he has all the bovine features of his mother, save his gender.  The little boy’s face is a really cute one; you’re sure that he’ll grow up to be a strong handsome man.",
                    false
                );

                // is this Marble's first boy?  Flag n is the number of male children Marble has given birth to
                if (this.flags[kFLAGS.MARBLE_BOYS] == 0) {
                    this.outx(
                        "\n\nWhen you hand the boy to Marble she looks at the boy for a few moments in surprise before putting the crying child to her chest.  The little boy stops crying at once and starts eagerly gobbling down Marble’s milk\n\n",
                        false
                    );

                    this.outx(
                        'You ask her why she hesitated like that.  "<i>Oh?</i>" she starts, looking up at you, "<i>Sorry sweetie, it\'s just that I never thought I would give birth to a boy.  It just never occurred to me.</i>"  Then her expression changes.',
                        false
                    );
                } else {
                    this.outx(
                        "\n\nYou hand Marble the child and she puts the crying child to her chest. The little boy stops crying at once and starts eagerly gobbling down Marble’s milk.",
                        false
                    );
                }

                this.outx(
                    '\n\n"<i>Oh my,"</i> Marble says to you, "<i>Its just as wonderful as when you suckled me when my milk was addictive; I’d forgotten the feeling."</i>  ',
                    false
                );
                this.outx(
                    '\n\nMarble looks at her other breast a moment before looking at you and saying "<i>Still, I think I could use you on the other side.</i>" You oblige her by suckling her other breast.',
                    false
                );

                // since the PC must either be addicted, or have removed Marble’s addictive trait in order to father a child with her, there is no need for a check for addiction here!
                this.outx(
                    "\n\nOnce the two of you have had your fill, Marble puts the child inside the nursery.  The little boy is already starting to look like he is a few years old, and is already trotting around on his little hoofs.  Marble turns to look at you and says, ”<i>Hmm, well Sweetie, I can’t think of a good name right now, I'll figure one out tomorrow.</i>\"",
                    false
                );

                // note that these may have to change, I'm not sure if they'll belong here or not
                this.flags[kFLAGS.MARBLE_BOYS]++; // again, n is the flag for the number of male kids Marble has had
            } else {
                this.outx(
                    "After only a few short minutes, the child is pushed out by Marble completely and she gives a satisfied sigh.  You look at the child as it starts bawling and see that it is indeed a little cow-girl that the two of you have brought into the world.  You can already tell that she has all the bovine features that Marble has",
                    false
                );
                // Does the PC note that she is not a futa?
                // If (Marble has a cock)
                if (this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0)
                    this.outx(
                        ", but you notice that she does not have a cock of any kind. It seems that trait isn't passed on",
                        false
                    );
                this.outx(
                    ".  The little girl's face is a really pretty one; you're sure that she'll grow up to be like her mom.  You hand Marble the child and she puts the crying child to her chest. The little girl stops crying at once and starts eagerly gobbling down Marble's milk.\n\n",
                    false
                );
                // If (PC is addicted to Marble)
                if (this.player.findPerk(PerkLib.MarblesMilk) >= 0) {
                    this.outx(
                        '"<i>Don\'t worry sweetie,</i>" Marble tells you, "<i>somehow I know that she won\'t get addicted."</i>  ',
                        false
                    );
                } else {
                    this.outx(
                        '"<i>Oh my,"</i> Marble says to you, "<i>It\'s just as wonderful as when you suckled me when my milk was addictive; I\'d forgotten the feeling."</i>  ',
                        false
                    );
                }
                this.outx(
                    'Marble looks at her other breast a moment before looking at you and saying "<i>Still, I think I could use you on the other side.</i>" You oblige her by suckling her other breast.\n\n',
                    false
                );
                // since the PC must either be addicted, or have removed Marble's addictive trait in order to father a child with her, there is no need for a check for addiction here!
                this.outx(
                    "Once the two of you have had your fill, Marble puts the child inside the nursery.  The little girl is already starting to look like she is a few years old, and is already trotting around on her little hoofs.  Marble turns to look at you and asks \"<i>Ok, I'll name her ",
                    false
                );
                // Marble chooses a random name from this list, assuming that there isn't already a child with that name, in which case she'll say she can't think of a name, and ask the PC to come up with one.
                if (this.flags[kFLAGS.MARBLE_KIDS] == 0) {
                    this.temp = MarbleScene.rand(10);
                    switch (this.temp) {
                        case 0:
                            this.outx("Aura");
                            break;
                        case 1:
                            this.outx("Miran");
                            break;
                        case 2:
                            this.outx("Lin");
                            break;
                        case 3:
                            this.outx("Mary");
                            break;
                        case 4:
                            this.outx("Bess");
                            break;
                        case 5:
                            this.outx("Tina");
                            break;
                        case 6:
                            this.outx("Rill");
                            break;
                        case 7:
                            this.outx("Wendy");
                            break;
                        case 8:
                            this.outx("Rainy");
                            break;
                        case 9:
                            this.outx("Nicky");
                            break;
                    }
                    this.outx(", yes, that's a good name for her.</i>\"", false);
                } else {
                    this.outx(
                        "...hmm, well Sweetie, I can't think of a good name right now, I'll figure one out tomorrow.</i>\"",
                        false
                    );
                }
            }
            // cow-girl child is added to the nursery, her name is set to \"<i>childName</i>\"
            this.flags[kFLAGS.MARBLE_KIDS]++;
            this.doNext(this.playerMenu);
        }
        // Eggs
        else if (this.pregnancy.type == PregnancyStore.PREGNANCY_OVIELIXIR_EGGS) {
            // Birthing eggs
            // Gives birth as the standard time for eggs
            this.outx(
                "\nYou hear moaning coming from a secluded part of the rocks and go over to investigate.  You find Marble squatted down on the ground with a ",
                false
            );
            // how big is the pile of eggs?
            if (MarbleScene.rand(2) == 0) {
                this.outx(
                    "small pile of eggs next to her.  You ask her what's going on, but Marble stops you and grunts slightly before pushing out one final egg and standing up.  \"<i>Sweetie, I've finished laying the eggs from that elixir,</i>\" she tells you before taking a few breaths and continuing, \"<i>I was actually expecting them to be a bit bigger, but it doesn't really matter.  You're welcome to take one of them, but only one, ok?</i>\"\n\n",
                    false
                );
            } else if (MarbleScene.rand(2) == 0) {
                this.outx(
                    'pile of large eggs next to her.  It looks like a similar egg is coming out of her womanhood right now; it quickly falls to the ground and Marble pushes it into the pile with the others.  It looks she has been at this for a while now. You put your hand on her shoulder and ask her what is going on.  She turns to you and says, "<i>Ah sweetie, just laying the eggs from the elixir.  I think there is one more.</i>"  She grunts and pushes out a final egg, before putting it in the pile with the rest.  "<i>You\'re welcome to take one of them, but only one, ok?</i>"\n\n',
                    false
                );
            } else {
                this.outx(
                    'a rather large pile of eggs under her.  She keeps gasping and moaning as another egg comes plopping down, then another, and another.  You can\'t believe your eyes at how many eggs are coming out, and how much Marble seems to be enjoying it.  After a minute, the eggs stop coming out, but Marble keeps squatting there and grunting.  You walk over to her and grab her shoulders, forcing her to look you in the eye as you tell her that there are no more.  She looks at you blankly for a moment before shaking her head and putting a hand to her stomach.  "<i>Oh sweetie, it looks like I\'ve finished laying those eggs from the elixir.  There were a lot more than I was expecting, I guess I spaced out.  It felt so good...</i>" her eyes start to glaze over again and you give her a shake.  "<i>Oh!  Sorry, uh, go ahead and take one of the eggs, but please, only the one, ok?</i>"\n\n',
                    false
                );
            }
            this.outx(
                "Marble stands up and gives her legs a stretch before clopping off.  You shrug your shoulders and look at the pile of eggs before grabbing the nicest looking one.\n\n",
                false
            );
            // Gain appropriate egg
            // default
            let itype: ItemType;
            // Large eggs
            if (MarbleScene.rand(3) == 1) {
                itype = this.consumables.LARGE_EGGS[
                    MarbleScene.rand(this.consumables.LARGE_EGGS.length)
                ];
            }
            // Small eggs
            else {
                itype = this.consumables.SMALL_EGGS[
                    MarbleScene.rand(this.consumables.SMALL_EGGS.length)
                ];
            }
            if (this.timeQ > 0) this.inventory.takeItem(itype, this.camp.doSleep);
            else this.inventory.takeItem(itype, this.playerMenu);
        }
    }

    public marbleNightSleepFlavor(): boolean {
        this.spriteSelect(41);
        // If player is marble-preggo, she builds nursery
        if (
            this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION] == 0 &&
            this.player.pregnancyType == PregnancyStore.PREGNANCY_MARBLE &&
            this.player.pregnancyIncubation <= 128
        ) {
            this.outx(
                "<b>Citing your pregnant belly, Marble informs you she'll be getting to work on building a nursery for your coming cow-child soon.</b>\n\n",
                false
            );
            this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION]++;
        }
        // PREGGO ALERTZ
        switch (this.pregnancy.eventTriggered()) {
            case 2:
                this.outx(
                    "<b>You notice that Marble seems to have gained some weight.</b>\n\n",
                    false
                ); // 3 days in
                break;
            case 3:
                this.outx(
                    "<b>Marble's belly has gotten a fair bit bigger; she may be pregnant.</b>\n\n",
                    false
                ); // 8 days in
                break;
            case 4:
                this.outx("<b>Marble's belly has gotten bigger; she is obviously pregnant."); // 12 days in
                // (if the nursery has not yet been built, she is forced to start working on it here and her job cannot be changed until it has been finished)
                if (
                    this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION] == 0 &&
                    this.pregnancy.type != PregnancyStore.PREGNANCY_OVIELIXIR_EGGS
                ) {
                    this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION]++;
                    this.outx(
                        "  She lets you know that she'll be busy working on a nursery for her child for a while.",
                        false
                    );
                }
                this.outx("</b>\n\n", false);
                break;
            case 5:
                this.outx(
                    "<b>Marble's pregnancy has advanced further still, though the structure of her body keeps it from slowing her down.</b>\n\n",
                    false
                ); // 18 days in
                break;
            case 6:
                this.outx(
                    "<b>Marble is probably getting close to giving birth, as her belly has gotten very large.</b>\n\n",
                    false
                ); // 24 days in
            default:
        }
        // Both under 30 - no sex
        // Player 60+ & marble 20+ - sex
        // Marble 60+ & player 20+ - service
        // boring
        // PC has worms kills everything.
        if (this.player.findStatusAffect(StatusAffects.Infested) >= 0) {
            if (this.flags[kFLAGS.MARBLE_GROSSED_OUT_BECAUSE_WORM_INFESTATION] != 1) {
                this.outx(
                    `As you go to lie down for the night, you find that Marble has gotten there before you.  You lie down next to her, but you can't help wishing that the two of you could have sex.  Suddenly, you feel Marble's hand grab ahold of your ${this.cockDescript(
                        0
                    )}.  She gives a bit of a squeal as one of the worms starts to move around inside the shaft.  She pulls open the blankets and looks closely at your dick for a few moments before picking up her bedroll and moving to a different part of the camp saying, "<i>${
                        this.player.short
                    }, you get rid of those or I'm not going to sleep next to you or with you.</i>"\n\n`,
                    false
                );
                this.flags[kFLAGS.MARBLE_GROSSED_OUT_BECAUSE_WORM_INFESTATION] = 1;
            }
            return false;
        }
        /// START NEW MARBLE NIGHT LOGIC
        // This section does not happen if Marble's lust is at or over 50, the requests for sex or oral come instead then.
        if (this.player.gender == 0) {
            this.outx(
                "As you and Marble lie down for the night, she whispers into your ear, \"<i>Sweetie, if it isn't too much trouble, I'd really like it if you would grow a penis for me.  If you can't do that, then could you at least get a vagina?  I'll understand if it's too much trouble, I just wanted to get that off my chest...</i>\" After a moment of getting comfortable, the two of you go to sleep.\n\n",
                false
            );
            return false;
        } else if (this.flags[kFLAGS.MARBLE_LUST] < 50 || this.player.gender == 0) {
            this.outx(
                "As you go to lie down for the night, you find that Marble has gotten there before you.  "
            );
            if (this.flags[kFLAGS.MARBLE_LUST] < 0)
                this.outx(
                    "She makes a point of turning to face away from you when you climb into your bedroll.  Looks like she's still annoyed at you."
                );
            else if (this.flags[kFLAGS.MARBLE_LUST] < 20)
                this.outx("She lies next to you contentedly when you climb into your bedroll.");
            else if (this.flags[kFLAGS.MARBLE_LUST] < 30)
                this.outx("Marble gives a soft sigh when you climb into your bedroll.");
            else if (this.flags[kFLAGS.MARBLE_LUST] < 40)
                this.outx("Marble fidgets around a bit when you climb into your bedroll.");
            else this.outx("Marble seems rather worked up when you climb into your bedroll.");
            if (this.player.lust < 33 && this.flags[kFLAGS.MARBLE_LUST] < 20)
                this.outx("  After a few moments of getting comfortable, you drift off to sleep.");
            else if (this.player.lust < 33) {
                this.outx(
                    "  You wonder for a moment if Marble is maybe looking for something more from you."
                );
                // (50% chance of this happening)
                if (MarbleScene.rand(2) == 0) {
                    this.marbleCuddlin();
                } else this.outx("  However, you're not aroused enough to consider sex.");
            } else {
                this.outx("  Do you ask Marble if she'd like to have sex?");
                // [Ask][Don't Ask]
                this.simpleChoices(
                    "Ask",
                    this.atNightAskMarbleForSomeSexMaybe,
                    "Don't Ask",
                    this.playerMenu,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined
                );
                return true;
            }
            this.outx("  ");
        }
        // Marble is really aroused
        // Replaces laying down texts when Marble is at or over 50 lust
        else {
            this.outx(
                'You lie down and notice that Marble hasn\'t gone to bed yet.  You decide not worry about it too much until you hear Marble come clopping up outside.  "<i>Sweetie?</i>" she calls out to you as she crawls in next to you.  "<i>Sweetie, I\'m feeling really horny '
            );
            // if (PC's lust is under minimum to request sex)
            if (this.player.lust < 33) {
                this.outx(
                    'and I know you really aren\'t in the mood, but could you please help me out?</i>"  You sit up and ask her what it is.  She looks at you slightly embarrassed before asking you, "<i>Could you please ',
                    false
                );
                // If (Marble is a herm)
                if (this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0)
                    this.outx(`suck my ${this.marbleCock()}?  I really, really need it.</i>"`);
                else
                    this.outx(
                        'lick my womanhood?  I really want to feel your tongue bring me to release...</i>"',
                        false
                    );
                this.outx("\n\nWill you orally pleasure Marble?");
                // options: yes/no (yes continues the current scene, this is a bit awkward as the current breaks are in the middle of if statements, so new futa/female if statements will need to be added)
                let tailJob;
                // tailjob for futa marble if PC is naga
                if (this.player.isNaga() && this.flags[kFLAGS.MARBLE_DICK_LENGTH] > 0)
                    tailJob = this.giveMarbleTailjobRelease;
                this.simpleChoices(
                    "Yes",
                    this.marbleNomNoms,
                    "No",
                    this.playerMenu,
                    "Tailjob",
                    tailJob,
                    "",
                    undefined,
                    "",
                    undefined
                );
            } else {
                this.outx(
                    '.  I can tell you want this too, so can we please have sex?</i>"  You sit up and consider her request.  Will you have sex with Marble?  If not, you could always offer to give her oral instead.'
                );
                // options: yes/no/oral (yes continues to the next part of the scene as it did before.
                this.simpleChoices(
                    "Yes",
                    this.marbleNightSexIntro,
                    "No",
                    this.playerMenu,
                    "Oral",
                    this.marbleNomNoms,
                    "",
                    undefined,
                    "",
                    undefined
                );
            }
            return true;
        }
        // END NEW NIGHT LOGIC
        // OLD USELESS NOTES
        // ORAL GOEZ HERE
        // marbleNomNoms();
        return false;
    }

    private pcPregWithMarblesKids(): boolean {
        return (
            this.player.pregnancyType == PregnancyStore.PREGNANCY_MARBLE &&
            this.player.pregnancyIncubation <= 280
        );
    }
    private marblePregWithPCKids(): boolean {
        return (
            this.pregnancy.type == PregnancyStore.PREGNANCY_PLAYER &&
            this.pregnancy.incubation <= 280
        );
    }

    private marbleCuddlin(): void {
        this.outx("  Before too long, Marble reaches over and ");
        // Neither PC or Marble are preggers with the other's child
        if (!this.pcPregWithMarblesKids() && !this.marblePregWithPCKids()) {
            // if (PC is 6.5 feet or less tall)
            if (this.player.tallness <= 78)
                this.outx(
                    `pulls your head on top of her chest.  She idly strokes your ${this.hairDescript()} and says, "<i>Sweetie, how about I be your pillow for the night?</i>"  You happily agree, and soon you drift off to the sound of her steady breathing while you lay between her sizable breasts.`
                );
            else
                this.outx(
                    'wraps her arms around you, gently pulling you against her.  "<i>Sweetie, do you mind if we stay like this for a while?</i>"  There is no way you could refuse, and before long, the two of you drift off to sleep in each other\'s arms.',
                    false
                );
        }
        // Preg-cuddles
        else {
            // if (only Marble is heavily pregnant)
            if (this.marblePregWithPCKids() && !this.pcPregWithMarblesKids())
                this.outx(
                    "gently pulls your head to her swollen belly.  \"<i>Listen, sweetie,</i>\" she whispers, \"<i>you can hear our child's heartbeat when it's quiet like this...</i>\"  You hear a gentle thump accompanying Marble's own powerful heartbeat, along with your child's occasional squirms inside Marble.  You sigh and snuggle up against Marble's chest, rubbing her belly with your hand before drifting off to sleep."
                );
            // PC be preggers only
            else if (this.pcPregWithMarblesKids())
                this.outx(
                    'gently pets your swollen belly.  "<i>Sweetie,</i>" she whispers, "<i>I can feel our child.</i>"  She puts her furry ears to your growing belly, gently rubbing it all the while.  After a few moments she snuggles up against your body and the two of you drift off to sleep.'
                );
            else
                this.outx(
                    "pulls your hand to her belly, and puts her own onto yours.  \"<i>The miracle of two lovers carrying each other's child,</i>\" she says.  It certainly isn't something you ever expected to happen, but that doesn't make it any less wonderful.  The two of you drift off to sleep together, hands on each other."
                );
        }
    }
    // Ask for sex
    private atNightAskMarbleForSomeSexMaybe(): void {
        this.clearOutput();
        this.outx("You turn to face Marble, and ");
        // if (Marble's lust is negative)
        if (this.flags[kFLAGS.MARBLE_LUST] < 0) {
            this.outx(
                "see the annoyed back of her head.  Oh right, she's probably not in the mood for this.  You'll have to find another way of satisfying your needs tomorrow."
            );
        } else if (this.flags[kFLAGS.MARBLE_LUST] < 20) {
            this.outx(
                'gently ask her if she wants to fool around.  After a moment you hear her breathe out and she says, "<i>Sorry sweetie, I\'m not feeling up to it right now.</i>"'
            );
            // Marble cuddles the PC
            this.marbleCuddlin();
        } else {
            this.outx(
                'gently ask her if she wants to fool around.  After a moment you hear her breathe out and, with a lewd voice, she says, "<i>I was worried you\'d never ask, sweetie...</i>"'
            );
            // trigger Marble sex
            this.marbleNightSexIntro(false);
            return;
        }
        this.doNext(this.playerMenu);
    }

    // SEKCS
    private marbleNightSexIntro(clear = true): void {
        if (clear) this.clearOutput();
        else this.outx("\n\n");
        // This scene is for non corrupted Marble, and low corruption player.  Until I add more scenes, just use it for everything.
        // Try to find a dick that fits.
        let x: number = this.player.cockThatFits(this.marbleCuntCapacity());
        if (x < 0) x = 0;
        // No sex if dude and too big!
        else if (this.player.gender == 1 && this.player.cockArea(x) > this.marbleCuntCapacity()) {
            this.outx(
                `You lie down next to her, but you can't help wishing that the two of you could have sex.  Suddenly, you feel Marble's hand grab a hold of your ${this.cockDescript(
                    x
                )}.  She sighs and says, "<i>Sweetie, I'm afraid that you won't fit inside me.  Do you think you could get a little smaller, just for me?</i>"  After a moment of getting comfortable, the two of you go to sleep.`
            );
            this.doNext(this.playerMenu);
        }
        // Ok lets light this fire!
        this.outx(
            'At that moment, you feel Marble breathe in your ear, "<i>I know you want this, don\'t you sweetie?</i>"\n\n',
            false
        );
        // If (PC is under 5 feet tall) {
        if (this.player.tallness < 60) {
            this.outx(
                'Marble rolls you onto your back and pulls your head up onto her ample cleavage.  "<i>I want it too. Just relax and let me take care of this.</i>"  Marble keeps your head locked in her cleavage as she uses her other hand to slowly free the two of you of your garments.\n\n',
                false
            );
            this.outx(
                `Your head rests comfortably between Marble's breasts the entire time, her warm breath blowing softly on your hair.  You feel almost completely relaxed, yet incredibly turned on at the same time.  For some reason, it just feels right to lay there and breathe in her scent, enjoying the wonderful love pillows she is forcing you to relax between.  She runs her hand down your ${this.biggestBreastSizeDescript()}, gently cooing to you.  Her hand slips down to your `
            );
            // If (PC has dick) {
            if (this.player.cockTotal() > 0) {
                this.outx(this.multiCockDescriptLight(), false);
                // If (PC both dick and vag)
                if (this.player.hasVagina()) this.outx(" and your ");
            }
            // If (PC has vag)
            if (this.player.hasVagina()) this.outx(this.vaginaDescript(), false);
            this.outx(
                ' and gently caresses you.  She whispers into your ear, "<i>Soon sweetie, soon we\'ll both get what we want.</i>"\n\n',
                false
            );
            this.outx(
                "Finished with removing your clothes and her own, Marble releases her grip on your head and turns your body over.\n\n",
                false
            );
        } else {
            this.outx(
                "She reaches over and puts her hand onto your waist, gently slipping her hand inside your undergarments to touch your ",
                false
            );
            // If (PC has dick) {
            if (this.player.cockTotal() > 0) {
                this.outx(this.multiCockDescriptLight(), false);
                // If (PC both dick and vag)
                if (this.player.hasVagina()) this.outx(" and your ");
            }
            // If (PC has vag)
            if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
            this.outx(" while you slip your own hand into her clothes and ");
            // If (Marble is a herm) {
            if (this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0) {
                this.outx(
                    `gently rub her ${this.marbleCock()}.  After a moment, you move your hand down lower and `
                );
            }
            this.outx(
                " run your fingers down her moist womanhood.  The two of you quiver under each other's ministrations.  Both of you work to quickly free yourselves from your clothing, growing increasingly excited at where things are going.  Free of your garments, you move overtop of Marble.\n\n",
                false
            );
        }
        // If (player is a herm, and their dick can fit inside Marble)
        if (this.player.gender == 3) {
            if (this.player.cockArea(x) <= this.marbleCuntCapacity()) {
                this.outx(
                    '"<i>So sweetie, what part will you be using today?</i>" she asks you.',
                    false
                );
                // Player chooses if they want to use their dick or their vagina.
                this.simpleChoices(
                    "Dick",
                    this.marbleNightSexDudes,
                    "Vagina",
                    this.marbleNightSexChicks,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined
                );
            } else {
                this.outx(
                    `Marble says, "<i>Well sweetie, since that ${this.cockDescript(
                        x
                    )} of yours is too big to fit inside me, let's put that ${this.vaginaDescript(
                        0
                    )} to use.</i>"\n\n`,
                    false
                );
                // GIRL SECKS GOES HERE
                this.doNext(this.marbleNightSexChicks);
            }
        } else {
            // Go to next scene based on the PC's and Marble's attributes
            // DUDEZ
            if (this.player.gender == 1) this.doNext(this.marbleNightSexDudes);
            // CHICKZ
            else this.doNext(this.marbleNightSexChicks);
        }
    }
    // Sex function for if PC is male
    private marbleNightSexDudes(): void {
        this.spriteSelect(41);
        // Try to find a dick that fits.
        let x: number = this.player.cockThatFits(this.marbleCuntCapacity());
        if (x < 0) x = 0;
        this.flags[kFLAGS.MARBLE_LUST] = 0;
        this.outx("", true);
        this.outx(
            `You gently lift yourself up and slide the tip of your ${this.cockDescript(
                x
            )} into her waiting hole.  Ever so slowly, you push yourself further and further in.  Each inch gained brings gentle moans and coos from Marble, encouraging you onward.  `
        );
        // Can the PC's main cock go all the way?
        // If (cock 0 is longer than 8 inches)
        if (this.player.cocks[x].cockLength > 8) {
            this.outx(
                `There is only one thing that will stop your advance: when you reach the end of the line.  "<i>Keep going sweetie, there is room left.  Make sure you fill me all the way.</i>"  With a groan, your ${this.cockDescript(
                    x
                )} hits the furthest part of Marble's confines and you can go no further.\n\n`,
                false
            );
        }
        // otherwise, Marble doesn't mind, she'll hold all of them instead
        else {
            this.outx(
                "Nothing will stop your advance; your cock will be fully enveloped inside Marble's body.  \"<i>That's right sweetie... Ah, let me fully envelop you.</i>\"  With a sigh of satisfaction, your bodies come completely together.\n\n",
                false
            );
        }
        this.outx(
            "You look Marble in the eye and the two of you relish the moment; you are two lovers, connected in the most enjoyable of ways.  ",
            false
        );
        // Is Marble going to take the initiative here?
        if (
            this.player.cor + this.player.lib <
            this.player.statusAffectv4(StatusAffects.Marble) + 10
        ) {
            this.outx(
                "You get so caught up in the moment that Marble takes the initiative. \"<i>Now, now, it's not nice to keep me waiting, sweetie,</i>\" she says before lifting up your hips and repeatedly inserting you inside her at a fair pace.  You're caught off guard and fall forward, ",
                false
            );
            // Do you fall into the boobies?
            if (this.player.tallness < 66) {
                this.outx(
                    "straight back into her ample bosom.  Marble giggles at your predicament, but doesn't stop moving your hips.  Rather than do anything more about it, you decide to just let Marble have her fun. After all, it's not like you aren't enjoying the situation.  You can already feel yourself getting close to release, and from the sound of Marble's breathing, she is too.\n\n",
                    false
                );
            }
            // nah, but if you have boobies, maybe they hit hers?
            else if (this.player.tallness < 84) {
                this.outx(
                    `your ${this.biggestBreastSizeDescript()} pressing against her own lovely pillows.  Marble giggles slightly before giving you a kiss on the lips.  She continues moving your hips the whole time.  Of course, as you start to near your peak, you get your control back and start thrusting into her of your own accord.  You can hear Marble beginning to breathe faster as she moves her hands onto your back.  She holds you tightly and gives you another kiss.\n\n`,
                    false
                );
            }
            // Fun, the PC's breasts fall onto Marble's Face!  If they have them, anyway...
            else {
                if (this.player.biggestTitSize() >= 4) {
                    this.outx(
                        `landing your ${this.biggestBreastSizeDescript()} into Marble's face!  You hear a slight muffled cry underneath you as Marble takes her hands off your hips and lifts you up off of her.  `
                    );
                } else {
                    this.outx(
                        'crashing down on Marble and doing a good job of flattening her breasts under your size.  "<i>Hey!</i>" she cries out, letting go of your hips to lift your body off of her.  ',
                        false
                    );
                }
            }
            this.outx(
                "You look down at her annoyed expression, before grinning at her and beginning to impale her moist and wonderful snatch yourself.  In a moment, her expression changes from a pouty face to one of ecstasy.  The two of you are nearing your peaks now.\n\n",
                false
            );
        }
        // nope the PC is the one
        else {
            this.outx(
                `It isn't enough to hold you back for more than a moment, though, and soon you're thrusting deep inside her at a comfortable rhythm for the two of you.  You smile at her and she smiles back as you start fondling and playing with Marble's lovely pillows.  She starts to run her fingers onto her love button, crying out in pleasure as you continue to thrust your ${this.cockDescript(
                    x
                )} inside her.\n\n`,
                false
            );
            // If (PC's breasts are B cups or bigger)
            if (this.player.biggestTitSize() >= 2)
                this.outx(
                    `You pull your hands back up and begin to run them over your ${this.biggestBreastSizeDescript()}, toying and teasing your nipples as your ${this.cockDescript(
                        x
                    )} continues to pound away at Marble's confines.  Marble soon has her hands on the breasts you vacated, clearly enjoying teasing herself just as much as you are.  The two of you cry out in pleasure from the stimulation; you can feel your orgasm fast approaching.\n\n`,
                    false
                );
            else
                this.outx(
                    `The sensations are quickly becoming too much for you, and you're unable to do anything but focus on the feeling of your ${this.cockDescript(
                        x
                    )} inside her wonderful confines.  Marble grins at your difficulties and teases, "<i>Am I just too much for you, sweetie?  Ah!</i>" She gasps; it seems that you're becoming too much for her too.\n\n`,
                    false
                );
        }
        // ORGASMO
        this.outx(
            "You gasp as you feel your insides churning and the walls of Marble's sex collapsing tightly down on you.  Once again, you've brought each other to the point of blissful orgasm around the same time.  ",
            false
        );
        // let's talk about the PC's cum production
        if (this.player.cumQ() < 250) {
            this.outx(
                `Marble cries out in joy as your ${this.cockDescript(
                    x
                )} unleashes its load within her insides.  `
            );
        } else {
            this.outx(
                "Marble gasps in both pleasure and pain as you fill up her insides to almost bursting, and large amounts of your jizz spill out around her slit.  ",
                false
            );
        }
        // Now, does the PC have more than one cock?  Cum comes out of those too.
        if (this.player.totalCocks() > 1) {
            this.outx("Of course, ");
            if (this.player.totalCocks() > 2) {
                this.outx(`the rest of your ${this.multiCockDescriptLight()}`);
            } else {
                this.outx("your other tool");
            }
            this.outx(" unleashes its own load, liberally covering both of you.  ");
        }
        // does Marble spray her cock?
        if (this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0) {
            this.outx(
                `Trapped between your bodies, Marble's ${this.marbleCock()} spasms and sprays the two of you.`
            );
        }
        // Chance of impregnating Marble (if she is purified or the PC is addicted) based on the PC's cum production
        this.marblePreggoChance(1);
        this.marbleSexFinish();
    }

    // sex function for if PC is female, and Marble is female
    private marbleNightSexChicks(): void {
        this.spriteSelect(41);
        this.flags[kFLAGS.MARBLE_LUST] = 0;
        this.outx("", true);
        if (this.flags[kFLAGS.MARBLE_DICK_TYPE] == 0) {
            this.outx(
                `You gently lift yourself up as Marble produces her double dildo and slips it inside her womanhood.  Smiling at her, you slowly lower your body and impale your ${this.vaginaDescript(
                    0
                )} onto the artificial rod.  `
            );
            // Loosen PC's vagina if they are really tight, also removes virginity
            this.player.cuntChange(14, true);
            // (Message about vagina becoming looser)
            this.outx(
                "After adjusting to the feeling of the shaft inside you, you can't deny what a wonderful feeling it is to be connected like this.  ",
                false
            );
            // Does Marble take the initiative?
            if (
                this.player.cor + this.player.lib <
                this.player.statusAffectv4(StatusAffects.Marble) + 10
            ) {
                this.outx(
                    `Marble gives you a grin and starts lifting your hips up and down, while simultaneously bouncing her own hips.  The combination results in both your ${this.vaginaDescript(
                        0
                    )} and Marble's being pistoned by her double dildo.  The two of you start moaning in unison from the overwhelming feelings, leaving you unable to do anything but let her buckle and bounce you around like a rough wagon, and you love every second of it.\n\n`,
                    false
                );
                this.outx(
                    '"<i>Oh sweetie, am I going too fast for you?  Here, let me give you a chance to catch your breath.</i>"  She offers as she slows down her rapid movement, letting your mind settle back into place.\n\n',
                    false
                );
                // If (PC's breasts are D cup or bigger)
                if (this.player.biggestTitSize() >= 4) {
                    this.outx(
                        `Marble takes her hands off your hips and lets you start to rise and fall on her in your own time.  She still rises up to meet you as you descend and lowers herself down each time you rise, matching your timing, but her hands have a much more pressing concern: your ${this.biggestBreastSizeDescript()}.  Marble starts working her hands expertly to tease and play with your ${this.biggestBreastSizeDescript()}. She seems to know all the right ways to move her fingers, clearly having a lot of experience with her own, and you can't help but moan at the attention.  She giggles and pants in pleasure herself; it seems she may be enjoying this play just as much as you!\n\n`,
                        false
                    );
                } else {
                    this.outx(
                        `Marble decides it would be a good time to start playing with your ${this.biggestBreastSizeDescript()} and starts teasing a ${this.nippleDescript(
                            0
                        )} with one of her hands as the other continues to gently lift you up and down.  You moan a little at her ministrations as she smiles at you and says, "<i>You know, sweetie, maybe those cute little boobies of yours could stand to get a little bigger.  I'm sure I could do some great things to you then.</i>" With a grin still on her face, she gasps and the two of you feel your climaxes approaching.\n\n`,
                        false
                    );
                }
            } // no, no, the PC is much hornier than she is
            else {
                this.outx(
                    "You give a horny moan and start to bounce up and down on her dildo, relishing the feeling of it within your walls.  Marble gasps at the sudden rapid stimulation and starts to writhe on the ground helplessly underneath you.  You grin down at her as you continue your movements of rising, falling and rolling.  You slow down for a moment so you can get a good grip on her ample breasts.\n\n",
                    false
                );
                this.outx(
                    '"<i>Sweetie!</i>" Marble gasps as you start to play with her breasts.  ',
                    false
                );
                // Does Marble help out, or does she go for the PC's breasts?
                if (this.player.biggestTitSize() >= 4) {
                    this.outx(
                        `She reaches her hands up and starts to play with your ${this.biggestBreastSizeDescript()}, flicking and toying with them at the same pace that you play with hers.  The two of you start a friendly little contest to see who can stimulate the other's chest better; all the while, you continue to rise and fall above her.\n\n`,
                        false
                    );
                } else {
                    this.outx(
                        `Marble reaches her hands up and grabs onto yours, pulling them down tightly against her chest.  She gets you to play with each of her ${this.marbleNips()} in turn, making sure that you flick them and tease them in just the right way to get her to cry out in ecstasy again and again.\n\n`,
                        false
                    );
                }
                this.outx(
                    "Within moments, your rapid pistoning on the dildo is pushing the two of you closer and closer to the edge.  ",
                    false
                );
            }
            this.outx(
                `The two of you cry out in orgasm as your ${this.vaginaDescript(
                    0
                )} clamps down on one end of her dildo and her womanhood clamps down on the other end.  `
            );
            // Does this PC have a cock too?
            // If (PC has at least 1 cock)
            if (this.player.totalCocks() > 0) {
                this.outx(
                    `At the same time, your ${this.multiCockDescriptLight()} sprays its own load onto Marble's chest and stomach.  `
                );
            }
            this.outx(
                "The two of you give one more shudder from the wonderful stimulation, before collapsing on top of one another.  ",
                false
            );
        }
        // PC is female, Marble is a herm
        else {
            this.player.slimeFeed();
            this.outx(
                `You gently lift yourself up into the air and guide your ${this.vaginaDescript(
                    0
                )} to the tip of her waiting ${this.marbleCock()}.  You slowly lower your ${this.vaginaDescript(
                    0
                )} onto her quivering ${this.marbleCock()}, gaining inch by inch `
            );
            // is she satisfied?
            // If (player can fit all of her cock and PC is not a virgin) {
            if (
                this.player.vaginalCapacity() >
                this.flags[kFLAGS.MARBLE_DICK_LENGTH] * this.flags[kFLAGS.MARBLE_DICK_THICKNESS]
            ) {
                this.outx(
                    "until she is fully within you.  The two of you shudder in pleasure, and Marble says, \"<i>Oh sweetie, you got it all in there.  Being inside another woman like this is something I'll never really get used to, but I can't deny how good it feels.</i>\"\n\n",
                    false
                );
            }
            // Marble seems to think you can take more than maybe you should be able to take
            else {
                this.outx(
                    `until you bottom out and can take no more of her.  "<i>No more?</i>" Marble asks you a little sadly, "<i>You sure you can't take a little more?</i>" she adds as she starts pushing you down onto her ${this.marbleCock()}. You are forced to stretch to accommodate more of her and you shudder slightly from the strain.  `
                );
                // (Message about vagina becoming looser)
                this.outx(
                    'Marble grins at you and says, "<i>See?  I knew you that you could fit a little more.</i>"\n\n',
                    false
                );
            }
            this.outx(
                "After adjusting to the feeling of her inside you, you can't deny what a wonderful feeling it is to be connected like this.  ",
                false
            );
            // Does Marble take the initiative?
            if (
                this.player.cor + this.player.lib <
                this.player.statusAffectv4(StatusAffects.Marble) + 10
            ) {
                this.outx(
                    `Marble gives you a grin and starts lifting your hips up and down, while simultaneously bouncing her own hips.  The combination results in your ${this.vaginaDescript(
                        0
                    )} being pistoned by her ${this.marbleCock()}.  The two of you start moaning in unison from the overwhelming feelings, leaving you unable to do anything but let her buckle and bounce you around like a rough wagon, and you love every second of it.\n\n`,
                    false
                );
                this.outx(
                    '"<i>Oh sweetie, am I going too fast for you?  Here, let me give you a chance to catch your breath.</i>"  She offers as she slows down her rapid movement, letting your mind settle back into place.  ',
                    false
                );
                if (this.player.biggestTitSize() >= 4) {
                    this.outx(
                        `Marble takes her hands off your hips and lets you start to rise and fall on her in your own time.  She still rises up to meet you as you descend and lowers herself down each time you rise, matching your timing, but her hands have a much more pressing concern: your ${this.biggestBreastSizeDescript()}.  Marble starts working her hands expertly to tease and play with your ${this.biggestBreastSizeDescript()}. She seems to know all the right ways to move her fingers, clearly having a lot of experience with her own, and you can't help but moan at the attention.  She giggles and pants in pleasure herself; it seems she may be enjoying this play just as much as you!\n\n`,
                        false
                    );
                } else {
                    this.outx(
                        `Marble decides it would be a good time to start playing with your ${this.biggestBreastSizeDescript()} and starts teasing a ${this.nippleDescript(
                            0
                        )} with one of her hands as the other continues to gently lift you up and down.  You moan a little at her ministrations as she smiles at you and says, "<i>You know, sweetie, maybe those cute little boobies of yours could stand to get a little bigger.  I'm sure I could do some great things to you then.</i>" With a grin still on her face, she gasps and the two of you feel your climaxes approaching.\n\n`,
                        false
                    );
                }
            }
            // no, no, the PC is much hornier than she is
            else {
                this.outx(
                    `You give a horny moan and start to ride her ${this.marbleCock()}, bouncing up and down on her and relishing the feeling of her within your walls.  Marble gasps at the sudden rapid stimulation and starts to writhe on the ground helplessly underneath you.  You grin down at her as you continue your movements of rising and falling.  You slow down for a moment so you can get a good grip on her ample breasts.\n\n`,
                    false
                );
                this.outx(
                    '"<i>Sweetie!</i>" Marble gasps, as you start to play with her breasts.  ',
                    false
                );
                // Does Marble help out, or does she go for the PC's breasts?
                if (this.player.biggestTitSize() >= 4) {
                    this.outx(
                        `She reaches her hands up and starts to play with your ${this.biggestBreastSizeDescript()}, flicking and toying with them at the same pace that you play with hers.  The two of you start a friendly little contest to see who can stimulate the other's chest better; all the while, you continue to rise and fall above her.\n\n`,
                        false
                    );
                } else {
                    this.outx(
                        `Marble reaches her hands up and grabs onto yours, pulling them down tightly against her chest.  She gets you to play with each of her ${this.marbleNips()} in turn, making sure that you flick them and tease them in just the right way to get her to cry out in ecstasy again and again.\n\n`,
                        false
                    );
                }
                this.outx(
                    `Within moments, your rapid pistoning on her ${this.marbleCock()} is pushing the two of you closer and closer to the edge.  `
                );
            }
            this.outx(
                `The two of you cry out in orgasm as your ${this.vaginaDescript(
                    0
                )} clamps down on her ${this.marbleCock()} as it fills you with its seed.  `
            );
            // Does this PC have a cock too?
            if (this.player.totalCocks() > 0) {
                this.outx("At the same time, ");
                if (this.player.totalCocks() > 1) this.outx("each of ");
                this.outx(
                    `your ${this.multiCockDescriptLight()} sprays its own load onto Marble's chest and stomach.  `
                );
            }
            this.outx(
                "The two of you give one more shudder from the wonderful stimulation, before collapsing on top of one another.  ",
                false
            );
            // Pregnancy chance for PC, ¼ their fertility
            this.player.knockUp(
                PregnancyStore.PREGNANCY_MARBLE,
                PregnancyStore.INCUBATION_MARBLE,
                150
            );
            this.player.cuntChange(
                this.flags[kFLAGS.MARBLE_DICK_THICKNESS] * this.flags[kFLAGS.MARBLE_DICK_LENGTH],
                true
            );
        }
        this.marbleSexFinish();
    }

    private marblePreggoChance(preggerMult: number): void {
        // pregger odds - 20% max
        // 5% base + 1% per 25mLz
        // Fertile perk guarantees it

        // Since sex is no longer something that is expected to happen every few nights, Marble's impregnation chances can be
        // bumped up to more normal levels.  Being impregnated should be the PC's flat fertility, and the base impregnation
        // chance for PC's with normal human cum production should be 15% + 1%/100 ml of production (to a max of +15%) + 5%
        // for each general male fertility perks + 20% for being Merae's stud.

        let preggerOdds = 10;
        // Count cum quantity
        preggerOdds += this.player.cumQ() / 100;
        // Capped at 20
        if (preggerOdds > 20) preggerOdds = 20;
        // Fertility+ perk bumps odds to 25.
        if (this.player.findPerk(PerkLib.FertilityPlus) >= 0) preggerOdds += 5;
        // If has 'stud perk' almost always get her pregnant
        if (this.player.findPerk(PerkLib.MaraesGiftStud) >= 0) preggerOdds += 25;
        preggerOdds *= preggerMult;
        // GET HER PREGNANT
        trace(`MARBLE PREGGO ODDS: ${preggerOdds}`);

        if (
            MarbleScene.rand(100) < preggerOdds &&
            (this.player.findPerk(PerkLib.MarblesMilk) >= 0 ||
                this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] >= 5)
        ) {
            // SHUT UP SHES ALREADY PREGNANT
            if (!this.pregnancy.isPregnant) {
                trace("Marble got PREGNANT!");
                // SHE IS NAU!
                this.pregnancy.knockUpForce(PregnancyStore.PREGNANCY_PLAYER, 720);
            }
        } else {
            trace("Knockup failed");
        }
    }

    private marbleSexFinish(): void {
        this.spriteSelect(41);
        // After all Marble sex
        this.outx(
            "\n\nYou roll to the side and the two of you are soon fast asleep.  You figure you'll clean yourself up in the morning.",
            false
        );
        // Set PC lust to 0
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.doNext(this.camp.doSleep);
    }

    // Pleasing Marble
    private marbleNomNoms(): void {
        this.spriteSelect(41);
        this.flags[kFLAGS.MARBLE_LUST] = 0;
        this.outx("", true);
        // intro for non corrupt Marble
        // outx("You go to lie down and notice that Marble hasn't gone to bed yet.  You decide not worry about it too much until you hear Marble come clopping up beside you.  \"<i>Sweetie?</i>\" she calls out to you as she crawls in next to you.  \"<i>Sweetie, I'm feeling really horny and I know you really aren't in the mood, but could you please help me out?</i>\"  You sit up and ask her how you can help; you could never refuse her.  She looks at you slightly embarrassed before asking you, \"<i>Could you please ", false);
        // If (Marble is a herm) {
        if (this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0) {
            this.player.slimeFeed();
            // outx("suck my " + marbleCock() + "?  I really, really need it.</i>\"", false);
            if (this.player.cor < 30) {
                this.outx(
                    `You aren't really comfortable about doing this, but you can't really turn Marble down.  Especially after you were the one to give her that ${this.marbleCock()}.\n\n`,
                    false
                );
            } else {
                this.outx(
                    `Sucking her tasty-looking ${this.marbleCock()} sounds like it would be a lot of fun and you have no problem agreeing.\n\n`,
                    false
                );
            }
            // sucking her cock scene
            this.outx(
                `Marble lifts up her skirt and gives you a good look at her very erect ${this.marbleCock()}.  You position yourself overtop of her and take a deep breath, taking in her smell.  `
            );
            // is the PC overwhelmed by her animalistic smell?
            if (
                this.player.findStatusAffect(StatusAffects.SlimeCraving) >= 0 ||
                this.player.lib + this.player.cor - this.player.inte > 35
            ) {
                this.outx(
                    `For some reason, your head starts to feel a bit fuzzy from the animalistic smell, and for a moment you forget what you were doing.  It comes back to you quickly, as there is a big juicy ${this.marbleCock()} right there in front of you.  It gives off such a nice smell; it probably tastes really good, too.  You open your mouth and bring yourself closer, taking it inside.\n\n`,
                    false
                );
                this.outx(
                    `You hear a soft sigh and moan above you, "<i>Oh sweetie,</i>" it says in pleasure as you feel something get placed on the back of your head, pushing you forward.  The heady aroma is so strong that you can do nothing more than run your tongue over every part of this wonderful ${this.marbleCock()}, letting the hand guide your movements while you hear happy noises coming from above you.  Those noises and words sound happy, so they make you feel happy too.\n\n`,
                    false
                );
                this.outx(
                    "Finally, you hear a gasp coming from the hand's owner, as a salty fluid starts to fill your mouth.  You swallow it instinctively and relish its taste.  About a minute later, you're finally able to collect your thoughts and realize that you'd lost control for a moment there.  From the satisfied look on Marble's face, it doesn't look like she's aware.  ",
                    false
                );
                // maybe there's a little mino power in there?
                // Reduce PC intelligence by 0.2, increase libido by 0.2
                this.dynStats("int", -0.2, "lib", -0.2);
            }
            // no, you keep your head, for now
            else {
                this.outx(
                    `The animalistic smell makes it a bit hard to think, but you manage to hold your thoughts together.  You steady yourself and lower your head, sticking out your tongue to lick the tip.  Marble moans approvingly and gently pushes on the back of your head, trying to push you down further.  You don't resist and open your mouth wide to take her swollen ${this.marbleCock()} inside.\n\n`,
                    false
                );
                this.outx(
                    `"<i>Oh sweetie, please keep going, this feels so good!</i>"  It takes a moment for you to register that it was Marble that was just talking to you.  The taste of her ${this.marbleCock()} in your mouth has an effect similar to her smell, and it takes more than a bit of concentration to keep your focus.  Despite this, you manage to start pumping her with your mouth, bringing out some very excited noises from above you.  It doesn't take long for Marble to be overwhelmed by the sensations, and she lets out her load of semen into your mouth.  You turn to the side and spit out the semen as Marble takes a moment to steady herself and take a few breaths.  `
                );
            }
        } else {
            // outx("lick my womanhood?  I really want to feel your tongue bring me to release...</i>\"\n\n", false);
            // licking her pussy scene
            this.outx(
                "Marble lifts up her skirt and gives you a clear view of her very wet womanhood.  You lower your head and take a deep breath of her animalistic scent.  It makes you feel a bit giddy and you can feel a wave of arousal pass over you.  You give the walls of her wet box a gentle lick and hear Marble give an approving sigh, before you really get to work.\n\n",
                false
            );
            this.outx(
                "Her taste is almost like honey, and it quickly spurs you on to lick at every part of her walls the best you can.  Marble puts her hand on the back of your head and begins to guide you where she wants you to go.  You push your tongue deeper and deeper inside her, probing every part of her that you can reach.  Though now it seems that Marble wants you to get to the main course; you're soon using your tongue to ease and play with her clit, drawing out more and more excited noises from above you. Finally, you hear her give a cry of joy and her womanhood sprays you with its juices.\n\n",
                false
            );
        }
        // After any scene where the PC pleases Marble:
        this.outx(
            '"<i>Thank you so much sweetie.  Next time if you\'re in the mood, maybe we can have fun together,</i>" says Marble.',
            false
        );
        // Increase PC lust by (random number 0-10) + lib/10
        this.dynStats("lus", MarbleScene.rand(10) + this.player.lib / 10);
        this.doNext(this.playerMenu);
    }

    // Next set of items that can be given to Marble
    // Pure incubus draft
    public MarbleDigsDraftsYo(): void {
        this.spriteSelect(41);
        this.outx("", true);
        this.player.consumeItem(this.consumables.P_DRAFT);
        // gives Marble a 7 inch long, 2 inch thick dick by default, no other effect.  Can only be given while she does not have a dick.
        this.outx("You hand Marble the bottle.  She looks at it for a moment before ");
        if (this.player.statusAffectv4(StatusAffects.Marble) > 60) {
            this.outx(
                "giving you a smile and saying, \"<i>So you want me to partake in corruption, and to have a nice cock to stick my sweet with?</i>\"  You tell her that the bottle has been purified, so it won't give corruption, but otherwise, you're hoping it gives her the <i>additional</i> effect.  She grins at you and downs the bottle.\n\n",
                false
            );
        } else {
            this.outx(
                "looking at you uncertainly and saying, \"<i>Uh, sweetie, I'm not going to drink this demon stuff.  It'll warp my body, and I think this will give me a cock...</i>\"  You assure her that the draft has been purified, so it won't warp her body or corrupt her... aside from that last effect she mentioned, but that's what you want her to get.  She sighs before yielding, and says, \"<i>Ok sweetie, if you really want me to have one, I'll take it for you.</i>\"  She takes a deep breath before drinking the bottle, and grimaces at the taste.\n\n",
                false
            );
        }
        this.outx(
            'Marble drops the potion and grabs at her crotch.  Turning away from you, she gives an excited cry that is a mix between a moo and a moan as her body convulses slightly.  After a moment, she turns back to you and shows her new 7" long and 2" wide human cock.  She gives you a ',
            false
        );
        if (this.player.statusAffectv4(StatusAffects.Marble) > 50) this.outx("big ");
        else this.outx("nervous ");
        this.outx("smile.  <b>Marble is now a hermaphrodite.</b>  ");
        this.doNext(this.camp.returnToCampUseOneHour);
        this.flags[kFLAGS.MARBLE_DICK_TYPE] = 1;
        this.flags[kFLAGS.MARBLE_DICK_LENGTH] = 7;
        this.flags[kFLAGS.MARBLE_DICK_THICKNESS] = 2;
    }

    // Pink egg or large pink egg
    public MarblepinkEgg(): void {
        this.player.consumeItem(this.consumables.PINKEGG);
        this.MarblePEggEffects();
    }
    public MarbleLPinkEgg(): void {
        this.player.consumeItem(this.consumables.L_PNKEG);
        this.MarblePEggEffects();
    }
    private MarblePEggEffects(): void {
        this.spriteSelect(41);
        this.outx("", true);
        // removes her dick, no other effect.  Can only be given if Marble has a dick.
        this.outx(
            'You hand Marble the pink egg.  She looks at it thoughtfully for a moment before her eyes light up in recognition.  "<i>This is one of those magic eggs made from those egg elixirs.  If I remember right, this one removes the male traits of those who eat them.  ',
            false
        );
        if (this.player.statusAffectv4(StatusAffects.Marble) > 50) {
            this.outx(
                'So my sweet, tired of my cock?  Well, what if I like it?  Do you really want me to get rid of it?</i>"  You assure her that yes, you do want her to get rid of it.  She frowns at you in annoyance, but ultimately agrees to take the egg.  "<i>Eventually you\'ll want it back, I\'m sure of it,</i>" she says just before eating the egg.\n\n',
                false
            );
        } else {
            this.outx(
                "So does this mean you don't want me to have a cock anymore, sweetie?</i>\"  You assure her that yes, you don't want her to have it anymore.  She seems relieved by this and admits, \"<i>Thank you sweetie, I don't think I really liked having it,</i>\" before eating the egg.\n\n",
                false
            );
        }
        this.outx(
            `She lifts up her skirt and the two of you watch as her ${this.marbleCock()} is absorbed back into her body.  <b>Marble is now purely female.</b>  `
        );
        this.flags[kFLAGS.MARBLE_DICK_TYPE] = 0;
        this.flags[kFLAGS.MARBLE_DICK_LENGTH] = 0;
        this.flags[kFLAGS.MARBLE_DICK_THICKNESS] = 0;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Ovi-elixir
    public marbleOvulatesLikeMadDawg(): void {
        this.spriteSelect(41);
        this.outx("", true);
        // gives her eggs if she isn't pregnant, speeds pregnancy if she is.  She will refuse to take it if she is visibly pregnant with something other than eggs, and the nursery hasn't been built yet.
        // Marble is visibly pregnant with non-eggs, and the nursery has not been built yet) {
        if (
            this.flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION] < 100 &&
            this.pregnancy.type == PregnancyStore.PREGNANCY_PLAYER
        ) {
            this.outx(
                "Marble refuses to take the elixir to speed up her pregnancy until after she has finished the nursery. ",
                false
            );
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        } else if (this.pregnancy.isPregnant) {
            this.outx(
                "After taking the elixir, Marble's belly rumbles slightly.  You can both tell that her pregnancy has advanced.  ",
                false
            );
            let newIncubation: number = this.pregnancy.incubation - (40 + MarbleScene.rand(30));
            if (newIncubation <= 0) newIncubation = 1;
            this.pregnancy.knockUpForce(this.pregnancy.type, newIncubation);
        } else {
            this.outx(
                "After taking the elixir, Marble tells you that her belly feels full.  It sounds like she'll be laying eggs soon.  ",
                false
            );
            this.pregnancy.knockUpForce(
                PregnancyStore.PREGNANCY_OVIELIXIR_EGGS,
                PregnancyStore.INCUBATION_OVIELIXIR_EGGS + 46
            );
        }
        this.player.consumeItem(this.consumables.OVIELIX);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    /*
    Enhanced LaBova
    // (acquired from Lumi) gives her quad nipples.  Can only be given if Marble has normal nipples.
    \"<i>You hand Marble the bottle of enhanced LaBova.  She looks uncertainly at the \"ENHANCED!\" sticker for a moment before shrugging her shoulders and downing the contents.  After a moment she gasps and grabs at her chest, uncertain of what is happening to her.  After a few seconds, she releases her grip and pulls open her top to look at them.  <b>Each of her breasts are now decorated with sets of four nipples, like the teats of a cow.</b>  She doesn't seem to mind the change, but says that she doesn't particularly want any more changes; so she won't be drinking enhanced stuff anymore.  \"<i>
    Marble's nipples are set to quads
    She gains 4 points of corruption
    */

    public marbleCuntCapacity(): number {
        let size = 36;
        if (this.flags[kFLAGS.MARBLE_BOVA_LEVEL] >= 1) {
            size += 10;
        }
        if (this.flags[kFLAGS.MARBLE_BOVA_LEVEL] >= 2) size += 20;
        if (this.flags[kFLAGS.MARBLE_KIDS] > 0) size += 14;
        return size;
    }

    private giveMurbleProBova(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.MARBLE_BOVA_LEVEL] == 0) {
            this.outx(
                'You hand Marble the bottle of ProBova.  She considers it for a few moments before looking at you and saying, "<i>Judging by the label, this is probably going to make me even more cowlike then I already am, sweetie.  I\'m not really opposed to the idea, but it will be permanent.  Are you sure you want me to drink it?</i>"'
            );
            // player chooses yes/no
            this.doYesNo(this.giveMarbleTheProBovas4Sho, this.giveItem);
        } else {
            this.outx(
                'You hand Marble another bottle of the ProBova.  She studies your face seriously for a few moments before saying, "<i>Now, you\'re absolutely sure that you want me to drink this?  Remember that whatever happens will likely be permanent.</i>"'
            );
            // player chooses yes/no
            this.doYesNo(this.giveMarbleTheProBovas4Sho, this.giveItem);
        }
    }
    // if yes
    public giveMarbleTheProBovas4Sho(): void {
        this.clearOutput();
        this.spriteSelect(41);
        this.player.consumeItem(this.consumables.PROBOVA);

        if (this.flags[kFLAGS.MARBLE_BOVA_LEVEL] == 0) {
            this.outx(
                "Marble nods and downs the contents.  Nothing happens for a moment... then she gasps and grabs at her chest, stumbling forward slightly.  The cow-girl straightens up and releases her grip, then pulls open her top to look at her breasts.  <b>Each is now decorated with sets of four nipples, like the teats of a cow.  She has also gained about 4 inches in height, judging against the backdrop of the camp.</b>  Marble takes a few minutes to test her new nipples, squeezing them gently and sighing as dribbles of milk decorate her areolae in fours instead of one, then looks at you and says, \"<i>This isn't really so bad.  Actually, it feels nice.  If you find another dose, I'm willing to drink it - just to see what happens, of course.</i>\""
            );
            // Set Marble's nippes to quads, set her height to 6'8</i>\", increase Marble's vaginal capacity by 10, increase Marble corruption by 4
            this.flags[kFLAGS.MARBLE_BOVA_LEVEL] = 1;
            this.marbleStatusChange(4, 4);
        }
        // end event
        else {
            this.outx(
                "Marble takes a deep breath and says, \"<i>I'm doing this for you because I love you so much.  Remember that, all right, sweetie?</i>\"  The woman knocks back the contents of the bottle easily and braces herself for the impending changes.  The first movement she makes is to scratch absently on her arm, but this quickly sets off a chain reaction of itching all over her body, <b>and her skin begins erupting in clumps of brown fur, eventually covering her entirely</b>.  Consumed with scratching her unaccustomedly itchy fur, she doesn't notice herself growing taller; <b>to your eyes, it looks like she's gained about 8 inches of height.</b>  The woman cries out in pain and claps her hands over her face, then turns away from you embarrassed, stumbling slightly as she does so.  You reach out to her reflexively, but she turns back quickly, revealing the cause; <b>her face has elongated and re-formed itself into a cow-like muzzle!</b>  The outward changes seem to stop here, but Marble gasps air for a few moments more before looking at you.  You return her gaze; she's no longer a cow-girl, but a full cow-morph.  She gives you a hesitant smile and asks, \"<i>Well, how do I look?</i>\"  There's not much you can say, since she changed at your request, so you give her a reassuring hug and tell her that she looks just as beautiful."
            );
            // Set Marble's fur to full body, face to cow-anthro, increase height by 8 inches
            // (these don't need to be recorded except with one value), and increase Marble's vaginal capacity by 20,
            // increase Marble corruption by 4
            this.flags[kFLAGS.MARBLE_BOVA_LEVEL] = 2;
        }
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private marbleNip(): string {
        if (this.flags[kFLAGS.MARBLE_BOVA_LEVEL] > 0) return "quad-nipple";
        else return "nipple";
    }

    // Appearance
    private marbleAppearance(): void {
        this.clearOutput();
        this.spriteSelect(41);
        // Gives Marble's appearance screen, some of these values change depending
        // on her level of corruption.
        this.outx("Marble is a ");
        if (this.flags[kFLAGS.MARBLE_BOVA_LEVEL] == 0) this.outx("6 foot 4 ");
        else if (this.flags[kFLAGS.MARBLE_BOVA_LEVEL] == 1) this.outx("6 foot 8 ");
        else this.outx("7 foot 4 ");
        this.outx(
            "inch tall cow-girl, and while she isn't very fast, she has very strong muscles; though they are difficult to spot under her skin's layer of fat. <b>She is currently wearing farm-hand clothes and using a large two-handed hammer as a weapon.</b>  "
        );
        if (this.flags[kFLAGS.MARBLE_BOVA_LEVEL] <= 1)
            this.outx("She has a fairly normal soft human face, with light-colored skin.  ");
        else
            this.outx(
                "She has a soft face that is a mix of bovine and human features, with thick brown fur covering her body.  "
            );

        this.outx(
            "Her shoulder-length brown hair is parted by a pair of rounded cow-ears that stick out sideways from her head.  "
        );

        if (this.player.statusAffectv4(StatusAffects.Marble) <= 20)
            this.outx(
                "Two small horns grow from her forehead, similar in size and appearance to those on a young female bovine.  ",
                false
            );
        else if (this.player.statusAffectv4(StatusAffects.Marble) <= 50)
            this.outx(
                "Two medium sized horns grow from her forehead, similar in size and appearance to those on a female bovine.  ",
                false
            );
        else
            this.outx(
                "Two fairly large horns grow from her forehead, similar in appearance to those on a female bovine.  ",
                false
            );
        this.outx(
            "She has wide womanly thighs that draw the attention of those around her, and her large butt fills out her clothing nicely.  A long cow-tail with a puffy tip swishes back and forth between her legs, as if swatting at flies. A pretty bow has been tied to her tail.  Two legs grow down from her waist"
        );

        if (this.flags[kFLAGS.MARBLE_BOVA_LEVEL] <= 1)
            this.outx(
                ", human until about half-way down her thigh.  The lower portion of her legs is covered in thick dark brown fur and ends in a pair of bestial hooves.\n\n",
                false
            );
        else this.outx(" that are oddly jointed and end in a pair of bestial hooves.\n\n", false);

        if (this.player.statusAffectv4(StatusAffects.Marble) <= 15)
            this.outx(
                `She has two pillowy breasts, each supporting a 0.4-inch lactating ${this.marbleNip()}.  She could easily fill a ${this.marbleBreastSize()} bra.\n\n`,
                false
            );
        else if (this.player.statusAffectv4(StatusAffects.Marble) <= 25)
            this.outx(
                `She has two large breasts, each supporting a 0.6-inch lactating ${this.marbleNip()}.  She could easily fill a ${this.marbleBreastSize()}.\n\n`,
                false
            );
        else if (this.player.statusAffectv4(StatusAffects.Marble) <= 35)
            this.outx(
                `She has two basketball-sized breasts, each supporting a 0.8-inch milk-seeping ${this.marbleNip()}.  She could easily fill a ${this.marbleBreastSize()} bra.\n\n`,
                false
            );
        else
            this.outx(
                `She has two basketball-sized breasts, each supporting a 1-inch milk-seeping ${this.marbleNip()}.  She could easily fill an ${this.marbleBreastSize()} bra.\n\n`,
                false
            );

        // Additions to Marble's appearance screen
        // Marble's Pregnancy
        // Marble's cock
        // These pieces of text should appear in the same place as they do for the PC
        switch (this.pregnancy.event) {
            case 2:
                this.outx(
                    "It looks like she's put on some weight since coming to your camp.\n\n",
                    false
                ); // 3 to 8 days in
                break;
            case 3:
                this.outx("Her belly has swollen a bit; she may be pregnant.\n\n", false); // 8 to 12 days in
                break;
            case 4:
                this.outx(
                    "Her belly is obviously swollen; she is almost certainly pregnant.\n\n",
                    false
                ); // 12 to 18 days in
                break;
            case 5:
                this.outx("Her belly is very swollen; she is very pregnant.\n\n", false); // 18 to 24 days in
                break;
            case 6:
                this.outx(
                    "Her belly is extremely swollen and occasionally quivers when whatever she is pregnant with moves around.\n\n",
                    false
                ); // 24+ days in
            default:
        }

        if (
            (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] < 5 &&
                this.flags[kFLAGS.MARBLE_LUST] >= 20) ||
            (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] >= 5 &&
                this.flags[kFLAGS.MARBLE_TIME_SINCE_NURSED_IN_HOURS] >= 4)
        ) {
            this.outx(
                "<b>Marble is fidgeting around uncomfortably, perhaps she needs to be milked?</b>\n\n"
            );
        }

        if (this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0)
            this.outx(
                `She has grown a ${this.marbleCock()} since you brought her to camp. It is ${MarbleScene.num2Text(
                    Math.floor(this.flags[kFLAGS.MARBLE_DICK_LENGTH])
                )} inches long and ${MarbleScene.num2Text(
                    Math.floor(this.flags[kFLAGS.MARBLE_DICK_THICKNESS])
                )} inches thick.\n\n`,
                false
            );

        if (this.player.statusAffectv4(StatusAffects.Marble) <= 50)
            this.outx("She has a pussy, with a 0.5 inch clit.\n\n", false);
        else if (this.player.statusAffectv4(StatusAffects.Marble) <= 75)
            this.outx(
                "She has a cunt, with a 0.6 inch clit.  You can see moisture gleaming from it.\n\n",
                false
            );
        else
            this.outx(
                "She has a fuck-hole, with a 0.7 inch clit.  Moisture gleams in her cunt, its lips slightly parted.\n\n",
                false
            );
        // since I assume Marble may become ass fucked in the future, Boolean Marble.analVirgin:
        if (this.player.statusAffectv1(StatusAffects.MarbleSpecials) == 0)
            this.outx(
                "She has one virgin bum-hole, placed between her squeezable butt-cheeks where, you presume, it belongs.",
                false
            );
        else
            this.outx(
                "She has one bum-hole, placed between her squeezable butt-cheeks where, you presume, it belongs.",
                false
            );
        this.doNext(this.interactWithMarbleAtCamp);
    }

    // Requirements:
    // - PC is a naga
    // - Marble has a cock
    private giveMarbleTailjobRelease(): void {
        this.clearOutput();
        this.outx(
            "You tell Marble that while you're not in a mood to suck her off today, you're not just going to leave her alone with it, either, and ask for her permission to do an exotic alternative.  Slowly, she nods, apparently not so sure about what you mean or whether she should agree."
        );
        this.outx(
            "\n\nYou grin at her and slowly move your serpentine tail towards her leg, then up her bovine-like calf and towards her thighs.  Her body shivers at the sensation, and when she looks down, she finally gets the idea and smiles back at you, kindly."
        );
        this.outx(
            "\n\nMoving your serpentine tail between her thighs, you decide to start with her original set of genitalia, slowly sliding the tip across her already somewhat moist labia.  You gently push it in, causing her to nearly jump up in surprise, her large breasts jiggling pleasantly as you tease the inside, close to the entrance.  Suddenly, you push more of your tail in and wiggle it inside of her, causing her hips to shake, her mouth to moan and her groin to moisten.  After a short period of wiggling, you shift the muscles in your tail and deliver a few pumps into her pussy, causing her soft butt to shake and forcing another moan."
        );
        this.outx(
            `\n\nDeciding the moisture on your tail and her arousal level to be sufficient, you remove yourself from the confines of her pussy and slide up to the main offender - Marble's ${MarbleScene.num2Text(
                this.flags[kFLAGS.MARBLE_DICK_LENGTH]
            )} inch long, fully erect cock.  You prompt her to tell you if you squeeze too tightly, and prod her with the tip of your tail, pushing against the underside of her cock insistently.  Slowly, you run it up her shaft until the end of your tail is stroking her sensitive tip; then, you sensuously drag the rest of the moistened scales over and around her member, squeezing and wrapping it.  Slowly, you cover all of her manhood with your moist tail, and constrict, causing her to yelp before you start to move your coils up and down, essentially jerking her off along her entire length.`
        );
        this.outx(
            "\n\nMarble isn't content with simply standing there while you're tugging on her member; one of her hands gently strokes the end of your tail while the other rubs her breast, playing with her nipple.  Pleased that she's enjoying herself, you again shift your tail to rub the very tip of it against her sensitive clit, all the while stroking the male side of her genitalia with the part just before the end.  Marble moans loudly and her hands stop migrating as one of them squeezes your tail and the other grabs her pillowy breast rather roughly.  It'd appear that with the combined strokes to both of her parts, it won't take long to give her her release... you decide to move on to the main event."
        );
        this.outx(
            '\n\nShifting your coils over her erection so that your movements will stimulate her more effectively, the end of your tail droops down and rubs against her clit as you push it inside her.  With intense, but careful, pumping and stroking movements, you cause her to nearly writhe as she pants from excitement.  "<i>S...sweetie, you\'re teasing too many places at once...</i>" she whispers, half-heartedly.  You have to admit, feeling her more sensitive bits and being able to explore her soft body thoroughly with your tail does excite you as well.'
        );
        this.outx(
            "\n\nIt doesn't take long for her to climax after that.  After a few more strokes and pushes against the walls of her pussy, she releases a moo-like moan and you feel her contracting rhythmically around your tail while her cock twitches, releasing a sticky liquid right into the coils."
        );
        this.outx(
            "\n\nMarble stops moaning soon after and looks at you warmly, stroking your tail again with affection."
        );
        // { OPTIONAL
        // ([Corruption 70+]
        if (this.player.cor > 70) {
            this.outx(
                "\n\nYou certainly don't mind the proof of your prowess marking your lower body like this, but you can think of something better to do with it.  In fact, you slowly move the tail towards your lips."
            );
            // (Normal or Snake tongue)
            if (this.player.tongueType == TONUGE_SNAKE || this.player.tongueType == TONUGE_DEMONIC)
                this.outx(
                    "  Your tongue runs along the length of the end of your tail, tasting both Marble's feminine secretions and her semen.  She gives you a smoldering gaze as you lick her juices up.  You grin at her."
                );
            // (Demon Tongue)
            if (this.player.tongueType == TONUGE_DEMONIC)
                this.outx(
                    "  You decide to put on a show for Marble, moving your tail as you drop out a large piece of your inhumanly long tongue, licking up her secretions sensuously while staring at her.  She quickly blushes under your gaze."
                );
            this.outx(
                '\n\n"<i>Sweetie, you wouldn\'t be trying to make me horny all over again, would you?</i>"'
            );
            this.outx(
                '\n\n"<i>Well... certainly, when you\'re not in the mood, repeating this would be very nice.  I hope we can both have fun together next time, though... Thank you, sweetie.</i>"'
            );
            this.player.slimeFeed();
        }
        // teh end
        // slimefeed if corruption, gain fuckin' lust n lower marble lust n' shit
        this.dynStats("lus", 20);
        this.flags[kFLAGS.MARBLE_LUST] = 0;
        this.doNext(this.playerMenu);
    }

    // TheDarkMaster's Marble in her Milker
    private milkMarble(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.MARBLE_MILKED_BEFORE] < 1) {
            this.outx(
                'With an unusually bright look in her eye, Marble comes up to you and asks, "<i>Hey sweetie, I was just about to go get milked when I realized that you\'ve never actually been with me for it.  How would you feel about getting a tour of the setup that Whitney has for me?</i>"  Then a mischievous look crosses her face, "<i>Maybe we could even do something a little... intimate too?</i>"'
            );

            this.outx(
                "[pg]There is no harm in checking out her stall, at least.  You agree to go with her."
            );

            this.outx(
                "[pg]The two of you hold hands and quickly warp over to Whitney's farm and, with a wave to the proprietor, Marble escorts you to the barn.  The smells of the place are as familiar as ever, but this particular trip has an unusual feel to it since you're going to visit a room you've never been in before."
            );

            this.outx(
                "[pg]Your lover shows you the stall with her name on it and ushers you inside.  The room is a pretty cozy affair, with a large padded chair and small table in the center, a waist high railing on one side, and a long bench in on the other.  The milking machine hangs from the ceiling on a rail, allowing it be used in any part of the room."
            );

            this.outx(
                "[pg]Your amorous guide gives an animated rundown of the uses of her pieces of furniture, the chair is what she usually sits in while reading, the bar if she's got stiff legs, and the bench if she's really worn out.  Once finished, you do notice there is a book sitting on the table right now and ask Marble what she's reading.  She uncharacteristically bites her thumb a bit nervously and says in a low voice that it's the book she was reading while doing research when you were addicted to her."
            );

            this.outx(
                "[pg]Now very curious, you ask her how it is, and how close she is to finishing it.  \"<i>It's a bit embarrassing sweetie, but I've actually barely started it.  Unlike my younger sister, I never started reading until I needed something to do while being milked, and I'm terrible at it.  It can take me months to get through just one book, even if I'm spending several hours reading every day...</i>\""
            );

            this.outx(
                "[pg]You apologize for bringing it up and suggest that maybe you should get down to the milking?"
            );

            this.outx("[pg]She perks up instantly and pulls down ");
            if (this.flags[kFLAGS.MARBLE_BOVA_LEVEL] < 1) this.outx("two");
            else this.outx("eight");
            this.outx(
                ` suction cups off of the milker machine and carefully attaches them to her nipples, then flips a switch, causing it to come to life.  In an instant, milk starts flowing out of her ${this.marbleNips()} into the cups and then up the clear tubes into the machine.  She lets out a relaxed sigh, then turns her gaze back to you.`
            );

            this.outx(
                "[pg]\"<i>Well sweetie, is there something you've got in mind you'd like to do?</i>\""
            );

            this.flags[kFLAGS.MARBLE_MILKED_BEFORE] = 1;
        } else {
            this.outx(
                "Sensing that Marble looks like she is going to get milked soon, you offer to escort her to her stall personally."
            );

            this.outx(
                "[pg]As usual, Marble is pleased at the prospect and agrees instantly, and the two of you head over to her small homely space in Whitney's operation."
            );

            this.outx(
                "[pg]Once Marble has herself settled in and hooked up, she turns to you and asks if you've got something in mind."
            );
        }

        if (this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] >= 5)
            this.flags[kFLAGS.MARBLE_TIME_SINCE_NURSED_IN_HOURS] = 0;
        this.menu();
        this.addButton(0, "Cunnilingus", this.milkMarbleCunnilingling);
        if (
            this.player.cockThatFits(this.marbleCuntCapacity()) >= 0 &&
            (this.player.isBiped() || this.player.isNaga() || this.player.isGoo())
        )
            this.addButton(1, "Fuck Her", this.milkMarbleFuckDatCowPussy);
        if (
            this.player.hasVagina() &&
            this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0 &&
            (this.player.isBiped() || this.player.isGoo())
        )
            this.addButton(2, "Take Her", this.milkMarbleTakeHerDick);
        this.addButton(3, "Her on Bar", this.milkMarbleOnTheBar);
        this.addButton(4, "Leave", this.milkMarbleNoMilking);
    }

    private milkMarbleCunnilingling(): void {
        this.clearOutput();

        this.outx(
            "You suggest that maybe she'd like it if you licked her vagina while being milked."
        );

        this.outx(
            '[pg]A huge smile spreads across her face, "<i>Oh sweetie, that sounds like it would be wonderful!  You\'re the best; you know that?</i>"'
        );

        this.outx(
            "[pg]She takes a seat on the edge of the chair in the middle of the room and spreads her legs wide.  Her skirt slips up her "
        );
        if (this.flags[kFLAGS.MARBLE_BOVA_LEVEL] < 1) this.outx("semi-human");
        else this.outx("inhuman");
        this.outx(
            " legs, giving you a clear look at her waiting womanhood.  With a coy sideways glance, she wiggles her fingers in invitation for you to go down on her."
        );

        this.outx("[pg]In order to get the show on the road, you ");
        if (this.player.isBiped()) this.outx("get down on your knees, and slowly crawl forward");
        else this.outx("lower your body close to the ground, and slowly inch forward");
        this.outx(
            " like an animal who's found something they want.  When you get close to her, your lover runs a finger up the inside of her thigh as her tail sneaks its way up around her waist and drapes itself over your prize."
        );

        this.outx(
            "[pg]Arriving at a hard brown hoof, you wrap your arm about her coarsely furred leg and rest your head against the bestial appendage.  You stroke and run your fingers through her fur to a soft giggle above you while the machine continues to pump and whirl.  You tease her a bit more before raising yourself up, bit by bit, until you're at eye level with her tail-covered opening. A small tuft of hair decorated with a pink bow is all that hides your goal.  No, it's a present, gift wrapped for you."
        );

        this.outx(
            "[pg]You take hold of two strands of the bow and tell Marble she shouldn't have given you such a gift."
        );

        this.outx('[pg]"<i>Oh, not at all sweetie.  You deserve it!</i>"');

        this.outx(
            "[pg]You slip the bow open, unwrapping your present, and pull her tail aside to reveal her moist and inviting opening and exclaim that it was what you always wanted!"
        );

        this.outx(
            "[pg]\"<i>Oh, I'm so glad you like it.  Why don't you try it out right now?</i>\""
        );

        this.outx(
            "[pg]She doesn't have to give you the suggestion twice.  You dive in at once, sticking your [tongue] deep into her recesses, and tasting her cow-girl nectar.  Her folds accept you easily, and an eager moan slips out of the woman above you.  Her fingers run over your [hair] while you withdraw from your initial sortie to scout out the entrance more."
        );

        this.outx(
            "[pg]In response to your tugging and toying with her outer folds, Marble's hips jerk forward slightly, and you see her love button pulse and engorge itself.  There is a happy moan, and her tail manages to find itself flicking your face.  You swat the pesky wrappings away and continue your efforts at bringing your mate to the height of pleasure.  The next target: her clit."
        );

        this.outx(
            "[pg]There is a long drawn out cry of joy when you bring your [tongue] to the source of her womanly pleasure.  "
        );
        if (this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0)
            this.outx(
                `With the first flick across its pink flesh, Marble grabs ahold of her ${this.marbleCock()}, and tightly squeezes it, slowly pushing her hand down it.`
            );
        else
            this.outx(
                "With the first flick across its pink flesh, Marble grabs onto an arm of her chair, gripping it tightly."
            );
        this.outx(
            "  You can't help but laugh and ask her if your treatment is too much, suggesting that maybe you should save playing more for later."
        );

        this.outx('[pg]"<i>No more teasing me, [name], bite me now!</i>"');

        this.outx("[pg]How can you refuse such a request?");

        this.outx(
            '[pg]"<i>Ahhhhooooo!</i>"  The wonderful bovine women gives a grateful cry of pleasure as your teeth nip into her nub of engorged skin and a burst of liquid sprays out onto your chin.  '
        );
        if (this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0)
            this.outx(
                "Of course, there is also a spurt of white which sprays out over her lap and your head.  "
            );
        this.outx(
            "Obviously, while the milkers don't normally get her aroused, they can seriously amplify the effects of any pleasure she gets."
        );

        this.outx("[pg]You ask your lover if that was good.");

        this.outx(
            '[pg]"<i>Lovely. Thanks for giving me the best start to being milked sweetie.</i>"  She notices that you\'re all wet, "<i>Oh, here, let me get that for you.</i>" and she wipes the fluid off your [face] with a grin.'
        );

        this.outx(
            "[pg]You then tie her bow back up on her tail and say you'll save the rest for later."
        );

        this.outx(
            '[pg]"<i>Oh, I\'ll be looking forward to it.  See you later sweetie!</i>"  She gives you a slightly awkward peck on the cheek around the milking tubes, that sends you into a blissful state.'
        );

        this.flags[kFLAGS.MARBLE_LUST] = 10;
        const pLust: number = Math.floor(20 + (this.player.lib + this.player.cor) / 10);
        this.dynStats("lus", pLust);
        this.dynStats("sen", 1);
        this.doNext(this.camp.returnToCampUseTwoHours);
    }

    private milkMarbleFuckDatCowPussy(): void {
        const x: number = this.player.cockThatFits(this.marbleCuntCapacity());
        this.clearOutput();

        this.outx(
            "You wonder aloud if maybe she'd be interested in a little intercourse action. You'd be perfectly prepared to provide for her."
        );

        this.outx(
            "[pg]\"<i>Hmm, well, your offer is tempting, but I'm going to have to see what's available before I make a final decision.</i>\""
        );

        this.outx(
            `[pg]With a flourish, you remove your [armor] and do a little sweep over your ${this.cockDescript(
                x
            )}, asking her if everything is to her needs.`
        );

        if (
            (this.player.findPerk(PerkLib.BulgeArmor) >= 0 ||
                this.player.modArmorName == "backless female teacher's clothes" ||
                this.player.modArmorName == "bridle bit and saddle set" ||
                this.player.modArmorName == "headdress, necklaces, and many body-chains" ||
                this.player.modArmorName == "bondage patient clothes" ||
                this.player.modArmorName == "crotch-revealing clothes" ||
                this.player.modArmorName == "cute servant's clothes" ||
                this.player.modArmorName == "maid's clothes" ||
                this.player.modArmorName == "servant's clothes") &&
            this.player.hasCock()
        ) {
            this.outx(
                '[pg]"<i>I appreciate the little show, but I could already see you just fine.  Come closer so I can get a better idea.</i>"'
            );
        } else
            this.outx(
                '[pg]"<i>Hmm, yes, I think that will work.  Come closer so I can make a more thorough inspection.</i>"'
            );

        this.outx('[pg]You step forward and allow your lover to get "acquainted" with your goods.');

        this.outx(
            "[pg]She squats down and makes a show of looking you over carefully, humming to herself along the way.  Her breath tickling your skin slightly and quickly bringing you to full hardness.  With one finger, she taps your tip a few times, then runs it along your glans.  Finally she finishes her examination of your manhood by gripping it in her hand and giving it a few experimental pumps."
        );

        this.outx(
            '[pg]She stands back up and looks at you with a serious expression on her face.  "<i>Your penis has met my expectations, and I do believe that I will be taking it into my vagina.  Please lay down on the bench over there and we can begi-hahahahaha!</i>"  Her face finally cracks and she bursts out laughing over the little game the two of you have been playing.'
        );

        if (this.player.tallness < 68) {
            this.outx(
                `[pg]"<i>Oh sweetie.</i>"  She pulls you into a deep hug against her chest.  "<i>It's too much!  Hah, hahahahaha!  No more joking around.  I need you inside me now.</i>"  She carefully carries you over to the bench and lays you down on your back, then straddles the bench above your ${this.cockDescript(
                    x
                )}.  "<i>Are you ready for me?</i>" she calls out in a deep husky voice, breasts heaving, tail swishing, and all the while the milker machine continues to hum above her.`
            );
        } else {
            this.outx(
                "[pg]You pull her into a deep hug as she continues to her hysterics and gently caress her hair.  You assure her that if the games are too much, you can skip straight to the action."
            );

            this.outx(
                '[pg]After a moment she settles down and returns the embrace.  "<i>Hmmhmm, yes.  No more joking around.  I need you inside me now.</i>"'
            );

            this.outx(
                "[pg]You break away from her and casually walk over to the bench and lay down on top of it.  Marble follows immediately behind you, and before you've even finished laying down, she's already standing above with a hungry look on her face, breasts heaving, and tail swishing."
            );

            this.outx('[pg]"<i>Are you ready for me?</i>" she asks in a deep husky voice.');
        }

        this.outx("[pg]With a grin, you tell her you're always ready for her.");

        this.outx(
            `[pg]The words have barely left your mouth before Marble drops her waist and engulfs your ${this.cockDescript(
                x
            )}, swallowing it up to the base in a single motion.  "<i>Ohhhhhh, yes!</i>"  Marble happily rubs her belly with one hand, while another cubs her breast.  She shakes her hips from side to side a couple times, savoring the feeling of your cock rubbing back and forth across her insides.`
        );

        this.outx(
            "[pg]Then both hands come down and push down on your stomach, and she begins a rapid forward and backward rocking motion on your member, keeping every bit of your length deep inside her, putting it into a spinning trip around her passage while she starts giving low happy moans of pleasure.  You look up at your lover and get a good view of the expression of bliss upon her face, but also get a chance to see the milk draining from her chest."
        );

        this.outx(
            "[pg]With each push and pull on your member, there is a rapid spurt of milk that the machine is only just able to keep up with.  After a moment, you realize that it isn't actually able to keep up, her milk is coming out too fast for the milker!  You try to warn your bovine lover, but it's too late.  With a pop, the suction cups fly off of Marble's breasts, spraying milk everywhere, and there is a bang from the machine as it shuts down."
        );

        this.outx(
            '[pg]"<i>Oh no!  Damn it, now what?</i>" Marble stops moving and looks around worried.'
        );

        if (this.player.findPerk(PerkLib.MarblesMilk) >= 0) {
            this.outx(
                "[pg]You quickly sit up and take it upon yourself to continue the efforts of the milking machine, bringing with your actions a surprised gasp, followed by a contented sigh, and Marble resuming the movements of her hips.  The ambrosia from her breasts increases in quantity once more, and it actually feels like it's being pumped into your mouth.  You're happy to rise to the challenge of drinking it all while Marble continues to ride your body."
            );

            this.outx(
                "[pg]Where the machine failed to handle Marble's increased production, you succeed in draining everything.  Heck, the feel of yourself bouncing around Marble's passage while she pushes against you and bounces back and forth only edges you on further than normal.  With one hand on her shoulder for leverage, you use the other to massage her bosom and coax even more milk out of her, greedily devouring as much of your favorite drug as possible."
            );

            this.outx(
                "[pg]Almost an hour later, the flow from both of Marble's breasts has slowed to a trickle, and both of you have cum at least three times in a haze of both sexual and chemical pleasure.  Marble gives a contented sigh and informs you that she thinks she'll be taking a nap now, wondering whether or not she should make a habit of breaking the milker, given what happens afterwards."
            );
            this.player.orgasm();
            this.player.orgasm();
            this.player.orgasm();
            this.dynStats("lus", 20);
            this.flags[kFLAGS.MARBLE_LUST] = 15;
            this.dynStats("lib", 0.3);
            if (this.player.cor < this.player.statusAffectv4(StatusAffects.Marble))
                this.dynStats("cor", 1);
            this.dynStats("tou", 0.1);
            this.dynStats("str", 0.1);
            this.dynStats("sen", -2);
            this.marblePreggoChance(1);
        } else if (this.player.statusAffectv4(StatusAffects.Marble) > 30) {
            this.outx(
                "[pg]The haze given off by Marble's tainted fluids alights a familiar craving at the back of your mind, but you push it back and reach your hands up to her breasts and pinch her nipples.  Marble tenses for a moment, and looks down at you confused.  You tell her that you'll try to keep her entertained while you wait for Whitney to fix things."
            );

            this.outx(
                "[pg]She begins speaking once more, then goes quiet when you pull on her nipples and try your best to milk her by hand, much the same way that the cows were milked back home.  While nothing actually comes out of her breasts from your touch, she gives an appreciative moan and resumes her rocking against your crotch."
            );

            this.outx(
                "[pg]After rubbing against you for a bit, the stimulation on your length just isn't enough for you anymore, and try to start thrusting up into your lover's passage.  Marble seems to be in agreement in what she wants, and her motions switch from a gentle rocking into meeting each of your thrusts with a pumping of her own, trying to drain your manhood while you try to drain her breasts."
            );

            this.outx(
                `[pg]Finally the two of you cry out together in orgasmic pleasure, and you spray out your seed into her passage, mixing with a rush of her own fluids into a slurry of sex juices sloshing around your ${this.cockDescript(
                    x
                )}.  The two of you settle down, with Marble laying down on you contentedly for a moment.`
            );

            this.outx(
                '[pg]Suddenly a voice with a southern drawl call out from above you, "<i>You kids havin a lots of fun down there?</i>"'
            );

            this.outx("[pg]The two of you stare at each other in surprise and tense up.");

            this.outx(
                "[pg]\"<i>Next time, please try to be a bit gentler on the equipment, if ya don't mind.  I'd rather not have to do fix it every time you two get frisky.</i>\"  There is a slam of metal on metal as Whitney finishes working on the broken milker and it whirls back to life."
            );

            this.outx(
                "[pg]You and Marble each look each other in the eye and burst out laughing.  You then help her reattach the cups and excuse yourself.  Just as you're leaving, Marble blows you a kiss and says, \"<i>We should definitely do this again sometime.  Let's just give Whitney a break first.</i>\""
            );

            this.player.orgasm();
            this.flags[kFLAGS.MARBLE_LUST] = 5;
            this.dynStats("sen", -2);
        } else {
            this.outx(
                "[pg]You assure Marble that it will be fine and grab a bucket that was sitting under the bench and offer to continue her milking by hand.  She looks like she is going to object for a moment before nodding.  You help her turn herself around while keeping your manhood firmly embedded within her.  She puts the bucket down at the end of the bench, and you reach your hands around her to grip her massive mammaries."
            );

            this.outx(
                `[pg]You roll the soft pliable flesh around in your hands for a few moments, garnering appreciative moans from their owner.  Then you start pinching and pulling on her ${this.marbleNips()}, sending a jolt through her body that makes her tail shoot straight up.  Almost instantly after that, she resumes rubbing herself against your manhood, sending it sweeping through her insides once more while her delightfully shaped rear-end slides around against your waist.`
            );

            this.outx(
                "[pg]You give a gasp of pleasure of your own and try your best to properly milk her nipples in the same way that cows back home were milked, in spite of how roughly your milkee is fucking right now.  If anything, being milked has made her more aggressive, and her tail is swishing around madly."
            );

            this.outx(
                "[pg]It takes a few minutes of effort, but when you find yourself finally closing with the peak of an orgasm, there is a spray followed by a ping. You finally manage to get some milk flowing from Marble's breasts, just in time for her to scream in pleasure and drive herself back into you more forcefully than before.  Her tail shoots straight up again, twitches twice, and you're thrown over the edge as well."
            );

            this.outx(
                "[pg]The two of you cum together at least three times over the next hour or so, and while your hand milking certainly isn't as efficient as Whitney's machine, it manages well enough in satisfying your bovine lover.  When you go to tell the farmer what happened to her device, she is rather surprised at just how nonchalant and pleasant the two of you were about it.  As she put it, \"<i>Most folks generally feel bad when they go round breaking other people's things.</i>\"  Though, you're certain she knew what you'd been up to."
            );

            this.player.orgasm();
            this.flags[kFLAGS.MARBLE_LUST] = 10;
            this.dynStats("sen", -2);
            this.marblePreggoChance(1);
        }
        this.doNext(this.camp.returnToCampUseTwoHours);
    }

    private milkMarbleTakeHerDick(): void {
        this.clearOutput();

        this.outx(
            "You ask her if maybe she wants to penetrate you while she is using that milking machine."
        );

        this.outx(
            "[pg]She looks thoughtful for a moment, tapping her finger against her lips while her tail swishes back and forth.  With the tubes coming off of her nipples, it actually looks rather comical."
        );

        this.outx(
            "[pg]Spotting your look, she frowns at you, \"<i>Oh, you think this is silly do you, [name]?  I'll have you know that I'm seriously trying to figure out how to make this work.</i>\"  She indicates her rather physical attachment to the room, and the furnishings it has available to it."
        );

        this.outx(
            "[pg]You give it a little thought, then suggest that you could lean up against that railing while she fucks you from behind."
        );

        this.outx(
            "[pg]\"<i>Take you from behind, huh?  I'd really rather look into your eyes while I'm having sex, but there aren't many options here, are there?</i>\""
        );

        this.outx("[pg]To silence her complaining, you quickly strip");
        if (this.player.tallness < 56) this.outx(", grab a box,");
        this.outx(
            " and lean against the railing, then shake your [ass] in her direction with your vagina on full display, wet with arousal.  You look back at her to see if you're having the desired effect."
        );

        this.outx(
            "[pg]Marble is licking her lips with a nervous look on her face while holding her tail in her hand and running her fingers through it's brush.  \"<i>You make a very persuasive argument, sweetie.  Plus, if you're looking at me like that, I guess I really don't have anything to complain about, do I?</i>\""
        );

        this.outx(
            '[pg]She strips off her short skirt and takes up a position behind you, hands on your hips and erect cock pressed against your entrance.  You look down between your legs and catch sight of her tail hanging down between her legs, the barest hint of movement to it.  "<i>Well sweetie, are you ready for me?</i>"'
        );

        this.outx(
            "[pg]You retort that if you weren't, you wouldn't have suggested this in the first place."
        );

        this.outx(
            '[pg]"<i>Heh, good point.  Alright, here I go...</i>"  She slowly works her way inside you, inch by inch.  '
        );
        if (
            this.player.vaginalCapacity() <
            this.flags[kFLAGS.MARBLE_DICK_LENGTH] * this.flags[kFLAGS.MARBLE_DICK_THICKNESS]
        )
            this.outx(
                "With each new bit of length inserted, she waits a few moments for you to adjust to her size, letting you fill out to accommodate her.  "
            );
        this.outx(
            "With the final bit of her inserted into you, her tail suddenly shoots straight up out of your sight, and she lets out a long exaggerated sigh of pleasure as the milking machine continues to whirl above her."
        );
        this.player.cuntChange(8, true, true, false);

        this.outx(
            "[pg]\"<i>Oh sweetie, you feel so wonderful.  I actually feel a bit strange right now, like I want to....</i>\"  She starts thrusting into your entrance with great gusto, eliciting a surprised gasp from you; Marble isn't normally this energetic when it comes to sex!  Being milked is probably making her more aggressive than usual, though given how good she is making you feel, you can't really complain."
        );

        this.outx("[pg]She starts playing with your backside with her hand, massaging your ");
        if (this.player.buttRating <= 4 && !this.player.isGoo()) this.outx("taut");
        else this.outx("jiggling");
        this.outx(
            ` flesh while her ${MarbleScene.num2Text(
                Math.round(this.flags[kFLAGS.MARBLE_DICK_LENGTH])
            )} inch length continues to push and pull into your womanhood.  Egged on by her enthusiasm, you start putting in some effort into the sex yourself by pushing your backside tight against her with each push forward and shaking it back and forth with each pull out of your interior.`
        );

        this.outx(
            "[pg]The stimulation sends Marble wild, and in short order she is flooding you with her hermaphroditic seed.  However, she doesn't slow down at all and simply continues to lovingly abuse your backside and mound of pleasure.  You look down between your legs once more to see her tail has started swinging lengthwise with her body, every last inch of her body and mind are fixed on breeding with you, triggering a triumphant laugh from you as you cum yourself."
        );

        this.outx(
            "[pg]Nearly an hour later, Marble finally calms down and looks down at what she has managed to do to you.  \"<i>Oh my!  Sweetie, I'm sorry, I'm not sure what came over me...</i>\" she freezes when she sees your happy expression, and you inform her that you rather liked seeing that side of her. The two of you will have to do this again some time."
        );

        this.player.orgasm();
        this.player.orgasm();
        this.player.orgasm();
        this.flags[kFLAGS.MARBLE_LUST] = 10;
        this.dynStats("lib", 0.5);
        this.player.knockUp(PregnancyStore.PREGNANCY_MARBLE, PregnancyStore.INCUBATION_MARBLE, 150);
        this.doNext(this.camp.returnToCampUseTwoHours);
    }

    private milkMarbleOnTheBar(): void {
        this.clearOutput();

        this.outx(
            "You suggest that you'd be interested in playing with her while she's draped over the bar on the one side of the room."
        );

        this.outx(
            "[pg]She narrows her eyes at you, considering the proposition.  \"<i>I don't know sweetie, doesn't really sound like something I'd like that much.  I'd like to be in a position where I can do more than just take it...</i>\""
        );

        this.outx(
            "[pg]You assure her that you'll make it good enough that it will be worth while to let you have complete control."
        );

        this.outx(
            "[pg]After a few more moments of thought, Marble gives you a very serious look, \"<i>You don't get complete control, I'll be giving the instructions here, oh, and you'd better do a good job.</i>\"  Suddenly she smiles, \"<i>Otherwise, I'll just have to turn things around!</i>\""
        );

        this.outx(
            "[pg]You wonder if maybe you want her to turn things around while she rests her hands on the bar, then drapes herself over it with her breasts swinging underneath.  She turns her head towards you and swings her ribbon decorated tail back and forth a few times.  You'd best not keep her waiting when she actually took you up on your request, so you strip down and step up behind her."
        );

        this.outx(
            '[pg]"<i>Alright sweetie, time to get me ready.  Let\'s see how you do.</i>"  She turns her head back, and simply waits for you to start while the milking machine continues to hum above her.'
        );

        this.outx(
            "[pg]You start by lifting up her skirt to expose her round ass to the air and the lips of her womanhood below it.  Of course, there is also the base of her tail just above it which continues to swish back and forth somewhat indignantly overtop of her openings.  Next, you take a handful of her generous asscheeks, rolling them around in your hands and kneading the soft bouncy flesh.  Though not as expansive as her bust by any means, Marble undeniably has quite the pleasant backside."
        );

        this.outx(
            '[pg]"<i>Hmm,</i>" comes a pleased moan from the cowgirl in front of you, and her tail lifts up ever so slightly as the first signs of moisture and arousal form around her womanhood.'
        );

        this.outx(
            "[pg]Next, you run a finger across her entrance, teasing her ever so slightly.  A small jolt flies through her body, and her tail shoots straight up."
        );

        this.outx('[pg]"<i>Ah, that\'s a good start sweetie, now, put a finger inside me.</i>"');

        this.outx(
            "[pg]The words are barely out of her mouth, when you push your index finger into her lower lips.  There is a low squelch while it slips inside, which starts again when you stir your finger around in a few circles.  This causes Marble's tail to curl around your hand and try to pull your finger out.  Once a little ways out, her tail tries to force your hand back into her waiting snatch."
        );

        this.outx(
            '[pg]"<i>Maybe you need my help after all.  Want to let my tail do the talking sweetie?  Let me show you how I like being penetrated.  Then again, your tongue might be nice to feel next too..."</i>'
        );

        if (this.player.cockThatFits(this.marbleCuntCapacity()) > 0)
            this.outx(
                "[pg]You idly consider grabbing and pulling on her tail, so you could have a chance to take charge, though Marble would probably try and take control in that case for sure..."
            );

        this.menu();
        this.addButton(0, "Follow Tail", this.milkMarbleBarFollowTail);
        this.addButton(1, "Cunnilingus", this.milkMarbleBarCunnilingling);
        if (this.player.cockThatFits(this.marbleCuntCapacity()) >= 0)
            this.addButton(2, "Pull Tail", this.milkMarbleBarPullTail);
        this.addButton(3, "Leave", this.milkMarbleLeaveAfterBar);
    }

    private milkMarbleBarFollowTail(): void {
        const x: number = this.player.cockThatFits(this.marbleCuntCapacity());
        const y: number = this.player.cockThatFits2(this.marbleCuntCapacity());
        this.clearOutput();

        this.outx("You ask Marble where her tail will lead you.");

        this.outx('[pg]She gives a low chuckle, "<i>Why don\'t you wait and find out?</i>"');

        if (x >= 0) {
            this.outx(
                `[pg]Her ribbon adorned, bovine appendage slowly unwraps from your wrist and instead searches around your crotch for something else.  Eventually the tuff comes into contact with your ${this.cockDescript(
                    x
                )}, and runs its fur across your length lovingly for a few times, then curls around your base and pulls you in towards Marble's waiting womanhood.`
            );

            this.outx('[pg]"<i>Mhehehe, found it!</i>"');

            this.outx("[pg]It was obvious that you couldn't hide from her for long.");

            this.outx('[pg]"<i>Oh I know sweetie, but it\'s always so much fun looking.</i>"');

            this.outx(
                "[pg]Sliding into her interior is a slow but enjoyable process.  Each inch you pass in makes you want to just slam yourself home in an instant, but you wait to let Marble's tail guide the way.  Finally you're fully inside her, and she lets out a long soft moan of pleasure, followed by shaking her hips side to side a few times."
            );
            if (y >= 0)
                this.outx(
                    `  You find your ${this.cockDescript(
                        y
                    )} slides up comfortably in between her cheeks, and squeeze them together a bit to give it a nice tight valley of soft flesh to run through.`
                );

            this.outx(
                "[pg]Your guide string tightens up a bit in time with the end of your lover's cry of pleasure.  \"<i>Hmmm, mine, all mine.</i>\" You barely catch Marble whisper under her breath, then her tail relaxes a bit and pushes back against your waist.  Understanding the direction, you pull your cock back out of its \"owner's\" home.  Though you haven't gone far before she tightens on you once more, and you realize that you were suppose to switch directions again. You focus your attention once more on the fluff that's showing you the way."
            );

            this.outx(
                `[pg]Everything centers onto three things: the feel of aroused cunt surrounding your shaft, rippling and squelching with each slow plunge and retreat from its depths, the soft springy ass and hip curves under your hands that runs oh so pleasantly under your hands, and of course, Marble's tail curled around the base of your ${this.cockDescript(
                    x
                )}.  The sensation of her thin appendage, soaked and sweat yet still soft with fur, constantly quivering and twitching in time with the movements of your two bodies, draws your entire focus.`
            );
        } else {
            this.outx(
                "[pg]Her ribbon adorned bovine appendage slowly pulls your hand out of her wet slit and directs you up the side of her rump until you find something hiding out in her pocket.  Her tail rubs against the long hard shape a few times, and then you grasp and pull out a long black rubery object from your lover's skirt: her double dildo."
            );

            this.outx("[pg]You ask Marble if there is any chance you've found what she wanted?");

            this.outx('[pg]"<i>Why yes sweetie.  What gave it away?</i>"');

            this.outx("[pg]It was just a hunch.");

            this.outx(
                "[pg]You adjust your grip on her personal toy and press one end against her waiting womanhood.  Just as you're about to ask her if she's ready for it, her tail suddenly jerks forward, sliding the tool inside her.  She gasps while the false cock quickly slides up to its centerpiece into her depths, then giggles when you try to pull it back out. Unfortunately, you find she's clapped down on it hard."
            );

            this.outx(
                "[pg]\"<i>What's wrong sweetie?  You haven't managed to get stuck have you?  Here, let me give you a hand....</i>\""
            );

            this.outx(
                "[pg]Abruptly, her tail reverses it's pressure and allows you to extract her toy from its sheath - at least a little ways.  Then, you flip directions yourself and push it back in to the hilt.  There is a sharp intake of breath from your lovely lover, and you give her rear a small smack.  In response she tightens around your wrist, and it sounds like she might be about to get mad at you.  Instead she chuckles a bit."
            );

            this.outx(
                "[pg]\"<i>Alright, no more teasing.  You're more than just a plaything after all.  I've got to let you do something.</i>\""
            );

            this.outx(
                "[pg]Finally, she allows you to freely build her pleasure and tease her body.  You can focus on bringing her to blissful sexual release by playing with her wonderful plump rump, twisting and pumping her with her dildo to the sound of lewd squelching that can just be heard over the hum of the milker and Marble's moans of pleasure, and lastly, the quivering of her tail.  The tail that serves as a subtle guide to the ways of your lover's tunnel."
            );
        }

        this.outx(
            "[pg]You're so engaged into the activity, that you barely register a long low call of ecstasy come out of cow-girl mate.  That same cry that is something between a moo and a long sigh that you've come to know very well.  At the same time, she manages to knock the hoses off her breasts, and there is a splash as her milk hits the floor of the stall, which steadily slows to a trickle, then only a few drops."
        );

        if (x > 0) {
            this.outx(
                "[pg]Finally, the grip on your root relaxes, and you're finally able to explode inside her. Her tail slowly slips off of you and falls limp next to the connection between your bodies.  Several gasps and groans come out of your lips, and you ask Marble if she was satisfied."
            );
        } else {
            this.outx(
                "[pg]The hold on your hand tightens to a death grip, and you have no choice but to let go of her dildo and desperately struggle to free your constricted limb from her tail.  When you finally do manage to free yourself, you start rubbing your tingling fingers and ask Marble if putting your hand to sleep was a sign that she was satisfied."
            );
        }

        this.outx(
            "[pg]Your lover girl straightens up and turns around to face you.  She fixes you with a stern look for a few moments before pulling you into a deep french kiss.  \"<i>Well, if you're always that good at following directions, I'm not sure how I wouldn't be.</i>\""
        );

        this.flags[kFLAGS.MARBLE_LUST] = 10;
        if (x >= 0) {
            this.player.orgasm();
            this.marblePreggoChance(1);
        } else {
            const pLust: number = Math.floor(10 + this.player.lib / 10);
            this.dynStats("lus", pLust);
        }
        this.doNext(this.camp.returnToCampUseTwoHours);
    }

    private milkMarbleBarCunnilingling(): void {
        this.clearOutput();

        this.outx(
            "You ask Marble to release your wrist so you can get into a better position for taking care of her.  You're feeling an ache to harvest her other womanly fluid."
        );

        this.outx(
            "[pg]\"<i>Of course sweetie, I'm feeling very wet down there.  I definitely think I'm going to need you to take care of that.</i>\""
        );

        this.outx(
            "[pg]She released you, and allows you to kneel down behind her and get a good whiff of her rich womanly scent.  It throws your mind into a haze for a few moments, and you're brought back out with a swish of wind as her tail swings side to side over her entrance, the base lifted up eagerly.  You rest your head to the side of her entrance, and lean against the part of her body where ass meets thigh while letting one hand play across the other leg."
        );

        this.outx(
            "[pg]After a moment's climb, you find your fingers curling around the root of her bottom's bestial extension.  An idea strikes you, and you comment on how you need to brush her off before you start harvesting."
        );

        this.outx('[pg]"<i>Oh?  What do you mean by that?</i>" comes a somewhat bemused response.');

        this.outx(
            "[pg]You don't reply, instead you make a small ring with your thumb and finger and slide her tail through the hole as it flicks and swings around.  When you reach the thick hair at the end, you tighten your grip and direct the brush to the entrance of her womanhood."
        );

        this.outx('[pg]"<i>Oh!  Ohhhhhhh...</i>"');

        this.outx(
            "[pg]A careful dab here, a deeper scope there, and you think she's ready to be harvested.  You get a drop of her fluids of off your brush and give it a taste test.  A quick word of approval to Marble of the quality of her fluids, and you dive into her snatch.  Her deep earthy aroma fills your head as you drink deeply of her fluids, licking around her folds and tasting everything she has to offer.  You hear soft moans of pleasure in approval of your efforts, just barely audible over the hum of the milking machine above you."
        );

        this.outx(
            "[pg]Now free to do as it wills, you find that Marble's tail has curled around the back of your head, and is trying its hardest to push you deeper into her rear as possible.  At the same time, your lover's hips are rocking side to side, dragging your face across her gash and spreading her fluids all over your [face].  Trying to steady yourself, you grab two big handfuls of her expansive touch, and lower your head slightly.  This act brings her love-button in line with your mouth, and her passage in line with your nose.  Once again you're overwhelmed by the olfactory sensations, and mindlessly lap away at her fluids and engorged clitoris."
        );

        this.outx(
            "[pg]\"<i>Oh yes, yes!  That's so wonderfuuuuuuul!</i>\"  Marble cries out several more times, as she rides out the orgasm you've brought her to through your efforts to harvest her.  Your reward is to be absolutely drenched in the sweet nectar you've been harvesting all this time, and every drop you catch in your mouth and on your [tongue] is swallowed in an instant.  In the end, you're actually a bit disappointed when her fluids run out."
        );

        this.outx(
            "[pg]You nuzzle in against her soft bum once more, and bat at her tail playfully for a few moments."
        );

        this.outx(
            "[pg]\"<i>Hmm, I'd say that you've made standing like this worth the while, [name].  I think I might be willing to go like this again, if you're able to keep up this level of performance.</i>\""
        );

        this.outx(
            "[pg]You laugh and assure Marble that when it comes to her, you'll always be giving it your all.  Just before you leave, an impish thought passes through your head for a moment, and you slip her tail's brush to Marble's entrance and push it inside a short ways.  Marble starts from the unexpected sensation, and you explain that you're only cleaning up some stray drops of fluid that might still be hiding away."
        );

        this.outx(
            "[pg]After a moment, her tail flicks back out of her passage and she shakes her head at you.  \"<i>Thank you for the thought, sweetie, but please don't get me worked up again now, unless you're going to take care of me again.</i>\""
        );

        this.outx("[pg]Alright, you'll end the teasing, for now.");

        this.flags[kFLAGS.MARBLE_LUST] = 15;
        const pLust: number = Math.floor(10 + this.player.lib / 10);
        this.dynStats("lus", pLust);
        this.dynStats("sen", 1);
        this.model.time.hours++;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private milkMarbleBarPullTail(): void {
        const x: number = this.player.cockThatFits(this.marbleCuntCapacity());
        this.clearOutput();

        this.outx(
            "Probably against your better judgment, you decide to take charge and grab onto Marble's tail, roughly untwisting it off of you and yanking it upwards."
        );

        this.outx('[pg]"<i>Ow!  What the hell sweetie?!</i>"');

        this.outx(
            `[pg]You ignore her protests and smack her ass once, then roughly penetrate her with your ${this.cockDescript(
                x
            )} while yelling at her to take it.`
        );

        this.outx(
            "[pg]There is a loud clop as Marble stomps her hoof on the ground angrily.  With a huff, she lifts herself up on the bar and kicks back with both her legs, sending you flying onto your back and knocking the wind from your lungs.  You gasp for breath a few times, then look up to see Marble looming over you with a wicked smile on her face."
        );

        this.outx(
            "[pg]\"<i>I warned you that I'd be taking charge if you couldn't behave yourself, didn't I [name]?</i>\"  She sits down on your stomach, and presses her hand against your [chest], squeezing you somewhat painfully.  \"<i>Now you're going to be punished!</i>\"  Given her expression, you get the impression that maybe she actually wanted you to misbehave!"
        );

        this.outx(
            "[pg]Your aggressive mate moves forward and straddles your face, shaking her snatch back and forth a few times just above your head.  A few drops of her lubricant drip down onto you, followed by a flick across the nose, delivered by the tail you just grabbed.  At the same time, you're bathed in the deep scent of her aroused sex."
        );
        if (this.flags[kFLAGS.MARBLE_DICK_TYPE] > 0)
            this.outx(
                "  She grabs her erect member, and rubs it against your cheek a few times, spreading around some of her pre-cum."
            );

        this.outx('[pg]"<i>You like it when I take charge, don\'t you?  Hmmhmm, yes...</i>"');

        if (this.flags[kFLAGS.MARBLE_DICK_TYPE] == 0) {
            this.outx(
                "[pg]She drops her hips and roughly forces her womanhood down onto your face, cutting off your ability to breathe.  You sputter and gasp underneath her at the sudden suffocation, though it lasts only a few seconds before she releases you."
            );

            this.outx(
                "[pg]\"<i>Aww, was that too rough?  Don't worry.  I'll be a bit more gentle.</i>\""
            );

            this.outx(
                "[pg]Marble then settles herself down a bit more gently, this time giving you plenty of room to breathe while also keeping your mouth tightly locked against her slick passage."
            );

            this.outx(
                '[pg]"<i>Alright, let\'s put that rude tongue of yours to a much better job.  Lick me.</i>"'
            );

            this.outx(
                "[pg]You do as you're bid and get an approving smile in response.  Digging deeper inside her, you feel under her folds and plunge into her depths.  "
            );
            if (this.player.tongueType > TONUGE_HUMAN)
                this.outx(
                    "You take full advantage of your inhumanly long tongue to fill her up, running across her passage all the way to the entrance to her womb and then back to her lower lips."
                );
            else
                this.outx(
                    "You send your tongue as far into her passage as it will go and wriggle around her lower lips, trying to please your aggressive bovine lover to the best of your abilities."
                );
        } else {
            this.outx(
                `[pg]She forces your mouth open and pushes her hips forward, roughly shoving her ${MarbleScene.num2Text(
                    Math.round(this.flags[kFLAGS.MARBLE_DICK_LENGTH])
                )}-inch cock into your hapless mouth and down your throat.  You choke and sputter in surprise at the sudden suffocation, but it only lasts a few seconds before she pulls back out.`
            );

            this.outx(
                "[pg]\"<i>Aww, was that too rough?  Don't worry, I'll be a bit more gentle.</i>\""
            );

            this.outx(
                "[pg]Marble then thrusts forward much more gently, giving you plenty of time to get use to the sensation of her member inside your mouth.  She also is sure to keep herself well outside of your throat."
            );

            this.outx(
                '[pg]"<i>Alright, let\'s put that rude mouth of yours to a much better job.  Suck me.</i>"'
            );

            this.outx(
                "[pg]You do as you're bid, and get an approving smile in response.  You wrap tightly around her with your lips and slide your tongue up and down the bottom of her shaft while also playing across the urethra.  She pumps herself into you a few times, and you get a taste of some of her pre-cum."
            );
        }

        this.outx(
            '[pg]Marble lifts her hips back up after a few moments, with a curt nod.  "<i>Now, you\'ve got to take care of my tail.  It stings after you pulled on it like that, I want you to apologize to it and kiss it better.</i>"  She then turns around and gives you a good view of that very tail, which seems to be swinging back and forth rather half-heartedly.'
        );

        this.outx(
            "[pg]There, there, you tell the part of your mate's body you hurt before, gently stroking the short furred appendage.  Then you lean forward and repeatedly kiss it, running from the thick tuff on the tip, all the way up to the base where her spine meets the round cheeks of her ass.  When you reach the root, a quiver shoots through Marble's body, and she suddenly grabs you and forces her tail into your mouth.  You gasp in surprise and look up at your lover inquisitively."
        );

        this.outx(
            "[pg]\"<i>Hmm, sorry sweetie, I just thought I'd try something.  It didn't feel the way I expect, but I really like the way you look with my tail in your mouth like that.  If you suck on it for a bit, I might be able to forgive you for yanking it before.</i>\""
        );

        this.outx(
            "[pg]You run your tongue around the sweaty fur and get an approving look from your bovine lover.  Then you shake your jaw back and forth a few times and slowly let her bush slide out of your mouth.  As the last of the hair slips out, you give a small kiss to the tip."
        );

        this.outx('[pg]"<i>Did you like that sweetie?');
        if (this.silly()) this.outx("  Want to brush your teeth with my tail next time?");
        this.outx(
            '</i>"  She nods and considers you for a moment.  "<i>Well, I think I\'m feeling a lot better now.  I think I can forgive you for what you did.  In fact, you did such a good job that I think I\'ll give you a reward!</i>"'
        );

        this.outx("[pg]With a smile, you ask her what she's got planned for you.");

        this.outx(
            '[pg]She repositions herself overtop of your waist and eyes your male member.  "<i>Obviously this thing here is in need of some treatment, since you were so eager to try and take charge with it before.</i>"  She drops down and brings the flaps of her womanhood into contact with the front of your shaft and runs them over it a couple of times.  "<i>Look how hard you are.  You really want me to take you inside me, don\'t you?  You want so much to give complete control of your long, hard, dick, to me to use as I see fit.</i>"'
        );

        this.outx(
            `[pg]She doesn't let you respond.  She's already decided what is going to happen, and that's for you to go inside her and be used by her as she sees fit.  She strokes your ${this.cockDescript(
                x
            )} with one finger, then pushes it into her waiting cunt.  You slip easily into her very well lubricated passage and groan as it clamps down on you.  Every part of your shaft is being tightly wrapped in the ring of her vaginal muscles, and you can't help but groan in pleasure.`
        );

        this.outx(
            '[pg]She shakes her hips side to side a few times, spinning your shaft around her interior, then stops and considers you.  "<i>You know, I was thinking that maybe I\'m giving you too much of a reward, or maybe not enough of one?</i>"  The same wicked look when she first knocked you over crosses her eyes once more.  "<i>Let\'s try something new...</i>"  She turns away from you and puts her hand somewhere behind her, outside of your view.'
        );

        this.outx(
            "[pg]After a moment, you suddenly feel something pushing up against the entrance to your [vagOrAss]!  You try to ask what Marble has planned, but the pressure forces something bushy into your hole.  She just stuck her tail into your [vagOrAss]!"
        );

        this.outx(
            `[pg]"<i>Well sweetie, what do you think?</i>"  It quivers a few times as Marble resumes the rocking of her wide womanly hips.  "<i>Never mind, if you don't like it, well you can just try and end this as soon as possible.  If you do like it, then I guess...</i>"  She leans forward as she switches from a swinging movement to a bounce on your ${this.cockDescript(
                x
            )}, and her furry tufft of a backend appendage starts to push its way in deeper sliding easily thanks to your saliva on it.  "<i>You'll just have to bear it as long as you can!</i>"`
        );

        this.outx(
            "[pg]You've never seen Marble this aggressive before, but the cause is rather obvious: the whirring milking machine that's currently attached to her breasts.  Obviously giving milk is triggering some kind of dominance instinct, and it's incredibly sexy!"
        );

        this.outx(
            "[pg]Your lover laughs uproariously as she continues to ride you hard and fast, bringing up the pleasure in your lower body just as hard and fast.  Whether or not you want it, you can feel an orgasm rapidly building up within you, easily detectable to your rider from the increased rate of your gasps and cries of pleasure.  For her part, Marble is rapidly approaching her peak as well, and with a practiced rhythm, the two of you cum in unison as your lover's tail pops out of your [vagOrAss]."
        );

        this.outx(
            '[pg]The bovine woman gasps a few times above you in exhaustion, her great breasts heaving with each breath.  She then reaches down and pulls your head up and cradles it to her chest, smiling very happily.  "<i>Well sweetie, if you ever want me to play rough again, you know what to do.  I\'m looking forward to any other adventures the two of us have in the bedroom, are you?</i>"'
        );

        this.outx(
            "[pg]You snuggle up to her bosom, thinking something very similar.  Things certainly haven't been dull while you've been in Marble's milking stall, that's for certain."
        );

        this.player.orgasm();
        this.dynStats("lus", 20);
        this.flags[kFLAGS.MARBLE_LUST] = 15;
        this.dynStats("sen", -2);
        this.marblePreggoChance(1);
        this.doNext(this.camp.returnToCampUseTwoHours);
    }

    private milkMarbleLeaveAfterBar(): void {
        this.clearOutput();

        this.outx(
            "You don't answer Marble and instead continue to finger her womanhood until she cries out in orgasm.  You tell her you'd be happy to help her out again whenever she'd like someone to accompany her to get milked."
        );

        this.outx(
            "[pg]She is a bit disappointed that you didn't go further after getting her on the bar, but doesn't have a problem with you leaving.  She does tell you that she's looking forward to having you in her milker again some time."
        );

        const pLust: number = Math.floor(5 + this.player.lib / 20);
        this.dynStats("lus", pLust);
        this.flags[kFLAGS.MARBLE_LUST] += 5;
        this.doNext(this.camp.returnToCampUseTwoHours);
    }

    private milkMarbleNoMilking(): void {
        this.clearOutput();
        this.outx("You shake your head and say that you think you'll be fine.");

        this.outx(
            '[pg]"<i>Oh, alright then sweetie, I\'ll see you later.</i>"  She takes a seat in the chair in the middle of the room and picks up where she left off in her book.  You excuse yourself and return back to camp.'
        );

        this.doNext(this.camp.returnToCampUseTwoHours);
    }
}
