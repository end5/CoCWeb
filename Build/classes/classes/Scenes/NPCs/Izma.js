define(["require", "exports", "../../Monster", "../../StatusAffects", "../../PerkLib", "../../../../includes/appearanceDefs", "../../Appearance"], function (require, exports, Monster_1, StatusAffects_1, PerkLib_1, appearanceDefs_1, Appearance_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ...
     * @author ...
     */
    class Izma extends Monster_1.Monster {
        //[Special Attacks]
        IzmaSpecials1() {
            //Blind dodge change
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Blind) >= 0 && Izma.rand(3) < 2) {
                this.outputText("Izma attempts to close the distance with you, but misses completely because of her blindness.\n", false);
                return;
            }
            //Determine if dodged!
            if (this.player.spe - this.spe > 0 && Math.floor(Math.random() * (((this.player.spe - this.spe) / 4) + 80)) > 80) {
                this.outputText("Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n", false);
                return;
            }
            //Determine if evaded
            if (this.player.findPerk(PerkLib_1.PerkLib.Evade) >= 0 && Izma.rand(100) < 10) {
                this.outputText("Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n", false);
                return;
            }
            //("Misdirection"
            if (this.player.findPerk(PerkLib_1.PerkLib.Misdirection) >= 0 && Izma.rand(100) < 10 && this.player.armorName == "red, high-society bodysuit") {
                this.outputText("Izma attempts to get close, but you put Raphael's teachings to use and side-step the sharkgirl, confusing her with your movements.\n", false);
                return;
            }
            //Determine if cat'ed
            if (this.player.findPerk(PerkLib_1.PerkLib.Flexibility) >= 0 && Izma.rand(100) < 6) {
                this.outputText("Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n", false);
                return;
            }
            this.outputText("Izma rushes you with impressive speed, striking a few precise locations on your joints with her fingertips before leaping back.  It doesn't hurt, but you feel tired and sore. \"<i>Pressure points...</i>\" she laughs, seeing your confused expression.", false);
            //(Fatigue damage)
            this.game.fatigue(20 + Izma.rand(20));
        }
        IzmaSpecials2() {
            //Blind dodge change
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Blind) >= 0 && Izma.rand(3) < 2) {
                this.outputText("Izma blindly tries to clinch you, but misses completely.\n", false);
                return;
            }
            //Determine if dodged!
            if (this.player.spe - this.spe > 0 && Math.floor(Math.random() * (((this.player.spe - this.spe) / 4) + 80)) > 80) {
                this.outputText("Izma tries to clinch you, but you use your speed to keep just out of reach.\n", false);
                return;
            }
            //Determine if evaded
            if (this.player.findPerk(PerkLib_1.PerkLib.Evade) >= 0 && Izma.rand(100) < 10) {
                this.outputText("Izma tries to clinch you, but she didn't count on your skills in evasion.  You manage to sidestep her at the last second.\n", false);
                return;
            }
            //("Misdirection"
            if (this.player.findPerk(PerkLib_1.PerkLib.Misdirection) >= 0 && Izma.rand(100) < 10 && this.player.armorName == "red, high-society bodysuit") {
                this.outputText("Izma ducks and weaves forward to clinch you, but thanks to Raphael's teachings, you're easily able to misguide her and avoid the clumsy grab.\n", false);
                return;
            }
            //Determine if cat'ed
            if (this.player.findPerk(PerkLib_1.PerkLib.Flexibility) >= 0 && Izma.rand(100) < 6) {
                this.outputText("Izma tries to lock you in a clinch, but your cat-like flexibility makes it easy to twist away from her grab.\n", false);
                return;
            }
            var damage = 0;
            damage = Math.round(130 - Izma.rand(this.player.tou + this.player.armorDef));
            if (damage < 0)
                damage = 0;
            this.outputText("Izma ducks and jinks, working to close quarters, and clinches you. Unable to get your weapon into play, you can only ", false);
            if (this.player.armorDef >= 10 || damage == 0) {
                //(armor-dependent Health damage, fullplate, chain, scale, and bee chitin armor are unaffected, has a chance to inflict 'Bleed' damage which removes 2-5% of health for the next three turns if successful)
                damage = this.player.takeDamage(damage);
                this.outputText("writhe as she painfully drags the blades of her glove down your back", false);
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.IzmaBleed, 3, 0, 0, 0);
            }
            else
                this.outputText("laugh as her blades scape uselessly at your armor-clad back", false);
            this.outputText(" before breaking her embrace and leaping away. (" + damage + ")", false);
        }
        IzmaSpecials3() {
            this.outputText("Rather than move to attack you, Izma grins at you and grabs her breasts, massaging them as she caresses her long penis with one knee. Her tail thrashes and thumps the sand heavily behind her as she simulates an orgasm, moaning loudly into the air. The whole display leaves you more aroused than before.", false);
            //(lust gain)
            this.game.dynStats("lus", (20 + this.player.lib / 5));
        }
        IzmaAI() {
            var choice = Izma.rand(5);
            if (choice <= 1)
                this.eAttack();
            if (choice == 2) {
                if (this.player.fatigue >= 80)
                    choice = 3;
                else
                    this.IzmaSpecials1();
            }
            if (choice == 3) {
                if (this.player.armorDef >= 10 && Izma.rand(3) == 0)
                    this.IzmaSpecials2();
                else
                    choice = 4;
            }
            if (choice == 4)
                this.IzmaSpecials3();
            this.combatRoundOver();
        }
        eAttack() {
            this.outputText("Izma slides up to you, throws a feint, and then launches a rain of jabs at you!\n", false);
            super.eAttack();
        }
        performCombatAction() {
            var choice = Izma.rand(5);
            if (choice <= 1)
                this.eAttack();
            if (choice == 2) {
                if (this.player.fatigue >= 80)
                    choice = 3;
                else
                    this.IzmaSpecials1();
            }
            if (choice == 3) {
                if (this.player.armorDef >= 10 && Izma.rand(3) == 0)
                    this.IzmaSpecials2();
                else
                    choice = 4;
            }
            if (choice == 4)
                this.IzmaSpecials3();
            this.combatRoundOver();
        }
        defeated(hpVictory) {
            this.game.izmaScene.defeatIzma();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\n\"<i>Gross!</i>\" Izma cries as she backs away, leaving you to recover alone.");
                this.game.cleanupAfterCombat();
            }
            else {
                this.game.izmaScene.IzmaWins();
            }
        }
        constructor() {
            super();
            this.a = "";
            this.short = "Izma";
            this.imageName = "izma";
            this.long = "Izma the tigershark stands a bit over 6' tall, with orange skin bearing horizontal stripes covering most of her body.  Her silver-white hair cascades past her shoulders, draping over an impressive pair of DD-cup breasts barely restrained by a skimpy black bikini top.  Under the knee-length grass skirt below them rustles her beastly fifteen-inch penis and four-balled sack; you catch occasional glimpses of them as she moves.  She's tucked her usual reading glasses into her locker at the moment.";
            // this.plural = false;
            this.createCock(15, 2.2);
            this.balls = 4;
            this.ballSize = 3;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLICK, appearanceDefs_1.VAGINA_LOOSENESS_LOOSE);
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusVCapacity, 45, 0, 0, 0);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("DD"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_NORMAL;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 30, 0, 0, 0);
            this.tallness = 5 * 12 + 5;
            this.hipRating = appearanceDefs_1.HIP_RATING_CURVY;
            this.buttRating = appearanceDefs_1.BUTT_RATING_NOTICEABLE;
            this.skinTone = "striped orange";
            this.hairColor = "silver";
            this.hairLength = 20;
            this.initStrTouSpeInte(80, 90, 85, 65);
            this.initLibSensCor(75, 25, 40);
            this.weaponName = "clawed gauntlets";
            this.weaponVerb = "clawed punches";
            this.weaponAttack = 45;
            this.armorName = "bikini and grass skirt";
            this.armorDef = 8;
            this.bonusHP = 330;
            this.lust = 20;
            this.lustVuln = .20;
            this.temperment = Izma.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 15;
            this.gems = Izma.rand(5) + 1;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
    }
    exports.Izma = Izma;
});
//# sourceMappingURL=Izma.js.map