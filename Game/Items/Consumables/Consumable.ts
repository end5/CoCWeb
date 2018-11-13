import { ConsumableName } from './ConsumableName';
import { Character } from '../../Character/Character';
import { Item } from '../Item';
import { ItemDesc } from '../ItemDesc';
import { ItemType } from '../ItemType';

export class Consumable extends Item {
    constructor(key: ConsumableName, itemDesc: ItemDesc, value?: number) {
        super(key, ItemType.Consumable, itemDesc, value);
    }

    public canUse(_character: Character): boolean {
        return true;
    }

    public use(_character: Character) {
    }

    public useText(_character: Character) {

    }
}
