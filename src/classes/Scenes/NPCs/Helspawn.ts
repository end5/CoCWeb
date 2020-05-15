import {
    ANAL_LOOSENESS_VIRGIN,
    ANAL_WETNESS_DRY,
    BUTT_RATING_LARGE,
    HIP_RATING_CURVY,
    TAIL_TYPE_LIZARD,
    VAGINA_LOOSENESS_NORMAL,
    VAGINA_WETNESS_NORMAL,
} from "../../../includes/appearanceDefs";
import { Appearance } from "../../Appearance";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { Monster } from "../../Monster";
import { StatusAffects } from "../../StatusAffects";

export class Helspawn extends Monster {
    public doAI(): void {
        const choices: any[] = [];
        choices[choices.length] = this.helspawnTwinStrikes;
        // Bowmander only
        if (this.flags[kFLAGS.HELSPAWN_WEAPON] == "bow") choices[choices.length] = this.calledShot;
        // Zerker ability
        if (this.weaponAttack < 50 || this.flags[kFLAGS.HELSPAWN_WEAPON] == "scimitar")
            choices[choices.length] = this.helSpawnBerserk; // Shield Bash (Shieldmander Only)
        if (this.flags[kFLAGS.HELSPAWN_WEAPON] == "scimitar and shield")
            choices[choices.length] = this.helSpawnShieldBash;
        // Tease (Sluttymander Only)
        if (this.flags[kFLAGS.HELSPAWN_PERSONALITY] >= 50)
            choices[choices.length] = this.sluttyMander;
        // Focus (Chastemander Only)
        // Self-healing & lust restoration
        if (this.flags[kFLAGS.HELSPAWN_PERSONALITY] < 50)
            choices[choices.length] = this.helSpawnFocus;
        choices[Helspawn.rand(choices.length)]();
        // Tail Whip
        if (Helspawn.rand(4) == 0) this.tailWhipShitYo();
        this.combatRoundOver();
    }

    // Basic Attack - Twin Strike
    // Two light attacks
    private helspawnTwinStrikes(): void {
        // if Bowmander
        if (this.flags[kFLAGS.HELSPAWN_WEAPON] == "bow")
            this.outx(
                `${
                    this.flags[kFLAGS.HELSPAWN_NAME]
                } leaps back out of your reach and nocks a pair of blunted arrows, drawing them back together and loosing them at once!\n`
            );
        else
            this.outx(
                `${
                    this.flags[kFLAGS.HELSPAWN_NAME]
                } lunges at you, scimitar cleaving through the air toward your throat!\n`
            );
        this.createStatusAffect(StatusAffects.Attacks, 0, 0, 0, 0);
        this.eAttack();
    }

    // Called Shot (Bowmander Only)
    // Super-high chance of hitting. On hit, speed debuff
    private calledShot(): void {
        this.outx(
            `${
                this.flags[kFLAGS.HELSPAWN_NAME]
            } draws back her bowstring, spending an extra second aiming before letting fly!`
        );
        let damage: number = Math.floor(
            this.str + this.weaponAttack - Helspawn.rand(this.player.tou) - this.player.armorDef
        );
        // standard dodge/miss text
        if (
            damage <= 0 ||
            (Helspawn.rand(2) == 0 &&
                (this.combatMiss() ||
                    this.combatEvade() ||
                    this.combatFlexibility() ||
                    this.combatMisdirect()))
        )
            this.outx("\nYou avoid the hit!");
        else {
            this.outx(
                "\nOne of her arrows smacks right into your [leg], nearly bowling you over.  God DAMN that hurt! You're going to be limping for a while!"
            );
            let affect: number = 20 + Helspawn.rand(5);
            if (this.player.findStatusAffect(StatusAffects.CalledShot) >= 0) {
                while (affect > 0 && this.player.spe >= 2) {
                    affect--;
                    this.player.addStatusValue(StatusAffects.CalledShot, 1, 1);
                    this.player.spe--;
                    Helspawn.showStatDown("spe");
                    // speDown.visible = true;
                    // speUp.visible = false;
                }
            } else {
                this.player.createStatusAffect(StatusAffects.CalledShot, 0, 0, 0, 0);
                while (affect > 0 && this.player.spe >= 2) {
                    affect--;
                    this.player.addStatusValue(StatusAffects.CalledShot, 1, 1);
                    this.player.spe--;
                    Helspawn.showStatDown("spe");
                    // speDown.visible = true;
                    // speUp.visible = false;
                }
            }
            damage = this.player.takeDamage(damage);
            this.outx(` (${damage})`);
        }
    }

    // Berzerkergang (Berzerkermander Only)
    // Gives Helspawn the benefit of the Berzerk special ability
    private helSpawnBerserk(): void {
        this.outx(
            `${
                this.flags[kFLAGS.HELSPAWN_NAME]
            } lets out a savage warcry, throwing her head back in primal exaltation before charging back into the fray with utter bloodlust in her wild eyes!`
        );
        this.weaponAttack = this.weaponAttack + 30;
        this.armorDef = 0;
    }

    // Shield Bash (Shieldmander Only)
    private helSpawnShieldBash(): void {
        this.clearOutput();
        let damage: number = Math.floor(
            this.str - Helspawn.rand(this.player.tou) - this.player.armorDef
        );
        // Stuns a bitch
        this.outx(
            `${
                this.flags[kFLAGS.HELSPAWN_NAME]
            } lashes out with her shield, trying to knock you back!`
        );
        // standard dodge/miss text
        if (
            damage <= 0 ||
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        )
            this.outx("\nYou evade the strike.");
        else {
            this.outx(
                "\nHer shield catches you right in the face, sending you tumbling to the ground and leaving you open to attack!"
            );
            damage = this.player.takeDamage(damage);
            if (Helspawn.rand(2) == 0 && this.player.findStatusAffect(StatusAffects.Stunned) < 0) {
                this.player.createStatusAffect(StatusAffects.Stunned, 0, 0, 0, 0);
                this.outx(" <b>The hit stuns you.</b>");
            }
            this.outx(` (${damage})`);
        }
    }

    // Tail Whip
    private tailWhipShitYo(): void {
        // Light physical, armor piercing (fire, bitch). Random chance to get this on top of any other attack
        let damage: number = Math.floor(this.str - Helspawn.rand(this.player.tou));
        this.outx(
            `\n${
                this.flags[kFLAGS.HELSPAWN_NAME]
            } whips at you with her tail, trying to sear you with her brilliant flames!`
        );
        // standard dodge/miss text
        if (
            damage <= 0 ||
            this.combatMiss() ||
            this.combatEvade() ||
            this.combatFlexibility() ||
            this.combatMisdirect()
        )
            this.outx("\nYou evade the strike.");
        else {
            this.outx(
                `\n${
                    this.flags[kFLAGS.HELSPAWN_NAME]
                }'s tail catches you as you try to dodge.  Your [armor] sizzles, and you leap back with a yelp as she gives you a light burning.`
            );
            damage = this.player.takeDamage(damage);
            this.outx(` (${damage})`);
        }
    }

    // Tease (Sluttymander Only)
    private sluttyMander(): void {
        // Medium Lust damage
        this.outx(
            `${
                this.flags[kFLAGS.HELSPAWN_NAME]
            } jumps just out of reach before spinning around, planting her weapon in the ground as she turns her backside to you and gives her sizable ass a rhythmic shake, swaying her full hips hypnotically.`
        );
        // if no effect:
        if (Helspawn.rand(2) == 0)
            this.outx(
                '\nWhat the fuck is she trying to do?  You walk over and give her a sharp kick in the kiester, "<i>Keep your head in the game, kiddo.  Pick up your weapon!</i>"'
            );
        else {
            this.outx(
                "\nDat ass.  You lean back, enjoying the show as the slutty little salamander slips right past your guard, practically grinding up against you until you can feel a fire boiling in your loins!"
            );
            let lustDelta: number = this.player.lustVuln * (10 + this.player.lib / 10);
            this.player.lust += lustDelta;
            this.game.mainView.statsView.showStatUp("lust");
            // lustDown.visible = false;
            // lustUp.visible = true;
            lustDelta = Math.round(lustDelta * 10) / 10;
            this.outx(` (${lustDelta})`);
        }
    }

    // Focus (Chastemander Only)
    // Self-healing & lust restoration
    private helSpawnFocus(): void {
        this.outx(
            `Seeing a momentary lull in the melee, ${
                this.flags[kFLAGS.HELSPAWN_NAME]
            } slips out of reach, stumbling back and clutching at the bruises forming all over her body.  "<i>Come on, ${
                this.flags[kFLAGS.HELSPAWN_NAME]
            }, you can do this. Focus, focus,</i>" she mutters, trying to catch her breath.  A moment later and she seems to have taken a second wind as she readies her weapon with a renewed vigor.`
        );
        this.lust -= 30;
        if (this.lust < 0) this.lust = 0;
        this.addHP(this.eMaxHP() / 3.0);
    }

    public defeated(hpVictory: boolean): void {
        this.game.helSpawnScene.beatUpYourDaughter();
    }

    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        this.game.helSpawnScene.loseSparringToDaughter();
    }

    public constructor() {
        super();
        const weapon = this.game.flags[kFLAGS.HELSPAWN_WEAPON] || "bow";
        this.a = "";
        this.short = this.game.flags[kFLAGS.HELSPAWN_NAME];
        this.imageName = "hollispawn";
        this.long = `${
            this.game.flags[kFLAGS.HELSPAWN_NAME]
        } is a young salamander, appearing in her later teens.  Clad in ${
            this.game.flags[kFLAGS.HELSPAWN_PERSONALITY] >= 50
                ? "a slutty scale bikini like her mother's, barely concealing anything"
                : "a short skirt, thigh-high boots, and a sky-blue blouse, in stark contrast to her mother’s sluttier attire"
        }, she stands about six feet in height, with a lengthy, fiery tail swishing menacingly behind her. She's packing a ${
            {
                bow: "recurve bow, using blunted, soft-tipped arrows",
                scimitar:
                    "scimitar, just like her mom's, and holds it in the same berzerk stance Helia is wont to use",
                "scimitar and shield": "scimitar and shield, giving her a balanced fighting style",
            }[weapon]
        }.  Pacing around you, the well-built young warrior intently studies her mentor's defenses, readying for your next attack.`;
        // this.plural = false;
        this.createVagina(false, VAGINA_WETNESS_NORMAL, VAGINA_LOOSENESS_NORMAL);
        this.createStatusAffect(StatusAffects.BonusVCapacity, 85, 0, 0, 0);
        this.createBreastRow(Appearance.breastCupInverse("E+"));
        this.ass.analLooseness = ANAL_LOOSENESS_VIRGIN;
        this.ass.analWetness = ANAL_WETNESS_DRY;
        this.createStatusAffect(StatusAffects.BonusACapacity, 85, 0, 0, 0);
        this.tallness = 90;
        this.hipRating = HIP_RATING_CURVY + 2;
        this.buttRating = BUTT_RATING_LARGE + 1;
        this.skinTone = "dusky";
        this.hairColor = "red";
        this.hairLength = 13;
        this.initStrTouSpeInte(50, 50, 65, 40);
        this.initLibSensCor(35, 55, 20);
        this.weaponName = weapon;
        this.weaponVerb = {
            bow: "blunted arrow",
            scimitar: "slash",
            "scimitar and shield": "slash",
        }[weapon];
        this.weaponAttack = 20;
        this.armorName = "scales";
        this.armorDef = 12;
        this.armorPerk = "";
        this.armorValue = 50;
        this.bonusHP = 175;
        this.lust = 30;
        this.lustVuln = 0.55;
        this.temperment = Helspawn.TEMPERMENT_RANDOM_GRAPPLES;
        this.level = 12;
        this.gems = 10 + Helspawn.rand(5);
        this.tailType = TAIL_TYPE_LIZARD;
        this.tailRecharge = 0;
        this.createStatusAffect(StatusAffects.Keen, 0, 0, 0, 0);
        this.drop = this.NO_DROP;
        this.checkMonster();
    }
}
