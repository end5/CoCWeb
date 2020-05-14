import { BaseContent } from "../../../BaseContent";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";
import { Boat } from "../Boat";

/**
 * Created by aimozg on 06.01.14.
 */

export class AbstractBoatContent extends BaseContent {
    protected get boat(): Boat {
        return kGAMECLASS.boat;
    }
}
