import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { Character } from 'Engine/Character/Character';
import { EffectType } from 'Content/Effects/EffectType';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { CView } from 'Engine/Display/ContentView';

export class PurePearl extends Consumable {
    public constructor() {
        super(ConsumableName.PurePearl, new ItemDesc("P.Pearl", "a pure pearl"), 1000);
    }

    public use(character: Character) {
        CView.clear();
        CView.text("You cram the pearl in your mouth and swallow it like a giant pill with some difficulty.  Surprisingly there is no discomfort, only a cool calming sensation that springs up from your core.");
        character.stats.lib += -5;
        character.stats.lust += -25;
        character.stats.cor += -10;
        if (!character.effects.has(EffectType.PurityBlessing))
            character.effects.create(EffectType.PurityBlessing);
    }
}
