import { trace } from "../../../console";
import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_DRY,
    BUTT_RATING_EXPANSIVE,
    HIP_RATING_INHUMANLY_WIDE,
    SKIN_TYPE_PLAIN,
    VAGINA_LOOSENESS_GAPING_WIDE,
    VAGINA_WETNESS_DROOLING,
    WING_TYPE_HARPY,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { ChainedDrop } from "../../internals/ChainedDrop";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";
import { Harpy } from "../Areas/HighMountains/Harpy";

/**
 * ...
 *
 * @author Fake-Name
 */

export class Sophie extends Harpy {
    // Combat Attacks
    // ON DICK'ED PCz
    // Kiss (Only used on males) - +10 lust on kiss.  25% chance
    // per round of increasing lust by 20.  Repeat kisses add
    // +20 lust.  Each kiss adds 2 hours to length of status
    // affect.
    private sophieKissAttack(): void {
        this.game.sophieBimbo.sophieSprite();
        this.outx(
            "Sophie bobs and weaves as she closes the distance between you in an instant.  ",
            false
        );
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Sophie.rand(3) < 2) {
            this.outx(
                `${
                    this.capitalA + this.short
                } looks like she's trying to kiss you, but it's easy to avoid the blind harpy!\n`,
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
                "Sophie changes direction in a flash, trying to slip inside your guard, but you manage to sidestep the incredibly fast harpy's attack.\n",
                false
            );
            return;
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Sophie.rand(100) < 10) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s attack.\n`,
                false
            );
            return;
        }
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Sophie.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep ${this.a}${this.short}'s attack.\n`,
                false
            );
            return;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Sophie.rand(100) < 6) {
            this.outx(
                `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}`
            );
            this.outx("'s attack.\n", false);
            return;
        }
        // YOU GOT HIT SON
        this.outx(
            "Before you can react, she gives you a chaste peck on the lips.  The harpy pulls back with a sultry smile, watching you expectantly.",
            false
        );

        // Already affected by it
        if (this.player.findStatusAffect(StatusAffects.Luststick) >= 0) {
            this.outx(
                `  Blood rushes to ${this.player.sMultiCockDesc()} as you grow so hard so fast that it hurts.  `
            );
            this.game.sophieScene.luststickApplication(2);
            this.game.dynStats("lus", 12 + this.player.lib / 10);
            if (this.player.lust < 70)
                this.outx("The drugged lip-gloss is starting to get to you!\n", false);
            else if (this.player.lust < 80)
                this.outx(
                    "Her curvy thighs look so inviting.  You barely stop yourself before you climb in between them!\n",
                    false
                );
            else if (this.player.lust < 90)
                this.outx(
                    `A trickle of pre-cum leaks from ${this.player.sMultiCockDesc()}.  Sophie coos, "<i>Why don't you give in and let mommy Sophie drain out all that juicy cum?</i>"\n`,
                    false
                );
            else if (this.player.lust < 100)
                this.outx(
                    `${this.player.SMultiCockDesc()} twitches and bounces in time with your heartbeat, practically pulling you towards Sophie's gaping, pink-linked snatch.\n`,
                    false
                );
            else
                this.outx(
                    `So horny.  You need to copulate - no, fuck - right NOW.  Your hand touches your ${this.player.cockDescript(
                        0
                    )} and you swoon, pumping your hips lewdly as you submit.\n`,
                    false
                );
        } else {
            this.outx(
                "  Your whole body blushes as your lips tingle with some unnatural sensation.  Her lips were drugged!  Your whole body flushes as arousal begins to course through your veins.  ",
                false
            );
            this.game.sophieScene.luststickApplication(2);
            this.game.dynStats("lus", 8 + this.player.lib / 10);
            if (this.player.lust < 70)
                this.outx("The drugged lip-gloss is starting to get to you!\n", false);
            else if (this.player.lust < 80)
                this.outx(
                    "Her curvy thighs look so inviting.  You barely stop yourself before you climb in between them!\n",
                    false
                );
            else if (this.player.lust < 90)
                this.outx(
                    `A trickle of pre-cum leaks from ${this.player.sMultiCockDesc()}.  Sophie coos, "<i>Why don't you give in and let mommy Sophie drain out all that juicy cum?</i>"\n`,
                    false
                );
            else if (this.player.lust < 100)
                this.outx(
                    `${this.player.SMultiCockDesc()} twitches and bounces in time with your heartbeat, practically pulling you towards Sophie's gaping, pink-linked snatch.\n`,
                    false
                );
            else
                this.outx(
                    `So horny.  You need to copulate - no, fuck - right NOW.  Your hand touches your ${this.player.cockDescript(
                        0
                    )} and you swoon, pumping your hips lewdly as you submit.\n`,
                    false
                );
        }
    }

    // Harpy-Boating (Only used on males)
    // Takes off and flies directly at PC, locking her hips
    // around PC's torso and smothering the PC with breasts
    // for a few moments.
    // Easily dodged with evade or flexibility.
    private sophieHarpyBoatsPC(): void {
        this.game.sophieBimbo.sophieSprite();
        this.outx(
            `${
                this.capitalA + this.short
            } flaps her wings and launches herself forwards with her talons up.  `
        );
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Sophie.rand(3) < 2) {
            this.outx(
                `${
                    this.capitalA + this.short
                }'s talons are easy to avoid thanks to her blindness!\n`,
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
                `${
                    this.a + this.short
                }'s movements are incredibly fast but you manage to sidestep them.\n`,
                false
            );
            return;
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Sophie.rand(100) < 60) {
            this.outx(
                `Using your skills at evading attacks, you determine ${this.a}${this.short} is aiming for your upper body and slide under the attack.\n`,
                false
            );
            return;
        }
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Sophie.rand(100) < 40 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep ${this.a}${this.short}'s attack.\n`,
                false
            );
            return;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Sophie.rand(100) < 40) {
            this.outx(
                `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}`
            );
            this.outx("'s attack.\n", false);
            return;
        }
        // YOU GOT HIT SON
        this.outx(
            "She hits you hard, nearly bowling you over.  Thankfully, her talons passed to either side of your torso.  They lock together behind your back and your face is pulled tightly into Sophie's smotheringly large mounds!",
            false
        );
        if (Sophie.rand(2) == 0)
            this.outx(
                '  She jiggles them around you pleasantly and coos, "<i>Don\'t fight it baby.  Just let your body do what comes naturally.</i>"\n',
                false
            );
        else
            this.outx(
                "  She runs her long fingernails through your hair as she whispers, \"<i>Why fight it?  I'll make you feel so good.  Just relax and play with momma Sophie's tits.</i>\"\n",
                false
            );
        this.game.dynStats("lus", 13 + this.player.sens / 10);
    }

    // Compulsion (Male Only)
    private sophieCompulsionAttack(): void {
        this.game.sophieBimbo.sophieSprite();
        this.outx(
            'Sophie spreads her thick thighs and slips four fingers into her slippery sex.  She commands, "<i>Touch yourself for me.  Be a good pet and masturbate for me.</i>"  ',
            false
        );
        // Autosucceeds if player inte < 40
        // autofails if player inte > 80
        // Player fails:
        if (
            this.player.inte < 40 ||
            (this.player.inte < 80 && Sophie.rand(40) > this.player.inte - 40)
        ) {
            this.outx(
                `You moan out loud as your arms move of their own volition.  They reach inside your ${
                    this.player.armorName
                } and stroke ${this.player.sMultiCockDesc()}, caress the tip, and continue to fondle you a few moments.`
            );
            this.outx(
                "Even after regaining control of your limbs, you're left far more turned on by the ordeal.",
                false
            );
            this.game.dynStats("lus", 15 + this.player.cor / 20 + this.player.lib / 20);
        }
        // Player resists
        else {
            this.outx(
                "You can feel her words carrying the force of a magical compulsion behind them, but you focus your willpower and overcome it.",
                false
            );
        }
    }

    // ON FEMALE PCz
    // Talons (Female Only)
    // High damage attack easily avoided by evade/flexibility.
    private talonsSophie(): void {
        this.game.sophieBimbo.sophieSprite();
        this.outx("Sophie pulls her leg up, cocking her thigh dangerously.  Look out!  ");
        let damage = 0;
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Sophie.rand(3) < 2) {
            this.outx(
                `${
                    this.capitalA + this.short
                }'s talons are easy to avoid thanks to her blindness!\n`,
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
                `${
                    this.a + this.short
                }'s tears through the air, but you manage to just barely dodge it.\n`,
                false
            );
            return;
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Sophie.rand(100) < 60) {
            this.outx(
                `Using your skills at evading attacks, you watch ${this.a}${this.short} and deftly sidestep her brutal talons.\n`,
                false
            );
            return;
        }
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Sophie.rand(100) < 30 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep ${this.a}${this.short}'s attack.\n`,
                false
            );
            return;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Sophie.rand(100) < 40) {
            this.outx(
                `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}`
            );
            this.outx("'s attack.\n", false);
            return;
        }
        this.outx(
            `Her leg lashes forwards, lightning-quick, and tears bloody gashes into your ${this.player.skinDesc} with her razor-sharp talons! `
        );
        // Determine damage - str modified by enemy toughness!
        damage = Math.floor(
            this.str + this.weaponAttack - Math.random() * this.player.tou - this.player.armorDef
        );
        if (damage < 0) damage = 0;
        damage += 40;
        damage = this.player.takeDamage(damage);
        this.outx(`(${damage})\n`, false);
    }
    // Batter (Female Only)
    // Batters PC with wings – 4x attack impossible to dodge.*/
    private batterAttackSophie(): void {
        this.game.sophieBimbo.sophieSprite();
        let damage = 0;
        this.outx(
            "Sophie comes at you in a flurry of beating wings!  There's no way to dodge the flurry of strikes!\n",
            false
        );

        // Determine damage - str modified by enemy toughness!
        damage = Math.floor(this.str - Math.random() * this.player.tou - this.player.armorDef);
        if (damage < 0) damage = 0;
        damage = this.player.takeDamage(damage);
        this.outx(`Her left primary wing batters your head! (${damage})\n`, false);
        // Determine damage - str modified by enemy toughness!
        damage = Math.floor(this.str - Math.random() * this.player.tou - this.player.armorDef);
        if (damage < 0) damage = 0;
        damage = this.player.takeDamage(damage);
        this.outx(`Her right, wing-like arm slaps at your torso! (${damage})\n`, false);
        // Determine damage - str modified by enemy toughness!
        damage = Math.floor(this.str - Math.random() * this.player.tou - this.player.armorDef);
        if (damage < 0) damage = 0;
        damage = this.player.takeDamage(damage);
        this.outx(`Her other feathery arm punches at your shoulder! (${damage})\n`, false);
        // Determine damage - str modified by enemy toughness!
        damage = Math.floor(this.str - Math.random() * this.player.tou - this.player.armorDef);
        if (damage < 0) damage = 0;
        damage = this.player.takeDamage(damage);
        this.outx(`Her right wing slams into the other side of your head! (${damage})\n`, false);
    }

    protected performCombatAction(): void {
        // Sophie has special AI in harpySophie.as
        this.game.sophieBimbo.sophieSprite();
        // var select: number = 1;
        let rando = 1;
        // Update attacks for girls/neuters
        if (!this.player.hasCock() || this.findStatusAffect(StatusAffects.BimboBrawl) >= 0) {
            // Talons
            this.special1 = this.talonsSophie;
            // Batter
            this.special2 = this.batterAttackSophie;
            // Clear
            this.special3 = undefined;
        }
        // Dicks ahoy
        else {
            // kiss
            this.special1 = this.sophieKissAttack;
            // harpy-boating
            this.special2 = this.sophieHarpyBoatsPC;
            // compulsion
            this.special3 = this.sophieCompulsionAttack;
        }
        if (this.player.hasCock() && this.findStatusAffect(StatusAffects.BimboBrawl) < 0)
            rando = 1 + Sophie.rand(3);
        else rando = 1 + Sophie.rand(2);
        if (rando == 1) this.special1();
        if (rando == 2) this.special2();
        if (rando == 3) this.special3();
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        if (this.findStatusAffect(StatusAffects.BimboBrawl) >= 0)
            this.game.sophieFollowerScene.beatUpDebimboSophie();
        else this.game.sophieScene.sophieLostCombat();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (this.findStatusAffect(StatusAffects.BimboBrawl) >= 0)
            this.game.sophieFollowerScene.debimboSophieBeatsYouUp();
        else if (pcCameWorms) {
            this.outx(
                "\n\nYour foe seems disgusted by the display and leaves you to recover alone..."
            );
            this.game.cleanupAfterCombat();
        } else {
            this.game.sophieScene.sophieWonCombat();
        }
    }

    public constructor() {
        super(true);
        trace("Sophie Constructor!");

        this.a = "";
        this.short = "Sophie";
        this.imageName = "sophie";
        this.long =
            "Sophie is approximately the size of a normal human woman, not counting the large feathery wings that sprout from her back.  Her face is gorgeous, with large rounded eyes and glimmering amber lip-gloss painted on her lush, kissable lips.  In spite of her beauty, it's clear from the barely discernible laugh lines around her mouth that she's been around long to enough to have quite a few children.  Her feathers are light pink, though the downy plumage that comprises her 'hair' is brighter than the rest.  She moves with practiced grace despite the large, jiggling breasts that hang from her chest.  Judging from her confident movements, she's an experienced fighter.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_DROOLING, VAGINA_LOOSENESS_GAPING_WIDE);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 40, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("DD"));
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 10, 0, 0, 0);
        this.tallness = 5 * 12 + 5;
        this.hipRating = HIP_RATING_INHUMANLY_WIDE;
        this.buttRating = BUTT_RATING_EXPANSIVE;
        this.skinTone = "pink";
        this.skinType = SKIN_TYPE_PLAIN;
        this.skinDesc = "feathers";
        this.hairColor = "pink";
        this.hairLength = 16;
        this.initStrTouSpeInte(55, 40, 110, 60);
        this.initLibSensCor(60, 50, 60);
        this.weaponName = "talons";
        this.weaponVerb = "slashing talons";
        this.weaponAttack = 20;
        this.armorName = "feathers";
        this.armorDef = 5;
        this.bonusHP = 250;
        this.lust = 10;
        this.lustVuln = 0.3;
        this.temperment = Sophie.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 11;
        this.gems = 20 + Sophie.rand(25);
        this.drop = new ChainedDrop()
            .add(this.armors.W_ROBES, 1 / 10)
            .elseDrop(this.consumables.GLDSEED);
        this.wingType = WING_TYPE_HARPY;
        this.wingDesc = "large feathery";
        this.special1 = this.harpyUberCharge;
        this.special2 = this.harpyTease;
        this.checkMonster();
    }
}
