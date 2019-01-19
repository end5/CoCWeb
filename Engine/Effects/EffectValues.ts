import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';
import { IDictionary } from 'Engine/Utilities/Dictionary';
import { IRangedStatEffect, RangedStatEffect } from 'Engine/Character/Stats/Stat/RangedStatEffect';
import { IStatEffect, StatEffect } from 'Engine/Character/Stats/Stat/StatEffect';

export interface IEffectValues {
    desc?: string;
    expireCountdown?: number;
    attack?: IRangedStatEffect;
    weapon?: IRangedStatEffect;
    spell?: IRangedStatEffect;
    spellCost?: IStatEffect;
    defense?: IRangedStatEffect;
    teaseChance?: number;
    teaseDamage?: number;
    str?: IRangedStatEffect;
    tou?: IRangedStatEffect;
    spe?: IRangedStatEffect;
    int?: IRangedStatEffect;
    lib?: IRangedStatEffect;
    sens?: IRangedStatEffect;
    cor?: IRangedStatEffect;
    fatigue?: IRangedStatEffect;
    hp?: IRangedStatEffect;
    lust?: IRangedStatEffect;
    lustResist?: IRangedStatEffect;
    femininity?: IRangedStatEffect;
    fertility?: IRangedStatEffect;
    cumQuantity?: IRangedStatEffect;
    virility?: number;
    vaginalCapacity?: number;
    analCapacity?: number;
    blockedTypes?: CombatActionType;
    other?: IDictionary<any>;
}

export class EffectValues implements IEffectValues {
    public expireCountdown: number;
    public readonly attack: RangedStatEffect;
    public readonly weapon: RangedStatEffect;
    public readonly spell: RangedStatEffect;
    public readonly spellCost: StatEffect;
    public readonly defense: RangedStatEffect;
    public teaseChance: number;
    public teaseDamage: number;
    public readonly str: RangedStatEffect;
    public readonly tou: RangedStatEffect;
    public readonly spe: RangedStatEffect;
    public readonly int: RangedStatEffect;
    public readonly lib: RangedStatEffect;
    public readonly sens: RangedStatEffect;
    public readonly cor: RangedStatEffect;
    public readonly fatigue: RangedStatEffect;
    public readonly hp: RangedStatEffect;
    public readonly lust: RangedStatEffect;
    public readonly lustResist: RangedStatEffect;
    public readonly femininity: RangedStatEffect;
    public readonly fertility: RangedStatEffect;
    public readonly cumQuantity: RangedStatEffect;
    public virility: number;
    public vaginalCapacity: number;
    public analCapacity: number;
    public blockedTypes: CombatActionType;
    public readonly other?: IDictionary<any>;

    public constructor(values?: IEffectValues) {
        this.expireCountdown = values && values.expireCountdown ? values.expireCountdown : 0;
        this.attack = new RangedStatEffect(values ? values.attack : undefined);
        this.weapon = new RangedStatEffect(values ? values.weapon : undefined);
        this.spell = new RangedStatEffect(values ? values.spell : undefined);
        this.spellCost = new StatEffect(values ? values.spellCost : undefined);
        this.defense = new RangedStatEffect(values ? values.defense : undefined);
        this.teaseChance = values && values.teaseChance ? values.teaseChance : 0;
        this.teaseDamage = values && values.teaseDamage ? values.teaseDamage : 0;
        this.str = new RangedStatEffect(values ? values.str : undefined);
        this.tou = new RangedStatEffect(values ? values.tou : undefined);
        this.spe = new RangedStatEffect(values ? values.spe : undefined);
        this.int = new RangedStatEffect(values ? values.int : undefined);
        this.lib = new RangedStatEffect(values ? values.lib : undefined);
        this.sens = new RangedStatEffect(values ? values.sens : undefined);
        this.cor = new RangedStatEffect(values ? values.cor : undefined);
        this.fatigue = new RangedStatEffect(values ? values.fatigue : undefined);
        this.hp = new RangedStatEffect(values ? values.hp : undefined);
        this.lust = new RangedStatEffect(values ? values.lust : undefined);
        this.lustResist = new RangedStatEffect(values ? values.lustResist : undefined);
        this.femininity = new RangedStatEffect(values ? values.femininity : undefined);
        this.fertility = new RangedStatEffect(values ? values.fertility : undefined);
        this.cumQuantity = new RangedStatEffect(values ? values.cumQuantity : undefined);
        this.virility = values && values.virility ? values.virility : 0;
        this.vaginalCapacity = values && values.vaginalCapacity ? values.vaginalCapacity : 0;
        this.analCapacity = values && values.analCapacity ? values.analCapacity : 0;
        this.blockedTypes = values && values.blockedTypes ? values.blockedTypes : CombatActionType.None;
        if (values && values.other)
            this.other = values.other;
    }
}
