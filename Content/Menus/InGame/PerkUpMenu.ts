import { ButtonElement } from 'Engine/Display/ButtonElement';
import { UnorderedListElement } from 'Engine/Display/Elements/UnorderedListElement';
import { MainScreen } from 'Engine/Display/MainScreen';
import { Character } from 'Engine/Character/Character';
import { Effect } from 'Engine/Effects/Effect';
import { EffectType } from 'Content/Effects/EffectType';
import { displayNextScreenChoices, NextScreenChoices, choiceWrap } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { ListEntryElement } from 'Engine/Display/Elements/ListEntryElement';
import { ParagraphElement } from 'Engine/Display/Elements/ParagraphElement';
import { playerMenu } from './PlayerMenu';
import { numToCardinalText } from 'Content/Utilities/NumToText';

export function perkUpMenu(character: Character): NextScreenChoices {
    CView.clear();
    const perkList: Effect[] = getAvailablePerks(character);

    if (perkList.length === 0) {
        CView.text("<b>You do not qualify for any perks at present.  </b>In case you qualify for any in the future, you will keep your " + numToCardinalText(character.stats.perkPoints) + " perk point");
        if (character.stats.perkPoints > 1) CView.text("s");
        CView.text(".");
        return { next: playerMenu };
    }
    else {
        CView.text("Please select a perk from the list, then click 'Okay'.  You can press 'Skip' to save your perk point for later.");
        CView.text("\n\n");

        displayPerkList(character);

        MainScreen.topButtons.mainMenu.hide();
        // "Okay" button is modified in displayPerkList
        return { choices: [["Okay", undefined], ["Skip", playerMenu]] };
    }
}

function confirmPerk(character: Character, selectedPerk: Effect): NextScreenChoices {
    CView.clear();
    CView.text("You have selected the following perk:");
    CView.text("\n\n");
    CView.text("<b>" + selectedPerk.desc.name + "</b>: ");
    CView.text(selectedPerk.desc.longDesc);
    CView.text("\n\n");
    CView.text("If you would like to select this perk, click <b>Okay</b>.  Otherwise, select a new perk, or press <b>Skip</b> to make a decision later.");
    return { choices: [["Okay", choiceWrap(applyPerk, selectedPerk)], ["Skip", playerMenu]] };
}

function displayPerkList(character: Character) {
    const perkList = getAvailablePerks(character);
    const perkListDisplay = new UnorderedListElement();
    CView.textElement.appendElement(perkListDisplay);
    perkList.forEach((perk) => {
        const listEntry = new ListEntryElement();
        perkListDisplay.appendElement(listEntry);

        const buttonElement = new ButtonElement();
        buttonElement.style.position = "inherit";
        listEntry.appendElement(buttonElement);
        buttonElement.modify(perk.desc.name, () => {
            // Okay button is disabled until perk is selected
            displayNextScreenChoices({ choices: [["Okay", choiceWrap(confirmPerk, perk)], ["Skip", playerMenu]] });
        });

        const longDescElement = new ParagraphElement();
        listEntry.appendElement(longDescElement);
        longDescElement.text(perk.desc.description(perk, character));
    });
}

function getAvailablePerks(character: Character): Effect[] {
    let perkList: Effect[] = [];

    // STRENGTH PERKS
    if (character.stats.str >= 25) {
        perkList.push(new Effect(EffectType.StrongBack));
    }
    if (character.effects.has(EffectType.StrongBack) && character.stats.str >= 50) {
        perkList.push(new Effect(EffectType.StrongBack2));
    }
    // Tier 1 Strength Perks
    if (character.stats.level >= 6) {
        // Thunderous Strikes - +20% basic attack damage while str > 80.
        if (character.stats.str >= 80) {
            perkList.push(new Effect(EffectType.ThunderousStrikes));
        }
        // Weapon Mastery - Doubles weapon damage bonus of 'large' type weapons. (Minotaur Axe, M. Hammer, etc)
        if (character.stats.str > 60) {
            perkList.push(new Effect(EffectType.WeaponMastery));
        }
        if (character.stats.str >= 75)
            perkList.push(new Effect(EffectType.BrutalBlows));
    }
    // Tier 2 Strength Perks
    if (character.stats.level >= 12) {
        if (character.stats.str >= 75)
            perkList.push(new Effect(EffectType.Berzerker));
    }
    // slot 2 - toughness perk 1
    if (!character.effects.has(EffectType.Tank) && character.stats.tou >= 25) {
        perkList.push(new Effect(EffectType.Tank));
    }
    // slot 2 - regeneration perk
    if (character.effects.has(EffectType.Tank) && character.stats.tou >= 50) {
        perkList.push(new Effect(EffectType.Regeneration));
    }
    // Tier 1 Toughness Perks
    if (character.stats.level >= 6) {
        if (character.effects.has(EffectType.Tank) && character.stats.tou >= 60) {
            perkList.push(new Effect(EffectType.Tank2));
        }
        if (character.effects.has(EffectType.Regeneration) && character.stats.tou >= 70) {
            perkList.push(new Effect(EffectType.Regeneration2));
        }
        if (character.stats.tou >= 75) {
            perkList.push(new Effect(EffectType.ImmovableObject));
        }
    }
    // Tier 2 Toughness Perks
    if (character.stats.level >= 12) {
        if (character.stats.tou >= 75) {
            perkList.push(new Effect(EffectType.Resolute));
        }
        if (character.stats.tou >= 60) {
            perkList.push(new Effect(EffectType.IronMan));
        }
    }
    // slot 3 - speed perk
    if (character.stats.spe >= 25) {
        perkList.push(new Effect(EffectType.Evade));
    }
    // slot 3 - run perk
    if (character.stats.spe >= 25) {
        perkList.push(new Effect(EffectType.Runner));
    }
    // slot 3 - Double Attack perk
    if (character.effects.has(EffectType.Evade) && character.effects.has(EffectType.Runner) && character.stats.spe >= 50) {
        perkList.push(new Effect(EffectType.DoubleAttack));
    }
    // Tier 1 Speed Perks
    if (character.stats.level >= 6) {
        // Speedy Recovery - Regain Fatigue 50% faster speed.
        if (character.effects.has(EffectType.Evade) && character.stats.spe >= 60) {
            perkList.push(new Effect(EffectType.SpeedyRecovery));
        }
        // Agility - A small portion of your speed is applied to your defense rating when wearing light armors.
        if (character.stats.spe > 75 && character.effects.has(EffectType.Runner) &&
            (character.inventory.armor.armorClass === "Light" || character.inventory.armor.armorClass === "Medium")) {
            perkList.push(new Effect(EffectType.Agility));
        }
        if (character.stats.spe >= 60) {
            perkList.push(new Effect(EffectType.LightningStrikes));
        }
    }
    // Tier 2 Speed Perks
    if (character.stats.level >= 12) {
        if (character.stats.spe >= 75) {
            perkList.push(new Effect(EffectType.LungingAttacks));
        }
    }
    // Slot 4 - precision - -10 enemy toughness for damage calc
    if (character.stats.int >= 25) {
        perkList.push(new Effect(EffectType.Precision));
    }
    // Spellpower - boosts spell power
    if (character.stats.int >= 50) {
        perkList.push(new Effect(EffectType.Spellpower));
    }
    if (character.effects.has(EffectType.Spellpower) && character.stats.int >= 50) {
        perkList.push(new Effect(EffectType.Mage));
    }
    // Tier 1 Intelligence Perks
    if (character.stats.level >= 6) {
        if (character.stats.int >= 50)
            perkList.push(new Effect(EffectType.Tactician));
        if (character.combat.spellCount() > 0 && character.effects.has(EffectType.Spellpower) && character.effects.has(EffectType.Mage) && character.stats.int >= 60) {
            perkList.push(new Effect(EffectType.Channeling));
        }
        if (character.stats.int >= 60) {
            perkList.push(new Effect(EffectType.Medicine));
        }
    }
    // Tier 2 Intelligence perks
    if (character.stats.level >= 12) {
        if (character.effects.has(EffectType.Mage) && character.stats.int >= 75) {
            perkList.push(new Effect(EffectType.Archmage));
        }
    }
    // LIBIDO PERKZ
    // slot 5 - libido perks
    // Slot 5 - Fertile+ increases cum production and fertility (+15%)
    if (character.stats.lib >= 25) {
        perkList.push(new Effect(EffectType.FertilityPlus, {
            fertility: { total: { multi: 0.15 } },
            cumQuantity: { total: { multi: 1.75 } }
        }));
    }
    // Slot 5 - minimum libido
    if (character.stats.lib >= 50) {
        perkList.push(new Effect(EffectType.HotBlooded, { lust: { min: { flat: 20 } } }));
    }
    // Tier 1 Libido Perks
    if (character.stats.level >= 6) {
        // Slot 5 - minimum libido
        if (character.stats.lib >= 60) {
            perkList.push(new Effect(EffectType.WellAdjusted));
        }
        // Slot 5 - minimum libido
        if (character.stats.lib >= 60 && character.stats.cor >= 50) {
            perkList.push(new Effect(EffectType.Masochist));
        }
    }
    // Corruption Perks - slot 7
    // Slot 7 - Corrupted Libido - lust raises 10% slower.
    // if (character.stats.cor >= 25) {
    //     perkList.push(new Perk(PerkType.CorruptedLibido, { lust: { min: { flat: 20 } } }));
    // }
    // Slot 7 - Seduction (Must have seduced Jojo
    // if (!character.perks.has(PerkType.Seduction) && character.stats.cor >= 50 && playerFlags.monk >= 5) {
    //     perkList.push(new Perk(PerkType.Seduction));
    // }
    // Slot 7 - Nymphomania
    else if (character.effects.has(EffectType.CorruptedLibido) && character.stats.cor >= 75) {
        perkList.push(new Effect(EffectType.Nymphomania));
    }
    // Slot 7 - UNFINISHED :3
    if (character.stats.base.lust.min >= 20 && character.effects.has(EffectType.CorruptedLibido) && character.stats.cor >= 50) {
        perkList.push(new Effect(EffectType.Acclimation));
    }
    // Tier 1 Corruption Perks - acclimation over-rides
    if (character.stats.level >= 6) {
        if (character.stats.cor >= 60 && character.effects.has(EffectType.CorruptedLibido)) {
            perkList.push(new Effect(EffectType.Sadist));
        }
        if (character.effects.has(EffectType.CorruptedLibido) && character.stats.cor >= 70) {
            perkList.push(new Effect(EffectType.ArousingAura));
        }
    }
    // Tier 1 Misc Perks
    if (character.stats.level >= 6) {
        perkList.push(new Effect(EffectType.Resistance));
    }
    // FILTER PERKS
    perkList = perkList.filter((perk: Effect) => !character.effects.has(perk.type) ? perk : undefined);

    return perkList;
}

function applyPerk(character: Character, selectedPerk: Effect) {
    CView.clear();
    character.stats.perkPoints--;
    // Apply perk here.
    CView.text("<b>" + selectedPerk.type + "</b>");
    CView.text(" gained!");
    character.effects.create(selectedPerk.type);
    if (selectedPerk.type === EffectType.StrongBack2) character.inventory.items.unlock();
    if (selectedPerk.type === EffectType.StrongBack) character.inventory.items.unlock();
    if (selectedPerk.type === EffectType.Tank2) {
        character.stats.HP += character.stats.tou;
    }
    return { next: playerMenu };
}
