import { Character } from 'Game/Character/Character';
import { EffectType } from '../EffectType';
import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class LightningStrikes extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.spe >= 60)
            return "Increases the attack damage for non-heavy weapons.</b>";
        else
            return "<b>You are too slow to benefit from this perk.</b>";
    }

    public constructor() {
        super(EffectType.LightningStrikes, "Lightning Strikes", "", "You choose the 'Lightning Strikes' perk, increasing the attack damage for non-heavy weapons.</b>");
    }
}
