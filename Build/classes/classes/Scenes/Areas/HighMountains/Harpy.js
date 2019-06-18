define(["require", "exports", "../../../Monster", "../../../StatusAffects", "../../../GlobalFlags/kFLAGS", "../../../../console", "../../../../../includes/appearanceDefs", "../../../Appearance", "../../../internals/ChainedDrop"], function (require, exports, Monster_1, StatusAffects_1, kFLAGS_1, console_1, appearanceDefs_1, Appearance_1, ChainedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Harpy extends Monster_1.Monster {
        //*Note, special attack one is an idea based on Ceraph.
        //About the attack that raises your Lust to 100 if you 
        //don't "wait" when she unleashes it. Alright, I 
        //basically used the idea, sorry. But it's a neat idea
        //so it should be fitting, right? Or you could just 
        //dump it out altogether. It'd cause severe damage, 
        //in the 150 region if you don't wise up.*
        harpyUberCharge() {
            //(Harpy special attack 1, part one)
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Uber) < 0) {
                this.createStatusAffect(StatusAffects_1.StatusAffects.Uber, 0, 0, 0, 0);
                this.outputText("Flapping her wings frantically, she flies away from you and gains height, hanging in the light before you.  She lets out a shrill and terrifying cry, narrowing her eyes as she focuses in on you!", false);
            }
            //(Harpy special attack 1, part two if PC does anything but "Wait")
            else {
                if (this.flags[kFLAGS_1.kFLAGS.IN_COMBAT_USE_PLAYER_WAITED_FLAG] == 0) {
                    var damage = 160 + Harpy.rand(20);
                    damage = this.player.takeDamage(damage);
                    this.outputText("The harpy lets out a terrible cry and drops, reaching an almost impossible speed as she dives down at you.  Her eyes are narrowed like a true bird of prey.  You were too busy with your own attack to avoid it!  Her claws surge down and pierce your " + this.player.armorName + " like paper, driving hard into the flesh beneath and making you cry out in pain.  The harpy dumps you onto the ground, your wounds bleeding profusely. (" + damage + ")", false);
                    this.removeStatusAffect(StatusAffects_1.StatusAffects.Uber);
                }
                else {
                    this.outputText("You stand firm and ready yourself as the crazed harpy hovers above you. Letting out an ear-splitting cry she dives at you with her claws extended, reaching an incredible speed before she levels out.  The harpy is heading right for you!  Thanks to your ready position, you manage to dive aside just as the harpy reaches you.  She clips you slightly, spinning you as you dive for the ground.  You hit the ground hard, but look up in time to see her make a rough, graceless landing.  Her body rolls until it reached a standstill.  The enraged harpy drags herself up and takes flight once more!", false);
                    this.player.takeDamage(10 + Harpy.rand(10));
                    this.removeStatusAffect(StatusAffects_1.StatusAffects.Uber);
                    this.HP -= 20;
                }
            }
            this.combatRoundOver();
        }
        //(Harpy special attack 2, lust increase)
        harpyTease() {
            this.outputText("The harpy charges at you carelessly, her body striking you with the full weight of her motherly hips.  The pair of you go crashing backwards onto the ground.  You grapple with her weighty ass, trying your best not to think dirty thoughts, but the way she's maniacally flapping and writhing her curvy body against you makes it impossible! After a brief, groping wrestle on the ground, she pushes you away and takes flight again.", false);
            this.game.dynStats("lus", (12 + Harpy.rand(this.player.sens / 5)));
            this.combatRoundOver();
        }
        performCombatAction() {
            // var select: number = 1;
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Uber) >= 0) {
                this.harpyUberCharge();
                return;
            }
            super.performCombatAction();
        }
        defeated(hpVictory) {
            this.game.highMountains.harpyScene.harpyVictoryuuuuu();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nYour foe doesn't seem disgusted enough to leave...");
                this.doNext(this.game.endLustLoss);
            }
            else {
                this.game.highMountains.harpyScene.harpyLossU();
            }
        }
        outputPlayerDodged(dodge) {
            this.outputText("With another deranged cry the harpy dives at you, swinging her razor-sharp talons through the air with the grace of a ballerina. Your quick reflexes allow you to dodge every vicious slash she makes at you.\n", false);
        }
        outputAttack(damage) {
            if (damage <= 0) {
                this.outputText("The harpy dives at you with her foot-talons, but you deflect the attack, grasp onto her leg, and swing her through the air, tossing her away from you before she has a chance to right herself.", false);
            }
            else {
                this.outputText("The harpy surges forward, bringing her razor-sharp claws down on you, tearing at all the exposed flesh she can reach! (" + damage + ")", false);
            }
        }
        constructor(noInit = false) {
            super();
            if (noInit)
                return;
            console_1.trace("Harpy Constructor!");
            this.a = "the ";
            this.short = "harpy";
            this.imageName = "harpy";
            this.long = "You are fighting a tall, deranged harpy. She appears very human, about six feet six inches tall but covered in a fine layer of powder-blue down. Her arms are sinewy and muscular, with a long web connecting them to her ample hips, covered in stringy blue feathers to aid her flight. A larger pair of powdery-blue wings also protrudes from her shoulder blades, flapping idly. She appears quite deranged as she circles you, approaching and backing away erratically. Her face is quite beautiful, with fine lilac makeup adorning the features of a handsome woman, and her lips are traced with rich golden lipstick. As she circles you, squawking frantically and trying to intimidate you, your eyes are drawn to her slender torso and small, pert breasts, each the size of a small fruit and covered in a layer of the softest feathers which ripple and move with the gusts from her wings. As astounding as her breasts are, her egg-bearing hips are even more impressive.  They're twice as wide as her torso, with enormous, jiggling buttocks where her huge, meaty thighs are coming up to meet them. Her legs end in three-pronged talons; their shadowy black curves glinting evilly in the light.";
            // this.plural = false;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLICK, appearanceDefs_1.VAGINA_LOOSENESS_GAPING_WIDE);
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusVCapacity, 40, 0, 0, 0);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("B"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 20, 0, 0, 0);
            this.tallness = 6 * 12 + 6;
            this.hipRating = appearanceDefs_1.HIP_RATING_INHUMANLY_WIDE;
            this.buttRating = appearanceDefs_1.BUTT_RATING_EXPANSIVE;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_HARPY;
            this.skinTone = "pink";
            this.skinType = appearanceDefs_1.SKIN_TYPE_PLAIN;
            this.skinDesc = "feathers";
            this.hairColor = "blue";
            this.hairLength = 16;
            this.initStrTouSpeInte(60, 40, 90, 40);
            this.initLibSensCor(70, 30, 80);
            this.weaponName = "talons";
            this.weaponVerb = "slashing talons";
            this.weaponAttack = 15;
            this.armorName = "feathers";
            this.armorDef = 5;
            this.bonusHP = 150;
            this.lust = 10;
            this.lustVuln = .7;
            this.temperment = Harpy.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 10;
            this.gems = 10 + Harpy.rand(4);
            this.drop = new ChainedDrop_1.ChainedDrop().add(this.armors.W_ROBES, 1 / 10)
                .elseDrop(this.consumables.GLDSEED);
            this.wingType = appearanceDefs_1.WING_TYPE_HARPY;
            this.special1 = this.harpyUberCharge;
            this.special2 = this.harpyTease;
            this.checkMonster();
        }
    }
    exports.Harpy = Harpy;
});
//# sourceMappingURL=Harpy.js.map