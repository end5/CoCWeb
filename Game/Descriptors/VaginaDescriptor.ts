import { percentChance, randInt, randomChoice } from 'Engine/Utilities/SMath';
import { SkinType } from 'Game/Character/Body/Skin';
import {
    Vagina,
    VaginaLooseness,
    VaginaType,
    VaginaWetness
    } from 'Game/Character/Body/Vagina';
import { Character } from 'Game/Character/Character';

export function describeVagina(character: Character, vagina?: Vagina): string {
    let description: string = "";
    if (!vagina) return "";
    // tightness descript - 40% display rate
    if (percentChance(40)) {
        if (vagina.looseness === VaginaLooseness.TIGHT)
            description += vagina.virgin ? "virgin" : "tight";
        else if (vagina.looseness === VaginaLooseness.LOOSE)
            description += "loose";
        else if (vagina.looseness === VaginaLooseness.GAPING)
            description += "very loose";
        else if (vagina.looseness === VaginaLooseness.GAPING_WIDE)
            description += "gaping";
        else if (vagina.looseness === VaginaLooseness.LEVEL_CLOWN_CAR)
            description += "gaping-wide";

    }
    // wetness descript - 30% display rate
    if (percentChance(30)) {
        if (description.length > 0)
            description += ", ";
        if (vagina.wetness === VaginaWetness.DRY)
            description += "dry";
        if (vagina.wetness === VaginaWetness.NORMAL)
            description += "moist";
        if (vagina.wetness === VaginaWetness.WET)
            description += "wet";
        if (vagina.wetness === VaginaWetness.SLICK)
            description += "slick";
        if (vagina.wetness === VaginaWetness.DROOLING)
            description += "drooling";
        if (vagina.wetness === VaginaWetness.SLAVERING)
            description += "slavering";
    }
    if (character.inventory.piercings.labia.isEquipped() && percentChance(33)) {
        if (description.length > 0)
            description += ", ";
        description += "pierced";
    }
    if (description === "" && character.body.skin.type === SkinType.GOO) {
        if (description.length > 0)
            description += ", ";

        description += randomChoice("gooey", "slimy");
    }
    if (vagina.type === VaginaType.BLACK_SAND_TRAP && percentChance(50)) {
        if (description.length > 0)
            description += ", ";
        description += randomChoice(
            "black",
            "onyx",
            "ebony",
            "dusky",
            "sable",
            "obsidian",
            "midnight-hued",
            "jet black");
    }

    if (description.length > 0)
        description += " ";
    description += randomChoice(
        "vagina",
        "pussy",
        "cooter",
        "twat",
        "cunt",
        "snatch",
        "fuck-hole",
        "muff");
    // Something that would be nice to have but needs a variable in Creature or Character.
    // if(i_creature.bunnyScore() >= 3) description += "rabbit hole";

    return description;
}

export function describeAllVagina(character: Character): string {
    if (character.body.vaginas.length === 1)
        return describeVagina(character, character.body.vaginas.get(randInt(character.body.vaginas.length - 1))!);
    if (character.body.vaginas.length > 1)
        return describeVagina(character, character.body.vaginas.get(randInt(character.body.vaginas.length - 1))!) + "s";
    return '';
}

export function describeClit(character: Character): string {
    let description: string = "";
    const clit = character.body.clit;
    // Length Adjective - 50% chance
    if (percentChance(50)) {
        // small clits!
        if (clit.length <= .5) {
            description += randomChoice(
                "tiny ",
                "little ",
                "petite ",
                "diminutive ",
                "miniature ");
        }
        // "average".
        if (clit.length > .5 && clit.length < 1.5) {
            // no size comment
        }
        // Biggies!
        if (clit.length >= 1.5 && clit.length < 4) {
            description += randomChoice(
                "large ",
                "large ",
                "substantial ",
                "substantial ",
                "considerable ");
        }
        // 'Uge
        if (clit.length >= 4) {
            description += randomChoice(
                "monster ",
                "tremendous ",
                "colossal ",
                "enormous ",
                "bulky ");
        }
    }
    // Descriptive descriptions - 50% chance of being called
    if (percentChance(50)) {
        // Doggie descriptors - 50%
        if (character.body.skin.type === SkinType.FUR && percentChance(50)) {
            description += "bitch-";
        }
        /*Horse descriptors - 50%
            if(creature.skin.type == SkinType.FUR && !descripted && chance(50)) {
            descripted = true;
            descript += "mare-";
            }*/
        // Horny descriptors - 75% chance
        else if (character.stats.lust > 70 && percentChance(75)) {
            description += randomChoice(
                "throbbing ",
                "pulsating ",
                "hard ");
        }
        // High libido - always use if no other descript
        else if (character.stats.lib > 50 && percentChance(50)) {
            description += randomChoice(
                "insatiable ",
                "greedy ",
                "demanding ",
                "rapacious");
        }
    }
    else if (character.inventory.piercings.clit.isEquipped()) {
        description += "pierced ";
    }

    // Clit nouns
    description += randomChoice(
        "clit",
        "clitty",
        "button",
        "pleasure-buzzer",
        "clit",
        "clitty",
        "button",
        "clit",
        "clit",
        "button");

    return description;
}
