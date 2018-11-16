import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { Character } from '../../Character/Character';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { ItemDesc } from '../ItemDesc';
import { CView } from '../../../Page/ContentView';

export class HerbalContraceptive extends Consumable {
    public constructor() {
        super(ConsumableName.HerbalContraceptive, new ItemDesc("HrblCnt", "a bundle of verdant green leaves", "A small bundle of verdant green leaves."));
    }

    public use(character: Character) {
        CView.clear();

        // Placeholder, sue me
        CView.text("You chew on the frankly awfully bitter leaves as quickly as possible before swallowing them down.");

        character.effects.add(StatusEffectType.Contraceptives, { expireCountdown: 48 });
    }
}
