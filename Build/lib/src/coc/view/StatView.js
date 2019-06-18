define(["require", "exports", "./LoadUtils"], function (require, exports, LoadUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StatView {
        constructor(id, name) {
            this.element = LoadUtils_1.loadId(id);
            this.info = LoadUtils_1.loadClass('statInfo', this.element);
            this.name = LoadUtils_1.loadClass('statName', this.element);
            this.name.textContent = name;
            this.numbers = LoadUtils_1.loadClass('statNumbers', this.element);
            this.currNumber = LoadUtils_1.loadClass('statCurrent', this.element);
            this.currNumber.textContent = '0';
            this.arrowUp = LoadUtils_1.loadClass('arrowUp', this.element);
            this.arrowDown = LoadUtils_1.loadClass('arrowDown', this.element);
        }
        loadClass(className) {
            const element = this.element.getElementsByClassName(className)[0];
            if (!element)
                throw new Error('Could not load "' + className + '" element');
            return element;
        }
        setNumber(num) {
            this.currNumber.textContent = Math.round(num) + '';
        }
        showUp() {
            this.arrowUp.classList.remove('hidden');
            this.arrowDown.classList.add('hidden');
        }
        showDown() {
            this.arrowUp.classList.add('hidden');
            this.arrowDown.classList.remove('hidden');
        }
        hideArrows() {
            this.arrowUp.classList.add('hidden');
            this.arrowDown.classList.add('hidden');
        }
    }
    exports.StatView = StatView;
    class StatViewWithBar extends StatView {
        constructor(id, name) {
            super(id, name);
            this.bar = this.loadClass('statBar');
            this.bar.style.width = '0%';
        }
        setBar(percent) {
            this.bar.style.width = percent * 100 + '%';
        }
    }
    exports.StatViewWithBar = StatViewWithBar;
});
//# sourceMappingURL=StatView.js.map