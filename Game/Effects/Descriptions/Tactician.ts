import { Character } from 'Game/Character/Character';
import { EffectType } from '../EffectType';
import { Effect } from '../Effect';
import { EffectDesc } from '../EffectDesc';

export class Tactician extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.spe >= 75)
            return "Increases critical hit chance by up to 10% (Intelligence-based).";
        else
            return "<b>You are too dumb to gain benefit from this perk.</b>";
    }

    public constructor() {
        super(EffectType.Tactician, "Tactician", "", "You choose the 'Tactician' perk, increasing critical hit chance by up to 10% (Intelligence-based).");
    }
}
