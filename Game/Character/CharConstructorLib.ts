import { Character } from './Character';
import { CharacterType } from './CharacterType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';

export const CharConstructorLib = new Dictionary<CharacterType, new () => Character>();
