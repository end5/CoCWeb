import { ItemType } from "../ItemType";
import { CoC } from "../CoC";
import { kGAMECLASS } from "../CoC";

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
    public outputText(text: string): void {
        kGAMECLASS.outputText(text);
    }
}

