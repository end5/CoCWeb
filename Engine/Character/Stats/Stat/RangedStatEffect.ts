import { IDeltaStatEffect, DeltaStatEffect } from 'Engine/Character/Stats/Stat/DeltaStatEffect';
import { IStatEffect, StatEffect } from 'Engine/Character/Stats/Stat/StatEffect';

export interface IRangedStatEffect extends IDeltaStatEffect {
    min?: IStatEffect;
    max?: IStatEffect;
}

export class RangedStatEffect extends DeltaStatEffect implements IRangedStatEffect {
    public min: StatEffect;
    public max: StatEffect;

    public constructor(values?: IRangedStatEffect) {
        super(values);
        this.min = new StatEffect(values ? values.min : undefined);
        this.max = new StatEffect(values ? values.max : undefined);
    }

    public toString() {
        let out = super.toString();
        if (this.min.toString() !== '') out += ' Min: ' + this.min.toString();
        if (this.max.toString() !== '') out += ' Max: ' + this.max.toString();
        return out;
    }
}
