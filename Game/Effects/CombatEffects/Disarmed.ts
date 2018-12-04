import { Character } from 'Game/Character/Character';
import { ItemsOnFloor } from 'Game/Scenes/ItemsOnFloor';
import { Effect } from '../Effect';

export class Disarmed extends Effect {
    public combatTurnEnd(character: Character) {
        if (character.inventory.weapon !== character.inventory.unarmedWeaponSlot.item) {
            const droppedWeapon = character.inventory.equippedWeaponSlot.unequip();
            if (droppedWeapon)
                ItemsOnFloor.add(droppedWeapon);
        }
    }
}
