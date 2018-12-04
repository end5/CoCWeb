import { Character } from 'Game/Character/Character';

export interface ISpellAction {
    readonly baseCost: number;
    spellCost(character: Character): number;
}
