import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_NORMAL,
    BUTT_RATING_TIGHT,
    HIP_RATING_SLENDER,
    SKIN_TYPE_FUR,
    TAIL_TYPE_DOG,
} from "../../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

export class Akbal extends Monster {
    public eAttack(): void {
        // Chances to miss:
        let damage = 0;
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.outx(
                `${
                    this.capitalA + this.short
                } seems to have no problem guiding his attacks towards you, despite his blindness.\n`,
                false
            );
        }
        // Determine if dodged!
        if (
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
            this.game.combatRoundOver();
            return;
        }
        // Determine if evaded
        if (this.player.findPerk(PerkLib.Evade) >= 0 && Akbal.rand(100) < 10) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s attack.`
            );
            this.game.combatRoundOver();
            return;
        }
        // Determine if flexibilitied
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Akbal.rand(100) < 10) {
            this.outx(
                `Using your cat-like agility, you twist out of the way of ${this.a}${this.short}'s attack.`
            );
            this.game.combatRoundOver();
            return;
        }
        // Determine damage - str modified by enemy toughness!
        // *Normal Attack A -
        if (Akbal.rand(2) == 0) {
            // (medium HP damage)
            damage = Math.floor(
                this.str +
                    this.weaponAttack -
                    Math.random() * this.player.tou -
                    this.player.armorDef
            );
            if (damage <= 0) {
                this.outx("Akbal lunges forwards but with your toughness");
                if (this.player.armorDef > 0)
                    this.outx(` and ${this.player.armorName}, he fails to deal any damage.`);
                else this.outx(" he fails to deal any damage.");
            } else {
                this.outx(
                    "Akbal rushes at you, his claws like lightning as they leave four red-hot lines of pain across your stomach.",
                    false
                );
                this.player.takeDamage(damage);
            }
        } else {
            // *Normal Attack B
            // (high HP damage)
            damage = Math.floor(
                this.str +
                    25 +
                    this.weaponAttack -
                    Math.random() * this.player.tou -
                    this.player.armorDef
            );
            if (damage == 0) {
                this.outx("Akbal lunges forwards but between your toughness ");
                if (this.player.armorDef > 0)
                    this.outx(`and ${this.player.armorName}, he fails to deal any damage.`);
            } else {
                this.outx(
                    "Akbal snarls as he flies towards you, snapping his ivory teeth on your arm. You scream out in pain as you throw him off.",
                    false
                );
                this.player.takeDamage(damage);
            }
        }
        this.game.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        this.game.forest.akbalScene.akbalDefeated(hpVictory);
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.forest.akbalScene.akbalWon(hpVictory, pcCameWorms);
        this.game.cleanupAfterCombat();
    }

    public akbalLustAttack(): void {
        // *Lust Attack -
        if (this.player.findStatusAffect(StatusAffects.Whispered) < 0) {
            this.outx(
                "You hear whispering in your head. Akbal begins speaking to you as he circles you, telling all the ways he'll dominate you once he beats the fight out of you.",
                false
            );
            // (Lust increase)
            this.game.dynStats("lus", 7 + (100 - this.player.inte) / 10);
            this.player.createStatusAffect(StatusAffects.Whispered, 0, 0, 0, 0);
        }
        // Continuous Lust Attack -
        else {
            this.outx(
                "The whispering in your head grows, many voices of undetermined sex telling you all the things the demon wishes to do to you. You can only blush.",
                false
            );
            // (Lust increase)
            this.game.dynStats("lus", 12 + (100 - this.player.inte) / 10);
        }
        this.game.combatRoundOver();
    }

    public akbalSpecial(): void {
        // *Special Attack A -
        if (Akbal.rand(2) == 0 && this.player.spe > 20) {
            const speedChange: number = (this.player.spe / 5) * -1;
            this.outx(
                "Akbal's eyes fill with light, and a strange sense of fear begins to paralyze your limbs.",
                false
            );
            // (Speed decrease)
            this.game.dynStats("spe", speedChange);
            if (this.player.findStatusAffect(StatusAffects.AkbalSpeed) >= 0)
                this.player.addStatusValue(StatusAffects.AkbalSpeed, 1, speedChange);
            else this.player.createStatusAffect(StatusAffects.AkbalSpeed, speedChange, 0, 0, 0);
        }
        // *Special Attack B -
        else {
            this.outx(
                "Akbal releases an ear-splitting roar, hurling a torrent of emerald green flames towards you.\n",
                false
            );
            // (high HP damage)
            // Determine if dodged!
            if (
                this.player.spe - this.spe > 0 &&
                Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
            ) {
                if (this.player.spe - this.spe < 8)
                    this.outx(`You narrowly avoid ${this.a}${this.short}'s fire!`);
                if (this.player.spe - this.spe >= 8 && this.player.spe - this.spe < 20)
                    this.outx(`You dodge ${this.a}${this.short}'s fire with superior quickness!`);
                if (this.player.spe - this.spe >= 20)
                    this.outx(`You deftly avoid ${this.a}${this.short}'s slow fire-breath.`);
                this.game.combatRoundOver();
                return;
            }
            // Determine if evaded
            if (this.player.findPerk(PerkLib.Evade) >= 0 && Akbal.rand(100) < 20) {
                this.outx(
                    `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'s fire-breath.`
                );
                this.game.combatRoundOver();
                return;
            }
            // Determine if flexibilitied
            if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Akbal.rand(100) < 10) {
                this.outx(
                    `Using your cat-like agility, you contort your body to avoid ${this.a}${this.short}'s fire-breath.`
                );
                this.game.combatRoundOver();
                return;
            }
            this.outx(`You are burned badly by the flames! (${this.player.takeDamage(40)})`);
        }
        this.game.combatRoundOver();
    }

    // *Support ability -
    public akbalHeal(): void {
        if (this.HPRatio() >= 1) this.outx("Akbal licks himself, ignoring you for now.");
        else
            this.outx(
                "Akbal licks one of his wounds, and you scowl as the injury quickly heals itself.",
                false
            );
        this.addHP(30);
        this.lust += 10;
        this.game.combatRoundOver();
    }

    public constructor() {
        super();
        trace("Akbal Constructor!");
        this.a = "";
        this.short = "Akbal";
        this.imageName = "akbal";
        this.long =
            "Akbal, 'God of the Terrestrial Fire', circles around you. His sleek yet muscular body is covered in tan fur, with dark spots that seem to dance around as you look upon them.  His mouth holds two ivory incisors that glint in the sparse sunlight as his lips tremble to the sound of an unending growl.  Each paw conceals lethal claws capable of shredding men and demons to ribbons.  His large and sickeningly alluring bright green eyes promise unbearable agony as you look upon them.";
        // this.plural = false;
        this.createCock(15, 2.5, CockTypesEnum.DOG);
        this.balls = 2;
        this.ballSize = 4;
        this.cumMultiplier = 6;
        this.hoursSinceCum = 400;
        this.createBreastRow();
        this.createBreastRow();
        this.createBreastRow();
        this.createBreastRow();
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_NORMAL;
        this.tallness = 4 * 12;
        this.hipRating = HIP_RATING_SLENDER;
        this.buttRating = BUTT_RATING_TIGHT;
        this.skinTone = "spotted";
        this.skinType = SKIN_TYPE_FUR;
        // this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_FUR];
        this.hairColor = "black";
        this.hairLength = 5;
        this.initStrTouSpeInte(55, 53, 50, 75);
        this.initLibSensCor(50, 50, 100);
        this.weaponName = "claws";
        this.weaponVerb = "claw-slash";
        this.weaponAttack = 5;
        this.armorName = "shimmering pelt";
        this.armorDef = 5;
        this.bonusHP = 20;
        this.lust = 30;
        this.lustVuln = 0.8;
        this.temperment = Akbal.TEMPERMENT_LUSTY_GRAPPLES;
        this.level = 6;
        this.gems = 15;
        this.drop = new WeightedDrop()
            .add(this.consumables.INCUBID, 6)
            .add(this.consumables.W_FRUIT, 3)
            .add(this.weapons.PIPE, 1);
        this.special1 = this.akbalLustAttack;
        this.special2 = this.akbalSpecial;
        this.special3 = this.akbalHeal;
        this.tailType = TAIL_TYPE_DOG;
        this.checkMonster();
    }
}
