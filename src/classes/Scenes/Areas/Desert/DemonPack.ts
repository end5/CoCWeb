import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_SLIME_DROOLING,
    BUTT_RATING_LARGE,
    HIP_RATING_AMPLE,
    HORNS_DEMON,
    TAIL_TYPE_DEMONIC,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_WETNESS_SLICK,
} from "../../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class DemonPack extends Monster {
    protected performCombatAction(): void {
        // Demon pack has different AI
        if (DemonPack.rand(2) == 0) this.special1();
        else this.special2();
    }

    public defeated(hpVictory: boolean): void {
        if (hpVictory) {
            this.outx(
                `You strike out and the last of the demons tumbles to the ground with a thud. You stand there for a second surrounded by dead or unconscious demons feeling like a god of battle. Then you realize that if a god of battle does exist he lives on a demonic plane like this, so to avoid insulting him you take your hands off your hips and your ${this.player.legs()} off the head of the demon leader before you start to search the bodies.`,
                true
            );
            this.game.dynStats("lus", 1);
        } else {
            this.outx(
                "The demons stop attacking, and reach out to touch your body. Some are already masturbating like it's the only thing in the world and you know that right now, if you wanted to, you could make each and every one of them fuck you."
            );
        }
        if (this.findStatusAffect(StatusAffects.phyllafight) >= 0) {
            this.doNext(this.game.desert.antsScene.consolePhylla);
        } else if (hpVictory) {
            this.game.cleanupAfterCombat();
        } else {
            this.outx("  Do you rape them?", true);
            this.game.doYesNo(this.rapeDemons, this.game.cleanupAfterCombat);
        }
    }

    private rapeDemons(): void {
        this.outx(
            "You open your arms and step into the throng of eager demons. They jump eagerly to touch you, becoming more and more lust-frenzied every second. You take the nearest demon and throw it to the ground and without a moment's thought the rest of the group leap to join you in a thoughtless madness of lust...",
            true
        );
        this.doNext(this.game.desert.oasis.oasisSexing);
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (this.player.gender == 0) {
            if (hpVictory) {
                this.outx(
                    "You collapse before the demons, who laugh at your utter lack of male or female endowments, beating you until you pass out.",
                    true
                );
            } else {
                this.outx(
                    "You offer yourself to the demons, who promptly begin laughing at your lack of endowments.  They fall on you as one, beating you into unconsciousness.",
                    true
                );
            }
            this.game.cleanupAfterCombat();
        } else if (hpVictory) {
            this.outx(
                "The demons finally beat you down and you collapse onto the sand of the oasis. Almost immediately you feel demonic hands pressing and probing your prone form. You hear the leader of the group say something in a strange tongue but you have a feeling you know what it means. The demons dive onto your inert body with intent and begin to press themselves against you...",
                true
            );
            this.doNext(this.game.desert.oasis.oasisSexing);
        } else {
            this.outx("You struggle to keep your mind on the fight and fail to do so. ", true);
            if (pcCameWorms) {
                this.outx(
                    "\n\nThe demons joke and smile, obviously unconcerned with your state.\n\n",
                    false
                );
            }
            if (this.player.cocks.length > 0) {
                if (this.player.cockTotal() > 1) this.outx("Each of y");
                else this.outx("Y");
                this.outx(`our ${this.player.multiCockDescriptLight()} throbs `);
                if (this.player.hasVagina()) this.outx(" and your ");
            }
            if (this.player.vaginas.length > 0) {
                if (!this.player.hasCock()) this.outx("Your ");
                this.outx(`${this.game.vaginaDescript(0)} burns `);
            }
            this.outx(
                "with arousal.  You make a grab for the nearest demon and catch a handful of jiggly breast. You try desperately to use your other arm to pull her closer to slake your thirst but you both go tumbling to the ground. The demonic leader laughs out loud and the rest of the tribe falls on you, grabbing for anything it can find.",
                false
            );
            this.doNext(this.game.desert.oasis.oasisSexing);
        }
    }

    public teased(lustDelta: number): void {
        this.outx("\n", false);
        if (lustDelta == 0) this.outx(`\n${this.capitalA}${this.short} seems unimpressed.`);
        else if (lustDelta > 0 && lustDelta < 5)
            this.outx(
                "The demons lessen somewhat in the intensity of their attack, and some even eye up your assets as they strike at you.",
                false
            );
        else if (lustDelta >= 5 && lustDelta < 10)
            this.outx(
                "The demons are obviously steering clear from damaging anything you might use to fuck and they're starting to leave their hands on you just a little longer after each blow. Some are starting to cop quick feels with their other hands and you can smell the demonic lust of a dozen bodies on the air.",
                false
            );
        else if (lustDelta >= 10)
            this.outx(
                "The demons are less and less willing to hit you and more and more willing to just stroke their hands sensuously over you. The smell of demonic lust is thick on the air and part of the group just stands there stroking themselves openly.",
                false
            );
        this.applyTease(lustDelta);
    }

    public constructor() {
        super();
        trace("DemonPack Constructor!");
        this.a = "the ";
        this.short = "demons";
        this.imageName = "demonmob";
        this.long = `The group is composed of roughly twenty tan-skinned demons, mostly humanoid in shape with many and varied corruptions across the mob. You see demonic high heels, twisting horns and swinging cocks of all shapes and sizes. There even seems to be a bull head in there somewhere. You also make out plenty of breasts ranging from tiny ones to a pair that requires a second person to carry them, and with those breasts a wide range of pussies, dripping and dry, sometimes nestled below some form of demonic dick.  The small tribe carries no weapons and what little clothing they wear is well-shredded, except for one hefty male wearing a cloak of what appears to be snakeskin across his broad shoulders.${
            this.game.silly()
                ? '  You spot an odd patch that reads, "<i>41st Engineer Company: Vaginal Clearance</i>" on his shoulder.'
                : ""
        }`;
        this.plural = true;
        this.pronoun1 = "they";
        this.pronoun2 = "them";
        this.pronoun3 = "their";
        this.createCock(18, 2);
        this.createCock(18, 2, CockTypesEnum.DEMON);
        this.balls = 2;
        this.ballSize = 1;
        this.cumMultiplier = 3;
        // this.hoursSinceCum = 0;
        this.createVagina(false, VAGINA_WETNESS_SLICK, VAGINA_LOOSENESS_LOOSE);
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;
        this.tallness = DemonPack.rand(8) + 70;
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "red";
        this.hairColor = "black";
        this.hairLength = 15;
        this.initStrTouSpeInte(80, 10, 10, 5);
        this.initLibSensCor(50, 60, 80);
        this.weaponName = "claws";
        this.weaponVerb = "claw";
        this.armorName = "demonic skin";
        this.bonusHP = 200;
        this.lust = 30;
        this.temperment = DemonPack.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 6;
        this.gems = DemonPack.rand(25) + 10;
        this.drop = new WeightedDrop().addMany(
            1,
            this.consumables.SUCMILK,
            this.consumables.INCUBID,
            this.consumables.OVIELIX,
            this.consumables.B__BOOK
        );
        this.special1 = this.game.packAttack;
        this.special2 = this.game.lustAttack;
        this.tailType = TAIL_TYPE_DEMONIC;
        this.hornType = HORNS_DEMON;
        this.horns = 2;
        this.checkMonster();
    }
}
