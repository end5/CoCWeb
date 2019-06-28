define(["require", "exports", "../GlobalFlags/kGAMECLASS", "../GlobalFlags/kFLAGS"], function (require, exports, kGAMECLASS_1, kFLAGS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Lookup dictionary for converting any single argument brackets into it's corresponding string
    // basically [armor] results in the "[armor]" segment of the string being replaced with the
    // results of the corresponding anonymous function, in this case: function(): any {return player.armorName;}
    // tags not present in the singleArgConverters object return an error message.
    //
    //Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.
    exports.singleArgConverters = {
        // all the errors related to trying to parse stuff if not present are
        // already handled in the various *Descript() functions.
        // no need to duplicate them.
        // Note: all key strings MUST be ENTIRELY lowercase.
        "agility": function () { return "[Agility]"; },
        "armor": function () { return kGAMECLASS_1.kGAMECLASS.player.armorName; },
        "armorname": function () { return kGAMECLASS_1.kGAMECLASS.player.armorName; },
        "ass": function () { return kGAMECLASS_1.kGAMECLASS.buttDescript(); },
        "asshole": function () { return kGAMECLASS_1.kGAMECLASS.assholeDescript(); },
        "balls": function () { return kGAMECLASS_1.kGAMECLASS.ballsDescriptLight(); },
        "boyfriend": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("boyfriend", "girlfriend"); },
        "butt": function () { return kGAMECLASS_1.kGAMECLASS.buttDescript(); },
        "butthole": function () { return kGAMECLASS_1.kGAMECLASS.assholeDescript(); },
        "chest": function () { return kGAMECLASS_1.kGAMECLASS.chestDesc(); },
        "clit": function () { return kGAMECLASS_1.kGAMECLASS.clitDescript(); },
        "cock": function () { return kGAMECLASS_1.kGAMECLASS.player.cockDescript(0); },
        "cockhead": function () { return kGAMECLASS_1.kGAMECLASS.player.cockHead(0); },
        "cocks": function () { return kGAMECLASS_1.kGAMECLASS.player.multiCockDescriptLight(); },
        "cunt": function () { return kGAMECLASS_1.kGAMECLASS.vaginaDescript(); },
        "eachcock": function () { return kGAMECLASS_1.kGAMECLASS.player.sMultiCockDesc(); },
        "evade": function () { return "[Evade]"; },
        "face": function () { return kGAMECLASS_1.kGAMECLASS.player.face(); },
        "feet": function () { return kGAMECLASS_1.kGAMECLASS.player.feet(); },
        "foot": function () { return kGAMECLASS_1.kGAMECLASS.player.foot(); },
        "fullchest": function () { return kGAMECLASS_1.kGAMECLASS.player.allChestDesc(); },
        "hair": function () { return kGAMECLASS_1.kGAMECLASS.hairDescript(); },
        "hairorfur": function () { return kGAMECLASS_1.kGAMECLASS.hairOrFur(); },
        "he": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("he", "she"); },
        "he2": function () { return kGAMECLASS_1.kGAMECLASS.player2.mf("he", "she"); },
        "him": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("him", "her"); },
        "him2": function () { return kGAMECLASS_1.kGAMECLASS.player2.mf("him", "her"); },
        "himher": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("him", "her"); },
        "himself": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("himself", "herself"); },
        "herself": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("himself", "herself"); },
        "hips": function () { return kGAMECLASS_1.kGAMECLASS.hipDescript(); },
        "his": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("his", "her"); },
        "hisher": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("his", "her"); },
        "his2": function () { return kGAMECLASS_1.kGAMECLASS.player2.mf("his", "her"); },
        "leg": function () { return kGAMECLASS_1.kGAMECLASS.player.leg(); },
        "legs": function () { return kGAMECLASS_1.kGAMECLASS.player.legs(); },
        "man": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("man", "woman"); },
        "men": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("men", "women"); },
        "master": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("master", "mistress"); },
        "misdirection": function () { return "[Misdirection]"; },
        "multicock": function () { return kGAMECLASS_1.kGAMECLASS.player.multiCockDescriptLight(); },
        "multicockdescriptlight": function () { return kGAMECLASS_1.kGAMECLASS.player.multiCockDescriptLight(); },
        "name": function () { return kGAMECLASS_1.kGAMECLASS.player.short; },
        "nipple": function () { return kGAMECLASS_1.kGAMECLASS.nippleDescript(0); },
        "nipples": function () { return kGAMECLASS_1.kGAMECLASS.nippleDescript(0) + "s"; },
        "onecock": function () { return kGAMECLASS_1.kGAMECLASS.player.oMultiCockDesc(); },
        "pg": function () { return "\n\n"; },
        "pussy": function () { return kGAMECLASS_1.kGAMECLASS.vaginaDescript(); },
        "race": function () { return kGAMECLASS_1.kGAMECLASS.player.race(); },
        "sack": function () { return kGAMECLASS_1.kGAMECLASS.sackDescript(); },
        "sheath": function () { return kGAMECLASS_1.kGAMECLASS.player.sheathDescription(); },
        "skin": function () { return kGAMECLASS_1.kGAMECLASS.player.skin(); },
        "skinfurscales": function () { return kGAMECLASS_1.kGAMECLASS.player.skinFurScales(); },
        "teasetext": function () { return kGAMECLASS_1.kGAMECLASS.teaseText(); },
        "tongue": function () { return kGAMECLASS_1.kGAMECLASS.tongueDescript(); },
        "vag": function () { return kGAMECLASS_1.kGAMECLASS.vaginaDescript(); },
        "vagina": function () { return kGAMECLASS_1.kGAMECLASS.vaginaDescript(); },
        "vagorass": function () { return (kGAMECLASS_1.kGAMECLASS.player.hasVagina() ? kGAMECLASS_1.kGAMECLASS.vaginaDescript() : kGAMECLASS_1.kGAMECLASS.assholeDescript()); },
        "weapon": function () { return kGAMECLASS_1.kGAMECLASS.player.weaponName; },
        "weaponname": function () { return kGAMECLASS_1.kGAMECLASS.player.weaponName; },
        "latexyname": function () { return kGAMECLASS_1.kGAMECLASS.flags[kFLAGS_1.kFLAGS.GOO_NAME]; },
        "bathgirlname": function () { return kGAMECLASS_1.kGAMECLASS.flags[kFLAGS_1.kFLAGS.MILK_NAME]; },
        "cockplural": function () { return (kGAMECLASS_1.kGAMECLASS.player.cocks.length == 1) ? "cock" : "cocks"; },
        "dickplural": function () { return (kGAMECLASS_1.kGAMECLASS.player.cocks.length == 1) ? "dick" : "dicks"; },
        "headplural": function () { return (kGAMECLASS_1.kGAMECLASS.player.cocks.length == 1) ? "head" : "heads"; },
        "prickplural": function () { return (kGAMECLASS_1.kGAMECLASS.player.cocks.length == 1) ? "prick" : "pricks"; },
        "boy": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("boy", "girl"); },
        "guy": function () { return kGAMECLASS_1.kGAMECLASS.player.mf("guy", "girl"); },
        "wings": function () { return kGAMECLASS_1.kGAMECLASS.wingsDescript(); },
        "tail": function () { return kGAMECLASS_1.kGAMECLASS.tailDescript(); },
        "onetail": function () { return kGAMECLASS_1.kGAMECLASS.oneTailDescript(); }
    };
});
//# sourceMappingURL=singleArgLookups.js.map