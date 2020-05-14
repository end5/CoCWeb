import { Utils } from "./internals/Utils";

export class VaginaClass {
    //constructor
    public constructor(
        vaginalWetness: number = 1,
        vaginalLooseness: number = 0,
        virgin: boolean = false
    ) {
        this.virgin = virgin;
        this.vaginalWetness = vaginalWetness;
        this.vaginalLooseness = vaginalLooseness;
    }
    //data
    //Vag wetness
    public vaginalWetness: number = 1;
    /*Vag looseness
    0 - virgin
    1 - normal
    2 - loose
    3 - very loose
    4 - gaping
    5 - monstrous*/
    public vaginalLooseness: number = 0;
    //Type
    //0 - Normal
    //5 - Black bugvag
    public type: number = 0;
    public virgin: boolean = true;
    //Used during sex to determine how full it currently is.  For multi-dick sex.
    public fullness: number = 0;
    public labiaPierced: number = 0;
    public labiaPShort: string = "";
    public labiaPLong: string = "";
    public clitPierced: number = 0;
    public clitPShort: string = "";
    public clitPLong: string = "";

    public validate(): string {
        var error: string = "";
        error += Utils.validateNonNegativeNumberFields(this, "VaginaClass.validate", [
            "vaginalWetness",
            "vaginalLooseness",
            "type",
            "fullness",
            "labiaPierced",
            "clitPierced",
        ]);
        if (this.labiaPierced) {
            if (this.labiaPShort == "") error += "Labia pierced but labiaPShort = ''. ";
            if (this.labiaPLong == "") error += "Labia pierced but labiaPLong = ''. ";
        } else {
            if (this.labiaPShort != "")
                error += "Labia not pierced but labiaPShort = '" + this.labiaPShort + "'. ";
            if (this.labiaPLong != "")
                error += "Labia not pierced but labiaPLong = '" + this.labiaPShort + "'. ";
        }
        if (this.clitPierced) {
            if (this.clitPShort == "") error += "Clit pierced but labiaPShort = ''. ";
            if (this.clitPLong == "") error += "Clit pierced but labiaPLong = ''. ";
        } else {
            if (this.clitPShort != "")
                error += "Clit not pierced but labiaPShort = '" + this.labiaPShort + "'. ";
            if (this.clitPLong != "")
                error += "Clit not pierced but labiaPLong = '" + this.labiaPShort + "'. ";
        }
        return error;
    }

    public wetnessFactor(): number {
        if (this.vaginalWetness == 0) return 1.25;
        if (this.vaginalWetness == 1) return 1;
        if (this.vaginalWetness == 2) return 0.8;
        if (this.vaginalWetness == 3) return 0.7;
        if (this.vaginalWetness == 4) return 0.6;
        if (this.vaginalWetness == 5) return 0.5;
        return 0.5;
    }
    public capacity(): number {
        if (this.vaginalLooseness == 0) return 8;
        if (this.vaginalLooseness == 1) return 16;
        if (this.vaginalLooseness == 2) return 24;
        if (this.vaginalLooseness == 3) return 36;
        if (this.vaginalLooseness == 4) return 56;
        if (this.vaginalLooseness == 5) return 100;
        return 10000;
    }
}
