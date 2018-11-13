import { CockSockName } from './CockSockName';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { EquipableItem } from '../EquipableItem';
import { ItemType } from '../ItemType';
import { ItemDesc } from '../ItemDesc';
import { EquipSlot } from '../../Inventory/EquipSlot';

export class CockSock extends EquipableItem {
    public constructor(name: CockSockName) {
        super(name, ItemType.Misc, new ItemDesc('cock sock'));
    }

    public equipText(): void { }

    public unequipText(): void { }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character) { }

    public useText(character: Character) { }

    public onEquip(character: Character) {
        if (this.name === CockSockName.Viridian) {
            if (!character.perks.has(PerkType.LustyRegeneration)) {
                character.perks.add(PerkType.LustyRegeneration);
            }
        }
        else if (this.name === CockSockName.Cockring) {
            if (!character.perks.has(PerkType.PentUp)) {
                character.perks.add(PerkType.PentUp);
            }
            else {
                const numRings = character.inventory.cockSocks.reduce((prev: number, cur: EquipSlot<CockSock>) => {
                    if (cur && cur.item && cur.item.name === CockSockName.Cockring)
                        prev++;
                    return prev;
                }, -1);
                character.perks.get(PerkType.PentUp)!.values.lust.min.flat = 5 + (numRings * 5);
            }
        }
    }

    public onUnequip(character: Character) {
        if (this.name === CockSockName.Viridian) {
            if (character.perks.has(PerkType.LustyRegeneration)) {
                character.perks.remove(PerkType.LustyRegeneration);
            }
        }
        else if (this.name === CockSockName.Cockring) {
            if (character.perks.has(PerkType.PentUp)) {
                const numRings = character.inventory.cockSocks.reduce((prev: number, cur: EquipSlot<CockSock>) => {
                    if (cur && cur.item && cur.item.name === CockSockName.Cockring)
                        prev++;
                    return prev;
                }, -1);
                if (numRings === 0) {
                    character.perks.remove(PerkType.PentUp);
                }
                else
                    character.perks.get(PerkType.PentUp)!.values.lust.min.flat = 5 + (numRings * 5);
            }
        }
    }
}
