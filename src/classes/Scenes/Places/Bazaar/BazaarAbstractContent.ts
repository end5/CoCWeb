import { BaseContent } from "../../../BaseContent";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";
import { Bazaar } from "../Bazaar";

/**
 * Created by aimozg on 06.01.14.
 */

export class BazaarAbstractContent extends BaseContent {
    protected get bazaar(): Bazaar {
        return kGAMECLASS.bazaar;
    }
}
