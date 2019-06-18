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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CockTypesEnum;
    (function (CockTypesEnum) {
        CockTypesEnum[CockTypesEnum["HUMAN"] = 0] = "HUMAN";
        CockTypesEnum[CockTypesEnum["HORSE"] = 1] = "HORSE";
        CockTypesEnum[CockTypesEnum["DOG"] = 2] = "DOG";
        CockTypesEnum[CockTypesEnum["DEMON"] = 3] = "DEMON";
        CockTypesEnum[CockTypesEnum["TENTACLE"] = 4] = "TENTACLE";
        CockTypesEnum[CockTypesEnum["CAT"] = 5] = "CAT";
        CockTypesEnum[CockTypesEnum["LIZARD"] = 6] = "LIZARD";
        CockTypesEnum[CockTypesEnum["ANEMONE"] = 7] = "ANEMONE";
        CockTypesEnum[CockTypesEnum["KANGAROO"] = 8] = "KANGAROO";
        CockTypesEnum[CockTypesEnum["DRAGON"] = 9] = "DRAGON";
        CockTypesEnum[CockTypesEnum["DISPLACER"] = 10] = "DISPLACER";
        CockTypesEnum[CockTypesEnum["FOX"] = 11] = "FOX";
        CockTypesEnum[CockTypesEnum["BEE"] = 12] = "BEE";
        CockTypesEnum[CockTypesEnum["UNDEFINED"] = 13] = "UNDEFINED";
    })(CockTypesEnum = exports.CockTypesEnum || (exports.CockTypesEnum = {}));
    exports.CockTypesGroup = {
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
});
//# sourceMappingURL=CockTypesEnum.js.map