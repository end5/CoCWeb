import { ItemType } from "./ItemType";
import { Dictionary } from "../../Engine/Utilities/Dictionary";
import { Armor } from "./Armors/Armor";
import { ArmorLib } from "./Armors/ArmorLib";
import { WeaponLib } from "./Weapons/WeaponLib";
import { Weapon } from "./Weapons/Weapon";
import { Consumable } from "./Consumables/Consumable";
import { EquipableItem } from "./EquipableItem";
import { ConsumableLib } from "./Consumables/ConsumableLib";
import { MaterialLib } from "./Materials/MaterialLib";
import { Material } from "./Materials/Material";
import { MiscLib, MiscName } from "./Misc/MiscLib";
import { ArmorName } from "./Armors/ArmorName";
import { WeaponName } from "./Weapons/WeaponName";
import { ConsumableName } from "./Consumables/ConsumableName";
import { MaterialName } from "./Materials/MaterialName";

type ItemName = ArmorName | WeaponName | ConsumableName | MaterialName | MiscName;
type Item = Armor | Weapon | Consumable | Material | EquipableItem;
type ItemDictionary = Dictionary<ItemName, Item>;

export function getLibFromType(type: ItemType): ItemDictionary | undefined {
    switch (type) {
        case ItemType.Armor: {
            return ArmorLib;
        }
        case ItemType.Weapon: {
            return WeaponLib;
        }
        case ItemType.Consumable: {
            return ConsumableLib;
        }
        case ItemType.Material: {
            return MaterialLib;
        }
        case ItemType.Misc: {
            return MiscLib;
        }
    }
    console.error("Item " + name + " not found.");
    return;
}

export function getTypeFromName(name: string): ItemType | undefined {
    if (ArmorLib.has(name as ArmorName)) return ItemType.Armor;
    if (WeaponLib.has(name as WeaponName)) return ItemType.Weapon;
    if (ConsumableLib.has(name as ConsumableName)) return ItemType.Consumable;
    if (MaterialLib.has(name as MaterialName)) return ItemType.Material;
    if (MiscLib.has(name as MiscName)) return ItemType.Misc;
    return;
}

export function getLibFromName(name: string): ItemDictionary | undefined {
    if (ArmorLib.has(name as ArmorName)) return ArmorLib;
    if (WeaponLib.has(name as WeaponName)) return WeaponLib;
    if (ConsumableLib.has(name as ConsumableName)) return ConsumableLib;
    if (MaterialLib.has(name as MaterialName)) return MaterialLib;
    if (MiscLib.has(name as MiscName)) return MiscLib;
    return;
}

export function getItemFromName(name: string): Item | undefined {
    if (ArmorLib.has(name as ArmorName)) return ArmorLib.get(name as ArmorName);
    if (WeaponLib.has(name as WeaponName)) return WeaponLib.get(name as WeaponName);
    if (ConsumableLib.has(name as ConsumableName)) return ConsumableLib.get(name as ConsumableName);
    if (MaterialLib.has(name as MaterialName)) return MaterialLib.get(name as MaterialName);
    if (MiscLib.has(name as MiscName)) return MiscLib.get(name as MiscName);
    return;
}
