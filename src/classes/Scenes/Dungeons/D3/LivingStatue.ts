import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { WeaponLib } from "../../../Items/WeaponLib";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

/**
 * ...
 *
 * @author Gedan
 */
export class LivingStatue extends Monster {
    public defeated(hpVictory: boolean): void {
        this.flags[kFLAGS.D3_STATUE_DEFEATED] = 1;
        this.game.d3.livingStatue.beatUpDaStatue(hpVictory);
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.d3.livingStatue.fuckinMarbleOP(hpVictory, pcCameWorms);
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "living statue";
        this.imageName = "livingstatue";
        this.long =
            "This animate marble statue shows numerous signs of wear and tear, but remains as strong and stable as the day it was carved. Its pearly, white skin is pockmarked in places from age, yet the alabaster muscles seem to move with almost liquid grace. You get the impression that the statue was hewn in the days before the demons, then brought to life shortly after. It bears a complete lack of genitalia - an immaculately carved leaf is all that occupies its loins. It wields a hammer carved from the same material as the rest of it.";

        this.initStrTouSpeInte(100, 80, 25, 50);
        this.initLibSensCor(10, 10, 100);

        this.lustVuln = 0;

        this.tallness = 16 * 12;
        this.createBreastRow(0, 1);
        this.initGenderless();

        this.drop = this.NO_DROP;

        this.level = 22;
        this.bonusHP = 1000;

        this.weaponName = "stone greathammer";
        this.weaponVerb = "smash";
        this.weaponAttack = 25;
        this.armorName = "cracked stone";

        this.createPerk(PerkLib.Resolute, 0, 0, 0, 0);

        this.checkMonster();
    }

    protected handleStun(): boolean {
        this.game.outx("The stone giant's unforgiving flesh seems incapable of being stunned.");
        return true;
    }

    protected handleFear(): boolean {
        this.game.outx("The stone giant cares little for your attempted intimidation.");
        return true;
    }

    protected handleBlind(): boolean {
        return true;
    }

    private concussiveBlow(): void {
        // Maybe replace this with passive stun? TERRIBLE IDEA
        this.outx(
            "The giant raises his hammer for an obvious downward strike. His marble muscles flex as he swings it downward. You're able to hop out of the way of the clearly telegraphed attack, but nothing could prepare you for the shockwave it emits as it craters the ground."
        );

        // Light magic-type damage!
        let damage: number = 100 * (this.inte / this.player.inte / 4);
        damage = this.player.takeDamage(damage);

        // Stun success
        if (LivingStatue.rand(2) == 0 && this.player.findStatusAffect(StatusAffects.Stunned) < 0) {
            this.outx(
                " <b>The vibrations leave you rattled and stunned. It'll take you a moment to recover!</b>"
            );
            this.player.createStatusAffect(StatusAffects.Stunned, 2, 0, 0, 0);
        }
        // Fail
        else {
            this.outx(
                " You shake off the vibrations immediately. It'll take more than that to stop you!"
            );
        }

        this.outx(` (${damage})`);
    }

    private dirtKick(): void {
        this.outx(
            "The animated sculpture brings its right foot around, dragging it through the gardens at a high enough speed to tear a half score of bushes out by the root. A cloud of shrubbery and dirt washes over you!"
        );

        // blind
        if (LivingStatue.rand(2) == 0 && this.player.findStatusAffect(StatusAffects.Blind) < 0) {
            this.player.createStatusAffect(StatusAffects.Blind, 2, 0, 0, 0);
            this.outx(" <b>You are blinded!</b>");
        } else {
            // Not blind
            this.outx(" You close your eyes until it passes and resume the fight!");
        }
    }

    private backhand(): void {
        // Knocks you away and forces you to spend a turn running back to do melee attacks.
        this.outx(
            "The marble golem's visage twists into a grimace of irritation, and it swings its hand at you in a vicious backhand."
        );

        let damage: number = Math.floor(
            this.str + this.weaponAttack - LivingStatue.rand(this.player.tou) - this.player.armorDef
        );
        // Dodge
        if (
            damage <= 0 ||
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        )
            this.outx(" You slide underneath the surprise swing!");
        else {
            // Get hit
            this.outx(
                " It chits you square in the chest. The momentum sends you flying through the air. You land with a crunch against a wall. <b>You'll have to run back to the giant to engage it in melee once more.</b>"
            );

            this.player.createStatusAffect(StatusAffects.KnockedBack, 0, 0, 0, 0);
            this.createStatusAffect(StatusAffects.KnockedBack, 0, 0, 0, 0); // Applying to mob as a "used ability" marker
            damage = this.player.takeDamage(damage);

            this.outx(` (${damage})`);
        }
    }

    private overhandSmash(): void {
        // High damage, lowish accuracy.
        this.outx(
            "Raising its hammer high overhead, the giant swiftly brings its hammer down in a punishing strike!"
        );

        let damage: number =
            175 +
            Math.floor(
                this.str +
                    this.weaponAttack -
                    LivingStatue.rand(this.player.tou) -
                    this.player.armorDef
            );
        if (
            damage <= 0 ||
            LivingStatue.rand(100) < 25 ||
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        )
            this.outx(" You're able to sidestep it just in time.");
        else {
            // Hit
            this.outx(" The concussive strike impacts you with bonecrushing force.");
            damage = this.player.takeDamage(damage);
            this.outx(` (${damage})`);
        }
    }

    private disarm(): void {
        this.outx(
            "The animated statue spins its hammer around, striking at your [weapon] with its haft."
        );

        // Avoid
        if (
            (this.combatMiss() && this.combatMiss()) ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        )
            this.outx(" You manage to hold onto your equipment, for now.");
        // Oh noes!
        else {
            this.outx(
                ` Your equipment flies off into the bushes! You'll have to fight another way. (${this.player.takeDamage(
                    this.str + this.weaponAttack
                )})`
            );
            this.player.createStatusAffect(StatusAffects.Disarmed, 0, 0, 0, 0);
            this.createStatusAffect(StatusAffects.Disarmed, 0, 0, 0, 0);
            this.flags[kFLAGS.PLAYER_DISARMED_WEAPON_ID] = this.player.weapon.id;
            this.flags[kFLAGS.PLAYER_DISARMED_WEAPON_ATTACK] = this.player.weaponAttack;
            this.player.setWeapon(WeaponLib.FISTS);
            //
            //
            // player.weapon.unequip(player,false,true);
        }
    }

    private cycloneStrike(): void {
        // Difficult to avoid, moderate damage.
        this.outx(
            "Twisting back, the giant abruptly launches into a circular spin. Its hammer stays low enough to the ground that its circular path is tearing a swath of destruction through the once pristine garden, and it's coming in your direction!"
        );

        let damage: number =
            (175 +
                Math.floor(
                    this.str +
                        this.weaponAttack -
                        LivingStatue.rand(this.player.tou) -
                        this.player.armorDef
                )) /
            (LivingStatue.rand(3) + 2);
        // Avoid
        if (
            damage <= 0 ||
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        )
            this.outx(" By the grace of the gods, you somehow avoid the spinning hammer.");
        else {
            // Hit
            this.outx(" You're squarely struck by the spinning hammer.");
            damage = this.player.takeDamage(damage);
            this.outx(` (${damage})`);
        }
    }

    protected performCombatAction(): void {
        if (this.HPRatio() < 0.7 && this.findStatusAffect(StatusAffects.KnockedBack) < 0) {
            this.backhand();
        } else if (
            this.HPRatio() < 0.4 &&
            this.findStatusAffect(StatusAffects.Disarmed) < 0 &&
            this.player.weaponName != "fists"
        ) {
            this.disarm();
        } else {
            const opts: any[] = [];

            if (
                this.player.findStatusAffect(StatusAffects.Blind) < 0 &&
                this.player.findStatusAffect(StatusAffects.Stunned) < 0
            )
                opts.push(this.dirtKick);
            if (
                this.player.findStatusAffect(StatusAffects.Blind) < 0 &&
                this.player.findStatusAffect(StatusAffects.Stunned) < 0
            )
                opts.push(this.concussiveBlow);
            opts.push(this.cycloneStrike);
            opts.push(this.cycloneStrike);
            opts.push(this.overhandSmash);

            opts[LivingStatue.rand(opts.length)]();
        }

        this.combatRoundOver();
    }
}
