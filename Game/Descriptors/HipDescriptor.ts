import { percentChance, randomChoice } from '../../Engine/Utilities/SMath';
import { Character } from '../Character/Character';

export function describeHips(character: Character): string {
    let description: string = "";
    if (character.body.hips.rating <= 1) {
        description = randomChoice(
            "tiny ",
            "narrow ",
            "boyish ");
    }
    else if (character.body.hips.rating > 1 && character.body.hips.rating < 4) {
        description = randomChoice(
            "slender ",
            "narrow ",
            "thin ");
        if (character.body.thickness < 30) {
            if (percentChance(50))
                description = "slightly-flared ";
            else
                description = "curved ";
        }
    }
    else if (character.body.hips.rating >= 4 && character.body.hips.rating < 6) {
        description = randomChoice(
            "well-formed ",
            "pleasant ");
        if (character.body.thickness < 30) {
            if (percentChance(50))
                description = "flared ";
            else
                description = "curvy ";
        }
    }
    else if (character.body.hips.rating >= 6 && character.body.hips.rating < 10) {
        description = randomChoice(
            "ample ",
            "noticeable ",
            "girly ");
        if (character.body.thickness < 30) {
            if (percentChance(50))
                description = "flared ";
            else
                description = "waspish ";
        }
    }
    else if (character.body.hips.rating >= 10 && character.body.hips.rating < 15) {
        description = randomChoice(
            "flared ",
            "curvy ",
            "wide ");
        if (character.body.thickness < 30) {
            if (percentChance(50))
                description = "flared ";
            else
                description = "waspish ";
        }
    }
    else if (character.body.hips.rating >= 15 && character.body.hips.rating < 20) {
        if (character.body.thickness < 40) {
            if (percentChance(50))
                description = "flared, ";
            else
                description = "waspish, ";
        }
        description += randomChoice(
            "fertile ",
            "child-bearing ",
            "voluptuous ");
    }
    else if (character.body.hips.rating >= 20) {
        if (character.body.thickness < 40) {
            if (percentChance(50))
                description = "flaring, ";
            else
                description = "incredibly waspish, ";
        }
        description += randomChoice(
            "broodmother-sized ",
            "cow-like ",
            "inhumanly-wide ");
    }
    // Taurs
    if (character.body.legs.isTaur() && percentChance(33))
        description += "flanks";
    // Nagas have sides, right?
    else if (character.body.legs.isNaga() && percentChance(33))
        description += "sides";
    // Non taurs or taurs who didn't roll flanks
    else {
        description += randomChoice(
            "hips",
            "thighs");
    }

    return description;
}
