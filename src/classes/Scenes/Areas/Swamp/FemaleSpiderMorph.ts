import {
    ANAL_LOOSENESS_VIRGIN,
    ANAL_WETNESS_DRY,
    BUTT_RATING_LARGE,
    HIP_RATING_CURVY,
    LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS,
    TAIL_TYPE_SPIDER_ADBOMEN,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_WETNESS_DROOLING,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { StatusAffects } from "../../../StatusAffects";
import { AbstractSpiderMorph } from "./AbstractSpiderMorph";

/**
 * ...
 *
 * @author ...
 */
export class FemaleSpiderMorph extends AbstractSpiderMorph {
    public defeated(hpVictory: boolean): void {
        this.game.swamp.femaleSpiderMorphScene.defeatASpiderBitch();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nThe spider flashes a predatory grin while she waits it out...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.swamp.femaleSpiderMorphScene.loseToFemaleSpiderMorph();
        }
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "female spider-morph";
        this.imageName = "femalespidermorph";
        this.long =
            "The female spider-morph is completely nude, save for her thigh-high stockings and forearm-length gloves, which upon closer inspection, appear to be actually be part of her body - her exoskeleton.  Her exposed skin is pale as the full moon, save for the dusky skin of her nipples and the black-skinned delta of her sex.  Her breasts and ass are both full and well-rounded, and just above her ass-cheeks there's a bulbous spider-abdomen.  The spider-girl is currently eyeing you with a strange expression and her fangs bared.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_DROOLING, VAGINA_LOOSENESS_LOOSE);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 40, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("E+"));
        this.ass.analLooseness = ANAL_LOOSENESS_VIRGIN;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 30, 0, 0, 0);
        this.tallness = 7 * 12 + 6;
        this.hipRating = HIP_RATING_CURVY + 2;
        this.buttRating = BUTT_RATING_LARGE + 1;
        this.lowerBody = LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS;
        this.skinTone = "dusky";
        this.hairColor = "red";
        this.hairLength = 13;
        this.initStrTouSpeInte(60, 50, 99, 99);
        this.initLibSensCor(35, 35, 20);
        this.weaponName = "dagger";
        this.weaponVerb = "stab";
        this.weaponAttack = 15;
        this.armorName = "exoskeleton";
        this.armorDef = 14;
        this.armorPerk = "";
        this.armorValue = 50;
        this.bonusHP = 200;
        this.lust = 20;
        this.lustVuln = 0.6;
        this.temperment = FemaleSpiderMorph.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 13;
        this.gems = FemaleSpiderMorph.rand(10) + 10;
        this.drop = new WeightedDrop()
            .add(this.consumables.S_GOSSR, 5)
            .add(this.useables.T_SSILK, 1)
            .add(undefined, 4);
        this.tailType = TAIL_TYPE_SPIDER_ADBOMEN;
        this.checkMonster();
    }
}
