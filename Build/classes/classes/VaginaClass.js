define(["require", "exports", "./internals/Utils"], function (require, exports, Utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VaginaClass {
        //constructor
        constructor(vaginalWetness = 1, vaginalLooseness = 0, virgin = false) {
            //data
            //Vag wetness
            this.vaginalWetness = 1;
            /*Vag looseness
            0 - virgin
            1 - normal
            2 - loose
            3 - very loose
            4 - gaping
            5 - monstrous*/
            this.vaginalLooseness = 0;
            //Type
            //0 - Normal
            //5 - Black bugvag
            this.type = 0;
            this.virgin = true;
            //Used during sex to determine how full it currently is.  For multi-dick sex.
            this.fullness = 0;
            this.labiaPierced = 0;
            this.labiaPShort = "";
            this.labiaPLong = "";
            this.clitPierced = 0;
            this.clitPShort = "";
            this.clitPLong = "";
            this.virgin = virgin;
            this.vaginalWetness = vaginalWetness;
            this.vaginalLooseness = vaginalLooseness;
        }
        validate() {
            var error = "";
            error += Utils_1.Utils.validateNonNegativeNumberFields(this, "VaginaClass.validate", [
                "vaginalWetness", "vaginalLooseness", "type",
                "fullness", "labiaPierced", "clitPierced"
            ]);
            if (this.labiaPierced) {
                if (this.labiaPShort == "")
                    error += "Labia pierced but labiaPShort = ''. ";
                if (this.labiaPLong == "")
                    error += "Labia pierced but labiaPLong = ''. ";
            }
            else {
                if (this.labiaPShort != "")
                    error += "Labia not pierced but labiaPShort = '" + this.labiaPShort + "'. ";
                if (this.labiaPLong != "")
                    error += "Labia not pierced but labiaPLong = '" + this.labiaPShort + "'. ";
            }
            if (this.clitPierced) {
                if (this.clitPShort == "")
                    error += "Clit pierced but labiaPShort = ''. ";
                if (this.clitPLong == "")
                    error += "Clit pierced but labiaPLong = ''. ";
            }
            else {
                if (this.clitPShort != "")
                    error += "Clit not pierced but labiaPShort = '" + this.labiaPShort + "'. ";
                if (this.clitPLong != "")
                    error += "Clit not pierced but labiaPLong = '" + this.labiaPShort + "'. ";
            }
            return error;
        }
        wetnessFactor() {
            if (this.vaginalWetness == 0)
                return 1.25;
            if (this.vaginalWetness == 1)
                return 1;
            if (this.vaginalWetness == 2)
                return 0.8;
            if (this.vaginalWetness == 3)
                return 0.7;
            if (this.vaginalWetness == 4)
                return 0.6;
            if (this.vaginalWetness == 5)
                return 0.5;
            return .5;
        }
        capacity() {
            if (this.vaginalLooseness == 0)
                return 8;
            if (this.vaginalLooseness == 1)
                return 16;
            if (this.vaginalLooseness == 2)
                return 24;
            if (this.vaginalLooseness == 3)
                return 36;
            if (this.vaginalLooseness == 4)
                return 56;
            if (this.vaginalLooseness == 5)
                return 100;
            return 10000;
        }
    }
    exports.VaginaClass = VaginaClass;
});
//# sourceMappingURL=VaginaClass.js.map