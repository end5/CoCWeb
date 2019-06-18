define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ASDate {
        constructor() {
            this._date = new Date(Date.now());
        }
        get fullYear() { return this._date.getFullYear(); }
        get month() { return this._date.getMonth(); }
        get date() { return this._date.getDate(); }
    }
    exports.ASDate = ASDate;
});
//# sourceMappingURL=ASDate.js.map