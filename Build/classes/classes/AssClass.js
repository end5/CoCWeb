define(["require", "exports", "./internals/Utils"], function (require, exports, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AssClass {
        constructor() {
            //constructor
            //data
            //butt wetness
            this.analWetness = 0;
            /*butt looseness
            0 - virgin
            1 - normal
            2 - loose
            3 - very loose
            4 - gaping
            5 - monstrous*/
            this.analLooseness = 0;
            //Used to determine thickness of knot relative to normal thickness
            //Used during sex to determine how full it currently is.  For multi-dick sex.
            this.fullness = 0;
        }
        validate() {
            var error = "";
            error += Utils_1.Utils.validateNonNegativeNumberFields(this, "AssClass.validate", [
                "analWetness", "analLooseness", "fullness"
            ]);
            return error;
        }
    }
    exports.AssClass = AssClass;
});
//# sourceMappingURL=AssClass.js.map