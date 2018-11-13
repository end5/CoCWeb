import { Character } from '../../../Character';
import { CombatAction } from '../../../../Combat/Actions/CombatAction';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { inventoryMenu } from '../../../../Menus/InGame/PlayerInventoryMenu';

export class Items extends CombatAction {
    public flag: CombatActionFlags = CombatActionFlags.Items;
    public name: string = "Items";
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];

    public isPossible(character: Character): boolean {
        return true;
    }

    public canUse(character: Character, target: Character): boolean {
        return true;
    }

    public useAction(character: Character, target: Character): void {
        inventoryMenu(character);
    }
}
