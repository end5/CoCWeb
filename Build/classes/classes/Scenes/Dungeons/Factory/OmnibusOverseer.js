define(["require", "exports", "../../../Monster", "../../../StatusAffects", "../../../PerkLib", "../../../../../includes/appearanceDefs", "../../../Appearance", "../../../internals/WeightedDrop"], function (require, exports, Monster_1, StatusAffects_1, PerkLib_1, appearanceDefs_1, Appearance_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OmnibusOverseer extends Monster_1.Monster {
        defeated(hpVictory) {
            this.game.omnibusVictoryEvent();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nYour foe doesn't seem to care...");
                this.doNext(this.game.endLustLoss);
            }
            else {
                this.game.omnibusLossRape();
            }
        }
        lustAura() {
            this.outputText("The demoness blinks her eyes closed and knits her eyebrows in concentration.  The red orbs open wide and she smiles, licking her lips.   The air around her grows warmer, and muskier, as if her presence has saturated it with lust.");
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.LustAura) >= 0) {
                this.outputText("  Your eyes cross with unexpected feelings as the taste of desire in the air worms its way into you.  The intense aura quickly subsides, but it's already done its job.");
                this.game.dynStats("lus", (8 + Math.floor(this.player.lib / 20 + this.player.cor / 25)));
            }
            else {
                this.createStatusAffect(StatusAffects_1.StatusAffects.LustAura, 0, 0, 0, 0);
            }
            this.game.combatRoundOver();
        }
        milkAttack() {
            if (OmnibusOverseer.rand(2) == 0)
                this.outputText("The demoness grips her sizable breasts and squeezes, spraying milk at you.\n");
            else
                this.outputText("Your foe curls up to pinch her nipples, tugging hard and squirting milk towards you.\n");
            if ((this.player.spe > 50 && OmnibusOverseer.rand(4) == 0) || (this.player.findPerk(PerkLib_1.PerkLib.Evade) >= 0 && OmnibusOverseer.rand(3) == 0) || (this.player.findPerk(PerkLib_1.PerkLib.Misdirection) >= 0 && OmnibusOverseer.rand(4) == 0 && this.player.armorName == "red, high-society bodysuit")) {
                this.outputText("You sidestep the gushing fluids.");
            }
            //You didn't dodge
            else {
                if (OmnibusOverseer.rand(2) == 0) {
                    this.outputText("The milk splatters across your face and chest, soaking you with demonic cream.  Some managed to get into your mouth, and you swallow without thinking.  It makes you tingle with warmth.  ");
                }
                else {
                    this.outputText("The milk splashes into your " + this.player.armorName + ", soaking you effectively.  ");
                    if (this.player.cocks.length > 0) {
                        this.outputText("Your " + this.cockDescript(0) + " gets hard as the milk lubricates and stimulates it.  ");
                        this.game.dynStats("lus", 5);
                    }
                    if (this.player.vaginas.length > 0) {
                        this.outputText("You rub your thighs together as the milk slides between your pussy lips, stimulating you far more than it should.  ");
                        this.game.dynStats("lus", 5);
                    }
                }
                this.game.dynStats("lus", 7 + this.player.sens / 20);
                if (this.player.biggestLactation() > 1)
                    this.outputText("Milk dribbles from your " + this.allBreastsDescript() + " in sympathy.");
            }
            this.game.combatRoundOver();
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "Omnibus Overseer";
            this.imageName = "omnibusoverseer";
            this.long = "The 'woman' before you is clothed only in a single strip of fabric that wraps around her bountiful chest.  She has striking red eyes that contrast visibly with her blue skin and dark make-up.  Shiny black gloss encapsulates her kissable bubbly black lips.  Her most striking feature is her crotch, which appears neither male nor female.  She has a puffy wet vulva, but a cock-shaped protrusion sprouts from where a clit should be.";
            // this.plural = false;
            this.createCock(10, 1.5);
            this.balls = 0;
            this.ballSize = 0;
            this.cumMultiplier = 3;
            // this.hoursSinceCum = 0;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_DROOLING, appearanceDefs_1.VAGINA_LOOSENESS_NORMAL);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("DD"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_SLIME_DROOLING;
            this.tallness = OmnibusOverseer.rand(9) + 70;
            this.hipRating = appearanceDefs_1.HIP_RATING_AMPLE + 2;
            this.buttRating = appearanceDefs_1.BUTT_RATING_TIGHT;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS;
            this.skinTone = "light purple";
            this.hairColor = "purple";
            this.hairLength = 42;
            this.initStrTouSpeInte(65, 45, 45, 85);
            this.initLibSensCor(80, 70, 80);
            this.weaponName = "claws";
            this.weaponVerb = "claw";
            this.weaponAttack = 10;
            this.weaponPerk = "";
            this.weaponValue = 150;
            this.armorName = "demonic skin";
            this.armorDef = 15;
            this.bonusHP = 200;
            this.lust = 20;
            this.lustVuln = 0.75;
            this.temperment = OmnibusOverseer.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 8;
            this.gems = OmnibusOverseer.rand(25) + 10;
            this.drop = new WeightedDrop_1.WeightedDrop(undefined, 1);
            this.special1 = this.lustAura;
            this.special2 = this.milkAttack;
            this.wingType = appearanceDefs_1.WING_TYPE_BAT_LIKE_TINY;
            this.wingDesc = "tiny hidden";
            this.tailType = appearanceDefs_1.TAIL_TYPE_DEMONIC;
            this.checkMonster();
        }
    }
    exports.OmnibusOverseer = OmnibusOverseer;
});
//# sourceMappingURL=OmnibusOverseer.js.map