define(["require", "exports", "../Areas/Lake/GooGirl", "../../StatusAffects", "../../../../includes/appearanceDefs", "../../Appearance"], function (require, exports, GooGirl_1, StatusAffects_1, appearanceDefs_1, Appearance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GooArmor extends GooGirl_1.GooGirl {
        performCombatAction() {
            this.game.gooArmorAI();
        }
        defeated(hpVictory) {
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Spar) >= 0)
                this.game.valeria.pcWinsValeriaSpar();
            else
                this.game.beatUpGooArmor();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nThe armored goo sighs while you exhaust yourself...");
                this.doNext(this.game.endLustLoss);
            }
            else {
                if (this.findStatusAffect(StatusAffects_1.StatusAffects.Spar) >= 0)
                    this.game.valeria.pcWinsValeriaSparDefeat();
                else
                    this.game.gooArmorBeatsUpPC();
            }
        }
        constructor() {
            super(true);
            this.a = "a ";
            this.short = "Goo Armor";
            this.imageName = "gooarmor";
            this.long = "Before you stands a suit of plated mail armor filled with a bright blue goo, standing perhaps six feet off the ground.  She has a beautiful, feminine face, and her scowl as she stands before you is almost cute.  She has formed a mighty greatsword from her goo, and has assumed the stance of a well-trained warrior.";
            // this.plural = false;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLAVERING, appearanceDefs_1.VAGINA_LOOSENESS_GAPING_WIDE);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("C"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_STRETCHED;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_SLIME_DROOLING;
            this.tallness = GooArmor.rand(8) + 70;
            this.hipRating = appearanceDefs_1.HIP_RATING_AMPLE + 2;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE;
            this.skinTone = "blue";
            this.skinType = appearanceDefs_1.SKIN_TYPE_GOO;
            //this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_GOO];
            this.skinAdj = "goopey";
            this.hairColor = "black";
            this.hairLength = 15;
            this.hairType = appearanceDefs_1.HAIR_GOO;
            this.initStrTouSpeInte(60, 50, 50, 40);
            this.initLibSensCor(60, 35, 50);
            this.weaponName = "goo sword";
            this.weaponVerb = "slash";
            this.weaponAttack = 60;
            this.armorName = "armor";
            this.armorDef = 50;
            this.bonusHP = 500;
            this.lustVuln = .35;
            this.temperment = GooArmor.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 16;
            this.gems = GooArmor.rand(25) + 40;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
    }
    exports.GooArmor = GooArmor;
});
//# sourceMappingURL=GooArmor.js.map