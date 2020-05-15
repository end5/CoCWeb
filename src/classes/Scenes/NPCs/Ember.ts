import {
    ANAL_LOOSENESS_NORMAL,
    ANAL_WETNESS_DRY,
    BUTT_RATING_LARGE,
    HIP_RATING_AMPLE,
    HORNS_DRACONIC_X4_12_INCH_LONG,
    TAIL_TYPE_DRACONIC,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_WETNESS_SLAVERING,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { CockTypesEnum } from "../../CockTypesEnum";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { Monster } from "../../Monster";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";

export class Ember extends Monster {
    private emberMF(male: string, female: string): string {
        return this.game.emberScene.emberMF(male, female);
    }
    // The Actual Ember Fight (Z)
    // PC can't use any sexual moves in this battle. This means anything that deals or affects Ember's lust in any way.
    // It doesn't make sense to affect Ember's lust due to the nature of the combat, however it IS possible and encouraged to use lust moves when fighting Bimbo or Corrupt Ember.

    // PC shouldn't lose their turn for doing this, unless you want to penalize them Fen.
    private emberReactsToLustiness(): void {
        // (if PC uses any attack designed to increase Ember's lust)
        this.outx(
            `The dragon moans, weaving softly from side to side, eyes glazed and tongue lolling at the intimate prospect of sex... but then, to your surprise, ${this.emberMF(
                "he",
                "she"
            )} visibly shakes it off and recomposes ${this.emberMF(
                "him",
                "her"
            )}self, frowning at you.`
        );
        this.outx(
            "\n\n\"<i>W-what do you think you're doing!?  I'm not some ordinary monster!  Don't think you can seduce me out of a battle!</i>\""
        );
        this.outx(
            `\n\nDespite Ember's initial display; you realize that, Ember was still a ways from ${this.emberMF(
                "his",
                "her"
            )} peak arousal.  The dragon flies off in a huff, irritated that you would stoop to fighting in a such a manner.`
        );
        if (this.player.lib >= 50) this.outx("  How boring.");
        this.gems = 0;
        this.XP = 0;
        this.HP = 0;
        this.game.cleanupAfterCombat();
    }
    // Ember Attacks:
    private emberAttack(): void {
        // Basic attack, average damage, average accuracy
        this.outx(
            `With a growl, the dragon lashes out in a ferocious splay-fingered slash, ${this.emberMF(
                "his",
                "her"
            )} claws poised to rip into your flesh.  `
        );
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Ember.rand(2) == 0) {
            this.outx(`${this.capitalA + this.short} completely misses you with a blind attack!`);
        }
        // Miss/dodge
        else if (
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        )
            this.outx("You dodge aside at the last second and Ember's claws whistle past you.");
        else {
            let damage: number = Math.floor(
                this.str + this.weaponAttack - Ember.rand(this.player.tou) - this.player.armorDef
            );
            if (damage <= 0)
                this.outx("Ember's claws scrape noisily but harmlessly off your [armor].");
            else {
                damage = this.player.takeDamage(damage);
                this.outx("Ember's claws rip into you, leaving stinging wounds.");
                this.outx(` (${damage})`);
            }
        }
        this.combatRoundOver();
    }

    // Dragon Breath: Very rare attack, very high damage
    private embersSupahSpecialDragonBreath(): void {
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Ember.rand(2) == 0) {
            // Blind Ember:
            this.outx(
                `The blinded dragon tracks you with difficulty as you sprint around the landscape; seeing an opportunity, you strafe around ${this.emberMF(
                    "his",
                    "her"
                )} side, planting yourself behind a large flat boulder near ${this.emberMF(
                    "him",
                    "her"
                )} and pelting ${this.emberMF(
                    "him",
                    "her"
                )} with a small rock.  The scream as the dragon turns the magical conflagration toward you, only to have it hit the rock and blow up in ${this.emberMF(
                    "his",
                    "her"
                )} face, is quite satisfying.`
            );
            // (Ember HP damage)
            this.game.doDamage(50);
        } else {
            this.outx(
                `Ember inhales deeply, then ${this.emberMF(
                    "his",
                    "her"
                )} jaws open up, releasing streams of fire, ice and lightning; magical rather than physical, the gaudy displays lose cohesion and amalgamate into a column of raw energy as they fly at you.`
            );
            if (
                this.combatMiss() ||
                this.combatEvade() ||
                this.combatFlexibility() ||
                this.combatMisdirect()
            )
                this.outx(
                    "  It's a narrow thing, but you manage to throw yourself aside at the last moment.  Fortunately, the energy whirling around and tearing up the soil blinds Ember to your escape until you have recovered and are ready to keep fighting."
                );
            else {
                this.outx(
                    "  The pain as the deadly combination washes over you is indescribable.  It's a miracle that you endure it, and even Ember looks amazed to see you still standing."
                );
                let damage: number = 100 + Ember.rand(100);
                damage = this.player.takeDamage(damage);
                this.outx(` (${damage})`);
            }
        }
        this.combatRoundOver();
    }

    // Tailslap: Rare attack, high damage, low accuracy
    private emberTailSlap(): void {
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.outx(
                `${this.capitalA + this.short} completely misses you with a blind tail-slap!`
            );
            this.combatRoundOver();
            return;
        }
        this.outx(
            `Ember suddenly spins on ${this.emberMF(
                "his",
                "her"
            )} heel, the long tail that splays behind ${this.emberMF(
                "him",
                "her"
            )} lashing out like a whip.  As it hurtles through the air towards you, your attention focuses on the set of spikes suddenly protruding from its tip!`
        );
        if (
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect() ||
            Ember.rand(2) == 0
        ) {
            this.outx("  You ");
            if (Ember.rand(2) == 0) this.outx("duck under");
            else this.outx("leap over");
            this.outx(
                ` the tail at the last moment, causing Ember to lose control of ${this.emberMF(
                    "his",
                    "her"
                )} own momentum and stumble.`
            );
        } else {
            let damage: number = Math.floor(
                this.str +
                    this.weaponAttack +
                    100 -
                    Ember.rand(this.player.tou) -
                    this.player.armorDef
            );
            this.outx(
                "  The tail slams into you with bone-cracking force, knocking you heavily to the ground even as the spines jab you wickedly.  You gasp for breath in pain and shock, but manage to struggle to your feet again."
            );
            damage = this.player.takeDamage(damage);
            this.outx(` (${damage})`);
        }
        this.combatRoundOver();
    }

    // Dragon Force: Tainted Ember only
    private dragonFarce(): void {
        // Effect: Stuns the PC for one turn and deals some damage, not much though. (Note: PC's version of this does something different and Ember has no cooldown to use this again. Obviously do not spam or peeps will rage.)
        // Description:
        this.outx(
            `Ember bares ${this.emberMF(
                "his",
                "her"
            )} teeth and releases a deafening roar; a concussive blast of force heads straight for you!`
        );
        this.outx(
            "  Try as you might, you can't seem to protect yourself; and the blast hits you like a stone, throwing you to the ground."
        );
        if (this.player.findPerk(PerkLib.Resolute) < 0) {
            this.outx(
                "  Your head swims - it'll take a moment before you can regain your balance."
            );
            // Miss: You quickly manage to jump out of the way and watch in awe as the blast gouges into the ground you were standing on mere moments ago.
            this.player.createStatusAffect(StatusAffects.Stunned, 0, 0, 0, 0);
        }
        this.createStatusAffect(StatusAffects.StunCooldown, 4, 0, 0, 0);
        let damage: number = 10 + Ember.rand(10);
        damage = this.player.takeDamage(damage);
        this.outx(` (${damage})`);
        this.combatRoundOver();
    }

    protected performCombatAction(): void {
        if (this.lust >= 40) {
            this.emberReactsToLustiness();
            return;
        }
        if (this.findStatusAffect(StatusAffects.StunCooldown) >= 0) {
            this.addStatusValue(StatusAffects.StunCooldown, 1, -1);
            if (this.statusAffectv1(StatusAffects.StunCooldown) <= 0)
                this.removeStatusAffect(StatusAffects.StunCooldown);
        } else if (Ember.rand(3) == 0) {
            this.dragonFarce();
            return;
        }
        if (Ember.rand(4) == 0) this.embersSupahSpecialDragonBreath();
        else if (Ember.rand(3) == 0) this.emberTailSlap();
        else this.emberAttack();
    }

    public defeated(hpVictory: boolean): void {
        // Hackers gonna hate. Tested and working as intended.
        if (hpVictory) this.game.emberScene.beatEmberSpar();
        else this.emberReactsToLustiness();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.emberScene.loseToEmberSpar();
    }

    public constructor() {
        super();
        this.a = " ";
        this.short = "Ember";
        this.imageName = "ember";
        this.long = `You are currently 'battling' Ember, the dragon, in a playfight.  At least, that was the intention.  The way ${this.emberMF(
            "he",
            "she"
        )} lashes ${this.emberMF(
            "his",
            "her"
        )} tail along the ground, with claws spread and teeth bared ferociously, makes you wonder.`;
        // this.plural = false;
        const gender: number = this.game.flags[kFLAGS.EMBER_GENDER];
        if (gender == 0) {
            this.pronoun1 = "she";
            this.pronoun2 = "her";
            this.pronoun3 = "her";
        }
        if (gender == 1 || gender == 3) {
            this.createCock(16, 2, CockTypesEnum.DRAGON);
            this.balls = 2;
            this.ballSize = 4;
            this.cumMultiplier = 3;
            // this.hoursSinceCum = 0;
        }
        if (gender >= 2) {
            this.createVagina(
                this.game.flags[kFLAGS.EMBER_PUSSY_FUCK_COUNT] == 0,
                VAGINA_WETNESS_SLAVERING,
                VAGINA_LOOSENESS_LOOSE
            );
            this.createBreastRow(Appearance.breastCupInverse("F"));
        } else {
            this.createBreastRow(Appearance.breastCupInverse("flat"));
        }
        this.ass.analLooseness = ANAL_LOOSENESS_NORMAL;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.tallness = Ember.rand(8) + 70;
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "red";
        this.hairColor = "black";
        this.hairLength = 15;
        this.initStrTouSpeInte(75, 75, 75, 75);
        this.initLibSensCor(50, 35, this.game.flags[kFLAGS.EMBER_COR]);
        this.weaponName = "claws";
        this.weaponVerb = "claw";
        this.weaponAttack = 30;
        this.armorName = "scales";
        this.armorDef = 40;
        this.bonusHP = 600;
        this.lust = 20;
        this.lustVuln = 0.25;
        this.temperment = Ember.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 15;
        this.gems = 0;
        this.hornType = HORNS_DRACONIC_X4_12_INCH_LONG;
        this.horns = 4;
        this.tailType = TAIL_TYPE_DRACONIC;
        this.drop = this.NO_DROP;
        this.checkMonster();
    }
}
