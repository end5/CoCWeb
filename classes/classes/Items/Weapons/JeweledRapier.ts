import { Weapon } from "../Weapon";
import { kGAMECLASS } from "../../CoC";
import { kFLAGS } from "../../GlobalFlags/kFLAGS";

/**
 * Created by aimozg on 10.01.14.
 */

export class JeweledRapier extends Weapon {

    public constructor() {
        super("JRapier", "JRapier", "jeweled rapier", "a jeweled rapier", "slash", 13, 1400, "This jeweled rapier is ancient but untarnished.  The hilt is wonderfully made, and fits your hand like a tailored glove.  The blade is shiny and perfectly designed for stabbing.");
    }

    public get attack(): number { return (13 + kGAMECLASS.flags[kFLAGS.RAPHAEL_RAPIER_TRANING] * 2); }
}

