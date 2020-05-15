import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_NORMAL,
    BUTT_RATING_AVERAGE,
    FACE_COW_MINOTAUR,
    HIP_RATING_AVERAGE,
    LOWER_BODY_TYPE_HOOFED,
    TAIL_TYPE_COW,
} from "../../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { ChainedDrop } from "../../../internals/ChainedDrop";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

export class Satyr extends Monster {
    // Attacks (Z)
    private satyrAttack(): void {
        this.outx("The satyr swings at you with one knuckled fist.  ");
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Satyr.rand(3) < 1) {
            this.outx(
                `${this.capitalA + this.short} completely misses you with a blind punch!\n`,
                false
            );
        }
        // Evade:
        else if (
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        ) {
            this.outx("He snarls as you duck his blow and it swishes harmlessly through the air.");
        } else {
            let damage: number = Math.floor(
                this.str + this.weaponAttack - Satyr.rand(this.player.tou)
            );
            if (damage > 0) {
                damage = this.player.takeDamage(damage);
                this.outx(`It feels like you just got hit with a wooden club! (${damage})`);
            } else this.outx("You successfully block it.");
        }
        this.combatRoundOver();
    }

    private satyrBate(): void {
        this.outx(
            "He glares at you, panting while his tongue hangs out and begins to masturbate.  You can nearly see his lewd thoughts reflected in his eyes, as beads of pre form on his massive cock and begin sliding down the erect shaft."
        );
        // (small Libido based Lust increase, and increase lust)
        this.game.dynStats("lus", this.player.lib / 5 + 4);
        this.lust += 5;
        this.combatRoundOver();
    }

    public satyrCharge(): void {
        this.outx(
            "Lowering his horns, the satyr digs his hooves on the ground and begins snorting; he's obviously up to something.  "
        );
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Satyr.rand(3) < 1) {
            this.outx(
                `${this.capitalA + this.short} completely misses you due to blindness!\n`,
                false
            );
        } else if (this.combatMiss()) {
            this.outx(
                "He charges at you with a loud bleat, but you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)"
            );
            this.HP -= 5;
        } else if (this.combatEvade()) {
            this.outx(
                "He charges at you with a loud bleat, but using your evasive skills, you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)"
            );
            this.HP -= 5;
        } else if (this.combatFlexibility()) {
            this.outx(
                "He charges at you with a loud bleat, but using your flexibility, you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)"
            );
            this.HP -= 5;
        } else if (this.combatMisdirect()) {
            this.outx(
                "He charges at you with a loud bleat, but using your misdirecting skills, you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)"
            );
            this.HP -= 5;
        } else {
            let damage: number = Math.floor(
                this.str + this.weaponAttack - Satyr.rand(this.player.tou)
            );
            if (damage > 0) {
                damage = this.player.takeDamage(damage);
                this.outx(
                    "He charges at you with a loud bleat, catching you off-guard and sending you flying into the ground."
                );
                if (this.player.findPerk(PerkLib.Resolute) < 0) {
                    this.outx(
                        "  The pain of the impact is so big you feel completely dazed, almost seeing stars."
                    );
                    this.player.createStatusAffect(StatusAffects.Stunned, 0, 0, 0, 0);
                }
                // stun PC + hp damage if hit, hp damage dependent on str if miss
                this.outx(` (${damage})`);
            } else
                this.outx("He charges at you, but you successfully deflect it at the last second.");
        }
        this.combatRoundOver();
    }

    private bottleChug(): void {
        this.outx(
            "He whips a bottle of wine seemingly from nowhere and begins chugging it down, then lets out a bellowing belch towards you.  The smell is so horrible you cover your nose in disgust, yet you feel hot as you inhale some of the fetid scent."
        );
        // (damage PC lust very slightly and raise the satyr's lust.)
        this.game.dynStats("lus", this.player.lib / 5);
        this.lust += 5;
        this.combatRoundOver();
    }

    // 5:(Only executed at high lust)
    private highLustChugRape(): void {
        this.outx(
            "Panting with barely-contained lust, the Satyr charges at you and tries to ram you into the ground.  "
        );
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Satyr.rand(3) < 1) {
            this.outx(
                `${this.capitalA + this.short} completely misses you due to blindness!\n`,
                false
            );
        } else if (
            this.combatMiss() ||
            this.combatFlexibility() ||
            this.combatMisdirect() ||
            this.combatEvade()
        ) {
            this.outx(
                "As he charges you, you grab him by the horns and spin around, sending him away."
            );
        } else {
            this.outx(
                `You fall with a <b>THUD</b> and the Satyr doesn't even bother to undress you before he begins rubbing his massive cock on your body until he comes, soiling your [armor] and ${this.player.skinFurScales()} with slimy, hot cum.  As it rubs into your body, you shiver with unwanted arousal.`
            );
            // large-ish sensitivity based lust increase if hit.)(This also relieves him of some of his lust, though not completely.)
            this.lust -= 50;
            this.game.dynStats("lus", this.player.sens / 5 + 20);
        }
        this.combatRoundOver();
    }

    protected performCombatAction(): void {
        if (this.lust >= 75 && Satyr.rand(2) == 0) this.highLustChugRape();
        else if (this.lust < 75 && Satyr.rand(2) == 0) {
            if (Satyr.rand(2) == 0) this.satyrBate();
            else this.bottleChug();
        } else if (this.findStatusAffect(StatusAffects.Charged) < 0) this.satyrCharge();
        else {
            this.satyrAttack();
            this.removeStatusAffect(StatusAffects.Charged);
        }
    }

    public defeated(hpVictory: boolean): void {
        this.game.plains.satyrScene.defeatASatyr();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nThe satyr laughs heartily at your eagerness...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.plains.satyrScene.loseToSatyr();
        }
    }

    public constructor() {
        super();
        this.a = "a ";
        this.short = "satyr";
        this.imageName = "satyr";
        this.long =
            "From the waist up, your opponent is perfectly human, save his curling, goat-like horns and his pointed, elven ears.  His muscular chest is bare and glistening with sweat, while his coarsely rugged, masculine features are contorted into an expression of savage lust.  Looking at his waist, you notice he has a bit of a potbelly, no doubt the fruits of heavy drinking, judging by the almost overwhelming smell of booze and sex that emanates from him.  Further down you see his legs are the coarse, bristly-furred legs of a bipedal goat, cloven hooves pawing the ground impatiently, sizable manhood swaying freely in the breeze.";
        // this.plural = false;
        this.createCock(Satyr.rand(13) + 14, 1.5 + Satyr.rand(20) / 2, CockTypesEnum.HUMAN);
        this.balls = 2;
        this.ballSize = 2 + Satyr.rand(13);
        this.cumMultiplier = 1.5;
        this.hoursSinceCum = this.ballSize * 10;
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_NORMAL;
        this.createStatusAffect(StatusAffects.BonusACapacity, 20, 0, 0, 0);
        this.tallness = Satyr.rand(37) + 64;
        this.hipRating = HIP_RATING_AVERAGE;
        this.buttRating = BUTT_RATING_AVERAGE + 1;
        this.lowerBody = LOWER_BODY_TYPE_HOOFED;
        this.skinTone = "tan";
        this.hairColor = Satyr.randomChoice("black", "brown");
        this.hairLength = 3 + Satyr.rand(20);
        this.faceType = FACE_COW_MINOTAUR;
        this.initStrTouSpeInte(75, 70, 110, 70);
        this.initLibSensCor(60, 35, 45);
        this.weaponName = "fist";
        this.weaponVerb = "punch";
        this.armorName = "thick fur";
        this.bonusHP = 300;
        this.lust = 20;
        this.lustVuln = 0.3;
        this.temperment = Satyr.TEMPERMENT_LUSTY_GRAPPLES;
        this.level = 14;
        this.gems = Satyr.rand(25) + 25;
        this.drop = new ChainedDrop().add(this.consumables.INCUBID, 1 / 2);
        this.tailType = TAIL_TYPE_COW;
        this.checkMonster();
    }
}
