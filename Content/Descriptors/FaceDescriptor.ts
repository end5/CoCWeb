import { randInt } from 'Engine/Utilities/SMath';
import { FaceType } from 'Engine/Body/Face';
import { TongueType } from 'Engine/Body/Tongue';
import { Character } from 'Engine/Character/Character';

/**
 * Describe tongue. Monsters don't have tongues, apparently.
 * @param    character Either Player or NonPlayer
 * @return    A beautiful description of a tongue.
 */
export function describeTongue(tongueType: TongueType): string {
    switch (tongueType) {
        case TongueType.SNAKE:
            return "serpentine tongue";
        case TongueType.DEMONIC:
            return "demonic tongue";
        case TongueType.DRACONIC:
            return "draconic tongue";
        default:
            return "tongue";
    }
}

export function describeFaceShort(character: Character): string {
    let stringo: string = "";
    const face = character.body.face;
    const faceType = face.type;
    if (faceType === FaceType.HUMAN)
        return "face";
    if (face.hasMuzzle()) {
        if (randInt(2) === 0)
            return "muzzle";
        if (randInt(3) === 0 && faceType === FaceType.HORSE)
            stringo = "long ";
        if (randInt(3) === 0 && faceType === FaceType.CAT)
            stringo = "feline ";
        return stringo + "face";
    }
    if (faceType === FaceType.COW_MINOTAUR) {
        if (randInt(4) === 0)
            stringo = "bovine ";
        if (randInt(2) === 0)
            return "muzzle";
        return stringo + "face";
    }
    if (faceType === FaceType.SHARK_TEETH) {
        if (randInt(4) === 0)
            stringo = "angular ";
        return stringo + "face";
    }
    if (faceType === FaceType.LIZARD || faceType === FaceType.DRAGON) {
        if (randInt(4) === 0)
            stringo = "reptilian ";
        if (randInt(4) === 0)
            return stringo + "muzzle";
        if (randInt(4) === 0)
            return stringo + "snout";
        return stringo + "face";
    }
    return "face";
}

/**
 * prev faceDesc from Character
 * @param character
 */
export function describeFace(character: Character): string {
    let description: string = "";
    if (character.body.femininity < 10) {
        description = "a square chin";
        // beard doesn't exist
        //
        // if (!body.hasBeard())
        description += " and chiseled jawline";
        // else
        //    description += ", chiseled jawline, and " + body.beard();
    }
    else if (character.body.femininity < 20) {
        description = "a rugged looking " + describeFaceShort(character) + " ";
        // beard doesn't exist
        //
        // if (body.hasBeard())
        //    description += "and " + body.beard();
        description += "that's surely handsome";
    }
    else if (character.body.femininity < 28)
        description = "a well-defined jawline and a fairly masculine profile";
    else if (character.body.femininity < 35)
        description = "a somewhat masculine, angular jawline";
    else if (character.body.femininity < 45)
        description = "the barest hint of masculinity on its features";
    else if (character.body.femininity <= 55)
        description = "an androgynous set of features that would look normal on a male or female";
    else if (character.body.femininity <= 65)
        description = "a tiny touch of femininity to it, with gentle curves";
    else if (character.body.femininity <= 72)
        description = "a nice set of cheekbones and lips that have the barest hint of pout";
    else if (character.body.femininity <= 80)
        description = "a beautiful, feminine shapeliness that's sure to draw the attention of males";
    else if (character.body.femininity <= 90)
        description = "a gorgeous profile with full lips, a button nose, and noticeable eyelashes";
    else
        description = "a jaw-droppingly feminine shape with full, pouting lips, an adorable nose, and long, beautiful eyelashes";
    return description;
}

export function describeBeard(character: Character): string {
    if (character.body.beard.hasBeard())
        return "beard";
    else {
        // CoC_User.settings.error("");
        return "ERROR: NO BEARD! <b>YOU ARE NOT A VIKING AND SHOULD TELL FEN IMMEDIATELY.</b>";
    }
}
