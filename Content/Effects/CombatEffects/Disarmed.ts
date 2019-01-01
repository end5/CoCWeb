import { Character } from 'Engine/Character/Character';
import { ItemsOnFloor } from 'Content/Scenes/ItemsOnFloor';
import { Effect } from 'Engine/Effects/Effect';

export class Disarmed extends Effect {
    public combatTurnEnd(character: Character) {
        if (character.inventory.weapon !== character.inventory.unarmedWeaponSlot.item) {
            const droppedWeapon = character.inventory.equippedWeaponSlot.unequip();
            if (droppedWeapon)
                ItemsOnFloor.add(droppedWeapon);
        }
    }
}
