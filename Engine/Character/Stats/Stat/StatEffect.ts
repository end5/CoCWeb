export type StatEffectValue = number | ((val: number) => number);

export interface IStatEffect {
    multi?: StatEffectValue;
    flat?: StatEffectValue;
}

export class StatEffect implements IStatEffect {
    public multi: StatEffectValue = 1;
    public flat: StatEffectValue = 0;
    public constructor(values?: IStatEffect) {
        if (values) {
            if (values.flat) this.flat = values.flat;
            if (values.multi) this.multi = values.multi;
        }
    }

    public toString() {
        if (this.multi !== 1 || this.flat !== 0)
            return 'x' + this.multi + ' + ' + this.flat;
        return '';
    }
}
