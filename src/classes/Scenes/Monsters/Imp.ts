import { trace } from "../../../console";
import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_NORMAL,
    BUTT_RATING_TIGHT,
    HIP_RATING_BOYISH,
    VAGINA_WETNESS_DROOLING,
    VAGINA_WETNESS_NORMAL,
    VAGINA_WETNESS_SLAVERING,
    VAGINA_WETNESS_SLICK,
    VAGINA_WETNESS_WET,
    WING_TYPE_IMP,
} from "../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../CockTypesEnum";
import { WeightedDrop } from "../../internals/WeightedDrop";
import { Monster } from "../../Monster";
import { StatusAffects } from "../../StatusAffects";

export class Imp extends Monster {
    public defeated(hpVictory: boolean): void {
        if (this.findStatusAffect(StatusAffects.KitsuneFight) >= 0) {
            this.game.forest.kitsuneScene.winKitsuneImpFight();
        } else {
            this.game.impScene.impVictory();
        }
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (this.findStatusAffect(StatusAffects.KitsuneFight) >= 0) {
            this.game.forest.kitsuneScene.loseKitsuneImpFight();
        } else if (pcCameWorms) {
            this.outx("\n\nThe imp grins at your already corrupted state...", false);
            this.player.lust = 100;
            this.doNext(this.game.impScene.impRapesYou);
        } else {
            this.game.impScene.impRapesYou();
        }
    }

    protected lustMagicAttack(): void {
        this.outx(`You see ${this.a}${this.short} make sudden arcane gestures at you!\n\n`);
        this.game.dynStats("lus", this.player.lib / 10 + this.player.cor / 10 + 10);
        if (this.player.lust < 30) this.outx("You feel strangely warm.  ");
        if (this.player.lust >= 30 && this.player.lust < 60)
            this.outx(
                "Blood rushes to your groin as a surge of arousal hits you, making your knees weak.  "
            );
        if (this.player.lust >= 60)
            this.outx(
                "Images of yourself fellating and fucking the imp assault your mind, unnaturally arousing you.  "
            );
        if (this.player.cocks.length > 0) {
            if (this.player.lust >= 60)
                this.outx(`You feel your ${this.player.multiCockDescriptLight()} dribble pre-cum.`);
            else if (this.player.lust >= 30 && this.player.cocks.length == 1)
                this.outx(`Your ${this.player.cockDescript(0)} hardens, distracting you further.`);
            else if (this.player.lust >= 30 && this.player.cocks.length > 1)
                this.outx(`Your ${this.player.multiCockDescriptLight()} harden uncomfortably.`);
            if (this.player.hasVagina()) this.outx("  ");
        }
        if (this.player.lust >= 60 && this.player.hasVagina()) {
            switch (this.player.vaginas[0].vaginalWetness) {
                case VAGINA_WETNESS_NORMAL:
                    this.outx(
                        `Your ${this.game.allVaginaDescript()} dampen${
                            this.player.vaginas.length > 1 ? "" : "s"
                        } perceptibly.`
                    );
                    break;
                case VAGINA_WETNESS_WET:
                    this.outx("Your crotch becomes sticky with girl-lust.");
                    break;
                case VAGINA_WETNESS_SLICK:
                    this.outx(
                        `Your ${this.game.allVaginaDescript()} become${
                            this.player.vaginas.length > 1 ? "" : "s"
                        } sloppy and wet.`
                    );
                    break;
                case VAGINA_WETNESS_DROOLING:
                    this.outx("Thick runners of girl-lube stream down the insides of your thighs.");
                    break;
                case VAGINA_WETNESS_SLAVERING:
                    this.outx(
                        `Your ${this.game.allVaginaDescript()} instantly soak${
                            this.player.vaginas.length > 1 ? "" : "s"
                        } your groin.`
                    );
                default: // Dry vaginas are unaffected
            }
        }
        this.outx("\n");
        if (this.player.lust > 99) this.doNext(this.game.endLustLoss);
        else this.doNext(this.game.playerMenu);
    }

    public constructor(noInit = false) {
        super();
        if (noInit) return;
        trace("Imp Constructor!");
        this.a = "the ";
        this.short = "imp";
        this.imageName = "imp";
        this.long =
            "An imp is short, only a few feet tall.  An unkempt mane of shaggy black hair hangs from his head, parted by two short curved horns.  His eyes are solid black, save for tiny red irises which glow with evil intent.  His skin is bright red, and unencumbered by clothing or armor, save for a small loincloth at his belt.  His feet are covered by tiny wooden sandals, and his hands tipped with sharp claws.  A pair of tiny but functional wings occasionally flap from his back.";
        // this.plural = false;
        this.createCock(Imp.rand(2) + 11, 2.5, CockTypesEnum.DEMON);
        this.balls = 2;
        this.ballSize = 1;
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_NORMAL;
        this.tallness = Imp.rand(24) + 25;
        this.hipRating = HIP_RATING_BOYISH;
        this.buttRating = BUTT_RATING_TIGHT;
        this.skinTone = "red";
        this.hairColor = "black";
        this.hairLength = 5;
        this.initStrTouSpeInte(20, 10, 25, 12);
        this.initLibSensCor(45, 45, 100);
        this.weaponName = "claws";
        this.weaponVerb = "claw-slash";
        this.armorName = "leathery skin";
        this.lust = 40;
        this.temperment = Imp.TEMPERMENT_LUSTY_GRAPPLES;
        this.level = 1;
        this.gems = Imp.rand(5) + 5;
        this.drop = new WeightedDrop()
            .add(this.consumables.SUCMILK, 3)
            .add(this.consumables.INCUBID, 3)
            .add(this.consumables.IMPFOOD, 4);
        this.special1 = this.lustMagicAttack;
        this.wingType = WING_TYPE_IMP;
        this.checkMonster();
    }
}
