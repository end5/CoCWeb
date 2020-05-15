import { BUTT_RATING_TIGHT, HIP_RATING_SLENDER } from "../../../../includes/appearanceDefs";
import { kFLAGS } from "../../../GlobalFlags/kFLAGS";
import { Monster } from "../../../Monster";
import { PerkLib } from "../../../PerkLib";
import { StatusAffects } from "../../../StatusAffects";

export class Lethice extends Monster {
    public constructor() {
        super();
        this.a = "";
        this.short = "Lethice";
        // this.long = "";

        this.tallness = 12 * 9;

        this.createVagina(false, 3, 3);
        this.createBreastRow(8);

        this.balls = 2;
        this.ballSize = 4;

        this.hipRating = HIP_RATING_SLENDER;
        this.buttRating = BUTT_RATING_TIGHT;

        this.initStrTouSpeInte(100, 100, 100, 100);
        this.initLibSensCor(100, 40, 100);

        this.weaponName = "whip";
        this.weaponAttack = 25;
        this.weaponVerb = "whip";
        this.armorName = "wraps";
        this.armorDef = 15;

        this.bonusHP = 650;
        this.lustVuln = 0.15;

        this.gems = 75 + Lethice.rand(50);
        this.level = 25;

        this.drop = this.NO_DROP;

        this.checkMonster();
    }

    public get long(): string {
        let str = "";
        if (this._fightPhase == 1) {
            str +=
                "Lethice is the epitome of all things demonic. From her luxurious purple hair, interwoven with black roses, to her pink skin and goat-like horns, she is the perfect image of sensual, enticing corruption. Tall heels of bone complement her revealing, black clothes. They look almost like a nun’s habit, but pared down to an almost fetishistic extreme. Her slim breasts provide just a hint of shape to the diaphanous fabric, a promise of feminine delights instead of the garish acres of flesh her outfit displays. Outsized wings, like those of a dragon, hold Lethice aloft as she zips about her throne room, gathering her corruptive magics. The strangely slit pupils of her black-rimmed eyes never seem to leave you.";
        } else if (this._fightPhase == 2) {
            str +=
                "You're completely surrounded by demons! The members of Lethice's corrupted court have flooded the throne hall like a sea of tainted flesh, crushing in on you with the sheer weight of bodies being thrown against you. Incubi, succubi, and forms between and combining them all grasp and thrust at you, trying to overwhelm you with desire for their inhuman bodies and the unspeakable pleasures only demons command.";
            if (this.findStatusAffect(StatusAffects.Blind) >= 0) {
                str +=
                    " The demons have relented somewhat, clutching at their eyes and screaming in frustration and panic thanks to your potent spell!";
            } else if (this.findStatusAffect(StatusAffects.OnFire) >= 0) {
                str +=
                    " More than a few of the court are screaming in terror, rolling on the ground and trying desperately to put out the flames you've bathed them in! Turns out Marethian demons aren't all that immune to fire!";
            }
        } else {
            str +=
                "Lethice is the epitome of all things demonic. From her luxurious purple hair, interwoven with black roses, to her pink skin and goat-like horns, she is the perfect image of sensual, enticing corruption. Tall heels of bone complement her revealing, black clothes. They look almost like a nun’s habit, but pared down to an almost fetishistic extreme. Her slim breasts provide just a hint of shape to the diaphanous fabric, a promise of feminine delights instead of the garish acres of flesh her outfit displays. Standing astride her throne";
            if (this._wingsDestroyed) str += ", her wings in tatters";
            str +=
                ", Lethice regards you with a snarl and a crack of her flaming whip. Her yellow-black eyes are wide with fury, the pointed tips of her teeth bared in a snarl. Gorged with lethicite, the enraged demon queen is determined to finish you. Her endurance can’t possible hold for too much longer. You can beat her!";

            if (this._fightPhase == 3 && this._defMode != 0) {
                if (this._defMode == 1)
                    str +=
                        "\nLethice is standing ready for your next attack, ready to defend against any strike. Perhaps you could surprise her with something else?";
                else if (this._defMode == 2)
                    str +=
                        "\nLethice is smirking and confident, prepared to resist any sort of libidinous advance, but her posture is ill-suited to deflecting attacks.";
            }
        }

        if (this.player.findStatusAffect(StatusAffects.LethicesRapeTentacles) >= 0) {
            str +=
                "\n\n<b>A forest of black tentacles sprout from the floor, snaring any demons unlucky enough to venture close - or any champions unlucky enough to be in the center of it all.";
            if (this.player.statusAffectv3(StatusAffects.LethicesRapeTentacles) != 0)
                this.outx(
                    " Unfortunately, they’ve grabbed you. You need to break free to do anything!"
                );
            if (this.player.findStatusAffect(StatusAffects.KnowsWhitefire) >= 0) {
                str +=
                    " A blast of white-fire could probably dispel them, or you could rely on your";
                if (this.player.canFly()) str += " flight";
                else str += " quickness";
                str += " to stay safe. Either way, you’re free for now.</b>";
            }
        }

        if (this.game.monster.findStatusAffect(StatusAffects.Shell) >= 0) {
            str +=
                "\n\n<b>Lethice is surrounded by a shimmering dome of magical energy. Spells and ranged attacks will be ineffective!</b>";
        }

        if (this.player.findStatusAffect(StatusAffects.PigbysHands) >= 0) {
            str +=
                "\n\nInvisible hands roam over your body, stroking you in ways that no one but a lover ever should. They won’t stop, and they won’t slow. You’ll have to try to ignore their arousing caresses.";
        }

        return str;
    }

    public defeated(hpVictory: boolean): void {
        if (this._fightPhase == 1) {
            this.phase1Ends(hpVictory);
            return;
        } else if (this._fightPhase == 2) {
            this.phase2Ends(hpVictory);
            return;
        }

        this.game.d3.lethice.defeated(hpVictory);
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.d3.lethice.won(hpVictory, pcCameWorms);
    }

    private _roundCount = 0;
    private _fightPhase = 1;
    public get fightPhase(): number {
        return this._fightPhase;
    }
    private _wingsDestroyed = false;
    private _defMode = 0; // 0- none, 1- hp, 2- lust

    protected performCombatAction(): void {
        this._roundCount++;

        switch (this._fightPhase) {
            case 1:
                this.phase1();
                break;
            case 2:
                this.phase2();
                break;
            case 3:
                this.phase3();
                break;
            default:
                this.phase1();
                break;
        }
        this.combatRoundOver();
    }

    private phase1(): void {
        const atks: any[] = [this.demonicArouse, this.demonfire];
        if (this._roundCount % 10 == 3) atks.push(this.rapetacles);
        if (this.player.findStatusAffect(StatusAffects.Blind) < 0) atks.push(this.wingbuffet);
        atks[Lethice.rand(atks.length)]();
    }

    private demonicArouse(): void {
        this.outx(
            "Lethice’s hands blur in a familiar set of arcane motions, similar to the magical gestures you’ve seen from the imps. Hers are a thousand times more intricate. Her slender fingers move with all the precision of a master artist’s brush, wreathed in sparks of black energy."
        );
        let l: number = this.player.lib / 10 + this.player.cor / 10 + 25;
        if (this.player.findStatusAffect(StatusAffects.MinotaurKingsTouch) >= 0) l *= 1.25;
        this.game.dynStats("lus", l);

        if (this.player.lust <= 30) this.outx("\n\nYou feel strangely warm.");
        else if (this.player.lust <= 60)
            this.outx(
                "\n\nBlood rushes to your groin as a surge of arousal hits you, making your knees weak."
            );
        else if (this.player.lust <= 75)
            this.outx(
                "\n\nDespite the dire situation, your mind keeps filling with images of Lethice fully uncovered, her body poised just inches away. You can’t help but want her."
            );
        else if (this.player.lust <= 90)
            this.outx(
                "\n\nThe dark power forces ideas into your mind, thoughts of you on your knees, hands shackled behind you and your mistress’s perfect, pretty pussy in front of you, awaiting your tongue. You barely shake it off."
            );
        else if (this.player.lust <= 100)
            this.outx(
                "\n\nYour mind is filled with visions of lovely pussies, perfect tits, and one overriding emotion - submission. She’s making you want to give up and indulge in her tainted wiles, and the worst part is... you’re having a hard time coming up with a reason not to. You barely pull back from an all-consuming image of her slick, juicy snatch, shaking your head in wonderment. How can you possibly defeat her?"
            );
        else
            this.outx(
                "You give yourself over to the alien imagery invading your mind, wallowing a dozen conflicting fantasies. In one, you’re tied to Lethice’s clit-piercing by a leash, lapping her spilled cunt-juice from the ground. In another, you’re begging her to let you tongue her asshole. Each is more perverse than the last, and they blend together into an endless tableau of submission."
            );
    }

    private rapetacles(): void {
        // Adds a button - Dispel - Only if PC knows Whitefire
        this.outx(
            "Lethice gestures at the ground underfoot. A pulse of black mist rolls out around you for dozens of feet in every direction. The crowd of watching demons pulls back fearfully, save for a few foolish slaves who blithely step into the magic circle. A second later, hundreds of oily, black tentacles emerge from the floor, unspooling from whatever horrible dimension they were summoned from. They immediately attack every living creature within reach, wrapping around wrists and ankles, violating vaginas and assholes alike. They come at you from every direction!"
        );

        // v1 - remaining duration
        // v2 - rounds applied
        // v3 - grappled
        if (this.player.canFly()) {
            this.outx("\n\nYou laugh as you fly out of their reach, immune to their touches.");
            this.player.createStatusAffect(
                StatusAffects.LethicesRapeTentacles,
                4 + Lethice.rand(2),
                0,
                0,
                0
            );
        } else if (this.combatMiss() || this.combatFlexibility() || this.combatEvade()) {
            this.outx("\n\nYou manage to sidestep the grasping tentacles with ease.");
            this.player.createStatusAffect(
                StatusAffects.LethicesRapeTentacles,
                4 + Lethice.rand(2),
                0,
                0,
                0
            );
        } else {
            this.outx(
                "\n\nYou aren’t fast enough to avoid them. They yank your arms and [legs] taut. Some burrow under your [armor], crawling toward your most sensitive, forbidden places."
            );
            this.player.createStatusAffect(
                StatusAffects.LethicesRapeTentacles,
                4 + Lethice.rand(2),
                0,
                1,
                0
            );
        }
    }

    public dispellRapetacles(): void {
        this.clearOutput();
        if (this.player.statusAffectv3(StatusAffects.LethicesRapeTentacles) == 0) {
            this.outx("You raise your arm and");
        } else {
            this.outx(
                "You struggle and manage to raise your arm against the tight grasp of the tentacles, managing to"
            );
        }
        this.outx(
            " spray forth a torrent of white flame, burning the shadowy constructs away in the light of your pure, focused fire. In the span of seconds, Lethice’s spell is gone."
        );

        this.game.doNext(this.game.combatMenu);
        this.game.fatigue(30, 1);
        this.outx("\n\n", false);
        this.flags[kFLAGS.SPELLS_CAST]++;
        this.game.spellPerkUnlock();
        this.game.statScreenRefresh();
        this.game.enemyAI();
    }

    private demonfire(): void {
        // I can’t believe it’s not whitefire. Cannot be avoided/blocked. Medium damage.
        this.outx(
            "Lethice narrows her eyes, focusing her mind with deadly intent. She snaps her fingers and a gout of black, twisting flames engulfs you!"
        );

        let damage: number = 100 + Lethice.rand(25);
        damage = this.player.takeDamage(damage);

        this.outx(` (${damage})`);
    }

    private wingbuffet(): void {
        this.outx(
            "Lethice flutters toward a burning brazier and flaps her wings, causing the flames to flare and thick gusts of smoke to flow past the assembled demons, straight at you!"
        );

        if (this.combatMiss() || this.combatFlexibility()) {
            this.outx(" You manage to slide under the waves of smoke.");
        } else {
            this.outx(
                " The cloying smoke gets in your eyes and your mouth, making you cough and sputter. Worst of all, you can’t see anything!"
            );
            this.player.createStatusAffect(StatusAffects.Blind, 2, 0, 0, 0);
            this.player.takeDamage(1);
            this.outx(" (1)");
        }
    }

    private claw(): void {
        this.outx(
            "Swooping low, the Demonic Queen takes a swipe at you with claws that are suddenly six inches long and as sharp as razors!"
        );

        let damage: number = this.str + this.weaponAttack - Lethice.rand(this.player.tou);

        if (this.combatMiss()) {
            this.outx("You manage to dodge her slash!");
        } else if (this.combatMisdirect()) {
            this.outx(" Misdirecting her with your movements, you avoid the swipe.");
        } else if (this.combatFlexibility()) {
            this.outx(" With your feline flexibility, you bend double to avoid the swipe.");
        } else if (this.combatEvade()) {
            this.outx(" You evade her slash with a quick roll.");
        } else {
            damage = this.player.takeDamage(damage);
            if (damage <= 5) {
                this.outx(
                    ` She barely scratches you. She’ll need stronger weapons than that to take you down. (${damage})`
                );
            } else {
                this.outx(` Damn, that hurts! (${damage})`);
            }
        }
    }

    public grappleStruggle(): void {
        this.clearOutput();
        this.outx(
            "You pull with all your might against the grasping tentacles to no avail; their grip is simply too strong!"
        );
        this.game.enemyAI();
    }

    public grappleWait(): void {
        this.clearOutput();
        this.outx(
            "You can't bring yourself to fight back against Lethice's tentaclespawn. The sensuous, coiling grasp around your limbs, their questing, pliant tips digging around inside your [armor]... you relax in their grip for a little while longer, too enticed by their movement to struggle right now."
        );
        this.game.enemyAI();
    }

    private phase1Ends(hpVictory: boolean): void {
        this.clearOutput();
        if (hpVictory) {
            if (this.player.canFly()) {
                this.outx(
                    "Even held aloft by her sprawling dragon wings, Lethice can’t hide from your righteous wrath."
                );
                this.outx(
                    " Taking wing yourself, you slam into the demoness, striking a final blow that sends her toppling to the ground. She shrieks and spirals, crashing into the hard stone floor just before her throne."
                );
            } else if (this.flags[kFLAGS.LAST_ATTACK_TYPE] == 1) {
                this.outx(
                    "Even held aloft by her sprawling dragon wings, Lethice can’t hide from your righteous wrath."
                );
                this.outx(
                    " You draw your bowstring and let loose one last arrow, sending the missile hurtling through the air - and right into Lethice’s wing! The Demon Queen lets out an ear-piercing shriek of pain and, with her wing flopping weakly beside her, goes tumbling to the earth! She’s down!"
                );
            } else if (this.flags[kFLAGS.LAST_ATTACK_TYPE] == 2) {
                this.outx(
                    "Unable to resist your arcane assault, Lethice lets loose a howl of frustration and swoops back to the earth, mounting her throne once again."
                );
            }
        } else {
            this.outx(
                "Unable to resist your sensual assault, Lethice lets loose a howl of frustration and swoops back to the earth, mounting her throne once again."
            );
        }

        this.outx(
            "\n\n<i>“I tire of this game!”</i> she shouts, grasping at the arms of her towering throne. Suddenly, her gaze snaps from you, to the horde of demons clamoring in the stands. <i>“What are you waiting for, fools!? Get [himher]!”</i>"
        );
        this.outx(
            "\n\nOh, shit. You look up in time to see a cavalcade of demonic flesh swooping down from on high, bodies practically tumbling one over the other to get at you. The horde takes every physical form imaginable: towering, hulking brutish males, inhumanly curvaceous succubi, and the reverse of both - not to mention hermaphrodites masculine and feminine - and all with every sort of transformation. Bestial creatures, dragon-like incubi, and succubi whose skins range the colors of the rainbow and so, so much more come piling down the throne hall in a ceaseless barrage of flesh and decadence. They won’t stop until they’ve dragged you to the ground and fucked you into submission!"
        );

        // 9999 reconfigure for the group
        this.HP = this.eMaxHP();
        this.lust = 10;
        this._fightPhase = 2;
        this.a = "the ";
        this.short = "demons";
        this.plural = true;
        this.pronoun1 = "they";
        this.pronoun2 = "them";
        this.pronoun3 = "their";

        if (this.findStatusAffect(StatusAffects.PhysicalDisabled) >= 0)
            this.removeStatusAffect(StatusAffects.PhysicalDisabled);
        if (this.findStatusAffect(StatusAffects.AttackDisabled) >= 0)
            this.removeStatusAffect(StatusAffects.AttackDisabled);

        this.combatRoundOver();
    }

    private phase2(): void {
        const atks: any[] = [
            this.demonLustMagic,
            this.dirtyDancing,
            this.hornyPoke,
            this.crushingBodies,
        ];
        if (Lethice.rand(10) == 0 && this.player.findStatusAffect(StatusAffects.Blind) < 0)
            atks.push(this.bukkakeTime);

        atks[Lethice.rand(atks.length)]();
        this.combatRoundOver();
    }

    private demonLustMagic(): void {
        let l = 0;
        this.outx(
            "Though the front rank of demons are compressed so tight against you by their cohorts that they can’t move, the second and third rings have more than ample room to move their arms about, tracing arcane runes in the air. You know you can resist the lust-magics of a mere demon, but so many at once..."
        );

        if (Lethice.rand(100) >= this.player.lib / 2) {
            this.outx(
                "\n\nYou close your eyes, focusing the entirety of your will inwards. Though a burn of arousal stings your flesh, you keep your mind centered long enough to resist the brunt of the demon's magic. Taking a deep breath, you let out a raging battle cry and shove the horde back, punishing those who dared try to ensorcell you."
            );
        } else if (this.player.lust <= 33) {
            this.outx(
                "\n\nYou try your hardest to push back the lustful, submissive thoughts that begin to permeate your mind, but against so many concentrated wills... even you can't hold back. You moan as the first hints of arousal spread through you, burning in your loins. What you wouldn't give for a fuck about now!"
            );
            l = this.player.lib / 10 + this.player.cor / 10 + 10;
            if (this.player.findStatusAffect(StatusAffects.MinotaurKingsTouch) >= 0) l *= 1.25;
            this.game.dynStats("lus", l);
        } else if (this.player.lust <= 66) {
            this.outx(
                "\n\nAt first, you try to think of something else... but in your state, that just ends up being sex: hot, dirty, sweaty fucking surrounded by a sea of bodies. With a gasp, you realize you've left yourself open to the demons, and they're all too happy to flood your mind with images of submission and wanton debauchery, trying to trick you into letting them take you!"
            );
            l = this.player.lib / 10 + this.player.cor / 10 + 10;
            if (this.player.findStatusAffect(StatusAffects.MinotaurKingsTouch) >= 0) l *= 1.25;
            this.game.dynStats("lus", l);
        } else {
            this.outx(
                "\n\nYou don't even try to resist anymore -- your mind is already a cornucopia of lustful thoughts, mixed together with desire that burns in your veins and swells in your loins, all but crippling your ability to resist. The demons only add to it, fueling your wanton imagination with images of hedonistic submission, of all the wondrous things they could do to you if you only gave them the chance. It's damn hard not to."
            );
            l = this.player.lib / 10 + this.player.cor / 10 + 10;
            if (this.player.findStatusAffect(StatusAffects.MinotaurKingsTouch) >= 0) l *= 1.25;
            this.game.dynStats("lus", l);
        }
    }

    private dirtyDancing(): void {
        this.outx(
            "The demons closest to you are basically pinned between your body and those behind them, all surging forward to get at you - and half of them are being fucked or teased by the laggards, with cocks and over-sized clits thrusting with wild abandon. Nevertheless, the closest demons are just as determined as the others to make you theirs, even if their options are severely limited. So they do what they can: they dance and grind and thrust themselves against you, smearing your [armor] with milk and feminine excitement and musky, salty pre-cum between showing you with ample, soft flesh and hard muscle."
        );
        if (Lethice.rand(100) >= this.player.lib / 2) {
            this.outx(
                "\n\nYou push back as hard as you can, throwing back the whorish bodies trying to capture your attentions. Several succubi whine and moan at you, pouting that their lustful dances weren't satisfying to you -- like you just insulted them on a personal level. Others are quick to replace them, though, instantly filling the gaps you leave in the crushing tide of bodies."
            );
        } else {
            if (this.player.lust <= 33)
                this.outx(
                    "\n\nYou try and push back, to ignore the lustful bodies and lurid performances going on around you, but the effect they have on you is undeniable -- heat spreads like wildfire through your [skinFurScales], and your [armor] suddenly feels a whole lot less comfortable."
                );
            else if (this.player.lust <= 66)
                this.outx(
                    "\n\nTry as you might to resist, the demons are having an effect on you! Your whole body is flushed with unbidden arousal, burning with lust for the demonic sluts pressing against you. The temptresses are almost enough to want to make you lay down your arms and bend one of them double for a good, hard fuck!"
                );
            else
                this.outx(
                    "\n\nOh gods! The way their bodies undulate, caressing and cumming, moaning as they're fucked from behind and transfer all of that energy to you, makes your body burn with desire. It's almost too much to bear!"
                );
            let l: number = this.player.lib / 10 + this.player.cor / 10 + 10;
            if (this.player.findStatusAffect(StatusAffects.MinotaurKingsTouch) >= 0) l *= 1.25;
            this.game.dynStats("lus", l);
        }
    }

    private hornyPoke(): void {
        this.outx(
            "Several of the demons nearest you have grown immense sets of curling, sharp horns. When they can’t get at you to sexually provoke or hurl magic at you, they’re more than content to just give you an old-fashioned ram!"
        );

        if (this.combatMiss()) {
            this.outx(" You deftly dodge out of the way!");
        } else if (this.combatMisdirect()) {
            this.outx(
                " At least, they try to! Too bad for them you’re already elsewhere in the crowd, well away from harm!"
            );
        } else if (this.combatFlexibility()) {
            this.outx(
                " You contort and bend in ways a human never could, easily twisting between all the pairs of horns the demons can thrust at you. By the time they’re done, you’re sitting on top of a demon’s head, balanced on his antlers until with a furious howl he throws you back into the sea of maledicts."
            );
        } else if (this.combatEvade()) {
            this.outx(
                " You manage to duck down enough to avoid the worst of the horn-spikes, and your [armor] deflects the rest!"
            );
        } else {
            let damage: number = 70 - Lethice.rand(this.player.tou);
            damage = this.player.takeDamage(damage);
            this.outx(
                ` Several of the big, stout horns slam into you, given all the more force thanks to the crushing waves of demons pushing them forward. You yelp in pain as they score your flesh! (${damage})`
            );
        }
    }

    private crushingBodies(): void {
        this.outx(
            "The sheer weight of a hundred demonic bodies crushing down on you is enough to make you cry out in discomfort, then pain. Are they just trying to crush you to death!?"
        );
        if (this.combatEvade()) {
            this.outx(
                "\n\nYou drop to the ground, squirming between several of their legs until you get somewhere you can stand again -- this time without breaking your ribs. Howls of frustration and anger echo through the hall, and the horde just comes barreling down on your again!"
            );
        } else {
            let damage: number = 70 - Lethice.rand(this.player.tou);
            damage = this.player.takeDamage(damage);

            this.outx(
                ` You squirm out of their crushing embrace, trying to crawl away on the ground, but if they can't squeeze you down the demons seem happy to trample you! You scream in alarm and pain as dozens of feet, hooves, claws, and other appendages come crushing down on you! (${damage})`
            );
        }
    }

    private bukkakeTime(): void {
        this.outx(
            "Considering how half of the demon host is just getting fucked by whoever’s behind them, it’s just a question of how long they last before the cum starts flowing. The answer just happens to be now! You gasp and gag as the air is suddenly flooded by the reek of potent, virile jizz, and ropes of thick white spunk start flying through the air. This is less of a gank mob and more of an orgy now!"
        );

        if (this.combatMiss()) {
            this.outx(
                " You grab the biggest incubus you can find and shove him in the way of the airborne bukkake, letting his burly back take the brunt of the demons’ load. He grunts in displeasure, giving you a rough shove back into the demonic gang-bang. <i>“No escape!”</i>"
            );
        } else if (this.combatMisdirect()) {
            this.outx(
                " You duck under the nearest group of succubi, happily letting the demonic hussies get plastering with the wave of flying spooge. They seem to enjoy it, too, and quickly you’re surrounded by less demonic fighting and much, much more infernal cock-sucking. Seems they’re hungry!"
            );
        } else if (this.combatFlexibility()) {
            this.outx(
                " You do a graceful backflip out of the way, making sure it’s a group of eager succubi who get painted white with cum rather than you!"
            );
        } else if (this.combatEvade()) {
            this.outx(
                " You at least manage to close your eyes before the wave of spooge hits you, splattering all over your [armor]."
            );
            this.game.dynStats("lus", 5);
        } else {
            this.outx(
                " You take a huge, fat, musky glob of spunk right to the eyes! You yelp in alarm, trying to wipe the salty, burning demonic cock-cream out, but it's simply too thick! Yuck!"
            );
            this.game.dynStats("lus", 5);
            this.player.createStatusAffect(StatusAffects.Blind, 2 + Lethice.rand(2), 0, 0, 0);
        }
    }

    private phase2Ends(hpVictory: boolean): void {
        this.clearOutput();
        if (hpVictory) {
            this.outx(
                "The last of the demons falls to your [weapon], crumpling into an unconscious lump before you. A few are crawling haplessly away, retreating to the stands with the rest of their fellows - those too timid to fight at all."
            );
        } else {
            this.outx(
                "Lethice’s minions have all but turned into an orgy, completely forgetting their original intent, no matter how much their draconic queen screeches for them to attack."
            );
        }

        this.outx(
            "\n\nWhile the demons are down, and Lethice is still recovering from your first skirmish, you have a much-needed moment to relieve the tensions starting to grow within you. Or you could press the attack, and take the fight to the queen."
        );

        this.game.menu();
        if (this.player.hasCock() || this.player.hasVagina())
            this.game.addButton(0, "DemonFuck", this.p2DemonFuck, hpVictory);
        if (this.player.findStatusAffect(StatusAffects.KnowsHeal) >= 0)
            this.game.addButton(1, "Heal", this.p2Heal);
        this.game.addButton(2, "Next", this.p2Next);
    }

    private p2DemonFuck(hpVictory: boolean): void {
        this.clearOutput();

        this.outx("Rather than advance on Lethice, you turn your attention to the pile of demons");
        if (hpVictory) this.outx(" lying stunned and helpless");
        else this.outx(" who’ve fallen into a frenzied orgy");
        this.outx(
            " on the floor. One in particular catches your attention: a purple-skinned harlot of an omnibus, with bone-formed high heels and voluptuous breasts and hips and a throbbing canine’s cock swinging between her legs, resting over a positively massive pair of balls, more like what you’d expect to be swinging under a centaur’s shaft. You reach down and grab her by her curling horns, pulling her off the crotch of another demon and pulling your [armor] aside to reveal your own"
        );
        if (this.player.hasCock()) this.outx(" cock.");
        else this.outx(" cunt.");

        this.outx(
            "\n\n<i>“O-oh my!”</i> she purrs, black eyes batting at you as you make your intentions clear. <i>“Here I thought you were saving this for the queen.”</i>"
        );
        this.outx(
            "\n\nYou growl for her to get started, prompting her to slither out a forked tongue to"
        );
        if (this.player.hasCock()) this.outx(" wrap around your [cock]");
        else this.outx(" lap across the lips of your [cunt]");
        this.outx(
            ". Shudders of pleasure almost instantly begin to wrack your body, reacting to the demoness’s talented touch. She’s certainly skilled with her tongue, flicking and licking and caressing your sex with vigorous determination. You guide her movements by her demonic horns at first, but soon find yourself too busy gasping and moaning to try and control her - there’s no point, when she’s this good at"
        );
        if (!this.player.hasCock()) this.outx(" munching rug.");
        else this.outx(" sucking cock.");
        this.outx(
            "\n\nAround you, spurred on by your face-fucking the omnibus, the defeated demon court undulates in waves of orgiastic pleasure, gleefully sucking each other’s cocks, penetrating any hole they can find, or simply rolling on the floor locked in each other’s sensual embraces. Those that didn’t join the fight hoot and holler from the stands, encouraging you to fuck the omnibus like the eager slut she is. For her part, the horny demon just smirks up at you between long, loving licks across your sex."
        );

        // [Oral Finish] [Fuck Demoncunt] [Ride Dogcock]
        this.game.menu();
        this.game.addButton(0, "OralFinish", this.oralFinish);
        if (this.player.hasCock()) this.game.addButton(1, "FuckDemon", this.fuckDemon);
        this.game.addButton(2, "RideCock", this.rideCock);
    }

    private oralFinish(): void {
        this.clearOutput();

        if (this.player.hasCock()) {
            this.outx(
                "You ignore the horde’s jeers, grinding your hips against the omnibus’s face until you feel the tell-tale rise of climax surging through you. Her throat bulges around your [cock] and the load of salty spunk you pour down her gullet, right up until you pull out and give her face a showering for good measure."
            );
            this.outx(
                "\n\nSated, you give the well-used omnibus a shove back into the demon fuck-pile and ready your [weapon]. Confident in your readiness, you advance on Lethice."
            );
        } else {
            this.outx(
                "You disregard the demons’ demands, instead focusing on grinding your hips on the omnibus’s face, slathering her chin and cheeks with slick feminine excitement. She moans in appreciation, wrapping a hand around her over-sized doggy-cock and stroking it furiously to the same rhythm of her tongue’s exploration of your [cunt]. With such single-minded intention, it doesn’t take the demon slut long at all to bring you to a well-deserved climax - and herself as well, spraying a thick, musky rope of cum across your [feet] while you smear her face with orgasmic juices."
            );
            this.outx(
                "\n\nSated, you give the well-used omnibus a shove back into the demon fuck-pile and ready your [weapon]. Confident in your readiness, you advance on Lethice."
            );
        }

        this.player.orgasm();
        this.beginPhase3(true);
    }

    private fuckDemon(): void {
        this.clearOutput();

        this.outx(
            "The demons’ urging tears down your self-control, and with a grunt of effort and desire, you shove the omnibus down on her back. She yelps with surprise, but her fall is cushioned by the massive, milky tits of a cow-girl-turned-demon behind her who’s busily sucking a pair of demonic dongs. Your omnibus recovers from her surprise in a heartbeat, turning it into a luxurious stretch that spreads her pussy-lips open under the hefty, churning weight of her equine-like balls."
        );
        this.outx(
            "\n\nYou lunge on her the moment you see that vermillion slit opening, driving your [cock] to the hilt inside the sloppy twat and making the omnibus moan with delight. Her canid cock bobs up at full mast, poking at your [chest]"
        );
        if (this.player.hasFuckableNipples())
            this.outx(" until you give her a wicked grin and guide the tip inside your [nipple]");
        else this.outx(" and smearing your [skinFurScales] with pre");
        this.outx(
            ". You grab her melon-sized tits and squeeze them as hard as you can while you hammer your [hips] forward, taking advantage of the silky-wet vice of her twat to milk yourself to orgasm. She’s practically an ona-hole for you, only able to squirm around and moan while you pound away."
        );
        this.outx(
            "\n\nSuddenly, your entire body tenses, shivering with new sensation. You look over your shoulder in time to see another succubus crawling up behind you, running her tongue through the crack of your ass"
        );
        if (this.player.balls > 0) this.outx(" and around your balls");
        else this.outx(" down to the base of your cock");
        this.outx(
            ". Another demoness snuggles up behind you, pressing a hefty pair of jugs into your back and murmuring about how she wants to see you breed that hermaphroditic cum-slut under you."
        );
        this.outx(
            "\n\nWith more and more demons crawling up over you, urging you to cement your victory on their companion or adding to your pleasure with mouths and corrupted tongues, it’s not long before you surrender to your body’s carnal demands. Giving one last, mighty thrust into the omnibus’s twat, you grunt with the surging pleasure of cum swelling through your shaft, spilling out and basting the demoness’s womb. She cries out, bucking her hips against you and quickly following you with a shot of her own"
        );
        if (!this.player.hasFuckableNipples()) this.outx(" that splatters all over your chest");
        else this.outx(" right into your tit");
        this.outx(
            "! You give her a reproachful look, still grinding your hips as the aftershocks of orgasm pass."
        );
        this.outx(
            "\n\n<i>“Not sorry,”</i> she giggles, running a finger around her cum-smeared twat and pushing every spare droplet back in as you pull out. <i>“Mmm, that’ll make for a lovely brood of imps, </i>Champion<i>!”</i>"
        );
        this.outx(
            "\n\nShuddering at the thought, you grab your gear and stagger up and away, leaving the demons to finish each other off. Confident in your readiness, you advance on Lethice."
        );

        this.player.orgasm();
        this.beginPhase3(true);
    }

    private rideCock(): void {
        this.clearOutput();

        this.outx(
            "Considering the demons seem intent on having you get down and dirty with their defeated compatriot, you figure you might as well get the most out of the moment. Lethice doesn’t seem to be in any hurry to resume your battle, after all!"
        );
        this.outx(
            "\n\nYou give the buxom demon hermaphrodite down on her ass, letting her rest her head in the lap of another cow-girl demon who’s busy sucking off a two-cock’d incubus, and crawl up her shapely red body. <i>“Oooh,”</i> the omnibus coos as her throbbing red rocket is pressed between your bodies. <i>“Gonna go for a ride, Champion?”</i>"
        );
        this.outx(
            "\n\nDamn right you are. You grab her tits, sinking your fingers into the soft, crimson udders as you straddle her hips and grind your [vagOrAss] against the demon’s tumescent shaft. She’s hung like a stud, rock hard and ready to roll before you even get near her pointed crown. You feel her hands grasp your [hips], guiding you down until your [vagOrAss] is sinking onto her thick rod. Your belly bulges with the sheer length of cockflesh sliding into you, and your mind goes blank with overwhelming pleasure."
        );
        this.outx(
            "\n\nIt takes you a moment to recover from the initial shock, but when you do, you start moving with a vengeance, bouncing on the demonic doggy-cock with mounting speed. Its owner moans and squirms beneath you, too weakened from your fight to do anything but go along for the ride. Still, her big, black nipples are hard as rocks in your hand, and her pussy soaks both your thighs in her ever-rising excitement."
        );
        this.outx(
            "\n\nSuddenly, your entire body tenses, shivering with new sensation. You look over your shoulder in time to see another succubus crawling up behind you,"
        );
        if (this.player.hasVagina()) this.outx(" licking at your [cunt]");
        else
            this.outx(
                " reaching around to give your unused [cocks] a tug}. Another demoness snuggles up behind you, pressing a hefty pair of jugs into your back and murmuring about how she wants to see you get bred by that hermaphroditic stud under you."
            );
        this.outx(
            "\n\nWith more and more demons crawling up over you, urging you to cement your victory on their companion or adding to your pleasure with mouths and corrupted tongues, it’s not long before you surrender to your body’s carnal demands. You grind your hips hard and fast against the demoness’s mis-matched crotch, loving the way her churning black balls ride in your ass, the way her fist-thick knot hammers against your [vagOrAss]. With so many sensations assaulting your body, it’s impossible to hold back. Screaming your ecstasy for the whole hall to hear, you climax, body shuddering and clenching hard around the thick demonic cock spreading you open."
        );
        this.outx(
            "\n\nThe demoness isn’t far behind. She grabs your hips hard enough that her nails score your flesh, and you feel a rush of sticky, wet heat flooding your"
        );
        if (this.player.hasVagina()) this.outx(" womb");
        else this.outx(" bowels");
        this.outx(
            ". You only barely keep your wits about you enough to push her back down before she can force her knot inside you, though you’re treated to a veritable waterfall of white spunk pouring out of your well-bred hole instead."
        );
        this.outx(
            "\n\n<i>“I can see why they call you ‘Champion,’”</i> the demon purrs as her spunk-slathered red prick flops against her belly. <i>“Maybe after our queen beats you down, I’ll come visit you in the breaking tanks... I could always use another eager little broodmare.”</i>"
        );
        this.outx(
            "\n\nYou shove the demoness away, suddenly reminded of her true nature. At least for now, you’re sated. Confident in your readiness, you advance on Lethice."
        );

        this.player.orgasm();
        this.beginPhase3(true);
    }

    private p2Heal(): void {
        this.clearOutput();
        this.outx(
            "Drawing on your magic, you use the opportunity to mend your wounds. No foe dares challenge you during the brief lull in battle, enabling you to maintain perfect concentration. With your flesh freshly knit and ready for battle, you look to Lethice."
        );
        let temp: number = Math.floor(
            (this.player.inte / (2 + Lethice.rand(3))) *
                this.game.spellMod() *
                (this.player.maxHP() / 150)
        );
        if (this.player.armorName == "skimpy nurse's outfit") temp *= 1.2;
        this.game.HPChange(temp, false);

        this.beginPhase3(true);
    }

    private p2Next(): void {
        this.clearOutput();

        this.outx(
            "<i>“Useless whelps,”</i> Lethice growls, rising back to her feet and spreading her"
        );
        if (this._wingsDestroyed) this.outx(" tattered");
        this.outx(
            " draconic wings behind herself, letting them flare out to their full majesty. She grabs a whip from her flank and uncoils it with a snap, cracking it just over your head. Black fire seethes on the length of the whip, burning with corrupt magics that make the air reek of sex and desire around her."
        );
        this.outx(
            "\n\n<i>“Very well, Champion,”</i> she snarls, throwing aside her goblet of Lethicite. The crystals go scattering as the vessel shatters on the flagstone, and in an instant even the defeated demons are scrambling for the gems, making the floor you fight on a rabid hell to walk through. <i>“I see I’ll have to finish you myself! Let us see what you’re really made of... before I rape your soul out of your body!”</i>"
        );

        this.beginPhase3(false);
    }

    private beginPhase3(doLethNext: boolean): void {
        // 9999 configure phase 3

        this._fightPhase = 3;
        this.HP = this.eMaxHP();
        this.lust = 10;
        this._defMode = 1;

        this.a = "";
        this.short = "Lethice";
        this.plural = false;
        this.pronoun1 = "she";
        this.pronoun2 = "her";
        this.pronoun3 = "her";

        this.game.menu();

        if (doLethNext) this.game.addButton(0, "Next", this.p2Next);
        else this.combatRoundOver();
    }

    private phase3(): void {
        // Every turn she boosts her defense against lust or HP depending on how the PC damaged her.

        // If you hit her with a physical attack, the next turn she’ll have massive evasion (200 speed or some shit) and massively boosted defense.
        // GEDNOTE: We can't really do this- CoCs combat was NEVER designed with that in mind wrt to enemy stats, it would mean modifying EVERY player attack, spell and special to account for it. However, I figured out a potential workaround that covers this so....

        // If you hit her with a lusty-damaging attack, she will become immune to lust damage for one turn. Might also have other special resistances too. Will detail in text in the “Reactions” section.

        if (
            this.flags[kFLAGS.LAST_ATTACK_TYPE] == 1 ||
            this.flags[kFLAGS.LAST_ATTACK_TYPE] == 2 ||
            this.flags[kFLAGS.LAST_ATTACK_TYPE] == 4
        )
            this._defMode = 1;
        else this._defMode = 2;

        if (this._defMode == 1) {
            this.outx(
                "Lethice dabs at her injury, then licks her finger, smiling sensually. She seems excited and invigorated. Scales appear over her skin, and her spaded tail swishes back and forth in a blur, too fast to follow.\n\n"
            );
            this.spe = 400;
            this.armorDef = 400;
            this.lustVuln = 1.125;
        } else {
            this.outx(
                "Shuddering, the Demon Queen steels herself. Her curves soften visibly as she prepares herself for additional arousing efforts, forgoing physical defense.\n\n"
            );
            this.spe = 80;
            this.armorDef = 14;
            this.lustVuln = 0.0;
        }

        if (this._roundCount == 5) this.gropehands();
        else {
            const atks: any[] = [this.parasiteThrowingStars, this.whiptrip, this.sonicwhip];
            if (this.player.findStatusAffect(StatusAffects.WhipSilence) < 0)
                atks.push(this.whipchoke);

            atks[Lethice.rand(atks.length)]();
        }
    }

    private parasiteThrowingStars(): void {
        this.outx(
            "Lethice retrieves three squirming, star-shaped creatures from beneath her clothes and flings them at you. A split second after they leave her hand, needles burst from their edges!"
        );

        if (this.combatMiss()) {
            this.outx(" The living throwing stars whistle by you, barely missing you.");
        } else if (this.combatEvade()) {
            this.outx(" You barely avoid the living throwing stars.");
        } else if (this.combatMisdirect()) {
            this.outx(" Your misdirecting movements allow you to avoid the living throwing stars.");
        } else if (this.combatFlexibility()) {
            this.outx(" You bend over backwards to avoid the living throwing stars.");
        } else {
            let l: number = this.player.lib / 10 + this.player.cor / 10 + 10;
            if (this.player.findStatusAffect(StatusAffects.MinotaurKingsTouch) >= 0) l *= 1.25;
            this.game.dynStats("lus", l);

            let damage: number = this.str + this.weaponAttack - Lethice.rand(this.player.tou);
            damage = this.player.takeDamage(damage);

            this.outx(
                " You can’t avoid them all! One clips you on its way past, ripping into your [skin] and leaving you feeling... flushed and hot in its wake."
            );
            if (this.player.hasCock()) {
                this.outx(
                    " There’s suddenly a dearth of room in the crotch of your [armor], rubbing distractingly and slowing you with added weight. <b>[EachCock] has grown bigger!</b>"
                );

                this.player.increaseEachCock(1);
            } else if (this.player.biggestTitSize() <= 0) {
                this.outx(
                    " The inside of your [armor] is suddenly pressing back on your [nipples]. <b>You’ve grown breasts!</b> That bitch!"
                );
                this.player.growTits(3, this.player.breastRows.length, false, 2);
            } else {
                this.outx(
                    " There’s suddenly a dearth of room in the chest of your [armor]. Your [chest] are expanding, bouncing distractingly and slowing you with the extra weight!"
                );
                this.player.growTits(2, this.player.breastRows.length, false, 2);
            }

            this.outx(` (${damage})`);
        }
    }

    private whiptrip(): void {
        // Light damages even on avoidance. Can stun.
        this.outx("Lethice slashes her whip in a wide, low arc.");

        let minDamage = false;

        if (this.combatMiss()) {
            this.outx(" You jump over it at the last second, the heat singing your [feet].");
            minDamage = true;
        } else if (this.combatEvade()) {
            this.outx(" You evade her trip, but the heat pouring off the whip singes your [feet].");
            minDamage = true;
        } else {
            this.outx(
                "You try to avoid it, but the burning weapon catches your [leg], simultaneously scorching your flesh and attempting to pull you off balance."
            );

            if (this.player.findPerk(PerkLib.Resolute) < 0 && Lethice.rand(this.player.tou) <= 25) {
                this.outx(
                    " The ground rushes up at you awful fast. Lethice has tripped you, <b>stunning you!</b>"
                );
                this.player.createStatusAffect(StatusAffects.Stunned, 1, 0, 0, 0);
            } else {
                this.outx(
                    " Lethice is going to need to pull a lot harder if she wants to trip you."
                );
            }
        }

        let damage: number;
        if (minDamage) {
            damage = 25 + this.weaponAttack - Lethice.rand(this.player.tou);
        } else {
            damage = 100 + this.weaponAttack + this.str - Lethice.rand(this.player.tou);
        }

        damage = this.player.takeDamage(damage);

        this.outx(` (${damage})`);
    }

    private sonicwhip(): void {
        this.outx(
            "Lethice raises her sizzling, flame-spitting whip high up overhead, then snaps her arm out and back in an instant, cracking the whip so hard that it gives birth to a shockwave of flame and cacophonous thunder. There’s no avoiding the all-encompassing wave of energy. There’s not even time to brace yourself. It slams into you, rattling bones and scorching flesh."
        );

        let damage: number = 75 + this.weaponAttack + this.str;
        damage = this.player.takeDamage(damage);
        this.outx(` (${damage})`);
    }

    private whipchoke(): void {
        this.outx(
            "<i>“Silence your prattling, curr.”</i> Lethice strikes out with her whip, aimed at your neck!"
        );

        if (this.combatMiss()) {
            this.outx(" You barely avoid it.");
        } else if (this.combatEvade()) {
            this.outx(" You evade the targeted strike.");
        } else if (this.combatFlexibility()) {
            this.outx(" You twist aside at the last moment.");
        } else if (this.combatMisdirect()) {
            this.outx(
                " Raphael taught you well. Lethice failed to account for your misleading movements and swung wide."
            );
        } else {
            this.outx(
                "\n\nYou gasp when the burning cord encircles your throat, unable to speak and unable to discern why the licking flames haven’t scorched the flesh from your face. Laughing, the queen snaps her end of the whip off like a rotten cord, dropping the burning length to the ground with disdain. The unattached end loops around your neck again and again, binding tight. At the same time, fresh flame boils out of the tightly held handle, revealing a sinuously slithering implement of pain no worse for the wear."
            );
            this.outx("\n\n<b>You are effectively silenced!</b>");

            let damage: number = this.weaponAttack + 25 - Lethice.rand(this.player.tou);
            damage = this.player.takeDamage(damage);

            this.player.createStatusAffect(StatusAffects.WhipSilence, 3, 0, 0, 0);

            this.outx(` (${damage})`);
        }
    }

    private triplestroke(): void {
        // Three normal whip attacks
        this.outx(
            "Lethice’s arm blurs in figure eights, snapping the whip at you from every sides. You’ll have a tough time avoiding so many strikes!"
        );

        for (let i = 0; i < 3; i++) {
            if (this.attackSucceeded()) {
                const damage: number = this.eOneAttack();
                this.outputAttack(damage);
                this.postAttack(damage);
                this.game.statScreenRefresh();
                this.outx("\n");
            } else {
                this.outx(
                    "You duck and weave, barely managing to avoid a stinging slash from the whip!\n"
                );
            }
        }
    }

    private gropehands(): void {
        this.outx(
            "<i>“Let’s see how you fight while you’re being groped, shall we? A shame Pigby isn’t around to see how I’ve improved his hands,”</i> Lethice murmurs. Cupping her hands into a parody of lecher’s grip, the corruptive Queen squeezes and chants. Immediately, you feel phantasmal hands all over your body, reaching through your armor to fondle your bare [skinFurScales]. Digits slip into your [butt]. Fingertips brush your [nipples]. Warm palms slide down your quivering belly toward your vulnerable loins."
        );
        this.outx(
            "\n\nYou glare daggers at Lethice, but she merely laughs. <i>“A shame I never got to convince him that his hands were so much more effective when used like this.”</i>"
        );
        this.game.dynStats("lus", 5);
        this.player.createStatusAffect(StatusAffects.PigbysHands, 0, 0, 0, 0);
    }
}
