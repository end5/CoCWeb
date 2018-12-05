import { displaySaves, saveSlotChoices } from './SaveDisplay';
import { SaveManager } from 'Engine/Save/SaveManager';
import { NextScreenChoices, ClickFunction } from '../ScreenDisplay';
import { CView } from 'Page/ContentView';
import { dataMenu } from './DataMenu';

export function deleteMenu(): NextScreenChoices {
    CView.clear();
    CView.text("Slot,  Race,  Sex,  Game Days Played");
    CView.text("\n");

    displaySaves();
    CView.text("<b>ONCE DELETED, YOUR SAVE IS GONE FOREVER.</b>");
    return saveSlotChoices(confirmDelete, dataMenu);
}

function confirmDelete(slotNumber: number): ClickFunction {
    return () => {
        CView.clear();
        CView.text("You are about to delete the following save: ");
        // CView.text(Flags.list[FlagEnum.TEMP_STORAGE_SAVE_DELETION]).bold();
        CView.text("Are you sure you want to delete it?");
        return {
            choices: [
                ["No", deleteMenu],
                ["Yes", () => {
                    SaveManager.delete(slotNumber);
                    return deleteMenu();
                }]
            ]
        };
    };
}
