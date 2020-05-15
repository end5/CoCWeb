import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_SLIME_DROOLING,
    BUTT_RATING_LARGE,
    HIP_RATING_CURVY,
    HORNS_DRACONIC_X2,
    LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS,
    TAIL_TYPE_DEMONIC,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_WETNESS_SLAVERING,
    WING_TYPE_BAT_LIKE_TINY,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";
import { StatusAffects } from "../../../StatusAffects";
import { AbstractSuccubus } from "../../Monsters/AbstractSuccubus";

export class MilkySuccubus extends AbstractSuccubus {
    protected performCombatAction(): void {
        if (this.findStatusAffect(StatusAffects.MilkyUrta) < 0 && MilkySuccubus.rand(3) == 0)
            this.cowCubiMilkSprayAttack();
        else if (this.HP < 400) this.drinkMinoCum();
        else if (this.player.HP < 100) this.eAttack();
        else if (this.player.lust >= 90) this.succubusTease();
        else if (MilkySuccubus.rand(2) == 0) this.succubusTease();
        else this.eAttack();
    }

    private cowCubiMilkSprayAttack(): void {
        // Lasts a couple turns like the goblin lust poison?
        this.outx(
            '"<i>How about a taste?</i>"  The succubus asks, pressing her tits together.  Before you can reply, a veritable jet of milk sprays in your direction!\n'
        );
        // Miss:
        if (MilkySuccubus.rand(20) + 1 + this.player.spe / 20 > 17) {
            this.outx(
                "With your trained reflexes, you manage to duck and roll, narrowly avoiding getting sprayed with milk."
            );
            this.outx(
                '\n\n"<i>Such a waste.</i>"  The succubus pouts.  "<i>No worries, I\'ll just have Fido clean it up later... perhaps I\'ll even have you do it later, when you become mine.</i>"  The succubus giggles.'
            );
            kGAMECLASS.dynStats("lus", 6);
        }
        // Hit:
        else {
            this.outx(
                "All you manage to do is cover your face; the rest of you, however, gets completely soaked in the demon's corrupted milk.  Looking down at yourself, you realize that you are panting, and the places where the milk splashed your fur begin to heat up.  Oh no! <b>You'd better finish off this succubus before you succumb to your lusts!</b>"
            );
            kGAMECLASS.dynStats("lus", 15);
            this.createStatusAffect(StatusAffects.MilkyUrta, 3, 0, 0, 0);
        }
        this.combatRoundOver();
    }

    private drinkMinoCum(): void {
        this.outx(
            "Smiling wryly and licking her lips, the succubus-cow procures a bottle of her pet's cum with her probing tail."
        );
        // Success:
        if (
            this.findStatusAffect(StatusAffects.DrankMinoCum) < 0 ||
            this.findStatusAffect(StatusAffects.DrankMinoCum2) < 0
        ) {
            this.outx(
                '\n\nSmiling triumphantly, she takes the bottle and opens it with a pop, drinking the contents with glee.  When done, she throws the bottle away and smacks her lips.  "<i>Nothing like a bottle of minotaur cum to get you back on your feet, right?</i>"  She grins, her pussy dripping with more juices.'
            );
            this.lust += 25;
            this.HP += 400;
            if (this.findStatusAffect(StatusAffects.DrankMinoCum) < 0)
                this.createStatusAffect(StatusAffects.DrankMinoCum, 0, 0, 0, 0);
            else this.createStatusAffect(StatusAffects.DrankMinoCum2, 0, 0, 0, 0);
        }
        // Failure:
        else {
            this.outx(
                '\n\nShe frowns and looks behind her, pouting slightly when she turns to look back at you.  "<i>Seems like I\'m all out of cum.</i>"  She grins evilly.  "<i>I\'ll just have to get more after I\'m done with you.</i>"'
            );
        }
        this.combatRoundOver();
    }

    private succubusTease(): void {
        if (MilkySuccubus.rand(4) == 0)
            this.outx(
                'Turning around, the succubus begins to bounce her rather round derriere in your direction, the cheeks lewdly clapping together with each change in direction, exposing her dark anal star and juicy snatch, literally gushing forth a stream of lubricants.  Her eyes glow with faint, purple light as she whispers, "<i>Don\'t you just want to... slide on in?</i>"'
            );
        else if (MilkySuccubus.rand(3) == 0)
            this.outx(
                'The succubus squeezes her spotted, sweat-oiled breasts together, squirting out trickles of fresh, creamy, succubi milk.  Bending down, she laps at her own bounty, taking to meet your eyes, her own glowing violet.  You can feel her next words as much as hear them, reaching into your brain and stirring a familiar heat in your loins.  "<i>Giving in would mean pleasure unending, my dear vixen.</i>"'
            );
        else if (MilkySuccubus.rand(2) == 0)
            this.outx(
                'The succubus turns slightly and slowly bends over, sliding her hands down the sides of her milk laden jugs. "<i>Mmm, would you help a poor girl relax? These things need some attention,</i>" she says with a lust filled moan as her hands reach her multitude of nipples.'
            );
        else
            this.outx(
                'The succubus leans forwards holding her tits, while wrapping her fingers around her nipples.  "<i>My boobs are soo full.  Would you like to help me drain them?</i>" she says with a husky voice.'
            );
        kGAMECLASS.dynStats("lus", 20);
        this.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        this.game.urtaQuest.urtaBeatsUpCowcubi();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.urtaQuest.urtaLosesToCowCubi();
    }

    public teased(lustDelta: number): void {
        this.outx(
            `${
                this.capitalA + this.short
            } smiles, rubbing her hands across herself as she watches your display.  She does not seem greatly affected by your show - at least in the sense of increasing arousal.  She does seem oddly more... vital, as if she drew strength from the very display you put on.`
        );
        this.str += 5;
        this.HP += 50;
        this.applyTease(lustDelta);
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "milky succubus";
        this.imageName = "milkysuccubus";
        this.long =
            "You are fighting a milky, cow-like succubus.  She stands about seven feet tall and is hugely voluptuous, with breasts three times the size of her head, tipped with a cluster of four obscenely teat-like nipples.  Her hips flare out into an exaggerated hourglass shape, with a long tail tipped with a fleshy arrow-head spade that waves above her spankable butt.  A small cowbell is tied at the base of the arrow-head with a cute little ribbon.  Wide, cow-like horns, easily appropriate for a minotaur, rise from her head, and she flicks bovine ears about the sides of her head whilst sashaying from side to side on demonic, high-heeled feet.  Her skin is a vibrant purple with splotches of shiny black here and there, including one large spot covering her right eye.  She's using a leather whip as a weapon.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_SLAVERING, VAGINA_LOOSENESS_NORMAL);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 300, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("G"));
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_SLIME_DROOLING;
        this.tallness = MilkySuccubus.rand(9) + 60;
        this.hipRating = HIP_RATING_CURVY;
        this.buttRating = BUTT_RATING_LARGE + 1;
        this.lowerBody = LOWER_BODY_TYPE_DEMONIC_HIGH_HEELS;
        this.skinTone = "blue";
        this.hairColor = "black";
        this.hairLength = 13;
        this.initStrTouSpeInte(75, 50, 125, 95);
        this.initLibSensCor(90, 60, 99);
        this.weaponName = "whip";
        this.weaponVerb = "whipping";
        this.weaponAttack = 10;
        this.weaponPerk = "";
        this.weaponValue = 150;
        this.armorName = "demonic skin";
        this.armorDef = 10;
        this.bonusHP = 700;
        this.lust = 40;
        this.lustVuln = 0.3;
        this.temperment = MilkySuccubus.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 16;
        this.gems = MilkySuccubus.rand(25) + 10;
        this.additionalXP = 50;
        this.drop = this.NO_DROP;
        this.hornType = HORNS_DRACONIC_X2;
        this.horns = 2;
        this.wingType = WING_TYPE_BAT_LIKE_TINY;
        this.wingDesc = "tiny hidden";
        this.tailType = TAIL_TYPE_DEMONIC;
        this.special1 = this.kissAttack;
        this.special2 = this.seduceAttack;
        this.special3 = this.whipAttack;
        this.drop = this.NO_DROP;
        this.checkMonster();
    }
}
