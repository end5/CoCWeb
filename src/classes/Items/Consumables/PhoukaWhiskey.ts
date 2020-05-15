import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { Utils } from "../../internals/Utils";
import { Player } from "../../Player";
import { PregnancyStore } from "../../PregnancyStore";
import { StatusAffects } from "../../StatusAffects";
import { Consumable } from "../Consumable";

/**
 * Created by K.Quesom 11.06.14
 */

export class PhoukaWhiskey extends Consumable {
    public constructor() {
        super(
            "P_Whsky",
            "Ph. Whiskey",
            "a small bottle of whiskey",
            20,
            "A small, corked glass bottle with a dark amber liquid inside.  The whiskey smells strongly of peat."
        );
    }

    public canUse(): boolean {
        switch (this.phoukaWhiskeyAcceptable(this.game.player)) {
            case -4:
                this.outx(
                    "You stare at the bottle for a moment, but decide not to risk harming one of the children growing inside you.\n\n"
                );
                return false;
            case -3:
                this.outx(
                    "You stare at the bottle for a moment, but decide not to risk harming either of the children growing inside you.\n\n"
                );
                return false;
            case -2:
                this.outx(
                    "You stare at the bottle for a moment, but decide not to risk harming the child growing inside your colon.\n\n"
                );
                return false;
            case -1:
                this.outx(
                    "You stare at the bottle for a moment, but decide not to risk harming the child growing inside your womb.\n\n"
                );
                return false;
            default:
        }
        return true; // Zero and up will return true
    }

    public useItem(): boolean {
        this.game.player.slimeFeed();
        switch (this.phoukaWhiskeyDrink(this.game.player)) {
            case 0: // Player isn't pregnant
                this.outx(
                    "You uncork the bottle and drink some whiskey, hoping it will let you relax for a while.\n\nIt's strong stuff and afterwards you worry a bit less about the future.  Surely things will right themselves in the end."
                );
                this.game.dynStats("cor", Utils.rand(2) + 1, "lus", Utils.rand(8) + 1); // These gains are permanent
                break;
            case 1: // Child is a phouka or satyr, loves alcohol
                this.outx(
                    "You uncork the bottle and drink some whiskey, hoping it will help with the gnawing hunger for alcohol you've had since this baby started growing inside you.\n\nYou down the booze in one shot and a wave of contentment washes over you.  It seems your passenger enjoyed the meal."
                );
                break;
            case 2: // Child is a faerie but will become a phouka with this drink
                this.outx(
                    "At first you feel your baby struggle against the whiskey, then it seems to grow content and enjoy it."
                );
                break;
            case 3: // Child is a faerie, hates phouka whiskey
                this.outx(
                    "You feel queasy and want to throw up.  There's a pain in your belly and you realize the baby you're carrying didn't like that at all."
                );
        }
        this.game.flags[kFLAGS.PREGNANCY_CORRUPTION]++; // Faerie or phouka babies become more corrupted, no effect if the player is not pregnant or on other types of babies
        this.phoukaWhiskeyAddStatus(this.game.player);
        return false;
    }

    public phoukaWhiskeyAcceptable(player: Player): number {
        // This function provides a single common test that can be used both by this class and the PhoukaScene class
        // Returns: 0 = canUse (not pregnant), 1 = canUse (single pregnancy, womb), 2 = canUse (single pregnancy, colon), 3 = canUse (double pregnancy, both OK),
        //
        //  -1 = No (single pregnancy, womb), -2 = No (single pregnancy, colon), -3 = No (double pregnancy, both not OK), -4 = No (double pregnancy, one OK, one not)
        if (player.pregnancyIncubation == 0) {
            if (player.buttPregnancyIncubation == 0) return 0; // No baby. Simplest, most common case
            if (player.buttPregnancyType == PregnancyStore.PREGNANCY_SATYR) return 2;
            return -2;
        }
        if (player.buttPregnancyIncubation == 0) {
            // Single pregnancy, carried in the womb
            if (player.pregnancyType == PregnancyStore.PREGNANCY_SATYR) return 1;
            if (player.pregnancyType == PregnancyStore.PREGNANCY_FAERIE) return 1;
            return -1;
        }
        // Double pregnancy
        const wombBabyLikesAlcohol: boolean =
            player.pregnancyType == PregnancyStore.PREGNANCY_SATYR ||
            player.pregnancyType == PregnancyStore.PREGNANCY_FAERIE;
        const colonBabyLikesAlcohol: boolean =
            player.buttPregnancyType == PregnancyStore.PREGNANCY_SATYR;
        if (wombBabyLikesAlcohol && colonBabyLikesAlcohol) return 3;
        if (!wombBabyLikesAlcohol && !colonBabyLikesAlcohol) return -3;
        return -4;
    }

    public phoukaWhiskeyDrink(player: Player): number {
        // This function provides a single common test that can be used both by this class and the PhoukaScene class
        // Returns: 0 = Player is not pregnant, 1 = Player is pregnant with a satyr or phouka, 2 = Player is pregnant with a faerie that will become a phouka with this drink,
        //
        //  3 = Player is pregnant with a faerie that will remain a faerie after this drink
        if (player.pregnancyIncubation == 0 && player.buttPregnancyIncubation == 0) return 0;
        if (player.pregnancyType == PregnancyStore.PREGNANCY_FAERIE) {
            if (this.game.flags[kFLAGS.PREGNANCY_CORRUPTION] == 0) return 2;
            if (this.game.flags[kFLAGS.PREGNANCY_CORRUPTION] < 0) return 3;
        }
        return 1; // Pregnancy has to be either a satyr or a phouka
    }

    public phoukaWhiskeyAddStatus(player: Player): void {
        const libidoChange: number = player.lib + 25 > 100 ? 100 - player.lib : 25;
        const sensChange: number = player.sens < 10 ? player.sens : 10;
        const speedChange: number = player.spe < 20 ? player.spe : 20;
        const intChange: number = player.inte < 20 ? player.inte : 20;
        if (player.findStatusAffect(StatusAffects.PhoukaWhiskeyAffect) >= 0) {
            const drinksSoFar: number = player.statusAffectv2(StatusAffects.PhoukaWhiskeyAffect);
            if (drinksSoFar < 4)
                player.addStatusValue(StatusAffects.PhoukaWhiskeyAffect, 1, 8 - 2 * drinksSoFar);
            else player.addStatusValue(StatusAffects.PhoukaWhiskeyAffect, 1, 1); // Always get at least one more hour of drunkenness
            player.addStatusValue(StatusAffects.PhoukaWhiskeyAffect, 2, 1);
            player.addStatusValue(
                StatusAffects.PhoukaWhiskeyAffect,
                3,
                256 * libidoChange + sensChange
            );
            player.addStatusValue(
                StatusAffects.PhoukaWhiskeyAffect,
                4,
                256 * speedChange + intChange
            );
            this.outx("\n\nOh, it tastes so good.  This stuff just slides down your throat.");
            this.game.dynStats(
                "lib",
                libidoChange,
                "sens",
                -sensChange,
                "spe",
                -speedChange,
                "int",
                -intChange
            );
        } else {
            // First time
            player.createStatusAffect(
                StatusAffects.PhoukaWhiskeyAffect,
                8,
                1,
                256 * libidoChange + sensChange,
                256 * speedChange + intChange
            );
            // The four stats we’re affecting get paired together to save space. This way we don’t need a second StatusAffect to store more info.
            this.game.dynStats(
                "lib",
                libidoChange,
                "sens",
                -sensChange,
                "spe",
                -speedChange,
                "int",
                -intChange
            );
        }
        this.game.statScreenRefresh();
    }

    public phoukaWhiskeyExpires(player: Player): void {
        const numDrunk: number = player.statusAffectv2(StatusAffects.PhoukaWhiskeyAffect);
        const libidoSensCombined: number = player.statusAffectv3(StatusAffects.PhoukaWhiskeyAffect);
        const intSpeedCombined: number = player.statusAffectv4(StatusAffects.PhoukaWhiskeyAffect);

        const sensChange: number = libidoSensCombined & 255;
        const libidoChange: number = (libidoSensCombined - sensChange) / 256;
        const intChange: number = intSpeedCombined & 255;
        const speedChange: number = (intSpeedCombined - intChange) / 256;
        this.game.dynStats(
            "lib",
            -libidoChange,
            "sens",
            sensChange,
            "spe",
            speedChange,
            "int",
            intChange
        ); // Get back all the stats you lost
        player.removeStatusAffect(StatusAffects.PhoukaWhiskeyAffect);
        if (numDrunk > 3)
            this.outx(
                "\n<b>The dizzy sensation dies away and is replaced by a throbbing pain that starts in your skull and then seems to run all through your body, seizing up your joints and making your stomach turn.  The world feels like it’s off kilter and you aren’t in any shape to face it.  You suppose you could down another whiskey, but right now that doesn’t seem like such a good idea.</b>\n"
            );
        else if (numDrunk > 1)
            this.outx(
                "\n<b>The fuzzy, happy feeling ebbs away.  With it goes the warmth and carefree feelings.  Your head aches and you wonder if you should have another whiskey, just to tide you over</b>\n"
            );
        else
            this.outx(
                "\n<b>The fuzzy, happy feeling ebbs away.  The weight of the world’s problems seems to settle on you once more.  It was nice while it lasted and you wouldn’t mind having another whiskey.</b>\n"
            );
        this.game.statScreenRefresh();
    }
}
