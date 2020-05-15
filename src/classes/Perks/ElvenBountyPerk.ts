import { PerkClass } from "../PerkClass";
import { PerkType } from "../PerkType";

/**
 * Created by aimozg on 27.01.14.
 */

export class ElvenBountyPerk extends PerkType {
    public desc(params?: PerkClass): string {
        if (params)
            return `Increases fertility by ${params.value2}% and cum production by ${params.value1}mLs.`;
        return "";
    }

    public constructor() {
        super(
            "Elven Bounty",
            "Elven Bounty",
            "After your encounter with an elf, her magic has left you with increased fertility and virility."
        );
    }
}
