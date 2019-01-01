import { Flags } from 'Engine/Flags';
import { Character } from 'Engine/Character/Character';
import { NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { sceneNotImplimented } from 'Content/Scenes/NotImplemented';

// EXGARTUAN STATUS
// v1 - Location - 1 = dick, 2 = tits
// v2 - Sleep counter - 0 = awake, positive numbers = hours of sleep
// const EXGARTUAN_TIGHTPANTS_MASTURBATE_COUNT:int = 413;
// const BOOBGARTUAN_SURPRISE_COUNT:int = 414;
export const ExgartuanFlags = Flags.register("Exgartuan", {
    LOCATION: 0,
    SLEEP_COUNTER: 0,
});

export function exgartuanBeeRape(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}

export function exgartuanNagaStoleMyMasturbation(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}

export function exgartuanMasturbation(player: Character): NextScreenChoices {
    return sceneNotImplimented();
}
