import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { Character } from '../../Character/Character';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { ItemDesc } from '../ItemDesc';
import { CView } from '../../../Page/ContentView';
import { CombatManager } from '../../Combat/CombatManager';

export class FishFillet extends Consumable {
    public constructor() {
        super(ConsumableName.FishFillet, new ItemDesc("FishFil", "a fish fillet", "A perfectly cooked piece of fish.  You're not sure what type of fish is, since you're fairly certain \"delicious\" is not a valid species."));
    }

    public use(character: Character) {
        CView.clear();
        if (!CombatManager.inCombat)
            CView.text("You sit down and unwrap your fish fillet. It's perfectly flaky, allowing you to break it off in bite-sized chunks.  The salty meal disappears quickly, and your stomach gives an appreciative gurgle.");
        // (In combat?)
        else
            CView.text("You produce the fish fillet from your bag.  Rather than unwrap it and savor the taste as you normally would, you take a large bite out of it, leaf wrapping and all.  In no time your salty meal is gone, your stomach giving an appreciative gurgle.");

        // Increase HP by quite a bit!)
        // (Slight chance at increasing Toughness?)
        // (If lake has been tainted, +1 Corruption?)
        if (character.effects.has(StatusEffectType.FactoryOverload)) character.stats.cor += 0.5;
        character.stats.cor += 0.1;
        character.stats.HP += Math.round(character.stats.maxHP() * .25);
    }
}
