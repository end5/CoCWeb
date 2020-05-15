import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_SLIME_DROOLING,
    BUTT_RATING_LARGE,
    HIP_RATING_AMPLE,
    TAIL_TYPE_SPIDER_ADBOMEN,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_WETNESS_SLICK,
} from "../../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class SpiderMorphMob extends Monster {
    // ==============================
    // SPOIDAH HORDE COMBAT SHIZZLE HERE!
    // ==============================
    private spiderStandardAttack(): void {
        // SPIDER HORDE ATTACK - Miss (guaranteed if turns 1-3 and PC lost to Kiha)
        if (
            this.findStatusAffect(StatusAffects.MissFirstRound) >= 0 ||
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        ) {
            this.removeStatusAffect(StatusAffects.MissFirstRound);
            this.outx(
                "A number of spiders rush at you, trying to claw and bite you.  You manage to beat them all back, though, with some literal covering fire from Kiha.",
                false
            );
        }
        // SPIDER HORDE ATTACK - Hit
        else {
            this.outx(
                "A number of spiders rush at you, trying to claw and bite you.  You manage to knock most of them away, but a few nasty hits manage to punch through your [armorName].  ",
                false
            );
            // Determine damage - str modified by enemy toughness!
            let damage: number =
                Math.floor(
                    this.str +
                        this.weaponAttack -
                        SpiderMorphMob.rand(this.player.tou) -
                        this.player.armorDef
                ) + 20;
            if (damage > 0) damage = this.player.takeDamage(damage);
            if (damage <= 0) {
                damage = 0;
                if (
                    SpiderMorphMob.rand(this.player.armorDef + this.player.tou) <
                    this.player.armorDef
                )
                    this.outx(
                        `You absorb and deflect every ${this.weaponVerb} with your ${this.player.armorName}.`
                    );
                else
                    this.outx(
                        `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throws at you.`
                    );
            } else if (damage < 6)
                this.outx(`You are struck a glancing blow by ${this.a}${this.short}! (${damage})`);
            else if (damage < 11)
                this.outx(`${this.capitalA + this.short} wounds you! (${damage})`);
            else if (damage < 21)
                this.outx(
                    `${this.capitalA + this.short} staggers you with the force of ${
                        this.pronoun3
                    } ${this.weaponVerb}! (${damage})`
                );
            else if (damage > 20) {
                this.outx(`${this.capitalA + this.short} <b>mutilate`);
                this.outx(
                    `</b> you with ${this.pronoun3} powerful ${this.weaponVerb}! (${damage})`
                );
            }
            if (damage > 0) {
                if (this.lustVuln > 0 && this.player.armorName == "barely-decent bondage straps") {
                    if (!this.plural)
                        this.outx(
                            `\n${this.capitalA}${this.short} brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.`,
                            false
                        );
                    else
                        this.outx(
                            `\n${this.capitalA}${this.short} brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.`,
                            false
                        );
                    this.lust += 10 * this.lustVuln;
                }
            }
            this.statScreenRefresh();
        }
        this.kihaSPOIDAHAI();
    }

    // SPIDER HORDE WEB - Hit
    private spoidahHordeWebLaunchahs(): void {
        // SPIDER HORDE WEB - Miss (guaranteed if turns 1-3 and PC lost to Kiha)
        if (
            this.findStatusAffect(StatusAffects.MissFirstRound) >= 0 ||
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        ) {
            this.outx(
                "One of the driders launches a huge glob of webbing right at you!  Luckily, Kiha manages to burn it out of the air with a well-timed gout of flame!",
                false
            );
            this.combatRoundOver();
        } else {
            this.outx(
                "Some of the spiders and driders launch huge globs of wet webbing right at you, hitting you in the torso!  You try to wiggle out, but it's no use; you're stuck like this for now.  Though comfortingly, the driders' open stance and self-satisfaction allow Kiha to blast them in the side with a huge conflagration!",
                false
            );
            // (PC cannot attack or use spells for one turn; can use Magical Special and Possess)
            this.player.createStatusAffect(StatusAffects.UBERWEB, 0, 0, 0, 0);
            this.HP -= 250;
            this.combatRoundOver();
        }
    }

    private kihaSPOIDAHAI(): void {
        this.outx("[pg]");
        this.game.spriteSelect(72);
        this.outx(
            "While they're tangled up with you, however, Kiha takes the opportunity to get in a few shallow swings with her axe, to the accompaniment of crunching chitin.",
            false
        );
        // horde loses HP
        this.HP -= 50;
        this.combatRoundOver();
    }

    protected performCombatAction(): void {
        this.game.spriteSelect(72);
        if (SpiderMorphMob.rand(2) == 0 || this.player.findStatusAffect(StatusAffects.UBERWEB) >= 0)
            this.spiderStandardAttack();
        else this.spoidahHordeWebLaunchahs();
    }

    public defeated(hpVictory: boolean): void {
        this.game.kihaFollower.beatSpiderMob();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx(
                "\n\nThe spiders smile to one at another as they watch your display, then close in..."
            );
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.kihaFollower.loseToSpiderMob();
        }
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "mob of spiders-morphs";
        this.imageName = "spidermorphmob";
        this.long = `You are fighting a horde of spider-morphs!  A group of some two-dozen spiders and driders approaches you, all baring their teeth.  A pair of large, powerful driders lead the group, their corrupt, lusty stares sending shivers up your spine.  While ${
            this.player.level <= 13
                ? "you'd never face such a large horde on your own"
                : "you could probably handle them alone"
        }, you have a powerful ally in this fight - the dragoness Kiha!`;
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
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;
        this.tallness = SpiderMorphMob.rand(8) + 70;
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "red";
        this.hairColor = "black";
        this.hairLength = 15;
        this.initStrTouSpeInte(60, 50, 99, 99);
        this.initLibSensCor(35, 35, 20);
        this.weaponName = "claws";
        this.weaponVerb = "claws";
        this.armorName = "chitin";
        this.bonusHP = 1200;
        this.lustVuln = 0.2;
        this.temperment = SpiderMorphMob.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 18;
        this.gems = SpiderMorphMob.rand(25) + 40;
        this.special1 = this.game.packAttack;
        this.special2 = this.game.lustAttack;
        this.tailType = TAIL_TYPE_SPIDER_ADBOMEN;
        this.drop = this.NO_DROP;
        this.checkMonster();
    }
}
