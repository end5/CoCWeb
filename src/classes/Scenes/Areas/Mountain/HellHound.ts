import { trace } from "../../../../console";
import {
    ANAL_LOOSENESS_NORMAL,
    ANAL_WETNESS_NORMAL,
    BUTT_RATING_AVERAGE,
    HIP_RATING_AVERAGE,
    LOWER_BODY_TYPE_DOG,
    SKIN_TYPE_FUR,
    TAIL_TYPE_DOG,
} from "../../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

export class HellHound extends Monster {
    protected hellhoundFire(): void {
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.outx(
                `${
                    this.capitalA + this.short
                } completely misses you with a wave of dark fire! Thank the gods it's blind!`
            );
            this.combatRoundOver();
            return;
        }
        /* if(player.hasStatusAffect(StatusAffects.Web_dash_Silence) >= 0) {
            outx("You reach inside yourself to breathe flames, but as you ready to release a torrent of fire, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n", false);
            changeFatigue(10);
            takeDamage(10+rand(20));
            enemyAI();
            return;
        }*/
        if (
            this.player.findPerk(PerkLib.Evade) >= 0 &&
            this.player.spe >= 35 &&
            HellHound.rand(3) != 0
        ) {
            this.outx(
                "Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you.  You easily avoid the wave, diving to the side and making the most of your talents at evasion.",
                false
            );
        } else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            HellHound.rand(100) < 20 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep ${this.a}${this.short}'s fire.\n`,
                false
            );
        } else if (
            this.player.findPerk(PerkLib.Flexibility) >= 0 &&
            this.player.spe > 30 &&
            HellHound.rand(10) != 0
        ) {
            this.outx(
                "Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you.  You twist and drop with incredible flexibility, watching the fire blow harmlessly overhead.",
                false
            );
        } else {
            // Determine the damage to be taken
            let temp: number = 15 + HellHound.rand(10);
            temp = this.player.takeDamage(temp);
            this.outx(
                `Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you. While the flames don't burn much, the unnatural heat fills your body with arousal. (${temp} damage)`
            );
            this.game.dynStats("lus", 20 - this.player.sens / 10);
            this.statScreenRefresh();
            if (this.player.HP <= 0) {
                this.doNext(this.game.endHpLoss);
                return;
            }
            if (this.player.lust >= 100) {
                this.doNext(this.game.endLustLoss);
                return;
            }
        }
        this.doNext(this.game.playerMenu);
    }
    protected hellhoundScent(): void {
        if (this.player.findStatusAffect(StatusAffects.NoFlee) >= 0) {
            if (this.spe == 100) {
                this.hellhoundFire();
                return;
            } else {
                this.outx(
                    "The hellhound sniffs your scent again, seemingly gaining more and more energy as he circles faster around you.",
                    false
                );
                this.spe = 100;
            }
        } else {
            this.spe += 40;
            this.outx(
                "The hellhound keeps his four eyes on you as he sniffs the ground where you were moments ago. He raises his heads back up and gives you a fiery grin - he seems to have acquired your scent!  It'll be hard to get away now...",
                false
            );
            this.player.createStatusAffect(StatusAffects.NoFlee, 0, 0, 0, 0);
        }
        this.combatRoundOver();
        /* if(spe >= 80) {
            if(spe == 100) {
                hellhoundFire();
                return;
            }
            else {
                outx("The hellhound sniffs your scent again, seemingly gaining more and more energy as he circles faster around you.");
                spe = 100;
            }
        }
        else {
            spe += 40;
            outx("The hellhound keeps his four eyes on you as he sniffs the ground where you were moments ago. He raises his heads back up and gives you a firey grin - He seems to have aquired you scent!  Running away will now be much more difficult...");
        }
        if(player.HP <= 0) {
            doNext(endHpLoss);
            return;
        }
        if(player.lust > 100) {
            doNext(endLustLoss);
            return;
        }
        doNext(1);*/
    }

    public defeated(hpVictory: boolean): void {
        if (hpVictory) {
            this.outx(
                "The hellhound's flames dim and the heads let out a whine before the creature slumps down, defeated and nearly unconscious.",
                true
            );
            // Rape if not naga, turned on, and girl that can fit!
            if (this.player.hasVagina() && this.player.lust >= 33 && !this.player.isNaga()) {
                this.outx(
                    "  You find yourself musing that you could probably take advantage of the poor 'doggy'.  Do you fuck it?",
                    false
                );
                this.game.simpleChoices(
                    "Fuck it",
                    this.game.mountain.hellHoundScene.hellHoundPropahRape,
                    "",
                    undefined,
                    "",
                    undefined,
                    "",
                    undefined,
                    "Leave",
                    this.game.cleanupAfterCombat
                );
            } else {
                this.game.cleanupAfterCombat();
            }
        } else {
            this.outx(
                "Unable to bear hurting you anymore, the hellhound's flames dim as he stops his attack. The two heads look at you, whining plaintively.  The hellhound slowly pads over to you and nudges its noses at your crotch.  It seems he wishes to pleasure you.\n\n",
                true
            );
            let temp2;
            if (this.player.gender > 0 && this.player.lust >= 33) {
                this.outx(
                    "You realize your desires aren't quite sated.  You could let it please you",
                    false
                );
                // Rape if not naga, turned on, and girl that can fit!
                if (this.player.hasVagina() && this.player.lust >= 33 && !this.player.isNaga()) {
                    this.outx(" or make it fuck you");
                    temp2 = this.game.mountain.hellHoundScene.hellHoundPropahRape;
                }
                this.outx(".  What do you do?");
                this.game.simpleChoices(
                    "Lick",
                    this.game.mountain.hellHoundScene.hellHoundGetsRaped,
                    "Fuck",
                    temp2,
                    "",
                    undefined,
                    "",
                    undefined,
                    "Leave",
                    this.game.cleanupAfterCombat
                );
            } else {
                this.outx(
                    "You turn away, not really turned on enough to be interested in such an offer.",
                    false
                );
                this.game.cleanupAfterCombat();
            }
        }
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx("\n\nThe hellhound snorts and leaves you to your fate.", false);
            this.doNext(this.game.cleanupAfterCombat);
        } else {
            this.game.mountain.hellHoundScene.hellhoundRapesPlayer();
        }
    }

    public constructor(noInit = false) {
        super();
        if (noInit) return;
        trace("HellHound Constructor!");
        this.a = "the ";
        this.short = "hellhound";
        this.imageName = "hellhound";
        this.long =
            "It looks like a large demon on all fours with two heads placed side-by-side. The heads are shaped almost like human heads, but they have dog ears on the top and have a long dog snout coming out where their mouths and noses would be.  Its eyes and mouth are filled with flames and its hind legs capped with dog paws, but its front ones almost look like human hands.  Its limbs end in large, menacing claws. A thick layer of dark fur covers his entire body like armor.  Both heads look at you hungrily as the hellhound circles around you. You get the feeling that reasoning with this beast will be impossible.";
        // this.plural = false;
        this.createCock(8, 2, CockTypesEnum.DOG);
        this.createCock(8, 2, CockTypesEnum.DOG);
        this.balls = 2;
        this.ballSize = 4;
        this.cumMultiplier = 5;
        // this.hoursSinceCum = 0;
        this.createBreastRow();
        this.createBreastRow();
        this.createBreastRow();
        this.ass.analLooseness = ANAL_LOOSENESS_NORMAL;
        this.ass.analWetness = ANAL_WETNESS_NORMAL;
        this.tallness = 47;
        this.hipRating = HIP_RATING_AVERAGE;
        this.buttRating = BUTT_RATING_AVERAGE + 1;
        this.lowerBody = LOWER_BODY_TYPE_DOG;
        this.skinTone = "black";
        this.skinType = SKIN_TYPE_FUR;
        // this.skinDesc = Appearance.Appearance.DEFAULT_SKIN_DESCS[SKIN_TYPE_FUR];
        this.hairColor = "red";
        this.hairLength = 3;
        this.initStrTouSpeInte(55, 60, 40, 1);
        this.initLibSensCor(95, 20, 100);
        this.weaponName = "claws";
        this.weaponVerb = "claw";
        this.weaponAttack = 10;
        this.armorName = "thick fur";
        this.lust = 25;
        this.temperment = HellHound.TEMPERMENT_LOVE_GRAPPLES;
        this.level = 5;
        this.gems = 10 + HellHound.rand(10);
        this.drop = new WeightedDrop()
            .add(this.consumables.CANINEP, 3)
            .addMany(
                1,
                this.consumables.BULBYPP,
                this.consumables.KNOTTYP,
                this.consumables.BLACKPP,
                this.consumables.DBLPEPP,
                this.consumables.LARGEPP
            );
        this.tailType = TAIL_TYPE_DOG;
        this.special1 = this.hellhoundFire;
        this.special2 = this.hellhoundScent;
        this.checkMonster();
    }
}
