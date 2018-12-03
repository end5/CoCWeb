import { ItemDesc } from './ItemDesc';
import { ItemType } from './ItemType';
import { ISerializable } from 'Engine/Utilities/ISerializable';
import { Character } from '../Character/Character';

export interface IItem {
    name: string;
    type: ItemType;
}

export abstract class Item implements ISerializable<IItem> {
    public static readonly DefaultValue: number = 6;
    public readonly name: string;
    public readonly type: ItemType;
    public readonly value: number;
    public readonly desc: ItemDesc;

    constructor(name: string, type: ItemType, desc: ItemDesc, value: number = Item.DefaultValue) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.desc = desc;
    }

    public abstract canUse(character: Character): boolean;

    public abstract use(character: Character): void;

    public abstract useText(character: Character): void;

    public describe(): string {
        return this.desc.description + " (Cost: " + this.value + ")";
    }

    public serialize(): IItem {
        return {
            name: this.name,
            type: this.type
        };
    }

    public deserialize(saveObject: IItem) { }
}
