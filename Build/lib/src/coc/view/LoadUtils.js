define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function loadClass(className, element) {
        const sub = element.getElementsByClassName(className)[0];
        if (!sub)
            throw new Error('Could not load child with class: "' + className + '"');
        return sub;
    }
    exports.loadClass = loadClass;
    function loadId(id) {
        let element = document.getElementById(id);
        if (!element)
            throw new Error('Could not load element with id: "' + id + '"');
        return element;
    }
    exports.loadId = loadId;
});
//# sourceMappingURL=LoadUtils.js.map