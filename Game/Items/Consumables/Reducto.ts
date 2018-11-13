import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { Cock, CockType } from '../../Body/Cock';
import { Character } from '../../Character/Character';
import { ClickOption, NextScreenChoices } from '../../ScreenDisplay';
import { ItemDesc } from '../ItemDesc';
import { describeSack, describeBallsShort } from '../../Descriptors/BallsDescriptor';
import { describeAllBreasts, describeNipple } from '../../Descriptors/BreastDescriptor';
import { describeButt } from '../../Descriptors/ButtDescriptor';
import { describeClit, describeVagina } from '../../Descriptors/VaginaDescriptor';
import { describeCock, describeCocksLight } from '../../Descriptors/CockDescriptor';
import { CView } from '../../../Page/ContentView';
import { shrinkTits } from '../../Modifiers/BreastModifier';
import { inventoryMenu } from '../../Menus/InGame/PlayerInventoryMenu';

export class Reducto extends Consumable {
    public constructor() {
        super(ConsumableName.Reducto, new ItemDesc("Reducto", "a salve marked as 'Reducto'", "This container full of paste can be used to shrink a body part down by a significant amount."), 30);
    }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character): NextScreenChoices {
        const rdtBalls: ClickOption = (character.body.balls.count > 0 && character.body.balls.size > 1 ? this.reductoBalls : undefined);
        const rdtBreasts: ClickOption = (character.body.chest.length > 0 && character.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0 ? this.reductoBreasts : undefined);
        const rdtButt: ClickOption = (character.body.butt.rating > 1 ? this.reductoButt : undefined);
        const rdtClit: ClickOption = (character.body.vaginas.length > 0 && character.body.clit.length > 0.25 ? this.reductoClit : undefined);
        const rdtCock: ClickOption = (character.body.cocks.length > 0 && character.body.cocks.sort(Cock.Largest).get(0)!.area > 6 ? this.reductoCock : undefined);
        const rdtHips: ClickOption = (character.body.hips.rating > 2 ? this.reductoHips : undefined);
        const rdtNipples: ClickOption = (character.body.chest.length > 0 && character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length > 0.25 ? this.reductoNipples : undefined);
        CView.clear();
        CView.text("You ponder the paste in your hand and wonder what part of your body you would like to shrink.  What will you use it on?");
        return {
            choices: [["Balls", rdtBalls], ["Breasts", rdtBreasts], ["Butt", rdtButt], ["Clit", rdtClit], ["Cock", rdtCock], ["Hips", rdtHips], ["Nipples", rdtNipples]], persistantChoices: [["Nevermind", this.reductoCancel]]
        };
    }

    private reductoBalls(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You smear the foul-smelling paste onto your " + describeSack(character) + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        character.body.balls.size -= randInt(4) + 2;
        if (character.body.balls.size < 1)
            character.body.balls.size = 1;
        CView.text("You feel your scrotum shift, shrinking down along with your " + describeBallsShort(character) + ".  Within a few seconds the paste has been totally absorbed and the shrinking stops.");
        character.stats.lib -= 2;
        character.stats.lust -= 10;
        return { next: inventoryMenu };
    }

    private reductoBreasts(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You smear the foul-smelling ointment all over your " + describeAllBreasts(character) + ", covering them entirely as the paste begins to get absorbed into your " + character.body.skin.desc + ".\n");
        shrinkTits(character, true);
        if (randInt(2) === 0 && character.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 1) {
            CView.text("\nThe effects of the paste continue to manifest themselves, and your body begins to change again...");
            shrinkTits(character, true);
        }
        CView.text("\nThe last of it wicks away into your skin, completing the changes.");
        character.stats.sens -= 2;
        character.stats.lust -= 5;
        return { next: inventoryMenu };
    }

    private reductoButt(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You smear the foul-smelling paste onto your " + describeButt(character) + ".  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (character.body.butt.rating >= 15) {
            character.body.butt.rating -= (3 + Math.floor(character.body.butt.rating / 3));
            CView.text("Within seconds you feel noticeably lighter, and a quick glance shows your ass is significantly smaller.");
        }
        else if (character.body.butt.rating >= 10) {
            character.body.butt.rating -= 3;
            CView.text("You feel much lighter as your " + describeButt(character) + " jiggles slightly, adjusting to its smaller size.");
        }
        else {
            character.body.butt.rating -= randInt(3) + 1;
            if (character.body.butt.rating < 1) character.body.butt.rating = 1;
            CView.text("After a few seconds your " + describeButt(character) + " has shrunk to a much smaller size!");
        }
        character.stats.lib -= 2;
        character.stats.lust -= 10;
        return { next: inventoryMenu };
    }

    private reductoClit(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You carefully apply the paste to your " + describeClit(character) + ", being very careful to avoid getting it on your " + describeVagina(character, character.body.vaginas.get(0)) + ".  It burns with heat as it begins to make its effects known...\n\n");
        character.body.clit.length /= 1.7;
        // Set clitlength down to 2 digits in length
        character.body.clit.length = Math.floor(character.body.clit.length * 100) / 100;
        CView.text("Your " + describeClit(character) + " shrinks rapidly, dwindling down to almost half its old size before it finishes absorbing the paste.");
        character.stats.sens += 2;
        character.stats.lust += 10;
        return { next: inventoryMenu };
    }

    private reductoCock(character: Character): NextScreenChoices {
        CView.clear();
        const firstCock = character.body.cocks.get(0)!;
        if (firstCock.type === CockType.BEE) {
            CView.text("The gel produces an odd effect when you rub it into your " + describeCock(character, firstCock) + ".  It actually seems to calm the need that usually fills you.  In fact, as your " + describeCock(character, firstCock) + " shrinks, its skin tone changes to be more in line with yours and the bee hair that covered it falls out.  <b>You now have a human cock!</b>");
            firstCock.type = CockType.HUMAN;
        }
        else {
            CView.text("You smear the repulsive smelling paste over your " + describeCocksLight(character) + ".  It immediately begins to grow warm, almost uncomfortably so, as your " + describeCocksLight(character) + " begins to shrink.\n\n");
            if (character.body.cocks.length === 1) {
                CView.text("Your " + describeCock(character, firstCock) + " twitches as it shrinks, disappearing steadily into your " + (firstCock.hasSheath() ? "sheath" : "crotch") + " until it has lost about a third of its old size.");
                firstCock.length *= 2 / 3;
                firstCock.thickness *= 2 / 3;
            }
            else { // MULTI
                CView.text("Your " + describeCocksLight(character) + " twitch and shrink, each member steadily disappearing into your " + (character.body.cocks.find(Cock.HasSheath) ? "sheath" : "crotch") + " until they've lost about a third of their old size.");
                for (const cock of character.body.cocks) {
                    cock.length *= 2 / 3;
                    cock.thickness *= 2 / 3;
                }
            }
        }
        character.stats.sens -= 2;
        character.stats.lust -= 10;
        return { next: inventoryMenu };
    }

    private reductoHips(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You smear the foul-smelling paste onto your [hips].  It feels cool at first but rapidly warms to an uncomfortable level of heat.\n\n");
        if (character.body.hips.rating >= 15) {
            character.body.hips.rating -= (3 + Math.floor(character.body.hips.rating / 3));
            CView.text("Within seconds you feel noticeably lighter, and a quick glance at your hips shows they've gotten significantly narrower.");
        }
        else if (character.body.hips.rating >= 10) {
            character.body.hips.rating -= 3;
            CView.text("You feel much lighter as your [hips] shift slightly, adjusting to their smaller size.");
        }
        else {
            character.body.hips.rating -= randInt(3) + 1;
            if (character.body.hips.rating < 1) character.body.hips.rating = 1;
            CView.text("After a few seconds your [hips] have shrunk to a much smaller size!");
        }
        character.stats.lib -= 2;
        character.stats.lust -= 10;
        return { next: inventoryMenu };
    }

    private reductoNipples(character: Character): NextScreenChoices {
        CView.clear();
        const largestBreasts = character.body.chest.sort(BreastRow.Largest).get(0)!;
        CView.text("You rub the paste evenly over your " + describeNipple(character, largestBreasts) + "s, being sure to cover them completely.\n\n");
        // Shrink
        if (largestBreasts.nipples.length / 2 < 0.25) {
            CView.text("Your nipples continue to shrink down until they stop at 1/4\" long.");
            largestBreasts.nipples.length = 0.25;
        }
        else {
            CView.text("Your " + describeNipple(character, largestBreasts) + "s get smaller and smaller, stopping when they are roughly half their previous size.");
            largestBreasts.nipples.length /= 2;
        }
        character.stats.sens -= 5;
        character.stats.lust -= 5;
        return { next: inventoryMenu };
    }

    private reductoCancel(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You put the salve away.\n\n");
        return character.inventory.items.createAdd(character, ConsumableName.Reducto, inventoryMenu);
        // InventoryDisplay.reverseAction();
        // return { next: Inventory };
    }
}
