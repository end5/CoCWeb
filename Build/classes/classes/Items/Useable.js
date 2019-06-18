define(["require", "exports", "./CommonItem", "../CoC_Settings"], function (require, exports, CommonItem_1, CoC_Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 09.01.14.
     */
    /**
     * Represent item that can be used but does not necessarily disappears on use. Direct subclasses should overrride
     * "useItem" method.
     */
    class Useable extends CommonItem_1.CommonItem {
        canUse(player, output) { return true; } //If an item cannot be used it should provide some description of why not
        //		public function hasSubMenu(): boolean { return false; } //Only GroPlus and Reducto use this. //Replaced with a return
        useItem() {
            CoC_Settings_1.CoC_Settings.errorAMC("Useable", "useItem", this.id);
            return (false);
        }
        useText() { } //Produces any text seen when using or equipping the item normally
    }
    exports.Useable = Useable;
});
//# sourceMappingURL=Useable.js.map