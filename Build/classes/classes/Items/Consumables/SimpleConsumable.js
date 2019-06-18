define(["require", "exports", "../Consumable"], function (require, exports, Consumable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class SimpleConsumable extends Consumable_1.Consumable {
        /**
         * @param effect Function(player:Player)
         */
        constructor(id, shortName, longName, effect, value = 0, description) {
            super(id, shortName, longName, value, description);
            this.effect = effect;
        }
        useItem() {
            this.clearOutput();
            this.effect(this.game.player);
            return (false); //Any normal consumable does not have a sub-menu. Return false so that the inventory runs the itemDoNext function after useItem.
        }
    }
    exports.SimpleConsumable = SimpleConsumable;
});
//# sourceMappingURL=SimpleConsumable.js.map