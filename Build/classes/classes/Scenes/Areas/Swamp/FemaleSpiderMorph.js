define(["require", "exports", "./AbstractSpiderMorph", "../../../../../includes/appearanceDefs", "../../../StatusAffects", "../../../Appearance", "../../../internals/WeightedDrop"], function (require, exports, AbstractSpiderMorph_1, appearanceDefs_1, StatusAffects_1, Appearance_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ...
     * @author ...
     */
    class FemaleSpiderMorph extends AbstractSpiderMorph_1.AbstractSpiderMorph {
        defeated(hpVictory) {
            this.game.swamp.femaleSpiderMorphScene.defeatASpiderBitch();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nThe spider flashes a predatory grin while she waits it out...");
                this.doNext(this.game.endLustLoss);
            }
            else {
                this.game.swamp.femaleSpiderMorphScene.loseToFemaleSpiderMorph();
            }
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "female spider-morph";
            this.imageName = "femalespidermorph";
            this.long = "The female spider-morph is completely nude, save for her thigh-high stockings and forearm-length gloves, which upon closer inspection, appear to be actually be part of her body - her exoskeleton.  Her exposed skin is pale as the full moon, save for the dusky skin of her nipples and the black-skinned delta of her sex.  Her breasts and ass are both full and well-rounded, and just above her ass-cheeks there's a bulbous spider-abdomen.  The spider-girl is currently eyeing you with a strange expression and her fangs bared.";
            // this.plural = false;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_DROOLING, appearanceDefs_1.VAGINA_LOOSENESS_LOOSE);
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusVCapacity, 40, 0, 0, 0);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("E+"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_VIRGIN;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 30, 0, 0, 0);
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
            this.armorValue = 50;
            this.bonusHP = 200;
            this.lust = 20;
            this.lustVuln = .6;
            this.temperment = FemaleSpiderMorph.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 13;
            this.gems = FemaleSpiderMorph.rand(10) + 10;
            this.drop = new WeightedDrop_1.WeightedDrop().add(this.consumables.S_GOSSR, 5)
                .add(this.useables.T_SSILK, 1)
                .add(undefined, 4);
            this.tailType = appearanceDefs_1.TAIL_TYPE_SPIDER_ADBOMEN;
            this.checkMonster();
        }
    }
    exports.FemaleSpiderMorph = FemaleSpiderMorph;
});
//# sourceMappingURL=FemaleSpiderMorph.js.map