import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { sceneNotImplimented } from 'Game/Scenes/NotImplemented';

export const SwampFlags = Flags.register("Swamp", {
    TIMES_EXPLORED: 0,
});

export function exploreSwamp(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}
