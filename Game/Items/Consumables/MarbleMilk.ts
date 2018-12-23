import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { Character } from 'Game/Character/Character';
import { EffectType } from 'Game/Effects/EffectType';
import { ItemDesc } from '../ItemDesc';
import { CView } from 'Page/ContentView';
import { displayCharacterHPChange } from 'Game/Modifiers/StatModifier';

export class MarbleMilk extends Consumable {
    public constructor() {
        super(ConsumableName.MarbleMilk, new ItemDesc("M. Milk", "a clear bottle of milk from Marble", "A clear bottle of milk from Marble's breasts. It smells delicious."));
    }

    public use(character: Character) {
        // Bottle of Marble's milk - item
        // Description: "A clear bottle of milk from Marble's breasts. �It smells delicious.  "
        CView.clear();
        // Text for when the character uses the bottle:
        // [before the character is addicted, Addiction < 30]
        const marbleEffect = character.effects.getByName(EffectType.Marble);
        const marblesMilkEffect = character.effects.getByName(EffectType.MarblesMilk);
        if (marbleEffect && marbleEffect.values.str.total.flat < 30 && marblesMilkEffect && marblesMilkEffect.values.tou.total.flat === 0)
            CView.text("You gulp down the bottle's contents; Marble makes some good tasting milk.\n\n");
        // [before the character is addicted, Addiction < 50]
        else if (marblesMilkEffect && marblesMilkEffect.values.tou.total.flat <= 0)
            CView.text("You gulp down the bottle's contents; Marble makes some really good tasting milk.\n\n");
        else if (marblesMilkEffect && marblesMilkEffect.values.tou.total.flat > 0) {
            // [character is completely addicted]
            if (character.effects.has(EffectType.MarblesMilk)) CView.text("You gulp down the bottle's contents; it's no substitute for the real thing, but it's a nice pick me up.\n\n");
            else {
                // [character is no longer addicted]
                if (character.effects.has(EffectType.MarbleResistant)) CView.text("You gulp down the bottle's contents; you're careful not to get too attached to the taste.\n\n");
                // [character is addicted]
                else CView.text("You gulp down the bottle's contents; you really needed that.\n\n");
            }
        }
        // Increases addiction by 5, up to a max of 50 before the character becomes addicted, no max after the character is addicted.
        // Scenes.marbleScene.marbleStatusChange(0, 5);
        // Does not apply the 'Marble's Milk' effect
        // Purge withdrawl
        if (character.effects.has(EffectType.MarbleWithdrawl)) {
            character.effects.removeByName(EffectType.MarbleWithdrawl);
            character.stats.tou += 5;
            character.stats.int += 5;
            CView.text("You no longer feel the symptoms of withdrawal.\n\n");
        }
        // Heals the character 70-100 health
        displayCharacterHPChange(character, 70 + randInt(31));
        // Restores a portion of fatigue (once implemented)
        character.stats.fatigue -= 25;
        // If the character is addicted, this item negates the withdrawal effects for a few hours (suggest 6), there will need to be a check here to make sure the withdrawal effect doesn't reactivate while the character is under the effect of 'Marble's Milk'.
        if (character.effects.has(EffectType.BottledMilk)) {
            character.effects.create(EffectType.BottledMilk)!.values.expireCountdown = (6 + randInt(6));
        }
        else character.effects.create(EffectType.BottledMilk, { expireCountdown: 12 });
    }
}
