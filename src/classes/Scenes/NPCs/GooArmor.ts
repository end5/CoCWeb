import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_SLIME_DROOLING,
    BUTT_RATING_LARGE,
    HAIR_GOO,
    HIP_RATING_AMPLE,
    SKIN_TYPE_GOO,
    VAGINA_LOOSENESS_GAPING_WIDE,
    VAGINA_WETNESS_SLAVERING,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { StatusAffects } from "../../StatusAffects";
import { GooGirl } from "../Areas/Lake/GooGirl";

export class GooArmor extends GooGirl {
    protected performCombatAction(): void {
        this.game.gooArmorAI();
    }

    public defeated(hpVictory: boolean): void {
        if (this.findStatusAffect(StatusAffects.Spar) >= 0) this.game.valeria.pcWinsValeriaSpar();
        else this.game.beatUpGooArmor();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nThe armored goo sighs while you exhaust yourself...");
            this.doNext(this.game.endLustLoss);
        } else {
            if (this.findStatusAffect(StatusAffects.Spar) >= 0)
                this.game.valeria.pcWinsValeriaSparDefeat();
            else this.game.gooArmorBeatsUpPC();
        }
    }

    public constructor() {
        super(true);
        this.a = "a ";
        this.short = "Goo Armor";
        this.imageName = "gooarmor";
        this.long =
            "Before you stands a suit of plated mail armor filled with a bright blue goo, standing perhaps six feet off the ground.  She has a beautiful, feminine face, and her scowl as she stands before you is almost cute.  She has formed a mighty greatsword from her goo, and has assumed the stance of a well-trained warrior.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_SLAVERING, VAGINA_LOOSENESS_GAPING_WIDE);
        this.createBreastRow(Appearance.breastCupInverse("C"));
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;
        this.tallness = GooArmor.rand(8) + 70;
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "blue";
        this.skinType = SKIN_TYPE_GOO;
        // this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_GOO];
        this.skinAdj = "goopey";
        this.hairColor = "black";
        this.hairLength = 15;
        this.hairType = HAIR_GOO;
        this.initStrTouSpeInte(60, 50, 50, 40);
        this.initLibSensCor(60, 35, 50);
        this.weaponName = "goo sword";
        this.weaponVerb = "slash";
        this.weaponAttack = 60;
        this.armorName = "armor";
        this.armorDef = 50;
        this.bonusHP = 500;
        this.lustVuln = 0.35;
        this.temperment = GooArmor.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 16;
        this.gems = GooArmor.rand(25) + 40;
        this.drop = this.NO_DROP;
        this.checkMonster();
    }
}
