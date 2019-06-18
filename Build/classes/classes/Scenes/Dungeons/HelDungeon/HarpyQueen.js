define(["require", "exports", "../../../Monster", "../../../../../includes/appearanceDefs", "../../../Appearance"], function (require, exports, Monster_1, appearanceDefs_1, Appearance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HarpyQueen extends Monster_1.Monster {
        performCombatAction() {
            this.game.harpyQueenAI();
        }
        defeated(hpVictory) {
            this.game.harpyQueenDefeatedByPC();
        }
        won(hpVictory, pcCameWorms) {
            this.game.harpyQueenBeatsUpPCBadEnd();
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "Harpy Queen";
            this.imageName = "harpyqueen";
            this.long = "You face the Harpy Queen, a broodmother of epic proportions - literally.  Her hips are amazingly wide, thrice her own width at the least, and the rest of her body is lushly voluptuous, with plush, soft thighs and a tremendous butt.  Her wide wings beat occasionally, sending ripples through her jiggly body.  She wields a towering whitewood staff in one hand, using the other to cast eldritch spells.";
            // this.plural = false;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLAVERING, appearanceDefs_1.VAGINA_LOOSENESS_LOOSE);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("D"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_STRETCHED;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.tallness = HarpyQueen.rand(8) + 70;
            this.hipRating = appearanceDefs_1.HIP_RATING_AMPLE + 2;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_HARPY;
            this.skinTone = "red";
            this.skinType = appearanceDefs_1.SKIN_TYPE_PLAIN;
            this.skinDesc = "feathers";
            this.hairColor = "black";
            this.hairLength = 15;
            this.initStrTouSpeInte(70, 60, 120, 40);
            this.initLibSensCor(40, 45, 50);
            this.weaponName = "eldritch staff";
            this.weaponVerb = "thwack";
            this.weaponAttack = 20;
            this.armorName = "armor";
            this.armorDef = 20;
            this.bonusHP = 1000;
            this.lust = 20;
            this.lustVuln = .15;
            this.temperment = HarpyQueen.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 20;
            this.gems = HarpyQueen.rand(25) + 160;
            this.additionalXP = 50;
            this.tailType = appearanceDefs_1.TAIL_TYPE_HARPY;
            this.wingType = appearanceDefs_1.WING_TYPE_FEATHERED_LARGE;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
    }
    exports.HarpyQueen = HarpyQueen;
});
//# sourceMappingURL=HarpyQueen.js.map