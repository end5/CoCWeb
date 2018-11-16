import { Character } from '../Character/Character';
import { EquipSlot } from '../Inventory/EquipSlot';
import { Item } from '../Items/Item';
import { CockSockName } from '../Items/Misc/CockSockName';
import { NextScreenChoices } from '../ScreenDisplay';
import { playerMenu } from '../Menus/InGame/PlayerMenu';
import { getItemFromName } from '../Items/ItemLookup';
import { CView } from '../../Page/ContentView';
import { CharacterType } from '../Character/CharacterType';
import { ConsumableName } from '../Items/Consumables/ConsumableName';
import { WeaponName } from '../Items/Weapons/WeaponName';
import { randInt } from '../../Engine/Utilities/SMath';
import { BeeGirlFlags } from '../Scenes/Areas/Forest/BeeGirl';
import { ArmorName } from '../Items/Armors/ArmorName';
import { PerkType } from '../Effects/PerkType';
import { CeraphFlags } from '../Scenes/NPCs/Ceraph';
import { ceraphIsFollower } from '../Scenes/NPCs/CeraphFollowerScene';
import { isEaster } from '../Utilities/Dates';
import { randAnySizeEgg } from '../Items/Consumables/Eggs';
import { JojoFlags } from '../Scenes/NPCs/Jojo';

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
    let itype: string | undefined;
    if (enemy.combat.rewards.drop) {
        itype = enemy.combat.rewards.drop.roll();
    }
    if (enemy.desc.name === "tit-fucked Minotaur") {
        itype = ConsumableName.MinotaurCum;
    }
    if (enemy.charType === CharacterType.Minotaur) {
        if (enemy.inventory.weapon.name === WeaponName.LargeAxe) {
            if (randInt(2) === 0) {
                // 50% breakage!
                if (randInt(2) === 0) {
                    itype = WeaponName.LargeAxe;
                    if (char.body.tallness < 78) {
                        CView.text("\nYou find a large axe on the minotaur, but it is too big for a person of your stature to comfortably carry.  ");
                        if (randInt(2) === 0) itype = undefined;
                        else itype = ConsumableName.SuccubisDelight;
                    }
                    // Not too tall, dont rob of axe!
                    else plotFight = true;
                }
                else CView.text("\nThe minotaur's axe appears to have been broken during the fight, rendering it useless.  ");
            }
            else itype = ConsumableName.MinotaurBlood;
        }
    }
    if (enemy.charType === CharacterType.BeeGirl) {
        // force honey drop if milked
        if (BeeGirlFlags.FORCE_BEE_TO_PRODUCE_HONEY === 1) {
            if (randInt(2) === 0) itype = ConsumableName.BeeHoney;
            else itype = ConsumableName.BeeHoneyPure;
            BeeGirlFlags.FORCE_BEE_TO_PRODUCE_HONEY = 0;
        }
    }
    if (enemy.charType === CharacterType.Jojo && JojoFlags.monk > 4) {
        if (randInt(2) === 0) itype = ConsumableName.IncubusDraft;
        else {
            if (randInt(2) === 0) itype = ConsumableName.BlackSpellbook;
            else itype = ConsumableName.SuccubiMilk;
        }
    }
    if (enemy.charType === CharacterType.Harpy || enemy.charType === CharacterType.Sophie) {
        if (randInt(10) === 0) itype = ArmorName.WizardRobes;
        else if (randInt(3) === 0 && char.perks.has(PerkType.LuststickAdapted)) itype = ConsumableName.LustStick;
        else itype = ConsumableName.GoldenSeed;
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
        itype = ArmorName.SeductiveArmor;
    }

    if (!plotFight && randInt(200) === 0 && char.stats.level >= 7) itype = ConsumableName.BroBrew;
    if (!plotFight && randInt(200) === 0 && char.stats.level >= 7) itype = ConsumableName.BimboLiqueur;
    // Chance of eggs if Easter!
    if (!plotFight && randInt(6) === 0 && isEaster()) {
        itype = randAnySizeEgg();
    }
    // Bonus loot overrides others
    if (bonusItemAfterCombat) {
        itype = bonusItemAfterCombat;
    }
    if (itype) {
        if (enemy.combat.endScenes.rewardItem)
            enemy.combat.endScenes.rewardItem(char, itype); // Each monster can now override the default award text
        return getItemFromName(itype);
    }
}
