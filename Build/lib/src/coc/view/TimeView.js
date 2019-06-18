define(["require", "exports", "./LoadUtils"], function (require, exports, LoadUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TimeView {
        constructor() {
            this.element = LoadUtils_1.loadId('timePanel');
            this.day = LoadUtils_1.loadId('timeDay');
            this.hour = LoadUtils_1.loadId('timeHour');
        }
        setDay(day) {
            this.day.textContent = 'Day #: ' + day;
        }
        setHour(hour) {
            this.hour.textContent = 'Time: ' + hour;
        }
    }
    exports.TimeView = TimeView;
});
//# sourceMappingURL=TimeView.js.map