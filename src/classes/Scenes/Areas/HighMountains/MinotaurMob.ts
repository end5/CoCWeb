import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_NORMAL,
    BUTT_RATING_AVERAGE,
    FACE_COW_MINOTAUR,
    HIP_RATING_AVERAGE,
    LOWER_BODY_TYPE_HOOFED,
    SKIN_TYPE_FUR,
    TAIL_TYPE_COW,
} from "../../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

/**
 * ...
 *
 * @author ...
 */
export class MinotaurMob extends Monster {
    private precumTease(): void {
        let teased = false;
        let damage = 0;
        const oldLust: number = this.player.lust;
        this.game.spriteSelect(94);
        // (Big taur pre-cum tease)
        if (MinotaurMob.rand(2) == 0) {
            teased = true;
            if (MinotaurMob.rand(5) > 0) {
                this.outx(
                    'The biggest lifts his loincloth, giving you a perfect view of his veiny hardness.  Pre-cum visibly bubbles from his flared tip, splattering wetly on the rocks and filling the air with his bestial musk.  He says, "<i>See how much I need you?</i>"\n',
                    false
                );
                damage = 7 + this.player.lib / 20;
            }
            // crit)
            else {
                this.outx(
                    "The largest bull in the crowd flaps his cum-soaked loincloth up and wraps a massive, muscled hand around his incredible erection.  Shaking it back and forth, he flicks his bubbling pre-cum in your direction, letting it spatter noisily against the rocks around you.  A few droplets even land on your skin, fogging the air with minotaur pheromones.\n",
                    false
                );
                damage = 13 + this.player.lib / 20;
            }
        }
        // (Middle Taur pre-cum tease)
        if (MinotaurMob.rand(2) == 0) {
            teased = true;
            if (MinotaurMob.rand(5) > 0) {
                this.outx(
                    '"<i>Hey, slut, look at this!</i>" taunts one of the beast-men.  He shakes his hips lewdly, spinning his thick horse-cock in wide circles and sending his potent pre flying through the air.  Droplets rain down around you, filling the air with even more of that delicious smell.\n',
                    false
                );
                damage = 3 + this.player.lib / 30;
            } else {
                this.outx(
                    '"<i>Mom, you may as well spread your thighs now, I got a treat for ya!</i>" announces a well-built minotaur.  He shifts his coverings and pumps on his swollen shaft, tugging hard enough over the iron-hard erection to blast out huge blobs of pre-seed in your direction.  ',
                    false
                );
                if (this.player.spe / 5 + MinotaurMob.rand(20) > 20) {
                    this.outx(
                        "You avoid most of them, the blobs splattering against the mountain and still getting a little on you.  Regardless, the air stinks of their heavy spunk.",
                        false
                    );
                    damage = 6 + this.player.lib / 20;
                } else {
                    this.outx(
                        "You try to avoid them, but one catches you in the face, a little getting into your mouth.  You swallow it reflexively and salivate some more, your eyes darting to look at the stained rocks around you.  Are you really considering licking it up from the ground?",
                        false
                    );
                    damage = 15 + this.player.lib / 20;
                }
            }
            this.outx("\n", false);
        }
        // (Minitaur pre-cum tease)
        if (!teased || MinotaurMob.rand(3) == 0) {
            this.outx(
                "The smallest of the beastmen, the minitaur, moans and begs, \"<i>Please Mom, can we please fuck you?  I... I need it so bad.</i>\"  He raises the edge of his loincloth to show exactly what he's talking about.  His member is limp but leaking.  What really catches your eyes sits behind that drizzling shaft - a pair of balls looking swollen and pent up beyond belief.  A sticky web of his leavings hangs between his genitals and his loincloth, showing you just how much he's been leaking at the thought of fucking you.  Fanning the sopping garment, he inadvertently blows a wave of his pheromones your way.\n",
                false
            );
            damage = 9 + this.player.lib / 20;
        }
        this.game.dynStats("lus", damage);
        damage = this.player.lust - oldLust;
        // UNIVERSAL pre-cum RESULT:
        // (Low damage taken)
        if (damage <= 8) {
            this.outx(
                "Though your body is tingling from the show the horny beasts are giving you, it doesn't effect you as much as it could have.",
                false
            );
            if (this.player.lust > 99) this.outx("  Still, you're too horny to fight any longer.");
        }
        // (Medium damage taken)
        else if (damage <= 14) {
            this.outx(
                `The powerful pheromones and scents hanging in the air around you make your body flush hotly.  Your ${this.player.nippleDescript(
                    0
                )}s grow harder`
            );
            if (this.player.lust > 70)
                this.outx(", though you didn't think such a thing was possible");
            else
                this.outx(
                    `, feeling like two bullets scraping along the inside of your ${this.player.armorName}`
                );
            this.outx(
                ", but it... it could have been worse.  You shudder as a little fantasy of letting them dribble it all over your body works through your mind.",
                false
            );
            if (this.player.lust > 99)
                this.outx("  Fuck it, they smell so good.  You want, no, NEED more.");
            else this.outx("  A growing part of you wants to experience that.");
        }
        // (high damage taken)
        else {
            this.outx("All that potent pre-ejaculate makes your cunny ");
            if (this.player.wetness() <= 1) this.outx("moisten");
            else if (this.player.wetness() <= 2) this.outx("drip");
            else if (this.player.wetness() <= 3) this.outx("drool");
            else this.outx("juice itself");
            this.outx(" in need.");
            if (this.player.minotaurNeed()) {
                this.outx("  You need a fix so bad!");
                this.game.dynStats("lus", 5);
            } else {
                this.outx(
                    "  You can understand firsthand just how potent and addictive that fluid is...",
                    false
                );
            }
            if (this.player.hasCock())
                this.outx(
                    `  ${this.SMultiCockDesc()} twitches and dribbles its own pre-seed, but it doesn't smell anywhere near as good!`
                );
            this.outx(
                "  Shuddering and moaning, your body is wracked by ever-increasing arousal.  Fantasies of crawling under the beast-men's soaked legs and lapping at their drooling erections inundate your mind, your body shivering and shaking in response.  ",
                false
            );
            if (this.player.lust <= 99)
                this.outx(
                    "You pull back from the brink with a start.  It'll take more than a little drugged pre-cum to bring you down!",
                    false
                );
            else
                this.outx(
                    "You sigh and let your tongue loll out.  It wouldn't so bad, would it?",
                    false
                );
        }
        this.combatRoundOver();
    }

    // Grope
    private minotaurGangGropeAttack(): void {
        this.game.spriteSelect(94);
        this.outx(
            `Strong hands come from behind and slide under your equipment to squeeze your ${this.chestDesc()}.  The brutish fingers immediately locate and pinch at your ${this.nippleDescript(
                0
            )}s, the sensitive flesh on your chest lighting up with pain and pleasure.  You arch your back in surprise, utterly stunned by the violation of your body.  After a moment you regain your senses and twist away, but the damage is already done.  You're breathing a bit quicker now`
        );
        if (this.player.lust >= 80) this.outx(", and your pussy is absolutely soaking wet");
        this.outx(".");
        this.game.dynStats("lus", 5 + this.player.sens / 10);
        this.combatRoundOver();
    }
    // Gang Grope
    private minotaurGangGangGropeAttack(): void {
        this.game.spriteSelect(94);
        this.outx(
            `Before you can react, hands reach out from multiple angles and latch onto your body.  One pair squeezes at your ${this.game.buttDescript()}, the strong grip massaging your cheeks with loving touches.  Another set of hands are sliding along your tummy, reaching down for, but not quite touching, the juicy delta below.  Palms encircle your ${this.player.chestDesc()} and caress them, gently squeezing in spite of the brutish hands holding you.  You wriggle and squirm in the collective grip of the many minotaurs for a few moments, growing more and more turned on by the treatment.  At last, you shake out of their hold and stand free, panting hard from exertion and desire.`
        );
        this.game.dynStats("lus", 15 + this.player.sens / 10);
        this.combatRoundOver();
    }
    // Waste  a turn
    private minotaurGangWaste(): void {
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00329] = 1;
        this.game.spriteSelect(94);
        this.outx(
            "\"<i>Oh man I can't wait to go hilt-deep in that pussy... I'm going to wreck her,</i>\" promises one bull to his brother.  The other laughs and snorts, telling him how he'll have to do the deed during sloppy seconds.  It quickly escalates, and soon, every single one of the beast-men is taunting the others, bickering over how and when they'll get to have you.  While they're wasting their time, it's your chance to act!",
            false
        );
        this.combatRoundOver();
    }

    public doAI(): void {
        this.game.spriteSelect(94);
        this.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00329] = 0;
        const select: number = MinotaurMob.rand(7);
        if (select <= 2) this.precumTease();
        else if (select <= 4) this.minotaurGangGropeAttack();
        else if (select == 5) this.minotaurGangGangGropeAttack();
        else this.minotaurGangWaste();
    }

    public defeated(hpVictory: boolean): void {
        this.game.highMountains.minotaurMobScene.victoryMinotaurGang();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx(
                "\n\nThe minutaurs share a laugh while you cum, but their throbbing erections don't subside in the slightest."
            );
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.highMountains.minotaurMobScene.minotaurDeFeet();
        }
    }

    public constructor() {
        super();
        this.a = "the ";
        if (this.game.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] < 20) this.short = "minotaur gang";
        else this.short = "minotaur tribe";
        this.imageName = "minotaurmob";
        this.long = `${MinotaurMob.Num2Text(
            this.game.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326]
        )} shaggy beastmen stand around you in a loose circle.  Their postures aren't exactly threatening.  If anything, they seem to be standing protectively around you, as if their presence would somehow shelter you from the rest of the mountain.  All of their features share a brotherly similarity, though there's still a fair bit of differences between your minotaur sons.  One of them is a head above the rest, a massive hulk of muscle so big he seems to dwarf the rest.  In stark contrast, a feminine minitaur keeps his distance in the rear.${
            this.game.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] >= 20
                ? "  The tribe constantly makes hoots and cat-calls, fully expecting to be fucking you soon."
                : ""
        }`;
        this.plural = true;
        this.pronoun1 = "they";
        this.pronoun2 = "them";
        this.pronoun3 = "their";
        this.createCock(MinotaurMob.rand(13) + 24, 2 + MinotaurMob.rand(3), CockTypesEnum.HORSE);
        this.balls = 2;
        this.ballSize = 2 + MinotaurMob.rand(13);
        this.cumMultiplier = 1.5;
        this.hoursSinceCum = this.ballSize * 10;
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_NORMAL;
        this.createStatusAffect(StatusAffects.BonusACapacity, 30, 0, 0, 0);
        this.tallness = MinotaurMob.rand(37) + 84;
        this.hipRating = HIP_RATING_AVERAGE;
        this.buttRating = BUTT_RATING_AVERAGE + 1;
        this.lowerBody = LOWER_BODY_TYPE_HOOFED;
        this.skinTone = "red";
        this.skinType = SKIN_TYPE_FUR;
        this.skinDesc = "shaggy fur";
        this.hairColor = MinotaurMob.randomChoice("black", "brown");
        this.hairLength = 3;
        this.faceType = FACE_COW_MINOTAUR;
        this.initStrTouSpeInte(65, 60, 30, 20);
        this.initLibSensCor(40, 15, 35);
        this.weaponName = "fists";
        this.weaponVerb = "punches";
        this.armorName = "thick fur";
        const bonusHP: number = 340 + 50 * (this.game.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] - 3);
        let lustVuln = 0.45;
        if ((this.game.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] - 3) * 2 > 13) lustVuln = 0.3;
        else lustVuln -= (this.game.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] - 3) * 0.02;
        this.bonusHP = bonusHP;
        this.lust = 30;
        this.lustVuln = lustVuln;
        this.temperment = MinotaurMob.TEMPERMENT_LUSTY_GRAPPLES;
        let level: number =
            11 + Math.round((this.game.flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00326] - 3) / 2);
        if (level > 14) level = 14;
        this.level = level;
        this.gems = MinotaurMob.rand(15) + 45;
        this.tailType = TAIL_TYPE_COW;
        this.special1 = this.game.mountain.minotaurScene.minoPheromones;
        this.drop = this.NO_DROP;
        this.checkMonster();
    }
}
