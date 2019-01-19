import { Dictionary } from 'Engine/Utilities/Dictionary';
import { Character } from './Character/Character';

class CharacterDict extends Dictionary<string, Character> {
    public player: Character | undefined;

    public add(char: Character) {
        this.dictionary[char.uuid] = char;
    }
}

export const CharDict = new CharacterDict();
