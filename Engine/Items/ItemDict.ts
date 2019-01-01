import { Item } from 'Engine/Items/Item';
import { IDictionary } from 'Engine/Utilities/Dictionary';

class ItemDictionary {
    private nameSet: IDictionary<Item> = {};
    private typeSet: IDictionary<Item[]> = {};

    public add(item: Item) {
        if (this.nameSet[item.name])
            throw new Error("Item " + item.name + " already exists");
        this.nameSet[item.name] = item;

        if (!this.typeSet[item.type])
            this.typeSet[item.type] = [];
        this.typeSet[item.type].push(item);
    }

    public getByName<U extends Item>(name: string): U {
        if (!this.nameSet[name])
            throw new Error("Item " + name + " does not exists");
        return this.nameSet[name] as U;
    }

    public getItemsByType<U extends Item>(type: string): U[] {
        if (!this.typeSet[type])
            throw new Error("Item type " + type + " does not exists");
        return this.typeSet[type].slice() as U[];
    }
}

export const ItemDict = new ItemDictionary();
