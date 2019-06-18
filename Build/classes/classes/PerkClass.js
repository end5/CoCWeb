define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PerkClass {
        //constructor
        constructor(perk, value1 = 0, value2 = 0, value3 = 0, value4 = 0) {
            this._ptype = perk;
            this.value1 = value1;
            this.value2 = value2;
            this.value3 = value3;
            this.value4 = value4;
        }
        //MEMBER FUNCTIONS
        get ptype() {
            return this._ptype;
        }
        get perkName() {
            return this._ptype.name;
        }
        get perkDesc() {
            return this._ptype.desc(this);
        }
        get perkLongDesc() {
            return this._ptype.longDesc;
        }
    }
    exports.PerkClass = PerkClass;
});
//# sourceMappingURL=PerkClass.js.map