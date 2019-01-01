import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';

export class HerbalContraceptive extends Consumable {
    public constructor() {
        super(ConsumableName.HerbalContraceptive, new ItemDesc("HrblCnt", "a bundle of verdant green leaves", "A small bundle of verdant green leaves."));
    }

    public use(character: Character) {
        CView.clear();

        // Placeholder, sue me
        CView.text("You chew on the frankly awfully bitter leaves as quickly as possible before swallowing them down.");

        character.effects.create(EffectType.Contraceptives, { expireCountdown: 48 });
    }
}
