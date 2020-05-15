import { trace } from "../console";
import { CockTypesEnum } from "./CockTypesEnum";
import { Utils } from "./internals/Utils";

export class Cock {
    private _cockLength: number;
    private _cockThickness: number;
    private _cockType: CockTypesEnum; // See CockTypesEnum.as for all cock types

    // Used to determine thickness of knot relative to normal thickness
    private _knotMultiplier: number;

    // Piercing info
    private _isPierced: boolean;
    private _pierced: number;
    // Not yet, sweet prince. PiercedType current has no uses. But it will, one day.
    // private var _pierceType:PiercingTypesEnum;
    private _pShortDesc: string;
    private _pLongDesc: string;

    // Sock
    private _sock: string;

    /**
     * @return string description of errors
     */
    public validate(): string {
        let error = "";
        error += Utils.validateNonNegativeNumberFields(this, "Cock.validate", [
            "cockLength",
            "cockThickness",
            "knotMultiplier",
            "pierced",
        ]);
        if (!this._isPierced) {
            if (this._pShortDesc.length > 0)
                error += `Not pierced but _pShortDesc = ${this._pShortDesc}. `;
            if (this._pLongDesc.length > 0) error += `Not pierced but pLong = ${this._pLongDesc}. `;
        } else {
            if (this._pShortDesc.length == 0) error += "Pierced but no _pShortDesc. ";
            if (this._pLongDesc.length == 0) error += "Pierced but no pLong. ";
        }
        return error;
    }

    // constructor. Default type is HUMAN
    public constructor(iCockLength = 5.5, iCockThickness = 1, iCockType?: CockTypesEnum) {
        if (iCockType == undefined) iCockType = CockTypesEnum.HUMAN;
        this._cockLength = iCockLength;
        this._cockThickness = iCockThickness;
        this._cockType = iCockType;
        this._pierced = 0;
        this._knotMultiplier = 1;
        this._isPierced = false;
        // _pierceType = PiercingTypesEnum.NONE;
        this._pShortDesc = "";
        this._pLongDesc = "";
        this._sock = "";
    }

    // MEMBER FUNCTIONS
    public cArea(): number {
        return this.cockThickness * this.cockLength;
    }

    public growCock(lengthDelta: number, bigCock: boolean): number {
        if (lengthDelta == 0) {
            trace("Whoops! growCock called with 0, aborting...");
            return lengthDelta;
        }

        let threshhold = 0;

        trace(`growcock starting at:${lengthDelta}`);

        if (lengthDelta > 0) {
            // growing
            trace("and growing...");
            threshhold = 24;
            // BigCock Perk increases incoming change by 50% and adds 12 to the length before diminishing returns set in
            if (bigCock) {
                trace("growCock found BigCock Perk");
                lengthDelta *= 1.5;
                threshhold += 12;
            }
            // Not a human cock? Multiple the length before dimishing returns set in by 3
            if (this.cockType != CockTypesEnum.HUMAN) threshhold *= 2;
            // Modify growth for cock socks
            if (this.sock == "scarlet") {
                trace("growCock found Scarlet sock");
                lengthDelta *= 1.5;
            } else if (this.sock == "cobalt") {
                trace("growCock found Cobalt sock");
                lengthDelta *= 0.5;
            }
            // Do diminishing returns
            if (this.cockLength > threshhold) lengthDelta /= 4;
            else if (this.cockLength > threshhold / 2) lengthDelta /= 2;
        } else {
            trace("and shrinking...");

            threshhold = 0;
            // BigCock Perk doubles the incoming change value and adds 12 to the length before diminishing returns set in
            if (bigCock) {
                trace("growCock found BigCock Perk");
                lengthDelta *= 0.5;
                threshhold += 12;
            }
            // Not a human cock? Add 12 to the length before dimishing returns set in
            if (this.cockType != CockTypesEnum.HUMAN) threshhold += 12;
            // Modify growth for cock socks
            if (this.sock == "scarlet") {
                trace("growCock found Scarlet sock");
                lengthDelta *= 0.5;
            } else if (this.sock == "cobalt") {
                trace("growCock found Cobalt sock");
                lengthDelta *= 1.5;
            }
            // Do diminishing returns
            if (this.cockLength > threshhold) lengthDelta /= 3;
            else if (this.cockLength > threshhold / 2) lengthDelta /= 2;
        }

        trace(`then changing by: ${lengthDelta}`);

        this.cockLength += lengthDelta;

        if (this.cockLength < 1) this.cockLength = 1;

        if (this.cockThickness > this.cockLength * 0.33)
            this.cockThickness = this.cockLength * 0.33;

        return lengthDelta;
    }

    public thickenCock(increase: number): number {
        let amountGrown = 0;
        let temp = 0;
        if (increase > 0) {
            while (increase > 0) {
                if (increase < 1) temp = increase;
                else temp = 1;
                // Cut thickness growth for huge dicked
                if (this.cockThickness > 1 && this.cockLength < 12) {
                    temp /= 4;
                }
                if (this.cockThickness > 1.5 && this.cockLength < 18) temp /= 5;
                if (this.cockThickness > 2 && this.cockLength < 24) temp /= 5;
                if (this.cockThickness > 3 && this.cockLength < 30) temp /= 5;
                // proportional thickness diminishing returns.
                if (this.cockThickness > this.cockLength * 0.15) temp /= 3;
                if (this.cockThickness > this.cockLength * 0.2) temp /= 3;
                if (this.cockThickness > this.cockLength * 0.3) temp /= 5;
                // massive thickness limiters
                if (this.cockThickness > 4) temp /= 2;
                if (this.cockThickness > 5) temp /= 2;
                if (this.cockThickness > 6) temp /= 2;
                if (this.cockThickness > 7) temp /= 2;
                // Start adding up bonus length
                amountGrown += temp;
                this.cockThickness += temp;
                temp = 0;
                increase--;
            }
            increase = 0;
        } else if (increase < 0) {
            while (increase < 0) {
                temp = -1;
                // Cut length growth for huge dicked
                if (this.cockThickness <= 1) temp /= 2;
                if (this.cockThickness < 2 && this.cockLength < 10) temp /= 2;
                // Cut again for massively dicked
                if (this.cockThickness < 3 && this.cockLength < 18) temp /= 2;
                if (this.cockThickness < 4 && this.cockLength < 24) temp /= 2;
                // MINIMUM Thickness of OF .5!
                if (this.cockThickness <= 0.5) temp = 0;
                // Start adding up bonus length
                amountGrown += temp;
                this.cockThickness += temp;
                temp = 0;
                increase++;
            }
        }
        trace(`thickenCock called and thickened by: ${amountGrown}`);
        return amountGrown;
    }

    public get cockLength(): number {
        return this._cockLength;
    }

    public set cockLength(value: number) {
        this._cockLength = value;
    }

    public get cockThickness(): number {
        return this._cockThickness;
    }

    public set cockThickness(value: number) {
        this._cockThickness = value;
    }

    public get cockType(): CockTypesEnum {
        return this._cockType;
    }

    public set cockType(value: CockTypesEnum) {
        this._cockType = value;
    }

    public get knotMultiplier(): number {
        return this._knotMultiplier;
    }

    public set knotMultiplier(value: number) {
        this._knotMultiplier = value;
    }

    public get isPierced(): boolean {
        return this._isPierced;
    }

    public set isPierced(value: boolean) {
        this._isPierced = value;
    }

    /*
    public  get pierceType():PiercingTypesEnum
    {
        return _pierceType;
    }

    public  set pierceType(value:PiercingTypesEnum): void
    {
        _pierceType = value;
    }
    */

    // { region Getter/Setters
    public get pShortDesc(): string {
        return this._pShortDesc;
    }

    public set pShortDesc(value: string) {
        this._pShortDesc = value;
    }

    public get pLongDesc(): string {
        return this._pLongDesc;
    }

    public set pLongDesc(value: string) {
        this._pLongDesc = value;
    }

    public get sock(): string {
        return this._sock;
    }

    public set sock(value: string) {
        this._sock = value;
    }

    public get pierced(): number {
        return this._pierced;
    }

    public set pierced(value: number) {
        this._pierced = value;
    }
    // } endregion
}
