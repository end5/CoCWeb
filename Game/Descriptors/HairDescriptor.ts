import { percentChance, randomChoice } from 'Engine/Utilities/SMath';
import { HairType } from 'Game/Character/Body/Hair';
import { SkinType } from 'Game/Character/Body/Skin';
import { Character } from 'Game/Character/Character';

export function hairOrFur(character: Character): string {
    if (character.body.skin.type === SkinType.FUR)
        return "fur";
    else
        return "hair";
}

export function describeHair(character: Character): string {
    let description: string = "";
    if (character.body.hair.length === 0) {
        return randomChoice("shaved",
            "bald",
            "smooth",
            "hairless",
            "glabrous") + " head";
    }
    else if (character.body.hair.length < 1) {
        description += randomChoice(
            "close-cropped, ",
            "trim, ",
            "very short, ");
    }
    else if (character.body.hair.length >= 1 && character.body.hair.length < 3)
        description += "short, ";
    else if (character.body.hair.length >= 3 && character.body.hair.length < 6)
        description += "shaggy, ";
    else if (character.body.hair.length >= 6 && character.body.hair.length < 10)
        description += "moderately long, ";
    else if (character.body.hair.length >= 10 && character.body.hair.length < 16) {
        if (percentChance(50))
            description += "long, ";
        else
            description += "shoulder-length, ";
    }
    else if (character.body.hair.length >= 16 && character.body.hair.length < 26) {
        if (percentChance(50))
            description += "very long, ";
        else
            description += "flowing locks of ";
    }
    else if (character.body.hair.length >= 26 && character.body.hair.length < 40)
        description += "ass-length, ";
    else if (character.body.hair.length >= 40 && character.body.hair.length < character.body.tallness)
        description += "obscenely long, ";
    else if (character.body.hair.length >= character.body.tallness) {
        if (percentChance(50))
            description += "floor-length, ";
        else
            description += "floor-dragging, ";
    }

    description += character.body.hair.color + " ";

    switch (character.body.hair.type) {
        case HairType.FEATHER:
            description += "feather-";
            break;
        case HairType.GHOST:
            description += "transparent ";
            break;
        case HairType.GOO:
            description += "goo-";
            break;
        case HairType.ANEMONE:
            description += "tentacle-";
            break;
    }

    // if medium length refer to as locks sometimes
    // CUT - locks is plural and screws up tense.
    /*if(head.hair.length >= 3 && head.hair.length < 16 && randInt(2) == 0) {
        descript += "locks of hair";
        return descript;
        }*/

    // If furry and longish hair sometimes call it a mane (50%)
    if (character.body.skin.type === SkinType.FUR && character.body.hair.length > 3 && percentChance(50))
        description += "mane";
    else
        description += "hair";

    return description;
}
