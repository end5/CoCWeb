import { WhiteMagic } from './WhiteMagic';
import { randInt } from '../../../../../Engine/Utilities/SMath';
import { StatusEffectType } from '../../../../Effects/StatusEffectType';
import { Character } from '../../../Character';
import { CView } from '../../../../../Page/ContentView';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class Blind extends WhiteMagic {
    public name: string = "Blind";
    public readonly baseCost: number = 20;

    public isPossible(character: Character): boolean {
        return character.effects.has(StatusEffectType.KnowsBlind);
    }

    public canUse(character: Character, monster: Character): boolean {
        if (monster.combat.effects.has(CombatEffectType.Blind)) {
            this.reasonCannotUse = "<b>" + monster.desc.capitalA + monster.desc.short + " is already affected by blind.</b>\n\n";
            return false;
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
        monster.combat.effects.add(CombatEffectType.Blind, character, { duration: 5 * character.combat.stats.spellMod() });
        CView.text("\n\n");
    }
}
