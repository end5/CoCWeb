import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';

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
