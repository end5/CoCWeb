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
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";
import { WeaponLib } from "../../../Items/WeaponLib";
import { Monster } from "../../../Monster";
import { StatusAffects } from "../../../StatusAffects";

export class MinotaurLord extends Monster {
    protected performCombatAction(): void {
        if (this.HP < 300 && this.statusAffectv1(StatusAffects.MinoMilk) < 4)
            this.minotaurDrankMalk();
        else if (MinotaurLord.rand(4) == 0 && this.player.weaponName != "fists")
            this.minotaurDisarm();
        else if (this.findStatusAffect(StatusAffects.Timer) < 0) this.minotaurLordEntangle();
        else if (this.findStatusAffect(StatusAffects.MinotaurEntangled) >= 0)
            this.minotaurCumPress();
        else {
            if (MinotaurLord.rand(2) == 0) this.minotaurPrecumTease();
            else this.eAttack();
        }
    }

    private minotaurDrankMalk(): void {
        this.outx(
            'The minotaur lord snorts audibly and turns to look at his mistress.  "<i>What is it, Fido, boy?  You thirsty?</i>"  The hulking minotaur nods.'
        );
        // Success: any
        if (this.statusAffectv1(StatusAffects.MinoMilk) < 3) {
            this.outx(
                '"<i>Catch!</i>"  The succubus throws a bottle containing a milky-white substance to the minotaur.  He grabs it and uncorks the bottle, quickly chugging its contents with obvious enjoyment.  After he is done he looks even more energetic and ready to fight, and his cock looks even harder!'
            );
            this.addHP(300);
            this.lust += 10;
            if (this.findStatusAffect(StatusAffects.MinoMilk) < 0)
                this.createStatusAffect(StatusAffects.MinoMilk, 1, 0, 0, 0);
            else this.addStatusValue(StatusAffects.MinoMilk, 1, 1);
        }
        // Failure: any
        else {
            this.outx(
                "\"<i>Well too bad!  We're all out of milk... but don't worry, my dear pet, I'll let you drink as much as you want after you're done with this bitch.</i>\"  The succubus replies, idly checking her elongated nails."
            );
            this.outx(
                "\n\nThe minotaur glares at you and snorts, obviously pissed at not getting his serving..."
            );
            this.addStatusValue(StatusAffects.MinoMilk, 1, 1);
        }
        kGAMECLASS.combatRoundOver();
    }

    private minotaurDisarm(): void {
        this.outx(
            "The giant of a minotaur raises his chain threateningly into the air, clearly intent on striking you down.  With your trained reflexes, you quickly move to block his blow with your halberd.  You recoil as the chain impacts your halberd with a loud clang, wrapping around it.  You smile triumphantly at the minotaur, only to glance at his smirk.  With a strong pull, he rips the halberd off your hands and into a corner of the room. Shit!"
        );
        this.outx(
            "\n\nThe succubus laughs maniacally.  \"<i>Good boy, Fido!  Take that fox slut's toys away so she'll be easier to play with!</i>\"  The minotaur puffs his chest, proud of himself for pleasing his mistress."
        );
        this.player.setWeapon(WeaponLib.FISTS);
        //
        //  player.weapon.unequip(player, false, true);
        kGAMECLASS.combatRoundOver();
    }

    private minotaurLordEntangle(): void {
        this.outx("The minotaur lord lashes out with his chain, swinging in a wide arc!\n");
        this.createStatusAffect(StatusAffects.Timer, 2 + MinotaurLord.rand(4), 0, 0, 0);
        // {dodge/whatever}
        if (
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        ) {
            this.outx(
                "You leap over the clumsy swing, allowing the chain to fly harmlessly underneath you!"
            );
        } else {
            this.outx(
                "You try to avoid it, but you're too slow, and the chain slaps into your hip, painfully bruising you with the strength of the blow, even through your armor.  The inertia carries the back half of the whip around you, and in a second, the chain has you all wrapped up with your arms pinned to your sides and your movement restricted."
            );
            this.outx(
                '\n\n"<i>Hahaha!  Good boy, Fido!  Leash that bitch up!</i>"  The succubus laughs with glee.'
            );
            this.outx(
                "\n\n<b>You're tangled up in the minotaur lord's chain, and at his mercy, unless you can break free!</b>"
            );
            this.createStatusAffect(StatusAffects.MinotaurEntangled, 0, 0, 0, 0);
        }
        this.combatRoundOver();
    }

    private minotaurCumPress(): void {
        this.outx(
            "The minotaur lord tugs on the end of the chain, pulling you toward him, making you spin round and round so many times that you're dazed and dizzy.  You can feel the links coming free of your fur, and the closer you get, the more freedom of movement you have.  Yet, the dizziness makes it hard to do anything other than stumble.  You splat into something wet, sticky, and spongy.  You gasp, breathing a heavy gasp of minotaur musk that makes your head spin in a whole different way.  You pry yourself away from the sweaty, sperm-soaked nuts you landed on and look up, admiring the towering horse-cock with its three-rings of pre-puce along its length.  A droplet of pre-cum as fat as your head smacks into your face, staggering you back and dulling your senses with narcotic lust."
        );
        kGAMECLASS.dynStats("lus", 22 + this.player.lib / 8 + this.player.sens / 8);
        this.outx(
            "You tumble to your knees a few feet away, compulsively licking it up.  Once it's gone, "
        );
        if (this.player.lust > 99) this.outx("you rise up, horny and hungry for more.");
        else {
            this.outx(
                "you realize what you've been doing.  Your embarrassment gives you the strength to re-adopt your fighting pose, but it's hard with how rigid"
            );
            if (this.player.lust >= 80) this.outx(" and drippy");
            this.outx(" your cock has become.  You want another taste...");
        }
        this.removeStatusAffect(StatusAffects.MinotaurEntangled);
        this.combatRoundOver();
    }

    private minotaurPrecumTease(): void {
        this.outx(
            "The minotaur smiles at you and lifts his loincloth, flicking it at you.  Thick ropes of pre-cum fly through the air in a swarm,"
        );
        if (MinotaurLord.rand(2) == 0) {
            this.outx(
                " slapping into your face before you can react!  You wipe the slick snot-like stuff out of your eyes and nose, "
            );
            if (this.player.lust >= 70)
                this.outx(
                    "swallowing it into your mouth without thinking.  You greedily guzzle the potent, narcotic aphrodisiac down, even going so far as to lick it from each of your fingers in turn, sucking every drop into your waiting gullet."
                );
            else this.outx("feeling your heart hammer lustily.");
            kGAMECLASS.dynStats("lus", 15 + this.player.lib / 8 + this.player.sens / 8);
        } else {
            this.outx(
                " right past your head, but the smell alone is enough to make you weak at the knees."
            );
            this.outx(
                "  The animalistic scent of it seems to get inside you, the musky aroma burning a path of liquid heat to your groin, stiffening your horse-cock to absurd degrees."
            );
            kGAMECLASS.dynStats("lus", 11 + this.player.lib / 10);
        }
        // (1)
        if (this.player.lust <= 75)
            this.outx(
                "  You shiver with need, wanting nothing more than to bury your face under that loincloth and slurp out every drop of goopey goodness."
            );
        else
            this.outx(
                "  <b>You groan and lick your lips over and over, craving the taste of him in your mouth.</b>"
            );
        kGAMECLASS.combatRoundOver();
    }

    public defeated(hpVictory: boolean): void {
        this.game.clearOutput();
        this.outx("The minotaur lord is defeated!  ");
        this.outx(
            "  You could use him for a quick fuck to sate your lusts before continuing on.  Do you?"
        );
        this.game.menu();
        this.game.addButton(0, "Fuck", this.game.urtaQuest.winRapeAMinoLordAsUrta);
        this.game.addButton(4, "Leave", this.game.urtaQuest.beatMinoLordOnToSuccubi);
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (hpVictory) this.game.urtaQuest.urtaLosesToMinotaurRoughVersion();
        else this.game.urtaQuest.urtaSubmitsToMinotaurBadEnd();
    }

    public constructor() {
        super();
        this.a = "the ";
        this.short = "minotaur lord";
        this.imageName = "minotaurlord";
        this.long =
            "Across from you is the biggest minotaur you've ever seen.  Fully eleven feet tall, this shaggy monstrosity has muscles so thick that they stand even through his thick, obscuring fur.  A leather collar with a tag indicates his status as 'pet' though it seems completely out of place on the herculean minotaur.  His legs and arms are like thick tree trunks, imposing and implacable, flexing fiercely with every movement.  This can only be a minotaur lord, a minotaur of strength and virility far beyond his lesser brothers. In his hands, a massive chain swings, connected to his collar, but used as an impromptu weapon for now.  A simple loincloth girds his groin, though it does little to hide the massive, erect length that tents it.  It winds up looking more like a simple, cloth condom than any sort of clothing, and it drips long strings of musky pre-slime in ribbons onto the ground.  Below, heavy testes, each easily the size of a basketball, swing in a taut, sloshing sack.  You can almost smell the liquid bounty he has for you, and the musk he's giving off makes it seem like a good idea...";
        // this.plural = false;
        this.createCock(MinotaurLord.rand(13 + 24), 2 + MinotaurLord.rand(3), CockTypesEnum.HORSE);
        this.balls = 2;
        this.ballSize = 2 + MinotaurLord.rand(13);
        this.cumMultiplier = 1.5;
        this.hoursSinceCum = this.ballSize * 10;
        this.createBreastRow(0);
        this.ass.analLooseness = ANAL_LOOSENESS_STRETCHED;
        this.ass.analWetness = ANAL_WETNESS_NORMAL;
        this.createStatusAffect(StatusAffects.BonusACapacity, 50, 0, 0, 0);
        this.tallness = MinotaurLord.rand(37) + 84;
        this.hipRating = HIP_RATING_AVERAGE;
        this.buttRating = BUTT_RATING_AVERAGE + 1;
        this.lowerBody = LOWER_BODY_TYPE_HOOFED;
        this.skinTone = "red";
        this.skinType = SKIN_TYPE_FUR;
        this.skinDesc = "shaggy fur";
        this.hairColor = MinotaurLord.randomChoice("black", "brown");
        this.hairLength = 3;
        this.faceType = FACE_COW_MINOTAUR;
        this.initStrTouSpeInte(125, 90, 30, 30);
        this.initLibSensCor(70, 25, 85);
        this.weaponName = "chain";
        this.weaponVerb = "chain-whip";
        this.weaponAttack = 50;
        this.armorName = "thick fur";
        this.bonusHP = 700;
        this.lust = 50;
        this.lustVuln = 0.33;
        this.temperment = MinotaurLord.TEMPERMENT_LUSTY_GRAPPLES;
        this.level = 15;
        this.gems = MinotaurLord.rand(5) + 5;
        this.drop = this.NO_DROP;
        this.tailType = TAIL_TYPE_COW;
        this.special1 = this.game.mountain.minotaurScene.minoPheromones;
        this.checkMonster();
    }
}
