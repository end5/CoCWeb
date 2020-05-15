import {
    ANAL_LOOSENESS_VIRGIN,
    ANAL_WETNESS_DRY,
    BUTT_RATING_TIGHT,
    HIP_RATING_AMPLE,
    SKIN_TYPE_FUR,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_WETNESS_NORMAL,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { CocSettings } from "../../CoC_Settings";
import { Monster } from "../../Monster";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";

/**
 * ...
 *
 * @author ...
 */
export class Amily extends Monster {
    protected performCombatAction(): void {
        if (this.findStatusAffect(StatusAffects.Concentration) < 0 && Amily.rand(4) == 0)
            this.amilyConcentration();
        else if (Amily.rand(3) == 0) this.amilyDartGo();
        else if (Amily.rand(2) == 0) this.amilyDoubleAttack();
        else this.amilyAttack();
    }

    // COMBAT AMILY STUFF
    // (Has regular attack)
    public amilyAttack(): void {
        let dodged = 0;
        let damage: number;
        // return to combat menu when finished
        this.doNext(this.game.playerMenu);
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Amily.rand(3) < 2) {
            this.outx(
                `${this.capitalA + this.short} completely misses you with a blind attack!\n`,
                false
            );
            this.game.combatRoundOver();
            return;
        }
        // Determine if dodged!
        if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            dodged = 1;
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Amily.rand(100) < 10) {
            dodged = 2;
        }
        // ("Misdirection"
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Amily.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            dodged = 3;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Amily.rand(100) < 6) {
            dodged = 4;
        }
        // Determine damage - str modified by enemy toughness!
        damage = Math.floor(
            this.str + this.weaponAttack - Math.random() * (this.player.tou + this.player.armorDef)
        );
        // Dodged
        if (dodged > 0) {
            this.outx(
                "Amily dashes at you and swipes her knife, but you quickly sidestep the blow.",
                false
            );
            // Add tags for miss/evade/flexibility/etc.
            switch (dodged) {
                case 1:
                    this.outx(" [Dodge]");
                    break;
                case 2:
                    this.outx(" [Evade]");
                    break;
                case 3:
                    this.outx(" [Misdirect]");
                    break;
                case 4:
                    this.outx(" [Flexibility]");
                    break;
                default:
                    CocSettings.error();
                    this.outx(" <b>[ERROR]</b>");
                    break;
            }
        }
        // Blocked
        else if (damage <= 0) {
            damage = 0;
            // Due to toughness or amor...
            if (Amily.rand(this.player.armorDef + this.player.tou) < this.player.armorDef)
                this.outx(
                    `Your ${this.player.armorName} absorb and deflect every ${this.weaponVerb} from ${this.a}${this.short}.`
                );
            else
                this.outx(
                    `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throws at you.`
                );
        }
        // Got hit!
        else {
            damage = this.player.takeDamage(damage);
            this.outx(`Amily dashes at you and swipes her knife, cutting you (${damage}).`);
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
        this.game.statScreenRefresh();
        this.outx("\n", false);
        this.game.combatRoundOver();
    }

    // (Special Attacks)
    // -Double Attack: Same as a normal attack, but hits twice.
    public amilyDoubleAttack(): void {
        let dodged = 0;
        let damage = 0;
        // return to combat menu when finished
        this.doNext(this.game.playerMenu);
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Amily.rand(3) < 2) {
            dodged++;
        }
        // Determine if dodged!
        if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            dodged++;
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Amily.rand(100) < 10) {
            dodged++;
        }
        // ("Misdirection"
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Amily.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            dodged++;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Amily.rand(100) < 6) {
            dodged++;
        }
        // Get hit!
        if (dodged < 2) {
            // Determine damage - str modified by enemy toughness!
            damage = Math.floor(
                this.str +
                    this.weaponAttack -
                    Math.random() * (this.player.tou + this.player.armorDef)
            );
            // Double damage if no dodge.
            if (dodged == 0) damage *= 2;
            // Blocked?
            if (damage == 0) {
                this.outx(
                    "Amily dashes at you and slashes at you twice in the time it would take most to throw a single blow, but she can't cut deep enough to wound you!",
                    false
                );
            }
            // NOT BLOCKED!
            else {
                damage = this.player.takeDamage(damage);
                if (dodged > 0)
                    this.outx(
                        "Amily dashes at you and quickly slashes you twice; you manage to avoid the first blow, but the second one hits home, cutting you",
                        false
                    );
                else
                    this.outx(
                        "Amily dashes at you and slashes at you twice in the time it would take most to throw a single blow",
                        false
                    );
                this.outx(` (${damage})!`);
            }
        }
        // Dodge all!
        else
            this.outx(
                "Amily dashes at you and quickly slashes you twice, but you quickly sidestep her first blow and jump back to avoid any follow-ups.",
                false
            );

        this.game.combatRoundOver();
    }

    // -Poison Dart: Deals speed and str damage to the PC. (Not constant)
    private amilyDartGo(): void {
        let dodged = 0;
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Amily.rand(3) < 2) {
            this.outx(
                `${
                    this.capitalA + this.short
                } completely misses you with a blind attack from her dartgun!\n`,
                false
            );
            this.game.combatRoundOver();
            return;
        }
        // Determine if dodged!
        if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            dodged = 1;
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Amily.rand(100) < 10) {
            dodged = 2;
        }
        // ("Misdirection"
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Amily.rand(100) < 15 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            dodged = 3;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Amily.rand(100) < 15) {
            dodged = 4;
        }
        // Dodged
        if (dodged > 0) {
            this.outx(
                "Amily dashes at you and swipes her knife rather slowly. You easily dodge the attack; but it was all a feint, her other hands tries to strike at you with a poisoned dart. Luckily you manage to avoid it.",
                false
            );
            // Add tags for miss/evade/flexibility/etc.
            switch (dodged) {
                case 1:
                    this.outx(" [Dodge]");
                    break;
                case 2:
                    this.outx(" [Evade]");
                    break;
                case 3:
                    this.outx(" [Misdirect]");
                    break;
                case 4:
                    this.outx(" [Flexibility]");
                    break;
                default:
                    CocSettings.error("");
                    this.outx(" <b>[ERROR]</b>");
                    break;
            }
        }
        // Else hit!
        else {
            this.outx(
                "Amily dashes at you and swipes her knife at you, surprisingly slowly.  You easily dodge the attack; but it was a feint - her other hand tries to strike at you with a poisoned dart. However, she only manages to scratch you, only causing your muscles to grow slightly numb.",
                false
            );
            // Set status
            if (this.player.findStatusAffect(StatusAffects.AmilyVenom) < 0)
                this.player.createStatusAffect(StatusAffects.AmilyVenom, 0, 0, 0, 0);
            let poison: number = 2 + Amily.rand(5);
            while (poison > 0) {
                poison--;
                if (this.player.str >= 2) {
                    this.player.str--;
                    Amily.showStatDown("str");
                    // strDown.visible = true;
                    // strUp.visible = false;
                    this.player.addStatusValue(StatusAffects.AmilyVenom, 1, 1);
                }
                if (this.player.spe >= 2) {
                    this.player.spe--;
                    Amily.showStatDown("spe");
                    // speDown.visible = true;
                    // speUp.visible = false;
                    this.player.addStatusValue(StatusAffects.AmilyVenom, 2, 1);
                }
            }
            // If PC is reduced to 0 Speed and Strength, normal defeat by HP plays.
            if (this.player.spe <= 2 && this.player.str <= 2) {
                this.outx(
                    "  You've become so weakened that you can't even make an attempt to defend yourself, and Amily rains blow after blow down upon your helpless form.",
                    false
                );
                this.player.takeDamage(8999);
            }
        }
        this.game.combatRoundOver();
    }

    // Concentrate: always avoids the next attack. Can be disrupted by tease/seduce.
    private amilyConcentration(): void {
        this.outx(
            "Amily takes a deep breath and attempts to concentrate on your movements.",
            false
        );
        this.createStatusAffect(StatusAffects.Concentration, 0, 0, 0, 0);
        this.game.combatRoundOver();
    }

    // (if PC uses tease/seduce after this)
    // Deals big lust increase, despite her resistance.
    public teased(lustDelta: number): void {
        if (this.findStatusAffect(StatusAffects.Concentration) >= 0) {
            this.outx(
                "Amily flushes hotly; her concentration only makes her pay more attention to your parts!",
                false
            );
            lustDelta += 25 + lustDelta;
            this.removeStatusAffect(StatusAffects.Concentration);
            this.applyTease(lustDelta);
        } else {
            super.teased(lustDelta);
        }
    }

    public defeated(_hpVictory: boolean): void {
        this.game.amilyScene.conquerThatMouseBitch();
    }

    public constructor() {
        super();
        this.a = "";
        this.short = "Amily";
        this.imageName = "amily";
        this.long =
            "You are currently fighting Amily. The mouse-morph is dressed in rags and glares at you in rage, knife in hand. She keeps herself close to the ground, ensuring she can quickly close the distance between you two or run away.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_NORMAL, VAGINA_LOOSENESS_NORMAL);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 48, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("C"));
        this.ass.analLooseness = ANAL_LOOSENESS_VIRGIN;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.tallness = 4 * 12;
        this.hipRating = HIP_RATING_AMPLE;
        this.buttRating = BUTT_RATING_TIGHT;
        this.skinTone = "tawny";
        this.skinType = SKIN_TYPE_FUR;
        // this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_FUR];
        this.hairColor = "brown";
        this.hairLength = 5;
        this.initStrTouSpeInte(30, 30, 85, 60);
        this.initLibSensCor(45, 45, 10);
        this.weaponName = "knife";
        this.weaponVerb = "slash";
        this.weaponAttack = 6;
        this.armorName = "rags";
        this.armorDef = 1;
        this.bonusHP = 20;
        this.lust = 20;
        this.lustVuln = 0.85;
        this.level = 4;
        this.gems = 2 + Amily.rand(5);
        this.drop = this.NO_DROP;
        this.checkMonster();
    }
}
