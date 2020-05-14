import {
    ANAL_LOOSENESS_TIGHT,
    ANAL_WETNESS_DRY,
    BUTT_RATING_LARGE,
    HIP_RATING_AMPLE,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_WETNESS_DROOLING,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { WeightedDrop } from "../../internals/WeightedDrop";
import { Monster } from "../../Monster";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";

export class Goblin extends Monster {
    protected goblinDrugAttack(): void {
        var temp2: number = Goblin.rand(2);
        if (this.short == "Tamani") temp2 = Goblin.rand(5);
        if (this.short == "Tamani's daughters") temp2 = Goblin.rand(5);
        var color: string = "";
        if (temp2 == 0) color = "red";
        if (temp2 == 1) color = "green";
        if (temp2 == 2) color = "blue";
        if (temp2 == 3) color = "white";
        if (temp2 == 4) color = "black";
        //Throw offensive potions at the player
        if (color != "blue") {
            if (this.short == "Tamani's daughters")
                this.outputText(
                    "Tamani uncorks a glass bottle full of " +
                        color +
                        " fluid and swings her arm, flinging a wave of fluid at you.",
                    false
                );
            else
                this.outputText(
                    this.capitalA +
                        this.short +
                        " uncorks a glass bottle full of " +
                        color +
                        " fluid and swings her arm, flinging a wave of fluid at you.",
                    false
                );
        }
        //Drink blue pots
        else {
            if (this.short == "Tamani's daughters") {
                this.outputText(
                    "Tamani pulls out a blue vial and uncaps it, then douses the mob with the contents.",
                    false
                );
                if (this.HPRatio() < 1) {
                    this.outputText(
                        "  Though less effective than ingesting it, the potion looks to have helped the goblins recover from their wounds!\n",
                        false
                    );
                    this.addHP(80);
                } else this.outputText("  There doesn't seem to be any effect.\n", false);
                this.outputText("\n", false);
            } else {
                this.outputText(
                    this.capitalA +
                        this.short +
                        " pulls out a blue vial and uncaps it, swiftly downing its contents.",
                    false
                );
                if (this.HPRatio() < 1) {
                    this.outputText(
                        "  She looks to have recovered from some of her wounds!\n",
                        false
                    );
                    this.addHP(this.eMaxHP() / 4);
                    if (this.short == "Tamani") this.addHP(this.eMaxHP() / 4);
                } else this.outputText("  There doesn't seem to be any effect.\n", false);
                this.combatRoundOver();
            }
            return;
        }
        //Dodge chance!
        if (
            (this.player.findPerk(PerkLib.Evade) >= 0 && Goblin.rand(10) <= 3) ||
            Goblin.rand(100) < this.player.spe / 5
        ) {
            this.outputText("\nYou narrowly avoid the gush of alchemic fluids!\n", false);
        } else {
            //Get hit!
            if (color == "red") {
                //Temporary heat
                this.outputText(
                    "\nThe red fluids hit you and instantly soak into your skin, disappearing.  Your skin flushes and you feel warm.  Oh no...\n",
                    false
                );
                if (this.player.findStatusAffect(StatusAffects.TemporaryHeat) < 0)
                    this.player.createStatusAffect(StatusAffects.TemporaryHeat, 0, 0, 0, 0);
            } else if (color == "green") {
                //Green poison
                this.outputText(
                    "\nThe greenish fluids splash over you, making you feel slimy and gross.  Nausea plagues you immediately - you have been poisoned!\n",
                    false
                );
                if (this.player.findStatusAffect(StatusAffects.Poison) < 0)
                    this.player.createStatusAffect(StatusAffects.Poison, 0, 0, 0, 0);
            } else if (color == "white") {
                //sticky flee prevention
                this.outputText(
                    "\nYou try to avoid it, but it splatters the ground around you with very sticky white fluid, making it difficult to run.  You'll have a hard time escaping now!\n",
                    false
                );
                if (this.player.findStatusAffect(StatusAffects.NoFlee) < 0)
                    this.player.createStatusAffect(StatusAffects.NoFlee, 0, 0, 0, 0);
            } else if (color == "black") {
                //Increase fatigue
                this.outputText(
                    "\nThe black fluid splashes all over you and wicks into your skin near-instantly.  It makes you feel tired and drowsy.\n",
                    false
                );
                this.game.fatigue(10 + Goblin.rand(25));
            }
        }
        if (!this.plural) this.combatRoundOver();
        else this.outputText("\n", false);
    }
    protected goblinTeaseAttack(): void {
        var det: number = Goblin.rand(3);
        if (det == 0)
            this.outputText(
                this.capitalA +
                    this.short +
                    ' runs her hands along her leather-clad body and blows you a kiss. "<i>Why not walk on the wild side?</i>" she asks.',
                false
            );
        if (det == 1)
            this.outputText(
                this.capitalA +
                    this.short +
                    " grabs her heel and lifts it to her head in an amazing display of flexibility.  She caresses her snatch and gives you a come hither look.",
                false
            );
        if (det == 2)
            this.outputText(
                this.capitalA +
                    this.short +
                    " bends over, putting on a show and jiggling her heart-shaped ass at you.  She looks over her shoulder and sucks on her finger, batting her eyelashes.",
                false
            );
        this.game.dynStats("lus", Goblin.rand(this.player.lib / 10) + 8);
        this.outputText(
            "  The display distracts you long enough to prevent you from taking advantage of her awkward pose, leaving you more than a little flushed.\n\n",
            false
        );
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        this.game.goblinScene.gobboRapeIntro();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (this.player.gender == 0) {
            this.outputText(
                "You collapse in front of the goblin, too wounded to fight.  She giggles and takes out a tube of lipstick smearing it whorishly on your face.  You pass into unconsciousness immediately.  It must have been drugged.",
                false
            );
            this.game.cleanupAfterCombat();
        } else if (pcCameWorms) {
            this.outputText(
                "\n\nThe goblin's eyes go wide and she turns to leave, no longer interested in you.",
                false
            );
            this.player.orgasm();
            this.doNext(this.game.cleanupAfterCombat);
        } else {
            this.game.goblinScene.goblinRapesPlayer();
        }
    }

    public constructor(noInit: boolean = false) {
        super();
        if (noInit) return;
        this.a = "the ";
        this.short = "goblin";
        this.imageName = "goblin";
        this.long =
            "The goblin before you is a typical example of her species, with dark green skin, pointed ears, and purple hair that would look more at home on a punk-rocker.  She's only about three feet tall, but makes up for it with her curvy body, sporting hips and breasts that would entice any of the men in your village were she full-size.  There isn't a single scrap of clothing on her, just lewd leather straps and a few clinking pouches.  She does sport quite a lot of piercings – the most noticeable being large studs hanging from her purple nipples.  Her eyes are fiery red, and practically glow with lust.  This one isn't going to be satisfied until she has her way with you.  It shouldn't be too hard to subdue such a little creature, right?";
        this.createVagina(false, VAGINA_WETNESS_DROOLING, VAGINA_LOOSENESS_NORMAL);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 40, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("E"));
        this.ass.analLooseness = ANAL_LOOSENESS_TIGHT;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 30, 0, 0, 0);
        this.tallness = 35 + Goblin.rand(4);
        this.hipRating = HIP_RATING_AMPLE + 2;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "dark green";
        this.hairColor = "purple";
        this.hairLength = 4;
        this.initStrTouSpeInte(12, 13, 35, 42);
        this.initLibSensCor(45, 45, 60);
        this.weaponName = "fists";
        this.weaponVerb = "tiny punch";
        this.armorName = "leather straps";
        this.lust = 50;
        this.temperment = Goblin.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 1;
        this.gems = Goblin.rand(5) + 5;
        this.drop = new WeightedDrop()
            .add(this.consumables.GOB_ALE, 5)
            .addMany(
                1,
                this.consumables.L_DRAFT,
                this.consumables.PINKDYE,
                this.consumables.BLUEDYE,
                this.consumables.ORANGDY,
                this.consumables.PURPDYE
            );
        this.special1 = this.goblinDrugAttack;
        this.special2 = this.goblinTeaseAttack;
        this.checkMonster();
    }
}
