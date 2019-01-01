import { ISerializable } from 'Engine/Utilities/ISerializable';
import { Character } from 'Engine/Character/Character';
import { EquipableItem } from './EquipableItem';
import { ItemType } from './ItemType';
import { ItemDesc } from './ItemDesc';
import { IItem } from './Item';

export interface IPiercing extends IItem {
    short: string;
    long: string;
}

export class Piercing extends EquipableItem implements ISerializable<IPiercing> {
    public shortDesc: string;
    public longDesc: string;

    public constructor(piercingType: string, shortDesc: string = "", longDesc: string = "") {
        super(piercingType, ItemType.Misc, new ItemDesc('piercing'));
        this.shortDesc = shortDesc;
        this.longDesc = longDesc;
    }

    public onEquip(character: Character): void { }

    public onUnequip(character: Character): void { }

    public equipText(): void { }

    public unequipText(): void { }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character) { }

    public useText(character: Character) { }

    public serialize(): IPiercing {
        return Object.assign({
            short: this.desc.shortName,
            long: this.desc.longName,
        }, super.serialize());
    }

    public deserialize(saveObject: IPiercing) {
        this.shortDesc = saveObject.short;
        this.longDesc = saveObject.long;
        super.deserialize(saveObject);
    }
}
