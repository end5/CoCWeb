define(["require", "exports", "../../../Monster", "../../../StatusAffects", "../../../../console", "../../../../../includes/appearanceDefs", "../../../Appearance", "../../../internals/WeightedDrop"], function (require, exports, Monster_1, StatusAffects_1, console_1, appearanceDefs_1, Appearance_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SandWitch extends Monster_1.Monster {
        defeated(hpVictory) {
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.StoneLust)) {
                this.player.removeStatusAffect(StatusAffects_1.StatusAffects.StoneLust);
            }
            if (this.player.lust >= 33) {
                this.game.desert.sandWitchScene.beatSandwitch();
            }
            else {
                this.game.finishCombat();
            }
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nThe witch blanches and backs away, leaving you to your fate.");
                this.game.cleanupAfterCombat();
            }
            else {
                this.game.desert.sandWitchScene.sandwitchRape();
            }
        }
        lustMagicAttack() {
            this.outputText("The sand witch points at you, drawing a circle in the air and mouthing strange words.\n\n");
            if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.StoneLust) >= 0) {
                this.outputText("The orb inside you grows warm, almost hot, suffusing your body with heat and arousal.  ");
                this.game.dynStats("lus", 8 + Math.floor(this.player.sens) / 10);
            }
            else {
                this.outputText("You feel the sands shift by your " + this.player.feet() + ", and look down to see something slip out of the sands and into your clothes!  It feels incredibly smooth and circular as it glides upward along your " + this.player.leg() + ", its progress unaffected by your frantic effort to dislodge it.  ");
                if (this.player.vaginas.length > 0)
                    this.outputText("It glides up your thighs to the entrance of your sex, and its intentions dawn on you!\n\nToo late! You reach to stop it, but it pushes against your lips and slips inside your " + this.vaginaDescript(0) + " in an instant.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size.");
                else
                    this.outputText("It glides up your thighs, curving around your buttocks, and its intentions dawn on you.\n\nYou desperately grab for it, but are too late!  It pushes firmly against your rectum and slips inside instantaneously.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size.");
                this.player.createStatusAffect(StatusAffects_1.StatusAffects.StoneLust, 0, 0, 0, 0);
                this.game.dynStats("lus", 4 + Math.floor(this.player.sens) / 10);
            }
            this.doNext(this.game.playerMenu);
        }
        constructor() {
            super();
            console_1.trace("SandWitch Constructor!");
            this.a = "the ";
            if (this.game.silly()) {
                this.short = "sand witch";
                this.imageName = "sandwidch";
            }
            else {
                this.short = "sand witch";
                this.imageName = "sandwitch";
            }
            this.long = "A sand witch appears to be totally human, an oddity in this strange land.  She has dirty blonde hair and a very tanned complexion, choosing to cover most of her body with robes of the same color as the desert sands, making her impossible to spot from afar.";
            this.createVagina(false, appearanceDefs_1.VAGINA_WETNESS_WET, appearanceDefs_1.VAGINA_LOOSENESS_LOOSE);
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("DD"));
            this.createBreastRow(Appearance_1.Appearance.breastCupInverse("DD"));
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_TIGHT;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_NORMAL;
            this.tallness = SandWitch.rand(12) + 55;
            this.hipRating = appearanceDefs_1.HIP_RATING_CURVY;
            this.buttRating = appearanceDefs_1.BUTT_RATING_LARGE;
            this.skinTone = "bronzed";
            this.hairColor = "sandy-blonde";
            this.hairLength = 15;
            this.initStrTouSpeInte(25, 25, 35, 45);
            this.initLibSensCor(55, 40, 30);
            this.weaponName = "kick";
            this.weaponVerb = "kick";
            this.armorName = "robes";
            this.bonusHP = 20;
            this.lust = 30;
            this.temperment = SandWitch.TEMPERMENT_LUSTY_GRAPPLES;
            this.level = 3;
            this.gems = SandWitch.rand(15) + 5;
            this.drop = new WeightedDrop_1.WeightedDrop().addMany(1, this.consumables.TSCROLL, this.consumables.OVIELIX, this.consumables.LACTAID, this.consumables.LABOVA_, this.consumables.W__BOOK, this.consumables.B__BOOK, undefined);
            this.special1 = this.lustMagicAttack;
            this.special2 = this.special2;
            this.special3 = this.special3;
            this.checkMonster();
        }
    }
    exports.SandWitch = SandWitch;
});
//# sourceMappingURL=SandWitch.js.map