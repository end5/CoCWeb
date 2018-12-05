import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { ItemDesc } from '../ItemDesc';
import { describeBalls, describeSack } from 'Game/Descriptors/BallsDescriptor';
import { describeCocksLight } from 'Game/Descriptors/CockDescriptor';
import { CView } from 'Page/ContentView';
import { displayModFem } from 'Game/Modifiers/BodyModifier';

export class SuccubisDelight extends Consumable {
    public readonly tainted: boolean;
    public constructor(tainted: boolean) {
        if (tainted)
            super(ConsumableName.SuccubisDelight, new ItemDesc("Sucb.Delite", "a bottle of 'Succubi's Delight'", "This precious fluid is often given to men a succubus intends to play with for a long time."));
        else
            super(ConsumableName.SuccubisDelightPure, new ItemDesc("PSDelit", "an untainted bottle of \"Succubi's Delight\"", "This precious fluid is often given to men a succubus intends to play with for a long time.  It has been partially purified by Rathazul to prevent corruption."), 20);
        this.tainted = tainted;
    }

    public use(character: Character) {
        let changes: number = 0;
        let crit: number = 1;
        // Determine crit multiplier (x2 or x3)
        if (randInt(4) === 0) crit += randInt(2) + 1;
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
            let corruptChange: number = 1;
            // Corrupts the uncorrupted faster
            if (character.stats.cor < 50) corruptChange++;
            if (character.stats.cor < 40) corruptChange++;
            if (character.stats.cor < 30) corruptChange++;
            // Corrupts the very corrupt slower
            if (character.stats.cor >= 90) corruptChange = .5;
            if (this.tainted) character.stats.cor += corruptChange;
            changes++;
        }
        // Makes your balls biggah! (Or cummultiplier higher if futa!)
        if (randInt(1.5) === 0 && changes < changeLimit && character.body.balls.count > 0) {
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
                let cumMultiplerMax: number = 3;
                // Lots of cum raises cum multiplier cap to 6 instead of 3
                if (character.effects.has(EffectType.MessyOrgasms)) cumMultiplerMax = 6;
                if (cumMultiplerMax < character.body.cumMultiplier + .4 * crit) {
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
            CView.text(displayModFem(character, 12, 3));
        }
    }
}
