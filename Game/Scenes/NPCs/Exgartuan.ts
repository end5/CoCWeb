import { Flags } from 'Game/Flags';
import { Character } from 'Game/Character/Character';
import { playerMenu } from 'Game/Menus/InGame/PlayerMenu';
import { NextScreenChoices } from 'Game/ScreenDisplay';

// EXGARTUAN STATUS
// v1 - Location - 1 = dick, 2 = tits
// v2 - Sleep counter - 0 = awake, positive numbers = hours of sleep
// const EXGARTUAN_TIGHTPANTS_MASTURBATE_COUNT:int = 413;
// const BOOBGARTUAN_SURPRISE_COUNT:int = 414;
export const ExgartuanFlags = {
    LOCATION: 0,
    SLEEP_COUNTER: 0,
};

Flags.set("Exgartuan", ExgartuanFlags);

export function exgartuanBeeRape(player: Character): NextScreenChoices {
    return { next: playerMenu };
}
