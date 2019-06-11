import { BaseContent } from "../../../BaseContent";
import { Bazaar } from "../Bazaar";
import { kGAMECLASS } from "../../../GlobalFlags/kGAMECLASS";

/**
 * Created by aimozg on 06.01.14.
 */

	export class BazaarAbstractContent extends BaseContent
	{
		protected  get bazaar():Bazaar {
			return kGAMECLASS.bazaar;
		}

	}

