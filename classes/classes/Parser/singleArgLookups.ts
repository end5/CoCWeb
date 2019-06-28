import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";
import { kFLAGS } from "../GlobalFlags/kFLAGS";


// Lookup dictionary for converting any single argument brackets into it's corresponding string
// basically [armor] results in the "[armor]" segment of the string being replaced with the
// results of the corresponding anonymous function, in this case: function(): any {return player.armorName;}
// tags not present in the singleArgConverters object return an error message.
//
//Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.

export const singleArgConverters: Record<string, any> =
{
    // all the errors related to trying to parse stuff if not present are
    // already handled in the various *Descript() functions.
    // no need to duplicate them.

    // Note: all key strings MUST be ENTIRELY lowercase.

    "agility": function (): any { return "[Agility]"; },
    "armor": function (): any { return kGAMECLASS.player.armorName; },
    "armorname": function (): any { return kGAMECLASS.player.armorName; },
    "ass": function (): any { return kGAMECLASS.buttDescript(); },
    "asshole": function (): any { return kGAMECLASS.assholeDescript(); },
    "balls": function (): any { return kGAMECLASS.ballsDescriptLight(); },
    "boyfriend": function (): any { return kGAMECLASS.player.mf("boyfriend", "girlfriend"); },
    "butt": function (): any { return kGAMECLASS.buttDescript(); },
    "butthole": function (): any { return kGAMECLASS.assholeDescript(); },
    "chest": function (): any { return kGAMECLASS.chestDesc(); },
    "clit": function (): any { return kGAMECLASS.clitDescript(); },
    "cock": function (): any { return kGAMECLASS.player.cockDescript(0); },
    "cockhead": function (): any { return kGAMECLASS.player.cockHead(0); },
    "cocks": function (): any { return kGAMECLASS.player.multiCockDescriptLight(); },
    "cunt": function (): any { return kGAMECLASS.vaginaDescript(); },
    "eachcock": function (): any { return kGAMECLASS.player.sMultiCockDesc(); },
    "evade": function (): any { return "[Evade]"; },
    "face": function (): any { return kGAMECLASS.player.face(); },
    "feet": function (): any { return kGAMECLASS.player.feet(); },
    "foot": function (): any { return kGAMECLASS.player.foot(); },
    "fullchest": function (): any { return kGAMECLASS.player.allChestDesc(); },
    "hair": function (): any { return kGAMECLASS.hairDescript(); },
    "hairorfur": function (): any { return kGAMECLASS.hairOrFur(); },
    "he": function (): any { return kGAMECLASS.player.mf("he", "she"); },
    "he2": function (): any { return kGAMECLASS.player2.mf("he", "she"); },
    "him": function (): any { return kGAMECLASS.player.mf("him", "her"); },
    "him2": function (): any { return kGAMECLASS.player2.mf("him", "her"); },
    "himher": function (): any { return kGAMECLASS.player.mf("him", "her"); },
    "himself": function (): any { return kGAMECLASS.player.mf("himself", "herself"); },
    "herself": function (): any { return kGAMECLASS.player.mf("himself", "herself"); },
    "hips": function (): any { return kGAMECLASS.hipDescript(); },
    "his": function (): any { return kGAMECLASS.player.mf("his", "her"); },
    "hisher": function (): any { return kGAMECLASS.player.mf("his", "her"); },
    "his2": function (): any { return kGAMECLASS.player2.mf("his", "her"); },
    "leg": function (): any { return kGAMECLASS.player.leg(); },
    "legs": function (): any { return kGAMECLASS.player.legs(); },
    "man": function (): any { return kGAMECLASS.player.mf("man", "woman"); },
    "men": function (): any { return kGAMECLASS.player.mf("men", "women"); },
    "master": function (): any { return kGAMECLASS.player.mf("master", "mistress"); },
    "misdirection": function (): any { return "[Misdirection]"; },
    "multicock": function (): any { return kGAMECLASS.player.multiCockDescriptLight(); },
    "multicockdescriptlight": function (): any { return kGAMECLASS.player.multiCockDescriptLight(); },
    "name": function (): any { return kGAMECLASS.player.short; },
    "nipple": function (): any { return kGAMECLASS.nippleDescript(0); },
    "nipples": function (): any { return kGAMECLASS.nippleDescript(0) + "s"; },
    "onecock": function (): any { return kGAMECLASS.player.oMultiCockDesc(); },
    "pg": function (): any { return "\n\n"; },
    "pussy": function (): any { return kGAMECLASS.vaginaDescript(); },
    "race": function (): any { return kGAMECLASS.player.race(); },
    "sack": function (): any { return kGAMECLASS.sackDescript(); },
    "sheath": function (): any { return kGAMECLASS.player.sheathDescription(); },
    "skin": function (): any { return kGAMECLASS.player.skin(); },
    "skinfurscales": function (): any { return kGAMECLASS.player.skinFurScales(); },
    "teasetext": function (): any { return kGAMECLASS.teaseText(); },
    "tongue": function (): any { return kGAMECLASS.tongueDescript(); },
    "vag": function (): any { return kGAMECLASS.vaginaDescript(); },
    "vagina": function (): any { return kGAMECLASS.vaginaDescript(); },
    "vagorass": function (): any { return (kGAMECLASS.player.hasVagina() ? kGAMECLASS.vaginaDescript() : kGAMECLASS.assholeDescript()); },
    "weapon": function (): any { return kGAMECLASS.player.weaponName; },
    "weaponname": function (): any { return kGAMECLASS.player.weaponName; },

    "latexyname": function (): any { return kGAMECLASS.flags[kFLAGS.GOO_NAME]; },
    "bathgirlname": function (): any { return kGAMECLASS.flags[kFLAGS.MILK_NAME]; },
    "cockplural": function (): any { return (kGAMECLASS.player.cocks.length == 1) ? "cock" : "cocks"; },
    "dickplural": function (): any { return (kGAMECLASS.player.cocks.length == 1) ? "dick" : "dicks"; },
    "headplural": function (): any { return (kGAMECLASS.player.cocks.length == 1) ? "head" : "heads"; },
    "prickplural": function (): any { return (kGAMECLASS.player.cocks.length == 1) ? "prick" : "pricks"; },
    "boy": function (): any { return kGAMECLASS.player.mf("boy", "girl"); },
    "guy": function (): any { return kGAMECLASS.player.mf("guy", "girl"); },
    "wings": function (): any { return kGAMECLASS.wingsDescript(); },
    "tail": function (): any { return kGAMECLASS.tailDescript(); },
    "onetail": function (): any { return kGAMECLASS.oneTailDescript(); }

}
