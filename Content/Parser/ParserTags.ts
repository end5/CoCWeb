import { Dictionary } from 'Engine/Utilities/Dictionary';
import { CharDict } from 'Engine/CharDict';
import { describeButt, describeButthole } from '../Descriptors/ButtDescriptor';
import { describeBalls, describeSack } from '../Descriptors/BallsDescriptor';
import { mf } from '../Descriptors/GenderDescriptor';
import { describeChest, describeNipple, describeAllChest } from '../Descriptors/BreastDescriptor';
import { describeClit, describeVagina } from '../Descriptors/VaginaDescriptor';
import { describeCock, describeCockHead, describeCocksLight, describeOneOfYourCocks, describeEachOfYourCocks, describeCockSheath } from '../Descriptors/CockDescriptor';
import { describeFaceShort, describeTongue } from '../Descriptors/FaceDescriptor';
import { describeFeet, describeFoot, describeLeg, describeLegs } from '../Descriptors/LegDescriptor';
import { describeHair, hairOrFur } from '../Descriptors/HairDescriptor';
import { describeHips } from '../Descriptors/HipDescriptor';
import { describeRace } from '../Descriptors/BodyDescriptor';
import { describeSkin, skinFurScales } from '../Descriptors/SkinDescriptor';
import { BreastRow } from 'Engine/Body/BreastRow';
import { Time } from 'Engine/Utilities/Time';
import { Womb } from 'Engine/Body/Pregnancy/Womb';
import { Cock } from 'Engine/Body/Cock';
import { Character } from 'Engine/Character/Character';

type ParserFunc = (...args: any[]) => string | number | boolean;

export const ParserFuncTags = new Dictionary<string, ParserFunc>();
export const ParserCondTags = new Dictionary<string, ParserFunc>();

ParserFuncTags.set("color:", (colorName: string, ...other: any[]) => `<span style="color:${colorName}">${other.join(' ')}</span>`);
ParserFuncTags.set("say:", (...other: any[]) => `<i>"${other.join(' ')}"</i>`);
ParserFuncTags.set("b:", (...other: any[]) => `<b>${other.join(' ')}</b>`);
ParserFuncTags.set("i:", (...other: any[]) => `<i>${other.join(' ')}</i>`);
ParserFuncTags.set("u:", (...other: any[]) => `<u>${other.join(' ')}</u>`);

type PlayerParserFunc = (player: Character, ...args: any[]) => string | number | boolean;

function wrapper(func: PlayerParserFunc): ParserFunc {
    return (...args: any[]) => {
        if (CharDict.player) return func(CharDict.player, ...args);
        return 'Error: Player does not exist';
    };
}

// Single arg
ParserFuncTags.set("agility", () => "[Agility]");
ParserFuncTags.set("armor", wrapper((player: Character) => player.inventory.armor.displayName));
ParserFuncTags.set("armorname", wrapper((player: Character) => player.inventory.armor.displayName));
ParserFuncTags.set("ass", wrapper((player: Character) => describeButt(player)));
ParserFuncTags.set("asshole", wrapper((player: Character) => describeButthole(player.body.butt)));
ParserFuncTags.set("balls", wrapper((player: Character) => describeBalls(true, true, player)));
ParserFuncTags.set("boyfriend", wrapper((player: Character) => mf(player, "boyfriend", "girlfriend")));
ParserFuncTags.set("butt", wrapper((player: Character) => describeButt(player)));
ParserFuncTags.set("butthole", wrapper((player: Character) => describeButthole(player.body.butt)));
ParserFuncTags.set("chest", wrapper((player: Character) => describeChest(player)));
ParserFuncTags.set("clit", wrapper((player: Character) => describeClit(player)));
ParserFuncTags.set("cock", wrapper((player: Character, arg: string, ...args: any[]) => {
    if (player.body.cocks.length <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
    if (ParserFuncTags.get(arg) !== undefined)
        return ParserFuncTags.get(arg)!(player, args);
    if (typeof arg === "number") {
        if (arg - 1 >= 0 && arg - 1 < player.body.cocks.length)
            return describeCock(player, player.body.cocks.get(arg - 1));
        else
            return "<b>(Attempt To Parse CockDescript for Invalid Cock)</b>";
    }
    return describeCock(player, player.body.cocks.get(0));
}));
ParserFuncTags.set("cockhead", wrapper((player: Character, arg: string, ...args: any[]) => {
    if (player.body.cocks.length <= 0)
        return "<b>(Attempt to parse cockHead when none present.)</b>";
    if (ParserFuncTags.get(arg) !== undefined)
        return ParserFuncTags.get(arg)!(player, args);
    if (typeof arg === "number") {
        const numOffset: number = Math.floor(arg - 1);
        if (numOffset >= 0 && numOffset < player.body.cocks.length)
            return describeCockHead(player.body.cocks.get(numOffset));
        else
            return "<b>(Attempt To Parse CockHeadDescript for Invalid Cock)</b>";
    }
    return describeCockHead(player.body.cocks.get(0));
}));
ParserFuncTags.set("cocks", wrapper((player: Character) => describeCocksLight(player)));
ParserFuncTags.set("cunt", wrapper((player: Character) => describeVagina(player, player.body.vaginas.get(0))));
ParserFuncTags.set("eachcock", wrapper((player: Character) => describeOneOfYourCocks(player)));
ParserFuncTags.set("evade", () => "[Evade]");
ParserFuncTags.set("face", wrapper((player: Character) => describeFaceShort(player)));
ParserFuncTags.set("feet", wrapper((player: Character) => describeFeet(player)));
ParserFuncTags.set("foot", wrapper((player: Character) => describeFoot(player)));
ParserFuncTags.set("fullchest", wrapper((player: Character) => describeAllChest(player)));
ParserFuncTags.set("hair", wrapper((player: Character) => describeHair(player)));
ParserFuncTags.set("hairorfur", wrapper((player: Character) => hairOrFur(player)));
ParserFuncTags.set("he", wrapper((player: Character) => mf(player, "he", "she")));
// "he2": (player: Character) => player2.mf("he", "she"),
ParserFuncTags.set("him", wrapper((player: Character) => mf(player, "him", "her")));
// "him2": (player: Character) => player2.mf("him", "her"),
ParserFuncTags.set("himself", wrapper((player: Character) => mf(player, "himself", "herself")));
ParserFuncTags.set("herself", wrapper((player: Character) => mf(player, "himself", "herself")));
ParserFuncTags.set("hips", wrapper((player: Character) => describeHips(player)));
ParserFuncTags.set("his", wrapper((player: Character) => mf(player, "his", "her")));
// "his2": (player: Character) => player2.mf("his", "her"),
ParserFuncTags.set("leg", wrapper((player: Character) => describeLeg(player)));
ParserFuncTags.set("legs", wrapper((player: Character) => describeLegs(player)));
ParserFuncTags.set("man", wrapper((player: Character) => mf(player, "man", "woman")));
ParserFuncTags.set("men", wrapper((player: Character) => mf(player, "men", "women")));
ParserFuncTags.set("master", wrapper((player: Character) => mf(player, "master", "mistress")));
ParserFuncTags.set("misdirection", () => "[Misdirection]");
ParserFuncTags.set("multicock", wrapper((player: Character) => describeCocksLight(player)));
ParserFuncTags.set("multicockdescriptlight", wrapper((player: Character) => describeCocksLight(player)));
ParserFuncTags.set("name", wrapper((player: Character) => player.desc.name));
ParserFuncTags.set("nipple", wrapper((player: Character) => describeNipple(player, player.body.chest.get(0))));
ParserFuncTags.set("nipples", wrapper((player: Character) => describeNipple(player, player.body.chest.get(0)) + "s"));
ParserFuncTags.set("onecock", wrapper((player: Character) => describeEachOfYourCocks(player)));
ParserFuncTags.set("pg", () => "\n\n");
ParserFuncTags.set("pussy", wrapper((player: Character) => describeVagina(player, player.body.vaginas.get(0))));
ParserFuncTags.set("race", wrapper((player: Character) => describeRace(player)));
ParserFuncTags.set("sack", wrapper((player: Character) => describeSack(player)));
ParserFuncTags.set("sheath", wrapper((player: Character) => describeCockSheath(player.body.cocks.get(0))));
ParserFuncTags.set("skin", wrapper((player: Character) => describeSkin(player)));
ParserFuncTags.set("skinfurscales", wrapper((player: Character) => skinFurScales(player)));
// "teasetext": (player: Character) => teaseText(),
ParserFuncTags.set("tongue", wrapper((player: Character) => describeTongue(player.body.tongue.type)));
ParserFuncTags.set("vag", wrapper((player: Character) => describeVagina(player, player.body.vaginas.get(0))));
ParserFuncTags.set("vagina", wrapper((player: Character) => describeVagina(player, player.body.vaginas.get(0))));
ParserFuncTags.set("vagorass", wrapper((player: Character) => (player.body.vaginas.length > 0 ? describeVagina(player, player.body.vaginas.get(0)) : describeButthole(player.body.butt))));
ParserFuncTags.set("weapon", wrapper((player: Character) => player.inventory.weapon.displayName));
ParserFuncTags.set("weaponname", wrapper((player: Character) => player.inventory.weapon.displayName));
// "latexyname": (player: Character) => undefinedFlags.GOO_NAME,
// "bathgirlname": (player: Character) => undefinedFlags.MILK_NAME,
ParserFuncTags.set("cockplural", wrapper((player: Character) => (player.body.cocks.length === 1) ? "cock" : "cocks"));
ParserFuncTags.set("dickplural", wrapper((player: Character) => (player.body.cocks.length === 1) ? "dick" : "dicks"));
ParserFuncTags.set("headplural", wrapper((player: Character) => (player.body.cocks.length === 1) ? "head" : "heads"));
ParserFuncTags.set("prickplural", wrapper((player: Character) => (player.body.cocks.length === 1) ? "prick" : "pricks"));
ParserFuncTags.set("boy", wrapper((player: Character) => mf(player, "boy", "girl")));
ParserFuncTags.set("guy", wrapper((player: Character) => mf(player, "guy", "girl")));
// "wings": (player: Character) => wingsDescript(),
// "tail": (player: Character) => tailDescript(),
// "onetail": (player: Character) => oneTailDescript(),

// Conditional
ParserCondTags.set("strength", wrapper((player: Character) => player.stats.str));
ParserCondTags.set("toughness", wrapper((player: Character) => player.stats.tou));
ParserCondTags.set("speed", wrapper((player: Character) => player.stats.spe));
ParserCondTags.set("intelligence", wrapper((player: Character) => player.stats.int));
ParserCondTags.set("libido", wrapper((player: Character) => player.stats.lib));
ParserCondTags.set("sensitivity", wrapper((player: Character) => player.stats.sens));
ParserCondTags.set("corruption", wrapper((player: Character) => player.stats.cor));
ParserCondTags.set("fatigue", wrapper((player: Character) => player.stats.fatigue));
ParserCondTags.set("hp", wrapper((player: Character) => player.stats.HP));
ParserCondTags.set("hour", wrapper(() => Time.hour));
ParserCondTags.set("days", wrapper(() => Time.day));
ParserCondTags.set("tallness", wrapper((player: Character) => player.body.tallness));
ParserCondTags.set("hairlength", wrapper((player: Character) => player.body.hair.length));
ParserCondTags.set("femininity", wrapper((player: Character) => player.body.femininity));
ParserCondTags.set("masculinity", wrapper((player: Character) => 100 - player.body.femininity));
ParserCondTags.set("cocks", wrapper((player: Character) => player.body.cocks.length));
ParserCondTags.set("breastrows", wrapper((player: Character) => player.body.chest.length));
ParserCondTags.set("biggesttitsize", wrapper((player: Character) => player.body.chest.sort(BreastRow.Largest).get(0)!.rating));
ParserCondTags.set("vagcapacity", wrapper((player: Character) => player.vaginalCapacity()));
ParserCondTags.set("analcapacity", wrapper((player: Character) => player.analCapacity()));
ParserCondTags.set("balls", wrapper((player: Character) => player.body.balls.count));
ParserCondTags.set("cumquantity", wrapper((player: Character) => player.cumQ()));
ParserCondTags.set("milkquantity", wrapper((player: Character) => player.lactationQ()));
ParserCondTags.set("hasvagina", wrapper((player: Character) => player.body.vaginas.length > 0));
ParserCondTags.set("istaur", wrapper((player: Character) => player.body.legs.isTaur()));
ParserCondTags.set("isnaga", wrapper((player: Character) => player.body.legs.isNaga()));
ParserCondTags.set("isgoo", wrapper((player: Character) => player.body.legs.isGoo()));
ParserCondTags.set("isbiped", wrapper((player: Character) => player.body.legs.isBiped()));
ParserCondTags.set("hasbreasts", wrapper((player: Character) => (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 1)));
ParserCondTags.set("hasballs", wrapper((player: Character) => (player.body.balls.count > 0)));
ParserCondTags.set("hascock", wrapper((player: Character) => player.body.cocks.length > 0));
ParserCondTags.set("isherm", wrapper((player: Character) => (player.gender === 3)));
ParserCondTags.set("cumnormal", wrapper((player: Character) => (player.cumQ() <= 150)));
ParserCondTags.set("cummedium", wrapper((player: Character) => (player.cumQ() > 150 && player.cumQ() <= 350)));
ParserCondTags.set("cumhigh", wrapper((player: Character) => (player.cumQ() > 350 && player.cumQ() <= 1000)));
ParserCondTags.set("cumveryhigh", wrapper((player: Character) => (player.cumQ() > 1000 && player.cumQ() <= 2500)));
ParserCondTags.set("cumextreme", wrapper((player: Character) => (player.cumQ() > 2500)));
ParserCondTags.set("issquirter", wrapper((player: Character) => (player.body.vaginas.get(0)!.wetness >= 4)));
ParserCondTags.set("ispregnant", wrapper((player: Character) => !!(player.body.wombs.find(Womb.Pregnant))));
ParserCondTags.set("isbuttpregnant", wrapper((player: Character) => (player.body.buttWomb.isPregnant())));
ParserCondTags.set("hasnipplecunts", wrapper((player: Character) => !!player.body.chest.find(BreastRow.FuckableNipples)));
ParserCondTags.set("canfly", wrapper((player: Character) => player.canFly()));
ParserCondTags.set("islactating", wrapper((player: Character) => (player.lactationQ() > 0)));
ParserCondTags.set("true", () => true);
ParserCondTags.set("false", () => false);

// Double arg
// For subject: "cock"
ParserFuncTags.set("all", wrapper((player: Character) => describeCocksLight(player)));
ParserFuncTags.set("each", wrapper((player: Character) => describeOneOfYourCocks(player)));
ParserFuncTags.set("one", wrapper((player: Character) => describeEachOfYourCocks(player)));
ParserFuncTags.set("largest", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Largest).get(0))));
ParserFuncTags.set("biggest", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Largest).get(0))));
ParserFuncTags.set("biggest2", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Largest).get(1))));
ParserFuncTags.set("biggest3", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Largest).get(2))));
ParserFuncTags.set("smallest", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Smallest).get(0))));
ParserFuncTags.set("smallest2", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Smallest).get(1))));
ParserFuncTags.set("longest", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Longest).get(0))));
ParserFuncTags.set("shortest", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Shortest).get(0))));

// For subject: "cockHead"
ParserFuncTags.set("biggest", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Largest).get(0))));
ParserFuncTags.set("biggest2", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Largest).get(1))));
ParserFuncTags.set("biggest3", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Largest).get(2))));
ParserFuncTags.set("largest", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Largest).get(0))));
ParserFuncTags.set("smallest", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Smallest).get(0))));
ParserFuncTags.set("smallest2", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Smallest).get(1))));
// the *head* of a cock has a length? Wut?
ParserFuncTags.set("longest", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Longest).get(0))));
ParserFuncTags.set("shortest", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Shortest).get(0))));

// These tags take a two-word tag with a **numberic** attribute for lookup.
// [object NUMERIC-attribute]
// if "NUMERIC-attribute" can be cast to a Number, the parser looks for "object" in twoWordNumericTagsLookup.
// If it finds twoWordNumericTagsLookup["object"], it calls the anonymous function stored with said key "object"
// like so: twoWordNumericTagsLookup["object"](Number("NUMERIC-attribute"))
//
// if attribute cannot be case to a number, the parser looks for "object" in twoWordTagsLookup.
ParserFuncTags.set("cockfit", wrapper((player: Character, num: number) => {
    if (player.body.cocks.length <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
    else {
        if (player.body.cocks.find(Cock.CockThatFits(num))) return describeCock(player, player.body.cocks.find(Cock.CockThatFits(num)));
        else return describeCock(player, player.body.cocks.sort(Cock.Smallest).get(0));
    }
}));
ParserFuncTags.set("cockfit2", wrapper((player: Character, num: number) => {
    if (player.body.cocks.length <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
    else {
        if (player.body.cocks.filter(Cock.CocksThatFit(num)).get(1)) return describeCock(player, player.body.cocks.filter(Cock.CocksThatFit(num)).get(1));
        else return describeCock(player, player.body.cocks.sort(Cock.Smallest).get(0));
    }
}));
ParserFuncTags.set("cockheadfit", wrapper((player: Character, num: number) => {
    if (player.body.cocks.length <= 0) {
        return "<b>(Attempt to parse cockhead when none present.)</b>";
    }
    else {
        if (player.body.cocks.find(Cock.CockThatFits(num))) return describeCockHead(player.body.cocks.find(Cock.CockThatFits(num)));
        else return describeCockHead(player.body.cocks.sort(Cock.Smallest).get(0));
    }
}));
ParserFuncTags.set("cockheadfit2", wrapper((player: Character, num: number) => {
    if (player.body.cocks.length <= 0) return "<b>(Attempt to parse cockhead when none present.)</b>";
    else {
        if (player.body.cocks.filter(Cock.CocksThatFit(num)).get(1)) return describeCockHead(player.body.cocks.filter(Cock.CocksThatFit(num)).get(1));
        else return describeCockHead(player.body.cocks.sort(Cock.Smallest).get(0));
    }
}));

// Add previous tags with the first letter of each key uppercased for first letter uppercase
for (const tag of ParserFuncTags.entries()) {
    ParserFuncTags.set(tag[0][0].toUpperCase() + tag[0].slice(1), (...args: any[]) => {
        const results = tag[1](args);
        if (typeof results === "string" && results.length > 0)
            return results[0].toUpperCase() + results.slice(1);
        return results;
    });
}
