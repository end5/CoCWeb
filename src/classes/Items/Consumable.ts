import { Useable } from "./Useable";

/**
 * Created by aimozg on 09.01.14.
 */

/**
 * An item, that is consumed by player, and disappears after use. Direct subclasses should override "doEffect" method
 * and NOT "useItem" method.
 */
export class Consumable extends Useable {
    /*
            public  canUse(player:Player,output: boolean): boolean
            {
                return true;
            }
    */
    /**
     * Perform effect on player WITHOUT requiring item being in player's inventory and removing it
     */
    /*
            public  doEffect(player:Player,output: boolean): void
            {
                CoC_Settings.errorAMC("Consumable","doEffect",id);
            }
    */
    /**
     * Removes item from player and does effect
     */
    /*
            public  useItem(player:Player, output: boolean, external: boolean): void
            {
                if (canUse(player,output)){
                    if (!external && !game.debug) player.consumeItem(this,1);
                    doEffect(player,output);
                }
            }
    */
}
