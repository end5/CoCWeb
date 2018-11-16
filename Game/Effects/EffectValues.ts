import { IRangedStatEffect, RangedStatEffect } from "../Body/Stat/RangedStatEffect";
import { IStatModifier, StatModifier } from "../Body/Stat/StatModifier";

export interface IEffectValues {
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
    other?: { [x: string]: any };
}

export class EffectValues implements IEffectValues {
    public expireCountdown = 0;
    public readonly attack: RangedStatEffect;
    public readonly weapon: RangedStatEffect;
    public readonly spell: RangedStatEffect;
    public readonly spellCost: StatModifier;
    public readonly defense: RangedStatEffect;
    public teaseChance = 0;
    public teaseDamage = 0;
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
    public other?: { [x: string]: any };

    public constructor(values?: IEffectValues) {
        this.attack = values && values.attack ? new RangedStatEffect(values.attack) : new RangedStatEffect();
        this.weapon = values && values.weapon ? new RangedStatEffect(values.weapon) : new RangedStatEffect();
        this.spell = values && values.spell ? new RangedStatEffect(values.spell) : new RangedStatEffect();
        this.spellCost = values && values.spellCost ? new StatModifier(values.spellCost) : new StatModifier();
        this.defense = values && values.defense ? new RangedStatEffect(values.defense) : new RangedStatEffect();
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
    }
}
