import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { Gender } from '../../Body/GenderIdentity';
import { Character } from '../../Character/Character';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { ItemDesc } from '../ItemDesc';
import { CView } from '../../../Page/ContentView';
import { FlagType } from '../../FlagType';
import { Flags } from '../../Flags';

export const CeruleanPotionFlags = {
    CERULEAN_POTION_NEUTER_ATTEMPTED: 0,
    CERULEAN_POTION_HERM_USED: 0,
    TIMES_DRANK: 0,
};

Flags.set(FlagType.CeruleanPotion, CeruleanPotionFlags);

export class CeruleanPotion extends Consumable {
    public constructor() {
        super(ConsumableName.CeruleanPotion, new ItemDesc("Cerulean P.", "a cerulean-tinted potion", "This is a mysterious bottle filled with a sky-blue liquid that sloshes gently inside.  Supposedly it will make you irresistible, though to what or who you cannot say."));
    }

    public use(character: Character) {
        character.slimeFeed();
        // Repeat genderless encounters
        CView.clear();
        if (character.gender === Gender.NONE && CeruleanPotionFlags.CERULEAN_POTION_NEUTER_ATTEMPTED > 0) {
            CView.text("You take another sip of the Cerulean Potion.  You find it soothing and become very excited about the possibility of another visit from the succubus.");
        }
        else if (character.gender === Gender.HERM && CeruleanPotionFlags.CERULEAN_POTION_HERM_USED > 0) {
            CView.text("With anticipation, you chug down another bottle of the Cerulean Potion. A warm sensation radiates out from your stomach as you feel the potion course through your body.");
        }
        // All else
        else {
            CView.text("The liquid tastes rather bland and goes down easily. ");
            // Special repeat texts
            if (character.effects.has(StatusEffectType.RepeatSuccubi))
                CView.text("You look forwards to tonight's encounter.");
            // First timer huh?
            else CView.text("You do not notice any real effects.  Did the merchant con you?");
        }
        if (CeruleanPotionFlags.TIMES_DRANK < 3)
            CeruleanPotionFlags.TIMES_DRANK++;
    }
}
