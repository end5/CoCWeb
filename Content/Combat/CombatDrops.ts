import { Character } from 'Engine/Character/Character';
import { EquipSlot } from 'Engine/Inventory/EquipSlot';
import { Item } from 'Engine/Items/Item';
import { CockSockName } from 'Content/Items/CockSockName';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { playerMenu } from 'Content/Menus/InGame/PlayerMenu';
import { ConsumableName } from 'Content/Items/ConsumableName';
import { CharacterType } from 'Content/Character/CharacterType';
import { WeaponName } from 'Content/Items/WeaponName';
import { randInt } from 'Engine/Utilities/SMath';
import { BeeGirlFlags } from 'Content/Scenes/Areas/Forest/BeeGirl';
import { JojoFlags } from 'Content/Scenes/NPCs/Jojo';
import { ArmorName } from 'Content/Items/ArmorName';
import { CeraphFlags } from 'Content/Scenes/NPCs/Ceraph';
import { ceraphIsFollower } from 'Content/Scenes/NPCs/CeraphFollowerScene';
import { isEaster } from 'Content/Utilities/Dates';
import { randAnySizeEgg } from 'Content/Items/Consumables/Eggs';
import { EffectType } from 'Content/Effects/EffectType';
import { ItemDict } from 'Engine/Items/ItemDict';

export function awardPlayer(character: Character, enemy: Character): NextScreenChoices {
    const gildedCockSockIndex = character.inventory.cockSocks.findIndex(EquipSlot.FilterName(CockSockName.Gilded));
    if (gildedCockSockIndex !== -1) {
        enemy.inventory.gems += enemy.inventory.gems * 0.15 + 5 * character.body.cocks.get(gildedCockSockIndex)!.length;
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

//
// $> Redo all of this
//

// function dropItem(character: Character, enemy: Character): Item | undefined {
//     if (enemy.combat.rewards.drop) {
//         const item = enemy.combat.rewards.drop.roll();
//         if (item) {
//             if (enemy.combat.endScenes.rewardItem)
//                 enemy.combat.endScenes.rewardItem(character, item); // Each monster can now override the default award text
//             return getItemFromName(item);
//         }
//     }
//     return;
// }

let bonusItemAfterCombat: string | undefined;

export function setBonusItemAfterCombat(name: string) {
    bonusItemAfterCombat = name;
}

function dropItem(char: Character, enemy: Character): Item | void {
    // if (monster.findStatusAffect(StatusEffectType.NoLoot) >= 0) {
    //     return;
    // }
    let plotFight = false;
    let itemName: string | undefined;
    if (enemy.combat.rewards.drop) {
        itemName = enemy.combat.rewards.drop.roll();
    }
    if (enemy.desc.name === "tit-fucked Minotaur") {
        itemName = ConsumableName.MinotaurCum;
    }
    if (enemy.charType === CharacterType.Minotaur) {
        if (enemy.inventory.weapon.name === WeaponName.LargeAxe) {
            if (randInt(2) === 0) {
                // 50% breakage!
                if (randInt(2) === 0) {
                    itemName = WeaponName.LargeAxe;
                    if (char.body.tallness < 78) {
                        CView.text("\nYou find a large axe on the minotaur, but it is too big for a person of your stature to comfortably carry.  ");
                        if (randInt(2) === 0) itemName = undefined;
                        else itemName = ConsumableName.SuccubisDelight;
                    }
                    // Not too tall, dont rob of axe!
                    else plotFight = true;
                }
                else CView.text("\nThe minotaur's axe appears to have been broken during the fight, rendering it useless.  ");
            }
            else itemName = ConsumableName.MinotaurBlood;
        }
    }
    if (enemy.charType === CharacterType.BeeGirl) {
        // force honey drop if milked
        if (BeeGirlFlags.FORCE_BEE_TO_PRODUCE_HONEY === 1) {
            if (randInt(2) === 0) itemName = ConsumableName.BeeHoney;
            else itemName = ConsumableName.BeeHoneyPure;
            BeeGirlFlags.FORCE_BEE_TO_PRODUCE_HONEY = 0;
        }
    }
    if (enemy.charType === CharacterType.Jojo && JojoFlags.monk > 4) {
        if (randInt(2) === 0) itemName = ConsumableName.IncubusDraft;
        else {
            if (randInt(2) === 0) itemName = ConsumableName.BlackSpellbook;
            else itemName = ConsumableName.SuccubiMilk;
        }
    }
    if (enemy.charType === CharacterType.Harpy || enemy.charType === CharacterType.Sophie) {
        if (randInt(10) === 0) itemName = ArmorName.WizardRobes;
        else if (randInt(3) === 0 && char.effects.has(EffectType.LuststickAdapted)) itemName = ConsumableName.LustStick;
        else itemName = ConsumableName.GoldenSeed;
    }
    // Chance of armor if at level 1 pierce fetish
    if (
        !plotFight &&
        !(enemy.charType === CharacterType.Ember) &&
        !(enemy.charType === CharacterType.Kiha) &&
        !(enemy.charType === CharacterType.Hel) &&
        !(enemy.charType === CharacterType.Isabella) &&
        CeraphFlags.PC_FETISH === 1 &&
        randInt(10) === 0 &&
        !char.inventory.items.has(ArmorName.SeductiveArmor) &&
        !ceraphIsFollower()
    ) {
        itemName = ArmorName.SeductiveArmor;
    }

    if (!plotFight && randInt(200) === 0 && char.stats.level >= 7) itemName = ConsumableName.BroBrew;
    if (!plotFight && randInt(200) === 0 && char.stats.level >= 7) itemName = ConsumableName.BimboLiqueur;
    // Chance of eggs if Easter!
    if (!plotFight && randInt(6) === 0 && isEaster()) {
        itemName = randAnySizeEgg();
    }
    // Bonus loot overrides others
    if (bonusItemAfterCombat) {
        itemName = bonusItemAfterCombat;
    }
    if (itemName) {
        if (enemy.combat.endScenes.rewardItem)
            enemy.combat.endScenes.rewardItem(char, itemName); // Each monster can now override the default award text
        return ItemDict.getByName(itemName);
    }
}
