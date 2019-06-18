define(["require", "exports", "../Weapon"], function (require, exports, Weapon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 09.01.14.
     */
    class Fists extends Weapon_1.Weapon {
        constructor() {
            super("Fists  ", "Fists", "fists", "fists", "punch", 0);
        }
        useText() { } //No text for equipping fists
        playerRemove() {
            return undefined;
        }
    }
    exports.Fists = Fists;
});
//# sourceMappingURL=Fists.js.map