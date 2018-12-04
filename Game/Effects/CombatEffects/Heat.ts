import { randInt } from 'Engine/Utilities/SMath';
import { Character } from 'Game/Character/Character';
import { describeVagina } from 'Game/Descriptors/VaginaDescriptor';
import { CView } from 'Page/ContentView';
import { Effect } from '../Effect';

export class Heat extends Effect {
    public combatTurnStart(character: Character, enemy: Character) {
        const selVagina = character.body.vaginas.get(0);
        if (selVagina && enemy.body.cocks.length > 0) {
            character.stats.lust += (randInt(character.stats.lib / 5) + 3 + randInt(5));
            CView.text("Your " + describeVagina(character, selVagina) + " clenches with an instinctual desire to be touched and filled.  If you don't end this quickly you'll give in to your heat.");
            CView.text("\n\n");
        }
    }
}
