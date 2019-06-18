define(["require", "exports", "./Consumable", "../CoC_Settings", "./Armors/GooArmor"], function (require, exports, Consumable_1, CoC_Settings_1, GooArmor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 09.01.14.
     */
    //No longer used - equipping Weapons and Armor is now handled by the inventoryMenu
    /**
     * Superclass for items that could be equipped by player (armor, weapon, talisman, piercing, ...).
     * Subclasses should override "equip" and "unequip" methods. Optionally, they could override "equipEffect" and
     * "unequipEffect" methods that perform additional effects on player. By default, they do nothing.
     * Overridden "equip" and "unequip" should call "equipped" and "unequipped" if equipped/unequipped succesfully.
     */
    class Equipable extends Consumable_1.Consumable {
        /**
         * Called on attempt to equip item.
         * @param output Print "equipping" scene to output
         */
        canUse(player, output) {
            return true;
        }
        /**
         * Called after item succesfully equipped. By default, does nothing. Should add perks/effects/etc.
         */
        equipEffect(player, output) {
        }
        /**
         * Called after item succesfully unequipped. By default, does nothing. Should remove perks/effects/etc.
         */
        unequipEffect(player, output) {
        }
        equipped(player, output) {
            this.equipEffect(player, output);
        }
        unequipped(player, output) {
            this.unequipEffect(player, output);
        }
        equip(player, returnOldItem, output) {
            CoC_Settings_1.CoC_Settings.errorAMC("Equipable", "equip", this.id);
        }
        /**
         * @param returnToInventory true if that item should be placed in player's inventory
         * @param output true if the unequip function should print to the screen
         */
        unequip(player, returnToInventory, output = false) {
            CoC_Settings_1.CoC_Settings.errorAMC("Equipable", "unequip", this.id);
        }
        doEffect(player, output) {
            if (this.game.debug && !(this instanceof GooArmor_1.GooArmor)) {
                if (output) {
                    this.clearOutput();
                    this.outputText("You cannot equip anything in debug mode.  Please restart the game in normal mode to equip items.");
                }
                return;
            }
            this.equip(player, true, output);
        }
        unequipReturnItem(player, output) {
            return this;
        }
    }
    exports.Equipable = Equipable;
});
//# sourceMappingURL=Equipable.js.map