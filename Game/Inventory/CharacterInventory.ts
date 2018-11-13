import { Inventory, IInventory } from './Inventory';
import { KeyItemDict } from './KeyItemDict';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { Character } from '../Character/Character';
import { Item } from '../Items/Item';
import { KeyItem, IKeyItem } from '../Items/KeyItem';
import { Weapon } from '../Items/Weapons/Weapon';
import { Armor } from '../Items/Armors/Armor';
import { StatWithEffects, IStatWithEffects } from '../Body/Stat/StatWithEffects';
import { IDictionary } from '../../Engine/Utilities/Dictionary';
import { IEquipSlot, EquipSlot } from './EquipSlot';
import { IPiercingInventory, PiercingInventory } from './PiercingInventory';
import { EquipSlotList } from './EquipSlotList';
import { CockSock } from '../Items/Misc/CockSock';
import { ObservingEquipSlot } from './ObservingEquipSlot';
import { Cock } from '../Body/Cock';
import { ListMonitor } from '../Utilities/ListMonitor';

export interface ICharInv {
    items: IInventory;
    keyItems: IDictionary<IKeyItem>;
    gems: IStatWithEffects;
    weapon?: IEquipSlot;
    armor?: IEquipSlot;
    piercings: IPiercingInventory;
    cockSocks: IEquipSlot[];
    armorDescMod: string;
}

type CockSockSlot = ObservingEquipSlot<CockSock, Cock>;

export class CharacterInventory implements ISerializable<ICharInv> {
    public readonly items: Inventory<Item>;
    public gemsStat: StatWithEffects;
    public readonly keyItems: KeyItemDict;
    public readonly unarmedWeaponSlot: EquipSlot<Weapon>;
    public readonly equippedWeaponSlot: EquipSlot<Weapon>;
    public readonly noArmorSlot: EquipSlot<Armor>;
    public readonly equippedArmorSlot: EquipSlot<Armor>;
    public readonly piercings: PiercingInventory;
    public readonly cockSocks = new EquipSlotList<CockSock, CockSockSlot>();
    private cocksMonitor: ListMonitor<Cock, CockSockSlot, EquipSlotList<CockSock, CockSockSlot>>;
    public armorDescMod: string;
    private character: Character;

    public constructor(character: Character, unarmedWeapon: Weapon, noArmor: Armor) {
        this.items = new Inventory<Item>();
        this.gemsStat = new StatWithEffects();
        this.keyItems = new KeyItemDict();
        this.unarmedWeaponSlot = new EquipSlot(character);
        this.unarmedWeaponSlot.equip(unarmedWeapon);
        this.equippedWeaponSlot = new EquipSlot(character);
        this.noArmorSlot = new EquipSlot(character);
        this.noArmorSlot.equip(noArmor);
        this.equippedArmorSlot = new EquipSlot(character);
        this.piercings = new PiercingInventory(character);
        this.cocksMonitor = new ListMonitor<Cock, CockSockSlot, EquipSlotList<CockSock, CockSockSlot>>(this.cockSocks, ObservingEquipSlot, character);
        character.body.cocks.observers.add(this.cocksMonitor);
        this.armorDescMod = "";
        this.character = character;
    }

    public get gems() { return this.gemsStat.value; }
    public set gems(num: number) { this.gemsStat.value = num; }

    public get weapon(): Weapon {
        return this.equippedWeaponSlot.item ? this.equippedWeaponSlot.item : this.unarmedWeaponSlot.item!;
    }

    public get armor(): Armor {
        return this.equippedArmorSlot.item ? this.equippedArmorSlot.item : this.noArmorSlot.item!;
    }

    public serialize(): ICharInv {
        const saveObj: ICharInv = {
            gems: this.gemsStat.serialize(),
            items: this.items.serialize(),
            keyItems: this.keyItems.serialize(),
            piercings: this.piercings.serialize(),
            cockSocks: this.cockSocks.serialize(),
            armorDescMod: this.armorDescMod
        };
        const weapon = this.equippedWeaponSlot.serialize();
        const armor = this.equippedWeaponSlot.serialize();
        if (weapon) saveObj.weapon = weapon;
        if (armor) saveObj.armor = armor;
        return saveObj;
    }

    public deserialize(saveObject: ICharInv) {
        this.gemsStat.deserialize(saveObject.gems);
        this.items.deserialize(saveObject.items);
        this.keyItems.deserialize(saveObject.keyItems, KeyItem);
        if (saveObject.weapon)
            this.equippedWeaponSlot.deserialize(saveObject.weapon);
        if (saveObject.armor)
            this.equippedArmorSlot.deserialize(saveObject.armor);
        this.piercings.deserialize(saveObject.piercings);
        this.cockSocks.deserialize(saveObject.cockSocks, ObservingEquipSlot, this.character);
        // if (saveObject.cockSocks && saveObject.cockSocks.length) {
        //     for (let index = 0; index < saveObject.cockSocks.length; index++) {
        //         if (saveObject.cockSocks[index] && saveObject.cockSocks[index].item && this.cockSocks.get(index)) {
        //             this.cockSocks.get(index)!.equip(new CockSock(saveObject.cockSocks[index].item.name as CockSockName));
        //         }
        //     }
        // }
        this.armorDescMod = saveObject.armorDescMod;
    }
}
