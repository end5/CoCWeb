import { PerkType } from "./PerkType";

export class PerkClass {
    // constructor
    public constructor(perk: PerkType, value1 = 0, value2 = 0, value3 = 0, value4 = 0) {
        this._ptype = perk;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }
    // data
    private _ptype: PerkType;
    public value1: number;
    public value2: number;
    public value3: number;
    public value4: number;
    // MEMBER FUNCTIONS

    public get ptype(): PerkType {
        return this._ptype;
    }

    public get perkName(): string {
        return this._ptype.name;
    }

    public get perkDesc(): string {
        return this._ptype.desc(this);
    }

    public get perkLongDesc(): string {
        return this._ptype.longDesc;
    }
}
