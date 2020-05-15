import { NPCAwareContent } from "./NPCAwareContent";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { Kiha } from "./Kiha";
import { ItemType } from "../../ItemType";
import { TAIL_TYPE_LIZARD, TONUGE_SNAKE, TONUGE_DEMONIC } from "../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../CockTypesEnum";
import { Appearance } from "../../Appearance";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";

export class KihaScene extends NPCAwareContent {
    /* FLAGS STUFF*/
    // 1 = PC asked her about it, past that it counts the times paid
    // const KIHA_TOLL: number = 341;
    // Tracks how many special explores the PC gets.
    // const KIHA_TOLL_DURATION: number = 342;
    // const TIMES_MET_KIHA: number = 343;
    // used to track the different levels of 'talk to Kiha
    // const KIHA_TALK_STAGE: number = 344;
    // const PC_WIN_LAST_KIHA_FIGHT: number = 345;
    // const KIHA_CHOKED_OUT_PC: number = 432;

    // Encounter Dragon-Gal
    public encounterKiha(): void {
        let temp;
        this.outx("", true);
        this.spriteSelect(72);
        if (
            this.kihaFollower.followerKiha() &&
            this.flags[kFLAGS.KIHA_NEEDS_TO_REACT_TO_HORSECOCKING] == 1
        ) {
            this.kihaFollower.kihaReactsToHorseDicking();
            return;
        }
        // kihaBitchesOutCorruptPCs()
        if (
            this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] > 0 &&
            this.player.cor >= 66 &&
            this.flags[kFLAGS.KIHA_CORRUPTION_BITCH] != 1
        ) {
            this.kihaFollower.kihaBitchesOutCorruptPCs();
            return;
        }
        // kihaUnBitchesOutCorruptPCs()
        if (this.player.cor < 66 && this.flags[kFLAGS.KIHA_CORRUPTION_BITCH] == 1) {
            this.kihaFollower.kihaUnbitchesUncorruptedFolks();
            return;
        }
        // Friendly+ meeting
        if (
            this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] >= 1 &&
            this.flags[kFLAGS.KIHA_CORRUPTION_BITCH] != 1
        ) {
            if (
                this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] == 2 &&
                this.flags[kFLAGS.KIHA_AFFECTION] >= 100 &&
                this.flags[kFLAGS.KIHA_MOVE_IN_OFFER] == 0
            ) {
                this.kihaFollower.kihaOffersToMoveIn();
                return;
            }
            this.kihaFollower.kihaFriendlyGreeting();
            return;
        }
        // If currently paid up on toll, don't run into her!
        if (this.flags[kFLAGS.KIHA_TOLL_DURATION] > 1) {
            this.kihaExplore();
            return;
        }
        // Count meetings
        this.flags[kFLAGS.TIMES_MET_KIHA]++;
        // PLOT FIGHT TIME!
        if (
            this.player.cor < 66 &&
            this.flags[kFLAGS.KIHA_AFFECTION_LEVEL] == 0 &&
            this.flags[kFLAGS.KIHA_TALK_STAGE] >= 3 &&
            this.player.gender > 0
        ) {
            this.kihaFollower.kihaSpiderEventIntro();
            return;
        }
        // First time
        if (this.flags[kFLAGS.TIMES_MET_KIHA] == 1) {
            this.outx(
                `An imposing figure drops out of the gnarled swamp trees, spraying loam and moss everywhere as it impacts the ground.  You immediately put up your ${this.player.weaponName} and take up a combat stance.  Laughing uproariously, the stranger straightens, tucking her rust-red wings behind her back.  She's so busy with her mirth that you get a chance to get a good look at the six-foot tall monster of a woman.  Though her face has human-like features, a pair of wicked horns protrude from her forehead, giving evidence to more than a little taint.  The twin spikes match the curve of her skull, the pointed tips sticking out a ways behind her.  Her eyes are nearly solid crimson with inky black slits in the middle.  Dark red scales run up her arms and legs to meet on her back.  A powerful reptilian tail hangs down behind her, whipping back and forth with dangerous strength.\n\n`,
                false
            );

            this.outx(
                `"<i>Eyes up here, ${this.player.mf(
                    "dick-head",
                    "slut-bag"
                )},</i>" commands the draconic woman - and she's definitely a woman; the dark-skinned entrance between her muscled legs is evidence enough of that.  She twirls a wicked-looking double-headed axe as she warns, "<i>You seem to have stumbled across my territory.  Let me make this clear to you: I own this stretch of swamp, and if you step foot in this area again, I'm going to beat you until you wish you ran into Lethice herself.  Now run along, before you dread the day you met Kiha!</i>"  A thin trail of heat shimmers in the air with each pass of her axe's blades, left behind by the obviously magical implement.\n\n`,
                false
            );

            this.outx("What do you do?");
            // [Fight] [Ask Why][Buy Passage][Leave]
            this.simpleChoices(
                "Fight",
                this.meetKihaAndFight,
                "Ask Why",
                this.askWhy,
                "Buy Passage",
                this.offerToBuyPassageFromKiha,
                "",
                undefined,
                "Leave",
                this.leaveWhenMeetingAgressiveKiha
            );
        }
        // *Repeat Encounter - PC WAS VICTORIOUS LAST FIGHT
        else if (this.flags[kFLAGS.PC_WIN_LAST_KIHA_FIGHT] == 1) {
            this.outx(
                "Kiha plummets from the sky, slamming down into the mossy earth with enough force to spray chunks of dirt everywhere.  She stands and growls, \"<i>Just because you beat me before doesn't mean you've defeated me.  I'll NEVER BE DEFEATED!</i>\"\n\n",
                false
            );

            this.outx(
                "As she screams out in defiance, she charges you, giving you barely enough time to ready yourself for combat!",
                false
            );
            // Clear 'won last fight' toggle
            this.flags[kFLAGS.PC_WIN_LAST_KIHA_FIGHT] = 0;
            this.startCombat(new Kiha());
        }
        // Tribute Offer (1st Time) - Req's Kiha not be mad and PC suggested it at some point.
        else if (this.flags[kFLAGS.KIHA_TOLL] == 1 && KihaScene.rand(2) == 0) {
            this.outx(
                "Kiha steps out from behind a tree with her axe on her back and her arms folded across her sizable chest.  \"<i>You again?  I've been thinking about what you said.  How about instead of beating you senseless, you pay me a tribute of 200 gems, and I'll let you pass through my territory unhindered.  Of course, if you stumble into my lair I might have to teach you a lesson.</i>\"  A greedy smile spreads across her dusky visage while her eyes burn with mischievous crimson light.  Wait a moment... wasn't this your idea?\n\n",
                false
            );
            temp = this.payKihaTribute;
            if (this.player.gems < 200) {
                this.outx("You can't afford to pay her!");
                temp = undefined;
            }
            // [Pay] [This was my idea] [Leave] [Fight] - Leave uses standard leave text
            this.simpleChoices(
                "Fight",
                this.meetKihaAndFight,
                "Pay",
                temp,
                "My Idea",
                this.tellKihaTributeWasYourIdea,
                "",
                undefined,
                "Leave",
                this.leaveWhenMeetingAgressiveKiha
            );
        }
        // *Repeat Encounter - Tribute Wore off
        else if (
            this.flags[kFLAGS.KIHA_TOLL] > 1 &&
            (this.flags[kFLAGS.KIHA_TOLL_DURATION] == 1 ||
                (this.flags[kFLAGS.KIHA_TOLL_DURATION] == 0 && KihaScene.rand(2) == 0))
        ) {
            this.outx(
                "Kiha steps out from behind a tree with her axe on her back and her arms folded across her sizable chest.  \"<i>If you want to explore my territory again, you'll need to pay the fee,</i>\" she flatly states.  This is absurd - she wants more gems already?  You'll go broke like this, AND it was your idea to begin with!  What do you do?",
                false
            );
            temp = this.payKihaTribute;
            if (this.player.gems < 200) {
                this.outx("\n\nYou can't afford to pay her again!", false);
                temp = undefined;
            }
            // [Pay Again] [This was my idea] [Leave]  [Fight] - As first time Tribute Offer encounter
            this.simpleChoices(
                "Fight",
                this.meetKihaAndFight,
                "Pay",
                temp,
                "My Idea",
                this.tellKihaTributeWasYourIdea,
                "",
                undefined,
                "Leave",
                this.leaveWhenMeetingAgressiveKiha
            );
        }
        // Generic Repeat Encounter
        else {
            this.outx(
                "A nearby tree suddenly explodes in a shower of splintering wood and burning embers.  Kiha steps through the wreckage with her characteristic double-sided axe.\n\n",
                false
            );

            this.outx(
                '"<i>Don\'t even start,</i>" she commands, advancing on you as she continues, "<i>I told you to avoid my domain and yet you ignored my imperative and returned.  You may be a fucking masochist or a retard, but trust me, you won\'t enjoy this.</i>"\n\n',
                false
            );

            if (this.flags[kFLAGS.KIHA_TOLL] == 0) {
                this.outx(
                    "If you hurry, you might get a word in edge-wise.  What do you do?",
                    false
                );
                // [Fight] [Ask Why][Buy Passage][Leave]
                this.simpleChoices(
                    "Fight",
                    this.meetKihaAndFight,
                    "Ask Why",
                    this.askWhy,
                    "Buy Passage",
                    this.offerToBuyPassageFromKiha,
                    "",
                    undefined,
                    "Leave",
                    this.leaveWhenMeetingAgressiveKiha
                );
            } else {
                this.outx("It's a fight!");
                this.startCombat(new Kiha());
            }
        }
    }
    // [Buy Passage]
    private offerToBuyPassageFromKiha(): void {
        this.outx("", true);
        this.spriteSelect(72);
        this.outx(
            'You jingle your gem pouch and ask if you could pay her to allow you passage.  Kiha shoulders her axe and scratches at one of her horns, mulling the idea over.  She stops and abruptly shakes her head.  "<i>Not today.  Now scram, before I change my mind!</i>"\n\n',
            false
        );
        // (Unlocks toll option next encounter)
        this.flags[kFLAGS.KIHA_TOLL] = 1;
        // [Fight] [Leave] - Same results as main fight/leave.
        this.simpleChoices(
            "Fight",
            this.meetKihaAndFight,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined,
            "Leave",
            this.leaveWhenMeetingAgressiveKiha
        );
    }
    // [Leave]
    private leaveWhenMeetingAgressiveKiha(): void {
        this.outx("", true);
        this.spriteSelect(72);
        this.outx(
            "You nod and step back, retreating back towards camp.  You've no desire to fight such a fiery opponent.",
            false
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Fight]
    public meetKihaAndFight(): void {
        this.outx("", true);
        this.spriteSelect(72);
        this.outx(
            'You step closer and proclaim that you go where you please.  Kiha snorts and says, "<i>Cute.  Sadly, misplaced confidence will only make this hurt that much more.</i>"',
            false
        );
        // (START COMBAT)
        this.startCombat(new Kiha());
    }
    // [Ask Why]
    private askWhy(): void {
        this.outx("", true);
        this.spriteSelect(72);
        this.outx(
            "You ask why she's trying to drive you off.  Confusion breaks out across Kiha's brow for a moment before her visage hardens back into a confident sneer.  \"<i>I don't need to explain myself to you.  I was strong enough to break out of Lethice's base, and I've been strong enough to murder every lackey she's sent after me.</i>\"\n\n",
            false
        );

        this.outx(
            "Thinking you may have found a way to win into the powerful warrior's good graces, you start to explain that your whole purpose here is to defeat the demon queen.  She cuts you off by exhaling a whirling tornado of fire into the air.  The scorching inferno seems to suck the very breath from your lungs, robbing you of your words.  While the after-image still hangs in your vision, she declares, \"<i>I don't give two licks about why you're here.  I'm gonna beat your ass just for wasting my time!</i>\"",
            false
        );

        // (START COMBAT!)
        this.startCombat(new Kiha());
    }
    // [Pay]
    private payKihaTribute(): void {
        this.outx("", true);
        this.spriteSelect(72);
        this.outx(
            "You sigh and pay her 200 gems.  She doesn't even mention that it was originally your idea, but still, you're getting what you want - the ability to explore her territory unhindered.  Of course, you have no idea how long this 200 gems will last.\n\n",
            false
        );
        // (gems -= 200;)
        this.player.gems -= 200;
        this.flags[kFLAGS.KIHA_TOLL_DURATION] = 3 + KihaScene.rand(4);
        // Count times paid
        this.flags[kFLAGS.KIHA_TOLL]++;
        // (2-5 more explorations of her area before she shows up demanding more tribute!)
        // (do a 'Kiha' exploration with chances of fantabulous prizes)
        this.doNext(this.kihaExplore);
    }
    public kihaExplore(clearScreen = true): void {
        if (clearScreen) this.outx("", true);
        // spriteSelect(72);
        this.flags[kFLAGS.KIHA_TOLL_DURATION]--;
        const event: number = KihaScene.rand(10);
        let itype: ItemType;
        // Grabbin' Inquisitor Armor
        if (event == 0 && this.flags[kFLAGS.GOTTEN_INQUISITOR_ARMOR] == 0) {
            kGAMECLASS.inquisitorRobesDiscovery();
            return;
        }
        if (event < 5) {
            this.outx(
                "You wander around through the swamp for a while, but you don't find anything.",
                false
            );
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // Reducto
        else if (event < 7) itype = this.consumables.REDUCTO;
        else if (event < 8) itype = this.consumables.GROPLUS;
        else if (event < 9) itype = this.consumables.COAL___;
        else if (event < 10) itype = this.useables.T_SSILK;
        this.outx("While exploring, you find an item on the ground!  ");
        this.inventory.takeItem(itype!, this.camp.returnToCampUseOneHour);
    }

    // [This was my idea!]
    private tellKihaTributeWasYourIdea(): void {
        this.outx("", true);
        this.spriteSelect(72);
        this.outx(
            'You ask why she changed her mind about your idea.  Kiha\'s face screws up for a moment, her chocolate-hued visage distorting into an irritated grimace.  This may have been a mistake.  She screams, "<i>As if someone like you would have an idea worthy of being adopted by me!  I forgot about your insignificant offer as soon as I was away from you.  This tribute was devised solely with my own sizable wit and cunning!</i>"\n\n',
            false
        );

        this.outx(
            "The dragon-girl yanks her axe from her back and twists her hands, making the edge glow orange in the murky swamp air.  \"<i>You should've kept your mouth shut, worm.  The offer is off the table now!  The only thing I'll trade you is pain!</i>\"",
            false
        );
        this.startCombat(new Kiha());
    }

    // *Generic PC Victory Introduction:
    public kihaVictoryIntroduction(): void {
        this.flags[kFLAGS.PC_WIN_LAST_KIHA_FIGHT] = 1;
        this.outx("", true);
        this.spriteSelect(72);
        this.outx(
            "Kiha sways back and forth for a moment, then drops her axe with numb hands.  As soon as she does, the hot glow of the weapon's cutting edge fades to silver, and the weapon lands with a heavy 'thunk' ",
            false
        );
        if (this.silly()) this.outx("(like Urta's cock!) ");
        this.outx(
            "in the dirt.  The dragoness drops to her knees and slumps back against a tree, her limbs trembling ",
            false
        );
        if (this.monster.lust > 99) this.outx("with lust");
        else this.outx("weakly");
        this.outx(" as she tries to rise.\n\n", false);

        // (Lust)
        if (this.monster.lust > 99)
            this.outx(
                '"<i>You... can\'t make me like it!,</i>" she shouts, struggling with all her might to keep her hands away from her genitals.  Somehow, she seems to be managing.',
                false
            );
        // (HP)
        else
            this.outx(
                "\"<i>You... you... haven't... beaten me,</i>\" she mutters, even though it's quite clear that you have.",
                false
            );

        // (no new PG)
        this.outx(
            "  What do you do with the wannabe dragon now that you've taken her down a peg?",
            false
        );
        // [OPTIONS]
        // All
        const forceMasturbate = this.tsundereMasturbationChristmasCarol;
        this.outx("\n\nYou could forcibly masturbate her.", false);
        // Fems
        let useHerTail;
        if (this.player.lust >= 33 && this.player.hasVagina()) {
            this.outx("\n\nYou could use her tail as a dildo.", false);
            useHerTail = this.kihaVictoryPomfTail;
        }
        // Vagina with optional double-dick!
        let fuckHer;
        if (this.player.hasCock()) {
            if (
                this.player.cockThatFits(this.monster.vaginalCapacity()) != -1 &&
                this.player.lust >= 33
            ) {
                this.outx("\n\nYou could fuck her vagina", false);
                if (
                    this.player.cockThatFits2(this.monster.vaginalCapacity()) != -1 &&
                    this.player.cockTotal() > 1
                )
                    this.outx(" and ass");
                this.outx(".");
                fuckHer = this.victoryDickKiha;
            }
        }
        let buttFuck;
        // Buttfuck 20 or less
        if (this.player.cockThatFits(this.monster.analCapacity()) >= 0 && this.player.lust >= 33) {
            buttFuck = this.analRapuzulaKiha;
        }
        // Conversation Only - Emotional Rape! (40- Corruption!)
        let wordRape;
        if (this.player.cor < 40) {
            this.outx(
                "\n\nNow that she's a captive audience, you could always talk to her.",
                false
            );
            wordRape = this.rapeKihaWithWORDS;
        }
        this.choices(
            "Masturbate",
            forceMasturbate,
            "Use Tail",
            useHerTail,
            "FuckHerPussy",
            fuckHer,
            "FuckHerAss",
            buttFuck,
            "Talk",
            wordRape,
            "",
            undefined,
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
    // *Generic PC Loss Intro
    public kihaLossIntro(): void {
        this.outx("", true);
        this.spriteSelect(72);
        // (Lust)
        if (this.player.lust > 99)
            this.outx(
                "You give up on fighting, too horny to keep fighting.  Kiha strikes the ground with her axe and snorts out a puff of smoke.  \"<i>What a shameless slut!  You're lusting after me even in the heat of battle, like a common imp!  You aren't worthy to lick between my foot-claws!</i>\"\n\n",
                false
            );
        // (HP)
        else
            this.outx(
                "You collapse, too wounded to keep fighting.  Kiha strikes the ground with her axe and snorts out a puff of smoke.  \"<i>What a wimp!  I've barely started fighting and you're already beaten!</i>\"\n\n",
                false
            );

        // 33% of tit-milk humiliation if applicable.
        if (this.player.biggestLactation() >= 2) this.kihaMilkTitHumiliation();
        // Rape texts if horny
        else if (this.monster.lust >= 50) {
            this.outx(
                "The dragoness sighs and glances around.  \"<i>Since you weren't able to satisfy me in battle, let's see if you have anything else to offer...</i>\"\n\n",
                false
            );

            this.outx(
                `Leaving her axe to rest a few feet away, stuck on the ground, Kiha strips off your ${this.player.armorName} revealing your `
            );
            if (this.player.hasCock()) this.outx(this.multiCockDescriptLight(), false);
            if (this.player.hasCock() && this.player.hasVagina()) this.outx(" and ");
            if (this.player.hasVagina()) this.outx(this.vaginaDescript(), false);
            this.outx(".\n\n", false);
            // TO THE RAPES!

            // Genderless - Lukadoc (Zed)
            if (this.player.gender == 0) this.kihaGenderlessBeating();
            // *Male - Adj
            else if (this.player.gender == 1) this.kihaRapesMen();
            // *Herm - Adj
            else if (this.player.gender == 3) this.kihaRapesHerms();
            else if (this.player.gender == 2) this.kihaRapesLittleGirlsISawItOnTheNews();
        }
        // If not horny, get a beating!
        else {
            this.outx(
                "Kiha pulls her axe back in a two handed grip, and you're sure the moment of your death is upon you.  A moment later, the flat of the blade slams into your head, knocking you unconscious.",
                false
            );
            this.player.takeDamage(1000);
            this.cleanupAfterCombat();
        }
    }

    // *Milky Tit Humiliation - Fen
    private kihaMilkTitHumiliation(): void {
        // (Does not use the defeat intro - clear screen)
        this.outx("", true);
        this.spriteSelect(72);
        if (this.player.lust > 99)
            this.outx(
                "You slide to the ground, too turned on to fight and openly touching yourself.",
                false
            );
        else this.outx("You slide to the ground, too defeated to continue to fight.");
        this.outx(
            "  Kiha snorts, expelling a tiny burst of flame and smoke from a nostril as she towers over your prone body.\n\n",
            false
        );

        this.outx(
            "\"<i>This is it?</i>\" the dragoness asks, looking down at you.  \"<i>Are you sure you shouldn't be hanging around the lake with the other lumps of goo?  I think it would be more your speed.  I even hear there's a farm there.  Maybe they'd appreciate your ridiculous, milky fun-bags there.  They could even give you a stall with your name on it, 'Tit-cow'.  I bet you'd like that.</i>\"  She calmly peels the top half of your top away to reveal your milk-dripping nipples.\n\n",
            false
        );

        this.outx(
            `Kiha recoils at the drops of white beading atop your ${this.nippleDescript(
                0
            )} and asks, "<i>Do you really think that's hot?  It's disgusting.  A perversion of the body only a sick... MAMMAL would enjoy.</i>"\n\n`,
            false
        );

        this.outx(
            `The scaly woman leans down to tug on your ${this.nippleDescript(
                0
            )}s in turn, laughing every time a spurt of milk erupts from one of your tits.  Each rough squeeze sends shivers of erotic sensation through your body, and you quickly grow aroused from the rough treatment.  Kiha keeps going, `
        );
        if (this.player.hasCock()) this.outx("not noticing the stiffening in your loins");
        else if (this.player.hasVagina()) this.outx("not noticing the scent of your growing need");
        else this.outx("not noticing the flush of your skin");
        this.outx(
            " as she callowly milks your breasts.  She isn't even blushing; if anything, her expression reminds you of a child playing with a new toy.  Kiha isn't aroused by this at all!\n\n",
            false
        );

        this.outx(
            'An even harder tug releases a thick squirt of milk that makes you moan.  The dragoness recoils at the sound of your pleasure, asking, "<i>Are you getting off on this?  Oh... by Lethice, YOU ARE!  You may as well moo while you\'re at it, you fucking dairy-cow.</i>"  Kiha grows rougher with your nipples, stretching and pinching them just hard enough to make you feel even better.  You squirm beneath her none-too-gentle tugs, wincing each time she yanks too hard.\n\n',
            false
        );

        this.outx("*SMACK*\n\n", false);

        this.outx(
            'Her hand cracks across your face, leaving a red print where it hits you.  "<i>I said you should moo, cow.</i>"\n\n',
            false
        );

        this.outx(
            "You blink away the tears that well up and nod, making a quiet, barely audible 'moo'.\n\n",
            false
        );

        this.outx(
            "\"<i>What's that?  Speak up, or I might milk you hard enough to rip one of these udders off,</i>\" threatens Kiha with a sadistic smile.  You immediately moo, louder this time.  She rewards you with a quick pump on your udders, squirting more milk into the air.  You shiver, growing more and more turned on with every splatter of creamy white that's forced from your body.\n\n",
            false
        );

        this.outx(
            "Kiha keeps at it, milking your nipples until they're almost dry and making you moo so loud that surely someone else can hear.  You feel utterly defeated and humiliated.  You feel like a cow.  Yet, you're so horny and your sore nipples are so sensitive that you feel like you're about to cum.  The dragoness must recognize the look in your eyes, because she stops and wipes her hands off in your hair.\n\n",
            false
        );

        this.outx(
            "Kiha declares, \"<i>All done, cow.  Now let me take a few gems for my trouble and send you back to your farm.</i>\"  She rifles through your gem pouch, but you can't stop her.  You're too weak and horny.  The bag lands on your belly as Kiha delivers one last tweak to your abused mammaries, pulling out a weak drip and matching 'moo' from your lips.  She laughs uproariously at that and departs.\n\n",
            false
        );

        this.outx(
            "You trudge back to camp, replaying the erotic torture over and over in your over-sexed mind.  You just can't shake it, and once you get safe, you wind up spending hours masturbating, mooing over and over while you play with your body and further abuse your milky tits.  ",
            false
        );
        if (this.player.cor < 33) this.outx("How far you've fallen.");
        else if (this.player.cor < 66)
            this.outx(
                "How confusing this all is.  Why can't things be simple like they were back home?",
                false
            );
        else this.outx("Damn, that was hot.");
        this.player.orgasm();
        this.dynStats("tou", -1, "sen", 5);
        this.cleanupAfterCombat();
    }
    // Genderless - Lukadoc (Zed)
    private kihaGenderlessBeating(): void {
        this.spriteSelect(72);
        this.outx(
            '"<i>What a pussy!</i>" she yells at you, noticing your lack of any gender upon denuding you.  "<i>What\'s the problem, runt? Too scared that evil imps and goblins will abuse you?</i>"  She hits the ground with her tail in frustration and grabs her axe. "<i>What a waste of time. You\'re useless both in battle and out of it.</i>"  She begins kicking you, eventually hitting you hard enough to knock you unconscious.',
            false
        );
        this.player.takeDamage(1000);
        this.cleanupAfterCombat();
    }

    // *Male - Adj
    private kihaRapesMen(): void {
        this.outx("", true);
        this.spriteSelect(72);
        let x: number = this.player.cockThatFits(this.monster.vaginalCapacity());
        if (x < 0) x = 0;
        this.outx(
            `You try to rise, but the dragon girl whips around, her long, thick tail delivering a subduing crack against the side of your head, dropping you back onto your ${this.buttDescript()}.  Triumphantly standing over you, the scaled woman eyes you with a panting breathlessness that betrays the coldness in her gaze.  She squints, arcing an imperious eyebrow as she looks you up and down, drawing her hands back to shoulder level and barely brushing against her breasts.  Her tail lashes back and forth between her legs, wrapping around her calves as she lifts a clawed foot and rests it lightly upon your stiffening groin.  Apparently, your fight left her wanting more than just your gems.  Her flexible toes squeeze your ${this.multiCockDescriptLight()} through your ${
                this.player.armorName
            }, and she snorts in derision.  "<i>This is it, huh?  Pathetic.  I'm going to have to do all the work if I have any hope of you satisfying me.</i>"\n\n`,
            false
        );

        this.outx(
            `With a swift kick to your collarbone, Kiha knocks you on your back and stands over you, her vulva swollen with excitement despite her frosty insults.  She opens your ${
                this.player.armorName
            } with her long, clenching talons just enough to expose ${this.sMultiCockDesc()}.  The dragoness curls her tail between her legs, the warm, scaled surface of the dexterous limb rubbing your tender flesh impatiently, tip flicking ${this.oMultiCockDesc()} before coiling around the crest of your cockhead.  The narrow point of her backside pokes at your urethra, parting the narrow slit and tickling the sensitive, silken interior to draw a weak gasp from you.  "<i>Yeah, I bet you'd love to get penetrated,</i>" she scoffs, wrapping her hands around the thick girth of tail poking between her thighs like a massive, scale-textured cock.  She strokes the fat plates and thumbs the ridge-like nobs lining its underside with a hip-swaying motion that sends her chest wobbling.  "<i>But,</i>" she continues, her tail lifting off of your ${this.multiCockDescriptLight()} and curling upwards, "<i>this isn't about what you want.</i>"\n\n`,
            false
        );

        this.outx(
            "Kiha's haunches clench, and the wriggling rudder between her legs snakes upward, pressing firmly against her inflamed nethers - the plush, dusky lips of her pussy pliant to the touch of her scarlet extremity.  The tip that teased your cock a moment ago instead wraps itself around her clitoral hood, pulling her foreskin-like sheath back to expose the button-stiff joybuzzer.  In tightening circles, the dragon girl stimulates herself over you, her lips curled into a crooked grin as she rests her hands on her hips.  ",
            false
        );
        if (this.player.isNaga() || this.player.tailType == TAIL_TYPE_LIZARD)
            this.outx(
                '"<i>Heh, if you had half as much dexterity as you do impudence, I\'d let you do this for me.  Fat chance of that,</i>" she remarks off-handedly.  ',
                false
            );
        this.outx(
            `Before long, her cunny practically drools, but you're not sure what she's getting off on more, the tail teasing her clit or your dick stiffening uncontrollably at her feet.  She grins, more to show her teeth than in pleasure, and begins to feed her tail into her snatch, the girl's folds parting eagerly to the rough limb, her honeypot polishing her scales to a liquid gleam almost immediately.  As she pumps long, slow thrusts inside herself, Kiha shifts to one leg, bringing her adept foot to your ${this.cockDescript(
                x
            )} once more`
        );
        if (this.player.balls > 0)
            this.outx(
                `, resting the heel of her foot against the swell of your ${this.ballsDescriptLight()} and applying just enough pressure to feel the cum churning within`
            );
        this.outx(
            '.  "<i>Ah! J- just stay ri- ri- right there!</i>" she commands, as her tail picks up the pace.  "<i>I\'ll attend to y-y-you in a m-m... Aaah! Minute,</i>" she coos, pumping herself to the verge of climax.  Clenching her eyes and balling her hands into fists, the dragoness impales herself on the pistoning appendage, and chokes back a shuddering moan as she bottoms out and creams a crystal polish of girl cum across it, which wicks down and coats her scaled posterior with a shimmering veneer. "<i>Ahhhaaa...</i>" she shudders.  "<i>Now then, at least I\'ll have cum once today if you prove to be as worthless at fucking as you were at fighting.</i>"\n\n',
            false
        );

        this.outx(
            `The dragon girl's little show has already brought you to full mast and the pad-like scales of her foot rubbing up and down your length has you rock hard, helplessly twitching under her heel.  She hooks her long toes around your pulsing tip and pulls your ${this.cockDescript(
                x
            )} into the air, straining shaft rising in obedience to her demands.  Reluctantly withdrawing the tail from her slavering slit, Kiha crouches down until your flesh spear is parallel with her belly. She inches forward, your crown just a hair's breadth from her pussy and she makes a "<i>tut</i>" sound in the back of her throat.  "<i>Considering the shitty battle you gave me, you certainly don't deserve this hole, nor any chance at fathering children.</i>"  Despite her contempt, her lower lips splatter your ${this.cockDescript(
                x
            )} with the warm, liquid bounty of the dragon girl's vigorous masturbation.  You shudder at the heat showering your groin, unsure how much more teasing you can take.  Sliding forward a bit more, the victorious woman guides her narrow pucker over your throbbing meat.  "<i>This should be more your speed, little fairy,</i>" she taunts, before plunging herself onto your manhood.\n\n`,
            false
        );

        this.outx(
            `The gushing honey pooled and slathered along her tail and asscheeks while she was frigging herself gives you more than enough lubrication to part the dragon's silken passage, muscled sphincter clenching rhythmically, more to pull you deeper inside than in response to the sudden intrusion.  You cry out at the intense tightness sucking at your ${this.cockDescript(
                x
            )} and reach up to grab the girl's breasts, but she smacks your hands away with a sharp blow.  "<i>If you dirty my scales with your filthy mitts, I'll crush you between my thighs!</i>" she gasps, running her own hands through her hair as her head rolls back in delight.  She rides you hard, bouncing off of your lap without regard for the bruising her athletic ass is giving your ${this.hipDescript()}, but you can hardly feel anything beyond the vice-like tightness of her rectum.  You open your mouth to beg her to ease up, but she uses the opportunity to thrust her tail between your parted lips, the warm appendage still dripping with girl-cum.  You nearly gag at the insertion, but the shock is quickly subordinated to arousal as your mouth is flooded with the second-hand taste of her sweaty nectar. You reflexively begin sucking on the scaled tip, wrapping your tongue around the scaly invader and even rolling your jaw as you lap Kiha's cream from her posterior.\n\n`,
            false
        );

        this.outx(
            `With a rumbling growl, the dragoness impales herself on your ${this.cockDescript(
                x
            )} hard enough to knock the wind from your lungs. She clamps down and begins rolling her ass back and forth over your groin, stroking you off with only the rippling contractions from the toned walls of her rectum.  Your orgasm moments away, you helplessly clench your fingers in the earth`
        );
        // [Lizard/naga tail:
        if (this.player.isNaga() || this.player.tailType == TAIL_TYPE_LIZARD)
            this.outx(
                " while your tail curls around to find your own asshole.  The grip of the dragon's nethers so intense, you barely feel the pressure of your own tail, pushing in easily to soothingly stroke your overtaxed prostate",
                false
            );
        this.outx(
            ".  The tail in your mouth begins to pump deeper into your throat, wrenching your jaw open as the slick, textured scales thrust past your tongue and uvula to snake into your esophagus, forcing the girl's honey into every crevasse of your maw.  The sight of you being face-fucked by her phallic appendage is enough to bring her to a second, screaming climax, Kiha's ass finally loosening enough for the orgasm seething in your loins to burst free",
            false
        );
        if (this.player.balls > 0)
            this.outx(
                `, your ${this.ballsDescriptLight()} practically leaping in over-burdened joy as their heavy load rushes through your flesh`
            );
        this.outx(
            `.  A geyser of hot spunk sprays from your ${this.cockDescript(
                x
            )}, flooding her innards with the excruciatingly hefty torrent of seed all her teasing and abuse built within you.`
        );
        if (this.player.cockTotal() > 1) {
            if (this.player.cockTotal() > 2)
                this.outx(
                    "  Your unoccupied shafts spray ropey strands of cum all around you, jerking and straining under the weight of the dragoness.",
                    false
                );
            else
                this.outx(
                    "  Your unoccupied shaft sprays ropey strands of cum all around you, jerking and straining under the weight of the dragoness.",
                    false
                );
        }
        this.outx(
            "  She pulls her sphincter tight to keep the fountaining jizz inside her and jams her tail half way down your throat until the thick flesh can't fit past your jaw anymore.  She wriggles the limb within you and pants sadistically as the bulge in your neck slides another inch deeper.  You begin to choke.\n\n",
            false
        );
        this.flags[kFLAGS.KIHA_CHOKED_OUT_PC] = 1;

        this.outx(
            '"<i>Fill my ass with that cum,</i>" she purrs, forgetting her hostile attitude for a moment.  "<i>I want to feel it in my belly.</i>"  You can\'t help but comply, your suffocation-induced panic lending strength to your orgasm until her abdomen distends under the weight of your seed.  Before you black out, you can see her hooking four long, clawed fingers up into her pussy, while her thumb frantically jills her dusky clit.  Then, only darkness.\n\n',
            false
        );

        this.outx(
            `When you come to, your throat feels raw, the taste of her pussy still on your lips.  Surprisingly, your groin is wet, but not sticky, without a trace of semen anywhere.  She must've licked ${this.sMultiCockDesc()} clean after you passed out.  Your ${this.hipDescript()} are still sore from the wild woman's ride, so it takes you longer than usual to limp your way back to camp.`
        );
        this.player.orgasm();
        this.cleanupAfterCombat();
    }
    // *Herm - Adj
    private kihaRapesHerms(): void {
        this.outx("", true);
        this.spriteSelect(72);
        this.outx(
            `The dragoness rolls her eyes and closes the distance between the two of you with a slow, deliberate pace.  She easily bats away your weakened defenses until she is standing inches from you, her tail whipping back and forth as a cold smile curls on her dusky lips.  "<i>Strip,</i>" she commands, her voice a quiet whisper.  When you fail to comply, a crimson thunderbolt cracks across your sight and your face explodes with pain.  Blinking, you stagger back a few steps, Kiha's backhand still raised.  Annoyance playing over her face, she holds you in a smoldering glare as she hisses, "<i>I don't repeat myself,</i>" from between clenched teeth.  Rather than antagonize the dragon girl further, you comply, shedding your ${
                this.player.armorName
            } to bare your exposed body to her.  A flash of delight flickers across her mouth but is quickly quelled by her mask of disdain.  "<i>Weak, puny, and utterly incapable.  Tch, I suppose it can't be helped,</i>" she mutters, loudly enough for you to hear.  Advancing on you once again, she places a clawed hand on your ${this.chestDesc()}, almost tenderly.  Then, in a swift motion, she punches the heel of her palm against your sternum, abruptly knocking you to the ground.  Bending over your prone body, she lowers herself to straddle your ${this.hipDescript()}, her muscular, scaled legs squeezing your lower body in a clenching grip.\n\n`,
            false
        );

        this.outx(
            `You open your mouth and she leans in, her sloping mounds pressing hotly against your ${this.chestDesc()} stopping just short of kissing you.  She curls her lips into a smile that twists into a sneer.  "<i>Don't say a fucking word.  I don't need you conscious for this.</i>"  Then, reaching behind her, Kiha grabs hold of her long, thick tail and pulls it between the two of you.  The tip of her plated appendage wriggles eagerly as she draws it to her charcoal grin, pressing a soft-lipped pucker to the narrow end and gently sucking it into her mouth.  Working it in and out of her face inches at a time, her cheeks go concave from the force of her suction, her chest rising and falling a little faster with each passing moment.  When, finally, she pulls the tail from her maw, the red and black scales shine with the polished gloss of her thick saliva.  The flush appendage turns a half-circle to face you and the dragon forcefully slides it between your lips.  The taste of her warm fluid sends little electric jolts through your muscles, spasming your jaw open, and locking it there for a moment.  You begin drooling and she carefully rolls the dexterous spur around your tongue, gathering your fluids and mixing them with her own.\n\n`,
            false
        );

        this.outx(
            `The heat of her closeness and probing tail begin to excite you, ${this.multiCockDescriptLight()} slowly stiffening against your abdomen.  Noticing your arousal, the dragoness pulls her tail from your mouth and curls it back behind her again.  "<i>You'd love to stuff my tight box with every inch you've got, wouldn't you?</i>" she taunts, pressing her hands to the ground behind her. Leaning back, she derisively stares down the bridge of her nose and curls her upper lip to display her jagged fangs.  `
        );
        // NAGA OR SLIME:
        if (this.player.isNaga() || this.player.isGoo()) this.outx("Sliding backward slightly");
        // LEGS:
        else this.outx("Hooking a leg under one of yours");
        this.outx(
            `, Kiha repositions herself so that her ashen-hued vulva presses moistly against your ${this.vaginaDescript(
                0
            )}, the plush lips of her nethers lapping at yours in a torrid embrace.  Rocking against you in an angular motion, the dragon's sweltering sex grinds against your own sensitive flesh, small shocks of overstimulation arcing through your hips as her stiff, pink pearl brushes against your ${this.clitDescript()}.  You mirror her motions, rubbing into the girl with increasing urgency as your flesh engorges, nearly forgetting the throbbing imperative of your ${this.multiCockDescriptLight()}.\n\n`,
            false
        );

        this.outx(
            `You're so lost in the motion of your sinuous bodies gyrating against one another that when a stiffness slides between your cunnies, rather than thinking to look down, you merely writhe against it with unquestioning ardor.  When nubby ridges begin to caress your clenching womanhood, however, you draw a sharp intake of breath and blink back the lusty haze from your eyes.  Kiha's wriggling tail has slid between the breach of her ass and has slipped up, between the two of you, textured hardness rubbing both snatches with drool-oiled scales.  Gradually pumping her tail between the engulfing cunts, the dragoness throws her head back in eye-clenching pleasure.  "<i>Oh, I'm so much better at this than you are!</i>" she moans, taking care to flick the ridges of her plates against her sweet, hooded nub, massaging your ${this.clitDescript()} almost as an afterthought.  "<i>You're fucking lucky I took pity on a loser like you,</i>" she exhales, her voice stifled by the rapid approach of her orgasm.\n\n`,
            false
        );

        let dicked = false;

        // [If the player has an incubus draft:
        if (this.player.hasItem(this.consumables.INCUBID)) {
            this.outx(
                'As the two of you entwine yourselves against Kiha\'s honey-slick tail, she notices your belongings in a heap next to the two of you. "<i>What kind of s-s-shitty gifts did you bring me,</i>" she pants through a toothy grin.  Scattering your belongings with one hand, she notices the phallic shape of your incubus draft, and snatches the bottle between her thumb and forefinger.  "<i>Demon trash, of course.  You wouldn\'t even know how to use this right.  Let me show you.</i>"  She flicks the cork from the vial and upends the concoction down her gullet in one swallow.  You don\'t have time to protest as the hood over her clitoris slides back, the fingertip-sized bead above her engorged vulva swelling thicker by the second. With a lurching spasm, the flesh of her joy buzzer rises into the air, growing three, then six inches before finally settling at nine inches long.  The two-inch-thick shaft of her massive clit throbs, the underside bulging outward as rectangular, interlocking plates harden into a ladder from base to summit. The featureless, rounded tip of her draconic phallus swells and juts obscenely as it curves into a sloping crest, tinted with the flush of arousal as a thin slit opens at the very crown of her newly grown cock.\n\n',
                false
            );
            this.player.consumeItem(this.consumables.INCUBID);
            // [Incubus Draft cont.:
            this.outx(
                `Without breaking her stride, Kiha threads more of her tail between the gushing lips of your spurting nethers and loops the long, flexible tip around your ${this.cockDescript(
                    0
                )}, pulling it against her new shaft.  Completing the circle, the dexterous limb, varnished in girl-cum, tightens around the organs, sliding up and down frantically.  The feeling of her long, smooth cock-plates against the sensitive underside of your shaft is delicious and you reach a hand out to help the dragon's tail with its rapid, coiled jerking. Kiha kicks her leg up, smacking your arm back with the heel of her padded foot.  "<i>This is for me,</i>" she practically screams, "<i>You're just here for the ride!  I don't even like your h-h-hot cock rubbing against mine or your gushing pussy sucking my t-ta-tail.  So just lie back like the little ssssSHIT you are and fucking... CUM!</i>"  At that, the dragoness loses herself to the sensations, her virginal dick erupting in a shower of seething spunk that arcs backward, splattering her face and tits with her own creamy seed.\n\n`,
                false
            );
            dicked = true;
        }
        // Both scenes:
        this.outx(
            `When Kiha climaxes, a shuddering, vulnerable moan escapes her careless lips and your own resolve crumbles.  Your ${this.vaginaDescript(
                0
            )} spasms in muscle-clenching ecstasy as your ${this.multiCockDescriptLight()} lurches at the rush of geysering jizz cascading from you.  Pale white ropes of gushing ejaculate spray from your loins, passionate globs of alabaster rain down on the two of you, a shower of semen splashing the heat of your orgasm across your wallowing bodies.  Even after the exhilaration of your release fades, the dragon girl keeps rubbing the two of you with her spunk-lacquered tail, until a second, weaker orgasm shudders through your spent flesh.  Extracting herself from your lower body, the dragoness stands, still full of spunky energy and taunting reproach.  "<i>That's what I do to trespassers!  I don't want to see your tight ass around here again without a proper tribute,</i>" she warns, her mouth curled into the faintest of crooked grins.`
        );

        // [Incubus Draft end:
        if (dicked)
            this.outx(
                '\n\nAs she steps back into the mire, the sound of her muttering carries back to you. "<i>Much as I\'d like to keep it, better to be done with this,</i>" she sighs, glancing down at her turgid, draconic shaft.  "<i>Just as well I held onto all those pink eggs after that crystal vial knocked me up.</i>"  The rest of that story is lost to you, however, as her lean, swaying torso is swallowed back into the swamp\'s embrace.',
                false
            );
        this.player.orgasm();
        this.dynStats("lib", 1, "sen", 3);
        this.cleanupAfterCombat();
    }

    // Mutual Masturbation - A Tsundere Masturbation Christmas Carol, by Gats Dickings
    private tsundereMasturbationChristmasCarol(): void {
        this.outx("", true);
        this.spriteSelect(72);
        this.outx(
            `You walk towards the draconic woman, removing your ${this.player.armorName} as you observe her firm, `
        );
        if (this.player.lust > 99) this.outx("wanton");
        else this.outx("but dispirited");
        this.outx(
            " figure slumping against the weathered bark behind her.  She eyes you carefully, trying to comprehend the situation before catching note of your ",
            false
        );
        if (this.player.gender > 0) this.outx("aroused genitals");
        else this.outx("distinct lack of genitals");
        this.outx(".\n\n", false);

        // If Multi/Herm
        if (this.player.cockTotal() > 1 || this.player.gender == 3)
            this.outx(
                '"<i>W-what are you going to do, you freak of nature?  If you make me play with those, I swear... I swear I\'ll hit you!</i>"',
                false
            );
        // If Cock
        else if (this.player.hasCock())
            this.outx(
                '"<i>G-get that away from me!  As if I\'d want anything to do with your hard, juicy cock!  Idiot!</i>"',
                false
            );
        // If Vagina
        else if (this.player.hasVagina())
            this.outx(
                '"<i>What do you think you\'re going to do with that pathetic, dripping pussy, huh?  I swear, if you make me l-lick that thing...</i>"',
                false
            );
        // If Genderless
        else
            this.outx(
                '"<i>H-huh?  Why the hell are you coming closer?  How can you possibly do anything when you\'re as smooth as a board down there, you loser!</i>"',
                false
            );

        this.outx("  Today, however, you don't have any plans to fuck her directly");
        if (this.player.gender == 0)
            this.outx(
                ", and seeing as you don't have anything to fuck her with, it's not like you could",
                false
            );
        this.outx(
            ".  Without saying a word, you walk behind her, slouching in between the tree and her warm figure as you scoot yourself closer.  She desperately tries to turn around to look behind her, but she appears to be too weak to even move her neck.  In only moments, you've managed to lay against the tree, with the feeble dragon-girl sitting down comfortably on your lap ",
            false
        );
        if (this.player.tallness < 72) this.outx("- though you're hidden behind her tallness");
        else this.outx("- though you're much taller than her");
        this.outx(
            ".  The dragoness attempts to struggle against you, but she's far too enervated to move.  \"<i>What are you doing?  I don't fucking understand you!  What are yo-</i>\" before she can continue to berate you, you cut her off by moving her head towards your own and kissing her firmly on the lips.  Her eyes widen in surprise, but soon lower as she begins to reciprocate the notion.  You lock lips for what seems like ages, long enough that when you part, a single rope of saliva remains, connecting the two of you together.\n\n",
            false
        );

        this.outx(
            "The girl tries to speak, but you reach down towards her nether region, placing two fingers along the smooth of her belly and slowly creeping lower and lower, eliciting a small gasp from your victim as you reach her moist entrance.  She manages to reach out and grasp your hand, tensing as you begin to stroke her wetness, already lubricated by her juices.  You chuckle, announcing that she must've been turned on by the kiss - if she wasn't wet already, she sure as hell is now.  \"<i>N-no!  You're... you're wrong...</i>\" the dragon-girl stammers, though she finds herself unable to continue while you increase the speed of your heavy petting.  The draconic woman is a slave to your nimble fingers, with any attempt to stifle her moans ultimately failing as an odd yelp or gasp escapes her pouting lips.  With a gentle push you enter inside her, your panting toy clamping her legs shut against your probing fingers.\n\n",
            false
        );

        this.outx(
            "You notice the dragon-girl's warm breath pervade the air as you feel the warmth of her insides, her slick tongue beginning to drool out of her mouth from the sensation of her moist lips being invaded by your stern hand.  The aroused state of her nipples poking up into the humid air give you an idea, as you take your free hand and begin to grope and massage the breasts in between your fingers.  The teats perk to your ministrations while you roughly squeeze her heaving bosom, almost as if to milk her like a cow.  A grunt escapes your lips as you rub your ",
            false
        );
        if (this.player.hasCock()) {
            this.outx(`${this.multiCockDescriptLight()} against her soft flesh, `);
            if (this.player.cockTotal() == 1)
                this.outx(
                    "a small bead of pre-cum forming from the tip and slathering her back with your juices.",
                    false
                );
            else
                this.outx(
                    "small beads of pre-cum forming from the tips and slathering her back with your juices.",
                    false
                );
        } else
            this.outx(
                `${this.nippleDescript(
                    0
                )}s against the hard ridges of her back, your tongue softly licking her smooth skin.`
            );
        this.outx(
            '  You increase the pace of your movements, plunging your fingers in and out of her dripping pussy while your free hand tweaks and rubs the hardened button of one of her cushiony breasts.  The dragoness squirms and convulses underneath your touch, biting her lip while she becomes a slave to your manipulations.  "<i>I... I\'m not enjoying this... n-not with someone like you!</i>" she manages to growl, her admirable resistance only giving you the desire to plunge her further into a world of pleasure.  You fit a third finger into her tight hole, the heat of her walls clenching against you like a velvet furnace.  You reach down and kiss her a second time, deciding to go about it more passionately as you probe your tongue inside, wrapping it around her own.\n\n',
            false
        );

        this.outx(
            "There's nothing your hot and bothered slave can do outside of melting underneath the heat of your own body, the irony of the dragon-girl losing in a game of passions lost in the rough, commanding movements of your hands and the taste of her plush lips against your own.  You're intertwined as a single being of pure lust under the shade of the tree, which ends as soon as it began when the draconic beast-girl shudders in pleasure, signalling her release.\n\n",
            false
        );

        this.outx(
            "Her moist juices flush from beneath her, drenching your fingers in her essence.  She slowly removes her lips from yours, moving closer towards you",
            false
        );
        if (this.player.hasCock()) {
            this.outx(
                " and accidentally brushing against your trembling genitals, pushing you hard enough to cause you to ejaculate against her backside",
                false
            );
            this.player.orgasm();
        }
        this.outx(
            ".  The girl sighs in relief, tuckered out more from the sensual experience than the battle itself.  You slowly remove yourself, leaving the tired girl underneath the tree to rest.\n\n",
            false
        );

        this.outx(
            '"<i>I... hate you... </i>" she whispers, before turning in for a deep slumber.  You watch her soft face as she snores, graceful as a pig, before walking back to camp.',
            false
        );
        if (!this.player.hasCock()) this.dynStats("lus", 120);
        this.cleanupAfterCombat();
    }
    // *Victory Tail-dildo, for girls - Fencrafted for maximum pomf (Zed)
    private kihaVictoryPomfTail(): void {
        this.outx("", true);
        this.spriteSelect(72);
        this.outx("You approach the ");
        if (this.monster.lust > 99) this.outx("lusty ");
        else this.outx("wounded ");
        this.outx(
            `dragoness full of wicked ideas.  For her part, she looks up at you with a defiant gaze, as if it would somehow dissuade you from the sexual thoughts now guiding your body.  You circle to the side and reach down, grabbing her wriggling tail with both hands.  Kiha tries to pull it out of your hands, but in her weakened state, all it does is weakly flop like a caught fish.  Laughing, you smack her in the face with her own scaly hind-bits before you drop it.  You know just how you'll put that rudder to use, but first you've got to shuck your ${this.player.armorName}.\n\n`,
            false
        );

        this.outx("The gear lands behind you in a bed of moss");
        if (this.silly()) this.outx(" with a pomf =3");
        else this.outx(".");
        this.outx(
            `  Now nude, you sway your ${this.hipDescript()} back and forth sensually, forcing Kiha to watch your body before you use her.  `
        );
        if (this.player.biggestTitSize() <= 4)
            this.outx(
                "She looks away and blushes as she says, \"<i>It's not like I'd find such tiny breasts attractive!</i>\"  Her mannerisms seem to indicate that she does.",
                false
            );
        else if (this.player.biggestTitSize() <= 12)
            this.outx(
                'She sighs and says, "<i>As if I\'d be impressed by udders like those!</i>"',
                false
            );
        else
            this.outx(
                'She laughs and taunts, "<i>How do you even walk with ridiculous hooters like those?  Go on, moo, cow!</i>"',
                false
            );
        this.outx(
            "  You tire of her constant insults and inability to face facts.  A-ha!  You grab your underwear and ball it up, noting the pungent smell of your sweat and sex.  The scaly slut recoils, but you close in and stuff the musky undergarments in her mouth, ignoring her struggles as you grab some vines and bind her arms.  Perfect!\n\n",
            false
        );

        this.outx(
            "Kiha's eyes well up with tears while her eyebrows stay locked in a perpetually angry glare.  At the same time, you begin to hear fluids dripping down to the ground.  You surreptitiously glance below and confirm that your initial thought was correct - she's gotten much wetter after having to suck on your pussy-",
            false
        );
        if (this.player.hasCock()) this.outx(", cum-,");
        this.outx(
            " and sweat-soaked underwear.  The black, crimson-embedded slits of her eyes narrow in barely suppressed rage, but as she is now, she's no threat to you.\n\n",
            false
        );

        this.outx(
            "You reach back down and once again take hold of the rebellious dragon's tail.  \"<i>I'm going to get myself off.  Perhaps if you had been more agreeable I might have considered helping you out too.  Now, if you don't mind, I think this nice, ribbed tail-dildo should work just fine.</i>\"  You twist her squirming appendage about and rub the thicker bottom scales over your lower lips, your body shivering from the pleasure.  As you slide the hot, scaled pretend-penis along your femininity, it ",
            false
        );
        if (this.player.wetness() <= 3) this.outx("grows wet");
        else if (this.player.wetness() <= 4) this.outx("quickly grows slimy");
        else this.outx("immediately becomes soaked from your constant drippings");
        this.outx(".\n\n", false);

        this.outx(
            `Satisfied that it is sufficiently lubricated, you squeeze the now-slippery tail and point its nubby tip at your entrance.  It bumps your ${this.clitDescript()} as you wrangle with the struggling hind-limb, only turning you on all the more.  Feeling the tip circling your tunnel's opening, you push it up and seat the tentacle-like tail deep inside yourself.  `
        );
        this.player.cuntChange(1, true, false, true);
        this.outx(
            `Gods she's so... warm, and the ridges, they're stroking every inch of your interior, even your g-spot!  Your ${this.player.legs()} wobble unsteadily, but spurred by lust, you keep an iron grip on your new-found toy.  Kiha doesn't stop resisting either.\n\n`,
            false
        );

        this.outx(
            `Leaning back against the tree the dragon previously occupied, you slide down, letting your ${this.player.legs()} go completely nerveless.  Kiha's struggles unintentionally add to your pleasure, turning her tail into the world's warmest, most powerful vibrator.  Your hands begin to push more of her girthy thickness inside, stretching your poor puss further and further.  `
        );
        this.player.cuntChange(35, true, false, true);
        this.outx(
            "Moaning, you look at her and meet her gaze.  She still looks mad, but her face also carries a hint of confusion.  Peeking down, you see she's dripping even faster, as evidenced by a massive puddle of lady-spunk that pools between her muscular, tightly-clenched thighs.  She must be turned on beyond belief, but she's still resisting!\n\n",
            false
        );

        this.outx(
            `Well, that's her loss.  You keep fucking yourself on her ridged posterior, enjoying the rapid twitches, hard wiggles, and other constant movements.  It almost feels like it's attacking your pussy, battering your womanhood with pleasurable strikes.  Your ${this.hipDescript()} push back against the welcome intrusion, stuffing another inch or two inside yourself as you move closer and closer to the release you oh-so-desperately crave.  It feels so good!  You scream out in bliss and undulate your entire body, pumping, thrusting, and squirming yourself to the absolute highest peak of pleasure, the summit of sensation.  `
        );
        if (this.player.wetness() < 3) this.outx("Dripping");
        else if (this.player.wetness() < 4) this.outx("Leaking");
        else if (this.player.wetness() < 5) this.outx("Gushing");
        else this.outx("Spraying");
        this.outx(
            ` girl-cum, your ${this.vaginaDescript()} cums hard.  It squeezes down with clenching, rippling action that finally stop the tail's frantic struggles, immobilizing it in your womanhood.\n\n`,
            false
        );

        this.outx(
            "Kiha's moaning stirs you from your orgasmic haze, and you see her pussy actually streaming a steady drizzle of lube, but she still hasn't gotten off.  Perfect!  You watch her while your heart-rate slows to near normal, and eventually, you pull the cum-soaked tail from your nethers with a satisfied sigh.  It feels... cold and empty without the heat of her huge tail inside you, but you think you'll manage, somehow.\n\n",
            false
        );

        this.outx(
            'The draconic woman snaps when you pull your soiled undies from her maw.  "<i>Bitch!  I\'ll get you for t-this!</i>"\n\n',
            false
        );

        this.outx(
            "Your only response is to get dressed, enjoying the pleasant tingle of her bubbling saliva on your girl-parts.  Kiha glares at you, futilely shaking her hips as if that would somehow quell the tide of lust washing through her body.  Maybe another of the swamp's denizens will keep her company in your absence?",
            false
        );
        this.player.orgasm();
        this.cleanupAfterCombat();
    }
    // *Victory Dicking - Fencrafted
    private victoryDickKiha(): void {
        this.spriteSelect(72);
        const x: number = this.player.cockThatFits(this.monster.vaginalCapacity());
        const y: number = this.player.cockThatFits2(this.monster.vaginalCapacity());
        this.outx("", true);
        this.outx(
            "You walk up and push the dragoness off the tree and onto her side to get a better look at her sopping vagina and tight rump.  Initially she doesn't react, though when she realizes what you're about to do, she cries, \"<i>How very much like my old masters you are.  As soon as you've won a fight, you think of nothing but sex.  ",
            false
        );
        if (this.monster.lust > 99)
            this.outx("Just because you've aroused my body doesn't mean I'll enjoy this!");
        else this.outx("Don't think I'll enjoy this!");
        this.outx('</i>"\n\n', false);

        this.outx(
            "Kiha certainly has a mouth on her, but then again, you aren't interested in that particular orifice at the moment.  You lift her leg, but she curls her tail up to obscure her pussy from your view",
            false
        );
        if (this.monster.lust > 99)
            this.outx(
                ", rubbing it back and forth against her folds without thinking about it",
                false
            );
        this.outx(
            ".  Annoyed, you twist the rebellious appendage out of your way but struggle to hold it back.  The dragon isn't making it easy for you for in the slightest.  Still, you get a nice long look at her soaked sex, and the sight ",
            false
        );
        if (this.player.lust > 60) this.outx(`only makes ${this.sMultiCockDesc()} harder.`);
        else this.outx(`quickly makes ${this.sMultiCockDesc()} hard`);
        this.outx(
            ".  Her rear-most extremity yanks out of your grip to cover her femininity once more and you let it, for now.\n\n",
            false
        );

        this.outx(
            `Pausing for a moment, you set to removing your ${
                this.player.armorName
            } and unleashing ${this.sMultiCockDesc()} `
        );
        if (this.player.hasVagina()) this.outx(`and ${this.vaginaDescript()} `);
        this.outx(
            "to the humid air.  Kiha's eyes widen slightly at the sight of your exposed body, but she gives no other reaction.  She seems utterly resigned and yet composed at the same time.  From her expression, you'd have to wager she anticipates violation from any losses.  Well, she's going to get exactly what she expects.\n\n",
            false
        );

        this.outx(
            `You advance on her helpless form and repeat your actions, raising her leg and shoving her tail aside.  She resists, but not as fiercely as before.  Her tail is easily kept at bay while you lower yourself to align your ${this.hipDescript()} with the Kiha's moist cunt.  The heat rolling out of her loins is unreal.  Her pussy seems to fog the air with its combination of warmth and wetness, and as you press your ${this.cockDescript(
                x
            )} closer, it feels almost like a woman is about to give you head, with her hot breath washing over your genitals.\n\n`,
            false
        );

        // (DOUBLE DICKING VARIANT)
        if (y != -1 && this.player.cockTotal() > 1) {
            this.outx(
                `That perfect, dripping entrance beckons for your ${this.cockDescript(
                    x
                )}, but your other penis`
            );
            if (this.player.cockTotal() == 2) this.outx(" is");
            else this.outx("es are");
            this.outx(
                ` aching so much that you may as well try to double your pleasure and fun.  Without hesitation, you slide two cocks inside your unsuspecting partner.  The top one smoothly sheaths itself inside Kiha's velvety tunnel.  Her tightly-clenched pucker proves more resistant to your ${this.cockDescript(
                    y
                )}'s sudden intrusion, pushing back with near painful force as inch after inch penetrates her delicious rear passage.  One last, glorious push completely buries both your bones in their draconic sockets, much to the delight of your captive, if her moans are to be believed.\n\n`,
                false
            );

            this.outx(
                "\"<i>That's -ooooh- all you gah-got?  I... uhh... barely felt it!</i>\" Kiha protests, trying to retain her aloof demeanor even while she's moaning and squirming from the feel of your two spears inside her.  Sensing that her body is dancing wholly to your tune, you release her leg and tail to make yourself more comfortable.  You hold yourself up with one hand in the dirt and rest your other on the supple, lightly-scaled flesh of Kiha's breast.  She exhales, a high-pitched sound of enjoyment and pleasure slipping from her lips.  Taking her nipple between your fingers, you lightly twist it while you allow yourself to become accustomed to the pleasure her twin-tunnels provide for your dual members.\n\n",
                false
            );

            this.outx(
                "Kiha writhes and pants, her normally flawless skin gaining a blush of rouge that's visible even through her dusky complexion.  You move your hand to trace a circle around her other nipple, feeling it stiffen and engorge at your touches.  Soon it's rock hard, but you keep going, stroking and tugging the tender nub until the dragoness begins to twist and grind beneath you, pumping her trapped hips futilely while she pants, \"<i>A-are you broken or something?  D-do you even know h-how to fuck, you... oooh... freak?</i>\"\n\n",
                false
            );

            this.outx(
                'You sigh and slap her face, informing her that she should shut her trap and consider herself lucky you\'re spending the time to pleasure her body while you sate yourself.  Kiha barks, "<i>Yeah right!  As if I would enjoy something like th-</i>"\n\n',
                false
            );

            this.outx(
                "You cut her snobby ranting off by pulling back and thrusting hard, her tirade turning from well-spoked complaints to inarticulate moans.  She squeals in forced pleasure with each pump of your double dicks while you work her over.  There's no way you're going to slow down or give her a chance to start bitching again.  Dribbles of fem-spunk burst from her thighs with each body-shaking impact to spatter the ground and your lower member, turning her tight, resistant asshole into a butt-pussy nearly as wet as her cunny.\n\n",
                false
            );

            this.outx(
                "Seemingly from nowhere, her tail presses up your back and twists around your neck.  It squeezes your wind-pipe with strangling strength.  You glance down at Kiha, and she's smiling in between her moans, watching her attempts to suffocate you with heavy, lidded eyes.  That bitch!  You fuck her faster, battering at her holes with every ounce of strength you can muster.  The fucking is hard, fast, and desperate, but somehow she manages to keep her pressure up with her tail.  Frustrated, you take to slapping her face, twisting her nipples, and even choking her with one of your hands.  In spite of the incredibly rough sex, she still manages to hold tight.  Her body is twitching and shaking, her mouth spreading into a wordless 'o' of pleasure, but you still can't breathe!\n\n",
                false
            );
            this.flags[kFLAGS.KIHA_CHOKED_OUT_PC] = 1;
            // [if PC has naga tail or 40</i>\"+ tentacle dick not currently in use:
            let z = -1;
            this.temp = this.player.cocks.length;
            while (this.temp > 0) {
                this.temp--;
                if (
                    this.player.cocks[this.temp].cockType == CockTypesEnum.TENTACLE &&
                    this.temp != x &&
                    this.temp != y
                ) {
                    z = this.temp;
                    break;
                }
            }
            if (this.player.isNaga() || this.player.tailType == TAIL_TYPE_LIZARD || z >= 0) {
                this.outx("Spitefully, your ");
                if (z == -1) this.outx("tail");
                else this.outx("idle tentacle");
                this.outx(
                    " responds in kind, bending up to squeeze Kiha's own neck and even inserting the tip into her mouth when next she opens it to let out an aroused gasp, forcing itself down her gullet.  A cross look flashes across her visage for only a second as she realizes she's become subject to your own draconic retribution, but the next few desperate thrusts into her wanton holes do much to dissipate it.  For every thrust she squeezes your windpipe a bit tighter, and you respond in kind",
                    false
                );
                if (z >= 0) this.outx(", plunging the head of your cock in and out of her throat.");
                this.outx("\n\n", false);
            }

            this.outx(
                `Dully, you realize ${this.sMultiCockDesc()} are twitching, her powerful clenching holes combining with your frenzied strokes too much for you to endure.  Heat boils out from your ${this.ballsDescriptLight()} as your orgasm approaches, threatening to burst from your loins even as blackness eats at the edges of your vision.  Screw it - if she's choking you out, you're at least going to get to cum first.  You grab both her nipples as you hilt yourself and twist, HARD.  Jizm spurts from your cocks, glazing Kiha's hot, juicy puss,`
            );
            if (this.player.isNaga() || this.player.tailType == TAIL_TYPE_LIZARD || z >= 0)
                this.outx(" gasping mouth,");
            this.outx(" and tight anus with waves of white.");
            if (this.player.cumQ() >= 500)
                this.outx(
                    "  Her belly distends before long, stuffed by the heavy loads of cream you push out.",
                    false
                );
            if (this.player.cockTotal() > 2) {
                this.outx(
                    "  You even coat her belly and tits with seed thanks to your extra penis",
                    false
                );
                if (this.player.cockTotal() > 3) this.outx("es");
                this.outx(".");
            }
            this.outx("\n\n", false);

            this.outx(
                "Slumping against her, your shafts continue to pump cum inside the dragon's super-warm holes.  When suddenly, you're able to breathe!  You shake the clouds from your head and look down at Kiha, noticing that she's shaking uncontrollably.  Looking over your shoulder, you see her tail thrashing wildly behind you, any vestiges of control blown away by an explosive orgasm.  Now that you can catch your breath, you're able to enjoy watching your muscular foe succumb to her body's directive.  She undulates beautifully beneath you, her body milking every last drop from your two cocks.\n\n",
                false
            );

            this.outx(
                "You sigh and pull back, noting that Kiha's orgasm still seems to be ongoing.  She doesn't even react to the sudden vacancies in her pussy and asshole.  Maybe this will teach her a lesson about underestimating her opponents, but you doubt it.  You get dressed and leave, smiling at the sound of lurid orgasmic panting behind you.",
                false
            );
        }
        // (SINGLE DICKING VARIANT)
        else {
            this.outx(
                `That perfect, dripping entrance beckons for your ${this.cockDescript(
                    x
                )}, and without hesitation, you slide inside.  Kiha growls, "<i>That's it?  How artless.</i>"  In spite of her disappointed tone, her slippery passage squeezes down on your member with miraculous tightness, embracing your ${this.cockDescript(
                    x
                )} in its firm, velvet grip.  You sigh happily and enjoy the dragon-pussy's pressure for a few moments, tuning out Kiha's griping to focus on the heavenly feelings her body is giving you.\n\n`,
                false
            );

            this.outx(
                `Eventually, you become accustomed to the feel of the reptilian tunnel's simmering juices, and eager for more stimulation, you begin to saw your ${this.cockDescript(
                    x
                )} in and out of sodden box.  The draconic woman beneath you lets out whimpers and moans of pleasure mixed with discontent, unable to resist you and unable to allow herself to enjoy it.  She squirms and wriggles beneath your forced affections, growing `
            );
            if (this.monster.lust > 99) this.outx("more aroused despite her feigned indifference");
            else this.outx("very aroused in spite of her desire to fight you");
            this.outx(
                ".  For your part, you pick up the pace, pushing yourself faster and faster towards an eventual climax.  Kiha places her scaled fingers on her chest to stop it from jiggling in response, but you push them away, wanting her breasts to bounce freely for your amusement.\n\n",
                false
            );

            this.outx(
                `All too soon you find your ${this.cockDescript(
                    x
                )} giving in to the pleasure of Kiha's sizzling snatch, warmth building beneath your penis as it nears climax.  You let go of her tail as you increase your tempo and push your body towards release.  The dragon's scaled appendage immediately sets to work on your back, battering you with heavy slaps that could seriously damage you if her full strength were behind them.  As it is, they may leave a few bruises.  You tweak one of Kiha's nipples and smile as she moans in sudden pleasure, the lurid vocalization being just what you need to hear to cum inside her.\n\n`,
                false
            );

            this.outx(
                "You push yourself in all the way to the hilt and unload, firing jet after jet of thick cream into the dragon's dribbling pussy, only making it leak even more.  ",
                false
            );
            if (this.player.cumQ() >= 500)
                this.outx(
                    "A chubby bulge appears on her taut, defined belly, the only visible sign of your copious cum production.  ",
                    false
                );
            if (this.player.cumQ() >= 1000)
                this.outx(
                    "Even after that, thick gouts of the stuff spray out through her cock-stuffed lips, forming a puddle beneath your foe.  ",
                    false
                );
            this.outx("You pull out");
            if (this.player.cor < 33)
                this.outx(
                    ", clean up, and get dressed, leaving Kiha behind to consider the effects of her arrogance.",
                    false
                );
            else if (this.player.cor < 66)
                this.outx(
                    ", wipe your cock off on her face, and get dressed, leaving Kiha to consider being a little more humble.",
                    false
                );
            else
                this.outx(
                    ", smear your dribbling cock all over her face, make her lick it clean, and then, get dressed.  Maybe the bitch will consider a little humility when addressing the real owner of this territory - you.",
                    false
                );
            this.outx("  Somehow, you doubt she'll learn anything from the encounter.");
        }
        this.player.orgasm();
        this.cleanupAfterCombat();
    }

    private kihaRapesLittleGirlsISawItOnTheNews(): void {
        this.outx("", true);
        this.spriteSelect(72);
        this.outx(
            '"<i>Well, well... what a cute vagina you have here!</i>" she exclaims mockingly, pushing her palm against your moist sex.  With a wicked smile, the dragon girl forcibly shoves a pair of fingers inside you, their long, hard tips parting your sensitive flesh mercilessly.  You yelp in both pain and pleasure at her forced entrance, squirming uncomfortably on her hand.  "<i>Haha!  You\'re enjoying this?  Don\'t fret slut, we\'re just getting started.</i>"  Pulling back ever so slightly, Kiha slides another finger in, stretching your pussy with the thickness of her digits, furiously working them in and out of your snatch, relishing the gasping blush that spreads across your face.\n\n',
            false
        );

        this.outx(
            "You moan, weakly begging her to stop, or at least to slow down and be gentler.  The pleasure of her relentless stimulus sets your cunny drooling, while the pain of the dragon's brutal indifference forces saliva to bubble in your mouth as you hold your tongue, trying not to give her the satisfacton of watching you scream. She stretches your netherlips and brutally thrusts into your depths, watching your face intently, relishing your weakness. When, at last, you cry out in orgasmic throes, she purses her lips in satisfaction, the faintest trace of an affectionate flush creeping across her dusky cheeks.\n\n",
            false
        );

        this.outx(
            `Despite the pleasure of your crumbling restraint, the pleading shudders of your cumming body makes her even more aggressive than before.  "<i>Yes!  Beg for mercy!  You don't deserve a minute of my time! How could someone like me ever be interested in a pig like you?</i>"  To punctuate the game she's playing with your honeypot, Kiha pinches your ${this.clitDescript()} between her fingers, the narrow nails of her claws squeezing your sensitive nub so tightly your jaw drops in a soundless scream of bliss.\n\n`,
            false
        );

        this.outx(
            `"<i>Here's how this is going to go,</i>" she murmurs when you've finally stopped gasping for breath.  "<i>You will lick me until I tell you to stop, and every time you displease me I'm going to take it out on your sensitive little fuck hole.</i>"  She swings around and sits on your face, smashing her wet cunt on your ${this.player.face()}.  "<i>Be grateful that I'm letting you do this,</i>" she gurgles, pinching your clit again for emphasis.  Doing as you're told, you lick deeply into the warm velvet of the dragon's folds.`
        );
        if (this.player.tongueType == TONUGE_SNAKE)
            this.outx(
                "  You are grateful for your forked tongue, which allows you to cover more of her pussy at once.",
                false
            );
        else if (this.player.tongueType == TONUGE_DEMONIC)
            this.outx(
                "  Your inhumanly long, prehensile tongue is a blessing here; you can reach into her deepest recesses, slurp your way into every nook and cranny, and generally provide a tongue-fuck that no human ever could.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            `Despite your ethusiastic efforts, no amount of lapping, sucking, and nibbling seems able to please her and, after a few minutes, you feel another painful pinch on your ${this.clitDescript()}, your pink pearl throbbing between her fingers. "<i>That's not how you do it! Since you're so incapable, I'll have to show you how to do it! Take notes.</i>" She bends over, the heat of her face breathing a scintillating curtain of warmth over your quivering quim. Shoving her nimble tongue into your pussy with a lightning-quick motion, you tremble at the delicious wetness of her tingling saliva licking the depths of your loins by dragging the her muscled tip across your flesh, before blowing a hot gasp inside your vulnerable depths, pleasure rippling through your walls.\n\n`,
            false
        );

        this.outx(
            `You shudder in ecstasy tinged with fear and redouble your efforts, slurping down the now steadily flowing juices of your reptilian tormentor like a woman dying of thirst who is suddently confronted with a fresh spring of water. With another moan, Kiha looses a gasp of heated air that nearly feels like agonizingly wonderful flames into your aching snatch and you nearly go over the edge, your juices evaporating into a lewd puff of lusty perfume that wafts into the dragoness' nostrils. "<i>Yes, cum for me,</i>" she coos, as she grinds her pussy against your ${this.player.face()}, flooding your mouth and nose with her own smoldering fragrance.\n\n`,
            false
        );

        this.outx(
            "Unable and unwilling to do anything but obey, you climax with a shuddering tensing of your muscles that vibrates the dragon lying atop you.",
            false
        );
        if (this.player.wetness() >= 5)
            this.outx(
                "  Your juices spray into her face like cum from a cock, your quantity of lubricants unable to resist cascading from the pressure of your orgasm.",
                false
            );
        this.outx(
            "  She responds in kind, gushing her unspoken attraction across your clenched features. Drowning in dragon juices and shuddering in pleasure, you finally pass out.\n\n",
            false
        );

        this.outx("By the time you come to, Kiha is long gone.");
        this.player.orgasm();
        this.dynStats("sen", 2);
        this.cleanupAfterCombat();
    }

    // Conversation Only - Emotional Rape! (40- Corruption! PUREBABIES ONLY) (Zed)
    private rapeKihaWithWORDS(): void {
        this.outx("", true);
        this.spriteSelect(72);
        if (this.flags[kFLAGS.KIHA_TALK_STAGE] == 0) {
            this.outx(
                "Kneeling down, you meet the defeated dragoness' gaze and ask her why she's so violent and territorial.  Kiha looks up at you in confusion and asks, \"<i>Wait... you defeated me, and you want to... talk?</i>\"\n\n",
                false
            );

            this.outx(
                "You nod your head and ask her again why she's so dead-set on defeating anyone that comes near her.  Kiha scratches at her elbow nervously and answers, \"<i>I don't know.  I just DO.  I-I'm so powerful - I have to defeat everyone.  It's the only way I can become the strongest.  I can't rely on weaklings or expect mercies like this.  The demons gave me none and I intend to return the favor.  You shouldn't even be talking to me.  You should rape me or kill me, anything to weaken me and cement yourself as the top predator.</i>\"\n\n",
                false
            );

            this.outx(
                "You chuckle a little at that before you catch the dangerous gleam in her eyes.  She's truly serious about this!  You put your hand on her shoulder and start to explain, but she shrugs it off.  You sigh and start over.  \"<i>I'm not from here, but my world doesn't work that way, and I don't believe this one has to either.  Look, I beat you, but I only did it because I had to.  I have to stop the demons, and I can't let anyone stand in the way.  That doesn't mean I'm going to be a monster to everyone else.  Real power isn't the strength of a monster, it's the strength of determination and righteousness of your cause, beating in your heart and driving you to strive for victory!</i>\"\n\n",
                false
            );

            this.outx(
                'Kiha recoils at the passion in your voice and shakes her head like a child trying to find the courage not to fear the dark, "<i>No.  You sound like someone from the before times, from long, long ago, but it can\'t be that simple.  If it was, the demons would not rule this world.</i>"  While you chew that over, Kiha suddenly grabs her weapon and springs to her feet.  Her wings unfurl and she flies away.  Even if she denied you, you feel like you might have gotten through to her.',
                false
            );
        }
        // Conversation Level 2 (40- Corruption! PUREBABIES ONLY!) (Zed)
        else if (this.flags[kFLAGS.KIHA_TALK_STAGE] == 1) {
            this.outx(
                'Once again, you crouch down and begin talking with your foe.  Kiha immediately sighs and says, "<i>This again? I thought I told you - you\'re wrong.</i>"\n\n',
                false
            );

            this.outx(
                "You ask her if she really believes that.  After all, you've beaten her twice now.  Kiha shudders and yells, \"<i>I just said so!  Gods, don't be so... so fucking dense!  If you were right, Lethice wouldn't be on her throne and they never would've been able to make monsters like... ahh, n-never mind.  Dumbass!</i>\"\n\n",
                false
            );

            this.outx(
                "Shrugging, you decide she's unlikely to talk more on this topic for now, so you change the topic to something else - your own history.  You tell her of your village, of the portal, and the day you were chosen as champion.  You talk of your training, and how different this land was from everything you expected.  You tell of your struggles.  You describe your victories.  You commiserate about your defeats.  You pour out all of the best and worst of your journeys in this strange realm.  Surprisingly, Kiha listens with rapt attention, never once interrupting.\n\n",
                false
            );

            this.outx(
                'Once you finish she comes out of it and mutters, "<i>So you had it hard?  It doesn\'t matter.  I had it harder.</i>"  She launches into the air and flies away before you can answer.',
                false
            );
            if (
                this.silly() &&
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00281] > 0 &&
                this.telAdre.lottie.lottieMorale() <= 33
            )
                this.outx("  Is that what it feels like to be Lottie?");
        }
        // Conversation Level 3 (40- Corruption! PUREBABIES ONLY!) (Zed)
        else if (this.flags[kFLAGS.KIHA_TALK_STAGE] == 2) {
            this.outx(
                'Even though you\'ve taken the dragoness down again, you settle down for another chat instead of anything more carnal.  Kiha smiles at that, relaxing a little as she asks, "<i>Still sticking to your morals, huh?</i>"\n\n',
                false
            );

            this.outx(
                "You nod and ask her if perhaps she'd like to tell her story since you shared yours the last time.  The dragoness laughs so hard that tiny spurts of flame flare in the air while small puffs of smoke burst from her nostrils.  She clutches at her stomach and doubles over, gasping for air.  Only after she manages to recover from her mirth does she breathlessly respond, saying, \"<i>You're serious about that?</i>\"\n\n",
                false
            );

            this.outx(
                "You nod again to which she replies, \"<i>Not even if pigs could fly!  And before you suggest it, pig-nosed imps don't count.</i>\"  You fold your arms across your chest expectantly and remind her that you're the victor here.\n\n",
                false
            );

            this.outx(
                'Kiha raves, "<i>You won because... I LET you win.  I just wanted to see how much information you\'d give up.</i>"\n\n',
                false
            );

            this.outx(
                "You sigh, which surprisingly gets a response.  \"<i>I... don't remember okay?  The first thing I remember is waking up like this in Lethice's base.  There were a few of us, and the demons taught us, schooled us to be like them... I guess they planned for us to be the next level of demons.  A few of us broke out and went our separate ways.</i>\"\n\n",
                false
            );

            this.outx(
                "The draconic woman looks very much like a young, nervous girl in that moment.  Her cheeks blush and she leaps up, flying away before you can ask her any more.",
                false
            );
        }
        // Conversation Level 4: Requires Low Corruption, Repeating for now (Zed)
        else {
            this.outx(
                "You sit down next to Kiha and start to talk again.  While she initially gives the barest hint of a smile, she soon begins to sulk.  No matter what you say or do you can't seem to bring her out of it.  Perhaps for now, there's simply no more to discuss with her.",
                false
            );
        }
        if (this.flags[kFLAGS.KIHA_TALK_STAGE] < 3) this.flags[kFLAGS.KIHA_TALK_STAGE]++;
        this.cleanupAfterCombat();
    }
    /* Conversation Level 5: requires Lottie as follower, and to have given her enough bee honey, demon items, or harpy seeds to grow wings

        You sit down next to Kiha, smirking as she pokes fun at your soft-heartedness.  She's practically relaxed around you now.  You're not even sure if she was trying as hard as she could during the fight, knowing that you wouldn't take advantage of her even if she lost.
    Slowly, the conversation winds back around to the story of her origin.  You casually mention that she owes you at least the attempt to remember more now since you met the terms of your agreement, a claim she meets with more than the expected skepticism.  Cocking an eyebrow at her protest, you raise your face skyward and, cupping hands around
    */

    // Kiha PC victory anal scene - by Space.
    private analRapuzulaKiha(): void {
        // Requires at least one penis with area <= 20
        this.outx("", true);
        this.spriteSelect(72);
        // Kiha PC victory anal scene - by Space.
        // Requires at least one penis with area <= 20
        let x: number = this.player.cockThatFits(this.monster.analCapacity());
        if (x < 0) x = 0;
        const y: number = this.player.cockThatFits2(this.monster.analCapacity());
        this.outx(
            "You watch the dragoness slump against the tree, her tail barely covering her soaked snatch.  You lick your lips hungrily at the prospect of ravishing the haughty dragon-girl's cunny, but decide she deserves something a bit more special.  You want that tight ass of hers, and you want it now.\n\n",
            false
        );

        this.outx(
            "You tell her to turn around but, still defiant, she refuses.  Glowering, you use your most commanding voice and bellow the command at her.  She still refuses.\n\n",
            false
        );
        if (this.player.cockArea(x) <= 20)
            this.outx(
                `You quickly shed your ${
                    this.player.armorName
                }, letting your ${this.multiCockDescriptLight()} out to breathe in the warm, swampy air.  Her red eyes widen slightly, but she quickly regains her composure, suddenly all confidence despite her obvious loss.  "<i>Oh? What do you think you're gonna do with THAT, huh?  Just ravish me like some kind of sex-crazed demon? Is that your genius plan?</i>"\n\n`,
                false
            );
        else
            this.outx(
                `You quickly shed your ${
                    this.player.armorName
                }, letting your ${this.multiCockDescriptLight()} out to breathe in the warm, swampy air. Her red eyes widen slightly, but she quickly regains her composure, suddenly all confidence despite her obvious loss.  "<i>Hah, look at that pathetic thing.  You might have gotten me a little hot, but I really doubt you could please anyone with that puny piece of equipment.</i>"\n\n`,
                false
            );

        this.outx(
            "Her words sting, and you resolve to make sure she enjoys what you're about to do.  You approach the defensive dragon and take her arms in your hands and turn her around.  Surprisingly, she resists your movements very little, only struggling when you aggressively push her face into the tree.\n\n",
            false
        );

        this.outx(
            "With the arrogant dragon now facing the tree, you take a better look at her taut ass.  Sensing your lustful gaze, she suddenly wraps her tail around her nethers, hiding her womanhood behind the scaly belt.  You laugh at her ignorance.  You tell her that it's not her dripping sex that you desire, it's her squeezable derriere.\n\n",
            false
        );

        this.outx(
            `"<i>Oh, so you're not just a sex crazed freak, you're into weird stuff as well.  You know things aren't supposed to go in there, right?</i>"  Ignoring the dragon-bitch's mocking, you yank her tail out of the way, raising it above her buttcheeks so you can have a better look.  Surprisingly, she doesn't resist, allowing the entirety of her ass to be revealed.  You grin and spread her chocolate-colored cheeks, placing your ${this.cockDescript(
                x
            )} between them.  The dragon's face twists into a hateful scowl, but her determination falters as you begin to hotdog your member up and down, pausing only to tease the draconic woman's pucker with the tip of your rod.\n\n`,
            false
        );

        this.outx(
            `You begin to feel the temperature around your cockhead rise.  The intense heat from her drooling cunt gets your blood flowing, getting ${this.sMultiCockDesc()} to grow to its full size.  You stop your cheek-sawing and place your member against her slick labia, thrusting against her taint for additional lubrication in preparation for your backdoor adventure.\n\n`,
            false
        );

        this.outx(
            '"<i>Look,</i>" you smile devilishly, "<i>your own juices are lubing me up to take you.  Here I thought you were turned off by the thought of your ass getting pounded.</i>"  She visibly clenches her muscles at your insult and pulls her rump away from your grip.  You grab her hips once again and thrust your ready cock into her virginally-tight asshole as punishment.\n\n',
            false
        );

        this.outx(
            `As soon as your fingers touch her skin, her tail whips around your ${this.multiCockDescriptLight()}, wrapping up your groin`
        );
        if (this.player.balls > 0)
            this.outx(` and threatening to crush your ${this.ballsDescriptLight()}`);
        this.outx(
            '.  "<i>Ooh, you\'re a feisty one, aren\'t you,</i>" you goad. "<i>You can dish out the snappy insults just fine, but taking them... Your temper is horrible.</i>"  You wince in pain, as the scaly tail wrapped around your genitals tightens in response.\n\n',
            false
        );

        this.outx(
            "You need to come up with a quick way to get out of this painful situation.  A thought forms in your mind.  She may act like a high and mighty puritan, but you still had a visible effect on her, and her cunt was definitely soaking from your touch just a few moments ago.  It seems she's not as high and mighty as she'd like to be.  A devious grin spreads across your face and you reach around and grope the dragon-girl's breasts.\n\n",
            false
        );

        this.outx(
            "She breaks her silence with a gasp.  You continue to massage her tits, your fingers sinking into her tanned flesh as you continue your ministrations.  She begins to pant softly as you twist your fingers around her nipples, but her tail muscles clench again, increasing the pressure on your groin.  You need to find a way to get her tail off your crotch... maybe you have a way to do that.\n\n",
            false
        );

        if (this.player.cor < 33)
            this.outx(
                "You move your hands from her two mounds and down her sides, resting just above her hips. Hoping that this will work, you begin to tickle the stubborn girl.  ",
                false
            );
        else if (this.player.cor < 66)
            this.outx(
                "Since she seems to be concentrating on your hands, you frantically try to think of a solution that doesn't involve them.  An idea forms and, deciding it's now or never, you lean forward and nibble on the tip of her ear.  ",
                false
            );
        else
            this.outx(
                "Since she seems to be concentrating on your hands at the moment, your mind races trying to find a solution that doesn't involve them.  An idea forms and, deciding it's now or never, you lean forward and slowly slide your tongue across her cheek.  ",
                false
            );

        this.outx(
            `She shrieks in shock from your sudden treatment. Having the desired effect, your distraction gives you the split second you need to slip your genitals out of her tail's grasp. You quickly place your ${this.cockDescript(
                x
            )} at her tight pucker, and forcefully slide forward.  Your head breaks through the tight ring and pushes its way inside.  Your surprise teasing seems to have shocked her enough to stop clenching her ass, and the additional lube helps in letting you sheath half your length inside.  The dragoness moans in what you assume is pleasure, finally breaking the cold facade that she's been so desperately trying to maintain.\n\n`,
            false
        );

        this.outx(
            `The heat that now encircles your ${Appearance.cockNoun(
                this.player.cocks[x].cockType
            )} is tremendous; her tightness, incredible.  You're nearly overwhelmed by the urge to slam your whole length home and just cum your brains out.  But you want her to enjoy this, too.  You slowly slide back out of her rectum, stopping when just the tip of the head is barely inside. You lean forward, resting your chest against the warm skin of her back, and thrust your ${this.cockDescript(
                x
            )} back into the crushing heat of her asshole.\n\n`,
            false
        );

        this.outx(
            "She squirms from the sudden penetration of her ass.  You revel in the sensation of your member crawling into her dark depths, and by the way the dragon-slut is starting to move her hips, you're pretty sure she is, too.  Grinning, you grab her hips and give a hard thrust, completely hilting yourself inside her butt.  You hear a grunt of pain from your unwilling partner, but the feeling of her hot, crushing bum is all you can think about right now as your cock begins an all-out assault on her anus.\n\n",
            false
        );

        this.outx(
            'Her moans of pain become more and more frequent, slowly changing in pitch and fervor until you realize that they\'ve become moans of pleasure.  "<i>Well, well, well,</i>" you jeer. "<i>You\'re quite the wanton slut, after all.</i>"  She forces herself to stop her incessant moaning, and the sound is replaced with the wet slap of your thighs clapping against her own.\n\n',
            false
        );

        // [if multi-cocks and one is within cock area of 20]
        if (y >= 0) {
            this.outx("A perverted idea forms in your mind. You reach down, grab");
            if (this.player.cockTotal() == 2) this.outx(" your other dick");
            else this.outx(" another of your dicks");
            this.outx(
                ", and line it up to the entrance of her now-stretched hole, ramming them both in on your next thrust, expanding her tight passage far beyond its normal limits.  The dragon breaks her silence with a shriek as your two cocks ravage her bunghole, her walls nearly crushing your members as she clenches her muscles in shock.  The extreme tightness and the unbelievable heat enveloping your dicks becomes too much, and you feel the point of no return approaching quickly.\n\n",
                false
            );

            this.outx(
                "You manage a few more thrusts into the draconic woman before your incoming orgasm arrives, each pounding movement making her moan in a mixture of pleasure and pain from the forced double penetration.  You feel your urethras dilate and blast a wave of pre, filling her rectum and slathering your shafts with a fresh coating of lubricant, readying them for one final push into the girl's abused hole.\n\n",
                false
            );

            this.outx(
                `You pull out one final time, placing them at her gaping ring.  Knowing what you're about to do, the dragon visibly relaxes in an attempt to make it as painless as possible.  Getting a good grip on her hips, you thrust your dongs forward and pull her back onto your cocks simultaneously.  Your ${this.cockDescript(
                    y
                )} slips from the exposed hole and slides itself between her buttcheeks, while your remaining ${this.cockDescript(
                    x
                )} hits home.\n\n`,
                false
            );

            this.outx(
                `Kiha shudders in her own climax, soaking her thighs as you finally release your seed into her ravaged ass.  Your other ${Appearance.cockNoun(
                    this.player.cocks[y].cockType
                )} follows its brother, painting her leather-colored skin with alabaster cream`
            );
            if (this.player.cockTotal() >= 3) {
                if (this.player.cockTotal() == 3)
                    this.outx("; your remaining cock tarnishes the ground with your cum");
                else this.outx("; your remaining cocks tarnish the ground with your cum");
            } else if (this.player.hasVagina())
                this.outx(
                    `; your ${this.vaginaDescript()} pulses with pleasure, soaking your thighs with girl-cum as your cocks unload`
                );
            this.outx(".\n\n", false);

            this.outx(
                `The dragoness slumps and falls to the ground, drawing your spent shaft from her ass's depths.  It appears that she has fainted from overwhelming pain, pleasure, and exhaustion. Deciding that you're done here, you retrieve your ${this.player.armorName} and leave the girl in a mixed puddle of your cum and hers.  Perhaps now she'll treat you with a little more respect.  You return to camp.`
            );
        } else {
            if (this.player.cockArea(x) <= 20)
                this.outx(
                    'You move your hands to her breasts, feeling the lightly scaled flesh and begin tweaking her nipples in time to your continued thrusting.  She breaks her self-imposed silence with a long, pleasured sigh, but cuts it short when you laugh at her body\'s betrayal of her emotions.  "<i>H-how can anyone even l-like this anyway?</i>" she pants with barely contained pleasure.  "<i>All you\'re doing is sticking your pathetic dick inside something that it isn-isn\'t designed for.  I-I can barely feel your ti-tiny little cock... uhh... stretching my ass, filling it with s-such force.  Its head tickling my walls with your... ohhh... pathetic attempts to get yourself o-off...</i>"\n\n',
                    false
                );
            else
                this.outx(
                    'You move your hands to her breasts, feeling the lightly scaled flesh and begin tweaking her nipples in time to your continued thrusting.  She breaks her self-imposed silence with a long, pleasured sigh, but cuts it short when you laugh at her body\'s betrayal of her emotions.  "<i>H-how can anyone even l-like this anyway?</i>"  She pants with barely contained pleasure.  "<i>Dicks don\'t even belong there, you... you freak!  It... it doesn\'t even feel good... stretching my ass, filling it with s-such force.  Its head tickling my walls with your... ohhh... pathetic attempts to get yourself o-off...</i>"\n\n',
                    false
                );

            this.outx(
                `Her moans become louder as you continue the butt-fuck, her hole becoming as wet as her pussy as your intruding member slides in and out of her dilated sphincter.  Her involuntary signs of enjoyment spur you on and pre flows freely from your member, allowing you to ignore her crushing tightness and enjoy the hot pleasure that envelops your ${this.cockDescript(
                    x
                )}.  You doubt that even her pussy's depths would give you this kind of feeling.\n\n`,
                false
            );

            this.outx(
                "You give her nipples one more rub, not realizing that she was fighting off her own orgasm.  Her spasming walls clench hard against your cock, eagerly milking you while her thick girl-cum soaks her thighs.\n\n",
                false
            );

            this.outx(
                "Grunting, you thrust one last time and spill your seed into her, filling her rectum with sticky cum.  ",
                false
            );
            if (this.player.hasVagina())
                this.outx(
                    `Your ${this.vaginaDescript()} pulses with pleasure, but it's an empty orgasm, leaving you wishing you had something to fill that aching void.  Still, you cannot help but marvel at the superior feeling of cumming with a multitude of sexual organs.  `
                );
            this.outx(
                "With a contented sigh, you pull out of the dragon and thank her for the good time.  She sits back against the tree and glares at you angrily, though you can easily tell she's been utterly sated.\n\n",
                false
            );

            this.outx(
                `Deciding that you are done here, you retrieve your ${this.player.armorName} and leave the girl. Perhaps now she'll treat you with a little more respect. You return to camp.`
            );
        }
        this.player.orgasm();
        this.cleanupAfterCombat();
    }
}
