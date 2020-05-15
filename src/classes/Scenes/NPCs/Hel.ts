import { trace } from "../../../console";
import {
    ANAL_LOOSENESS_VIRGIN,
    ANAL_WETNESS_DRY,
    BUTT_RATING_LARGE,
    HIP_RATING_CURVY,
    TAIL_TYPE_LIZARD,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_WETNESS_NORMAL,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { ChainedDrop } from "../../internals/ChainedDrop";
import { Monster } from "../../Monster";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";

export class Hel extends Monster {
    private helAttack(): void {
        let damage: number;
        // return to combat menu when finished
        this.doNext(this.game.playerMenu);
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Hel.rand(3) < 1) {
            this.outx(
                `${this.capitalA + this.short} completely misses you with a blind attack!\n`,
                false
            );
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx("You nimbly dodge the salamander's massive sword thrust!");
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && Hel.rand(100) < 10) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s attack.\n`,
                false
            );
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Hel.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings, you anticipate and sidestep ${this.a}${this.short}' attacks.\n`,
                false
            );
        }
        // Determine if cat'ed
        else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Hel.rand(100) < 6) {
            this.outx(
                `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}`
            );
        }
        // Determine damage - str modified by enemy toughness!
        else {
            damage = Math.floor(
                this.str +
                    this.weaponAttack -
                    Hel.rand(this.player.tou / 2) -
                    this.player.armorDef / 2
            );
            if (damage > 0) damage = this.player.takeDamage(damage);
            // No damage
            if (damage <= 0) {
                damage = 0;
                // Due to toughness or amor...
                if (Hel.rand(this.player.armorDef + this.player.tou) < this.player.armorDef)
                    this.outx(
                        `You absorb and deflect every ${this.weaponVerb} with your ${this.player.armorName}.`
                    );
                else
                    this.outx(
                        `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throws at you.`
                    );
            }
            // Take Damage
            else
                this.outx(
                    `The salamander lunges at you, sword swinging in a high, savage arc.  You attempt to duck her attack, but she suddenly spins about mid-swing, bringing the sword around on a completely different path.  It bites deep into your flesh, sending you stumbling back. (${damage})`
                );
            if (damage > 0) {
                if (this.lustVuln > 0 && this.player.armorName == "barely-decent bondage straps") {
                    this.outx(
                        `\n${this.capitalA}${this.short} brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.`,
                        false
                    );
                    this.lust += 5 * this.lustVuln;
                }
            }
        }

        this.statScreenRefresh();
        this.outx("\n", false);
        this.combatRoundOver();
    }

    // Attack 2 – Tail Slap (Hit)
    // low dodge chance, lower damage
    private helAttack2(): void {
        let damage: number;
        // return to combat menu when finished
        this.doNext(this.game.playerMenu);
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Hel.rand(3) < 1) {
            this.outx(
                `${this.capitalA + this.short} completely misses you with a blind attack!\n`,
                false
            );
            return;
        }
        // Determine if dodged!
        if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 83
        ) {
            this.outx(
                "The salamander rushes at you, knocking aside your defensive feint and trying to close the distance between you.  She lashes out at your feet with her tail, and you're only just able to dodge the surprise attack.",
                false
            );
            return;
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Hel.rand(100) < 5) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s tail-swipe.\n`,
                false
            );
            return;
        }
        // ("Misdirection"
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Hel.rand(100) < 5 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings, you anticipate and sidestep ${this.a}${this.short}' tail-swipe.\n`,
                false
            );
            return;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Hel.rand(100) < 3) {
            this.outx(
                "With your incredible flexibility, you squeeze out of the way of a tail-swipe!",
                false
            );
            return;
        }
        // Determine damage - str modified by enemy toughness!
        damage = Math.floor(this.str - Hel.rand(this.player.tou) - this.player.armorDef);
        if (damage > 0) damage = this.player.takeDamage(damage);
        // No damage
        if (damage <= 0) {
            damage = 0;
            // Due to toughness or amor...
            if (Hel.rand(this.player.armorDef + this.player.tou) < this.player.armorDef)
                this.outx("The salamander's tail-swipe harmlessly deflects off your armor!");
            else
                this.outx(
                    "The salamander's tail-swipe hits you but fails to move or damage you.",
                    false
                );
        }
        // Take Damage
        else
            this.outx(
                `The salamander rushes at you, knocking aside your defensive feint and sliding in past your guard.  She lashes out at your feet with her tail, and you can feel the heated wake of the fiery appendage on your ensuing fall toward the now-smouldering grass. (${damage})`
            );
        if (damage > 0) {
            if (this.lustVuln > 0 && this.player.armorName == "barely-decent bondage straps") {
                this.outx(
                    `\n${this.capitalA}${this.short} brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.`,
                    false
                );
                this.lust += 5 * this.lustVuln;
            }
        }
        this.statScreenRefresh();
        this.outx("\n", false);
        this.combatRoundOver();
    }

    private helCleavage(): void {
        // FAIL
        if (
            (this.player.findPerk(PerkLib.Flexibility) >= 0 && Hel.rand(100) < 6) ||
            (this.player.findPerk(PerkLib.Evade) >= 0 && Hel.rand(100) < 10) ||
            (this.player.spe - this.spe > 0 &&
                Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80)
        ) {
            this.outx(
                "To your surprise, the salamander suddenly pulls up her top, letting her hefty breasts hang free in the air; her small, bright pink nipples quickly harden from either arousal or temperature.  Before you can take your eyes off her impressive rack, she jumps at you.  One of her scaled arms reaches around your waist, and the other toward your head, but you roll away from her grip and push her bodily away.  She staggers a moment, but then quickly yanks the jangling bikini top back down with a glare.\n",
                false
            );
        }
        // Attack 3 – Lust – Cleavage (Failure)
        else {
            this.outx(
                "To your surprise, the salamander suddenly yanks up her top, letting her hefty breasts hang free in the air; her small, bright pink nipples quickly harden from either arousal or temperature.  Before you can take your eyes off her impressive rack, she jumps at you.  One of her scaled arms encircles your waist, and the other forcefully shoves your face into her cleavage.  She jiggles her tits around your face for a moment before you're able to break free, though you can feel a distinct heat rising in your loins.  As quickly as they were revealed, the breasts are concealed again and your opponent is ready for more combat!",
                false
            );
            let lust: number =
                20 + Hel.rand(10) + this.player.sens / 10 + Hel.rand(this.player.lib / 20);
            this.game.dynStats("lus", lust);
            // Apply resistance
            lust *= this.game.lustPercent() / 100;
            // Clean up
            lust = Math.round(lust * 10) / 10;
            this.outx(` (+${lust} lust)\n`, false);
        }
        this.combatRoundOver();
    }
    protected performCombatAction(): void {
        trace("Hel Perform Combat Action Called");
        const select: number = Hel.rand(3);
        trace(`Selected: ${select}`);
        switch (select) {
            case 0:
                this.helAttack();
                break;
            case 1:
                this.helAttack2();
                break;
            default:
                this.helCleavage();
                break;
        }
    }

    public defeated(hpVictory: boolean): void {
        if (this.findStatusAffect(StatusAffects.Sparring) >= 0)
            this.game.helFollower.PCBeatsUpSalamanderSparring();
        else this.game.helScene.beatUpHel();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nHelia waits it out in stoic silence...");
            this.doNext(this.game.endLustLoss);
        } else {
            if (this.findStatusAffect(StatusAffects.Sparring) >= 0)
                this.game.helFollower.loseToSparringHeliaLikeAButtRapedChump();
            else this.game.helScene.loseToSalamander();
        }
    }

    public constructor() {
        super();
        if (this.game.flags[kFLAGS.HEL_TALKED_ABOUT_HER] == 1) {
            this.a = "";
            this.short = "Hel";
        } else {
            this.a = "the ";
            this.short = "salamander";
        }
        this.imageName = "hel";
        this.long =
            "You are fighting a (literally) smoking hot salamander – a seven foot tall woman with crimson scales covering her legs, back, and forearms, with a tail swishing menacingly behind her, ablaze with a red-hot fire.  Her red hair whips wildly around her slender shoulders, occasionally flitting over her hefty E-cup breasts, only just concealed within a scale-covered bikini top.  Bright red eyes focus on you from an almost-human face as she circles you, ready to close in for the kill.  Her brutal, curved sword is raised to her side, feinting at you between genuine attacks.";
        this.createVagina(true, VAGINA_WETNESS_NORMAL, VAGINA_LOOSENESS_NORMAL);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 85, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("E+"));
        this.ass.analLooseness = ANAL_LOOSENESS_VIRGIN;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 85, 0, 0, 0);
        this.tallness = 90;
        this.hipRating = HIP_RATING_CURVY + 2;
        this.buttRating = BUTT_RATING_LARGE + 1;
        this.skinTone = "dusky";
        this.hairColor = "red";
        this.hairLength = 13;
        this.initStrTouSpeInte(80, 70, 75, 60);
        this.initLibSensCor(65, 25, 30);
        this.weaponName = "sword";
        this.weaponVerb = "slashing blade";
        this.weaponAttack = 20;
        this.armorName = "scales";
        this.armorDef = 14;
        this.armorPerk = "";
        this.armorValue = 50;
        this.bonusHP = 275;
        this.lust = 30;
        this.lustVuln = 0.35;
        this.temperment = Hel.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 16;
        this.gems = 10 + Hel.rand(5);
        this.drop = new ChainedDrop()
            .add(this.armors.CHBIKNI, 1 / 20)
            .add(this.consumables.REPTLUM, 0.7);
        this.tailType = TAIL_TYPE_LIZARD;
        this.tailRecharge = 0;
        this.createStatusAffect(StatusAffects.Keen, 0, 0, 0, 0);
        this.checkMonster();
    }
}
