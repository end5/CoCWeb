import { Character } from 'Game/Character/Character';
import { CombatAction } from 'Game/Combat/Actions/CombatAction';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';
import { displayInventory } from 'Game/Menus/InGame/PlayerInventoryMenu';
import { UseItemAction } from 'Game/Combat/Actions/UseItemAction';

export class ItemInventoryAction extends CombatAction {
    public name = "Items";
    public type = CombatActionType.Items;
    private char: Character;

    public constructor(char: Character) {
        super();
        this.char = char;
    }

    public get subActions(): CombatAction[] {
        return this.char.inventory.items.filter((itemStack) => !!itemStack.item).map((itemStack) => new UseItemAction(itemStack)).toArray();
    }

    public set subActions(values: CombatAction[]) { }

    public use(char: Character, enemy: Character): void {
        displayInventory(char);
        super.use(char, enemy);
    }
}
