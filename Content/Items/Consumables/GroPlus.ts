import { Consumable } from 'Engine/Items/Consumable';
import { ConsumableName } from '../ConsumableName';
import { randInt } from 'Engine/Utilities/SMath';
import { BreastRow } from 'Engine/Body/BreastRow';
import { Cock } from 'Engine/Body/Cock';
import { Character } from 'Engine/Character/Character';
import { ClickOption, NextScreenChoices } from 'Engine/Display/ScreenDisplay';
import { ItemDesc } from 'Engine/Items/ItemDesc';
import { describeSack, describeBallsShort } from 'Content/Descriptors/BallsDescriptor';
import { describeAllBreasts, describeNipple, describeBreastGrowth } from 'Content/Descriptors/BreastDescriptor';
import { describeClit } from 'Content/Descriptors/VaginaDescriptor';
import { describeCocksLight, describeCock } from 'Content/Descriptors/CockDescriptor';
import { CView } from 'Engine/Display/ContentView';
import { growSmallestBreastRow } from 'Content/Modifiers/BreastModifier';
import { growCock } from 'Content/Modifiers/CockModifier';
import { inventoryMenu } from 'Content/Menus/InGame/PlayerInventoryMenu';

export class GroPlus extends Consumable {
    public constructor() {
        super(ConsumableName.GroPlus, new ItemDesc("GroPlus", "a needle filled with Gro+", "This is a small needle with a reservoir full of blue liquid.  A faded label marks it as 'GroPlus'.  Its purpose seems obvious."), 50);
    }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character): NextScreenChoices {
        const gpBalls: ClickOption = (character.body.balls.count > 0 ? this.growPlusBalls : undefined);
        const gpBreasts: ClickOption = (character.body.chest.length > 0 ? this.growPlusBreasts : undefined);
        const gpClit: ClickOption = (character.body.vaginas.length > 0 ? this.growPlusClit : undefined);
        const gpCock: ClickOption = (character.body.cocks.length > 0 ? this.growPlusCock : undefined);
        const gpNipples: ClickOption = (character.body.chest.reduce(BreastRow.TotalNipples, 0) > 0 ? this.growPlusNipples : undefined);
        CView.clear();
        CView.text("You ponder the needle in your hand knowing it will enlarge the injection site.  What part of your body will you use it on?  ");
        return {
            choices: [["Balls", gpBalls], ["Breasts", gpBreasts], ["Clit", gpClit], ["Cock", gpCock], ["Nipples", gpNipples]],
            persistantChoices: [["Nevermind", this.growPlusCancel]]
        };
    }

    private growPlusBalls(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You sink the needle deep into your " + describeSack(character) + ".  It hurts like hell, but you push down the plunger and the pain vanishes as the needles contents flow into you.\n\n");
        // 1 in 4 BIG growth.
        if (randInt(4) === 0) {
            CView.text("You feel a trembling in your " + describeBallsShort(character) + " as the chemicals start to go to work.  You can tell they're going to be VERY effective.\n");
            character.body.balls.size += randInt(4) + 2;
            CView.text("They shift, stretching your " + describeSack(character) + " tight as they gain inches of size.  You step to steady yourself as your center of balance shifts due to your newly enlarged " + describeBallsShort(character) + ".  ");
        }
        else {
            character.body.balls.size += randInt(2) + 1;
            CView.text("You feel your testicles shift, pulling the skin of your " + describeSack(character) + " a little bit as they grow to " + describeBallsShort(character) + ".  ");
        }
        if (character.body.balls.size > 10) CView.text("Walking gets even tougher with the swollen masses between your legs.  Maybe this was a bad idea.");
        character.stats.lust += 10;
        return { next: inventoryMenu };
    }

    private growPlusBreasts(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You sink the needle into the flesh of your " + describeAllBreasts(character) + " injecting each with a portion of the needle.\n\n");
        if (character.body.chest.length === 1) {
            const amount = randInt(5) + 1;
            growSmallestBreastRow(character, amount, 1);
            CView.text(describeBreastGrowth(character, amount));
        }
        else {
            const amount = randInt(2) + 1;
            growSmallestBreastRow(character, amount, character.body.chest.length);
            CView.text(describeBreastGrowth(character, amount));
        }
        character.stats.lust += 10;
        return { next: inventoryMenu };
    }

    private growPlusClit(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You sink the needle into your clit, nearly crying with how much it hurts.  You push down the plunger and the pain vanishes as your clit starts to grow.\n\n");
        character.body.clit.length++;
        CView.text("Your " + describeClit(character) + " stops growing after an inch of new flesh surges free of your netherlips.  It twitches, feeling incredibly sensitive.");

        character.stats.sens += 2;
        character.stats.lust += 10;
        return { next: inventoryMenu };
    }

    private growPlusCock(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You sink the needle into the base of your " + describeCocksLight(character) + ".  It hurts like hell, but as you depress the plunger, the pain vanishes, replaced by a tingling pleasure as the chemicals take effect.\n\n");
        if (character.body.cocks.length === 1) {
            const firstCock = character.body.cocks.get(0)!;
            CView.text("Your " + describeCock(character, firstCock) + " twitches and thickens, pouring more than an inch of thick new length from your ");
            growCock(character, firstCock, 4);
            firstCock.length += 1; // This was forcing "what was said" to match "what actually happened" no matter what increase/growCock /actually/ did.
            firstCock.thickness += 0.5; // And growCock never actually touched thickness. Nor does the new version. Thickness mod was stripped out entirely.
        }
        // MULTI
        else {
            CView.text("Your " + describeCocksLight(character) + " twitch and thicken, each member pouring out more than an inch of new length from your ");
            for (const cock of character.body.cocks) {
                growCock(character, cock, 2);
                cock.length += 1;
                cock.thickness += 0.5;
            }
        }
        if (character.body.cocks.find(Cock.HasSheath))
            CView.text("sheath.");
        else CView.text("crotch.");
        character.stats.sens += 2;
        character.stats.lust += 10;
        return { next: inventoryMenu };
    }

    private growPlusNipples(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You sink the needle into each of your " + describeNipple(character, character.body.chest.firstRow) + "s in turn, dividing the fluid evenly between them.  Though each injection hurts, the pain is quickly washed away by the potent chemical cocktail.\n\n");
        // Grow nipples
        CView.text("Your nipples engorge, prodding hard against the inside of your " + character.inventory.armor.displayName + ".  Abruptly you realize they've grown more than an additional quarter-inch.\n\n");
        character.body.chest.get(randInt(character.body.chest.length - 1))!.nipples.length += (randInt(2) + 3) / 10;
        character.stats.lust += 15;
        // NIPPLECUNTZZZ
        if (character.body.chest.find(BreastRow.NonFuckableNipples) && randInt(4) === 0) {
            let nowFuckable: boolean = false;
            for (const breastRow of character.body.chest) {
                if (!breastRow.nipples.fuckable && breastRow.nipples.length >= 2) {
                    breastRow.nipples.fuckable = true;
                    nowFuckable = true;
                }
            }
            // Talk about if anything was changed.
            if (nowFuckable) CView.text("Your " + describeAllBreasts(character) + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>\n\n");
        }
        return { next: inventoryMenu };
    }

    private growPlusCancel(character: Character): NextScreenChoices {
        CView.clear();
        CView.text("You put the vial away.\n\n");
        return character.inventory.items.createAdd(character, ConsumableName.GroPlus, inventoryMenu);
        // InventoryDisplay.reverseAction();
        // return { next: Inventory };
    }
}
