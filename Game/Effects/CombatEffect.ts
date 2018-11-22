import { CombatEffectType } from './CombatEffectType';
import { Effect } from './Effect';
import { EffectDesc } from './EffectDescription';
import { Character } from '../Character/Character';
import { CombatEffectValues, ICombatEffectValues } from './CombatEffectValues';

export class CombatEffect extends Effect<CombatEffectType, EffectDesc, CombatEffectValues> {
    public readonly inflictedBy: Character;
    public values: CombatEffectValues;

    public constructor(
        type: CombatEffectType,
        inflictedBy: Character,
        values?: ICombatEffectValues
    ) {
        super(type, new EffectDesc(type, type, ""), values);
        this.inflictedBy = inflictedBy;
        this.values = new CombatEffectValues(values);
    }

    public onAdd(_character: Character): void { }
    public update(_character: Character, ..._enemy: Character[]): void { }
    public onRemove(_character: Character): void { }
}
