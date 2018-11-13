import { Character } from '../../../../Character/Character';
import { LearnedSpellAction } from '../LearnedSpellAction';

export abstract class BlackMagic extends LearnedSpellAction {
    public canUse(character: Character, monster: Character): boolean {
        if (character.stats.lust < 50) {
            this.reasonCannotUse = "You aren't turned on enough to use any black magics.\n\n";
            return false;
        }
        return super.canUse(character, monster);
    }
}
