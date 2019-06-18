define(["require", "exports", "../../../Monster", "../../../../../includes/appearanceDefs", "../../../Appearance"], function (require, exports, Monster_1, appearanceDefs_1, Appearance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HarpyMob extends Monster_1.Monster {
        performCombatAction() {
            this.game.harpyHordeAI();
        }
        defeated(hpVictory) {
            this.game.pcDefeatsHarpyHorde();
        }
        won(hpVictory, pcCameWorms) {
            this.game.pcLosesToHarpyHorde();
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "harpy horde";
            this.imageName = "harpymob";
            this.long = "You are surrounded by a wing of particularly large and muscular harpies, perhaps a dozen of them in total.  All of them are clad in simple brown shifts that give them good camouflage in the mountains, and are using their talon-like claws as weapons against you. While not a great threat to a champion of your ability individually, a whole brood of them together is... something else entirely.";
            this.plural = true;
            this.pronoun1 = "they";
            this.pronoun2 = "them";
            this.pronoun3 = "their";
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLAVERING, appearanceDefs_1.VAGINA_LOOSENESS_GAPING_WIDE);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("B"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_STRETCHED;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_SLIME_DROOLING;
            this.tallness = HarpyMob.rand(8) + 70;
            this.hipRating = appearanceDefs_1.HIP_RATING_CURVY + 2;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_HARPY;
            this.skinTone = "red";
            this.skinType = appearanceDefs_1.SKIN_TYPE_PLAIN;
            this.skinDesc = "feathers";
            this.hairColor = "black";
            this.hairLength = 15;
            this.initStrTouSpeInte(50, 50, 120, 40);
            this.initLibSensCor(60, 45, 50);
            this.weaponName = "claw";
            this.weaponVerb = "claw";
            this.weaponAttack = 10;
            this.armorName = "armor";
            this.armorDef = 20;
            this.bonusHP = 1000;
            this.lust = 20;
            this.lustVuln = .2;
            this.temperment = HarpyMob.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 18;
            this.gems = HarpyMob.rand(25) + 140;
            this.additionalXP = 50;
            this.tailType = appearanceDefs_1.TAIL_TYPE_HARPY;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
    }
    exports.HarpyMob = HarpyMob;
});
//# sourceMappingURL=HarpyMob.js.map