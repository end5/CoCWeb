import { Character } from '../Character/Character';

export class CharacterHolder {
    protected char: Character;
    public constructor(character: Character) {
        this.char = character;
    }
}
