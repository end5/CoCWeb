import { PerkType } from "../PerkType";
import { PerkClass } from "../PerkClass";
import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";

export class CleansingPalmPerk extends PerkType {

    public desc(params?: PerkClass): string {
        if (kGAMECLASS.player.cor >= 10) return "<b>DISABLED</b> - Corruption too high!";
        else return super.desc(params);
    }

    public constructor() {
        super("Cleansing Palm", "Cleansing Palm", "A ranged fighting technique of Jojo’s order, allows you to blast your enemies with waves of pure spiritual energy, weakening them and hurting the corrupt.");
    }
}
