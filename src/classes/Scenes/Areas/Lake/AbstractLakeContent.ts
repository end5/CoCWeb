import { BaseContent } from "../../../BaseContent";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";
import { Lake } from "../Lake";

/**
 * Created by aimozg on 06.01.14.
 */

export class AbstractLakeContent extends BaseContent {
    protected get lake(): Lake {
        return kGAMECLASS.lake;
    }
}

