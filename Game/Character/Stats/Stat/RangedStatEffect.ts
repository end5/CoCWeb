import { IStatModifier, StatModifier } from './StatModifier';

export interface IRangedStatEffect {
    value?: IStatModifier;
    min?: IStatModifier;
    max?: IStatModifier;
}

export class RangedStatEffect implements IRangedStatEffect {
    public value = new StatModifier();
    public min = new StatModifier();
    public max = new StatModifier();
    public constructor(values?: IRangedStatEffect) {
        if (values) {
            if (values.value)
                this.value = new StatModifier(values.value);
            if (values.min)
                this.min = new StatModifier(values.min);
            if (values.max)
                this.max = new StatModifier(values.max);
        }
    }
    public toString() {
        let out = '';
        if (this.value.toString() !== '') {
            out += 'Value - ' + this.value.toString();
        }
        if (this.min.toString() !== '') {
            out += ' Min - ' + this.min.toString();
        }
        if (this.max.toString() !== '') {
            out += ' Max - ' + this.max.toString();
        }
        return out;
    }
}
