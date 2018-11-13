import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CView } from '../../../Page/ContentView';

export class Stunned extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            CView.text("<b>" + character.desc.capitalA + character.desc.short + " is still stunned!</b>");
            CView.text("\n\n");
        }
    }
}
