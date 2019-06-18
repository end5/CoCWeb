define(["require", "exports", "../../classes/Player", "./TimeModel"], function (require, exports, Player_1, TimeModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameModel {
        constructor() {
            this.player = new Player_1.Player();
            this.oldStats = {};
            this.time = new TimeModel_1.TimeModel();
            this.flags = {};
            //public var debug : boolean;
            // I think this is supposed to be a compile time constant, sorta...
            this.mobile = false;
        }
    }
    exports.GameModel = GameModel;
});
//# sourceMappingURL=GameModel.js.map