import { Character } from './Character';
import { Dictionary } from 'Engine/Utilities/Dictionary';

export const CharConstructorLib = new Dictionary<string, new () => Character>();
