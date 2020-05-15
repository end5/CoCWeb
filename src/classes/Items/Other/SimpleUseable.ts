import { Useable } from "../Useable";

export class SimpleUseable extends Useable {
    // This class should be used for items which the player cannot consume, wear or use directly.
    // The useFunction or useText should describe the item or give a hint as to its purpose. After attempted use SimpleUseables return to the inventory automatically.
    private canUseFunction: any;
    private canUseText: string;

    public constructor(
        id: string,
        shortName: string,
        longName: string,
        value: number,
        description: string,
        useText: string,
        useFunction?: any
    ) {
        super(id, shortName, longName, value, description);
        this.canUseFunction = useFunction;
        this.canUseText = useText;
    }

    public canUse(): boolean {
        this.clearOutput();
        if (this.canUseFunction != undefined) {
            this.canUseFunction();
        } else {
            this.outx(this.canUseText);
        }
        return false;
    }
}
