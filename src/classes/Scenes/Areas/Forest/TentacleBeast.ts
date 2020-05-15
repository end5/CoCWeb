import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_SLIME_DROOLING,
    BUTT_RATING_BUTTLESS,
    HIP_RATING_BOYISH,
    SKIN_TYPE_PLAIN,
    TAIL_TYPE_DEMONIC,
} from "../../../../includes/appearanceDefs";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

export class TentacleBeast extends Monster {
    private tentaclePhysicalAttack(): void {
        this.outx(
            "The shambling horror throws its tentacles at you with a murderous force.\n",
            false
        );
        let temp: number = Math.floor(
            this.str + this.weaponAttack - Math.random() * this.player.tou - this.player.armorDef
        );
        if (temp < 0) temp = 0;
        // Miss
        if (
            temp == 0 ||
            (this.player.spe - this.spe > 0 &&
                Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80)
        ) {
            this.outx(
                "However, you quickly evade the clumsy efforts of the abomination to strike you.",
                false
            );
        }
        // Hit
        else {
            temp = this.player.takeDamage(temp);
            this.outx(`The tentacles crash upon your body mercilessly for ${temp} damage.`);
        }
        this.combatRoundOver();
    }
    private tentacleEntwine(): void {
        this.outx(
            "The beast lunges its tentacles at you from all directions in an attempt to immobilize you.\n",
            false
        );
        // Not Trapped yet
        if (this.player.findStatusAffect(StatusAffects.TentacleBind) < 0) {
            // Success
            if (
                Math.floor(Math.random() * (this.player.spe / 2)) > 15 ||
                (this.player.findPerk(PerkLib.Evade) >= 0 &&
                    Math.floor(Math.random() * (this.player.spe / 2)) > 15)
            ) {
                this.outx(
                    "In an impressive display of gymnastics, you dodge, duck, dip, dive, and roll away from the shower of grab-happy arms trying to hold you. Your instincts tell you that this was a GOOD thing.\n",
                    false
                );
            }
            // Fail
            else {
                this.outx(
                    `While you attempt to avoid the onslaught of pseudopods, one catches you around your ${this.player.foot()} and drags you to the ground. You attempt to reach for it to pull it off only to have all of the other tentacles grab you in various places and immobilize you in the air. You are trapped and helpless!!!\n\n`,
                    false
                );
                // Male/Herm Version:
                if (this.player.hasCock())
                    this.outx(
                        `The creature, having immobilized you, coils a long tendril about your penis. You shudder as the creature begins stroking your cock like a maid at a dairy farm in an attempt to provoke a response from you. Unable to resist, your ${this.player.cockDescript(
                            0
                        )} easily becomes erect, signaling to the creature that you are responsive to harsher stimulation.\n`,
                        false
                    );
                // Female Version:
                else if (this.player.hasVagina())
                    this.outx(
                        `The creature quickly positions a long tentacle with a single sucker over your clitoris. You feel the power of the suction on you, and your body quickly heats up.  Your clit engorges, prompting the beast to latch the sucker onto your ${this.player.clitDescript()}.\n`,
                        false
                    );
                // Genderless
                else
                    this.outx(
                        `The creature quickly positions a long tentacle against your ${this.game.assholeDescript()}. It circles your pucker with slow, delicate strokes that bring unexpected warmth to your body.\n`,
                        false
                    );
                this.game.dynStats("lus", 8 + this.player.sens / 20);
                this.player.createStatusAffect(StatusAffects.TentacleBind, 0, 0, 0, 0);
            }
        }
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        if (hpVictory) {
            this.outx(
                "The creature lets out an ear-piercing screech as it collapses upon itself. Its green coloring quickly fades to brown as the life drains from it, leaving you victorious.",
                true
            );
        } else {
            this.outx(
                "The tentacle beast's mass begins quivering and sighing, the tentacles wrapping around each other and feverishly caressing each other.  It seems the beast has given up on fighting.",
                false
            );
        }
        if (this.findStatusAffect(StatusAffects.PhyllaFight) >= 0) {
            this.removeStatusAffect(StatusAffects.PhyllaFight);
            this.game.desert.antsScene.phyllaTentacleDefeat();
        } else {
            if (!hpVictory && this.player.gender > 0) {
                this.outx("  Perhaps you could use it to sate yourself?", true);
                this.game.doYesNo(
                    this.game.forest.tentacleBeastScene.tentacleVictoryRape,
                    this.game.cleanupAfterCombat
                );
            } else {
                this.game.cleanupAfterCombat();
            }
        }
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (hpVictory) {
            this.outx(
                "Overcome by your wounds, you turn to make a last desperate attempt to run...\n\n"
            );
            if (this.findStatusAffect(StatusAffects.PhyllaFight) >= 0) {
                this.removeStatusAffect(StatusAffects.PhyllaFight);
                this.outx("...and make it into the nearby tunnel.  ");
                this.game.desert.antsScene.phyllaTentaclePCLoss();
            } else this.game.forest.tentacleBeastScene.tentacleLossRape();
        } else {
            this.outx(
                "You give up on fighting, too aroused to resist any longer.  Shrugging, you walk into the writhing mass...\n\n"
            );
            if (this.findStatusAffect(StatusAffects.PhyllaFight) >= 0) {
                this.removeStatusAffect(StatusAffects.PhyllaFight);
                this.outx(
                    "...but an insistent voice rouses you from your stupor.  You manage to run into a nearby tunnel.  "
                );
                this.game.desert.antsScene.phyllaTentaclePCLoss();
            } else this.doNext(this.game.forest.tentacleBeastScene.tentacleLossRape);
        }
    }

    protected performCombatAction(): void {
        // tentacle beasts have special AI
        if (
            TentacleBeast.rand(2) == 0 ||
            this.findStatusAffect(StatusAffects.TentacleCoolDown) >= 0
        )
            this.special1();
        else this.special2();
    }

    public constructor() {
        super();
        trace("TentacleBeast Constructor!");
        this.a = "the ";
        this.short = "tentacle beast";
        this.imageName = "tentaclebeast";
        this.long =
            "You see the massive, shambling form of the tentacle beast before you.  Appearing as a large shrub, it shifts its bulbous mass and reveals a collection of thorny tendrils and cephalopodic limbs.";
        // this.plural = false;
        this.createCock(40, 1.5);
        this.createCock(60, 1.5);
        this.createCock(50, 1.5);
        this.createCock(20, 1.5);
        this.balls = 0;
        this.ballSize = 0;
        this.cumMultiplier = 3;
        // this.hoursSinceCum = 0;
        this.pronoun1 = "it";
        this.pronoun2 = "it";
        this.pronoun3 = "its";
        this.createBreastRow(0, 0);
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;
        this.tallness = TentacleBeast.rand(9) + 70;
        this.hipRating = HIP_RATING_BOYISH;
        this.buttRating = BUTT_RATING_BUTTLESS;
        this.skinTone = "green";
        this.skinType = SKIN_TYPE_PLAIN;
        this.skinDesc = "bark";
        this.hairColor = "green";
        this.hairLength = 1;
        this.initStrTouSpeInte(58, 25, 45, 45);
        this.initLibSensCor(90, 20, 100);
        this.weaponName = "whip-tendril";
        this.weaponVerb = "thorny tendril";
        this.weaponAttack = 1;
        this.armorName = "rubbery skin";
        this.armorDef = 1;
        this.bonusHP = 350;
        this.lust = 10;
        this.lustVuln = 0.8;
        this.temperment = TentacleBeast.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 6;
        this.gems = TentacleBeast.rand(15) + 5;
        this.drop = new WeightedDrop(undefined, 1);
        this.special1 = this.tentaclePhysicalAttack;
        this.special2 = this.tentacleEntwine;
        this.special3 = this.tentaclePhysicalAttack;
        this.tailType = TAIL_TYPE_DEMONIC;
        this.checkMonster();
    }
}
