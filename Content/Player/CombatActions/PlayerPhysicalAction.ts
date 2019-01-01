import { IPhysicalAction } from 'Content/Combat/Actions/IPhysicalAction';
import { EffectType } from 'Content/Effects/EffectType';
import { Character } from 'Engine/Character/Character';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export abstract class PlayerPhysicalAction extends CombatAction implements IPhysicalAction {
    public type = CombatActionType.PhysSpec;

    public abstract readonly baseCost: number;

    public physicalCost(character: Character): number {
        let mod: number = this.baseCost;
        let costPercent: number = 100;
        if (character.effects.has(EffectType.IronMan))
            costPercent -= 50;
        mod *= costPercent / 100;
        return mod;
    }
}
