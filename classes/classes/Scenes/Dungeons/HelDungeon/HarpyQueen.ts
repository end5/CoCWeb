import { Monster } from "../../../Monster";
import { VAGINA_WETNESS_SLAVERING, VAGINA_LOOSENESS_LOOSE, ANAL_LOOSENESS_STRETCHED, ANAL_WETNESS_DRY, HIP_RATING_AMPLE, BUTT_RATING_LARGE, LOWER_BODY_TYPE_HARPY, SKIN_TYPE_PLAIN, TAIL_TYPE_HARPY, WING_TYPE_FEATHERED_LARGE } from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";

export class HarpyQueen extends Monster {

    protected performCombatAction(): void {
        this.game.harpyQueenAI();
    }

    public defeated(hpVictory: boolean): void {
        this.game.harpyQueenDefeatedByPC();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.harpyQueenBeatsUpPCBadEnd();
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "Harpy Queen";
        this.imageName = "harpyqueen";
        this.long = "You face the Harpy Queen, a broodmother of epic proportions - literally.  Her hips are amazingly wide, thrice her own width at the least, and the rest of her body is lushly voluptuous, with plush, soft thighs and a tremendous butt.  Her wide wings beat occasionally, sending ripples through her jiggly body.  She wields a towering whitewood staff in one hand, using the other to cast eldritch spells.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_SLAVERING, VAGINA_LOOSENESS_LOOSE);
        this.createBreastRow(Appearance.breastCupInverse("D"));
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.tallness = HarpyQueen.rand(8) + 70;
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_LARGE;
        this.lowerBody = LOWER_BODY_TYPE_HARPY;
        this.skinTone = "red";
        this.skinType = SKIN_TYPE_PLAIN;
        this.skinDesc = "feathers";
        this.hairColor = "black";
        this.hairLength = 15;
        this.initStrTouSpeInte(70, 60, 120, 40);
        this.initLibSensCor(40, 45, 50);
        this.weaponName = "eldritch staff";
        this.weaponVerb = "thwack";
        this.weaponAttack = 20;
        this.armorName = "armor";
        this.armorDef = 20;
        this.bonusHP = 1000;
        this.lust = 20;
        this.lustVuln = .15;
        this.temperment = HarpyQueen.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 20;
        this.gems = HarpyQueen.rand(25) + 160;
        this.additionalXP = 50;
        this.tailType = TAIL_TYPE_HARPY;
        this.wingType = WING_TYPE_FEATHERED_LARGE;
        this.drop = this.NO_DROP;
        this.checkMonster();
    }

}

