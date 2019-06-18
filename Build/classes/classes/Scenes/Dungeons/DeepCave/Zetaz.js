define(["require", "exports", "../../../Monster", "../../../CockTypesEnum", "../../../../../includes/appearanceDefs", "../../../internals/WeightedDrop"], function (require, exports, Monster_1, CockTypesEnum_1, appearanceDefs_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Zetaz extends Monster_1.Monster {
        doAI() {
            this.game.zetazAI();
        }
        defeated(hpVictory) {
            this.game.defeatZetaz();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nYour foe doesn't seem put off enough to care...");
                this.doNext(this.game.endLustLoss);
            }
            else {
                this.game.loseToZetaz();
            }
        }
        constructor() {
            super();
            this.a = "";
            this.short = "Zetaz";
            this.imageName = "zetaz";
            this.long = "Zetaz has gone from a pipsqueak to the biggest imp you've seen!  Though he has the familiar red skin, curving pointed horns, and wings you would expect to find on an imp, his feet now end in hooves, and his body is covered with thick layers of muscle.  If the dramatic change in appearance is any indication, he's had to toughen up nearly as much as yourself over the past " + (this.game.model.time.days < 60 ? "weeks" : "months") + ".  Zetaz still wears the trademark imp loincloth, though it bulges and shifts with his movements in a way that suggest a considerable flaccid size and large, full sack.  His shoulders are wrapped with studded leather and his wrists are covered with metallic bracers.  The imp has clearly invested in at least a little additional protection.  It does not look like he carries a weapon.";
            this.createCock(Zetaz.rand(2) + 11, 2.5, CockTypesEnum_1.CockTypesEnum.DEMON);
            this.balls = 2;
            this.ballSize = 1;
            this.cumMultiplier = 3;
            this.hoursSinceCum = 20;
            this.createBreastRow(0);
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.tallness = 4 * 12 + 1;
            this.hipRating = appearanceDefs_1.HIP_RATING_BOYISH;
            this.buttRating = appearanceDefs_1.BUTT_RATING_TIGHT;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_KANGAROO;
            this.skinTone = "red";
            this.hairColor = "black";
            this.hairLength = 5;
            this.initStrTouSpeInte(65, 60, 45, 52);
            this.initLibSensCor(55, 35, 100);
            this.weaponName = "claws";
            this.weaponVerb = "claw-slash";
            this.armorName = "leathery skin";
            this.bonusHP = 350;
            this.lust = 40;
            this.lustVuln = .35;
            this.temperment = Zetaz.TEMPERMENT_LUSTY_GRAPPLES;
            this.level = 12;
            this.gems = Zetaz.rand(55) + 150;
            this.additionalXP = 100;
            this.drop = new WeightedDrop_1.WeightedDrop(this.consumables.BIMBOLQ, 1);
            this.wingType = appearanceDefs_1.WING_TYPE_IMP;
            this.wingDesc = "small";
            this.checkMonster();
        }
    }
    exports.Zetaz = Zetaz;
});
//# sourceMappingURL=Zetaz.js.map