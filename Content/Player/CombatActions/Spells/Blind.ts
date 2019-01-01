import { WhiteMagic } from './WhiteMagic';
import { randInt } from 'Engine/Utilities/SMath';
import { EffectType } from 'Content/Effects/EffectType';
import { Character } from 'Content/Character/GameCharacter';
import { CView } from 'Page/ContentView';
import { CanUseResult } from 'Engine/Combat/Actions/CombatAction';

export class Blind extends WhiteMagic {
    public name = "Blind";
    public readonly baseCost = 20;

    public isPossible(character: Character): boolean {
        return character.effects.has(EffectType.KnowsBlind);
    }

    public canUse(character: Character, monster: Character): CanUseResult {
        if (monster.effects.has(EffectType.Blind)) {
            return { canUse: false, reasonCannotUse: "<b>" + monster.desc.capitalA + monster.desc.short + " is already affected by blind.</b>\n\n" };
        }
        return super.canUse(character, monster);
    }

    public consumeComponents(character: Character, monster: Character): void {
        character.stats.fatigueMagic(this.baseCost);
    }

    public useAction(character: Character, monster: Character): void {
        CView.clear();
        CView.text("You glare at " + monster.desc.a + monster.desc.short + " and point at " + monster.desc.objectivePronoun + ".  A bright flash erupts before " + monster.desc.objectivePronoun + "!\n");
    }

    public checkHit(character: Character, monster: Character): boolean {
        return randInt(3) !== 0;
    }

    public missed(character: Character, monster: Character): void {
        CView.text(monster.desc.capitalA + monster.desc.short + " blinked!");
        CView.text("\n\n");
    }

    public applyDamage(character: Character, monster: Character, damage: number, lust: number, crit: boolean): void {
        CView.text(" <b>" + monster.desc.capitalA + monster.desc.short + " ");
        if (monster.desc.plural && monster.desc.short !== "imp horde") CView.text("are blinded!</b>");
        else CView.text("is blinded!</b>");
        monster.effects.create(EffectType.Blind, { expireCountdown: 5 * character.combat.spellMod() });
        CView.text("\n\n");
    }
}
