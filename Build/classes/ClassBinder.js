define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getPropList(object) {
        const props = new Set();
        let obj = object;
        do {
            for (const key of Reflect.ownKeys(obj))
                props.add([key, obj]);
            obj = Reflect.getPrototypeOf(obj);
        } while (obj !== Object.prototype);
        return props;
    }
    ;
    function bindToClass(self) {
        for (const [key, object] of getPropList(self.constructor.prototype)) {
            if (key === 'constructor')
                continue;
            const descriptor = Reflect.getOwnPropertyDescriptor(object, key);
            if (descriptor && typeof descriptor.value === 'function') {
                self[key] = self[key].bind(self);
            }
        }
        return self;
    }
    exports.bindToClass = bindToClass;
});
//# sourceMappingURL=ClassBinder.js.map