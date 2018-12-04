import { Character } from 'Game/Character/Character';
import { EffectType } from '../EffectType';
import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class Berzerker extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.str >= 75)
            return "Grants 'Berzerk' ability.";
        else
            return "<b>You aren't strong enough to benefit from this anymore.</b>";
    }

    public constructor() {
        super(EffectType.Berzerker, "Berzerker", "", "You choose the 'Berzerker' perk, which unlocks the 'Berzerk' magical ability.  Berzerking increases attack and lust resistance but reduces physical defenses.");
    }
}
