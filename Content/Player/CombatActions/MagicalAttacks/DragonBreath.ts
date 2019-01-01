import { randInt } from 'Engine/Utilities/SMath';
import { EffectType } from 'Content/Effects/EffectType';
import { Character } from 'Content/Character/GameCharacter';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from 'Page/ContentView';
import { CanUseResult } from 'Engine/Combat/Actions/CombatAction';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';

export class DragonBreath extends PlayerSpellAction {
    public name = "DragonFire";
    public type = CombatActionType.MagicSpec;
    public readonly baseCost: number = 20;

    public isPossible(character: Character): boolean {
        return character.effects.has(EffectType.Dragonfire);
    }

    public canUse(character: Character, monster: Character): CanUseResult {
        if (!character.effects.has(EffectType.BloodMage) && character.stats.fatigue + this.spellCost(character) > 100) {
            return { canUse: false, reasonCannotUse: "You are too tired to breathe fire." };
        }
        // Not Ready Yet:
        if (character.effects.has(EffectType.DragonBreathCooldown)) {
            return { canUse: false, reasonCannotUse: "You try to tap into the power within you, but your burning throat reminds you that you're not yet ready to unleash it again..." };
        }
        return { canUse: true };
    }

    public consumeComponents(character: Character, monster: Character): void {
        character.stats.fatigueMagic(this.baseCost);
    }

    public useAction(character: Character, monster: Character): void {
        CView.clear();
        character.effects.create(EffectType.DragonBreathCooldown);
        CView.text("Tapping into the power deep within you, you let loose a bellowing roar at your enemy, so forceful that even the environs crumble around " + monster.desc.objectivePronoun + ".  " + monster.desc.capitalA + monster.desc.short + " does " + monster.desc.possessivePronoun + " best to avoid it, but the wave of force is too fast.");
    }

    public checkMiss(character: Character, monster: Character): boolean {
        return (character.effects.has(EffectType.Blind) && randInt(2) === 0) || (monster.stats.spe - character.stats.spe > 0 && Math.floor(Math.random() * (((monster.stats.spe - character.stats.spe) / 4) + 80)) > 80);
    }

    public missed(character: Character, monster: Character): void {
        CView.text("  Despite the heavy impact caused by your roar, " + monster.desc.a + monster.desc.short + " manages to take it at an angle and remain on " + monster.desc.possessivePronoun + " feet and focuses on you, ready to keep fighting.");
    }

    public calcDamage(character: Character, monster: Character): { damage: number, crit?: boolean } {
        let damage: number = Math.floor(character.stats.level * 8 + 25 + randInt(10));
        if (character.effects.has(EffectType.DragonBreathBoost)) {
            character.effects.removeByName(EffectType.DragonBreathBoost);
            damage *= 1.5;
        }
        if (monster.effects.has(EffectType.Sandstorm)) {
            CView.text("  <b>Your breath is massively dissipated by the swirling vortex, causing it to hit with far less force!</b>");
            damage = Math.round(0.2 * damage);
        }
        return { damage };
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        if (!monster.effects.has(EffectType.Resolute)) {
            CView.text("  " + monster.desc.capitalA + monster.desc.short + " reels as your wave of force slams into " + monster.desc.objectivePronoun + " like a ton of rock!  The impact sends " + monster.desc.objectivePronoun + " crashing to the ground, too dazed to strike back.");
            monster.effects.create(EffectType.Stunned, { expireCountdown: 1 });
        }
        else {
            CView.text("  " + monster.desc.capitalA + monster.desc.short + " reels as your wave of force slams into " + monster.desc.objectivePronoun + " like a ton of rock!  The impact sends " + monster.desc.objectivePronoun + " staggering back, but <b>" + monster.desc.subjectivePronoun + " ");
            if (!monster.desc.plural) CView.text("is ");
            else CView.text("are");
            CView.text("too resolute to be stunned by your attack.</b>");
        }
        damage = monster.combat.loseHP(damage);
        CView.text(" (" + damage + ")");
        CView.text("\n\n");
    }
}
