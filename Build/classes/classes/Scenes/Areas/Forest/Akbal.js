define(["require", "exports", "../../../Monster", "../../../StatusAffects", "../../../PerkLib", "../../../../console", "../../../CockTypesEnum", "../../../../../includes/appearanceDefs", "../../../internals/WeightedDrop"], function (require, exports, Monster_1, StatusAffects_1, PerkLib_1, console_1, CockTypesEnum_1, appearanceDefs_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Akbal extends Monster_1.Monster {
        eAttack() {
            //Chances to miss:
            var damage = 0;
            //Blind dodge change
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Blind) >= 0) {
                this.outputText(this.capitalA + this.short + " seems to have no problem guiding his attacks towards you, despite his blindness.\n", false);
            }
            //Determine if dodged!
            if (this.player.spe - this.spe > 0 && Math.floor(Math.random() * (((this.player.spe - this.spe) / 4) + 80)) > 80) {
                if (this.player.spe - this.spe < 8)
                    this.outputText("You narrowly avoid " + this.a + this.short + "'s " + this.weaponVerb + "!", false);
                if (this.player.spe - this.spe >= 8 && this.player.spe - this.spe < 20)
                    this.outputText("You dodge " + this.a + this.short + "'s " + this.weaponVerb + " with superior quickness!", false);
                if (this.player.spe - this.spe >= 20)
                    this.outputText("You deftly avoid " + this.a + this.short + "'s slow " + this.weaponVerb + ".", false);
                this.game.combatRoundOver();
                return;
            }
            //Determine if evaded
            if (this.player.findPerk(PerkLib_1.PerkLib.Evade) >= 0 && Akbal.rand(100) < 10) {
                this.outputText("Using your skills at evading attacks, you anticipate and sidestep " + this.a + this.short + "'s attack.", false);
                this.game.combatRoundOver();
                return;
            }
            //Determine if flexibilitied
            if (this.player.findPerk(PerkLib_1.PerkLib.Flexibility) >= 0 && Akbal.rand(100) < 10) {
                this.outputText("Using your cat-like agility, you twist out of the way of " + this.a + this.short + "'s attack.", false);
                this.game.combatRoundOver();
                return;
            }
            //Determine damage - str modified by enemy toughness!
            //*Normal Attack A - 
            if (Akbal.rand(2) == 0) {
                //(medium HP damage)
                damage = Math.floor((this.str + this.weaponAttack) - Math.random() * (this.player.tou) - this.player.armorDef);
                if (damage <= 0) {
                    this.outputText("Akbal lunges forwards but with your toughness", false);
                    if (this.player.armorDef > 0)
                        this.outputText(" and " + this.player.armorName + ", he fails to deal any damage.", false);
                    else
                        this.outputText(" he fails to deal any damage.", false);
                }
                else {
                    this.outputText("Akbal rushes at you, his claws like lightning as they leave four red-hot lines of pain across your stomach.", false);
                    this.player.takeDamage(damage);
                }
            }
            else { //*Normal Attack B
                //(high HP damage)
                damage = Math.floor((this.str + 25 + this.weaponAttack) - Math.random() * (this.player.tou) - this.player.armorDef);
                if (damage == 0) {
                    this.outputText("Akbal lunges forwards but between your toughness ", false);
                    if (this.player.armorDef > 0)
                        this.outputText("and " + this.player.armorName + ", he fails to deal any damage.", false);
                }
                else {
                    this.outputText("Akbal snarls as he flies towards you, snapping his ivory teeth on your arm. You scream out in pain as you throw him off.", false);
                    this.player.takeDamage(damage);
                }
            }
            this.game.combatRoundOver();
        }
        defeated(hpVictory) {
            this.game.forest.akbalScene.akbalDefeated(hpVictory);
        }
        won(hpVictory, pcCameWorms) {
            this.game.forest.akbalScene.akbalWon(hpVictory, pcCameWorms);
            this.game.cleanupAfterCombat();
        }
        akbalLustAttack() {
            //*Lust Attack - 
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Whispered) < 0) {
                this.outputText("You hear whispering in your head. Akbal begins speaking to you as he circles you, telling all the ways he'll dominate you once he beats the fight out of you.", false);
                //(Lust increase)
                this.game.dynStats("lus", 7 + (100 - this.player.inte) / 10);
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.Whispered, 0, 0, 0, 0);
            }
            //Continuous Lust Attack - 
            else {
                this.outputText("The whispering in your head grows, many voices of undetermined sex telling you all the things the demon wishes to do to you. You can only blush.", false);
                //(Lust increase)
                this.game.dynStats("lus", 12 + (100 - this.player.inte) / 10);
            }
            this.game.combatRoundOver();
        }
        akbalSpecial() {
            //*Special Attack A - 
            if (Akbal.rand(2) == 0 && this.player.spe > 20) {
                var speedChange = this.player.spe / 5 * -1;
                this.outputText("Akbal's eyes fill with light, and a strange sense of fear begins to paralyze your limbs.", false);
                //(Speed decrease)
                this.game.dynStats("spe", speedChange);
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.AkbalSpeed) >= 0)
                    this.player.addStatusValue(StatusAffects_1.StatusAffects.AkbalSpeed, 1, speedChange);
                else
                    this.player.createStatusAffect(StatusAffects_1.StatusAffects.AkbalSpeed, speedChange, 0, 0, 0);
            }
            //*Special Attack B - 
            else {
                this.outputText("Akbal releases an ear-splitting roar, hurling a torrent of emerald green flames towards you.\n", false);
                //(high HP damage)
                //Determine if dodged!
                if (this.player.spe - this.spe > 0 && Math.floor(Math.random() * (((this.player.spe - this.spe) / 4) + 80)) > 80) {
                    if (this.player.spe - this.spe < 8)
                        this.outputText("You narrowly avoid " + this.a + this.short + "'s fire!", false);
                    if (this.player.spe - this.spe >= 8 && this.player.spe - this.spe < 20)
                        this.outputText("You dodge " + this.a + this.short + "'s fire with superior quickness!", false);
                    if (this.player.spe - this.spe >= 20)
                        this.outputText("You deftly avoid " + this.a + this.short + "'s slow fire-breath.", false);
                    this.game.combatRoundOver();
                    return;
                }
                //Determine if evaded
                if (this.player.findPerk(PerkLib_1.PerkLib.Evade) >= 0 && Akbal.rand(100) < 20) {
                    this.outputText("Using your skills at evading attacks, you anticipate and sidestep " + this.a + this.short + "'s fire-breath.", false);
                    this.game.combatRoundOver();
                    return;
                }
                //Determine if flexibilitied
                if (this.player.findPerk(PerkLib_1.PerkLib.Flexibility) >= 0 && Akbal.rand(100) < 10) {
                    this.outputText("Using your cat-like agility, you contort your body to avoid " + this.a + this.short + "'s fire-breath.", false);
                    this.game.combatRoundOver();
                    return;
                }
                this.outputText("You are burned badly by the flames! (" + this.player.takeDamage(40) + ")", false);
                ;
            }
            this.game.combatRoundOver();
        }
        //*Support ability - 
        akbalHeal() {
            if (this.HPRatio() >= 1)
                this.outputText("Akbal licks himself, ignoring you for now.", false);
            else
                this.outputText("Akbal licks one of his wounds, and you scowl as the injury quickly heals itself.", false);
            this.addHP(30);
            this.lust += 10;
            this.game.combatRoundOver();
        }
        constructor() {
            super();
            console_1.trace("Akbal Constructor!");
            this.a = "";
            this.short = "Akbal";
            this.imageName = "akbal";
            this.long = "Akbal, 'God of the Terrestrial Fire', circles around you. His sleek yet muscular body is covered in tan fur, with dark spots that seem to dance around as you look upon them.  His mouth holds two ivory incisors that glint in the sparse sunlight as his lips tremble to the sound of an unending growl.  Each paw conceals lethal claws capable of shredding men and demons to ribbons.  His large and sickeningly alluring bright green eyes promise unbearable agony as you look upon them.";
            // this.plural = false;
            this.createCock(15, 2.5, CockTypesEnum_1.CockTypesEnum.DOG);
            this.balls = 2;
            this.ballSize = 4;
            this.cumMultiplier = 6;
            this.hoursSinceCum = 400;
            this.createBreastRow();
            this.createBreastRow();
            this.createBreastRow();
            this.createBreastRow();
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_NORMAL;
            this.tallness = 4 * 12;
            this.hipRating = appearanceDefs_1.HIP_RATING_SLENDER;
            this.buttRating = appearanceDefs_1.BUTT_RATING_TIGHT;
            this.skinTone = "spotted";
            this.skinType = appearanceDefs_1.SKIN_TYPE_FUR;
            //this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_FUR];
            this.hairColor = "black";
            this.hairLength = 5;
            this.initStrTouSpeInte(55, 53, 50, 75);
            this.initLibSensCor(50, 50, 100);
            this.weaponName = "claws";
            this.weaponVerb = "claw-slash";
            this.weaponAttack = 5;
            this.armorName = "shimmering pelt";
            this.armorDef = 5;
            this.bonusHP = 20;
            this.lust = 30;
            this.lustVuln = 0.8;
            this.temperment = Akbal.TEMPERMENT_LUSTY_GRAPPLES;
            this.level = 6;
            this.gems = 15;
            this.drop = new WeightedDrop_1.WeightedDrop().
                add(this.consumables.INCUBID, 6).
                add(this.consumables.W_FRUIT, 3).
                add(this.weapons.PIPE, 1);
            this.special1 = this.akbalLustAttack;
            this.special2 = this.akbalSpecial;
            this.special3 = this.akbalHeal;
            this.tailType = appearanceDefs_1.TAIL_TYPE_DOG;
            this.checkMonster();
        }
    }
    exports.Akbal = Akbal;
});
//# sourceMappingURL=Akbal.js.map