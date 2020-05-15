import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_DRY,
    BUTT_RATING_EXPANSIVE,
    HIP_RATING_INHUMANLY_WIDE,
    LOWER_BODY_TYPE_HARPY,
    SKIN_TYPE_PLAIN,
    VAGINA_LOOSENESS_GAPING_WIDE,
    VAGINA_WETNESS_SLICK,
    WING_TYPE_HARPY,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { ChainedDrop } from "../../../internals/ChainedDrop";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class Harpy extends Monster {
    // *Note, special attack one is an idea based on Ceraph.
    // About the attack that raises your Lust to 100 if you
    // don't "wait" when she unleashes it. Alright, I
    // basically used the idea, sorry. But it's a neat idea
    // so it should be fitting, right? Or you could just
    // dump it out altogether. It'd cause severe damage,
    // in the 150 region if you don't wise up.*

    protected harpyUberCharge(): void {
        // (Harpy special attack 1, part one)
        if (this.findStatusAffect(StatusAffects.Uber) < 0) {
            this.createStatusAffect(StatusAffects.Uber, 0, 0, 0, 0);
            this.outx(
                "Flapping her wings frantically, she flies away from you and gains height, hanging in the light before you.  She lets out a shrill and terrifying cry, narrowing her eyes as she focuses in on you!",
                false
            );
        }
        // (Harpy special attack 1, part two if PC does anything but "Wait")
        else {
            if (this.flags[kFLAGS.IN_COMBAT_USE_PLAYER_WAITED_FLAG] == 0) {
                let damage: number = 160 + Harpy.rand(20);
                damage = this.player.takeDamage(damage);
                this.outx(
                    `The harpy lets out a terrible cry and drops, reaching an almost impossible speed as she dives down at you.  Her eyes are narrowed like a true bird of prey.  You were too busy with your own attack to avoid it!  Her claws surge down and pierce your ${this.player.armorName} like paper, driving hard into the flesh beneath and making you cry out in pain.  The harpy dumps you onto the ground, your wounds bleeding profusely. (${damage})`
                );
                this.removeStatusAffect(StatusAffects.Uber);
            } else {
                this.outx(
                    "You stand firm and ready yourself as the crazed harpy hovers above you. Letting out an ear-splitting cry she dives at you with her claws extended, reaching an incredible speed before she levels out.  The harpy is heading right for you!  Thanks to your ready position, you manage to dive aside just as the harpy reaches you.  She clips you slightly, spinning you as you dive for the ground.  You hit the ground hard, but look up in time to see her make a rough, graceless landing.  Her body rolls until it reached a standstill.  The enraged harpy drags herself up and takes flight once more!",
                    false
                );
                this.player.takeDamage(10 + Harpy.rand(10));
                this.removeStatusAffect(StatusAffects.Uber);
                this.HP -= 20;
            }
        }
        this.combatRoundOver();
    }

    // (Harpy special attack 2, lust increase)
    protected harpyTease(): void {
        this.outx(
            "The harpy charges at you carelessly, her body striking you with the full weight of her motherly hips.  The pair of you go crashing backwards onto the ground.  You grapple with her weighty ass, trying your best not to think dirty thoughts, but the way she's maniacally flapping and writhing her curvy body against you makes it impossible! After a brief, groping wrestle on the ground, she pushes you away and takes flight again.",
            false
        );
        this.game.dynStats("lus", 12 + Harpy.rand(this.player.sens / 5));
        this.combatRoundOver();
    }

    protected performCombatAction(): void {
        // var select: number = 1;
        if (this.findStatusAffect(StatusAffects.Uber) >= 0) {
            this.harpyUberCharge();
            return;
        }
        super.performCombatAction();
    }

    public defeated(hpVictory: boolean): void {
        this.game.highMountains.harpyScene.harpyVictoryuuuuu();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nYour foe doesn't seem disgusted enough to leave...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.highMountains.harpyScene.harpyLossU();
        }
    }

    protected outputPlayerDodged(dodge: number): void {
        this.outx(
            "With another deranged cry the harpy dives at you, swinging her razor-sharp talons through the air with the grace of a ballerina. Your quick reflexes allow you to dodge every vicious slash she makes at you.\n",
            false
        );
    }

    public outputAttack(damage: number): void {
        if (damage <= 0) {
            this.outx(
                "The harpy dives at you with her foot-talons, but you deflect the attack, grasp onto her leg, and swing her through the air, tossing her away from you before she has a chance to right herself.",
                false
            );
        } else {
            this.outx(
                `The harpy surges forward, bringing her razor-sharp claws down on you, tearing at all the exposed flesh she can reach! (${damage})`
            );
        }
    }

    public constructor(noInit = false) {
        super();
        if (noInit) return;
        trace("Harpy Constructor!");
        this.a = "the ";
        this.short = "harpy";
        this.imageName = "harpy";
        this.long =
            "You are fighting a tall, deranged harpy. She appears very human, about six feet six inches tall but covered in a fine layer of powder-blue down. Her arms are sinewy and muscular, with a long web connecting them to her ample hips, covered in stringy blue feathers to aid her flight. A larger pair of powdery-blue wings also protrudes from her shoulder blades, flapping idly. She appears quite deranged as she circles you, approaching and backing away erratically. Her face is quite beautiful, with fine lilac makeup adorning the features of a handsome woman, and her lips are traced with rich golden lipstick. As she circles you, squawking frantically and trying to intimidate you, your eyes are drawn to her slender torso and small, pert breasts, each the size of a small fruit and covered in a layer of the softest feathers which ripple and move with the gusts from her wings. As astounding as her breasts are, her egg-bearing hips are even more impressive.  They're twice as wide as her torso, with enormous, jiggling buttocks where her huge, meaty thighs are coming up to meet them. Her legs end in three-pronged talons; their shadowy black curves glinting evilly in the light.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_SLICK, VAGINA_LOOSENESS_GAPING_WIDE);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 40, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("B"));
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 20, 0, 0, 0);
        this.tallness = 6 * 12 + 6;
        this.hipRating = HIP_RATING_INHUMANLY_WIDE;
        this.buttRating = BUTT_RATING_EXPANSIVE;
        this.lowerBody = LOWER_BODY_TYPE_HARPY;
        this.skinTone = "pink";
        this.skinType = SKIN_TYPE_PLAIN;
        this.skinDesc = "feathers";
        this.hairColor = "blue";
        this.hairLength = 16;
        this.initStrTouSpeInte(60, 40, 90, 40);
        this.initLibSensCor(70, 30, 80);
        this.weaponName = "talons";
        this.weaponVerb = "slashing talons";
        this.weaponAttack = 15;
        this.armorName = "feathers";
        this.armorDef = 5;
        this.bonusHP = 150;
        this.lust = 10;
        this.lustVuln = 0.7;
        this.temperment = Harpy.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 10;
        this.gems = 10 + Harpy.rand(4);
        this.drop = new ChainedDrop()
            .add(this.armors.W_ROBES, 1 / 10)
            .elseDrop(this.consumables.GLDSEED);
        this.wingType = WING_TYPE_HARPY;
        this.special1 = this.harpyUberCharge;
        this.special2 = this.harpyTease;
        this.checkMonster();
    }
}
