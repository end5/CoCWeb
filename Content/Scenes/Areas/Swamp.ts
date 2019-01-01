import { Flags } from 'Engine/Flags';
import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { sceneNotImplimented } from 'Content/Scenes/NotImplemented';

export const SwampFlags = Flags.register("Swamp", {
    TIMES_EXPLORED: 0,
});

export function exploreSwamp(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}
