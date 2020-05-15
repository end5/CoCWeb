import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_SLIME_DROOLING,
    BUTT_RATING_LARGE,
    HIP_RATING_AMPLE,
    LOWER_BODY_TYPE_GOO,
} from "../../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { ChainedDrop } from "../../../internals/ChainedDrop";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class GreenSlime extends Monster {
    public defeated(hpVictory: boolean): void {
        this.outx(
            `You smile in satisfaction as the ${this.short} collapses, unable to continue fighting.`,
            true
        );
        // Boobfeed.
        if (this.player.findStatusAffect(StatusAffects.Feeder) >= 0) {
            // Eligable to rape
            if (this.player.lust >= 33 && this.player.gender > 0) {
                this.outx(
                    "\n\nYou're horny enough to try and rape it, though you'd rather see how much milk you can squirt into it.  What do you do?",
                    false
                );
                this.game.simpleChoices(
                    "B.Feed",
                    this.game.lake.greenSlimeScene.rapeOozeWithMilk,
                    "Rape",
                    this.game.lake.greenSlimeScene.slimeVictoryRape,
                    "",
                    undefined,
                    "",
                    undefined,
                    "Leave",
                    this.game.cleanupAfterCombat
                );
            }
            // Rapes not on the table.
            else {
                this.outx(
                    "\n\nYour nipples ache with the desire to forcibly breastfeed the gelatinous beast.  Do you?",
                    false
                );
                this.game.doYesNo(
                    this.game.lake.greenSlimeScene.rapeOozeWithMilk,
                    this.game.cleanupAfterCombat
                );
            }
        }
        // Not a breastfeeder
        else if (this.player.lust >= 33 && this.player.gender > 0) {
            this.outx(
                "  Sadly you realize your own needs have not been met.  Of course, you could always play with the poor thing... Do you rape it?",
                false
            );
            this.game.doYesNo(
                this.game.lake.greenSlimeScene.slimeVictoryRape,
                this.game.cleanupAfterCombat
            );
        } else this.game.cleanupAfterCombat();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nThe slime doesn't even seem to notice.\n\n");
        }
        this.doNext(this.game.lake.greenSlimeScene.slimeLoss);
    }

    private lustAttack(): void {
        this.outx(
            "The creature surges forward slowly with a swing that you easily manage to avoid.  You notice traces of green liquid spurt from the creature as it does, forming a thin mist that makes your skin tingle with excitement when you inhale it."
        );
        this.game.dynStats("lus", this.player.lib / 10 + 8);
        this.doNext(this.game.playerMenu);
    }

    private lustReduction(): void {
        this.outx(
            "The creature collapses backwards as its cohesion begins to give out, and the faint outline of eyes and a mouth form on its face.  Its chest heaves as if it were gasping, and the bolt upright erection it sports visibly quivers and pulses before relaxing slightly."
        );
        this.lust -= 13;
        this.doNext(this.game.playerMenu);
    }

    public constructor() {
        super();
        trace("GreenSlime Constructor!");
        this.a = "a ";
        this.short = "green slime";
        this.imageName = "greenslime";
        this.long =
            "The green slime has a normally featureless face that sits on top of wide shoulders that sprout into thick, strong arms.  Its torso fades into an indistinct column that melds into the lump of ooze on the ground that serves as a makeshift form of locomotion.";
        // this.plural = false;
        this.createCock(18, 2, CockTypesEnum.HUMAN);
        this.cumMultiplier = 3;
        this.hoursSinceCum = 20;
        this.pronoun1 = "it";
        this.pronoun2 = "it";
        this.pronoun3 = "its";
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;
        this.tallness = GreenSlime.rand(8) + 80;
        this.hipRating = HIP_RATING_AMPLE;
        this.buttRating = BUTT_RATING_LARGE;
        this.lowerBody = LOWER_BODY_TYPE_GOO;
        this.skinTone = "green";
        this.initStrTouSpeInte(25, 20, 10, 5);
        this.initLibSensCor(50, 60, 20);
        this.weaponName = "hands";
        this.weaponVerb = "slap";
        this.armorName = "gelatinous skin";
        this.bonusHP = 30;
        this.lust = 30;
        this.temperment = GreenSlime.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 2;
        this.gems = GreenSlime.rand(5) + 1;
        this.drop = new ChainedDrop()
            .add(this.weapons.PIPE, 1 / 10)
            .add(this.consumables.WETCLTH, 1 / 2)
            .elseDrop(this.useables.GREENGL);
        this.special1 = this.lustReduction;
        this.special2 = this.lustAttack;
        this.special3 = this.lustAttack;
        this.checkMonster();
    }
}
