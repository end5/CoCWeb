import { Character } from '../../Character/Character';
import { CombatManager } from '../../Combat/CombatManager';
import { CombatEffect } from '../CombatEffect';

export class Disarmed extends CombatEffect {
    public onAdd(character: Character) {
        if (character.inventory.weapon !== character.inventory.unarmedWeaponSlot.item) {
            const droppedWeapon = character.inventory.equippedWeaponSlot.unequip();
            if (droppedWeapon)
                CombatManager.itemsOnFloor.add(droppedWeapon);
        }
    }
}
