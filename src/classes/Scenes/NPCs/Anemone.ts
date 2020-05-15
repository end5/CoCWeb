import {
    ANAL_LOOSENESS_NORMAL,
    ANAL_WETNESS_DRY,
    BUTT_RATING_NOTICEABLE,
    HAIR_ANEMONE,
    HIP_RATING_CURVY,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_WETNESS_SLICK,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { CockTypesEnum } from "../../CockTypesEnum";
import { WeightedDrop } from "../../internals/WeightedDrop";
import { Monster } from "../../Monster";
import { StatusAffects } from "../../StatusAffects";

export class Anemone extends Monster {
    public eAttack(): void {
        this.outx(
            "Giggling playfully, the anemone launches several tentacles at you.  Most are aimed for your crotch, but a few attempt to caress your chest and face.\n",
            false
        );
        super.eAttack();
    }

    public eOneAttack(): number {
        this.applyVenom(Anemone.rand(4 + this.player.sens / 20) + 1);
        return 1;
    }

    // Apply the effects of AnemoneVenom()
    public applyVenom(str = 1): void {
        // First application
        if (this.player.findStatusAffect(StatusAffects.AnemoneVenom) < 0)
            this.player.createStatusAffect(StatusAffects.AnemoneVenom, 0, 0, 0, 0);
        // Gain some lust
        this.game.dynStats("lus", 2 * str);

        // Loop through applying 1 point of venom at a time.
        while (str > 0) {
            str--;
            // Str bottommed out, convert to lust
            if (this.player.str < 2) this.game.dynStats("lus", 2);
            // Lose a point of str.
            else {
                Anemone.showStatDown("str");
                // strDown.visible = true;
                // strUp.visible = false;
                this.player.str--;
                this.player.addStatusValue(StatusAffects.AnemoneVenom, 1, 1);
            }
            // Spe bottomed out, convert to lust
            if (this.player.spe < 2) this.game.dynStats("lus", 2);
            // Lose a point of spe.
            else {
                Anemone.showStatDown("spe");
                // speDown.visible = true;
                // speUp.visible = false;
                this.player.spe--;
                this.player.addStatusValue(StatusAffects.AnemoneVenom, 2, 1);
            }
        }
        this.game.statScreenRefresh();
    }

    public defeated(hpVictory: boolean): void {
        this.game.anemoneScene.defeatAnemone();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nYour foe doesn't seem to mind at all...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.anemoneScene.loseToAnemone();
        }
    }

    public outputAttack(damage: number): void {
        this.outx(
            "You jink and dodge valiantly but the tentacles are too numerous and coming from too many directions.  A few get past your guard and caress your skin, leaving a tingling, warm sensation that arouses you further.",
            false
        );
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "anemone";
        this.imageName = "anemone";
        this.long =
            "The anemone is a blue androgyne humanoid of medium height and slender build, with colorful tentacles sprouting on her head where hair would otherwise be.  Her feminine face contains two eyes of solid color, lighter than her skin.  Two feathery gills sprout from the middle of her chest, along the line of her spine and below her collarbone, and drape over her pair of small B-cup breasts.  Though you wouldn't describe her curves as generous, she sways her girly hips back and forth in a way that contrasts them to her slim waist quite attractively.  Protruding from her groin is a blue shaft with its head flanged by diminutive tentacles, and below that is a dark-blue pussy ringed by small feelers.  Further down are a pair of legs ending in flat sticky feet; proof of her aquatic heritage.  She smiles broadly and innocently as she regards you from her deep eyes.";
        // this.plural = false;
        this.createCock(7, 1, CockTypesEnum.ANEMONE);
        this.createVagina(false, VAGINA_WETNESS_SLICK, VAGINA_LOOSENESS_LOOSE);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 5, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("B"));
        this.ass.analLooseness = ANAL_LOOSENESS_NORMAL;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 10, 0, 0, 0);
        this.tallness = 5 * 12 + 5;
        this.hipRating = HIP_RATING_CURVY;
        this.buttRating = BUTT_RATING_NOTICEABLE;
        this.skinTone = "purple";
        this.hairColor = "purplish-black";
        this.hairLength = 20;
        this.hairType = HAIR_ANEMONE;
        this.initStrTouSpeInte(40, 20, 40, 50);
        this.initLibSensCor(55, 35, 50);
        this.weaponName = "tendrils";
        this.weaponVerb = "tentacle";
        this.weaponAttack = 5;
        this.armorName = "clammy skin";
        this.bonusHP = 120;
        this.lust = 30;
        this.lustVuln = 0.9;
        this.temperment = Anemone.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 4;
        this.gems = Anemone.rand(5) + 1;
        this.drop = new WeightedDrop(this.consumables.DRYTENT, 1);
        this.checkMonster();
    }
}
