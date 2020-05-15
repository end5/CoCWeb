import {
    ANAL_LOOSENESS_NORMAL,
    ANAL_WETNESS_DRY,
    BUTT_RATING_LARGE,
    HIP_RATING_AMPLE,
    TAIL_TYPE_DEMONIC,
} from "../../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { ChainedDrop } from "../../../internals/ChainedDrop";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class SandTrap extends Monster {
    // Wait:
    public sandTrapWait(): void {
        this.clearOutput();
        this.game.spriteSelect(97);
        if (this.findStatusAffect(StatusAffects.Climbed) < 0)
            this.createStatusAffect(StatusAffects.Climbed, 0, 0, 0, 0);
        this.outx(
            "Instead of attacking, you turn away from the monster and doggedly attempt to climb back up the pit, digging all of your limbs into the soft powder as you climb against the sandslide."
        );
        if (this.trapLevel() == 4) {
            this.outx(
                "\n\nYou eye the ground above you.  The edge of the pit is too sheer, the ground too unstable... although it looks like you can fight against the currents carrying you further down, it seems impossible to gain freedom with the sand under the monster's spell."
            );
        } else {
            // Strength check success: [Player goes up one level, does not go down a level this turn]
            if (this.player.str / 10 + SandTrap.rand(20) > 10) {
                this.outx(
                    '\n\nSweat beads your forehead - trying to clamber out of this pit is like running against the softest treadmill imaginable.  Nonetheless, through considerable effort you see you\'ve managed to pull further clear of the sandtrap\'s grasp.  "<i>Watching you squirm around like that gets me so hot,</i>" it calls up to you.  Turning around you see that the creature is rubbing its hands all over its lean body whilst watching you struggle.  "<i>Such an energetic little mating dance, just for me... mmm, prey who do that are always the best!</i>"'
                );
                this.trapLevel(2);
            } else {
                // Strength check fail:  [Player goes down as normal]
                this.outx(
                    '\n\nSweat beads your forehead - trying to clamber out of this pit is like running against the softest treadmill imaginable.  You feel like you\'re going to burst and you eventually give up, noting wearily that you\'ve managed to get nowhere. "<i>Watching you squirm around like that gets me so hot,</i>" the sandtrap calls to you.  Turning around you see that the creature is rubbing its hands all over its lean body whilst watching you struggle.  "<i>Such an energetic little mating dance, just for me... mmm, prey who do that are always the best!</i>"'
                );
                this.trapLevel(1);
            }
        }
        this.outx("\n\n");
        this.doAI();
        // combatRoundOver();
    }

    public trapLevel(adjustment = 0): number {
        if (this.findStatusAffect(StatusAffects.Level) < 0)
            this.createStatusAffect(StatusAffects.Level, 4, 0, 0, 0);
        if (adjustment != 0) {
            this.addStatusValue(StatusAffects.Level, 1, adjustment);
            // Keep in bounds ya lummox
            if (this.statusAffectv1(StatusAffects.Level) < 1)
                this.changeStatusValue(StatusAffects.Level, 1, 1);
            if (this.statusAffectv1(StatusAffects.Level) > 4)
                this.changeStatusValue(StatusAffects.Level, 1, 4);
        }
        return this.statusAffectv1(StatusAffects.Level);
    }

    // sandtrap pheromone attack:
    private sandTrapPheremones(): void {
        this.game.spriteSelect(97);
        this.outx(
            "The sandtrap puckers its lips.  For one crazed moment you think it's going to blow you a kiss... but instead it spits clear fluid at you!   You desperately try to avoid it, even as your lower half is mired in sand."
        );
        if (
            this.player.spe / 10 + SandTrap.rand(20) > 10 ||
            this.combatEvade() ||
            this.combatFlexibility()
        ) {
            this.outx(
                "  Moving artfully with the flow rather than against it, you are able to avoid the trap's fluids, which splash harmlessly into the dune."
            );
        } else {
            let damage: number = 10 + this.player.lib / 10;
            this.outx(
                "  Despite ducking away from the jet of fluid as best you can, you cannot avoid some of the stuff splashing upon your arms and face.  The substance feels oddly warm and oily, and though you quickly try to wipe it off it sticks resolutely to your skin and the smell hits your nose.  Your heart begins to beat faster as warmth radiates out from it; you feel languid, light-headed and sensual, eager to be touched and led by the hand to a sandy bed...  Shaking your head, you try to stifle what the foreign pheromones are making you feel."
            );
            this.game.dynStats("lus", damage);
            damage = Math.round((damage * this.game.lustPercent()) / 10) / 10;
            this.outx(` (${damage} lust)`);
        }
    }

    // sandtrap quicksand attack:
    private nestleQuikSandAttack(): void {
        this.game.spriteSelect(97);
        this.outx(
            "The sandtrap smiles at you winningly as it thrusts its hands into the sifting granules.  The sand beneath you suddenly seems to lose even more of its density; you're sinking up to your thighs!"
        );
        // Quicksand attack fail:
        if (
            this.player.spe / 10 + SandTrap.rand(20) > 10 ||
            this.combatEvade() ||
            this.combatFlexibility()
        ) {
            this.outx(
                "  Acting with alacrity, you manage to haul yourself free of the area affected by the sandtrap's spell, and set yourself anew."
            );
        }
        // Quicksand attack success: (Speed and Strength loss, ability to fly free lost)
        else {
            this.outx(
                "  You can't get free in time and in a panic you realize you are now practically wading in sand.  Attempting to climb free now is going to be very difficult."
            );
            if (this.player.canFly())
                this.outx(
                    "  You try to wrench yourself free by flapping your wings, but it is hopeless.  You are well and truly snared."
                );
            this.trapLevel(-1);
            if (this.findStatusAffect(StatusAffects.Climbed) < 0)
                this.createStatusAffect(StatusAffects.Climbed, 0, 0, 0, 0);
        }
    }

    protected performCombatAction(): void {
        if (this.findStatusAffect(StatusAffects.Level) >= 0) {
            if (this.trapLevel() == 4 && this.findStatusAffect(StatusAffects.Climbed) < 0)
                this.nestleQuikSandAttack();
            else this.sandTrapPheremones();
            // PC sinks a level (end of any turn in which player didn't successfully \"<i>Wait</i>\"):
            if (this.findStatusAffect(StatusAffects.Climbed) < 0) {
                this.outx(
                    "\n\nRivulets of sand run past you as you continue to sink deeper into both the pit and the sand itself."
                );
                this.trapLevel(-1);
            } else this.removeStatusAffect(StatusAffects.Climbed);
            this.combatRoundOver();
        } else super.performCombatAction();
    }

    public defeated(hpVictory: boolean): void {
        this.game.desert.sandTrapScene.pcBeatsATrap();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nThe sand trap seems bemused by the insects your body houses...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.desert.sandTrapScene.sandtrapmentLoss(true);
        }
    }

    public constructor() {
        super();
        // 1/3 have fertilized eggs!
        if (SandTrap.rand(3) == 0) this.createStatusAffect(StatusAffects.Fertilized, 0, 0, 0, 0);
        this.a = "the ";
        if (this.game.silly()) this.short = "sand tarp";
        else this.short = "sandtrap";
        this.imageName = "sandtrap";
        this.long =
            "You are fighting the sandtrap.  It sits half buried at the bottom of its huge conical pit, only its lean human anatomy on show, leering at you from beneath its shoulder length black hair with its six equally sable eyes.  You cannot say whether its long, soft face with its pointed chin is very pretty or very handsome - every time the creature's face moves, its gender seems to shift.  Its lithe, brown flat-chested body supports four arms, long fingers playing with the rivulets of powder sand surrounding it.  Beneath its belly you occasionally catch glimpses of its insect half: a massive sand-coloured abdomen which anchors it to the desert, with who knows what kind of anatomy.";
        // this.plural = false;
        this.createCock(10, 2, CockTypesEnum.HUMAN);
        this.balls = 2;
        this.ballSize = 4;
        this.cumMultiplier = 3;
        // this.hoursSinceCum = 0;
        this.createBreastRow(0, 0);
        this.ass.analLooseness = ANAL_LOOSENESS_NORMAL;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.tallness = SandTrap.rand(8) + 150;
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "fair";
        this.hairColor = "black";
        this.hairLength = 15;
        this.initStrTouSpeInte(55, 10, 45, 55);
        this.initLibSensCor(60, 45, 50);
        this.weaponName = "claws";
        this.weaponVerb = "claw";
        this.weaponAttack = 10;
        this.armorName = "chitin";
        this.armorDef = 20;
        this.bonusHP = 100;
        this.lust = 20;
        this.lustVuln = 0.55;
        this.temperment = SandTrap.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 4;
        this.gems = 2 + SandTrap.rand(5);
        this.drop = new ChainedDrop(this.consumables.TRAPOIL).add(this.consumables.OVIELIX, 1 / 3);
        this.tailType = TAIL_TYPE_DEMONIC;
        this.createStatusAffect(StatusAffects.Level, 4, 0, 0, 0);
        this.checkMonster();
    }
}
