export interface IStatEffect {
    multi?: number;
    flat?: number;
}

export class StatEffect implements IStatEffect {
    public multi: number = 1;
    public flat: number = 0;
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
