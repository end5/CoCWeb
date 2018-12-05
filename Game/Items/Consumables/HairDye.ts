import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { Character } from 'Game/Character/Character';
import { ItemDesc } from '../ItemDesc';
import { describeHair } from 'Game/Descriptors/HairDescriptor';
import { CView } from 'Page/ContentView';

export enum HairDyeType {
    Auburn,
    Black,
    Blonde,
    DarkBlue,
    Brown,
    Gray,
    Green,
    BrightOrange,
    NeonPink,
    Purple,
    Red,
    White
}

export class HairDye extends Consumable {
    public constructor(type: HairDyeType) {
        switch (type) {
            case HairDyeType.Auburn:
                super(ConsumableName.HairDyeAuburn, new ItemDesc("AuburnD", "a vial of auburn hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
            case HairDyeType.Black:
                super(ConsumableName.HairDyeBlack, new ItemDesc("Black D", "a vial of black hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
            case HairDyeType.Blonde:
                super(ConsumableName.HairDyeBlonde, new ItemDesc("Blond D", "a vial of blonde hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
            case HairDyeType.DarkBlue:
                super(ConsumableName.HairDyeDarkBlue, new ItemDesc("BlueDye", "a vial of blue hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
            case HairDyeType.Brown:
                super(ConsumableName.HairDyeBrown, new ItemDesc("Brown D", "a vial of brown hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
            case HairDyeType.Gray:
                super(ConsumableName.HairDyeGray, new ItemDesc("GrayDye", "a vial of gray hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
            case HairDyeType.Green:
                super(ConsumableName.HairDyeGreen, new ItemDesc("Green D", "a vial of green hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
            case HairDyeType.BrightOrange:
                super(ConsumableName.HairDyeBrightOrange, new ItemDesc("OrangDy", "a vial of brilliant orange hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
            case HairDyeType.NeonPink:
                super(ConsumableName.HairDyeNeonPink, new ItemDesc("PinkDye", "a vial of bright pink hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
            case HairDyeType.Purple:
                super(ConsumableName.HairDyePurple, new ItemDesc("PurpDye", "a vial of purple hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
            case HairDyeType.Red:
                super(ConsumableName.HairDyeRed, new ItemDesc("Red Dye", "a vial of red hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
            default:
            case HairDyeType.White:
                super(ConsumableName.HairDyeWhite, new ItemDesc("WhiteDy", "a vial of white hair dye", "This bottle of dye will allow you to change the color of your hair.  Of course if you don't have hair, using this would be a waste."));
                break;
        }
    }

    private getColor(): string {
        switch (this.name) {
            case ConsumableName.HairDyeAuburn:
                return "auburn";
            case ConsumableName.HairDyeBlack:
                return "black";
            case ConsumableName.HairDyeBlonde:
                return "blonde";
            case ConsumableName.HairDyeDarkBlue:
                return "dark blue";
            case ConsumableName.HairDyeBrown:
                return "brown";
            case ConsumableName.HairDyeGray:
                return "gray";
            case ConsumableName.HairDyeGreen:
                return "green";
            case ConsumableName.HairDyeBrightOrange:
                return "bright orange";
            case ConsumableName.HairDyeNeonPink:
                return "neon pink";
            case ConsumableName.HairDyePurple:
                return "purple";
            case ConsumableName.HairDyeRed:
                return "red";
            default:
            case ConsumableName.HairDyeWhite:
                return "white";
        }
    }

    public use(character: Character) {
        CView.clear();
        if (character.body.hair.color.indexOf("rubbery") !== -1 || character.body.hair.color.indexOf("latex-textured") !== -1) {
            CView.text("You massage the dye into your " + describeHair(character) + " but the dye cannot penetrate the impermeable material your hair is composed of.");
            return;
        }
        if (character.body.hair.length === 0) {
            CView.text("You rub the dye into your bald head, but it has no effect.");
            return;
        }
        CView.text("You rub the dye into your " + describeHair(character) + ", then use a bucket of cool lakewater to rinse clean a few minutes later.  ");
        character.body.hair.color = this.getColor();
        CView.text("You now have " + describeHair(character) + ".");
        if (character.stats.lust > 50) {
            CView.text("\n\nThe cool water calms your urges somewhat, letting you think more clearly.");
            character.stats.lust += -15;
        }
    }
}
