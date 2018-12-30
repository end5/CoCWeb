import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { NextScreenChoices } from 'Game/ScreenDisplay';
import { sceneNotImplimented } from 'Game/Scenes/NotImplemented';

export const LakeFlags = Flags.register("Lake", {
    TIMES_EXPLORED: 0,
});

export function exploreLake(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}
