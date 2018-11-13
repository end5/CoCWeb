import { CombatActionFlags } from './CombatActionFlag';
import { CombatEffectType } from './CombatEffectType';
import { Effect } from './Effect';
import { EffectDesc } from './EffectDescription';
import { Character } from '../Character/Character';
import { IEffectValues } from './EffectValues';

export class CombatEffect extends Effect<CombatEffectType> {
    public readonly abilityFlag: CombatActionFlags;
    public readonly inflictedBy: Character;

    public constructor(
        type: CombatEffectType,
        abilityFlag: CombatActionFlags = CombatActionFlags.All,
        inflictedBy: Character,
        values?: IEffectValues
    ) {
        super(type, new EffectDesc(type, type, ""), values);
        this.abilityFlag = abilityFlag;
        this.inflictedBy = inflictedBy;
    }

    public onAdd(_character: Character): void { }
    public update(_character: Character, ..._enemy: Character[]): void { }
    public onRemove(_character: Character): void { }
}
