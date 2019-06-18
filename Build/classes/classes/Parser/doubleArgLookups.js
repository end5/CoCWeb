define(["require", "exports", "../GlobalFlags/kGAMECLASS", "./npcLookups"], function (require, exports, kGAMECLASS_1, npcLookups_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // provides rubiLookups and arianLookups
    // note that these are only used in doubleArgLookups, not in Parser.as itself
    //
    // =!= NOTE: MUST BE IMPORTED BEFORE "./doubleArgLookups.as" =!=
    // 
    //Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.
    // include "./npcLookups.as";
    // PC ASCII Aspect lookups
    exports.cockLookups = {
        "all": function () { return kGAMECLASS_1.kGAMECLASS.player.multiCockDescriptLight(); },
        "each": function () { return kGAMECLASS_1.kGAMECLASS.player.sMultiCockDesc(); },
        "one": function () { return kGAMECLASS_1.kGAMECLASS.player.oMultiCockDesc(); },
        "largest": function () { return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.biggestCockIndex()); },
        "biggest": function () { return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.biggestCockIndex()); },
        "biggest2": function () { return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.biggestCockIndex2()); },
        "biggest3": function () { return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.biggestCockIndex3()); },
        "smallest": function () { return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.smallestCockIndex()); },
        "smallest2": function () { return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.smallestCockIndex2()); },
        "longest": function () { return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.longestCock()); },
        "shortest": function () { return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.shortestCockIndex()); }
    };
    exports.cockHeadLookups = {
        "biggest": function () { return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.biggestCockIndex()); },
        "biggest2": function () { return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.biggestCockIndex2()); },
        "biggest3": function () { return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.biggestCockIndex3()); },
        "largest": function () { return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.biggestCockIndex()); },
        "smallest": function () { return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.smallestCockIndex()); },
        "smallest2": function () { return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.smallestCockIndex2()); },
        "longest": function () { return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.longestCock()); },
        "shortest": function () { return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.shortestCockIndex()); }
    };
    // These tags take a two-word tag with a **numberic** attribute for lookup.
    // [object NUMERIC-attribute]
    // if "NUMERIC-attribute" can be cast to a Number, the parser looks for "object" in twoWordNumericTagsLookup.
    // If it finds twoWordNumericTagsLookup["object"], it calls the anonymous function stored with said key "object"
    // like so: twoWordNumericTagsLookup["object"](Number("NUMERIC-attribute"))
    //
    // if attribute cannot be case to a number, the parser looks for "object" in twoWordTagsLookup.
    exports.twoWordNumericTagsLookup = {
        "cockfit": function (thisPtr, aspect) {
            if (!kGAMECLASS_1.kGAMECLASS.player.hasCock())
                return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                if (kGAMECLASS_1.kGAMECLASS.player.cockThatFits(aspect) >= 0)
                    return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.cockThatFits(aspect));
                else
                    return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.smallestCockIndex());
            }
        },
        "cockfit2": function (thisPtr, aspect) {
            if (!kGAMECLASS_1.kGAMECLASS.player.hasCock())
                return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                if (kGAMECLASS_1.kGAMECLASS.player.cockThatFits2(aspect) >= 0)
                    return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.cockThatFits2(aspect));
                else
                    return kGAMECLASS_1.kGAMECLASS.player.cockDescript(kGAMECLASS_1.kGAMECLASS.player.smallestCockIndex());
            }
        },
        "cockheadfit": function (thisPtr, aspect) {
            if (!kGAMECLASS_1.kGAMECLASS.player.hasCock()) {
                return "<b>(Attempt to parse cockhead when none present.)</b>";
            }
            else {
                if (kGAMECLASS_1.kGAMECLASS.player.cockThatFits(aspect) >= 0)
                    return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.cockThatFits(aspect));
                else
                    return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.smallestCockIndex());
            }
        },
        "cockheadfit2": function (thisPtr, aspect) {
            if (!kGAMECLASS_1.kGAMECLASS.player.hasCock())
                return "<b>(Attempt to parse cockhead when none present.)</b>";
            else {
                if (kGAMECLASS_1.kGAMECLASS.player.cockThatFits2(aspect) >= 0)
                    return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.cockThatFits2(aspect));
                else
                    return kGAMECLASS_1.kGAMECLASS.player.cockHead(kGAMECLASS_1.kGAMECLASS.player.smallestCockIndex());
            }
        },
        "cock": function (thisPtr, aspect) {
            if (!kGAMECLASS_1.kGAMECLASS.player.hasCock())
                return "<b>(Attempt to parse cock when none present.)</b>";
            else {
                if (aspect - 1 >= 0 && aspect - 1 < kGAMECLASS_1.kGAMECLASS.player.cockTotal())
                    return kGAMECLASS_1.kGAMECLASS.player.cockDescript(aspect - 1);
                else
                    return "<b>(Attempt To Parse CockDescript for Invalid Cock)</b>";
            }
        },
        "cockhead": function (thisPtr, aspect) {
            if (!kGAMECLASS_1.kGAMECLASS.player.hasCock())
                return "<b>(Attempt to parse cockHead when none present.)</b>";
            else {
                var intAspect = Math.floor(aspect - 1);
                if (intAspect >= 0 && intAspect < kGAMECLASS_1.kGAMECLASS.player.cockTotal())
                    return kGAMECLASS_1.kGAMECLASS.player.cockHead(intAspect);
                else
                    return "<b>(Attempt To Parse CockHeadDescript for Invalid Cock)</b>";
            }
        }
    };
    // These tags take an ascii attribute for lookup.
    // [object attribute]
    // if attribute cannot be cast to a number, the parser looks for "object" in twoWordTagsLookup,
    // and then uses the corresponding object to determine the value of "attribute", by looking for
    // "attribute" twoWordTagsLookup["object"]["attribute"]
    exports.twoWordTagsLookup = {
        // NPCs:
        "rubi": npcLookups_1.rubiLookups,
        "arian": npcLookups_1.arianLookups,
        // PC Attributes:
        "cock": exports.cockLookups,
        "cockhead": exports.cockHeadLookups
    };
});
//# sourceMappingURL=doubleArgLookups.js.map