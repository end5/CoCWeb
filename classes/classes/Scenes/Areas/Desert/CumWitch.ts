import { Monster } from "../../../Monster";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { VAGINA_WETNESS_WET, VAGINA_LOOSENESS_LOOSE, ANAL_LOOSENESS_TIGHT, ANAL_WETNESS_NORMAL, HIP_RATING_CURVY, BUTT_RATING_LARGE } from "../../../../../includes/appearanceDefs";
import { StatusAffects } from "../../../StatusAffects";
import { Appearance } from "../../../Appearance";
import { WeightedDrop } from "../../../internals/WeightedDrop";

export class CumWitch extends Monster {

    protected performCombatAction(): void {
        this.game.cumWitchAI();
    }

    public defeated(hpVictory: boolean): void {
        this.game.cumWitchDefeated();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.defeatedByCumWitch();
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "Cum Witch";
        this.imageName = "cumwitch";
        this.long = "The Cum Witch is a moderately tall woman, almost six feet in height.  Her dark ebony skin is nearly as black as pitch, though it glitters with sweat from her recent sexual activities and the fight.  She has plump lips and long, smooth blonde hair, though much of it is hidden behind a pointed, wide-brimmed hat.  Her robes are even blacker than she is, but she wields an alabaster staff that fairly sizzles with magical might.  Of course, her garments don't do much to conceal her gigantic breasts.  Though there are only two, they're large enough to dwarf the four tits most sand witches are packing.";
        // this.plural = false;
        this.createCock(12, 2, CockTypesEnum.HUMAN);
        this.balls = 0;
        this.ballSize = 0;
        this.cumMultiplier = 3;
        this.hoursSinceCum = 20;
        this.createVagina(false, VAGINA_WETNESS_WET, VAGINA_LOOSENESS_LOOSE);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 20, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("E"));
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_NORMAL;
        this.tallness = CumWitch.rand(12) + 55;
        this.hipRating = HIP_RATING_CURVY;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "black";
        this.hairColor = "sandy-blonde";
        this.hairLength = 15;
        this.initStrTouSpeInte(35, 35, 35, 85);
        this.initLibSensCor(55, 40, 30);
        this.weaponName = "fists";
        this.weaponVerb = "punches";
        this.armorName = "robes";
        this.bonusHP = 100;
        this.lust = 30;
        this.lustVuln = .8;
        this.temperment = CumWitch.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 6;
        this.gems = CumWitch.rand(15) + 5;
        this.drop = new WeightedDrop().addMany(1,
            this.consumables.TSCROLL,
            this.consumables.OVIELIX,
            this.consumables.LACTAID,
            this.consumables.LABOVA_,
            this.consumables.W__BOOK,
            this.consumables.B__BOOK,
            undefined);
        this.checkMonster();
    }

}

