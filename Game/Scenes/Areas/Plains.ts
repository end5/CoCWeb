import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { sceneNotImplimented } from 'Game/Scenes/NotImplemented';

export const PlainsFlags = Flags.register("Plains", {
    TIMES_EXPLORED: 0,
});

export function explorePlains(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}
