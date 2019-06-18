define(["require", "exports", "../../Monsters/AbstractSuccubus", "../../../StatusAffects", "../../../Appearance", "../../../internals/WeightedDrop", "../../../../../includes/appearanceDefs"], function (require, exports, AbstractSuccubus_1, StatusAffects_1, Appearance_1, WeightedDrop_1, appearanceDefs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SecretarialSuccubus extends AbstractSuccubus_1.AbstractSuccubus {
        defeated(hpVictory) {
            if (this.player.gender > 0) {
                var dildo = (this.player.hasKeyItem("Deluxe Dildo") >= 0 ? this.game.succubusGetsDildoed : undefined);
                if (hpVictory) {
                    this.outputText("You smile in satisfaction as the " + this.short + " collapses, unable to continue fighting.  Now would be the perfect opportunity to taste the fruits of her sex-ready form...\n\nDo you rape her?", true);
                    this.game.dynStats("lus", 1);
                    this.game.simpleChoices("Yes", this.game.succubusVictoryRape, "Dildo Rape", dildo, "", undefined, "", undefined, "No", this.game.cleanupAfterCombat);
                }
                else if (this.player.lust >= 33) {
                    this.outputText("You smile in satisfaction as the " + this.short + " gives up on fighting you and starts masturbating, begging for you to fuck her.  Now would be the perfect opportunity to taste the fruits of her sex-ready form...\n\nDo you fuck her?", true);
                    this.game.dynStats("lus", 1);
                    this.game.simpleChoices("Yes", this.game.succubusVictoryRape, "Dildo Rape", dildo, "", undefined, "", undefined, "No", this.game.cleanupAfterCombat);
                }
                else {
                    this.game.finishCombat();
                }
            }
            else {
                this.game.finishCombat();
            }
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nYour foe doesn't seem to care...");
                this.doNext(this.game.endLustLoss);
            }
            else {
                this.game.succubusLossRape();
            }
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "secretarial succubus";
            this.imageName = "secretarialsuccubus";
            this.long = "The succubus across from you balances gracefully on her spiked heels, twirling and moving unpredictably.  Sexy dark stockings hug every curve of her perfectly shaped flesh until they disappear into her tiny miniskirt.  Her impressive breasts wobble delightfully as she moves, despite the inadequate efforts of her straining vest.  A pair of foot-long horns curve up from her otherwise perfect face and forehead, wreathed in lustrous blonde hair.  The very air around her is filled with an unidentifiable fragrance that makes you tingle and shiver.";
            // this.plural = false;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLAVERING, appearanceDefs_1.VAGINA_LOOSENESS_NORMAL);
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusVCapacity, 30, 0, 0, 0);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("DD"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_STRETCHED;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_SLIME_DROOLING;
            this.tallness = SecretarialSuccubus.rand(9) + 60;
            this.hipRating = appearanceDefs_1.HIP_RATING_CURVY;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE + 1;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS;
            this.skinTone = "blue";
            this.hairColor = "blond";
            this.hairLength = 13;
            this.initStrTouSpeInte(50, 40, 75, 35);
            this.initLibSensCor(80, 70, 80);
            this.weaponName = "claws";
            this.weaponVerb = "slap";
            this.weaponAttack = 10;
            this.weaponPerk = "";
            this.weaponValue = 150;
            this.armorName = "demonic skin";
            this.armorDef = 4;
            this.bonusHP = 100;
            this.lust = 30;
            this.temperment = SecretarialSuccubus.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 7;
            this.gems = SecretarialSuccubus.rand(25) + 10;
            this.additionalXP = 50;
            this.drop = new WeightedDrop_1.WeightedDrop(this.consumables.LACTAID, 1);
            this.wingType = appearanceDefs_1.WING_TYPE_BAT_LIKE_TINY;
            this.wingDesc = "tiny hidden";
            this.tailType = appearanceDefs_1.TAIL_TYPE_DEMONIC;
            this.special1 = this.kissAttack;
            this.special2 = this.seduceAttack;
            this.special3 = this.whipAttack;
            this.checkMonster();
        }
    }
    exports.SecretarialSuccubus = SecretarialSuccubus;
});
//# sourceMappingURL=SecretarialSuccubus.js.map