import { Character } from "../Character/Character";
import { EffectList } from './EffectList';
import { IListObserver } from 'Game/Utilities/IListObserver';
import { Effect } from './Effect';

export class EffectApplicator implements IListObserver<Effect> {
    private char: Character;
    private list: EffectList;
    public constructor(char: Character, effectList: EffectList) {
        this.char = char;
        this.list = effectList;
    }

    public onAdd(item: Effect): void {
        const values = item.values;
        if (values.attack)
            this.char.combat.stats.attackStat.effects.add(values.attack);
        if (values.defense)
            this.char.combat.stats.defenseStat.effects.add(values.defense);
        if (values.str)
            this.char.stats.base.str.effects.add(values.str);
        if (values.tou)
            this.char.stats.base.tou.effects.add(values.tou);
        if (values.spe)
            this.char.stats.base.spe.effects.add(values.spe);
        if (values.int)
            this.char.stats.base.int.effects.add(values.int);
        if (values.lib)
            this.char.stats.base.lib.effects.add(values.lib);
        if (values.sens)
            this.char.stats.base.sens.effects.add(values.sens);
        if (values.cor)
            this.char.stats.base.cor.effects.add(values.cor);
        if (values.fatigue)
            this.char.stats.base.fatigue.effects.add(values.fatigue);
        if (values.hp)
            this.char.stats.base.HP.effects.add(values.hp);
        if (values.lust)
            this.char.stats.base.lust.effects.add(values.lust);
    }

    public onRemove(item: Effect): void {
        const values = item.values;
        if (values.attack)
            this.char.combat.stats.attackStat.effects.remove(values.attack);
        if (values.defense)
            this.char.combat.stats.defenseStat.effects.remove(values.defense);
        if (values.str)
            this.char.stats.base.str.effects.remove(values.str);
        if (values.tou)
            this.char.stats.base.tou.effects.remove(values.tou);
        if (values.spe)
            this.char.stats.base.spe.effects.remove(values.spe);
        if (values.int)
            this.char.stats.base.int.effects.remove(values.int);
        if (values.lib)
            this.char.stats.base.lib.effects.remove(values.lib);
        if (values.sens)
            this.char.stats.base.sens.effects.remove(values.sens);
        if (values.cor)
            this.char.stats.base.cor.effects.remove(values.cor);
        if (values.fatigue)
            this.char.stats.base.fatigue.effects.remove(values.fatigue);
        if (values.hp)
            this.char.stats.base.HP.effects.remove(values.hp);
        if (values.lust)
            this.char.stats.base.lust.effects.remove(values.lust);
    }

    public onClear(): void {
        for (const effect of this.list)
            this.onRemove(effect);
    }
}
