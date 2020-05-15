import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_SLIME_DROOLING,
    BUTT_RATING_TIGHT,
    HIP_RATING_AMPLE,
    LOWER_BODY_TYPE_DEMONIC_CLAWS,
    TAIL_TYPE_DEMONIC,
    WING_TYPE_BAT_LIKE_TINY,
} from "../../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { LustyMaidensArmor } from "../../../Items/Armors/LustyMaidensArmor";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class IncubusMechanic extends Monster {
    public defeated(hpVictory: boolean): void {
        if (this.flags[kFLAGS.D3_DISCOVERED] == 0) {
            this.defeatedInDungeon1(hpVictory);
        } else {
            this.defeatedInDungeon3(hpVictory);
        }
    }

    private defeatedInDungeon1(hpVictory: boolean): void {
        this.clearOutput();
        if (hpVictory)
            this.outx(
                `You smile in satisfaction as the ${this.short} collapses, unable to continue fighting.`
            );
        else
            this.outx(
                `You smile in satisfaction as the ${this.short} collapses, masturbating happily.`
            );
        if (this.player.gender == 0) {
            this.outx(
                "  Now would be the perfect opportunity to test his demonic tool...\n\nHow do you want to handle him?"
            );
            this.game.simpleChoices(
                "Anally",
                this.game.incubusVictoryRapeBackdoor,
                "Orally",
                this.game.incubusVictoryService,
                "",
                undefined,
                "",
                undefined,
                "Leave",
                this.game.cleanupAfterCombat
            );
        } else {
            this.game.dynStats("lus", 1);
            if (hpVictory) {
                this.outx(
                    "  Now would be the perfect opportunity to put his tool to use...\n\nWhat do you do, rape him, service him, or let him take you anally?"
                );
                this.game.simpleChoices(
                    "Rape",
                    this.game.incubusVictoryRapeSex,
                    "Service Him",
                    this.game.incubusVictoryService,
                    "Anal",
                    this.game.incubusVictoryRapeBackdoor,
                    "",
                    undefined,
                    "Nothing",
                    this.game.cleanupAfterCombat
                );
            } else {
                this.outx(
                    "  Now would be the perfect opportunity to put his tool to use...\n\nWhat do you do?"
                );
                let titfuck;
                if (
                    this.player.hasVagina() &&
                    this.player.biggestTitSize() >= 4 &&
                    this.player.armorName == "lusty maiden's armor"
                ) {
                    titfuck = this.game.createCallBackFunction2(
                        (this.player.armor as LustyMaidensArmor).lustyMaidenPaizuri,
                        this.player,
                        this
                    );
                }
                this.game.simpleChoices(
                    "Rape",
                    this.game.incubusVictoryRapeSex,
                    "Service Him",
                    this.game.incubusVictoryService,
                    "Anal",
                    this.game.incubusVictoryRapeBackdoor,
                    "B.Titfuck",
                    titfuck,
                    "Nothing",
                    this.game.cleanupAfterCombat
                );
            }
        }
    }

    private defeatedInDungeon3(hpVictory: boolean): void {
        this.game.d3.incubusMechanic.beatDaMechanic(hpVictory);
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (this.flags[kFLAGS.D3_DISCOVERED] == 0) {
            this.wonInDungeon1(hpVictory, pcCameWorms);
        } else {
            this.wonInDungeon3(hpVictory, pcCameWorms);
        }
    }

    private wonInDungeon1(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nYour foe doesn't seem to care...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.incubusLossRape();
        }
    }

    private wonInDungeon3(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.d3.incubusMechanic.mechanicFuckedYouUp(hpVictory, pcCameWorms);
    }

    private cockTripAttack(): void {
        if (this.findStatusAffect(StatusAffects.Blind) >= 0) {
            // Blind dodge change
            this.outx(
                `${
                    this.capitalA + this.short
                } suddenly grows it's dick to obscene lengths and tries to trip you with it.  Thankfully he's so blind he wasn't aiming anywhere near you!`
            );
            this.game.combatRoundOver();
            return;
        }
        this.outx(
            `The incubus lunges forward in a clumsy attack that you start to side-step, only to feel something grip behind your ${this.game.buttDescript()} and pull your ${this.player.legs()} out from under you.`
        );
        if (this.player.spe - 30 > IncubusMechanic.rand(60)) {
            this.outx(
                `  You spin as you fall, twisting your ${this.player.legs()} free and springing back to your ${this.player.feet()} unharmed.`
            );
        } else {
            // Fall down go boom
            this.outx(
                `  You land hard on your ass, momentarily stunned as the demonic cock-tentacle curls around your ${this.player.legs()}, smearing them with oozing demonic fluids.`
            );
            if (this.player.lust >= 80 || this.player.cor >= 80) {
                this.outx(
                    `  Moaning with desire, you lick your lips as you slide your well-lubricated ${this.player.legs()} free.  You gather a dollop of cum and lick it seductively, winking at the incubus and hoping to make him cave into his desire.`
                );
                this.game.dynStats("lus", 13, "cor", 1);
            } else if (this.player.lust >= 50 || this.player.cor >= 50) {
                this.outx(
                    `  Blushing at the scent and feel of cum on your ${this.player.legs()}, you twist and pull free.  You find yourself wondering what this demon's dick would taste like.`
                );
                this.game.dynStats("lus", 8 + this.player.cor / 20);
            } else {
                this.outx(
                    `  Disgusted, you pull away from the purplish monstrosity, the act made easier by your well-slimed ${this.player.legs()}.`
                );
                this.game.dynStats("lus", 5 + this.player.cor / 20);
            }
            this.game.takeDamage(5);
        }
        this.outx(
            "\nThe incubus gives an overconfident smile as his cock retracts away from you, returning to its normal size."
        );
        this.game.combatRoundOver();
    }

    private spoogeAttack(): void {
        if (this.findStatusAffect(StatusAffects.Blind) >= 0) {
            // Blind dodge change
            this.outx(
                `${
                    this.capitalA + this.short
                } pumps and thrusts his hips lewdly before cumming with intense force in your direction!  Thankfully his aim was off due to the blindness currently affect him.`
            );
            this.game.combatRoundOver();
            return;
        }
        this.outx(
            "Your demonic foe places his hands behind his head and lewdly pumps and thrusts his hips at you.  Your eyes open wide as a globule of cum erupts from the demon-prick and flies right at you.  "
        );
        this.outx("You do your best to dodge, but some still lands on your ");
        switch (IncubusMechanic.rand(3)) {
            case 0: // Face
                this.outx(
                    "face.  The gooey demon-seed oozes and slides over you with a mind of its own, forcing its way into your mouth and nose!  You can feel it moving around inside you, doing its best to prepare you for its master."
                );
                this.game.dynStats("lus", 3);
                if (this.player.findStatusAffect(StatusAffects.DemonSeed) < 0)
                    this.player.createStatusAffect(StatusAffects.DemonSeed, 5, 0, 0, 0);
                else this.player.addStatusValue(StatusAffects.DemonSeed, 1, 7);
                this.player.slimeFeed();
                break;
            case 1: // Chest
                if (this.player.hasFuckableNipples()) {
                    this.outx(
                        `${this.allBreastsDescript()}.  The gooey demon-seed oozes and slides over you with a mind of its own, forcing its way into your open nipples.  You can feel it moving around inside you, doing its best to prepare you for its master.`
                    );
                    this.game.dynStats("lus", 3);
                    if (this.player.findStatusAffect(StatusAffects.DemonSeed) < 0)
                        this.player.createStatusAffect(StatusAffects.DemonSeed, 5, 0, 0, 0);
                    else this.player.addStatusValue(StatusAffects.DemonSeed, 1, 8);
                    this.player.slimeFeed();
                } else
                    this.outx(
                        `${this.allBreastsDescript()}.  Thankfully it doesn't seem to have much effect.`
                    );
                break;
            default:
                // Crotch
                if (this.player.vaginas.length > 0) {
                    this.outx(
                        `crotch.  The gooey demon-seed oozes and slides over you with a mind of its own, forcing its way past your ${
                            this.player.armorName
                        } and into your ${this.vaginaDescript(
                            0
                        )}.  You can feel it moving around inside you, doing its best to prepare you for its master.`
                    );
                    this.game.dynStats("lus", 3);
                    if (this.player.findStatusAffect(StatusAffects.DemonSeed) < 0)
                        this.player.createStatusAffect(StatusAffects.DemonSeed, 5, 0, 0, 0);
                    else this.player.addStatusValue(StatusAffects.DemonSeed, 1, 8);
                    this.player.slimeFeed();
                } else this.outx("crotch.  Thankfully, it doesn't seem to have much effect.");
        }
        this.game.combatRoundOver();
        this.lust -= 10;
        if (this.lust < 0) this.lust = 10;
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "incubus mechanic";
        this.imageName = "incubusmechanic";
        this.long =
            "The demon before you is clad only in cut-off denim overalls.  Covered in stains of oil and other strange fluids, they appear to be in pretty rough shape.  There is a large hole ripped in the crotch, allowing the demon's foot-long member to hang free.  His skin is light purple and perfect, contrasting with the slovenly appearance of his clothing.  His face is rugged and handsome, topped with a simple black ponytail and two large horns that sprout from his forehead like twisted tree-trunks.  He wears a narrow goatee on his chin that is kept skillfully braided.  A cocky smile always seems to grace his features, giving him an air of supreme confidence.";
        // this.plural = false;
        this.createCock(12, 1.75, CockTypesEnum.DEMON);
        this.balls = 2;
        this.ballSize = 2;
        this.cumMultiplier = 3;
        // this.hoursSinceCum = 0;
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;
        this.tallness = IncubusMechanic.rand(9) + 70;
        this.hipRating = HIP_RATING_AMPLE;
        this.buttRating = BUTT_RATING_TIGHT;
        this.lowerBody = LOWER_BODY_TYPE_DEMONIC_CLAWS;
        this.skinTone = "light purple";
        this.hairColor = "black";
        this.hairLength = 12;
        this.initStrTouSpeInte(65, 40, 45, 85);
        this.initLibSensCor(80, 70, 80);
        this.weaponName = "claws";
        this.weaponVerb = "claw";
        this.weaponAttack = 10;
        this.weaponPerk = "";
        this.weaponValue = 150;
        this.armorName = "demonic skin";
        this.armorDef = 10;
        this.bonusHP = 150;
        this.lust = 50;
        this.lustVuln = 0.5;
        this.temperment = IncubusMechanic.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 8;
        this.gems = IncubusMechanic.rand(25) + 10;
        this.drop = new WeightedDrop(this.consumables.GROPLUS, 1);
        this.special1 = this.cockTripAttack;
        this.special2 = this.spoogeAttack;
        this.tailType = TAIL_TYPE_DEMONIC;
        this.wingType = WING_TYPE_BAT_LIKE_TINY;
        this.wingDesc = "tiny hidden";
        this.checkMonster();
    }
}
