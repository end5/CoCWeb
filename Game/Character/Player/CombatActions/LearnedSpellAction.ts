import { PlayerSpellAction } from './PlayerSpellAction';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { PlayerFlags } from '../PlayerFlags';
import { CView } from 'Page/ContentView';
import { CombatActionType } from 'Game/Combat/Actions/CombatActionType';

export abstract class LearnedSpellAction extends PlayerSpellAction {
    public type = CombatActionType.Spells;

    public use(character: Character, enemy: Character): void {
        PlayerFlags.SPELLS_CAST++;
        this.spellPerkUnlock(character);
        super.use(character, enemy);
    }

    protected spellPerkUnlock(character: Character): void {
        if (PlayerFlags.SPELLS_CAST >= 5 && !character.effects.has(EffectType.SpellcastingAffinity)) {
            CView.text("You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!\n\n".bold());
            character.effects.create(EffectType.SpellcastingAffinity, { spellCost: { flat: 20 } });
        }
        if (PlayerFlags.SPELLS_CAST >= 15 && character.effects.getByName(EffectType.SpellcastingAffinity)!.values.spellCost.flat < 35) {
            CView.text("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            character.effects.getByName(EffectType.SpellcastingAffinity)!.values.spellCost.flat = 35;
        }
        if (PlayerFlags.SPELLS_CAST >= 45 && character.effects.getByName(EffectType.SpellcastingAffinity)!.values.spellCost.flat < 50) {
            CView.text("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            character.effects.getByName(EffectType.SpellcastingAffinity)!.values.spellCost.flat = 50;
        }
    }
}
