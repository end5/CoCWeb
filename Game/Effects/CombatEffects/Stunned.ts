import { Character } from 'Game/Character/Character';
import { CharacterType } from 'Game/Character/CharacterType';
import { CView } from 'Page/ContentView';
import { Effect } from '../Effect';

export class Stunned extends Effect {
    public combatTurnStart(character: Character) {
        if (character.charType !== CharacterType.Player) {
            CView.text("<b>" + character.desc.capitalA + character.desc.short + " is still stunned!</b>");
            CView.text("\n\n");
        }
    }
}
