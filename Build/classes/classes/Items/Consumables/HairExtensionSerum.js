define(["require", "exports", "../Consumable", "../../GlobalFlags/kFLAGS"], function (require, exports, Consumable_1, kFLAGS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 11.01.14.
     */
    class HairExtensionSerum extends Consumable_1.Consumable {
        constructor() {
            super("ExtSerm", "ExtSerm", "a bottle of hair extension serum", 6, "This is a bottle of foamy pink liquid, purported by the label to increase the speed at which the user's hair grows.");
        }
        canUse() {
            if (this.game.flags[kFLAGS_1.kFLAGS.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED] <= 2)
                return true;
            this.outputText("<b>No way!</b>  Your head itches like mad from using the rest of these, and you will NOT use another.\n");
            return false;
        }
        useItem() {
            this.outputText("You open the bottle of hair extension serum and follow the directions carefully, massaging it into your scalp and being careful to keep it from getting on any other skin.  You wash off your hands with lakewater just to be sure.");
            if (this.game.flags[kFLAGS_1.kFLAGS.INCREASED_HAIR_GROWTH_TIME_REMAINING] <= 0) {
                this.outputText("\n\nThe tingling on your head lets you know that it's working!");
                this.game.flags[kFLAGS_1.kFLAGS.INCREASED_HAIR_GROWTH_TIME_REMAINING] = 7;
                this.game.flags[kFLAGS_1.kFLAGS.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED] = 1;
            }
            else if (this.game.flags[kFLAGS_1.kFLAGS.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED] == 1) {
                this.outputText("\n\nThe tingling intensifies, nearly making you feel like tiny invisible faeries are massaging your scalp.");
                this.game.flags[kFLAGS_1.kFLAGS.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED]++;
            }
            else if (this.game.flags[kFLAGS_1.kFLAGS.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED] == 2) {
                this.outputText("\n\nThe tingling on your scalp is intolerable!  It's like your head is a swarm of angry ants, though you could swear your hair is growing so fast that you can feel it weighing you down more and more!");
                this.game.flags[kFLAGS_1.kFLAGS.INCREASED_HAIR_GROWTH_SERUM_TIMES_APPLIED]++;
            }
            if (this.game.flags[kFLAGS_1.kFLAGS.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] > 0 && this.game.player.hairType != 4) {
                this.game.flags[kFLAGS_1.kFLAGS.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] = 0;
                this.outputText("\n\n<b>Somehow you know that your " + this.game.player.hairDescript() + " is growing again.</b>");
            }
            if (this.game.flags[kFLAGS_1.kFLAGS.INCREASED_HAIR_GROWTH_TIME_REMAINING] < 7)
                this.game.flags[kFLAGS_1.kFLAGS.INCREASED_HAIR_GROWTH_TIME_REMAINING] = 7;
            return (false);
        }
    }
    exports.HairExtensionSerum = HairExtensionSerum;
});
//# sourceMappingURL=HairExtensionSerum.js.map