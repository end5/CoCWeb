define(["require", "exports", "./Useable"], function (require, exports, Useable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 09.01.14.
     */
    /**
         * An item, that is consumed by player, and disappears after use. Direct subclasses should override "doEffect" method
         * and NOT "useItem" method.
         */
    class Consumable extends Useable_1.Useable {
    }
    exports.Consumable = Consumable;
});
//# sourceMappingURL=Consumable.js.map