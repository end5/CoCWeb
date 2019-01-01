import { Flags } from 'Engine/Flags';
import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { sceneNotImplimented } from 'Content/Scenes/NotImplemented';

export const BogFlags = Flags.register("Bog", {
    TIMES_EXPLORED: 0,
});

export function exploreBog(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}
