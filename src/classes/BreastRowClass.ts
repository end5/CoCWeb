import { Utils } from "./internals/Utils";

export class BreastRowClass {
    // constructor

    public breasts = 2;
    public nipplesPerBreast = 1;
    public breastRating = 0;
    public lactationMultiplier = 0;
    // Fullness used for lactation....if 75 or greater warning bells start going off!
    // If it reaches 100 it reduces lactation multiplier.
    public milkFullness = 0;
    public fullness = 0;
    public fuckable = false;

    public validate(): string {
        let error = "";
        error += Utils.validateNonNegativeNumberFields(this, "BreastRowClass.validate", [
            "breasts",
            "nipplesPerBreast",
            "breastRating",
            "lactationMultiplier",
            "milkFullness",
            "fullness",
        ]);
        return error;
    }
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
