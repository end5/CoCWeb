define(["require", "exports", "../BaseContent", "./Other/SimpleUseable", "../GlobalFlags/kGAMECLASS"], function (require, exports, BaseContent_1, SimpleUseable_1, kGAMECLASS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 10.01.14.
     */
    class UseableLib extends BaseContent_1.BaseContent {
        constructor() {
            super(...arguments);
            this.B_CHITN = new SimpleUseable_1.SimpleUseable("B.Chitn", "B.Chitn", "a large shard of chitinous plating", 6, "A perfect piece of black chitin from a bee-girl.  It still has some fuzz on it.", "You look over the scale carefully but cannot find a use for it.  Maybe someone else will know how to use it.");
            this.GLDSTAT = new SimpleUseable_1.SimpleUseable("GldStat", "GldStat", "a golden statue", 600, "An intricate golden idol of an androgynous humanoid figure with nine long tails.  It probably had some spiritual significance to its owner.", "", kGAMECLASS_1.kGAMECLASS.forest.kitsuneScene.kitsuneStatue);
            this.GREENGL = new SimpleUseable_1.SimpleUseable("GreenGl", "GreenGl", "a clump of green gel", 6, "This tough substance has no obvious use that you can discern.", "You examine the gel thoroughly, noting it is tough and resiliant, yet extremely pliable.  Somehow you know eating it would not be a good idea.");
            this.T_SSILK = new SimpleUseable_1.SimpleUseable("T.SSilk", "T.SSilk", "a bundle of tough spider-silk", 6, "This bundle of fibrous silk is incredibly tough and strong, though somehow not sticky in the slightest.  You have no idea how to work these tough little strands into anything usable.  Perhaps one of this land's natives might have an idea?", "You look over the tough webbing, confusion evident in your expression.  There's really nothing practical you can do with these yourself.  It might be best to find someone more familiar with the odd materials in this land to see if they can make sense of it.");
        }
    }
    exports.UseableLib = UseableLib;
});
//# sourceMappingURL=UseableLib.js.map