define(["require", "exports", "../../../Monster", "../../../StatusAffects", "../../../CockTypesEnum", "../../../../../includes/appearanceDefs", "../../../Appearance"], function (require, exports, Monster_1, StatusAffects_1, CockTypesEnum_1, appearanceDefs_1, Appearance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Farmers extends Monster_1.Monster {
        performCombatAction() {
            this.createStatusAffect(StatusAffects_1.StatusAffects.Attacks, 4, 0, 0, 0);
            this.eAttack();
            this.combatRoundOver();
        }
        defeated(hpVictory) {
            this.game.owca.beatUpOwca();
        }
        won(hpVictory, pcCameWorms) {
            this.game.owca.loseToOwca();
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "farmers";
            this.imageName = "farmers";
            this.long = "This is a group of thirty angry villagers, almost all human-looking but for the tiny horn-like protrusions growing from their heads and the white fuzz that almost passes off as hair.  They are all armed with pitchforks or other crude farming tools they use in their everyday task.  Rebecc is staring from behind them with horrified eyes at the combat, paralyzed by the sudden turn of events.";
            this.plural = true;
            this.pronoun1 = "they";
            this.pronoun2 = "them";
            this.pronoun3 = "their";
            this.createCock(9, 2, CockTypesEnum_1.CockTypesEnum.HUMAN);
            this.balls = 2;
            this.ballSize = 1;
            this.cumMultiplier = 3;
            // this.hoursSinceCum = 0;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLICK, appearanceDefs_1.VAGINA_LOOSENESS_LOOSE);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("A"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_STRETCHED;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_SLIME_DROOLING;
            this.tallness = Farmers.rand(8) + 70;
            this.hipRating = appearanceDefs_1.HIP_RATING_AMPLE + 2;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE;
            this.skinTone = "red";
            this.hairColor = "black";
            this.hairLength = 15;
            this.initStrTouSpeInte(40, 50, 99, 99);
            this.initLibSensCor(35, 35, 20);
            this.weaponName = "pitchforks";
            this.weaponVerb = "stab";
            this.armorName = "chitin";
            this.bonusHP = 500;
            this.lustVuln = 0;
            this.temperment = Farmers.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 10;
            this.gems = Farmers.rand(25) + 40;
            this.hornType = appearanceDefs_1.HORNS_DEMON;
            this.horns = 2;
            this.tailType = appearanceDefs_1.TAIL_TYPE_DEMONIC;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
    }
    exports.Farmers = Farmers;
});
//# sourceMappingURL=Farmers.js.map