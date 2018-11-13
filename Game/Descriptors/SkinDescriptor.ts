import { SkinType } from '../Body/Skin';
import { Character } from '../Character/Character';

export function skinFurScales(character: Character): string {
    let skinzilla: string = "";
    // Adjectives first!
    if (character.body.skin.adj !== "")
        skinzilla += character.body.skin.adj + ", ";
    // Fur handled a little differently since it uses
    // haircolor
    skinzilla += character.body.skin.type === SkinType.FUR ? character.body.hair.color + " " : character.body.skin.tone + " ";
    skinzilla += character.body.skin.desc;
    return skinzilla;
}

export function describeSkin(character: Character, noAdj: boolean = false, noTone: boolean = false): string {
    let skinzilla: string = "";
    // Only show stuff other than skin.desc if justSkin is false
    if (!noAdj) {
        // Adjectives first!
        if (character.body.skin.adj !== "" && !noTone && character.body.skin.tone !== "rough gray") {
            skinzilla += character.body.skin.adj;
            if (noTone)
                skinzilla += " ";
            else
                skinzilla += ", ";
        }
    }
    if (!noTone)
        skinzilla += character.body.skin.tone + " ";
    // Fur handled a little differently since it uses
    // haircolor
    if (character.body.skin.type === 1)
        skinzilla += "skin";
    else
        skinzilla += character.body.skin.desc;
    return skinzilla;
}
