import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_DRY,
    BUTT_RATING_TIGHT,
    HIP_RATING_SLENDER,
    WING_TYPE_IMP,
} from "../../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class ImpHorde extends Monster {
    protected performCombatAction(): void {
        this.game.impGangAI();
    }

    public defeated(hpVictory: boolean): void {
        this.game.impGangVICTORY();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nYour foes don't seem put off enough to leave...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.loseToImpMob();
        }
    }

    public constructor() {
        super();
        trace("ImpHorde Constructor!");
        this.a = "the ";
        this.short = "imp horde";
        this.imageName = "impmob";
        this.long =
            "Imps of all shapes and sizes fill the room around you, keeping you completely surrounded by their myriad forms.  You can see more than a few sporting disproportionate erections, and there's even some with exotic dog-dicks, horse-pricks, and the odd spiny cat-cock.  Escape is impossible, you'll have to fight or seduce your way out of this one!";
        this.plural = true;
        this.pronoun1 = "they";
        this.pronoun2 = "them";
        this.pronoun3 = "their";
        this.createCock(12, 2, CockTypesEnum.DEMON);
        this.balls = 2;
        this.ballSize = 1;
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 10, 0, 0, 0);
        this.tallness = 36;
        this.hipRating = HIP_RATING_SLENDER;
        this.buttRating = BUTT_RATING_TIGHT;
        this.skinTone = "red";
        this.hairColor = "black";
        this.hairLength = 1;
        this.initStrTouSpeInte(20, 10, 25, 12);
        this.initLibSensCor(45, 45, 100);
        this.weaponName = "fists";
        this.weaponVerb = "punches";
        this.armorName = "skin";
        this.bonusHP = 450;
        this.lust = 10;
        this.lustVuln = 0.5;
        this.temperment = ImpHorde.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 10;
        this.gems = 20 + ImpHorde.rand(25);
        this.drop = new WeightedDrop(this.armors.NURSECL, 1);
        this.wingType = WING_TYPE_IMP;
        this.wingDesc = "imp wings";
        this.checkMonster();
    }
}
