import { CombatAction, CanUseResult } from 'Game/Combat/Actions/CombatAction';
import { ISpellAction } from 'Game/Combat/Actions/ISpellAction';
import { EffectType } from 'Game/Effects/EffectType';
import { Character } from 'Game/Character/Character';

export abstract class PlayerSpellAction extends CombatAction implements ISpellAction {
    public canUse(character: Character, monster: Character): CanUseResult {
        if (character.effects.has(EffectType.BloodMage) || character.stats.fatigue + this.spellCost(character) <= 100) {
            return { canUse: false, reasonCannotUse: "You are too tired to cast this spell." };
        }
        return { canUse: true };
    }

    public abstract readonly baseCost: number;

    public spellCost(character: Character): number {
        // Addiditive mods
        let mod: number = this.baseCost;
        let costPercent: number = 100;

        // Limiting it and multiplicative mods
        if (character.effects.has(EffectType.BloodMage) && costPercent < 50) costPercent = 50;

        mod *= costPercent / 100;

        if (character.effects.has(EffectType.HistoryScholar) && mod > 2)
            mod *= .8;
        if (character.effects.has(EffectType.BloodMage) && mod < 5)
            mod = 5;
        else if (mod < 2)
            mod = 2;

        mod = Math.round(mod * 100) / 100;
        return mod;
    }
}
