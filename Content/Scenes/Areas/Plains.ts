import { Flags } from 'Engine/Flags';
import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { sceneNotImplimented } from 'Content/Scenes/NotImplemented';

export const PlainsFlags = Flags.register("Plains", {
    TIMES_EXPLORED: 0,
});

export function explorePlains(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}
