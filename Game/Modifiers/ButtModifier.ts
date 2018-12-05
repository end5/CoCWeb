import { randInt } from '../../Engine/Utilities/SMath';
import { ButtLooseness } from '../Character/Body/Butt';
import { Character } from '../Character/Character';
import { EffectType } from '../Effects/EffectType';
import { describeButthole } from '../Descriptors/ButtDescriptor';
import { CView } from '../../Page/ContentView';

export function stretchButt(character: Character, buttArea: number): boolean {
    let stretched: boolean = false;
    // cArea > capacity = autostreeeeetch half the time.
    if (buttArea >= character.analCapacity() && randInt(2) === 0) {
        if (character.body.butt.looseness < ButtLooseness.GAPING)
            character.body.butt.looseness++;
        stretched = true;
        // Reset butt stretchin recovery time
        const buttStretched = character.effects.getByName(EffectType.ButtStretched);
        if (buttStretched)
            buttStretched.values.expireCountdown = 0;
    }
    // If within top 10% of capacity, 25% stretch
    if (buttArea < character.analCapacity() && buttArea >= .9 * character.analCapacity() && randInt(4) === 0) {
        character.body.butt.looseness++;
        stretched = true;
    }
    // if within 75th to 90th percentile, 10% stretch
    if (buttArea < .9 * character.analCapacity() && buttArea >= .75 * character.analCapacity() && randInt(10) === 0) {
        character.body.butt.looseness++;
        stretched = true;
    }
    // Anti-virgin
    if (character.body.butt.looseness === ButtLooseness.VIRGIN) {
        character.body.butt.looseness++;
        stretched = true;
    }
    // Delay un-stretching
    if (buttArea >= .5 * character.analCapacity()) {
        // Butt Stretched used to determine how long since last enlargement
        const buttStretched = character.effects.getByName(EffectType.ButtStretched);
        if (!buttStretched)
            character.effects.create(EffectType.ButtStretched);
        // Reset the timer on it to 0 when restretched.
        else
            buttStretched.values.expireCountdown = 0;
    }
    if (stretched) {
        console.trace("BUTT STRETCHED TO " + (character.body.butt.looseness) + ".");
    }
    return stretched;
}

export function displayStretchButt(character: Character, cArea: number, display: boolean, spacingsF: boolean = true, spacingsB: boolean = true): boolean {
    const stretched: boolean = stretchButt(character, cArea);
    // STRETCH SUCCESSFUL - begin flavor text if outputting it!
    if (stretched && display) {
        if (spacingsF) CView.text("  ");
        if (character.body.butt.looseness === 5) CView.text("<b>Your " + describeButthole(character.body.butt) + " is stretched even wider, capable of taking even the largest of demons and beasts.</b>");
        if (character.body.butt.looseness === 4) CView.text("<b>Your " + describeButthole(character.body.butt) + " becomes so stretched that it gapes continually.</b>");
        if (character.body.butt.looseness === 3) CView.text("<b>Your " + describeButthole(character.body.butt) + " is now very loose.</b>");
        if (character.body.butt.looseness === 2) CView.text("<b>Your " + describeButthole(character.body.butt) + " is now a little loose.</b>");
        if (character.body.butt.looseness === 1) CView.text("<b>You have lost your anal virginity.</b>");
        if (spacingsB) CView.text("  ");
    }
    return stretched;
}
