import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_NORMAL,
    BUTT_RATING_AVERAGE,
    FACE_COW_MINOTAUR,
    HIP_RATING_AVERAGE,
    LOWER_BODY_TYPE_HOOFED,
    SKIN_TYPE_FUR,
    TAIL_TYPE_COW,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { ChainedDrop } from "../../../internals/ChainedDrop";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

/**
 * ...
 *
 * @author Fake-Name
 */

export class Minotaur extends Monster {
    public hasAxe: boolean;

    public defeated(hpVictory: boolean): void {
        if (this.findStatusAffect(StatusAffects.PhyllaFight) >= 0) {
            this.removeStatusAffect(StatusAffects.PhyllaFight);
            this.outx("You defeat a minotaur!  ", true);
            this.game.desert.antsScene.phyllaBeatAMino();
        } else {
            this.game.mountain.minotaurScene.minoVictoryRapeChoices();
        }
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (this.findStatusAffect(StatusAffects.PhyllaFight) >= 0) {
            this.removeStatusAffect(StatusAffects.PhyllaFight);
            this.game.desert.antsScene.phyllaPCLostToMino();
        } else if (pcCameWorms) {
            this.outx(
                "\n\nThe minotaur picks you up and forcibly tosses you from his cave, grunting in displeasure.",
                false
            );
            this.game.cleanupAfterCombat();
        } else this.game.mountain.minotaurScene.getRapedByMinotaur();
    }

    public get long(): string {
        return `An angry-looking minotaur looms over you.  Covered in shaggy ${
            this.hairColor
        } fur, the beast is an imposing sight.  Wearing little but an obviously distended loincloth, he is clearly already plotting his method of punishment.  Like most minotaurs he has hooves, a cow-like tail and face, prominent horns, and impressive musculature. ${
            this.ballSize > 4
                ? `  Barely visible below the tattered shreds of loincloth are ${Appearance.ballsDescription(
                      true,
                      true,
                      this
                  )}, swollen with the minotaur's long pent-up need.`
                : ""
        }${
            this.hasAxe
                ? "<b>This minotaur seems to have found a deadly looking axe somewhere!</b>"
                : ""
        }`;
    }

    public constructor(axe = false) {
        super();
        // Most times they dont have an axe
        this.hasAxe = axe || Minotaur.rand(3) == 0;
        const furColor: string = Minotaur.randomChoice("black", "brown");

        trace("Minotaur Constructor!");
        trace(this.game.flags);
        this.a = "the ";
        this.short = "minotaur";
        this.imageName = "minotaur";
        // this.long = "";
        // this.plural = false;
        this.createCock(Minotaur.rand(13) + 24, 2 + Minotaur.rand(3), CockTypesEnum.HORSE);
        this.balls = 2;
        this.ballSize = 2 + Minotaur.rand(13);
        this.cumMultiplier = 1.5;
        this.hoursSinceCum = this.ballSize * 10;
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_NORMAL;
        this.createStatusAffect(StatusAffects.BonusACapacity, 30, 0, 0, 0);
        this.tallness = Minotaur.rand(37) + 84;
        this.hipRating = HIP_RATING_AVERAGE;
        this.buttRating = BUTT_RATING_AVERAGE;
        this.lowerBody = LOWER_BODY_TYPE_HOOFED;
        this.skinTone = furColor;
        this.skinType = SKIN_TYPE_FUR;
        this.skinDesc = "shaggy fur";
        this.hairColor = furColor;
        this.hairLength = 3;
        this.initStrTouSpeInte(this.hasAxe ? 75 : 50, 60, 30, 20);
        this.initLibSensCor(40 + this.ballSize * 2, 15 + this.ballSize * 2, 35);
        this.faceType = FACE_COW_MINOTAUR;
        this.weaponName = this.hasAxe ? "axe" : "fist";
        this.weaponVerb = this.hasAxe ? "cleave" : "punch";
        this.armorName = "thick fur";
        this.bonusHP = 20 + Minotaur.rand(this.ballSize * 2);
        this.lust = this.ballSize * 3;
        this.lustVuln = this.hasAxe ? 0.84 : 0.87;
        this.temperment = Minotaur.TEMPERMENT_LUSTY_GRAPPLES;
        this.level = this.hasAxe ? 6 : 5;
        this.gems = Minotaur.rand(5) + 5;
        if (this.hasAxe) {
            this.drop = new WeightedDrop(this.consumables.MINOBLO, 1);
        } else {
            this.drop = new ChainedDrop()
                .add(this.consumables.MINOCUM, 1 / 5)
                .add(this.consumables.MINOBLO, 1 / 2)
                .elseDrop(undefined);
        }
        this.special1 = this.game.mountain.minotaurScene.minoPheromones;
        this.tailType = TAIL_TYPE_COW;
        this.checkMonster();
    }
}
