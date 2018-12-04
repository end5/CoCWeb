import { EffectDesc } from './EffectDesc';
import { ISerializable } from 'Engine/Utilities/ISerializable';
import { EffectValues, IEffectValues } from './EffectValues';
import { EffectDescLib } from './EffectDescLib';
import { Character } from 'Game/Character/Character';

export interface IEffect {
    type: string;
    values?: IEffectValues;
}

export class Effect implements ISerializable<IEffect> {
    private effectType: string;
    public readonly desc: EffectDesc;
    private effectValues: EffectValues;

    public constructor(type: string, values?: IEffectValues) {
        this.effectType = type;
        this.desc = EffectDescLib.get(name);
        this.effectValues = new EffectValues(values);
    }

    public get values() {
        return this.effectValues;
    }

    public get type(): string {
        return this.effectType;
    }

    public combatStart(char: Character): void { }
    public combatTurnStart(char: Character, ...enemies: Character[]): void { }
    public combatTurnEnd(char: Character, ...enemies: Character[]): void { }
    public combatEnd(char: Character): void { }

    public serialize(): IEffect {
        return {
            type: this.effectType,
            values: this.values
        };
    }

    public deserialize(saveObject: IEffect) {
        this.effectType = saveObject.type;
        this.effectValues = new EffectValues(saveObject.values);
    }
}
