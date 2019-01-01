import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { passTime } from 'Content/Scenes/PassTime';

export function sceneNotImplimented(): NextScreenChoices {
    CView.clear().text("Not Implemented");
    return { next: passTime(1) };
}
