import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_DRY,
    BUTT_RATING_TIGHT,
    HIP_RATING_AMPLE,
    SKIN_TYPE_FUR,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_WETNESS_DROOLING,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { ChainedDrop } from "../../../internals/ChainedDrop";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

/**
 * ...
 *
 * @author ...
 */
export class Gnoll extends Monster {
    // Gnoll Description
    private gnollAttackText(): void {
        let damage = 0;
        const attack: number = Gnoll.rand(6);
        // return to combat menu when finished
        this.doNext(this.game.playerMenu);
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Gnoll.rand(3) < 2) {
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
            if (this.player.spe - this.spe < 8)
                this.outx(
                    `You narrowly avoid ${this.a}${this.short}'s ${this.weaponVerb}!\n`,
                    false
                );
            else if (this.player.spe - this.spe >= 8 && this.player.spe - this.spe < 20)
                this.outx(
                    `You dodge ${this.a}${this.short}'s ${this.weaponVerb} with superior quickness!\n`,
                    false
                );
            else if (this.player.spe - this.spe >= 20)
                this.outx(
                    `You deftly avoid ${this.a}${this.short}'s slow ${this.weaponVerb}.\n`,
                    false
                );
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && Gnoll.rand(100) < 10) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s attack.\n`,
                false
            );
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Gnoll.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings, you anticipate and sidestep ${this.a}${this.short}' attacks.\n`,
                false
            );
        }
        // Determine if cat'ed
        else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Gnoll.rand(100) < 6) {
            this.outx(
                `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}`
            );
            if (this.plural) this.outx("' attacks.\n", false);
            else this.outx("'s attack.\n", false);
        } else {
            // Determine damage - str modified by enemy toughness!
            damage = Math.floor(
                this.str +
                    this.weaponAttack -
                    Math.random() * this.player.tou -
                    this.player.armorDef
            );
            if (damage <= 0) {
                damage = 0;
                // hapies have their own shit
                if (this.short == "harpy")
                    this.outx(
                        "The harpy dives at you with her foot-talons, but you deflect the attack, grasp onto her leg, and swing her through the air, tossing her away from you before she has a chance to right herself.",
                        false
                    );
                // Due to toughness or amor...
                else if (Gnoll.rand(this.player.armorDef + this.player.tou) < this.player.armorDef)
                    this.outx(
                        `Your ${this.player.armorName} absorb and deflect every ${this.weaponVerb} from ${this.a}${this.short}.`
                    );
                else
                    this.outx(
                        `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throws at you.`
                    );
            }
            // everyone else
            else {
                // Gnoll Attack #1
                if (attack == 0) {
                    this.outx(
                        "The gnoll leaps forward, her jaws slamming shut across your upper arm.  She twists away before you can touch her, laughing the entire time.",
                        false
                    );
                    damage += 10;
                }
                // Gnoll Attack #2
                else if (attack == 1) {
                    this.outx(
                        "With a shudder and lurch, the gnoll barrels forward into your gut, the claws of her free hand raking across your belly.",
                        false
                    );
                    damage += 3;
                }
                // Gnoll Attack #3
                else if (attack == 2) {
                    this.outx(
                        "The gnoll tumbles to the ground, then comes up with a handful of sand.  The sand goes in your face; the club goes into your cheek.  Ow.",
                        false
                    );
                    damage += 13;
                }
                // Gnoll Attack #4
                else if (attack == 3) {
                    this.outx(
                        "The hyena girl giggles and darts forward, teeth snapping.  Spittle flies everywhere, and the snapping teeth find purchase, drawing red lines across your body.",
                        false
                    );
                    damage += 8;
                }
                // Gnoll Attack #5
                else if (attack == 4) {
                    this.outx(
                        "With a mocking laugh, the gnoll brings her club high and then down in a savage strike that catches you across the temple.",
                        false
                    );
                    damage += 25;
                }
                // Gnoll Attack #6
                else {
                    this.outx(
                        "The gnoll waves her club threateningly, but it's her foot that snaps up from the dusty plain to connect with your gut.",
                        false
                    );
                }
                damage = this.player.takeDamage(damage);
                this.outx(` (${damage})\n`, false);
            }
            this.game.statScreenRefresh();
        }
    }

    private gnollTease(): void {
        const tease: number = Gnoll.rand(6);
        let bonus = 0;
        // Gnoll Tease #1
        if (tease == 0) {
            this.outx(
                "The gnoll takes a moment to stretch her sleek, athletic body.  Her free hand runs up her side and she leers knowingly at you.",
                false
            );
            bonus += 5;
        }
        // Gnoll Tease #2
        else if (tease == 1) {
            this.outx(
                'With one hand, the hyena girl grasps her eight-inch clitoris and strokes it.  "<i>I know you\'re curious!</i>" she laughs.  "<i>You want to try this.</i>"',
                false
            );
            bonus += 5;
        }
        // Gnoll Tease #3
        else if (tease == 2) {
            this.outx(
                'The gnoll bounds forward, but instead of clobbering you she slides her lithe body against yours.  "<i>We don\'t have to fight,</i>" she titters.  "<i>It\'s lots easier if I just fuck you.</i>"',
                false
            );
            bonus += 10;
        }
        // Gnoll Tease #4
        else if (tease == 3) {
            this.outx(
                "The gnoll slides her fingers down the length of her pseudo-penis and collects the cream that drips from its end.  With two steps, she's inside your guard, but all she does is wave her hand in front of your nose.  The reek of sex nearly bowls you over.",
                false
            );
            bonus += 12;
        }
        // Gnoll Tease #5
        else if (tease == 4)
            this.outx(
                '"<i>I love outlanders,</i>" the gnoll confides in you as she circles.  "<i>You have such interesting cries when you get fucked in a new way.</i>"  She laughs, and the sound is far louder than it has any right to be.\n\n',
                false
            );
        // Gnoll Tease #6
        else {
            this.outx(
                "The gnoll dances forward, then back, her whole body alive with sensual movement.  She catches the way you watch her and smirks, throwing in a hip-shake just for you.",
                false
            );
            bonus += 6;
        }
        this.game.dynStats(
            "lus",
            bonus + 10 + this.player.lib / 20 + Gnoll.rand(this.player.cor / 20)
        );
        this.outx("\n", false);
    }

    public eAttack(): void {
        let damage = 0;
        const attack: number = Gnoll.rand(6);
        // return to combat menu when finished
        this.doNext(this.game.playerMenu);
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Gnoll.rand(3) < 2) {
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
            if (this.player.spe - this.spe < 8)
                this.outx(
                    `You narrowly avoid ${this.a}${this.short}'s ${this.weaponVerb}!\n`,
                    false
                );
            else if (this.player.spe - this.spe >= 8 && this.player.spe - this.spe < 20)
                this.outx(
                    `You dodge ${this.a}${this.short}'s ${this.weaponVerb} with superior quickness!\n`,
                    false
                );
            else if (this.player.spe - this.spe >= 20)
                this.outx(
                    `You deftly avoid ${this.a}${this.short}'s slow ${this.weaponVerb}.\n`,
                    false
                );
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && Gnoll.rand(100) < 10) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s attack.\n`,
                false
            );
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Gnoll.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings, you anticipate and sidestep ${this.a}${this.short}' attacks.\n`,
                false
            );
        }
        // Determine if cat'ed
        else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Gnoll.rand(100) < 6) {
            this.outx(
                `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}`
            );
            if (this.plural) this.outx("' attacks.\n", false);
            else this.outx("'s attack.\n", false);
        } else {
            // Determine damage - str modified by enemy toughness!
            damage = Math.floor(
                this.str +
                    this.weaponAttack -
                    Math.random() * this.player.tou -
                    this.player.armorDef
            );
            if (damage <= 0) {
                damage = 0;
                // hapies have their own shit
                if (this.short == "harpy")
                    this.outx(
                        "The harpy dives at you with her foot-talons, but you deflect the attack, grasp onto her leg, and swing her through the air, tossing her away from you before she has a chance to right herself.",
                        false
                    );
                // Due to toughness or amor...
                else if (Gnoll.rand(this.player.armorDef + this.player.tou) < this.player.armorDef)
                    this.outx(
                        `Your ${this.player.armorName} absorb and deflect every ${this.weaponVerb} from ${this.a}${this.short}.`
                    );
                else
                    this.outx(
                        `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throws at you.`
                    );
            }
            // everyone else
            else {
                // Gnoll Attack #1
                if (attack == 0) {
                    this.outx(
                        "The gnoll leaps forward, her jaws slamming shut across your upper arm.  She twists away before you can touch her, laughing the entire time.",
                        false
                    );
                    damage += 10;
                }
                // Gnoll Attack #2
                else if (attack == 1) {
                    this.outx(
                        "With a shudder and lurch, the gnoll barrels forward into your gut, the claws of her free hand raking across your belly.",
                        false
                    );
                    damage += 3;
                }
                // Gnoll Attack #3
                else if (attack == 2) {
                    this.outx(
                        "The gnoll tumbles to the ground, then comes up with a handful of sand.  The sand goes in your face; the club goes into your cheek.  Ow.",
                        false
                    );
                    damage += 13;
                }
                // Gnoll Attack #4
                else if (attack == 3) {
                    this.outx(
                        "The hyena girl giggles and darts forward, teeth snapping.  Spittle flies everywhere, and the snapping teeth find purchase, drawing red lines across your body.",
                        false
                    );
                    damage += 8;
                }
                // Gnoll Attack #5
                else if (attack == 4) {
                    this.outx(
                        "With a mocking laugh, the gnoll brings her club high and then down in a savage strike that catches you across the temple.",
                        false
                    );
                    damage += 25;
                }
                // Gnoll Attack #6
                else {
                    this.outx(
                        "The gnoll waves her club threateningly, but it's her foot that snaps up from the dusty plain to connect with your gut.",
                        false
                    );
                }
                damage = this.player.takeDamage(damage);
                this.outx(` (${damage})\n`, false);
            }
            this.game.statScreenRefresh();
        }
    }

    protected performCombatAction(): void {
        if (this.findStatusAffect(StatusAffects.Stunned) >= 0) {
            if (this.plural)
                this.outx("Your foes are too dazed from your last hit to strike back!");
            else this.outx("Your foe is too dazed from your last hit to strike back!");
            this.removeStatusAffect(StatusAffects.Stunned);
            this.combatRoundOver();
        }
        if (this.findStatusAffect(StatusAffects.Fear) >= 0) {
            if (this.statusAffectv1(StatusAffects.Fear) == 0) {
                if (this.plural) {
                    this.removeStatusAffect(StatusAffects.Fear);
                    this.outx(
                        "Your foes shake free of their fear and ready themselves for battle.",
                        false
                    );
                } else {
                    this.removeStatusAffect(StatusAffects.Fear);
                    this.outx(
                        "Your foe shakes free of its fear and readies itself for battle.",
                        false
                    );
                }
            } else {
                this.addStatusValue(StatusAffects.Fear, 1, -1);
                if (this.plural)
                    this.outx(
                        `${this.capitalA + this.short} are too busy shivering with fear to fight.`
                    );
                else
                    this.outx(
                        `${this.capitalA + this.short} is too busy shivering with fear to fight.`
                    );
            }
            this.combatRoundOver();
        }
        // var select: number = 1;
        // var rando: number = 1;
        // Exgartuan gets to do stuff!
        if (
            this.player.findStatusAffect(StatusAffects.Exgartuan) >= 0 &&
            this.player.statusAffectv2(StatusAffects.Exgartuan) == 0 &&
            Gnoll.rand(3) == 0
        ) {
            this.game.exgartuan.exgartuanCombatUpdate();
            this.outx("\n\n", false);
        }
        if (this.findStatusAffect(StatusAffects.Constricted) >= 0) {
            // Enemy struggles -
            this.outx(
                "Your prey pushes at your tail, twisting and writhing in an effort to escape from your tail's tight bonds.",
                false
            );
            if (this.statusAffectv1(StatusAffects.Constricted) <= 0) {
                this.outx(
                    `  ${this.capitalA}${this.short} proves to be too much for your tail to handle, breaking free of your tightly bound coils.`
                );
                this.removeStatusAffect(StatusAffects.Constricted);
            }
            this.addStatusValue(StatusAffects.Constricted, 1, -1);
            this.combatRoundOver();
        }
        // If grappling...
        /* Grappling was never included
                    if (game.gameState == 2) {
                        // temperment - used for determining grapple behaviors
                        // 0 - avoid grapples/break grapple
                        // 1 - lust determines > 50 grapple
                        // 2 - random
                        // 3 - love grapples
                        //
// if(temperment == 0) eGrappleRetreat();
                        if (temperment == 1) {
                            //
//  if(lust < 50) eGrappleRetreat();
                            doNext(3);
                        }
                        outx("Lust Placeholder!!");
                        doNext(3);
                    }
        */
        if (Gnoll.rand(2) == 0) this.gnollTease();
        else {
            let damage = 0;
            const attack: number = Gnoll.rand(6);
            // return to combat menu when finished
            this.doNext(this.game.playerMenu);
            // Blind dodge change
            if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Gnoll.rand(3) < 2) {
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
                if (this.player.spe - this.spe < 8)
                    this.outx(
                        `You narrowly avoid ${this.a}${this.short}'s ${this.weaponVerb}!\n`,
                        false
                    );
                else if (this.player.spe - this.spe >= 8 && this.player.spe - this.spe < 20)
                    this.outx(
                        `You dodge ${this.a}${this.short}'s ${this.weaponVerb} with superior quickness!\n`,
                        false
                    );
                else if (this.player.spe - this.spe >= 20)
                    this.outx(
                        `You deftly avoid ${this.a}${this.short}'s slow ${this.weaponVerb}.\n`,
                        false
                    );
            }
            // Determine if evaded
            else if (this.player.findPerk(PerkLib.Evade) >= 0 && Gnoll.rand(100) < 10) {
                this.outx(
                    `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s attack.\n`,
                    false
                );
            }
            // ("Misdirection"
            else if (
                this.player.findPerk(PerkLib.Misdirection) >= 0 &&
                Gnoll.rand(100) < 10 &&
                this.player.armorName == "red, high-society bodysuit"
            ) {
                this.outx(
                    `Using Raphael's teachings, you anticipate and sidestep ${this.a}${this.short}' attacks.\n`,
                    false
                );
            }
            // Determine if cat'ed
            else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Gnoll.rand(100) < 6) {
                this.outx(
                    `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}`
                );
                if (this.plural) this.outx("' attacks.\n", false);
                else this.outx("'s attack.\n", false);
            } else {
                // Determine damage - str modified by enemy toughness!
                damage = Math.floor(
                    this.str +
                        this.weaponAttack -
                        Math.random() * this.player.tou -
                        this.player.armorDef
                );
                if (damage <= 0) {
                    damage = 0;
                    // hapies have their own shit
                    if (this.short == "harpy")
                        this.outx(
                            "The harpy dives at you with her foot-talons, but you deflect the attack, grasp onto her leg, and swing her through the air, tossing her away from you before she has a chance to right herself.",
                            false
                        );
                    // Due to toughness or amor...
                    else if (
                        Gnoll.rand(this.player.armorDef + this.player.tou) < this.player.armorDef
                    )
                        this.outx(
                            `Your ${this.player.armorName} absorb and deflect every ${this.weaponVerb} from ${this.a}${this.short}.`
                        );
                    else
                        this.outx(
                            `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throws at you.`
                        );
                }
                // everyone else
                else {
                    // Gnoll Attack #1
                    if (attack == 0) {
                        this.outx(
                            "The gnoll leaps forward, her jaws slamming shut across your upper arm.  She twists away before you can touch her, laughing the entire time.",
                            false
                        );
                        damage += 10;
                    }
                    // Gnoll Attack #2
                    else if (attack == 1) {
                        this.outx(
                            "With a shudder and lurch, the gnoll barrels forward into your gut, the claws of her free hand raking across your belly.",
                            false
                        );
                        damage += 3;
                    }
                    // Gnoll Attack #3
                    else if (attack == 2) {
                        this.outx(
                            "The gnoll tumbles to the ground, then comes up with a handful of sand.  The sand goes in your face; the club goes into your cheek.  Ow.",
                            false
                        );
                        damage += 13;
                    }
                    // Gnoll Attack #4
                    else if (attack == 3) {
                        this.outx(
                            "The hyena girl giggles and darts forward, teeth snapping.  Spittle flies everywhere, and the snapping teeth find purchase, drawing red lines across your body.",
                            false
                        );
                        damage += 8;
                    }
                    // Gnoll Attack #5
                    else if (attack == 4) {
                        this.outx(
                            "With a mocking laugh, the gnoll brings her club high and then down in a savage strike that catches you across the temple.",
                            false
                        );
                        damage += 25;
                    }
                    // Gnoll Attack #6
                    else {
                        this.outx(
                            "The gnoll waves her club threateningly, but it's her foot that snaps up from the dusty plain to connect with your gut.",
                            false
                        );
                    }
                    damage = this.player.takeDamage(damage);
                    this.outx(` (${damage})\n`, false);
                }
                this.game.statScreenRefresh();
            }
            this.gnollAttackText();
        }
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        if (this.findStatusAffect(StatusAffects.PhyllaFight) >= 0) {
            this.removeStatusAffect(StatusAffects.PhyllaFight);
            this.game.desert.antsScene.phyllaPCBeatsGnoll();
            return;
        }
        this.game.plains.gnollScene.defeatHyena();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (this.findStatusAffect(StatusAffects.PhyllaFight) >= 0) {
            this.removeStatusAffect(StatusAffects.PhyllaFight);
            this.game.desert.antsScene.phyllaGnollBeatsPC();
        } else if (pcCameWorms) {
            this.outx("\n\nYour foe doesn't seem put off enough to leave...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.plains.gnollScene.getRapedByGnoll();
        }
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "gnoll";
        this.imageName = "gnoll";
        this.long =
            "This lanky figure is dappled with black spots across rough, tawny fur. Wiry muscle ripples along long legs and arms, all of it seeming in perpetual frenetic motion: every moment half flinching and half lunging.  The head bears a dark muzzle curled in a perpetual leer and bright orange eyes watching with a savage animal cunning.  Between the legs hang what appears at first to be a long, thin dong; however, on closer inspection it is a fused tube of skin composed of elongated pussy lips and clitoris.  The hyena girl is sporting a pseudo-penis, and judging by the way it bobs higher as she jinks back and forth, she's happy to see you!\n\nShe wears torn rags scavenged from some other, somewhat smaller, creature, and in one hand clutches a twisted club.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_DROOLING, VAGINA_LOOSENESS_LOOSE);
        this.createBreastRow(Appearance.breastCupInverse("C"));
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 25, 0, 0, 0);
        this.tallness = 6 * 12;
        this.hipRating = HIP_RATING_AMPLE;
        this.buttRating = BUTT_RATING_TIGHT;
        this.skinTone = "tawny";
        this.skinType = SKIN_TYPE_FUR;
        // this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_FUR];
        this.hairColor = "black";
        this.hairLength = 22;
        this.initStrTouSpeInte(80, 70, 75, 60);
        this.initLibSensCor(65, 25, 60);
        this.weaponName = "twisted club";
        this.weaponVerb = "smash";
        this.weaponAttack = 0;
        this.weaponPerk = "";
        this.weaponValue = 25;
        this.armorName = "skin";
        this.armorDef = 2;
        this.bonusHP = 250;
        this.lust = 30;
        this.lustVuln = 0.35;
        this.temperment = Gnoll.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 14;
        this.gems = 10 + Gnoll.rand(5);
        this.drop = new ChainedDrop()
            .add(this.consumables.REDUCTO, 1 / 5)
            .add(this.consumables.SUCMILK, 1 / 2)
            .elseDrop(this.consumables.BLACK_D);
        this.checkMonster();
    }
}
