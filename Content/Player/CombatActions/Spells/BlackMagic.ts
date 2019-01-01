import { Character } from 'Content/Character/GameCharacter';
import { LearnedSpellAction } from '../LearnedSpellAction';
import { CanUseResult } from 'Engine/Combat/Actions/CombatAction';

export abstract class BlackMagic extends LearnedSpellAction {
    public canUse(character: Character, monster: Character): CanUseResult {
        if (character.stats.lust < 50) {
            return { canUse: false, reasonCannotUse: "You aren't turned on enough to use any black magics.\n\n" };
        }
        return super.canUse(character, monster);
    }
}
