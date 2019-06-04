import { BaseContent } from "../../../BaseContent";
import { Boat } from "../Boat";
import { kGAMECLASS } from "../../../CoC";

/**
 * Created by aimozg on 06.01.14.
 */

	export class AbstractBoatContent extends BaseContent
	{
		protected  get boat():Boat {
			return kGAMECLASS.boat;
		}

	}

