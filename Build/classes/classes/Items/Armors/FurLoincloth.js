define(["require", "exports", "../Armor"], function (require, exports, Armor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 11.01.14.
     */
    //Not used in game
    class FurLoincloth extends Armor_1.Armor {
        get description() {
            return "A pair of loincloths to cover your crotch and " + this.game.player.buttDescript() + ".  Typically worn by people named 'Conan'.";
        }
        constructor() {
            super("FurLoin", "FurLoin", "revealing fur loincloths", "a front and back set of loincloths", 0, 100, "A pair of loincloths to cover your crotch and butt.  Typically worn by people named 'Conan'.", "Light");
        }
    }
    exports.FurLoincloth = FurLoincloth;
});
//# sourceMappingURL=FurLoincloth.js.map