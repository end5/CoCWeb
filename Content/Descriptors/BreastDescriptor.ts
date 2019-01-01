import { randInt, randomChoice } from 'Engine/Utilities/SMath';
import { BreastCup, BreastRow } from 'Engine/Body/BreastRow';
import { Chest } from 'Engine/Body/Chest';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { PiercingName } from 'Content/Items/PiercingName';

export function describeBreastRow(breastRow: BreastRow | undefined): string {
    if (!breastRow) return "";
    const size: number = breastRow.rating;
    const lactation: number = breastRow.lactationMultiplier;

    if (size < 1) return "flat breasts";
    // Add a description of the breast size 50% of the time
    let description: string = (randInt(2) === 0 ? describeBreastSize(size) : "");
    switch (randInt(10)) {
        case 1:
            if (lactation > 2) return description + "milk-udders";
            break;
        case 2:
            if (lactation > 1.5) description += "milky ";
            if (size > 4) return description + "tits";
            break;
        case 4:
        case 5:
        case 6:
            return description + "tits";
        case 7:
            if (lactation >= 2.5) return description + "udders";
            if (lactation >= 1) description += "milk ";
            return description + "jugs";
        case 8:
            if (size > 6) return description + "love-pillows";
            return description + "boobs";
        case 9:
            if (size > 6) return description + "tits";
        default:
    }
    return description + "breasts";
}

export function describeNipple(character: Character, breastRow: BreastRow | undefined): string {
    if (!breastRow) return "";
    let haveDescription: boolean = false;
    let description: string = "";
    let options: string[] = [];
    const breastRowIndex = character.body.chest.indexOf(breastRow);
    const nipplePiercings = character.inventory.piercings.nipples.get(breastRowIndex);
    // Size descriptors 33% chance
    if (randInt(4) === 0) {
        // TINAHHHH
        if (breastRow.nipples.length < .25) {
            options = ["tiny ",
                "itty-bitty ",
                "teeny-tiny ",
                "dainty "];
            description += randomChoice(options);
        }
        // Prominant
        if (breastRow.nipples.length >= .4 && breastRow.nipples.length < 1) {
            options = ["prominent ",
                "pencil eraser-sized ",
                "eye-catching ",
                "pronounced ",
                "striking "];
            description += randomChoice(options);
        }
        // Big 'uns
        if (breastRow.nipples.length >= 1 && breastRow.nipples.length < 2) {
            options = ["forwards-jutting ",
                "over-sized ",
                "fleshy ",
                "large protruding "];
            description += randomChoice(options);
        }
        // 'Uge
        if (breastRow.nipples.length >= 2 && breastRow.nipples.length < 3.2) {
            options = ["elongated ",
                "massive ",
                "awkward ",
                "lavish ",
                "hefty "];
            description += randomChoice(options);
        }
        // Massive
        if (breastRow.nipples.length >= 3.2) {
            options = ["bulky ",
                "ponderous ",
                "thumb-sized ",
                "cock-sized ",
                "cow-like "];
            description += randomChoice(options);
        }
        haveDescription = true;
    }
    // Milkiness/Arousal/Wetness Descriptors 33% of the time
    if (randInt(3) === 0 && !haveDescription) {
        // Fuckable chance first!
        if (breastRow.nipples.fuckable) {
            // Fuckable and lactating?
            if (breastRow.lactationMultiplier > 1) {
                options = ["milk-lubricated ",
                    "lactating ",
                    "lactating ",
                    "milk-slicked ",
                    "milky "];
                description += randomChoice(options);
            }
            // Just fuckable
            else {
                options = ["wet ",
                    "mutated ",
                    "slimy ",
                    "damp ",
                    "moist ",
                    "slippery ",
                    "oozing ",
                    "sloppy ",
                    "dewy "];
                description += randomChoice(options);
            }
            haveDescription = true;
        }
        // Just lactating!
        else if (breastRow.lactationMultiplier > 0) {
            // Light lactation
            if (breastRow.lactationMultiplier <= 1) {
                options = ["milk moistened ",
                    "slightly lactating ",
                    "milk-dampened "];
                description += randomChoice(options);
            }
            // Moderate lactation
            if (breastRow.lactationMultiplier > 1 && breastRow.lactationMultiplier <= 2) {
                options = ["lactating ",
                    "milky ",
                    "milk-seeping "];
                description += randomChoice(options);
            }
            // Heavy lactation
            if (breastRow.lactationMultiplier > 2) {
                options = ["dripping ",
                    "dribbling ",
                    "milk-leaking ",
                    "drooling "];
                description += randomChoice(options);
            }
            haveDescription = true;
        }
    }
    // Possible arousal descriptors
    else if (randInt(3) === 0 && !haveDescription) {
        if (character.stats.lust > 50 && character.stats.lust < 75) {
            options = ["erect ",
                "perky ",
                "erect ",
                "firm ",
                "tender "];
            description += randomChoice(options);
            haveDescription = true;
        }
        if (character.stats.lust >= 75) {
            options = ["throbbing ",
                "trembling ",
                "needy ",
                "throbbing "];
            description += randomChoice(options);
            haveDescription = true;
        }
    }
    if (!haveDescription && randInt(2) === 0 && nipplePiercings && nipplePiercings.isEquipped()) {
        if (nipplePiercings.item!.name === PiercingName.Chain)
            description += "chained ";
        else
            description += "pierced ";
        haveDescription = true;
    }
    if (!haveDescription && character.body.skin.type === 3) {
        options = ["slime-slick ",
            "goopy ",
            "slippery "];
        description += randomChoice(options);
    }
    if (!haveDescription && character.effects.has(EffectType.BlackNipples)) {
        options = ["black ",
            "ebony ",
            "sable "];
        description += randomChoice(options);
    }

    options = [];
    options.push("nipple");

    if (breastRow.nipples.length < .5)
        options.push("perky nipple");
    else
        options.push("cherry-like nub");

    if (breastRow.nipples.fuckable)
        options.push("fuckable nip", "nipple-hole", "nipple-cunt");
    else if (breastRow.lactationMultiplier >= 1 && breastRow.nipples.length >= 1)
        options.push("teat");

    return description;
}

export const BreastCupNames: string[] = [
    "flat", // 0
    "A-cup", "B-cup", "C-cup", "D-cup", "DD-cup", "big DD-cup", "E-cup", "big E-cup", "EE-cup", // 1-9
    "big EE-cup", "F-cup", "big F-cup", "FF-cup", "big FF-cup", "G-cup", "big G-cup", "GG-cup", "big GG-cup", "H-cup", // 10-19
    "big H-cup", "HH-cup", "big HH-cup", "HHH-cup", "I-cup", "big I-cup", "II-cup", "big II-cup", "J-cup", "big J-cup", // 20-29
    "JJ-cup", "big JJ-cup", "K-cup", "big K-cup", "KK-cup", "big KK-cup", "L-cup", "big L-cup", "LL-cup", "big LL-cup", // 30-39
    "M-cup", "big M-cup", "MM-cup", "big MM-cup", "MMM-cup", "large MMM-cup", "N-cup", "large N-cup", "NN-cup", "large NN-cup", // 40-49
    "O-cup", "large O-cup", "OO-cup", "large OO-cup", "P-cup", "large P-cup", "PP-cup", "large PP-cup", "Q-cup", "large Q-cup", // 50-59
    "QQ-cup", "large QQ-cup", "R-cup", "large R-cup", "RR-cup", "large RR-cup", "S-cup", "large S-cup", "SS-cup", "large SS-cup", // 60-69
    "T-cup", "large T-cup", "TT-cup", "large TT-cup", "U-cup", "large U-cup", "UU-cup", "large UU-cup", "V-cup", "large V-cup", // 70-79
    "VV-cup", "large VV-cup", "W-cup", "large W-cup", "WW-cup", "large WW-cup", "X-cup", "large X-cup", "XX-cup", "large XX-cup", // 80-89
    "Y-cup", "large Y-cup", "YY-cup", "large YY-cup", "Z-cup", "large Z-cup", "ZZ-cup", "large ZZ-cup", "ZZZ-cup", "large ZZZ-cup"// 90-99
];

export function breastCup(size: BreastCup): string {
    return BreastCupNames[Math.min(Math.floor(size), BreastCupNames.length - 1)];
}

/**
 * Returns breast size from cup name.
 * Acceptable input: "flat","A","B","C","D","DD","DD+",... "ZZZ","ZZZ+" or exact match from BreastCupNames array
 */
export function breastCupInverse(name: string, defaultValue: BreastCup = 0): BreastCup {
    if (name.length === 0)
        return defaultValue;
    if (name === "flat")
        return BreastCup.FLAT;
    const big: boolean = name.charAt(name.length - 1) === "+";
    if (big)
        name = name.substr(0, name.length - 1);
    for (let cup: number = 0; cup < BreastCupNames.length; cup++) {
        if (name === BreastCupNames[cup])
            return cup;
        if (BreastCupNames[cup].indexOf(name) === 0)
            return cup + (big ? 1 : 0);
    }
    return defaultValue;
}

export function describeBiggestBreastRow(character: Character): string {
    let description: string = "";
    const biggestBreastRow = character.body.chest.sort(BreastRow.Largest).get(0)!;

    if (biggestBreastRow.rating < 1)
        return "flat breasts";
    // 50% of the time size-descript them
    if (randInt(2) === 0)
        description += describeBreastSize(biggestBreastRow.rating);

    // Nouns!
    const options: string[] = [];
    if (biggestBreastRow.rating > 6)
        options.push("love-pillows");
    if (biggestBreastRow.lactationMultiplier > 1.5)
        options.push("milky tits", "milky breasts");
    if (biggestBreastRow.lactationMultiplier > 2)
        options.push("milk-udders");
    if (biggestBreastRow.lactationMultiplier >= 1 && biggestBreastRow.lactationMultiplier < 2.5)
        options.push("milk jugs");
    if (biggestBreastRow.lactationMultiplier >= 2.5)
        options.push("udders");
    if (biggestBreastRow.lactationMultiplier < 1)
        options.push("jugs");

    options.push("boobs", "breasts", "tits");

    description += randomChoice(options);
    return description;
}

export function describeBreastSize(size: number): string {
    let description: string = "";
    // Catch all for dudes.
    if (size < BreastCup.A) return "manly ";
    // Small - A->B
    if (size <= BreastCup.B) {
        description += randomChoice("palmable ", "tight ", "perky ", "baseball-sized ");
    }
    // C-D
    else if (size <= BreastCup.D) {
        description += randomChoice("nice ", "hand-filling ", "well-rounded ", "supple ", "softball-sized ");
    }
    // DD->big EE
    else if (size < BreastCup.F) {
        description += randomChoice("big ", "large ", "pillowy ", "jiggly ", "volleyball-sized ");
    }
    // F->big FF
    else if (size < BreastCup.G) {
        description += randomChoice("soccerball-sized ", "hand-overflowing ", "generous ", "jiggling ");
    }
    // G -> HHH
    else if (size < BreastCup.I) {
        description += randomChoice("basketball-sized ", "whorish ", "cushiony ", "wobbling ");
    }
    // I -> KK
    else if (size < BreastCup.KK_BIG) {
        description += randomChoice("massive motherly ", "luscious ", "smothering ", "prodigious ");
    }
    // K- > MMM+
    else {
        description += randomChoice("mountainous ", "monumental ", "back-breaking ", "exercise-ball-sized ", "immense ");
    }
    return description;
}

export function describeAllBreasts(character: Character): string {
    const chest: Chest = character.body.chest;
    let desciption: string = "";
    switch (chest.length / 2) {
        case 0:
            return "unremarkable chest muscles ";
        case 2:
            desciption += "two rows of ";
        case 3:
            desciption += randomChoice("three rows of ", "multi-layered ");
        case 4:
            desciption += randomChoice("four rows of ", "four-tiered ");
        case 5:
            desciption += randomChoice("five rows of ", "five-tiered ");
    }
    desciption += describeBiggestBreastRow(character);
    return desciption;

}

export function describeBreastGrowth(character: Character, amount: number): string {
    let text = "";
    const breastRow = character.body.chest.firstRow;
    const chest = character.body.chest;
    if (amount <= 2) {
        if (chest.length > 1) text += "Your rows of " + describeBreastRow(breastRow) + " jiggle with added weight, growing a bit larger.";
        if (chest.length === 1) text += "Your " + describeBreastRow(breastRow) + " jiggle with added weight as they expand, growing a bit larger.";
    }
    else if (amount <= 4) {
        if (chest.length > 1) text += "You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your rows of " + describeBreastRow(breastRow) + " expand significantly.";
        if (chest.length === 1) text += "You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + describeBreastRow(breastRow) + " expand significantly.";
    }
    else {
        if (chest.length > 1) text += "You drop to your knees from a massive change in your body's center of gravity.  Your " + describeBreastRow(breastRow) + " tingle strongly, growing disturbingly large.";
        if (chest.length === 1) text += "You drop to your knees from a massive change in your center of gravity.  The tingling in your " + describeBreastRow(breastRow) + " intensifies as they continue to grow at an obscene rate.";
    }
    if (chest.sort(BreastRow.Largest).get(0)!.rating >= 8.5 && chest.sort(BreastRow.Largest).get(0)!.nipples.length < 2) {
        text += "  A tender ratingat your " + describeNipple(character, breastRow) + "s as they grow to match your burgeoning breast-flesh.";
        chest.sort(BreastRow.Largest).get(0)!.nipples.length = 2;
    }
    if (chest.sort(BreastRow.Largest).get(0)!.rating >= 7 && chest.sort(BreastRow.Largest).get(0)!.nipples.length < 1) {
        text += "  A tender ratingat your " + describeNipple(character, breastRow) + "s as they grow to match your burgeoning breast-flesh.";
        chest.sort(BreastRow.Largest).get(0)!.nipples.length = 1;
    }
    if (chest.sort(BreastRow.Largest).get(0)!.rating >= 5 && chest.sort(BreastRow.Largest).get(0)!.nipples.length < .75) {
        text += "  A tender ratingat your " + describeNipple(character, breastRow) + "s as they grow to match your burgeoning breast-flesh.";
        chest.sort(BreastRow.Largest).get(0)!.nipples.length = .75;
    }
    if (chest.sort(BreastRow.Largest).get(0)!.rating >= 3 && chest.sort(BreastRow.Largest).get(0)!.nipples.length < .5) {
        text += "  A tender ratingat your " + describeNipple(character, breastRow) + "s as they grow to match your burgeoning breast-flesh.";
        chest.sort(BreastRow.Largest).get(0)!.nipples.length = .5;
    }
    return text;
}

export function describeTopRowBreastGrowth(character: Character, amount: number) {
    const chest = character.body.chest;
    const topBreastRow = chest.firstRow;
    let text = "";
    if (amount <= 2) {
        if (chest.length > 1) text += "Your top row of " + describeBreastRow(topBreastRow) + " jiggles with added weight as it expands, growing a bit larger.";
        if (chest.length === 1) text += "Your row of " + describeBreastRow(topBreastRow) + " jiggles with added weight as it expands, growing a bit larger.";
    }
    if (amount > 2 && amount <= 4) {
        if (chest.length > 1) text += "You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your top row of " + describeBreastRow(topBreastRow) + " expand significantly.";
        if (chest.length === 1) text += "You stagger as your chest gets much heavier.  Looking down, you watch with curiosity as your " + describeBreastRow(topBreastRow) + " expand significantly.";
    }
    if (amount > 4) {
        if (chest.length > 1) text += "You drop to your knees from a massive change in your body's center of gravity.  Your top row of " + describeBreastRow(topBreastRow) + " tingle strongly, growing disturbingly large.";
        if (chest.length === 1) text += "You drop to your knees from a massive change in your center of gravity.  The tinglng in your " + describeBreastRow(topBreastRow) + " intensifies as they continue to grow at an obscene rate.";
    }
    if (topBreastRow.rating >= 8.5 && topBreastRow.nipples.length < 2) {
        text += "  A tender ache starts at your " + describeNipple(character, topBreastRow) + "s as they grow to match your burgeoning breast-flesh.";
        topBreastRow.nipples.length = 2;
    }
    if (topBreastRow.rating >= 7 && topBreastRow.nipples.length < 1) {
        text += "  A tender ache starts at your " + describeNipple(character, topBreastRow) + "s as they grow to match your burgeoning breast-flesh.";
        topBreastRow.nipples.length = 1;
    }
    if (topBreastRow.rating >= 5 && topBreastRow.nipples.length < .75) {
        text += "  A tender ache starts at your " + describeNipple(character, topBreastRow) + "s as they grow to match your burgeoning breast-flesh.";
        topBreastRow.nipples.length = .75;
    }
    if (topBreastRow.rating >= 3 && topBreastRow.nipples.length < .5) {
        text += "  A tender ache starts at your " + describeNipple(character, topBreastRow) + "s as they grow to match your burgeoning breast-flesh.";
        topBreastRow.nipples.length = .5;
    }
    return text;
}

export function describeChest(character: Character) {
    if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating < 1) return "chest";
    return describeBiggestBreastRow(character);
}

export function describeAllChest(character: Character) {
    if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating < 1) return "chest";
    return describeAllBreasts(character);
}
