import { BUTT_RATING_TIGHT, HIP_RATING_SLENDER } from "../../../../includes/appearanceDefs";
import { CockTypesEnum } from "../../../CockTypesEnum";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { WeightedDrop } from "../../../internals/WeightedDrop";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

export class MinotaurKing extends Monster {
    public constructor() {
        super();
        this.a = "the ";
        this.short = "minotaur king";
        // this.long = "";

        this.tallness = 12 * 14;

        this.createCock(24, 5, CockTypesEnum.HORSE);
        this.createBreastRow(0);

        this.balls = 2;
        this.ballSize = 4;
        this.hoursSinceCum = 9999;

        this.hipRating = HIP_RATING_SLENDER;
        this.buttRating = BUTT_RATING_TIGHT;

        this.initStrTouSpeInte(100, 100, 50, 60);
        this.initLibSensCor(66, 10, 100);

        this.weaponName = "axe";
        this.weaponAttack = 50;
        this.weaponVerb = "swing";
        this.armorName = "rags";
        this.armorDef = 60;

        this.bonusHP = 850;
        this.lustVuln = 0.05;

        this.gems = 75 + MinotaurKing.rand(50);
        this.level = 22;

        this.drop = this.NO_DROP;
        this.drop = new WeightedDrop(this.consumables.PROMEAD, 1);

        // I don’t know if we ever got multiple item drops set up for CoC. If we did, have this guy drop a five-stack of God’s Mead for the Lethice fight. Otherwise, perhaps drop a single item that will full heal once?

        this.checkMonster();

        this._lastSpellCastCount = this.flags[kFLAGS.SPELLS_CAST];
    }

    public get long(): string {
        if (this._orgasms == 0) {
            return "Positioned between you and the Demon Queen is an opponent of singular size and stature - the Minotaur King. He is a beast beyond measure, covered in shaggy fur and a few scraps of leather that do nothing to hide the pillar of flared cuntplow between his legs. In his hands is a gigantic axe, though he seems loathe to use it, preferring to rely on the erotic scent emanating from between his legs. He smells virile, strong, and more alluring than you’d expect. You’d best be careful not to dwell on it.";
        } else {
            let str =
                "Still standing between you and the Demon Queen, the Minotaur King is breathing heavily. His cock is slathered with the residue of his own potent orgasm. His immense, 14 foot tall form hunches slightly as he stares at you, one hand still clutching to his axe. Driving him back to his peak would undoubtedly push him even beyond his considerable endurance. The only problem is that alluring <i>aroma</i> that surrounds him, suffusing the air with the scent of sweaty bedroom romps and sizzling pleasure. You better finish him quick.";

            // I have no idea what this variation is keyed from 9999
            if (this.lust < 40) {
                str +=
                    "\n\nBeneath his legs is a favorite slut, Excellia by name. She stays just out of his way, showcasing the curvaceous nature of her figure and the ripeness of her sex, occasionally running her fingers across a strange tattoo laid upon her belly. You’d best keep your attentions on the fight ahead.";
            } else if (this.lust < 80) {
                str +=
                    "\n\nBeneath his legs is the fallen form of his favored slut, Excellia. He steps carefully around the insensate cow-girl but never lets her out of arm’s reach, his eyes flicking to the moistness of her sex from time to time.";
            } else {
                str +=
                    "\n\nBeneath his legs is the creampied form of his favored slut, Excellia. Milk-white cum puddles between her spread legs, matched only by the sheen of leaking lactose on her lewdly-jutting nipples. Her lord never lets her fallen form out of arm’s reach, just in case he needs a drink.";
            }

            // milkdrinks
            if (this._milkDrinks == 0) {
            } else if (this._milkDrinks == 1)
                str +=
                    "\n\n<b>The King has been glancing appreciatively in your direction ever since he took a drink from his slave-slut’s nipples. Perhaps he’s more vulnerable to baser needs...</b>";
            else
                str +=
                    "\n\n<b>The King’s nostrils flare as he stares at you. It’s clear that with every drink he takes from his slave-slut’s nipples, he becomes more receptive to your advances.</b>";

            return str;
        }
    }

    public defeated(hpVictory: boolean): void {
        if (this._orgasms == 0 && !hpVictory) {
            this.lustDump();
            this.combatRoundOver();
            return;
        }

        if (hpVictory) {
            this.hpRestore();
            this.combatRoundOver();
            return;
        }

        this.game.d3.minotaurKing.theKingIsDeadLongLiveTheKing(hpVictory);
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.d3.minotaurKing.hailToTheKingBaby(hpVictory, pcCameWorms);
    }

    private _milkDrinks = 0;
    private _orgasms = 0;
    public get orgasms(): number {
        return this._orgasms;
    }
    private _lastRoundStun = false;
    private _lastSpellCastCount: number;

    protected performCombatAction(): void {
        // Attempt dickslap if the player was stunned in the last round
        if (this._lastRoundStun) {
            this._lastRoundStun = false;
            // If the player is still stunned, use dickslap ohterwise fall through to regular AI.
            if (this.player.findStatusAffect(StatusAffects.Stunned) >= 0) {
                this.dickslap();
                return;
            }
        }

        if (this._lastSpellCastCount != this.flags[kFLAGS.SPELLS_CAST]) {
            this._lastSpellCastCount = this.flags[kFLAGS.SPELLS_CAST];
            this.headbutt();
        } else {
            const atks: any[] = [this.backhand, this.battleaxe, this.minoPheromones];
            atks[MinotaurKing.rand(atks.length)]();
        }

        this.combatRoundOver();
    }

    private backhand(): void {
        this.outx(
            "Feinting with his axe, the Minotaur King flings a powerful backhand in your direction."
        );

        let damage: number = this.str + this.weaponAttack - MinotaurKing.rand(this.player.tou);

        if (damage <= 0 || this.combatMiss() || this.combatFlexibility()) {
            this.outx(" Luckily, you dodge aside.");
        } else if (this.combatEvade()) {
            this.outx(" Luckily, you evade.");
        } else if (this.combatMisdirect()) {
            this.outx(" Luckily, you misdirect his attack.");
        } else {
            damage = this.player.takeDamage(damage);
            this.outx(` Damn, that hurts! (${damage})`);
        }
    }

    private headbutt(): void {
        this.outx(
            "<i>“Settle down,”</i> the brute growls, moments before attempting to slam his forehead into your own."
        );

        let damage: number =
            (this.str + this.weaponAttack) / 2 - MinotaurKing.rand(this.player.tou);

        if (damage <= 0 || this.combatMiss() || this.combatFlexibility()) {
            this.outx(" Luckily, you dodge aside.");
        } else if (this.combatEvade()) {
            this.outx(" Luckily, you evade.");
        } else if (this.combatMisdirect()) {
            this.outx(" Luckily, you misdirect his attack.");
        } else {
            this._lastRoundStun = true;
            damage = this.player.takeDamage(damage);
            this.outx(` He impacts with stunning force, leaving you reeling! (${damage})`);
            // {Stun for one turn, minor HP damage}
            if (this.player.findPerk(PerkLib.Resolute) < 0) {
                this.outx(" <b>You're left stunned by the force of the blow!</b>");
                this.player.createStatusAffect(StatusAffects.Stunned, 0, 0, 0, 0);
            }
        }
    }

    private dickslap(): void {
        // Used after stunning PC.
        this.outx(
            "Before you can completely regain your wits, the brute is on you, easily holding your hand in one hand while he none-too-gently smacks his cock into your face, dragging his musky member back and forth across your cheeks before finally breaking contact."
        );
        if (this._orgasms > 0) {
            this.outx(" Strands of his");
            if (this.player.findPerk(PerkLib.MinotaurCumAddict) >= 0) this.outx(" god-like");
            this.outx(" spunk hang from your nose until your tongue lashes out to collect them.");
            if (this.player.findPerk(PerkLib.MinotaurCumAddict) >= 0) this.outx(" Delicious.");
            else this.outx(" Why did you do that? And why did it feel so good.");
        }
        this.game.dynStats("lus", 15 + this.player.lib / 20);
    }

    private battleaxe(): void {
        this.outx(
            "The Minotaur King carries his axe as if it weighed no more than a feather, brandishing it back and forth with such casual movements that you barely register his swing"
        );
        let damage: number = this.str + this.weaponAttack - MinotaurKing.rand(this.player.tou);
        if (
            damage <= 0 ||
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        ) {
            this.outx(" in time to avoid it.");
        } else {
            damage = this.player.takeDamage(damage);
            this.outx(`. By the time you notice, it’s too late. (${damage})`);
        }
    }

    private hpRestore(): void {
        this.HP = this.eMaxHP();
        this.lustVuln += 0.15;

        this._milkDrinks++;
        // Full HP restore.
        this.outx(
            "Staggering back, the King wastes no time in appropriating his willing slave, lifting her up to his face as easily as one might heft a stein of fresh-brewed beer. One of her huge tits easily fits against the oversized minotaur’s lips, and you see him noisily gulping down a quick, milky pick-me-up. By the time he finishes, his wounds are closing, but his cock is twitching and leaking pre-cum like water from a sieve."
        );
        this.outx(
            "\n\n<b>He looks like he’d be easier to arouse. Whatever’s in her milk may restore his wounds, but leave him vulnerable to his animalistic needs.</b>"
        );
    }

    // copypasta I dun even give a fuck ¯\_(ツ)_/¯
    private minoPheromones(): void {
        this.outx(
            "The minotaur smiles at you and lifts his loincloth, flicking it at you.  Thick ropes of pre-cum fly through the air, ",
            false
        );
        // sometimes get hit with the pre for stronger effect!
        if (MinotaurKing.rand(3) == 0) {
            this.outx(
                "slapping into your face before you can react!  You wipe the slick snot-like stuff out of your eyes and nose, ",
                false
            );
            if (this.player.lust > 75) {
                this.outx("swallowing it into your mouth without thinking.  ");
                this.game.dynStats("lus", 15 + this.player.lib / 10);
            } else {
                this.outx(
                    "feeling your heart beat with desire as your tongue licks the residue from your lips.  ",
                    false
                );
                this.game.dynStats("lus", 7.5 + this.player.lib / 20);
            }
        } else this.outx("right past your head.  ");
        this.outx(
            "The animalistic scent of it seems to get inside you, the musky aroma burning a path of liquid heat to your groin.",
            false
        );
        this.game.dynStats("lus", 15 + this.player.lib / 20);
        if (
            this.player.findPerk(PerkLib.MinotaurCumAddict) >= 0 ||
            this.flags[kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] == 2
        ) {
            if (MinotaurKing.rand(2) == 0)
                this.outx(
                    "\n<b>You shiver with need, wanting nothing more than to bury your face under that loincloth and slurp out every drop of goopey goodness.</b>",
                    false
                );
            else
                this.outx(
                    "\n<b>You groan and lick your lips over and over, craving the taste of him in your mouth.</b>",
                    false
                );
            this.game.dynStats("lus", 5 + MinotaurKing.rand(5));
        }
    }

    public lustDump(): void {
        this._orgasms++;

        this.outx(
            "The incredibly-aroused minotaur staggers, then looks down at the log of tumescence between his legs. It’s twitching, bouncing in the air with every beat of his heart. It must ache to be that hard, to be so full of lust it looks ready to erupt. One of his hands reaches toward it, and he drops to one knee. Have you done it? Have you defeated the brute once and for all?"
        );
        this.outx(
            "\n\nA monstrous hand closes around Excellia’s torso, lifting her into the air. The curvy cow-slut does the only thing she can in such a situation - she moos and spreads her legs, a gleeful smile plastered across her excited visage. The Minotaur King doesn’t wait a second, impaling her on the spot, sliding what looks like three feet of virile cock deep into his favorite slut. His balls slap against her bulging belly once he’s fully inside, getting a coating of pussy-juice for their trouble."
        );
        this.outx(
            "\n\nThe brute fucks her casually, using her like little more than a super-sized sex-toy. Every sheath-hilting clap of hips to ass sends jiggles through the nubile slave. Flecks of pussy-juice and pre-cum froth around the entrance to her gaped cunt while stray droplets slick the floor below. It’s a bestial mating, the kind that leaves no room for words on either partner’s face. The kind that has the cow-girl quivering and shaking in the throes of indescribable ecstasy, rendered incapable of something as simple as moaning."
        );
        this.outx(
            "\n\nExcellia’s master joins her a second later. There’s little change in the sound of his grunts. You wouldn’t even know if it wasn’t for the sudden ballooning of her belly and the cascade of cum between her legs, coating her lord’s legs in a veneer of lusty white. The amount of spunk is absolutely gobsmacking. You watch in awe as Excellia’s formerly taut belly stretches into a gravid dome. She looks like she could give birth any moment now, yet there’s nothing in her womb but gallon upon gallon of tainted minotaur spunk."
        );
        if (this.player.findPerk(PerkLib.MinotaurCumAddict) >= 0)
            this.outx(" You’re jealous. All that cum must feel exquisite!");
        this.outx(
            "\n\nWhatever spell this forceful mating cast, it breaks the moment Excellia slides off her lord’s still-hard phallus. You close your mouth and ready your grip on your [weapon] as the Minotaur King straightens, breathing heavily. He looks a little woozy for the effort, but still good to fight. Maybe if you can bring him back to the peak, he’ll fall for good?"
        );
        this.lust = 0;
    }

    private cowslutTeaseCocks(): void {
        if (this.player.hasCock()) {
            const sel: number = MinotaurKing.rand(3);
            if (sel == 0) {
                this.outx(
                    "Excellia crawls over to you while you’re distracted with her lord and wraps her arms around your waist, crushing her milk-swollen tits against your crotch. You can feel their warmth through your [armor], promising nothing but bliss in their embrace. When you push her away, you become aware of the rivers of milk she poured down your"
                );
                if (this.player.isNaga()) this.outx(" [leg]");
                else this.outx(" [legs]");
                this.outx(", a reminder of the woman’s insane fuckability.");
            } else if (sel == 1) {
                this.outx(
                    "Turning about, the cow-slave aims her bubbly ass in your direction and lifts her tail, revealing both her dripping delta and the puckered star of her asshole. She looks back over her shoulder and sensuously slides her tongue across her gold-gilt lips, blowing you a pouty kiss once her mouth is suitably shiny. If she meant to distract you, she was at least partially successful."
                );
            } else {
                this.outx(
                    "Excellia rises up onto her knees and arches her back to display her monumental mammaries, letting their chocolatey nipples jut accusingly in your direction. Her fingers travel to them, squeezing out thin flows of milk that she gathers and smears across each orb in turn, rubbing it into her skin like high-grade massage oil. When she’s finished, her tits are shining, and you’re a little hotter under the collar."
                );
            }

            this.game.dynStats("lus", 5);
        }
    }

    protected handleStun(): boolean {
        this.outx(
            "It only takes the muscled monarch a moment to recover from the stun. It looks like he’s too much of a juggernaught to be stopped by those kinds of hits."
        );
        return true;
    }
}
