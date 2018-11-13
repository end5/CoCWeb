import { PlayerSpellAction } from './PlayerSpellAction';
import { Character } from '../../../Character/Character';
import { PerkType } from '../../../Effects/PerkType';
import { PlayerFlags } from '../PlayerFlags';
import { CView } from '../../../../Page/ContentView';
import { CombatActionFlags } from '../../../Effects/CombatActionFlag';

export abstract class LearnedSpellAction extends PlayerSpellAction {
    public flag: CombatActionFlags = CombatActionFlags.Spells;

    public use(character: Character, enemy: Character): void {
        PlayerFlags.SPELLS_CAST++;
        this.spellPerkUnlock(character);
        super.use(character, enemy);
    }

    protected spellPerkUnlock(character: Character): void {
        if (PlayerFlags.SPELLS_CAST >= 5 && !character.perks.has(PerkType.SpellcastingAffinity)) {
            CView.text("You've become more comfortable with your spells, unlocking the Spellcasting Affinity perk and reducing fatigue cost of spells by 20%!\n\n".bold());
            character.perks.add(PerkType.SpellcastingAffinity, { spellCost: { flat: 20 } });
        }
        if (PlayerFlags.SPELLS_CAST >= 15 && character.perks.get(PerkType.SpellcastingAffinity)!.values.spellCost.flat < 35) {
            CView.text("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            character.perks.get(PerkType.SpellcastingAffinity)!.values.spellCost.flat = 35;
        }
        if (PlayerFlags.SPELLS_CAST >= 45 && character.perks.get(PerkType.SpellcastingAffinity)!.values.spellCost.flat < 50) {
            CView.text("You've become more comfortable with your spells, further reducing your spell costs by an additional 15%!\n\n".bold());
            character.perks.get(PerkType.SpellcastingAffinity)!.values.spellCost.flat = 50;
        }
    }
}
