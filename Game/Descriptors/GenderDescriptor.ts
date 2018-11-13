import { BreastRow } from '../Body/BreastRow';
import { Gender } from '../Body/GenderIdentity';
import { Character } from '../Character/Character';

export function genderText(gender: Gender, male: string = "man", female: string = "woman", futa: string = "herm", eunuch: string = "eunuch"): string {
    if (gender === Gender.HERM)
        return futa;
    else if (gender === Gender.MALE)
        return male;
    else if (gender === Gender.FEMALE)
        return female;
    else if (gender === Gender.NONE)
        return eunuch;
    return '';
}

export function mfn(gender: Gender, male: string, female: string, neuter: string): string {
    if (gender === Gender.NONE)
        return neuter;
    else if (gender === Gender.FEMALE)
        return female;
    else if (gender === Gender.MALE)
        return male;
    return '';
}

export function mf(character: Character, male: string, female: string) {
    if (character.body.cocks.length > 0) {
        if (character.body.vaginas.length > 0)
            return female;
        else
            return male;
    }
    else {
        if (character.body.vaginas.length > 0)
            return female;
        else {
            if (character.body.chest.find(BreastRow.FemaleBreasts))
                return female;
            else
                return male;
        }
    }
}

export function manWomanFutaEunuch(gender: Gender, caps: boolean = false): string {
    if (gender === Gender.HERM) {
        if (caps)
            return "Futa";
        else
            return "futa";
    }
    else if (gender === Gender.MALE) {
        if (caps)
            return "Man";
        else
            return "man";
    }
    else if (gender === Gender.FEMALE) {
        if (caps)
            return "Woman";
        else
            return "woman";
    }
    else if (gender === Gender.NONE) {
        if (caps)
            return "Eunuch";
        else
            return "eunuch";
    }
    return '';
}

export function guyGirl(gender: Gender, caps: boolean = false): string {
    if (gender === Gender.HERM || gender === Gender.FEMALE) {
        if (caps)
            return "Girl";
        else
            return "girl";
    }
    else if (gender === Gender.MALE || gender === Gender.NONE) {
        if (caps)
            return "Guy";
        else
            return "guy";
    }
    return '';
}

export function boyGirl(gender: Gender, caps: boolean = false): string {
    if (gender === Gender.HERM || gender === Gender.FEMALE) {
        if (caps)
            return "Girl";
        else
            return "girl";
    }
    else if (gender === Gender.MALE || gender === Gender.NONE) {
        if (caps)
            return "Boy";
        else
            return "boy";
    }
    return '';
}

export function maleFemale(gender: Gender, caps: boolean = false): string {
    if (gender === Gender.HERM || gender === Gender.FEMALE) {
        if (caps)
            return "Female";
        else
            return "female";
    }
    else if (gender === Gender.MALE || gender === Gender.NONE) {
        if (caps)
            return "Male";
        else
            return "male";
    }
    return '';
}

export function sirMadam(gender: Gender, caps: boolean = false): string {
    if (gender === Gender.HERM || gender === Gender.FEMALE) {
        if (caps)
            return "Madam";
        else
            return "madam";
    }
    else if (gender === Gender.MALE || gender === Gender.NONE) {
        if (caps)
            return "Sir";
        else
            return "Sir";
    }
    return '';
}
