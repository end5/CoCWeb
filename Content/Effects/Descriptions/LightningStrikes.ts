import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';

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
