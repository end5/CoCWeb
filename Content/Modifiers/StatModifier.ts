import { Character } from 'Engine/Character/Character';
import { CView } from 'Engine/Display/ContentView';

export function displayCharacterHPChange(character: Character, changeAmount: number) {
    if (changeAmount > 0 && character.stats.HP === character.stats.base.HP.max) {
        CView.text("You're as healthy as you can be.\n");
        return;
    }

    const oldHP = character.stats.HP;
    character.stats.HP += changeAmount;
    const diff = character.stats.HP - oldHP;

    if (diff > 0) {
        if (character.stats.HP === character.stats.base.HP.max)
            CView.text("Your HP maxes out at " + character.stats.base.HP.max + ".\n");
        else
            CView.text("You gain " + diff + " HP.\n");
    }
    // Negative HP
    else if (diff < 0) {
        if (character.stats.HP === 0)
            CView.text("You take " + diff + " damage, dropping your HP to 0.\n");
        else
            CView.text("You take " + diff + " damage.\n");
    }
}
