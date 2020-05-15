import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";

// Calls are now made through kGAMECLASS rather than thisPtr. This allows the compiler to detect if/when a function is inaccessible.

// PRONOUNS: The parser uses Elverson/Spivak Pronouns specifically to allow characters to be written with non-specific genders.
// http://en.wikipedia.org/wiki/Spivak_pronoun
//
// Cheat Table:
//           | Subject    | Object       | Possessive Adjective | Possessive Pronoun | Reflexive         |
// Agendered | ey laughs  | I hugged em  | eir heart warmed     | that is eirs       | ey loves emself   |
// Masculine | he laughs  | I hugged him | his heart warmed     | that is his        | he loves himself  |
// Feminine  | she laughs | I hugged her | her heart warmed     | that is hers       | she loves herself |

// (Is it bad that half my development time so far has been researching non-gendered nouns? ~~~~Fake-Name)

export const arianLookups =
    // For subject: "arian"
    {
        man(): string {
            return kGAMECLASS.arianScene.arianMF("man", "woman");
        },
        // argh! "Man" is the mass-noun for humanity, and I'm loathe to choose an even more esoteric variant.
        // Elverson/Spivak terminology is already esoteric enough, and it lacks a ungendered mass noun.

        ey(): string {
            return kGAMECLASS.arianScene.arianMF("he", "she");
        },
        em(): string {
            return kGAMECLASS.arianScene.arianMF("him", "her");
        },
        eir(): string {
            return kGAMECLASS.arianScene.arianMF("his", "her");
        },
        eirs(): string {
            return kGAMECLASS.arianScene.arianMF("his", "hers");
        },
        emself(): string {
            return kGAMECLASS.arianScene.arianMF("himself", "herself");
        },

        chestadj(): string {
            return kGAMECLASS.arianScene.arianChestAdjective();
        },
        chest(): string {
            return kGAMECLASS.arianScene.arianChest();
        },
    };
// Arian unhandled terms (I have not decided how to support them yet):
// arianMF("mas","mis")
// arianMF("master","mistress")
// arianMF("male","girly")

export const rubiLookups =
    // For subject: "rubi"
    {
        man(): string {
            return kGAMECLASS.telAdre.rubi.rubiMF("man", "woman");
        },

        ey(): string {
            return kGAMECLASS.telAdre.rubi.rubiMF("he", "she");
        },
        em(): string {
            return kGAMECLASS.telAdre.rubi.rubiMF("him", "her");
        },
        eir(): string {
            return kGAMECLASS.telAdre.rubi.rubiMF("his", "her");
        },
        eirs(): string {
            return kGAMECLASS.telAdre.rubi.rubiMF("his", "hers");
        },
        emself(): string {
            return kGAMECLASS.telAdre.rubi.rubiMF("himself", "herself");
        },

        cock(): string {
            return kGAMECLASS.telAdre.rubi.rubiCock();
        },
        breasts(): string {
            return kGAMECLASS.telAdre.rubi.rubiBreasts();
        },
    };
// Rubi unhandled terms :
// rubiMF("boy","girl")
// rubiMF("demon","demoness")
// rubiMF("gentleman","lady")
