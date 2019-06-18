define(["require", "exports", "../../../Monster", "../../../StatusAffects", "../../../GlobalFlags/kFLAGS", "../../../../../includes/appearanceDefs", "../../../Appearance", "../../../internals/WeightedDrop"], function (require, exports, Monster_1, StatusAffects_1, kFLAGS_1, appearanceDefs_1, Appearance_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BeeGirl extends Monster_1.Monster {
        defeated(hpVictory) {
            this.clearOutput();
            if (this.player.gender > 0) {
                if (hpVictory) {
                    this.outputText("You smile in satisfaction as the " + this.short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
                }
                else {
                    this.outputText("You smile in satisfaction as the " + this.short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
                }
                this.player.lust = 98;
                this.game.dynStats("lus", 1);
                var dildoRape = (this.player.hasKeyItem("Deluxe Dildo") >= 0 ? this.game.forest.beeGirlScene.beeGirlsGetsDildoed : undefined);
                var milkAndHoney = (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Feeder) >= 0 ? this.game.forest.beeGirlScene.milkAndHoneyAreKindaFunny : undefined);
                this.game.simpleChoices("Rape", this.game.forest.beeGirlScene.rapeTheBeeGirl, "Dildo Rape", dildoRape, "", undefined, "B. Feed", milkAndHoney, "Leave", this.leaveAfterDefeating);
            }
            else if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Feeder) >= 0) { //Genderless can still breastfeed
                if (hpVictory) {
                    this.outputText("You smile in satisfaction as the " + this.short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
                }
                else {
                    this.outputText("You smile in satisfaction as the " + this.short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
                }
                this.game.simpleChoices("B. Feed", this.game.forest.beeGirlScene.milkAndHoneyAreKindaFunny, "", undefined, "", undefined, "", undefined, "Leave", this.leaveAfterDefeating);
            }
            else {
                this.game.finishCombat();
            }
        }
        leaveAfterDefeating() {
            if (this.HP < 1) {
                this.flags[kFLAGS_1.kFLAGS.BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE]++; //This only happens if you beat her up and then don't rape her
            }
            else {
                this.flags[kFLAGS_1.kFLAGS.BEE_GIRL_COMBAT_WINS_WITH_RAPE]++; //All wins by lust count towards the desire option, even when you leave
            }
            this.game.cleanupAfterCombat();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nThe bee-girl goes white and backs away with a disgusted look on her face.\n\n");
                this.game.cleanupAfterCombat();
            }
            else {
                this.game.forest.beeGirlScene.beeRapesYou();
            }
        }
        beeStingAttack() {
            //Blind dodge change
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Blind) >= 0) {
                this.outputText(this.capitalA + this.short + " completely misses you with a blind sting!!");
                this.combatRoundOver();
                return;
            }
            //Determine if dodged!
            if (this.player.spe - this.spe > 0 && Math.floor(Math.random() * (((this.player.spe - this.spe) / 4) + 80)) > 80) {
                if (this.player.spe - this.spe < 8)
                    this.outputText("You narrowly avoid " + this.a + this.short + "'s stinger!");
                if (this.player.spe - this.spe >= 8 && this.player.spe - this.spe < 20)
                    this.outputText("You dodge " + this.a + this.short + "'s stinger with superior quickness!");
                if (this.player.spe - this.spe >= 20)
                    this.outputText("You deftly avoid " + this.a + this.short + "'s slow attempts to sting you.");
                this.combatRoundOver();
                return;
            }
            //determine if avoided with armor.
            if (this.player.armorDef >= 10 && BeeGirl.rand(4) > 0) {
                this.outputText("Despite her best efforts, " + this.a + this.short + "'s sting attack can't penetrate your armor.");
                this.combatRoundOver();
                return;
            }
            //Sting successful!  Paralize or lust?
            //Lust 50% of the time
            if (BeeGirl.rand(2) == 0) {
                this.outputText("Searing pain lances through you as " + this.a + this.short + " manages to sting you!  You stagger back a step and nearly trip, flushing hotly.  ");
                this.outputText("Oh no!  You've been injected with some kind of aphrodisiac.  You've got to keep focused, you can't think about... fucking... ");
                if (this.player.gender == 1)
                    this.outputText("or dripping honey-slicked cunts beckoning you. ");
                if (this.player.gender == 2)
                    this.outputText("planting your aching sex over her face while you lick her sweet honeypot. ");
                if (this.player.gender == 3)
                    this.outputText("or cocks, tits, and puffy nipples. ");
                this.game.dynStats("lus", 25);
                if (this.player.lust > 60) {
                    this.outputText(" You shake your head and struggle to stay focused,");
                    if (this.player.gender == 1 || this.player.gender == 3)
                        this.outputText(" but it's difficult with the sensitive bulge in your groin.");
                    if (this.player.gender == 2)
                        this.outputText(" but can't ignore the soaking wetness in your groin.");
                    if (this.player.sens > 50)
                        this.outputText("  The sensitive nubs of your nipples rub tightly under your " + this.player.armorName + ".");
                }
                else
                    this.outputText(" You shake your head and clear the thoughts from your head, focusing on the task at hand.");
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.lustvenom) < 0)
                    this.player.createStatusAffect(StatusAffects_1.StatusAffects.lustvenom, 0, 0, 0, 0);
            }
            //Paralise the other 50%!
            else {
                this.outputText("Searing pain lances through you as " + this.a + this.short + " manages to sting you!  You stagger back a step and nearly trip, finding it hard to move yourself.");
                var paralyzeIndex = this.player.findStatusAffect(StatusAffects_1.StatusAffects.ParalyzeVenom);
                if (paralyzeIndex >= 0) {
                    this.player.statusAffect(paralyzeIndex).value1 += 2.9; //v1 - strenght penalty, v2 speed penalty
                    this.player.statusAffect(paralyzeIndex).value2 += 2.9;
                    this.game.dynStats("str", -3, "spe", -3);
                    this.outputText("  It's getting much harder to move, you're not sure how many more stings like that you can take!");
                }
                else {
                    this.player.createStatusAffect(StatusAffects_1.StatusAffects.ParalyzeVenom, 2, 2, 0, 0);
                    this.game.dynStats("str", -2, "spe", -2);
                    this.outputText("  You've fallen prey to paralyzation venom!  Better end this quick!");
                }
            }
            if (this.player.lust >= 100)
                this.doNext(this.game.endLustLoss);
            else
                this.doNext(this.game.playerMenu);
        }
        constructor() {
            super();
            this.a = "a ";
            this.short = "bee-girl";
            this.imageName = "beegirl";
            this.long = "A bee-girl buzzes around you, filling the air with intoxicatingly sweet scents and a buzz that gets inside your head.  She has a humanoid face with small antennae, black chitin on her arms and legs that looks like shiny gloves and boots, sizable breasts, and a swollen abdomen tipped with a gleaming stinger.";
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_SLAVERING, appearanceDefs_1.VAGINA_LOOSENESS_GAPING);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("DD"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_STRETCHED;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_NORMAL;
            this.tallness = BeeGirl.rand(14) + 59;
            this.hipRating = appearanceDefs_1.HIP_RATING_CURVY + 3;
            this.buttRating = appearanceDefs_1.BUTT_RATING_EXPANSIVE;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_BEE;
            this.skinTone = "yellow";
            this.hairColor = BeeGirl.randomChoice("black", "black and yellow");
            this.hairLength = 6;
            this.initStrTouSpeInte(30, 30, 30, 20);
            this.initLibSensCor(60, 55, 0);
            this.weaponName = "chitin-plated fist";
            this.weaponVerb = "armored punch";
            this.armorName = "chitin";
            this.armorDef = 9;
            this.lust = 20 + BeeGirl.rand(40);
            this.lustVuln = 0.9;
            this.temperment = BeeGirl.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 4;
            this.gems = BeeGirl.rand(15) + 1;
            this.drop = new WeightedDrop_1.WeightedDrop().add(this.consumables.BEEHONY, 4).addMany(1, this.consumables.OVIELIX, this.consumables.W__BOOK, this.useables.B_CHITN, undefined);
            this.antennae = appearanceDefs_1.ANTENNAE_BEE;
            this.wingType = appearanceDefs_1.WING_TYPE_BEE_LIKE_SMALL;
            this.tailType = appearanceDefs_1.TAIL_TYPE_BEE_ABDOMEN;
            this.tailVenom = 100;
            this.special1 = this.beeStingAttack;
            this.checkMonster();
        }
    }
    exports.BeeGirl = BeeGirl;
});
//# sourceMappingURL=BeeGirl.js.map