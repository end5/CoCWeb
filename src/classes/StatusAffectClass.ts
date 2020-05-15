import { StatusAffectType } from "./StatusAffectType";

export class StatusAffectClass {
    // constructor
    public constructor(stype: StatusAffectType, value1 = 0, value2 = 0, value3 = 0, value4 = 0) {
        this._stype = stype;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }
    // data
    private _stype: StatusAffectType;
    public value1: number;
    public value2: number;
    public value3: number;
    public value4: number;
    // MEMBER FUNCTIONS
    public get stype(): StatusAffectType {
        return this._stype;
    }

    public toString(): string {
        return `[${this._stype},${this.value1},${this.value2},${this.value3},${this.value4}]`;
    }
}
