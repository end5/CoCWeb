import { Character } from 'Engine/Character/Character';
import { CView } from 'Engine/Display/ContentView';
import { Effect } from 'Engine/Effects/Effect';

export class KissOfDeath extends Effect {
    public combatTurnStart(character: Character) {
        character.stats.lust += 5;
        character.combat.loseHP(15);
        CView.text("Your lips burn with an unexpected flash of heat.  They sting and burn with unholy energies as a puff of ectoplasmic gas escapes your lips.  That puff must be a part of your soul!  It darts through the air to the succubus, who slurps it down like a delicious snack.  You feel feverishly hot and exhausted...");
        CView.text("\n\n");
    }
}
