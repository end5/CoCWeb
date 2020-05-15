import { trace } from "../../../console";
import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_DRY,
    BUTT_RATING_NOTICEABLE,
    HIP_RATING_CURVY,
    LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS,
    VAGINA_LOOSENESS_GAPING,
    VAGINA_WETNESS_SLAVERING,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { CockTypesEnum } from "../../CockTypesEnum";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { Monster } from "../../Monster";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";

export class Ceraph extends Monster {
    // [IN COMBAT SPECIALS]
    // [SPECIAL 1] – Ubercharge!
    private ceraphSpecial1(): void {
        this.game.spriteSelect(7);
        if (this.findStatusAffect(StatusAffects.Uber) < 0) {
            if (Ceraph.rand(2) == 0) {
                this.outx(
                    'Ceraph winks and says, "<i>Have you ever cum without being touched? You will.</i>"\n\n',
                    false
                );
            } else {
                this.outx(
                    'Ceraph titters, "<i>Let me show you the true power of an Omnibus.</i>"\n\n',
                    false
                );
            }
            this.outx(
                "Despite her sultry tease, you can tell she's starting to build up to something big...",
                false
            );
            this.createStatusAffect(StatusAffects.Uber, 0, 0, 0, 0);
        } else {
            // (Next Round)
            if (this.statusAffectv1(StatusAffects.Uber) == 0) {
                this.addStatusValue(StatusAffects.Uber, 1, 1);
                if (Ceraph.rand(2) == 0)
                    this.outx(
                        "The demonic hermaphrodite begins forging demonic symbols in the air before her, each glowing brilliant pink before they blur away in a haze.",
                        false
                    );
                else
                    this.outx(
                        "The demonette makes obscene motions with her hands, as if masturbating an imaginary cock or vagina while her hands are wreathed in pink flames.",
                        false
                    );
                this.outx("  <b>She's about to unleash something huge!</b>");
                if (this.player.inte > 50)
                    this.outx(
                        "  You should probably wait so you'll have a chance to avoid whatever's coming.",
                        false
                    );
            }
            // FIRE!
            else {
                this.removeStatusAffect(StatusAffects.Uber);
                // (Avoid!)
                if (this.flags[kFLAGS.IN_COMBAT_USE_PLAYER_WAITED_FLAG] == 1) {
                    this.outx(
                        "She throws her hands out, palms facing you, and a rush of pink flame washes towards you.  Thanks to your decision to wait, it's easy to avoid the onrushing flames and her attack.\n\n",
                        false
                    );
                    this.outx(
                        'Ceraph sighs and asks, "<i>Why would you move?  It would make you feel soooo good!</i>"',
                        false
                    );
                }
                // (AUTO-LOSE)
                else {
                    this.outx(
                        `She throws her hands out, palms facing you, and a rush of pink flame washes towards you.  Too busy with your own attack to effectively dodge, you're hit full on by the pink fire.  Incredibly, it doesn't burn.  The fire actually seems to flow inside you, disappearing into your skin.  You stumble, confused for a second, but then it hits you.  Every inch of your body is buzzing with pleasure, practically squirming and convulsing with sexual delight.  You collapse, twitching and heaving, feeling the constant sensation of sexual release running from your head to your ${this.player.feet()}.  Too horny and pleasured to resist, you lie down and tremble, occasionally rubbing yourself to enhance the bliss.`
                    );
                    this.game.dynStats("lus", 1500);
                }
            }
        }
        this.combatRoundOver();
    }
    // [SPECIAL] – Whip Binding
    private ceraphSpecial2(): void {
        if (this.player.findStatusAffect(StatusAffects.Bound) < 0) {
            this.outx(
                "Ceraph snaps her whip at you, lightning fast.  Unable to avoid the blinding speed of her attack, you find yourself wrapped from head to toe in the strong leather of her whip.  Remarkably, the fire dies out everywhere the whip touches you, leaving you bound but unharmed.",
                false
            );
            // If player has l2 piercing
            if (this.flags[kFLAGS.PC_FETISH] >= 2) {
                this.outx("  Gods this turns you on!");
                this.game.dynStats("lus", 5);
            }
            this.player.createStatusAffect(StatusAffects.Bound, 2 + Ceraph.rand(5), 0, 0, 0);
        }
        // [SPECIAL WHILE PC RESTRAINED]
        else {
            if (Ceraph.rand(2) == 0) {
                this.outx(
                    `Ceraph cuddles up against you, embracing you tenderly.  Her more-than-ample bosom crushes against your flank, and her demonic prick grinds and rubs against your ${this.player.skinDesc}, smearing it with her juices.  Her hands slide over your bound form, sneaking underneath your ${this.player.armorName} to caress you more intimately while you're at her mercy.`
                );
                this.game.dynStats("lus", 9 + this.player.sens / 10);
            }
            // [SPECIAL 2 WHILE PC RESTRAINED]
            else {
                this.outx(
                    "Ceraph blows hot kisses in your ear and slides and rubs against you as she slips over to embrace your front.  She holds up a finger, licks it, and wiggles it back and forth.  It begins to glow pink, dimly at first and then with increasing luminosity.  Once it's reached a brilliant intensity, the sparkling digit is roughly inserted into your mouth.  You can feel the dark magic soaking into your body just like water soaks into a sponge.  ",
                    false
                );
                if (this.player.lust < 33) this.outx("It makes you feel warm and flushed.");
                else if (this.player.lust < 60)
                    this.outx(
                        "It gets inside you and turns you on, stoking the flames of your desire.",
                        false
                    );
                else if (this.player.lust < 80)
                    this.outx(
                        "It makes you very horny, and you begin to wonder if it's worth resisting.",
                        false
                    );
                else
                    this.outx(
                        "It makes you ache and tremble with need, practically begging for another touch.",
                        false
                    );
                this.game.dynStats("lus", 5 + this.player.cor / 10 + this.player.lib / 20);
            }
        }
        this.combatRoundOver();
    }

    // (Struggle)
    public ceraphBindingStruggle(): void {
        this.outx("", true);
        this.outx("You wriggle in the tight binding, trying your best to escape.  ");
        if (this.player.statusAffectv1(StatusAffects.Bound) - 1 <= 0) {
            this.outx(
                "With a mighty twist and stretch, the whip gives and uncurls from you all at once.  You've regained your freedom",
                false
            );
            if (this.flags[kFLAGS.PC_FETISH] >= 2) {
                this.outx(", though you miss the tight leathery embrace");
            }
            this.outx("!");
            this.player.removeStatusAffect(StatusAffects.Bound);
            this.combatRoundOver();
            return;
        } else {
            this.outx(
                "Despite your frantic struggling, all you manage to do is chafe against her impressively taut leather whip.",
                false
            );
            if (this.flags[kFLAGS.PC_FETISH] >= 2) {
                this.outx(
                    "  You get nice and hot from being so effectively restrained, maybe you should just accept it?",
                    false
                );
            }
            this.player.addStatusValue(StatusAffects.Bound, 1, -1);
            // Strong characters break free faster
            if (this.player.str > 65 && Ceraph.rand(this.player.str) > 45) {
                this.outx(
                    "  Though you didn't break free, it seems like your mighty struggles loosened the whip slightly...",
                    false
                );
                this.player.addStatusValue(StatusAffects.Bound, 1, -1);
            }
        }
        this.outx("\n\n", false);
        this.doAI();
    }

    // (Wait)
    public ceraphBoundWait(): void {
        this.outx("", true);
        this.outx(
            `Why bother resisting?  The feeling of the leather wrapped tightly around you, digging into your ${this.player.skinDesc}, is intoxicating.`
        );
        if (this.flags[kFLAGS.PC_FETISH] >= 2) {
            this.outx(
                "  You squirm inside the bindings as you get more and more turned on, hoping that Ceraph will strip away your armor and force you to parade around as her bound, naked pet.",
                false
            );
            this.game.dynStats("lus", 5);
        }
        this.game.dynStats("lus", this.player.lib / 20 + 5 + Ceraph.rand(5));
        this.outx("\n\n", false);
        this.doAI();
    }

    // [Double-Attack]
    private ceraphSpecial3(): void {
        // [Mini-cum] – takes place of double-attack if very horny
        if (this.lust >= 75) {
            this.outx(
                "Ceraph spreads her legs and buries three fingers in her sopping twat, her thumb vigorously rubbing against the base of her bumpy prick.  Her other hand wraps around the meaty pole and begins jerking it rapidly.  In one practiced movement she stops jerking long enough to wrap the whip around her nodule-studded demon-cock, using it like a cockring.  The organ swells thanks to the forced blood-flow, and after a few more seconds of intense masturbation, the demoness cums hard.  Her cunny squirts all over her hand, dripping clear feminine drool down her thighs.  Ceraph's masculine endowment pulses and twitches, blasting out two big squirts of jizm before it slows to a trickle.\n",
                false
            );
            this.outx(
                "Letting out a throaty sigh, the demon unties her self-induced binding and gives you a wink.  Did you really just stand there and watch the whole thing?  Amazingly Ceraph actually seems stronger after such a crude display...",
                false
            );
            // (+10 str/toughness, 1 level, and 10 xp reward.)
            this.XP += 10;
            this.level += 1;
            this.str += 10;
            this.tou += 10;
            this.HP += 20;
            this.lust = 33;
            this.game.dynStats("lus", 3);
            this.outx("\n", false);
            this.combatRoundOver();
            return;
        }
        let damage = 0;
        this.outx(
            "The demoness weaves her whip in the air until you can practically hear it slithering like a snake, cutting the air as it weaves back and forth, still magically alight with flames.  In a blink she lashes out twice in quick succession!\n",
            false
        );
        // First hit!
        this.doNext(this.game.playerMenu);
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Ceraph.rand(10) != 9) {
            this.outx(`${this.capitalA + this.short} completely misses you with a blind attack!`);
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            if (this.player.spe - this.spe < 8)
                this.outx(`You narrowly avoid ${this.a}${this.short}'s ${this.weaponVerb}!`);
            if (this.player.spe - this.spe >= 8 && this.player.spe - this.spe < 20)
                this.outx(
                    `You dodge ${this.a}${this.short}'s ${this.weaponVerb} with superior quickness!`
                );
            if (this.player.spe - this.spe >= 20)
                this.outx(`You deftly avoid ${this.a}${this.short}'s slow ${this.weaponVerb}.`);
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && Ceraph.rand(100) < 10) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s attack.`
            );
        } else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Ceraph.rand(100) < 15 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `With Raphael's teachings and the easy movement afforded by your bodysuit, you easily anticipate and sidestep ${this.a}${this.short}'s attack.`
            );
        }
        // Determine damage - str modified by enemy toughness!
        else {
            damage = Math.floor(
                this.str +
                    this.weaponAttack -
                    Math.random() * (this.player.tou + this.player.armorDef)
            );
            if (damage > 0) {
                damage = this.player.takeDamage(damage);
            }
            if (damage <= 0) {
                damage = 0;
                // Due to toughness or amor...
                if (Ceraph.rand(this.player.armorDef + this.player.tou) < this.player.armorDef)
                    this.outx(
                        `Your ${this.player.armorName} absorb and deflect every ${this.weaponVerb} from ${this.a}${this.short}.`
                    );
                else
                    this.outx(
                        `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throws at you.`
                    );
            }
            if (damage > 0 && damage < 6) {
                this.outx(`You are struck a glancing blow by ${this.a}${this.short}! (${damage})`);
            }
            if (damage > 5 && damage < 11) {
                this.outx(`${this.capitalA + this.short} wounds you! (${damage})`);
            }
            if (damage > 10 && damage < 21) {
                this.outx(
                    `${this.capitalA + this.short} staggers you with the force of ${
                        this.pronoun3
                    } ${this.weaponVerb}! (${damage})`
                );
            }
            if (damage > 20) {
                this.outx(
                    `${this.capitalA + this.short} <b>mutilates</b> you with ${
                        this.pronoun3
                    } powerful ${this.weaponVerb}! (${damage})`
                );
            }
        }
        this.game.statScreenRefresh();
        this.outx("\n", false);
        // SECOND ATTACK HERE------
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Ceraph.rand(10) != 9) {
            this.outx(`${this.capitalA + this.short} completely misses you with a blind attack!`);
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            if (this.player.spe - this.spe < 8)
                this.outx(`You narrowly avoid ${this.a}${this.short}'s ${this.weaponVerb}!`);
            if (this.player.spe - this.spe >= 8 && this.player.spe - this.spe < 20)
                this.outx(
                    `You dodge ${this.a}${this.short}'s ${this.weaponVerb} with superior quickness!`
                );
            if (this.player.spe - this.spe >= 20)
                this.outx(`You deftly avoid ${this.a}${this.short}'s slow ${this.weaponVerb}.`);
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && Ceraph.rand(100) < 10) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s attack.`
            );
        } else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Ceraph.rand(100) < 15 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `With Raphael's teachings and the easy movement afforded by your bodysuit, you easily anticipate and sidestep ${this.a}${this.short}'s attack.`
            );
        } else {
            // Determine damage - str modified by enemy toughness!
            damage = Math.floor(
                this.str +
                    this.weaponAttack -
                    Math.random() * (this.player.tou + this.player.armorDef)
            );
            if (damage > 0) {
                damage = this.player.takeDamage(damage);
            }
            if (damage <= 0) {
                damage = 0;
                // Due to toughness or amor...
                if (Ceraph.rand(this.player.armorDef + this.player.tou) < this.player.armorDef)
                    this.outx(
                        `Your ${this.player.armorName} absorb and deflect every ${this.weaponVerb} from ${this.a}${this.short}.`
                    );
                else
                    this.outx(
                        `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throws at you.`
                    );
            }
            if (damage > 0 && damage < 6) {
                this.outx(`You are struck a glancing blow by ${this.a}${this.short}! (${damage})`);
            }
            if (damage > 5 && damage < 11) {
                this.outx(`${this.capitalA + this.short} wounds you! (${damage})`);
            }
            if (damage > 10 && damage < 21) {
                this.outx(
                    `${this.capitalA + this.short} staggers you with the force of ${
                        this.pronoun3
                    } ${this.weaponVerb}! (${damage})`
                );
            }
            if (damage > 20) {
                this.outx(
                    `${this.capitalA + this.short} <b>mutilates</b> you with ${
                        this.pronoun3
                    } powerful ${this.weaponVerb}! (${damage})`
                );
            }
        }
        this.game.statScreenRefresh();
        this.outx("\n", false);
        this.combatRoundOver();
    }

    protected performCombatAction(): void {
        const choice: number = Ceraph.rand(4);
        if (this.player.findStatusAffect(StatusAffects.Bound) >= 0) {
            this.ceraphSpecial2();
            return;
        }
        if (this.findStatusAffect(StatusAffects.Uber) >= 0) {
            this.ceraphSpecial1();
            return;
        }
        switch (choice) {
            case 0:
                this.eAttack();
                break;
            case 1:
                this.ceraphSpecial1();
                break;
            case 2:
                this.ceraphSpecial2();
                break;
            case 3:
                this.ceraphSpecial3();
                break;
        }
    }

    public defeated(hpVictory: boolean): void {
        this.game.ceraphScene.winRapeChoices();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nYour foe doesn't seem disgusted enough to leave...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.ceraphScene.loseFUCKME();
        }
    }

    public constructor() {
        super();
        trace("Ceraph Constructor!");
        this.a = "";
        this.short = "Ceraph";
        this.imageName = "ceraph";
        this.long =
            "Ceraph the Omnibus is totally nude and reveling in it.  Her large yet perky breasts jiggle heavily against her chest as she moves.  The flawless purple skin of her twin mounds glistens with a thin sheen of sweat, inviting you to touch and rub your fingers along their slippery surface.  Her eyes are solid black, but convey a mix of amusement and desire, in spite of their alien appearance.  The demon's crotch is a combination of both genders – a drooling cunt topped with a thick demonic shaft, sprouting from where a clit should be.";
        // this.plural = false;
        this.createCock(10, 2, CockTypesEnum.DEMON);
        this.createVagina(false, VAGINA_WETNESS_SLAVERING, VAGINA_LOOSENESS_GAPING);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 20, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("E"));
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 15, 0, 0, 0);
        this.tallness = 5 * 12 + 6;
        this.hipRating = HIP_RATING_CURVY;
        this.buttRating = BUTT_RATING_NOTICEABLE;
        this.lowerBody = LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS;
        this.skinTone = "purple";
        this.hairColor = "black";
        this.hairLength = 20;
        this.initStrTouSpeInte(65, 40, 80, 80);
        this.initLibSensCor(75, 15, 100);
        this.weaponName = "flaming whip";
        this.weaponVerb = "flame-whip";
        this.weaponAttack = 15;
        this.armorName = "demon-skin";
        this.bonusHP = 200;
        this.lust = 30;
        this.lustVuln = 0.75;
        this.temperment = Ceraph.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 9;
        this.gems = Ceraph.rand(5) + 38;
        this.drop = this.NO_DROP;
        this.special1 = this.ceraphSpecial1;
        this.special2 = this.ceraphSpecial2;
        this.special3 = this.ceraphSpecial3;
        this.checkMonster();
    }
}
