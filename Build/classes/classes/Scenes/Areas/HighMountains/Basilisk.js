define(["require", "exports", "../../../Monster", "../../../StatusAffects", "../../../../../includes/appearanceDefs", "../../../internals/ChainedDrop"], function (require, exports, Monster_1, StatusAffects_1, appearanceDefs_1, ChainedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ...
     * @author ...
     */
    class Basilisk extends Monster_1.Monster {
        static basiliskSpeed(player, amount = 0) {
            if (player.spe - amount < 1) {
                amount = player.spe - 1;
                if (amount < 0)
                    amount = 0;
            }
            player.spe -= amount;
            if (player.findStatusAffect(StatusAffects_1.StatusAffects.BasiliskSlow) >= 0)
                player.addStatusValue(StatusAffects_1.StatusAffects.BasiliskSlow, 1, amount);
            else
                player.createStatusAffect(StatusAffects_1.StatusAffects.BasiliskSlow, amount, 0, 0, 0);
            Basilisk.showStatDown('spe');
            // speUp.visible = false;
            // speDown.visible = true;
        }
        //special 1: basilisk mental compulsion attack
        //(Check vs. Intelligence/Sensitivity, loss = recurrent speed loss each
        //round, one time lust increase):
        compulsion() {
            this.outputText("The basilisk opens its mouth and, staring at you, utters words in its strange, dry, sibilant tongue.  The sounds bore into your mind, working and buzzing at the edges of your resolve, suggesting, compelling, then demanding you look into the basilisk's eyes.  ", false);
            //Success:
            if (this.player.inte / 5 + Basilisk.rand(20) < 24) {
                this.outputText("You can't help yourself... you glimpse the reptile's grey, slit eyes. You look away quickly, but you can picture them in your mind's eye, staring in at your thoughts, making you feel sluggish and unable to coordinate. Something about the helplessness of it feels so good... you can't banish the feeling that really, you want to look in the basilisk's eyes forever, for it to have total control over you.", false);
                this.game.dynStats("lus", 3);
                //apply status here
                Basilisk.basiliskSpeed(this.player, 20);
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.BasiliskCompulsion, 0, 0, 0, 0);
            }
            //Failure:
            else {
                this.outputText("You concentrate, focus your mind and resist the basilisk's psychic compulsion.", false);
            }
            this.game.combatRoundOver();
        }
        //Special 3: basilisk tail swipe (Small physical damage):
        basiliskTailSwipe() {
            var damage = Math.floor((this.str + 20) - Math.random() * (this.player.tou + this.player.armorDef));
            damage = this.player.takeDamage(damage);
            this.outputText("The basilisk suddenly whips its tail at you, swiping your " + this.player.feet() + " from under you!  You quickly stagger upright, being sure to hold the creature's feet in your vision. (" + damage + ")", false);
            if (damage == 0)
                this.outputText("  The fall didn't harm you at all.", false);
            this.game.combatRoundOver();
        }
        //basilisk physical attack: With lightning speed, the basilisk slashes you with its index claws!
        //Noun: claw
        performCombatAction() {
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.BasiliskCompulsion) < 0 && Basilisk.rand(3) == 0 && this.findStatusAffect(StatusAffects_1.StatusAffects.Blind) < 0)
                this.compulsion();
            else if (Basilisk.rand(3) == 0)
                this.basiliskTailSwipe();
            else
                this.eAttack();
        }
        defeated(hpVictory) {
            this.game.highMountains.basiliskScene.defeatBasilisk();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nThe basilisk smirks, but waits for you to finish...");
                this.doNext(this.game.endLustLoss);
            }
            else {
                this.game.highMountains.basiliskScene.loseToBasilisk();
            }
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "basilisk";
            this.imageName = "basilisk";
            this.long = "You are fighting a basilisk!  From what you can tell while not looking directly at it, the basilisk is a male reptilian biped standing a bit over 6' tall.  It has a thin but ropy build, its tightly muscled yellow underbelly the only part of its frame not covered in those deceptive, camouflaging grey-green scales.  A long, whip-like tail flits restlessly through the dirt behind its skinny legs, and sharp sickle-shaped index claws decorate each hand and foot.  You don't dare to look at its face, but you have the impression of a cruel jaw, a blunt lizard snout and a crown of dull spines.";
            // this.plural = false;
            this.createCock(6, 2);
            this.balls = 2;
            this.ballSize = 2;
            this.createBreastRow(0);
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 30, 0, 0, 0);
            this.tallness = 6 * 12 + 2;
            this.hipRating = appearanceDefs_1.HIP_RATING_SLENDER + 1;
            this.buttRating = appearanceDefs_1.BUTT_RATING_AVERAGE;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_LIZARD;
            this.skinTone = "gray";
            this.skinType = appearanceDefs_1.SKIN_TYPE_SCALES;
            //this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_SCALES];
            this.hairColor = "none";
            this.hairLength = 0;
            this.initStrTouSpeInte(85, 70, 35, 70);
            this.initLibSensCor(50, 35, 60);
            this.weaponName = "claws";
            this.weaponVerb = "claw";
            this.weaponAttack = 30;
            this.armorName = "scales";
            this.armorDef = 10;
            this.armorPerk = "";
            this.armorValue = 70;
            this.bonusHP = 200;
            this.lust = 30;
            this.lustVuln = .5;
            this.temperment = Basilisk.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 12;
            this.gems = Basilisk.rand(10) + 10;
            this.drop = new ChainedDrop_1.ChainedDrop().add(this.consumables.REPTLUM, 0.9);
            this.tailType = appearanceDefs_1.TAIL_TYPE_COW;
            this.tailRecharge = 0;
            this.checkMonster();
        }
    }
    exports.Basilisk = Basilisk;
});
//# sourceMappingURL=Basilisk.js.map