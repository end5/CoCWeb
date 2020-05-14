// The comment structure in the following section is very specific, as the comment contents
// are actually parsed into regexes that are used by my refactoring tool to refactor
// the relevant descriptions.

// Description constants

// gender
export const GENDER_NONE: number                                                 =    0;
export const GENDER_MALE: number                                                 =    1;
export const GENDER_FEMALE: number                                               =    2;
export const GENDER_HERM: number                                                 =    3;

// skinType
export const SKIN_TYPE_PLAIN: number                                             =    0;
export const SKIN_TYPE_FUR: number                                               =    1;
export const SKIN_TYPE_SCALES: number                                            =    2;
export const SKIN_TYPE_GOO: number                                               =    3;
export const SKIN_TYPE_UNDEFINED: number                                         =    4;

// hairType
export const HAIR_NORMAL: number                                                =     0;
export const HAIR_FEATHER: number                                               =     1;
export const HAIR_GHOST: number                                                 =     2;
export const HAIR_GOO: number                                                   =     3;
export const HAIR_ANEMONE: number                                               =     4;

// faceType
export const FACE_HUMAN: number                                                  =    0;
export const FACE_HORSE: number                                                  =    1;
export const FACE_DOG: number                                                    =    2;
export const FACE_COW_MINOTAUR: number                                           =    3;
export const FACE_SHARK_TEETH: number                                            =    4;
export const FACE_SNAKE_FANGS: number                                            =    5;
export const FACE_CAT: number                                                    =    6;
export const FACE_LIZARD: number                                                 =    7;
export const FACE_BUNNY: number                                                  =    8;
export const FACE_KANGAROO: number                                               =    9;
export const FACE_SPIDER_FANGS: number                                           =   10;
export const FACE_FOX: number                                                    =   11;
export const FACE_DRAGON: number                                                 =   12;
export const FACE_RACCOON_MASK: number                                           =   13;
export const FACE_RACCOON: number                                                =   14;
export const FACE_BUCKTEETH: number                                              =   15;
export const FACE_MOUSE: number                                                  =   16;
export const FACE_FERRET_MASK: number                                            =   17;
export const FACE_FERRET: number                                            		=   18;

// tongueType
export const TONUGE_HUMAN: number                                                =   0;
export const TONUGE_SNAKE: number                                                =   1;
export const TONUGE_DEMONIC: number                                              =   2;
export const TONUGE_DRACONIC: number                                             =   3;

// eyeType
export const EYES_HUMAN: number                                                  =   0;
export const EYES_FOUR_SPIDER_EYES: number                                       =   1;
export const EYES_BLACK_EYES_SAND_TRAP: number                                   =   2;

// earType
export const EARS_HUMAN: number                                                  =   0;
export const EARS_HORSE: number                                                  =   1;
export const EARS_DOG: number                                                    =   2;
export const EARS_COW: number                                                    =   3;
export const EARS_ELFIN: number                                                  =   4;
export const EARS_CAT: number                                                    =   5;
export const EARS_LIZARD: number                                                 =   6;
export const EARS_BUNNY: number                                                  =   7;
export const EARS_KANGAROO: number                                               =   8;
export const EARS_FOX: number                                                    =   9;
export const EARS_DRAGON: number                                                 =  10;
export const EARS_RACCOON: number                                                =  11;
export const EARS_MOUSE: number                                                  =  12;
export const EARS_FERRET: number                                                 =  13;

// hornType
export const HORNS_NONE: number                                                  =   0;
export const HORNS_DEMON: number                                                 =   1;
export const HORNS_COW_MINOTAUR: number                                          =   2;
export const HORNS_DRACONIC_X2: number                                           =   3;
export const HORNS_DRACONIC_X4_12_INCH_LONG: number                              =   4;
export const HORNS_ANTLERS: number                                               =   5;

// antennae
export const ANTENNAE_NONE: number                                               =   0;
export const ANTENNAE_BEE: number                                                =   2;

// armType
export const ARM_TYPE_HUMAN: number                                              =   0;
export const ARM_TYPE_HARPY: number                                              =   1;
export const ARM_TYPE_SPIDER: number                                             =   2;

// tailType
export const TAIL_TYPE_NONE: number                                              =   0;
export const TAIL_TYPE_HORSE: number                                             =   1;
export const TAIL_TYPE_DOG: number                                               =   2;
export const TAIL_TYPE_DEMONIC: number                                           =   3;
export const TAIL_TYPE_COW: number                                               =   4;
export const TAIL_TYPE_SPIDER_ADBOMEN: number                                    =   5;
export const TAIL_TYPE_BEE_ABDOMEN: number                                       =   6;
export const TAIL_TYPE_SHARK: number                                             =   7;
export const TAIL_TYPE_CAT: number                                               =   8;
export const TAIL_TYPE_LIZARD: number                                            =   9;
export const TAIL_TYPE_RABBIT: number                                            =  10;
export const TAIL_TYPE_HARPY: number                                             =  11;
export const TAIL_TYPE_KANGAROO: number                                          =  12;
export const TAIL_TYPE_FOX: number                                               =  13;
export const TAIL_TYPE_DRACONIC: number                                          =  14;
export const TAIL_TYPE_RACCOON: number                                           =  15;
export const TAIL_TYPE_MOUSE: number                                             =  16;
export const TAIL_TYPE_FERRET: number                                            =  17;

//breast size
export const BREAST_CUP_FLAT: number												=   0;
export const BREAST_CUP_A: number												=   1;
export const BREAST_CUP_B: number												=   2;
export const BREAST_CUP_C: number												=   3;
export const BREAST_CUP_D: number												=   4;
export const BREAST_CUP_DD: number												=   5;
export const BREAST_CUP_DD_BIG: number											=   6;
export const BREAST_CUP_E: number												=   7;
export const BREAST_CUP_E_BIG: number											=   8;
export const BREAST_CUP_EE: number												=   9;
export const BREAST_CUP_EE_BIG: number											=  10;
export const BREAST_CUP_F: number												=  11;
export const BREAST_CUP_F_BIG: number											=  12;
export const BREAST_CUP_FF: number												=  13;
export const BREAST_CUP_FF_BIG: number											=  14;
export const BREAST_CUP_G: number												=  15;
export const BREAST_CUP_G_BIG: number											=  16;
export const BREAST_CUP_GG: number												=  17;
export const BREAST_CUP_GG_BIG: number											=  18;
export const BREAST_CUP_H: number												=  19;
export const BREAST_CUP_H_BIG: number											=  20;
export const BREAST_CUP_HH: number												=  21;
export const BREAST_CUP_HH_BIG: number											=  22;
export const BREAST_CUP_HHH: number												=  23;
export const BREAST_CUP_I: number												=  24;
export const BREAST_CUP_I_BIG: number											=  25;
export const BREAST_CUP_II: number												=  26;
export const BREAST_CUP_II_BIG: number											=  27;
export const BREAST_CUP_J: number												=  28;
export const BREAST_CUP_J_BIG: number											=  29;
export const BREAST_CUP_JJ: number												=  30;
export const BREAST_CUP_JJ_BIG: number											=  31;
export const BREAST_CUP_K: number												=  32;
export const BREAST_CUP_K_BIG: number											=  33;
export const BREAST_CUP_KK: number												=  34;
export const BREAST_CUP_KK_BIG: number											=  35;
export const BREAST_CUP_L: number												=  36;
export const BREAST_CUP_L_BIG: number											=  37;
export const BREAST_CUP_LL: number												=  38;
export const BREAST_CUP_LL_BIG: number											=  39;
export const BREAST_CUP_M: number												=  40;
export const BREAST_CUP_M_BIG: number											=  41;
export const BREAST_CUP_MM: number												=  42;
export const BREAST_CUP_MM_BIG: number											=  43;
export const BREAST_CUP_MMM: number												=  44;
export const BREAST_CUP_MMM_LARGE: number										=  45;
export const BREAST_CUP_N: number												=  46;
export const BREAST_CUP_N_LARGE: number											=  47;
export const BREAST_CUP_NN: number												=  48;
export const BREAST_CUP_NN_LARGE: number											=  49;
export const BREAST_CUP_O: number												=  50;
export const BREAST_CUP_O_LARGE: number											=  51;
export const BREAST_CUP_OO: number												=  52;
export const BREAST_CUP_OO_LARGE: number											=  53;
export const BREAST_CUP_P: number												=  54;
export const BREAST_CUP_P_LARGE: number											=  55;
export const BREAST_CUP_PP: number												=  56;
export const BREAST_CUP_PP_LARGE: number											=  57;
export const BREAST_CUP_Q: number												=  58;
export const BREAST_CUP_Q_LARGE: number											=  59;
export const BREAST_CUP_QQ: number												=  60;
export const BREAST_CUP_QQ_LARGE: number											=  61;
export const BREAST_CUP_R: number												=  62;
export const BREAST_CUP_R_LARGE: number											=  63;
export const BREAST_CUP_RR: number												=  64;
export const BREAST_CUP_RR_LARGE: number											=  65;
export const BREAST_CUP_S: number												=  66;
export const BREAST_CUP_S_LARGE: number											=  67;
export const BREAST_CUP_SS: number												=  68;
export const BREAST_CUP_SS_LARGE: number											=  69;
export const BREAST_CUP_T: number												=  70;
export const BREAST_CUP_T_LARGE: number											=  71;
export const BREAST_CUP_TT: number												=  72;
export const BREAST_CUP_TT_LARGE: number											=  73;
export const BREAST_CUP_U: number												=  74;
export const BREAST_CUP_U_LARGE: number											=  75;
export const BREAST_CUP_UU: number												=  76;
export const BREAST_CUP_UU_LARGE: number											=  77;
export const BREAST_CUP_V: number												=  78;
export const BREAST_CUP_V_LARGE: number											=  79;
export const BREAST_CUP_VV: number												=  80;
export const BREAST_CUP_VV_LARGE: number											=  81;
export const BREAST_CUP_W: number												=  82;
export const BREAST_CUP_W_LARGE: number											=  83;
export const BREAST_CUP_WW: number												=  84;
export const BREAST_CUP_WW_LARGE: number											=  85;
export const BREAST_CUP_X: number												=  86;
export const BREAST_CUP_X_LARGE: number											=  87;
export const BREAST_CUP_XX: number												=  88;
export const BREAST_CUP_XX_LARGE: number											=  89;
export const BREAST_CUP_Y: number												=  90;
export const BREAST_CUP_Y_LARGE: number											=  91;
export const BREAST_CUP_YY: number												=  92;
export const BREAST_CUP_YY_LARGE: number											=  93;
export const BREAST_CUP_Z: number												=  94;
export const BREAST_CUP_Z_LARGE: number											=  95;
export const BREAST_CUP_ZZ: number												=  96;
export const BREAST_CUP_ZZ_LARGE: number											=  97;
export const BREAST_CUP_ZZZ: number												=  98;
export const BREAST_CUP_ZZZ_LARGE: number										=  99;

// wingType
export const WING_TYPE_NONE: number                                              =   0;
export const WING_TYPE_BEE_LIKE_SMALL: number                                    =   1;
export const WING_TYPE_BEE_LIKE_LARGE: number                                    =   2;
export const WING_TYPE_HARPY: number                                             =   4;
export const WING_TYPE_IMP: number                                               =   5;
export const WING_TYPE_BAT_LIKE_TINY: number                                     =   6;
export const WING_TYPE_BAT_LIKE_LARGE: number                                    =   7;
export const WING_TYPE_SHARK_FIN: number                                         =   8;
export const WING_TYPE_FEATHERED_LARGE: number                                   =   9;
export const WING_TYPE_DRACONIC_SMALL: number                                    =  10;
export const WING_TYPE_DRACONIC_LARGE: number                                    =  11;
export const WING_TYPE_GIANT_DRAGONFLY: number                                   =  12;

// lowerBody
export const LOWER_BODY_TYPE_HUMAN: number                                       =   0;
export const LOWER_BODY_TYPE_HOOFED: number                                      =   1;
export const LOWER_BODY_TYPE_DOG: number                                         =   2;
export const LOWER_BODY_TYPE_NAGA: number                                        =   3;
export const LOWER_BODY_TYPE_CENTAUR: number                                     =   4;
export const LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS: number                          =   5;
export const LOWER_BODY_TYPE_DEMONIC_CLAWS: number                               =   6;
export const LOWER_BODY_TYPE_BEE: number                                         =   7;
export const LOWER_BODY_TYPE_GOO: number                                         =   8;
export const LOWER_BODY_TYPE_CAT: number                                         =   9;
export const LOWER_BODY_TYPE_LIZARD: number                                      =  10;
export const LOWER_BODY_TYPE_PONY: number                                        =  11;
export const LOWER_BODY_TYPE_BUNNY: number                                       =  12;
export const LOWER_BODY_TYPE_HARPY: number                                       =  13;
export const LOWER_BODY_TYPE_KANGAROO: number                                    =  14;
export const LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS: number                       =  15;
export const LOWER_BODY_TYPE_DRIDER_LOWER_BODY: number                           =  16;
export const LOWER_BODY_TYPE_FOX: number                                         =  17;
export const LOWER_BODY_TYPE_DRAGON: number                                      =  18;
export const LOWER_BODY_TYPE_RACCOON: number                                     =  19;
export const LOWER_BODY_FERRET: number                                           =  20;

// piercingtypesNOPEDISABLED
export const PIERCING_TYPE_NONE: number                                          =   0;
export const PIERCING_TYPE_STUD: number                                          =   1;
export const PIERCING_TYPE_RING: number                                          =   2;
export const PIERCING_TYPE_LADDER: number                                        =   3;
export const PIERCING_TYPE_HOOP: number                                          =   4;
export const PIERCING_TYPE_CHAIN: number                                         =   5;

// vaginatypesNOPEDISABLED
export const VAGINA_TYPE_HUMAN: number                                           =   0;
export const VAGINA_TYPE_BLACK_SAND_TRAP: number                                 =   5;

// vaginalWetness
export const VAGINA_WETNESS_DRY: number                                          =   0;
export const VAGINA_WETNESS_NORMAL: number                                       =   1;
export const VAGINA_WETNESS_WET: number                                          =   2;
export const VAGINA_WETNESS_SLICK: number                                        =   3;
export const VAGINA_WETNESS_DROOLING: number                                     =   4;
export const VAGINA_WETNESS_SLAVERING: number                                    =   5;

// vaginalLooseness
export const VAGINA_LOOSENESS_TIGHT: number                                      =   0;
export const VAGINA_LOOSENESS_NORMAL: number                                     =   1;
export const VAGINA_LOOSENESS_LOOSE: number                                      =   2;
export const VAGINA_LOOSENESS_GAPING: number                                     =   3;
export const VAGINA_LOOSENESS_GAPING_WIDE: number                                =   4;
export const VAGINA_LOOSENESS_LEVEL_CLOWN_CAR: number                            =   5;

// analwetnesslevelsNOPEDISABLED
export const ANAL_WETNESS_DRY: number                                            =   0;
export const ANAL_WETNESS_NORMAL: number                                         =   1;
export const ANAL_WETNESS_MOIST: number                                          =   2;
export const ANAL_WETNESS_SLIMY: number                                          =   3;
export const ANAL_WETNESS_DROOLING: number                                       =   4;
export const ANAL_WETNESS_SLIME_DROOLING: number                                 =   5;

// analloosenesslevelsNOPEDISABLED
export const ANAL_LOOSENESS_VIRGIN: number                                       =   0;
export const ANAL_LOOSENESS_TIGHT: number                                        =   1;
export const ANAL_LOOSENESS_NORMAL: number                                       =   2;
export const ANAL_LOOSENESS_LOOSE: number                                        =   3;
export const ANAL_LOOSENESS_STRETCHED: number                                    =   4;
export const ANAL_LOOSENESS_GAPING: number                                       =   5;

// hipRating
export const HIP_RATING_BOYISH: number                                           =   0;
export const HIP_RATING_SLENDER: number                                          =   2;
export const HIP_RATING_AVERAGE: number                                          =   4;
export const HIP_RATING_AMPLE: number                                            =   6;
export const HIP_RATING_CURVY: number                                            =  10;
export const HIP_RATING_FERTILE: number                                          =  15;
export const HIP_RATING_INHUMANLY_WIDE: number                                   =  20;

// buttRating
export const BUTT_RATING_BUTTLESS: number                                        =   0;
export const BUTT_RATING_TIGHT: number                                           =   2;
export const BUTT_RATING_AVERAGE: number                                         =   4;
export const BUTT_RATING_NOTICEABLE: number                                      =   6;
export const BUTT_RATING_LARGE: number                                           =   8;
export const BUTT_RATING_JIGGLY: number                                          =  10;
export const BUTT_RATING_EXPANSIVE: number                                       =  13;
export const BUTT_RATING_HUGE: number                                            =  16;
export const BUTT_RATING_INCONCEIVABLY_BIG: number                               =  20;

// End Description constants
