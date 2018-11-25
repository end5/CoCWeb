import { CombatEffect } from './CombatEffect';
import { CombatEffectType } from './CombatEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { Character } from '../Character/Character';
import { ICombatEffectValues } from './CombatEffectValues';

interface CombatEffectConstructor {
    new(type: CombatEffectType,
        inflictedBy: Character,
        values?: ICombatEffectValues
    ): CombatEffect;
}
export const CombatEffectConstructorLib = new Dictionary<CombatEffectType, CombatEffectConstructor>();
