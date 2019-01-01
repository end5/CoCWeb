import { EffectType } from 'Content/Effects/EffectType';
import { Character } from 'Content/Character/GameCharacter';
import { LearnedSpellAction } from '../LearnedSpellAction';
import { CanUseResult } from 'Engine/Combat/Actions/CombatAction';

export abstract class WhiteMagic extends LearnedSpellAction {
    public canUse(character: Character, monster: Character): CanUseResult {
        let whiteLustCap: number = 75;
        if (character.effects.has(EffectType.Enlightened) && character.stats.cor < 10)
            whiteLustCap += 10;
        if (character.stats.lust >= whiteLustCap) {
            return { canUse: false, reasonCannotUse: "You are far too aroused to focus on white magic.\n\n" };
        }
        return super.canUse(character, monster);
    }
}
