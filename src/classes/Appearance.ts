import { Utils } from "./internals/Utils";
import { Creature } from "./Creature";
import { Character } from "./Character";
import { CoC_Settings } from "./CoC_Settings";
import { StatusAffects } from "./StatusAffects";
import { CockTypesEnum, CockTypesGroup } from "./CockTypesEnum";
import { CoC } from "./CoC";
import { trace } from "../console";
import {
    ANAL_WETNESS_DRY,
    ANAL_WETNESS_NORMAL,
    ANAL_WETNESS_MOIST,
    ANAL_WETNESS_SLIMY,
    ANAL_WETNESS_DROOLING,
    ANAL_WETNESS_SLIME_DROOLING,
    ANAL_LOOSENESS_VIRGIN,
    ANAL_LOOSENESS_TIGHT,
    ANAL_LOOSENESS_NORMAL,
    ANAL_LOOSENESS_LOOSE,
    ANAL_LOOSENESS_STRETCHED,
    ANAL_LOOSENESS_GAPING,
    GENDER_NONE,
    GENDER_MALE,
    GENDER_FEMALE,
    GENDER_HERM,
    SKIN_TYPE_PLAIN,
    SKIN_TYPE_FUR,
    SKIN_TYPE_SCALES,
    SKIN_TYPE_GOO,
    SKIN_TYPE_UNDEFINED,
    HAIR_NORMAL,
    HAIR_FEATHER,
    HAIR_GHOST,
    HAIR_GOO,
    HAIR_ANEMONE,
    FACE_HUMAN,
    FACE_HORSE,
    FACE_DOG,
    FACE_COW_MINOTAUR,
    FACE_SHARK_TEETH,
    FACE_SNAKE_FANGS,
    FACE_CAT,
    FACE_LIZARD,
    FACE_BUNNY,
    FACE_KANGAROO,
    FACE_SPIDER_FANGS,
    FACE_FOX,
    FACE_DRAGON,
    FACE_RACCOON_MASK,
    FACE_RACCOON,
    FACE_BUCKTEETH,
    FACE_MOUSE,
    TONUGE_HUMAN,
    TONUGE_SNAKE,
    TONUGE_DEMONIC,
    TONUGE_DRACONIC,
    EYES_HUMAN,
    EYES_FOUR_SPIDER_EYES,
    EYES_BLACK_EYES_SAND_TRAP,
    EARS_HUMAN,
    EARS_HORSE,
    EARS_DOG,
    EARS_COW,
    EARS_ELFIN,
    EARS_CAT,
    EARS_LIZARD,
    EARS_BUNNY,
    EARS_KANGAROO,
    EARS_FOX,
    EARS_DRAGON,
    EARS_RACCOON,
    EARS_MOUSE,
    HORNS_NONE,
    HORNS_DEMON,
    HORNS_COW_MINOTAUR,
    HORNS_DRACONIC_X2,
    HORNS_DRACONIC_X4_12_INCH_LONG,
    HORNS_ANTLERS,
    ANTENNAE_NONE,
    ANTENNAE_BEE,
    ARM_TYPE_HUMAN,
    ARM_TYPE_HARPY,
    ARM_TYPE_SPIDER,
    TAIL_TYPE_NONE,
    TAIL_TYPE_HORSE,
    TAIL_TYPE_DOG,
    TAIL_TYPE_DEMONIC,
    TAIL_TYPE_COW,
    TAIL_TYPE_SPIDER_ADBOMEN,
    TAIL_TYPE_BEE_ABDOMEN,
    TAIL_TYPE_SHARK,
    TAIL_TYPE_CAT,
    TAIL_TYPE_LIZARD,
    TAIL_TYPE_RABBIT,
    TAIL_TYPE_HARPY,
    TAIL_TYPE_KANGAROO,
    TAIL_TYPE_FOX,
    TAIL_TYPE_DRACONIC,
    TAIL_TYPE_RACCOON,
    TAIL_TYPE_MOUSE,
    WING_TYPE_NONE,
    WING_TYPE_BEE_LIKE_SMALL,
    WING_TYPE_BEE_LIKE_LARGE,
    WING_TYPE_HARPY,
    WING_TYPE_IMP,
    WING_TYPE_BAT_LIKE_TINY,
    WING_TYPE_BAT_LIKE_LARGE,
    WING_TYPE_SHARK_FIN,
    WING_TYPE_FEATHERED_LARGE,
    WING_TYPE_DRACONIC_SMALL,
    WING_TYPE_DRACONIC_LARGE,
    WING_TYPE_GIANT_DRAGONFLY,
    LOWER_BODY_TYPE_HUMAN,
    LOWER_BODY_TYPE_HOOFED,
    LOWER_BODY_TYPE_DOG,
    LOWER_BODY_TYPE_NAGA,
    LOWER_BODY_TYPE_CENTAUR,
    LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS,
    LOWER_BODY_TYPE_DEMONIC_CLAWS,
    LOWER_BODY_TYPE_BEE,
    LOWER_BODY_TYPE_GOO,
    LOWER_BODY_TYPE_CAT,
    LOWER_BODY_TYPE_LIZARD,
    LOWER_BODY_TYPE_PONY,
    LOWER_BODY_TYPE_BUNNY,
    LOWER_BODY_TYPE_HARPY,
    LOWER_BODY_TYPE_KANGAROO,
    LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS,
    LOWER_BODY_TYPE_DRIDER_LOWER_BODY,
    LOWER_BODY_TYPE_FOX,
    LOWER_BODY_TYPE_DRAGON,
    LOWER_BODY_TYPE_RACCOON,
    PIERCING_TYPE_NONE,
    PIERCING_TYPE_STUD,
    PIERCING_TYPE_RING,
    PIERCING_TYPE_LADDER,
    PIERCING_TYPE_HOOP,
    PIERCING_TYPE_CHAIN,
    VAGINA_TYPE_HUMAN,
    VAGINA_TYPE_BLACK_SAND_TRAP,
    VAGINA_WETNESS_DRY,
    VAGINA_WETNESS_NORMAL,
    VAGINA_WETNESS_WET,
    VAGINA_WETNESS_SLICK,
    VAGINA_WETNESS_DROOLING,
    VAGINA_WETNESS_SLAVERING,
    VAGINA_LOOSENESS_TIGHT,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_LOOSENESS_LOOSE,
    VAGINA_LOOSENESS_GAPING,
    VAGINA_LOOSENESS_GAPING_WIDE,
    VAGINA_LOOSENESS_LEVEL_CLOWN_CAR,
    HIP_RATING_BOYISH,
    HIP_RATING_SLENDER,
    HIP_RATING_AVERAGE,
    HIP_RATING_AMPLE,
    HIP_RATING_CURVY,
    HIP_RATING_FERTILE,
    HIP_RATING_INHUMANLY_WIDE,
    BUTT_RATING_BUTTLESS,
    BUTT_RATING_TIGHT,
    BUTT_RATING_AVERAGE,
    BUTT_RATING_NOTICEABLE,
    BUTT_RATING_LARGE,
    BUTT_RATING_JIGGLY,
    BUTT_RATING_EXPANSIVE,
    BUTT_RATING_HUGE,
    BUTT_RATING_INCONCEIVABLY_BIG,
} from "../includes/appearanceDefs";

export class Appearance extends Utils {
    // Eventually, this should contain the entire char appearance.
    // At the moment, it's pretty piecemeal.
    // TODO remove when we have proper enums for this
    // include "../../includes/appearanceDefs.as";

    public static inverseMap(x: Record<string, any>): Record<string, any> {
        var result: Record<string, any> = {};
        for (var i of Object.keys(x)) {
            result[String(x[i])] = i;
        }
        return result;
    }

    public static hairOrFur(i_creature: Creature): string {
        if (i_creature.skinType == 1) return "fur";
        else return "hair";
    }

    public static hairDescription(i_creature: Creature): string {
        var description: string = "";
        var options: any[];
        //
        // LENGTH ADJECTIVE!
        //
        if (i_creature.hairLength == 0) {
            options = ["shaved", "bald", "smooth", "hairless", "glabrous"];
            description = Appearance.randomChoice(options) + " head";
            return description;
        }
        if (i_creature.hairLength < 1) {
            options = ["close-cropped, ", "trim, ", "very short, "];
            description += Appearance.randomChoice(options);
        }
        if (i_creature.hairLength >= 1 && i_creature.hairLength < 3) description += "short, ";
        if (i_creature.hairLength >= 3 && i_creature.hairLength < 6) description += "shaggy, ";
        if (i_creature.hairLength >= 6 && i_creature.hairLength < 10)
            description += "moderately long, ";
        if (i_creature.hairLength >= 10 && i_creature.hairLength < 16) {
            if (Appearance.rand(2) == 0) description += "long, ";
            else description += "shoulder-length, ";
        }
        if (i_creature.hairLength >= 16 && i_creature.hairLength < 26) {
            if (Appearance.rand(2) == 0) description += "very long, ";
            else description += "flowing locks of ";
        }
        if (i_creature.hairLength >= 26 && i_creature.hairLength < 40)
            description += "ass-length, ";
        if (i_creature.hairLength >= 40 && i_creature.hairLength < i_creature.tallness)
            description += "obscenely long, ";
        else if (i_creature.hairLength >= i_creature.tallness) {
            if (Appearance.rand(2) == 0) description += "floor-length, ";
            else description += "floor-dragging, ";
        }
        //
        // COLORS
        //
        description += i_creature.hairColor + " ";
        //
        // HAIR WORDS
        //
        //If furry and longish hair sometimes call it a mane (50%)
        if (i_creature.skinType == 1 && i_creature.hairLength > 3 && Appearance.rand(2) == 0) {
            if (i_creature.hairType == 1) description += "feather-";
            else if (i_creature.hairType == 2) description += "transparent ";
            else if (i_creature.hairType == 3) description += "goo-";
            else if (i_creature.hairType == 4) description += "tentacle-";
            description += "mane";
            return description;
        }
        //if medium length refer to as locks sometimes
        //CUT - locks is plural and screws up tense.
        /*if(creature.hairLength >= 3 && creature.hairLength < 16 && rand(2) == 0) {
         descript += "locks of hair";
         return descript;
         }*/
        //If nothing else used, use hair!
        if (i_creature.hairType == 1) description += "feather-";
        else if (i_creature.hairType == 2) description += "transparent ";
        else if (i_creature.hairType == 3) description += "goo-";
        else if (i_creature.hairType == 4) description += "tentacle-";
        description += "hair";

        return description;
    }

    /**
     * Describe tongue. Monsters don't have tongues, apparently.
     * @param    i_character Either Player or NonPlayer
     * @return    A beautiful description of a tongue.
     */
    public static tongueDescription(i_character: Character): string {
        if (i_character.tongueType == 1) return "serpentine tongue";
        else if (i_character.tongueType == 2) return "demonic tongue";
        else if (i_character.tongueType == 3) return "draconic tongue";
        else return "tongue";
    }

    public static nippleDescription(i_creature: Creature, i_rowNum: number): string {
        //DEBUG SHIT!
        if (i_rowNum > i_creature.breastRows.length - 1) {
            CoC_Settings.error(
                "<B>Error: Invalid breastRows (" + i_rowNum + ") passed to nippleDescription()</b>"
            );
            return (
                "<B>Error: Invalid breastRows (" + i_rowNum + ") passed to nippleDescription()</b>"
            );
        }
        if (i_rowNum < 0) {
            CoC_Settings.error(
                "<B>Error: Invalid breastRows (" + i_rowNum + ") passed to nippleDescription()</b>"
            );
            return (
                "<B>Error: Invalid breastRows (" + i_rowNum + ") passed to nippleDescription()</b>"
            );
        }
        var haveDescription: boolean = false;
        var description: string = "";
        var options: any[];
        // var rando: number = 0;
        //Size descriptors 33% chance
        if (Appearance.rand(4) == 0) {
            //TINAHHHH
            if (i_creature.nippleLength < 0.25) {
                options = ["tiny ", "itty-bitty ", "teeny-tiny ", "dainty "];
                description += Appearance.randomChoice(options);
            }
            //Prominant
            if (i_creature.nippleLength >= 0.4 && i_creature.nippleLength < 1) {
                options = [
                    "prominent ",
                    "pencil eraser-sized ",
                    "eye-catching ",
                    "pronounced ",
                    "striking ",
                ];
                description += Appearance.randomChoice(options);
            }
            //Big 'uns
            if (i_creature.nippleLength >= 1 && i_creature.nippleLength < 2) {
                options = ["forwards-jutting ", "over-sized ", "fleshy ", "large protruding "];
                description += Appearance.randomChoice(options);
            }
            //'Uge
            if (i_creature.nippleLength >= 2 && i_creature.nippleLength < 3.2) {
                options = ["elongated ", "massive ", "awkward ", "lavish ", "hefty "];
                description += Appearance.randomChoice(options);
            }
            //Massive
            if (i_creature.nippleLength >= 3.2) {
                options = ["bulky ", "ponderous ", "thumb-sized ", "cock-sized ", "cow-like "];
                description += Appearance.randomChoice(options);
            }
            haveDescription = true;
        }
        //Milkiness/Arousal/Wetness Descriptors 33% of the time
        if (Appearance.rand(3) == 0 && !haveDescription) {
            //Fuckable chance first!
            if (i_creature.hasFuckableNipples()) {
                //Fuckable and lactating?
                if (i_creature.biggestLactation() > 1) {
                    options = [
                        "milk-lubricated ",
                        "lactating ",
                        "lactating ",
                        "milk-slicked ",
                        "milky ",
                    ];
                    description += Appearance.randomChoice(options);
                }
                //Just fuckable
                else {
                    options = [
                        "wet ",
                        "mutated ",
                        "slimy ",
                        "damp ",
                        "moist ",
                        "slippery ",
                        "oozing ",
                        "sloppy ",
                        "dewy ",
                    ];
                    description += Appearance.randomChoice(options);
                }
                haveDescription = true;
            }
            //Just lactating!
            else if (i_creature.biggestLactation() > 0) {
                //Light lactation
                if (i_creature.biggestLactation() <= 1) {
                    options = ["milk moistened ", "slightly lactating ", "milk-dampened "];
                    description += Appearance.randomChoice(options);
                }
                //Moderate lactation
                if (i_creature.biggestLactation() > 1 && i_creature.biggestLactation() <= 2) {
                    options = ["lactating ", "milky ", "milk-seeping "];
                    description += Appearance.randomChoice(options);
                }
                //Heavy lactation
                if (i_creature.biggestLactation() > 2) {
                    options = ["dripping ", "dribbling ", "milk-leaking ", "drooling "];
                    description += Appearance.randomChoice(options);
                }
                haveDescription = true;
            }
        }
        //Possible arousal descriptors
        else if (Appearance.rand(3) == 0 && !haveDescription) {
            if (i_creature.lust > 50 && i_creature.lust < 75) {
                options = ["erect ", "perky ", "erect ", "firm ", "tender "];
                description += Appearance.randomChoice(options);
                haveDescription = true;
            }
            if (i_creature.lust >= 75) {
                options = ["throbbing ", "trembling ", "needy ", "throbbing "];
                description += Appearance.randomChoice(options);
                haveDescription = true;
            }
        }
        if (
            !haveDescription &&
            Appearance.rand(2) == 0 &&
            i_creature.nipplesPierced > 0 &&
            i_rowNum == 0
        ) {
            if (i_creature.nipplesPierced == 5) description += "chained ";
            else description += "pierced ";
            haveDescription = true;
        }
        if (!haveDescription && i_creature.skinType == 3) {
            options = ["slime-slick ", "goopy ", "slippery "];
            description += Appearance.randomChoice(options);
        }
        if (!haveDescription && i_creature.findStatusAffect(StatusAffects.BlackNipples) >= 0) {
            options = ["black ", "ebony ", "sable "];
            description += Appearance.randomChoice(options);
        }

        //Nounsssssssss*BOOM*
        var choice: number = 0;
        choice = Appearance.rand(5);
        if (choice == 0) description += "nipple";
        if (choice == 1) {
            if (i_creature.nippleLength < 0.5) description += "perky nipple";
            else description += "cherry-like nub";
        }
        if (choice == 2) {
            if (i_creature.hasFuckableNipples()) description += "fuckable nip";
            else {
                if (i_creature.biggestLactation() >= 1 && i_creature.nippleLength >= 1)
                    description += "teat";
                else description += "nipple";
            }
        }
        if (choice == 3) {
            if (i_creature.hasFuckableNipples()) description += "nipple-hole";
            else {
                if (i_creature.biggestLactation() >= 1 && i_creature.nippleLength >= 1)
                    description += "teat";
                else description += "nipple";
            }
        }
        if (choice == 4) {
            if (i_creature.hasFuckableNipples()) description += "nipple-cunt";
            else description += "nipple";
        }
        return description;
        /*OLD
         if(creature.breastRows[rowNum].lactationMultiplier >= 1.5 && creature.breastRows[rowNum].lactationMultiplier < 1.75) {
         if(creature.breastRows[rowNum].milkFullness > 75) return "over-full leaking teat";
         if(rand(2) == 0) return "milky teat";
         else return "milk spout";
         }
         if(creature.breastRows[rowNum].lactationMultiplier >= 1.75) {
         if(creature.breastRows[rowNum].milkFullness > 75) return "over-full leaking teat";
         if(rand(2) == 0) return "milk-drooling teat";
         else return "drippy cow-teat";
         }
         if(creature.lust > 75) {
         if(rand(2) == 0) return "painfully hard nipple";
         else return "over-stimulated nipple";
         }
         if(creature.lust > 50) {
         if(rand(2) == 0) return "erect nipple";
         else return "hard nipple";
         }
         if(creature.breastRows[rowNum].milkFullness > 75) return "milky over-full nipple";
         return "nipple";
         */
    }

    public static hipDescription(i_character: Character): string {
        var description: string = "";
        var options: any[];
        if (i_character.hipRating <= 1) {
            options = ["tiny ", "narrow ", "boyish "];
            description = Appearance.randomChoice(options);
        } else if (i_character.hipRating > 1 && i_character.hipRating < 4) {
            options = ["slender ", "narrow ", "thin "];
            description = Appearance.randomChoice(options);
            if (i_character.thickness < 30) {
                if (Appearance.rand(2) == 0) description = "slightly-flared ";
                else description = "curved ";
            }
        } else if (i_character.hipRating >= 4 && i_character.hipRating < 6) {
            options = ["well-formed ", "pleasant "];
            description = Appearance.randomChoice(options);
            if (i_character.thickness < 30) {
                if (Appearance.rand(2) == 0) description = "flared ";
                else description = "curvy ";
            }
        } else if (i_character.hipRating >= 6 && i_character.hipRating < 10) {
            options = ["ample ", "noticeable ", "girly "];
            description = Appearance.randomChoice(options);
            if (i_character.thickness < 30) {
                if (Appearance.rand(2) == 0) description = "flared ";
                else description = "waspish ";
            }
        } else if (i_character.hipRating >= 10 && i_character.hipRating < 15) {
            options = ["flared ", "curvy ", "wide "];
            description = Appearance.randomChoice(options);
            if (i_character.thickness < 30) {
                if (Appearance.rand(2) == 0) description = "flared ";
                else description = "waspish ";
            }
        } else if (i_character.hipRating >= 15 && i_character.hipRating < 20) {
            if (i_character.thickness < 40) {
                if (Appearance.rand(2) == 0) description = "flared, ";
                else description = "waspish, ";
            }
            options = ["fertile ", "child-bearing ", "voluptuous "];
            description += Appearance.randomChoice(options);
        } else if (i_character.hipRating >= 20) {
            if (i_character.thickness < 40) {
                if (Appearance.rand(2) == 0) description = "flaring, ";
                else description = "incredibly waspish, ";
            }
            options = ["broodmother-sized ", "cow-like ", "inhumanly-wide "];
            description += Appearance.randomChoice(options);
        }
        //Taurs
        if (i_character.isTaur() && Appearance.rand(3) == 0) description += "flanks";
        //Nagas have sides, right?
        else if (i_character.isNaga() && Appearance.rand(3) == 0) description += "sides";
        //Non taurs or taurs who didn't roll flanks
        else {
            options = ["hips", "thighs"];
            description += Appearance.randomChoice(options);
        }

        return description;
    }

    /* This special version was only called from Creature.cockMultiLDescriptionShort, and then only if the creature had just one cock.
        The cock index of 99 was never used, so the extra cock names at the end of the function were never seen as output.
        Replaced with a call to the more common cockDesript function.
            public static  cockDescription(i_creature:Creature, i_cockIndex: number): string
            {
                if (i_creature.totalCocks() == 0) {
                    CoC_Settings.error("<b>ERROR: CockDescript Called But No Cock Present</b>");
                    return "<b>ERROR: CockDescript Called But No Cock Present</b>";
                }
                if (i_creature.totalCocks() <= i_cockIndex || (i_cockIndex == 99 || i_cockIndex == -1)) {
                    CoC_Settings.error("<b>ERROR: CockDescript called with index of " + i_cockIndex + " - out of BOUNDS</b>");
                    return "<b>ERROR: CockDescript called with index of " + i_cockIndex + " - out of BOUNDS</b>";
                }

                //Cocknum 99 to default to boring descriptions!
                if (i_cockIndex != 99) {
                    switch (i_creature.cocks[i_cockIndex].cockType) {
                        case CockTypesEnum.ANEMONE:
                        case CockTypesEnum.BEE:
                        case CockTypesEnum.CAT:
                        case CockTypesEnum.DEMON:
                        case CockTypesEnum.DISPLACER:
                        case CockTypesEnum.DOG:
                        case CockTypesEnum.DRAGON:
                        case CockTypesEnum.FOX:
                        case CockTypesEnum.HORSE:
                        case CockTypesEnum.HUMAN:
                        case CockTypesEnum.KANGAROO:
                        case CockTypesEnum.LIZARD:
                        case CockTypesEnum.TENTACLE:
                            return cockNoun(i_creature.cocks[i_cockIndex].cockType);
                        default:
                            CoC_Settings.error("cockDescription failed to describe your cock");
                            trace("ERROR: Cock type failed to match. " + i_creature.cocks[i_cockIndex].cockType);
                            return "cockDescription failed to describe your cock";
                    }
                }
                i_cockIndex = 0; //I'm pretty sure this 99 business never gets used anywhere in the code, so this whole lower part of the function is probably orphaned code.

            var  description: string = "";
            var  options: any[];

                //50% of the time add a descriptor
                if (rand(2) == 0)
                    description += i_creature.cockAdjective(i_cockIndex) + " ";
            var  rando: number = 0;
                options = ["cock",
                    "prick",
                    "pecker",
                    "shaft",
                    "dick",
                    "manhood",
                    "member",
                    "meatstick",
                    "schlong",
                    "wang",
                    "fuckpole",
                    "package",
                    "love muscle",
                    "rod",
                    "anaconda"];
                description += randomChoice(options);

                return description;
            }
    */

    public static cockDescript(creature: Creature, cockIndex: number = 0): string {
        if (creature.cocks.length == 0)
            return "<b>ERROR: CockDescript Called But No Cock Present</b>";
        var cockType: CockTypesEnum = CockTypesEnum.HUMAN;
        if (cockIndex != 99) {
            //CockIndex 99 forces a human cock description
            if (creature.cocks.length <= cockIndex)
                return (
                    "<b>ERROR: CockDescript called with index of " +
                    cockIndex +
                    " - out of BOUNDS</b>"
                );
            cockType = creature.cocks[cockIndex].cockType;
        }
        var isPierced: boolean = creature.cocks.length == 1 && creature.cocks[cockIndex].isPierced; //Only describe as pierced or sock covered if the creature has just one cock
        var hasSock: boolean = creature.cocks.length == 1 && creature.cocks[cockIndex].sock != "";
        var isGooey: boolean = creature.skinType == CoC.SKIN_TYPE_GOO;
        return Appearance.cockDescription(
            cockType,
            creature.cocks[cockIndex].cockLength,
            creature.cocks[cockIndex].cockThickness,
            creature.lust,
            creature.cumQ(),
            isPierced,
            hasSock,
            isGooey
        );
    }

    //This function takes all the variables independently so that a creature object is not required for a cockDescription.
    //This allows a single cockDescription function to produce output for both cockDescript and the old NPCCockDescript.
    public static cockDescription(
        cockType: CockTypesEnum,
        length: number,
        girth: number,
        lust: number = 50,
        cumQ: number = 10,
        isPierced: boolean = false,
        hasSock: boolean = false,
        isGooey: boolean = false
    ): string {
        if (Appearance.rand(2) == 0) {
            if (cockType == CockTypesEnum.HUMAN)
                return (
                    Appearance.cockAdjective(
                        cockType,
                        length,
                        girth,
                        lust,
                        cumQ,
                        isPierced,
                        hasSock,
                        isGooey
                    ) +
                    " " +
                    Appearance.cockNoun(cockType)
                );
            else
                return (
                    Appearance.cockAdjective(
                        cockType,
                        length,
                        girth,
                        lust,
                        cumQ,
                        isPierced,
                        hasSock,
                        isGooey
                    ) +
                    ", " +
                    Appearance.cockNoun(cockType)
                );
        }
        return Appearance.cockNoun(cockType);
    }

    public static cockNoun(cockType: CockTypesEnum): string {
        /*
        if (cockType is int) {
            trace("Someone is still calling cockNoun with an integer cock type");
            trace("Fix this shit already, dammit!")
            cockType = CockTypesEnum.ParseConstantByIndex(cockType);
        }
        */
        if (cockType == CockTypesEnum.HUMAN) {
            // Yeah, this is kind of messy
            // there is no other easy way to preserve the weighting fenoxo did
            return Appearance.randomChoice(
                "cock",
                "cock",
                "cock",
                "cock",
                "cock",
                "prick",
                "prick",
                "pecker",
                "shaft",
                "shaft",
                "shaft"
            );
        } else if (cockType == CockTypesEnum.BEE) {
            return Appearance.randomChoice(
                "bee prick",
                "bee prick",
                "bee prick",
                "bee prick",
                "insectoid cock",
                "insectoid cock",
                "furred monster"
            );
        } else if (cockType == CockTypesEnum.DOG) {
            return Appearance.randomChoice(
                "dog-shaped dong",
                "canine shaft",
                "pointed prick",
                "knotty dog-shaft",
                "bestial cock",
                "animalistic puppy-pecker",
                "pointed dog-dick",
                "pointed shaft",
                "canine member",
                "canine cock",
                "knotted dog-cock"
            );
        } else if (cockType == CockTypesEnum.FOX) {
            return Appearance.randomChoice(
                "fox-shaped dong",
                "vulpine shaft",
                "pointed prick",
                "knotty fox-shaft",
                "bestial cock",
                "animalistic vixen-pricker",
                "pointed fox-dick",
                "pointed shaft",
                "vulpine member",
                "vulpine cock",
                "knotted fox-cock"
            );
        } else if (cockType == CockTypesEnum.HORSE) {
            return Appearance.randomChoice(
                "flared horse-cock",
                "equine prick",
                "bestial horse-shaft",
                "flat-tipped horse-member",
                "animalistic stallion-prick",
                "equine dong",
                "beast cock",
                "flared stallion-cock"
            );
        } else if (cockType == CockTypesEnum.DEMON) {
            return Appearance.randomChoice(
                "nub-covered demon-dick",
                "nubby shaft",
                "corrupted cock",
                "perverse pecker",
                "bumpy demon-dick",
                "demonic cock",
                "demonic dong",
                "cursed cock",
                "infernal prick",
                "unholy cock",
                "blighted cock"
            );
        } else if (cockType == CockTypesEnum.TENTACLE) {
            return Appearance.randomChoice(
                "twisting tentacle-prick",
                "wriggling plant-shaft",
                "sinuous tentacle-cock",
                "squirming cock-tendril",
                "writhing tentacle-pecker",
                "wriggling plant-prick",
                "penile flora",
                "smooth shaft",
                "undulating tentacle-dick",
                "slithering vine-prick",
                "vine-shaped cock"
            );
        } else if (cockType == CockTypesEnum.CAT) {
            return Appearance.randomChoice(
                "feline dick",
                "spined cat-cock",
                "pink kitty-cock",
                "spiny prick",
                "animalistic kitty-prick",
                "oddly-textured cat-penis",
                "feline member",
                "spined shaft",
                "feline shaft",
                "barbed dick",
                "nubby kitten-prick"
            );
        } else if (cockType == CockTypesEnum.LIZARD) {
            return Appearance.randomChoice(
                "reptilian dick",
                "purple cock",
                "inhuman cock",
                "reptilian prick",
                "purple prick",
                "purple member",
                "serpentine member",
                "serpentine shaft",
                "reptilian shaft",
                "bulbous snake-shaft",
                "bulging snake-dick"
            );
        } else if (cockType == CockTypesEnum.ANEMONE) {
            return Appearance.randomChoice(
                "anemone dick",
                "tentacle-ringed cock",
                "blue member",
                "stinger-laden shaft",
                "pulsating prick",
                "anemone prick",
                "stinger-coated member",
                "blue cock",
                "tentacle-ringed dick",
                "near-transparent shaft",
                "squirming shaft"
            );
        } else if (cockType == CockTypesEnum.KANGAROO) {
            return Appearance.randomChoice(
                "kangaroo-like dick",
                "pointed cock",
                "marsupial member",
                "tapered shaft",
                "curved pecker",
                "pointed prick",
                "squirming kangaroo-cock",
                "marsupial cock",
                "tapered kangaroo-dick",
                "curved kangaroo-cock",
                "squirming shaft"
            );
        } else if (cockType == CockTypesEnum.DRAGON) {
            return Appearance.randomChoice(
                "dragon-like dick",
                "segmented shaft",
                "pointed prick",
                "knotted dragon-cock",
                "mythical mast",
                "segmented tool",
                "draconic dick",
                "draconic cock",
                "tapered dick",
                "unusual endowment",
                "scaly shaft"
            );
        } else if (cockType == CockTypesEnum.DISPLACER) {
            return Appearance.randomChoice(
                "coerl cock",
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
                "knotted erection"
            );
        }
        return Appearance.randomChoice("cock", "prick", "pecker", "shaft");
    }

    //New cock adjectives.  The old one sucked dicks
    //This function handles all cockAdjectives. Previously there were separate functions for the player, monsters and NPCs.
    public static cockAdjective(
        cockType: CockTypesEnum,
        length: number,
        girth: number,
        lust: number = 50,
        cumQ: number = 10,
        isPierced: boolean = false,
        hasSock: boolean = false,
        isGooey: boolean = false
    ): string {
        //First, the three possible special cases
        if (isPierced && Appearance.rand(5) == 0) return "pierced";
        if (hasSock && Appearance.rand(5) == 0)
            return Appearance.randomChoice(
                "sock-sheathed",
                "garment-wrapped",
                "smartly dressed",
                "cloth-shrouded",
                "fabric swaddled",
                "covered"
            );
        if (isGooey && Appearance.rand(4) == 0)
            return Appearance.randomChoice("goopey", "gooey", "slimy");
        //Length 1/3 chance
        if (Appearance.rand(3) == 0) {
            if (length < 3)
                return Appearance.randomChoice("little", "toy-sized", "mini", "budding", "tiny");
            if (length < 5) return Appearance.randomChoice("short", "small");
            if (length < 7) return Appearance.randomChoice("fair-sized", "nice");
            if (length < 9) {
                if (cockType == CockTypesEnum.HORSE)
                    return Appearance.randomChoice("sizable", "pony-sized", "colt-like");
                return Appearance.randomChoice("sizable", "long", "lengthy");
            }
            if (length < 13) {
                if (cockType == CockTypesEnum.DOG)
                    return Appearance.randomChoice("huge", "foot-long", "mastiff-like");
                return Appearance.randomChoice("huge", "foot-long", "cucumber-length");
            }
            if (length < 18)
                return Appearance.randomChoice("massive", "knee-length", "forearm-length");
            if (length < 30) return Appearance.randomChoice("enormous", "giant", "arm-like");
            if (cockType == CockTypesEnum.TENTACLE && Appearance.rand(2) == 0) return "coiled";
            return Appearance.randomChoice("towering", "freakish", "monstrous", "massive");
        }
        //Hornyness 1/2
        else if (lust > 75 && Appearance.rand(2) == 0) {
            if (lust > 90) {
                //Uber horny like a baws!
                if (cumQ < 50) return Appearance.randomChoice("throbbing", "pulsating"); //Weak as shit cum
                if (cumQ < 200) return Appearance.randomChoice("dribbling", "leaking", "drooling"); //lots of cum? drippy.
                return Appearance.randomChoice(
                    "very drippy",
                    "pre-gushing",
                    "cum-bubbling",
                    "pre-slicked",
                    "pre-drooling"
                ); //Tons of cum
            } else {
                //A little less lusty, but still lusty.
                if (cumQ < 50)
                    return Appearance.randomChoice(
                        "turgid",
                        "blood-engorged",
                        "rock-hard",
                        "stiff",
                        "eager"
                    ); //Weak as shit cum
                if (cumQ < 200)
                    return Appearance.randomChoice(
                        "turgid",
                        "blood-engorged",
                        "rock-hard",
                        "stiff",
                        "eager",
                        "fluid-beading",
                        "slowly-oozing"
                    ); //A little drippy
                return Appearance.randomChoice("dribbling", "drooling", "fluid-leaking", "leaking"); //uber drippy
            }
        }
        //Girth - fallback
        if (girth <= 0.75) return Appearance.randomChoice("thin", "slender", "narrow");
        if (girth <= 1.2) return "ample";
        if (girth <= 1.4) return Appearance.randomChoice("ample", "big");
        if (girth <= 2) return Appearance.randomChoice("broad", "meaty", "girthy");
        if (girth <= 3.5) return Appearance.randomChoice("fat", "distended", "wide");
        return Appearance.randomChoice("inhumanly distended", "monstrously thick", "bloated");
    }

    /* Old Version
            public static  cockAdjective(i_creature:Creature, i_cockIndex: number = -1): string
            {
            var  description: string = "";
            var  multi: boolean = false;
            var  options: any[];

                //If used for multiple cocks, set multi flag
                if (i_cockIndex < 0) {
                    //Since we have multi dicks lets talk about the biggest!
                    i_cockIndex = i_creature.biggestCockIndex();
                    multi = true;
                }
                //Pierced - 1/5 chance
                if (!multi && rand(5) == 0 && i_creature.cocks[i_cockIndex].pierced > 0) {
                    description += "pierced";
                }
                else if (!multi && rand(5) == 0 && i_creature.cocks[i_cockIndex].sock != "") {
                    options = ["sock-sheathed",
                        "garment-wrapped",
                        "smartly dressed",
                        "cloth-shrouded",
                        "fabric swaddled",
                        "covered"];
                    description += randomChoice(options);
                }
                //Goo - 1/4 chance
                else if (i_creature.skinType == 3 && rand(4) == 0) {
                    options = ["goopey",
                        "gooey",
                        "slimy"];
                    description += randomChoice(options);
                }
                //Length 1/3 chance
                else if (rand(3) == 0) {
                    if (i_creature.cocks[i_cockIndex].cockLength < 3) {
                        options = ["little",
                            "toy-sized",
                            "mini",
                            "budding",
                            "tiny"];
                        description += randomChoice(options);
                    }
                    else if (i_creature.cocks[i_cockIndex].cockLength < 5) {
                        description += randomChoice("short", "small");
                    }
                    else if (i_creature.cocks[i_cockIndex].cockLength < 7) {
                        description += randomChoice("fair-sized", "nice");
                    }
                    else if (i_creature.cocks[i_cockIndex].cockLength < 11) {
                        options = ["sizable"];

                        if (i_creature.cocks[i_cockIndex].cockType == CockTypesEnum.HORSE) {
                            options.push("pony-sized", "colt-like");
                        }
                        else
                            options.push("long", "lengthy");

                        description += randomChoice(options);
                    }
                    else if (i_creature.cocks[i_cockIndex].cockLength < 14) {
                        options = ["huge", "foot-long"];
                        if (i_creature.cocks[i_cockIndex].cockType == CockTypesEnum.DOG)
                            options.push("mastiff-like");
                        else
                            options.push("cucumber-length");
                        description += randomChoice(options);
                    }
                    else if (i_creature.cocks[i_cockIndex].cockLength < 18) {
                        description += randomChoice("massive", "knee-length", "forearm-length");
                    }
                    else if (i_creature.cocks[i_cockIndex].cockLength < 30) {
                        description += randomChoice("enormous", "giant", "arm-like");
                    }
                    else {
                        if (i_creature.cocks[i_cockIndex].cockType == CockTypesEnum.TENTACLE && rand(2) == 0)
                            description += "coiled ";
                        else {
                            options = ["towering",
                                "freakish",
                                "monstrous",
                                "massive"];
                            description += randomChoice(options);
                        }
                    }
                }
                //Hornyness 1/2
                else if (i_creature.lust > 75 && rand(2) == 0) {
                    //Uber horny like a baws!
                    if (i_creature.lust > 90) {
                        //Weak as shit cum
                        if (i_creature.cumQ() < 50) {
                            description += randomChoice("throbbing", "pulsating");
                        }
                        //lots of cum? drippy.
                        else if (i_creature.cumQ() < 200) {
                            description += randomChoice("dribbling", "leaking", "drooling");
                        }
                        //Tons of cum
                        else {
                            description += randomChoice("very drippy", "pre-gushing", "cum-bubbling", "pre-slicked", "pre-drooling");
                        }
                    }
                    //A little less lusty, but still lusty.
                    else if (i_creature.lust > 75) {
                        if (i_creature.cumQ() < 50) {
                            description += randomChoice("turgid", "blood-engorged", "rock-hard", "stiff", "eager");
                        }
                        //A little drippy
                        else if (i_creature.cumQ() < 200) {
                            description += randomChoice("turgid", "blood-engorged", "rock-hard", "stiff", "eager", "fluid-beading", "slowly-oozing");
                        }
                        //uber drippy
                        else {
                            description += randomChoice("dribbling", "drooling", "fluid-leaking", "leaking");
                        }
                    }
                }
                //Girth - fallback
                else {
                    if (i_creature.cocks[i_cockIndex].cockThickness <= .75) {
                        description += randomChoice("thin", "slender", "narrow");
                    }
                    else if (i_creature.cocks[i_cockIndex].cockThickness <= 1.2) {
                        description += "ample";
                    }
                    else if (i_creature.cocks[i_cockIndex].cockThickness <= 1.4) {
                        description += randomChoice("ample", "big");
                    }
                    else if (i_creature.cocks[i_cockIndex].cockThickness <= 2) {
                        description += randomChoice("broad", "meaty", "girthy");
                    }
                    else if (i_creature.cocks[i_cockIndex].cockThickness <= 3.5) {
                        description += randomChoice("fat", "distended", "wide");
                    }
                    else if (i_creature.cocks[i_cockIndex].cockThickness > 3.5) {
                        description += randomChoice("inhumanly distended", "monstrously thick", "bloated");
                    }
                }
                return description;
            }
    */

    //Cock adjectives for single cock
    private static cockAdjectives(
        i_cockLength: number,
        i_cockThickness: number,
        i_cockType: CockTypesEnum,
        i_creature: Creature
    ): string {
        var description: string = "";
        var rando: number = 0;
        var descripts: number = 0;
        //length or thickness, usually length.
        if (Appearance.rand(4) == 0) {
            if (i_cockLength < 3) {
                rando = Appearance.rand(3);
                if (rando == 0) description = "little";
                else if (rando == 1) description = "toy-sized";
                else description = "tiny";
            } else if (i_cockLength < 5) {
                if (Appearance.rand(2) == 0) description = "short";
                else description = "small";
            } else if (i_cockLength < 7) {
                if (Appearance.rand(2) == 0) description = "fair-sized";
                else description = "nice";
            } else if (i_cockLength < 9) {
                rando = Appearance.rand(3);
                if (rando == 0) description = "long";
                else if (rando == 1) description = "lengthy";
                else if (rando == 2) description = "sizable";
            } else if (i_cockLength < 13) {
                if (Appearance.rand(2) == 0) description = "huge";
                else description = "foot-long";
            } else if (i_cockLength < 18) {
                if (Appearance.rand(2) == 0) description = "massive";
                else description = "forearm-length";
            } else if (i_cockLength < 30) {
                if (Appearance.rand(2) == 0) description = "enormous";
                else description = "monster-length";
            } else {
                rando = Appearance.rand(3);
                if (rando == 0) description = "towering";
                else if (rando == 1) description = "freakish";
                else description = "massive";
            }
            descripts = 1;
        }
        //thickness go!
        else if (Appearance.rand(4) == 0 && descripts == 0) {
            if (i_cockThickness <= 0.75) description += "narrow";
            else if (i_cockThickness <= 1.1) description += "nice";
            else if (i_cockThickness <= 1.4) {
                if (Appearance.rand(2) == 0) description += "ample";
                else description += "big";
            } else if (i_cockThickness <= 2) {
                if (Appearance.rand(2) == 0) description += "broad";
                else description += "girthy";
            } else if (i_cockThickness <= 3.5) {
                if (Appearance.rand(2) == 0) description += "fat";
                else description += "distended";
            } else {
                if (Appearance.rand(2) == 0) description += "inhumanly distended";
                else description += "monstrously thick";
            }
            descripts = 1;
        }
        //Length/Thickness done.  Moving on to special animal characters/lust stuff.
        /*Animal Fillers - turned off due to duplication in noun segment
         else if(type == 1 && descripts == 0 && rand(2) == 0) {
         if(rand(2) == 0) descript += "flared ";
         else descript += "musky ";
         }
         else if(type == 2 && descripts == 0 && rand(2) == 0) {
         descript += "musky ";
         }*/
        //FINAL FALLBACKS - lust descriptors
        //Lust stuff
        else if (i_creature.lust > 90) {
            //lots of cum? drippy.
            if (i_creature.cumQ() > 50 && i_creature.cumQ() < 200 && Appearance.rand(2) == 0) {
                //for hroses and dogs
                if (CockTypesGroup[i_cockType] == "animal") description += "animal-pre leaking";
                else description += "pre-slickened";
                descripts = 1;
            }
            //Tons of cum
            if (i_creature.cumQ() >= 200 && Appearance.rand(2) == 0) {
                //for horses and dogs
                if (CockTypesGroup[i_cockType] == "animal") description += "animal-spunk dripping";
                else description += "cum-drooling";
                descripts = 1;
            }
            //Not descripted? Pulsing and twitching
            if (descripts == 0) {
                if (Appearance.rand(2) == 0) description += "throbbing";
                else description += "pulsating";
                descripts = 1;
            }
        }
        //A little less lusty, but still lusty.
        else if (i_creature.lust > 75) {
            if (
                descripts == 0 &&
                i_creature.cumQ() > 50 &&
                i_creature.cumQ() < 200 &&
                Appearance.rand(2) == 0
            ) {
                description += "pre-leaking";
                descripts = 1;
            }
            if (descripts == 0 && i_creature.cumQ() >= 200 && Appearance.rand(2) == 0) {
                description += "pre-cum dripping";
                descripts = 1;
            }
            if (descripts == 0) {
                if (Appearance.rand(2) == 0) description += "rock-hard";
                else description += "eager";
                descripts = 1;
            }
        }
        //Not lusty at all, fallback adjective
        else if (i_creature.lust > 50) description += "hard";
        else description += "ready";
        return description;
    }

    public static cockMultiNoun(cockType: CockTypesEnum): string {
        /*
        if (cockType is int) {
            trace("Someone is still calling cockNoun with an integer cock type");
            trace("Fix this shit already, dammit!");
            cockType = CockTypesEnum.ParseConstantByIndex(cockType);
        }
        */
        var options: any[];
        var description: string = "";
        if (cockType == CockTypesEnum.HUMAN) {
            options = [
                "cock",
                "cock",
                "cock",
                "cock",
                "cock",
                "prick",
                "prick",
                "pecker",
                "shaft",
                "shaft",
                "shaft",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.BEE) {
            options = [
                "bee prick",
                "bee prick",
                "bee prick",
                "bee prick",
                "insectoid cock",
                "insectoid cock",
                "furred monster",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.DOG) {
            options = [
                "doggie dong",
                "canine shaft",
                "pointed prick",
                "dog-shaft",
                "dog-cock",
                "puppy-pecker",
                "dog-dick",
                "pointed shaft",
                "canine cock",
                "canine cock",
                "dog cock",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.HORSE) {
            options = [
                "horsecock",
                "equine prick",
                "horse-shaft",
                "horse-prick",
                "stallion-prick",
                "equine dong",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.DEMON) {
            options = [
                "demon-dick",
                "nubby shaft",
                "corrupted cock",
                "perverse pecker",
                "bumpy demon-dick",
                "demonic cock",
                "demonic dong",
                "cursed cock",
                "infernal prick",
                "unholy cock",
                "blighted cock",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.TENTACLE) {
            options = [
                "tentacle prick",
                "plant-like shaft",
                "tentacle cock",
                "cock-tendril",
                "tentacle pecker",
                "plant prick",
                "penile flora",
                "smooth inhuman shaft",
                "tentacle dick",
                "vine prick",
                "vine-like cock",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.CAT) {
            options = [
                "feline dick",
                "cat-cock",
                "kitty-cock",
                "spiny prick",
                "pussy-prick",
                "cat-penis",
                "feline member",
                "spined shaft",
                "feline shaft",
                "'barbed' dick",
                "kitten-prick",
            ];
            description += Appearance.randomChoice(options);
        } else if (cockType == CockTypesEnum.LIZARD) {
            options = [
                "reptile-dick",
                "purple cock",
                "inhuman cock",
                "reptilian prick",
                "purple prick",
                "purple member",
                "serpentine member",
                "serpentine shaft",
                "reptilian shaft",
                "snake-shaft",
                "snake dick",
            ];
            description += Appearance.randomChoice(options);
        } else {
            description += Appearance.randomChoice("cock", "prick", "pecker", "shaft");
        }
        return description;
    }

    //TODO Give Method a better name
    /**
     * Descripes cocks, either singular ("one of"/"one of your") or each ("each of"/"each of your").
     * @param    i_creature Creature type, either Player or Monster
     * @param    i_capitalised Capitalised for start of sentence.
     * @param    i_singular true = "one of", false = "each"
     * @return    Short description of cock(s)
     */
    /* No longer used - replaced by the sMultiCockDesc, SMultiCockDesc, oMultiCockDesc, OMultiCockDesc functions in Creature.as
    public static  cockMultiDesc(i_creature:Creature, i_capitalised: boolean, i_singular: boolean): string
    {
    var  description: string = "";
    var  notCapitalised: boolean = false;
        if (i_creature.totalCocks() > 1) {
            if (i_singular) {
                (i_capitalised) ? description += "O" : description += "o";
                description += "ne of ";
            }
            else {
                (i_capitalised) ? description += "E" : description += "e";
                description += "ach of ";
            }
            notCapitalised = true;
        }

        (i_capitalised && !(notCapitalised)) ? description += "Y" : description += "y";
        description += "our ";

        description += cockMultiLDescriptionShort(i_creature);
        return description;
    }

    public static  cockMultiLDescriptionShort(i_creature:Creature): string
    {
    var  description: string = "";
        if (i_creature.cocks.length < 1) {
            CoC_Settings.error("<b>ERROR: NO WANGS DETECTED for cockMultiLightDesc()</b>");
            return "<b>ERROR: NO WANGS DETECTED for cockMultiLightDesc()</b>";
        }
        if (i_creature.horseCocks() == i_creature.totalCocks()) description += cockNoun(CockTypesEnum.HORSE);
        else if (i_creature.cocks[0] == CockTypesEnum.BEE) description += cockNoun(CockTypesEnum.BEE);
        else if (i_creature.dogCocks() == i_creature.totalCocks()) description += cockNoun(CockTypesEnum.DOG);
        else if (i_creature.demonCocks() == i_creature.totalCocks()) description += cockNoun(CockTypesEnum.DEMON);
        else if (i_creature.tentacleCocks() == i_creature.totalCocks()) description += cockNoun(CockTypesEnum.TENTACLE);
        else if (i_creature.catCocks() == i_creature.totalCocks()) description += cockNoun(CockTypesEnum.CAT);
        else if (i_creature.lizardCocks() == i_creature.totalCocks()) description += cockNoun(CockTypesEnum.LIZARD);
        else if (i_creature.anemoneCocks() == i_creature.totalCocks()) description += cockNoun(CockTypesEnum.ANEMONE);
        else if (i_creature.kangaCocks() == i_creature.totalCocks()) description += cockNoun(CockTypesEnum.KANGAROO);
        else if (i_creature.dragonCocks() == i_creature.totalCocks()) description += cockNoun(CockTypesEnum.DRAGON);
        else if (i_creature.displacerCocks() == i_creature.totalCocks()) description += cockNoun(CockTypesEnum.DISPLACER);
        else if (i_creature.foxCocks() == i_creature.totalCocks()) description += cockNoun(CockTypesEnum.FOX);
        else description += cockNoun(CockTypesEnum.HUMAN);
        //Add s if plural
        if (i_creature.cockTotal() > 1) description += "s";
        //Reset to normal description if singular
        else description = cockDescription(i_creature, 0);
        return description;
    }
    */

    /**
     * Describe creatures balls.
     * @param    i_forcedSize    Force a description of the size of the balls
     * @param    i_plural        Show plural forms
     * @param    i_creature        Monster, Player or NonPlayer
     * @param    i_withArticle    Show description with article in front
     * @return    Full description of balls
     */
    public static ballsDescription(
        i_forcedSize: boolean,
        i_plural: boolean,
        i_creature: Creature,
        i_withArticle: boolean = false
    ): string {
        if (i_creature.balls == 0) return "prostate";

        // var haveDescription: boolean = false;
        // var rando: number = 0;
        var description: string = "";
        var options: any[];

        if (i_plural && i_creature.findStatusAffect(StatusAffects.Uniball) < 0) {
            if (i_creature.balls == 1) {
                if (i_withArticle) {
                    options = ["a single", "a solitary", "a lone", "an individual"];
                } else {
                    options = ["single", "solitary", "lone", "individual"];
                }
                description += Appearance.randomChoice(options);
            } else if (i_creature.balls == 2) {
                if (i_withArticle) {
                    options = ["a pair of", "two", "a duo of"];
                } else {
                    options = ["pair of", "two", "duo of"];
                }
                description += Appearance.randomChoice(options);
            } else if (i_creature.balls == 3) {
                options = ["three", "triple"];
                i_withArticle ? options.push("a trio of") : options.push("trio of");
                description += Appearance.randomChoice(options);
            } else if (i_creature.balls == 4) {
                options = ["four", "quadruple"];
                i_withArticle ? options.push("a quartette of") : options.push("quartette of");
                description += Appearance.randomChoice(options);
            } else {
                if (i_withArticle) {
                    options = ["a multitude of", "many", "a large handful of"];
                } else {
                    options = ["multitude of", "many", "large handful of"];
                }
                description += Appearance.randomChoice(options);
            }
        }
        //size!
        if (i_creature.ballSize > 1 && (Appearance.rand(3) <= 1 || i_forcedSize)) {
            if (description) description += " ";

            if (i_creature.ballSize >= 18) description += "hideously swollen and oversized";
            else if (i_creature.ballSize >= 15) description += "beachball-sized";
            else if (i_creature.ballSize >= 12) description += "watermelon-sized";
            else if (i_creature.ballSize >= 9) description += "basketball-sized";
            else if (i_creature.ballSize >= 7) description += "soccerball-sized";
            else if (i_creature.ballSize >= 5) description += "cantaloupe-sized";
            else if (i_creature.ballSize >= 4) description += "grapefruit-sized";
            else if (i_creature.ballSize >= 3) description += "apple-sized";
            else if (i_creature.ballSize >= 2) description += "baseball-sized";
            else if (i_creature.ballSize > 1) description += "large";
        }
        //UNIBALL
        if (i_creature.findStatusAffect(StatusAffects.Uniball) >= 0) {
            if (description) description += " ";
            options = [
                "tightly-compressed",
                "snug",
                "cute",
                "pleasantly squeezed",
                "compressed-together",
            ];
            description += Appearance.randomChoice(options);
        }
        //Descriptive
        if (i_creature.hoursSinceCum >= 48 && Appearance.rand(2) == 0 && !i_forcedSize) {
            if (description) description += " ";
            options = ["overflowing", "swollen", "cum-engorged"];
            description += Appearance.randomChoice(options);
        }
        //lusty
        if (i_creature.lust > 90 && description == "" && Appearance.rand(2) == 0 && !i_forcedSize) {
            options = [
                "eager",
                "full",
                "needy",
                "desperate",
                "throbbing",
                "heated",
                "trembling",
                "quivering",
                "quaking",
            ];
            description += Appearance.randomChoice(options);
        }
        //Slimy skin
        if (i_creature.skinType == 3) {
            if (description) description += " ";
            options = ["goopey", "gooey", "slimy"];
            description += Appearance.randomChoice(options);
        }
        if (description) description += " ";

        options = ["nut", "gonad", "teste", "testicle", "testicle", "ball", "ball", "ball"];

        // I don't know how this was ever supposed to work.
        //if (i_creature.balls == 4 && i_plural) options.push("quads", "quads", "quads");

        description += Appearance.randomChoice(options);
        if (i_plural) description += "s";

        if (i_creature.findStatusAffect(StatusAffects.Uniball) >= 0 && Appearance.rand(2) == 0) {
            if (Appearance.rand(3) == 0) description += " merged into a cute, spherical package";
            else if (Appearance.rand(2) == 0)
                description += " combined into a round, girlish shape";
            else description += " squeezed together into a perky, rounded form";
        }
        return description;
    }

    //Returns random description of scrotum
    public static sackDescript(i_creature: Creature): string {
        if (i_creature.balls == 0) return "prostate";

        var options: any[];
        var description: string = "";

        options = ["scrotum", "sack", "nutsack", "ballsack", "beanbag", "pouch"];

        description += Appearance.randomChoice(options);

        return description;
    }

    /* Moved to Creature.as
            public static  sheathDescription(i_character:Character): string
            {
                if (i_character.hasSheath()) return "sheath";
                else return "base";
            }
    */

    public static vaginaDescript(i_creature: Creature, i_vaginaIndex: number = 0): string {
        if (i_vaginaIndex > i_creature.vaginas.length - 1) {
            CoC_Settings.error(
                "<B>Error: Invalid vagina number (" +
                    i_vaginaIndex +
                    ") passed to vaginaDescript()</b>"
            );
            return (
                "<B>Error: Invalid vagina number (" +
                i_vaginaIndex +
                ") passed to vaginaDescript()</b>"
            );
        }
        if (i_vaginaIndex < 0) {
            CoC_Settings.error(
                "<B>Error: Invalid vaginaNum (" + i_vaginaIndex + ") passed to vaginaDescript()</b>"
            );
            return (
                "<B>Error: Invalid vaginaNum (" + i_vaginaIndex + ") passed to vaginaDescript()</b>"
            );
        }
        if (i_creature.vaginas.length <= 0) {
            CoC_Settings.error("ERROR: Called vaginaDescription with no vaginas");
            return "ERROR: Called vaginaDescription with no vaginas";
        }

        var description: string = "";
        var weighting: number = 0;
        // var haveDescription: boolean = false;
        var options: any[];

        //Very confusing way to display values.
        if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 0) weighting = 61;
        if (
            i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 4 ||
            i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 5
        )
            weighting = 10;

        //tightness descript - 40% display rate
        if (Appearance.rand(100) + weighting > 60) {
            if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 0) {
                if (i_creature.vaginas[i_vaginaIndex].virgin) description += "virgin";
                else description += "tight";
            }
            if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 2) description += "loose";
            if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 3)
                description += "very loose";
            if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 4) description += "gaping";
            if (i_creature.vaginas[i_vaginaIndex].vaginalLooseness == 5)
                description += "gaping-wide";
        }
        //wetness descript - 30% display rate
        if (Appearance.rand(100) + weighting > 70) {
            if (description != "") description += ", ";
            if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 0) description += "dry";
            if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 1) description += "moist";
            if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 2) description += "wet";
            if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 3) description += "slick";
            if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 4) description += "drooling";
            if (i_creature.vaginas[i_vaginaIndex].vaginalWetness == 5) description += "slavering";
        }
        if (i_creature.vaginas[i_vaginaIndex].labiaPierced > 0 && Appearance.rand(3) == 0) {
            if (description != "") description += ", ";
            description += "pierced";
        }
        if (description == "" && i_creature.skinType == 3) {
            // if (description != "")
            //     description += ", ";
            if (Appearance.rand(2) == 0) description += "gooey";
            else description += "slimy";
        }
        if (i_creature.vaginaType() == 5 && Math.floor(Math.random() * 2) == 0) {
            if (description != "") description += ", ";
            options = [
                "black",
                "onyx",
                "ebony",
                "dusky",
                "sable",
                "obsidian",
                "midnight-hued",
                "jet black",
            ];
            description += Appearance.randomChoice(options);
        }

        if (description != "") description += " ";
        options = ["vagina", "pussy", "cooter", "twat", "cunt", "snatch", "fuck-hole", "muff"];
        description += Appearance.randomChoice(options);
        //Something that would be nice to have but needs a variable in Creature or Character.
        //if(i_creature.bunnyScore() >= 3) description += "rabbit hole";

        return description;
    }

    public static clitDescription(i_creature: Creature): string {
        var description: string = "";
        var options: any[];
        var haveDescription: boolean = false;
        //Length Adjective - 50% chance
        if (Appearance.rand(2) == 0) {
            //small clits!
            if (i_creature.clitLength <= 0.5) {
                options = ["tiny ", "little ", "petite ", "diminutive ", "miniature "];
                description += Appearance.randomChoice(options);
            }
            //"average".
            if (i_creature.clitLength > 0.5 && i_creature.clitLength < 1.5) {
                //no size comment
            }
            //Biggies!
            if (i_creature.clitLength >= 1.5 && i_creature.clitLength < 4) {
                options = ["large ", "large ", "substantial ", "substantial ", "considerable "];
                description += Appearance.randomChoice(options);
            }
            //'Uge
            if (i_creature.clitLength >= 4) {
                options = ["monster ", "tremendous ", "colossal ", "enormous ", "bulky "];
                description += Appearance.randomChoice(options);
            }
        }
        //Descriptive descriptions - 50% chance of being called
        if (Appearance.rand(2) == 0) {
            //Doggie descriptors - 50%
            //TODO Conditionals don't make sense, need to introduce a class variable to keep of "something" or move race or Creature/Character
            if (i_creature.skinType == 1 && !haveDescription && Appearance.rand(2) == 0) {
                description += "bitch-";
                haveDescription = true;
            }
            /*Horse descriptors - 50%
             if(creature.skinType == 1 > 2 && !descripted && rand(2) == 0) {
             descripted = true;
             descript += "mare-";
             }*/
            //Horny descriptors - 75% chance
            if (i_creature.lust > 70 && Appearance.rand(4) < 3 && !haveDescription) {
                options = ["throbbing ", "pulsating ", "hard "];
                description += Appearance.randomChoice(options);
                haveDescription = true;
            }
            //High libido - always use if no other descript
            if (i_creature.lib > 50 && Appearance.rand(2) == 0 && !haveDescription) {
                options = ["insatiable ", "greedy ", "demanding ", "rapacious"];
                description += Appearance.randomChoice(options);
                haveDescription = true;
            }
        }
        if (i_creature.hasVagina()) {
            if (!haveDescription && i_creature.vaginas[0].clitPierced > 0) {
                description += "pierced ";
                haveDescription = true;
            }
        } else {
            CoC_Settings.error("ERROR: CLITDESCRIPT WITH NO CLIT");
            return "ERROR: CLITDESCRIPT WITH NO CLIT";
        }

        //Clit nouns
        options = [
            "clit",
            "clitty",
            "button",
            "pleasure-buzzer",
            "clit",
            "clitty",
            "button",
            "clit",
            "clit",
            "button",
        ];
        description += Appearance.randomChoice(options);

        return description;
    }

    /**
     * Gives a full description of a Character's butt.
     * Be aware that it only supports Characters, not all Creatures.
     * @param    i_character
     * @return    A full description of a Character's butt.
     */
    public static buttDescription(i_character: Character): string {
        var description: string = "";
        var options: any[];
        if (i_character.buttRating <= 1) {
            if (i_character.tone >= 60) description += "incredibly tight, perky ";
            else {
                options = ["tiny", "very small", "dainty"];
                description = Appearance.randomChoice(options);
                //Soft PC's buns!
                if (i_character.tone <= 30 && Appearance.rand(3) == 0) description += " yet soft";
                description += " ";
            }
        }
        if (i_character.buttRating > 1 && i_character.buttRating < 4) {
            if (i_character.tone >= 65) {
                options = [
                    "perky, muscular ",
                    "tight, toned ",
                    "compact, muscular ",
                    "tight ",
                    "muscular, toned ",
                ];
                description = Appearance.randomChoice(options);
            }
            //Nondescript
            else if (i_character.tone >= 30) {
                options = ["tight ", "firm ", "compact ", "petite "];
                description = Appearance.randomChoice(options);
            }
            //FLABBAH
            else {
                options = [
                    "small, heart-shaped ",
                    "soft, compact ",
                    "soft, heart-shaped ",
                    "small, cushy ",
                    "small ",
                    "petite ",
                    "snug ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (i_character.buttRating >= 4 && i_character.buttRating < 6) {
            //TOIGHT LIKE A TIGER
            if (i_character.tone >= 65) {
                options = [
                    "nicely muscled ",
                    "nice, toned ",
                    "muscly ",
                    "nice toned ",
                    "toned ",
                    "fair ",
                ];
                description = Appearance.randomChoice(options);
            }
            //Nondescript
            else if (i_character.tone >= 30) {
                options = ["nice ", "fair "];
                description = Appearance.randomChoice(options);
            }
            //FLABBAH
            else {
                options = [
                    "nice, cushiony ",
                    "soft ",
                    "nicely-rounded, heart-shaped ",
                    "cushy ",
                    "soft, squeezable ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (i_character.buttRating >= 6 && i_character.buttRating < 8) {
            //TOIGHT LIKE A TIGER
            if (i_character.tone >= 65) {
                options = [
                    "full, toned ",
                    "muscly handful of ",
                    "shapely, toned ",
                    "muscular, hand-filling ",
                    "shapely, chiseled ",
                    "full ",
                    "chiseled ",
                ];
                description = Appearance.randomChoice(options);
            }
            //Nondescript
            else if (i_character.tone >= 30) {
                options = ["handful of ", "full ", "shapely ", "hand-filling "];
                description = Appearance.randomChoice(options);
            }
            //FLABBAH
            else {
                if (Appearance.rand(8) == 0) return "supple, handful of ass";
                options = [
                    "somewhat jiggly ",
                    "soft, hand-filling ",
                    "cushiony, full ",
                    "plush, shapely ",
                    "full ",
                    "soft, shapely ",
                    "rounded, spongy ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (i_character.buttRating >= 8 && i_character.buttRating < 10) {
            //TOIGHT LIKE A TIGER
            if (i_character.tone >= 65) {
                options = [
                    "large, muscular ",
                    "substantial, toned ",
                    "big-but-tight ",
                    "squeezable, toned ",
                    "large, brawny ",
                    "big-but-fit ",
                    "powerful, squeezable ",
                    "large ",
                ];
                description = Appearance.randomChoice(options);
            }
            //Nondescript
            else if (i_character.tone >= 30) {
                options = ["squeezable ", "large ", "substantial "];
                description = Appearance.randomChoice(options);
            }
            //FLABBAH
            else {
                options = [
                    "large, bouncy ",
                    "soft, eye-catching ",
                    "big, slappable ",
                    "soft, pinchable ",
                    "large, plush ",
                    "squeezable ",
                    "cushiony ",
                    "plush ",
                    "pleasantly plump ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (i_character.buttRating >= 10 && i_character.buttRating < 13) {
            //TOIGHT LIKE A TIGER
            if (i_character.tone >= 65) {
                options = [
                    "thick, muscular ",
                    "big, burly ",
                    "heavy, powerful ",
                    "spacious, muscular ",
                    "toned, cloth-straining ",
                    "thick ",
                    "thick, strong ",
                ];
                description = Appearance.randomChoice(options);
            }
            //Nondescript
            else if (i_character.tone >= 30) {
                options = ["jiggling ", "spacious ", "heavy ", "cloth-straining "];
                description = Appearance.randomChoice(options);
            }
            //FLABBAH
            else {
                options = [
                    "super-soft, jiggling ",
                    "spacious, cushy ",
                    "plush, cloth-straining ",
                    "squeezable, over-sized ",
                    "spacious ",
                    "heavy, cushiony ",
                    "slappable, thick ",
                    "jiggling ",
                    "spacious ",
                    "soft, plump ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (i_character.buttRating >= 13 && i_character.buttRating < 16) {
            //TOIGHT LIKE A TIGER
            if (i_character.tone >= 65) {
                options = [
                    "expansive, muscled ",
                    "voluminous, rippling ",
                    "generous, powerful ",
                    "big, burly ",
                    "well-built, voluminous ",
                    "powerful ",
                    "muscular ",
                    "powerful, expansive ",
                ];
                description = Appearance.randomChoice(options);
            }
            //Nondescript
            else if (i_character.tone >= 30) {
                options = ["expansive ", "generous ", "voluminous ", "wide "];
                description = Appearance.randomChoice(options);
            }
            //FLABBAH
            else {
                options = [
                    "pillow-like ",
                    "generous, cushiony ",
                    "wide, plush ",
                    "soft, generous ",
                    "expansive, squeezable ",
                    "slappable ",
                    "thickly-padded ",
                    "wide, jiggling ",
                    "wide ",
                    "voluminous ",
                    "soft, padded ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (i_character.buttRating >= 16 && i_character.buttRating < 20) {
            if (i_character.tone >= 65) {
                options = [
                    "huge, toned ",
                    "vast, muscular ",
                    "vast, well-built ",
                    "huge, muscular ",
                    "strong, immense ",
                    "muscle-bound ",
                ];
                description = Appearance.randomChoice(options);
            }
            //Nondescript
            else if (i_character.tone >= 30) {
                if (Appearance.rand(5) == 0) return "jiggling expanse of ass";
                if (Appearance.rand(5) == 0) return "copious ass-flesh";
                options = ["huge ", "vast ", "giant "];
                description = Appearance.randomChoice(options);
            }
            //FLABBAH
            else {
                options = [
                    "vast, cushiony ",
                    "huge, plump ",
                    "expansive, jiggling ",
                    "huge, cushiony ",
                    "huge, slappable ",
                    "seam-bursting ",
                    "plush, vast ",
                    "giant, slappable ",
                    "giant ",
                    "huge ",
                    "swollen, pillow-like ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        if (i_character.buttRating >= 20) {
            if (i_character.tone >= 65) {
                if (Appearance.rand(7) == 0) return "colossal, muscly ass";
                options = [
                    "ginormous, muscle-bound ",
                    "colossal yet toned ",
                    "strong, tremdously large ",
                    "tremendous, muscled ",
                    "ginormous, toned ",
                    "colossal, well-defined ",
                ];
                description = Appearance.randomChoice(options);
            }
            //Nondescript
            else if (i_character.tone >= 30) {
                options = ["ginormous ", "colossal ", "tremendous ", "gigantic "];
                description = Appearance.randomChoice(options);
            }
            //FLABBAH
            else {
                options = [
                    "ginormous, jiggly ",
                    "plush, ginormous ",
                    "seam-destroying ",
                    "tremendous, rounded ",
                    "bouncy, colossal ",
                    "thong-devouring ",
                    "tremendous, thickly padded ",
                    "ginormous, slappable ",
                    "gigantic, rippling ",
                    "gigantic ",
                    "ginormous ",
                    "colossal ",
                    "tremendous ",
                ];
                description = Appearance.randomChoice(options);
            }
        }
        options = [
            "butt",
            "butt",
            "butt",
            "butt",
            "ass",
            "ass",
            "ass",
            "ass",
            "backside",
            "backside",
            "derriere",
            "rump",
            "bottom",
        ];

        description += Appearance.randomChoice(options);
        //if(rando == 2) desc += "cheeks";
        return description;
    }

    /**
     * Gives a short description of a creature's butt.
     * Different from buttDescription in that it supports all creatures, not just characters.
     * Warning, very judgemental.
     * @param    creature
     * @return Short description of a butt.
     */
    public static buttDescriptionShort(i_creature: Creature): string {
        var description: string = "";
        var options: any[];
        if (i_creature.buttRating <= 1) {
            options = ["insignificant ", "very small "];
            description = Appearance.randomChoice(options);
        }
        if (i_creature.buttRating > 1 && i_creature.buttRating < 4) {
            options = ["tight ", "firm ", "compact "];
            description = Appearance.randomChoice(options);
        }
        if (i_creature.buttRating >= 4 && i_creature.buttRating < 6) {
            options = ["regular ", "unremarkable "];
            description = Appearance.randomChoice(options);
        }
        if (i_creature.buttRating >= 6 && i_creature.buttRating < 8) {
            if (Appearance.rand(3) == 0) return "handful of ass";
            options = ["full ", "shapely "];
            description = Appearance.randomChoice(options);
        }
        if (i_creature.buttRating >= 8 && i_creature.buttRating < 10) {
            options = ["squeezable ", "large ", "substantial "];
            description = Appearance.randomChoice(options);
        }
        if (i_creature.buttRating >= 10 && i_creature.buttRating < 13) {
            options = ["jiggling ", "spacious ", "heavy "];
            description = Appearance.randomChoice(options);
        }
        if (i_creature.buttRating >= 13 && i_creature.buttRating < 16) {
            if (Appearance.rand(3) == 0) return "generous amount of ass";
            options = ["expansive ", "voluminous "];
            description = Appearance.randomChoice(options);
        }
        if (i_creature.buttRating >= 16 && i_creature.buttRating < 20) {
            if (Appearance.rand(3) == 2) return "jiggling expanse of ass";
            options = ["huge ", "vast "];
            description = Appearance.randomChoice(options);
        }
        if (i_creature.buttRating >= 20) {
            options = ["ginormous ", "colossal ", "tremendous "];
            description = Appearance.randomChoice(options);
        }
        options = ["butt ", "ass "];
        description += Appearance.randomChoice(options);
        if (Appearance.rand(2) == 0) description += "cheeks";
        return description;
    }

    public static assholeDescript(i_creature: Creature): string {
        var description: string = "";

        // The way this was setup didn't work. Trying to inline-define object key-values wasn't looking up the variable *VALUES* it was using the string representation
        // of the variable name as the key.
        // ie, querying ANAL_WETNESS_DESCRIPTORS[0] would actually return "undefined" rather than "".
        // This is just fucking awful but I'm just making things work in the face of bugs I'm running into.

        // 66% Wetness Descript
        var ANAL_WETNESS_DESCRIPTORS: Record<string, any> = new Object();
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_DRY] = "";
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_NORMAL] = "";
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_MOIST] = "moist ";
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_SLIMY] = "slimy ";
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_DROOLING] = "drooling ";
        ANAL_WETNESS_DESCRIPTORS[ANAL_WETNESS_SLIME_DROOLING] = "slime-drooling ";

        if (Appearance.rand(3) <= 1) {
            description += ANAL_WETNESS_DESCRIPTORS[i_creature.ass.analWetness];
        }

        var ANAL_TIGHTNESS_DESCRIPTORS: Record<string, any> = new Object();
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_VIRGIN] = "virgin ";
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_TIGHT] = "tight ";
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_NORMAL] = "loose ";
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_LOOSE] = "roomy ";
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_STRETCHED] = "stretched ";
        ANAL_TIGHTNESS_DESCRIPTORS[ANAL_LOOSENESS_GAPING] = "gaping ";

        //25% tightness description
        if (
            Appearance.rand(4) == 0 ||
            (i_creature.ass.analLooseness <= 1 && Appearance.rand(4) <= 2)
        ) {
            description += ANAL_TIGHTNESS_DESCRIPTORS[i_creature.ass.analLooseness];
        }

        //asshole descriptor
        description += Appearance.randomChoice(
            "ass",
            "anus",
            "pucker",
            "backdoor",
            "asshole",
            "butthole"
        );

        return description;
    }

    public static wingsDescript(i_creature: Creature): string {
        return Appearance.DEFAULT_WING_NAMES[i_creature.wingType] + " wings";
    }

    /* All of these functions have been replaced with direct calls to the appropriate form of cockNoun().
            private static  humanDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.HUMAN);
                return descript;
            }

            private static  kangaDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.KANGAROO);
                return descript;
            }

            public static  dogDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.DOG);
                return descript;
            }

            private static  foxDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.FOX);
                return descript;
            }

            private static  tentacleDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.TENTACLE);
                return descript;
            }

            private static  demonDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.DEMON);
                return descript;
            }


            //Horsecock + Descript
            public static  horseDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.HORSE);
                return descript;
            }

            private static  catDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.CAT);
                return descript;
            }

            private static  anemoneDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.ANEMONE);
                return descript;
            }

            private static  dragonDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.DRAGON);
                return descript;
            }

            private static  displacerDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.DISPLACER);
                return descript;
            }


            private static  snakeDescript(cockNum: number): string
            {
            var  descript: string = "";
                //if(rand(2) == 0) descript += cockAdjective(cockNum) + ", ";
                descript += cockNoun(CockTypesEnum.LIZARD);
                return descript;
            }
    */

    public static BREAST_CUP_NAMES: any[] = [
        "flat", //0
        //				1			2			3			4			5				6			7		8			9
        "A-cup",
        "B-cup",
        "C-cup",
        "D-cup",
        "DD-cup",
        "big DD-cup",
        "E-cup",
        "big E-cup",
        "EE-cup", // 1-9
        "big EE-cup",
        "F-cup",
        "big F-cup",
        "FF-cup",
        "big FF-cup",
        "G-cup",
        "big G-cup",
        "GG-cup",
        "big GG-cup",
        "H-cup", //10-19
        "big H-cup",
        "HH-cup",
        "big HH-cup",
        "HHH-cup",
        "I-cup",
        "big I-cup",
        "II-cup",
        "big II-cup",
        "J-cup",
        "big J-cup", //20-29
        "JJ-cup",
        "big JJ-cup",
        "K-cup",
        "big K-cup",
        "KK-cup",
        "big KK-cup",
        "L-cup",
        "big L-cup",
        "LL-cup",
        "big LL-cup", //30-39
        "M-cup",
        "big M-cup",
        "MM-cup",
        "big MM-cup",
        "MMM-cup",
        "large MMM-cup",
        "N-cup",
        "large N-cup",
        "NN-cup",
        "large NN-cup", //40-49
        "O-cup",
        "large O-cup",
        "OO-cup",
        "large OO-cup",
        "P-cup",
        "large P-cup",
        "PP-cup",
        "large PP-cup",
        "Q-cup",
        "large Q-cup", //50-59
        "QQ-cup",
        "large QQ-cup",
        "R-cup",
        "large R-cup",
        "RR-cup",
        "large RR-cup",
        "S-cup",
        "large S-cup",
        "SS-cup",
        "large SS-cup", //60-69
        "T-cup",
        "large T-cup",
        "TT-cup",
        "large TT-cup",
        "U-cup",
        "large U-cup",
        "UU-cup",
        "large UU-cup",
        "V-cup",
        "large V-cup", //70-79
        "VV-cup",
        "large VV-cup",
        "W-cup",
        "large W-cup",
        "WW-cup",
        "large WW-cup",
        "X-cup",
        "large X-cup",
        "XX-cup",
        "large XX-cup", //80-89
        "Y-cup",
        "large Y-cup",
        "YY-cup",
        "large YY-cup",
        "Z-cup",
        "large Z-cup",
        "ZZ-cup",
        "large ZZ-cup",
        "ZZZ-cup",
        "large ZZZ-cup", //90-99
    ];

    public static breastCup(size: number): string {
        return Appearance.BREAST_CUP_NAMES[
            Math.min(Math.floor(size), Appearance.BREAST_CUP_NAMES.length - 1)
        ];
    }

    /**
     * Returns breast size from cup name.
     * Acceptable input: "flat","A","B","C","D","DD","DD+",... "ZZZ","ZZZ+" or exact match from BREAST_CUP_NAMES array
     */
    public static breastCupInverse(name: string, defaultValue: number = 0): number {
        if (name.length == 0) return defaultValue;
        if (name == "flat") return 0;
        var big: boolean = name.charAt(name.length - 1) == "+";
        if (big) name = name.substr(0, name.length - 1);
        for (var i: number = 0; i < Appearance.BREAST_CUP_NAMES.length; i++) {
            if (name == Appearance.BREAST_CUP_NAMES[i]) return i;
            if (Appearance.BREAST_CUP_NAMES[i].indexOf(name) == 0) return i + (big ? 1 : 0);
        }
        return defaultValue;
    }

    public static createMapFromPairs(src: any[]): Record<string, any> {
        var result: Record<string, any> = {};
        for (var i: number = 0; i < src.length; i++) result[src[i][0]] = src[i][1];
        return result;
    }

    public static DEFAULT_GENDER_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [GENDER_NONE, "genderless"],
        [GENDER_MALE, "male"],
        [GENDER_FEMALE, "female"],
        [GENDER_HERM, "hermaphrodite"],
    ]);
    public static DEFAULT_SKIN_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [SKIN_TYPE_PLAIN, "skin"],
        [SKIN_TYPE_FUR, "fur"],
        [SKIN_TYPE_SCALES, "scales"],
        [SKIN_TYPE_GOO, "goo"],
        [SKIN_TYPE_UNDEFINED, "undefined flesh"],
    ]);
    public static DEFAULT_SKIN_DESCS: Record<string, any> = Appearance.createMapFromPairs([
        [SKIN_TYPE_PLAIN, "skin"],
        [SKIN_TYPE_FUR, "fur"],
        [SKIN_TYPE_SCALES, "scales"],
        [SKIN_TYPE_GOO, "skin"],
        [SKIN_TYPE_UNDEFINED, "skin"],
    ]);
    public static DEFAULT_HAIR_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [HAIR_NORMAL, "normal"],
        [HAIR_FEATHER, "feather"],
        [HAIR_GHOST, "transparent"],
        [HAIR_GOO, "goopy"],
        [HAIR_ANEMONE, "tentacle"],
    ]);
    public static DEFAULT_FACE_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [FACE_HUMAN, "human"],
        [FACE_HORSE, "horse"],
        [FACE_DOG, "dog"],
        [FACE_COW_MINOTAUR, "cow"],
        [FACE_SHARK_TEETH, "shark"],
        [FACE_SNAKE_FANGS, "snake"],
        [FACE_CAT, "cat"],
        [FACE_LIZARD, "lizard"],
        [FACE_BUNNY, "bunny"],
        [FACE_KANGAROO, "kangaroo"],
        [FACE_SPIDER_FANGS, "spider"],
        [FACE_FOX, "fox"],
        [FACE_DRAGON, "dragon"],
        [FACE_RACCOON_MASK, "raccoon mask"],
        [FACE_RACCOON, "racoon"],
        [FACE_BUCKTEETH, "buckteeth"],
        [FACE_MOUSE, "mouse"],
    ]);
    public static DEFAULT_TONGUE_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [TONUGE_HUMAN, "human"],
        [TONUGE_SNAKE, "snake"],
        [TONUGE_DEMONIC, "demonic"],
        [TONUGE_DRACONIC, "draconic"],
    ]);
    public static DEFAULT_EYES_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [EYES_HUMAN, "human"],
        [EYES_FOUR_SPIDER_EYES, "4 spider"],
        [EYES_BLACK_EYES_SAND_TRAP, "sandtrap black"],
    ]);
    public static DEFAULT_EARS_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [EARS_HUMAN, "human"],
        [EARS_HORSE, "horse"],
        [EARS_DOG, "dog"],
        [EARS_COW, "cow"],
        [EARS_ELFIN, "elfin"],
        [EARS_CAT, "cat"],
        [EARS_LIZARD, "lizard"],
        [EARS_BUNNY, "bunny"],
        [EARS_KANGAROO, "kangaroo"],
        [EARS_FOX, "fox"],
        [EARS_DRAGON, "dragon"],
        [EARS_RACCOON, "raccoon"],
        [EARS_MOUSE, "mouse"],
    ]);
    public static DEFAULT_HORNS_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [HORNS_NONE, "non-existant"],
        [HORNS_DEMON, "demon"],
        [HORNS_COW_MINOTAUR, "cow"],
        [HORNS_DRACONIC_X2, "2 draconic"],
        [HORNS_DRACONIC_X4_12_INCH_LONG, 'four 12" long draconic'],
        [HORNS_ANTLERS, "deer"],
    ]);
    public static DEFAULT_ANTENNAE_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [ANTENNAE_NONE, "non-existant"],
        [ANTENNAE_BEE, "bee"],
    ]);
    public static DEFAULT_ARM_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [ARM_TYPE_HUMAN, "human"],
        [ARM_TYPE_HARPY, "harpy"],
        [ARM_TYPE_SPIDER, "spider"],
    ]);
    public static DEFAULT_TAIL_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [TAIL_TYPE_NONE, "non-existant"],
        [TAIL_TYPE_HORSE, "horse"],
        [TAIL_TYPE_DOG, "dog"],
        [TAIL_TYPE_DEMONIC, "demonic"],
        [TAIL_TYPE_COW, "cow"],
        [TAIL_TYPE_SPIDER_ADBOMEN, "spider abdomen"],
        [TAIL_TYPE_BEE_ABDOMEN, "bee abdomen"],
        [TAIL_TYPE_SHARK, "shark"],
        [TAIL_TYPE_CAT, "cat"],
        [TAIL_TYPE_LIZARD, "lizard"],
        [TAIL_TYPE_RABBIT, "rabbit"],
        [TAIL_TYPE_HARPY, "harpy"],
        [TAIL_TYPE_KANGAROO, "kangaroo"],
        [TAIL_TYPE_FOX, "fox"],
        [TAIL_TYPE_DRACONIC, "draconic"],
        [TAIL_TYPE_RACCOON, "raccoon"],
        [TAIL_TYPE_MOUSE, "mouse"],
    ]);
    public static DEFAULT_WING_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [WING_TYPE_NONE, "non-existant"],
        [WING_TYPE_BEE_LIKE_SMALL, "small bee-like"],
        [WING_TYPE_BEE_LIKE_LARGE, "large bee-like"],
        [WING_TYPE_HARPY, "harpy"],
        [WING_TYPE_IMP, "imp"],
        [WING_TYPE_BAT_LIKE_TINY, "tiny bat-like"],
        [WING_TYPE_BAT_LIKE_LARGE, "large bat-like"],
        [WING_TYPE_SHARK_FIN, "shark fin"],
        [WING_TYPE_FEATHERED_LARGE, "large feathered"],
        [WING_TYPE_DRACONIC_SMALL, "small draconic"],
        [WING_TYPE_DRACONIC_LARGE, "large draconic"],
        [WING_TYPE_GIANT_DRAGONFLY, "giant dragonfly"],
    ]);
    public static DEFAULT_WING_DESCS: Record<string, any> = Appearance.createMapFromPairs([
        [WING_TYPE_NONE, "non-existant"],
        [WING_TYPE_BEE_LIKE_SMALL, "small bee-like"],
        [WING_TYPE_BEE_LIKE_LARGE, "large bee-like"],
        [WING_TYPE_HARPY, "large feathery"],
        [WING_TYPE_IMP, "small"],
        [WING_TYPE_BAT_LIKE_TINY, "tiny, bat-like"],
        [WING_TYPE_BAT_LIKE_LARGE, "large, bat-like"],
        [WING_TYPE_SHARK_FIN, ""],
        [WING_TYPE_FEATHERED_LARGE, "large, feathered"],
        [WING_TYPE_DRACONIC_SMALL, "small, draconic"],
        [WING_TYPE_DRACONIC_LARGE, "large, draconic"],
        [WING_TYPE_GIANT_DRAGONFLY, "giant dragonfly"],
    ]);
    public static DEFAULT_LOWER_BODY_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [LOWER_BODY_TYPE_HUMAN, "human"],
        [LOWER_BODY_TYPE_HOOFED, "hoofed"],
        [LOWER_BODY_TYPE_DOG, "dog"],
        [LOWER_BODY_TYPE_NAGA, "naga"],
        [LOWER_BODY_TYPE_CENTAUR, "centaur"],
        [LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS, "demonic high-heels"],
        [LOWER_BODY_TYPE_DEMONIC_CLAWS, "demonic claws"],
        [LOWER_BODY_TYPE_BEE, "bee"],
        [LOWER_BODY_TYPE_GOO, "goo"],
        [LOWER_BODY_TYPE_CAT, "cat"],
        [LOWER_BODY_TYPE_LIZARD, "lizard"],
        [LOWER_BODY_TYPE_PONY, "pony"],
        [LOWER_BODY_TYPE_BUNNY, "bunny"],
        [LOWER_BODY_TYPE_HARPY, "harpy"],
        [LOWER_BODY_TYPE_KANGAROO, "kangaroo"],
        [LOWER_BODY_TYPE_CHITINOUS_SPIDER_LEGS, "chitinous spider legs"],
        [LOWER_BODY_TYPE_DRIDER_LOWER_BODY, "drider"],
        [LOWER_BODY_TYPE_FOX, "fox"],
        [LOWER_BODY_TYPE_DRAGON, "dragon"],
        [LOWER_BODY_TYPE_RACCOON, "raccoon"],
    ]);
    public static DEFAULT_PIERCING_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [PIERCING_TYPE_NONE, "none"],
        [PIERCING_TYPE_STUD, "stud"],
        [PIERCING_TYPE_RING, "ring"],
        [PIERCING_TYPE_LADDER, "ladder"],
        [PIERCING_TYPE_HOOP, "hoop"],
        [PIERCING_TYPE_CHAIN, "chain"],
    ]);
    public static DEFAULT_VAGINA_TYPE_NAMES: Record<string, any> = Appearance.createMapFromPairs([
        [VAGINA_TYPE_HUMAN, "human"],
        [VAGINA_TYPE_BLACK_SAND_TRAP, "black sandtrap"],
    ]);
    public static DEFAULT_VAGINA_WETNESS_SCALES: any[] = [
        [VAGINA_WETNESS_DRY, "dry"],
        [VAGINA_WETNESS_NORMAL, "normal"],
        [VAGINA_WETNESS_WET, "wet"],
        [VAGINA_WETNESS_SLICK, "slick"],
        [VAGINA_WETNESS_DROOLING, "drooling"],
        [VAGINA_WETNESS_SLAVERING, "slavering"],
    ];
    public static DEFAULT_VAGINA_LOOSENESS_SCALES: any[] = [
        [VAGINA_LOOSENESS_TIGHT, "tight"],
        [VAGINA_LOOSENESS_NORMAL, "normal"],
        [VAGINA_LOOSENESS_LOOSE, "loose"],
        [VAGINA_LOOSENESS_GAPING, "gaping"],
        [VAGINA_LOOSENESS_GAPING_WIDE, "gaping wide"],
        [VAGINA_LOOSENESS_LEVEL_CLOWN_CAR, "clown-car level"],
    ];
    public static DEFAULT_ANAL_WETNESS_SCALES: any[] = [
        [ANAL_WETNESS_DRY, "dry"],
        [ANAL_WETNESS_NORMAL, "normal"],
        [ANAL_WETNESS_MOIST, "moist"],
        [ANAL_WETNESS_SLIMY, "slimym"],
        [ANAL_WETNESS_DROOLING, "drooling"],
        [ANAL_WETNESS_SLIME_DROOLING, "slime-drooling"],
    ];
    public static DEFAULT_ANAL_LOOSENESS_SCALES: any[] = [
        [ANAL_LOOSENESS_VIRGIN, "virgin"],
        [ANAL_LOOSENESS_TIGHT, "tight"],
        [ANAL_LOOSENESS_NORMAL, "normal"],
        [ANAL_LOOSENESS_LOOSE, "loose"],
        [ANAL_LOOSENESS_STRETCHED, "stretched"],
        [ANAL_LOOSENESS_GAPING, "gaping"],
    ];
    public static DEFAULT_HIP_RATING_SCALES: any[] = [
        [HIP_RATING_BOYISH, "boyish"],
        [HIP_RATING_SLENDER, "slender"],
        [HIP_RATING_AVERAGE, "average"],
        [HIP_RATING_AMPLE, "ample"],
        [HIP_RATING_CURVY, "curvy"],
        [HIP_RATING_FERTILE, "fertile"],
        [HIP_RATING_INHUMANLY_WIDE, "inhumanly wide"],
    ];
    public static DEFAULT_BUTT_RATING_SCALES: any[] = [
        [BUTT_RATING_BUTTLESS, "buttless"],
        [BUTT_RATING_TIGHT, "tight"],
        [BUTT_RATING_AVERAGE, "average"],
        [BUTT_RATING_NOTICEABLE, "noticeable"],
        [BUTT_RATING_LARGE, "large"],
        [BUTT_RATING_JIGGLY, "jiggly"],
        [BUTT_RATING_EXPANSIVE, "expansive"],
        [BUTT_RATING_HUGE, "huge"],
        [BUTT_RATING_INCONCEIVABLY_BIG, "inconceivably big"],
    ];

    /**
     * Assume scale = [[0,"small"],[5,"average"],[10,"big"]]
     *      value < 0   ->   "less than small"
     *      value = 0   ->   "small"
     *  0 < value < 5   ->   "between small and average"
     *      value = 5   ->   "average"
     *  5 < value < 10  ->   "between average and big"
     *      value = 10  ->   "big"
     *      value > 10  ->   "more than big"
     */
    public static describeByScale(
        value: number,
        scale: any[],
        lessThan: string = "less than",
        moreThan: string = "more than"
    ): string {
        if (scale.length == 0) return "undescribeale";
        if (scale.length == 1) return "about " + scale[0][1];
        if (value < scale[0][0]) return lessThan + " " + scale[0][1];
        if (value == scale[0][0]) return scale[0][1];
        for (var i: number = 1; i < scale.length; i++) {
            if (value < scale[i][0]) return "between " + scale[i - 1][1] + " and " + scale[i][1];
            if (value == scale[i][0]) return scale[i][1];
        }
        return moreThan + " " + scale[scale.length - 1][1];
    }

    /**
     * numberOfThings(0,"brain") = "no brains"
     * numberOfThings(1,"head") = "one head"
     * numberOfThings(2,"tail") = "2 tails"
     * numberOfThings(3,"hoof","hooves") = "3 hooves"
     */
    public static numberOfThings(n: number, name: string, pluralForm?: string): string {
        pluralForm = pluralForm || name + "s";
        if (n == 0) return "no " + pluralForm;
        if (n == 1) return "one " + name;
        return n + " " + pluralForm;
    }

    /**
     * 13 -> 2'1"
     * 5.5 -> 5.5"
     * Positive only!
     */
    public static feetsAndInches(n: number): string {
        var feet: number = Math.floor(n / 12);
        var inches: number = n - feet * 12;
        if (feet > 0) return feet + "'" + inches + '"';
        else return inches + '"';
    }

    /**
     * 13 -> 13" (2'1")
     */
    public static inchesAndFeetsAndInches(n: number): string {
        if (n < 12) return n + '"';
        return n + '" (' + Appearance.feetsAndInches(n) + ")";
    }

    public static allBreastsDescript(creature: Creature): string {
        var storage: string = "";
        if (creature.breastRows.length == 0) return "unremarkable chest muscles ";
        if (creature.breastRows.length == 2) {
            //if(creature.totalBreasts() == 4) storage += "quartet of ";
            storage += "two rows of ";
        }
        if (creature.breastRows.length == 3) {
            if (Appearance.rand(2) == 0) storage += "three rows of ";
            else storage += "multi-layered ";
        }
        if (creature.breastRows.length == 4) {
            if (Appearance.rand(2) == 0) storage += "four rows of ";
            else storage += "four-tiered ";
        }
        if (creature.breastRows.length == 5) {
            if (Appearance.rand(2) == 0) storage += "five rows of ";
            else storage += "five-tiered ";
        }
        storage += Appearance.biggestBreastSizeDescript(creature);
        return storage;
    }

    public static tailDescript(i_creature: Creature): string {
        if (i_creature.tailType == TAIL_TYPE_NONE) {
            trace("WARNING: Creature has no tails to describe.");
            return "<b>!Creature has no tails to describe!</b>";
        }

        var descript: string = "";

        if (i_creature.tailType == TAIL_TYPE_FOX && i_creature.tailVenom >= 1) {
            // Kitsune tails, we're using tailVenom to track tail count
            if (i_creature.tailVenom > 1) {
                if (i_creature.tailVenom == 2) descript += "pair ";
                else if (i_creature.tailVenom == 3) descript += "trio ";
                else if (i_creature.tailVenom == 4) descript += "quartet ";
                else if (i_creature.tailVenom == 5) descript += "quintet ";
                else if (i_creature.tailVenom > 5) descript += "bundle ";

                descript += "of kitsune tails";
            } else descript += "kitsune tail";
        } else {
            descript += Appearance.DEFAULT_TAIL_NAMES[i_creature.tailType];
            descript += " tail";
        }

        return descript;
    }

    public static oneTailDescript(i_creature: Creature): string {
        if (i_creature.tailType == TAIL_TYPE_NONE) {
            trace("WARNING: Creature has no tails to describe.");
            return "<b>!Creature has no tails to describe!</b>";
        }

        var descript: string = "";

        if (i_creature.tailType == TAIL_TYPE_FOX && i_creature.tailVenom >= 1) {
            if (i_creature.tailVenom == 1) {
                descript += "your kitsune tail";
            } else {
                descript += "one of your kitsune tails";
            }
        } else {
            descript += "your " + Appearance.DEFAULT_TAIL_NAMES[i_creature.tailType] + " tail";
        }

        return descript;
    }

    public static biggestBreastSizeDescript(creature: Creature): string {
        var temp14: number = Math.random() * 3;
        var descript: string = "";
        var temp142: number = creature.biggestTitRow();
        //ERROR PREVENTION
        if (creature.breastRows.length - 1 < temp142) {
            CoC_Settings.error("");
            return "<b>ERROR, biggestBreastSizeDescript() working with invalid breastRow</b>";
        } else if (temp142 < 0) {
            CoC_Settings.error("");
            return "ERROR SHIT SON!  BIGGESTBREASTSIZEDESCRIPT PASSED NEGATIVE!";
        }
        if (creature.breastRows[temp142].breastRating < 1) return "flat breasts";
        //50% of the time size-descript them
        if (Appearance.rand(2) == 0)
            descript += Appearance.breastSize(creature.breastRows[temp142].breastRating);
        //Nouns!
        temp14 = Appearance.rand(10);
        if (temp14 == 0) descript += "breasts";
        if (temp14 == 1) {
            if (creature.breastRows[temp142].lactationMultiplier > 2) descript += "milk-udders";
            else descript += "breasts";
        }
        if (temp14 == 2) {
            if (creature.breastRows[temp142].lactationMultiplier > 1.5) descript += "milky ";
            if (creature.breastRows[temp142].breastRating > 4) descript += "tits";
            else descript += "breasts";
        }
        if (temp14 == 3) {
            //if(creature.breastRows[temp142].breastRating > 6) descript += "rack";
            descript += "breasts";
        }
        if (temp14 == 4) descript += "tits";
        if (temp14 == 5) descript += "tits";
        if (temp14 == 6) descript += "tits";
        if (temp14 == 7) {
            if (
                creature.breastRows[temp142].lactationMultiplier >= 1 &&
                creature.breastRows[temp142].lactationMultiplier < 2.5
            )
                descript += "milk jugs";
            if (creature.breastRows[temp142].lactationMultiplier >= 2.5) descript += "udders";
            if (creature.breastRows[temp142].lactationMultiplier < 1) descript += "jugs";
        }
        if (temp14 == 8) {
            if (creature.breastRows[temp142].breastRating > 6) descript += "love-pillows";
            else descript += "boobs";
        }
        if (temp14 == 9) {
            if (creature.breastRows[temp142].breastRating > 6) descript += "tits";
            else descript += "breasts";
        }
        return descript;
    }

    public static breastSize(val: number): string {
        var descript: string = "";
        //Catch all for dudes.
        if (val < 1) return "manly ";
        //Small - A->B
        if (val <= 2) {
            descript += Appearance.randomChoice("palmable ", "tight ", "perky ", "baseball-sized ");
        }
        //C-D
        else if (val <= 4) {
            descript += Appearance.randomChoice(
                "nice ",
                "hand-filling ",
                "well-rounded ",
                "supple ",
                "softball-sized "
            );
        }
        //DD->big EE
        else if (val < 11) {
            descript += Appearance.randomChoice(
                "big ",
                "large ",
                "pillowy ",
                "jiggly ",
                "volleyball-sized "
            );
        }
        //F->big FF
        else if (val < 15) {
            descript += Appearance.randomChoice(
                "soccerball-sized ",
                "hand-overflowing ",
                "generous ",
                "jiggling "
            );
        }
        //G -> HHH
        else if (val < 24) {
            descript += Appearance.randomChoice(
                "basketball-sized ",
                "whorish ",
                "cushiony ",
                "wobbling "
            );
        }
        //I -> KK
        else if (val < 35) {
            descript += Appearance.randomChoice(
                "massive motherly ",
                "luscious ",
                "smothering ",
                "prodigious "
            );
        }
        //K- > MMM+
        else {
            descript += Appearance.randomChoice(
                "mountainous ",
                "monumental ",
                "back-breaking ",
                "exercise-ball-sized ",
                "immense "
            );
        }
        return descript;
    }

    /* Moved to Creature.as
            public static  chestDesc(creature:Creature): string
            {
                if (creature.biggestTitSize() < 1) return "chest";
                else return biggestBreastSizeDescript(creature);
            }
    */

    public static assholeOrPussy(creature: Creature): string {
        if (creature.hasVagina()) return Appearance.vaginaDescript(creature, 0);
        return Appearance.assholeDescript(creature);
    }

    public static multiCockDescriptLight(creature: Creature): string {
        if (creature.cocks.length < 1) {
            CoC_Settings.error("");
            return "<B>Error: multiCockDescriptLight() called with no penises present.</B>";
        }
        //Get cock counts
        var descript: string = "";
        var currCock: number = 0;
        var totCock: number = creature.cocks.length;
        var dogCocks: number = 0;
        var horseCocks: number = 0;
        var normalCocks: number = 0;
        // var normalCockKey: number = 0;
        // var dogCockKey: number = 0;
        // var horseCockKey: number = 0;
        // var averageLength: number = 0;
        // var averageThickness: number = 0;
        var same: boolean = true;
        //For temp14 random values
        // var rando: number = 0;
        var descripted: boolean = false;
        //If one, return normal cock descript
        if (totCock == 1) return creature.cockDescript(0);
        //Count cocks & Prep average totals
        while (currCock <= totCock - 1) {
            if (creature.cocks[currCock].cockType == CockTypesEnum.HUMAN) {
                normalCocks++;
                // normalCockKey = currCock;
            }
            if (creature.cocks[currCock].cockType == CockTypesEnum.HORSE) {
                horseCocks++;
                // horseCockKey = currCock;
            }
            if (creature.cocks[currCock].cockType == CockTypesEnum.DOG) {
                dogCocks++;
                // dogCockKey = currCock;
            }
            // averageLength += creature.cocks[currCock].cockLength;
            // averageThickness += creature.cocks[currCock].cockThickness;
            //If cocks are matched make sure they still are
            if (
                same &&
                currCock > 0 &&
                creature.cocks[currCock].cockType != creature.cocks[currCock - 1].cockType
            )
                same = false;
            currCock++;
        }
        //Crunch averages
        // averageLength /= currCock;
        // averageThickness /= currCock;
        //Quantity descriptors
        if (creature.cockTotal() == 1) {
            if (dogCocks == 1) return Appearance.cockNoun(CockTypesEnum.DOG);
            if (horseCocks == 1) return Appearance.cockNoun(CockTypesEnum.HORSE);
            if (normalCocks == 1) return creature.cockDescript(0);
            //Failsafe
            return creature.cockDescript(0);
        }
        if (currCock == 2) {
            //For cocks that are the same
            if (same) {
                descript += Appearance.randomChoice(
                    "pair of ",
                    "two ",
                    "brace of ",
                    "matching ",
                    "twin "
                );
                descript += creature.cockAdjective();
                if (normalCocks == 2)
                    descript += " " + Appearance.cockNoun(CockTypesEnum.HUMAN) + "s";
                if (horseCocks == 2)
                    descript += ", " + Appearance.cockNoun(CockTypesEnum.HORSE) + "s";
                if (dogCocks == 2) descript += ", " + Appearance.cockNoun(CockTypesEnum.DOG) + "s";
                //Failsafe
                if (creature.cocks[0].cockType.Index > 2)
                    descript += ", " + Appearance.cockNoun(creature.cocks[0].cockType) + "s";
            }
            //Nonidentical
            else {
                descript += Appearance.randomChoice("pair of ", "two ", "brace of ");
                descript += creature.cockAdjective() + ", ";
                descript += Appearance.randomChoice(
                    "mutated cocks",
                    "mutated dicks",
                    "mixed cocks",
                    "mismatched dicks"
                );
            }
        }
        if (currCock == 3) {
            //For samecocks
            if (same) {
                descript += Appearance.randomChoice(
                    "three ",
                    "group of ",
                    "<i>ménage à trois</i> of ",
                    "triad of ",
                    "triumvirate of "
                );
                descript += creature.cockAdjective();
                if (normalCocks == 3)
                    descript += " " + Appearance.cockNoun(CockTypesEnum.HUMAN) + "s";
                if (horseCocks == 3)
                    descript += ", " + Appearance.cockNoun(CockTypesEnum.HORSE) + "s";
                if (dogCocks == 3) descript += ", " + Appearance.cockNoun(CockTypesEnum.DOG) + "s";
                //Tentacles
                if (creature.cocks[0].cockType.Index > 2)
                    descript += ", " + Appearance.cockNoun(creature.cocks[0].cockType) + "s";
            } else {
                descript += Appearance.randomChoice("three ", "group of ");
                descript += creature.cockAdjective() + ", ";
                descript += Appearance.randomChoice(
                    "mutated cocks",
                    "mutated dicks",
                    "mixed cocks",
                    "mismatched dicks"
                );
            }
        }
        //Large numbers of cocks!
        if (currCock > 3) {
            descript += Appearance.randomChoice(
                "bundle of ",
                "obscene group of ",
                "cluster of ",
                "wriggling bunch of "
            );
            //Cock adjectives and nouns
            descripted = false;
            //Same
            if (same) {
                if (currCock == normalCocks) {
                    descript += creature.cockAdjective() + " ";
                    descript += Appearance.cockNoun(CockTypesEnum.HUMAN) + "s";
                    descripted = true;
                }
                if (currCock == dogCocks) {
                    descript += creature.cockAdjective() + ", ";
                    descript += Appearance.cockNoun(CockTypesEnum.DOG) + "s";
                    descripted = true;
                }
                if (currCock == horseCocks) {
                    descript += creature.cockAdjective() + ", ";
                    descript += Appearance.cockNoun(CockTypesEnum.HORSE) + "s";
                    descripted = true;
                }
                if (creature.cocks[0].cockType.Index > 2) {
                    descript += creature.cockAdjective() + ", ";
                    descript += Appearance.cockNoun(creature.cocks[0].cockType) + "s";
                    descripted = true;
                }
            }
            //If mixed
            if (!descripted) {
                descript += creature.cockAdjective() + ", ";
                descript += Appearance.randomChoice(
                    "mutated cocks",
                    "mutated dicks",
                    "mixed cocks",
                    "mismatched dicks"
                );
            }
        }
        return descript;
    }

    public static multiCockDescript(creature: Creature): string {
        if (creature.cocks.length < 1) {
            CoC_Settings.error("");
            return "<B>Error: multiCockDescript() called with no penises present.</B>";
        }
        //Get cock counts
        var descript: string = "";
        var currCock: number = 0;
        var totCock: number = creature.cocks.length;
        var dogCocks: number = 0;
        var horseCocks: number = 0;
        var normalCocks: number = 0;
        // var normalCockKey: number = 0;
        // var dogCockKey: number = 0;
        // var horseCockKey: number = 0;
        var averageLength: number = 0;
        var averageThickness: number = 0;
        var same: boolean = true;
        //For temp14 random values
        // var rando: number = 0;
        var descripted: boolean = false;
        //Count cocks & Prep average totals
        while (currCock <= totCock - 1) {
            //trace("Counting cocks!");
            if (creature.cocks[currCock].cockType == CockTypesEnum.HUMAN) {
                normalCocks++;
                // normalCockKey = currCock;
            }
            if (creature.cocks[currCock].cockType == CockTypesEnum.HORSE) {
                horseCocks++;
                // horseCockKey = currCock;
            }
            if (creature.cocks[currCock].cockType == CockTypesEnum.DOG) {
                dogCocks++;
                // dogCockKey = currCock;
            }
            averageLength += creature.cocks[currCock].cockLength;
            averageThickness += creature.cocks[currCock].cockThickness;
            //If cocks are matched make sure they still are
            if (
                same &&
                currCock > 0 &&
                creature.cocks[currCock].cockType != creature.cocks[currCock - 1].cockType
            )
                same = false;
            currCock++;
        }
        //Crunch averages
        averageLength /= currCock;
        averageThickness /= currCock;
        //Quantity descriptors
        if (currCock == 1) {
            if (dogCocks == 1) return Appearance.cockNoun(CockTypesEnum.DOG);
            if (horseCocks == 1) return Appearance.cockNoun(CockTypesEnum.HORSE);
            if (normalCocks == 1) return Appearance.cockDescript(creature, 0);
            //Catch-all for when I add more cocks.  Let cock descript do the sorting.
            if (creature.cocks.length == 1) return Appearance.cockDescript(creature, 0);
        }
        if (currCock == 2) {
            //For cocks that are the same
            if (same) {
                descript += Appearance.randomChoice(
                    "a pair of ",
                    "two ",
                    "a brace of ",
                    "matching ",
                    "twin "
                );
                descript += Appearance.cockAdjectives(
                    averageLength,
                    averageThickness,
                    creature.cocks[0].cockType,
                    creature
                );
                if (normalCocks == 2)
                    descript += " " + Appearance.cockNoun(CockTypesEnum.HUMAN) + "s";
                if (horseCocks == 2)
                    descript += ", " + Appearance.cockNoun(CockTypesEnum.HORSE) + "s";
                if (dogCocks == 2) descript += ", " + Appearance.cockNoun(CockTypesEnum.DOG) + "s";
                //Tentacles
                if (creature.cocks[0].cockType.Index > 2)
                    descript += ", " + Appearance.cockNoun(creature.cocks[0].cockType) + "s";
            }
            //Nonidentical
            else {
                descript += Appearance.randomChoice("a pair of ", "two ", "a brace of ");
                descript +=
                    Appearance.cockAdjectives(
                        averageLength,
                        averageThickness,
                        creature.cocks[0].cockType,
                        creature
                    ) + ", ";
                descript += Appearance.randomChoice(
                    "mutated cocks",
                    "mutated dicks",
                    "mixed cocks",
                    "mismatched dicks"
                );
            }
        }
        if (currCock == 3) {
            //For samecocks
            if (same) {
                descript += Appearance.randomChoice(
                    "three ",
                    "a group of ",
                    "a <i>ménage à trois</i> of ",
                    "a triad of ",
                    "a triumvirate of "
                );
                descript += Appearance.cockAdjectives(
                    averageLength,
                    averageThickness,
                    creature.cocks[currCock - 1].cockType,
                    creature
                );
                if (normalCocks == 3)
                    descript += " " + Appearance.cockNoun(CockTypesEnum.HUMAN) + "s";
                if (horseCocks == 3)
                    descript += ", " + Appearance.cockNoun(CockTypesEnum.HORSE) + "s";
                if (dogCocks == 3) descript += ", " + Appearance.cockNoun(CockTypesEnum.DOG) + "s";
                //Tentacles
                if (creature.cocks[0].cockType.Index > 2)
                    descript += ", " + Appearance.cockNoun(creature.cocks[0].cockType) + "s"; // Not sure what's going on here, referencing index *may* be a bug.
            } else {
                descript += Appearance.randomChoice("three ", "a group of ");
                descript += Appearance.cockAdjectives(
                    averageLength,
                    averageThickness,
                    creature.cocks[0].cockType,
                    creature
                );
                descript += Appearance.randomChoice(
                    ", mutated cocks",
                    ", mutated dicks",
                    ", mixed cocks",
                    ", mismatched dicks"
                );
            }
        }
        //Large numbers of cocks!
        if (currCock > 3) {
            descript += Appearance.randomChoice(
                "a bundle of ",
                "an obscene group of ",
                "a cluster of ",
                "a wriggling group of "
            );
            //Cock adjectives and nouns
            descripted = false;
            //If same types...
            if (same) {
                if (creature.cocks[0].cockType == CockTypesEnum.HUMAN) {
                    descript +=
                        Appearance.cockAdjectives(
                            averageLength,
                            averageThickness,
                            CockTypesEnum.HUMAN,
                            creature
                        ) + " ";
                    descript += Appearance.cockNoun(CockTypesEnum.HUMAN) + "s";
                    descripted = true;
                }
                if (creature.cocks[0].cockType == CockTypesEnum.DOG) {
                    descript +=
                        Appearance.cockAdjectives(
                            averageLength,
                            averageThickness,
                            CockTypesEnum.DOG,
                            creature
                        ) + ", ";
                    descript += Appearance.cockNoun(CockTypesEnum.DOG) + "s";
                    descripted = true;
                }
                if (creature.cocks[0].cockType == CockTypesEnum.HORSE) {
                    descript +=
                        Appearance.cockAdjectives(
                            averageLength,
                            averageThickness,
                            CockTypesEnum.HORSE,
                            creature
                        ) + ", ";
                    descript += Appearance.cockNoun(CockTypesEnum.HORSE) + "s";
                    descripted = true;
                }
                //TODO More group cock type descriptions!
                if (creature.cocks[0].cockType.Index > 2) {
                    descript +=
                        Appearance.cockAdjectives(
                            averageLength,
                            averageThickness,
                            CockTypesEnum.HUMAN,
                            creature
                        ) + ", ";
                    descript += Appearance.cockNoun(creature.cocks[0].cockType) + "s";
                    descripted = true;
                }
            }
            //If mixed
            if (!descripted) {
                descript +=
                    Appearance.cockAdjectives(
                        averageLength,
                        averageThickness,
                        creature.cocks[0].cockType,
                        creature
                    ) + ", ";
                // rando = Appearance.rand(4);
                descript += Appearance.randomChoice(
                    "mutated cocks",
                    "mutated dicks",
                    "mixed cocks",
                    "mismatched dicks"
                );
            }
        }
        return descript;
    }
}
