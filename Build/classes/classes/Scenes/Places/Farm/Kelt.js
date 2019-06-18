define(["require", "exports", "../../../Monster", "../../../StatusAffects", "../../../GlobalFlags/kFLAGS", "../../../CockTypesEnum", "../../../Appearance", "../../../../../includes/appearanceDefs"], function (require, exports, Monster_1, StatusAffects_1, kFLAGS_1, CockTypesEnum_1, Appearance_1, appearanceDefs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Kelt extends Monster_1.Monster {
        //Trample - once every five turns
        keltTramplesJoo() {
            this.outputText("Before you know what's what, Kelt is galloping toward you, kicking up a cloud of dust in his wake.  He's trying to trample you!  ");
            //Miss:
            if (this.combatMiss() || this.combatEvade() || this.combatFlexibility() || this.combatMisdirect()) {
                this.outputText("You roll out of the way at the last moment, avoiding his dangerous hooves.");
                this.combatRoundOver();
                return;
            }
            //Determine damage - str modified by enemy toughness!
            var damage = Math.round((this.str + this.weaponAttack) - Kelt.rand(this.player.tou) - this.player.armorDef);
            if (damage > 0)
                damage = this.player.takeDamage(damage);
            //Block:
            if (damage <= 0) {
                this.outputText("Incredibly, you brace yourself and dig in your [feet].  Kelt slams into you, but you grind his momentum to a half.  His mouth flaps uncomprehendingly for a moment before he backs up, flushing from being so close to you.");
                this.lust += 5;
            }
            //Hit:
            else {
                this.outputText("You can't get out of the way in time, and you're knocked down!  Kelt tramples overtop of you!  (" + damage + ")");
            }
            this.combatRoundOver();
        }
        //Arrow Attack
        keltShootBow() {
            this.createStatusAffect(StatusAffects_1.StatusAffects.BowCooldown, 3, 0, 0, 0);
            this.outputText("Kelt knocks and fires an arrow almost faster than you can track.  He's lost none of his talent with a bow, even after everything you've put him through.  ");
            //Miss:
            if (this.combatMiss() || this.combatEvade() || this.combatFlexibility() || this.combatMisdirect()) {
                this.outputText("You manage to avoid the missile by the skin of your teeth!");
                this.combatRoundOver();
                return;
            }
            var damage = 0;
            damage = Math.floor((20 + this.str / 3 + 100) + this.spe / 3 - Kelt.rand(this.player.tou) - this.player.armorDef);
            if (damage < 0)
                damage = 0;
            if (damage == 0) {
                this.outputText("You deflect the hit, preventing it from damaging you.");
                this.combatRoundOver();
                return;
            }
            //Hit:
            damage = this.player.takeDamage(damage);
            this.outputText("The arrow bites into you before you can react. (" + damage + ")");
            this.combatRoundOver();
        }
        //Aura Arouse
        KellyuraAttack() {
            var select = Kelt.rand(3);
            //(1)
            if (select == 0)
                this.outputText("Kelt flashes his cockiest smile and gestures downward.  \"<i>Did you forget why you're here, slut?  Taking me by surprise once doesn't make you any less of a whore.</i>\"");
            //(2)
            else if (select == 2)
                this.outputText("Grinning, Kelt runs by, trailing a cloud of his musk and pheremones behind you.  You have to admit, they get you a little hot under the collar...");
            //(3)
            else {
                this.outputText("Kelt snarls, \"<i>Why don't you just masturbate like the slut that you are until I come over there and punish you?</i>\"  ");
                if (this.player.lust >= 80)
                    this.outputText("Your hand moves towards your groin seemingly of its own volition.");
                else
                    this.outputText("Your hands twitch towards your groin but you arrest them.  Still, the idea seems to buzz at the back of your brain, exciting you.");
            }
            this.game.dynStats("lus", this.player.lib / 5 + Kelt.rand(10));
            this.combatRoundOver();
        }
        //Attacks as normal + daydream "attack"
        //DayDream "Attack"
        dayDreamKelly() {
            if (Kelt.rand(2) == 0)
                this.outputText("Kelt pauses mid-draw, looking you up and down.  He licks his lips for a few moments before shaking his head to rouse himself from his lusty stupor.  He must miss the taste of your sperm.");
            else
                this.outputText("Flaring 'his' nostrils, Kelt inhales deeply, his eyelids fluttering closed as he gives a rather lady-like moan.   His hands roam over his stiff nipples, tweaking them slightly before he recovers.");
            this.lust += 5;
            this.combatRoundOver();
        }
        performCombatAction() {
            if (this.statusAffectv1(StatusAffects_1.StatusAffects.BowCooldown) > 0) {
                this.addStatusValue(StatusAffects_1.StatusAffects.BowCooldown, 1, -1);
                if (this.statusAffectv1(StatusAffects_1.StatusAffects.BowCooldown) <= 0)
                    this.removeStatusAffect(StatusAffects_1.StatusAffects.BowCooldown);
            }
            else {
                if (Kelt.rand(2) == 0 && this.flags[kFLAGS_1.kFLAGS.KELT_BREAK_LEVEL] >= 2)
                    this.dayDreamKelly();
                else
                    this.keltShootBow();
            }
            var select = Kelt.rand(5);
            if (select <= 1)
                this.eAttack();
            else if (select <= 3)
                this.KellyuraAttack();
            else
                this.keltTramplesJoo();
        }
        defeated(hpVictory) {
            if (this.game.flags[kFLAGS_1.kFLAGS.KELT_BREAK_LEVEL] == 1)
                this.game.farm.kelly.defeatKellyNDBREAKHIM();
            else
                this.game.farm.kelly.breakingKeltNumeroThree();
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nKelt recoils for a moment before assuming a look of superiority...");
                this.doNext(this.game.endLustLoss);
            }
            else {
                this.game.farm.kelly.keltFucksShitUp();
            }
        }
        constructor() {
            super();
            var breakLevel2 = this.game.flags[kFLAGS_1.kFLAGS.KELT_BREAK_LEVEL] == 2;
            this.a = "";
            this.short = "Kelt";
            this.imageName = "kelt";
            this.long = "Kelt has changed for the worse since your first meeting.  Gone is his muscular, barrel chest.  In its place is a softer frame, capped with tiny boobs - remnants of your last treatment.  His jaw is fairly square and chiselled (though less than before).  From the waist down, he has the body of a horse, complete with a fairly large pair of balls and a decent-sized dong.  Both are smaller than they used to be, however.  He has his bow strung and out, clearly intent on defending himself from your less than gentle touches." + (breakLevel2 ? "Kelt is looking less and less like the burly centaur from before, and more and more like a woman.  He looks more like an odd, androgynous hybrid than the beautiful woman you had turned him into.  He currently sports roughly B-cup breasts and a smallish, miniature horse-cock.  There's barely any hair on his human body, aside from a long mane of hair.  Each treatment seems to be more effective than the last, and you can't wait to see what happens after you tame him THIS time." : "");
            // this.plural = false;
            this.createCock(breakLevel2 ? 12 : 24, 3.5, CockTypesEnum_1.CockTypesEnum.HORSE);
            this.balls = 2;
            this.ballSize = 2 + Kelt.rand(13);
            this.cumMultiplier = 1.5;
            this.hoursSinceCum = this.player.ballSize * 10;
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse(breakLevel2 ? "B" : "A"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_NORMAL;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 50, 0, 0, 0);
            this.tallness = 84;
            this.hipRating = appearanceDefs_1.HIP_RATING_AVERAGE;
            this.buttRating = appearanceDefs_1.BUTT_RATING_AVERAGE + 1;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_CENTAUR;
            this.skinTone = "tan";
            this.hairColor = Kelt.randomChoice("black", "brown");
            this.hairLength = 3;
            this.initStrTouSpeInte(60, 70, 40, 20);
            this.initLibSensCor(40, 25, 55);
            this.weaponName = "fist";
            this.weaponVerb = "punch";
            this.weaponAttack = 10;
            this.armorName = "tough skin";
            this.armorDef = 4;
            this.bonusHP = 200;
            this.lust = 40;
            this.lustVuln = 0.83;
            this.temperment = Kelt.TEMPERMENT_LUSTY_GRAPPLES;
            this.level = 6;
            this.gems = Kelt.rand(5) + 5;
            this.tailType = appearanceDefs_1.TAIL_TYPE_HORSE;
            this.drop = this.NO_DROP;
            this.checkMonster();
        }
    }
    exports.Kelt = Kelt;
});
//# sourceMappingURL=Kelt.js.map