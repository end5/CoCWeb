import { randInt } from 'Engine/Utilities/SMath';
import { EffectType } from 'Content/Effects/EffectType';
import { NextScreenChoices } from 'Engine/ScreenDisplay';
import { Character } from 'Content/Character/GameCharacter';
import { CombatActionType } from 'Engine/Combat/Actions/CombatActionType';
import { CombatAction } from 'Engine/Combat/Actions/CombatAction';

export class ImmolationSpell extends CombatAction {
    public flags = CombatActionType.MagicSpec;
    public name: string = "Immolation";

    public isPossible(character: Character): boolean {
        return character.effects.has(EffectType.ImmolationSpell);
    }

    public canUse(character: Character): boolean {
        return character.effects.has(EffectType.ImmolationSpell);
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        CView.text("You gather energy in your Talisman and unleash the spell contained within.  A wave of burning flames gathers around " + monster.desc.a + monster.desc.short + ", slowly burning " + monster.desc.objectivePronoun + ".");
        let damage: number = Math.floor(75 + (character.stats.int / 3 + randInt(character.stats.int / 2)) * character.combat.spellMod());
        damage = monster.combat.loseHP(damage, character);
        CView.text(" (" + damage + ")\n\n");
        character.effects.remove(EffectType.ImmolationSpell);
        // Scenes.arianScene.clearTalisman();
    }
}
