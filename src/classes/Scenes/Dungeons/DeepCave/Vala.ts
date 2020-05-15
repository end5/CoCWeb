import {
    ANAL_LOOSENESS_STRETCHED,
    ANAL_WETNESS_DRY,
    BUTT_RATING_LARGE,
    HIP_RATING_CURVY,
    VAGINA_LOOSENESS_GAPING_WIDE,
    VAGINA_WETNESS_SLICK,
    WING_TYPE_BEE_LIKE_LARGE,
} from "../../../../includes/appearanceDefs";
import { Appearance } from "../../../Appearance";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class Vala extends Monster {
    // Vala AI

    // Blood magic?
    public valaSpecial1(): void {
        this.outx(
            "Vala dabs at one of her wounds and swoons.  Is she actually getting off from the wounds?  Damn she's damaged!  Vala licks the blood from her fingers, winks, and blows pink mist from her mouth.",
            false
        );
        // Lightly wounded.
        if (this.HPRatio() > 0.7) {
            this.outx(
                "  The sweet-smelling cloud rapidly fills the room, but the volume of mist is low enough that you don't end up breathing in that much of it.  It does make your pulse quicken in the most pleasant way though...",
                false
            );
            this.game.dynStats("lus", 5 + this.player.lib / 20);
        } else if (this.HPRatio() > 0.4) {
            this.outx(
                "  The rose-colored vapor spreads throughout the room, forcing you to breathe it in or pass out from lack of air.  It smells sweet and makes your head swim with sensual promises and your crotch tingle with desire.  Panicked by the knowledge that you're being drugged, you gasp, but it only draws more of the rapidly disappating cloud into your lungs, fueling your lust.",
                false
            );
            this.game.dynStats("lus", 10 + this.player.lib / 20);
        } else {
            this.outx(
                "  The cloying, thick cloud of pink spools out from her mouth and fills the room with a haze of bubblegum-pink sweetness.  Even the shallowest, most experimental breath makes your heart pound and your crotch thrum with excitement.  You gasp in another quick breath and sway back and forth on your feet, already on the edge of giving in to the faerie.",
                false
            );
            this.game.dynStats("lus", 30 + this.player.lib / 10);
        }
        this.combatRoundOver();
    }
    // Milk magic
    public valaSpecial2(): void {
        this.outx(
            "With a look of ecstasy on her face, Vala throws back her head and squeezes her pillowy chest with her hands, firing gouts of thick faerie milk from her over-sized bosom!  You try to dodge, but she's squirting so much it's impossible to dodge it all, and in no time you're drenched with a thick coating of Vala's milk.",
            false
        );
        this.outx(
            "  She releases her breasts, shaking them back and forth for your benefit, and flutters her wings, blowing shiny, glitter-like flakes at you.  They stick to the milk on your skin, leaving you coated in milk and faerie-dust.",
            false
        );
        this.outx('\nVala says, "<i>Now you can be sexy like Vala!</i>"\n', false);

        if (this.findStatusAffect(StatusAffects.Milk) >= 0) {
            this.addStatusValue(StatusAffects.Milk, 1, 5);
            this.outx(
                `Your ${this.player.skinDesc} tingles pleasantly, making you feel sexy and exposed.  Oh no!  It seems each coating of milk and glitter is stronger than the last!`
            );
        } else {
            this.createStatusAffect(StatusAffects.Milk, 5, 0, 0, 0);
            this.outx(
                "You aren't sure if there's something in her milk, the dust, or just watching her squirt and shake for you, but it's turning you on.",
                false
            );
        }
        this.game.dynStats("lus", this.statusAffectv1(StatusAffects.Milk) + this.player.lib / 20);
        this.combatRoundOver();
    }
    // Masturbation
    public valaMasturbate(): void {
        this.outx(
            'The mind-fucked faerie spreads her alabaster thighs and dips a finger into the glistening slit between her legs, sliding in and out, only pausing to circle her clit.  She brazenly masturbates, putting on quite the show.  Vala slides another two fingers inside herself and finger-fucks herself hard, moaning and panting lewdly.  Then she pulls them out and asks, "<i>Did you like that?  Will you fuck Vala now?</i>"',
            false
        );
        this.game.dynStats("lus", 4 + this.player.cor / 10);
        this.combatRoundOver();
    }

    // [Fight dialog]
    public valaCombatDialogue(): void {
        if (this.findStatusAffect(StatusAffects.Vala) < 0) {
            this.outx(
                '"<i>Sluts needs to service the masters!</i>" the fairy wails, flying high. "<i>If they are not pleased, Bitch doesn\'t get any cum!</i>"',
                false
            );
            this.createStatusAffect(StatusAffects.Vala, 0, 0, 0, 0);
        } else {
            this.addStatusValue(StatusAffects.Vala, 1, 1);
            if (this.statusAffectv1(StatusAffects.Vala) == 1)
                this.outx(
                    '"<i>If you won\'t fuck Bitch, you must not be a master,</i>" she realizes, the fight invigorating her lust-deadened brain. "<i>You get to be a pet for the masters, too!</i>"',
                    false
                );
            else if (this.statusAffectv1(StatusAffects.Vala) == 2)
                this.outx(
                    '"<i>If the masters like you, maybe they will let Bitch keep you for herself! Won\'t you like that?</i>"',
                    false
                );
            else if (this.statusAffectv1(StatusAffects.Vala) == 3)
                this.outx(
                    '"<i>We obey the masters. They fed Bitch until she became big enough to please them. The masters love their pets so much, you\'ll see.</i>"',
                    false
                );
            else if (this.statusAffectv1(StatusAffects.Vala) == 4)
                this.outx(
                    '"<i>Thoughts are so hard. Much easier to be a toy slut. Won\'t you like being a toy? All that nasty memory fucked out of your head.</i>"',
                    false
                );
            else if (this.statusAffectv1(StatusAffects.Vala) == 5)
                this.outx(
                    '"<i>Bitch has given birth to many of the masters\' children. She will teach you to please the masters. Maybe you can birth more masters for us to fuck?</i>"',
                    false
                );
            else
                this.outx(
                    '"<i>Bitch loves when her children use her as their fathers did. Sluts belong to them. Slut love them. You will love them too!</i>"',
                    false
                );
        }
    }

    protected performCombatAction(): void {
        // VALA SPEAKS!
        this.valaCombatDialogue();
        this.outx("\n\n", false);
        // Select Attack
        // BLood magic special
        if (this.HPRatio() < 0.85 && Vala.rand(3) == 0) this.valaSpecial1();
        // 25% chance of milksquirt.
        else if (Vala.rand(4) == 0) this.valaSpecial2();
        else this.valaMasturbate();
    }

    public defeated(hpVictory: boolean): void {
        this.game.fightValaVictory();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nYour foe doesn't seem put off enough to leave...");
            this.doNext(this.game.endLustLoss);
        } else {
            this.game.loseToVala();
        }
    }

    public constructor() {
        super();
        this.a = "";
        this.short = "Vala";
        this.imageName = "vala";
        this.long =
            "While the fey girl is whip-thin, her breasts are disproportionately huge. They'd be at least a DD-cup on a normal human, but for her height and body type, they're practically as large as her head. They jiggle at her slow, uneven breathing, tiny drops of milk bubbling at her nipples with every heartbeat.  She seems fixated on mating with you, and won't take no for an answer.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_SLICK, VAGINA_LOOSENESS_GAPING_WIDE);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 25, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("E"));
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 10, 0, 0, 0);
        this.tallness = 4 * 12;
        this.hipRating = HIP_RATING_CURVY;
        this.buttRating = BUTT_RATING_LARGE;
        this.skinTone = "fair";
        this.hairColor = "purple";
        this.hairLength = 22;
        this.initStrTouSpeInte(40, 50, 50, 60);
        this.initLibSensCor(55, 35, 50);
        this.weaponName = "fists";
        this.weaponVerb = "caresses";
        this.armorName = "skin";
        let lustVuln = 0.5;
        if (this.game.flags[kFLAGS.TIMES_PC_DEFEATED_VALA] > 0) lustVuln += 0.25;
        if (this.game.flags[kFLAGS.TIMES_PC_DEFEATED_VALA] > 2) lustVuln += 0.5;
        let lust: number = 30 + this.game.flags[kFLAGS.TIMES_PC_DEFEATED_VALA] * 10;
        if (lust > 80) lust = 80;
        this.bonusHP = 350;
        this.lust = lust;
        this.lustVuln = lustVuln;
        this.temperment = Vala.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 11;
        this.gems = 1;
        this.additionalXP = 50;
        if (this.game.flags[kFLAGS.TIMES_PC_DEFEATED_VALA] > 0) this.XP = 5;
        if (this.game.flags[kFLAGS.TIMES_PC_DEFEATED_VALA] > 2) this.XP = 1;
        this.special1 = this.special1;
        this.special2 = this.special2;
        this.special3 = this.special3;
        const wingDesc = "shimmering wings";
        if (this.flags[kFLAGS.TIMES_PC_DEFEATED_VALA] == 0)
            this.drop = new WeightedDrop(this.consumables.NUMBROX);
        else this.drop = this.NO_DROP;
        this.wingType = WING_TYPE_BEE_LIKE_LARGE;
        this.wingDesc = wingDesc;
        this.checkMonster();
    }
}
