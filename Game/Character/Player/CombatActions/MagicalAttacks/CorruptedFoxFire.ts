import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { Character } from '../../../Character';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';
import { IActionDamage } from '../../../../Combat/Actions/CombatAction';

export class CorruptedFoxFire extends PlayerSpellAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "C.FoxFire";
    public readonly baseCost: number = 35;

    public isPossible(character: Character): boolean {
        return character.perks.has(PerkType.CorruptedNinetails);
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
        // Deals direct damage and lust regardless of enemy defenses.  Especially effective against non-corrupted targets.
        CView.text("Holding out your palm, you conjure corrupted purple flame that dances across your fingertips.  You launch it at " + monster.desc.a + monster.desc.short + " with a ferocious throw, and it bursts on impact, showering dazzling lavender sparks everywhere.");
    }

    public calcDamage(character: Character, monster: Character): IActionDamage {
        let damage = Math.floor(10 + (character.stats.int / 3 + randInt(character.stats.int / 2)) * character.combat.stats.spellMod());
        if (monster.stats.cor >= 66) damage = Math.round(damage * .66);
        else if (monster.stats.cor >= 50) damage = Math.round(damage * .8);

        return { damage };
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        damage = monster.combat.stats.loseHP(damage);
        CView.text("  (" + damage + ")\n\n");
    }
}
