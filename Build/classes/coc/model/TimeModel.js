define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TimeModel {
        constructor() {
            this._days = 0;
            this._hours = 0;
        }
        get days() {
            return this._days;
        }
        set days(value) {
            this._days = value;
        }
        get hours() {
            return this._hours;
        }
        set hours(value) {
            this._hours = value;
        }
        get totalTime() {
            return (this._days * 24 + this._hours);
        }
    }
    exports.TimeModel = TimeModel;
});
//# sourceMappingURL=TimeModel.js.map