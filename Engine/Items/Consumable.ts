import { Character } from 'Engine/Character/Character';
import { Item } from './Item';
import { ItemDesc } from './ItemDesc';
import { ItemType } from './ItemType';

export class Consumable extends Item {
    constructor(name: string, itemDesc: ItemDesc, value?: number) {
        super(name, ItemType.Consumable, itemDesc, value);
    }

    public canUse(_character: Character): boolean {
        return true;
    }

    public use(_character: Character): void { }

    public useText(_character: Character): void { }
}
