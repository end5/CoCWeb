import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_NORMAL,
    ANAL_WETNESS_NORMAL,
    BUTT_RATING_LARGE,
    HIP_RATING_AMPLE,
    VAGINA_LOOSENESS_GAPING,
    VAGINA_WETNESS_WET,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class FetishCultist extends Monster {
    private static NAUGHTY_NURSES_UNIFORM = "naughty nurse's uniform";
    private static TEACHERS_OUTFIT = "teacher's outfit";
    private static SWIMSUIT = "swimsuit";
    private static NOBLES_CLOTHING = "noble's clothing";
    private static PERVY_NUNS_CLOTHING = "pervy nun's clothing";

    public combatRoundUpdate(): void {
        super.combatRoundUpdate();
        let changed = false;
        // Fetish Cultist Update
        switch (FetishCultist.rand(5)) {
            case 0:
                if (this.armorName != FetishCultist.PERVY_NUNS_CLOTHING) {
                    // Religious outfit!
                    this.long =
                        "The woman across from you has her eyes closed, her hands joined, and seems to be chanting under her breath.  She is wearing a religious robe that closely hugs her curvacious shape. There is a specially-placed opening over her pussy lips.";
                    this.armorName = FetishCultist.PERVY_NUNS_CLOTHING;
                    changed = true;
                }
                break;
            case 1:
                if (this.armorName != FetishCultist.NOBLES_CLOTHING) {
                    // Noble outfit
                    this.armorName = FetishCultist.NOBLES_CLOTHING;
                    this.long =
                        "She's wearing a skimpy noble's dress, which lets you get a good look at her well-filled bra through an over-generous cleavage. Her skirt is so short that you clearly see her pussy lips.  She smiles at you in a rather cute way.  She looks like she's coming out of a painting, executed by a rather depraved and lust-filled artist.";
                    changed = true;
                }
                break;
            case 2:
                if (this.armorName != FetishCultist.SWIMSUIT) {
                    // Swim outfit
                    this.long =
                        "She's currently wearing a swimsuit that's apparently much too small for her, because it stretches across every curve and clearly outlines them for you to see.  Her sizable breasts look like they could burst through the fabric at any moment.  You can even see her erect nipples and her puffy lower lips.";
                    this.armorName = FetishCultist.SWIMSUIT;
                    changed = true;
                }
                break;
            case 3:
                if (this.armorName != FetishCultist.TEACHERS_OUTFIT) {
                    // Pervy Teacher
                    this.long =
                        "She's now wearing a teacher's outfit, complete with glasses, make-up, her black hair in a tight bun, and a serious-looking outfit... with no back side at all.  She turns to the side to give you a good look at her rear, smiling mischievously.";
                    this.armorName = FetishCultist.TEACHERS_OUTFIT;
                    changed = true;
                }
                break;
            case 4:
                if (this.armorName != FetishCultist.NAUGHTY_NURSES_UNIFORM) {
                    // Naughty Nurse
                    this.long =
                        "The woman is wearing heavy make-up and a whorish nurse's suit, seemingly in white latex with two openings at her breasts and a large one on her crotch and inner thighs. It lets her blood-gorged pussy lips hang freely, which she displays proudly.";
                    this.armorName = FetishCultist.NAUGHTY_NURSES_UNIFORM;
                    changed = true;
                }
                break;
        }
        // Talk abouts it mang!
        if (changed)
            this.outx(
                `The fetish cultist's clothing shifts and twists, taking on the appearance of a ${this.armorName}.\n\n`,
                false
            );
        this.lust += this.lustVuln * 3;
    }

    private static FETISHY_OUTFIT = "fetishy outfit";

    private cultistRaisePlayerLust(): void {
        // Two text variants!
        if (FetishCultist.rand(2) == 0) {
            if (this.armorName == FetishCultist.PERVY_NUNS_CLOTHING)
                this.outx(
                    "She suddenly stops chanting and spreads her legs, opening her loose pussy wide with one hand while moaning like a whore.  She toys with her breasts and fondles one of her nipples with her other hand.\n\nDespite yourself,  you can't help but be aroused by the scene.",
                    false
                );
            if (this.armorName == FetishCultist.NOBLES_CLOTHING)
                this.outx(
                    "She suddenly blushes and start giggling, saying: 'Really my lord!' in a suave, submitting voice while pulling down her skirt.  The movement lets you get an even better look down her cleavage, and her breasts appear even fuller than before.\n\nDespite yourself, you can't help but be aroused by the scene.",
                    false
                );
            if (this.armorName == FetishCultist.SWIMSUIT)
                this.outx(
                    "She does a series of lewd stretches, showing off her tightly-clad, sexy body in every possible detail.  In particular, her excited, blood-gorged pussy lips, clearly outlined, seem to be begging for you to come and grope them... and that's just for a start.  Despite yourself, you can't help but be aroused by the scene.",
                    false
                );
            if (this.armorName == FetishCultist.TEACHERS_OUTFIT)
                this.outx(
                    'Obviously very flexible, she arches her back with one hand on her hip, displaying her firm round ass while looking at you with a lascivious expression.  She says in a sexy voice, "<i>Maybe we should have a... private talk after class...</i>"  Despite yourself, you can\'t help but be aroused by the scene.',
                    false
                );
            if (this.armorName == FetishCultist.NAUGHTY_NURSES_UNIFORM)
                this.outx(
                    'Still displaying her figure in her tight suit, she asks with a lewd smile, "<i>Is there one of your needs I could satisfy, my dear?</i>"  She grabs one of her firm, full breasts, "<i>Are you thirsty, maybe?</i>"  Despite yourself, you can\'t help but be aroused by the scene.',
                    false
                );
            if (this.armorName == FetishCultist.FETISHY_OUTFIT)
                this.outx(
                    "She suddenly starts posing in sexy outfits.  Despite yourself, you can't help but be aroused by it.",
                    false
                );
        } else {
            this.outx(
                "She suddenly starts mauling her shapely breasts, her fingers nearly disappearing briefly in the soft, full flesh, while fingering herself eagerly, emitting a variety of lewd noises.  You are entranced by the scene, the sexual excitement she's experiencing penetrating your body in warm waves coming from your groin.",
                false
            );
        }
        this.game.dynStats("lus", this.player.lib / 10 + this.player.cor / 20 + 4);
        if (this.player.lust >= 100) this.doNext(this.game.endLustLoss);
        else this.doNext(this.game.combatMenu);
    }
    private cultistLustTransfer(): void {
        if (this.lust <= 30 || FetishCultist.rand(2) == 0) {
            this.outx("Her eyes glaze over, ");
            if (this.player.cor < 40) this.outx("and you're almost afraid to know ");
            else this.outx("and you wish you knew ");
            this.outx(
                "what she is thinking of since you can almost feel her own lust building.",
                false
            );
            this.lust += 10;
        } else {
            this.outx(
                "Her eyes glaze over and you feel your mind suddenly becoming filled with a blur of every sexual perversion you could possibly think of, and then some.",
                false
            );
            if (this.player.vaginas.length > 0) {
                this.outx(
                    `  You feel your ${this.vaginaDescript(0)} soaking itself in a sudden burst`
                );
                if (this.player.cockTotal() > 0)
                    this.outx(
                        `, while a sudden influx of pre-cum blurts out and streams down your ${this.player.multiCockDescriptLight()}, painfully hardened by a vast amount of blood rushing to your groin`
                    );
                this.outx(".");
            } else if (this.player.cockTotal() > 0)
                this.outx(
                    `  A sudden influx of pre-cum blurts out and streams down your ${this.player.multiCockDescriptLight()}, painfully hardened by a vast amount of blood rushing to your groin.`
                );
            if (this.player.gender == 0)
                this.outx(
                    "  Your genderless body is suddenly filled by a perverted warmth.",
                    false
                );
            this.outx("\n\nYou notice that the young woman seems to have calmed down some.", false);
            this.game.dynStats("lus", (this.lust / 3) * (1 + this.player.cor / 300));
            this.lust -= 50;
            if (this.lust < 0) this.lust = 10;
        }
        if (this.player.lust >= 100) this.doNext(this.game.endLustLoss);
        else this.doNext(this.game.combatMenu);
    }

    public defeated(hpVictory: boolean): void {
        let temp2;
        if (this.player.findStatusAffect(StatusAffects.Feeder) >= 0)
            temp2 = this.game.lake.fetishCultistScene.fetishCultistHasAMilkFetish;
        if (hpVictory) {
            this.outx(
                "Hurt too much to continue controlling her powers, the cultist collapses helplessly.",
                true
            );
        } else {
            this.outx(
                "Overwhelmed by her lusts, the cultist loses the ability to control herself and collapses.",
                true
            );
        }
        if (this.player.lust >= 33 && this.player.gender > 0) {
            this.outx(
                "  You realize she'd make a perfect receptacle for your lusts.  Do you have your way with her?",
                false
            );
            this.game.simpleChoices(
                "Sex",
                this.game.lake.fetishCultistScene.playerRapesCultist,
                "",
                undefined,
                "",
                undefined,
                "B. Feed",
                temp2,
                "Leave",
                this.game.cleanupAfterCombat
            );
        } else {
            if (temp2 != undefined) {
                this.outx(
                    "  She looks like she might take some of your milk if you offered it to her.  What do you do?",
                    false
                );
                this.game.simpleChoices(
                    "B. Feed",
                    temp2,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined,
                    "Leave",
                    this.game.cleanupAfterCombat
                );
            } else this.game.cleanupAfterCombat();
        }
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (hpVictory) {
            super.won(hpVictory, pcCameWorms);
        } else {
            if (pcCameWorms) {
                this.outx("\n\nThe cultist giggles as she watches you struggling.\n\n", false);
            }
            this.game.lake.fetishCultistScene.cultistRapesYou();
        }
    }

    protected performCombatAction(): void {
        FetishCultist.randomChoice(this.special1, this.special2)();
    }

    public constructor() {
        super();
        trace("FetishCultist Constructor!");
        this.a = "the ";
        this.short = "fetish cultist";
        this.imageName = "fetishcultist";
        this.long =
            "The woman across from you has her eyes closed, her hands joined, and seems to be chanting under her breath. She is wearing a religious outfit that closely hugs her curvacious shape, with a skirt so short that you can clearly see her pussy's lips.\n\nShe has clealy lost her grasp on sanity, and filled the void with pure perversion.";
        // this.plural = false;
        this.createVagina(false, VAGINA_LOOSENESS_GAPING, VAGINA_WETNESS_WET);
        this.createBreastRow(Appearance.breastCupInverse("DD"));
        this.ass.analLooseness = ANAL_LOOSENESS_NORMAL;
        this.ass.analWetness = ANAL_WETNESS_NORMAL;
        this.tallness = 5 * 12 + 7;
        this.hipRating = HIP_RATING_AMPLE;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "pale";
        this.hairColor = "black";
        this.hairLength = 15;
        this.initStrTouSpeInte(35, 25, 30, 1);
        this.initLibSensCor(75, 80, 90);
        this.weaponName = "whip";
        this.weaponVerb = "whip-crack";
        this.armorName = FetishCultist.FETISHY_OUTFIT;
        this.lust = 25;
        this.temperment = FetishCultist.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 2;
        this.gems = 5 + FetishCultist.rand(10);
        this.drop = new WeightedDrop()
            .add(this.consumables.LABOVA_, 1)
            .add(this.weapons.RIDINGC, 1)
            .add(this.consumables.OVIELIX, 2)
            .add(this.consumables.L_DRAFT, 6);
        this.special1 = this.cultistRaisePlayerLust;
        this.special2 = this.cultistLustTransfer;
        this.checkMonster();
    }
}
