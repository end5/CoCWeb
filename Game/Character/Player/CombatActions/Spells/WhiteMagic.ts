import { PerkType } from '../../../../Effects/PerkType';
import { Character } from '../../../Character';
import { LearnedSpellAction } from '../LearnedSpellAction';

export abstract class WhiteMagic extends LearnedSpellAction {
    public canUse(character: Character, monster: Character): boolean {
        let whiteLustCap: number = 75;
        if (character.perks.has(PerkType.Enlightened) && character.stats.cor < 10)
            whiteLustCap += 10;
        if (character.stats.lust >= whiteLustCap) {
            this.reasonCannotUse = "You are far too aroused to focus on white magic.\n\n";
            return false;
        }
        return super.canUse(character, monster);
    }
}
