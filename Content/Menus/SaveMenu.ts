import { displaySaves, saveSlotChoices } from './SaveDisplay';
import { InputTextElement } from 'Engine/Display/Elements/InputTextElement';
import { SaveManager } from 'Engine/Save/SaveManager';
import { generateSave, SaveFile } from 'Engine/Save/SaveFile';
import { ClickOption, NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { dataMenu } from './DataMenu';

export function saveMenu(): NextScreenChoices {
    CView.clear();
    if (SaveManager.activeSlot())
        CView.text("<b>Last saved or loaded from: " + SaveManager.activeSlot() + "</b>");
    CView.text("<b><u>Slot: Sex,  Game Days Played</u></b>");

    displaySaves();

    CView.text("<b>Leave the notes box blank if you don't wish to change notes.</b>");
    CView.text("<b><u>NOTES:</u></b>");

    const notesInputElement = new InputTextElement();
    CView.textElement.appendElement(notesInputElement);
    notesInputElement.style.position = "fixed";

    return saveSlotChoices(createSaveFuncCallback(generateSave(notesInputElement.text)), dataMenu);
}

function createSaveFuncCallback(save: SaveFile): (index: number) => ClickOption {
    return (index: number) => {
        return () => {
            if (SaveManager.has(index))
                return confirmOverwrite(index, save);
            else {
                SaveManager.saveToSlot(index, save);
                return { next: saveMenu };
            }
        };
    };
}

function confirmOverwrite(slotNumber: number, save: SaveFile): NextScreenChoices {
    CView.clear();
    CView.text("You are about to overwrite the following save: <b>");
    // CView.text(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]).bold();
    CView.text("\n\n");
    CView.text("Are you sure you want to delete it?");
    return {
        choices: [["No", saveMenu], ["Yes", () => {
            SaveManager.saveToSlot(slotNumber, save);
            return saveMenu();
        }]]
    };
}
