import { randInt } from 'Engine/Utilities/SMath';
import { EffectType } from 'Content/Effects/EffectType';
import { Character } from 'Content/Character/GameCharacter';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from 'Page/ContentView';
import { IActionDamage, CanUseResult } from 'Engine/Combat/Actions/CombatAction';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export class CorruptedFoxFire extends PlayerSpellAction {
    public name = "C.FoxFire";
    public type = CombatActionType.MagicSpec;
    public readonly baseCost: number = 35;

    public isPossible(character: Character): boolean {
        return character.effects.has(EffectType.CorruptedNinetails);
    }

    public canUse(character: Character, monster: Character): CanUseResult {
        if (!character.effects.has(EffectType.BloodMage) && character.stats.fatigue + this.spellCost(character) > 100) {
            return { canUse: false, reasonCannotUse: "You are too tired to use this ability." };
        }
        if (character.effects.has(EffectType.ThroatPunch) || character.effects.has(EffectType.WebSilence)) {
            return { canUse: false, reasonCannotUse: "You cannot focus to use this ability while you're having so much difficult breathing." };
        }
        return { canUse: true };
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
        let damage = Math.floor(10 + (character.stats.int / 3 + randInt(character.stats.int / 2)) * character.combat.spellMod());
        if (monster.stats.cor >= 66) damage = Math.round(damage * .66);
        else if (monster.stats.cor >= 50) damage = Math.round(damage * .8);

        return { damage };
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        damage = monster.combat.loseHP(damage);
        CView.text("  (" + damage + ")\n\n");
    }
}
