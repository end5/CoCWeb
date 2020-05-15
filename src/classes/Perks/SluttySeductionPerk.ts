import { PerkClass } from "../PerkClass";
import { PerkType } from "../PerkType";

/**
 * Created by aimozg on 27.01.14.
 */

export class SluttySeductionPerk extends PerkType {
    public desc(params?: PerkClass): string {
        if (params)
            return `Increases odds of successfully teasing and lust damage of successful teases by ${params.value1} points.`;
        return "";
    }

    public constructor() {
        super(
            "Slutty Seduction",
            "Slutty Seduction",
            "Your armor allows you access to 'Seduce', an improved form of 'Tease'."
        );
    }
}
