import { NextScreenChoices } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { passTime } from 'Game/Scenes/PassTime';

export function sceneNotImplimented(): NextScreenChoices {
    CView.clear().text("Not Implemented");
    return { next: passTime(1) };
}
