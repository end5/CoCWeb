import { IPregnancyEvent } from "../../Body/Pregnancy/IPregnancyEvent";
import { CView } from "../../../Page/ContentView";
import { PregnancyType } from "../../Body/Pregnancy/Pregnancy";
import { Womb } from "../../Body/Pregnancy/Womb";
import { Character } from "../../Character/Character";
import { StatusEffectType } from "../../Effects/StatusEffectType";
import { Vagina, VaginaLooseness, VaginaWetness } from "../../Body/Vagina";
import { randInt } from "../../../Engine/Utilities/SMath";
import { BreastRow } from "../../Body/BreastRow";
import { boostLactation, growTopBreastRow } from "../../Modifiers/BreastModifier";
import { describeButt } from "../../Descriptors/ButtDescriptor";
import { describeHips } from "../../Descriptors/HipDescriptor";

class ImpPregnancyEvents implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy!.type === PregnancyType.IMP) {
            if (womb.pregnancy!.incubation === 336) {
                CView.text("\n<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b>\n");
            }
            if (womb.pregnancy!.incubation === 280) {
                CView.text("\n<b>Your belly is getting more noticably distended.   You are probably pregnant.</b>\n");
            }
            if (womb.pregnancy!.incubation === 216) {
                CView.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  ");
                if (player.stats.cor < 40) CView.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>");
                if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.</b>");
                if (player.stats.cor >= 75) CView.text("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.</b>");
                player.stats.spe += -1;
                player.stats.lib += 1;
                player.stats.sens += 1;
                player.stats.lust += 2;

                CView.text("\n");
            }
            if (womb.pregnancy!.incubation === 180) {
                CView.text("\n<b>The sudden impact of a kick from inside your womb startles you.</b>\n");
            }
            if (womb.pregnancy!.incubation === 120) {
                CView.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.</b>\n");
            }
            if (womb.pregnancy!.incubation === 72) {
                CView.text("\n<b>Your belly is painfully distended, ");
                if (player.stats.cor < 40) CView.text("making it difficult to function.</b>");
                if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("and you wonder how much longer you have to wait.</b>");
                if (player.stats.cor >= 75) CView.text("and you're eager to give birth, so you can get impregnated again by corrupted or monstrous cum filling out your eager womb.</b>");
                CView.text("\n");
                player.stats.spe += -3;
                player.stats.lib += 1;
                player.stats.sens += 1;
                player.stats.lust += 4;

            }
            if (womb.pregnancy!.incubation === 48) {
                CView.text("\n<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  ");
                if (player.stats.cor < 40) CView.text("Afterwards you feel somewhat disgusted with yourself.</b>\n");
                if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("You estimate you'll give birth in the next few days.</b>\n");
                if (player.stats.cor >= 75) CView.text("You find yourself daydreaming about birthing demons repeatedly, each time being re-impregnated by your hordes of lusty adolescent children.</b>\n");
            }
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy!.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        CView.text("\n");
        // Add imp birth status - used to control frequency of night imp gangbag
        const birthedImps = player.effects.get(StatusEffectType.BirthedImps);
        if (birthedImps)
            birthedImps.values.other!.amount++;
        else
            player.effects.add(StatusEffectType.BirthedImps, { other: { amount: 0 } });
        if (player.body.vaginas.length === 0) {
            CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ");
            player.body.vaginas.add(new Vagina());
        }
        CView.text("A sudden gush of fluids erupts from your vagina - your water just broke.  You grunt painfully as you feel wriggling and squirming inside your belly, muscle contractions forcing it downwards.  ");
        if (player.stats.cor < 50) CView.text("You rue the day you encountered that hateful imp.  ");
        CView.text("The pain begins to subside as your delivery continues... replaced with a building sensation of pleasure.  Arousal spikes through you as the contractions intensify, and as you feel something pass you have a tiny orgasm.\n\nYet you feel more within you, and the contractions spike again, pushing you to orgasm as you pass something else.  It repeats, over and over, nearly a dozen times you birth and orgasm.  After an eternity of procreation and pleasure, you sense your ordeal is over and collapse, unconscious.");

        const firstVagina = player.body.vaginas.get(0)!;
        if (firstVagina.looseness === VaginaLooseness.TIGHT) firstVagina.looseness++;
        // 50% chance
        if (firstVagina.looseness < VaginaLooseness.GAPING_WIDE && randInt(2) === 0) {
            firstVagina.looseness++;
            CView.text("\n\n<b>Your cunt is painfully stretched from the ordeal, permanently enlarged.</b>");
        }

        womb.clear(); // Clear Pregnancy
        CView.text("\n\nWhen you wake you find a large number of tiny imp tracks... and a spattering of cum on your clothes and body.  They must be born fully-formed.");
        if (player.body.chest.reduce(BreastRow.AverageLactation, 0) > 0 && player.body.chest.reduce(BreastRow.AverageLactation, 0) < 5) {
            CView.text("  Your breasts won't seem to stop dribbling milk, lactating more heavily than before.");
            boostLactation(player, .5);
        }
        // Lactate if large && not lactating
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3 && player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1 && player.body.chest.reduce(BreastRow.AverageLactation, 0) === 0) {
            CView.text("  As you ponder the implications, <b>you realize your breasts have been slowly lactating</b>.  You wonder how much longer it will be before they stop.");
            boostLactation(player, 1);
        }
        boostLactation(player, .01);
        // Enlarge if too small for lactation
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating === 2 && player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1) {
            CView.text("  <b>Your breasts have grown to C-cups!</b>");
            growTopBreastRow(player, 1, 1);
        }
        // Enlarge if really small!
        if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating === 1 && player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1) {
            CView.text("  <b>Your breasts have grown to B-cups!</b>");
            growTopBreastRow(player, 1, 1);
        }
        if (firstVagina.wetness === VaginaWetness.DRY) firstVagina.wetness++;
        player.orgasm();
        player.stats.tou += -2;
        player.stats.spe += 2;
        player.stats.lib += 1;
        player.stats.sens += .5;
        player.stats.cor += 7;

        if (player.body.butt.rating < 10 && randInt(2) === 0) {
            player.body.butt.rating++;
            CView.text("\n\nYou notice your " + describeButt(player) + " feeling larger and plumper after the ordeal.");
        }
        else if (player.body.hips.rating < 10) {
            player.body.hips.rating++;
            CView.text("\n\nAfter the birth your " + player.inventory.armor.displayName + " fits a bit more snugly about your " + describeHips(player) + ".");
        }
        CView.text("\n");
    }
}

export const ImpPregEvent = new ImpPregnancyEvents();
