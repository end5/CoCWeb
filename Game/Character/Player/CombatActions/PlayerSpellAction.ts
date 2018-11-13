import { CombatAction } from '../../../Combat/Actions/CombatAction';
import { ISpellAction } from '../../../Combat/Actions/ISpellAction';
import { PerkType } from '../../../Effects/PerkType';
import { Character } from '../../Character';

export abstract class PlayerSpellAction extends CombatAction implements ISpellAction {
    public reasonCannotUse: string = "";
    public subActions: CombatAction[] = [];

    public canUse(character: Character, monster: Character): boolean {
        if (character.perks.has(PerkType.BloodMage) || character.stats.fatigue + this.spellCost(character) <= 100) {
            this.reasonCannotUse = "You are too tired to cast this spell.";
            return false;
        }
        return true;
    }

    public abstract readonly baseCost: number;

    public spellCost(character: Character): number {
        // Addiditive mods
        let mod: number = this.baseCost;
        let costPercent: number = 100;

        // Limiting it and multiplicative mods
        if (character.perks.has(PerkType.BloodMage) && costPercent < 50) costPercent = 50;

        mod *= costPercent / 100;

        if (character.perks.has(PerkType.HistoryScholar) && mod > 2)
            mod *= .8;
        if (character.perks.has(PerkType.BloodMage) && mod < 5)
            mod = 5;
        else if (mod < 2)
            mod = 2;

        mod = Math.round(mod * 100) / 100;
        return mod;
    }
}
