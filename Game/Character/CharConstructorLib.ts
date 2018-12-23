import { Character } from './Character';
import { CharacterType } from './CharacterType';
import { Dictionary } from 'Engine/Utilities/Dictionary';
import { Player } from 'Game/Character/Player/Player';

export const CharConstructorLib = new Dictionary<CharacterType, new () => Character>();
CharConstructorLib.set(CharacterType.Player, Player);
