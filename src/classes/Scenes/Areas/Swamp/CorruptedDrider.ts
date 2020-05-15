import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_DRY,
    BUTT_RATING_LARGE,
    HIP_RATING_CURVY,
    LOWER_BODY_TYPE_DRIDER_LOWER_BODY,
    SKIN_TYPE_PLAIN,
    VAGINA_LOOSENESS_GAPING,
    VAGINA_WETNESS_DROOLING,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";
import { AbstractSpiderMorph } from "./AbstractSpiderMorph";

/**
 * ...
 *
 * @author ...
 */
export class CorruptedDrider extends AbstractSpiderMorph {
    // Drider kiss!
    public driderKiss(): void {
        let temp: number;
        this.outx(
            "The corrupted drider closes in on your web-bound form, cooing happily at you while you struggle with the sticky fibers.\n\n",
            false
        );
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && CorruptedDrider.rand(3) < 2) {
            this.outx("She's too blind to get anywhere near you.\n", false);
        }
        // Dodge
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                'Somehow, you manage to drag yourself out of the way.  She sighs and licks her lips.  "<i>',
                false
            );
            temp = CorruptedDrider.rand(4);
            if (temp == 0)
                this.outx('I just wanted to give my delicious morsel a kiss...</i>"\n', false);
            else if (temp == 1) this.outx("Why won't you let me kiss you?</i>\"\n", false);
            else if (temp == 2)
                this.outx('Mmm, do you have to squirm so much, prey?</i>"\n', false);
            else
                this.outx(
                    'Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>"\n',
                    false
                );
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && CorruptedDrider.rand(100) < 10) {
            this.outx(
                'Somehow, you manage to evade her lusty attack.  She sighs and licks her lips.  "<i>',
                false
            );
            temp = CorruptedDrider.rand(4);
            if (temp == 0)
                this.outx('I just wanted to give my delicious morsel a kiss...</i>"\n', false);
            else if (temp == 1) this.outx("Why won't you let me kiss you?</i>\"\n", false);
            else if (temp == 2)
                this.outx('Mmm, do you have to squirm so much, prey?</i>"\n', false);
            else
                this.outx(
                    'Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>"\n',
                    false
                );
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            CorruptedDrider.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                'You manage to misdirect her lusty attack, avoiding it at the last second.  She sighs and licks her lips.  "<i>',
                false
            );
            temp = CorruptedDrider.rand(4);
            if (temp == 0)
                this.outx('I just wanted to give my delicious morsel a kiss...</i>"\n', false);
            else if (temp == 1) this.outx("Why won't you let me kiss you?</i>\"\n", false);
            else if (temp == 2)
                this.outx('Mmm, do you have to squirm so much, prey?</i>"\n', false);
            else
                this.outx(
                    'Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>"\n',
                    false
                );
        }
        // Determine if cat'ed
        else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && CorruptedDrider.rand(100) < 6) {
            this.outx(
                'You manage to twist your cat-like body out of the way at the last second, avoiding it at the last second.  She sighs and licks her lips.  "<i>',
                false
            );
            temp = CorruptedDrider.rand(4);
            if (temp == 0)
                this.outx('I just wanted to give my delicious morsel a kiss...</i>"\n', false);
            else if (temp == 1) this.outx("Why won't you let me kiss you?</i>\"\n", false);
            else if (temp == 2)
                this.outx('Mmm, do you have to squirm so much, prey?</i>"\n', false);
            else
                this.outx(
                    'Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>"\n',
                    false
                );
        } else if (this.player.findStatusAffect(StatusAffects.DriderKiss) < 0) {
            // (HIT? + 10 lust)
            this.game.dynStats("lus", 10);
            this.outx("Before you can move, she's right on top of you, leaning ");
            if (this.player.tallness < 72) this.outx("down");
            else this.outx("over");
            this.outx(
                " to plant a sloppy, wet kiss upon your lips.  Her glossy lip-venom oozes everywhere, dribbling down your collective chins and sliding into your mouth.  You shudder, trying to resist, but your tongue betrays you.  It slides between her moist, puffy entrance, lapping at her venom and making love to her tongue.",
                false
            );
            if (this.player.lust <= 99)
                this.outx(
                    "  Somehow, you work up the willpower to back away, but your body slowly begins to burn hotter and harder, afflicted with a slowly-building lust.",
                    false
                );
            this.player.createStatusAffect(StatusAffects.DriderKiss, 0, 0, 0, 0);
        }
        // Get hit 2nd time)
        else {
            this.player.addStatusValue(StatusAffects.DriderKiss, 1, 1);
            if (this.player.statusAffectv1(StatusAffects.DriderKiss) == 1) {
                // (HIT? + 15 lust)
                this.game.dynStats("lus", 15);
                this.outx(
                    `Again, the drider ties your mouth up in her syrupy lip-lock, seeming to bind your mouth as effectively as her webs bind your body.  Her sweet venom bubbles and froths at the corners of the oral embrace, dripping over her many-breasted bosom and your ${this.player.chestDesc()}.`
                );
                if (this.player.hasCock())
                    this.outx(
                        `  ${this.SMultiCockDesc()} spews a rope of pre-cum into your ${
                            this.player.armorName
                        }, desperate to get out and fuck.`
                    );
                if (this.player.hasVagina())
                    this.outx(
                        `  Fem-cum dribbles down your ${this.player.legs()} while your ${this.player.clitDescript()} gets so hard you think it'll explode.`
                    );
                this.outx(
                    '  This time, the drider is the one to break the kiss.  She asks, "<i>Are you ready, my horny little morsel?</i>"\n',
                    false
                );
                if (this.player.lust <= 99)
                    this.outx("You shake your head 'no' and stand your ground!\n", false);
            }
            // (Get hit 3rd+ time)
            else {
                this.outx(
                    `This time you barely move.  Your body is too entranced by the idea of another venom-laced kiss to resist.  Glorious purple goo washes into your mouth as her lips meet yours, sealing tight but letting your tongue enter her mouth to swirl around and feel the venom drip from her fangs.  It's heavenly!  Your ${this.player.skin()} grows hot and tingly, and you ache to be touched so badly.  Your ${this.nippleDescript(
                        0
                    )}s feel hard enough to cut glass, and a growing part of you admits that you'd love to feel the drider's chitinous fingers pulling on them.`
                );
                // (HIT? + 20 lust)
                this.game.dynStats("lus", 20);
                if (this.player.hasCock() || this.player.hasVagina()) {
                    this.outx(
                        "  The moisture in your crotch only gets worse.  At this point, a ",
                        false
                    );
                    if (this.player.wetness() < 3 && this.player.cumQ() < 200) this.outx("small");
                    else if (this.player.wetness() < 5 && this.player.cumQ() < 500)
                        this.outx("large");
                    else this.outx("massive");
                    this.outx(
                        ` wet stain that reeks of your sheer sexual ache has formed in your ${this.player.armorName}.`
                    );
                    if (this.player.lust <= 99)
                        this.outx(
                            "  Amazingly, you resist her and pull back, panting for breath.",
                            false
                        );
                }
            }
        }
        this.combatRoundOver();
    }

    public driderMasturbate(): void {
        // -Masturbate - (Lowers lust by 50, raises PC lust)
        this.lust -= 30;
        this.game.dynStats("lus", 10 + this.player.lib / 20);
        this.outx(
            'The spider-woman skitters back and gives you a lusty, hungry expression.  She shudders and moans, "<i>Mmm, just watch what you\'re missing out on...</i>"\n\n',
            false
        );
        this.outx(
            "As soon as she finishes, her large clit puffs up, balloon-like.  A second later, it slides forward, revealing nine inches of glossy, girl-spunk-soaked shaft.  Nodules ring the corrupted penis' surface, while the tiny cum-slit perched atop the tip dribbles heavy flows of pre-cum.  She pumps at the fleshy organ while her other hand paws at her jiggling breasts, tugging on the hard ",
            false
        );
        if (this.nipplesPierced > 0) this.outx("pierced ");
        this.outx(
            "nipple-flesh.  Arching her back in a lurid pose, she cries out in high-pitched bliss, her cock pulsing in her hand and erupting out a stream of seed that lands in front of her.\n\n",
            false
        );

        this.outx(
            "The display utterly distracts you until it finishes, and as you adopt your combat pose once more, you find your own needs harder to ignore, while hers seem to be sated, for now.\n",
            false
        );
        this.combatRoundOver();
    }

    protected performCombatAction(): void {
        this.game.spriteSelect(77);
        if (this.lust > 70 && CorruptedDrider.rand(4) == 0) this.driderMasturbate();
        // 1/4 chance of silence if pc knows spells
        else if (
            this.game.hasSpells() &&
            this.player.findStatusAffect(StatusAffects.WebSilence) < 0 &&
            CorruptedDrider.rand(4) == 0
        ) {
            this.spiderSilence();
        }
        // 1/4 chance of disarm
        else if (
            this.player.findStatusAffect(StatusAffects.Disarmed) < 0 &&
            this.player.weaponName != "fists" &&
            CorruptedDrider.rand(4) == 0
        ) {
            this.spiderDisarm();
        }
        // Always web unless already webbed
        else if (
            this.player.spe >= 2 &&
            (this.player.findStatusAffect(StatusAffects.Web) < 0 || CorruptedDrider.rand(2) == 0)
        ) {
            this.spiderMorphWebAttack();
        }
        // Kiss!
        else this.driderKiss();
    }

    public defeated(hpVictory: boolean): void {
        this.game.swamp.corruptedDriderScene.defeatDriderIntro();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nThe drider licks her lips in anticipation...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.swamp.corruptedDriderScene.loseToDrider();
        }
    }

    public constructor() {
        super();

        const hairColor: string = CorruptedDrider.randomChoice("red", "orange", "green");
        const skinTone: string = CorruptedDrider.randomChoice(
            "yellow",
            "purple",
            "red",
            "turquoise"
        );

        const pierced: boolean = CorruptedDrider.rand(2) == 0;
        this.a = "the ";
        this.short = "corrupted drider";
        this.imageName = "corrupteddrider";
        this.long = `This particular spider-woman is a drider - a creature with a humanoid top half and the lower body of a giant arachnid.  From a quick glance, you can tell that this one has fallen deeply to corruption.  She is utterly nude, exposing her four well-rounded, D-cup breasts with their shiny black nipples.  ${
            pierced
                ? "Gold piercings and chains link the curvy tits together, crossing in front of her four mounds in an 'x' pattern.  "
                : ""
        }On her face and forehead, a quartet of lust-filled, ${skinTone} eyes gaze back at you.  Behind her, the monster-girl's ${hairColor} hair drapes down her back like a cloak.  The drider's lips seem to shine with a light all their own, and a steady trickle of purple, reflective fluid beads and drips from them.  At her waist, there's a juicy looking snatch with a large, highly visible clit.  From time to time it pulsates and grows, turning part-way into a demon-dick.  Her spider-half has eight spindly legs with black and ${hairColor} stripes - a menacing display if ever you've seen one.`;
        // this.plural = false;
        this.createCock(9, 2, CockTypesEnum.DEMON);
        this.createVagina(false, VAGINA_WETNESS_DROOLING, VAGINA_LOOSENESS_GAPING);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 70, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("DD"));
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 70, 0, 0, 0);
        this.tallness = 10 * 12;
        this.hipRating = HIP_RATING_CURVY + 2;
        this.buttRating = BUTT_RATING_LARGE + 1;
        this.lowerBody = LOWER_BODY_TYPE_DRIDER_LOWER_BODY;
        this.skinTone = skinTone;
        this.skinType = SKIN_TYPE_PLAIN;
        // this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_PLAIN];
        this.hairColor = hairColor;
        this.hairLength = 24;
        this.initStrTouSpeInte(100, 50, 70, 100);
        this.initLibSensCor(80, 50, 90);
        this.weaponName = "claws";
        this.weaponVerb = "claw";
        this.weaponAttack = 30;
        this.armorName = "carapace";
        this.armorDef = 55;
        this.armorPerk = "";
        this.armorValue = 70;
        if (pierced) {
            this.nipplesPierced = 1;
            this.bonusHP = 325;
            this.lust = 35;
            this.lustVuln = 0.25;
            this.temperment = CorruptedDrider.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 15;
            this.gems = CorruptedDrider.rand(10) + 30;
        } else {
            this.bonusHP = 250;
            this.lust = 30;
            this.lustVuln = 0.4;
            this.temperment = CorruptedDrider.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 14;
            this.gems = CorruptedDrider.rand(10) + 20;
        }
        this.drop = new WeightedDrop()
            .add(this.consumables.B_GOSSR, 5)
            .add(this.useables.T_SSILK, 1)
            .add(undefined, 4);
        this.checkMonster();
    }
}
