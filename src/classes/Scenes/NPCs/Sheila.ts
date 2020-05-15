import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_DRY,
    BUTT_RATING_AVERAGE,
    HIP_RATING_AVERAGE,
    LOWER_BODY_TYPE_KANGAROO,
    TAIL_TYPE_KANGAROO,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_WETNESS_SLICK,
} from "../../../includes/appearanceDefs";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { ChainedDrop } from "../../internals/ChainedDrop";
import { WeightedDrop } from "../../internals/WeightedDrop";
import { Monster } from "../../Monster";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";

export class Sheila extends Monster {
    /*
    so it's come to a [Fight] - combat before demon Sheila:
    -fast and fairly strong, can deal decent damage and dodges attacks/phys specials very well, hard to escape if piqued, but light on hp/lust res and very vulnerable to magic or constrict if captured - goes down in 1-2 good attacks
    -overall, weaker but faster than other shit on the plains*/

    // special 1: frog punch (med-high damage, slightly lower accuracy than reg attack, deals minor concussion which adds 5-10 pts fatigue, may stun pc and prevent attack, misses while blinded or misfires on pcs under 3'6")
    private sheilaFrogPunch(): void {
        let damage = 0;
        this.spe -= 30;
        // Midget misfire (if PC < 3'6"):
        if (this.player.tallness < 42 && Sheila.rand(2) == 0) {
            this.outx(
                "Sheila bounces up to you and crouches low, curling her body like a watchspring.  She uncoils with her fist aimed at your jaw, but you easily perform a crouch of your own and duck under her lanky form, unbending yourself to push her legs up as she flies harmlessly overhead.  You can hear a partial shriek before she crashes face-first into the dirt behind you."
            );
            damage = 3 + Sheila.rand(10);
            damage = kGAMECLASS.doDamage(damage);
            this.outx(` (${damage})`);
        }
        // Miss:
        else if (
            this.combatMiss() ||
            this.combatFlexibility() ||
            this.combatEvade() ||
            this.combatMisdirect() ||
            this.findStatusAffect(StatusAffects.Blind) >= 0
        ) {
            this.outx(
                "Sheila bounces up to you and crouches low, curling up her body like a watchspring.  The girl uncoils with fist raised, but you lean away from the uppercut, catching a faceful of her breasts instead!  Sheila squeals and pushes away from you"
            );
            // [(libido>40)
            if (this.player.lib > 40) {
                this.outx(
                    ", though not before you have a chance to stick your tongue in her cleavage!"
                );
            } else this.outx(".");
            this.outx(
                "  Blushing pinkly, she crosses her arms over her chest as she resumes her distance."
            );
            // (+med-small lib-based lust damage to PC)
            kGAMECLASS.dynStats("lus", 10 + Sheila.rand(this.player.sens / 10));
        }
        // Hit:
        else {
            this.outx(
                "Sheila bounces up to you and crouches low, curling up her body like a watchspring.  The girl uncoils just as quickly, launching herself at your face with a fist raised in front of her.  She lands a staggering crack on your jaw which knocks your head back and blurs your vision!"
            );
            // deals minor concussion which adds 5-10 pts fatigue, may stun pc and prevent attack, misses while blinded or misfires on pcs under 3'6")
            kGAMECLASS.fatigue(5 + Sheila.rand(5));
            if (Sheila.rand(2) == 0 && this.player.findPerk(PerkLib.Resolute) < 0) {
                this.player.createStatusAffect(StatusAffects.Stunned, 1, 0, 0, 0);
                this.outx("  <b>You are stunned!</b>");
            }
            damage = Math.floor(
                this.str + this.weaponAttack - Sheila.rand(this.player.tou) - this.player.armorDef
            );
            if (damage < 1) damage = 2;
            damage = this.player.takeDamage(damage);
            this.outx(` (${damage})`);
        }
        this.spe += 30;
        this.combatRoundOver();
    }

    // special 2: flying kick rabbit punch (high damage, much lower accuracy than reg attack, deals concussion which adds 10-15 pts fatigue, may stun pc and prevent attack)
    private sheilaFlyingKick(): void {
        let damage = 0;
        this.spe -= 60;
        // Miss:
        if (
            this.combatMiss() ||
            this.combatFlexibility() ||
            this.combatEvade() ||
            this.combatMisdirect() ||
            (this.findStatusAffect(StatusAffects.Blind) >= 0 && Sheila.rand(3) == 0)
        ) {
            this.outx(
                'Sheila squats down, then bounds explosively toward you!  She swings her leg out in front to kick, but you roll to the side and she slips past your shoulder.  You hear an "<i>Oof!</i>" as she lands on her butt behind you.  When you turn to look, she\'s already back to her feet, rubbing her smarting posterior and looking a bit embarrassed.'
            );
            // (small Sheila HP loss)
            damage = 3 + Sheila.rand(10);
            damage = kGAMECLASS.doDamage(damage);
            this.outx(` (${damage})`);
        }
        // Hit:
        else {
            this.outx(
                "Sheila squats down, then bounds explosively toward you feet-first!  She snaps one leg out softly just as she reaches your chest, then twists her body to the side, bringing her other leg over and landing a kick to the rear of your skull!  Your vision blurs and you wobble on your feet as she pushes off your chest."
            );
            // Stun triggered:
            if (this.player.findPerk(PerkLib.Resolute) < 0) {
                this.player.createStatusAffect(StatusAffects.Stunned, 2, 0, 0, 0);
                this.outx("  <b>You are stunned!</b>");
            }
            damage = Math.floor(
                this.str +
                    50 +
                    this.weaponAttack -
                    Sheila.rand(this.player.tou) -
                    this.player.armorDef
            );
            if (damage < 1) damage = 2;
            damage = this.player.takeDamage(damage);
            this.outx(` (${damage})`);
            kGAMECLASS.fatigue(10 + Sheila.rand(6));
        }
        this.spe += 60;
        this.combatRoundOver();
    }

    // [Fight] - Combat with demon Sheila (demon sheila = 1):
    // -slightly slower, has much more stamina, intel, and HP now
    // -all special attacks are lust damage
    // -no normal attack
    // -starts with a high base lust(50%+), but also has high resistance to additional lust damage
    // -little higher difficulty than other plains fights, but not much
    // -now totally okay with taking gems and riding the player so hard he passes out for 8 hours regardless
    // -drops shitty kangaroo item and imp food

    // Demon Sheila Combat - Descrip
    // You are fighting Sheila! [Level: Whoopi Goldberg's dreadlocks]
    // Sheila is a slim, somewhat athletic woman, over six feet in height.  Her smooth, dark skin is exposed from her head to her clawed feet, and she makes no effort to conceal anything your eyes might linger on.  The " + sheilaCup() + " breasts on her chest [(sheila corruption <=40)are firm, squeezable teardrops; she runs a hand absently over one from time to time.  /(else)jiggle as she moves, and she shoves them out to make sure you see just how lewd her body has become since your first meeting.  ]Straight, jaw-length auburn hair frames her face along with two long, smooth ears that stick out sideways.  Her only nods to civilization are a dangling purple earring and the finger rings that she wears on her hands, and the wild woman stares openly at you, touching herself.

    // Demon Sheila Combat - Special Attacks
    // 1: Suspicious Glint (int-based hit chance)
    private suspiciousGlint(): void {
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Sheila.rand(2) == 0) {
            this.outx(
                "Sheila's blind eyes glint suspiciously as she focuses her power, trying to send her fantasy to anything caught in their stare.  It seems to work - the rock next to you vibrates a little."
            );
        }
        // Miss:
        else if (this.player.inte / 15 + Sheila.rand(20) + 1 > 16) {
            this.outx(
                "Sheila's eyes glint suspiciously as she proclaims her affection for you and begs you to look into them, but you keep your head down and focus on her feet.  You can feel her stare boring holes into you, but eventually she abandons the attempt."
            );
        }
        // Hit:
        else {
            this.outx(
                "Sheila's eyes glint suspiciously, and you feel your mind slowing down and your body heating up as you meet her lascivious gaze.  Too late you look away, but the damage is done; her fantasies of "
            );
            if (!this.player.hasCock())
                this.outx("burying her drooling tail inside you until it squirts");
            else this.outx("riding your dick to the hilt");
            this.outx(
                ' run rampant inside your head and crowd out everything else.  "<i>Did you see it, [name]?  My love for you?</i>" Sheila asks, smiling.  God, did you ever!  You can hardly focus on anything!'
            );
            // big (20+) int drop and big lib-based lust gain if successful, locks Infest command for the fight if successful, always misses if Sheila is blinded
            if (this.findStatusAffect(StatusAffects.TwuWuv) < 0) {
                this.createStatusAffect(StatusAffects.TwuWuv, 0, 0, 0, 0);
                let counter: number = 40 + Sheila.rand(5);
                Sheila.showStatDown("inte");
                // inteDown.visible = true;
                // inteUp.visible = false;
                while (counter > 0) {
                    if (this.player.inte >= 2) {
                        this.player.inte--;
                        this.addStatusValue(StatusAffects.TwuWuv, 1, 1);
                    }
                    counter--;
                }
            }
            this.game.dynStats("lus", 30 + this.player.lib / 10 + this.player.cor / 10);
        }
        this.combatRoundOver();
    }

    // 2: Tittymonster
    private tittyMonsterAttack(): void {
        this.outx(
            `Sheila giggles and strokes her ${this.game.sheilaScene.sheilaCup()} breasts, trying to entice you.`
        );
        // results, no new pg
        // [(sheila corruption < 20; 'miss')
        if (this.game.sheilaScene.sheilaCorruption() < 20)
            this.outx(
                "  But with nothing there for her to work with, it's a lot like being teased by a dressmaker's mannequin."
            );
        // (else if sheila corruption < 150; 'hit')
        else if (this.game.sheilaScene.sheilaCorruption() < 150) {
            this.outx(
                '  As her hands run over the soft-looking mammaries, kneading and squeezing them, teasing the nipples relentlessly until she lets out a cute little moan, you feel the blood rush to your face.  "<i>Enjoying this, are you?</i>" she calls sweetly.  "<i>Why don\'t you stop being contrary and come play with them too?</i>"'
            );
            // med lib-based lust damage if 20 < sheila corruption < 150
            this.game.dynStats("lus", 25 + this.player.lib / 10);
        }
        // (else; 'miss')
        else {
            this.outx(
                "  She has trouble even budging tits so comically mismatched to her slender frame; her hands just sink into the voluminous flesh when she tries to squeeze them together, but the demon doesn't manage to move mountains.  It's like watching someone try to push half-inflated swimming equipment around.  You actually laugh a little as she gives up, rubbing her lower back with a gripe."
            );
        }
        this.combatRoundOver();
    }

    // 3: Splash (spd-based hit chance)
    private splashAttackLookOutShellEvolveIntoGyrados(): void {
        this.outx(
            "Sheila waits patiently, staring at you and stroking her dark, spaded tail with its opposite.  A line of the always-oozing oil falls from the slit, pooling in the smooth brown coil; she unwinds it rapidly, flinging the liquid at your face playfully.  "
        );
        // results, no new PG
        // Hit:
        if (
            !this.combatMiss() &&
            !this.combatEvade() &&
            !this.combatMisdirect() &&
            !this.combatFlexibility()
        ) {
            this.outx(
                "It lands on target, and you're forced to close your eyes lest it get in them!"
            );
            this.player.createStatusAffect(StatusAffects.Blind, 1, 0, 0, 0);
            this.player.createStatusAffect(StatusAffects.SheilaOil, 0, 0, 0, 0);
        } else {
            this.outx(
                'You easily lean away from the path of her tainted fluids, and she sighs.  "<i>You\'re no fun, mate.</i>"'
            );
        }
        this.combatRoundOver();
    }
    // 4: Sit 'n Pout
    // should only be used after turn 4 or 5
    private sitAndPout(): void {
        this.outx(
            "Sheila frowns at you, then plops down on the grass, staring at her feet.  \"<i>Fine.  You win, mate.  I don't feel like arguing anymore, so... just please yourself, I guess.  The best part about a lovers' quarrel is the make-up sex anyway...</i>\" she says, spreading her legs hopefully.  The pout turns to a very faint smile under her bangs."
        );
        this.gems = 0;
        this.XP = 0;
        this.lust = 100;
        this.HP = 0;
        // (if PC lust < 30)
        if (this.player.lust < 33) {
            this.outx(
                "\n\nYou're not that interested, though; Sheila harrumphs as you pass her by and leave."
            );
            this.cleanupAfterCombat();
            return;
        }
        this.combatRoundOver();
        // end fight, suppress xp/gem/item reward, go to victory choices if lust >= 30
    }

    // 5: Lick 'Em and Stick 'Em (int-based hit chance)
    // replaces any calls for Suspicious Glint if PC is blinded by Splash
    private lickEmAndStickEm(): void {
        this.outx(
            "Sheila's voice gets closer, becoming disarmingly apologetic as you scrub furiously at your face in darkness.  \"<i>Oh, my.  I didn't mean to get that in your eyes... let me help clean you up, love.</i>\"  Your face is gently gripped between her hands and pulled down, then the demon begins passing her tongue over you affectionately, wiping the fluid away with long, ticklish licks as you wait for the other shoe to fall."
        );
        this.outx(
            '"<i>All better,</i>" Sheila announces.  With her thumb, she gingerly pushes one eyelid up before you can pull away, proving her claim - and causing you to look right into her own glowing, purple iris.  A fantasy invades your mind, one where '
        );
        if (this.player.hasCock())
            this.outx(
                "[oneCock] fucks Sheila to the base while her tail snakes around and penetrates your [vagOrAss]"
            );
        else
            this.outx(
                "you take Sheila from behind by plunging her spaded tail into your [vagina] as she lies face-down on the ground with her ass pushed in the air"
            );
        this.outx(".");
        // results, no new pg
        // [(int check passed)
        // Miss:
        if (this.player.inte / 15 + Sheila.rand(20) + 1 > 16) {
            this.outx(
                "\n\nBefore the fantasy can advance, you recoil and pull out of the demon's hands, shoving her away."
            );
            this.game.dynStats("lus", 15 + this.player.sens / 20 + this.player.lib / 20);
        }
        // (int check failed)
        else {
            this.outx(
                "\n\nYour ego's urgent danger warnings are drowned in a sea of rising lust, and you find yourself transfixed.  The vision continues until Sheila tires of fantasizing."
            );
            // mild lib-based lust gain if PC resists; else big int drop and big lib-based lust gain plus Infest lock for remainder of fight
            this.game.dynStats("lus", 25 + this.player.sens / 20 + this.player.lib / 20);
            // harder to resist and bigger damage than normal Suspicious Glint
        }
        this.combatRoundOver();
    }

    // 6: "Pressure Points"
    // replaces any calls for Tittymonster if PC is blinded by Splash
    private pressurePointsAttack(): void {
        this.outx("For a moment, all goes quiet, save for a soft rustle.\n\n");
        // results, no new pg
        // [(sheila corruption < 100; hit, 'light damage')]
        if (this.game.sheilaScene.sheilaCorruption() < 100) {
            this.outx(
                `The silence is broken with a giggle as the demon catches you in an embrace, pressing her ${this.game.sheilaScene.sheilaCup()} breasts into you.  You shiver as she drags the perky nipples over your ${this.player.skinFurScales()}, but push her away.`
            );
            this.game.dynStats("lus", 15 + this.player.sens / 20 + this.player.lib / 20);
        } else if (this.game.sheilaScene.sheilaCorruption() < 300) {
            this.outx(
                `A sigh ends the silence as your body is partially enfolded in the hot valley of an aroused Sheila's cleavage. As the demon grabs you and pushes her tits into you, the skin-on-${this.player.skinFurScales()} contact makes you shiver, and your attempts to get free meet with some resistance... or rather, a lack of resistance, as the soft, yielding breast flesh quivers and heats to your touch without moving the demon overmuch.  You accidentally brush her nipples several times before you can escape, unleashing horny moans from Sheila that linger in your mind.`
            );
            this.game.dynStats("lus", 25 + this.player.sens / 20 + this.player.lib / 20);
        } else {
            // ; miss)
            this.outx(
                "You're a bit unnerved, but soon realize that you can tell where Sheila is by listening for the telltale sounds of her colossal breasts scraping the ground as she draws closer to you.  With this in mind, you continue to face your opponent and back away as you wipe your eyes."
            );
            this.outx('\n\n"<i>Aww, come on!</i>" she whines.');
        }
        this.combatRoundOver();
    }

    private demonSheilaAI(): void {
        // Count up till give up!
        if (this.findStatusAffect(StatusAffects.Counter) < 0)
            this.createStatusAffect(StatusAffects.Counter, 0, 0, 0, 0);
        this.addStatusValue(StatusAffects.Counter, 1, 1);
        if (this.statusAffectv1(StatusAffects.Counter) >= 5) {
            this.sitAndPout();
            return;
        }
        let choices: any[] = [];

        if (this.player.findStatusAffect(StatusAffects.SheilaOil) < 0) {
            choices = [
                this.suspiciousGlint,
                this.tittyMonsterAttack,
                this.splashAttackLookOutShellEvolveIntoGyrados,
            ];
        } else {
            choices = [this.pressurePointsAttack, this.lickEmAndStickEm];
        }
        choices[Sheila.rand(choices.length)]();
    }

    protected performCombatAction(): void {
        if (this.game.flags[kFLAGS.SHEILA_DEMON] == 1) {
            this.demonSheilaAI();
            return;
        }
        if (Sheila.rand(3) == 0) this.eAttack();
        else if (Sheila.rand(2) == 0) this.sheilaFlyingKick();
        else this.sheilaFrogPunch();
    }

    public defeated(hpVictory: boolean): void {
        if (this.game.flags[kFLAGS.SHEILA_DEMON] == 1) this.game.sheilaScene.beatUpDemonSheila();
        else this.game.sheilaScene.sheilaGotWhomped();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (this.game.flags[kFLAGS.SHEILA_DEMON] == 1) this.game.sheilaScene.loseToSheila();
        else this.game.sheilaScene.getBeatUpBySheila();
    }

    public constructor() {
        super();
        const sheilaDemon: boolean = this.game.flags[kFLAGS.SHEILA_DEMON] == 1;
        this.a = "";
        this.short = "Sheila";
        this.imageName = "sheila";

        if (sheilaDemon) {
            this.long = `Sheila is a slim, somewhat athletic woman, over six feet in height.  Her smooth, dark skin is exposed from her head to her clawed feet, and she makes no effort to conceal anything your eyes might linger on.  The ${this.game.sheilaScene.sheilaCup()} breasts on her chest${
                this.game.sheilaScene.sheilaCorruption() <= 40
                    ? " are firm, squeezable teardrops; she runs a hand absently over one from time to time."
                    : " jiggle as she moves, and she shoves them out to make sure you see just how lewd her body has become since your first meeting."
            }  Straight, jaw-length auburn hair frames her face along with two long, smooth ears that stick out sideways.  Her only nods to civilization are a dangling purple earring and the finger rings that she wears on her hands, and the wild woman stares openly at you, touching herself.`;
        } else {
            this.long = `Sheila is a slim, somewhat athletic woman, over six feet in height.  Most of her lightly-tanned skin is hidden, either by her vest and shorts or by the fuzzy fur that covers her legs from the thighs down to her prominent nails.  Her ${this.game.sheilaScene.sheilaCup()} breasts are briefly defined against the white of her shirt as she sways on her feet, ${
                this.game.sheilaScene.sheilaCorruption() <= 40
                    ? "small, round things that match her slender frame."
                    : "swollen, jiggling globes that stand in contrast to her slender body and tell a tale of all the corruption that has been pumped into her."
            }  Her straight, jaw-length auburn hair hangs unrestrained, falling around the fuzzy ears that stick out sideways from her head.  The hat she usually wears is hanging on her back by a string, pushed off to prevent its being lost in the chaos.  Something about slipping a rope around her own neck just to keep a hat tells you that Sheila's mind isn't really staying in the fight - though it could also be the desperate, faraway look in her eyes.`;
        }

        // this.plural = false;
        this.createVagina(
            this.game.flags[kFLAGS.SHEILA_XP] <= 3 && !sheilaDemon,
            VAGINA_WETNESS_SLICK,
            VAGINA_LOOSENESS_NORMAL
        );
        this.createStatusAffect(StatusAffects.BonusVCapacity, 30, 0, 0, 0);
        this.createBreastRow(this.game.flags[kFLAGS.SHEILA_CORRUPTION] / 10);
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 20, 0, 0, 0);
        this.tallness = 6 * 12;
        this.hipRating = HIP_RATING_AVERAGE;
        this.buttRating = BUTT_RATING_AVERAGE + 1;
        this.lowerBody = LOWER_BODY_TYPE_KANGAROO;
        this.skinTone = "tan";
        this.hairColor = "auburn";
        this.hairLength = 11;
        this.initStrTouSpeInte(80, 45, 95, 50);
        this.initLibSensCor(30, 45, 25);
        let lust = 30;
        let lustVuln = 0.4;
        let bonusHP = 200;
        if (sheilaDemon) {
            // -slightly slower, has much more stamina, intel, and HP now
            this.spe -= 15;
            this.tou += 30;
            this.inte += 30;
            bonusHP += 200;
            lust = 50;
            lustVuln = 0.15;
            // -all special attacks are lust damage
            // -no normal attack
            // -starts with a high base lust(50%+), but also has high resistance to additional lust damage
            // -little higher difficulty than other plains fights, but not much
            // -now totally okay with taking gems and riding the player so hard he passes out for 8 hours regardless
            // -drops shitty kangaroo item and imp food
        }
        this.weaponName = "foot";
        this.weaponVerb = "kick";
        this.weaponAttack = 10;
        this.armorName = "clothes";
        this.armorDef = 4;
        this.bonusHP = bonusHP;
        this.lust = lust;
        this.lustVuln = lustVuln;
        this.temperment = Sheila.TEMPERMENT_LUSTY_GRAPPLES;
        this.level = 14;
        this.gems = Sheila.rand(5) + 5;
        if (this.game.flags[kFLAGS.SHEILA_DEMON] == 0) {
            this.drop = new WeightedDrop(this.consumables.KANGAFT, 1);
        } else {
            this.drop = new ChainedDrop(this.consumables.KANGAFT)
                .add(this.consumables.SUCMILK, 1 / 3)
                .add(this.consumables.INCUBID, 1 / 2);
        }
        this.tailType = TAIL_TYPE_KANGAROO;
        this.checkMonster();
    }
}
