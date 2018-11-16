import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { randInt, randomChoice } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { SkinType } from '../../Body/Skin';
import { Character } from '../../Character/Character';
import { ItemDesc } from '../ItemDesc';
import { describeButt } from '../../Descriptors/ButtDescriptor';
import { describeHips } from '../../Descriptors/HipDescriptor';
import { describeBalls } from '../../Descriptors/BallsDescriptor';
import { describeVagina } from '../../Descriptors/VaginaDescriptor';
import { describeCocks, describeCocksLight } from '../../Descriptors/CockDescriptor';
import { describeBreastRow, describeAllBreasts } from '../../Descriptors/BreastDescriptor';
import { describeHair } from '../../Descriptors/HairDescriptor';
import { CView } from '../../../Page/ContentView';
import { displayModThickness, displayModFem } from '../../Modifiers/BodyModifier';
import { displayKillCocks, growCock, thickenCock, displayLengthChange } from '../../Modifiers/CockModifier';
import { shrinkTits } from '../../Modifiers/BreastModifier';
import { FlagType } from '../../FlagType';
import { Flags } from '../../Flags';

export const EggFlags = {
    PC_KNOWS_ABOUT_BLACK_EGGS: 0,
};

Flags.set(FlagType.Eggs, EggFlags);

export function randLargeEgg(): ConsumableName {
    return randomChoice(
        ConsumableName.LargeEggBlack,
        ConsumableName.LargeEggBlue,
        ConsumableName.LargeEggBrown,
        ConsumableName.LargeEggPink,
        ConsumableName.LargeEggPurple,
        ConsumableName.LargeEggWhite,
    );
}

export function randEgg(): ConsumableName {
    return randomChoice(
        ConsumableName.EggBlack,
        ConsumableName.EggBlue,
        ConsumableName.EggBrown,
        ConsumableName.EggPink,
        ConsumableName.EggPurple,
        ConsumableName.EggWhite,
    );
}

export function randAnySizeEgg(): ConsumableName {
    return randomChoice(
        ConsumableName.LargeEggBlack,
        ConsumableName.LargeEggBlue,
        ConsumableName.LargeEggBrown,
        ConsumableName.LargeEggPink,
        ConsumableName.LargeEggPurple,
        ConsumableName.LargeEggWhite,
        ConsumableName.EggBlack,
        ConsumableName.EggBlue,
        ConsumableName.EggBrown,
        ConsumableName.EggPink,
        ConsumableName.EggPurple,
        ConsumableName.EggWhite,
    );

}

export enum EggType {
    Black,
    Blue,
    Brown,
    Pink,
    Purple,
    White
}

export function randEggType(): EggType {
    return randomChoice(
        EggType.Black,
        EggType.Blue,
        EggType.Brown,
        EggType.Pink,
        EggType.Purple,
        EggType.White,
    );
}

export class Eggs extends Consumable {
    private large: boolean;
    private eggType: EggType;

    public constructor(eggType: EggType, large: boolean) {
        if (large) {
            switch (eggType) {
                case EggType.Black:
                    super(ConsumableName.LargeEggBlack, new ItemDesc("L.BlkEg", "a large rubbery black egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.  For all you know, it could turn you into rubber!"));
                    break;
                case EggType.Blue:
                    super(ConsumableName.LargeEggBlue, new ItemDesc("L.BluEg", "a large blue and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                case EggType.Brown:
                    super(ConsumableName.LargeEggBrown, new ItemDesc("L.BrnEg", "a large brown and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                case EggType.Pink:
                    super(ConsumableName.LargeEggPink, new ItemDesc("L.PnkEg", "a large pink and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                case EggType.Purple:
                    super(ConsumableName.LargeEggPurple, new ItemDesc("L.PrpEg", "a large purple and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                default:
                case EggType.White:
                    super(ConsumableName.LargeEggWhite, new ItemDesc("L.WhtEg", "a large white egg", "This is an oblong egg, not much different from an ostrich egg in appearance.  Something tells you it's more than just food."));
                    break;
            }
        }
        else {
            switch (eggType) {
                case EggType.Black:
                    super(ConsumableName.EggBlack, new ItemDesc("BlackEg", "a rubbery black egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Blue:
                    super(ConsumableName.EggBlue, new ItemDesc("BlueEgg", "a blue and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Brown:
                    super(ConsumableName.EggBrown, new ItemDesc("BrownEg", "a brown and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Pink:
                    super(ConsumableName.EggPink, new ItemDesc("PinkEgg", "a pink and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Purple:
                    super(ConsumableName.EggPurple, new ItemDesc("PurplEg", "a purple and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                default:
                case EggType.White:
                    super(ConsumableName.EggWhite, new ItemDesc("WhiteEg", "a milky-white egg", "This is an oblong egg, not much different from a chicken egg in appearance.  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
            }
        }
        this.eggType = eggType;
        this.large = large;
    }

    public use(character: Character) {
        switch (this.eggType) {
            case EggType.Black:
                this.blackRubberEgg(character);
                break;
            case EggType.Blue:
                this.blueEgg(character);
                break;
            case EggType.Brown:
                this.brownEgg(character);
                break;
            case EggType.Pink:
                this.pinkEgg(character);
                break;
            case EggType.Purple:
                this.purpleEgg(character);
                break;
            default:
            case EggType.White:
                this.whiteEgg(character);
                break;
        }
    }

    // butt expansion
    private brownEgg(character: Character): void {
        CView.clear();
        CView.text("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large) {
            CView.text("You feel a bit of additional weight on your backside as your " + describeButt(character) + " gains a bit more padding.");
            character.body.butt.rating++;
        }
        else {
            CView.text("Your " + describeButt(character) + " wobbles, nearly throwing you off balance as it grows much bigger!");
            character.body.butt.rating += 2 + randInt(3);
        }
        if (randInt(3) === 0) {
            if (this.large)
                CView.text(displayModThickness(character, 100, 8));
            else
                CView.text(displayModThickness(character, 95, 3));
        }
    }

    // hip expansion
    private purpleEgg(character: Character): void {
        CView.clear();
        CView.text("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large || character.body.hips.rating > 20) {
            CView.text("You stumble as you feel your " + describeHips(character) + " widen, altering your gait slightly.");
            character.body.hips.rating++;
        }
        else {
            CView.text("You stagger wildly as your hips spread apart, widening by inches.  When the transformation finishes you feel as if you have to learn to walk all over again.");
            character.body.hips.rating += 2 + randInt(2);
        }
        if (randInt(3) === 0) {
            if (this.large)
                CView.text(displayModThickness(character, 80, 8));
            else
                CView.text(displayModThickness(character, 80, 3));
        }
    }

    // Femminess
    private pinkEgg(character: Character): void {
        CView.clear();
        CView.text("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large) {
            // Remove a dick
            if (character.body.cocks.length > 0) {
                character.body.cocks.remove(0);
                CView.text("\n\n");
            }
            // remove balls
            if (character.body.balls.count > 0) {
                if (character.body.balls.size > 15) {
                    character.body.balls.size -= 8;
                    CView.text("Your scrotum slowly shrinks, settling down at a MUCH smaller size.  <b>Your " + describeBalls(true, true, character) + " are much smaller.</b>\n\n");
                }
                else {
                    character.body.balls.count = 0;
                    character.body.balls.size = 1;
                    CView.text("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n");
                }
            }
            // Fertility boost
            if (character.body.vaginas.length > 0 && character.body.fertility < 40) {
                CView.text("You feel a tingle deep inside your body, just above your " + describeVagina(character, character.body.vaginas.get(0)) + ", as if you were becoming more fertile.\n\n");
                character.body.fertility += 5;
            }
        }
        // LARGE
        else {
            // Remove a dick
            if (character.body.cocks.length > 0) {
                displayKillCocks(character, -1);
                CView.text("\n\n");
            }
            if (character.body.balls.count > 0) {
                character.body.balls.count = 0;
                character.body.balls.size = 1;
                CView.text("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n");
            }
            // Fertility boost
            if (character.body.vaginas.length > 0 && character.body.fertility < 70) {
                CView.text("You feel a powerful tingle deep inside your body, just above your " + describeVagina(character, character.body.vaginas.get(0)) + ". Instinctively you know you have become more fertile.\n\n");
                character.body.fertility += 10;
            }
        }
        if (randInt(3) === 0) {
            if (this.large) CView.text(displayModFem(character, 100, 8));
            else CView.text(displayModFem(character, 95, 3));
        }
    }

    // Maleness
    private blueEgg(character: Character): void {
        let cockAmountLengthened: number = 0;
        let cockAmountThickened: number = 0;
        CView.clear();
        CView.text("You devour the egg, momentarily sating your hunger.");
        if (!this.large) {
            // Kill pussies!
            if (character.body.vaginas.length > 0) {
                CView.text("\n\nYour vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it! <b> Your vagina is gone!</b>");
                character.body.vaginas.remove(0);
                character.body.clit.length = .5;
            }
            // Dickz
            if (character.body.cocks.length > 0) {
                // Multiz
                if (character.body.cocks.length > 1) {
                    CView.text("\n\nYour " + describeCocks(character) + " fill to full-size... and begin growing obscenely.");

                    for (const cock of character.body.cocks) {
                        cockAmountLengthened += growCock(character, cock, randInt(3) + 2);
                        cockAmountThickened += thickenCock(cock, 1);
                    }
                    cockAmountLengthened /= character.body.cocks.length;
                    cockAmountThickened /= character.body.cocks.length;

                    displayLengthChange(character, cockAmountLengthened, character.body.cocks.length);

                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (character.body.cocks.length === 1) CView.text("\n\nYour " + describeCocksLight(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else CView.text("\n\nYour " + describeCocksLight(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (character.body.cocks.length > 1) CView.text("\n\nYour " + describeCocksLight(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else CView.text("\n\nYour " + describeCocksLight(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (character.body.cocks.length === 1) CView.text("\n\nYour " + describeCocksLight(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (character.body.cocks.length > 1) CView.text("\n\nYour " + describeCocksLight(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    character.stats.lib += 1;
                    character.stats.sens += 1;
                    character.stats.lust += 20;
                }
                // SINGLEZ
                if (character.body.cocks.length === 1) {
                    CView.text("\n\nYour " + describeCocksLight(character) + " fills to its normal size... and begins growing... ");
                    cockAmountThickened = thickenCock(character.body.cocks.get(0)!, 1);
                    cockAmountLengthened = growCock(character, character.body.cocks.get(0)!, randInt(3) + 2);
                    displayLengthChange(character, cockAmountLengthened, 1);
                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (character.body.cocks.length === 1) CView.text("  Your " + describeCocksLight(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else CView.text("  Your " + describeCocksLight(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (character.body.cocks.length > 1) CView.text("  Your " + describeCocksLight(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else CView.text("  Your " + describeCocksLight(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (character.body.cocks.length === 1) CView.text("  Your " + describeCocksLight(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (character.body.cocks.length > 1) CView.text("  Your " + describeCocksLight(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    character.stats.lib += 1;
                    character.stats.sens += 1;
                    character.stats.lust += 20;
                }

            }
        }
        // LARGE
        else {
            // New lines if changes
            if (character.body.chest.length > 1 || character.body.butt.rating > 5 || character.body.hips.rating > 5 || character.body.vaginas.length > 0)
                CView.text("\n\n");
            // Kill pussies!
            if (character.body.vaginas.length > 0) {
                CView.text("Your vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it!\n\n");
                if (character.body.chest.length > 1 || character.body.butt.rating > 5 || character.body.hips.rating > 5)
                    CView.text("  ");
                character.body.vaginas.remove(0);
                character.body.clit.length = .5;
            }
            // Kill extra boobages
            if (character.body.chest.length > 1) {
                CView.text("Your back relaxes as extra weight vanishes from your chest.  <b>Your lowest " + describeBreastRow(character.body.chest.get(character.body.chest.length - 1)) + " have vanished.</b>");
                if (character.body.butt.rating > 5 || character.body.hips.rating > 5) CView.text("  ");
                // Remove lowest row.
                character.body.chest.remove(character.body.chest.length - 1);
            }
            // Ass/hips shrinkage!
            if (character.body.butt.rating > 5) {
                CView.text("Muscles firm and tone as you feel your " + describeButt(character) + " become smaller and tighter.");
                if (character.body.hips.rating > 5) CView.text("  ");
                character.body.butt.rating -= 2;
            }
            if (character.body.hips.rating > 5) {
                CView.text("Feeling the sudden burning of lactic acid in your " + describeHips(character) + ", you realize they have slimmed down and firmed up some.");
                character.body.hips.rating -= 2;
            }
            // Shrink tits!
            if (character.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) {
                shrinkTits(character);
            }
            if (character.body.cocks.length > 0) {
                // Multiz
                if (character.body.cocks.length > 1) {
                    CView.text("\n\nYour " + describeCocks(character) + " fill to full-size... and begin growing obscenely.  ");
                    for (const cock of character.body.cocks) {
                        cockAmountLengthened += growCock(character, cock, randInt(3) + 5);
                        cockAmountThickened += thickenCock(cock, 1.5);
                    }
                    cockAmountLengthened /= character.body.cocks.length;
                    cockAmountThickened /= character.body.cocks.length;

                    displayLengthChange(character, cockAmountLengthened, character.body.cocks.length);
                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (character.body.cocks.length === 1) CView.text("\n\nYour " + describeCocksLight(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else CView.text("\n\nYour " + describeCocksLight(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (character.body.cocks.length > 1) CView.text("\n\nYour " + describeCocksLight(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else CView.text("\n\nYour " + describeCocksLight(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (character.body.cocks.length === 1) CView.text("\n\nYour " + describeCocksLight(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (character.body.cocks.length > 1) CView.text("\n\nYour " + describeCocksLight(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    character.stats.lib += 1;
                    character.stats.sens += 1;
                    character.stats.lust += 20;
                }
                // SINGLEZ
                if (character.body.cocks.length === 1) {
                    CView.text("\n\nYour " + describeCocksLight(character) + " fills to its normal size... and begins growing...");
                    cockAmountThickened = thickenCock(character.body.cocks.get(0)!, 1.5);
                    cockAmountLengthened = growCock(character, character.body.cocks.get(0)!, randInt(3) + 5);
                    displayLengthChange(character, cockAmountLengthened, 1);
                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (character.body.cocks.length === 1) CView.text("  Your " + describeCocksLight(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else CView.text("  Your " + describeCocksLight(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (character.body.cocks.length > 1) CView.text("  Your " + describeCocksLight(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else CView.text("  Your " + describeCocksLight(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (character.body.cocks.length === 1) CView.text("  Your " + describeCocksLight(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (character.body.cocks.length > 1) CView.text("  Your " + describeCocksLight(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    character.stats.lib += 1;
                    character.stats.sens += 1;
                    character.stats.lust += 20;
                }

            }
        }
        if (randInt(3) === 0) {
            if (this.large) CView.text(displayModFem(character, 0, 8));
            else CView.text(displayModFem(character, 5, 3));
        }
    }

    // Nipplezzzzz
    private whiteEgg(character: Character): void {
        let gainedNippleCunts: boolean = false;
        CView.clear();
        CView.text("You devour the egg, momentarily sating your hunger.");
        if (!this.large) {
            // Grow nipples
            if (character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length < 3 && character.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) {
                CView.text("\n\nYour nipples engorge, prodding hard against the inside of your " + character.inventory.armor.displayName + ".  Abruptly you realize they've gotten almost a quarter inch longer.");
                character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length += .2;
                character.stats.lust += 15;
            }
        }
        // LARGE
        else {
            // Grow nipples
            if (character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length < 3 && character.body.chest.sort(BreastRow.Largest).get(0)!.rating > 0) {
                CView.text("\n\nYour nipples engorge, prodding hard against the inside of your " + character.inventory.armor.displayName + ".  Abruptly you realize they've grown more than an additional quarter-inch.");
                character.body.chest.sort(BreastRow.Largest).get(0)!.nipples.length += (randInt(2) + 3) / 10;
                character.stats.lust += 15;
            }
            // NIPPLECUNTZZZ
            // Set nipplecunts on every row.
            for (const breastRow of character.body.chest) {
                if (!breastRow.nipples.fuckable && breastRow.nipples.length >= 2) {
                    breastRow.nipples.fuckable = true;
                    // Keep track of changes.
                    gainedNippleCunts = true;
                }
            }
            // Talk about if anything was changed.
            if (gainedNippleCunts)
                CView.text("\n\nYour " + describeAllBreasts(character) + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>");
        }
    }

    private blackRubberEgg(character: Character): void {
        CView.clear();
        CView.text("You devour the egg, momentarily sating your hunger.");
        // Small
        if (!this.large) {
            // Change skin to normal if not flawless!
            if ((character.body.skin.adj !== "smooth" && character.body.skin.adj !== "latex" && character.body.skin.adj !== "rubber") || character.body.skin.desc !== "skin") {
                CView.text("\n\nYour " + character.body.skin.desc + " tingles delightfully as it ");
                if (character.body.skin.type === SkinType.PLAIN) CView.text(" loses its blemishes, becoming flawless smooth skin.");
                if (character.body.skin.type === SkinType.FUR) CView.text(" falls out in clumps, revealing smooth skin underneath.");
                if (character.body.skin.type === SkinType.SCALES) CView.text(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.");
                if (character.body.skin.type > SkinType.SCALES) CView.text(" shifts and changes into flawless smooth skin.");
                character.body.skin.desc = "skin";
                character.body.skin.adj = "smooth";
                if (character.body.skin.tone === "rough gray") character.body.skin.tone = "gray";
                character.body.skin.type = SkinType.PLAIN;
            }
            // chance of hair change
            else {
                // If hair isn't rubbery/latex yet
                if (character.body.hair.color.indexOf("rubbery") === -1 && character.body.hair.color.indexOf("latex-textured") && character.body.hair.length !== 0) {
                    // if skin is already one...
                    if (character.body.skin.desc === "skin" && character.body.skin.adj === "rubber") {
                        CView.text("\n\nYour scalp tingles and your " + describeHair(character) + " thickens, the strands merging into ");
                        CView.text(" thick rubbery hair.");
                        character.body.hair.color = "rubbery " + character.body.hair.color;
                        character.stats.cor += 2;
                    }
                    if (character.body.skin.desc === "skin" && character.body.skin.adj === "latex") {
                        CView.text("\n\nYour scalp tingles and your " + describeHair(character) + " thickens, the strands merging into ");
                        CView.text(" shiny latex hair.");
                        character.body.hair.color = "latex-textured " + character.body.hair.color;
                        character.stats.cor += 2;
                    }
                }
            }
        }
        // Large
        else {
            // Change skin to latex if smooth.
            if (character.body.skin.desc === "skin" && character.body.skin.adj === "smooth") {
                CView.text("\n\nYour already flawless smooth skin begins to tingle as it changes again.  It becomes shinier as its texture changes subtly.  You gasp as you touch yourself and realize your skin has become ");
                if (randInt(2) === 0) {
                    character.body.skin.desc = "skin";
                    character.body.skin.adj = "latex";
                    CView.text("a layer of pure latex.  ");
                }
                else {
                    character.body.skin.desc = "skin";
                    character.body.skin.adj = "rubber";
                    CView.text("a layer of sensitive rubber.  ");
                }
                EggFlags.PC_KNOWS_ABOUT_BLACK_EGGS = 1;
                if (character.stats.cor < 66) CView.text("You feel like some kind of freak.");
                else CView.text("You feel like some kind of sexy " + character.body.skin.desc + " love-doll.");
                character.stats.spe -= 3;
                character.stats.sens += 8;
                character.stats.lust += 10;
                character.stats.cor += 2;
            }
            // Change skin to normal if not flawless!
            if ((character.body.skin.adj !== "smooth" && character.body.skin.adj !== "latex" && character.body.skin.adj !== "rubber") || character.body.skin.desc !== "skin") {
                CView.text("\n\nYour " + character.body.skin.desc + " tingles delightfully as it ");
                if (character.body.skin.type === SkinType.PLAIN) CView.text(" loses its blemishes, becoming flawless smooth skin.");
                if (character.body.skin.type === SkinType.FUR) CView.text(" falls out in clumps, revealing smooth skin underneath.");
                if (character.body.skin.type === SkinType.SCALES) CView.text(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.");
                if (character.body.skin.type > SkinType.SCALES) CView.text(" shifts and changes into flawless smooth skin.");
                character.body.skin.desc = "skin";
                character.body.skin.adj = "smooth";
                if (character.body.skin.tone === "rough gray") character.body.skin.tone = "gray";
                character.body.skin.type = SkinType.PLAIN;
            }
            // chance of hair change
            else {
                // If hair isn't rubbery/latex yet
                if (character.body.hair.color.indexOf("rubbery") === -1 && character.body.hair.color.indexOf("latex-textured") && character.body.hair.length !== 0) {
                    // if skin is already one...
                    if (character.body.skin.adj === "rubber" && character.body.skin.desc === "skin") {
                        CView.text("\n\nYour scalp tingles and your " + describeHair(character) + " thickens, the strands merging into ");
                        CView.text(" thick rubbery hair.");
                        character.body.hair.color = "rubbery " + character.body.hair.color;
                        character.stats.cor += 2;
                    }
                    if (character.body.skin.adj === "latex" && character.body.skin.desc === "skin") {
                        CView.text("\n\nYour scalp tingles and your " + describeHair(character) + " thickens, the strands merging into ");
                        CView.text(" shiny latex hair.");
                        character.body.hair.color = "latex-textured " + character.body.hair.color;
                        character.stats.cor += 2;
                    }
                }
            }
        }
    }
}
