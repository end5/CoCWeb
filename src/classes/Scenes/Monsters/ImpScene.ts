import { LOWER_BODY_TYPE_CENTAUR, VAGINA_LOOSENESS_GAPING } from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { BaseContent } from "../../BaseContent";
import { CockTypesEnum } from "../../CockTypesEnum";
import { LustyMaidensArmor } from "../../Items/Armors/LustyMaidensArmor";
import { PerkLib } from "../../PerkLib";
import { PregnancyStore } from "../../PregnancyStore";
import { StatusAffects } from "../../StatusAffects";
import { ImpGang } from "../Camp/ImpGang";
import { ImpLord } from "./ImpLord";

/**
 * Created by aimozg on 04.01.14.
 */

export class ImpScene extends BaseContent {
    public impVictory(): void {
        this.clearOutput();
        const canFeed: boolean = this.player.findStatusAffect(StatusAffects.Feeder) >= 0;
        const canBikiniTits: boolean =
            this.player.hasVagina() &&
            this.player.biggestTitSize() >= 4 &&
            this.player.armor instanceof LustyMaidensArmor;
        this.outx(
            `You smile in satisfaction as ${this.monster.a}${this.monster.short} collapses and begins masturbating feverishly.`
        );

        // fuckit, making sure the leave button is ALWAYS present
        // I have a feeling somehow one of the returns is getting hit and its shitting up the button being added
        this.menu();
        this.addButton(9, "Leave", this.cleanupAfterCombat);

        if (canFeed) {
            if (this.player.lust >= 33)
                this.outx(
                    "  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing, but it might be more fun to force it to guzzle your breast-milk.\n\nWhat do you do?"
                );
            else
                this.outx(
                    "  You're not really turned on enough to rape it, but it might be fun to force it to guzzle your breast-milk.\n\nDo you breastfeed it?"
                );
        } else if (this.player.lust >= 33 || canBikiniTits || this.player.canOvipositBee()) {
            this.outx(
                "  Sadly you realize your own needs have not been met.  Of course you could always rape the poor thing...\n\nDo you rape him?"
            );
        } else {
            this.cleanupAfterCombat();
            return;
        }
        if (this.player.lust > 33) {
            let maleRape;
            if (this.player.hasCock()) {
                if (this.player.cockThatFits(this.monster.analCapacity()) == -1)
                    this.outx(
                        `\n\n<b>You're too big to rape an imp with ${this.oMultiCockDesc()}.</b>`
                    );
                else
                    maleRape = this.player.isTaur() ? this.centaurOnImpStart : this.rapeImpWithDick;
            }
            if (this.player.hasVagina()) {
                if (this.player.isTaur()) {
                    maleRape = this.centaurOnImpStart;
                    this.addButton(1, "Group Vaginal", this.centaurGirlOnImps);
                } else this.addButton(1, "Female Rape", this.rapeImpWithPussy);
            } else if (
                maleRape == undefined &&
                !this.player.hasFuckableNipples() &&
                !canFeed &&
                !canBikiniTits &&
                !this.player.canOvipositBee()
            ) {
                this.cleanupAfterCombat(); // Only happens when there's no way to fuck the imp
                return;
            }
            this.addButton(0, this.player.isTaur() ? "Centaur Rape" : "Male Rape", maleRape);
            if (this.player.hasFuckableNipples())
                this.addButton(2, "NippleFuck", this.noogaisNippleRape);
        }
        if (canFeed) this.addButton(3, "Breastfeed", this.areImpsLactoseIntolerant);
        if (canBikiniTits)
            this.addButton(
                4,
                "B.Titfuck",
                (this.player.armor as LustyMaidensArmor).lustyMaidenPaizuri
            );
        if (this.player.canOvipositBee())
            this.addButton(8, "Oviposit", this.putBeeEggsInAnImpYouMonster);
    }

    private rapeImpWithDick(): void {
        let x: number = this.player.cockThatFits(this.monster.analCapacity());
        if (x < 0) x = 0;
        // Single cock
        this.outx(this.images.showImage("imp-win-male-fuck"), false);
        if (this.player.cocks.length == 1) {
            this.outx(
                "With a demonic smile you grab the insensible imp and lift him from the ground by his neck.  The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.",
                true
            );
            if (this.player.lowerBody != LOWER_BODY_TYPE_CENTAUR) {
                this.outx(
                    `  You casually unclasp your ${
                        this.player.armorName
                    } and reveal your ${this.cockDescript(x)}, `
                );
                if (this.player.breastRows.length > 0 && this.player.breastRows[0].breastRating > 2)
                    this.outx(
                        `smashing him against your ${this.breastDescript(
                            0
                        )} while you jerk hard on your ${this.cockDescript(
                            x
                        )}, bringing it to a full, throbbing erection.`
                    );
                else this.outx("stroking it to full hardness languidly.");
            }
            this.outx(
                `\n\nWith no foreplay, you press your ${this.cockDescript(
                    x
                )} against his tight little pucker and ram it in to the hilt.  The imp's eyes bulge in surprise even as a thick stream of pre leaks from his ${this.monster.cockDescriptShort(
                    0
                )}.  You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.`,
                false
            );
            if (this.player.cocks[0].cockType == CockTypesEnum.CAT)
                this.outx(
                    "  The tiny creature's claws dig into your sides at the feeling of soft, hooked barbs stroking his sensitive insides.",
                    false
                );
            if (this.player.cocks[0].cockLength >= 7 && this.player.cocks[0].cockLength <= 12)
                this.outx(
                    "  Each thrust obviously distorts the imp's abdomen.  It amazes you that it doesn't seem to be hurting him.",
                    false
                );
            if (this.player.cocks[0].cockLength > 12)
                this.outx(
                    "  Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest.  Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.",
                    false
                );
            this.outx(
                "\n\nThe tight confines of the imp's ass prove too much for you, and you feel your orgasm build.",
                false
            );
            if (this.player.balls == 0 && this.player.vaginas.length > 0)
                this.outx(
                    `  The cum seems to boil out from inside you as your ${this.vaginaDescript(
                        0
                    )} soaks itself.  With delicious slowness you fire rope after rope of cum deep into the imp's rectum.`
                );
            if (this.player.balls == 0 && this.player.vaginas.length == 0)
                this.outx(
                    `  The cum seems to boil out from inside you, flowing up your ${this.cockDescript(
                        x
                    )}.  With delicious slowness, you fire rope after rope of cum deep into the imp's rectum.`
                );
            if (this.player.cumQ() >= 14 && this.player.cumQ() <= 30)
                this.outx(
                    `  Your orgasm drags on and on, until your slick jism is dripping out around your ${this.cockDescript(
                        x
                    )}.`
                );
            if (this.player.cumQ() > 30 && this.player.cumQ() <= 100)
                this.outx(
                    `  Your orgasm seems to last forever, jizz dripping out of the imp's asshole around your ${this.cockDescript(
                        x
                    )} as you plunder him relentlessly.`
                );
            if (this.player.cumQ() > 100)
                this.outx(
                    `  Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last.  The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your ${this.cockDescript(
                        x
                    )} with each thrust.`
                );
            this.outx(
                "\n\nSatisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.   You drop the imp hard and he passes out, dripping mixed fluids that seem to be absorbed by the dry earth as fast as they leak out.",
                false
            );
        }
        // Multicock
        if (this.player.cocks.length >= 2) {
            this.outx(
                "With a demonic smile you grab the insensible imp and lift him from the ground by his neck.  The reduced airflow doesn't seem to slow his feverish masturbation at all, and only serves to make him harder.",
                true
            );
            if (this.player.lowerBody != LOWER_BODY_TYPE_CENTAUR) {
                this.outx(
                    `  You casually unclasp your ${
                        this.player.armorName
                    } and reveal your ${this.multiCockDescriptLight()}, `
                );
                if (this.player.breastRows.length > 0 && this.player.breastRows[0].breastRating > 2)
                    this.outx(
                        `smashing him against your ${this.breastDescript(
                            0
                        )} while you jerk hard on one of your ${this.cockDescript(
                            x
                        )}s, bringing it to a full, throbbing erection.`
                    );
                else this.outx("stroking one of your members to full hardness languidly.");
            }
            this.outx(
                `\n\nWith no foreplay, you press a ${this.cockDescript(
                    x
                )} against his tight little pucker and ram it in to the hilt.  The imp's eyes bulge in surprise even as a thick stream of pre leaks from his ${this.monster.cockDescriptShort(
                    0
                )}.  You grab him by his distended waist and brutally rape the little demon, whose claws stay busy adding to his pleasure.`,
                false
            );
            if (this.player.cocks[0].cockLength >= 7 && this.player.cocks[0].cockLength <= 12)
                this.outx(
                    "  Each thrust obviously distorts the imp's abdomen.  It amazes you that it doesn't seem to be hurting him.",
                    false
                );
            if (this.player.cocks[0].cockLength > 12 && this.player.cocks[0].cockLength <= 18)
                this.outx(
                    "  Each plunge into the imp's tight asshole seems to distort its entire body, bulging obscenely from its belly and chest.  Amazingly he doesn't seem to mind, his efforts focused solely on his sorely throbbing demon-dick.",
                    false
                );
            this.outx(
                "\n\nThe tight confines of the imp's ass prove too much for you, and you feel your orgasm build.",
                false
            );
            if (this.player.balls > 0)
                this.outx(
                    `The cum seems to boil in your balls, sending heat spreading through your ${this.cockDescript(
                        x
                    )} as your muscles clench reflexively, propelling hot spurts of jism deep into the imp's rectum.  Your other equipment pulses and dripples steady streams of its own cum.`
                );
            if (this.player.balls == 0 && this.player.vaginas.length > 0)
                this.outx(
                    `The cum seems to boil out from inside you as your ${this.vaginaDescript(
                        0
                    )} soaks itself.  With delicious slowness you fire rope after rope of cum deep into the imp's rectum.  Your other equipment drizzles small streams of jizz in sympathy.`
                );
            if (this.player.balls == 0 && this.player.vaginas.length == 0)
                this.outx(
                    `The cum seems to boil out from inside you, flowing up your ${this.cockDescript(
                        x
                    )}.  With delicious slowness, you fire rope after rope of cum deep into the imp's rectum.  Your other equipment drizzles small streams of jizz in sympathy.`
                );
            if (this.player.cumQ() >= 14 && this.player.cumQ() <= 30)
                this.outx(
                    `  Your orgasm drags on and on, until your slick jism is dripping out around your ${this.cockDescript(
                        x
                    )}.`
                );
            if (this.player.cumQ() > 30 && this.player.cumQ() <= 100)
                this.outx(
                    `  Your orgasm seems to last forever, jizz dripping out of the imp's asshole around your ${this.cockDescript(
                        x
                    )} as you plunder him relentlessly.`
                );
            if (this.player.cumQ() > 100)
                this.outx(
                    `  Your orgasm only seems to grow more and more intense as it goes on, each spurt more powerful and copious than the last.  The imp begins to look slightly pregnant as you fill him, and tiny jets of cum squirt out around your ${this.cockDescript(
                        x
                    )} with each thrust.`
                );
            this.outx(
                "\n\nSatisfied at last, you pull him off just as he reaches his own orgasm, splattering his hot demon-cum all over the ground.   You drop the imp hard and he passes out, dripping mixed fluids that seem to be absorbed by the dry earth as fast as they leak out.",
                false
            );
        }
        this.player.orgasm();
        this.dynStats("cor", 1);
        this.cleanupAfterCombat();
    }
    private rapeImpWithPussy(): void {
        this.outx("", true);
        this.outx(this.images.showImage("imp-win-female-fuck"), false);
        this.player.slimeFeed();
        this.outx(
            `You shed your ${
                this.player.armorName
            } without a thought and approach the masturbating imp, looming over him menacingly.  Your ${this.vaginaDescript(
                0
            )} moistens in anticipation as you gaze down upon his splendid rod. With no hesitation, you lower yourself until your lips are spread wide by his demon-head, the hot pre-cum tingling deliciously.`
        );
        // Too small!
        if (this.player.vaginalCapacity() < this.monster.cockArea(0)) {
            this.outx(
                `  You frown as you push against him, but his demonic tool is too large for your ${this.vaginaDescript(
                    0
                )}.  With a sigh, you shift position and begin grinding your ${this.vaginaDescript(
                    0
                )} against his ${this.monster.cockDescriptShort(
                    0
                )}, coating it with fluids of your gender.  Your clit tingles wonderfully as it bumps against every vein on his thick appendage.`
            );
            if (this.player.breastRows.length > 0 && this.player.breastRows[0].breastRating > 1) {
                this.outx(
                    "  You happily tug and pinch on your erect nipples, adding to your pleasure and nearly driving yourself to orgasm.",
                    false
                );
            }
            this.outx(
                `\n\nYou lose track of time as you languidly pump against the imp's ${this.monster.cockDescriptShort(
                    0
                )}.  At long last you feel your ${this.vaginaDescript(
                    0
                )} ripple and quiver.  Your ${this.player.legs()} give out as you lose your muscle control and collapse against the small demon.  You gasp as his ${this.monster.cockDescriptShort(
                    0
                )} erupts against you, splattering your chest with hot demonic cum that rapidly soaks into your skin.  You giggle as you rise up from the exhausted imp, feeling totally satisfied.`,
                false
            );
        }
        // Big enough!
        else {
            this.outx(
                `  You sink down his ${this.monster.cockDescriptShort(
                    0
                )} slowly, delighting in the gradual penetration and the tingling feeling of his dripping hot pre-cum.  At last you bottom out on his balls.`
            );
            this.player.cuntChange(this.monster.cockArea(0), true);
            this.outx(
                `  Your lust and desire spurs you into movement, driving you to bounce yourself up and down on the ${this.monster.cockDescriptShort(
                    0
                )}.  His exquisite member pushes you to the very height of pleasure, your ${this.vaginaDescript(
                    0
                )} clenching tightly of its own accord each time you bottom out.  The tensing of the little demon's hips is the only warning you get before he cums inside you, hot demonic jizz pouring into your womb.  Your ${this.player.legs()} give out, pushing him deeper as he finishes filling you.`
            );
            this.outx(
                `\n\nThe two of you lay there a moment while you recover, at last separating as you rise up off his ${this.monster.cockDescriptShort(
                    0
                )}.  Spunk drips down your legs, quickly wicking into your skin and disappearing.`,
                false
            );
            // Taking it internal is more corruptive!
            this.dynStats("cor", 1);
            // Preggers chance!
            this.player.knockUp(PregnancyStore.PREGNANCY_IMP, PregnancyStore.INCUBATION_IMP);
            this.player.cuntChange(this.monster.cockArea(0), true, true, false);
        }
        this.player.orgasm();
        this.dynStats("cor", 1);
        this.cleanupAfterCombat();
    }

    private sprocketImp(): void {
        this.player.slimeFeed();
        this.outx("", true);
        this.outx(
            "You fall to your knees, lost in thoughts of what you want the imp to do to you.  Your body burns with desire, ready for the anal assault to come.  At least that's what you think.  You reach a hand out to the imp, wanting to pull him to you, to make him take you the way you need to be taken.  But he doesn't, not this time.\n\n",
            false
        );
        // New PG
        this.outx(
            "Much to your surprise, the imp flutters upward on his small leathery wings and rushes toward you.  ",
            false
        );
        if (this.player.hairLength > 0) this.outx("His claws dig into your hair ");
        else this.outx("His claws dig into your wrists ");
        this.outx(
            `and you find yourself dragged upward with him, soaring over the tops of the trees.  The cool rush of air does nothing to abate your arousal.  If anything, the cold shock only makes your body more aware of its own need.  After just a few seconds that feel like an eternity to your lust-filled being, the imp hurls you down into a tree.  You flail as you fall, barely catching yourself on the upper branches.  Your hands and ${this.player.legs()} are tangled in the smooth wooden spiderweb below you, your mind torn between desire for the imp above and fear of the fall below.  You can see from the gleam in the horned creature's red eyes that he has you right where he wants you.\n\n`,
            false
        );
        // New PG
        this.outx(
            "The imp pulls the loincloth from his waist, revealing his red throbbing cock.  It is certainly large, even though it stands smaller than your own erection.  He tosses the cloth aside, and you see him fluttering down toward you just before the rough fabric lands on your face.  His clawed fingers grasp ",
            false
        );
        // Variable cocktext
        if (
            this.player.cocks[0].cockType == CockTypesEnum.HUMAN ||
            this.player.cocks[0].cockType == CockTypesEnum.DEMON ||
            this.player.cocks[0].cockType.Index > 4
        )
            this.outx(
                `your ${this.cockDescript(0)}, rubbing the tip of his prick against your own, `
            );
        else if (this.player.hasKnot(0))
            this.outx(
                `your ${this.cockDescript(0)}, rubbing the tip of his prick against your point, `
            );
        else if (this.player.cocks[0].cockType == CockTypesEnum.HORSE)
            this.outx(
                `your ${this.cockDescript(
                    0
                )}, rubbing the tip of his prick against your flared head, `
            );
        else if (this.player.cocks[0].cockType == CockTypesEnum.TENTACLE)
            this.outx(
                "your huge green dick, rubbing the tip of his prick against your purplish cock-head, ",
                false
            );
        this.outx(
            "smearing your pre-cum together.  You wonder if he is planning on just jerking both of you off as you shake the cloth from your face.  He flashes you an evil smile, making your eyes widen in terror as you realize what he is planning. Before you can even think to make a move to stop him, the imp ",
            false
        );
        if (
            this.player.cocks[0].cockType == CockTypesEnum.HUMAN ||
            this.player.cocks[0].cockType == CockTypesEnum.DEMON ||
            this.player.cocks[0].cockType.Index > 4
        )
            this.outx("shoves his shaft deeply into the slit in the head of your dick.  ");
        else if (this.player.hasKnot(0))
            this.outx(
                "finds the hole in the pointed head of your cock and plunges his shaft deeply into it, literally fucking your urethra.  ",
                false
            );
        else if (this.player.cocks[0].cockType == CockTypesEnum.HORSE)
            this.outx(
                "seats his dick in the flared head of your prick, and then pushes farther. His shaft plunges into yours, filling your cock more than any cum load ever could.  ",
                false
            );
        else if (this.player.cocks[0].cockType == CockTypesEnum.TENTACLE)
            this.outx(
                "shoves his dick deeply into the slit in the head of your vine-like cock.  ",
                false
            );
        // New PG
        this.outx("\n\n", false);
        this.outx("He grips your cock tightly as he fucks you, treating you like a ");
        // Differing cocksleeve texts
        if (this.player.skinDesc == "fur") this.outx("furry cock-sleeve");
        else {
            if (
                this.player.skinTone == "purple" ||
                this.player.skinTone == "blue" ||
                this.player.skinTone == "shiny black"
            )
                this.outx("demonic cock-sleeve");
            else this.outx("human cock-sleeve");
        }
        // Bonus boob shake or period if no boobs.
        if (this.player.breastRows.length > 0 && this.player.biggestTitSize() > 2)
            this.outx(
                `, fucking you so hard that your ${this.player.allBreastsDescript()} bounce with each thrust.  `
            );
        else this.outx(".  ");
        this.outx(
            "It briefly crosses your mind that this should be painful, but something about either his lubrication or yours makes it comfortable enough to have you writhing in pleasure.  ",
            false
        );
        this.outx(
            "He thrusts roughly into you for several minutes, your hips bucking upward to meet him, ",
            false
        );
        if (this.player.cocks.length == 2)
            this.outx("your other cock finding pleasure in rubbing against his body ");
        if (this.player.cocks.length > 2)
            this.outx("your other cocks finding pleasure in rubbing against his body ");
        // Cum
        this.outx(
            "while copious amounts of sweat runs off of both your exposed forms, before he shivers and sinks deeply into you.  He cums hard, the heat of his demon seed burning your loins. His orgasm lasts longer than you think possible, forcing your own climax. Your seed mixes within your body, becoming more than you can handle and spilling out from your urethra around his intruding member.  ",
            false
        );
        // Extra cum-texts
        if (this.player.cocks.length == 2)
            this.outx(
                "Your other cock cums at the same time, liberally splattering your spunk up his back.  ",
                false
            );
        if (this.player.cocks.length > 2)
            this.outx(
                `The rest of your ${this.multiCockDescriptLight()} twitch and release their seed at the same time, creating a shower of spunk that rains down on both you and the imp, coating both of your bodies.  `
            );
        if (this.player.biggestLactation() >= 1)
            this.outx(
                `At the same time, milk bursts from your ${this.nippleDescript(
                    0
                )}s, splattering him in the face.  You feel a sick sort of triumph as you get him back for cumming inside you.  `
            );
        // Vagoooz
        if (this.player.vaginas.length > 0)
            this.outx(
                "Your pussy quivers, contracting furiously as your orgasm hits you - like it's trying to milk a phantom dick dry.  ",
                false
            );
        // new PG
        this.outx(
            "Satisfied, his dick slides from you and he flies away as mixed seed continues to spill from your abused body. Your limbs grow weak, and you fall from the tree with a hard thud before losing consciousness.  ",
            false
        );
        // Take some damage
        this.mainView.statsView.showStatDown("hp");
        // hpDown.visible = true;
        this.player.HP -= 10;
        if (this.player.HP < 1) this.player.HP = 1;
        this.cleanupAfterCombat();
    }
    private centaurGirlOnImps(): void {
        this.outx("", true);
        this.outx(
            "You stand over the thoroughly defeated demon and get an amusing idea. The tiny creatures are far from a threat, but their features seem like they might be useful. You pick the imp up and place him in a tree with explicit orders to him to stay, much to his confusion. Once you're sure he won't move, you wolf whistle and wait.\n\n",
            false
        );
        this.outx(
            "A goblin appears from the underbrush behind you, but a swift kick sends her flying; she's not what you're after. You're soon rewarded with a trio of imps, who fly up to you, cocks at the ready.  Grabbing the defeated imp by the head, you explain your need to the group and waft a bit of your scent over to them with your tail. They confer among themselves only briefly, clear on the decision, as you toss their weaker fellow underneath them. The larger of the three, evidently the leader, smiles lewdly at you and agrees to your 'demands'.\n\n",
            false
        );
        // [Female:
        if (this.player.hasVagina()) {
            this.outx(
                "The imps approach you, their various genitalia glistening in the sun and drawing your attention. Their cocks swing lewdly with every flap of their wings, but you turn around, wanting their ministrations to be a surprise.\n\n",
                false
            );

            this.outx(
                `Hands slide over you, stroking and patting your equine form. The roving fingers find their way to your rear quickly, and begin teasing around your ${this.vaginaDescript()} and ${this.assholeDescript()}. They probe around but don't penetrate and you stamp your hoof in frustration. There's a chuckle from behind you and all but a handful of the hands disappear.\n\n`,
                false
            );

            this.outx(
                `A slightly larger hand smacks your ${this.assDescript()} then slides up and pops a thick finger inside. Your ${this.assholeDescript()} tries to suck it in deeper, but loses the opportunity as it's extracted before doing anything. Instead, the hand returns to your flank and slides slowly forward to your torso.\n\n`,
                false
            );

            this.outx(
                `The 'head' imp comes around into your vision, hovering in front of you and letting you get a good look at his long member. He pulls on it, extracting a large bead of pre onto his other hand. Opening your mouth, he wipes the salty substance onto your tongue. You swallow it happily and feel your mouth watering and your ${this.vaginaDescript()} pumping out fluid.\n\n`,
                false
            );

            this.outx(
                `The leader looks past you and gives a signal to someone you can't see, but you don't have time to turn as a huge dog cock is slipped into your slavering cunt and an even larger spined prick is inserted into your ${this.assholeDescript()}. They begin pumping into you hard, and you whinny in satisfaction while the demon before you watches, jerking on himself.`
            );
            this.player.cuntChange(this.monster.cockArea(0), true, true, false);
            this.player.buttChange(this.monster.cockArea(0), true, true, false);
            this.outx("\n\n", false);

            this.outx(
                'He disappears behind you and gives you a slap on the haunches, yelling, "<i>Giddyup!</i>" and laughing heartily. Whether he expected you to or not, you decide to go for it and push off the ground with your forelegs, kicking them about in the air and feeling the demons aboard you scrabble to stay attached, before setting off at as fast a run as you can. You tear about in the dirt, clumps of mud and weeds flung behind you.\n\n',
                false
            );

            this.outx(
                "At the edge of the clearing is the leader, laughing as he watches you and still jerking himself. As if realizing that there's a better option available, he grabs the defeated imp and inserts himself into him, using him like a living cock sleeve who appears to not mind the position and cries out repeatedly as his ass is abused.\n\n",
                false
            );

            this.outx(
                `Your unexpected running momentarily paused the cocks inside you as their owners groped for holds on your ${this.hipDescript()} and ${this.assDescript()}. With their positions relatively well established, they begin pounding at you again, causing you to nearly stumble in pleasure.\n\n`,
                false
            );

            this.outx(
                "Managing to steady yourself, you run faster, feeling the frenetic cocks inside you explode. The hot spunk sprays about inside and you scream in ecstasy.",
                false
            );
            // [Has breasts:
            if (this.player.biggestTitSize() > 1)
                this.outx(
                    `  Your hands reflexively grab your ${this.chestDesc()} and mash them about.`
                );
            this.outx("\n\n", false);

            this.outx(
                `The owner of the dog-cock in your ${this.vaginaDescript()} manages to insert his knot as his balls empty inside you, but the cat-cock's body has no such luck and his grip on you falters. He slides out of your ${this.assholeDescript()} but manages to grasp the fur of your back and straddle you, all while his cock continues to spray you down with jism.\n\n`,
                false
            );

            // [Has breasts:
            if (this.player.biggestTitSize() > 1) {
                this.outx(
                    `He slides up to your torso and grasps your wildly flailing ${this.player.allBreastsDescript()}, massaging them harshly. His ministrations are surprisingly crude, and you wonder how many times he's attempted to pleasure a woman.`
                );
                // [Has fuckable nipples:
                if (this.player.hasFuckableNipples())
                    this.outx(
                        `  His fingers slide inside your ${this.nippleDescript(
                            0
                        )}s and start spreading and squishing them. Your femcum leaks out over his hands and soon your front is slick and shiny.`
                    );
                // All other nipples:
                else
                    this.outx(
                        "  His fingers grope and grab at your nipples, stretching them uncomfortably. Before you can complain he seems to realize his mistake and releases them.",
                        false
                    );
                // [Is lactating normally:
                if (this.player.biggestLactation() >= 1 && this.player.lactationQ() < 50)
                    this.outx(
                        "  Milk dribbles and squirts from you as his desperate squishing continues, forming small puddles on the ground.",
                        false
                    );
                else if (this.player.biggestLactation() >= 1)
                    this.outx(
                        "  Milk sprays from you as his desperate squishing continues, creating massive puddles of milk that you splash through as you continue moving.",
                        false
                    );
                this.outx("\n\n", false);
            }

            this.outx(
                "You stop running, spraying dirt in a massive fan and sending the imp on your back flying into a tree, where he crumples to the ground unceremoniously. The doggy-dicked imp collapses out of you and is sprayed down with your orgasm, coating him in femcum and his own semen.\n\n",
                false
            );

            this.outx(
                "You trot over to the leader, still using the nearly unconscious imp as a cock sleeve, and pull the abused creature off of him. He looks shocked as you grab his cock and squeeze his balls, causing him to orgasm hard and spray you down in white hot seed. He collapses onto the ground, spent, as you wipe yourself down as best you can.",
                false
            );

            this.outx(
                "  Collecting your things, you give the assorted bodies one last look and stumble back to camp.",
                false
            );
            this.player.orgasm();
            this.dynStats("cor", 1);
        }
        this.cleanupAfterCombat();
    }
    private centaurOnImpStart(): void {
        this.outx("", true);
        // Event: Centaur-Imp: Player Raping
        this.outx("As the imp collapses in front of you, ");
        if (this.monster.HP == 0) this.outx("panting in exhaustion");
        else this.outx("masturbating furiously");
        this.outx(
            ", you advance toward the poor creature.  The demon's eyes run over your powerful equine muscles as you tower above it.  It is difficult to hide your smile as you look at the tiny creature's engorged cock and the perpetual lust filling its beady eyes.",
            false
        );
        // OPTIONAL THOUGHTS
        // [if previously gave birth to imps and Cor >50] A part of you wonders idly if this is one the offspring that you added to this world
        // [corruption is under 80] but the you quickly banish the thought. [corruption is over 80]  and the thought fills you with excitement. ))
        // << Cor <50 >>
        if (this.player.cor < 50)
            this.outx(
                "  You lick your lips slightly as you begin to approach the small figure.",
                false
            );
        else this.outx("You lick your lips obscenely as you approach the small figure.\n\n", false);
        // [Even chance of any of the following happening if the player has the correct equipment, distribute chances between what equipment is available]
        const x: number = this.player.cockThatFits(this.monster.analCapacity());
        if (x >= 0 && !this.player.hasVagina()) this.centaurOnImpMale();
        else if (this.player.hasVagina() && x < 0) this.centaurOnImpFemale();
        else {
            this.outx("Do you focus on your maleness or girl-parts?");
            this.simpleChoices(
                "Male",
                this.createCallBackFunction(this.centaurOnImpMale, true),
                "Female",
                this.createCallBackFunction(this.centaurOnImpFemale, true),
                "",
                undefined,
                "",
                undefined,
                "",
                undefined
            );
        }
    }

    // Player has a cock}}
    private centaurOnImpMale(vape = false): void {
        let x: number = this.player.cockThatFits(this.monster.analCapacity());
        if (x < 0) x = 0;
        if (vape) this.outx("", true);
        this.outx(
            `As your shadow falls over the imp, it looks between your ${this.player.legs()} with a hint of fear.  `
        );
        if (this.player.cockArea(x) <= 15) {
            this.outx(
                `Relief washes over it followed by intense lust as is throws itself onto a mossy rock and eagerly presents its ${this.eAssholeDescript()}.   The sound of your hooves moving on either side of its body seems to send the creature into a frenzy as it begins humping the air while small mewling sounds escape its lips.  `
            );
            // <<Cor <50>>
            if (this.player.cor < 50)
                this.outx(
                    `You slowly rub your ${this.cockDescript(
                        x
                    )} between the creature's cheeks, letting your pre-cum oil the small hole, before slowly beginning the insertion.  Before you can get half-way the creatures drives its self back against you, impaling its ${this.eAssholeDescript()} around your ${this.cockDescript(
                        x
                    )} and making inhuman sounds of ecstasy. The ${this.eAssholeDescript()} relaxes around your ${this.cockDescript(
                        x
                    )}, taking it all in while its practiced muscles grip and jerk you off internally.\n\n`,
                    false
                );
            // <<Cor 50+>>
            else
                this.outx(
                    `You position your ${this.cockDescript(
                        x
                    )} against its dry anus and drive yourself inside of it using your powerful equine legs.  The creatures gives a loud shriek as its insides are forced open, and you feel the raw tightness trying to resist your intrusion.  Giving the creature no chance to relax you begin pistoning into it, grinning as the sounds of pain give way to grunts and yelps of pleasure. You cannot last long in the creature's hole, and soon spurts of cum begin shooting out and filling its bowels.\n\n`,
                    false
                );
            // <<GoTo I1>>
            this.centaurOnImpResults(1);
            // <<End>>
            this.player.orgasm();
            this.cleanupAfterCombat();
            return;
        } else {
            // <<Cock: large, Cor <50>>
            if (this.player.cor < 50) {
                this.outx(
                    `The imp's eyes widen and you see its apprehension as it attempts to turn and flee.  You make soothing sounds as you approach the skittish creature, while easily keeping pace with it.  Seeing little chance for escape, the creature turns toward you again and carefully begins making its way between your ${this.player.legs()}, eyes wide in supplication.  Your smile seems to relax it, and lust fills its eyes again as it slowly starts massaging your ${this.cockDescript(
                        x
                    )}.  Getting more and more confident, the creature is soon using both of its hands on your ${this.cockDescript(
                        x
                    )}, and its wet and serpentine tongue is moving all over the length of your erection.  There is little chance of your ${this.cockDescript(
                        x
                    )} fitting into its small mouth, but it does its best to pleasure you as it goes more and more wild.  `
                );
                // <<Thick large>>
                if (this.player.cocks[0].cockThickness > 3) {
                    this.outx(
                        "It is not long before you feel its tongue slipping into your urethra, and cum rushes from your ",
                        false
                    );
                    if (this.player.balls > 0) this.outx(this.ballsDescriptLight(), false);
                    else this.outx("prostate");
                    this.outx(" as you feel the foreign invader wiggling inside.  ");
                    // <</Thick>>
                }
                this.outx(
                    `You cannot take the attention for long before your hooves are scraping at the ground and jets of sperm shoot out of your ${this.cockDescript(
                        x
                    )} and down its waiting throat.\n\n`,
                    false
                );
                // <<GoTo I2>>
                this.centaurOnImpResults(2);
                // <<End>>
                this.player.orgasm();
                this.cleanupAfterCombat();
                return;
            }
            // <<Cock: large, Cor 50+>>
            else {
                this.outx(
                    `The imp's eyes widen and you see apprehension as it tries to turn around and get away.  It does not make it far before you run it down, knocking it over with your muscled flank.  Before it can try to run again you pin it down and position your ${this.cockDescript(
                        x
                    )} against its ${this.eAssholeDescript()}.  It feels far too small to handle your girth but a push of your powerful legs gets you in with the first inches.  The imp squeals out in pain and you wince slightly in the vice-like grip.  Gritting your teeth you push in the remaining length, the sounds of pain only serving to drive you forward all the harder.  Soon your ${this.cockDescript(
                        x
                    )} is moving in and out with more ease, though the imp's tender asshole is distending abnormally to accommodate the invading member.  As much as you long to extend your pleasure, the sensation and the unnatural sounds of the penetration prove too much for you to last long.\n\n`,
                    false
                );
                // <<GoTo I1>>
                this.centaurOnImpResults(1);
                // <<End>>
                this.player.orgasm();
                this.cleanupAfterCombat();
                return;
            }
        }
        // Tentacledicks!
        // {{Player has 1+ very long (smallest 2+ feet) tentacle cocks}}
        if (
            this.player.cockTotal() > 1 &&
            this.player.cocks[this.player.biggestCockIndex()].cockLength >= 24
        ) {
            this.outx(
                `As your shadow falls over it, it looks with a hint of fear between your legs, and then its eyes widen in a mixture of apprehension and lust.  Before you can even more the little creatures scrambles forward between your hooves and wraps its hands around your ${this.cockDescript(
                    this.player.biggestCockIndex()
                )}.  Its tongue begins to trail all along the length of it as its small hands stroke it intensely.\n\n`,
                false
            );
            // << Cor <50>>
            if (this.player.cor < 50) {
                this.outx(
                    `You slowly undulate your ${this.cockDescript(
                        this.player.biggestCockIndex()
                    )} against the creature's mouth, delighting in its eager tongue.  `
                );
                // <<GoTo I3 then return>>
                this.centaurOnImpResults(3);
                this.outx(
                    `The sounds beneath you quickly take on a more intense note and you feel massive amounts of cum splashing liberally over your hooves, belly, and ${this.cockDescript(
                        this.player.biggestCockIndex()
                    )}.  The hot sensation sends you over the edge as you begin spilling yourself into the creature's eager mouth.\n\n`,
                    false
                );
                // <<GoTo I2>>
                this.centaurOnImpResults(2);
                // <<End>>
                this.player.orgasm();
                this.cleanupAfterCombat();
                return;
            }
            // << 1 or 2 cocks, Cor 50+>>
            else if (this.player.cockTotal() == 2) {
                this.outx(
                    `With an evil smile you wait for your ${this.cockDescript(
                        this.player.smallestCockIndex()
                    )} to be at its lips before you slide it forward into its waiting mouth.  Giving it little more than a moment to catch its breath you slide your ${this.cockDescript(
                        this.player.smallestCockIndex()
                    )} further and down the creature's throat.  Though you cannot see the obscene bulge it is making in the creature's mouth-pussy you delight in the intense tightness beneath you.  The throat muscles are massaging your ${this.cockDescript(
                        this.player.smallestCockIndex()
                    )} as the imp desperately scrambles for air, pulling at the tentacles you have forced into it.  It cannot even begin to close its jaw as you thrust deeper and deeper, as you try to intensify the sensations.\n\n`,
                    false
                );
                this.outx(
                    `As the imp is focused on the tentacles cutting off its air, you position your ${this.cockDescript(
                        this.player.biggestCockIndex()
                    )} against its ${this.eAssholeDescript()}.  Pausing only for a second for the pleasure of anticipation, you shove yourself deep inside the imp's ${this.eAssholeDescript()}, only making it a few inches before having to pull back and try again.  The creature's throat seems to be working overtime now as it tries to divide its attention between the two invaders.  Each thrust of your ${this.cockDescript(
                        this.player.smallestCockIndex()
                    )} makes it a little bit deeper inside of the creature, and you wonder passionately if you can get the two to meet in the middle.\n\n`,
                    false
                );
                this.outx(
                    "It is not long before you begin to feel the creature's struggles slowing down.  ",
                    false
                );
                // <<Cor <80 >>
                if (this.player.cor < 80) {
                    this.outx(
                        `Feeling merciful you extract yourself from the creature, flipping it unto a nearby rock as it begins to regain consciousness.  Before it realizes what you are doing your ${this.cockDescript(
                            this.player.biggestCockIndex()
                        )} is prodding at its ${this.eAssholeDescript()}, then sliding quickly between its cheeks.  The amount of slobber over you is more than enough lubricant.  You groan in pleasure as it gives a slight squeal, then proceed to finish yourself off in the once-tight orifice.\n\n`,
                        false
                    );
                    // <<Goto I1>>
                    this.centaurOnImpResults(1);
                    this.player.orgasm();
                    this.cleanupAfterCombat();
                    return;
                }
                // <<Cor 80+>>
                else {
                    this.outx(
                        `You groan in pleasure and slide your ${this.cockDescript(
                            this.player.biggestCockIndex()
                        )} even deeper down the creature's throat, until you can feel its head against your `
                    );
                    // <<if balls>>
                    if (this.player.balls > 0)
                        this.outx(`${this.ballsDescriptLight()}.\n\n`, false);
                    else this.outx("groin.\n\n", false);
                    // <<GoTo I3 then return>>
                    this.centaurOnImpResults(3);
                    this.outx(
                        "A guttural moan escapes your mouth as you realize the creature has completely passed out underneath you.  ",
                        false
                    );
                    if (this.player.hasFuckableNipples())
                        this.outx(`Shoving your fingers deep into your ${this.nippleDescript(0)}s`);
                    else this.outx(`With a fierce tug on your ${this.nippleDescript(0)}s`);
                    this.outx(
                        `you begin to cum deep and directly into the imp's stomach and ${this.eAssholeDescript()}.  `
                    );
                    // <<cum multiplier: lots>>
                    if (this.player.cumQ() > 250)
                        this.outx(
                            "Beneath you the creature's belly is distending more and more, and you can feel some of the overflowing cum filling back out until it is pouring out of the creature's unconscious mouth and overstretched ass, forming a spermy pool beneath it.",
                            false
                        );
                    this.outx(
                        `With on last grunt you begin extracting the tentacles back out, almost cumming again from the tightness around them.  You give your ${this.cockDescript(
                            this.player.smallestCockIndex()
                        )} one last shake over the creature's face before trotting away satisfied and already thinking about the next creature you might abuse.`
                    );
                    this.player.orgasm();
                    this.cleanupAfterCombat();
                    return;
                }
            }
            // << 3+ cocks, Cor 80+>>
            else {
                this.outx(
                    `With an evil smile you wait for the creature's mouth to touch one of your tentacles before the other two snake their way down and wrap themselves around the imp's thighs.  With a tug the creatures is pulled off of it's feet and upside down, its eyes widening in a mixture of fear and debased lust as it sees your ${this.cockDescript(
                        this.player.biggestCockIndex()
                    )} undulating in front of it.  You slowly move the tentacle up as your other cocks forcefully tug its legs apart, and then playfully begin sliding yourself over the imp's small cheeks.\n\n`,
                    false
                );
                // <<Cor 80+, has given birth to an imp>>Part of you wonders idly if this is one of the creatures that you spawned, and that left its spermy surprise on you after it came out of the womb<</Cor>>
                this.outx(
                    `Licking your lips in anticipation you begin pushing your ${this.cockDescript(
                        this.player.biggestCockIndex()
                    )} into the imp's ${this.eAssholeDescript()} while listening to the mewling sounds coming from beneath you.  You take your time as you push in, seeing no need to rush yourself as you feel the creature gaping more and more.  Once you bottom out you reach down and grab the creature's arms, securing it firmly against your belly as you break into a trot.  The sensation of the imp's ${this.eAssholeDescript()} bouncing around your ${this.cockDescript(
                        this.player.biggestCockIndex()
                    )} is intense and you ride harder until you know you are close to the bring.  Quickly you slow down and drape the creature over a nearby boulder, using your hands and tentacles to pin it to the harsh surface, and then your mighty legs push you forward even deeper into the creature's bowels.  The shriek should be audible pretty far in this area, and you groan in debased pleasure thinking it might draw someone else for you to rape or be raped by.  Grunting slightly you begin pushing into the imp even harder just to generate more loud sex-noise.  `
                );
                // <<Breasts>>
                if (this.player.biggestTitSize() >= 0) {
                    this.outx(
                        `One of your hands releases it and begins playing with your ${this.player.allBreastsDescript()}`
                    );
                    // <<nips have pussies>>
                    if (this.player.hasFuckableNipples())
                        this.outx(` and fingering your ${this.nippleDescript(0)}s`);
                    this.outx(" as you drool slightly in absolute pleasure.  ");
                }
                this.outx(
                    "When the creature's noises lessen and all you can hear is the sloppy sounds of its ass being fucked you push yourself in a single mighty heave, grinding the creature into the rock and eliciting one last scream that pushes you over.\n\n",
                    false
                );
                // <<GoTo I1>>
                this.centaurOnImpResults(1);
                // <<End>>
                this.player.orgasm();
                this.cleanupAfterCombat();
                return;
            }
        }
        this.player.orgasm();
        this.cleanupAfterCombat();
    }
    // CUNTS
    private centaurOnImpFemale(vape = false): void {
        if (vape) this.outx("", true);
        // PREGGERS CHANCE HERE - unfinished
        // {{Player has a cunt}}
        this.player.slimeFeed();
        this.player.knockUp(PregnancyStore.PREGNANCY_IMP, PregnancyStore.INCUBATION_IMP);
        this.outx(
            `As the imp lays beaten its hands stroke its ${this.monster.cockDescriptShort(
                0
            )} as its eyes look over you in the hope that you might abuse it in some manner.  You lick your lips as you stare at the large member and you turn around to display your ${this.vaginaDescript(
                0
            )}.  `
        );
        // Not gaping?
        if (this.player.vaginas[0].vaginalLooseness <= VAGINA_LOOSENESS_GAPING) {
            // Penetration for non-gape cases
            this.outx(
                `With a lascivious grin the imp hops forward, gripping your flanks as it drives its member forward into your ${this.vaginaDescript(
                    0
                )}.  `
            );
            // <<If Pussy Virgin>>
            if (this.player.vaginas[0].virgin) {
                this.outx(
                    "You cry out as your virginal pussy is torn open by the massive member and the creature cries out in pleasure as it realizes what it has taken from you.  ",
                    false
                );
                // [Lose Virginity] <</Virgin>>
            }
            // Not virgin fucking flavors
            else {
                if (this.player.vaginalCapacity() < this.monster.cockArea(0))
                    this.outx(
                        "It groans in delight at your incredible tightness and shoves itself forward even harder.  ",
                        false
                    );
                // [Increase size as needed]
                // <<At Dicksize>>
                if (
                    this.player.vaginalCapacity() >= this.monster.cockArea(0) &&
                    this.player.vaginalCapacity() <= this.monster.cockArea(0) * 1.25
                )
                    this.outx(
                        `It makes a pleased sound as it slides deeply into your ${this.vaginaDescript(
                            0
                        )}.  `
                    );
                // <<Bigger than dicksize>>
                if (this.player.vaginalCapacity() >= this.monster.cockArea(0) * 1.25)
                    this.outx(
                        "Its dick slides easily and slopping noises start sounding from your backside.  Part of you wishes that its large member was larger still, as your mind drifts to some of the monstrous cocks that have penetrated you in the past.  ",
                        false
                    );
            }
            // Ride around with him till he cums and falls off
            this.outx(
                `When the creature completely bottoms out inside of you, you begin trotting forward with a wicked grin.  The creature's hands grasp your flanks desperately, and its ${this.monster.cockDescriptShort(
                    0
                )} bounces inside your ${this.vaginaDescript(
                    0
                )}, adding to your sensation.  The movement is causing the imp to push himself even harder against you as it tries to not fall off, and it is all you can do to keep an eye on where you are going.  Soon you can feel the imp's sperm filling your ${this.vaginaDescript(
                    0
                )} and overflowing even as your cunt-muscles try to milk it of all of its seed. Unsatisfied you begin to speed up as you use its ${this.monster.cockDescriptShort(
                    0
                )} to bring about your own orgasm.  The small creature is unable to let go without hurting itself.  It hangs on desperately while you increase the pace and begin making short jumps to force it deeper into you.  The feeling of sperm dripping out and over your ${this.clitDescript()} pushes you over and cry out in intense pleasure.  When you finally slow down and clear your head the imp is nowhere to be seen.  Trotting back along the trail of sperm you left behind you find only its small satchel.`
            );
            this.player.cuntChange(this.monster.cockArea(0), true, true, false);
            this.player.orgasm();
            this.cleanupAfterCombat();
            return;
            // END OF NON GAPE CASE
        }
        // <<Gaping>>
        else {
            this.outx(
                `With a lascivious grin the imp hops forward, gripping your flanks as it drives its member forward into your ${this.vaginaDescript(
                    0
                )}.  While you might have considered him large before you came to this place, the sensation is now merely pleasant, and you can't help but groan in slight disappointment.  `
            );
            // <<Cor 50+>>
            if (this.player.cor >= 50)
                this.outx(
                    "You take comfort in knowing that at least there is a cock inside of you, and that soon it will be filling you with its seed.  Perhaps it might even impregnate you!  ",
                    false
                );
            this.outx(
                `The imp seems to have shared your initial annoyance, and suddenly you feel strange and harsh objects prodding your ${this.vaginaDescript(
                    0
                )} near where you are being penetrated.  Suddenly you feel yourself being forced open even wider, and you feel almost as if you are getting kicked inside of your pussy.  A second object touches near where the first had entered and you quickly brace yourself against a nearby tree.  The second jolt is even harder, feeling as if your cervix is getting stomped.  You howl out in pain as your pussy is virtually torn open, the imp using your tail to leverage not only his ${this.monster.cockDescriptShort(
                    0
                )} but also his legs inside your ${this.vaginaDescript(0)}.  `
            );
            // <<Cor <80>>
            if (this.player.cor < 80)
                this.outx(
                    "Tears pour out of your eyes and you are sure you must be bleeding slightly, ",
                    false
                );
            // <<Cor <50>>
            if (this.player.cor < 50)
                this.outx(
                    "and you hang on to the tree, afraid of the pain from even the slightest movement.  ",
                    false
                );
            // <<Cor 50+>>
            else
                this.outx(
                    "and you hang on to the tree, grunting like a rutting animal as you delight in the intense pain.  ",
                    false
                );
            // <<Cor 80+>>
            if (this.player.cor >= 80)
                this.outx(
                    "You howl out in pain and pleasure, bucking and hoping to intensify the sensation, hurling enticements and insults at the imp like a slut.  ",
                    false
                );
            // <<Cor 50+, Breasts>>
            if (this.player.cor >= 50 && this.player.biggestTitSize() >= 2) {
                this.outx(
                    `You release the tree as you begin playing with your ${this.player.allBreastsDescript()}`
                );
                // <<w/ nip-pussies>>
                if (this.player.hasFuckableNipples())
                    this.outx(` and shoving your fingers into your ${this.nippleDescript(0)}.  `);
                else this.outx(".  ");
                // <</Breasts>>
            }
            this.outx(
                `The imp is pushing deeper and deeper and in moments you cry out again as you feel first its hooves and then its ${this.monster.cockDescriptShort(
                    0
                )} tearing open your cervix and bottoming out in your womb.  `
            );
            // <<Asshole large+>>
            if (this.player.analCapacity() >= 35) {
                this.outx(
                    `When the imp realizes it cannot go any further you feel its hands against your asshole, and your eyes go wide in realization of what it is planning on doing.  Lubed up by your now drooling juices, the fist pushes hard into your ${this.assholeDescript()}, shoving past your ring-muscles.  `
                );
                // <<Assole <gaping, Cor <80>>
                if (this.player.ass.analLooseness < 4 && this.player.cor < 80)
                    this.outx("Your howl of pain leaves your throat raw.  ");
                else this.outx("Your howl of perverse pleasure leaves your throat raw.  ");
            }
            this.outx(
                "\n\nIt is a relief when you feel the creature's sperm filling your womb and lubricating your raw cervix, your own body is wrecked by an intense orgasm while it breeds you.  You pass out, waking up to find that the imp has slipped out of you and is lying unconscious and coated completely in a mixture of your juices and his own. After looking for anything you might be able to take away from him you limp away, you ",
                false
            );
            if (this.player.cor < 80)
                this.outx("promise to yourself that you will not do that again.");
            else
                this.outx(
                    "find your cunt juices already dripping down your legs in anticipation of doing this again.",
                    false
                );
            this.player.orgasm();
            this.cleanupAfterCombat();
            return;
        }
        this.player.orgasm();
        this.cleanupAfterCombat();
    }

    /*
    {{Any player: Oral Give}}
    <<Cor <30>>You look furtively at the imp's [imp cock desc] as the creature masturbates shamelessly on the ground in front of you.  Unable to help yourself, you trot closer and closer, leaning in to get a better look at its giant member.  A lustful part of you wonders what the dripping pre-cum would taste like against your tongue.<<else if Cor <50>>You look lustfully at the imp's [imp cock desc] as the creature masturbates shamelessly on the ground in front of you.  Licking your lips in anticipation you walk closer, lowering your head to better inspect it.  <<else>>Your grin betrays your lust as you watch the imp masturbate its [imp cock desc] shamelessly on the ground.  Your hands already drift over your body as you trot over and grab a hold of its [imp cock desc], bringing it to your eager lips.<</Cor>>  The Imp's eyes shoot open as its hands grab a hold of your [hair desc - if no hair, then ears] and it pulls its member against your lips.  With your guard down, images of fellating the [imp cock desc] fill your mind with overwhelming intensity.  The visions cause your jaw to fly open without any trace of your own volition, and suddenly the [imp cock desc] is forcing its way to the back of your throat.  <<Cor <40>>Your gag reflexes are trying desperately to kick in, serving only to massage the [imp cock desc] as the creature makes guttural noises and pushes its self even deeper. <<else if Cor <70>> Though it takes you a moment to get adjusted to the intrusion, soon you are able to relax your throat like an expert cock-swallower, taking it even deeper. <<else>>You moan around the creature's [imp cock desc], opening your throat as your eyes plead with it to fuck your mouth-hole even deeper.<</Cor>>

    The creature's pre-cum tastes more like brimstone than salt, and yet something about it inflames you as it pools in your mouth and pours down your throat.  <<Cor <30>>It is disgusting to let this substance inside your body, but the images keep you from resisting. <<else Cor <60>>The corrupt fluids seem unusual, but something about the lewd act makes them more than worthwhile and you take some delight in knowing they are filling your body. <<else>><<If Pussy>>Your [pussies desc] start drooling juices, <</Pussy>><<If cock and pussy>>and your<<else If Cock>>Your cock grows rock hard<</If>>as you feel the corrupt fluids flowing throughout your body.<</Cor>> Without even having to think about it you reach out and <<Str <80>>stroke its [imp cock desc], trying to milk more of it into you <<else>>pick up the imp with one hand, your other hand stroking its [imp cock desc] and trying to milk more of it into you<</Str>><<Cor 80+, Str <80>> as you shove a finger into its [imp anus desc]<<else Cor 80+, Str 80+>> then shoving a finger into its [imp anus desc] and using the new form of grip to move the creature into and out of your mouth-hole<</Cor>>.<<Goto I3 then return>>  In only a few minutes the creature begins to lose its ability to resist your <<Cor <30>>tight<<else Cor <60>> skilled <<else>> eager <</Cor>> throat and begins to pour massive amounts of corrupt cum into your stomach. <<Cor 60-79>>As much as you love having your stomach filled with sperm, you quickly pull the imp back so that some of it might land on your tongue for you to savor.  The excessive cum is soon dripping down your lips, no matter how fast you try to swallow.<<else Cor 80+>>As much as you love having your stomach filled with sperm, a perverse thought fills you and you pull the creature out, <<Str 80+>>holding the creature over your head as <</Str>>you guide its [imp cock desc] to liberally coat your face <<Breasts>>and [breasts desc]<</Breasts>>.<</Cor>>You lick your lips clean of the creamy mess as you put down the now unconscious Imp and give it a look-over for valuables.  <<Cor 80+>>As you trot back the way you have come you idly trace a finger through the dangling sperm, hoping someone might see what a [slur] you have become becomes too uncomfortable to wear.  Though if you have to clean it off, you can always get more.. perhaps from an even more copious source.<<end>>

    {{Any player: Anal Receive}}
    As you watch the imp stroking its [imp cock desc] you find it difficult to resist the urge to feel that massive member sliding into your body.  Slowly you trot closer, turning around to display your rear to the creature.  <<Pussy, Cor <30>>Your [largest pussy desc] is already drooling in anticipation of the cum it is about to receive, though to your surprise you feel the imp's [imp cock desc] bumping slightly above it.  You try to turn and stop it, but the creature pushes deep past your anal muscles before you have a chance.<<else>><<Pussy, Cor <50>>>>Your [largest pussy desc] is already drooling in anticipation of the cum it is about to receive, though to your surprise you feel the imp's [imp cock desc] bumping slightly above it. You brace yourself in anticipation and slight trepidation, delighting in the perversion you are about to take part in. <<else Pussy, Cor 50+>>Though your [largest pussy desc] is dripping at the chance at being bred, you feel like you would like somehing a lot more raw.  Breathlessly you beg it to fuck your [anus desc], debasing yourself and lowering yourself to the ground so you can be as accessile as possible. You moan like a [slur] in anticipation of feeling a cock shoved deep into your [anus desc] <<Breasts>>gripping your nipples hard<<else>>raking your body with your nails<</Breasts>>as you try to keep from biting through your lips.  <</Pussy,/Cor>><<no Pussy>><<Cock>>Your [cocks desc] harden in anticipation<<else>>You rake your nails over your sides in anticipation<</Cock>> as you feel the creature prepare to mount you, its [imp cock desc] pressing up against your [anus desc].  <</no pussy>>
    <<Cor 30+, Cor <50>> As the imp slowly pushes into your [anus desc] you moan in animalistic pleasure.<<else>>When you begin to feel your [anus desc] being distended you cry out and beg it to shove it harder, faster, to take your asshole as roughly as it can!<</Cor>><<anus smaller than dick>>The sheer size of the [imp cock desc] tears your anus open, sending streams of pain into you as you cry out in agony.[if anus smaller than dick, increase size]<</anus>>
    [if anal virgin, lose anal virginity]

    The Imp grunts as it ruts your [anus desc], and you can feel it bumping deeply against your bowels.  After a few minutes the initial pain is gone and you find yourself making bestial sounds along-side the overly-endowed creature.  You long to feel its cum filling you to overflowing, and break into a slight trot that causes the small imp to bounce around inside of your tightening asshole.  The combination of movement, grip, and its own furious thrusting seems to push it over the edge and you can feel jets of sperm shooting deeply into you, sending you into your own anal orgasm.  Used to the limit, the imp slides out of you and drops to the ground, barely conscious. <<Cor 80+>>Grinning at the perversity, you lower yourself down and take its dirty [imp cock desc] into your mouth, cleaning it thoroughly as you enjoy the mixture of your juices.  Your intense sucking and stroking causes a few last spurts of cum to fly out, and you pull the imp out lock enough to shoot the gouy mess over your face and hair while you swallow what was already in your mouth.<<end>>

    {{Player has breast-pussies and is E+ sized breasts}}
    As the imp falls to the ground, furiously masturbating its [imp cock desc] you smile in delight, your [nip-pussy desc] already beginning to grow wet <<lots of milk>>with the massive flow of milk pouring out of them<</milk>>.  You approach the little Imp at an eager trot, lowering yourself down and encasing its [imp cock desc] in your [breasts desc].  Its eyes fly open and stare in wicked delight at what it sees, quickly reaching out and beginning to fondle and finger your [nip-pussy desc].  Unable to resist any more, you press the opening of one of your [breasts desc] against the tip of the [imp cock desc].  If the creature is confused it does not show it, shoving its self hard quickly and hard into your tit.  [if virgin-nip, lose virginity]<<nip-size smaller than dick size>>Pain shoots through you as you feel the [nip-pussy desc] being forced to widen by the imp's massive tool, and you let out a slight scream [increase nip-pussy size]<</smaller>>  Without missing a beat the creature wraps its hands around your [breast desc] and begins thrusting liberally into it as if your tit was nothing more than a giant and perverted fuck-toy.  Seeing no point in arguing with the perception, you reach over and start shoving your own finger into your other [nip-pussy desc], crying out as you urge the imp to use your [breast desc].  Part of you longs to feel the imp's thick and corrupted cream filling your tit-hole, <<Cor <80>> and you begin moving your breast in circles around the thrusting member. <<else>>and you lower your breast against a rock, letting the imp squish your breast under its weight, grinding it into the rough stone as it continues to fuck it<</Cor>>.  The Imp seems to really enjoy this and after a few more minutes of intense pleasure it begins pouring its cum inside of your chest.  Without anywhere to go the cum pours back out, mixed with torrents of milk that are being stimulated out of you.  Exhausted the imp falls to the ground <<Cor <30>>leaving you frustrated. [no lust reduction] <<Cor <50>>before it can see you bringing your nipples to your mouth and sucking on the spermy mixture until you bring yourself to orgasm. <<Cor 80+>>before it can see you bringing your nipples to your mouth.  You suck hard to get to as much of its sperm as you can, shoving your tongue deep into yourself and digging around wih your fingers.  When this is not enough to bring you to orgasm you slap and bite your [nip-pussy desc], crying out as the intensity and perversion finally proves enough to push you over the edge.<</Cor>><<end>>
    */

    private centaurOnImpResults(iNum: number): void {
        let x: number = this.player.cockThatFits(this.monster.analCapacity());
        if (x < 0) x = 0;
        // {{ GoTo results }}
        // <<I1>>
        if (iNum == 1) {
            // <<cum multiplier: lots>>
            if (this.player.cumQ() >= 250) {
                // <<no knot>>
                if (this.player.cocks[x].cockType != CockTypesEnum.DOG)
                    this.outx(
                        `Soon the amount is overflowing from the abused ${this.eAssholeDescript()}, dripping between you with no sign of stopping as you continue thrusting yourself into the imp.  `
                    );
                // <<knot>>
                else
                    this.outx(
                        `Soon the abused ${this.eAssholeDescript()} is full to the brim, though your knot keeps any from escaping while more and more pumps in.  Soon the creature's belly is distending and the imp is gasping wordlessly. `
                    );
                this.outx(
                    `When your ${this.cockDescript(
                        x
                    )} finally emerges a torrent of cum follows out of the distended hole and covering the back of the creature's legs.  `
                );
                // <<I1_1>>
                // <<2 cocks>>
                if (this.player.cockTotal() == 2)
                    this.outx(
                        "Your other cock drenches the imp's back with its own secretions that immediately start dripping down its sides.  ",
                        false
                    );
                // <<3+ cocks>>
                if (this.player.cockTotal() > 2)
                    this.outx(
                        "Your other cocks release their cum all over the creature's back and sides, leaving it a glazed mess.  ",
                        false
                    );
                // <</I1_1>>
                this.outx("You leave him panting and lapping at a pool of your semen.");
            } // <</multiplier>>
            // <<cum multiplier: little-normal>>
            else {
                this.outx(
                    `With a last thrust into the cum receptacle you begin slowing down, even as its own ${this.monster.cockDescriptShort(
                        0
                    )} spills its seed over the ground.  `
                );
                // <<I1_1>>
                // <<2 cocks>>
                if (this.player.cockTotal() == 2)
                    this.outx(
                        "Your other cock drenches the imp's back with its own secretions that immediately start dripping down its sides.  ",
                        false
                    );
                // <<3+ cocks>>
                if (this.player.cockTotal() > 2)
                    this.outx(
                        "Your other cocks release their cum all over the creature's back and sides, leaving it a glazed mess.  ",
                        false
                    );
                // <</I1_1>>
                this.outx(
                    "You leave him panting and draped over the mossy boulder in a pool of your joint cum.",
                    false
                );
            }
            return;
        }
        if (iNum == 2) {
            // <<cum multiplier: lots>>
            if (this.player.cumQ() >= 250) {
                this.outx(
                    "The imp's eyes widen in at the amount pouring in, and gobs of sperm begin overflowing down its chin.  ",
                    false
                );
                // <<(lots cont.)  cum multiplier: excessive>>
                if (this.player.cumQ() >= 500)
                    this.outx(
                        "No matter how fast it is swallowing it does not seem to be enough, and soon its belly is distended and its skin is covered in a thick coating of cum.  ",
                        false
                    );
                // <</multiplier>>
            }
            this.outx(
                "Sated you trot away and leave the creature licking its lips and fingers, its eyes following you with lustful cunning.",
                false
            );
            // <</I2>>
            return;
        }
        // <<I3>>
        if (iNum == 3) {
            // <<Has Breasts>>
            if (this.player.biggestTitSize() >= 2) {
                this.outx(
                    `As the sensations intensify you reach up and begin massaging your ${this.breastDescript(
                        0
                    )} and playing with your ${this.nippleDescript(0)}s.  `
                );
                // <<(breasts cont.) nips have pussies>>
                if (this.player.hasFuckableNipples()) {
                    // <<nip-pussies and milk>>
                    if (this.player.biggestLactation() >= 1)
                        this.outx(
                            `Milk streams out from your ${this.nippleDescript(
                                0
                            )}s as if they had been recently filled with dripping cum.  `
                        );
                    else
                        this.outx(
                            `Your fingers slide faster and faster into your ${this.nippleDescript(
                                0
                            )}s even as the imp begins to stroke itself under you.  `
                        );
                }
                // No pussies
                else {
                    // <<else no pussies, has milk>>
                    if (this.player.biggestLactation() > 0) {
                        // <<little milk>>
                        if (this.player.biggestLactation() <= 1)
                            this.outx(
                                "Beads of milk begin to drip down your chest and occasionally spurt outward.  ",
                                false
                            );
                        // <<else>>
                        else
                            this.outx(
                                `Milk pours out of your ${this.breastDescript(
                                    0
                                )} and streams down your body.  `
                            );
                    } // <</milk>>
                }
            } // <</Breasts>>
            return;
        }
    }

    private areImpsLactoseIntolerant(): void {
        this.outx("", true);
        this.outx(
            `You advance on the masturbating imp, baring your ${this.player.allBreastsDescript()} and swinging them from side to side. The little creature watches them, mesmerized as he masturbates his foot-long erection.\n\n`,
            false
        );

        this.outx(
            `You sit down in front of the little creature and grab ahold of his hair. The imp squeals slightly in pain before his cries are silenced with a ${this.nippleDescript(
                0
            )}.  It fills his mouth as he yields, defeated. At once he starts to drink down as much of your milk as he can.\n\n`,
            false
        );

        this.outx(
            `After a moment, he takes one of his hands off his large member and puts it against your ${this.biggestBreastSizeDescript()} to steady himself as he continues to nurse. You give a pleased sigh and simply bask in the sensations of pleasure that being nursed gives you.  You ruffle the little imp's hair affectionately. "<i>These creatures are so much nicer to be around when they just take their minds off their cocks,</i>" you think as you see his other hand relax and stop rubbing his swollen, demonic member.\n\n`,
            false
        );

        this.outx(
            `You feel the imp's mighty gulps start to slow down until he lets out a sigh of relief. While imps may be small, they're very hungry creatures. Your ${this.nippleDescript(
                0
            )} slips out of the imp's mouth, and you gently lay it down on the ground. It gives a few gentle burps before dozing off; you can see that the imp's erection has retracted, and its belly has expanded significantly. You smile to yourself and, feeling fully satisfied, you stand up.`
        );
        // set lust to 0, increase sensitivity slightly
        this.dynStats("lib", 0.2, "lus", -50);
        this.player.milked();
        this.cleanupAfterCombat();
    }

    public impGangabangaEXPLOSIONS(): void {
        this.player.slimeFeed();
        this.spriteSelect(18);
        // Set imp monster values
        // Clear arrays in preparation
        this.monster = new ImpGang();
        this.outx("\n", false);
        this.outx(
            `<b>You sleep uneasily. A small sound near the edge of your camp breaks into your rest and you awaken suddenly to find yourself surrounded by ${this.monster.a}</b>!\n\n`,
            false
        );
        // CENTAUR
        if (this.player.lowerBody == LOWER_BODY_TYPE_CENTAUR) {
            if (
                ImpScene.rand(2) == 0 &&
                (this.player.cockTotal() == 0 || this.player.gender == 3)
            ) {
                // (First encounter)
                if (this.player.findStatusAffect(StatusAffects.ImpGangBang) < 0) {
                    this.outx(
                        `The imps stand anywhere from two to four feet tall, with scrawny builds and tiny demonic wings. Their red and orange skin is dirty, and their dark hair looks greasy. Some are naked, but most are dressed in ragged loincloths that do little to hide their groins. They all have a ${this.monster.cockDescriptShort(
                            0
                        )} as long and thick as a man's arm, far oversized for their bodies. Watching an imp trip over its ${this.monster.cockDescriptShort(
                            0
                        )} would be funny, if you weren't surrounded by a horde of leering imps closing in from all sides...\n\n`,
                        false
                    );
                    this.player.createStatusAffect(StatusAffects.ImpGangBang, 0, 0, 0, 0);
                    this.outx(
                        `The imps leap forward just as you start to ready your ${this.player.weaponName}, one sweaty imp clinging to your arm`
                    );
                    // (If the player has a weapon)
                    if (this.player.weaponName != "fists")
                        this.outx(" while another kicks your weapon out of reach");
                    this.outx(
                        `.  The ${
                            this.monster.short
                        } surges forward and grapples you. Imps grope your body and hump their ${this.monster.cockDescriptShort(
                            0
                        )} against your horse legs, smearing their sweat and pre-cum into your ${
                            this.player.skinDesc
                        }. The rest of the ${
                            this.monster.short
                        }, a dozen or more imps, all leer at you and laugh as they slap and pinch your body. The imps have sharp claws, tiny sharp teeth, and short horns on their heads. They scratch, claw, and bite at you with all of these weapons as they try to pull you down to the ground. One bold imp leaps forward and grabs your `
                    );
                    // (If the player has a cock)"
                    if (this.player.cockTotal() > 0) this.outx(this.cockDescript(0), false);
                    // (If the player has breasts)
                    else this.outx(this.nippleDescript(0), false);
                    this.outx(
                        `, twisting and pinching hard enough to make you yelp in pain. An imp leaps up and mounts you, grabbing your ${this.hairDescript()} like reins. The long flesh of his ${this.monster.cockDescriptShort(
                            0
                        )} rubs against the small of your back. The ${
                            this.monster.short
                        } stinks of sweat and pre-cum, its moist grip and obscene smirk leaves you with no doubt as to what they will do to you if you lose this fight.\n\n`,
                        false
                    );
                }
                this.outx(
                    `The horde drags you to your knees, grappling your legs and crawling over your horse-body to pin you down. You try to buck them off but there are too many to fight. The imps drag your arms behind your back, wrapping them around your rider. Another imp whips off his loincloth to reveal his pre-cum drooling ${this.monster.cockDescriptShort(
                        0
                    )} and tosses the cloth to the imps holding your arms. They quickly tie your arms back with the sweat-damp loincloth.  `
                );
                // (If the player has breasts)
                if (this.player.biggestTitSize() > 1)
                    this.outx(
                        `Having your arms tied behind your back forces your chest out, making your ${this.player.allBreastsDescript()} stand out. They bounce as you struggle.  `
                    );
                this.outx(
                    `The ${
                        this.monster.short
                    } stroke themselves and rub their hands over your outstretched chest, smearing their pre-cum into your skin. The imp riding you bounces up and down, rubbing his sweaty ${this.monster.ballsDescriptLight()} against your ${
                        this.player.skinDesc
                    } while he yanks your hair.  `
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `Your face flushes with humiliation. Your imp rider twists your ${this.hairDescript()} hard and you whimper in pain. Imps rub their cocks along your ${this.hipDescript()} while others stroke themselves and jeer at your helplessness.  `
                    );
                // (High Corruption)
                else
                    this.outx(
                        `${this.monster.capitalA} swarms over your body, some stroking themselves as they watch you squirm while others rub their cocks over your flanks. Your imp rider twists your hair, pulling your head back, and you moan in pleasure at the rough handling. Your ${this.player.skinDesc} tingles as you start to flush with desire.  `
                    );
                this.outx(
                    `You yelp in shock as you feel a sharp slap on your ass. You look back to see an imp pulling your tail up. He grins at you and slaps your ${this.hipDescript()} again. He yanks your tail and slaps your ass one last time, then dives down to plant his face in your ${this.vaginaDescript(
                        0
                    )}. His inhumanly nimble tongue teases the folds of your pussy and flicks at your ${this.clitDescript()}.  `
                );
                // (If the player has balls)
                if (this.player.balls > 0)
                    this.outx(
                        `The tongue slides over your ${this.sackDescript()}, coating it with warm drool.  `
                    );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `You shake your hips, trying to escape the demonic tongue. The imp grips your ${this.hipDescript()} and pulls his face further into your cunt, sliding his nimble tongue over your lips. You grit your teeth, trying to ignore the warmth spreading from your ${this.vaginaDescript(
                            0
                        )}.`
                    );
                // (High Corruption)
                else
                    this.outx(
                        `You let out a shuddering sigh as the heat from your cunt spreads into the rest of your body. Your ${this.hipDescript()} tremble as the tongue slides over the folds of your ${this.vaginaDescript(
                            0
                        )}. The imp grips your flanks harder and dives his nimble tongue into your fuck-hole.`
                    );
                this.outx("\n\n", false);

                // (If the character has breasts)
                if (this.player.biggestTitSize() > 1) {
                    this.outx(
                        `Hands slide over your ${this.player.allBreastsDescript()}, dragging your attention back to the front of the mob. Two imps grope your ${this.biggestBreastSizeDescript()}, mauling your flesh as they drag your tits around your chest. They lick your tit-flesh, slowly working their way up towards your ${this.nippleDescript(
                            0
                        )}. The imp rider drops your hair and reaches around you, shoving his cock against your back as he squeezes your ${this.biggestBreastSizeDescript()}. Finally the imps reach your nipples, their tongues wrapping around and pulling at the tingling flesh.  `
                    );
                    // (Low Corruption)
                    if (this.player.cor < 50)
                        this.outx(
                            `You can't escape the tongues lapping and pulling at your ${this.nippleDescript(
                                0
                            )}, matching the one in your cunt. You shake your head to deny the pleasure, but your breathing comes faster and faster as lust invades your body.`
                        );
                    // (High Corruption)
                    else
                        this.outx(
                            `The tongues squeezing and tugging your nipples match the tongue working your ${this.vaginaDescript(
                                0
                            )}, flooding your body with lust. You moan and arch your back, offering your tits to the imps. You can hear your pulse pounding in your ears as you pant with desire.`
                        );
                    this.outx(
                        `  Suddenly you feel tiny needle-sharp teeth pierce your ${this.nippleDescript(
                            0
                        )}. You scream as venom pumps into your tits, red-hot poison that makes your ${this.player.allBreastsDescript()} feel as though they were being stung by bees. You moan in pain as your breasts start to swell, the imps continuing to pump demon-taint into them.\n\n`,
                        false
                    );
                    // Grow tits!
                    this.player.growTits(2, this.player.breastRows.length, false, 1);
                    this.player.boostLactation(0.3);
                }
                this.outx(
                    `Dimly through your haze of lust and pain you see a large imp step forward from the mob. Four feet tall and broader and stronger looking than any imp you've seen before, with a face as much bull as imp, this new imp has mottled grey skin, broad purple demon wings, two curving bull-horns on his head, and a ${Appearance.cockNoun(
                        CockTypesEnum.HORSE
                    )} big enough to choke a minotaur. The mushroom-like head of it bobs just below his mouth, and his snake-tongue darts out to flick a bit of pre-cum off the head and onto your face. You shudder as the hot fluid stings the sensitive skin of your lips. His ${this.monster.ballsDescriptLight()} are each the size of your fist and slick with sweat. He slaps his sweaty cock-head against your cheek, nearly scalding you with the heat.  `
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx("You yelp and twist your head to escape the heat.  ");
                // (End low corruption)
                this.outx(
                    `He slowly rubs his shaft over your cheeks and along your lips, each ridge of his demonically-hot ${Appearance.cockNoun(
                        CockTypesEnum.HORSE
                    )} tugging at your lips. The hot pre-cum dribbles over your sensitive flesh and the musk makes your sinuses tingle. The big imp sneers as you whimper, and whips his bull-shaft back to slap your face. The other imps watch and stroke themselves as their master cock-whips you.\n\n`,
                    false
                );

                // (If the character has breasts)
                if (this.player.biggestTitSize() > 2)
                    this.outx(
                        `The big imp grabs one of your painfully distended breasts in each hand, mauling and bouncing the flesh as if weighing them. You gasp in pain as your ${this.player.allBreastsDescript()} swell further at his touch. `
                    );
                this.outx(
                    "Hot pre-cum dribbles through your lips and onto your tongue. The steaming salty goo is almost too hot to stand, and you stick your tongue out to cool it. The imps jerk their cocks harder as you pant, tongue hanging out of your mouth. The master imp steps back and looks you up and down, admiring his handiwork. His snake-tongue darts out to an incredible length and wraps itself around your tongue. He licks his pre-cum from you, then forces his tongue into your mouth. The master imp's tongue curves back into your mouth, pressing the glob of pre-cum into your throat. ",
                    false
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "It's either swallow or have that demon-tongue forced all the way down your throat. Against your will you gulp back the glob.",
                        false
                    );
                // (High Corruption)
                else
                    this.outx(
                        "You swallow the glob of pre-cum eagerly, trying to suck the demon's tongue into your throat.",
                        false
                    );
                this.outx("\n\n", false);

                this.outx(
                    "The big imp walks around you, casting his gaze over your pinned body.  ",
                    false
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() > 2)
                    this.outx(
                        `The other imps reclaim your aching breasts, sucking your ${this.nippleDescript(
                            0
                        )} and mauling your ${this.player.allBreastsDescript()} so hard their fingers disappear into your swelling flesh. `
                    );
                this.outx(
                    `The imp rubs his hands over your sides and flanks, his ${Appearance.cockNoun(
                        CockTypesEnum.HORSE
                    )} bobbing as he walks. The other imps watch their master as he moves around you. Only the imp sucking your ${this.vaginaDescript(
                        0
                    )} doesn't notice, his tongue thrusting deeply into your folds. The big imp grabs him by the neck and easily tosses him aside, his tongue dragging through your cunt as he's pulled away from you. The master imp takes position behind you and grabs his ${Appearance.cockNoun(
                        CockTypesEnum.HORSE
                    )}, bringing the mushroom-head of it down to your pussy. You shake, knowing what's coming next. The other imps watch and stroke themselves as their master readies his hips to push into you.\n\n`,
                    false
                );
                // (Low corruption)
                if (this.player.cor < 50) this.outx("You scream for help");
                // (High corruption)
                else this.outx("You moan with lust");
                this.outx(
                    " as the inhumanly hot cock-head stretches your pussy lips, your cries vanishing into the dark skies above. Your rider grabs your hair to pull your head back, and you cry out as his master pushes his corrupted cock into you.  ",
                    false
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() > 1)
                    this.outx(
                        "The imps working your breasts suck harder, kneading your tit-flesh as though trying to milk you. ",
                        false
                    );
                this.outx(
                    `You squirm and twist against the imps holding you down as the hot ${Appearance.cockNoun(
                        CockTypesEnum.HORSE
                    )} almost burns your sensitive cunt. You can smell the sweat steaming off his shaft, and your pussy-fluids start to steam as well as he forces his cock-head into your ${this.vaginaDescript(
                        0
                    )}. His huge cock-head bulges your groin, and you moan`
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        ` in helpless terror as you feel the bulge work up from the base of your groin towards your stomach. You let out a shuddering moan of pain as inch after inch of monstrous ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} stretches your belly`
                    );
                // (High corruption)
                else
                    this.outx(
                        `, panting in lust as the monstrous ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} pushes your flesh aside to make room for itself`
                    );
                this.outx(". ");
                // (This is a good place for the virginity-loss message, if needed)
                this.player.cuntChange(this.monster.cockArea(1), true);
                this.outx(
                    "You can feel every ridge and pulsing vein of his cock pulling on the lining of your stretched cunt. You tremble helplessly around the huge shaft, fully impaled on the imp's mutated bull-cock.\n\n",
                    false
                );

                this.outx(
                    "Every pulse of his heart makes his cock twitch, making you shake in time to the shaft pulsing in your cunt. The imps jeer at you, masturbating over your shaking body. The big imp flexes his thighs, and his cock-head throbs deep in your belly. The other imps laugh as you ",
                    false
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "whimper, spasming as the hot shaft presses against new areas",
                        false
                    );
                // (High corruption)
                else
                    this.outx(
                        "moan in pleasure, rotating your hips around this incredible cock",
                        false
                    );
                this.outx(
                    ` in your stuffed ${this.vaginaDescript(
                        0
                    )}. The big imp sneers and flexes his cock again, watching `
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() >= 2)
                    this.outx(
                        `your ${this.player.allBreastsDescript()} roll on your chest as you squirm`
                    );
                // (If the character doesn't have breasts)
                else this.outx("your eyes roll back as you squirm");
                this.outx(".\n\n", false);

                this.outx(
                    `Finally the big imp pulls back his ${Appearance.cockNoun(
                        CockTypesEnum.HORSE
                    )}, each ridge pulling on your pussy flesh as he slides out. You yelp and buck as the mushroom-head catches on your folds. `
                );
                // (If the character has a cock)
                if (this.player.cockTotal() > 0)
                    this.outx(
                        `Your ${this.multiCockDescriptLight()} bounces as the bulge passes over it.  `
                    );
                this.outx(
                    `You moan as the mushroom-head reaches the entrance of your ${this.vaginaDescript(
                        0
                    )}, your stretched pussy-flesh slowly returning to normal. The master imp pushes forward again, reclaiming your pussy for his monstrous cock. `
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `You try to buck your ${this.hipDescript()}, fighting to break free as the bulge of his cock-head works its way high up into your belly. You're held down by too many imps. You can only writhe around the hot shaft stretching out your ${this.vaginaDescript(
                            0
                        )}. The big imp grunts as his cock-head pops past your cervix, and you moan and shake in pain.  `
                    );
                // (High corruption)
                else
                    this.outx(
                        `You moan in ecstasy as the hot ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} pushes deep into your ${this.vaginaDescript(
                            0
                        )}, turning every inch of your pussy into a pleasure-sheath for the big imp. You know you're nothing but a fuck-toy for this corrupt creature, just a wet pussy for him to fill with cum, and the thought almost makes you orgasm as he forces his huge cock-head past your cervix.  `
                    );
                this.outx(
                    "Finally the corrupt cock bottoms out against your womb. The imp pulls back again, and starts to fuck you slowly.\n\n",
                    false
                );

                // (If the character has breasts)
                if (this.player.biggestTitSize() >= 2)
                    this.outx(
                        `The slow fucking shakes your breasts, and the imps sucking at your nipples cling tightly to your monstrously swollen ${this.player.allBreastsDescript()}. Your ${this.biggestBreastSizeDescript()} have grown three cup sizes since the imps pumped their venom into you. An ache starts deep in the base of your tits and works its way to your sore ${this.nippleDescript(
                            0
                        )}. Your already bloated nipples swell as the imps suckle and you gasp as the first rush of milk spills into their mouths. Your rider reaches around and starts to milk your udders, moving his hands between your ${this.player.allBreastsDescript()} and forcing out more milk for his gangmates.\n\n`,
                        false
                    );

                this.outx(
                    `The big imp grinds his hips as he thrusts and pulls, rubbing his cock-ridges against every part of your ${this.vaginaDescript(
                        0
                    )}. While sliding his mutated ${Appearance.cockNoun(
                        CockTypesEnum.HORSE
                    )} in and out of you, the imp rubs his hands along your mound, pulling it open or forcing it tight as he takes you. Your pussy juices steam off his cock as he pumps, and hot pre-cum dribbles down your crack and `
                );
                // (If the character has a cock)
                if (this.player.cockTotal() > 0)
                    this.outx(`over your ${this.multiCockDescriptLight()} where it `);
                this.outx("drips onto the ground. ");
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `The pain as this huge cock stretches you is overwhelming, but every thrust rubs more corrupt pre-cum into your pussy walls. You start to pant as the imp rapes you, using your body for his own pleasure. You tremble as the heat of his pre-cum soaks through your body. The huge shaft forces your ${this.clitDescript()} out, and the steaming fluids splashing on it make it tingle almost painfully. Your whimpers and moans of pain start to take on a different tone, and the master imp starts to fuck you faster.`
                    );
                // (High corruption)
                else
                    this.outx(
                        `Pain and pleasure blend into one as the huge ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} stretches you, rubbing pre-cum into your steaming pussy. You moan as the big imp fucks you, turning you into a mindless fuck-puppet. Your ${this.clitDescript()} swells painfully as hot juices splash over it. Your shaking body only adds to the master imp's pleasure.`
                    );
                this.outx("\n\n", false);

                this.outx(
                    "The other imps continue to jerk-off over you as the big imp impales you again and again on his shaft. Their pre-cum starts to splatter down on your body, and they pant as they watch your orgasm build. ",
                    false
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() > 1)
                    this.outx(
                        `Imps gulp milk from your bloated ${this.biggestBreastSizeDescript()}. As one imp drinks his fill and staggers away with a sloshing belly, another steps up to pump your milk-spewing udders.  `
                    );
                // (If the character has a dick)
                if (this.player.cockTotal() > 0)
                    this.outx(
                        `Your ${this.multiCockDescriptLight()} swell painfully as the rough fucking pumps blood into your groin.  `
                    );
                this.outx(
                    `The big imp's snake tongue flicks out and slides around your ${this.vaginaDescript(
                        0
                    )}, pulling at your pussy lips. He moves his tongue back and forth along the sides of your steaming cunt, alternating between stretching and flicking the lips. `
                );
                // (If the character has a dick)
                if (this.player.totalCocks() > 0)
                    this.outx(
                        `He draws his tongue back and wraps it around your ${this.cockDescript(
                            0
                        )}, sliding its length along your shaft and flicking his tongue over your cock-head.  `
                    );
                this.outx(
                    "You gasp in time to the big imp's thrusts, whimpering when his cock or tongue hit a sensitive point. ",
                    false
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "You're being raped by a demon, milked like a cow, and you're about to cum hard. This corrupted land has left its mark on you.",
                        false
                    );
                // (High corruption)
                else
                    this.outx(
                        "This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.",
                        false
                    );
                this.outx(" You moan as you rise towards your orgasm.\n\n", false);

                // (If the character has breasts)
                if (this.player.biggestTitSize() > 3)
                    this.outx(
                        `Your udders shake back and forth under your chest in time to the rough fucking. You arch your back to press your ${this.nippleDescript(
                            0
                        )} into eager mouths, moaning as your rider milks your distended ${this.player.allBreastsDescript()}. `
                    );
                // (Low Corruption).
                if (this.player.cor < 50)
                    this.outx(
                        "Some part of you can still feel shame, and you whine and clench your teeth as the urge to <i>moo</i> rises in you.",
                        false
                    );
                // (High corruption)
                else
                    this.outx(
                        "You moan shamelessly as you're fucked and milked, and the moans turn to long <i>mooos</i> of ecstasy.",
                        false
                    );
                this.outx("\n\n", false);

                this.outx(
                    `The master imp pounds into you as hard as he can, driving his ${this.monster.cockDescriptShort(
                        1
                    )} deeper into your cunt. His grunts come closer and closer together. Your rider grinds his cock into your back, rubbing his cock-head in your hair. He nips at your neck and shoulder as he pants. The master imp pounds into you and you can feel his ${this.monster.ballsDescriptLight()} swell as they slap against you. Through the haze of your approaching orgasm you realize what's about to happen. Those oversized balls are about to pump more cum into you than any normal man could ever produce. They're going to pump demonic cum right into your womb. `
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `You scream as the base of his ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} bloats with corrupted jism, the thick bulge stretching your pussy even more as it pumps along the imp's shaft. The bulge swells your belly and you can feel it move through your stretched cunt towards your womb. Another thick bulge forms at the base of the master imp's cock and you thrash wildly, yelling in protest. "<i>NOO - O - O - OOOOHhh!</i>" The hot cum floods into your womb and you reach your own orgasm, shaking as your ${this.vaginaDescript(
                            0
                        )} clamps down on his cock and milks it of waves of cum. Another orgasm hits on the heels of the first one, and you buck as more demon-cum floods your womb. Gasping for air, you continue to come as your belly swells. Even as he pumps more corrupt cum into you the big imp keeps raping you, forcing you to another peak before you've come down from the last one.`
                    );
                // (High corruption)
                else
                    this.outx(
                        `The thought of all that demon-jism in your womb pushes you over the edge. You cum hard, bucking your hips against the ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} pumping hot cum into your belly. Your eyes roll back in your head and you scream out in ecstasy as thick jets of cum fill your pussy. The imp keeps thrusting into his fuck-toy even as he fills your womb with his cum, forcing you to another peak before you've come down from the last one. The big imp is your master now.`
                    );
                this.outx(
                    "  You nearly black out as the orgasm blasts through you,  shrieking yourself hoarse as the orgasm wracks your body, eyes rolling back in your head as your womb swells.\n\n",
                    false
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() > 2)
                    this.outx(
                        `As orgasms wrack your body your breasts pump out even more milk, too much for the imps below to handle. Milk pours down your chest in great streams, soaking the imps and splashing onto the ground below you. The milk gushing through your tender ${this.nippleDescript(
                            0
                        )} pushes you to another orgasm. You shake your tits as you cum, mooing in mindless pleasure, spraying jets of milk everywhere. Your rider cums, soaking your ${this.hairDescript()} with jets of imp-jism that run down your scalp and over your cheeks. `
                    );
                // (High corruption)
                if (this.player.cor >= 50)
                    this.outx(
                        "You lap eagerly at the salty cum, licking up and drinking as much as you can.",
                        false
                    );
                this.outx("\n\n", false);
                this.outx(
                    `Imp-jism rains down on your helpless spasming body. The imps spew cum into your hair, across your back and ${this.hipDescript()}, over your face`
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() > 2)
                    this.outx(`, and bouncing ${this.player.allBreastsDescript()}`);
                this.outx(
                    `. The ${this.monster.short} is no longer holding you down. They masturbate over you as you claw at the ground with your hands, hooves scraping the earth as you clamp your thighs tight around the big imp. Another pulse of demonic cum hits your womb. You push back against your master, forcing as much of his cock into you as possible. Arching your back, your eyes roll back in your head and you moo as your womb stretches painfully, a final orgasm crashing through your cum-bloated body. You spasm around the cock that impales you, thrashing as `
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() > 2)
                    this.outx(`milk spurts from your ${this.nippleDescript(0)} and `);
                this.outx(
                    "steaming fluids spew from your over-filled pussy. Unconsciousness follows closely on the heels of this last orgasm, your mind shutting down even as your body still shudders.\n\n",
                    false
                );
                this.outx(
                    `You wake up later, body still twitching as tiny orgasms spark in your ${this.vaginaDescript(
                        0
                    )}. It's still dark out. You lie on your side in a pool of cooling cum, milk, and pussy juice. Your body is covered in long ropes of drying imp-cum, and your hair is plastered to the ground. There's no sign of the horde of imps or their big master. Your skin is stretched and shiny over your still milk-bloated tits. Your belly is as tight and distended as a mare on the verge of giving birth. It quivers as the flesh of your ${this.vaginaDescript(
                        0
                    )} spasms. Over the swollen curve of your belly you can see steam rising from between your legs. You start to slip back into unconsciousness. `
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "Your last coherent thought is to find a way to better hide your camp, so this never happens again.",
                        false
                    );
                // (High corruption)
                else
                    this.outx(
                        "Your last coherent thought is to find a way to make your own mutated master imp, maybe even a stable full of them...",
                        false
                    );
                this.player.orgasm();
                this.dynStats("lib", 2, "cor", 3);
                this.player.knockUp(
                    PregnancyStore.PREGNANCY_IMP,
                    PregnancyStore.INCUBATION_IMP - 14
                ); // Bigger imp means faster pregnancy
            }
            // Scene number 2 - male possible.
            else {
                // Scene 2 (Centaur, vaginal)
                if (this.player.findStatusAffect(StatusAffects.ImpGangBang) >= 0) {
                    // (Subsequent encounters - Low Corruption)
                    if (this.player.cor < 50)
                        this.outx(
                            `You can't tell if this is the same ${this.monster.short} as last time or not. You're not racist, but all imps look alike to you. ${this.monster.capitalA} surges forward, grabbing at your legs and arms and running their hands over your body. You struggle, but there are just too many to fight. The result is the same as last time...\n\n`,
                            false
                        );
                    // (Subsequent encounters - High Corruption)
                    else
                        this.outx(
                            "It's about time they showed up. It's not like there's a lot to do in these rocks, and you were getting bored. You grab an imp dick in either hand and spread your legs as other imps grope your thighs...\n\n",
                            false
                        );
                }
                this.outx("The imp mob tackles you, grabbing at your arms as you ");
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `swing your ${this.player.weaponName} wildly, determined not to let them take you`
                    );
                // (High Corruption)
                else
                    this.outx(
                        "twist and struggle in their grips, determined to make them work for their fun",
                        false
                    );
                this.outx(
                    `! You kick back and feel your hooves smash into an imp's chest, sending him flying. But the ${this.monster.short} has your legs and more imps grab your arms. The pack drags you thrashing and bucking over to an old log lying on the ground.\n\n`,
                    false
                );

                this.outx(
                    `Your human torso is dragged down to the log by ${this.monster.a} while two more leap onto your back. The ${this.monster.short} makes short work of your ${this.player.armorName}, unbuckling straps and stripping you quickly. `
                );
                // (If the player has breasts)
                if (this.player.biggestTitSize() > 0)
                    this.outx(
                        `Your unbound ${this.biggestBreastSizeDescript()} bounce out over the weathered log. `
                    );
                this.outx(
                    `The imps spread your arms wide, forcing your chest out, and tie them to the log with sweaty loincloths. Your ${this.hipDescript()} are stuck high in the air. Imps rub their sweaty cocks and ${this.monster.ballsDescriptLight()} over your legs and grope your crotch. The two imps riding your back start stroking and licking each other. `
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "Your face flushes with humiliation as they turn their attentions on each other, each working their hands and tongue over the other's dick. How dare these demons use you as a bed to sate their lusts?!",
                        false
                    );
                // (High Corruption)
                else
                    this.outx(
                        "Your face flushes with anger as they turn their attentions on each other, each working their hands and tongue over the other's dick. You worked hard for this magnificent body, and now they're not using it?!",
                        false
                    );
                this.outx("\n\n", false);

                this.outx(
                    `An imp quickly climbs up your body, planting his feet on your shoulders and grabbing your ${this.hairDescript()} with one hand for support. He rubs his ${this.monster.ballsDescriptLight()} over your mouth, smearing your lips with musky sweat, while he pries at your jaw with his other hand. `
                );
                // (If the player has breasts)
                if (this.player.biggestTitSize() > 2)
                    this.outx(
                        `An imp mounts the log and slaps his ${this.monster.cockDescriptShort(
                            0
                        )} between your ${this.player.allBreastsDescript()}, squeezing them tight over his cock as he rubs back and forth. He mauls your breasts cruelly, squeezing his fingers deep into your soft flesh.  `
                    );
                // (If the player has a SINGLE cock)
                if (this.player.cockTotal() == 1)
                    this.outx(
                        `An imp ducks under your body and grabs your ${this.cockDescript(
                            0
                        )}. His nimble tongue flicks over your cock-head while he pricks the shaft with his tiny claws.  `
                    );
                // (If the player has a MULTI cock)
                if (this.player.cockTotal() > 1)
                    this.outx(
                        `Two imps duck under your body and seize your ${this.multiCockDescriptLight()}, licking the tips with their inhumanly flexible tongues while they stroke the shafts.  `
                    );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "You fight to free your hind legs and buck the imps off your back, while sweaty hands slide over your crotch. You whine through clenched teeth as sharp claws jab at your sensitive flesh.\n\n",
                        false
                    );
                // (High Corruption)
                else
                    this.outx(
                        "You writhe in the grasp of the imps, reveling in the sensations as tiny claws and teeth nip at your sensitive crotch. You lick salty musk off the swollen balls dangling above your mouth.\n\n",
                        false
                    );
                this.outx("\n\n", false);

                // (If the player has breasts)
                if (this.player.biggestTitSize() > 2)
                    this.outx(
                        `The imp fucking your ${this.biggestBreastSizeDescript()} handles your soft flesh roughly, pressing and pulling your tits into a fuck-canal for his demon cock. Other imps slap your ${this.player.allBreastsDescript()} and laugh as you cry out.  `
                    );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `You whimper as your mistreated flesh stings with dozens of pin-prick scratches and bites, and the ${
                            this.monster.short
                        } slaps your chest and flanks. The abuse falls on you from all sides, leaving you with no escape. The imp on your shoulders pries your jaws open, and you gag on his ${this.monster.ballsDescriptLight()}.`
                    );
                // (High Corruption)
                else
                    this.outx(
                        "You suckle eagerly at the musky balls in your mouth. Abuse falls on you from all sides, imps leaving tiny marks on your skin as they nip and scratch at you. You whimper in delight as tiny hands slap your chest and flanks.",
                        false
                    );
                this.outx("\n\n", false);

                this.outx(
                    `With a loud sucking sound, the imp pulls his balls out of your mouth. Spit and ball-sweat drip over your cheeks as he repositions himself, bending almost completely over on your shoulders to rub his cock-head against your lips. You nearly choke as pre-cum dribbles into your mouth and runs down the back of your throat. The ${this.monster.cockDescriptShort(
                        0
                    )} blocks most of your vision, but in the corners of your eyes you see the master of this imp horde step forward. Four feet tall and broader and stronger than any imp in the pack, with a face as much dog as imp, this new imp has black fur, broad red demon wings, two long demon-horns on his head, and a ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} big enough to choke a minotaur. He leers at your helpless body and grabs `
                );
                // (If the player has breasts)
                if (this.player.biggestTitSize() > 2)
                    this.outx(
                        `one of your sore ${this.biggestBreastSizeDescript()} in his calloused hand, brutally pressing his fingers into your flesh`
                    );
                // (If the player doesn't have breasts)
                else this.outx("your tail and yanks, brutally pulling on it");
                this.outx(
                    ` until you shriek. The imp riding your shoulders plunges his ${this.monster.cockDescriptShort(
                        0
                    )} into your mouth, pounding at the top of your throat.\n\n`,
                    false
                );

                this.outx(
                    `The master imp walks back to your hips, lightly dragging his sharp claws over your flanks. He kicks another imp out of the way and takes position behind your ${this.hipDescript()}. He pulls his monstrously long ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} down and rubs the tip over your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(".  ");
                // (If the player has a cock)
                if (this.player.cockTotal() > 0)
                    this.outx(
                        `Pre-cum drips from the broad tip of it, dripping down to the base of your ${this.multiCockDescriptLight()}.  `
                    );
                this.outx(
                    `The big imp's hot pre-cum stings your flesh. The imps licking your crotch lap up the hot fluid, cooling you with their saliva. The big imp sneers as you whimper, and presses the head of his ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} against your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(". ");
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `You try to pull away from the hot cock-head rubbing against your hole, but the ${this.monster.short} holds you tight.`
                    );
                // (High Corruption)
                else
                    this.outx(
                        `The scent of musk steaming off the${Appearance.cockNoun(
                            CockTypesEnum.DOG
                        )} drives you wild, and you push back to try and capture the cock-tip.`
                    );
                this.outx("\n\n", false);

                this.outx(
                    `The pointed tip of the master imp's ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} plunges into your hole, splitting your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    " wide open. You moan around the cock fucking your throat as the corrupted wolf-cock pushes deeper into your hole. The painfully hot shaft claims inch after inch of your flesh, forcing its way deeper into you than any normal human could bear. Bound to the log you can only shake in agony as the big imp's thick dog-knot hits your ",
                    false
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(".");
                // (If the player has breasts)
                if (this.player.biggestTitSize() > 2)
                    this.outx(
                        `  The imp fucking your aching ${this.biggestBreastSizeDescript()} paints your tits with a massive load of cum. He falls off the log and another imp jumps up to take his place.`
                    );
                this.outx("\n\n", false);

                this.outx(
                    `The big imp fucks you roughly, clenching your ${this.hipDescript()} in his clawed hands as he hammers his ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} into you. The head of his mutated shaft pounds `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx("the entrance of your womb");
                // (If the player doesn't have a vagina)
                else this.outx("depths of your bowels");
                this.outx(" as the knot slams against your ");
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    ". Each hard thrust pounds you against the log, and you grunt in time to the shaft pistoning in your hole.\n\n",
                    false
                );

                this.outx(
                    "The master imp fucks you for what seems like hours, beating his dog-knot against your sore ",
                    false
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    " and slapping your ass every few thrusts to remind you who is in charge. Imp after imp stretches your throat with their cocks and your belly with demon-seed as the pack rapes your face. ",
                    false
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() > 2)
                    this.outx(
                        `The rough fucking shakes your cum-stained breasts, and the imp fucking your ${this.player.allBreastsDescript()} clings tightly to your red and swollen tit flesh. Your ${this.biggestBreastSizeDescript()} burn with agony as the ${
                            this.monster.short
                        } slaps your tits like drums.  `
                    );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "You're being raped again by demons, impaled on cocks like a roast pig on a spit, and you can feel your lust rising. This corrupted land has left its mark on you.",
                        false
                    );
                // (High corruption)
                else
                    this.outx(
                        "This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.",
                        false
                    );
                this.outx("\n\n", false);

                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "You gurgle helplessly as the cock raping your throat pours thick wads of",
                        false
                    );
                // (High Corruption)
                else
                    this.outx(
                        "You eagerly chug thick wads of cum from the cock stretching your throat, working your throat to force more",
                        false
                    );
                this.outx(
                    ` cum into your swelling belly. The imp slams his cock as deep into your throat as it will go, slapping his ${this.monster.ballsDescriptLight()} against your face. He cums for an impossibly long time, streams of jism pouring into you. You can feel your stomach stretching, but you're more worried about breathing. The edge of your vision starts to go red and your chest heaves as you fight for air. Finally the imp draws his cock out of your throat, spraying his last gobs of cum over your face as you gasp in huge lungfuls of air. The sudden rush of oxygen pushes you over the edge and you cum hard. Your hands clench at the air and your eyes roll back in your head as you twist around the demonic ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} pounding into you. You shriek as your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    " spasms on the steaming pole that impales it. Another imp shoves his cock in your mouth as you scream, throat convulsing around his cock-head.",
                    false
                );
                // (If the player has a cock)
                if (this.player.cockTotal() > 0)
                    this.outx(
                        `  Your ${this.multiCockDescriptLight()} shoots cum across the ground and into the waiting mouths of the imps licking your crotch.`
                    );
                this.outx("\n\n", false);

                this.outx(
                    `Another imp-cock spasms in your throat as its owner rams deep into you. He floods your already swollen stomach with inhuman amounts of cum. Again you feel yourself about to black out as the demon pumps jism into you. He pulls out and again you orgasm as you wheeze for air. Another imp forces his cock down your throat as you moan and gasp. Your body shakes in pleasure on the big imp's ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )}.  Tightening his grip on your ${this.hipDescript()} the master imp howls and slams his shaft into your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    ". His unnaturally huge knot stretches the entrance of your hole, and he hammers into you again. ",
                    false
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `You howl around the imp-cock stretching your throat. The bloated knot opens your hole far beyond anything you've endured before. Your violent thrashing throws the imps off your back and you buck uselessly, thrashing as the swollen ${Appearance.cockNoun(
                            CockTypesEnum.DOG
                        )} plunges deeper into you.`
                    );
                // (High corruption)
                else
                    this.outx(
                        `The master imp's bloated knot stretches your entrance and plunges into your hole with a loud <i>pop</i>. Another orgasm hits you as the ${Appearance.cockNoun(
                            CockTypesEnum.DOG
                        )} rams even deeper into you. You howl around the imp-cock stretching your throat, bucking as your orgasm shakes you. Your violent thrashing throws the imps off your back and slams your hips against the big imp, pushing him further into your hole.`
                    );
                this.outx(
                    `  The big imp howls again as he cums, each wave of steaming demon-cum stretching his knot and shaft even more. His cum-pumping ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} is bottomed out deep in your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx("womb");
                // (If the player doesn't have a vagina)
                else this.outx("guts");
                this.outx(
                    " and he pumps more jism into you than his balls could possibly hold. Your belly stretches with every blast of cum and you shriek around yet another cock in your throat.\n\n",
                    false
                );

                // (If the character has breasts)
                if (this.player.biggestTitSize() > 2)
                    this.outx(
                        `The imp riding your ${this.biggestBreastSizeDescript()} cums, his load lost in the flood of jism dripping off your abused fuck-udders. `
                    );
                this.outx(
                    `Your master isn't done with you yet, churning his ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} knot in your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    " as he continues to cum. You're pumped full of demon-cum from both ends as one imp shoots his load in your throat and another steps up to take his place. You shake and tremble in your own endless orgasm as the pleasure in your stretched hole blends with the pain of your swollen belly. Your fingers claw at the log as the master imp shifts his massive knot within your monstrously stretched ",
                    false
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    ". Your legs give out as you feel more pulses of demon-cum work their way up his shaft and into your already-huge belly.\n\n",
                    false
                );

                this.outx(
                    "You pass out as another tidal wave of corrupted jism spews into your hole, another load of imp-cum pours down your throat, to meet somewhere in the middle...\n\n",
                    false
                );

                this.outx(
                    `You wake up later, still trembling with small orgasms. Cum burbles in your mouth as you breathe, and your ${this.hairDescript()} is soaked with jism. You haven't moved since you passed out. Your arms are still tied to the log, `
                );
                // (If the player has breasts)
                if (this.player.biggestTitSize() > 0)
                    this.outx(
                        "your bruised and throbbing tits pressed against the rough wood, ",
                        false
                    );
                this.outx(
                    `and your body rests in a cooling pool of cum. You couldn't move even if your ${this.player.legs()} felt stronger. Your hideously bloated belly weighs you down, quivering with every orgasmic twitch that passes through you. The skin of your distended belly is drum-tight and shiny. As you slip back into unconsciousness, one last thought flits across your mind. `
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "How long can you last in this corrupted land, when your body can be so horribly twisted by the sick pleasures of its denizens?",
                        false
                    );
                // (High corruption)
                else
                    this.outx(
                        "Why bother with your silly quest, when you've only scratched the surface of the pleasures this land offers you?\n",
                        false
                    );
                this.player.orgasm();
                this.dynStats("lib", 2, "cor", 3);
                this.player.knockUp(
                    PregnancyStore.PREGNANCY_IMP,
                    PregnancyStore.INCUBATION_IMP - 14
                ); // Bigger imp means faster pregnancy
                // Stretch!
                if (this.player.hasVagina()) {
                    if (this.player.cuntChange(this.monster.cockArea(2), true))
                        this.outx("\n", false);
                } else {
                    if (this.player.buttChange(this.monster.cockArea(2), true))
                        this.outx("\n", false);
                }
            }
        }
        // NOT CENTAUR
        else {
            if (
                ImpScene.rand(2) == 0 &&
                (this.player.cockTotal() == 0 || this.player.gender == 3)
            ) {
                // (First encounter)
                if (this.player.findStatusAffect(StatusAffects.ImpGangBang) < 0) {
                    this.outx(
                        `The imps stand anywhere from two to four feet tall, with scrawny builds and tiny demonic wings. Their red and orange skin is dirty, and their dark hair looks greasy. Some are naked, but most are dressed in ragged loincloths that do little to hide their groins. They all have a ${this.monster.cockDescriptShort(
                            0
                        )} as long and thick as a man's arm, far oversized for their bodies. Watching an imp trip over its ${this.monster.cockDescriptShort(
                            0
                        )} would be funny, if you weren't surrounded by a horde of leering imps closing in from all sides...\n\n`,
                        false
                    );
                    this.player.createStatusAffect(StatusAffects.ImpGangBang, 0, 0, 0, 0);
                }
                this.outx(
                    `The imps leap forward just as you start to ready your ${this.player.weaponName}, one sweaty imp clinging to your arm`
                );
                if (this.player.weaponName != "fists")
                    this.outx(" while another kicks your weapon out of reach");
                this.outx(
                    `. The ${
                        this.monster.short
                    } surges forward and grapples you. Imps grope your body and hump their ${this.monster.cockDescriptShort(
                        0
                    )} against your legs, smearing their sweat and pre-cum into your ${
                        this.player.skinDesc
                    }. The rest of the ${
                        this.monster.short
                    }, a dozen or more imps, all leer at you and laugh as they slap and pinch your body. The imps have sharp claws, tiny sharp teeth, and short horns on their heads. They scratch, claw, and bite at you with all of these weapons as they try to pull you down to the ground. One bold imp leaps forward and grabs your `
                );
                // (If the player has a cock)
                if (this.player.cockTotal() > 0) this.outx(this.cockDescript(0), false);
                else this.outx(this.nippleDescript(0), false);
                this.outx(
                    `, twisting and pinching hard enough to make you yelp in pain. The ${this.monster.short} stinks of sweat and pre-cum, and their moist grips and obscene smirks leave you with no doubts about what they will do to you if you lose this fight.\n\n`,
                    false
                );
                // (Bipedal, vaginal)
                this.outx(
                    `The ${this.monster.capitalA} overwhelms you, dragging you to the ground with sheer numbers. There are at least two imps on each limb, holding you spread-eagled on the cold ground while other imps stroke your body. `
                );
                // (If the player has breasts)
                if (this.player.biggestTitSize() > 0)
                    this.outx(
                        `Imps surround your chest, slapping their ${this.monster.cockDescriptShort(
                            0
                        )}s on your ${this.player.allBreastsDescript()} and rubbing their slippery pre-cum into your ${this.nippleDescript(
                            0
                        )}.  `
                    );
                this.outx(
                    `Others stand over your head, their cocks bobbing inches from your face as they jack off. A thick musk wafts off their cocks, and the smell of it makes your sinuses tingle. Two more imps take position between your legs, sliding their cocks along your thighs while stroking your ${this.vaginaDescript(
                        0
                    )} and flicking your ${this.clitDescript()}.`
                );
                // (If the player has a cock)
                if (this.player.cockTotal() > 0)
                    this.outx(
                        `An imp rubs his hand across his cock-head, smearing it with his pre-cum. He rubs his hand over your ${this.multiCockDescriptLight()}, making your cock-skin tingle as his fluid soaks into you.`
                    );
                this.outx("\n\n", false);
                this.outx(
                    `The ${
                        this.monster.short
                    } snickers lewdly as your nipples harden and your pussy moistens. One of the imps between your legs slides his shaft along your pussy lips, teasing your ${this.clitDescript()} with the tip of his cock.  `
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "You renew your struggles, trying to break free of your captors. They only laugh and bear down harder on you.  ",
                        false
                    );
                // (High corruption)
                else
                    this.outx(
                        `You buck your hips, trying to capture his ${this.monster.cockDescriptShort(
                            0
                        )} with your ${this.vaginaDescript(0)}.  `
                    );
                this.outx(
                    "Before he can thrust into you, the imp is shoved aside by the biggest imp you've ever seen.\n\n",
                    false
                );

                this.outx(
                    `Four feet tall and broader and healthier looking than any imp you've seen before, with a face as much bull as imp, this new imp has mottled grey skin, broad purple demon wings, two curving bull-horns on his head, and a ${Appearance.cockNoun(
                        CockTypesEnum.HORSE
                    )} big enough to choke a minotaur. The mushroom-like head of it bobs just below his mouth, and his snake-tongue darts out to flick a bit of pre-cum off the head and onto your groin. You shudder as the hot fluid stings the sensitive skin of your ${this.vaginaDescript(
                        0
                    )}`
                );
                // (If the player has a dick)
                if (this.player.cockTotal() > 0) this.outx(` and ${this.multiCockDescriptLight()}`);
                this.outx(
                    `. His ${this.monster.ballsDescriptLight()} are each the size of your fist and slick with sweat. He slaps his sweaty balls against your ${this.vaginaDescript(
                        0
                    )} nearly scalding you with the heat.  `
                );
                // (Low corruption)
                if (this.player.cor < 33)
                    this.outx("You yelp and buck your hips to escape the heat.  ");
                this.outx(
                    `He grabs your hips and slowly drags his shaft down your pussy, each ridge of his demonically-hot ${Appearance.cockNoun(
                        CockTypesEnum.HORSE
                    )} hitting your clit and pulling at your lips. Finally the broad horse-like head of his shaft catches on your ${this.clitDescript()}, and the hot pre-cum dribbles over your sensitive flesh. The big imp sneers as you whimper, and drags his cock-head down to the opening of your ${this.vaginaDescript(
                        0
                    )}. The other imps watch and stroke themselves as their master pulls his hips back to push into you.\n\n`,
                    false
                );
                // (Low corruption)
                if (this.player.cor < 50) this.outx("You scream for help");
                // (High corruption)
                if (this.player.cor >= 50) this.outx("You moan with lust");
                this.outx(
                    ` as the inhumanly hot cock-head stretches your pussy lips, your cries vanishing into the dark skies above. Two imps grab your hair and pull your head up, forcing you to watch as their master pushes his corrupted cock into you. Other imps spread your [legs] even wider, leaving you helpless as the big imp slides his swollen meat into your ${this.vaginaDescript(
                        0
                    )}. You squirm and twist against the imps holding you down as the hot flesh almost burns your sensitive cunt. You can smell the hot sweat steaming off his shaft, and your pussy-fluids start to steam as well as he forces his cock-head into your ${this.vaginaDescript(
                        0
                    )}. His huge cock-head bulges your groin, and you watch `
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `in helpless terror as the bulge inches up from the base of your groin towards your stomach. You let out a shuddering moan of pain as inch after inch of monstrous ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} stretches your belly`
                    );
                // (High corruption)
                else
                    this.outx(
                        `panting in lust as the monstrous ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} pushes your flesh aside to make room for itself`
                    );
                this.outx(". ");
                // (This is a good place for the virginity-loss message, if needed)
                this.player.cuntChange(this.monster.cockArea(1), true);
                this.outx("\n\n", false);
                this.outx(
                    "You can feel every ridge and pulsing vein of his cock pulling on the lining of your stretched cunt. You tremble helplessly around the huge shaft, fully impaled on the imp's mutated bull-cock.\n\n",
                    false
                );
                this.outx(
                    "Every pulse of his heart makes his cock twitch, making you shake in time to the shaft pulsing in your cunt. The imps jeer at you, masturbating over your shaking body. The big imp flexes his thighs, and the bulge of his cock-head bounces high in your belly. The other imps laugh as you ",
                    false
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "whimper, spasming as the hot shaft presses against new areas",
                        false
                    );
                // High corruption)
                else
                    this.outx(
                        "moan in pleasure, rotating your hips around this incredible cock",
                        false
                    );
                this.outx(
                    ` in your stuffed ${this.vaginaDescript(
                        0
                    )}. The big imp sneers and bounces his cock again, watching `
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() >= 3)
                    this.outx(
                        `your ${this.player.allBreastsDescript()} roll on your chest as you squirm`
                    );
                // (If the character doesn't have breasts)
                else this.outx("your eyes roll back as you squirm");
                this.outx(".  ");
                // (If the character has a cock)
                if (this.player.cockTotal() > 0)
                    this.outx(
                        `Your ${this.multiCockDescriptLight()} slaps against your distended belly as you shake.`
                    );
                this.outx("\n\n", false);
                this.outx(
                    `Finally the big imp pulls back his ${Appearance.cockNoun(
                        CockTypesEnum.HORSE
                    )}, each ridge pulling on your pussy flesh as he slides out. An imp reaches out and slaps the bulge as it withdraws, making you yelp and buck.  `
                );
                // (If the character has a cock)
                if (this.player.cockTotal() > 0)
                    this.outx(
                        `Your ${this.multiCockDescriptLight()} bounces as the bulge passes under it.  `
                    );
                this.outx(
                    `You moan as the mushroom-head reaches the entrance of your ${this.vaginaDescript(
                        0
                    )}, your stretched pussy-flesh slowly returning to normal. The master imp pushes forward again, reclaiming your pussy for his monstrous cock. `
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `You try to pull your hips back, fighting to break free as the bulge of his cock-head works its way high up into your belly. You're held down by too many imps. You can only writhe around the hot shaft stretching out your ${this.vaginaDescript(
                            0
                        )}. Your head is held steady by two imps, you can't even look away as their master rapes you. The big imp grunts as his cock-head pops past your cervix, and you moan and shake in pain.`
                    );
                // (High corruption)
                else
                    this.outx(
                        `You moan in ecstasy as the hot ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} pushes deep into your ${this.vaginaDescript(
                            0
                        )}, turning every inch of your pussy into a pleasure-sheath for the big imp. You know you're nothing but a fuck-toy for this corrupt creature, just a wet pussy for him to fill with cum, and the thought almost makes you orgasm as he forces his huge cock-head past your cervix.`
                    );
                this.outx(
                    "Finally the corrupt cock bottoms out against your womb. The imp pulls back again, and starts to fuck you slowly.\n\n",
                    false
                );

                this.outx(
                    `The big imp grinds his hips as he thrusts and pulls, rubbing his cock-ridges against every part of your ${this.vaginaDescript(
                        0
                    )}.  While sliding his mutated ${Appearance.cockNoun(
                        CockTypesEnum.HORSE
                    )} in and out of you the imp rubs his hands along your mound, pulling it open or forcing it tight as he takes you. Your pussy juices steam off his cock as he pumps, and hot pre-cum dribbles down your crack to your ${this.assholeDescript()}. `
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `The pain as this huge cock stretches you is overwhelming, but every thrust rubs more corrupted pre-cum into your pussy walls. You start to pant as the imp rapes you, using your body for his own pleasure. Your nipples swell as the heat of his pre-cum soaks through your body. The huge shaft forces your ${this.clitDescript()} out, and the steaming fluids splashing on it make it tingle almost painfully. Your whimpers and moans of pain start to take on a different tone, and the master imp starts to fuck you faster.`
                    );
                // (High corruption)
                else
                    this.outx(
                        `Pain and pleasure blend into one as the huge ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} stretches you, rubbing pre-cum into steaming pussy. You moan as the big imp fucks you, turning you into a mindless fuck-puppet. Your ${this.clitDescript()} swells painfully as hot juices splash over it. Your ${this.nippleDescript(
                            0
                        )} tingle almost painfully as the heat of his pre-cum spreads through your body.`
                    );
                this.outx("\n\n", false);
                this.outx(
                    "The other imps continue to jerk-off over you as the big imp impales you again and again on his shaft. Their pre-cum starts to splatter down on your body, and they pant as they watch you build towards your orgasm.  ",
                    false
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() >= 3)
                    this.outx(
                        `Your ${this.player.allBreastsDescript()} bounce and jiggle back and forth as the master imp roughly fucks you.  `
                    );
                // (If the character has a dick)
                if (this.player.totalCocks() > 0)
                    this.outx(
                        `Your ${this.multiCockDescriptLight()} swell painfully as the rough fucking pumps blood into your groin.  `
                    );
                this.outx(
                    `The big imp's snake tongue lashes out to incredible length and wraps around one of your ${this.nippleDescript(
                        0
                    )}s, pulling at it and stretching the flesh under it. He moves his tongue back and forth between your nipples, alternating between stretching and flicking them. `
                );
                // (If the character has a dick)
                if (this.player.cockTotal() > 0)
                    this.outx(
                        `He draws his tongue back and wraps it around your ${this.cockDescript(
                            0
                        )}, sliding its length along your shaft and flicking his tongue over your cock-head.`
                    );
                // (If the character doesn't have a dick)
                else
                    this.outx(
                        `His tongue flicks down to your ${this.clitDescript()}, the split ends of it teasing your clit.`
                    );
                this.outx(
                    "  You gasp in time to the big imp's thrusts, whimpering when his cock or tongue hit a sensitive point.  ",
                    false
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "You're being raped by a demon, forced to take an inhuman cock, and you're about to cum hard. This corrupted land has left its mark on you.",
                        false
                    );
                // (High corruption)
                else
                    this.outx(
                        "This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.",
                        false
                    );
                this.outx("  You moan as you rise towards your orgasm.\n\n", false);

                this.outx(
                    `The master imp pounds at you as hard as he can, driving his ${this.monster.cockDescriptShort(
                        1
                    )} deeper into you. His grunts come closer and closer together. Your head still held up, you watch as the imps around you start to cum. They spray your body with thick globs of cum, splattering it across your belly`
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() >= 3)
                    this.outx(` and ${this.player.allBreastsDescript()}`);
                this.outx(
                    `. The master imp pounds into you and you can see his ${this.monster.ballsDescriptLight()} swell. Through the haze of your approaching orgasm you realize what's about to happen. Those oversized balls are about to pump more cum into you than any normal man could ever produce. They're going to pump demonic cum right into your womb.  `
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `You scream as the base of his ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} bloats with corrupted jism, the thick bulge stretching your pussy even more as it pumps along the imp's shaft. The bulge swells your belly and you watch as it moves towards your womb. Another thick bulge forms at the base of the master imp's cock and you thrash wildly, yelling in protest. "<i>NOO - O - O - OOOOHhh!</i>" The hot cum floods into your womb and you hit your own orgasm, shaking as your ${this.vaginaDescript(
                            0
                        )} clamps down on his cock and milks it of waves of cum. Another orgasm hits on the heels of the first one, and you buck as more demon-cum floods your womb. Gasping for air, you continue to come as your belly swells. Even as he pumps more corrupt cum into you the big imp keeps raping you, forcing you to another peak before you've come down from the last one.`
                    );
                // (High corruption)
                else
                    this.outx(
                        `The thought of all that demon-jism in your womb pushes you over the edge. You cum hard, bucking your hips against the ${Appearance.cockNoun(
                            CockTypesEnum.HORSE
                        )} pumping hot cum into your belly. Your eyes roll back in your head and you scream out your ecstasy as thick jets of cum fill your pussy. The imp keeps thrusting into his fuck-toy even as he fills your womb with his cum, forcing you to another peak before you've come down from the last one. The big imp is your master now.`
                    );
                this.outx(
                    "  You nearly black out as the orgasm blasts through you,  arching your back off the ground as the orgasm wracks your body, eyes rolling back in your head as your womb swells.\n\n",
                    false
                );

                this.outx(
                    "Imp-jism rains down on your helpless spasming body. The imps spew cum into your hair, across your swollen belly, over your face",
                    false
                );
                // (If the character has a cock)
                if (this.player.cockTotal() > 0)
                    this.outx(`, and cum-dripping ${this.cockDescript(0)}`);
                // (If the character has breasts)
                if (this.player.biggestTitSize() >= 3)
                    this.outx(`, and bouncing ${this.player.allBreastsDescript()}`);
                this.outx(
                    `. The ${this.monster.short} is no longer holding you down. They masturbate over you as you claw at the ground with your hands, toes curling as you clamp your thighs tight around the big imp. Another pulse of demonic cum hits your womb. You wrap your legs around your master, forcing as much of his cock into you as possible. Arching your back, your eyes roll back in your head and you shriek as your womb stretches painfully, a final orgasm crashing through your cum-bloated body. You spasm around the cock that impales you, thrashing against the ground as `
                );
                // (If the character has breasts)
                if (this.player.biggestTitSize() >= 3 && this.player.biggestLactation() > 1)
                    this.outx(`milk spurts from your ${this.nippleDescript(0)} and `);
                this.outx(
                    "steaming fluids spew from your over-filled pussy. Unconsciousness follows close on the heels of this last orgasm, your mind shutting down even as your body still shudders.\n\n",
                    false
                );
                this.outx(
                    `You wake up later, body still twitching as tiny orgasms spark in your ${this.vaginaDescript(
                        0
                    )}. It's still dark out. You lie in a pool of cooling cum and pussy juice. Your body is covered in long ropes of drying imp-cum, and your hair is plastered to the ground. There's no sign of the horde of imps or their big master. Your belly is as tight and distended as a woman on the verge of giving birth. It quivers as the flesh of your ${this.vaginaDescript(
                        0
                    )} spasms. Over the swollen curve of your belly you can see steam rising from between your legs. You start to slip back into unconsciousness. `
                );
                // (Low corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "Your last coherent thought is to find a way to better hide your camp, so this never happens again.",
                        false
                    );
                // (High corruption)
                else
                    this.outx(
                        "Your last coherent thought is to find a way to make your own mutated master imp, one you can keep as a fuck-toy...",
                        false
                    );
                this.player.orgasm();
                this.dynStats("lib", 2, "cor", 3);
                this.player.knockUp(
                    PregnancyStore.PREGNANCY_IMP,
                    PregnancyStore.INCUBATION_IMP - 14
                ); // Bigger imp means faster pregnancy
            } else {
                // Imp Scene 2 (Bipedal, vaginal)
                // Tag-team
                // Include milking alt text in separate blocks.
                // Work cock and multicock alt text directly into main text blocks.
                if (this.player.findStatusAffect(StatusAffects.ImpGangBang) >= 0) {
                    // (Subsequent encounters - Low Corruption)
                    if (this.player.cor < 50)
                        this.outx(
                            `You can't tell if this is the same ${
                                this.monster.short
                            } as last time or not - all imps look alike to you.  The ${
                                this.monster.capitalA
                            } surges forward, grabbing at your ${this.player.legs()} and arms and running their hands over your body. You struggle, but there are just too many to fight. The result is the same as last time...\n\n`,
                            false
                        );
                    // (Subsequent encounters - High Corruption)
                    else
                        this.outx(
                            "It's about time they showed up. It's not like there's a lot to do in these rocks, and you were getting bored. You grab an imp dick in either hand and spread your legs as other imps grope your thighs...\n\n",
                            false
                        );
                }
                this.outx(
                    `The ${this.monster.capitalA} swarms over you, dragging you to the ground as `
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "you punch and kick wildly, determined not to let them take you",
                        false
                    );
                // (High Corruption)
                else
                    this.outx(
                        "you twist and struggle in their grips, determined to make them work for their fun",
                        false
                    );
                this.outx(
                    "! They pull you down over a fallen log, ass resting above your head. Two imps sit on your arms, their gonads rubbing against your biceps, and rub their hands over your shoulders and chest. Others stretch your "
                );
                if (this.player.isNaga())
                    this.outx("coils out, twisting them around a log to hold you still.\n\n");
                else
                    this.outx(
                        `${this.player.legs()} wide apart, holding them against the log.\n\n`,
                        false
                    );

                this.outx(
                    `The ${this.monster.short} makes short work of your ${this.player.armorName}, unbuckling straps and stripping you quickly. `
                );
                // (If the player has breasts)
                if (this.player.biggestTitSize() > 0)
                    this.outx(
                        `An imp mounts your chest and slaps his ${this.monster.cockDescriptShort(
                            0
                        )} between your ${this.player.allBreastsDescript()}, squeezing them tight over his cock as he rubs back and forth.  `
                    );
                // (If the player has a SINGLE cock)
                if (this.player.cockTotal() == 1)
                    this.outx(
                        `Your ${this.cockDescript(
                            0
                        )} is seized by an imp, who licks the tip with his inhumanly nimble tongue while he strokes the shaft.  `
                    );
                // (If the player has a MULTI cock)
                if (this.player.cockTotal() > 1)
                    this.outx(
                        `Two imps seize your ${this.multiCockDescriptLight()}, licking the tips with their inhumanly nimble tongues while they stroke the shafts.  `
                    );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "You fight to free your arms and shake the imp off your chest while tiny hands slide over your face. They tug at your lips and try to pry your jaws open",
                        false
                    );
                // High Corruption)
                else
                    this.outx(
                        "You writhe in the grasp of the imps, reveling in the sensations of being spread open and completely at the mercy of these demons. Tiny hands slide over your face and you lick and suck at the fingers",
                        false
                    );
                this.outx(".\n\n", false);

                // (If the player has breasts)
                if (this.player.biggestTitSize() > 0) {
                    this.outx(
                        `Hands slide over your ${this.player.allBreastsDescript()}, pinching and pulling at your nipples. The imp riding your ${this.biggestBreastSizeDescript()} licks your tit-flesh, slowly working his tongue up towards your ${this.nippleDescript(
                            0
                        )}. Finally the imp's tongue reaches your nipple, wrapping around and pulling at the tingling flesh. `
                    );
                    // (Low Corruption)
                    if (this.player.cor < 50)
                        this.outx(
                            `You can't escape the tongue lapping and pulling at your ${this.nippleDescript(
                                0
                            )}. You shake your head to deny the pleasure, but your breathing comes faster and faster as lust invades your body.`
                        );
                    // (High Corruption)
                    else
                        this.outx(
                            "The tongue squeezing and tugging your nipple floods your body with lust. You moan and arch your back, offering your tits to the imp riding your chest. You can hear your pulse pounding in your ears as you pant in desire.",
                            false
                        );
                    this.outx(
                        `  Suddenly you feel tiny needle-sharp teeth pierce your nipple. You scream as venom pumps into your tits, red-hot poison that makes your ${this.player.allBreastsDescript()} feel as though they were being stung by bees. You moan in pain as your breasts start to swell, the imp rider biting into your other nipple to pump demon-taint into it.`
                    );
                    if (this.player.hasFuckableNipples())
                        this.outx(
                            `With the imp's taint seeping into your ${this.nippleDescript(
                                0
                            )}, each one's cunt-like shape begins swelling. The fuckable orifices engorge into larger and fatter looking labia, becoming fuller cunts each with an engorged clitoral nub the size of a golf ball. Their color deepens as the skin of your nipple-cunts becomes tighter and smoother.  The imp giggles and continues nibbling the newly swollen sensitive flesh, injecting further doses of venom.`
                        );
                    this.outx("\n\n", false);
                    // Grow tits!
                    this.player.growTits(2, this.player.breastRows.length, false, 1);
                    this.player.boostLactation(0.5);
                }
                this.outx(`The master of this ${this.monster.short} steps up `);
                if (this.player.isNaga()) this.outx("alongside your taut tail");
                else this.outx(`between your ${this.player.legs()}`);
                this.outx(
                    `, leering down at your trapped body. Four feet tall and broader and stronger than any imp in the pack, with a face as much dog as imp, this new imp has grey fur, broad black demon wings, two long demon-horns on his head, and a ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} big enough to choke a minotaur. Pre-cum drips from the broad tip of it, dripping down onto your `
                );
                // (If the player has a cock)
                if (this.player.cockTotal() > 0) this.outx(this.multiCockDescriptLight(), false);
                // (If the player doesn't have a cock)
                else this.outx(this.vaginaDescript(0), false);
                this.outx(".  ");
                this.outx(
                    `The heat stings your flesh. The imps licking your groin lap up the hot fluid, cooling you with their saliva. The big imp sneers as you whimper, and drags the head of his ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} down to your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    `.  He thrusts brutally, shoving the head of his ${this.monster.cockDescriptShort(
                        2
                    )} into your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)" +
                else this.outx(this.assholeDescript(), false);
                this.outx(". ");
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `You screech in agony as the big imp forces his mutated wolf-cock into your hole, brutally shoving thick inch after inch of painfully hot ${Appearance.cockNoun(
                            CockTypesEnum.DOG
                        )} deeper into you than anything should ever go.  `
                    );
                // (High Corruption)
                else
                    this.outx(
                        `The master imp's painfully hot ${Appearance.cockNoun(
                            CockTypesEnum.DOG
                        )} stretches your hole wider than it ever should be, and you moan in perverse ecstasy.  `
                    );
                this.outx("His huge dick-knot bumps against the entrance of your ");
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(".\n\n", false);

                // (If the character has breasts)
                if (this.player.biggestTitSize() > 0)
                    this.outx(
                        `The big imp reaches past your tit-rider and grabs one of your painfully distended breasts in each hand, mauling and bouncing the flesh as if weighing them. You gasp in pain as your ${this.player.allBreastsDescript()} swell further at his touch.  `
                    );
                this.outx(
                    "Your mouth gapes open and an imp takes the chance to stuff it full of cock.  ",
                    false
                );
                this.outx(
                    "The master imp grabs your hips and starts to fuck you hard, pistoning his steaming cock in and out of your ",
                    false
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(". ");
                // (If the character has breasts)
                if (this.player.biggestTitSize() > 1)
                    this.outx(
                        `The rough fucking shakes your breasts, and the imp sucking your nipples clings tightly to your monstrously swollen ${this.player.allBreastsDescript()}. Your ${this.biggestBreastSizeDescript()} have grown three cup sizes since the imp pumped his venom into you.  `
                    );
                this.outx(
                    `The imp fucking your face grabs your ${this.hairDescript()} and jaw, forcing your head back so he can ram his cock into your throat. The obscene bulge sliding in your throat matches the bulge in your belly. The smaller imp pulls back just enough to let you gasp for air, then thrusts into your throat again. The big imp pounds the knot of his ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} against your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    ", not caring that he's stretching you beyond normal human endurance. ",
                    false
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "You're being raped again by demons, impaled on cocks like a roast pig on a spit, and you can feel your lust rising.  This corrupted land has left its mark on you.",
                        false
                    );
                // (High corruption)
                else
                    this.outx(
                        "This corrupted land has left its mark on you. You could never have taken a cock this big before you arrived here.",
                        false
                    );
                this.outx("\n\n", false);
                // (If the character has breasts)
                if (this.player.biggestTitSize() > 0)
                    this.outx(
                        `An ache starts deep in the base of your tits and works its way to your sore ${this.nippleDescript(
                            0
                        )}. Your already bloated nipples swell as your rider suckles and you gasp as the first rush of milk spills into his mouth. Your rider milks your udders, moving his hands between your ${this.player.allBreastsDescript()} and forcing out more milk than he could ever drink. Other imps lick the milk from the shiny skin of your swollen breasts.\n\n`,
                        false
                    );

                this.outx(
                    `The smaller imp slams his cock as deep into your throat as it will go, slapping his ${this.monster.ballsDescriptLight()} against your face. He cums, balls twitching as they pump spunk down your throat. You can feel your stomach stretching, but you're more worried about breathing. The imp cums for an impossibly long time, streams of jism pouring into you. The edge of your vision starts to go red and your chest heaves as you fight for air. Finally the imp draws his cock out of your throat, spraying his last gobs of cum over your face as you gasp in huge lungfuls of air. The sudden rush of oxygen pushes you over the edge and you cum hard. Your body arches and your eyes roll back in your head as you twist around the demonic ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} pounding into you. You shriek as your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    " spasms on the steaming pole that impales it. Another imp shoves his cock in your mouth as you scream, throat convulsing around his cock-head.",
                    false
                );
                // (If the player has a cock)
                if (this.player.cockTotal() > 0)
                    this.outx(
                        `  Your ${this.multiCockDescriptLight()} shoots cum across your belly and into the waiting mouths of the imps licking your crotch.`
                    );
                this.outx("\n\n", false);
                // (If the character has breasts)
                if (this.player.biggestTitSize() > 0) {
                    this.outx(
                        `Imps lick milk from your bloated ${this.biggestBreastSizeDescript()} as your rider milks you.  As one imp drinks his fill, staggering away with a sloshing belly, another steps up to guzzle from your milk-spewing udders.\n\n`,
                        false
                    );
                    // Additional nipplefucking scene by Xodin
                    if (this.player.hasFuckableNipples()) {
                        this.outx(
                            `The imp rider grabs the fat folds of one of your nipplecunt's 'labia' and grins mischeviously. He rubs his obscene erection all over the milk stained surface of your nipple-cunt's clit and begins to press the head of his bulbous imp cock into the swollen orifice against the flow of milk. You know no woman in your village could have handled an aroused cock this big, and yet now this imp on your ${this.player.allBreastsDescript()} is about to ram just such an erection into one of your ${this.nippleDescript(
                                0
                            )}s. He tugs and pulls and pulls again on your nipple-cunt's sensitive labia, forcing his cock to push into the flesh of your ${this.biggestBreastSizeDescript()}. Your taut flesh burns with his venom already, and is now violated by the presence of his demonic flesh rod.  `
                        );
                        // [START BREAST SIZE SPECIFIC TEXT]
                        // [IF breastSize <= DD]
                        if (this.player.biggestTitSize() <= 5)
                            this.outx(
                                "You feel the bulbous head of his cock squeeze further and deeper until it pushes up against your ribs.",
                                false
                            );
                        // [ELSE IF breastSize > DD]
                        else
                            this.outx(
                                `You feel the unnaturally large erection spear the fat filled depths of your ${this.biggestBreastSizeDescript()} until at last the imp has shoved himself in to his hilt. He smiles at the sensation of having his manhood completely engulfed in your ${this.biggestBreastSizeDescript()}.`
                            );
                        // [END BREAST SIZE SPECIFIC TEXT]
                        this.outx(
                            `  Back and forth he begins fucking your tit as if it were a regular pussy, and it occurs to you that such a description isn't far from the truth. You gasp in pleasure as a strange kind of minor orgasm ripples through your tit and the taut skin of your mammary feels tighter as the ${this.biggestBreastSizeDescript()} momentarily spasms around the imp's manhood. The horny little demon slaps your nipplecunt's clit in gleeful victory and jumps to the next breast to repeat his lewd fucking on a fresh hole.`
                        );
                        this.outx("\n\n", false);
                    }
                }
                this.outx(
                    `The imp-cock in your throat spasms and its owner rams as deep into you as he can get. He floods your already swollen stomach with inhuman amounts of cum. Again you feel yourself about to black out as the demon pumps jism into you. He pulls out and again you orgasm as you wheeze for air. Another imp forces his cock down your throat as you moan and gasp. Your body shakes in pleasure on the big imp's ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )}.  Tightening his grip on your ${this.hipDescript()} the master imp howls and slams his shaft into your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    ". His unnaturally huge knot stretches the entrance of your hole, and he hammers into you again. ",
                    false
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        `You howl around the imp-cock stretching your throat. The bloated knot opens your hole far beyond anything you've endured before. Your violent thrashing throws the imps off your ${this.player.legs()} and you kick uselessly, thrashing and bucking as the swollen ${Appearance.cockNoun(
                            CockTypesEnum.DOG
                        )} plunges deeper into you.`
                    );
                // (High corruption)
                else
                    this.outx(
                        `The master imp's bloated knot stretches your entrance and plunges into your hole with a loud <i>pop</i>. Another orgasm hits you as the ${Appearance.cockNoun(
                            CockTypesEnum.DOG
                        )} rams even deeper into you. You howl around the imp-cock stretching your throat, thrashing and bucking as your orgasm shakes you. Your violent thrashing throws the imps off your legs and you wrap your legs around the big imp, pulling him further into your hole.`
                    );
                this.outx(
                    ` The big imp howls again as he cums, each wave of steaming demon-cum stretching his knot and shaft even more. His cum-pumping ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} is bottomed out deep in your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx("womb");
                // (If the player doesn't have a vagina)
                else this.outx("guts");
                this.outx(
                    " and he pumps more jism into you than his balls could possibly hold. Your belly stretches with every blast of cum and you shriek around yet another cock in your throat.\n\n",
                    false
                );

                // (If the character has breasts)
                if (this.player.biggestTitSize() > 0)
                    this.outx(
                        `The imp riding your ${this.biggestBreastSizeDescript()} finally cums, painting your distended fuck-udders with his massive load.  `
                    );
                this.outx(
                    `Your master isn't done with you yet, churning his ${Appearance.cockNoun(
                        CockTypesEnum.DOG
                    )} knot in your `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    ` as he continues to cum. You're pumped full of demon-cum from both ends as one imp shoots his load in your throat and another steps up to take his place. You shake and tremble in your own endless orgasm as the pleasure in your stretched hole blends with the pain of your swollen belly. Your ${this.player.legs()} thrash as the master imp shifts his massive knot within your monstrously stretched `
                );
                // (If the player has a vagina)
                if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
                // (If the player doesn't have a vagina)
                else this.outx(this.assholeDescript(), false);
                this.outx(
                    ". Your toes curl as you feel more pulses of demon-cum work their way up his shaft and into your already-huge belly.\n\n",
                    false
                );

                this.outx(
                    "You pass out as another load of imp-cum pours down your throat, another tidal wave of corrupted jism spews into your hole, to meet somewhere in the middle...\n\n",
                    false
                );
                this.outx(
                    `You wake up later, still trembling with small orgasms. Cum burbles in your mouth as you breathe. You haven't moved since you passed out. Your hips are still propped up over the log, and you rest in a cooling pool of cum, your ${this.hairDescript()} plastered to the ground with drying jism. You couldn't move even if your ${this.player.legs()} felt stronger. Your hideously bloated belly weighs you down, `
                );
                // (If the player has breasts)
                if (this.player.biggestTitSize() > 0)
                    this.outx(
                        "and your milk-filled udders are still swollen with imp-venom, ",
                        false
                    );
                this.outx(
                    "quivering with every orgasmic twitch that passes through you. The skin of your distended belly ",
                    false
                );
                // (If the player has breasts)
                if (this.player.biggestTitSize() > 3) this.outx("and massive tits ");
                this.outx(
                    "is drum-tight and shiny, and your belly-button has popped out into an outie. As you slip back into unconsciousness, one last thought flits across your mind. ",
                    false
                );
                // (Low Corruption)
                if (this.player.cor < 50)
                    this.outx(
                        "How long can you last in this corrupted land, when your body can be so horribly twisted for the sick pleasures of its denizens?\n\n",
                        false
                    );
                // (High corruption)
                else
                    this.outx(
                        "Why bother with your silly quest, when you've only scratched the surface of the pleasures this land offers you?\n\n",
                        false
                    );
                this.player.orgasm();
                this.dynStats("lib", 2, "cor", 3);
                this.player.knockUp(
                    PregnancyStore.PREGNANCY_IMP,
                    PregnancyStore.INCUBATION_IMP - 14
                ); // Bigger imp means faster pregnancy
                // Stretch!
                if (this.player.hasVagina()) {
                    if (this.player.cuntChange(this.monster.cockArea(2), true))
                        this.outx("\n", false);
                } else {
                    if (this.player.buttChange(this.monster.cockArea(2), true))
                        this.outx("\n", false);
                }
            }
        }
        this.doNext(this.playerMenu);
    }

    public impRapesYou(): void {
        this.outx("", true);
        if (
            (this.player.findPerk(PerkLib.BimboBrains) >= 0 ||
                this.player.findPerk(PerkLib.FutaFaculties) >= 0) &&
            !this.player.isTaur() &&
            this.player.hasVagina()
        ) {
            this.outx(this.images.showImage("imp-loss-female-fuck"), false);
            this.outx(
                `You sink to the ground, assuming a position that feels all too natural to you now, leaning forward to let your ${this.player.allBreastsDescript()} hang down slightly. The imp looks you up and down, wickedly eyeing your ready, slightly open lips. He drops his loin-cloth to reveal a hardening cock. Your eyes bulge as it grows larger... and larger... and larger! The imp's cock finally bulges to a full twelve inches... and it's moving closer. You struggle to think... but you just can't! You want that in your mouth, like, so bad!\n\n`,
                false
            );
            this.outx(
                `Your ${this.vaginaDescript(
                    0
                )} drips in anticipation, and you find yourself involuntarily moving your knees farther apart to prepare yourself to be filled. He smiles and presses his cock against your ${this.vaginaDescript(
                    0
                )}, pushing you back to get a better angle. You try to make words, but your brain can only think of so much at once! Right now, it's thinking of cock, which, naturally, makes you open your mouth and let out a slutty moan.\n\n`,
                false
            );

            this.outx(
                `The imp pushes into you violently, ramming his cock in to the hilt, leaving you gasping in pain and surprise. He leaves it in your slutty pussy, giving you a second to... oh who is he kidding... he can tell by your air-headed look that you've done nothing but take cocks your whole life. He fucks you hard, slapping your ${this.buttDescript()} to remind you who is in charge. You can't help but think about, like, how you just love it when a man takes charge. Less thinking!`
            );
            this.player.cuntChange(12, true, true, false);
            this.outx("\n\n", false);

            this.outx(
                "The rough fucking becomes more and more pleasurable as time goes on. You moan air-headedly with each thrust, hips squeezing around the demon-cock- loving the feeling of his fullness. Before long you can't help but cum all over him, your vagina locking around his cock like a vice, muscles rippling, milking him for his cum. The imp's prick explodes inside you, pumping huge loads of hot demon-seed inside you with each eruption. You swoon, feeling it fill your womb and distend your belly as the imp's orgasm fills you with insane amounts of cum.\n\n",
                false
            );

            this.outx(
                "With a sigh, he pulls his dick free, and you flop down, cum leaking out onto the ground from your well-fucked hole. If you could, like, focus at all, you'd totally be worrying about being, like, pregnant or whatever. But you lose consciousness.",
                false
            );
            this.player.knockUp(PregnancyStore.PREGNANCY_IMP, PregnancyStore.INCUBATION_IMP - 14); // Bigger imp means faster pregnancy

            this.player.orgasm();
            this.dynStats("lib", 1, "sen", 1, "cor", 1);
            this.cleanupAfterCombat();
            return;
        }
        // Lust loss
        if (this.player.lust >= 100) {
            // 50% chance of sprocket rape for super-thick people.
            if (this.player.cocks.length >= 1 && ImpScene.rand(2) == 0) {
                if (this.player.cocks[0].cockThickness >= 4) {
                    this.sprocketImp();
                    return;
                }
            }
            // Female or Futa
            if (this.player.gender == 2 || this.player.gender == 3) {
                this.player.slimeFeed();
                this.outx(this.images.showImage("imp-loss-female-fuck"), false);
                this.outx(
                    `You sink to the ground, too overcome by lust and desire to fight.  The imp smiles, a wicked look glinting in his eyes.  He drops his loincloth to reveal a hardening cock.  Your eyes bulge a bit as it grows...and grows...and grows!  That imp has a twelve inch cock..and he's walking towards you.   Your ${this.vaginaDescript(
                        0
                    )} practically juices itself in anticipation, and you find yourself spreading your ${this.player.legs()} in preparation.`
                );
                this.outx(
                    `\n\nHe smiles and presses his cock against your ${this.vaginaDescript(
                        0
                    )}.  Your lust-driven mind is speechless, leaving you panting and moaning like a whore.`,
                    false
                );
                // If too big, only partly penetrate.
                if (this.player.vaginalCapacity() < this.monster.cockArea(0)) {
                    if (this.player.vaginas[0].virgin) {
                        this.outx(
                            "  He plunges in hard, breaking your hymen and stealing your virginity.  A look of surprise crosses his face, chased away by ecstasy.  If you had a rational bit left in your mind, you'd notice he looks... stronger somehow, but you're too horny to care.",
                            false
                        );
                        this.player.vaginas[0].virgin = false;
                    } else {
                        this.outx(
                            "  He pushes against your tight little pussy, struggling to penetrate you.",
                            false
                        );
                    }
                    this.outx(
                        `  His cock only sinks a few inches in, but he begins fucking you hard, each time claiming a bit more of your pussy for his demonic tool.  You feel a painful stretching as he gets half of it inside you, ruining your ${this.vaginaDescript(
                            0
                        )} for most humans.  He fucks you like this for what seems like forever, never getting much further. `
                    );
                    this.player.cuntChange(this.monster.cockArea(0), true);
                } else {
                    this.outx(
                        `  He plunges in violently, ramming his ${this.monster.cockDescriptShort(
                            0
                        )} in to the hilt, leaving you gasping in pain and surprise.  He leaves it there, giving you a second to get used to him, and then begins fucking you hard, slapping your ass every few thrusts to remind you who is in charge.`
                    );
                    this.player.cuntChange(12, true, true, false);
                }
                if (this.player.gender == 3)
                    this.outx(
                        `\n\nThe rough fucking becomes more and more pleasurable as time passes, until you cannot help but stroke your ${this.cockDescript(
                            0
                        )} along with each plunge he takes in your ${this.vaginaDescript(
                            0
                        )}.  You feel yourself clench around him as your sexual organs release, erupting spurts of cum and milking the demon's cock like your life depended on it.`,
                        false
                    );
                if (this.player.gender == 2)
                    this.outx(
                        `\n\nThe rough fucking becomes more and more pleasurable as time passes.  You moan loudly and lewdly with each thrust, hips squeezing around the demon-cock, relishing the feeling of fullness.  Before long you cannot help but cum all over him, ${this.vaginaDescript(
                            0
                        )} locking around his cock like a vice, muscles rippling, milking him for his cum.`,
                        false
                    );
                this.outx(
                    `  The imp's ${this.monster.cockDescriptShort(
                        0
                    )} explodes inside you, pumping huge loads of hot demon-seed inside you with each eruption.  You swoon, feeling it fill your womb and distend your belly as the imp's orgasm fills you with an unnatural quantity of corrupted semen.\n\nWith a sigh, he pulls his dick free, and you flop back on your back, cum surging out onto the ground from your well-fucked hole.  `,
                    false
                );
                if (this.player.pregnancyIncubation > 0 && this.player.pregnancyIncubation <= 216) {
                    this.outx(
                        "You wonder what this will do to whatever is growing in your womb...  ",
                        false
                    );
                } else {
                    if (this.player.inHeat)
                        this.outx(
                            "You find yourself hoping you're pregnant as you swiftly lose consciousness.",
                            false
                        );
                    else if (this.player.pregnancyIncubation <= 0) {
                        if (this.player.cor > 75)
                            this.outx(
                                "With an appreciative moan, you bury your fingers in its slimy warmth, hoping you are pregnant with some fiendish offspring, and lose consciousness.",
                                false
                            );
                        else
                            this.outx(
                                "You hope you don't become pregnant, but promptly lose consciousness before you can contemplate the prospect any further.",
                                false
                            );
                    }
                }
                this.player.knockUp(
                    PregnancyStore.PREGNANCY_IMP,
                    PregnancyStore.INCUBATION_IMP - 14
                ); // Bigger imp means faster pregnancy
                this.dynStats("lib", 1, "sen", 1, "lus", 1, "cor", 1);
                this.player.orgasm();
            }
            // Male or genderless
            if (this.player.gender == 0 || this.player.gender == 1) {
                // Alternate male-only case
                if (this.player.gender == 1 && ImpScene.rand(2) == 0) {
                    this.outx(this.images.showImage("imp-loss-male-fuck"), false);
                    this.outx(
                        "Your eyes glaze over with lust as the imp's dark magic destroys your will to continue fighting. You sink to your ",
                        true
                    );
                    if (this.player.lowerBody == LOWER_BODY_TYPE_CENTAUR)
                        this.outx(
                            `hocks and knees, your ${this.cockDescript(
                                0
                            )} hurting from the massive blood pressure caused by your unbridled lust. He approaches you and stops about two feet in front of you, watching with delight your helpless state`
                        );
                    else
                        this.outx(
                            `knees, pull out your ${this.cockDescript(
                                0
                            )} and begin mindlessly stroking yourself as the imp approaches you, a wicked grin on his face. Your mind races with thoughts and images of sucking the imp's cock. He approaches you and stops about two feet in front of you, watching with delight as you succumb to your own lust`
                        );
                    this.outx(
                        `. Your eyes glance down to his waist and see a massive bulge form under his loincloth, the sight of which causes your ${this.cockDescript(
                            0
                        )} to twitch and begin leaking pre-cum.\n\n`,
                        false
                    );
                    this.outx(
                        "The imp drops his loincloth, revealing his huge 12-inch penis, and then forcefully grabs your head and pulls you down on to his hard throbbing demon dick. He shoves his cock past your lips and deep down your throat in one slow, forceful push. You can barely accommodate his huge cock, and yet your lust makes you hunger for more. You cough and gag while the imp proceeds to fuck your mouth hard, slapping his hot balls against your chin, disregarding your need to breathe.  ",
                        false
                    );
                    if (this.player.lowerBody == LOWER_BODY_TYPE_CENTAUR)
                        this.outx(
                            `Dropping down to the ground, your ${this.cockDescript(
                                0
                            )} trembles against your body to the rhythm of the imp's thrusts, leaving your underbelly smeared with its own pre-cum.\n\n`,
                            false
                        );
                    else
                        this.outx(
                            `On all fours now, your ${this.cockDescript(
                                0
                            )} bounces up and down against you to the rhythm of the imp's thrusts, leaving your belly smeared in your own pre-cum.\n\n`,
                            false
                        );
                    if (this.player.ballSize >= 5)
                        this.outx(
                            `Your huge ${this.ballsDescriptLight()} swing heavily against you as well, responding to the force of the imp's thrusts, slapping your own ass and driving your ${this.cockDescript(
                                0
                            )} even stiffer with lust, the pre-cum pulsing out of your cock in time with the slapping.\n\n`,
                            false
                        );
                    this.outx(
                        "You begin to feel light-headed from lack of air just as the imp grips your head firmly and begins making rapid, shallow thrusts down your throat, nearing his orgasm. Suddenly he clenches tight, his claws digging into your head and thrusts down your throat as far as he can, holding his massive cock deep in your stomach. Your eyes go wide as you feel the imp's balls on your chin spasm violently.  His cock pulses in your mouth as the thick demon cum is pumped violently down your throat. It feels like an eternity as the imp continues to fill your guts with his hot cum, his orgasm lasting far longer than any human's. He slowly withdraws his still-pumping cock from you, coating your throat and then mouth with an almost continual spray of his unnaturally hot and sticky demon seed. The imp pulls out of your mouth just in time to splatter your face with his cum before his orgasm stops, coating your lips, nose, eyes, and hair with his incredibly thick and sticky cum.\n\n",
                        false
                    );
                    this.outx(
                        `You fall to the ground gasping, exhausted and unable to move, the demon cum on your face and inside you still burning with intense heat and corruption. You lose consciousness, your ${this.cockDescript(
                            0
                        )} still firmly erect, your lust not sated.`
                    );
                    this.dynStats("lus", 20, "cor", 2);
                    this.cleanupAfterCombat();
                    this.player.slimeFeed();
                    return;
                } else {
                    this.player.slimeFeed();
                    this.outx(
                        "You sink to the ground, too overcome by lust and desire to fight.  The imp smiles and circles you, dropping his loincloth as he goes.  You are roughly shoved to the ground, your backside slapped hard.  You're too horny to do anything but moan from the pain ",
                        false
                    );
                    if (this.player.lowerBody != LOWER_BODY_TYPE_CENTAUR)
                        this.outx("as you are disrobed");
                    this.outx(
                        `.  As the imp presses a large bulk against your backside, you realize he has a massive penis!\n\nThe imp pushes his ${this.monster.cockDescriptShort(
                            0
                        )} into your ass and fucks you hard, with little regard to your pleasure.  After a rough fucking, he cums, stuffing your ass full of hot demon cum.  His orgasm lasts far longer than any human's, leaving your belly slightly distended.`,
                        false
                    );
                    this.player.buttChange(this.monster.cockArea(0), true, true, false);
                    this.dynStats("lib", 1, "sen", 1, "lus", 1, "cor", 1);
                    if (this.player.sens > 40) {
                        this.outx(
                            "  You manage to orgasm from the feeling of being filled by hot cum.",
                            false
                        );
                        if (this.player.gender == 1)
                            this.outx(
                                "  You jizz all over the ground in front of you, spraying cum in huge squirts in time with the demon's thrusts.",
                                false
                            );

                        this.player.orgasm();
                        this.dynStats("cor", 1);
                    }
                    this.outx(
                        "\n\nYou drop to the ground when he's done with you, cum spilling from your abused ass all over the ground, too exhausted to move.  Consciousness fades.  ",
                        false
                    );
                }
            }
        }
        // HP or insta-loss
        else {
            this.outx(
                "\n<b>You fall, defeated by the imp!</b>\nThe last thing you see before losing consciousness is the creature undoing its crude loincloth to reveal a rather disproportionately-sized member.",
                false
            );
        }
        this.cleanupAfterCombat();
    }

    // noogai McNipple-holes
    private noogaisNippleRape(): void {
        this.outx("", true);
        this.outx(
            `You slowly walk over to the masturbating imp, your ${this.hipDescript()} and ${this.buttDescript()} swaying suggestively with every step.\n\n`,
            false
        );

        this.outx(
            "Shedding your clothes you push the imp to the ground and straddle him, keeping his hands away from his twitching pecker while you quickly tie him up with his own loincloth.  The lust-addled demon utterly incapacitated, you start to use both of your hands to toy freely with your slimy nipple-holes, as well as your ",
            false
        );
        if (this.player.hasCock()) this.outx(this.cockDescript(0), false);
        if (this.player.hasCock() && this.player.hasVagina()) this.outx(" and ");
        if (this.player.hasVagina()) this.outx(this.vaginaDescript(0), false);
        else if (this.player.gender == 0) this.outx(this.assholeDescript(), false);
        this.outx(".\n\n", false);

        this.outx("You gently insert a single digit into one of your nipple-cunts, ");
        if (this.player.lactationQ() >= 1000)
            this.outx("unleashing a torrent of thick, creamy milk and ");
        // (if regular milky;
        else if (this.player.lactationQ() >= 50 && this.player.biggestLactation() >= 1)
            this.outx("releasing a steady trickle of warm milk and ");
        this.outx(
            "lust-induced sex juice onto the imp's lap; your other hand instinctively moves down to stroke your ",
            false
        );
        // ((if male/herm;
        if (this.player.hasCock()) {
            this.outx("rock-hard cock");
            if (this.player.hasVagina()) this.outx(" and ");
        }
        if (this.player.hasVagina()) this.outx("dripping wet pussy");
        if (this.player.gender == 0) this.outx(this.assholeDescript(), false);
        this.outx(
            ", teasing him with a lewd moan as your head rolls back in sexual ecstasy.",
            false
        );
        if (this.silly()) this.outx("  The imp is sickened, but curious.");
        this.outx("\n\n", false);

        this.outx(
            "You continue finger-fucking your nipple, becoming more and more aroused as the imp gets harder and harder from watching the exotic display before him.  You soon tire of watching the imp squirm beneath you, desperate for sexual relief; you slowly move your hand away from your groin, reaching down towards his crotch, and start to toy with his apple-sized balls, fondling and squeezing them roughly.  You casually slip a second finger into your wet nipple-hole, stretch it out teasingly, and hold the gaping orifice in front of the imp's face, giving him a good view of the inside of your freakish, wet nipple-cunt.\n\n",
            false
        );

        // (If corrupt:
        if (this.player.cor >= 66) {
            this.outx(
                `"<i>Mmm, wouldn't you just love to stick your fat cock into this sopping wet hole, and cum deep inside my ${this.chestDesc()}?</i>"  You whisper huskily into his ear, sliding your fingers away from his balls and up along the underside of his aching dick, teasing every inch of it until you reach his swollen head and start rubbing your finger around his glans in small circles.  The imp is panting heavily, his eyes firmly locked on your `
            );
            // (if normal)
            if (this.player.biggestLactation() < 1) this.outx("wet");
            // (if lactating)
            else this.outx("milky");
            this.outx(", bucking his hips upwards in desperation.\n\n", false);
        }
        this.outx(
            `Deciding that the poor bastard has suffered enough, you guide your stretched ${this.nippleDescript(
                0
            )} down to his quivering member and hold it over the tip for a moment.  The imp groans in frustration, feeling the heat of your slutty juices dripping down onto his aching rod and overfull testes, making him even more desperate to drive deep into your waiting breast.  Without warning, you forcefully shove your breast onto his swollen fuckstick, `
        );
        if (this.player.biggestTitSize() <= 4)
            this.outx("bottoming out halfway on his immense dick.");
        else
            this.outx(
                "only stopping when the flesh of your immense mammary bumps into his quaking ballsack.",
                false
            );
        this.outx("\n\n", false);

        this.outx(
            "You shudder in ecstasy as you rise off of his drenched girth; your nipple-hole is slick with arousal, making it easier for you to slide back down until ",
            false
        );
        // ((if breast size below D)
        if (this.player.biggestTitSize() <= 4)
            this.outx(
                "you feel his swollen cock bottom out, your petite breast unable to swallow any more of his throbbing maleness",
                false
            );
        // ((over D)
        else
            this.outx(
                "his swollen cock and desperately filled balls are entirely engulfed in tit-flesh",
                false
            );
        this.outx(
            ".  Eventually the imp starts timing his thrusts with your movements, and soon the two of you are working in a steady rhythm - thrust, retract, thrust, retract.  Minutes go by as the rhythm slowly builds towards a crescendo, with the only sounds being the lewd schlicking noise of your breast servicing the imp's rod, and the odd moan escaping your lips.  While one hand is furiously jilling off your vacant nipple-slit, the other one is furiously",
            false
        );
        // [(if male)
        if (this.player.hasCock()) this.outx(` pumping your ${this.cockDescript(0)}`);
        // (if female)
        else if (this.player.hasVagina()) this.outx(" fingering your hungry baby tunnel");
        else this.outx(" fingering your tingling anus");
        this.outx(".\n\n", false);

        this.outx(
            `Eventually the rhythm becomes more sporadic as you and the imp approach climax; your tongue rolls out of your open mouth and your toes curl as you feel the imp spasm violently inside you, letting an endless stream of his searing spunk pour directly into your ${this.chestDesc()}.  The intense heat pushes you over the edge and `
        );
        // (if dick)
        if (this.player.hasCock()) {
            this.outx("a ");
            // [(cum production < 500ml)
            if (this.player.cumQ() < 500) this.outx("jet ");
            // (cum production 500-1000ml)
            else if (this.player.cumQ() < 1000) this.outx("geyser ");
            // (cum production > 1000ml)
            else this.outx("volcano ");
            this.outx(
                `of cum sprays from your ${this.cockDescript(
                    0
                )} and splatters over both you and the hapless imp`
            );
            if (this.player.hasVagina()) this.outx(", while ");
        }
        if (this.player.hasVagina()) {
            this.outx(
                `your pussy juices spurt out as your ${this.vaginaDescript(0)} twitches in orgasm`
            );
        }
        if (this.player.gender == 0) this.outx("your asshole clenches tight on your finger");
        this.outx(".\n\n", false);

        this.outx(
            "You collapse heavily on top of the imp, once again impaling your breast on his still-erect cock.  You lie like this for a few moments until you notice that the imp has dozed off, exhausted by the whole ordeal.  You stand up woozily as a mixture of ",
            false
        );
        // (if lactating)
        if (this.player.biggestLactation() >= 1 && this.player.lactationQ() < 40)
            this.outx("milk, ");
        this.outx("fem-spunk and hot demon cum leaks out from your gaping nipple-cunt.\n\n", false);

        // (if corruption > 60)
        if (this.player.cor > 60)
            this.outx(
                `You thrust your digits into your ${this.nippleDescript(
                    0
                )} once more, scooping out as much imp jizz as you can reach.  You happily drink up the thick goo, savoring the cloying taste before quickly getting dressed and leaving the imp to slumber.`
            );
        // (continue to non-corrupt text)
        // (if not)
        else
            this.outx(
                "You quickly get dressed and leave the imp to his slumbering, his hands still tied together by his loincloth.",
                false
            );
        // Gain xp and gems here
        this.player.orgasm();
        this.dynStats("sen", -3, "cor", 1);
        this.cleanupAfterCombat();
    }

    // IMP LORD
    public impLordEncounter(): void {
        this.clearOutput();
        this.outx(
            `A large corrupted imp crosses your path. He flashes a cruel smile your way.  No way around it, you ready your ${this.player.weaponName} for the fight.`
        );
        this.startCombat(new ImpLord());
    }

    // Rewards
    // +20 XP
    // +7-15 Gems
    // Common Drops: Imp Food & Incubus Draft
    // Rare Drops: LaBova & Minotaur Blood
    public defeatImpLord(): void {
        this.clearOutput();
        if (this.monster.HP < 1) {
            this.outx(
                "The greater imp falls to the ground panting and growling in anger.  He quickly submits however, the thoroughness of his defeat obvious.  You walk towards the imp who gives one last defiant snarl before slipping into unconsciousness."
            );
            this.cleanupAfterCombat();
        } else {
            this.outx(
                "The muscular imp groans in pained arousal, his loincloth being pushed to the side by his thick, powerful dick.  Grabbing the useless clothing, he rips it from his body, discarding it.  The imp's eyes lock on his cock as he becomes completely ignorant of your presence.  His now insatiable lust has completely clouded his judgment.  Wrapping both of his hands around his pulsing member he begins to masturbate furiously, attempting to relieve the pressure you've caused."
            );
            // Leave // Rape]
            this.menu();
            if (this.player.lust >= 33) this.addButton(0, "Sex", this.sexAnImpLord);
            this.addButton(9, "Leave", this.cleanupAfterCombat);
        }
    }
    public loseToAnImpLord(): void {
        this.clearOutput();
        if (this.player.hasVagina() && (this.player.gender == 2 || ImpScene.rand(2) == 0))
            this.getRapedAsAGirl();
        else if (this.player.hasCock()) this.loseToImpLord();
        else {
            this.outx(
                'Taking a look at your defeated form, the imp lord snarls, "<i>Useless,</i>" before kicking you in the head, knocking you out cold.'
            );
            this.player.takeDamage(9999);
            this.cleanupAfterCombat();
        }
    }

    // Rape
    private sexAnImpLord(): void {
        this.clearOutput();
        this.outx(
            "You grin evilly and walk towards the defeated corrupted creature.  He doesn't take notice of you even though you're only inches away from him.  You remove your [armor] slowly, enjoying the show the imp is giving you.  But soon it's time for you to have fun too."
        );
        // (No line break)
        // if(player doesn't have centaur legs)
        if (!this.player.isTaur())
            this.outx(
                `  You grab his hands, removing them from his ${this.monster.cockDescriptShort(
                    0
                )}. This gets his attention immediately, and you grin widely, pinning him to the ground.`
            );
        else
            this.outx(
                "  You place one of your front hooves on his chest, knocking him onto his back.  He attempts to get back up, but you apply more pressure to his thick, manly chest, until he gasps.  The imp gets the idea quickly and stops masturbating, all of his focus now on you."
            );

        this.menu();
        // Continues in, Male Anal, Female Vaginal, or Breastfeed
        this.addButton(9, "Leave", this.cleanupAfterCombat);
        if (this.player.lust >= 33) {
            if (this.player.hasCock() && this.player.cockThatFits(this.monster.analCapacity()) >= 0)
                this.addButton(0, "FuckHisAss", this.impLordBumPlug);
            if (this.player.hasCock()) this.addButton(1, "Get Blown", this.getBlownByAnImpLord);
            if (this.player.hasVagina()) this.addButton(2, "Ride Cock", this.femaleVagRape);
            if (this.player.findPerk(PerkLib.Feeder) >= 0)
                this.addButton(3, "Breastfeed", this.feederBreastfeedRape);
        }
    }

    // MALE ANAL
    private impLordBumPlug(): void {
        this.clearOutput();
        this.outx(this.images.showImage("implord-win-male-fuck"), false);
        let x: number = this.player.cockThatFits(this.monster.analCapacity());
        if (x < 0) x = this.player.smallestCockIndex();
        this.outx(
            "You grab the muscular creature by one of his long pointed ears, pulling him to his feet. He protests slightly, and gives a slightly defiant snarl of discomfort.  Lucky for him you're in a forgiving mood and ignore his whining."
        );
        // (No line break)
        if (this.player.tallness < 72) {
            this.outx("  You give a powerful shove and push the imp to his knees.");
        }
        this.outx(
            `  You pull the imp's head towards your [hips], forcing his lips against the base of your ${this.cockDescript(
                x
            )}.  The imp quickly gets the idea and begins to lick and suckle at your ${this.player.cockHead(
                x
            )} expertly.`
        );

        this.outx(
            `\n\nYou pet the top of his smooth head encouragingly, his tongue quickly soaking your length in saliva.  With little encouragement, the imp begins to take your ${this.cockDescript(
                x
            )} into his mouth, focusing on milking the head of its delicious precum.  You soon remember what you'd intended to do with the little cock slut, and push him away from your length.  You could swear the imp whimpered in response to this, which makes you grin.`
        );

        this.outx(
            "\n\nYou spin your finger around, signaling the imp to turn around.  His eyes widen in response, clearly understanding what you have intended.  He nervously obeys, spinning around and even crouching forward. The invitation looks incredibly tempting, his hole looks fairly well used but your arousal keeps you from complaining."
        );

        this.outx(
            `\n\nYou drape your ${this.cockDescript(
                x
            )} between the imp's butt cheeks.  Teasingly you begin thrusting between the muscular cleft of his ass, much to the creature's dismay.  The greater imp whines submissively, desperate for you to enter him.  His ${this.monster.cockDescriptShort(
                0
            )} drools as you tease his ass, creating a small puddle of pre between his hooves.  The poor creature becomes so desperate that he reaches back and spreads his muscular cheeks with his hands.  You catch a small glimpse of his now gaping hole as your cock continues to slide between his cheeks.  You tease him with one last empty thrust, before grabbing his shoulders and forcing your ${this.cockDescript(
                x
            )} deep inside the poor creature.`
        );

        this.outx(
            `\n\nThe imp loses control immediately and nearly collapses from the massive orgasm.  His large, corruption-bloated balls clench up, and semen floods out of his ${this.monster.cockDescriptShort(
                0
            )} like a fountain.  The hot demon seed puddles around his feet, soaking the ground in his thick boy-goo.`
        );

        this.outx(
            `\n\nHis orgasm also cause his anus to tighten and spasm around your ${this.cockDescript(
                x
            )}, as if he was milking you of your seed.  Unable to resist, you start plunging yourself rapidly in and out of the spasming hole.`
        );
        // (No line break)
        if (this.player.balls > 0) {
            this.outx(
                "  You feel the slapping of your [balls] against the imp's, a sensation that only spurs you on, causing you to slam into him over and over wildly."
            );
        }
        if (this.player.biggestTitSize() >= 1 && this.player.lactationQ() >= 200) {
            this.outx(
                "  You give a desperate groan, and grab one of your [chest] roughly.  You pinch and massage your "
            );
            if (this.player.averageNipplesPerBreast() > 1) this.outx("[nipples]");
            else this.outx("[nipple]");
            this.outx(", making you moan in ecstasy and leak milk, quickly soaking your chest.");
        }
        // if(player has Fertility perk && player.balls >= 4)
        if (this.player.balls >= 4) {
            this.outx(
                `\n\nAs much as you would love to continue the pleasure you can't last any longer.  You howl in intense pleasure and cum.  Your [balls] tighten against your body, and empty their contents. Your ${this.cockDescript(
                    x
                )} pulses and spasms, releasing wave and wave of semen into the greater imp's belly.  The pleasure is intense, and almost painful as your cum.`
            );
            // if(player is a herm)
            if (this.player.gender == 3)
                this.outx(
                    `\n\nAs your ${this.cockDescript(x)} erupts, your ${this.vaginaDescript(
                        0
                    )} tenses up tightly, spasming, desperate to be filled.  After a moment your girl juice begins to soak your inner thighs.  Your legs begin to tremble from the intensity of it all, and you question if you'll be able to make it back to your camp after this.`
                );

            this.outx(
                `\n\nThe imp howls as his ass is flooded with cum.  His stomach begins to expand from the sheer amount of fluid you pump into him, and the sensation of being over filled causes the poor creature to cum a second time, spilling more semen into the already massive puddle.  His ${this.monster.cockDescriptShort(
                    0
                )} pumps wave after wave of corrupt seed onto the ground, soaking his hooves even further.`
            );

            this.outx(
                `\n\nYou're sure you must have blacked out at some point as you feel the last of your seed force its way out of your ${this.cockDescript(
                    x
                )} and into the imp's demon belly.  You wobble slightly and lean down, grabbing the ragged remains of the imp's loincloth.  Weakly you pull out of the demon's hole, and quickly stuff the cloth in its place as a makeshift plug.`
            );

            this.outx(
                "\n\nThe imp collapses face first into his thick cum puddle before rolling over.  Now soaked in his own cum the imp gently rubs his bulging belly, feeling your seed slosh around inside him.  He gives a contented sigh and passes out in his puddle of cum."
            );
        } else {
            this.outx(
                `\n\nSlamming your [hips] into the imp's muscular ass a few more times is all it takes you send you over the edge. Thinking quickly, you pull out completely.  Smashing your hips together one last time, you hot dog your ${this.cockDescript(
                    x
                )} between the two muscular mounds.  You let out a howl of pleasure as you spill your seed across the imp's backside.  The orgasm is so intense that several ropes of semen land across the imp's bald skull.`
            );

            this.outx(
                `\n\nAt the end of your orgasm, the poor creature is coated with your seed, marking him as the slut he is.  You release the exhausted imp and he falls forward into the puddle of his own semen.  The imp doesn't seem finished however, his ${this.monster.cockDescriptShort(
                    0
                )} is still hard, throbbing and drooling pre like a faucet.  The poor thing begins to jerk himself off feverishly, using his earlier spilled cum as a lubricant.  You consider staying for another round, but decide against it when your [legs] begin to wobble from exhaustion.`
            );
        }
        this.outx(
            "\n\nYou stumble slightly as you gather up your [armor], and begin to get dressed."
        );
        this.player.orgasm();
        this.dynStats("cor", 1);
        this.cleanupAfterCombat();
    }

    // MALE BLOW
    private getBlownByAnImpLord(): void {
        this.clearOutput();
        this.outx(this.images.showImage("implord-win-male-bj"), false);
        this.outx(
            "You lay your [cock biggest] along the demon's muscular chest.  Thrusting experimentally, your [cock biggest] leaves a thick trail of precum across the imp's cheek.  You begin to moan as you continue your casual thrusting across the imp's body.  The defeated creature squirms under you in protest, oblivious to the fact that the squirming is only increasing your stimulation.  It doesn't take you long to coat the imp's face and part of his chest in your thick precum.  Casually stepping back, you look at the imp from top to bottom, and back again.  You can't help but chuckle at what you see."
        );

        this.outx(
            "\n\nYour scent has overwhelmed the imp, his thick red dick is painfully hard and dripping, while he pants like a dog.  No longer being pinned down seems to have improved his mood however as he gets to his knees and crawls back towards your [cock biggest].  The imp sits between your [feet] and looks up at you nervously."
        );

        this.outx(
            "\n\nYou let yourself stare at the imp coldly for several long moments before smirking and giving a nod of approval.  Approval that the imp is more than happy to have. He places both his clawed hands around your [cock biggest] and pulls your [cockHead biggest] into his mouth, expertly suckling the tip.  His hands work up and down your length, rubbing and massaging all the right places. You moan happily as the demon works his magic."
        );

        // [pg]
        this.outx("\n\n");
        // if(cock thickness < 7)
        if (this.player.cocks[this.player.biggestCockIndex()].cockThickness < 7) {
            this.outx(
                "The imp begins to swallow more and more of your length, taking several inches before pulling back.  He twists his head and tongue worships your [cock biggest] with his mouth.  His tight mouth tightens more and relaxes as he swallows more of your precum."
            );
            if (this.player.balls > 0) this.outx("  His hands move down towards your [balls].");
            this.outx("\n\n");
            // if(balls > 0)
            if (this.player.balls > 0) {
                this.outx(
                    "The demon gropes and massages your [sack] roughly, forcing a large squirt of precum to shoot down his throat.  He swallows the treat happily and continues his cruel groping of your [balls].  His hands work wonders of your [sack], milking your [balls] in a way you didn't know possible.  It's clear he's done this many times before and is an expert of pleasuring males.  You chuckle between your moans, you definitely made a good choice with this one.\n\n"
                );
            }
            // else if(balls == 0)
            else
                this.outx(
                    "The demon seems to be searching for your testicles, but when he doesn't find anything, he moves his hand a bit further.\n\n"
                );

            // if(hasVagina)
            if (this.player.hasVagina())
                this.outx(
                    "A pair of fat red fingers slip into your [vagina] making you gasp in surprise, and clench your walls around the intruders.  After a moment, you relax as those clawed fingers scratch and rub your walls in a way you didn't know possible.  You groan loudly as you draw closer and closer to orgasm."
                );
            else
                this.outx(
                    "Two fat red fingers force their way into your [asshole] making you yelp in surprise.  The surprise turns quickly to pleasure as those fingers dance along your insides, massaging places you didn't know you had.  You might have been annoyed at the imp for the advancements if it hadn't felt so good.  You can't help but pant in ecstasy while those clawed fingers gently scratch at your prostate, drawing you closer and closer to orgasm."
                );
        }
        // else if(cock thickness >= 7)
        else {
            this.outx(
                "Though you're far too thick to fit any further into the imp's mouth, it doesn't stop him from trying.  The crimson demon works your length in every way he can.  His hands rub up and down your length.  You admire the effort as the little demon tries to fit more of your [cockHead biggest] into his mouth.  It soon becomes clear to the imp however, that that's not possible.  He pulls back off your length, his hands still rubbing up and down your shaft.  He looks at your cock slit, and presses his lips to it, forcing his tongue into your leaking urethra.  You yelp in surprise as the wet muscle makes its way shockingly deep into your [cock biggest].  His muscular hands work your length furiously while his tongue abuses your insides.  It doesn't take a lot of that treatment to have you teetering on the edge of orgasm."
            );
        }

        this.outx(
            "\n\nThe little demon continues to work your length for a few moments before you reach your limit. You howl in ecstasy, thrusting forward into the imp's tight mouth."
        );

        // if(cumNormal or cumMedium)
        if (this.player.cumQ() < 500)
            this.outx(
                "  You cum hard, easily filling the imp's hot mouth.  He swallows your load just as easily, grinning as he suckles your [cockHead biggest] happily.  He suckles for a few minutes, getting the last few drops of seed before letting your [cock biggest] drop from his mouth with a soft pop."
            );
        // if(cumHigh)
        else if (this.player.cumQ() < 1000)
            this.outx(
                "  You cum painfully hard, filling the demon's mouth beyond what it can hold.  Surprisingly the imp manages to swallow almost all of your spunk anyways, only allowing a little bit of his meal to dribble past his lips.  He pulls back and gives your [cock biggest] a few last licks, cleaning up any left over seed."
            );
        // if(cumVeryHigh or cumExtreme)
        else
            this.outx(
                "  Cum floods out of your urethra like a faucet, quickly filling the imp's tight mouth regardless of how fast he tries to swallow.  You step back, your length popping out of the demon's mouth.  The imp acts quickly, shutting his eyes and opening his mouth wide, as your seed splatters his face, chest and tongue.  Your [cock biggest] spasms from the powerful orgasm, quickly coating the imp in your hot spunk.  It takes several minutes for your orgasm to end, you manage to look at the cum soaked imp as he begins wiping your cum up with his hands.  His muscular hands don't stay cum soaked for long as he begins suckling each finger and licking his palms."
            );

        this.outx(
            "\n\nYou gather your things and put your [armor] back on before turning to leave.  You chance one last glance back at the defeated imp. You notice him laying down on his back, his hands working his own still hard length furiously.  You head back for camp and allow the imp to enjoy the afterglow of his meal."
        );
        this.player.orgasm();
        this.dynStats("cor", 1);
        this.cleanupAfterCombat();
    }

    // FEMALE VAGINAL
    private femaleVagRape(): void {
        this.clearOutput();
        this.outx(this.images.showImage("implord-win-female-fuck"), false);
        this.outx(
            `With little ceremony you grab the imp's ${this.monster.cockDescriptShort(
                0
            )} and begin to jerk your hand up and down roughly.  The little muscular beast begins to whine loudly, in protest to the rough and likely painful mistreatment of his ${this.monster.cockDescriptShort(
                0
            )}.  In spite of the protests, the rough treatment goes over well, as the creature begins to leak hot demon pre across your hand, which you smear across the shaft as a natural hot lube.`
        );
        this.outx(
            `\n\nLicking your lips, you squat above the little demon, positioning your ${this.vaginaDescript(
                0
            )} above the thick log of meat.  You stay still for a moment, and question if this was a good idea.  The demon was so thick you hadn't even been able to fit your hand around his shaft.  There was little chance you'd get out of this without some rather rough stretching, but the scent of the demon's arousal, and your corrupt lust spur you onwards.`
        );

        this.outx(
            `\n\nYou lower yourself, slowly, watching as the head of the demon's ${this.monster.cockDescriptShort(
                0
            )} begins to spread your ${this.vaginaDescript(
                0
            )}.  You begin to pant as you're stretched wide; you can hardly believe you can take him.  It takes you several minutes of steady, shallow, downward thrusts before the imp is completely hilted inside of your body.  You sit still for a moment to adjust to the intense sensation. The muscular creature doesn't seem to mind, as his tongue is hanging slightly out of the side of his mouth, panting like a dog.`
        );
        this.player.cuntChange(this.monster.cockArea(0), true, true, false);

        this.outx(
            `\n\nAs you adjust, you get a devilish idea.  Both your hands gently begin to massage the imp's muscular abs and chest; before taking each of his fertite-pierced nipples between your fingers.  You pinch and tug upwards, roughly playing with his sensitive nipples.  The imp instinctively bucks his hips, slamming into you roughly, making you yelp and clench your [vagina] around his ${this.monster.cockDescriptShort(
                0
            )}.`
        );

        this.outx(
            "\n\nIt takes a moment, but the pleasure of that begins to wash over you in a heavenly wave.  You continue to roughly tease the imp's nipples, causing him to buck upwards into your waiting womb instinctively.  Neither of you complain as the sensation is incredibly intense, and well worth the slight bit of discomfort."
        );

        if (this.player.cockTotal() == 1) {
            if (this.player.cocks[0].cockLength < 8) {
                this.outx(
                    `\n\nThe intense stimulation causes your ${this.cockDescript(
                        0
                    )} to begin leaking pre across the imp's stomach.  You remove one hand from the imp's nipples to pay attention to your aching ${Appearance.cockNoun(
                        CockTypesEnum.HUMAN
                    )}.  As you begin jerking yourself off, more and more pre puddles on the imp's abs.  Your pre begins to pool in and overflow from the imp's tight belly button.`
                );
            } else if (this.player.cocks[0].cockLength <= 16) {
                this.outx(
                    `\n\nThe intense stimulation causes your ${this.cockDescript(
                        0
                    )} to begin leaking pre across the imp's chest.  You remove one hand from the imp's nipples to pay attention to your aching ${this.cockDescript(
                        0
                    )}.  As you begin jerking yourself off, more and more pre drips across the imp's aching nipples, your pre a warm relief for the tender abused teats.  The warmth of your juice across his chest makes the little demon moan and buck harder into your ${this.vaginaDescript(
                        0
                    )}.`
                );
            } else {
                this.outx(
                    `\n\nAs your ${this.vaginaDescript(
                        0
                    )} is pounded relentlessly, your rock hard ${this.cockDescript(
                        0
                    )} slaps the imp in the face, each time leaving another trail of pre in its wake.  The imp's arousal only intensifies from this, and he's soon lapping and suckling at your ${this.cockDescript(
                        0
                    )}, expertly trying to get you off.`
                );
                this.outx(
                    `\n\nIt's not long before the imp's face is soaked in your pre, and thanks to the imp's oral ministrations your ${this.cockDescript(
                        0
                    )} is now leaking pre continually. It's only a matter of time before you blow now.`
                );
            }
        } else if (this.player.cockTotal() > 1) {
            this.outx(
                `\n\nAs you continue your cruel torture of the imp's now bruised nipples, he reaches up both of his hands and takes hold of your ${this.multiCockDescriptLight()}.  The imp feverishly masturbates your ${this.cockDescript(
                    0
                )} and ${this.cockDescript(1)} as he thrusts into your ${this.vaginaDescript(
                    0
                )}.  The intense stretching of your ${this.vaginaDescript(
                    0
                )} by the ${this.monster.cockDescriptShort(
                    0
                )} sends waves of pleasure coursing through you, straight into your ${this.multiCockDescriptLight()}, which are now leaking precum profusely onto the imp's muscular body.`
            );
        }
        this.outx(
            `\n\nYou give one final rough tug on the imp's nipples, and that's all he can handle.  His cock spasms inside your ${this.vaginaDescript(
                0
            )} and erupts, sending wave after wave of hot, demon cum into your womb. His tainted testes spasm in their taut sack, continuing to pour their contents into you, until your belly is swollen and full of the hot seed.  You gasp in pleasure, unable to fight the pleasure of being filled so thoroughly.  Your ${this.vaginaDescript(
                0
            )} spasms, and you clench around the ${this.monster.cockDescriptShort(
                0
            )} inside of you, as your girl juices begin to flow out of you with your earth shattering orgasm.`
        );

        if (this.player.cockTotal() == 1) {
            this.outx(
                `\n\nWith your orgasm, your ${this.cockDescript(
                    0
                )} erupts, sending waves of boy goo across the imp's already drenched body.  The imp mewls as your seed spills across his masculine body, marking him as the bitch he is.  He leans forward and takes your cock into his mouth, suckling what's left of your orgasm out of you.  The imp drinks down all the cum he can. His mouth feels so hot, you don't really want it to end, but soon the orgasm settles down and you come back to reality from your lust induced euphoria.`
            );

            this.outx(
                "\n\nThe imp gives you a lewd smirk and licks his lips of your boy cum.  You chuckle and give the imp a light smack on his cum soaked chest."
            );
        } else if (this.player.cockTotal() > 1) {
            this.outx(
                `\n\nAs you ride out your orgasm the crafty imp pulls your ${this.cockDescript(
                    0
                )} and ${this.cockDescript(
                    1
                )} towards his mouth. Locking his lips around the tips of your two cocks, he suckles down every last drop of your jizz they offer.  You begin to mewl and whine in desperation as your orgasm seems to last an eternity.  The imp's skilled tongue and cock manage to work all of your favorite and most sensitive spots, sending you into complete euphoria.  Once your orgasm begins to settle the imp pulls back allowing the last few strings of semen to splatter across his face.`
            );
        }
        this.outx(
            `\n\nAfter a few moments of recovery, you slowly lift yourself off the imp.  Cum rushes out of your ${this.vaginaDescript()} and you clamp your muscles down as best as you can to keep the warm substance inside of you.  You give your swollen, cum-filled belly a motherly rub, before gathering your [armor].`
        );
        this.player.orgasm();
        this.dynStats("cor", 1);
        this.player.slimeFeed();
        this.cleanupAfterCombat();
    }

    // FEEDER BREASTFEED RAPE
    public feederBreastfeedRape(): void {
        this.clearOutput();
        this.outx(this.images.showImage("implord-win-female-breastfeed"), false);
        this.outx(
            "Standing over the fallen creature you lean forward and grab him by the horns, forcing his face against your [chest].  He protests wildly for a few moments, until you tire of this game.  Pushing him back to the ground, you step on his chest, keeping him pinned.  You start massaging your [nipple] and quickly feel your corrupt milk building up.  Timing things just right, you pinch your [nipple] one last time, causing a small eruption of milk to shoot out, just as you give the imp a swift kick to the gut."
        );

        this.outx(
            "\n\nThe kick knocks the wind out of the little demon, causing him to gasp.  His mouth opens just long enough and wide enough for the corrupt milk to go straight down his throat.  The reaction is almost instant; his eyes go wide with horror and disgust, but quickly change to awe and desire.  The poor thing tries to get up from under you but can't escape."
        );

        if (
            this.player.tallness > 48 &&
            this.player.tallness < 60 &&
            this.player.lowerBody != LOWER_BODY_TYPE_CENTAUR
        ) {
            this.outx(
                `\n\nYou allow the creature to stand, and lay back on the ground, patting your [chest] gently.  The aroused greater imp takes the hint, and crawls on top of you.  He quickly takes a [nipple] into his hungry waiting mouth.  He suckles gently, expertly milking you of your corrupt milk.  He's so good at it, you suspect he's done this several times before.  After a few minutes, he moves over to your next breast.  As he does you can feel his still rock hard, ${this.monster.cockDescriptShort(
                    0
                )} poking at your nether regions.`
            );

            this.outx(
                `\n\nYou grin, getting a wicked idea likely due to the pleasurable haze breastfeeding has given you.  You wrap your lower body around the imp's toned hips.  He looks up questioningly, unsure of your intentions.  You simply smirk and nod at him. The little demon's eyes lit up like Christmas, and he immediately thrusts his ${this.monster.cockDescriptShort(
                    0
                )} into your [asshole] with no hesitation.  The sudden stretching would've been painful; luckily the breastfeeding euphoria numbed much of the pain.`
            );
            this.player.buttChange(this.monster.cockArea(0), true, true, false);

            this.outx(
                "\n\nThe imp wildly thrusts in and out of you, while simultaneously suckling your [nipple].  He uses both his hands to simultaneously massage your [chest], as well as keep himself steady.  He's making the massage a little rougher than you'd have liked, but you really can't complain about all the stimulation.  It's truly like nothing you've experienced before."
            );

            // if(player has a penis)
            if (this.player.hasCock()) {
                this.outx(
                    `  [EachCock] twitches violently from the stimulation of your [asshole].  Pre-cum begins to dribble out of your ${this.cockDescript(
                        0
                    )}.  You can't help but pant desperately as the warm pleasurable sensation of arousal fills your whole being.`
                );
            }
            if (this.player.hasVagina()) {
                this.outx(
                    `  The intense stimulation of your [chest] is causing your [vagina] to become wet with girl juice... so much so that your femcum has started to seep down your taint towards your ass.  It's probably a good thing, as it's now become a lubricant for the greater imp's ${this.monster.cockDescriptShort(
                        0
                    )}.`
                );
            }

            this.outx(
                "\n\nAs the little demon suckles your second breast dry, you notice he's picked up the pace significantly.  You know what that means, and gently pull his head towards your [chest].  Cradling and petting his head, you clench your [asshole] encouragingly.  It only takes a few more thrusts for the imp to cum.  He floods your insides with his hot boy cream, and moans into your [chest]."
            );

            this.outx(
                "\n\nAfter riding out his orgasm, the imp flops backwards onto the ground, his cock now semi-hard and coated in his juices.  He gives his slightly bloated belly a gentle, content rub.  You chuckle at him as he falls asleep contentedly."
            );

            this.outx(
                "\n\nYou pick yourself up, gather up your equipment and put your [armorName] back on."
            );
            this.dynStats("lus", 50, "cor", 1);
        } else {
            this.outx(
                "\n\nYou lean down, and allow the imp to stand back up.  He immediately throws himself against your breast, and begins to suckle on the closest [nipple].  You give a gentle moan and bask in the sensation of nursing the imp's insatiable hunger.  You notice the imp's member slowly shifting to a semi-hard state, and chuckle, gently patting his bald head encouragingly."
            );

            this.outx(
                "\n\nAs the milk-flow from your first breast slows, the imp moves to the second, continuing to suckle gently.  You feel two clawed hands reach up and begin massaging your chest, trying to stimulate more milk flow.  You decide to help, and begin massaging yourself as well.  The added stimulation seems to work, and the imp can hardly keep up with the flow, as some of the corrupt milk begins dribbling from the corner of his mouth."
            );

            this.outx(
                "\n\nYou notice the imp's once muscular belly has developed into a small round bulge, as if a layer of baby fat had formed over those toned muscles."
            );

            if (this.player.bRows() == 1)
                this.outx(
                    "\n\nAs your second breast's milk flow begins to slow, the imp curls up against you contently.  You cradle him for a moment, before laying the creature down, where he burps and falls asleep.  You chuckle at how cute these creatures are when they're passive."
                );
            else {
                this.outx(
                    `\n\nYou chuckle at the still very hungry imp, and begin massaging your second row of ${this.breastDescript(
                        1
                    )}, occasionally pinching your ${this.nippleDescript(
                        1
                    )}s, drawing a few beads of milk from them.  The imp makes short work of your first row of breasts and has moved towards your second.`
                );
                this.outx(
                    "\n\n\"<i>So eager to please, aren't you?</i>\" you say teasingly, though not expecting an answer from the imp's nipple filled mouth.  As you suspected, the imp is far too busy feeding to answer. You debate punishing him for his rudeness.  However, the pleasure of nursing is far too enjoyable to interrupt unnecessarily."
                );
                this.outx(
                    "\n\nThe imp's belly has swollen much larger; his chest is also developing a thin layer of fat.  You wonder how much more the little beast will feed, as he moves to your fourth breast."
                );
                this.outx(
                    "\n\nYou moan softly as the imp continues his work, although you do notice that he's starting to have trouble keeping up with your flow, as a fair amount of your milk has ended up on your chest and the ground, rather than the imp's belly.  Giving him a small swat on his bald head, you point to the milk on the ground, which causes him to whimper in apology."
                );
                this.outx(
                    `\n\nNodding your acceptance, he continues his work much more carefully.  He's taking his time again instead of just sucking wildly.  You reach down curiously, and tug on the imp's ${this.monster.cockDescriptShort(
                        0
                    )} but find that it's shrinking.  As you hold it, it shrinks more and more. You wonder what will happen to him if he continues to nurse.`
                );
                // if(player has only 2 rows of breasts)
                if (this.player.bRows() == 2) {
                    this.outx(
                        `\n\nUnfortunately it looks like you won't find out, as the last of your ${this.breastDescript(
                            1
                        )} runs dry.  The imp wobbles and falls over, clearly not used to the added weight.  Now that you get a good look at him, you see some very serious changes.  He's got a very full belly, his chest has a pair of soft male breasts, and his cock and balls have shrunk significantly.  It's a damn shame you ran out of milk for the creature.  It would've interesting to see what happened if he'd continued.`
                    );
                    this.outx(
                        "\n\nThe imp on the other hand looks a little sick to the stomach now, and flops backwards, passing out completely.  You look at him for a moment and decide he'll be fine."
                    );
                } else {
                    this.outx(
                        `\n\nYou begin massaging your lowest row of breasts, fascinated by the idea of what will become of the imp when he milks you of all your corrupt milk.  You feel the fluid flow begin, and the imp moves on to your ${this.breastDescript(
                            2
                        )}.  He nurses passionately at your ${this.nippleDescript(
                            2
                        )}, slurping down every drop of your milk.`
                    );
                    this.outx(
                        "\n\nBefore you can even fully begin to enjoy the rest of the milking, it's over.  The imp takes one last, long gulp and falls backwards onto the ground.  You watch, fascinated as the imp groans loudly in discomfort. His belly gurgles and visibly shifts as if his belly was full of large worms wiggling around.  \"<i>Weird.</i>\" The imp begins to desperately claw at his testicles as they shrink so far that they vanish back inside of him.  The apparent itching sensation he's experiencing doesn't seem to stop however, as he begins clawing out small patches of fur, until he reveals a new, moist virgin cunt."
                    );
                    this.outx(
                        "\n\nThe imp quickly penetrates his new orifice with two clawed fingers, gasping in the foreign ecstasy.  As he plays with his new tool, his former cock vanishes inside of his body, just as his testicles did.  The imp is crying out in the new found pleasure, and it seems like he's enjoying his new form."
                    );

                    this.outx(
                        "\n\nThe gurgling of his stomach seems to have ceased, and his former muscular torso and abs are revealed again.  However his nipples are now drooling an excessive amount of milk.  The imp now appears to be a cunt-boy of some sort.  You feel yourself grow flush with arousal as the imp experiences his final changes.  Mooing loudly, the greater imp's new clit quickly begins to expand, growing larger and fuller the more he fingers his virgin fuck hole."
                    );

                    this.outx(
                        "\n\nIt takes several minutes, but the imp reaches his orgasm. His clit is as large as an average cock (and appears to have stopped growing).  He's taken to using one hand to stroke off his clit like a cock, while his other hand fingers his new delicate pussy.  He moos loudly as his new fuck hole leaks its girl goo all over the ground and his hand."
                    );

                    this.outx(
                        "\n\nThe imp weakly smiles at you one last time as he passes out, clearly very happy with how the events unfolded.  You're very pleased with the event as well.  Picking yourself up, you gather your equipment and put your [armor] back on."
                    );
                }
            }
            this.dynStats("cor", 1);
        }
        // You've now been milked, reset the timer for that
        this.player.addStatusValue(StatusAffects.Feeder, 1, 1);
        this.player.changeStatusValue(StatusAffects.Feeder, 2, 0);
        this.player.boostLactation(0.1);
        this.cleanupAfterCombat();
    }

    // MALE LOSE
    private loseToImpLord(): void {
        this.clearOutput();
        this.outx(this.images.showImage("implord-loss-male"), false);
        this.outx(
            `Unable to control your lust you fall to the ground, remove your ${this.player.armorName} and begin masturbating furiously.  The powerful imp saunters over to you smirking evilly as he towers over your fallen form. You look up at him nervously.  He grabs your chin with one of his clawed hands, while the other digs through his satchel.  He pulls out a vial filled with glowing green liquid, and pops the cork stopper off with his thumb. Before you can react, the demon forces open your mouth and pours the liquid in.  Instinct reacts faster than logic and you swallow the substance as it's poured down your throat.`
        );
        this.outx(
            "\n\nYou cough and splutter, grabbing your gut, as a hot pain fills your stomach.  The imp laughs as you roll around in agony for several long moments, before the burning turns to an arousing warmth that spreads to your [hips] and [asshole].  Groaning, you feel your cheeks flush with arousal, and your eyes glaze over once more with insatiable lust."
        );
        if (this.player.cockTotal() == 1) {
            this.outx(
                `\n\nYou feel your ${this.cockDescript(
                    0
                )} grow harder than usual and throb.  You go to stroke yourself but it's far too sensitive. Any stroking you can do is far too little stimulation and anything else is too painful to withstand.  You whimper and curse in desperation.  Your lust clouded mind can only think of one solution; you bend over and reveal your [asshole] to the grinning imp.  The humiliation keeps you from looking back to see the imp's reaction, but you can tell by his chuckle that this is exactly what he wanted.`
            );
        } else if (this.player.cockTotal() > 1) {
            this.outx(
                `\n\nYou feel your ${this.multiCockDescriptLight()} grow harder than usual and throb.  You go to stroke yourself but they are far too sensitive. Any stroking you can do is far too little stimulation and anything else is to painful too withstand.  You whimper and curse in desperation.  Your lust clouded mind can only think of one solution; you bend over and reveal your ${this.assholeDescript()} to the grinning imp.  The humiliation keeps you from looking back to see the imp's reaction, but you can tell by his chuckle that this is exactly what he wanted.`
            );
        }
        this.outx(
            `\n\nThe imp gets behind you; his corrupt presence makes the air feel heavy and hard to breathe.  You notice his satchel and loincloth get carelessly tossed to the ground.  Chancing a glance back, you look in aroused horror at the ${this.monster.cockDescriptShort(
                0
            )} between the imp's legs as well as his matching cum-filled balls.  Two clawed, red hands spread your [butt] revealing your [asshole].  Mercifully, the demon decides you'll need some form of lubrication and relaxation before he continues.  He leans forward and presses his tongue between your [butt] and begins lapping at your [asshole] viciously.  You can't help but mewl from the merciless attack on your tender rectum.`
        );

        // if(player has a vagina)
        if (this.player.hasVagina()) {
            this.outx(
                "\n\nThe imp takes a moment to pleasure your [vagina], forcing his tongue and two clawed fingers inside.  The claws scratch and tease painfully at your inner walls.  You mewl and cry out from the stimulation, as the imp's tongue moves from your [vagina] to your [clit].  You cry out in desperation as the powerful demon attacks your [clit] with his tongue."
            );
        } else if (this.player.balls > 0 && this.player.hasCock()) {
            this.outx(
                `\n\nThe imp moves away from your [asshole], and begins to focus on your [balls].  He pulls one into his hand, and squeezes it cruelly while he licks and bites at your [sack].  He gives a painfully tight squeeze to the orb in his hand, which makes you cry out in painful ecstasy.  A single bead of precum gets forced out of your ${this.cockDescript(
                    0
                )}.`
            );
        }

        this.outx(
            `\n\nThe imp finally backs off from his brutal attack on your sensitive backside.  Whatever was in that vial has made your body incredibly sensitive... each caress feels like an orgasm, and each scratch feels like a stab wound.  You hope that's the only effect of the green liquid, but don't get much chance to ponder it as you feel the muscular demon press the head of his ${this.monster.cockDescriptShort(
                0
            )} against your [asshole].`
        );

        this.outx(
            `\n\nYou whimper in fear as you look back towards the devilish imp behind you.  He simply grins at you in response as he thrusts forward.  You yell out in pain as the ${this.monster.cockDescriptShort(
                0
            )} forces its way into your [asshole].  You try to struggle away, but the imp gives you a very rough slap on the ass.  He then roughly grabs your [hips], making sure to dig his claws in just enough to deter you from struggling.`
        );
        this.player.buttChange(this.monster.cockArea(0), true, true, false);

        this.outx(
            "\n\nThough the entry was rough, the imp's thrusts are incredibly gentle.  He carefully thrusts in and out of your [asshole], and even begins licking and delicately kissing your back.  The horrible stretching of your [asshole] is still incredibly painful, but made tolerable by the contrasting caresses.  You quickly lose track of time as the pain and pleasure spark across your overly sensitive body.  The imp continues to be oddly affectionate now that you've fully submitted to his will.  He even releases his painful, clawed grip on your [hips]."
        );

        this.outx(
            `\n\nAfter longer than you'd have hoped for, the painful stretching sensation begins to disappear; and the pleasurable sensation of the imp's ${this.monster.cockDescriptShort(
                0
            )} thrusting in and out of your [asshole] becomes entirely pleasurable.  The way his ${this.monster.cockDescriptShort(
                0
            )} fills every inch of your ass, and rubs all your most sensitive spots.  The weird sensation his warm, demonic pre-cum coats your insides.  You find your lust-blinded mind has become lost in the sensations - so lost that you don't even notice the imp increasing his pace.`
        );

        this.outx(
            `\n\nWithin moments the beast is wildly thrusting in and out of your [asshole].  Pre-cum is pumping out of his ${this.monster.cockDescriptShort(
                0
            )} like a faucet. The hot demon pre begins to spill back out of your abused [asshole], coating your [hips], and dripping to the ground beneath.  The imp gives you a few more rough thrusts before cumming hard into your [asshole].  The little demon's ${this.monster.cockDescriptShort(
                0
            )} spasms as he continues to roughly thrust and pump you full of his burning hot demon seed.`
        );

        if (this.player.hasCock()) {
            this.outx(
                "\n\nThe hot seed filling your belly wakes you from your lust induced daydream and you howl in discomfort.  Your belly begins to swell with the thick seed, coating every inch of your insides with the burning, arousing sensation.  This pushes you over the edge and you orgasm.  "
            );
            if (this.player.balls > 0)
                this.outx(
                    "Your [balls] clench up against your body, desperate to finally expel their contents.  "
                );
            this.outx(
                "Your seed spills across the ground, mixing with the copious amount of demon pre that had sloshed to the ground earlier.  You howl loudly in pleasure, as you're finally given release."
            );
        }

        this.outx(
            `\n\nThe imp pulls out, but is quick to stuff a soft unknown object into your [asshole] to plug all of his delicious, corrupt seed inside of you.  You stay in position, though you're wobbling slightly from the intense experience.  The short, muscular demon looks down at you, and you look up at him concerned.  He chuckles, "<i>Don't worry my bitch, that thing will dissolve on its own in a day or so,</i>" the demon assures you.  He grips his ${this.monster.cockDescriptShort(
                0
            )}, which is soaked with his own juices, and holds it out towards you.`
        );

        this.outx(
            "\n\nYou take the hint and nervously lick the cock clean.  You can taste the corruption, and it sends sparks through your mind.  You almost wish it didn't have to end, but soon the imp is satisfied with your cleaning job, gathers his things and turns to leave you to recover from your ordeal.  Within minutes of him leaving you pass out, collapsing to the ground.  You lay there, in a puddle of sexual fluids for a long time before you wake up.  After gathering your equipment, you begin to make your way back to camp.  Hopefully that green stuff's effects will have worn off once you get back."
        );
        this.player.orgasm();
        this.dynStats("sen", 2, "cor", 1);
        this.player.slimeFeed();
        this.cleanupAfterCombat();
    }

    // FEMALE LOSE
    private getRapedAsAGirl(): void {
        this.clearOutput();
        this.outx(this.images.showImage("implord-loss-female"), false);
        this.outx(
            "You collapse from exhaustion, your [vagina] beginning to soak your [armor].  You groan loudly, desperately trying to continue the fight, or flee, but the exhaustion is too much.  You close your eyes for a moment, but hearing a loud thud near your face causes you to painfully open your eyes.  You see a large bestial hoof near your face, while the other hoof is used to roll you onto your back."
        );

        this.outx(
            `\n\nYou try to move, but before you can even begin to squirm a hoof presses hard between your ${this.breastDescript(
                0
            )}.  You gasp as the air is temporarily knocked out of your lungs.  The demon chuckles at your last feeble attempt to free yourself.  He holds his ${this.monster.cockDescriptShort(
                0
            )} stroking it lewdly, a cruel smirk stretching across his face.  You watch as several beads of pre begin to drip from his tip onto your stomach.`
        );

        this.outx(
            "\n\nThe imp steps between your legs, gently kicking them apart, until the wet spot on your [armor] is painfully obvious.  He chuckles, and leans down, ripping your [armor] off.  He casually tosses it to the side, and leans towards your [vagina]."
        );

        // if(Player has balls)
        if (this.player.balls > 0) {
            this.outx(
                "\n\nThe imp pulls your [balls] up, revealing your [vagina].  Unceremoniously, he presses his lips towards your crotch forcing his tongue into your [vagina], making you gasp in pleasure.  He gives your [balls] a rough squeeze, making your [vagina] even wetter than it was.  The imp moans in delight, licking up all your girl juices."
            );
        } else {
            this.outx(
                "\n\nThe imp roughly forces his tongue into your [vagina] making you gasp in pleasure.  Your [vagina] clenches around the demonic tongue, squirting some of your girl juices around the wet flesh as it delves deeper into you.  You writhe and squirm trying to fight against the forced pleasure."
            );
        }

        this.outx(
            "\n\nYou mewl pitifully as the imp removes his tongue. He smirks at your [vagina] and kneels"
        );
        if (this.player.isBiped()) this.outx(" between your legs");
        else this.outx(" before you");
        this.outx(
            `, draping his ${this.monster.cockDescriptShort(
                0
            )} across your wet crotch.  You groan, and unintentionally thrust against the magnificent tool between your legs.  The imp chuckles evilly as you coat his ${this.monster.cockDescriptShort(
                0
            )} in your girl juice, but he doesn't wait long before he slowly presses his head down against your [vagina].  His head slowly spreads your lips; the pleasure is unmistakable, and forces a loud moan from your lips.`
        );

        this.outx(
            `\n\nWith a soft pop, the ${this.monster.cockDescriptShort(
                0
            )} pops into your [vagina], and both of you moan in unison, the demon beginning to thrust wildly into you.  His hips pumps back and forth into you.  The loud slapping sound of flesh on flesh echoes around you, drowning out the grunts of the vicious demon above you.`
        );
        this.player.cuntChange(this.monster.cockArea(0), true, true, false);

        this.outx(
            `\n\nYou mewl softly as you're viciously fucked by the beast above you.  It doesn't take long before your [vagina] clenches tightly around the ${this.monster.cockDescriptShort(
                0
            )} as you orgasm.  You scream in pleasure as your inner walls begin to milk the imp's ${this.monster.cockDescriptShort(
                0
            )} of its seed.  The imp quickly succumbs and cums, his swollen balls tightening up against his crotch.  The hot jizz continues to pump into you for what feels like several painfully long minutes, until your belly bulges slightly, and your ${this.vaginaDescript(
                0
            )} begins to leak the white demonic fluid.`
        );

        this.outx(
            "\n\nThe imp pulls out, and gives himself a few final strokes, sending one last shot of cum across your face.  You blush in embarrassment and wipe the sticky seed from your nose and lips.  Standing up, the imp presses a hoof down hard on your distended stomach, making you gasp loudly as the demon's thick cum is forced back out of your [vagina], pooling between your legs. The imp gives a satisfied smirk and flies off, leaving you to clean up."
        );

        this.outx(
            "\n\nYou stand up weakly after several moments, and gather your [armor].  It takes you a while to get dressed in your defeated state, but you manage to crawl back towards your camp.  Your [vagina] is still leaking some of the demonic cum, but you try not to worry about it as you arrive, collapsing almost immediately."
        );
        this.player.orgasm();
        this.dynStats("cor", 1);
        this.player.slimeFeed();
        this.cleanupAfterCombat();
    }

    private putBeeEggsInAnImpYouMonster(): void {
        this.clearOutput();
        // IMP EGGS
        // (functions for bipedal bee morphs.  At time of writing, unsure as to whether bee abdomen worked for centaur/naga/goo forms)
        this.outx(this.images.showImage("imp-egg"), false);
        this.outx(
            "You glance down at the masturbating imp, feeling a twitch in your swollen, insectile abdomen.  As the red-skinned homunculus writhes on the ground, beating his meat, you smile, feeling a globule of sweet nectar oozing out of your ovipositor."
        );

        this.outx(
            "\n\nHe’s too busy humping the air and stroking himself to notice you hooking the tip of one of your [feet] under him.  You kick up one of your [legs], flipping the fapping imp over.  He gasps as he lands face-down on the ground, startled enough to stop jerking his tool."
        );
        this.outx(
            "\n\nYou grin, straddling his surprisingly perky ass, resting your [hips] on his small, round cheeks.  With your arms pinning down his shoulders, he can’t stroke himself, and he whimpers at the restraint."
        );

        this.outx('\n\n"<i>Wait - what’s going on?</i>" he gasps.');

        this.outx(
            "\n\nYou deign not to answer him, lost in the unique sensation of your abdomen curling behind you.  You toss your head back, luxuriating in the pleasure of your black ovipositor emerging against smooth, glossy skin of the imp’s ass."
        );

        this.outx(
            '\n\n"<i>No, nooooooo...</i>" whimpers the imp as you bite your lip, pushing the tip of your organ into his surprisingly pliant hole.'
        );

        this.outx(
            "\n\nYou and the imp shudder in tandem as your sweet honey smears between his cheeks, oozing down his crack as you squeeze your throbbing ovipositor further and further into him.  Buried deep in his bowels, you feel the first of your eggs push through your rubbery organ, stretching out your tube along with his asshole."
        );

        this.outx(
            "\n\nAs you lay your first egg inside the imp, he gurgles, face-down against the ground, and you feel him tighten around your ovipositor.  The imp wriggles beneath your body and by the slowly-spreading pool of steaming cum; you guess that he just climaxed."
        );

        this.outx(
            "\n\nThe imp pants, trying to catch his breath as you twitch your abdomen, adjusting your ovipositor inside him.  Before he can recover, you push another egg down your tube, implanting it deep in the imp alongside the first egg."
        );

        this.outx(
            '\n\n"<i>Suh-stop...</i>" groans the imp even as you push a third egg into his tiny body.  But you’re beyond stopping.  Egg after egg, you fill his twitching body.  The pool of cum grows, and it oozes around your '
        );
        if (this.player.isGoo()) this.outx("rippled goo edges");
        else if (this.player.isNaga()) this.outx("trembling coils");
        else this.outx("straddling knees");
        this.outx(" as you turn the imp into your own, private incubator.");

        this.outx(
            "\n\nAfter a handful of eggs, you grunt, realizing that you’ve run out of room inside the imp.  Tilting your head to one side, you consider that the imp is face-down, and that his stomach might need more room to stretch.  You rise halfway up and flip him over beneath you, careful to leave your ovipositor still buried inside him."
        );

        this.outx(
            "\n\nThe imp’s eyes are almost completely rolled back in his head, his flat chest smothered with his own spunk.  His breathing is ragged, and his hard, massive cock is slathered with thick, white cum.  His belly already bulges slightly with your eggs and his small hands move to clutch at his stomach, giving him the look of a debased, pregnant mother."
        );

        this.outx(
            "\n\nThat realization is enough to stimulate your ovipositor again.  With a groan, you plant your hands on the ground to either side of his head, on your knees as your ovipositor pumps another egg into the imp’s bowels.  The imp shudders as his belly swells, filling with your brood."
        );

        this.outx('\n\n"<i>More... more!</i>" moans the imp beneath you.  You oblige, and ');
        if (this.player.biggestTitSize() >= 1) {
            this.outx("his tiny claws grab your ");
            if (this.player.bRows() > 1) this.outx("first row of ");
            this.outx(`${this.breastDescript(0)}, squeezing your tits as you fuck him full.`);
            if (this.player.lactationQ() >= 500)
                this.outx(
                    "  Rivulets of your milk run down his forearms as he inexpertly milks you."
                );
        }
        // [If cock:
        else if (this.player.hasCock())
            this.outx(
                "the rise of his swollen belly soon presses against [oneCock] and the rhythm of your thrusts strokes his shiny red stomach against your sensitive organ."
            );
        else if (this.player.hasVagina())
            this.outx(
                "the imp’s tiny, clawed feet scrabble against you as he flails in pleasure.  By mistake, one slips between the lips of your pussy, small toes wriggling against your inner walls, and you instinctively push down against the small limb, fucking yourself with his foot."
            );
        else
            this.outx(
                "you feel a firm pressure at your [asshole] as the tip of the imp’s lashing tail prods frantically against you, manically shoving in and out of your [asshole]."
            );

        this.outx(
            "\n\nYou groan, climaxing against the imp, just as he lets out another gout of hot seed from his cum-smeared dick.  He spatters your front, his spunk mingling with your fluids, shuddering as he takes the last of your eggs inside him, his belly swollen to the size of a beach ball."
        );

        this.outx(
            "\n\nYou pant heavily, and with a messy squelching, you pull yourself out of the imp, pushing yourself up from your crouched position.  A gush of honey pours from the imp’s ass, cutting off quickly as an egg rolls into place from the inside, stopping up your imp-cubator."
        );

        this.outx(
            "\n\nYou hear a strange noise from the imp, one that sounds strangely like a giggle.  You glance down at him, instinctively evaluating him as a bearer of your eggs.  The imp is still panting, looking up at you from under his messy, black hair.  With a flushed, submissive expression and swollen, pregnant belly, the imp seems almost... cute?  He cradles his massive, egg-filled belly, caressing it, then looks back to you, blushing."
        );

        this.outx(
            "\n\nYou blink then stand up.  You shake your head as you walk away, chalking the odd thoughts up to your egg-laying instincts.  Some of these mutations have some weird effects, after all..."
        );
        this.player.orgasm();
        this.dynStats("sen", -1);
        this.player.dumpEggs();
        this.cleanupAfterCombat();
    }
}
