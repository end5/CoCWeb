import { ISerializable } from 'Engine/Utilities/ISerializable';
import { List } from 'Engine/Utilities/List';
import { IStatEffect } from 'Game/Character/Stats/Stat/StatEffect';

export interface IStat {
    raw: number;
}

export class Stat implements IStat, ISerializable<IStat> {
    public readonly effects = new List<IStatEffect>();
    public raw: number;

    public constructor(value: number) {
        this.raw = value;
    }

    public get calculated() {
        return this.effects.reduce((base, effect) =>
            base * (effect && effect.multi ? effect.multi : 1) + (effect && effect.flat ? effect.flat : 0), this.raw);
    }

    public toString() {
        return 'Raw :' + this.raw + ' Calculated: ' + this.calculated;
    }

    public serialize(): IStat {
        return {
            raw: this.raw,
        };
    }

    public deserialize(saveObject: IStat) {
        this.raw = saveObject.raw;
    }
}
