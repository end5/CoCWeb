import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { PerkLib } from "../../../PerkLib";
import { TelAdreAbstractContent } from "./TelAdreAbstractContent";

export class Maddie extends TelAdreAbstractContent {
    // VARS
    // 240- first time meeting procced? 1 yes
    // 241- mino explained what he needs yet?
    // 242- baking happaned?  1 = yes, -1 = snuck out, -2 = seen her escorted out
    // , 3 =stayed, 4 = epilogue'ed
    // [Bakery One Off – Madeleine's Creation]
    public procMaddieOneIntro(): void {
        this.outx("", true);
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00240] == 0) {
            this.outx(
                'You enter the bakery, savoring the sweet smells of sugar and baked goods.  A burly, hairy figure steps up beside you and places a strong hand on your shoulder.   The gravelly voice of the stranger says, "<i>You ain\'t from around here.  Come.  I need your help.  Show you something.</i>"  You turn to look, and are quite surprised when you see the horned visage of a minotaur ',
                false
            );
            if (this.player.tallness < 72) this.outx("looking down at");
            else if (this.player.tallness < 100) this.outx("staring levelly at");
            else this.outx("glaring up at");
            this.outx(
                " you. It releases your shoulder and starts walking towards an 'employees only' door.  Do you follow?\n\n",
                false
            );
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00240] = 1;
        }
        // (REPEAT)
        else {
            this.outx(
                "You walk into the bakery and a burly, hair-covered arm grabs your shoulder.  The familiar voice of a minotaur barks, \"<i>You.  You can help.  Come.</i>\"  You turn, but he's already walking towards an 'employees only' door.  Do you follow?",
                false
            );
        }
        this.doYesNo(this.followMinotaurIntoBackroom, this.telAdre.bakeryScene.bakeryuuuuuu);
    }
    // [Follow]
    private followMinotaurIntoBackroom(): void {
        this.outx("", true);
        //  (Not yet explained)
        if (this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00241] == 0) {
            this.outx(
                'You follow the burly beast through the door, turning several times as he leads you through the blisteringly hot ovens.  The minotaur is sweating heavily by the time you reach his destination, and for that matter so are you.  With all the musk boiling off of him, you find yourself wondering if he was just setting up an elaborate ruse to lure you into a sexual situation.  He grabs a white, fluffy hat and drops it on his head, firmly dispelling that notion as he tries to explain in as few words as possible, "<i>I am cook.  I make great éclairs, but making masterpiece now.  Need special ingredients.  You get to leave city.  Bring me lust draft and honey.  Not pure stuff, too strong. Go.</i>"\n\n',
                false
            );
            this.outx(
                "You get a chance to look over his work station, noting the many bowls of batter, hundreds of massive eclairs, and the largest onahole you've ever seen.  ",
                false
            );
            if (this.player.findPerk(PerkLib.MinotaurCumAddict) >= 0)
                this.outx(
                    "You lick your lips when you realize you're meeting the source of the 'special' éclairs.",
                    false
                );
            else
                this.outx(
                    "You blush when you realize what he must be using for cream filling.",
                    false
                );
            // [Give Them] [Leave]
            if (
                this.player.hasItem(this.consumables.BEEHONY) &&
                this.player.hasItem(this.consumables.L_DRAFT)
            )
                this.simpleChoices(
                    "Give Them",
                    this.handOverIngredientsItBeBakingTimeYo,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined,
                    "Leave",
                    this.nopeAintGotNoneODemSpeculIngredimathings
                );
            else
                this.simpleChoices(
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined,
                    "Leave",
                    this.camp.returnToCampUseOneHour
                );
            this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00241] = 1;
        }
        // (Explained)
        else {
            this.outx(
                'You follow the burly chef through the door, winding through the familiar ovens.  By the time you reach his work area, you\'re both covered in a fine sheen of sweat and you find yourself responding to the minotaur musk unconsciously.  The strange chef turns to ask, "<i>You have special ingredients now, yes?</i>"',
                false
            );
            // [Yes] [Lie – No/Not Yet]
            if (
                this.player.hasItem(this.consumables.BEEHONY) &&
                this.player.hasItem(this.consumables.L_DRAFT)
            )
                this.simpleChoices(
                    "Yes",
                    this.handOverIngredientsItBeBakingTimeYo,
                    "Lie - No",
                    this.nopeAintGotNoneODemSpeculIngredimathings,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined
                );
            else
                this.simpleChoices(
                    "No",
                    this.nopeAintGotNoneODemSpeculIngredimathings,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined
                );
        }
    }

    // [Not Yet/No]
    public nopeAintGotNoneODemSpeculIngredimathings(): void {
        this.outx("", true);
        this.outx(
            'The chef sighs and slams a fist into the counter hard enough to dent the metal and throw the bowls full of dough inches into the air.  A number of empty éclairs bounce and roll everywhere.  The minotaur looks back at you and snorts, "<i>Best you go.  Don\'t come without ingredients.</i>"\n\n',
            false
        );

        this.outx("Well, no point in ");
        if (this.player.cor > 50) this.outx("starting a fight inside Tel'Adre");
        else this.outx("overstaying your welcome");
        this.outx(" – you depart.");
        this.doNext(this.telAdre.bakeryScene.bakeryuuuuuu);
    }
    // [Yes – baking]
    public handOverIngredientsItBeBakingTimeYo(): void {
        this.outx("", true);
        this.player.consumeItem(this.consumables.BEEHONY);
        this.player.consumeItem(this.consumables.L_DRAFT);
        this.outx(
            "You hand the lust draft and bottled honey to the minotaur, doing your best to ignore his potent, lust-inducing pheromones as you watch him work.  He grabs the batch of dough he had been kneading and pours in the lust draft, snorting aggressively once the bubbling drug's smell reaches his bovine nostrils.  Next, the bull-like chef reaches over to grab a bottle marked 'P.S.M.', uncorking and pouring it in one practiced motion.   The white fluid froths dangerously on contact with the pink lust draft, and a second later the honey is in there too.  Finally, he flips up his loincloth and reaches for the onahole.\n\n",
            false
        );

        this.outx(
            "The sex-toy drips with lubricant and twists in the minotaur's hands, indicating magical enhancement or goblin manufacture.  He slides in, sighing as his four, basketball-sized testes pull close to his body, twitching.  Two quick pumps later, he's howling, hips twitching as spurts of white leak from the onahole into the bowl.  With remarkable restraint, he stops himself after adding a cup of spunk, even though his balls are still huge and quivering.",
            false
        );
        if (this.player.findPerk(PerkLib.MinotaurCumAddict) >= 0)
            this.outx(
                '  You lurch forward involuntarily, craving the rest of his jism, but he pushes you into the wall and grunts, "<i>No,</i>" in a tone that brooks no disagreement.  It actually shocks you out of your addicted haze.',
                false
            );
        this.outx("\n\n", false);

        this.outx(
            'Grabbing a whisk, the bull-man starts stirring the sex-filled dough with vigor, mixing the thickening blend hard enough to make his biceps ripple.  A moment later, he lifts the bowl one-handed and pulls out a giant, novelty cupcake mold from the counter. After filling the mold, the chef throws it onto his burly shoulder and grabs a sack of actual icing.  A terse grunt instructs, "<i>Wait at tables.  You can try some when done.</i>"  ',
            false
        );
        if (this.player.findPerk(PerkLib.MinotaurCumAddict) >= 0)
            this.outx("  Your mouth salivates at the thought.");
        else this.outx("You aren't sure you want to.");
        this.outx("\n\n", false);
        if (this.player.findPerk(PerkLib.MinotaurCumAddict) >= 0) this.doNext(this.waitForSlutCake);
        // [Wait] [Sneak Out]
        else
            this.simpleChoices(
                "Wait",
                this.waitForSlutCake,
                "Sneak Out",
                this.sneakAwayFromMaddie,
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
    }

    // [Sneak Out]
    private sneakAwayFromMaddie(): void {
        this.outx("", true);
        this.outx(
            "You get out before he can find you again.  Whatever he's making is nothing you ever want to taste.",
            false
        );
        // (No more mino chef)
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00242] = -2;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Wait/Next]
    private waitForSlutCake(): void {
        this.spriteSelect(39);
        this.outx("", true);
        this.outx("You walk back into the bakery proper, feeling more than a little ");
        if (this.player.cor < 33) this.outx("antsy");
        else if (this.player.cor < 66) this.outx("nervous about this whole thing");
        else this.outx("intrigued by this whole thing");
        this.outx(".  One of the waitresses brings you a glass of milk, and ");
        if (this.player.cor < 50)
            this.outx("it smells normal enough, so you go ahead and sip on it");
        else this.outx("you sip on it while you wait");
        this.outx(
            ".  After what feels like an eternity, you get sick of waiting and push through the door into the bakery's backrooms to see what the hold-up is.  The minotaur isn't at his usual workstation, and doesn't look to have been there in quite some time.\n\n",
            false
        );

        this.outx(
            "Where could he have gone?  You backtrack through the ovens, looking down side-paths and searching through the labyrinthine storage rooms.  Just when you're about to give up, you hear an airy, light-headed giggle from the next room.  You peek around the corner and gasp in absolute shock.  The minotaur is pinned to the wall, his wrists stuck in place by what looks like hardened, white icing.   On top of him is the strangest - no, ONLY, cupcake-woman you've ever seen.\n\n",
            false
        );

        this.outx(
            "She's taller than the imprisoned minotaur, and wider too.  The pastry-girl's skin is slightly porous, colored light chocolate and gleaming in the dim light where it isn't covered by shining, blue-iced 'clothes'.  Her hair is white as whipped cream, and tied back with a cinnamon bun.  Her curvaceous form turns, jiggling ever so slightly as she takes you in with her green, gum-drop eyes and revealing her whipped-cream bra.  The novelty cup-cake mold is balanced atop her head, worn like a comparatively tiny fez.\n\n",
            false
        );

        this.outx(
            "The minotaur chef is still wearing his poofy hat, but he's pinned completely and irrevocably under this baked behemoth as she bounces and grinds on his convulsing member.  While you watch, his balls shrink smaller and smaller, emptying their pent up, steamy cargo directly into the cupcake's soft, cushiony center.  She grows larger from the sudden intake of fresh jism, giggling as she drains every drop from her creator.  \"<i>Tee-hee!  Mmm, you're like, delicious and stuff, creat- cr... dad!  So sticky and yummy, just like me!</i>\" exclaims the fluffy slut-cake.\n\n",
            false
        );

        this.outx(
            "Utterly shocked and drained, the chef-o-taur's eyes roll back in his sockets.  He slumps weakly under his creation as she bounces a few last times, futilely trying to squeeze more cum from the slumping minotaur-dick.  The cupcake-girl rises at last, not with yeast, but with a new-found purpose.  The reflective, alien surface of her eyes locks against your groin as she takes one lumbering step after another in your direction.  Her massive, spongy tits wobble dangerously close to you, nearly entrancing you with their beautiful, unnatural curves.\n\n",
            false
        );

        this.outx(
            "Running seems like a very good idea.  Who knows what she has planned for you?",
            false
        );
        // [RUN] [TRY TO TALK]
        this.simpleChoices(
            "Run Away",
            this.runAwayFromMaddiiiieee,
            "TryToTalk",
            this.talkToMaddie,
            "",
            undefined,
            "",
            undefined,
            "",
            undefined
        );
    }
    // [RUN DAFUQ AWAY]
    private runAwayFromMaddiiiieee(): void {
        this.spriteSelect(39);
        this.outx("", true);
        this.outx(
            'You turn tail to run, evacuating the room before that culinary catastrophe can have her way with you.  A high-pitched whine chases you away as the cupcake-girl cries, "<i>Nooooo... come back!  I\'m making so much filling for you!</i>"  Her words lend you even greater speed, and you vacate the city in record time.\n\n',
            false
        );
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00242] = -1;
        this.doNext(this.camp.returnToCampUseOneHour);
    }
    // [Followup to run away]
    public runAwayMaddieFollowup(): void {
        this.spriteSelect(39);
        this.outx("", true);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00242] = -2;
        this.outx(
            "You return to a strange sight indeed.  Urta and Edryn are leading a procession of over thirty city guards, arranged in a loose circle around the cupcake-girl.  Her comparatively tiny, tin-foil fez is gone, along with most of her blue-iced 'armor'.  She looks weak, pathetic, and beaten as she's prodded with spears and escorted from the city, never to return again.  Vanilla-scented tears stain the pavement behind her, leaving a trail the whole way back to the bakery.\n\n",
            false
        );
        this.doNext(this.telAdre.telAdreMenu);
    }

    // [TRY TO TALK]
    private talkToMaddie(): void {
        this.spriteSelect(39);
        this.outx("", true);
        this.outx(
            `You try to speak as calmly as you can in the face of a giant, jiggling sex-pastry, but she ignores your demands to 'wait', 'listen', or 'stop'.  Sponge-cake-soft fists envelop your arms, lifting you from the ground to pin you against some flour sacks.   The cherries covering the cupcake-girl's whipped-cream bra drop off, pushed away by two candy-pink nipples the size of water bottles.  As one, they discharge thick splorts of thick, gooey icing to splatter over the length of your exposed arms.  It hardens nigh-instantaneously in the comparatively cool air, and you're helpless to do anything but squirm as she applies the same treatment to your ${this.player.legs()}, immobilizing you completely.\n\n`,
            false
        );
        this.outx(
            'The cock-crazed confection looks down at you and nods, a satisfied smile spreading over glistening, pale blue lips.  She breathlessly exclaims, "<i>My creat- cr... Dad ',
            false
        );
        if (this.player.hasCock())
            this.outx(
                "is like, all out of icing mix!  So I'm going to borrow a few cups from you, 'kay?",
                false
            );
        else
            this.outx(
                "gave me so much icing mix, and you like, would look soooo much better with some vanil- van... yummy frosting!",
                false
            );
        this.outx("</i>\"  She's... what!?\n\n", false);
        // (FORK BETWEEN MALE/NONMALE)
        // (MALE)
        if (this.player.hasCock()) {
            let x: number = this.player.cockThatFits(60);
            if (x < 0) x = 0;
            this.outx(
                `"<i>Dad said my name is Madeleine, but that's no fun.  Just call me Maddie.  You've got lots of icing like Dad, right?  I-I... need more icing.  It's in my recipe,</i>" says Maddie.  The baked broad strips your ${
                    this.player.armorName
                } to expose your ${this.multiCockDescriptLight()}.  Cooing with excitement, she examines your `
            );
            if (this.player.lust >= 75) this.outx("rock-hard");
            else this.outx("hardening");
            this.outx(" shaft");
            if (this.player.cockTotal() > 1) this.outx("s");
            this.outx(
                ", running a sponge-soft hand over the love-muscle.  You rock your hips, trying to squirm away.  Maddie laughs, breathily chortling while her well-rounded breasts slide to either side of you and pin you to the wall.\n\n",
                false
            );

            this.outx(
                '"<i>So is this like, where the icing spouts out right?</i>" asks the confectionery cutey, squeezing you softly.  "<i>Awww, how sad – yours is stuck, just like Daddy\'s!  I\'ll have to squeeze and rub it until it\'ll let out the icing.</i>"\n\n',
                false
            );

            if (this.player.cor < 33)
                this.outx(
                    "You muster as much authority as you can in such a compromising position and explain to Maddie that what comes out of there is NOT icing.",
                    false
                );
            else if (this.player.cor < 66)
                this.outx("You offhandedly mention that you don't actually make icing.");
            else this.outx("You smirk and mention that what you squirt isn't quite icing.");
            this.outx(
                `  "<i>Liar!  If that wasn't icing, then why would Daddy have put his in all those eclairs and me?</i>" retorts the busty cupcake, continuing on to say, "<i>I know, I can suck it out!</i>"  She purses her jelly-like lips and plunges forward, slurping all ${Maddie.num2Text(
                    Math.floor(this.player.cocks[x].cockLength)
                )} inches into her oven-warmed esophagus.  Your protests are cut off by the tightness squeezing around your ${this.cockDescript(
                    x
                )}.  It milks you in rippling motions, buttery-slick and pulsing hungrily.\n\n`,
                false
            );

            this.outx("A half-melted tongue ");
            if (!this.player.hasSheath()) this.outx("encircles the base");
            else this.outx("pokes and prods into your sheath");
            this.outx(
                `, leaving a syrupy residue trailing over your ${this.cockDescript(
                    x
                )}.  You groan, sagging into the sugary suspension.  The strength is completely gone from your limbs, stolen by the pastry's prick-devouring maw.  Her shining eyes look up to gloat once she realizes how completely you've submitted to her ministrations, and in no time, her cake-soft hands catch and squeeze your ${this.cockDescript(
                    x
                )} into the gargantuan swell of her spongy breasts.  A smile crosses your face as you get pleasured by the motherly mounds and the familiar, sweet smell that Maddie exudes.\n\n`,
                false
            );

            this.outx(
                `Suction starts, hollowing the cupcake-girl's plush cheeks into a concave, cock-slurping form.  The constant squeezing of your ${this.cockDescript(
                    x
                )} combines with the sucking to make you swell larger inside Maddie's gullet while she kisses your groin.  The confection's oral charms show no signs of stopping as she noisily slurps away at her treat, and her pillowy breasts are so spongy-soft and calming that you're happy to let her sample your 'icing' if it means you can feel like this.  Your ${this.hipDescript()} push back into the baby blue lips, pumping and thrusting as your instinct to fuck and breed takes over, working your ${this.cockDescript(
                    x
                )} in and out of the pastry's puckered mouth.\n\n`,
                false
            );

            this.outx(
                `Maddie pushes further forward, her bosom crushing you against the wall to hold your hips immobile while she sucks harder and harder.  Your cock balloons from the suction, thickening inside her neck and beginning to twitch from the irresistible fellative pleasure. An orgasm grows in your ${this.ballsDescriptLight()}`
            );
            if (this.player.balls > 0)
                this.outx(
                    ", the cum-heavy spheres bouncing in your twitching sack as they get ready to explode",
                    false
                );
            this.outx(
                ".  Maddie squeezes her puckered cock-suckers tight around the turgid shaft while she whips her melty tongue in circles around it.  Your climax hits like a hammer-blow to the temple, knocking the thoughts from your head while you pump rope after rope of 'icing' down the cupcake's dick-gripping neck-hole.  The suction relaxes as you fill the ravenous pastry with your seed and let your head limply sink deeper against the cushion of her sponge-cake-soft breast.\n\n",
                false
            );

            this.outx("Maddie milks you for what seems like ages");
            if (this.player.cockTotal() == 1)
                this.outx(
                    `, your ${this.cockDescript(
                        x
                    )} emptying every drop of jizz into the baked cum-tank.`
                );
            else {
                this.outx(
                    " while her skin absorbs the generous donation of your other member",
                    false
                );
                if (this.player.cockTotal() > 2) this.outx("s");
                this.outx(".");
            }
            this.outx(
                "  When the jizz-guzzling pastry-girl pulls back at last to free your empty member, it's coated from top to bottom in gooey blue jelly, though it's tinged white in places.  The milked-out member slowly softens",
                false
            );
            if (this.player.cockTotal() > 1) {
                if (this.player.cockTotal() == 2) this.outx(" along with your other penis");
                else this.outx(" along with your other dicks");
            }
            this.outx(
                ".  Satisfied, your body goes limp and sags against the wall while your face leans on the cupcake-girl's departing breast.\n\n",
                false
            );

            this.outx(
                `The cream-filled creation leans back and squirts some more icing onto the straps holding you, but instead of reinforcing the bonds, it eats through the hardened confection to release you into her waiting bosom.  She catches you in the pillowy chest-embrace, stroking your hair while she says in a sing-song voice, "<i>Thanks for all the icing ${this.player.mf(
                    "mister",
                    "miss"
                )}!  I think I have enough for now.  I think I'll go like, check on my Dad and stuff.  Maybe he wants to add some icing to the recipe?</i>"\n\n`,
                false
            );

            this.outx(
                `Oven-warmed tiles kiss your exposed ${this.buttDescript()} as you're gently placed on the floor next to your discarded equipment.  Exhausted and satiated as you are, your eyes drift closed, lulling you into slumber.\n\n`,
                false
            );

            this.outx("<b>Later...</b>\n", false);
            this.outx(
                'You\'re woken by a furry hand squeezing your shoulder and violently shaking you around.  With such rough treatment, you snap to full alertness in no time.  The minotaur chef is smiling down at you, the expression looking quite strange on his bestial muzzle as he says, "<i>Sorry.  Experiment backfired.  Glad you gave her what she needed.  Much calmer now.  Will make great assistant.</i>"\n\n',
                false
            );
            this.outx(
                "Once the beast-man has finished talking you realize the cupcake-girl, Madeleine, is standing behind him.  Her blue-iced 'clothes' have been remade, shaped into a form-fitting apron that accentuates her massive, otherworldly curves.  The minotaur chef utters, \"<i>We go now.  Get dressed.  Maybe sometime can visit Maddie.</i>\"  Maddie claps her hands, bouncing and jiggling with excitement as the two of them leave you there to get dressed.",
                false
            );
        }
        // (FEMALE/Genderpoots)
        else {
            this.outx(
                "\"<i>Dad said my name is Madeleine, but that's no fun.  Just call me Maddie!</i>\" exclaims the airheaded pastry.  You briefly wonder if the yeast is to blame for her state, but you stifle the involuntarily giggle that rises with the stray thought.  Now is hardly the time for such frivolous rambling!  You shout with equal parts terror and rage, demanding she remove her sugary bondage from you immediately.  She looks at you with her alien eyes full of confusion, as if she doesn't comprehend a word you're saying.\n\n",
                false
            );

            this.outx(
                "A nipple is forced between your still-protesting lips, plugging your noise-hole before you can complain further.  Maddie gleefully cheers, \"<i>There we go... now we just need to get some magic icing in you so you'll feel nice and yummy and like, relaxed!</i>\"  Oh no – you don't know what she means by magic icing, but whatever it is, it can't be good.  First, you try to spit the spongy areola out.  It pushes back with incessant pressure, flooding your mouth with cake-like sweetness immediately.  You try to bite down.  Maybe pain will make her draw back?  It doesn't work, and if anything, it just starts the flow of icing.\n\n",
                false
            );

            this.outx(
                "It's delicious – creamy, gooey, and sugary-sweet while at the same time as fluid as mother's milk. You swallow the first mouthful reflexively before you remember you were trying to avoid this exact fate.  The thick icing coats your esophagus with the cupcake's warm secretion. It radiates gentle, oven-like heat throughout you, clouding your mind and dulling your vision with its hazy warmth.  You relax against your saccharine bonds nervelessly and begin to drink of your own volition.\n\n",
                false
            );

            this.outx(
                `"<i>Shhh, shhh... that's a good ${this.player.mf(
                    "boy",
                    "girl"
                )}.  Isn't my icing the absolute best?</i>" she verbally gushes, just like the nipple between your teeth.  "<i>Drink up`
            );
            if (this.player.thickness < 60) this.outx(", you're looking awful thin");
            else if (this.player.tone >= 70)
                this.outx(
                    ", you look like you're carved from stone.  A little softness would do you good",
                    false
                );
            else
                this.outx(
                    ", you look like you'd better eat to keep up your gorgeous figure",
                    false
                );
            this.outx(
                ".  Mmm, don't let it like, spill or nothing!  I'm making this icing special and yummy so you'll feel super good and stop struggling an' stuff.</i>\"  Her voice is as candy-sweet as the milk you're guzzling.  The sound of messy slurps and noisy, gulping swallows fills the air of the small back room.\n\n",
                false
            );

            this.outx(
                "The weighty breast and its spongy nipple retreat, popping from your questing lips.  You whine weakly in disappointment at the sudden disappearance of your treat, licking and smearing the white cream over your already icing-smeared mouth.  Maddie grabs her other tit with a two handed grip and struggles with the wobbling mass while she aims her unused nipple your way.  The areola heaves, bulging out like an overfilled balloon.  The nipple wiggles in place from the pressure, stretching out around the sides until it looks ready to rupture.  Creamy confection beads at the tip, slowly forming a fat, sticky drop that hangs down and threatens to fall to the floor.  Before it falls, the nipple pulses one last time and opens up a flow of icing.  It's like watching a dam burst – awe-inspiring for the first few seconds until the torrent of fluid begins to drown you.\n\n",
                false
            );

            this.outx(
                "You rock back as the gushing stream impacts your solar plexus, splattering the frosty white stuff into a spray of rain.  Goop rains and explodes all around, and Maddie just giggles and moans while she guides the flow over every inch of your form, drenching you in sugary sweetness.  You swallow nearly as much as you spit and sputter.  After a few moments you just kind of open wide and sigh, hoping she'll hold it in your mouth and hit you with enough force to pump it into your gurgling gut.\n\n",
                false
            );

            this.outx(
                '"<i>Ohhh, you look good enough to eat!</i>" exclaims Maddie.  Meanwhile, your restraints slowly liquify under the warm, sugary strikes.  They stretch lower and lower, letting you sink into the soft, half-melted pile of icing.  At last the icing-based bindings snap, letting you sink into the sweetened mass as if it was a giant cushion.  Maddie sighs, giving a few last, fickle squirts that splatter in your hair before her flow completely stops.\n\n',
                false
            );

            this.outx(
                "\"<i>Ooooh look at you!  You're all sticky-sweet and soft!  Gosh, I bet all the horny boys and girls would love to lick you right up!</i>\" exclaims the excited cupcake-girl.  She licks a drop of stray icing from one of her plump digits before she utters with a voice full of worry, \"<i>I'm all out of icing.  N- no one will like me if I don't have icing!  Thanks for playing, but I'd better go get some more cream filling from daddy.  You stay still and don't go anywhere until you've eaten all the icing, 'kay?</i>\"\n\n",
                false
            );

            this.outx(
                "The pudgy pastry flounces off, leaving you to wallow in the pile of syrupy cream she leaves behind.  You're so placid and relaxed from her drugged icing that you obey thoughtlessly, shoveling heaping handfuls into your mouth.  Handful after handful, you devour the creamy, drugged topping that's piled up around you.  Somehow it doesn't burst your belly with its sheer volume, but it does make your tummy rumble and protrude slightly ",
                false
            );
            if (this.player.thickness < 60 || this.player.tone >= 50) this.outx("forward");
            else this.outx("more forward than normal");
            this.outx(
                ".  After a time it overwhelms you and you fall into a fitful slumber.\n\n",
                false
            );

            this.outx("<b>Later...</b>\n", false);
            this.outx(
                'You\'re woken by a furry hand squeezing your shoulder and violently shaking you around.  With such rough treatment, you snap to full alertness in no time.  The minotaur chef is smiling down at you, the expression looking quite strange on his bestial muzzle as he says, "<i>Sorry.  Experiment backfired.  Glad you okay.  Gave her more filling and all calm now.  Will make great assistant.</i>"\n\n',
                false
            );

            this.outx(
                "Once the beast-man has finished talking you realize the cupcake-girl, Madeleine, is standing behind him.  Her blue-iced 'clothes' have been remade, shaped into a form-fitting apron that accentuates her massive, otherworldly curves.  The minotaur chef utters, \"<i>We go now.  Get dressed.  Maybe sometime can visit Maddie.</i>\"  Maddie claps her hands, bouncing and jiggling with excitement as the two of them leave you there to get dressed.",
                false
            );
            this.outx(this.player.modThickness(100, 10), false);
            this.outx(this.player.modTone(0, 10), false);
        }
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00242] = 3;
        this.doNext(this.camp.returnToCampUseOneHour);
    }

    // [Next visit to the bakery...]
    public bakeryEpilogue(): void {
        this.outx("", true);
        this.outx(
            "As soon as you enter the bakery, one of the waitresses pulls you aside.  She positively beams as she hands you a note and says, \"<i>One of our chefs wanted me to give you this.  I didn't even know he could write!  I mean, where does a minotaur learn to handle a pen?</i>\"  You smirk, waving her away before you open up the minotaur's note.\n\n",
            false
        );
        this.outx(
            "\"<i>Thanks.  Figured out what went wrong with Maddie's help.  Made masterpiece.  Buy giant cupcake sometime.  Delicious!  Promise it's safe and non-addictive.  Expensive though.  Ingredients rare.\n\n",
            false
        );
        this.outx('-X</i>"', false);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00242] = 4;
        this.doNext(this.telAdre.bakeryScene.bakeryuuuuuu);
    }
}
