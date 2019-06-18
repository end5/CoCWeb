define(["require", "exports", "../../Areas/Desert/Naga", "../../../StatusAffects", "../../../GlobalFlags/kGAMECLASS", "../../../../../includes/appearanceDefs"], function (require, exports, Naga_1, StatusAffects_1, kGAMECLASS_1, appearanceDefs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Sirius extends Naga_1.Naga {
        eAttack() {
            this.outputText("Sirius readies his hands, undulating his body erratically with quick motions in order to catch you off-guard and strike at you.\n");
            super.eAttack();
        }
        outputPlayerDodged(dodge) {
            this.outputText("With your trained eyes, you see through his feints and effectively block his first swipe, then quickly twist your body to kick him away.  He clutches his belly where you kicked him, but recovers quickly, eyes fixated on yours.\n");
        }
        outputAttack(damage) {
            if (damage <= 0) {
                super.outputAttack(damage);
            }
            else {
                this.outputText("You misjudge his pattern and wind up getting slashed by a series of swipes from his sharpened nails.  He distances himself from you in order to avoid retaliation and glares at you with his piercing yellow eyes, a hint of a smile on his face. (" + damage + ")");
            }
        }
        performCombatAction() {
            var attack = Sirius.rand(4);
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Blind) >= 0)
                attack = Sirius.rand(3);
            if (attack == 0)
                this.eAttack();
            if (attack == 1)
                this.poisonBite();
            if (attack == 2)
                this.manNagaTease();
            if (attack == 3)
                this.nagaSpitAttack();
        }
        manNagaTease() {
            this.outputText("The snake-man stares deeply into your eyes, seemingly looking past them, and for a moment your body goes numb.");
            //Miss:
            if (Sirius.rand(10) == 0) {
                this.outputText("  You blink and shake yourself free of the effects of the snake-man's penetrating gaze.");
                this.combatRoundOver();
            }
            //Hit (Blind):
            if (this.findStatusAffect(StatusAffects_1.StatusAffects.Blind) >= 0) {
                this.outputText("  Though your vision is still blurry, you feel yourself being sucked into the golden depths of those pupils, making you forget all your worries, if only for an instant.  All you can focus on is your growing arousal as you sink deeper into his gaze.  You shake your head, clearing your mind of the hypnotising effects the snake-man's eyes seem to possess, though the arousal remains.");
                kGAMECLASS_1.kGAMECLASS.dynStats("lus", (5 + this.player.lib / 10 - this.player.inte / 20));
            }
            //Hit:
            else {
                this.outputText("  Those pools of yellow suck you into their golden depths, making you forget all your worries, if only for an instant.  All you can focus on is your growing arousal as you sink deeper into his gaze.  You shake your head, clearing your mind of the hypnotising effects the snake-man's eyes seem to possess, though the arousal remains.");
                kGAMECLASS_1.kGAMECLASS.dynStats("lus", (10 + this.player.lib / 7 - this.player.inte / 20));
            }
            this.combatRoundOver();
        }
        nagaSpitAttack() {
            this.outputText("Hissing loudly, Sirius suddenly curls his lips and spits at your eyes!  ");
            //{Hit:
            if (this.spe / 20 + Sirius.rand(20) + 1 > this.player.spe / 20 + 10) {
                this.outputText("The vile spray hits your eyes and you scream in pain, clawing fiercely at your burning, watering, weeping eyes.  <b>You can't see!  It'll be much harder to fight in this state, but at the same time, his hypnosis won't be so effective...</b>");
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.Blind, 3, 0, 0, 0);
            }
            //Miss:
            else
                this.outputText("You quickly lean to the side, narrowly avoiding being blinded by the snake-man's spit!");
            this.combatRoundOver();
        }
        poisonBite() {
            this.outputText("With a loud and vicious hiss, Sirius suddenly lunges at you, mouth distended impossibly wide and revealing four needle-like fangs dripping with venom!  ");
            //Miss:
            if (this.combatMiss() || this.combatEvade() || this.combatFlexibility() || this.combatMisdirect()) {
                this.outputText("You dodge just in the nick of time, and deliver a punishing blow with the butt of your halberd as Sirius soars past, forcing him to slither past you to make himself ready to defend himself again.");
                this.combatRoundOver();
            }
            //Hit:
            this.outputText("The snake-man moves too quickly for you to evade and he sinks long fangs into your flesh, leaving a wound that burns with horrific pain.");
            var damage = 40 + Sirius.rand(20);
            damage = this.player.takeDamage(damage);
            this.outputText(" (" + damage + ")");
            this.combatRoundOver();
        }
        defeated(hpVictory) {
            this.game.urtaQuest.urtaBeatsUpSiriusRadio();
        }
        won(hpVictory, pcCameWorms) {
            this.game.urtaQuest.urtaLosesToSirriusSnakeRadio();
        }
        constructor() {
            super(true);
            this.a = "";
            this.short = "Sirius, a naga hypnotist";
            this.imageName = "sirius";
            this.long = "A strange being with the upper torso of a human man topped with the head of a giant serpent stands before you, hissing in anger and occasionally letting a long, fork-tipped tongue flicker out past his lips.  An imperial-featured masculine human face regards you with an indifferent expression.  A ponytail of deep orange - almost bright red - hair falls down between his shoulders, held together by snake-styled circlets of silver, and matching bracelets of the same material and design adorn his wrists. Scales begin at his lower waist, concealing his manhood from you; he's completely naked otherwise.  His snake body is long and slender, covered in finely meshing scales of a rich orange-red shade, the red broken by a pattern of randomly thick or thin stripes of black.  His burning yellow eyes stare directly into yours, vertical slits of pupils fixated on your own as he undulates and coils in an eerily seductive manner.";
            this.plural = false;
            this.createCock(14, 2);
            this.createBreastRow(0);
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_DRY;
            this.createStatusAffect(StatusAffects_1.StatusAffects.BonusACapacity, 10, 0, 0, 0);
            this.tallness = 5 * 12 + 10;
            this.hipRating = appearanceDefs_1.HIP_RATING_AMPLE + 2;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE;
            this.lowerBody = appearanceDefs_1.LOWER_BODY_TYPE_NAGA;
            this.skinTone = "mediterranean-toned";
            this.hairColor = "orange";
            this.hairLength = 16;
            this.initStrTouSpeInte(75, 70, 75, 92);
            this.initLibSensCor(45, 35, 40);
            this.weaponName = "fangs";
            this.weaponVerb = "bite";
            this.weaponAttack = 25;
            this.armorName = "scales";
            this.armorDef = 30;
            this.bonusHP = 400;
            this.lust = 30;
            this.temperment = Sirius.TEMPERMENT_RANDOM_GRAPPLES;
            this.level = 12;
            this.gems = Sirius.rand(5) + 8;
            this.drop = this.NO_DROP;
            this.special1 = this.nagaPoisonBiteAttack;
            this.special2 = this.nagaConstrict;
            this.special3 = this.nagaTailWhip;
            this.checkMonster();
        }
    }
    exports.Sirius = Sirius;
});
//# sourceMappingURL=Sirius.js.map