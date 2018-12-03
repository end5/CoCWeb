import { IStatEffect, StatEffect } from "./StatEffect";
import { Dictionary, IDictionary } from "../../../Engine/Utilities/Dictionary";
import { Stat, IStat } from "./Stat";

export interface IStatWithEffects extends IStat {
    effects: IDictionary<IStatEffect>;
}

export class StatWithEffects extends Stat {
    public effects = new Dictionary<string, IStatEffect>();

    public get value() {
        const calc = this.calculate();
        return this.curValue * calc.value.multi + calc.value.flat;
    }
    public set value(num: number) { super.value = num; }

    public calculate(): StatEffect {
        const calc = new StatEffect();
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
        }
        return calc;
    }

    public serialize(): IStatWithEffects {
        return Object.assign({
            effects: this.effects.serialize(),
        }, super.serialize());
    }

    public deserialize(saveObject: IStatWithEffects): void {
        this.effects.deserialize(saveObject.effects);
        super.deserialize(saveObject);
    }
}
