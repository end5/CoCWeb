import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { ItemDesc } from '../ItemDesc';
import { CView } from '../../../Page/ContentView';
import { displayCharacterHPChange } from '../../Modifiers/StatModifier';

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
        const marbleEffect = character.effects.get(StatusEffectType.Marble);
        const marblesMilkEffect = character.effects.get(StatusEffectType.MarblesMilk);
        if (marbleEffect && marbleEffect.values.str.value.flat < 30 && marblesMilkEffect && marblesMilkEffect.values.tou.value.flat === 0)
            CView.text("You gulp down the bottle's contents; Marble makes some good tasting milk.\n\n");
        // [before the character is addicted, Addiction < 50]
        else if (marblesMilkEffect && marblesMilkEffect.values.tou.value.flat <= 0)
            CView.text("You gulp down the bottle's contents; Marble makes some really good tasting milk.\n\n");
        else if (marblesMilkEffect && marblesMilkEffect.values.tou.value.flat > 0) {
            // [character is completely addicted]
            if (character.perks.has(PerkType.MarblesMilk)) CView.text("You gulp down the bottle's contents; it's no substitute for the real thing, but it's a nice pick me up.\n\n");
            else {
                // [character is no longer addicted]
                if (character.perks.has(PerkType.MarbleResistant)) CView.text("You gulp down the bottle's contents; you're careful not to get too attached to the taste.\n\n");
                // [character is addicted]
                else CView.text("You gulp down the bottle's contents; you really needed that.\n\n");
            }
        }
        // Increases addiction by 5, up to a max of 50 before the character becomes addicted, no max after the character is addicted.
        // Scenes.marbleScene.marbleStatusChange(0, 5);
        // Does not apply the 'Marble's Milk' effect
        // Purge withdrawl
        if (character.effects.has(StatusEffectType.MarbleWithdrawl)) {
            character.effects.remove(StatusEffectType.MarbleWithdrawl);
            character.stats.tou += 5;
            character.stats.int += 5;
            CView.text("You no longer feel the symptoms of withdrawal.\n\n");
        }
        // Heals the character 70-100 health
        displayCharacterHPChange(character, 70 + randInt(31));
        // Restores a portion of fatigue (once implemented)
        character.stats.fatigue -= 25;
        // If the character is addicted, this item negates the withdrawal effects for a few hours (suggest 6), there will need to be a check here to make sure the withdrawal effect doesn't reactivate while the character is under the effect of 'Marble's Milk'.
        if (character.effects.has(StatusEffectType.BottledMilk)) {
            character.effects.get(StatusEffectType.BottledMilk)!.values.duration = (6 + randInt(6));
        }
        else character.effects.add(StatusEffectType.BottledMilk, { duration: 12 });
    }
}
