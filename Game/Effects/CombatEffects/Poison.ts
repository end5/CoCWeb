import { randInt } from 'Engine/Utilities/SMath';
import { Character } from 'Game/Character/Character';
import { EffectType } from '../EffectType';
import { CView } from 'Page/ContentView';
import { Effect } from '../Effect';

export class Poison extends Effect {
    public combatTurnStart(character: Character) {
        if (character.effects.has(EffectType.Medicine) && randInt(100) <= 14) {
            character.effects.removeByName(EffectType.Poison);
            CView.text("You manage to cleanse the poison from your system with your knowledge of medicine!");
        }
        else {
            character.combat.loseHP(8 + randInt(character.stats.maxHP() / 20));
            CView.text("The poison continues to work on your body, wracking you with pain!");
        }
        CView.text("\n\n");
    }
}
