import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { Character } from '../../../Character';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class KitsuneIllusion extends PlayerSpellAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "Illusion";
    public readonly baseCost: number = 25;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.EnlightenedNinetails);
    }

    public canUse(character: Character, monster: Character): boolean {
        if (!character.perks.has(PerkType.BloodMage) && character.stats.fatigue + this.spellCost(character) > 100) {
            this.reasonCannotUse = "You are too tired to use this ability.";
            return false;
        }
        if (character.combat.effects.has(CombatEffectType.ThroatPunch) || character.combat.effects.has(CombatEffectType.WebSilence)) {
            this.reasonCannotUse = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public consumeComponents(character: Character, monster: Character): void {
        character.stats.fatigueMagic(this.baseCost);
    }

    public useAction(character: Character, monster: Character): void {
        CView.clear();
        // Decrease enemy speed and increase their susceptibility to lust attacks if already 110% or more
        CView.text("The world begins to twist and distort around you as reality bends to your will, " + monster.desc.a + monster.desc.short + "'s mind blanketed in the thick fog of your illusions.");
    }

    public checkMiss(character: Character, monster: Character): boolean {
          // Check for success rate. Maximum 100% with over 90 Intelligence difference between PC and monster.
          return character.stats.int / 10 + randInt(20) > monster.stats.int / 10 + 9;
    }

    public missed(character: Character, monster: Character): void {
        CView.text("  Like the snapping of a rubber band, reality falls back into its rightful place as they resist your illusory conjurations.\n\n");
    }

    public applyDamage(character: Character, monster: Character, damage?: number, lust?: number, crit?: boolean): void {
        // Reduce speed down to -20. Um, are there many monsters with 110% lust vulnerability?
        CView.text("  They stumble humorously to and fro, unable to keep pace with the shifting illusions that cloud their perceptions.\n\n");
        if (monster.stats.spe >= 0) monster.stats.spe -= 20;
        if (monster.stats.lustVuln >= 1.1) monster.stats.lustVuln += .1;
    }
}
