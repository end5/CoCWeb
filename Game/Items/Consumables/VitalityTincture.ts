import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { Character } from 'Game/Character/Character';
import { ItemDesc } from '../ItemDesc';
import { CView } from 'Page/ContentView';
import { displayModTone } from 'Game/Modifiers/BodyModifier';

export class VitalityTincture extends Consumable {
    public constructor() {
        super(ConsumableName.VitalityTincture, new ItemDesc("Vitality T.", "a vitality tincture", "This potent tea is supposedly good for strengthening the body."));
    }

    public use(character: Character) {
        CView.clear();
        CView.text("You down the contents of the bottle. The liquid is thick and tastes remarkably like cherries. Within moments, you feel much more fit and healthy.");
        // str change
        let strChange: number = randInt(3);
        character.stats.str = strChange;
        // Garunteed toughness if no str
        if (strChange === 0) {
            strChange = randInt(3);
            if (strChange === 0)
                strChange = 1;
        }
        else
            strChange = randInt(3);
        // tou change
        character.stats.tou = strChange;
        // Chance of fitness change
        if (character.stats.HP + 50 !== character.stats.maxHP()) {
            character.stats.HP += 50;
            CView.text("  Any aches, pains and bruises you have suffered no longer hurt and you feel much better.");
        }
        if (randInt(3) === 0)
            CView.text(displayModTone(character, 95, 3));
    }
}
