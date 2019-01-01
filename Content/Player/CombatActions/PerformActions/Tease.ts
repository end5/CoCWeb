import { randInt } from 'Engine/Utilities/SMath';
import { BreastRow } from 'Engine/Body/BreastRow';
import { Cock, CockType } from 'Engine/Body/Cock';
import { Gender } from 'Engine/Body/GenderIdentity';
import { Tail, TailType } from 'Engine/Body/Tail';
import { Vagina } from 'Engine/Body/Vagina';
import { Character } from 'Engine/Character/Character';
import { fatigueRecovery } from 'Content/Combat/CombatUtils';
import { EffectType } from 'Content/Effects/EffectType';
import { ArmorName } from 'Content/Items/ArmorName';
import { NagaTease } from './NagaTease';
import { CView } from 'Engine/Display/ContentView';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { describeButt, describeButthole } from 'Content/Descriptors/ButtDescriptor';
import { describeBreastRow, describeNipple, describeAllBreasts, describeChest } from 'Content/Descriptors/BreastDescriptor';
import { describeCock, describeCocksLight, describeOneOfYourCocks } from 'Content/Descriptors/CockDescriptor';
import { describeVagina, describeClit } from 'Content/Descriptors/VaginaDescriptor';
import { describeHips } from 'Content/Descriptors/HipDescriptor';
import { describeBalls } from 'Content/Descriptors/BallsDescriptor';
import { describeHair } from 'Content/Descriptors/HairDescriptor';
import { mf } from 'Content/Descriptors/GenderDescriptor';
import { describeLeg, describeLegs } from 'Content/Descriptors/LegDescriptor';
import { describeSkin } from 'Content/Descriptors/SkinDescriptor';
import { Womb } from 'Engine/Body/Pregnancy/Womb';
import { dogRaceScore, spiderRaceScore, kitsuneRaceScore, cowRaceScore } from 'Content/Body/RaceScore';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';
import { Settings } from 'Content/Settings';
import { CeraphFlags } from 'Content/Scenes/NPCs/Ceraph';

const enum TeaseType {
    ButtShake,                  // 0 butt shake
    BreastJiggle,               // 1 breast jiggle
    PussyFlash,                 // 2 pussy flash
    CockFlash,                  // 3 cock flash
    // ==BIMBO STUFF===
    BimboButtShake,             // 4 butt shake
    BimboBreastJiggle,          // 5 breast jiggle
    BimboPussyFlash,            // 6 pussy flash
    BimboSpecial,               // 7 special Adjatha-crafted bend over bimbo times
    // ==BRO STUFF=====
    BroPecDance,                // 8 Pec Dance
    BroHeroicPose,              // 9 Heroic Pose
    BroBulgyGroinThrust,        // 10 Bulgy groin thrust
    BroShowOffDick,             // 11 Show off dick
    // ==EXTRAS========
    CatFlexibility,             // 12 Cat flexibility.
    Pregnant,                   // 13 Pregnant
    BroodMother,                // 14 Brood Mother
    Nipplecunts,                // 15 Nipplecunts
    AnalGape,                   // 16 Anal gape
    BeeAbdomen,                 // 17 Bee abdomen tease
    DogTease,                   // 18 DOG TEASE
    MaxFemininity,              // 19 Maximum Femininity:
    MaxManliness,               // 20 Maximum MAN:
    PerfectAndrogyny,           // 21 Perfect Androgyny:
    SpirderSilk,                // 22 SPOIDAH SILK
    Rut,                        // 23 RUT
    Poledance,                  // 24 Poledance - req's staff! - Req's gender!  Req's TITS!
    TallTease,                  // 25 Tall Tease! - Reqs 2+ feet & PC Cunt!
    Smartness,                  // 26 SMART PEEPS! 70+ int, arouse spell!
    Feeder,                     // 27 - FEEDER
    ClothesFemaleTeacher,       // 28 FEMALE TEACHER COSTUME TEASE
    ClothesMaleTeacher,         // 29 Male Teacher Outfit Tease
    ClothesNagaFetish,          // 30 Naga Fetish Clothes
    ClothesCentaurHarness,      // 31 Centaur harness clothes
    ClothesGenderlessServant,   // 32 Genderless servant clothes
    ClothesCrotchRevealing,     // 33 Crotch Revealing Clothes (herm only?)
    ClothesMaid,                // 34 Maid Costume (female only):
    ClothesServantBoy,          // 35 Servant Boy Clothes (male only)
    ClothesBondagePatient,      // 36 Bondage Patient Clothes
    Kitsune1,                   // 37 Kitsune Tease
    Kitsune2,                   // 38 Kitsune Tease
    Kitsune3,                   // 39 Kitsune Tease
    Kitsune4,                   // 40 Kitsune Tease
    KitsuneGendered,            // 41 Kitsune Gendered Tease
    Urta,                       // 42 Urta teases
    Cowgirl,                    // 43 Cowgirl teases
    ClothesBikiniMail,          // 44 Bikini Mail Tease

    MaxTeaseTypes,              // Max Tease Types - Used for choices array init
}

function determineBaseDamage(character: Character): number {
    let damage: number = 6 + randInt(3);
    if (character.effects.has(EffectType.SensualLover))
        damage += 2;
    if (character.effects.has(EffectType.Seduction))
        damage += 5;
    damage += character.stats.level;
    damage += character.stats.teaseLevel * 2;
    return damage;
}

function determineBaseChance(character: Character): number {
    let chance: number = 0;
    chance = 60;
    // 5% chance for each tease level.
    chance += character.stats.teaseLevel * 5;
    // 10% for seduction perk
    if (character.effects.has(EffectType.Seduction)) chance += 10;
    // 10% for sexy armor types
    if (character.effects.has(EffectType.SluttySeduction)) chance += 10;
    // 10% for bimbo shits
    if (character.effects.has(EffectType.BimboBody)) {
        chance += 10;
    }
    if (character.effects.has(EffectType.BroBody)) {
        chance += 10;
    }
    if (character.effects.has(EffectType.FutaForm)) {
        chance += 10;
    }
    // 2 & 2 for seductive valentines!
    if (character.effects.has(EffectType.SensualLover)) {
        chance += 2;
    }
    // if (character.perks.has(EffectType.ChiReflowLust))
    //     chance += UmasShop.NEEDLEWORK_LUST_TEASE_MULTI;
    return chance;
}

function determineTeaseChoice(character: Character, monster: Character, bimbo: boolean, bro: boolean, futa: boolean) {
    const buttRating = character.body.butt.rating;
    const largestBreastRating = character.body.chest.length > 0 ? character.body.chest.sort(BreastRow.Largest).get(0)!.rating : 0;
    const hasVagina = character.body.vaginas.length > 0;
    const vaginalWetness = hasVagina ? character.body.vaginas.get(0)!.wetness : 0;
    const vaginalCapacity = character.vaginalCapacity();
    const cockCount = character.body.cocks.length;
    const largestCockArea = cockCount > 0 ? character.body.cocks.sort(Cock.Largest).get(0)!.area : 0;
    const choices: number[] = [];
    choices.length = TeaseType.MaxTeaseTypes;
    for (let index: number = 0; index < TeaseType.MaxTeaseTypes; index++)
        choices[index] = 0;

    if ((futa || bimbo) && character.gender === Gender.HERM) {
        // Once chance of butt.
        choices[TeaseType.BimboButtShake]++;
        // Big butts get more butt
        if (buttRating >= 7) choices[TeaseType.BimboButtShake]++;
        if (buttRating >= 10) choices[TeaseType.BimboButtShake]++;
        if (buttRating >= 14) choices[TeaseType.BimboButtShake]++;
        if (buttRating >= 20) choices[TeaseType.BimboButtShake]++;
        if (buttRating >= 25) choices[TeaseType.BimboButtShake]++;
        // Breast jiggle!
        if (largestBreastRating >= 2) choices[TeaseType.BimboBreastJiggle]++;
        if (largestBreastRating >= 4) choices[TeaseType.BimboBreastJiggle]++;
        if (largestBreastRating >= 8) choices[TeaseType.BimboBreastJiggle]++;
        if (largestBreastRating >= 15) choices[TeaseType.BimboBreastJiggle]++;
        if (largestBreastRating >= 30) choices[TeaseType.BimboBreastJiggle]++;
        if (largestBreastRating >= 50) choices[TeaseType.BimboBreastJiggle]++;
        if (largestBreastRating >= 75) choices[TeaseType.BimboBreastJiggle]++;
        if (largestBreastRating >= 100) choices[TeaseType.BimboBreastJiggle]++;
        // Pussy Flash!
        if (hasVagina) {
            choices[TeaseType.PussyFlash]++;
            if (vaginalWetness >= 3) choices[TeaseType.BimboPussyFlash]++;
            if (vaginalWetness >= 5) choices[TeaseType.BimboPussyFlash]++;
            if (vaginalCapacity >= 30) choices[TeaseType.BimboPussyFlash]++;
            if (vaginalCapacity >= 60) choices[TeaseType.BimboPussyFlash]++;
            if (vaginalCapacity >= 75) choices[TeaseType.BimboPussyFlash]++;
        }
        // Adj special!
        if (hasVagina && character.body.butt.rating >= 8 && character.body.hips.rating >= 6 && largestBreastRating >= 4) {
            choices[TeaseType.BimboSpecial] += 4;
        }
        // Cock flash!
        if (futa && character.body.cocks.length > 0) {
            choices[TeaseType.BroBulgyGroinThrust]++;
            choices[TeaseType.BroShowOffDick]++;
            if (cockCount > 1) choices[TeaseType.BroBulgyGroinThrust]++;
            if (cockCount >= 2) choices[TeaseType.BroShowOffDick]++;
            if (largestCockArea >= 10) choices[TeaseType.BroBulgyGroinThrust]++;
            if (largestCockArea >= 25) choices[TeaseType.BroShowOffDick]++;
            if (largestCockArea >= 50) choices[TeaseType.BroShowOffDick]++;
            if (largestCockArea >= 75) choices[TeaseType.BroBulgyGroinThrust]++;
            if (largestCockArea >= 100) choices[TeaseType.BroShowOffDick]++;
            if (largestCockArea >= 300) choices[TeaseType.BroBulgyGroinThrust]++;
        }
    }
    else if (bro) {
        // 8 Pec Dance
        if (largestBreastRating < 1 && character.body.tone >= 60) {
            choices[TeaseType.BroPecDance]++;
            if (character.body.tone >= 70) choices[TeaseType.BroPecDance]++;
            if (character.body.tone >= 80) choices[TeaseType.BroPecDance]++;
            if (character.body.tone >= 90) choices[TeaseType.BroPecDance]++;
            if (character.body.tone === 100) choices[TeaseType.BroPecDance]++;
        }
        // 9 Heroic Pose
        if (character.body.tone >= 60 && character.stats.str >= 50) {
            choices[TeaseType.BroHeroicPose]++;
            if (character.body.tone >= 80) choices[TeaseType.BroHeroicPose]++;
            if (character.stats.str >= 70) choices[TeaseType.BroHeroicPose]++;
            if (character.body.tone >= 90) choices[TeaseType.BroHeroicPose]++;
            if (character.stats.str >= 80) choices[TeaseType.BroHeroicPose]++;
        }
        // Cock flash!
        if (character.body.cocks.length > 0) {
            choices[TeaseType.BroBulgyGroinThrust]++;
            choices[TeaseType.BroShowOffDick]++;
            if (cockCount > 1) choices[TeaseType.BroBulgyGroinThrust]++;
            if (cockCount >= 2) choices[TeaseType.BroShowOffDick]++;
            if (largestCockArea >= 10) choices[TeaseType.BroBulgyGroinThrust]++;
            if (largestCockArea >= 25) choices[TeaseType.BroShowOffDick]++;
            if (largestCockArea >= 50) choices[TeaseType.BroShowOffDick]++;
            if (largestCockArea >= 75) choices[TeaseType.BroBulgyGroinThrust]++;
            if (largestCockArea >= 100) choices[TeaseType.BroShowOffDick]++;
            if (largestCockArea >= 300) choices[TeaseType.BroBulgyGroinThrust]++;
        }
    }
    // VANILLA FOLKS
    else {
        // Once chance of butt.
        choices[TeaseType.ButtShake]++;
        // Big butts get more butt
        if (character.body.butt.rating >= 7) choices[TeaseType.ButtShake]++;
        if (character.body.butt.rating >= 10) choices[TeaseType.ButtShake]++;
        if (character.body.butt.rating >= 14) choices[TeaseType.ButtShake]++;
        if (character.body.butt.rating >= 20) choices[TeaseType.ButtShake]++;
        if (character.body.butt.rating >= 25) choices[TeaseType.ButtShake]++;
        // Breast jiggle!
        if (largestBreastRating >= 2) choices[TeaseType.BreastJiggle]++;
        if (largestBreastRating >= 4) choices[TeaseType.BreastJiggle]++;
        if (largestBreastRating >= 8) choices[TeaseType.BreastJiggle]++;
        if (largestBreastRating >= 15) choices[TeaseType.BreastJiggle]++;
        if (largestBreastRating >= 30) choices[TeaseType.BreastJiggle]++;
        if (largestBreastRating >= 50) choices[TeaseType.BreastJiggle]++;
        if (largestBreastRating >= 75) choices[TeaseType.BreastJiggle]++;
        if (largestBreastRating >= 100) choices[TeaseType.BreastJiggle]++;
        // Pussy Flash!
        if (hasVagina) {
            choices[TeaseType.PussyFlash]++;
            if (vaginalWetness >= 3) choices[TeaseType.PussyFlash]++;
            if (vaginalWetness >= 5) choices[TeaseType.PussyFlash]++;
            if (vaginalCapacity >= 30) choices[TeaseType.PussyFlash]++;
            if (vaginalCapacity >= 60) choices[TeaseType.PussyFlash]++;
            if (vaginalCapacity >= 75) choices[TeaseType.PussyFlash]++;
        }
        // Cock flash!
        if (character.body.cocks.length > 0) {
            choices[TeaseType.CockFlash]++;
            if (cockCount > 1) choices[TeaseType.CockFlash]++;
            if (cockCount >= 2) choices[TeaseType.CockFlash]++;
            if (largestCockArea >= 10) choices[TeaseType.CockFlash]++;
            if (largestCockArea >= 25) choices[TeaseType.CockFlash]++;
            if (largestCockArea >= 50) choices[TeaseType.CockFlash]++;
            if (largestCockArea >= 75) choices[TeaseType.CockFlash]++;
            if (largestCockArea >= 100) choices[TeaseType.CockFlash]++;
            if (largestCockArea >= 300) choices[TeaseType.CockFlash]++;
        }
    }
    // ==EXTRAS========
    // 12 Cat flexibility.
    if (character.effects.has(EffectType.Flexibility) && character.body.legs.isBiped() && hasVagina) {
        choices[TeaseType.CatFlexibility] += 2;
        if (vaginalWetness >= 3) choices[TeaseType.CatFlexibility]++;
        if (vaginalWetness >= 5) choices[TeaseType.CatFlexibility]++;
        if (vaginalCapacity >= 30) choices[TeaseType.CatFlexibility]++;
    }
    // 13 Pregnant
    // if (character.pregnancyIncubation <= 216 && character.pregnancyIncubation > 0) {
    if (character.body.wombs.find(Womb.Pregnant) || character.body.buttWomb.isPregnant()) {
        choices[TeaseType.Pregnant]++;
        const vagIncubationTime: number = character.body.wombs.find(Womb.Pregnant) ? character.body.wombs.filter(Womb.Pregnant).sort(Womb.LargestPregnancy).get(0)!.pregnancy!.incubation : 0;
        const buttIncubationTime: number = character.body.buttWomb.isPregnant() ? character.body.buttWomb.pregnancy!.incubation : 0;
        const incubationTime: number = vagIncubationTime < buttIncubationTime ? vagIncubationTime : buttIncubationTime;
        if (character.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1) choices[TeaseType.Pregnant]++;
        if (incubationTime <= 180) choices[TeaseType.Pregnant]++;
        if (incubationTime <= 120) choices[TeaseType.Pregnant]++;
        if (incubationTime <= 100) choices[TeaseType.Pregnant]++;
        if (incubationTime <= 50) choices[TeaseType.Pregnant]++;
        if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
        if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
        if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
        if (incubationTime <= 24) choices[TeaseType.Pregnant]++;
    }
    // 14 Brood Mother
    if (monster.body.cocks.length > 0 && hasVagina && character.effects.has(EffectType.BroodMother) && !character.body.wombs.find(Womb.Pregnant) && !character.body.buttWomb.isPregnant()) {
        choices[TeaseType.BroodMother] += 3;
        if (character.effects.has(EffectType.Heat)) choices[TeaseType.BroodMother] += 7;
    }
    // 15 Nipplecunts
    if (character.body.chest.find(BreastRow.FuckableNipples)) {
        choices[TeaseType.Nipplecunts] += 2;
        if (hasVagina) choices[TeaseType.Nipplecunts] += 3;
        if (vaginalWetness >= 3) choices[TeaseType.Nipplecunts]++;
        if (vaginalWetness >= 5) choices[TeaseType.Nipplecunts]++;
        if (largestBreastRating >= 3) choices[TeaseType.Nipplecunts]++;
        if (character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length >= 3) choices[TeaseType.Nipplecunts]++;
    }
    // 16 Anal gape
    if (character.body.butt.looseness >= 4) {
        choices[TeaseType.AnalGape]++;
        if (character.body.butt.looseness >= 5) choices[TeaseType.AnalGape]++;
    }
    // 17 Bee abdomen tease
    if (character.body.tails.reduce(Tail.HasType(TailType.BEE_ABDOMEN), false)) {
        choices[TeaseType.BeeAbdomen] += 2;
    }
    // 18 DOG TEASE
    if (dogRaceScore(character) >= 4 && hasVagina && character.body.legs.isBiped()) {
        choices[TeaseType.DogTease] += 2;
    }
    // 19 Maximum Femininity:
    if (character.body.femininity >= 100) {
        choices[TeaseType.MaxFemininity] += 3;
    }
    // 20 Maximum MAN:
    if (character.body.femininity <= 0) {
        choices[TeaseType.MaxManliness] += 3;
    }
    // 21 Perfect Androgyny:
    if (character.body.femininity === 50) {
        choices[TeaseType.PerfectAndrogyny] += 3;
    }
    // 22 SPOIDAH SILK
    if (character.body.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false)) {
        choices[TeaseType.SpirderSilk] += 3;
        if (spiderRaceScore(character) >= 4) {
            choices[TeaseType.SpirderSilk] += 3;
        }
    }
    // 23 RUT
    if (character.effects.has(EffectType.Rut) && monster.body.vaginas.length > 0 && character.body.cocks.length > 0) {
        choices[TeaseType.Rut] += 5;
    }
    // 24 Poledance - req's staff! - Req's gender!  Req's TITS!
    if (character.inventory.weapon.displayName === "wizard's staff" && largestBreastRating >= 1 && character.gender > 0) {
        choices[TeaseType.Poledance] += 5;
    }
    // 25 Tall Tease! - Reqs 2+ feet & PC Cunt!
    if (character.body.tallness - monster.body.tallness >= 24 && largestBreastRating >= 4) {
        choices[TeaseType.TallTease] += 5;
    }
    // 26 SMART PEEPS! 70+ int, arouse spell!
    if (character.stats.int >= 70 && character.effects.has(EffectType.KnowsArouse)) {
        choices[TeaseType.Smartness] += 3;
    }
    // 27 FEEDER
    if (character.effects.has(EffectType.Feeder) && largestBreastRating >= 4) {
        choices[TeaseType.Feeder] += 3;
        if (largestBreastRating >= 10) choices[TeaseType.Feeder]++;
        if (largestBreastRating >= 15) choices[TeaseType.Feeder]++;
        if (largestBreastRating >= 25) choices[TeaseType.Feeder]++;
        if (largestBreastRating >= 40) choices[TeaseType.Feeder]++;
        if (largestBreastRating >= 60) choices[TeaseType.Feeder]++;
        if (largestBreastRating >= 80) choices[TeaseType.Feeder]++;
    }
    // 28 FEMALE TEACHER COSTUME TEASE
    if (character.inventory.armor.displayName === "backless female teacher's clothes" && character.gender === Gender.FEMALE) {
        choices[TeaseType.ClothesFemaleTeacher] += 4;
    }
    // 29 Male Teacher Outfit Tease
    if (character.inventory.armor.displayName === "formal vest, tie, and crotchless pants" && character.gender === Gender.MALE) {
        choices[TeaseType.ClothesMaleTeacher] += 4;
    }
    // 30 Naga Fetish Clothes
    if (character.inventory.armor.displayName === "headdress, necklaces, and many body-chains") {
        choices[TeaseType.ClothesNagaFetish] += 4;
    }
    // 31 Centaur harness clothes
    if (character.inventory.armor.displayName === "bridle bit and saddle set") {
        choices[TeaseType.ClothesCentaurHarness] += 4;
    }
    // 32 Genderless servant clothes
    if (character.inventory.armor.displayName === "servant's clothes" && character.gender === Gender.NONE) {
        choices[TeaseType.ClothesGenderlessServant] += 4;
    }
    // 33 Crotch Revealing Clothes (herm only?)
    if (character.inventory.armor.displayName === "crotch-revealing clothes" && character.gender === Gender.HERM) {
        choices[TeaseType.ClothesCrotchRevealing] += 4;
    }
    // 34 Maid Costume (female only):
    if (character.inventory.armor.displayName === "maid's clothes" && hasVagina) {
        choices[TeaseType.ClothesMaid] += 4;
    }
    // 35 Servant Boy Clothes (male only)
    if (character.inventory.armor.displayName === "cute servant's clothes" && character.body.cocks.length > 0) {
        choices[TeaseType.ClothesServantBoy] += 4;
    }
    // 36 Bondage Patient Clothes
    if (character.inventory.armor.displayName === "bondage patient clothes") {
        choices[TeaseType.ClothesBondagePatient] += 4;
    }
    // 37 Kitsune Tease
    // 38 Kitsune Tease
    // 39 Kitsune Tease
    // 40 Kitsune Tease
    if (kitsuneRaceScore(character) >= 2 && character.body.tails.reduce(Tail.HasType(TailType.FOX), false)) {
        choices[TeaseType.Kitsune1] += 4;
        choices[TeaseType.Kitsune2] += 4;
        choices[TeaseType.Kitsune3] += 4;
        choices[TeaseType.Kitsune4] += 4;
    }
    // 41 Kitsune Gendered Tease
    if (kitsuneRaceScore(character) >= 2 && character.body.tails.reduce(Tail.HasType(TailType.FOX), false)) {
        choices[TeaseType.KitsuneGendered] += 4;
    }
    // 42 Urta teases!
    // if (urtaQuest.isUrta()) {
    //     choices[TeaseType.Urta] += 9;
    // }
    // 43 - special mino + cowgirls
    if (character.body.vaginas.length > 0 && character.lactationQ() >= 500 && largestBreastRating >= 6 && cowRaceScore(character) >= 3 && character.body.tails.reduce(Tail.HasType(TailType.COW), false)) {
        choices[TeaseType.Cowgirl] += 9;
    }
    // 44 - Bikini Mail Teases!
    if (character.body.vaginas.length > 0 && largestBreastRating >= 4 && character.inventory.armor.name === ArmorName.LustyMaidensArmor) {
        choices[TeaseType.ClothesBikiniMail] += 15;
    }
    return selectChoice(choices);
}

function selectChoice(list: number[]): number {
    const randomChoice: number = randInt(list.reduce((sum: number, value: number) => {
        return sum + value;
    }, 0));
    let counter = 0;
    for (let index = 0; index < list.length; index++) {
        if (counter + list[index] >= randomChoice)
            return index;
        counter += list[index];
    }
    return 0;
}

export class Tease extends CombatAction {
    public name = "Tease";
    public type = CombatActionType.Tease;

    public use(character: Character, target: Character): void {
        CView.clear();
        // You cant tease a blind guy!
        if (target.effects.has(EffectType.Blind)) {
            CView.text("You do your best to tease " + target.desc.a + target.desc.short + " with your body.  It doesn't work - you blinded " + target.desc.objectivePronoun + ", remember?\n\n");
            return;
        }
        if (target.stats.lustVuln === 0) {
            CView.clear();
            CView.text("You try to tease " + target.desc.a + target.desc.short + " with your body, but it doesn't have any effect on " + target.desc.objectivePronoun + ".\n\n");
            return;
        }
        if (target.desc.short === "worms") {
            CView.clear();
            CView.text("Thinking to take advantage of its humanoid form, you wave your cock and slap your ass in a rather lewd manner. However, the creature fails to react to your suggestive actions.\n\n");
            return;
        }
        const nagaTease = new NagaTease();
        if (nagaTease.canUse(character, target)) {
            nagaTease.use(character, target);
            // Scenes.desert.nagaScene.naggaTease(character, target);
            return;
        }
        fatigueRecovery(character);
        let bimbo: boolean = character.effects.has(EffectType.BimboBody) ? true : false;
        const bro: boolean = character.effects.has(EffectType.BroBody) ? true : false;
        const futa: boolean = character.effects.has(EffectType.FutaForm) ? true : false;
        let chance: number = determineBaseChance(character);
        let damage: number = determineBaseDamage(character);
        // 10% for bimbo shits
        if (bimbo || bro || futa) {
            damage += 5;
            bimbo = true;
        }

        // Tags used for bonus damage and chance later on
        let breasts: boolean = false;
        let penis: boolean = false;
        let vagina: boolean = false;
        let anus: boolean = false;
        let ass: boolean = false;
        // If auto = true, set up bonuses using above flags
        let auto: boolean = true;
        // =======================================================
        //    CHOOSE YOUR TEASE AND DISPLAY IT!
        // =======================================================
        let choice: TeaseType = determineTeaseChoice(character, target, bimbo, bro, futa);
        if (target.desc.short.indexOf("minotaur") !== -1) {
            if (character.body.vaginas.length > 0 && character.lactationQ() >= 500 && character.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 6 && cowRaceScore(character) >= 3 && character.body.tails.reduce(Tail.HasType(TailType.COW), false))
                choice = TeaseType.Cowgirl;
        }
        // Lets do zis!
        switch (choice) {
            // 0 butt shake
            case TeaseType.ButtShake:
                // Display
                CView.text("You slap your " + describeButt(character));
                if (character.body.butt.rating >= 10 && character.body.tone < 60) CView.text(", making it jiggle delightfully.");
                else CView.text(".");
                // Mod success
                ass = true;
                break;
            // 1 BREAST JIGGLIN'
            case TeaseType.BreastJiggle:
                // Single breast row
                if (character.body.chest.length === 1) {
                    // 50+ breastsize% success rate
                    CView.text("Your lift your top, exposing your " + describeBreastRow(character.body.chest.firstRow!) + " to " + target.desc.a + target.desc.short + ".  You shake them from side to side enticingly.");
                    if (character.stats.lust >= 50) CView.text("  Your " + describeNipple(character, character.body.chest.firstRow!) + "s seem to demand " + target.desc.possessivePronoun + " attention.");
                }
                // Multirow
                if (character.body.chest.length > 1) {
                    // 50 + 10% per breastRow + breastSize%
                    CView.text("You lift your top, freeing your rows of " + describeBreastRow(character.body.chest.firstRow!) + " to jiggle freely.  You shake them from side to side enticingly");
                    if (character.stats.lust >= 50) CView.text(", your " + describeNipple(character, character.body.chest.firstRow!) + "s painfully visible.");
                    else CView.text(".");
                    chance++;
                }
                breasts = true;
                break;
            // 2 PUSSAH FLASHIN'
            case TeaseType.PussyFlash:
                if (character.body.legs.isTaur()) {
                    CView.text("You gallop toward your unsuspecting enemy, dodging their defenses and knocking them to the ground.  Before they can recover, you slam your massive centaur ass down upon them, stopping just short of using crushing force to pin them underneath you.  In this position, your opponent's face is buried right in your girthy horsecunt.  You grind your cunt into " + target.desc.possessivePronoun + " face for a moment before standing.  When you do, you're gratified to see your enemy covered in your lubricant and smelling powerfully of horsecunt.");
                    chance += 2;
                    damage += 4;
                }
                else {
                    CView.text("You open your " + character.inventory.armor.displayName + ", revealing your ");
                    if (character.body.cocks.length > 0) {
                        chance++;
                        damage++;
                        if (character.body.cocks.length === 1) CView.text(describeCock(character, character.body.cocks.get(0)!));
                        if (character.body.cocks.length > 1) CView.text(describeCocksLight(character));
                        CView.text(" and ");
                        if (character.effects.has(EffectType.BulgeArmor)) {
                            damage += 5;
                        }
                        penis = true;
                    }
                    CView.text(describeVagina(character, character.body.vaginas.get(0)!));
                    CView.text(".");
                }
                vagina = true;
                break;
            // 3 cock flash
            case TeaseType.CockFlash:
                if (character.body.legs.isTaur() && character.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length > 0) {
                    CView.text("You let out a bestial whinny and stomp your hooves at your enemy.  They prepare for an attack, but instead you kick your front hooves off the ground, revealing the hefty horsecock hanging beneath your belly.  You let it flop around, quickly getting rigid and to its full erect length.  You buck your hips as if you were fucking a mare in heat, letting your opponent know just what's in store for them if they surrender to pleasure...");
                    if (character.effects.has(EffectType.BulgeArmor)) damage += 5;
                }
                else {
                    CView.text("You open your " + character.inventory.armor.displayName + ", revealing your ");
                    if (character.body.cocks.length === 1) CView.text(describeCock(character, character.body.cocks.get(0)!));
                    if (character.body.cocks.length > 1) CView.text(describeCocksLight(character));
                    if (character.body.vaginas.length > 0) CView.text(" and ");
                    // Bulgy bonus!
                    if (character.effects.has(EffectType.BulgeArmor)) {
                        damage += 5;
                        chance++;
                    }
                    if (character.body.vaginas.length > 0) {
                        CView.text(describeVagina(character, character.body.vaginas.get(0)!));
                        vagina = true;
                    }
                    CView.text(".");
                }
                penis = true;
                break;
            // BIMBO
            // 4 butt shake
            case TeaseType.BimboButtShake:
                CView.text("You turn away and bounce your " + describeButt(character) + " up and down hypnotically");
                // Big butts = extra text + higher success
                if (character.body.butt.rating >= 10) {
                    CView.text(", making it jiggle delightfully.  " + target.desc.capitalA + target.desc.short + " even gets a few glimpses of the " + describeButthole(character.body.butt) + " between your cheeks.");
                    chance += 3;
                }
                // Small butts = less damage, still high success
                else if (character.body.vaginas.length > 0) {
                    CView.text(", letting " + target.desc.a + target.desc.short + " get a good look at your " + describeButthole(character.body.butt) + " and " + describeVagina(character, character.body.vaginas.get(0)!) + ".");
                    chance += 1;
                    vagina = true;
                }
                ass = true;
                anus = true;
                break;
            // 5 breast jiggle
            case TeaseType.BimboBreastJiggle:
                CView.text("You lean forward, letting the well-rounded curves of your " + describeAllBreasts(character) + " show to " + target.desc.a + target.desc.short + ".");
                CView.text("  You cup them in your palms and lewdly bounce them, putting on a show and giggling the entire time.  An inch at a time, your " + character.inventory.armor.displayName + " starts to come down, dropping tantalizingly slowly until your " + describeNipple(character, character.body.chest.firstRow!) + "s pop free.");
                if (character.stats.lust >= 50) {
                    if (character.body.chest.find(BreastRow.FuckableNipples)) {
                        chance++;
                        CView.text("  Clear slime leaks from them, making it quite clear that they're more than just nipples.");
                    }
                    else CView.text("  Your hard nipples seem to demand " + target.desc.possessivePronoun + " attention.");
                    chance += 1;
                    damage += 2;
                }
                // Damage boosts!
                breasts = true;
                break;
            // 6 pussy flash
            case TeaseType.BimboPussyFlash:
                if (character.effects.has(EffectType.BimboBrains) || character.effects.has(EffectType.FutaFaculties)) {
                    CView.text("You coyly open your " + character.inventory.armor.displayName + " and giggle, \"<i>Is this, like, what you wanted to see?</i>\"  ");
                }
                else {
                    CView.text("You coyly open your " + character.inventory.armor.displayName + " and purr, \"<i>Does the thought of a hot, ");
                    if (futa) CView.text("futanari ");
                    else if (character.effects.has(EffectType.BimboBody)) CView.text("bimbo ");
                    else CView.text("sexy ");
                    CView.text("body turn you on?</i>\"  ");
                }
                if (target.desc.plural)
                    CView.text(target.desc.capitalA + target.desc.short + "' gazes are riveted on your groin as you run your fingers up and down your folds seductively.");
                else
                    CView.text(target.desc.capitalA + target.desc.short + "'s gaze is riveted on your groin as you run your fingers up and down your folds seductively.");
                if (character.body.clit.length > 3) CView.text("  You smile as your " + describeClit(character) + " swells out from the folds and stands proudly, begging to be touched.");
                else CView.text("  You smile and pull apart your lower-lips to expose your " + describeClit(character) + ", giving the perfect view.");
                if (character.body.cocks.length > 0) CView.text("  Meanwhile, " + describeOneOfYourCocks(character) + " bobs back and forth with your gyrating hips, adding to the display.");
                // BONUSES!
                if (character.body.cocks.length > 0) {
                    if (character.effects.has(EffectType.BulgeArmor)) damage += 5;
                    penis = true;
                }
                vagina = true;
                break;
            // 7 special Adjatha-crafted bend over bimbo times
            case TeaseType.BimboSpecial:
                CView.text("The glinting of light catches your eye and you whip around to inspect the glittering object, turning your back on " + target.desc.a + target.desc.short + ".  Locking your knees, you bend waaaaay over, " + describeChest(character) + " swinging in the open air while your " + describeButt(character) + " juts out at the " + target.desc.a + target.desc.short + ".  Your plump cheeks and " + describeHips(character) + " form a jiggling heart-shape as you eagerly rub your thighs together.\n\n");
                CView.text("The clear, warm fluid of your happy excitement trickles down from your loins, polishing your " + describeSkin(character) + " to a glossy, inviting shine.  Retrieving the useless, though shiny, bauble, you hold your pose for just a moment longer, a sly little smile playing across your lips as you wiggle your cheeks one more time before straightening up and turning back around.");
                vagina = true;
                chance++;
                damage += 2;
                break;
            // ==BRO STUFF=====
            // 8 Pec Dance
            case TeaseType.BroPecDance:
                CView.text("You place your hands on your hips and flex repeatedly, skillfully making your pecs alternatively bounce in a muscular dance.  ");
                if (character.effects.has(EffectType.BroBrains)) CView.text("Damn, " + target.desc.a + target.desc.short + " has got to love this!");
                else CView.text(target.desc.capitalA + target.desc.short + " will probably enjoy the show, but you feel a bit silly doing this.");
                chance += (character.body.tone - 75) / 5;
                damage += (character.body.tone - 70) / 5;
                auto = false;
                break;
            // 9 Heroic Pose
            case TeaseType.BroHeroicPose:
                CView.text("You lift your arms and flex your incredibly muscular arms while flashing your most disarming smile.  ");
                if (character.effects.has(EffectType.BroBrains)) CView.text(target.desc.capitalA + target.desc.short + " can't resist such a heroic pose!");
                else CView.text("At least the physical changes to your body are proving useful!");
                chance += (character.body.tone - 75) / 5;
                damage += (character.body.tone - 70) / 5;
                auto = false;
                break;
            // 10 Bulgy groin thrust
            case TeaseType.BroBulgyGroinThrust:
                CView.text("You lean back and pump your hips at " + target.desc.a + target.desc.short + " in an incredibly vulgar display.  The bulging, barely-contained outline of your " + describeCock(character, character.body.cocks.get(0)!) + " presses hard into your gear.  ");
                if (character.effects.has(EffectType.BroBrains)) CView.text("No way could " + target.desc.subjectivePronoun + " resist your huge cock!");
                else CView.text("This is so crude, but at the same time, you know it'll likely be effective.");
                CView.text("  You go on like that, humping the air for your foe");
                CView.text("'s");
                CView.text(" benefit, trying to entice them with your man-meat.");
                if (character.effects.has(EffectType.BulgeArmor)) damage += 5;
                penis = true;
                break;
            // 11 Show off dick
            case TeaseType.BroShowOffDick:
                if (Settings.sillyMode && randInt(2) === 0) CView.text("You strike a herculean pose and flex, whispering, \"<i>Do you even lift?</i>\" to " + target.desc.a + target.desc.short + ".");
                else {
                    CView.text("You open your " + character.inventory.armor.displayName + " just enough to let your " + describeCock(character, character.body.cocks.get(0)!) + " and " + describeBalls(true, true, character) + " dangle free.  A shiny rope of pre-cum dangles from your cock, showing that your reproductive system is every bit as fit as the rest of you.  ");
                    if (character.effects.has(EffectType.BroBrains)) CView.text("Bitches love a cum-leaking cock.");
                    else CView.text("You've got to admit, you look pretty good down there.");
                }
                if (character.effects.has(EffectType.BulgeArmor)) damage += 5;
                penis = true;
                break;
            // ==EXTRAS========
            // 12 Cat flexibility.
            case TeaseType.CatFlexibility:
                // CAT TEASE MOTHERFUCK (requires flexibility and legs [maybe can't do it with armor?])
                CView.text("Reaching down, you grab an ankle and pull it backwards, looping it up and over to touch the foot to your " + describeHair(character) + ".  You bring the leg out to the side, showing off your " + describeVagina(character, character.body.vaginas.get(0)!) + " through your " + character.inventory.armor.displayName + ".  The combination of the lack of discomfort on your face and the ease of which you're able to pose shows " + target.desc.a + target.desc.short + " how good of a time they're in for with you.");
                vagina = true;
                if (character.body.thickness < 33) chance++;
                else if (character.body.thickness >= 66) chance--;
                damage += (character.body.thickness - 50) / 10;
                break;
            // 13 Pregnant
            case TeaseType.Pregnant:
                // PREG
                CView.text("You lean back, feigning a swoon while pressing a hand on the small of your back.  The pose juts your huge, pregnant belly forward and makes the shiny spherical stomach look even bigger.  With a teasing groan, you rub the protruding tummy gently, biting your lip gently as you stare at " + target.desc.a + target.desc.short + " through heavily lidded eyes.  \"<i>All of this estrogen is making me frisky,</i>\" you moan, stroking hand gradually shifting to the southern hemisphere of your big baby-bump.");
                // if lactating
                if (character.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1) {
                    CView.text("  Your other hand moves to expose your " + describeChest(character) + ", cupping and squeezing a stream of milk to leak down the front of your " + character.inventory.armor.displayName + ".  \"<i>Help a mommy out.</i>\"\n\n");
                    chance += 2;
                    damage += 4;
                }
                const largestIncubation = character.body.wombs.filter(Womb.Pregnant).sort(Womb.LargestPregnancy).get(0)!.pregnancy!.incubation;
                if (largestIncubation < 100) {
                    chance++;
                    damage += 2;
                }
                if (largestIncubation < 50) {
                    chance++;
                    damage += 2;
                }
                break;
            // 14 Brood Mother
            case TeaseType.BroodMother:
                if (randInt(2) === 0) CView.text("You tear open your " + character.inventory.armor.displayName + " and slip a few fingers into your well-used birth canal, giving your opponent a good look at what they're missing.  \"<i>C'mon stud,</i>\" you say, voice dripping with lust and desire, \"<i>Come to mama " + character.desc.short + " and fuck my pussy 'til your baby batter just POURS out.  I want your children inside of me, I want your spawn crawling out of this cunt and begging for my milk.  Come on, FUCK ME PREGNANT!</i>\"");
                else CView.text("You wiggle your " + describeHips(character) + " at your enemy, giving them a long, tantalizing look at the hips that have passed so very many offspring.  \"<i>Oh, like what you see, bad boy?  Well why don't you just come on over and stuff that cock inside me?  Give me your seed, and I'll give you suuuuch beautiful offspring.  Oh?  Does that turn you on?  It does!  Come on, just let loose and fuck me full of your babies!</i>\"");
                chance += 2;
                damage += 4;
                if (character.effects.has(EffectType.Heat)) {
                    chance += 2;
                    damage += 4;
                }
                vagina = true;
                break;
            // 15 Nipplecunts
            case TeaseType.Nipplecunts:
                // Req's tits & Pussy
                if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating > 1 && character.body.vaginas.length > 0 && randInt(2) === 0) {
                    CView.text("Closing your eyes, you lean forward and slip a hand under your " + character.inventory.armor.displayName + ".  You let out the slightest of gasps as your fingers find your drooling honeypot, warm tips poking, one after another between your engorged lips.  When you withdraw your hand, your fingers have been soaked in the dripping passion of your cunny, translucent beads rolling down to wet your palm.  With your other hand, you pull down the top of your " + character.inventory.armor.displayName + " and bare your " + describeChest(character) + " to " + target.desc.a + target.desc.short + ".\n\n");
                    CView.text("Drawing your lust-slick hand to your " + describeNipple(character, character.body.chest.firstRow!) + "s, the yielding flesh of your cunt-like nipples parts before the teasing digits.  Using your own girl cum as added lubrication, you pump your fingers in and out of your nipples, moaning as you add progressively more digits until only your thumb remains to stroke the inflamed flesh of your over-stimulated chest.  Your throat releases the faintest squeak of your near-orgasmic delight and you pant, withdrawing your hands and readjusting your armor.\n\n");
                    CView.text("Despite how quiet you were, it's clear that every lewd, desperate noise you made was heard by " + target.desc.a + target.desc.short + ".");
                    chance += 2;
                    damage += 4;
                }
                else if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating > 1 && randInt(2) === 0) {
                    CView.text("You yank off the top of your " + character.inventory.armor.displayName + ", revealing your " + describeChest(character) + " and the gaping nipplecunts on each.  With a lusty smirk, you slip a pair of fingers into the nipples of your " + describeChest(character) + ", pulling the nipplecunt lips wide, revealing the lengthy, tight passage within.  You fingerfuck your nipplecunts, giving your enemy a good show before pulling your armor back on, leaving the tantalizing image of your gaping titpussies to linger in your foe's mind.");
                    chance += 1;
                    damage += 2;
                }
                else CView.text("You remove the front of your " + character.inventory.armor.displayName + " exposing your " + describeChest(character) + ".  Using both of your hands, you thrust two fingers into your nipple cunts, milky girl cum soaking your hands and fingers.  \"<i>Wouldn't you like to try out these holes too?</i>\"");
                breasts = true;
                break;
            // 16 Anal gape
            case TeaseType.AnalGape:
                CView.text("You quickly strip out of your " + character.inventory.armor.displayName + " and turn around, giving your " + describeButt(character) + " a hard slap and showing your enemy the real prize: your " + describeButthole(character.body.butt) + ".  With a smirk, you easily plunge your hand inside, burying yourself up to the wrist inside your anus.  You give yourself a quick fisting, watching the enemy over your shoulder while you moan lustily, sure to give them a good show.  You withdraw your hand and give your ass another sexy spank before readying for combat again.");
                anus = true;
                ass = true;
                break;
            // 17 Bee abdomen tease
            case TeaseType.BeeAbdomen:
                CView.text("You swing around, shedding the " + character.inventory.armor.displayName + " around your waist to expose your " + describeButt(character) + " to " + target.desc.a + target.desc.short + ".  Taking up your oversized bee abdomen in both hands, you heft the thing and wave it about teasingly.  Drops of venom drip to and fro, a few coming dangerously close to " + target.desc.objectivePronoun + ".  \"<i>Maybe if you behave well enough, I'll even drop a few eggs into your belly,</i>\" you say softly, dropping the abdomen back to dangle above your butt and redressing.");
                ass = true;
                chance += .5;
                damage += .5;
                break;
            // 18 DOG TEASE
            case TeaseType.DogTease:
                CView.text("You sit down like a dog, your [legs] are spread apart, showing your ");
                if (character.body.vaginas.length > 0) CView.text("parted cunt-lips");
                else CView.text("puckered asshole, hanging, erect maleness,");
                CView.text(" and your hands on the ground in front of you.  You pant heavily with your tongue out and promise, \"<i>I'll be a good little bitch for you</i>.\"");
                vagina = true;
                chance += 1;
                damage += 2;
                break;
            // 19 MAX FEM TEASE - SYMPHONIE
            case TeaseType.MaxFemininity:
                CView.text("You make sure to capture your foe's attention, then slowly and methodically allow your tongue to slide along your lush, full lips.  The glistening moisture that remains on their plump beauty speaks of deep lust and deeper throats.  Batting your long lashes a few times, you pucker them into a playful blown kiss, punctuating the act with a small moan. Your gorgeous feminine features hint at exciting, passionate moments together, able to excite others with just your face alone.");
                chance += 2;
                damage += 4;
                break;
            // 20 MAX MASC TEASE
            case TeaseType.MaxManliness:
                CView.text("As your foe regards you, you recognize their attention is fixated on your upper body.  Thrusting your strong jaw forward you show off your chiseled chin, handsome features marking you as a flawless specimen.  Rolling your broad shoulders, you nod your head at your enemy.  The strong, commanding presence you give off could melt the heart of an icy nun.  Your perfect masculinity speaks to your confidence, allowing you to excite others with just your face alone.");
                chance += 2;
                damage += 4;
                break;
            // 21 MAX ADROGYN
            case TeaseType.PerfectAndrogyny:
                CView.text("You reach up and run your hands down your delicate, androgynous features.  With the power of a man but the delicacy of a woman, looking into your eyes invites an air of enticing mystery.  You blow a brief kiss to your enemy while at the same time radiating a sexually exciting confidence.  No one could identify your gender by looking at your features, and the burning curiosity they encourage could excite others with just your face alone.");
                damage -= 3;
                break;
            // 22 SPOIDAH SILK
            case TeaseType.SpirderSilk:
                CView.text("Reaching back, you milk some wet silk from your spider-y abdomen and present it to " + target.desc.a + target.desc.short + ", molding the sticky substance as " + target.desc.subjectivePronoun + " looks on curiously.  Within moments, you hold up a silken heart scuplture, and with a wink, you toss it at " + target.desc.objectivePronoun + ". It sticks to " + target.desc.possessivePronoun + " body, the sensation causing " + target.desc.objectivePronoun + " to hastily slap the heart off.  " + mf(target, "He", "She") + " returns " + target.desc.possessivePronoun + " gaze to you to find you turned around, " + describeButt(character) + " bared and abdomen bouncing lazily.  \"<i>I wonder what would happen if I webbed up your hole after I dropped some eggs inside?</i>\" you hiss mischievously.  " + mf(target, "He", "She") + " gulps.");
                ass = true;
                break;
            // 23 RUT TEASE
            case TeaseType.Rut:
                if (character.body.cocks.filter(Cock.FilterType(CockType.HORSE)).length > 0 && character.body.cocks.filter(Cock.FilterType(CockType.HORSE)).sort(Cock.Longest).get(0)!.length >= 12) {
                    CView.text("You whip out your massive horsecock, and are immediately surrounded by a massive, heady musk.  Your enemy swoons, nearly falling to her knees under your oderous assault.  Grinning, you grab her shoulders and force her to her knees.  Before she can defend herself, you slam your horsecock onto her head, running it up and down on her face, her nose acting like a sexy bump in an onahole.  You fuck her face -- literally -- for a moment before throwing her back and sheathing your cock.");
                }
                else {
                    CView.text("Panting with your unstoppable lust for the delicious, impregnable cunt before you, you yank off your " + character.inventory.armor.displayName + " with strength born of your inhuman rut, and quickly wave your fully erect cock at your enemy.  She flashes with lust, quickly feeling the heady effect of your man-musk.  You rush up, taking advantage of her aroused state and grab her shoulders.  ");
                    CView.text("Before she can react, you push her down until she's level with your cock, and start to spin it in a circle, slapping her right in the face with your musky man-meat.  Her eyes swim, trying to follow your meatspin as you swat her in the face with your cock!  Satisfied, you release her and prepare to fight!");
                }
                penis = true;
                break;
            // 24 STAFF POLEDANCE
            case TeaseType.Poledance:
                CView.text("You run your tongue across your lips as you plant your staff into the ground.  Before your enemy can react, you spin onto the long, wooden shaft, using it like an impromptu pole.  You lean back against the planted staff, giving your enemy a good look at your body.  You stretch backwards like a cat, nearly touching your fingertips to the ground beneath you, now holding onto the staff with only one leg.  You pull yourself upright and give your " + describeButt(character) + " a little slap and your " + describeChest(character) + " a wiggle before pulling open your " + character.inventory.armor.displayName + " and sliding the pole between your tits.  You drop down to a low crouch, only just covering your genitals with your hand as you shake your " + describeButt(character) + " playfully.  You give the enemy a little smirk as you slip your " + character.inventory.armor.displayName + " back on and pick up your staff.");
                ass = true;
                breasts = true;
                break;
            // TALL WOMAN TEASE
            case TeaseType.TallTease:
                CView.text("You move close to your enemy, handily stepping over " + target.desc.possessivePronoun + " defensive strike before leaning right down in " + target.desc.possessivePronoun + " face, giving " + target.desc.objectivePronoun + " a good long view at your cleavage.  \"<i>Hey, there, little " + mf(target, "guy", "girl") + ",</i>\" you smile.  Before " + target.desc.subjectivePronoun + " can react, you grab " + target.desc.objectivePronoun + " and smoosh " + target.desc.possessivePronoun + " face into your " + describeAllBreasts(character) + ", nearly choking " + target.desc.objectivePronoun + " in the canyon of your cleavage.  " + mf(target, "He", "She") + " struggles for a moment.  You give " + target.desc.objectivePronoun + " a little kiss on the head and step back, ready for combat.");
                breasts = true;
                chance += 2;
                damage += 4;
                break;
            // Magic Tease
            case TeaseType.Smartness:
                CView.text("Seeing a lull in the battle, you plant your " + character.inventory.weapon.displayName + " on the ground and let your magic flow through you.  You summon a trickle of magic into a thick, slowly growing black ball of lust.  You wave the ball in front of you, making a little dance and striptease out of the affair as you slowly saturate the area with latent sexual magics.");
                chance++;
                damage += 2;
                break;
            // Feeder
            case TeaseType.Feeder:
                CView.text("You present your swollen breasts full of milk to " + target.desc.a + target.desc.short + " and say \"<i>Wouldn't you just love to lie back in my arms and enjoy what I have to offer you?</i>\"");
                breasts = true;
                chance++;
                damage++;
                break;
            // 28 FEMALE TEACHER COSTUME TEASE
            case TeaseType.ClothesFemaleTeacher:
                CView.text("You turn to the side and give " + target.desc.a + target.desc.short + " a full view of your body.  You ask them if they're in need of a private lesson in lovemaking after class.");
                ass = true;
                break;
            // 29 Male Teacher Outfit Tease
            case TeaseType.ClothesMaleTeacher:
                CView.text("You play with the strings on your outfit a bit and ask " + target.desc.a + target.desc.short + " just how much do they want to see their teacher pull them off?");
                chance++;
                damage += 3;
                break;
            // 30 Naga Fetish Clothes
            case TeaseType.ClothesNagaFetish:
                CView.text("You sway your body back and forth, and do an erotic dance for " + target.desc.a + target.desc.short + ".");
                chance += 2;
                damage += 4;
                break;
            // 31 Centaur harness clothes
            case TeaseType.ClothesCentaurHarness:
                CView.text("You rear back, and declare that, \"<i>This horse is ready to ride, all night long!</i>\"");
                chance += 2;
                damage += 4;
                break;
            // 32 Genderless servant clothes
            case TeaseType.ClothesGenderlessServant:
                CView.text("You turn your back to your foe, and flip up your butt flap for a moment.   Your " + describeButt(character) + " really is all you have to offer downstairs.");
                ass = true;
                chance++;
                damage += 2;
                break;
            // 33 Crotch Revealing Clothes (herm only?)
            case TeaseType.ClothesCrotchRevealing:
                CView.text("You do a series of poses to accentuate what you've got on display with your crotch revealing clothes, while asking if your " + mf(character, "master", "mistress") + " is looking to sample what is on display.");
                chance += 2;
                damage += 4;
                break;
            // 34 Maid Costume (female only)
            case TeaseType.ClothesMaid:
                CView.text("You give a rather explicit curtsey towards " + target.desc.a + target.desc.short + " and ask them if your " + mf(character, "master", "mistress") + " is interested in other services today.");
                chance++;
                damage += 2;
                breasts = true;
                break;
            // 35 Servant Boy Clothes (male only)
            case TeaseType.ClothesServantBoy:
                CView.text("You brush aside your crotch flap for a moment, then ask " + target.desc.a + target.desc.short + " if, " + mf(character, "Master", "Mistress") + " would like you to use your " + describeCocksLight(character) + " on them?");
                penis = true;
                chance++;
                damage += 2;
                break;
            // 36 Bondage Patient Clothes (done):
            case TeaseType.ClothesBondagePatient:
                CView.text("You pull back one of the straps on your bondage cloths and let it snap back.  \"<i>I need some medical care, feeling up for it?</i>\" you tease.");
                damage += 2;
                chance++;
                break;
            default:
                CView.text("You shimmy and shake sensually. (An error occurred.)");
                break;
            case TeaseType.Kitsune1:
                CView.text("You purse your lips coyly, narrowing your eyes mischievously and beckoning to " + target.desc.a + target.desc.short + " with a burning come-hither glare.  Sauntering forward, you pop your hip to the side and strike a coquettish pose, running " + ((character.body.tails.length > 1) ? "one of your tails" : "your tail") + " up and down " + target.desc.possessivePronoun + " body sensually.");
                chance += 6;
                damage += 3;
                break;
            case TeaseType.Kitsune2:
                CView.text("You wet your lips, narrowing your eyes into a smoldering, hungry gaze.  Licking the tip of your index finger, you trail it slowly and sensually down the front of your " + character.inventory.armor.displayName + ", following the line of your " + describeChest(character) + " teasingly.  You hook your thumbs into your top and shimmy it downward at an agonizingly slow pace.  The very instant that your [nipples] pop free, your tail crosses in front, obscuring " + target.desc.a + target.desc.short + "'s view.");
                breasts = true;
                chance++;
                damage++;
                break;
            case TeaseType.Kitsune3:
                CView.text("Leaning forward, you bow down low, raising a hand up to your lips and blowing " + target.desc.a + target.desc.short + " a kiss.  You stand straight, wiggling your " + describeHips(character) + " back and forth seductively while trailing your fingers down your front slowly, pouting demurely.  The tip of ");
                if (character.body.tails.length === 1) CView.text("your");
                else CView.text("a");
                CView.text(" bushy tail curls up around your " + describeLeg(character) + ", uncoiling with a whipping motion that makes an audible crack in the air.");
                ass = true;
                chance++;
                damage += 1;
                break;
            case TeaseType.Kitsune4:
                CView.text("Turning around, you stare demurely over your shoulder at " + target.desc.a + target.desc.short + ", batting your eyelashes amorously.");
                if (character.body.tails.length === 1) CView.text("  Your tail twists and whips about, sliding around your " + describeHips(character) + " in a slow arc and framing your rear nicely as you slowly lift your " + character.inventory.armor.displayName + ".");
                else CView.text("  Your tails fan out, twisting and whipping sensually, sliding up and down your " + describeLegs(character) + " and framing your rear nicely as you slowly lift your " + character.inventory.armor.displayName + ".");
                CView.text("  As your [butt] comes into view, you brush your tail" + ((character.body.tails.length > 1) ? "s" : "") + " across it, partially obscuring the view in a tantalizingly teasing display.");
                ass = true;
                anus = true;
                chance++;
                damage += 2;
                break;
            case TeaseType.KitsuneGendered:
                CView.text("Smirking coyly, you sway from side to side, running your tongue along your upper teeth seductively.  You hook your thumbs into your " + character.inventory.armor.displayName + " and pull them away to partially reveal ");
                if (character.body.cocks.length > 0) CView.text(describeOneOfYourCocks(character));
                if (character.gender === Gender.HERM) CView.text(" and ");
                if (character.gender >= Gender.FEMALE) CView.text("your " + describeVagina(character, character.body.vaginas.get(0)!));
                CView.text(".  Your bushy tail" + ((character.body.tails.length > 1) ? "s" : "") + " cross" + ((character.body.tails.length > 1) ? "" : "es") + " in front, wrapping around your genitals and obscuring the view teasingly.");
                vagina = true;
                penis = true;
                damage += 2;
                chance++;
                break;
            case TeaseType.Urta:
                // Tease #1:
                if (randInt(2) === 0) {
                    CView.text("You lift your skirt and flash your king-sized stallionhood, already unsheathing itself and drooling pre, at your opponent.  \"<i>Come on, then; I got plenty of girlcock for you if that's what you want!</i>\" you cry.");
                    penis = true;
                    damage += 3;
                    chance--;
                }
                // Tease #2:
                else {
                    CView.text("You turn partially around and then bend over, swaying your tail from side to side in your most flirtatious manner and wiggling your hips seductively, your skirt fluttering with the motions.  \"<i>Come on then, what are you waiting for?  This is a fine piece of ass here,</i>\" you grin, spanking yourself with an audible slap.");
                    ass = true;
                    chance += 2;
                    damage += 3;
                }
                break;
            case TeaseType.Cowgirl:
                const cows: number = randInt(7);
                if (cows === 0) {
                    CView.text("You tuck your hands under your chin and use your arms to squeeze your massive, heavy breasts together.  Milk squirts from your erect nipples, filling the air with a rich, sweet scent.");
                    breasts = true;
                    chance += 2;
                    damage++;
                }
                else if (cows === 1) {
                    CView.text("Moaning, you bend forward, your full breasts nearly touching the ground as you sway your [hips] from side to side.  Looking up from under heavily-lidded eyes, you part your lips and lick them, letting out a low, lustful \"<i>Mooooo...</i>\"");
                    breasts = true;
                    chance += 2;
                    damage += 2;
                }
                else if (cows === 2) {
                    CView.text("You tuck a finger to your lips, blinking innocently, then flick your tail, wafting the scent of your ");
                    if (character.body.vaginas.get(0)!.wetness >= 3) CView.text("dripping ");
                    CView.text("sex through the air.");
                    vagina = true;
                    chance++;
                    damage++;
                }
                else if (cows === 3) {
                    CView.text("You heft your breasts, fingers splayed across your [nipples] as you SQUEEZE.  Milk runs in rivulets over your hands and down the massive curves of your breasts, soaking your front with sweet, sticky milk.");
                    breasts = true;
                    chance += 3;
                    damage++;
                }
                else if (cows === 4) {
                    CView.text("You lift a massive breast to your mouth, suckling loudly at yourself, finally letting go of your nipple with a POP and a loud, satisfied gasp, milk running down your chin.");
                    breasts = true;
                    chance++;
                    damage += 3;
                }
                else if (cows === 5) {
                    CView.text("You crouch low, letting your breasts dangle in front of you.  Each hand caresses one in turn as you slowly milk yourself onto your thighs, splashing white, creamy milk over your hips and sex.");
                    vagina = true;
                    breasts = true;
                    chance++;
                }
                else {
                    CView.text("You lift a breast to your mouth, taking a deep draught of your own milk, then tilt your head back.  With a low moan, you let it run down your front, winding a path between your breasts until it drips sweetly from your crotch.");
                    vagina = true;
                    breasts = true;
                    damage += 2;
                }
                if (target.desc.short.indexOf("minotaur") !== -1) {
                    damage += 6;
                    chance += 3;
                }
                break;
            // lusty maiden's armor teases
            case TeaseType.ClothesBikiniMail:
                const maiden: number = randInt(5);
                damage += 5;
                chance += 3;
                if (maiden === 0) {
                    CView.text("Confidently sauntering forward, you thrust your chest out with your back arched in order to enhance your [chest].  You slowly begin to shake your torso back and forth, slapping your chain-clad breasts against each other again and again.  One of your hands finds its way to one of the pillowy expanses and grabs hold, fingers sinking into the soft tit through the fine, mail covering.  You stop your shaking to trace a finger down through the exposed center of your cleavage, asking, \"<i>Don't you just want to snuggle inside?</i>\"");
                    breasts = true;
                }
                else if (maiden === 1) {
                    CView.text("You skip up to " + target.desc.a + target.desc.short + " and spin around to rub your barely-covered butt up against " + target.desc.objectivePronoun + ".  Before " + target.desc.subjectivePronoun + " can react, you're slowly bouncing your [butt] up and down against " + target.desc.possessivePronoun + " groin.  When " + target.desc.subjectivePronoun + " reaches down, you grab " + target.desc.possessivePronoun + " hand and press it up, under your skirt, right against the steamy seal on your sex.  The simmering heat of your overwhelming lust burns hot enough for " + target.desc.objectivePronoun + " to feel even through the contoured leather, and you let " + target.desc.objectivePronoun + " trace the inside of your [leg] for a moment before moving away, laughing playfully.");
                    ass = true;
                    vagina = true;
                }
                else if (maiden === 2) {
                    CView.text("You flip up the barely-modest chain you call a skirt and expose your g-string to " + target.desc.a + target.desc.short + ".  Slowly swaying your [hips], you press a finger down on the creased crotch plate and exaggerate a lascivious moan into a throaty purr of enticing, sexual bliss.  Your eyes meet " + target.desc.possessivePronoun + ", and you throatily whisper, \"<i>");
                    if (character.body.vaginas.filter(Vagina.NotVirgin).length === 0) CView.text("Think you can handle a virgin's infinite lust?");
                    else CView.text("Think you have what it takes to satisfy this perfect pussy?");
                    CView.text("</i>\"");
                    vagina = true;
                    damage += 3;
                }
                else if (maiden === 3) {
                    CView.text("You seductively wiggle your way up to " + target.desc.a + target.desc.short + ", and before " + target.desc.subjectivePronoun + " can react to your salacious advance, you snap a [leg] up in what would be a vicious kick, if you weren't simply raising it to rest your [foot] on " + target.desc.possessivePronoun + " shoulder.  With your thighs so perfectly spready, your skirt is lifted, and " + target.desc.a + target.desc.short + " is given a perfect view of your thong-enhanced cameltoe and the moisture that beads at the edges of your not-so-modest covering.");
                    vagina = true;
                }
                else {
                    CView.text("Bending over, you lift your [butt] high in the air.  Most of your barely-covered tush is exposed, but the hem of your chainmail skirt still protects some of your anal modesty.  That doesn't last long.  You start shaking your [butt] up, down, back, and forth to an unheard rhythm, flipping the pointless covering out of the way so that " + target.desc.a + target.desc.short + " can gaze upon your curvy behind in it all its splendid detail.  A part of you hopes that " + target.desc.subjectivePronoun + " takes in the intricate filigree on the back of your thong, though to " + target.desc.objectivePronoun + " it looks like a bunch of glittering arrows on an alabaster background, all pointing squarely at your [asshole].");
                    ass = true;
                    chance += 2;
                }
                break;
        }
        // ===========================
        // BUILD BONUSES IF APPLICABLE
        // ===========================
        let bonusChance: number = 0;
        let bonusDamage: number = 0;
        if (auto) {
            // TIT BONUSES
            if (breasts) {
                if (character.body.chest.length > 1) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.chest.length > 2) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.chest.length > 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 2) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (character.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 3) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 7) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 12) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 25) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 50) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.chest.find(BreastRow.FuckableNipples)) {
                    bonusChance++;
                    bonusDamage += 2;
                }
                if (character.body.chest.reduce(BreastRow.AverageNipplesPerBreast, 0) > 1) {
                    bonusChance++;
                    bonusDamage += 2;
                }
            }
            // PUSSY BONUSES
            if (vagina) {
                if (character.body.vaginas.length > 0 && character.body.vaginas.get(0)!.wetness >= 2) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.vaginas.length > 0 && character.body.vaginas.get(0)!.wetness >= 3) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.vaginas.length > 0 && character.body.vaginas.get(0)!.wetness >= 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.vaginas.length > 0 && character.body.vaginas.get(0)!.wetness >= 5) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.clit.length > 1.5) {
                    bonusChance += .5;
                    bonusDamage++;
                }
                if (character.body.clit.length > 3.5) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.clit.length > 7) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.clit.length > 12) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.vaginalCapacity() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.vaginalCapacity() >= 70) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.vaginalCapacity() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.vaginalCapacity() >= 200) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
            }
            // Penis bonuses!
            if (penis) {
                if (character.body.cocks.length > 1) {
                    bonusChance += 1;
                    bonusDamage += 2;
                }
                if (character.body.cocks.sort(Cock.Largest).get(0)!.area >= 15) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.cocks.sort(Cock.Largest).get(0)!.area >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.cocks.sort(Cock.Largest).get(0)!.area >= 60) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.cocks.sort(Cock.Largest).get(0)!.area >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.cumQ() >= 50) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.cumQ() >= 150) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.cumQ() >= 300) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.cumQ() >= 1000) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.balls.count > 0) {
                    if (character.body.balls.count > 2) {
                        bonusChance += 1;
                        bonusDamage += 2;
                    }
                    if (character.body.balls.size > 3) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                    if (character.body.balls.size > 7) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                    if (character.body.balls.size > 12) {
                        bonusChance += .5;
                        bonusDamage += 1;
                    }
                }
                if (character.body.cocks.sort(Cock.Largest).get(0)!.area < 8) {
                    bonusChance--;
                    bonusDamage -= 2;
                    if (character.body.cocks.sort(Cock.Largest).get(0)!.area < 5) {
                        bonusChance--;
                        bonusDamage -= 2;
                    }
                }
            }
            if (ass) {
                if (character.body.butt.rating >= 6) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.butt.rating >= 10) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.butt.rating >= 13) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.butt.rating >= 16) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.butt.rating >= 20) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.hips.rating >= 6) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.hips.rating >= 10) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.hips.rating >= 13) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.hips.rating >= 16) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.hips.rating >= 20) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
            }
            if (anus) {
                if (character.body.butt.looseness === 0) {
                    bonusChance += 1.5;
                    bonusDamage += 3;
                }
                if (character.body.butt.wetness > 0) {
                    bonusChance += 1;
                    bonusDamage += 2;
                }
                if (character.analCapacity() >= 30) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.analCapacity() >= 70) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.analCapacity() >= 120) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.analCapacity() >= 200) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.butt.looseness === 4) {
                    bonusChance += .5;
                    bonusDamage += 1;
                }
                if (character.body.butt.looseness === 5) {
                    bonusChance += 1.5;
                    bonusDamage += 3;
                }
            }
            // Trim it down!
            if (bonusChance > 5) bonusChance = 5;
            if (bonusDamage > 10) bonusDamage = 10;
        }
        // Land the hit!
        if (randInt(100) <= chance + randInt(bonusChance)) {
            // NERF TEASE DAMAGE
            damage *= .7;
            bonusDamage *= .7;
            if (character.effects.has(EffectType.HistoryWhore)) {
                damage *= 1.15;
                bonusDamage *= 1.15;
            }
            if (target.desc.plural) damage *= 1.3;
            damage = (damage + randInt(bonusDamage)) * target.stats.lustVuln;

            target.stats.lust += damage;

            if (CeraphFlags.PC_FETISH >= 1) {
                if (character.stats.lust < 75) CView.text("\nFlaunting your body in such a way gets you a little hot and bothered.");
                else CView.text("\nIf you keep exposing yourself you're going to get too horny to fight back.  This exhibitionism fetish makes it hard to resist just stripping naked and giving up.");
                character.stats.lust += 2 + randInt(3);
            }

            character.combat.teaseXP(1);
        }
        // Nuttin honey
        else {
            character.combat.teaseXP(5);

            CView.text("\n" + target.desc.capitalA + target.desc.short + " seems unimpressed.");
        }
        CView.text("\n\n");
    }
}
