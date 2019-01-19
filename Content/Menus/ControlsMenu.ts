import { ButtonElement } from 'Engine/Display/ButtonElement';
import { BindableAction } from 'Engine/Input/BindableAction';
import { InputManager } from 'Engine/Input/InputManager';
import { KeyCombination } from 'Engine/Input/KeyCombination';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { settingsMenu } from './SettingsMenu';
import { MainScreen } from 'Engine/Display/MainScreen';
import { ScreenElement } from "../../Engine/Display/Elements/ScreenElement";

export function controlsMenu(): NextScreenChoices {
    CView.clear();
    CView.text("<b>Keyboard Control Bindings:</b>\n\n");
    CView.text("Click a button next to the action you wish to bind to a new key, then hit the key you want to bind the selected action to.\n\n");
    CView.text("Custom bindings are stored inside your save game files.\n\n");
    CView.text("Duplicate keys are automatically unbound from their old control action.\n\n");
    CView.text("<b>Reset Ctrls</b> will reset all of the control bindings to their defaults.\n\n");
    CView.text("<b>Clear Ctrls</b> will remove all of the current control bindings, leaving everything Unbound.\n\n");

    const bindListGrid = document.createElement('table');
    MainScreen.textElement.appendChild(new ScreenElement(bindListGrid));
    const listBind = (l:string, b:BindableAction) => {listBindableAction(bindListGrid, l, b)};
    listBind("Stats"           , BindableAction.Stats);
    listBind("Level Up"        , BindableAction.LevelUp);
    listBind("Quicksave 1"     , BindableAction.Quicksave1);
    listBind("Quicksave 2"     , BindableAction.Quicksave2);
    listBind("Quicksave 3"     , BindableAction.Quicksave3);
    listBind("Quicksave 4"     , BindableAction.Quicksave4);
    listBind("Quicksave 5"     , BindableAction.Quicksave5);
    listBind("Quickload 1"     , BindableAction.Quickload1);
    listBind("Quickload 2"     , BindableAction.Quickload2);
    listBind("Quickload 3"     , BindableAction.Quickload3);
    listBind("Quickload 4"     , BindableAction.Quickload4);
    listBind("Quickload 5"     , BindableAction.Quickload5);
    listBind("Show Menu"       , BindableAction.MainMenu);
    listBind("Data Menu"       , BindableAction.SaveLoad);
    listBind("Appearance Page" , BindableAction.Appearance);
    listBind("No"              , BindableAction.No);
    listBind("Yes"             , BindableAction.Yes);
    listBind("Show Perks"      , BindableAction.Perks);
    listBind("Continue"        , BindableAction.Back);
    listBind("Cycle Background", BindableAction.CycleBackground);
    listBind("Button 1"        , BindableAction.Button0);
    listBind("Button 2"        , BindableAction.Button1);
    listBind("Button 3"        , BindableAction.Button2);
    listBind("Button 4"        , BindableAction.Button3);
    listBind("Button 5"        , BindableAction.Button4);
    listBind("Button 6"        , BindableAction.Button5);
    listBind("Button 7"        , BindableAction.Button6);
    listBind("Button 8"        , BindableAction.Button7);
    listBind("Button 9"        , BindableAction.Button8);
    listBind("Button 10"       , BindableAction.Button9);

    return { choices: [["Reset Ctrls", resetControls], ["Clear Ctrls", clearControls]], persistantChoices: [["Back", settingsMenu]] };
}

function listBindableAction(bindListElement: HTMLTableElement, text: string, bindableAction: BindableAction) {
    const keyPair = InputManager.get(bindableAction);
    if (!keyPair) throw new Error('Incorrect bindable action');

    let bindElement = bindListElement.insertRow();
    bindListElement.appendChild(bindElement);
    bindElement.insertCell().innerHTML = "<b>" + text + "</b>";


    const button1 = new ButtonElement();
    button1.element = document.createElement("a");
    bindElement.insertCell().appendChild(button1.element);
    let primaryKeyName = "";
    if (keyPair.primaryKey)
        primaryKeyName = keyPair.primaryKey.toString();
    button1.modify(primaryKeyName, () => {
        document.addEventListener("keypress", function keyBind(event: KeyboardEvent) {
            const key = new KeyCombination();
            key.keyCode = event.keyCode;
            key.shiftKey = event.shiftKey;
            key.altKey = event.altKey;
            key.ctrlKey = event.ctrlKey;
            key.metaKey = event.metaKey;
            if (keyPair)
                keyPair.primaryKey = key;
            controlsMenu();
            document.removeEventListener("keypress", keyBind);
        });
    });

    const button2 = new ButtonElement();
    button2.element = document.createElement("a");
    bindElement.insertCell().appendChild(button2.element);
    let secondaryKeyName = "";
    if (keyPair.secondaryKey)
        secondaryKeyName = keyPair.secondaryKey.toString();
    button2.modify(secondaryKeyName, () => {
        document.addEventListener("keypress", function keyBind(event: KeyboardEvent) {
            const key = new KeyCombination();
            key.keyCode = event.keyCode;
            key.shiftKey = event.shiftKey;
            key.altKey = event.altKey;
            key.ctrlKey = event.ctrlKey;
            key.metaKey = event.metaKey;
            if (keyPair)
                keyPair.secondaryKey = key;
            controlsMenu();
            document.removeEventListener("keypress", keyBind);
        });
    });

    bindElement.style.height = button1.computedStyle.height;
    bindElement.style.width = "200px";
    button1.style.marginLeft = "200px";
    if (button1.computedStyle.width)
        button2.style.marginLeft = parseFloat(button1.computedStyle.width) + 200 + "px";
}

function resetControls(): NextScreenChoices {
    CView.clear();
    CView.text("Are you sure you want to reset all of the currently bound controls to their defaults?");

    return { yes: resetControlsYes, no: controlsMenu };
}

function resetControlsYes(): NextScreenChoices {
    InputManager.resetAll();

    CView.clear();
    CView.text("Controls have been reset to defaults!");

    return { next: controlsMenu };
}

function clearControls(): NextScreenChoices {

    CView.clear();
    CView.text("Are you sure you want to clear all of the currently bound controls?");

    return { yes: clearControlsYes, no: controlsMenu };
}

function clearControlsYes(): NextScreenChoices {
    InputManager.clearAll();

    CView.clear();
    CView.text("Controls have been cleared!");

    return { next: controlsMenu };
}

/*
--Default controls
    Show Stats		S
    Level Up		L
    Quicksave1...5	F1..F5
    Quickload1...5	F6..F10
    Show Menu		backspace
    Data Menu		D
    Appearance Page	A
    No				N
    Yes				Y
    Show Perks		P
    Continue		Enter		Space
    Cycle Background	Home
    Button 1..5		Number 1..5
    Button 6..10	Number 6..0	QWERT

*/
