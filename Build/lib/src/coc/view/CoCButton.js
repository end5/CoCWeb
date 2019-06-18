define(["require", "exports", "./LoadUtils"], function (require, exports, LoadUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CoCButton {
        constructor(element) {
            this.element = element;
            this.button = LoadUtils_1.loadClass('button', element);
            this.tooltip = element.getElementsByClassName('tooltip')[0];
            this.button.addEventListener('mouseover', () => {
                if (this.toolTipText && this.tooltip)
                    this.tooltip.classList.remove('hidden');
            });
            this.button.addEventListener('mouseleave', () => {
                if (this.tooltip)
                    this.tooltip.classList.add('hidden');
            });
            this.button.addEventListener('click', () => {
                if (this.tooltip)
                    this.tooltip.classList.add('hidden');
                if (this._callback)
                    this._callback();
            });
        }
        ;
        click() {
            this.button.click();
        }
        //////// Getters and Setters ////////
        get toolTipText() {
            if (this.tooltip)
                return this.tooltip.innerHTML || '';
            else
                return '';
        }
        set toolTipText(text) {
            if (this.tooltip)
                this.tooltip.innerHTML = text;
        }
        get labelText() {
            return this.button.innerHTML || '';
        }
        ;
        set labelText(value) {
            this.button.innerHTML = value;
        }
        ;
        get callback() {
            return this._callback;
        }
        ;
        set callback(value) {
            this._callback = value;
        }
        ;
        get visible() {
            return !this.button.classList.contains('hidden');
        }
        set visible(vis) {
            if (vis && this.labelText !== '' && this._callback !== undefined)
                this.button.classList.remove('hidden');
            else
                this.button.classList.add('hidden');
        }
    }
    exports.CoCButton = CoCButton;
});
//# sourceMappingURL=CoCButton.js.map