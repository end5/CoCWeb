import { displaySaves, saveSlotChoices } from './SaveDisplay';
import { SaveManager } from '../../Engine/Save/SaveManager';
import { loadFromSave, SaveFile } from '../SaveFile';
import { NextScreenChoices } from '../ScreenDisplay';
import { CView } from '../../Page/ContentView';
import { playerMenu } from './InGame/PlayerMenu';
import { dataMenu } from './DataMenu';

export function loadMenu(): NextScreenChoices {
    CView.clear();
    if (SaveManager.activeSlot())
        CView.text("<b>Last saved or loaded from: " + SaveManager.activeSlot() + "</b>\r\r");
    CView.text("<b><u>Slot: Sex,  Game Days Played</u></b>\r");

    displaySaves();

    return saveSlotChoices((index: number) => {
        return () => {
            loadFromSave(SaveManager.loadFromSlot(index) as SaveFile);
            return loaded();
        };
    }, dataMenu);
}

function loaded(): NextScreenChoices {
    CView.clear();
    CView.text("Load Successful.");
    return { next: playerMenu };
}
