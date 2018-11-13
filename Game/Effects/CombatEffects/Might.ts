import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';

export class Might extends CombatEffect {
    public onRemove(character: Character) {
        character.stats.str += -this.values.str.value.flat;
        character.stats.tou += -this.values.tou.value.flat;
    }
}
