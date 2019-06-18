define(["require", "exports", "../../Monster", "../../PerkLib", "../../../../includes/appearanceDefs", "../../StatusAffects", "../../Appearance", "../../internals/ChainedDrop", "../../GlobalFlags/kGAMECLASS"], function (require, exports, Monster_1, PerkLib_1, appearanceDefs_1, StatusAffects_1, Appearance_1, ChainedDrop_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ...
     * @author ...
     */
    class Shouldra extends Monster_1.Monster {
        shouldrattack() {
            var damage = 0;
            //return to combat menu when finished
            this.doNext(this.game.playerMenu);
            //Determine if dodged!
            if (this.player.spe - this.spe > 0 && Math.floor(Math.random() * (((this.player.spe - this.spe) / 4) + 80)) > 80) {
                this.outputText("The girl wades in for a swing, but you deftly dodge to the side. She recovers quickly, spinning back at you.", false);
                return;
            }
            //("Misdirection"
            if (this.player.findPerk(PerkLib_1.PerkLib.Misdirection) >= 0 && Shouldra.rand(100) < 10 && this.player.armorName == "red, high-society bodysuit") {
                this.outputText("The girl wades in for a swing, but you deftly misdirect her and avoid the attack. She recovers quickly, spinning back at you.", false);
                return;
            }
            //Determine if cat'ed
            if (this.player.findPerk(PerkLib_1.PerkLib.Flexibility) >= 0 && Shouldra.rand(100) < 6) {
                this.outputText("The girl wades in for a swing, but you deftly twist your flexible body out of the way. She recovers quickly, spinning back at you.", false);
                return;
            }
            //Determine damage - str modified by enemy toughness!
            damage = Math.floor((this.str + this.weaponAttack) - Shouldra.rand(this.player.tou) - this.player.armorDef);
            if (damage > 0)
                damage = this.player.takeDamage(damage);
            if (damage <= 0) {
                damage = 0;
                //Due to toughness or amor...
                if (Shouldra.rand(this.player.armorDef + this.player.tou) < this.player.armorDef)
                    this.outputText("You absorb and deflect every " + this.weaponVerb + " with your " + this.player.armorName + ".", false);
                else
                    this.outputText("You deflect and block every " + this.weaponVerb + " " + this.a + this.short + " throws at you.", false);
            }
            //everyone else
            else {
                var choice = Shouldra.rand(3);
                //(regular attack 1)
                if (choice == 0)
                    this.outputText("Ducking in close, the girl thunders a punch against your midsection, leaving a painful sting.", false);
                //(regular attack 2)
                else if (choice == 1)
                    this.outputText("The girl feints a charge, leans back, and snaps a kick against your " + kGAMECLASS_1.kGAMECLASS.hipDescript() + ". You stagger, correct your posture, and plunge back into combat.", false);
                //(regular attack 3)
                else if (choice == 2)
                    this.outputText("You momentarily drop your guard as the girl appears to stumble. She rights herself as you step forward and lands a one-two combination against your torso.", false);
                this.outputText(" (" + damage + ")", false);
            }
            if (damage > 0) {
                if (this.lustVuln > 0 && this.player.armorName == "barely-decent bondage straps") {
                    this.outputText("\n" + this.capitalA + this.short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.", false);
                    this.lust += 5 * this.lustVuln;
                }
            }
            this.statScreenRefresh();
            this.outputText("\n", false);
            this.combatRoundOver();
        }
        //(lust attack 1)
        shouldraLustAttack() {
            if (Shouldra.rand(2) == 0)
                this.outputText("The girl spins away from one of your swings, her tunic flaring around her hips. The motion gives you a good view of her firm and moderately large butt. She notices your glance and gives you a little wink.\n", false);
            else
                this.outputText("The girl's feet get tangled on each other and she tumbles to the ground. Before you can capitalize on her slip, she rolls with the impact and comes up smoothly. As she rises, however, you reel back and raise an eyebrow in confusion; are her breasts FILLING the normally-loose tunic? She notices your gaze and smiles, performing a small pirouette on her heel before squaring up to you again. Your confusion only heightens when her torso comes back into view, her breasts back to their normal proportions. A trick of the light, perhaps? You shake your head and try to fall into the rhythm of the fight.\n", false);
            this.game.dynStats("lus", (8 + this.player.lib / 10));
            this.combatRoundOver();
        }
        //(magic attack)
        shouldraMagicLazers() {
            var damage = this.player.takeDamage(20 + Shouldra.rand(10));
            this.outputText("Falling back a step, the girl raises a hand and casts a small spell. From her fingertips shoot four magic missiles that slam against your skin and cause a surprising amount of discomfort. (" + damage + ")\n", false);
            this.combatRoundOver();
        }
        performCombatAction() {
            var attack = Shouldra.rand(3);
            if (attack == 0)
                this.shouldrattack();
            else if (attack == 1)
                this.shouldraLustAttack();
            else
                this.shouldraMagicLazers();
        }
        defeated(hpVictory) {
            this.game.shouldraScene.defeatDannyPhantom();
        }
        won(hpVictory, pcCameWorms) {
            this.game.shouldraScene.loseToShouldra();
        }
        constructor() {
            super();
            this.a = "the ";
            this.short = "plain girl";
            this.imageName = "shouldra";
            this.long = "Her face has nothing overly attractive about it; a splash of freckles flits across her cheeks, her brows are too strong to be considered feminine, and her jaw is a tad bit square. Regardless, the features come together to make an aesthetically pleasing countenance, framed by a stylish brown-haired bob. Her breasts are obscured by her grey, loose-fitting tunic, flowing down to reach the middle of her thigh. Her legs are clad in snug, form-fitting leather breeches, and a comfortable pair of leather shoes shield her soles from the potentially harmful environment around her.";
            // this.plural = false;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_WET, appearanceDefs_1.VAGINA_LOOSENESS_NORMAL);
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusVCapacity, 40, 0, 0, 0);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("D"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 40, 0, 0, 0);
            this.tallness = 65;
            this.hipRating = appearanceDefs_1.HIP_RATING_AMPLE;
            this.buttRating = appearanceDefs_1.BUTT_RATING_AVERAGE + 1;
            this.skinTone = "white";
            this.hairColor = "white";
            this.hairLength = 3;
            this.initStrTouSpeInte(45, 30, 5, 110);
            this.initLibSensCor(100, 0, 33);
            this.weaponName = "fists";
            this.weaponVerb = "punches";
            this.armorName = "comfortable clothes";
            this.bonusHP = 30;
            this.lust = 10;
            this.temperment = Shouldra.TEMPERMENT_LUSTY_GRAPPLES;
            this.level = 4;
            this.gems = 0;
            this.drop = new ChainedDrop_1.ChainedDrop().add(this.consumables.ECTOPLS, 1 / 3);
            this.checkMonster();
        }
    }
    exports.Shouldra = Shouldra;
});
//# sourceMappingURL=Shouldra.js.map