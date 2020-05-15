import { kFLAGS } from "../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";

// Lookup dictionary for converting any single argument brackets into it's corresponding string
// basically [armor] results in the "[armor]" segment of the string being replaced with the
// results of the corresponding anonymous function, in this case: function(): any {return player.armorName;}
// tags not present in the singleArgConverters object return an error message.
//
// Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.

export const singleArgConverters: Record<string, any> = {
    // all the errors related to trying to parse stuff if not present are
    // already handled in the various *Descript() functions.
    // no need to duplicate them.

    // Note: all key strings MUST be ENTIRELY lowercase.

    agility(): any {
        return "[Agility]";
    },
    armor(): any {
        return kGAMECLASS.player.armorName;
    },
    armorname(): any {
        return kGAMECLASS.player.armorName;
    },
    ass(): any {
        return kGAMECLASS.buttDescript();
    },
    asshole(): any {
        return kGAMECLASS.assholeDescript();
    },
    balls(): any {
        return kGAMECLASS.ballsDescriptLight();
    },
    boyfriend(): any {
        return kGAMECLASS.player.mf("boyfriend", "girlfriend");
    },
    butt(): any {
        return kGAMECLASS.buttDescript();
    },
    butthole(): any {
        return kGAMECLASS.assholeDescript();
    },
    chest(): any {
        return kGAMECLASS.chestDesc();
    },
    clit(): any {
        return kGAMECLASS.clitDescript();
    },
    cock(): any {
        return kGAMECLASS.player.cockDescript(0);
    },
    cockhead(): any {
        return kGAMECLASS.player.cockHead(0);
    },
    cocks(): any {
        return kGAMECLASS.player.multiCockDescriptLight();
    },
    cunt(): any {
        return kGAMECLASS.vaginaDescript();
    },
    eachcock(): any {
        return kGAMECLASS.player.sMultiCockDesc();
    },
    evade(): any {
        return "[Evade]";
    },
    face(): any {
        return kGAMECLASS.player.face();
    },
    feet(): any {
        return kGAMECLASS.player.feet();
    },
    foot(): any {
        return kGAMECLASS.player.foot();
    },
    fullchest(): any {
        return kGAMECLASS.player.allChestDesc();
    },
    hair(): any {
        return kGAMECLASS.hairDescript();
    },
    hairorfur(): any {
        return kGAMECLASS.hairOrFur();
    },
    he(): any {
        return kGAMECLASS.player.mf("he", "she");
    },
    he2(): any {
        return kGAMECLASS.player2.mf("he", "she");
    },
    him(): any {
        return kGAMECLASS.player.mf("him", "her");
    },
    him2(): any {
        return kGAMECLASS.player2.mf("him", "her");
    },
    himher(): any {
        return kGAMECLASS.player.mf("him", "her");
    },
    himself(): any {
        return kGAMECLASS.player.mf("himself", "herself");
    },
    herself(): any {
        return kGAMECLASS.player.mf("himself", "herself");
    },
    hips(): any {
        return kGAMECLASS.hipDescript();
    },
    his(): any {
        return kGAMECLASS.player.mf("his", "her");
    },
    hisher(): any {
        return kGAMECLASS.player.mf("his", "her");
    },
    his2(): any {
        return kGAMECLASS.player2.mf("his", "her");
    },
    leg(): any {
        return kGAMECLASS.player.leg();
    },
    legs(): any {
        return kGAMECLASS.player.legs();
    },
    man(): any {
        return kGAMECLASS.player.mf("man", "woman");
    },
    men(): any {
        return kGAMECLASS.player.mf("men", "women");
    },
    master(): any {
        return kGAMECLASS.player.mf("master", "mistress");
    },
    misdirection(): any {
        return "[Misdirection]";
    },
    multicock(): any {
        return kGAMECLASS.player.multiCockDescriptLight();
    },
    multicockdescriptlight(): any {
        return kGAMECLASS.player.multiCockDescriptLight();
    },
    name(): any {
        return kGAMECLASS.player.short;
    },
    nipple(): any {
        return kGAMECLASS.nippleDescript(0);
    },
    nipples(): any {
        return `${kGAMECLASS.nippleDescript(0)}s`;
    },
    onecock(): any {
        return kGAMECLASS.player.oMultiCockDesc();
    },
    pg(): any {
        return "\n\n";
    },
    pussy(): any {
        return kGAMECLASS.vaginaDescript();
    },
    race(): any {
        return kGAMECLASS.player.race();
    },
    sack(): any {
        return kGAMECLASS.sackDescript();
    },
    sheath(): any {
        return kGAMECLASS.player.sheathDescription();
    },
    skin(): any {
        return kGAMECLASS.player.skin();
    },
    skinfurscales(): any {
        return kGAMECLASS.player.skinFurScales();
    },
    teasetext(): any {
        return kGAMECLASS.teaseText();
    },
    tongue(): any {
        return kGAMECLASS.tongueDescript();
    },
    vag(): any {
        return kGAMECLASS.vaginaDescript();
    },
    vagina(): any {
        return kGAMECLASS.vaginaDescript();
    },
    vagorass(): any {
        return kGAMECLASS.player.hasVagina()
            ? kGAMECLASS.vaginaDescript()
            : kGAMECLASS.assholeDescript();
    },
    weapon(): any {
        return kGAMECLASS.player.weaponName;
    },
    weaponname(): any {
        return kGAMECLASS.player.weaponName;
    },

    latexyname(): any {
        return kGAMECLASS.flags[kFLAGS.GOO_NAME];
    },
    bathgirlname(): any {
        return kGAMECLASS.flags[kFLAGS.MILK_NAME];
    },
    cockplural(): any {
        return kGAMECLASS.player.cocks.length == 1 ? "cock" : "cocks";
    },
    dickplural(): any {
        return kGAMECLASS.player.cocks.length == 1 ? "dick" : "dicks";
    },
    headplural(): any {
        return kGAMECLASS.player.cocks.length == 1 ? "head" : "heads";
    },
    prickplural(): any {
        return kGAMECLASS.player.cocks.length == 1 ? "prick" : "pricks";
    },
    boy(): any {
        return kGAMECLASS.player.mf("boy", "girl");
    },
    guy(): any {
        return kGAMECLASS.player.mf("guy", "girl");
    },
    wings(): any {
        return kGAMECLASS.wingsDescript();
    },
    tail(): any {
        return kGAMECLASS.tailDescript();
    },
    onetail(): any {
        return kGAMECLASS.oneTailDescript();
    },
};
