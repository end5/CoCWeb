import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { passTime } from './PassTime';

export function masturbateMenu(player: Character): NextScreenChoices {
    player.stats.lust = 0;
    CView.clear();
    CView.text("Placeholder. Lust gone.");
    return { next: passTime(1) };
}
