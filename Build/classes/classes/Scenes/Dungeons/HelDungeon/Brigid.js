define(["require", "exports", "../../../Monster", "../../../PerkLib", "../../../StatusAffects", "../../../../../includes/appearanceDefs", "../../../Appearance"], function (require, exports, Monster_1, PerkLib_1, StatusAffects_1, appearanceDefs_1, Appearance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Brigid extends Monster_1.Monster {
        //Attack One: Hot Poker, Right Up Your Ass!
        brigidPoke() {
            this.outputText("Brigid stalks forward with confidence, her shield absorbing your defensive blows until she's right on top of you. She bats your [weapon] aside and thrashes you with her hot poker, scalding your " + this.player.skin() + " and sending you reeling.");
            //(Effect: Heavy Damage)
            var damage = Math.round((this.str + this.weaponAttack) - Brigid.rand(this.player.tou) - this.player.armorDef);
            if (damage < 30)
                damage = 30;
            damage = this.player.takeDamage(damage);
            this.outputText(" (" + damage + ")");
            this.game.combatRoundOver();
        }
        //Attack Two: SHIELD BOP! OOM BOP!
        brigidBop() {
            this.outputText("The harpy feints at you with her poker; you dodge the blow, but you leave yourself vulnerable as she spins around and slams her heavy shield into you, knocking you off balance.");
            //(Effect: Stagger/Stun)
            var damage = 5;
            damage = this.player.takeDamage(5);
            this.outputText(" (" + damage + ")");
            if (this.player.findPerk(PerkLib_1.PerkLib.Resolute) >= 0)
                this.outputText("  Of course, your resolute posture prevents her from accomplishing much.");
            else
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.Stunned, 0, 0, 0, 0);
            this.game.combatRoundOver();
        }
        //Attack Three: Harpy Ass Grind GO!
        BrigidAssGrind() {
            this.outputText("Brigid grins as she approaches you.  She handily deflects a few defensive blows and grabs you by the shoulders.  She forces you onto your knees and before you can blink, has turned around and smashed your face into her ass!  \"<i>Mmm, you like that, don'tcha?</i>\" she growls, grinding her huge, soft ass across your face, giving you an up-close and personal feel of her egg-laying hips.");
            this.game.dynStats("lus", 30);
            this.game.combatRoundOver();
        }
        performCombatAction() {
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Stunned) >= 0) {
                this.player.removeStatusAffect(StatusAffects_1.StatusAffects.Stunned);
                if (Brigid.rand(2) == 0)
                    this.BrigidAssGrind();
                else
                    this.brigidPoke();
                return;
            }
            if (Brigid.rand(3) == 0)
                this.BrigidAssGrind();
            else if (Brigid.rand(2) == 0)
                this.brigidBop();
            else
                this.brigidPoke();
        }
        defeated(hpVictory) {
            this.game.brigidScene.pcDefeatsBrigid();
        }
        won(hpVictory, pcCameWorms) {
            this.game.brigidScene.pcDefeatedByBrigid();
        }
        constructor() {
            super();
            this.a = "";
            this.short = "Brigid the Jailer";
            this.imageName = "brigid";
            this.long = "Brigid is a monster of a harpy, standing a foot taller than any other you've seen. She's covered in piercings, and her pink-dyed hair is shaved down to a long mohawk. She's nude, save for the hot poker in her right hand and the shield in her left, which jingles with every step she takes thanks to the cell keys beneath it.";
            // this.plural = false;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLAVERING, appearanceDefs_1.VAGINA_LOOSENESS_LOOSE);
            if (appearanceDefs_1.LOWER_BODY_TYPE_HARPY > 0) {
                this.createStatusAffect(StatusAffects_1.StatusAffects.BonusVCapacity, appearanceDefs_1.LOWER_BODY_TYPE_HARPY, 0, 0, 0);
            }
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("D"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_STRETCHED;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.tallness = Brigid.rand(8) + 70;
            this.hipRating = appearanceDefs_1.HIP_RATING_AMPLE + 2;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE;
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
            this.wingType = appearanceDefs_1.WING_TYPE_FEATHERED_LARGE;
            this.tailType = appearanceDefs_1.TAIL_TYPE_DEMONIC;
            this.hornType = appearanceDefs_1.HORNS_DEMON;
            this.horns = 2;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
    }
    exports.Brigid = Brigid;
});
//# sourceMappingURL=Brigid.js.map