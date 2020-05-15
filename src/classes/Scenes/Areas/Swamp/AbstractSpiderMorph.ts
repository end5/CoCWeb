import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { WeaponLib } from "../../../Items/WeaponLib";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

/**
 * Created by aimozg on 03.01.14.
 */

export class AbstractSpiderMorph extends Monster {
    protected performCombatAction(): void {
        if (this.player.spe >= 2 && AbstractSpiderMorph.rand(2) == 0) {
            this.spiderMorphWebAttack();
        } else if (
            this.player.findStatusAffect(StatusAffects.WebSilence) < 0 &&
            AbstractSpiderMorph.rand(3) == 0
        ) {
            this.spiderSilence();
        } else if (
            this.player.findStatusAffect(StatusAffects.Disarmed) < 0 &&
            this.player.weaponName != "fists" &&
            AbstractSpiderMorph.rand(3) == 0
        ) {
            this.spiderDisarm();
        } else if (AbstractSpiderMorph.rand(2) == 0 || this.player.spe < 2) this.getBitten();
        else this.eAttack();
    }

    /**
     * -Web - lowers speed by 25 each application and disables
     * flight once hit.*/
    public spiderMorphWebAttack(): void {
        this.outx(
            `Turning to the side, ${this.a}${this.short} raises ${this.mf(
                "his",
                "her"
            )} abdomen and unleashes a spray of webbing in your direction!  `
        );
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && AbstractSpiderMorph.rand(3) < 2) {
            this.outx(`${this.capitalA + this.short} misses completely due to their blindness.`);
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx("You dodge away, avoiding the sticky strands!");
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && AbstractSpiderMorph.rand(100) < 10) {
            this.outx("You evade, avoiding the sticky strands!");
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            AbstractSpiderMorph.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                "Your misleading movements allow you to easily sidestep the sticky strands!",
                false
            );
        }
        // Determine if cat'ed
        else if (
            this.player.findPerk(PerkLib.Flexibility) >= 0 &&
            AbstractSpiderMorph.rand(100) < 6
        ) {
            this.outx(
                `You throw yourself out of the way with cat-like agility at the last moment, avoiding ${this.mf(
                    "his",
                    "her"
                )} attack.\n`,
                false
            );
        }
        // Got hit
        else {
            if (this.player.findStatusAffect(StatusAffects.Web) < 0) {
                this.outx(
                    "The silky strands hit you, webbing around you and making it hard to move with any degree of speed.",
                    false
                );
                if (this.player.canFly())
                    this.outx(
                        "  Your wings struggle uselessly in the bindings, no longer able to flap fast enough to aid you.",
                        false
                    );
                this.outx("\n", false);
                this.player.createStatusAffect(StatusAffects.Web, 0, 0, 0, 0);
            } else {
                this.outx(
                    "The silky strands hit you, weighing you down and restricting your movement even further.\n",
                    false
                );
            }
            // Only apply as much speed slow as necessary.
            let amount = 25;
            if (this.player.spe - amount < 1) {
                amount = this.player.spe - 1;
            }
            // Apply changes, display arrows, and track speed lost
            this.player.spe -= amount;
            AbstractSpiderMorph.showStatDown("spe");
            // speUp.visible = false;
            // speDown.visible = true;
            this.player.addStatusValue(StatusAffects.Web, 1, amount);
        }
        this.combatRoundOver();
    }

    /** -Bite - Raises arousal by 30*/
    public getBitten(): void {
        // -Languid Bite - Inflicted on PC's who have been reduced to 1 speed by webbing, raises arousal by 60.
        if (this.player.spe < 2 && this.player.findStatusAffect(StatusAffects.Web) >= 0) {
            this.outx(
                `The arachnid aggressor slowly saunters forward while you struggle under the heaps of webbing, gently placing ${this.mf(
                    "his",
                    "her"
                )} arms around your back in a tender hug.  ${this.mf(
                    "His",
                    "Her"
                )} fangs slide into your neck with agonizing slowness, immediately setting off a burning heat inside you that makes you dizzy and weak.  `
            );
            if (this.player.hasCock()) {
                this.outx(
                    `${this.player.SMultiCockDesc()} turns rock hard and squirts weakly, suddenly so aroused that it starts soaking your ${
                        this.player.armorName
                    }`
                );
                if (this.player.hasVagina())
                    this.outx(` along with your ${this.player.vaginaDescript()}`);
                this.outx(".  ");
            } else if (this.player.hasVagina())
                this.outx(
                    `Your ${this.player.vaginaDescript()} grows wet as hell and so sensitive that every step and movement reminds you of the powerful need for something between your sopping nether-lips.  `
                );
            this.outx(
                `While ${this.mf("his", "her")} venom pours into you, the spider-${this.mf(
                    "boy",
                    "girl"
                )} reaches into your gear to play with your ${this.player.nippleDescript(
                    0
                )}, and you moan like a whore from the dual stimulation of ${this.mf(
                    "his",
                    "her"
                )} venom and nipple-play.\n\n`,
                false
            );
            if (this.hasVagina())
                this.outx(
                    "The saucy dominatrix exhausts her supply of aphrodisiac toxin for the moment and finally steps back, admiring her work and giving you a lewd wink.  You ",
                    false
                );
            else
                this.outx(
                    "The confident male exhausts his supply of aphrodisiac toxin for the moment and finally steps back, admiring his work and giving you a lewd wink.  You ",
                    false
                );
            this.game.dynStats("lus", 60);
            if (this.player.lust > 99)
                this.outx("wobble, utterly defeated and about to cave in to your lust.");
            else this.outx("struggle not to fall down and start masturbating on the spot.");
            this.outx("\n", false);
            this.combatRoundOver();
            return;
        }
        this.outx(
            `The spider-${this.mf("boy", "girl")} lunges forward with ${this.mf(
                "his",
                "her"
            )} mouth open, ${this.mf("his", "her")} two needle-like fangs closing rapidly.  `
        );
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && AbstractSpiderMorph.rand(3) < 2) {
            this.outx(`${this.capitalA + this.short} misses completely due to their blindness.`);
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(`You dodge away, avoiding ${this.mf("his", "her")} bite!`);
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && AbstractSpiderMorph.rand(100) < 10) {
            this.outx("You evade, avoiding the bite!");
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            AbstractSpiderMorph.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                "Your misleading movements allow you to easily sidestep the spider bite!",
                false
            );
        }
        // Determine if cat'ed
        else if (
            this.player.findPerk(PerkLib.Flexibility) >= 0 &&
            AbstractSpiderMorph.rand(100) < 6
        ) {
            this.outx(
                `You throw yourself out of the way with cat-like agility at the last moment, avoiding ${this.mf(
                    "his",
                    "her"
                )} attack.\n`,
                false
            );
        } else {
            if (AbstractSpiderMorph.rand(5) == 0) {
                this.outx(
                    `You react far too slowly, and before you can even think to dodge, ${this.mf(
                        "he",
                        "she"
                    )}'s bitten deep into you, pumping large squirts of venom deep into your body.  Unnatural heat rolls through you, pooling in your groin until you're lewdly bucking your hips against the spider-morph's thigh.  ${this.mf(
                        "He",
                        "She"
                    )} pulls out and steps back, `
                );
                if (this.hasVagina())
                    this.outx(
                        `casually cupping her breasts while you watch with venom-dilated eyes, slowly touching yourself.  Once she stops, you shake your head and master yourself, remembering that you're supposed to be fighting this ${this.mf(
                            "boy",
                            "girl"
                        )}!\n`,
                        false
                    );
                else
                    this.outx(
                        `casually tugging on his relatively short, girthy dick as you watch with venom-dilated eyes, slowly touching yourself.  Once he stops, you shake your head and master yourself, remembering that you're supposed to be fighting this ${this.mf(
                            "boy",
                            "girl"
                        )}!\n`,
                        false
                    );
                this.game.dynStats("lus", 50);
            } else {
                this.outx(
                    `You react too slowly, and before you can dodge, ${this.mf(
                        "he",
                        "she"
                    )}'s bitten you, leaving behind a burning venom that warms your blood and stokes your lust.\n`,
                    false
                );
                this.game.dynStats("lus", 30);
            }
        }
        this.combatRoundOver();
    }

    /** -Disarm - hits the PC's weapon with web and sticks it to a
     nearby tree, reducing PC's attack to 0 for the rest of the fight.*/
    public spiderDisarm(): void {
        this.outx(
            `${
                this.capitalA + this.short
            } shifts and sprays webbing, aiming a tight strand of it at your ${
                this.player.weaponName
            }.  `
        );
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && AbstractSpiderMorph.rand(3) < 2) {
            this.outx("The blind web-shot goes horribly wide, missing you entirely.");
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                "You pull your weapon back and the webbing goes wide, missing entirely.",
                false
            );
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && AbstractSpiderMorph.rand(100) < 10) {
            this.outx(
                "You pull your weapon back evasively and the webbing goes wide, missing entirely!",
                false
            );
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            AbstractSpiderMorph.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx("Your misleading movements allow you to easily sidestep the webbing!");
        }
        // Determine if cat'ed
        else if (
            this.player.findPerk(PerkLib.Flexibility) >= 0 &&
            AbstractSpiderMorph.rand(100) < 6
        ) {
            this.outx(
                `You throw yourself out of the way with cat-like agility at the last moment, avoiding ${this.mf(
                    "his",
                    "her"
                )} attack.\n`,
                false
            );
        } else if (
            this.player.weaponName == "spiked gauntlet" ||
            this.player.weaponName == "hooked gauntlets"
        ) {
            this.outx("The webbing hits your ");
            if (this.player.weaponName == "spiked gauntlet")
                this.outx(
                    "gauntlet, but it's so effectively fastened to your hands that the attack fails to disarm you.\n",
                    false
                );
            else
                this.outx(
                    "gauntlets, but they're so effectively fastened to your hands that the attack fails to disarm you.\n",
                    false
                );
        } else {
            this.outx(
                `You don't react fast enough and the sticky webbing pulls your ${this.player.weaponName} out of your grip, gluing it to a nearby tree.  There's no way to get it back right now, you'll have to fight bare-handed!`
            );
            this.flags[kFLAGS.PLAYER_DISARMED_WEAPON_ID] = this.player.weapon.id;
            this.player.setWeapon(WeaponLib.FISTS);
            // No longer appears to be used
            //
            // flags[kFLAGS.PLAYER_DISARMED_WEAPON_ATTACK] = player.weaponAttack;
            //
            //
            // player.weapon.unequip(player,false,true);
            this.player.createStatusAffect(StatusAffects.Disarmed, 0, 0, 0, 0);
        }
        this.combatRoundOver();
    }

    /** -Silence - sprays webs on the PC's mouth, silencing them for 1 to 3 turns.*/
    public spiderSilence(): void {
        this.outx(
            `${this.capitalA + this.short} squirts a concentrated spray of ${this.mf(
                "his",
                "her"
            )} webs directly at your face!  `
        );
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && AbstractSpiderMorph.rand(3) < 2) {
            this.outx("The blind web-shot goes horribly wide, missing you entirely.");
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                "You lean back and let them pass harmlessly overhead, avoiding the attack.",
                false
            );
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && AbstractSpiderMorph.rand(100) < 10) {
            this.outx(
                "You pull your weapon back evasively and the webbing goes wide, missing entirely.",
                false
            );
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            AbstractSpiderMorph.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx("Your misleading movements allow you to easily sidestep the webbing!");
        }
        // Determine if cat'ed
        else if (
            this.player.findPerk(PerkLib.Flexibility) >= 0 &&
            AbstractSpiderMorph.rand(100) < 6
        ) {
            this.outx(
                `You throw yourself out of the way with cat-like agility at the last moment, avoiding ${this.mf(
                    "his",
                    "her"
                )} attack.\n`,
                false
            );
        } else {
            this.outx(
                "They hit you before you can move, covering most of your nose and mouth and making it hard to breathe.  You'll be unable to use your magic while you're constantly struggling just to draw air!\n",
                false
            );
            this.player.createStatusAffect(StatusAffects.WebSilence, 0, 0, 0, 0);
        }
        this.combatRoundOver();
    }
}
