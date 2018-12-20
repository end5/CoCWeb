import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { passTime } from '../PassTime';

export const BogFlags = Flags.register("Bog", {
    TIMES_EXPLORED: 0,
});

export function exploreBog(player: Character): NextScreenChoices {
    CView.clear().text("Not Implemented");
    return { next: passTime(1) };
}
