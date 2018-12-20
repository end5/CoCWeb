import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { passTime } from '../PassTime';

export const HighMountainFlags = Flags.register("High Mountain", {
    TIMES_EXPLORED: 0,
});

export function exploreHighMountain(player: Character): NextScreenChoices {
    CView.clear().text("Not Implemented");
    return { next: passTime(1) };
}
