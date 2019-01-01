import { randInt } from 'Engine/Utilities/SMath';
import { Character } from 'Engine/Character/Character';
import { CharacterType } from 'Content/Character/CharacterType';
import { CView } from 'Engine/Display/ContentView';
import { Effect } from 'Engine/Effects/Effect';

export class LustAura extends Effect {
    public combatTurnStart(character: Character, enemy: Character) {
        if (enemy.charType === CharacterType.Player) {
            // [LUST GAINED PER ROUND] - Omnibus
            enemy.stats.lust += 3 + Math.floor(enemy.stats.lib / 20 + enemy.stats.cor / 30);
            let out: string = "";
            if (enemy.stats.lust < 33) out += "Your groin tingles warmly.  The demon's aura is starting to get to you.";
            if (enemy.stats.lust >= 33 && enemy.stats.lust < 66) out += "You blush as the demon's aura seeps into you, arousing you more and more.";
            if (enemy.stats.lust >= 66) {
                out += "You flush bright red with desire as the lust in the air worms its way inside you.  ";
                const randomNumber = randInt(4);
                if (randomNumber === 0) out += "You have a hard time not dropping to your knees to service her right now.";
                if (randomNumber === 2) out += "The urge to bury your face in her breasts and suckle her pink nipples nearly overwhelms you.";
                if (randomNumber === 1) out += "You swoon and lick your lips, tasting the scent of the demon's pussy in the air.";
                if (randomNumber === 3) out += "She winks at you and licks her lips, and you can't help but imagine her tongue sliding all over your body.  You regain composure moments before throwing yourself at her.  That was close.";
            }
            CView.text(out);
            CView.text("\n\n");
        }
    }
}
