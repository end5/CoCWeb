import { Character } from '../Character/Character';

export enum DefeatType {
    Special,
    HP,
    Lust,
    Escape
}

export class DefeatEvent {
    public readonly victor: Character;
    public readonly loser: Character;
    public readonly how: DefeatType;
    public constructor(victor: Character, loser: Character, how: DefeatType) {
        this.victor = victor;
        this.loser = loser;
        this.how = how;
    }
}
