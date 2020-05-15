import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_DRY,
    BUTT_RATING_LARGE,
    HIP_RATING_AMPLE,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_WETNESS_DROOLING,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { StatusAffects } from "../../../StatusAffects";
import { Goblin } from "../../Monsters/Goblin";

export class Tamani extends Goblin {
    protected goblinTeaseAttack(): void {
        if (this.flags[kFLAGS.TAMANI_TIMES_HYPNOTISED] > 0) {
            this.tamaniHypnoTease();
            return;
        }
        super.goblinTeaseAttack();
    }

    // New Tease option:
    public tamaniHypnoTease(): void {
        let selector: number = Tamani.rand(3);
        // Choose 1 of 3 variations
        if (selector == 0)
            this.outx(
                'Tamani smiles and shifts her leather straps, pulling one into the puffy gash that is her vagina.  She groans out loud, sliding the studded leather band into her outer lips and sawing it along her clit.  Her whole body blushes as she pulls it free, running a fingertip up the now wet strip of leather, "<i>Mmm, can\'t you see how much my pussy needs a man inside it?  Be a good husband and fuck Tamani full!  You know you want to.</i>"\n\n',
                false
            );
        if (selector == 1)
            this.outx(
                'Tamani saunters up to you, sliding her fingers down to each side of her pussy and spreading them.  Your eyes are drawn to her honeyed tunnel, unable to look away she gets closer.  She whispers, "<i>Your cock knows what it needs.  Just be a good husband and obey your dick, it KNOWS how badly you need mistress\'s pussy.</i>"\n\n',
                false
            );
        if (selector == 2)
            this.outx(
                "Tamani turns around and bends down, pressing her hands into the dirt as she kicks her legs apart.  Your stare open-mouthed at her bouncy ass-cheeks and the tantalizingly wet entrance of her slit.  She smirks and offers, \"<i>You've cum so many times inside me, why resist when you can give in and feel that pleasure again today?  Come on husband, don't make Tamani beg...</i>\"\n\n",
                false
            );

        // REACTIONS
        // LOW HYPNO VALUE:
        if (this.flags[kFLAGS.TAMANI_TIMES_HYPNOTISED] < 5) {
            selector = Tamani.rand(3);
            if (selector == 0)
                this.outx(
                    "You reluctantly pull your stare away from the heavenly entrance between her legs.  There's an urge to walk over to her and plunge yourself inside her over and over, but you dismiss it.",
                    false
                );
            if (selector == 1)
                this.outx(
                    "You find it hard to pull your gaze from her inviting twat, but you manage.  You shake your head, clearing away thoughts of fertilizing your wife.  Her rhetoric must be getting to you.",
                    false
                );
            if (selector == 2)
                this.outx(
                    "No matter the case, her actions shifted a fair bit of your blood-flow to your groin.",
                    false
                );
        }
        // MEDIUM HYPNO VALUE:
        else if (this.flags[kFLAGS.TAMANI_TIMES_HYPNOTISED] < 10) {
            selector = Tamani.rand(2);
            if (selector == 0) {
                this.outx(
                    "With effort you manage to wrench your eyes away from the inviting folds of Tamani's vagina.  ",
                    false
                );
                if (this.player.totalCocks() > 1) this.outx("Each of y");
                else this.outx("Y");
                this.outx(`our ${this.multiCockDescriptLight()}`);
                if (this.player.lust > 80) this.outx(" drips pre-cum");
                else if (this.player.lust > 40) this.outx(" grows harder");
                else this.outx(" hardens");
                this.outx(
                    " from the sexual sight, and you feel a compulsion to rush to your wife and take her on the spot.  Obviously she's not really your wife, but after so many fuckings it kind of makes sense to think of her that way.",
                    false
                );
                if (this.player.lust < 70)
                    this.outx("  Still, you don't want to fuck her right now!");
            } else {
                this.outx(
                    "Struggling, you pull your eyes back into your head and away from Tamani's gorgeous slit.  You shudder, feeling ",
                    false
                );
                if (this.player.totalCocks() > 1) this.outx("each of ");
                this.outx(`your ${this.player.multiCockDescriptLight()}`);
                if (this.player.lust <= 41) this.outx(" thicken perceptibly");
                else if (this.player.lust <= 81) this.outx(" twitch eagerly");
                else this.outx("drip pre-cum");
                this.outx(
                    ", responding to the overly sensual goblin's body.  You start to approach her, but stop yourself, realizing you were about to pick up your wife and fuck her on the spot.  You know she's not really your wife, but you have a hard time thinking of her as anything else, save for maybe your mistress.",
                    false
                );
                if (this.player.lust < 70)
                    this.outx(
                        "  Regardless, you're resolute in your desire not to fuck her right now!",
                        false
                    );
            }
        }
        // HIGH HYPNO VALUE
        else {
            selector = Tamani.rand(2);
            if (selector == 0) {
                this.outx(
                    "You barely manage to step yourself from lunging forward to bury your mouth between your mistress's legs.  Hard and trembling between your legs, ",
                    false
                );
                if (this.player.totalCocks() > 1) this.outx("each of ");
                this.outx(
                    `your ${this.player.multiCockDescriptLight()} aches with need.  You battle with the compulsion to kneel before your short, stacked mistress and perform your duties as her breeder husband.`
                );
            } else {
                this.outx(
                    "You wrench your gaze from the juicy mound before you with great difficulty.  The desire to submit to your wife and fuck her on the spot rages through your body, melting your resistance into liquid lust and pooling it in your groin.  ",
                    false
                );
                if (this.player.totalCocks() > 1) this.outx("Each of y");
                else this.outx("Y");
                this.outx(
                    `our ${this.player.multiCockDescriptLight()} pulses and dribbles pre-cum, aching to do its duty and fire load after load into Tamani's perfect pussy.`
                );
            }
        }
        this.game.dynStats(
            "lus",
            Tamani.rand(this.player.lib / 5) + 3 + this.flags[kFLAGS.TAMANI_TIMES_HYPNOTISED]
        );
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        if (hpVictory) {
            this.outx("Tamani is defeated!", true);
        } else {
            this.outx("Tamani gives up on defeating you and starts masturbating!", true);
        }
        if (this.player.lust >= 33 && this.player.totalCocks() > 0) {
            this.outx(
                "  You could fuck her, but if that's the case why did you bother fighting her?\n\nWhat do you do to her?",
                false
            );
            let temp;
            let temp2;
            if (this.player.hasCock() && this.player.cockThatFits(this.analCapacity()) >= 0)
                temp = this.game.forest.tamaniScene.tamaniAnalShits;
            // NOT PREGGERS
            if (
                !this.game.forest.tamaniScene.pregnancy.isPregnant &&
                this.player.canOvipositSpider()
            ) {
                temp2 = this.game.forest.tamaniScene.tamaniBeaten;
            }
            this.game.simpleChoices(
                "Fuck",
                this.game.forest.tamaniScene.tamaniSexWon,
                "Buttfuck",
                temp,
                "",
                undefined,
                "Lay Eggs",
                temp2,
                "Leave",
                this.game.cleanupAfterCombat
            );
        } else this.game.cleanupAfterCombat();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (hpVictory) {
            if (this.player.totalCocks() > 0) {
                if (Tamani.rand(2) == 0) this.game.forest.tamaniScene.tamaniSexLost();
                else this.game.forest.tamaniScene.tamaniSexLetHer();
            } else {
                this.outx(
                    'Tamani sighs as you begin to lose conscious, "<i>You dummy, why\'d you get rid of the fun parts?</i>"',
                    true
                );
                this.game.cleanupAfterCombat();
            }
        } else {
            if (this.player.totalCocks() > 0) {
                // hypnoslut loss scene
                if (this.game.flags[kFLAGS.TAMANI_TIMES_HYPNOTISED] > 19 && Tamani.rand(2) == 0) {
                    this.game.forest.tamaniScene.getRapedByTamaniYouHypnoSlut();
                } else if (Tamani.rand(2) == 0) this.game.forest.tamaniScene.tamaniSexLost();
                else this.game.forest.tamaniScene.tamaniSexLetHer();
            } else {
                this.outx(
                    "You give into your lusts and masturbate, but Tamani doesn't seem to care.  She kicks and punches you over and over, screaming, \"<i>You dummy, why'd you get rid of the fun parts?</i>\"",
                    true
                );
                this.game.takeDamage(10000);
                this.game.cleanupAfterCombat();
            }
        }
    }

    public constructor() {
        super(false);
        this.a = "";
        this.short = "Tamani";
        this.imageName = "tamani";
        this.long = `She keeps her arms folded across her ${this.game.forest.tamaniScene.tamaniChest()} and glares at you.  The little thing is only about four feet tall, with pink and black dyed hair cut into a cute little 'do.  The greenish-gray skin of her breasts bulges out around her arms, supported by a few leather straps, amplifying her cleavage.  Her cunt lips are pierced multiple times, inflamed, and slightly parted.  There really isn't any clothing on her to hide them, just more of the ever-present straps wrapping around her thighs.`;
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_DROOLING, VAGINA_LOOSENESS_NORMAL);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 55, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("E"));
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 40, 0, 0, 0);
        this.tallness = 40;
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "greenish gray";
        this.hairColor = "pink and black";
        this.hairLength = 16;
        this.initStrTouSpeInte(32, 43, 55, 62);
        this.initLibSensCor(65, 65, 50);
        this.weaponName = "fists";
        this.weaponVerb = "tiny punch";
        this.armorName = "leather straps";
        this.bonusHP = 40;
        this.lust = 40;
        this.lustVuln = 0.9;
        this.temperment = Tamani.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 4;
        this.gems = Tamani.rand(25) + 5;
        this.drop = new WeightedDrop()
            .add(this.consumables.GOB_ALE, 4)
            .addMany(
                1,
                this.consumables.L_DRAFT,
                this.consumables.PINKDYE,
                this.consumables.BLUEDYE,
                this.consumables.ORANGDY,
                this.consumables.PURPDYE,
                this.consumables.INCUBID,
                this.consumables.REDUCTO,
                this.consumables.L_BLUEG,
                undefined
            );
        this.special1 = this.goblinDrugAttack;
        this.special2 = this.goblinTeaseAttack;
        this.checkMonster();
    }
}
