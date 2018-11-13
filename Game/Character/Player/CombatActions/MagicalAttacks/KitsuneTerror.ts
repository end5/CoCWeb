import { randInt } from '../../../../../Engine/Utilities/SMath';
import { PerkType } from '../../../../Effects/PerkType';
import { Character } from '../../../Character';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from '../../../../../Page/ContentView';
import { CombatActionFlags } from '../../../../Effects/CombatActionFlag';
import { CombatEffectType } from '../../../../Effects/CombatEffectType';

export class KitsuneTerror extends PlayerSpellAction {
    public flag: CombatActionFlags = CombatActionFlags.MagicSpec;
    public name: string = "Terror";
    public readonly baseCost: number = 20;

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
        // Fatigue Cost: 25
        character.stats.fatigueMagic(this.baseCost);
    }

    public useAction(character: Character, monster: Character): void {
        CView.clear();
        // Inflicts fear and reduces enemy SPD.
        CView.text("The world goes dark, an inky shadow blanketing everything in sight as you fill " + monster.desc.a + monster.desc.short + "'s mind with visions of otherworldly terror that defy description.");
    }

    public checkMiss(character: Character, monster: Character): boolean {
        return character.stats.int / 10 + randInt(20) + 1 > monster.stats.int / 10 + 10;
    }

    public missed(character: Character, monster: Character): void {
        CView.text("  The dark fog recedes as quickly as it rolled in as they push back your illusions, resisting your hypnotic influence.\n\n");
    }

    public applyDamage(character: Character, monster: Character, damage?: number, lust?: number, crit?: boolean): void {
        CView.text("  They cower in horror as they succumb to your illusion, believing themselves beset by eldritch horrors beyond their wildest nightmares.\n\n");
        monster.combat.effects.add(CombatEffectType.Fear, character, {
            duration: 1
        });
        monster.stats.spe -= 5;
        if (monster.stats.spe < 1)
            monster.stats.spe = 1;
    }
}
