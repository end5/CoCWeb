define(["require", "exports", "./HellHound", "../../../StatusAffects", "../../../CoC_Settings", "../../../../console", "../../../../../includes/appearanceDefs", "../../../internals/WeightedDrop"], function (require, exports, HellHound_1, StatusAffects_1, CoC_Settings_1, console_1, appearanceDefs_1, WeightedDrop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ...
     * @author Fake-Name
     */
    class InfestedHellhound extends HellHound_1.HellHound {
        //[Extra special attack]
        hellHoundWormCannon() {
            this.outputText("The thing rears up onto its hind legs, revealing its more humanoid stature, and allowing it to use its flexible paws to caress its twinned-penises.  It lurches forwards powerfully, its thickness twitching and flaring as it launches a wave of worm-filled canine cum at you.", false);
            this.outputText("\n", false);
            if (InfestedHellhound.rand(2) == 0) {
                //Get hit – 10+ lust
                this.game.dynStats("lus", 5 + this.player.lib / 20);
                this.outputText("Taken off-guard by the unexpected sexual display, you fail to move out of the way, and the wormy jism splatters you from the chest down.", false);
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Infested) >= 0 && this.player.totalCocks() > 0) {
                    this.outputText("  The worms inside you begin moving and squirming. A few of your cum-soaked parasites crawl out from your shivering " + this.multiCockDescriptLight() + " as if attempting to meet the new arrivals.  You desperately want to brush them away, but the pleasure in your crotch is too good to fight, and you find yourself staying your hand as each and every one of the new worms makes it way into your " + this.multiCockDescriptLight() + ".", false);
                    if (this.player.balls > 0)
                        this.outputText("  Your " + this.ballsDescriptLight() + " grow weightier as the worms settle into their new home, arousing you beyond measure.", false);
                    else
                        this.outputText("  You can feel them shifting around inside you as they adjust to their new home, arousing you beyond measure.", false);
                    this.game.dynStats("lus", 10);
                }
                else if (this.player.totalCocks() > 0) {
                    this.outputText("  The worms wriggle and squirm all over you, working their way towards your groin.  It tickles pleasantly, but you brush them away before they can get inside you.  The thought of being turned into a worm-dispensing cum fountain is horrifying, but it leaves you hard.", false);
                    this.game.dynStats("lus", (5 + Math.round(this.player.cor / 20)));
                }
                else if (this.player.hasVagina())
                    this.outputText("  Thankfully, the worms don't seem to want anything to do with you, and rapidly drop down to the ground.", false);
            }
            //Sidestep
            else {
                this.outputText("You sidestep the gush of wormy fluid, letting it splatter against the rocks behind you.", false);
                //(If infested +10 lust:  
                if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.Infested) >= 0 && this.player.hasCock()) {
                    if (this.player.hasCock()) {
                        this.outputText("  Despite avoiding the torrent of infected seed, your own wormy ", false);
                        if (this.player.balls > 0)
                            this.outputText(this.ballsDescriptLight(), false);
                        else
                            this.outputText(this.multiCockDescriptLight(), false);
                        this.outputText(" wriggle", false);
                        if (this.player.balls == 0 && this.player.cockTotal() == 1)
                            this.outputText("s", false);
                        this.outputText(" hotly, expelling a few of your own worms in response along with a dribble of thick pre-cum.   You wonder what it would feel like to let his worms crawl inside you...", false);
                        this.game.dynStats("lus", 10);
                    }
                    else {
                        CoC_Settings_1.CoC_Settings.error("Infested but no cock!");
                        this.game.dynStats("lus", 5);
                        this.outputText("  The idea of being covered in the beast's infested seed arouses you slightly, but you shake your head violently and clear away the unwelcome thought.", false);
                    }
                }
                //if aroused by worms +5 lust:
                else if (this.player.findStatusAffect(StatusAffects_1.StatusAffects.WormsOn) >= 0 && this.player.findStatusAffect(StatusAffects_1.StatusAffects.WormsHalf) < 0) {
                    this.game.dynStats("lus", 5);
                    this.outputText("  The idea of being covered in the beast's infested seed arouses you slightly, but you shake your head violently and clear away the unwelcome thought.", false);
                }
            }
            this.lust -= 25;
            if (this.lust < 40)
                this.lust = 40;
            this.combatRoundOver();
        }
        defeated(hpVictory) {
            if (hpVictory) {
                this.outputText("The hellhound's flames dim and the heads let out a whine before the creature slumps down, defeated, unconscious, and yet still drooling worms.", true);
                this.game.cleanupAfterCombat();
            }
            else {
                this.outputText("Unable to bear its unnatural arousal, the infested hellhound's flames dim as he stops his attack. The two heads look at you, whining plaintively.  The hellhound slowly pads over to you and nudges its noses at your crotch.  It seems he wishes to pleasure you.\n\n", true);
                if (this.player.gender > 0 && this.player.lust >= 33) {
                    this.outputText("You realize your desires aren't quite sated.  You could let it please you.  Do you?", false);
                    this.game.simpleChoices("Fuck it", this.game.mountain.hellHoundScene.hellHoundGetsRaped, "", undefined, "", undefined, "", undefined, "Leave", this.game.cleanupAfterCombat);
                }
                else {
                    this.outputText("You turn away, not really turned on enough to be interested in such an offer from such a beast.", false);
                    this.game.cleanupAfterCombat();
                }
            }
        }
        won(hpVictory, pcCameWorms) {
            if (pcCameWorms) {
                this.outputText("\n\nThe infested hellhound's heads both grin happily as it advances towards you...", false);
                this.doNext(this.game.mountain.infestedHellhoundScene.infestedHellhoundLossRape);
            }
            else if (hpVictory) {
                this.game.mountain.infestedHellhoundScene.infestedHellhoundLossRape();
            }
            else {
                this.game.mountain.infestedHellhoundScene.infestedHellhoundLossRape();
            }
        }
        constructor() {
            super(true);
            console_1.trace("InfestedHellhound Constructor!");
            this.a = "the ";
            this.short = "infested hellhound";
            this.imageName = "infestedhellhound";
            this.long = "It looks like a large four-legged demon with two heads placed side-by-side. Its eyes and mouth are filled with flames, and covering each of its paws are large and menacing claws. A thick layer of dark fur covers his entire body like armor.  Both heads are looking at you hungrily as the hellhound circles around you.  A pair of black, slightly pointed cocks hang exposed, dripping with cum and worms.  You get the feeling reasoning with this beast will be impossible.";
            // this.plural = false;
            this.createCock(9, 2);
            this.createCock(9, 2);
            this.balls = 2;
            this.ballSize = 5;
            this.cumMultiplier = 8;
            this.createBreastRow();
            this.createBreastRow();
            this.createBreastRow();
            this.ass.analLooseness = appearanceDefs_1.ANAL_LOOSENESS_NORMAL;
            this.ass.analWetness = appearanceDefs_1.ANAL_WETNESS_NORMAL;
            this.tallness = 47;
            this.hipRating = appearanceDefs_1.HIP_RATING_AVERAGE;
            this.buttRating = appearanceDefs_1.BUTT_RATING_AVERAGE + 1;
            this.skinTone = "black";
            this.skinType = appearanceDefs_1.SKIN_TYPE_FUR;
            //this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_FUR];
            this.hairColor = "red";
            this.hairLength = 3;
            this.initStrTouSpeInte(65, 60, 50, 1);
            this.initLibSensCor(95, 20, 100);
            this.weaponName = "claws";
            this.weaponVerb = "claw";
            this.weaponAttack = 5;
            this.armorName = "thick fur";
            this.lust = 50;
            this.lustVuln = 0.87;
            this.temperment = InfestedHellhound.TEMPERMENT_LOVE_GRAPPLES;
            this.level = 5;
            this.gems = 10 + InfestedHellhound.rand(10);
            this.drop = new WeightedDrop_1.WeightedDrop().add(this.consumables.CANINEP, 3)
                .addMany(1, this.consumables.BULBYPP, this.consumables.KNOTTYP, this.consumables.BLACKPP, this.consumables.DBLPEPP, this.consumables.LARGEPP);
            this.special1 = this.hellhoundFire;
            this.special2 = this.hellhoundScent;
            this.special3 = this.hellHoundWormCannon;
            this.tailType = appearanceDefs_1.TAIL_TYPE_DOG;
            this.checkMonster();
        }
    }
    exports.InfestedHellhound = InfestedHellhound;
});
//# sourceMappingURL=InfestedHellhound.js.map