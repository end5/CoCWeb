import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { sceneNotImplimented } from 'Game/Scenes/NotImplemented';

export const MountainsFlags = Flags.register("Mountain", {
    TIMES_EXPLORED: 0,
});

export function exploreMountain(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}
