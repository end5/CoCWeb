import { displayCharInventory } from './InventoryDisplay';
import { SpriteName } from '../../../Page/SpriteName';
import { MainScreen } from '../../../Page/MainScreen';
import { Character } from '../../Character/Character';
import { CombatManager } from '../../Combat/CombatManager';
import { NextScreenChoices, ScreenChoice } from '../../ScreenDisplay';
import { CView } from '../../../Page/ContentView';
import { playerMenu } from './PlayerMenu';
import { combatMenu } from './PlayerCombatMenu';

export function inventoryMenu(player: Character): NextScreenChoices {
    CView.sprite(SpriteName.None);

    MainScreen.topButtons.hide();
    CView.clear();
    CView.text("<b><u>Equipment:</u></b>\n");
    CView.text("<b>Weapon</b>: " + player.inventory.weapon.displayName + " (Attack - " + player.inventory.weapon.attack + ")\n");
    CView.text("<b>Armor : </b>" + player.inventory.armor.displayName + " (Defense - " + player.inventory.armor.defense + ")\n");
    if (player.inventory.keyItems.keys().length > 0)
        CView.text("<b><u>\nKey Items:</u></b>\n");
    for (const keyItem of player.inventory.keyItems.keys())
        CView.text(keyItem + "\n");

    const choices: ScreenChoice[] = [];

    if (player.inventory.equippedWeaponSlot.isEquipped()) {
        choices[0] = ["Unequip", () => player.inventory.items.add(player, player.inventory.equippedWeaponSlot.unequip()!, inventoryMenu)];
    }

    CView.text("\nWhich item will you use?");
    choices[4] = ["Back", CombatManager.inCombat ? combatMenu : playerMenu];
    // Removes empty buttons for more inventory buttons
    while (!choices[0]) {
        choices.shift();
    }
    return displayCharInventory(player, choices);
}
