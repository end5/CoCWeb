import { IDeltaStatEffect, DeltaStatEffect } from 'Engine/Character/Stats/Stat/DeltaStatEffect';
import { IStatEffect, StatEffect } from 'Engine/Character/Stats/Stat/StatEffect';

export interface IRangedStatEffect extends IDeltaStatEffect {
    min?: IStatEffect;
    max?: IStatEffect;
}

export class RangedStatEffect extends DeltaStatEffect implements IRangedStatEffect {
    public min = new StatEffect();
    public max = new StatEffect();

    public constructor(values?: IRangedStatEffect) {
        super(values);
        if (values) {
            if (values.min) this.min = new StatEffect(values.min);
            if (values.max) this.max = new StatEffect(values.max);
        }
    }

    public toString() {
        let out = super.toString();
        if (this.min.toString() !== '') out += ' Min: ' + this.min.toString();
        if (this.max.toString() !== '') out += ' Max: ' + this.max.toString();
        return out;
    }
}
