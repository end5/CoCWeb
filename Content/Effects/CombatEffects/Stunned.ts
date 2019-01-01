import { Character } from 'Engine/Character/Character';
import { CharacterType } from 'Content/Character/CharacterType';
import { CView } from 'Engine/Display/ContentView';
import { Effect } from 'Engine/Effects/Effect';

export class Stunned extends Effect {
    public combatTurnStart(character: Character) {
        if (character.charType !== CharacterType.Player) {
            CView.text("<b>" + character.desc.capitalA + character.desc.short + " is still stunned!</b>");
            CView.text("\n\n");
        }
    }
}
