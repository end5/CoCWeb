import { Appearance } from "../../Appearance";
import { Monster } from "../../Monster";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";

/**
 * Created by aimozg on 18.01.14.
 */

export class AbstractSuccubus extends Monster {
    protected whipAttack(): void {
        if (this.findStatusAffect(StatusAffects.WhipReady) >= 0) {
            // Blind dodge change
            if (this.findStatusAffect(StatusAffects.Blind) >= 0) {
                this.outputText(
                    this.capitalA +
                        this.short +
                        " swings her whip at you wildly, totally missing due to her blindness!!",
                    false
                );
                this.combatRoundOver();
                return;
            }
            this.outputText(
                "Grinning deviously, the succubus cracks her whip with expert skill, landing a painful blow on your ",
                false
            );
            const temp: number = AbstractSuccubus.rand(6);
            // Whip yo ass!
            if (temp == 0) {
                this.outputText("ass (4)", false);
                this.player.takeDamage(4);
                this.game.dynStats("lus", 6 + Math.floor(this.player.sens / 20));
            }
            // Whip yo tits!
            if (temp == 1) {
                if (this.player.breastRows.length > 0 && this.player.biggestTitSize() > 0)
                    this.outputText(this.player.allBreastsDescript() + " (9)", false);
                else this.outputText("chest (9)", false);
                this.player.takeDamage(9);
                this.game.dynStats("lus", 4 + Math.floor(this.player.sens / 15));
            }
            // Whip yo groin
            if (temp == 2) {
                if (this.player.gender == 0) {
                    this.outputText("groin (5)", false);
                    this.player.takeDamage(5);
                }
                if (this.player.gender == 1) {
                    this.outputText(
                        "groin, dealing painful damage to your " +
                            this.player.multiCockDescriptLight() +
                            ", doubling you over in agony (" +
                            Math.floor((this.player.tou * 2 + 50) / 4) +
                            ")",
                        false
                    );
                    this.game.dynStats("lus", -15);
                    this.player.takeDamage(Math.floor(this.player.maxHP() / 4));
                }
                if (this.player.gender == 2) {
                    this.outputText(
                        "groin, making your " + this.vaginaDescript(0) + " sting with pain (-10)",
                        false
                    );
                    this.player.takeDamage(10);
                    this.game.dynStats("lus", -8);
                }
                if (this.player.gender == 3) {
                    this.outputText(
                        "groin, dealing painful damage to your " +
                            this.player.multiCockDescriptLight() +
                            " and " +
                            this.player.vaginaDescript(0) +
                            ", doubling you over in agony (" +
                            Math.floor((this.player.tou * 2 + 50) / 3) +
                            ")",
                        false
                    );
                    this.game.dynStats("lus", -20);
                    this.player.takeDamage(Math.floor(this.player.maxHP() / 3));
                }
            }
            // Whip yo legs
            if (temp == 3) {
                this.outputText("legs (7)", false);
                this.player.takeDamage(7);
            }
            // Whip yo arms
            if (temp == 4) {
                this.outputText("arms (8)", false);
                this.player.takeDamage(8);
            }
            // Whip yo neck
            if (temp == 5) {
                this.outputText("neck (24)", false);
                this.player.takeDamage(24);
            }
            this.outputText("!", false);
        } else {
            this.outputText(
                "The succubus flicks her wrist, allowing a whip-like cord to slither out from the palm of her clawed hand.  She cracks the whip experimentally, cackling with glee.",
                false
            );
            this.createStatusAffect(StatusAffects.WhipReady, 0, 0, 0, 0);
            this.str += 20;
            this.weaponName = "whip";
            this.weaponVerb = "brutal whip-crack";
        }
        this.combatRoundOver();
    }

    protected kissAttack(): void {
        // [Kiss of Death Text]
        this.outputText(
            "The succubus dances forwards, cocking her elbow back for a vicious strike.",
            false
        );
        // avoid!
        if (
            (this.player.spe > this.spe && AbstractSuccubus.rand(4) == 0) ||
            (this.player.findPerk(PerkLib.Evade) >= 0 && AbstractSuccubus.rand(4) == 0) ||
            (this.player.findPerk(PerkLib.Misdirection) >= 0 &&
                AbstractSuccubus.rand(4) == 0 &&
                this.player.armorName == "red, high-society bodysuit")
        ) {
            this.outputText(
                "  You start to sidestep and realize it's a feint.   Ducking low, you slide under her real attack... a kiss?!  ",
                false
            );
            if (this.player.lust >= 70)
                this.outputText(
                    "  Maybe you shouldn't have bothered to move, it might have been fun.",
                    false
                );
        }
        // get hit
        else {
            this.outputText(
                "  You start to dodge to the side, but she shifts direction expertly and plants a wet kiss on your lips.  She spins and dodges away with a ballet dancer's grace, leaving you to wonder what just happened.  ",
                false
            );
            if (this.player.findStatusAffect(StatusAffects.KissOfDeath) < 0)
                this.player.createStatusAffect(StatusAffects.KissOfDeath, 0, 0, 0, 0);
        }
        this.combatRoundOver();
    }

    protected seduceAttack(): void {
        // determine which method of teasing you use
        const temp: number = AbstractSuccubus.rand(3);
        // Butt slap!
        if (temp == 0) {
            this.outputText(
                this.capitalA + this.short + " slaps her " + Appearance.buttDescriptionShort(this),
                false
            );
            if (this.buttRating >= 10) {
                this.outputText(", making it jiggle delightfully.", false);
                // 85% success rate for the jiggly girls
                if (AbstractSuccubus.rand(100) <= 95) {
                    this.game.dynStats("lus", AbstractSuccubus.rand(this.buttRating) + 10);
                    this.outputText("\nThe display is quite arousing.", false);
                } else this.outputText("\nYou're unimpressed.\n\n", false);
            } else {
                this.outputText(".", false);
                // 50%ish chance of success for the tight butted.
                if (AbstractSuccubus.rand(100) <= 70 + this.buttRating * 2) {
                    this.game.dynStats("lus", AbstractSuccubus.rand(this.buttRating) + 9);
                    this.outputText("\nThe display is quite arousing.", false);
                } else this.outputText("\nYou're unimpressed.\n\n", false);
            }
        }
        // Jiggly-tits
        if (temp == 1 && this.breastRows[0].breastRating >= 2) {
            // rand(breastRating) + breastRows*BreastperRow
            // Single breast row
            if (this.breastRows.length == 1) {
                // 50+ breastsize% success rate
                this.outputText(
                    this.capitalA +
                        this.short +
                        " caresses some of her ample chest-flesh before shaking it from side to side enticingly.",
                    false
                );
                if (this.lust >= 50)
                    this.outputText(
                        "  " + this.pronoun2 + " hard nipples seem to demand your attention.",
                        false
                    );
                if (AbstractSuccubus.rand(100) <= 65 + this.biggestTitSize()) {
                    this.game.dynStats(
                        "lus",
                        AbstractSuccubus.rand(this.breastRows[0].breastRating) +
                            this.breastRows.length +
                            10
                    );
                    this.outputText("\nThe display is quite arousing.", false);
                } else this.outputText("\nYou're unimpressed.\n\n", false);
            }
            if (this.breastRows.length > 1) {
                // 50 + 10% per breastRow + breastSize%
                this.outputText(
                    this.capitalA +
                        this.short +
                        " caresses " +
                        this.pronoun2 +
                        " some of her rows of ample chest-flesh before shaking it all from side to side enticingly.",
                    false
                );
                if (this.lust >= 50)
                    this.outputText(
                        ", your " + this.nippleDescript(0) + "s painfully visible.",
                        false
                    );
                else this.outputText(".", false);
                if (
                    AbstractSuccubus.rand(100) <=
                    54 + (this.breastRows.length - 1) * 15 + this.breastRows[0].breastRating
                ) {
                    this.game.dynStats(
                        "lus",
                        AbstractSuccubus.rand(this.breastRows[0].breastRating) +
                            this.breastRows.length * this.breastRows[0].breasts +
                            5
                    );
                    this.outputText("\nThe display is quite arousing.", false);
                } else this.outputText("\nYou're unimpressed.\n\n", false);
            }
        }
        // Genetals flash!
        if (temp == 2) {
            this.outputText(
                this.capitalA +
                    this.short +
                    " reaches down and strokes her moist lips.  She sighs and licks her fingers clean, giving you a smoldering gaze.",
                false
            );
            // Success = 50% + 10% times each cock/vagina
            // rand(vaginas*2 + cocks*2) + wetness and/or length/6
            if (
                AbstractSuccubus.rand(101) <=
                65 + this.vaginas.length * 10 + this.cocks.length * 10
            ) {
                this.game.dynStats(
                    "lus",
                    AbstractSuccubus.rand(this.vaginas.length * 2 + this.cocks.length * 2) + 13
                );
                this.outputText("\nThe display is quite arousing.", false);
            } else this.outputText("\nYou're unimpressed.\n\n", false);
        }
        this.combatRoundOver();
    }
}
