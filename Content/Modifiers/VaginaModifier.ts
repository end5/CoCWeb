import { randInt } from 'Engine/Utilities/SMath';
import { Vagina, VaginaLooseness } from 'Engine/Body/Vagina';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { describeVagina } from 'Content/Descriptors/VaginaDescriptor';
import { CView } from 'Engine/Display/ContentView';
import { Pregnancy } from 'Engine/Body/Pregnancy/Pregnancy';
import { IncubationTime } from 'Content/Body/Pregnancy/IncubationTime';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';
import { IPregnancyEvent } from 'Engine/Body/Pregnancy/IPregnancyEvent';
import { Womb } from 'Engine/Body/Pregnancy/Womb';

export function stretchVagina(character: Character, vaginaArea: number): boolean {
    if (character.body.vaginas.length <= 0)
        return false;
    let stretched: boolean = false;
    const loosestVagina = character.body.vaginas.sort(Vagina.LoosenessMost).get(0)!;
    if (character.effects.has(EffectType.FerasBoonMilkingTwat) || loosestVagina.looseness <= VaginaLooseness.NORMAL) {
        // cArea > capacity = autostreeeeetch.
        if (vaginaArea >= character.vaginalCapacity()) {
            if (loosestVagina.looseness >= VaginaLooseness.LEVEL_CLOWN_CAR)
                loosestVagina.looseness++;
            stretched = true;
        }
        // If within top 10% of capacity, 50% stretch
        else if (vaginaArea >= .9 * character.vaginalCapacity() && randInt(2) === 0) {
            loosestVagina.looseness++;
            stretched = true;
        }
        // if within 75th to 90th percentile, 25% stretch
        else if (vaginaArea >= .75 * character.vaginalCapacity() && randInt(4) === 0) {
            loosestVagina.looseness++;
            stretched = true;
        }
    }
    // If virgin
    const virginVaginas = character.body.vaginas.filter(Vagina.Virgin);
    if (virginVaginas.length > 0) {
        virginVaginas.get(0)!.virgin = false;
    }
    // Delay anti-stretching
    if (vaginaArea >= .5 * character.vaginalCapacity()) {
        // Cunt Stretched used to determine how long since last enlargement
        const effect = character.effects.getByName(EffectType.CuntStretched);
        if (!effect)
            character.effects.create(EffectType.CuntStretched);
        // Reset the timer on it to 0 when restretched.
        else
            effect.values.expireCountdown = 0;
    }
    return stretched;
}

/**
 * Was cuntChange on Player
 * @param character
 * @param cArea
 * @param display
 * @param spacingsF
 * @param spacingsB
 */
export function displayStretchVagina(character: Character, cArea: number, display: boolean, spacingsF: boolean = false, spacingsB: boolean = true): boolean {
    if (character.body.vaginas.length <= 0)
        return false;
    const firstVagina: Vagina = character.body.vaginas.get(0)!;
    const wasVirgin: boolean = firstVagina.virgin;
    const stretched: boolean = stretchVagina(character, cArea);
    const devirgined: boolean = wasVirgin && !firstVagina.virgin;
    if (devirgined) {
        if (spacingsF) CView.text("  ");
        CView.text("<b>Your hymen is torn, robbing you of your virginity.</b>");
        if (spacingsB) CView.text("  ");
    }
    // STRETCH SUCCESSFUL - begin flavor text if outputting it!
    if (display && stretched) {
        // Virgins get different formatting
        if (devirgined) {
            // If no spaces after virgin loss
            if (!spacingsB) CView.text("  ");
        }
        // Non virgins as usual
        else if (spacingsF) CView.text("  ");
        if (firstVagina.looseness === VaginaLooseness.LEVEL_CLOWN_CAR)
            CView.text("<b>Your " + describeVagina(character, firstVagina) + " is stretched painfully wide, large enough to accomodate most beasts and demons.</b>");
        if (firstVagina.looseness === VaginaLooseness.GAPING_WIDE)
            CView.text("<b>Your " + describeVagina(character, firstVagina) + " is stretched so wide that it gapes continually.</b>");
        if (firstVagina.looseness === VaginaLooseness.GAPING)
            CView.text("<b>Your " + describeVagina(character, firstVagina) + " painfully stretches, the lips now wide enough to gape slightly.</b>");
        if (firstVagina.looseness === VaginaLooseness.LOOSE)
            CView.text("<b>Your " + describeVagina(character, firstVagina) + " is now very loose.</b>");
        if (firstVagina.looseness === VaginaLooseness.NORMAL)
            CView.text("<b>Your " + describeVagina(character, firstVagina) + " is now a little loose.</b>");
        if (firstVagina.looseness === VaginaLooseness.TIGHT)
            CView.text("<b>Your " + describeVagina(character, firstVagina) + " is stretched out to a more normal size.</b>");
        if (spacingsB) CView.text("  ");
    }
    return stretched;
}

/**
 *  $> Note: Imp, Ovielixer and Anemone pregnancy types should not fertilize eggs.
 * @param char 
 * @param type 
 * @param time 
 * @param event 
 * @param virility 
 */
export function attemptKnockUp(char: Character, type: PregnancyType, time: IncubationTime, event: IPregnancyEvent, virility: number = 100) {
    const notPregWomb = char.body.wombs.find(Womb.NotPregnant);
    if (notPregWomb)
        notPregWomb.knockUp(new Pregnancy(type, time), event, virility);
    if (char.body.fertility > randInt(virility))
        char.body.ovipositor.fertilizeEggs();
}

export function attemptKnockUpNoEggs(char: Character, type: PregnancyType, time: IncubationTime, event: IPregnancyEvent, virility: number = 100) {
    const notPregWomb = char.body.wombs.find(Womb.NotPregnant);
    if (notPregWomb)
        notPregWomb.knockUp(new Pregnancy(type, time), event, virility);
}
