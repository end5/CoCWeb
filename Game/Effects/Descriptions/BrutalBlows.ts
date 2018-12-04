import { Character } from 'Game/Character/Character';
import { EffectType } from '../EffectType';
import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class BrutalBlows extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.str >= 75)
            return "Reduces enemy armor with each hit.";
        else
            return "<b>You aren't strong enough to benefit from this anymore.</b>";
    }

    public constructor() {
        super(EffectType.BrutalBlows, "Brutal Blows", "", "You choose the 'Brutal Blows' perk, which reduces enemy armor with each hit.");
    }
}
