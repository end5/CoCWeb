import { IStatEffect, StatEffect } from 'Engine/Character/Stats/Stat/StatEffect';

export interface IDeltaStatEffect {
    base?: IStatEffect;
    delta?: IStatEffect;
    total?: IStatEffect;
}

export class DeltaStatEffect implements IDeltaStatEffect {
    public base: StatEffect;
    public delta: StatEffect;
    public total: StatEffect;

    public constructor(values?: IDeltaStatEffect) {
        this.base = new StatEffect(values ? values.base : undefined);
        this.delta = new StatEffect(values ? values.delta : undefined);
        this.total = new StatEffect(values ? values.total : undefined);
    }

    public toString() {
        let out = '';
        if (this.base.toString() !== '') out += 'Base: ' + this.base.toString();
        if (this.delta.toString() !== '') out += 'Delta: ' + this.delta.toString();
        if (this.total.toString() !== '') out += 'Total: ' + this.total.toString();
        return out;
    }
}
