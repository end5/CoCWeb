import { TONUGE_DEMONIC } from "../../../includes/appearanceDefs";
import { BaseContent } from "../../BaseContent";
import { CockTypesEnum } from "../../CockTypesEnum";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { PregnancyStore } from "../../PregnancyStore";
import { StatusAffects } from "../../StatusAffects";
import { FetishCultistScene } from "./Lake/FetishCultistScene";
import { FetishZealotScene } from "./Lake/FetishZealotScene";
import { GooGirlScene } from "./Lake/GooGirlScene";
import { GreenSlime } from "./Lake/GreenSlime";
import { GreenSlimeScene } from "./Lake/GreenSlimeScene";
import { Kaiju } from "./Lake/Kaiju";
import { SwordInStone } from "./Lake/SwordInStone";

/**
 * Created by aimozg on 06.01.14.
 */

export class Lake extends BaseContent {
    public fetishCultistScene: FetishCultistScene = new FetishCultistScene();
    public fetishZealotScene: FetishZealotScene = new FetishZealotScene();
    public gooGirlScene: GooGirlScene = new GooGirlScene();
    public greenSlimeScene: GreenSlimeScene = new GreenSlimeScene();
    public kaiju: Kaiju = new Kaiju();
    public swordInStone: SwordInStone = new SwordInStone();
    public Lake() {}
    // Explore Lake
    public exploreLake(): void {
        // Increment exploration count
        this.player.exploredLake++;
        if (kGAMECLASS.poniesYN()) return;

        // Helia monogamy fucks
        if (
            this.flags[kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 &&
            this.flags[kFLAGS.HEL_RAPED_TODAY] == 0 &&
            Lake.rand(10) == 0 &&
            this.player.gender > 0 &&
            !kGAMECLASS.helScene.followerHel()
        ) {
            kGAMECLASS.helScene.helSexualAmbush();
            return;
        }
        if (this.player.exploredLake % 20 == 0) {
            this.ottahGirl();
            return;
        }
        // Egg chooser
        if (
            Lake.rand(100) < 25 &&
            this.player.pregnancyIncubation > 1 &&
            this.player.pregnancyType == PregnancyStore.PREGNANCY_OVIELIXIR_EGGS
        ) {
            this.clearOutput();
            this.outx(
                "While wandering along the lakeshore, you spy beautiful colored lights swirling under the surface.  You lean over cautiously, and leap back as they flash free of the lake's liquid without making a splash.  The colored lights spin in a circle, surrounding you.  You wonder how you are to fight light, but they stop moving and hover in place around you.  There are numerous colors: Blue, Pink, White, Black, Purple, and Brown.  They appear to be waiting for something; perhaps you could touch one of them?"
            );
            this.menu();
            this.addButton(0, "Blue", this.eggChoose, 2);
            this.addButton(1, "Pink", this.eggChoose, 3);
            this.addButton(2, "White", this.eggChoose, 4);
            this.addButton(3, "Black", this.eggChoose, 5);
            this.addButton(4, "Purple", this.eggChoose, 1);
            this.addButton(5, "Brown", this.eggChoose, 0);
            this.addButton(9, "Escape", this.eggChooseEscape);
            return;
        }
        // Did it already output something?
        let displayed = false;
        const choice: any[] = [];

        // Build choice list.
        // ==================================================
        // COMMON EVENTS
        if (this.player.level < 2 || this.player.spe < 50) choice[choice.length] = 0;
        choice[choice.length] = 1;
        choice[choice.length] = 2;
        // Fetish cultist not encountered till level 2
        if (
            this.player.level >= 2 &&
            this.player.findStatusAffect(StatusAffects.DungeonShutDown) >= 0
        )
            choice[choice.length] = 3;
        // Slimes/Ooze = level >= 2
        if (this.player.level >= 2) choice[choice.length] = 4;
        // Izma
        if (
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00230] > 0 &&
            this.player.exploredLake >= 10 &&
            (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00233] == 0 ||
                this.player.findStatusAffect(StatusAffects.Infested) < 0) &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] <= 0
        )
            choice[choice.length] = 5;
        // Rathazul
        if (this.player.findStatusAffect(StatusAffects.CampRathazul) < 0) choice[choice.length] = 6;

        // UNCOMMON EVENTS
        // Goo finding!
        if (
            Lake.rand(30) == 0 &&
            this.flags[kFLAGS.GOO_TFED_MEAN] + this.flags[kFLAGS.GOO_TFED_NICE] > 0 &&
            this.flags[kFLAGS.GOO_SLAVE_RECRUITED] == 0
        ) {
            kGAMECLASS.latexGirl.encounterLeftBehindGooSlave();
            return;
        }
        // Chance of dick-dragging! OLD:10% + 10% per two foot up to 30%
        this.temp = 10 + ((this.player.longestCockLength() - this.player.tallness) / 24) * 10;
        if (
            this.temp > 0 &&
            this.player.longestCockLength() >= this.player.tallness - 10 &&
            this.player.totalCockThickness() >= 8
        )
            choice[choice.length] = 8;

        // ONE TIME EVENTS
        // Amily Village discovery
        if (this.flags[kFLAGS.AMILY_VILLAGE_ACCESSIBLE] == 0) choice[choice.length] = 9;
        // Sword Discovery
        if (
            this.player.findStatusAffect(StatusAffects.TookBlessedSword) < 0 &&
            this.player.findStatusAffect(StatusAffects.BSwordBroken) < 0
        )
            choice[choice.length] = 10;
        // Pre-emptive chance of finding the boat
        if (this.player.findStatusAffect(StatusAffects.BoatDiscovery) < 0)
            choice[choice.length] = 11;

        // CHOOSE YOUR POISON!
        const select = choice[Lake.rand(choice.length)];

        // ==============================
        // EVENTS GO HERE!
        // ==============================
        // Pre-emptive chance of discovering Amily the stupidshit mouse
        if (select == 9) {
            kGAMECLASS.amilyScene.discoverAmilyVillage();
        }
        // Pre-emptive chance of discovering the Beautiful Sword
        else if (select == 10) {
            this.swordInStone.findSwordInStone();
        }
        // Pre-emptive chance of finding the boat
        else if (select == 11) {
            kGAMECLASS.boat.discoverBoat();
        }
        // Meet Izma every 8 attempts
        else if (select == 5) {
            kGAMECLASS.izmaScene.meetIzmaAtLake();
        }
        // Chance of dick-dragging! 10% + 10% per two foot up to 30%
        else if (select == 8) {
            // True sets to use lake scene!
            kGAMECLASS.forest.bigJunkForestScene(true);
        } else if (select == 4) {
            // Chance of seeing ooze convert goo!
            // More common if factory blew up
            if (
                this.player.findStatusAffect(StatusAffects.FactoryOverload) >= 0 &&
                Lake.rand(10) == 0
            ) {
                this.gooGirlScene.spyOnGooAndOozeSex();
                return;
            }
            // Else pretty rare.
            else if (Lake.rand(25) == 0) {
                this.gooGirlScene.spyOnGooAndOozeSex();
                return;
            }
            let girlOdds = 50;
            // 50% odds of slime-girl, 75% if shutdown factory
            if (
                this.player.findStatusAffect(StatusAffects.DungeonShutDown) >= 0 &&
                this.player.findStatusAffect(StatusAffects.FactoryOverload) < 0
            )
                girlOdds += 25;
            if (this.player.findStatusAffect(StatusAffects.FactoryOverload) >= 0) girlOdds -= 25;
            // Slimegirl!
            if (Lake.rand(100) <= girlOdds) {
                this.gooGirlScene.encounterGooGirl();
            }
            // OOZE!
            else {
                this.flags[kFLAGS.TIMES_MET_OOZE]++;
                this.spriteSelect(25);
                // High int starts on even footing.
                if (this.player.inte >= 25) {
                    this.outx(
                        "A soft shuffling sound catches your attention and you turn around, spotting an amorphous green mass sliding towards you!  Realizing it's been spotted, the ooze's mass surges upwards into a humanoid form with thick arms and wide shoulders.  The beast surges forward to attack!",
                        true
                    );
                    this.startCombat(new GreenSlime());
                    if (
                        this.player.findStatusAffect(StatusAffects.DungeonShutDown) >= 0 &&
                        this.player.findStatusAffect(StatusAffects.FactoryOverload) < 0
                    )
                        this.outx(
                            "\n\n<b>You are amazed to encounter a slime creature with the factory shut down - most of them have disappeared.</b>",
                            false
                        );
                    return;
                }
                // High speed starts on even footing.
                if (this.player.spe >= 30) {
                    this.outx(
                        "You feel something moist brush the back of your ankle and instinctively jump forward and roll, coming up to face whatever it is behind you.  The nearly silent, amorphous green slime that was at your feet surges vertically, its upper body taking the form of a humanoid with thick arms and wide shoulders, which attacks!",
                        true
                    );
                    this.startCombat(new GreenSlime());
                    if (
                        this.player.findStatusAffect(StatusAffects.DungeonShutDown) >= 0 &&
                        this.player.findStatusAffect(StatusAffects.FactoryOverload) < 0
                    )
                        this.outx(
                            "\n\n<b>You are amazed to encounter a slime creature with the factory shut down - most of them have disappeared.</b>",
                            false
                        );
                    return;
                }
                // High strength gets stunned first round.
                if (this.player.str >= 40) {
                    this.outx(
                        "Without warning, you feel something moist and spongy wrap around your ankle, nearly pulling you off balance.  With a ferocious tug, you pull yourself free and turn to face your assailant.  It is a large green ooze that surges upwards to take the form of humanoid with wide shoulders and massive arms.  It shudders for a moment, and its featureless face shifts into a green version of your own! The sight gives you pause for a moment, and the creature strikes!",
                        true
                    );
                    if (
                        this.player.findStatusAffect(StatusAffects.DungeonShutDown) >= 0 &&
                        this.player.findStatusAffect(StatusAffects.FactoryOverload) < 0
                    )
                        this.outx(
                            "\n\n<b>You are amazed to encounter a slime creature with the factory shut down - most of them have disappeared.</b>",
                            false
                        );
                    this.startCombat(new GreenSlime());
                    this.outx("\n\n", false);
                    this.monster.eAttack();
                    return;
                }
                // Player's stats suck and you should feel bad.
                this.outx(
                    "Without warning, you feel something moist and spongy wrap around your ankle, pulling you off balance!  You turn and try to pull your leg away, struggling against a large green ooze for a moment before your foot comes away with a *schlorp* and a thin coating of green fluid.  The rest of the ooze rises to tower over you, forming a massive green humanoid torso with hugely muscled arms and wide shoulders.  Adrenaline rushes into your body as you prepare for combat, and you feel your heart skip a beat as your libido begins to kick up as well!",
                    true
                );
                if (
                    this.player.findStatusAffect(StatusAffects.DungeonShutDown) >= 0 &&
                    this.player.findStatusAffect(StatusAffects.FactoryOverload) < 0
                )
                    this.outx(
                        "\n\n<b>You are amazed to encounter a slime creature with the factory shut down - most of them have disappeared.</b>",
                        false
                    );
                this.dynStats("lib", 1, "lus", 10);
                this.startCombat(new GreenSlime());
            }
        } else if (select == 0) {
            this.outx("Your quick walk along the lakeshore feels good.", true);
            if (this.player.spe >= 50) {
            } else {
                this.outx(
                    "  You bet you could cover the same distance even faster next time.\n",
                    false
                );
                this.dynStats("spe", 0.75);
            }
            this.doNext(this.camp.returnToCampUseOneHour);
        } else if (select == 1) {
            // No boat, no kaiju
            if (
                this.player.level >= 5 &&
                this.flags[kFLAGS.KAIJU_DISABLED] == 0 &&
                this.player.findStatusAffect(StatusAffects.BoatDiscovery) >= 0
            ) {
                this.kaiju.kaijuMeeting();
                return;
            }
            this.outx(
                "Your stroll around the lake increasingly bores you, leaving your mind to wander.  ",
                true
            );
            if (this.player.cor > 30 || this.player.lust > 60 || this.player.lib > 40)
                this.outx("Your imaginings increasingly seem to turn ");
            else this.dynStats("int", 1);
            if (
                (this.player.cor > 30 && this.player.cor < 60) ||
                (this.player.lust > 60 && this.player.lust < 90) ||
                (this.player.lib > 40 && this.player.lib < 75)
            ) {
                this.outx("to thoughts of sex.");
                this.dynStats("lus", 5 + this.player.lib / 10);
                displayed = true;
            }
            if (
                (this.player.cor >= 60 || this.player.lust >= 90 || this.player.lib >= 75) &&
                !displayed
            ) {
                this.outx(
                    "into daydreams of raunchy perverted sex, flooding your groin with warmth.",
                    false
                );
                this.dynStats("lus", this.player.cor / 10 + this.player.lib / 10);
            }
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        // Find whitney or equinum
        else if (select == 2) {
            // 40% chance of item, 60 of whitney.
            if (Lake.rand(10) < 4) {
                this.findLakeLoot();
            }
            // Find Whitney
            else {
                // Have you met whitney?
                if (this.player.findStatusAffect(StatusAffects.MetWhitney) >= 0) {
                    // Is the farm in your places menu?
                    if (this.player.statusAffectv1(StatusAffects.MetWhitney) > 1) {
                        // If so, find equinum or whisker fruit
                        this.findLakeLoot();
                    }
                    // If you havent met whitney enough to know the farm....
                    else kGAMECLASS.farm.farmExploreEncounter();
                }
                // If you havent met whitney, you can find the farm....
                else kGAMECLASS.farm.farmExploreEncounter();
            }
        } else if (select == 3) {
            if (this.player.findStatusAffect(StatusAffects.FetishOn) < 0) {
                this.player.createStatusAffect(StatusAffects.FetishOn, 0, 0, 0, 0);
                this.outx(
                    "While exploring, you notice something unusual on the lake.  This something is quickly moving towards you at a surprising rate, much faster than anything you've ever seen before.  Wary of meeting new things in this world after your previous experiences, you decide to slip behind a nearby hill and watch it while hidden.  Soon the object comes into view and you can see that it is a boat of some kind.  It looks almost like a large open box on the water with some kind of gazebo on it.  Despite how fast it is moving, you can't see any oars or means of moving the boat.  It slows somewhat when it gets close to the shore, but is still going about as fast as you can run when it hits the shore and extends some kind of gangplank onto the lake shore.  With a close up view, you estimate that it is six feet across, ten feet long, and doesn't actually seem to have very much of it underwater.  You guess that it must be magic in some way.  There are several robe-clad figures on board.\n\n",
                    true
                );
                this.outx(
                    "After a moment, a number of the figures disembark down the gangplank and immediately go off in different directions.  You count half a dozen of them, and guess that they are female when one of them passes by close to you and you see the hole in her outfit over her naughty bits.  You look back at the boat to see it close the gangplank, and move back onto the lake, with only one of the figures still on board.  Surprised to hear a sudden yell, you look to the side and see the clothing of the one who passed you earlier shift and twist before becoming some pink outfit that clings to her backside.  You are stunned for a moment as she disappears from sight before you shake your head and move on.  It seems there are new residents to the lake.\n\n<b>(Fetish Cultists can now be encountered!)</b>",
                    false
                );

                // (increase player lust from the sights they saw)
                this.dynStats("lus", 5);
                this.doNext(this.camp.returnToCampUseOneHour);
                return;
            }
            this.fetishCultistScene.fetishCultistEncounter();
        } else if (select == 6) {
            kGAMECLASS.rathazul.encounterRathazul();
        } else {
            this.outx(
                `OH SHIT! LAKE EXPLORE BE BROKED.  SELECT: ${select}.  You should probably go to fenoxo.com and click the link to report a bug and tell Fen about it.`
            );
        }
    }

    private findLakeLoot(): void {
        this.clearOutput();
        if (Lake.rand(2) == 0) {
            this.outx(
                "You find a long and oddly flared vial half-buried in the sand.  Written across the middle band of the vial is a single word: 'Equinum'.\n"
            );
            this.inventory.takeItem(this.consumables.EQUINUM, this.camp.returnToCampUseOneHour);
        } else {
            this.outx(
                "You find an odd, fruit-bearing tree growing near the lake shore.  One of the fruits has fallen on the ground in front of you.  You pick it up.\n"
            );
            this.inventory.takeItem(this.consumables.W_FRUIT, this.camp.returnToCampUseOneHour);
        }
    }

    private eggChoose(eggType: number): void {
        this.clearOutput();
        this.outx("You reach out and touch the ");
        switch (eggType) {
            case 0:
                this.outx("brown");
                break;
            case 1:
                this.outx("purple");
                break;
            case 2:
                this.outx("blue");
                break;
            case 3:
                this.outx("pink");
                break;
            case 4:
                this.outx("white");
                break;
            default:
                this.outx("black");
                break;
        }
        this.outx(
            " light.  Immediately it flows into your skin, glowing through your arm as if it were translucent.  It rushes through your shoulder and torso, down into your pregnant womb.  The other lights vanish."
        );
        this.player.statusAffect(this.player.findStatusAffect(StatusAffects.Eggs)).value1 = eggType; // Value 1 is the egg type. If pregnant with OviElixir then StatusAffects.Eggs must exist
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private eggChooseEscape(): void {
        this.clearOutput();
        this.outx(
            "You throw yourself into a roll and take off, leaving the ring of lights hovering in the distance behind you."
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Just want to do a quick Ottergirl event submission after you mentioned it!
    private ottahGirl(): void {
        this.clearOutput();
        this.flags[kFLAGS.MET_OTTERGIRL]++;
        // First Time
        if (this.flags[kFLAGS.MET_OTTERGIRL] == 1) {
            this.outx(
                "Your exploration of the lakeside takes you further than you've gone before.  The water here is almost completely still, its waters "
            );
            if (this.player.findStatusAffect(StatusAffects.FactoryOverload) < 0)
                this.outx("crystal clear, giving you a stunning view of the lakebed");
            else this.outx("only slightly clouded, giving you an obscured view of the lakebed");
            this.outx(
                ".  Fish dart to and fro within the waters, caring little for your explorations above the waves."
            );

            this.outx(
                "\n\nYou watch the fish for a few minutes until you notice that you're not alone on the shoreline. Further down the sandy beaches sits a solitary, feminine figure, her legs parted and arched.  A fishing rod is held lazily in her hands.  You trace the fishing line with your eyes, seeing a little piece of flotsam bobbing up and down a fair distance into the water."
            );

            this.outx(
                "\n\nYou decide to approach this figure, who notices your advance. You spot her subtly shift her position, as though she's readying her body to bolt if you turn out to be hostile.  But still, she lets you approach.  The closer you get, the more of her features you can make out.  Her skin appears to be covered with damp, brown fur.  A long, thick tail sticks out from behind her, at least as wide-around as her leg, narrowing down into a rounded tip.  A short mop of sun bleached blonde hair, barely reaching down to her chin, frames a human-like face with a cute, upturned button nose. Her body, which is lithe and toned like that of a champion swimmer, is covered only by a two-piece bikini.  Her chest is surprisingly small, perhaps only A-cups, though she looks physically mature.  Identifying this person as an otter-girl, you'd guess larger breasts would make it harder to swim."
            );

            this.outx(
                '\n\nYou stop a few feet away from her. She gives you a friendly smile.  "<i>Well hey there, friend. You don\'t smell like one of them demon fellers,</i>" she says with a light accent, reminding you of the farmers\' daughters back in Ingnam. Her eyes travel up and down your body.  "<i>So,</i>" she says cheerfully, "<i>you wanna fish\'n\'fuck?</i>"'
            );

            this.outx("\n\nYou can't help your eyebrow from quirking upwards.  What did she say?");

            this.outx(
                `\n\n"<i>Fish'n'fuck,</i>" she replies, simply.  "<i>I fish, you fuck. Ya ain't dense, are you ${this.player.mf(
                    "boy",
                    "girl"
                )}?</i>"`
            );

            this.outx(
                "\n\nThat's it?  She doesn't even know you and she's just offering it up like that?"
            );
            // Silly Mode:
            if (this.silly())
                this.outx(
                    "  No tragic backstory to go through? No annoying combat encounter? Just meet and fuck?  My god, what has this world come to?"
                );
            this.outx("  You don't even know her name!");

            this.outx(
                "\n\n\"<i>Name's Callu.  Don't worry darlin', I don't plan on stickin' nothin' where it don't belong,</i>\" her soft voice chimes, \"<i>Unlike damn near everything else around here.</i>\""
            );

            this.outx("\n\nWell, how about it?");

            // [Facesitting] [Fuck Her] [Skedaddle]
        }
        // Repeats
        else {
            this.outx(
                "Your explorations of the lake lead you back to Callu, the otter girl. She sits lazily on the beach; fishing rod in hand, as usual. She gives a friendly wave as you approach, and pats the sandy patch of lakeside next to her."
            );
            this.outx(
                '\n\n"<i>Well ain\'t you a sight for sore eyes.</i>"  You sit down next to her and relax, just sitting and watching the makeshift bobber tip and sway in the water.  "<i>You up for a fish\'n\'fuck then?</i>" she asks suddenly, brushing a strand of her sun bleached blonde hair out of her face.'
            );

            this.outx("\n\nWell, are you?");

            // [Facesitting] [Fuck Her] [Fish] [Skedaddle]
        }
        this.menu();
        if (this.player.lust < 33) this.outx("\n\nYou aren't aroused enough to fuck her.");
        else {
            // (If cocksize above 48")
            if (this.player.hasCock()) {
                if (this.player.shortestCockLength() > 48)
                    this.outx("\n\nUnfortunately, you don't think she can quite handle your cock.");
                else this.addButton(0, "Fuck Her", this.ottergirlLikesDongs);
            }
            if (this.player.hasVagina() || !this.player.hasCock())
                this.addButton(1, "Facesitting", this.ottersForGals);
        }
        if (this.flags[kFLAGS.MET_OTTERGIRL] > 1)
            this.addButton(2, "Get Fish", this.getSomeFishYaFatty);
        this.addButton(4, "Leave", this.avoidZeOtterPussy);
    }

    // For Dicks
    private ottergirlLikesDongs(): void {
        this.clearOutput();
        this.outx(
            "The moment you agree, a sly smile spreads across her face.  She jams the end of her fishing pole into the sand like a post, to prevent it from going anywhere, and stands up.  There's no tease, no ceremony as she strips out of her bikini bottoms and tosses them aside.  Her newly revealed mound has only the barest tuft of pubic hair, a little wisp of blonde hair amongst the sparse brown fur."
        );

        this.outx(
            "\n\nYou move forward, intent on groping Callu's little breasts still hidden beneath the bikini top, but she holds up a hand and says, \"<i>Whoa there darlin', that ain't how a fish'n'fuck works.  You just lay down, and I'll take care of everything. And make sure you're as naked as a newborn babe.</i>\""
        );

        this.outx(
            "\n\nStrange, but you oblige, stripping off your [armor] and gear and tossing them aside. Callu instructs you to lay down on the beach next to her fishing pole, which you likewise oblige.  The otter-girl straddles your stomach, facing away from you, though her thick, heavy tail is thankfully kept away from your face."
        );
        let y = -1;
        this.temp = 0;
        while (this.temp < this.player.cockTotal()) {
            if (this.player.cocks[this.temp].cockLength < 48) {
                if (y < 0) y = this.temp;
                else if (this.player.cocks[this.temp].cockLength > this.player.cocks[y].cockLength)
                    y = this.temp;
            }
            this.temp++;
        }
        if (y < 0) y = this.player.smallestCockIndex();
        const x: number = y;

        // (Under 6")
        if (this.player.cocks[x].cockLength < 6)
            this.outx(
                "\n\n\"<i>Well butter my buns and call me a biscuit, ain't this a cute little thing,</i>\" she remarks, inspecting your tiny cock.  \"<i>I ain't never seen one this small.  I just wanna wrap it up in a little bow and cuddle with it.  You sure it ain't a clit, darlin'?</i>\""
            );
        // (6"-10")
        else if (this.player.cocks[x].cockLength < 10)
            this.outx(
                "\n\n\"<i>Just packin' the average model, eh?  Nothin' wrong with that,</i>\" she remarks while inspecting your cock."
            );
        // (10"-24")
        else if (this.player.cocks[x].cockLength < 24)
            this.outx(
                '\n\n"<i>Oh my, now that\'s a manly piece of meat right there,</i>" she remarks, inspecting your oversized cock.  "<i>I could enjoy that bad boy all day.</i>"'
            );
        // (24"-48")
        else
            this.outx(
                '\n\n"<i>Whoa nellie,</i>" she says, her eyes going wide as they feast upon your giant cock.  "<i>That.  That right there, darlin\', is one grade-A trouser snake.  I\'ve seen centaurs that\'d look like geldings next to you.</i>"'
            );
        this.outx(
            "  She leisurely stretches out across your stomach and chest, letting her cunt come to rest right in front of your face."
        );

        this.outx(
            `\n\nYou feel slender but powerful fingers wrap around your cock, followed shortly after by a pair of lips. They encircle your ${this.player.cockHead(
                x
            )} and suck, creating a delightful tingling sensation that travels down your cock and into your core.`
        );

        this.outx("\n\n\"<i>Hey darlin', better get to lickin', we want this ");
        // {(lil dicks)
        if (this.player.cocks[x].cockLength < 6) this.outx("little, wanna-be cock");
        else this.outx("bad boy");
        this.outx(
            " to slip right in, don't we?</i>\"  Callu murrs back at you.  You most certainly do, so you lean your head forward ever-so-slightly, extending your tongue and lapping at her delicate pussy lips.  In no time at all they become puffy and flushed, blossoming outwards like a perverse flower.  You run your tongue up and down each and every fold, occasionally stopping to flick over her rapidly hardening clitoris."
        );

        this.outx(
            `\n\nLikewise, her tongue and lips dance over your ${this.cockDescript(
                x
            )} like a trio of dancers. They spin, twist, hop and tease, ensuring that no inch is left untouched.`
        );
        this.outx("  She pays particularly close attention ");

        // [equine]
        if (this.player.cocks[x].cockType == CockTypesEnum.HORSE)
            this.outx("to your flare, sucking, teasing and ");
        // [canine]
        else if (this.player.hasKnot(x))
            this.outx("to the base of your cock, planting sloppy kisses on your knot, ");
        // [demonic]
        else if (this.player.cocks[x].cockType == CockTypesEnum.DEMON)
            this.outx("to the demonic nodules ringing your cock, ");
        // [anemone]
        else if (this.player.cocks[x].cockType == CockTypesEnum.ANEMONE)
            this.outx("to the little wriggling tentacles ringing the head and base of your cock, ");
        else this.outx("to the sensitive little spot on the underside of the head, ");
        this.outx(
            "lavishing it with attention.  Precum and saliva practically pour down the length of your shaft, tickling your "
        );
        if (this.player.balls > 0 && this.player.hasVagina()) this.outx("balls and cunt");
        else if (this.player.balls > 0) this.outx("balls");
        else if (this.player.hasVagina()) this.outx("cunt");
        else this.outx("ass");
        this.outx(" as they dribble down and form a small puddle between your [legs].");

        this.outx(
            `\n\nAfter several minutes of this, Callu relinquishes her hold on your member and says, "<i>Mm, I reckon that'll work just fine.</i>"  She sits up and positions herself over your ${this.cockDescript(
                x
            )}.  Slowly she lowers herself, first taking your ${this.player.cockHead(
                x
            )}.  Her cunt, slick and aroused as it is, offers no resistance despite its tightness.  Its walls pulse and quiver around you, as though the otter has complete control over it.  Inch by inch she sinks down further, `
        );
        // (dicks 10" or less)
        if (this.player.cocks[x].cockLength < 10) this.outx("until she comes to rest on your lap");
        // (10"-24")
        else if (this.player.cocks[x].cockLength < 24)
            this.outx(
                "slowly devouring your entire cock, until she finally comes to rest on your lap"
            );
        else
            this.outx(
                "an excruciatingly long process as feet worth of hard cockmeat disappear into her snatch. There's a small moment of resistance, followed by a soft squelch and a sudden \"<i>Oooh</i>\" from Callu.  With no small amount of trepidation, you realize you've just penetrated into her womb.  You can't tell from the way she's facing, but you're certain her stomach has to be bulging outwards at this point"
            );
        this.outx(".");

        this.outx("\n\nWith your entire ");
        if (this.player.cocks[x].cockThickness >= 3) this.outx("impressive ");
        this.outx(
            "girth within her she settles down on your lap, stretching her legs out before retrieving her fishing rod.  \"<i>Now don't you go movin' about, darlin',</i>\" Callu says over her shoulder.  \"<i>Don't wanna go scarin' the fish away.  I'll let ya go after I catch a few good ones.</i>\""
        );

        this.outx(
            `\n\nSurprisingly, you can still feel a throbbing around your ${this.cockDescript(
                x
            )}, reaffirming your belief that she can somehow control the muscles buried within her abdomen.  Even as you lay stock-still on the sandy beach, you feel the sensation of thrusting, as though you were actively fucking this little slut sitting atop you.  The feeling is extremely pleasant, not to mention a little hypnotic.  You reach your hands up to grasp Callu's hips lightly.  She doesn't seem to mind, though as you start squeezing her in time with your phantom thrusts a quick swat to your hand lets you know that you're crossing an unspoken boundary.`
        );

        this.outx(
            "\n\nWith nothing else to do, you close your eyes and relax.  The rhythmic pulsing of this otter-girl's tight pussy seems to deepen your relaxation, though your dick remains as hard as it's ever been. Minutes pass, and the thrusting sensation doesn't appear to be dying down."
        );

        this.outx(
            `\n\nA sudden, strange high-pitched sound suddenly rings out and your head bolts upright, only to see Callu reeling in a fish.  She looks it over, nods once to herself and tucks it away in an ice chest cleverly buried under the sand right next to the two of you.  Afterwards she stands up, letting your dick fall out of her.  Your ${this.cockDescript(
                x
            )} feels strange, and uncomfortably naked somehow, especially as a cool wind blows over its saliva and femcum-covered skin.`
        );

        this.outx(
            "\n\nIt doesn't have to suffer long, at least, as Callu casts a new line and positions herself over your cock once more. Inch by delicious inch sinks into her, making you shiver all over.  However, this time she doesn't sit all the way down.  Instead she straddles your waist, standing on the balls of her feet.  The now-familiar pulsing returns, but in addition she gyrates her hips, circling them around and around.  With each rotation it feels as though your cock is being squeezed tighter and tighter, but this time you can't simply relax and close your eyes, not with that captivating bubble butt swaying in front of your face."
        );

        this.outx(
            "\n\nHer rear swings and swivels, spins and pirouettes, but the entire time her focus on the fishing line remains constant.  It's as if you're a side-note to her day; as though sex like this, with such mind-blowing sensations, was an everyday occurrence.  The movement of her hips intensifies, as does the pulsing within that sweet, hot snatch.  In no time at all your vision begins to go hazy, your body tensing as it's wracked with pleasurable, orgasmic electricity."
        );

        this.outx(
            "\n\nYour body arches, thrusting your cock fully inside Callu, your hips meeting with a lewd, wet smack.  Your cock jerks, spurting jet after jet of seed into the otter-girl's greedy cunt."
        );
        // (Cum quantity high enough)
        if (this.player.cumQ() >= 250) {
            this.outx("  There's so much of it, ");
            if (this.player.cumQ() < 500)
                this.outx(
                    "some of it begins to dribble down your cock, forming a puddle right under your ass cheeks"
                );
            else if (this.player.cumQ() < 1000)
                this.outx(
                    "it begins to spray out of the edges of your cock, like water coming out of a blocked faucet"
                );
            else if (this.player.cumQ() < 2000)
                this.outx(
                    "Callu's stomach begins to visibly inflate, even from your point of view"
                );
            else
                this.outx(
                    "Callu's stomach inflates to a huge degree. She suddenly looks to be about eight months pregnant, though she doesn't seem bothered by this in the least"
                );
            this.outx(".");
        }
        this.outx(
            "  Her womb greedily takes everything it can, until you fall back onto the ground, exhausted."
        );

        this.outx("\n\nTo your surprise, Callu simply picks up where she left off");
        if (this.player.cumQ() >= 2000) this.outx(", despite the huge belly she now sports");
        this.outx(
            ".  Gyrations, thrusts and the constant cadence of her cunt work together to keep you unbearably hard.  Apparently she's not satisfied."
        );

        this.outx(
            "\n\nIt takes at least three more orgasms and seven caught fish before Callu relaxes; securing her fishing rod and setting it aside.  She lays backwards, pressing her back into your stomach and chest, and swivels her head to kiss you on the lips.  \"<i>Mmmm, you're such a good sport darlin',</i>\" she murrs, still clenching down on your cock.  \"<i>I ain't never had a fish'n'fuck like you before.</i>\"  The fisherwoman moves to stand up, and "
        );
        if (this.player.hasKnot(x))
            this.outx(
                "fails, held fast by the knot tying the two of you together. She looks at you in surprise, but eventually smiles and leans back down. The two of you cuddle for half an hour, until your knot deflates enough to let her *pop* off of it. She stands and "
            );
        this.outx("slips her bikini bottoms into a canvas bag.");

        this.outx(
            '\n\nFrom the same bag she pulls out a delicious smelling piece of cooked fish, wrapped in a large green leaf.  She hands it to you, saying simply, "<i>Fish and a fuck, darlin\'.  I got mine and you get yours.</i>"  You nod absently, taking the piece of wrapped fish.  Callu gives your rapidly limpening cock a little pat on the head, before gathering up her things and heading off down the beach, leaving behind a trail of cum and other love juices.'
        );

        this.outx("\n\nYou take a minute to recover before doing the same.  ");
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.inventory.takeItem(this.consumables.FISHFIL, this.camp.returnToCampUseOneHour);
    }

    // For Chicks
    private ottersForGals(): void {
        this.clearOutput();
        this.outx(
            "The moment you agree, a sly smile spreads across her face.  She jams the end of her fishing pole into the sand like a post, to prevent it from going anywhere, and stands up.  There's no tease, no ceremony as she strips out of her bikini bottoms and tosses them aside.  Her newly revealed mound has only the barest tuft of pubic hair, a little wisp of blonde hair amongst the sparse brown fur."
        );

        this.outx(
            "\n\nYou move forward, intent on groping Callu's little breasts still hidden beneath the bikini top, but she holds up a hand and says, \"<i>Whoa there darlin', that ain't how a fish'n'fuck works.  You just lay down, and I'll take care of everything. And make sure you're as naked as a newborn babe.</i>\""
        );

        this.outx(
            "\n\nStrange, but you oblige, stripping off your [armor] and gear and tossing them aside.  Callu instructs you to lay down on the beach next to her fishing pole, which you likewise oblige.  The otter-girl straddles your stomach, facing away from you, though her thick, heavy tail is thankfully kept away from your face."
        );

        this.outx(
            "\n\nCallu leans down, laying her body across yours so that her warm, sweet-smelling cunt is positioned just in front of your face.  Meanwhile, you feel delicate, powerful fingers probing at your [vagOrAss].  A long wet tongue licks over your "
        );
        if (this.player.hasVagina()) this.outx("folds");
        else this.outx("pucker");
        this.outx(
            ", and you feel compelled to do the same to her.  You let your tongue extend and lap at her delicate pussy lips.  In no time at all, they become puffy and flushed, blossoming outwards like a perverse flower.  You run your tongue up and down each and every fold, occasionally stopping to flick your tongue over her rapidly hardening clitoris."
        );

        this.outx(
            "\n\nLikewise, her tongue and lips dance across your flesh like a trio of dancers.  They twirl, spin, hop and tease.  Not one inch is left untouched.  From your "
        );
        if (this.player.hasVagina()) this.outx("clit");
        else this.outx("unnatural bare crotch");
        this.outx(
            " down to your pucker, she leaves a trail of sloppy smooches.  You mirror her movements, attempting to give her the same experience she's giving you.  A low murr escapes her lips, and she squirms above you slightly as your tongue hits the right spots."
        );

        this.outx(
            '\n\nAfter several minutes of this tasty sixty-nine Callu gives your mound one last kiss and sits up, practically burying your face in her snatch.  "<i>Ya\'ll just sit tight and put that tongue to work, kay?  Key ingredient in a fish\'n\'fuck, is of course, the fish.</i>"  You voice your disapproval, though all that comes out is a garbled "<i>mmmrrrrppphh.</i>"  Callu ignores your protests, instead retrieving her fishing pole and sitting back further, pressing herself even harder against your face.  With her fantastic behind blocking your view, you can\'t see anything that\'s going on, and are only able to hear the quiet "<i>tick-tick</i>" of her fishing pole.'
        );

        this.outx(
            "\n\nYou know full well that you could get out of this if you wanted to, however the scent of the girl's musky mustelid muff is just too powerful, too intoxicating, too heavenly to ignore.  Instead of struggling you go to town, rubbing your face in it as you lick, slurp and suck at the lips pressed against your mouth.  Up and down your tongue goes, in and out, teasing her soft, swollen lips and pressing hard against her hard, aching clit as you gorge yourself on her pussy."
        );

        // (Demonic tongue)
        if (this.player.tongueType == TONUGE_DEMONIC)
            this.outx(
                '\n\nYou extend your abnormal tongue, plunging it deep into Callu\'s depths. This actually elicits a little squeak from the fisherwoman, who shifts from side to side in shock.  You let your tongue push further in, as if it were a cock.  Spreading her as you delve deep, you taste the otter from the inside out, reveling in the taste of her sweet, tight hole.  Eventually your tongue comes to an obstruction, a tight ring that bars your way forward.  You grin, or at least try as hard as you can to do so, what with the weight of an otter-girl sitting on your face and 12 inches of tongue sticking out of your mouth.  The tip of your tongue whirls around her cervix before finding the center and slowly pushing inside.  Another "<i>eep</i>" arises from Callu, though this one turns into a contented sigh.  With the tip of your tongue in her womb, you begin to slather her walls with saliva.  Every tender flick of your tongue makes the girl riding your face shiver with pleasure.  All good things must come to an end, however, and your tongue eventually gets so tired you have no choice but to draw it back in.'
            );

        this.outx(
            "\n\nThis goes on for the better part of an hour.  You find yourself hunting for the little spots that make your sexy little friend jump and squeal, all while she reels in fish after fish.  Several orgasms, half a dozen fish and one extremely messy face later, you hear Callu reel in her line for the last time before setting it off to the side with a clatter.  She rises from your face, allowing you to breathe the fresh air once more."
        );

        this.outx(
            '\n\nGrinning down at you, your face plastered in girlcum, the fisherwoman leans down and gives you a great big kiss.  "<i>Mmm, ain\'t that a tasty treat,</i>" she notes.  "<i>Now since ya been so good to me, I just wanna return the favor.</i>"  Callu gets back in the sixty-nine position that started this all off, but grabs hold of you and flips over onto her back.'
        );

        this.outx(
            "\n\nYou sit up, straddling her face this time, as she dives nose first into your "
        );
        if (this.player.hasVagina()) this.outx("quivering quim");
        else this.outx("rump");
        this.outx(
            ".  Her lips are like magic as they go, sucking and lavishing your entire crotch with delightful attention.  You find your entire body shivering with pleasure as she attends to you, your body quickly heating up as her tongue presses all of your buttons.  Everything from your fingertips down to your toes tingles and shudders under Callu's ministrations, leaving you squirming and undulating on her face, a deeply satisfied growl rising in your throat."
        );

        this.outx(
            "\n\nGrabbing hold of your [nipples], you start playing with them while Callu does her thing.  Your fingers deftly tweak and tease them, knowing all the right techniques to really get you going.  "
        );
        if (this.player.hasFuckableNipples())
            this.outx(
                "You even slip a finger or two inside, stretching your nipple-cunts out with deliciously pleasurable results.  "
            );
        this.outx("Combined with Callu's tender tongue ");
        if (this.player.hasVagina()) this.outx("paying lip service to your wet cunt");
        else this.outx("doing a cave dive in your rear");
        this.outx(
            ", you can't hold out much longer.  All the tingling in your body seems to get forced through your veins, coalescing in a single spot within your groin.  The pressure builds and builds as orgasmic energies begin overflowing.  Your legs and arms tremble, your head wobbles uncertainly, and you can't even guess at what your spine is attempting to do."
        );

        this.outx(
            "\n\nThe pleasure within you finally bursts outwards, shooting through every nerve, inflaming every fiber of your being.  "
        );
        if (this.player.hasVagina())
            this.outx(
                "Your snatch clenches and clamps down on thin air, flooding Callu's face with your feminine juices in a tasty, refreshing spray."
            );
        else
            this.outx(
                "Your asshole clenches and spasms randomly, aching to be filled by something, anything in your quest for release."
            );
        this.outx(
            "  The orgasmic bliss makes you collapse forwards, dropping you onto all fours. However, your blonde lover grips your thighs firmly, clearly intent on fully repaying her debt."
        );

        this.outx(
            "\n\nSeveral orgasms later, you're little more than a quivering mass of flesh riding atop the fisherwoman's face.  She wriggles out from underneath you and licks her lips, happy to guzzle down the last of your juices.  Callu gives your back a little rub down, saying, \"<i>Well that sure was a refreshing break, darlin'.</i>\"  You can only groan in response, your body too sore from back-to-back orgasms to really form any kind of coherent response."
        );

        this.outx(
            '\n\nThe blonde otter sets all her gear up in one pile, and tucks away her bikini bottoms into a canvas bag.  From the same bag she pulls out a delicious smelling piece of cooked fish, wrapped in a large green leaf.  She sets it beside your still-trembling body, saying simply, "<i>Fish and a fuck, darlin\'.  I got mine and you get yours.</i>"  You nod absently, reaching out to touch the wrapped up piece of fish.  Callu gives your back another quick rub down, before gathering up her things and heading off down the beach, completely naked from the belly down.'
        );

        this.outx("\n\nYou take several minutes to recover before doing the same.  ");

        this.player.orgasm();
        this.dynStats("sen", -1);
        this.inventory.takeItem(this.consumables.FISHFIL, this.camp.returnToCampUseOneHour);
    }

    // For Pansies
    private avoidZeOtterPussy(): void {
        this.clearOutput();
        this.outx(
            "You shake your head and explain you can't.  She simply shrugs, \"<i>Ain't no skin off my back.</i>\""
        );

        this.outx(
            "\n\nThe two of you sit in silence for a little while.  It doesn't feel like an awkward silence, just a serene, relaxing void of noise.  The gentle lapping of the water almost puts you to sleep.  Eventually, you stand, say your goodbyes and leave.  As you're leaving, Callu shouts, \"<i>Come round any time, ya hear?</i>\"  You nod absently, then make your way back to camp."
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // For Fatties
    private getSomeFishYaFatty(): void {
        this.clearOutput();
        this.outx(
            "You tell Callu you're a little more interested in the fish than the fuck, at least for today.  She shrugs once before jamming the end of her fishing pole into the sand like a post and turning towards her pack."
        );

        this.outx(
            "\n\nShe retrieves a delicious-smelling slab of roasted fish, properly salted and wrapped in a large green leaf.  \"<i>Here ya're, fresh as it comes 'less you want it still walkin' and talkin'.</i>\""
        );

        this.outx("\n\nYou thank Callu for the food and take your leave.  ");

        // (You have gained Fish Fillet!)
        this.inventory.takeItem(this.consumables.FISHFIL, this.camp.returnToCampUseOneHour);
    }
}
