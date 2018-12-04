import { IStatModifier, StatModifier } from './StatModifier';
import { IRangedStatEffect } from './RangedStatEffect';

export interface IStatEffect {
    value?: IStatModifier;
}

export class StatEffect implements IRangedStatEffect {
    public value = new StatModifier();
    public constructor(values?: IRangedStatEffect) {
        if (values) {
            if (values.value)
                this.value = new StatModifier(values.value);
        }
    }
    public toString() {
        let out = '';
        if (this.value.toString() !== '') {
            out += 'Value - ' + this.value.toString();
        }
        return out;
    }
}
