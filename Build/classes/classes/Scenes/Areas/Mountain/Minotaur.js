define(["require", "exports", "../../../Monster", "../../../StatusAffects", "../../../Appearance", "../../../../console", "../../../CockTypesEnum", "../../../../../includes/appearanceDefs", "../../../internals/WeightedDrop", "../../../internals/ChainedDrop"], function (require, exports, Monster_1, StatusAffects_1, Appearance_1, console_1, CockTypesEnum_1, appearanceDefs_1, WeightedDrop_1, ChainedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ...
     * @author Fake-Name
     */
    class Minotaur extends Monster_1.Monster {
        defeated(hpVictory) {
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.PhyllaFight) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.PhyllaFight);
                this.outputText("You defeat a minotaur!  ", true);
                this.game.desert.antsScene.phyllaBeatAMino();
            }
            else {
                this.game.mountain.minotaurScene.minoVictoryRapeChoices();
            }
        }
        won(hpVictory, pcCameWorms) {
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.PhyllaFight) >= 0) {
                this.removeStatusAffect(StatusAffects_1.StatusAffects.PhyllaFight);
                this.game.desert.antsScene.phyllaPCLostToMino();
            }
            else if (pcCameWorms) {
                this.outputText("\n\nThe minotaur picks you up and forcibly tosses you from his cave, grunting in displeasure.", false);
                this.game.cleanupAfterCombat();
            }
            else
                this.game.mountain.minotaurScene.getRapedByMinotaur();
        }
        get long() {
            return "An angry-looking minotaur looms over you.  Covered in shaggy " + this.hairColor + " fur, the beast is an imposing sight.  Wearing little but an obviously distended loincloth, he is clearly already plotting his method of punishment.  Like most minotaurs he has hooves, a cow-like tail and face, prominent horns, and impressive musculature. " +
                (this.ballSize > 4 ? ("  Barely visible below the tattered shreds of loincloth are " + Appearance_1.Appearance.ballsDescription(true, true, this) + ", swollen with the minotaur's long pent-up need.") : "") +
                (this.hasAxe ? "<b>This minotaur seems to have found a deadly looking axe somewhere!</b>" : "");
        }
        constructor(axe = false) {
            super();
            //Most times they dont have an axe
            this.hasAxe = axe || Minotaur.rand(3) == 0;
            var furColor = Minotaur.randomChoice("black", "brown");
            console_1.trace("Minotaur Constructor!");
            console_1.trace(this.game.flags);
            this.a = "the ";
            this.short = "minotaur";
            this.imageName = "minotaur";
            // this.long = "";
            // this.plural = false;
            this.createCock(Minotaur.rand(13) + 24, 2 + Minotaur.rand(3), CockTypesEnum_1.CockTypesEnum.HORSE);
            this.balls = 2;
            this.ballSize = 2 + Minotaur.rand(13);
            this.cumMultiplier = 1.5;
            this.hoursSinceCum = this.ballSize * 10;
            this.createBreastRow(0);
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_STRETCHED;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_NORMAL;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 30, 0, 0, 0);
            this.tallness = Minotaur.rand(37) + 84;
            this.hipRating = appearanceDefs_1.HIP_RATING_AVERAGE;
            this.buttRating = appearanceDefs_1.BUTT_RATING_AVERAGE;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_HOOFED;
            this.skinTone = furColor;
            this.skinType = appearanceDefs_1.SKIN_TYPE_FUR;
            this.skinDesc = "shaggy fur";
            this.hairColor = furColor;
            this.hairLength = 3;
            this.initStrTouSpeInte(this.hasAxe ? 75 : 50, 60, 30, 20);
            this.initLibSensCor(40 + this.ballSize * 2, 15 + this.ballSize * 2, 35);
            this.faceType = appearanceDefs_1.FACE_COW_MINOTAUR;
            this.weaponName = this.hasAxe ? "axe" : "fist";
            this.weaponVerb = this.hasAxe ? "cleave" : "punch";
            this.armorName = "thick fur";
            this.bonusHP = 20 + Minotaur.rand(this.ballSize * 2);
            this.lust = this.ballSize * 3;
            this.lustVuln = this.hasAxe ? 0.84 : 0.87;
            this.temperment = Minotaur.TEMPERMENT_LUSTY_GRAPPLES;
            this.level = this.hasAxe ? 6 : 5;
            this.gems = Minotaur.rand(5) + 5;
            if (this.hasAxe) {
                this.drop = new WeightedDrop_1.WeightedDrop(this.consumables.MINOBLO, 1);
            }
            else {
                this.drop = new ChainedDrop_1.ChainedDrop().add(this.consumables.MINOCUM, 1 / 5)
                    .add(this.consumables.MINOBLO, 1 / 2)
                    .elseDrop(undefined);
            }
            this.special1 = this.game.mountain.minotaurScene.minoPheromones;
            this.tailType = appearanceDefs_1.TAIL_TYPE_COW;
            this.checkMonster();
        }
    }
    exports.Minotaur = Minotaur;
});
//# sourceMappingURL=Minotaur.js.map