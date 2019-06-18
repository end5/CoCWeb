define(["require", "exports", "../../../Monster", "../../../../../includes/appearanceDefs", "../../../Appearance"], function (require, exports, Monster_1, appearanceDefs_1, Appearance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SandWitchMob extends Monster_1.Monster {
        performCombatAction() {
            this.game.sandWitchMobAI();
        }
        defeated(hpVictory) {
            this.game.yoYouBeatUpSomeSandWitchesYOUMONSTER();
        }
        won(hpVictory, pcCameWorms) {
            this.game.loseToSammitchMob();
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "sand witches";
            this.imageName = "sandwitchmob";
            this.long = "You are surrounded by a veritable tribe of sand witches.  Like the ones that roam the sands, they have simple robes, blond hair, and four big breasts that push at the concealing cloth immodestly.  Glowering at you hatefully, the pack of female spellcasters readies itself to drag you down with sheer numbers.";
            this.plural = true;
            this.pronoun1 = "they";
            this.pronoun2 = "them";
            this.pronoun3 = "their";
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_WET, appearanceDefs_1.VAGINA_LOOSENESS_LOOSE);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("DD"));
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("DD"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_NORMAL;
            this.tallness = SandWitchMob.rand(12) + 55;
            this.hipRating = appearanceDefs_1.HIP_RATING_CURVY;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE;
            this.skinTone = "bronzed";
            this.hairColor = "sandy-blonde";
            this.hairLength = 15;
            this.initStrTouSpeInte(25, 25, 35, 45);
            this.initLibSensCor(55, 40, 30);
            this.weaponName = "fists";
            this.weaponVerb = "punches";
            this.weaponAttack = 0;
            this.weaponPerk = "";
            this.weaponValue = 150;
            this.armorName = "robes";
            this.armorDef = 1;
            this.armorPerk = "";
            this.armorValue = 5;
            this.bonusHP = 80;
            this.lust = 30;
            this.lustVuln = .5;
            this.temperment = SandWitchMob.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 4;
            this.gems = SandWitchMob.rand(15) + 5;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
    }
    exports.SandWitchMob = SandWitchMob;
});
//# sourceMappingURL=SandWitchMob.js.map