import { Dictionary } from 'Engine/Utilities/Dictionary';
import { IEffectValues } from './EffectValues';
import { Effect } from './Effect';

interface EffectConstructor {
    new(type: string, values?: IEffectValues): Effect;
}
export const EffectConstructorLib = new Dictionary<string, EffectConstructor>();
