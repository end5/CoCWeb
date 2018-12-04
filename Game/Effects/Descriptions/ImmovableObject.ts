import { Character } from 'Game/Character/Character';
import { EffectType } from '../EffectType';
import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class ImmovableObject extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.tou >= 75)
            return "Grants 20% physical damage reduction.</b>";
        else
            return "<b>You aren't tough enough to benefit from this anymore.</b>";
    }

    public constructor() {
        super(EffectType.ImmovableObject, "Immovable Object", "", "You choose the 'Immovable Object' perk, granting 20% physical damage reduction.</b>");
    }
}
