// The comment structure in the following section is very specific, as the comment contents
// are actually parsed into regexes that are used by my refactoring tool to refactor
// the relevant descriptions.
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Description constants
    // gender
    exports.GENDER_NONE = 0;
    exports.GENDER_MALE = 1;
    exports.GENDER_FEMALE = 2;
    exports.GENDER_HERM = 3;
    // skinType
    exports.SKIN_TYPE_PLAIN = 0;
    exports.SKIN_TYPE_FUR = 1;
    exports.SKIN_TYPE_SCALES = 2;
    exports.SKIN_TYPE_GOO = 3;
    exports.SKIN_TYPE_UNDEFINED = 4;
    // hairType
    exports.HAIR_NORMAL = 0;
    exports.HAIR_FEATHER = 1;
    exports.HAIR_GHOST = 2;
    exports.HAIR_GOO = 3;
    exports.HAIR_ANEMONE = 4;
    // faceType
    exports.FACE_HUMAN = 0;
    exports.FACE_HORSE = 1;
    exports.FACE_DOG = 2;
    exports.FACE_COW_MINOTAUR = 3;
    exports.FACE_SHARK_TEETH = 4;
    exports.FACE_SNAKE_FANGS = 5;
    exports.FACE_CAT = 6;
    exports.FACE_LIZARD = 7;
    exports.FACE_BUNNY = 8;
    exports.FACE_KANGAROO = 9;
    exports.FACE_SPIDER_FANGS = 10;
    exports.FACE_FOX = 11;
    exports.FACE_DRAGON = 12;
    exports.FACE_RACCOON_MASK = 13;
    exports.FACE_RACCOON = 14;
    exports.FACE_BUCKTEETH = 15;
    exports.FACE_MOUSE = 16;
    exports.FACE_FERRET_MASK = 17;
    exports.FACE_FERRET = 18;
    // tongueType
    exports.TONUGE_HUMAN = 0;
    exports.TONUGE_SNAKE = 1;
    exports.TONUGE_DEMONIC = 2;
    exports.TONUGE_DRACONIC = 3;
    // eyeType
    exports.EYES_HUMAN = 0;
    exports.EYES_FOUR_SPIDER_EYES = 1;
    exports.EYES_BLACK_EYES_SAND_TRAP = 2;
    // earType
    exports.EARS_HUMAN = 0;
    exports.EARS_HORSE = 1;
    exports.EARS_DOG = 2;
    exports.EARS_COW = 3;
    exports.EARS_ELFIN = 4;
    exports.EARS_CAT = 5;
    exports.EARS_LIZARD = 6;
    exports.EARS_BUNNY = 7;
    exports.EARS_KANGAROO = 8;
    exports.EARS_FOX = 9;
    exports.EARS_DRAGON = 10;
    exports.EARS_RACCOON = 11;
    exports.EARS_MOUSE = 12;
    exports.EARS_FERRET = 13;
    // hornType
    exports.HORNS_NONE = 0;
    exports.HORNS_DEMON = 1;
    exports.HORNS_COW_MINOTAUR = 2;
    exports.HORNS_DRACONIC_X2 = 3;
    exports.HORNS_DRACONIC_X4_12_INCH_LONG = 4;
    exports.HORNS_ANTLERS = 5;
    // antennae
    exports.ANTENNAE_NONE = 0;
    exports.ANTENNAE_BEE = 2;
    // armType
    exports.ARM_TYPE_HUMAN = 0;
    exports.ARM_TYPE_HARPY = 1;
    exports.ARM_TYPE_SPIDER = 2;
    // tailType
    exports.TAIL_TYPE_NONE = 0;
    exports.TAIL_TYPE_HORSE = 1;
    exports.TAIL_TYPE_DOG = 2;
    exports.TAIL_TYPE_DEMONIC = 3;
    exports.TAIL_TYPE_COW = 4;
    exports.TAIL_TYPE_SPIDER_ADBOMEN = 5;
    exports.TAIL_TYPE_BEE_ABDOMEN = 6;
    exports.TAIL_TYPE_SHARK = 7;
    exports.TAIL_TYPE_CAT = 8;
    exports.TAIL_TYPE_LIZARD = 9;
    exports.TAIL_TYPE_RABBIT = 10;
    exports.TAIL_TYPE_HARPY = 11;
    exports.TAIL_TYPE_KANGAROO = 12;
    exports.TAIL_TYPE_FOX = 13;
    exports.TAIL_TYPE_DRACONIC = 14;
    exports.TAIL_TYPE_RACCOON = 15;
    exports.TAIL_TYPE_MOUSE = 16;
    exports.TAIL_TYPE_FERRET = 17;
    //breast size
    exports.BREAST_CUP_FLAT = 0;
    exports.BREAST_CUP_A = 1;
    exports.BREAST_CUP_B = 2;
    exports.BREAST_CUP_C = 3;
    exports.BREAST_CUP_D = 4;
    exports.BREAST_CUP_DD = 5;
    exports.BREAST_CUP_DD_BIG = 6;
    exports.BREAST_CUP_E = 7;
    exports.BREAST_CUP_E_BIG = 8;
    exports.BREAST_CUP_EE = 9;
    exports.BREAST_CUP_EE_BIG = 10;
    exports.BREAST_CUP_F = 11;
    exports.BREAST_CUP_F_BIG = 12;
    exports.BREAST_CUP_FF = 13;
    exports.BREAST_CUP_FF_BIG = 14;
    exports.BREAST_CUP_G = 15;
    exports.BREAST_CUP_G_BIG = 16;
    exports.BREAST_CUP_GG = 17;
    exports.BREAST_CUP_GG_BIG = 18;
    exports.BREAST_CUP_H = 19;
    exports.BREAST_CUP_H_BIG = 20;
    exports.BREAST_CUP_HH = 21;
    exports.BREAST_CUP_HH_BIG = 22;
    exports.BREAST_CUP_HHH = 23;
    exports.BREAST_CUP_I = 24;
    exports.BREAST_CUP_I_BIG = 25;
    exports.BREAST_CUP_II = 26;
    exports.BREAST_CUP_II_BIG = 27;
    exports.BREAST_CUP_J = 28;
    exports.BREAST_CUP_J_BIG = 29;
    exports.BREAST_CUP_JJ = 30;
    exports.BREAST_CUP_JJ_BIG = 31;
    exports.BREAST_CUP_K = 32;
    exports.BREAST_CUP_K_BIG = 33;
    exports.BREAST_CUP_KK = 34;
    exports.BREAST_CUP_KK_BIG = 35;
    exports.BREAST_CUP_L = 36;
    exports.BREAST_CUP_L_BIG = 37;
    exports.BREAST_CUP_LL = 38;
    exports.BREAST_CUP_LL_BIG = 39;
    exports.BREAST_CUP_M = 40;
    exports.BREAST_CUP_M_BIG = 41;
    exports.BREAST_CUP_MM = 42;
    exports.BREAST_CUP_MM_BIG = 43;
    exports.BREAST_CUP_MMM = 44;
    exports.BREAST_CUP_MMM_LARGE = 45;
    exports.BREAST_CUP_N = 46;
    exports.BREAST_CUP_N_LARGE = 47;
    exports.BREAST_CUP_NN = 48;
    exports.BREAST_CUP_NN_LARGE = 49;
    exports.BREAST_CUP_O = 50;
    exports.BREAST_CUP_O_LARGE = 51;
    exports.BREAST_CUP_OO = 52;
    exports.BREAST_CUP_OO_LARGE = 53;
    exports.BREAST_CUP_P = 54;
    exports.BREAST_CUP_P_LARGE = 55;
    exports.BREAST_CUP_PP = 56;
    exports.BREAST_CUP_PP_LARGE = 57;
    exports.BREAST_CUP_Q = 58;
    exports.BREAST_CUP_Q_LARGE = 59;
    exports.BREAST_CUP_QQ = 60;
    exports.BREAST_CUP_QQ_LARGE = 61;
    exports.BREAST_CUP_R = 62;
    exports.BREAST_CUP_R_LARGE = 63;
    exports.BREAST_CUP_RR = 64;
    exports.BREAST_CUP_RR_LARGE = 65;
    exports.BREAST_CUP_S = 66;
    exports.BREAST_CUP_S_LARGE = 67;
    exports.BREAST_CUP_SS = 68;
    exports.BREAST_CUP_SS_LARGE = 69;
    exports.BREAST_CUP_T = 70;
    exports.BREAST_CUP_T_LARGE = 71;
    exports.BREAST_CUP_TT = 72;
    exports.BREAST_CUP_TT_LARGE = 73;
    exports.BREAST_CUP_U = 74;
    exports.BREAST_CUP_U_LARGE = 75;
    exports.BREAST_CUP_UU = 76;
    exports.BREAST_CUP_UU_LARGE = 77;
    exports.BREAST_CUP_V = 78;
    exports.BREAST_CUP_V_LARGE = 79;
    exports.BREAST_CUP_VV = 80;
    exports.BREAST_CUP_VV_LARGE = 81;
    exports.BREAST_CUP_W = 82;
    exports.BREAST_CUP_W_LARGE = 83;
    exports.BREAST_CUP_WW = 84;
    exports.BREAST_CUP_WW_LARGE = 85;
    exports.BREAST_CUP_X = 86;
    exports.BREAST_CUP_X_LARGE = 87;
    exports.BREAST_CUP_XX = 88;
    exports.BREAST_CUP_XX_LARGE = 89;
    exports.BREAST_CUP_Y = 90;
    exports.BREAST_CUP_Y_LARGE = 91;
    exports.BREAST_CUP_YY = 92;
    exports.BREAST_CUP_YY_LARGE = 93;
    exports.BREAST_CUP_Z = 94;
    exports.BREAST_CUP_Z_LARGE = 95;
    exports.BREAST_CUP_ZZ = 96;
    exports.BREAST_CUP_ZZ_LARGE = 97;
    exports.BREAST_CUP_ZZZ = 98;
    exports.BREAST_CUP_ZZZ_LARGE = 99;
    // wingType
    exports.WING_TYPE_NONE = 0;
    exports.WING_TYPE_BEE_LIKE_SMALL = 1;
    exports.WING_TYPE_BEE_LIKE_LARGE = 2;
    exports.WING_TYPE_HARPY = 4;
    exports.WING_TYPE_IMP = 5;
    exports.WING_TYPE_BAT_LIKE_TINY = 6;
    exports.WING_TYPE_BAT_LIKE_LARGE = 7;
    exports.WING_TYPE_SHARK_FIN = 8;
    exports.WING_TYPE_FEATHERED_LARGE = 9;
    exports.WING_TYPE_DRACONIC_SMALL = 10;
    exports.WING_TYPE_DRACONIC_LARGE = 11;
    exports.WING_TYPE_GIANT_DRAGONFLY = 12;
    // lowerBody
    exports.LOWER_BODY_TYPE_HUMAN = 0;
    exports.LOWER_BODY_TYPE_HOOFED = 1;
    exports.LOWER_BODY_TYPE_DOG = 2;
    exports.LOWER_BODY_TYPE_NAGA = 3;
    exports.LOWER_BODY_TYPE_CENTAUR = 4;
    exports.LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS = 5;
    exports.LOWER_BODY_TYPE_DEMONIC_CLAWS = 6;
    exports.LOWER_BODY_TYPE_BEE = 7;
    exports.LOWER_BODY_TYPE_GOO = 8;
    exports.LOWER_BODY_TYPE_CAT = 9;
    exports.LOWER_BODY_TYPE_LIZARD = 10;
    exports.LOWER_BODY_TYPE_PONY = 11;
    exports.LOWER_BODY_TYPE_BUNNY = 12;
    exports.LOWER_BODY_TYPE_HARPY = 13;
    exports.LOWER_BODY_TYPE_KANGAROO = 14;
    exports.LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS = 15;
    exports.LOWER_BODY_TYPE_DRIDER_LOWER_BODY = 16;
    exports.LOWER_BODY_TYPE_FOX = 17;
    exports.LOWER_BODY_TYPE_DRAGON = 18;
    exports.LOWER_BODY_TYPE_RACCOON = 19;
    exports.LOWER_BODY_FERRET = 20;
    // piercingtypesNOPEDISABLED
    exports.PIERCING_TYPE_NONE = 0;
    exports.PIERCING_TYPE_STUD = 1;
    exports.PIERCING_TYPE_RING = 2;
    exports.PIERCING_TYPE_LADDER = 3;
    exports.PIERCING_TYPE_HOOP = 4;
    exports.PIERCING_TYPE_CHAIN = 5;
    // vaginatypesNOPEDISABLED
    exports.VAGINA_TYPE_HUMAN = 0;
    exports.VAGINA_TYPE_BLACK_SAND_TRAP = 5;
    // vaginalWetness
    exports.VAGINA_WETNESS_DRY = 0;
    exports.VAGINA_WETNESS_NORMAL = 1;
    exports.VAGINA_WETNESS_WET = 2;
    exports.VAGINA_WETNESS_SLICK = 3;
    exports.VAGINA_WETNESS_DROOLING = 4;
    exports.VAGINA_WETNESS_SLAVERING = 5;
    // vaginalLooseness
    exports.VAGINA_LOOSENESS_TIGHT = 0;
    exports.VAGINA_LOOSENESS_NORMAL = 1;
    exports.VAGINA_LOOSENESS_LOOSE = 2;
    exports.VAGINA_LOOSENESS_GAPING = 3;
    exports.VAGINA_LOOSENESS_GAPING_WIDE = 4;
    exports.VAGINA_LOOSENESS_LEVEL_CLOWN_CAR = 5;
    // analwetnesslevelsNOPEDISABLED
    exports.ANAL_WETNESS_DRY = 0;
    exports.ANAL_WETNESS_NORMAL = 1;
    exports.ANAL_WETNESS_MOIST = 2;
    exports.ANAL_WETNESS_SLIMY = 3;
    exports.ANAL_WETNESS_DROOLING = 4;
    exports.ANAL_WETNESS_SLIME_DROOLING = 5;
    // analloosenesslevelsNOPEDISABLED
    exports.ANAL_LOOSENESS_VIRGIN = 0;
    exports.ANAL_LOOSENESS_TIGHT = 1;
    exports.ANAL_LOOSENESS_NORMAL = 2;
    exports.ANAL_LOOSENESS_LOOSE = 3;
    exports.ANAL_LOOSENESS_STRETCHED = 4;
    exports.ANAL_LOOSENESS_GAPING = 5;
    // hipRating
    exports.HIP_RATING_BOYISH = 0;
    exports.HIP_RATING_SLENDER = 2;
    exports.HIP_RATING_AVERAGE = 4;
    exports.HIP_RATING_AMPLE = 6;
    exports.HIP_RATING_CURVY = 10;
    exports.HIP_RATING_FERTILE = 15;
    exports.HIP_RATING_INHUMANLY_WIDE = 20;
    // buttRating
    exports.BUTT_RATING_BUTTLESS = 0;
    exports.BUTT_RATING_TIGHT = 2;
    exports.BUTT_RATING_AVERAGE = 4;
    exports.BUTT_RATING_NOTICEABLE = 6;
    exports.BUTT_RATING_LARGE = 8;
    exports.BUTT_RATING_JIGGLY = 10;
    exports.BUTT_RATING_EXPANSIVE = 13;
    exports.BUTT_RATING_HUGE = 16;
    exports.BUTT_RATING_INCONCEIVABLY_BIG = 20;
});
// End Description constants
//# sourceMappingURL=appearanceDefs.js.map