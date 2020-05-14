import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { VAGINA_WETNESS_SLICK, VAGINA_LOOSENESS_LOOSE, ANAL_LOOSENESS_STRETCHED, ANAL_WETNESS_SLIME_DROOLING, HIP_RATING_AMPLE, BUTT_RATING_LARGE, HORNS_DEMON, TAIL_TYPE_DEMONIC } from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";

export class Farmers extends Monster {

    protected performCombatAction(): void {
        this.createStatusAffect(StatusAffects.Attacks, 4, 0, 0, 0);
        this.eAttack();
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        this.game.owca.beatUpOwca();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.owca.loseToOwca();
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "farmers";
        this.imageName = "farmers";
        this.long = "This is a group of thirty angry villagers, almost all human-looking but for the tiny horn-like protrusions growing from their heads and the white fuzz that almost passes off as hair.  They are all armed with pitchforks or other crude farming tools they use in their everyday task.  Rebecc is staring from behind them with horrified eyes at the combat, paralyzed by the sudden turn of events.";
        this.plural = true;
        this.pronoun1 = "they";
        this.pronoun2 = "them";
        this.pronoun3 = "their";
        this.createCock(9, 2, CockTypesEnum.HUMAN);
        this.balls = 2;
        this.ballSize = 1;
        this.cumMultiplier = 3;
        // this.hoursSinceCum = 0;
        this.createVagina(false, VAGINA_WETNESS_SLICK, VAGINA_LOOSENESS_LOOSE);
        this.createBreastRow(Appearance.breastCupInverse("A"));
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;
        this.tallness = Farmers.rand(8) + 70;
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "red";
        this.hairColor = "black";
        this.hairLength = 15;
        this.initStrTouSpeInte(40, 50, 99, 99);
        this.initLibSensCor(35, 35, 20);
        this.weaponName = "pitchforks";
        this.weaponVerb = "stab";
        this.armorName = "chitin";
        this.bonusHP = 500;
        this.lustVuln = 0;
        this.temperment = Farmers.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 10;
        this.gems = Farmers.rand(25) + 40;
        this.hornType = HORNS_DEMON;
        this.horns = 2;
        this.tailType = TAIL_TYPE_DEMONIC;
        this.drop = this.NO_DROP;
        this.checkMonster();
    }

}

