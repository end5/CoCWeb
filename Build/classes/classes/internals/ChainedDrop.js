define(["require", "exports", "../CoC_Settings"], function (require, exports, CoC_Settings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 11.01.14.
     */
    class ChainedDrop {
        constructor(defaultItem) {
            this.items = [];
            this.probs = [];
            this.defaultItem = defaultItem;
        }
        add(item, prob) {
            if (prob < 0 || prob > 1) {
                CoC_Settings_1.CoC_Settings.error("Invalid probability value " + prob);
            }
            this.items.push(item);
            this.probs.push(prob);
            return this;
        }
        elseDrop(item) {
            this.defaultItem = item;
            return this;
        }
        roll() {
            for (var i = 0; i < this.items.length; i++) {
                if (Math.random() < this.probs[i])
                    return this.items[i];
            }
            return this.defaultItem;
        }
    }
    exports.ChainedDrop = ChainedDrop;
});
//# sourceMappingURL=ChainedDrop.js.map