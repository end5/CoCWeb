import {
    ANAL_LOOSENESS_VIRGIN,
    ANAL_WETNESS_DRY,
    BUTT_RATING_LARGE,
    HIP_RATING_CURVY,
    TAIL_TYPE_COW,
    VAGINA_LOOSENESS_GAPING,
    VAGINA_WETNESS_DROOLING,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { Monster } from "../../Monster";
import { PerkLib } from "../../PerkLib";
import { StatusAffects } from "../../StatusAffects";

export class Isabella extends Monster {
    // IZZY AI:

    // Isabella Combat texttttttsss
    public isabellaAttack(): void {
        // [Standard attack]
        this.outx(
            "Isabella snorts and lowers a shield a moment before she begins to charge towards you. Her hooves tear huge divots out of the ground as she closes the distance with surprising speed!  ",
            false
        );

        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Isabella.rand(3) < 2) {
            this.outx("Isabella blindly tries to charge at you, but misses completely.\n", false);
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                "You duck aside at the last moment, relying entirely on your speed.\n",
                false
            );
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && Isabella.rand(100) < 10) {
            this.outx("You easily evade her incredibly linear attack.\n", false);
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Isabella.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx("You easily misdirect her and step aside at the last moment.\n", false);
        }
        // Determine if cat'ed
        else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Isabella.rand(100) < 6) {
            this.outx(
                "You throw yourself out of the way with cat-like agility at the last moment, avoiding her attack.\n",
                false
            );
        } else {
            let damage: number;
            damage = Math.round(
                this.weaponAttack +
                    this.str +
                    20 -
                    Isabella.rand(this.player.tou + this.player.armorDef)
            );
            if (damage < 0) {
                this.outx(
                    "You brace yourself and catch her shield in both hands, dragging through the dirt as you slow her charge to a stop.  She gapes down, completely awestruck by the show of power.",
                    false
                );
            } else {
                damage = this.player.takeDamage(damage);
                this.outx(
                    `She's coming too fast to dodge, and you're forced to try to stop her.  It doesn't work.  Isabella's shield hits you hard enough to ring your ears and knock you onto your back with bruising force. (${damage})\n`,
                    false
                );
            }
        }
        this.combatRoundOver();
    }

    public isabellaStun(): void {
        // [Stunning Impact]
        this.outx(
            "Isabella spins her shield back at you in a potent, steel-assisted backhand.  ",
            false
        );

        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Isabella.rand(3) < 2) {
            this.outx("Isabella blindly tries to charge at you, but misses completely.\n", false);
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                "You duck aside at the last moment, relying entirely on your speed.\n",
                false
            );
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && Isabella.rand(100) < 10) {
            this.outx("You easily evade her incredibly linear attack.\n", false);
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Isabella.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx("You easily misdirect her and step aside at the last moment.\n", false);
        }
        // Determine if cat'ed
        else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Isabella.rand(100) < 6) {
            this.outx("You bend backward with cat-like agility to avoid her attack.\n", false);
        } else {
            let damage = 0;
            damage = Math.round(
                this.weaponAttack + this.str - Isabella.rand(this.player.tou + this.player.armorDef)
            );
            if (damage < 0) {
                this.outx("You deflect her blow away, taking no damage.\n", false);
                damage = 0;
            } else if (this.player.findPerk(PerkLib.Resolute) >= 0 && this.player.tou >= 75) {
                this.outx("You resolutely ignore the blow thanks to your immense toughness.\n");
                damage = 0;
            } else {
                damage = this.player.takeDamage(damage);
                this.outx(
                    `You try to avoid it, but her steely attack connects, rocking you back.  You stagger about while trying to get your bearings, but it's all you can do to stay on your feet.  <b>Isabella has stunned you!</b> (${damage})\n`,
                    false
                );
                this.player.createStatusAffect(StatusAffects.IsabellaStunned, 0, 0, 0, 0);
            }
        }
        this.combatRoundOver();
    }

    public isabellaThroatPunch(): void {
        this.outx(
            "Isabella punches out from behind her shield in a punch aimed right at your throat!  ",
            false
        );

        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0 && Isabella.rand(3) < 2) {
            this.outx("Isabella blindly tries to charge at you, but misses completely.\n", false);
        }
        // Determine if dodged!
        else if (
            this.player.spe - this.spe > 0 &&
            Math.floor(Math.random() * ((this.player.spe - this.spe) / 4 + 80)) > 80
        ) {
            this.outx(
                "You duck aside at the last moment, relying entirely on your speed.\n",
                false
            );
        }
        // Determine if evaded
        else if (this.player.findPerk(PerkLib.Evade) >= 0 && Isabella.rand(100) < 10) {
            this.outx("You easily evade her incredibly linear attack.\n", false);
        }
        // ("Misdirection"
        else if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Isabella.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx("You easily misdirect her and step aside at the last moment.\n", false);
        }
        // Determine if cat'ed
        else if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Isabella.rand(100) < 6) {
            this.outx("You bend backward with cat-like agility to avoid her attack.\n", false);
        } else {
            let damage: number;
            damage = Math.round(this.str - Isabella.rand(this.player.tou + this.player.armorDef));
            if (damage <= 0) {
                this.outx("You manage to block her with your own fists.\n", false);
            } else if (this.player.findPerk(PerkLib.Resolute) >= 0 && this.player.tou >= 75) {
                this.outx("You resolutely ignore the blow thanks to your immense toughness.\n");
            } else {
                damage = this.player.takeDamage(damage);
                this.outx(
                    `You try your best to stop the onrushing fist, but it hits you square in the throat, nearly collapsing your windpipe entirely.  Gasping and sputtering, you try to breathe, and while it's difficult, you manage enough to prevent suffocation. <b>It will be impossible to focus to cast a spell in this state!</b> (${damage})\n`,
                    false
                );
                this.player.createStatusAffect(StatusAffects.ThroatPunch, 2, 0, 0, 0);
            }
        }
        this.combatRoundOver();
    }

    // [Milk Self-Heal]
    public drankMalkYaCunt(): void {
        this.outx(
            "Isabella pulls one of her breasts out of her low-cut shirt and begins to suckle at one of the many-tipped nipples. Her cheeks fill and hollow a few times while you watch with spellbound intensity.  She finishes and tucks the weighty orb away, blushing furiously.  The quick drink seems to have reinvigorated her, and watching it has definitely aroused you.",
            false
        );
        this.HP += 100;
        this.lust += 5;
        this.game.dynStats("lus", 10 + this.player.lib / 20);
        this.combatRoundOver();
    }

    protected performCombatAction(): void {
        // -If below 70% HP, 50% chance of milk drinking
        if (this.HPRatio() < 0.7 && Isabella.rand(3) == 0) this.drankMalkYaCunt();
        // if PC has spells and isn't silenced, 1/3 chance of silence.
        else if (
            this.player.hasSpells() &&
            this.player.findStatusAffect(StatusAffects.ThroatPunch) < 0 &&
            Isabella.rand(3) == 0
        ) {
            this.isabellaThroatPunch();
        }
        // if PC isn't stunned, 1/4 chance of stun
        else if (
            this.player.findStatusAffect(StatusAffects.IsabellaStunned) < 0 &&
            Isabella.rand(4) == 0
        ) {
            this.isabellaStun();
        } else this.isabellaAttack();
    }

    public defeated(hpVictory: boolean): void {
        this.game.isabellaScene.defeatIsabella();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (pcCameWorms) {
            this.outx('\n\n"<i>Ick,</i>" Isabella tuts as she turns to leave...');
            this.game.cleanupAfterCombat();
        } else {
            this.game.isabellaScene.isabellaDefeats();
        }
    }

    public constructor() {
        super();
        this.a = "";
        this.short = "Isabella";
        this.imageName = "isabella";
        this.long =
            "Isabella is a seven foot tall, red-headed tower of angry cow-girl.  She's snarling at you from behind her massive shield, stamping her hooves in irritation as she prepares to lay into you.  Her skin is dusky, nearly chocolate except for a few white spots spattered over her body.  She wears a tight silk shirt and a corset that barely supports her bountiful breasts, but it's hard to get a good look at them behind her giant shield.";
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_DROOLING, VAGINA_LOOSENESS_GAPING);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 45, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("EE+"));
        this.ass.analLooseness = ANAL_LOOSENESS_VIRGIN;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 38, 0, 0, 0);
        this.tallness = 7 * 12 + 6;
        this.hipRating = HIP_RATING_CURVY + 2;
        this.buttRating = BUTT_RATING_LARGE + 1;
        this.skinTone = "dusky";
        this.hairColor = "red";
        this.hairLength = 13;
        this.initStrTouSpeInte(70, 98, 75, 65);
        this.initLibSensCor(65, 25, 40);
        this.weaponName = "giant shield";
        this.weaponVerb = "smash";
        this.weaponAttack = 15;
        this.armorName = "giant shield";
        this.armorDef = 8;
        this.armorPerk = "";
        this.armorValue = 70;
        this.bonusHP = 700;
        this.lust = 30;
        this.lustVuln = 0.35;
        this.temperment = Isabella.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 15;
        this.gems = Isabella.rand(5) + 20;
        this.tailType = TAIL_TYPE_COW;
        this.tailRecharge = 0;
        this.drop = this.NO_DROP;
        this.checkMonster();
    }
}
