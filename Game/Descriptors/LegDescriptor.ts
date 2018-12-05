import { randomChoice } from 'Engine/Utilities/SMath';
import { LegType } from 'Game/Character/Body/Legs';
import { Character } from 'Game/Character/Character';

export function describeLeg(character: Character): string {
    switch (character.body.legs.type) {
        case LegType.HUMAN:
        case LegType.HOOFED:
        case LegType.DOG:
            return "leg";
        case LegType.NAGA:
            return "snake-tail";
        case LegType.CENTAUR:
            return "equine leg";
        case LegType.GOO:
            return "mound of goo";
        case LegType.PONY:
            return "cartoonish pony-leg";
        case LegType.BUNNY:
            return randomChoice(
                "fuzzy, bunny leg",
                "fur-covered leg",
                "furry leg",
                "leg");
        case LegType.HARPY:
            return randomChoice(
                "bird-like leg",
                "feathered leg",
                "leg"
            );
        case LegType.FOX:
            return randomChoice(
                "fox-like leg",
                "leg",
                "leg",
                "vulpine leg"
            );
        case LegType.RACCOON:
            return randomChoice(
                "raccoon-like leg",
                "leg"
            );
        default:
            return "leg";
    }
}

export function describeLegs(character: Character): string {
    switch (character.body.legs.type) {
        case LegType.HUMAN:
        case LegType.HOOFED:
        case LegType.DOG:
            return "legs";
        case LegType.NAGA:
            return "snake-like coils";
        case LegType.CENTAUR:
            return "four legs";
        case LegType.GOO:
            return "mounds of goo";
        case LegType.PONY:
            return "cute pony-legs";
        case LegType.BUNNY:
            return randomChoice(
                "fuzzy, bunny legs",
                "fur-covered legs",
                "furry legs",
                "legs");
        case LegType.HARPY:
            return randomChoice(
                "bird-like legs",
                "feathered legs",
                "legs"
            );
        case LegType.FOX:
            return randomChoice(
                "fox-like legs",
                "legs",
                "legs",
                "vulpine legs"
            );
        case LegType.RACCOON:
            return randomChoice(
                "raccoon-like legs",
                "legs"
            );
        default:
            return "legs";
    }
}

export function describeFoot(character: Character): string {
    switch (character.body.legs.type) {
        case LegType.HUMAN:
            return "foot";
        case LegType.HOOFED:
        case LegType.CENTAUR:
            return "hoof";
        case LegType.DOG:
            return "paw";
        case LegType.NAGA:
            return "coiled tail";
        case LegType.GOO:
            return "slimey undercarriage";
        case LegType.PONY:
            return "flat pony-foot";
        case LegType.BUNNY:
            return randomChoice(
                "large bunny foot",
                "rabbit foot",
                "large foot",
                "foot");
        case LegType.HARPY:
            return randomChoice(
                "taloned foot",
                "foot"
            );
        case LegType.KANGAROO:
            return "foot-foot";
        case LegType.FOX:
            return randomChoice(
                "foot",
                "soft, padded paw",
                "fox-like foot",
                "paw"
            );
        case LegType.RACCOON:
            return randomChoice(
                "raccoon-like foot",
                "long-toed paw",
                "foot",
                "paw"
            );
        default:
            return "foot";
    }
}

export function describeFeet(char: Character): string {
    switch (char.body.legs.type) {
        case LegType.HUMAN:
            return "feet";
        case LegType.HOOFED:
        case LegType.CENTAUR:
            return "hooves";
        case LegType.DOG:
            return "paws";
        case LegType.NAGA:
            return "coils";
        case LegType.DEMONIC_HIGH_HEELS:
            return "demonic high-heels";
        case LegType.DEMONIC_CLAWS:
            return "demonic foot-claws";
        case LegType.GOO:
            return "slimey cillia";
        case LegType.PONY:
            return "flat pony-feet";
        case LegType.BUNNY:
            return randomChoice(
                "large bunny feet",
                "rabbit feet",
                "large feet",
                "feet");
        case LegType.HARPY:
            return randomChoice(
                "taloned feet",
                "feet"
            );
        case LegType.KANGAROO:
            return "foot-paws";
        case LegType.FOX:
            return randomChoice(
                "paws",
                "soft, padded paws",
                "fox-like feet",
                "paws"
            );
        case LegType.RACCOON:
            return randomChoice(
                "raccoon-like feet",
                "long-toed paws",
                "feet",
                "paws"
            );
        default:
            return "feet";
    }
}
