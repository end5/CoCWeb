import { Utils } from "./internals/Utils";

export class AssClass {
    //constructor

    //data
    //butt wetness
    public analWetness: number = 0;
    /*butt looseness
    0 - virgin
    1 - normal
    2 - loose
    3 - very loose
    4 - gaping
    5 - monstrous*/
    public analLooseness: number = 0;
    //Used to determine thickness of knot relative to normal thickness
    //Used during sex to determine how full it currently is.  For multi-dick sex.
    public fullness: number = 0;

    public validate(): string {
        var error: string = "";
        error += Utils.validateNonNegativeNumberFields(this, "AssClass.validate", [
            "analWetness", "analLooseness", "fullness"
        ]);
        return error;
    }
}
