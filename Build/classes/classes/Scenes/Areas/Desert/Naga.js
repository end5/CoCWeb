define(["require", "exports", "../../../Monster", "../../../StatusAffects", "../../../PerkLib", "../../../../console", "../../../../../includes/appearanceDefs", "../../../Appearance", "../../../internals/WeightedDrop"], function (require, exports, Monster_1, StatusAffects_1, PerkLib_1, console_1, appearanceDefs_1, Appearance_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Naga extends Monster_1.Monster {
        //2a)  Ability -  Poison Bite - poisons player
        nagaPoisonBiteAttack() {
            //(Deals damage over 4-5 turns, invariably reducing 
            //your speed. It wears off once combat is over.)
            this.outputText("The naga strikes with the speed of a cobra, sinking her fangs into your flesh!  ", false);
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.NagaVenom) < 0) {
                this.outputText("The venom's effects are almost instantaneous; your vision begins to blur and it becomes increasingly harder to stand.", false);
                if (this.player.spe > 4) {
                    //stats(0,0,-3,0,0,0,0,0);
                    this.player.spe -= 3;
                    Naga.showStatDown('spe');
                    // speUp.visible = false;
                    // speDown.visible = true;
                    this.player.createStatusAffect(StatusAffects_1.StatusAffects.NagaVenom, 3, 0, 0, 0);
                }
                else {
                    this.player.createStatusAffect(StatusAffects_1.StatusAffects.NagaVenom, 0, 0, 0, 0);
                    this.player.takeDamage(5 + Naga.rand(5));
                }
                this.player.takeDamage(5 + Naga.rand(5));
            }
            else {
                this.outputText("The venom's effects intensify as your vision begins to blur and it becomes increasingly harder to stand.", false);
                if (this.player.spe > 3) {
                    //stats(0,0,-2,0,0,0,0,0);
                    this.player.spe -= 2;
                    Naga.showStatDown('spe');
                    // speUp.visible = false;
                    // speDown.visible = true;
                    this.player.addStatusValue(StatusAffects_1.StatusAffects.NagaVenom, 1, 2);
                }
                else
                    this.player.takeDamage(5 + Naga.rand(5));
                this.player.takeDamage(5 + Naga.rand(5));
            }
            this.combatRoundOver();
        }
        //2b)  Ability - Constrict - entangles player, raises lust 
        //every turn until you break free
        nagaConstrict() {
            this.outputText("The naga draws close and suddenly wraps herself around you, binding you in place! You can't help but feel strangely aroused by the sensation of her scales rubbing against your body. All you can do is struggle as she begins to squeeze tighter!", false);
            this.player.createStatusAffect(StatusAffects_1.StatusAffects.NagaBind, 0, 0, 0, 0);
            this.player.takeDamage(2 + Naga.rand(4));
            this.combatRoundOver();
        }
        //2c) Abiliy - Tail Whip - minus ??? HP 
        //(base it on toughness?)
        nagaTailWhip() {
            this.outputText("The naga tenses and twists herself forcefully.  ", false);
            //[if evaded]
            if ((this.player.findPerk(PerkLib_1.PerkLib.Evade) && Naga.rand(6) == 0)) {
                this.outputText("You see her tail whipping toward you and evade it at the last second. You quickly roll back onto your feet.", false);
            }
            else if (this.player.findPerk(PerkLib_1.PerkLib.Misdirection) >= 0 && Naga.rand(100) < 10 && this.player.armorName == "red, high-society bodysuit") {
                this.outputText("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + this.a + this.short + "'s tail-whip.", false);
            }
            else if (this.player.spe > Naga.rand(300)) {
                this.outputText("You see her tail whipping toward you and jump out of the way at the last second. You quickly roll back onto your feet.", false);
            }
            else {
                this.outputText("Before you can even think, you feel a sharp pain at your side as the naga's tail slams into you and shoves you into the sands. You pick yourself up, wincing at the pain in your side.", false);
                var damage = 10;
                if (this.player.armorDef < 10)
                    damage += 10 - this.player.armorDef;
                damage += Naga.rand(3);
                damage = this.player.takeDamage(damage);
                this.outputText(" (" + damage + ")", false);
            }
            this.combatRoundOver();
        }
        defeated(hpVictory) {
            this.game.desert.nagaScene.nagaRapeChoice();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nThe naga's eyes go wide and she turns to leave, no longer interested in you.", false);
                this.player.orgasm();
                this.doNext(this.game.cleanupAfterCombat);
            }
            else {
                this.game.desert.nagaScene.nagaFUCKSJOOOOOO();
            }
        }
        constructor(noInit = false) {
            super();
            if (noInit)
                return;
            console_1.trace("Naga Constructor!");
            this.a = "the ";
            this.short = "naga";
            this.imageName = "naga";
            this.long = "You are fighting a naga. She resembles a beautiful and slender woman from the waist up, with dark hair hanging down to her neck. Her upper body is deeply tanned, while her lower body is covered with shiny scales, striped in a pattern reminiscent of the dunes around you. Instead of bifurcating into legs, her hips elongate into a snake's body which stretches far out behind her, leaving a long and curving trail in the sand.  She's completely naked, with her round C-cup breasts showing in plain sight. In her mouth you can see a pair of sharp, poisonous fangs and a long forked tongue moving rapidly as she hisses at you.";
            // this.plural = false;
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLAVERING, appearanceDefs_1.VAGINA_LOOSENESS_NORMAL);
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusVCapacity, 40, 0, 0, 0);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("C"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 10, 0, 0, 0);
            this.tallness = 5 * 12 + 10;
            this.hipRating = appearanceDefs_1.HIP_RATING_AMPLE + 2;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_NAGA;
            this.skinTone = "mediterranean-toned";
            this.hairColor = "brown";
            this.hairLength = 16;
            this.initStrTouSpeInte(28, 20, 35, 42);
            this.initLibSensCor(55, 55, 40);
            this.weaponName = "fist";
            this.weaponVerb = "punch";
            this.weaponAttack = 3;
            this.armorName = "scales";
            this.armorDef = 5;
            this.lust = 30;
            this.temperment = Naga.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 2;
            this.gems = Naga.rand(5) + 8;
            this.drop = new WeightedDrop_1.WeightedDrop().
                add(undefined, 1).
                add(this.consumables.REPTLUM, 5).
                add(this.consumables.SNAKOIL, 4);
            this.special1 = this.nagaPoisonBiteAttack;
            this.special2 = this.nagaConstrict;
            this.special3 = this.nagaTailWhip;
            this.checkMonster();
        }
    }
    exports.Naga = Naga;
});
//# sourceMappingURL=Naga.js.map