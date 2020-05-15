import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_SLIME_DROOLING,
    BUTT_RATING_LARGE,
    HIP_RATING_AMPLE,
    LOWER_BODY_TYPE_GOO,
    SKIN_TYPE_GOO,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_WETNESS_SLAVERING,
} from "../../../../includes/appearanceDefs";
import { ChainedDrop } from "../../../internals/ChainedDrop";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

export class GooGirl extends Monster {
    /* Fight-
     You are fighting a goo-girl.
     The goo-girl has a curious expression on her youthful, shimmering face. Her body is slender and globs of slime regularly drip from her limbs, splattering into the goo puddle pooling beneath her hips. A small, heart-shaped nucleus pulses in her chest with a red glow. [if the player has a c-cup or larger chest: She has apparently made herself a bit more like you, as her chest appears to be a perfect copy of your " + biggestBreastSizeDescript()+ ".]
     */

    // [Goo attacks]
    // Slap – The slime holds its hands up and they morph into a replica of your " + weaponName + ". Happily, she swings at you, painfully smacking her gooey limbs against your head.  You shake your " + hairDescript() + ", clearing your head of the dazing slap. (lightly damages hit points)
    // Acid Slap (Only after player's fire attack) – Her body quivering from your flames, the goo-girl delivers a painful slap across your cheek. You gasp when the light stinging becomes a searing burn that seems to get worse as time goes on! (heavily damages hit points and puts Acid Burn on the player)
    private gooGalAttack(): void {
        let damage = 0;
        // return to combat menu when finished
        this.doNext(this.game.playerMenu);
        if (this.findPerk(PerkLib.Acid) >= 0)
            this.outx("Her body quivering from your flames, the goo-girl ");
        else
            this.outx(
                `The slime holds its hands up and they morph into a replica of your ${this.player.weaponName}.  Happily, she swings at you`
            );
        // Determine if dodged!
        if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            if (this.findPerk(PerkLib.Acid) >= 0)
                this.outx("tries to slap you, but you dodge her attack.");
            else this.outx(", missing as you dodge aside.");
            return;
        }
        // Determine if evaded
        if (
            this.short != "Kiha" &&
            this.player.findPerk(PerkLib.Evade) >= 0 &&
            GooGirl.rand(100) < 10
        ) {
            if (this.findPerk(PerkLib.Acid) >= 0)
                this.outx("tries to slap you, but you evade her attack.");
            else this.outx(", but you evade the clumsy attack.");
            return;
        }
        // ("Misdirection"
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            GooGirl.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            if (this.findPerk(PerkLib.Acid) >= 0)
                this.outx("tries to slap you.  You misdirect her, avoiding the hit.");
            else this.outx(", missing as you misdirect her attentions.");
            return;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && GooGirl.rand(100) < 6) {
            if (this.findPerk(PerkLib.Acid) >= 0)
                this.outx("tries to slap you, but misses due to your cat-like evasion.");
            else this.outx(", missing due to your cat-like evasion.");
            return;
        }
        // Determine damage - str modified by enemy toughness!
        if (this.findPerk(PerkLib.Acid) >= 0)
            damage = Math.floor(
                this.str +
                    10 +
                    this.weaponAttack -
                    GooGirl.rand(this.player.tou) -
                    this.player.armorDef
            );
        else
            damage = Math.floor(
                this.str + this.weaponAttack - GooGirl.rand(this.player.tou) - this.player.armorDef
            );
        if (damage > 0) damage = this.player.takeDamage(damage);
        if (damage <= 0) {
            damage = 0;
            if (this.findPerk(PerkLib.Acid) >= 0) {
                if (GooGirl.rand(this.player.armorDef + this.player.tou) < this.player.armorDef)
                    this.outx(
                        `tries to slap you, but the acid-bearing slap spatters weakly off your ${this.player.armorName}.`
                    );
                else
                    this.outx(
                        "tries to slap you with an acid-loaded hand, but it splatters off you ineffectually.",
                        false
                    );
            } else {
                // Due to toughness or amor...
                if (GooGirl.rand(this.player.armorDef + this.player.tou) < this.player.armorDef)
                    this.outx(
                        `, her attack slapping fruitlessly against your ${this.player.armorName}.`
                    );
                else this.outx(", her attack splattering ineffectually against you.");
            }
        }
        // everyone else
        else {
            if (this.findPerk(PerkLib.Acid) >= 0) {
                this.outx(
                    "delivers a painful slap across your cheek.  You gasp when the light stinging becomes a searing burn that seems to get worse as time goes on!",
                    false
                );
                if (this.player.findStatusAffect(StatusAffects.AcidSlap) < 0)
                    this.player.createStatusAffect(StatusAffects.AcidSlap, 0, 0, 0, 0);
            } else
                this.outx(
                    `, painfully smacking her gooey limbs against your head.  You shake your ${this.player.hairDescript()}, clearing your head of the dazing slap.`
                );
            this.outx(` (${damage})`);
        }
        if (damage > 0) {
            if (this.lustVuln > 0 && this.player.armorName == "barely-decent bondage straps") {
                if (!this.plural)
                    this.outx(
                        `\n${this.capitalA}${this.short} brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.`,
                        false
                    );
                else
                    this.outx(
                        `\n${this.capitalA}${this.short} brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.`,
                        false
                    );
                this.lust += 5 * this.lustVuln;
            }
        }
        this.statScreenRefresh();
        this.outx("\n", false);
        this.combatRoundOver();
    }

    // Play –
    private gooPlay(): void {
        this.outx(
            "The goo-girl lunges, wrapping her slimy arms around your waist in a happy hug, hot muck quivering excitedly against you. She looks up, empty eyes confused by your lack of enthusiasm and forms her mouth into a petulant pout before letting go.  You shiver in the cold air, regretting the loss of her embrace.",
            false
        );
        this.game.dynStats("lus", 3 + GooGirl.rand(3) + this.player.sens / 10);
        this.combatRoundOver();
    }

    // Throw –
    private gooThrow(): void {
        this.outx(
            `The girl reaches into her torso, pulls a large clump of goo out, and chucks it at you like a child throwing mud. The slime splatters on your chest and creeps under your ${this.player.armorName}, tickling your skin like fingers dancing across your body.`
        );
        const damage = 1;
        this.player.takeDamage(damage);
        this.game.dynStats("lus", 5 + GooGirl.rand(3) + this.player.sens / 10);
        this.combatRoundOver();
    }

    // Engulf –
    private gooEngulph(): void {
        this.outx(
            `The goo-girl gleefully throws her entire body at you and, before you can get out of the way, she has engulfed you in her oozing form! Tendrils of ${this.skinTone} slime slide up your nostrils and through your lips, filling your lungs with the girl's muck. You begin suffocating!`
        );
        if (this.player.findStatusAffect(StatusAffects.GooBind) < 0)
            this.player.createStatusAffect(StatusAffects.GooBind, 0, 0, 0, 0);
        this.combatRoundOver();
    }

    protected performCombatAction(): void {
        // 1/3 chance of base attack + bonus if in acid mode
        if ((this.findPerk(PerkLib.Acid) >= 0 && GooGirl.rand(3) == 0) || GooGirl.rand(3) == 0)
            this.gooGalAttack();
        else if (GooGirl.rand(5) == 0) this.gooEngulph();
        else if (GooGirl.rand(3) == 0) this.gooPlay();
        else this.gooThrow();
    }

    public defeated(hpVictory: boolean): void {
        this.game.lake.gooGirlScene.beatUpGoo();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nThe goo-girl seems confused but doesn't mind.");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.lake.gooGirlScene.getBeatByGooGirl();
        }
    }

    public teased(lustDelta: number): void {
        if (this.lust <= 99) {
            if (lustDelta <= 0)
                this.outx(
                    "\nThe goo-girl looks confused by your actions, as if she's trying to understand what you're doing.",
                    false
                );
            else if (lustDelta < 13)
                this.outx(
                    "\nThe curious goo has begun stroking herself openly, trying to understand the meaning of your actions by imitating you.",
                    false
                );
            else
                this.outx(
                    "\nThe girl begins to understand your intent. She opens and closes her mouth, as if panting, while she works slimy fingers between her thighs and across her jiggling nipples.",
                    false
                );
        } else
            this.outx(
                `\nIt appears the goo-girl has gotten lost in her mimicry, squeezing her breasts and jilling her shiny ${this.skinTone} clit, her desire to investigate you forgotten.`,
                false
            );
        this.applyTease(lustDelta);
    }

    public constructor(noInit = false) {
        super();
        if (noInit) return;
        const playerHasBigBoobs: boolean = this.player.biggestTitSize() >= 3;
        this.a = "the ";
        this.short = "goo-girl";
        this.imageName = "googirl";
        this.long = `The goo-girl has a curious expression on her youthful, shimmering face. Her body is slender and globs of slime regularly drip from her limbs, splattering into the goo puddle pooling beneath her hips. A small, heart-shaped nucleus pulses in her chest with a red glow.${
            playerHasBigBoobs
                ? `  She has apparently made herself a bit more like you, as her chest appears to be a perfect copy of your ${this.player.chestDesc()}.`
                : ""
        }`;
        // this.long = false;
        this.createVagina(false, VAGINA_WETNESS_SLAVERING, VAGINA_LOOSENESS_NORMAL);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 9001, 0, 0, 0);
        this.createBreastRow(playerHasBigBoobs ? this.player.biggestTitSize() : 3);
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;
        this.createStatusAffect(StatusAffects.BonusACapacity, 9001, 0, 0, 0);
        this.tallness = GooGirl.rand(8) + 70;
        this.hipRating = HIP_RATING_AMPLE;
        this.buttRating = BUTT_RATING_LARGE;
        this.lowerBody = LOWER_BODY_TYPE_GOO;
        const tone: string = GooGirl.randomChoice("blue", "purple", "crystal");
        this.skinTone = tone;
        this.skinType = SKIN_TYPE_GOO;
        // this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_GOO];
        this.skinAdj = "goopey";
        this.hairColor = tone;
        this.hairLength = 12 + GooGirl.rand(10);
        this.initStrTouSpeInte(25, 25, 20, 30);
        this.initLibSensCor(50, 40, 10);
        this.weaponName = "hands";
        this.weaponVerb = "slap";
        this.armorName = "gelatinous skin";
        this.bonusHP = 40;
        this.lust = 45;
        this.lustVuln = 0.75;
        this.temperment = GooGirl.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 3;
        this.gems = GooGirl.rand(5) + 1;
        this.drop = new ChainedDrop()
            .add(this.weapons.PIPE, 1 / 10)
            .add(this.consumables.WETCLTH, 1 / 2)
            .elseDrop(this.useables.GREENGL);
        /* These are actually green slime functions and were never called in GooGirl due to override of performCombatAction
                    this.special1 = 5040;
                    this.special2 = 5039;
                    this.special3 = 5039;
        */
        this.checkMonster();
    }

    // Color types are presented as [Blue slimes/Purple Slimes/Clear Slimes]
    public gooColor(): string {
        // blue, purple, or crystal
        return this.skinTone;
    }

    // [azure/plum/crystalline]
    public gooColor2(): string {
        if (this.skinTone == "blue") return "azure";
        else if (this.skinTone == "purple") return "plum";
        else return "crystalline";
    }

    // [cerulean/violet/clear]
    public gooColor3(): string {
        if (this.skinTone == "blue") return "cerulean";
        else if (this.skinTone == "purple") return "violet";
        else return "clear";
    }

    // [teal/lavender/glassy]
    public gooColor4(): string {
        if (this.skinTone == "blue") return "teal";
        else if (this.skinTone == "purple") return "lavender";
        else return "glassy";
    }

    // [sapphire/amethyst/diamond]
    public gooColor5(): string {
        if (this.skinTone == "blue") return "sapphire";
        else if (this.skinTone == "purple") return "amethyst";
        else return "diamond";
    }

    // [lapis/periwinkle/pure]
    public gooColor6(): string {
        if (this.skinTone == "blue") return "sapphire";
        else if (this.skinTone == "purple") return "amethyst";
        else return "diamond";
    }

    // [blue berry/grape/crystal]
    public gooColor7(): string {
        if (this.skinTone == "blue") return "blueberry";
        else if (this.skinTone == "purple") return "grape";
        else return "crystal";
    }

    // [aquamarine/plum/transparent]
    public gooColor8(): string {
        if (this.skinTone == "blue") return "aquamarine";
        else if (this.skinTone == "purple") return "plum";
        else return "transparent";
    }

    // [an aquamarine/a lilac/a translucent]
    public gooColor9(): string {
        if (this.skinTone == "blue") return "an aquamarine";
        else if (this.skinTone == "purple") return "a plum";
        else return "a translucent";
    }

    // [blueberries/grapes/strawberries]
    public gooColor10(): string {
        if (this.skinTone == "blue") return "blueberries";
        else if (this.skinTone == "purple") return "grapes";
        else return "strawberries";
    }

    // [cerulean tint/violet tint/clear body]
    public gooColor11(): string {
        if (this.skinTone == "blue") return "cerulean tint";
        else if (this.skinTone == "purple") return "violet tint";
        else return "clear body";
    }
}
