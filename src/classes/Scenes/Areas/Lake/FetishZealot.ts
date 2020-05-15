import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_LOOSE,
    ANAL_WETNESS_DRY,
    BUTT_RATING_TIGHT,
    HIP_RATING_BOYISH,
} from "../../../../includes/appearanceDefs";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class FetishZealot extends Monster {
    private static RELIGIOUS_CLOTHES = "religious clothes";
    private static PIRATE_CLOTHES = "pirate clothes";
    private static MILITARY_CLOTHES = "military clothes";
    private static LEATHER_CLOTHES = "leather clothes";
    private static STUDENTS_CLOTHES = "student's clothes";

    public combatRoundUpdate(): void {
        super.combatRoundUpdate();
        let changed = false;
        // Fetish Zealot Update!
        switch (FetishZealot.rand(5)) {
            case 0:
                // Religious outfit!
                if (this.armorName != FetishZealot.RELIGIOUS_CLOTHES) {
                    this.long =
                        "The zealot is clad in a bizarre set of religious robes.  They are similar to what you've seen on other religious leaders from home, but none of them included the large slit at the front that lets his above average sized human dick stick out of the front.";
                    this.armorName = FetishZealot.RELIGIOUS_CLOTHES;
                    changed = true;
                }
                break;
            case 1:
                // Pirate Outfit
                if (this.armorName != FetishZealot.PIRATE_CLOTHES) {
                    this.armorName = FetishZealot.PIRATE_CLOTHES;
                    this.long =
                        "You are faced with one of the strangest things you have ever seen in your life.  A stereotypical pirate, who has not replaced his hand with a hook, but rather a collection of sex toys.  You can see at least two dildos, a fleshlight, and numerous other toys that you're incapable of recognizing.";
                    changed = true;
                }
                break;
            case 2:
                // Military Uniform
                if (this.armorName != FetishZealot.MILITARY_CLOTHES) {
                    this.long =
                        "In front of you is someone wearing a green military uniform.  They obviously aren't in any military you've ever heard of, as on his shoulder he has emblazoned <i>FF Army Sex Instructor</i>.  It seems you are his latest recruit...";
                    this.armorName = FetishZealot.MILITARY_CLOTHES;
                    changed = true;
                }
                break;
            case 3:
                // Leather fetish shiiiiite
                if (this.armorName != FetishZealot.LEATHER_CLOTHES) {
                    this.long =
                        "The Zealot has taken on an appearance that seems more suitable for the level of perversion he exudes.  He is wearing a full-body suit of leather, with a cock case over his crotch; you can clearly see a large zipper on it.  The zipper handle is far bigger than you think is absolutely necessary.";
                    this.armorName = FetishZealot.LEATHER_CLOTHES;
                    changed = true;
                }
                break;
            case 4:
                // Student
                if (this.armorName != FetishZealot.STUDENTS_CLOTHES) {
                    this.long =
                        "The Zealot seems to have taken on the appearance of a young adult wearing a student uniform of sorts; of course, this isn't any less perverted than any of the other costumes this man wears.  This one includes a number of loose straps that you're certain would cause large sections of his clothes to fall off if somebody pulled on them.";
                    this.armorName = FetishZealot.STUDENTS_CLOTHES;
                    changed = true;
                }

                break;
        }
        // Talk abouts it mang!
        if (changed)
            this.outx(
                `The fetish zealot's clothing shifts and twists, until he is wearing ${this.armorName}.\n\n`,
                false
            );
        this.lust += this.lustVuln * 5;
    }

    // Special1: Tease
    // See Costumes section for text
    private zealotSpecial1(): void {
        // Costumes
        // This foe periodically switches between outfits; this determines what text is displayed when they use tease.

        // Perverted religious costume;
        if (this.armorName == FetishZealot.RELIGIOUS_CLOTHES) {
            // The zealot is clad in a bizarre set of religious robes.  They are similar to what you've seen on other religious leaders from home, but none that included the large slit at the front that lets his above average sized human dick stick out the front.
            this.outx(
                'The zealot cries out "<i>Child, are you ready to present your offering to the holy rod?</i>" while indicating his cock sliding between his robes.  The whole scene leaves you distracted for a few moments and significantly aroused.',
                false
            );
        }
        // A pirate costume;
        if (this.armorName == FetishZealot.PIRATE_CLOTHES) {
            // You are faced with one of the strangest things you have ever seen in your life.  A stereotypical pirate, who has not replaced his hand with a hook, but rather a collection of sex toys.  You can see at least two dildos, a fleshlight, and numerous other toys that you're incapable of recognizing.
            this.outx(
                "The zealot turns to the side holding his prosthetic towards you and doing something that sends the devices spinning and clicking.  <i>So that's how that would work...<i> you find yourself thinking for a few moments before realizing that he had both distracted and aroused you.",
                false
            );
        }
        // Military attire;
        if (this.armorName == FetishZealot.MILITARY_CLOTHES) {
            // In front of you is someone wearing a green military uniform.  They obviously aren't in any military you've ever heard of, as on his shoulder he has emblazoned <i>FF Army Sex Instructor</i>.  It seems you are his latest Recruit...
            this.outx('He suddenly barks, "<i>Let\'s see those genitals, soldier!</i>" ', false);
            // [player is corrupt]
            if (this.player.cor > 50)
                this.outx(
                    'You eagerly cry out "<i>Yes, sir!</i>" and show yourself off to the best of your ability.  The whole act is extremely arousing.',
                    false
                );
            // [player is not corrupt]
            else
                this.outx(
                    "You have no idea why, but you promptly display yourself in the most provocative way possible.  After a moment you realize what you're doing and quickly stop, flushed with embarrassment and arousal.",
                    false
                );
        }
        // Gimp gear;
        if (this.armorName == FetishZealot.LEATHER_CLOTHES) {
            // The Zealot has taken on an appearance that seems more suitable for the level of perversion he exudes.  He is wearing a full-body suit of leather, with a cock case over his crotch; you can clearly see a large zipper on it.  The zipper handle is far bigger than you think is absolutely necessary.
            this.outx(
                `The Zealot turns around and gives you a full view of his tight leather clad body.  He smacks his ass and says "<i>You like what you see, don't you ${this.player.mf(
                    "stud",
                    "slut"
                )}?</i>"  You can't help but be incredibly aroused by the scene.`
            );
        }
        // Well dressed and well groomed student in uniform;
        if (this.armorName == FetishZealot.STUDENTS_CLOTHES) {
            // The Zealot seems to have taken on the appearance of a young adult wearing a student uniform of sorts; of course, this isn't any less perverted than any of the other costumes this man wears.  This one includes a number of loose straps that you're certain would cause large sections of his clothes to fall off if somebody pulled on them.
            this.outx(
                "The Zealot student looks at you a little shyly and sticks a pencil in his mouth while pushing a hand in front of his groin, trying to hide a rather obvious bulge.  The whole scene is rather cute, and you feel incredibly aroused afterwards.",
                false
            );
        }
        this.game.dynStats(
            "lus",
            7 + FetishZealot.rand(this.player.lib / 20 + this.player.cor / 20)
        );
        this.combatRoundOver();
    }
    // Special2: Lust transfer spell, it becomes more and
    // more likely that he will use this power as his lust gets
    // higher, but he can use it at any time (like the cultist).
    private zealotSpecial2(): void {
        this.outx(
            "The zealot suddenly cries out and extends his arms towards you; your mind is suddenly overwhelmed with a massive wave of arousal as images of every kind of fetish you can imagine wash over you, all blended together.  After a moment you are able to recover, but you notice that the Zealot doesn't seem to be as aroused as before.",
            false
        );
        this.game.dynStats("lus", this.lust / 2);
        this.lust /= 2;
        this.combatRoundOver();
    }

    protected postAttack(damage: number): void {
        if (damage > 0) {
            this.outx(
                "\nYou notice that some kind of unnatural heat is flowing into your body from the wound",
                false
            );
            if (this.player.inte > 50)
                this.outx(", was there some kind of aphrodisiac on the knife?");
            else this.outx(".");
            this.game.dynStats("lus", this.player.lib / 20 + 5);
        }
        super.postAttack(damage);
    }

    public defeated(hpVictory: boolean): void {
        this.game.lake.fetishZealotScene.zealotDefeated();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx(
                "\n\nThe fetish cultist ignores the perverse display and continues on as if nothing had happened...",
                false
            );
            this.player.orgasm();
            this.doNext(this.game.lake.fetishZealotScene.zealotLossRape);
        } else {
            this.game.lake.fetishZealotScene.zealotLossRape();
        }
    }

    public constructor() {
        super();
        trace("FetishZealot Constructor!");

        this.a = "the ";
        this.short = "fetish zealot";
        this.imageName = "fetishzealot";
        this.long =
            "The zealot is clad in a bizarre set of religious robes.  They are similar to what you've seen on other religious leaders from home, but none that included the large slit at the front that lets his above average sized human dick stick out the front.";
        // this.plural = false;
        this.createCock(7, 1.5);
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_LOOSE;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 40, 0, 0, 0);
        this.tallness = 6 * 12;
        this.hipRating = HIP_RATING_BOYISH + 1;
        this.buttRating = BUTT_RATING_TIGHT;
        this.skinTone = "tan";
        this.hairColor = "black";
        this.hairLength = 4;
        this.initStrTouSpeInte(35, 35, 30, 1);
        this.initLibSensCor(75, 80, 90);
        this.weaponName = "wavy dagger";
        this.weaponVerb = "stab";
        this.weaponAttack = 3;
        this.armorName = FetishZealot.RELIGIOUS_CLOTHES;
        this.armorDef = 5;
        this.lust = 25;
        this.lustVuln = 0.75;
        this.temperment = FetishZealot.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 5;
        this.gems = 5 + FetishZealot.rand(10);
        this.drop = new WeightedDrop()
            .add(this.armors.C_CLOTH, 1)
            .add(this.consumables.L_DRAFT, 4)
            .add(this.weapons.L_DAGGR, 1)
            .add(undefined, 4);
        this.special1 = this.zealotSpecial1;
        this.special2 = this.zealotSpecial2;
        this.checkMonster();
    }
}
