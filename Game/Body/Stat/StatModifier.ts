export interface IStatModifier {
    multi?: number | ((num: number) => number);
    flat?: number | ((num: number) => number);
}

export class StatModifier implements IStatModifier {
    public multi: number = 1;
    public flat: number = 0;
    public constructor(values?: IStatModifier) {
        if (values) {
            if (values.flat) {
                if (typeof values.flat === 'number')
                    this.flat = values.flat;
                if (typeof values.flat === 'function')
                    this.flat = values.flat(this.flat);
            }
            if (values.multi) {
                if (typeof values.multi === 'number')
                    this.multi = values.multi;
                if (typeof values.multi === 'function')
                    this.multi = values.multi(this.multi);
            }
        }
    }
    public toString() {
        if (this.multi !== 1 || this.flat !== 0)
            return 'x' + this.multi + ' + ' + this.flat;
        return '';
    }
}
