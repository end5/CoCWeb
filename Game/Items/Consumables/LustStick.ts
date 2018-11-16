import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { ItemDesc } from '../ItemDesc';
import { CView } from '../../../Page/ContentView';

export class LustStick extends Consumable {

    public constructor() {
        super(ConsumableName.LustStick, new ItemDesc("LustStk", "a tube of golden lipstick", "This tube of golden lipstick is used by harpies to keep males aroused.  It has aphrodisiac properties on anyone with male genitalia and is most effective when applied to the lips or groin."));
    }

    public canUse(character: Character): boolean {
        if (character.body.cocks.length > 0 && !character.perks.has(PerkType.LuststickAdapted)) {
            CView.text("You look at the tube of lipstick, but get the idea it would be a pretty bad idea to smear a thick coating of cock-hardening aphrodisiacs over your own lips.  ");
            return false;
        }
        return true;
    }

    public use(character: Character) {
        if (character.effects.has(StatusEffectType.LustStickApplied)) {
            character.effects.get(StatusEffectType.LustStickApplied)!.values.expireCountdown = randInt(12) + 12;
            CView.text("You carefully open the sweet-smelling tube and smear the lipstick over the coat you already have on your lips.  <b>No doubt another layer will make it last even longer!</b>  ");
            CView.text("You finish and pucker your lips, feeling fairly sexy with your new, thicker makeup on.\n\n");
        }
        else {
            character.effects.add(StatusEffectType.LustStickApplied, { expireCountdown: 24 });
            CView.text("You carefully open the sweet-smelling tube and smear the lipstick over your lips.  ");
            if (character.body.cocks.length > 0) CView.text("It tingles a little, but the drugs have little to no effect on you now.");
            else CView.text("Honestly, it amazes you that something as little as a kiss can make a man putty in your hands.");
            CView.text("  You finish and pucker your lips, feeling fairly sexy with your new makeup on.\n\n");
        }
        character.stats.lust += 1;
    }
}
