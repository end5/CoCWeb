import { NextScreenChoices } from '../ScreenDisplay';
import { CView } from 'Page/ContentView';
import { mainMenu } from './MainMenu';

export function creditsMenu(): NextScreenChoices {
    CView.clear();
    CView.text("<b>Credits</b>\n");
    return { next: mainMenu };
}
