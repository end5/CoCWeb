import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { describeBalls, describeSack } from 'Content/Descriptors/BallsDescriptor';
import { describeCocksLight } from 'Content/Descriptors/CockDescriptor';
import { CView } from 'Engine/Display/ContentView';
import { displayModFem } from 'Content/Modifiers/BodyModifier';

export class SuccubisDream extends Consumable {
    public constructor() {
        super(ConsumableName.SuccubisDream, new ItemDesc("S.Dream", "a bottle of 'Succubus' Dream'", "This precious fluid is often given to men a succubus intends to play with for a long time, though this batch has been enhanced by Lumi to have even greater potency."));
    }

    public use(character: Character) {
        let changes: number = 0;
        let crit: number = 1;
        // Determine crit multiplier (x2 or x3)
        crit += randInt(2) + 1;
        let changeLimit: number = 1;
        // Chances to up the max number of changes
        if (randInt(2) === 0) changeLimit++;
        if (randInt(2) === 0) changeLimit++;
        if (character.effects.has(EffectType.HistoryAlchemist)) changeLimit++;
        // Generic drinking text
        CView.clear();
        CView.text("You uncork the bottle and drink down the strange substance, struggling to down the thick liquid.");
        // low corruption thoughts
        if (character.stats.cor < 33) CView.text("  This stuff is gross, why are you drinking it?");
        // high corruption
        if (character.stats.cor >= 66) CView.text("  You lick your lips, marvelling at how thick and sticky it is.");
        // Corruption increase
        if (character.stats.cor < 50 || randInt(2)) {
            CView.text("\n\nThe drink makes you feel... dirty.");
            let corruptionChange: number = 1;
            // Corrupts the uncorrupted faster
            if (character.stats.cor < 50) corruptionChange++;
            if (character.stats.cor < 40) corruptionChange++;
            if (character.stats.cor < 30) corruptionChange++;
            // Corrupts the very corrupt slower
            if (character.stats.cor >= 90) corruptionChange = .5;
            character.stats.cor += corruptionChange + 2;
            changes++;
        }
        // NEW BALLZ
        if (character.body.balls.count < 4) {
            if (character.body.balls.count > 0) {
                character.body.balls.count = 4;
                CView.text("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + character.inventory.armor.displayName + ".  In shock, you barely register the sight before your eyes: <b>You have four balls.</b>");
            }
            if (character.body.balls.count === 0) {
                character.body.balls.count = 2;
                CView.text("\n\nIncredible pain scythes through your crotch, doubling you over.  You stagger around, struggling to pull open your " + character.inventory.armor.displayName + ".  In shock, you barely register the sight before your eyes: <b>You have balls!</b>");
                character.body.balls.size = 1;
            }
            changes++;
        }
        // Makes your balls biggah! (Or cummultiplier higher if futa!)
        if (randInt(1.5) === 0 && changes < changeLimit && character.body.balls.count > 0 && character.body.cocks.length > 0) {
            character.body.balls.size++;
            // They grow slower as they get bigger...
            if (character.body.balls.size > 10) character.body.balls.size -= .5;
            // Texts
            if (character.body.balls.size <= 2) CView.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + describeBalls(false, true, character) + " have grown larger than a human's.");
            if (character.body.balls.size > 2) CView.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + describeSack(character) + ".  Walking becomes difficult as you discover your " + describeBalls(false, true, character) + " have enlarged again.");
            character.stats.lib += 1;
            character.stats.lust += 3;
        }
        // Boost cum multiplier
        if (changes < changeLimit && randInt(2) === 0 && character.body.cocks.length > 0) {
            if (character.body.cumMultiplier < 6 && randInt(2) === 0 && changes < changeLimit) {
                // Temp is the max it can be raised to
                let maxCumMultiplier: number = 3;
                // Lots of cum raises cum multiplier cap to 6 instead of 3
                if (character.effects.has(EffectType.MessyOrgasms)) maxCumMultiplier = 6;
                if (maxCumMultiplier < character.body.cumMultiplier + .4 * crit) {
                    changes--;
                }
                else {
                    character.body.cumMultiplier += .4 * crit;
                    // Flavor text
                    if (character.body.balls.count === 0) CView.text("\n\nYou feel a churning inside your body as something inside you changes.");
                    if (character.body.balls.count > 0) CView.text("\n\nYou feel a churning in your " + describeBalls(true, true, character) + ".  It quickly settles, leaving them feeling somewhat more dense.");
                    if (crit > 1) CView.text("  A bit of milky pre dribbles from your " + describeCocksLight(character) + ", pushed out by the change.");
                    character.stats.lib += 1;
                }
                changes++;
            }
        }
        // Fail-safe
        if (changes === 0) {
            CView.text("\n\nYour groin tingles, making it feel as if you haven't cum in a long time.");
            character.hoursSinceCum += 100;
            changes++;
        }
        if (character.body.balls.count > 0 && randInt(3) === 0) {
            CView.text(displayModFem(character, 12, 5));
        }
    }
}
