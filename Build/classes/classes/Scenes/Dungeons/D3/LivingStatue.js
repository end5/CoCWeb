define(["require", "exports", "../../../Monster", "../../../GlobalFlags/kFLAGS", "../../../PerkLib", "../../../StatusAffects", "../../../Items/WeaponLib"], function (require, exports, Monster_1, kFLAGS_1, PerkLib_1, StatusAffects_1, WeaponLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ...
     * @author Gedan
     */
    class LivingStatue extends Monster_1.Monster {
        defeated(hpVictory) {
            this.flags[kFLAGS_1.kFLAGS.D3_STATUE_DEFEATED] = 1;
            this.game.d3.livingStatue.beatUpDaStatue(hpVictory);
        }
        won(hpVictory, pcCameWorms) {
            this.game.d3.livingStatue.fuckinMarbleOP(hpVictory, pcCameWorms);
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "living statue";
            this.imageName = "livingstatue";
            this.long = "This animate marble statue shows numerous signs of wear and tear, but remains as strong and stable as the day it was carved. Its pearly, white skin is pockmarked in places from age, yet the alabaster muscles seem to move with almost liquid grace. You get the impression that the statue was hewn in the days before the demons, then brought to life shortly after. It bears a complete lack of genitalia - an immaculately carved leaf is all that occupies its loins. It wields a hammer carved from the same material as the rest of it.";
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
            this.createPerk(PerkLib_1.PerkLib.Resolute, 0, 0, 0, 0);
            this.checkMonster();
        }
        handleStun() {
            this.game.outputText("The stone giant's unforgiving flesh seems incapable of being stunned.");
            return true;
        }
        handleFear() {
            this.game.outputText("The stone giant cares little for your attempted intimidation.");
            return true;
        }
        handleBlind() {
            return true;
        }
        concussiveBlow() {
            //Maybe replace this with passive stun? TERRIBLE IDEA
            this.outputText("The giant raises his hammer for an obvious downward strike. His marble muscles flex as he swings it downward. You're able to hop out of the way of the clearly telegraphed attack, but nothing could prepare you for the shockwave it emits as it craters the ground.");
            //Light magic-type damage!
            var damage = (100 * ((this.inte / this.player.inte) / 4));
            damage = this.player.takeDamage(damage);
            //Stun success
            if (LivingStatue.rand(2) == 0 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.Stunned) < 0) {
                this.outputText(" <b>The vibrations leave you rattled and stunned. It'll take you a moment to recover!</b>");
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.Stunned, 2, 0, 0, 0);
            }
            else 
            //Fail
            {
                this.outputText(" You shake off the vibrations immediately. It'll take more than that to stop you!");
            }
            this.outputText(" (" + damage + ")");
        }
        dirtKick() {
            this.outputText("The animated sculpture brings its right foot around, dragging it through the gardens at a high enough speed to tear a half score of bushes out by the root. A cloud of shrubbery and dirt washes over you!");
            //blind
            if (LivingStatue.rand(2) == 0 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.Blind) < 0) {
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.Blind, 2, 0, 0, 0);
                this.outputText(" <b>You are blinded!</b>");
            }
            else {
                //Not blind
                this.outputText(" You close your eyes until it passes and resume the fight!");
            }
        }
        backhand() {
            //Knocks you away and forces you to spend a turn running back to do melee attacks.
            this.outputText("The marble golem's visage twists into a grimace of irritation, and it swings its hand at you in a vicious backhand.");
            var damage = Math.floor((this.str + this.weaponAttack) - LivingStatue.rand(this.player.tou) - this.player.armorDef);
            //Dodge
            if (damage <= 0 || (this.combatMiss() || this.combatEvade() || this.combatFlexibility() || this.combatMisdirect()))
                this.outputText(" You slide underneath the surprise swing!");
            else {
                //Get hit
                this.outputText(" It chits you square in the chest. The momentum sends you flying through the air. You land with a crunch against a wall. <b>You'll have to run back to the giant to engage it in melee once more.</b>");
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.KnockedBack, 0, 0, 0, 0);
                this.createStatusAffect(StatusAffects_1.StatusAffects.KnockedBack, 0, 0, 0, 0); // Applying to mob as a "used ability" marker
                damage = this.player.takeDamage(damage);
                this.outputText(" (" + damage + ")");
            }
        }
        overhandSmash() {
            //High damage, lowish accuracy.
            this.outputText("Raising its hammer high overhead, the giant swiftly brings its hammer down in a punishing strike!");
            var damage = 175 + Math.floor((this.str + this.weaponAttack) - LivingStatue.rand(this.player.tou) - this.player.armorDef);
            if (damage <= 0 || LivingStatue.rand(100) < 25 || this.combatMiss() || this.combatEvade() || this.combatFlexibility() || this.combatMisdirect())
                this.outputText(" You're able to sidestep it just in time.");
            else {
                //Hit
                this.outputText(" The concussive strike impacts you with bonecrushing force.");
                damage = this.player.takeDamage(damage);
                this.outputText(" (" + damage + ")");
            }
        }
        disarm() {
            this.outputText("The animated statue spins its hammer around, striking at your [weapon] with its haft.");
            //Avoid
            if ((this.combatMiss() && this.combatMiss()) || this.combatEvade() || this.combatFlexibility() || this.combatMisdirect())
                this.outputText(" You manage to hold onto your equipment, for now.");
            //Oh noes!
            else {
                this.outputText(" Your equipment flies off into the bushes! You'll have to fight another way. (" + this.player.takeDamage(this.str + this.weaponAttack) + ")");
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.Disarmed, 0, 0, 0, 0);
                this.createStatusAffect(StatusAffects_1.StatusAffects.Disarmed, 0, 0, 0, 0);
                this.flags[kFLAGS_1.kFLAGS.PLAYER_DISARMED_WEAPON_ID] = this.player.weapon.id;
                this.flags[kFLAGS_1.kFLAGS.PLAYER_DISARMED_WEAPON_ATTACK] = this.player.weaponAttack;
                this.player.setWeapon(WeaponLib_1.WeaponLib.FISTS);
                //				player.weapon.unequip(player,false,true);
            }
        }
        cycloneStrike() {
            //Difficult to avoid, moderate damage.
            this.outputText("Twisting back, the giant abruptly launches into a circular spin. Its hammer stays low enough to the ground that its circular path is tearing a swath of destruction through the once pristine garden, and it's coming in your direction!");
            var damage = (175 + Math.floor((this.str + this.weaponAttack) - LivingStatue.rand(this.player.tou) - this.player.armorDef)) / (LivingStatue.rand(3) + 2);
            //Avoid
            if (damage <= 0 || this.combatMiss() || this.combatEvade() || this.combatFlexibility() || this.combatMisdirect())
                this.outputText(" By the grace of the gods, you somehow avoid the spinning hammer.");
            else {
                //Hit
                this.outputText(" You're squarely struck by the spinning hammer.");
                damage = this.player.takeDamage(damage);
                this.outputText(" (" + damage + ")");
            }
        }
        performCombatAction() {
            if (this.HPRatio() < 0.7 && this.findStatusAffect(StatusAffects_1.StatusAffects.KnockedBack) < 0) {
                this.backhand();
            }
            else if (this.HPRatio() < 0.4 && this.findStatusAffect(StatusAffects_1.StatusAffects.Disarmed) < 0 && this.player.weaponName != "fists") {
                this.disarm();
            }
            else {
                var opts = [];
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Blind) < 0 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.Stunned) < 0)
                    opts.push(this.dirtKick);
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Blind) < 0 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.Stunned) < 0)
                    opts.push(this.concussiveBlow);
                opts.push(this.cycloneStrike);
                opts.push(this.cycloneStrike);
                opts.push(this.overhandSmash);
                opts[LivingStatue.rand(opts.length)]();
            }
            this.combatRoundOver();
        }
    }
    exports.LivingStatue = LivingStatue;
});
//# sourceMappingURL=LivingStatue.js.map