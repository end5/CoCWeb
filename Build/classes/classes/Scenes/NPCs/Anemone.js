define(["require", "exports", "../../Monster", "../../StatusAffects", "../../CockTypesEnum", "../../../../includes/appearanceDefs", "../../Appearance", "../../internals/WeightedDrop"], function (require, exports, Monster_1, StatusAffects_1, CockTypesEnum_1, appearanceDefs_1, Appearance_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Anemone extends Monster_1.Monster {
        eAttack() {
            this.outputText("Giggling playfully, the anemone launches several tentacles at you.  Most are aimed for your crotch, but a few attempt to caress your chest and face.\n", false);
            super.eAttack();
        }
        eOneAttack() {
            this.applyVenom(Anemone.rand(4 + this.player.sens / 20) + 1);
            return 1;
        }
        //Apply the effects of AnemoneVenom()
        applyVenom(str = 1) {
            //First application
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.AnemoneVenom) < 0)
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.AnemoneVenom, 0, 0, 0, 0);
            //Gain some lust
            this.game.dynStats("lus", (2 * str));
            //Loop through applying 1 point of venom at a time.
            while (str > 0) {
                str--;
                //Str bottommed out, convert to lust
                if (this.player.str < 2)
                    this.game.dynStats("lus", 2);
                //Lose a point of str.
                else {
                    Anemone.showStatDown("str");
                    // strDown.visible = true;
                    // strUp.visible = false;
                    this.player.str--;
                    this.player.addStatusValue(StatusAffects_1.StatusAffects.AnemoneVenom, 1, 1);
                }
                //Spe bottomed out, convert to lust
                if (this.player.spe < 2)
                    this.game.dynStats("lus", 2);
                //Lose a point of spe.
                else {
                    Anemone.showStatDown("spe");
                    // speDown.visible = true;
                    // speUp.visible = false;
                    this.player.spe--;
                    this.player.addStatusValue(StatusAffects_1.StatusAffects.AnemoneVenom, 2, 1);
                }
            }
            this.game.statScreenRefresh();
        }
        defeated(hpVictory) {
            this.game.anemoneScene.defeatAnemone();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nYour foe doesn't seem to mind at all...");
                this.doNext(this.game.endLustLoss);
            }
            else {
                this.game.anemoneScene.loseToAnemone();
            }
        }
        outputAttack(damage) {
            this.outputText("You jink and dodge valiantly but the tentacles are too numerous and coming from too many directions.  A few get past your guard and caress your skin, leaving a tingling, warm sensation that arouses you further.", false);
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "anemone";
            this.imageName = "anemone";
            this.long = "The anemone is a blue androgyne humanoid of medium height and slender build, with colorful tentacles sprouting on her head where hair would otherwise be.  Her feminine face contains two eyes of solid color, lighter than her skin.  Two feathery gills sprout from the middle of her chest, along the line of her spine and below her collarbone, and drape over her pair of small B-cup breasts.  Though you wouldn't describe her curves as generous, she sways her girly hips back and forth in a way that contrasts them to her slim waist quite attractively.  Protruding from her groin is a blue shaft with its head flanged by diminutive tentacles, and below that is a dark-blue pussy ringed by small feelers.  Further down are a pair of legs ending in flat sticky feet; proof of her aquatic heritage.  She smiles broadly and innocently as she regards you from her deep eyes.";
            // this.plural = false;
            this.createCock(7, 1, CockTypesEnum_1.CockTypesEnum.ANEMONE);
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLICK, appearanceDefs_1.VAGINA_LOOSENESS_LOOSE);
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusVCapacity, 5, 0, 0, 0);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("B"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_NORMAL;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 10, 0, 0, 0);
            this.tallness = 5 * 12 + 5;
            this.hipRating = appearanceDefs_1.HIP_RATING_CURVY;
            this.buttRating = appearanceDefs_1.BUTT_RATING_NOTICEABLE;
            this.skinTone = "purple";
            this.hairColor = "purplish-black";
            this.hairLength = 20;
            this.hairType = appearanceDefs_1.HAIR_ANEMONE;
            this.initStrTouSpeInte(40, 20, 40, 50);
            this.initLibSensCor(55, 35, 50);
            this.weaponName = "tendrils";
            this.weaponVerb = "tentacle";
            this.weaponAttack = 5;
            this.armorName = "clammy skin";
            this.bonusHP = 120;
            this.lust = 30;
            this.lustVuln = .9;
            this.temperment = Anemone.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 4;
            this.gems = Anemone.rand(5) + 1;
            this.drop = new WeightedDrop_1.WeightedDrop(this.consumables.DRYTENT, 1);
            this.checkMonster();
        }
    }
    exports.Anemone = Anemone;
});
//# sourceMappingURL=Anemone.js.map