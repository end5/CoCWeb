import { randInt } from 'Engine/Utilities/SMath';
import { BreastRow } from 'Engine/Body/BreastRow';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { breastCup, describeBreastRow } from 'Content/Descriptors/BreastDescriptor';
import { CView } from 'Engine/Display/ContentView';
import { Settings } from 'Content/Settings';

/**
 * Finds and grows the smallest breast row N times.
 * Pair with describeBreastGrowth to show output.
 * @param character The character
 * @param amount How much to grow each row
 * @param times The number of times to grow
 */
export function growSmallestBreastRow(character: Character, amount: number, times: number) {
    const chest = character.body.chest;
    if (chest.length === 0)
        return;

    // Chance for "big tits" perked characters to grow larger!
    if (character.effects.has(EffectType.BigTits) && randInt(3) === 0 && amount < 1)
        amount = 1;
    // Select smallest breast, grow it, move on
    let smallestBreastRow: BreastRow;
    while (times > 0) {
        let growthAmount: number = amount;
        smallestBreastRow = chest.sort(BreastRow.Smallest).get(0)!;
        if (!Settings.hyperHappy) {
            // Diminishing returns!
            if (character.effects.has(EffectType.BigTits)) {
                growthAmount /= smallestBreastRow.rating > 3 ? 1.3 : 1.5;
                growthAmount /= smallestBreastRow.rating > 7 ? 1.5 : 2;
                growthAmount /= smallestBreastRow.rating > 9 ? 1.5 : 2;
                growthAmount /= smallestBreastRow.rating > 12 ? 1.5 : 2;
            }
        }
        smallestBreastRow.rating += growthAmount;
        times--;
    }
}

/**
 * Grow N rows by a specified amount starting from the top.
 * Loops back to the top if N is greater than the number of rows.
 * Pair with describeBreastGrowth to show output.
 * @param character The character
 * @param amount How much to grow each row
 * @param times The number of rows to grow
 */
export function growTopBreastRowDownwards(character: Character, amount: number, times: number) {
    const chest = character.body.chest;
    if (chest.length === 0)
        return;

    if (character.effects.has(EffectType.BigTits) && randInt(3) === 0 && amount < 1)
        amount = 1;

    if (!Settings.hyperHappy) {
        const topBreastRow: number = chest.firstRow.rating;

        // Diminishing returns!
        if (character.effects.has(EffectType.BigTits)) {
            amount /= topBreastRow > 3 ? 1.3 : 1.5;
            amount /= topBreastRow > 7 ? 1.5 : 2;
            amount /= topBreastRow > 9 ? 1.5 : 2;
            amount /= topBreastRow > 12 ? 1.5 : 2;
        }
    }

    let breastIndex: number = 0;
    // Start at top and keep growing down, back to top if hit bottom before done.
    while (times > 0) {
        if (breastIndex >= chest.length)
            breastIndex = 0;
        chest.get(breastIndex)!.rating += amount;
        breastIndex++;
        times--;
    }

}

/**
 * Grow the top breast row N times.
 * Pair with describeTopRowBreastGrowth to show output.
 * @param character The character
 * @param amount How much to grow each row
 * @param times The number of times to grow the top row
 */
export function growTopBreastRow(character: Character, amount: number, times: number): void {
    const chest = character.body.chest;
    if (chest.length === 0)
        return;

    if (character.effects.has(EffectType.BigTits) && randInt(3) === 0 && amount < 1)
        amount = 1;

    if (!Settings.hyperHappy) {
        const topBreastRow: number = chest.firstRow.rating;

        // Diminishing returns!
        if (character.effects.has(EffectType.BigTits)) {
            amount /= topBreastRow > 3 ? 1.3 : 1.5;
            amount /= topBreastRow > 7 ? 1.5 : 2;
            amount /= topBreastRow > 9 ? 1.5 : 2;
            amount /= topBreastRow > 12 ? 1.5 : 2;
        }
    }

    while (times > 0) {
        times--;
        chest.firstRow.rating += amount;
    }
}

/**
 * Note: Only here as reference to the old function
 * GrowthType 1 = smallest grows - growSmallestBreastRow
 * GrowthType 2 = Top Row working downward - growTopBreastRowDownwards
 * GrowthType 3 = Only top row - growTopBreastRow
 * @param character
 * @param amount
 * @param rowsGrown
 * @param display
 * @param growthType
 */
export function growTits(character: Character, amount: number, rowsGrown: number, display: boolean, growthType: number): void {
}

export function shrinkTits(character: Character, ignoreHyperHappy: boolean = false): void {
    if (Settings.hyperHappy && !ignoreHyperHappy) {
        return;
    }
    if (character.body.chest.length === 1) {
        const topRow: BreastRow = character.body.chest.firstRow;
        if (topRow.rating > 0) {
            // Shrink if bigger than N/A cups
            let superShrink: boolean = false;
            topRow.rating--;
            // Shrink again 50% chance
            if (topRow.rating >= 1 && randInt(100 / 2) && !character.effects.has(EffectType.BigTits)) {
                superShrink = true;
                topRow.rating--;
            }
            if (topRow.rating < 0) topRow.rating = 0;
            // Talk about shrinkage
            if (!superShrink) CView.text("\n\nYou feel a weight lifted from you, and realize your breasts have shrunk!  With a quick measure, you determine they're now " + breastCup(topRow.rating) + "s.");
            if (superShrink) CView.text("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are much smaller!  With a quick measure, you determine they're now " + breastCup(topRow.rating) + "s.");
        }
    }
    else if (character.body.chest.length > 1) {
        // multiple
        CView.text("\n");
        // temp2 = amount changed
        // temp3 = counter
        let shrinkAmount: number = 0;
        let breastRowIndex: number = character.body.chest.length;
        let curBreastRow: BreastRow;
        while (breastRowIndex > 0) {
            breastRowIndex--;
            curBreastRow = character.body.chest.get(breastRowIndex)!;
            if (curBreastRow.rating > 0) {
                curBreastRow.rating--;
                if (curBreastRow.rating < 0) curBreastRow.rating = 0;
                shrinkAmount++;
                CView.text("\n");
                if (breastRowIndex < character.body.chest.length - 1) CView.text("...and y");
                else CView.text("Y");
                CView.text("our " + describeBreastRow(curBreastRow) + " shrink, dropping to " + breastCup(curBreastRow.rating) + "s.");
            }
            if (curBreastRow.rating < 0) curBreastRow.rating = 0;
        }
        if (shrinkAmount === 2) CView.text("\nYou feel so much lighter after the change.");
        if (shrinkAmount === 3) CView.text("\nWithout the extra weight you feel particularly limber.");
        if (shrinkAmount >= 4) CView.text("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
    }
}

// TODO: Fix this function
export function boostLactation(character: Character, boostAmt: number): number {
    if (character.body.chest.length <= 0)
        return 0;
    let breasts: BreastRow;
    let changes: number = 0;
    let temp2: number = 0;
    // Prevent lactation decrease if lactating.
    if (boostAmt >= 0) {
        if (character.effects.has(EffectType.LactationReduction))
            character.effects.getByName(EffectType.LactationReduction)!.values.expireCountdown = 0;
        if (character.effects.has(EffectType.LactationReduc0))
            character.effects.removeByName(EffectType.LactationReduc0);
        if (character.effects.has(EffectType.LactationReduc1))
            character.effects.removeByName(EffectType.LactationReduc1);
        if (character.effects.has(EffectType.LactationReduc2))
            character.effects.removeByName(EffectType.LactationReduc2);
        if (character.effects.has(EffectType.LactationReduc3))
            character.effects.removeByName(EffectType.LactationReduc3);
    }
    if (boostAmt > 0) {
        while (boostAmt > 0) {
            breasts = character.body.chest.sort(BreastRow.Largest).get(0)!;
            boostAmt -= .1;
            temp2 = .1;
            if (breasts.lactationMultiplier > 1.5)
                temp2 /= 2;
            if (breasts.lactationMultiplier > 2.5)
                temp2 /= 2;
            if (breasts.lactationMultiplier > 3)
                temp2 /= 2;
            changes += temp2;
            breasts.lactationMultiplier += temp2;
        }
    }
    else {
        while (boostAmt < 0) {
            if (boostAmt > -.1) {
                breasts = character.body.chest.sort(BreastRow.LactationLeast).get(0)!;
                // trace(biggestLactation());
                breasts.lactationMultiplier += boostAmt;
                if (breasts.lactationMultiplier < 0)
                    breasts.lactationMultiplier = 0;
                boostAmt = 0;
            }
            else {
                boostAmt += .1;
                breasts = character.body.chest.sort(BreastRow.LactationLeast).get(0)!;
                temp2 = boostAmt;
                changes += temp2;
                breasts.lactationMultiplier += temp2;
                if (breasts.lactationMultiplier < 0)
                    breasts.lactationMultiplier = 0;
            }
        }
    }
    return changes;
}
