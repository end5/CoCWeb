import { Character } from '../Character/Character';
import { EquipSlot } from '../Inventory/EquipSlot';
import { Item } from '../Items/Item';
import { CockSockName } from '../Items/Misc/CockSockName';
import { NextScreenChoices } from '../ScreenDisplay';
import { playerMenu } from '../Menus/InGame/PlayerMenu';
import { getItemFromName } from '../Items/ItemLookup';
import { CView } from '../../Page/ContentView';

export function awardPlayer(character: Character, enemy: Character): NextScreenChoices {
    const gildedCockSock = character.inventory.cockSocks.find(EquipSlot.FilterName(CockSockName.Gilded));
    if (gildedCockSock && gildedCockSock.observedObject) {
        enemy.inventory.gems += enemy.inventory.gems * 0.15 + 5 * gildedCockSock.observedObject.length;
    }
    const XP = enemy.stats.XP;
    let gems = 0;
    if (typeof enemy.combat.rewards.gems === 'function')
        gems = enemy.combat.rewards.gems();
    if (typeof enemy.combat.rewards.gems === 'number')
        gems = enemy.combat.rewards.gems;
    if (enemy.combat.endScenes.rewardGems)
        enemy.combat.endScenes.rewardGems(character, gems);
    else {
        if (gems === 1) CView.text("\n\nYou snag a single gem and " + XP + " XP as you walk away from your victory.");
        else if (gems > 1) CView.text("\n\nYou grab " + gems + " gems and " + XP + " XP from your victory.");
        else if (gems === 0) CView.text("\n\nYou gain " + XP + " XP from the battle.");
    }
    character.inventory.gems += gems;
    character.stats.XP += XP;

    const item = dropItem(character, enemy);
    if (item) {
        return character.inventory.items.createAdd(character, item.name, playerMenu);
    }
    return { next: playerMenu };
}

function dropItem(character: Character, enemy: Character): Item | undefined {
    if (enemy.combat.rewards.drop) {
        const item = enemy.combat.rewards.drop.roll();
        if (item) {
            if (enemy.combat.endScenes.rewardItem)
                enemy.combat.endScenes.rewardItem(character, item); // Each monster can now override the default award text
            return getItemFromName(item);
        }
    }
    return;
}
