import { BaseContent } from "../../../BaseContent";
import { Lake } from "../Lake";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";

/**
 * Created by aimozg on 06.01.14.
 */

export class AbstractLakeContent extends BaseContent {
    protected get lake(): Lake {
        return kGAMECLASS.lake;
    }
}

