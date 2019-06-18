define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StatusAffectClass {
        //constructor
        constructor(stype, value1 = 0, value2 = 0, value3 = 0, value4 = 0) {
            this._stype = stype;
            this.value1 = value1;
            this.value2 = value2;
            this.value3 = value3;
            this.value4 = value4;
        }
        //MEMBER FUNCTIONS
        get stype() {
            return this._stype;
        }
        toString() {
            return "[" + this._stype + "," + this.value1 + "," + this.value2 + "," + this.value3 + "," + this.value4 + "]";
        }
    }
    exports.StatusAffectClass = StatusAffectClass;
});
//# sourceMappingURL=StatusAffectClass.js.map