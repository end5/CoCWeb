import { IPhysicalAction } from 'Game/Combat/Actions/IPhysicalAction';
import { EffectType } from 'Game/Effects/EffectType';
import { Character } from 'Game/Character/Character';
import { CombatAction } from 'Game/Combat/Actions/CombatAction';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';

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
