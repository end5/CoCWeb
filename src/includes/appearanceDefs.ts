// The comment structure in the following section is very specific, as the comment contents
// are actually parsed into regexes that are used by my refactoring tool to refactor
// the relevant descriptions.

// Description constants

// gender
export const GENDER_NONE = 0;
export const GENDER_MALE = 1;
export const GENDER_FEMALE = 2;
export const GENDER_HERM = 3;

// skinType
export const SKIN_TYPE_PLAIN = 0;
export const SKIN_TYPE_FUR = 1;
export const SKIN_TYPE_SCALES = 2;
export const SKIN_TYPE_GOO = 3;
export const SKIN_TYPE_UNDEFINED = 4;

// hairType
export const HAIR_NORMAL = 0;
export const HAIR_FEATHER = 1;
export const HAIR_GHOST = 2;
export const HAIR_GOO = 3;
export const HAIR_ANEMONE = 4;

// faceType
export const FACE_HUMAN = 0;
export const FACE_HORSE = 1;
export const FACE_DOG = 2;
export const FACE_COW_MINOTAUR = 3;
export const FACE_SHARK_TEETH = 4;
export const FACE_SNAKE_FANGS = 5;
export const FACE_CAT = 6;
export const FACE_LIZARD = 7;
export const FACE_BUNNY = 8;
export const FACE_KANGAROO = 9;
export const FACE_SPIDER_FANGS = 10;
export const FACE_FOX = 11;
export const FACE_DRAGON = 12;
export const FACE_RACCOON_MASK = 13;
export const FACE_RACCOON = 14;
export const FACE_BUCKTEETH = 15;
export const FACE_MOUSE = 16;
export const FACE_FERRET_MASK = 17;
export const FACE_FERRET = 18;

// tongueType
export const TONUGE_HUMAN = 0;
export const TONUGE_SNAKE = 1;
export const TONUGE_DEMONIC = 2;
export const TONUGE_DRACONIC = 3;

// eyeType
export const EYES_HUMAN = 0;
export const EYES_FOUR_SPIDER_EYES = 1;
export const EYES_BLACK_EYES_SAND_TRAP = 2;

// earType
export const EARS_HUMAN = 0;
export const EARS_HORSE = 1;
export const EARS_DOG = 2;
export const EARS_COW = 3;
export const EARS_ELFIN = 4;
export const EARS_CAT = 5;
export const EARS_LIZARD = 6;
export const EARS_BUNNY = 7;
export const EARS_KANGAROO = 8;
export const EARS_FOX = 9;
export const EARS_DRAGON = 10;
export const EARS_RACCOON = 11;
export const EARS_MOUSE = 12;
export const EARS_FERRET = 13;

// hornType
export const HORNS_NONE = 0;
export const HORNS_DEMON = 1;
export const HORNS_COW_MINOTAUR = 2;
export const HORNS_DRACONIC_X2 = 3;
export const HORNS_DRACONIC_X4_12_INCH_LONG = 4;
export const HORNS_ANTLERS = 5;

// antennae
export const ANTENNAE_NONE = 0;
export const ANTENNAE_BEE = 2;

// armType
export const ARM_TYPE_HUMAN = 0;
export const ARM_TYPE_HARPY = 1;
export const ARM_TYPE_SPIDER = 2;

// tailType
export const TAIL_TYPE_NONE = 0;
export const TAIL_TYPE_HORSE = 1;
export const TAIL_TYPE_DOG = 2;
export const TAIL_TYPE_DEMONIC = 3;
export const TAIL_TYPE_COW = 4;
export const TAIL_TYPE_SPIDER_ADBOMEN = 5;
export const TAIL_TYPE_BEE_ABDOMEN = 6;
export const TAIL_TYPE_SHARK = 7;
export const TAIL_TYPE_CAT = 8;
export const TAIL_TYPE_LIZARD = 9;
export const TAIL_TYPE_RABBIT = 10;
export const TAIL_TYPE_HARPY = 11;
export const TAIL_TYPE_KANGAROO = 12;
export const TAIL_TYPE_FOX = 13;
export const TAIL_TYPE_DRACONIC = 14;
export const TAIL_TYPE_RACCOON = 15;
export const TAIL_TYPE_MOUSE = 16;
export const TAIL_TYPE_FERRET = 17;

// breast size
export const BREAST_CUP_FLAT = 0;
export const BREAST_CUP_A = 1;
export const BREAST_CUP_B = 2;
export const BREAST_CUP_C = 3;
export const BREAST_CUP_D = 4;
export const BREAST_CUP_DD = 5;
export const BREAST_CUP_DD_BIG = 6;
export const BREAST_CUP_E = 7;
export const BREAST_CUP_E_BIG = 8;
export const BREAST_CUP_EE = 9;
export const BREAST_CUP_EE_BIG = 10;
export const BREAST_CUP_F = 11;
export const BREAST_CUP_F_BIG = 12;
export const BREAST_CUP_FF = 13;
export const BREAST_CUP_FF_BIG = 14;
export const BREAST_CUP_G = 15;
export const BREAST_CUP_G_BIG = 16;
export const BREAST_CUP_GG = 17;
export const BREAST_CUP_GG_BIG = 18;
export const BREAST_CUP_H = 19;
export const BREAST_CUP_H_BIG = 20;
export const BREAST_CUP_HH = 21;
export const BREAST_CUP_HH_BIG = 22;
export const BREAST_CUP_HHH = 23;
export const BREAST_CUP_I = 24;
export const BREAST_CUP_I_BIG = 25;
export const BREAST_CUP_II = 26;
export const BREAST_CUP_II_BIG = 27;
export const BREAST_CUP_J = 28;
export const BREAST_CUP_J_BIG = 29;
export const BREAST_CUP_JJ = 30;
export const BREAST_CUP_JJ_BIG = 31;
export const BREAST_CUP_K = 32;
export const BREAST_CUP_K_BIG = 33;
export const BREAST_CUP_KK = 34;
export const BREAST_CUP_KK_BIG = 35;
export const BREAST_CUP_L = 36;
export const BREAST_CUP_L_BIG = 37;
export const BREAST_CUP_LL = 38;
export const BREAST_CUP_LL_BIG = 39;
export const BREAST_CUP_M = 40;
export const BREAST_CUP_M_BIG = 41;
export const BREAST_CUP_MM = 42;
export const BREAST_CUP_MM_BIG = 43;
export const BREAST_CUP_MMM = 44;
export const BREAST_CUP_MMM_LARGE = 45;
export const BREAST_CUP_N = 46;
export const BREAST_CUP_N_LARGE = 47;
export const BREAST_CUP_NN = 48;
export const BREAST_CUP_NN_LARGE = 49;
export const BREAST_CUP_O = 50;
export const BREAST_CUP_O_LARGE = 51;
export const BREAST_CUP_OO = 52;
export const BREAST_CUP_OO_LARGE = 53;
export const BREAST_CUP_P = 54;
export const BREAST_CUP_P_LARGE = 55;
export const BREAST_CUP_PP = 56;
export const BREAST_CUP_PP_LARGE = 57;
export const BREAST_CUP_Q = 58;
export const BREAST_CUP_Q_LARGE = 59;
export const BREAST_CUP_QQ = 60;
export const BREAST_CUP_QQ_LARGE = 61;
export const BREAST_CUP_R = 62;
export const BREAST_CUP_R_LARGE = 63;
export const BREAST_CUP_RR = 64;
export const BREAST_CUP_RR_LARGE = 65;
export const BREAST_CUP_S = 66;
export const BREAST_CUP_S_LARGE = 67;
export const BREAST_CUP_SS = 68;
export const BREAST_CUP_SS_LARGE = 69;
export const BREAST_CUP_T = 70;
export const BREAST_CUP_T_LARGE = 71;
export const BREAST_CUP_TT = 72;
export const BREAST_CUP_TT_LARGE = 73;
export const BREAST_CUP_U = 74;
export const BREAST_CUP_U_LARGE = 75;
export const BREAST_CUP_UU = 76;
export const BREAST_CUP_UU_LARGE = 77;
export const BREAST_CUP_V = 78;
export const BREAST_CUP_V_LARGE = 79;
export const BREAST_CUP_VV = 80;
export const BREAST_CUP_VV_LARGE = 81;
export const BREAST_CUP_W = 82;
export const BREAST_CUP_W_LARGE = 83;
export const BREAST_CUP_WW = 84;
export const BREAST_CUP_WW_LARGE = 85;
export const BREAST_CUP_X = 86;
export const BREAST_CUP_X_LARGE = 87;
export const BREAST_CUP_XX = 88;
export const BREAST_CUP_XX_LARGE = 89;
export const BREAST_CUP_Y = 90;
export const BREAST_CUP_Y_LARGE = 91;
export const BREAST_CUP_YY = 92;
export const BREAST_CUP_YY_LARGE = 93;
export const BREAST_CUP_Z = 94;
export const BREAST_CUP_Z_LARGE = 95;
export const BREAST_CUP_ZZ = 96;
export const BREAST_CUP_ZZ_LARGE = 97;
export const BREAST_CUP_ZZZ = 98;
export const BREAST_CUP_ZZZ_LARGE = 99;

// wingType
export const WING_TYPE_NONE = 0;
export const WING_TYPE_BEE_LIKE_SMALL = 1;
export const WING_TYPE_BEE_LIKE_LARGE = 2;
export const WING_TYPE_HARPY = 4;
export const WING_TYPE_IMP = 5;
export const WING_TYPE_BAT_LIKE_TINY = 6;
export const WING_TYPE_BAT_LIKE_LARGE = 7;
export const WING_TYPE_SHARK_FIN = 8;
export const WING_TYPE_FEATHERED_LARGE = 9;
export const WING_TYPE_DRACONIC_SMALL = 10;
export const WING_TYPE_DRACONIC_LARGE = 11;
export const WING_TYPE_GIANT_DRAGONFLY = 12;

// lowerBody
export const LOWER_BODY_TYPE_HUMAN = 0;
export const LOWER_BODY_TYPE_HOOFED = 1;
export const LOWER_BODY_TYPE_DOG = 2;
export const LOWER_BODY_TYPE_NAGA = 3;
export const LOWER_BODY_TYPE_CENTAUR = 4;
export const LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS = 5;
export const LOWER_BODY_TYPE_DEMONIC_CLAWS = 6;
export const LOWER_BODY_TYPE_BEE = 7;
export const LOWER_BODY_TYPE_GOO = 8;
export const LOWER_BODY_TYPE_CAT = 9;
export const LOWER_BODY_TYPE_LIZARD = 10;
export const LOWER_BODY_TYPE_PONY = 11;
export const LOWER_BODY_TYPE_BUNNY = 12;
export const LOWER_BODY_TYPE_HARPY = 13;
export const LOWER_BODY_TYPE_KANGAROO = 14;
export const LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS = 15;
export const LOWER_BODY_TYPE_DRIDER_LOWER_BODY = 16;
export const LOWER_BODY_TYPE_FOX = 17;
export const LOWER_BODY_TYPE_DRAGON = 18;
export const LOWER_BODY_TYPE_RACCOON = 19;
export const LOWER_BODY_FERRET = 20;

// piercingtypesNOPEDISABLED
export const PIERCING_TYPE_NONE = 0;
export const PIERCING_TYPE_STUD = 1;
export const PIERCING_TYPE_RING = 2;
export const PIERCING_TYPE_LADDER = 3;
export const PIERCING_TYPE_HOOP = 4;
export const PIERCING_TYPE_CHAIN = 5;

// vaginatypesNOPEDISABLED
export const VAGINA_TYPE_HUMAN = 0;
export const VAGINA_TYPE_BLACK_SAND_TRAP = 5;

// vaginalWetness
export const VAGINA_WETNESS_DRY = 0;
export const VAGINA_WETNESS_NORMAL = 1;
export const VAGINA_WETNESS_WET = 2;
export const VAGINA_WETNESS_SLICK = 3;
export const VAGINA_WETNESS_DROOLING = 4;
export const VAGINA_WETNESS_SLAVERING = 5;

// vaginalLooseness
export const VAGINA_LOOSENESS_TIGHT = 0;
export const VAGINA_LOOSENESS_NORMAL = 1;
export const VAGINA_LOOSENESS_LOOSE = 2;
export const VAGINA_LOOSENESS_GAPING = 3;
export const VAGINA_LOOSENESS_GAPING_WIDE = 4;
export const VAGINA_LOOSENESS_LEVEL_CLOWN_CAR = 5;

// analwetnesslevelsNOPEDISABLED
export const ANAL_WETNESS_DRY = 0;
export const ANAL_WETNESS_NORMAL = 1;
export const ANAL_WETNESS_MOIST = 2;
export const ANAL_WETNESS_SLIMY = 3;
export const ANAL_WETNESS_DROOLING = 4;
export const ANAL_WETNESS_SLIME_DROOLING = 5;

// analloosenesslevelsNOPEDISABLED
export const ANAL_LOOSENESS_VIRGIN = 0;
export const ANAL_LOOSENESS_TIGHT = 1;
export const ANAL_LOOSENESS_NORMAL = 2;
export const ANAL_LOOSENESS_LOOSE = 3;
export const ANAL_LOOSENESS_STRETCHED = 4;
export const ANAL_LOOSENESS_GAPING = 5;

// hipRating
export const HIP_RATING_BOYISH = 0;
export const HIP_RATING_SLENDER = 2;
export const HIP_RATING_AVERAGE = 4;
export const HIP_RATING_AMPLE = 6;
export const HIP_RATING_CURVY = 10;
export const HIP_RATING_FERTILE = 15;
export const HIP_RATING_INHUMANLY_WIDE = 20;

// buttRating
export const BUTT_RATING_BUTTLESS = 0;
export const BUTT_RATING_TIGHT = 2;
export const BUTT_RATING_AVERAGE = 4;
export const BUTT_RATING_NOTICEABLE = 6;
export const BUTT_RATING_LARGE = 8;
export const BUTT_RATING_JIGGLY = 10;
export const BUTT_RATING_EXPANSIVE = 13;
export const BUTT_RATING_HUGE = 16;
export const BUTT_RATING_INCONCEIVABLY_BIG = 20;

// End Description constants
