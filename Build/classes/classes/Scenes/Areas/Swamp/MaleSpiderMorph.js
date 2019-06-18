define(["require", "exports", "./AbstractSpiderMorph", "../../../../../includes/appearanceDefs", "../../../StatusAffects", "../../../internals/WeightedDrop"], function (require, exports, AbstractSpiderMorph_1, appearanceDefs_1, StatusAffects_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MaleSpiderMorph extends AbstractSpiderMorph_1.AbstractSpiderMorph {
        defeated(hpVictory) {
            this.game.swamp.maleSpiderMorphScene.defeatSpiderBoy();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nThe spider flashes a predatory grin while she waits it out...");
                this.doNext(this.game.endLustLoss);
            }
            else {
                this.game.swamp.maleSpiderMorphScene.loseToMaleSpiderMorph();
            }
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "male spider-morph";
            this.imageName = "malespidermorph";
            this.long = "The male spider-morph is completely nude, save for his thigh-high stockings and forearm-length gloves, which upon closer inspection, appear to be actually be part of his body - his exoskeleton.  His exposed skin is pale as the full moon, save for the dusk of his nipples and a patch of jet-black that spreads out over his groin, glossing the male's foreskinned cock and dangling sack in glistening ebon.  His ass is small but well-rounded, with a weighty spider-abdomen hanging from just above.  The spider-man is currently eyeing you with a strange expression and his fangs bared.";
            // this.plural = false;
            this.createCock(6, 2);
            this.balls = 2;
            this.ballSize = 2;
            this.createBreastRow(0);
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 40, 0, 0, 0);
            this.tallness = 7 * 12 + 6;
            this.hipRating = appearanceDefs_1.HIP_RATING_CURVY + 2;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE + 1;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS;
            this.skinTone = "dusky";
            this.hairColor = "red";
            this.hairLength = 13;
            this.initStrTouSpeInte(60, 50, 99, 99);
            this.initLibSensCor(35, 35, 20);
            this.weaponName = "dagger";
            this.weaponVerb = "stab";
            this.weaponAttack = 15;
            this.armorName = "exoskeleton";
            this.armorDef = 14;
            this.armorPerk = "";
            this.armorValue = 70;
            this.bonusHP = 200;
            this.lust = 20;
            this.lustVuln = .6;
            this.temperment = MaleSpiderMorph.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 13;
            this.gems = MaleSpiderMorph.rand(10) + 10;
            this.drop = new WeightedDrop_1.WeightedDrop().add(this.consumables.S_GOSSR, 5)
                .add(this.useables.T_SSILK, 1)
                .add(undefined, 4);
            this.tailType = appearanceDefs_1.TAIL_TYPE_SPIDER_ADBOMEN;
            this.tailRecharge = 0;
            this.checkMonster();
        }
    }
    exports.MaleSpiderMorph = MaleSpiderMorph;
});
//# sourceMappingURL=MaleSpiderMorph.js.map