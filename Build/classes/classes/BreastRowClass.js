define(["require", "exports", "./internals/Utils"], function (require, exports, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BreastRowClass {
        constructor() {
            //constructor
            this.breasts = 2;
            this.nipplesPerBreast = 1;
            this.breastRating = 0;
            this.lactationMultiplier = 0;
            //Fullness used for lactation....if 75 or greater warning bells start going off!
            //If it reaches 100 it reduces lactation multiplier.
            this.milkFullness = 0;
            this.fullness = 0;
            this.fuckable = false;
            /*
            0 - manchest
            1 - A cup
            2 - B cup
            3 - C cup
            4 - D cup
            5 - DD cup
            6 - E cup
            7 - F cup
            8 - G cup
            9 - GG cup
            10 - H
            11 - HH cup
            12 - HHH cup
            13 - beachball sized
            14 - ???*/
        }
        validate() {
            var error = "";
            error += Utils_1.Utils.validateNonNegativeNumberFields(this, "BreastRowClass.validate", [
                "breasts", "nipplesPerBreast", "breastRating", "lactationMultiplier",
                "milkFullness", "fullness"
            ]);
            return error;
        }
    }
    exports.BreastRowClass = BreastRowClass;
});
//# sourceMappingURL=BreastRowClass.js.map