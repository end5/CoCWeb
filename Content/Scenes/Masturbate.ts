import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { CView } from 'Engine/Display/ContentView';
import { passTime } from './PassTime';

export function masturbateMenu(player: Character): NextScreenChoices {
    player.stats.lust = 0;
    CView.clear();
    CView.text("Placeholder. Lust gone.");
    return { next: passTime(1) };
}
