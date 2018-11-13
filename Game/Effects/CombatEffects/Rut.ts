import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { describeCocksLight } from '../../Descriptors/CockDescriptor';
import { describeVagina } from '../../Descriptors/VaginaDescriptor';
import { CView } from '../../../Page/ContentView';

export class Rut extends CombatEffect {
    public update(character: Character, enemy: Character) {
        const enemyVagina = enemy.body.vaginas.get(0);
        if (character.body.cocks.length > 0 && enemyVagina) {
            character.stats.lust += (randInt(character.stats.lib / 5) + 3 + randInt(5));
            let out: string;
            if (character.body.cocks.length > 1)
                out = "Each of y";
            else
                out = "Y";

            if (enemy.desc.plural)
                out += "our " + describeCocksLight(character) + " dribbles pre-cum as you think about plowing " + enemy.desc.a + enemy.desc.short + " right here and now, fucking " + enemy.desc.possessivePronoun + " " + describeVagina(enemy, enemyVagina) + "s until they're totally fertilized and pregnant.";
            else
                out += "our " + describeCocksLight(character) + " dribbles pre-cum as you think about plowing " + enemy.desc.a + enemy.desc.short + " right here and now, fucking " + enemy.desc.possessivePronoun + " " + describeVagina(enemy, enemyVagina) + " until it's totally fertilized and pregnant.";
            CView.text(out);
            CView.text("\n\n");
        }
    }
}
