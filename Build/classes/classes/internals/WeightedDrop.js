define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by aimozg on 11.01.14.
     */
    class WeightedDrop {
        constructor(first, firstWeight = 0) {
            this.items = [];
            this.sum = 0;
            if (first != undefined) {
                this.items.push([first, firstWeight]);
                this.sum += firstWeight;
            }
        }
        add(item, weight = 1) {
            this.items.push([item, weight]);
            this.sum += weight;
            return this;
        }
        addMany(weight, ..._items) {
            for (var item of _items) {
                this.items.push([item, weight]);
                this.sum += weight;
            }
            return this;
        }
        // you can pass your own random value from 0 to 1 (so you can use your own RNG)
        roll() {
            var random = Math.random() * this.sum;
            var item = undefined;
            while (random > 0 && this.items.length > 0) {
                var pair = this.items.shift();
                item = pair[0];
                random -= pair[1];
            }
            return item;
        }
        clone() {
            var other = new WeightedDrop();
            other.items = this.items.slice();
            other.sum = this.sum;
            return other;
        }
    }
    exports.WeightedDrop = WeightedDrop;
});
//# sourceMappingURL=WeightedDrop.js.map