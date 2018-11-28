import { Dictionary } from "../../Engine/Utilities/Dictionary";
// import { CharDict } from "../CharDict";
// import { describeButt, describeButthole } from "../Descriptors/ButtDescriptor";
// import { describeBalls, describeSack } from "../Descriptors/BallsDescriptor";
// import { mf } from "../Descriptors/GenderDescriptor";
// import { describeChest, describeNipple, describeAllChest } from "../Descriptors/BreastDescriptor";
// import { describeClit, describeVagina } from "../Descriptors/VaginaDescriptor";
// import { describeCock, describeCockHead, describeCocksLight, describeOneOfYourCocks, describeEachOfYourCocks, describeCockSheath } from "../Descriptors/CockDescriptor";
// import { describeFaceShort, describeTongue } from "../Descriptors/FaceDescriptor";
// import { describeFeet, describeFoot, describeLeg, describeLegs } from "../Descriptors/LegDescriptor";
// import { describeHair, hairOrFur } from "../Descriptors/HairDescriptor";
// import { describeHips } from "../Descriptors/HipDescriptor";
// import { describeRace } from "../Descriptors/BodyDescriptor";
// import { describeSkin, skinFurScales } from "../Descriptors/SkinDescriptor";
// import { BreastRow } from "../Body/BreastRow";
// import { Time } from "../Utilities/Time";
// import { Womb } from "../Body/Pregnancy/Womb";
// import { Cock } from "../Body/Cock";
// import { Character } from "../Character/Character";

// ParserTags.set('newline', {
//     regex: /\n/g,
//     replace: '<br>'
// });

type ParserFunc = (...args: any[]) => string | number | boolean;
// type PlayerParserFunc = (player: Character, ...args: any[]) => string | number | boolean;

// function wrapper(func: ParserFunc): ParserFunc {
//     return (...args: any[]) => {
//         if (CharDict.player) return func(CharDict.player, ...args);
//         return 'Error: Player does not exist';
//     };
// }

export const ParserTags = new Dictionary<string, ParserFunc>();
export const ParserCondTags = new Dictionary<string, ParserFunc>();

ParserTags.set("color:", (colorName: string, ...other: any[]) => `<span style="color:${colorName}">${other.join(' ')}</span>`);
ParserTags.set("say:", (...other: any[]) => `<i>"${other.join(' ')}"</i>`);
ParserTags.set("b:", (...other: any[]) => `<b>${other.join(' ')}</b>`);
ParserTags.set("i:", (...other: any[]) => `<i>${other.join(' ')}</i>`);
ParserTags.set("u:", (...other: any[]) => `<u>${other.join(' ')}</u>`);

// // Single arg
// ParserTags.set("agility", () => "[Agility]");
// ParserTags.set("armor", wrapper((player: Character) => player.inventory.armor.displayName));
// ParserTags.set("armorname", wrapper((player: Character) => player.inventory.armor.displayName));
// ParserTags.set("ass", wrapper((player: Character) => describeButt(player)));
// ParserTags.set("asshole", wrapper((player: Character) => describeButthole(player.body.butt)));
// ParserTags.set("balls", wrapper((player: Character) => describeBalls(true, true, player)));
// ParserTags.set("boyfriend", wrapper((player: Character) => mf(player, "boyfriend", "girlfriend")));
// ParserTags.set("butt", wrapper((player: Character) => describeButt(player)));
// ParserTags.set("butthole", wrapper((player: Character) => describeButthole(player.body.butt)));
// ParserTags.set("chest", wrapper((player: Character) => describeChest(player)));
// ParserTags.set("clit", wrapper((player: Character) => describeClit(player)));
// ParserTags.set("cock", wrapper((player: Character, arg: string, ...args: any[]) => {
//     if (ParserTags.get(arg) !== undefined)
//         return ParserTags.get(arg)!(player, args);
//     return describeCock(player, player.body.cocks.get(0));
// }));
// ParserTags.set("cockhead", wrapper((player: Character) => describeCockHead(player.body.cocks.get(0))));
// ParserTags.set("cocks", wrapper((player: Character) => describeCocksLight(player)));
// ParserTags.set("cunt", wrapper((player: Character) => describeVagina(player, player.body.vaginas.get(0))));
// ParserTags.set("eachcock", wrapper((player: Character) => describeOneOfYourCocks(player)));
// ParserTags.set("evade", () => "[Evade]");
// ParserTags.set("face", wrapper((player: Character) => describeFaceShort(player)));
// ParserTags.set("feet", wrapper((player: Character) => describeFeet(player)));
// ParserTags.set("foot", wrapper((player: Character) => describeFoot(player)));
// ParserTags.set("fullchest", wrapper((player: Character) => describeAllChest(player)));
// ParserTags.set("hair", wrapper((player: Character) => describeHair(player)));
// ParserTags.set("hairorfur", wrapper((player: Character) => hairOrFur(player)));
// ParserTags.set("he", wrapper((player: Character) => mf(player, "he", "she")));
// // "he2": (player: Character) => player2.mf("he", "she"),
// ParserTags.set("him", wrapper((player: Character) => mf(player, "him", "her")));
// // "him2": (player: Character) => player2.mf("him", "her"),
// ParserTags.set("himself", wrapper((player: Character) => mf(player, "himself", "herself")));
// ParserTags.set("herself", wrapper((player: Character) => mf(player, "himself", "herself")));
// ParserTags.set("hips", wrapper((player: Character) => describeHips(player)));
// ParserTags.set("his", wrapper((player: Character) => mf(player, "his", "her")));
// // "his2": (player: Character) => player2.mf("his", "her"),
// ParserTags.set("leg", wrapper((player: Character) => describeLeg(player)));
// ParserTags.set("legs", wrapper((player: Character) => describeLegs(player)));
// ParserTags.set("man", wrapper((player: Character) => mf(player, "man", "woman")));
// ParserTags.set("men", wrapper((player: Character) => mf(player, "men", "women")));
// ParserTags.set("master", wrapper((player: Character) => mf(player, "master", "mistress")));
// ParserTags.set("misdirection", () => "[Misdirection]");
// ParserTags.set("multicock", wrapper((player: Character) => describeCocksLight(player)));
// ParserTags.set("multicockdescriptlight", wrapper((player: Character) => describeCocksLight(player)));
// ParserTags.set("name", wrapper((player: Character) => player.desc.name));
// ParserTags.set("nipple", wrapper((player: Character) => describeNipple(player, player.body.chest.get(0))));
// ParserTags.set("nipples", wrapper((player: Character) => describeNipple(player, player.body.chest.get(0)) + "s"));
// ParserTags.set("onecock", wrapper((player: Character) => describeEachOfYourCocks(player)));
// ParserTags.set("pg", () => "\n\n");
// ParserTags.set("pussy", wrapper((player: Character) => describeVagina(player, player.body.vaginas.get(0))));
// ParserTags.set("race", wrapper((player: Character) => describeRace(player)));
// ParserTags.set("sack", wrapper((player: Character) => describeSack(player)));
// ParserTags.set("sheath", wrapper((player: Character) => describeCockSheath(player.body.cocks.get(0))));
// ParserTags.set("skin", wrapper((player: Character) => describeSkin(player)));
// ParserTags.set("skinfurscales", wrapper((player: Character) => skinFurScales(player)));
// // "teasetext": (player: Character) => teaseText(),
// ParserTags.set("tongue", wrapper((player: Character) => describeTongue(player.body.tongue.type)));
// ParserTags.set("vag", wrapper((player: Character) => describeVagina(player, player.body.vaginas.get(0))));
// ParserTags.set("vagina", wrapper((player: Character) => describeVagina(player, player.body.vaginas.get(0))));
// ParserTags.set("vagorass", wrapper((player: Character) => (player.body.vaginas.length > 0 ? describeVagina(player, player.body.vaginas.get(0)) : describeButthole(player.body.butt))));
// ParserTags.set("weapon", wrapper((player: Character) => player.inventory.weapon.displayName));
// ParserTags.set("weaponname", wrapper((player: Character) => player.inventory.weapon.displayName));
// // "latexyname": (player: Character) => undefinedFlags.GOO_NAME,
// // "bathgirlname": (player: Character) => undefinedFlags.MILK_NAME,
// ParserTags.set("cockplural", wrapper((player: Character) => (player.body.cocks.length === 1) ? "cock" : "cocks"));
// ParserTags.set("dickplural", wrapper((player: Character) => (player.body.cocks.length === 1) ? "dick" : "dicks"));
// ParserTags.set("headplural", wrapper((player: Character) => (player.body.cocks.length === 1) ? "head" : "heads"));
// ParserTags.set("prickplural", wrapper((player: Character) => (player.body.cocks.length === 1) ? "prick" : "pricks"));
// ParserTags.set("boy", wrapper((player: Character) => mf(player, "boy", "girl")));
// ParserTags.set("guy", wrapper((player: Character) => mf(player, "guy", "girl")));
// // "wings": (player: Character) => wingsDescript(),
// // "tail": (player: Character) => tailDescript(),
// // "onetail": (player: Character) => oneTailDescript(),

// // Conditional
// ParserCondTags.set("strength", wrapper((player: Character) => player.stats.str));
// ParserCondTags.set("toughness", wrapper((player: Character) => player.stats.tou));
// ParserCondTags.set("speed", wrapper((player: Character) => player.stats.spe));
// ParserCondTags.set("intelligence", wrapper((player: Character) => player.stats.int));
// ParserCondTags.set("libido", wrapper((player: Character) => player.stats.lib));
// ParserCondTags.set("sensitivity", wrapper((player: Character) => player.stats.sens));
// ParserCondTags.set("corruption", wrapper((player: Character) => player.stats.cor));
// ParserCondTags.set("fatigue", wrapper((player: Character) => player.stats.fatigue));
// ParserCondTags.set("hp", wrapper((player: Character) => player.stats.HP));
// ParserCondTags.set("hour", wrapper(() => Time.hour));
// ParserCondTags.set("days", wrapper(() => Time.day));
// ParserCondTags.set("tallness", wrapper((player: Character) => player.body.tallness));
// ParserCondTags.set("hairlength", wrapper((player: Character) => player.body.hair.length));
// ParserCondTags.set("femininity", wrapper((player: Character) => player.body.femininity));
// ParserCondTags.set("masculinity", wrapper((player: Character) => 100 - player.body.femininity));
// ParserCondTags.set("cocks", wrapper((player: Character) => player.body.cocks.length));
// ParserCondTags.set("breastrows", wrapper((player: Character) => player.body.chest.length));
// ParserCondTags.set("biggesttitsize", wrapper((player: Character) => player.body.chest.sort(BreastRow.Largest).get(0)!.rating));
// ParserCondTags.set("vagcapacity", wrapper((player: Character) => player.vaginalCapacity()));
// ParserCondTags.set("analcapacity", wrapper((player: Character) => player.analCapacity()));
// ParserCondTags.set("balls", wrapper((player: Character) => player.body.balls.count));
// ParserCondTags.set("cumquantity", wrapper((player: Character) => player.cumQ()));
// ParserCondTags.set("milkquantity", wrapper((player: Character) => player.lactationQ()));
// ParserCondTags.set("hasvagina", wrapper((player: Character) => player.body.vaginas.length > 0));
// ParserCondTags.set("istaur", wrapper((player: Character) => player.body.legs.isTaur()));
// ParserCondTags.set("isnaga", wrapper((player: Character) => player.body.legs.isNaga()));
// ParserCondTags.set("isgoo", wrapper((player: Character) => player.body.legs.isGoo()));
// ParserCondTags.set("isbiped", wrapper((player: Character) => player.body.legs.isBiped()));
// ParserCondTags.set("hasbreasts", wrapper((player: Character) => (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 1)));
// ParserCondTags.set("hasballs", wrapper((player: Character) => (player.body.balls.count > 0)));
// ParserCondTags.set("hascock", wrapper((player: Character) => player.body.cocks.length > 0));
// ParserCondTags.set("isherm", wrapper((player: Character) => (player.gender === 3)));
// ParserCondTags.set("cumnormal", wrapper((player: Character) => (player.cumQ() <= 150)));
// ParserCondTags.set("cummedium", wrapper((player: Character) => (player.cumQ() > 150 && player.cumQ() <= 350)));
// ParserCondTags.set("cumhigh", wrapper((player: Character) => (player.cumQ() > 350 && player.cumQ() <= 1000)));
// ParserCondTags.set("cumveryhigh", wrapper((player: Character) => (player.cumQ() > 1000 && player.cumQ() <= 2500)));
// ParserCondTags.set("cumextreme", wrapper((player: Character) => (player.cumQ() > 2500)));
// ParserCondTags.set("issquirter", wrapper((player: Character) => (player.body.vaginas.get(0)!.wetness >= 4)));
// ParserCondTags.set("ispregnant", wrapper((player: Character) => !!(player.body.wombs.find(Womb.Pregnant))));
// ParserCondTags.set("isbuttpregnant", wrapper((player: Character) => (player.body.buttWomb.isPregnant())));
// ParserCondTags.set("hasnipplecunts", wrapper((player: Character) => !!player.body.chest.find(BreastRow.FuckableNipples)));
// ParserCondTags.set("canfly", wrapper((player: Character) => player.canFly()));
// ParserCondTags.set("islactating", wrapper((player: Character) => (player.lactationQ() > 0)));
// ParserCondTags.set("true", () => true);
// ParserCondTags.set("false", () => false);

// // Double arg
// // For subject: "cock"
// ParserTags.set("all", wrapper((player: Character) => describeCocksLight(player)));
// ParserTags.set("each", wrapper((player: Character) => describeOneOfYourCocks(player)));
// ParserTags.set("one", wrapper((player: Character) => describeEachOfYourCocks(player)));
// ParserTags.set("largest", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Largest).get(0))));
// ParserTags.set("biggest", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Largest).get(0))));
// ParserTags.set("biggest2", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Largest).get(1))));
// ParserTags.set("biggest3", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Largest).get(2))));
// ParserTags.set("smallest", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Smallest).get(0))));
// ParserTags.set("smallest2", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Smallest).get(1))));
// ParserTags.set("longest", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Longest).get(0))));
// ParserTags.set("shortest", wrapper((player: Character) => describeCock(player, player.body.cocks.sort(Cock.Shortest).get(0))));

// // For subject: "cockHead"
// ParserTags.set("biggest", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Largest).get(0))));
// ParserTags.set("biggest2", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Largest).get(1))));
// ParserTags.set("biggest3", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Largest).get(2))));
// ParserTags.set("largest", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Largest).get(0))));
// ParserTags.set("smallest", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Smallest).get(0))));
// ParserTags.set("smallest2", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Smallest).get(1))));
// // the *head* of a cock has a length? Wut?
// ParserTags.set("longest", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Longest).get(0))));
// ParserTags.set("shortest", wrapper((player: Character) => describeCockHead(player.body.cocks.sort(Cock.Shortest).get(0))));

// // These tags take a two-word tag with a **numberic** attribute for lookup.
// // [object NUMERIC-attribute]
// // if "NUMERIC-attribute" can be cast to a Number, the parser looks for "object" in twoWordNumericTagsLookup.
// // If it finds twoWordNumericTagsLookup["object"], it calls the anonymous function stored with said key "object"
// // like so: twoWordNumericTagsLookup["object"](Number("NUMERIC-attribute"))
// //
// // if attribute cannot be case to a number, the parser looks for "object" in twoWordTagsLookup.
// ParserTags.set("cockfit", wrapper((player: Character, num: number) => {
//     if (player.body.cocks.length <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
//     else {
//         if (player.body.cocks.find(Cock.CockThatFits(num))) return describeCock(player, player.body.cocks.find(Cock.CockThatFits(num)));
//         else return describeCock(player, player.body.cocks.sort(Cock.Smallest).get(0));
//     }
// }));
// ParserTags.set("cockfit2", wrapper((player: Character, num: number) => {
//     if (player.body.cocks.length <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
//     else {
//         if (player.body.cocks.filter(Cock.CocksThatFit(num)).get(1)) return describeCock(player, player.body.cocks.filter(Cock.CocksThatFit(num)).get(1));
//         else return describeCock(player, player.body.cocks.sort(Cock.Smallest).get(0));
//     }
// }));
// ParserTags.set("cockheadfit", wrapper((player: Character, num: number) => {
//     if (player.body.cocks.length <= 0) {
//         return "<b>(Attempt to parse cockhead when none present.)</b>";
//     }
//     else {
//         if (player.body.cocks.find(Cock.CockThatFits(num))) return describeCockHead(player.body.cocks.find(Cock.CockThatFits(num)));
//         else return describeCockHead(player.body.cocks.sort(Cock.Smallest).get(0));
//     }
// }));
// ParserTags.set("cockheadfit2", wrapper((player: Character, num: number) => {
//     if (player.body.cocks.length <= 0) return "<b>(Attempt to parse cockhead when none present.)</b>";
//     else {
//         if (player.body.cocks.filter(Cock.CocksThatFit(num)).get(1)) return describeCockHead(player.body.cocks.filter(Cock.CocksThatFit(num)).get(1));
//         else return describeCockHead(player.body.cocks.sort(Cock.Smallest).get(0));
//     }
// }));
// ParserTags.set("cock", wrapper((player: Character, num: number) => {
//     if (player.body.cocks.length <= 0) return "<b>(Attempt to parse cock when none present.)</b>";
//     else {
//         if (num - 1 >= 0 && num - 1 < player.body.cocks.length) return describeCock(player, player.body.cocks.get(num - 1));
//         else return "<b>(Attempt To Parse CockDescript for Invalid Cock)</b>";
//     }
// }));
// ParserTags.set("cockhead", wrapper((player: Character, num: number) => {
//     if (player.body.cocks.length <= 0) return "<b>(Attempt to parse cockHead when none present.)</b>";
//     else {
//         const numOffset: number = Math.floor(num - 1);
//         if (numOffset >= 0 && numOffset < player.body.cocks.length) return describeCockHead(player.body.cocks.get(numOffset));
//         else return "<b>(Attempt To Parse CockHeadDescript for Invalid Cock)</b>";
//     }
// }));

// These tags take an ascii attribute for lookup.
// [object attribute]
// if attribute cannot be cast to a number, the parser looks for "object" in twoWordTagsLookup,
// and then uses the corresponding object to determine the value of "attribute", by looking for
// "attribute" twoWordTagsLookup["object"]["attribute"]

// For subject: "arian"
// const arianLookups =  {
//     "man"		: function(thisPtr:CoC):String {return kGAMECLASS.arianScene.arianMF("man","woman")},
//     // argh! "Man" is the mass-noun for humanity, and I'm loathe to choose an even more esoteric variant.
//     // Elverson/Spivak terminology is already esoteric enough, and it lacks a ungendered mass noun.

//     "ey"		: function(thisPtr:CoC):String {return kGAMECLASS.arianScene.arianMF("he","she")},
//     "em"		: function(thisPtr:CoC):String {return kGAMECLASS.arianScene.arianMF("him","her")},
//     "eir"		: function(thisPtr:CoC):String {return kGAMECLASS.arianScene.arianMF("his","her")},
//     "eirs"		: function(thisPtr:CoC):String {return kGAMECLASS.arianScene.arianMF("his","hers")},
//     "emself"	: function(thisPtr:CoC):String {return kGAMECLASS.arianScene.arianMF("himself","herself")},

//     "chestadj"	: function(thisPtr:CoC):String {return kGAMECLASS.arianScene.arianChestAdjective()},
//     "chest"		: function(thisPtr:CoC):String {return kGAMECLASS.arianScene.arianChest()}
// }
// Arian unhandled terms (I have not decided how to support them yet):
// arianMF("mas","mis")
// arianMF("master","mistress")
// arianMF("male","girly")

// For subject: "rubi"
// const rubiLookups = {
//     "man"		: function(thisPtr:CoC):String {return kGAMECLASS.telAdre.rubi.rubiMF("man","woman")},

//     "ey"		: function(thisPtr:CoC):String {return kGAMECLASS.telAdre.rubi.rubiMF("he","she")},
//     "em"		: function(thisPtr:CoC):String {return kGAMECLASS.telAdre.rubi.rubiMF("him","her")},
//     "eir"		: function(thisPtr:CoC):String {return kGAMECLASS.telAdre.rubi.rubiMF("his","her")},
//     "eirs"		: function(thisPtr:CoC):String {return kGAMECLASS.telAdre.rubi.rubiMF("his","hers")},
//     "emself"	: function(thisPtr:CoC):String {return kGAMECLASS.telAdre.rubi.rubiMF("himself","herself")},

//     "cock"		: function(thisPtr:CoC):String {return kGAMECLASS.telAdre.rubi.rubiCock()},
//     "breasts"	: function(thisPtr:CoC):String {return kGAMECLASS.telAdre.rubi.rubiBreasts()}

// }
