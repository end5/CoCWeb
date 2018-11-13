import { StatusEffect } from './StatusEffect';
import { StatusEffectType } from './StatusEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { IEffectValues } from './EffectValues';
import { Character } from '../Character/Character';

export class StatusEffectDict extends Dictionary<StatusEffectType, StatusEffect> {
    private char: Character;
    public constructor(char: Character) {
        super();
        this.char = char;
    }
    public add(type: StatusEffectType, values?: IEffectValues) {
        this.set(type, new StatusEffect(type, values));
    }

    public set(type: StatusEffectType, entry: StatusEffect) {
        super.set(type, entry);
        const values = entry.values;
        if (values) {
            if (values.attack)
                this.char.combat.stats.attackStat.effects.set(type, values.attack);
            if (values.defense)
                this.char.combat.stats.defenseStat.effects.set(type, values.defense);
            if (values.str)
                this.char.stats.base.str.effects.set(type, values.str);
            if (values.tou)
                this.char.stats.base.tou.effects.set(type, values.tou);
            if (values.spe)
                this.char.stats.base.spe.effects.set(type, values.spe);
            if (values.int)
                this.char.stats.base.int.effects.set(type, values.int);
            if (values.lib)
                this.char.stats.base.lib.effects.set(type, values.lib);
            if (values.sens)
                this.char.stats.base.sens.effects.set(type, values.sens);
            if (values.cor)
                this.char.stats.base.cor.effects.set(type, values.cor);
            if (values.fatigue)
                this.char.stats.base.fatigue.effects.set(type, values.fatigue);
            if (values.hp)
                this.char.stats.base.HP.effects.set(type, values.hp);
            if (values.lust)
                this.char.stats.base.lust.effects.set(type, values.lust);
        }
    }

    public remove(key: StatusEffectType) {
        super.remove(key);
        const effect = this.get(key);
        if (effect && effect.values) {
            if (effect.values.attack)
                this.char.combat.stats.attackStat.effects.remove(key);
            if (effect.values.defense)
                this.char.combat.stats.defenseStat.effects.remove(key);
            if (effect.values.str)
                this.char.stats.base.str.effects.remove(key);
            if (effect.values.tou)
                this.char.stats.base.tou.effects.remove(key);
            if (effect.values.spe)
                this.char.stats.base.spe.effects.remove(key);
            if (effect.values.int)
                this.char.stats.base.int.effects.remove(key);
            if (effect.values.lib)
                this.char.stats.base.lib.effects.remove(key);
            if (effect.values.sens)
                this.char.stats.base.sens.effects.remove(key);
            if (effect.values.cor)
                this.char.stats.base.cor.effects.remove(key);
            if (effect.values.fatigue)
                this.char.stats.base.fatigue.effects.remove(key);
            if (effect.values.hp)
                this.char.stats.base.HP.effects.remove(key);
            if (effect.values.lust)
                this.char.stats.base.lust.effects.remove(key);
        }
    }
}
