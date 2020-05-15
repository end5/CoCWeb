import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_SLIME_DROOLING,
    BUTT_RATING_TIGHT,
    HIP_RATING_AMPLE,
    LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS,
    TAIL_TYPE_DEMONIC,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_WETNESS_DROOLING,
    WING_TYPE_BAT_LIKE_TINY,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

export class OmnibusOverseer extends Monster {
    public defeated(hpVictory: boolean): void {
        this.game.omnibusVictoryEvent();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nYour foe doesn't seem to care...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.omnibusLossRape();
        }
    }

    private lustAura(): void {
        this.outx(
            "The demoness blinks her eyes closed and knits her eyebrows in concentration.  The red orbs open wide and she smiles, licking her lips.   The air around her grows warmer, and muskier, as if her presence has saturated it with lust."
        );
        if (this.findStatusAffect(StatusAffects.LustAura) >= 0) {
            this.outx(
                "  Your eyes cross with unexpected feelings as the taste of desire in the air worms its way into you.  The intense aura quickly subsides, but it's already done its job."
            );
            this.game.dynStats("lus", 8 + Math.floor(this.player.lib / 20 + this.player.cor / 25));
        } else {
            this.createStatusAffect(StatusAffects.LustAura, 0, 0, 0, 0);
        }
        this.game.combatRoundOver();
    }

    private milkAttack(): void {
        if (OmnibusOverseer.rand(2) == 0)
            this.outx(
                "The demoness grips her sizable breasts and squeezes, spraying milk at you.\n"
            );
        else
            this.outx(
                "Your foe curls up to pinch her nipples, tugging hard and squirting milk towards you.\n"
            );
        if (
            (this.player.spe > 50 && OmnibusOverseer.rand(4) == 0) ||
            (this.player.findPerk(PerkLib.Evade) >= 0 && OmnibusOverseer.rand(3) == 0) ||
            (this.player.findPerk(PerkLib.Misdirection) >= 0 &&
                OmnibusOverseer.rand(4) == 0 &&
                this.player.armorName == "red, high-society bodysuit")
        ) {
            this.outx("You sidestep the gushing fluids.");
        }
        // You didn't dodge
        else {
            if (OmnibusOverseer.rand(2) == 0) {
                this.outx(
                    "The milk splatters across your face and chest, soaking you with demonic cream.  Some managed to get into your mouth, and you swallow without thinking.  It makes you tingle with warmth.  "
                );
            } else {
                this.outx(
                    `The milk splashes into your ${this.player.armorName}, soaking you effectively.  `
                );
                if (this.player.cocks.length > 0) {
                    this.outx(
                        `Your ${this.cockDescript(
                            0
                        )} gets hard as the milk lubricates and stimulates it.  `
                    );
                    this.game.dynStats("lus", 5);
                }
                if (this.player.vaginas.length > 0) {
                    this.outx(
                        "You rub your thighs together as the milk slides between your pussy lips, stimulating you far more than it should.  "
                    );
                    this.game.dynStats("lus", 5);
                }
            }
            this.game.dynStats("lus", 7 + this.player.sens / 20);
            if (this.player.biggestLactation() > 1)
                this.outx(`Milk dribbles from your ${this.allBreastsDescript()} in sympathy.`);
        }
        this.game.combatRoundOver();
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "Omnibus Overseer";
        this.imageName = "omnibusoverseer";
        this.long =
            "The 'woman' before you is clothed only in a single strip of fabric that wraps around her bountiful chest.  She has striking red eyes that contrast visibly with her blue skin and dark make-up.  Shiny black gloss encapsulates her kissable bubbly black lips.  Her most striking feature is her crotch, which appears neither male nor female.  She has a puffy wet vulva, but a cock-shaped protrusion sprouts from where a clit should be.";
        // this.plural = false;
        this.createCock(10, 1.5);
        this.balls = 0;
        this.ballSize = 0;
        this.cumMultiplier = 3;
        // this.hoursSinceCum = 0;
        this.createVagina(false, VAGINA_WETNESS_DROOLING, VAGINA_LOOSENESS_NORMAL);
        this.createBreastRow(Appearance.breastCupInverse("DD"));
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;
        this.tallness = OmnibusOverseer.rand(9) + 70;
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_TIGHT;
        this.lowerBody = LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS;
        this.skinTone = "light purple";
        this.hairColor = "purple";
        this.hairLength = 42;
        this.initStrTouSpeInte(65, 45, 45, 85);
        this.initLibSensCor(80, 70, 80);
        this.weaponName = "claws";
        this.weaponVerb = "claw";
        this.weaponAttack = 10;
        this.weaponPerk = "";
        this.weaponValue = 150;
        this.armorName = "demonic skin";
        this.armorDef = 15;
        this.bonusHP = 200;
        this.lust = 20;
        this.lustVuln = 0.75;
        this.temperment = OmnibusOverseer.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 8;
        this.gems = OmnibusOverseer.rand(25) + 10;
        this.drop = new WeightedDrop(undefined, 1);
        this.special1 = this.lustAura;
        this.special2 = this.milkAttack;
        this.wingType = WING_TYPE_BAT_LIKE_TINY;
        this.wingDesc = "tiny hidden";
        this.tailType = TAIL_TYPE_DEMONIC;
        this.checkMonster();
    }
}
