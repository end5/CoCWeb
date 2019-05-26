import { Consumable } from "../Consumable";

/**
 * Created by aimozg on 10.01.14.
 */

export class SimpleConsumable extends Consumable {
    private effect: any;

    /**
     * @param effect Function(player:Player)
     */
    public constructor(id: string, shortName: string, longName: string, effect: any, value: number = 0, description?: string) {
        super(id, shortName, longName, value, description);
        this.effect = effect;
    }

    public useItem(): boolean {
        this.clearOutput();
        this.effect(this.game.player);
        return (false); //Any normal consumable does not have a sub-menu. Return false so that the inventory runs the itemDoNext function after useItem.
    }
}

