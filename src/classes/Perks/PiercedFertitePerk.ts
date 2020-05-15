import { PerkClass } from "../PerkClass";
import { PerkType } from "../PerkType";

/**
 * Created by aimozg on 27.01.14.
 */

export class PiercedFertitePerk extends PerkType {
    public desc(params?: PerkClass): string {
        if (params)
            return `Increases cum production by ${Math.round(
                2 * params.value1
            )}% and fertility by ${Math.round(params.value1)}.`;
        return "";
    }

    public constructor() {
        super(
            "Pierced: Fertite",
            "Pierced: Fertite",
            "You've been pierced with Fertite and any male or female organs have become more fertile."
        );
    }
}
