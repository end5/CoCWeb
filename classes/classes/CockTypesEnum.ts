

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
 * human  	- obvious
 * mammal 	- obvious again
 * super 	- supernatural types
 * tentacle - only one tentacle!
 * reptile	- make a guess
 * seaworld - Anything in the water
 * other	- doesn't fit anywhere else
 */

export enum CockTypesEnum {
    HUMAN = "human",
    HORSE = "mammal",
    DOG = "mammal",
    DEMON = "super",
    TENTACLE = "tentacle",
    CAT = "mammal",
    LIZARD = "reptile",
    ANEMONE = "seaworld",
    KANGAROO = "mammal",
    DRAGON = "reptile",
    DISPLACER = "other",
    FOX = "mammal",
    BEE = "insect",
    UNDEFINED = "",
}
