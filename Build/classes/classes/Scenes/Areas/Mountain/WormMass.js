define(["require", "exports", "../../../Monster", "../../../../console", "../../../../../includes/appearanceDefs"], function (require, exports, Monster_1, console_1, appearanceDefs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WormMass extends Monster_1.Monster {
        performCombatAction() {
            //Worms have different AI
            if (WormMass.rand(2) == 0)
                this.special1();
            else
                this.special2();
        }
        won(hpVictory, pcCameWorms) {
            this.outputText("Overcome by your " + (hpVictory ? "wounds" : "lust") + ", you sink to your knees as the colony of worms swarms all over your body...\n\n", true);
            this.game.infest1();
        }
        eMaxHP() {
            return 40;
        }
        constructor() {
            super();
            console_1.trace("WormMass Constructor!");
            this.a = "the ";
            this.short = "worms";
            this.imageName = "worms";
            this.long = "Before you stands the horrid mass of worms. It has shifted itself and now takes the shape of a humanoid composed completely of the worms in the colony. Its vaguely human shape lumbers towards you in a clearly aggressive manner.";
            this.plural = true;
            this.initGenderless();
            this.pronoun1 = "they";
            this.pronoun2 = "them";
            this.pronoun3 = "their";
            this.createBreastRow(0, 0);
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_VIRGIN;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.tallness = 1;
            this.hipRating = appearanceDefs_1.HIP_RATING_SLENDER;
            this.buttRating = appearanceDefs_1.BUTT_RATING_BUTTLESS;
            this.skinTone = "white";
            this.initStrTouSpeInte(35, 5, 10, 1);
            this.initLibSensCor(90, 60, 90);
            this.weaponName = "worm";
            this.weaponVerb = "slap";
            this.armorName = "skin";
            this.lust = 30;
            this.lustVuln = 0;
            this.temperment = WormMass.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 3;
            this.gems = 0;
            this.special1 = this.game.wormAttack;
            this.special2 = this.game.wormsEntice;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
    }
    exports.WormMass = WormMass;
});
//# sourceMappingURL=WormMass.js.map