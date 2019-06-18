define(["require", "exports", "../../../Monster", "../../../../../includes/appearanceDefs", "../../../Appearance"], function (require, exports, Monster_1, appearanceDefs_1, Appearance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PhoenixPlatoon extends Monster_1.Monster {
        performCombatAction() {
            this.game.phoenixPlatoonAI();
        }
        defeated(hpVictory) {
            this.game.phoenixPlatoonLosesToPC();
        }
        won(hpVictory, pcCameWorms) {
            this.game.phoenixPlatoonMurdersPC();
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "phoenix platoon";
            this.imageName = "phoenixmob";
            this.long = "You are faced with a platoon of heavy infantry, all armed to the teeth and protected by chain vests and shields. They look like a cross between salamander and harpy, humanoid save for crimson wings, scaled feet, and long fiery tails. They stand in a tight-knit shield wall, each phoenix protecting herself and the warrior next to her with their tower-shield. Their scimitars cut great swaths through the room as they slowly advance upon you.";
            this.plural = true;
            this.pronoun1 = "they";
            this.pronoun2 = "them";
            this.pronoun3 = "their";
            this.createCock();
            this.balls = 2;
            this.ballSize = 1;
            this.cumMultiplier = 3;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLAVERING, appearanceDefs_1.VAGINA_LOOSENESS_LOOSE);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("D"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_STRETCHED;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.tallness = PhoenixPlatoon.rand(8) + 70;
            this.hipRating = appearanceDefs_1.HIP_RATING_AMPLE + 2;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_LIZARD;
            this.skinTone = "red";
            this.hairColor = "black";
            this.hairLength = 15;
            this.initStrTouSpeInte(70, 60, 120, 40);
            this.initLibSensCor(40, 45, 50);
            this.weaponName = "spears";
            this.weaponVerb = "stab";
            this.weaponAttack = 20;
            this.armorName = "armor";
            this.armorDef = 20;
            this.bonusHP = 1000;
            this.lust = 20;
            this.lustVuln = .15;
            this.temperment = PhoenixPlatoon.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 20;
            this.gems = PhoenixPlatoon.rand(25) + 160;
            this.additionalXP = 50;
            this.hornType = appearanceDefs_1.HORNS_DRACONIC_X2;
            this.horns = 2;
            this.tailType = appearanceDefs_1.TAIL_TYPE_HARPY;
            this.wingType = appearanceDefs_1.WING_TYPE_FEATHERED_LARGE;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
    }
    exports.PhoenixPlatoon = PhoenixPlatoon;
});
//# sourceMappingURL=PhoenixPlatoon.js.map