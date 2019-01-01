import { IPregnancyEvent } from 'Engine/Body/Pregnancy/IPregnancyEvent';
import { Character } from 'Engine/Character/Character';
import { Womb } from 'Engine/Body/Pregnancy/Womb';
import { PregnancyType } from 'Content/Body/Pregnancy/PregnancyType';
import { CView } from 'Engine/Display/ContentView';
import { BreastRow } from 'Engine/Body/BreastRow';
import { boostLactation, growTopBreastRow } from 'Content/Modifiers/BreastModifier';
import { Vagina, VaginaWetness } from 'Engine/Body/Vagina';
import { displayStretchVagina } from 'Content/Modifiers/VaginaModifier';
import { randInt } from 'Engine/Utilities/SMath';
import { describeButt } from 'Content/Descriptors/ButtDescriptor';
import { describeHips } from 'Content/Descriptors/HipDescriptor';

class MinotaurPregnancyEvents implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy && womb.pregnancy.type === PregnancyType.MINOTAUR) {
            if (womb.pregnancy.incubation === 336) {
                CView.text("\n<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b>\n");
            }
            if (womb.pregnancy.incubation === 280) {
                CView.text("\n<b>Your belly is getting more noticably distended and squirming around.  You are probably pregnant.</b>\n");
            }
            if (womb.pregnancy.incubation === 216) {
                CView.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  It's feeling heavier by the moment.  ");
                if (player.stats.cor < 40) CView.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>");
                if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.</b>");
                if (player.stats.cor >= 75) CView.text("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.</b>");
                player.stats.spe += -1;
                player.stats.lib += 1;
                player.stats.sens += 1;
                player.stats.lust += 2;

                CView.text("\n");
            }
            if (womb.pregnancy.incubation === 180) {
                CView.text("\n<b>The sudden impact of a kick from inside your distended womb startles you.  Moments later it happens again, making you gasp and stagger.  Whatever is growing inside you is strong.</b>\n");
            }
            if (womb.pregnancy.incubation === 120) {
                CView.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.  It's already as big as the belly of any pregnant woman back home.</b>\n");
            }
            if (womb.pregnancy.incubation === 72) {
                CView.text("\n<b>Your belly is painfully distended and overswollen with the offspring of some huge beast, ");
                if (player.stats.cor < 40) CView.text("making it difficult to function.</b>");
                if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("and you wonder how much longer you have to wait.</b>");
                if (player.stats.cor >= 75) CView.text("and you're eager to give birth, so you can get impregnated again by monstrous cocks unloading their corrupted seed directly into your eager womb.</b>");
                CView.text("\n");
                player.stats.spe += -3;
                player.stats.lib += 1;
                player.stats.sens += 1;
                player.stats.lust += 4;

            }
            if (womb.pregnancy.incubation === 48) {
                CView.text("\n<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  Whatever beast is inside your overstretched womb seems to appreciate the attention, and stops its incessant squirming.  ");
                if (player.stats.cor < 40) CView.text("Afterwards you feel somewhat disgusted with yourself.</b>\n");
                if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("You estimate you'll give birth in the next few days.</b>\n");
                if (player.stats.cor >= 75) CView.text("You find yourself daydreaming about birthing some huge monstrous beast, and raising it to fuck your wet pussy over and over.</b>\n");
            }
            if (womb.pregnancy.incubation === 32 || womb.pregnancy.incubation === 64 || womb.pregnancy.incubation === 85 || womb.pregnancy.incubation === 150) {
                // Increase lactation!
                if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3 && player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1 && player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier >= 1 && player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 2) {
                    CView.text("\nYour breasts feel swollen with all the extra milk they're accumulating.  You wonder just what kind of creature they're getting ready to feed.\n");
                    boostLactation(player, .5);
                }
                if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3 && player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1 && player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier > 0 && player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier < 1) {
                    CView.text("\nDrops of breastmilk escape your nipples as your body prepares for the coming birth.\n");
                    boostLactation(player, .5);
                }
                // Lactate if large && not lactating
                if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating >= 3 && player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1 && player.body.chest.sort(BreastRow.LactationMost).get(0)!.lactationMultiplier === 0) {
                    CView.text("\n<b>You realize your breasts feel full, and occasionally lactate</b>.  It must be due to the pregnancy.\n");
                    boostLactation(player, 1);
                }
                // Enlarge if too small for lactation
                if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating === 2 && player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1) {
                    CView.text("\n<b>Your breasts have swollen to C-cups,</b> in light of your coming pregnancy.\n");
                    growTopBreastRow(player, 1, 1);
                }
                // Enlarge if really small!
                if (player.body.chest.sort(BreastRow.Largest).get(0)!.rating === 1 && player.body.chest.sort(BreastRow.BreastsPerRowMost).get(0)!.count > 1) {
                    CView.text("\n<b>Your breasts have grown to B-cups,</b> likely due to the hormonal changes of your pregnancy.\n");
                    growTopBreastRow(player, 1, 1);
                }
            }
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy!.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        if (womb.pregnancy && womb.pregnancy.incubation === 1 && womb.pregnancy.type === PregnancyType.MINOTAUR) {
            if (player.body.vaginas.length === 0) {
                CView.text("\nYou feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.\n");
                player.body.vaginas.add(new Vagina());
            }
            boostLactation(player, .01);
            // Main Text here
            CView.text("\nYou wake up suddenly to strong pains and pressures in your gut. As your eyes shoot wide open, you look down to see your belly absurdly full and distended. You can feel movement underneath the skin, and watch as it bulges and shifts as another living being moves independently inside you. Instinctively, you spread your legs as you feel the creature press outward, parting your cervix.\n\nYou try to push with your vaginal muscles, but you feel the creature moving more of its own volition. Your lips part as a pair of black-furred hands grip your vulva and begin to spread them and pull. You cry out in agony as your hips are widened forcefully by the passing mass of the being exiting your womb. A bovine face appears, mercifully lacking in horns. Shoulders follow, muscles already rippling on the newborn's form. A thick barrel chest follows, narrow, masculine hips and powerful bovine legs and hooves.\n\nFinally the worst is over as the toddler-sized minotaur gets to his feet, apparently already able to stand and walk.  He clops around your legs and over to your upper body, and takes hold of one of your milk-swollen breasts. He wraps his bestial lips around your nipple and begins to suckle, relieving the pressure on the milk-swollen jug.\n\n");
            CView.text("He suckles and suckles and suckles, leaving you to wonder just how much milk you were actually holding, but even as you wonder this, your eyes grow wide as the newborn minotaur begins to grow. He gains inches at a time, his horns starting to grow from his skull, his muscles rippling and thickening, his cock lengthening, his balls swelling. He reaches four feet tall, but keeps growing, soon then five feet tall, starting to resemble more and more the monster who sired him. Finally, he pulls off your breasts, and finishes his milk-inspired growth spurt at six feet tall, looking practically full grown. His one gesture of gratitude for being brought into the world is a slobbery lick at your cheek, then he turns and runs off towards the mountain, leaving you to recover from the ordeal.  You swiftly pass out.\n\n");
            womb.clear(); // Clear Pregnancy
            if (player.body.chest.reduce(BreastRow.AverageLactation, 0) > 0 && player.body.chest.reduce(BreastRow.AverageLactation, 0) < 5) {
                CView.text("Your breasts won't seem to stop dribbling milk, lactating more heavily than before.");
                boostLactation(player, 1);
            }
            displayStretchVagina(player, 120, true, true, false);
            if (player.body.vaginas.get(0)!.wetness === VaginaWetness.DRY) player.body.vaginas.get(0)!.wetness++;

            player.orgasm();
            player.stats.str += -1;
            player.stats.tou += -2;
            player.stats.spe += 3;
            player.stats.lib += 1;
            player.stats.sens += .5;

            // Hip and butt increase
            if (player.body.butt.rating < 12 && randInt(2) === 0) {
                player.body.butt.rating++;
                CView.text("\n\nYou notice your " + describeButt(player) + " feeling larger and plumper after the ordeal.");
            }
            else if (player.body.hips.rating < 15) {
                player.body.hips.rating++;
                CView.text("\n\nAfter the birth your " + player.inventory.armor.displayName + " fits a bit more snugly about your " + describeHips(player) + ".");
            }
            CView.text("\n");
            // 326 Number of sons grown
            // 327 Number of sons pending
            // 328 growup countdown
            // $> Fix later
            // undefinedFlags.UNKNOWN_FLAG_NUMBER_00327++;
            // if (undefinedFlags.UNKNOWN_FLAG_NUMBER_00328 === 0) undefinedFlags.UNKNOWN_FLAG_NUMBER_00328 = 150;
        }
    }
}

export const MinotaurPregEvent = new MinotaurPregnancyEvents();
