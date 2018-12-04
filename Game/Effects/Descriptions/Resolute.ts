import { Character } from 'Game/Character/Character';
import { EffectType } from '../EffectType';
import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class Resolute extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.tou >= 75)
            return "Grants immunity to stuns and some statuses.</b>";
        else
            return "<b>You aren't tough enough to benefit from this anymore.</b>";
    }

    public constructor() {
        super(EffectType.Resolute, "Resolute", "", "You choose the 'Resolute' perk, granting immunity to stuns and some statuses.</b>");
    }
}
