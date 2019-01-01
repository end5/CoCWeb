import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { EquipSlot } from 'Engine/Inventory/EquipSlot';
import { CockSockName } from 'Content/Items/CockSockName';
import { CockSock } from 'Engine/Items/CockSock';

export class CockRing extends CockSock {
    public constructor() {
        super(CockSockName.Cockring);
    }

    public onEquip(character: Character) {
        if (!character.effects.has(EffectType.PentUp)) {
            character.effects.create(EffectType.PentUp);
        }
        else {
            const numRings = character.inventory.cockSocks.reduce((prev: number, cur: EquipSlot<CockSock>) => {
                if (cur && cur.item && cur.item.name === "Cockring")
                    prev++;
                return prev;
            }, -1);
            character.effects.getByName(EffectType.PentUp)!.values.lust.min.flat = 5 + (numRings * 5);
        }
    }

    public onUnequip(character: Character) {
        if (character.effects.has(EffectType.PentUp)) {
            const numRings = character.inventory.cockSocks.reduce((prev: number, cur: EquipSlot<CockSock>) => {
                if (cur && cur.item && cur.item.name === "Cockring")
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
