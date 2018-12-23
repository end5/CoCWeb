import { IStatEffect, StatEffect } from 'Game/Character/Stats/Stat/StatEffect';

export interface IDeltaStatEffect {
    base?: IStatEffect;
    delta?: IStatEffect;
    total?: IStatEffect;
}

export class DeltaStatEffect implements IDeltaStatEffect {
    public base = new StatEffect();
    public delta = new StatEffect();
    public total = new StatEffect();
    public constructor(values?: IDeltaStatEffect) {
        if (values) {
            if (values.base) this.base = new StatEffect(values.base);
            if (values.delta) this.delta = new StatEffect(values.delta);
            if (values.total) this.total = new StatEffect(values.total);
        }
    }

    public toString() {
        let out = '';
        if (this.base.toString() !== '') out += 'Base: ' + this.base.toString();
        if (this.delta.toString() !== '') out += 'Delta: ' + this.delta.toString();
        if (this.total.toString() !== '') out += 'Total: ' + this.total.toString();
        return out;
    }
}
