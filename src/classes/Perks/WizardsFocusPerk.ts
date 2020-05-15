import { PerkClass } from "../PerkClass";
import { PerkType } from "../PerkType";

/**
 * Created by aimozg on 27.01.14.
 */

export class WizardsFocusPerk extends PerkType {
    public desc(params?: PerkClass): string {
        if (params) return `Increases your spell effect modifier by ${params.value1 * 100}%.`;
        return "";
    }

    public constructor() {
        super(
            "Wizard's Focus",
            "Wizard's Focus",
            "Your wizard's staff grants you additional focus, reducing the use of fatigue for spells."
        );
    }
}
