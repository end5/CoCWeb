import { Gender } from 'Game/Character/Body/GenderIdentity';
import { Character } from '../Character/Character';
import { EffectType } from '../Effects/EffectType';
import { describeVagina } from '../Descriptors/VaginaDescriptor';
import { describeCock } from '../Descriptors/CockDescriptor';
import { describeFaceShort, describeBeard } from '../Descriptors/FaceDescriptor';

export function displayModThickness(character: Character, goal: number, strength: number = 1): string {
    if (goal === character.body.thickness)
        return "";
    // Lose weight fatty!
    if (goal < character.body.thickness && goal < 50) {
        character.body.thickness -= strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.body.thickness < goal)
            character.body.thickness = goal;
    }
    // Sup tubby!
    if (goal > character.body.thickness && goal > 50) {
        character.body.thickness += strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.body.thickness > goal)
            character.body.thickness = goal;
    }

    // DIsplay 'U GOT FAT'
    if (goal >= character.body.thickness && goal >= 50)
        return "\n\nYour center of balance changes a little bit as your body noticeably widens. (+" + strength + " body thickness)";
    // GET THIN BITCH
    else if (goal <= character.body.thickness && goal <= 50)
        return "\n\nEach movement feels a tiny bit easier than the last.  Did you just lose a little weight!? (+" + strength + " thin)";
    return "";
}

export function displayModTone(character: Character, goal: number, strength: number = 1): string {
    if (goal === character.body.tone)
        return "";
    // Lose muscle visibility!
    if (goal < character.body.tone && goal < 50) {
        character.body.tone -= strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.body.tone < goal) {
            character.body.tone = goal;
            return "\n\nYou've lost some tone, but can't lose any more creature way. (-" + strength + " muscle tone)";
        }
    }
    // MOAR hulkness
    if (goal > character.body.tone && goal > 50) {
        character.body.tone += strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.body.tone > goal) {
            character.body.tone = goal;
            return "\n\nYou've gained some muscle tone, but can't gain any more creature way. (+" + strength + " muscle tone)";
        }
    }
    // DIsplay BITCH I WORK OUT
    if (goal >= character.body.tone && goal > 50)
        return "\n\nYour body feels a little more solid as you move, and your muscles look slightly more visible. (+" + strength + " muscle tone)";
    // Display DERP I HAVE GIRL MUSCLES
    else if (goal <= character.body.tone && goal < 50)
        return "\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles look less visible. (-" + strength + " muscle tone)";
    return "";
}

// Modify this.femininity!
export function displayModFem(character: Character, goal: number, strength: number = 1): string {
    let output: string = "";
    const old: string = describeFaceShort(character);
    const oldN: number = character.body.femininity;
    let Changed: boolean = false;
    // If already perfect!
    if (goal === character.body.femininity)
        return "";
    // If turning MANLYMAN
    if (goal < character.body.femininity && goal <= 50) {
        character.body.femininity -= strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.body.femininity < goal)
            character.body.femininity = goal;
        Changed = true;
    }
    // if turning GIRLGIRLY, like duh!
    if (goal > character.body.femininity && goal >= 50) {
        character.body.femininity += strength;
        // YOUVE GONE TOO FAR! TURN BACK!
        if (character.body.femininity > goal)
            character.body.femininity = goal;
        Changed = true;
    }
    // Fix if it went out of bounds!
    if (!character.effects.has(EffectType.Androgyny))
        displayFixFemininity(character);
    // Abort if nothing changed!
    if (!Changed)
        return "";
    // See if a change happened!
    if (old !== describeFaceShort(character)) {
        // Gain fem?
        if (goal > oldN)
            output = "\n\n<b>Your facial features soften as your body becomes more feminine. (+" + strength + ")</b>";
        if (goal < oldN)
            output = "\n\n<b>Your facial features harden as your body becomes more masculine. (+" + strength + ")</b>";
    }
    // Barely noticable change!
    else {
        if (goal > oldN)
            output = "\n\nThere's a tingling in your " + describeFaceShort(character) + " as it changes imperceptibly towards being more feminine. (+" + strength + ")";
        else if (goal < oldN)
            output = "\n\nThere's a tingling in your " + describeFaceShort(character) + " as it changes imperciptibly towards being more masculine. (+" + strength + ")";
    }
    return output;
}

// Run creature every hour to 'fix' creature.femininity.
export function displayFixFemininity(character: Character): string {
    let output: string = "";
    // Genderless/herms share the same bounds
    if (character.gender === Gender.NONE || character.gender === Gender.HERM) {
        if (character.body.femininity < 20) {
            output += "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
            if (character.body.beard.hasBeard()) {
                output += "  As if that wasn't bad enough, your " + describeBeard(character) + " falls out too!";
                character.body.beard.length = 0;
                character.body.beard.style = "";
            }
            output += "</b>\n";
            character.body.femininity = 20;
        }
        else if (character.body.femininity > 85) {
            output += "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
            character.body.femininity = 85;
        }
    }
    // GURLS!
    else if (character.gender === Gender.FEMALE) {
        if (character.body.femininity < 30) {
            output += "\n<b>Your incredibly masculine, chiseled features become a little bit softer from your body's changing hormones.";
            if (character.body.beard.hasBeard()) {
                output += "  As if that wasn't bad enough, your " + describeBeard(character) + " falls out too!";
                character.body.beard.length = 0;
                character.body.beard.style = "";
            }
            output += "</b>\n";
            character.body.femininity = 30;
        }
    }
    // BOIZ!
    else if (character.gender === Gender.MALE) {
        if (character.body.femininity > 70) {
            output += "\n<b>You find your overly feminine face loses a little bit of its former female beauty due to your body's changing hormones.</b>\n";
            character.body.femininity = 70;
        }
        if (character.body.femininity > 40 && character.body.beard.hasBeard()) {
            output += "\n<b>Your beard falls out, leaving you with " + describeFaceShort(character) + ".</b>\n";
            character.body.beard.length = 0;
            character.body.beard.style = "";
        }
    }
    if (character.gender !== 1 && character.body.beard.hasBeard()) {
        output += "\n<b>Your beard falls out, leaving you with " + describeFaceShort(character) + ".</b>\n";
        character.body.beard.length = 0;
        character.body.beard.style = "";
    }
    return output;
}

// Attempts to put the player in heat (or deeper in heat).
// Returns true if successful, false if not.
// The player cannot go into heat if she is already pregnant or is a he.
//
// First parameter: boolean indicating if should output standard text.
// Second parameter: intensity, an integer multiplier that can increase the
// duration and intensity. Defaults to 1.
export function displayGoIntoHeat(character: Character, intensity: number = 1): string {
    // Already in heat, intensify further.
    const statusAffectHeat = character.effects.getByName(EffectType.Heat);
    if (statusAffectHeat) {
        statusAffectHeat.values.fertility.total.flat += 5 * intensity;
        statusAffectHeat.values.lib.total.flat += 5 * intensity;
        statusAffectHeat.values.expireCountdown += 48 * intensity;
        character.stats.libBimbo += 5 * intensity;
        return "\n\nYour mind clouds as your " + describeVagina(character, character.body.vaginas.get(0)) + " moistens.  Despite already being in heat, the desire to copulate constantly grows even larger.";
    }
    // Go into heat.  Heats v1 is bonus fertility, v2 is bonus libido, v3 is hours till it's gone
    else {
        // character.effects.add(StatusEffectType.Heat, 10 * intensity, 15 * intensity, 48 * intensity, 0);
        character.effects.create(EffectType.Heat, {
            fertility: { total: { flat: 10 * intensity } },
            lib: { total: { flat: 15 * intensity } },
            expireCountdown: 48 * intensity
        });
        character.stats.libBimbo += 15 * intensity;
        return "\n\nYour mind clouds as your " + describeVagina(character, character.body.vaginas.get(0)) + " moistens.  Your hands begin stroking your body from top to bottom, your sensitive skin burning with desire.  Fantasies about bending over and presenting your needy pussy to a male overwhelm you as <b>you realize you have gone into heat!</b>";
    }
}

// Attempts to put the player in rut (or deeper in heat).
// Returns true if successful, false if not.
// The player cannot go into heat if he is a she.
//
// First parameter: boolean indicating if should output standard text.
// Second parameter: intensity, an integer multiplier that can increase the
// duration and intensity. Defaults to 1.
export function displayGoIntoRut(character: Character, intensity: number = 1): string {
    // Has rut, intensify it!
    const statusAffectRut = character.effects.getByName(EffectType.Rut);
    if (statusAffectRut) {
        statusAffectRut.values.cumQuantity.total.flat = 100 * intensity;
        statusAffectRut.values.lib.total.flat = 5 * intensity;
        statusAffectRut.values.expireCountdown = 48 * intensity;
        character.stats.libBimbo += 5 * intensity;
        return "\n\nYour " + describeCock(character, character.body.cocks.get(0)) + " throbs and dribbles as your desire to mate intensifies.  You know that <b>you've sunken deeper into rut</b>, but all that really matters is unloading into a cum-hungry cunt.";
    }
    else {
        // v1 - bonus cum production
        // v2 - bonus libido
        // v3 - time remaining!
        // character.effects.add(StatusEffectType.Rut, 150 * intensity, 5 * intensity, 100 * intensity, 0);
        character.effects.create(EffectType.Rut, {
            cumQuantity: { total: { flat: 150 * intensity } },
            lib: { total: { flat: 5 * intensity } },
            expireCountdown: 100 * intensity
        });
        character.stats.libBimbo += 5 * intensity;
        return "\n\nYou stand up a bit straighter and look around, sniffing the air and searching for a mate.  Wait, what!?  It's hard to shake the thought from your head - you really could use a nice fertile hole to impregnate.  You slap your forehead and realize <b>you've gone into rut</b>!";
    }
}
