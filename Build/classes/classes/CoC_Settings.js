define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * ...
     * @author Fake-Name
     */
    class CoC_Settings {
        /**
         * trace("ERROR "+description);
         * If haltOnErrors=true, throws Error
         */
        static error(description = "") {
            // trace("ERROR " + description);
            if (CoC_Settings.haltOnErrors)
                throw new Error(description);
        }
        /**
         * trace("ERROR Abstract method call: "+clazz+"."+method+"(). "+description);
         * If haltOnErrors=true, throws Error
         */
        static errorAMC(clazz, method, description = "") {
            // error("Abstract method call: " + clazz + "." + method + "(). " + description);
        }
        static appendButtonEvent(inString) {
            CoC_Settings.buttonEvents.unshift(inString); // Push the new item onto the head of the array
            if (CoC_Settings.buttonEvents.length > CoC_Settings.bufferSize) // if the array has become too long, pop the last item
             {
                CoC_Settings.buttonEvents.pop();
            }
        }
        static getButtonEvents() {
            var retStr = "";
            for (var x of CoC_Settings.buttonEvents) {
                retStr += CoC_Settings.buttonEvents[x] + "\n";
                // trace("x = ", x, "Array Val = ", CoC_Settings.buttonEvents[x]);
            }
            return retStr;
        }
    }
    CoC_Settings.debugBuild = true;
    // Horrible static abuse FTW
    CoC_Settings.haltOnErrors = false;
    CoC_Settings.buttonEvents = [];
    CoC_Settings.bufferSize = 50;
    exports.CoC_Settings = CoC_Settings;
});
//# sourceMappingURL=CoC_Settings.js.map