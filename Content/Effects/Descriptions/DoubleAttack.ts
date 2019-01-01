import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { Effect } from 'Engine/Effects/Effect';
import { EffectDesc } from 'Engine/Effects/EffectDesc';

export class DoubleAttack extends EffectDesc {
    public description(effect: Effect, character: Character): string {
        if (character.stats.spe < 50)
            return "<b>You're too slow to double attack!</b>";
        else if (character.stats.str < 61)
            return "Allows you to perform two melee attacks per round.";
        else
            return "<b>You are stronger than double attack allows.  To choose between reduced strength double-attacks and a single strong attack, access \"Dbl Options\" in the perks menu.</b>";
    }

    public constructor() {
        super(EffectType.DoubleAttack, "Double Attack", "", "You choose the 'Double Attack' perk.  This allows you to make two attacks so long as your strength is at 60 or below.  By default your effective strength will be reduced to 60 if it is too high when double attacking.  <b>You can enter the perks menu at any time to toggle options as to how you will use this perk.</b>");
    }
}
