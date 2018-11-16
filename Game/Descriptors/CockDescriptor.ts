import { percentChance, randomChoice } from '../../Engine/Utilities/SMath';
import { Cock, CockType } from '../Body/Cock';
import { SkinType } from '../Body/Skin';
import { Character } from '../Character/Character';

export function describeCock(character: Character, cock: Cock | undefined): string {
    if (character.body.cocks.length > 0 || !cock)
        return "<b>ERROR: CockDescript Called But No Cock Present</b>";

    // Only describe as pierced or sock covered if the creature has just one cock
    const isGooey: boolean = (character.body.skin.type === SkinType.GOO);
    if (percentChance(50)) {
        if (cock.type === CockType.HUMAN)
            return adjectiveCock(character, cock, character.stats.lust, character.cumQ(), isGooey) + " " + nounCock(cock.type);
        else
            return adjectiveCock(character, cock, character.stats.lust, character.cumQ(), isGooey) + ", " + nounCock(cock.type);
    }
    return nounCock(cock.type);
}

export function nounCock(cockType: CockType): string {
    if (cockType === CockType.HUMAN) {
        // Yeah, this is kind of messy
        // there is no other easy way to preserve the weighting fenoxo did
        return randomChoice("cock",
            "cock",
            "cock",
            "cock",
            "cock",
            "prick",
            "prick",
            "pecker",
            "shaft",
            "shaft",
            "shaft");
    }
    else if (cockType === CockType.BEE) {
        return randomChoice("bee prick",
            "bee prick",
            "bee prick",
            "bee prick",
            "insectoid cock",
            "insectoid cock",
            "furred monster");
    }
    else if (cockType === CockType.DOG) {
        return randomChoice("dog-shaped dong",
            "canine shaft",
            "pointed prick",
            "knotty dog-shaft",
            "bestial cock",
            "animalistic puppy-pecker",
            "pointed dog-dick",
            "pointed shaft",
            "canine member",
            "canine cock",
            "knotted dog-cock");
    }
    else if (cockType === CockType.FOX) {
        return randomChoice("fox-shaped dong",
            "vulpine shaft",
            "pointed prick",
            "knotty fox-shaft",
            "bestial cock",
            "animalistic vixen-pricker",
            "pointed fox-dick",
            "pointed shaft",
            "vulpine member",
            "vulpine cock",
            "knotted fox-cock");
    }
    else if (cockType === CockType.HORSE) {
        return randomChoice("flared horse-cock",
            "equine prick",
            "bestial horse-shaft",
            "flat-tipped horse-member",
            "animalistic stallion-prick",
            "equine dong",
            "beast cock",
            "flared stallion-cock");
    }
    else if (cockType === CockType.DEMON) {
        return randomChoice("nub-covered demon-dick",
            "nubby shaft",
            "corrupted cock",
            "perverse pecker",
            "bumpy demon-dick",
            "demonic cock",
            "demonic dong",
            "cursed cock",
            "infernal prick",
            "unholy cock",
            "blighted cock");
    }
    else if (cockType === CockType.TENTACLE) {
        return randomChoice("twisting tentacle-prick",
            "wriggling plant-shaft",
            "sinuous tentacle-cock",
            "squirming cock-tendril",
            "writhing tentacle-pecker",
            "wriggling plant-prick",
            "penile flora",
            "smooth shaft",
            "undulating tentacle-dick",
            "slithering vine-prick",
            "vine-shaped cock");
    }
    else if (cockType === CockType.CAT) {
        return randomChoice("feline dick",
            "spined cat-cock",
            "pink kitty-cock",
            "spiny prick",
            "animalistic kitty-prick",
            "oddly-textured cat-penis",
            "feline member",
            "spined shaft",
            "feline shaft",
            "barbed dick",
            "nubby kitten-prick");
    }
    else if (cockType === CockType.LIZARD) {
        return randomChoice("reptilian dick",
            "purple cock",
            "inhuman cock",
            "reptilian prick",
            "purple prick",
            "purple member",
            "serpentine member",
            "serpentine shaft",
            "reptilian shaft",
            "bulbous snake-shaft",
            "bulging snake-dick");
    }
    else if (cockType === CockType.ANEMONE) {
        return randomChoice("anemone dick",
            "tentacle-ringed cock",
            "blue member",
            "stinger-laden shaft",
            "pulsating prick",
            "anemone prick",
            "stinger-coated member",
            "blue cock",
            "tentacle-ringed dick",
            "near-transparent shaft",
            "squirming shaft");
    }
    else if (cockType === CockType.KANGAROO) {
        return randomChoice("kangaroo-like dick",
            "pointed cock",
            "marsupial member",
            "tapered shaft",
            "curved pecker",
            "pointed prick",
            "squirming kangaroo-cock",
            "marsupial cock",
            "tapered kangaroo-dick",
            "curved kangaroo-cock",
            "squirming shaft");
    }
    else if (cockType === CockType.DRAGON) {
        return randomChoice("dragon-like dick",
            "segmented shaft",
            "pointed prick",
            "knotted dragon-cock",
            "mythical mast",
            "segmented tool",
            "draconic dick",
            "draconic cock",
            "tapered dick",
            "unusual endowment",
            "scaly shaft");
    }
    else if (cockType === CockType.DISPLACER) {
        return randomChoice("coerl cock",
            "tentacle-tipped phallus",
            "starfish-tipped shaft",
            "alien member",
            "almost-canine dick",
            "bizarre prick",
            "beastly cock",
            "cthulhu-tier cock",
            "coerl cock",
            "animal dong",
            "star-capped tool",
            "knotted erection");
    }
    return randomChoice("cock",
        "prick",
        "pecker",
        "shaft");
}

// New cock adjectives.  The old one sucked dicks
// This function handles all cockAdjectives. Previously there were separate functions for the player, monsters and NPCs.
export function adjectiveCock(character: Character, cock?: Cock, lust: number = 50, cumQ: number = 10, isGooey: boolean = false): string {
    if (!cock) return "";
    const cockIndex = character.body.cocks.indexOf(cock);
    const cockPiercings = character.inventory.piercings.cocks;
    const cockSocks = character.inventory.cockSocks;
    const isPierced: boolean = cockIndex !== -1 && !!cockPiercings.get(cockIndex) && cockPiercings.get(cockIndex)!.isEquipped();
    const hasSock: boolean = cockIndex !== -1 && !!cockSocks.get(cockIndex) && cockSocks.get(cockIndex)!.isEquipped();
    // First, the three possible special cases
    if (isPierced && percentChance(20))
        return "pierced";
    if (hasSock && percentChance(20))
        return randomChoice("sock-sheathed", "garment-wrapped", "smartly dressed", "cloth-shrouded", "fabric swaddled", "covered");
    if (isGooey && percentChance(25))
        return randomChoice("goopey", "gooey", "slimy");
    // Length 1/3 chance
    if (percentChance(33)) {
        if (length < 3)
            return randomChoice("little", "toy-sized", "mini", "budding", "tiny");
        else if (length < 5)
            return randomChoice("short", "small");
        else if (length < 7)
            return randomChoice("fair-sized", "nice");
        else if (length < 9) {
            if (cock.type === CockType.HORSE)
                return randomChoice("sizable", "pony-sized", "colt-like");
            return randomChoice("sizable", "long", "lengthy");
        }
        else if (length < 13) {
            if (cock.type === CockType.DOG)
                return randomChoice("huge", "foot-long", "mastiff-like");
            return randomChoice("huge", "foot-long", "cucumber-length");
        }
        else if (length < 18)
            return randomChoice("massive", "knee-length", "forearm-length");
        else if (length < 30)
            return randomChoice("enormous", "giant", "arm-like");
        else if (cock.type === CockType.TENTACLE && percentChance(50))
            return "coiled";
        else
            return randomChoice("towering", "freakish", "monstrous", "massive");
    }
    // Hornyness 1/2
    else if (lust > 75 && percentChance(50)) {
        if (lust > 90) { // Uber horny like a baws!
            if (cumQ < 50)
                return randomChoice("throbbing", "pulsating"); // Weak as shit cum
            else if (cumQ < 200)
                return randomChoice("dribbling", "leaking", "drooling"); // lots of cum? drippy.
            else
                return randomChoice("very drippy", "pre-gushing", "cum-bubbling", "pre-slicked", "pre-drooling"); // Tons of cum
        }
        else {// A little less lusty, but still lusty.
            if (cumQ < 50)
                return randomChoice("turgid", "blood-engorged", "rock-hard", "stiff", "eager"); // Weak as shit cum
            else if (cumQ < 200)
                return randomChoice("turgid", "blood-engorged", "rock-hard", "stiff", "eager", "fluid-beading", "slowly-oozing"); // A little drippy
            else
                return randomChoice("dribbling", "drooling", "fluid-leaking", "leaking"); // uber drippy
        }
    }
    // Girth - fallback
    if (cock.thickness <= 0.75) return randomChoice("thin", "slender", "narrow");
    else if (cock.thickness <= 1.2)
        return "ample";
    else if (cock.thickness <= 1.4)
        return randomChoice("ample", "big");
    else if (cock.thickness <= 2)
        return randomChoice("broad", "meaty", "girthy");
    else if (cock.thickness <= 3.5)
        return randomChoice("fat", "distended", "wide");
    else
        return randomChoice("inhumanly distended", "monstrously thick", "bloated");
}

// Cock adjectives for single cock
export function adjectivesCock(cock: Cock | undefined, character: Character): string {
    if (!cock) return "";
    let description: string = "";
    // length or thickness, usually length.
    if (percentChance(25)) {
        if (cock.length < 3) {
            description = randomChoice("little", "toy-sized", "tiny");
        }
        else if (cock.length < 5) {
            description = randomChoice("short", "small");
        }
        else if (cock.length < 7) {
            description = randomChoice("fair-sized", "nice");
        }
        else if (cock.length < 9) {
            description = randomChoice("long", "lengthy", "sizable");
        }
        else if (cock.length < 13) {
            description = randomChoice("huge", "foot-long");
        }
        else if (cock.length < 18) {
            description = randomChoice("massive", "forearm-length");
        }
        else if (cock.length < 30) {
            description = randomChoice("enormous", "monster-length");
        }
        else {
            description = randomChoice("towering", "freakish", "massive");
        }
    }
    // thickness go!
    else if (percentChance(25)) {
        if (cock.thickness <= .75)
            description += "narrow";
        else if (cock.thickness <= 1.1)
            description += "nice";
        else if (cock.thickness <= 1.4)
            description += randomChoice("ample", "big");
        else if (cock.thickness <= 2)
            description += randomChoice("broad", "girthy");
        else if (cock.thickness <= 3.5)
            description += randomChoice("fat", "distended");
        else
            description += randomChoice("inhumanly distended", "monstrously thick");
    }
    // Length/Thickness done.  Moving on to special animal characters/lust stuff.
    /*Animal Fillers - turned off due to duplication in noun segment
        else if(type == 1 && descripts == 0 && randInt(2) == 0) {
        if(randInt(2) == 0) descript += "flared ";
        else descript += "musky ";
        }
        else if(type == 2 && descripts == 0 && randInt(2) == 0) {
        descript += "musky ";
        }*/
    // FINAL FALLBACKS - lust descriptors
    // Lust stuff
    else if (character.stats.lust > 90) {
        // lots of cum? drippy.
        if (character.cumQ() > 50 && character.cumQ() < 200 && percentChance(50)) {
            switch (cock.type) {
                case CockType.HUMAN:
                case CockType.HORSE:
                case CockType.DOG:
                case CockType.CAT:
                case CockType.KANGAROO:
                case CockType.FOX:
                    description += "animal-pre leaking";
                    break;
                default:
                    description += "pre-slickened";
                    break;
            }
        }
        // Tons of cum
        else if (character.cumQ() >= 200 && percentChance(50)) {
            switch (cock.type) {
                case CockType.HUMAN:
                case CockType.HORSE:
                case CockType.DOG:
                case CockType.CAT:
                case CockType.KANGAROO:
                case CockType.FOX:
                    description += "animal-spunk dripping";
                    break;
                default:
                    description += "cum-drooling";
                    break;
            }
        }
        // Not descripted? Pulsing and twitching
        else
            description += randomChoice("throbbing", "pulsating");
    }
    // A little less lusty, but still lusty.
    else if (character.stats.lust > 75) {
        if (character.cumQ() > 50 && character.cumQ() < 200 && percentChance(50))
            description += "pre-leaking";
        else if (character.cumQ() >= 200 && percentChance(50))
            description += "pre-cum dripping";
        else
            description += randomChoice("rock-hard", "eager");
    }
    // Not lusty at all, fallback adjective
    else if (character.stats.lust > 50)
        description += "hard";
    else
        description += "ready";
    return description;
}

export function nounCocks(cockType: CockType): string {
    if (cockType === CockType.HUMAN)
        return randomChoice("cock",
            "cock",
            "cock",
            "cock",
            "cock",
            "prick",
            "prick",
            "pecker",
            "shaft",
            "shaft",
            "shaft");
    else if (cockType === CockType.BEE)
        return randomChoice("bee prick",
            "bee prick",
            "bee prick",
            "bee prick",
            "insectoid cock",
            "insectoid cock",
            "furred monster");
    else if (cockType === CockType.DOG)
        return randomChoice("doggie dong",
            "canine shaft",
            "pointed prick",
            "dog-shaft",
            "dog-cock",
            "puppy-pecker",
            "dog-dick",
            "pointed shaft",
            "canine cock",
            "canine cock",
            "dog cock");
    else if (cockType === CockType.HORSE)
        return randomChoice("horsecock",
            "equine prick",
            "horse-shaft",
            "horse-prick",
            "stallion-prick",
            "equine dong");
    else if (cockType === CockType.DEMON)
        return randomChoice("demon-dick",
            "nubby shaft",
            "corrupted cock",
            "perverse pecker",
            "bumpy demon-dick",
            "demonic cock",
            "demonic dong",
            "cursed cock",
            "infernal prick",
            "unholy cock",
            "blighted cock");
    else if (cockType === CockType.TENTACLE)
        return randomChoice("tentacle prick",
            "plant-like shaft",
            "tentacle cock",
            "cock-tendril",
            "tentacle pecker",
            "plant prick",
            "penile flora",
            "smooth inhuman shaft",
            "tentacle dick",
            "vine prick",
            "vine-like cock");
    else if (cockType === CockType.CAT)
        return randomChoice("feline dick",
            "cat-cock",
            "kitty-cock",
            "spiny prick",
            "pussy-prick",
            "cat-penis",
            "feline member",
            "spined shaft",
            "feline shaft",
            "'barbed' dick",
            "kitten-prick");
    else if (cockType === CockType.LIZARD)
        return randomChoice("reptile-dick",
            "purple cock",
            "inhuman cock",
            "reptilian prick",
            "purple prick",
            "purple member",
            "serpentine member",
            "serpentine shaft",
            "reptilian shaft",
            "snake-shaft",
            "snake dick");
    return randomChoice("cock",
        "prick",
        "pecker",
        "shaft");
}

/**
 * Previously sMultiCockDesc and SMultiCockDesc
 * @param character
 * @param caps
 */
export function describeOneOfYourCocks(character: Character, caps?: boolean): string {
    if (caps)
        return (character.body.cocks.length > 1 ? "One of your " : "Your ") + cockMultiLDescriptionShort(character);
    else
        return (character.body.cocks.length > 1 ? "one of your " : "your ") + cockMultiLDescriptionShort(character);
}

/**
 * Previously oMultiCockDesc and OMultiCockDesc
 * @param character
 * @param caps
 */
export function describeEachOfYourCocks(character: Character, caps?: boolean): string {
    if (caps)
        return (character.body.cocks.length > 1 ? "Each of your " : "Your ") + cockMultiLDescriptionShort(character);
    else
        return (character.body.cocks.length > 1 ? "each of your " : "your ") + cockMultiLDescriptionShort(character);
}

function cockMultiLDescriptionShort(character: Character): string {
    const cocks = character.body.cocks;
    if (cocks.length >= 1) {
        const firstCock = cocks.get(0)!;
        if (cocks.length === 1) { // For a single cock return the default description
            return describeCock(character, firstCock);
        }
        if (firstCock.type === CockType.DOG || firstCock.type === CockType.FOX) {
            return nounCock(CockType.DOG) + "s";
        }
        return nounCock(firstCock.type) + "s";
    }

    return nounCock(CockType.HUMAN) + "s";
}

export function describeCockHead(cock: Cock | undefined): string {
    if (!cock) return "";
    switch (cock.type) {
        case CockType.CAT:
            return randomChoice(
                "ponumber",
                "narrow tip"
            );
        case CockType.DEMON:
            return randomChoice(
                "tanumbered crown",
                "nub-ringed tip"
            );
        case CockType.DISPLACER:
            return randomChoice(
                "star tip",
                "blooming cock-head",
                "open crown",
                "alien tip",
                "bizarre head"
            );
        case CockType.DOG:
        case CockType.FOX:
            return randomChoice(
                "ponumbered tip",
                "narrow tip"
            );
        case CockType.HORSE:
            return randomChoice(
                "flare",
                "flat tip"
            );
        case CockType.KANGAROO:
            return randomChoice(
                "tip",
                "ponumber"
            );
        case CockType.LIZARD:
            return randomChoice(
                "crown",
                "head"
            );
        case CockType.TENTACLE:
            return randomChoice(
                "mushroom-like tip",
                "wide plant-like crown"
            );
        default:
            return randomChoice(
                "crown",
                "head",
                "cock-head"
            );
    }
}

export function describeCockSheath(cock: Cock | undefined): string {
    if (!cock) return "";
    return cock.hasSheath() ? "sheath" : "base";
}

// Short cock description. Describes length or girth. Supports multiple cocks.
export function describeCockShort(cock: Cock | undefined): string {
    if (!cock) return "";

    let description: string = "";
    // Discuss length one in 3 times
    if (percentChance(33)) {
        if (cock.length >= 30)
            description = "towering ";
        else if (cock.length >= 18)
            description = "enormous ";
        else if (cock.length >= 13)
            description = "massive ";
        else if (cock.length >= 10)
            description = "huge ";
        else if (cock.length >= 7)
            description = "long ";
        else if (cock.length >= 5)
            description = "average ";
        else
            description = "short ";
    }
    else if (percentChance(50)) { // Discuss girth one in 2 times if not already talked about length.
        // narrow, thin, ample, broad, distended, voluminous
        if (cock.thickness <= .75)
            description = "narrow ";
        else if (cock.thickness > 1 && cock.thickness <= 1.4)
            description = "ample ";
        else if (cock.thickness > 1.4 && cock.thickness <= 2)
            description = "broad ";
        else if (cock.thickness > 2 && cock.thickness <= 3.5)
            description = "fat ";
        else if (cock.thickness > 3.5)
            description = "distended ";
    }
    // Seems to work better without this comma:			if (descripted && cock.cockType != CockType.HUMAN) description += ", ";
    description += nounCock(cock.type);

    return description;
}

export function describeCocksLight(character: Character): string {
    if (character.body.cocks.length <= 0) return "";
    let description: string = "";
    const cocks = character.body.cocks;
    const cockCount = cocks.length;
    const firstCock = cocks.get(0)!;
    const cocksSameType: boolean = cockCount === cocks.filter(Cock.FilterType(firstCock.type)).length;

    if (cockCount === 1)
        return describeCock(character, firstCock);

    if (cockCount === 2) {
        if (cocksSameType)
            description += randomChoice("pair of ", "two ", "brace of ", "matching ", "twin ");
        else
            description += randomChoice("pair of ", "two ", "brace of ");
    }
    else if (cockCount === 3) {
        if (cocksSameType)
            description += randomChoice("three ", "group of ", "<i>ménage à trois</i> of ", "triad of ", "triumvirate of ");
        else
            description += randomChoice("three ", "group of ");
    }
    else if (cockCount > 3)
        description += randomChoice("bundle of ", "obscene group of ", "cluster of ", "wriggling bunch of ");

    description += adjectiveCock(character, cocks.sort(Cock.Largest).get(0), character.stats.lust, character.cumQ(), character.body.skin.type === SkinType.GOO);

    if (cocksSameType)
        description += ", " + nounCock(firstCock.type) + "s";
    else
        description += randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks");

    return description;
}

export function describeCocks(character: Character): string {
    if (character.body.cocks.length <= 0) return "";
    let description: string = "";
    const cocks = character.body.cocks;
    const cockCount: number = cocks.length;
    const firstCock = cocks.get(0)!;
    const cocksSameType: boolean = cockCount === cocks.filter(Cock.FilterType(firstCock.type)).length;

    if (cockCount === 1)
        return describeCock(character, firstCock);

    if (cockCount === 2) {
        if (cocksSameType)
            description += randomChoice("a pair of ", "two ", "a brace of ", "matching ", "twin ");
        else
            description += randomChoice("a pair of ", "two ", "a brace of ");
    }
    else if (cockCount === 3) {
        if (cocksSameType)
            description += randomChoice("three ", "a group of ", "a <i>ménage à trois</i> of ", "a triad of ", "a triumvirate of ");
        else
            description += randomChoice("three ", "a group of ");
    }
    else if (cockCount > 3)
        description += randomChoice("a bundle of ", "an obscene group of ", "a cluster of ", "a wriggling group of ");

    description += adjectiveCock(character, cocks.sort(Cock.Largest).get(0), character.stats.lust, character.cumQ(), character.body.skin.type === SkinType.GOO);

    if (cocksSameType)
        description += ", " + nounCock(firstCock.type) + "s";
    else
        description += randomChoice("mutated cocks", "mutated dicks", "mixed cocks", "mismatched dicks");

    return description;
}
