define(["require", "exports", "./LoadUtils"], function (require, exports, LoadUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NameView {
        constructor(id) {
            this.element = LoadUtils_1.loadId(id);
        }
        setText(text) {
            this.element.textContent = 'Name: ' + text;
        }
    }
    exports.NameView = NameView;
});
//# sourceMappingURL=NameView.js.map