import { CockSockName } from './CockSockName';
import { Character } from 'Game/Character/Character';
import { EquipableItem } from '../EquipableItem';
import { ItemType } from '../ItemType';
import { ItemDesc } from '../ItemDesc';
import { EffectType } from 'Game/Effects/EffectType';
import { EquipSlot } from 'Game/Inventory/EquipSlot';

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
            if (!character.effects.has(EffectType.LustyRegeneration)) {
                character.effects.create(EffectType.LustyRegeneration);
            }
        }
        else if (this.name === CockSockName.Cockring) {
            if (!character.effects.has(EffectType.PentUp)) {
                character.effects.create(EffectType.PentUp);
            }
            else {
                const numRings = character.inventory.cockSocks.reduce((prev: number, cur: EquipSlot<CockSock>) => {
                    if (cur && cur.item && cur.item.name === CockSockName.Cockring)
                        prev++;
                    return prev;
                }, -1);
                character.effects.getByName(EffectType.PentUp)!.values.lust.min.flat = 5 + (numRings * 5);
            }
        }
    }

    public onUnequip(character: Character) {
        if (this.name === CockSockName.Viridian) {
            if (character.effects.has(EffectType.LustyRegeneration)) {
                character.effects.removeByName(EffectType.LustyRegeneration);
            }
        }
        else if (this.name === CockSockName.Cockring) {
            if (character.effects.has(EffectType.PentUp)) {
                const numRings = character.inventory.cockSocks.reduce((prev: number, cur: EquipSlot<CockSock>) => {
                    if (cur && cur.item && cur.item.name === CockSockName.Cockring)
                        prev++;
                    return prev;
                }, -1);
                if (numRings === 0) {
                    character.effects.removeByName(EffectType.PentUp);
                }
                else
                    character.effects.getByName(EffectType.PentUp)!.values.lust.min.flat = 5 + (numRings * 5);
            }
        }
    }
}
