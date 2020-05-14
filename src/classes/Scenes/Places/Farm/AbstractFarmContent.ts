import { BaseContent } from "../../../BaseContent";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";
import { Farm } from "../Farm";

/**
 * Created by aimozg on 08.01.14.
 */

export class AbstractFarmContent extends BaseContent {
    protected get farm(): Farm {
        return kGAMECLASS.farm;
    }
}
