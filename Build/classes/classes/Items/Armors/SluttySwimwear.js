define(["require", "exports", "./ArmorWithPerk", "../../PerkLib"], function (require, exports, ArmorWithPerk_1, PerkLib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 18.01.14.
     */
    class SluttySwimwear extends ArmorWithPerk_1.ArmorWithPerk {
        constructor() {
            super("S.Swmwr", "S.Swmwr", "slutty swimwear", "a skimpy black bikini", 0, 6, "An impossibly skimpy black bikini. You feel dirty just looking at it... and a little aroused, actually.", "Light", PerkLib_1.PerkLib.SluttySeduction, 6, 0, 0, 0, "", true);
        }
        useText() {
            this.game.dynStats("lus", 5);
            if (this.game.player.biggestTitSize() < 1)
                this.outputText("You feel rather stupid putting the top part on like this, but you're willing to bear with it. It could certainly be good for distracting.  ");
            else {
                this.outputText("The bikini top clings tightly to your bustline, sending a shiver of pleasure through your body. It serves to turn you on quite nicely.  ");
                this.game.dynStats("lus", 5);
            }
            if (this.game.player.totalCocks() == 0) {
                this.outputText("The thong moves over your smooth groin, clinging onto your buttocks nicely.  ");
                if (this.game.player.balls > 0) {
                    if (this.game.player.ballSize > 5)
                        this.outputText("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + this.game.player.ballsDescriptLight() + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
                    else
                        this.outputText("However, your testicles do serve as an area of discomfort, stretching the material and bulging out the sides slightly.  ");
                }
            }
            else {
                if (this.game.player.totalCocks() == 1) {
                    this.outputText("You grunt in discomfort, your " + this.game.player.cockDescript(0) + " flopping free from the thong's confines. The tight material rubbing against your dick does manage to turn you on slightly.  ");
                }
                else {
                    this.outputText("You grunt in discomfort, your " + this.game.player.multiCockDescriptLight() + " flopping free from the thong's confines. The tight material rubbing against your dicks does manage to turn you on slightly.  ");
                }
                this.game.dynStats("lus", 5);
                if (this.game.player.biggestCockArea() >= 20)
                    this.outputText("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + this.game.player.cockDescript(this.game.player.biggestCockIndex()) + " has popped out of the top, completely exposed.  Maybe if you shrunk your male parts down a little...");
                //[If dick is 7+ inches OR balls are apple-sized]
                else if (this.game.player.ballSize > 5)
                    this.outputText("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + this.game.player.ballsDescriptLight() + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
            }
            this.outputText("\n\n");
        }
    }
    exports.SluttySwimwear = SluttySwimwear;
});
//# sourceMappingURL=SluttySwimwear.js.map