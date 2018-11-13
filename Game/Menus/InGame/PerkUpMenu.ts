import { ButtonElement } from '../../../Page/ButtonElement';
import { UnorderedListElement } from '../../../Engine/Display/Elements/UnorderedListElement';
import { MainScreen } from '../../../Page/MainScreen';
import { Character } from '../../Character/Character';
import { Perk } from '../../Effects/Perk';
import { PerkType } from '../../Effects/PerkType';
import { displayNextScreenChoices, NextScreenChoices, choiceWrap } from '../../ScreenDisplay';
import { CView } from '../../../Page/ContentView';
import { ListEntryElement } from '../../../Engine/Display/Elements/ListEntryElement';
import { ParagraphElement } from '../../../Engine/Display/Elements/ParagraphElement';
import { playerMenu } from './PlayerMenu';
import { numToCardinalText } from '../../Utilities/NumToText';

export function perkUpMenu(character: Character): NextScreenChoices {
    CView.clear();
    const perkList: Perk[] = getAvailablePerks(character);

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

function confirmPerk(character: Character, selectedPerk: Perk): NextScreenChoices {
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

function getAvailablePerks(character: Character): Perk[] {
    let perkList: Perk[] = [];

    // STRENGTH PERKS
    if (character.stats.str >= 25) {
        perkList.push(new Perk(PerkType.StrongBack));
    }
    if (character.perks.has(PerkType.StrongBack) && character.stats.str >= 50) {
        perkList.push(new Perk(PerkType.StrongBack2));
    }
    // Tier 1 Strength Perks
    if (character.stats.level >= 6) {
        // Thunderous Strikes - +20% basic attack damage while str > 80.
        if (character.stats.str >= 80) {
            perkList.push(new Perk(PerkType.ThunderousStrikes));
        }
        // Weapon Mastery - Doubles weapon damage bonus of 'large' type weapons. (Minotaur Axe, M. Hammer, etc)
        if (character.stats.str > 60) {
            perkList.push(new Perk(PerkType.WeaponMastery));
        }
        if (character.stats.str >= 75)
            perkList.push(new Perk(PerkType.BrutalBlows));
    }
    // Tier 2 Strength Perks
    if (character.stats.level >= 12) {
        if (character.stats.str >= 75)
            perkList.push(new Perk(PerkType.Berzerker));
    }
    // slot 2 - toughness perk 1
    if (!character.perks.has(PerkType.Tank) && character.stats.tou >= 25) {
        perkList.push(new Perk(PerkType.Tank));
    }
    // slot 2 - regeneration perk
    if (character.perks.has(PerkType.Tank) && character.stats.tou >= 50) {
        perkList.push(new Perk(PerkType.Regeneration));
    }
    // Tier 1 Toughness Perks
    if (character.stats.level >= 6) {
        if (character.perks.has(PerkType.Tank) && character.stats.tou >= 60) {
            perkList.push(new Perk(PerkType.Tank2));
        }
        if (character.perks.has(PerkType.Regeneration) && character.stats.tou >= 70) {
            perkList.push(new Perk(PerkType.Regeneration2));
        }
        if (character.stats.tou >= 75) {
            perkList.push(new Perk(PerkType.ImmovableObject));
        }
    }
    // Tier 2 Toughness Perks
    if (character.stats.level >= 12) {
        if (character.stats.tou >= 75) {
            perkList.push(new Perk(PerkType.Resolute));
        }
        if (character.stats.tou >= 60) {
            perkList.push(new Perk(PerkType.IronMan));
        }
    }
    // slot 3 - speed perk
    if (character.stats.spe >= 25) {
        perkList.push(new Perk(PerkType.Evade));
    }
    // slot 3 - run perk
    if (character.stats.spe >= 25) {
        perkList.push(new Perk(PerkType.Runner));
    }
    // slot 3 - Double Attack perk
    if (character.perks.has(PerkType.Evade) && character.perks.has(PerkType.Runner) && character.stats.spe >= 50) {
        perkList.push(new Perk(PerkType.DoubleAttack));
    }
    // Tier 1 Speed Perks
    if (character.stats.level >= 6) {
        // Speedy Recovery - Regain Fatigue 50% faster speed.
        if (character.perks.has(PerkType.Evade) && character.stats.spe >= 60) {
            perkList.push(new Perk(PerkType.SpeedyRecovery));
        }
        // Agility - A small portion of your speed is applied to your defense rating when wearing light armors.
        if (character.stats.spe > 75 && character.perks.has(PerkType.Runner) &&
            (character.inventory.armor.armorClass === "Light" || character.inventory.armor.armorClass === "Medium")) {
            perkList.push(new Perk(PerkType.Agility));
        }
        if (character.stats.spe >= 60) {
            perkList.push(new Perk(PerkType.LightningStrikes));
        }
    }
    // Tier 2 Speed Perks
    if (character.stats.level >= 12) {
        if (character.stats.spe >= 75) {
            perkList.push(new Perk(PerkType.LungingAttacks));
        }
    }
    // Slot 4 - precision - -10 enemy toughness for damage calc
    if (character.stats.int >= 25) {
        perkList.push(new Perk(PerkType.Precision));
    }
    // Spellpower - boosts spell power
    if (character.stats.int >= 50) {
        perkList.push(new Perk(PerkType.Spellpower));
    }
    if (character.perks.has(PerkType.Spellpower) && character.stats.int >= 50) {
        perkList.push(new Perk(PerkType.Mage));
    }
    // Tier 1 Intelligence Perks
    if (character.stats.level >= 6) {
        if (character.stats.int >= 50)
            perkList.push(new Perk(PerkType.Tactician));
        if (character.combat.spellCount() > 0 && character.perks.has(PerkType.Spellpower) && character.perks.has(PerkType.Mage) && character.stats.int >= 60) {
            perkList.push(new Perk(PerkType.Channeling));
        }
        if (character.stats.int >= 60) {
            perkList.push(new Perk(PerkType.Medicine));
        }
    }
    // Tier 2 Intelligence perks
    if (character.stats.level >= 12) {
        if (character.perks.has(PerkType.Mage) && character.stats.int >= 75) {
            perkList.push(new Perk(PerkType.Archmage));
        }
    }
    // LIBIDO PERKZ
    // slot 5 - libido perks
    // Slot 5 - Fertile+ increases cum production and fertility (+15%)
    if (character.stats.lib >= 25) {
        perkList.push(new Perk(PerkType.FertilityPlus, {
            fertility: { value: { multi: 0.15 } },
            cumQuantity: { value: { multi: 1.75 } }
        }));
    }
    // Slot 5 - minimum libido
    if (character.stats.lib >= 50) {
        perkList.push(new Perk(PerkType.HotBlooded, { lust: { min: { flat: 20 } } }));
    }
    // Tier 1 Libido Perks
    if (character.stats.level >= 6) {
        // Slot 5 - minimum libido
        if (character.stats.lib >= 60) {
            perkList.push(new Perk(PerkType.WellAdjusted));
        }
        // Slot 5 - minimum libido
        if (character.stats.lib >= 60 && character.stats.cor >= 50) {
            perkList.push(new Perk(PerkType.Masochist));
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
    else if (character.perks.has(PerkType.CorruptedLibido) && character.stats.cor >= 75) {
        perkList.push(new Perk(PerkType.Nymphomania));
    }
    // Slot 7 - UNFINISHED :3
    if (character.stats.minLust() >= 20 && character.perks.has(PerkType.CorruptedLibido) && character.stats.cor >= 50) {
        perkList.push(new Perk(PerkType.Acclimation));
    }
    // Tier 1 Corruption Perks - acclimation over-rides
    if (character.stats.level >= 6) {
        if (character.stats.cor >= 60 && character.perks.has(PerkType.CorruptedLibido)) {
            perkList.push(new Perk(PerkType.Sadist));
        }
        if (character.perks.has(PerkType.CorruptedLibido) && character.stats.cor >= 70) {
            perkList.push(new Perk(PerkType.ArousingAura));
        }
    }
    // Tier 1 Misc Perks
    if (character.stats.level >= 6) {
        perkList.push(new Perk(PerkType.Resistance));
    }
    // FILTER PERKS
    perkList = perkList.filter((perk: Perk) => !character.perks.has(perk.type) ? perk : undefined);

    return perkList;
}

function applyPerk(character: Character, selectedPerk: Perk) {
    CView.clear();
    character.stats.perkPoints--;
    // Apply perk here.
    CView.text("<b>" + selectedPerk.type + "</b>");
    CView.text(" gained!");
    character.perks.add(selectedPerk.type);
    if (selectedPerk.type === PerkType.StrongBack2) character.inventory.items.unlock();
    if (selectedPerk.type === PerkType.StrongBack) character.inventory.items.unlock();
    if (selectedPerk.type === PerkType.Tank2) {
        character.stats.HP += character.stats.tou;
    }
    return { next: playerMenu };
}
