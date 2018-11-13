import { Character } from './Character';
import { CharacterType } from './CharacterType';
import { Player } from './Player/Player';
import { Dictionary } from '../../Engine/Utilities/Dictionary';

export const CharConstructorLib = new Dictionary<CharacterType, new () => Character>();
CharConstructorLib.set(CharacterType.Player, Player);
