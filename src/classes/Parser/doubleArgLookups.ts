import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";
import { arianLookups, rubiLookups } from "./npcLookups";

// provides rubiLookups and arianLookups
// note that these are only used in doubleArgLookups, not in Parser.as itself
//
// =!= NOTE: MUST BE IMPORTED BEFORE "./doubleArgLookups.as" =!=
// 
//Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.
// include "./npcLookups.as";


// PC ASCII Aspect lookups

export const cockLookups = // For subject: "cock"
{
    "all": function (): any { return kGAMECLASS.player.multiCockDescriptLight(); },
    "each": function (): any { return kGAMECLASS.player.sMultiCockDesc(); },
    "one": function (): any { return kGAMECLASS.player.oMultiCockDesc(); },
    "largest": function (): any { return kGAMECLASS.player.cockDescript(kGAMECLASS.player.biggestCockIndex()); },
    "biggest": function (): any { return kGAMECLASS.player.cockDescript(kGAMECLASS.player.biggestCockIndex()); },
    "biggest2": function (): any { return kGAMECLASS.player.cockDescript(kGAMECLASS.player.biggestCockIndex2()); },
    "biggest3": function (): any { return kGAMECLASS.player.cockDescript(kGAMECLASS.player.biggestCockIndex3()); },
    "smallest": function (): any { return kGAMECLASS.player.cockDescript(kGAMECLASS.player.smallestCockIndex()); },
    "smallest2": function (): any { return kGAMECLASS.player.cockDescript(kGAMECLASS.player.smallestCockIndex2()); },
    "longest": function (): any { return kGAMECLASS.player.cockDescript(kGAMECLASS.player.longestCock()); },
    "shortest": function (): any { return kGAMECLASS.player.cockDescript(kGAMECLASS.player.shortestCockIndex()); }
}


export const cockHeadLookups = // For subject: "cockHead"
{
    "biggest": function (): any { return kGAMECLASS.player.cockHead(kGAMECLASS.player.biggestCockIndex()); },
    "biggest2": function (): any { return kGAMECLASS.player.cockHead(kGAMECLASS.player.biggestCockIndex2()); },
    "biggest3": function (): any { return kGAMECLASS.player.cockHead(kGAMECLASS.player.biggestCockIndex3()); },
    "largest": function (): any { return kGAMECLASS.player.cockHead(kGAMECLASS.player.biggestCockIndex()); },
    "smallest": function (): any { return kGAMECLASS.player.cockHead(kGAMECLASS.player.smallestCockIndex()); },
    "smallest2": function (): any { return kGAMECLASS.player.cockHead(kGAMECLASS.player.smallestCockIndex2()); },
    "longest": function (): any { return kGAMECLASS.player.cockHead(kGAMECLASS.player.longestCock()); },			// the *head* of a cock has a length? Wut?
    "shortest": function (): any { return kGAMECLASS.player.cockHead(kGAMECLASS.player.shortestCockIndex()); }
}


// These tags take a two-word tag with a **numberic** attribute for lookup.
// [object NUMERIC-attribute]
// if "NUMERIC-attribute" can be cast to a Number, the parser looks for "object" in twoWordNumericTagsLookup.
// If it finds twoWordNumericTagsLookup["object"], it calls the anonymous function stored with said key "object"
// like so: twoWordNumericTagsLookup["object"](Number("NUMERIC-attribute"))
//
// if attribute cannot be case to a number, the parser looks for "object" in twoWordTagsLookup.
export const twoWordNumericTagsLookup: Record<string, any> =
{
    "cockfit":
        function (thisPtr: any, aspect: any): any {
            if (!kGAMECLASS.player.hasCock()) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                if (kGAMECLASS.player.cockThatFits(aspect) >= 0) return kGAMECLASS.player.cockDescript(kGAMECLASS.player.cockThatFits(aspect));
                else return kGAMECLASS.player.cockDescript(kGAMECLASS.player.smallestCockIndex());
            }
        },
    "cockfit2":
        function (thisPtr: any, aspect: any): any {
            if (!kGAMECLASS.player.hasCock()) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                if (kGAMECLASS.player.cockThatFits2(aspect) >= 0) return kGAMECLASS.player.cockDescript(kGAMECLASS.player.cockThatFits2(aspect));
                else return kGAMECLASS.player.cockDescript(kGAMECLASS.player.smallestCockIndex());
            }
        },
    "cockheadfit":
        function (thisPtr: any, aspect: any): any {
            if (!kGAMECLASS.player.hasCock()) {
                return "<b>(Attempt to parse cockhead when none present.)</b>";
            }
            else {
                if (kGAMECLASS.player.cockThatFits(aspect) >= 0) return kGAMECLASS.player.cockHead(kGAMECLASS.player.cockThatFits(aspect));
                else return kGAMECLASS.player.cockHead(kGAMECLASS.player.smallestCockIndex());
            }
        },
    "cockheadfit2":
        function (thisPtr: any, aspect: any): any {
            if (!kGAMECLASS.player.hasCock()) return "<b>(Attempt to parse cockhead when none present.)</b>";
            else {
                if (kGAMECLASS.player.cockThatFits2(aspect) >= 0) return kGAMECLASS.player.cockHead(kGAMECLASS.player.cockThatFits2(aspect));
                else return kGAMECLASS.player.cockHead(kGAMECLASS.player.smallestCockIndex());
            }
        },
    "cock":
        function (thisPtr: any, aspect: any): any {
            if (!kGAMECLASS.player.hasCock()) return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                if (aspect - 1 >= 0 && aspect - 1 < kGAMECLASS.player.cockTotal()) return kGAMECLASS.player.cockDescript(aspect - 1);
                else return "<b>(Attempt To Parse CockDescript for Invalid Cock)</b>";
            }
        },
    "cockhead":
        function (thisPtr: any, aspect: any): any {
            if (!kGAMECLASS.player.hasCock()) return "<b>(Attempt to parse cockHead when none present.)</b>";
            else {
                var intAspect: number = Math.floor(aspect - 1);
                if (intAspect >= 0 && intAspect < kGAMECLASS.player.cockTotal()) return kGAMECLASS.player.cockHead(intAspect);
                else return "<b>(Attempt To Parse CockHeadDescript for Invalid Cock)</b>";
            }
        }

}

// These tags take an ascii attribute for lookup.
// [object attribute]
// if attribute cannot be cast to a number, the parser looks for "object" in twoWordTagsLookup,
// and then uses the corresponding object to determine the value of "attribute", by looking for
// "attribute" twoWordTagsLookup["object"]["attribute"]
export const twoWordTagsLookup: Record<string, any> =
{
    // NPCs:
    "rubi": rubiLookups,
    "arian": arianLookups,

    // PC Attributes:

    "cock": cockLookups,
    "cockhead": cockHeadLookups
}
