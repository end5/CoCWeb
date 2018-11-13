import { CombatActionFlags } from './CombatActionFlag';
import { CombatEffect } from './CombatEffect';
import { CombatEffectType } from './CombatEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { Character } from '../Character/Character';
import { IEffectValues } from './EffectValues';

interface CombatEffectConstructor {
    new(type: CombatEffectType,
        inabilityFlag: CombatActionFlags,
        inflictedBy: Character,
        values?: IEffectValues
    ): CombatEffect;
}
export const CombatEffectConstructorLib = new Dictionary<CombatEffectType, CombatEffectConstructor>();

export const AbilityFlagsLib = new Dictionary<CombatEffectType, CombatActionFlags>();
