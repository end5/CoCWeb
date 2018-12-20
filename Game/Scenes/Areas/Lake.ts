import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { CView } from 'Page/ContentView';
import { passTime } from '../PassTime';

export const LakeFlags = Flags.register("Lake", {
    TIMES_EXPLORED: 0,
});

export function exploreLake(player: Character): NextScreenChoices {
    CView.clear().text("Not Implemented");
    return { next: passTime(1) };
}
