import { Character } from 'Engine/Character/Character';
import { describeHair } from 'Content/Descriptors/HairDescriptor';
import { CView } from 'Engine/Display/ContentView';

export function displayGrowHair(character: Character, amount: number = .1): boolean {
    // Grow hair!
    const hairLength: number = character.body.hair.length;
    character.body.hair.length += amount;
    if (hairLength > 0 && hairLength === 0) {
        CView.text("\n<b>You are no longer bald.  You now have " + describeHair(character) + " coating your head.\n</b>");
        return true;
    }
    else if (hairLength >= 1 && hairLength < 1) {
        CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 3 && hairLength < 3) {
        CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 6 && hairLength < 6) {
        CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 10 && hairLength < 10) {
        CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 16 && hairLength < 16) {
        CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 26 && hairLength < 26) {
        CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 40 && hairLength < 40) {
        CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + describeHair(character) + ".\n</b>");
        return true;
    }
    else if (hairLength >= 40 && hairLength >= character.body.tallness && hairLength < character.body.tallness) {
        CView.text("\n<b>Your hair's growth has reached a new threshhold, giving you " + describeHair(character) + ".\n</b>");
        return true;
    }
    return false;
}
