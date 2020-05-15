import {
    ANAL_LOOSENESS_NORMAL,
    ANAL_WETNESS_DRY,
    BUTT_RATING_NOTICEABLE,
    HIP_RATING_CURVY,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_WETNESS_SLICK,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { Monster } from "../../Monster";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";
/**
 * ...
 *
 * @author ...
 */
export class Izma extends Monster {
    // [Special Attacks]
    private IzmaSpecials1(): void {
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Izma.rand(3) < 2) {
            this.outx(
                "Izma attempts to close the distance with you, but misses completely because of her blindness.\n",
                false
            );
            return;
        }
        // Determine if dodged!
        if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                "Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n",
                false
            );
            return;
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Izma.rand(100) < 10) {
            this.outx(
                "Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n",
                false
            );
            return;
        }
        // ("Misdirection"
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Izma.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                "Izma attempts to get close, but you put Raphael's teachings to use and side-step the sharkgirl, confusing her with your movements.\n",
                false
            );
            return;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Izma.rand(100) < 6) {
            this.outx(
                "Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n",
                false
            );
            return;
        }
        this.outx(
            'Izma rushes you with impressive speed, striking a few precise locations on your joints with her fingertips before leaping back.  It doesn\'t hurt, but you feel tired and sore. "<i>Pressure points...</i>" she laughs, seeing your confused expression.',
            false
        );
        // (Fatigue damage)
        this.game.fatigue(20 + Izma.rand(20));
    }

    private IzmaSpecials2(): void {
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Izma.rand(3) < 2) {
            this.outx("Izma blindly tries to clinch you, but misses completely.\n", false);
            return;
        }
        // Determine if dodged!
        if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                "Izma tries to clinch you, but you use your speed to keep just out of reach.\n",
                false
            );
            return;
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Izma.rand(100) < 10) {
            this.outx(
                "Izma tries to clinch you, but she didn't count on your skills in evasion.  You manage to sidestep her at the last second.\n",
                false
            );
            return;
        }
        // ("Misdirection"
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Izma.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                "Izma ducks and weaves forward to clinch you, but thanks to Raphael's teachings, you're easily able to misguide her and avoid the clumsy grab.\n",
                false
            );
            return;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Izma.rand(100) < 6) {
            this.outx(
                "Izma tries to lock you in a clinch, but your cat-like flexibility makes it easy to twist away from her grab.\n",
                false
            );
            return;
        }
        let damage = 0;
        damage = Math.round(130 - Izma.rand(this.player.tou + this.player.armorDef));
        if (damage < 0) damage = 0;
        this.outx(
            "Izma ducks and jinks, working to close quarters, and clinches you. Unable to get your weapon into play, you can only ",
            false
        );
        if (this.player.armorDef >= 10 || damage == 0) {
            // (armor-dependent Health damage, fullplate, chain, scale, and bee chitin armor are unaffected, has a chance to inflict 'Bleed' damage which removes 2-5% of health for the next three turns if successful)
            damage = this.player.takeDamage(damage);
            this.outx(
                "writhe as she painfully drags the blades of her glove down your back",
                false
            );
            this.player.createStatusAffect(StatusAffects.IzmaBleed, 3, 0, 0, 0);
        } else this.outx("laugh as her blades scape uselessly at your armor-clad back");
        this.outx(` before breaking her embrace and leaping away. (${damage})`);
    }
    private IzmaSpecials3(): void {
        this.outx(
            "Rather than move to attack you, Izma grins at you and grabs her breasts, massaging them as she caresses her long penis with one knee. Her tail thrashes and thumps the sand heavily behind her as she simulates an orgasm, moaning loudly into the air. The whole display leaves you more aroused than before.",
            false
        );
        // (lust gain)
        this.game.dynStats("lus", 20 + this.player.lib / 5);
    }

    private IzmaAI(): void {
        let choice: number = Izma.rand(5);
        if (choice <= 1) this.eAttack();
        if (choice == 2) {
            if (this.player.fatigue >= 80) choice = 3;
            else this.IzmaSpecials1();
        }
        if (choice == 3) {
            if (this.player.armorDef >= 10 && Izma.rand(3) == 0) this.IzmaSpecials2();
            else choice = 4;
        }
        if (choice == 4) this.IzmaSpecials3();
        this.combatRoundOver();
    }

    public eAttack(): void {
        this.outx(
            "Izma slides up to you, throws a feint, and then launches a rain of jabs at you!\n",
            false
        );
        super.eAttack();
    }

    protected performCombatAction(): void {
        let choice: number = Izma.rand(5);
        if (choice <= 1) this.eAttack();
        if (choice == 2) {
            if (this.player.fatigue >= 80) choice = 3;
            else this.IzmaSpecials1();
        }
        if (choice == 3) {
            if (this.player.armorDef >= 10 && Izma.rand(3) == 0) this.IzmaSpecials2();
            else choice = 4;
        }
        if (choice == 4) this.IzmaSpecials3();
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        this.game.izmaScene.defeatIzma();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx(
                '\n\n"<i>Gross!</i>" Izma cries as she backs away, leaving you to recover alone.'
            );
            this.game.cleanupAfterCombat();
        } else {
            this.game.izmaScene.IzmaWins();
        }
    }

    public constructor() {
        super();
        this.a = "";
        this.short = "Izma";
        this.imageName = "izma";
        this.long =
            "Izma the tigershark stands a bit over 6' tall, with orange skin bearing horizontal stripes covering most of her body.  Her silver-white hair cascades past her shoulders, draping over an impressive pair of DD-cup breasts barely restrained by a skimpy black bikini top.  Under the knee-length grass skirt below them rustles her beastly fifteen-inch penis and four-balled sack; you catch occasional glimpses of them as she moves.  She's tucked her usual reading glasses into her locker at the moment.";
        // this.plural = false;
        this.createCock(15, 2.2);
        this.balls = 4;
        this.ballSize = 3;
        this.createVagina(false, VAGINA_WETNESS_SLICK, VAGINA_LOOSENESS_LOOSE);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 45, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("DD"));
        this.ass.analLooseness = ANAL_LOOSENESS_NORMAL;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 30, 0, 0, 0);
        this.tallness = 5 * 12 + 5;
        this.hipRating = HIP_RATING_CURVY;
        this.buttRating = BUTT_RATING_NOTICEABLE;
        this.skinTone = "striped orange";
        this.hairColor = "silver";
        this.hairLength = 20;
        this.initStrTouSpeInte(80, 90, 85, 65);
        this.initLibSensCor(75, 25, 40);
        this.weaponName = "clawed gauntlets";
        this.weaponVerb = "clawed punches";
        this.weaponAttack = 45;
        this.armorName = "bikini and grass skirt";
        this.armorDef = 8;
        this.bonusHP = 330;
        this.lust = 20;
        this.lustVuln = 0.2;
        this.temperment = Izma.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 15;
        this.gems = Izma.rand(5) + 1;
        this.drop = this.NO_DROP;
        this.checkMonster();
    }
}
