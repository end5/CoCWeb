import { trace } from "../../../console";
import { Utils } from "../../internals/Utils";
import { Consumable } from "../Consumable";

export class KitsuneGift extends Consumable {
    public constructor() {
        super(
            "KitGift",
            "KitGift",
            "a kitsune's gift",
            0,
            "A small square package given to you by a forest kitsune.  It is wrapped up in plain white paper and tied with a string.  Who knows what's inside?"
        );
    }

    public useItem(): boolean {
        this.clearOutput();
        this.outx(
            "Curiosity gets the best of you, and you decide to open the package.  After all, what's the worst that could happen?\n\n"
        );
        // Opening the gift randomly results in one of the following:
        switch (Utils.rand(12)) {
            // [Fox Jewel]
            case 0:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, sitting in the center is a small teardrop-shaped jewel!"
                );
                this.outx(
                    "\n\n<b>You've received a shining Fox Jewel from the kitsune's gift!  How generous!</b>  "
                );
                this.game.inventory.takeItem(
                    this.game.consumables.FOXJEWL,
                    this.game.inventory.inventoryMenu
                );
                return true;

            // [Fox Berries]
            case 1:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, there is a small cluster of orange-colored berries sitting in the center!"
                );
                this.outx(
                    "\n\n<b>You've received a fox berry from the kitsune's gift!  How generous!</b>  "
                );
                // add Fox Berries to inventory
                this.game.inventory.takeItem(
                    this.game.consumables.FOXBERY,
                    this.game.inventory.inventoryMenu
                );
                return true;

            // [Gems]
            case 2:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it is filled to the brim with shining gems!"
                );
                const gems: number = 2 + Utils.rand(20);
                this.outx(
                    `\n\n<b>You've received ${Utils.num2Text(
                        gems
                    )} shining gems from the kitsune's gift!  How generous!</b>`
                );
                this.game.player.gems += gems;
                // add X gems to inventory
                this.game.statScreenRefresh();
                break;

            // [Kitsune Tea/Scholar's Tea] //Just use Scholar's Tea and drop the "trick" effect if you don't want to throw in another new item.
            case 3:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it contains a small bag of dried tea leaves!"
                );
                this.outx(
                    "\n\n<b>You've received a bag of tea from the kitsune's gift!  How thoughtful!</b>  "
                );
                // add Kitsune Tea/Scholar's Tea to inventory
                this.game.inventory.takeItem(
                    this.game.consumables.SMART_T,
                    this.game.inventory.inventoryMenu
                );
                return true;

            // [Hair Dye]
            case 4:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and to your delight, it contains a small vial filled with hair dye!"
                );
                const itype: Consumable = [
                    this.game.consumables.RED_DYE,
                    this.game.consumables.BLOND_D,
                    this.game.consumables.BLACK_D,
                    this.game.consumables.WHITEDY,
                ][Utils.rand(4)];

                this.outx(
                    `\n\n<b>You've received ${itype.longName} from the kitsune's gift!  How generous!</b>  `
                );
                // add <color> Dye to inventory
                this.game.inventory.takeItem(itype, this.game.inventory.inventoryMenu);
                return true;

            // [Knowledge Spell]
            case 5:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but it seems like there's nothing else inside.  As you peer into the box, a glowing circle filled with strange symbols suddenly flashes to life!  Light washes over you, and your mind is suddenly assaulted with new knowledge...  and the urge to use that knowledge for mischief!"
                );

                this.outx(
                    "\n\n<b>The kitsune has shared some of its knowledge with you!</b>  But in the process, you've gained some of the kitsune's promiscuous trickster nature..."
                );
                // Increase INT and Libido, +10 LUST
                this.game.dynStats("int", 4, "sen", 2, "lus", 10);
                break;

            // [Thief!]
            case 6:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it leaps into your item pouch, then hops away and gallavants into the woods, carting off a small fortune in gems."
                );

                this.outx("\n\n<b>The kitsune's familiar has stolen your gems!</b>");
                // Lose X gems as though losing in battle to a kitsune
                this.game.player.gems -= 2 + Utils.rand(15);
                this.game.statScreenRefresh();
                break;

            // [Prank]
            case 7:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it pulls a large calligraphy brush from thin air and leaps up into your face, then hops away and gallavants off into the woods.  Touching your face experimentally, you come away with a fresh coat of black ink on your fingertips."
                );

                this.outx(
                    "\n\n<b>The kitsune's familiar has drawn all over your face!</b>  The resilient marks take about an hour to completely scrub off in the nearby stream.  You could swear you heard some mirthful snickering among the trees while you were cleaning yourself off."
                );
                // Advance time 1 hour, -20 LUST
                this.game.dynStats("lus", -20);
                break;

            // [Aphrodisiac]
            case 8:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it tosses a handful of sweet-smelling pink dust into your face, then hops over the rim of the box and gallavants off into the woods.  Before you know what has happened, you feel yourself growing hot and flushed, unable to keep your hands away from your groin."
                );
                this.outx(
                    "\n\n<b>Oh no!  The kitsune's familiar has hit you with a powerful aphrodisiac!  You are debilitatingly aroused and can think of nothing other than masturbating.</b>"
                );
                // +100 LUST
                this.game.dynStats("lus=", 100, "resisted", false);
                break;

            // [Wither]
            case 9:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, and sitting in the center is an artfully crafted paper doll.  Before your eyes, the doll springs to life, dancing about fancifully.  Without warning, it tosses a handful of sour-smelling orange powder into your face, then hops over the rim of the box and gallavants off into the woods.  Before you know what has happened, you feel the strength draining from your muscles, withering away before your eyes."
                );
                this.outx(
                    "\n\n<b>Oh no!  The kitsune's familiar has hit you with a strength draining spell!  Hopefully it's only temporary...</b>"
                );
                this.game.dynStats("str", -5, "tou", -5);
                break;

            // [Dud]
            case 10:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but to your disappointment, the only other contents appear to be nothing more than twigs, leaves, and other forest refuse."
                );
                this.outx(
                    "\n\n<b>It seems the kitsune's gift was just a pile of useless junk!  What a ripoff!</b>"
                );
                break;

            // [Dud...  Or is it?]
            case 11:
                this.outx(
                    "As the paper falls away, you carefully lift the cover of the box, your hands trembling nervously.  The inside of the box is lined with purple velvet, but to your disappointment, the only other contents appear to be nothing more than twigs, leaves, and other forest refuse.  Upon further investigation, though, you find a shard of shiny black chitinous plating mixed in with the other useless junk."
                );
                this.outx(
                    "\n\n<b>At least you managed to salvage a shard of black chitin from it...</b>  "
                );
                this.game.inventory.takeItem(
                    this.game.useables.B_CHITN,
                    this.game.inventory.inventoryMenu
                );
                return true;

            default:
                trace("Kitsune's gift roll foobar...");
        }
        return false; // Any other case does not have a sub-menu.
    }
}
