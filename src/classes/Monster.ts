import {
    ANTENNAE_NONE,
    GENDER_NONE,
    HORNS_NONE,
    TAIL_TYPE_NONE,
    WING_TYPE_NONE,
} from "../includes/appearanceDefs";
import { OtherKeys, StatKeys } from "../view/StatsView";
import { Appearance } from "./Appearance";
import { BreastRowClass } from "./BreastRowClass";
import { Cock } from "./Cock";
import { CockTypesEnum } from "./CockTypesEnum";
import { CocSettings } from "./CoC_Settings";
import { Creature } from "./Creature";
import { kFLAGS } from "./GlobalFlags/kFLAGS";
import { kGAMECLASS } from "./GlobalFlags/kGAMECLASS";
import { ChainedDrop } from "./internals/ChainedDrop";
import { RandomDrop } from "./internals/RandomDrop";
import { Utils } from "./internals/Utils";
import { WeightedDrop } from "./internals/WeightedDrop";
import { ArmorLib } from "./Items/ArmorLib";
import { ConsumableLib } from "./Items/ConsumableLib";
import { UseableLib } from "./Items/UseableLib";
import { WeaponLib } from "./Items/WeaponLib";
import { ItemType } from "./ItemType";
import { PerkLib } from "./PerkLib";
import { Player } from "./Player";
import { StatusAffects } from "./StatusAffects";
import { VaginaClass } from "./VaginaClass";

/**
 * ...
 *
 * @author Yoffy, Fake-Name, aimozg
 */
export class Monster extends Creature {
    protected get player(): Player {
        return this.game.player;
    }
    protected outx(text: string, clear = false): void {
        this.game.outx(text, clear);
    }
    protected combatRoundOver(): void {
        this.game.combatRoundOver();
    }
    protected cleanupAfterCombat(): void {
        this.game.cleanupAfterCombat();
    }
    protected static showStatDown(a: StatKeys | OtherKeys): void {
        kGAMECLASS.mainView.statsView.showStatDown(a);
    }
    protected statScreenRefresh(): void {
        this.game.statScreenRefresh();
    }
    protected doNext(eventNo: any): void {
        // Now typesafe
        this.game.doNext(eventNo);
    }
    protected combatMiss(): boolean {
        return this.game.combatMiss();
    }
    protected combatEvade(): boolean {
        return this.game.combatEvade();
    }
    protected combatFlexibility(): boolean {
        return this.game.combatFlexibility();
    }
    protected combatMisdirect(): boolean {
        return this.game.combatMisdirect();
    }
    protected get consumables(): ConsumableLib {
        return this.game.consumables;
    }
    protected get useables(): UseableLib {
        return this.game.useables;
    }
    protected get weapons(): WeaponLib {
        return this.game.weapons;
    }
    protected get armors(): ArmorLib {
        return this.game.armors;
    }
    // For enemies
    public bonusHP = 0;
    private _long = "<b>You have encountered an unitialized  Please report this as a bug</b>.";
    public get long(): string {
        return this._long;
    }
    public set long(value: string) {
        this.initsCalled.long = true;
        this._long = value;
    }

    // Is a creature a 'plural' encounter - mob, etc.
    public plural = false;
    public imageName = "";

    // Lust vulnerability
    public lustVuln = 1;

    public static TEMPERMENT_AVOID_GRAPPLES = 0;
    public static TEMPERMENT_LUSTY_GRAPPLES = 1;
    public static TEMPERMENT_RANDOM_GRAPPLES = 2;
    public static TEMPERMENT_LOVE_GRAPPLES = 3;
    /**
     * temperment - used for determining grapple behaviors
     * 0 - avoid grapples/break grapple
     * 1 - lust determines > 50 grapple
     * 2 - random
     * 3 - love grapples
     */
    public temperment: number = Monster.TEMPERMENT_AVOID_GRAPPLES;

    // Used for special attacks.
    public special1: any = undefined;
    public special2: any = undefined;
    public special3: any = undefined;

    // he
    public pronoun1 = "";
    public get Pronoun1(): string {
        if (this.pronoun1 == "") return "";
        return this.pronoun1.substr(0, 1).toUpperCase() + this.pronoun1.substr(1);
    }
    // him
    public pronoun2 = "";
    public get Pronoun2(): string {
        if (this.pronoun2 == "") return "";
        return this.pronoun2.substr(0, 1).toUpperCase() + this.pronoun2.substr(1);
    }
    // 3: Possessive his
    public pronoun3 = "";
    public get Pronoun3(): string {
        if (this.pronoun3 == "") return "";
        return this.pronoun3.substr(0, 1).toUpperCase() + this.pronoun3.substr(1);
    }

    private _drop: RandomDrop = new ChainedDrop();
    public get drop(): RandomDrop {
        return this._drop;
    }
    public set drop(value: RandomDrop) {
        this._drop = value;
        this.initedDrop = true;
    }

    public eMaxHP(): number {
        return this.tou * 2 + 50 + this.bonusHP;
    }

    public addHP(hp: number): void {
        this.HP += hp;
        if (this.HP < 0) this.HP = 0;
        else if (this.HP > this.eMaxHP()) this.HP = this.eMaxHP();
    }

    /**
     * @return HP/eMaxHP()
     */
    public HPRatio(): number {
        return this.HP / this.eMaxHP();
    }

    /**
     * @return damage not reduced by player stats
     */
    public eBaseDamage(): number {
        return this.str + this.weaponAttack;
    }

    /**
     * @return randomized damage reduced by player stats
     */
    public calcDamage(): number {
        return this.player.reduceDamage(this.eBaseDamage());
    }

    protected totalXP(playerLevel = -1): number {
        if (playerLevel == -1) playerLevel = this.game.player.level;
        //
        // 1) Nerf xp gains by 20% per level after first two level difference
        // 2) No bonuses for underlevel!
        // 3) Super high level folks (over 10 levels) only get 1 xp!
        let difference: number = playerLevel - this.level;
        if (difference <= 2) difference = 0;
        else difference -= 2;
        if (difference > 4) difference = 4;
        difference = ((5 - difference) * 20.0) / 100.0;
        if (playerLevel - this.level > 10) return 1;
        return Math.round(this.additionalXP + (this.baseXP() + this.bonusXP()) * difference);
    }
    protected baseXP(): number {
        return (
            [
                200,
                10,
                20,
                30,
                40,
                50,
                55,
                60,
                66,
                75, // 0-9
                83,
                85,
                92,
                100,
                107,
                115,
                118,
                121,
                128,
                135, // 10-19
                145,
            ][Math.round(this.level)] || 200
        );
    }
    protected bonusXP(): number {
        return Monster.rand(
            [200, 10, 20, 30, 40, 50, 55, 58, 66, 75, 83, 85, 85, 86, 92, 94, 96, 98, 99, 101, 107][
                Math.round(this.level)
            ] || 130
        );
    }

    public constructor() {
        super();
        // trace("Generic Monster Constructor!");
        this.gender = GENDER_NONE;

        /// / INSTRUCTIONS
        /// / Copy-paste remaining code to the new monster constructor
        /// / Uncomment and replace placeholder values with your own
        /// / See existing monsters for examples

        // super(mainClassPtr);

        /// / INIITIALIZERS
        /// / If you want to skip something that is REQUIRED, you shoud set corresponding
        /// / this.initedXXX property to true, e.g. this.initedGenitals = true;

        /// / 1. Names and plural/singular
        /// *REQUIRED*/ this.a = "a";
        /// *REQUIRED*/ this.short = "short";
        /// *OPTIONAL*/ // this.imageName = "imageName"; // default ""
        /// *REQUIRED*/ this.long = "long";
        /// *OPTIONAL*/ //this.plural = true|false; // default false

        /// / 2. Gender, genitals, and pronouns (also see "note for 2." below)
        /// / 2.1. Male
        /// *REQUIRED*/ this.createCock(length,thickness,type); // defaults 5.5,1,human; could be called multiple times
        /// *OPTIONAL*/ //this.balls = numberOfBalls; // default 0
        /// *OPTIONAL*/ //this.ballSize = ; // default 0. should be set if balls>0
        /// *OPTIONAL*/ //this.cumMultiplier = ; // default 1
        /// *OPTIONAL*/ //this.hoursSinceCum = ; // default 0
        /// / 2.2. Female
        /// *REQUIRED*/ this.createVagina(virgin=true|false,VAGINA_WETNESS_,VAGINA_LOOSENESS_); // default true,normal,tight
        /// *OPTIONAL*/ //this.createStatusAffect(StatusAffects.BonusVCapacity, bonus, 0, 0, 0);
        /// / 2.3. Hermaphrodite
        /// / Just create cocks and vaginas. Last call determines pronouns.
        /// / 2.4. Genderless
        /// *REQUIRED*/ initGenderless(); // this functions removes genitals!

        /// / Note for 2.: during initialization pronouns are set in:
        /// / * createCock: he/him/his
        /// / * createVagina: she/her/her
        /// / * initGenderless: it/it/its
        /// / If plural=true, they are replaced with: they/them/their
        /// / If you want to customize pronouns:
        /// *OPTIONAL*/ //this.pronoun1 = "he";
        /// *OPTIONAL*/ //this.pronoun2 = "him";
        /// *OPTIONAL*/ //this.pronoun3 = "his";
        /// / Another note for 2.: gender is automatically calculated in createCock,
        /// / createVagina, initGenderless. If you want to change it, set this.gender
        /// / after these method calls.

        /// / 3. Breasts
        /// *REQUIRED*/ this.createBreastRow(size,nipplesPerBreast); // default 0,1
        /// / Repeat for multiple breast rows
        /// / You can call just `this.createBreastRow();` for flat breasts
        /// / Note useful method: this.createBreastRow(Appearance.breastCupInverse("C")); // "C" -> 3

        /// / 4. Ass
        /// *OPTIONAL*/ //this.ass.analLooseness = ANAL_LOOSENESS_; // default TIGHT
        /// *OPTIONAL*/ //this.ass.analWetness = ANAL_WETNESS_; // default DRY
        /// *OPTIONAL*/ //this.createStatusAffect(StatusAffects.BonusACapacity, bonus, 0, 0, 0);
        /// / 5. Body
        /// *REQUIRED*/ this.tallness = ;
        /// *OPTIONAL*/ //this.hipRating = HIP_RATING_; // default boyish
        /// *OPTIONAL*/ //this.buttRating = BUTT_RATING_; // default buttless
        /// *OPTIONAL*/ //this.lowerBody = LOWER_BODY_; //default human
        /// *OPTIONAL*/ //this.armType = ARM_TYPE_; // default human

        /// / 6. Skin
        /// *OPTIONAL*/ //this.skinTone = "skinTone"; // default "albino"
        /// *OPTIONAL*/ //this.skinType = SKIN_TYPE_; // default PLAIN
        /// *OPTIONAL*/ //this.skinDesc = "skinDesc"; // default "skin" if this.skinType is not set, else Appearance.DEFAULT_SKIN_DESCS[skinType]
        /// *OPTIONAL*/ //this.skinAdj = "skinAdj"; // default ""

        /// / 7. Hair
        /// *OPTIONAL*/ //this.hairColor = ; // default "no"
        /// *OPTIONAL*/ //this.hairLength = ; // default 0
        /// *OPTIONAL*/ //this.hairType = HAIR_; // default NORMAL

        /// / 8. Face
        /// *OPTIONAL*/ //this.faceType = FACE_; // default HUMAN
        /// *OPTIONAL*/ //this.earType = EARS_; // default HUMAN
        /// *OPTIONAL*/ //this.tongueType = TONGUE_; // default HUMAN
        /// *OPTIONAL*/ //this.eyeType = EYES_; // default HUMAN

        /// / 9. Primary stats.
        /// *REQUIRED*/ initStrTouSpeInte(,,,);
        /// *REQUIRED*/ initLibSensCor(,,);

        /// / 10. Weapon
        /// *REQUIRED*/ this.weaponName = "weaponName";
        /// *REQUIRED*/ this.weaponVerb = "weaponVerb";
        /// *OPTIONAL*/ //this.weaponAttack = ; // default 0
        /// *OPTIONAL*/ //this.weaponPerk = "weaponPerk"; // default ""
        /// *OPTIONAL*/ //this.weaponValue = ; // default 0

        /// / 11. Armor
        /// *REQUIRED*/ this.armorName = "armorName";
        /// *OPTIONAL*/ //this.armorDef = ; // default 0
        /// *OPTIONAL*/ //this.armorPerk = "armorPerk"; // default ""
        /// *OPTIONAL*/ //this.armorValue = ; // default 0

        /// / 12. Combat
        /// *OPTIONAL*/ //this.bonusHP = ; // default 0
        /// *OPTIONAL*/ //this.lust = ; // default 0
        /// *OPTIONAL*/ //this.lustVuln = ; // default 1
        /// *OPTIONAL*/ //this.temperment = TEMPERMENT; // default AVOID_GRAPPLES
        /// *OPTIONAL*/ //this.fatigue = ; // default 0

        /// / 13. Level
        /// *REQUIRED*/ this.level = ;
        /// *REQUIRED*/ this.gems = ;
        /// *OPTIONAL*/ //this.additionalXP = ; // default 0

        /// / 14. Drop
        /// / 14.1. No drop
        /// *REQUIRED*/ this.drop = NO_DROP;
        /// / 14.2. Fixed drop
        /// *REQUIRED*/ this.drop = new WeightedDrop(dropItemType);
        /// / 14.3. Random weighted drop
        /// *REQUIRED*/ this.drop = new WeightedDrop()...
        /// / Append with calls like:
        /// / .add(itemType,itemWeight)
        /// / .addMany(itemWeight,itemType1,itemType2,...)
        /// / Example:
        /// / this.drop = new WeightedDrop()
        /// /
        // .add(A,2)
        /// /
        // .add(B,10)
        /// /
        // .add(C,1)
        /// /  will drop B 10 times more often than C, and 5 times more often than A.
        /// /  To be precise, \forall add(A_i,w_i): P(A_i)=w_i/\sum_j w_j
        /// / 14.4. Random chained check drop
        /// *REQUIRED*/ this.drop = new ChainedDrop(optional defaultDrop)...
        /// / Append with calls like:
        /// / .add(itemType,chance)
        /// / .elseDrop(defaultDropItem)
        /// /
        /// / Example 1:
        /// / init14ChainedDrop(A)
        /// /
        // .add(B,0.01)
        /// /
        // .add(C,0.5)
        /// /  will FIRST check B vs 0.01 chance,
        /// /  if it fails, C vs 0.5 chance,
        /// /  else A
        /// /
        /// /  Example 2:
        /// /  init14ChainedDrop()
        /// /
        // .add(B,0.01)
        /// /
        // .add(C,0.5)
        /// /
        // .elseDrop(A)
        /// /  for same result

        /// / 15. Special attacks. No need to set them if the monster has custom AI.
        /// / Values are either combat event numbers (5000+) or function references
        /// *OPTIONAL*/ //this.special1 = ; //default 0
        /// *OPTIONAL*/ //this.special2 = ; //default 0
        /// *OPTIONAL*/ //this.special3 = ; //default 0

        /// / 16. Tail
        /// *OPTIONAL*/ //this.tailType = TAIL_TYPE_; // default NONE
        /// *OPTIONAL*/ //this.tailVenom = ; // default 0
        /// *OPTIONAL*/ //this.tailRecharge = ; // default 5

        /// / 17. Horns
        /// *OPTIONAL*/ //this.hornType = HORNS_; // default NONE
        /// *OPTIONAL*/ //this.horns = numberOfHorns; // default 0

        /// / 18. Wings
        /// *OPTIONAL*/ //this.wingType = WING_TYPE_; // default NONE
        /// *OPTIONAL*/ //this.wingDesc = ; // default Appearance.DEFAULT_WING_DESCS[wingType]

        /// / 19. Antennae
        /// *OPTIONAL*/ //this.antennae = ANTENNAE_; // default NONE

        /// / REQUIRED !!!
        /// / In debug mode will throw an error for uninitialized monster
        // checkMonster();
    }

    private _checkCalled = false;
    public get checkCalled(): boolean {
        return this._checkCalled;
    }
    public checkError = "";
    public initsCalled: Record<string, any> = {
        a: false,
        short: false,
        long: false,
        genitals: false,
        breasts: false,
        tallness: false,
        strTouSpeInte: false,
        libSensCor: false,
        drop: false,
    };
    // MONSTER INITIALIZATION HELPER FUNCTIONS
    protected set initedGenitals(value: boolean) {
        this.initsCalled.genitals = value;
    }
    protected set initedBreasts(value: boolean) {
        this.initsCalled.breasts = value;
    }
    protected set initedDrop(value: boolean) {
        this.initsCalled.drop = value;
    }
    protected set initedStrTouSpeInte(value: boolean) {
        this.initsCalled.strTouSpeInte = value;
    }
    protected set initedLibSensCor(value: boolean) {
        this.initsCalled.libSensCor = value;
    }
    protected NO_DROP: WeightedDrop = new WeightedDrop();

    public isFullyInit(): boolean {
        for (const phase of Object.keys(this.initsCalled)) {
            if (typeof phase == "boolean" && phase == false) return false;
        }
        return true;
    }
    public missingInits(): string {
        let result = "";
        for (const phase of Object.keys(this.initsCalled)) {
            if (typeof this.initsCalled[phase] == "boolean" && this.initsCalled[phase] == false) {
                if (result == "") result = phase;
                else result += `, ${phase}`;
            }
        }
        return result;
    }

    public get a() {
        return super.a;
    }
    public set a(value: string) {
        this.initsCalled.a = true;
        super.a = value;
    }

    public get short() {
        return super.short;
    }

    public set short(value: string) {
        this.initsCalled.short = true;
        super.short = value;
    }

    public createCock(clength = 5.5, cthickness = 1, ctype?: CockTypesEnum): boolean {
        this.initedGenitals = true;
        if (!this._checkCalled) {
            if (this.plural) {
                this.pronoun1 = "they";
                this.pronoun2 = "them";
                this.pronoun3 = "their";
            } else {
                this.pronoun1 = "he";
                this.pronoun2 = "him";
                this.pronoun3 = "his";
            }
        }
        const result: boolean = super.createCock(clength, cthickness, ctype);
        this.genderCheck();
        return result;
    }

    public createVagina(virgin = true, vaginalWetness = 1, vaginalLooseness = 0): boolean {
        this.initedGenitals = true;
        if (!this._checkCalled) {
            if (this.plural) {
                this.pronoun1 = "they";
                this.pronoun2 = "them";
                this.pronoun3 = "their";
            } else {
                this.pronoun1 = "she";
                this.pronoun2 = "her";
                this.pronoun3 = "her";
            }
        }
        const result: boolean = super.createVagina(virgin, vaginalWetness, vaginalLooseness);
        this.genderCheck();
        return result;
    }

    protected initGenderless(): void {
        this.cocks = [];
        this.vaginas = [];
        this.initedGenitals = true;
        if (this.plural) {
            this.pronoun1 = "they";
            this.pronoun2 = "them";
            this.pronoun3 = "their";
        } else {
            this.pronoun1 = "it";
            this.pronoun2 = "it";
            this.pronoun3 = "its";
        }
        this.genderCheck();
    }

    public createBreastRow(size = 0, nipplesPerBreast = 1): boolean {
        this.initedBreasts = true;
        return super.createBreastRow(size, nipplesPerBreast);
    }

    public get tallness() {
        return super.tallness;
    }
    public set tallness(value: number) {
        this.initsCalled.tallness = true;
        super.tallness = value;
    }

    public get skinType() {
        return super.skinType;
    }
    public set skinType(value: number) {
        if (!this._checkCalled) {
            this.skinDesc = Appearance.DEFAULT_SKIN_DESCS[value];
        }
        super.skinType = value;
    }

    protected initStrTouSpeInte(str: number, tou: number, spe: number, inte: number): void {
        this.str = str;
        this.tou = tou;
        this.spe = spe;
        this.inte = inte;
        this.initedStrTouSpeInte = true;
    }

    protected initLibSensCor(lib: number, sens: number, cor: number): void {
        this.lib = lib;
        this.sens = sens;
        this.cor = cor;
        this.initedLibSensCor = true;
    }

    public get wingType() {
        return super.wingType;
    }
    public set wingType(value: number) {
        if (!this._checkCalled) this.wingDesc = Appearance.DEFAULT_WING_DESCS[value];
        super.wingType = value;
    }

    public validate(): string {
        let error = "";
        // 1. Required fields must be set
        if (!this.isFullyInit()) {
            error += `Missing phases: ${this.missingInits()}. `;
        }
        this.HP = this.eMaxHP();
        this.XP = this.totalXP();
        error += super.validate();
        error += Utils.validateNonNegativeNumberFields(this, "Monster.validate", [
            "lustVuln",
            "temperment",
        ]);
        return error;
    }

    public checkMonster(): boolean {
        this._checkCalled = true;
        this.checkError = this.validate();
        if (this.checkError.length > 0)
            CocSettings.error(`Monster not initialized:${this.checkError}`);
        return this.checkError.length == 0;
    }

    /**
     * try to hit, apply damage
     *
     * @return damage
     */
    public eOneAttack(): number {
        // Determine damage - str modified by enemy toughness!
        let damage: number = this.calcDamage();
        if (damage > 0) damage = this.player.takeDamage(damage);
        return damage;
    }

    /**
     * return true if we land a hit
     */
    protected attackSucceeded(): boolean {
        let attack = true;
        // Blind dodge change
        if (this.findStatusAffect(StatusAffects.Blind) >= 0) {
            attack = attack && this.handleBlind();
        }
        attack = attack && !this.playerDodged();
        return attack;
    }

    public eAttack(): void {
        let attacks: number = this.statusAffectv1(StatusAffects.Attacks);
        if (attacks == 0) attacks = 1;
        while (attacks > 0) {
            if (this.attackSucceeded()) {
                const damage: number = this.eOneAttack();
                this.outputAttack(damage);
                this.postAttack(damage);
                this.game.statScreenRefresh();
                this.outx("\n", false);
            }
            if (this.statusAffectv1(StatusAffects.Attacks) >= 0) {
                this.addStatusValue(StatusAffects.Attacks, 1, -1);
            }
            attacks--;
        }
        this.removeStatusAffect(StatusAffects.Attacks);
        //
        //  if (!game.combatRoundOver()) game.doNext(1);
        this.game.combatRoundOver(); // The doNext here was not required
    }

    /**
     * Called no matter of success of the attack
     *
     * @param damage damage received by player
     */
    protected postAttack(damage: number): void {
        if (damage > 0) {
            if (this.lustVuln > 0 && this.player.armorName == "barely-decent bondage straps") {
                if (!this.plural)
                    this.outx(
                        `\n${this.capitalA}${this.short} brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.`,
                        false
                    );
                else
                    this.outx(
                        `\n${this.capitalA}${this.short} brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.`,
                        false
                    );
                this.lust += 5 * this.lustVuln;
            }
        }
    }

    public outputAttack(damage: number): void {
        if (damage <= 0) {
            // Due to toughness or amor...
            if (Monster.rand(this.player.armorDef + this.player.tou) < this.player.armorDef)
                this.outx(
                    `You absorb and deflect every ${this.weaponVerb} with your ${this.player.armorName}.`
                );
            else {
                if (this.plural)
                    this.outx(
                        `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throw at you.`
                    );
                else
                    this.outx(
                        `You deflect and block every ${this.weaponVerb} ${this.a}${this.short} throws at you.`
                    );
            }
        } else if (damage < 6)
            this.outx(`You are struck a glancing blow by ${this.a}${this.short}! (${damage})`);
        else if (damage < 11) {
            this.outx(`${this.capitalA + this.short} wound`);
            if (!this.plural) this.outx("s");
            this.outx(` you! (${damage})`);
        } else if (damage < 21) {
            this.outx(`${this.capitalA + this.short} stagger`);
            if (!this.plural) this.outx("s");
            this.outx(` you with the force of ${this.pronoun3} ${this.weaponVerb}! (${damage})`);
        } else if (damage > 20) {
            this.outx(`${this.capitalA + this.short} <b>mutilate`);
            if (!this.plural) this.outx("s");
            this.outx(`</b> you with ${this.pronoun3} powerful ${this.weaponVerb}! (${damage})`);
        }
    }

    /**
     * @return true if continue with attack
     */
    protected handleBlind(): boolean {
        if (Monster.rand(3) < 2) {
            if (this.weaponVerb == "tongue-slap")
                this.outx(
                    `${this.capitalA + this.short} completely misses you with a thrust from ${
                        this.pronoun3
                    } tongue!\n`,
                    false
                );
            else
                this.outx(
                    `${this.capitalA + this.short} completely misses you with a blind attack!\n`,
                    false
                );
            return false;
        }
        return true;
    }

    /**
     * print something about how we miss the player
     */
    protected outputPlayerDodged(dodge: number): void {
        if (dodge == 1)
            this.outx(`You narrowly avoid ${this.a}${this.short}'s ${this.weaponVerb}!\n`, false);
        else if (dodge == 2)
            this.outx(
                `You dodge ${this.a}${this.short}'s ${this.weaponVerb} with superior quickness!\n`,
                false
            );
        else {
            this.outx(`You deftly avoid ${this.a}${this.short}`);
            if (this.plural) this.outx("'");
            else this.outx("'s");
            this.outx(` slow ${this.weaponVerb}.\n`, false);
        }
    }

    private playerDodged(): boolean {
        // Determine if dodged!
        const dodge: number = this.player.speedDodge(this);
        if (dodge > 0) {
            this.outputPlayerDodged(dodge);
            return true;
        }
        // Determine if evaded
        if (
            !(this.short === "Kiha") &&
            this.player.findPerk(PerkLib.Evade) >= 0 &&
            Monster.rand(100) < 10
        ) {
            this.outx(
                `Using your skills at evading attacks, you anticipate and sidestep ${this.a}${this.short}'`
            );
            if (!this.plural) this.outx("s");
            this.outx(" attack.\n", false);
            return true;
        }
        // ("Misdirection"
        if (
            this.player.findPerk(PerkLib.Misdirection) >= 0 &&
            Monster.rand(100) < 10 &&
            this.player.armorName == "red, high-society bodysuit"
        ) {
            this.outx(
                `Using Raphael's teachings, you anticipate and sidestep ${this.a}${this.short}' attacks.\n`,
                false
            );
            return true;
        }
        // Determine if cat'ed
        if (this.player.findPerk(PerkLib.Flexibility) >= 0 && Monster.rand(100) < 6) {
            this.outx(
                `With your incredible flexibility, you squeeze out of the way of ${this.a}${this.short}`
            );
            if (this.plural) this.outx("' attacks.\n", false);
            else this.outx("'s attack.\n", false);
            return true;
        }
        return false;
    }

    public doAI(): void {
        if (this.findStatusAffect(StatusAffects.Stunned) >= 0) {
            if (!this.handleStun()) return;
        }
        if (this.findStatusAffect(StatusAffects.Fear) >= 0) {
            if (!this.handleFear()) return;
        }
        // Exgartuan gets to do stuff!
        if (
            this.game.player.findStatusAffect(StatusAffects.Exgartuan) >= 0 &&
            this.game.player.statusAffectv2(StatusAffects.Exgartuan) == 0 &&
            Monster.rand(3) == 0
        ) {
            if (this.game.exgartuan.exgartuanCombatUpdate()) this.game.outx("\n\n", false);
        }
        if (this.findStatusAffect(StatusAffects.Constricted) >= 0) {
            if (!this.handleConstricted()) return;
        }
        // If grappling... TODO implement grappling
        //
        //  if (game.gameState == 2) {
        //
        //
        // game.gameState = 1;
        // temperment - used for determining grapple behaviors
        // 0 - avoid grapples/break grapple
        // 1 - lust determines > 50 grapple
        // 2 - random
        // 3 - love grapples
        /*
         //
// if(temperment == 0) eGrappleRetreat();
         if (temperment == 1) {
         //
//  if(lust < 50) eGrappleRetreat();
         mainClassPtr.doNext(3);
         return;
         }
         mainClassPtr.outx("Lust Placeholder!!");
         mainClassPtr.doNext(3);
         return;*/
        //
        //  }
        this.performCombatAction();
    }

    /**
     * Called if monster is constricted. Should return true if constriction is ignored and need to proceed with ai
     */
    protected handleConstricted(): boolean {
        // Enemy struggles -
        this.game.outx(
            "Your prey pushes at your tail, twisting and writhing in an effort to escape from your tail's tight bonds.",
            false
        );
        if (this.statusAffectv1(StatusAffects.Constricted) <= 0) {
            this.game.outx(
                `  ${this.capitalA}${this.short} proves to be too much for your tail to handle, breaking free of your tightly bound coils.`,
                false
            );
            this.removeStatusAffect(StatusAffects.Constricted);
        }
        this.addStatusValue(StatusAffects.Constricted, 1, -1);
        this.game.combatRoundOver();
        return false;
    }

    /**
     * Called if monster is under fear. Should return true if fear ignored and need to proceed with ai
     */
    protected handleFear(): boolean {
        if (this.statusAffectv1(StatusAffects.Fear) == 0) {
            if (this.plural) {
                this.removeStatusAffect(StatusAffects.Fear);
                this.game.outx(
                    "Your foes shake free of their fear and ready themselves for battle.",
                    false
                );
            } else {
                this.removeStatusAffect(StatusAffects.Fear);
                this.game.outx(
                    "Your foe shakes free of its fear and readies itself for battle.",
                    false
                );
            }
        } else {
            this.addStatusValue(StatusAffects.Fear, 1, -1);
            if (this.plural)
                this.game.outx(
                    `${this.capitalA + this.short} are too busy shivering with fear to fight.`,
                    false
                );
            else
                this.game.outx(
                    `${this.capitalA + this.short} is too busy shivering with fear to fight.`,
                    false
                );
        }
        this.game.combatRoundOver();
        return false;
    }

    /**
     * Called if monster is stunned. Should return true if stun is ignored and need to proceed with ai.
     */
    protected handleStun(): boolean {
        if (this.plural)
            this.game.outx("Your foes are too dazed from your last hit to strike back!", false);
        else this.game.outx("Your foe is too dazed from your last hit to strike back!");
        if (this.statusAffectv1(StatusAffects.Stunned) <= 0)
            this.removeStatusAffect(StatusAffects.Stunned);
        else this.addStatusValue(StatusAffects.Stunned, 1, -1);
        this.game.combatRoundOver();
        return false;
    }

    /**
     * This method is called after all stun/fear/constricted checks.
     * Default: Equal chance to do physical or special (if any) attack
     */
    protected performCombatAction(): void {
        const actions: any[] = [this.eAttack, this.special1, this.special2, this.special3].filter(
            function (special, idx: number, array: any[]): boolean {
                return special != undefined;
            }
        );
        const rando: number = Math.floor(Math.random() * actions.length);
        const action = actions[rando];
        action();
    }

    /**
     * All branches of this method and all subsequent scenes should end either with
     * 'cleanupAfterCombat', 'awardPlayer' or 'finishCombat'. The latter also displays
     * default message like "you defeat %s" or "%s falls and starts masturbating"
     */
    public defeated(hpVictory: boolean): void {
        this.game.finishCombat();
    }

    /**
     * All branches of this method and all subsequent scenes should end with
     * 'cleanupAfterCombat'.
     */
    public won(hpVictory: boolean, pcCameWorms: boolean): void {
        if (hpVictory) {
            this.player.HP = 1;
            this.outx("Your wounds are too great to bear, and you fall unconscious.", true);
        } else {
            this.outx(
                "Your desire reaches uncontrollable levels, and you end up openly masturbating.\n\nThe lust and pleasure cause you to black out for hours on end.",
                true
            );
            this.player.lust = 0;
        }
        this.game.inCombat = false;
        this.game.clearStatuses(false);
        let temp: number = Monster.rand(10) + 1;
        if (temp > this.player.gems) temp = this.player.gems;
        this.outx(`\n\nYou'll probably wake up in eight hours or so, missing ${temp} gems.`, false);
        this.player.gems -= temp;
        this.game.doNext(this.game.camp.returnToCampUseEightHours);
    }

    /**
     * Function(hpVictory) to call INSTEAD of default defeated(). Call it or finishCombat() manually
     */
    public onDefeated: any = undefined;
    /**
     * Function(hpVictory,pcCameWorms) to call INSTEAD of default won(). Call it or finishCombat() manually
     */
    public onWon: any = undefined;
    /**
     * Function() to call INSTEAD of common run attempt. Call runAway(false) to perform default run attempt
     */
    public onPcRunAttempt: any = undefined;

    /**
     * Final method to handle hooks before calling overriden method
     */
    public defeated_(hpVictory: boolean): void {
        if (this.onDefeated != undefined) this.onDefeated(hpVictory);
        else this.defeated(hpVictory);
    }

    /**
     * Final method to handle hooks before calling overriden method
     */
    public won_(hpVictory: boolean, pcCameWorms: boolean): void {
        if (this.onWon != undefined) this.onWon(hpVictory, pcCameWorms);
        else this.won(hpVictory, pcCameWorms);
    }

    /**
     * Display tease reaction message. Then call applyTease() to increase lust.
     *
     * @param lustDelta value to be added to lust (already modified by lustVuln etc)
     */
    public teased(lustDelta: number): void {
        this.outputDefaultTeaseReaction(lustDelta);
        if (lustDelta > 0) {
            // Imp mob uber interrupt!
            if (this.findStatusAffect(StatusAffects.ImpUber) >= 0) {
                // TODO move to proper class
                this.outx(
                    "\nThe imps in the back stumble over their spell, their loincloths tenting obviously as your display interrupts their casting.  One of them spontaneously orgasms, having managed to have his spell backfire.  He falls over, weakly twitching as a growing puddle of whiteness surrounds his defeated form.",
                    false
                );
                // (-5% of max enemy HP)
                this.HP -= this.bonusHP * 0.05;
                this.lust -= 15;
                this.removeStatusAffect(StatusAffects.ImpUber);
                this.createStatusAffect(StatusAffects.ImpSkip, 0, 0, 0, 0);
            }
        }
        this.applyTease(lustDelta);
    }

    protected outputDefaultTeaseReaction(lustDelta: number): void {
        if (this.plural) {
            if (lustDelta == 0)
                this.outx(`\n\n${this.capitalA}${this.short} seem unimpressed.`, false);
            if (lustDelta > 0 && lustDelta < 4)
                this.outx(
                    `\n${this.capitalA}${this.short} look intrigued by what ${this.pronoun1} see.`,
                    false
                );
            if (lustDelta >= 4 && lustDelta < 10)
                this.outx(
                    `\n${this.capitalA}${this.short} definitely seem to be enjoying the show.`,
                    false
                );
            if (lustDelta >= 10 && lustDelta < 15)
                this.outx(
                    `\n${this.capitalA}${this.short} openly stroke ${this.pronoun2}selves as ${this.pronoun1} watch you.`,
                    false
                );
            if (lustDelta >= 15 && lustDelta < 20)
                this.outx(
                    `\n${this.capitalA}${this.short} flush hotly with desire, ${this.pronoun3} eyes filled with longing.`,
                    false
                );
            if (lustDelta >= 20)
                this.outx(
                    `\n${this.capitalA}${this.short} lick ${this.pronoun3} lips in anticipation, ${this.pronoun3} hands idly stroking ${this.pronoun3} bodies.`,
                    false
                );
        } else {
            if (lustDelta == 0)
                this.outx(`\n${this.capitalA}${this.short} seems unimpressed.`, false);
            if (lustDelta > 0 && lustDelta < 4) {
                if (this.plural)
                    this.outx(
                        `\n${this.capitalA}${this.short} looks intrigued by what ${this.pronoun1} see.`,
                        false
                    );
                else
                    this.outx(
                        `\n${this.capitalA}${this.short} looks intrigued by what ${this.pronoun1} sees.`,
                        false
                    );
            }
            if (lustDelta >= 4 && lustDelta < 10)
                this.outx(
                    `\n${this.capitalA}${this.short} definitely seems to be enjoying the show.`,
                    false
                );
            if (lustDelta >= 10 && lustDelta < 15) {
                if (this.plural)
                    this.outx(
                        `\n${this.capitalA}${this.short} openly strokes ${this.pronoun2}selves as ${this.pronoun1} watch you.`,
                        false
                    );
                else
                    this.outx(
                        `\n${this.capitalA}${this.short} openly strokes ${this.pronoun2}self as ${this.pronoun1} watches you.`,
                        false
                    );
            }
            if (lustDelta >= 15 && lustDelta < 20) {
                if (this.plural)
                    this.outx(
                        `\n${this.capitalA}${this.short} flush hotly with desire, ${this.pronoun3} eyes filling with longing.`,
                        false
                    );
                else
                    this.outx(
                        `\n${this.capitalA}${this.short} flushes hotly with desire, ${this.pronoun3} eyes filled with longing.`,
                        false
                    );
            }
            if (lustDelta >= 20) {
                if (this.plural)
                    this.outx(
                        `\n${this.capitalA}${this.short} licks ${this.pronoun3} lips in anticipation, ${this.pronoun3} hands idly stroking ${this.pronoun3} own bodies.`,
                        false
                    );
                else
                    this.outx(
                        `\n${this.capitalA}${this.short} licks ${this.pronoun3} lips in anticipation, ${this.pronoun3} hands idly stroking ${this.pronoun3} own body.`,
                        false
                    );
            }
        }
    }

    protected applyTease(lustDelta: number): void {
        this.lust += lustDelta;
        lustDelta = Math.round(lustDelta * 10) / 10;
        this.outx(` (${lustDelta})`);
    }

    public generateDebugDescription(): string {
        let result: string;
        const be: string = this.plural ? "are" : "is";
        const have: string = this.plural ? "have" : "has";
        const Heis = `${this.Pronoun1} ${be} `;
        const Hehas = `${this.Pronoun1} ${have} `;
        result = `You are inspecting ${this.a}${this.short} (imageName='${this.imageName}', class='${this.constructor.name}'). You are fighting ${this.pronoun2}.\n\n`;
        result += `${
            Heis + (Appearance.DEFAULT_GENDER_NAMES[this.gender] || `gender#${this.gender}`)
        } with ${Appearance.numberOfThings(this.cocks.length, "cock")}, ${Appearance.numberOfThings(
            this.vaginas.length,
            "vagina"
        )} and ${Appearance.numberOfThings(this.breastRows.length, "breast row")}.\n\n`;
        // APPEARANCE
        result += `${
            Heis + Appearance.inchesAndFeetsAndInches(this.tallness)
        } tall with ${Appearance.describeByScale(
            this.hipRating,
            Appearance.DEFAULT_HIP_RATING_SCALES,
            "thinner than",
            "wider than"
        )} hips and ${Appearance.describeByScale(
            this.buttRating,
            Appearance.DEFAULT_BUTT_RATING_SCALES,
            "thinner than",
            "wider than"
        )} butt.\n`;
        result += `${this.Pronoun3} lower body is ${
            Appearance.DEFAULT_LOWER_BODY_NAMES[this.lowerBody] || `lowerBody#${this.lowerBody}`
        }`;
        result += `, ${this.pronoun3} arms are ${
            Appearance.DEFAULT_ARM_NAMES[this.armType] || `armType#${this.armType}`
        }`;
        result += `, ${this.pronoun1} ${have} ${this.skinTone} ${this.skinAdj} ${
            this.skinDesc
        } (type ${Appearance.DEFAULT_SKIN_NAMES[this.skinType] || `skinType#${this.skinType}`}).\n`;
        result += Hehas;
        if (this.hairLength > 0) {
            result += `${this.hairColor} ${Appearance.inchesAndFeetsAndInches(
                this.hairLength
            )} long ${
                Appearance.DEFAULT_HAIR_NAMES[this.hairType] || `hairType#${this.hairType}`
            } hair.\n`;
        } else {
            result += "no hair.\n";
        }
        result += `${
            Hehas + (Appearance.DEFAULT_FACE_NAMES[this.faceType] || `faceType#${this.faceType}`)
        } face, ${Appearance.DEFAULT_EARS_NAMES[this.earType] || `earType#${this.earType}`} ears, ${
            Appearance.DEFAULT_TONGUE_NAMES[this.tongueType] || `tongueType#${this.tongueType}`
        } tongue and ${
            Appearance.DEFAULT_EYES_NAMES[this.eyeType] || `eyeType#${this.eyeType}`
        } eyes.\n`;
        result += Hehas;
        if (this.tailType == TAIL_TYPE_NONE) result += "no tail, ";
        else
            result += `${
                Appearance.DEFAULT_TAIL_NAMES[this.tailType] || `tailType#${this.tailType}`
            } tail with venom=${this.tailVenom} and recharge=${this.tailRecharge}, `;
        if (this.hornType == HORNS_NONE) result += "no horns, ";
        else
            result += `${this.horns} ${
                Appearance.DEFAULT_HORNS_NAMES[this.hornType] || `hornType#${this.hornType}`
            } horns, `;
        if (this.wingType == WING_TYPE_NONE) result += "no wings, ";
        else
            result += `${this.wingDesc} wings (type ${
                Appearance.DEFAULT_WING_NAMES[this.wingType] || `wingType#${this.wingType}`
            }), `;
        if (this.antennae == ANTENNAE_NONE) result += "no antennae.\n\n";
        else
            result += `${
                Appearance.DEFAULT_ANTENNAE_NAMES[this.antennae] || `antennaeType#${this.antennae}`
            } antennae.\n\n`;

        // GENITALS AND BREASTS
        for (let i = 0; i < this.cocks.length; i++) {
            const cock: Cock = this.cocks[i] as Cock;
            result += `${
                this.Pronoun3 + (i > 0 ? ` #${i + 1}` : "")
            } ${cock.cockType.toString().toLowerCase()} cock is `;
            result += `${Appearance.inchesAndFeetsAndInches(cock.cockLength)} long and ${
                cock.cockThickness
            }" thick`;
            if (cock.isPierced) result += `, pierced with ${cock.pLongDesc}`;
            if (cock.knotMultiplier != 1) result += `, with knot of size ${cock.knotMultiplier}`;
            result += ".\n";
        }
        if (this.balls > 0 || this.ballSize > 0)
            result += `${Hehas + Appearance.numberOfThings(this.balls, "ball")} of size ${
                this.ballSize
            }.\n`;
        if (this.cumMultiplier != 1 || this.cocks.length > 0)
            result += `${this.Pronoun1} ${have} cum multiplier ${this.cumMultiplier}. `;
        if (this.hoursSinceCum > 0 || this.cocks.length > 0)
            result += `It were ${this.hoursSinceCum} hours since ${this.pronoun1} came.\n\n`;
        for (let i = 0; i < this.vaginas.length; i++) {
            const vagina: VaginaClass = this.vaginas[i] as VaginaClass;
            result += `${this.Pronoun3 + (i > 0 ? ` #${i + 1}` : "")} ${
                Appearance.DEFAULT_VAGINA_TYPE_NAMES[vagina.type] || `vaginaType#${vagina.type}`
            }${vagina.virgin ? " " : " non-"}virgin vagina is `;
            result += Appearance.describeByScale(
                vagina.vaginalLooseness,
                Appearance.DEFAULT_VAGINA_LOOSENESS_SCALES,
                "tighter than",
                "looser than"
            );
            result += `, ${Appearance.describeByScale(
                vagina.vaginalWetness,
                Appearance.DEFAULT_VAGINA_WETNESS_SCALES,
                "drier than",
                "wetter than"
            )}`;
            if (vagina.labiaPierced) result += `. Labia are pierced with ${vagina.labiaPLong}`;
            if (vagina.clitPierced) result += `. Clit is pierced with ${vagina.clitPLong}`;
            if (this.statusAffectv1(StatusAffects.BonusVCapacity) > 0) {
                result += `; vaginal capacity is increased by ${this.statusAffectv1(
                    StatusAffects.BonusVCapacity
                )}`;
            }
            result += ".\n";
        }
        if (this.breastRows.length > 0) {
            let nipple = `${this.nippleLength}" `;
            if (this.nipplesPierced) nipple += `pierced by ${this.nipplesPLong}`;
            for (let i = 0; i < this.breastRows.length; i++) {
                const row: BreastRowClass = this.breastRows[i] as BreastRowClass;
                result += `${this.Pronoun3 + (i > 0 ? ` #${i + 1}` : "")} breast row has ${
                    row.breasts
                }`;
                result += ` ${row.breastRating.toFixed(2)}-size (${Appearance.breastCup(
                    row.breastRating
                )}) breasts with `;
                result += `${Appearance.numberOfThings(
                    row.nipplesPerBreast,
                    nipple + (row.fuckable ? "fuckable nipple" : "unfuckable nipple")
                )} on each.\n`;
            }
        }
        result += `${this.Pronoun3} ass is ${Appearance.describeByScale(
            this.ass.analLooseness,
            Appearance.DEFAULT_ANAL_LOOSENESS_SCALES,
            "tighter than",
            "looser than"
        )}, ${Appearance.describeByScale(
            this.ass.analWetness,
            Appearance.DEFAULT_ANAL_WETNESS_SCALES,
            "drier than",
            "wetter than"
        )}`;
        if (this.statusAffectv1(StatusAffects.BonusACapacity) > 0) {
            result += `; anal capacity is increased by ${this.statusAffectv1(
                StatusAffects.BonusACapacity
            )}`;
        }
        result += ".\n\n";

        // COMBAT AND OTHER STATS
        result += `${Hehas}str=${this.str}, tou=${this.tou}, spe=${this.spe}, inte=${this.inte}, lib=${this.lib}, sens=${this.sens}, cor=${this.cor}.\n`;
        result += `${this.Pronoun1} can ${this.weaponVerb} you with  ${this.weaponPerk} ${this.weaponName} (attack ${this.weaponAttack}, value ${this.weaponValue}).\n`;
        result += `${this.Pronoun1} is guarded with ${this.armorPerk} ${this.armorName} (defense ${this.armorDef}, value ${this.armorValue}).\n`;
        result += `${Hehas + this.HP}/${this.eMaxHP()} HP, ${this.lust}/100 lust, ${
            this.fatigue
        }/100 fatigue. ${this.Pronoun3} bonus HP=${this.bonusHP}, and lust vulnerability=${
            this.lustVuln
        }.\n`;
        result += `${Heis}level ${this.level} and ${have} ${this.gems} gems. You will be awarded ${this.XP} XP.\n`;

        const numSpec: number =
            (this.special1 != undefined ? 1 : 0) +
            (this.special2 != undefined ? 1 : 0) +
            (this.special3 != undefined ? 1 : 0);
        if (numSpec > 0) {
            result += `${Hehas + numSpec} special attack${numSpec > 1 ? "s" : ""}.\n`;
        } else {
            result += `${Hehas}no special attacks.\n`;
        }

        return result;
    }

    protected clearOutput(): void {
        this.game.clearOutput();
    }

    public dropLoot(): ItemType {
        return this._drop.roll() as ItemType;
    }

    public combatRoundUpdate(): void {
        if (this.findStatusAffect(StatusAffects.MilkyUrta) >= 0) {
            this.game.urtaQuest.milkyUrtaTic();
        }
        // Countdown
        if (this.findStatusAffect(StatusAffects.TentacleCoolDown) >= 0) {
            this.addStatusValue(StatusAffects.TentacleCoolDown, 1, -1);
            if (
                this.statusAffect(this.findStatusAffect(StatusAffects.TentacleCoolDown)).value1 == 0
            ) {
                this.removeStatusAffect(StatusAffects.TentacleCoolDown);
            }
        }
        if (this.findStatusAffect(StatusAffects.CoonWhip) >= 0) {
            if (this.statusAffectv2(StatusAffects.CoonWhip) <= 0) {
                this.armorDef += this.statusAffectv1(StatusAffects.CoonWhip);
                this.outx("<b>Tail whip wears off!</b>\n\n");
                this.removeStatusAffect(StatusAffects.CoonWhip);
            } else {
                this.addStatusValue(StatusAffects.CoonWhip, 2, -1);
                this.outx("<b>Tail whip is currently reducing your foe");
                if (this.plural) this.outx("s'");
                else this.outx("'s");
                this.outx(` armor by ${this.statusAffectv1(StatusAffects.CoonWhip)}.</b>\n\n`);
            }
        }
        if (this.findStatusAffect(StatusAffects.Blind) >= 0) {
            this.addStatusValue(StatusAffects.Blind, 1, -1);
            if (this.statusAffectv1(StatusAffects.Blind) <= 0) {
                this.outx(
                    `<b>${this.capitalA}${this.short}${
                        this.plural ? " are" : " is"
                    } no longer blind!</b>\n\n`,
                    false
                );
                this.removeStatusAffect(StatusAffects.Blind);
            } else
                this.outx(
                    `<b>${this.capitalA}${this.short}${
                        this.plural ? " are" : " is"
                    } currently blind!</b>\n\n`,
                    false
                );
        }
        if (this.findStatusAffect(StatusAffects.Earthshield) >= 0) {
            this.outx(
                `<b>${this.capitalA}${this.short} is protected by a shield of rocks!</b>\n\n`
            );
        }
        if (this.findStatusAffect(StatusAffects.Sandstorm) >= 0) {
            // Blinded:
            if (this.player.findStatusAffect(StatusAffects.Blind) >= 0) {
                this.outx(
                    "<b>You blink the sand from your eyes, but you're sure that more will get you if you don't end it soon!</b>\n\n"
                );
                this.player.removeStatusAffect(StatusAffects.Blind);
            } else {
                if (
                    this.statusAffectv1(StatusAffects.Sandstorm) == 0 ||
                    this.statusAffectv1(StatusAffects.Sandstorm) % 4 == 0
                ) {
                    this.player.createStatusAffect(StatusAffects.Blind, 0, 0, 0, 0);
                    this.outx("<b>The sand is in your eyes!  You're blinded this turn!</b>\n\n");
                } else {
                    this.outx(
                        "<b>The grainy mess cuts at any exposed flesh and gets into every crack and crevice of your armor."
                    );
                    const temp: number = this.player.takeDamage(1 + Monster.rand(2));
                    this.outx(` (${temp})`);
                    this.outx("</b>\n\n");
                }
            }
            this.addStatusValue(StatusAffects.Sandstorm, 1, 1);
        }
        if (this.findStatusAffect(StatusAffects.Stunned) >= 0) {
            this.outx(`<b>${this.capitalA}${this.short} is still stunned!</b>\n\n`, false);
        }
        if (this.findStatusAffect(StatusAffects.Shell) >= 0) {
            if (this.statusAffectv1(StatusAffects.Shell) >= 0) {
                this.outx(`<b>A wall of many hues shimmers around ${this.a}${this.short}.</b>\n\n`);
                this.addStatusValue(StatusAffects.Shell, 1, -1);
            } else {
                this.outx(
                    `<b>The magical barrier ${this.a}${this.short} erected fades away to nothing at last.</b>\n\n`
                );
                this.removeStatusAffect(StatusAffects.Shell);
            }
        }
        if (this.findStatusAffect(StatusAffects.IzmaBleed) >= 0) {
            // Countdown to heal
            this.addStatusValue(StatusAffects.IzmaBleed, 1, -1);
            // Heal wounds
            if (this.statusAffectv1(StatusAffects.IzmaBleed) <= 0) {
                this.outx(
                    `The wounds you left on ${this.a}${this.short} stop bleeding so profusely.\n\n`,
                    false
                );
                this.removeStatusAffect(StatusAffects.IzmaBleed);
            }
            // Deal damage if still wounded.
            else {
                let store: number = (this.eMaxHP() * (3 + Monster.rand(4))) / 100;
                store = this.game.doDamage(store);
                if (this.plural)
                    this.outx(
                        `${
                            this.capitalA + this.short
                        } bleed profusely from the jagged wounds your weapon left behind. (${store})\n\n`,
                        false
                    );
                else
                    this.outx(
                        `${
                            this.capitalA + this.short
                        } bleeds profusely from the jagged wounds your weapon left behind. (${store})\n\n`,
                        false
                    );
            }
        }
        if (this.findStatusAffect(StatusAffects.Timer) >= 0) {
            if (this.statusAffectv1(StatusAffects.Timer) <= 0)
                this.removeStatusAffect(StatusAffects.Timer);
            this.addStatusValue(StatusAffects.Timer, 1, -1);
        }
        if (this.findStatusAffect(StatusAffects.LustStick) >= 0) {
            // LoT Effect Messages:
            switch (this.statusAffectv1(StatusAffects.LustStick)) {
                // First:
                case 1:
                    if (this.plural)
                        this.outx(
                            `One of ${this.a}${this.short} pants and crosses ${this.mf(
                                "his",
                                "her"
                            )} eyes for a moment.  ${this.mf(
                                "His",
                                "Her"
                            )} dick flexes and bulges, twitching as ${this.mf(
                                "he",
                                "she"
                            )} loses himself in a lipstick-fueled fantasy.  When ${this.mf(
                                "he",
                                "she"
                            )} recovers, you lick your lips and watch ${this.mf(
                                "his",
                                "her"
                            )} blush spread.\n\n`,
                            false
                        );
                    else
                        this.outx(
                            `${this.capitalA + this.short} pants and crosses ${
                                this.pronoun3
                            } eyes for a moment.  ${this.mf(
                                "His",
                                "Her"
                            )} dick flexes and bulges, twitching as ${
                                this.pronoun1
                            } loses ${this.mf(
                                "himself",
                                "herself"
                            )} in a lipstick-fueled fantasy.  When ${
                                this.pronoun1
                            } recovers, you lick your lips and watch ${this.mf(
                                "his",
                                "her"
                            )} blush spread.\n\n`,
                            false
                        );
                    break;
                // Second:
                case 2:
                    if (this.plural)
                        this.outx(
                            `${this.capitalA + this.short} moan out loud, ${
                                this.pronoun3
                            } dicks leaking and dribbling while ${
                                this.pronoun1
                            } struggle not to touch ${this.pronoun2}.\n\n`,
                            false
                        );
                    else
                        this.outx(
                            `${this.capitalA + this.short} moans out loud, ${
                                this.pronoun3
                            } dick leaking and dribbling while ${
                                this.pronoun1
                            } struggles not to touch it.\n\n`,
                            false
                        );
                    break;
                // Third:
                case 3:
                    if (this.plural)
                        this.outx(
                            `${this.capitalA + this.short} pump ${
                                this.pronoun3
                            } hips futilely, air-humping non-existent partners.  Clearly your lipstick is getting to ${
                                this.pronoun2
                            }.\n\n`,
                            false
                        );
                    else
                        this.outx(
                            `${this.capitalA + this.short} pumps ${
                                this.pronoun3
                            } hips futilely, air-humping a non-existent partner.  Clearly your lipstick is getting to ${
                                this.pronoun2
                            }.\n\n`,
                            false
                        );
                    break;
                // Fourth:
                case 4:
                    if (this.plural)
                        this.outx(
                            `${this.capitalA + this.short} close ${this.pronoun3} eyes and grunt, ${
                                this.pronoun3
                            } cocks twitching, bouncing, and leaking pre-cum.\n\n`,
                            false
                        );
                    else
                        this.outx(
                            `${this.capitalA + this.short} closes ${
                                this.pronoun2
                            } eyes and grunts, ${
                                this.pronoun3
                            } cock twitching, bouncing, and leaking pre-cum.\n\n`,
                            false
                        );
                    break;
                // Fifth and repeat:
                default:
                    if (this.plural)
                        this.outx(
                            `Drops of pre-cum roll steadily out of their dicks.  It's a marvel ${this.pronoun1} haven't given in to ${this.pronoun3} lusts yet.\n\n`,
                            false
                        );
                    else
                        this.outx(
                            `Drops of pre-cum roll steadily out of ${this.a}${this.short}'s dick.  It's a marvel ${this.pronoun1} hasn't given in to ${this.pronoun3} lust yet.\n\n`,
                            false
                        );
                    break;
            }
            this.addStatusValue(StatusAffects.LustStick, 1, 1);
            // Damage = 5 + bonus score minus
            // Reduced by lust vuln of course
            this.lust += Math.round(
                this.lustVuln * (5 + this.statusAffectv2(StatusAffects.LustStick))
            );
        }
        if (this.findStatusAffect(StatusAffects.PCTailTangle) >= 0) {
            // when Entwined
            this.outx(
                "You are bound tightly in the kitsune's tails.  <b>The only thing you can do is try to struggle free!</b>\n\n"
            );
            this.outx(
                "Stimulated by the coils of fur, you find yourself growing more and more aroused...\n\n"
            );
            this.game.dynStats("lus", 5 + this.player.sens / 10);
        }
        if (this.findStatusAffect(StatusAffects.QueenBind) >= 0) {
            this.outx("You're utterly restrained by the Harpy Queen's magical ropes!\n\n");
            if (this.flags[kFLAGS.PC_FETISH] >= 2) this.game.dynStats("lus", 3);
        }
        if (this.short === "secretarial succubus" || this.short === "milky succubus") {
            if (this.player.lust < 45)
                this.outx(
                    "There is something in the air around your opponent that makes you feel warm.\n\n",
                    false
                );
            if (this.player.lust >= 45 && this.player.lust < 70)
                this.outx(
                    "You aren't sure why but you have difficulty keeping your eyes off your opponent's lewd form.\n\n",
                    false
                );
            if (this.player.lust >= 70 && this.player.lust < 90)
                this.outx(
                    "You blush when you catch yourself staring at your foe's rack, watching it wobble with every step she takes.\n\n",
                    false
                );
            if (this.player.lust >= 90)
                this.outx(
                    "You have trouble keeping your greedy hands away from your groin.  It would be so easy to just lay down and masturbate to the sight of your curvy enemy.  The succubus looks at you with a sexy, knowing expression.\n\n",
                    false
                );
            this.game.dynStats("lus", 1 + Monster.rand(8));
        }
        // [LUST GAINED PER ROUND] - Omnibus
        if (this.findStatusAffect(StatusAffects.LustAura) >= 0) {
            if (this.player.lust < 33)
                this.outx(
                    "Your groin tingles warmly.  The demon's aura is starting to get to you.\n\n",
                    false
                );
            if (this.player.lust >= 33 && this.player.lust < 66)
                this.outx(
                    "You blush as the demon's aura seeps into you, arousing you more and more.\n\n",
                    false
                );
            if (this.player.lust >= 66) {
                this.outx(
                    "You flush bright red with desire as the lust in the air worms its way inside you.  ",
                    false
                );
                const temp = Monster.rand(4);
                if (temp == 0)
                    this.outx(
                        "You have a hard time not dropping to your knees to service her right now.\n\n",
                        false
                    );
                if (temp == 2)
                    this.outx(
                        "The urge to bury your face in her breasts and suckle her pink nipples nearly overwhelms you.\n\n",
                        false
                    );
                if (temp == 1)
                    this.outx(
                        "You swoon and lick your lips, tasting the scent of the demon's pussy in the air.\n\n",
                        false
                    );
                if (temp == 3)
                    this.outx(
                        "She winks at you and licks her lips, and you can't help but imagine her tongue sliding all over your body.  You regain composure moments before throwing yourself at her.  That was close.\n\n",
                        false
                    );
            }
            this.game.dynStats("lus", 3 + Math.floor(this.player.lib / 20 + this.player.cor / 30));
        }
    }

    public handleAwardItemText(itype?: ItemType): void {
        // New Function, override this function in child classes if you want a monster to output special item drop text
        if (itype != undefined)
            this.outx(`\nThere is ${itype.longName} on your defeated opponent.  `);
    }

    public handleAwardText(): void {
        // New Function, override this function in child classes if you want a monster to output special gem and XP text
        // This function doesn’t add the gems or XP to the player, it just provides the output text
        if (this.gems == 1)
            this.outx(
                `\n\nYou snag a single gem and ${this.XP} XP as you walk away from your victory.`
            );
        else if (this.gems > 1)
            this.outx(`\n\nYou grab ${this.gems} gems and ${this.XP} XP from your victory.`);
        else if (this.gems == 0) this.outx(`\n\nYou gain ${this.XP} XP from the battle.`);
    }

    public handleCombatLossText(inDungeon: boolean, gemsLost: number): number {
        // New Function, override this function in child classes if you want a monster to output special text after the player loses in combat
        // This function doesn’t take the gems away from the player, it just provides the output text
        if (!inDungeon) {
            this.outx("\n\nYou'll probably come to your senses in eight hours or so");
            if (this.player.gems > 1) this.outx(`, missing ${gemsLost} gems.`);
            else if (this.player.gems == 1) this.outx(", missing your only gem.");
            else this.outx(".");
        } else {
            this.outx("\n\nSomehow you came out of that alive");
            if (this.player.gems > 1)
                this.outx(
                    `, but after checking your gem pouch, you realize you're missing ${gemsLost} gems.`
                );
            else if (this.player.gems == 1)
                this.outx(
                    ", but after checking your gem pouch, you realize you're missing your only gem."
                );
            else this.outx(".");
        }
        return 8; // This allows different monsters to delay the player by different amounts of time after a combat loss. Normal loss causes an eight hour blackout
    }
}
