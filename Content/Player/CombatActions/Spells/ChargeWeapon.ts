import { WhiteMagic } from './WhiteMagic';
import { EffectType } from 'Content/Effects/EffectType';
import { Character } from 'Content/Character/GameCharacter';
import { CView } from 'Page/ContentView';
import { CanUseResult } from 'Engine/Combat/Actions/CombatAction';

export class ChargeWeapon extends WhiteMagic {
    public name = "Charge W.";
    public readonly baseCost = 15;

    public isPossible(character: Character): boolean {
        return character.effects.has(EffectType.KnowsCharge);
    }

    public canUse(character: Character, monster: Character): CanUseResult {
        if (character.effects.has(EffectType.ChargeWeapon)) {
            return { canUse: false, reasonCannotUse: "<b>Charge weapon is already active and cannot be cast again.</b>\n\n" };
        }
        return super.canUse(character, monster);
    }

    public consumeComponents(character: Character, monster: Character): void {
        character.stats.fatigueMagic(this.baseCost);
    }

    public useAction(character: Character, monster: Character): void {
        CView.clear();
        CView.text("You utter words of power, summoning an electrical charge around your " + character.inventory.weapon.displayName + ".  It crackles loudly, ensuring you'll do more damage with it for the rest of the fight.\n\n");
    }

    public checkHit(character: Character, monster: Character): boolean {
        return true;
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        character.effects.create(EffectType.ChargeWeapon, { attack: { value: { flat: 10 * character.combat.spellMod() } } });
    }
}
