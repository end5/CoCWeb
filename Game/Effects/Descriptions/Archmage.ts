import { Character } from 'Game/Character/Character';
import { EffectType } from '../EffectType';
import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class Archmage extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.int >= 75)
            return "Increases base spell strength by 50%.";
        else
            return "<b>You are too dumb to gain benefit from this perk.</b>";
    }

    public constructor() {
        super(EffectType.Archmage, "Archmage", "", "You choose the 'Archmage' perk, increasing base spell strength by 50%.");
    }
}
