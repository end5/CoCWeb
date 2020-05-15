import { Appearance } from "../../Appearance";
import { BreastStore } from "../../BreastStore";
import { CockTypesEnum } from "../../CockTypesEnum";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { ItemType } from "../../ItemType";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";
import { NPCAwareContent } from "./NPCAwareContent";

export class LatexGirl extends NPCAwareContent {
    // const GOO_TFED_MEAN: number = 654;
    // const GOO_TFED_NICE: number = 655;
    // const GOO_NAME: number = 656;
    // const GOO_SLAVE_RECRUITED: number = 657;
    // const GOO_EYES: number = 658;
    // const GOO_TOSSED_AFTER_NAMING: number = 659;
    // const TIMES_FUCKED_NORMAL_GOOS: number = 660;
    // const PC_KNOWS_ABOUT_BLACK_EGGS: number = 661;
    // const GOO_HAPPINESS: number = 662;
    // const GOO_OBEDIENCE: number = 663;
    // const GOO_FLUID_AMOUNT: number = 664;
    // const GOO_PREFERRED_TIT_SIZE: number = 665;
    // const GOO_NIPPLE_TYPE: number = 666;
    // const GOO_DICK_LENGTH: number = 667;
    // const GOO_DICK_TYPE: number = 668;
    // const TIMES_THOUGHT_ABOUT_GOO_RECRUITMENT: number = 669;
    // const GOO_INDIRECT_FED: number = 670;
    // const TIMES_FED_LATEXY_MINO_CUM: number = 671;
    // const LATEX_GOO_TIMES_FEMDOMMED_BY_PC: number = 672;

    /* &Corrupt Plot:
    Have sex with goos at least 5-6 times.
    PC must have used a black egg at least once.
    Defeat goo by lust.
    Give it a black egg vaginally? and a succubi milk orally.
    Latex 'skin' interferes with the usual goo methods of communication, and the succubi milk makes it more human-like.  The transformation makes it go unconscious and suitably intelligent or strong PCs can carry it back to camp.
    When it wakes, explain that wanted a pet with all the advantages of goo and latex, and that she is that pet.
    She fights you and runs away if she wins.
    If she loses, she meekly accepts. (Happiness 0)

    Stats:

    Happiness - how happy she is in her confinement.
    Obedience - decreases by 1 each day when happiness is below 75.  Increases if Happiness over 90.
    Fluid % - 0 - 200%, decreases by 1 per day.  Minimum 1.
    Preferred breast size - same scale as PC.  Cannot be higher than fluid level.  Use a scale ala Amily.
    nipple type - -1 = cunt, 0 = normal, 1 = dicks
    Dick length = 0 for none
    Dick type = unlocked by giving proper transformative {default: dog}, {horse/cat/tentacle/demon}
    Eye Color - determined by type of goo you recruit.
    Misc Notes:


    Runs away if unhappy.  Small chance of finding her and dragging her back once she escapes. (reset happiness/obedience to 0)
    If happiness is below 50, she will ignore your preferred breast size and simply keep them at the maximum.  She will also set dick to 0 and nipple type to 0 randomly.
    Obedience must be above 30 to set preferred breast size.
    Obedience must be above 50 to set a dick length and type.
    Obedience must be above 70 to set nipple type.
    Happiness decreases whenever fluid level is less than 25 by 1 per day.
    Happiness increases whenever fluid level is above 75 by 1 per day
    Obedience decreases by 1 a week no matter what.
    Sex before obedience is high enough greatly reduces happiness {varies per scene}.
    Sex that gives fluids raises happiness.
    Making her drink lust drafts raises obedience, reduces happiness if not followed by sex.
    Making her consume anything else increases obedience at expense of happiness.
    */

    /*
    flags[kFLAGS.GOO_TFED_MEAN]
    flags[kFLAGS.GOO_TFED_NICE]
    flags[kFLAGS.GOO_NAME]
    flags[kFLAGS.GOO_SLAVE_RECRUITED]
    flags[kFLAGS.GOO_EYES]
    flags[kFLAGS.GOO_TOSSED_AFTER_NAMING] = 1;
    */
    public gooFluid(arg = 0, output = true): number {
        if (arg != 0) {
            this.flags[kFLAGS.GOO_FLUID_AMOUNT] += arg;
            if (output) this.outx(`\n<b>Fluid change: ${Math.round(arg * 10) / 10}%</b>`);
            if (this.flags[kFLAGS.GOO_FLUID_AMOUNT] < 1) this.flags[kFLAGS.GOO_FLUID_AMOUNT] = 1;
            if (this.flags[kFLAGS.GOO_FLUID_AMOUNT] > 100)
                this.flags[kFLAGS.GOO_FLUID_AMOUNT] = 100;
        }
        return this.flags[kFLAGS.GOO_FLUID_AMOUNT];
    }
    public gooHappiness(arg = 0, output = true): number {
        if (arg != 0) {
            this.flags[kFLAGS.GOO_HAPPINESS] += arg;
            if (output) this.outx(`\n<b>Happiness change: ${Math.round(arg * 10) / 10}%</b>`);
            if (this.flags[kFLAGS.GOO_HAPPINESS] < 1) this.flags[kFLAGS.GOO_HAPPINESS] = 1;
            if (this.flags[kFLAGS.GOO_HAPPINESS] > 100) this.flags[kFLAGS.GOO_HAPPINESS] = 100;
        }
        return this.flags[kFLAGS.GOO_HAPPINESS];
    }
    public gooObedience(arg = 0, output = true): number {
        if (arg != 0) {
            this.flags[kFLAGS.GOO_OBEDIENCE] += arg;
            if (output) this.outx(`\n<b>Obedience change: ${Math.round(arg * 10) / 10}%</b>`);
            if (this.flags[kFLAGS.GOO_OBEDIENCE] < 1) this.flags[kFLAGS.GOO_OBEDIENCE] = 1;
            if (this.flags[kFLAGS.GOO_OBEDIENCE] > 100) this.flags[kFLAGS.GOO_OBEDIENCE] = 100;
        }
        return this.flags[kFLAGS.GOO_OBEDIENCE];
    }
    private gooTits(): string {
        return BreastStore.breastDescript(this.gooTitSize());
    }

    private gooCock(): string {
        return Appearance.cockDescription(
            this.gooGetCockType(),
            this.flags[kFLAGS.GOO_DICK_LENGTH],
            this.flags[kFLAGS.GOO_DICK_LENGTH] / 6,
            50,
            100
        );
    }
    public gooGetCockType(): CockTypesEnum {
        return this.flags[kFLAGS.GOO_DICK_TYPE];
    }

    public latexGooFollower(): boolean {
        return this.flags[kFLAGS.GOO_SLAVE_RECRUITED] > 0;
    }

    private gooTitSize(): number {
        // If tits are lowered
        if (
            this.flags[kFLAGS.GOO_FLUID_AMOUNT] / 2 >= this.flags[kFLAGS.GOO_PREFERRED_TIT_SIZE] &&
            this.flags[kFLAGS.GOO_PREFERRED_TIT_SIZE] > 0
        )
            return this.flags[kFLAGS.GOO_PREFERRED_TIT_SIZE];
        else return this.flags[kFLAGS.GOO_FLUID_AMOUNT] / 2;
    }

    // TF Scene:
    public meanGooGirlRecruitment(): void {
        this.getGame().inCombat = false;
        this.clearOutput();
        this.flags[kFLAGS.GOO_TFED_MEAN] = 1;
        this.flags[kFLAGS.GOO_EYES] = this.monster.skinTone;
        if (this.player.hasItem(this.consumables.SUCMILK))
            this.player.consumeItem(this.consumables.SUCMILK);
        else this.player.consumeItem(this.consumables.P_S_MLK);
        if (this.player.hasItem(this.consumables.BLACKEG))
            this.player.consumeItem(this.consumables.BLACKEG);
        else this.player.consumeItem(this.consumables.L_BLKEG);
        this.outx(
            "You approach the horny gel-girl, admiring the marvelous, refractive hue of her soluble body for the last time.  Pulling the black egg from your pouches, you "
        );
        if (this.player.spe > 60)
            this.outx(
                "idly spin it on your finger, tossing it into the air and catching it on the next as you advance"
            );
        else this.outx("firmly grasp it in your hand as you approach");
        this.outx(
            ".  Uncomprehending, the goo girl looks up at you in confusion, eventually giving you a hopeful smile - the poor thing thinks you're going to fuck her!  You pat her on the head and instruct her to bend over.  She does of course, raising a delightfully feminine rump up out of her gooey base to present to you.  You can even see a pair of feminine lips, crafted perfectly in the form of a passion-inflamed female's."
        );
        this.outx(
            "\n\nWell, now's the time.  You take the egg and start to push it into her pussy, figuring it doesn't matter which hole she takes it in with her twisted anatomy.  The goo-girl quivers happily, her hole heating around your hand as you push the egg into the core.  Squirming pleasantly around you, her walls seem determined to milk phantom seed from your arm."
        );
        this.outx(
            "\n\nAbruptly, her motions stop, and you retract your arm before she can react, fearing she might try to imprison it in that gooey channel.  As you withdraw, her lips begin to darken, gradually turning opaque.  With a slosh of dismay, the goo-girl rises, spinning to face you.  Her lower lip is already a shining onyx, pouting and afraid.  Her arms rise angrily, covered in slowly growing black spots.  You were prepared for this and easily slip inside her guard, popping open the bottle of succubi milk you brought with you as you raise it to her lips.  The creamy fluid fills her mouth and the unholy flavor quickly sets her to swallowing.  Pulling the bottle out of your hands, she chugs the rest without thinking, not even noticing that her fingertips have solidified, becoming smooth solid things with clearly defined nails.  Her breasts enlarge as she finishes the draught, pulling her facedown on the ground."
        );
        this.outx(
            `\n\nShe wiggles but fails to rise, too encumbered by solidifying tits to move.  Her arms have congealed into smooth onyx up to the elbows by now, and her asscheeks are equally dark spheres of reflective material, just begging to be touched.  Below that, her pool is shrinking, pulling inward even as it becomes more opaque.  It divides in two, gradually twisting around itself until two shapely calves are visible, capped with a dainty pair of feet.  These solidify almost instantly - the transformation is accelerating!  Permeable membrane swiftly gives way to reflective, glossy latex all over her shuddering form, crafting the goo-girl into a visage of a bondage-slut's wet dream.  With her whole body changed from liquid to solid, the once-goo collapses into unconsciousness, black eyelids closing over her solid ${this.monster.skinTone} eyes.`
        );
        if (this.player.cor < 33)
            this.outx(
                "\n\nWorried that you might have killed her, you dart forward to check her breathing.  Whew!  She's okay, just out like a lamp."
            );
        else if (this.player.cor < 66)
            this.outx(
                "\n\nConfused as to why she lost consciousness, you go up to make sure she didn't die.  Thankfully, she's just out."
            );
        else
            this.outx(
                "\n\nIrritated that the items you fed her seem to be reacting in an unusual way, you stalk forward to make sure she didn't die.  Having this backfire would be a tremendous waste of two potent items!  Whew!  She's alive."
            );
        this.outx(
            "\n\nNow, you've got yourself a latex goo-girl... or a latex-girl... whatever.  How to get her home?"
        );
        // {Intelligent:}
        if (this.player.inte >= 60) {
            this.outx(
                "\n\nYou quickly find a few pieces of wood and some strong reeds to use as rope.  It takes no more than 15 minutes to assemble the gathered components into a crude travois - one you'll have to carry.  Lifting the giant-breasted pile of sexy latex onto your construction proves to be quite the task, but you manage, barely.  Dragging her back to camp is no easier, but thanks to your quick wit, you save yourself a ton of effort."
            );
            // {fatigue + 20}
            this.fatigue(20);
        }
        // {Strong:}
        else if (this.player.str >= 60) {
            this.outx(
                "\n\nYou heave her up over your shoulder, straining your capable muscles to hold up those giant mammaries and remain upright.  The task is arduous, but you're strong enough for anything!  "
            );
            if (this.player.tou < 40) {
                this.outx(
                    "Halfway there, you get too tired to continue.  You may be strong, but you don't have the endurance to heft a burden like this long term.  You'll have to leave her for now and try to recapture her once she's conscious."
                );
                this.doNext(this.camp.returnToCampUseOneHour);
                this.fatigue(30);
                return;
            }
            this.outx(
                "You're out of breath when you get to camp, but you made it!  It'll take awhile for you to catch your wind after all that work...  Your arms and legs are still burning from the exertion!"
            );

            this.fatigue(10);
        }
        // Too weak and dumb:
        else {
            this.outx(
                "\n\nYou try to lift her, but she's too heavy!  Drat!  There's no way you'll get her back to camp like this, and you can't leave the portal undefended long enough to wait for her to wake.  You'll have to leave her for now and try to recapture her once she's awake."
            );
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // [Next] (Go to aftermath)
        this.menu();
        this.addButton(0, "Next", this.PCCarriedGooBackHome);
    }

    // Goo -> Latex Aftermath:
    // PC Carried Her Back:
    private PCCarriedGooBackHome(): void {
        this.clearOutput();
        this.outx("You set the once-goo down in a secluded section of your camp");
        if (this.camp.companionsCount() > 0) this.outx(", away from prying eyes");
        this.outx(
            ".  She looks almost alien in a way... more than she did before, when she was just an aqueous blob with tits and faux hair.  Now, every facet of her being is shiny, reflective latex.  Even her vaginal secretions, which dribble freely, are liquid latex, glossy black juices that slowly harden into a flexible solid once freed from her body."
        );
        if (this.player.totalCocks() > 1)
            this.outx(
                `  You can't help but wonder what it would feel like to let her sheath your ${this.multiCockDescriptLight()} with her juices.`
            );
        this.outx(
            "\n\nSurprisingly, she has hair, or what passes for hair for a woman made entirely of supple, inorganic semi-solids.  Her tresses hang down past her shoulders, slender strands that are as reflective as her skin.  Unlike her skin, the latex-goo's hair seems perpetually oily, slippery and lubricated.  Hesitantly, you extend a hand to touch, carefully caressing a few of the rubbery strands.  Their texture is smooth and slick, unlike any hair you've ever had the pleasure of touching."
        );
        this.outx('\n\n"<i>I can feel that, you know.</i>"');
        this.outx(
            '\n\nYou backpedal wildly, surprised at the sudden statement to such a degree that you nearly fall flat on your [butt].  Giggling laughter bubbles up in response, "<i>Sorry, I didn\'t mean to scare you.</i>"'
        );
        this.outx(
            "\n\nYou step forward, looking back down at your conscious prize.  She asks, \"<i>W-what happened to me?  I was... I was... was going to make you feel good... then...  You did this to me!</i>\"  She recoils, pressing her back against the rock, her form losing rigidity as her panic peaks.  The latex woman's back oozes over the boulder she presses against, her body slowly dissolving.  You reach out to stop her, but with a painful sounding snap, every semi-solid pseudopod recoils into place, dumping her forward onto her gigantic breasts.  It seems she's lost a good deal of her soluble flexibility."
        );
        this.outx(
            `\n\nLooking up at you, her panicked ${
                this.flags[kFLAGS.GOO_EYES]
            } eyes seem as wide as dinner plates.  "<i>Why did you do this to me?</i>"`
        );
        this.outx(
            "\n\nSmiling, you explain that the goo-girls of the lake have always intrigued you, and that it seemed like that was the best one to make one a little more... restrainable.  She moans in misery, hugging her hands across her expansive chest and shuddering, an action made all the more marvelous by the way her twisted body jiggles and shines in the light.  Holding your hands out peacefully, you explain "
        );
        if (this.player.cor < 33)
            this.outx(
                "that you'll be a nice [master].  She'll never be in want for the fluids she needs, and so long as she obeys you, you'll see to her other needs."
            );
        else if (this.player.cor < 66)
            this.outx(
                "that you'll be a good [master] for her.  You'll keep her healthy and satisfied, so long as she's obedient."
            );
        else
            this.outx(
                "that so long as she obeys you, she has nothing to fear.  She had better obey."
            );
        this.outx(
            "  Abruptly, you ask her what you should call her besides 'girl' or 'slave'.  Even pets need names, after all."
        );

        this.outx(
            '\n\n"<i>Name?  My name is the warmth of my soul and the scent of the forgotten sea... or it was, before you made me like... this.  I don\'t think I could even communicate with my people properly at this point.  To your ears, I have no name, and honestly... my old name may as well be a forgotten memory.</i>"  A solitary onyx teardrop runs from the corner of her eye, hardening on her cheek.  She brushes it away with a sniffle.'
        );
        this.menu();
        this.addButton(0, "Next", this.PCCarriedGooBackHomeII);
    }
    private PCCarriedGooBackHomeII(): void {
        this.clearOutput();
        this.outx('"<i>Call me what you want, my name doesn\'t matter.</i>"');
        this.outx("\n\nWhat will you name her?");
        const input = document.createElement("input");
        this.menu();
        this.addButton(0, "Next", () => this.nameZeLatexGoo(input));
        this.mainView.mainText.appendChild(input);
    }
    private nameZeLatexGoo(input: HTMLInputElement): void {
        // if (kGAMECLASS.testingBlockExiting) {
        // We're running under the testing script.
        // Stuff a name in the box and go go go
        // this.mainView.nameBox.text = "Derptexy";
        // }
        // else if (this.mainView.nameBox.text == "") {
        if (input.value == "") {
            this.clearOutput();
            this.outx("<b>You must select a name.</b>");
            this.menu();
            this.addButton(0, "Next", this.nameZeLatexGoo);
            this.mainView.mainText.appendChild(input);
            return;
        }
        this.flags[kFLAGS.GOO_NAME] = input.value;
        // After Naming Her:
        this.clearOutput();
        this.outx('"<i>');
        if (this.flags[kFLAGS.GOO_NAME] == "Cattleya")
            this.outx(
                "Cattleya, huh?  I don't know if my tits are big enough to live up to that name,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Helia")
            this.outx("Helia, huh?  I don't know if I like anal enough for that!");
        else if (this.flags[kFLAGS.GOO_NAME] == "Urta")
            this.outx("Urta, huh?  What do you take me for, a furry?  I guess it will have to do,");
        else if (this.flags[kFLAGS.GOO_NAME] == "Tifa")
            this.outx("Tifa, huh?  I like the sound of that one!");
        else if (this.flags[kFLAGS.GOO_NAME] == "Aeris")
            this.outx("Aeris, huh?  That sounds like a name for a hoity-toity pain in the ass!");
        else if (this.flags[kFLAGS.GOO_NAME] == "Latexy")
            this.outx("Latexy, huh? That's, uh... real original...");
        else if (this.flags[kFLAGS.GOO_NAME] == "Goo")
            this.outx(
                "Goo, huh?  Wow, not too bright, are you?  Still, I guess I can live with it.  Call me Goo, I guess,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Blacky")
            this.outx(
                "Blacky, huh?  Do I look like a horse or something?  I guess it will have to do,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Fetish")
            this.outx("Fetish, huh?  You're pretty transparent about your motives, aren't you?");
        else if (this.flags[kFLAGS.GOO_NAME] == "Fenoxo")
            this.outx(
                "Fenoxo?</i>\"  Her hair slowly morphs into a fedora.  \"<i>I'm not sure this is quite my look, but it's a lovely name,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Maria")
            this.outx(
                "Maria?  Fuck, this isn't Cursed!  You don't expect me to turn you into a woman, do you?"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Valeria")
            this.outx("Valeria? Wait, I've heard that name before...");
        else if (this.flags[kFLAGS.GOO_NAME] == "Christmas")
            this.outx(
                "Christmas, huh?  How very festive.  The big difference is that I can come more than once a year."
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Symphonie")
            this.outx(
                "Symphonie, eh?  That seems very... fitting.  Snug and comfortable, somehow,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Savin")
            this.outx(
                "Savin, huh? Why would you want to name me after the second worst person since Stalin?"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Galatea")
            this.outx("Galatea?  By Oblimo, that's a beautiful name!");
        else if (this.flags[kFLAGS.GOO_NAME] == "Kara")
            this.outx(
                "Kara, huh? Like, that sounds like a name for a girl with big gropable boobs in a French maid outfit!  I, like, totally love it!"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Karazelle")
            this.outx(
                "Karazelle, huh? Like, that sounds like a name for a girl with big gropable boobs in a French maid outfit!  I, like, totally love it!"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Jacques")
            this.outx(
                "Jacques?  That's kind of a boy's name isn't it?  ...Did my boobs just get bigger?"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Whitney")
            this.outx(
                "Whitney?  The farm-girl?  Well, I suppose I can fill in for that frigid cunt."
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Hedrah")
            this.outx("Hedrah?  A nice strong name.  I approve,");
        else if (this.flags[kFLAGS.GOO_NAME] == "Third")
            this.outx(
                "Third, huh?  Do I speak with a silly accent and miss headshots all day long?  Well, I suppose it will work,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Luckster")
            this.outx(
                "Luckster, huh?  Strange, I don't feel that Lucky.  Are there any cow-girls about?"
            );
        else this.outx(`${this.flags[kFLAGS.GOO_NAME]}, huh?  I can live with that, I suppose,`);
        this.outx(
            '</i>" she muses, her mood brightening.  A storm cloud blows across her brow, darkening her gaze.  Petulantly, she asks, "<i>Well, what now, [Master]?  What are the rules?</i>"  Her voice carries an unhappy undercurrent that makes it clear she already resents her situation a little bit.'
        );
        this.outx("\n\nYou take her by the chin, tilting her head up to look at you.  ");
        if (this.player.cor < 50) this.outx("Patiently");
        else this.outx("Impatiently");
        this.outx(
            ", you explain that she is not to leave the camp.  The furthest she should go is to the stream, if she needs moisture."
        );
        this.outx(
            `\n\n"<i>I don't need that much liquid... not any more,</i>" ${
                this.flags[kFLAGS.GOO_NAME]
            } says.  "<i>I can already tell that I'm not losing it like I used to... but I still hunger for... well, juices.  I can probably live on water, but I won't be healthy that way.  I need you to feed me`
        );
        if (this.player.gender == 0) this.outx(", so please grow some genitals");
        this.outx(
            "!  Just every now and again...  It'll be pretty apparent when I'm hurting for food...  Take care of me, please?</i>\""
        );
        this.outx(
            "\n\nYou nod and tell her to get settled, you'll be back to check up on her shortly."
        );
        this.outx(`\n\n<b>(${this.flags[kFLAGS.GOO_NAME]} has been added to the slaves tab!)</b>`);
        this.flags[kFLAGS.GOO_SLAVE_RECRUITED] = 1;
        this.flags[kFLAGS.GOO_HAPPINESS] = 1;
        this.flags[kFLAGS.GOO_OBEDIENCE] = 1;
        this.flags[kFLAGS.GOO_FLUID_AMOUNT] = 100;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // PC Couldn't Bring Her Back
    public encounterLeftBehindGooSlave(): void {
        this.clearOutput();
        if (this.flags[kFLAGS.GOO_TFED_NICE] > 0) {
            this.outx(
                "While exploring, you see something odd in the lake.  It's a black blob, barely visible in the azure waves, though it seems to be splashing wildly, as if it was struggling.  You walk up to the lake shore just as the black blob flops limply onto the beach, breathing hard.  It's the poor goo-girl that got turned into latex!"
            );
            this.outx(
                `\n\n"<i>It's... you...</i>" she moans, looking up at you with wide ${
                    this.flags[kFLAGS.GOO_EYES]
                } eyes before they close...  It seems she's fainted.  She looks almost alien in a way... more than she did before, when she was just an aqueous blob with tits and faux hair.  Now, every facet of her being is shiny, reflective latex.  Even her vaginal secretions, which dribble freely, are liquid latex, glossy black juices that slowly harden into a flexible solid once freed from her body.`
            );
            if (this.player.cockTotal() > 1)
                this.outx(
                    `  You can't help but wonder what it would feel like to let her sheath your ${this.multiCockDescriptLight()} with her juices.`
                );
            this.outx(
                "\n\nSurprisingly, she has hair, or what passes for hair for a woman made entirely of supple, inorganic semi-solids.  Her tresses grow down past her shoulders, slender strands that are as reflective as her skin.  Unlike her skin, the latex-goo's hair seems perpetually oily, slippery and lubricated.  Hesitantly, you extend a hand to touch, carefully caressing a few of the rubbery strands.  Their texture is smooth and slick, unlike any hair you've ever had the pleasure of touching."
            );
            this.outx('\n\n"<i>I can feel that, you know.</i>"');
            this.outx(
                '\n\nYou backpedal wildly, surprised at the sudden statement so much that you nearly fall flat on your [butt].  Giggling laughter bubbles up in response, "<i>Sorry, I didn\'t mean to scare you.</i>"'
            );
            this.outx(
                '\n\nYou step forward, looking back down at the now-conscious once-goo.  She asks, "<i>Is it really you?  I... after I tried to make you feel good, and this...</i>" she indicates her latexy form and huge, blemishless breasts, "<i>I never thought I would see YOU again.</i>"  She looks away, struggling to her feet - and feet she has, a pair of long, slender legs, unlike the average googirl in the lake.  It seems she\'s lost a good deal of her amorphous qualities.'
            );
            this.outx(
                "\n\nAs gently as you can, you try to tell her your side of the story: the black egg and milk fell out of your pack and splattered onto - into - her, and changed her.  She moans in misery, hugging her hands across her expansive chest and shuddering, an action made all the more marvelous by the way her twisted body jiggles and shines in the light.  You can't help but notice how sexy her body is, how sensual it seems, her latex form practically crying out for your touch and caress...  Just as the girl inside that body is crying in sorrow and desperation, you remind yourself."
            );
            this.outx(
                "\n\nTrying to be comforting isn't easy without knowing her name, though.  You ask her, trying to be as friendly as you can as you sit down beside her."
            );
            this.outx(
                '\n\n"<i>Name?  My name is the warmth of my soul and the scent of the forgotten sea... or it was, before you made me like... this.  I don\'t think I could even communicate with my people properly at this point.  To your ears, I have no name, and honestly... my old name may as well be a forgotten memory.</i>"  A solitary onyx teardrop runs from the corner of her eye, hardening on her cheek.  She brushes it away with a sniffle.'
            );
        } else {
            this.outx(
                "While exploring, you see something odd in the lake.  It's a black blob, barely visible in the azure waves.  Occasionally, it splashes in frustration.  Curious, you find a nearby bush to hide behind and simply watch.  The onyx figure slams its arms into the water in a tremendous, enraged blow, blasting droplets of water a dozen feet into the air.  Then, it stalks up onto the shore and sits down, its globular breasts still wobbling as moisture runs in rivulets down its exotic, latex skin."
            );
            this.outx(
                '\n\nFiguring now is the best time, you exit your concealment to approach the odd, sexualized little package.  She notices at once, standing upright and shouting, "<i>YOU!</i>"'
            );
            this.outx("\n\n");
            if (this.player.cor < 33) this.outx("Sighing apologetically");
            else if (this.player.cor < 66) this.outx("Frowning");
            else this.outx("Smirking");
            this.outx(
                `, you nod and admit, "<i>Me.</i>"  She rises, taking one shuddering step toward you, arms upraised threateningly.  You brace for a fight, but she stops, tumbling down to one knee.  Oily black tears drip from the corners of her ${
                    this.flags[kFLAGS.GOO_EYES]
                } eyes, raining unapologetically on the ground as she wails, "<i>I can't hear them!</i>"  The black drops splatter on the sand and grass, immediately hardening into a glossy, solid web.  You marvel at that as she continues, "<i>I'm not a goo any more... my sisters... I'm deaf to them...</i>"`
            );
            this.outx(
                '\n\nThe latex woman takes a few more shuddering sobs before looking up at you with teardrops in her eyes.  "<i>Why?  Why did you do this to me?  What do you want from me?</i>"'
            );
            this.outx(
                "\n\nSmiling, you explain that the goo-girls of the lake have always intrigued you, and that it seemed like the best way to make one a little more... restrainable.  She moans in misery, hugging her hands across her expansive chest and shuddering, an action made all the more marvelous by the way her twisted body jiggles and shines in the light.  Holding your hands out peacefully, you explain "
            );
            if (this.player.cor < 33)
                this.outx(
                    "that you'll be a nice [master].  She'll never be in want for the fluids she needs, and so long as she obeys you, you'll see to her other needs."
                );
            else if (this.player.cor < 66)
                this.outx(
                    "that you'll be a good [master] for her.  You'll keep her healthy and satisfied, so long as she's obedient."
                );
            else
                this.outx(
                    "that so long as she obeys you, she has nothing to fear.  She had better obey."
                );
            this.outx(
                "\n\nYou take her by the hand and lift her to her feet, leading her to camp.  She plies you with questions, but you ignore her, bringing her back to a secluded portion of home.  Once safe and secure, you abruptly ask her what you should call her besides 'girl' or 'slave'.  Even pets need names, after all."
            );
            this.outx(
                '\n\n"<i>Name?  My name is the warmth of my soul and the scent of the forgotten sea... or it was, before you made me like... this.  I don\'t think I can even communicate with my people properly at this point.  To your ears, I have no name, and honestly... my old name may as well be a forgotten memory.</i>"  A solitary onyx teardrop runs from the corner of her eye, hardening on her cheek.  She brushes it away with a sniffle.'
            );
        }
        this.menu();
        this.addButton(0, "Next", this.encounterLeftBehindGooSlaveII);
    }
    private encounterLeftBehindGooSlaveII(): void {
        this.clearOutput();
        this.outx('"<i>Call me what you want, my name doesn\'t matter.</i>"');
        this.outx("\n\nWhat will you name her?");
        // {To standard name prompts}
        const input = document.createElement("input");
        this.menu();
        this.addButton(0, "Next", () => this.nameZeLatexGoo(input));
        this.mainView.mainText.appendChild(input);
    }

    // Pure Characters Intro(F):
    public pureGooRecruitmentStart(): void {
        this.getGame().inCombat = false;
        this.clearOutput();
        this.flags[kFLAGS.GOO_TFED_NICE] = 1;
        this.flags[kFLAGS.GOO_EYES] = this.monster.skinTone;
        if (this.player.hasItem(this.consumables.SUCMILK))
            this.player.consumeItem(this.consumables.SUCMILK);
        else this.player.consumeItem(this.consumables.P_S_MLK);
        if (this.player.hasItem(this.consumables.BLACKEG))
            this.player.consumeItem(this.consumables.BLACKEG);
        else this.player.consumeItem(this.consumables.L_BLKEG);
        // Play after having defeated a Googirl, when you have a Black Egg & Succubi Milk in your inventory. Corruption less than 50.
        // NOTE: Starts with Obedience 30, Happiness 60~?
        this.outx(
            "The excitement of your scuffle proves too much for the goo-girl to keep up with and she collapses into the slime of her lower torso, her skin wiggling as she struggles to maintain cohesion.  Her expression is one of disappointment, and she looks at you with big, hopeful eyes, reaching out a hand, as if to offer an apology for her overexuberance."
        );
        this.outx(
            `\n\nAs you lean over the defeated goo-girl, trying to decide what to do with her, she suddenly surges forward, wrapping her goopy arms around you and pulling your face into her squishy tits.  You squirm as the goo-girl tries to give you a playful hug, apparently not quite finished with you yet, when your pack suddenly falls off!  You pull away in the confusion as your inventory clatters to the ground, but end up staring in surprise as the black egg you were carrying cracks right over the goo's head, pouring its latexy substance into her head even as your Succubi Milk pops open, spraying her ${this.monster.skinTone} exterior with creamy milk.  Your eyes widen slightly as the two substances, black and white, trickle into her absorbent body, eventually slithering toward the heart-shaped core of her being.`
        );
        this.outx(
            "\n\nAbruptly, her motions stop as the two substances swirl around her core, sucked in like seed into a hungry whore's mouth.  As the egg and milk mix inside her, the girl's lips begin to darken, gradually turning opaque.  With a slosh of dismay, the goo-girl rises, spinning to face you.  Her lower lip is already a shining onyx, pouting and afraid.  She raises her arms before her face, watching with abject horror as they become covered in slowly growing black spots.  She starts to waver, and falls to the ground; her fingertips have solidified, becoming smooth solid things with clearly defined nails that dig fearfully into the shore.  Her breasts enlarge as the last of the milk swirls into her heart, pulling her facedown on the ground."
        );
        this.outx(
            `\n\nShe wiggles but fails to rise, too encumbered by solidifying tits to move.  Her arms have congealed into smooth onyx up to the elbows by now, and her asscheeks are equally dark spheres of reflective material, just begging to be touched.  Below that, her pool is shrinking, pulling inward even as it becomes more opaque.  It divides in two, gradually twisting around itself until two shapely calves are visible, capped with a dainty pair of feet.  These solidify almost instantly - the transformation is accelerating!  Permeable membrane swiftly gives way to reflective, glossy latex all over her shuddering form, crafting the goo-girl into a visage of a bondage-slut's wet dream.  With her whole body changed from liquid to solid, the once-goo collapses into unconsciousness, black eyelids closing over her solid ${this.monster.skinTone} eyes.`
        );
        this.outx(
            "\n\nWorried that you might have killed her, you dart forward to check her breathing.  Whew!  She's okay, just out like a lamp.  You hold the poor girl in your arms for a long moment, looking around for somewhere to put her, for someone to help you deal with... whatever's she's just done to herself.  It looks like you've got yourself a latex goo-girl... or a latex-girl... whatever.  Leaving her out here seems cruel, as she'd certainly be snatched up by some horrid monster...  She'd be safer back at your camp, though that might be committing to a more long-term project than you're ready for."
        );
        // [Take her Home] [Leave Her]
        this.menu();
        this.addButton(0, "Take Home", this.niceGuysTakeLatexHome);
        this.addButton(4, "Leave Her", this.leaveTheLatexGooGirl);
    }
    // Leave Her(F)
    private leaveTheLatexGooGirl(): void {
        this.clearOutput();
        this.outx(
            "You don't have the time to deal with this... thing.  You put the girl down on the shore and head on back to camp.  Hopefully, whatever finds her won't be TOO horrible."
        );
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Take her Home(F)
    private niceGuysTakeLatexHome(): void {
        this.clearOutput();
        // {Intelligent:}
        if (this.player.inte >= 60) {
            this.outx(
                "You quickly find a few pieces of wood and some strong reeds to use as rope.  It takes no more than 15 minutes to assemble the gathered components into a crude travois - one you'll have to carry.  Lifting the giant-breasted pile of sexy latex onto your construction proves to be quite the task, but you manage, barely.  Dragging her back to camp is no easier, but thanks to your quick wit, you save yourself a ton of effort."
            );
            // {fatigue + 20}
            this.fatigue(20);
        }
        // {Strong:}
        else if (this.player.str >= 60) {
            this.outx(
                "You heave her up over your shoulder, straining your capable muscles to hold up those giant mammaries and remain upright.  The task is arduous, but you're strong enough for anything!  "
            );
            if (this.player.tou < 40) {
                this.outx(
                    "Halfway there, you get too tired to continue.  You may be strong, but you don't have the endurance to heft a burden like this long term.  You'll have to leave her for now and try to find her once she's conscious."
                );
                this.fatigue(30);
                this.doNext(this.camp.returnToCampUseOneHour);
                return;
            }
            this.outx(
                "You're out of breath when you get to camp, but you made it!  It'll take awhile for you to catch your wind after all that work...  Your arms and legs are still burning from the exertion!"
            );
            this.fatigue(10);
        }
        // {Too weak and dumb:}
        else {
            this.outx(
                "You try to lift her, but she's too heavy!  Drat!  There's no way you'll get her back to camp like this, and you can't leave the portal undefended long enough to wait for her to wake.  You'll have to leave her for now and try finding her again once she's awake."
            );
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // [Next] (Go to PURE aftermath)
        this.menu();
        this.addButton(0, "Next", this.pureGooGalRecruitAftermath);
    }
    // PURE Aftermath(F)
    private pureGooGalRecruitAftermath(): void {
        this.clearOutput();
        this.outx(
            "You set the once-goo down in a secluded section of your camp.  She looks almost alien in a way... more than she did before, when she was just an aqueous blob with tits and faux hair.  Now, every facet of her being is shiny, reflective latex.  Even her vaginal secretions, which dribble freely, are liquid latex, glossy black juices that slowly harden into a flexible solid once freed from her body."
        );
        if (this.player.cockTotal() > 1)
            this.outx(
                `  You can't help but wonder what it would feel like to let her sheath your ${this.multiCockDescriptLight()} with her juices.`
            );
        this.outx(
            "\n\nSurprisingly, she has hair, or what passes for hair for a woman made entirely of supple, inorganic semi-solids.  Her tresses grow down past her shoulders, slender strands that are as reflective as her skin.  Unlike her skin, the latex-goo's hair seems perpetually oily, slippery and lubricated.  Hesitantly, you extend a hand to touch, carefully caressing a few of the rubbery strands.  Their texture is smooth and slick, unlike any hair you've ever had the pleasure of touching."
        );
        this.outx('\n\n"<i>I can feel that, you know.</i>"');
        this.outx(
            '\n\nYou backpedal wildly, surprised at the sudden statement so much that you nearly fall flat on your [butt].  Giggling laughter bubbles up in response, "<i>Sorry, I didn\'t mean to scare you.</i>"'
        );
        this.outx(
            "\n\nYou step forward, looking back down at the now-conscious once-goo.  She asks, \"<i>W-what happened to me?  I was... I was... Going to make you feel good, then you slipped and... oh, no!  What have I done!?</i>\"  She cries, starting to touch her now-latexy body. As her long, slender fingers begin to poke and prod her new body, she suddenly recoils, pressing her back against the rock, her form losing rigidity as her panic peaks.  The latex woman's back oozes over the boulder she presses against, her body slowly dissolving.  You reach out to stop her, but with a painful sounding snap, every semi-solid pseudopod recoils into place, dumping her forward onto her gigantic breasts.  It seems she's lost a good deal of her soluble flexibility."
        );
        this.outx(
            `\n\nLooking up at you, her panicked ${
                this.flags[kFLAGS.GOO_EYES]
            } eyes seem as wide as dinner plates.  "<i>W-what happened? I don't... how did... oh, no,</i>" she whines, covering her face with her hands as sorrowful tears shudder through her new body.`
        );
        this.outx(
            "\n\nAs gently as you can, you try to tell her what happened: the black egg and milk fell out of your pack and splattered onto - into - her, and changed her.  She moans in misery, hugging her hands across her expansive chest and shuddering, an action made all the more marvelous by the way her twisted body jiggles and shines in the light.  You can't help but notice how sexy her body is, how sensual it seems, her latex form practically crying out for your touch and caress...  Just as the girl inside that body is crying in sorrow and desperation, you remind yourself."
        );
        this.outx(
            "\n\nTrying to be comforting isn't easy without knowing her name, though. You ask her, trying to be as friendly as you can as you sit down beside her."
        );
        this.outx(
            '\n\n"<i>Name?  My name is the warmth of my soul and the scent of the forgotten sea... or it was, before you made me like... this.  I don\'t think I could even communicate with my people properly at this point.  To your ears, I have no name, and honestly... my old name may as well be a forgotten memory.</i>"  A solitary onyx teardrop runs from the corner of her eye, hardening on her cheek.  She brushes it away with a sniffle.'
        );
        this.menu();
        this.addButton(0, "Next", this.pureGooGalRecruitAftermathII);
    }
    private pureGooGalRecruitAftermathII(): void {
        this.clearOutput();
        this.outx('"<i>Call me what you want, my name doesn\'t matter.</i>"');
        this.outx("\n\nWhat will you name her?");
        this.menu();
        const inputField = document.createElement("input");
        this.mainView.mainText.appendChild(inputField);
        this.addButton(0, "Next", () => this.nameZeLatexGooNice(inputField));
    }

    // After Naming Latexy(F):
    private nameZeLatexGooNice(input: HTMLInputElement): void {
        if (input.value == "") {
            this.clearOutput();
            this.outx("<b>You must select a name.</b>");
            this.menu();
            this.addButton(0, "Next", () => this.nameZeLatexGoo(input));
            this.mainView.mainText.appendChild(input);
            return;
        }
        this.flags[kFLAGS.GOO_NAME] = input.value;
        this.clearOutput();
        this.outx('"<i>');
        if (this.flags[kFLAGS.GOO_NAME] == "Cattleya")
            this.outx(
                "Cattleya, huh?  I don't know if my tits are big enough to live up to that name,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Helia")
            this.outx("Helia, huh?  I don't know if I like anal enough for that!");
        else if (this.flags[kFLAGS.GOO_NAME] == "Urta")
            this.outx("Urta, huh?  What do you take me for, a furry?  I guess it will have to do,");
        else if (this.flags[kFLAGS.GOO_NAME] == "Tifa")
            this.outx("Tifa, huh?  I like the sound of that one!");
        else if (this.flags[kFLAGS.GOO_NAME] == "Aeris")
            this.outx("Aeris, huh?  That sounds like a name for a hoity-toity pain in the ass!");
        else if (this.flags[kFLAGS.GOO_NAME] == "Latexy")
            this.outx("Latexy, huh? That's, uh... real original...");
        else if (this.flags[kFLAGS.GOO_NAME] == "Goo")
            this.outx(
                "Goo, huh?  Wow, not too bright, are you?  Still, I guess I can live with it.  Call me Goo, I guess,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Blacky")
            this.outx(
                "Blacky, huh?  Do I look like a horse or something?  I guess it will have to do,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Fetish")
            this.outx("Fetish, huh?  You're pretty transparent about your motives, aren't you?");
        else if (this.flags[kFLAGS.GOO_NAME] == "Fenoxo")
            this.outx(
                "Fenoxo?</i>\"  Her hair slowly morphs into a fedora.  \"<i>I'm not sure this is quite my look, but it's a lovely name,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Maria")
            this.outx(
                "Maria?  Fuck, this isn't Cursed!  You don't expect me to turn you into a woman, do you?"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Valeria")
            this.outx("Valeria? Wait, I've heard that name before...");
        else if (this.flags[kFLAGS.GOO_NAME] == "Christmas")
            this.outx(
                "Christmas, huh?  How very festive.  The big difference is that I can come more than once a year."
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Symphonie")
            this.outx(
                "Symphonie, eh?  That seems very... fitting.  Snug and comfortable, somehow,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Savin")
            this.outx(
                "Savin, huh? Why would you want to name me after the second worst person since Stalin?"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Galatea")
            this.outx("Galatea?  By Oblimo, that's a beautiful name!");
        else if (this.flags[kFLAGS.GOO_NAME] == "Kara")
            this.outx(
                "Kara, huh? Like, that sounds like a name for a girl with big gropable boobs in a French maid outfit!  I, like, totally love it!"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Karazelle")
            this.outx(
                "Karazelle, huh? Like, that sounds like a name for a girl with big gropable boobs in a French maid outfit!  I, like, totally love it!"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Jacques")
            this.outx(
                "Jacques?  That's kind of a boy's name isn't it?  ...Did my boobs just get bigger?"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Whitney")
            this.outx(
                "Whitney?  The farm-girl?  Well, I suppose I can fill in for that frigid cunt."
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Hedrah")
            this.outx("Hedrah?  A nice strong name.  I approve,");
        else if (this.flags[kFLAGS.GOO_NAME] == "Third")
            this.outx(
                "Third, huh?  Do I speak with a silly accent and miss headshots all day long?  Well, I suppose it will work,"
            );
        else if (this.flags[kFLAGS.GOO_NAME] == "Luckster")
            this.outx(
                "Luckster, huh?  Strange, I don't feel that Lucky.  Are there any cow-girls about?"
            );
        else this.outx(`${this.flags[kFLAGS.GOO_NAME]}, huh?  I can live with that, I suppose,`);
        this.outx(
            "</i>\" she muses, her mood brightening.  \"<i>I-I suppose I should start to get used to it... to all of this.  I... thank you, friend.  You didn't have to take me back here, to help me, but you did.  I'm grateful, truly I am.  But I don't think I would survive long out in the wilds, on my own.  I've lived my whole life as a goo, and it will take some time - years, maybe - to relearn how to survive on my own.  I know it's a lot to ask, but would you mind if I stayed here?  With... with you?  At least until I can get on my, uh, feet, as it were,</i>\" she says, her hands tracing along her body down to her new, dainty little feet."
        );
        // [Keep Her] [Boot her Out]
        this.menu();
        this.addButton(0, "Keep Her", this.niceGuysKeepTheirGooGals);
        this.addButton(1, "Boot Her", this.bootOutNiceGoo);
    }
    // Boot her Out(F):
    private bootOutNiceGoo(): void {
        this.clearOutput();
        this.outx(
            "You did your civic duty bringing her back with you, but taking care of her in the long term... that's asking too much.  \"<i>I understand,</i>\" she says, bowing her head sadly as she struggles unsteadily to her feet.  \"<i>It's all right.  You've done more than enough, really.  I'll go.  Hopefully some of my sisters in the lake will be willing to help me, even if I'm so... so different... from them, now.  Goodbye, my friend.  Maybe we'll meet again sometime.</i>\""
        );
        this.outx(
            "\n\nShe's gone a moment later, waving over her shoulder as she unsteadily walks back toward the lake."
        );
        this.flags[kFLAGS.GOO_TOSSED_AFTER_NAMING] = 1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Keep Her(F):
    private niceGuysKeepTheirGooGals(): void {
        this.clearOutput();
        this.outx(
            `You take her by the chin, tilting her head up to look at you.  Of course you'll help her.  How could you not?  Overjoyed by your answer, ${
                this.flags[kFLAGS.GOO_NAME]
            } throws her slender arms around you, pulling herself up so that her slick black lips press against yours.  "<i>Oh, thank you! Thank you!</i>" she cries, kissing you again.  Suddenly realizing what she's done, though, the latex-girl releases you and slips back against her rock, looking abashedly away.  "<i>I'm sorry, I just...  Thank you.  I'm not going to just be a burden on you, I promise!  I don't know how much I can do, but so long as I'm here...  Just ask, for anything, and I promise I'll do my best.  It's the least I can do to pay you back for being so kind to me.</i>"`
        );
        this.outx(
            `\n\nYou smile, telling that seeing her safe and sound will be payment enough.  Speaking of which, what exactly is she going to need -- what can you do to help her now?  "<i>All I used to need to survive was liquid, but... not that much.  Not any more,</i>" ${
                this.flags[kFLAGS.GOO_NAME]
            } says.  "<i>I can already tell that I'm not losing it like I used to... but I still hunger for... well, juices.  I can probably live on water, but I won't be healthy that way.  I'll need you to, well, uh... feed me`
        );
        if (this.player.gender == 0) this.outx(", so you had better grow some genitals");
        this.outx(
            ".  Just every now and again, though - and I promise I'll make it feel good for you, too!  I'll try and let you know when I get... hungry... but keep an eye out for me, all right?  I'm not entirely used to this new metabolism yet..</i>\""
        );
        this.outx(
            "\n\nYou nod and tell her to get settled, you'll be back to check up on her shortly."
        );
        this.outx(`\n\n<b>(${this.flags[kFLAGS.GOO_NAME]} has been added to the slaves tab!)</b>`);
        this.flags[kFLAGS.GOO_SLAVE_RECRUITED] = 1;
        this.flags[kFLAGS.GOO_HAPPINESS] = 60;
        this.flags[kFLAGS.GOO_OBEDIENCE] = 20;
        this.flags[kFLAGS.GOO_FLUID_AMOUNT] = 100;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Approach Her (Select From Slaves Tab)(F)
    public approachLatexy(): void {
        this.clearOutput();
        // First Line - Happiness Dependent
        // (Sub 10)
        if (this.gooHappiness() < 10)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } scowls up at your approach, her unhappiness clearly visible in her ${
                    this.flags[kFLAGS.GOO_EYES]
                } eyes.  You doubt her solid onyx face could be any more morose.`
            );
        // (Sub 20)
        else if (this.gooHappiness() < 20)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } glares at you as you approach, clearly unhappy with the situation.  She looks like she's having a pretty terrible time.`
            );
        // (Sub 30)
        else if (this.gooHappiness() < 30)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } frowns at you as you approach, more than a little displeased to see you.  She doesn't seem to be having a very good time.`
            );
        // (Sub 40)
        else if (this.gooHappiness() < 40)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } knits her eyebrows in consternation at your approach, visibly less than happy.  It doesn't look like she's thrilled to be here.`
            );
        // (Sub 50)
        else if (this.gooHappiness() < 50)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } glances up at you when you approach, visibly bored.  She looks like she needs some cheering up.`
            );
        // (Sub 60)
        else if (this.gooHappiness() < 60)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } gives you a wan smile as you approach, looking a tad bored.  Still, the glitter in her eyes tells you that she's still a good ways from unhappy.`
            );
        // (Sub 70)
        else if (this.gooHappiness() < 70)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } cracks a small grin at the sight of you, happy to see you.  It's good to see her having a positive outlook.`
            );
        // (Sub 80)
        else if (this.gooHappiness() < 80)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } openly smiles at you as you approach, in good spirits, it seems.  Her sensual, fetishy skin reflects the light as she smiles, looking truly beautiful.`
            );
        // (Sub 90)
        else if (this.gooHappiness() < 90)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } grins at you, revealing rows of glittering black teeth.  She playfully regards you with happy, ${
                    this.flags[kFLAGS.GOO_EYES]
                } eyes.`
            );
        // (Sub 100)
        else if (this.gooHappiness() < 100)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } bounces up at your approach, mouth splitting into a wide smile.  Her glittering, ${
                    this.flags[kFLAGS.GOO_EYES]
                } eyes twinkle with genuine pleasure.`
            );
        // (MAX)
        else
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } jumps up on her feet at your approach, gleefully clapping her hands as you close in on her.  Her ${
                    this.flags[kFLAGS.GOO_EYES]
                } eyes and ecstatic visage make it clear how unbelievably happy she is.`
            );
        // Second Line - Tit Size
        this.outx("  ");
        // {Giant-Sized Titties}
        if (this.gooTitSize() >= 35)
            this.outx(
                `Utterly filled with moisture, her ${this.gooTits()} are so big her arms can barely encompass them, her hands pressing fruitlessly against the sloshing sides.  The bubbly black surface bulges obscenely, barely containing the liquid weight within.`
            );
        // {Very Big-Sized Titties}
        else if (this.gooTitSize() >= 24)
            this.outx(
                "Wobbling like crazy, her incredible chest barely stays bound up in her hands.  It completely obscures her torso from view.  Eventually, she gives up on restraining them and lets them slosh free.  You can't help but admire the flawless curves as you ponder how she can possibly remain upright."
            );
        // {Pretty nice sized}
        else if (this.gooTitSize() >= 15)
            this.outx(
                `Big enough to hide most of her torso, the ${this.gooTits()} sway and bounce ponderously.  Light reflects off the shiny, hypnotizing surface of her chest as she supports it with her hands.`
            );
        // {Big SizedVolley}
        else if (this.gooTitSize() > 4)
            this.outx(
                `Well-rounded and jiggly, her ${this.gooTits()} ripples slightly as she moves.  Those well-rounded spheres seem soft and firm at the same time.`
            );
        // {LargeDD}
        else if (this.gooTitSize() > 3)
            this.outx(
                `Sitting high on her chest, a proud pair of ${this.gooTits()} jiggle slightly with her every movement.  They're still nice and round, but nowhere near the mammoths she had before.`
            );
        // {MediumC}
        else if (this.gooTitSize() > 2)
            this.outx(
                `High and curvy, her ${this.gooTits()} looks pert and perky, topped with dark chocolate nipples.  The reflective surface makes them appear larger than they truly are, a feast of midnight darkness for your eyes.`
            );
        // {LightA}
        else
            this.outx(
                `Sitting high on her chest, her ${this.gooTits()} seems almost disproportionately tiny for her frame.  The perky onyx nipples protrude invitingly, tiny caps of inviting midnight.`
            );
        // {Regardless}
        this.outx(
            `  You estimate ${
                this.flags[kFLAGS.GOO_NAME]
            }'s chest would fit a ${Appearance.breastCup(
                this.gooTitSize()
            )} bra, were she to wear one.`
        );
        // Dicknips:
        if (this.flags[kFLAGS.GOO_NIPPLE_TYPE] == 1)
            this.outx(
                "  Those proud nipples have odd bulges at the tips, bulges that can swell tremendously, turning into rigid dicknipples."
            );
        // Cuntnips:
        else if (this.flags[kFLAGS.GOO_NIPPLE_TYPE] == -1)
            this.outx(
                "  Those proud nipples have a visible slit down the middle, just waiting to be spread into hungry pussies."
            );
        // Third Line - Fluid content
        // {Above 75}
        if (this.gooFluid() >= 75)
            this.outx(
                "  Her onyx lips are plush and inviting, full of liquid.  Likewise, her body seems flush and full of life, certainly not suffering for fluid nutrients."
            );
        // {Above 50}
        else if (this.gooFluid() >= 50)
            this.outx(
                "  Her onyx lips are full and pouty.  Likewise, her body is smooth and curvy, filled with plenty of fluid nutrients."
            );
        // {Above 25}
        else if (this.gooFluid() >= 25)
            this.outx(
                "  Her onyx lips look a little on the small side.  Likewise, her body is slim and narrow, not very filled out or curvy.  She could probably use more liquid nutrients."
            );
        // {Low}
        else {
            this.outx(
                "  Her onyx lips are tiny, drawn into a thin line.  Likewise, her body is narrow and feeble, perhaps lacking in fluid sustenance."
            );
            if (this.gooFluid() <= 5)
                this.outx(
                    "  She looks very unhealthy - she might be able to survive like this, but you can tell it will weigh heavily on her."
                );
        }
        // Fourth+ - special shit - NEWLINE
        this.outx("\n\n");
        // {Dick}
        if (this.flags[kFLAGS.GOO_DICK_LENGTH] > 0)
            this.outx(
                `Below her waist, a ${LatexGirl.num2Text(
                    Math.round(this.flags[kFLAGS.GOO_DICK_LENGTH] * 10) / 10
                )}-inch, ${this.gooCock()} hangs, soft and shiny.  `
            );
        this.outx(
            "A glittering cleft that oozes with coal-colored lubricant nestles firmly at the joining of her sensuous latex legs.  They shine that much brighter thanks to the unnatural slickness."
        );
        // Last Pg Obedience:
        this.outx("\n\n");
        // {sub 10}
        if (this.gooObedience() < 10)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } gives you a look of pure defiance, ready to disobey at the slightest notice.`
            );
        // {sub 20}
        else if (this.gooObedience() < 20)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } idly twirls a raven lock of hair as she awaits your comment, a rebellious look glinting in her ${
                    this.flags[kFLAGS.GOO_EYES]
                } eyes.`
            );
        // {sub 30}
        else if (this.gooObedience() < 30)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } smirks at you with a rebellious cast on her features.`
            );
        // {sub 40}
        else if (this.gooObedience() < 40)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } bats charcoal eyelashes at you as she watches you with ${
                    this.flags[kFLAGS.GOO_EYES]
                }, fiery eyes, still far from obedient.`
            );
        // {sub 50}
        else if (this.gooObedience() < 50)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } glances downwards for a moment, averting her eyes until she remembers to look up, defying her own submission.`
            );
        // {sub 60}
        else if (this.gooObedience() < 60)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } casts her eyes down but peeks up through her charcoal eyelashes to regard you.`
            );
        // {sub 70}
        else if (this.gooObedience() < 70)
            this.outx(
                `${this.flags[kFLAGS.GOO_NAME]} keeps her ${
                    this.flags[kFLAGS.GOO_EYES]
                } eyes cast down at the ground in deference to you, though she nervously draws in the dirt with a finger while she awaits a command.`
            );
        // {sub 80}
        else if (this.gooObedience() < 80)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } fixes her gaze down obediently, her cheeks flushing purplish.  Is she enjoying submitting to you?`
            );
        // {sub 90)
        else if (this.gooObedience() < 90)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } prostrates herself on the ground before you, tilting her head back so that she can fix her eyes on your waist, unfit to meet your gaze.`
            );
        // {sub 100)
        else if (this.gooObedience() < 100)
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } submissively prostrates herself before you, raising her onyx rump high as her forehead lowers.  Her cheeks and rump both manage to blush purple through her latex skin, clearly aroused by her own submissiveness.`
            );
        // {MAX}
        else
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } plants herself on all fours before you, kissing at your [feet].  Her smooth butt lightens along with her sides and cheeks, blushing violet with lust from the heat of her own submission.  Lewdly, she greets you, "<i>[Master].</i>"`
            );
        this.outx(`\n\n<b>Fluid %:</b> ${Math.round(this.gooFluid())}`);
        this.outx(`\n<b>Happiness %:</b> ${Math.round(this.gooHappiness())}`);
        this.outx(`\n<b>Obedience %:</b> ${Math.round(this.gooObedience())}`);
        this.menu();
        this.addButton(9, "Back", this.camp.campSlavesMenu);
        this.addButton(0, "Feed Her", this.feedLatexy);
        if (this.player.gender > 0 && this.player.lust >= 33)
            this.addButton(1, "Use Her", this.useLatexy);
        this.addButton(3, "Breast Size", this.setLatexysBustSize);
        this.addButton(4, "Dick Options", this.changeGooDick);

        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_LATEXY] == 1)
            this.addButton(9, "Back", kGAMECLASS.farm.farmCorruption.rootScene);

        if (
            this.flags[kFLAGS.FOLLOWER_AT_FARM_LATEXY] == 0 &&
            this.flags[kFLAGS.FARM_CORRUPTION_STARTED] == 1
        )
            this.addButton(5, "Farm Work", this.sendToFarm);
        if (this.flags[kFLAGS.FOLLOWER_AT_FARM_LATEXY] == 1)
            this.addButton(5, "Go Camp", this.backToCamp);
    }

    private sendToFarm(): void {
        this.clearOutput();

        this.outx(
            "You tell your goo pet that she is to head towards the lake, find a farm, present herself to the lady who works there and do as she says. The word “lake” has the effect you expected it would have; joy creases [latexyname]’s liquid face as you mention the Promised Land."
        );

        this.outx(
            "\n\n“<i>No sneaking off,</i>” you warn. “<i>I want you to work hard and earn the fluids you’ll be given.</i>”"
        );

        this.outx(
            "\n\n“<i>As you wish [master],</i>” she sighs, before slowly sliding off in the direction of the lake. She will be utterly useless as either a worker or a protector, you think; however, you suspect if Whitney keeps her well fed she will be able to harvest latex from her, which is surely worth something, and maybe some good old fashioned exertion will do the willful goo some good."
        );

        this.flags[kFLAGS.FOLLOWER_AT_FARM_LATEXY] = 1;

        this.doNext(this.camp.returnToCampUseOneHour);
    }

    private backToCamp(): void {
        this.clearOutput();

        this.outx(
            "You tell her to head back to camp; there are things you need to do to her you can’t do whilst she’s here. Repeatedly. [latexyname] pauses and then glances over towards the lake, clearly unhappy at the prospect of being torn away from it. However, she knows her place."
        );

        this.outx(
            "\n\nYou watch the creature make its slow, ponderous progress back towards camp."
        );

        this.flags[kFLAGS.FOLLOWER_AT_FARM_LATEXY] = 0;

        // [+1 Obedience and -1 Happiness every two days kept at the farm]
        this.doNext(kGAMECLASS.farm.farmCorruption.rootScene);
    }

    private useLatexy(): void {
        this.clearOutput();
        this.outx("How will you use your pet?");
        this.menu();
        if (this.player.hasVagina()) {
            this.addButton(0, "DomWithVag", this.femalePCDomFucksLatexGoo);
            if (this.flags[kFLAGS.GOO_DICK_LENGTH] > 0)
                this.addButton(1, "RideGooCock", this.femalePCDomFucksLatexGooFuta);
        }
        if (this.player.hasCock()) this.addButton(2, "DickFuckHer", this.malePCDomFucksLatexGoo);
        this.addButton(4, "Back", this.approachLatexy);
    }

    // Setting Dick Type(F)
    private changeGooDick(): void {
        this.clearOutput();
        // Supah High obedience slut!
        if (this.gooObedience() >= 60) {
            this.outx("You ");
            if (this.flags[kFLAGS.GOO_DICK_LENGTH] == 0)
                this.outx(
                    `ask ${
                        this.flags[kFLAGS.GOO_NAME]
                    } if she's ever considered growing a dick for fun.`
                );
            else this.outx("ask her if she'd like to change what kind of dick she has.");
            this.outx(
                '  She whimpers and moans, "<i>[Master], I loved growing penises back before I changed.  More than that, '
            );
            if (this.flags[kFLAGS.GOO_DICK_LENGTH] == 0) this.outx("I want to grow one for you.  ");
            else this.outx("I want you to order me to shift it often.  ");
            this.outx(
                'Changing myself further, twisting my body into a sexual playground for you... that would be the ultimate thrill!</i>"'
            );
            if (this.flags[kFLAGS.GOO_DICK_LENGTH] == 0)
                this.outx(
                    `\n\n${
                        this.flags[kFLAGS.GOO_NAME]
                    } pulls a hand away from her pussy and says, "<i>I'll need something masculine if you want me to grow a cock, [Master].  An incubi draft would work, or some minotaur blood, though the blood might make it a horsecock...</i>"  She shudders and closes her eyes, imagining herself with a rigid equine pole.  Your goo must have a bit of a fetish.`
                );
            else
                this.outx(
                    `\n\n${
                        this.flags[kFLAGS.GOO_NAME]
                    } pulls a hand away from her pussy and says, "<i>What kind of penis would please you most?  I could probably do the human ones, dog dicks, horse cocks, cat pricks, tentacle wangs, or demon dongs.</i>"  She gives a little shudder at the last one and licks her lips.  "<i>You'll need to have an appropriate item to assist me though, [Master].  I'm not as flexible as I once was.`
                );
        }
        // High Happiness + Whatever Obedience(F)
        else if (this.gooHappiness() >= 70) {
            this.outx(`You ask ${this.flags[kFLAGS.GOO_NAME]} if `);
            if (this.flags[kFLAGS.GOO_DICK_LENGTH] == 0)
                this.outx("she's ever considered growing a dick for fun.");
            else this.outx("she'd like to change what kind of dick she has.");
            this.outx(
                "  She beams and titters, \"<i>Omigod, I loved growing penises back before I changed!  It was so much fun to see how surprised it would make people and to make new shapes to see how they'd feel.  Let's do it!</i>\""
            );
            if (this.flags[kFLAGS.GOO_DICK_LENGTH] == 0)
                this.outx(
                    `\n\n${
                        this.flags[kFLAGS.GOO_NAME]
                    } taps her chin and says, "<i>I'll need something masculine if you want me to grow a cock.  An incubi draft would work, or some minotaur blood, though the blood might make it a horsecock...</i>"  She smiles wickedly.`
                );
            else
                this.outx(
                    `\n\n${
                        this.flags[kFLAGS.GOO_NAME]
                    } taps her chin and says, "<i>I can probably make almost any kind of penis, though I only really like the human ones, dog dicks, horse cocks, cat pricks, tentacle wangs, and demon dongs.</i>"  She gives a little shudder at the last one and licks her lips.  "<i>You'll need to have an appropriate item to assist me though, I'm not as flexible as I once was.`
                );
        }
        // Low Obedience(F)
        else {
            this.outx("You ");
            if (this.flags[kFLAGS.GOO_DICK_LENGTH] == 0)
                this.outx(
                    `ask ${
                        this.flags[kFLAGS.GOO_NAME]
                    } if she's ever considered growing a dick for fun.`
                );
            else this.outx("she'd like to change what kind of dick she has.");
            this.outx(
                '  She rolls her eyes and says, "<i>Sorry, but I think you\'ve made me change quite enough for right now.</i>"'
            );
            this.outx(
                "\n\nShe's going to have to learn to be a little more obedient before she'll do that."
            );
            this.gooObedience(-3);
            this.menu();
            this.addButton(0, "Next", this.approachLatexy);
            return;
        }
        this.menu();
        if (this.flags[kFLAGS.GOO_DICK_LENGTH] > 0) {
            if (
                this.player.hasItem(this.consumables.CANINEP) &&
                this.flags[kFLAGS.GOO_DICK_TYPE] != CockTypesEnum.DOG
            )
                this.addButton(
                    2,
                    "Canine Pepper",
                    this.latexyEatsADickItem,
                    this.consumables.CANINEP
                );
            if (
                this.player.hasItem(this.consumables.EQUINUM) &&
                this.flags[kFLAGS.GOO_DICK_TYPE] != CockTypesEnum.HORSE
            )
                this.addButton(3, "Equinum", this.latexyEatsADickItem, this.consumables.EQUINUM);
            if (
                this.player.hasItem(this.consumables.P_DRAFT) &&
                this.flags[kFLAGS.GOO_DICK_TYPE] != CockTypesEnum.HUMAN
            )
                this.addButton(4, "Pure Draft", this.latexyEatsADickItem, this.consumables.P_DRAFT);
            if (
                this.player.hasItem(this.consumables.W_FRUIT) &&
                this.flags[kFLAGS.GOO_DICK_TYPE] != CockTypesEnum.CAT
            )
                this.addButton(
                    5,
                    "Whisker Fruit",
                    this.latexyEatsADickItem,
                    this.consumables.W_FRUIT
                );
            if (
                this.player.hasItem(this.consumables.INCUBID) &&
                this.flags[kFLAGS.GOO_DICK_TYPE] != CockTypesEnum.DEMON
            )
                this.addButton(
                    0,
                    "Incubi Draft",
                    this.latexyEatsADickItem,
                    this.consumables.INCUBID
                );
            if (
                this.player.hasItem(this.consumables.MINOBLO) &&
                this.flags[kFLAGS.GOO_DICK_TYPE] != CockTypesEnum.HORSE
            )
                this.addButton(1, "Mino Blood", this.latexyEatsADickItem, this.consumables.MINOBLO);
            if (this.player.hasItem(this.consumables.GROPLUS))
                this.addButton(6, "Gro Plus", this.latexyEatsADickItem, this.consumables.GROPLUS);
            if (
                this.player.hasItem(this.consumables.REDUCTO) &&
                this.flags[kFLAGS.GOO_DICK_LENGTH] >= 5
            )
                this.addButton(7, "Reducto", this.latexyEatsADickItem, this.consumables.REDUCTO);
        } else {
            if (this.player.hasItem(this.consumables.INCUBID))
                this.addButton(
                    0,
                    "Incubi Draft",
                    this.latexyEatsADickItem,
                    this.consumables.INCUBID
                );
            if (this.player.hasItem(this.consumables.MINOBLO))
                this.addButton(1, "Mino Blood", this.latexyEatsADickItem, this.consumables.MINOBLO);
        }
        this.addButton(9, "Back", this.approachLatexy);
    }

    private latexyEatsADickItem(item: ItemType): void {
        this.player.consumeItem(item, 1);
        this.clearOutput();
        this.outx(
            `${
                this.flags[kFLAGS.GOO_NAME]
            } uses your proffered item without a second though.  Surprisingly she doesn't seem to react in any way, aside from closing her eyes and taking on a look of incredible concentration.  `
        );
        if (this.flags[kFLAGS.GOO_DICK_LENGTH] == 0) {
            this.outx(
                "Her onyx mound bulges, the luscious lips spreading around something internal.  Gradually, they part like a silken veil to reveal a "
            );
            if (item == this.consumables.MINOBLO) this.outx("flattened head");
            else this.outx("bulbous crown");
            this.outx(
                ".  The newborn cock-tip thickens, spreading her wider as it gradually droops out of the female flesh surrounding it.  "
            );
            this.flags[kFLAGS.GOO_DICK_LENGTH] = 8;
            if (item == this.consumables.MINOBLO) {
                this.outx(
                    "On and on it comes.  She's truly going to be hung like a stallion at this rate!   "
                );
                this.flags[kFLAGS.GOO_DICK_LENGTH] = 13;
            }
            this.outx(
                "Then, it begins to stiffen, arching up into full arousal.  The new-grown cock appears to have grown from her clit, but as you lean down to examine her vagina, you realize her cunt has shifted down slightly, and a new clit has grown to replace the old."
            );
            this.outx(
                `\n\n"<i>You're making it harder!</i>" ${
                    this.flags[kFLAGS.GOO_NAME]
                } whines, trying to cover it with her hands.  Of course, that only makes it harder, and a bead of oily pre-cum beads at the tip.  You could get used to this.  <b>${
                    this.flags[kFLAGS.GOO_NAME]
                } now has a ${LatexGirl.num2Text(this.flags[kFLAGS.GOO_DICK_LENGTH])}-inch `
            );
            if (item == this.consumables.MINOBLO) this.outx("horse-");
            this.outx("cock!</b>");
            this.gooObedience(5);
        } else {
            if (item == this.consumables.GROPLUS) {
                this.outx(
                    `Her ${this.gooCock()} shivers, and starts to sprout outward from the base, lengthening before your very eyes.  One... two... three... new inches of gleaming prick reveal themselves to you!\n\n${
                        this.flags[kFLAGS.GOO_NAME]
                    } giggles, "<i>You sure do like them big!</i>"`
                );
                this.flags[kFLAGS.GOO_DICK_LENGTH] += 3;
            } else if (item == this.consumables.REDUCTO) {
                this.outx(
                    `Her ${this.gooCock()} trembles, and starts to shrink inward, disappearing into her polished abdomen.  The effect is so startling profound that you have to do a double-take.  ${
                        this.flags[kFLAGS.GOO_NAME]
                    }'s penis is barely two thirds its original size!\n\nShe giggles, "<i>Not a fan of the big boys, huh?</i>"`
                );
                this.flags[kFLAGS.GOO_DICK_LENGTH] = Math.round(
                    this.flags[kFLAGS.GOO_DICK_LENGTH] * 0.66
                );
            } else {
                this.outx(
                    `Her ${this.gooCock()} rapidly erects, rising to full tumescence in seconds.  The veins begin to shift, crawling around under her onyx skin like little worms as her penis reshapes it.  A muffled moan escapes from ${
                        this.flags[kFLAGS.GOO_NAME]
                    }'s lips along with a discharge of black pre-cum from her tip and slit.  Then, with a powerful flex, the latex woman's penis solidifies into a new shape.  <b>${
                        this.flags[kFLAGS.GOO_NAME]
                    }'s maleness is now a `
                );
                this.outx(`${this.gooCock()}!</b>`);
            }
            this.gooObedience(2);
        }

        if (item == this.consumables.CANINEP) this.flags[kFLAGS.GOO_DICK_TYPE] = CockTypesEnum.DOG;
        if (item == this.consumables.EQUINUM)
            this.flags[kFLAGS.GOO_DICK_TYPE] = CockTypesEnum.HORSE;
        if (item == this.consumables.P_DRAFT)
            this.flags[kFLAGS.GOO_DICK_TYPE] = CockTypesEnum.HUMAN;
        if (item == this.consumables.W_FRUIT) this.flags[kFLAGS.GOO_DICK_TYPE] = CockTypesEnum.CAT;
        if (item == this.consumables.INCUBID)
            this.flags[kFLAGS.GOO_DICK_TYPE] = CockTypesEnum.DEMON;
        if (item == this.consumables.MINOBLO)
            this.flags[kFLAGS.GOO_DICK_TYPE] = CockTypesEnum.HORSE;

        this.menu();
        this.addButton(0, "Next", this.approachLatexy);
    }
    // Setting Preferred Bust Size(F)
    private setLatexysBustSize(): void {
        this.clearOutput();
        this.outx(
            `You ask ${
                this.flags[kFLAGS.GOO_NAME]
            } if she wouldn't mind keeping her tits around a certain size.`
        );
        // Low Obedience
        if (this.gooObedience() < 60) {
            this.outx(
                "\n\nShe puts her hands on her hips and shouts, \"<i>As if!  I'll make 'em as big or as small as I want!  You're already getting a sexy latex woman who's dependent on you for sexual fluids - you don't need to micromanage everything about me too!</i>\"  She blushes a little when she realized she just discussed her new self as 'sexy'.  She must like this a little more than she lets on."
            );
            this.gooObedience(-2);
            this.menu();
            this.addButton(0, "Next", this.approachLatexy);
            return;
        }
        // Decent Obedience
        else if (this.gooObedience() < 80)
            this.outx(
                "\n\nShe nods and casually hefts her tits in her hands, bouncing them back and forth as if to distract you.  \"<i>How big do you want these beauts?  I could have nearly immobilizing udders down to pert apples.  A word of warning though - it's easy to keep 'em small when I'm well hydrated, but keeping them large when I'm low on fluids isn't going to be possible.  If you like grand titons on your sexy slave-girls, you'll have to keep me well fed.</i>\"  A violet blush colors her cheeks when she realized she just referred to herself as your sexy slave-girl, so she tries to change the topic.  \"<i>By well fed, I mean sexed.  Because, you know, goo-girl.</i>\"  It didn't work very well."
            );
        // Highly obedient
        else {
            this.outx(
                `\n\nShe nods and casually hefts her tits in her hands, bouncing them back and forth with a slutty expression on her face.  "<i>How big do you want me to be, [Master]?  I could be a big-breasted whore for you, barely able to move under the weight of my own tits.  Then you'd have a mountain of latex cleavage to play in.  Or, I could keep them as pert, apple-sized breasts that just barely fit into your hands.  I'd be a glossy, petite slut for you then, wouldn't I?</i>"  She groans at the thoughts coursing through her obedient, depraved little mind and whimpers, "<i>Just keep me well fed if you want them full, [Master].  Without enough fluid, I can't keep them big!</i>"  ${
                    this.flags[kFLAGS.GOO_NAME]
                } watches you, awaiting the command to change herself.`
            );
        }
        this.menu();
        if (this.gooTitClass(this.gooTitSize()) != 1)
            this.addButton(0, "A-Cups", this.changeLatexyTits, 1);
        if (this.gooTitClass(this.gooTitSize()) != 2)
            this.addButton(1, "C-Cups", this.changeLatexyTits, 3);
        if (this.gooTitClass(this.gooTitSize()) != 3)
            this.addButton(2, "DD-Cups", this.changeLatexyTits, 4);
        if (this.gooTitClass(this.gooTitSize()) != 4)
            this.addButton(3, "Volleyballs", this.changeLatexyTits, 8);
        if (this.gooTitClass(this.gooTitSize()) != 5)
            this.addButton(4, "Basketballs", this.changeLatexyTits, 15);
        if (this.gooTitClass(this.gooTitSize()) != 6)
            this.addButton(5, "Huge", this.changeLatexyTits, 24);
        if (this.gooTitClass(this.gooTitSize()) != 7)
            this.addButton(6, "Gigantic", this.changeLatexyTits, 35);
        if (this.flags[kFLAGS.GOO_PREFERRED_TIT_SIZE] != 0)
            this.addButton(7, "Whatever", this.changeLatexyTits, 0);
        this.addButton(9, "Back", this.approachLatexy);
    }
    private gooTitClass(arg: number): number {
        if (arg >= 35) return 7;
        else if (arg >= 24) return 6;
        else if (arg >= 15) return 5;
        else if (arg > 4) return 4;
        else if (arg > 3) return 3;
        else if (arg > 2) return 2;
        else return 1;
    }

    // She Changes Her Bust Size(F)
    private changeLatexyTits(arg = 0): void {
        this.clearOutput();
        // PC wants tits bigger than current preferred and fluid not sufficient to reach new size
        if (
            this.gooTitClass(arg) > this.gooTitClass(this.flags[kFLAGS.GOO_PREFERRED_TIT_SIZE]) &&
            this.gooTitClass(this.flags[kFLAGS.GOO_FLUID_AMOUNT] / 2) < this.gooTitClass(arg)
        ) {
            // If already as big as possible
            if (
                this.gooTitClass(this.flags[kFLAGS.GOO_FLUID_AMOUNT] / 2) ==
                this.gooTitClass(this.gooTitSize())
            )
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } nods, but her body doesn't change.  "<i>There's not enough of me to make them any bigger right now.  You'll have to feed me if you want to see what they'll look at... full size.</i>"`
                );
            // Tits can't quite grow to max size:
            else
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } places her hands on her nipples and takes a deep breath.  She holds it for one second... two... three...  As she exhales, her breasts visibly inflate, not with air, but with ponderous liquid weight.  Unfortunately, they stop short of the size you requested.  ${
                        this.flags[kFLAGS.GOO_NAME]
                    } just doesn't have enough juice to fill them... yet.  She tells you that once you feed her enough she'll be as rounded as you requested.`
                );
        }
        // To max {Giant}size!
        else if (this.gooTitClass(arg) == 7) {
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } places her hands on her nipples and takes a deep breath.  She holds it for one second... two... three...  As she exhales, her breasts visibly inflate, not with air, but with ponderous liquid weight.  They grow bigger and bigger, until they nearly obscure her waist.  They're clearly heavy, with something of a teardrop shape to them.  In between them, the lush latex cleavage draws your eyes.  Part of you wants to climb in and see if you can disappear into those heavy, latex-encased udders.`
            );
        }
        // To huge {very nice} size!
        else if (this.gooTitClass(arg) == 6) {
            // BIGGER
            if (this.gooTitClass(this.gooTitSize()) < 6)
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } places her hands on the underside of her breasts and winks.  As you watch, her ${this.gooTits()} fill with greater and greater amounts of goo, stretching out to accommodate their obscene liquid weight.  They don't stop until they're nearly the size of beach balls, swaying heavily and obscuring most of your pet's torso from view.  Inky cleavage wobbles with every movement, inviting you to put something inside it.`
                );
            // Smaller:
            else
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } places her hands on the underside of her gigantic breasts and winks.  Before your eyes, the mammoth mounds slowly recede, compressing their excessive mass into a smaller, more manageable form.  The smaller tits don't stop their shrinkage until they just barely obscure ${
                        this.flags[kFLAGS.GOO_NAME]
                    }'s torso from view.  They still have an unbridled amount of cleavage, but now they come in a form that might be a little easier for your companion to carry.`
                );
        }
        // To basketball {pretty nice} sized
        else if (this.gooTitClass(arg) == 5) {
            // Bigger:
            if (this.gooTitClass(this.gooTitSize()) < 5)
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } cups her ${this.gooTits()} and pinches on her areola, tugging them outward.  The reflective black flesh gives to her pulls, stretching out and growing heavy with newfound weight.  The mammary growth doesn't stop until the breasts are about as big as basketballs, though far more jiggly.  The cleavage in between those impressive orbs seems to go on forever, almost inviting you to place something in it.`
                );
            // Smaller:
            else
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } sighs and grabs hold of her bloated breasts.  She presses down, compressing them inward.  As if by magic, the pressure actually causes the oversized jugs to decrease in size.  They get smaller and smaller until they're just about the size of basketballs, still very big by any measure.  ${
                        this.flags[kFLAGS.GOO_NAME]
                    }'s cleavage remains impressive, but not to such an obscene degree.  The women back home would've killed to have hooters like her.`
                );
        }
        // To volley ball {big} sized
        else if (this.gooTitClass(arg) == 4) {
            // Bigger:
            if (this.gooTitClass(this.gooTitSize()) < 4)
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } giggles and asks, "<i>Are you sure we can't go bigger?  The best part about being latex is that my new skin holds the shape without much work from me.  I can have huge, floor-dragging tits without any fuss!  Fuck, I'd be so horny having my nipples catch on every pebble!</i>"  She sighs as she fantasizes and pulls on her nipples.  With every tug, her breasts expand a little bigger, engorging with fresh fluid.  They slosh and shake a little as they even out into volleyball-sized tits with a gorgeous slash of cleavage dividing them.`
                );
            // Smaller:
            else
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } sighs and says, "<i>I wish you would've made me make them bigger.  Then I could crawl around on my hands and knees, dragging them on the ground and trying not to cum every time a nipple snagged on a pebble.</i>"  She sighs as she fantasizes and pushes down on her oversized tits.  As if by magic, they shrink, compressing down until her breasts are about the size of volleyballs with a gorgeous slash of cleavage dividing them.`
                );
        }
        // To DDish {large} sized:
        else if (this.gooTitClass(arg) == 3) {
            // Bigger:
            if (this.gooTitClass(this.gooTitSize()) < 3)
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } sighs as she cups her breasts and breaths, "<i>Grow,</i>" aloud.  Like the obedient sweater-puppies they are, her breasts expand and fill.  Their curves fill, the cleavage deepens, and ${
                        this.flags[kFLAGS.GOO_NAME]
                    } smiles at the result.  Her breasts are now around a DD-cup - just as requested.`
                );
            // Smaller: " +
            else
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } groans in disappointment, "<i>I liked em big!  Well, you're the boss...</i>"  She clenches her fists and closes her eyes.  Nothing happens at first, but after a moment, her ${this.gooTits()} tighten up.  Over the span of a few dozen seconds, ${
                        this.flags[kFLAGS.GOO_NAME]
                    } is reduced to having something like a DD-cup - a nice but fairly normal size, as ordered.`
                );
        }
        // To C {medium} sized:
        else if (this.gooTitClass(arg) == 2) {
            // Bigger:
            if (this.gooTitClass(this.gooTitSize()) < 2)
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } says, "<i>Well, that's a start I suppose.</i>"  She cups her tiny teats and massages them with gentle gropes.  Each time, they jiggle a little bit more.  Almost as soon as she starts, she stops, leaving them as curvy C-cups.  "<i>Could we go bigger?</i>"`
                );
            // Smaller:
            else
                this.outx(
                    `${
                        this.flags[kFLAGS.GOO_NAME]
                    } shudders, but obeys.  First, she presses down on her ${this.gooTits()}, then, she blinks her eyes closed and shivers.  Before your eyes, the breast-flesh diminishes, eventually settling on a pair of curvy C-cups.  "<i>I look like I must be dehydrated!  Good thing the other girls can't see me!</i>"`
                );
        }
        // To A {light} sized:
        else if (this.gooTitClass(arg) == 1 && arg > 0) {
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } says, "<i>I'll look anemic!  The other goo-girls will think I'm starving!</i>"  You give her a condescending look and she sighs.  "<i>All right, all right.  If my [master] wants tiny tits, ${this.player.mf(
                    "he'll",
                    "she'll"
                )} get them.</i>"  She grabs hold of her ${this.gooTits()} and compresses them in her grip.  Amazingly, the latex chest-flesh recedes into her as she pushes, diminishing before your very eyes.  She whimpers when they hit B-cups and groans when they reach A's.  ${
                    this.flags[kFLAGS.GOO_NAME]
                } pulls her hands away to show you the fruits of her labors - two tiny breasts, each barely a palmful.  A river of latex lubricants runs from her cleft, her arousal enhanced by the very act of obeying you against her wishes.`
            );
        } else {
            this.outx(
                `${
                    this.flags[kFLAGS.GOO_NAME]
                } blushes and gives you a smile that would be radiant, were it not on a midnight black canvas.  "<i>Thank you.</i>"`
            );
            this.gooHappiness(2);
        }
        this.flags[kFLAGS.GOO_PREFERRED_TIT_SIZE] = arg;
        if (this.gooObedience() < 75) this.gooObedience(3);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Feeding Her(F)
    // Can be fed cum, girl-cum, minotaur cum.
    // Can be fed directly or indirectly.
    // Direct feeding boosts happiness a fair bit but reduces obedience until obedience is over 50.
    // Indirect feeding increases happiness somewhat.
    private feedLatexy(): void {
        this.clearOutput();
        this.outx("How will you feed her?");
        if (this.player.lust < 33 && this.player.gender > 0)
            this.outx("  You aren't aroused enough to try and feed her any sexual fluids.");
        this.menu();
        if (this.player.hasCock() && this.player.lust >= 33) {
            this.addButton(0, "Cum, Indirect", this.feedLatexyCumIndirectly);
            this.addButton(1, "Cum, Direct", this.feedLatexyCumDirectly);
        }
        if (this.player.hasVagina() && this.player.lust >= 33) {
            this.addButton(2, "GirlCum, Ind.", this.feedLatexyGirlCumIndirectly);
            this.addButton(3, "GirlCum, Dir.", this.feedLatexyGirlCumDirect);
        }
        if (
            this.gooHappiness() >= 50 &&
            this.player.lactationQ() >= 100 &&
            this.player.biggestTitSize() >= 3
        )
            this.addButton(4, "Milk", this.feedLatexySomeMilk);
        if (this.player.hasItem(this.consumables.MINOCUM))
            this.addButton(5, "MinoCum Nic", this.minotaurCumFeedingGoo, true);
        if (this.player.hasItem(this.consumables.MINOCUM))
            this.addButton(6, "MinoCum Ruf", this.minotaurCumFeedingGoo, false);

        this.addButton(9, "Back", this.approachLatexy);
    }

    // Feed Cum Indirectly(F)
    private feedLatexyCumIndirectly(): void {
        this.clearOutput();
        // {1st Time, any indirect scene:
        if (this.flags[kFLAGS.GOO_INDIRECT_FED] == 0) {
            this.outx(
                "You toss a wooden bowl on the ground in your latex pet's area.  She looks more than a little confused by this development, poking it and asking, \"<i>What's this for?</i>\"\n\n"
            );
            this.flags[kFLAGS.GOO_INDIRECT_FED] = 1;
        }
        this.outx(
            `Glancing down at ${
                this.flags[kFLAGS.GOO_NAME]
            }, you tell her that it's feeding time.  She turns her gaze upward, more than a little eagerly`
        );
        if (this.gooObedience() < 70)
            this.outx(
                " and unashamedly reaching for your [armor].  You bat her hands away, forcing her greedy little latex digits to wait along with the rest of her"
            );
        else this.outx(", obediently waiting with her tongue wagging.");
        if (this.gooFluid() < 33) {
            this.outx(
                "  The hunger in her eyes is so relentless you fear her gaze could drill directly into your "
            );
            if (this.player.balls == 0) this.outx("body");
            else this.outx("ballsack");
            this.outx(".");
        } else if (this.gooFluid() < 66)
            this.outx(
                "  The hunger in her eyes is a palpable thing, one you fear could prod her into rash action."
            );
        else if (this.gooFluid() < 90)
            this.outx(
                "  The hunger in her eyes is a lazy thing.  It doesn't seem that strong, but she's always willing to drink more."
            );
        else
            this.outx(
                "  The hunger in her eyes is a decadent, gluttonous thing that's barely roused by the prospect of fresh seed.  It still causes her to smear a lick across her shiny lips."
            );
        this.outx(
            "\n\n[EachCock] easily hardens as it's removed from your restraining gear, already fairly turgid.  You experimentally pump "
        );
        if (this.player.cockTotal() > 1) this.outx("one");
        else this.outx("it");
        this.outx(
            `, plumping it to full rigidity with a few quick strokes.  ${
                this.flags[kFLAGS.GOO_NAME]
            } can only watch the salacious display with rapt attention, one hand nervously stroking her thigh while the other fiddles with her hair.  Willingly waiting, she seems to understand that you're just here to provide her with sustenance.  It doesn't make it any easier for her to restrain her lusts.`
        );
        this.outx(
            `\n\nAs you rapidly masturbate, ${
                this.flags[kFLAGS.GOO_NAME]
            }'s hands slip into her oil-slicked tunnel.  Two of her fingers are devoured by the pliable slit, engulfed in sable moisture.  Then, a third joins its kind, nosing in to massage the slick sensual walls within.  The panting latex woman easily allows her fourth finger to stretch her slit wide, exposing the ebony interior to you as fuel for your masturbatory ardor.  Her thumb grazes across her clit as she begins to rock her hips at you, lewdly thrusting as she begins to drool rivulets of raven honey.`
        );
        this.outx(
            "\n\nYou groan, equally enraptured by the display she's putting on for you.  Soon, you're "
        );
        if (this.player.cumQ() < 250) this.outx("oozing a thicker river of pre-cum than normal");
        else if (this.player.cumQ() < 500) this.outx("dripping even more pre-cum than usual");
        else if (this.player.cumQ() < 1000) this.outx("dribbling pre-cum");
        else this.outx("oozing out a river of pre-cum");
        this.outx(
            `.  The sensitive skin around your [cockHead] is the perfect fodder for a quick caress, one that makes your spine tingle with forced sensation.  You pump again and shudder at the exquisite jolt of electric bliss, rocking your hips involuntarily.  ${
                this.flags[kFLAGS.GOO_NAME]
            } is watching expectantly for the first sign of your jizz.`
        );
        this.outx(
            `\n\nRather than disappoint those eager eyes, you cum.  The torrent of heat that swells inside you doubles in power and then, explodes.  You arch your back and pump forward, barely remembering to angle your ${this.multiCockDescriptLight()} down toward the bowl before you spurt.  Spooge squirts from `
        );
        if (this.player.cockTotal() > 1) this.outx("all of ");
        this.outx("your tip");
        if (this.player.cockTotal() > 1) this.outx("s at once");
        this.outx(", raining down into the bowl in thick white ropes.");
        if (this.player.cumQ() >= 500)
            this.outx(
                "  In a short time, you have overfilled it, so you settle for spraying the remainder over your rubbery prize.  Long strands of sticky, slick breeding fluid rain over her charcoal mane, painting into a gray mop."
            );
        if (this.player.cumQ() >= 1000)
            this.outx(
                "  Still, you relentlessly pump yourself through more and more ejaculations, until the ground can bear no more and a puddle forms below."
            );
        if (this.player.cumQ() >= 4000)
            this.outx(
                "  That puddle swiftly fills into a foot deep lake of spunk, a muddy morass of your own virile semen."
            );
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } dives into the bowl with gusto, greedily devouring every drop.  Her tongue hangs free, thrashing against the polished wood as more and more of her latex mouth-muscle spools free to help with the feeding.  In seconds, the bowl is emptied`
        );
        if (this.player.cumQ() >= 500) this.outx(", and she turns to cleaning herself");
        this.outx(".");
        if (this.player.cumQ() >= 1000)
            this.outx(
                "  Sadly, the copious jizz that puddled up has already been devoured by the dry ground.  It seems the dirt can drink faster than your latex slave."
            );
        // {Boost her fluid quantity, bonus for over 250mL.}
        this.temp = 20;
        if (this.player.cumQ() >= 500) this.temp += 10;
        this.gooFluid(this.temp);
        // {Boost her happiness a tiny amount.}
        this.gooHappiness(4);
        this.player.orgasm();
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Feed Lady-Cum Indirectly(F)
    private feedLatexyGirlCumIndirectly(): void {
        this.clearOutput();
        // {1st Time, any indirect scene:
        if (this.flags[kFLAGS.GOO_INDIRECT_FED] == 0) {
            this.outx(
                "You toss a wooden bowl on the ground in your latex pet's area.  She looks more than a little confused by this development, poking it and asking, \"<i>What's this for?</i>\"\n\n"
            );
            this.flags[kFLAGS.GOO_INDIRECT_FED] = 1;
        }
        this.outx(
            `Glancing down at ${
                this.flags[kFLAGS.GOO_NAME]
            }, you tell her that it's feeding time.  She turns her gaze upward, more than a little eagerly`
        );
        if (this.gooObedience() < 70)
            this.outx(
                " and unashamedly reaching for your [armor].  You bat her hands away, forcing her greedy little latex digits to wait along with the rest of her"
            );
        else this.outx(", obediently waiting with her tongue wagging.");
        if (this.gooFluid() < 33)
            this.outx(
                "  The hunger in her eyes is so relentless you fear her gaze could drill directly into your [vagina]."
            );
        else if (this.gooFluid() < 66)
            this.outx(
                "  The hunger in her eyes is a palpable thing, one you fear could prod her into rash action."
            );
        else if (this.gooFluid() < 90)
            this.outx(
                "  The hunger in her eyes is a lazy thing.  It doesn't seem that strong, but she's always willing to drink more."
            );
        else
            this.outx(
                "  The hunger in her eyes is a decadent, gluttonous thing that's barely roused by the prospect of fresh seed.  It still causes her to smear a lick across her shiny lips."
            );

        this.outx(
            "\n\nYou wriggle your way out of your bottoms and recline slightly, spreading your [legs] to position your [vagina] just above the feeding bowl.  Without pausing, your fingers slip inside that honeyed hole, caressing your lips with worshiping strokes, supplanting themselves at the altar of your womanhood.  You spread wider to allow them entrance.  Shuddering, you allow yourself to enjoy the feeling of your own ministrations, even thumbing at your [clit] with gentle, circular brushes."
        );
        if (this.player.clitLength >= 3.5)
            this.outx(
                "  Soon, it stands out proud and erect, a column of glistening femme-flesh that tingles with every stray breeze."
            );
        this.outx(
            `\n\nEnraptured by the arousing view, your latex pet is unable to resist echoing your motions.  One after another, her rubbery fingertips disappear from sight, each nestled deeply into the onyx crevasse below.  The only visible digit is the tip of her thumb, which lewdly circles at her buzzer through the thick, ebony lubricant that oozes out around her palm.  Her ${
                this.flags[kFLAGS.GOO_EYES]
            } eyes look up at you pleadingly from under sable eyelids, her mouth wordlessly begging you for your girl-cum.  A climax rips through her sensitive body, a living fetish shuddering in climax.  Squirts of liquid latex erupt around her wrist as she orgasms.`
        );
        this.outx(
            "\n\nYou groan, equally enraptured by the display she's putting on for you.  Soon, you're "
        );
        if (this.player.wetness() < 3) this.outx("absolutely soaked with your girlish moisture");
        else if (this.player.wetness() < 4)
            this.outx("dripping strings of girlish liquid with abandon");
        else this.outx("practically gushing girlish moisture into the bowl");
        this.outx(
            `.  You instinctively rock your [hips] forward, slowly pumping them to an instinctive, animalistic beat.  ${
                this.flags[kFLAGS.GOO_NAME]
            } watches raptly, still masturbating herself with relentless finger-fucks.  She watches expectantly, waiting for the first sign of your orgasm with spellbound attention.`
        );
        this.outx(
            "\n\nRather than disappoint those eager eyes, you cum.  A bolt of electric intensity explodes in your [clit]."
        );
        if (this.player.clitLength >= 3.5)
            this.outx(
                "  You wrap your hand around it without meaning to, caressing the slick, womanly shaft so fast that it floods your mind with white waves of unthinking pleasure."
            );
        this.outx(
            "  Mounting higher and higher, a wave of liquid ecstasy rises from inside the core of your being.  It grows to a mountainous peak before crashing out through your birth canal, setting off earthquakes of muscular contractions in its wake.  Those tumultuous clenches squeeze down on your fingers like a vice, only relaxing when a flow of girl-cum washes out to greet them.  You nearly tumble over in orgasmic delight but hold the bowl close, nearly spilling it as it fills.  "
        );
        if (this.player.wetness() < 3)
            this.outx(
                "Your dribbling cunny paints a thin film of lady-spunk on the bowl, filling it slowly as you drip and squirm."
            );
        else if (this.player.wetness() < 4)
            this.outx(
                "Your ludicrously wet cunt oozes thick flows of lady-spunk into the bowl, rapidly filling it with the proof of your orgasm."
            );
        else
            this.outx(
                "Your gushing cunny sprays a lurid flow of lady-spunk into the bowl, immediately filling it beyond its rim.  It does a fine job of muddying the ground with the proof of your orgasm as your bliss drags on."
            );
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } dives into the bowl with gusto, greedily devouring every drop.  Her tongue hangs free, thrashing against the polished wood as more and more of her latex mouth-muscle spools free to help with the feeding.  In seconds, the bowl is emptied.`
        );
        if (this.player.wetness() >= 4)
            this.outx(
                "  Sadly, the copious vaginal lube that muddied the ground is already absorbed.  It seems the dirt can eat faster than your pet."
            );
        // {Boost her fluid quantity, bonus for over 250mL.}
        this.temp = 10;
        if (this.player.wetness() >= 3) this.temp += 5;
        if (this.player.wetness() >= 4) this.temp += 5;
        if (this.player.wetness() >= 5) this.temp += 5;
        this.player.orgasm();
        this.gooFluid(this.temp);
        // {Boost her happiness a tiny amount.}
        this.gooHappiness(4);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Feed Her Minotaur Cum {Nice Vs Hard}:(F)
    private minotaurCumFeedingGoo(nice = false): void {
        this.clearOutput();
        this.player.consumeItem(this.consumables.MINOCUM);
        this.outx("You pull a vial of minotaur cum from the pouches at your waist");
        if (this.player.minotaurNeed() || this.player.minotaurAddicted())
            this.outx(
                " and hungrily lick at your lips, always eager to take such a treat yourself"
            );
        this.outx(".  The latex woman ");
        if (this.flags[kFLAGS.TIMES_FED_LATEXY_MINO_CUM] > 0)
            this.outx(
                "claps in excitement, her dark-as-night nipples perking up immediately.  She hasn't forgotten her last taste of the heady treat."
            );
        else
            this.outx(
                " tilts her head in confusion, though when she realizes that it's cum you carry, her dark-as-night nipples perk up."
            );
        this.outx(
            "  You swish the bottle back and forth, commenting on how you've brought your pet a treat."
        );

        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } babbles without meaning to, "<i>Really, [Master]?  For me?</i>"  She presses her inhumanly smooth skin against you in a hug.  Her ebony coating nuzzles right up against you as her cheek brushes your `
        );
        if (this.player.tallness >= 72) this.outx("[chest]");
        else if (this.player.tallness >= 60) this.outx("neck");
        else if (this.player.tallness >= 52) this.outx("own");
        else this.outx("hair");
        this.outx(
            `.  Striking ${
                this.flags[kFLAGS.GOO_EYES]
            } eyes imploringly beg at you, as if to say, "<i>Can I have it now?</i>"`
        );
        // {HARD - skip if nice.}
        if (!nice) {
            this.outx(
                "\n\nYou shake your head, pushing her away unapologetically.  Patiently, you explain that if she is to have this treat, that she needs to be obedient."
            );
            if (this.gooObedience() >= 70)
                this.outx(
                    `  ${
                        this.flags[kFLAGS.GOO_NAME]
                    } immediately drops to the ground on all fours, rubbing her head against your [foot] and begging, "<i>Please [Master], may your latex fuckpet have some of that wonderful cum?</i>"  It seems she can be obedient after all.`
                );
            // [Semi obedient:]
            else if (this.gooObedience() >= 40) {
                this.outx(
                    `  ${
                        this.flags[kFLAGS.GOO_NAME]
                    } gives a trifling protest, "<i>Do I have to?  That cum looks really delicious!  I promise, I'll be good!  I'll let you fuck me any way you want.  I'll even fuck you, if you want me to!</i>"`
                );
                this.outx(
                    "\n\nSmirking, you marvel at how she's learned to beg so well.  Still, she's not obeying.  You command her to drop to her knees.  She does without question, though a sad pout is clearly visible across her sable visage.  You command her to prostrate herself before you on all fours.  Again, she does so without question.  Then, you ask her to lick your [feet]."
                );
                this.outx(
                    `\n\nThere is a moment's hesitation in the quivering pile of ebony fuckpet.  She seems to want to rebel, but then, she begins to kiss at your [feet], eventually extending her tongue to worship you.  At first, her mouth's muscle is tenderly, experimentally touching you.  Yet, it soon gains in eagerness and speed.  ${
                        this.flags[kFLAGS.GOO_NAME]
                    } is soon not just licking your [feet] but full on worshiping them, polishing them with her tongue.  A liquid dripping can be heard as she begins to enjoy herself.`
                );
                this.outx(
                    "\n\nOnly then do you allow her to stop, pulling her up by the scruff of the neck.  She's learning."
                );
                // {+obedience}
            }
            // [Not obedient:]
            else {
                this.outx(
                    `  ${
                        this.flags[kFLAGS.GOO_NAME]
                    } protests, "<i>But you captured me!  You ought to at least have the decency to give me some of that yummy food!</i>"`
                );
                this.outx(
                    '\n\nYou sigh and suggest that if she wants this that she needs to get on her knees.  She scowls, but after staring back at the alabaster prize in your hand, she regretfully sinks to her knees.  Looking up, she scowls and asks, "<i>Now?</i>"'
                );
                this.outx(
                    '\n\nShaking your head softly, you say, "<i>Not like that.  Open your mouth and beg with your lips, then you can have it.</i>"'
                );
                // {high fluid and not yet submitted}
                if (this.gooFluid() >= 66) {
                    this.outx(
                        `\n\nStaggering onto her feet, ${
                            this.flags[kFLAGS.GOO_NAME]
                        } growls, "<i>Fuck it, I'm not that thirsty!</i>"  She turns away from you, unwilling to even talk at this point.`
                    );
                    this.gooObedience(-5);
                    this.gooHappiness(-3);
                    this.doNext(this.camp.returnToCampUseOneHour);
                    return;
                }
                this.outx(
                    `\n\nStaggering up on her feet, ${
                        this.flags[kFLAGS.GOO_NAME]
                    } looks about ready to quit.  Then, she licks her lips and shudders, as if remembering her own hunger.  She slumps down onto her knees and tips her head back, shaking a few strands of latex out of her face as she opens her mouth.  Then, her onyx lips mouth, "<i>Feed me, please.</i>"`
                );
                this.outx("That's more like it.");
            }
        }
        // {Both}
        // {if not hard, minus obedience}
        this.outx(
            `\n\nNodding, you uncork the bottle and hand it to her.  She immediately throws it back like a sailor with a shot, throat working silently to pass the liquid load directly into her belly.  ${
                this.flags[kFLAGS.GOO_NAME]
            } burps loudly, her breath inundated with spunk-scent`
        );
        if (this.player.minotaurNeed()) {
            this.outx(
                " that makes you flush with an echoing need of your own.  Without meaning to, you pounce her, licking every trace of the heavenly minotaur spunk from her lips and licking the smallest of leftovers from inside her.  Your slave"
            );
            if (this.gooHappiness() < 33)
                this.outx(
                    " reluctantly returns the kiss, seeming to tolerate it more than anything else.  You barely notice, lust drunk as you are."
                );
            else if (this.gooHappiness() < 66)
                this.outx(
                    " seems surprised at first but quickly comes to enjoy it, swapping cummy spit with passion."
                );
            else
                this.outx(
                    " eagerly returns the kiss, frenching you with abandon.  Her tongue happily pushes the leftover jizz into your mouth."
                );
            this.outx("  You pull back, panting and unsated, wishing you had drank it yourself");
            this.player.minoCumAddiction(2);
        }
        this.outx(".");
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } smiles up at you, giving you a rather long and sensual hug as thanks.  Then, as you watch, her smile broadens.  Her bright eyes dull, the irises dilating into vacant dinner plates.  Your latex pet's hairless snatch puffs up and begins to drool, hot and heavy.  Panting now, she moans, smiling and blissful.  Without another word, she pumps her hand into her cunt, burying her fist up to the wrist in pliant pussy.  Syrupy latex gushes out around it as she finger-fucks herself, giving her body and mind over to the numbing pleasure that the drugged spunk you gifted her has granted.  In seconds, she cums, splattering the ground with inky moisture.  She screams your name and thrusts in again, up to her own elbow.  This sets off another messy orgasm, even larger than the first.`
        );
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            }'s eyes roll back into her head, and she collapses flat on her back, still fucking herself with her fist and forearm.  Like that, she cums over and over, succumbing to the narcotic arousal that dulls her wits and fills her body with lusty fire.  To her, there's nothing but mounting pleasure and the ecstatic release that follows, one after the other.  Her body's shaking intensifies to the point where you worry she'll injure her elastic body, but blessedly, her body goes completely limp, slumping into unconsciousness.`
        );
        this.dynStats("lus", 10 + this.player.lib / 20);
        // {+fluid, +happiness}
        this.gooFluid(20);
        this.gooHappiness(15);
        if (nice) this.gooObedience(-1);
        else this.gooObedience(5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Feed Cum Directly(F)
    private feedLatexyCumDirectly(): void {
        this.clearOutput();
        this.outx(
            `Opening your [armor], you let [eachCock] flop free.  ${
                this.flags[kFLAGS.GOO_NAME]
            } looks down immediately, ${
                this.flags[kFLAGS.GOO_EYES]
            } eyes locking tightly to [oneCock], raptly watching it stiffen with rising lust.  You take it in hand to heft its weight.  Explaining that this is to be her meal, you give it an encouraging shake.  After all, what kind of master would you be if you didn't feed your goo-girl?`
        );
        // HUNGRY:
        if (this.gooFluid() < 33) {
            this.outx(
                `  A rumble makes ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s tight belly tremble.  She brings a hand up to cover her featureless belly, giving you a nervous grin as she leans forward.  "<i>How did you know I was so hungry`
            );
            if (this.gooObedience() > 50) this.outx(", [Master]");
            this.outx('?</i>"');
        }
        // INTERMEDIATE:
        else if (this.gooFluid() < 66) {
            this.outx(
                `  A smirk spreads over ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s visage.  She licks her lips and leans forward, saying, "<i>Mmm...  I could go for a snack`
            );
            if (this.gooObedience() > 50) this.outx(", [Master]");
            this.outx('.</i>"');
        }
        // NOT HUNGRY:
        else {
            this.outx(
                `  A lazy smile reveals itself on ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s face.  She giggles, her lush body jiggling with liquid weight as she moves.  The latex woman comments, "<i>Mmm...  I'm pretty full.</i>"  She licks her lips and continues in a gluttonous purr, "<i>You can always feed me more though`
            );
            if (this.gooObedience() > 50) this.outx(", [Master]");
            this.outx('.</i>"');
        }
        // {no new PG}
        if (this.gooFluid() > 50) this.outx("  Plump o");
        else this.outx("  O");
        this.outx(
            "nyx lips purse idly, slowly spreading as if of their own volition as their mistress bends closer to inhale your scent.  Her smooth nostrils flare as she sniffs at your [cock biggest], savoring the scent of her meal.  Slowly, she's drawn forward to her meal, eventually coming to rest that puckered orifice tightly against your [cockHead biggest]."
        );
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } has the sense to look up and give you a wink.  Then, she reveals her tongue - an ebony protrusion that spools without end.  A gleeful smile spreads over ${
                this.flags[kFLAGS.GOO_NAME]
            }'s raven-hued mouth while her spit-glossed tongue wraps [eachCock] up tight.  Once satisfied, she stretches her jaw downward in order to fully open her mouth.  The puckered lips morph into a distended 'o' and advance, marching down the length of your [cock biggest] with unceasing determination, gleefully devouring your erection.`
        );
        if (this.player.biggestCockArea() > 80)
            this.outx(
                "  Her throat is stretched so tightly that it appears more like an inky condom than anything else.  Every vein, every variation in length is perfectly represented - until it disappears into her chest."
            );
        else this.outx("  Her body, devoid of gag reflex, swallows you with ease.");
        this.outx(
            `\n\nWith [oneCock] buried [sheath]-deep in your pet, you cannot help but groan.  You realize, after a moment, that her tongue untwisted as soon as she pulled you in, as you can feel the wet, pulsing walls of the latex woman's throat massaging your length, meticulously stimulating you with the semi-solid pressure that only a goo-girl can provide.  Her innards feel like gelatinous waves cresting over you, warm and gooey all at the same time.  ${
                this.flags[kFLAGS.GOO_NAME]
            } tenderly milks your [cock biggest], squeezing out a few flows of pre-cum into her belly.  Pulling back, she squeezes a dollop of cream from your [cockHead biggest] as she withdraws, her oily tongue clinging to the underside of your tool as it's abandoned to cool air.`
        );
        this.outx(
            `\n\nThe entirety of your maleness is wreathed in slowly solidifying blackness, a liquid latex that makes you appear to wear an inky, leaking condom.  The tightness of it tingles as it snugs tight about you.  It feels good in an unusual way, but you want more!  You grab hold of ${
                this.flags[kFLAGS.GOO_NAME]
            } by the head and ram forward, hilting yourself back inside that sable fuck-cave, allowing the liquid latex of her core hug you close.  She gives a muffled grunt of surprise, but her expression quickly settles into one of content.  Driven by surging arousal, you bunch her slick strands in your hands and pull her back by her hair, yanking her back and forth.  You're fucking her face, and she loves it!`
        );
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } sighs, a gurgling vibration almost below your ability to hear, but there nonetheless.  Her eyes meet yours, hungry and pleading.  They beg you with sultry, long-lashed blinks, imploring you to cum.  Her tongue fellates your [cock biggest] with lewd licks to further stir your passion, worshiping you as you pound her face.  To a normal woman, or even a demon, this would probably be uncomfortable, but to her, it's just another blowjob.  The semi-solid surfaces inside her suddenly squeeze shut, wrapping your rigid member tight in gushing velvet.  At the same time, she begins to hum, low and deep inside herself, vibrating those juicy cushions around your cock as she begins to suck.`
        );
        this.outx(
            "\n\nSilky smooth fingers dig into your [butt], a mirror of the digits that hold her head tight.  Both of her hands pull and tug, mashing loins to lips in a salacious kiss of cock-creaming pleasure.  Your body goes rigid, your hands pull tighter, and you begin to shake as orgasm hits.  The pulsing warmth of her throat seems to wick up into your middle, where it churns and bubbles before bursting out in an explosion of gooey pleasure.  Rope after rope of seed fires into your pet's gooey interior, silencing her humming and setting her sloppy-slick walls to squeeze you with your convulsions, wringing your [cock biggest] dry."
        );
        if (this.player.cockTotal() > 1) {
            this.outx("  Your remaining ");
            if (this.player.cockTotal() == 2) this.outx("dick fruitlessly paints");
            else this.outx("dicks fruitlessly paint");
            this.outx(
                ` her ${this.gooTits()} with a sheen of white, wasting their moisture in a decadent display of virility.`
            );
        }
        if (this.player.cumQ() >= 500)
            this.outx(
                "  You cream her internals so full that her belly distends and jiggles with each fresh pump of spunk."
            );
        if (this.player.cumQ() >= 1500)
            this.outx(
                "  Rounder and rounder she swells, until her middle is almost balloonish, stretched so taut it appears grayish-white thanks to all the white beneath."
            );
        if (this.player.cumQ() >= 500)
            this.outx(
                "  However, by the time your orgasm is winding down, she's already metabolizing it, converting her spunk-plumped belly into supple, denser curves for the rest of her form."
            );

        this.outx(
            `\n\nFeeling utterly empty, you sag back against a boulder.  The rough texture of the supporting stone keeps you upright, but there's next to no strength left in your [legs].  ${
                this.flags[kFLAGS.GOO_NAME]
            } is still down there, still slurping and sucking, probing the delicate entrance to your cumvein with gentle licks as she squeezes the last few drops from you.  The sensation feels far too good this soon after climax.  You wriggle and squirm, putting a hand to ${
                this.flags[kFLAGS.GOO_NAME]
            }'s forehead and commanding her to stop.`
        );
        // {OBEDIENT:}
        if (this.gooObedience() >= 60) {
            this.outx(
                `\n\nAt the sound of your command, a whimper rolls over your [cock biggest], but the suckling heat that surrounds it withdraws, sliding off along with the succulent ring her glossy lips provide.  Your [cockHead biggest] pops free from the imprisoning puckers, trailing glossy black spit.  ${
                    this.flags[kFLAGS.GOO_NAME]
                } breathes hard, as if she's been holding her breath all this time, and for all you know, she may have.  In any event, she mewls hungrily, licking her gooey liquids from your cock to clean it.  Again, it feels so good that it nearly saps your strength, but you hold tight while she finishes melting the latex free, leaving your dick completely clean.`
            );
            // Happy:
            if (this.gooHappiness() >= 66)
                this.outx(
                    `\n\n"<i>Thank you for the food, [Master],</i>" ${
                        this.flags[kFLAGS.GOO_NAME]
                    } coos, "<i>A pet like me only needs what you allow, isn't that right, [Master]?</i>"`
                );
            // Mediocre:
            else if (this.gooHappiness() >= 33)
                this.outx(
                    `\n\n"<i>Thanks for the food, I guess,</i>" ${
                        this.flags[kFLAGS.GOO_NAME]
                    } mutters, "<i>I guess you don't let your pets overindulge, huh?</i>"`
                );
            // Grumpy:
            else
                this.outx(
                    `\n\n"<i>Really?  That's it?</i>" ${
                        this.flags[kFLAGS.GOO_NAME]
                    } complains, "<i>I thought you liked it, but I guess you're more concerned about obedience than my happiness, huh, [Master]?</i>"`
                );

            this.outx("\n\nYou rise, giving your latex slave a knowing nod.  Her cunt");
            if (this.flags[kFLAGS.GOO_DICK_LENGTH] > 0) this.outx(` and ${this.gooCock()} spatter`);
            else this.outx(" spatters");
            this.outx(
                " oily wetness onto the ground below at your affirmation, and she shudders with a submissive thrill.  You pat her on the head for a job well done and depart, secure in her obedience."
            );
            // {Boost her fluid quantity, bonus for over 250mL.}
            this.temp = 20;
            if (this.player.cumQ() >= 500) this.temp += 5;
            this.gooFluid(this.temp);
            // {Boost her happiness a tiny amount.}
            this.gooObedience(5);
            this.player.orgasm();
            this.dynStats("sen", -2);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        // {DISOBEDIENT:}
        else {
            this.outx(
                "\n\nAt the sound of your command, her suction redoubles.  That suckling heat plumps your [cock biggest] even bigger inside her, bombarding you with cacophonous sensation that scatters your bodily control like leaves in the breeze.  You give a strangled whimper as you slide down the stone, landing softly on your [butt] before the sensuous shape of your rebellious pet.  Her lips are locked vacuum tight to your groin, pumping up and down with wet, hungry smacks.  You arch your back into her ministrations, rolling your eyes back into your head.  What need is there for sight when the jolts of pleasure coming from your [cock biggest] are so powerful that they make the previous orgasm seem a wasted, worthless thing."
            );
            this.menu();
            this.addButton(0, "Let Her", this.maleDirectFeedLatexGooGoneWrong);
            this.addButton(1, "Try2Assert", this.tryToAssertMaleDomWhileLatexGooDrains);
        }
    }

    private maleDirectFeedLatexGooGoneWrong(): void {
        this.clearOutput();
        if (this.player.cockTotal() > 1) {
            this.outx("A flawless hand wraps around ");
            if (this.player.cockTotal() > 2) this.outx("your remaining erections");
            else this.outx("your other erection");
            this.outx(", stroking ");
            if (this.player.cockTotal() == 2) this.outx("it");
            else this.outx("them");
            this.outx(
                " with slow caresses.  Using the extra ejaculate as lubricant, she ensures that they're nearly as engulfed in slippery latex as your main member.  "
            );
        }
        this.outx(
            "Without warning, an explosion of ecstasy rises up, forcing decadent, pleasurable squeezes through your abdominal muscles, culminating in a release of white pressure from "
        );
        if (this.player.cockTotal() > 1) this.outx("each of ");
        this.outx("your cum-slit");
        if (this.player.cockTotal() > 1) this.outx("s");
        this.outx(
            `.  ${
                this.flags[kFLAGS.GOO_NAME]
            } looks up at your seizing body, smiling wide around her `
        );
        if (this.player.biggestCockArea() > 80) this.outx("impressive ");
        this.outx(
            "mouthful of cock as it pumps directly into her belly, allowing her to drink even more deeply of your essence."
        );
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } releases you from your oral imprisonment long enough to leak a few trailing strands of spunk from your [cockHead biggest].  `
        );
        if (this.player.cockTotal() == 1)
            this.outx(
                "Her hands fixate on your slick, black-coated length, beginning to stroke it with eager pumps"
            );
        else
            this.outx(
                "Her eager pumps never slow, and she moves one of her busy mitts to stroke your black-coated length"
            );
        this.outx(".  The latex waif tickles your ");
        if (this.player.balls > 0) this.outx("[balls]");
        else this.outx("taint");
        this.outx(
            ' with a finger as she happily explains, "<i>The thing about us goo-girls is... we love to drink.  Mmmm...</i>"  Her voice trails into a hum of delight as she digests your newest offering, eventually returning to say, "<i>You taste so good, [name]... I can\'t stop and it\'s so sweet, so delectable.  Swallowing your spunk makes my pussy gush and my stomach purr.  You don\'t mind if I sample a few more swallows do you?</i>"'
        );
        this.outx(
            "\n\nYou grunt out something negative sounding.  You're beyond words by this point, locked in what feels like a cycle of ceaseless teasings on your over-tender member"
        );
        if (this.player.cockTotal() > 1) this.outx("s");
        this.outx(".  Worse, the slimy handjob");
        if (this.player.cockTotal() > 1) this.outx("s");
        this.outx(" you've been getting morph");
        if (this.player.cockTotal() == 1) this.outx("s");
        this.outx(
            ` into something that gives you even stronger strokes of pleasure.  If you could roll your eyes down to look, you'd see ${
                this.flags[kFLAGS.GOO_NAME]
            }'s fingers merging together, joining into a single cylinder.  Dark-oil begins to drip from that tight grip, made all the more difficult to endure by the pleasant, purple-tinged latex lips that form on the bottom of her 'hand', a mock-pussy complete with latex-based lubricant.  At the bottom of every downstroke, your dick bursts free from the top, appearing just long enough for her to slurp languidly on your [cockHead].`
        );
        this.outx(
            `\n\nOrgasm slams into you with the force of a sledgehammer, turning your vision red and ringing your ears.  More wet slurps and squelches emanate from your groin as ${
                this.flags[kFLAGS.GOO_NAME]
            } drinks deeper of your essence, coaxing fresh spurts of white from your thoroughly milked [balls].  As you fire your liquid bliss into her, your tired eyelids close.`
        );
        this.outx(
            '\n\n"<i>You\'re not done yet, are you?</i>" a sultry voice whispers, accompanied by fresh ministrations to your maleness.  "<i>You promised to feed me, [Master], now come on, squirt in my slippery squeezes.  Give me your spunk!</i>"  The voice begs and pleads, only silencing itself to plant itself back on your [cock biggest] again.  You lapse from conscious thought, only stirring to lift your hips high and release a fresh draught of nutrients for your greedy pet.'
        );
        this.menu();
        this.player.orgasm();
        this.dynStats("lib", 0.5, "sen", -3);
        this.addButton(0, "Next", this.feedCumDirectEpilogue);
    }
    // [Next]
    private feedCumDirectEpilogue(): void {
        this.clearOutput();
        this.outx(
            `You wake with your mouth so dry that it feels like sandpaper.  Looking around, you see ${
                this.flags[kFLAGS.GOO_NAME]
            } slumbering in the corner, looking rather... full and fecund, plump with weight.  You feel equally, obnoxiously empty.  Your groin is tingling painfully from the forceful draining.  Staggering away toward some water, you realize you'll have to raise her obedience if you want her to stop on command.  Letting her drink so deeply probably didn't help either.`
        );
        this.temp = 50;
        if (this.player.cumQ() >= 500) this.temp += 30;
        this.gooFluid(this.temp);

        // {Boost her happiness a tiny amount.}
        this.gooHappiness(5);
        this.gooObedience(-4);
        this.doNext(this.camp.returnToCampUseFourHours);
    }
    // Feed Lady-Cum Direct(F)
    private feedLatexyGirlCumDirect(): void {
        this.clearOutput();
        this.outx(
            "Gently shimmying out of your [armor], you languidly stretch and offhandedly mention that it's feeding time."
        );
        if (this.player.hasCock()) {
            this.outx(
                `  When ${
                    this.flags[kFLAGS.GOO_NAME]
                } glances to your ${this.multiCockDescriptLight()}, you tut and `
            );
            if (this.player.balls > 0) this.outx("lift your [balls]");
            else this.outx("shift position");
            this.outx(" to show your [vagina].");
        } else
            this.outx(
                `  When ${
                    this.flags[kFLAGS.GOO_NAME]
                } glances down, you sashay to better show your [vagina].`
            );

        // HUNGRY:
        if (this.gooFluid() < 33) {
            this.outx(
                `\n\nA rumble makes ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s tight belly tremble.  She brings a hand up to cover her featureless belly, giving you a nervous grin as she leans forward.  "<i>How did you know I was so hungry`
            );
            if (this.gooObedience() > 50) this.outx(", [Master]");
            this.outx('?</i>"');
        }
        // INTERMEDIATE:
        else if (this.gooFluid() < 66) {
            this.outx(
                `\n\nA smirk spreads over ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s visage.  She licks her lips and leans forward, saying, "<i>Mmm...  I could go for a snack`
            );
            if (this.gooObedience() > 50) this.outx(", [Master]");
            this.outx('.</i>"');
        }
        // NOT HUNGRY:
        else {
            this.outx(
                `\n\nA lazy smile reveals itself on ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s face.  She giggles, her lush body jiggling with liquid weight as she moves.  The latex woman comments, "<i>Mmm...  I'm pretty full.</i>"  She licks her lips and continues in a gluttonous purr, "<i>You can always feed me more though`
            );
            if (this.gooObedience() > 50) this.outx(", [Master]");
            this.outx('.</i>"');
        }
        this.outx(
            `\n\nYou confidently approach, stopping just in front of your latex pet.  She immediately drops to her knees, placing her nose a scant few inches from your vulva.  Her ${
                this.flags[kFLAGS.GOO_EYES]
            } eyes lock onto the `
        );
        if (this.player.wetness() >= 3) this.outx("glistening ");
        this.outx(
            `outer lips with excitement, dilating slightly as she leans closer.  ${
                this.flags[kFLAGS.GOO_NAME]
            }'s nostrils flare as she breathes deeply of your scent, inhaling thick lungfuls of your feminine odor, the heady musk of an aroused woman.  Her mouth hangs open slightly, as if in awe of what she sees, and undirected by her conscious mind, she lazily drifts closer.`
        );
        this.outx(
            `\n\nA shiver of indecent pleasure writhes up your spine when her nose casually crashes into your slit.  Jolting slightly, ${
                this.flags[kFLAGS.GOO_NAME]
            } is roused from her cunt-induced stupor by the hot wetness on her proboscis.  She glances up at you, blushing just the slightest amount of violet, and hesitantly cranes her head to bring her lips in contact with your labia.  At first, she kisses and licks around the outer edges of your vulva, smearing their surface with her inky saliva.  The slick fluid thickens on contact with the air, even as she dives deeper into your [vagina], slowly spreading your inner lips with her exotic tongue.`
        );
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } quickly loses herself in her own artful ministrations, her world narrowed down to the simmering cleft at the joint of your [hips] and [legs].  Slithering out, snakelike, her tongue burrows into your [vagina].  Its length is as large as it is slick, shiny and so smooth that it glides through your gates with ease.  ${
                this.flags[kFLAGS.GOO_NAME]
            } skillfully twists it around inside you, forcing more of her sable spit into your channel as her lubricated muscle squirms inside you, pressing hard against every tender area.  It's so smooth that if it weren't pushing so pleasantly against you, you'd barely feel it.  As it is, a slick snake is writhing in your cunt and it's set your loins afire.`
        );
        if (this.player.wetness() < 3)
            this.outx(
                "  Drizzling wetness pours down your pet's chin as she pleases you.  She swallows most of it with eager bobs of her throat, happy to have such a... moist [master]."
            );
        else if (this.player.wetness() < 4)
            this.outx(
                "  Drops of wetness beat on your pet's chin as she pleases you.  She swallows most of it with eager bobs of her throat, pleased to have an appetizer before the main course."
            );
        else
            this.outx(
                "  Lubricant shines on your pet's glossy chin as she pleases you.  She swallows every now and again with eager bobs of her throat, sampling your flavor."
            );
        this.outx(
            `\n\nPulling back, the hungry latex woman smiles up at you, though she's muted by the tongue that hangs over the intervening distance, still locked to your pussy by her undulating oral appendage.  Her long lashes blink innocently while that potent mouth muscle massages your box's inner walls.  Taken in by the sensual assault and innocent visage accompanying it, you grab hold of ${
                this.flags[kFLAGS.GOO_NAME]
            }'s face and cram it into your cunt, mashing her mouth up into your nethers hard enough to make an audible squelch.  The corners of ${
                this.flags[kFLAGS.GOO_NAME]
            }'s eyes crinkle merrily.  She's still meeting your gaze, even as you hump her mouth, using her like a living latex sextoy.`
        );
        this.outx(
            `\n\nHolding as tightly to that thought as your slave's head, you aggressively grind against her, letting the ecstatic pleasure haze your thought processes as it crests into a wave.  She twists and presses her tongue up hard, squeezing a supremely sensitive spot.  The ensuing explosion of heavenly indulgence echoes in your brain, short-circuiting your motor control.  Your limbs thrash freely, though your fingers and arms stay locked on ${
                this.flags[kFLAGS.GOO_NAME]
            }, mashing her tightly into your gash.`
        );
        if (this.player.wetness() >= 4)
            this.outx(
                "  You squirt a small river of gushing juices directly into her mouth, her cheeks flooded by the copious outpouring of lubricant."
            );
        else
            this.outx("  You gradually fill her mouth with your free-flowing orgasmic lubricants.");
        this.outx(
            "  Her tongue is squished tight when your [vagina] clamps closed, convulsing around the mouth muscle as if it was a dick it could somehow milk.  Your [legs] lock as you endure the tidal wave of release."
        );
        this.outx(
            `\n\nThe pleasure doesn't fade fast.  In fact, the aftershocks that wrack your muscles continue to assault you with every kiss of your pet's eager lips.  She doesn't slow or stop after your orgasm.  If anything, she suckles your nether-lips and [clit] that much harder, greedy more of your delectable juices.  You wriggle and squirm, putting a hand to ${
                this.flags[kFLAGS.GOO_NAME]
            }'s forehead and commanding her to stop.`
        );
        // {OBEDIENT:}
        if (this.gooObedience() >= 60) {
            this.outx(
                `\n\nAt the sound of your order, a whimper rolls over your [vagina], but the undulating pleasure of her glossy tongue inside you gradually recedes.  Your [clit] pops free from the imprisoning puckers, joined by a web of inky spit and lady-cum.  ${
                    this.flags[kFLAGS.GOO_NAME]
                } breathes hard, as if she's been holding her breath all this time, and for all you know, she may have.  In any event, she mewls hungrily, licking her gooey liquids from your box to clean it.  Again, it feels so good that it nearly saps your strength, but you hold tight while she finishes lapping up the lubricants and saliva, leaving your entrance completely clean.`
            );
            // Happy:
            if (this.gooHappiness() >= 66)
                this.outx(
                    `\n\n"<i>Thank you for the food, [Master],</i>" ${
                        this.flags[kFLAGS.GOO_NAME]
                    } coos, "<i>A pet like me only needs what you allow, isn't that right, [Master]?</i>"`
                );
            // Mediocre:
            else if (this.gooHappiness() >= 33)
                this.outx(
                    `\n\n"<i>Thanks for the food, I guess,</i>" ${
                        this.flags[kFLAGS.GOO_NAME]
                    } mutters, "<i>I guess you don't let your pets overindulge, huh?</i>"`
                );
            // Grumpy:
            else
                this.outx(
                    `\n\n"<i>Really?  That's it?</i>" ${
                        this.flags[kFLAGS.GOO_NAME]
                    } complaints, "<i>I thought you liked it, but I guess you're more concerned about obedience than my happiness, huh, [Master]?</i>"`
                );
            this.outx("\n\nYou rise, giving your latex slave a knowing nod.  Her cunt");
            if (this.flags[kFLAGS.GOO_DICK_LENGTH] > 0) this.outx(` and ${this.gooCock()} spatter`);
            else this.outx(" spatters");
            this.outx(
                " oily wetness onto the ground below at your affirmation, and she shudders with a submissive thrill.  You pat her on the head for a job well done and depart, secure in her obedience."
            );
            // {Boost her fluid quantity, bonus for over 250mL.}
            this.temp = 10;
            if (this.player.wetness() >= 3) this.temp += 5;
            if (this.player.wetness() >= 4) this.temp += 5;
            if (this.player.wetness() >= 5) this.temp += 5;
            this.gooFluid(this.temp);

            // {Boost her happiness a tiny amount.}
            this.gooObedience(4);
            this.player.orgasm();
            this.dynStats("sen", -2);
            this.doNext(this.camp.returnToCampUseOneHour);
        }
        // {DISOBEDIENT; chose not to/could not Assert Control}
        else {
            this.outx(
                `\n\nAt the sound of your order, your pet's efforts redouble.  Her slick onyx opening latches tight to your [clit] while what feels like a foot of thick tongue thrashes inside you.  As sensitive as you are after cumming, you simply can't endure such rampant stimulation.  The strength goes out of your [legs] in weak little twitches as you slump back against a boulder, the rough stone slowing your descent as you slide to the ground.  ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s mouth stays locked to your [vagina], attached with vacuum-like tightness.  You can actually feel your vulva puffing larger under the suction.  Hotter and more sensitive, your labia plump up nice and thick.`
            );
            this.menu();
            this.addButton(0, "Let Her", this.letLatexGooDrainCuntDry);
            this.addButton(1, "Try2Assert", this.assertControlOverCuntDrainingLatexGoo);
        }
    }

    private letLatexGooDrainCuntDry(): void {
        this.clearOutput();
        this.outx(
            `${
                this.flags[kFLAGS.GOO_NAME]
            }'s face remains firmly, stubbornly attached to your loins.  No matter how you writhe or push against her, she stays latched onto your [vagina].  The near supernatural pleasure has turned your arms to jello, and you slump back ineffectually after a few attempts at freedom.  The ${
                this.flags[kFLAGS.GOO_EYES]
            } of your hungry pet's eyes watches you, unblinking.  Mercilessly, she tongues your sodden slit to another orgasm.  The slippery latex lips slip and slide across your womanhood as sexual ecstasy subsumes your thoughts, eyes rolling back as your mind dedicates the whole of its power to simply experiencing the pleasure that's thrust upon you.`
        );
        this.outx(
            `\n\nWordlessly, you writhe on ${
                this.flags[kFLAGS.GOO_NAME]
            } until the orgasm finally releases you from its grip.  Your pet goo pulls back, even withdrawing her tongue from your well-juiced box.  Her fist doesn't waste any time in replacing in.  In fact, as the smooth limb slides home, you can feel the bulkiest parts smoothing, shaping it into a cylindrical object with a noticeable ridge just above the 'wrist'.  ${
                this.flags[kFLAGS.GOO_NAME]
            } giggles, "<i>Gosh, you taste good, and we goo girls... we love to drink.  Mmm...</i>"  Her voice trails into a hum of delight as she digests your newest offering, eventually returning to say, "<i>Your little slit here seems awful happy, [name]... I don't want to stop, and it's so sweet, so delectable...  Swallowing your cum makes my pussy gush and my stomach purr.  You don't mind if I sample a few more swallows do you?</i>"`
        );
        this.outx(
            "\n\nYou give voice to your objections, but the feel of latex lips snugging tight around your [clit] swiftly turns your protests into a moaning gurgle."
        );
        if (this.player.clitLength >= 3)
            this.outx(
                "  She happily fellates your female pole in time with the pumping of her arm."
            );
        else
            this.outx(
                "  She happily licks and sucks your most sensitive spot in time with the pumping of her arm."
            );
        this.outx(
            "  The lurid squelches of her pumping, dildo-like limb fill the air, easily drowning out your more coherent vocalizations.  There's nothing you can do but cum for your latex goo-girl.  Nothing to do but feel pleasure and orgasm, feeding her every drop of your liquid pleasure, again and again."
        );
        this.outx(
            `\n\nA whimper of protest slips out of your mouth, your [vagina] cums again, and ${
                this.flags[kFLAGS.GOO_NAME]
            } drinks deeply once more.  With eyelids fluttering closed, you pass beyond conscious awareness, yielding your body to ${
                this.flags[kFLAGS.GOO_NAME]
            } to claim again and again.`
        );
        this.menu();
        this.player.orgasm();
        this.dynStats("lib", 0.5, "sen", -3);
        this.addButton(0, "Next", this.feedCumDirectEpilogueGirls);
    }

    // [Next]
    private feedCumDirectEpilogueGirls(): void {
        this.clearOutput();
        this.outx(
            `You wake with your mouth so dry that it feels like sandpaper.  Looking around, you see ${
                this.flags[kFLAGS.GOO_NAME]
            } slumbering in the corner, looking rather... full and fecund, plump with weight.  You feel equally, obnoxiously empty.  Your groin is tingling painfully from the forceful suckling.  Staggering away toward some water, you realize you'll have to raise her obedience if you want her to stop on command.  Letting her drink so deeply probably didn't help either.`
        );
        this.gooFluid(50 + this.player.wetness() * 8);
        // {Boost her happiness a tiny amount.}
        this.gooHappiness(4);
        this.gooObedience(-4);
        this.doNext(this.camp.returnToCampUseFourHours);
    }

    /* Savin Says: Disobedient Pets get Punished with Gentle Loving PC-Dom (FEMALE)(F)*/

    // [Display option to \"<i>Assert Control</i>\" with Moderate strength check if achieve Femdom end to direct feed scene: \"<i>You're strong enough to pull her off before she utterly dominates you!</i>\"]
    private assertControlOverCuntDrainingLatexGoo(): void {
        if (this.player.str < 40 || this.player.str / 10 + LatexGirl.rand(20) + 1 < 9) {
            this.letLatexGooDrainCuntDry();
            return;
        }
        this.clearOutput();
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            }'s face remains firmly, stubbornly attached to your loins.  You struggle under her relentless oral assault until you finally manage to get a good grip on the rebellious goo-slut. Putting your impressive strength to work, you flip yourself and the goo-girl over, straddling her shoulders and crushing her beneath your body.  ${
                this.flags[kFLAGS.GOO_NAME]
            } lets out a pathetic squeak as you assume command once again, pinning her onto the ground beneath you.  She's supposed to be the servile one here: it's time for this bitch to learn her place.  You grab her by her slick, latexy hair and mash her face into your twat, shuddering as her nose rubs against your [clit].  You snap a command to finish you a second time.  If she wants your fluids so bad, let her work for it the right way: meekly suckling from your cunt like a good little sub should.`
        );
        this.outx(
            `\n\nPinned down as she is, ${
                this.flags[kFLAGS.GOO_NAME]
            } struggles against your powerful [legs] for a few moments before another forceful face-shove into your waiting cunt stops her, her intense craving for your femcum overpowering her desire to rebel.  "<i>I-I'm sorry, `
        );
        if (this.gooObedience() <= 50) this.outx("[name]");
        else this.outx("[Master]");
        this.outx(
            '</i>" she mewls, giving you a long, tentative lick between your womanly folds.  You hold her firmly, telling her to prove just how sorry she is.  Your breath catches in your throat as her long, slick tongue slides through you again, stopping to swirl and tease your sensitive [clit], sending shudders of sudden pleasure wracking through you.'
        );
        this.outx(
            `\n\n"<i>Good girl,</i>" you moan, arching your back as she slithers more and more of her long tongue into you, filling your [cunt] with black latex.  You run your fingers through her hair, urging ${
                this.flags[kFLAGS.GOO_NAME]
            } on as she begins to explore your passage, still delightfully sensitive and malleable after the recent face-fucking you just received from her.  More and more of her creeps into you, spreading your vaginal walls wide until the tip of her tongue tickles the mouth of your cervix, pleasantly circling it with slow, rhythmic motions.  You remind ${
                this.flags[kFLAGS.GOO_NAME]
            } that this is how it ought to be, with her meekly servicing your needy cunt as you desire; not her trying to dominate you. That isn't how this works, and she should know better by now.`
        );
        this.outx(
            `\n\n"<i>I'm sowwy, ${this.player.mf(
                "Mashta",
                "Mishtrish"
            )},</i>" she mumbles, her words slurred by her tongue being fully buried inside you.  She retracts herself from you, leaving you feeling empty and cold as she adds, "<i>I didn't mean to, Master... I just, lose control...</i>"  You smile down at the little latex girl and tell her that she doesn't need to worry.  You'll always be here to keep her nice and full with delicious femcum, so full that she's fit to burst with how much you've given her.  ${
                this.flags[kFLAGS.GOO_NAME]
            } squirms, stirred by your words, and looking over your shoulders, you can see a fresh sprout of liquid latex pouring down between her thighs.`
        );
        this.outx(
            `\n\nYou release ${
                this.flags[kFLAGS.GOO_NAME]
            }'s head, leaving one hand to stroke her hair as your other plays down her slick, smooth skin, tracing along her shapely curves and huge, jiggling breasts until your fingertips brush along her thighs.  She gasps as a single digit plunges into her, sliding up to the knuckle into her ready cunt in one slow, languid motion.  Your other hand guides her head upwards, urging her back to her duties; she hesitates for a moment, but so do you, both still holding until she finally accepts your demand and resumes, her tongue flicking out to play along your [cunt].  "<i>Good girl,</i>" you say again, and start to move your hand, gently fingering her pussy as she tongues up the lubricant freely leaking from your loins.`
        );
        this.outx(
            `\n\nBefore she can fall into a rhythm of tongue-fucking you, though, you decide to reward her newfound submissiveness: you twist around, leaving her pinned beneath your [legs] as you move your head between her shapely thighs.  You breathe in deep, reveling in the smell of her as ${
                this.flags[kFLAGS.GOO_NAME]
            } slips her long tongue back into you, filling your empty [cunt] with her oral appendage.  You return the favor, gently sliding your middle-three fingers into her eager twat, stretching her until you can slide the whole of your fist in.  She gasps, her breath hot on your sensitive box, but you don't skip a beat as you push your fist into her, sliding in until you run out of cunt to fill.  You start to move, fisting her with slow, gentle motions, enjoying the feeling of her slick passage desperately contracting around the huge block inside it, trying to push you out as you push in; trying to suck you in as you pull out to the knuckles.`
        );
        this.outx(
            `\n\n"<i>${this.player.mf("Masterrrr", "Mistriiiiissss")}!</i>"  ${
                this.flags[kFLAGS.GOO_NAME]
            } groans, rolling her head back as you fist-fuck her. She redoubles her oral ministrations, eagerly lapping at your sodden box, desperately trying to bring you to orgasm even as lube spurts liberally from between her legs, signaling her impending climax.  You're closer, though, so close to the edge that you'd cum even if she stopped.  But she wouldn't dare, instead grasping your thighs and shoving her face between your [legs], slurping her tongue through you with mind-wrecking speed.`
        );
        this.outx(
            `\n\nYou jam your fist as far into ${
                this.flags[kFLAGS.GOO_NAME]
            } as you can before you cum, making her shriek in pleasure and sending reverberations through your cunt as you rocket over the edge.  Your [cunt] practically explodes with femcum, showering ${
                this.flags[kFLAGS.GOO_NAME]
            }'s face with it as your box squeezes down on her tongue, trapping her inside you as you pound her box, throwing her into orgasmic throes beneath you, her tongue writhing and squirming inside you to further your pleasure.`
        );
        this.outx(
            `\n\nWhen your second orgasm passes, you roll limply off of ${
                this.flags[kFLAGS.GOO_NAME]
            }, utterly sated.  Your [chest] heaving, you sigh peacefully as you close your heavy lids, eager to rest.  A moment later, though, you feel slick skin press against your own as ${
                this.flags[kFLAGS.GOO_NAME]
            } curls up beside you, her face inches from your own.  With a wan smile, you reach out and run your fingers through her hair before pulling her into a long kiss that leaves the taste of womanhood on your lips.`
        );
        // {Low happiness}
        if (this.gooHappiness() < 33)
            this.outx(
                `\n\n"<i>If it's always going to be like that, maybe... being here with you isn't going to be so bad after all,</i>" ${
                    this.flags[kFLAGS.GOO_NAME]
                } whispers.`
            );
        // {Moderate happiness}
        else if (this.gooHappiness() < 66)
            this.outx(
                '\n\n"<i>I\'m sorry I got so forceful, [name].  I enjoy serving you... I do.</i>"'
            );
        // {High happiness}
        else
            this.outx(
                `\n\n${
                    this.flags[kFLAGS.GOO_NAME]
                } nuzzles against you, her head coming to rest on your [chest].  "<i>Sorry, [name]. I didn't mean to try and force you.  I love you when you're so assertive, so... dominant.</i>"`
            );
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.gooFluid(30 + this.player.wetness() * 5);
        // {Boost her happiness a tiny amount.}
        this.gooHappiness(5);
        this.gooObedience(5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Savin Says: Disobedient Pets get Punished with Gentle Loving PC-Dom (MALE)
    // [Display option to \"<i>Assert Control</i>\" with Moderate strength check if achieve Femdom end to direct feed scene: \"<i>You're strong enough to pull her off before she utterly dominates you!</i>\"]
    private tryToAssertMaleDomWhileLatexGooDrains(): void {
        if (this.player.str < 40 || this.player.str / 10 + LatexGirl.rand(20) + 1 < 9) {
            this.maleDirectFeedLatexGooGoneWrong();
            return;
        }
        this.clearOutput();
        this.outx(
            "At the sound of your command, her suction redoubles.  That suckling heat plumps your [cock biggest] even bigger inside her, bombarding you with cacophonous sensation that scatters your bodily control like leaves in the breeze.  You give a strangled whimper as you slide down the stone, landing softly on your [butt] before the sensuous shape of your rebellious pet.  Her lips are locked vacuum tight to your groin, pumping up and down with wet, hungry smacks.  You arch your back into her ministrations, rolling your eyes back into your head.  What need is there for sight when the jolts of pleasure coming from your [cock biggest] are so powerful that they make the previous orgasm seem a wasted, worthless thing."
        );
        this.outx(
            `\n\nBut this isn't how it's supposed to be!  You're supposed to be in control here, not ${
                this.flags[kFLAGS.GOO_NAME]
            }.  She's meant to serve you, not force herself on you like some goblin slut.  You struggle against her, grabbing ${
                this.flags[kFLAGS.GOO_NAME]
            }'s hair and pulling back, forcing her off your cock with all your strength.  She tumbles back, coughing and gagging, her mouth still locked in an 'O' meant for your [cock biggest].  You dust yourself off, struggling upright before standing, looming over ${
                this.flags[kFLAGS.GOO_NAME]
            } who looks meekly up at you.  "<i>I... I...</i>" she starts, but you cut her off, rolling her onto her belly and hiking her plump little ass up.  You sigh, starting to remind her of exactly who's in charge here, of how you're always here to feed her, and yet she tries to force herself on you like that...  Unacceptable. As you speak, you grab her plush buttcheeks, digging your fingers into her backside until a little moan escapes her lips.  "<i>That's more like it,</i>" you growl, flopping your [cock biggest] down between her cheeks, rubbing it across the smooth, yielding latex of her ass.`
        );

        this.outx(
            `\n\n"<i>I'm sorry, [Master],</i>" ${
                this.flags[kFLAGS.GOO_NAME]
            } mewls meekly, but the slut inside her starts wiggling her rump, her cheeks gently squeezing around your manhood.  Still, you 'tsk' at her as you begin to slowly rock your [hips], hotdogging yourself between her gropable buttcheeks, enjoying the onahole-like feel, even as latex lube starts to drip to the ground from between ${
                this.flags[kFLAGS.GOO_NAME]
            }'s legs, her body desperately announcing its desire to fuck.  Despite the orgasm that just wracked your body, you can feel your lust stirring, too, spurred on by the oral onslaught ${
                this.flags[kFLAGS.GOO_NAME]
            } attempted to inflict on you.  You give your [cock biggest] one last, rough thrust between her cheeks before pulling back, stroking yourself until your [cockHead biggest] presses against her lube-slicked cunt.  You rub the shaft of your prick along her slick, eager fuckhole, letting her liquid latex lube slosh out onto you as ${
                this.flags[kFLAGS.GOO_NAME]
            } continues to whorishly wiggle her ass, trying to entice you to feed her.`
        );
        this.outx(
            `\n\nOnce your [cock biggest] is nice and slick with her vaginal excretions, though, you pull back again and dig your fingers back into ${
                this.flags[kFLAGS.GOO_NAME]
            }'s ass, spreading her lush cheeks apart to reveal the tight little star of her backdoor.  ${
                this.flags[kFLAGS.GOO_NAME]
            } gasps as she feels your crown press against her asshole, her mouth opening wide as your oh-so-wet prick plunges the first inch into her without resistance.  You groan with satisfaction as her vice-tight hole squeezes down around your slick shaft, desperately, reflexively trying to repel the intruding cockmeat; but you're so slick, so covered in liquid latex that ${
                this.flags[kFLAGS.GOO_NAME]
            }'s stunned body can't resist you, and you begin to slide inch after inch into her, burying yourself to the hilt in a single long, painfully slow push.`
        );
        this.outx(
            `\n\nYou pause once you've hilted her, breathing deeply as you enjoy the intense squeeze her anus is applying to you, reveling in the sensation of smooth latex rubbing harshly along your goo-covered shaft, unable to gain traction.  Your fingers knead into ${
                this.flags[kFLAGS.GOO_NAME]
            }'s supple assflesh, working her cheeks like dough in your hands, roughly massaging her backside until she starts to relax around you.  "<i>Good girl,</i>" you whisper, reaching forward to stroke ${
                this.flags[kFLAGS.GOO_NAME]
            }'s hair.  "<i>That's a good girl, just relax.  Take it...  You wanted it so bad.</i>"`
        );
        this.outx(
            `\n\n"<i>I-I'm sorry, [Master],</i>" ${
                this.flags[kFLAGS.GOO_NAME]
            } repeats, her breath choking up as you grind your hips into her, pushing just a touch more prick into her ass.  "<i>I didn't mean to...  I'll be a good girl, I promise,</i>" she whines, groaning as you slowly pull out of her, retracting your cock until just the head remains.  "<i>Fuck me, [Master], pleeeeaaaassssseeee,</i>" she cries, "<i>just fuck me, fuck me, fuck me!</i>"`
        );
        this.outx(
            `\n\nYou grab her hips and slam forward, hilting yourself again in a single thrust. ${
                this.flags[kFLAGS.GOO_NAME]
            } cries out, her voice echoing in the distance as you roughly pound her asshole, thrusting into her again and again until you can feel yourself approaching your limit, the near-frictionless hole you're hammering too good to pass up.  But ${
                this.flags[kFLAGS.GOO_NAME]
            } still hasn't been properly put in her place.  You're supposed to be in control here, not her.  You protect her, feed her, care for her, and she still thinks she can control you.  Unacceptable.  You push back into her, forcing yourself in to the hilt, and stop.  You hold yourself utterly still, simply enjoying the smooth liquid feel of her latex-coated ass.`
        );
        this.outx(
            `\n\n"<i>M-[Master]?  Please...</i>" ${
                this.flags[kFLAGS.GOO_NAME]
            } begs, looking pleadingly over her shoulder.  "<i>I'm still so hungry...</i>"`
        );
        this.outx(
            `\n\nAs soon as she says "<i>hungry,</i>" you strike. With palm open, you level a harsh stroke across ${
                this.flags[kFLAGS.GOO_NAME]
            }'s backside, sending her ass quivering.  You gasp with delight as the force of your spank carries right through her, making the latex inside her jiggle wildly around your [cock biggest].  ${
                this.flags[kFLAGS.GOO_NAME]
            } sucks in breath through her onyx teeth, but looks back at you with a look filled with lust, as if she can sense how close you are.  She wiggles her ass again, almost invitingly.  You lash out again, spanking her hard enough to nearly knock the two of you over; then again, and again, each time nearly pushed over the edge by the jiggle in her butt after your attack.`
        );
        this.outx(
            `\n\nEventually, you can take no more.  You feel the rush of semen hurtling through your [cock biggest], and with one last smack, send yourself over the edge.  You throw your head back and roar your pleasure into the sky as cum pours out of your cock-slit and into ${
                this.flags[kFLAGS.GOO_NAME]
            }'s hungry ass, painting her ebony rectal walls white.  As spunk pours out of you, ${
                this.flags[kFLAGS.GOO_NAME]
            } moans lewdly, hungrily, an orgasmic look on her face as the pain of the spanking is replaced by the satisfaction of your seed flowing into her.`
        );
        this.outx(
            `\n\nWhen your second orgasm passes, you roll limply off of ${
                this.flags[kFLAGS.GOO_NAME]
            }, utterly sated.  Your [chest] heaving, you sigh peacefully as you close your heavy lids, eager to rest.  A moment later, though, you feel slick skin press against your own as ${
                this.flags[kFLAGS.GOO_NAME]
            } curls up beside you, her face inches from your own.  With a wan smile, you reach out and run your fingers through her hair before pulling her into a long kiss that leaves your own taste on your lips.`
        );
        // {Low happiness}
        if (this.gooHappiness() < 33)
            this.outx(
                `\n\n"<i>If it's always going to be like that, maybe... being here with you isn't going to be so bad after all,</i>" ${
                    this.flags[kFLAGS.GOO_NAME]
                } whispers.`
            );
        // {Moderate happiness}
        else if (this.gooHappiness() < 66)
            this.outx(
                '\n\n"<i>I\'m sorry I got so forceful, [name].  I enjoy serving you... I do.</i>"'
            );
        // {High happiness}
        else
            this.outx(
                `\n\n${
                    this.flags[kFLAGS.GOO_NAME]
                } nuzzles against you, her head coming to rest on your [chest].  "<i>Sorry, [name]. I didn't mean to try and force you.  I love you when you're so assertive, so... dominant.</i>"`
            );
        this.temp = 30;
        this.player.orgasm();
        this.dynStats("sen", -2);
        if (this.player.cumQ() >= 500) this.temp += 20;
        this.gooFluid(this.temp);
        // {Boost her happiness a tiny amount.}
        this.gooHappiness(5);
        this.gooObedience(5);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Dominant Fucking Her(F)
    // Requires obedience of 60+
    // Female Dominant Fuck (Goo No Futa)(F)
    private femalePCDomFucksLatexGoo(): void {
        this.clearOutput();
        this.outx(
            `You start to undress, remarking to ${
                this.flags[kFLAGS.GOO_NAME]
            } that you've got an itch she'd be great at scratching.  As if your language wasn't clear enough, you `
        );
        if (this.player.balls > 0) this.outx("lift your [sack] out of the way to ");
        else if (this.player.hasCock())
            this.outx(`lift your ${this.multiCockDescriptLight()} out of the way to `);
        this.outx("expose your [vagina], labia already engorged and rosy with lust.");

        // {NOT OBEDIENT ENOUGH}
        if (this.gooObedience() < 60) {
            if (this.gooFluid() < 33) this.outx("\n\nLicking her lips with unrepentant hunger");
            else if (this.gooFluid() < 66)
                this.outx("\n\nSticking her tongue against her cheek in consternation");
            else this.outx("\n\nRolling her eyes");
            this.outx(`, ${this.flags[kFLAGS.GOO_NAME]} `);
            if (this.gooObedience() < 20) this.outx("boldly retorts");
            else if (this.gooObedience() < 40) this.outx("answers snarkily");
            else this.outx("timidly protests");
            this.outx(
                ', "<i>No.  You can\'t make me.  I may be stuck in this camp and separated from my people, but I will not let myself be some sexual toy.</i>"  A trickle of inky lubricant between her legs'
            );
            if (this.flags[kFLAGS.GOO_DICK_LENGTH] > 0)
                this.outx(` and the rigidity of her ${this.gooCock()} have`);
            else this.outx(" has");
            this.outx(
                " you doubting that claim, but she seems resolute in her desire to avoid direct sex, for now."
            );
            if (this.gooFluid() < 15)
                this.outx(
                    "  Her hunger is palpable, perhaps it would be best if you simply 'fed' her soon?"
                );
            this.doNext(this.camp.returnToCampUseOneHour);
            this.gooObedience(-3);
            return;
        }
        // {OBEDIENT}
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } immediately goes down on all fours and bows in submission.  "<i>How would you like to fuck me, [Master]?</i>" she asks.`
        );
        this.outx(
            `\n\nTouching a finger to her chin, you raise her gaze to your own, commanding her in no uncertain terms to spread her legs.  You want to feel her onyx pussy grinding up against your own sultry box, clit buried in between her slippery labia.  She obeys, pliant slut that she is.  You finish undressing, and after tossing your [armor] aside, you slide right up against her, enjoying the smooth texture of her latex legs as they slide underneath your slick moisture.  There's a burst of warm electric heat in your groin when you contact ${
                this.flags[kFLAGS.GOO_NAME]
            }'s liquid-covered loins, delicious, lust-fueled fire that melts your restraint.`
        );
        this.outx(
            `\n\nImmediately, the sable slickness that coats ${
                this.flags[kFLAGS.GOO_NAME]
            }'s hairless snatch begins to cling to yours.  It feels slipperier than your own secretions, but the edges of the sexual oil patch quickly begin to dry as they're exposed to the air.  The hardening liquid latex tingles tightly around your vulva, snaring the outer surface of your sex in solid black.  This new sensation is far from unpleasant.  In fact, the constricting encasement heightens the onslaught of sapphic sensations assaulting you.`
        );
        if (this.flags[kFLAGS.GOO_DICK_LENGTH] > 0)
            this.outx(
                `  Meanwhile, the ${this.gooCock()} sways uselessly above the conjoined vaginas, leaking its own secretions as it's ignored.`
            );
        this.outx(
            "  Lost to the pleasure, you rock your [hips] back and forth, up and down, mindlessly rubbing yourself to new heights of ecstasy on your pet's super-slick snatch."
        );
        this.outx(
            "\n\nA sensual shiver rocks your world, assaulting your senses with its intensity.  Unthinkingly, you reach for your [chest]"
        );
        if (this.player.biggestTitSize() >= 1) {
            this.outx(", kneading your chest");
            if (this.player.lactationQ() > 50) {
                this.outx(" as milk ");
                if (this.player.lactationQ() < 200) this.outx("dribbles over your fingers");
                else if (this.player.lactationQ() < 500) this.outx("squirts out unhindered");
                else this.outx("sprays out in a fountain");
            }
        } else this.outx(", pinching your [nipples]");
        this.outx(
            `.  Arching your back, you grab hold of ${
                this.flags[kFLAGS.GOO_NAME]
            } by the ankles and drag her against you.  She whimpers at the pressure on her nethers, too sensitive to endure what you're forcing her to experience.  A high-pitched trill of excitement splits the air.  ${
                this.flags[kFLAGS.GOO_NAME]
            } is cumming, hard by the sounds of it.  Hot, inky discharge splatters across your [clit] and into your [vagina].`
        );
        if (this.player.hasCock())
            this.outx(
                `  Some of it even splats onto your ${this.multiCockDescriptLight()}, leaving tight black spots on your maleness.`
            );
        if (this.flags[kFLAGS.GOO_DICK_LENGTH] > 0)
            this.outx(
                `  Her ${this.gooCock()} practically bursts from within, distending to accommodate its lurid latex discharge.  Most of it splatters against ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s skin and rolls down her flesh in a march of onyx droplets.`
            );
        this.outx(
            "\n\nAs her essence burrows inside you, your [vagina] clenches of its own volition.  Your eyes roll back from the ecstasy your netherlips jolt into your spine, and you pull tighter on your toy's legs, dragging her oily quim tighter against your goo-gilt slit.  The two latex pussies gush and gleam with each other's hot lubricants.  They quiver feverishly, clits rigid and erect, happily sharing in feminine bliss.  There's two voices screaming, crying out to the heavens in mismatched harmony.  The higher one dies down to a low moan of contentment, and once your cunt slackens in the aftermath of your orgasm, you realize the second is your own."
        );
        this.outx(
            `\n\nYou mash your [vagina] against ${
                this.flags[kFLAGS.GOO_NAME]
            }'s a few more times to savor the aftershocks of climax.  She grunts each time, her mouth widening into simple 'o's.  The sensuously skinned lady fails can't even scream any more.  The best she can do is moan, low and lewd as you finish using her.  As you slowly begin to separate, a tangle of sable webs hangs in the air, glittering with a coating of femcum.  Some of them are already semi-solid and snap at your withdrawal.  The others just come apart, wetly slapping against each twat as they separate.`
        );
        this.outx(
            "\n\nRising, you examine your [vagina].  In addition to being so heavy and wet, it's coated with a solid sheet of latex.  You've no doubt it would hurt to remove"
        );
        if (this.player.findPerk(PerkLib.Masochist) >= 0)
            this.outx(
                `, so you do, gleefully stripping the material from your skin.  Juices gush from your [vagina] as you torture your mons with masochistic pleasure, peeling the adhesive substance away to reveal pain-reddened skin.  ${
                    this.flags[kFLAGS.GOO_NAME]
                } looks up at you in awe, and with a shudder, you pat her on the head.  "<i>Good pet.</i>"`
            );
        // {ALT:
        else {
            this.outx(
                ".  Of course, you've got a pet right here that's already an obedient little cunt-cleaner.  You plant your [vagina] right on her face and command, \"<i>Lick it clean.</i>\""
            );
            this.outx(
                `\n\n${
                    this.flags[kFLAGS.GOO_NAME]
                } enthusiastically puts her tongue to work, and at her touch, the inky substance melts away.  The parting fluid washes you with warmth as it vanishes into your pet's mouth, one drop at a time.  She greedily devours her leavings along with your copious, post-orgasmic lubrication, hungrily devouring it all.  Her tongue dives inside you to clean out your passageway.  Pistoning back and forth, she fucks you with it, making a meal for herself and carrying the liquid latex away on waves of your own lady-lubricants.  ${
                    this.flags[kFLAGS.GOO_NAME]
                } appears intent on slaking her unnatural thirst, and she continues to stimulate and drink long past when you think she'd be done.`
            );
            // {FIRST TIME}
            if (this.flags[kFLAGS.LATEX_GOO_TIMES_FEMDOMMED_BY_PC] == 0) {
                this.outx(
                    `\n\n${
                        this.flags[kFLAGS.GOO_NAME]
                    } will not relent.  You command her, "<i>Stop, I'm clean!</i>"  She doesn't.  You push her away with a [foot], nearly dropping as two feet of tongue unspool from your tongue-gaped vagina.  She pants up at you, then tries again.  You boot her back down, this time pinning her under a leg.  ${
                        this.flags[kFLAGS.GOO_NAME]
                    }'s tongue reaches out, but you grab it in your hand and push her forehead back down with her other.  She whimpers.  Calmly, you tell her that next time you request a cleaning, she had better stop on command.`
                );
                this.outx(
                    `\n\n${
                        this.flags[kFLAGS.GOO_NAME]
                    } blinks raven-hued tears away, understanding at last.  You release her and step rise, feeling a twinge of fresh arousal.  Your pet appears humbled but sated.  Best of all, she's left a puddle of onyx cunt-juice below her, freshly excreted while she was restrained.  Good girl.`
                );
            }
            // {REPEAT}
            else
                this.outx(
                    `\n\n${
                        this.flags[kFLAGS.GOO_NAME]
                    } obeys, remembering the last time.  Two feet of tongue unspool from your [vagina] as she retracts it.  Her shining face obediently lowers in a bow, but you swear you can see a smile twisting the corners of her mouth.  You tell her she's a good pet, and a fresh flow of wetness escapes from her nethers.`
                );
            this.flags[kFLAGS.LATEX_GOO_TIMES_FEMDOMMED_BY_PC]++;
        }
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.gooFluid(5 + this.player.wetness() * 2);
        this.gooObedience(5);
        this.gooHappiness(2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // Female Dominant Fuck (Goo IS Futa)(F)
    private femalePCDomFucksLatexGooFuta(): void {
        this.clearOutput();
        this.outx(
            `You begin to remove your [armor] under ${
                this.flags[kFLAGS.GOO_NAME]
            }'s curious eye.  She asks, "<i>[name], what are you doing?</i>"`
        );
        this.outx(
            `\n\nWith a salacious wiggle of your [hips], you tell her that you're going to fuck her - to ride her shining pole to orgasm after orgasm.  ${
                this.flags[kFLAGS.GOO_NAME]
            }'s ${this.gooCock()} immediately stiffens, hard and proud.  `
        );
        // {NOT OBEDIENT ENOUGH}
        if (this.gooObedience() < 60) {
            if (this.gooFluid() < 33) this.outx("Licking her lips with unrepentant hunger");
            else if (this.gooFluid() < 66)
                this.outx("Sticking her tongue against her cheek in consternation");
            else this.outx("Rolling her eyes");
            this.outx(`, ${this.flags[kFLAGS.GOO_NAME]} `);
            if (this.gooObedience() < 20) this.outx("boldly retorts");
            else if (this.gooObedience() < 40) this.outx("answers snarkily");
            else this.outx("timidly protests");
            this.outx(
                `, "<i>No.  You can't make me.  I may be stuck in this camp and separated from my people, but I will not let myself be some sexual toy.</i>"  A trickle of inky lubricant between her legs and the rigidity of her ${this.gooCock()} have you doubting that claim, but she seems resolute in her desire to avoid direct sex, for now.`
            );
            if (this.gooFluid() < 10)
                this.outx(
                    "  Her hunger is palpable, perhaps it would be best if you simply 'fed' her soon?"
                );
            this.gooObedience(-3);
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // {OBEDIENT ENOUGH}
        this.outx(
            'At first, she reaches down to touch herself, so aroused by the idea she wants to get started right away, but she remembers her place and stops.  The ebony slave-girl asks, "<i>Shall I sit down for you to ride me, [Master]?  Or would you rather I mount you?</i>"'
        );
        this.outx(
            `\n\nYou tell her that you're in charge, so you'll be on top.  ${
                this.flags[kFLAGS.GOO_NAME]
            } smiles broadly and splays herself out on the ground, reclining against a sizable boulder.  Her `
        );
        if (this.gooFluid() > 60) this.outx("nicely plumped ");
        this.outx(
            `rump bulges out a bit when she settles out on it, and you pause a moment to admire the curvy onyx shape before you.  Her ${this.gooCock()} stiffens before your eyes.  Its reflective obsidian skin slowly goes taut, making it shine in the light.  Bigger and bigger, it grows until it reaches its limit, and even then, ${
                this.flags[kFLAGS.GOO_NAME]
            }'s erection plumps a little further, like a sausage stuffed a little too full.  You gingerly touch it, and it rewards your curiosity with a bead of black pre-goo.`
        );
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } lewdly moans, "<i>Oooooh... I always loved making these things...</i>"`
        );
        this.outx(
            `\n\nYou gently pat the ${this.gooCock()} and snicker at her - of course she did.  How fortuitous that she'll get to be your dildo today, then.  You stroke the iron-hard penis with a thumb and it jumps high, bouncing up towards the contact like a cat wanting to be petted.  Snickering, you brush through the black bubble, smearing pre-cum up and down over the turgid erection.  The liquid latex pre-cum quickly dries on your hand to give it the appearance of a gloss-black glove.  You figure you may as well complete the look, and after switching hands, you have matching mitts.  The latex woman's tool remains defiantly unchanged by her pre-cum - it seems to absorb directly into her skin once it dries, leaving it as slippery and black as ever.  As fun as this is, you don't want her to blow just yet, at least not until you've had your fun.`
        );
        this.outx(
            `\n\nGrabbing it by the base, you angle the ${this.gooCock()} up towards you.  Its tip thickens noticeably as if reading your intentions.  You swivel your [hips] around to hover above it, and without preamble, you push down, absorbing the slippery latex dick into your slick passage.  Between its pre-cum and your own lubricants, the penetration is blessedly easy.`
        );
        if (
            (this.flags[kFLAGS.GOO_DICK_LENGTH] * this.flags[kFLAGS.GOO_DICK_LENGTH]) / 6 >
            this.player.vaginalCapacity()
        )
            this.outx(
                "  Of course, as gigantic as it is, you can't take all of it, but you do your damnedest to try."
            );
        else
            this.outx(
                `  Soon, your [butt] comes to rest against ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s oily skin, her erection nestled nicely inside you.`
            );
        this.outx(
            `  You take a few experimental bounces, enjoying the feeling of that ${this.gooCock()} pressing on your folds and stirring against your insides.  Your pet reaches up to grab onto your [hips] for support.  She pants `
        );
        if (this.player.isTaur()) this.outx("into your haunches");
        else if (this.player.tallness >= 84) this.outx("against your side");
        else if (this.player.tallness >= 70) this.outx("into your shoulder");
        else if (this.player.tallness >= 60) this.outx("into your neck");
        else this.outx("over your head");
        this.outx(", trying to pull herself up against you, deeper inside you.");
        this.player.cuntChange(
            (this.flags[kFLAGS.GOO_DICK_LENGTH] * this.flags[kFLAGS.GOO_DICK_LENGTH]) / 6,
            true,
            true,
            false
        );

        this.outx(`\n\nYou bounce atop ${this.flags[kFLAGS.GOO_NAME]} faster and faster`);
        if (
            (this.flags[kFLAGS.GOO_DICK_LENGTH] * this.flags[kFLAGS.GOO_DICK_LENGTH]) / 6 <=
            this.player.vaginalCapacity()
        )
            this.outx(", your [butt] clapping wetly against her onyx thighs");
        this.outx(
            `.  All too soon, you feel a telltale twitching of the ${this.gooCock()} inside you, and before you can stop it, a thick, slick feeling of warmth radiates outward from your womb.  Accompanying the explosion of moisture and bodily heat, a gradual pressure wells up in your womb, culminating in an explosion of slick sable goop that `
        );
        if (this.flags[kFLAGS.GOO_DICK_TYPE] == CockTypesEnum.DOG)
            this.outx("stays trapped inside you thanks to your pet's thick knot");
        else this.outx("sprays out of your [vagina]");
        this.outx(
            '.  You look over your shoulder and scold, "<i>I didn\'t give you permission to cum!</i>"'
        );

        this.outx(
            `\n\n"<i>I couldn't stop myself, [Master]...  You feel too good!  It's like a vice made out of honey just wringing me dry!</i>" ${
                this.flags[kFLAGS.GOO_NAME]
            } blurts.  Well, it's hard to be mad with a proclamation like that.  She goes on to say, "<i>Don't worry, I'll stay hard.  I'm a goo-girl, remember?  Shifting a little bodily fluid around is nothing.</i>"`
        );
        this.outx("\n\nDeciding that you'll forgive her for now");
        if (!this.player.isTaur()) {
            this.outx(", you turn around to face her, pressing your [chest] into hers.");
            if (this.flags[kFLAGS.GOO_NIPPLE_TYPE] == -1) {
                this.outx("  Her nipple-cunts ");
                if (this.player.hasFuckableNipples()) this.outx("kiss yours");
                else this.outx("swallow your nipples");
                this.outx(".");
            } else if (this.flags[kFLAGS.GOO_NIPPLE_TYPE] == 1) {
                this.outx("  Her nipple-cocks ");
                if (!this.player.hasFuckableNipples())
                    this.outx("smear over the tops of your tits");
                else this.outx("disappear into your nipplecunts");
                this.outx(".");
            } else {
                this.outx("  Her nipples ");
                if (!this.player.hasFuckableNipples()) this.outx("rub all over your own");
                else this.outx("dock into your nipple-cunts");
                this.outx(".");
            }
        } else this.outx(", you begin to fondle your [nipples] and bounce haunches on her lap.");
        this.outx(
            "  Gods, you could get used to this!  You spare a glance to your [vagina] and recoil when you see how your mound has been gilt with black latex.  It makes sense, but it startles you all the same.  Grunting, you resume fucking her, feeling her gooey cum squirting out of the messy onyx creampie she's turned your pussy into.  Beneath her, a puddle of her lubricants mixed with cum has formed."
        );
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } begs, "<i>May I kiss you, please [Master]?  I-I'm gonna cum soon!</i>"`
        );
        this.outx(
            "\n\nAgain?  Feeling a little generous, or maybe just horny, you award her a nod.  She can kiss you.  "
        );
        if (this.player.isTaur())
            this.outx(
                "The latex woman wastes no time in bending double to kiss your equine ass, even darting forward to smooch your tender ring."
            );
        else
            this.outx(
                "The latex woman wastes no time in placing her glossy lips against yours, even plunging her slick tongue into your mouth."
            );
        this.outx(
            "  Her passionate kisses and twitching boner overwhelm your senses, and before you can warn her, you cum."
        );
        this.outx(
            `\n\nYou clench down on the ${this.gooCock()} without warning, immediately setting to massaging it with your velvety interior.  Your pussy seems to know just what to do in order to get what it wants, and ${
                this.flags[kFLAGS.GOO_NAME]
            } is no match.  She stutters, "<i>G-g-g-onna... OHGODS!</i>" and begins to spurt, sputtering streams of onyx goop straight into your womb.  Her lips crush back into place, silencing her whimpers of bliss`
        );
        if (!this.player.isTaur()) this.outx(" along with your own");
        this.outx(".  Together, the two of you give in to ecstasy and cum... and cum... and cum.");
        if (this.player.hasCock())
            this.outx(
                `  White erupts from your ${this.multiCockDescriptLight()} with abandon.  You don't even care that it stains ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s ${this.gooTits()}.  It feels so good and she looks so pretty with strands of icing spattering over top of her.`
            );
        if (this.player.hasCock() && this.player.cumQ() >= 750)
            this.outx("  Of course, you quickly bury those strands in a wave of alabaster.");
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } hugs you tight as she finishes unloading inside you.  Those last few squirts of sable spunk make your cunny feel like a mush of pleasure.  Sighing contentedly, you rise up off of your conquest`
        );
        if (this.flags[kFLAGS.GOO_DICK_TYPE] == CockTypesEnum.DOG)
            this.outx(", ignoring the loud 'pop' of her knot slipping free,");
        this.outx(
            " and present your stained vagina to her face.  She knows what to do, and immediately sets to cleaning it with her tongue.  Over two feet of flexible mouth muscle burrow into your [vagina], and the pleasant caresses let you know just much your pet enjoys this task.  She devours her sticky spunk and your female fluids with ardor, never slowing in her task.  Even when you're sure that you're clean, she keeps going, inciting tingles of fresh lust from your body."
        );
        this.outx("\n\nThat will not do.  You command her to stop");
        if (this.flags[kFLAGS.LATEX_GOO_TIMES_FEMDOMMED_BY_PC] > 0)
            this.outx(
                ", and obediently, she does.  To reward her for being a good pet, you give her a deep tongue kiss."
            );
        else {
            this.outx(
                `, but the order goes unheeded.  ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s nose disappears into the slimy mess that your pussy has become, pressing deeper and harder to gluttonously devour your juices.  Tired of her insubordination, you shove her back, shuddering when inch after inch of slithering tongue slides free.  The sensuously-skinned slut immediately tries to get back up, but you force her down and slap her, right across the face.  She stops cold, slowly raising a hand to her cheek.  Glittery black tears escape from her eyes as she apologizes, "<i>I'm sorry!  I'm sorry!  I'll be good, I'll be good!  I promise!</i>"`
            );
            this.outx(
                "\n\nYou nod, and then, before she can dwell on her punishment, you give her a kiss.  She blushes purple afterward, giggling into her palm."
            );
        }
        this.outx(
            "  You get dressed and leave with a swagger in your step.  A smiling, solid goo-girl sits in your wake."
        );
        this.player.orgasm();
        this.dynStats("sen", -2);
        this.player.slimeFeed();
        this.flags[kFLAGS.LATEX_GOO_TIMES_FEMDOMMED_BY_PC]++;
        this.gooFluid(5 + this.player.wetness() * 2);
        this.gooObedience(4);
        this.gooHappiness(2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Male Dominant Fuck(F)
    private malePCDomFucksLatexGoo(): void {
        this.clearOutput();
        this.outx(
            `You open your [armor] to expose your ${this.multiCockDescriptLight()} to your latex-based lover.  She eyes it with unabashed affection and licks her lips unthinkingly, already tasting the flavor of semen on her tongue.  ${
                this.flags[kFLAGS.GOO_NAME]
            } jolts out of her reverie to ask, "<i>What are you doing`
        );
        if (this.gooObedience() > 50) this.outx(", [Master]");
        this.outx('?</i>"');
        this.outx(
            `\n\nYou take her chin in your palm and tilt her up to look at you as you explain.  You intend to fuck her nice and hard.  Then, you're going to blow a nice thick load in her stretchy, gooey little pussy until there's ribbons of white dripping out of her slit.  ${
                this.flags[kFLAGS.GOO_NAME]
            } blushes violet at your proclamation.  Between her knees, a few drops fall unbidden to the ground.  Solid black nipple`
        );
        if (this.flags[kFLAGS.GOO_NIPPLE_TYPE] == 1) this.outx("-cock");
        this.outx("s harden on her chest, jutting out and just begging to be sucked.");
        // {NOT OBEDIENT ENOUGH}
        if (this.gooObedience() < 60) {
            if (this.gooFluid() < 33) this.outx("\n\nLicking her lips with unrepentant hunger");
            else if (this.gooFluid() < 66)
                this.outx("\n\nSticking her tongue against her cheek in consternation");
            else this.outx("\n\nRolling her eyes");
            this.outx(`, ${this.flags[kFLAGS.GOO_NAME]} `);
            if (this.gooObedience() < 20) this.outx("boldly retorts");
            else if (this.gooObedience() < 40) this.outx("answers snarkily");
            else this.outx("timidly protests");
            this.outx(
                ', "<i>No.  You can\'t make me.  I may be stuck in this camp and separated from my people, but I will not let myself be some sexual toy.</i>"  The trickle of inky lubricant between her legs'
            );
            if (this.flags[kFLAGS.GOO_DICK_LENGTH] > 0)
                this.outx(` and the rigidity of her ${this.gooCock()} have`);
            else this.outx(" has");
            this.outx(
                " you doubting that claim, but she seems resolute in her desire to avoid direct sex, at least until you train her a bit better."
            );
            if (this.gooFluid() < 10)
                this.outx(
                    "  Her hunger is palpable, perhaps it would be best if you simply 'fed' her soon?"
                );
            this.gooObedience(-3);
            this.doNext(this.camp.returnToCampUseOneHour);
            return;
        }
        // {OBEDIENT ENOUGH}
        this.outx(
            `\n\nBlowing you a seductive kiss, ${
                this.flags[kFLAGS.GOO_NAME]
            } purrs, "<i>And how would you like to take me today, [Master]?  In my ass?  In my pussy?  Or do you want to fuck my mouth?</i>"`
        );
        this.outx(
            '\n\nPointing down, you instruct her that you intend to take advantage of all three.  The rubbery slut squeals with glee and drops to her knees before you, giggling, "<i>I bet I can make you cum in each of them, [Master]!</i>"  '
        );
        if (this.player.cor < 33) this.outx("Smiling");
        else if (this.player.cor < 66) this.outx("Smiling knowingly");
        else this.outx("Tired of her blather");
        this.outx(
            ", you grab her by the head and pull her forward.  She gets the idea and spreads her mouth into a wide 'O', just in time for [oneCock] to pop inside, sliding through the onyx opening with an accompanying groan of delight from your throat.  Your lover's gooey neck allows you to enter it, "
        );
        if (this.player.biggestCockArea() < 80) this.outx("easily encompassing your erection");
        else
            this.outx(
                "gleefully stretching into a mold of your erection as it passes into her core"
            );
        this.outx(
            `.  Past her mouth, her insides become far less solid.  It feels like a mass of warm goo that deep inside her, and combined with the feel of her slippery tongue caressing the underside of your ${this.cockDescript(
                0
            )}, you feel like you're in heaven.`
        );
        if (this.player.cockTotal() > 1) {
            this.outx("  It gets even better when she grabs your remaining member");
            if (this.player.cockTotal() > 2) this.outx("s");
            this.outx(" and starts to pump with sure strokes.");
        }
        this.outx(
            `\n\n${this.flags[kFLAGS.GOO_NAME]}'s vibrant ${
                this.flags[kFLAGS.GOO_EYES]
            } eyes look up at you as her cheeks hollow to provide suction.  You groan again, this time slowly pulling her head back.  As she withdraws, her slick black spit drips from your dick, though much of it gradually hardens into a reflective sheath for your tool.  You draw her off until only your ${this.player.cockHead()} remains inside that suckling pleasure-hole.  Then, you slam her down, fucking her mouth`
        );
        if (this.player.biggestCockArea() >= 10 && this.player.biggestCockArea() < 50)
            this.outx(" and throat");
        else if (this.player.biggestCockArea() >= 50) this.outx(", throat, and body");
        this.outx(" with quick strokes.  Faster and faster you bounce her on your loins");
        if (this.player.biggestCockArea() >= 80)
            this.outx(", amazed that she can take so much so easily");
        this.outx(
            ".  Best of all, her eyes never stop looking up at you, imploring you to cum, to release and stuff her face with spunk."
        );
        this.outx(
            `\n\nWith her looking at you like that, fuck... you're cumming!  You pull her lips tight into your abdominal ${this.player.skinFurScales()} and release the boiling bliss within you.  Your jizz jumps out of you in thick ropes, as if it was seeking to escape all this time and just now found freedom.  ${
                this.flags[kFLAGS.GOO_NAME]
            } smiles around your ${this.cockDescript(
                0
            )} as it pumps its virile goo down her throat, and she grabs hold of your [butt] to press herself against you harder.`
        );
        if (this.player.cumQ() >= 500)
            this.outx(
                `  Squirts of spooge run out of her nostrils after a particularly potent blast, but ${
                    this.flags[kFLAGS.GOO_NAME]
                } doesn't mind or even break her gaze.`
            );
        if (this.player.cumQ() >= 1000)
            this.outx(
                "  Your copious spunk rounds her belly, but most of that liquid weight transfers to her tits, hips, and ass in moments."
            );
        if (this.player.cumQ() >= 4000)
            this.outx(
                "  That isn't enough to keep up with your potency.  A moment later, the corners of her mouth begin to ooze alabaster, squirting out with each pulse.  Poor girl."
            );
        this.outx("  Once finished, you pull her off and leave her to pant for breath.");

        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } licks her lips and admires the latex sheath her spit has molded around [oneCock].  "<i>One hole down, [Master].</i>"  She holds up a hand, fingertips lengthening as they grow razor-sharp nails.  Those prickly claws press into your `
        );
        if (this.player.balls > 0) this.outx("[sack]");
        else this.outx("[cock biggest]");
        this.outx(
            ` without warning, and you hold very, very still.  They stroke you with immaculate, teasing care, somehow feeling good in spite of the traceries of red irritation they leave in their wake.  ${
                this.flags[kFLAGS.GOO_NAME]
            } tickles them across your taint longingly before retracting them wistfully and asking, "<i>Are you ready for my pussy?</i>"`
        );
        this.outx(
            "\n\nPivoting around, the horny sextoy wiggles her ass in front of you to tease.  The rounded rump jiggles ever so slightly with each shake, reflecting the light as the ripples run across each plump cheek.  A fresh surge of blood to your genitals informs you that yes, you are ready for her pussy.  You grab hold of the ebony seductress by her narrow waistline and spank her for daring to scratch your "
        );
        if (this.player.balls > 0) this.outx("balls");
        else this.outx("cock");
        this.outx(
            ".  She whines, but wiggles back in your direction, staying locked on her target in spite of the punishment.  An ebony slit, so warm and wet that it feels like it's blowing steam onto your erection, closes the few inches of separating air."
        );
        this.outx(
            `\n\nThe teases have the desired effect on you, and you yank her down on your ${this.cockDescript(
                0
            )}.  Like her mouth and throat, her cunt quickly goes gooey once you get past her feminine lips.  Inside, she feels like a combination of warm gelatin and vagina, having all the flexibility and yielding nature of the former combined with the exquisitely textured interior of the latter.  The sensuous, smooth surface of ${
                this.flags[kFLAGS.GOO_NAME]
            }'s ass rubs over your [hips] as her cunt swallows the entirety of your prick.  Tendrils of inescapable excitement worm their way up your spine, fed by your stiff manhood's orgasm-induced sensitivity.  They send you into what can only be described as a sexual frenzy.`
        );
        this.outx(
            `\n\nYou grab ${
                this.flags[kFLAGS.GOO_NAME]
            }'s hair and pull in between strokes, forcing her to arch her back and display her body in a more pleasing manner.  Smack, smack, smack...  Your [hips] clap against her, growing faster with every moment.  Your hapless fuck-partner whines from pain and excitement, gushing black wetness across your [legs] as she cums.  You spank her rounded bottom again, and as the ripples of your vibration massage your ${this.cockDescript(
                0
            )}, you cum again.  Her slick snatch greedily devours the first few spurts your body can offer up.  It even massages your length from root to ${this.player.cockHead()} to coax out more.`
        );
        if (this.player.cumQ() >= 1000)
            this.outx(
                "  This quickly bloats her into a pregnant-looking state, and after her last injection, she has nowhere to metabolize it all."
            );
        if (this.player.cumQ() >= 2000)
            this.outx(
                "  You keep going until a torrent of alabaster seed is running out of her cunt around your cock.  Glorious."
            );
        if (this.flags[kFLAGS.GOO_DICK_LENGTH] > 0)
            this.outx(
                `  The ${this.gooCock()} below noisily fires inky loads into the dirt, where it's quickly absorbed.`
            );

        this.outx(
            `\n\nStaggering back, you rest against a boulder.  In the process, your ${this.cockDescript(
                0
            )} exits ${
                this.flags[kFLAGS.GOO_NAME]
            }'s swelteringly sticky slit.  Webs of glittering black lube dangle from your tip to her entrance, mixed with spermy strands of semen.  Transfixed, you watch them break, one by one snapping back to the closest set of genitals.  A bubbly voice cheers, "<i>That's number two!`
        );
        if (this.player.cumQ() >= 1000)
            this.outx("  And so messy!  I don't know if I can hold any more!");
        this.outx(
            `</i>"  A hand that appears to be wearing a latex glove smears the juices that hang from ${
                this.flags[kFLAGS.GOO_NAME]
            }'s mound up and through her crack, coating her asshole with your leftover sperm.`
        );
        this.outx(
            "\n\nYou're breathing hard and more than a little exhausted from cumming back to back.  Still, there's a bubbly latex butt just a few feet away, bouncing back and forth hypnotically.  You did say you were going to cream all three holes, didn't you?"
        );
        this.outx(
            `\n\n"<i>Come on, [Master],</i>" ${
                this.flags[kFLAGS.GOO_NAME]
            } cheers, "<i>I'm all ready for your cock... just put it in and I'll take all the cum you've got.</i>"`
        );
        this.outx(
            `\n\nLike hell!  You stagger up from your impromptu brace and grab hold of your sensuous slut once again, this time lining up with her asshole.  You're in charge here, and by gods, you're going to outfuck her!  You spank her bottom on the cheek you've ignored up to now, setting it bouncing.  Before the waves of enticing jiggles can settle, you lurch your [hips] forward and stuff your ${this.cockDescript(
                0
            )} straight into the crinkled latex asshole.  The ebony pucker stretches obscenely around your girth, much tighter than the other two holes you've plumbed today.  Inch after inch of semi-turgid dick-flesh passes into the goo-woman's anus, but not without some difficulty.`
        );
        this.outx(
            `\n\nOnce fully inside, her tight sphincter clamps on your ${this.cockDescript(
                0
            )} like a cock-ring, trapping the blood inside so that it gets harder and harder.  Your erection has no trouble returning to full mast with her anal aid, and with freshened lust, you begin to bounce that sable booty on your manhood.  Beyond the tight circle, the familiar, pliant goo you've come to love begins to massage you with liquid pressure.  Waves of force roll all along your length, lapping at it like a dozen tongues, all while you're kept super-hard by her entrance.`
        );
        this.outx(
            `\n\nAgain and again, you claim your prize's anal star.  Your hips seem to go on autopilot, plumbing that black butthole with rough passion.  Squirts of gooey ink and leftover, smeared spunk dribble out as you fuck her, and you grab hold of her ${this.gooTits()}, as if a handhold would help you wrangle the unruly pleasure any better.  ${
                this.flags[kFLAGS.GOO_NAME]
            } moans, "<i>Oh, [name]!  Fuck my ass!  Spank me and abuse me, then cum in my ass and tell me how I'm yours!</i>"`
        );
        this.outx(
            "\n\nYou growl and slap her tit for daring to order you around.  It makes her butt squeeze you even harder.  Still, you figure a slut with a little initiative is a good slut, and she showed initiative to beg so creatively.  You reward her by giving her what she wants.  SMACK!  Your hand falls on her backside with a broad blow that you can feel all the way inside her.  She whimpers and drips in answer, so you do it again, this time on the other side.  A bigger rain of drips escapes her this time.  You work the blows into your rhythm - bounce in, bounce out, slap, bounce in, bounce out, slap...  Fuck, she's too tight, and you're too sensitive to hold it in."
        );
        this.outx(
            `\n\nYou cry out, "<i>Here it comes!</i>" and hilt yourself inside your latex pet, pinching her nipples hard as you begin to unload inside her.  She trembles beneath you, whining in a high-pitched voice as you whisper, "<i>My pet...</i>" into her ear.  While your cock does its best to inseminate the gooey woman, you keep whispering to her, explaining that she is yours, body and soul, to be used and abused.  You even begin to mention kinky ways you can take advantage of her unique form, filling her mind with ideas for future submission as your ${this.cockDescript(
                0
            )} fills the rest of her.`
        );
        if (this.player.cumQ() >= 1000)
            this.outx(
                "  Almost immediately, cream drips out around her ass and over your [legs].  She's just too full to take much more - your cum has nowhere to go but out!"
            );
        if (this.player.cumQ() >= 2000) {
            this.outx("  You cum so much that your spunk forms a nice sized ");
            if (this.player.cumQ() < 4000) this.outx("puddle");
            else this.outx("lake");
            this.outx(".");
        }
        this.outx(
            `\n\n${
                this.flags[kFLAGS.GOO_NAME]
            } slides off you, going flat on the ground and into a puddle `
        );
        if (this.player.cumQ() >= 1000) this.outx("of mixed fluids");
        else this.outx("of her own leftover sex-juice");
        this.outx(
            ".  Every now and again, her butt lifts slightly and jiggles, then lowers.  She's whimpering and twitching, riding the aftershocks of her own orgasm.  You're exhausted, but you stand triumphant.  You fucked your latex slave in all three of her holes and outlasted her to boot."
        );
        this.outx(
            `\n\nAs you get dressed, you realize your ${this.cockDescript(
                0
            )} is totally clean.  It appears glossy, as if shined with spit, but there is no latex residue on it.  Somehow, her asshole must have absorbed her dried girl-cum and saliva back into her.  You didn't expect to get cleaner from anal sex, but it certainly let you end on a high note.  You get dressed with a swagger in your step and head back to the center of camp.`
        );
        this.outx('\n\nIn your absence, a tired voice sighs, "<i>That\'s... three.</i>"');
        this.temp = 15;
        this.player.orgasm();
        this.dynStats("sen", -2);
        if (this.player.cumQ() >= 500) this.temp += 10;
        if (this.player.cumQ() >= 1000) this.temp += 10;
        if (this.player.cumQ() >= 1500) this.temp += 10;
        if (this.player.cumQ() >= 2000) this.temp += 10;
        this.gooFluid(this.temp);
        this.fatigue(10);
        this.gooObedience(4);
        this.gooHappiness(2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // Savin Really Wants to Breastfeed Latexy Because He's a Weird Milk Fetishist Like That
    // Mmm milk
    // [Requirements: PC must be lactating, of course, and have C+ cup tits. Also high Happiness because I like lovey dovey stuff, okay?]
    private feedLatexySomeMilk(): void {
        this.clearOutput();
        this.outx(
            `You cup your hands under your milk-laden breasts and ask ${
                this.flags[kFLAGS.GOO_NAME]
            } if she's hungry.`
        );
        // {Not hungry}
        if (this.gooFluid() >= 66)
            this.outx(
                '  She shrugs, but gives you a little smile as she sidles closer to you. "<i>No, but if you need to lighten your load... I\'m your girl!</i>"'
            );
        // {Middling hungry}
        else if (this.gooFluid() >= 33)
            this.outx(
                "  She licks her lips in response to your offer, obviously ready for a taste of your delicious milk."
            );
        // {Really fucking hungry}
        else
            this.outx(
                `  Before you've even completed your offer, ${
                    this.flags[kFLAGS.GOO_NAME]
                } is on you like a moth to a flame, eagerly pulling at your clothes to try and free your teats.`
            );
        this.outx(
            `\n\nYou lead ${
                this.flags[kFLAGS.GOO_NAME]
            } off to a nearby rock, and pull yourself up to a sitting position.  With a smile, your latex girl curls up on your lap, her soft, smooth arms affectionately wrapped around your shoulders.  You spare a moment to brush her long, sleek hair, running your fingers through the smooth strands as your other hand works to strip off your [armor].  Eventually, you disrobe, your milky teats popping free of your garments, [nipples] stiffening in the cool air.  ${
                this.flags[kFLAGS.GOO_NAME]
            } opens her mouth hungrily, but to your surprise, presses her lips to yours before she drinks, locking you in a long, loving kiss.  You return her affection, holding her tight against you, embracing the hungry goo before finally guiding her head down to your needy [chest].`
        );
        this.outx(
            `\n\nA tiny gasp escapes your lips as ${
                this.flags[kFLAGS.GOO_NAME]
            }'s cool, smooth lips brush against your stiff nipple, the tip of her tongue just brushing against your sensitive flesh.  You moan as her full ebony lips finally lock around your teat, her long fingers holding your full breast as the first little suckle brings a drop of milk from within you, depositing it squarely into ${
                this.flags[kFLAGS.GOO_NAME]
            }'s waiting palate.  A moment later, a full stream is pouring forth from you, your latex goo's oral skill tapping deep into your lactic reserves.  You roll your head back and moan lustily as ${
                this.flags[kFLAGS.GOO_NAME]
            } suckles eagerly from you, her cheeks bulging slightly between each swallow, struggling to keep up with the flood of breastmilk she's taking from you.`
        );
        this.outx(
            `\n\n"<i>Delicious,</i>" ${
                this.flags[kFLAGS.GOO_NAME]
            } says with a grin, popping off one of your teats to tend to the other, leaving thick trails of sable saliva connecting her lips to your nipple until you brush them away with your thumb, your finger caressing her chin and cheek.  She nuzzles your hand, a sound not unlike a purr escaping her lips before she slips down, rubbing her cheek against your other breast.  "<i>Mmm, I love the taste,</i>" she giggles girlishly, resting her head a moment on your chest.  "<i>You're wonderful, [name].  So good.</i>"`
        );
        this.outx(
            `\n\nYou smile and ruffle ${
                this.flags[kFLAGS.GOO_NAME]
            }'s hair, giving her a gentle nudge toward your other needy tit.  Rather than suckle, she plants a quick kiss right on the tip of your [nipple], sending a shiver of pleasure rolling through you.  Before you've recovered, ${
                this.flags[kFLAGS.GOO_NAME]
            }'s attached herself to you, her hands wrapped tight around your breast as her tongue flicks across your teat, teasing the first droplets of milk from you.  As she urges your first drops into a proper stream of warm, wonderful milk, you curl your fingers through ${
                this.flags[kFLAGS.GOO_NAME]
            }'s hair and pull her tight against you, gently arching your back so that her face is wholly buried in your milky bosom.  She giggles into your titflesh, her laugh letting tiny rivulets of milk trickle down her chin and onto her own massive bosom, the contrast of white smearing onto black catching your eye even as her ebony tongue swirls around your sensitive bud.`
        );
        // {elseif PC has both}
        if (this.player.hasCock() && this.player.hasVagina())
            this.outx(
                `\n\nAs she suckles, ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s hands wander downward, her fingers brushing tantalizingly across your supple flesh until her smooth tips find your dual genitals.  One hand quickly wraps around your half-turgid shaft as the other plunges into your slick and eager fuckhole, both aroused and ready by the teasing and suckling you're getting.  ${
                    this.flags[kFLAGS.GOO_NAME]
                } moves her hands in unison, one drawing up to the crown of your [cock biggest] as the other plunges deep into your vaginal depths before both release, pulling down to the base or withdrawing to the tips before going again and again.`
            );
        // {If PC has a cock}
        else if (this.player.hasCock()) {
            this.outx(
                `\n\nAs she suckles, ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s hand wanders downward, her fingers brushing tantalizingly across your supple flesh until her smooth tips rub against the half-hard shaft of your [cock biggest].  You stifle a gasp as the latex girl wraps her fingers around your prick, needing only the slightest touch to get you nice and turgid.  She moves her hand in slow, languid motions, slowly drawing her unnaturally smooth hands up and down your shaft, from crown to base, giving gentle twists and squeezes in time with her suckling upon your teat.`
            );
        }
        // {elseif PC has cunt}
        else if (this.player.hasVagina())
            this.outx(
                `\n\nAs she suckles, ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s hand wanders downward, her fingers brushing tantalizingly across your supple flesh until her smooth tips rub against the outer folds of your [vagina].  You only just stifle a gasp as her long fingers slip into your ready hole, already aroused and eager to fuck.  Her hand moves into you, feeling like an unnaturally flexible dildo as she pushes inches of latex into you, each thrust in time with a suckle of your teat.`
            );
        // {elseif PC ain't got shit, captain}
        else
            this.outx(
                `\n\nAs she suckles, ${
                    this.flags[kFLAGS.GOO_NAME]
                }'s hands wander downward, her fingers brushing tantalizingly across your supple flesh until her smooth tips send a shiver up your spine, her knuckles running across your exposed [asshole] as she works her fingers into your [butt].  With no other genitalia on offer, you grit your teeth as ${
                    this.flags[kFLAGS.GOO_NAME]
                } slithers a smooth finger into your rectum, pushing into your ass with agonizing slowness, tiny thrusts in and out timed with her suckling from your teat.`
            );
        // {Combine, next paragraph}
        this.outx(
            `\n\nUnder the latex girl's combined milking and sexual advances, you feel an orgasm rising deep in your gut.  You steel yourself, trying to hold out a moment longer as ${
                this.flags[kFLAGS.GOO_NAME]
            } intensifies her assault, suckling every last drop from you as her fingers work wonders upon your `
        );
        if (this.player.gender == 3) this.outx("double genitals");
        else if (this.player.hasCock()) this.outx("cock");
        else if (this.player.hasVagina()) this.outx("cunt");
        else this.outx("asshole");
        this.outx(".  You don't last long, and soon throw your head back and cum, ");
        if (this.player.gender > 0)
            this.outx("smearing her fingers with a liberal spattering of your cum");
        else this.outx("your [ass] clamping down hard as her finger milks you from behind");
        this.outx(
            `.  Suddenly, your teat pops free of her mouth, a streak of milk still spraying until ${
                this.flags[kFLAGS.GOO_NAME]
            } is liberally coated with your white orgasmic offering, laughing girlishly as she licks her fingers and brings her own breast to her mouth, trying to tongue off the milk splattered on her.`
        );
        this.outx(
            '\n\n"<i>Delicious!</i>" she says with a smile, plating a long kiss on your lips.  You return her grin and pull her close, nesting her face into your now-lighter bosom for a few short, restful minutes.'
        );
        if (this.player.findPerk(PerkLib.Feeder) >= 0) {
            // You've now been milked, reset the timer for that
            this.player.addStatusValue(StatusAffects.Feeder, 1, 1);
            this.player.changeStatusValue(StatusAffects.Feeder, 2, 0);
        }
        this.player.boostLactation(0.5);
        this.gooHappiness(5);
        this.gooObedience(3);
        this.temp = 15;
        if (this.player.lactationQ() >= 200) this.temp += 10;
        if (this.player.lactationQ() >= 500) this.temp += 10;
        if (this.player.lactationQ() >= 1000) this.temp += 10;
        if (this.player.lactationQ() >= 2000) this.temp += 10;
        if (this.player.lactationQ() >= 4000) this.temp += 10;
        if (this.player.lactationQ() >= 8000) this.temp += 10;
        this.gooFluid(this.temp);
        this.fatigue(5);
        this.player.orgasm();
        this.dynStats("sen", 2);
        this.doNext(this.camp.returnToCampUseOneHour);
    }
}
