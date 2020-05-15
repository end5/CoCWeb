import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_NORMAL,
    BUTT_RATING_LARGE,
    HIP_RATING_CURVY,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_WETNESS_WET,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class SandWitch extends Monster {
    public defeated(hpVictory: boolean): void {
        if (this.player.findStatusAffect(StatusAffects.StoneLust)) {
            this.player.removeStatusAffect(StatusAffects.StoneLust);
        }

        if (this.player.lust >= 33) {
            this.game.desert.sandWitchScene.beatSandwitch();
        } else {
            this.game.finishCombat();
        }
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nThe witch blanches and backs away, leaving you to your fate.");
            this.game.cleanupAfterCombat();
        } else {
            this.game.desert.sandWitchScene.sandwitchRape();
        }
    }

    private lustMagicAttack(): void {
        this.outx(
            "The sand witch points at you, drawing a circle in the air and mouthing strange words.\n\n"
        );
        if (this.player.findStatusAffect(StatusAffects.StoneLust) >= 0) {
            this.outx(
                "The orb inside you grows warm, almost hot, suffusing your body with heat and arousal.  "
            );
            this.game.dynStats("lus", 8 + Math.floor(this.player.sens) / 10);
        } else {
            this.outx(
                `You feel the sands shift by your ${this.player.feet()}, and look down to see something slip out of the sands and into your clothes!  It feels incredibly smooth and circular as it glides upward along your ${this.player.leg()}, its progress unaffected by your frantic effort to dislodge it.  `
            );
            if (this.player.vaginas.length > 0)
                this.outx(
                    `It glides up your thighs to the entrance of your sex, and its intentions dawn on you!\n\nToo late! You reach to stop it, but it pushes against your lips and slips inside your ${this.vaginaDescript(
                        0
                    )} in an instant.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size.`
                );
            else
                this.outx(
                    "It glides up your thighs, curving around your buttocks, and its intentions dawn on you.\n\nYou desperately grab for it, but are too late!  It pushes firmly against your rectum and slips inside instantaneously.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size."
                );
            this.player.createStatusAffect(StatusAffects.StoneLust, 0, 0, 0, 0);
            this.game.dynStats("lus", 4 + Math.floor(this.player.sens) / 10);
        }
        this.doNext(this.game.playerMenu);
    }

    public constructor() {
        super();
        trace("SandWitch Constructor!");
        this.a = "the ";
        if (this.game.silly()) {
            this.short = "sand witch";
            this.imageName = "sandwidch";
        } else {
            this.short = "sand witch";
            this.imageName = "sandwitch";
        }
        this.long =
            "A sand witch appears to be totally human, an oddity in this strange land.  She has dirty blonde hair and a very tanned complexion, choosing to cover most of her body with robes of the same color as the desert sands, making her impossible to spot from afar.";
        this.createVagina(false, VAGINA_WETNESS_WET, VAGINA_LOOSENESS_LOOSE);
        this.createBreastRow(Appearance.breastCupInverse("DD"));
        this.createBreastRow(Appearance.breastCupInverse("DD"));
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_NORMAL;
        this.tallness = SandWitch.rand(12) + 55;
        this.hipRating = HIP_RATING_CURVY;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "bronzed";
        this.hairColor = "sandy-blonde";
        this.hairLength = 15;
        this.initStrTouSpeInte(25, 25, 35, 45);
        this.initLibSensCor(55, 40, 30);
        this.weaponName = "kick";
        this.weaponVerb = "kick";
        this.armorName = "robes";
        this.bonusHP = 20;
        this.lust = 30;
        this.temperment = SandWitch.TEMPERMENT_LUSTY_GRAPPLES;
        this.level = 3;
        this.gems = SandWitch.rand(15) + 5;
        this.drop = new WeightedDrop().addMany(
            1,
            this.consumables.TSCROLL,
            this.consumables.OVIELIX,
            this.consumables.LACTAID,
            this.consumables.LABOVA_,
            this.consumables.W__BOOK,
            this.consumables.B__BOOK,
            undefined
        );
        this.special1 = this.lustMagicAttack;
        this.special2 = this.special2;
        this.special3 = this.special3;
        this.checkMonster();
    }
}
