import { trace } from "../../../console";
import { TAIL_TYPE_SPIDER_ADBOMEN } from "../../../includes/appearanceDefs";
import { CoC } from "../../CoC";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { ItemType } from "../../ItemType";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";
import { TimeAwareInterface } from "../../TimeAwareInterface";
import { NPCAwareContent } from "./NPCAwareContent";

export class Rathazul extends NPCAwareContent implements TimeAwareInterface {
    // const RATHAZUL_DEBIMBO_OFFERED: number = 744;

    // Rathazul the Alchemist
    // Encounter, random text for potential uses, choices.
    // After he has crafted 3 things for the player, option to move into camp.
    public constructor() {
        super();
        CoC.timeAwareClassAdd(this);
    }

    // Implementation of TimeAwareInterface
    public timeChange(): boolean {
        if (this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] > 1) {
            this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN]--;
            if (this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] < 1)
                this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] = 1;
            if (this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] > 300)
                this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] = 24;
        }
        if (this.flags[kFLAGS.RATHAZUL_CAMP_INTERACTION_COUNTDOWN] > 0) {
            this.flags[kFLAGS.RATHAZUL_CAMP_INTERACTION_COUNTDOWN]--;
            if (this.flags[kFLAGS.RATHAZUL_CAMP_INTERACTION_COUNTDOWN] < 0)
                this.flags[kFLAGS.RATHAZUL_CAMP_INTERACTION_COUNTDOWN] = 0;
        }
        return false;
    }

    public timeChangeLarge(): boolean {
        return false;
    }
    // End of Interface Implementation

    public returnToRathazulMenu(): void {
        if (this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0) this.campRathazul();
        else this.encounterRathazul();
    }

    public encounterRathazul(): void {
        this.spriteSelect(49);

        if (
            this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] == 2 &&
            this.player.findStatusAffect(StatusAffects.MetRathazul) >= 0
        ) {
            this.marblePurification.visitRathazulToPurifyMarbleAfterLaBovaStopsWorkin();
            return;
        }

        // Rat is definitely not sexy!
        if (this.player.lust > 30) this.dynStats("lus", -10);
        // Introduction
        if (this.player.findStatusAffect(StatusAffects.MetRathazul) >= 0) {
            if (this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0)
                this.outx(
                    "You walk over to Rathazul's corner of the camp.  He seems as busy as usual, with his nose buried deep in some tome or alchemical creation, but he turns to face you as soon as you walk within a few paces of him.\n\n",
                    true
                );
            else
                this.outx(
                    "You spy the familiar sight of the alchemist Rathazul's camp along the lake.  The elderly rat seems to be oblivious to your presence as he scurries between his equipment, but you know him well enough to bet that he is entirely aware of your presence.\n\n",
                    true
                );
        } else {
            this.outx(
                'You encounter a hunched figure working as you come around a large bush.  Clothed in tattered robes that obscure most his figure, you can nontheless see a rat-like muzzle protruding from the shadowy hood that conceals most of his form.  A simple glance behind him confirms your suspicions - this is some kind of rat-person.  He seems oblivious to your presence as he stirs a cauldron of viscous fluid with one hand; a neat stack of beakers and phials sit in the dirt to his left.  You see a smile break across his aged visage, and he says, "<i>Come closer child.  I will not bite.</i>"\n\nApprehensive of the dangers of this unknown land, you cautiously approach.\n\n"<i>I am Rathazul the Alchemist.  Once I was famed for my miracle cures.  Now I idle by this lake, helpless to do anything but measure the increasing amounts of corruption that taint its waters,</i>" he says as he pulls back his hood, revealing the entirety of his very bald and wrinkled head.\n\n',
                true
            );
            this.player.createStatusAffect(StatusAffects.MetRathazul, 0, 0, 0, 0);
        }
        // Camp offer!
        if (
            this.player.statusAffectv2(StatusAffects.MetRathazul) >= 3 &&
            this.player.statusAffectv3(StatusAffects.MetRathazul) != 1 &&
            this.player.cor < 75
        ) {
            this.outx(
                '"<i>You know, I think I might be able to do this worn-out world a lot more good from your camp than by wandering around this lake.  What do you say?</i>" asks the rat.\n\n(Move Rathazul into your camp?)',
                false
            );
            this.doYesNo(this.rathazulMoveToCamp, this.rathazulMoveDecline);
            // Set rathazul flag that he has offered to move in (1 time offer)
            this.player.changeStatusValue(StatusAffects.MetRathazul, 3, 1);
            return;
        }
        const offered = this.rathazulWorkOffer();
        if (!offered) {
            this.outx(
                'He sighs dejectedly, "<i>I am not sure what I can do for you, youngling.  This world is fraught with unimaginable dangers, and you\'re just scratching the surface of them.</i>"\n\nYou nod and move on, leaving the depressed alchemist to his sadness.',
                false
            );
            this.doNext(this.camp.returnToCampUseOneHour);
        }
    }

    private rathazulMoveToCamp(): void {
        this.clearOutput();
        this.outx(
            'Rathazul smiles happily back at you and begins packing up his equipment.  He mutters over his shoulder, "<i>It will take me a while to get my equipment moved over, but you head on back and I\'ll see you within the hour.  Oh my, yes.</i>"\n\nHe has the look of someone experiencing hope for the first time in a long time.'
        );
        this.player.createStatusAffect(StatusAffects.CampRathazul, 0, 0, 0, 0);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private rathazulMoveDecline(): void {
        this.clearOutput();
        this.outx(
            'Rathazul wheezes out a sigh, and nods.\n\n"<i>Perhaps I\'ll still be of some use out here after all,</i>" he mutters as he packs up his camp and prepares to head to another spot along the lake.'
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    public campRathazul(): void {
        this.spriteSelect(49);
        if (
            this.flags[kFLAGS.MARBLE_PURIFICATION_STAGE] == 2 &&
            this.player.findStatusAffect(StatusAffects.MetRathazul) >= 0
        ) {
            this.marblePurification.visitRathazulToPurifyMarbleAfterLaBovaStopsWorkin();
            return;
        }
        if (
            this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] == 1 &&
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00275] > 0
        ) {
            this.collectRathazulArmor();
            return;
        }
        // Special rathazul/follower scenes scenes.
        if (Rathazul.rand(6) == 0 && this.flags[kFLAGS.RATHAZUL_CAMP_INTERACTION_COUNTDOWN] == 0) {
            this.flags[kFLAGS.RATHAZUL_CAMP_INTERACTION_COUNTDOWN] = 3;
            // Pure jojo
            if (
                this.flags[kFLAGS.JOJO_RATHAZUL_INTERACTION_COUNTER] == 0 &&
                this.player.findStatusAffect(StatusAffects.PureCampJojo) >= 0 &&
                this.flags[kFLAGS.JOJO_DEAD_OR_GONE] == 0
            ) {
                this.finter.jojoOffersRathazulMeditation();
                return;
            }
            if (
                this.flags[kFLAGS.AMILY_MET_RATHAZUL] == 0 &&
                this.flags[kFLAGS.AMILY_FOLLOWER] == 1 &&
                this.amilyScene.amilyFollower()
            ) {
                this.finter.AmilyIntroducesSelfToRathazul();
                return;
            }
            if (
                this.flags[kFLAGS.AMILY_MET_RATHAZUL] == 1 &&
                this.flags[kFLAGS.AMILY_FOLLOWER] == 1 &&
                this.amilyScene.amilyFollower()
            ) {
                this.finter.amilyIngredientDelivery();
                return;
            }
            if (
                this.flags[kFLAGS.AMILY_MET_RATHAZUL] == 2 &&
                this.flags[kFLAGS.AMILY_FOLLOWER] == 1 &&
                this.amilyScene.amilyFollower()
            ) {
                this.finter.amilyAsksAboutRathazulsVillage();
                return;
            }
        }
        // Rat is definitely not sexy!
        if (this.player.lust > 50) this.dynStats("lus", -1);
        if (this.player.lust > 65) this.dynStats("lus", -5);
        if (this.player.lust > 80) this.dynStats("lus", -5);
        if (this.player.lust > 90) this.dynStats("lus", -5);
        // Introduction
        this.outx(
            `Rathazul looks up from his equipment and gives you an uncertain smile.\n\n"<i>Oh, don't mind me,</i>" he says, "<i>I'm just running some tests here.  Was there something you needed, ${this.player.short}?</i>"\n\n`,
            true
        );
        // player.createStatusAffect(StatusAffects.metRathazul,0,0,0,0);
        const offered = this.rathazulWorkOffer();
        if (!offered) {
            this.outx(
                "He sighs dejectedly, \"<i>I don't think there is.  Why don't you leave me be for a time, and I will see if I can find something to aid you.</i>\"",
                false
            );
            if (this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0)
                this.doNext(this.camp.campFollowers);
            else this.doNext(this.playerMenu);
        }
    }

    private rathazulWorkOffer(): boolean {
        this.spriteSelect(49);
        let totalOffers = 0;
        let spoken = false;
        let showArmorMenu = false;
        let purify;
        let debimbo = 0;
        let reductos;
        let lethiciteDefense;
        let dyes;
        if (
            this.player.hasItem(this.consumables.BLACKEG) ||
            this.player.hasItem(this.consumables.L_BLKEG)
        ) {
            this.flags[kFLAGS.PC_KNOWS_ABOUT_BLACK_EGGS] = 1;
            spoken = true;
            this.outx(
                'He eyes the onyx egg in your inventory and offers a little advice.  "<i>Be careful with black eggs.  They can turn your skin to living latex or rubber.  The smaller ones are usually safer, but everyone reacts differently.  I\'d get rid of them, if you want my opinion.</i>"\n\n'
            );
        }
        // Item crafting offer
        if (this.player.hasItem(this.useables.GREENGL, 2)) {
            if (this.player.findStatusAffect(StatusAffects.RathazulArmor) < 0)
                this.outx(
                    "He pipes up with a bit of hope in his voice, \"<i>I can smell the essence of the tainted lake-slimes you've defeated, and if you'd let me, I could turn it into something a bit more useful to you.  You see, the slimes are filled with the tainted essence of the world-mother herself, and once the taint is burned away, the remaining substance remains very flexible but becomes nearly impossible to cut through.  With the gel of five defeated slimes I could craft you a durable suit of armor.</i>\"\n\n",
                    false
                );
            else
                this.outx(
                    'He pipes up with a bit of excitement in his voice, "<i>With just five pieces of slime-gel I could make another suit of armor...</i>"\n\n',
                    false
                );
            spoken = true;
            if (this.player.hasItem(this.useables.GREENGL, 5)) {
                showArmorMenu = true;
                totalOffers++;
            } else {
                this.outx("You realize you're still a bit short of gel.\n\n", false);
            }
        }
        // Item crafting offer
        if (this.player.hasItem(this.useables.B_CHITN)) {
            this.outx(
                'The elderly rat looks at you intently and offers, "<i>I see you\'ve gathered a piece of chitin from the giant bees of the forests.  If you bring me five pieces I could probably craft it into some tough armor.</i>"\n\n',
                false
            );
            spoken = true;
            if (this.player.hasItem(this.useables.B_CHITN, 5)) {
                showArmorMenu = true;
                totalOffers++;
            } else {
                this.outx(
                    "(You need five pieces of chitin for Rathazul to make you the chitinous armor.)\n\n",
                    false
                );
            }
        }
        let pCounter = 0;
        // Item purification offer
        if (this.player.hasItem(this.consumables.INCUBID)) {
            purify = this.purifySomething;
            totalOffers++;
            pCounter++;
        }
        if (this.player.hasItem(this.consumables.SUCMILK)) {
            purify = this.purifySomething;
            totalOffers++;
            pCounter++;
        }
        if (this.player.hasItem(this.consumables.SDELITE)) {
            purify = this.purifySomething;
            totalOffers++;
            pCounter++;
        }
        if (this.player.hasItem(this.consumables.LABOVA_)) {
            purify = this.purifySomething;
            totalOffers++;
            pCounter++;
        }
        // Single Offer
        if (pCounter == 1) {
            this.outx(
                'The rat mentions, "<i>I see you have at least one tainted item on you... for 20 gems I could remove most of the taint, making it a good deal safer to use.  Of course, who knows what kind of freakish transformations it would cause...</i>"\n\n',
                false
            );
            spoken = true;
            totalOffers++;
        }
        if (pCounter > 1) {
            this.outx(
                'The rat mentions, "<i>I see you have a number of demonic items on your person.  For 20 gems I could attempt to remove the taint from one of them, rendering it a good deal safer for consumption.  Of course it would not remove most of the transformative properties of the item...</i>"\n\n',
                false
            );
            spoken = true;
            totalOffers += 2;
        }
        // Offer dyes if offering something else.
        if (this.player.gems >= 50) {
            this.outx(
                'Rathazul offers, "<i>Since you have enough gems to cover the cost of materials for my dyes as well, you could buy one of my dyes for your hair.  I will need 50 gems up-front.</i>"\n\n',
                false
            );
            spoken = true;
            totalOffers++;
            dyes = this.buyDyes;
        }
        // Reducto
        if (
            this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0 &&
            this.player.statusAffectv2(StatusAffects.MetRathazul) >= 4
        ) {
            this.outx(
                "The rat hurries over to his supplies and produces a container of paste, looking rather proud of himself, \"<i>Good news everyone!  I've developed a paste you could use to shrink down any, ah, oversized body parts.  The materials are expensive though, so I'll need "
            );
            if (this.flags[kFLAGS.AMILY_MET_RATHAZUL] >= 2) this.outx("50");
            else this.outx("100");
            this.outx(' gems for each jar of ointment you want.</i>"\n\n');
            totalOffers++;
            spoken = true;
            reductos = this.buyReducto;
        }
        // SPOIDAH
        if (
            this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0 &&
            this.player.hasItem(this.useables.T_SSILK) &&
            this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] +
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00275] ==
                0
        ) {
            showArmorMenu = true;
            spoken = true;
            totalOffers++;
            this.outx(
                '"<i>Oooh, is that some webbing from a giant spider or spider-morph?  Most excellent!  With a little bit of alchemical treatment, it is possible I could loosen the fibers enough to weave them into something truly magnificent - armor, or even a marvelous robe,</i>" offers Rathazul.\n\n',
                false
            );
        }
        // Vines
        if (
            this.player.hasKeyItem("Marae's Lethicite") >= 0 &&
            this.player.keyItemv2("Marae's Lethicite") < 3 &&
            this.player.findStatusAffect(StatusAffects.DefenseCanopy) < 0 &&
            this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0
        ) {
            this.outx(
                "His eyes widen in something approaching shock when he sees the Lethicite crystal you took from Marae.  Rathazul stammers, \"<i>By the goddess... that's the largest piece of lethicite I've ever seen.  I don't know how you got it, but there is immense power in those crystals.  If you like, I know a way we could use its power to grow a canopy of thorny vines that would hide the camp and keep away imps.  Growing such a defense would use a third of that lethicite's power.</i>\"\n\n"
            );
            totalOffers++;
            spoken = true;
            lethiciteDefense = this.growLethiciteDefense;
        }
        if (this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0) {
            if (
                this.flags[kFLAGS.RATHAZUL_DEBIMBO_OFFERED] == 0 &&
                (this.sophieBimbo.bimboSophie() ||
                    this.player.findPerk(PerkLib.BimboBrains) >= 0 ||
                    this.player.findPerk(PerkLib.FutaFaculties) >= 0)
            ) {
                this.rathazulDebimboOffer();
                return true;
            } else if (this.flags[kFLAGS.RATHAZUL_DEBIMBO_OFFERED] > 0) {
                this.outx(
                    "You recall that Rathazul is willing to make something to cure bimbo liqueur for 250 gems and five Scholar's Teas."
                );
                if (this.player.hasItem(this.consumables.SMART_T, 5) && this.player.gems >= 250) {
                    totalOffers++;
                    debimbo = 1;
                } else if (!this.player.hasItem(this.consumables.SMART_T, 5))
                    this.outx("  You should probably find some if you want that...");
                else this.outx("  You need more gems to afford that, though.");
                this.outx("\n\n");
            }
        }
        if (totalOffers == 0 && spoken) {
            this.doNext(this.camp.returnToCampUseOneHour);
            return true;
        }
        if (totalOffers > 0) {
            this.outx("Will you take him up on an offer or leave?");
            // In camp has no time passage if left.
            this.menu();
            if (showArmorMenu) this.addButton(0, "Armor", this.rathazulArmorMenu);
            if (debimbo > 0) this.addButton(1, "Debimbo", this.makeADeBimboDraft);
            this.addButton(2, "Buy Dye", dyes);
            if (lethiciteDefense != undefined) this.addButton(3, "Lethicite", lethiciteDefense);
            this.addButton(4, "Purify", purify);
            if (reductos != undefined) this.addButton(8, "Reducto", reductos);
            if (this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0)
                this.addButton(9, "Leave", this.camp.campFollowers);
            else this.addButton(9, "Leave", this.camp.returnToCampUseOneHour);
            return true;
        }
        return false;
    }

    private purifySomething(): void {
        this.spriteSelect(49);
        this.clearOutput();
        this.outx('Rathazul asks, "<i>What would you like me to purify?</i>"');
        this.menu();
        // Item purification offer
        if (this.player.hasItem(this.consumables.INCUBID)) {
            this.addButton(0, "Incubi Draft", this.rathazulPurifyIncubiDraft);
        }
        if (this.player.hasItem(this.consumables.SUCMILK)) {
            this.addButton(1, "SuccubiMilk", this.rathazulPurifySuccubiMilk);
        }
        if (this.player.hasItem(this.consumables.SDELITE)) {
            this.addButton(2, "S. Delight", this.rathazulPurifySuccubiDelight);
        }
        if (this.player.hasItem(this.consumables.LABOVA_)) {
            this.addButton(3, "LaBova", this.rathazulPurifyLaBova);
        }
        this.addButton(4, "Back", this.rathazulWorkOffer);
    }

    private rathazulPurifyIncubiDraft(): void {
        this.clearOutput();
        if (this.player.gems < 20) {
            this.outx('Rathazul says, "<i>You do not have enough gems for that service.</i>"');
            this.doNext(this.returnToRathazulMenu);
            return;
        }
        if (!this.debug) this.player.destroyItems(this.consumables.INCUBID, 1);
        this.inventory.takeItem(this.consumables.P_DRAFT, this.returnToRathazulMenu);
        this.player.gems -= 20;
        this.statScreenRefresh();
        this.player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
    }

    private rathazulPurifySuccubiMilk(): void {
        this.clearOutput();
        if (this.player.gems < 20) {
            this.outx('Rathazul says, "<i>You do not have enough gems for that service.</i>"');
            this.doNext(this.returnToRathazulMenu);
            return;
        }
        if (!this.debug) this.player.destroyItems(this.consumables.SUCMILK, 1);
        this.inventory.takeItem(this.consumables.P_S_MLK, this.returnToRathazulMenu);
        this.player.gems -= 20;
        this.statScreenRefresh();
        this.player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
    }

    private rathazulPurifySuccubiDelight(): void {
        this.clearOutput();
        if (this.player.gems < 20) {
            this.outx('Rathazul says, "<i>You do not have enough gems for that service.</i>"');
            this.doNext(this.returnToRathazulMenu);
            return;
        }
        if (!this.debug) this.player.destroyItems(this.consumables.SDELITE, 1);
        this.inventory.takeItem(this.consumables.PSDELIT, this.returnToRathazulMenu);
        this.player.gems -= 20;
        this.statScreenRefresh();
        this.player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
    }

    private rathazulPurifyLaBova(): void {
        this.clearOutput();
        if (this.player.gems < 20) {
            this.outx('Rathazul says, "<i>You do not have enough gems for that service.</i>"');
            this.doNext(this.returnToRathazulMenu);
            return;
        }
        if (!this.debug) this.player.destroyItems(this.consumables.LABOVA_, 1);
        this.inventory.takeItem(this.consumables.P_LBOVA, this.returnToRathazulMenu);
        this.player.gems -= 20;
        this.statScreenRefresh();
        this.player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
    }

    private rathazulDebimboOffer(): void {
        this.spriteSelect(49);
        this.clearOutput();
        if (this.flags[kFLAGS.RATHAZUL_DEBIMBO_OFFERED] == 0) {
            if (this.sophieBimbo.bimboSophie()) {
                this.outx(
                    'Rathazul glances your way as you approach his lab, a thoughtful expression on his age-lined face.  "<i>Tell me, [name], do you truly enjoy having that vacuous idiot around, lusting after you at all hours of the day?</i>" he asks, shaking his head in frustration.  "<i>She\'s clearly been subjected to the effects of Bimbo Liqueur, which as you can plainly see are quite indeed potent.  However, like most things in Mareth, it can be countered - at least partially.</i>"  Rathazul folds his long, clawed fingers together, his tail lashing behind him as he thinks.  "<i>Perhaps with a sufficient quantity of something called Scholar\'s Tea... I could counter the stupefying effects of the elixir... oh my, yes... hmm...</i>"  Rathazul nods, stroking at the few long wisps of fur that hang from his chin.'
                );
                this.outx("\n\nYou await");
                if (this.silly()) this.outx(" getGoodPost()"); // C# await joke ;_; http://msdn.microsoft.com/en-gb/library/hh156528.aspx
                this.outx(
                    " further clarification, but the old rat just stands there, staring off into space.  Coughing politely, you reacquire his attention, causing him to jump."
                );
                this.outx(
                    '\n\n"<i>Oh?  Nmm, YES, bimbos, that\'s right!  As I was saying, five Scholar\'s Teas along with 250 gems for other reagents should give me all I need to create a bimbo-beating brew!  Oh my, the alliteration!  How absurd.</i>"  Rathazul chuckles slowly, wiping a drop from his eye before he looks back at you fiercely, "<i>It is a worthwhile goal - no creature should be subjected to a reduced intellect.  Let me know when you have acquired what is needed.</i>"'
                );
            } else {
                // Notification if the PC is the one bimbo'ed*
                this.outx(
                    '\n\nRathazul glances your way as you approach his lab, a thoughtful expression on his age-lined face.  "<i>Tell me [name], do you truly enjoy living your life under the debilitating effects of that cursed potion?  Even now the spark of intelligence has all but left from your eyes.  Do you even understand what I\'m saying?</i>"'
                );
                this.outx(
                    "\n\nYou twirl a lock of hair around your finger and giggle.  This silly old rat thinks you're like, dumb and stuff!  He just doesn't know how great it is to have a rocking body and a sex-drive that's always ready to suck and fuck.  It's so much fun!  You look back at the rat, realizing you haven't answered him yet, feeling a bit embarrassed as he sighs in disappointment."
                );
                this.outx(
                    '\n\n"<i>Child, please... bring me five Scholar\'s Teas and 250 gems for reagents, then I can fix you!  I can help you!  Just... get the tea!</i>" the alchemist pleads, counting off to five on his clawed fingers for extra emphasis while shaking his gem pouch profusely.  You bite your lower lip— he seems really really mad about this or something.  Maybe you should like, get the tea?'
                );
            }
            this.flags[kFLAGS.RATHAZUL_DEBIMBO_OFFERED]++;
        }
        // Rath menu
        this.menu();
        this.addButton(0, "Next", this.campRathazul);
    }

    // Creation Of The Draft: any
    private makeADeBimboDraft(): void {
        this.clearOutput();
        this.spriteSelect(49);
        this.outx(
            "Rathazul takes the teas and the gems into his wizened palms, shuffling the glittering jewels into a pouch and the teas into a large decanter.  He promptly sets the combined brews atop a flame and shuffles over to his workbench, where he picks up numerous pouches and vials of every color and description, adding them to the mix one after the other.  The mixture roils and bubbles atop the open flame like a monstrous, eerie thing, but quickly simmers down to a quiet boil.  Rathazul leaves it going for a while, stirring occasionally as he pulls out a smaller vial.  Once most of the excess liquid has evaporated, he pours the concoction into the glass container and corks it, holding it up to the light to check its coloration."
        );
        this.outx(
            '\n\n"<i>That <b>should</b> do,</i>" he mutters to himself.  Rathazul turns, carefully handing you the mixture.  "<i>This should counter the mental-inhibiting effects of the Bimbo Liqueur, but I have no idea to what extent those who imbibe it will retain of their time spent as a bimbo...</i>"\n\n'
        );
        // Take items
        this.player.gems -= 250;
        this.player.consumeItem(this.consumables.SMART_T, 5);
        this.statScreenRefresh();
        this.player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
        this.inventory.takeItem(this.consumables.DEBIMBO, this.returnToRathazulMenu);
    }

    public rathazulArmorMenu(): void {
        this.spriteSelect(49);
        this.clearOutput();
        const beeArmor = this.player.hasItem(this.useables.B_CHITN, 5)
            ? this.craftCarapace
            : undefined;
        const gelArmor = this.player.hasItem(this.useables.GREENGL, 5)
            ? this.craftOozeArmor
            : undefined;
        let silk;
        this.outx("Which armor project would you like to pursue with Rathazul?");
        if (
            this.player.findStatusAffect(StatusAffects.CampRathazul) >= 0 &&
            this.player.hasItem(this.useables.T_SSILK) &&
            this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] +
                this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00275] ==
                0
        ) {
            silk = this.craftSilkArmor;
        }
        this.simpleChoices(
            "BeeArmor",
            beeArmor,
            "GelArmor",
            gelArmor,
            "SpiderSilk",
            silk,
            "",
            undefined,
            "Back",
            this.returnToRathazulMenu
        );
    }

    private craftSilkArmor(): void {
        this.spriteSelect(49);
        this.outx("", true);
        this.outx(
            'You hand the bundled webbing to Rathazul carefully, lest you damage the elderly mouse.  He gives you a bemused smile and snatches the stuff from your grasp while he mutters, "<i>I\'m not falling apart you know.</i>"\n\n',
            false
        );
        // (Not enough webs:
        if (!this.player.hasItem(this.useables.T_SSILK, 5)) {
            this.outx(
                "The rat shakes his head and hands it back to you.  \"<i>This isn't enough for me to make anything with.  I'll need at least five bundles of this stuff total, so you'll need to find more,</i>\" he explains.\n\n",
                false
            );
            // (optional spider bonus:
            if (this.player.tailType == TAIL_TYPE_SPIDER_ADBOMEN) {
                this.outx(
                    'You show him your spider-like abdomen in response, offering to produce more webbing for him.  Rathazul chuckles dryly, a sound that reminds you of hot wind rushing through a dead valley.  "<i>Dear child, this would never do.  Silk this tough can only be produced by a true-born spider.  No matter how you change yourself, you\'ll always be a human at heart.</i>"\n\n',
                    false
                );
                this.outx(
                    'The old rat shakes his head and adds, "<i>Well, now that I think about it, the venom of a red widow might be able to transform you until you are a spider to the core, but I have absolutely no idea what that would do to you.  If you ever try such a dangerous, reckless idea, let me know.  I want to have my notebooks handy, for SCIENCE!</i>"\n\n',
                    false
                );
            }
            this.doNext(this.returnToRathazulMenu);
            return;
        }
        this.outx(
            'The rat limps over to his equipment, spider-silk in hand.  With efficient, practiced motions, he runs a few tests.  As he finishes, he sighs and explains, "<i>This will be harder than I thought.  The webbing is highly resistant to most of my alchemic reagents.  To even begin to work with such material I will need a number of rare, expensive elements.  I would need 500 gems to even start such a project.</i>"\n\n',
            false
        );
        this.outx(
            "You can't help but sigh when he names such a sizable figure.  Do you give him the 500 gems and spider-silk in order for him to create you a garment?",
            false
        );
        if (this.player.gems < 500) {
            this.outx("  <b>Wait... you don't even have 500 gems.  Damn.</b>");
            this.doNext(this.returnToRathazulMenu);
            return;
        }
        // [Yes] [No]
        this.doYesNo(this.commissionSilkArmorForReal, this.declineSilkArmorCommish);
    }
    private commissionSilkArmorForReal(): void {
        this.spriteSelect(49);
        this.outx("", true);
        this.outx(
            'You sort 500 gems into a pouch and toss them to Rathazul, along with the rest of the webbing.  The wizened alchemist snaps the items out of the air with lightning-fast movements and goes to work immediately.  He bustles about with enormous energy, invigorated by the challenging task before him.  It seems Rathazul has completely forgotten about you, but as you turn to leave, he calls out, "<i>What did you want me to make?  A mage\'s robe or some nigh-impenetrable armor?</i>"\n\n',
            false
        );
        this.player.gems -= 500;
        this.statScreenRefresh();
        this.player.destroyItems(this.useables.T_SSILK, 5);
        this.menu();
        this.addButton(0, "Armor", this.chooseArmorOrRobes, 1);
        this.addButton(1, "Robes", this.chooseArmorOrRobes, 2);
    }

    private declineSilkArmorCommish(): void {
        this.spriteSelect(49);
        this.outx("", true);
        this.outx(
            "You take the silk back from Rathazul and let him know that you can't spend 500 gems on a project like that right now.  He sighs, giving you a crestfallen look and a slight nod of his hooded muzzle.",
            false
        );
        this.doNext(this.returnToRathazulMenu);
    }

    public chooseArmorOrRobes(robeType: number): void {
        this.spriteSelect(49);
        this.outx(
            "Rathazul grunts in response and goes back to work.  You turn back to the center of your camp, wondering if the old rodent will actually deliver the wondrous item that he's promised you.",
            true
        );
        this.doNext(this.camp.returnToCampUseOneHour);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00275] = robeType;
        this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] = 24;
        trace(`274: ${this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN]}`);
    }
    private collectRathazulArmor(): void {
        this.spriteSelect(49);
        this.outx("", true);
        this.outx('Rathazul beams and ejaculates, "<i>Good news everyone!  Your ', false);
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00275] == 1) this.outx("armor");
        else this.outx("robe");
        this.outx(' is finished!</i>"\n\n', false);
        // Robe
        let itype: ItemType;
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00275] == 2) {
            this.outx(
                "Hanging from a small rack is a long, flowing robe.  It glitters brightly in the light, the pearl-white threads seeming to shimmer and shine with every ripple the breeze blows through the soft fabric.  You run your fingers over the silken garment, feeling the soft material give at your touch.  There's a hood with a golden border embroidered around the edge.  For now, it hangs limply down the back, but it would be easy to pull up in order to shield the wearer's eyes from harsh sunlight or rainy drizzle.  The sleeves match the cowl, circled with intricate threads laid out in arcane patterns.\n\n",
                false
            );

            this.outx(
                "Rathazul gingerly takes down the garment and hands it to you.  \"<i>Don't let the softness of the material fool you.  This robe is tougher than many armors, and the spider-silk's properties may even help you in your spell-casting as well.</i>\"\n\n",
                false
            );
            itype = this.armors.SS_ROBE;
        }
        // (Armor)
        else {
            this.outx(
                "A glittering white suit of armor sits atop a crude armor rack, reflecting the light that plays across its surface beautifully.  You definitely didn't expect anything like this!  It looks nearly identical to a set of light platemail, though instead of having a cold metal surface, the armor feels slightly spongy, with just a little bit of give in it.\n\n",
                false
            );

            this.outx(
                'While you marvel at the strange equipment, Rathazul explains, "<i>When you said you wanted armor, I realized I could skip a few of the alchemical processes used to soften material.  The savings let me acquire a cheap metal set of armor to use as a base, and I molded half the armor around each piece, then removed it and created the outer, defensive layers with the rest of the webbing.  Unfortunately, I didn\'t have enough silk for a solid codpiece, but I did manage to make a you thin loincloth from the leftover scraps  - for modesty.</i>"\n\n',
                false
            );
            itype = this.armors.SSARMOR;
        }
        // Reset counters
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00275] = 0;
        this.flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] = 0;
        this.inventory.takeItem(itype, this.returnToRathazulMenu);
    }

    private craftOozeArmor(): void {
        this.spriteSelect(49);
        this.player.destroyItems(this.useables.GREENGL, 5);
        this.outx(
            "Rathazul takes the green gel from you and drops it into an empty cauldron.  With speed well beyond what you'd expect from such an elderly creature, he nimbly unstops a number of vials and pours them into the cauldron.  He lets the mixture come to a boil, readying a simple humanoid-shaped mold from what you had thought was piles of junk material.  In no time at all, he has cast the boiling liquid into the mold, and after a few more minutes he cracks it open, revealing a suit of glistening armor.\n\n",
            true
        );
        this.player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
        this.inventory.takeItem(this.armors.GELARMR, this.returnToRathazulMenu);
        if (this.player.findStatusAffect(StatusAffects.RathazulArmor) < 0)
            this.player.createStatusAffect(StatusAffects.RathazulArmor, 0, 0, 0, 0);
    }

    private buyDyes(): void {
        this.spriteSelect(49);
        this.clearOutput();
        this.outx(
            "Rathazul smiles and pulls forth several vials of colored fluids.  Which type of dye would you like?"
        );
        this.outx("\n\n<b>(-50 Gems)</b>");
        this.player.gems -= 50;
        this.statScreenRefresh();
        this.menu();
        this.addButton(0, "Auburn", this.buyDye, this.consumables.AUBURND);
        this.addButton(1, "Black", this.buyDye, this.consumables.BLACK_D);
        this.addButton(2, "Blond", this.buyDye, this.consumables.BLOND_D);
        this.addButton(3, "Brown", this.buyDye, this.consumables.BROWN_D);
        this.addButton(4, "Red", this.buyDye, this.consumables.RED_DYE);
        this.addButton(5, "White", this.buyDye, this.consumables.WHITEDY);
        this.addButton(6, "Gray", this.buyDye, this.consumables.GRAYDYE);
        this.addButton(9, "Nevermind", this.buyDyeNevermind);
    }

    private buyDye(dye: ItemType): void {
        this.spriteSelect(49);
        this.clearOutput();
        this.inventory.takeItem(dye, this.returnToRathazulMenu);
        this.statScreenRefresh();
        this.player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
    }

    private buyDyeNevermind(): void {
        this.spriteSelect(49);
        this.clearOutput();
        this.outx(
            "You change your mind about the dye, and Rathazul returns your gems.\n\n(<b>+50 Gems</b>)"
        );
        this.player.gems += 50;
        this.statScreenRefresh();
        this.doNext(this.returnToRathazulMenu);
    }

    private buyReducto(): void {
        this.spriteSelect(49);
        this.clearOutput();
        const cost: number = this.flags[kFLAGS.AMILY_MET_RATHAZUL] >= 2 ? 50 : 100;
        if (this.player.gems >= cost) {
            this.outx(
                "Rathazul hands you the Reducto with a nod before returning to his work.\n\n"
            );
            this.player.gems -= cost;
            this.inventory.takeItem(this.consumables.REDUCTO, this.returnToRathazulMenu);
            this.statScreenRefresh();
            this.player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
        } else {
            this.outx(
                '"<i>I\'m sorry, but you lack the gems I need to make the trade,</i>" apologizes Rathazul.'
            );
            this.doNext(this.returnToRathazulMenu);
        }
    }

    private growLethiciteDefense(): void {
        this.spriteSelect(49);
        this.clearOutput();
        this.outx(
            'Rathazul asks, "<i>Are you absolutely sure?  Growing this thorn canopy as a defense will use one third of the crystal\'s power.</i>"\n\n(Do you have Rathazul use the crystal to grow a defensive canopy?)'
        );
        this.doYesNo(this.growLethiciteDefenseYesYesYes, this.growLethiciteDefenseGuessNot);
    }

    private growLethiciteDefenseYesYesYes(): void {
        this.spriteSelect(49);
        this.clearOutput();
        this.outx(
            'Rathazul nods and produces a mallet and chisel from his robes.  With surprisingly steady hands for one so old, he holds the chisel against the crystal and taps it, easily cracking off a large shard.  Rathazul gathers it into his hands before slamming it down into the dirt, until only the smallest tip of the crystal is visible.  He produces vials of various substances from his robe, as if by magic, and begins pouring them over the crystal.  In a few seconds, he finishes, and runs back towards his equipment.\n\n"<i>You may want to take a step back,</i>" he warns, but before you have a chance to do anything, a thick trunk covered in thorny vines erupts from the ground.  Thousands of vine-like branches split off the main trunk as it reaches thirty feet in the air, radiating away from the trunk and intertwining with their neighbors as they curve back towards the ground.  In the span of a few minutes, your camp gained a thorn tree and a thick mesh of barbed vines preventing access from above.'
        );
        this.player.createStatusAffect(StatusAffects.DefenseCanopy, 0, 0, 0, 0);
        this.player.addStatusValue(StatusAffects.MaraesLethicite, 2, 1);
        this.doNext(this.playerMenu);
    }

    private growLethiciteDefenseGuessNot(): void {
        this.spriteSelect(49);
        this.clearOutput();
        this.outx(
            'Rathazul nods sagely, "<i>That may be wise.  Perhaps there will be another use for this power.'
        );
        this.doNext(this.returnToRathazulMenu);
    }

    public craftCarapace(): void {
        this.spriteSelect(49);
        this.outx(
            'The rat takes the scales and works on his bench for an hour while you wait.  Once he has finished, Ratzhul is beaming with pride, "<i>I think you\'ll be pleased. Go ahead and take a look.</i>"\n\nHe hands you the armor.  ',
            true
        );
        this.outx(
            "The plates shine and shimmer like black steel.  He has used the yellow chitin to add accents and embroidery to the plates with a level of detail and craftsmanship rarely seen back home. A yellow fur neck lining has been fashioned from hairs found on the pieces.  The armor includes a breastplate, shoulder guards, full arm guards, and knee high boots.  You notice there are no pants.  As you turn to ask him where the pants are, you see him scratching his head and hastily rustling in drawers.  He mutters under his breath, \"<i>I'm sorry, I'm sorry, I got so focused on working on the pauldrons that I forgot to make any leg coverings!  Here, this should look good with it, and it won't restrict your movements.</i>\"  He hands you a silken loincloth",
            false
        );
        if (this.player.gender >= 2) this.outx(" with stockings and garters");
        this.outx(
            '.  He still manages to look somewhat pleased with himself in spite of the blunder, even bragging a little bit, "<i>Let me show you the different lengths of string I used.</i>"\n\n',
            false
        );
        if (this.player.cockTotal() > 0 && this.player.biggestCockArea() >= 40)
            this.outx(
                "The silken material does little to hide the bulge of your groin, if anything it looks a little lewd.  Rathazul mumbles and looks away, shaking his head.\n\n",
                false
            );
        if (this.player.biggestTitSize() >= 8)
            this.outx(
                `Your ${this.biggestBreastSizeDescript()} barely fit into the breastplate, leaving you displaying a large amount of jiggling cleavage.\n\n`,
                false
            );
        this.player.destroyItems(this.useables.B_CHITN, 5);
        this.player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
        this.inventory.takeItem(this.armors.BEEARMR, this.returnToRathazulMenu);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
}
