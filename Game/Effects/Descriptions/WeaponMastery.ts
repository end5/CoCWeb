import { Character } from 'Game/Character/Character';
import { EffectType } from '../EffectType';
import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class WeaponMastery extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.str > 60)
            return "Doubles damage bonus of weapons classified as 'Large'.";
        else
            return "<b>You aren't strong enough to benefit from this anymore.</b>";
    }

    public constructor() {
        super(EffectType.WeaponMastery, "Weapon Mastery", "", "You choose the 'Weapon Mastery' perk, doubling the effectiveness of large weapons.");
    }
}
