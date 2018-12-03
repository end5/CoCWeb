import { IRangedStat, RangedStat } from './RangedStat';
import { IRangedStatEffect, RangedStatEffect } from './RangedStatEffect';
import { List } from 'Engine/Utilities/List';

export interface IRangedStatWithEffects extends IRangedStat {
    effects: IRangedStatEffect[];
}

export class RangedStatWithEffects extends RangedStat {
    public effects = new List<IRangedStatEffect>();

    public get value() {
        const calc = this.calculate();
        return this.curValue * calc.value.multi + calc.value.flat;
    }
    public set value(num: number) { super.value = num; }

    public get min() {
        const calc = this.calculate();
        return this.minValue * calc.min.multi + calc.min.flat;
    }
    public set min(num: number) { super.min = num; }

    public get max() {
        const calc = this.calculate();
        return this.maxValue * calc.max.multi + calc.max.flat;
    }
    public set max(num: number) { super.max = num; }

    protected calculate(): RangedStatEffect {
        const calc = new RangedStatEffect();
        for (const effect of this.effects) {
            if (effect.value && effect.value.flat) {
                if (typeof effect.value.flat === 'function')
                    calc.value.flat += effect.value.flat(calc.value.flat);
                else if (typeof effect.value.flat === 'number')
                    calc.value.flat += effect.value.flat;
            }
            if (effect.value && effect.value.multi) {
                if (typeof effect.value.multi === 'function')
                    calc.value.multi += effect.value.multi(calc.value.multi);
                else if (typeof effect.value.multi === 'number')
                    calc.value.multi += effect.value.multi;
            }
            if (effect.min && effect.min.flat) {
                if (typeof effect.min.flat === 'function')
                    calc.min.flat += effect.min.flat(calc.min.flat);
                else if (typeof effect.min.flat === 'number')
                    calc.min.flat += effect.min.flat;
            }
            if (effect.min && effect.min.multi) {
                if (typeof effect.min.multi === 'function')
                    calc.min.multi += effect.min.multi(calc.min.multi);
                else if (typeof effect.min.multi === 'number')
                    calc.min.multi += effect.min.multi;
            }
            if (effect.max && effect.max.flat) {
                if (typeof effect.max.flat === 'function')
                    calc.max.flat += effect.max.flat(calc.max.flat);
                else if (typeof effect.max.flat === 'number')
                    calc.max.flat += effect.max.flat;
            }
            if (effect.max && effect.max.multi) {
                if (typeof effect.max.multi === 'function')
                    calc.max.multi += effect.max.multi(calc.max.multi);
                else if (typeof effect.max.multi === 'number')
                    calc.max.multi += effect.max.multi;
            }
        }
        return calc;
    }

    public serialize(): IRangedStatWithEffects {
        return Object.assign({
            effects: this.effects.serialize(),
        }, super.serialize());
    }

    public deserialize(saveObject: IRangedStatWithEffects): void {
        this.effects.deserialize(saveObject.effects);
        super.deserialize(saveObject);
    }
}
