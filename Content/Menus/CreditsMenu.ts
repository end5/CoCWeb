import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { mainMenu } from './MainMenu';

export function creditsMenu(): NextScreenChoices {
    CView.clear();
    CView.text("<b>Credits</b>\n");
    return { next: mainMenu };
}
