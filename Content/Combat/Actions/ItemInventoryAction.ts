import { Character } from 'Engine/Character/Character';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';
import { displayInventory } from 'Content/Menus/InGame/PlayerInventoryMenu';
import { UseItemAction } from 'Content/Combat/Actions/UseItemAction';

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
