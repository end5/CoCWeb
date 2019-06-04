import { BaseContent } from "../../../BaseContent";
import { Farm } from "../Farm";
import { kGAMECLASS } from "../../../CoC";

/**
 * Created by aimozg on 08.01.14.
 */

export class AbstractFarmContent extends BaseContent {
    protected get farm(): Farm {
        return kGAMECLASS.farm;
    }

}

