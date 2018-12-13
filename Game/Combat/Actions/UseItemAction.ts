import { Character } from 'Game/Character/Character';
import { CombatAction, CanUseResult } from 'Game/Combat/Actions/CombatAction';
import { Item } from 'Game/Items/Item';
import { ItemStack } from 'Game/Inventory/ItemStack';

export class UseItemAction extends CombatAction {
    public name: string = "";
    private itemStack: ItemStack<Item>;

    public constructor(itemStack: ItemStack<Item>) {
        super();
        this.itemStack = itemStack;
    }

    public canUse(character: Character, target: Character): CanUseResult {
        return { canUse: !!this.itemStack.item && this.itemStack.item.canUse(character, target) };
    }

    protected useAction(char: Character, enemy: Character) {
        if (this.itemStack.item) {
            this.itemStack.item.use(char, enemy);
            this.itemStack.item.useText(char, enemy);
            this.itemStack.quantity--;
        }
    }
}
