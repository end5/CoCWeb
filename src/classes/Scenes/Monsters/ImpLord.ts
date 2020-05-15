import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_NORMAL,
    BUTT_RATING_TIGHT,
    HIP_RATING_BOYISH,
    LOWER_BODY_TYPE_HOOFED,
    WING_TYPE_IMP,
} from "../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../CockTypesEnum";
import { WeightedDrop } from "../../internals/WeightedDrop";
import { Imp } from "./Imp";

export class ImpLord extends Imp {
    // Special Attack 1
    protected impFire(): void {
        this.outx(
            "The imp mutters something to himself. Before you have time to react the demonic creature's hand is filled with a bright red fire that he hurls at you.  The flames lick at your body leaving a painful burn on you torso, as well as an arousing heat in your groin."
        );
        // [-HP // +Lust(minor)]
        const damage: number = 40 + ImpLord.rand(10);
        this.player.takeDamage(damage);
        this.game.dynStats("lus", 20 + this.player.cor / 10);
        this.combatRoundOver();
    }

    // Heavy Attack
    protected impLordHeavyEncounter(): void {
        let damage: number = Math.floor(
            this.str + this.weaponAttack + 20 - ImpLord.rand(this.player.tou) - this.player.armorDef
        );
        this.outx("The demonic creature slashes a clawed hand towards your stomach,");
        if (
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        )
            this.outx(" but you handily avoid it.");
        else if (damage <= 0) this.outx(" but the attack proves ineffectual.");
        else {
            this.outx(
                "leaving a large gash. The attack leaves you slightly stunned, but you recover. "
            );
            damage = this.player.takeDamage(damage);
            this.outx(`(${damage})`);
        }
        this.combatRoundOver();
    }

    // Lust Attack
    protected impLordLustAttack(): void {
        this.outx(
            "Lowering his loincloth the imp reveals his inhumanly thick shaft.  He smirks and licks his lips as he gives his cock a squeeze, milking a few beads of clear pre from the tip.  You shake your head and try to ignore your growing need."
        );
        // [+Lust]
        this.game.dynStats("lus", 5 + this.player.lib / 5 + this.player.cor / 5);
        this.combatRoundOver();
    }

    // Lust and Light Attack
    protected impLordLustAttack2(): void {
        this.outx(
            "Reaching into his satchel the devilish creature pulls out a leather riding crop.  He quickly rushes forward, but somehow manages to get behind you.  Before you can react the imp lashes out, striking your [butt] twice with the riding crop.  The strikes leave a slight burning feeling, as well as a strange sense of arousal."
        );
        let damage: number = 3 + ImpLord.rand(10);
        damage = this.player.takeDamage(damage);
        this.outx(` (${damage})`);
        // [-HP(minor) // +Lust]
        this.game.dynStats("lus", 5 + this.player.sens / 4 + this.player.cor / 10);
        this.combatRoundOver();
    }
    protected performCombatAction(): void {
        const choices: any[] = [
            this.impFire,
            this.impLordLustAttack2,
            this.impLordLustAttack,
            this.impLordHeavyEncounter,
            this.eAttack,
        ];
        choices[ImpLord.rand(choices.length)]();
    }

    public defeated(hpVictory: boolean): void {
        this.game.impScene.defeatImpLord();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.impScene.loseToAnImpLord();
    }

    public constructor() {
        super(true);
        this.a = "the ";
        this.short = "imp lord";
        this.imageName = "implord";
        this.long =
            "The greater imp has an angular face, complete with curved nose and burnt red skin typical of imps.  He has no hair on his head, leaving his cold, lust-clouded, black eyes unobstructed.  Just above his long pointed ears are two curved bovine horns.  While still short, he's much taller then the average imp, being nearly four feet tall, and extremely well-muscled.  A pair of powerful wings extends out from his shoulders, however, you suspect he wouldn't be able to fly for long due to his extreme bulk.  A thick coating of fur starts at his well toned hips and works its way down his powerful legs.  His legs end in a pair of oddly jointed, demonic hooves.  His demonic figure is completed by a thin tail that has an arrowhead shaped tip.\n\nThe greater imp, like most imps wear very little clothing; only a simple loincloth and satchel hang from his waist.  You also note that the imp has two barbell piercings in his nipples. The creature doesn't seem to have any weapons, aside from his sharp black finger nails.";
        // this.plural = false;
        // Imps now only have demon dicks.
        // Not sure if I agree with this, I can imagine the little fuckers abusing the
        // shit out of any potions they can get their hands on.
        this.createCock(ImpLord.rand(2) + 11, 2.5, CockTypesEnum.DEMON);
        this.balls = 2;
        this.ballSize = 1;
        this.cumMultiplier = 3;
        this.hoursSinceCum = 20;
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_NORMAL;
        this.tallness = ImpLord.rand(14) + 40;
        this.hipRating = HIP_RATING_BOYISH;
        this.buttRating = BUTT_RATING_TIGHT;
        this.lowerBody = LOWER_BODY_TYPE_HOOFED;
        this.skinTone = "red";
        this.initStrTouSpeInte(55, 40, 75, 42);
        this.initLibSensCor(55, 35, 100);
        this.weaponName = "fist";
        this.weaponVerb = "punch";
        this.weaponAttack = 10;
        this.armorName = "leathery skin";
        this.armorDef = 5;
        this.bonusHP = 100;
        this.lust = 30;
        this.lustVuln = 0.65;
        this.temperment = ImpLord.TEMPERMENT_LUSTY_GRAPPLES;
        this.level = 7;
        this.gems = ImpLord.rand(15) + 25;
        this.drop = new WeightedDrop()
            .add(this.consumables.MINOBLO, 1)
            .add(this.consumables.LABOVA_, 1)
            .add(this.consumables.INCUBID, 6)
            .add(this.consumables.SUCMILK, 6);
        this.wingType = WING_TYPE_IMP;
        this.special1 = this.lustMagicAttack;
        this.checkMonster();
    }
}
