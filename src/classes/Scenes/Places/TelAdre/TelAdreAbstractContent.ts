import { BaseContent } from "../../../BaseContent";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";
import { TelAdre } from "../TelAdre";

/**
 * Created by aimozg on 05.01.14.
 */

export class TelAdreAbstractContent extends BaseContent {
    protected get telAdre(): TelAdre {
        return kGAMECLASS.telAdre;
    }
}
