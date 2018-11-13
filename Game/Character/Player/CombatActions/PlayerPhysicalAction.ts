import { IPhysicalAction } from '../../../Combat/Actions/IPhysicalAction';
import { PerkType } from '../../../Effects/PerkType';
import { Character } from '../../Character';
import { CombatAction } from '../../../Combat/Actions/CombatAction';
import { CombatActionFlags } from '../../../Effects/CombatActionFlag';

export abstract class PlayerPhysicalAction extends CombatAction implements IPhysicalAction {
    public flag: CombatActionFlags = CombatActionFlags.PhysSpec;
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];

    public abstract readonly baseCost: number;

    public physicalCost(character: Character): number {
        let mod: number = this.baseCost;
        let costPercent: number = 100;
        if (character.perks.has(PerkType.IronMan))
            costPercent -= 50;
        mod *= costPercent / 100;
        return mod;
    }
}
