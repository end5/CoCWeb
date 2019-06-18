define(["require", "exports", "../Useable"], function (require, exports, Useable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SimpleUseable extends Useable_1.Useable {
        constructor(id, shortName, longName, value, description, useText, useFunction) {
            super(id, shortName, longName, value, description);
            this.canUseFunction = useFunction;
            this.canUseText = useText;
        }
        canUse() {
            this.clearOutput();
            if (this.canUseFunction != undefined) {
                this.canUseFunction();
            }
            else {
                this.outputText(this.canUseText);
            }
            return false;
        }
    }
    exports.SimpleUseable = SimpleUseable;
});
//# sourceMappingURL=SimpleUseable.js.map