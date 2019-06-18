define(["require", "exports", "../../../Monster", "../../../../console", "../../../CockTypesEnum", "../../../../../includes/appearanceDefs", "../../../StatusAffects", "../../../internals/WeightedDrop"], function (require, exports, Monster_1, console_1, CockTypesEnum_1, appearanceDefs_1, StatusAffects_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ImpHorde extends Monster_1.Monster {
        performCombatAction() {
            this.game.impGangAI();
        }
        defeated(hpVictory) {
            this.game.impGangVICTORY();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nYour foes don't seem put off enough to leave...");
                this.doNext(this.game.endLustLoss);
            }
            else {
                this.game.loseToImpMob();
            }
        }
        constructor() {
            super();
            console_1.trace("ImpHorde Constructor!");
            this.a = "the ";
            this.short = "imp horde";
            this.imageName = "impmob";
            this.long = "Imps of all shapes and sizes fill the room around you, keeping you completely surrounded by their myriad forms.  You can see more than a few sporting disproportionate erections, and there's even some with exotic dog-dicks, horse-pricks, and the odd spiny cat-cock.  Escape is impossible, you'll have to fight or seduce your way out of this one!";
            this.plural = true;
            this.pronoun1 = "they";
            this.pronoun2 = "them";
            this.pronoun3 = "their";
            this.createCock(12, 2, CockTypesEnum_1.CockTypesEnum.DEMON);
            this.balls = 2;
            this.ballSize = 1;
            this.createBreastRow(0);
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 10, 0, 0, 0);
            this.tallness = 36;
            this.hipRating = appearanceDefs_1.HIP_RATING_SLENDER;
            this.buttRating = appearanceDefs_1.BUTT_RATING_TIGHT;
            this.skinTone = "red";
            this.hairColor = "black";
            this.hairLength = 1;
            this.initStrTouSpeInte(20, 10, 25, 12);
            this.initLibSensCor(45, 45, 100);
            this.weaponName = "fists";
            this.weaponVerb = "punches";
            this.armorName = "skin";
            this.bonusHP = 450;
            this.lust = 10;
            this.lustVuln = .5;
            this.temperment = ImpHorde.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 10;
            this.gems = 20 + ImpHorde.rand(25);
            this.drop = new WeightedDrop_1.WeightedDrop(this.armors.NURSECL, 1);
            this.wingType = appearanceDefs_1.WING_TYPE_IMP;
            this.wingDesc = "imp wings";
            this.checkMonster();
        }
    }
    exports.ImpHorde = ImpHorde;
});
//# sourceMappingURL=ImpHorde.js.map