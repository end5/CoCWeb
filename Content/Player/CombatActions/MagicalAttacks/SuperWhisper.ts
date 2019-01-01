import { randInt } from 'Engine/Utilities/SMath';
import { EffectType } from 'Content/Effects/EffectType';
import { EffectType } from 'Content/Effects/EffectType';
import { NextScreenChoices } from 'Engine/ScreenDisplay';
import { Character } from 'Content/Character/GameCharacter';
import { CharacterType } from 'Engine/Character/CharacterType';
import { PlayerSpellAction } from '../PlayerSpellAction';
import { CView } from 'Engine/Display/ContentView';
import { CombatAbilityFlag } from 'Engine/Effects/CombatAbilityFlag';

export class SuperWhisperAttack extends PlayerSpellAction {
    public flags: CombatAbilityFlag = CombatAbilityFlag.MagicSpec;
    public name: string = "Whisper";
    public readonly baseCost: number = 10;

    public isPossible(character: Character): boolean {
        return character.effects.has(EffectType.Whispered);
    }

    public canUse(character: Character): boolean {
        if (!character.effects.has(EffectType.BloodMage) && character.stats.fatigue + this.spellCost(character) > 100) {
            this.reasonCannotUse = "You are too tired to use this ability.";
            return false;
        }
        if (character.effects.has(EffectType.ThroatPunch) || character.effects.has(EffectType.WebSilence)) {
            this.reasonCannotUse = "You cannot focus to use this ability while you're having so much difficult breathing.";
            return false;
        }
        return true;
    }

    public use(character: Character, monster: Character): void | NextScreenChoices {
        CView.clear();
        if (monster.desc.short === "pod" || monster.stats.int === 0) {
            CView.text("You reach for the enemy's mind, but cannot find anything.  You frantically search around, but there is no consciousness as you know it in the room.\n\n");
            character.stats.fatigue++;
            return;
        }
        if (monster.charType === CharacterType.LivingStatue) {
            CView.text("There is nothing inside the golem to whisper to.");
            character.stats.fatigue++;
            return;
        }
        character.stats.fatigueMagic(this.baseCost);
        if (monster.effects.has(EffectType.Shell)) {
            CView.text("As soon as your magic touches the multicolored shell around " + monster.desc.a + monster.desc.short + ", it sizzles and fades to nothing.  Whatever that thing is, it completely blocks your magic!\n\n");
            return;
        }
        if (monster.effects.has(EffectType.Focused)) {
            if (!monster.desc.plural)
                CView.text(monster.desc.capitalA + monster.desc.short + " is too focused for your whispers to influence!\n\n");
            return;
        }
        // Enemy too strong or multiplesI think you
        if (character.stats.int < monster.stats.int || monster.desc.plural) {
            CView.text("You reach for your enemy's mind, but can't break through.\n");
            character.stats.fatigue += 10;
            return;
        }
        // [Failure]
        if (randInt(10) === 0) {
            CView.text("As you reach for your enemy's mind, you are distracted and the chorus of voices screams out all at once within your mind. You're forced to hastily silence the voices to protect yourself.");
            character.stats.fatigue += 10;
            return;
        }
        CView.text("You reach for your enemy's mind, watching as its sudden fear petrifies your foe.\n\n");
        monster.effects.add(EffectType.Fear, 1, 0, 0, 0);
    }
}
