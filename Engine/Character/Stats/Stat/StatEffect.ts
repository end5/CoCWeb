export interface IStatEffect {
    multi?: number;
    flat?: number;
    recalculate?: (effect: IConcreteStatEffect) => void;
}

export interface IConcreteStatEffect extends IStatEffect {
    multi: number;
    flat: number;
}

export class StatEffect implements IStatEffect {
    private values: IConcreteStatEffect;
    public constructor(values?: IStatEffect) {
        if (!values) values = {};
        if (values.flat === undefined) values.flat = 0;
        if (values.multi === undefined) values.multi = 1;
        this.values = values as IConcreteStatEffect;
    }

    public get flat(): number { return this.values.flat; }
    public set flat(value: number) {
        this.values.flat = value;
        this.recalculate();
    }

    public get multi(): number { return this.values.multi; }
    public set multi(value: number) {
        this.values.multi = value;
        this.recalculate();
    }

    public recalculate() {
        if (this.values.recalculate)
            this.values.recalculate(this.values);
    }

    public toString() {
        if (this.multi !== 1 || this.flat !== 0)
            return 'x' + this.multi + ' + ' + this.flat;
        return '';
    }
}
