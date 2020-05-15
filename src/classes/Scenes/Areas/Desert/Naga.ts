import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_DRY,
    BUTT_RATING_LARGE,
    HIP_RATING_AMPLE,
    LOWER_BODY_TYPE_NAGA,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_WETNESS_SLAVERING,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

export class Naga extends Monster {
    // 2a)  Ability -  Poison Bite - poisons player
    protected nagaPoisonBiteAttack(): void {
        // (Deals damage over 4-5 turns, invariably reducing
        // your speed. It wears off once combat is over.)
        this.outx(
            "The naga strikes with the speed of a cobra, sinking her fangs into your flesh!  ",
            false
        );
        if (this.player.findStatusAffect(StatusAffects.NagaVenom) < 0) {
            this.outx(
                "The venom's effects are almost instantaneous; your vision begins to blur and it becomes increasingly harder to stand.",
                false
            );
            if (this.player.spe > 4) {
                // stats(0,0,-3,0,0,0,0,0);
                this.player.spe -= 3;
                Naga.showStatDown("spe");
                // speUp.visible = false;
                // speDown.visible = true;
                this.player.createStatusAffect(StatusAffects.NagaVenom, 3, 0, 0, 0);
            } else {
                this.player.createStatusAffect(StatusAffects.NagaVenom, 0, 0, 0, 0);
                this.player.takeDamage(5 + Naga.rand(5));
            }
            this.player.takeDamage(5 + Naga.rand(5));
        } else {
            this.outx(
                "The venom's effects intensify as your vision begins to blur and it becomes increasingly harder to stand.",
                false
            );
            if (this.player.spe > 3) {
                // stats(0,0,-2,0,0,0,0,0);
                this.player.spe -= 2;
                Naga.showStatDown("spe");
                // speUp.visible = false;
                // speDown.visible = true;
                this.player.addStatusValue(StatusAffects.NagaVenom, 1, 2);
            } else this.player.takeDamage(5 + Naga.rand(5));
            this.player.takeDamage(5 + Naga.rand(5));
        }
        this.combatRoundOver();
    }

    // 2b)  Ability - Constrict - entangles player, raises lust
    // every turn until you break free
    protected nagaConstrict(): void {
        this.outx(
            "The naga draws close and suddenly wraps herself around you, binding you in place! You can't help but feel strangely aroused by the sensation of her scales rubbing against your body. All you can do is struggle as she begins to squeeze tighter!",
            false
        );
        this.player.createStatusAffect(StatusAffects.NagaBind, 0, 0, 0, 0);
        this.player.takeDamage(2 + Naga.rand(4));
        this.combatRoundOver();
    }

    // 2c) Abiliy - Tail Whip - minus ??? HP
    // (base it on toughness?)
    protected nagaTailWhip(): void {
        this.outx("The naga tenses and twists herself forcefully.  ");
        // [if evaded]
        if (this.player.findPerk(PerkLib.Evade) && Naga.rand(6) == 0) {
            this.outx(
                "You see her tail whipping toward you and evade it at the last second. You quickly roll back onto your feet.",
                false
            );
        } else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Naga.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep ${this.a}${this.short}'s tail-whip.`
            );
        } else if (this.player.spe > Naga.rand(300)) {
            this.outx(
                "You see her tail whipping toward you and jump out of the way at the last second. You quickly roll back onto your feet.",
                false
            );
        } else {
            this.outx(
                "Before you can even think, you feel a sharp pain at your side as the naga's tail slams into you and shoves you into the sands. You pick yourself up, wincing at the pain in your side.",
                false
            );
            let damage = 10;
            if (this.player.armorDef < 10) damage += 10 - this.player.armorDef;
            damage += Naga.rand(3);
            damage = this.player.takeDamage(damage);
            this.outx(` (${damage})`);
        }
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        this.game.desert.nagaScene.nagaRapeChoice();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx(
                "\n\nThe naga's eyes go wide and she turns to leave, no longer interested in you.",
                false
            );
            this.player.orgasm();
            this.doNext(this.game.cleanupAfterCombat);
        } else {
            this.game.desert.nagaScene.nagaFUCKSJOOOOOO();
        }
    }

    public constructor(noInit = false) {
        super();
        if (noInit) return;
        trace("Naga Constructor!");
        this.a = "the ";
        this.short = "naga";
        this.imageName = "naga";
        this.long =
            "You are fighting a naga. She resembles a beautiful and slender woman from the waist up, with dark hair hanging down to her neck. Her upper body is deeply tanned, while her lower body is covered with shiny scales, striped in a pattern reminiscent of the dunes around you. Instead of bifurcating into legs, her hips elongate into a snake's body which stretches far out behind her, leaving a long and curving trail in the sand.  She's completely naked, with her round C-cup breasts showing in plain sight. In her mouth you can see a pair of sharp, poisonous fangs and a long forked tongue moving rapidly as she hisses at you.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_SLAVERING, VAGINA_LOOSENESS_NORMAL);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 40, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("C"));
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 10, 0, 0, 0);
        this.tallness = 5 * 12 + 10;
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_LARGE;
        this.lowerBody = LOWER_BODY_TYPE_NAGA;
        this.skinTone = "mediterranean-toned";
        this.hairColor = "brown";
        this.hairLength = 16;
        this.initStrTouSpeInte(28, 20, 35, 42);
        this.initLibSensCor(55, 55, 40);
        this.weaponName = "fist";
        this.weaponVerb = "punch";
        this.weaponAttack = 3;
        this.armorName = "scales";
        this.armorDef = 5;
        this.lust = 30;
        this.temperment = Naga.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 2;
        this.gems = Naga.rand(5) + 8;
        this.drop = new WeightedDrop()
            .add(undefined, 1)
            .add(this.consumables.REPTLUM, 5)
            .add(this.consumables.SNAKOIL, 4);
        this.special1 = this.nagaPoisonBiteAttack;
        this.special2 = this.nagaConstrict;
        this.special3 = this.nagaTailWhip;
        this.checkMonster();
    }
}
