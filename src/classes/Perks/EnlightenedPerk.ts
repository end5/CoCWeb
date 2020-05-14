import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";
import { PerkClass } from "../PerkClass";
import { PerkType } from "../PerkType";

export class EnlightenedPerk extends PerkType {

    public desc(params?: PerkClass): string {
        if (kGAMECLASS.player.cor >= 10) return "<b>DISABLED</b> - Corruption too high!";
        else return super.desc(params);
    }

    public constructor() {
        super("Enlightened", "Enlightened", "Jojo’s tutelage has given you a master’s focus and you can feel the universe in all its glory spread out before you. You’ve finally surpassed your teacher.");
    }
}
