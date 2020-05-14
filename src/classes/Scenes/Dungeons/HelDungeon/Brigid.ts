import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";
import { VAGINA_WETNESS_SLAVERING, VAGINA_LOOSENESS_LOOSE, LOWER_BODY_TYPE_HARPY, ANAL_LOOSENESS_STRETCHED, ANAL_WETNESS_DRY, HIP_RATING_AMPLE, BUTT_RATING_LARGE, WING_TYPE_FEATHERED_LARGE, TAIL_TYPE_DEMONIC, HORNS_DEMON } from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";

export class Brigid extends Monster {

    //Attack One: Hot Poker, Right Up Your Ass!
    private brigidPoke(): void {
        this.outputText("Brigid stalks forward with confidence, her shield absorbing your defensive blows until she's right on top of you. She bats your [weapon] aside and thrashes you with her hot poker, scalding your " + this.player.skin() + " and sending you reeling.");
        //(Effect: Heavy Damage)
        var damage: number = Math.round((this.str + this.weaponAttack) - Brigid.rand(this.player.tou) - this.player.armorDef);
        if (damage < 30) damage = 30;
        damage = this.player.takeDamage(damage);
        this.outputText(" (" + damage + ")");
        this.game.combatRoundOver();
    }

    //Attack Two: SHIELD BOP! OOM BOP!
    private brigidBop(): void {
        this.outputText("The harpy feints at you with her poker; you dodge the blow, but you leave yourself vulnerable as she spins around and slams her heavy shield into you, knocking you off balance.");
        //(Effect: Stagger/Stun)
        var damage: number = 5;
        damage = this.player.takeDamage(5);
        this.outputText(" (" + damage + ")");
        if (this.player.findPerk(PerkLib.Resolute) >= 0) this.outputText("  Of course, your resolute posture prevents her from accomplishing much.");
        else this.player.createStatusAffect(StatusAffects.Stunned, 0, 0, 0, 0);
        this.game.combatRoundOver();
    }

    //Attack Three: Harpy Ass Grind GO!
    private BrigidAssGrind(): void {
        this.outputText("Brigid grins as she approaches you.  She handily deflects a few defensive blows and grabs you by the shoulders.  She forces you onto your knees and before you can blink, has turned around and smashed your face into her ass!  \"<i>Mmm, you like that, don'tcha?</i>\" she growls, grinding her huge, soft ass across your face, giving you an up-close and personal feel of her egg-laying hips.");
        this.game.dynStats("lus", 30);
        this.game.combatRoundOver();
    }
    protected performCombatAction(): void {
        if (this.player.findStatusAffect(StatusAffects.Stunned) >= 0) {
            this.player.removeStatusAffect(StatusAffects.Stunned);
            if (Brigid.rand(2) == 0) this.BrigidAssGrind();
            else this.brigidPoke();
            return;
        }
        if (Brigid.rand(3) == 0) this.BrigidAssGrind();
        else if (Brigid.rand(2) == 0) this.brigidBop();
        else this.brigidPoke();
    }


    public defeated(hpVictory: boolean): void {
        this.game.brigidScene.pcDefeatsBrigid();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.brigidScene.pcDefeatedByBrigid();
    }

    public constructor() {
        super();
        this.a = "";
        this.short = "Brigid the Jailer";
        this.imageName = "brigid";
        this.long = "Brigid is a monster of a harpy, standing a foot taller than any other you've seen. She's covered in piercings, and her pink-dyed hair is shaved down to a long mohawk. She's nude, save for the hot poker in her right hand and the shield in her left, which jingles with every step she takes thanks to the cell keys beneath it.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_SLAVERING, VAGINA_LOOSENESS_LOOSE);
        if (LOWER_BODY_TYPE_HARPY > 0) {
            this.createStatusAffect(StatusAffects.BonusVCapacity, LOWER_BODY_TYPE_HARPY, 0, 0, 0);
        }
        this.createBreastRow(Appearance.breastCupInverse("D"));
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.tallness = Brigid.rand(8) + 70;
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "red";
        this.hairColor = "black";
        this.hairLength = 15;
        this.initStrTouSpeInte(90, 60, 120, 40);
        this.initLibSensCor(40, 45, 50);
        this.weaponName = "poker";
        this.weaponVerb = "burning stab";
        this.weaponAttack = 30;
        this.armorName = "armor";
        this.armorDef = 20;
        this.bonusHP = 1000;
        this.lust = 20;
        this.lustVuln = .25;
        this.temperment = Brigid.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 19;
        this.gems = Brigid.rand(25) + 140;
        this.additionalXP = 50;
        this.wingType = WING_TYPE_FEATHERED_LARGE;
        this.tailType = TAIL_TYPE_DEMONIC;
        this.hornType = HORNS_DEMON;
        this.horns = 2;
        this.drop = this.NO_DROP;
        this.checkMonster();
    }

}

