import { IRangedStatEffect, RangedStatEffect } from 'Game/Character/Stats/Stat/RangedStatEffect';
import { IStatModifier, StatModifier } from 'Game/Character/Stats/Stat/StatModifier';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';
import { IDictionary } from 'Engine/Utilities/Dictionary';

export interface IEffectValues {
    desc?: string;
    expireCountdown?: number;
    attack?: IRangedStatEffect;
    weapon?: IRangedStatEffect;
    spell?: IRangedStatEffect;
    spellCost?: IStatModifier;
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
    public readonly spellCost: StatModifier;
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
        this.attack = values && values.attack ? new RangedStatEffect(values.attack) : new RangedStatEffect();
        this.weapon = values && values.weapon ? new RangedStatEffect(values.weapon) : new RangedStatEffect();
        this.spell = values && values.spell ? new RangedStatEffect(values.spell) : new RangedStatEffect();
        this.spellCost = values && values.spellCost ? new StatModifier(values.spellCost) : new StatModifier();
        this.defense = values && values.defense ? new RangedStatEffect(values.defense) : new RangedStatEffect();
        this.teaseChance = values && values.teaseChance ? values.teaseChance : 0;
        this.teaseDamage = values && values.teaseDamage ? values.teaseDamage : 0;
        this.str = values && values.str ? new RangedStatEffect(values.str) : new RangedStatEffect();
        this.tou = values && values.tou ? new RangedStatEffect(values.tou) : new RangedStatEffect();
        this.spe = values && values.spe ? new RangedStatEffect(values.spe) : new RangedStatEffect();
        this.int = values && values.int ? new RangedStatEffect(values.int) : new RangedStatEffect();
        this.lib = values && values.lib ? new RangedStatEffect(values.lib) : new RangedStatEffect();
        this.sens = values && values.sens ? new RangedStatEffect(values.sens) : new RangedStatEffect();
        this.cor = values && values.cor ? new RangedStatEffect(values.cor) : new RangedStatEffect();
        this.fatigue = values && values.fatigue ? new RangedStatEffect(values.fatigue) : new RangedStatEffect();
        this.hp = values && values.hp ? new RangedStatEffect(values.hp) : new RangedStatEffect();
        this.lust = values && values.lust ? new RangedStatEffect(values.lust) : new RangedStatEffect();
        this.femininity = values && values.femininity ? new RangedStatEffect(values.femininity) : new RangedStatEffect();
        this.fertility = values && values.fertility ? new RangedStatEffect(values.fertility) : new RangedStatEffect();
        this.cumQuantity = values && values.cumQuantity ? new RangedStatEffect(values.cumQuantity) : new RangedStatEffect();
        this.virility = values && values.virility ? values.virility : 0;
        this.vaginalCapacity = values && values.vaginalCapacity ? values.vaginalCapacity : 0;
        this.analCapacity = values && values.analCapacity ? values.analCapacity : 0;
        this.blockedTypes = values && values.blockedTypes ? values.blockedTypes : CombatActionType.None;
        if (values && values.other)
            this.other = values.other;
    }
}
