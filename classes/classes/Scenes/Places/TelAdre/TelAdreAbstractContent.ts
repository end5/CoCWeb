import { BaseContent } from "../../../BaseContent";
import { TelAdre } from "../TelAdre";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";

/**
 * Created by aimozg on 05.01.14.
 */

export class TelAdreAbstractContent extends BaseContent {
    protected get telAdre(): TelAdre {
        return kGAMECLASS.telAdre;
    }

}

