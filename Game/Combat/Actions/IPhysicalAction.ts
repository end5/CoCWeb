import { Character } from 'Game/Character/Character';

export interface IPhysicalAction {
    readonly baseCost: number;
    physicalCost(character: Character): number;
}
