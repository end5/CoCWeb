define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function trace(...text) {
        if (window && window.gameTrace)
            console.log(text);
    }
    exports.trace = trace;
});
//# sourceMappingURL=console.js.map