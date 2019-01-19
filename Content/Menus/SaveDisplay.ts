import { UnorderedListElement } from 'Engine/Display/Elements/UnorderedListElement';
import { SaveManager } from 'Engine/Save/SaveManager';
import { Gender } from 'Engine/Body/GenderIdentity';
import { SaveFile } from 'Engine/Save/SaveFile';
import { ClickOption, NextScreenChoices, ScreenChoice } from 'Engine/Display/ScreenDisplay';
import { MainScreen } from 'Engine/Display/MainScreen';
import { TextElement } from 'Engine/Display/Elements/TextElement';

export function saveSlotChoices(saveSlotCallback: (index: number) => ClickOption, prevMenu: ClickOption): NextScreenChoices {
    const choices: ScreenChoice[] = [];
    for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
        choices.push(["Slot " + index.toString(), saveSlotCallback(index)]);
    }
    return { choices, persistantChoices: [["Back", prevMenu]] };
}

export function displaySaves() {
    const saveListElement = new UnorderedListElement();
    MainScreen.textElement.appendChild(saveListElement);

    for (let index: number = 0; index < SaveManager.saveSlotCount(); index++) {
        const saveElement = new TextElement(document.createElement('li'));
        saveListElement.appendChild(saveElement);
        saveInfo(SaveManager.get(index) as SaveFile, (index + 1).toString(), saveElement);
    }
}

export function saveInfo(saveFile: SaveFile, slotName: string, element: TextElement<HTMLLIElement>) {
    element.text(slotName + ":  ");
    if (saveFile) {
        element.text("<b>" + saveFile.name + "</b>");
        element.text(" - ");
        if (saveFile.notes)
            element.text("<i>" + saveFile.notes + "</i>");
        else
            element.text("No notes available.");
        element.text("\n");
        element.text("Days - " + saveFile.days + "\n");
        element.text("  Gender - ");
        if (saveFile.gender === Gender.NONE)
            element.text("U");
        if (saveFile.gender === Gender.MALE)
            element.text("M");
        if (saveFile.gender === Gender.FEMALE)
            element.text("F");
        if (saveFile.gender === Gender.HERM)
            element.text("H");
        element.text("\n");
    }
    else {
        element.text("<b>EMPTY</b>");
        element.text("\n\n");
    }
}
