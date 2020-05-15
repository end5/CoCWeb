import { StatusAffects } from "../../../StatusAffects";
import { AbstractLakeContent } from "./AbstractLakeContent";

export class SwordInStone extends AbstractLakeContent {
    public findSwordInStone(): void {
        if (this.player.findStatusAffect(StatusAffects.FactoryOverload) < 0) {
            // Encounter it!
            this.outx(
                `While walking along the lake, the glint of metal catches your eye.  You drop into a combat stance, readying your ${this.player.weaponName} for another fight.   Your eyes dart about, searching for the source of the light. You feel rather foolish when you locate the source of the reflection.  It came from a sword lodged hilt-deep in the trunk of a tree.  You relax a bit, approaching the odd sight to get a better look.\n\n`,
                true
            );

            // Describe it!
            this.outx(
                "The tree is thick enough to encapsulate the entire blade.  Nothing protrudes from the far side at all.  In another odd twist, there is not any sap leaking around the undamaged bark that surrounds the sword.  The hilt itself appears made of bronze, with gold inlays along the outside of the handguard.  Looking closer, you realize they portray a stylized figure battling a horde of demons.  The handle is wrapped tightly with rugged leather that still looks brand new in spite of how long this sword must have been here for the tree to grow so thoroughly around it.\n\n",
                false
            );

            this.outx("You suppose you could try to pull it free, do you?");

            this.doYesNo(this.tryToTakeSwordInStone, this.camp.returnToCampUseOneHour);
        } else {
            this.outx(
                "While walking along the lake, a massive tree catches your eye.  You carefully circle some bushes, wary of an ambush as you get closer.   As you close the distance, it becomes clear the tree is terribly corrupt.  It weeps black sap from gnashing mouths and clenching distorting twats.  The very center of the tree has a massive knot, as if it had sustained a massive injury there.  You decide to avoid it, given the hungry-looking nature of its mouths, but before you depart you spot the pieces of a broken sword scattered around the trunk, completely covered in rust.",
                true
            );

            this.doNext(this.camp.returnToCampUseOneHour);

            this.player.createStatusAffect(StatusAffects.BSwordBroken, 0, 0, 0, 0);
        }
    }

    private tryToTakeSwordInStone(): void {
        this.outx("", true);
        // if corrupted...
        if (this.player.cor >= 25) {
            this.outx("You grip the handle with both hands and ");

            if (this.player.str > 70)
                this.outx(
                    "pull mightily, making the tree strain and groan from the force, ",
                    false
                );
            if (this.player.str <= 70 && this.player.str >= 40)
                this.outx("pull hard, feeling your muscles tighten from the strain, ");
            if (this.player.str < 40) this.outx("pull as hard as you can, ");

            this.outx(
                "but the sword remains stubbornly lodged in its arboreal home.  Frustrated, you give up and resolve to try later.",
                false
            );

            this.doNext(this.camp.returnToCampUseOneHour);
        }
        // If not corrupted...
        else {
            this.outx("You grip the handle with both hands and ");

            if (this.player.str > 70)
                this.outx(
                    "pull so hard you fall on your ass when the sword slips free.  The tip buries itself a few inches from your head.  You count yourself lucky and stand up.  ",
                    false
                );
            if (this.player.str <= 70 && this.player.str >= 40)
                this.outx(
                    "give a mighty pull and nearly fall over as the sword easily slides free from the tree.  ",
                    false
                );
            if (this.player.str < 40)
                this.outx(
                    "easily pull the sword free, surprising yourself with how easy it was to remove.  ",
                    false
                );

            this.outx(
                "Remarkably the tree's trunk is entirely intact.  While marveling at this new development, a leaf brushes your shoulder.  You look up and watch as every single leaf turns from healthy green, to brilliant orange, and finally changes to brown.  The leaves rain down around you, covering the ground in dead plant-matter, leaving you alone with the withering skeleton of a dead tree.  The sight saddens you, though you cannot fathom why.\n\n",
                false
            );

            this.outx(
                "The blade itself is three and a half feet of the purest, shining steel you have ever seen.  It truly is a beautiful blade.\n\n",
                false
            );
            this.dynStats("lib", -(this.player.lib / 3), "lus", -15);
            this.inventory.takeItem(this.weapons.B_SWORD, this.camp.returnToCampUseOneHour);
            this.player.createStatusAffect(StatusAffects.TookBlessedSword, 0, 0, 0, 0);
        }
    }
}
