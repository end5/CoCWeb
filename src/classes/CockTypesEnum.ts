/* Cock types
 * 0 - human
 * 1 - horse
 * 2 - dog
 * 3 - demon
 * 4 - tentacle?
 * 5 - CAT
 * 6 - Lizard/Naga?
 * 7 - ANEMONE!
 * 8 - ugliest wang ever (kangaroo)
 * 9 - dragon
 * 10 - displacer
 * 11 - Fox

 Group Types used for general description code (eventually)
 * human   - obvious
 * mammal  - obvious again
 * super  - supernatural types
 * tentacle - only one tentacle!
 * reptile - make a guess
 * seaworld - Anything in the water
 * other - doesn't fit anywhere else
 */

export enum CockTypesEnum {
    HUMAN,
    HORSE,
    DOG,
    DEMON,
    TENTACLE,
    CAT,
    LIZARD,
    ANEMONE,
    KANGAROO,
    DRAGON,
    DISPLACER,
    FOX,
    BEE,
    UNDEFINED,
}

export const CockTypesGroup: Record<CockTypesEnum, string> = {
    [CockTypesEnum.HUMAN]: "human",
    [CockTypesEnum.HORSE]: "mammal",
    [CockTypesEnum.DOG]: "mammal",
    [CockTypesEnum.DEMON]: "super",
    [CockTypesEnum.TENTACLE]: "tentacle",
    [CockTypesEnum.CAT]: "mammal",
    [CockTypesEnum.LIZARD]: "reptile",
    [CockTypesEnum.ANEMONE]: "seaworld",
    [CockTypesEnum.KANGAROO]: "mammal",
    [CockTypesEnum.DRAGON]: "reptile",
    [CockTypesEnum.DISPLACER]: "other",
    [CockTypesEnum.FOX]: "mammal",
    [CockTypesEnum.BEE]: "insect",
    [CockTypesEnum.UNDEFINED]: "",
};
