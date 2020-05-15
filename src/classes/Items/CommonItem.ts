import { CoC } from "../CoC";
import { kGAMECLASS } from "../GlobalFlags/kGAMECLASS";
import { ItemType } from "../ItemType";

/**
 * Created by aimozg on 09.01.14.
 */

export class CommonItem extends ItemType {
    public get game(): CoC {
        return kGAMECLASS;
    }
    public getGame(): CoC {
        return kGAMECLASS;
    }

    public clearOutput(): void {
        kGAMECLASS.clearOutput();
    }
    public outx(text: string): void {
        kGAMECLASS.outx(text);
    }
}
