import { kFLAGS } from "../../GlobalFlags/kFLAGS";
import { kGAMECLASS } from "../../GlobalFlags/kGAMECLASS";
import { Weapon } from "../Weapon";

/**
 * Created by aimozg on 10.01.14.
 */

export class RaphaelsRapier extends Weapon {
    public constructor() {
        super(
            "RRapier",
            "RRapier",
            "vulpine rapier",
            "Raphael's vulpine rapier",
            "slash",
            8,
            1000,
            "He's bound it with his red sash around the length like a ribbon, as though he has now gifted it to you.  Perhaps it is his way of congratulating you."
        );
    }

    public get attack(): number {
        return 8 + kGAMECLASS.flags[kFLAGS.RAPHAEL_RAPIER_TRANING] * 2;
    }
}
