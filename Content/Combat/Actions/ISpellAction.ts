import { Character } from 'Engine/Character/Character';

export interface ISpellAction {
    readonly baseCost: number;
    spellCost(character: Character): number;
}
